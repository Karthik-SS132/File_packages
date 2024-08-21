InitializeGlobalValidationRules();

var ruleBank = [{
	ruleName: "Mandatory",
	ruleType: "kendoRule",
	validationMessage: "Should not be empty"
}, {
	ruleName: "DependentMandatory",
	ruleType: "kendoRule",
	validationMessage: "Should not be empty"
}, {
	ruleName: "KeyfieldPattern",
	ruleType: "kendoRule",
	rulePattern: "/^[.\\w-\\/]*$/",
	validationMessage: "Only a-zA-Z0-9._-/ are allowed"
}, {
	ruleName: "OtherfieldPattern",
	ruleType: "kendoRule",
	rulePattern: "/^[\\w\\s#-\\/\\\\&\\(\\):;.,\\[\\]]*$/",
	validationMessage: "Only a-zA-Z0-9_-\\#/& :;.,()[] are allowed"
}, {
	ruleName: "NumberPattern",
	ruleType: "kendoRule",
	rulePattern: "/^[\\d]*$/",
	validationMessage: "This is not a valid Number"
}, {
	ruleName: "DatePattern",
	ruleType: "kendoRule",
	rulePattern: "/^(0[1-9]|[12]\\d|3[0-1])[-](0[1-9]|1[012])[-](19\\d\\d|20\\d\\d)$/",
	validationMessage: "Date should be in 'dd-mm-yyyy' format"
}, {
	ruleName: "DateTimePattern",
	ruleType: "kendoRule",
	rulePattern: "/^(0[1-9]|[12]\\d|3[0-1])[-](0[1-9]|1[012])[-](19\\d\\d|20\\d\\d)[\\s]([01]\\d|2[0123])[:]([0-5]\\d)$/",
	validationMessage: "Date & Time should be in 'dd-mm-yyyy hh:mm' (24 hour) format"
}, {
	ruleName: "ApplyDefaultValue",
	ruleType: "nonKendoRule"
}, {
	ruleName: "OnLoadMandatory",
	ruleType: "kendoRule",
	validationMessage: "Should not be empty"
}, {
	ruleName: "OnLoadDisplay", 
	ruleType: "nonKendoRule"
}, {
	ruleName: "OnLoadEnable",
	ruleType: "nonKendoRule"
}];

function AttachValidationRules(screenID, eventVerb) {
	if (screenID == "manage_call_register_close" || screenID == "manage_functional_role_employee_edit" || screenID == "manage_call_register_edit" || screenID == "manage_users_edit" || screenID == "manage_code_maintenance_edit" || screenID == "manage_call_register"|| screenID == "manage_user_group_edit" || screenID == "manage_customer_master_edit" || screenID == "manage_customer_location_edit" || screenID == "manage_company_master" || screenID=="manage_asset_master_edit" || screenID == "manage_equipment_master_edit" || screenID=="manage_employee_master_edit" || screenID == "manage_category_type_link_edit" || screenID=="manage_item_master_edit"||screenID =='manage_item_master_rate_edit' || screenID=="manage_item_master_edit_child" || screenID=="manage_task_code_edit" || screenID=="manage_resource_rate_edit" || screenID == "manage_call_status_event_log" || screenID == "manage_call_status_change" || screenID == "manage_resourcelist_master_edit" || screenID == "manage_resourcelist_master_edit_child" || screenID == "manage_partlist_template_master_edit" || screenID == "manage_partlist_template_master_edit_child" || screenID == "manage_call_register_wfeventverb_status_change" || screenID == "manage_user_preference"  ||  screenID == "user_preference_for_grid_and_export") {
		var returnObject = {};
		returnObject = GenerateScreenValidationRules(screenID, eventVerb);
		
		$("#" + screenID).kendoValidator({
			rules: returnObject.rules,
			messages: returnObject.messages
		});
	}
	else {			
		$("#" + screenID).kendoValidator({
			rules: globalValidationRules,
			messages: globalValidationMessages
		});
	}
	return true;
}

function InitializeGlobalValidationRules() {
	globalValidationRules = {
		validationRuleMandatory: function(e) {
			if (e.data("validationRule") != undefined && e.data("validationRule").match("mandatory") != null) {
				if (e.data("role") == "dropdownlist") {
					if (e.val() == "---Select---" || e.val() == "") {
						return false;
					}
				}
				else {
					if (e.val() == "") {
						return false;
					}
				}
			}
			return true;
		},
		validationRuleKeyfieldPattern: function(e) {
			if (e.data("validationRule") != undefined && e.data("validationRule").match("keyfield_pattern") != null) {
				if (e.val() != "") {
					if (!e.val().match(/^[.\w-\/]*$/)) {
						return false;
					}
				}
			}
			return true;
		},
		validationRuleOtherfieldPattern: function(e) {
			if (e.data("validationRule") != undefined && e.data("validationRule").match("otherfield_pattern") != null) {
				if (e.val() != "") {
					if (!e.val().match(/^[\w\s#-\/\\&\(\):;.,\[\]]*$/)) {
						return false;
					}
				}
			}
			return true;
		},
		validationRuleNumberPattern: function(e) {
			if (e.data("validationRule") != undefined && e.data("validationRule").match("number_pattern") != null) {
				if (e.val() != "") {
					if (!e.val().match(/^[\d]*$/)) {
						return false;
					}
				}
			}
			return true;
		},
		validationRuleDatePickerPattern: function(e) {
			if (e.data("validationRule") != undefined && e.data("validationRule").match("datepicker_pattern") != null) {
				if (e.val() != "") {
					if (!e.val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)$/)) {
						return false;
					}
				}
			}
			return true;
		},
		validationRuleDateTimePickerPattern: function(e) {
			if (e.data("validationRule") != undefined && e.data("validationRule").match("datetimepicker_pattern") != null) {
				if (e.val() != "") {
					if (!e.val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)[\s]([01]\d|2[0123])[:]([0-5]\d)$/)) {
						return false;
					}
				}
			}
			return true;
		}
	};
	
	globalValidationMessages = {
		validationRuleMandatory: "Should not be empty",
		validationRuleKeyfieldPattern: "Only a-zA-Z0-9._-/ are allowed",
		validationRuleOtherfieldPattern: "Only a-zA-Z0-9_-\\#/& :;.,()[] are allowed",
		validationRuleNumberPattern: "This is not a valid Number",
		validationRuleDatePickerPattern: "Date should be in 'dd-mm-yyyy' format",
		validationRuleDateTimePickerPattern: "Date & Time should be in 'dd-mm-yyyy hh:mm' (24 hour) format",
		email: "This is not a valid E-mail id"
	};
	return true;
}

