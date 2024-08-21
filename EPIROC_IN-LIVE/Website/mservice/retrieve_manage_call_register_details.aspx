<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Xml.Schema" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="Microsoft.Practices.EnterpriseLibrary.Logging" %>
<%@ Import Namespace="Microsoft.Practices.EnterpriseLibrary.ExceptionHandling" %>
<%@ Import Namespace="UmoldITLibraries" %>
<%@ Import Namespace="CustomLibraries" %>

<script runat="server">
protected void Page_Load(object sender, EventArgs e)
{
    string serviceStartTime, serviceEndTime;
    serviceStartTime = DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss.fff");
    
    XmlDocument xmlIn = new XmlDocument();
    XmlDocument xmlOut = null;
    Dictionary<object, object> contextDataItems = null;
    CustomLogger customLogger = new CustomLogger();
    if (Request.HttpMethod.ToString().ToLower() != "post")
    {
        Response.StatusCode = 405;
        Response.StatusDescription = "Method Not Allowed";
        return;
    }
    
    try
    {
        try
        {
            xmlIn.Load(Request.InputStream);
        }
        catch
        {
            Response.StatusCode = 400;
            Response.StatusDescription = "Bad Request";
            Utilities.throwApplicationException("The request data is invalid.");
        }
        
        if (customLogger.serviceLogging){
            customLogger.buildLogmessage("Inside retrieve_manage_call_register_details endpoint (.aspx)", new Dictionary<object, object> { { "xmlIn", xmlIn.OuterXml } });
        }
        String sessionId = "";
        String userId = "";
        String client_id = "";
        String locale_id = "";
        String country_code = "";
        try {
            sessionId = xmlIn.FirstChild.SelectSingleNode("./context/sessionId").InnerText;
            userId = xmlIn.FirstChild.SelectSingleNode("./context/userId").InnerText;
            client_id = xmlIn.FirstChild.SelectSingleNode("./context/client_id").InnerText;
            locale_id = xmlIn.FirstChild.SelectSingleNode("./context/locale_id").InnerText;
            country_code = xmlIn.FirstChild.SelectSingleNode("./context/country_code").InnerText;
        }
        catch {
            Utilities.throwApplicationException("Invalid input to service (incomplete or missing context segment)");
        }
        
        contextDataItems = new Dictionary<object, object> { { "sessionId", sessionId }, { "userId", userId }, { "client_id", client_id }, { "locale_id", locale_id }, { "country_code", country_code } };
        if (CustomUtil.isSessionValid(contextDataItems, "mservice", "retrieve_manage_call_register_details"))
        {
            Utilities.validateXmlSchema(xmlIn, "mservice", "retrieve_manage_call_register_details.InputMessage.xsd");
            
            //service invocation
            mservice.retrieve_manage_call_register_details retrieve_manage_call_register_details = new mservice.retrieve_manage_call_register_details();
            retrieve_manage_call_register_details.invokeBusinessLogic(xmlIn, out xmlOut, customLogger);
            
            if (customLogger.serviceLogging){
                customLogger.buildLogmessage("Exiting retrieve_manage_call_register_details response in endpoint (.aspx)", new Dictionary<object, object> { { "xmlOut", xmlOut.OuterXml } });
            }
            //service response processing
            if(xmlOut.FirstChild.SelectSingleNode("./ApplicationException") == null)
            {
                Utilities.validateXmlSchema(xmlOut, "mservice", "retrieve_manage_call_register_details.OutputMessage.xsd");
            }
            else
            {
                appendUADSApplicationNode(xmlOut.FirstChild.SelectSingleNode("./ApplicationException"));
            }
        }
        else
        {
            Utilities.throwApplicationException("Invalid session");
        }
    }
    catch (UmoldITLibraries.ApplicationException excep)
    {
        xmlOut = null;
        /* 
         * This 'IF' condition has been introduced to take care of a case, where the exception raised within service class has already been 
         * processed and rethrown by the Enterprise Library (EL) exception handling block. In such a case it need not be redirected to EL 
         * exception handling block once again.
         */
        if (excep.Source != "Microsoft.Practices.EnterpriseLibrary.ExceptionHandling")
        {
            handleException(excep, "mservice", contextDataItems, ref xmlOut);
        }
        if (xmlOut == null)
        {
            xmlOut = excep.getExceptionAsXML;
        }
        appendUADSApplicationNode(xmlOut.FirstChild.SelectSingleNode("./ApplicationException"));
    }
    catch (System.Data.SqlClient.SqlException excep)
    {
        xmlOut = null;
        /* 
         * This 'IF' condition has been introduced to take care of a case, where the exception raised within service class has already been 
         * processed and rethrown by the Enterprise Library (EL) exception handling block. In such a case it need not be redirected to EL 
         * exception handling block once again.
         */
        if (excep.Source != "Microsoft.Practices.EnterpriseLibrary.ExceptionHandling")
        {
            handleException(excep, "mservice", contextDataItems, ref xmlOut);
        }
        if (xmlOut == null)
        {
            string expPrefix = "";
            if(excep.Number < 50000) //For database engine raised errors 
            {
                expPrefix = "Database error - ";
            }
            xmlOut = Utilities.generateXML(expPrefix + excep.Message);
        }
        appendUADSApplicationNode(xmlOut.FirstChild.SelectSingleNode("./ApplicationException"));
    }
    catch (Exception excep)
    {
        xmlOut = null;
        /* 
         * This 'IF' condition has been introduced to take care of a case, where the exception raised within service class has already been 
         * processed and rethrown by the Enterprise Library (EL) exception handling block. In such a case it need not be redirected to EL 
         * exception handling block once again.
         */
        if (excep.Source != "Microsoft.Practices.EnterpriseLibrary.ExceptionHandling")
        {
            handleException(excep, "mservice", contextDataItems, ref xmlOut);
        }
        if (xmlOut == null)
        {
            xmlOut = Utilities.generateXML(excep.Message);
            
        }
        appendUADSApplicationNode(xmlOut.FirstChild.SelectSingleNode("./ApplicationException"));
    }
    finally{
        if (customLogger.serviceLogging){
            customLogger.buildLogmessage("Exiting retrieve_manage_call_register_details endpoint (.aspx)", new Dictionary<object, object> { { "xmlOut", xmlOut.OuterXml } });
            Logger.Write(customLogger.loggerContent, CustomUtil.getELLogCategoryName(contextDataItems, "mservice"));
        }
    }
    
    serviceEndTime = DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss.fff");
    try
    {
        CustomUtil.writeAuditTrail("mservice", "retrieve_manage_call_register_details", xmlIn, xmlOut, 
                                new Dictionary<object, object> { 
                                { "ServiceStartTime", serviceStartTime }, { "ServiceEndTime", serviceEndTime },
                                { "Url", Request.Url }, { "RequestType" , Request.RequestType}, { "PhysicalPath" , Request.PhysicalPath}, 
                                { "UserHostAddress", Request.UserHostAddress }, { "UserHostName", Request.UserHostName }             
                                }
                                );
    }
    catch
    {
        /*
         * This is a 'do-nothing' catch block. This has been introduced deliberately, to catch and suppress exceptions raised from within 'writeAuditTrail' method.
         * Without this try-catch block, exceptions raised from within 'writeAuditTrail' method would get propagated to the client program (e.g. user interface)
         * that invoked this service, which is an incorrect behavior. Regardless of the success or failure of 'writeAuditTrail' method, this service has to return
         * the original service response to the client program.
         */
    }
    Response.ContentType = "text/xml";
    Response.Write(xmlOut.OuterXml.ToString());
    xmlOut = null;
}

