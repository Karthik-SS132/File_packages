/* 
 * This file contains invocation code snippets for executing the service validate_conditions. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service validate_conditions 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service validate_conditions
function executeService_validate_conditions(validate_conditions_object)
{
    var targetURL = getWebserverpath() + "common_modules/validate_conditions.aspx";
    
    //Prepare validate_conditions service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_validate_conditions(validate_conditions_object));
    
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
        return processServiceResponseData_validate_conditions(responseXML);
    }
    return false;
}

//Code for preparing input data for the service validate_conditions
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_validate_conditions(validate_conditions_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_condition_name>" + getXmlString(validate_conditions_object.p_condition_name) + "</p_condition_name>";  // String
    serviceDetails = serviceDetails + "<p_validation_field_1>" + getXmlString(validate_conditions_object.p_validation_field_1) + "</p_validation_field_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_2>" + getXmlString(validate_conditions_object.p_validation_field_2) + "</p_validation_field_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_3>" + getXmlString(validate_conditions_object.p_validation_field_3) + "</p_validation_field_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_4>" + getXmlString(validate_conditions_object.p_validation_field_4) + "</p_validation_field_4>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_5>" + getXmlString(validate_conditions_object.p_validation_field_5) + "</p_validation_field_5>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_6>" + getXmlString(validate_conditions_object.p_validation_field_6) + "</p_validation_field_6>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_7>" + getXmlString(validate_conditions_object.p_validation_field_7) + "</p_validation_field_7>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_8>" + getXmlString(validate_conditions_object.p_validation_field_8) + "</p_validation_field_8>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_9>" + getXmlString(validate_conditions_object.p_validation_field_9) + "</p_validation_field_9>";  // Unicode string
    serviceDetails = serviceDetails + "<p_validation_field_10>" + getXmlString(validate_conditions_object.p_validation_field_10) + "</p_validation_field_10>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service validate_conditions
function processServiceResponseData_validate_conditions(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            returnValue = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_passfail_ind
        }
    }
	return returnValue;
}
