/* 
 * This file contains invocation code snippets for executing the service save_manage_data_access_profile. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_data_access_profile 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_data_access_profile
function executeService_save_manage_data_access_profile()
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_data_access_profile.aspx";
    
    //Prepare save_manage_data_access_profile service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_data_access_profile());
    
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
        return processServiceResponseData_save_manage_data_access_profile(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_data_access_profile
function prepareServiceRequestData_save_manage_data_access_profile()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_access_for_event>" + p_access_for_event + "</p_access_for_event>";  // String
    serviceDetails = serviceDetails + "<p_level1_code>" + p_level1_code + "</p_level1_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level2_code>" + p_level2_code + "</p_level2_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level3_code>" + p_level3_code + "</p_level3_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level4_code>" + p_level4_code + "</p_level4_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level5_code>" + p_level5_code + "</p_level5_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_location_code>" + p_location_code + "</p_location_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_request_category>" + p_request_category + "</p_request_category>";  // String
    serviceDetails = serviceDetails + "<p_request_type>" + p_request_type + "</p_request_type>";  // String
    serviceDetails = serviceDetails + "<p_id_type>" + p_id_type + "</p_id_type>";  // String
    serviceDetails = serviceDetails + "<p_org_level_no>" + p_org_level_no + "</p_org_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_id_code>" + p_id_code + "</p_id_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_rec_timestamp>" + p_rec_timestamp + "</p_rec_timestamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + save_mode + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_data_access_profile
function processServiceResponseData_save_manage_data_access_profile(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
            update_status = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
			if(save_mode == 'A' || save_mode == 'U')
			{
				if(responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue == 'SP001')
				{
					alert('Data Updated Successfully.');
				}
				else
				{
					alert('Updation of data failed.');
				}
			}
			else if(save_mode == 'D')
			{
				if(responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue == 'SP001')
				{
					alert('Data Deleted Successfully.');
				}
				else
				{
					alert('Deletion of data failed.');
				}
			}
        }
    }
}
