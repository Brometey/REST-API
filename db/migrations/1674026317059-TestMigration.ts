import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigration1674026317059 implements MigrationInterface {
  name = 'TestMigration1674026317059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "something" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "something"`);
  }
}
