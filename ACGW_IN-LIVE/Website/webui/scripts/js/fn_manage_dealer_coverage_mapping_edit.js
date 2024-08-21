var manage_dealer_coverage_mapping_edit = {
	constructScreen : function () {
		return true;
	},
	initializeWidgets : function () {
		$("#manage_dealer_coverage_mapping_edit_state_code").initializeWCombobox({
			screenID : "manage_dealer_coverage_mapping_edit",
			dataSource : {
				informationType : "'STATE_LIST'",
				searchField1 : "$login_profile.country_code",
				searchField2 : "$manage_dealer_coverage_mapping_edit.variable.custom.state_code_serverFilterValue"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			childFieldID : "manage_dealer_coverage_mapping_edit_district_code"
		});
		$("#manage_dealer_coverage_mapping_edit_district_code").initializeWCombobox({
			screenID : "manage_dealer_coverage_mapping_edit",
			dataSource : {
				informationType : "'DISTRICTCODE_LIST'",
				searchField1 : "$login_profile.country_code",
				searchField2 : "#manage_dealer_coverage_mapping_edit_state_code"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			filterMode : true,
		});
		$("#manage_dealer_coverage_mapping_edit_equipment_category").initializeWCombobox({
			screenID : "manage_dealer_coverage_mapping_edit",
			dataSource : {
				informationType : "'EQUIPMENTCATEGORY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			filterMode : true,
			childFieldID : "manage_dealer_coverage_mapping_edit_equipment_type"
		});
		$("#manage_dealer_coverage_mapping_edit_equipment_type").initializeWCombobox({
			screenID : "manage_dealer_coverage_mapping_edit",
			dataSource : {
				informationType : "'EQUIPMENTTYPE_LIST_LINKED'",
				searchField1 : "#manage_dealer_coverage_mapping_edit_equipment_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			filterMode : true,
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			returnValue = executeService_save_manage_dealer_coverage_mapping({
				p_dealer_id : manage_dealer_master.variable.custom.selectedRecord.id,
				p_state_code : $("#manage_dealer_coverage_mapping_edit_state_code").getVal(),
				p_district_code : $("#manage_dealer_coverage_mapping_edit_district_code").getVal(),
				p_equipment_category : $("#manage_dealer_coverage_mapping_edit_equipment_category").getVal(),
				p_equipment_type : $("#manage_dealer_coverage_mapping_edit_equipment_type").getVal(),
				p_save_mode : manage_dealer_coverage_mapping.variable.custom.crudIndicator,
				p_rec_tstamp : recordTimeStamp
			});
			if (returnValue == "SP001") {
				alert("Dealer coverage mapping is saved successfully");
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
					columnLength : 1
				}
			],
		},
		custom : {
			state_code_serverFilterValue : ""
		},
	}
};