var manage_dealer_employee_mapping = {
	constructScreen : function () {
		manage_dealer_employee_mapping.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_dealer_mapping_to_employee_list",
			outputPath : "context/outputparam/p_dealer_mapping_to_employee_list",
			pageSize : 10,
			inputParameter : {
				p_inputparam_xml : "manage_dealer_employee_mapping.customRequirementHandler.getFilterValues()",
			},
			schemaModel : true,
			screenID : "manage_dealer_employee_mapping",
			dataSourceName : "datasource_1",
			processResponse : true
		});
		return true;
	},
	postConstruct : function () {
		manage_dealer_employee_mapping.variable.custom.grid_1.dataSource.read();
	},
	initializeWidgets : function () {
		manage_dealer_employee_mapping.variable.custom.grid_1 = $("#manage_dealer_employee_mapping_grid_1").initializeWGrid({
			screenID : "manage_dealer_employee_mapping",
			toolbar : "#manage_dealer_employee_mapping_grid_1_toolbar_template",
			dataSource : manage_dealer_employee_mapping.variable.custom.datasource_1,
			height : 400,
			pageSize : 10
		});
	},
	refreshScreen : function () {
		manage_dealer_employee_mapping.variable.custom.grid_1.dataSource.read();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_dealer_employee_mapping.variable.custom.crudIndicator == "R") {
				manage_dealer_employee_mapping.variable.custom.grid_1.dataSource.read();
			} else if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_dealer_employee_mapping_edit.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_dealer_employee_mapping",
					fieldID : "manage_dealer_employee_mapping_child_window",
					nextScreenID : "manage_dealer_employee_mapping_edit",
					nextScreenName : manage_dealer_employee_mapping.variable.custom.nextScreenName,
					execute : manage_dealer_employee_mapping_edit.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_dealer_employee_mapping.variable.custom.selectedRecord = manage_dealer_employee_mapping.variable.custom.grid_1.dataSource.getByUid(manage_dealer_employee_mapping.variable.custom.grid_1.select().data("uid"));
		},
		getFilterValues : function () {
			return $("#manage_dealer_employee_mapping_content_1").getInputparamXML({
				screenID : "manage_dealer_employee_mapping",
				matchCondition : ["_filter"]
			});
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'DLR_MAPPING_EMPLOYEE'",
				p_field_1 : "$manage_dealer_employee_mapping.variable.custom.selectedRecord.dealer_id",
				p_field_2 : "$manage_dealer_employee_mapping.variable.custom.selectedRecord.dealer_location_code",
				p_field_3 : "$manage_dealer_employee_mapping.variable.custom.selectedRecord.mapping_reason",
				p_field_4 : "$manage_dealer_employee_mapping.variable.custom.selectedRecord.equipment_category",
				p_field_5 : "$manage_dealer_employee_mapping.variable.custom.selectedRecord.equipment_type",
				p_field_6 : "$manage_dealer_employee_mapping.variable.custom.selectedRecord.request_category",
				p_field_7 : "$manage_dealer_employee_mapping.variable.custom.selectedRecord.request_type",
				p_field_8 : "$manage_dealer_employee_mapping.variable.custom.selectedRecord.employee_id"
			};
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_dealer_employee_mapping_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_dealer_employee_mapping_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {}
	}
};