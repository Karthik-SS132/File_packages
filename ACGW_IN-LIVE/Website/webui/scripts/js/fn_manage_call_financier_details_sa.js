var manage_call_financier_details_sa = {
	constructScreen : function () {
		if (manage_call_register_sa_edit.variable.custom.crudIndicator == "U" || manage_call_register_sa_edit.variable.custom.crudIndicator == "V") {
			manage_call_financier_details_sa.variable.custom.headerRecord = manage_call_register_sa_edit.variable.custom.selectedRecord;
		}
	},
	initializeWidgets : function () {
		$("#manage_call_financier_details_sa_action_category").initializeWDropdownlist({
			screenID : "manage_call_financier_details_sa",
			dataSource : {
				informationType : "'ACTIONCATEGORY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_call_financier_details_sa_action_type",
			defaultValue : "$manage_call_financier_details_sa.variable.custom.headerRecord.action_category",
			defaultValueDescription : "$manage_call_financier_details_sa.variable.custom.headerRecord.action_category"
		});
		$("#manage_call_financier_details_sa_action_type").initializeWDropdownlist({
			screenID : "manage_call_financier_details_sa",
			dataSource : {
				informationType : "'ACTIONTYPE_LIST_LINKED'",
				searchField1 : "#manage_call_financier_details_sa_action_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_call_financier_details_sa.variable.custom.headerRecord.action_type",
			defaultValueDescription : "$manage_call_financier_details_sa.variable.custom.headerRecord.action_type",
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if (manage_call_register_sa_edit.variable.custom.crudIndicator == "A") {
				var inputObject = JSON.parse($("#manage_call_financier_details_sa_content_1").getInputparamJSON({
					screenID : "manage_call_financier_details_sa",
					matchCondition : ["manage_call_financier_details_sa_"]
				}));
				inputObject.action_category = $("#manage_call_financier_details_sa_action_category").getVal();
				inputObject.action_type = $("#manage_call_financier_details_sa_action_type").getVal();
				manage_call_register_sa_edit.variable.custom.grid_6.dataSource.add(inputObject);
			} else {
				var inputObject = JSON.parse($("#manage_call_financier_details_sa_content_1").getInputparamJSON({
					screenID : "manage_call_financier_details_sa",
					matchCondition : ["manage_call_financier_details_sa_"]
				}));
				manage_call_financier_details_sa.variable.custom.headerRecord.set("action_category", $("#manage_call_financier_details_sa_action_category").getVal());
				manage_call_financier_details_sa.variable.custom.headerRecord.set("action_type", $("#manage_call_financier_details_sa_action_type").getVal());
				for(key in inputObject) { 
					manage_call_financier_details_sa.variable.custom.headerRecord.set(key,inputObject[key]);
				}
			}
			alert("Financier Details is saved successfully.");
			return true;
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
		custom : {},
	}
};