function GenerateScreenValidationRules(screenID, eventVerb) {
	var screenValidationRules = {}, screenValidationMessages = {email: "This is not a valid E-mail id"}, returnObject;
	var screenNode, ruleNodes, ruleApplicable, ruleName, ruleBankData;
	if (eventVerb != undefined) {
		screenNode = xmlDocRule.getElementsByTagName(screenID);
		screenNode = screenNode[0].getElementsByTagName(eventVerb);
	}
	else {
		screenNode = xmlDocRule.getElementsByTagName(screenID);
	}
	if (screenNode.length != 0) {
		ruleNodes = screenNode[0].getElementsByTagName("rule");
		for (var ruleNodeCounter = 0; ruleNodeCounter < ruleNodes.length; ruleNodeCounter ++) {
			ruleApplicable = ruleNodes[ruleNodeCounter].getAttribute("applicable");
			if (ruleApplicable == "true") {
				ruleName = ruleNodes[ruleNodeCounter].getAttribute("name");
				if (ruleName != "ButtonClick") {
					ruleBankData = $.grep(ruleBank, function(element, index) {
						return element.ruleName == ruleName;
					});
					if (ruleBankData[0].ruleType == "nonKendoRule") {
						ApplyNonKendoRule(screenID, ruleName, ruleNodes[ruleNodeCounter]);
					}
					else {
						returnObject = GetKendoValidationRule(screenID, ruleName, ruleNodes[ruleNodeCounter]);							
						if (returnObject.rule != "") {						
							eval("screenValidationRules.Rule" + (ruleNodeCounter + 1) + " = " + returnObject.rule);
							eval("screenValidationMessages.Rule" + (ruleNodeCounter + 1) + " = returnObject.message");
						}
					}
				}						
			}
		}
	}
	return {rules: screenValidationRules, messages: screenValidationMessages};
}

