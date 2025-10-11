module "rds_users_db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "${local.app_name}-${var.environment}-users-db"

  engine            = "mysql"
  engine_version    = "5.7"
  instance_class    = "db.t3.micro"
  allocated_storage = 5

  db_name  = "users_db"
  username = var.users_db_username
  password = var.users_db_password
  port     = "3306"

  iam_database_authentication_enabled = true

  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"
  backup_retention_period = 7

  # Enhanced Monitoring - see example for details on how to create the role
  # by yourself, in case you don't want to create it automatically
  monitoring_interval    = "30"
  monitoring_role_name   = "MyUserRDSMonitoringRole"
  create_monitoring_role = true

  # DB subnet group
  create_db_subnet_group = true
  subnet_ids             = module.vpc.private_subnets

  # DB parameter group
  family = "mysql5.7"

  # DB option group
  major_engine_version = "5.7"

  publicly_accessible = false

  parameters = [
    {
      name  = "character_set_client"
      value = "utf8mb4"
    },
    {
      name  = "character_set_server"
      value = "utf8mb4"
    }
  ]

  options = [
    {
      option_name = "MARIADB_AUDIT_PLUGIN"

      option_settings = [
        {
          name  = "SERVER_AUDIT_EVENTS"
          value = "CONNECT"
        },
        {
          name  = "SERVER_AUDIT_FILE_ROTATIONS"
          value = "37"
        },
      ]
    },
  ]
}

module "rds_order_db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "${local.app_name}-${var.environment}-order-db"

  engine            = "mysql"
  engine_version    = "5.7"
  instance_class    = "db.t3.micro"
  allocated_storage = 5

  db_name  = "order_db"
  username = var.order_db_username
  password = var.order_db_password
  port     = "3306"

  iam_database_authentication_enabled = true

  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"
  backup_retention_period = 7


  # Enhanced Monitoring - see example for details on how to create the role
  # by yourself, in case you don't want to create it automatically
  monitoring_interval    = "30"
  monitoring_role_name   = "MyOrderRDSMonitoringRole"
  create_monitoring_role = true

  # DB subnet group
  create_db_subnet_group = true
  subnet_ids             = module.vpc.private_subnets

  # DB parameter group
  family = "mysql5.7"

  # DB option group
  major_engine_version = "5.7"

  publicly_accessible = false

  parameters = [
    {
      name  = "character_set_client"
      value = "utf8mb4"
    },
    {
      name  = "character_set_server"
      value = "utf8mb4"
    }
  ]

  options = [
    {
      option_name = "MARIADB_AUDIT_PLUGIN"

      option_settings = [
        {
          name  = "SERVER_AUDIT_EVENTS"
          value = "CONNECT"
        },
        {
          name  = "SERVER_AUDIT_FILE_ROTATIONS"
          value = "37"
        },
      ]
    },
  ]
}

resource "aws_security_group" "rds_sg" {
  name        = "${var.environment}-rds-sg"
  description = "Security Group for RDS databases"
  vpc_id      = module.vpc.vpc_id

  # Autoriser uniquement le trafic MySQL depuis le réseau privé du VPC
  ingress {
    description = "MySQL access from private subnets"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = module.vpc.private_subnets_cidr_blocks
  }

  # Autoriser toutes les connexions sortantes (pour les réponses)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  
}

