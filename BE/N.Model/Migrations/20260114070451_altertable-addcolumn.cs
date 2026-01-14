using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class altertableaddcolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Href",
                table: "Lession",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2cf525a6-0e8f-4e9c-b788-38deb095ee43", "AQAAAAIAAYagAAAAEIJi1rSUknCEZpP+hrHTPKjrUvHaqcpGyfHvLAzJchKJtUwkS3YFHyqN9zWJ7edBXA==", "4591a2f7-3174-4456-a007-32df09bac1e7" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Href",
                table: "Lession");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "68774c17-c8fc-404f-877a-121e6dad6597", "AQAAAAIAAYagAAAAEB4Her+m55/tghcJTi/SYYy+yyMWswR4R228rF/ipnQKCsFx5+oVq8vT7pJET7QR+g==", "ba5518f1-652c-4ee7-ae40-4f562561de06" });
        }
    }
}
