var manage_financier_location_edit = {
	constructScreen : function () {
		if (manage_financier_location.variable.custom.crudIndicator == "U" || manage_financier_location.variable.custom.crudIndicator == "V") {
			manage_financier_location_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_custom_info_detail",
					outputPath : false,
					api : true,
					pageSize : 10,
					inputParameter : {
						p_custom_info_code : "'financier_location'",
						p_custom_info_ref_no1 : "$manage_financier_location.variable.custom.selectedRecord.financier_id",
						p_custom_info_ref_no2 : "$manage_financier_location.variable.custom.selectedRecord.location_code"
					},
					schemaModel : true,
					screenID : "manage_financier_location_edit",
					dataSourceName : "datasource_1",
					processResponse : true,
					parse : manage_financier_location_edit.customRequirementHandler.customInfoDetail
				});
			manage_financier_location_edit.variable.custom.datasource_1.read();
			manage_financier_location_edit.variable.custom.datasource_1_record = manage_financier_location_edit.variable.custom.header_1_record;
			manage_financier_location_edit.variable.custom.financier_id_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.financier_id;
			manage_financier_location_edit.variable.custom.location_code_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.location_code;
			manage_financier_location_edit.variable.custom.loc_name_short_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.loc_name_short;
			manage_financier_location_edit.variable.custom.loc_name_long_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.loc_name_long;
			manage_financier_location_edit.variable.custom.address_line_1_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.addr_l_1;
			manage_financier_location_edit.variable.custom.address_line_2_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.addr_l_2;
			manage_financier_location_edit.variable.custom.address_line_3_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.addr_l_3;
			manage_financier_location_edit.variable.custom.city_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.city;
			manage_financier_location_edit.variable.custom.pin_code_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.pincode;
			manage_financier_location_edit.variable.custom.country_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.country;
			manage_financier_location_edit.variable.custom.state_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.state;
			manage_financier_location_edit.variable.custom.telephone_1_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.landline_1;
			manage_financier_location_edit.variable.custom.telephone_2_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.landline_2;
			manage_financier_location_edit.variable.custom.fax_1_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.fax_1;
			manage_financier_location_edit.variable.custom.fax_2_defaultValue = manage_financier_location_edit.variable.custom.datasource_1_record.fax_2;
		}
	},
	postConstruct : function () {
		$("#manage_financier_location_edit_location_code_group").after("<hr>");
		$("#manage_financier_location_edit_location_name_long_group").after("<hr>");
		$("#manage_financier_location_edit_address_line_3_group").after("<hr>");
		$("#manage_financier_location_edit_state_group").after("<hr>");
		$("#manage_financier_location_edit_pin_code_group").after("<hr>");
		$("#manage_financier_location_edit_fax_1_group").after("<hr>");
	},
	initializeWidgets : function () {
		$("#manage_financier_location_edit_financier_id").initializeWCombobox({
			screenID : "manage_financier_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'ABS_CUSTOMER_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_financier_location_edit.variable.custom.financier_id_defaultValue",
			defaultValueDescription : "$manage_financier_location_edit.variable.custom.financier_id_defaultValueDescription"
		});
		$("#manage_financier_location_edit_location_code").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "10",
			defaultValue : "$manage_financier_location_edit.variable.custom.location_code_defaultValue",
			keyField : {
				p_screen_name : "'CUSTLOCID'",
				p_validation_field_1 : "#manage_financier_location_edit_financier_id",
				p_validation_field_2 : "#manage_financier_location_edit_location_code",
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
		$("#manage_financier_location_edit_location_name_short").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "50",
			defaultValue : "$manage_financier_location_edit.variable.custom.loc_name_short_defaultValue"
		});
		$("#manage_financier_location_edit_location_name_long").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "100",
			defaultValue : "$manage_financier_location_edit.variable.custom.loc_name_long_defaultValue"
		});
		$("#manage_financier_location_edit_address_line_1").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "200",
			defaultValue : "$manage_financier_location_edit.variable.custom.address_line_1_defaultValue"
		});
		$("#manage_financier_location_edit_address_line_2").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "200",
			defaultValue : "$manage_financier_location_edit.variable.custom.address_line_2_defaultValue"
		});
		$("#manage_financier_location_edit_address_line_3").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "200",
			defaultValue : "$manage_financier_location_edit.variable.custom.address_line_3_defaultValue"
		});
		$("#manage_financier_location_edit_city").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "60",
			defaultValue : "$manage_financier_location_edit.variable.custom.city_defaultValue"
		});
		$("#manage_financier_location_edit_pin_code").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "10",
			defaultValue : "$manage_financier_location_edit.variable.custom.pin_code_defaultValue"
		});
		$("#manage_financier_location_edit_country").initializeWDropdownlist({
			screenID : "manage_financier_location_edit",
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
			defaultValue : "$manage_financier_location_edit.variable.custom.country_defaultValue",
			defaultValueDescription : "$manage_financier_location_edit.variable.custom.country_defaultValue",
			childFieldID : "manage_financier_location_edit_state"
		});
		$("#manage_financier_location_edit_state").initializeWDropdownlist({
			screenID : "manage_financier_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'STATE_LIST'",
					p_search_field_1 : "#manage_financier_location_edit_country",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_financier_location_edit.variable.custom.state_defaultValue",
			defaultValueDescription : "$manage_financier_location_edit.variable.custom.state_defaultValue"
		});
		$("#manage_financier_location_edit_telephone_1").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "20",
			defaultValue : "$manage_financier_location_edit.variable.custom.telephone_1_defaultValue"
		});
		$("#manage_financier_location_edit_telephone_2").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "20",
			defaultValue : "$manage_financier_location_edit.variable.custom.telephone_2_defaultValue"
		});
		$("#manage_financier_location_edit_fax_1").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "20",
			defaultValue : "$manage_financier_location_edit.variable.custom.fax_1_defaultValue"
		});
		$("#manage_financier_location_edit_fax_2").initializeWTextbox({
			screenID : "manage_financier_location_edit",
			maxlength : "20",
			defaultValue : "$manage_financier_location_edit.variable.custom.fax_2_defaultValue"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_financier_location.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_financier_location_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
				p_custom_info_code : "financier_location",
				p_custom_info_ref_no1: (manage_financier_location.variable.custom.crudIndicator == 'A'? ($('#manage_financier_location_edit_financier_id').getVal()): (manage_financier_location.variable.custom.selectedRecord.financier_id)),
				p_custom_info_ref_no2: (manage_financier_location.variable.custom.crudIndicator == 'A'? ($('#manage_financier_location_edit_location_code').getVal()): (manage_financier_location.variable.custom.selectedRecord.location_code)),
				p_inputparam_header_xml : $("#manage_financier_location_edit_content_1").getInputparamXML({
					screenID : "manage_financier_location_edit"
				}),
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : manage_financier_location.variable.custom.crudIndicator,
				inputparam_detail : ""
			});
			if (returnValue.update_status == "SP001") {
				alert("Customer Location Details saved successfully.");
				return true;
			} else {
				alert("Saving of Customer Location Details failed");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function (element, event) {
			manage_financier_location_edit.variable.custom.selectedRecord = manage_financier_location_edit.variable.custom.grid_1.dataSource.getByUid(manage_financier_location_edit.variable.custom.grid_1.select().data("uid"));
		},
		customInfoDetail : function (response) {
			var parseResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					if(response.outputparam_header.p_custom_info_header_json != ""){
						manage_financier_location_edit.variable.custom.header_1_record = JSON.parse(response.outputparam_header.p_custom_info_header_json);
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
