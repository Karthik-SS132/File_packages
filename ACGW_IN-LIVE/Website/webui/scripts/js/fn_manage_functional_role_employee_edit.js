var manage_functional_role_employee_edit = {
	constructScreen : function () {
		if (manage_functional_role_employee.variable.custom.crudIndicator == "U") {
			manage_functional_role_employee_edit.variable.custom.functional_role_defaultValue = manage_functional_role_employee.variable.custom.selectedRecord.func_role;
			manage_functional_role_employee_edit.variable.custom.functional_role_defaultValueDescription = manage_functional_role_employee.variable.custom.selectedRecord.func_role_desc;
			manage_functional_role_employee_edit.variable.custom.employee_id_defaultValue = manage_functional_role_employee.variable.custom.selectedRecord.emp_id;
			manage_functional_role_employee_edit.variable.custom.employee_id_defaultValueDescription = manage_functional_role_employee.variable.custom.selectedRecord.emp_name;
			manage_functional_role_employee_edit.variable.custom.reporting_functional_role_defaultValue = manage_functional_role_employee.variable.custom.selectedRecord.repo_func_role;
			manage_functional_role_employee_edit.variable.custom.reporting_functional_role_defaultValueDescription = manage_functional_role_employee.variable.custom.selectedRecord.repo_func_role_desc;
			manage_functional_role_employee_edit.variable.custom.reporting_employee_id_defaultValue = manage_functional_role_employee.variable.custom.selectedRecord.repo_emp_id;
			manage_functional_role_employee_edit.variable.custom.reporting_employee_id_defaultValueDescription = manage_functional_role_employee.variable.custom.selectedRecord.repo_emp_name;
			manage_functional_role_employee_edit.variable.custom.mapped_functional_role_defaultValue = manage_functional_role_employee.variable.custom.selectedRecord.map_func_role;
			manage_functional_role_employee_edit.variable.custom.mapped_functional_role_defaultValueDescription = manage_functional_role_employee.variable.custom.selectedRecord.map_func_role_desc;
			manage_functional_role_employee_edit.variable.custom.mapped_employee_id_defaultValue = manage_functional_role_employee.variable.custom.selectedRecord.map_emp_id;
			manage_functional_role_employee_edit.variable.custom.mapped_employee_id_defaultValueDescription = manage_functional_role_employee.variable.custom.selectedRecord.map_emp_name;
		}
	},
	postConstruct : function () {
		if (manage_functional_role_employee.variable.custom.crudIndicator == "U") {
			manage_functional_role_employee_edit.variable.custom.mapped_functional_role.dataSource.filter({
				field : "p_value_field_1",
				operator : "neq",
				value : $("#manage_functional_role_employee_edit_functional_role").getVal()
			});
			manage_functional_role_employee_edit.variable.custom.reporting_functional_role.dataSource.filter({
				field : "p_value_field_1",
				operator : "neq",
				value : $("#manage_functional_role_employee_edit_functional_role").getVal()
			});
		}
	},
	initializeWidgets : function () {
		$("#manage_functional_role_employee_edit_functional_role").initializeWDropdownlist({
			screenID : "manage_functional_role_employee_edit",
			dataSource : manage_functional_role_employee.variable.custom.functionalRoleList,
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_functional_role_employee_edit.variable.custom.functional_role_defaultValue",
			defaultValueDescription : "$manage_functional_role_employee_edit.variable.custom.functional_role_defaultValueDescription"
		});
		$("#manage_functional_role_employee_edit_employee_id").initializeWCombobox({
			screenID : "manage_functional_role_employee_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'NON_FUNCTIONAL_ROLE_EMPLOYEE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_functional_role_employee_edit.variable.custom.employee_id_defaultValue",
			defaultValueDescription : "$manage_functional_role_employee_edit.variable.custom.employee_id_defaultValueDescription"
		});
		manage_functional_role_employee_edit.variable.custom.reporting_functional_role = $("#manage_functional_role_employee_edit_reporting_functional_role").initializeWDropdownlist({
				screenID : "manage_functional_role_employee_edit",
				dataSource : manage_functional_role_employee.variable.custom.functionalRoleList,
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1",
				childFieldID : "manage_functional_role_employee_edit_reporting_employee_id",
				defaultValue : "$manage_functional_role_employee_edit.variable.custom.reporting_functional_role_defaultValue",
				defaultValueDescription : "$manage_functional_role_employee_edit.variable.custom.reporting_functional_role_defaultValueDescription"
			});
		$("#manage_functional_role_employee_edit_reporting_employee_id").initializeWCombobox({
			screenID : "manage_functional_role_employee_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'FUNCTIONAL_ROLE_EMPLOYEE_LIST'",
					p_search_field_1 : "#manage_functional_role_employee_edit_reporting_functional_role",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_functional_role_employee_edit.variable.custom.reporting_employee_id_defaultValue",
			defaultValueDescription : "$manage_functional_role_employee_edit.variable.custom.reporting_employee_id_defaultValueDescription"
		});
		manage_functional_role_employee_edit.variable.custom.mapped_functional_role = $("#manage_functional_role_employee_edit_mapped_functional_role").initializeWDropdownlist({
				screenID : "manage_functional_role_employee_edit",
				dataSource : manage_functional_role_employee.variable.custom.functionalRoleList,
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1",
				childFieldID : "manage_functional_role_employee_edit_mapped_employee_id",
				defaultValue : "$manage_functional_role_employee_edit.variable.custom.mapped_functional_role_defaultValue",
				defaultValueDescription : "$manage_functional_role_employee_edit.variable.custom.mapped_functional_role_defaultValueDescription"
			});
		$("#manage_functional_role_employee_edit_mapped_employee_id").initializeWCombobox({
			screenID : "manage_functional_role_employee_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'FUNCTIONAL_ROLE_EMPLOYEE_LIST'",
					p_search_field_1 : "#manage_functional_role_employee_edit_mapped_functional_role",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_functional_role_employee_edit.variable.custom.mapped_employee_id_defaultValue",
			defaultValueDescription : "$manage_functional_role_employee_edit.variable.custom.mapped_employee_id_defaultValueDescription"
		});
	},
	widgetEventHandler : {
		functional_role_change : function (element, event) {
			$("#manage_functional_role_employee_edit_mapped_functional_role").setVal("");
			$("#manage_functional_role_employee_edit_reporting_functional_role").setVal("");
			if ($("#manage_functional_role_employee_edit_functional_role").getVal() != "") {
				manage_functional_role_employee_edit.variable.custom.mapped_functional_role.dataSource.filter({
					field : "p_value_field_1",
					operator : "neq",
					value : $("#manage_functional_role_employee_edit_functional_role").getVal()
				});
				manage_functional_role_employee_edit.variable.custom.reporting_functional_role.dataSource.filter({
					field : "p_value_field_1",
					operator : "neq",
					value : $("#manage_functional_role_employee_edit_functional_role").getVal()
				});
			} else {
				manage_functional_role_employee_edit.variable.custom.mapped_functional_role.dataSource.filter({});
				manage_functional_role_employee_edit.variable.custom.reporting_functional_role.dataSource.filter({});
			}
		},
		reporting_functional_role_change : function (element, event) {
			if ($("#manage_functional_role_employee_edit_reporting_functional_role").getVal() != "") {
				$("#manage_functional_role_employee_edit_reporting_employee_id").enable();
			} else {
				$("#manage_functional_role_employee_edit_reporting_employee_id").disable();
			}
		},
		mapped_functional_role_change : function (element, event) {
			if ($("#manage_functional_role_employee_edit_mapped_functional_role").getVal() != "") {
				$("#manage_functional_role_employee_edit_mapped_employee_id").enable();
			} else {
				$("#manage_functional_role_employee_edit_mapped_employee_id").disable();
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_functional_role_employee.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_functional_role_employee.variable.custom.selectedRecord.rec_tstamp;
			}
			returnValue = executeService_save_manage_functional_role_employee({
					p_employee_id : $("#manage_functional_role_employee_edit_employee_id").getVal(),
					p_functional_role_id : $("#manage_functional_role_employee_edit_functional_role").getVal(),
					p_reporting_to_functional_role_id : $("#manage_functional_role_employee_edit_reporting_functional_role").getVal(),
					p_reporting_to_emp_id : $("#manage_functional_role_employee_edit_reporting_employee_id").getVal(),
					p_mapped_to_functional_role_id : $("#manage_functional_role_employee_edit_mapped_functional_role").getVal(),
					p_mapped_to_emp_id : $("#manage_functional_role_employee_edit_mapped_employee_id").getVal(),
					p_rec_tstamp : recordTimeStamp,
					p_save_mode : manage_functional_role_employee.variable.custom.crudIndicator
				});
			if (returnValue == "SP001") {
				alert("Functional Role saved successfully.");
				return true;
			} else {
				alert("Saving of Functional Role failed");
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			functional_role_defaultValue : "",
			functional_role_defaultValueDescription : "",
			employee_id_defaultValue : "",
			employee_id_defaultValueDescription : "",
			reporting_functional_role_defaultValue : "",
			reporting_functional_role_defaultValueDescription : "",
			reporting_employee_id_defaultValue : "",
			reporting_employee_id_defaultValueDescription : "",
			mapped_functional_role_defaultValue : "",
			mapped_functional_role_defaultValueDescription : "",
			mapped_employee_id_defaultValue : "",
			mapped_employee_id_defaultValueDescription : ""
		}
	}
};