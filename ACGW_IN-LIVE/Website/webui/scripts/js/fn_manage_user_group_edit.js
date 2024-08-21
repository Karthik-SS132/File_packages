var manage_user_group_edit = {
	constructScreen : function () {
		if (manage_user_group.variable.custom.crudIndicator == "U") {
			manage_user_group_edit.variable.custom.user_group_type_defaultValue = manage_user_group.variable.custom.selectedRecord.user_group_type;
			manage_user_group_edit.variable.custom.user_group_type_defaultValueDescription = manage_user_group.variable.custom.selectedRecord.user_group_type_desc;
			manage_user_group_edit.variable.custom.user_group_id_defaultValue = manage_user_group.variable.custom.selectedRecord.user_group_id;
			manage_user_group_edit.variable.custom.user_group_name_defaultValue = manage_user_group.variable.custom.selectedRecord.user_group_name;
		}
	},
	initializeWidgets : function () {
		$("#manage_user_group_edit_user_group_type").initializeWDropdownlist({
			screenID : "manage_user_group_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'USERGROUPTYPE'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_user_group_edit.variable.custom.user_group_type_defaultValue",
			defaultValueDescription : "$manage_user_group_edit.variable.custom.user_group_type_defaultValueDescription"
		});
		$("#manage_user_group_edit_user_group_id").initializeWTextbox({
			screenID : "manage_user_group_edit",
			maxlength : "10",
			defaultValue : "$manage_user_group_edit.variable.custom.user_group_id_defaultValue",
			keyField : {
				p_screen_name : "'USERGROUP'",
				p_validation_field_1 : "#manage_user_group_edit_user_group_id",
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
		$("#manage_user_group_edit_user_group_name").initializeWTextbox({
			screenID : "manage_user_group_edit",
			maxlength : "60",
			defaultValue : "$manage_user_group_edit.variable.custom.user_group_name_defaultValue"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_user_group.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_user_group.variable.custom.selectedRecord.rec_tstamp;
			}
			returnValue = executeService_save_manage_user_group({
					p_user_group_id : $("#manage_user_group_edit_user_group_id").getVal(),
					p_user_group_type : $("#manage_user_group_edit_user_group_type").getVal(),
					p_user_group_name : $("#manage_user_group_edit_user_group_name").getVal(),
					p_rec_tstamp : recordTimeStamp,
					p_save_mode : manage_user_group.variable.custom.crudIndicator
				});
			if (returnValue == "SP001") {
				alert("User Group saved successfully.");
				return true;
			} else {
				alert("Saving of User Group failed");
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
					columnLength : 1
				}
			],
		},
		custom : {
			user_group_type_defaultValue : "",
			user_group_type_defaultValueDescription : "",
			user_group_id_defaultValue : "",
			user_group_name_defaultValue : "",
		}
	}
};