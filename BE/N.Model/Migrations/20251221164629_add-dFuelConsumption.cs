using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class adddFuelConsumption : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "FuelRate",
                table: "FuelConsumption",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0eed55cd-92a6-442d-917a-90e0609148c6", "AQAAAAIAAYagAAAAEGntPBtnsDhU0Us4mzVRZfSXfJdwGte/8LOe3PQ6b7glapx93gza7kdvQlbF7av5MA==", "61dee321-9a56-4bb6-a2c8-f7ef5ee40afd" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "FuelRate",
                table: "FuelConsumption",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2c410f19-2e90-4815-b272-d310e6ba8f5b", "AQAAAAIAAYagAAAAENsBe65x7ymEpqZUnvJDTtqjaW0BVioDYikyDjF2SZS5C91bGpOmA66mLCqlyKSQQw==", "e63cc567-5fca-4429-b8b7-f03a6606a4a6" });
        }
    }
}
