using Microsoft.EntityFrameworkCore.Migrations;

namespace SGCFT.Migrations
{
    public partial class AtualizacaoCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Respostas_Usuarios_UsuarioId",
                table: "Respostas");

            migrationBuilder.DropForeignKey(
                name: "FK_Treinamentos_Usuarios_AutorId",
                table: "Treinamentos");

            migrationBuilder.DropIndex(
                name: "IX_Treinamentos_AutorId",
                table: "Treinamentos");

            migrationBuilder.DropIndex(
                name: "IX_Respostas_UsuarioId",
                table: "Respostas");

            migrationBuilder.DropColumn(
                name: "AutorId",
                table: "Treinamentos");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Respostas");

            migrationBuilder.AddColumn<int>(
                name: "IdAutor",
                table: "Treinamentos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdTreinamento",
                table: "Modulos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdPergunta",
                table: "Alternativas",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdAutor",
                table: "Treinamentos");

            migrationBuilder.DropColumn(
                name: "IdTreinamento",
                table: "Modulos");

            migrationBuilder.DropColumn(
                name: "IdPergunta",
                table: "Alternativas");

            migrationBuilder.AddColumn<int>(
                name: "AutorId",
                table: "Treinamentos",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Respostas",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Treinamentos_AutorId",
                table: "Treinamentos",
                column: "AutorId");

            migrationBuilder.CreateIndex(
                name: "IX_Respostas_UsuarioId",
                table: "Respostas",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Respostas_Usuarios_UsuarioId",
                table: "Respostas",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Treinamentos_Usuarios_AutorId",
                table: "Treinamentos",
                column: "AutorId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
