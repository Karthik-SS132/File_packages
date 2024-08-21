/* 
 * This file contains invocation code snippets for executing the service save_manage_task_code. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_task_code 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_task_code
function executeService_save_manage_task_code(save_manage_task_code_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_task_code.aspx";
    
    //Prepare save_manage_task_code service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_task_code(save_manage_task_code_object));
    
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
     return   processServiceResponseData_save_manage_task_code(responseXML);       
    }
    return false;
}

//Code for preparing input data for the service save_manage_task_code
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_task_code(save_manage_task_code_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_task_code>" + getXmlString(save_manage_task_code_object.p_task_code) + "</p_task_code>";  // String
    serviceDetails = serviceDetails + "<p_task_description>" + getXmlString(save_manage_task_code_object.p_task_description) + "</p_task_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_std_duration>" + save_manage_task_code_object.p_std_duration + "</p_std_duration>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 2
    serviceDetails = serviceDetails + "<p_std_duration_uom>" + getXmlString(save_manage_task_code_object.p_std_duration_uom) + "</p_std_duration_uom>";  // String
    serviceDetails = serviceDetails + "<p_std_work>" + save_manage_task_code_object.p_std_work + "</p_std_work>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 2
    serviceDetails = serviceDetails + "<p_std_work_uom>" + getXmlString(save_manage_task_code_object.p_std_work_uom) + "</p_std_work_uom>";  // String
    serviceDetails = serviceDetails + "<p_std_cost>" + save_manage_task_code_object.p_std_cost + "</p_std_cost>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_currency_code>" + getXmlString(save_manage_task_code_object.p_currency_code) + "</p_currency_code>";  // String
    serviceDetails = serviceDetails + "<p_rec_timestamp>" + getXmlString(save_manage_task_code_object.p_rec_timestamp) + "</p_rec_timestamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_task_code_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_task_code
function processServiceResponseData_save_manage_task_code(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var temp;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           temp = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
	return temp;
}
