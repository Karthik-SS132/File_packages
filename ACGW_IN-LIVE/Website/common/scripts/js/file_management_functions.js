function FileDelete(file_path)
{
	var status = false;
	var xmlhttp;
    if (window.ActiveXObject)
    {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else if (window.XMLHttpRequest)  //Code for other browsers like FIREFOX/OPERA
    {
       	xmlhttp = new XMLHttpRequest();
    }
    try
    { 
		var delete_url = getWebserverpath() + "common/components/File_Upload/file_delete.aspx?path="+login_profile.client_id+"/"+login_profile.country_code+"/"+file_path;
		xmlhttp.addEventListener("error", function(evt){
			alert("Unable to delete the file");
		}, false);
		xmlhttp.addEventListener("load", function(evt){
				status = true;
		}, false);
        xmlhttp.open("POST", delete_url, false);
        xmlhttp.send();
	} 
    catch (err)
    {
        alert("Error encountered during service execution");
    }
	return status;
}

function FormDataFileUpload(FolderName,ExecuteFunction,FileInputName)
{
	try
	{
		var formData = new FormData();
		var up_file = eval("document.getElementById('"+FileInputName+"').files[0]");
			formData.append(FileInputName,up_file);
		var xmlhttp;
		var targetURL = getWebserverpath()+"common/components/File_Upload/file_upload.aspx?companyId="+login_profile.client_id+"&countryCode="+login_profile.country_code+"&doc_type="+FolderName+"&filename=";
			if (window.ActiveXObject)
			{
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			}
			else if (window.XMLHttpRequest)  //Code for other browsers like FIREFOX/OPERA
			{
				xmlhttp = new XMLHttpRequest();
			}
			xmlhttp.addEventListener("load", function(evt){
				eval(ExecuteFunction);
			}, false);
			xmlhttp.addEventListener("error", function(evt){
				alert("Upload Failed");
			}, false);
			xmlhttp.open("POST",targetURL,false);
			xmlhttp.send(formData);
	}
	catch (err) 
	{
		alert("Error encountered during service execution.");
	}
}

function CordovaFileUpload(File_path,FolderName,ExecuteFunction)
{
	$.mobile.activePage.addClass('ui-disabled');
	$.mobile.loading( 'show');
	var options = new FileUploadOptions();
		options.fileKey="file";
		options.fileName=File_path.substr(File_path.lastIndexOf('/')+1);
		options.mimeType="image/jpg";
		options.chunkedMode = true;
	var ft = new FileTransfer();
		ft.upload(File_path, getWebserverpath()+"common/components/File_Upload/file_upload.aspx?companyId="+login_profile.client_id+"&countryCode="+login_profile.country_code+"&doc_type="+FolderName+"&filename=",
		function(w)
		{
			eval(ExecuteFunction);
			//$.mobile.loading( 'hide');
			$.mobile.activePage.removeClass('ui-disabled');
		},
		function(f)
		{	
			//$.mobile.loading( 'hide');
			$.mobile.activePage.removeClass('ui-disabled');
			alert("Upload Failed");
		},
		options);
}

function KendoFileUpload(FolderName,File_Obj)
{
	var status = 0;
	try
	{
		$('#spinner').show();
		var formData = new FormData();
			formData.append("file",File_Obj);
		var xmlhttp;
		var targetURL = getWebserverpath()+"common/components/File_Upload/file_upload.aspx?companyId="+login_profile.client_id+"&countryCode="+login_profile.country_code+"&doc_type="+FolderName+"&filename=";
			if (window.ActiveXObject)
			{
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			}
			else if (window.XMLHttpRequest)  //Code for other browsers like FIREFOX/OPERA
			{
				xmlhttp = new XMLHttpRequest();
			}
			xmlhttp.addEventListener("load", function(evt){
				$('#spinner').hide();
				status = 1;
			}, false);
			xmlhttp.addEventListener("error", function(evt){
				$('#spinner').hide();
			}, false);
			xmlhttp.open("POST",targetURL,false);
			xmlhttp.send(formData);
	}
	catch (err) 
	{
		alert("Error encountered during service execution.");
	}
	return status;
}

function  CordovaFileSelect(sel_file_name)
{
	navigator.camera.getPicture(
		function(imageURI) 
		{
			file_uri = imageURI;
			eval("$('#"+sel_file_name+"').val(imageURI.substr(imageURI.lastIndexOf('/')+1));");
			eval("$('#"+sel_file_name+"').text(imageURI.substr(imageURI.lastIndexOf('/')+1));");
		},
		function(message) 
		{
			if(typeof file_uri == 'undefined')
			{
				file_uri = "";
				eval("$('#"+sel_file_name+"').text('');");
			}
		},
		{
			quality: 50,
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY 
		});
}

function getResponseXml(requestXmlString, res_root_node) {
    var master_xmlDoc = loadXMLString(file_reader());
    var res_context = master_xmlDoc.childNodes[0].childNodes[0].childNodes;
    var root_xml = master_xmlDoc.childNodes[0].childNodes;
    var requestXml = loadXMLString(requestXmlString);
    var context = context_validator(res_context, requestXml);
    if (context.context_ind == 1) {
		var validator = 0;
        for (var i = 0; i < root_xml.length; i++) {
            if (root_xml[i].nodeName == res_root_node) {
				validator = 1;
                var ch_node = root_xml[i].getElementsByTagName("input");
                var authe_request = requestXml.childNodes[0].childNodes[0].childNodes[5].childNodes;
				alert("ch_node.length:"+ch_node.length);
                for (var j = 0; j < ch_node.length; j++) {
                    var input = ch_node[j].childNodes;
					var counter = 0;
                    for (var k = 0; k < input.length; k++) {
                        if (input[k].nodeName == authe_request[k].nodeName) {
                            if (input[k].textContent == authe_request[k].textContent) {
								counter = counter + 1;
                            }
                        } else {
                            alert("---Invalid Node---" + "\n" + "res_input:" + input[k].nodeName + "==" + "req_input :" + authe_request[k].nodeName);
                            break;
                        }
                    }
                    if (counter == input.length) {
                        responseDetailsXml = "<document>";
                        responseDetailsXml = responseDetailsXml + "<" + res_root_node + ">";
                        responseDetailsXml = responseDetailsXml + context.context_xml;
                        var xmlText = new XMLSerializer().serializeToString(root_xml[i].getElementsByTagName("output")[j]);
                        var n = xmlText.replace("<output>", "").replace("</output>", "");
                        responseDetailsXml = responseDetailsXml + n;
                        responseDetailsXml = responseDetailsXml + "</" + res_root_node + ">";
                        responseDetailsXml = responseDetailsXml + "</document>";
						validator = 2;
						//alert("validator:"+validator);
                        break;
                    }
					//alert("validator:"+validator);
                }
				break;
            }
        }
		exceptionHandler(validator);
    }
    return responseDetailsXml;
}

function writefile(detail) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    function gotFS(fileSystem) {
        fileSystem.root.getFile("joborderlist.xml", {
            create: true,
            exclusive: false
        }, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        writer.onwrite = function (evt) {
            alert(detail);
            alert("file writed");
        }
        writer.onerror = function (evt) {
            alert("Error");
        }
        writer.write(detail);
    }

    function fail(error) {
        alert("error code:" + error.code);
    }
}

function context_validator(res_context,requestXml)
{
	var ind = {};
	var context_str = "";
	var json = "";
	for (var cntx = 0; cntx < res_context.length; cntx++) {
        if (res_context[cntx].nodeName == requestXml.childNodes[0].childNodes[0].childNodes[cntx].nodeName) {
            if (res_context[cntx].texContent == requestXml.childNodes[0].childNodes[0].childNodes[cntx].texContent) {
                context_ind = 1;
				context_str += new XMLSerializer().serializeToString(res_context[cntx]);
            } else {
                alert("Invalid node Value" + "\n" + res_context[cntx].nodeName + "\n" + res_context[cntx].texContent + "==" + requestXml.childNodes[0].childNodes[0].childNodes[cntx].texContent);
                context_ind = 0;
                break;
            }
        } else {
            alert("Invalid node Name" + "\n" + res_context[cntx].nodeName + "==" + requestXml.childNodes[0].childNodes[0].childNodes[cntx].nodeName);
            context_ind = 0;
            break;
        }
    }
	json = '{"context_ind"'+':'+'"'+context_ind+'"'+',"context_xml"'+':"'+context_str+'"}';
	var ind=$.parseJSON(json);
	return ind;
}

function file_reader() {
	var str = "";
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    function gotFS(fileSystem) {
        fileSystem.root.getFile("ModelXML_Offline.xml", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file) {
        readAsText(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            if (evt.target.result != "") {
				str = evt.target.result;
            } else {
                alert("Please Download Data");
            }
        }
        reader.readAsText(file);
    }

    function fail(error) {
        alert(error.code);
    }
	return str;
}

function exceptionHandler(value)
{
	switch(value)
	{
		case 0:
			alert("Invalid Root Node");
			break;
		case 1:
			alert("Invalid Data");
			break;
		case 2:
			console.log("Success");
			break;
	}
}