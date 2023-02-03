provider "aws" {
  region     = "eu-west-2"
}

terraform {
  backend "s3" {
    bucket = var.bucket_name
    key    = "terraform.tfstate"
    region = "eu-west-2"
  }
}
