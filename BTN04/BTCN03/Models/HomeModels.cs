using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace BTCN03.Models
{
    public class DataModel
    {
        public string id { get; set; }
        public string title{get;set;}
        public string des { get; set; }
        public string linkimg { get; set; }
        public string cost { get; set; }
        public string link { get; set; }
        public string type { get; set; }
        public string style { get; set; }
        public string material { get; set; }
        public string weight { get; set; }
        public string date { get; set; }
        public string author { get; set; }
        public string tag { get; set; }
        public DataModel(string id, string title, string des, string linkimg, string cost, string link, string type, string material, string weight, string date, string author, string tag, string style)
        {
            this.id = id;
            this.title = title;
            this.des = des;
            this.linkimg = linkimg;
            this.cost = cost;
            this.link = link;
            this.type = type;
            this.style = style;
            this.material = material;
            DateTime dt = DateTime.Parse(date);
            date = dt.ToString("dd/MM/yyyy");
            this.date = date;
            this.weight = weight;
            this.author = author;
            this.tag = tag;
        }
    }
    public class DataComment{
        public string id { get; set; }
        public string id_product { get; set; }
        public string name { get; set; }
        public string comment { get; set; }
        public DataComment(string id, string id_product, string name, string comment)
        {
            this.id = id;
            this.id_product = id_product;
            this.name = name;
            this.comment = comment;
        }
    }
    public class HomeModels
    {
        private SqlDB connect;
        public int recordPerPage;
        public int currentPage;
        public HomeModels()
        {
            connect= new SqlDB();
            recordPerPage = 12;
            currentPage = 1;
        }
        public void InsertData(string title,string des,string linkimg,string cost,string link,string type,string style,string material,string weight,string date,string author,string tag)
        {
            title = HttpUtility.HtmlEncode(title);
            des = HttpUtility.HtmlEncode(des);
            link = HttpUtility.HtmlEncode(link);
            linkimg = HttpUtility.HtmlEncode(linkimg);
            cost = HttpUtility.HtmlEncode(cost);
            type = HttpUtility.HtmlEncode(type);
            style = HttpUtility.HtmlEncode(style);
            material = HttpUtility.HtmlEncode(material);
            weight = HttpUtility.HtmlEncode(weight);
            date = HttpUtility.HtmlEncode(date);
            DateTime dt = DateTime.ParseExact(date, "dd/MM/yyyy", null);
            date = dt.ToString("MM-dd-yyyy");
            author = HttpUtility.HtmlEncode(author);
            tag = HttpUtility.HtmlEncode(tag);

            string query = "INSERT INTO dbo.Product ( name, description, link_img, cost, link, type,style, material, weight, date_create, author, tag_name ) Values('" + title + "','" + des + "','" + linkimg + "','" + cost + "','" + link + "','" + type + "','" + style + "','" + material + "','" + weight + "','" + date + "','" + author + "','" + tag + "')";
            connect.CommandUpdate(query);

        }
        public Array getData(string CurrentPage = "0")
        {
            int c;
            if (int.TryParse(CurrentPage, out c))
            {
                currentPage = c;
            }
            if (currentPage >= 1)
                currentPage = currentPage - 1;
            if (currentPage < 0) currentPage = 0;
            int d = currentPage*recordPerPage;
            string query = "SELECT  * FROM     dbo.Product ORDER BY id  OFFSET  "+d+" ROWS FETCH NEXT "+recordPerPage+" ROWS ONLY ";
            return connect.getData(query);
        }
        public Array getDataFilter(string category,string CurrentPage = "0")
        {

            int c;
            if (int.TryParse(CurrentPage, out c))
            {
                currentPage = c;
            }
            if (currentPage >= 1)
                currentPage = currentPage - 1;
            if (currentPage < 0) currentPage = 0;
            int d = currentPage * recordPerPage;
            string query = "SELECT  * FROM  dbo.Product WHERE tag_name = '"+category+"' ORDER BY id  OFFSET  " + d + " ROWS FETCH NEXT " + recordPerPage + " ROWS ONLY ";
            return connect.getData(query);
        }
        public Array findItemById(string id)
        {
            id = HttpUtility.HtmlEncode(id);
            string query = "SELECT * FROM dbo.Product WHERE id = " + id;
            return connect.getData(query);
        }
        public void insertComment(string id_product, string name, string content)
        {
            id_product = HttpUtility.HtmlEncode(id_product);
            name = HttpUtility.HtmlEncode(name);
            content = HttpUtility.HtmlEncode(content);
            string query = "INSERT INTO dbo.Comment (id_product,name,comment) Values('" + id_product + "','" + name + "','" + content + "')";
            connect.CommandUpdate(query);
        }
        public Array getComment(string id)
        {
            string query = "SELECT * FROM dbo.Comment WHERE id_product = '" + id + "'";
            return connect.getComment(query);
        }
        public int totalPage(string category)
        {
            string query = "";
            if(category == null)
                query = "SELECT COUNT(*) FROM dbo.Product";
            else 
                query = "SELECT COUNT(*) FROM dbo.Product WHERE tag_name='"+category+"'";
            int total = connect.getCount(query);
            float b = (float)total / (float)recordPerPage;
            if (b != (float)(int)b)
            {
                return (int)b + 1;
            }
            return (int)b;
        }
    }
    public class Search
    {
        private string keywork{get;set;}
        private string query;
        public int recordPerPage;
        private int currentPage;
        private SqlDB connect;
        public Search(string keywork)
        {
            this.keywork = keywork;
            this.connect = new SqlDB();
            recordPerPage = 12;
        }
        public Search()
        {
            this.connect = new SqlDB();
        }
        public Array getSearchResult(string CurrentPage){
            if (keywork == null)
            {
                return null;
            }
            int c;
            if (int.TryParse(CurrentPage, out c))
            {
                currentPage = c;
            }
            if (currentPage >= 1)
                currentPage = currentPage - 1;
            if (currentPage < 0) currentPage = 0;
            int d = currentPage * recordPerPage;
            query = "SELECT * FROM dbo.Product WHERE ";
            query += " name LIKE '%"+keywork+"%' ";
            query += " OR tag_name LIKE '%" + keywork + "%' ORDER BY id  OFFSET  " + d + " ROWS FETCH NEXT " + recordPerPage + " ROWS ONLY ";
            return connect.getData(query);
        }
        public Array getAdvancedSearchResult(FormCollection collection)
        {
            query = "SELECT * FROM dbo.Product WHERE ";
            List<string> attr = new List<string>();
            foreach (var key in collection.AllKeys)
            {
                var value = collection[key];
                if (value != "" && key !="searchCostFrom"  && key != "searchCostTo")
                {
                    attr.Add(" " + HttpUtility.HtmlEncode(key) + " LIKE '%" + HttpUtility.HtmlEncode(value) + "%' ");
                }
            }
            if (collection["searchCostFrom"] != "" && collection["searchCostTo"] != "")
            {
                attr.Add(" cost BETWEEN " + HttpUtility.HtmlEncode(collection["searchCostFrom"]) + " AND " + HttpUtility.HtmlEncode(collection["searchCostTo"]) + " ");
            }
            else if (collection["searchCostFrom"] != "")
            {
                attr.Add(" cost > " + HttpUtility.HtmlEncode(collection["searchCostFrom"]));
            }
            else if (collection["searchCostTo"] != "")
            {
                attr.Add(" cost < " + HttpUtility.HtmlEncode(collection["searchCostTo"]));
            }
            
            if (attr.Count > 0)
            {
                query += String.Join(" OR ", attr.ToArray());
            }
            else return null;
            return connect.getData(query);
        }
        public int totalPage()
        {
            if (keywork == null)
            {
                return 0    ;
            }
            query = "SELECT COUNT(*) FROM dbo.Product WHERE ";
            query += " name LIKE '%"+keywork+"%' ";
            query += " OR tag_name LIKE '%" + keywork + "%'";
            int total = connect.getCount(query);
            float b = (float)total / (float)recordPerPage;
            if (b != (float)(int)b)
            {
                return (int)b + 1;
            }
            return (int)b;
        }
    }
}