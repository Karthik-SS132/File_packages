/* 
 * This file contains invocation code snippets for executing the service report_se_performance_for_scall. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service report_se_performance_for_scall 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service report_se_performance_for_scall
function executeService_report_se_performance_for_scall()
{
    var targetURL =  getWebserverpath() + "/mservice/report_se_performance_for_scall.aspx";
    
    //Prepare report_se_performance_for_scall service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_report_se_performance_for_scall());
    
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
       return processServiceResponseData_report_se_performance_for_scall(responseXML);
       // return true;
    }
   // return false;
}

//Code for preparing input data for the service report_se_performance_for_scall
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_report_se_performance_for_scall()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_org_level_no_filter>" + getXmlString(array[0]) + "</p_org_level_no_filter>";  // String
    serviceDetails = serviceDetails + "<p_org_level_code_filter>" + getXmlString(array[1]) + "</p_org_level_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_scall_status_filter>" + getXmlString(array[2]) + "</p_scall_status_filter>";  // String
    serviceDetails = serviceDetails + "<p_scall_priority_filter>" + getXmlString(array[3]) + "</p_scall_priority_filter>";  // String
    serviceDetails = serviceDetails + "<p_year_filter>" + getXmlString(array[4]) + "</p_year_filter>";  // String
    serviceDetails = serviceDetails + "<p_qtr_filter>" + getXmlString(array[5]) + "</p_qtr_filter>";  // String
    serviceDetails = serviceDetails + "<p_mth_filter>" + getXmlString(array[6]) + "</p_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_wk_of_mth_filter>" + getXmlString(array[7]) + "</p_wk_of_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_day_of_wk_filter>" + getXmlString(array[8]) + "</p_day_of_wk_filter>";  // String
    serviceDetails = serviceDetails + "<p_equipment_id_filter>" + getXmlString(array[9]) + "</p_equipment_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_customer_id_filter>" + getXmlString(array[10]) + "</p_customer_id_filter>";  // String
    serviceDetails = serviceDetails + "<p_assigned_to_functional_role_filter>" + getXmlString(array[11]) + "</p_assigned_to_functional_role_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_assigned_to_emp_id_filter>" + getXmlString(array[12]) + "</p_assigned_to_emp_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_asset_id_filter>" + getXmlString(array[13]) + "</p_asset_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_reporting_to_functional_role_filter>" + getXmlString(array[14]) + "</p_reporting_to_functional_role_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_reporting_to_emp_id_filter>" + getXmlString(array[15]) + "</p_reporting_to_emp_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_mapped_to_functional_role_filter>" + getXmlString(array[16]) + "</p_mapped_to_functional_role_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_mapped_to_emp_id_filter>" + getXmlString(array[17]) + "</p_mapped_to_emp_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service report_se_performance_for_scall
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
function processServiceResponseData_report_se_performance_for_scall(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    var first_outputparam_detail_item = true;
	var sc_se_perf="";
    sc_se_perf += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
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
               // deleteTableRows(document.getElementById('USER CONTROL'));
               // first_outputparam_detail_item = false;
            }
           // createTableRows(1, document.getElementById('USER CONTROL').rows[0].cells.length, document.getElementById('USER CONTROL'));
            
           //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_se_perfmetrics_xml
		    sc_se_perf = sc_se_perf+responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
          //  outputparam_detailcount++;
        }
    }
	sc_se_perf = sc_se_perf+"</list>";
	return sc_se_perf;

}
