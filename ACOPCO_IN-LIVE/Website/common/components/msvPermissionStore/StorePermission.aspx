<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="msvInterface" %>


<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String requestStream, appPermissionPath, fileName, responseMessage;
        JObject inputObj, permissionDataObj;
        inputObj = null;
		
        try
        {
			requestStream = new StreamReader(Request.InputStream).ReadToEnd();    
            inputObj = JsonConvert.DeserializeObject<JObject>(requestStream);
            appPermissionPath = HttpContext.Current.Server.MapPath("~/content_store" + "\\" + inputObj["clientID"].ToString() + "\\" + inputObj["countryCode"].ToString() + "\\" + "app_permission_settings" + "\\" + inputObj["appID"].ToString() + "\\" + inputObj["channelID"].ToString() + "\\" + inputObj["userID"]);

            if (!Directory.Exists(appPermissionPath))
            {
                Directory.CreateDirectory(appPermissionPath);
            }

            fileName = (DateTime.Now.ToString("yyyy-MM-dd")) + ".json";

            if (!File.Exists(appPermissionPath + "\\" + fileName))
            {
                permissionDataObj = JsonConvert.DeserializeObject<JObject>("{}");
                permissionDataObj[DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss")] = JObject.Parse(inputObj["permissiondata"].ToString());              
            }
            else
            {
                permissionDataObj = JObject.Parse(File.ReadAllText(appPermissionPath + "\\" + fileName));
                permissionDataObj[DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss")] = JObject.Parse(inputObj["permissiondata"].ToString());               
            }

            File.WriteAllText(appPermissionPath + "\\" + fileName, JsonConvert.SerializeObject(permissionDataObj, Formatting.None));
			responseMessage = "{\"status\":\"success\", \"response\":\"" + "SP001" + "\"}";	
        }
        catch(Exception ex)
        {
		   msvUtil.LogException(inputObj["clientID"].ToString(), inputObj["countryCode"].ToString(), "msvPermissionStore", ex.Message, ex.StackTrace);
           responseMessage = "{\"status\":\"failure\", \"response\":\"" + ex.Message + "\"}";
        }
		
		Response.ContentType = "text/json";
		Response.Write(responseMessage);
    }
</script>