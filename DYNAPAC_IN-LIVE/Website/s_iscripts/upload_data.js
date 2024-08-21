function executeService_upload_data(iObj) {
	var targetURL = getWebserverpath() + "integration/upload_data.aspx";
	var responseXML = executeService(targetURL, prepareServiceRequestData_upload_data(iObj));
	if (responseXML.getElementsByTagName("ApplicationException").length > 0) {
		var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
		var errorDescription = "";
		errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue;
		alert(errorDescription);
		return false;
	} else {
		return processServiceResponseData_upload_data(responseXML);
	};
	return false;
};
function prepareServiceRequestData_upload_data(iObj) {
	var serviceDetails;
	serviceDetails = "<document>";
	serviceDetails = serviceDetails + getContextElements();
	serviceDetails = serviceDetails + "<inputparam>";
	serviceDetails = serviceDetails + "<p_import_client>" + getXmlString(iObj.p_import_client) + "</p_import_client>";
	serviceDetails = serviceDetails + "<p_filename>" + getXmlString(iObj.p_filename) + "</p_filename>";
	serviceDetails = serviceDetails + "<p_fileextn>" + getXmlString(iObj.p_fileextn) + "</p_fileextn>";
	serviceDetails = serviceDetails + "<p_filepath>" + getXmlString(iObj.p_filepath) + "</p_filepath>";
	serviceDetails = serviceDetails + "<p_inputparam_xml>" + getXmlString(iObj.p_inputparam_xml) + "</p_inputparam_xml>";
	serviceDetails = serviceDetails + "<p_information_type>" + getXmlString(iObj.p_information_type) + "</p_information_type>";
	serviceDetails = serviceDetails + "</inputparam>";
	serviceDetails = serviceDetails + "</context>";
	serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
};
function processServiceResponseData_upload_data(xmlDoc) {
	var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	var returnVal;
	for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++) {
		if (responseXMLNode[toplevelChildi].nodeName == "outputparam") {
			returnVal = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
		}
	};
	return returnVal;
}