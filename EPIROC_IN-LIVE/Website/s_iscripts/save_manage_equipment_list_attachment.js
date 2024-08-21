/* 
 * This file contains invocation code snippets for executing the service save_manage_equipment_list_attachment. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_equipment_list_attachment 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_equipment_list_attachment
function executeService_save_manage_equipment_list_attachment()
{
    var targetURL =getWebserverpath() + "/mservice/save_manage_equipment_list_attachment.aspx";
    
    //Prepare save_manage_equipment_list_attachment service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_equipment_list_attachment());
    
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
      return   processServiceResponseData_save_manage_equipment_list_attachment(responseXML);
       // return true;
    }
   // return false;
}

//Code for preparing input data for the service save_manage_equipment_list_attachment
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_equipment_list_attachment()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(manage_equipment_attachments_eqpt_id) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_list_type>" + getXmlString(manage_equipment_attachments_list_type) + "</p_list_type>";  // String
    serviceDetails = serviceDetails + "<p_list_id>" + getXmlString(manage_equipment_attachments_list_id) + "</p_list_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(manage_equipment_attachments_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_equipment_list_attachment
function processServiceResponseData_save_manage_equipment_list_attachment(xmlDoc)
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
