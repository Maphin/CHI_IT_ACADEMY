import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDataToDB1732818166442 implements MigrationInterface {
    name = 'AddedDataToDB1732818166442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_89cb258e8d851834a8cd5b8b07c"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "exhibitId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_89cb258e8d851834a8cd5b8b07c" FOREIGN KEY ("exhibitId") REFERENCES "exhibits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_89cb258e8d851834a8cd5b8b07c"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "exhibitId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_89cb258e8d851834a8cd5b8b07c" FOREIGN KEY ("exhibitId") REFERENCES "exhibits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
