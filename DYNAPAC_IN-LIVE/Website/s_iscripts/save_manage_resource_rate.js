//Function to call save_manage_resource_rate service
function executeService_save_manage_resource_rate()
{
    var targetURL = getWebserverpath() + "/mservice/save_manage_resource_rate.aspx";
    
    //Prepare save_manage_resource_rate service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_resource_rate());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
            return "1";
        }
        else
        {
            return processServiceResponseData_save_manage_resource_rateForIEBrowser(responseXML);
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
            return "1";
        }
        else
        {
            return processServiceResponseData_save_manage_resource_rateForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_manage_resource_rate service request
function prepareServiceRequestData_save_manage_resource_rate()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_resource_category>" + getXmlString(res_category.value()) + "</p_resource_category>";  // Unicode string
    serviceDetails = serviceDetails + "<p_resource_code>" + getXmlString(res_code_cb.value()) + "</p_resource_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_uom>" + getXmlString(document.getElementById('res_uom').value) + "</p_uom>";  // String
    serviceDetails = serviceDetails + "<p_std_rate>" + res_std_rate.value() + "</p_std_rate>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_currency_code>" + getXmlString(currency.value()) + "</p_currency_code>";  // String
    serviceDetails = serviceDetails + "<p_rec_timestamp>" + getXmlString("7e9c274d-1c4b-4234-9eec-4f90971f998b") + "</p_rec_timestamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(edit_type) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process save_manage_resource_rate service response ForIEBrowser

function processServiceResponseData_save_manage_resource_rateForIEBrowser(xmlDoc)
{
	var update_status_task_code="";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            update_status_task_code =responseXMLNode[toplevelChildi].childNodes[0].text; // p_update_status
        }
    }
	return update_status_task_code;
}

//Function to process save_manage_resource_rate service response ForNonIEBrowser

function processServiceResponseData_save_manage_resource_rateForNonIEBrowser(xmlDoc)
{
	var update_status_task_code="";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            update_status_task_code =responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_update_status
        }
    }
	return update_status_task_code;
}