function ApplyNonKendoRule(screenID, ruleName, ruleNode) {
	if (ruleName == "ApplyDefaultValue") {
		var fieldListNode, fieldNodes, fieldData, fieldID, defaultValue, fieldDataValue, fieldValue = "", expresssionString, finalDefaultValue = "";
		fieldListNode = ruleNode.getElementsByTagName("field_list");
		fieldNodes = fieldListNode[0].getElementsByTagName("field");
		for (var fieldCounter = 0; fieldCounter < fieldNodes.length; fieldCounter ++) {
			expresssionString = "";
			fieldID = fieldNodes[fieldCounter].getAttribute("id");
			conditionalStatementsNode = fieldNodes[fieldCounter].getElementsByTagName("conditional_statements");
			conditionNodes = conditionalStatementsNode[0].getElementsByTagName("condition");
			expresssionString += "if (";
			for (var conditionCounter = 0; conditionCounter < conditionNodes.length; conditionCounter ++) {
				expresssionString += "(";						
				sourceValueNode = conditionNodes[conditionCounter].getElementsByTagName("source_value");
			
				/* GETTING THE SOURCE VALUE TO BE COMPARED */
				if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).length != 0) {						
					if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datepicker") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDatePicker");
						fieldDataValue = fieldData.value();
						if (fieldDataValue != null) {
							fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate();
						}
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datetimepicker") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDateTimePicker");
						fieldDataValue = fieldData.value();
						if (fieldDataValue != null) {
							fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate() + " " + fieldDataValue.getHours() + ":" + fieldDataValue.getMinutes();
						}
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "combobox") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoComboBox");
						fieldValue = fieldData.value();
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "multiselect") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoMultiSelect");
						fieldValue = fieldData.value().toString();
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "dropdownlist") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDropDownList");
						fieldValue = fieldData.value();
					}
					else {
						fieldValue = $("#" + sourceValueNode[0].childNodes[0].nodeValue).val();
					}						
				}
				else {
					try {
						fieldValue = eval(sourceValueNode[0].childNodes[0].nodeValue);
					}
					catch (e) {
						fieldValue = sourceValueNode[0].childNodes[0].nodeValue;
					}					
				}
				fieldValue = fieldValue.toString().replace(/'/g, "\\'").replace(/\\n/g, "\\\\n");
				
				dependentValueListNode = conditionNodes[conditionCounter].getElementsByTagName("dependent_value_list");
				valueNodes = dependentValueListNode[0].getElementsByTagName("value");
				
				/* FORMING THE CONDITIONAL BLOCK */
				for (var valueCounter = 0; valueCounter < valueNodes.length; valueCounter ++) {						
					if (valueCounter < valueNodes.length - 1) {
						if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
							var logicalOperator = "||", conditionalOperator = "==";
							if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
								logicalOperator = "&&";
								conditionalOperator = "!=";
							}
							expresssionString += "('" + fieldValue + "'" + " " + conditionalOperator + " " + "'---Select---'" + " ";
							expresssionString += logicalOperator + " " + "'" + fieldValue + "'" + " " + conditionalOperator + " " + "'')" + " ";
							expresssionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
						}
						else {
							expresssionString += "'" + fieldValue + "'" + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
							expresssionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'" + " ";
							expresssionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
						}
					}
					else {
						if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
							var logicalOperator = "||", conditionalOperator = "==";
							if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
								logicalOperator = "&&";
								conditionalOperator = "!=";
							}
							expresssionString += "('" + fieldValue + "'" + " " + conditionalOperator + " " + "'---Select---'" + " ";
							expresssionString += logicalOperator + " " + "'" + fieldValue + "'" + " " + conditionalOperator + " " + "'')" + " ";
						}
						else {
							expresssionString += "'" + fieldValue + "'" + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
							expresssionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'";	
						}													
					}
				}
				expresssionString += ")";
				
				conditionalLogicOperator = conditionNodes[conditionCounter].getAttribute("logic");
				if (conditionalLogicOperator != null) {
					expresssionString += " " + GetOperatorForCode(conditionalLogicOperator) + " ";
				}
			}
			expresssionString += ") {";
			
			defaultValue = fieldNodes[fieldCounter].getElementsByTagName("default_value")[0].childNodes[0].nodeValue;
			
			/* GETTING THE VALUE TO BE APPLIED */
			if ($("#" + defaultValue).length != 0) {						
				if ($("#" + defaultValue).data("role") == "datepicker") {
					fieldData = $("#" + defaultValue).data("kendoDatePicker");
					fieldDataValue = fieldData.value();
					if (fieldDataValue != null) {
						fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate();
					}
				}
				else if ($("#" + defaultValue).data("role") == "datetimepicker") {
					fieldData = $("#" + defaultValue).data("kendoDateTimePicker");
					fieldDataValue = fieldData.value();
					if (fieldDataValue != null) {
						fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate() + " " + fieldDataValue.getHours() + ":" + fieldDataValue.getMinutes();
					}
				}
				else if ($("#" + defaultValue).data("role") == "combobox") {
					fieldData = $("#" + defaultValue).data("kendoComboBox");
					fieldValue = fieldData.value();
				}
				else if ($("#" + defaultValue).data("role") == "multiselect") {
					fieldData = $("#" + defaultValue).data("kendoMultiSelect");
					fieldValue = fieldData.value().toString();
				}
				else if ($("#" + defaultValue).data("role") == "dropdownlist") {
					fieldData = $("#" + defaultValue).data("kendoDropDownList");
					fieldValue = fieldData.value();
				}
				else {
					fieldValue = $("#" + defaultValue).val();
				}						
			}
			else {
				try {
					fieldValue = eval(defaultValue);
				}
				catch (e) {
					fieldValue = defaultValue;
				}					
			}
			fieldValue = fieldValue.toString().replace(/'/g, "\\'").replace(/\\n/g, "\\\\n");
			
			/* APPLYING DEFAULT VALUE TO THE FIELD */
			if ($("#" + screenID + "_" + fieldID).data("role") == "datepicker") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoDatePicker");
				if (fieldValue != "") {
					if (fieldValue == "NEWDATE") {
						fieldDataValue = new Date();
						fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate();
					}
					expresssionString += "fieldData.value(new Date(fieldValue));";
				}
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "datetimepicker") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoDateTimePicker");
				if (fieldValue != "") {
					if (fieldValue == "NEWDATE") {
						fieldDataValue = new Date();
						fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate() + " " + fieldDataValue.getHours() + ":" + fieldDataValue.getMinutes();
					}
					expresssionString += "fieldData.value(new Date(fieldValue));";
				}
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "combobox") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoComboBox");
				expresssionString += "fieldData.value(fieldValue);";
				expresssionString += "$('#" + screenID + "_" + fieldID + "').val('" + fieldValue + "');";
				expresssionString += "fieldData.trigger('change');";
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "multiselect") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoMultiSelect");
				if (fieldValue != "") {
					expresssionString += "fieldData.value(fieldValue.split(","));";
				}
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "dropdownlist") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoDropDownList");
				expresssionString += "fieldData.value(fieldValue);";
				expresssionString += "$('#" + screenID + "_" + fieldID + "').val('" + fieldValue + "');";
				expresssionString += "fieldData.trigger('change');";
			}
			else {
				expresssionString += "$('#" + screenID + "_" + fieldID + "').val('" + fieldValue + "');";;
			}
			expresssionString += "}";
			eval(expresssionString);
		}				
	}			
	else if (ruleName == "OnLoadDisplay" || ruleName == "OnLoadEnable") {
		var fieldListNode, fieldNodes, fieldID, conditionalStatementsNode, conditionNodes, conditionalLogicOperator, sourceValueNode, fieldData, fieldDataValue, fieldValue, dependentValueListNode, valueNodes, expresssionString;
		fieldListNode = ruleNode.getElementsByTagName("field_list");
		fieldNodes = fieldListNode[0].getElementsByTagName("field");
		for (var fieldCounter = 0; fieldCounter < fieldNodes.length; fieldCounter ++) {
			expresssionString = "";
			fieldID = fieldNodes[fieldCounter].getAttribute("id");
			conditionalStatementsNode = fieldNodes[fieldCounter].getElementsByTagName("conditional_statements");
			conditionNodes = conditionalStatementsNode[0].getElementsByTagName("condition");
			expresssionString += "if (";
			for (var conditionCounter = 0; conditionCounter < conditionNodes.length; conditionCounter ++) {
				expresssionString += "(";						
				sourceValueNode = conditionNodes[conditionCounter].getElementsByTagName("source_value");
			
				/* GETTING THE SOURCE VALUE TO BE COMPARED */
				if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).length != 0) {						
					if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datepicker") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDatePicker");
						fieldDataValue = fieldData.value();
						if (fieldDataValue != null) {
							fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate();
						}
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datetimepicker") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDateTimePicker");
						fieldDataValue = fieldData.value();
						if (fieldDataValue != null) {
							fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate() + " " + fieldDataValue.getHours() + ":" + fieldDataValue.getMinutes();
						}
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "combobox") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoComboBox");
						fieldValue = fieldData.value();
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "multiselect") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoMultiSelect");
						fieldValue = fieldData.value().toString();
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "dropdownlist") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDropDownList");
						fieldValue = fieldData.value();
					}
					else {
						fieldValue = $("#" + sourceValueNode[0].childNodes[0].nodeValue).val();
					}						
				}
				else {
					try {
						fieldValue = eval(sourceValueNode[0].childNodes[0].nodeValue);
					}
					catch (e) {
						fieldValue = sourceValueNode[0].childNodes[0].nodeValue;
					}					
				}
				
				dependentValueListNode = conditionNodes[conditionCounter].getElementsByTagName("dependent_value_list");
				valueNodes = dependentValueListNode[0].getElementsByTagName("value");
				
				/* FORMING THE CONDITIONAL BLOCK */
				for (var valueCounter = 0; valueCounter < valueNodes.length; valueCounter ++) {						
					if (valueCounter < valueNodes.length - 1) {
						if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
							var logicalOperator = "||", conditionalOperator = "==";
							if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
								logicalOperator = "&&";
								conditionalOperator = "!=";
							}
							expresssionString += "('" + fieldValue + "'" + " " + conditionalOperator + " " + "'---Select---'" + " ";
							expresssionString += logicalOperator + " " + "'" + fieldValue + "'" + " " + conditionalOperator + " " + "'')" + " ";
							expresssionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
						}
						else {
							expresssionString += "'" + fieldValue + "'" + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
							expresssionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'" + " ";
							expresssionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
						}
					}
					else {
						if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
							var logicalOperator = "||", conditionalOperator = "==";
							if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
								logicalOperator = "&&";
								conditionalOperator = "!=";
							}
							expresssionString += "('" + fieldValue + "'" + " " + conditionalOperator + " " + "'---Select---'" + " ";
							expresssionString += logicalOperator + " " + "'" + fieldValue + "'" + " " + conditionalOperator + " " + "'')" + " ";
						}
						else {
							expresssionString += "'" + fieldValue + "'" + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
							expresssionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'";	
						}													
					}
				}
				expresssionString += ")";
				
				conditionalLogicOperator = conditionNodes[conditionCounter].getAttribute("logic");
				if (conditionalLogicOperator != null) {
					expresssionString += " " + GetOperatorForCode(conditionalLogicOperator) + " ";
				}
			}
			expresssionString += ") {";
			
			/* IDENTIFYING THE TYPE OF INPUT FIELD */
			if ($("#" + screenID + "_" + fieldID).data("role") == "dropdownlist") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoDropDownList");	
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "combobox") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoComboBox");
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "datepicker") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoDatePicker");
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "datetimepicker") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoDateTimePicker");
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "numerictextbox") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoNumericTextBox");
			}
			else if ($("#" + screenID + "_" + fieldID).data("role") == "multiselect") {
				fieldData = $("#" + screenID + "_" + fieldID).data("kendoMultiSelect");
			}
			else {
				fieldData = "";
			}					
			
			/* IDENTIFYING THE ACTION TO BE DONE */
			if (ruleName == "OnLoadDisplay") {
				if ($("#" + screenID + "_" + fieldID).attr("role") == "tab") {
					expresssionString += "$('#" + screenID + "_" + fieldID + "').show();";
				}
				else {
					expresssionString += "$('#" + screenID + "_" + fieldID + "_group').show();";
				}
			}
			else if (ruleName == "OnLoadEnable") {
				if (fieldData == "") {
					expresssionString += "$('#" + screenID + "_" + fieldID + "').attr('disabled', false);";
				}
				else {
					expresssionString += "fieldData.enable(true);";
				}
			}					
			expresssionString += "}";
			expresssionString += "else {";
			if (ruleName == "OnLoadDisplay") {
				if ($("#" + screenID + "_" + fieldID).attr("role") == "tab") {
					expresssionString += "$('#" + screenID + "_" + fieldID + "').hide();";
				}
				else {
					expresssionString += "$('#" + screenID + "_" + fieldID + "_group').hide();";
				}
			}
			else if (ruleName == "OnLoadEnable") {						
				if (fieldData == "") {
					expresssionString += "$('#" + screenID + "_" + fieldID + "').attr('disabled', true).css({backgroundColor: '#F5F5F5'});";
				}
				else {
					expresssionString += "fieldData.enable(false);";
				}
			}					
			expresssionString += "}";
			eval(expresssionString);
		}
	}
}

