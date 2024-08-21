<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Xml.Xsl" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.Web.UI" %>
<%@ Import Namespace="System.Web.UI.WebControls" %>
<%@ Import Namespace="System.Configuration" %>
<%@ Import Namespace="System.Net.Mail" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<script runat="server">
protected void Page_Load(object sender, EventArgs e)
{
	try
    {
        ServicePointManager.Expect100Continue = true;
		ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
		Notification noti = new Notification();
        Response.Write("Success");
    }
    catch (Exception exp)
    {
        Response.Write(exp.Message);
    }
}

public class Notification
{
    /* App Client Config */
    public static string Client_Id = "";
    public static string Country_Code = "";
    public static string UserName = "";
    public static string PassWord = "";
    public static string smsgatewayurl = "";
    public static string domain_url = "";
    public static string client_notification_smtp_client = "";
    public static string client_notification_smtp_username = "";
    public static string client_notification_smtp_password = "";
    public static string client_notification_smtp_recipient_emailid_display_name = "";
    public static string System_support_smtp_client = "";
    public static string System_support_smtp_sender_username = "";
    public static string System_support_smtp_sender_password = "";
    public static string System_support_smtp_recipient_emailid = "";
    public static Int32 client_notification_smtp_port;
    public static Int32 System_support_smtp_port;
    public static Boolean client_notification_smtp_enable_ssl;
    public static Boolean System_support_smtp_enable_ssl;
    public static string customer_feedback_url = "";
    public static string customer_feedback_port = "";

    /* Application Variables */
    public static string Session_Id = "";
    public static XmlDocument notification_xml = new XmlDocument();
    public static List<string> Countrylist = new List<string>();

    public Notification()
    {
        System.Reflection.Assembly testAssembly = System.Reflection.Assembly.LoadFile(AppDomain.CurrentDomain.BaseDirectory + "/bin/appclientconfig.dll");
        object appclientconfigSection = testAssembly.GetType("appclientconfig").GetMethod("GetConfig", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static).Invoke(null, null);
        System.Reflection.PropertyInfo propInro = appclientconfigSection.GetType().GetProperty("userlist");
        ConfigurationElementCollection usersList = propInro.GetValue(appclientconfigSection, null) as ConfigurationElementCollection;
        foreach (ConfigurationElement user in usersList)
        {
            /* App Client Config */
            Client_Id = user.GetType().GetProperty("clientid").GetValue(user, null).ToString();
            Country_Code = user.GetType().GetProperty("countrycode").GetValue(user, null).ToString();
            UserName = user.GetType().GetProperty("username").GetValue(user, null).ToString();
            PassWord = user.GetType().GetProperty("password").GetValue(user, null).ToString();
            smsgatewayurl = user.GetType().GetProperty("smsgatewayurl").GetValue(user, null).ToString();
            domain_url = user.GetType().GetProperty("domain_url").GetValue(user, null).ToString();
            client_notification_smtp_client = user.GetType().GetProperty("client_notification_smtp_client").GetValue(user, null).ToString();
            client_notification_smtp_username = user.GetType().GetProperty("client_notification_smtp_username").GetValue(user, null).ToString();
            client_notification_smtp_password = user.GetType().GetProperty("client_notification_smtp_password").GetValue(user, null).ToString();
            client_notification_smtp_port = Convert.ToInt32(user.GetType().GetProperty("client_notification_smtp_port").GetValue(user, null));
            client_notification_smtp_enable_ssl = Convert.ToBoolean(user.GetType().GetProperty("client_notification_smtp_enable_ssl").GetValue(user, null));
            client_notification_smtp_recipient_emailid_display_name = user.GetType().GetProperty("client_notification_smtp_recipient_emailid_display_name").GetValue(user, null).ToString();
            System_support_smtp_client = user.GetType().GetProperty("System_support_smtp_client").GetValue(user, null).ToString();
            System_support_smtp_sender_username = user.GetType().GetProperty("System_support_smtp_sender_username").GetValue(user, null).ToString();
            System_support_smtp_sender_password = user.GetType().GetProperty("System_support_smtp_sender_password").GetValue(user, null).ToString();
            System_support_smtp_recipient_emailid = user.GetType().GetProperty("System_support_smtp_recipient_emailid").GetValue(user, null).ToString();
            System_support_smtp_port = Convert.ToInt32(user.GetType().GetProperty("System_support_smtp_port").GetValue(user, null));
            System_support_smtp_enable_ssl = Convert.ToBoolean(user.GetType().GetProperty("System_support_smtp_enable_ssl").GetValue(user, null));
            customer_feedback_url = user.GetType().GetProperty("customer_feedback_url").GetValue(user, null).ToString();
            customer_feedback_port = user.GetType().GetProperty("customer_feedback_port").GetValue(user, null).ToString();
            /* Application Variables */
            Session_Id = "";
            notification_xml = new XmlDocument();
            Countrylist = new List<string>();

            /* Object Creation */
            notification_despatch n = new notification_despatch();
            authenticate_client auth_client = new authenticate_client();
            authenticate_user auth_user = new authenticate_user();
            retrieve_listof_notifications_for_delivery notification_delivery = new retrieve_listof_notifications_for_delivery();
            /* Authenticate Client */
            if (auth_client.executeService_authenticate_client() == "true")
            {
                for (int county = 0; county < Countrylist.Count; county++)
                {
                    Country_Code = Countrylist[county];
                    /* Authenticate User */
                    if (auth_user.executeService_authenticate_user() == "true")
                    {
                        /* Retrieve Notification List */
                        if (notification_delivery.executeService_retrieve_listof_notifications_for_delivery() == "")
                        {
                            /* Notification Despatcher */
                            n.Notification_despatch(notification_xml, user.GetType().GetProperty("smsgatewayurl").GetValue(user, null).ToString());
                        }
                        /* Signout User */
                        signout_user signout = new signout_user();
                        signout.executeService_signout_user();
                    }
                }
            }
        }
    }
}
class authenticate_client
{
    UmoldITServiceProxy proxyService = new UmoldITServiceProxy();

