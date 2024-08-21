/* 
 * This file contains invocation code snippets for executing the service retrieve_calendar. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_calendar 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_calendar
function executeService_retrieve_calendar()
{
    var targetURL = getWebserverpath() + "mservice/retrieve_calendar.aspx";
    
    //Prepare retrieve_calendar service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_calendar());
    
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
        return '1';
    }
    else
    {
        return processServiceResponseData_retrieve_calendar(responseXML);
    }
    return '1';
}

//Code for preparing input data for the service retrieve_calendar
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_calendar()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_inputparam_xml>"+getXmlString("<inputparam><from_date>"+se_schedule_from_date+"</from_date><to_date>"+se_schedule_to_date+"</to_date></inputparam>")+"</p_inputparam_xml>";  // Unicode string
    serviceDetails = serviceDetails + "<p_calendar_info_type>" + calendar_info_type + "</p_calendar_info_type>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
	
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili < srvc_engineer_val.length; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_employee_id>" + srvc_engineer_val[inputparam_detaili] + "</p_employee_id>";  // Unicode string
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_calendar
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
function processServiceResponseData_retrieve_calendar(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	var calendar_object = new Object();
    var detail_allocations_xml = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";
    var detail_wkndholiday_xml = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";
    var detail_avl_register_xml = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";
	var retrieve_status = '';
	
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_retrieve_status
			if(responseXMLNode[toplevelChildi].childNodes[0].hasChildNodes() == true)
			{
				retrieve_status += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
			}
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail_allocations")
        {
			detail_allocations_xml += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;// p_allocation_xml
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail_wkndholiday")
        {
            detail_wkndholiday_xml += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;// p_wkndholiday_xml
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail_avl_register")
        {
            detail_avl_register_xml += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;// p_avl_register_xml
        }
    }
	detail_allocations_xml += "</list>";
	detail_wkndholiday_xml += "</list>";
	detail_avl_register_xml += "</list>";
	calendar_object = {header:retrieve_status ,detail_1:detail_allocations_xml ,detail_2:detail_wkndholiday_xml ,detail_3:detail_avl_register_xml}
	return calendar_object;
}
