<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="msvInterface"%>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID = "", countryCode = "", purposeCode = "", currentKey = "", version = "", responseValue = "";
        XmlDocument keysDoc;
        JObject keysJson;
        dynamic inputObj;

        try
        {
            inputObj = JsonConvert.DeserializeObject<dynamic>(new StreamReader(Request.InputStream).ReadToEnd());

            clientID = (String)inputObj.client_id;
            countryCode = (String)inputObj.country_code;
            purposeCode = (String)inputObj.purposeCode;
            version = (String)inputObj.version;

            keysDoc = new XmlDocument();
            keysDoc.Load(HttpContext.Current.Server.MapPath("~\\key" + "\\" + "google_api_key_configuration" + "_" + clientID + "_" + countryCode + ".xml"));

            if (version != null && version == "doubleo")
            {
                keysJson = JObject.Parse(JsonConvert.SerializeXmlNode(keysDoc).ToString());
                responseValue = keysJson["configuration"].ToString().Replace("\r\n", "").Replace(" ", "");
            }
            else
            {
                currentKey = keysDoc.DocumentElement.SelectSingleNode(purposeCode).InnerText;
                responseValue = "{\"purposeCode\":\"" + currentKey + "\"}";
            }

        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "Keys", ex.Message, ex.StackTrace);
            Response.ContentType = "text/json";
            Response.Write("{\"status\":\"failure\", \"response\":\"" + ex.Message + "\"}");     
        }
        finally
        {
            Response.ContentType = "text/json";
            Response.Write(responseValue);
        }
    }
</script>