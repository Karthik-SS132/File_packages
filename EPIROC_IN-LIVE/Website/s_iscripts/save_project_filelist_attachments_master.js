/* 
 * This file contains invocation code snippets for executing the service save_project_filelist_attachments_master. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_project_filelist_attachments_master 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_project_filelist_attachments_master
function executeService_save_project_filelist_attachments_master(save_project_filelist_attachments_master_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_project_filelist_attachments_master.aspx";
    
    //Prepare save_project_filelist_attachments_master service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_project_filelist_attachments_master(save_project_filelist_attachments_master_object));
    
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
        return processServiceResponseData_save_project_filelist_attachments_master(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_project_filelist_attachments_master
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_project_filelist_attachments_master(save_project_filelist_attachments_master_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(save_project_filelist_attachments_master_object.p_project_id) + "</p_project_id>";  // String
    serviceDetails = serviceDetails + "<p_task_id>" + getXmlString(save_project_filelist_attachments_master_object.p_task_id) + "</p_task_id>";  // Int32: -2147483648 to 2147483647
    serviceDetails = serviceDetails + "<p_attach_level_ind>" + getXmlString(save_project_filelist_attachments_master_object.p_attach_level_ind) + "</p_attach_level_ind>";  // String
	serviceDetails = serviceDetails + "<p_inputparam_xml>" + getXmlString(save_project_filelist_attachments_master_object.p_inputparam_xml) + "</p_inputparam_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_filelist segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_filelisti = 0; inputparam_filelisti < save_project_filelist_attachments_master_object.inputparam_filelist.length; inputparam_filelisti++)
    {
        serviceDetails = serviceDetails + "<inputparam_filelist>";
        serviceDetails = serviceDetails + "<p_file_category>" + getXmlString(save_project_filelist_attachments_master_object.inputparam_filelist[inputparam_filelisti].p_file_category) + "</p_file_category>";  // String
        serviceDetails = serviceDetails + "<p_file_type>" + getXmlString(save_project_filelist_attachments_master_object.inputparam_filelist[inputparam_filelisti].p_file_type) + "</p_file_type>";  // String
        serviceDetails = serviceDetails + "<p_file_name>" + getXmlString(save_project_filelist_attachments_master_object.inputparam_filelist[inputparam_filelisti].p_file_name) + "</p_file_name>";  // Unicode string
        serviceDetails = serviceDetails + "<p_closure_report_ind>" + getXmlString(save_project_filelist_attachments_master_object.inputparam_filelist[inputparam_filelisti].p_closure_report_ind) + "</p_closure_report_ind>";  // Boolean: true or false
        serviceDetails = serviceDetails + "</inputparam_filelist>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_project_filelist_attachments_master
function processServiceResponseData_save_project_filelist_attachments_master(xmlDoc)
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
