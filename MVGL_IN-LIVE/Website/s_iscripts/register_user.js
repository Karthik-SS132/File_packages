//Function to call register_user service
function executeService_register_user()
{
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "security/register_user.aspx";
    
    //Prepare register_user service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_register_user());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
        }
        else
        {
            processServiceResponseData_register_userForIEBrowser(responseXML);
        }
    }
    else if (window.XMLHttpRequest)  //Code for other browsers like FIREFOX/OPERA
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].textContent 
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].textContent 
        }
        else
        {
            processServiceResponseData_register_userForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare register_user service request
function prepareServiceRequestData_register_user()
{
 var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	   
    //Processing register_request segment
    serviceDetails = serviceDetails + "<register_request>"
    serviceDetails = serviceDetails + "<p_company_id>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_company_id>";  // String
    serviceDetails = serviceDetails + "<p_user_id>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_user_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_password>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_password>";  // Unicode string
    serviceDetails = serviceDetails + "</register_request>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process register_user service response ForIEBrowser
function processServiceResponseData_register_userForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
}

//Function to process register_user service response ForNonIEBrowser
function processServiceResponseData_register_userForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
}
