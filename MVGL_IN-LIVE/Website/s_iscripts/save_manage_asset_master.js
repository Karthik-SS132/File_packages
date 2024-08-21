/* 
 * This file contains invocation code snippets for executing the service save_manage_asset_master. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_asset_master 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_asset_master
function executeService_save_manage_asset_master(save_manage_asset_master_object)
{
    var targetURL = getWebserverpath() + "mservice/save_manage_asset_master.aspx";
    
    //Prepare save_manage_asset_master service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_asset_master(save_manage_asset_master_object));
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Output contains error
        var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
        var errorNumber = "", errorDescription = "";
		if(exceptionNode.childNodes[0].lastChild != null){
			errorNumber = exceptionNode.childNodes[0].lastChild.nodeValue;
		}
        errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue;
        if (errorNumber != "")
            errorNumber += ": ";
        alert(errorNumber + errorDescription);
        return false;
    }
    else
    {
        return processServiceResponseData_save_manage_asset_master(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_asset_master
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_asset_master(save_manage_asset_master_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_asset_id>" + getXmlString(save_manage_asset_master_object.p_asset_id) + "</p_asset_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(save_manage_asset_master_object.p_equipment_id) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_customer_id>" + getXmlString(save_manage_asset_master_object.p_customer_id) + "</p_customer_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_asset_location_code>" + getXmlString(save_manage_asset_master_object.p_asset_location_code) + "</p_asset_location_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_locator_layout>" + getXmlString(save_manage_asset_master_object.p_locator_layout) + "</p_locator_layout>";  // Unicode string
    serviceDetails = serviceDetails + "<p_installation_date>" + getXmlString(save_manage_asset_master_object.p_installation_date) + "</p_installation_date>";  // String
    serviceDetails = serviceDetails + "<p_org_level_no>" + getXmlString(save_manage_asset_master_object.p_org_level_no) + "</p_org_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_org_level_code>" + getXmlString(save_manage_asset_master_object.p_org_level_code) + "</p_org_level_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_asset_status>" + getXmlString(save_manage_asset_master_object.p_asset_status) + "</p_asset_status>";  // String
	serviceDetails = serviceDetails + "<p_inputparam_udf_xml>" + getXmlString(save_manage_asset_master_object.p_inputparam_udf_xml) + "</p_inputparam_udf_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(save_manage_asset_master_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_asset_master_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_asset_master
function processServiceResponseData_save_manage_asset_master(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            returnValue = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}
