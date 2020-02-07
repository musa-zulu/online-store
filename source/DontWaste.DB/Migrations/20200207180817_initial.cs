using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DontWaste.DB.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ImageFile",
                columns: table => new
                {
                    ImageFileId = table.Column<Guid>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: true),
                    DateLastModified = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageFile", x => x.ImageFileId);
                });

            migrationBuilder.CreateTable(
                name: "FoodCategory",
                columns: table => new
                {
                    FoodCategoryId = table.Column<Guid>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: true),
                    DateLastModified = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: false),
                    ImageFileId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodCategory", x => x.FoodCategoryId);
                    table.ForeignKey(
                        name: "FK_FoodCategory_ImageFile_ImageFileId",
                        column: x => x.ImageFileId,
                        principalTable: "ImageFile",
                        principalColumn: "ImageFileId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FoodItem",
                columns: table => new
                {
                    FoodItemId = table.Column<Guid>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: true),
                    DateLastModified = table.Column<DateTime>(nullable: true),
                    FoodItemDescription = table.Column<string>(nullable: false),
                    ImageFileId = table.Column<Guid>(nullable: false),
                    FoodCategoryId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodItem", x => x.FoodItemId);
                    table.ForeignKey(
                        name: "FK_FoodItem_FoodCategory_FoodCategoryId",
                        column: x => x.FoodCategoryId,
                        principalTable: "FoodCategory",
                        principalColumn: "FoodCategoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FoodItem_ImageFile_ImageFileId",
                        column: x => x.ImageFileId,
                        principalTable: "ImageFile",
                        principalColumn: "ImageFileId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FoodCategory_ImageFileId",
                table: "FoodCategory",
                column: "ImageFileId");

            migrationBuilder.CreateIndex(
                name: "IX_FoodItem_FoodCategoryId",
                table: "FoodItem",
                column: "FoodCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_FoodItem_ImageFileId",
                table: "FoodItem",
                column: "ImageFileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FoodItem");

            migrationBuilder.DropTable(
                name: "FoodCategory");

            migrationBuilder.DropTable(
                name: "ImageFile");
        }
    }
}
