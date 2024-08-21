function ApplyDefaultValue(obj) {
	var xhttp,
	defaultValueXmlDoc;
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", "../configuration/default_value/" + obj.fileName + '_' + login_profile.client_id + '_' + login_profile.country_code + '.xml', false);
	xhttp.send();
	if (xhttp.status == 0 || xhttp.status == 404) {
		xhttp.open("GET", "../configuration/default_value/" + obj.fileName + '_' + login_profile.client_id + '.xml', false);
		xhttp.send();
		if (xhttp.status == 0 || xhttp.status == 404) {
			xhttp.open("GET", "../configuration/default_value/" + obj.fileName + '.xml', false);
			xhttp.send();
		}
	}
	defaultValueXmlDoc = xhttp.responseXML;
	if (defaultValueXmlDoc != null) {
		for (var i = 0; i < defaultValueXmlDoc.childNodes[0].childNodes.length; i++) {
			var node = defaultValueXmlDoc.childNodes[0].childNodes[i];
			if (node.childNodes.length != 0) {
				obj.serviceObject[node.nodeName] = node.childNodes[0].nodeValue;
			}
		}
	}
	return obj.serviceObject;
}
function FilterChildFieldData(filterObject) {
	var childFieldArray;
	if (filterObject.fieldData.value() != "" && filterObject.fieldData.value() != "---Select---") {
		childFieldArray = executeService_retrieve_listof_values(filterObject.inputParameter);
	}
	else {
		childFieldArray = [];
	}
	filterObject.childFieldDatasource.data(childFieldArray);
	filterObject.childFieldData.setDataSource(filterObject.childFieldDatasource);
	filterObject.childFieldData.value("");
	filterObject.childFieldData.trigger('change');
}

function MapToSchemaModel(dataSource, data) {
	var reorderedData = {};
	for(var i in dataSource.options.schema.model.fields) {
		eval("reorderedData." + i.toString() + "=data." + i.toString());
	}
	return reorderedData;
}

