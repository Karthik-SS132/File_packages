//Function to call save_manage_equipment_prevmrules_fcy service
function executeService_save_manage_equipment_prevmrules_fcy()
{
    var targetURL = getWebserverpath() + "/mservice/save_manage_equipment_prevmrules_fcy.aspx";
    
    //Prepare save_manage_equipment_prevmrules_fcy service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_equipment_prevmrules_fcy());
    
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
            processServiceResponseData_save_manage_equipment_prevmrules_fcyForIEBrowser(responseXML);
            return true;
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
            processServiceResponseData_save_manage_equipment_prevmrules_fcyForNonIEBrowser(responseXML);
            return true;
        }
    }
    return false;
}

//Function to prepare save_manage_equipment_prevmrules_fcy service request
function prepareServiceRequestData_save_manage_equipment_prevmrules_fcy()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_prevm_frequency_uom>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_prevm_frequency_uom>";  // String
    serviceDetails = serviceDetails + "<p_prevm_frequency_value>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_prevm_frequency_value>";  // Decimal: Total no of digits - 5; No of digits after decimal point - 0
    serviceDetails = serviceDetails + "<p_mprofile_template_id>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_mprofile_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process save_manage_equipment_prevmrules_fcy service response ForIEBrowser

function processServiceResponseData_save_manage_equipment_prevmrules_fcyForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_update_status
        }
    }
}

//Function to process save_manage_equipment_prevmrules_fcy service response ForNonIEBrowser

function processServiceResponseData_save_manage_equipment_prevmrules_fcyForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_update_status
        }
    }
}
