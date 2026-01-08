using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class alervehicleremove4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ActionDate",
                table: "VehicleFuel",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "VehicleFuel",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a6ce27ac-0cd9-4fbf-8375-d090bca3a963", "AQAAAAIAAYagAAAAEPqUMt9UMDJ5r9zA057kISUgNW45mfFCXoAH8023s86yUg1nxBuEMznYV9EELZLiRw==", "6ce3bb7c-f57b-4f1a-96f3-7d5fdbbb6877" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActionDate",
                table: "VehicleFuel");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "VehicleFuel");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bd4df3a2-db58-4dd7-b781-e12a60db78c2", "AQAAAAIAAYagAAAAENwEFG84BL3sJ3Tfjlq1LPY93oTjde+w1c8ej/8nzxiVZ4jj+VypKCREdgEUahj+kw==", "6acefde1-fa53-43e5-a7cf-724e0893581c" });
        }
    }
}
