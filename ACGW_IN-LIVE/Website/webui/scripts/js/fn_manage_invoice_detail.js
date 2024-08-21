var manage_invoice_detail = {
	constructScreen : function () {
		manage_invoice_detail.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_invoice_details",
				outputPath : false,
				pageSize : 10,
				inputParameter : {
					p_invoice_no : "$manage_invoice_header.variable.custom.selectedRecord.invoice_no"
				},
				processResponse : true,
				parse : manage_invoice_detail.customRequirementHandler.dataSourceParse
			});
		manage_invoice_detail.variable.custom.datasource_1.read();
		manage_invoice_detail.variable.custom.invoice_number_defaultValue = manage_invoice_detail.variable.custom.header_1_record.invoice_no;
		manage_invoice_detail.variable.custom.invoice_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
					dateString : manage_invoice_detail.variable.custom.header_1_record.invoice_date
				}), "dd-MM-yyyy");
		manage_invoice_detail.variable.custom.invoice_status_defaultValue = mserviceUtilities.getDescriptionForCode("INVOICESTATUS_DESC", manage_invoice_detail.variable.custom.header_1_record.invoice_status, "");
		manage_invoice_detail.variable.custom.company_location_defaultValue = mserviceUtilities.getDescriptionForCode("COMPANYLOCATION_DESC", manage_invoice_detail.variable.custom.header_1_record.company_location_code, "");
		manage_invoice_detail.variable.custom.invoice_category_defaultValue = mserviceUtilities.getDescriptionForCode("INVOICECATEGORY_DESC", manage_invoice_detail.variable.custom.header_1_record.invoice_category, "");
		manage_invoice_detail.variable.custom.invoice_type_defaultValue = mserviceUtilities.getDescriptionForCode("INVOICETYPE_DESC", manage_invoice_detail.variable.custom.header_1_record.invoice_type, "");
		manage_invoice_detail.variable.custom.division_defaultValue = manage_invoice_detail.variable.custom.header_1_record.division;
		manage_invoice_detail.variable.custom.dealer_code_defaultValue = manage_invoice_detail.variable.custom.header_1_record.dealer_code;
		manage_invoice_detail.variable.custom.dealer_name_defaultValue = manage_invoice_detail.variable.custom.header_1_record.dealer_name;
		manage_invoice_detail.variable.custom.dealer_address_defaultValue = manage_invoice_detail.variable.custom.header_1_record.dealer_address;
		manage_invoice_detail.variable.custom.net_amount_defaultValue = kendo.toString(kendo.parseFloat(manage_invoice_detail.variable.custom.header_1_record.net_amount), "n") + " " + manage_invoice_detail.variable.custom.header_1_record.currency_code;
	},
	initializeWidgets : function () {
		$("#manage_invoice_detail_invoice_number").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.invoice_number_defaultValue"
		});
		$("#manage_invoice_detail_invoice_date").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.invoice_date_defaultValue"
		});
		$("#manage_invoice_detail_invoice_status").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.invoice_status_defaultValue"
		});
		$("#manage_invoice_detail_company_location").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.company_location_defaultValue"
		});
		$("#manage_invoice_detail_invoice_category").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.invoice_category_defaultValue"
		});
		$("#manage_invoice_detail_invoice_type").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.invoice_type_defaultValue"
		});
		$("#manage_invoice_detail_division").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.division_defaultValue"
		});
		$("#manage_invoice_detail_dealer_code").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.dealer_code_defaultValue"
		});
		$("#manage_invoice_detail_dealer_name").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.dealer_name_defaultValue"
		});
		$("#manage_invoice_detail_dealer_address").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.dealer_address_defaultValue"
		});
		$("#manage_invoice_detail_net_amount").initializeWDisplayarea({
			screenID : "manage_invoice_detail",
			defaultValue : "$manage_invoice_detail.variable.custom.net_amount_defaultValue"
		});
		manage_invoice_detail.variable.custom.grid_1 = $("#manage_invoice_detail_grid_1").initializeWGrid({
				screenID : "manage_invoice_detail",
				toolbar : false,
				dataSource : manage_invoice_detail.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
		manage_invoice_detail.variable.custom.grid_1.refresh();
	},
	linkEventHandler : {
		expdoc_ref_no_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_expdoc_detail.js"])) {
				manage_expdoc_header = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								expdoc_ref_no : $(element).text()
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "manage_invoice_detail",
					nextScreenID : "manage_expdoc_detail",
					nextScreenName : $(element).text()
				});
				$("#manage_expdoc_detail_submit_btn").hide();
				$("#manage_expdoc_detail").enableViewMode();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		call_ref_no_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_edit.js"])) {
				manage_call_register = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								call_no : $(element).text()
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "manage_invoice_detail",
					nextScreenID : "manage_call_register_edit",
					nextScreenName : $(element).text()
				});
				$("#manage_call_register_edit_submit_btn").hide();
				$("#manage_call_register_edit").enableViewMode();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_invoice_detail.variable.custom.selectedRecord = manage_invoice_detail.variable.custom.grid_1.dataSource.getByUid(manage_invoice_detail.variable.custom.grid_1.select().data("uid"));
		},
		dataSourceParse : function (response) {
			var parseResponse;
			if (response.document != undefined) {
				if (response.document.ApplicationException == undefined) {
					manage_invoice_detail.variable.custom.header_1_record = response.document.context.outputparam_header;
					if (response.document.context.outputparam_detail != undefined) {
						if (response.document.context.outputparam_detail.length != undefined) {
							parseResponse = response.document.context.outputparam_detail;
						} else {
							parseResponse = [response.document.context.outputparam_detail];
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
			importConfiguration : {
				imformationType : 'invoice_detail'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_invoice_detail_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_invoice_detail_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
