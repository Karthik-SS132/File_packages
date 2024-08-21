<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System"%>
<%@ Import Namespace="System.IO"%>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Data"%>
<%@ Import Namespace="System.Data.SqlClient"%>
<%@ Import Namespace="System.Xml"%>
<%@ Import Namespace="Newtonsoft.Json"%>
<%@ Import Namespace="Newtonsoft.Json.Linq"%>
<%@ Import Namespace="msvInterface"%>
<%@ Import Namespace="IronPython.Hosting"%>
<%@ Import Namespace="Microsoft.Scripting.Hosting"%>
<%@ Import Namespace="Microsoft.Scripting.Hosting"%>

<script runat="server">

    protected void Page_Load(object sender, EventArgs e)
    {
        dynamic exportParameter, fmtObject, responseObj;
        String dataBaseResponse, responseStr;

        exportParameter = JsonConvert.DeserializeObject<dynamic>(new StreamReader(Request.InputStream).ReadToEnd());
        
        try
        {
           
            fmtObject = GetFmtFile(((String)exportParameter.client_id), ((String)exportParameter.country_code), ((String)exportParameter.locale_id), ((String)exportParameter.document_template));
            dataBaseResponse = GetDataBaseResponse(((String)exportParameter.client_id), ((String)exportParameter.country_code), ((String)exportParameter.session_id), ((String)exportParameter.user_id), ((String)exportParameter.locale_id), ((String)exportParameter.data_retrieve_request_xml), ((String)exportParameter.data_retrieve_service_name));
            responseStr = WriteToExcel(((String)exportParameter.client_id), ((String)exportParameter.country_code), fmtObject.Replace("\r\n\t\t", "").Replace("\r\n\t", "").Replace("\r\n", ""), dataBaseResponse);
            responseObj = JsonConvert.DeserializeObject<dynamic>(responseStr.Replace("\\", "\\\\"));
            Response.Write(responseStr.Replace("\\", "\\\\"));
        }
        catch (Exception ex)
        {
            Response.Write(ex.Message);
			msvUtil.LogException(((String)exportParameter.client_id), ((String)exportParameter.country_code), "msvExport", ex.InnerException.InnerException.Message, ex.StackTrace);
        }
    }

    private static String GetFmtFile(String clientID, String countryCode, String localeID, String templateName)
    {
        try
        {
            if (File.Exists(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + clientID + "_" + countryCode + "_" + localeID + "_fmt.json")))
            {
                return File.ReadAllText(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + clientID + "_" + countryCode + "_" + localeID + "_fmt.json"));
            }
            if (File.Exists(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + clientID + "_" + countryCode + "_fmt.json")))
            {
                return File.ReadAllText(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + clientID + "_" + countryCode + "_fmt.json"));
            }
            if (File.Exists(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + clientID + "_" + localeID + "_fmt.json")))
            {
                return File.ReadAllText(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + clientID + "_" + localeID + "_fmt.json"));
            }
            if (File.Exists(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + clientID + "_fmt.json")))
            {
                return File.ReadAllText(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + clientID + "_fmt.json"));
            }
            if (File.Exists(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + localeID + "_fmt.json")))
            {
                return File.ReadAllText(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_" + localeID + "_fmt.json"));
            }
            if (File.Exists(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_fmt.json")))
            {
                return File.ReadAllText(HttpContext.Current.Server.MapPath("~\\" + "fmt"+ "\\" +"export" + "\\" + templateName + "_fmt.json"));
            }

            throw new FileNotFoundException();
        }
        catch(Exception ex)
        {
            throw ex;
        }
    }

    private static String GetDataBaseResponse(String clientId, String countryCode, String sessionId, String userId, String localeId, String dataRetriveRequestXml, String dataRetriveServiceName)
    {
        String connectionString, responseValue;
        XmlDocument xmlDocument;
        SqlConnection sqlConnection;
        SqlCommand sqlCommand;
        DataTable dataTable;

        try
        {
            sqlConnection = new SqlConnection();
            sqlCommand = new SqlCommand();
            dataTable = new DataTable();
            xmlDocument = new XmlDocument();
            responseValue = "";

            /* GET CONNECTIONSTRING VALUES */
            connectionString = ConfigurationManager.ConnectionStrings["conn_" + clientId + "_" + countryCode + "_" + "app"].ConnectionString;

            xmlDocument.LoadXml(dataRetriveRequestXml);

            sqlConnection.ConnectionString = connectionString;
            sqlCommand.Connection = sqlConnection;
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.Clear();
            sqlCommand.CommandText = dataRetriveServiceName;
            sqlCommand.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid(sessionId);
            sqlCommand.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = userId;
            sqlCommand.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientId;
            sqlCommand.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = localeId;
            sqlCommand.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
            foreach (XmlNode childNode in xmlDocument.SelectSingleNode("signature").ChildNodes)
            {
                if (childNode.Name.IndexOf("o_") == 0)
                {
                    sqlCommand.Parameters.Add("@" + childNode.Name, SqlDbType.NVarChar, 5).Direction = ParameterDirection.Output;
                }
                else
                {
                    sqlCommand.Parameters.Add("@" + childNode.Name, SqlDbType.NVarChar, 2500).Value = childNode.InnerXml.ToString();
                }
            }
            sqlConnection.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            sqlDataAdapter.Fill(dataTable);
            sqlDataAdapter.Dispose();

            /* FORM THE ARRAY OF JSON VALUE FROM DATATABLE*/
            foreach (DataRow row in dataTable.Rows)
            {
                responseValue += "," + row.ItemArray[1].ToString();         
            }
            responseValue = responseValue.Substring(1);
            responseValue = "[" + responseValue  + "]";

            return responseValue;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static String WriteToExcel(String clientId, String countryCode, String fmtObject, String dataBaseResponse)
    {
        ScriptEngine engine;
        ScriptSource source;
        ScriptScope scope;
        String[] libs;
        dynamic GenerateExportMethod, responseValue;
        String appRoot;

        try
        {
            appRoot = HttpContext.Current.Server.MapPath("~\\");

            /* CREATE PYTHON ENGINE */
            engine = Python.CreateEngine();
            source = engine.CreateScriptSourceFromFile(Path.Combine(HttpContext.Current.Server.MapPath("~\\common\\components\\msvExport\\"), "GenerateExportFile.py"));
            scope = engine.CreateScope();
            libs = new[] { appRoot + "python_lib" };
            engine.SetSearchPaths(libs);
            source.Execute(scope);

            /* CALL PYTHON METHOD WITH RESPECTIVE PARAMETERS */
            GenerateExportMethod = scope.GetVariable("GenerateExportFile");
            responseValue = GenerateExportMethod(appRoot, clientId, countryCode, fmtObject, dataBaseResponse);
            return responseValue;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
</script>
