variable "region" {
  type        = string
  description = "AWS région"
  default     = "eu-west-1"
}

variable "aws_account_id" {
  type        = string
  description = "AWS account ID"
}

variable "environment" {
  type        = string
  description = "Name of the environment"
  default     = "dev"
}

variable "cluster_name" {
  description = "Nom du cluster EKS"
  type        = string
  default     = "boulangerie-eks-cluster"
}

variable "desired_capacity" {
  description = "Nombre de nœuds dans le node group"
  type        = number
  default     = 2
}

variable "instance_type" {
  description = "Type d’instance EC2"
  type        = string
  default     = "t3.medium"
}

variable "users_db_username" {
  description = "Username of the user db"
  type        = string
}

variable "users_db_password" {
  description = "Username of the user db"
  type        = string
}

variable "order_db_username" {
  description = "Username of the order db"
  type        = string
}

variable "order_db_password" {
  description = "Password of the order db"
  type        = string
}