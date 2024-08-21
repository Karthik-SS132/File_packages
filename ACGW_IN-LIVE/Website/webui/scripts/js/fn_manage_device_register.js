var manage_device_register = {
	constructScreen : function () {
		manage_device_register.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_device_register",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_device_register.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_device_register",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_device_register_filterArea = $("#manage_device_register_pane2");
		$("#manage_device_register_content_1 span dt").removeClass("term_one");
		$("#manage_device_register_content_1 span dt").removeClass("term_two");
		$("#manage_device_register_content_1 span dd.colen").html("");
		$("#manage_device_register_content_1").find('dt').css("width","120px");
		$("#manage_device_register_editor").append("<li id='manage_device_register_grid_pager'></li>");
		$("#manage_device_register_grid_pager").append($("#manage_device_register_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_device_register_grid_1").data("kendoGrid").bind("dataBound", manage_device_register.customRequirementHandler.gridPager);
		if(manage_device_register.variable.custom.autoLoadInd == "true") {
			manage_device_register.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_device_register_splitter[manage_device_register_filterArea.width() > 0 ? "collapse" : "expand"](manage_device_register_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_device_register_content_1",
					screenID : "manage_device_register",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_device_register_content_1",
				screenID : "manage_device_register",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_device_register.variable.custom.grid_1 = $("#manage_device_register_grid_1").initializeWGrid({
				screenID : "manage_device_register",
				dataSource : manage_device_register.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
	    $("#manage_device_register_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_device_register_editor").kendoMenu();		
		manage_device_register_splitter = $("#manage_device_register_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_device_register.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_device_register.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_device_register.variable.custom.crudIndicator == "R") {
				manage_device_register.variable.custom.grid_1.dataSource._skip = 0;
				manage_device_register.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_device_register_edit.js", "../../s_iscripts/save_manage_device_register.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_device_register",
						fieldID : "manage_device_register_child_window",
						nextScreenID : "manage_device_register_edit",
						nextScreenName : manage_device_register.variable.custom.nextScreenName,
						execute : manage_device_register_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_device_register.variable.custom.miscID == "filters"){
				manage_device_register_splitter[manage_device_register_filterArea.width() > 0 ? "collapse" : "expand"](manage_device_register_filterArea);
			}
			if(manage_device_register.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_device_register_content_1",
					screenID : "manage_device_register",
					matchCondition : ["_filter"]
				});
				$("#manage_device_register_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_device_register.variable.custom.selectedFeatureID == "activate_or_deactivate_device") {
				if (manage_device_register.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/activate_deactivate_device.js"])) {
						var activeIndValue,
						confirmationMessage,
						alertMessage,
						returnValue;
						if (manage_device_register.variable.custom.selectedRecord.active_ind == "0") {
							activeIndValue = "1";
							confirmationMessage = "Do you want to activate this device?";
							alertMessage = "Device activated successfully";
						} else if (manage_device_register.variable.custom.selectedRecord.active_ind == "1") {
							activeIndValue = "0";
							confirmationMessage = "Do you want to deactivate this device?";
							alertMessage = "Device deactivated successfully";
						}
						if (confirm(confirmationMessage)) {
							returnValue = executeService_activate_deactivate_device({
									p_device_id : manage_device_register.variable.custom.selectedRecord.device_id,
									p_activate_deactivate_ind : activeIndValue,
									p_rec_tstamp : manage_device_register.variable.custom.selectedRecord.rec_tstamp
								});
							if (returnValue == "SP001") {
								alert(alertMessage);
								manage_device_register.variable.custom.grid_1.dataSource.pageSize(50);
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
			$("#manage_device_register_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_device_register_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_device_register_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_device_register_grid_1").find(".k-grid-header").height());
		},
		setSelectedRecord : function () {
			manage_device_register.variable.custom.selectedRecord = manage_device_register.variable.custom.grid_1.dataSource.getByUid(manage_device_register.variable.custom.grid_1.select().data("uid"));
		},
		getFilterValues : function () {
			return $("#manage_device_register_content_1").getInputparamXML({
				screenID : "manage_device_register",
				matchCondition : ["_filter"]
			});
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'DEVICEREGISTER'",
				p_field_1 : "$manage_device_register.variable.custom.selectedRecord.device_id",
				p_field_2 : "$manage_device_register.variable.custom.selectedRecord.rec_tstamp"
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_device_register_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_device_register",
					service : "sp_retrieve_manage_device_register",
					request : "<signature><i_inputparam_xml>" + manage_device_register.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_device_register.variable.custom.grid_1.dataSource.data().length
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
				imformationType : 'manage_device_register'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_device_register_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_device_register_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};