var manage_salesinvoice_master_spares = {
	constructScreen : function () {
		manage_salesinvoice_master_spares.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_manage_salesinvoice_list",
				outputPath : "outputparam_detail",
				api : true,
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_salesinvoice_master_spares.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_salesinvoice_master_spares",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_salesinvoice_master_spares_filterArea = $("#manage_salesinvoice_master_spares_pane2");
		$("#manage_salesinvoice_master_spares_content_1 span dt").removeClass("term_one");
		$("#manage_salesinvoice_master_spares_content_1 span dt").removeClass("term_two");
		$("#manage_salesinvoice_master_spares_content_1 span dd.colen").html("");
		$("#manage_salesinvoice_master_spares_content_1").find('dt').css("width","120px");
		$("#manage_salesinvoice_master_spares_editor").append("<li id='manage_salesinvoice_master_spares_grid_pager'></li>");
		$("#manage_salesinvoice_master_spares_grid_pager").append($("#manage_salesinvoice_master_spares_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_salesinvoice_master_spares_grid_1").data("kendoGrid").bind("dataBound", manage_salesinvoice_master_spares.customRequirementHandler.gridPager);
		if(manage_salesinvoice_master_spares.variable.custom.autoLoadInd == "true") {
			manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_salesinvoice_master_spares_splitter[manage_salesinvoice_master_spares_filterArea.width() > 0 ? "collapse" : "expand"](manage_salesinvoice_master_spares_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_salesinvoice_master_spares_content_1",
					screenID : "manage_salesinvoice_master_spares",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_salesinvoice_master_spares_content_1",
				screenID : "manage_salesinvoice_master_spares",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_salesinvoice_master_spares.variable.custom.grid_1 = $("#manage_salesinvoice_master_spares_grid_1").initializeWGrid({
				screenID : "manage_salesinvoice_master_spares",
				dataSource : manage_salesinvoice_master_spares.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
	    $("#manage_salesinvoice_master_spares_contextMenu").kendoContextMenu({
			orientation : "vertical",
			target : "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_salesinvoice_master_spares_editor").kendoMenu();		
		manage_salesinvoice_master_spares_splitter = $("#manage_salesinvoice_master_spares_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_salesinvoice_master_spares.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_salesinvoice_master_spares.variable.custom.crudIndicator == "R") {
				manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource._skip = 0;
				manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_salesinvoice_master_spares_edit.js", "../../s_iscripts/salesinvoice_setDetail.js"])) {
					if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_salesinvoice_spares_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
						mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_salesinvoice_spares_" + login_profile.country_code + ".js"]);
					};
					webNavigationController.gotoNextScreen({
						screenID : "manage_salesinvoice_master_spares",
						nextScreenID : "manage_salesinvoice_master_spares_edit",
						nextScreenName : manage_salesinvoice_master_spares.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_salesinvoice_master_spares.variable.custom.miscID == "filters"){
				manage_salesinvoice_master_spares_splitter[manage_salesinvoice_master_spares_filterArea.width() > 0 ? "collapse" : "expand"](manage_salesinvoice_master_spares_filterArea);
			}
			if(manage_salesinvoice_master_spares.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_salesinvoice_master_spares_content_1",
					screenID : "manage_salesinvoice_master_spares",
					matchCondition : ["_filter"]
				});
				$("#manage_salesinvoice_master_spares_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_salesinvoice_master_spares.variable.custom.selectedFeatureID == "generate_salesinvoice_pdf") {
				if (manage_salesinvoice_master_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_salesinvoice_spares_pdf.js"])) {
						if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_salesinvoice_spares_pdf_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
							mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_salesinvoice_spares_pdf_" + login_profile.country_code + ".js"]);
						};
						webNavigationController.gotoNextScreen({
							screenID : "manage_salesinvoice_master_spares",
							fieldID : "manage_salesinvoice_master_spares_child_window",
							nextScreenID : "generate_salesinvoice_spares_pdf",
							nextScreenName : manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_no,
							windowHeight : 620,
							windowWidth : 600,
							execute : generate_salesinvoice_spares_pdf.constructScreen
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_salesinvoice_master_spares.variable.custom.selectedFeatureID == "cancel_salesinvoice") {
				if (manage_salesinvoice_master_spares.variable.custom.grid_1.select().length != 0) {
					manage_salesinvoice_master_spares.variable.custom.selectedRecord = manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.getByUid(manage_salesinvoice_master_spares.variable.custom.grid_1.select().data("uid"));
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/saleinvoice_cancel.js"])) {
						if (confirm("Are you sure do you want to cancel salesinvoice ?")) {
							var returnValue;
							returnValue = salesinvoice_saleinvoice_cancel.invokeAPI({
									p_salesinvoice_no : manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_no
								});
							if (returnValue.update_status == "SP001") {
								alert("Salesinvoice cancelled successfully.");
								manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.pageSize(50);
								return true;
							} else {
								alert("Cancelling of Salesinvoice failed.");
								return false;
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
			} else if (manage_salesinvoice_master_spares.variable.custom.selectedFeatureID == "convert_pi_to_fi") {
				if (manage_salesinvoice_master_spares.variable.custom.grid_1.select().length != 0) {
					manage_salesinvoice_master_spares.variable.custom.selectedRecord = manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.getByUid(manage_salesinvoice_master_spares.variable.custom.grid_1.select().data("uid"));
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/saleinvoice_convertPItoFI.js"])) {
						if (confirm("Are you sure do you want to convert PI to FI ?")) {
							var returnValue;
							returnValue = salesinvoice_saleinvoice_convertPItoFI.invokeAPI({
									p_pi_invoice_no : manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_no
								});
							if (returnValue.update_status == "SP001") {
								alert("Salesinvoice converted from PI to FI successfully.");
								manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.pageSize(50);
								return true;
							} else {
								alert("Conversion of Salesinvoice from PI to FI failed.");
								return false;
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
			} else if (manage_salesinvoice_master_spares.variable.custom.selectedFeatureID == "manage_txn_event_log") {
				if (manage_salesinvoice_master_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_txn_event_log.js"])) {
						manage_txn_event_log.variable.standard.configurationParam = "SALESINVOICE";
						manage_txn_event_log.variable.custom.txn_ref_no = manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_no;
						manage_txn_event_log.variable.custom.txn_status = manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_status_desc;
						manage_txn_event_log.variable.custom.txn_type_code = "SALESINVOICE";
						webNavigationController.gotoNextScreen({
							screenID : "manage_salesinvoice_master_spares",
							nextScreenID : "manage_txn_event_log",
							nextScreenName : "Event Log"
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_salesinvoice_master_spares.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_salesinvoice_master_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
						manage_user_attachments.variable.standard.configurationParam = "SALESINVOICE";
						manage_user_attachments.variable.custom.project_task_level_ind = "S";
						manage_user_attachments.variable.custom.project_id = manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_no;
						manage_user_attachments.variable.custom.template_id = "";
						manage_user_attachments.variable.custom.task_id = "0";
						manage_user_attachments.variable.custom.project_status_defaultValue = manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_status_desc;
						webNavigationController.gotoNextScreen({
							screenID : "manage_salesinvoice_master_spares",
							nextScreenID : "manage_user_attachments",
							nextScreenName : "Attachments"
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
		},
		workflow_btn_click : function (element, event) {
			var allowedWorkflowArray;
			if (manage_salesinvoice_master_spares.variable.custom.grid_1.select().length != 0) {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_salesinvoice_spares_wfeventverb_status_change.js", "../../s_iscripts/update_salesinvoice_wfeventverb_status_change.js"])) {
					if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_salesinvoice_spares_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
						mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_salesinvoice_spares_" + login_profile.country_code + ".js"]);
					};
					allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
							transactionType : "SALESINVOICE",
							eventVerb : manage_salesinvoice_master_spares.variable.custom.selectedWorkflowEventVerb,
							requestCategory : manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_category,
							requestType : manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_type,
							fromStage : manage_salesinvoice_master_spares.variable.custom.selectedRecord.workflow_stage_no,
							fromStatus : manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_status
						});
					manage_salesinvoice_master_spares.variable.custom.selectedWorkflowToStage = "";
					manage_salesinvoice_master_spares.variable.custom.selectedWorkflowToStatus = "";
					if (allowedWorkflowArray.length != 0) {
						manage_salesinvoice_master_spares.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
						manage_salesinvoice_master_spares.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
						webNavigationController.gotoNextScreen({
							screenID : "manage_salesinvoice_master_spares",
							fieldID : "manage_salesinvoice_master_spares_child_window",
							nextScreenID : "manage_salesinvoice_spares_wfeventverb_status_change",
							nextScreenName : manage_salesinvoice_master_spares.variable.custom.nextScreenName,
							execute : manage_salesinvoice_spares_wfeventverb_status_change.constructScreen
						});
					} else {
						alert("Sorry. This feature is unavailable for the selected record.");
						return false;
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
	},
	linkEventHandler : {		
		actions_link_click : function (element,event){
			$("#manage_salesinvoice_master_spares_contextMenu").data("kendoContextMenu").open(element);
			manage_salesinvoice_master_spares.variable.custom.contextChildElement = $('#manage_salesinvoice_master_spares_contextMenu').children();
			for (i = 0; i < manage_salesinvoice_master_spares.variable.custom.contextChildElement.length; i++){
				if (manage_salesinvoice_master_spares.variable.custom.contextChildElement[i].dataset.buttonGroup == 'workflow'){
					$('#' + screenID + '_'+ manage_salesinvoice_master_spares.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').hide();
				}
			}
			manage_salesinvoice_master_spares.variable.custom.selectedRecord = manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.getByUid(manage_salesinvoice_master_spares.variable.custom.grid_1.select().data("uid"));
			allowedWorkflowArray = mserviceUtilities.getAllowedWorkflowEventVerbs({
					transactionType : "SALESINVOICE",
					requestCategory : manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_category,
					requestType : manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_type,
					fromStage : manage_salesinvoice_master_spares.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_salesinvoice_master_spares.variable.custom.selectedRecord.salesinvoice_status
				});
				
			for (workFlowLength = 0; workFlowLength < allowedWorkflowArray.length; workFlowLength ++){
				currentFeature  = allowedWorkflowArray[workFlowLength].child_screen_id;
				for (i = 0; i < manage_salesinvoice_master_spares.variable.custom.contextChildElement.length; i++){
					if (manage_salesinvoice_master_spares.variable.custom.contextChildElement[i].dataset.buttonRole == currentFeature ){
						$('#' + screenID + '_'+ manage_salesinvoice_master_spares.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').show();
						break;
					}
				} 
			}
			$("#manage_salesinvoice_master_spares_contextMenu").show();
			var columnData = $.grep(manage_salesinvoice_master_spares.variable.custom.contextChildElement, function (data) {
				if($('#' + data.id ).is(':visible')){ $('#' + data.id ).css("display","inline-block").css("min-width","180px"); }
				return $('#' + data.id ).is(':visible');
			});
			var columnCount = parseInt(columnData.length / 6);
			if((columnData.length % 6) != 0){ 
				columnCount = columnCount + 1;
			}
			$("#manage_salesinvoice_master_spares_contextMenu").css("columns", columnCount.toString()).css("width", "min-content");
		},
		customer_order_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_order_master_spares.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_customer_order_master_spares";
				});
				manage_customer_order_master_spares.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_salesinvoice_master_spares",
					nextScreenID : "manage_customer_order_master_spares",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_salesinvoice_master_spares").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_salesinvoice_master_spares"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_customer_order_master_spares"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_customer_order_master_spares";
				webNavigationController.buildBreadCrumb();
				$("#manage_customer_order_master_spares_customer_order_number_filter").setVal($(element).text());
				manage_customer_order_master_spares.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_salesinvoice_master_spares_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_salesinvoice_master_spares_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_salesinvoice_master_spares_content_1").getInputparamXML({
				screenID : "manage_salesinvoice_master_spares",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_salesinvoice_master_spares.variable.custom.selectedRecord = manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.getByUid(manage_salesinvoice_master_spares.variable.custom.grid_1.select().data("uid"));
		},
        getExportConfig : function (gridId) {
			if(gridId == "manage_salesinvoice_master_spares_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_salesinvoice_master_spares",
					service : "sp_retrieve_manage_salesinvoice_list",
					request : "<signature><i_inputparam_xml>" + manage_salesinvoice_master_spares.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.data().length
				};
			}
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
						fieldId : "manage_salesinvoice_master_spares_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_salesinvoice_master_spares_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			salesinvoice_generatePDF : "false"
		},
	}
};
