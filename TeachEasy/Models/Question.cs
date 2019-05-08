using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;
using System.Net.NetworkInformation;

namespace TeachEasy.Models
{

    public class Question
    {
        [Key]
        public int Id { get; set; }
        public int Token { get; set; } = new Random().Next();
        [Required]
        public string QuestionText { get; set; }
        [Required]
        public string Answer { get; set; }
        public string AuthorId { get; set; }
        public Boolean IsPublic { get; set; } = false;
        public string SubjectId { get; set; }
        public string[] Tag { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedAt { get; set; }
        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime ModifiedAt { get; set; }
        public string Ip { get; set; } = GetIPAddress();
        public string MacAddress { get; set; } = GetMacAddress();

        private static string GetIPAddress()
        {
            string ipList = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }

            return HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
        }

        private static string GetMacAddress()
        {
            string addr = "";
            foreach (NetworkInterface n in NetworkInterface.GetAllNetworkInterfaces())
            {
                if (n.OperationalStatus == OperationalStatus.Up)
                {
                    addr += n.GetPhysicalAddress().ToString();
                    break;
                }
            }
            return addr;
        }

    }
}
