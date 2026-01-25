-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "accounts";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "logs";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "permissions";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "systems";

-- CreateEnum
CREATE TYPE "logs"."enum_action_type" AS ENUM ('CREATED', 'UPDATED', 'DELETED');

-- CreateEnum
CREATE TYPE "logs"."enum_failure_reason" AS ENUM ('INVALID_CREDENTIALS', 'INACTIVE_ACCOUNT', 'INACTIVE_SYSTEM', 'INACTIVE_RESOURCE', 'INSUFFICIENT_PERMISSIONS');

-- CreateTable
CREATE TABLE "accounts"."tb_account" (
    "id" BIGSERIAL NOT NULL,
    "cd_enrollment" BIGINT NOT NULL,
    "tx_name" VARCHAR(255) NOT NULL,
    "tx_email" VARCHAR(255) NOT NULL,
    "tx_password" VARCHAR(255) NOT NULL,
    "bl_active" BOOLEAN NOT NULL DEFAULT true,
    "dt_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMP(3),
    "dt_deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts"."tb_account_system" (
    "id_account" BIGINT NOT NULL,
    "id_system" BIGINT NOT NULL,
    "js_metadata" JSONB,

    CONSTRAINT "tb_account_system_pkey" PRIMARY KEY ("id_account","id_system")
);

-- CreateTable
CREATE TABLE "accounts"."tb_account_role" (
    "id_account" BIGINT NOT NULL,
    "id_role" BIGINT NOT NULL,

    CONSTRAINT "tb_account_role_pkey" PRIMARY KEY ("id_account","id_role")
);

-- CreateTable
CREATE TABLE "systems"."tb_system" (
    "id" BIGSERIAL NOT NULL,
    "tx_system_key" VARCHAR(32) NOT NULL,
    "tx_name" VARCHAR(255) NOT NULL,
    "tx_description" VARCHAR(500),
    "bl_active" BOOLEAN NOT NULL DEFAULT true,
    "dt_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMP(3),
    "dt_deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "systems"."tb_system_config" (
    "id" BIGSERIAL NOT NULL,
    "id_system" BIGINT NOT NULL,
    "tx_token_key" VARCHAR(255) NOT NULL,
    "vl_expiration_time" INTEGER NOT NULL,
    "js_complementary_config" JSONB,
    "dt_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMP(3),

    CONSTRAINT "tb_system_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions"."tb_role" (
    "id" BIGSERIAL NOT NULL,
    "tx_name" VARCHAR(255) NOT NULL,
    "tx_description" VARCHAR(500),
    "bl_active" BOOLEAN NOT NULL DEFAULT true,
    "id_system" BIGINT NOT NULL,
    "dt_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMP(3),
    "dt_deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions"."tb_role_resource" (
    "id_role" BIGINT NOT NULL,
    "id_resource" BIGINT NOT NULL,

    CONSTRAINT "tb_role_resource_pkey" PRIMARY KEY ("id_role","id_resource")
);

-- CreateTable
CREATE TABLE "permissions"."tb_resource" (
    "id" BIGSERIAL NOT NULL,
    "id_system" BIGINT NOT NULL,
    "id_resource_type" BIGINT NOT NULL,
    "tx_code" VARCHAR(255) NOT NULL,
    "tx_description" VARCHAR(500),
    "bl_active" BOOLEAN NOT NULL DEFAULT true,
    "tx_path" VARCHAR(500) NOT NULL,
    "tx_path_regex" VARCHAR(500) NOT NULL,
    "tx_method" VARCHAR(10) NOT NULL,
    "dt_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMP(3),
    "dt_deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions"."tb_resource_type" (
    "id" BIGSERIAL NOT NULL,
    "tx_resource_name" VARCHAR(255) NOT NULL,
    "tx_description" VARCHAR(500) NOT NULL,
    "dt_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMP(3),

    CONSTRAINT "tb_resource_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs"."tb_audit_log" (
    "id" BIGSERIAL NOT NULL,
    "id_account" BIGINT NOT NULL,
    "id_system" BIGINT NOT NULL,
    "tx_action_type" "logs"."enum_action_type" NOT NULL,
    "tx_table_name" VARCHAR(255) NOT NULL,
    "id_record_affected" BIGINT NOT NULL,
    "js_old_value" JSONB NOT NULL,
    "js_new_value" JSONB NOT NULL,
    "tx_ip_address" VARCHAR(255),
    "dt_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs"."tb_access_log" (
    "id" BIGSERIAL NOT NULL,
    "id_account" BIGINT NOT NULL,
    "id_system" BIGINT NOT NULL,
    "id_resource" BIGINT NOT NULL,
    "bl_success" BOOLEAN NOT NULL,
    "tx_failure_reason" "logs"."enum_failure_reason",
    "tx_failure_message" VARCHAR(1000),
    "tx_ip_address" VARCHAR(255),
    "dt_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_access_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_account_cd_enrollment_key" ON "accounts"."tb_account"("cd_enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "tb_account_tx_email_key" ON "accounts"."tb_account"("tx_email");

-- CreateIndex
CREATE INDEX "idx_tb_account_tx_email" ON "accounts"."tb_account"("tx_email");

-- CreateIndex
CREATE INDEX "idx_tb_account_cd_enrollment" ON "accounts"."tb_account"("cd_enrollment");

-- CreateIndex
CREATE INDEX "idx_tb_account_cd_enrollment_bl_active" ON "accounts"."tb_account"("cd_enrollment", "bl_active");

-- CreateIndex
CREATE UNIQUE INDEX "tb_system_tx_system_key_key" ON "systems"."tb_system"("tx_system_key");

-- CreateIndex
CREATE UNIQUE INDEX "tb_system_tx_name_key" ON "systems"."tb_system"("tx_name");

-- CreateIndex
CREATE INDEX "idx_tb_system_tx_name" ON "systems"."tb_system"("tx_name");

-- CreateIndex
CREATE INDEX "idx_tb_system_tx_system_key" ON "systems"."tb_system"("tx_system_key");

-- CreateIndex
CREATE INDEX "idx_tb_system_tx_system_key_bl_active" ON "systems"."tb_system"("tx_system_key", "bl_active");

-- CreateIndex
CREATE UNIQUE INDEX "tb_system_config_id_system_key" ON "systems"."tb_system_config"("id_system");

-- CreateIndex
CREATE UNIQUE INDEX "tb_system_config_tx_token_key_key" ON "systems"."tb_system_config"("tx_token_key");

-- CreateIndex
CREATE INDEX "idx_tb_role_tx_name" ON "permissions"."tb_role"("tx_name");

-- CreateIndex
CREATE INDEX "idx_tb_role_id_system" ON "permissions"."tb_role"("id_system");

-- CreateIndex
CREATE INDEX "idx_tb_role_tx_name_id_system" ON "permissions"."tb_role"("tx_name", "id_system");

-- CreateIndex
CREATE UNIQUE INDEX "tb_role_tx_name_id_system_key" ON "permissions"."tb_role"("tx_name", "id_system");

-- CreateIndex
CREATE UNIQUE INDEX "tb_resource_tx_code_key" ON "permissions"."tb_resource"("tx_code");

-- CreateIndex
CREATE INDEX "idx_tb_resource_tx_code" ON "permissions"."tb_resource"("tx_code");

-- CreateIndex
CREATE INDEX "idx_tb_resource_id_system" ON "permissions"."tb_resource"("id_system");

-- CreateIndex
CREATE INDEX "idx_tb_resource_id_resource_type" ON "permissions"."tb_resource"("id_resource_type");

-- CreateIndex
CREATE UNIQUE INDEX "tb_resource_tx_path_tx_method_id_system_key" ON "permissions"."tb_resource"("tx_path", "tx_method", "id_system");

-- CreateIndex
CREATE UNIQUE INDEX "tb_resource_type_tx_resource_name_key" ON "permissions"."tb_resource_type"("tx_resource_name");

-- CreateIndex
CREATE INDEX "idx_tb_resource_type_tx_resource_name" ON "permissions"."tb_resource_type"("tx_resource_name");

-- CreateIndex
CREATE INDEX "idx_tb_audit_log_id_account" ON "logs"."tb_audit_log"("id_account");

-- CreateIndex
CREATE INDEX "idx_tb_audit_log_id_system" ON "logs"."tb_audit_log"("id_system");

-- CreateIndex
CREATE INDEX "idx_tb_audit_log_tx_table_name" ON "logs"."tb_audit_log"("tx_table_name");

-- CreateIndex
CREATE INDEX "idx_tb_audit_log_id_record_affected" ON "logs"."tb_audit_log"("id_record_affected");

-- CreateIndex
CREATE INDEX "idx_tb_audit_log_id_account_id_system" ON "logs"."tb_audit_log"("id_account", "id_system");

-- CreateIndex
CREATE INDEX "idx_tb_audit_log_tx_table_name_id_record_affected" ON "logs"."tb_audit_log"("tx_table_name", "id_record_affected");

-- CreateIndex
CREATE INDEX "idx_tb_audit_log_id_account_id_system_tx_table_name" ON "logs"."tb_audit_log"("id_account", "id_system", "tx_table_name");

-- CreateIndex
CREATE INDEX "idx_tb_access_log_id_account" ON "logs"."tb_access_log"("id_account");

-- CreateIndex
CREATE INDEX "idx_tb_access_log_id_system" ON "logs"."tb_access_log"("id_system");

-- CreateIndex
CREATE INDEX "idx_tb_access_log_id_resource" ON "logs"."tb_access_log"("id_resource");

-- CreateIndex
CREATE INDEX "idx_tb_access_log_id_account_id_system" ON "logs"."tb_access_log"("id_account", "id_system");

-- CreateIndex
CREATE INDEX "idx_tb_access_log_id_system_id_resource" ON "logs"."tb_access_log"("id_system", "id_resource");

-- AddForeignKey
ALTER TABLE "accounts"."tb_account_system" ADD CONSTRAINT "tb_account_system_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"."tb_account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts"."tb_account_system" ADD CONSTRAINT "tb_account_system_id_system_fkey" FOREIGN KEY ("id_system") REFERENCES "systems"."tb_system"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts"."tb_account_role" ADD CONSTRAINT "tb_account_role_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"."tb_account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts"."tb_account_role" ADD CONSTRAINT "tb_account_role_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "permissions"."tb_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systems"."tb_system_config" ADD CONSTRAINT "tb_system_config_id_system_fkey" FOREIGN KEY ("id_system") REFERENCES "systems"."tb_system"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions"."tb_role" ADD CONSTRAINT "tb_role_id_system_fkey" FOREIGN KEY ("id_system") REFERENCES "systems"."tb_system"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions"."tb_role_resource" ADD CONSTRAINT "tb_role_resource_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "permissions"."tb_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions"."tb_role_resource" ADD CONSTRAINT "tb_role_resource_id_resource_fkey" FOREIGN KEY ("id_resource") REFERENCES "permissions"."tb_resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions"."tb_resource" ADD CONSTRAINT "tb_resource_id_system_fkey" FOREIGN KEY ("id_system") REFERENCES "systems"."tb_system"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions"."tb_resource" ADD CONSTRAINT "tb_resource_id_resource_type_fkey" FOREIGN KEY ("id_resource_type") REFERENCES "permissions"."tb_resource_type"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
