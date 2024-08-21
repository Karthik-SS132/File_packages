/* 
 * This file contains invocation code snippets for executing the service save_user_preferences. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_user_preferences 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_user_preferences
function executeService_save_user_preferences(save_user_preferences_object)
{
    var targetURL = getWebserverpath() + "/common_modules/save_user_preferences.aspx";
    
    //Prepare save_user_preferences service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_user_preferences(save_user_preferences_object));
    
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
      return   processServiceResponseData_save_user_preferences(responseXML);
        //return true;
    }
  //  return false;
}

//Code for preparing input data for the service save_user_preferences
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_user_preferences(save_user_preferences_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_screen_id>" + getXmlString(save_user_preferences_object.p_screen_id) + "</p_screen_id>";  // String
    serviceDetails = serviceDetails + "<p_preference_area>" + getXmlString(save_user_preferences_object.p_preference_area) + "</p_preference_area>";  // String
    serviceDetails = serviceDetails + "<p_favorite_id>" + getXmlString(save_user_preferences_object.p_favorite_id) + "</p_favorite_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_user_preference>" + getXmlString(save_user_preferences_object.p_user_preference) + "</p_user_preference>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_default_preference_ind>" + getXmlString(save_user_preferences_object.p_default_preference_ind) + "</p_default_preference_ind>";  // Boolean: true or false
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_user_preferences
function processServiceResponseData_save_user_preferences(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
		   return responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; 
        }
    }
}