function GetInputParamXML(sectionID) {
		var fieldID, screenID, sectionNumber, sectionName, datePickerSplit, dateTimePickerSplit, dateTimePickerDateSplit, dateTimePickerTimeSplit, inputParamXML ="";
	
	sectionNumber = sectionID.charAt(sectionID.length - 1);
	sectionName = sectionID.substring(0,sectionID.lastIndexOf("_"));
	screenID = sectionName.substring(0,sectionName.lastIndexOf("_"));
	
	if ($("#" + screenID).data("screenType") == "report") {
		inputParamXML = "<inputparam_xml_for_report>";
		for (var i = 0; i < $("#" + screenID + " .preference_for_filters input,select").length; i++) {
			fieldID = $("#" + screenID + " .preference_for_filters input,select")[i].id.substring(screenID.length + 1);
			if(fieldID != "") {
				if ($("#" + screenID + "_" + fieldID).data("role") == "datepicker") {
					if($("#" + screenID + "_" + fieldID).val() != "") {
						if ($("#" + screenID + "_" + fieldID).val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)$/)) {
							datePickerSplit = $("#" + screenID + "_" + fieldID).val().split("-");
							inputParamXML += "<" + fieldID + ">" + datePickerSplit[2] + "-" + datePickerSplit[1] + "-" + datePickerSplit[0] + "</" + fieldID + ">";
						}
						else {
							inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
						}
					}				
					else {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
				}
				else if ($("#" + screenID + "_" + fieldID).data("role") == "datetimepicker") {
					if($("#" + screenID + "_" + fieldID).val() != "") {
						if ($("#" + screenID + "_" + fieldID).val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)[\s]([01]\d|2[0123])[:]([0-5]\d)$/)) {
							dateTimePickerSplit = $("#" + screenID + "_" + fieldID).val().split(" ");
							dateTimePickerDateSplit = dateTimePickerSplit[0].split("-");
							dateTimePickerTimeSplit = dateTimePickerSplit[1].split(":");
							inputParamXML += "<" + fieldID + "_date>" + dateTimePickerDateSplit[2] + "-" + dateTimePickerDateSplit[1] + "-" + dateTimePickerDateSplit[0] + "</" + fieldID + "_date>";
							inputParamXML += "<" + fieldID + "_hour>" + dateTimePickerTimeSplit[0] + "</" + fieldID + "_hour>";
							inputParamXML += "<" + fieldID + "_minute>" + dateTimePickerTimeSplit[1] + "</" + fieldID + "_minute>";
						}
						else {
							inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
						}
					}				
					else {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
				}
				else if ($("#" + screenID + "_" + fieldID).data("role") == "combobox") {				
					var comboBoxData = $("#" + screenID + "_" + fieldID).data("kendoComboBox");
					if (comboBoxData.value() == "") {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
					else {
						inputParamXML += "<" + fieldID + ">" + comboBoxData.value() + "</" + fieldID + ">";
					}
				}
				else if ($("#" + screenID + "_" + fieldID).data("role") == "multiselect") {
					var multiSelectData = $("#" + screenID + "_" + fieldID).data("kendoMultiSelect");
					if(multiSelectData.value().length == 0) {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
					else {
						inputParamXML += "<" + fieldID + ">";
						for(var j = 0; j < multiSelectData.value().length; j++) {
							if(j < multiSelectData.value().length - 1) {
								inputParamXML += multiSelectData.value()[j] + ",";
							}
							else {
								inputParamXML += multiSelectData.value()[j];
							}
						}
						inputParamXML += "</" + fieldID + ">";
					}
				}
				else if ($("#" + screenID + "_" + fieldID).data("role") == "dropdownlist") {
					var dropDownListData = $("#" + screenID + "_" + fieldID).data("kendoDropDownList");
					if (dropDownListData.value() == "") {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
					else {
						inputParamXML += "<" + fieldID + ">" + dropDownListData.value() + "</" + fieldID + ">";
					}
				}
				else {
					if ($("#" + screenID + "_" + fieldID).val() == "") {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
					else {
						inputParamXML += "<" + fieldID + ">" + getXmlString($("#" + screenID + "_" + fieldID).val()) + "</" + fieldID + ">";
					}
				}
			}
		}
	}
	else {
		inputParamXML = "<inputparam>";
		for (var i = 0; i < $("#" + screenID + "_dl_" + sectionNumber + " input,select").length; i++) {
			fieldID = $("#" + screenID + "_dl_" + sectionNumber + " input,select")[i].id.substring(screenID.length + 1);
			if(fieldID != "") {
				if ($("#" + screenID + "_" + fieldID).data("role") == "datepicker") {
					if($("#" + screenID + "_" + fieldID).val() != "") {
						if ($("#" + screenID + "_" + fieldID).val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)$/)) {
							datePickerSplit = $("#" + screenID + "_" + fieldID).val().split("-");
							inputParamXML += "<" + fieldID + ">" + datePickerSplit[2] + "-" + datePickerSplit[1] + "-" + datePickerSplit[0] + "</" + fieldID + ">";
						}
						else {
							inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
						}
					}				
					else {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
				}
				else if ($("#" + screenID + "_" + fieldID).data("role") == "datetimepicker") {
					if($("#" + screenID + "_" + fieldID).val() != "") {
						if ($("#" + screenID + "_" + fieldID).val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)[\s]([01]\d|2[0123])[:]([0-5]\d)$/)) {
							dateTimePickerSplit = $("#" + screenID + "_" + fieldID).val().split(" ");
							dateTimePickerDateSplit = dateTimePickerSplit[0].split("-");
							dateTimePickerTimeSplit = dateTimePickerSplit[1].split(":");
							inputParamXML += "<" + fieldID + "_date>" + dateTimePickerDateSplit[2] + "-" + dateTimePickerDateSplit[1] + "-" + dateTimePickerDateSplit[0] + "</" + fieldID + "_date>";
							inputParamXML += "<" + fieldID + "_hour>" + dateTimePickerTimeSplit[0] + "</" + fieldID + "_hour>";
							inputParamXML += "<" + fieldID + "_minute>" + dateTimePickerTimeSplit[1] + "</" + fieldID + "_minute>";
						}
						else {
							inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
						}
					}				
					else {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
				}
				else if ($("#" + screenID + "_" + fieldID).data("role") == "combobox") {				
					var comboBoxData = $("#" + screenID + "_" + fieldID).data("kendoComboBox");
					if (comboBoxData.value() == "") {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
					else {
						inputParamXML += "<" + fieldID + ">" + comboBoxData.value() + "</" + fieldID + ">";
					}
				}
				else if ($("#" + screenID + "_" + fieldID).data("role") == "multiselect") {
					var multiSelectData = $("#" + screenID + "_" + fieldID).data("kendoMultiSelect");
					if(multiSelectData.value().length == 0) {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
					else {
						inputParamXML += "<" + fieldID + ">";
						for(var j = 0; j < multiSelectData.value().length; j++) {
							if(j < multiSelectData.value().length - 1) {
								inputParamXML += multiSelectData.value()[j] + ",";
							}
							else {
								inputParamXML += multiSelectData.value()[j];
							}
						}
						inputParamXML += "</" + fieldID + ">";
					}
				}
				else if ($("#" + screenID + "_" + fieldID).data("role") == "dropdownlist") {
					var dropDownListData = $("#" + screenID + "_" + fieldID).data("kendoDropDownList");
					if (dropDownListData.value() == "") {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
					else {
						inputParamXML += "<" + fieldID + ">" + dropDownListData.value() + "</" + fieldID + ">";
					}
				}
				else {
					if ($("#" + screenID + "_" + fieldID).val() == "") {
						inputParamXML += "<" + fieldID + ">" + "ALL" + "</" + fieldID + ">";
					}
					else {
						inputParamXML += "<" + fieldID + ">" + getXmlString($("#" + screenID + "_" + fieldID).val()) + "</" + fieldID + ">";
					}
				}
			}
		}
	}
	if ($("#" + screenID).data("screenType") == "report") {
		inputParamXML += "</inputparam_xml_for_report>";
	}
	else {
		inputParamXML += "</inputparam>";
	}	
	return inputParamXML;
}

function GetTransportParameter(inputParameter) {
	var stringInput = '{"context": {"sessionId":"' + login_profile.guid_val + '","userId":"' + login_profile.user_id + '","client_id":"' + login_profile.client_id + '","locale_id":"' + login_profile.locale_id + '","country_code":"' + login_profile.country_code + '"';
	if(inputParameter != undefined) {
		var inputParameterString = JSON.stringify(inputParameter);
		stringInput += ',' + inputParameterString.substring(1,inputParameterString.length-1);
	}
	stringInput += '}}';
	return stringInput;
}

function GetTransportParameterForReport(inputParameter) {	
	var serviceDetails;
	serviceDetails = "<document>";
	serviceDetails = serviceDetails + getContextElements();
	if(inputParameter != undefined) {
		serviceDetails = serviceDetails + "<inputparam>";
		serviceDetails = serviceDetails + inputParameter;
		 serviceDetails = serviceDetails + "</inputparam>";
	}
	serviceDetails = serviceDetails + "</context>";
	serviceDetails = serviceDetails + "</document>";
	return serviceDetails;	
}

function GetTransportUrl(applicationName,serviceName,path) {
	var transportUrl = getWebserverpath() +  "JSONServiceEndpoint.aspx?appName=" + applicationName + "&serviceName=" + serviceName + "&path=" + path;
	return transportUrl;
}

function GetTransportUrlForReport(applicationName,serviceName,path) {
	var transportUrl = getWebserverpath() +  "ServiceCommonEndpoint.aspx?appName=" + applicationName + "&serviceName=" + serviceName + "&path=" + path;
	return transportUrl;
}

function ProcessTransportResponse(data, textStatus) {
	if (textStatus == "success") {
		var dataResponseText = JSON.parse(data.responseText);	
		if (dataResponseText.UADSApplicationExceptionClass != null) {
			alert(dataResponseText.UADSApplicationExceptionClass.errorDescription);
			return false;
		}
		else if (dataResponseText.context == null && dataResponseText.length == 0) {			
			alert("No records found.");
		}
		return true;
	}
	else if (textStatus == "timeout") {
		alert("Sorry your request is timed out. Please try again.");		
	}
}

function DeleteData(informationType,field1,field2,field3,field4,field5,field6,field7,field8,field9,field10) {
	p_information_type = ""; p_field_1 = ""; p_field_2 = ""; p_field_3 = ""; p_field_4 = ""; p_field_5 = ""; p_field_6 = ""; p_field_7 = "";p_field_8 = ""; p_field_9 = ""; p_field_10 = "";
	if (informationType != undefined){p_information_type = informationType;}
	if (field1 != undefined){p_field_1 = field1;}
	if (field2 != undefined){p_field_2 = field2;}
	if (field3 != undefined){p_field_3 = field3;}
	if (field4 != undefined){p_field_4 = field4;}
	if (field5 != undefined){p_field_5 = field5;}
	if (field6 != undefined){p_field_6 = field6;}
	if (field7 != undefined){p_field_7 = field7;}
	if (field8 != undefined){p_field_8 = field8;}
	if (field9 != undefined){p_field_9 = field9;}
	if (field10 != undefined){p_field_10 = field10;}
	var returnValue = executeService_delete_data();
	return returnValue;
}

function ValidateKeyField(fieldId,screenInformation,field1,field2,field3,field4,field5,field6,field7,field8,field9,field10) {
	screenname = ""; validation_field_1 = ""; validation_field_2 = ""; validation_field_3 = ""; validation_field_4 = ""; validation_field_5 = ""; validation_field_6 = ""; validation_field_7 = ""; validation_field_8 = ""; validation_field_9 = ""; validation_field_10 = "";
	if (screenInformation != undefined){screenname = screenInformation;}
	if (field1 != undefined){validation_field_1 = field1;}
	if (field2 != undefined){validation_field_2 = field2;}
	if (field3 != undefined){validation_field_3 = field3;}
	if (field4 != undefined){validation_field_4 = field4;}
	if (field5 != undefined){validation_field_5 = field5;}
	if (field6 != undefined){validation_field_6 = field6;}
	if (field7 != undefined){validation_field_7 = field7;}
	if (field8 != undefined){validation_field_8 = field8;}
	if (field9 != undefined){validation_field_9 = field9;}
	if (field10 != undefined){validation_field_10 = field10;}
	var returnValue = executeService_validate_key_field();
	if(returnValue == "true") {
		alert("Data Already Exists");
		$("#" + fieldId).val("");
		$("#" + fieldId).focus();
	}
	return returnValue;
}

function GetListOfValues(cacheProperty,codeType,searchField1,searchField2) {
	code_type = ""; search_field_1 = ""; search_field_2 = "";
	if (codeType != undefined){code_type = codeType;}
	if (searchField1 != undefined){search_field_1 = searchField1;}
	if (searchField2 != undefined){search_field_2 = searchField2;}
	if (cacheProperty == true) {
		if (eval("codeValueList." + codeType) != undefined) {
			var returnValue = [];
			var codeValueListLength = eval("codeValueList." + codeType + ".length");
			for(var i = 0; i < codeValueListLength; i++) {
				var objectToPush = eval("codeValueList." + codeType + "[i]");
				returnValue.push(objectToPush);
			}
			return returnValue;
		}
		else {
			var returnValueDetails = executeService_retrieve_listof_values_for_codes();	
			var returnValue = [];			
			eval("codeValueList." + code_type + "= returnValueDetails");
			var codeValueListLength = eval("codeValueList." + codeType + ".length");
			for(var i = 0; i < codeValueListLength; i++) {
				var objectToPush = eval("codeValueList." + codeType + "[i]");
				returnValue.push(objectToPush);
			}
			return returnValue;
		}
	}	
	else {
		var returnValue = executeService_retrieve_listof_values_for_codes();
		return returnValue;
	}
}

function SaveCustomFields(sectionID) {
	var fieldID, screenID, sectionNumber, sectionName, customFields, inputParamXML = "<inputparam>";
	sectionNumber = sectionID.charAt(sectionID.length - 1);
	sectionName = sectionID.substring(0,sectionID.lastIndexOf("_"));
	screenID = sectionName.substring(0,sectionName.lastIndexOf("_"));
	customFields = $.grep($("#" + screenID + "_dl_" + sectionNumber + " input"), function(element, index) {
		return element.id.match(screenID + "_udf");
	});
	for(var i = 0; i < customFields.length; i++) {
		fieldID = customFields[i].id.substring(screenID.length + 1);
		if(fieldID != "") {
			if($("#" + screenID + "_" + fieldID).data("role") == "datepicker") {
				if ($("#" + screenID + "_" + fieldID).data("kendoDatePicker").value() != null) {
					inputParamXML += "<" + fieldID + ">" + kendo.toString($("#" + screenID + "_" + fieldID).data("kendoDatePicker").value(), "yyyy-MM-dd") + "</" + fieldID + ">";
					inputParamXML += "<" + fieldID + "_hour" + ">00</" + fieldID + "_hour" + ">";
					inputParamXML += "<" + fieldID + "_minute" + ">00</" + fieldID + "_minute" + ">";
				}
				else {
					inputParamXML += "<" + fieldID + "></" + fieldID + ">";
					inputParamXML += "<" + fieldID + "_hour" + ">00</" + fieldID + "_hour" + ">";
					inputParamXML += "<" + fieldID + "_minute" + ">00</" + fieldID + "_minute" + ">";
				}
			}
			else if($("#" + screenID + "_" + fieldID).data("role") == "datetimepicker") {
				if ($("#" + screenID + "_" + fieldID).data("kendoDateTimePicker").value() != null) {
					inputParamXML += "<" + fieldID + ">" + kendo.toString($("#" + screenID + "_" + fieldID).data("kendoDateTimePicker").value(), "yyyy-MM-dd") + "</" + fieldID + ">";
					inputParamXML += "<" + fieldID + "_hour" + ">" + kendo.toString($("#" + screenID + "_" + fieldID).data("kendoDateTimePicker").value(), "HH") + "</" + fieldID + "_hour" + ">";
					inputParamXML += "<" + fieldID + "_minute" + ">" + kendo.toString($("#" + screenID + "_" + fieldID).data("kendoDateTimePicker").value(), "mm") + "</" + fieldID + "_minute" + ">";
				}
				else {
					inputParamXML += "<" + fieldID + "></" + fieldID + ">";
					inputParamXML += "<" + fieldID + "_hour" + ">00</" + fieldID + "_hour" + ">";
					inputParamXML += "<" + fieldID + "_minute" + ">00</" + fieldID + "_minute" + ">";
				}
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "dropdownlist") {
				if ($("#" + screenID + "_" + fieldID).data("kendoDropDownList").value() != "---Select---") {
					inputParamXML += "<" + fieldID + ">" + getXmlString($("#" + screenID + "_" + fieldID).data("kendoDropDownList").value()) + "</" + fieldID + ">";
				}
				else {
					inputParamXML += "<" + fieldID + "></" + fieldID + ">";
				}
			}
			else {
				if ($("#" + screenID + "_" + fieldID).prop("type") == "checkbox") {
					if ($("#" + screenID + "_" + fieldID).is(":checked")) {
						inputParamXML += "<" + fieldID + ">1</" + fieldID + ">";
					}
					else {
						inputParamXML += "<" + fieldID + ">0</" + fieldID + ">";
					}				
				}
				else {
					inputParamXML += "<" + fieldID + ">" + getXmlString($("#" + screenID + "_" + fieldID).val()) + "</" + fieldID + ">";
				}			
			}
		}
	}
	inputParamXML += "</inputparam>";
	return inputParamXML;
}

function RetrieveCustomFields(sectionID, dataSource) {
	var sectionNumber, sectionName, screenID, customFields, dataSourceRecord, datePickerSplit;
	dataSourceRecord = dataSource.at(0);
	sectionNumber = sectionID.charAt(sectionID.length - 1);
	sectionName = sectionID.substring(0,sectionID.lastIndexOf("_"));
	screenID = sectionName.substring(0,sectionName.lastIndexOf("_"));
	customFields = $.grep($("#" + screenID + "_dl_" + sectionNumber + " input"), function(element, index) {
		return element.id.match(screenID + "_udf");
	});
	for(var i = 0; i < customFields.length; i++) {
		fieldID = customFields[i].id.substring(screenID.length + 1);
		if(fieldID != "") {
			if($("#" + screenID + "_" + fieldID).data("role") == "datepicker") {
				if(dataSourceRecord[fieldID] != undefined && dataSourceRecord[fieldID] != "1900-01-01") {
					datePickerSplit = dataSourceRecord[fieldID].split("-");
					$("#" + screenID + "_" + fieldID).data("kendoDatePicker").value(new Date(parseInt(datePickerSplit[0]), parseInt(datePickerSplit[1]) - 1, parseInt(datePickerSplit[2])));
				}
			}
			else if($("#" + screenID + "_" + fieldID).data("role") == "datetimepicker") {
				if(dataSourceRecord[fieldID] != undefined && dataSourceRecord[fieldID] != "1900-01-01") {
					datePickerSplit = dataSourceRecord[fieldID].split("-");
					$("#" + screenID + "_" + fieldID).data("kendoDateTimePicker").value(new Date(parseInt(datePickerSplit[0]), parseInt(datePickerSplit[1]) - 1, parseInt(datePickerSplit[2]), parseInt(dataSourceRecord[fieldID + "_hour"]), parseInt(dataSourceRecord[fieldID + "_minute"])));
				}
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "numerictextbox") {
				$("#" + screenID + "_" + fieldID).data("kendoNumericTextBox").value(parseInt(dataSourceRecord[fieldID]));
			}
			else if ($("#" + screenID + "_" + fieldID).prop("type") == "checkbox") {
				if (dataSourceRecord[fieldID] == "1") {
					$("#" + screenID + "_" + fieldID).attr("checked", true);
				}
			}
			else {
				$("#" + screenID + "_" + fieldID).val(dataSourceRecord[fieldID]);
			}
		}
	}
}

function ActivateViewModeInCustomFields(sectionID) {
	var fieldID, screenID, sectionNumber, sectionName, customFields;
	sectionNumber = sectionID.charAt(sectionID.length - 1);
	sectionName = sectionID.substring(0,sectionID.lastIndexOf("_"));
	screenID = sectionName.substring(0,sectionName.lastIndexOf("_"));
	customFields = $.grep($("#" + screenID + "_dl_" + sectionNumber + " input"), function(element, index) {
		return element.id.match(screenID + "_udf");
	});
	for(var i = 0; i < customFields.length; i++) {
		fieldID = customFields[i].id.substring(screenID.length + 1);
		if(fieldID != "") {
			if($("#" + screenID + "_" + fieldID).data("role") == "datepicker" || $("#" + screenID + "_" + fieldID).data("role") == "datetimepicker" || $("#" + screenID + "_" + fieldID).data("role") == "dropdownlist" || $("#" + screenID + "_" + fieldID).data("role") == "numerictextbox") {
				eval(screenID + "_" + fieldID + ".enable(false)");
			}
			else {
				$("#" + screenID + "_" + fieldID).attr('disabled','disabled').css({backgroundColor:"#F5F5F5"});
			}
		}
	}
}

function ValidationForTransport(screenInformation,field1,field2,field3,field4,field5,field6,field7,field8,field9,field10) {
	screenname = ""; validation_field_1 = ""; validation_field_2 = ""; validation_field_3 = ""; validation_field_4 = ""; validation_field_5 = ""; validation_field_6 = ""; validation_field_7 = ""; validation_field_8 = ""; validation_field_9 = ""; validation_field_10 = "";
	if (screenInformation != undefined){screenname = screenInformation;}
	if (field1 != undefined){validation_field_1 = field1;}
	if (field2 != undefined){validation_field_2 = field2;}
	if (field3 != undefined){validation_field_3 = field3;}
	if (field4 != undefined){validation_field_4 = field4;}
	if (field5 != undefined){validation_field_5 = field5;}
	if (field6 != undefined){validation_field_6 = field6;}
	if (field7 != undefined){validation_field_7 = field7;}
	if (field8 != undefined){validation_field_8 = field8;}
	if (field9 != undefined){validation_field_9 = field9;}
	if (field10 != undefined){validation_field_10 = field10;}
	var returnValue = executeService_validate_key_field();
	return returnValue;
}


/* USER PREFERENCE FUNCTIONS FOR FILTERS- SECTION BEGINS */
	
	
function DefineFavouritesForFilters(screenID)
{
	/* DROP DOWN LIST INITIALIZATION - Favourite List*/
	var returnValue = InitializeKendoDropDownList({
		fieldID: screenID + "_favourite_list",
		dataSource: {
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values",
			inputParameter: {
				p_lov_code: "USERPREFERENCE_FOR_FILTERS",
				p_search_field_1: login_profile.user_id,
				p_search_field_2: screenID,
				p_search_field_3:"FILTERS",
				p_search_field_4:"",
				p_search_field_5:"",
			}
		},
		dataTextField: "p_description_field_1",
		dataValueField: "p_value_field_1",
		filterMode: false,
		template:'code',
		events: {
			change: "fn_favourites_for_filter_change"
		}
	});
	eval(screenID + "_favourite_list = returnValue");
	retrievingUserPreferences();
	favObj = {favourite_id:'DEFAULT'}
	ApplyUserPreferences(screenID);
	
}

function retrievingUserPreferences(){
	userPreferenceString = executeService_retrieve_user_preferences({
		p_screen_id: screenID
	});
	return userPreferenceString;
}
function fn_favourites_for_filter_change(e)
{
	if($("#"+screenID+"_favourite_list").val() == "---Select---"){
		favObj = {favourite_id:"DEFAULT"};
	}
	else{
		favObj = {favourite_id:$("#"+screenID+"_favourite_list").val()};
	}
	ApplyUserPreferences(screenID);
	
}
function DeleteUserPreferences(screenID)
{
	if($("#"+screenID+"_favourite_list").val() != "---Select---")
	{
		var isClose = confirm("Are you sure you want to delete this selected preference?");
		if (isClose) {
			
			var returnValue = DeleteData("USERPREFERENCE_FOR_FILTERS",login_profile.user_id,screenID,'FILTERS',$("#"+screenID+"_favourite_list").val());
			if (returnValue == 'SP001') {
				alert('Deleted successfully');
				eval(screenID + "_favourite_list.dataSource.read()");
				for(var x=0;x<$("#"+screenID+" .preference_for_filters  input,select").length;x++)
				{
					var id = $("#"+screenID+" .preference_for_filters  input,select")[x].id;
					if(id != "" && $("#"+id+"_div").is(":visible") == true)
					{	
						$("#"+id+"_div").hide();
					}
					
				}
			}
			
		}
		
	}
	else
	{
		alert("Select preference to delete .");
	}

}
function ApplyUserPreferences(screenID) {
	
	var fieldID, userPreferenceObject, datePickerData, dateTimePickerData, comboBoxData, multiSelectData, dropDownListData, datePickerSplit, dateTimePickerSplit, dateTimePickerDateSplit, dateTimePickerTimeSplit;	
	for(var x=0;x<$("#"+screenID+" .preference_for_filters  input,select").length;x++)
	{
		var id = $("#"+screenID+" .preference_for_filters  input,select")[x].id;
		if(id != "" && $("#"+id+"_div").is(":visible") == true)
		{	
			$("#"+id+"_div").hide();
		}
		
	}
	for(var preferenStrCtr = 0 ;preferenStrCtr<userPreferenceString.length;preferenStrCtr++)
	{
		
		if( (userPreferenceString[preferenStrCtr]['preference_area'] == 'FILTERS') &&(userPreferenceString[preferenStrCtr]['favourite_id'] ==  favObj.favourite_id ) ) 
		{
			if (userPreferenceString[preferenStrCtr]['preference_json'] != undefined && userPreferenceString[preferenStrCtr]['preference_json'] != "") {
				userPreferenceObject = JSON.parse(userPreferenceString[preferenStrCtr]['preference_json']);		
				$.each(userPreferenceObject,function(fieldID,fieldValue)
				{
					if (fieldID != "") {
						if($("#" + screenID + "_" + fieldID).length == 0)
						{
							AddCustomFilterForReport(screenID,fieldID);
							ApplyConfiguredLabelsForReport(screenID,fieldID);
						}
						if (fieldValue != undefined) 
						{					
							if ($("#" + screenID + "_" + fieldID).data("role") == "datepicker") { // DATE PICKER 
								datePickerData = $("#" + screenID + "_" + fieldID).data("kendoDatePicker");
								//if (fieldValue != "ALL") {
									datePickerSplit = fieldValue.split("-");
									datePickerData.value(new Date(datePickerSplit[2], (parseInt(datePickerSplit[1]) - 1), datePickerSplit[0]));
									$('[data-for="'+screenID + "_" + fieldID+'"]').text("");
								//}
							}
							else if ($("#" + screenID + "_" + fieldID).data("role") == "datetimepicker") { // DATE TIME PICKER 
								dateTimePickerData = $("#" + screenID + "_" + fieldID).data("kendoDateTimePicker");
								//if (fieldValue != "ALL") {
									dateTimePickerSplit = fieldValue.split(" ");
									dateTimePickerDateSplit = dateTimePickerSplit[0].split("-");
									dateTimePickerTimeSplit = dateTimePickerSplit[1].split(":");
									dateTimePickerData.value(new Date(dateTimePickerDateSplit[2], (parseInt(dateTimePickerDateSplit[1]) - 1), dateTimePickerDateSplit[0], dateTimePickerTimeSplit[0], dateTimePickerTimeSplit[1]));
									$('[data-for="'+screenID + "_" + fieldID+'"]').text("");
								//}
							}
							else if ($("#" + screenID + "_" + fieldID).data("role") == "combobox") { // COMBO BOX 
								comboBoxData = $("#" + screenID + "_" + fieldID).data("kendoComboBox");
								//if (fieldValue != "ALL") {
									comboBoxData.value(fieldValue);
									$('[data-for="'+screenID + "_" + fieldID+'"]').text("");
								//}
							}
							else if ($("#" + screenID + "_" + fieldID).data("role") == "multiselect") { // MULTI SELECT 
								multiSelectData = $("#" + screenID + "_" + fieldID).data("kendoMultiSelect");
								//if (fieldValue != "ALL") {
									multiSelectData.value(fieldValue.split(","));
									$('[data-for="'+screenID + "_" + fieldID+'"]').text("");
								//}
							}
							else if ($("#" + screenID + "_" + fieldID).data("role") == "dropdownlist") { // DROP DOWN LIST 
								dropDownListData = $("#" + screenID + "_" + fieldID).data("kendoDropDownList");
								//if (fieldValue != "ALL") {
									dropDownListData.value(fieldValue);
									$('[data-for="'+screenID + "_" + fieldID+'"]').text("");
								//}
							}
							else {
								//if (fieldValue != "ALL") {
									$("#" + screenID + "_" + fieldID).val(fieldValue);
								//}
							}
						
						}	
						
						$("#" + screenID + "_" + fieldID+"_"+"div").show();
					}
				
				});
			}
		}
	}
	var counter = 1;
	for(var i=0;i<$("#"+screenID+" .preference_for_filters  input,select").length;i++)
	{		
		if($($("#"+screenID+" .preference_for_filters  input,select")[i]).attr("id") != undefined) {
			var id = $("#"+screenID+" .preference_for_filters  input,select")[i].id;
			if ($("#"+id+"_div").is(":visible") == true) {
				if (counter % 3 == 0) {
					console.log($("#"+id+"_div"));
					var hr = document.createElement("hr");
					$("#" + id + "_div").append(hr);
				}				
				counter = counter+1;
			}
		}
	}
}

function SaveUserPreferences(screenID) {	
	var preferenceWindowContent = "";
	userPreferenceObject = {};
	userPreferenceObject["screenID"] = screenID;
	userPreferenceWindow = InitializeKendoWindow({
		fieldID: 'user_preference_window',
		windowTitle: 'Set Preference',
		//windowHeight: 100,
		//windowWidth: 400,
		screenID: 'manage_user_preference',
		//windowContent: preferenceWindowContent
	});
}

function fn_manage_user_preference() {	

	AttachValidationRules('manage_user_preference');
	var fieldID, preferredFieldValueObject = {}, comboBoxData, multiSelectData, dropDownListData, valueString;
	/* CREATING USER PREFERENCE OBJECT FOR FILTERS */
	 for (var inputCounter = 0; inputCounter < $("#" + userPreferenceObject.screenID + " .preference_for_filters input,select").length; inputCounter++) {
		fieldID = $("#" + userPreferenceObject.screenID + " .preference_for_filters input,select")[inputCounter].id.substring(userPreferenceObject.screenID.length + 1);
		if (fieldID != "") {
			if ($("#" + userPreferenceObject.screenID + "_" + fieldID + "_div").css("display") != "none") {
				if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "datepicker") { // DATE PICKER 
					if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val() != "") {
						if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)$/)) {
							preferredFieldValueObject[fieldID] = $("#" + userPreferenceObject.screenID + "_" + fieldID).val();
						}
						else {
							preferredFieldValueObject[fieldID] = "ALL";
						}
					}				
					else {
						preferredFieldValueObject[fieldID] = "ALL";
					}
				}
				else if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "datetimepicker") { //DATE TIME PICKER 
					if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val() != "") {
						if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)[\s]([01]\d|2[0123])[:]([0-5]\d)$/)) {
							preferredFieldValueObject[fieldID] = $("#" + userPreferenceObject.screenID + "_" + fieldID).val();
						}
						else {
							preferredFieldValueObject[fieldID] = "ALL";
						}
					}				
					else {
						preferredFieldValueObject[fieldID] = "ALL";
					}
				}
				else if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "combobox") { // COMBO BOX 
					comboBoxData = $("#" + userPreferenceObject.screenID + "_" + fieldID).data("kendoComboBox");
					if (comboBoxData.value() == "") {
						preferredFieldValueObject[fieldID] = "ALL";
					}
					else {
						preferredFieldValueObject[fieldID] = comboBoxData.value();
					}
				}
				else if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "multiselect") { // MULTI SELECT 
					multiSelectData = $("#" + userPreferenceObject.screenID + "_" + fieldID).data("kendoMultiSelect");
					if (multiSelectData.value().length == 0) {
						preferredFieldValueObject[fieldID] = "ALL";
					}
					else {
						valueString = "";
						for (var msValueCount = 0; msValueCount < multiSelectData.value().length; msValueCount++) {
							if(msValueCount < multiSelectData.value().length - 1) {
								valueString += multiSelectData.value()[msValueCount] + ",";
							}
							else {
								valueString += multiSelectData.value()[msValueCount];
							}
						}
						preferredFieldValueObject[fieldID] = valueString;
					}
				}
				else if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "dropdownlist") { // DROP DOWN LIST 
					dropDownListData = $("#" + userPreferenceObject.screenID + "_" + fieldID).data("kendoDropDownList");
					if (dropDownListData.value() == "") {
						preferredFieldValueObject[fieldID] = "ALL";
					}
					else {
						preferredFieldValueObject[fieldID] = dropDownListData.value();
					}
				}
				else {
					if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val() == "") { // TEXT BOX 
						preferredFieldValueObject[fieldID] = "ALL";
					}
					else {
						preferredFieldValueObject[fieldID] = $("#" + userPreferenceObject.screenID + "_" + fieldID).val();
					}
				}
			}
		}		
	}
	for (var inputCounter = 0; inputCounter < $("#" + userPreferenceObject.screenID + " .preference_for_default_filters input,select").length; inputCounter++) {
		fieldID = $("#" + userPreferenceObject.screenID + " .preference_for_default_filters input,select")[inputCounter].id.substring(userPreferenceObject.screenID.length + 1);
		if (fieldID != "") {
			if ($("#" + userPreferenceObject.screenID + "_" + fieldID + "_div").css("display") != "none") {
				if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "datepicker") { // DATE PICKER 
					if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val() != "") {
						if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)$/)) {
							preferredFieldValueObject[fieldID] = $("#" + userPreferenceObject.screenID + "_" + fieldID).val();
						}
						else {
							preferredFieldValueObject[fieldID] = "ALL";
						}
					}				
					else {
						preferredFieldValueObject[fieldID] = "ALL";
					}
				}
				else if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "datetimepicker") { //DATE TIME PICKER 
					if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val() != "") {
						if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)[\s]([01]\d|2[0123])[:]([0-5]\d)$/)) {
							preferredFieldValueObject[fieldID] = $("#" + userPreferenceObject.screenID + "_" + fieldID).val();
						}
						else {
							preferredFieldValueObject[fieldID] = "ALL";
						}
					}				
					else {
						preferredFieldValueObject[fieldID] = "ALL";
					}
				}
				else if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "combobox") { // COMBO BOX 
					comboBoxData = $("#" + userPreferenceObject.screenID + "_" + fieldID).data("kendoComboBox");
					if (comboBoxData.value() == "") {
						preferredFieldValueObject[fieldID] = "ALL";
					}
					else {
						preferredFieldValueObject[fieldID] = comboBoxData.value();
					}
				}
				else if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "multiselect") { // MULTI SELECT 
					multiSelectData = $("#" + userPreferenceObject.screenID + "_" + fieldID).data("kendoMultiSelect");
					if (multiSelectData.value().length == 0) {
						preferredFieldValueObject[fieldID] = "ALL";
					}
					else {
						valueString = "";
						for (var msValueCount = 0; msValueCount < multiSelectData.value().length; msValueCount++) {
							if(msValueCount < multiSelectData.value().length - 1) {
								valueString += multiSelectData.value()[msValueCount] + ",";
							}
							else {
								valueString += multiSelectData.value()[msValueCount];
							}
						}
						preferredFieldValueObject[fieldID] = valueString;
					}
				}
				else if ($("#" + userPreferenceObject.screenID + "_" + fieldID).data("role") == "dropdownlist") { // DROP DOWN LIST 
					dropDownListData = $("#" + userPreferenceObject.screenID + "_" + fieldID).data("kendoDropDownList");
					if (dropDownListData.value() == "") {
						preferredFieldValueObject[fieldID] = "ALL";
					}
					else {
						preferredFieldValueObject[fieldID] = dropDownListData.value();
					}
				}
				else {
					if ($("#" + userPreferenceObject.screenID + "_" + fieldID).val() == "") { // TEXT BOX 
						preferredFieldValueObject[fieldID] = "ALL";
					}
					else {
						preferredFieldValueObject[fieldID] = $("#" + userPreferenceObject.screenID + "_" + fieldID).val();
					}
				}
			}
		}		
	}
	userPreferenceObject["preferredFieldValue"] = preferredFieldValueObject;
	
	$("#manage_user_preference_submit_btn").click(function(e) {
		var validator = $("#manage_user_preference").data("kendoValidator");
		if (validator.validate()) {
			fn_manage_user_preference_submit_btn_click();
		}
		else{
			alert("Please enter the favourite name .");
		}
	});
	value_changed_ind = false;
	$("#manage_user_preference_favourite_id").on("change", function() {
		value_changed_ind = true;
	});
	$('#manage_user_preference_cancel_btn').on('click',function()
	{
		if (value_changed_ind == true) {
			if (confirm("You have modified one or more values on the form. Do you want to cancel the changes")) {
				userPreferenceWindow.close();
			}				 
		} 
		else {
			userPreferenceWindow.close();
		}
	});	
	
	
	$("#manage_user_preference_favourite_id").on('blur', function() {	   
		if ($(this).val() != "") {
			var task_valid_ind = ValidateKeyField("manage_user_preference_favourite_id", "USERPREFERENCE", login_profile.user_id,userPreferenceObject.screenID,'FILTERS',$(this).val());
		}
	});
}

