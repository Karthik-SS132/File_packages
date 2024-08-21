/* 
 * This file contains invocation code snippets for executing the service save_manage_fa_profile. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_fa_profile 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_fa_profile
function executeService_save_manage_fa_profile(save_manage_fa_profile_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_fa_profile.aspx";
    
    //Prepare save_manage_fa_profile service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_fa_profile(save_manage_fa_profile_object));
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Output contains error
        var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
        var errorNumber = "", errorDescription = "";
        if(exceptionNode.childNodes[0].lastChild != null)
            errorNumber = exceptionNode.childNodes[0].lastChild.nodeValue;
        errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue.replace(/'/g, "\'");
        if (errorNumber != "")
            errorNumber += ": ";
        alert(errorNumber + errorDescription);
        return false;
    }
    else
    {
        return processServiceResponseData_save_manage_fa_profile(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_fa_profile
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_fa_profile(save_manage_fa_profile_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili < save_manage_fa_profile_object.inputparam_detail.length; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_user_group_id>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_user_group_id) + "</p_user_group_id>";  // Unicode string
        serviceDetails = serviceDetails + "<p_feature_id>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_feature_id) + "</p_feature_id>";  // String
        serviceDetails = serviceDetails + "<p_feature_access>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_feature_access) + "</p_feature_access>";  // Boolean: true or false
        serviceDetails = serviceDetails + "<p_add_access>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_add_access) + "</p_add_access>";  // Boolean: true or false
        serviceDetails = serviceDetails + "<p_edit_access>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_edit_access) + "</p_edit_access>";  // Boolean: true or false
        serviceDetails = serviceDetails + "<p_delete_access>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_delete_access) + "</p_delete_access>";  // Boolean: true or false
        serviceDetails = serviceDetails + "<p_view_access>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_view_access) + "</p_view_access>";  // Boolean: true or false
        serviceDetails = serviceDetails + "<p_import_access>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_import_access) + "</p_import_access>";  // Boolean: true or false
		serviceDetails = serviceDetails + "<p_export_access>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_export_access) + "</p_export_access>";  // Boolean: true or false
        serviceDetails = serviceDetails + "<p_print_access>" + getXmlString(save_manage_fa_profile_object.inputparam_detail[inputparam_detaili].p_print_access) + "</p_print_access>";  // Boolean: true or false
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_fa_profile
function processServiceResponseData_save_manage_fa_profile(xmlDoc)
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
