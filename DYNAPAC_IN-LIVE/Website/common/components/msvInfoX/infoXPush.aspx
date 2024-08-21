<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        HttpWebRequest request;
        HttpWebResponse response;
        Byte[] encodedInputData;
        String operatorCode, agentID, incomingNumber, requestMessage, responseMessage;

        try
        {
            operatorCode = Request.QueryString["op"];
            incomingNumber = Request.QueryString["src_phone"];

            agentID = ((operatorCode == "op10457") ? ("mts1") : ("mts2"));

            request = (HttpWebRequest)WebRequest.Create("https://ru.myliugong.com//api/common_modules/infoXPush");

            requestMessage = "{";
            requestMessage += "\"context\": {";
            requestMessage += "\"sessionId\": \"1E459E6F-599A-4580-9B26-645A7E0D4FB3\",";
            requestMessage += "\"userId\": \"mts\",";
            requestMessage += "\"client_id\": \"liugong\",";
            requestMessage += "\"locale_id\": \"en-us\",";
            requestMessage += "\"country_code\": \"ru\",";
            requestMessage += "\"inputparam_header\": {";
            requestMessage += "\"p_infox_code\": \"callAgentPushCall\",";
            requestMessage += "\"p_infox_ref_no1\": \"" + agentID + "\",";
            requestMessage += "\"p_infox_ref_no2\": \"" + incomingNumber + "\",";
            requestMessage += "\"p_infox_inputparam_header\": \"\"";
            requestMessage += "},";
            requestMessage += "\"inputparam_detail\": [{";
            requestMessage += "\"p_infox_inputparam_detail\": \"\"";
            requestMessage += "}";
            requestMessage += "]";
            requestMessage += "}";
            requestMessage += "}";

            encodedInputData = Encoding.UTF8.GetBytes(requestMessage);

            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            request.ContentLength = encodedInputData.Length;

            using (var stream = request.GetRequestStream())
            {
                stream.Write(encodedInputData, 0, encodedInputData.Length);
            }

            response = (HttpWebResponse)request.GetResponse();

            responseMessage = (new StreamReader(response.GetResponseStream()).ReadToEnd());
        }
        catch (Exception ex)
        {
            msvUtil.LogException("liugong", "ru", "infoXPush", ex.Message, ex.StackTrace);
        }
    }   
</script>