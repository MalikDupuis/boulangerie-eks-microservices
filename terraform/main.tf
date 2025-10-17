terraform {
  /* backend "s3" {
    bucket = "${var.aws_account_id}-bucket-state-file-boulangerie-v1"
    key    = "terraform.eks.tfstate"
    region = var.region

  } */
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
  bucket = "${var.aws_account_id}-bucket-state-file-boulangerie-v1"

  tags = {
    Name = "State File Bucket"
  }
}