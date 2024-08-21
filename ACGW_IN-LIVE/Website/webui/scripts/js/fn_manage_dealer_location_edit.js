var manage_dealer_location_edit = {
	constructScreen : function () {
		if (manage_dealer_location.variable.custom.dealer_id_filter_defaultValue != undefined) {
			manage_dealer_location_edit.variable.custom.defaultValue_dealer_id = manage_dealer_master.variable.custom.selectedRecord.id;
			manage_dealer_location_edit.variable.custom.defaultValue_dealer_short_name = manage_dealer_master.variable.custom.selectedRecord.short_name;
		};
		if (manage_dealer_location.variable.custom.crudIndicator == "U" || manage_dealer_location.variable.custom.crudIndicator == "V" ) {
			manage_dealer_location_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_dealer_location_detail",
					outputPath : "context/outputparam",
					inputParameter : {
						p_dealer_id : "$manage_dealer_location.variable.custom.selectedRecord.id",
						p_dealer_location_code : "$manage_dealer_location.variable.custom.selectedRecord.location_code"
					}
				});
			manage_dealer_location_edit.variable.custom.datasource_1.read();
			manage_dealer_location_edit.variable.custom.datasource_1_record = manage_dealer_location_edit.variable.custom.datasource_1.at(0);
			manage_dealer_location_edit.variable.custom.defaultValue_dealer_id = manage_dealer_location_edit.variable.custom.datasource_1_record.id;
			manage_dealer_location_edit.variable.custom.datasource_1_record.default_locale_desc = mserviceUtilities.getDescriptionForCode("LOCALE_DESC", manage_dealer_location_edit.variable.custom.datasource_1_record.default_locale, "");
			manage_dealer_location_edit.variable.custom.datasource_1_record.default_currency_code_desc = mserviceUtilities.getDescriptionForCode("CURRENCYCODE_DESC", manage_dealer_location_edit.variable.custom.datasource_1_record.default_currency_code, "");
			manage_dealer_location_edit.variable.custom.datasource_1_record.timezone_id_desc = mserviceUtilities.getDescriptionForCode("TIMEZONE_DESC", manage_dealer_location_edit.variable.custom.datasource_1_record.timezone_id, "");
			manage_dealer_location_edit.variable.custom.datasource_1_record.date_display_format_desc = mserviceUtilities.getDescriptionForCode("DATEDISPLAYFORMAT_DESC", manage_dealer_location_edit.variable.custom.datasource_1_record.date_display_format, "");
			manage_dealer_location_edit.variable.custom.datasource_1_record.head_emp_id_desc = mserviceUtilities.getDescriptionForCode("EMPLOYEE_DESC", manage_dealer_location_edit.variable.custom.datasource_1_record.head_emp_id, "");
		}
	},
	initializeWidgets : function () {
		$("#manage_dealer_location_edit_dealer_id").initializeWCombobox({
			screenID : "manage_dealer_location_edit",
			dataSource : {
				informationType : "'DEALER_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_location_edit.variable.custom.defaultValue_dealer_id",
			defaultValueDescription : "$manage_dealer_location_edit.variable.custom.defaultValue_dealer_short_name",
		});
		$("#manage_dealer_location_edit_location_code").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "8",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.location_code",
			keyField : {
				p_screen_name : "'DEALER_LOC_MASTER'",
				p_validation_field_1 : "#manage_dealer_location_edit_dealer_id",
				p_validation_field_2 : "#manage_dealer_location_edit_location_code",
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
		$("#manage_dealer_location_edit_location_name_short").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "50",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.short_name"
		});
		$("#manage_dealer_location_edit_location_name_long").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "100",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.long_name"
		});
		$("#manage_dealer_location_edit_address_line_1").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "200",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.address_line_1"
		});
		$("#manage_dealer_location_edit_address_line_2").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "200",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.address_line_2"
		});
		$("#manage_dealer_location_edit_address_line_3").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "200",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.address_line_3"
		});
		$("#manage_dealer_location_edit_city").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "30",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.city"
		});
		$("#manage_dealer_location_edit_pin_code").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "10",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.pincode"
		});
		$("#manage_dealer_location_edit_country").initializeWDropdownlist({
			screenID : "manage_dealer_location_edit",
			dataSource : {
				informationType : "'COUNTRY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.country_code",
			defaultValueDescription : "$manage_dealer_location_edit.variable.custom.datasource_1_record.country_name",
			childFieldID : "manage_dealer_location_edit_state"
		});
		$("#manage_dealer_location_edit_state").initializeWDropdownlist({
			screenID : "manage_dealer_location_edit",
			dataSource : {
				informationType : "'STATECODE_LIST'",
				searchField1 : "#manage_dealer_location_edit_country"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.state_code",
			defaultValueDescription : "$manage_dealer_location_edit.variable.custom.datasource_1_record.state_name"
		});
		$("#manage_dealer_location_edit_telephone_1").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "20",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.landline_1"
		});
		$("#manage_dealer_location_edit_telephone_2").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "20",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.landline_2"
		});
		$("#manage_dealer_location_edit_fax_1").initializeWTextbox({
			screenID : "manage_dealer_location_edit",
			maxlength : "20",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.fax_1"
		});
		$("#manage_dealer_location_edit_locale").initializeWDropdownlist({
			screenID : "manage_dealer_location_edit",
			dataSource : {
				informationType : "'LOCALE_LIST'",
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.default_locale",
			defaultValueDescription : "$manage_dealer_location_edit.variable.custom.datasource_1_record.default_locale_desc"
		});
		$("#manage_dealer_location_edit_currency_code").initializeWDropdownlist({
			screenID : "manage_dealer_location_edit",
			dataSource : {
				informationType : "'CURRENCYCODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.default_currency_code",
			defaultValueDescription : "$manage_dealer_location_edit.variable.custom.datasource_1_record.default_currency_code_desc"
		});
		$("#manage_dealer_location_edit_timezone_id").initializeWDropdownlist({
			screenID : "manage_dealer_location_edit",
			dataSource : {
				informationType : "'TIMEZONE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.timezone_id",
			defaultValueDescription : "$manage_dealer_location_edit.variable.custom.datasource_1_record.timezone_id_desc"
		});
		$("#manage_dealer_location_edit_date_display_format").initializeWDropdownlist({
			screenID : "manage_dealer_location_edit",
			dataSource : {
				informationType : "'DATEDISPLAYFORMAT_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.date_display_format",
			defaultValueDescription : "$manage_dealer_location_edit.variable.custom.datasource_1_record.date_display_format_desc"
		});
		$("#manage_dealer_location_edit_head_emp_id").initializeWCombobox({
			screenID : "manage_dealer_location_edit",
			dataSource : {
				informationType : "'EMPLOYEE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_location_edit.variable.custom.datasource_1_record.head_emp_id",
			defaultValueDescription : "$manage_dealer_location_edit.variable.custom.datasource_1_record.head_emp_id_desc"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_dealer_location.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_dealer_location_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			returnValue = executeService_save_manage_dealer_location({
				p_dealer_id :$("#manage_dealer_location_edit_dealer_id").getVal(),
				p_dealer_loc_code : $("#manage_dealer_location_edit_location_code").getVal(),
				p_location_name_short : $("#manage_dealer_location_edit_location_name_short").getVal(),
				p_location_name_long : $("#manage_dealer_location_edit_location_name_long").getVal(),
				p_address_line_1 : $("#manage_dealer_location_edit_address_line_1").getVal(),
				p_address_line_2 : $("#manage_dealer_location_edit_address_line_2").getVal(),
				p_address_line_3 : $("#manage_dealer_location_edit_address_line_3").getVal(),
				p_city : $("#manage_dealer_location_edit_city").getVal(),
				p_state : $("#manage_dealer_location_edit_state").getVal(),
				p_country : $("#manage_dealer_location_edit_country").getVal(),
				p_pincode : $("#manage_dealer_location_edit_pin_code").getVal(),
				p_photo_reference : "",
				p_landline_1 : $("#manage_dealer_location_edit_telephone_1").getVal(),
				p_landline_2 : $("#manage_dealer_location_edit_telephone_2").getVal(),
				p_fax_no_1 : $("#manage_dealer_location_edit_fax_1").getVal(),
				p_default_locale_id : $("#manage_dealer_location_edit_locale").getVal(),
				p_currency_code : $("#manage_dealer_location_edit_currency_code").getVal(),
				p_timezone_id : $("#manage_dealer_location_edit_timezone_id").getVal(),
				p_date_display_format : $("#manage_dealer_location_edit_date_display_format").getVal(),
				p_head_emp_id : $("#manage_dealer_location_edit_head_emp_id").getVal(),
				p_inputparam_udf_xml : $("#manage_dealer_location_edit_content_1").getInputparamXML({
					screenID : "manage_dealer_location_edit",
					matchCondition : ["manage_dealer_location_edit_udf","manage_dealer_location_edit_product_udf"]
				}),
				p_save_mode : manage_dealer_location.variable.custom.crudIndicator,
				p_rec_tstamp : recordTimeStamp
			});
			if (returnValue == "SP001") {
				alert("Dealer Location Details data is saved successfully.");
				return true;
			} else {
				alert("Saving of Dealer Location Details data failed");
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
		custom : {},
	}
};
