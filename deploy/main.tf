provider "aws" {
  region     = "eu-west-2"
}

terraform {
  backend "s3" {
    bucket = "answerking-bucket-react"
    key    = "terraform.tfstate"
    region = "eu-west-2"
  }
}
