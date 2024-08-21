var manage_parts_order_edit = {
	constructScreen : function () {
		manage_parts_order_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "salesinvoice",
			serviceName : "retrieve_manage_parts_order_detail",
			outputPath : false,
			pageSize : 10,
			inputParameter : {
				p_parts_order_no : "$manage_parts_order.variable.custom.selectedRecord.parts_order_no"
			},
			schemaModel : true,
			screenID : "manage_parts_order_edit",
			dataSourceName : "datasource_1",
			processResponse : true,
			parse : manage_parts_order_edit.customRequirementHandler.dataSourceParseParts
		});
		manage_parts_order_edit.variable.custom.datasource_2 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_custom_info_list",
			outputPath : "outputparam_detail",
			api : true,
			pageSize : 10,
			inputParameter : {
				p_custom_info_code : "'parts_order_receipt_link'",
				p_inputparam_xml : "<inputparam><receipt_buyer_ref_no_filter>$manage_parts_order.variable.custom.selectedRecord.parts_order_no</receipt_buyer_ref_no_filter></inputparam>"
			},
			screenID : "manage_parts_order_edit"
		});
		manage_parts_order_edit.variable.custom.datasource_3 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_txn_event_log",
			outputPath : "context/outputparam_detail",
			pageSize : 10,
			inputParameter : {
				p_txn_type_code : "'PARTSORDER'",
				p_txn_ref_no : "$manage_parts_order.variable.custom.selectedRecord.parts_order_no"
			},
			schemaModel : true,
			screenID : "manage_parts_order_edit",
			dataSourceName : "datasource_3",
			processResponse : true
		});
		if (manage_parts_order.variable.custom.crudIndicator == "U" || manage_parts_order.variable.custom.crudIndicator == "V") {
			manage_parts_order_edit.variable.custom.datasource_1.read();
			manage_parts_order_edit.variable.custom.datasource_2.read();
			manage_parts_order_edit.variable.custom.datasource_3.read();
		}
	},
	postConstruct : function () {
		manage_parts_order_edit.customRequirementHandler.allowTransactionChange();
		$("#manage_parts_order_edit_reference_number").attr("data-widget-type", "w_link");
		$("#manage_parts_order_edit_reference_number").attr("data-link-type", "pwc_reference_no");
		$("#manage_parts_order_edit_reference_number").attr("style", "text-decoration: underline; color: blue; cursor: pointer");
		if (manage_parts_order.variable.custom.crudIndicator == "V") {
			$("#manage_parts_order_edit_grid_1_toolbar_element").hide();
		}
	},
	initializeWidgets : function () {
		manage_parts_order_edit.variable.custom.tabstrip = $("#manage_parts_order_edit_tabstrip").kendoTabStrip({
			animation : {
				open : {
					effects : "fadeIn"
				},
			},
		}).data("kendoTabStrip");
		$("#manage_parts_order_edit_fiscal_year").initializeWDisplayarea({
			screenID : "manage_parts_order_edit",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.fiscal_year",
		});
		$("#manage_parts_order_edit_parts_order_no").initializeWDisplayarea({
			screenID : "manage_parts_order_edit",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.parts_order_no",
		});
		$("#manage_parts_order_edit_parts_order_status").initializeWDisplayarea({
			screenID : "manage_parts_order_edit",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.parts_order_status_desc"
		});
		$("#manage_parts_order_edit_parts_order_category").initializeWDropdownlist({
			screenID : "manage_parts_order_edit",
			dataSource : {
				informationType : "'PARTORDCATG_LIST'",
			},
			dataTextField : "description",
			dataValueField : "code",
			childFieldID : "manage_parts_order_edit_parts_order_type",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.parts_order_category",
			defaultValueDescription : "$manage_parts_order_edit.variable.custom.header_1_record.parts_order_category_desc"
		});
		$("#manage_parts_order_edit_parts_order_type").initializeWDropdownlist({
			screenID : "manage_parts_order_edit",
			dataSource : {
				informationType : "'PARTORDTYPE_LIST_LINK'",
				searchField1 : "#manage_parts_order_edit_parts_order_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.parts_order_type",
			defaultValueDescription : "$manage_parts_order_edit.variable.custom.header_1_record.parts_order_type_desc"
		});
		$("#manage_parts_order_edit_parts_order_date").initializeWDatepicker({
			screenID : "manage_parts_order_edit",
			minimum : "$manage_parts_order_edit.variable.custom.header_1_record.parts_order_date",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.parts_order_date",
		});
		$("#manage_parts_order_edit_org_level_no").initializeWDropdownlist({
			screenID : "manage_parts_order_edit",
			dataSource : {
				informationType : "'ORGLEVELNO_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_parts_order_edit_org_level_code",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.organogram_level_no",
			defaultValueDescription : "$manage_parts_order_edit.variable.custom.org_level_no_defaultValueDescription"
		});
		$("#manage_parts_order_edit_org_level_code").initializeWDropdownlist({
			screenID : "manage_parts_order_edit",
			dataSource : {
				informationType : "'ORGLEVELCODE_LIST'",
				searchField1 : "#manage_parts_order_edit_org_level_no",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.organogram_level_code",
			defaultValueDescription : "$manage_parts_order_edit.variable.custom.org_level_code_defaultValueDescription"
		});
		$("#manage_parts_order_edit_summary_comments").initializeWTextarea({
			screenID : "manage_parts_order_edit",
			maxlength : "1000",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.summary_comments",
		});
		$("#manage_parts_order_edit_reference_number").initializeWDisplayarea({
			screenID : "manage_parts_order_edit",
			defaultValue : "$manage_parts_order_edit.variable.custom.header_1_record.parts_order_reason_ref_no"
		});
		manage_parts_order_edit.variable.custom.grid_1 = $("#manage_parts_order_edit_grid_1").initializeWGrid({
			screenID : "manage_parts_order_edit",
			toolbar : "#manage_parts_order_edit_grid_1_toolbar_template",
			dataSource : manage_parts_order_edit.variable.custom.datasource_1,
			height : 400,
			pageSize : 10,
			filterable : false,
		});
		manage_parts_order_edit.variable.custom.grid_2 = $("#manage_parts_order_edit_grid_2").initializeWGrid({
			screenID : "manage_parts_order_edit",
			toolbar : false,
			dataSource : manage_parts_order_edit.variable.custom.datasource_2,
			height : 400,
			pageSize : 10,
			filterable : false,
		});
		manage_parts_order_edit.variable.custom.grid_3 = $("#manage_parts_order_edit_grid_3").initializeWGrid({
			screenID : "manage_parts_order_edit",
			toolbar : false,
			dataSource : manage_parts_order_edit.variable.custom.datasource_3,
			height : 400,
			pageSize : 10,
			filterable : false,
		});
		manage_parts_order_edit.variable.custom.grid_1.refresh();
		manage_parts_order_edit.variable.custom.grid_2.refresh();
		manage_parts_order_edit.variable.custom.grid_3.refresh();
	},
	refreshScreen : function () {
		manage_parts_order_edit.customRequirementHandler.allowTransactionChange();
		manage_parts_order_edit.variable.custom.grid_1.refresh();
		if(manage_parts_order_edit.variable.custom.crudIndicator != "D"){
			manage_parts_order_edit.variable.custom.grid_1.dataSource.pageSize(10);
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if(manage_parts_order_edit.variable.custom.crudIndicator == "D"){
				manage_parts_order_edit.variable.custom.grid_1.dataSource.remove(manage_parts_order_edit.variable.custom.selectedRecord);
				alert("Data deleted successfully.");
				manage_parts_order_edit.customRequirementHandler.allowTransactionChange();
				for (var index = 0; index < manage_parts_order_edit.variable.custom.grid_1.dataSource.data().length; index++) {
					manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[index].set("parts_item_sl_no", (index + 1).toString());
				}		
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_parts_order_edit_child.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_parts_order_edit",
						fieldID : "manage_parts_order_edit_child_window",
						nextScreenID : "manage_parts_order_edit_child",
						nextScreenName : manage_parts_order_edit.variable.custom.nextScreenName,
						execute : manage_parts_order_edit_child.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_parts_order_edit.variable.custom.miscID == "excel_import"){
				$("#manage_parts_order_edit_grid_1").append("<div id = 'manage_parts_order_edit_excel_import_window'><div id = 'manage_parts_order_edit_excel_import_spreadsheet' style='width: 100%; height: 90%;' ></div></hr><center><button style='margin-top: 2%;' id='manage_parts_order_edit_excel_import_submit' class='k-button'>Submit</button></center></div>");
				$("#manage_parts_order_edit_excel_import_window").kendoWindow({
					width : (screen.width * 0.60),
					height : (screen.height * 0.65),
					title : "Excel Import",
					visible : false,
					modal : true,
					deactivate : function () {
						this.destroy();
					},
				});
				$("#manage_parts_order_edit_excel_import_spreadsheet").kendoSpreadsheet({
					columns: manage_parts_order_edit.customRequirementHandler.getSpreadsheetColumns().length,
					rows : 1000,
					sheetsbar: false,
					sheets: [{
						columns: manage_parts_order_edit.customRequirementHandler.getSpreadsheetColumns(),
						rows: [{
							cells: manage_parts_order_edit.customRequirementHandler.getSpreadsheetRows()
						}]
					}]
				});
				$("#manage_parts_order_edit_excel_import_window").data("kendoWindow").center().open();
				$("#manage_parts_order_edit_excel_import_spreadsheet .k-tabstrip-wrapper").hide();
				$("#manage_parts_order_edit_excel_import_spreadsheet .k-spreadsheet-action-bar").hide();
				for(var i=0; i < manage_parts_order_edit.customRequirementHandler.getSpreadsheetRows().length; i++){
					if(manage_parts_order_edit.customRequirementHandler.getSpreadsheetRows()[i].format !== "undefined"){
						$("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(1,i,1000,0).format(manage_parts_order_edit.customRequirementHandler.getSpreadsheetRows()[i].format);
					}
				}
				$("#manage_parts_order_edit_excel_import_submit").click(function(){
					var spreadsheetData = $("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().toJSON().rows;
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
							for(var j=0; j < manage_parts_order_edit.customRequirementHandler.getSpreadsheetRows().length; j++){
								if(spreadsheetDatasource[i].cells[j] == undefined || spreadsheetDatasource[i].cells[j].value == undefined){
									inputparamXML += "<" + manage_parts_order_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">" + '' + "</" + manage_parts_order_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">"
								} else {
									inputparamXML += "<" + manage_parts_order_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">" + spreadsheetDatasource[i].cells[j].value + "</" + manage_parts_order_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">"
								}
							}
							inputparamXML += "</data>";
						}
						inputparamXML += "</search_field_xml></inputparam>";
						manage_parts_order_edit.variable.custom.validationData = mserviceUtilities.getTransportPagingDataSource({
							applicationName : "common_modules",
							serviceName : "retrieve_manage_custom_info_list",
							outputPath : "outputparam_detail",
							api : true,
							pageSize : 50,
							inputParameter : {
								p_custom_info_code : "'parts_order_import'",
								p_inputparam_xml : inputparamXML.replace(/\n|\r/g, "")
							},
							screenID : "manage_parts_order_edit"
						});
						manage_parts_order_edit.variable.custom.validationData.read();
						if(manage_parts_order_edit.variable.custom.validationData.data().length != 0){
							var invalidData = $.grep(manage_parts_order_edit.variable.custom.validationData.data(),function(data){
								return data.valid_ind == "0"
							});
							var overallData = manage_parts_order_edit.variable.custom.validationData.data();
							for(var index=0; index < overallData.length; index++){
								$("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index),0,1,$("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background ("white");
								$("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index),0,1,$("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).validation(null);
							}
							if(invalidData.length != 0){
								for(var counter=0; counter < invalidData.length; counter++){
									$("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index),0,1,$("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background ("yellow");
									$("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index),0,1,$("#manage_parts_order_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).validation({
										dataType: "custom",
										from: "AND(LEN(A" + ( parseInt(invalidData[counter].record_index) + 1 ) + ")<0)",
										messageTemplate: invalidData[counter].err_message
									});
								}
								alert("The rows highlighted in the excel are not valid part number or not available in database. Please remove or correct it.");
							} else {
								var spreadsheetArray = manage_parts_order_edit.variable.custom.validationData.data();
								var duplicateData = [];
								for(var index=0; index < spreadsheetArray.length; index++){					
									var tempArray = $.grep(manage_parts_order_edit.variable.custom.grid_1.dataSource.data(),function(data){
										if((data.item_code == spreadsheetArray[index].item_code) && (data.item_variant_code == spreadsheetArray[index].item_variant_code) && (data.uom_code == spreadsheetArray[index].uom_code)){
											duplicateData.push(data);
										}
									});
								}
								for(var index=0; index < duplicateData.length; index++){
									manage_parts_order_edit.variable.custom.grid_1.dataSource.remove(duplicateData[index]);
								}
								for(var index=0; index < spreadsheetArray.length; index++){
									var inputObject = {};
									for(key in spreadsheetArray[index]){
										if(key.indexOf("udf") !== -1){
											inputObject[key] = spreadsheetArray[index][key];
										}
									}
									inputObject.parts_order_item_sl_no = (manage_parts_order_edit.variable.custom.grid_1.dataSource.data().length + 1).toString();
									inputObject.item_code = spreadsheetArray[index].item_code;
									inputObject.item_description = spreadsheetArray[index].item_description;
									inputObject.item_variant_code = spreadsheetArray[index].item_variant_code;
									inputObject.variant_description = spreadsheetArray[index].variant_description;
									inputObject.addn_description = spreadsheetArray[index].addn_description;
									inputObject.order_quantity = spreadsheetArray[index].order_quantity;
									inputObject.shipped_quantity = spreadsheetArray[index].shipped_quantity;
									inputObject.received_quantity = spreadsheetArray[index].received_quantity;
									inputObject.uom_code = spreadsheetArray[index].uom_code;
									inputObject.uom_code_description = spreadsheetArray[index].uom_code_description;
									inputObject.last_update_timestamp = "00000000-0000-0000-0000-000000000000";
									manage_parts_order_edit.variable.custom.grid_1.dataSource.add(inputObject);
								}
								$("#manage_parts_order_edit_excel_import_window").data("kendoWindow").close();
								manage_parts_order_edit.customRequirementHandler.allowTransactionChange();
							}
						} else {
							alert("Please Contact your support desk.");
						}
					} else {
						alert("No record to perform Import.");
					}
				});	
			}
		},
		submit_btn_click : function (element, event) {
			if (manage_parts_order_edit.variable.custom.grid_1.dataSource.data().length == 0) {
				alert("Please enter part details.");
			} else {
				var returnValue,
				recordTimeStamp,
				partsOrderStatus,
				inputparamDetail1,
				inputparamDetail2,
				inputparamDetail3,
				inputparamDetail4,
				inputparamDetail5,
				detailRecordCounter,
				taxdetailRecordCounter,
				accessoriesRecordCounter;
				partsOrderStatus = "";
				inputparamDetail1 = [];
				inputparamDetail2 = [];
				inputparamDetail3 = [];
				inputparamDetail4 = [];
				inputparamDetail5 = [];
				recordTimeStamp = "00000000-0000-0000-0000-000000000000";
				if (manage_parts_order.variable.custom.crudIndicator == "U") {
					recordTimeStamp = manage_parts_order.variable.custom.selectedRecord.rec_tstamp;
					partsOrderStatus = manage_parts_order.variable.custom.selectedRecord.parts_order_status ;
				};
				
				for (detailRecordCounter = 0; detailRecordCounter < manage_parts_order_edit.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
				var inputparamDetailUDF = "<inputparam>";
					for(key in manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter]) {
						if(key.includes("udf")) {
							inputparamDetailUDF += "<" + key + ">" + manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key] + "</" + key + ">";
						}
					}
					inputparamDetailUDF += "</inputparam>";
					
					inputparamDetail1.push({
						p_txn_detail1_sl_no : (detailRecordCounter + 1).toString(),
						p_txn_detail1_coref_xml : "<item_code>" + manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_code + "</item_code><item_variant_code>" + manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_variant_code + "</item_variant_code><quantity>" + parseFloat(manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].order_quantity).toFixed(2) + "</quantity><uom_code>" + manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].uom_code + "</uom_code><item_description>" + manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_description + "</item_description><variant_description>" + manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].variant_description + "</variant_description><addn_description>" + manage_parts_order_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].addn_description + "</addn_description>" ,
						p_txn_detail1_udf_xml : inputparamDetailUDF,
						p_txn_detail1_crud_ind : manage_parts_order.variable.custom.crudIndicator
					});
				};
				
				returnValue = salesinvoice_partsorder_setDetail.invokeAPI({
					p_txn_ref_no : $("#manage_parts_order_edit_parts_order_no").getVal(),
					p_txn_header_coref_xml : "<parts_order_category >" + $("#manage_parts_order_edit_parts_order_category").getVal() + "</parts_order_category ><parts_order_type >" + $("#manage_parts_order_edit_parts_order_type").getVal() + "</parts_order_type ><parts_order_status >" + partsOrderStatus+ "</parts_order_status ><parts_order_date >" + mserviceUtilities.getDateString($("#manage_parts_order_edit_parts_order_date").getVal(), "yyyy-MM-dd") + "</parts_order_date ><organogram_level_no >" + $("#manage_parts_order_edit_org_level_no").getVal() + "</organogram_level_no ><organogram_level_code >" + $("#manage_parts_order_edit_org_level_code").getVal() + "</organogram_level_code ><summary_comments >"+ WebAPIProxy.XMLEncode($("#manage_parts_order_edit_summary_comments").getVal()) + "</summary_comments>",
					p_txn_header_udf_xml : $("#manage_parts_order_edit_content_1").getInputparamXML({
							screenID : "manage_parts_order_edit",
							matchCondition : ["manage_parts_order_edit_udf","manage_parts_order_edit_product_udf"]
						}),
					p_rec_timestamp : recordTimeStamp,
					p_save_mode : manage_parts_order.variable.custom.crudIndicator,
					inputparam_detail1 : inputparamDetail1,
					inputparam_detail2 : inputparamDetail2,
					inputparam_detail3 : inputparamDetail3,
					inputparam_detail4 : inputparamDetail4,
					inputparam_detail5 : inputparamDetail5
				});
				
				if (returnValue.update_status == "SP001") {
					alert("Parts Order Details are saved successfully");
					return true;
				} else {
					alert("Saving of Parts Order Details Failed");
					return false;
				}
			}
		}
	},
	linkEventHandler : {
		pwc_reference_no_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_pwclaim_detail.js"])) {
				manage_pwclaim_header = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								pwclaim_ref_no : manage_parts_order_edit.variable.custom.header_1_record.parts_order_reason_ref_no
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "manage_parts_order_edit",
					nextScreenID : "manage_pwclaim_detail",
					nextScreenName : manage_parts_order_edit.variable.custom.header_1_record.parts_order_reason_ref_no
				});
				$("#manage_pwclaim_detail_submit_btn").hide();
				$("#manage_pwclaim_detail").enableViewMode();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		inv_adj_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_inventory_adjustment_edit.js"])) {
				manage_inventory_adjustment = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								inv_adj_no : $(element).text()
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
						screenID: "manage_parts_order_edit",
						nextScreenID: "manage_inventory_adjustment_edit",
						nextScreenName: $(element).text()
					});
				$("#manage_inventory_adjustment_edit_submit_btn").hide();
				$("#manage_inventory_adjustment_edit").enableViewMode();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function (element, event) {
			manage_parts_order_edit.variable.custom.selectedRecord = manage_parts_order_edit.variable.custom.grid_1.dataSource.getByUid(manage_parts_order_edit.variable.custom.grid_1.select().data("uid"));
		},
		allowTransactionChange: function () {
			if (manage_parts_order_edit.variable.custom.datasource_1.data().length == 0) {
				$("#manage_parts_order_edit_parts_order_category").enable();
				$("#manage_parts_order_edit_parts_order_type").enable();
			} else {
				$("#manage_parts_order_edit_parts_order_category").disable();
				$("#manage_parts_order_edit_parts_order_type").disable();
			}
		},
		dataSourceParseParts : function (response) {
			var parseResponse;
			if (response.document != undefined) {
				if (response.document.ApplicationException == undefined) {
					manage_parts_order_edit.variable.custom.header_1_record = response.document.context.outputparam_header;
					if (response.document.context.outputparam_detail_items != undefined) {
						if (response.document.context.outputparam_detail_items.length != undefined) {
							parseResponse = response.document.context.outputparam_detail_items;
						} else {
							parseResponse = [response.document.context.outputparam_detail_items];
						}
					} else {
						parseResponse = [];
					}
				} else {
					parseResponse = response;
				}
			} else {
				parseResponse = response;
			};
			return parseResponse;
		},
		getSpreadsheetRows : function () {
			var currentConfig,
			configurationParamNode,
			spreadsheetNode,
			rowNodes,
			fieldNodes,
			cellArray = [];
			currentConfig = webConfigurationEngine.getUiConfigurationObject("manage_parts_order_edit");
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
			currentConfig = webConfigurationEngine.getUiConfigurationObject("manage_parts_order_edit");
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
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_parts_order_edit_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_parts_order_edit_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			customDelete : true
		}
	}
};