var manage_stock_ledger = {
	constructScreen: function () {
		manage_stock_ledger.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "report_information_for_custom_report_builder",
			outputPath : "context/outputparam_detail",
			inputParameter : {
				p_report_code : "'retrieve_stock_ledger'",
				p_inputparam_xml : "manage_stock_ledger.customRequirementHandler.getFilterValues()"
			},
			screenID : "manage_stock_ledger",
			processResponse : true
		});
		manage_stock_ledger.variable.custom.datasource_2 = new kendo.data.DataSource({
			transport : {
				read : {
					url : mserviceUtilities.getWebserverpath() + "common/components/convertHtml2Pdf/ConvertHtml2PDFWeb.aspx",
					dataType : "json",
					method : "post",
					contentType : "application/json;charset=utf-8",
					async : false,
					complete : function (data, response) {
						if (response == "success") {
							manage_stock_ledger.variable.custom.response = JSON.parse(data.responseText);
						}
					}
				},
				parameterMap : function () {
					return mserviceUtilities.getTransportParameter({
						inputparam : {
							p_input_html_string : "$manage_stock_ledger.customRequirementHandler.getLedgerPdfContent()",
							p_output_file_path : "'content_store\\" + login_profile.client_id + "\\" + login_profile.country_code + "\\stock_ledger_attachments\\" + "stock_ledger" + "'",
							p_output_file_name : "'StockLedgerReport.pdf'"
						}
					})
				},
			},
			schema : {
				parse : function (response) {
					return [response];
				}
			}
		});
		if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_stock_ledger_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
			mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_stock_ledger_" + login_profile.client_id + ".js"]);
		};
	},
	postConstruct : function () {
		manage_stock_ledger_filterArea = $("#manage_stock_ledger_pane2");
		$("#manage_stock_ledger_content_1 span dt").removeClass("term_one");
		$("#manage_stock_ledger_content_1 span dd.colen").html("");
		$("#manage_stock_ledger_content_1").find('dt').css("width","120px");
		setTimeout(function(){
			manage_stock_ledger_splitter[manage_stock_ledger_filterArea.width() > 0 ? "collapse" : "expand"](manage_stock_ledger_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_stock_ledger_content_1",
					screenID : "manage_stock_ledger",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_stock_ledger_content_1",
				screenID : "manage_stock_ledger",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets: function () {
		$("#manage_stock_ledger_editor").kendoMenu();
		manage_stock_ledger_splitter = $("#manage_stock_ledger_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			]
		}).data("kendoSplitter");
	},
	buttonEventHandler: {
		crud_btn_click: function (element, event) {
			if (manage_stock_ledger.variable.custom.crudIndicator == "R") {
				manage_stock_ledger.variable.custom.datasource_1.read();
				if(typeof(fn_manage_stock_ledger_displayDataTemplate) === "function"){
					return fn_manage_stock_ledger_displayDataTemplate();
				} else {
					var dataSource = new kendo.data.DataSource({
						data : manage_stock_ledger.variable.custom.datasource_1._pristineData
					});
					dataSource.group({ field: "fiscal_year" });
					var fiscalYearView = dataSource.view();
					var content = "<style> table, th, td { padding:7px; } </style><table width='100%' style='border:none !important; text-align:center; font-weight:bold; page-break-inside:avoid; padding-top:10px; table-layout: fixed; word-wrap: break-word; font-size: x-large; border-collapse:collapse;'><tr style='border:none !important;'><td colspan='100' style='color: darkblue; border:none !important;'>Stock Ledger Report</td></tr></table>";
					content += "<style>ul, #treeview { list-style-type: none; } #treeview { margin: 0; padding: 0; } .caret { cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .caret::before { content: '\\002B'; color: black; display: inline-block; margin: 8px; border: 2px solid; padding: 2px; padding-top: 0px; padding-bottom: 0px; font-size: x-small; vertical-align: 2px; } .caret-down::before { content: '\\2212'; border: 2px solid; padding: 2.5px; padding-top: 0px; padding-bottom: 0px; font-size: xx-small; vertical-align: 2px;} .nested { display: none; } .active { display: block; }</style>";
					for(var r=0; r < fiscalYearView.length ; r++){
						content += "<table width='100%' style='border:none !important;text-align:left; font-weight:bold; page-break-inside:avoid; padding-top:10px; table-layout: fixed; word-wrap: break-word; font-size: large; border-collapse:collapse; margin-top:1%; margin-left:2%'><tr style='border:none !important;'><td colspan='100' style='color: darkblue; border:none !important;'>Fiscal Year : " + fiscalYearView[r].value + "</td></tr></table>";
						var dataSourceItemCode = new kendo.data.DataSource({
							data: fiscalYearView[r].items
						});
						dataSourceItemCode.group({ field: "item_code" });
						var itemCodeView = dataSourceItemCode.view();
						for(var k=0; k < itemCodeView.length; k++){
							var dataSourceVariantCode = new kendo.data.DataSource({
								data: itemCodeView[k].items
							});
							dataSourceVariantCode.group({ field: "variant_code" });
							var variantCodeView = dataSourceVariantCode.view();
							for(var l=0; l < variantCodeView.length; l++){
								var openingBalance = 0.0000;
								var closingBalance = 0.0000;
								var dataSourceWarehouseId = new kendo.data.DataSource({
									data: variantCodeView[l].items
								});
								dataSourceWarehouseId.group({ field: "warehouse_id" });
								var warehouseIdView = dataSourceWarehouseId.view();
								for(var z=0; z < warehouseIdView.length; z++){
									if(warehouseIdView[z].items[0].open_bal_ind == "1"){
										openingBalance = openingBalance + parseFloat(warehouseIdView[z].items[0].balance_quantity);
									}
									closingBalance = closingBalance + parseFloat(warehouseIdView[z].items[warehouseIdView[z].items.length-1].balance_quantity);
								}
								content += "<ul style='margin-left:4%;' id='treeview'><li><span style='color: darkblue; display: inline-table; width: 37.5%;' class='caret'><div style='display: table-cell; width: 100%; line-height: 20px;'>" + itemCodeView[k].value + " [" + itemCodeView[k].items[0].item_code_desc + "]" + " - " + variantCodeView[l].value + "</div></span><span style='color: darkblue; display: inline-block; width: 18%; text-align: right;'>Opening Balance </span><span style='color: darkblue; display: inline-block; width: 8%; text-align: right;'>" +  parseFloat(openingBalance).toFixed(4) + "</span><span style='color: darkblue; display: inline-block; width: 18%; text-align: right;'>Closing Balance</span><span style='color: darkblue; display: inline-block; width: 8%; text-align: right;'>" + parseFloat(closingBalance).toFixed(4) + "</span><ul style='padding-inline-start: 40px;' class='nested'>";	
								for(var i=0; i < warehouseIdView.length; i++){
									var openingBalanceWH = 0.0000;
									if(warehouseIdView[i].items[0].open_bal_ind == "1"){
										openingBalanceWH = openingBalanceWH + parseFloat(warehouseIdView[i].items[0].balance_quantity);
									}
									content += "<ul id='treeview'><li><span style='font-weight: bold; color: deeppink; display: inline-block; width: 36.2%;' class='caret'>" + warehouseIdView[i].value + " - " + warehouseIdView[i].items[0].warehouse_id_desc + "</span><span style='font-weight: bold; color: deeppink; display: inline-block; width: 18%; text-align: right;'>Opening Balance </span><span style='font-weight: bold; color: deeppink; display: inline-block; width: 8%; text-align: right;'>" +   parseFloat(openingBalanceWH).toFixed(4) + "</span><span style='font-weight: bold; color: deeppink; display: inline-block; width: 19%; text-align: right;'>Closing Balance</span><span style='font-weight: bold; color: deeppink; display: inline-block; width: 8%; text-align: right;'>" + warehouseIdView[i].items[warehouseIdView[i].items.length-1].balance_quantity + "</span><ul class='nested'>";
									content += "<table width='100%' style='color: chocolate; page-break-inside:avoid; padding-top:10px; table-layout: fixed; word-wrap: break-word; font-size: 90%;border-collapse:collapse;'>";
									content += "<tr style='font-weight:bold;'><td colspan='5'></td><td style='border-bottom-style: solid; border-width: thin;' colspan='72'><span style='float:right;'></span></td><td colspan='8' style='border-bottom-style: solid; border-width: thin; text-align:right; word-break: break-word;'></td><td colspan='15'></td></tr>";
									content += "<tr style='font-weight:bold;text-align:center;'><td colspan='13'></td><td colspan='9'>Date</td><td colspan='36'>Particulars</td><td colspan='5'>UOM</td><td style='text-align: end;' colspan='7'>Credit</td><td style='text-align: end;' colspan='7'>Debit</td><td style='text-align: end;' colspan='8'>Balance</td><td colspan='15'></td></tr>";
									for(j=0; j < warehouseIdView[i].items.length; j++){
										if(warehouseIdView[i].items[j].open_bal_ind != "1"){
											content += "<tr><td colspan='13'></td><td style='text-align:center;' colspan='9'>" + warehouseIdView[i].items[j].transaction_date_time + "</td><td style='padding-left: 30px;' colspan='36'>" + warehouseIdView[i].items[j].transaction_particulars + "</td><td style='text-align:center;' colspan='5'>" + warehouseIdView[i].items[j].uom_code + "</td><td style='text-align:right;' colspan='7'>" + warehouseIdView[i].items[j].credit_quantity + "</td><td style='text-align:right;' colspan='7'>" + warehouseIdView[i].items[j].debit_quantity + "</td><td style='text-align:right;' colspan='8'>" + warehouseIdView[i].items[j].balance_quantity + "</td><td colspan='15'></td></tr>";
										}								
									}
									content += "<tr style='font-weight:bold;'><td colspan='5'></td><td style='border-top-style: solid; border-width: thin;' colspan='72'><span style='float:right;'></span></td><td colspan='8' style='border-top-style: solid; border-width: thin; text-align:right; word-break: break-word;'></td><td colspan='15'></td></tr></table></br>";
									content += "</ul></li></ul>";
								}
								content += "</ul></li></ul>";						
							}
						}
					}
					$('#manage_stock_ledger_data_1').attr("style", "height: 500px; width: 100%; overflow-y: scroll;").html("<div style='margin:2%;'>" + content + "</div>");
					setTimeout(function(){
						manage_stock_ledger.variable.custom.toggler = document.getElementsByClassName("caret");
						for (var i = 0; i < manage_stock_ledger.variable.custom.toggler.length; i++) {
						  manage_stock_ledger.variable.custom.toggler[i].addEventListener("click", function() {
							this.parentElement.querySelector(".nested").classList.toggle("active");
							this.classList.toggle("caret-down");
						  });
						}
					}, 10);
				}
			}
		},
	    misc_btn_click : function (element, event){
			if(manage_stock_ledger.variable.custom.miscID == "filters"){
				manage_stock_ledger_splitter[manage_stock_ledger_filterArea.width() > 0 ? "collapse" : "expand"](manage_stock_ledger_filterArea);
			};
			if(manage_stock_ledger.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_stock_ledger_content_1",
					screenID : "manage_stock_ledger",
					matchCondition : ["_filter"]
				});
				$("#manage_stock_ledger_filters_btn .k-i-filter").css("color","black");
			};
			if(manage_stock_ledger.variable.custom.miscID == "pdf_download"){
				if(manage_stock_ledger.variable.custom.datasource_1.data().length != 0){
					if(typeof(fn_manage_stock_ledger_pdfDownloadTemplate) === "function"){
						return fn_manage_stock_ledger_pdfDownloadTemplate();
					} else {
						manage_stock_ledger.variable.custom.datasource_2.read();
						if (manage_stock_ledger.variable.custom.response.status == "success") {
							$("#manage_stock_ledger_footer").append("<a id='manage_stock_ledger_pdf_anchor' href='" + getWebserverpath() + "content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/stock_ledger_attachments/" + "stock_ledger" + "/" + "StockLedgerReport.pdf"+ "' download='StockLedgerReport.pdf'>");
							document.getElementById("manage_stock_ledger_pdf_anchor").click();
							document.getElementById("manage_stock_ledger_pdf_anchor").remove();
						} else {
							mserviceUtilities.deleteFile("stock_ledger_attachments/" + "stock_ledger" + "/" + "StockLedgerReport.pdf");
							alert("Please contact your support desk.");
							return false;
						}
					}
				} else {
					alert("No record to perform PDF download.");
					return false;
				}
			};
		}
	},
	customRequirementHandler: {
		getFilterValues: function () {
			return $("#manage_stock_ledger_content_1").getInputparamXML({
				screenID: "manage_stock_ledger",
				matchCondition: ["_filter"]
			});
		},
		setSelectedRecord: function () {
			manage_stock_ledger.variable.custom.selectedRecord = {};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_stock_ledger_export_btn"){
				return {
					type : "csv",
					template : "retrieve_stock_ledger",
					service : "sp_report_information_for_custom_report_builder",
					request : "<signature><i_inputparam_xml>" + manage_stock_ledger.customRequirementHandler.getFilterValues() + "</i_inputparam_xml><i_report_code>" + "retrieve_stock_ledger" + "</i_report_code><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_stock_ledger.variable.custom.datasource_1.data().length
				};
			}
		},
		getLedgerPdfContent: function () {
			var excelDataSource = manage_stock_ledger.variable.custom.datasource_1._pristineData;
			var content = "<!DOCTYPE html><html><head>";
			content += "<style>table { page-break-after:auto } tr { page-break-inside:avoid; page-break-after:auto } thead { display:table-header-group }tfoot { display:table-footer-group } td { padding:10px } </style>";
			content += "</head><body>";
			content += "<div style='width:1320px; font-size: medium;'>";
			content += "<mserviceheader>";
			content += "<div style='font-weight: bold; height:50px; text-align: center; font-size: medium;'>Stock Ledger Report</div>";
			content += "<hr style='margin-left:6px; margin-bottom:5px;'/>";
			content += "</mserviceheader>";
			content += "<div style='padding-top:10px;'>";
			content += "<table width='100%' border='1px' style='table-layout: fixed; word-wrap: break-word; font-size: medium;border-collapse:collapse;'><thead style='margin-bottom:5px;margin-top:10px;'><tr style='height:10px;'></tr><tr><td style='font-weight:bold; width:80px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Fiscal Year</td><td style='font-weight:bold; width:120px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Item Code</td><td style='font-weight:bold; width:120px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Item Description</td><td style='font-weight:bold; width:120px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Variant Code</td><td style='font-weight:bold; width:200px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Warehouse</td><td style='font-weight:bold; width:80px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Date</td><td style='font-weight:bold; width:300px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Particulars</td><td style='font-weight:bold; width:80px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>UOM</td><td style='font-weight:bold; width:80px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Credit</td><td style='font-weight:bold; width:80px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Debit</td><td style='font-weight:bold; width:80px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>Balance</td></tr></thead>";
			for(i=0;i < excelDataSource.length; i++){
				content += "<tr><td style='font-weight:bold; width:80px; text-align:center; height:40px; background-color:lightgreen; vertical-align: middle;'>" + excelDataSource[i].fiscal_year + "</td><td>" + excelDataSource[i].item_code + "</td><td>" + excelDataSource[i].item_code_desc + "</td><td>" + excelDataSource[i].variant_code + "</td><td>" + excelDataSource[i].warehouse_id + " - " + excelDataSource[i].warehouse_id_desc + "</td><td>" + excelDataSource[i].transaction_date_time + "</td><td>" + excelDataSource[i].transaction_particulars + "</td><td>" + excelDataSource[i].uom_code + "</td><td>" + excelDataSource[i].credit_quantity + "</td><td>" + excelDataSource[i].debit_quantity + "</td><td>" + excelDataSource[i].balance_quantity + "</td></tr>"
			}
			content += "</table>";	
			content += "</div>";
			content += "<mservicefooter>";
			content += "<hr style='margin-left:6px;' />";
			content += "<div style='margin-top:2px;text-align: center; font-size: medium;'></div>";
			content += "<div style='text-align:right'>Page: <span class='page'>1</span>&#160; of &#160;<span class='topage'>1</div>";
			content += "</mservicefooter>";
			content += "</div></body></html>";
			return content;
		}
	},
	variable: {
		standard: {
			reorderParam: [{
					contentID: "content_1",
					columnLength: 1
				}
			]
		},
		custom: {}
	}
};