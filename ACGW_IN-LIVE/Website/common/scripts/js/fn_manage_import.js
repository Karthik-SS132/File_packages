function fn_manage_import() {
	var newTemplateScreen, screenObject;
	var fileName = "";
	var fileType = "";
	var fileObject = "";
	var fileUploadPath = "";
	value_changed_ind = false;
	
	newTemplateScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (element, index) {
			return element == screenID;
		})[0];
	if (newTemplateScreen != undefined) {
		screenObject = eval(webNavigationController.getCurrentScreenID());
		var importConfiguration = screenObject.variable.standard.importConfiguration;
	} else {
		var importConfiguration = eval("fn_" + screenID + "_PreImport()");
	}
	AddCustomImportFields(screenID);

	/* FILE UPLOAD CONTROLLER */
	manage_import_file_select = $("#manage_import_file_select").kendoUpload({
			multiple : false,
			select : function (e) {
				$.each(e.files, function (index, value) {
					fileName = value.name;
					fileType = value.extension;
					fileObject = document.getElementById('manage_import_file_select').files[0];
					fileUploadPath = "content_store\\" + login_profile.client_id + "\\" + login_profile.country_code + "\\import_upload\\" + login_profile.guid_val;
				});
			}
		}).data("kendoUpload");
	$("#manage_import_file_select").closest(".k-upload").find("span").text("Browse");

	/* SUBMIT BUTTON CLICK */
	$("#manage_import_submit_btn").click(function () {
		var validator = $("#manage_import").data("kendoValidator");
		if (validator.validate()) {
			if (fileObject != "") {
				var KendoFileUploadStatus = KendoFileUpload("import_upload/" + login_profile.guid_val + "/", fileObject);
				if (KendoFileUploadStatus == 1) {
					
					upload_data_object = {};
					upload_data_object = 
					{
						p_filename: fileName,
						p_fileextn: fileType,
						p_filepath: fileUploadPath,
						p_inputparam_xml: GetInputParamXML("manage_import_header_1"),
						p_information_type: importConfiguration.imformationType
					}
					var UploadDataServiceStatus = executeService_upload_data(upload_data_object);
					if (UploadDataServiceStatus == false) {
						FileDelete("import_upload/" + login_profile.guid_val + "/" + fileObject.name);
					} else if (UploadDataServiceStatus == "SP001") {
						alert("Import is Successful");
						try {
							eval("fn_" + navigation_map[navigation_map.length - 1].screenID + "_PostImport()");
						} catch(ex) {
							return true;
						}
					}
					import_window.close();
				}
			} else {
				alert("Please select a file!");
			}
		}
	});

	/* CANCEL BUTTON CLICK */
	$('#manage_import_cancel_btn').on('click', function () {
		isScreenEditable = false;
		if (value_changed_ind == true) {
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true)
				import_window.close();
		} else {
			import_window.close();
		}
	});
	
	$('#manage_import input').on('change', function()
	{
	   value_changed_ind = true;	
	});

	AttachValidationRules("manage_import");
	ApplyConfiguredLabels("manage_import");
}

