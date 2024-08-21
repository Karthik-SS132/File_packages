var manage_country_master_edit = {
	constructScreen : function () {
		if (manage_country_master.variable.custom.crudIndicator == "U") {
			manage_country_master_edit.variable.custom.code_defaultValue = manage_country_master.variable.custom.selectedRecord.code;
			manage_country_master_edit.variable.custom.name_defaultValue = manage_country_master.variable.custom.selectedRecord.name;
		}
	},
	initializeWidgets : function () {
		$("#manage_country_master_edit_code").initializeWTextbox({
			screenID : "manage_country_master_edit",
			maxlength : "5",
			defaultValue : "$manage_country_master_edit.variable.custom.code_defaultValue",
			keyField : {
				p_screen_name : "'COUNTRYCODE'",
				p_validation_field_1 : "#manage_country_master_edit_code",
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
		$("#manage_country_master_edit_name").initializeWTextbox({
			screenID : "manage_country_master_edit",
			maxlength : "50",
			defaultValue : "$manage_country_master_edit.variable.custom.name_defaultValue"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_country_master.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_country_master.variable.custom.selectedRecord.rec_tstamp;
			};
			returnValue = executeService_save_manage_country_master({
					p_country_code : $("#manage_country_master_edit_code").getVal(),
					p_country_name : $("#manage_country_master_edit_name").getVal(),
					p_crud_ind : manage_country_master.variable.custom.crudIndicator,
					p_rec_tstamp : recordTimeStamp
				});
			if (returnValue == "SP001") {
				alert("Country Details is saved successfully");
				return true;
			} else {
				alert("Saving of Country Details Failed");
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}
			],
		},
		custom : {
			code_defaultValue : "",
			name_defaultValue : ""
		},
	}
};