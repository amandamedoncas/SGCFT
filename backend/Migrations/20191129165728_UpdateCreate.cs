using Microsoft.EntityFrameworkCore.Migrations;

namespace SGCFT.Migrations
{
    public partial class UpdateCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ModuloId",
                table: "Videos",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdAlternativa",
                table: "Respostas",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Videos_ModuloId",
                table: "Videos",
                column: "ModuloId");

            migrationBuilder.AddForeignKey(
                name: "FK_Videos_Modulos_ModuloId",
                table: "Videos",
                column: "ModuloId",
                principalTable: "Modulos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Videos_Modulos_ModuloId",
                table: "Videos");

            migrationBuilder.DropIndex(
                name: "IX_Videos_ModuloId",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "ModuloId",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "IdAlternativa",
                table: "Respostas");
        }
    }
}
