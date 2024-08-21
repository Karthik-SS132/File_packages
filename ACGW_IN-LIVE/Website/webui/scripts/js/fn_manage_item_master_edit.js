var manage_item_master_edit = {
	constructScreen: function () {
		manage_item_master_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName: "mservice",
				serviceName: "retrieve_item_master_details",
				outputPath: false,
				pageSize: 10,
				inputParameter: {
					p_item_code: "$manage_item_master.variable.custom.selectedRecord.item_code",
					p_item_variant_code: "$manage_item_master.variable.custom.selectedRecord.variant_code"
				},
				schemaModel: true,
				screenID: "manage_item_master_edit",
				dataSourceName: "datasource_1",
				processResponse: true,
				parse: manage_item_master_edit.customRequirementHandler.dataSourceParse
			});
		manage_item_master_edit.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "validate_key_field",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_screen_name: "'ITEMCODE'",
					p_validation_field_1: "#manage_item_master_edit_item_code",
					p_validation_field_2: "#manage_item_master_edit_variant_code",
					p_validation_field_3: "",
					p_validation_field_4: "",
					p_validation_field_5: "",
					p_validation_field_6: "",
					p_validation_field_7: "",
					p_validation_field_8: "",
					p_validation_field_9: "",
					p_validation_field_10: "",
				},
				screenID: "manage_item_master_edit",
			});
		if (manage_item_master.variable.custom.crudIndicator == "U" || manage_item_master.variable.custom.crudIndicator == "V") {
			manage_item_master_edit.variable.custom.datasource_1.read();
			manage_item_master_edit.variable.custom.item_type_description_defaultValue = mserviceUtilities.getDescriptionForCode("ITEMTYPE_DESC", manage_item_master_edit.variable.custom.header_1_record.item_type, "");
			manage_item_master_edit.variable.custom.item_category_description_defaultValue = mserviceUtilities.getDescriptionForCode("ITEMCATG_LIST", manage_item_master_edit.variable.custom.header_1_record.item_category, "");
			manage_item_master_edit.variable.custom.org_level_no_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELNO_LIST", manage_item_master_edit.variable.custom.header_1_record.organogram_level_no, "");
			manage_item_master_edit.variable.custom.org_level_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELCODE_LIST", manage_item_master_edit.variable.custom.header_1_record.organogram_level_code, "");
		}
	},
	postConstruct: function () {
		if (login_profile.item_variant_ind == "0") {
			$("#manage_item_master_edit_variant_code").setVal("NA");
			$("#manage_item_master_edit_variant_description").setVal("Not Applicable");
			$("#manage_item_master_edit_variant_code_group").hide();
			$("#manage_item_master_edit_variant_description_group").hide();
		};
		if (login_profile.lot_batch_ind == "0") {
			$("#manage_item_master_edit_lot_batch_ind_group").hide();
		};
		if (login_profile.expiry_date_ind == "0") {
			$("#manage_item_master_edit_expiry_date_ind_group").hide();
		};
		if (manage_item_master.variable.custom.crudIndicator == "V") {
			$("#manage_item_master_edit_add_btn").hide();
			$("#manage_item_master_edit_delete_btn").hide();
		}
	},
	initializeWidgets: function () {
		$("#manage_item_master_edit_item_category").initializeWDropdownlist({
			screenID: "manage_item_master_edit",
			dataSource: {
				informationType: "'ITEMCATG_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			childFieldID: "manage_item_master_edit_item_type",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.item_category",
			defaultValueDescription: "$manage_item_master_edit.variable.custom.item_type_description_defaultValue",
			template: "description"
		});
		$("#manage_item_master_edit_item_type").initializeWDropdownlist({
			screenID: "manage_item_master_edit",
			dataSource: {
				informationType: "'ITEMTYPE_LIST_LINKED'",
				searchField1: "#manage_item_master_edit_item_category",
			},
			dataTextField: "description",
			dataValueField: "code",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.item_type",
			defaultValueDescription: "$manage_item_master_edit.variable.custom.item_type_description_defaultValue",
			template: "description"
		});
		$("#manage_item_master_edit_item_code").initializeWTextbox({
			screenID: "manage_item_master_edit",
			maxlength: "30",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.item_code",
		});
		$("#manage_item_master_edit_item_description").initializeWTextbox({
			screenID: "manage_item_master_edit",
			maxlength: "255",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.item_description"
		});
		$("#manage_item_master_edit_variant_code").initializeWTextbox({
			screenID: "manage_item_master_edit",
			maxlength: "30",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.variant_code"
		});
		$("#manage_item_master_edit_variant_description").initializeWTextbox({
			screenID: "manage_item_master_edit",
			maxlength: "255",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.variant_description"
		});
		$("#manage_item_master_edit_org_level_no").initializeWDropdownlist({
			screenID: "manage_item_master_edit",
			dataSource: {
				informationType: "'ORGLEVELNO_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			childFieldID: "manage_item_master_edit_org_level_code",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.organogram_level_no",
			defaultValueDescription: "$manage_item_master_edit.variable.custom.org_level_no_defaultValueDescription"
		});
		$("#manage_item_master_edit_org_level_code").initializeWDropdownlist({
			screenID: "manage_item_master_edit",
			dataSource: {
				informationType: "'ORGLEVELCODE_LIST'",
				searchField1: "#manage_item_master_edit_org_level_no",
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.organogram_level_code",
			defaultValueDescription: "$manage_item_master_edit.variable.custom.org_level_code_defaultValueDescription"
		});
		$("#manage_item_master_edit_lot_batch_ind").initializeWCheckbox({
			screenID: "manage_item_master_edit",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.lot_batch_appl_ind"
		});
		$("#manage_item_master_edit_expiry_date_ind").initializeWCheckbox({
			screenID: "manage_item_master_edit",
			defaultValue: "$manage_item_master_edit.variable.custom.header_1_record.expiry_date_appl_ind"
		});
		manage_item_master_edit.variable.custom.grid_1 = $("#manage_item_master_edit_grid_1").initializeWGrid({
				screenID: "manage_item_master_edit",
				toolbar: "#manage_item_master_edit_grid_1_toolbar_template",
				dataSource: manage_item_master_edit.variable.custom.datasource_1,
				height: 400,
				pageSize: 10
			});
		manage_item_master_edit.variable.custom.grid_1.refresh();
	},
	refreshScreen: function () {
		manage_item_master_edit.variable.custom.grid_1.dataSource.pageSize(10);
	},
	widgetEventHandler: {
		variant_code_change: function (element, event) {
			manage_item_master_edit.customRequirementHandler.itemVariantValidation(element);
		},
		item_code_change: function (element, event) {
			manage_item_master_edit.customRequirementHandler.itemVariantValidation(element);
		}
	},
	buttonEventHandler: {
		crud_btn_click: function (element, event) {
			if (manage_item_master_edit.variable.custom.crudIndicator == "D") {
				manage_item_master_edit.variable.custom.grid_1.dataSource.remove(manage_item_master_edit.variable.custom.selectedRecord);
			} else if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_item_master_edit_child.js"])) {
				webNavigationController.gotoNextScreen({
					screenID: "manage_item_master_edit",
					fieldID: "manage_item_master_edit_child_window",
					nextScreenID: "manage_item_master_edit_child",
					nextScreenName: manage_item_master_edit.variable.custom.nextScreenName,
					execute: manage_item_master_edit_child.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		submit_btn_click: function (element, event) {
			if (manage_item_master_edit.variable.custom.grid_1.dataSource.data().length != 0) {
				var returnValue,
				recordTimeStamp,
				inputparamItemRate,
				detailRecordCounter;
				inputparamItemRate = [];
				recordTimeStamp = "00000000-0000-0000-0000-000000000000";
				if (manage_item_master.variable.custom.crudIndicator == "U") {
					recordTimeStamp = manage_item_master_edit.variable.custom.header_1_record.rec_tstamp;
				};
				for (detailRecordCounter = 0; detailRecordCounter < manage_item_master_edit.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
					var inputparamDetailUDF = "<inputparam>";
					for(key in manage_item_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter]) {
						if(key.includes("udf")) {
							inputparamDetailUDF += "<" + key + ">" + WebAPIProxy.XMLEncode(manage_item_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key]) + "</" + key + ">";
						}
					}
					inputparamDetailUDF += "</inputparam>";
					inputparamItemRate.push({
						p_uom_code: manage_item_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].uom_code,
						p_std_rate: manage_item_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].std_rate,
						p_currency_code: manage_item_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].currency_code,
						p_reorder_level: manage_item_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].reorder_level,
						p_eoq: manage_item_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].eoq,
						p_purchase_amt_or_perc_ind: manage_item_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].purchase_amt_or_perc_ind,
						p_purchase_amt_or_perc: manage_item_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].purchase_amt_or_perc,
						p_inputparam_detail_xml: inputparamDetailUDF
					});
				};
				returnValue = executeService_save_item_master_details({
						p_item_code: $("#manage_item_master_edit_item_code").getVal(),
						p_item_variant_code: $("#manage_item_master_edit_variant_code").getVal(),
						p_item_description: $("#manage_item_master_edit_item_description").getVal(),
						p_item_variant_description: $("#manage_item_master_edit_variant_description").getVal(),
						p_item_udf_xml: $("#manage_item_master_edit_content_1").getInputparamXML({
							screenID: "manage_item_master_edit",
							matchCondition: ["manage_item_master_edit_item_master","manage_item_master_edit_udf","manage_item_master_edit_product_udf"]
						}),
						p_item_category: $("#manage_item_master_edit_item_category").getVal(),
						p_item_type: $("#manage_item_master_edit_item_type").getVal(),
						p_organogram_level_no: $("#manage_item_master_edit_org_level_no").getVal(),
						p_organogram_level_code: $("#manage_item_master_edit_org_level_code").getVal(),
						p_lot_batch_no_appl_ind: $("#manage_item_master_edit_lot_batch_ind").getVal(),
						p_expiry_date_appl_ind: $("#manage_item_master_edit_expiry_date_ind").getVal(),
						p_inputparam_header_xml: $("#manage_item_master_edit_content_1").getInputparamXML({
							screenID: "manage_item_master_edit",
							matchCondition: ["manage_item_master_edit_item_master","manage_item_master_edit_udf","manage_item_master_edit_product_udf"]
						}),
						p_save_mode: manage_item_master.variable.custom.crudIndicator,
						p_rec_tstamp: recordTimeStamp,
						inputparam_item_rate: inputparamItemRate
					});
				if (returnValue == "SP001") {
					alert("Item Details is saved successfully");
					return true;
				} else {
					alert("Saving of Item Details Failed");
					return false;
				}
			} else {
				alert("Please enter rate details.");
				return false;
			}
		}
	},
	customRequirementHandler: {
		setSelectedRecord: function () {
			manage_item_master_edit.variable.custom.selectedRecord = manage_item_master_edit.variable.custom.grid_1.dataSource.getByUid(manage_item_master_edit.variable.custom.grid_1.select().data("uid"));
		},
		dataSourceParse: function (response) {
			var parseResponse;
			if (response.document != undefined) {
				if (response.document.ApplicationException == undefined) {
					manage_item_master_edit.variable.custom.header_1_record = response.document.context.outputparam_header;
					if (response.document.context.outputparam_detail_item_rate != undefined) {
						if (response.document.context.outputparam_detail_item_rate.length != undefined) {
							parseResponse = response.document.context.outputparam_detail_item_rate;
						} else {
							parseResponse = [response.document.context.outputparam_detail_item_rate];
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
		itemVariantValidation: function (element) {
			if ($("#manage_item_master_edit_variant_code").getVal() != "" && $("#manage_item_master_edit_item_code").getVal() != "") {
				manage_item_master_edit.variable.custom.datasource_2.read();
				var keyValidation = manage_item_master_edit.variable.custom.datasource_2.data();
				if (keyValidation[0].p_valid_ind == "true") {
					alert("Data already exists.");
					$(element).setVal("");
				}
			}
		}
	},
	variable: {
		standard: {
			screenEditableIndicator: true,
			valueChangeIndicator: false,
			reorderParam: [{
					contentID: "content_1",
					columnLength: 3
				}
			],
			exportConfiguration: {
				mode: "single",
				content: [{
						exportType: "grid",
						fieldId: "manage_item_master_edit_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			},
			printConfiguration: {
				mode: "single",
				content: [{
						type: "grid",
						fieldId: "manage_item_master_edit_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			}
		},
		custom: {
			customDelete: true,
		}
	}
};
