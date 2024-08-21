<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="HtmlAgilityPack" %> 
<%@ Import Namespace="msvInterface"%>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String cliendID, countryCode, localeID, appID, type, subType, cliendGroup, solution, vertical, frameWork, filePath, fileName, fileExtension, fileContent, requestStream, domainName;
        JObject inputObj;
        XmlDocument xmlDocument;
        XmlNodeList hostNodeList;

        inputObj = null;
        cliendID = "";
        countryCode = "";
        fileContent = "";
        fileName = "";
        fileExtension = "";

        try
        {
            requestStream = new StreamReader(Request.InputStream).ReadToEnd();
            inputObj = JsonConvert.DeserializeObject<JObject>(requestStream);

            cliendID = (inputObj["clientID"] == null) ? "" :inputObj["clientID"].ToString();
            countryCode = (inputObj["countryCode"] == null) ? "" :inputObj["countryCode"].ToString();
            localeID = (inputObj["localeID"] == null) ? "" :inputObj["localeID"].ToString();
            appID = (inputObj["appID"] == null) ? "" :inputObj["appID"].ToString();
            type = (inputObj["type"] == null) ? "" :inputObj["type"].ToString();
            subType = (inputObj["subType"] == null) ? "" :inputObj["subType"].ToString();
            cliendGroup = (inputObj["cliendgroup"] == null) ? "" :inputObj["cliendgroup"].ToString();
            vertical = (inputObj["vertical"] == null) ? "" :inputObj["vertical"].ToString();
            solution = (inputObj["solution"] == null) ? "" :inputObj["solution"].ToString();
            frameWork = (inputObj["framework"] == null) ? "" :inputObj["framework"].ToString();

            if (inputObj["fileName"] != null)
            {
                fileName = Path.GetFileNameWithoutExtension(inputObj["fileName"].ToString());
                fileExtension = Path.GetExtension(inputObj["fileName"].ToString());
            }

            domainName = HttpContext.Current.Request.Url.Authority;

            if (type == "app_settings")
            {
                filePath = HttpContext.Current.Server.MapPath("~\\" + "www");
                fileContent = ReadFile(cliendID, countryCode, localeID, subType, cliendGroup, vertical, solution, filePath, fileName, fileExtension);

                if (fileContent != "file_not_found")
                {
                    xmlDocument = new XmlDocument();
                    xmlDocument.LoadXml(fileContent);
                    hostNodeList = xmlDocument.SelectNodes("settings/host");
                    fileContent = "";
                    foreach (XmlNode hostNode in hostNodeList)
                    {
                        if (domainName == hostNode.Attributes["name"].Value.ToString())
                        {
                            fileContent = hostNode.OuterXml;
                            break;
                        }
                    }
                    if (fileContent == "")
                    {
                        fileContent = "host_not_found";
                    }
                }
            }
            else if (type == "ux")
            {
                filePath = HttpContext.Current.Server.MapPath("~\\" + "www" + "\\" + "ux");

                if (subType == "fonts")
                {
                    filePath = HttpContext.Current.Server.MapPath("~\\" + "www" + "\\" + "ux" + "\\" + "fonts" + "\\" + "js");
                }

                fileContent = ReadFile(cliendID, countryCode, localeID, subType, cliendGroup, vertical, solution, filePath, fileName, fileExtension);
            }
            else if (type == "configuration")
            {
                if (frameWork == "1.0")
                {
                    filePath = HttpContext.Current.Server.MapPath("~\\" + "webui" + "\\" + "configuration" + "\\" + subType);
                }
                else
                {
                    filePath = HttpContext.Current.Server.MapPath("~\\" + "www" + "\\" + "configuration" + "\\" + subType);
                }

                fileContent = ReadFile(cliendID, countryCode, localeID, subType, cliendGroup, vertical, solution, filePath, subType + "_" + fileName, fileExtension);
            }
            else
            {
                fileContent = "type_not_found";
            }

            if (fileContent == "type_not_found" || fileContent == "host_not_found" || fileContent == "file_not_found" || fileExtension.ToLower() == ".txt")
            {
                Response.ContentType = "text/plain";
            }
            else
            {
                if (fileExtension.ToLower() == ".json")
                {
                    Response.ContentType = "text/json";
                }
                else if (fileExtension.ToLower() == ".xml")
                {
                    Response.ContentType = "text/xml";
                }
                else if (fileExtension.ToLower() == ".html")
                {
                    Response.ContentType = "text/html";
                }
            }
        }
        catch (Exception ex)
        {
            msvUtil.LogException(cliendID, countryCode, "Keys", ex.Message, ex.StackTrace);
            Response.ContentType = "text/json";
            Response.Write("{\"status\":\"failure\", \"response\":\"" + ex.Message + "\"}");
        }

        Response.Write(fileContent);
    }

    private static String ReadFile(String clientID, String countryCode, String localeID, String subType, String cliendGroup, String vertical, String solution, String filePath, String fileName, String fileExtension)
    {
        String fileContent;

        try
        {
            if (subType == "label")
            {
                if (File.Exists(filePath + "\\" + fileName + "_" + clientID + "_" + countryCode + "_" + localeID + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + clientID + "_" + countryCode + "_" + localeID + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + "_" + clientID + "_" + localeID + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + clientID + "_" + localeID + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + "_" + cliendGroup + "_" + localeID + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + cliendGroup + "_" + localeID + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + "_" + vertical + "_" + localeID + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + vertical + "_" + localeID + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + "_" + solution + "_" + localeID + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + solution + "_" + localeID + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + "_" + localeID + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + localeID + fileExtension);
                }
                else
                {
                    fileContent = "file_not_found";
                }
            }
            else
            {
                if (File.Exists(filePath + "\\" + fileName + "_" + clientID + "_" + countryCode + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + clientID + "_" + countryCode + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + "_" + clientID + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + clientID + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + "_" + cliendGroup + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + cliendGroup + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + "_" + vertical + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + vertical + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + "_" + solution + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + "_" + solution + fileExtension);
                }
                else if (File.Exists(filePath + "\\" + fileName + fileExtension))
                {
                    fileContent = File.ReadAllText(filePath + "\\" + fileName + fileExtension);
                }
                else
                {
                    fileContent = "file_not_found";
                }
            }

            return fileContent;
        }
        catch(Exception ex)
        {
            throw ex;
        }
    }
</script>