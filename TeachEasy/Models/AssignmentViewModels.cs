using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeachEasy.Models
{
    public class QuizViewModel
    {
        public int id { get; set; }

        public string name { get; set; }

    }

    public class QuestionViewModel
    {
        int assignmentID { get; }
        string questionRAWHTML { get; set; }
        int assignmentIndex { get; }

    }
}
