<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="Limilabs.Mail" %>
<%@ Import Namespace="Limilabs.Client.IMAP" %>
<%@ Import Namespace="System.Net.Mail" %>
<%@ Import Namespace="HtmlAgilityPack" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="System.Data.OleDb" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data.SqlTypes" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">

    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID, countryCode, responseMessage;

        //GET VALUE FROM QUERY STRING      
        clientID = Request.QueryString["clientId"];
        countryCode = Request.QueryString["countryCode"];

        try
        {

            msvInterface.msvInfoX.InitiateInbound(clientID, countryCode, "email");
            ProccessEmailContent(clientID, countryCode, "email");
            responseMessage = "{\"status\":\"success\", \"response\":\"" + "SP001" + "\"}";
        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "msvintegrate", ex.Message, ex.StackTrace);
            responseMessage = "{\"status\":\"failure\", \"response\":\"" + ex.Message + "\"}";
        }

        Response.ContentType = "text/json";
        Response.Write(responseMessage);
    }

    private static void ProccessEmailContent(String clientID, String countryCode, String inboundType)
    {
        HtmlDocument htmlFile;
        String[] fileList;
        String fileName, responseStatus;
        XmlDocument inputXMLData;
        XmlNode documentNode, dataNode, filePathNode, fileNameNode;

        try
        {
            htmlFile = new HtmlDocument();
            inputXMLData = new XmlDocument();
            responseStatus = "";
            fileName = "";
            documentNode = inputXMLData.CreateElement("document");
            dataNode = null;
            filePathNode = null;
            fileNameNode = null;
            fileList = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/content_store/" + clientID + "/" + countryCode + "/" +"msvInfoX/inbound/"+ inboundType +"/mailLeads/"));

            foreach (string filePath in fileList)
            {
                try
                {
                    htmlFile.LoadHtml(File.ReadAllText(filePath));
                    fileName = Path.GetFileName(filePath);

                    foreach (HtmlNode tablelist1 in htmlFile.DocumentNode.SelectNodes("html/body/div/table/tbody/tr/td/div/table/tbody/tr/td/table"))
                    {
                        if (tablelist1.SelectNodes("tbody/tr/td/table/tbody/tr/td/h2") != null)
                        {
                            foreach (HtmlNode tablelist2 in tablelist1.SelectNodes("tbody/tr/td/table/tbody/tr/td/table"))
                            {
                                if (tablelist2.SelectSingleNode("tbody/tr/td/p").InnerText != "&nbsp;\r\n")
                                {
                                    foreach (HtmlNode tablelist3 in tablelist2.SelectNodes("tbody/tr"))
                                    {
                                        dataNode = inputXMLData.CreateElement(tablelist3.SelectNodes("td")[0].InnerText.ToString().Replace("\r\n", "").Replace(" ", "_").ToLower());
                                        dataNode.InnerXml = tablelist3.SelectNodes("td")[1].InnerText.ToString().Replace("\r\n", "");
                                        documentNode.AppendChild(dataNode);
                                    }

                                    filePathNode = inputXMLData.CreateElement("file_path");
                                    fileNameNode = inputXMLData.CreateElement("file_name");

                                    filePathNode.InnerXml = "content_store/" + clientID + "/" + countryCode + "/" + "msvInfoX/inbound/" + inboundType + "/processed/success";
                                    fileNameNode.InnerXml = fileName;

                                    documentNode.AppendChild(filePathNode);
                                    documentNode.AppendChild(fileNameNode);
                                    inputXMLData.AppendChild(documentNode);

                                    break;
                                }
                            }
                        }
                    }

                    responseStatus = UploadDataTable(clientID, countryCode, "mailleads", inputXMLData);
                }
                catch (Exception ex)
                {
                    msvUtil.LogException(clientID, countryCode, "msvintegrate", ex.Message, ex.StackTrace);
                    responseStatus = "failure";
                }

                ProcessFile(clientID, countryCode, "email", filePath, fileName, responseStatus);
            }
        }
        catch(Exception ex)
        {
            throw ex;
        }
    }

    private static String UploadDataTable(String clientID, String countryCode, String infoXType, XmlDocument sourceDataXML)
    {
        SqlConnection conn;
        SqlCommand command, createTableCommand;
        String createTableQuery, insertTableQuery, insertValues, responseStatus;

        conn = null;
        responseStatus = "success";

        try
        {
            conn = new SqlConnection();
            conn.ConnectionString = ConfigurationManager.ConnectionStrings["conn_" + clientID + "_" + countryCode + "_app"].ConnectionString;

            command = new SqlCommand();
            createTableCommand = new SqlCommand();

            command.Connection = conn;
            createTableCommand.Connection = conn;

            conn.Open();

            createTableQuery = "create table ##load_" + infoXType + "_" + clientID + " (field nvarchar(500), value nvarchar(500))\n";
            insertTableQuery = "insert ##load_" + infoXType + "_" + clientID + " (field, value)";

            for (int sourceDataChildCount = 0; sourceDataChildCount < sourceDataXML.DocumentElement.ChildNodes.Count; sourceDataChildCount++)
            {
                insertValues = "";
                insertValues += insertTableQuery + "values (";
                insertValues += "N" + "'" + sourceDataXML.DocumentElement.ChildNodes[sourceDataChildCount].Name.ToString() + "'," + "N" + "'" + (sourceDataXML.DocumentElement.ChildNodes[sourceDataChildCount].InnerText).ToString().Replace("'", "''") + "')\n";
                createTableQuery += insertValues;
            }

            createTableCommand.CommandText = createTableQuery;
            createTableCommand.Connection = conn;
            createTableCommand.ExecuteNonQuery();

            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Clear();
            command.CommandText = "sp_load_" + infoXType + "_" + clientID + "_" + countryCode;
            command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid("00000000-0000-0000-0000-000000000000");
            command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = clientID + "admn";
            command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
            command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = "en-us";
            command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;

            SqlParameter prmo_update_status = command.Parameters.Add("@o_update_status", SqlDbType.VarChar, 5);

            prmo_update_status.Direction = ParameterDirection.Output;

            command.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "msvintegrate", ex.Message, ex.StackTrace);
            responseStatus = "failure";
        }
        finally
        {
            conn.Close();
        }

        return responseStatus;
    }

    private static void ProcessFile(String clientID, String countryCode, String inboundType, String filePath, String fileName, String responseStatus)
    {
        String targetPath;

        try
        {
            targetPath = (HttpContext.Current.Server.MapPath("~/content_store/" + clientID + "/" + countryCode + "/" + "msvInfoX/inbound/" + inboundType + "/mailLeads" + "/processed/" + responseStatus));

            if (!Directory.Exists(targetPath))
            {
                Directory.CreateDirectory(targetPath);
            }

            if (File.Exists(filePath))
            {
                File.Copy(filePath, targetPath + "/" + fileName, true);
                File.Delete(filePath);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
</script>