var manage_equipment_attachments = {
	constructScreen : function () {
		manage_equipment_attachments.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "mservice",
				serviceName : "retrieve_manage_equipment_list_attachment",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_equipment_id : "$manage_equipment_attachments.variable.custom.equipment_id_defaultValue"
				},
				schemaModel : true,
				screenID : "manage_equipment_attachments",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function() {
		manage_equipment_attachments.variable.custom.datasource_1.read();
	},
	initializeWidgets : function () {
		$("#manage_equipment_attachments_equipment_id").initializeWDisplayarea({
			screenID : "manage_equipment_attachments",
			defaultValue : "$manage_equipment_attachments.variable.custom.equipment_id_defaultValue"
		});
		$("#manage_equipment_attachments_description").initializeWDisplayarea({
			screenID : "manage_equipment_attachments",
			defaultValue : "$manage_equipment_attachments.variable.custom.description_defaultValue"
		});
		manage_equipment_attachments.variable.custom.grid_1 = $("#manage_equipment_attachments_grid_1").initializeWGrid({
				screenID : "manage_equipment_attachments",
				toolbar : "#manage_equipment_attachments_grid_1_toolbar_template",
				dataSource : manage_equipment_attachments.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	refreshScreen : function () {
		manage_equipment_attachments.variable.custom.grid_1.dataSource.read();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_equipment_attachments.variable.custom.crudIndicator == "R") {
				manage_equipment_attachments.variable.custom.grid_1.dataSource.read();
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_equipment_attachments_child.js", "../../s_iscripts/save_manage_equipment_list_attachment.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_equipment_attachments",
						nextScreenID : "manage_equipment_attachments_edit",
						nextScreenName : manage_equipment_attachments.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		feature_btn_click : function (element, event) {}
	},
	customRequirementHandler : {
		getFilterValues : function () {
			return $("#manage_equipment_attachments_content_1").getInputparamXML({
				screenID : "manage_equipment_attachments",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_equipment_attachments.variable.custom.selectedRecord = manage_equipment_attachments.variable.custom.grid_1.dataSource.getByUid(manage_equipment_attachments.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				//p_information_type : "'EQPTMAST'",
				//p_field_1 : "$manage_equipment_attachments.variable.custom.selectedRecord.equipment_id",
				//p_field_1 : "$manage_equipment_attachments.variable.custom.selectedRecord.rec_tstamp"
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
						fieldId : "manage_equipment_attachments_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_equipment_attachments_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			equipment_id_defaultValue : manage_equipment_master.variable.custom.selectedRecord.equipment_id,
			description_defaultValue : manage_equipment_master.variable.custom.selectedRecord.description
		}
	}
};