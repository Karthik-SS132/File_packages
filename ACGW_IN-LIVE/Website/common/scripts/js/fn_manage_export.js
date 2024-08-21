function fn_manage_export() {
	var newTemplateScreen, screenObject;
	value_changed_ind = false;

	var doc_list = [];
	var exportConfiguration = [];
	newTemplateScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (element, index) {
			return element == screenID;
		})[0];
	if (newTemplateScreen != undefined) {
		screenObject = eval(webNavigationController.getCurrentScreenID());
		exportConfiguration = screenObject.variable.standard.exportConfiguration;
	} else {
		exportConfiguration = eval("fn_" + screenID + "_PreExport()");
	}
	for (var content_items = 0; content_items < exportConfiguration.content.length; content_items++) {
		doc_list.push(exportConfiguration.content[content_items]);
	}

	/* DROP DOWN LIST INITIALIZATION - Export List */
	$("#manage_export_doc_list").kendoMultiSelect({
		placeholder : "ALL",
		dataTextField : "dispalyLabel",
		dataValueField : "fieldId",
		dataSource : doc_list
	});
	var width = $("#manage_export_doc_list").data("kendoMultiSelect").list.width();
	if (width > 161) {
		$("#manage_export_doc_list").data("kendoMultiSelect").list.width(width + 10);
	}
	manage_export_doc_list = $("#manage_export_doc_list").data("kendoMultiSelect");

	/* DROP DOWN LIST INITIALIZATION - AVAILABLE DOCUMENT LIST */
	/*$("#manage_export_doc_list").kendoDropDownList(
{
	optionLabel: "---Select---",
	dataTextField : "dispalyLabel",
	dataValueField : "fieldId",
	dataSource : doc_list
	});
	manage_export_doc_list = $("#manage_export_doc_list").data('kendoDropDownList');*/
	/*manage_export_doc_list = InitializeKendoDropDownList(
{
	fieldID: "manage_export_doc_list",
	dataSource:doc_list,
	dataTextField: "dispalyLabel",
	dataValueField: "fieldId",
	filterMode: false,
	defaultValue: "",
	template:"description"
	});*/

	$('#manage_export_doc_list').on('change', function () {
		value_changed_ind = true;
	});

	/*SUBMIT BUTTON CLICK*/
	$("#manage_export_submit_btn").click(function () {
		fn_manage_export_submit_btn_click();
	});

	/*CANCEL BUTTON CLICK*/
	$("#manage_export_cancel_btn").click(function () {
		fn_manage_export_cancel_btn_click();
	});

	AttachValidationRules("manage_export");
	ApplyConfiguredLabels("manage_export");
}
function fn_single_document_export(exportConfiguration) {
	userPreferenceJSON = [];
	userPreferenceJSON = retrievingUserPreferences(); // Retrieve User Preference
	try {
		if (userPreferenceJSON.length == 0) {
			var export_request_xml = '<document>';
			export_request_xml += getContextElements();
			if (screenID == "report_generic_data") {
				export_request_xml += '<fmt_name>' + report_generic_data.variable.standard.configurationParam + '</fmt_name>';
			} else {
				export_request_xml += '<fmt_name>' + screenID + '</fmt_name>';
			}
			export_request_xml += '<zip_file_name>' + displayLabel + '</zip_file_name>';
			export_request_xml += '<export_inputparam>';

			for (var k = 0; k < exportConfiguration.content.length; k++) {
				if (exportConfiguration.content[k].fieldId == exportConfiguration.content[0].fieldId) {
					if (exportConfiguration.content[k].exportType == "grid") {
						export_request_xml += '<source id="1" type="grid" name="' + exportConfiguration.content[k].fieldId + '">';
						export_request_xml += fn_prepare_export_request_xml_from_grid(exportConfiguration.content[k].fieldId);
						export_request_xml += '</source>';
					} else if (exportConfiguration.content[k].exportType == "html") {
						export_request_xml += '<source id="1" type="html" name="' + exportConfiguration.content[k].fieldId + '">';
						export_request_xml += fn_prepare_export_request_xml_from_html(exportConfiguration.content[k].fieldId);
						export_request_xml += '</source>';
					} else if (exportConfiguration.content[k].exportType == "chart") {
						export_request_xml += '<source id="1" type="chart" name="' + exportConfiguration.content[k].fieldId + '">';
						export_request_xml += fn_prepare_export_request_xml_from_kendoChart(exportConfiguration.content[k].fieldId);
						export_request_xml += '</source>';
					}
				}
			}
			export_request_xml += '</export_inputparam>';
			export_request_xml += "</context>";
			export_request_xml += "</document>";

			fn_convert_to_file(getXmlString(export_request_xml));
		}
		else {
			for (var k = 0; k < exportConfiguration.content.length; k++) {
				if (exportConfiguration.content[k].fieldId == exportConfiguration.content[0].fieldId) {
					if (exportConfiguration.content[k].exportType == "grid") {
						fn_exportGrid(exportConfiguration.content[k]);
					} else if (exportConfiguration.content[k].exportType == "html") {
						fn_exportHtml(exportConfiguration.content[k]);
					} else if (exportConfiguration.content[k].exportType == "chart") {
						fn_exportChart(exportConfiguration.content[k]);
					}
				}
			}
		}
	} catch (e) {
		alert("Export Failed!");
		console.log(e.message + "\n-----------------------------------");
	}
}
function fn_multi_documents_export(multi_document)
{
	var newTemplateScreen, screenObject;
	userPreferenceJSON = [];
	userPreferenceJSON = retrievingUserPreferences(); // Retrieve User Preference
	try {
		if (userPreferenceJSON.length == 0) {
			newTemplateScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (element, index) {
					return element == screenID;
				})[0];
			if (newTemplateScreen != undefined) {
				screenObject = eval(webNavigationController.getCurrentScreenID());
				var exportConfiguration = screenObject.variable.standard.exportConfiguration;
			} else {
				var exportConfiguration = eval("fn_" + screenID + "_PreExport()");
			}
			var export_request_xml = '<document>';
			export_request_xml += getContextElements();
			export_request_xml += '<fmt_name>' + screenID + '</fmt_name>';
			export_request_xml += '<zip_file_name>' + displayLabel + '</zip_file_name>';
			export_request_xml += '<export_inputparam>';
			if (multi_document.length != 0) {
				for (var j = 0; j < multi_document.length; j++) {
					for (var k = 0; k < exportConfiguration.content.length; k++) {
						var index = j + 1;
						if (multi_document[j] == exportConfiguration.content[k].fieldId) {
							if (exportConfiguration.content[k].exportType == "grid") {
								export_request_xml += '<source id="' + index + '" type="grid" name="' + exportConfiguration.content[k].fieldId + '">';
								export_request_xml += fn_prepare_export_request_xml_from_grid(exportConfiguration.content[k].fieldId);
								export_request_xml += '</source>';
							} else if (exportConfiguration.content[k].exportType == "html") {
								export_request_xml += '<source id="' + index + '" type="html" name="' + exportConfiguration.content[k].fieldId + '">';
								export_request_xml += fn_prepare_export_request_xml_from_html(exportConfiguration.content[k].fieldId);
								export_request_xml += '</source>';
							} else if (exportConfiguration.content[k].exportType == "chart") {
								export_request_xml += '<source id="' + index + '" type="chart" name="' + exportConfiguration.content[k].fieldId + '">';
								export_request_xml += fn_prepare_export_request_xml_from_kendoChart(exportConfiguration.content[k].fieldId);
								export_request_xml += '</source>';
							}
						}
					}
				}
			} else {
				for (var k = 0; k < exportConfiguration.content.length; k++) {
					var index = k + 1;
					if (exportConfiguration.content[k].exportType == "grid") {
						export_request_xml += '<source id="' + index + '" type="grid" name="' + exportConfiguration.content[k].fieldId + '">';
						export_request_xml += fn_prepare_export_request_xml_from_grid(exportConfiguration.content[k].fieldId);
						export_request_xml += '</source>';
					} else if (exportConfiguration.content[k].exportType == "html") {
						export_request_xml += '<source id="' + index + '" type="html" name="' + exportConfiguration.content[k].fieldId + '">';
						export_request_xml += fn_prepare_export_request_xml_from_html(exportConfiguration.content[k].fieldId);
						export_request_xml += '</source>';
					} else if (exportConfiguration.content[k].exportType == "chart") {
						export_request_xml += '<source id="' + index + '" type="chart" name="' + exportConfiguration.content[k].fieldId + '">';
						export_request_xml += fn_prepare_export_request_xml_from_kendoChart(exportConfiguration.content[k].fieldId);
						export_request_xml += '</source>';
					}
				}
			}
			export_request_xml += '</export_inputparam>';
			export_request_xml += "</context>";
			export_request_xml += "</document>";

			fn_convert_to_file(getXmlString(export_request_xml));
		} else {
			newTemplateScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (element, index) {
					return element == screenID;
				})[0];
			if (newTemplateScreen != undefined) {
				screenObject = eval(webNavigationController.getCurrentScreenID());
				var exportConfiguration = screenObject.variable.standard.exportConfiguration;
			} else {
				var exportConfiguration = eval("fn_" + screenID + "_PreExport()");
			}
			if (multi_document.length != 0) {
				for (var j = 0; j < multi_document.length; j++) {
					for (var k = 0; k < exportConfiguration.content.length; k++) {
						var index = j + 1;
						if (multi_document[j] == exportConfiguration.content[k].fieldId) {
							if (exportConfiguration.content[k].exportType == "grid") {
								fn_exportGrid(exportConfiguration.content[k]);
							} else if (exportConfiguration.content[k].exportType == "html") {
								fn_exportHtml(exportConfiguration.content[k]);
							} else if (exportConfiguration.content[k].exportType == "chart") {
								fn_exportChart(exportConfiguration.content[k]);
							}
						}
					}
				}
			} else {
				for (var k = 0; k < exportConfiguration.content.length; k++) {
					var index = k + 1;
					if (exportConfiguration.content[k].exportType == "grid") {
						fn_exportGrid(exportConfiguration.content[k]);
					} else if (exportConfiguration.content[k].exportType == "html") {
						fn_exportHtml(exportConfiguration.content[k]);
					} else if (exportConfiguration.content[k].exportType == "chart") {
						fn_exportChart(exportConfiguration.content[k]);
					}
				}
			}
		}
	export_window.close();
	} catch (e) {
		alert("Export Failed!");
		console.log(e.message + "\n-----------------------------------");
	}
}
function fn_exportGrid(object) {
	var columnsPreference = [],
	rows = [],
	cells = [],
	columnsSettings = [],
	nameValuePair = [];
	for (var i = 0; i < userPreferenceJSON.length; i++) {
		if (userPreferenceJSON[i].preference_area == "EXPORT") {
			columnsPreference = JSON.parse(userPreferenceJSON[i].preference_json);
			if (columnsPreference.grid_id == object.fieldId) {
				break;
			}
		}
	}

	for (var key in columnsPreference) {
		if (key != "grid_id" && typeof(columnsPreference[key]) != "object" && typeof(columnsPreference[key]) != "function") {
			nameValuePair.push({
				name : key,
				value : columnsPreference[key]
			});
		}
	}

	for (var i = 0; i < nameValuePair.length; i++) {
		cells.push({
			value : nameValuePair[i].value
		});
		columnsSettings.push({
			autoWidth: true
		});
	}

	rows.push({
		cells : cells
	});

	var grid = $("#" + object.fieldId).data("kendoGrid");
	if (grid.dataSource.data().length != 0) {
		for (var rws = 0; rws < grid.dataSource.data().length; rws++) {
			cells = [];
			for (var cols = 0; cols < nameValuePair.length; cols++) {
				cells.push({
					value : grid.dataSource.data()[rws][nameValuePair[cols].name]
				});
			}
			rows.push({
				cells : cells
			});
		}
	}

	var workbook = new kendo.ooxml.Workbook({
		sheets : [{
				columns: columnsSettings,
				rows : rows
			}
		]
	});

	kendo.saveAs({
		dataURI : workbook.toDataURL(),
		fileName : object.dispalyLabel + ".xlsx"
	});
}
function fn_exportHtml(object) {
	var data = eval('document.getElementById("' + object.fieldId + '");');
	kendo.saveAs({
		dataURI: "data:text/html," + encodeURI("<html>" + data.outerHTML + "</html>"),
		fileName: object.dispalyLabel + ".xls"
	});
}
function fn_exportChart(object) {
	var chart = $("#" + object.fieldId).data("kendoChart");
	kendo.saveAs({
		dataURI : chart.imageDataURL(),
		fileName : object.dispalyLabel + ".png"
	});
}
function fn_prepare_export_request_xml_from_grid(fieldId) {
	var grid_records = '';

	var grid = $("#" + fieldId).data("kendoGrid");

	if (grid.dataSource.data().length != 0) {
		var columns_array = [];
		for (var cols in grid.dataSource.options.schema.model.fields) {
			columns_array.push(cols);
		}
		for (rws = 0; rws < grid.dataSource.data().length; rws++) {
			grid_records += '<grid_record>';
			for (var cols = 0; cols < columns_array.length; cols++) {
				if (grid.dataSource.data()[rws][columns_array[cols]] == undefined) {
					grid_records += '<' + columns_array[cols] + '>' + '' + '</' + columns_array[cols] + '>';
				} else {
					if (typeof(grid.dataSource.data()[rws][columns_array[cols]]) == "string") {
						grid_records += '<' + columns_array[cols] + '>' + grid.dataSource.data()[rws][columns_array[cols]].replace(/&/g, "&amp;") + '</' + columns_array[cols] + '>';
					} else {
						grid_records += '<' + columns_array[cols] + '>' + grid.dataSource.data()[rws][columns_array[cols]] + '</' + columns_array[cols] + '>';
					}
				}
			}
			grid_records += '</grid_record>';
		}
	}
	return grid_records;
}
function fn_prepare_export_request_xml_from_html(fieldId) {
	var html_record = "<html_record>";
	var data = eval('document.getElementById("' + fieldId + '");');

	html_record += getXmlString("<html>" + data.outerHTML + "</html>");
	html_record += "</html_record>";

	return html_record;
}
function fn_prepare_export_request_xml_from_kendoChart(fieldId) {
	var chart_record = "<chart_record>";

	var kendo_chart = $("#" + fieldId).data("kendoChart");
	chart_record += kendo_chart.imageDataURL().substr(22);

	chart_record += "</chart_record>";
	return chart_record;
}
function fn_convert_to_file(content) {
	my_form = document.createElement('FORM');
	my_form.name = 'myForm';
	my_form.method = 'POST';
	my_form.action = getWebserverpath() + "common/components/Export/Export.aspx";

	my_tb = document.createElement('INPUT');
	my_tb.type = 'HIDDEN';
	my_tb.name = 'content';
	my_tb.value = content;
	my_form.appendChild(my_tb);
	document.body.appendChild(my_form);
	my_form.submit();

	FileDelete("Export/Temp/" + login_profile.guid_val + "_" + displayLabel + ".zip");
	
	try {
		eval("fn_" + screenID + "_PostExport()");
	} catch (ex) {
		return true;
	}
}
function fn_manage_export_submit_btn_click() {
	fn_multi_documents_export(manage_export_doc_list.value());
}
function fn_manage_export_cancel_btn_click() {
	isScreenEditable = false;
	if (value_changed_ind == true) {
		var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
		if (isClose == true)
			export_window.close();
	} else {
		export_window.close();
	}
}
