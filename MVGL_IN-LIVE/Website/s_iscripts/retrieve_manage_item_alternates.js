//Function to call retrieve_manage_item_alternates service
function executeService_retrieve_manage_item_alternates()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "mservice/retrieve_manage_item_alternates.aspx";
    
    //Prepare retrieve_manage_item_alternates service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_item_alternates());
    
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
            return processServiceResponseData_retrieve_manage_item_alternatesForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_manage_item_alternatesForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_manage_item_alternates service request
function prepareServiceRequestData_retrieve_manage_item_alternates()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
	//Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_item_code>" + getXmlString(slctr_itemcode) + "</p_item_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_variant_code>" + getXmlString(slctr_variantcode) + "</p_item_variant_code>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_manage_item_alternates service response ForIEBrowser
function processServiceResponseData_retrieve_manage_item_alternatesForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // retrive_status =getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_retrieve_status
        }
    }
	item_alternates ="";
	item_alternates +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_item_alternate_xml
            outputparam_detailcount++;
			item_alternates =item_alternates+responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	item_alternates += "</list>";
	return item_alternates;
}

//Function to process retrieve_manage_item_alternates service response ForNonIEBrowser
function processServiceResponseData_retrieve_manage_item_alternatesForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // retrive_status =getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_retrieve_status
        }
    }
	var item_alternates ="";
	item_alternates +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_item_alternate_xml
            outputparam_detailcount++;
			item_alternates =item_alternates+responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	item_alternates += "</list>";
	return item_alternates;
}
