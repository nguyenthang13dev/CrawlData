using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class remote : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "DetailLession");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "43fb6fd3-aa3a-49ef-987d-a41c0788d709", "AQAAAAIAAYagAAAAEF6C61PS0BkUMtlCK4b97xK5Ykb90MpAu3jrpbFVW2zUVsXm4VBytb/kyb1JYzr3Hg==", "a9635d4a-a19a-4fc3-8609-547563febf42" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "DetailLession",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b30d32d2-b528-461c-b736-3d9bd8cb7790", "AQAAAAIAAYagAAAAECX060Nu1tGasAJM3iMxVv/hjRJS4UPzIRKIkQa561btG083uz9c+6Ye3LemIifzYQ==", "cb1972e0-252a-4ab5-8d2b-14dfc5f98c39" });
        }
    }
}
