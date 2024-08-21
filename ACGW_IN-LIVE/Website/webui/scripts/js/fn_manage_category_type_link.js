var manage_category_type_link = {
	constructScreen : function () {
		manage_category_type_link.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_catgtype_code_link",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_link_type : "#manage_category_type_link_link_type_filter"
				},
				schemaModel : true,
				screenID : "manage_category_type_link",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	initializeWidgets : function () {
		manage_category_type_link.variable.custom.linkType = $("#manage_category_type_link_link_type_filter").initializeWDropdownlist({
				screenID : "manage_category_type_link",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'CATEGORYTYPELINK_LIST'",
						p_search_field_1 : "",
						p_search_field_2 : "",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
				},
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1"
			});
		manage_category_type_link.variable.custom.grid_1 = $("#manage_category_type_link_grid_1").initializeWGrid({
				screenID : "manage_category_type_link",
				toolbar : "#manage_category_type_link_grid_1_toolbar_template",
				dataSource : manage_category_type_link.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	refreshScreen : function () {
		manage_category_type_link.variable.custom.grid_1.dataSource.read();
	},
	widgetEventHandler : {
		link_type_filter_change : function (element, event) {
			manage_category_type_link.variable.custom.grid_1.dataSource.read();
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_category_type_link.variable.custom.crudIndicator == "A" && $("#manage_category_type_link_link_type_filter").getVal() == "") {
				alert("Please select a valid Link Type");
				return false;
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_category_type_link_edit.js", "../../s_iscripts/save_manage_catgtype_code_link.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_category_type_link",
						fieldID : "manage_category_type_link_child_window",
						nextScreenID : "manage_category_type_link_edit",
						nextScreenName : manage_category_type_link.variable.custom.nextScreenName,
						execute : manage_category_type_link_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_category_type_link.variable.custom.selectedRecord = manage_category_type_link.variable.custom.grid_1.dataSource.getByUid(manage_category_type_link.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'CATEGORYTYPELINK'",
				p_field_1 : "#manage_category_type_link_link_type_filter",
				p_field_2 : "$manage_category_type_link.variable.custom.selectedRecord.p_category_code_type",
				p_field_3 : "$manage_category_type_link.variable.custom.selectedRecord.p_category_code_value",
				p_field_4 : "$manage_category_type_link.variable.custom.selectedRecord.p_type_code_type",
				p_field_5 : "$manage_category_type_link.variable.custom.selectedRecord.p_type_code_value"
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
						fieldId : "manage_category_type_link_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_category_type_link_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			datasource_1 : "",
			linkType : "",
			grid_1 : "",
			nextScreenName : "",
			selectedRecord : "",
			crudIndicator : ""
		},
	}
};
