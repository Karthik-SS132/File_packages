var manage_users_edit = {
	constructScreen : function () {
		$("#manage_users_edit_photo_reference").attr("src", "../../common/images/no_user_image.png");
		if (manage_users.variable.custom.crudIndicator == "U" || manage_users.variable.custom.crudIndicator == "V") {
			manage_users_edit.variable.custom.user_id_defaultValue = manage_users.variable.custom.selectedRecord.user_id;
			manage_users_edit.variable.custom.user_group_id_defaultValue = manage_users.variable.custom.selectedRecord.user_group_id;
			manage_users_edit.variable.custom.user_group_id_defaultValueDescription = manage_users.variable.custom.selectedRecord.user_group_name;
			manage_users_edit.variable.custom.employee_id_defaultValue = manage_users.variable.custom.selectedRecord.emp_id;
			manage_users_edit.variable.custom.employee_id_defaultValueDescription = manage_users.variable.custom.selectedRecord.emp_name;
			manage_users_edit.variable.custom.company_location_defaultValue = manage_users.variable.custom.selectedRecord.loc_name;
			manage_users_edit.variable.custom.locale_defaultValue = manage_users.variable.custom.selectedRecord.locale;
			manage_users_edit.variable.custom.locale_defaultValueDescription = manage_users.variable.custom.selectedRecord.locale_desc;
			manage_users_edit.variable.custom.timezone_defaultValue = manage_users.variable.custom.selectedRecord.timezone;
			manage_users_edit.variable.custom.timezone_defaultValueDescription = manage_users.variable.custom.selectedRecord.timezone_desc;
			if (manage_users.variable.custom.selectedRecord.photo_ref != "") {
				$("#manage_users_edit_photo_reference").attr("src", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + mserviceUtilities.getFileUploadPath({
						transactionType : "USERPHOTO",
						async : false,
						referenceNumber : manage_users.variable.custom.selectedRecord.emp_id
					}) + "/" + manage_users.variable.custom.selectedRecord.photo_ref);
			}
		}
	},
	initializeWidgets : function () {
		$("#manage_users_edit_user_id").initializeWTextbox({
			screenID : "manage_users_edit",
			maxlength : "12",
			defaultValue : "$manage_users_edit.variable.custom.user_id_defaultValue",
			keyField : {
				p_screen_name : "'USERID'",
				p_validation_field_1 : "#manage_users_edit_user_id",
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
		$("#manage_users_edit_user_group_id").initializeWDropdownlist({
			screenID : "manage_users_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'USER_GROUP_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_users_edit.variable.custom.user_group_id_defaultValue",
			defaultValueDescription : "$manage_users_edit.variable.custom.user_group_id_defaultValueDescription"
		});
		manage_users_edit.variable.custom.employee_id = $("#manage_users_edit_employee_id").initializeWCombobox({
				screenID : "manage_users_edit",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'NON_USER_EMPLOYEE_LIST'",
						p_search_field_1 : "",
						p_search_field_2 : "",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
				},
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1",
				defaultValue : "$manage_users_edit.variable.custom.employee_id_defaultValue",
				defaultValueDescription : "$manage_users_edit.variable.custom.employee_id_defaultValueDescription"
			});
		$("#manage_users_edit_company_location").initializeWDisplayarea({
			screenID : "manage_users_edit",
			defaultValue : "$manage_users_edit.variable.custom.company_location_defaultValue"
		});
		$("#manage_users_edit_locale").initializeWDropdownlist({
			screenID : "manage_users_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'LOCALE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_users_edit.variable.custom.locale_defaultValue",
			defaultValueDescription : "$manage_users_edit.variable.custom.locale_defaultValueDescription"
		});
		$("#manage_users_edit_timezone").initializeWDropdownlist({
			screenID : "manage_users_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'TIMEZONE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_users_edit.variable.custom.timezone_defaultValue",
			defaultValueDescription : "$manage_users_edit.variable.custom.timezone_defaultValueDescription"
		});
	},
	widgetEventHandler : {
		employee_id_change : function (element, event) {
			if (manage_users_edit.variable.custom.employee_id.dataItem() != undefined) {
				$("#manage_users_edit_company_location").setVal(manage_users_edit.variable.custom.employee_id.dataItem().p_description_field_2);
				if (manage_users_edit.variable.custom.employee_id.dataItem().p_description_field_3 != "") {
					$("#manage_users_edit_photo_reference").attr("src", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + mserviceUtilities.getFileUploadPath({
							transactionType : "USERPHOTO",
							async : false,
							referenceNumber : $("#manage_users_edit_employee_id").getVal("")
						}) + "/" + manage_users_edit.variable.custom.employee_id.dataItem().p_description_field_3);
				} else {
					$("#manage_users_edit_photo_reference").attr("src", "../../common/images/no_user_image.png");
				}
			} else {
				$("#manage_users_edit_company_location").setVal("");
				$("#manage_users_edit_photo_reference").attr("src", "../../common/images/no_user_image.png");
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_users.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_users.variable.custom.selectedRecord.rec_tstamp;
			}
			returnValue = executeService_save_manage_user_details({
					p_user_id : $("#manage_users_edit_user_id").getVal(),
					p_employee_id : $("#manage_users_edit_employee_id").getVal(),
					p_user_group_id : $("#manage_users_edit_user_group_id").getVal(),
					p_def_locale_id : $("#manage_users_edit_locale").getVal(),
					p_def_timezone_id : $("#manage_users_edit_timezone").getVal(),
					p_user_company_id : login_profile.client_id,
					p_user_country_code : login_profile.country_code,
					p_rec_tstamp : recordTimeStamp,
					p_save_mode : manage_users.variable.custom.crudIndicator
				});
			if (returnValue == "SP001") {
				alert("User Details saved successfully.");
				return true;
			} else {
				alert("Saving of User Details failed");
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
			user_id_defaultValue : "",
			user_group_id_defaultValue : "",
			user_group_id_defaultValueDescription : "",
			employee_id_defaultValue : "",
			employee_id_defaultValueDescription : "",
			company_location_defaultValue : "",
			locale_defaultValue : "",
			locale_defaultValueDescription : "",
			timezone_defaultValue : "",
			timezone_defaultValueDescription : ""
		}
	}
};