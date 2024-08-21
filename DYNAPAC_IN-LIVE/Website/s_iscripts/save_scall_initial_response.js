//Function to call save_scall_initial_response service
function executeService_save_scall_initial_response()
{
	var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    var targetURL = getWebserverpath() + "/mservice/save_scall_initial_response.aspx";
    
    //Prepare save_scall_initial_response service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_scall_initial_response());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
            return '1';
        }
        else
        {
            return processServiceResponseData_save_scall_initial_responseForIEBrowser(responseXML);
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
            return '1';
        }
        else
        {
            return processServiceResponseData_save_scall_initial_responseForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_scall_initial_response service request
function prepareServiceRequestData_save_scall_initial_response()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_servicecall_no>" + getXmlString(selected_scall_no) + "</p_servicecall_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_initial_response>" + getXmlString(i_response) + "</p_initial_response>";  // Unicode string
    serviceDetails = serviceDetails + "<p_initial_response_date>" + getXmlString(mod_ires_date.toString()) + "</p_initial_response_date>";  // String
    serviceDetails = serviceDetails + "<p_initial_response_hour>" + getXmlString(mod_ires_hour.toString()) + "</p_initial_response_hour>";  // String
    serviceDetails = serviceDetails + "<p_initial_response_minute>" + getXmlString(mod_ires_min.toString()) + "</p_initial_response_minute>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process save_scall_initial_response service response ForIEBrowser
function processServiceResponseData_save_scall_initial_responseForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].text == "SP001")
			{
				alert('Initial Response sent successfully.');
			}
			else
			{
				alert('Sending Initial Response failed.');
			}
        }
    }
}

//Function to process save_scall_initial_response service response ForNonIEBrowser
function processServiceResponseData_save_scall_initial_responseForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].textContent == "SP001")
			{
				alert('Initial Response sent successfully.');
			}
			else
			{
				alert('Sending Initial Response failed.');
			}
        }
    }
}
