namespace TeachEasy.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class guestion : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Questions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        QuestionText = c.String(nullable: false),
                        Answer = c.String(nullable: false),
                        IsPublic = c.Boolean(nullable: false),
                        SubjectId = c.String(),
                        AuthorId = c.String(),
                        Token = c.Int(nullable: false),
                        Ip = c.String(),
                        MacAddress = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                        ModifiedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
        }
        
        public override void Down()
        {
            DropTable("dbo.Questions");
        }
    }
}
