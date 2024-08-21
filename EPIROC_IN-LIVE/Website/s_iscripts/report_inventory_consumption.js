/* 
 * This file contains invocation code snippets for executing the service report_inventory_consumption. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service report_inventory_consumption 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service report_inventory_consumption
function executeService_report_inventory_consumption()
{
    var targetURL = getWebserverpath() + "/mservice/report_inventory_consumption.aspx";
    
    //Prepare report_inventory_consumption service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_report_inventory_consumption());
    
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
      return  processServiceResponseData_report_inventory_consumption(responseXML);
       // return true;
    }
   // return false;
}

//Code for preparing input data for the service report_inventory_consumption
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_report_inventory_consumption()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_org_level_no_filter>" + getXmlString(inventory_array[0]) + "</p_org_level_no_filter>";  // String
    serviceDetails = serviceDetails + "<p_org_level_code_filter>" + getXmlString(inventory_array[1]) + "</p_org_level_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_jo_category_filter>" + getXmlString(inventory_array[2]) + "</p_jo_category_filter>";  // String
    serviceDetails = serviceDetails + "<p_jo_status_filter>" + getXmlString(inventory_array[3]) + "</p_jo_status_filter>";  // String
    serviceDetails = serviceDetails + "<p_jo_priority_code_filter>" + getXmlString(inventory_array[4]) + "</p_jo_priority_code_filter>";  // String
    serviceDetails = serviceDetails + "<p_year_filter>" + getXmlString(inventory_array[5]) + "</p_year_filter>";  // String
    serviceDetails = serviceDetails + "<p_qtr_filter>" + getXmlString(inventory_array[6]) + "</p_qtr_filter>";  // String
    serviceDetails = serviceDetails + "<p_mth_filter>" + getXmlString(inventory_array[7]) + "</p_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_wk_of_mth_filter>" + getXmlString(inventory_array[8]) + "</p_wk_of_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_day_of_wk_filter>" + getXmlString(inventory_array[9]) + "</p_day_of_wk_filter>";  // String
    serviceDetails = serviceDetails + "<p_equipment_id_filter>" + getXmlString(inventory_array[10]) + "</p_equipment_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_asset_id_filter>" + getXmlString(inventory_array[11]) + "</p_asset_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_customer_id_filter>" + getXmlString(inventory_array[12]) + "</p_customer_id_filter>";  // String
    serviceDetails = serviceDetails + "<p_item_type_filter>" + getXmlString(inventory_array[13]) + "</p_item_type_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_warehouse_id_filter>" + getXmlString(inventory_array[14]) + "</p_warehouse_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_code_filter>" + getXmlString(inventory_array[15]) + "</p_item_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_variant_code_filter>" + getXmlString(inventory_array[16]) + "</p_item_variant_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_task_code_filter>" + getXmlString(inventory_array[17]) + "</p_task_code_filter>";  // String
    serviceDetails = serviceDetails + "<p_assigned_to_functional_role_filter>" + getXmlString(inventory_array[18]) + "</p_assigned_to_functional_role_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_assigned_to_empid_filter>" + getXmlString(inventory_array[19]) + "</p_assigned_to_empid_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_reporting_to_functional_role_filter>" + getXmlString(inventory_array[20]) + "</p_reporting_to_functional_role_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_reporting_to_empid_filter>" + getXmlString(inventory_array[21]) + "</p_reporting_to_empid_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_mapped_to_functional_role_filter>" + getXmlString(inventory_array[22]) + "</p_mapped_to_functional_role_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_mapped_to_empid_filter>" + getXmlString(inventory_array  [23]) + "</p_mapped_to_empid_filter>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service report_inventory_consumption
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
function processServiceResponseData_report_inventory_consumption(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparamcount = 1;
    var first_outputparam_item = true;
    var inventory_consn_metrics = "";
	inventory_consn_metrics += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //Delete existing table rows
            if (first_outputparam_item) {
               // deleteTableRows(document.getElementById('USER CONTROL'));
               // first_outputparam_item = false;
            }
          //  createTableRows(1, document.getElementById('USER CONTROL').rows[0].cells.length, document.getElementById('USER CONTROL'));
            
           // document.getElementById('USER CONTROL').rows[outputparamcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_invcons_metrics_xml
           // outputparamcount++;
		    inventory_consn_metrics = inventory_consn_metrics+responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
        }
    }
	inventory_consn_metrics = inventory_consn_metrics+"</list>";
	return inventory_consn_metrics;
}
