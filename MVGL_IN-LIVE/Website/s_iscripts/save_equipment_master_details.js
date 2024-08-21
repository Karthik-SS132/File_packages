/* 
 * This file contains invocation code snippets for executing the service save_equipment_master_details. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_equipment_master_details 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_equipment_master_details
function executeService_save_equipment_master_details()
{
    var targetURL =  getWebserverpath() + "mservice/save_equipment_master_details.aspx";
    
    //Prepare save_equipment_master_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_equipment_master_details());
    
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
        processServiceResponseData_save_equipment_master_details(responseXML);
       // return true;
    }
    //return false;
}

//Code for preparing input data for the service save_equipment_master_details
function prepareServiceRequestData_save_equipment_master_details()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(p_equipment_id) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_description>" + getXmlString(p_description) + "</p_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attribute_1>" + getXmlString(attr_field1) + "</p_attribute_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attribute_2>" + getXmlString(attr_field2) + "</p_attribute_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attribute_3>" + getXmlString(attr_field1) + "</p_attribute_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_org_level_no>" + getXmlString(p_org_level_no) + "</p_org_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_org_level_code>" + getXmlString(p_org_level_code) + "</p_org_level_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_udf_char_1>" + getXmlString(char_field1) + "</p_udf_char_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_udf_char_2>" + getXmlString(char_field2) + "</p_udf_char_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_udf_char_3>" + getXmlString(char_field3) + "</p_udf_char_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_udf_char_4>" + getXmlString(char_field4) + "</p_udf_char_4>";  // Unicode string
    serviceDetails = serviceDetails + "<p_udf_bit_1>" + getXmlString(bit_value1) + "</p_udf_bit_1>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_udf_bit_2>" + getXmlString(bit_value2) + "</p_udf_bit_2>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_udf_bit_3>" + getXmlString(bit_value3) + "</p_udf_bit_3>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_udf_bit_4>" + getXmlString(bit_value4) + "</p_udf_bit_4>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_udf_float_1>" + getXmlString(float_field1) + "</p_udf_float_1>";  // Decimal: Total no of digits - 14; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_udf_float_2>" + getXmlString(float_field2) + "</p_udf_float_2>";  // Decimal: Total no of digits - 14; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_udf_float_3>" + getXmlString(float_field3) + "</p_udf_float_3>";  // Decimal: Total no of digits - 14; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_udf_float_4>" + getXmlString(float_field4) + "</p_udf_float_4>";  // Decimal: Total no of digits - 14; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_udf_date_1>" + getXmlString(date_field_1) + "</p_udf_date_1>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_1_hour>" + getXmlString(hour_field_1) + "</p_udf_date_1_hour>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_1_minute>" + getXmlString(min_field_1) + "</p_udf_date_1_minute>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_2>" + getXmlString(date_field_2) + "</p_udf_date_2>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_2_hour>" + getXmlString(hour_field_2) + "</p_udf_date_2_hour>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_2_minute>" + getXmlString(min_field_2) + "</p_udf_date_2_minute>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_3>" + getXmlString(date_field_3) + "</p_udf_date_3>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_3_hour>" + getXmlString(hour_field_3) + "</p_udf_date_3_hour>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_3_minute>" + getXmlString(min_field_3) + "</p_udf_date_3_minute>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_4>" + getXmlString(date_field_4) + "</p_udf_date_4>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_4_hour>" + getXmlString(hour_field_4) + "</p_udf_date_4_hour>";  // String
    serviceDetails = serviceDetails + "<p_udf_date_4_minute>" + getXmlString(min_field_4) + "</p_udf_date_4_minute>";  // String
    serviceDetails = serviceDetails + "<p_analysis_code1>" + getXmlString(analysis_field1) + "</p_analysis_code1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_analysis_code2>" + getXmlString(analysis_field2) + "</p_analysis_code2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_analysis_code3>" + getXmlString(analysis_field3) + "</p_analysis_code3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_analysis_code4>" + getXmlString(analysis_field4) + "</p_analysis_code4>";  // Unicode string
	if (eq_type_edit == "A" || eq_det_edit_type == "A")
	{
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString("00000000-0000-0000-0000-000000000000") + "</p_rec_tstamp>";  // UniqueIdentifier string	
	}
	else
	{
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(hdr_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
	}
	if (eq_type_edit == "A")
	{
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString("A") + "</p_save_mode>";  // String	
	}
	else
	{
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString("U") + "</p_save_mode>";  // String
	}serviceDetails = serviceDetails + "</inputparam_header>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_equipment_master_details
function processServiceResponseData_save_equipment_master_details(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
          //  document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
		  if(responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue == 1)
			{
			alert("Equipment Master Details Saved Successfully");
			}
			else if(responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue == 0)
			{
			alert("Equipment Master Details Saving Failed");
			}
        }
    }
}
