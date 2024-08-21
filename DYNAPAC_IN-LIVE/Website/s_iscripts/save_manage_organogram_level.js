/* 
 * This file contains invocation code snippets for executing the service save_manage_organogram_level. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_organogram_level 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_organogram_level
function executeService_save_manage_organogram_level(save_manage_organogram_level_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_organogram_level.aspx";
    
    //Prepare save_manage_organogram_level service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_organogram_level(save_manage_organogram_level_object));
    
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
        return processServiceResponseData_save_manage_organogram_level(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_organogram_level
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_organogram_level(save_manage_organogram_level_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_level1_code>" + getXmlString(save_manage_organogram_level_object.p_level1_code) + "</p_level1_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level2_code>" + getXmlString(save_manage_organogram_level_object.p_level2_code) + "</p_level2_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level3_code>" + getXmlString(save_manage_organogram_level_object.p_level3_code) + "</p_level3_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level4_code>" + getXmlString(save_manage_organogram_level_object.p_level4_code) + "</p_level4_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level5_code>" + getXmlString(save_manage_organogram_level_object.p_level5_code) + "</p_level5_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level_no>" + save_manage_organogram_level_object.p_level_no + "</p_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_level_code>" + getXmlString(save_manage_organogram_level_object.p_level_code) + "</p_level_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level_head_emp_id>" + getXmlString(save_manage_organogram_level_object.p_level_head_emp_id) + "</p_level_head_emp_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_level_code_description>" + getXmlString(save_manage_organogram_level_object.p_level_code_description) + "</p_level_code_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_organogram_level_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_organogram_level
function processServiceResponseData_save_manage_organogram_level(xmlDoc)
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
