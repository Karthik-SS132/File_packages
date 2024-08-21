var manage_custom_maintenance_edit_child = {
	constructScreen : function () {
		return true;
	},
	initializeWidgets : function () {
		return true;
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if (manage_custom_maintenance_edit.variable.custom.crudIndicator == "A"){
				var inputObject = JSON.parse($("#manage_custom_maintenance_edit_child_content_1").getInputparamJSON({
					screenID : "manage_custom_maintenance_edit_child",
					matchCondition : ["manage_custom_maintenance_edit_child_"]
				}));
				manage_custom_maintenance_edit.variable.custom.grid_1.dataSource.add(inputObject);
				return true;
			} else {
				var inputObject = JSON.parse($("#manage_custom_maintenance_edit_child_content_1").getInputparamJSON({
					screenID : "manage_custom_maintenance_edit_child",
					matchCondition : ["manage_custom_maintenance_edit_child_"]
				}));
				for(key in inputObject) { 
					manage_custom_maintenance_edit.variable.custom.selectedRecord.set(key,inputObject[key]);
				}
				return true;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			valueChangeIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {}
	}
};