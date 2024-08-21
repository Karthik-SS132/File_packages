//Function to call save_manage_file_detail service
function executeService_save_manage_file_detail()
{

    var retVal = isValidSession();
     
     if ( retVal == 1)
     {
        alert('Invalid Session: You have not logged into the system');
        return '1';
     }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/save_manage_file_detail.aspx";
    
    //Prepare save_manage_file_detail service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_file_detail());
    
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
            return processServiceResponseData_save_manage_file_detailForIEBrowser(responseXML);
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
            return processServiceResponseData_save_manage_file_detailForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_manage_file_detail service request
function prepareServiceRequestData_save_manage_file_detail()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
	serviceDetails = serviceDetails + "<p_file_id>" + getXmlString(p_file_id) + "</p_file_id>";  // Unicode string
	serviceDetails = serviceDetails + "<p_file_name>" + getXmlString(p_file_name) + "</p_file_name>";  // Unicode string
    serviceDetails = serviceDetails + "<p_file_category>" + getXmlString(p_file_category) + "</p_file_category>";  // String
    serviceDetails = serviceDetails + "<p_file_type>" + getXmlString(p_file_type) + "</p_file_type>";  // String
	serviceDetails = serviceDetails + "<p_file_path>" + getXmlString(p_file_path) + "</p_file_path>";  // Unicode string
	serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    
    return serviceDetails;
}

//Function to process save_manage_file_detail service response ForIEBrowser
function processServiceResponseData_save_manage_file_detailForIEBrowser(xmlDoc)
{
    var save_status = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            if(responseXMLNode[toplevelChildi].childNodes[0].text=="SP010") // p_update_status
            {
                alert('Manage File details saved successfully');
                save_status=responseXMLNode[toplevelChildi].childNodes[0].text;
            }
            else
            {
                alert('Saving Manage File details failed');
            }
        }
    }
	return save_status;
}

//Function to process save_manage_file_detail service response ForNonIEBrowser
function processServiceResponseData_save_manage_file_detailForNonIEBrowser(xmlDoc)
{
    var save_status = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            if(responseXMLNode[toplevelChildi].childNodes[0].textContent=="SP010") // p_update_status
            {
                alert('Manage File details saved successfully');
                save_status=responseXMLNode[toplevelChildi].childNodes[0].textContent;
            }
            else
            {
                alert('Saving Manage File details failed');
            }
        }
    }
	return save_status;
}
