/* 
 * This file contains invocation code snippets for executing the service save_item_rate_details. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_item_rate_details 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_item_rate_details
function executeService_save_item_rate_details(save_item_rate_details_object)
{
    var targetURL = getWebserverpath() + "mservice/save_item_rate_details.aspx";
    
    //Prepare save_item_rate_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_item_rate_details(save_item_rate_details_object));
    
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
        return processServiceResponseData_save_item_rate_details(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_item_rate_details
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_item_rate_details(save_item_rate_details_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_item_code>" + getXmlString(save_item_rate_details_object.p_item_code) + "</p_item_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_variant_code>" + getXmlString(save_item_rate_details_object.p_item_variant_code) + "</p_item_variant_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_item_rate_details_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili < save_item_rate_details_object.inputparam_detail.length; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_uom_code>" + getXmlString(save_item_rate_details_object.inputparam_detail[inputparam_detaili].p_uom_code) + "</p_uom_code>";  // String
        serviceDetails = serviceDetails + "<p_std_rate>" + getXmlString(save_item_rate_details_object.inputparam_detail[inputparam_detaili].p_std_rate) + "</p_std_rate>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_currency_code>" + getXmlString(save_item_rate_details_object.inputparam_detail[inputparam_detaili].p_currency_code) + "</p_currency_code>";  // String
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_item_rate_details
function processServiceResponseData_save_item_rate_details(xmlDoc)
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
