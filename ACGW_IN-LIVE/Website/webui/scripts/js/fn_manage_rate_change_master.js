var manage_rate_change_master = {
	constructScreen : function () {
		manage_rate_change_master.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_custom_info_list",
			outputPath : "outputparam_detail",
			api : true,
			pageSize : 50,
			inputParameter : {
				p_custom_info_code : "'item_rate_change'",
				p_inputparam_xml : "manage_rate_change_master.customRequirementHandler.getFilterValues()"
			},
			screenID : "manage_rate_change_master",
			schemaModel : true,
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		manage_rate_change_master_filterArea = $("#manage_rate_change_master_pane2");
		$("#manage_rate_change_master_content_1 span dt").removeClass("term_one");
		$("#manage_rate_change_master_content_1 span dt").removeClass("term_two");
		$("#manage_rate_change_master_content_1 span dd.colen").html("");
		$("#manage_rate_change_master_content_1").find('dt').css("width","120px");
		$("#manage_rate_change_master_editor").append("<li id='manage_rate_change_master_grid_pager'></li>");
		$("#manage_rate_change_master_grid_pager").append($("#manage_rate_change_master_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_rate_change_master_grid_1").data("kendoGrid").bind("dataBound", manage_rate_change_master.customRequirementHandler.gridPager);
		if(manage_rate_change_master.variable.custom.autoLoadInd == "true") {
			manage_rate_change_master.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_rate_change_master_splitter[manage_rate_change_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_rate_change_master_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_rate_change_master_content_1",
					screenID : "manage_rate_change_master",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_rate_change_master_content_1",
				screenID : "manage_rate_change_master",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_rate_change_master.variable.custom.grid_1 = $("#manage_rate_change_master_grid_1").initializeWGrid({
			screenID : "manage_rate_change_master",
			dataSource : manage_rate_change_master.variable.custom.datasource_1,
			height : 500,
			pageSize : 50,
			filterable : false,
			sortable : true,
			pageable : false,
			toolbar : false
		});
		$("#manage_rate_change_master_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_rate_change_master_editor").kendoMenu();		
		manage_rate_change_master_splitter = $("#manage_rate_change_master_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_rate_change_master.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_rate_change_master.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_rate_change_master.variable.custom.crudIndicator == "R") {
				manage_rate_change_master.variable.custom.grid_1.dataSource._skip = 0;
				manage_rate_change_master.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_rate_change_master_edit.js","../../s_iscripts/custominfo_setDetail.js"])) {
					if(manage_rate_change_master.variable.custom.crudIndicator == "A"){
						manage_rate_change_master.variable.custom.nextScreenName = "Add";
						manage_rate_change_master.variable.custom.selectedRecord = "";
					};
					webNavigationController.gotoNextScreen({
						screenID : "manage_rate_change_master",
						fieldID : "manage_rate_change_master_child_window",
						nextScreenID : "manage_rate_change_master_edit",
						nextScreenName : manage_rate_change_master.variable.custom.nextScreenName,
						windowWidth : 780,
						execute : manage_rate_change_master_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click  : function (element, event) {
			if(manage_rate_change_master.variable.custom.miscID == "filters"){
				manage_rate_change_master_splitter[manage_rate_change_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_rate_change_master_filterArea);
			}
			if(manage_rate_change_master.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_rate_change_master_content_1",
					screenID : "manage_rate_change_master",
					matchCondition : ["_filter"]
				});
				$("#manage_rate_change_master_filters_btn .k-i-filter").css("color","black");
			}
			if(manage_rate_change_master.variable.custom.miscID == "excel_import"){
				if (mserviceUtilities.loadJSScripts(["../../s_iscripts/custominfo_setDetail.js"])) {
					$("#manage_rate_change_master_grid_1").append("<div id = 'manage_rate_change_master_excel_import_window'><div id = 'manage_rate_change_master_excel_import_spreadsheet' style='width: 100%; height: 90%;' ></div></hr><center><button style='margin-top: 2%;' id='manage_rate_change_master_excel_import_submit' class='k-button'>Submit</button></center></div>");
					$("#manage_rate_change_master_excel_import_window").kendoWindow({
						width : (screen.width * 0.60),
						height : (screen.height * 0.65),
						title : "Excel Import",
						visible : false,
						modal : true,
						deactivate : function () {
							this.destroy();
						},
					});
					$("#manage_rate_change_master_excel_import_spreadsheet").kendoSpreadsheet({
						columns: manage_rate_change_master.customRequirementHandler.getSpreadsheetColumns().length,
						rows : 10000,
						sheetsbar: false,
						sheets: [{
							columns: manage_rate_change_master.customRequirementHandler.getSpreadsheetColumns(),
							rows: [{
								cells: manage_rate_change_master.customRequirementHandler.getSpreadsheetRows()
							}]
						}]
					});
					$("#manage_rate_change_master_excel_import_window").data("kendoWindow").center().open();
					$("#manage_rate_change_master_excel_import_spreadsheet .k-tabstrip-wrapper").hide();
					$("#manage_rate_change_master_excel_import_spreadsheet .k-spreadsheet-action-bar").hide();
					for(var i=0; i < manage_rate_change_master.customRequirementHandler.getSpreadsheetRows().length; i++){
						if(manage_rate_change_master.customRequirementHandler.getSpreadsheetRows()[i].format !== "undefined"){
							$("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(1,i,1000,0).format(manage_rate_change_master.customRequirementHandler.getSpreadsheetRows()[i].format);
						}
					}
					$("#manage_rate_change_master_excel_import_submit").click(function(){
						var spreadsheetData = $("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().toJSON().rows;
						for(var i=0; i < spreadsheetData.length; i++){
							for(var j=0; j <spreadsheetData[i].cells.length; j++){
								if(spreadsheetData[i].cells[j].value != undefined){
									spreadsheetData[i].valid = true;
								}
							}
						};
						var spreadsheetDatasource = $.grep(spreadsheetData,function(data,index){
							return data.valid;
						});
						if(spreadsheetDatasource.length != 1){
							var inputparamXML = "<inputparam><search_field_xml>";
							for(var i=1; i < spreadsheetDatasource.length; i++){
								inputparamXML += "<data><record_index>" + spreadsheetDatasource[i].index + "</record_index>";
								for(var j=0; j < manage_rate_change_master.customRequirementHandler.getSpreadsheetRows().length; j++){
									if(spreadsheetDatasource[i].cells[j] == undefined || spreadsheetDatasource[i].cells[j].value == undefined){
										inputparamXML += "<" + manage_rate_change_master.customRequirementHandler.getSpreadsheetRows()[j].id + ">" + '' + "</" + manage_rate_change_master.customRequirementHandler.getSpreadsheetRows()[j].id + ">"
									} else {
										inputparamXML += "<" + manage_rate_change_master.customRequirementHandler.getSpreadsheetRows()[j].id + ">" + spreadsheetDatasource[i].cells[j].value + "</" + manage_rate_change_master.customRequirementHandler.getSpreadsheetRows()[j].id + ">"
									}
								}
								inputparamXML += "</data>";
							}
							inputparamXML += "</search_field_xml></inputparam>";
							manage_rate_change_master.variable.custom.validationData = mserviceUtilities.getTransportPagingDataSource({
								applicationName : "common_modules",
								serviceName : "retrieve_manage_custom_info_list",
								outputPath : "outputparam_detail",
								api : true,
								pageSize : 50,
								inputParameter : {
									p_custom_info_code : "'item_rate_change_import'",
									p_inputparam_xml : inputparamXML.replace(/\n|\r/g, "")
								},
								screenID : "manage_rate_change_master"
							});
							manage_rate_change_master.variable.custom.validationData.read();
							if(manage_rate_change_master.variable.custom.validationData.data().length != 0){
								var invalidData = $.grep(manage_rate_change_master.variable.custom.validationData.data(),function(data){
									return data.valid_ind == "0"
								});
								var overallData = manage_rate_change_master.variable.custom.validationData.data();
								for(var index=0; index < overallData.length; index++){
									$("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index),0,1,$("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background ("white");
									$("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index),0,1,$("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).validation(null);
								}
								if(invalidData.length != 0){
									for(var counter=0; counter < invalidData.length; counter++){
										$("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index),0,1,$("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background ("yellow");
										$("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index),0,1,$("#manage_rate_change_master_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).validation({
											dataType: "custom",
											from: "AND(LEN(A" + ( parseInt(invalidData[counter].record_index) + 1 ) + ")<0)",
											messageTemplate: invalidData[counter].err_message
										});
									}
									alert("The rows highlighted in the excel are not valid record. Please remove or correct it.");
								} else {								
									var spreadsheetArray = manage_rate_change_master.variable.custom.validationData.data();
									
									for(var index=0; index < spreadsheetArray.length; index++){
									
										returnValue = common_modules_custominfo_setDetail.invokeAPI({
											p_custom_info_code : "item_rate_change",
											p_custom_info_ref_no1: "",
											p_custom_info_ref_no2: "",
											p_inputparam_header_xml : "<inputparam><rate_change_name>ITEMRATE</rate_change_name><rate_change_id></rate_change_id><by_code_1>" + spreadsheetArray[index].by_code_1 +"</by_code_1><by_code_2>" + spreadsheetArray[index].by_code_2 +"</by_code_2><by_code_3>" + spreadsheetArray[index].by_code_3 +"</by_code_3><by_code_4>" + login_profile.currency_code +"</by_code_4><by_code_5>NA</by_code_5><rate_change_on_field>" + spreadsheetArray[index].rate_change_on_field +"</rate_change_on_field><amt_or_perc_ind>" + spreadsheetArray[index].amt_or_perc_ind +"</amt_or_perc_ind><amt_or_perc>" + spreadsheetArray[index].amt_or_perc +"</amt_or_perc><effective_from_date>" + spreadsheetArray[index].effective_from_date +"</effective_from_date><effective_from_date_hour>00</effective_from_date_hour><effective_from_date_minute>00</effective_from_date_minute><effective_to_date></effective_to_date><effective_to_date_hour>00</effective_to_date_hour><effective_to_date_minute>00</effective_to_date_minute></inputparam>",
											p_rec_timestamp : "00000000-0000-0000-0000-000000000000",
											p_save_mode : "A",
											inputparam_detail : []
										});
										if (returnValue.update_status != "SP001") {
											//alert("Saving Item rate Change Failed.");
											return false;
										}
										
									}
									
									$("#manage_rate_change_master_excel_import_window").data("kendoWindow").close();
									manage_rate_change_master.refreshScreen();
								}
							} else {
								alert("Please Contact your support desk.");
							}
						} else {
							alert("No record to perform Import.");
						}
					});	
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_rate_change_master_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_rate_change_master_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_rate_change_master_content_1").getInputparamXML({
				screenID : "manage_rate_change_master",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_rate_change_master.variable.custom.selectedRecord = manage_rate_change_master.variable.custom.grid_1.dataSource.getByUid(manage_rate_change_master.variable.custom.grid_1.select().data("uid"));
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_rate_change_master_grid_1_export_btn"){
				return {
					type : "csv",
					template : $("#manage_rate_change_master_report_code").getVal(),
					service : "sp_report_information_for_custom_report_builder",
					request : "<signature><i_inputparam_xml>" + manage_rate_change_master.customRequirementHandler.getFilterValues() + "</i_inputparam_xml><i_report_code>" + $("#manage_rate_change_master_report_code").getVal() + "</i_report_code><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_rate_change_master.variable.custom.grid_1.dataSource.data().length
				};
			}
		},
		getSpreadsheetRows : function () {
			var currentConfig,
			configurationParamNode,
			spreadsheetNode,
			rowNodes,
			fieldNodes,
			cellArray = [];
			currentConfig = webConfigurationEngine.getUiConfigurationObject("manage_rate_change_master");
			if (currentConfig != undefined) {
				configurationParamNode = currentConfig.configuration.getElementsByTagName("ui_configuration")[0];
				if (configurationParamNode != undefined) {
					spreadsheetNode = configurationParamNode.getElementsByTagName("spreadsheet")[0];
					if (spreadsheetNode != undefined) {
						rowNodes = spreadsheetNode.getElementsByTagName("rows")[0];
						if (rowNodes != undefined) {
							fieldNodes = rowNodes.getElementsByTagName("field");
							if (fieldNodes != undefined) {
								for(index=0; index < fieldNodes.length; index++){
									var rowObject = {};
									var attribute = fieldNodes.item(index);
									for (var counter = 0; counter < attribute.childElementCount; counter++) {
										if(attribute.childNodes[counter].nodeName == "enable"){
											rowObject[attribute.childNodes[counter].nodeName] = eval(attribute.childNodes[counter].childNodes[0].nodeValue);
										} else {
											rowObject[attribute.childNodes[counter].nodeName] = attribute.childNodes[counter].childNodes[0].nodeValue;
										}
									}
									cellArray.push(rowObject);
								}
							}
						}
					}
				}
			}
			return cellArray;
		},
		getSpreadsheetColumns : function () {
			var currentConfig,
			configurationParamNode,
			spreadsheetNode,
			columnNodes,
			fieldNodes,
			columnArray = [];
			currentConfig = webConfigurationEngine.getUiConfigurationObject("manage_rate_change_master");
			if (currentConfig != undefined) {
				configurationParamNode = currentConfig.configuration.getElementsByTagName("ui_configuration")[0];
				if (configurationParamNode != undefined) {
					spreadsheetNode = configurationParamNode.getElementsByTagName("spreadsheet")[0];
					if (spreadsheetNode != undefined) {
						columnNodes = spreadsheetNode.getElementsByTagName("columns")[0];
						if (columnNodes != undefined) {
							fieldNodes = columnNodes.getElementsByTagName("field");
							if (fieldNodes != undefined) {
								for(index=0; index < fieldNodes.length; index++){
									var rowObject = {};
									var attribute = fieldNodes.item(index);
									for (var counter = 0; counter < attribute.childElementCount; counter++) {
										if(attribute.childNodes[counter].nodeName == "width"){
											rowObject[attribute.childNodes[counter].nodeName] = parseInt(attribute.childNodes[counter].childNodes[0].nodeValue);
										} else {
											rowObject[attribute.childNodes[counter].nodeName] = attribute.childNodes[counter].childNodes[0].nodeValue;
										}
									}
									columnArray.push(rowObject);
								}
							}
						}
					}
				}
			}
			return columnArray;
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_rate_change_master_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_rate_change_master_contextMenu").show();
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_rate_change_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_rate_change_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {}
	}
};