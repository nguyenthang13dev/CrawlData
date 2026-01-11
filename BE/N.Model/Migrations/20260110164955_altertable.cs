using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class altertable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "DetailLession",
                newName: "BlockType");

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "DetailLession",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "IndexBox",
                table: "DetailLession",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsHeader",
                table: "DetailLession",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b30d32d2-b528-461c-b736-3d9bd8cb7790", "AQAAAAIAAYagAAAAECX060Nu1tGasAJM3iMxVv/hjRJS4UPzIRKIkQa561btG083uz9c+6Ye3LemIifzYQ==", "cb1972e0-252a-4ab5-8d2b-14dfc5f98c39" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IndexBox",
                table: "DetailLession");

            migrationBuilder.DropColumn(
                name: "IsHeader",
                table: "DetailLession");

            migrationBuilder.RenameColumn(
                name: "BlockType",
                table: "DetailLession",
                newName: "Title");

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "DetailLession",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "044c41ac-0ddc-44eb-b624-a79fa60ffc59", "AQAAAAIAAYagAAAAEGzL0gT6VcXaYX4yCvdRu6mSQX25RyLfPM+fej49emAijhJTOaM4wm/7vaJ4TkhgDg==", "554bd881-8afe-43de-bbb7-ae6fe4f3e318" });
        }
    }
}
