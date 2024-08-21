var manage_customer_master_edit = {
	constructScreen : function () {
		if (manage_customer_master.variable.custom.crudIndicator == "U" || manage_customer_master.variable.custom.crudIndicator == "V") {
			manage_customer_master_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_customer_master_details",
					inputParameter : {
						p_customer_id : "$manage_customer_master.variable.custom.selectedRecord.cust_id"
					}
				});
			manage_customer_master_edit.variable.custom.datasource_1.read();
			manage_customer_master_edit.variable.custom.datasource_1_record = manage_customer_master_edit.variable.custom.datasource_1.at(0);
			manage_customer_master_edit.variable.custom.customer_id_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.cust_id;
			manage_customer_master_edit.variable.custom.customer_name_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.cust_name;
			manage_customer_master_edit.variable.custom.address_line_1_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.address_line1;
			manage_customer_master_edit.variable.custom.address_line_2_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.address_line2;
			manage_customer_master_edit.variable.custom.address_line_3_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.address_line3;
			manage_customer_master_edit.variable.custom.city_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.city;
			manage_customer_master_edit.variable.custom.pin_code_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.zip;
			manage_customer_master_edit.variable.custom.country_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.country;
			manage_customer_master_edit.variable.custom.state_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.state;
			manage_customer_master_edit.variable.custom.telephone_1_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.landline_1;
			manage_customer_master_edit.variable.custom.telephone_2_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.landline_2;
			manage_customer_master_edit.variable.custom.fax_1_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.fax_1;
			manage_customer_master_edit.variable.custom.fax_2_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.fax_2;
			manage_customer_master_edit.variable.custom.contact_name_1_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.contact_1;
			manage_customer_master_edit.variable.custom.contact_name_2_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.contact_2;
			manage_customer_master_edit.variable.custom.mobile_number_1_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.contact_1_mobile_no;
			manage_customer_master_edit.variable.custom.mobile_number_2_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.contact_2_mobile_no;
			manage_customer_master_edit.variable.custom.email_id_1_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.contact_1_email;
			manage_customer_master_edit.variable.custom.email_id_2_defaultValue = manage_customer_master_edit.variable.custom.datasource_1_record.contact_2_email;
		}
	},
	initializeWidgets : function () {
		$("#manage_customer_master_edit_customer_id").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "15",
			defaultValue : "$manage_customer_master_edit.variable.custom.customer_id_defaultValue",
			keyField : {
				p_screen_name : "'CUSTID'",
				p_validation_field_1 : "#manage_customer_master_edit_customer_id",
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
		$("#manage_customer_master_edit_customer_name").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "100",
			defaultValue : "$manage_customer_master_edit.variable.custom.customer_name_defaultValue"
		});
		$("#manage_customer_master_edit_address_line_1").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "200",
			defaultValue : "$manage_customer_master_edit.variable.custom.address_line_1_defaultValue"
		});
		$("#manage_customer_master_edit_address_line_2").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "200",
			defaultValue : "$manage_customer_master_edit.variable.custom.address_line_2_defaultValue"
		});
		$("#manage_customer_master_edit_address_line_3").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "200",
			defaultValue : "$manage_customer_master_edit.variable.custom.address_line_3_defaultValue"
		});
		$("#manage_customer_master_edit_city").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "60",
			defaultValue : "$manage_customer_master_edit.variable.custom.city_defaultValue"
		});
		$("#manage_customer_master_edit_pin_code").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "10",
			defaultValue : "$manage_customer_master_edit.variable.custom.pin_code_defaultValue"
		});
		$("#manage_customer_master_edit_country").initializeWDropdownlist({
			screenID : "manage_customer_master_edit",
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
			defaultValue : "$manage_customer_master_edit.variable.custom.country_defaultValue",
			defaultValueDescription : "$manage_customer_master_edit.variable.custom.country_defaultValue",
			childFieldID : "manage_customer_master_edit_state"
		});
		$("#manage_customer_master_edit_state").initializeWDropdownlist({
			screenID : "manage_customer_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'STATE_LIST'",
					p_search_field_1 : "#manage_customer_master_edit_country",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_customer_master_edit.variable.custom.state_defaultValue",
			defaultValueDescription : "$manage_customer_master_edit.variable.custom.state_defaultValue"
		});
		$("#manage_customer_master_edit_telephone_1").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "20",
			defaultValue : "$manage_customer_master_edit.variable.custom.telephone_1_defaultValue"
		});
		$("#manage_customer_master_edit_telephone_2").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "20",
			defaultValue : "$manage_customer_master_edit.variable.custom.telephone_2_defaultValue"
		});
		$("#manage_customer_master_edit_fax_1").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "20",
			defaultValue : "$manage_customer_master_edit.variable.custom.fax_1_defaultValue"
		});
		$("#manage_customer_master_edit_fax_2").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "20",
			defaultValue : "$manage_customer_master_edit.variable.custom.fax_2_defaultValue"
		});
		$("#manage_customer_master_edit_contact_name_1").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "60",
			defaultValue : "$manage_customer_master_edit.variable.custom.contact_name_1_defaultValue"
		});
		$("#manage_customer_master_edit_contact_name_2").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "60",
			defaultValue : "$manage_customer_master_edit.variable.custom.contact_name_2_defaultValue"
		});
		$("#manage_customer_master_edit_mobile_number_1").initializeWCombotextbox({
			screenID : "manage_customer_master_edit",
			dataSource: {
				informationType: "'COUNTRYDIALCODE_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			defaultValue : "$manage_customer_master_edit.variable.custom.mobile_number_1_defaultValue",
			defaultValueDescription : "$mserviceUtilities.getDescriptionForCode('COUNTRYDIALCODE_LIST',manage_customer_master_edit.variable.custom.mobile_number_1_defaultValue.split('-')[0],'')"
		});
		$("#manage_customer_master_edit_mobile_number_2").initializeWCombotextbox({
			screenID : "manage_customer_master_edit",
			dataSource: {
				informationType: "'COUNTRYDIALCODE_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			defaultValue : "$manage_customer_master_edit.variable.custom.mobile_number_2_defaultValue",
			defaultValueDescription : "$mserviceUtilities.getDescriptionForCode('COUNTRYDIALCODE_LIST',manage_customer_master_edit.variable.custom.mobile_number_2_defaultValue.split('-')[0],'')"
		});
		$("#manage_customer_master_edit_email_id_1").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "60",
			defaultValue : "$manage_customer_master_edit.variable.custom.email_id_1_defaultValue"
		});
		$("#manage_customer_master_edit_email_id_2").initializeWTextbox({
			screenID : "manage_customer_master_edit",
			maxlength : "60",
			defaultValue : "$manage_customer_master_edit.variable.custom.email_id_2_defaultValue"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_customer_master.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_customer_master_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			returnValue = executeService_save_manage_customer_master({
				p_customer_id: $("#manage_customer_master_edit_customer_id").getVal(),
				p_customer_name: $("#manage_customer_master_edit_customer_name").getVal(),
				p_address_line_1: $("#manage_customer_master_edit_address_line_1").getVal(),
				p_address_line_2: $("#manage_customer_master_edit_address_line_2").getVal(),
				p_address_line_3: $("#manage_customer_master_edit_address_line_3").getVal(),
				p_city: $("#manage_customer_master_edit_city").getVal(),
				p_state: $("#manage_customer_master_edit_state").getVal(),
				p_country: $("#manage_customer_master_edit_country").getVal(),
				p_pincode: $("#manage_customer_master_edit_pin_code").getVal(),
				p_landline_1: $("#manage_customer_master_edit_telephone_1").getVal(),
				p_landline_2: $("#manage_customer_master_edit_telephone_2").getVal(),
				p_fax_no_1: $("#manage_customer_master_edit_fax_1").getVal(),
				p_fax_no_2: $("#manage_customer_master_edit_fax_2").getVal(),
				p_contact_person_1: $("#manage_customer_master_edit_contact_name_1").getVal(),
				p_contact_person_1_mobile_no: $("#manage_customer_master_edit_mobile_number_1").getVal(),
				p_contact_person_1_email_id: $("#manage_customer_master_edit_email_id_1").getVal(),
				p_contact_person_2: $("#manage_customer_master_edit_contact_name_2").getVal(),
				p_contact_person_2_mobile_no: $("#manage_customer_master_edit_mobile_number_2").getVal(),
				p_contact_person_2_email_id: $("#manage_customer_master_edit_email_id_2").getVal(),
				p_inputparam_udf_xml: $("#manage_customer_master_edit_content_1").getInputparamXML({
						screenID : "manage_customer_master_edit",
						matchCondition : ["manage_customer_master_edit_udf","manage_customer_master_edit_product_udf"]
					}),
				p_save_mode: manage_customer_master.variable.custom.crudIndicator,
				p_rec_tstamp: recordTimeStamp			
			});
			if (returnValue.updateStatus == "SP001") {
				alert("Customer id : " + returnValue.customer_id + " is saved successfully");
				return true;
			} else {
				alert("Saving of Customer Details Failed");
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