function fn_manage_user_preference_submit_btn_click() {
	var returnValue;
	
	if(userPreferenceObject["preferredFieldValue"] == "" || userPreferenceObject["preferredFieldValue"] == undefined)
	{
		alert("Select some filters to Set preference .");
		return false;
	}
	/* SAVING USER PREFERENCE OBJECT STRING */
	returnValue = executeService_save_user_preferences({
		p_screen_id: userPreferenceObject.screenID,
		p_default_preference_ind:'true',
		p_preference_area:"FILTERS",
		p_favorite_id:$("#manage_user_preference_favourite_id").val(),
		p_user_preference: JSON.stringify(userPreferenceObject["preferredFieldValue"])
	});
	
	if (returnValue == "SP001") {
		alert("Your Preference has been set successfully");
		user_preference_window.close();
		
		eval(screenID + "_favourite_list.dataSource.read()");
		retrievingUserPreferences();
	}
}

/* USER PREFERENCE FUNCTIONS FOR FILTERS- SECTION ENDS */

/* USER PREFERENCE FUNCTIONS  FOR GRID AND EXPORT- SECTION STARTS */

function UserPreferencesForGridAndExport(GRID_ID)
{
	userPreferenceGridObject = [{grid_id :GRID_ID}]
	child_window =  InitializeKendoWindow(
		{
			fieldID: 'user_preference_for_grid_and_export_window',
			windowTitle: 'Favourite',
		//	windowHeight: 900,
		//	windowWidth: 900,
			screenID: 'user_preference_for_grid_and_export'
		});
}