    public string executeService_authenticate_client()
    {
        XmlDocument responseXML = new XmlDocument();

        try
        {
            //Here responseXML contains service output xml
            string target_url = proxyService.getWebserverpath() + "/security/authenticate_client.aspx";
            responseXML = proxyService.executeService(prepareServiceRequestData_authenticate_client(), target_url);

            if (responseXML.FirstChild.SelectSingleNode("./UADSApplicationExceptionClass") == null)
            {
                return processServiceResponseData_authenticate_client(responseXML);

            }
            else
            {
                Notificationloger.create_Log_File("authenticate_client", "", "", "", "", responseXML.FirstChild.SelectSingleNode(".//errorDescription").InnerText);
                return "false";
            }
        }
        catch (Exception exp)
        {
            Notificationloger.create_Log_File("authenticate_client", "", "", "", "", "Service execution error:" + exp.Message);
            return "false";
        }
    }
    public string prepareServiceRequestData_authenticate_client()
    {
        //Function to form and return input xml
        string serviceDetails = "";
        serviceDetails = "<document>";

        //Processing context segment
        serviceDetails = serviceDetails + "<context>";
        serviceDetails = serviceDetails + "<sessionId>" + proxyService.getXmlString("7e9c274d-1c4b-4234-9eec-4f90971f998b") + "</sessionId>"; // UniqueIdentifier string
        serviceDetails = serviceDetails + "<userId>" + proxyService.getXmlString("1") + "</userId>"; // Unicode string
        serviceDetails = serviceDetails + "<client_id>" + proxyService.getXmlString(Notification.Client_Id) + "</client_id>"; // String
        serviceDetails = serviceDetails + "<locale_id>" + proxyService.getXmlString("en-us") + "</locale_id>"; // String
        serviceDetails = serviceDetails + "<country_code>" + proxyService.getXmlString(Notification.Country_Code) + "</country_code>"; // String

        //Processing auth_client_request segment
        serviceDetails = serviceDetails + "<auth_client_request>";
        serviceDetails = serviceDetails + "<p_company_id>" + proxyService.getXmlString(Notification.Client_Id) + "</p_company_id>";  // String
        serviceDetails = serviceDetails + "</auth_client_request>";
        serviceDetails = serviceDetails + "</context>";
        serviceDetails = serviceDetails + "</document>";

        return serviceDetails;
    }
    public string processServiceResponseData_authenticate_client(XmlDocument outXMLDoc)
    {
        List<string> list = new List<string>();
        string ResponseXml = "";
        //Code block for forming table column names based on the existing 'outputparam_detail' grid header names
        XmlNode contextNode = outXMLDoc.SelectSingleNode(".//context");
        XmlNode outputparam_header = contextNode.SelectSingleNode("//auth_client_response_header");
        XmlNode auth_client_response_detail = contextNode.SelectSingleNode("//auth_client_response_detail");
        ResponseXml += outputparam_header["p_valid_client_ind"].InnerText; // p_retrieve_status
        for (int toplevelChildi = 0; toplevelChildi < contextNode.ChildNodes.Count; toplevelChildi++)
        {
            if (contextNode.ChildNodes[toplevelChildi].Name == "auth_client_response_detail")
            {
                list.Add(contextNode.ChildNodes[toplevelChildi].ChildNodes[0].InnerText);
                Notification.Countrylist.Add(contextNode.ChildNodes[toplevelChildi].ChildNodes[0].InnerText);
            }
        }
        return ResponseXml;
    }
}
class authenticate_user
{
    UmoldITServiceProxy proxyService = new UmoldITServiceProxy();

    public string executeService_authenticate_user()
    {
        XmlDocument responseXML = new XmlDocument();

        try
        {
            //Here responseXML contains service output xml
            string target_url = proxyService.getWebserverpath() + "/security/authenticate_user.aspx";
            responseXML = proxyService.executeService(prepareServiceRequestData_authenticate_user(), target_url);

            if (responseXML.FirstChild.SelectSingleNode("./UADSApplicationExceptionClass") == null)
            {
                return processServiceResponseData_authenticate_user(responseXML);

            }
            else
            {
                Notificationloger.create_Log_File("authenticate_user", "", "", "", "", responseXML.FirstChild.SelectSingleNode(".//errorDescription").InnerText);
                return "false";
            }
        }
        catch (Exception exp)
        {
            Notificationloger.create_Log_File("authenticate_user", "", "", "", "", "Service execution error:" + exp.Message);
            return "false";
        }
    }
    public string prepareServiceRequestData_authenticate_user()
    {
        string serviceDetails;
        serviceDetails = "<document>";

        //Processing context segment
        serviceDetails = serviceDetails + "<context>";
        serviceDetails = serviceDetails + "<sessionId>" + proxyService.getXmlString("7e9c274d-1c4b-4234-9eec-4f90971f998b") + "</sessionId>"; // UniqueIdentifier string
        serviceDetails = serviceDetails + "<userId>" + proxyService.getXmlString("1") + "</userId>"; // Unicode string
        serviceDetails = serviceDetails + "<client_id>" + proxyService.getXmlString(Notification.Client_Id) + "</client_id>"; // String
        serviceDetails = serviceDetails + "<locale_id>" + proxyService.getXmlString("en-us") + "</locale_id>"; // String
        serviceDetails = serviceDetails + "<country_code>" + proxyService.getXmlString(Notification.Country_Code) + "</country_code>"; // String


        //Processing auth_request segment
        serviceDetails = serviceDetails + "<auth_request>";
        serviceDetails = serviceDetails + "<p_company_id>" + proxyService.getXmlString(Notification.Client_Id) + "</p_company_id>";  // String
        serviceDetails = serviceDetails + "<p_country_code>" + proxyService.getXmlString(Notification.Country_Code) + "</p_country_code>";  // String
        serviceDetails = serviceDetails + "<p_user_id>" + proxyService.getXmlString(Notification.UserName) + "</p_user_id>";  // Unicode string
        serviceDetails = serviceDetails + "<p_passwd>" + proxyService.getXmlString(Notification.PassWord) + "</p_passwd>";  // Unicode string
        serviceDetails = serviceDetails + "<p_device>" + proxyService.getXmlString("") + "</p_device>";  // Unicode string
        serviceDetails = serviceDetails + "<p_browser>" + proxyService.getXmlString("") + "</p_browser>";  // Unicode string
        serviceDetails = serviceDetails + "<p_ip_address>" + proxyService.getXmlString("") + "</p_ip_address>";  // String
        serviceDetails = serviceDetails + "<p_channel_id>process</p_channel_id>";  // String
        serviceDetails = serviceDetails + "</auth_request>";

        serviceDetails = serviceDetails + "</context>";
        serviceDetails = serviceDetails + "</document>";
        return serviceDetails;
    }
    public string processServiceResponseData_authenticate_user(XmlDocument outXMLDoc)
    {
        XmlNode contextNode = outXMLDoc.SelectSingleNode(".//context");
        XmlNode outputparam_header = contextNode.SelectSingleNode("//auth_response_login_profile");
        Notification.Session_Id = outputparam_header["p_guid"].InnerText;
        return "true";
    }
}
class retrieve_listof_notifications_for_delivery
{
    UmoldITServiceProxy proxyService = new UmoldITServiceProxy();

