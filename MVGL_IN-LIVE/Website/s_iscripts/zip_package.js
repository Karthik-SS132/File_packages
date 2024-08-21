/* 
 * This file contains invocation code snippets for executing the service zip_package. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service zip_package 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service zip_package
function executeService_zip_package(zip_package_object)
{
    var targetURL = cvs.cvsTargetURL + "zip_package.aspx";
    
    //Prepare zip_package service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_zip_package(zip_package_object));
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return false;
    }
    else
    {
        return processServiceResponseData_zip_package(responseXML);
    }
    return false;
}

//Code for preparing input data for the service zip_package
function prepareServiceRequestData_zip_package(zip_package_object)
{
    var serviceDetails = "";
    //Processing context segment
    serviceDetails += "<inputparam>";
    serviceDetails += "<zip_foler_path>" + getXmlString(zip_package_object.zip_folder_path) + "</zip_foler_path>"; //String
    serviceDetails += "<zip_file_name>" + getXmlString(zip_package_object.zip_file_name) + "</zip_file_name>"; //String
    serviceDetails += "</inputparam>";
    return serviceDetails;
}

//Code for processing output data from the service zip_package
function processServiceResponseData_zip_package(xmlDoc)
{
	var return_value = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
			return_value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
        }
    }
	return return_value;
}
