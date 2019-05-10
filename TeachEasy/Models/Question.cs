using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;
using System.Net.NetworkInformation;
using System.Web.Mvc;

namespace TeachEasy.Models
{

    public class Question
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string QuestionText { get; set; }
        [Required]
        public string Answer { get; set; }
        public Boolean IsPublic { get; set; } = false;
        public string SubjectId { get; set; }
        public string[] Tag { get; set; }

        public string AuthorId { get; set; }

        public int Token { get; set; }

        public string Ip { get; set; }

        public string MacAddress { get; set; }
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
        [DataType(DataType.Date)]
        public DateTime ModifiedAt { get; set; }

    }
}
