using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class initdb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bdb40753-c9de-4e1a-9871-7cf262021c03", "AQAAAAIAAYagAAAAELGwe0iAqTVWCrauG6E2qfed0bf0O932i82iz5a/fkC2ZrQSGdHskeUW2MaSE7friA==", "6fcb9e02-2023-43a7-86e1-e62e321cc33a" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a5bc5dc9-7b46-4024-9e86-5cad42d90bf8", "AQAAAAIAAYagAAAAEOM5DIUP5gx2lJocD4pJobCTLfjCb6IdafmWiG6020qCUbrsJbnP9e+WE4TrxtJgLg==", "b35478ac-f967-4a37-8f03-09039966cc65" });
        }
    }
}
