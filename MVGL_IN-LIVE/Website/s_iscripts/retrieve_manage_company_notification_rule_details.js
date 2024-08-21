/* 
 * This file contains invocation code snippets for executing the service retrieve_manage_company_notification_rule_details. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_manage_company_notification_rule_details 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_manage_company_notification_rule_details
function executeService_retrieve_manage_company_notification_rule_details(retrieve_manage_company_notification_rule_details_object)
{
    var targetURL = getWebserverpath() + "/common_modules/retrieve_manage_company_notification_rule_details.aspx";
    
    //Prepare retrieve_manage_company_notification_rule_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_company_notification_rule_details(retrieve_manage_company_notification_rule_details_object));
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Output contains error
        var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
        errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue;
        alert(errorDescription);
        return false;
    }
    else
    {
        return processServiceResponseData_retrieve_manage_company_notification_rule_details(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_manage_company_notification_rule_details
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_manage_company_notification_rule_details(retrieve_manage_company_notification_rule_details_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_notification_rule_gen_id>" + retrieve_manage_company_notification_rule_details_object.p_notification_rule_gen_id + "</p_notification_rule_gen_id>";  // Int32: -2147483648 to 2147483647
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_manage_company_notification_rule_details
function processServiceResponseData_retrieve_manage_company_notification_rule_details(xmlDoc)
{
	var returnValue = {};
	returnValue.p_notification_rule_details_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            returnValue.p_notification_rule_details_xml += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_notification_rule_details_xml
        }
    }
	returnValue.p_notification_rule_details_xml += "</list>";
	return returnValue;
}
