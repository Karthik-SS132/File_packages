//Function to call validate_key_field service
function executeService_validate_key_field()
{
    var targetURL = getWebserverpath() + "common_modules/validate_key_field.aspx";
    
    //Prepare validate_key_field service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_validate_key_field());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
            return false;
        }
        else
        {
            return processServiceResponseData_validate_key_fieldForIEBrowser(responseXML);
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
            return false;
        }
        else
        {
            return processServiceResponseData_validate_key_fieldForNonIEBrowser(responseXML);
        }
    }
    return false;
}

//Function to prepare validate_key_field service request
function prepareServiceRequestData_validate_key_field()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_screen_name>"+screenname+"</p_screen_name>";  // String
    serviceDetails = serviceDetails + "<p_validation_field_1>" + getXmlString(validation_field_1) + "</p_validation_field_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_2>" + getXmlString(validation_field_2) + "</p_validation_field_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_3>" + getXmlString(validation_field_3) + "</p_validation_field_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_4>" + getXmlString(validation_field_4) + "</p_validation_field_4>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_5>" + getXmlString(validation_field_5) + "</p_validation_field_5>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_6>" + getXmlString(validation_field_6) + "</p_validation_field_6>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_7>" + getXmlString(validation_field_7) + "</p_validation_field_7>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_8>" + getXmlString(validation_field_8) + "</p_validation_field_8>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_9>" + getXmlString(validation_field_9) + "</p_validation_field_9>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_10>" + getXmlString(validation_field_10) + "</p_validation_field_10>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process validate_key_field service response ForIEBrowser

function processServiceResponseData_validate_key_fieldForIEBrowser(xmlDoc)
{
	var returnValue = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_valid_ind
			task_valid_ind = responseXMLNode[toplevelChildi].childNodes[0].text;
			returnValue = responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	return returnValue;
}

//Function to process validate_key_field service response ForNonIEBrowser

function processServiceResponseData_validate_key_fieldForNonIEBrowser(xmlDoc)
{
	var returnValue = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_valid_ind
			task_valid_ind = responseXMLNode[toplevelChildi].childNodes[0].textContent;
			returnValue = responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	return returnValue;
}
