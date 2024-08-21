/* 
 * This file contains invocation code snippets for executing the service report_scall_metrics. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service report_scall_metrics 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service report_scall_metrics
function executeService_report_scall_metrics()
{
    var targetURL =  getWebserverpath() + "/mservice/report_scall_metrics.aspx";
    
    //Prepare report_scall_metrics service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_report_scall_metrics());
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return "1";
    }
    else
    {
       return processServiceResponseData_report_scall_metrics(responseXML);
      //  return true;
    }
    //return false;
}

//Code for preparing input data for the service report_scall_metrics
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_report_scall_metrics()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_org_level_no_filter>" + getXmlString(scall_array[0]) + "</p_org_level_no_filter>";  // String
    serviceDetails = serviceDetails + "<p_org_level_code_filter>" + getXmlString(scall_array[1]) + "</p_org_level_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_scall_status_filter>" + getXmlString(scall_array[2]) + "</p_scall_status_filter>";  // String
    serviceDetails = serviceDetails + "<p_scall_priority_filter>" + getXmlString(scall_array[3]) + "</p_scall_priority_filter>";  // String
    serviceDetails = serviceDetails + "<p_creation_year_filter>" + getXmlString(scall_array[4]) + "</p_creation_year_filter>";  // String
    serviceDetails = serviceDetails + "<p_creation_qtr_filter>" + getXmlString(scall_array[5]) + "</p_creation_qtr_filter>";  // String
    serviceDetails = serviceDetails + "<p_creation_mth_filter>" + getXmlString(scall_array[6]) + "</p_creation_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_creation_wk_of_mth_filter>" + getXmlString(scall_array[7]) + "</p_creation_wk_of_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_creation_day_of_wk_filter>" + getXmlString(scall_array[8]) + "</p_creation_day_of_wk_filter>";  // String
    serviceDetails = serviceDetails + "<p_assign_year_filter>" + getXmlString(scall_array[9]) + "</p_assign_year_filter>";  // String
    serviceDetails = serviceDetails + "<p_assign_qtr_filter>" + getXmlString(scall_array[10]) + "</p_assign_qtr_filter>";  // String
    serviceDetails = serviceDetails + "<p_assign_mth_filter>" + getXmlString(scall_array[11]) + "</p_assign_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_assign_wk_of_mth_filter>" + getXmlString(scall_array[12]) + "</p_assign_wk_of_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_assign_day_of_wk_filter>" + getXmlString(scall_array[12]) + "</p_assign_day_of_wk_filter>";  // String
    serviceDetails = serviceDetails + "<p_close_year_filter>" + getXmlString(scall_array[14]) + "</p_close_year_filter>";  // String
    serviceDetails = serviceDetails + "<p_close_qtr_filter>" + getXmlString(scall_array[15]) + "</p_close_qtr_filter>";  // String
    serviceDetails = serviceDetails + "<p_close_mth_filter>" + getXmlString(scall_array[16]) + "</p_close_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_close_wk_of_mth_filter>" + getXmlString(scall_array[17]) + "</p_close_wk_of_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_close_day_of_wk_filter>" + getXmlString(scall_array[18]) + "</p_close_day_of_wk_filter>";  // String
    serviceDetails = serviceDetails + "<p_asset_id_filter>" + getXmlString(scall_array[19]) + "</p_asset_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_equipment_id_filter>" + getXmlString(scall_array[20]) + "</p_equipment_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_customer_id_filter>" + getXmlString(scall_array[21]) + "</p_customer_id_filter>";  // String
    serviceDetails = serviceDetails + "<p_cause_code_filter>" + getXmlString(scall_array[22]) + "</p_cause_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_assigned_to_functional_role_filter>" + getXmlString(scall_array[23]) + "</p_assigned_to_functional_role_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_assigned_to_empid_filter>" + getXmlString(scall_array[24]) + "</p_assigned_to_empid_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_reporting_to_functional_role_filter>" + getXmlString(scall_array[25]) + "</p_reporting_to_functional_role_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_reporting_to_empid_filter>" + getXmlString(scall_array[26]) + "</p_reporting_to_empid_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_mapped_to_functional_role_filter>" + getXmlString(scall_array[27]) + "</p_mapped_to_functional_role_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_mapped_to_empid_filter>" + getXmlString(scall_array[28]) + "</p_mapped_to_empid_filter>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service report_scall_metrics
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
function processServiceResponseData_report_scall_metrics(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    var first_outputparam_detail_item = true;
    var scall_metrics = "";
	scall_metrics += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //Delete existing table rows
            if (first_outputparam_detail_item) {
              //  deleteTableRows(document.getElementById('USER CONTROL'));
			//first_outputparam_detail_item = false;
            }
           // createTableRows(1, document.getElementById('USER CONTROL').rows[0].cells.length, document.getElementById('USER CONTROL'));
            
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_scall_metrics_xml
           // outputparam_detailcount++;
		   scall_metrics = scall_metrics+responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
        }
    }
	scall_metrics = scall_metrics+"</list>";
	return scall_metrics;
}
