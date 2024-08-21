/* 
 * This file contains invocation code snippets for executing the service retrieve_manage_call_register_details. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_manage_call_register_details 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_manage_call_register_details
function executeService_retrieve_manage_call_register_details(retrieve_manage_call_register_details_object)
{
    var targetURL = getWebserverpath() + "mservice/retrieve_manage_call_register_details.aspx";
    
    //Prepare retrieve_manage_call_register_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_call_register_details(retrieve_manage_call_register_details_object));
    
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
        return false;
    }
    else
    {
        return processServiceResponseData_retrieve_manage_call_register_details(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_manage_call_register_details
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_manage_call_register_details(retrieve_manage_call_register_details_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_call_ref_no>" + retrieve_manage_call_register_details_object.p_call_ref_no + "</p_call_ref_no>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_manage_call_register_details
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
function processServiceResponseData_retrieve_manage_call_register_details(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detail1count = 1;
    var first_outputparam_detail1_item = true;
    var outputparam_detail2count = 1;
    var first_outputparam_detail2_item = true;
	var returnValue = {};
	returnValue.p_call_register_detail_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail1")
        {            
            returnValue.p_call_register_detail_xml += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_call_register_detail_xml
            outputparam_detail1count++;
        }
    }
	returnValue.p_call_register_detail_xml += "</list>";
	return returnValue;
}
