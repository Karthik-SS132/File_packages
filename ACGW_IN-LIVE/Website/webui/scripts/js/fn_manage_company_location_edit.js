var manage_company_location_edit = {
	constructScreen : function () {
		if (manage_company_location.variable.custom.crudIndicator == "U" || manage_company_location.variable.custom.crudIndicator == "V") {
			manage_company_location_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_company_location_details",
					inputParameter : {
						p_comploc_company_id : "$login_profile.client_id",
						p_comploc_location_id : "$manage_company_location.variable.custom.selectedRecord.comp_loc_code"
					}
				});
			manage_company_location_edit.variable.custom.datasource_1.read();
			manage_company_location_edit.variable.custom.datasource_1_record = manage_company_location_edit.variable.custom.datasource_1.at(0);
		}
	},
	initializeWidgets : function () {
		$("#manage_company_location_edit_comp_loc_code").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "8",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.comp_loc_code",
			keyField : {
				p_screen_name : "'COMPANYLOCATION'",
				p_validation_field_1 : "#manage_company_location_edit_comp_loc_code",
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
		$("#manage_company_location_edit_comp_short_name").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "50",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.comp_short_name"
		});
		$("#manage_company_location_edit_comp_long_name").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "50",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.comp_long_name"
		});
		$("#manage_company_location_edit_address_line_1").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "200",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.address_line_1"
		});
		$("#manage_company_location_edit_address_line_2").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "200",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.address_line_2"
		});
		$("#manage_company_location_edit_address_line_3").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "200",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.address_line_3"
		});
		$("#manage_company_location_edit_city").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "30",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.city"
		});
		$("#manage_company_location_edit_pincode").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "10",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.pincode"
		});
		$("#manage_company_location_edit_country").initializeWDropdownlist({
			screenID : "manage_company_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'COUNTRY_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.country",
			defaultValueDescription : "$manage_company_location_edit.variable.custom.datasource_1_record.country_name",
			childFieldID : "manage_company_location_edit_state"
		});
		$("#manage_company_location_edit_state").initializeWDropdownlist({
			screenID : "manage_company_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'STATE_LIST'",
					p_search_field_1 : "#manage_company_location_edit_country",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.state",
			defaultValueDescription : "$manage_company_location_edit.variable.custom.datasource_1_record.state_name"
		});
		$("#manage_company_location_edit_landline_1").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "20",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.landline_1"
		});
		$("#manage_company_location_edit_landline_2").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "20",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.landline_2"
		});
		$("#manage_company_location_edit_fax_1").initializeWTextbox({
			screenID : "manage_company_location_edit",
			maxlength : "20",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.fax_1"
		});
		$("#manage_company_location_edit_default_currency_code").initializeWDropdownlist({
			screenID : "manage_company_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CURRENCYCODE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.default_currency_code",
			defaultValueDescription : "'" + mserviceUtilities.getDescriptionForCode("CURRENCYCODE_DESC", manage_company_location_edit.variable.custom.datasource_1_record.default_currency_code, "") + "'"
		});
		$("#manage_company_location_edit_default_locale_id").initializeWDropdownlist({
			screenID : "manage_company_location_edit",
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
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.default_locale_id",
			defaultValueDescription : "'" + mserviceUtilities.getDescriptionForCode("LOCALE_DESC", manage_company_location_edit.variable.custom.datasource_1_record.default_locale_id, "") + "'"
		});
		$("#manage_company_location_edit_timezone_id").initializeWDropdownlist({
			screenID : "manage_company_location_edit",
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
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.timezone_id",
			defaultValueDescription : "'" + mserviceUtilities.getDescriptionForCode("TIMEZONE_DESC", manage_company_location_edit.variable.custom.datasource_1_record.timezone_id, "") + "'"
		});
		$("#manage_company_location_edit_date_display_format").initializeWDropdownlist({
			screenID : "manage_company_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'DATEDISPLAYFORMAT_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.date_display_format",
			defaultValueDescription : "'" + mserviceUtilities.getDescriptionForCode("DATEDISPLAYFORMAT_DESC", manage_company_location_edit.variable.custom.datasource_1_record.date_display_format, "") + "'"
		});
		$("#manage_company_location_edit_head_emp_id").initializeWCombobox({
			screenID : "manage_company_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'EMPLOYEE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_company_location_edit.variable.custom.datasource_1_record.head_emp_id",
			defaultValueDescription : "'" + mserviceUtilities.getDescriptionForCode("EMPLOYEE_DESC", manage_company_location_edit.variable.custom.datasource_1_record.head_emp_id, "") + "'"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_company_location.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_company_location_edit.variable.custom.datasource_1_record.rec_tstamp;
			};
			returnValue = executeService_save_manage_company_location({
					p_location_code : $("#manage_company_location_edit_comp_loc_code").getVal(),
					p_location_name_short : $("#manage_company_location_edit_comp_short_name").getVal(),
					p_location_name_long : $("#manage_company_location_edit_comp_long_name").getVal(),
					p_address_line_1 : $("#manage_company_location_edit_address_line_1").getVal(),
					p_address_line_2 : $("#manage_company_location_edit_address_line_2").getVal(),
					p_address_line_3 : $("#manage_company_location_edit_address_line_3").getVal(),
					p_city : $("#manage_company_location_edit_city").getVal(),
					p_state : $("#manage_company_location_edit_state").getVal(),
					p_country : $("#manage_company_location_edit_country").getVal(),
					p_pincode : $("#manage_company_location_edit_pincode").getVal(),
					p_landline_1 : $("#manage_company_location_edit_landline_1").getVal(),
					p_landline_2 : $("#manage_company_location_edit_landline_2").getVal(),
					p_fax_no_1 : $("#manage_company_location_edit_fax_1").getVal(),
					p_default_locale_id : $("#manage_company_location_edit_default_locale_id").getVal(),
					p_default_currency_code : $("#manage_company_location_edit_default_currency_code").getVal(),
					p_timezone_id : $("#manage_company_location_edit_timezone_id").getVal(),
					p_date_display_format : $("#manage_company_location_edit_date_display_format").getVal(),
					p_head_emp_id : $("#manage_company_location_edit_head_emp_id").getVal(),
					p_inputparam_udf_xml : $("#manage_company_location_edit_content_1").getInputparamXML({
						screenID : "manage_company_location_edit",
						matchCondition : ["manage_company_location_edit_udf"]
					}),
					p_save_mode : manage_company_location.variable.custom.crudIndicator,
					p_rec_tstamp : recordTimeStamp
				});
			if (returnValue == "SP001") {
				alert("Company Location Saved Successfully");
				return true;
			} else {
				alert("Saving of Company Location Failed");
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
			valueChangeIndicator : false,
		},
		custom : {
			datasource_1 : "",
			datasource_1_record : ""
		},
	}
};
