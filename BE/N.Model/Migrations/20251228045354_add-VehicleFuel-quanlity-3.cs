using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class addVehicleFuelquanlity3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Quanlity",
                table: "VehicleFuel",
                type: "float",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1fc71068-0391-4242-914c-b4c68bbd6cb6", "AQAAAAIAAYagAAAAEPptnT1cFWPRohkbYj6QziF696OtrPyR5l3+J0QA97U1eLg9YVJJpqsTVotEonb+UA==", "ff535e32-4fdc-4dc8-a092-e91ce7e2c913" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Quanlity",
                table: "VehicleFuel",
                type: "real",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9006cc30-17cc-482a-96b4-f95e9e8838a1", "AQAAAAIAAYagAAAAEIZ1n66foqPJkRtEXOPJVqy0UN1Zygmg81/uR7188lle4fxSw5lXKZOPupFQ5Zk3iQ==", "066da5d2-bf52-411e-a00c-265ea8d1a53d" });
        }
    }
}
