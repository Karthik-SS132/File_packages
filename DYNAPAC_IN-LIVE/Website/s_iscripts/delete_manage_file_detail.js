//Function to call delete_manage_file_detail service
function executeService_delete_manage_file_detail()
{
    var retVal = isValidSession();
     
     if ( retVal == 1)
     {
        alert('Invalid Session: You have not logged into the system');
        return '1';
     }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "common_modules/delete_manage_file_detail.aspx";
    
    //Prepare delete_manage_file_detail service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_delete_manage_file_detail());
    
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
           return processServiceResponseData_delete_manage_file_detailForIEBrowser(responseXML);
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
           return processServiceResponseData_delete_manage_file_detailForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare delete_manage_file_detail service request
function prepareServiceRequestData_delete_manage_file_detail()
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

//Function to process delete_manage_file_detail service response ForIEBrowser
function processServiceResponseData_delete_manage_file_detailForIEBrowser(xmlDoc)
{
    var delete_status="";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_update_status
            if (responseXMLNode[toplevelChildi].childNodes[0].text == "S0010") 
                {
                    delete_status=responseXMLNode[toplevelChildi].childNodes[0].text;
                }
                else
                {
                    alert('file deletion failed');
                }
        }
    }
	return delete_status;
}

//Function to process delete_manage_file_detail service response ForNonIEBrowser
function processServiceResponseData_delete_manage_file_detailForNonIEBrowser(xmlDoc)
{
    var delete_status="";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_update_status
            if (responseXMLNode[toplevelChildi].childNodes[0].textContent == "S0010")
             {
                delete_status=responseXMLNode[toplevelChildi].childNodes[0].textContent;
             }
             else
             {
                alert('file deletion failed');
             }
        }
    }
	return delete_status;
}
