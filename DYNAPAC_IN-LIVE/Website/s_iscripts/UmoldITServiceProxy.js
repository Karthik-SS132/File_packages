/*
 * Function to invoke service in the given URL
 * targetURL - service end point path
 * serviceDetails - input parameter for service execution
 */
function executeServiceAndtransformResponse(targetURL, serviceDetails)
{
    //Change the target URL
    var targetURL_temp = targetURL;    
    var serName = targetURL_temp.substr(targetURL.lastIndexOf('/') + 1);
    targetURL_temp = targetURL_temp.replace(serName, 'InvokeServiceAndTransformResponse.aspx');
    
    //Include service URL
    var serviceResponseXml = getXml(serviceDetails);    
    var serviceURLNode = serviceResponseXml.createElement("serviceURL");
    var serviceURLText = serviceResponseXml.createTextNode(targetURL);
    serviceURLNode.appendChild(serviceURLText);
    serviceResponseXml.documentElement.insertBefore(serviceURLNode, serviceResponseXml.documentElement.firstChild);

    return executeService(targetURL_temp, serviceResponseXml);
}

function getXml(xmlString)
{
    if (window.ActiveXObject) {
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); 
        xmlDoc.loadXML(xmlString);
        return xmlDoc;
    }
    else {
        return (new DOMParser()).parseFromString(xmlString, "text/xml");
    }
}
function executeService(targetURL, serviceDetails)
{
	/* Logging User Request on device */
	if(login_profile.app_mode == "MOBILE_NATIVE") {
		var logInfo = "";
		logInfo += GetRequestInfo(targetURL, serviceDetails);
	}
	
	if(login_profile.network_mode == "online")
	{	
		var xmlhttp;

		if (window.ActiveXObject) //Code for IE
		{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		else if (window.XMLHttpRequest) //Code for other browsers like FIREFOX/OPERA
		{
			xmlhttp = new XMLHttpRequest();
		}
		try {
			xmlhttp.open("POST", targetURL, false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml");
			xmlhttp.send(serviceDetails);
			if(login_profile.app_mode == "MOBILE_NATIVE") { logInfo += GetResponseInfo(xmlhttp.responseXML); }
		}
		catch (err) {
			alert("Error encountered during service execution");
			return false;
		}
		
		if(login_profile.app_mode == "MOBILE_NATIVE") { LogInfo(logInfo); }
		
		return xmlhttp.responseXML;
	}
	else
	{
		var sp = arguments.callee.caller.name.split("_");
		var res_root_node = "";
		if(sp[1] == "retrieve")
		{
			for(var lst=2;lst<sp.length-1;lst++)
			{
				if(lst != sp.length-2)
				{
					res_root_node += sp[lst] +"_";
				}
				else
				{
					res_root_node += sp[lst];
				}
			}
		}
		else if (sp[1] == "save")
		{
			alert("save");
		}
		else if(sp[1] == "delete")
		{
			alert("delete");
		}
		else if(sp[1] == "update")
		{
			alert("update");
		}
		else
		{
			for(var lst=1;lst<sp.length;lst++)
			{
				if(lst != sp.length-1)
				{
					res_root_node += sp[lst] +"_";
				}
				else
				{
					res_root_node += sp[lst];
				}
			}
		}
		//alert(res_root_node);
		var requestXmlString ="<?xml version=\"1.0\" encoding=\"utf-8\" ?>" + serviceDetails;
		var resXml = getResponseXml(requestXmlString,res_root_node);
		//alert(resXml);
		responseXml = loadXMLString(resXml);
		return responseXml;
	}
}

/*
 * Function to handle xml based special characters like '<', '&', '>' etc
 * value - text to be replaced with HTML characters for XML special characters
 */
function getXmlString(value)
{
    var XMLTokenSubstitute = { '&': "&amp;", '<': "&lt;", '>': "&gt;", '\'': "&apos;", '\"': "&quot;" };
    var XMLTokenPattern = /<|&|>|'|"/g;
    return value.replace(XMLTokenPattern, function(XMLToken) { return XMLTokenSubstitute[XMLToken]; });
}

/**
 * The following functions are necessary for service execution. 
 * User can replace your values for the appropriate placeholder
 * */

/*
 * Function to retrieve webserver path
 */
function getWebserverpath()
{
    //Replace your own custom logic to get appropriate physical server address if required; 
    //otherwise set appropriate value to the variable 'webServerPath'
    //Note: no need to specify path with "http://", specify only dns/virtual directory path like 'localhost:8080/demo'
	var webServerPath ="";
	
	webServerPath = login_profile.protocol+ "//" + login_profile.domain_name +":"+login_profile.portno+"/";
	
	return webServerPath;
}

function setWebSocketport()
{
    //Replace your own custom logic to get appropriate physical server address if required; 
    //otherwise set appropriate value to the variable 'webServerPath'
    //Note: no need to specify path with "http://", specify only dns/virtual directory path like 'localhost:8080/demo'
	
	login_profile.ws_portno = 9999; //websocket_server_portno

}

//Function to get context elements 
function getContextElements()
{
    //Replace USER INPUT with appropriate values for context elements
    //Processing context segment
    var contextdetails = "";
    contextdetails = "<context>";
    contextdetails += "<sessionId>" + getXmlString(login_profile.guid_val) + "</sessionId>"; //UniqueIdentifier string
    contextdetails += "<userId>" +  getXmlString(login_profile.user_id) + "</userId>"; //Unicode string
    contextdetails += "<client_id>" + getXmlString(login_profile.client_id) + "</client_id>"; //String
    contextdetails += "<locale_id>" + getXmlString(login_profile.locale_id) + "</locale_id>"; //String
    contextdetails += "<country_code>" + getXmlString(login_profile.country_code) + "</country_code>"; //String
    return contextdetails;
}

/*
 * Function to get context object
 */
function getContext()
{
    //Replace USER INPUT with appropriate values for context data items
    var context = {
        sessionId: login_profile.guid_val, //UniqueIdentifier string
        userId: login_profile.user_id, //Unicode string
        client_id: login_profile.client_id, //String
        locale_id: login_profile.locale_id, //String
        country_code: login_profile.country_code //String
    };
    return context;
}

function executeServiceAsync(targetURL, serviceDetails, callBackFunction)
{
    var xmlhttp;
    
    if (window.ActiveXObject) //Code for IE
    {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else if (window.XMLHttpRequest) //Code for other browsers like FIREFOX/OPERA
    {
        xmlhttp = new XMLHttpRequest();
    }
    try {
		xmlhttp.timeout = 60000;
        xmlhttp.open("POST", targetURL, true);
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.onreadystatechange = function(e) {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {                   
                    return callBackFunction(xmlhttp.responseXML);
                } else {
                    if (xmlhttp.responseXML != null) {
                        return callBackFunction(xmlhttp.responseXML);
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        xmlhttp.send(serviceDetails);
    }
    catch (err) {
        alert("Error encountered during service execution");
        return false;
    }
}

