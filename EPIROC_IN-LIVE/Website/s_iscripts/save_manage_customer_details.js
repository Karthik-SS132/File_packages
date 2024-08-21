//Function to call save_manage_customer_details service
function executeService_save_manage_customer_details()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "common_modules/save_manage_customer_details.aspx";
    
    //Prepare save_manage_customer_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_customer_details());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
			return "1";
        }
        else
        {
            return processServiceResponseData_save_manage_customer_detailsForIEBrowser(responseXML);
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
			return "1";
        }
        else
        {
            return processServiceResponseData_save_manage_customer_detailsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_manage_customer_details service request
function prepareServiceRequestData_save_manage_customer_details()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_customer_id>" + getXmlString(p_customer_id) + "</p_customer_id>";  // String
    serviceDetails = serviceDetails + "<p_customer_name>" + getXmlString(p_customer_name) + "</p_customer_name>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attribute_1>" + getXmlString(p_attribute_1) + "</p_attribute_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attribute_2>" + getXmlString(p_attribute_2) + "</p_attribute_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attribute_3>" + getXmlString(p_attribute_3) + "</p_attribute_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_address_line_1>" + getXmlString(p_address_line_1) + "</p_address_line_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_address_line_2>" + getXmlString(p_address_line_2) + "</p_address_line_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_address_line_3>" + getXmlString(p_address_line_3) + "</p_address_line_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_city>" + getXmlString(p_city) + "</p_city>";  // Unicode string
    serviceDetails = serviceDetails + "<p_state>" + getXmlString(p_state) + "</p_state>";  // Unicode string
    serviceDetails = serviceDetails + "<p_country>" + getXmlString(p_country) + "</p_country>";  // String
    serviceDetails = serviceDetails + "<p_pincode>" + getXmlString(p_pincode) + "</p_pincode>";  // String
    serviceDetails = serviceDetails + "<p_landline_1>" + getXmlString(p_landline_1) + "</p_landline_1>";  // String
    serviceDetails = serviceDetails + "<p_landline_2>" + getXmlString(p_landline_2) + "</p_landline_2>";  // String
    serviceDetails = serviceDetails + "<p_fax_no_1>" + getXmlString(p_fax_no_1) + "</p_fax_no_1>";  // String
    serviceDetails = serviceDetails + "<p_fax_no_2>" + getXmlString(p_fax_no_2) + "</p_fax_no_2>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_1>" + getXmlString(p_contact_person_1) + "</p_contact_person_1>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_1_mobile_no>" + getXmlString(p_contact_person_1_mobile_no) + "</p_contact_person_1_mobile_no>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_1_email_id>" + getXmlString(p_contact_person_1_email_id) + "</p_contact_person_1_email_id>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_2>" + getXmlString(p_contact_person_2) + "</p_contact_person_2>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_2_mobile_no>" + getXmlString(p_contact_person_2_mobile_no) + "</p_contact_person_2_mobile_no>";  // String
    serviceDetails = serviceDetails + "<p_contact_person_2_email_id>" + getXmlString(p_contact_person_2_email_id) + "</p_contact_person_2_email_id>";  // String
    if (mc_type_edit == "A")
	{
	serviceDetails = serviceDetails + "<p_rec_tstamp>" +  getXmlString("00000000-0000-0000-0000-000000000000") + "</p_rec_tstamp>";  // UniqueIdentifier string
	}
	else
	{
	serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
	}
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(mc_type_edit) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process save_manage_customer_details service response ForIEBrowser
function processServiceResponseData_save_manage_customer_detailsForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].text == 1)
			{
			alert("Customer Details Saved Successfully");
			}
			else if(responseXMLNode[toplevelChildi].childNodes[0].text  == 0)
			{
			alert("Customer Details Saving Failed");
			}
        }
    }
}

//Function to process save_manage_customer_details service response ForNonIEBrowser
function processServiceResponseData_save_manage_customer_detailsForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].textContent == 1)
			{
			alert("Customer Details Saved Successfully");
			}
			else if(responseXMLNode[toplevelChildi].childNodes[0].textContent == 0)
			{
			alert("Customer Details Saving Failed");
			}
        }
    }
}
