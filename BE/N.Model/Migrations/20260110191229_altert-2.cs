using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace N.Model.Migrations
{
    /// <inheritdoc />
    public partial class altert2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Subject",
                table: "SubjectNXB",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "IdSub",
                table: "Course",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a5bc5dc9-7b46-4024-9e86-5cad42d90bf8", "AQAAAAIAAYagAAAAEOM5DIUP5gx2lJocD4pJobCTLfjCb6IdafmWiG6020qCUbrsJbnP9e+WE4TrxtJgLg==", "b35478ac-f967-4a37-8f03-09039966cc65" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Subject",
                table: "SubjectNXB");

            migrationBuilder.DropColumn(
                name: "IdSub",
                table: "Course");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1afec794-6e58-4602-a976-4c5ee8940153", "AQAAAAIAAYagAAAAEHaXD2sOHsApGcaycocHUvhjUd5MtePXqeR8TVns1puEXMdSep2fb1cRSlVafSNuJQ==", "6a16115e-bbd4-41b4-9bd1-66b043fe8c41" });
        }
    }
}
