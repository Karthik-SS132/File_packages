//Function to call retrieve_manage_file_detail service
function executeService_retrieve_manage_file_detail()
{
    var retVal = isValidSession();
     
     if ( retVal == 1)
     {
        alert('Invalid Session: You have not logged into the system');
        return '1';
     }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "common_modules/retrieve_manage_file_detail.aspx";
    
    //Prepare retrieve_manage_file_detail service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_file_detail());
    
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
            return processServiceResponseData_retrieve_manage_file_detailForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_manage_file_detailForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_manage_file_detail service request
function prepareServiceRequestData_retrieve_manage_file_detail()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_file_id>" + getXmlString(slctdr_model["file_id"]) + "</p_file_id>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    
    return serviceDetails;
}

//Function to process retrieve_manage_file_detail service response ForIEBrowser
function processServiceResponseData_retrieve_manage_file_detailForIEBrowser(xmlDoc)
{
    var manage_file_details="";
    manage_file_details+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_file_detail_xml
            outputparam_detailcount++;
            manage_file_details=manage_file_details+responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
    manage_file_details += "</list>";
    return manage_file_details;
}

//Function to process retrieve_manage_file_detail service response ForNonIEBrowser
function processServiceResponseData_retrieve_manage_file_detailForNonIEBrowser(xmlDoc)
{
    var manage_file_details="";
    manage_file_details+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_file_detail_xml
            outputparam_detailcount++;
            manage_file_details=manage_file_details+responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
    manage_file_details += "</list>";
    return manage_file_details;
}