function AddCustomImportFields(screenID) {
	/* VARIABLE DECLARATIONS */
	var screenNode,
	fieldNodes,
	displayNode,
	fieldID,
	typeNode,
	dataSourceNode,
	cascadingNode,
	eventsNode,
	defaultValueNode,
	initializationObject,
	detailDataSource,
	customFieldCounter,
	filterMode = false,
	dl,
	dt,
	dd1,
	dd2,
	label,
	element,
	hr,
	validation_rules,
	span,
	default_value_node,
	enable_node;

	screenNode = xmlDocImportUI.getElementsByTagName(screenID);
	if (screenNode.length != 0) {
		fieldNodes = screenNode[0].getElementsByTagName("field");
		for (var j = 0; j < fieldNodes.length; j++) {
			displayNode = fieldNodes[j].getElementsByTagName("display");
			if (displayNode[0].childNodes[0].nodeValue == "true") {
				fieldID = fieldNodes[j].getAttribute("id");

				/* FORMING HTML ELEMENTS */
				dl = document.getElementById("manage_import_dl_1");
				dt = document.createElement("dt");
				dd1 = document.createElement("dd");
				dd2 = document.createElement("dd");
				label = document.createElement("label");
				element = document.createElement("input");
				hr = document.createElement("hr");
				dt.setAttribute("class", "term_two");
				if (j > 0) {
					dl.appendChild(hr);
				}

				label.setAttribute("id", "manage_import_" + screenID + "_" + fieldID + "_lbl");
				dd1.setAttribute("class", "colen");
				dd1.textContent = ":";
				dd2.setAttribute("class", "value");
				element.setAttribute("id", "manage_import_" + screenID + "_" + fieldID);
				element.setAttribute("name", "manage_import_" + screenID + "_" + fieldID);
				dd2.appendChild(element);

				/* FIELD VALIDATION */
				validation_rules = fieldNodes[j].getElementsByTagName("validation_rules");
				if (validation_rules.length != 0) {
					if (validation_rules[0].childNodes[0] != undefined) {
						element.setAttribute("data-validation-rule", validation_rules[0].childNodes[0].nodeValue);
						if (validation_rules[0].childNodes[0].nodeValue.toString().match("mandatory") != null) {
							span = document.createElement("span");
							span.setAttribute("class", "required");
							span.innerText = "*";
							label.appendChild(span);
						}
						span = document.createElement("span");
						span.setAttribute("class", "k-invalid-msg");
						span.setAttribute("data-for", "manage_import_" + screenID + "_" + fieldID);
						dd2.appendChild(span);
					}
				}

				dt.appendChild(label);
				dl.appendChild(dt);
				dl.appendChild(dd1);
				dl.appendChild(dd2);

				/* CATEGORIZING THE TYPE OF FIELD */
				typeNode = fieldNodes[j].getElementsByTagName("type");
				if (typeNode[0].childNodes[0].nodeValue == "text") {
					$("#" + "manage_import_" + screenID + "_" + fieldID).attr("class", "k-textbox");
					$("#" + "manage_import_" + screenID + "_" + fieldID).attr("type", "text");
					default_value_node = fieldNodes[j].getElementsByTagName("default_value");
					if(default_value_node.length != 0) {
						try {
								$("#" + "manage_import_" + screenID + "_" + fieldID).val(eval(default_value_node[0].childNodes[0].nodeValue));
							}
							catch (e) {
								$("#" + "manage_import_" + screenID + "_" + fieldID).val(default_value_node[0].childNodes[0].nodeValue);
							}		
					}
					enable_node = fieldNodes[j].getElementsByTagName("enable");
					if(enable_node.length != 0) {
						if(enable_node[0].childNodes[0].nodeValue == "false")
						{
							$("#" + "manage_import_" + screenID + "_" + fieldID).attr("disabled", true).css("backgroundColor","#F5F5F5");
						}
					}
				} else if (typeNode[0].childNodes[0].nodeValue == "date") {
					$("#" + "manage_import_" + screenID + "_" + fieldID).kendoDatePicker({
						format : "dd-MM-yyyy"
					});
					eval("manage_import_" + screenID + "_" + fieldID + " = $('#" + "manage_import_" + screenID + "_" + fieldID + "').data('kendoDatePicker')");
				} else {
					initializationObject = {};
					initializationObject.fieldID = "manage_import_" + screenID + "_" + fieldID;
					initializationObject.filterMode = filterMode;
					initializationObject.dataTextField = fieldNodes[j].getElementsByTagName("data_text_field")[0].childNodes[0].nodeValue;
					initializationObject.dataValueField = fieldNodes[j].getElementsByTagName("data_value_field")[0].childNodes[0].nodeValue;
					dataSourceNode = fieldNodes[j].getElementsByTagName("datasource");
					cascadingNode = fieldNodes[j].getElementsByTagName("cascading");
					eventsNode = fieldNodes[j].getElementsByTagName("events");
					defaultValueNode = fieldNodes[j].getElementsByTagName("default_value");
					if (dataSourceNode[0].childElementCount == 0) {
						initializationObject.dataSource = eval(dataSourceNode[0].childNodes[0].nodeValue);
					} else {
						initializationObject.dataSource = {};
						initializationObject.dataSource.applicationName = dataSourceNode[0].getElementsByTagName("application_name")[0].childNodes[0].nodeValue;
						initializationObject.dataSource.serviceName = dataSourceNode[0].getElementsByTagName("service_name")[0].childNodes[0].nodeValue;
						if (dataSourceNode[0].getElementsByTagName("input_parameter").length != 0) {
							initializationObject.dataSource.inputParameter = {};
							for (var k = 0; k < dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes.length; k++) {
								if (dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].childNodes[0] != undefined) {
									try {
										initializationObject.dataSource.inputParameter[dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].nodeName] = eval(dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].childNodes[0].nodeValue);
									}
									catch (e) {
										initializationObject.dataSource.inputParameter[dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].nodeName] = dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].childNodes[0].nodeValue;
									}									
								} else {
									initializationObject.dataSource.inputParameter[dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].nodeName] = "";
								}
							}
						}
					}
					if (cascadingNode.length != 0) {
						initializationObject.cascading = {};
						initializationObject.cascading.cascadeFrom = "manage_import_" + screenID + "_" + cascadingNode[0].getElementsByTagName("cascade_from")[0].childNodes[0].nodeValue;
						initializationObject.cascading.cascadeFromField = cascadingNode[0].getElementsByTagName("cascade_from_field")[0].childNodes[0].nodeValue;
						if (cascadingNode[0].getElementsByTagName("default_cascadevalue")[0] != undefined) {
							initializationObject.cascading.defaultCascadeValue = eval(cascadingNode[0].getElementsByTagName("default_cascadevalue")[0].childNodes[0].nodeValue);
						}
					}
					if (eventsNode.length != 0) {
						initializationObject.events = {};
						for (var k = 0; k < eventsNode[0].childNodes.length; k++) {
							initializationObject.events[eventsNode[0].childNodes[k].nodeName] = eventsNode[0].childNodes[k].childNodes[0].nodeValue;
						}
					}
					if (defaultValueNode.length != 0) {
						if (defaultValueNode[0].childNodes[0].nodeValue == "true") {
							if (eval("manage_import_" + screenID + "_datasource_1") == "") {
								initializationObject.defaultValue = "";
							} else {
								detailDataSource = eval("manage_import_" + screenID + "_datasource_1");
								detailDataSource.read();
								initializationObject.defaultValue = detailDataSource.at(0)[fieldID];
							}
						}
					}
					if (typeNode[0].childNodes[0].nodeValue == "ddl") {
						eval("manage_import_" + screenID + "_" + fieldID + "= InitializeKendoDropDownList(initializationObject)");
					} else if (typeNode[0].childNodes[0].nodeValue == "combo") {
						eval("manage_import_" + screenID + "_" + fieldID + "= InitializeKendoComboBox(initializationObject)");
					} else if (typeNode[0].childNodes[0].nodeValue == "multiselect") {
						eval("manage_import_" + screenID + "_" + fieldID + "= InitializeKendoMultiSelect(initializationObject)");
					}
				}
			}
		}
	}
	dl = document.getElementById("manage_import_dl_1");
	dt = document.createElement("dt");
	dd1 = document.createElement("dd");
	dd2 = document.createElement("dd");
	label = document.createElement("label");
	element = document.createElement("input");
	hr = document.createElement("hr");
	dt.setAttribute("class", "term_two");
	dt.setAttribute("style", "margin-top:15px;");
	if($("#manage_import_dl_1 input").length !=0) {
		dl.appendChild(hr);
	}

	label.setAttribute("id", "manage_import_file_select_lbl");
	dd1.setAttribute("class", "colen");
	dd1.setAttribute("style", "margin-top:15px;");
	dd1.textContent = ":";
	dd2.setAttribute("class", "value");
	element.setAttribute("id", "manage_import_file_select");
	element.setAttribute("name", "manage_import_file_select");
	element.setAttribute("type", "file");
	
	span = document.createElement("span");
	span.setAttribute("class", "required");
	span.innerText = "*";
	label.appendChild(span);
	
	span = document.createElement("span");
	span.setAttribute("class", "k-invalid-msg");
	span.setAttribute("data-for", "manage_import_file_select");
	dd2.appendChild(span);
							
	dt.appendChild(label);
	dd2.appendChild(element);
	dl.appendChild(dt);
	dl.appendChild(dd1);
	dl.appendChild(dd2);
}