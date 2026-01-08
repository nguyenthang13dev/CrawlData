using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class addFuelConsumption : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DuCuoi",
                table: "FuelConsumption",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "NhapDau",
                table: "FuelConsumption",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TonDau",
                table: "FuelConsumption",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "250b8941-a212-48ef-9419-5dbf94b57310", "AQAAAAIAAYagAAAAENf1Ky2OS5tOpnqzqmNsvpnWpUCGGiUXoADAcSzSzHjh4xWS2JIVW4vAezOipB44xg==", "eaa0ced9-b23e-48a2-a779-148f6f722240" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DuCuoi",
                table: "FuelConsumption");

            migrationBuilder.DropColumn(
                name: "NhapDau",
                table: "FuelConsumption");

            migrationBuilder.DropColumn(
                name: "TonDau",
                table: "FuelConsumption");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d434c296-2f06-48e5-8555-8f5caa827ad8", "AQAAAAIAAYagAAAAEHcwXcd2b3Ht03zewbe3sFFpCtWoD9oRqeicjT1b+lp8KCq7WxAEwhzHdZs/1eT2kA==", "0e545f42-6c2d-4e61-993b-f778ab546d5f" });
        }
    }
}
