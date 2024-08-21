var manage_inventory_adjustment_edit = {
	constructScreen: function () {
		manage_inventory_adjustment_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName: "salesinvoice",
				serviceName: "retrieve_manage_inventory_adjustment_detail",
				outputPath: false,
				api: true,
				inputParameter: {
					p_inventory_adjustment_ref_no : "$manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_no",
				},
				pageSize: 10,
				schemaModel: true,
				screenID: "manage_inventory_adjustment_edit",
				dataSourceName: "datasource_1",
				processResponse: true,
				parse: manage_inventory_adjustment_edit.customRequirementHandler.dataSourceParse
			});
		if (manage_inventory_adjustment.variable.custom.crudIndicator == "U" || manage_inventory_adjustment.variable.custom.crudIndicator == "V") {
			manage_inventory_adjustment_edit.variable.custom.datasource_1.read();
			manage_inventory_adjustment_edit.variable.custom.org_level_no_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELNO_LIST", manage_inventory_adjustment_edit.variable.custom.header_1_record.organogram_level_no, "");
			manage_inventory_adjustment_edit.variable.custom.org_level_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELCODE_LIST", manage_inventory_adjustment_edit.variable.custom.header_1_record.organogram_level_code, "");
		}
	},
	postConstruct: function () {
		manage_inventory_adjustment_edit.customRequirementHandler.allowTransactionChange();
		if (manage_inventory_adjustment.variable.custom.crudIndicator == "V") {
			$("#manage_inventory_adjustment_edit_add_btn").hide();
			$("#manage_inventory_adjustment_edit_edit_btn").hide();
			$("#manage_inventory_adjustment_edit_delete_btn").hide();
		};
	},
	refreshScreen: function () {
		manage_inventory_adjustment_edit.customRequirementHandler.allowTransactionChange();
		manage_inventory_adjustment_edit.variable.custom.grid_1.refresh();
		if (manage_inventory_adjustment_edit.variable.custom.crudIndicator != "D") {
			manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.pageSize(10);
		}
	},
	initializeWidgets: function () {
		$("#manage_inventory_adjustment_edit_fiscal_year").initializeWDisplayarea({
			screenID : "manage_inventory_adjustment_edit",
			defaultValue : "$manage_inventory_adjustment_edit.variable.custom.header_1_record.fiscal_year",
		});
		$("#manage_inventory_adjustment_edit_adj_txn_ref_no").initializeWDisplayarea({
			screenID: "manage_inventory_adjustment_edit",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.inv_adj_no"
		});
		$("#manage_inventory_adjustment_edit_adj_txn_status").initializeWDisplayarea({
			screenID : "manage_inventory_adjustment_edit",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.inv_adj_status_desc"
		});
		$("#manage_inventory_adjustment_edit_adj_txn_category").initializeWDropdownlist({
			screenID: "manage_inventory_adjustment_edit",
			dataSource: {
				informationType: "'INVADJCATG_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.inv_adj_category",
			defaultValueDescription: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.inv_adj_category_desc",
			template: "description",
			childFieldID : "manage_inventory_adjustment_edit_adj_txn_type, manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no"
		});
		$("#manage_inventory_adjustment_edit_adj_txn_type").initializeWDropdownlist({
			screenID: "manage_inventory_adjustment_edit",
			dataSource: {
				informationType: "'INVADJTYPE_LIST_LINKED'",
				searchField1: "#manage_inventory_adjustment_edit_adj_txn_category",
			},
			dataTextField: "description",
			dataValueField: "code",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.inv_adj_type",
			defaultValueDescription: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.inv_adj_type_desc",
			template: "description",
			childFieldID : "manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no"
		});
		$("#manage_inventory_adjustment_edit_adj_txn_datetime").initializeWDatepicker({
			screenID: "manage_inventory_adjustment_edit",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.inv_adj_date"
		});
		manage_inventory_adjustment_edit.variable.custom.supplier_code = $("#manage_inventory_adjustment_edit_supplier_code").initializeWCombobox({
			screenID: "manage_inventory_adjustment_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'SUPPLIER_LIST'</lov_code_type><search_field_1>$manage_inventory_adjustment_edit.variable.custom.supplier_code_serverFilterValue</search_field_1><search_field_2>#manage_inventory_adjustment_edit_adj_txn_category</search_field_2><search_field_3>#manage_inventory_adjustment_edit_adj_txn_type</search_field_3></inputparam>"
				},
			},
			dataTextField: "description",
			dataValueField: "code",
			serverFiltering : true,
			template: "description",
			childFieldID : "manage_inventory_adjustment_edit_supplier_location_code",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.supplier_code",
			defaultValueDescription: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.supplier_name"
		});
		manage_inventory_adjustment_edit.variable.custom.supplier_location_code = $("#manage_inventory_adjustment_edit_supplier_location_code").initializeWCombobox({
			screenID: "manage_inventory_adjustment_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'SUPPLIERLOCATION_LIST'</lov_code_type><search_field_1>#manage_inventory_adjustment_edit_supplier_code</search_field_1><search_field_2>#manage_inventory_adjustment_edit_adj_txn_category</search_field_2><search_field_3>#manage_inventory_adjustment_edit_adj_txn_type</search_field_3></inputparam>"
				},
			},
			dataTextField: "description",
			dataValueField: "code",
			serverFiltering : true,
			template: "description",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.supplier_location_code",
			defaultValueDescription: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.supplier_location_name"
		});
		$("#manage_inventory_adjustment_edit_supplier_ref_no").initializeWTextbox({
			screenID: "manage_inventory_adjustment_edit",
			maxlength: "30",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.supplier_ref_no"
		});
		$("#manage_inventory_adjustment_edit_supplier_ref_date").initializeWDatepicker({
			screenID: "manage_inventory_adjustment_edit",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.supplier_ref_date"
		});
		manage_inventory_adjustment_edit.variable.custom.from_warehouse_id = $("#manage_inventory_adjustment_edit_from_warehouse_id").initializeWCombobox({
			screenID : "manage_inventory_adjustment_edit",
			dataSource : {
				informationType : "'WAREHOUSE_LIST'",
				searchField1 : "$manage_inventory_adjustment_edit.variable.custom.from_warehouse_id_serverFilterValue",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.from_warehouse_id",
			defaultValueDescription: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.from_warehouse_name"
		});
		manage_inventory_adjustment_edit.variable.custom.to_warehouse_id = $("#manage_inventory_adjustment_edit_to_warehouse_id").initializeWCombobox({
			screenID : "manage_inventory_adjustment_edit",
			dataSource : {
				informationType : "'WAREHOUSE_LIST'",
				searchField1 : "$manage_inventory_adjustment_edit.variable.custom.to_warehouse_id_serverFilterValue",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.to_warehouse_id",
			defaultValueDescription: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.to_warehouse_name"
		});
		$("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_ind").initializeWCheckbox({
			screenID: "manage_inventory_adjustment_edit",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.sys_mapped_buyer_ref_ind"
		});
		$("#manage_inventory_adjustment_edit_buyer_ref_no").initializeWTextbox({
			screenID: "manage_inventory_adjustment_edit",
			maxlength: "30",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.receipt_buyer_ref_no"
		});
		$("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no").initializeWCombobox({
			screenID : "manage_inventory_adjustment_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'SYS_MAPPED_BUYER_REF_NO_LIST'</lov_code_type><search_field_1>$manage_inventory_adjustment_edit.variable.custom.sys_mapped_buyer_ref_no_serverFilterValue</search_field_1><search_field_2>#manage_inventory_adjustment_edit_adj_txn_category</search_field_2><search_field_3>#manage_inventory_adjustment_edit_adj_txn_type</search_field_3></inputparam>"
				},
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.receipt_buyer_ref_no"
		});
		$("#manage_inventory_adjustment_edit_org_level_no").initializeWDropdownlist({
			screenID: "manage_inventory_adjustment_edit",
			dataSource: {
				informationType: "'ORGLEVELNO_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			childFieldID: "manage_inventory_adjustment_edit_org_level_code",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.organogram_level_no",
			defaultValueDescription: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.org_level_no_defaultValueDescription"
		});
		$("#manage_inventory_adjustment_edit_org_level_code").initializeWDropdownlist({
			screenID: "manage_inventory_adjustment_edit",
			dataSource: {
				informationType: "'ORGLEVELCODE_LIST'",
				searchField1: "#manage_inventory_adjustment_edit_org_level_no",
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.organogram_level_code",
			defaultValueDescription: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.org_level_code_defaultValueDescription"
		});
		$("#manage_inventory_adjustment_edit_summary_comments").initializeWTextarea({
			screenID : "manage_inventory_adjustment_edit",
			maxlength : "1000",
			defaultValue: "$manage_inventory_adjustment_edit.variable.custom.header_1_record.summary_comments"
		});
		manage_inventory_adjustment_edit.variable.custom.grid_1 = $("#manage_inventory_adjustment_edit_grid_1").initializeWGrid({
				screenID: "manage_inventory_adjustment_edit",
				toolbar: "#manage_inventory_adjustment_edit_grid_1_toolbar_template",
				dataSource: manage_inventory_adjustment_edit.variable.custom.datasource_1,
				height: 400,
				pageSize: 10
			});
		if (manage_inventory_adjustment.variable.custom.crudIndicator != 'A') {
			manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.read();
		}
	},
	buttonEventHandler: {
		misc_btn_click : function (element, event){
			if(manage_inventory_adjustment_edit.variable.custom.miscID == "excel_import"){
				if ($("#manage_inventory_adjustment_edit_to_warehouse_id").getVal() == ""){
					alert("Please Choose the Warehouse for Transfer.");
					return false;
				}
				$("#manage_inventory_adjustment_edit_grid_1").append("<div id = 'manage_inventory_adjustment_edit_excel_import_window'><div id = 'manage_inventory_adjustment_edit_excel_import_spreadsheet' style='width: 100%; height: 90%;' ></div></hr><center><button style='margin-top: 2%;' id='manage_inventory_adjustment_edit_excel_import_submit' class='k-button'>Submit</button></center></div>");
				$("#manage_inventory_adjustment_edit_excel_import_window").kendoWindow({
					width : (screen.width * 0.60),
					height : (screen.height * 0.65),
					title : "Excel Import",
					visible : false,
					modal : true,
					deactivate : function () {
						this.destroy();
					},
				});
				$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").kendoSpreadsheet({
					columns: manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetColumns().length,
					rows : 1000,
					sheetsbar: false,
					sheets: [{
						columns: manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetColumns(),
						rows: [{
							cells: manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetRows()
						}]
					}]
				});
				$("#manage_inventory_adjustment_edit_excel_import_window").data("kendoWindow").center().open();
				$("#manage_inventory_adjustment_edit_excel_import_spreadsheet .k-tabstrip-wrapper").hide();
				$("#manage_inventory_adjustment_edit_excel_import_spreadsheet .k-spreadsheet-action-bar").hide();
				for(var i=0; i < manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetRows().length; i++){
					if(manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetRows()[i].format !== "undefined"){
						$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(1,i,1000,0).format(manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetRows()[i].format);
					}
				}
				$("#manage_inventory_adjustment_edit_excel_import_submit").click(function(){
					var spreadsheetData = $("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().toJSON().rows;
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
							inputparamXML += "<data><record_index>" + spreadsheetDatasource[i].index + "</record_index><warehouse_id>" + $("#manage_inventory_adjustment_edit_to_warehouse_id").getVal() + "</warehouse_id><supplier_code>" + $("#manage_inventory_adjustment_edit_supplier_code").getVal() + "</supplier_code><supplier_location_code>" + $("#manage_inventory_adjustment_edit_supplier_location_code").getVal() + "</supplier_location_code>";
							for(var j=0; j < manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetRows().length; j++){
								if(spreadsheetDatasource[i].cells[j] == undefined || spreadsheetDatasource[i].cells[j].value == undefined){
									inputparamXML += "<" + manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">" + '' + "</" + manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">"
								} else {
									inputparamXML += "<" + manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">" + spreadsheetDatasource[i].cells[j].value + "</" + manage_inventory_adjustment_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">"
								}
							}
							inputparamXML += "</data>";
						}
						inputparamXML += "</search_field_xml></inputparam>";
						manage_inventory_adjustment_edit.variable.custom.validationData = mserviceUtilities.getTransportPagingDataSource({
							applicationName : "common_modules",
							serviceName : "retrieve_manage_custom_info_list",
							outputPath : "outputparam_detail",
							api : true,
							pageSize : 50,
							inputParameter : {
								p_custom_info_code : "'inventory_adjustment_import'",
								p_inputparam_xml : inputparamXML.replace(/\n|\r/g, "")
							},
							screenID : "manage_inventory_adjustment_edit"
						});
						manage_inventory_adjustment_edit.variable.custom.validationData.read();
						if(manage_inventory_adjustment_edit.variable.custom.validationData.data().length != 0){
							var invalidData = $.grep(manage_inventory_adjustment_edit.variable.custom.validationData.data(),function(data){
								return data.valid_ind == "0"
							});
							var overallData = manage_inventory_adjustment_edit.variable.custom.validationData.data();
							for(var index=0; index < overallData.length; index++){
								$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index),0,1,$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background ("white");
								$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index),0,1,$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).validation(null);
							}
							if(invalidData.length != 0){
								for(var counter=0; counter < invalidData.length; counter++){
									$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index),0,1,$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background ("yellow");
									$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index),0,1,$("#manage_inventory_adjustment_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).validation({
										dataType: "custom",
										from: "AND(LEN(A" + ( parseInt(invalidData[counter].record_index) + 1 ) + ")<0)",
										messageTemplate: invalidData[counter].err_message
									});
								}
								alert("The rows highlighted in the excel are not valid record. Please remove or correct it.");
							} else {
								var spreadsheetArray = manage_inventory_adjustment_edit.variable.custom.validationData.data();
								var duplicateData = [];
								for(var index=0; index < spreadsheetArray.length; index++){					
									var tempArray = $.grep(manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data(),function(data){
										if((data.item_code == spreadsheetArray[index].item_code) && (data.item_variant_code == spreadsheetArray[index].item_variant_code) && (data.uom_code == spreadsheetArray[index].uom_code)){
											duplicateData.push(data);
										}
									});
								}
								for(var index=0; index < duplicateData.length; index++){
									manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.remove(duplicateData[index]);
								}
								for(var index=0; index < spreadsheetArray.length; index++){
									var inputObject = {};
									for(key in spreadsheetArray[index]){
										if(key.indexOf("udf") !== -1){
											inputObject[key] = spreadsheetArray[index][key];
										}
									}
									inputObject.item_code = spreadsheetArray[index].item_code;
									inputObject.item_code_description = spreadsheetArray[index].item_code_description;
									inputObject.item_variant_code = spreadsheetArray[index].item_variant_code;
									inputObject.item_variant_code_description = spreadsheetArray[index].item_variant_code_description;
									inputObject.quantity = spreadsheetArray[index].net_quantity;
									inputObject.uom_code = spreadsheetArray[index].uom_code;
									inputObject.uom_code_description = spreadsheetArray[index].uom_code_description;
									inputObject.lot_batch_no = spreadsheetArray[index].lot_batch_no;
									inputObject.expiry_date = mserviceUtilities.getDateString(spreadsheetArray[index].expiry_date, "yyyy-MM-dd");
									inputObject.expiry_hour = mserviceUtilities.getDateString(spreadsheetArray[index].expiry_date, "HH");
									inputObject.expiry_minute = mserviceUtilities.getDateString(spreadsheetArray[index].expiry_date, "mm");
									inputObject.unit_rate = spreadsheetArray[index].purchase_rate;
									inputObject.currency_code = spreadsheetArray[index].currency_code;
									inputObject.asset_id = spreadsheetArray[index].asset_id;
									inputObject.last_update_timestamp = "00000000-0000-0000-0000-000000000000";
									manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.add(inputObject);
								}
								$("#manage_inventory_adjustment_edit_excel_import_window").data("kendoWindow").close();
								manage_inventory_adjustment_edit.customRequirementHandler.allowTransactionChange();
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
		crud_btn_click: function (element, event) {
			if (manage_inventory_adjustment_edit.variable.custom.crudIndicator == "D") {
				manage_inventory_adjustment_edit.variable.custom.datasource_1.remove(manage_inventory_adjustment_edit.variable.custom.datasource_1.getByUid(manage_inventory_adjustment_edit.variable.custom.grid_1.select().data("uid")));
				alert("Data Deleted Successfully.");
				manage_inventory_adjustment_edit.customRequirementHandler.allowTransactionChange();
			} else {
				if (((manage_inventory_adjustment_edit.variable.custom.crudIndicator == "A")||(manage_inventory_adjustment_edit.variable.custom.crudIndicator == "U")||(manage_inventory_adjustment_edit.variable.custom.crudIndicator == "V")) && ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "")){
					alert("Please Choose the Transaction Category.");
					return false;
				}
				if ((((manage_inventory_adjustment_edit.variable.custom.crudIndicator == "A")||(manage_inventory_adjustment_edit.variable.custom.crudIndicator == "U")||(manage_inventory_adjustment_edit.variable.custom.crudIndicator == "V")) && (($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ISSUE") || ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ADJ")) && ($("#manage_inventory_adjustment_edit_from_warehouse_id").getVal() == "")) || (((manage_inventory_adjustment_edit.variable.custom.crudIndicator == "A")||(manage_inventory_adjustment_edit.variable.custom.crudIndicator == "U")||(manage_inventory_adjustment_edit.variable.custom.crudIndicator == "V")) && (($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "RECPT")) && ($("#manage_inventory_adjustment_edit_to_warehouse_id").getVal() == "")) || (((manage_inventory_adjustment_edit.variable.custom.crudIndicator == "A")||(manage_inventory_adjustment_edit.variable.custom.crudIndicator == "U")||(manage_inventory_adjustment_edit.variable.custom.crudIndicator == "V")) && ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "IWT") && (($("#manage_inventory_adjustment_edit_from_warehouse_id").getVal() == "") || ($("#manage_inventory_adjustment_edit_to_warehouse_id").getVal() == "")))){
					alert("Please Choose the Warehouse for Transfer.");
					return false;
				}
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_inventory_adjustment_edit_child.js"])) {
					webNavigationController.gotoNextScreen({
						screenID: "manage_inventory_adjustment_edit",
						fieldID: "manage_inventory_adjustment_edit_child_window",
						nextScreenID: "manage_inventory_adjustment_edit_child",
						nextScreenName: manage_inventory_adjustment_edit.variable.custom.nextScreenName,
						execute: manage_inventory_adjustment_edit_child.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		submit_btn_click: function (element, event) {
			for(var index=0; index < manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data().length; index++){
				if(manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data()[index].item_variant_code == "EQUIPMENT"){
					var splitArray = manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data()[index].asset_id.split(",");
					if(parseFloat(manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data()[index].quantity) > splitArray.length){
						alert("Enter Machine Serial Numbers for the choosen quantity in " + manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data()[index].item_code);
						return false;
					}
				}
			};
			if (manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data().length == 0) {
				alert("Please enter part details.");
			} else {
				var returnValue,
				receiptBuyerRefNo,
				recordTimeStamp,
				quotationStatus,
				inputparamDetail1,
				inputparamDetail2,
				inputparamDetail3,
				inputparamDetail4,
				inputparamDetail5,
				detailRecordCounter,
				taxdetailRecordCounter,
				accessoriesRecordCounter;
				inputparamDetail1 = [];
				inputparamDetail2 = [];
				inputparamDetail3 = [];
				inputparamDetail4 = [];
				inputparamDetail5 = [];
				recordTimeStamp = "00000000-0000-0000-0000-000000000000";
				quotationStatus = "";
				if (manage_inventory_adjustment.variable.custom.crudIndicator == "U") {
					recordTimeStamp = manage_inventory_adjustment.variable.custom.selectedRecord.rec_tstamp;
				};
				if($("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_ind").getVal() == "1"){
					receiptBuyerRefNo = $("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no").getVal();
				} else {
					receiptBuyerRefNo = $("#manage_inventory_adjustment_edit_buyer_ref_no").getVal();
				};
				for (detailRecordCounter = 0; detailRecordCounter < manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
					var inputparamDetailUDF = "<inputparam>";
					for(key in manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter]) {
						if(key.includes("udf")) {
							inputparamDetailUDF += "<" + key + ">" + WebAPIProxy.XMLEncode(manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key]) + "</" + key + ">";
						}
					}
					inputparamDetailUDF += "</inputparam>";
					inputparamDetail1.push({
						p_txn_detail1_sl_no : (detailRecordCounter + 1).toString(),
						p_txn_detail1_coref_xml :"<item_code>" + WebAPIProxy.XMLEncode(manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].item_code) +"</item_code><item_variant_code>" + WebAPIProxy.XMLEncode(manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].item_variant_code) +"</item_variant_code><lot_batch_no>" + WebAPIProxy.XMLEncode(manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].lot_batch_no) +"</lot_batch_no><expiry_date>" + manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].expiry_date +"</expiry_date><expiry_hour>" + manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].expiry_hour +"</expiry_hour><expiry_minute>" + manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].expiry_minute +"</expiry_minute><quantity>" + manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].quantity.toString() +"</quantity><uom>" + WebAPIProxy.XMLEncode(manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].uom_code) + "</uom><unit_rate>" + manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].unit_rate + "</unit_rate><currency_code>" + WebAPIProxy.XMLEncode(login_profile.currency_code) + "</currency_code><asset_id_list>" + WebAPIProxy.XMLEncode(manage_inventory_adjustment_edit.variable.custom.datasource_1.data()[detailRecordCounter].asset_id) + "</asset_id_list>",
						p_txn_detail1_udf_xml : inputparamDetailUDF,
						p_txn_detail1_crud_ind : manage_inventory_adjustment.variable.custom.crudIndicator
					});
				};
				returnValue = salesinvoice_inventory_adjustment_setDetail.invokeAPI({
						p_txn_ref_no: WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_adj_txn_ref_no").getVal()),
						p_txn_header_coref_xml :
						"<adj_txn_category>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_adj_txn_category").getVal()) + "</adj_txn_category><adj_txn_type>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_adj_txn_type").getVal()) + "</adj_txn_type><adj_txn_date>" + mserviceUtilities.getDateString($("#manage_inventory_adjustment_edit_adj_txn_datetime").getVal(), "yyyy-MM-dd") + "</adj_txn_date><organogram_level_no>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_org_level_no").getVal()) + "</organogram_level_no><organogram_level_code>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_org_level_code").getVal()) + "</organogram_level_code><supplier_ref_date>" + mserviceUtilities.getDateString($("#manage_inventory_adjustment_edit_supplier_ref_date").getVal(), "yyyy-MM-dd") + "</supplier_ref_date><supplier_code>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_supplier_code").getVal()) + "</supplier_code><supplier_location_code>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_supplier_location_code").getVal()) + "</supplier_location_code><supplier_ref_no>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_supplier_ref_no").getVal()) + "</supplier_ref_no><sys_mapped_buyer_ref_ind>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_ind").getVal()) + "</sys_mapped_buyer_ref_ind><receipt_buyer_ref_no>" + WebAPIProxy.XMLEncode(receiptBuyerRefNo) + "</receipt_buyer_ref_no><from_warehouse_id>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_from_warehouse_id").getVal()) + "</from_warehouse_id><to_warehouse_id>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_to_warehouse_id").getVal() )+ "</to_warehouse_id><summary_comments>" + WebAPIProxy.XMLEncode($("#manage_inventory_adjustment_edit_summary_comments").getVal()) + "</summary_comments>",
						p_txn_header_udf_xml : $("#manage_inventory_adjustment_edit_content_1").getInputparamXML({
							screenID : "manage_inventory_adjustment_edit",
							matchCondition : ["manage_inventory_adjustment_edit_udf","manage_inventory_adjustment_edit_product_udf"]
						}),
						p_rec_timestamp : recordTimeStamp,
						p_save_mode : manage_inventory_adjustment.variable.custom.crudIndicator,
						inputparam_detail1 : inputparamDetail1,
						inputparam_detail2 : inputparamDetail2,
						inputparam_detail3 : inputparamDetail3,
						inputparam_detail4 : inputparamDetail4,
						inputparam_detail5 : inputparamDetail5
					});
				if (returnValue.update_status == "SP001") {
					alert("Inventory Details for transaction number " + returnValue.txn_ref_no + " is saved successfully.");
					return true;
				} else {
					alert("Saving of Inventory Details failed");
					return false;
				}
			}
		}
	},
	widgetEventHandler : {
		to_warehouse_id_change : function (element, event) {
			if(($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "IWT") && ($("#manage_inventory_adjustment_edit_from_warehouse_id").getVal() != "")&& ($("#manage_inventory_adjustment_edit_to_warehouse_id").getVal() != "")){
				if($("#manage_inventory_adjustment_edit_from_warehouse_id").getVal() == $("#manage_inventory_adjustment_edit_to_warehouse_id").getVal()){
					alert("Same Warehouse Transfer is not applicable.");
					$("#manage_inventory_adjustment_edit_to_warehouse_id").setVal("");
				} else {
					var fromWarehouse = $.grep(manage_inventory_adjustment_edit.variable.custom.to_warehouse_id.dataSource.data(), function(data) {
						return data.code == $("#manage_inventory_adjustment_edit_from_warehouse_id").getVal();
					});
					var toWarehouse = $.grep(manage_inventory_adjustment_edit.variable.custom.to_warehouse_id.dataSource.data(), function(data) {
						return data.code == $("#manage_inventory_adjustment_edit_to_warehouse_id").getVal();
					});
					if (fromWarehouse[0].state != toWarehouse[0].state) {
						alert("Inter State Warehouse Transfer is not allowed.");
						$("#manage_inventory_adjustment_edit_to_warehouse_id").setVal("");
					}
				}
			}
		},
		sys_mapped_buyer_ref_no_change : function (element, event) {
			if($("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no").getVal() != ""){
				manage_inventory_adjustment_edit.variable.custom.buyerRefCheck = mserviceUtilities.getTransportDataSource({
					applicationName: "common_modules",
					serviceName: "retrieve_listof_values_for_searchcondition",
					outputPath: "context/outputparam",
					inputParameter: {
						p_inputparam_xml: "<inputparam><lov_code_type>'SYS_MAPPED_BUYER_REF_INV_CHECK'</lov_code_type><search_field_1>#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no</search_field_1><search_field_2>#manage_inventory_adjustment_edit_adj_txn_ref_no</search_field_2></inputparam>"
					}
				});
				manage_inventory_adjustment_edit.variable.custom.buyerRefCheck.read();
				if(manage_inventory_adjustment_edit.variable.custom.buyerRefCheck.data().length > 0){
					alert("The choosen order number has waiting receipt transactions.");
					$("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no").setVal("");
					return false;
				}
				if($("#manage_inventory_adjustment_edit_supplier_code").getVal() == ""){
					alert("Please choose supplier to select order number.");
					$("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no").setVal("");
					return false;
				}
				if($("#manage_inventory_adjustment_edit_supplier_location_code").getVal() == ""){
					alert("Please choose supplier location to select order number.");
					$("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no").setVal("");
					return false;
				}
				if($("#manage_inventory_adjustment_edit_to_warehouse_id").getVal() == ""){
					alert("Please choose warehouse to select order number.");
					$("#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no").setVal("");
					return false;
				}
				manage_inventory_adjustment_edit.variable.custom.buyerRefDetail = mserviceUtilities.getTransportDataSource({
					applicationName: "common_modules",
					serviceName: "retrieve_listof_values_for_searchcondition",
					outputPath: "context/outputparam",
					inputParameter: {
						p_inputparam_xml: "<inputparam><lov_code_type>'SYS_MAPPED_BUYER_REF_DETAIL_LIST'</lov_code_type><search_field_1>#manage_inventory_adjustment_edit_sys_mapped_buyer_ref_no</search_field_1><search_field_2>#manage_inventory_adjustment_edit_supplier_code</search_field_2><search_field_3>#manage_inventory_adjustment_edit_supplier_location_code</search_field_3><search_field_4>#manage_inventory_adjustment_edit_to_warehouse_id</search_field_4></inputparam>"
					}
				});
				manage_inventory_adjustment_edit.variable.custom.buyerRefDetail.read();
				manage_inventory_adjustment_edit.variable.custom.buyerRefDetail.data();
				manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data([]);
				manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data(manage_inventory_adjustment_edit.variable.custom.buyerRefDetail.data());
			} else {
				manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.data([]);
			}
		}
	},
	customRequirementHandler: {
		allowTransactionChange: function () {
			if (manage_inventory_adjustment_edit.variable.custom.datasource_1.data().length == 0) {
				$("#manage_inventory_adjustment_edit_adj_txn_datetime").setVal($("#manage_inventory_adjustment_edit_adj_txn_datetime").getVal());
				$("#manage_inventory_adjustment_edit_adj_txn_category").enable();
				$("#manage_inventory_adjustment_edit_from_warehouse_id").enable();
				$("#manage_inventory_adjustment_edit_to_warehouse_id").enable();
			} else {
				$("#manage_inventory_adjustment_edit_adj_txn_datetime").setVal($("#manage_inventory_adjustment_edit_adj_txn_datetime").getVal());
				$("#manage_inventory_adjustment_edit_adj_txn_category").disable();
				$("#manage_inventory_adjustment_edit_from_warehouse_id").disable();
				$("#manage_inventory_adjustment_edit_to_warehouse_id").disable();
			}
		},
		getFilterValues: function () {
			return $("#manage_inventory_adjustment_edit_content_1").getInputparamXML({
				screenID: "manage_inventory_adjustment_edit",
				matchCondition: ["_filter"]
			});
		},
		setSelectedRecord: function () {
			manage_inventory_adjustment_edit.variable.custom.selectedRecord = manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.getByUid(manage_inventory_adjustment_edit.variable.custom.grid_1.select().data("uid"));
		},
		dataSourceParse : function (response) {
			var parseResponse;
			var parseAdditionalResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					manage_inventory_adjustment_edit.variable.custom.header_1_record = JSON.parse(WebAPIProxy.MJSONEncode(response.outputparam_header.p_inventory_adjustment_header_json));
					if (response.outputparam_detail_items != undefined) {
						if (response.outputparam_detail_items.length != undefined) {
							var itemData = response.outputparam_detail_items ; 
							parseResponse = [];
							for (index = 0; index < itemData.length; index++) {
								for (key in itemData[index]) {
									parseResponse.push(JSON.parse(WebAPIProxy.MJSONEncode(itemData[index][key])));
								}
							}
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
			currentConfig = webConfigurationEngine.getUiConfigurationObject("manage_inventory_adjustment_edit");
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
			currentConfig = webConfigurationEngine.getUiConfigurationObject("manage_inventory_adjustment_edit");
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
	variable: {
		standard: {
			reorderParam: [{
					contentID: "content_1",
					columnLength: 3
				}
			],
			exportConfiguration: {
				mode: "single",
				content: [{
						exportType: "grid",
						fieldId: "manage_inventory_adjustment_edit_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			},
			printConfiguration: {
				mode: "single",
				content: [{
						type: "grid",
						fieldId: "manage_inventory_adjustment_edit_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			}
		},
		custom: {
			customDelete: true
		}
	}
};
