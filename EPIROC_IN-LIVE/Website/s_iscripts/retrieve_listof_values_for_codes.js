/* 
 * This file contains invocation code snippets for executing the service retrieve_listof_values_for_codes. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_listof_values_for_codes 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_listof_values_for_codes
function executeService_retrieve_listof_values_for_codes()
{
    var targetURL =  getWebserverpath() + "common_modules/retrieve_listof_values_for_codes.aspx";
    
    //Prepare retrieve_listof_values_for_codes service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_values_for_codes());
    
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
        return processServiceResponseData_retrieve_listof_values_for_codes(responseXML);
    }
   // return false;
}

//Code for preparing input data for the service retrieve_listof_values_for_codes
function prepareServiceRequestData_retrieve_listof_values_for_codes()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_lov_code_type>" + getXmlString(code_type) + "</p_lov_code_type>";  // String
	serviceDetails = serviceDetails + "<p_search_field_1>" + getXmlString(search_field_1) + "</p_search_field_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_search_field_2>" + getXmlString(search_field_2) + "</p_search_field_2>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_listof_values_for_codes
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
function processServiceResponseData_retrieve_listof_values_for_codes(xmlDoc)
{
	var code_list = [];
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparamcount = 1;
    var firstoutputparam = true;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //Delete existing table rows
            if (firstoutputparam)
            {
               // deleteTableRows(document.getElementById('USER CONTROL'));
                firstoutputparam = false;
            }
           // createTableRows(1, document.getElementById('USER CONTROL').rows[0].cells.length, document.getElementById('USER CONTROL'));
            
           // document.getElementById('USER CONTROL').rows[outputparamcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_code_value
           // document.getElementById('USER CONTROL').rows[outputparamcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_code_value_description
            //outputparamcount++;
			list_of_codes.push({
				code:responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,
				code1:responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,
				description:responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue,
				value:responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,
				text:responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue
			});
			code_list.push({
				code:responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,
				description:responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue,
				value:responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,
				text:responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue
			});
        }
    }
	return code_list;
}
