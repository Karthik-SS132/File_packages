var manage_pwclaim_header = {
	constructScreen : function () {
		manage_pwclaim_header.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "mservice",
				serviceName : "retrieve_manage_pwclaim_list",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_pwclaim_header.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_pwclaim_header",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_pwclaim_header_filterArea = $("#manage_pwclaim_header_pane2");
		$("#manage_pwclaim_header_content_1 span dt").removeClass("term_one");
		$("#manage_pwclaim_header_content_1 span dt").removeClass("term_two");
		$("#manage_pwclaim_header_content_1 span dd.colen").html("");
		$("#manage_pwclaim_header_content_1").find('dt').css("width","120px");
		$("#manage_pwclaim_header_editor").append("<li id='manage_pwclaim_header_grid_pager'></li>");
		$("#manage_pwclaim_header_grid_pager").append($("#manage_pwclaim_header_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_pwclaim_header_grid_1").data("kendoGrid").bind("dataBound", manage_pwclaim_header.customRequirementHandler.gridPager);
		if(manage_pwclaim_header.variable.custom.autoLoadInd == "true") {
			manage_pwclaim_header.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_pwclaim_header_splitter[manage_pwclaim_header_filterArea.width() > 0 ? "collapse" : "expand"](manage_pwclaim_header_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_pwclaim_header_content_1",
					screenID : "manage_pwclaim_header",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_pwclaim_header_content_1",
				screenID : "manage_pwclaim_header",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_pwclaim_header.variable.custom.grid_1 = $("#manage_pwclaim_header_grid_1").initializeWGrid({
				screenID : "manage_pwclaim_header",
				dataSource : manage_pwclaim_header.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : false,
				pageable : false,
				toolbar : false
			});
		$("#manage_pwclaim_header_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_pwclaim_header_editor").kendoMenu();		
		manage_pwclaim_header_splitter = $("#manage_pwclaim_header_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_pwclaim_header.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_pwclaim_header.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_pwclaim_header.variable.custom.crudIndicator == "R") {
				manage_pwclaim_header.variable.custom.grid_1.dataSource._skip = 0;
				manage_pwclaim_header.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_pwclaim_detail.js", "../../s_iscripts/save_manage_pwclaim.js"])) {
					
					webNavigationController.gotoNextScreen({
						screenID : "manage_pwclaim_header",
						nextScreenID : "manage_pwclaim_detail",
						nextScreenName : manage_pwclaim_header.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_pwclaim_header.variable.custom.miscID == "filters"){
				manage_pwclaim_header_splitter[manage_pwclaim_header_filterArea.width() > 0 ? "collapse" : "expand"](manage_pwclaim_header_filterArea);
			}
			if(manage_pwclaim_header.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_pwclaim_header_content_1",
					screenID : "manage_pwclaim_header",
					matchCondition : ["_filter"]
				});
				$("#manage_pwclaim_header_filters_btn .k-i-filter").css("color","black");
			}
		},
		workflow_btn_click : function (element, event) {
			var allowedWorkflowArray;
			if (manage_pwclaim_header.variable.custom.grid_1.select().length != 0) {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_pwclaim_wfeventverb_status_change.js", "../../s_iscripts/update_pwclaim_wfeventverb_status_change.js"])) {
					allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
							transactionType : "PWCLAIM",
							eventVerb : manage_pwclaim_header.variable.custom.selectedWorkflowEventVerb,
							requestCategory : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_category,
							requestType : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_type,
							fromStage : manage_pwclaim_header.variable.custom.selectedRecord.workflow_stage_no,
							fromStatus : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_status,
							currentFeatureId: manage_pwclaim_header.variable.custom.selectedRecord.last_accessed_feature
						});
					manage_pwclaim_header.variable.custom.selectedWorkflowToStage = "";
					manage_pwclaim_header.variable.custom.selectedWorkflowToStatus = "";
					if (allowedWorkflowArray.length != 0) {
						manage_pwclaim_header.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
						manage_pwclaim_header.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
						webNavigationController.gotoNextScreen({
							screenID : "manage_pwclaim_header",
							fieldID : "manage_pwclaim_header_child_window",
							nextScreenID : "manage_pwclaim_wfeventverb_status_change",
							nextScreenName : manage_pwclaim_header.variable.custom.nextScreenName,
							execute : manage_pwclaim_wfeventverb_status_change.constructScreen
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
		},
		feature_btn_click : function (element, event) {
			if (manage_pwclaim_header.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_pwclaim_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
						manage_user_attachments.variable.standard.configurationParam = "PWCLAIM";
						manage_user_attachments.variable.custom.project_task_level_ind = "R";
						manage_user_attachments.variable.custom.project_id = manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no;
						manage_user_attachments.variable.custom.template_id = "";
						manage_user_attachments.variable.custom.task_id = "0";
						manage_user_attachments.variable.custom.project_status_defaultValue = mserviceUtilities.getDescriptionForCode("PWCLAIMSTATUS_LIST", manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_status, "");
						webNavigationController.gotoNextScreen({
							screenID : "manage_pwclaim_header",
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
			} else if (manage_pwclaim_header.variable.custom.selectedFeatureID == "manage_pwclaim_event_log") {
				if (manage_pwclaim_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_pwclaim_event_log.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_pwclaim_header",
							nextScreenID : "manage_pwclaim_event_log",
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
			} else if (manage_pwclaim_header.variable.custom.selectedFeatureID == "generate_pwclaim_pdf") {
				if (manage_pwclaim_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_pwclaim_pdf.js"])) {
						if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_pwclaim_pdf_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
						mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_pwclaim_pdf_" + login_profile.country_code + ".js"]);
					};
						webNavigationController.gotoNextScreen({
							screenID : "manage_pwclaim_header",
							fieldID : "manage_pwclaim_header_child_window",
							nextScreenID : "generate_pwclaim_pdf",
							nextScreenName : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no,
							windowHeight : 620,
							windowWidth : 600,
							execute : generate_pwclaim_pdf.constructScreen
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_pwclaim_header.variable.custom.selectedFeatureID == "generate_expense_document") {
				if (manage_pwclaim_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/generate_expense_document.js"])) {
						if (confirm("Are you sure do you want to generate expense document for this document ?")) {
							var returnValue;
							returnValue = executeService_generate_expense_document({
									p_call_jo_project_ind : "P",
									p_call_jo_project_ref_no : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no
								});
							if (returnValue.update_status == "SP001") {
								alert("Expense Document generated successfully. Your Expense Document reference number is " + returnValue.expense_doc_ref_no);
								manage_pwclaim_header.variable.custom.grid_1.dataSource.pageSize(50);
								return true;
							} else {
								alert("Generation of Expense Document failed.");
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
			} else if (manage_pwclaim_header.variable.custom.selectedFeatureID == "generate_parts_order_document") {
				if (manage_pwclaim_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/partsorder_generatePartsOrder.js"])) {
						if (confirm("Are you sure do you want to generate parts order document for this document ?")) {
							var returnValue;
							returnValue = salesinvoice_partsorder_generatePartsOrder.invokeAPI({
									p_parts_order_reason_code : "PWC",
									p_parts_order_reason_ref_no : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no
								});
							if (returnValue.update_status == "SP001") {
								alert("Parts Order Document generated successfully. Your Parts Order Document reference number is " + returnValue.parts_order_no);
								manage_pwclaim_header.variable.custom.grid_1.dataSource.pageSize(50);
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
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_pwclaim_header_contextMenu").data("kendoContextMenu").open(element);
			manage_pwclaim_header.variable.custom.contextChildElement = $('#manage_pwclaim_header_contextMenu').children();
			for (i = 0; i < manage_pwclaim_header.variable.custom.contextChildElement.length; i++){
				if (manage_pwclaim_header.variable.custom.contextChildElement[i].dataset.buttonGroup == 'workflow'){
					$('#' + screenID + '_'+ manage_pwclaim_header.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').hide();
				}
			}
			manage_pwclaim_header.variable.custom.selectedRecord = manage_pwclaim_header.variable.custom.grid_1.dataSource.getByUid(manage_pwclaim_header.variable.custom.grid_1.select().data("uid"));
			allowedWorkflowArray = mserviceUtilities.getAllowedWorkflowEventVerbs({
					transactionType : "PWCLAIM",
					requestCategory : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_category,
					requestType : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_type,
					fromStage : manage_pwclaim_header.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_status,
					currentFeatureId: manage_pwclaim_header.variable.custom.selectedRecord.last_accessed_feature
				});
				
			for (workFlowLength = 0; workFlowLength < allowedWorkflowArray.length; workFlowLength ++){
				currentFeature  = allowedWorkflowArray[workFlowLength].child_screen_id;
				for (i = 0; i < manage_pwclaim_header.variable.custom.contextChildElement.length; i++){
					if (manage_pwclaim_header.variable.custom.contextChildElement[i].dataset.buttonRole == currentFeature ){
						$('#' + screenID + '_'+ manage_pwclaim_header.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').show();
						break;
					}
				} 
			}
			$("#manage_pwclaim_header_contextMenu").show();
			var columnData = $.grep(manage_pwclaim_header.variable.custom.contextChildElement, function (data) {
				if($('#' + data.id ).is(':visible')){ $('#' + data.id ).css("display","inline-block").css("min-width","180px"); }
				return $('#' + data.id ).is(':visible');
			});
			var columnCount = parseInt(columnData.length / 6);
			if((columnData.length % 6) != 0){ 
				columnCount = columnCount + 1;
			}
			$("#manage_pwclaim_header_contextMenu").css("columns", columnCount.toString()).css("width", "min-content");
		},
		se_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_se.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_call_register_se";
				});
				manage_call_register_se.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_pwclaim_header",
					nextScreenID : "manage_call_register_se",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_pwclaim_header").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_pwclaim_header"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_call_register_se"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_call_register_se";
				webNavigationController.buildBreadCrumb();
				$("#manage_call_register_se_call_number_filter").setVal($(element).text());
				manage_call_register_se.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_pwclaim_header_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_pwclaim_header_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_pwclaim_header_content_1").getInputparamXML({
				screenID : "manage_pwclaim_header",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_pwclaim_header.variable.custom.selectedRecord = manage_pwclaim_header.variable.custom.grid_1.dataSource.getByUid(manage_pwclaim_header.variable.custom.grid_1.select().data("uid"));
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_pwclaim_header_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_pwclaim_header",
					service : "sp_retrieve_manage_pwclaim_list",
					request : "<signature><i_inputparam_xml>" + manage_pwclaim_header.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_pwclaim_header.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_pwclaim_header.variable.custom.grid_1.dataSource.data().length
				};
			}
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}
			],
			importConfiguration : {
				imformationType : 'pwclaim_header'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_pwclaim_header_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_pwclaim_header_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			pwclaim_generatePDF : "false"
			
		}

	}
};