//Function to call retrieve_manage_task_code service
function executeService_retrieve_manage_task_code()
{
	var retVal = isValidSession();
	 
	if ( retVal == 1)
	{
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	}
    var targetURL =  getWebserverpath() + "/common_modules/retrieve_manage_task_code.aspx";
    
    //Prepare retrieve_manage_task_code service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_task_code());
    
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
            return processServiceResponseData_retrieve_manage_task_codeForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_manage_task_codeForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_manage_task_code service request
function prepareServiceRequestData_retrieve_manage_task_code()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_task_code_search_filter>" + getXmlString(document.getElementById('task_code').value) + "</p_task_code_search_filter>";  // String
    serviceDetails = serviceDetails + "<p_task_description_search_filter>" + getXmlString(document.getElementById('task_desc').value) + "</p_task_description_search_filter>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_manage_task_code service response ForIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_manage_task_codeForIEBrowser(xmlDoc)
{
	var manage_task_code_list="";
	manage_task_code_list +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_taskcode_xml
            outputparam_detailcount++;
			manage_task_code_list =manage_task_code_list+responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	manage_task_code_list += "</list>";
	return manage_task_code_list;
}

//Function to process retrieve_manage_task_code service response ForNonIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_manage_task_codeForNonIEBrowser(xmlDoc)
{
	var manage_task_code_list="";
	manage_task_code_list +="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_taskcode_xml
            outputparam_detailcount++;
			manage_task_code_list =manage_task_code_list+responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	manage_task_code_list += "</list>";
	//alert(manage_task_code_list);
	return manage_task_code_list;
}