    public string executeService_retrieve_listof_notifications_for_delivery()
    {
        XmlDocument responseXML = new XmlDocument();

        try
        {
            //Here responseXML contains service output xml
            string target_url = proxyService.getWebserverpath() + "/common_modules/retrieve_listof_notifications_for_delivery.aspx";
            responseXML = proxyService.executeServiceAndtransformResponse(target_url, prepareServiceRequestData_retrieve_listof_notifications_for_delivery());

            if (responseXML.FirstChild.SelectSingleNode("./UADSApplicationExceptionClass") == null)
            {
                return processServiceResponseData_retrieve_listof_notifications_for_delivery(responseXML);
            }
            else
            {
                Notificationloger.create_Log_File("retrieve_listof_notifications_for_delivery", "", "", "", "", responseXML.FirstChild.SelectSingleNode(".//errorDescription").InnerText);
                return "SP000";
            }
        }
        catch (Exception exp)
        {
            Notificationloger.create_Log_File("retrieve_listof_notifications_for_delivery", "", "", "", "", "Service execution error:" + exp.Message);
            return "SP000";
        }
    }
    public string prepareServiceRequestData_retrieve_listof_notifications_for_delivery()
    {
        string serviceDetails;
        serviceDetails = "<document>";

        //Processing context segment
        serviceDetails = serviceDetails + proxyService.getContextElements();
        serviceDetails = serviceDetails + "</context>";
        serviceDetails = serviceDetails + "</document>";
        return serviceDetails;
    }
    public string processServiceResponseData_retrieve_listof_notifications_for_delivery(XmlDocument outXMLDoc)
    {
        XmlNode contextNode = outXMLDoc.SelectSingleNode(".//context");
        XmlNode outputparam_header = contextNode.SelectSingleNode("//outputparam_header");
        Notification.notification_xml = outXMLDoc;
        return outputparam_header["p_retrieve_status"].InnerText;
    }
}
class update_notification_status
{
    UmoldITServiceProxy proxyService = new UmoldITServiceProxy();
    string Notification_ID = "";
    string Delivery_Status = "";
    public string executeService_update_notification_status(string notify_id, string delivery_status)
    {
        Notification_ID = notify_id;
        Delivery_Status = delivery_status;
        XmlDocument responseXML = new XmlDocument();

        try
        {
            //Here responseXML contains service output xml
            string target_url = proxyService.getWebserverpath() + "/common_modules/update_notification_status.aspx";
            responseXML = proxyService.executeService(prepareServiceRequestData_update_notification_status(), target_url);

            if (responseXML.FirstChild.SelectSingleNode("./UADSApplicationExceptionClass") == null)
            {
                return processServiceResponseData_update_notification_status(responseXML);
            }
            else
            {
                Notificationloger.create_Log_File("update_notification_status", "", "", "", "", responseXML.FirstChild.SelectSingleNode(".//errorDescription").InnerText);
                return "SP000";
            }
        }
        catch (Exception exp)
        {
            Notificationloger.create_Log_File("update_notification_status", "", "", "", "", "Service execution error:" + exp.Message);
            return "SP000";
        }
    }
    public string prepareServiceRequestData_update_notification_status()
    {
        string serviceDetails;
        serviceDetails = "<document>";

        //Processing context segment
        serviceDetails = serviceDetails + proxyService.getContextElements();

        //Processing inputparam segment
        serviceDetails = serviceDetails + "<inputparam>";
        serviceDetails = serviceDetails + "<p_notification_id>" + proxyService.getXmlString(Notification_ID) + "</p_notification_id>";  // Int32: -2147483648 to 2147483647
        serviceDetails = serviceDetails + "<p_delivery_status>" + proxyService.getXmlString(Delivery_Status) + "</p_delivery_status>";  // Int32: -2147483648 to 2147483647		
        serviceDetails = serviceDetails + "</inputparam>";
        serviceDetails = serviceDetails + "</context>";
        serviceDetails = serviceDetails + "</document>";
        return serviceDetails;
    }
    public string processServiceResponseData_update_notification_status(XmlDocument outXMLDoc)
    {
        XmlNode contextNode = outXMLDoc.SelectSingleNode(".//context");
        XmlNode outputparam_header = contextNode.SelectSingleNode("//outputparam");
        return outputparam_header["p_update_status"].InnerText;
    }
}
class signout_user
{
    UmoldITServiceProxy proxyService = new UmoldITServiceProxy();

