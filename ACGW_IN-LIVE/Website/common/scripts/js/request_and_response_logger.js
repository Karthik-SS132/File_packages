/* Get Request Information */
function GetRequestInfo(targetURL,serviceDetails) {
	var content = "";
    try {
        /*Get Service Name from Target URL*/
        var targetASPX = targetURL.substr(targetURL.lastIndexOf('/') + 1)
        var service = targetASPX.substr(0, targetASPX.lastIndexOf('.')); //	SERVICE NAME
		
        /*Get Context Details*/
        var xmldoc = loadXMLString(serviceDetails);
		var session_id = GetXmlNodes(xmldoc, "/document/context/sessionId"); //	SESSION ID
        var company_id = GetXmlNodes(xmldoc, "/document/context/client_id"); //	COMPANY ID
        var country_code = GetXmlNodes(xmldoc, "/document/context/country_code"); //	COUNTRY ID
        var user_name = GetXmlNodes(xmldoc, "/document/context/userId"); //	USER ID
		
		content += session_id.textContent + "	";
		content += company_id.textContent + "	";
		content += country_code.textContent + "	";
		content += user_name.textContent + "	";
		content += service + "	";
		content += CurrentDateTime("hr") + ":" + CurrentDateTime("min") + "	";
    } catch (log_err) { content = "";}
	return content;
}

/* Get Response Information */
function GetResponseInfo(responseXmlDoc)
{
	var content = "";
	try {
		content += CurrentDateTime("hr") + ":" + CurrentDateTime("min") + "	";
		if (responseXmlDoc.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass") {
			//alert(responseXmlDoc.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
			content += responseXmlDoc.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue + "\n";
		}
		else {
			content += "\n";
		}
	}
	catch(gr) { }
	return content;
}

/* The Logger */
function LogInfo(info) {
    try {
        /*Get Current Date*/
        var date = CurrentDateTime("yyyy") + '-' + CurrentDateTime("mm") + '-' + CurrentDateTime("dd"); //	CURRNET DATE

        /*Directory path and File name*/
        var dir_path = "mservice/request_log";
        var file_name = "mservice_log_" + date + ".txt";

        /*File Operations*/
        if (ValidateFile(dir_path, file_name) == 0) {
            Write_File(dir_path, file_name, info, 0);
        } else {
            var sts = AppendInFile(dir_path, file_name, info);
        }
    } catch (logif) {}
}

/* GET CURRENT DATE AND TIME */
function CurrentDateTime(date_format)
{
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();
	if(date<10){date = "0"+date;}
	if(month<10){month = "0"+month;}
	if(hour<10){hour = "0"+hour;}
	if(minute<10){minute = "0"+minute;}
		
	if(date_format == "yyyy") {
		return year;
	}
	else if(date_format == "mm") {
		return month;
	}
	else if(date_format == "dd") {
		return date;
	}
	else if(date_format == "hr") {
		return hour;
	}
	else if(date_format == "min") {
		return minute;
	}
	else if(date_format == "sec") {
		return second;
	}
}

/* GET SPECIFIC XML NODE USING X_PATH */
function GetXmlNodes(xml, path) {
    var result;
    if (window.ActiveXObject) {
        xml.setProperty("SelectionLanguage", "XPath");
        result = xml.selectNodes(path);
    } else if (document.implementation && document.implementation.createDocument) {
        nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        result = nodes.iterateNext();
    }
    return result;
}

/* GET XML NODE VALUE */
function GetXmlNodeValue(xmlNode)
{
	if (window.ActiveXObject) {
        return xmlNode.text;
    }
    else if (window.XMLHttpRequest) {
		return xmlNode.textContent;
	}
	return "";
}