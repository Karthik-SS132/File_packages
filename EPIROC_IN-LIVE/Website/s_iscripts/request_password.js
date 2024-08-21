//Function to call request_password service
function executeService_request_password()
{
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "security/request_password.aspx";
    
    //Prepare request_password service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_request_password());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
			alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
			return "0";
        }
        else
        {
            return processServiceResponseData_request_passwordForIEBrowser(responseXML);
        }
    }
    else if (window.XMLHttpRequest)  //Code for other browsers like FIREFOX/OPERA
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].textContent 
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].textContent 
			alert(responseXML.documentElement.childNodes[0].childNodes[1].textContent);
			return "0";
        }
        else
        {
            return processServiceResponseData_request_passwordForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare request_password service request
function prepareServiceRequestData_request_password()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + "<context>";
    serviceDetails = serviceDetails + "<sessionId>" + getXmlString("7e9c274d-1c4b-4234-9eec-4f90971f998b") + "</sessionId>"; // UniqueIdentifier string
    serviceDetails = serviceDetails + "<userId>" + getXmlString("signin") + "</userId>"; // Unicode string
    serviceDetails = serviceDetails + "<client_id>" + getXmlString(client_id) + "</client_id>"; // String
    serviceDetails = serviceDetails + "<locale_id>" + getXmlString("en-us") + "</locale_id>"; // String
    serviceDetails = serviceDetails + "<country_code>" + getXmlString("in") + "</country_code>"; // String
     
    //Processing input_param segment
    serviceDetails = serviceDetails + "<input_param>"
    serviceDetails = serviceDetails + "<p_req_company_id>" + getXmlString(client_id) + "</p_req_company_id>";  // String
    serviceDetails = serviceDetails + "<p_req_user_id>" + getXmlString(user_id) + "</p_req_user_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_req_country_code>" + getXmlString(country_id) + "</p_req_country_code>";  // String
    serviceDetails = serviceDetails + "<p_req_email_id>" + getXmlString(e_mail_id) + "</p_req_email_id>";  // Unicode string
    serviceDetails = serviceDetails + "</input_param>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process request_password service response ForIEBrowser
function processServiceResponseData_request_passwordForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	alert('Password has been sent to your mail.');
	return "1";
}

//Function to process request_password service response ForNonIEBrowser
function processServiceResponseData_request_passwordForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	alert('Password has been sent to your mail.');
	return "1";
}
