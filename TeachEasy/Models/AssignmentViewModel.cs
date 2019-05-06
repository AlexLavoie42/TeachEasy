using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeachEasy.Models
{
    public class Assignment
    {
        public String name { get; set; }
        public int id { get; }

        public Assignment(String name)
        {
            id = new Random().Next();
        }
    }

    public class AssignmentSection
    {
        int assignmentID { get; }
        String questionRAWHTML { get; set; }
        int assignmentIndex { get; }

        public AssignmentSection()
        {

        }
    }
}
