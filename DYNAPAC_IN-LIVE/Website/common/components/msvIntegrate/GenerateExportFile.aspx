<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="msvInterface" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<script runat="server">
	protected void Page_Load(object sender, EventArgs e)
    {
        String sessionID, userID, clientID, localeID, countryCode, documentType, documentTemplate, documentName, serviceName, serviceRequest, connectionStr;
        
        var fmtObject = JsonConvert.DeserializeObject<dynamic>(new StreamReader(Request.InputStream).ReadToEnd());

        sessionID = fmtObject.context.sessionId;
        userID = fmtObject.context.userId;
        clientID = fmtObject.context.client_id;
        localeID = fmtObject.context.locale_id;
        countryCode = fmtObject.context.country_code;
        documentType = fmtObject.context.inputparam.p_document_type;
        documentTemplate = fmtObject.context.inputparam.p_document_template;
        documentName = fmtObject.context.inputparam.p_document_name;
        serviceName = fmtObject.context.inputparam.p_data_retrieve_service_name;
        serviceRequest = fmtObject.context.inputparam.p_data_retrieve_request_xml;

        connectionStr = ConfigurationManager.ConnectionStrings["conn_" + clientID + "_" + countryCode+ "_"+ "app"].ConnectionString;
                
        Response.Write(msvIntegrate.InitiateExport(AppDomain.CurrentDomain.BaseDirectory, clientID, countryCode, localeID, userID, sessionID, documentType, documentTemplate, documentName, serviceName, serviceRequest, connectionStr));
    }
</script>