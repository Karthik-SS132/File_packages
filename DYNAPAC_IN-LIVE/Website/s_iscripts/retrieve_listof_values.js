/* 
 * This file contains invocation code snippets for executing the service retrieve_listof_values. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_listof_values 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_listof_values
function executeService_retrieve_listof_values(retrieve_listof_values_object)
{
    var targetURL = getWebserverpath() + "common_modules/retrieve_listof_values.aspx";
    
    //Prepare retrieve_listof_values service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_values(retrieve_listof_values_object));
    
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
        return processServiceResponseData_retrieve_listof_values(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_listof_values
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_listof_values(retrieve_listof_values_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_lov_code>" + retrieve_listof_values_object.p_lov_code + "</p_lov_code>";  // String
    serviceDetails = serviceDetails + "<p_search_field_1>" + retrieve_listof_values_object.p_search_field_1 + "</p_search_field_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_search_field_2>" + retrieve_listof_values_object.p_search_field_2 + "</p_search_field_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_search_field_3>" + retrieve_listof_values_object.p_search_field_3 + "</p_search_field_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_search_field_4>" + retrieve_listof_values_object.p_search_field_4 + "</p_search_field_4>";  // Unicode string
    serviceDetails = serviceDetails + "<p_search_field_5>" + retrieve_listof_values_object.p_search_field_5 + "</p_search_field_5>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_listof_values
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
function processServiceResponseData_retrieve_listof_values(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var list_of_values = [];
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {           
            var response_object = {};
			if(responseXMLNode[toplevelChildi].childNodes[0].hasChildNodes())
			{
				response_object.p_value_field_1 = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
			}
			else
			{
				response_object.p_value_field_1 = "";
			}
			if(responseXMLNode[toplevelChildi].childNodes[1].hasChildNodes())
			{
				response_object.p_value_field_3 = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue;
			}
			else
			{
				response_object.p_value_field_3 = "";
			}
			if(responseXMLNode[toplevelChildi].childNodes[2].hasChildNodes())
			{
				response_object.p_value_field_2 = responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue;
			}
			else
			{
				response_object.p_value_field_2 = "";
			}
			if(responseXMLNode[toplevelChildi].childNodes[3].hasChildNodes())
			{
				response_object.p_description_field_1 = responseXMLNode[toplevelChildi].childNodes[3].lastChild.nodeValue;
			}
			else
			{
				response_object.p_description_field_1 = "";
			}
			if(responseXMLNode[toplevelChildi].childNodes[4].hasChildNodes())
			{
				response_object.p_description_field_2 = responseXMLNode[toplevelChildi].childNodes[4].lastChild.nodeValue;
			}
			else
			{
				response_object.p_description_field_2 = "";
			}
			if(responseXMLNode[toplevelChildi].childNodes[5].hasChildNodes())
			{
				response_object.p_description_field_3 = responseXMLNode[toplevelChildi].childNodes[5].lastChild.nodeValue;
			}
			else
			{
				response_object.p_description_field_3 = "";
			}
			list_of_values.push(response_object);
        }
    }
	return list_of_values;
}
