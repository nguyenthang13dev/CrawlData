using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class alterfuelconsumer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PlateNumberId",
                table: "FuelConsumption",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "40befd71-817a-4585-bcda-8736d647de90", "AQAAAAIAAYagAAAAEHjjipINHktE5aQ0wtmrIQmZMMR+1eN9Z9o5jTnRZwZ/gF4POaiv+zsIojcdyZILeA==", "8619cf6d-b42f-44ce-ad05-473fe8bb63de" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlateNumberId",
                table: "FuelConsumption");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0eed55cd-92a6-442d-917a-90e0609148c6", "AQAAAAIAAYagAAAAEGntPBtnsDhU0Us4mzVRZfSXfJdwGte/8LOe3PQ6b7glapx93gza7kdvQlbF7av5MA==", "61dee321-9a56-4bb6-a2c8-f7ef5ee40afd" });
        }
    }
}