function GetKendoValidationRule(screenID, ruleName, ruleNode) {
	var functionString = "", validationMessage = "";
	if (ruleName == "Mandatory" || ruleName == "KeyfieldPattern" || ruleName == "OtherfieldPattern" || ruleName == "NumberPattern" || ruleName == "DatePattern" || ruleName == "DateTimePattern") {
		var fieldListNode, fieldNodes, fieldID;
		fieldListNode = ruleNode.getElementsByTagName("field_list");
		fieldNodes = fieldListNode[0].getElementsByTagName("field");
		
		/* FORMING FUNCTION STRING */
		functionString += "function (e) {";
		functionString += "if (";
		for (var fieldCounter = 0; fieldCounter < fieldNodes.length; fieldCounter ++) {
			fieldID = fieldNodes[fieldCounter].childNodes[0].nodeValue;
			if (fieldCounter < fieldNodes.length - 1) {						
				functionString += "e.attr('name') == '" + screenID + "_" + fieldID + "' || ";
			}
			else {
				functionString += "e.attr('name') == '" + screenID + "_" + fieldID + "'";
			}
		}
		functionString += ") {";
		
		/*FORMING CONDITION BLOCK BASED ON RULE NAME */
		if (ruleName == "Mandatory") {				
			functionString += "if (e.data('role') == 'dropdownlist') {";
			functionString += "if (e.val() == '' || e.val() == '---Select---') {";				
			functionString += "return false;"
			functionString += "}";
			functionString += "}";
			functionString += "else if (e.data('role') == 'multiselect') {";
			functionString += "var fieldData = e.data('kendoMultiSelect');";
			functionString += "if (fieldData.value().length == 0) {";
			functionString += "return false;";
			functionString += "}";
			functionString += "}";
			functionString += "else {";
			functionString += "if (e.val() == '') {";
			functionString += "return false;";
			functionString += "}";
			functionString += "}";
			
			var ruleBankData = $.grep(ruleBank, function(element, index) {
				return element.ruleName == ruleName;
			});
			validationMessage = ruleBankData[0].validationMessage;
			
			for (var fieldCounter = 0; fieldCounter < fieldNodes.length; fieldCounter ++) {
				fieldID = fieldNodes[fieldCounter].childNodes[0].nodeValue;
				$("#" + screenID + "_" + fieldID + "_lbl").append("<span class = 'required'>*</span>");
			}
		}
		else {
			var ruleBankData = $.grep(ruleBank, function(element, index) {
				return element.ruleName == ruleName;
			});
			functionString += "if (e.val() != '') {";
			functionString += "if (!e.val().match(" + ruleBankData[0].rulePattern + ")) {";
			functionString += "return false;";
			functionString += "}";
			functionString += "}";
			
			validationMessage = ruleBankData[0].validationMessage;
		}				
		functionString += "}return true;}";
	}
	else if (ruleName == "OnLoadMandatory") {
		var fieldListNode, fieldNodes, fieldID, conditionalStatementsNode, conditionNodes, conditionalLogicOperator, sourceValueNode, fieldData, fieldDataValue, fieldValue, dependentValueListNode, valueNodes, expresssionString = "", mandatoryFields = [];
		fieldListNode = ruleNode.getElementsByTagName("field_list");
		fieldNodes = fieldListNode[0].getElementsByTagName("field");
		for (var fieldCounter = 0; fieldCounter < fieldNodes.length; fieldCounter ++) {
			fieldID = fieldNodes[fieldCounter].getAttribute("id");
			conditionalStatementsNode = fieldNodes[fieldCounter].getElementsByTagName("conditional_statements");
			conditionNodes = conditionalStatementsNode[0].getElementsByTagName("condition");
			expresssionString += "if (";
			for (var conditionCounter = 0; conditionCounter < conditionNodes.length; conditionCounter ++) {
				expresssionString += "(";						
				sourceValueNode = conditionNodes[conditionCounter].getElementsByTagName("source_value");
			
				/* GETTING THE SOURCE VALUE TO BE COMPARED */
				if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).length != 0) {						
					if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datepicker") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDatePicker");
						fieldDataValue = fieldData.value();
						if (fieldDataValue != null) {
							fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate();
						}
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datetimepicker") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDateTimePicker");
						fieldDataValue = fieldData.value();
						if (fieldDataValue != null) {
							fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate() + " " + fieldDataValue.getHours() + ":" + fieldDataValue.getMinutes();
						}
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "combobox") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoComboBox");
						fieldValue = fieldData.value();
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "multiselect") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoMultiSelect");
						fieldValue = fieldData.value().toString();
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "dropdownlist") {
						fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDropDownList");
						fieldValue = fieldData.value();
					}
					else {
						fieldValue = $("#" + sourceValueNode[0].childNodes[0].nodeValue).val();
					}						
				}
				else {
					try {
						fieldValue = eval(sourceValueNode[0].childNodes[0].nodeValue);
					}
					catch (e) {
						fieldValue = sourceValueNode[0].childNodes[0].nodeValue;
					}					
				}
				
				dependentValueListNode = conditionNodes[conditionCounter].getElementsByTagName("dependent_value_list");
				valueNodes = dependentValueListNode[0].getElementsByTagName("value");
				
				/* FORMING THE CONDITIONAL BLOCK */						
				for (var valueCounter = 0; valueCounter < valueNodes.length; valueCounter ++) {						
					if (valueCounter < valueNodes.length - 1) {
						if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
							var logicalOperator = "||", conditionalOperator = "==";
							if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
								logicalOperator = "&&";
								conditionalOperator = "!=";
							}
							expresssionString += "('" + fieldValue + "'" + " " + conditionalOperator + " " + "'---Select---'" + " ";
							expresssionString += logicalOperator + " " + "'" + fieldValue + "'" + " " + conditionalOperator + " " + "'')" + " ";
							expresssionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
						}
						else {
							expresssionString += "'" + fieldValue + "'" + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
							expresssionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'" + " ";
							expresssionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
						}							
					}
					else {
						if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
							var logicalOperator = "||", conditionalOperator = "==";
							if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
								logicalOperator = "&&";
								conditionalOperator = "!=";
							}
							expresssionString += "('" + fieldValue + "'" + " " + conditionalOperator + " " + "'---Select---'" + " ";
							expresssionString += logicalOperator + " " + "'" + fieldValue + "'" + " " + conditionalOperator + " " + "'')" + " ";
						}
						else {
							expresssionString += "'" + fieldValue + "'" + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
							expresssionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'";
						}														
					}
				}						
				expresssionString += ")";
				
				conditionalLogicOperator = conditionNodes[conditionCounter].getAttribute("logic");
				if (conditionalLogicOperator != null) {
					expresssionString += " " + GetOperatorForCode(conditionalLogicOperator) + " ";
				}
			}
			expresssionString += ") {";
			expresssionString += "true;";
			expresssionString += "}";
			expresssionString += "else {";
			expresssionString += "false;";					
			expresssionString += "}";
			if (eval(expresssionString) == true) {
				mandatoryFields.push(fieldID);
			}
		}
		
		if (mandatoryFields.length > 0) {
			/* FORMING FUNCTION STRING */
			functionString += "function (e) {";
			functionString += "if (";
			for (var mandatoryFieldCounter = 0; mandatoryFieldCounter < mandatoryFields.length; mandatoryFieldCounter ++) {
				fieldID = mandatoryFields[mandatoryFieldCounter];
				if (mandatoryFieldCounter < mandatoryFields.length - 1) {						
					functionString += "e.attr('name') == '" + screenID + "_" + fieldID + "' || ";
				}
				else {
					functionString += "e.attr('name') == '" + screenID + "_" + fieldID + "'";
				}
			}
			functionString += ") {";
			functionString += "if (e.data('role') == 'dropdownlist') {";
			functionString += "if (e.val() == '' || e.val() == '---Select---') {";				
			functionString += "return false;"
			functionString += "}";
			functionString += "}";
			functionString += "else if (e.data('role') == 'multiselect') {";
			functionString += "var fieldData = e.data('kendoMultiSelect');";
			functionString += "if (fieldData.value().length == 0) {";
			functionString += "return false;";
			functionString += "}";
			functionString += "}";
			functionString += "else {";
			functionString += "if (e.val() == '') {";
			functionString += "return false;";
			functionString += "}";
			functionString += "}";
			functionString += "}return true;}";
			
			var ruleBankData = $.grep(ruleBank, function(element, index) {
				return element.ruleName == ruleName;
			});
			validationMessage = ruleBankData[0].validationMessage;
			
			for (var mandatoryFieldCounter = 0; mandatoryFieldCounter < mandatoryFields.length; mandatoryFieldCounter ++) {
				fieldID = mandatoryFields[mandatoryFieldCounter];
				$("#" + screenID + "_" + fieldID + "_lbl").append("<span class = 'required'>*</span>");
			}
		}
	}
	else if (ruleName == "DependentMandatory") {
		var fieldListNode, fieldNodes, fieldID, conditionalStatementsNode, conditionNodes, conditionalLogicOperator, sourceValueNode, fieldData, fieldDataValue, dependentValueListNode, valueNodes;
		fieldListNode = ruleNode.getElementsByTagName("field_list");
		fieldNodes = fieldListNode[0].getElementsByTagName("field");
		
		/* FORMING FUNCTION STRING */
		functionString += "function (e) {";
		functionString += "if (";
		for (var fieldCounter = 0; fieldCounter < fieldNodes.length; fieldCounter ++) {
			fieldID = fieldNodes[fieldCounter].getAttribute("id");
			if (fieldCounter < fieldNodes.length - 1) {						
				functionString += "e.attr('name') == '" + screenID + "_" + fieldID + "' || ";
			}
			else {
				functionString += "e.attr('name') == '" + screenID + "_" + fieldID + "'";
			}
		}
		functionString += ") {";
		
		for (var fieldCounter = 0; fieldCounter < fieldNodes.length; fieldCounter ++) {
			fieldID = fieldNodes[fieldCounter].getAttribute("id");
			functionString += "if (e.attr('name') == '" + screenID + "_" + fieldID + "') {";
			conditionalStatementsNode = fieldNodes[fieldCounter].getElementsByTagName("conditional_statements");
			conditionNodes = conditionalStatementsNode[0].getElementsByTagName("condition");
			
			for (var conditionCounter = 0; conditionCounter < conditionNodes.length; conditionCounter ++) {
				sourceValueNode = conditionNodes[conditionCounter].getElementsByTagName("source_value");
				
				/* GETTING THE SOURCE VALUE TO BE COMPARED */
				if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).length != 0) {						
					if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datepicker") {
						functionString += "var fieldData" + (conditionCounter + 1) + " = $('#" + sourceValueNode[0].childNodes[0].nodeValue + "').data('kendoDatePicker');";
						functionString += "var fieldDataValue" + (conditionCounter + 1) + " = fieldData" + (conditionCounter + 1) + ".value();";
						functionString += "if (fieldDataValue" + (conditionCounter + 1) + " != null) {"
						functionString += "var fieldValue" + (conditionCounter + 1) + " = fieldDataValue" + (conditionCounter + 1) + ".getFullYear() + '-' + (fieldDataValue" + (conditionCounter + 1) + ".getMonth() + 1) + '-' + fieldDataValue" + (conditionCounter + 1) + ".getDate();";
						functionString += "}";
						functionString += "else {";
						functionString += "var fieldValue" + (conditionCounter + 1) + " = null";
						functionString += "}";
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datetimepicker") {
						functionString += "var fieldData" + (conditionCounter + 1) + " = $('#" + sourceValueNode[0].childNodes[0].nodeValue + "').data('kendoDateTimePicker');";
						functionString += "var fieldDataValue" + (conditionCounter + 1) + " = fieldData" + (conditionCounter + 1) + ".value();";
						functionString += "if (fieldDataValue" + (conditionCounter + 1) + " != null) {";
						functionString += "var fieldValue" + (conditionCounter + 1) + " = fieldDataValue" + (conditionCounter + 1) + ".getFullYear() + '-' + (fieldDataValue" + (conditionCounter + 1) + ".getMonth() + 1) + '-' + fieldDataValue" + (conditionCounter + 1) + ".getDate() + ' ' + fieldDataValue" + (conditionCounter + 1) + ".getHours() + ':' + fieldDataValue" + (conditionCounter + 1) + ".getMinutes();";
						functionString += "}";
						functionString += "else {";
						functionString += "var fieldValue" + (conditionCounter + 1) + " = null";
						functionString += "}";
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "combobox") {
						functionString += "var fieldData" + (conditionCounter + 1) + " = $('#" + sourceValueNode[0].childNodes[0].nodeValue + "').data('kendoComboBox');";
						functionString += "var fieldValue" + (conditionCounter + 1) + " = fieldData" + (conditionCounter + 1) + ".value();";
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "multiselect") {
						functionString += "var fieldData" + (conditionCounter + 1) + " = $('#" + sourceValueNode[0].childNodes[0].nodeValue + "').data('kendoMultiSelect');";
						functionString += "var fieldValue" + (conditionCounter + 1) + " = fieldData" + (conditionCounter + 1) + ".value().toString();";
					}
					else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "dropdownlist") {
						functionString += "var fieldData" + (conditionCounter + 1) + " = $('#" + sourceValueNode[0].childNodes[0].nodeValue + "').data('kendoDropDownList');";
						functionString += "var fieldValue" + (conditionCounter + 1) + " = fieldData" + (conditionCounter + 1) + ".value();";
					}
					else {
						functionString += "var fieldValue" + (conditionCounter + 1) + " = $('#" + sourceValueNode[0].childNodes[0].nodeValue + "').val();";
					}						
				}
			}
			
			functionString += "if (";
			for (var conditionCounter = 0; conditionCounter < conditionNodes.length; conditionCounter ++) {
				functionString += "(";
				
				dependentValueListNode = conditionNodes[conditionCounter].getElementsByTagName("dependent_value_list");
				valueNodes = dependentValueListNode[0].getElementsByTagName("value");
				
				/* FORMING THE CONDITIONAL BLOCK */						
				for (var valueCounter = 0; valueCounter < valueNodes.length; valueCounter ++) {						
					if (valueCounter < valueNodes.length - 1) {
						if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
							var logicalOperator = "||", conditionalOperator = "==";
							if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
								logicalOperator = "&&";
								conditionalOperator = "!=";
							}
							functionString += "(fieldValue" + (conditionCounter + 1) + " " + conditionalOperator + " " + "'---Select---'" + " ";
							functionString += logicalOperator + " " + "fieldValue" + (conditionCounter + 1) + " " + conditionalOperator + " " + "'')" + " ";
							functionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
						}
						else {
							functionString += "fieldValue" + (conditionCounter + 1) + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
							functionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'" + " ";
							functionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
						}							
					}
					else {
						if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
							var logicalOperator = "||", conditionalOperator = "==";
							if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
								logicalOperator = "&&";
								conditionalOperator = "!=";
							}
							functionString += "(fieldValue" + (conditionCounter + 1) + " " + conditionalOperator + " " + "'---Select---'" + " ";
							functionString += logicalOperator + " " + "fieldValue" + (conditionCounter + 1) + " " + conditionalOperator + " " + "'')" + " ";
						}
						else {
							functionString += "fieldValue" + (conditionCounter + 1) + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
							functionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'";
						}														
					}
				}						
				functionString += ")";
				
				conditionalLogicOperator = conditionNodes[conditionCounter].getAttribute("logic");
				if (conditionalLogicOperator != null) {
					functionString += " " + GetOperatorForCode(conditionalLogicOperator) + " ";
				}
			}
			functionString += ") {";
			functionString += "if (e.data('role') == 'dropdownlist') {";
			functionString += "if (e.val() == '' || e.val() == '---Select---') {";
			functionString += "if ($('#" + screenID + "_" + fieldID + "_lbl span').length == 0) {";
			functionString += "$('#" + screenID + "_" + fieldID + "_lbl').append('<span class = \"required\">*</span>');";
			functionString += "} else {$('#" + screenID + "_" + fieldID + "_lbl span').show();}";
			functionString += "return false;"
			functionString += "}";
			functionString += "}";
			functionString += "else if (e.data('role') == 'multiselect') {";
			functionString += "var fieldData = e.data('kendoMultiSelect');";
			functionString += "if (fieldData.value().length == 0) {";
			functionString += "if ($('#" + screenID + "_" + fieldID + "_lbl span').length == 0) {";
			functionString += "$('#" + screenID + "_" + fieldID + "_lbl').append('<span class = \"required\">*</span>');";
			functionString += "} else {$('#" + screenID + "_" + fieldID + "_lbl span').show();}";
			functionString += "return false;";
			functionString += "}";
			functionString += "}";
			functionString += "else {";
			functionString += "if (e.val() == '') {";
			functionString += "if ($('#" + screenID + "_" + fieldID + "_lbl span').length == 0) {";
			functionString += "$('#" + screenID + "_" + fieldID + "_lbl').append('<span class = \"required\">*</span>');";
			functionString += "} else {$('#" + screenID + "_" + fieldID + "_lbl span').show();}";
			functionString += "return false;";
			functionString += "}";
			functionString += "}";
			functionString += "$('#" + screenID + "_" + fieldID + "_lbl span').hide();";
			functionString += "}";
			functionString += "else {$('#" + screenID + "_" + fieldID + "_lbl span').hide();}";
			functionString += "}";
		}				
		functionString += "}";
		functionString += "return true;}";
		
		var ruleBankData = $.grep(ruleBank, function(element, index) {
			return element.ruleName == ruleName;
		});
		validationMessage = ruleBankData[0].validationMessage;
	}
	
	return {rule: functionString, message: validationMessage};
}

