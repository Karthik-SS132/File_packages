/* 
 * This file contains invocation code snippets for executing the service authenticate_user. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service authenticate_user 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service authenticate_user
function executeService_authenticate_user()
{
    var targetURL = getWebserverpath() + "security/authenticate_user.aspx";
    
    //Prepare authenticate_user service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_authenticate_user());
    
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
        processServiceResponseData_authenticate_user(responseXML);
    }
    return '0';
}

//Code for preparing input data for the service authenticate_user
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_authenticate_user()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + "<context>";
    serviceDetails = serviceDetails + "<sessionId>" + getXmlString("7e9c274d-1c4b-4234-9eec-4f90971f998b") + "</sessionId>"; // UniqueIdentifier string
    serviceDetails = serviceDetails + "<userId>" + getXmlString("signin") + "</userId>"; // Unicode string
    serviceDetails = serviceDetails + "<client_id>" + getXmlString(client_id) + "</client_id>"; // String
    serviceDetails = serviceDetails + "<locale_id>" + getXmlString("en-us") + "</locale_id>"; // String
    serviceDetails = serviceDetails + "<country_code>" + getXmlString("in") + "</country_code>"; // String
	
    //Processing auth_request segment
    serviceDetails = serviceDetails + "<auth_request>";
    serviceDetails = serviceDetails + "<p_company_id>" + getXmlString(client_id) + "</p_company_id>";  // String
    serviceDetails = serviceDetails + "<p_country_code>" + getXmlString(country_code_val) + "</p_country_code>";  // String
	
	serviceDetails = serviceDetails + "<p_user_id>" +getXmlString(username)+ "</p_user_id>";  // Unicode string
	serviceDetails = serviceDetails + "<p_passwd>" +getXmlString(password)+ "</p_passwd>";  // Unicode string
	
	serviceDetails = serviceDetails + "<p_device>" +getXmlString(login_profile.device)+ "</p_device>";  // Unicode string
    serviceDetails = serviceDetails + "<p_browser>" + getXmlString(login_profile.browser) + "</p_browser>";  // Unicode string
    serviceDetails = serviceDetails + "<p_ip_address>" + getXmlString("") + "</p_ip_address>";  // String
    serviceDetails = serviceDetails + "<p_channel_id>" + login_profile.app_mode.split('_')[0] + "</p_channel_id>";  // String
	serviceDetails = serviceDetails + "</auth_request>";
	
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service authenticate_user
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
function processServiceResponseData_authenticate_user(xmlDoc)
{
    my_level = '';
	access_profile.user_functional_access = [];
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	login_profile.login_date = getCurrentDate().slice(0,10);
	login_profile.login_hour = getCurrentDate().slice(11,13);
	login_profile.login_minute = getCurrentDate().slice(14,16);
	login_profile.login_second = getCurrentDate().slice(17,19);
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_response_login_profile")
        {
            //login_profile.user_id = document.getElementById('username').value;
			login_profile.user_id = username;
			login_profile.client_id = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_client_id
            login_profile.locale_id = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_locale_id
            login_profile.guid_val = responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue; // p_guid
            login_profile.country_code = responseXMLNode[toplevelChildi].childNodes[3].lastChild.nodeValue; // p_country_id
			login_profile.def_pwd_ind = responseXMLNode[toplevelChildi].childNodes[4].lastChild.nodeValue; // p_default_passwd_ind
			login_profile.date_display_format = responseXMLNode[toplevelChildi].childNodes[5].lastChild.nodeValue; // p_date_display_format
            login_profile.software_product = responseXMLNode[toplevelChildi].childNodes[6].lastChild.nodeValue; // p_software_product
            login_profile.software_product_version = responseXMLNode[toplevelChildi].childNodes[7].lastChild.nodeValue; // p_software_product_version
            login_profile.software_product_subversion = responseXMLNode[toplevelChildi].childNodes[8].lastChild.nodeValue; // p_software_product_subversion
            login_profile.timezone_id = responseXMLNode[toplevelChildi].childNodes[9].lastChild.nodeValue; // p_timezone_id
            login_profile.location_code= responseXMLNode[toplevelChildi].childNodes[10].lastChild.nodeValue; // p_location_code
            login_profile.currency_code = responseXMLNode[toplevelChildi].childNodes[11].lastChild.nodeValue; // p_currency_code
			if(responseXMLNode[toplevelChildi].childNodes[12].hasChildNodes() == true)
			{
			login_profile.last_login_date = responseXMLNode[toplevelChildi].childNodes[12].lastChild.nodeValue; // p_last_login_date
			}
			if(responseXMLNode[toplevelChildi].childNodes[13].hasChildNodes() == true)
			{
			login_profile.last_login_hour = responseXMLNode[toplevelChildi].childNodes[13].lastChild.nodeValue; // p_last_login_hour
			}
			if(responseXMLNode[toplevelChildi].childNodes[14].hasChildNodes() == true)
			{
			login_profile.last_login_minute = responseXMLNode[toplevelChildi].childNodes[14].lastChild.nodeValue; // p_last_login_minute
			}
			login_profile.user_group_id = responseXMLNode[toplevelChildi].childNodes[15].lastChild.nodeValue; // p_user_group_id
			if(responseXMLNode[toplevelChildi].childNodes[16].hasChildNodes() == true)
			{
			login_profile.photo_reference = responseXMLNode[toplevelChildi].childNodes[16].lastChild.nodeValue; // p_photo_reference
			}
			if(responseXMLNode[toplevelChildi].childNodes[17].hasChildNodes() == true)
			{
			login_profile.title = responseXMLNode[toplevelChildi].childNodes[17].lastChild.nodeValue; // p_title
			}
			if(responseXMLNode[toplevelChildi].childNodes[18].hasChildNodes() == true)
			{
            login_profile.first_name = responseXMLNode[toplevelChildi].childNodes[18].lastChild.nodeValue; // p_first_name
			}
			if(responseXMLNode[toplevelChildi].childNodes[19].hasChildNodes == true)
			{
				login_profile.middle_name = responseXMLNode[toplevelChildi].childNodes[19].lastChild.nodeValue; // p_middle_name
			}
			if(responseXMLNode[toplevelChildi].childNodes[20].hasChildNodes() == true)
			{
            login_profile.last_name = responseXMLNode[toplevelChildi].childNodes[20].lastChild.nodeValue; // p_last_name
			}
			if(responseXMLNode[toplevelChildi].childNodes[21].hasChildNodes() == true)
			{
			login_profile.no_of_org_level = responseXMLNode[toplevelChildi].childNodes[21].lastChild.nodeValue; // p_company_noof_levels
			}
			if(responseXMLNode[toplevelChildi].childNodes[22].hasChildNodes() == true)
			{
            login_profile.emp_id = responseXMLNode[toplevelChildi].childNodes[22].lastChild.nodeValue; // p_employee_id
			}
			if(responseXMLNode[toplevelChildi].childNodes[23].hasChildNodes() == true)
			{	
			    login_profile.package_id = responseXMLNode[toplevelChildi].childNodes[23].lastChild.nodeValue; // p_package_id
			}
			if(responseXMLNode[toplevelChildi].childNodes[24].hasChildNodes() == true)
			{	
			    login_profile.user_group_type = responseXMLNode[toplevelChildi].childNodes[24].lastChild.nodeValue; // p_user_group_type
			}
			if(responseXMLNode[toplevelChildi].childNodes[25].hasChildNodes() == true)
			{	
			    login_profile.dealer_code = responseXMLNode[toplevelChildi].childNodes[25].lastChild.nodeValue; // p_dealer_code
			}
			if(responseXMLNode[toplevelChildi].childNodes[26].hasChildNodes() == true)
			{	
			    login_profile.dealer_org_level_no = responseXMLNode[toplevelChildi].childNodes[26].lastChild.nodeValue; // p_dealer_org_level_no
			}
			if(responseXMLNode[toplevelChildi].childNodes[27].hasChildNodes() == true)
			{	
			    login_profile.dealer_org_level_code = responseXMLNode[toplevelChildi].childNodes[27].lastChild.nodeValue; // p_dealer_org_level_code
			}
			if(responseXMLNode[toplevelChildi].childNodes[28].hasChildNodes() == true)
			{	
			    login_profile.employee_org_level_no = responseXMLNode[toplevelChildi].childNodes[28].lastChild.nodeValue; // p_employee_org_level_no
			}
			if(responseXMLNode[toplevelChildi].childNodes[29].hasChildNodes() == true)
			{	
			    login_profile.employee_org_level_code = responseXMLNode[toplevelChildi].childNodes[29].lastChild.nodeValue; // p_employee_org_level_code
			}
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_response_fa_profile")
        {
			var parent_feature_group_val = '';
			var parent_group_display_label_val = '';
			if(responseXMLNode[toplevelChildi].childNodes[0].hasChildNodes() == true)
			{
				parent_feature_group_val += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
			}
			if(responseXMLNode[toplevelChildi].childNodes[3].hasChildNodes() == true)
			{
				parent_group_display_label_val += responseXMLNode[toplevelChildi].childNodes[3].lastChild.nodeValue;
			}
			
            access_profile.user_functional_access.push({
				 parent_feature_group: parent_feature_group_val,
				 child_feature_id_or_group: responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue, 
				 child_feature_id_or_group_ind: responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue, 
				 parent_group_display_label: parent_group_display_label_val, 
				 parent_level_no: responseXMLNode[toplevelChildi].childNodes[4].lastChild.nodeValue,
				 parent_display_order: responseXMLNode[toplevelChildi].childNodes[5].lastChild.nodeValue, 
				 child_feature_display_label: responseXMLNode[toplevelChildi].childNodes[6].lastChild.nodeValue,
				 child_level_no: responseXMLNode[toplevelChildi].childNodes[7].lastChild.nodeValue,
				 child_display_order: responseXMLNode[toplevelChildi].childNodes[8].lastChild.nodeValue,
				 child_screen_id: responseXMLNode[toplevelChildi].childNodes[9].lastChild.nodeValue, 
				 channel_id : responseXMLNode[toplevelChildi].childNodes[10].lastChild.nodeValue,
				 feature_access: responseXMLNode[toplevelChildi].childNodes[11].lastChild.nodeValue, 
				 add_access: responseXMLNode[toplevelChildi].childNodes[12].lastChild.nodeValue,
				 edit_access: responseXMLNode[toplevelChildi].childNodes[13].lastChild.nodeValue,
				 delete_access: responseXMLNode[toplevelChildi].childNodes[14].lastChild.nodeValue, 
				 view_access: responseXMLNode[toplevelChildi].childNodes[15].lastChild.nodeValue, 
				 export_access: responseXMLNode[toplevelChildi].childNodes[16].lastChild.nodeValue, 
				 print_access: responseXMLNode[toplevelChildi].childNodes[17].lastChild.nodeValue, 
				 import_access: responseXMLNode[toplevelChildi].childNodes[18].lastChild.nodeValue,
				 menu_display_ind: responseXMLNode[toplevelChildi].childNodes[19].lastChild.nodeValue	
			});
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_response_wf_access_profile")
        {			
			access_profile.user_data_access.push({
				
				access_to_info_type: responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,				
				access_for_event: responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue,
				level1_code: responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue, 
				level2_code: responseXMLNode[toplevelChildi].childNodes[3].lastChild.nodeValue, 
				level3_code: responseXMLNode[toplevelChildi].childNodes[4].lastChild.nodeValue, 
				level4_code: responseXMLNode[toplevelChildi].childNodes[5].lastChild.nodeValue,
				level5_code: responseXMLNode[toplevelChildi].childNodes[6].lastChild.nodeValue, 
				location_code: responseXMLNode[toplevelChildi].childNodes[7].lastChild.nodeValue,
				request_category: responseXMLNode[toplevelChildi].childNodes[8].lastChild.nodeValue, 
				request_type: responseXMLNode[toplevelChildi].childNodes[9].lastChild.nodeValue
			});
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_response_da_panel")
        {			
			access_profile.data_access_panel.push(
			{
				access_to_info_type: responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,
				org_level_no: responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue,
				org_level_code: responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue,
				location_code: responseXMLNode[toplevelChildi].childNodes[3].lastChild.nodeValue,
				request_category: responseXMLNode[toplevelChildi].childNodes[4].lastChild.nodeValue,
				request_type: responseXMLNode[toplevelChildi].childNodes[5].lastChild.nodeValue
			});
        }
    }
}
