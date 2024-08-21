var WebAPIProxy = {
	/*
	 * Function to handle xml based special characters like '<', '&', '>' etc
	 * value - text to be replaced with HTML characters for XML special characters
	 */
	XMLEncode: function (value)
	{
		var XMLTokenSubstitute = { '&': "&amp;", '<': "&lt;", '>': "&gt;", '\'': "&apos;", '\"': "&quot;" };
		var XMLTokenPattern = /&|<|>|'|"/g;
		return value.replace(XMLTokenPattern, function(XMLToken) { return XMLTokenSubstitute[XMLToken]; });
	},
	
	/*
	 * Function to handle json based special characters like '\', ''', '"' etc
	 * value - text to be replaced for json special characters
	 */
	JSONEncode: function (str) {
	    return str
          .replace(/[\\]/g, '\\\\')
          .replace(/[\"]/g, '\\\"')
          .replace(/[\']/g, '\\\'')
          .replace(/[\/]/g, '\\/')
          .replace(/[\b]/g, '\\b')
          .replace(/[\f]/g, '\\f')
          .replace(/[\n]/g, '\\n')
          .replace(/[\r]/g, '\\r')
          .replace(/[\t]/g, '\\t');
	},
	
	/*
	 * Function to handle json based special characters like '\', ''', '"' etc
	 * value - text to be replaced for json special characters
	 */
	MJSONEncode: function (str) {
	    return str
		  .replace(/[\#]/g, '\\#')
          .replace(/[\b]/g, '\\b')
          .replace(/[\f]/g, '\\f')
          .replace(/[\n]/g, '\\n')
          .replace(/[\r]/g, '\\r')
          .replace(/[\t]/g, '\\t');
	},

	/*
	 * Function to create table rows and columns and add to the given table
	 */
	createTableRows: function (rowCount, columnsCount, sourceTable) {
		var tbody = sourceTable.getElementsByTagName('tbody')[0];
		for (var i = 0; i < rowCount; i++) {
			var trow = document.createElement('tr');
			tbody.appendChild(trow);

			//Create columns for each row
			for (var j = 0; j < columnsCount; j++) {
				var td = document.createElement('td');
				trow.appendChild(td);
			}
		}
	},

	/*
	 * Function to delete given table rows except table header if exists
	 */
	deleteTableRows: function (sourceTable) {
		var startIndex = 0;

		if (sourceTable.getElementsByTagName('th').length > 0) {
			startIndex = 1;
		}
		for (var rowIndex = startIndex; rowIndex < sourceTable.rows.length; rowIndex++) {
			sourceTable.deleteRow(rowIndex);
			rowIndex--;
		}
	},
	
	/*
	 * Function to serialize an object to xml
	 */
	serializeToXML: function (sourceObject) {
		var data = { xml: "" };
		this.getXML(sourceObject, "", data);
		return data.xml;
	},
	
	/*
	 * Function to prepare XML from given object
	 */
	getXML: function (obj, tagName, data) {
        for (var key in obj) {
            if (isNaN(key) && typeof obj[key] !== "object" && obj[key] !== null) { // To avoid list item with index based key                
                data.xml += "<" + key + ">" + obj[key] + "</" + key + ">"; //Leaf level
            }
            else if (typeof obj[key] == "object" && obj[key] !== null && obj[key] != "") { //Value should be an object and it shouldn't be NULL/EMPTY
                var listExists = false;
                if (!isNaN(key)) { //Key is numeric index based
                    listExists = true;
                }
                else { //To check current object's childs key is numeric index based
                    for (var k in obj[key]) {
                        if (!isNaN(k)) {
                            tagName = key;
                            listExists = true;
                            break;
                        }
                    }
                }
                if (!listExists) {
                    data.xml += "<" + key + ">"; //start tag
                    this.getXML(obj[key], key, data);
                    data.xml += "</" + key + ">"; //end tag
                }
                else { //For processing list item

                    /* Skip creation of tag for numeric index items */
                    if (!isNaN(key)) { data.xml += "<" + tagName + ">" }

                    this.getXML(obj[key], tagName, data);

                    /* Skip creation of tag for numeric index items */
                    if (!isNaN(key)) { data.xml += "</" + tagName + ">"; }
                }
            }
            else if (isNaN(key) && obj[key] == null) //Member has NULL value
            {
                data.xml += "<" + key + " xsi:nil=\"true\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" />";
            }
        }
    },

	/*
	 * Function to invoke REST API
	 */
	invokeAPI: function (httpverb, uri, requestdata, contentType, responseFormat, authorizationHeaderValue, callbackfunction) {
		$.ajax({
			type: httpverb,
			url: uri,
			data: requestdata,
			dataType: responseFormat,
			async: false,
			accepts: {
				xml: 'application/xml',
				json: 'application/json',
				text: 'text/plain'
			},
			success: function (data, textStatus, jqXHR) {
				callbackfunction(data, textStatus);
			},
			error: function (jqXHR, textStatus, err) {
				callbackfunction(err, textStatus);
				return false;
			},
			beforeSend: function(jqXHR, settings) {
				if(authorizationHeaderValue != null && authorizationHeaderValue != undefined) {
					jqXHR.setRequestHeader('Authorization', authorizationHeaderValue); 
				}
				if(contentType != null) {
					jqXHR.setRequestHeader('Content-Type', contentType); 
				}
			} 
		});
	},	

	/*
	 * Function to retrieve application server URL
	 */
	getWebURL: function ()
	{
		//Default implementation has been provided to return the hosting webserver address itself (along with port number) as the application server address.
		
		/*
		 * In case, the application server address itself is different from the webserver address, set 'host_address' value to the actual application server address
		 */
		var host_address = window.location.protocol + "//" + window.location.host;
			
		/*
		 * Within the 'host_address' referred above, if the 'WebAPIs' are deployed under a hierarchy of virtual folders, 
		 * set 'virtualpath' value to the path representing the 'virtual folders hierarchy'
		 */
		var virtualpath = "";
		
		/* 
		 * Example appServerPath: "http://localhost:8080/demo"
		 * where, 
		 *		'http://localhost:8080' is the 'host_address' and
		 * 		'demo' is the 'virtualpath'
		 */
		var appServerPath = host_address + virtualpath;
		return appServerPath;
	},

	/*
	 * Function to get context object
	 */
	getContext: function ()
	{
		//Replace USER INPUT with appropriate values for context elements
		var context = {
			sessionId: login_profile.guid_val, //UniqueIdentifier string
			userId: login_profile.user_id, //Unicode string
			client_id: login_profile.client_id, //String
			locale_id: login_profile.locale_id, //String
			country_code: login_profile.country_code //String
		};
		return context;
	},
	
	/*
	 * Function to get getWebserverpath object
	 */
	getWebserverpath: function ()
	{
		//Replace your own custom logic to get appropriate physical server address if required; 
		//otherwise set appropriate value to the variable 'webServerPath'
		//Note: no need to specify path with "http://", specify only dns/virtual directory path like 'localhost:8080/demo'
		var webServerPath ="";
	
		webServerPath = login_profile.protocol+ "//" + login_profile.domain_name +":"+login_profile.portno+"/";
		
		return webServerPath;
	}
};