//Function to call retrieve_item_master_list service
function executeService_retrieve_item_master_list()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "mservice/retrieve_item_master_list.aspx";
    
    //Prepare retrieve_item_master_list service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_item_master_list());
    
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
            return processServiceResponseData_retrieve_item_master_listForIEBrowser(responseXML);
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
           return processServiceResponseData_retrieve_item_master_listForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_item_master_list service request
function prepareServiceRequestData_retrieve_item_master_list()
{
	var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
	//Processing inputparam segment
	serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_item_type_filter>" + getXmlString(list_of_item_type.value()) + "</p_item_type_filter>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
}

//Function to process retrieve_item_master_list service response ForIEBrowser
function processServiceResponseData_retrieve_item_master_listForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_retrieve_status
        }
    }
	var item_details="";
	item_details +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_item_list_xml
            outputparam_detailcount++;
			item_details =item_details+responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	item_details += "</list>";
	return item_details;
}

//Function to process retrieve_item_master_list service response ForNonIEBrowser
function processServiceResponseData_retrieve_item_master_listForNonIEBrowser(xmlDoc)
{	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
			// document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_retrieve_status
        }
    }
	
	var item_details="";
	item_details +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_item_list_xml
            outputparam_detailcount++;
			item_details =item_details+responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	item_details += "</list>";
	return item_details;
}
