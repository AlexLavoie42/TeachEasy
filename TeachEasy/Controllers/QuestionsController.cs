using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TeachEasy.Models;
using System.Net.NetworkInformation;
using HtmlAgilityPack;
using System.Collections;

namespace TeachEasy.Controllers
{
    public class QuestionsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Questions
        public async Task<ActionResult> Index()
        {
            return View(await db.Questions.ToListAsync());
        }

        // GET: Questions/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Question question = await db.Questions.FindAsync(id);
            if (question == null)
            {
                return HttpNotFound();
            }
            return View(question);
        }

        // GET: Questions/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Questions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,QuestionText,Answer,IsPublic,SubjectId")] Question question)
        {
            if (ModelState.IsValid)
            {
                question.CreatedAt = DateTime.Now;
                question.ModifiedAt = DateTime.Now;
                question.Token = new Random().Next();
                question.AuthorId = System.Web.HttpContext.Current.User.Identity.Name;
                question.Ip = GetIPAddress();
                question.MacAddress = GetMacAddress();

                Question[] questionList = parsingQuestions(question);
                foreach (Question element in questionList)
                {
                    db.Questions.Add(element);
                    await db.SaveChangesAsync();
                }

                return RedirectToAction("Index");
            }

            return View(question);
        }

        private Question[] parsingQuestions(Question question)
        {
            var html = question.QuestionText;
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);

            //var title = htmlDoc.DocumentNode.SelectSingleNode("//h1").InnerText;
            var titleTxt = "";
            var title = htmlDoc.DocumentNode.SelectSingleNode("//input").Attributes["value"];
            if (title != null)
            {
                titleTxt = title.Value;
            }
            var htmlNodes = htmlDoc.DocumentNode.SelectNodes("//div/p");

            List<Question> questionList = new List<Question>();
            string tempQuestionText = "";
            string tempAnswer = "";

            foreach (var node in htmlNodes)
            {
                if (node.Attributes["class"] == null)
                {
                    continue;
                }

                if (node.Attributes["class"].Value == "q")
                {
                    tempQuestionText += node.OuterHtml;
                    if (node.NextSibling.Attributes["class"] == null || node.NextSibling.Attributes["class"].Value == "q")
                    {
                        continue;
                    }
                    else if (node.NextSibling.Attributes["class"].Value == "question")
                    {
                        tempAnswer = node.NextSibling.OuterHtml;
                    }
                }

                Question temp = (Question)question.Clone();
                temp.QuestionText = tempQuestionText;
                temp.Answer = tempAnswer;
                questionList.Add(temp);
                tempQuestionText = "";
                tempAnswer = "";
            }

            return questionList.ToArray();
        }

        // GET: Questions/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Question question = await db.Questions.FindAsync(id);
            if (question == null)
            {
                return HttpNotFound();
            }
            return View(question);
        }

        // POST: Questions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,QuestionText,Answer,IsPublic,SubjectId,CreatedAt,Token")] Question question)
        {
            if (ModelState.IsValid)
            {
                question.ModifiedAt = DateTime.Now;
                question.AuthorId = System.Web.HttpContext.Current.User.Identity.Name;
                question.Ip = GetIPAddress();
                question.MacAddress = GetMacAddress();

                db.Entry(question).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(question);
        }

        // GET: Questions/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Question question = await db.Questions.FindAsync(id);
            if (question == null)
            {
                return HttpNotFound();
            }
            return View(question);
        }

        // POST: Questions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Question question = await db.Questions.FindAsync(id);
            db.Questions.Remove(question);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private string GetIPAddress()
        {
            System.Web.HttpContext context = System.Web.HttpContext.Current;
            string ipList = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }

            return context.Request.ServerVariables["REMOTE_ADDR"];
        }

        private string GetMacAddress()
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
