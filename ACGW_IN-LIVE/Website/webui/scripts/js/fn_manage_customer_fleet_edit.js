var manage_customer_fleet_edit = {
	constructScreen : function () {
		if (manage_customer_fleet.variable.custom.crudIndicator == "U" || manage_customer_fleet.variable.custom.crudIndicator == "V") {
			manage_customer_fleet_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_custom_info_detail",
					outputPath : false,
					api : true,
					pageSize : 10,
					inputParameter : {
						p_custom_info_code : "'CUSTOMER_FLEET'",
						p_custom_info_ref_no1 : "$manage_customer_fleet.variable.custom.selectedRecord.customer_id",
						p_custom_info_ref_no2 : "$manage_customer_fleet.variable.custom.selectedRecord.model"
					},
					schemaModel : true,
					screenID : "manage_customer_fleet_edit",
					dataSourceName : "datasource_1",
					processResponse : true,
					parse : manage_customer_fleet_edit.customRequirementHandler.customInfoDetail
				});
			manage_customer_fleet_edit.variable.custom.datasource_1.read();
			manage_customer_fleet_edit.variable.custom.datasource_1_record = manage_customer_fleet_edit.variable.custom.header_1_record;
			manage_customer_fleet_edit.variable.custom.customer_id_defaultValue = manage_customer_fleet_edit.variable.custom.datasource_1_record.customer_id;
			manage_customer_fleet_edit.variable.custom.fleet_category_defaultValue = manage_customer_fleet_edit.variable.custom.datasource_1_record.fleet_category;
			manage_customer_fleet_edit.variable.custom.fleet_type_defaultValue = manage_customer_fleet_edit.variable.custom.datasource_1_record.fleet_type;
			manage_customer_fleet_edit.variable.custom.oem_defaultValue = manage_customer_fleet_edit.variable.custom.datasource_1_record.oem;
			manage_customer_fleet_edit.variable.custom.model_defaultValue = manage_customer_fleet_edit.variable.custom.datasource_1_record.model;
			manage_customer_fleet_edit.variable.custom.no_of_units_defaultValue = manage_customer_fleet_edit.variable.custom.datasource_1_record.no_of_units;
			manage_customer_fleet_edit.variable.custom.application_segment_defaultValue = manage_customer_fleet_edit.variable.custom.datasource_1_record.application_segment;
			manage_customer_fleet_edit.variable.custom.address_defaultValue = manage_customer_fleet_edit.variable.custom.datasource_1_record.address;
		}
	},
	initializeWidgets : function () {
		$("#manage_customer_fleet_edit_customer_id").initializeWCombobox({
			screenID : "manage_customer_fleet_edit",
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
			defaultValue : "$manage_customer_fleet_edit.variable.custom.customer_id_defaultValue",
			defaultValueDescription : "$manage_customer_fleet_edit.variable.custom.customer_id_defaultValueDescription"
		});
		$("#manage_customer_fleet_edit_fleet_category").initializeWDropdownlist({
			screenID : "manage_customer_fleet_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'FLEETCATEGORY'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				}
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_customer_fleet_edit.variable.custom.fleet_category_defaultValue",
			defaultValueDescription : "$manage_customer_fleet_edit.variable.custom.fleet_category_defaultValue",
			childFieldID : "manage_customer_fleet_edit_fleet_type"
		});
		$("#manage_customer_fleet_edit_fleet_type").initializeWDropdownlist({
			screenID : "manage_customer_fleet_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'FLEETTYPE'",
					p_search_field_1 : "#manage_customer_fleet_edit_fleet_category",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_customer_fleet_edit.variable.custom.fleet_type_defaultValue",
			defaultValueDescription : "$manage_customer_fleet_edit.variable.custom.fleet_type_defaultValue"
		});
		$("#manage_customer_fleet_edit_fleet_oem").initializeWTextbox({
			screenID : "manage_customer_fleet_edit",
			maxlength : "60",
			defaultValue : "$manage_customer_fleet_edit.variable.custom.oem_defaultValue"
		});
		$("#manage_customer_fleet_edit_fleet_model").initializeWTextbox({
			screenID : "manage_customer_fleet_edit",
			maxlength : "60",
			defaultValue : "$manage_customer_fleet_edit.variable.custom.model_defaultValue"
		});
		$("#manage_customer_fleet_edit_no_of_units").initializeWNumerictextbox({
			screenID : "manage_customer_fleet_edit",
			minimum :"1",
			format: "n0",
			maximum : "999",
			defaultValue : "$manage_customer_fleet_edit.variable.custom.no_of_units_defaultValue"
		});
		$("#manage_customer_fleet_edit_application_segment").initializeWDropdownlist({
			screenID : "manage_customer_fleet_edit",
			dataSource : {
				informationType : "'EQSALES_APPLICATION_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_customer_fleet_edit.variable.custom.application_segment_defaultValue",
			defaultValueDescription : "$manage_customer_fleet_edit.variable.custom.application_segment_defaultValue"
		});
		$("#manage_customer_fleet_edit_address").initializeWTextarea({
			screenID : "manage_customer_fleet_edit",
			maxlength : "500",
			defaultValue : "$manage_customer_fleet_edit.variable.custom.address_defaultValue"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_customer_fleet.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_customer_fleet_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
					p_custom_info_code : "CUSTOMER_FLEET",
					p_custom_info_ref_no1: manage_customer_master.variable.custom.selectedRecord.cust_id,
					p_custom_info_ref_no2: manage_customer_fleet.variable.custom.crudIndicator == "A" ? '':manage_customer_fleet.variable.custom.selectedRecord.model,
					p_inputparam_header_xml : $("#manage_customer_fleet_edit_content_1").getInputparamXML({
						screenID : "manage_customer_fleet_edit"
					}),
					p_rec_timestamp : recordTimeStamp,
					p_save_mode : manage_customer_fleet.variable.custom.crudIndicator,
					inputparam_detail : ""
				});
			if (returnValue.update_status == "SP001") {
				alert("Customer Fleet Details saved successfully.");
				return true;
			} else {
				alert("Saving of Customer Fleet Details failed");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function (element, event) {
			manage_customer_fleet_edit.variable.custom.selectedRecord = manage_customer_fleet_edit.variable.custom.grid_1.dataSource.getByUid(manage_customer_fleet_edit.variable.custom.grid_1.select().data("uid"));
		},
		customInfoDetail : function (response) {
			var parseResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					if(response.outputparam_header.p_custom_info_header_json != ""){
						manage_customer_fleet_edit.variable.custom.header_1_record = JSON.parse(response.outputparam_header.p_custom_info_header_json);
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
			//popupIndicator: true,
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
