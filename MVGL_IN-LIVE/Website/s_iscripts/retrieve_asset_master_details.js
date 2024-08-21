//Function to call retrieve_asset_master_details service
function executeService_retrieve_asset_master_details()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() +"mservice/retrieve_asset_master_details.aspx";
    
    //Prepare retrieve_asset_master_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_asset_master_details());
    
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
           return processServiceResponseData_retrieve_asset_master_detailsForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_asset_master_detailsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_asset_master_details service request
function prepareServiceRequestData_retrieve_asset_master_details()
{
	var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_asset_id>" + getXmlString(slctr_tempid) + "</p_asset_id>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
}

//Function to process retrieve_asset_master_details service response ForIEBrowser
function processServiceResponseData_retrieve_asset_master_detailsForIEBrowser(xmlDoc)
{	
	var asset_master_details="";
	asset_master_details+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_asset_master_detail_xml
			asset_master_details=asset_master_details+responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	asset_master_details += "</list>";
	return asset_master_details;
}

//Function to process retrieve_asset_master_details service response ForNonIEBrowser
function processServiceResponseData_retrieve_asset_master_detailsForNonIEBrowser(xmlDoc)
{	
	var asset_master_details="";
	asset_master_details+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_asset_master_detail_xml
			asset_master_details=asset_master_details+responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	asset_master_details += "</list>";
	return asset_master_details;
}
