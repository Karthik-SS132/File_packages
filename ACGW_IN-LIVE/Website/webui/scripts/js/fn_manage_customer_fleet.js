var manage_customer_fleet = {
	constructScreen : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			manage_customer_fleet.variable.custom.customer_id_filter_defaultValue = manage_customer_master.variable.custom.selectedRecord.cust_id;
		}
		manage_customer_fleet.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_custom_info_list",
				outputPath : "outputparam_detail",
				api : true,
				pageSize : 50,
				inputParameter : {
					p_custom_info_code : "'CUSTOMER_FLEET'",
					p_inputparam_xml : "manage_customer_fleet.customRequirementHandler.getFilterValues()"
				},
				screenID : "manage_customer_fleet",
				schemaModel : true,
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
			
		manage_customer_fleet.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_listof_values_for_searchcondition",
			outputPath : "context/outputparam",
			pageSize : 5,
			inputParameter : {
				p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_MACHINE_LIST'</lov_code_type><search_field_1>#manage_customer_fleet_customer_id_filter</search_field_1></inputparam>"
			},
			screenID : "manage_customer_fleet",
		});	
	},
	postConstruct : function () {
	if (webNavigationController.getPreviousScreenID() != "home_container") {
			$("#manage_customer_fleet_retrieve_btn").hide();
			manage_customer_fleet.variable.custom.datasource_1.read();
		}else {
			$("#manage_customer_fleet_footer").hide();
		}
	},
	initializeWidgets : function () {
		$("#manage_customer_fleet_tabstrip").kendoTabStrip();
		manage_customer_fleet.variable.custom.grid_1 = $("#manage_customer_fleet_grid_1").initializeWGrid({
				screenID : "manage_customer_fleet",
				toolbar : "#manage_customer_fleet_grid_1_toolbar_template",
				dataSource : manage_customer_fleet.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
			
		manage_customer_fleet.variable.custom.grid_2 = $("#manage_customer_fleet_grid_2").initializeWGrid({
				screenID : "manage_customer_fleet",
				toolbar : false,
				dataSource : manage_customer_fleet.variable.custom.datasource_2,
				height : 400,
				pageSize : 10
			});	
	},
	refreshScreen : function () {
		manage_customer_fleet.variable.custom.grid_1.dataSource.pageSize(10);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_customer_fleet.variable.custom.crudIndicator == "R") {
				manage_customer_fleet.variable.custom.grid_1.dataSource.read();
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_fleet_edit.js", "../../s_iscripts/save_manage_customer_loc_details.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_customer_fleet",
						nextScreenID : "manage_customer_fleet_edit",
						nextScreenName : manage_customer_fleet.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_customer_fleet.variable.custom.selectedFeatureID == "manage_customer_fleet") {
				if (manage_customer_fleet.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_fleet.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_fleet",
							nextScreenID : "manage_customer_fleet",
							nextScreenName : manage_customer_fleet.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			}
			if (manage_customer_fleet.variable.custom.selectedFeatureID == "manage_customer_contacts_edit") {
				if (manage_customer_fleet.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_contacts_edit.js", "../../s_iscripts/custominfo_setDetail.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_fleet",
							nextScreenID : "manage_customer_contacts_edit",
							nextScreenName : manage_customer_fleet.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			}
		}
	},
	linkEventHandler : {
		competitor_machine_tab_link_click : function (element, event) {
			if (manage_customer_fleet.variable.custom.competitorTabOpened == false) {
				manage_customer_fleet.variable.custom.competitorTabOpened = true;
				manage_customer_fleet.variable.custom.datasource_1.read();
			}
		},
		our_machine_tab_link_click : function (element, event) {
			if (manage_customer_fleet.variable.custom.ourmachineEntryTabOpened == false) {
				manage_customer_fleet.variable.custom.ourmachineEntryTabOpened = true;
					manage_customer_fleet.variable.custom.datasource_2.read();
				
			}
		}
	},
	customRequirementHandler : {
		getFilterValues : function () {
			return $("#manage_customer_fleet_content_1").getInputparamXML({
				screenID : "manage_customer_fleet",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_customer_fleet.variable.custom.selectedRecord = manage_customer_fleet.variable.custom.grid_1.dataSource.getByUid(manage_customer_fleet.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'CUSTFLEET'",
				p_field_1 : "$manage_customer_fleet.variable.custom.selectedRecord.customer_id",
				p_field_2 : "$manage_customer_fleet.variable.custom.selectedRecord.model",
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
						fieldId : "manage_customer_fleet_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_customer_fleet_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			competitorTabOpened : false,
			ourmachineEntryTabOpened : false
			
		},
	}
};