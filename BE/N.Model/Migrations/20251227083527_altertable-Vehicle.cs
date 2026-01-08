using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class altertableVehicle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "ConsumerFuel",
                table: "Vehicle",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d434c296-2f06-48e5-8555-8f5caa827ad8", "AQAAAAIAAYagAAAAEHcwXcd2b3Ht03zewbe3sFFpCtWoD9oRqeicjT1b+lp8KCq7WxAEwhzHdZs/1eT2kA==", "0e545f42-6c2d-4e61-993b-f778ab546d5f" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConsumerFuel",
                table: "Vehicle");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "40befd71-817a-4585-bcda-8736d647de90", "AQAAAAIAAYagAAAAEHjjipINHktE5aQ0wtmrIQmZMMR+1eN9Z9o5jTnRZwZ/gF4POaiv+zsIojcdyZILeA==", "8619cf6d-b42f-44ce-ad05-473fe8bb63de" });
        }
    }
}
