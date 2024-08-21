var manage_parts_order = {
	constructScreen : function () {
		manage_parts_order.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "salesinvoice",
			serviceName : "retrieve_manage_parts_order_list",
			outputPath : "context/outputparam_detail",
			pageSize : 50,
			inputParameter : {
				p_inputparam_xml : "manage_parts_order.customRequirementHandler.getFilterValues()"
			},
			schemaModel : true,
			screenID : "manage_parts_order",
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		manage_parts_order_filterArea = $("#manage_parts_order_pane2");
		$("#manage_parts_order_content_1 span dt").removeClass("term_one");
		$("#manage_parts_order_content_1 span dt").removeClass("term_two");
		$("#manage_parts_order_content_1 span dd.colen").html("");
		$("#manage_parts_order_content_1").find('dt').css("width","120px");
		$("#manage_parts_order_editor").append("<li id='manage_parts_order_grid_pager'></li>");
		$("#manage_parts_order_grid_pager").append($("#manage_parts_order_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_parts_order_grid_1").data("kendoGrid").bind("dataBound", manage_parts_order.customRequirementHandler.gridPager);
		if(manage_parts_order.variable.custom.autoLoadInd == "true") {
			manage_parts_order.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_parts_order_splitter[manage_parts_order_filterArea.width() > 0 ? "collapse" : "expand"](manage_parts_order_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_parts_order_content_1",
					screenID : "manage_parts_order",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_parts_order_content_1",
				screenID : "manage_parts_order",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_parts_order.variable.custom.grid_1 = $("#manage_parts_order_grid_1").initializeWGrid({
				screenID : "manage_parts_order",
				dataSource : manage_parts_order.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
	   $("#manage_parts_order_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_parts_order_editor").kendoMenu();		
		manage_parts_order_splitter = $("#manage_parts_order_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_parts_order.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_parts_order.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_parts_order.variable.custom.crudIndicator == "R") {
				manage_parts_order.variable.custom.grid_1.dataSource._skip = 0;
				manage_parts_order.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_parts_order_edit.js","../../s_iscripts/partsorder_setDetail.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_parts_order",
						nextScreenID : "manage_parts_order_edit",
						nextScreenName : manage_parts_order.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_parts_order.variable.custom.miscID == "filters"){
				manage_parts_order_splitter[manage_parts_order_filterArea.width() > 0 ? "collapse" : "expand"](manage_parts_order_filterArea);
			}
			if(manage_parts_order.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_parts_order_content_1",
					screenID : "manage_parts_order",
					matchCondition : ["_filter"]
				});
				$("#manage_parts_order_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_parts_order.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_parts_order.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
						manage_user_attachments.variable.standard.configurationParam = "PARTSORDER";
						manage_user_attachments.variable.custom.project_task_level_ind = "D";
						manage_user_attachments.variable.custom.project_id = manage_parts_order.variable.custom.selectedRecord.parts_order_no;
						manage_user_attachments.variable.custom.template_id = manage_parts_order.variable.custom.selectedRecord.parts_order_no.substring(20);
						manage_user_attachments.variable.custom.task_id = "0";
						manage_user_attachments.variable.custom.project_status_defaultValue = manage_parts_order.variable.custom.selectedRecord.parts_order_status_desc;
						webNavigationController.gotoNextScreen({
							screenID : "manage_parts_order",
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
			} else if (manage_parts_order.variable.custom.selectedFeatureID == "generate_parts_order_pdf") {
				if (manage_parts_order.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_parts_order_pdf.js"])) {
						if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_parts_order_pdf_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
							mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_parts_order_pdf_" + login_profile.country_code + ".js"]);
						};
						webNavigationController.gotoNextScreen({
							screenID : "manage_parts_order",
							fieldID : "manage_parts_order_child_window",
							nextScreenID : "generate_parts_order_pdf",
							nextScreenName : manage_parts_order.variable.custom.selectedRecord.parts_order_no,
							windowHeight : 620,
							windowWidth : 600,
							execute : generate_parts_order_pdf.constructScreen
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
			if (manage_parts_order.variable.custom.grid_1.select().length != 0) {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_parts_order_wfeventverb_status_change.js", "../../s_iscripts/update_parts_order_wfeventverb_status_change.js"])){
					allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
							transactionType : "PARTSORDER",
							eventVerb : manage_parts_order.variable.custom.selectedWorkflowEventVerb,
							requestCategory : manage_parts_order.variable.custom.selectedRecord.parts_order_category,
							requestType : manage_parts_order.variable.custom.selectedRecord.parts_order_type,
							fromStage : manage_parts_order.variable.custom.selectedRecord.workflow_stage_no,
							fromStatus : manage_parts_order.variable.custom.selectedRecord.parts_order_status
						});
					manage_parts_order.variable.custom.selectedWorkflowToStage = "";
					manage_parts_order.variable.custom.selectedWorkflowToStatus = "";
					if (allowedWorkflowArray.length != 0) {
						manage_parts_order.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
						manage_parts_order.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
						webNavigationController.gotoNextScreen({
							screenID : "manage_parts_order",
							fieldID : "manage_parts_order_child_window",
							nextScreenID : "manage_parts_order_wfeventverb_status_change",
							nextScreenName : manage_parts_order.variable.custom.nextScreenName,
							execute : manage_parts_order_wfeventverb_status_change.constructScreen
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
			$("#manage_parts_order_contextMenu").data("kendoContextMenu").open(element);
			manage_parts_order.variable.custom.contextChildElement = $('#manage_parts_order_contextMenu').children();
			for (i = 0; i < manage_parts_order.variable.custom.contextChildElement.length; i++){
				if (manage_parts_order.variable.custom.contextChildElement[i].dataset.buttonGroup == 'workflow'){
					$('#' + screenID + '_'+ manage_parts_order.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').hide();
				}
			}
			manage_parts_order.variable.custom.selectedRecord = manage_parts_order.variable.custom.grid_1.dataSource.getByUid(manage_parts_order.variable.custom.grid_1.select().data("uid"));
			allowedWorkflowArray = mserviceUtilities.getAllowedWorkflowEventVerbs({
					transactionType : "PARTSORDER",
					requestCategory : manage_parts_order.variable.custom.selectedRecord.parts_order_category,
					requestType : manage_parts_order.variable.custom.selectedRecord.parts_order_type,
					fromStage : manage_parts_order.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_parts_order.variable.custom.selectedRecord.parts_order_status
				});
			for (workFlowLength = 0; workFlowLength < allowedWorkflowArray.length; workFlowLength ++){
				currentFeature  = allowedWorkflowArray[workFlowLength].child_screen_id;
				for (i = 0; i < manage_parts_order.variable.custom.contextChildElement.length; i++){
					if (manage_parts_order.variable.custom.contextChildElement[i].dataset.buttonRole == currentFeature ){
						$('#' + screenID + '_'+ manage_parts_order.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').show();
						break;
					}
				} 
			}
			$("#manage_parts_order_contextMenu").show();
			var columnData = $.grep(manage_parts_order.variable.custom.contextChildElement, function (data) {
				if($('#' + data.id ).is(':visible')){ $('#' + data.id ).css("display","inline-block").css("min-width","180px"); }
				return $('#' + data.id ).is(':visible');
			});
			var columnCount = parseInt(columnData.length / 6);
			if((columnData.length % 6) != 0){ 
				columnCount = columnCount + 1;
			}
			$("#manage_parts_order_contextMenu").css("columns", columnCount.toString()).css("width", "min-content");
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_parts_order_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_parts_order_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_parts_order_content_1").getInputparamXML({
				screenID : "manage_parts_order",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_parts_order.variable.custom.selectedRecord = manage_parts_order.variable.custom.grid_1.dataSource.getByUid(manage_parts_order.variable.custom.grid_1.select().data("uid"));
		},
	    getExportConfig : function (gridId) {
			if(gridId == "manage_parts_order_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_parts_order",
					service : "sp_retrieve_manage_parts_order_list",
					request : "<signature><i_inputparam_xml>" + manage_parts_order.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_parts_order.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_parts_order_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_parts_order_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			parts_order_generatePDF : "false"
		}
	}
};