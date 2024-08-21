var manage_financier_contacts_edit = {
	constructScreen : function () {
		if (manage_financier_contacts.variable.custom.crudIndicator != "A") {
			manage_financier_contacts_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_custom_info_detail",
					outputPath : false,
					api : true,
					pageSize : 10,
					inputParameter : {
						p_custom_info_code : "'financier_location_contacts'",
						p_custom_info_ref_no1 : "$manage_financier_contacts.variable.custom.selectedRecord.financier_id",
						p_custom_info_ref_no2 : "$manage_financier_contacts.variable.custom.selectedRecord.contact_phone_no"
					},
					schemaModel : true,
					screenID : "manage_financier_contacts_edit",
					dataSourceName : "datasource_1",
					processResponse : true,
					parse : manage_financier_contacts_edit.customRequirementHandler.customInfoDetail
				});
			manage_financier_contacts_edit.variable.custom.datasource_1.read();
			manage_financier_contacts_edit.variable.custom.datasource_1_record = manage_financier_contacts_edit.variable.custom.header_1_record;
			manage_financier_contacts_edit.variable.custom.financier_id_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.financier_id;
			manage_financier_contacts_edit.variable.custom.first_name_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.financier_name;
			manage_financier_contacts_edit.variable.custom.location_code_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.location_code;
			manage_financier_contacts_edit.variable.custom.first_name_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.first_name;
			manage_financier_contacts_edit.variable.custom.middle_name_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.middle_name;
			manage_financier_contacts_edit.variable.custom.last_name_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.last_name;
			
			manage_financier_contacts_edit.variable.custom.address_line_1_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.address_line_1;
			manage_financier_contacts_edit.variable.custom.address_line_2_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.address_line_2;
			manage_financier_contacts_edit.variable.custom.address_line_3_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.address_line_3;
			manage_financier_contacts_edit.variable.custom.city_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.city;
			manage_financier_contacts_edit.variable.custom.pin_code_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.pincode;
			manage_financier_contacts_edit.variable.custom.country_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.country;
			manage_financier_contacts_edit.variable.custom.state_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.state;
			manage_financier_contacts_edit.variable.custom.contact_phone_no_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.contact_phone_no;
			manage_financier_contacts_edit.variable.custom.department_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.department;
			manage_financier_contacts_edit.variable.custom.designation_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.designation;
			manage_financier_contacts_edit.variable.custom.email_id_defaultValue = manage_financier_contacts_edit.variable.custom.datasource_1_record.email_id;
			
		}

	},
	postConstruct : function () {
		$("#manage_financier_contacts_edit_location_code_group").after("<hr>");
		$("#manage_financier_contacts_edit_last_name_group").after("<hr>");
		$("#manage_financier_contacts_edit_address_line_3_group").after("<hr>");
		$("#manage_financier_contacts_edit_email_id_1_group").after("<hr>");
		$("#manage_financier_contacts_edit_department_group").after("<hr>");
		$("#manage_financier_contacts_edit_state_group").after("<hr>");
	},
	initializeWidgets : function () {
		$("#manage_financier_contacts_edit_financier_id").initializeWCombobox({
			screenID : "manage_financier_contacts_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'ABS_FINANCIER_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.financier_id_defaultValue",
			defaultValueDescription : "$manage_financier_contacts_edit.variable.custom.financier_id_defaultValueDescription",
			childFieldID : "manage_financier_contacts_edit_location_code"
		});
		$("#manage_financier_contacts_edit_location_code").initializeWCombobox({
			screenID : "manage_financier_contacts_edit",
			dataSource : {
				informationType : "'FINANCIERLOCATION_LIST'",
				searchField1 : "#manage_financier_contacts_edit_financier_id"
			},
			dataTextField : "name",
			dataValueField : "id",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.location_code_defaultValue",
			defaultValueDescription : "$manage_financier_contacts_edit.variable.custom.location_code_defaultValueDescription"
		});
		$("#manage_financier_contacts_edit_first_name").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "50",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.first_name_defaultValue"
		});
		$("#manage_financier_contacts_edit_middle_name").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "100",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.middle_name_defaultValue"
		});
		$("#manage_financier_contacts_edit_last_name").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "100",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.last_name_defaultValue"
		});
		$("#manage_financier_contacts_edit_address_line_1").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "200",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.address_line_1_defaultValue"
		});
		$("#manage_financier_contacts_edit_address_line_2").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "200",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.address_line_2_defaultValue"
		});
		$("#manage_financier_contacts_edit_address_line_3").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "200",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.address_line_3_defaultValue"
		});
		$("#manage_financier_contacts_edit_city").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "60",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.city_defaultValue"
		});
		$("#manage_financier_contacts_edit_pin_code").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "10",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.pin_code_defaultValue"
		});
		$("#manage_financier_contacts_edit_country").initializeWDropdownlist({
			screenID : "manage_financier_contacts_edit",
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
			defaultValue : "$manage_financier_contacts_edit.variable.custom.country_defaultValue",
			defaultValueDescription : "$manage_financier_contacts_edit.variable.custom.country_defaultValue",
			childFieldID : "manage_financier_contacts_edit_state"
		});
		$("#manage_financier_contacts_edit_state").initializeWDropdownlist({
			screenID : "manage_financier_contacts_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'STATE_LIST'",
					p_search_field_1 : "#manage_financier_contacts_edit_country",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.state_defaultValue",
			defaultValueDescription : "$manage_financier_contacts_edit.variable.custom.state_defaultValue"
		});
		$("#manage_financier_contacts_edit_contact_phone_no").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "20",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.contact_phone_no_defaultValue"
		});
		$("#manage_financier_contacts_edit_email_id_1").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "60",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.email_id_defaultValue"
		});
		$("#manage_financier_contacts_edit_designation").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "60",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.designation_defaultValue"
		});
		$("#manage_financier_contacts_edit_department").initializeWTextbox({
			screenID : "manage_financier_contacts_edit",
			maxlength : "60",
			defaultValue : "$manage_financier_contacts_edit.variable.custom.department_defaultValue"
		});
		
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_financier_contacts.variable.custom.crudIndicator != "A") {
				recordTimeStamp = manage_financier_contacts_edit.variable.custom.datasource_1_record.rec_tstamp;
				
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
					p_custom_info_code : "financier_location_contacts",
					p_custom_info_ref_no1: manage_financier_contacts.variable.custom.selectedRecord.financier_id,
					p_custom_info_ref_no2: manage_financier_contacts.variable.custom.selectedRecord.contact_phone_no,
					p_inputparam_header_xml : $("#manage_financier_contacts_edit_content_1").getInputparamXML({
						screenID : "manage_financier_contacts_edit"
					}),
					p_rec_timestamp : recordTimeStamp,
					p_save_mode : "U",
					inputparam_detail : ""
				});
			}
			else{
				returnValue = common_modules_custominfo_setDetail.invokeAPI({
					p_custom_info_code : "financier_location_contacts",
					p_custom_info_ref_no1: $('#manage_financier_contacts_edit_financier_id').getVal(),
					p_custom_info_ref_no2: $('#manage_financier_contacts_edit_location_code').getVal(),
					p_inputparam_header_xml : $("#manage_financier_contacts_edit_content_1").getInputparamXML({
						screenID : "manage_financier_contacts_edit"
					}),
					p_rec_timestamp : recordTimeStamp,
					p_save_mode : "A",
					inputparam_detail : ""
				});
			}
			
			if (returnValue.update_status == "SP001") {
				alert("Financier Contacts Details saved successfully.");
				return true;
			} else {
				alert("Saving of Customer Location Details failed");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function (element, event) {
			manage_financier_contacts_edit.variable.custom.selectedRecord = manage_financier_contacts_edit.variable.custom.grid_1.dataSource.getByUid(manage_financier_contacts_edit.variable.custom.grid_1.select().data("uid"));
		},
		customInfoDetail : function (response) {
			var parseResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					if(response.outputparam_header.p_custom_info_header_json != ""){
						manage_financier_contacts_edit.variable.custom.header_1_record = JSON.parse(response.outputparam_header.p_custom_info_header_json);
					}
					if (response.outputparam_detail != undefined) {
						if (response.outputparam_detail.length != undefined) {
							var detailInfo = response.outputparam_detail ; 
							parseResponse = [];
							for (index = 0; index < detailInfo.length; index++) {
								for (key in detailInfo[index]) {
									parseResponse.push(JSON.parse(detailInfo[index][key]));
								}
							}
						}
					} else {
						parseResponse = [];
					}
				} else {
					parseResponse = response;
				}
			} else {
				parseResponse = response;
			};
			if(parseResponse.length == 0){
				alert("No records found.");
			};
			return parseResponse;
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			reorderParam : [{
					contentID : "content_1"
				}
			],
			valueChangeIndicator : false,
		},
		custom : {},
	}
};