function ApplyButtonValidation(buttonValidationObject) {
	var returnValue, screenNode, ruleNodes, buttonRuleNode, ruleApplicable, buttonListNode, buttonNodes, thisButtonNode, conditionalStatementsNode, conditionNodes, conditionalLogicOperator, sourceValueNode, fieldData, fieldDataValue, fieldValue, dependentValueListNode, valueNodes, expresssionString = "", validationMessageNode, validationMessageNodeChild, validationMessage = "";
	
	returnValue = true;
	screenNode = xmlDocRule.getElementsByTagName(buttonValidationObject.screenID);
	if (screenNode.length != 0) {
		ruleNodes = screenNode[0].getElementsByTagName("rule");
		if (ruleNodes.length > 0) {
			buttonRuleNode = $.grep(ruleNodes, function(element, index) {
				return element.getAttribute("name") == "ButtonClick";
			});
			if (buttonRuleNode.length > 0) {
				ruleApplicable = buttonRuleNode[0].getAttribute("applicable");
				if (ruleApplicable == "true") {
					buttonListNode = buttonRuleNode[0].getElementsByTagName("button_list");
					buttonNodes = buttonListNode[0].getElementsByTagName("button");
					thisButtonNode = $.grep(buttonNodes, function(element, index) {
						return element.getAttribute("id") == buttonValidationObject.buttonID;
					});
					
					/* CONDITIONAL BLOCK FOR THE SOURCE BUTTON CLICK */
					if (thisButtonNode.length > 0) {
						conditionalStatementsNode = thisButtonNode[0].getElementsByTagName("conditional_statements");
						conditionNodes = conditionalStatementsNode[0].getElementsByTagName("condition");
						expresssionString += "if (";
						for (var conditionCounter = 0; conditionCounter < conditionNodes.length; conditionCounter ++) {
							expresssionString += "(";						
							sourceValueNode = conditionNodes[conditionCounter].getElementsByTagName("source_value");
						
							/* GETTING THE SOURCE VALUE TO BE COMPARED */
							if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).length != 0) {						
								if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datepicker") {
									fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDatePicker");
									fieldDataValue = fieldData.value();
									if (fieldDataValue != null) {
										fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate();
									}
								}
								else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "datetimepicker") {
									fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDateTimePicker");
									fieldDataValue = fieldData.value();
									if (fieldDataValue != null) {
										fieldValue = fieldDataValue.getFullYear() + "-" + (fieldDataValue.getMonth() + 1) + "-" + fieldDataValue.getDate() + " " + fieldDataValue.getHours() + ":" + fieldDataValue.getMinutes();
									}
								}
								else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "combobox") {
									fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoComboBox");
									fieldValue = fieldData.value();
								}
								else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "multiselect") {
									fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoMultiSelect");
									fieldValue = fieldData.value().toString();
								}
								else if ($("#" + sourceValueNode[0].childNodes[0].nodeValue).data("role") == "dropdownlist") {
									fieldData = $("#" + sourceValueNode[0].childNodes[0].nodeValue).data("kendoDropDownList");
									fieldValue = fieldData.value();
								}
								else {
									fieldValue = $("#" + sourceValueNode[0].childNodes[0].nodeValue).val();
								}						
							}
							else {
								try {
									fieldValue = eval(sourceValueNode[0].childNodes[0].nodeValue);
								}
								catch(e) {
									fieldValue = sourceValueNode[0].childNodes[0].nodeValue;
								}					
							}
							
							dependentValueListNode = conditionNodes[conditionCounter].getElementsByTagName("dependent_value_list");
							valueNodes = dependentValueListNode[0].getElementsByTagName("value");
							
							/* FORMING THE CONDITIONAL BLOCK */
							for (var valueCounter = 0; valueCounter < valueNodes.length; valueCounter ++) {						
								if (valueCounter < valueNodes.length - 1) {
									if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
										var logicalOperator = "||", conditionalOperator = "==";
										if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
											logicalOperator = "&&";
											conditionalOperator = "!=";
										}
										expresssionString += "('" + fieldValue + "'" + " " + conditionalOperator + " " + "'---Select---'" + " ";
										expresssionString += logicalOperator + " " + "'" + fieldValue + "'" + " " + conditionalOperator + " " + "'')" + " ";
										expresssionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
									}
									else {
										expresssionString += "'" + fieldValue + "'" + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
										expresssionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'" + " ";
										expresssionString += GetOperatorForCode(valueNodes[valueCounter].getAttribute("logic")) + " ";
									}
								}
								else {
									if (valueNodes[valueCounter].childNodes[0].nodeValue.toLowerCase() == "null") {
										var logicalOperator = "||", conditionalOperator = "==";
										if (GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) == "!=") {
											logicalOperator = "&&";
											conditionalOperator = "!=";
										}
										expresssionString += "('" + fieldValue + "'" + " " + conditionalOperator + " " + "'---Select---'" + " ";
										expresssionString += logicalOperator + " " + "'" + fieldValue + "'" + " " + conditionalOperator + " " + "'')" + " ";
									}
									else {
										expresssionString += "'" + fieldValue + "'" + " " + GetOperatorForCode(valueNodes[valueCounter].getAttribute("operator")) + " ";
										expresssionString += "'" + valueNodes[valueCounter].childNodes[0].nodeValue + "'";	
									}													
								}
							}
							expresssionString += ")";
							
							conditionalLogicOperator = conditionNodes[conditionCounter].getAttribute("logic");
							if (conditionalLogicOperator != null) {
								expresssionString += " " + GetOperatorForCode(conditionalLogicOperator) + " ";
							}
						}
						expresssionString += ") {";
						expresssionString += "returnValue = true;";
						expresssionString += "}";
						expresssionString += "else {";
						expresssionString += "returnValue = false;";
						expresssionString += "}";								
						eval(expresssionString);
						
						/* VALIDATION MESSAGE SECTION */
						validationMessageNode = thisButtonNode[0].getElementsByTagName("validation_message");
						if (validationMessageNode.length != 0) {
							if (returnValue == true) {
								validationMessageNodeChild = validationMessageNode[0].getElementsByTagName("success");
							}
							else {
								validationMessageNodeChild = validationMessageNode[0].getElementsByTagName("failure");
							}
							
							if (validationMessageNodeChild.length != 0) {
								if (validationMessageNodeChild[0].childNodes.length != 0) {
									validationMessage = validationMessageNodeChild[0].childNodes[0].nodeValue;
								}
							}
							
							if (validationMessage != "") {
								alert(validationMessage);
							}
						}
					}							
				}
			}
		}
	}
	return returnValue;
}

