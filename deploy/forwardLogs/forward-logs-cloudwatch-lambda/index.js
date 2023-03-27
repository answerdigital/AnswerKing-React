const aws = require('aws-sdk');
const zlib = require('zlib');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const cloudWatchLogs = new aws.CloudWatchLogs({
  apiVersion: '2014-03-28',
});

const readline = require('readline');
const stream = require('stream');

let logGroupName = process.env.logGroupName;
let logStreamName;

exports.handler = (event, context, callback) => {
  logStreamName = context.logStreamName;
  console.log('S3 object is:', event.Records[0].s3);
  const bucket = event.Records[0].s3.bucket.name;
  console.log('Name of S3 bucket is:', bucket);
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  const params = {
    Bucket: bucket,
    Key: key,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err);
      const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
      console.log(message);
      callback(message);
    } else {
      zlib.gunzip(data.Body, function (error, buffer) {
        if (error) {
          console.log('Error uncompressing data', error);
          return;
        }

        const logData = buffer.toString('ascii');
        manageLogGroups(logData);
      });
      callback(null, data.ContentType);
    }
  });

  function manageLogGroups(logData) {
    const describeLogGroupParams = {
      logGroupNamePrefix: logGroupName,
    };

    cloudWatchLogs.describeLogGroups(describeLogGroupParams, function (err, data) {
      if (err) {
        console.log('Error while describing log group:', err);
        createLogGroup(logData);
      } else {
        if (!data.logGroups[0]) {
          console.log('Need to  create log group:', data);
          createLogGroup(logData);
        } else {
          console.log('Success while describing log group:', data);
          manageLogStreams(logData);
        }
      }
    });
  }

  function createLogGroup(logData) {
    const logGroupParams = {
      logGroupName: logGroupName,
    };
    cloudWatchLogs.createLogGroup(logGroupParams, function (err, data) {
      if (err) {
        console.log('error while creating log group: ', err, err.stack);
        return;
      } else {
        console.log('Success in creating log group: ', logGroupName);
        manageLogStreams(logData);
      }
    });
  }

  function manageLogStreams(logData) {
    const describeLogStreamsParams = {
      logGroupName: logGroupName,
      logStreamNamePrefix: logStreamName,
    };

    cloudWatchLogs.describeLogStreams(describeLogStreamsParams, function (err, data) {
      if (err) {
        console.log('Error during describe log streams:', err);
        createLogStream(logData);
      } else {
        if (!data.logStreams[0]) {
          console.log('Need to  create log stream:', data);
          createLogStream(logData);
        } else {
          console.log('Log Stream already defined:', logStreamName);
          putLogEvents(data.logStreams[0].uploadSequenceToken, logData);
        }
      }
    });
  }

  function createLogStream(logData) {
    const logStreamParams = {
      logGroupName: logGroupName,
      logStreamName: logStreamName,
    };

    cloudWatchLogs.createLogStream(logStreamParams, function (err, data) {
      if (err) {
        console.log('error while creating log stream: ', err, err.stack);
        return;
      } else {
        console.log('Success in creating log stream: ', logStreamName);
        putLogEvents(null, logData);
      }
    });
  }

  function putLogEvents(sequenceToken, logData) {
    //From http://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html
    const MAX_BATCH_SIZE = 1048576; // maximum size in bytes of Log Events (with overhead) per invocation of PutLogEvents
    const MAX_BATCH_COUNT = 10000; // maximum number of Log Events per invocation of PutLogEvents
    const LOG_EVENT_OVERHEAD = 26; // bytes of overhead per Log Event

    const batches = [];

    let batch = [];

    let batch_size = 0;

    const bufferStream = new stream.PassThrough();
    bufferStream.end(logData);

    const rl = readline.createInterface({
      input: bufferStream,
    });

    let line_count = 0;

    rl.on('line', (line) => {
      ++line_count;
      if (line[0] != '#') {
        let timeValue = Date.parse(line.split('\t')[0]);

        const event_size = line.length + LOG_EVENT_OVERHEAD;

        batch_size += event_size;

        if (batch_size >= MAX_BATCH_SIZE || batch.length >= MAX_BATCH_COUNT) {
          batches.push(batch);
          batch = [];
          batch_size = event_size;
        }

        batch.push({
          message: line,
          timestamp: timeValue,
        });
      }
    });

    rl.on('close', () => {
      if (batch.length > 0) {
        batches.push(batch);
      }
      sendBatches(sequenceToken, batches);
    });
  }

  function sendBatches(sequenceToken, batches) {
    let count = 0;
    let batch_count = 0;

    function sendNextBatch(err, nextSequenceToken) {
      if (err) {
        console.log('Error sending batch: ', err, err.stack);
        return;
      } else {
        const nextBatch = batches.shift();
        if (nextBatch) {
          ++batch_count;
          count += nextBatch.length;
          sendBatch(nextSequenceToken, nextBatch, sendNextBatch);
        } else {
          const msg = `Successfully put ${count} events in ${batch_count} batches`;
          console.log(msg);
          callback(null, msg);
        }
      }
    }

    sendNextBatch(null, sequenceToken);
  }

  function sendBatch(sequenceToken, batch, doNext) {
    const putLogEventParams = {
      logEvents: batch,
      logGroupName: logGroupName,
      logStreamName: logStreamName,
    };
    if (sequenceToken) {
      putLogEventParams['sequenceToken'] = sequenceToken;
    }

    putLogEventParams.logEvents.sort(function (a, b) {
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      return 0;
    });

    cloudWatchLogs.putLogEvents(putLogEventParams, function (err, data) {
      if (err) {
        console.log('Error during put log events: ', err, err.stack);
        doNext(err, null);
      } else {
        console.log(`Success in putting ${putLogEventParams.logEvents.length} events`);
        doNext(null, data.nextSequenceToken);
      }
    });
  }
};
