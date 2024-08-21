var manage_equipment_service_contract_template_edit = {
	constructScreen : function () {
		if (manage_equipment_service_contract_template_edit.variable.custom.crudIndicator == "U" || manage_equipment_service_contract_template_edit.variable.custom.crudIndicator == "V") {
			manage_equipment_service_contract_template_edit_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_equipment_service_contract_template_edit_details",
					inputParameter : {
						p_equipment_id : "$manage_equipment_service_contract_template_edit.variable.custom.selectedRecord.equipment_id_defaultValue"
					}
				});
			manage_equipment_service_contract_template_edit_edit.variable.custom.datasource_1.read();
			manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record = manage_equipment_service_contract_template_edit.variable.custom.datasource_1.at(0);
			manage_equipment_service_contract_template_edit.variable.custom.equipment_id_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.equipment_id;
			manage_equipment_service_contract_template_edit.variable.custom.contract_type_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.contract_type;
			manage_equipment_service_contract_template_edit.variable.custom.description_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.description;
			manage_equipment_service_contract_template_edit.variable.custom.addn_description_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.addn_description;
			manage_equipment_service_contract_template_edit.variable.custom.contract_duration_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.duration;
			manage_equipment_service_contract_template_edit.variable.custom.duration_uom_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.duration_uom;
			manage_equipment_service_contract_template_edit.variable.custom.parts_covered_ind_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.parts_covered_ind;
			manage_equipment_service_contract_template_edit.variable.custom.labor_covered_ind_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.labor_covered_ind;
			manage_equipment_service_contract_template_edit.variable.custom.initial_warranty_ind_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.initial_warranty_ind;
			manage_equipment_service_contract_template_edit.variable.custom.prevm_frequency_uom_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.prevm_frequency_uom;
			manage_equipment_service_contract_template_edit.variable.custom.service_frequency_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.prevm_frequency_value;
			manage_equipment_service_contract_template_edit.variable.custom.prevm_fcy_mprofile_template_id_defaultValue = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.prevm_fcy_mprofile_template_id;
		}
	},
	initializeWidgets : function () {
		$("#manage_equipment_service_contract_template_edit_contract_type").initializeWDropdownlist({
			screenID : "manage_equipment_service_contract_template_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'EQUIPMENT_CONTRACT_TYPE'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_equipment_service_contract_template_edit.variable.custom.contract_type_defaultValue"
		});
		$("#manage_equipment_service_contract_template_edit_description").initializeWTextarea({
			screenID : "manage_equipment_service_contract_template_edit",
			maximum: "1500",
			defaultValue : "$manage_equipment_service_contract_template_edit.variable.custom.description_defaultValue"
		});
		$("#manage_equipment_service_contract_template_edit_additional_description").initializeWTextarea({
			screenID : "manage_equipment_service_contract_template_edit",
			maximum: "1500",
			defaultValue : "$manage_equipment_service_contract_template_edit.variable.custom.addn_description_defaultValue"
		});
		$("#manage_equipment_service_contract_template_edit_contract_duration").initializeWNumerictextbox({
			screenID : "manage_equipment_service_contract_template_edit",
			format : "n0",
			minimum : "'1'",
			maximum : "'999'",
			decimals : "'0'",
			defaultValue : "$manage_equipment_service_contract_template_edit.variable.custom.contract_duration_defaultValue"
		});
		$("#manage_equipment_service_contract_template_edit_contract_duration").parent().parent().css("width", "70px");
		$("#manage_equipment_service_contract_template_edit_service_frequency").initializeWNumerictextbox({
			screenID : "manage_equipment_service_contract_template_edit",
			format : "n0",
			minimum : "'0'",
			maximum : "#manage_equipment_service_contract_template_edit_contract_duration",
			decimals : "'0'",
			defaultValue : "$manage_equipment_service_contract_template_edit.variable.custom.service_frequency_defaultValue"
		});
		$("#manage_equipment_service_contract_template_edit_service_frequency").parent().parent().css("width", "70px");
		$("#manage_equipment_service_contract_template_edit_parts_covered_indicator").initializeWCheckbox({
			screenID : "manage_equipment_service_contract_template_edit",
			defaultValue : "$manage_equipment_service_contract_template_edit.variable.custom.parts_covered_ind_defaultValue"
		});
		$("#manage_equipment_service_contract_template_edit_labour_covered_indicator").initializeWCheckbox({
			screenID : "manage_equipment_service_contract_template_edit",
			defaultValue : "$manage_equipment_service_contract_template_edit.variable.custom.labor_covered_ind_defaultValue"
		});
		$("#manage_equipment_service_contract_template_edit_initial_warranty_indicator").initializeWCheckbox({
			screenID : "manage_equipment_service_contract_template_edit",
			defaultValue : "$manage_equipment_service_contract_template_edit.variable.custom.initial_warranty_ind_defaultValue"
		});
	},
	widgetEventHandler : {
		contract_duration_change : function (element, event) {
			$("#manage_equipment_service_contract_template_edit_service_frequency").setMax($("#manage_equipment_service_contract_template_edit_contract_duration").getVal());
			$("#manage_equipment_service_contract_template_edit_service_frequency").setVal("0");
		},
		contract_duration_spin : function (element, event) {
			$("#manage_equipment_service_contract_template_edit_service_frequency").setMax($("#manage_equipment_service_contract_template_edit_contract_duration").getVal());
			$("#manage_equipment_service_contract_template_edit_service_frequency").setVal("0");
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_equipment_service_contract_template.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_equipment_service_contract_template_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			returnValue = executeService_save_manage_equipment_service_contract_template({
				p_equipment_id: manage_equipment_service_contract_template_edit.variable.custom.equipment_id_defaultValue,
				p_description: $("#manage_equipment_service_contract_template_edit_description").getVal(),
				p_addn_description: $("#manage_equipment_service_contract_template_edit_additional_description").getVal(),
				p_contract_type: $("#manage_equipment_service_contract_template_edit_contract_type").getVal(),
				p_contract_duration: $("#manage_equipment_service_contract_template_edit_contract_duration").getVal().toString(),
				p_contract_duration_uom: "M",
				p_parts_covered_ind: $("#manage_equipment_service_contract_template_edit_parts_covered_indicator").getVal(),
				p_labor_covered_ind: $("#manage_equipment_service_contract_template_edit_labour_covered_indicator").getVal(),
				p_initial_warranty_ind: $("#manage_equipment_service_contract_template_edit_initial_warranty_indicator").getVal(),
				p_prevm_fcy_uom: "M",
				p_prevm_fcy_no: $("#manage_equipment_service_contract_template_edit_service_frequency").getVal().toString(),
				p_prevm_fcy_mprofile_template_id: "",
				p_inputparam_udf_xml: $("#manage_equipment_service_contract_template_edit_content_1").getInputparamXML({
					screenID : "manage_equipment_service_contract_template_edit",
					matchCondition : ["manage_equipment_service_contract_template_edit_udf"]
				}),
				p_save_mode: manage_equipment_service_contract_template.variable.custom.crudIndicator,
				p_rec_tstamp: recordTimeStamp
			});
			if (returnValue == "SP001") {
				alert("Equipment Contract Template saved successfully.");
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
		custom : {
			equipment_id_defaultValue : manage_equipment_service_contract_template.variable.custom.equipment_id_defaultValue,
			contract_duration_defaultValue : "12",
			service_frequency_defaultValue : "0"
		}
	}
};