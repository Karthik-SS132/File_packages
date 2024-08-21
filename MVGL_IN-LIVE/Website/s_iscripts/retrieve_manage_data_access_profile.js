/* 
 * This file contains invocation code snippets for executing the service retrieve_manage_data_access_profile. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_manage_data_access_profile 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_manage_data_access_profile
function executeService_retrieve_manage_data_access_profile()
{
    var targetURL = getWebserverpath() + "common_modules/retrieve_manage_data_access_profile.aspx";
    
    //Prepare retrieve_manage_data_access_profile service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_data_access_profile());
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return '1';
    }
    else
    {
        return processServiceResponseData_retrieve_manage_data_access_profile(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_manage_data_access_profile
function prepareServiceRequestData_retrieve_manage_data_access_profile()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_access_for_event>" + access_for_event + "</p_access_for_event>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_manage_data_access_profile
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
function processServiceResponseData_retrieve_manage_data_access_profile(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	var data_access_profile_list = new Object();
	var retrieve_status = "";
	var value_details = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";	
    //var outputparam_detailcount = 1;
   // var first_outputparam_detail_item = true;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_retrieve_status
			if(responseXMLNode[toplevelChildi].childNodes[0].lastChild != null)
			{
				retrieve_status = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
			}
			else
			{
				retrieve_status = '';
			}
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //Delete existing table rows
            /*if (first_outputparam_detail_item) {
                deleteTableRows(document.getElementById('USER CONTROL'));
                first_outputparam_detail_item = false;
            }
            createTableRows(1, document.getElementById('USER CONTROL').rows[0].cells.length, document.getElementById('USER CONTROL'));
            
            document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_data_access_profile_xml
            outputparam_detailcount++;*/
			value_details += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
        }
    }
	value_details += "</list>";
	data_access_profile_list = {header:retrieve_status,detail:value_details};
	return data_access_profile_list;
}
