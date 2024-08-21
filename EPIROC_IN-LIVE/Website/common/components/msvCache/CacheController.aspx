<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e){
        String clientID, countryCode, clientPropertyName, clientPropertyValue, serverPropertyValue, app_id;

        clientID = Request.QueryString["client_id"];
        countryCode = Request.QueryString["country_code"];
        app_id = Request.QueryString["app_id"];

        List<String> myCollection = new List<String>();

        try
        {
            var clientArray = JsonConvert.DeserializeObject<dynamic>(new StreamReader(Request.InputStream).ReadToEnd());


            if (File.Exists(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvCache" + "\\" + "cache_controller" + "_" + app_id + "_" + clientID + "_" + countryCode + ".json")))
            {
                var serverArray = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvCache" + "\\" + "cache_controller" + "_" + app_id + "_" + clientID + "_" + countryCode + ".json")));
                foreach (JProperty serverProperty in serverArray.Properties())
                {
                    foreach (JProperty clientProperty in clientArray.Properties())
                    {
                        if (clientProperty.Name == serverProperty.Name)
                        {
                            clientPropertyName = clientProperty.Name;
                            clientPropertyValue = (String)clientProperty.Value;
                            serverPropertyValue = serverArray[clientPropertyName].last_change_timestamp;
                            if (clientPropertyValue == serverPropertyValue)
                            {
                                myCollection.Add(clientPropertyName);
                            }
                        }
                    }
                }
                if (myCollection.Count != 0)
                {
                    foreach (string collection in myCollection)
                    {
                        serverArray.Property(collection).Remove();
                    }
                }
                Response.Write(JsonConvert.SerializeObject(serverArray));
            }
        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "msvcache", ex.Message, ex.StackTrace);
        }
    }
</script>