terraform {
  backend "s3" {
    bucket = "307952838934-bucket-state-file"
    key    = "terraform.eks.tfstate"
    region = "eu-west-1"

  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.16.0"
    }
  }
}

data "aws_caller_identity" "current" {}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      ManagedBy   = "Terraform"
      app_name    = local.app_name
      Environment = var.environment
      Owner       = "Malik"
    }

  }
}

resource "aws_s3_bucket" "state" {
  bucket = "${local.app_name}-${var.aws_account_id}-bucket-state-file"

  tags = {
    Name = "State File Bucket"
  }
}