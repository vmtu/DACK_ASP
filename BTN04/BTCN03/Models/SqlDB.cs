using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace BTCN03.Models
{
    public class SqlDB
    {
        private SqlConnection connection;
        public SqlDB()
        {
            string connectionString =
            "Data Source=NORMAL\\SQLEXPRESS; Initial Catalog=Jewelry; Integrated Security=true";
            connection = new SqlConnection(connectionString);
            connection.Open();
        }
        public bool CommandUpdate(string query){
            SqlCommand command = new SqlCommand(query, connection);
            try
            {
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public Array getData(string query)
        {
            using (var command = new SqlCommand(query, connection))
            {
                using (var reader = command.ExecuteReader())
                {

                    var list = new List<DataModel>();
                    while (reader.Read())
                        list.Add(new DataModel(HttpUtility.HtmlDecode(reader.GetInt32(0).ToString()), HttpUtility.HtmlDecode(reader.GetString(1)), HttpUtility.HtmlDecode(reader.GetString(2)), HttpUtility.HtmlDecode(reader.GetString(3)), HttpUtility.HtmlDecode(reader.GetString(4)), HttpUtility.HtmlDecode(reader.GetString(5)), HttpUtility.HtmlDecode(reader.GetInt32(6).ToString()), HttpUtility.HtmlDecode(reader.GetString(7)), HttpUtility.HtmlDecode(reader.GetString(8)), HttpUtility.HtmlDecode(reader.GetDateTime(9).ToString()), HttpUtility.HtmlDecode(reader.GetString(10)), HttpUtility.HtmlDecode(reader.GetString(11)), HttpUtility.HtmlDecode(reader.GetString(12))));
                    return list.ToArray();
                }
            }
        }
        public int getCount(string query)
        {
            using (var command = new SqlCommand(query, connection))
            {
                using (var reader = command.ExecuteReader())
                {

                    while (reader.Read())
                        return reader.GetInt32(0);
                    return 1;
                }
            }
        }
        public Array getComment(string query)
        {
            using (var command = new SqlCommand(query, connection))
            {
                using (var reader = command.ExecuteReader())
                {

                    var list = new List<DataComment>();
                    while (reader.Read())
                        list.Add(new DataComment(HttpUtility.HtmlDecode(reader.GetInt32(0).ToString()),HttpUtility.HtmlDecode(reader.GetInt32(1).ToString()), HttpUtility.HtmlDecode(reader.GetString(2)), HttpUtility.HtmlDecode(reader.GetString(3))));
                    return list.ToArray();
                }
            }
        }
        public DataModel getItem(string query)
        {
            using (var command = new SqlCommand(query, connection))
            {
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                        return new DataModel(HttpUtility.HtmlDecode(reader.GetInt32(0).ToString()), HttpUtility.HtmlDecode(reader.GetString(1)), HttpUtility.HtmlDecode(reader.GetString(2)), HttpUtility.HtmlDecode(reader.GetString(3)), HttpUtility.HtmlDecode(reader.GetString(4)), HttpUtility.HtmlDecode(reader.GetString(5)), HttpUtility.HtmlDecode(reader.GetInt32(6).ToString()), HttpUtility.HtmlDecode(reader.GetString(7)), HttpUtility.HtmlDecode(reader.GetString(8)), HttpUtility.HtmlDecode(reader.GetDateTime(9).ToString()), HttpUtility.HtmlDecode(reader.GetString(10)), HttpUtility.HtmlDecode(reader.GetString(11)), HttpUtility.HtmlDecode(reader.GetString(12)));
                }
            }
            return null;
        }
    }
}