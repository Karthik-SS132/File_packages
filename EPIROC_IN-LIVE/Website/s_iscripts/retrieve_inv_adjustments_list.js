//Function to call retrieve_inv_adjustments_list service
function executeService_retrieve_inv_adjustments_list()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "mservice/retrieve_inv_adjustments_list.aspx";
    
    //Prepare retrieve_inv_adjustments_list service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_inv_adjustments_list());
    
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
            return processServiceResponseData_retrieve_inv_adjustments_listForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_inv_adjustments_listForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_inv_adjustments_list service request
function prepareServiceRequestData_retrieve_inv_adjustments_list()
{
	var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_item_code_filter>" + getXmlString(document.getElementById('item_code').value) + "</p_item_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_variant_code_filter>" + getXmlString(document.getElementById('variant_code').value) + "</p_item_variant_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_txn_type_filter>" + getXmlString(document.getElementById('transaction_type').value) + "</p_txn_type_filter>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
}

//Function to process retrieve_inv_adjustments_list service response ForIEBrowser
function processServiceResponseData_retrieve_inv_adjustments_listForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // retrive_status = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_retrieve_status
        }
    }
	var adj_list="";
	adj_list +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_inv_adjustment_xml
            outputparam_detailcount++;
			adj_list =adj_list+responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	adj_list += "</list>";
	return adj_list;
}

//Function to process retrieve_inv_adjustments_list service response ForNonIEBrowser
function processServiceResponseData_retrieve_inv_adjustments_listForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //retrive_status = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_retrieve_status
        }
    }
	var adj_list="";
	adj_list +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_inv_adjustment_xml
            outputparam_detailcount++;
			adj_list =adj_list+responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	adj_list += "</list>";
	return adj_list;
}
