/* 
 * This file contains invocation code snippets for executing the service save_code_value_detail. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_code_value_detail 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_code_value_detail
function executeService_save_code_value_detail(save_code_value_detail_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_code_value_detail.aspx";
    
    //Prepare save_code_value_detail service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_code_value_detail(save_code_value_detail_object));
    
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
        return processServiceResponseData_save_code_value_detail(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_code_value_detail
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_code_value_detail(save_code_value_detail_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_country_code_filter>" + getXmlString(save_code_value_detail_object.p_country_code_filter) + "</p_country_code_filter>";  // String
    serviceDetails = serviceDetails + "<p_locale_id_filter>" + getXmlString(save_code_value_detail_object.p_locale_id_filter) + "</p_locale_id_filter>";  // String
    serviceDetails = serviceDetails + "<p_code_type>" + getXmlString(save_code_value_detail_object.p_code_type) + "</p_code_type>";  // Unicode string
    serviceDetails = serviceDetails + "<p_code>" + getXmlString(save_code_value_detail_object.p_code) + "</p_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_short_description>" + getXmlString(save_code_value_detail_object.p_short_description) + "</p_short_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_long_description>" + getXmlString(save_code_value_detail_object.p_long_description) + "</p_long_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(save_code_value_detail_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_code_value_detail_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_code_value_detail
function processServiceResponseData_save_code_value_detail(xmlDoc)
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
