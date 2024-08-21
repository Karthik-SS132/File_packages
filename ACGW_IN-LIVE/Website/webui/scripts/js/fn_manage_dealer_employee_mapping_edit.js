var manage_dealer_employee_mapping_edit = {
	constructScreen : function () {
		return true;
	},
	initializeWidgets : function () {
		$("#manage_dealer_employee_mapping_edit_mapped_reason").initializeWDropdownlist({
			screenID : "manage_dealer_employee_mapping_edit",
			dataSource : {
				informationType : "'DLREMP_MAP_REASON'"
			},
			dataTextField : "description",
			dataValueField : "code",
		});
		$("#manage_dealer_employee_mapping_edit_request_category").initializeWCombobox({
			screenID : "manage_dealer_employee_mapping_edit",
			dataSource : {
				informationType : "'CALLCATEGORY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			filterMode : true,
			serverFiltering : true,
			childFieldID : "manage_dealer_employee_mapping_edit_request_type"
		});
		$("#manage_dealer_employee_mapping_edit_request_type").initializeWCombobox({
			screenID : "manage_dealer_employee_mapping_edit",
			dataSource : {
				informationType : "'CALLTYPE_LIST'",
				searchField1 : "#manage_dealer_employee_mapping_edit_request_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			filterMode : true,
			serverFiltering : true,
		});
		$("#manage_dealer_employee_mapping_edit_equipment_category").initializeWCombobox({
			screenID : "manage_dealer_employee_mapping_edit",
			dataSource : {
				informationType : "'EQUIPMENTCATEGORY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			filterMode : true,
			serverFiltering : true,
			childFieldID : "manage_dealer_employee_mapping_edit_equipment_type"
		});
		$("#manage_dealer_employee_mapping_edit_equipment_type").initializeWCombobox({
			screenID : "manage_dealer_employee_mapping_edit",
			dataSource : {
				informationType : "'EQUIPMENTTYPE_LIST_LINKED'",
				searchField1 : "#manage_dealer_employee_mapping_edit_equipment_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			filterMode : true,
			serverFiltering : true,
		});
		$("#manage_dealer_employee_mapping_edit_employee_id").initializeWCombobox({
			screenID : "manage_dealer_employee_mapping_edit",
			dataSource : {
				informationType : "'EMPLOYEE_DESC'"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			returnValue = executeService_save_manage_dealer_mapping_to_employee({
				p_dealer_id : manage_dealer_master.variable.custom.selectedRecord.id,
				p_dealer_loc_code : manage_dealer_master.variable.custom.selectedRecord.city,
				p_mapping_purpose_code : $("#manage_dealer_employee_mapping_edit_mapped_reason").getVal(),
				p_request_category : $("#manage_dealer_employee_mapping_edit_request_category").getVal(),
				p_request_type : $("#manage_dealer_employee_mapping_edit_request_type").getVal(),
				p_equipment_category : $("#manage_dealer_employee_mapping_edit_equipment_category").getVal(),
				p_equipment_type : $("#manage_dealer_employee_mapping_edit_equipment_type").getVal(),
				p_employee_id : $("#manage_dealer_employee_mapping_edit_employee_id").getVal(),
				p_save_mode : manage_dealer_employee_mapping.variable.custom.crudIndicator,
				p_rec_tstamp : recordTimeStamp
			});
			if (returnValue == "SP001") {
				alert("Dealer Employee mapping is saved successfully.");
				return true;
			} else {
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {},
	}
};