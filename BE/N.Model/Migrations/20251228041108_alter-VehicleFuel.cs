using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class alterVehicleFuel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "eab60c9e-326e-4627-9287-b4d8ecc8d171", "AQAAAAIAAYagAAAAEN/ZvmlPf82+9uFmfw9EipSI+e9Ec3K9JPQkl2T/FHeBhBnTiivhGpw5Jnf2z/ZD2w==", "2fb988bc-b1e3-44a1-ab25-509f02b115e2" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "52338cbe-64a7-4d68-a6a2-d67ed40ca5a6", "AQAAAAIAAYagAAAAEGGEFzWaRKZ7wRCShGrLBN3VwP2ZZbOOLIUhrW5x9mJQ6BfnVwEb/0U5oDqiyciwWQ==", "d505ab16-c2ba-4e15-96d4-22ff69dadecc" });
        }
    }
}
