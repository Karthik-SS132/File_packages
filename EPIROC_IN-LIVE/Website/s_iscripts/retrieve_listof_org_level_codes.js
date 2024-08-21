/* 
 * This file contains invocation code snippets for executing the service retrieve_listof_org_level_codes. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_listof_org_level_codes 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_listof_org_level_codes
function executeService_retrieve_listof_org_level_codes()
{
    var targetURL = getWebserverpath() + "common_modules/retrieve_listof_org_level_codes.aspx";
    
    //Prepare retrieve_listof_org_level_codes service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_org_level_codes());
    
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
        return processServiceResponseData_retrieve_listof_org_level_codes(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_listof_org_level_codes
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the, user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_listof_org_level_codes()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_level_id>" + org_entity_type + "</p_level_id>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_listof_org_level_codes
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
function processServiceResponseData_retrieve_listof_org_level_codes(xmlDoc)
{
	var code_list = [];
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparamcount = 1;
	var counter=0;
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
			org_lvlcodes_data.push({
			level_code:responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,
			level_code_desc:responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue,
			value:responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,
			text:responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue
			});
			list_of_org_entities.push(
			{
				level_code_desc : responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue,
				level_code : responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue
			});
			org_lvl_code_arr[counter]=new Array();
			org_lvl_code_arr[counter][0]=responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
			org_lvl_code_arr[counter][1]=responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue;
			counter=counter+1;
        }
    }
	return code_list;
}
