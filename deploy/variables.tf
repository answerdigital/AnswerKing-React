variable "bucket_name" {
  default = "answerking-bucket-react"
}

variable "api_ecs_loadbalancer" {
  description = "The domain or instance of ECS/2 loadbalancer to connect to the API."
  type        = string
  default     = ""
}

variable "ssl_certificate_arn" {
  description = "The certificate ARN for the provided domain. Be aware that for cloud front the certicate needs to be available in us-east-1."
  type        = string
  default     = ""
}
