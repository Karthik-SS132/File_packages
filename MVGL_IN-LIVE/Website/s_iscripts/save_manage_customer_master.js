/* 
 * This file contains invocation code snippets for executing the service save_manage_customer_master. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_customer_master 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_customer_master
function executeService_save_manage_customer_master(save_manage_customer_master_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_customer_master.aspx";
    
    //Prepare save_manage_customer_master service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_customer_master(save_manage_customer_master_object));
    
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
        return processServiceResponseData_save_manage_customer_master(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_customer_master
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_customer_master(save_manage_customer_master_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_customer_id>" +getXmlString( save_manage_customer_master_object.p_customer_id )+ "</p_customer_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_customer_name>" + getXmlString(save_manage_customer_master_object.p_customer_name) + "</p_customer_name>";  // Unicode string
    serviceDetails = serviceDetails + "<p_address_line_1>" +getXmlString(save_manage_customer_master_object.p_address_line_1 )+ "</p_address_line_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_address_line_2>" + getXmlString(save_manage_customer_master_object.p_address_line_2 )+ "</p_address_line_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_address_line_3>" + getXmlString(save_manage_customer_master_object.p_address_line_3) + "</p_address_line_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_city>" + getXmlString(save_manage_customer_master_object.p_city) + "</p_city>";  // Unicode string
    serviceDetails = serviceDetails + "<p_state>" + getXmlString(save_manage_customer_master_object.p_state) + "</p_state>";  // Unicode string
    serviceDetails = serviceDetails + "<p_country>" + getXmlString(save_manage_customer_master_object.p_country )+ "</p_country>";  // String
    serviceDetails = serviceDetails + "<p_pincode>" + getXmlString(save_manage_customer_master_object.p_pincode )+ "</p_pincode>";  // String
    serviceDetails = serviceDetails + "<p_landline_1>" + getXmlString(save_manage_customer_master_object.p_landline_1) + "</p_landline_1>";  // String
    serviceDetails = serviceDetails + "<p_landline_2>" + getXmlString(save_manage_customer_master_object.p_landline_2) + "</p_landline_2>";  // String
    serviceDetails = serviceDetails + "<p_fax_no_1>" + getXmlString(save_manage_customer_master_object.p_fax_no_1) + "</p_fax_no_1>";  // String
    serviceDetails = serviceDetails + "<p_fax_no_2>" + getXmlString(save_manage_customer_master_object.p_fax_no_2) + "</p_fax_no_2>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_1>" + getXmlString(save_manage_customer_master_object.p_contact_person_1) + "</p_contact_person_1>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_1_mobile_no>" +getXmlString( save_manage_customer_master_object.p_contact_person_1_mobile_no) + "</p_contact_person_1_mobile_no>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_1_email_id>" +getXmlString( save_manage_customer_master_object.p_contact_person_1_email_id )+ "</p_contact_person_1_email_id>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_2>" +getXmlString( save_manage_customer_master_object.p_contact_person_2 )+ "</p_contact_person_2>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_2_mobile_no>" + getXmlString(save_manage_customer_master_object.p_contact_person_2_mobile_no) + "</p_contact_person_2_mobile_no>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_2_email_id>" + getXmlString(save_manage_customer_master_object.p_contact_person_2_email_id) + "</p_contact_person_2_email_id>";  // String
    serviceDetails = serviceDetails + "<p_inputparam_udf_xml>" + getXmlString(save_manage_customer_master_object.p_inputparam_udf_xml) + "</p_inputparam_udf_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_customer_master_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(save_manage_customer_master_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_customer_master
function processServiceResponseData_save_manage_customer_master(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue = {};
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
			 returnValue.customer_id = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_output_field_1
			 returnValue.updateStatus = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}