function fn_user_preference_for_grid_and_export()
{
	
	/* DROP DOWN LIST INITIALIZATION - Favourite Type*/
	user_preference_for_grid_and_export_fav_type = InitializeKendoDropDownList({
		fieldID: 'user_preference_for_grid_and_export_fav_type',
		dataSource: [{code:"DATA",description:"Data Fields Display"},{code:"EXPORT",description:"Export Fields"}],
		dataTextField: "description",
		dataValueField: "code",
		filterMode: false,
		template:'description',
		events: {
			change: "fn_user_preference_for_grid_and_export_fav_type_change"
		}
	});
	
	$("#user_preference_for_grid_and_export_ul1").kendoSortable({
		connectWith: "#user_preference_for_grid_and_export_ul2",
		
	//	handler: ".handler",
		placeholder: placeholder,
		
	    //cursor: "url('../../webui//images/bg.png'), default"
		
	});

	$("#user_preference_for_grid_and_export_ul2").kendoSortable({
		connectWith: "#user_preference_for_grid_and_export_ul1",
		
		//handler: ".handler",
		placeholder: placeholder,
		
	   // cursor: "url('../../webui//images/bg.png'), default"
	});
	function placeholder(element) {
		return $("<li class='list-item' id='placeholder' style='width:200px'>Drop Here!</li>");
    }
	AttachValidationRules('user_preference_for_grid_and_export');
	
	
	$('#right_connector').on("click",function()
	{
		var $this = $(this);
		$this.css('border-color','red');
		setTimeout(function()
		{
			$this.css('border-color','white');
		},500);
		var ul2 = $("#user_preference_for_grid_and_export_ul2")[0];var fieldID,removedList;
		removedList = [];
		for(var i=0;i<$("#user_preference_for_grid_and_export_ul1 li").length;i++)
		{
			if($("#"+$("#user_preference_for_grid_and_export_ul1 li input")[i].id).is(":checked") == true)
			{
				
				fieldID = $("#user_preference_for_grid_and_export_ul1 li label")[i].id
				
				var li = document.createElement("li");
				var dt = document.createElement("dt");
				var label = document.createElement("Label");
				var element = document.createElement("input");
	
				
				li.setAttribute("id", "li"+"_"+fieldID);	
				dt.setAttribute("class", "term_one");	
				dt.setAttribute("style", "width:80px");
				label.setAttribute("class", "list-item handler");	
				label.setAttribute("id",fieldID);
				$(label).text( $("#"+$("#user_preference_for_grid_and_export_ul1 li label")[i].id).text() );
			   
				element.setAttribute("id", fieldID+"_checkbox");
				element.setAttribute("type", "checkbox");
				element.setAttribute("class", "list-checkbox");
				element.setAttribute("name", fieldID+"_checkbox");	
				
				
				li.appendChild(element);	
				li.appendChild(label);	
				ul2.appendChild(li);
				removedList.push($("#user_preference_for_grid_and_export_ul1 li")[i].id);
			}
		}
		for(var j=0;j<removedList.length;j++)
		{
			
			$("#user_preference_for_grid_and_export_ul1").find('#'+removedList[j]).remove();
		}
	});
	

	$('#left_connector').on("click",function()
	{
		var $this = $(this);
		$this.css('border-color','red');
		setTimeout(function()
		{
			$this.css('border-color','white');
		},500);
		var ul1 = $("#user_preference_for_grid_and_export_ul1")[0];var fieldID,removedFromFavouriteList;
		removedFromFavouriteList = [];
		for(var i=0;i<$("#user_preference_for_grid_and_export_ul2 li").length;i++)
		{
			if($("#"+$("#user_preference_for_grid_and_export_ul2 li input")[i].id).is(":checked") == true)
			{
				
				fieldID = $("#user_preference_for_grid_and_export_ul2 li label")[i].id
				
				var li = document.createElement("li");
				var dt = document.createElement("dt");
				var label = document.createElement("Label");
				var element = document.createElement("input");
	
				
				li.setAttribute("id", "li"+"_"+fieldID);	
				dt.setAttribute("class", "term_one");	
				dt.setAttribute("style", "width:80px");
				label.setAttribute("class", "list-item handler");	
				label.setAttribute("id",fieldID);
				$(label).text( $("#"+$("#user_preference_for_grid_and_export_ul2 li label")[i].id).text() );
			   
				element.setAttribute("id", fieldID+"_checkbox");
				element.setAttribute("type", "checkbox");
				element.setAttribute("class", "list-checkbox");
				element.setAttribute("name", fieldID+"_checkbox");	
				
				
				li.appendChild(element);	
				li.appendChild(label);	
				ul1.appendChild(li);
				removedFromFavouriteList.push($("#user_preference_for_grid_and_export_ul2 li")[i].id);
			}
		}
		for(var k=0;k<removedFromFavouriteList.length;k++)
		{

			$("#user_preference_for_grid_and_export_ul2").find('#'+removedFromFavouriteList[k]).remove();
		}
	});
	
	$('#user_preference_for_grid_and_export_submit_btn').on('click',function()
	{
		
		var returnValue,preferenceArea,user_preference_for_grid_and_export_fav_type_value;
		var validator = $("#user_preference_for_grid_and_export").data("kendoValidator");
		if(validator.validate())
		{
			if($("#user_preference_for_grid_and_export_ul2 li").length > 0)
			{
				preferredFieldValueObject = {};
				for(var i=0;i<$("#user_preference_for_grid_and_export_ul2 li").length;i++)
				{
					preferredFieldValueObject[$("#user_preference_for_grid_and_export_ul2 li label")[i].id]=$("#"+$("#user_preference_for_grid_and_export_ul2 li label")[i].id).text()
				}
				preferredFieldValueObject['grid_id'] = userPreferenceGridObject[0].grid_id;
				if(user_preference_for_grid_and_export_fav_type.value() == "DATA")
					{
						 preferenceArea = "EXPORT";
						 user_preference_for_grid_and_export_fav_type_value = "GRID";
					}
					else
					{
						 preferenceArea = "GRID";
						 user_preference_for_grid_and_export_fav_type_value = "EXPORT";
					}
				returnValue = executeService_save_user_preferences({
					p_screen_id: screenID,
					p_default_preference_ind:'true',
					p_preference_area:user_preference_for_grid_and_export_fav_type_value,
					p_favorite_id:'MYFAVOURITE',
					p_user_preference: JSON.stringify(preferredFieldValueObject)
				});
				if($('#user_preference_for_grid_and_export_checkbox').is(':checked') == true)
				{
					
					returnValue = executeService_save_user_preferences({
						p_screen_id: screenID,
						p_default_preference_ind:'true',
						p_preference_area:preferenceArea,
						p_favorite_id:'MYFAVOURITE',
						p_user_preference: JSON.stringify(preferredFieldValueObject)
					});
					if (returnValue == "SP001") {
						
						alert("Your Preference has been set successfully for both data and export display");
						retrievingUserPreferences();
						gridColumns = GetGridColumns(screenID+"_"+"detail"+"_"+ userPreferenceGridObject[0].grid_id.split(screenID+"_"+'grid'+"_"+"")[1], userPreferenceGridObject[0].grid_id,true);
						 gridDS = eval(userPreferenceGridObject[0].grid_id+".dataSource");
						
						eval(userPreferenceGridObject[0].grid_id+ ".setOptions({columns: gridColumns, dataSource: gridDS})");
						ApplyConfiguredLabelsForReport(screenID);
						child_window.close();
					
					}
				
				}
				else
				{
					if (returnValue == "SP001") {
						var gridDS,gridColumns;
						alert("Your Preference has been set successfully");
						retrievingUserPreferences();
						gridColumns = GetGridColumns(screenID+"_"+"detail"+"_"+ userPreferenceGridObject[0].grid_id.split(screenID+"_"+'grid'+"_"+"")[1], userPreferenceGridObject[0].grid_id,true);
						gridDS = eval(userPreferenceGridObject[0].grid_id+".dataSource");
						
						eval(userPreferenceGridObject[0].grid_id+ ".setOptions({columns: gridColumns, dataSource: gridDS})");						
						ApplyConfiguredLabelsForReport(screenID);
						child_window.close();
					
					}
				}
			}
			else
			{
				alert('Select some fields to set favourite');
				return false;
			}
		}
		else
		{
			alert('Fill all the fields');
		}
	});
	value_changed_ind = false;
	$("#user_preference_for_grid_and_export_fav_type").on("move", function() {
		value_changed_ind = true;
	});
	$('#user_preference_for_grid_and_export_cancel_btn').on('click',function()
	{
		if (value_changed_ind == true) {
			if (confirm("You have modified one or more values on the form. Do you want to cancel the changes")) {
				child_window.close();
			}				 
		} 
		else {
			child_window.close();
		}
	});	
	
	
	$('#user_preference_for_grid_and_export_delete_btn').on('click',function()
	{
		if($("#user_preference_for_grid_and_export_ul2 li").length > 0)
		{
			var isClose = confirm("Are you sure you want to delete this selected preference?"), user_preference_for_grid_and_export_fav_type_value ;
			if (isClose) {
				if( user_preference_for_grid_and_export_fav_type.value()  == 'DATA')
				{
					 user_preference_for_grid_and_export_fav_type_value = 'GRID';
				}
				else
				{
					 user_preference_for_grid_and_export_fav_type_value =  user_preference_for_grid_and_export_fav_type.value();
				}
				var returnValue = DeleteData("USERPREFERENCE_FOR_FILTERS",login_profile.user_id,screenID,user_preference_for_grid_and_export_fav_type_value,'MYFAVOURITE');
				if (returnValue == 'SP001') {
					alert('Deleted successfully');
						$("#user_preference_for_grid_and_export_ul1").empty();
						$("#user_preference_for_grid_and_export_ul2").empty();
						
						$('#user_preference_for_grid_and_export_submit_btn').show();
						retrievingUserPreferences();
						user_preference_for_grid_and_export_fav_type.trigger('change');
						gridColumns = GetGridColumns(screenID+"_"+"detail"+"_"+ userPreferenceGridObject[0].grid_id.split(screenID+"_"+'grid'+"_"+"")[1], userPreferenceGridObject[0].grid_id,true);
						gridDS = eval(userPreferenceGridObject[0].grid_id+".dataSource");
						
						eval(userPreferenceGridObject[0].grid_id+ ".setOptions({columns: gridColumns, dataSource: gridDS})");
						ApplyConfiguredLabelsForReport(screenID);
				}
				
			}
		}
		else
		{
			alert('Select some fields to delete');
			return false;
		}
	});

	
}
function fn_user_preference_for_grid_and_export_fav_type_change()
{
	screenID =  navigation_map[navigation_map.length-1].screenID
	$("#user_preference_for_grid_and_export_ul1").empty();
	$("#user_preference_for_grid_and_export_ul2").empty();


	if( user_preference_for_grid_and_export_fav_type.value()  == 'DATA')
	{
		var user_preference_for_grid_and_export_fav_type_value = 'GRID';
	}
	else
	{
		var user_preference_for_grid_and_export_fav_type_value =  user_preference_for_grid_and_export_fav_type.value();
	}
	var ul1 = $("#user_preference_for_grid_and_export_ul1")[0];
	var ul2 = $("#user_preference_for_grid_and_export_ul2")[0];
	var grid_indicator = false;
	var screenNode, headerNode, fieldNodes;
	screenNode = xmlDocREPORT.getElementsByTagName(screenID);
	if (screenNode.length != 0)
	{
		headerNode = screenNode[0].getElementsByTagName( screenID+"_"+"detail"+"_"+ userPreferenceGridObject[0].grid_id.split(screenID+"_"+'grid'+"_"+"")[1]);
	}
	if (userPreferenceString.length > 0) {
		for(var preferenStrCtr = 0 ;preferenStrCtr<userPreferenceString.length;preferenStrCtr++)
		{
			
			if ( userPreferenceString[preferenStrCtr]['preference_area'] == user_preference_for_grid_and_export_fav_type_value ) 
			{
				if (userPreferenceString[preferenStrCtr]['preference_json'] != undefined && userPreferenceString[preferenStrCtr]['preference_json'] != "") 
				{
					userPreferenceObject = JSON.parse(userPreferenceString[preferenStrCtr]['preference_json']);		
					if(userPreferenceObject['grid_id'] ==userPreferenceGridObject[0].grid_id)
					{
						if (headerNode.length != 0)
						{
							fieldNodes = headerNode[0].getElementsByTagName("field");
							for (var j = 0; j < fieldNodes.length; j++)
							{
								id = fieldNodes[j].getAttribute("id");
								id_indicator = false;
								$.each(userPreferenceObject,function(fieldID,fieldValue)
								{
								
									if (fieldID != "grid_id" && fieldID == id )
									{
										id_indicator = true;
									}	
								
								});
								if(id_indicator == false)
								{
									var li = document.createElement("li");
									var dt = document.createElement("dt");
									var label = document.createElement("Label");
									var element = document.createElement("input");
									
									li.setAttribute("id", "li"+"_"+id);	
									li.setAttribute("class", "disabled");	
									
									dt.setAttribute("class", "term_one");	
									dt.setAttribute("style", "width:80px");
									label.setAttribute("class", "list-item handler");	
									label.setAttribute("id",id);	
									
									element.setAttribute("id", id+"_checkbox");
									element.setAttribute("type", "checkbox");
									element.setAttribute("class", "list-checkbox");
									element.setAttribute("name", id+"_checkbox");	
									//element.setAttribute("style","line-height:25px");	
									li.appendChild(element);
									li.appendChild(label);									
									ul1.appendChild(li);
								
								}
							}
							$.each(userPreferenceObject,function(fieldID,fieldValue)
							{
							
								if (fieldID != "grid_id" )
								{
									id_indicator = true;
									/* FORMING HTML ELEMENT */
									var li = document.createElement("li");
									var dt = document.createElement("dt");
									var label = document.createElement("Label");
									
						
									
									li.setAttribute("id", "li"+"_"+fieldID);	
									li.setAttribute("class", "disabled");	
									dt.setAttribute("class", "term_one");	
									dt.setAttribute("style", "width:80px");
									label.setAttribute("class", "list-item handler");	
									label.setAttribute("id",fieldID);	
									
									var element = document.createElement("input");
									element.setAttribute("id", fieldID+"_checkbox");
									element.setAttribute("type", "checkbox");
									element.setAttribute("class", "list-checkbox");
									element.setAttribute("name", fieldID+"_checkbox");	
									li.appendChild(element);
									li.appendChild(label);	
									ul2.appendChild(li);
								}	
							
							});
						
						}
						
					}
				}
				if ( userPreferenceString[preferenStrCtr]['favourite_id'] ==  'DEFAULT' )
				{
					$('#user_preference_for_grid_and_export_delete_btn').hide();
					$('#user_preference_for_grid_and_export_checkbox').prop('checked',false);
				}
				else
				{
					$('#user_preference_for_grid_and_export_delete_btn').show();
					$('#user_preference_for_grid_and_export_checkbox').prop('checked',false);
				}
			}
			
		}
	} else {
		if (headerNode.length != 0)
		{
			fieldNodes = headerNode[0].getElementsByTagName("field");
			for (var j = 0; j < fieldNodes.length; j++)
			{
				id = fieldNodes[j].getAttribute("id");
				id_indicator = false;
				
				if(id_indicator == false)
				{
					var li = document.createElement("li");
					var dt = document.createElement("dt");
					var label = document.createElement("Label");
					var element = document.createElement("input");
					
					li.setAttribute("id", "li"+"_"+id);	
					li.setAttribute("class", "disabled");	
					
					dt.setAttribute("class", "term_one");	
					dt.setAttribute("style", "width:80px");
					label.setAttribute("class", "list-item handler");	
					label.setAttribute("id",id);	
					
					element.setAttribute("id", id+"_checkbox");
					element.setAttribute("type", "checkbox");
					element.setAttribute("class", "list-checkbox");
					element.setAttribute("name", id+"_checkbox");	
					//element.setAttribute("style","line-height:25px");	
					li.appendChild(element);
					li.appendChild(label);									
					ul1.appendChild(li);
				
				}
			}		
		}
	}
	ApplyConfiguredLabelsForUserPreference(screenID);
	
	if( user_preference_for_grid_and_export_fav_type.value()  == 'EXPORT')
	{
		$('#user_preference_for_grid_and_export_copy_favourites').text("Copy my selection to data");
	}
	else
	{
		$('#user_preference_for_grid_and_export_copy_favourites').text("Copy my selection to export");
	}
	
	
}
/* USER PREFERENCE FUNCTIONS  FOR GRID AND EXPORT- SECTION ENDS */

