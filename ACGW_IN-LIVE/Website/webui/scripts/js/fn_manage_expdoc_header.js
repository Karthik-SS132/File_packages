var manage_expdoc_header = {
	constructScreen : function () {
		manage_expdoc_header.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_expense_document_list",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_expdoc_header.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_expdoc_header",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_expdoc_header_filterArea = $("#manage_expdoc_header_pane2");
		$("#manage_expdoc_header_content_1 span dt").removeClass("term_one");
		$("#manage_expdoc_header_content_1 span dt").removeClass("term_two");
		$("#manage_expdoc_header_content_1 span dd.colen").html("");
		$("#manage_expdoc_header_content_1").find('dt').css("width","120px");
		$("#manage_expdoc_header_editor").append("<li id='manage_expdoc_header_grid_pager'></li>");
		$("#manage_expdoc_header_grid_pager").append($("#manage_expdoc_header_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_expdoc_header_grid_1").data("kendoGrid").bind("dataBound", manage_expdoc_header.customRequirementHandler.gridPager);
		if(manage_expdoc_header.variable.custom.autoLoadInd == "true") {
			manage_expdoc_header.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_expdoc_header_splitter[manage_expdoc_header_filterArea.width() > 0 ? "collapse" : "expand"](manage_expdoc_header_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_expdoc_header_content_1",
					screenID : "manage_expdoc_header",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_expdoc_header_content_1",
				screenID : "manage_expdoc_header",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_expdoc_header.variable.custom.grid_1 = $("#manage_expdoc_header_grid_1").initializeWGrid({
				screenID : "manage_expdoc_header",
				dataSource : manage_expdoc_header.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_expdoc_header_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_expdoc_header_editor").kendoMenu();		
		manage_expdoc_header_splitter = $("#manage_expdoc_header_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_expdoc_header.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_expdoc_header.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_expdoc_header.variable.custom.crudIndicator == "R") {
				manage_expdoc_header.variable.custom.grid_1.dataSource._skip = 0;
				manage_expdoc_header.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_expdoc_detail.js", "../../s_iscripts/save_manage_expense_document.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_expdoc_header",
						nextScreenID : "manage_expdoc_detail",
						nextScreenName : manage_expdoc_header.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_expdoc_header.variable.custom.miscID == "filters"){
				manage_expdoc_header_splitter[manage_expdoc_header_filterArea.width() > 0 ? "collapse" : "expand"](manage_expdoc_header_filterArea);
			}
			if(manage_expdoc_header.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_expdoc_header_content_1",
					screenID : "manage_expdoc_header",
					matchCondition : ["_filter"]
				});
				$("#manage_expdoc_header_filters_btn .k-i-filter").css("color","black");
			}
		},
		workflow_btn_click : function (element, event) {
			var allowedWorkflowArray;
			if (manage_expdoc_header.variable.custom.grid_1.select().length != 0) {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_expdoc_wfeventverb_status_change.js", "../../s_iscripts/update_expdoc_wfeventverb_status_change.js"])) {
					allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
							transactionType : "EXPENSE",
							eventVerb : manage_expdoc_header.variable.custom.selectedWorkflowEventVerb,
							requestCategory : manage_expdoc_header.variable.custom.selectedRecord.expdoc_category,
							requestType : manage_expdoc_header.variable.custom.selectedRecord.expdoc_type,
							fromStage : manage_expdoc_header.variable.custom.selectedRecord.workflow_stage_no,
							fromStatus : manage_expdoc_header.variable.custom.selectedRecord.expdoc_status
						});
					manage_expdoc_header.variable.custom.selectedWorkflowToStage = "";
					manage_expdoc_header.variable.custom.selectedWorkflowToStatus = "";
					if (allowedWorkflowArray.length != 0) {
						manage_expdoc_header.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
						manage_expdoc_header.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
						webNavigationController.gotoNextScreen({
							screenID : "manage_expdoc_header",
							fieldID : "manage_expdoc_header_child_window",
							nextScreenID : "manage_expdoc_wfeventverb_status_change",
							nextScreenName : manage_expdoc_header.variable.custom.nextScreenName,
							execute : manage_expdoc_wfeventverb_status_change.constructScreen
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
			if (manage_expdoc_header.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_expdoc_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
						manage_user_attachments.variable.standard.configurationParam = "EXPENSE";
						manage_user_attachments.variable.custom.project_task_level_ind = "E";
						manage_user_attachments.variable.custom.project_id = manage_expdoc_header.variable.custom.selectedRecord.expdoc_ref_no;
						manage_user_attachments.variable.custom.template_id = "";
						manage_user_attachments.variable.custom.task_id = "0";
						manage_user_attachments.variable.custom.project_status_defaultValue = mserviceUtilities.getDescriptionForCode("EXPENSESTATUS_DESC", manage_expdoc_header.variable.custom.selectedRecord.expdoc_status, "");
						webNavigationController.gotoNextScreen({
							screenID : "manage_expdoc_header",
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
			} else if (manage_expdoc_header.variable.custom.selectedFeatureID == "manage_expdoc_event_log") {
				if (manage_expdoc_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_expdoc_event_log.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_expdoc_header",
							nextScreenID : "manage_expdoc_event_log",
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
			} else if (manage_expdoc_header.variable.custom.selectedFeatureID == "generate_invoice") {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_invoice.js", "../../s_iscripts/generate_invoice.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_expdoc_header",
						fieldID : "manage_expdoc_header_child_window",
						nextScreenID : "generate_invoice",
						nextScreenName : "Generate Invoice",
						execute : generate_invoice.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact support desk.");
					return false;
				}
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_expdoc_header_contextMenu").data("kendoContextMenu").open(element);
			manage_expdoc_header.variable.custom.contextChildElement = $('#manage_expdoc_header_contextMenu').children();
			for (i = 0; i < manage_expdoc_header.variable.custom.contextChildElement.length; i++){
				if (manage_expdoc_header.variable.custom.contextChildElement[i].dataset.buttonGroup == 'workflow'){
					$('#' + screenID + '_'+ manage_expdoc_header.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').hide();
				}
			}
			manage_expdoc_header.variable.custom.selectedRecord = manage_expdoc_header.variable.custom.grid_1.dataSource.getByUid(manage_expdoc_header.variable.custom.grid_1.select().data("uid"));
			allowedWorkflowArray = mserviceUtilities.getAllowedWorkflowEventVerbs({
					transactionType : "EXPENSE",
					requestCategory : manage_expdoc_header.variable.custom.selectedRecord.expdoc_category,
					requestType : manage_expdoc_header.variable.custom.selectedRecord.expdoc_type,
					fromStage : manage_expdoc_header.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_expdoc_header.variable.custom.selectedRecord.expdoc_status
				});
			for (workFlowLength = 0; workFlowLength < allowedWorkflowArray.length; workFlowLength ++){
				currentFeature  = allowedWorkflowArray[workFlowLength].child_screen_id;
				for (i = 0; i < manage_expdoc_header.variable.custom.contextChildElement.length; i++){
					if (manage_expdoc_header.variable.custom.contextChildElement[i].dataset.buttonRole == currentFeature ){
						$('#' + screenID + '_'+ manage_expdoc_header.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').show();
						break;
					}
				} 
			}
			$("#manage_expdoc_header_contextMenu").show();
			var columnData = $.grep(manage_expdoc_header.variable.custom.contextChildElement, function (data) {
				if($('#' + data.id ).is(':visible')){ $('#' + data.id ).css("display","inline-block").css("min-width","180px"); }
				return $('#' + data.id ).is(':visible');
			});
			var columnCount = parseInt(columnData.length / 6);
			if((columnData.length % 6) != 0){ 
				columnCount = columnCount + 1;
			}
			$("#manage_expdoc_header_contextMenu").css("columns", columnCount.toString()).css("width", "min-content");
		},
		call_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_se.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_call_register_se";
				});
				manage_call_register_se.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_expdoc_header",
					nextScreenID : "manage_call_register_se",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_expdoc_header").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_expdoc_header"){
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
		},
		invoice_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_invoice_header.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_invoice_header";
				});
				manage_invoice_header.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_expdoc_header",
					nextScreenID : "manage_invoice_header",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_expdoc_header").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_expdoc_header"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_invoice_header"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_invoice_header";
				webNavigationController.buildBreadCrumb();
				$("#manage_invoice_header_invoice_number_filter").setVal($(element).text());
				manage_invoice_header.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		pwclaim_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_pwclaim_header.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_pwclaim_header";
				});
				manage_pwclaim_header.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_expdoc_header",
					nextScreenID : "manage_pwclaim_header",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_expdoc_header").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_expdoc_header"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_pwclaim_header"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_pwclaim_header";
				webNavigationController.buildBreadCrumb();
				$("#manage_pwclaim_header_pwclaim_number_filter").setVal($(element).text());
				manage_pwclaim_header.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_expdoc_header_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_expdoc_header_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_expdoc_header_content_1").getInputparamXML({
				screenID : "manage_expdoc_header",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_expdoc_header.variable.custom.selectedRecord = manage_expdoc_header.variable.custom.grid_1.dataSource.getByUid(manage_expdoc_header.variable.custom.grid_1.select().data("uid"));
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_expdoc_header_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_expdoc_header",
					service : "sp_retrieve_manage_expense_document_list",
					request : "<signature><i_inputparam_xml>" + manage_expdoc_header.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_expdoc_header.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_expdoc_header.variable.custom.grid_1.dataSource.data().length
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
			importConfiguration : {
				imformationType : 'expdoc_header'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_expdoc_header_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_expdoc_header_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {}
	}
};