protected void appendUADSApplicationNode(XmlNode appExceptionNode)
{
    XmlComment commentNode = appExceptionNode.OwnerDocument.CreateComment("'UADSApplicationExceptionClass' node has been included above for backward compatibility with the user interfaces and service clients that have integrated with the older version of the generated services (generated before 4th Jan 2014); this node will be phased out in due course");
    appExceptionNode.OwnerDocument.DocumentElement.PrependChild(commentNode);
    XmlNode uadsAppExceptionNode = appExceptionNode.OwnerDocument.CreateElement("UADSApplicationExceptionClass");
    appExceptionNode.OwnerDocument.DocumentElement.PrependChild(uadsAppExceptionNode);
    foreach (XmlNode childNode in appExceptionNode.ChildNodes)
    {
        uadsAppExceptionNode.AppendChild(childNode.Clone());
    }
}

// EXCEPTION HANDLING SECTION
protected void handleException(Exception exep, string applicationName, Dictionary<object, object> contextDataItems, ref XmlDocument xmlOut)
{
    try
    {
        //Exception handling using enterprise library
        bool rethrowException = ExceptionPolicy.HandleException(exep, CustomUtil.getELExceptionPolicyName(contextDataItems, applicationName));
        if (rethrowException)
        {
            throw exep;
        }
    }
    catch (UmoldITLibraries.ApplicationException exception)
    {
        xmlOut = exception.getExceptionAsXML;
    }
    catch (System.Data.SqlClient.SqlException exception)
    {
        string expPrefix = "";
        if(exception.Number < 50000) //For database engine raised errors 
        {
            expPrefix = "Database error - ";
        }
        xmlOut = Utilities.generateXML(expPrefix + exception.Message);
    }
    catch (Exception exception)
    {
        xmlOut = Utilities.generateXML(exception.Message);
    }
}
</script>
