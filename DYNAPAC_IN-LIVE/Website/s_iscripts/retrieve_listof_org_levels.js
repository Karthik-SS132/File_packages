/* 
 * This file contains invocation code snippets for executing the service retrieve_listof_org_levels. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_listof_org_levels 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_listof_org_levels
function executeService_retrieve_listof_org_levels()
{
    var targetURL = getWebserverpath() + "common_modules/retrieve_listof_org_levels.aspx";
    
    //Prepare retrieve_listof_org_levels service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_org_levels());
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return false;
    }
    else
    {
        return processServiceResponseData_retrieve_listof_org_levels(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_listof_org_levels
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_listof_org_levels()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_listof_org_levels
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
function processServiceResponseData_retrieve_listof_org_levels(xmlDoc)
{
	var code_list = [];
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparamcount = 1;
    var first_outputparam_item = true;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {       
			code_list.push(
			{
				text : responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue,
				value : responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue
			});
            outputparamcount++;
			
			org_levels_data.push(
			{
				level_name : responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue,
				level_id : responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue
			});
        }
    }
	return code_list;
}
