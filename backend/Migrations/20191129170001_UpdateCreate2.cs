using Microsoft.EntityFrameworkCore.Migrations;

namespace SGCFT.Migrations
{
    public partial class UpdateCreate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdAlternativa",
                table: "Respostas");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdAlternativa",
                table: "Respostas",
                nullable: false,
                defaultValue: 0);
        }
    }
}
