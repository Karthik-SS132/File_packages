//Function to call retrieve_inv_adjustment_details service
function executeService_retrieve_inv_adjustment_details()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() +"mservice/retrieve_inv_adjustment_details.aspx";
    
    //Prepare retrieve_inv_adjustment_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_inv_adjustment_details());
    
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
           return processServiceResponseData_retrieve_inv_adjustment_detailsForIEBrowser(responseXML);
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
           return processServiceResponseData_retrieve_inv_adjustment_detailsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_inv_adjustment_details service request
function prepareServiceRequestData_retrieve_inv_adjustment_details()
{
	var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_txn_document_no>" + getXmlString(slctr_doc_no) + "</p_txn_document_no>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
}

//Function to process retrieve_inv_adjustment_details service response ForIEBrowser
function processServiceResponseData_retrieve_inv_adjustment_detailsForIEBrowser(xmlDoc)
{
	var inv_adjustment_details=new Object();
	var adj_header_list="";
	adj_header_list +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_inv_adj_header_xml
           //retrive_status=getString(responseXMLNode[toplevelChildi].childNodes[1].text); // p_retrieve_status
		   adj_header_list =adj_header_list+responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	adj_header_list += "</list>";
	
	var adj_details_list="";
	adj_details_list +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_inv_adj_detail_xml
            outputparam_detailcount++;
			adj_header_list =adj_header_list+responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	adj_details_list += "</list>";
	inv_adjustment_details={header:adj_header_list,detail:adj_details_list};
	return inv_adjustment_details;
}

//Function to process retrieve_inv_adjustment_details service response ForNonIEBrowser
function processServiceResponseData_retrieve_inv_adjustment_detailsForNonIEBrowser(xmlDoc)
{
	var inv_adjustment_details=new Object();
	var adj_header_list="";
	adj_header_list +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_inv_adj_header_xml
           //retrive_status=getString(responseXMLNode[toplevelChildi].childNodes[1].textContent); // p_retrieve_status
		   adj_header_list =adj_header_list+responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	adj_header_list += "</list>";
	
	var adj_details_list="";
	adj_details_list +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_inv_adj_detail_xml
            outputparam_detailcount++;
			adj_details_list =adj_details_list+responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	adj_details_list += "</list>";
	inv_adjustment_details={header:adj_header_list,detail:adj_details_list};
	return inv_adjustment_details;
}
