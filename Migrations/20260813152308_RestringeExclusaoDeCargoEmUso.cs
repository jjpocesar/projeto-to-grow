using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoToGrow.Migrations
{
    /// <inheritdoc />
    public partial class RestringeExclusaoDeCargoEmUso : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pessoas_Cargos_CargoId",
                table: "Pessoas");

            migrationBuilder.AddForeignKey(
                name: "FK_Pessoas_Cargos_CargoId",
                table: "Pessoas",
                column: "CargoId",
                principalTable: "Cargos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pessoas_Cargos_CargoId",
                table: "Pessoas");

            migrationBuilder.AddForeignKey(
                name: "FK_Pessoas_Cargos_CargoId",
                table: "Pessoas",
                column: "CargoId",
                principalTable: "Cargos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