    public string executeService_signout_user()
    {
        XmlDocument responseXML = new XmlDocument();

        try
        {
            //Here responseXML contains service output xml
            string target_url = proxyService.getWebserverpath() + "/security/signout_user.aspx";
            responseXML = proxyService.executeService(prepareServiceRequestData_signout_user(), target_url);

            if (responseXML.FirstChild.SelectSingleNode("./UADSApplicationExceptionClass") == null)
            {
                return processServiceResponseData_signout_user(responseXML);
            }
            else
            {
                Notificationloger.create_Log_File("signout_user", "", "", "", "", responseXML.FirstChild.SelectSingleNode(".//errorDescription").InnerText);
                return "false";
            }
        }
        catch (Exception exp)
        {
            Notificationloger.create_Log_File("signout_user", "", "", "", "", "Service execution error:" + exp.Message);
            return "false";
        }
    }
    public string prepareServiceRequestData_signout_user()
    {
        DateTime current_dateTime = DateTime.Now;
        string serviceDetails = "<document>";
        serviceDetails += proxyService.getContextElements();


        //Processing auth_request segment
        serviceDetails = serviceDetails + "<inputparam>";
        serviceDetails = serviceDetails + "<p_logout_date>" + current_dateTime.Date.ToString("yyyy-MM-dd") + "</p_logout_date>";  // String
        serviceDetails = serviceDetails + "<p_logout_hour>" + current_dateTime.Hour + "</p_logout_hour>";  // String
        serviceDetails = serviceDetails + "<p_logout_minute>" + current_dateTime.Minute + "</p_logout_minute>";  // String
        serviceDetails = serviceDetails + "</inputparam>";
        serviceDetails = serviceDetails + "</context>";
        serviceDetails = serviceDetails + "</document>";
        return serviceDetails;
    }
    public string processServiceResponseData_signout_user(XmlDocument outXMLDoc)
    {
        return "true";
    }
}
class UmoldITServiceProxy
{
    public XmlDocument executeService(string serviceDetails, string target_url)
    {
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(target_url);
        request.Method = "POST";
        request.ContentType = "text/xml";
        request.Accept = "text/xml";
        byte[] buffer = System.Text.Encoding.ASCII.GetBytes(serviceDetails);
        request.ContentLength = buffer.Length;
        Stream ReqStream = request.GetRequestStream();
        ReqStream.Write(buffer, 0, buffer.Length);
        ReqStream.Close();
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        StreamReader sr = new StreamReader(response.GetResponseStream());
        string res_xml = sr.ReadToEnd();
        sr.Close();
        return getXml(res_xml);
    }
    public string getXmlString(String value)
    {
        XmlDocument convertedXml = new XmlDocument();
        convertedXml.InnerXml = "<document><convertedValue/></document>";
        convertedXml.FirstChild.SelectSingleNode("./convertedValue").InnerText = value;
        return convertedXml.FirstChild.SelectSingleNode("./convertedValue").InnerXml;
    }
    public string getContextElements()
    {
        //Replace USER INPUT with appropriate values for context elements
        //Processing context segment

        string contextdetails = "";
        contextdetails += "<context>";
        contextdetails += "<sessionId>" + getXmlString(Notification.Session_Id) + "</sessionId>"; // UniqueIdentifier string
        contextdetails += "<userId>" + getXmlString(Notification.UserName) + "</userId>"; // Unicode string
        contextdetails += "<client_id>" + getXmlString(Notification.Client_Id) + "</client_id>"; // String
        contextdetails += "<locale_id>" + getXmlString("en-us") + "</locale_id>"; // String
        contextdetails += "<country_code>" + getXmlString(Notification.Country_Code) + "</country_code>"; // String
        return contextdetails;

    }
    public XmlDocument executeServiceAndtransformResponse(string targetURL, string serviceDetails)
    {
        //Change the target URL
        var targetURL_temp = targetURL;
        var serName = targetURL_temp.Substring(targetURL.LastIndexOf('/') + 1);
        targetURL_temp = targetURL_temp.Replace(serName, "InvokeServiceAndTransformResponse.aspx");

        //Include service URL
        XmlDocument serviceResponseXml = getXml(serviceDetails);
        var serviceURLNode = serviceResponseXml.CreateElement("serviceURL");
        var serviceURLText = serviceResponseXml.CreateTextNode(targetURL);
        serviceURLNode.AppendChild(serviceURLText);

        serviceResponseXml.DocumentElement.InsertBefore(serviceURLNode, serviceResponseXml.DocumentElement.FirstChild);

        return executeService(serviceResponseXml.InnerXml, targetURL_temp);
    }
    public XmlDocument getXml(string xmlString)
    {
        XmlDocument xmlDoc = new XmlDocument();
        xmlDoc.LoadXml(xmlString);
        return xmlDoc;
    }
    public string getWebserverpath()
    {
        return Notification.domain_url;
    }
}
class notification_despatch
{
    update_notification_status update_notification_status = new update_notification_status();              //Object creation for update notification status
    //***************Variable decalaration End***************//
    public void Notification_despatch(XmlDocument NotificationResponse, string gatewayurl)
    {
        string Client_Info = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[5].ChildNodes[1].InnerXml.ToString();
        for (int outputparam_detail_n_header = 0; outputparam_detail_n_header < NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes.Count; outputparam_detail_n_header++)
        {
            // ************* Notification List ****************
            if (NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].Name == "outputparam_detail_n_header")
            {
                string Response = "";
                string notification_id = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_notification_id"].InnerText;
                string notification_event_code = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_n_event_code"].InnerText;


                if (NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_n_info_xml"].SelectSingleNode("notification_info/customer_feedback_ind") != null)
                {
                    string customer_feedback_ind = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_n_info_xml"].SelectSingleNode("notification_info/customer_feedback_ind").InnerText;

                    if (customer_feedback_ind == "true")
                    {
                        string customer_feedback_long_url = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_n_info_xml"].SelectSingleNode("notification_info/customer_feedback_long_url").InnerText;                        

                        string tinyurl = "";
                        try
                        {
                            var request = WebRequest.Create("http://tinyurl.com/api-create.php?url=" + Notification.customer_feedback_url + ":" + Notification.customer_feedback_port + "/" + customer_feedback_long_url.Replace("&amp;", "&"));
                            using (var reader = new StreamReader(request.GetResponse().GetResponseStream()))
                            {
                                tinyurl = reader.ReadToEnd();
                            }
                        }
                        catch (Exception ex)
                        {
                            tinyurl = "";
                        }

                        File.AppendAllText(AppDomain.CurrentDomain.BaseDirectory + "/Log/Notification/TinyUrl/" + Notification.Client_Id + "_" + Notification.Country_Code + "_" + DateTime.Now.ToString("yyyy-MM-dd") + ".txt", customer_feedback_long_url + "-->" + tinyurl + Environment.NewLine);

                        NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_n_info_xml"].SelectSingleNode("notification_info/customer_feedback_short_url").InnerText = tinyurl;
                    }
                }
                string notification_info = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_n_info_xml"].InnerXml;

                for (int outputparam_detail_n_mode_detail = 0; outputparam_detail_n_mode_detail < NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes.Count; outputparam_detail_n_mode_detail++)
                {
                    // ************* Notification Mode List *************
                    if (NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].Name == "outputparam_detail_n_mode_detail")
                    {
                        string notification_mode = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail]["p_n_mode"].InnerText;
                        string template_id = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail]["p_n_template_id"].InnerText;
                        if (notification_mode == "EMAIL")
                        {
                            string To = "";
                            List<string> Cc = new List<string>();
                            string Recipient_Info = "";
                            List<string> Email_Attachments = new List<string>();
                            if (NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_n_info_xml"].ChildNodes[0]["attachments"] != null)
                            {
                                for (int attachmentCounter = 0; attachmentCounter < NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_n_info_xml"].ChildNodes[0]["attachments"].ChildNodes.Count; attachmentCounter++)
                                {
                                    Email_Attachments.Add(NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header]["p_n_info_xml"].ChildNodes[0]["attachments"].ChildNodes[attachmentCounter].ChildNodes[0].Value);
                                }
                            }
                            for (int outputparam_detail_n_recipient_detail = 0; outputparam_detail_n_recipient_detail < NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes.Count; outputparam_detail_n_recipient_detail++)
                            {
                                if (NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail].Name == "outputparam_detail_n_recipient_detail")
                                {
                                    string Recipient_type = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail]["p_n_recipient_type"].InnerText;
                                    if (Recipient_type == "To")
                                    {
                                        To = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail]["p_n_recipient_email_id"].InnerText;
                                        Recipient_Info = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail].InnerXml;
                                    }
                                    else
                                    {
                                        Cc.Add(NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail]["p_n_recipient_email_id"].InnerText);
                                    }
                                }
                            }
                            string Notification_Content = BuildXML(notification_event_code, template_id, notification_mode, notification_id, Client_Info, notification_info, Recipient_Info);
                            if (Notification_Content != "")
                            {
                                List<string> EmailContent = GetHtmlForEmail(notification_event_code, template_id, notification_mode, notification_id, Notification_Content);
                                if (EmailContent.Count == 2)
                                {
                                    Response += SendEmail(To, Cc, Email_Attachments, EmailContent[0], toSubjectString(EmailContent[1]), notification_mode, notification_event_code, template_id, notification_id);
                                }
                            }
                        }
                        else if (notification_mode == "SMS")
                        {
                            string To = "";
                            List<string> Cc = new List<string>();
                            string Recipient_Info = "";
                            for (int outputparam_detail_n_recipient_detail = 0; outputparam_detail_n_recipient_detail < NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes.Count; outputparam_detail_n_recipient_detail++)
                            {
                                if (NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail].Name == "outputparam_detail_n_recipient_detail")
                                {
                                    string Recipient_type = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail]["p_n_recipient_type"].InnerText;
                                    if (Recipient_type == "To")
                                    {
                                        To = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail]["p_n_recipient_mobile_no"].InnerText;
                                        Recipient_Info = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail].InnerXml;
                                    }
                                    else
                                    {
                                        Cc.Add(NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail]["p_n_recipient_mobile_no"].InnerText);
                                    }
                                }
                            }
                            string Notification_Content = BuildXML(notification_event_code, template_id, notification_mode, notification_id, Client_Info, notification_info, Recipient_Info);
                            if (Notification_Content != "")
                            {
                                string SMS_TEXT = GetTextForSMS(notification_event_code, template_id, notification_mode, notification_id, Notification_Content);
                                if (SMS_TEXT != "")
                                {
                                    Response += SendSms(To, Cc, SMS_TEXT, gatewayurl, notification_mode, notification_event_code, template_id, notification_id);
                                }
                            }
                        }
                        else if (notification_mode == "PUSH")
                        {
                            for (int outputparam_detail_n_recipient_detail = 0; outputparam_detail_n_recipient_detail < NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes.Count; outputparam_detail_n_recipient_detail++)
                            {
                                if (NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail].Name == "outputparam_detail_n_recipient_detail")
                                {
                                    string userID = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail]["p_n_recipient_user_id"].InnerText;
                                    string Recipient_Info = NotificationResponse.DocumentElement.ChildNodes[0].ChildNodes[outputparam_detail_n_header].ChildNodes[outputparam_detail_n_mode_detail].ChildNodes[outputparam_detail_n_recipient_detail].InnerXml;
                                    if (userID != "")
                                    {
                                        string Notification_Content = BuildXML(notification_event_code, template_id, notification_mode, notification_id, Client_Info, notification_info, Recipient_Info);									
										
                                        if (Notification_Content != "")
                                        {
											String appID;
											
                                            String PushNotificationText = GetTextForPushNotification(Notification.Client_Id, Notification.Country_Code, userID, notification_event_code, template_id, notification_mode, notification_id, Notification_Content, out appID);
                                            											
                                            if (PushNotificationText != "")
                                            {
                                                Response += SendPushNotification(Notification.Client_Id, Notification.Country_Code, PushNotificationText, notification_mode, notification_event_code, template_id, notification_id, appID);       
                                            }
                                        }                                        
                                    }
                                }
                            }
                        }
                    }
                }
                // ****************************** Notification Updatation ***********************************
                if (!Response.Contains("ND000") && Response != "")
                {
                    update_notification_status.executeService_update_notification_status(notification_id, "D");
                }
                else
                {
                    update_notification_status.executeService_update_notification_status(notification_id, "E");
                }
            }
        }
    }
    public List<string> GetHtmlForEmail(string no_evnt_code, string temp_id, string no_mode, string notid, string notificationxml)
    {
        List<string> subandbodyforemail = new List<string>();
        string xsl_folder_path = AppDomain.CurrentDomain.BaseDirectory + "/common/components/Notification/Xsl/";
        string html_folder_path = AppDomain.CurrentDomain.BaseDirectory + "/common/components/Notification/Html/";
        try
        {
            if (File.Exists(xsl_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".xsl"))
            {
                if (File.Exists(html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + "_body.html"))
                {
                    if (File.Exists(html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + "_sub.html"))
                    {
                        subandbodyforemail.Add(ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + "_body.html")));
                        subandbodyforemail.Add(ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + "_sub.html")));
                    }
                    else
                    {
                        Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + "_sub.html");
                    }
                }
                else
                {
                    Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + "_body.html");
                }
            }
            else if (File.Exists(xsl_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".xsl"))
            {
                if (File.Exists(html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + "_body.html"))
                {
                    if (File.Exists(html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + "_sub.html"))
                    {
                        subandbodyforemail.Add(ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + "_body.html")));
                        subandbodyforemail.Add(ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + "_sub.html")));
                    }
                    else
                    {
                        Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + "_sub.html");
                    }
                }
                else
                {
                    Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + "_body.html");
                }
            }
            else if (File.Exists(xsl_folder_path + temp_id + "_" + no_mode + ".xsl"))
            {
                if (File.Exists(html_folder_path + temp_id + "_" + no_mode + "_body.html"))
                {
                    if (File.Exists(html_folder_path + temp_id + "_" + no_mode + "_sub.html"))
                    {
                        subandbodyforemail.Add(ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + temp_id + "_" + no_mode + "_body.html")));
                        subandbodyforemail.Add(ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + temp_id + "_" + no_mode + "_sub.html")));
                    }
                    else
                    {
                        Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + temp_id + "_" + no_mode + "_sub.html");
                    }
                }
                else
                {
                    Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + temp_id + "_" + no_mode + "_body.html");
                }
            }
            else
            {
                Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Xsl file missing");
            }
        }
        catch (Exception transform)
        {
            Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "xsl Transform error message:" + transform.Message);
        }
        return subandbodyforemail;
    }
    public string GetTextForSMS(string no_evnt_code, string temp_id, string no_mode, string notid, string notificationxml)
    {
        string sms_txt = "";
        string xsl_folder_path = AppDomain.CurrentDomain.BaseDirectory + "/common/components/Notification/Xsl/";
        string html_folder_path = AppDomain.CurrentDomain.BaseDirectory + "/common/components/Notification/Html/";
        try
        {
            if (File.Exists(xsl_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".xsl"))
            {
                if (File.Exists(html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".html"))
                {
                    sms_txt = ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".html"));
                }
                else
                {
                    Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".html");
                }
            }
            else if (File.Exists(xsl_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".xsl"))
            {
                if (File.Exists(html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".html"))
                {
                    sms_txt = ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".html"));
                }
                else
                {
                    Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".html");
                }
            }
            else if (File.Exists(xsl_folder_path + temp_id + "_" + no_mode + ".xsl"))
            {
                if (File.Exists(html_folder_path + temp_id + "_" + no_mode + ".html"))
                {
                    sms_txt = ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + temp_id + "_" + no_mode + ".html"));
                }
                else
                {
                    Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + temp_id + "_" + no_mode + ".html");
                }
            }
            else
            {
                Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Xsl file is missing.");
            }
        }
        catch (Exception transform)
        {
            Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "xsl Transform error message:" + transform.Message);
        }
        return sms_txt;
    }
    public string GetTextForPushNotification(String clientID, String countryCode, String userID, string no_evnt_code, string temp_id, string no_mode, string notid, string notificationxml, out String appID)
    {        
        string notificationText = "";
		appID = "";
        string xsl_folder_path = AppDomain.CurrentDomain.BaseDirectory + "/common/components/Notification/Xsl/";
        string html_folder_path = AppDomain.CurrentDomain.BaseDirectory + "/common/components/Notification/Html/";
        try
        {
		
		
            if (File.Exists(xsl_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".xsl"))
            {
                if (File.Exists(html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".html"))
                {
                    notificationText = ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".html"));
                    
                }
                else
                {
                    Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + Notification.Client_Id + "_" + Notification.Country_Code + "_" + temp_id + "_" + no_mode + ".html");
                }
            }
            else if (File.Exists(xsl_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".xsl"))
            {
                if (File.Exists(html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".html"))
                {
                    notificationText = ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".html"));
                }
                else
                {
                    Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + Notification.Client_Id + "_" + temp_id + "_" + no_mode + ".html");
                }
            }
            else if (File.Exists(xsl_folder_path + temp_id + "_" + no_mode + ".xsl"))
            {
                if (File.Exists(html_folder_path + temp_id + "_" + no_mode + ".html"))
                {
                    notificationText = ConvertXml_to_Html(notificationxml, File.ReadAllText(xsl_folder_path + temp_id + "_" + no_mode + ".xsl"), File.ReadAllText(html_folder_path + temp_id + "_" + no_mode + ".html"));
                }
                else
                {
                    Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Could not find the" + html_folder_path + temp_id + "_" + no_mode + ".html");
                }
            }
            else
            {
                Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "Xsl file is missing.");
            }
        }
        catch (Exception transform)
        {
            Notificationloger.create_Log_File("", no_mode, no_evnt_code, temp_id, notid, "xsl Transform error message:" + transform.Message);
        }
        
        if (notificationText != "")
        {	
            notificationText = notificationText.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>", "").Trim();
			
			var msgObject = JsonConvert.DeserializeObject<dynamic>(notificationText);
			var msgToObject = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "\\" + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvMsg" + "\\" + "fcmtoken" + "\\" + ((String)msgObject.data.msgHeader.appID) + "\\" + userID + ".txt"));
			
			msgObject.include_player_ids = JsonConvert.DeserializeObject<dynamic>("[\"" + (String)msgToObject.userId + "\"]");
			
			notificationText = JsonConvert.SerializeObject(msgObject);
			
			appID = (String)msgObject.data.msgHeader.appID;
        }
		
        return notificationText;
    }
    public string toSubjectString(string subj)
    {
        int sdiv = subj.IndexOf("<div>");
        subj = subj.Substring(sdiv + 5);
        int cdiv = subj.IndexOf("</div>");
        subj = subj.Remove(cdiv);
        return subj;
    }
    public string BuildXML(string no_evt, string temp_id, string noti_mod, string noti_id, string client_Details, string notification_details, string recipient_details)
    {
        string buildxml = "";
        if (notification_details != "")
        {
            buildxml = "<content>";
            buildxml += client_Details;
            buildxml += notification_details;
            buildxml += recipient_details;
            buildxml += "</content>";
        }
        else
        {
            Notificationloger.create_Log_File("", noti_mod, no_evt, temp_id, noti_id, "notification info xml is empty");
        }
        return buildxml;
    }
    public string ConvertXml_to_Html(string noti_info, string readText_xsl, string readText_html)
    {       
        XmlDocument notification_info = new XmlDocument();
        notification_info.LoadXml(noti_info);
        StringWriter objSWriter = new StringWriter();
        readText_xsl = readText_xsl.Replace("<html></html>", readText_html).Replace("\r\n", "");
        XsltSettings settings = new XsltSettings();
        settings.EnableScript = true;
        XslCompiledTransform objXslTrans = new XslCompiledTransform();
        objXslTrans.Load(new XmlTextReader(new StringReader(readText_xsl)), settings, new XmlUrlResolver());
        objXslTrans.Transform(notification_info, null, objSWriter);
        return objSWriter.ToString().Replace("&amp;", "&");
    }
    public string SendEmail(string TO, List<string> CC, List<string> attachements, string body, string subject, string notification_mode, string notification_event_code, string temp_id, string notification_id)
    {
        string ResponseXml = "ND000";
        MailMessage mail = new MailMessage();
        SmtpClient SmtpServer = new SmtpClient(Notification.client_notification_smtp_client);
        try
        {
            mail.From = new MailAddress(Notification.client_notification_smtp_username, Notification.client_notification_smtp_recipient_emailid_display_name);
            mail.To.Add(TO);
            for (int j = 0; j < CC.Count; j++)
            {
                mail.CC.Add(CC[j]);
            }
            mail.Subject = subject;
            mail.IsBodyHtml = true;
            string htmlBody;
            if (body != null)
                htmlBody = body;
            else
                htmlBody = "";
            mail.Body = htmlBody;
            for (int attachCounter = 0; attachCounter < attachements.Count; attachCounter++)
            {
                mail.Attachments.Add(new Attachment(HttpContext.Current.Server.MapPath("~/content_store/" + Notification.Client_Id + "/" + Notification.Country_Code + "/" + attachements[attachCounter])));
            }
            SmtpServer.Port = Notification.client_notification_smtp_port;
            SmtpServer.Credentials = new System.Net.NetworkCredential(Notification.client_notification_smtp_username, Notification.client_notification_smtp_password);
            SmtpServer.EnableSsl = Notification.client_notification_smtp_enable_ssl;
            SmtpServer.Send(mail);
            SmtpServer.Dispose();
            ResponseXml = "ND001"; // p_retrieve_status
        }
        catch (Exception ex)
        {
            string recipients = TO;
            for (int re = 0; re < CC.Count; re++)
            {
                recipients += "," + CC[re];
            }
            Notificationloger.create_Log_File("Send Email", notification_mode, notification_event_code, temp_id, notification_id, ex.Message + "\n" + "Recipients:" + recipients);
        }
        return ResponseXml;
    }
    public string SendSms(string TO, List<string> CC, string template_str, string smsgatewayurl, string notification_mode, string notification_event_code, string temp_id, string notification_id)
    {
        string ResponseXml = "ND000";
        string phoneno = "";
        string returnedvalue = "";
        try
        {
            phoneno += TO;
            for (int k = 0; k < CC.Count; k++)
            {
                phoneno += "," + CC[k];
            }
            string URL = smsgatewayurl.Trim() + phoneno.Trim() + "&amp;" + template_str.Trim();
            URL = URL.Replace("\t", "").Replace("&amp;", "&");
            URL = URL.Trim();
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
            request.Method = "GET";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader sr = new StreamReader(response.GetResponseStream());
            returnedvalue = sr.ReadToEnd();
            sr.Close();
            response.Close();

            string smsgateway_response_xml = "<sms_gateway_response>";
            smsgateway_response_xml += "<client_id>" + Notification.Client_Id + "</client_id>";
            smsgateway_response_xml += "<country_code>" + Notification.Country_Code + "</country_code>";
            smsgateway_response_xml += "<response>" + returnedvalue + "</response>";
            smsgateway_response_xml += "</sms_gateway_response>";

            XmlDocument smsgateway_info = new XmlDocument();
            smsgateway_info.LoadXml(smsgateway_response_xml);
            StringWriter objSWriter = new StringWriter();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            XslCompiledTransform objXslTrans = new XslCompiledTransform();
            objXslTrans.Load(AppDomain.CurrentDomain.BaseDirectory + "/common/components/Notification/smsgateway_config.xsl", settings, new XmlUrlResolver());
            objXslTrans.Transform(smsgateway_info, null, objSWriter);

            ResponseXml = objSWriter.ToString().Replace("<html>", "").Replace("</html>", "");
            if (ResponseXml == "ND001")
            {
                /* SMS Logger */
                try
                {
                    DirectoryInfo smscountdir = new DirectoryInfo(AppDomain.CurrentDomain.BaseDirectory + "/Log/Notification/smslogger");

                    // Create the directory only if it does not already exist. 
                    if (smscountdir.Exists == false)
                        smscountdir.Create();

                    FileStream fs = new FileStream(AppDomain.CurrentDomain.BaseDirectory + "/Log/Notification/smslogger/" + Notification.Client_Id + "_" + Notification.Country_Code + "_" + DateTime.Now.ToString("yyyy-MM-dd") + ".txt", FileMode.Append, FileAccess.Write);
                    StreamWriter sw = new StreamWriter(fs);
                    sw.WriteLine("Date:" + DateTime.Now.ToString() + "-" + "Notification Id:" + notification_id + "-" + "Recipients:" + phoneno);
                    sw.Close();
                    fs.Close();
                }
                catch (Exception smslog)
                {
                    Notificationloger.create_Log_File("SMS Counter", notification_mode, notification_event_code, temp_id, notification_id, smslog.Message);
                }
            }
            else
            {
                Notificationloger.create_Log_File("Send Sms", notification_mode, notification_event_code, temp_id, notification_id, returnedvalue + "\n" + "Recipients:" + phoneno);
            }
        }
        catch (Exception e)
        {
            Notificationloger.create_Log_File("Send Sms", notification_mode, notification_event_code, temp_id, notification_id, e.Message);
        }
        return ResponseXml;
    }
    public string SendPushNotification(String clientID, String countryCode, String notificationText, string notificationMode, string notificationEventCode, string tempID, string notificationID, String appID)
    {
        HttpWebRequest request;
        HttpWebResponse response;
        Byte[] encodedInputData;
        String responseMessage, ResponseXml = "ND000";

        try
        {  
			var restAPiObject = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "\\" + "fmt" + "\\" + "msvMsg" + "\\" + "fcmkey_" + clientID + "_" + countryCode + ".json"));

            request = (HttpWebRequest)WebRequest.Create("https://onesignal.com/api/v1/notifications");

            encodedInputData = Encoding.UTF8.GetBytes(notificationText);

            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            request.Headers.Add("authorization", "Basic " + (String)restAPiObject[appID].fcmKey);
            request.ContentLength = encodedInputData.Length;

            using (var stream = request.GetRequestStream())
            {
                stream.Write(encodedInputData, 0, encodedInputData.Length);
            }

            response = (HttpWebResponse)request.GetResponse();

            responseMessage = (new StreamReader(response.GetResponseStream()).ReadToEnd());
			
			File.AppendAllText(AppDomain.CurrentDomain.BaseDirectory + "Log/Notification/push_audit_" + DateTime.Now.ToString("dd-MM-yyyy") + ".txt", clientID + "-->" + countryCode + "-->" + notificationMode + "-->" + notificationEventCode + "-->" + tempID + "-->" + notificationID + "-->" + notificationText + "-->" + responseMessage + Environment.NewLine);

            ResponseXml = "ND001";
        }
        catch (Exception ex)
        {
            Notificationloger.create_Log_File("Send Push", notificationMode, notificationEventCode, tempID, notificationID, ex.Message);
        }

        return ResponseXml;
    }
}
static class Notificationloger
{
    public static void create_Log_File(string Service_Name, string Notification_Mode, string Notification_Event_Code, string Template_Id, string Notification_Id, string Error_Description)
    {
        try
        {
            string error_log_path = AppDomain.CurrentDomain.BaseDirectory + "/Log/Notification/Error";

            DirectoryInfo Nologdir = new DirectoryInfo(error_log_path);

            // Create the directory only if it does not already exist. 
            if (Nologdir.Exists == false)
                Nologdir.Create();

            FileStream fs = new FileStream(error_log_path + "/Error_log_file_of_" + Notification.Client_Id + "_" + Notification.Country_Code + ".csv", FileMode.OpenOrCreate, FileAccess.ReadWrite);
            StreamWriter sw = new StreamWriter(fs);
            StreamReader sr = new StreamReader(fs);
            string str = sr.ReadLine();
            if (str == null)
            {
                sw.WriteLine("SERVICE NAME,COMPANY ID,COUNTRY CODE,NOTIFICATION MODE,NOTIFICATION EVENT CODE,TEMPLATE ID,NOTIFICATION ID,ERRO MESSAGE");
                sw.Flush();
            }
            sw.WriteLine(Service_Name + "," + Notification.Client_Id + "," + Notification.Country_Code + "," + Notification_Mode + "," + Notification_Event_Code + "," + Template_Id + "," + Notification_Id + "," + Error_Description);
            sw.Flush();
            sw.Close();
            fs.Close();

            string err_xml = "<?xml version='1.0' encoding='UTF-8' ?><error_info>";
            err_xml += "<service_name>" + Service_Name + "</service_name>";
            err_xml += "<company_id>" + Notification.Client_Id + "</company_id>";
            err_xml += "<country_code>" + Notification.Country_Code + "</country_code>";
            err_xml += "<notification_mode>" + Notification_Mode + "</notification_mode>";
            err_xml += "<notification_event_code>" + Notification_Event_Code + "</notification_event_code>";
            err_xml += "<template_id>" + Template_Id + "</template_id>";
            err_xml += "<notification_id>" + Notification_Id + "</notification_id>";
            err_xml += "<error_description>" + Error_Description + "</error_description>";
            err_xml += "<domain_url>" + Notification.domain_url + "</domain_url>";
            err_xml += "</error_info>";
            ReportException Rex = new ReportException();
            Rex.send(err_xml);
        }
        catch (Exception es)
        {
            string err_xml = "<?xml version='1.0' encoding='UTF-8' ?><error_info>";
            err_xml += "<service_name>Notificationloger</service_name>";
            err_xml += "<company_id>" + Notification.Client_Id + "</company_id>";
            err_xml += "<country_code>" + Notification.Country_Code + "</country_code>";
            err_xml += "<notification_mode>" + Notification_Mode + "</notification_mode>";
            err_xml += "<notification_event_code>" + Notification_Event_Code + "</notification_event_code>";
            err_xml += "<template_id>" + Template_Id + "</template_id>";
            err_xml += "<notification_id>" + Notification_Id + "</notification_id>";
            err_xml += "<error_description>" + es.Message + "</error_description>";
            err_xml += "<domain_url>" + Notification.domain_url + "</domain_url>";
            err_xml += "</error_info>";
            ReportException Rex = new ReportException();
            Rex.send(err_xml);
        }
    }
}
class ReportException
{
    notification_despatch nd = new notification_despatch();
    public void send(string er_xm)
    {
        string xsl_folder_path = AppDomain.CurrentDomain.BaseDirectory + "/common/components/Notification/Xsl/";
        string html_folder_path = AppDomain.CurrentDomain.BaseDirectory + "/common/components/Notification/Html/";
        if (File.Exists(xsl_folder_path + "Error.xsl"))
        {
            if (File.Exists(html_folder_path + "_" + Notification.Client_Id + "_" + Notification.Country_Code + ".html"))
            {
                string body = nd.ConvertXml_to_Html(er_xm, File.ReadAllText(xsl_folder_path + "Error.xsl"), File.ReadAllText(html_folder_path + "Error_" + Notification.Client_Id + "_" + Notification.Country_Code + ".html"));
                post(body);
            }
            else if (File.Exists(html_folder_path + "_" + Notification.Client_Id + ".html"))
            {
                string body = nd.ConvertXml_to_Html(er_xm, File.ReadAllText(xsl_folder_path + "Error.xsl"), File.ReadAllText(html_folder_path + "Error_" + Notification.Client_Id + ".html"));
                post(body);
            }
            else
            {
                string body = nd.ConvertXml_to_Html(er_xm, File.ReadAllText(xsl_folder_path + "Error.xsl"), File.ReadAllText(html_folder_path + "Error.html"));
                post(body);
            }
        }
    }
    public void post(string bdy)
    {
        MailMessage mail = new MailMessage();
        SmtpClient SmtpServer = new SmtpClient(Notification.System_support_smtp_client);
        try
        {
            if (Notification.System_support_smtp_recipient_emailid != "")
            {
                mail.From = new MailAddress(Notification.System_support_smtp_sender_username);
                mail.To.Add(Notification.System_support_smtp_recipient_emailid);
                mail.Subject = "Notification Error";
                mail.IsBodyHtml = true;
                string htmlBody;
                if (bdy != null)
                    htmlBody = bdy;
                else
                    htmlBody = "";
                mail.Body = htmlBody;
                SmtpServer.Port = Notification.System_support_smtp_port;
                SmtpServer.Credentials = new System.Net.NetworkCredential(Notification.System_support_smtp_sender_username, Notification.System_support_smtp_sender_password);
                SmtpServer.EnableSsl = Notification.System_support_smtp_enable_ssl;
                SmtpServer.Send(mail);
            }
        }
        catch (Exception ex)
        {

        }
    }
}
</script>