/* FUNCTIONS BELOW FOR MSR */
function SaveCustomFieldsForMobile(screenID) {
	var inputParamXML = "";
	inputParamXML += "<document>";
	inputParamXML += "<context>";
	inputParamXML += "<inputparam>";
	var screenNode = xmlDocUI.getElementsByTagName(screenID);
	if (screenNode.length != 0) {
		var blocks = screenNode[0].childNodes;
		/* SCALAR AND VECTOR BLOCKS OF THE ACTIVE SCREEN */
		for (var blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
			var blockName = blocks[blockIndex].nodeName;
			if (blockName.indexOf("header") != -1) {
				/* SCALAR BLOCK */
				inputParamXML += "<p_" + blockName.substr(blockName.indexOf("header")) + "_xml>";
				var fieldNodes = blocks[blockIndex].getElementsByTagName("field");
				/* SCALAR FIELDS */
				for (var fieldIndex = 0; fieldIndex < fieldNodes.length; fieldIndex++) {
					displayProperty = fieldNodes[fieldIndex].getAttribute("display");
					if (displayProperty == "true") {
						var fieldID = fieldNodes[fieldIndex].getAttribute("id");
						var typeValue = fieldNodes[fieldIndex].getElementsByTagName("type")[0].childNodes[0].nodeValue;
						if (typeValue == "ddl") {
							inputParamXML += "<" + fieldID + ">" + eval(screenID + "_" + fieldID + ".value()") + "</" + fieldID + ">";
						} else if (typeValue == "signature") {
							inputParamXML += "<" + fieldID + ">" + eval(screenID + "_" + fieldID + ".getSignatureImage()") + "</" + fieldID + ">";
						} else {
							inputParamXML += "<" + fieldID + ">" + $("#" + screenID + "_" + fieldID).val() + "</" + fieldID + ">";
						}
					}
				}
				inputParamXML += "</p_" + blockName.substr(blockName.indexOf("header")) + "_xml>";
			} else if (blockName.indexOf("detail") != -1) {
				/* VECTOR BLOCK */
				displayProperty = blocks[blockIndex].getAttribute("display");
				if (displayProperty == "true") {
					inputParamXML += "<p_" + blockName.substr(blockName.indexOf("detail")) + "_xml>";
					var gridData = eval(screenID + "_grid_" + blockName.substr(blockName.lastIndexOf("_") + 1) + ".dataSource.data()");
					for (var i = 0; i < gridData.length; i++) {
						inputParamXML += "<list>";
						for (var key in gridData[i]) {
							if (key != "uid" && key != "dirty" && typeof(gridData[i][key]) != "object" && typeof(gridData[i][key]) != "function") {
								inputParamXML += "<" + key + ">" + gridData[i][key] + "</" + key + ">";
							}
						}
						inputParamXML += "</list>";
					}
					inputParamXML += "</p_" + blockName.substr(blockName.indexOf("detail")) + "_xml>";
				}
			}
		}
	}
	inputParamXML += "</inputparam>";
	inputParamXML += "</context>";
	inputParamXML += "</document>";
	console.log(inputParamXML);
	return inputParamXML;
}
function applyEmptyValues(screenID) {
	var screenNode,
	fieldNodes,
	displayProperty,
	fieldID,
	typeNode,
	typeValue;
	var screenNode = xmlDocUI.getElementsByTagName(screenID);
	if (screenNode.length != 0) {
		var blocks = screenNode[0].childNodes;
		/* SCALAR AND VECTOR BLOCKS OF THE ACTIVE SCREEN */
		for (var blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
			var blockName = blocks[blockIndex].nodeName;
			if (blockName.indexOf("header") != -1) {
				/* SCALAR BLOCK */
				var fieldNodes = blocks[blockIndex].getElementsByTagName("field");
				/* SCALAR FIELDS */
				for (var fieldIndex = 0; fieldIndex < fieldNodes.length; fieldIndex++) {
					displayProperty = fieldNodes[fieldIndex].getAttribute("display");
					typeValue = fieldNodes[fieldIndex].getElementsByTagName("type")[0].childNodes[0].nodeValue;
					fieldID = screenID + "_" + fieldNodes[fieldIndex].getAttribute("id")
						if (displayProperty == "true") {
							if (typeValue == "ddl") {
								eval(fieldID + ".value('')");
							} else {
								$("#" + fieldID).val("");
							}
						}
				}
			} else if (blockName.indexOf("detail") != -1) {
				/* VECTOR BLOCK */
				displayProperty = blocks[blockIndex].getAttribute("display");
				if (displayProperty == "true") {
					var detailIndex = fieldID.substr(fieldID.lastIndexOf("_") + 1);
					eval(screenID + "_grid_" + detailIndex + ".dataSource.data([])");
				}
			}
		}
	}
}

