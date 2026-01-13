using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class alterttablecourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Href",
                table: "Course",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "68774c17-c8fc-404f-877a-121e6dad6597", "AQAAAAIAAYagAAAAEB4Her+m55/tghcJTi/SYYy+yyMWswR4R228rF/ipnQKCsFx5+oVq8vT7pJET7QR+g==", "ba5518f1-652c-4ee7-ae40-4f562561de06" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Href",
                table: "Course");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bdb40753-c9de-4e1a-9871-7cf262021c03", "AQAAAAIAAYagAAAAELGwe0iAqTVWCrauG6E2qfed0bf0O932i82iz5a/fkC2ZrQSGdHskeUW2MaSE7friA==", "6fcb9e02-2023-43a7-86e1-e62e321cc33a" });
        }
    }
}
