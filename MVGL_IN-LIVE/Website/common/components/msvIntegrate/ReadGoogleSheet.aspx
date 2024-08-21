<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Data.OleDb" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data.SqlTypes" %>
<%@ Import Namespace="Google.Apis.Auth.OAuth2" %>
<%@ Import Namespace="Google.Apis.Drive.v3" %>
<%@ Import Namespace="Google.Apis.Services" %>
<%@ Import Namespace="msvInterface" %>


<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID, countryCode, responseMessage;
		int maximumFields;

        //GET VALUE FROM QUERY STRING
        clientID = Request.QueryString["clientId"];
        countryCode = Request.QueryString["countryCode"];
		maximumFields = Convert.ToInt16(Request.QueryString["maximumFields"]);
        try
        {
            ReadGoogleDrive(clientID, countryCode, maximumFields, "googlesheet", GetConfiguration(clientID, countryCode, "inbound", "googlesheet"));
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

    private static void ReadGoogleDrive(String clientID, String countryCode, int maximumFields, String inboundType, XmlDocument config)
    {
        GoogleCredential credential;
        DriveService service;
        MemoryStream mStream;
        TextWriter textWriter;
        Byte[] bytesInStream;
        String serviceDetails, fileId, mimeType, saveFileExtensionType, currentDate, oledbConnectionString, oledbCommand;
        DataTable sourceDataTable;
        OleDbConnection oleDbConnectionObject;
        OleDbDataAdapter oleDbDataAdapterObject;
        int rowCount, columnCount, nullColumCounter;

        oleDbConnectionObject = null;

        try
        {
            serviceDetails = config.DocumentElement.SelectSingleNode("googleServiceDetails").InnerText.ToString();
            fileId = config.DocumentElement.SelectSingleNode("googlesheetFileId").InnerText.ToString();
            mimeType = config.DocumentElement.SelectSingleNode("mimeType").InnerText.ToString();
            saveFileExtensionType = config.DocumentElement.SelectSingleNode("saveFileExtensionType").InnerText.ToString();


            credential = GoogleCredential.FromJson(serviceDetails).CreateScoped(DriveService.Scope.Drive);
            service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential
            });
            var request = service.Files.Export(fileId, mimeType);
            mStream = new MemoryStream();
            request.Download(mStream);
            textWriter = new StreamWriter(mStream);
            textWriter.Flush();
            bytesInStream = mStream.ToArray();
            mStream.Close();
            currentDate = DateTime.Now.ToString("yyyy_MM_dd_HH_mm_ss_fff");

            if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "inbound" + "\\" + inboundType)))
            {
                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "inbound" + "\\" + inboundType));
            }

            File.WriteAllBytes(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "inbound" + "\\" + inboundType + "\\" + currentDate + "." + saveFileExtensionType), bytesInStream);

            /* CREATING SOURCE DATATABLE FROM XLSX FILE */
            oledbConnectionString = "Provider = Microsoft.ACE.OLEDB.12.0; Data Source = " + HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "inbound" + "\\" + inboundType + "\\" + currentDate + "." + saveFileExtensionType) + ";" + "Extended Properties = 'Excel 12.0';OLE DB Services=-4;";
            oleDbConnectionObject = new OleDbConnection(oledbConnectionString);
            oleDbConnectionObject.Open();
            oledbCommand = "SELECT * FROM [" + oleDbConnectionObject.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null).Rows[4]["TABLE_NAME"].ToString() + "]";
            oleDbDataAdapterObject = new OleDbDataAdapter(oledbCommand, oleDbConnectionObject);
            sourceDataTable = new DataTable();
            oleDbDataAdapterObject.Fill(sourceDataTable);

            while (true)
            {
                if (sourceDataTable.Columns.Count == maximumFields)
                {
                    break;
                }

                sourceDataTable.Columns.Remove(sourceDataTable.Columns[maximumFields]);
            }

            for (rowCount = sourceDataTable.Rows.Count - 1; rowCount >= 0; rowCount--)
            {
                nullColumCounter = 0;

                for (columnCount = 0; columnCount < sourceDataTable.Columns.Count; columnCount++)
                {
                    if (sourceDataTable.Rows[rowCount][columnCount] == DBNull.Value)
                    {
                        break;
                    }
                    nullColumCounter++;
                }

                if (nullColumCounter == maximumFields)
                {
                    sourceDataTable.Rows[rowCount].Delete();
                }
            }

            UploadDataTable(clientID, countryCode, inboundType, "indiamart", sourceDataTable);
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (oleDbConnectionObject != null)
            {
                oleDbConnectionObject.Close();
            }
        }
    }

    private static XmlDocument GetConfiguration(String clientID, String countryCode, String infoXType, String infoXSubType)
    {
        XmlDocument config;

        try
        {
            config = new XmlDocument();
            config.Load(HttpContext.Current.Server.MapPath("~\\fmt" + "\\" + "msvInfoX" + "\\" + infoXType + "\\" + infoXSubType + "_" + clientID + "_" + countryCode + ".xml"));

            return config;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static void UploadDataTable(String clientID, String countryCode, String infoXType, String informationType, DataTable sourceDataTable)
    {
        SqlConnection conn;
        SqlCommand command, createTableCommand;
        String createTableQuery, insertTableQuery, insertValues;

        conn = null;
        try
        {
            conn = new SqlConnection();
			conn.ConnectionString = ConfigurationManager.ConnectionStrings["conn_" + clientID + "_" + countryCode + "_app"].ConnectionString;
			
            command = new SqlCommand();
			createTableCommand = new SqlCommand();			
			
			command.Connection = conn;
			createTableCommand.Connection = conn;
			
            conn.Open();  

			createTableQuery = "create table ##load_" + informationType + "_" + clientID + " (";
            insertTableQuery = "insert ##load_" + informationType + "_" + clientID + " (";

            for (int sourceTableColumns = 0; sourceTableColumns < sourceDataTable.Columns.Count; sourceTableColumns++)
            {
                if (sourceTableColumns < sourceDataTable.Columns.Count - 1)
                {
                    createTableQuery += "field_" + (sourceTableColumns + 1).ToString() + " nvarchar(500), ";
                    insertTableQuery += "field_" + (sourceTableColumns + 1).ToString() + ", ";
                }
                else
                {
                    createTableQuery += "field_" + (sourceTableColumns + 1).ToString() + " nvarchar(500))\n";
                    insertTableQuery += "field_" + (sourceTableColumns + 1).ToString() + ") ";
                }
            }

            for (int sourceTableRows = 0; sourceTableRows < sourceDataTable.Rows.Count; sourceTableRows++)
            {
                createTableQuery += insertTableQuery + "values (";
                insertValues = "";
                for (int sourceTableColumns = 0; sourceTableColumns < sourceDataTable.Columns.Count; sourceTableColumns++)
                {
                    if (sourceTableColumns < sourceDataTable.Columns.Count - 1)
                    {
                        insertValues += "'" + sourceDataTable.Rows[sourceTableRows][sourceTableColumns].ToString().Replace("'", "''") + "', ";
                    }
                    else
                    {
                        insertValues += "'" + sourceDataTable.Rows[sourceTableRows][sourceTableColumns].ToString().Replace("'", "''") + "')\n";
                    }
                }
                createTableQuery += insertValues;
            }

            createTableCommand.CommandText = createTableQuery;
            createTableCommand.Connection = conn;
            createTableCommand.ExecuteNonQuery();

			
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Clear();
            command.CommandText = "sp_load_" + informationType + "_" + clientID + "_" + countryCode;
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
            throw ex;
        }
        finally
        {
            conn.Close();
        }

    }
</script>