function applySavedValues(screenID,savedXmlString) {
	var savedXmlDoc = loadXMLString(savedXmlString);
	var getBlock = function (parent, child) {
		var parentBlock = $.grep($(xmlDocUI.getElementsByTagName(screenID)[0].childNodes), function (element, index) {
				return element.nodeName.indexOf(parent) != -1;
			});
		var childBlock = $.grep($(parentBlock[0].childNodes), function (element, index) {
				return element.getAttribute("id") == child;
			});
		return childBlock;
	};

	inputparam = savedXmlDoc.getElementsByTagName("inputparam");
	for (var inputparam_count = 0; inputparam_count < inputparam[0].childNodes.length; inputparam_count++) {
		var blockName = inputparam[0].childNodes[inputparam_count].nodeName; // inputparam block name
		if (blockName.indexOf("header") != -1) {
			var parentNode = blockName.substring(blockName.indexOf("header"), blockName.length - 4); // inputparam block name
			var headerNodes = inputparam[0].childNodes[inputparam_count].childNodes;
			for (var headerNodeCount = 0; headerNodeCount < headerNodes.length; headerNodeCount++) {
				if (headerNodes[headerNodeCount].childNodes.length != 0) {
					var childNode = headerNodes[headerNodeCount].nodeName;
					uiProperties = getBlock(parentNode, childNode);
					var type = uiProperties[0].getElementsByTagName("type")[0].childNodes[0].nodeValue;
					if (type == "ddl") {
						eval(screenID + "_" + headerNodes[headerNodeCount].nodeName + ".value('" + headerNodes[headerNodeCount].childNodes[0].nodeValue + "')");
					} else {
						$("#" + screenID + "_" + headerNodes[headerNodeCount].nodeName).val(headerNodes[headerNodeCount].childNodes[0].nodeValue);
					}
				}
			}
		} else if (blockName.indexOf("detail") != -1) {
			if (inputparam[0].childNodes[inputparam_count].childNodes.length != 0) {
				var testDataSource = InitializeDataSource(loadXMLString(new XMLSerializer().serializeToString(inputparam[0].childNodes[inputparam_count])), 10, "p_detail_1_xml/list");
				var Ind = blockName.substring(blockName.indexOf("detail"), blockName.length - 4);
				eval(screenID + "_grid_" + Ind.substr(Ind.lastIndexOf("_") + 1) + ".dataSource.data(testDataSource.data())");
			}
		}
	}
};