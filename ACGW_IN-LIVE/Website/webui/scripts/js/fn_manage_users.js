var manage_users = {
	constructScreen : function () {
		manage_users.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_users_list",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_json : "manage_users.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_users",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_users_filterArea = $("#manage_users_pane2");
		setTimeout(function(){
			manage_users.buttonEventHandler.misc_btn_click();
		}, 10);
		$("#manage_users_content_1 span dt").removeClass("term_one");
		$("#manage_users_content_1 span dt").removeClass("term_two");
		$("#manage_users_content_1 span dd.colen").html("");
		$("#manage_users_content_1").find('dt').css("width","120px");
		$("#manage_users_content_1").find('dd.value').css("width","160px");
		$("#manage_users_editor").append("<li id='manage_users_grid_pager'></li>");
		$("#manage_users_grid_pager").append($("#manage_users_grid_1").find(".k-grid-pager")).css("width","300px").css("float","right").children().css("border-top-width","0px");
		$("#manage_users_grid_1").data("kendoGrid").bind("dataBound", manage_users.customRequirementHandler.gridPager);
	},
	initializeWidgets : function () {
		$("#manage_users_user_group_id_filter").initializeWDropdownlist({
			screenID : "manage_users",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'USER_GROUP_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			filterMode : true
		});
		manage_users.variable.custom.grid_1 = $("#manage_users_grid_1").initializeWGrid({
				screenID : "manage_users",
				dataSource : manage_users.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_users_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_users_editor").kendoMenu();		
		manage_users_splitter = $("#manage_users_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_users.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_users.variable.custom.grid_1.dataSource.read();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_users.variable.custom.crudIndicator == "R") {
				manage_users.variable.custom.grid_1.dataSource.pageSize(50);
				manage_users.variable.custom.grid_1.dataSource.read();
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_users_edit.js", "../../s_iscripts/save_manage_user_details.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_users",
						fieldID : "manage_users_child_window",
						nextScreenID : "manage_users_edit",
						nextScreenName : manage_users.variable.custom.nextScreenName,
						execute : manage_users_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			manage_users_splitter[manage_users_filterArea.width() > 0 ? "collapse" : "expand"](manage_users_filterArea);
		},
		feature_btn_click : function (element, event) {
			if (manage_users.variable.custom.selectedFeatureID == "activate_or_deactivate_user") {
				if (manage_users.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/activate_deactivate_user_access.js"])) {
						var activeIndValue,
						confirmationMessage,
						alertMessage,
						returnValue;
						if (manage_users.variable.custom.selectedRecord.active_ind == "0") {
							activeIndValue = "1";
							confirmationMessage = "Do you want to activate this user?";
							alertMessage = "User activated successfully";
						} else if (manage_users.variable.custom.selectedRecord.active_ind == "1") {
							activeIndValue = "0";
							confirmationMessage = "Do you want to deactivate this user?";
							alertMessage = "User deactivated successfully";
						}
						if (confirm(confirmationMessage)) {
							returnValue = executeService_activate_deactivate_user_access({
									p_user_id : manage_users.variable.custom.selectedRecord.user_id,
									p_activate_deactivate_ind : activeIndValue,
									p_rec_tstamp : manage_users.variable.custom.selectedRecord.rec_tstamp
								});
							if (returnValue == "SP001") {
								alert(alertMessage);
							} else {
								alert("Unable to process your request. Please contact support desk.");
							}
						}
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
		actions_link_click : function (element,event){
			$("#manage_users_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_users_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_users_grid_1").find(".k-grid-content").css("height","472px");
		},
		setSelectedRecord : function () {
			manage_users.variable.custom.selectedRecord = manage_users.variable.custom.grid_1.dataSource.getByUid(manage_users.variable.custom.grid_1.select().data("uid"));
		},
		getFilterValues : function () {
			return $("#manage_users_content_1").getInputparamXML({
				screenID : "manage_users",
				matchCondition : ["_filter"]
			});
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'USERDETAIL'",
				p_field_1 : "$manage_users.variable.custom.selectedRecord.user_id",
				p_field_2 : "$manage_users.variable.custom.selectedRecord.rec_tstamp"
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_users_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_users",
					service : "sp_retrieve_manage_users_list",
					request : "<signature><i_inputparam_json>" + manage_users.customRequirementHandler.getFilterValues() + "</i_inputparam_json><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_users.variable.custom.grid_1.dataSource.data().length
				};
			}
		}
	},	
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
			importConfiguration : {
				imformationType : 'manage_users'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_users_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_users_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};