var manage_equipments_attachments_child = {
	constructScreen : function () {
		return true;
	},
	initializeWidgets : function () {
		$("#manage_equipment_attachments_child_type").initializeWDropdownlist({
			screenID : "manage_equipments_attachments_child",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CALLTOSTAGE'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1"
		});
		$("#manage_equipment_attachments_child_id").initializeWCombobox({
			screenID : "manage_equipments_attachments_child",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CALLASSIGNTO_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1"
		});
		$("#manage_equipment_attachments_child_description").initializeWTextarea({
			screenID : "manage_equipments_attachments_child",
			maxlength : "1000"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_equipments_attachments_child.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_equipments_attachments_child_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			returnValue = executeService_save_manage_equipment_list_attachment({
					p_equipment_id : $("#manage_equipments_attachments_child_edit_equipment_id").getVal(),
					p_description : $("#manage_equipments_attachments_child_edit_equipment_description").getVal(),
					p_org_level_no : $("#manage_equipments_attachments_child_edit_servicing_org_level_number").getVal(),
					p_org_level_code : $("#manage_equipments_attachments_child_edit_servicing_org_level_code").getVal(),
					p_equipment_category : $("#manage_equipments_attachments_child_edit_equipment_category").getVal(),
					p_equipment_type : $("#manage_equipments_attachments_child_edit_equipment_type").getVal(),
					p_inputparam_udf_xml : $("#manage_equipments_attachments_child_edit_content_1").getInputparamXML({
						screenID : "manage_equipments_attachments_child_edit",
						matchCondition : ["manage_equipments_attachments_child_edit_udf"]
					}),
					p_save_mode : manage_equipments_attachments_child.variable.custom.crudIndicator,
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