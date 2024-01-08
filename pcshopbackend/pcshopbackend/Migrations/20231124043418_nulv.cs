using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pcshopbackend.Migrations
{
    /// <inheritdoc />
    public partial class nulv : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parts_AspNetUsers_UserID",
                table: "Parts");

            migrationBuilder.DropForeignKey(
                name: "FK_Prebuilds_AspNetUsers_UserID",
                table: "Prebuilds");

            migrationBuilder.DropIndex(
                name: "IX_Prebuilds_UserID",
                table: "Prebuilds");

            migrationBuilder.DropIndex(
                name: "IX_Parts_UserID",
                table: "Parts");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Prebuilds");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Parts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "Prebuilds",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "Parts",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Prebuilds_UserID",
                table: "Prebuilds",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Parts_UserID",
                table: "Parts",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Parts_AspNetUsers_UserID",
                table: "Parts",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prebuilds_AspNetUsers_UserID",
                table: "Prebuilds",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
