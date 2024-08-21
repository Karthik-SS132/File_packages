//Function to call signout_user service
function executeService_signout_user()
{
	var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return 1;
	 }

    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "security/signout_user.aspx";
    
    //Prepare signout_user service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_signout_user());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
			alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
			return 1;
        }
        else
        {
            processServiceResponseData_signout_userForIEBrowser(responseXML);
			return 0;
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
			return 1;
        }
        else
        {
            processServiceResponseData_signout_userForNonIEBrowser(responseXML);
			return 0;
        }
    }
}

//Function to prepare signout_user service request
function prepareServiceRequestData_signout_user()
{
	var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_logout_date>" + logout_date + "</p_logout_date>";  // String
    serviceDetails = serviceDetails + "<p_logout_hour>" + logout_hour + "</p_logout_hour>";  // String
    serviceDetails = serviceDetails + "<p_logout_minute>" + logout_minute + "</p_logout_minute>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process signout_user service response ForIEBrowser
function processServiceResponseData_signout_userForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
}

//Function to process signout_user service response ForNonIEBrowser
function processServiceResponseData_signout_userForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
}
