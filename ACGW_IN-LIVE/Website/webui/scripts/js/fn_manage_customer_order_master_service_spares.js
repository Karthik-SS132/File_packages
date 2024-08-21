var manage_customer_order_master_service_spares = {
	constructScreen : function () {
		manage_customer_order_master_service_spares.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "salesinvoice",
			serviceName : "retrieve_manage_customer_order_list",
			outputPath : "outputparam_detail",
			api : true,
			pageSize : 50,
			inputParameter : {
				p_inputparam_xml : "manage_customer_order_master_service_spares.customRequirementHandler.getFilterValues()"
			},
			schemaModel : true,
			screenID : "manage_customer_order_master_service_spares",
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		manage_customer_order_master_service_spares_filterArea = $("#manage_customer_order_master_service_spares_pane2");
		$("#manage_customer_order_master_service_spares_content_1 span dt").removeClass("term_one");
		$("#manage_customer_order_master_service_spares_content_1 span dt").removeClass("term_two");
		$("#manage_customer_order_master_service_spares_content_1 span dd.colen").html("");
		$("#manage_customer_order_master_service_spares_content_1").find('dt').css("width","120px");
		$("#manage_customer_order_master_service_spares_editor").append("<li id='manage_customer_order_master_service_spares_grid_pager'></li>");
		$("#manage_customer_order_master_service_spares_grid_pager").append($("#manage_customer_order_master_service_spares_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_customer_order_master_service_spares_grid_1").data("kendoGrid").bind("dataBound", manage_customer_order_master_service_spares.customRequirementHandler.gridPager);
		if(manage_customer_order_master_service_spares.variable.custom.autoLoadInd == "true") {
			manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_customer_order_master_service_spares_splitter[manage_customer_order_master_service_spares_filterArea.width() > 0 ? "collapse" : "expand"](manage_customer_order_master_service_spares_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_customer_order_master_service_spares_content_1",
					screenID : "manage_customer_order_master_service_spares",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_customer_order_master_service_spares_content_1",
				screenID : "manage_customer_order_master_service_spares",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_customer_order_master_service_spares.variable.custom.grid_1 = $("#manage_customer_order_master_service_spares_grid_1").initializeWGrid({
				screenID : "manage_customer_order_master_service_spares",
				dataSource : manage_customer_order_master_service_spares.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
	    $("#manage_customer_order_master_service_spares_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_customer_order_master_service_spares_editor").kendoMenu();		
		manage_customer_order_master_service_spares_splitter = $("#manage_customer_order_master_service_spares_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_customer_order_master_service_spares.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_customer_order_master_service_spares.variable.custom.crudIndicator == "R") {
				manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource._skip = 0;
				manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_order_master_service_spares_edit.js", "../../s_iscripts/customerOrder_setDetails.js"])) {
					if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_customer_order_spares_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
						mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_customer_order_spares_" + login_profile.country_code + ".js"]);
					};
					webNavigationController.gotoNextScreen({
						screenID : "manage_customer_order_master_service_spares",
						nextScreenID : "manage_customer_order_master_service_spares_edit",
						nextScreenName : manage_customer_order_master_service_spares.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_customer_order_master_service_spares.variable.custom.miscID == "filters"){
				manage_customer_order_master_service_spares_splitter[manage_customer_order_master_service_spares_filterArea.width() > 0 ? "collapse" : "expand"](manage_customer_order_master_service_spares_filterArea);
			}
			if(manage_customer_order_master_service_spares.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_customer_order_master_service_spares_content_1",
					screenID : "manage_customer_order_master_service_spares",
					matchCondition : ["_filter"]
				});
				$("#manage_customer_order_master_service_spares_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_customer_order_master_service_spares.variable.custom.selectedFeatureID == "generate_customer_order_pdf") {
				if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_customer_order_service_spares_pdf.js"])) {
						if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_customer_order_service_spares_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
							mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_customer_order_service_spares_" + login_profile.country_code + ".js"]);
						};
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_order_master_service_spares",
							fieldID : "manage_customer_order_master_service_spares_child_window",
							nextScreenID : "generate_customer_order_service_spares_pdf",
							nextScreenName : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no,
							windowHeight : 620,
							windowWidth : 600,
							execute : generate_customer_order_service_spares_pdf.constructScreen
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_customer_order_master_service_spares.variable.custom.selectedFeatureID == "regenerate_customer_order") {
				if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
					manage_customer_order_master_service_spares.variable.custom.selectedRecord = manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.getByUid(manage_customer_order_master_service_spares.variable.custom.grid_1.select().data("uid"));
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/regenerate_customer_order_document.js"])) {
						if (confirm("Are you sure do you want to re-generate this customer_order ?")) {
							var returnValue;
							returnValue = executeService_regenerate_customer_order_document({
									p_customer_order_no : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no
								});
							if (returnValue.update_status == "SP001") {
								alert("Quotation Re-generated successfully. Your Quotation Document reference number is " + returnValue.recustomer_order_doc_ref_no);
								manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.pageSize(50);
								return true;
							} else {
								alert("Generation of Quotation Re-generation failed.");
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
			} else if (manage_customer_order_master_service_spares.variable.custom.selectedFeatureID == "generate_salesinvoice") {
				if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
					manage_customer_order_master_service_spares.variable.custom.selectedRecord = manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.getByUid(manage_customer_order_master_service_spares.variable.custom.grid_1.select().data("uid"));
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/saleinvoice_generateSalesInvoice.js"])) {
						if (confirm("Are you sure do you want to generate salesinvoice for this Order ?")) {
							var returnValue;
							returnValue = salesinvoice_saleinvoice_generateSalesInvoice.invokeAPI({
									p_customer_order_no : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no
								});
							if (returnValue.update_status == "SP001") {
								alert("Salesinvoice generated successfully. Your Document reference number is " + returnValue.invoice_no);
								manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.pageSize(50);
								return true;
							} else {
								alert("Generation of Salesinvoice failed.");
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
			} else if (manage_customer_order_master_service_spares.variable.custom.selectedFeatureID == "generate_proforma_invoice") {
				if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
					manage_customer_order_master_service_spares.variable.custom.selectedRecord = manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.getByUid(manage_customer_order_master_service_spares.variable.custom.grid_1.select().data("uid"));
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/customerOrder_generatePI.js"])) {
						if (confirm("Are you sure do you want to generate PI for this Order ?")) {
							var returnValue;
							returnValue = salesinvoice_customerOrder_generatePI.invokeAPI({
									p_txn_ref_no_ind : "O",
									p_txn_ref_no : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no
								});
							if (returnValue.update_status == "SP001") {
								alert("PI generated successfully.");
								manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.pageSize(50);
								return true;
							} else {
								alert("Generation of PI failed.");
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
			} else if (manage_customer_order_master_service_spares.variable.custom.selectedFeatureID == "manage_txn_event_log") {
				if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_txn_event_log.js"])) {
						manage_txn_event_log.variable.standard.configurationParam = "CUSTOMERORDER";
						manage_txn_event_log.variable.custom.txn_ref_no = manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no;
						manage_txn_event_log.variable.custom.txn_status = manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_status_desc;
						manage_txn_event_log.variable.custom.txn_type_code = "CUSTOMERORDER";
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_order_master_service_spares",
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
			} else if (manage_customer_order_master_service_spares.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
						manage_user_attachments.variable.standard.configurationParam = "CUSTOMERORDER";
						manage_user_attachments.variable.custom.project_task_level_ind = "O";
						manage_user_attachments.variable.custom.project_id = manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no;
						manage_user_attachments.variable.custom.template_id = manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no.substring(20);
						manage_user_attachments.variable.custom.task_id = "0";
						manage_user_attachments.variable.custom.project_status_defaultValue = manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_status_desc;
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_order_master_service_spares",
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
			} else if (manage_customer_order_master_service_spares.variable.custom.selectedFeatureID == "cancel_customer_order") {
				if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
					manage_customer_order_master_service_spares.variable.custom.selectedRecord = manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.getByUid(manage_customer_order_master_service_spares.variable.custom.grid_1.select().data("uid"));
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/customerOrder_cancel.js"])) {
						if (confirm("Are you sure do you want to cancel this Order ?")) {
							var returnValue;
							returnValue = salesinvoice_customerOrder_cancel.invokeAPI({
									p_customer_order_no : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no
								});
							if (returnValue.update_status == "SP001") {
								alert("Customer Order cancelled successfully.");
								manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.pageSize(50);
								return true;
							} else {
								alert("Cancelling of Customer Order failed.");
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
			} else if (manage_customer_order_master_service_spares.variable.custom.selectedFeatureID == "generate_parts_order_document") {
				if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/partsorder_generatePartsOrder.js"])) {
						if (confirm("Are you sure do you want to generate parts order document for this document ?")) {
							var returnValue;
							returnValue = salesinvoice_partsorder_generatePartsOrder.invokeAPI({
									p_parts_order_reason_code : "CUSTPO",
									p_parts_order_reason_ref_no : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no
								});
							if (returnValue.update_status == "SP001") {
								alert("Parts Order Document generated successfully. Your Parts Order Document reference number is " + returnValue.parts_order_no);
								manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.pageSize(50);
								return true;
							} else {
								alert("Generation of Parts Order Document failed.");
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
			}
			 else if (manage_customer_order_master_service_spares.variable.custom.selectedFeatureID == "manage_invoice_generation") {
				if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_invoice_generation.js","../../s_iscripts/custominfo_setDetail.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_order_master_service_spares",
							fieldID : "manage_customer_order_master_service_spares_child_window",
							nextScreenID : "manage_invoice_generation",
							nextScreenName : "Invoice Generation",
							execute : manage_invoice_generation.constructScreen
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
			if (manage_customer_order_master_service_spares.variable.custom.grid_1.select().length != 0) {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_order_service_spares_wfeventverb_status_change.js", "../../s_iscripts/update_customer_order_wfeventverb_status_change.js"])) {
					if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_customer_order_service_spares_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
						mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_customer_order_service_spares_" + login_profile.country_code + ".js"]);
					};
					allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
							transactionType : "CUSTOMERORDER",
							eventVerb : manage_customer_order_master_service_spares.variable.custom.selectedWorkflowEventVerb,
							requestCategory : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_category,
							requestType : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_type,
							fromStage : manage_customer_order_master_service_spares.variable.custom.selectedRecord.workflow_stage_no,
							fromStatus : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_status
						});
					manage_customer_order_master_service_spares.variable.custom.selectedWorkflowToStage = "";
					manage_customer_order_master_service_spares.variable.custom.selectedWorkflowToStatus = "";
					if (allowedWorkflowArray.length != 0) {
						manage_customer_order_master_service_spares.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
						manage_customer_order_master_service_spares.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_order_master_service_spares",
							fieldID : "manage_customer_order_master_service_spares_child_window",
							nextScreenID : "manage_customer_order_service_spares_wfeventverb_status_change",
							nextScreenName : manage_customer_order_master_service_spares.variable.custom.nextScreenName,
							execute : manage_customer_order_service_spares_wfeventverb_status_change.constructScreen
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
			$("#manage_customer_order_master_service_spares_contextMenu").data("kendoContextMenu").open(element);
			manage_customer_order_master_service_spares.variable.custom.contextChildElement = $('#manage_customer_order_master_service_spares_contextMenu').children();
			for (i = 0; i < manage_customer_order_master_service_spares.variable.custom.contextChildElement.length; i++){
				if (manage_customer_order_master_service_spares.variable.custom.contextChildElement[i].dataset.buttonGroup == 'workflow'){
					$('#' + screenID + '_'+ manage_customer_order_master_service_spares.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').hide();
				}
			}
			manage_customer_order_master_service_spares.variable.custom.selectedRecord = manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.getByUid(manage_customer_order_master_service_spares.variable.custom.grid_1.select().data("uid"));
			allowedWorkflowArray = mserviceUtilities.getAllowedWorkflowEventVerbs({
					transactionType : "CUSTOMERORDER",
					requestCategory : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_category,
					requestType : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_type,
					fromStage : manage_customer_order_master_service_spares.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_status
				});
			for (workFlowLength = 0; workFlowLength < allowedWorkflowArray.length; workFlowLength ++){
				currentFeature  = allowedWorkflowArray[workFlowLength].child_screen_id;
				for (i = 0; i < manage_customer_order_master_service_spares.variable.custom.contextChildElement.length; i++){
					if (manage_customer_order_master_service_spares.variable.custom.contextChildElement[i].dataset.buttonRole == currentFeature ){
						$('#' + screenID + '_'+ manage_customer_order_master_service_spares.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').show();
						break;
					}
				} 
			}
			$("#manage_customer_order_master_service_spares_contextMenu").show();
			var columnData = $.grep(manage_customer_order_master_service_spares.variable.custom.contextChildElement, function (data) {
				if($('#' + data.id ).is(':visible')){ $('#' + data.id ).css("display","inline-block").css("min-width","180px"); }
				return $('#' + data.id ).is(':visible');
			});
			var columnCount = parseInt(columnData.length / 6);
			if((columnData.length % 6) != 0){ 
				columnCount = columnCount + 1;
			}
			$("#manage_customer_order_master_service_spares_contextMenu").css("columns", columnCount.toString()).css("width", "min-content");
		},
		quotation_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_quotation_master_service_spares.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_quotation_master_service_spares";
				});
				manage_quotation_master_service_spares.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_customer_order_master_service_spares",
					nextScreenID : "manage_quotation_master_service_spares",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_customer_order_master_service_spares").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_customer_order_master_service_spares"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_quotation_master_service_spares"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_quotation_master_service_spares";
				webNavigationController.buildBreadCrumb();
				$("#manage_quotation_master_service_spares_quotation_number_filter").setVal($(element).text());
				manage_quotation_master_service_spares.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		salesinvoice_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_salesinvoice_master_spares.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_salesinvoice_master_spares";
				});
				manage_salesinvoice_master_spares.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_customer_order_master_service_spares",
					nextScreenID : "manage_salesinvoice_master_spares",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_customer_order_master_service_spares").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_customer_order_master_service_spares"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_salesinvoice_master_spares"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_salesinvoice_master_spares";
				webNavigationController.buildBreadCrumb();
				$("#manage_salesinvoice_master_spares_salesinvoice_number_filter").setVal($(element).text());
				manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_customer_order_master_service_spares_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_customer_order_master_service_spares_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_customer_order_master_service_spares_content_1").getInputparamXML({
				screenID : "manage_customer_order_master_service_spares",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_customer_order_master_service_spares.variable.custom.selectedRecord = manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.getByUid(manage_customer_order_master_service_spares.variable.custom.grid_1.select().data("uid"));
		},
	    getExportConfig : function (gridId) {
			if(gridId == "manage_customer_order_master_service_spares_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_customer_order_master_service_spares",
					service : "sp_retrieve_manage_customer_order_list",
					request : "<signature><i_inputparam_xml>" + manage_customer_order_master_service_spares.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_customer_order_master_service_spares.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_customer_order_master_service_spares_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_customer_order_master_service_spares_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			customer_order_generatePDF : "false"
		}
	}
};