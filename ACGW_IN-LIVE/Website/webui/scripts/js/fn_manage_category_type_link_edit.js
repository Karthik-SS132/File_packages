var manage_category_type_link_edit = {
	constructScreen : function () {
		manage_category_type_link_edit.variable.custom.keyFieldDataSource = mserviceUtilities.getKeyFieldDataSource({
				p_screen_name : "'CATGTYPELINK'",
				p_validation_field_1 : "$manage_category_type_link.variable.custom.linkType.dataItem().p_value_field_1",
				p_validation_field_2 : "$manage_category_type_link.variable.custom.linkType.dataItem().p_value_field_2",
				p_validation_field_3 : "#manage_category_type_link_edit_category",
				p_validation_field_4 : "$manage_category_type_link.variable.custom.linkType.dataItem().p_value_field_3",
				p_validation_field_5 : "#manage_category_type_link_edit_type",
				p_validation_field_6 : "",
				p_validation_field_7 : "",
				p_validation_field_8 : "",
				p_validation_field_9 : "",
				p_validation_field_10 : ""
			});
	},
	initializeWidgets : function () {
		$("#manage_category_type_link_edit_category").initializeWDropdownlist({
			screenID : "manage_category_type_link_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CATEGORYTYPECODE_LIST'",
					p_search_field_1 : "$manage_category_type_link.variable.custom.linkType.dataItem().p_value_field_2",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1"
		});
		$("#manage_category_type_link_edit_type").initializeWDropdownlist({
			screenID : "manage_category_type_link_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CATEGORYTYPECODE_LIST'",
					p_search_field_1 : "$manage_category_type_link.variable.custom.linkType.dataItem().p_value_field_3",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
		});
	},
	widgetEventHandler : {
		category_change : function (element, event) {
			manage_category_type_link_edit.customRequirementHandler.validateKeyField();
		},
		type_change : function (element, event) {
			manage_category_type_link_edit.customRequirementHandler.validateKeyField();
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue;
			returnValue = executeService_save_manage_catgtype_code_link({
					p_link_type : manage_category_type_link.variable.custom.linkType.dataItem().p_value_field_1,
					p_catg_code_type : manage_category_type_link.variable.custom.linkType.dataItem().p_value_field_2,
					p_catg_code_value : $("#manage_category_type_link_edit_category").getVal(),
					p_type_code_type : manage_category_type_link.variable.custom.linkType.dataItem().p_value_field_3,
					p_type_code_value : $("#manage_category_type_link_edit_type").getVal(),
					p_save_mode : manage_category_type_link.variable.custom.crudIndicator,
				});
			if (returnValue == "SP001") {
				alert("Category Type Link Details is saved successfully");
				return true;
			} else {
				alert("Saving of Category Type Link Details Failed");
				return false;
			}
		}
	},
	customRequirementHandler : {
		validateKeyField : function () {
			if ($("#manage_category_type_link_edit_category").getVal() != "" && $("#manage_category_type_link_edit_type").getVal() != "") {
				manage_category_type_link_edit.variable.custom.keyFieldDataSource.read();
				if (manage_category_type_link_edit.variable.custom.keyFieldDataSource.data()[0].p_valid_ind == "true") {
					alert("Data already exists.");
					$("#manage_category_type_link_edit_category").setVal("");
					$("#manage_category_type_link_edit_type").setVal("");
				}
			}
		},
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
			keyFieldDataSource : ""
		},
	}
};
