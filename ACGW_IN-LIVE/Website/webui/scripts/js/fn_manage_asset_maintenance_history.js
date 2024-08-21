var manage_asset_maintenance_history = {
	constructScreen : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			manage_asset_maintenance_history.variable.custom.asset_id_filter_defaultValue = manage_asset_master.variable.custom.selectedRecord.asset_id;
			manage_asset_maintenance_history.variable.custom.asset_id_filter_defaultValueDescription = manage_asset_master.variable.custom.selectedRecord.asset_desc;
			manage_asset_maintenance_history.variable.custom.installation_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_asset_master.variable.custom.selectedRecord.install_date
					}), "dd-MM-yyyy");
			manage_asset_maintenance_history.variable.custom.retrieveButtonClicked = true;
		};
		manage_asset_maintenance_history.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "mservice",
				serviceName : "retrieve_asset_maintenance_history",
				outputPath : "context/outputparam_detail2",
				pageSize : 10,
				inputParameter : {
					p_asset_id : "#manage_asset_maintenance_history_asset_id_filter",
					p_call_jo_ind : "'C'"
				},
				schemaModel : true,
				screenID : "manage_asset_maintenance_history",
				dataSourceName : "datasource_1",
				processResponse : true
			});
		manage_asset_maintenance_history.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName : "mservice",
				serviceName : "retrieve_asset_maintenance_history",
				outputPath : "context/outputparam_detail1",
				pageSize : 10,
				inputParameter : {
					p_asset_id : "#manage_asset_maintenance_history_asset_id_filter",
					p_call_jo_ind : "'J'"
				},
				schemaModel : true,
				screenID : "manage_asset_maintenance_history",
				dataSourceName : "datasource_2",
				processResponse : true
			});
	},
	postConstruct : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			$("#manage_asset_maintenance_history_retrieve_btn").hide();
			if (manage_asset_maintenance_history.variable.custom.tabstrip.value() == "Call") {
				manage_asset_maintenance_history.variable.custom.grid_1.dataSource.read();
				manage_asset_maintenance_history.variable.custom.callTabOpened = true;
			} else if (manage_asset_maintenance_history.variable.custom.tabstrip.value() == "Job") {
				manage_asset_maintenance_history.variable.custom.grid_2.dataSource.read();
				manage_asset_maintenance_history.variable.custom.jobTabOpened = true;
			}
		} else {
			$("#manage_asset_maintenance_history_footer").hide();
		}
	},
	initializeWidgets : function () {
		manage_asset_maintenance_history.variable.custom.asset_id_filter = $("#manage_asset_maintenance_history_asset_id_filter").initializeWCombobox({
				screenID : "manage_asset_maintenance_history",
				defaultValue : "$manage_asset_maintenance_history.variable.custom.asset_id_filter_defaultValue",
				defaultValueDescription : "$manage_asset_maintenance_history.variable.custom.asset_id_filter_defaultValueDescription",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'ASSET_LIST_FOR_MTNCE_HIST'</lov_code_type><search_field_1>$manage_asset_maintenance_history.variable.custom.asset_id_filter_serverFilterValue</search_field_1></inputparam>"
					}
				},
				dataTextField : "desc",
				dataValueField : "id",
				serverFiltering : true,
				filterMode : true,
			});
		$("#manage_asset_maintenance_history_installation_date").initializeWDisplayarea({
			screenID : "manage_asset_maintenance_history",
			defaultValue : "$manage_asset_maintenance_history.variable.custom.installation_date_defaultValue"
		});
		manage_asset_maintenance_history.variable.custom.tabstrip = $("#manage_asset_maintenance_history_tabstrip").kendoTabStrip({
				animation : {
					open : {
						effects : "fadeIn"
					},
				},
				activate : function (event) {
					$("#manage_asset_maintenance_history_grid_1 .k-grid-content").css("height", "332");
					$("#manage_asset_maintenance_history_grid_2 .k-grid-content").css("height", "332");
				}
			}).data("kendoTabStrip");
		manage_asset_maintenance_history.variable.custom.grid_1 = $("#manage_asset_maintenance_history_grid_1").initializeWGrid({
				screenID : "manage_asset_maintenance_history",
				toolbar : false,
				dataSource : manage_asset_maintenance_history.variable.custom.datasource_1,
				height : 400,
				pageSize : 10,
				filterable : false
			});
		manage_asset_maintenance_history.variable.custom.grid_2 = $("#manage_asset_maintenance_history_grid_2").initializeWGrid({
				screenID : "manage_asset_maintenance_history",
				toolbar : false,
				dataSource : manage_asset_maintenance_history.variable.custom.datasource_2,
				height : 400,
				pageSize : 10,
				filterable : false
			});
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_asset_maintenance_history.variable.custom.validator.validate()) {
				if (manage_asset_maintenance_history.variable.custom.tabstrip.value() == "Call") {
					manage_asset_maintenance_history.variable.custom.grid_1.dataSource.read();
					manage_asset_maintenance_history.variable.custom.callTabOpened = true;
					manage_asset_maintenance_history.variable.custom.jobTabOpened = false;
				} else if (manage_asset_maintenance_history.variable.custom.tabstrip.value() == "Job") {
					manage_asset_maintenance_history.variable.custom.grid_2.dataSource.read();
					manage_asset_maintenance_history.variable.custom.jobTabOpened = true;
					manage_asset_maintenance_history.variable.custom.callTabOpened = false;
				};
				manage_asset_maintenance_history.variable.custom.retrieveButtonClicked = true;
			}
		},
	},
	linkEventHandler : {
		call_tab_link_click : function (element, event) {
			if (manage_asset_maintenance_history.variable.custom.retrieveButtonClicked == true && manage_asset_maintenance_history.variable.custom.callTabOpened == false) {
				manage_asset_maintenance_history.variable.custom.callTabOpened = true;
				manage_asset_maintenance_history.variable.custom.retrieveButtonClicked = false;
				manage_asset_maintenance_history.variable.custom.datasource_1.read();
			}
		},
		job_tab_link_click : function (element, event) {
			if (manage_asset_maintenance_history.variable.custom.retrieveButtonClicked == true && manage_asset_maintenance_history.variable.custom.jobTabOpened == false) {
				manage_asset_maintenance_history.variable.custom.jobTabOpened = true;
				manage_asset_maintenance_history.variable.custom.retrieveButtonClicked = false;
				manage_asset_maintenance_history.variable.custom.datasource_2.read();
			}
		},
		call_attachment_reference_link_click : function (element, event) {
			var selectedRecord;
			selectedRecord = manage_asset_maintenance_history.variable.custom.grid_1.dataSource.getByUid(manage_asset_maintenance_history.variable.custom.grid_1.select().data("uid"));
			manage_asset_maintenance_history.variable.custom.attachmentTobeViewed = mserviceUtilities.getFileUploadPath({
					transactionType : "CALL",
					async : false,
					referenceNumber : selectedRecord.call_ref_no
				}) + "/" + $(element).text();
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_maintenance_history_child.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_asset_maintenance_history",
					fieldID : "manage_asset_maintenance_history_child_window",
					nextScreenID : "manage_asset_maintenance_history_child",
					nextScreenName : "Attachment",
					windowHeight : 600,
					windowWidth : 900,
					execute : manage_asset_maintenance_history_child.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact support desk.");
			}
		},
		call_reference_no_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_edit.js"])) {
				manage_call_register = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								call_no : $(element).text()
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "manage_asset_maintenance_history",
					nextScreenID : "manage_call_register_edit",
					nextScreenName : $(element).text()
				});
				$("#manage_call_register_edit_submit_btn").hide();
				$("#manage_call_register_edit").enableViewMode();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	widgetEventHandler : {
		asset_id_filter_change : function (element, event) {
			if ($("#manage_asset_maintenance_history_asset_id_filter").getVal() != "") {
				$("#manage_asset_maintenance_history_installation_date").setVal(mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
							dateString : manage_asset_maintenance_history.variable.custom.asset_id_filter.dataItem().inst_date
						}), "dd-MM-yyyy"));
			} else {
				$("#manage_asset_maintenance_history_installation_date").setVal("");
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_asset_maintenance_history.variable.custom.selectedRecord = manage_asset_maintenance_history.variable.custom.grid_1.dataSource.getByUid(manage_asset_maintenance_history.variable.custom.grid_1.select().data("uid"));
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
			exportConfiguration : {
				mode : 'single',
				content : [{
						exportType : "grid",
						fieldId : "manage_asset_maintenance_history_grid_1",
						dispalyLabel : "Call"
					}/*, {
						exportType : "grid",
						fieldId : "manage_asset_maintenance_history_grid_2",
						dispalyLabel : "Job"
					}*/
				]
			},
			printConfiguration : {
				mode : 'multiple',
				content : [{
						type : "grid",
						fieldId : "manage_asset_maintenance_history_grid_1",
						dispalyLabel : "Call"
					}, {
						type : "grid",
						fieldId : "manage_asset_maintenance_history_grid_2",
						dispalyLabel : "Job"
					}
				]
			}
		},
		custom : {
			callTabOpened : false,
			jobTabOpened : false,
			retrieveButtonClicked : false
		}
	}
};
