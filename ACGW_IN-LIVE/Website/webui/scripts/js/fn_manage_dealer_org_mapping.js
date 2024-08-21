var manage_dealer_org_mapping = {
	constructScreen : function () {
		manage_dealer_org_mapping.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_dealer_org_mapping_list",
				outputPath : "context/outputparam/p_dealer_org_mapping_list",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "manage_dealer_org_mapping.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_dealer_org_mapping",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		manage_dealer_org_mapping.variable.custom.grid_1.dataSource.read();
	},
	initializeWidgets : function () {
		manage_dealer_org_mapping.variable.custom.grid_1 = $("#manage_dealer_org_mapping_grid_1").initializeWGrid({
				screenID : "manage_dealer_org_mapping",
				toolbar : "#manage_dealer_org_mapping_grid_1_toolbar_template",
				dataSource : manage_dealer_org_mapping.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	refreshScreen : function () {
		manage_dealer_org_mapping.variable.custom.grid_1.dataSource.read();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_dealer_org_mapping_edit.js", "../../s_iscripts/save_manage_dealer_org_mapping.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_dealer_org_mapping",
					fieldID : "manage_dealer_org_mapping_child_window",
					nextScreenID : "manage_dealer_org_mapping_edit",
					nextScreenName : manage_dealer_org_mapping.variable.custom.nextScreenName,
					execute : manage_dealer_org_mapping_edit.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
	},
	customRequirementHandler : {
		getFilterValues : function () {
			return $("#manage_dealer_org_mapping_content_1").getInputparamXML({
				screenID : "manage_dealer_org_mapping",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_dealer_org_mapping.variable.custom.selectedRecord = manage_dealer_org_mapping.variable.custom.grid_1.dataSource.getByUid(manage_dealer_org_mapping.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'DLR_ORG_MAPPING'",
				p_field_1 : "$manage_dealer_org_mapping.variable.custom.selectedRecord.dealer_id"
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
						fieldId : "manage_dealer_org_mapping_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_dealer_org_mapping_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
