var manage_equipment_service_contract_template = {
	constructScreen : function () {
		manage_equipment_service_contract_template.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "mservice",
				serviceName : "retrieve_manage_equipment_service_contract_template_list",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_equipment_id : "$manage_equipment_service_contract_template.variable.custom.equipment_id_defaultValue"
				},
				schemaModel : true,
				screenID : "manage_equipment_service_contract_template",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function() {
		manage_equipment_service_contract_template.variable.custom.datasource_1.read();
	},
	initializeWidgets : function () {
		$("#manage_equipment_service_contract_template_equipment_id").initializeWDisplayarea({
			screenID : "manage_equipment_service_contract_template",
			defaultValue : "$manage_equipment_service_contract_template.variable.custom.equipment_id_defaultValue"
		});
		manage_equipment_service_contract_template.variable.custom.grid_1 = $("#manage_equipment_service_contract_template_grid_1").initializeWGrid({
				screenID : "manage_equipment_service_contract_template",
				toolbar : "#manage_equipment_service_contract_template_grid_1_toolbar_template",
				dataSource : manage_equipment_service_contract_template.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	refreshScreen : function () {
		manage_equipment_service_contract_template.variable.custom.grid_1.dataSource.read();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_equipment_service_contract_template.variable.custom.crudIndicator == "R") {
				manage_equipment_service_contract_template.variable.custom.grid_1.dataSource.read();
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_equipment_service_contract_template_edit.js", "../../s_iscripts/save_manage_equipment_service_contract_template.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_equipment_service_contract_template",
						nextScreenID : "manage_equipment_service_contract_template_edit",
						nextScreenName : manage_equipment_service_contract_template.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		feature_btn_click : function (element, event) {},
	},
	customRequirementHandler : {
		getFilterValues : function () {
			return $("#manage_equipment_service_contract_template_content_1").getInputparamXML({
				screenID : "manage_equipment_service_contract_template",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_equipment_service_contract_template.variable.custom.selectedRecord = manage_equipment_service_contract_template.variable.custom.grid_1.dataSource.getByUid(manage_equipment_service_contract_template.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				//p_information_type : "'EQPTMAST'",
				//p_field_1 : "$manage_equipment_service_contract_template.variable.custom.selectedRecord.equipment_id",
				//p_field_1 : "$manage_equipment_service_contract_template.variable.custom.selectedRecord.rec_tstamp"
			};
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_equipment_service_contract_template_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_equipment_service_contract_template_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			equipment_id_defaultValue : manage_equipment_master.variable.custom.selectedRecord.equipment_id
		},
	}
};