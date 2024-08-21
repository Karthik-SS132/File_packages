<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Text.RegularExpressions" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Net.Mail" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">
	protected void Page_Load(object sender, EventArgs e)
    {
		String clientID, countryCode, userID, filePath, fileName, data;
		
		clientID = Request.QueryString["client_id"];	
		countryCode = Request.QueryString["country_code"];	
		userID = Request.QueryString["user_id"];	
		filePath = Request.QueryString["file_path"];	
		fileName = Request.QueryString["file_name"];
		data = new StreamReader(Request.InputStream).ReadToEnd();
		
		try 
		{
            if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + filePath)))
            {
                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + filePath));
            }

            if (filePath == "queue")
            {
				File.WriteAllText(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + filePath + "\\" + fileName), data);
            }
			
			if (ProcessQueueFile(clientID, countryCode, userID, filePath, fileName))
			{				
				Response.Write("true");
			}
			else
			{
				Response.Write("false");
			}			
		}
		catch(Exception ex) 
		{		
			msvUtil.LogException(clientID, countryCode, "QueueManagerWeb", ex.Message, ex.StackTrace);
			Response.Write("false");
		}
    }
	
	private static Boolean ProcessQueueFile(String clientID, String countryCode, String userID, String filePath, String fileName)
    {
        String queueString, requestUrl, requestData, requestType, attachmentPath, attachmentName, responseString;
        MemoryStream postDataStream;
        StreamWriter postDataWriter;
        FileStream fileStream;
        Byte[] buffer, encodedRequestData;
        Int32 bytesRead;
        HttpWebRequest request;
        HttpWebResponse response;
        Boolean processIndicator, exceptionIgnoreIndicator;
        XmlDocument exceptionList, exceptionIgnoreList;

        try
        {
            attachmentPath = null;
            attachmentName = null;
            processIndicator = true;
            exceptionIgnoreIndicator = false;

            queueString = File.ReadAllText(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + filePath + "\\" + fileName));
            
            var queueObject = JsonConvert.DeserializeObject<dynamic>(queueString);
            requestUrl = (String)queueObject.url;
            requestData = (String)queueObject.input;
            requestType = (String)queueObject.type;


            if (requestType == null)
            {
                request = (HttpWebRequest)WebRequest.Create(requestUrl);
                encodedRequestData = Encoding.UTF8.GetBytes(requestData);
                request.Method = WebRequestMethods.Http.Post;
                request.ContentType = "application/json";
                request.ContentLength = encodedRequestData.Length;


                using (var stream = request.GetRequestStream())
                {
                    stream.Write(encodedRequestData, 0, encodedRequestData.Length);
                }
            }
            else
            {
                attachmentName = (String)queueObject.filename;
                attachmentPath = HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + "attachments");

                request = (HttpWebRequest)WebRequest.Create(requestUrl + "&filename=" + attachmentName);
                request.Method = WebRequestMethods.Http.Post;
                request.ContentType = "multipart/form-data; boundary=----****";
                request.KeepAlive = true;


                postDataStream = new MemoryStream();
                postDataWriter = new StreamWriter(postDataStream);
                postDataWriter.Write("\r\n------****\r\n");
                postDataWriter.Write("Content-Disposition: form-data;" + "name=\"{0}\";" + "filename=\"{1}\"" + "\r\nContent-Type: {2}\r\n\r\n", "myFile", Path.GetFileName(attachmentPath + "\\" + attachmentName), Path.GetExtension(attachmentPath + "\\" + attachmentName));
                postDataWriter.Flush();


                fileStream = new FileStream(attachmentPath + "\\" + attachmentName, FileMode.Open, FileAccess.Read);
                buffer = new byte[1024];
                bytesRead = 0;
                while ((bytesRead = fileStream.Read(buffer, 0, buffer.Length)) != 0)
                {
                    postDataStream.Write(buffer, 0, bytesRead);
                }
                fileStream.Close();


                postDataWriter.Write("\r\n------****--\r\n");
                postDataWriter.Flush();


                request.ContentLength = postDataStream.Length;


                using (var stream = request.GetRequestStream())
                {
                    postDataStream.WriteTo(stream);
                }
                postDataStream.Close();
            }

            response = (HttpWebResponse)request.GetResponse();
            responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();


            if (ProcessResponse(clientID, countryCode, userID, filePath, fileName, requestUrl, responseString))
            {
                /* MOVE THE PROCESSED FILE TO LOG FOLDER */
                if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + "log")))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + "log"));
                }
                File.Move(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + filePath + "\\" + fileName), HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + "log" + "\\" + fileName));
                File.AppendAllText(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + "log" + "\\" + fileName), Environment.NewLine + Environment.NewLine + responseString);

                if (attachmentPath != null && attachmentName != null)
                {
                    File.Move(attachmentPath + "\\" + attachmentName, HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "WEB" + "\\" + userID + "\\" + "log" + "\\" + attachmentName));
                }
            }
            else
            {
			    msvUtil.LogException(clientID, countryCode, "QueueManagerWeb", responseString, "Not Available");
                processIndicator = false;
            }

            return processIndicator;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
	
	private static Boolean ProcessResponse(String clientID, String countryCode, String userID, String filePath, String fileName, String requestUrl, String responseString)
    {
        Boolean processIndicator;

        try
        {
            processIndicator = true;

            if (requestUrl.Contains("save_mark_attendance") || requestUrl.Contains("save_file_to_attachment_master") || requestUrl.Contains("delete_data") || requestUrl.Contains("save_trip_sheet") || requestUrl.Contains("update_call_wfeventverb_status_change"))
            {
                var responseObject = JsonConvert.DeserializeObject<dynamic>(responseString);

                try
                {
                    if (responseObject.document != null && responseObject.document.ApplicationException != null)
                    {
                        processIndicator = false;
                    }
                }
                catch (Exception ex)
                {
                    processIndicator = true;
                }                
            }
            else if (requestUrl.Contains("convertHtml2PDFOffline") || requestUrl.Contains("file_upload_offline") || requestUrl.Contains("file_delete"))
            {
                var responseObject = JsonConvert.DeserializeObject<dynamic>(responseString);

                if (responseObject.status != "success")
                {
                    processIndicator = false;
                }

            }

            return processIndicator;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }	
</script>