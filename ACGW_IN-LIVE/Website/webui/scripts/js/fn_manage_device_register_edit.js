var manage_device_register_edit = {
	constructScreen : function () {
		return true;
	},
	initializeWidgets : function () {
		$("#manage_device_register_edit_device_id").initializeWTextbox({
			screenID : "manage_device_register_edit",
			maxlength : "100",
			keyField : {
				p_screen_name : "'DEVICEID'",
				p_validation_field_1 : "#manage_device_register_edit_device_id",
				p_validation_field_2 : "",
				p_validation_field_3 : "",
				p_validation_field_4 : "",
				p_validation_field_5 : "",
				p_validation_field_6 : "",
				p_validation_field_7 : "",
				p_validation_field_8 : "",
				p_validation_field_9 : "",
				p_validation_field_10 : ""
			}
		});
		$("#manage_device_register_edit_employee_id").initializeWCombobox({
			screenID : "manage_device_register_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'DEVICEREG_EMPLOYEE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1"
		});
		$("#manage_device_register_edit_device_platform").initializeWDropdownlist({
			screenID : "manage_device_register_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'DEVICEPLATFORM_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_device_register.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_device_register.variable.custom.selectedRecord.rec_tstamp;
			}
			returnValue = executeService_save_manage_device_register({
					p_device_id : $("#manage_device_register_edit_device_id").getVal(),
					p_employee_id : $("#manage_device_register_edit_employee_id").getVal(),
					p_device_platform : $("#manage_device_register_edit_device_platform").getVal(),
					p_rec_tstamp : recordTimeStamp,
					p_save_mode : manage_device_register.variable.custom.crudIndicator
				});
			if (returnValue == "SP001") {
				alert("Device Details saved successfully.");
				return true;
			} else {
				alert("Saving of Device Details failed");
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
		custom : {}

	}
};