function GetOperatorForCode (code) {
	var operator = "==";
	if (code == "AND") {
		operator = "&&";
	}
	else if (code == "OR") {
		operator = "||";
	}
	else if (code == "EQ") {
		operator = "==";
	}
	else if (code == "NEQ") {
		operator = "!=";
	}
	return operator;
}

// Function below should be later added to the fn_home.js file as a snippet
function ButtonClickEventHandler() {
	/* BUTTON CLICK EVENT HANDLER */
	$("body").delegate("button", "click", function(e) {
		/* VARIABLE DECLARATIONS */
		var buttonID = $(this).attr("id"), returnValue;
		$("#" + buttonID).attr("disabled", true);		
		
		if ($("#" + buttonID).data("buttonType") == "submit") { /* HANDLER FOR SUBMIT BUTTON */
			returnValue = eval ("fn_" + $("#" + buttonID).attr("id") + "_click()");
			$("#" + buttonID).attr("disabled", false);
			if (returnValue == true) {
				NavigateBackward({
					buttonType: "submit"
				});
			}
		}
		else if ($("#" + buttonID).data("buttonType") == "cancel") { /* HANDLER FOR CANCEL BUTTON */
			if (isScreenEditable == true && isDataModified == true) {
				returnValue = confirm ("You have modified some data on the screen. Do you still want to go back to the previous screen ?");
				$("#" + buttonID).attr("disabled", false);
				if (returnValue == true) {
					NavigateBackward({
						buttonType: "cancel"
					});
				}
			}
			else {
				$("#" + buttonID).attr("disabled", false);
				NavigateBackward({
					buttonType: "cancel"
				});
			}
		}
		else { /* HANDLER FOR OTHER BUTTON */
			eval ("fn_" + $("#" + buttonID).attr("id") + "_click()");
			$("#" + buttonID).attr("disabled", false);
		}
	});
}