resource "aws_cloudwatch_log_group" "alb_access_log_group" {
  name              = "${var.environment}-cloudfront-react-log"
  retention_in_days = 400
}
