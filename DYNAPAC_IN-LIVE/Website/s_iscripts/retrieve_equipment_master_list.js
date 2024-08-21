//Function to call retrieve_equipment_master_list service
function executeService_retrieve_equipment_master_list()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "mservice/retrieve_equipment_master_list.aspx";
    
    //Prepare retrieve_equipment_master_list service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_equipment_master_list());
    
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
            return processServiceResponseData_retrieve_equipment_master_listForIEBrowser(responseXML);
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
           return processServiceResponseData_retrieve_equipment_master_listForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_equipment_master_list service request
function prepareServiceRequestData_retrieve_equipment_master_list()
{
	var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
}

//Function to process retrieve_equipment_master_list service response ForIEBrowser
function processServiceResponseData_retrieve_equipment_master_listForIEBrowser(xmlDoc)
{
var eq_list = "";
eq_list += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
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
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_equipment_list_xml
			//outputparam_detailcount++;
			eq_list += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	eq_list += "</list>";
    return eq_list;
}

//Function to process retrieve_equipment_master_list service response ForNonIEBrowser
function processServiceResponseData_retrieve_equipment_master_listForNonIEBrowser(xmlDoc)
{
var eq_list = "";
eq_list += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
   // var outputparam_detailcount = 1;
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
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_equipment_list_xml
            //outputparam_detailcount++;
			eq_list += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	eq_list += "</list>";
    return eq_list;
}
