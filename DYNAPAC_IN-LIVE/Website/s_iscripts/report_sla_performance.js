//Function to call report_sla_performance service
function executeService_report_sla_performance()
{
    var targetURL = getWebserverpath() + "/mservice/report_sla_performance.aspx";
    
    //Prepare report_sla_performance service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_report_sla_performance());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
           // return false;
		    return "1";
        }
        else
        {
           return processServiceResponseData_report_sla_performanceForIEBrowser(responseXML);
           // return true;
        }
    }
    else if (window.XMLHttpRequest)  //Code for other browsers like FIREFOX/OPERA
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].textContent 
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].textContent 
            alert(responseXML.documentElement.childNodes[0].childNodes[1].textContent);
           // return false;
		    return "1";
        }
        else
        {
            return processServiceResponseData_report_sla_performanceForNonIEBrowser(responseXML);
            //return true;
        }
    }
    //return false;
}

//Function to prepare report_sla_performance service request
function prepareServiceRequestData_report_sla_performance()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_org_level_no_filter>" + getXmlString(sla_perf_array[0]) + "</p_org_level_no_filter>";  // String
    serviceDetails = serviceDetails + "<p_org_level_code_filter>" + getXmlString(sla_perf_array[1]) + "</p_org_level_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_sla_for_entity_filter>" + getXmlString(sla_perf_array[2]) + "</p_sla_for_entity_filter>";  // String
    serviceDetails = serviceDetails + "<p_jo_category_filter>" + getXmlString(sla_perf_array[3]) + "</p_jo_category_filter>";  // String
    serviceDetails = serviceDetails + "<p_jo_status_filter>" + getXmlString(sla_perf_array[4]) + "</p_jo_status_filter>";  // String
    serviceDetails = serviceDetails + "<p_jo_priority_code_filter>" + getXmlString(sla_perf_array[5]) + "</p_jo_priority_code_filter>";  // String
    serviceDetails = serviceDetails + "<p_scall_priority_filter>" + getXmlString(sla_perf_array[6]) + "</p_scall_priority_filter>";  // String
    serviceDetails = serviceDetails + "<p_year_filter>" + getXmlString(sla_perf_array[7]) + "</p_year_filter>";  // String
    serviceDetails = serviceDetails + "<p_qtr_filter>" + getXmlString(sla_perf_array[8]) + "</p_qtr_filter>";  // String
    serviceDetails = serviceDetails + "<p_mth_filter>" + getXmlString(sla_perf_array[9]) + "</p_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_wk_of_mth_filter>" + getXmlString(sla_perf_array[10]) + "</p_wk_of_mth_filter>";  // String
    serviceDetails = serviceDetails + "<p_day_of_wk_filter>" + getXmlString(sla_perf_array[11]) + "</p_day_of_wk_filter>";  // String
    serviceDetails = serviceDetails + "<p_equipment_id_filter>" + getXmlString(sla_perf_array[12]) + "</p_equipment_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_customer_id_filter>" + getXmlString(sla_perf_array[13]) + "</p_customer_id_filter>";  // String
    serviceDetails = serviceDetails + "<p_service_manager_empid_filter>" + getXmlString(sla_perf_array[14]) + "</p_service_manager_empid_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_service_engineer_emp_id_filter>" + getXmlString(sla_perf_array[15]) + "</p_service_engineer_emp_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process report_sla_performance service response ForIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_report_sla_performanceForIEBrowser(xmlDoc)
{
	var sla_perf_metrics = "";
	sla_perf_metrics += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
          //  document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_sla_perfmetrics_xml
			 sla_perf_metrics = sla_perf_metrics+responseXMLNode[toplevelChildi].childNodes[0].text;
		}
    }
	sla_perf_metrics = sla_perf_metrics+"</list>";
	return sla_perf_metrics;
}

//Function to process report_sla_performance service response ForNonIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_report_sla_performanceForNonIEBrowser(xmlDoc)
{
	var sla_perf_metrics = "";
	sla_perf_metrics += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_sla_perfmetrics_xml
			 sla_perf_metrics = sla_perf_metrics+responseXMLNode[toplevelChildi].childNodes[0].textContent;
		}
    }
	sla_perf_metrics = sla_perf_metrics+"</list>";
	return sla_perf_metrics;
}
