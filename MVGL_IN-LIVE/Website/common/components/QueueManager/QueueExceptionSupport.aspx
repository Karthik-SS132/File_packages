<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="HtmlAgilityPack" %> 
<%@ Import Namespace="msvInterface"%>

<script runat="server">

    protected void Page_Load(object sender, EventArgs e)
    {
        String appRoot, clientID, countryCode, folderPath, filePath, readFilePath, domainName, responseContent;

        clientID = Request.QueryString["client_id"];
        countryCode = Request.QueryString["country_code"];

        try
        {
            folderPath = (Request.QueryString["folderPath"] == null) ? "" :Request.QueryString["folderPath"];
            filePath = (Request.QueryString["filePath"] == null) ? "" : Request.QueryString["filePath"];
            readFilePath = (Request.QueryString["readFilePath"] == null) ? "" : Request.QueryString["readFilePath"];
            responseContent = "";

            domainName = HttpContext.Current.Request.Url.Authority;

            if (domainName.Contains("-dev.") || domainName.Contains("-integ.") || domainName.Contains("-uat."))
            {
                appRoot = HttpContext.Current.Server.MapPath("~\\");

                if ((folderPath == "" && filePath == "") || (readFilePath != ""))
                {
                    if (readFilePath != "")
                    {
                        responseContent = ReadQueueManagerFiles(appRoot, clientID, countryCode, readFilePath);
                    }
                    else
                    {
                        responseContent = GetQueueManagerDirectoryAndFileNames(appRoot, clientID, countryCode);
                    }
                }
                else
                {
                    if (folderPath != "")
                    {
                        if (DeleteDirectory(appRoot, clientID, countryCode, folderPath) == true)
                        {
                            responseContent = GetQueueManagerDirectoryAndFileNames(appRoot, clientID, countryCode);
                        }
                    }
                    else
                    {
                        if (DeleteFile(appRoot, clientID, countryCode, filePath) == true)
                        {
                            responseContent = GetQueueManagerDirectoryAndFileNames(appRoot, clientID, countryCode);
                        }
                    }
                }
            }
            else
            {
                responseContent = "This domain is invalid.";
            }

            Response.Clear();
            Response.ContentType = "text/html";
            Response.Write(responseContent);


        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "QueueManager", ex.Message, ex.StackTrace);
        }
    }

    private static String GetQueueManagerDirectoryAndFileNames(String appRoot, String clientID, String countryCode)
    {
        String queueManagerPath, responseValue;
        bool queueFolderExistIndicator;
        String[] fileList;
        HtmlDocument document;
        HtmlNode bodyNode, spanNode, parentrootDivNode, childroot1DivNode, childroot2DivNode, h4Node, filePNode, parentDivNode, userDivNode, userSubDivNode, execeptionDivNode, queueDivNode, execeptionFileNode, queueFileNode;
        DirectoryInfo queueManagerDirectory;
        DirectoryInfo[] queueManagerDirectoryList;

        try
        {
            queueFolderExistIndicator = false;
            responseValue = "";
            queueManagerPath = appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager";

            if (Directory.Exists(queueManagerPath))
            {
                queueManagerDirectory = new DirectoryInfo(queueManagerPath);
                queueManagerDirectoryList = queueManagerDirectory.GetDirectories();

                document = new HtmlDocument();

                bodyNode = document.CreateElement("body");
                bodyNode.Attributes.Add(document.CreateAttribute("style", "background-color: #e2e2e2; background-image: linear-gradient(124deg, #edfdff 0%, #00dcc56e 50%, #ffffff4d 100%);"));

                parentrootDivNode = document.CreateElement("div");
                parentrootDivNode.Attributes.Add(document.CreateAttribute("style", "display:flex; border: solid 1px;"));

                childroot1DivNode = document.CreateElement("div");
                childroot1DivNode.Attributes.Add(document.CreateAttribute("style", "width:50%;"));

                childroot2DivNode = document.CreateElement("div");
                childroot2DivNode.Attributes.Add(document.CreateAttribute("style", "width:50%;word-break: break-all;padding: 1em;border-left: dashed 1px;"));
                childroot2DivNode.Attributes.Add(document.CreateAttribute("id", "response-content"));

                foreach (DirectoryInfo directoryName in queueManagerDirectoryList)
                {
                    queueFolderExistIndicator = true;

                    parentDivNode = document.CreateElement("div");

                    userDivNode = document.CreateElement("div");
                    userDivNode.Attributes.Add(document.CreateAttribute("style", "display: flex; align-items: center;  padding: 1em 3em 1em 1em;"));

                    h4Node = Createh4NodeAndProperty(directoryName.Name);

                    spanNode = CreatespanNodeAndProperty("QueueManager" + "\\" + directoryName.Name);

                    userDivNode.AppendChild(spanNode);
                    userDivNode.AppendChild(h4Node);

                    if (directoryName.Name != "StopQueueProcess")
                    {
                        spanNode = null;
                        h4Node = null;

                        userSubDivNode = document.CreateElement("div");
                        userSubDivNode.Attributes.Add(document.CreateAttribute("style", "padding: .5em 1em 1em 2em;"));

                        if (Directory.Exists(queueManagerPath + "\\" + directoryName.Name + "\\" + "exception"))
                        {
                            execeptionDivNode = document.CreateElement("div");
                            execeptionDivNode.Attributes.Add(document.CreateAttribute("style", "display: flex; align-items: center; padding: 0em 2em 0;"));

                            h4Node = Createh4NodeAndProperty("exception");
                            spanNode = CreatespanNodeAndProperty("QueueManager" + "\\" + directoryName.Name + "\\" + "exception");

                            execeptionDivNode.AppendChild(spanNode);
                            execeptionDivNode.AppendChild(h4Node);
                            userSubDivNode.AppendChild(execeptionDivNode);

                            fileList = Directory.GetFiles(queueManagerPath + "\\" + directoryName.Name + "\\" + "exception");

                            foreach (String file in fileList)
                            {
                                execeptionFileNode = document.CreateElement("div");
                                execeptionFileNode.Attributes.Add(document.CreateAttribute("style", "display: flex; align-items: center; padding: 1em 2em 0.4em 5em;"));

                                filePNode = CreatefileNodeAndProperty(file, "QueueManager" + "\\" + directoryName.Name + "\\" + "exception" + "\\" + Path.GetFileName(file));
                                spanNode = CreatespanNodeAndProperty("QueueManager" + "\\" + directoryName.Name + "\\" + "exception" + "\\" + Path.GetFileName(file));

                                execeptionFileNode.AppendChild(spanNode);
                                execeptionFileNode.AppendChild(filePNode);
                                userSubDivNode.AppendChild(execeptionFileNode);

                            }
                        }

                        if (Directory.Exists(queueManagerPath + "\\" + directoryName.Name + "\\" + "queue"))
                        {
                            queueDivNode = document.CreateElement("div");
                            queueDivNode.Attributes.Add(document.CreateAttribute("style", "display: flex; align-items: center; padding: 0em 2em 0;"));

                            h4Node = Createh4NodeAndProperty("queue");
                            spanNode = CreatespanNodeAndProperty("QueueManager" + "\\" + directoryName.Name + "\\" + "queue");

                            queueDivNode.AppendChild(spanNode);
                            queueDivNode.AppendChild(h4Node);
                            userSubDivNode.AppendChild(queueDivNode);

                            fileList = Directory.GetFiles(queueManagerPath + "\\" + directoryName.Name + "\\" + "queue");

                            foreach (String file in fileList)
                            {
                                queueFileNode = document.CreateElement("div");
                                queueFileNode.Attributes.Add(document.CreateAttribute("style", "display: flex; align-items: center; padding: 1em 2em 0.4em 5em;"));
                                filePNode = CreatefileNodeAndProperty(file, "QueueManager" + "\\" + directoryName.Name + "\\" + "queue" + "\\" + Path.GetFileName(file));
                                spanNode = CreatespanNodeAndProperty("QueueManager" + "\\" + directoryName.Name + "\\" + "queue" + "\\" + Path.GetFileName(file));

                                queueFileNode.AppendChild(spanNode);
                                queueFileNode.AppendChild(filePNode);
                                userSubDivNode.AppendChild(queueFileNode);
                            }
                        }

                        parentDivNode.AppendChild(userDivNode);
                        parentDivNode.AppendChild(userSubDivNode);
                    }
                    else
                    {
                        parentDivNode.AppendChild(userDivNode);
                        fileList = Directory.GetFiles(queueManagerPath + "\\" + directoryName.Name);
                        foreach (String file in fileList)
                        {
                            userSubDivNode = document.CreateElement("div");
                            userSubDivNode.Attributes.Add(document.CreateAttribute("style", "display: flex; align-items: center; padding: 1em 3em 0.4em 5em;"));

                            filePNode = CreatefileNodeAndProperty(file, "QueueManager" + "\\" + directoryName.Name + "\\" + Path.GetFileName(file));
                            spanNode = CreatespanNodeAndProperty("QueueManager" + "\\" + directoryName.Name + "\\" + Path.GetFileName(file));

                            userSubDivNode.AppendChild(spanNode);
                            userSubDivNode.AppendChild(filePNode);
                            parentDivNode.AppendChild(userSubDivNode);
                        }
                    }
                    childroot1DivNode.AppendChild(parentDivNode);
                }

                if (queueFolderExistIndicator)
                {
                    parentrootDivNode.AppendChild(childroot1DivNode);
                    parentrootDivNode.AppendChild(childroot2DivNode);
                    bodyNode.AppendChild(parentrootDivNode);
                    document.DocumentNode.AppendChild(bodyNode);
                    responseValue = document.DocumentNode.InnerHtml.ToString();
                }
            }

            if(responseValue == "")
            {
                responseValue = "No queue manager folders are present.";
            }

            return responseValue;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static String ReadQueueManagerFiles(String appRoot, String clientID, String countryCode, String filePath)
    {
        String response;
        try
        {
            response = "";
            if (File.Exists(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + filePath))
            {
                response =  "<div>" + File.ReadAllText(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + filePath) + "</div>";
            }
           
            return response;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    private static HtmlNode Createh4NodeAndProperty(String innerText)
    {
        HtmlDocument document;
        HtmlNode h4Node;


        try
        {
            document = new HtmlDocument();
            h4Node =  document.CreateElement("h4");
            h4Node.Attributes.Add(document.CreateAttribute("style", "margin:0;"));
            h4Node.InnerHtml = innerText;

            return h4Node;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static HtmlNode CreatespanNodeAndProperty(String dataSourceValue)
    {
        HtmlDocument document;
        HtmlNode spanNode;

        try
        {
            document = new HtmlDocument();
            spanNode = document.CreateElement("span");
            spanNode.Attributes.Add(document.CreateAttribute("class", "delete_hover"));
            spanNode.Attributes.Add(document.CreateAttribute("style", "font-size: 10px; padding: 1em; border-radius: 100%; width: 1em; height: 1em; display: flex; justify-content: center; align-items: center; transition: .700ms; margin-right: 1em; cursor: pointer; color: red;"));
            spanNode.Attributes.Add(document.CreateAttribute("onclick", "QueueManagerFn(this)"));
            spanNode.Attributes.Add(document.CreateAttribute("data-source", dataSourceValue));
            spanNode.InnerHtml = "&#x2716;";

            return spanNode;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static HtmlNode CreatefileNodeAndProperty(String innerText, String dataSourceValue)
    {
        HtmlDocument document;
        HtmlNode filePNode;

        try
        {
            document = new HtmlDocument();

            filePNode = document.CreateElement("p");
            filePNode.Attributes.Add(document.CreateAttribute("style", "margin: 0;font-size: 12px;word-break: break-all;cursor: pointer;text-decoration: underline;"));
            filePNode.Attributes.Add(document.CreateAttribute("onclick", "QueueManagerFn(this)"));
            filePNode.Attributes.Add(document.CreateAttribute("read-data-source", dataSourceValue));
            filePNode.InnerHtml = Path.GetFileName(innerText);

            return filePNode;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static bool DeleteDirectory(String appRoot, String clientID, String countryCode, String folderPath)
    {
        try
        {
            if (Directory.Exists(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + folderPath))
            {
                Directory.Delete(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + folderPath, true);
            }
            return true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static bool DeleteFile(String appRoot, String clientID, String countryCode, String filePath)
    {
        try
        {
            if (File.Exists(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + filePath))
            {
                File.Delete(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + filePath);
            }
            return true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

</script>
<style>
   .delete_hover:hover{
       background-color:#c50f0f;
       padding:1em;
       border-radius:100%;
       width:1em;
       height:1em;
       display:flex;
       justify-content:center;
       align-items:center;
   }
</style>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script>
   
    function ReadFile(clientId, countryCode, readFilePath) {
        var responseHtmlContent, parser;
        try {
            $.post("QueueExceptionSupport.aspx?&client_id=" + clientId + "&country_code=" + countryCode + "&readFilePath=" + readFilePath, {}).done(function (response) {
                try {
                    parser = new DOMParser();
                    responseHtmlContent = parser.parseFromString(response, 'text/html');             
                    document.getElementById("response-content").innerText = responseHtmlContent.body.getElementsByTagName("div")[0].innerText;
                } catch (error) {
                    console.log(error);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    function QueueManagerFn(nodeValue) {

        var clientId, countryCode, folderPath, filePath, readFileAttributeValue, readFilePath, pathAttributeValue, queryStringValue, value, index;

        try {

            folderPath = "";
            filePath = "";
            readFilePath = "";

            queryStringValue = location.search.replace("?", "").split("&");
           
            for (index = 0; index < queryStringValue.length; index++) {
                value = queryStringValue[index].split("=");
                if (value[0] == "client_id") {
                    clientId = value[1];
                }
                if (value[0] = "country_code") {
                    countryCode = value[1];
                }
            }

            pathAttributeValue = nodeValue.getAttribute("data-source");
            readFileAttributeValue = nodeValue.getAttribute("read-data-source");

            if (pathAttributeValue != null) {

                if (pathAttributeValue.indexOf(".txt") != -1) {
                    if (confirm("Do you want to delete the file " + "\"" + pathAttributeValue.replace(/^.*[\\/]/, '') + "\"" + " ?")) {
                        filePath = pathAttributeValue;
                        CallAjaxMethod(clientId, countryCode, folderPath, filePath, readFilePath)
                    }
                } else {
                    if (confirm("Do you want to delete the folder " + "\"" + pathAttributeValue.replace(/^.*[\\/]/, '') + "\"" + " ?")) {
                        folderPath = pathAttributeValue;
                        CallAjaxMethod(clientId, countryCode, folderPath, filePath, readFilePath);
                    }
                }
            } else if (readFileAttributeValue != null) {

                readFilePath = readFileAttributeValue;
                ReadFile(clientId, countryCode, readFilePath);

            }

        } catch (error) {
            console.log(error);
        }
    }
    function CallAjaxMethod(clientId, countryCode, folderPath, filePath, readFilePath) {

        try {

            $.post("QueueExceptionSupport.aspx?&client_id=" + clientId + "&country_code=" + countryCode + "&folderPath=" + folderPath + "&filePath=" + filePath + "&readFilePath=" + readFilePath, {}).done(function (response) {
                try {
                    document.body.innerHTML = response;
                } catch (e) {
                    console.log(e);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }
</script>