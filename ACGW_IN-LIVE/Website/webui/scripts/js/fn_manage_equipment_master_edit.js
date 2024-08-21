var manage_equipment_master_edit = {
	constructScreen : function () {
		if (manage_equipment_master.variable.custom.crudIndicator == "U" || manage_equipment_master.variable.custom.crudIndicator == "V") {
			manage_equipment_master_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "mservice",
					serviceName : "retrieve_manage_equipment_master_details",
					outputPath : "context/outputparam_header",
					inputParameter : {
						p_equipment_id : "$manage_equipment_master.variable.custom.selectedRecord.equipment_id"
					}
				});
			manage_equipment_master_edit.variable.custom.datasource_1.read();
			manage_equipment_master_edit.variable.custom.datasource_1_record = manage_equipment_master_edit.variable.custom.datasource_1.at(0);
			manage_equipment_master_edit.variable.custom.equipment_id_defaultValue = manage_equipment_master_edit.variable.custom.datasource_1_record.equipment_id;
			manage_equipment_master_edit.variable.custom.description_defaultValue = manage_equipment_master_edit.variable.custom.datasource_1_record.description;
			manage_equipment_master_edit.variable.custom.equipment_category_defaultValue = manage_equipment_master_edit.variable.custom.datasource_1_record.equipment_category;
			manage_equipment_master_edit.variable.custom.equipment_type_defaultValue = manage_equipment_master_edit.variable.custom.datasource_1_record.equipment_type;
			manage_equipment_master_edit.variable.custom.servicing_org_level_no_defaultValue = manage_equipment_master_edit.variable.custom.datasource_1_record.servicing_org_level_no;
			manage_equipment_master_edit.variable.custom.servicing_org_level_code_defaultValue = manage_equipment_master_edit.variable.custom.datasource_1_record.servicing_org_level_code;
		}
	},
	initializeWidgets : function () {
		$("#manage_equipment_master_edit_equipment_id").initializeWTextbox({
			screenID : "manage_equipment_master_edit",
			maxlength : "15",
			defaultValue : "$manage_equipment_master_edit.variable.custom.equipment_id_defaultValue",
			keyField : {
				p_screen_name : "'EQPTID'",
				p_validation_field_1 : "#manage_equipment_master_edit_equipment_id",
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
		$("#manage_equipment_master_edit_equipment_description").initializeWTextbox({
			screenID : "manage_equipment_master_edit",
			maxlength : "100",
			defaultValue : "$manage_equipment_master_edit.variable.custom.description_defaultValue"
		});
		$("#manage_equipment_master_edit_servicing_org_level_number").initializeWDropdownlist({
			screenID : "manage_equipment_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'ORGLEVELNO_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				}
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_equipment_master_edit.variable.custom.servicing_org_level_no_defaultValue",
			childFieldID : "manage_equipment_master_edit_servicing_org_level_code"
		});
		$("#manage_equipment_master_edit_servicing_org_level_code").initializeWDropdownlist({
			screenID : "manage_equipment_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'ORGLEVELCODE_LIST'",
					p_search_field_1 : "#manage_equipment_master_edit_servicing_org_level_number",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				}
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_equipment_master_edit.variable.custom.servicing_org_level_code_defaultValue"
		});
		$("#manage_equipment_master_edit_equipment_category").initializeWDropdownlist({
			screenID : "manage_equipment_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'EQUIPMENTCATEGORY'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				}
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_equipment_master_edit.variable.custom.equipment_category_defaultValue",
			defaultValueDescription : "$manage_equipment_master_edit.variable.custom.equipment_category_defaultValue",
			childFieldID : "manage_equipment_master_edit_equipment_type"
		});
		$("#manage_equipment_master_edit_equipment_type").initializeWDropdownlist({
			screenID : "manage_equipment_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'EQUIPMENTTYPE'",
					p_search_field_1 : "#manage_equipment_master_edit_equipment_category",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_equipment_master_edit.variable.custom.equipment_type_defaultValue",
			defaultValueDescription : "$manage_equipment_master_edit.variable.custom.equipment_type_defaultValue"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_equipment_master.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_equipment_master_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			returnValue = executeService_save_manage_equipment_master({
					p_equipment_id : $("#manage_equipment_master_edit_equipment_id").getVal(),
					p_description : $("#manage_equipment_master_edit_equipment_description").getVal(),
					p_org_level_no : $("#manage_equipment_master_edit_servicing_org_level_number").getVal(),
					p_org_level_code : $("#manage_equipment_master_edit_servicing_org_level_code").getVal(),
					p_equipment_category : $("#manage_equipment_master_edit_equipment_category").getVal(),
					p_equipment_type : $("#manage_equipment_master_edit_equipment_type").getVal(),
					p_inputparam_udf_xml : $("#manage_equipment_master_edit_content_1").getInputparamXML({
						screenID : "manage_equipment_master_edit",
						matchCondition : ["manage_equipment_master_edit_udf"]
					}),
					p_save_mode : manage_equipment_master.variable.custom.crudIndicator,
					p_rec_tstamp : recordTimeStamp,
				});
			if (returnValue == "SP001") {
				alert("Equipment Details saved successfully.");
				return true;
			} else {
				alert("Saving of Equipment Details failed");
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