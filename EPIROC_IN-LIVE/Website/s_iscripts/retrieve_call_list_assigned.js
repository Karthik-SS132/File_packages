/* 
 * This file contains invocation code snippets for executing the service retrieve_call_list_assigned. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_call_list_assigned 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_call_list_assigned
function executeService_retrieve_call_list_assigned()
{
    var targetURL = getWebserverpath() + "mservice/retrieve_call_list_assigned.aspx";
    
    //Prepare retrieve_call_list_assigned service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_call_list_assigned());
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Output contains error
        var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
        var errorNumber = "", errorDescription = "";
        errorNumber = exceptionNode.childNodes[0].lastChild.nodeValue;
        errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue;
        if (errorNumber != "")
            errorNumber += ": ";
        alert(errorNumber + errorDescription);
        return '1';
    }
    else
    {
        return processServiceResponseData_retrieve_call_list_assigned(responseXML);
    }
    return '1';
}

//Code for preparing input data for the service retrieve_call_list_assigned
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_call_list_assigned()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_inputparam_xml>"+getXmlString(call_list_inputparam_xml)+"</p_inputparam_xml>";  // Unicode string
	serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_call_list_assigned
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table no need to have as many rows as retrieved in the list segment; rows will be added dynamically 
     to the existing table
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_call_list_assigned(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var call_value = new Object();
	var call_details ="<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";
	var retrieve_status = '';
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
			if(responseXMLNode[toplevelChildi].childNodes[0].hasChildNodes() == true)
			{
				retrieve_status = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_retrieve_status
			}
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
			if(responseXMLNode[toplevelChildi].childNodes[0].hasChildNodes() == true)
			{
				call_details += "<call>"+ responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue +"</call>"; // p_call_list_xml
			}
        }
    }
	call_details += "</list>";
	call_value = {header:retrieve_status,detail:call_details};
	return call_value;
}