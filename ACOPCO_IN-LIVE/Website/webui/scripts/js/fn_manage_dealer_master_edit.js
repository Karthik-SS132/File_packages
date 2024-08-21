var manage_dealer_master_edit = {
	constructScreen : function () {
		if (manage_dealer_master.variable.custom.crudIndicator == "U" || manage_dealer_master.variable.custom.crudIndicator == "V") {
			manage_dealer_master_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_dealer_master_detail",
				outputPath : "context/outputparam",
				inputParameter : {
					p_dealer_id : "$manage_dealer_master.variable.custom.selectedRecord.id"
				},
			});
			manage_dealer_master_edit.variable.custom.datasource_1.read();
			manage_dealer_master_edit.variable.custom.datasource_1_record = manage_dealer_master_edit.variable.custom.datasource_1.at(0);
			manage_dealer_master_edit.variable.custom.datasource_1_record.default_locale_desc = mserviceUtilities.getDescriptionForCode("LOCALE_DESC", manage_dealer_master_edit.variable.custom.datasource_1_record.default_locale, "");
			manage_dealer_master_edit.variable.custom.org_level_no_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELNO_LIST", manage_dealer_master_edit.variable.custom.datasource_1_record.organogram_level_no, "");
			manage_dealer_master_edit.variable.custom.org_level_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELCODE_LIST", manage_dealer_master_edit.variable.custom.datasource_1_record.organogram_level_code, "");
		}
	},
	initializeWidgets : function () {
		$("#manage_dealer_master_edit_dealer_id").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "15",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.id",
			keyField : {
				p_screen_name : "'DEALER_MASTER'",
				p_validation_field_1 : "#manage_dealer_master_edit_dealer_id",
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
		$("#manage_dealer_master_edit_dealer_short_name").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "50",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.short_name",
		});
		$("#manage_dealer_master_edit_dealer_long_name").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "100",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.long_name",
		});
		$("#manage_dealer_master_edit_address_line_1").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "200",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.address_line_1",
		});
		$("#manage_dealer_master_edit_address_line_2").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "200",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.address_line_2",
		});
		$("#manage_dealer_master_edit_address_line_3").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "200",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.address_line_3",
		});
		$("#manage_dealer_master_edit_city").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "30",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.city",
		});
		$("#manage_dealer_master_edit_pincode").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "10",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.pincode",
		});
		$("#manage_dealer_master_edit_country").initializeWDropdownlist({
			screenID : "manage_dealer_master_edit",
			dataSource : {
				informationType : "'COUNTRY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.country_code",
			defaultValueDescription : "$manage_dealer_master_edit.variable.custom.datasource_1_record.country_name",
			childFieldID : "manage_dealer_master_edit_state"
		});
		$("#manage_dealer_master_edit_state").initializeWDropdownlist({
			screenID : "manage_dealer_master_edit",
			dataSource : {
					informationType : "'STATECODE_LIST'",
					searchField1 : "#manage_dealer_master_edit_country"
				},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.state_code",
			defaultValueDescription : "$manage_dealer_master_edit.variable.custom.datasource_1_record.state_name"
		});
		$("#manage_dealer_master_edit_org_level_no").initializeWDropdownlist({
			screenID : "manage_dealer_master_edit",
			dataSource : {
				informationType : "'ORGLEVELNO_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_dealer_master_edit_org_level_code",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.organogram_level_no",
			defaultValueDescription : "$manage_dealer_master_edit.variable.custom.org_level_no_defaultValueDescription"
		});
		$("#manage_dealer_master_edit_org_level_code").initializeWDropdownlist({
			screenID : "manage_dealer_master_edit",
			dataSource : {
				informationType : "'ORGLEVELCODE_LIST'",
				searchField1 : "#manage_dealer_master_edit_org_level_no",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.organogram_level_code",
			defaultValueDescription : "$manage_dealer_master_edit.variable.custom.org_level_code_defaultValueDescription"
		});
		$("#manage_dealer_master_edit_company_location").initializeWDropdownlist({
			screenID : "manage_dealer_master_edit",
			dataSource : {
				informationType : "'COMPANYLOCATION_LIST'",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.company_location",
			defaultValueDescription : "$manage_dealer_master_edit.variable.custom.datasource_1_record.company_location_desc"
		});
		$("#manage_dealer_master_edit_landline_1").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "20",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.landline_1"
		});
		$("#manage_dealer_master_edit_landline_2").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "20",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.landline_2"
		});
		$("#manage_dealer_master_edit_fax_1").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "20",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.fax_1"
		});
		$("#manage_dealer_master_edit_fax_2").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "20",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.fax_2"
		});
		$("#manage_dealer_master_edit_contact_name").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "60",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.contact_person_name"
		});
		$("#manage_dealer_master_edit_contact_mobile_no").initializeWCombotextbox({
			screenID : "manage_dealer_master_edit",
			dataSource: {
				informationType: "'COUNTRYDIALCODE_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.contact_person_mobileno",
			defaultValueDescription : "$mserviceUtilities.getDescriptionForCode('COUNTRYDIALCODE_LIST',manage_dealer_master_edit.variable.custom.contact_person_mobileno_defaultValue.split('-')[0],'')"
		});
		$("#manage_dealer_master_edit_contact_email").initializeWTextbox({
			screenID : "manage_dealer_master_edit",
			maxlength : "60",
			type : "email",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.contact_person_emailid"
		});
		$("#manage_dealer_master_edit_dealer_status").initializeWCheckbox({
			screenID : "manage_dealer_master_edit",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.dealer_status"
		});
		$("#manage_dealer_master_edit_locale").initializeWDropdownlist({
			screenID : "manage_dealer_master_edit",
			dataSource : {
				informationType : "'LOCALE_LIST'",
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_dealer_master_edit.variable.custom.datasource_1_record.default_locale",
			defaultValueDescription : "$manage_dealer_master_edit.variable.custom.datasource_1_record.default_locale_desc"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_dealer_master.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_dealer_master_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			returnValue = executeService_save_manage_dealer_master({
				p_dealer_id : $("#manage_dealer_master_edit_dealer_id").getVal(),
				p_dealer_name_short : $("#manage_dealer_master_edit_dealer_short_name").getVal(),
				p_dealer_name_long : $("#manage_dealer_master_edit_dealer_long_name").getVal(),
				p_address_line_1 : $("#manage_dealer_master_edit_address_line_1").getVal(),
				p_address_line_2 : $("#manage_dealer_master_edit_address_line_2").getVal(),
				p_address_line_3 : $("#manage_dealer_master_edit_address_line_3").getVal(),
				p_city : $("#manage_dealer_master_edit_city").getVal(),
				p_state : $("#manage_dealer_master_edit_state").getVal(),
				p_country : $("#manage_dealer_master_edit_country").getVal(),
				p_pincode : $("#manage_dealer_master_edit_pincode").getVal(),
				p_landline_1 : $("#manage_dealer_master_edit_landline_1").getVal(),
				p_landline_2 : $("#manage_dealer_master_edit_landline_2").getVal(),
				p_fax_no_1 : $("#manage_dealer_master_edit_fax_1").getVal(),
				p_fax_no_2 : $("#manage_dealer_master_edit_fax_2").getVal(),
				p_contact_person_name : $("#manage_dealer_master_edit_contact_name").getVal(),
				p_contact_person_mobile_no : $("#manage_dealer_master_edit_contact_mobile_no").getVal(),
				p_contact_person_email_id : $("#manage_dealer_master_edit_contact_email").getVal(),
				p_dealer_status : $("#manage_dealer_master_edit_dealer_status").getVal(),
				p_default_locale_id : $("#manage_dealer_master_edit_locale").getVal(),
				p_org_level_no : $("#manage_dealer_master_edit_org_level_no").getVal(),
				p_org_level_code : $("#manage_dealer_master_edit_org_level_code").getVal(),
				p_company_location_code : $("#manage_dealer_master_edit_company_location").getVal(),
				p_inputparam_udf_xml : $("#manage_dealer_master_edit_content_1").getInputparamXML({
					screenID : "manage_dealer_master_edit",
					matchCondition : ["manage_dealer_master_edit_udf","manage_dealer_master_edit_product_udf"]
				}),
				p_save_mode : manage_dealer_master.variable.custom.crudIndicator,
				p_rec_tstamp : recordTimeStamp
			});
			if (returnValue == "SP001") {
				alert("Dealer data is saved successfully");
				return true;
			} else {
				alert("Saving of Dealer Details Failed");
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			
		},
	}
};
