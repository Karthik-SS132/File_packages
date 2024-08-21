var manage_salesinvoice_master_edit_child = {
	constructScreen : function () {
		manage_salesinvoice_master_edit_child.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				outputPath : "context/outputparam",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'GET_STANDARD_RATE'</lov_code_type><search_field_1>#manage_salesinvoice_master_edit_child_item_code</search_field_1><search_field_2>#manage_salesinvoice_master_edit_child_item_variant_code</search_field_2><search_field_3>#manage_salesinvoice_master_edit_child_uom</search_field_3></inputparam>"
				},
				screenID : "manage_salesinvoice_master_edit_child",
			});
		manage_salesinvoice_master_edit_child.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				outputPath : "context/outputparam",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'STOCKAVAILABILITYCHECK'</lov_code_type><search_field_1>#manage_salesinvoice_master_edit_child_item_code</search_field_1><search_field_2>#manage_salesinvoice_master_edit_child_item_variant_code</search_field_2><search_field_3>#manage_salesinvoice_master_edit_child_warehouse_code</search_field_3><search_field_4>#manage_salesinvoice_master_edit_child_uom</search_field_4></inputparam>"
				},
				screenID : "manage_salesinvoice_master_edit_child",
			});
		if (manage_salesinvoice_master_edit.variable.custom.crudIndicator == "U" || manage_salesinvoice_master_edit.variable.custom.crudIndicator == "V") {
			manage_salesinvoice_master_edit_child.variable.custom.headerRecord = manage_salesinvoice_master_edit.variable.custom.selectedRecord;
			manage_salesinvoice_master_edit_child.variable.custom.headerRecord.warehouse_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("STOCKWAREHOUSE_LIST", manage_salesinvoice_master_edit_child.variable.custom.headerRecord.warehouse_code, "");
			manage_salesinvoice_master_edit_child.variable.custom.headerRecord.quoted_quantity  = parseFloat(manage_salesinvoice_master_edit_child.variable.custom.headerRecord.net_quantity) + " " + manage_salesinvoice_master_edit_child.variable.custom.headerRecord.uom_code_description;
		}
	},
	postConstruct : function () {
		$("#manage_salesinvoice_master_edit_child_quoted_quantity_group").hide();
		if (manage_salesinvoice_master_edit.variable.custom.crudIndicator == "A") {
			$("#manage_salesinvoice_master_edit_child_standard_rate").setVal("0.00");
			$("#manage_salesinvoice_master_edit_child_amount").setVal("0.00");
		} else if(manage_salesinvoice_master_edit.variable.custom.crudIndicator == "U"){
			if(manage_salesinvoice_master_edit_child.variable.custom.headerRecord.warehouse_code == ""){
				$("#manage_salesinvoice_master_edit_child_quoted_quantity_group").show();
				$("#manage_salesinvoice_master_edit_child_uom").setVal("");
			}
		}
		if(manage_salesinvoice_master_edit.variable.custom.crudIndicator == "U" || manage_salesinvoice_master_edit.variable.custom.crudIndicator == "V"){
			var discountData = $.grep(manage_salesinvoice_master_edit.variable.custom.grid_2.dataSource.data(),function(data) {
				return data.item_code == $("#manage_salesinvoice_master_edit_child_item_code").getVal() && data.charge_code == "DISCOUNT";
			});
			if(discountData.length != 0){
				$("#manage_salesinvoice_master_edit_child_discount_type").setVal(discountData[0].percentage_amount_ind);
				if(discountData[0].percentage_amount_ind == "P"){
					$("#manage_salesinvoice_master_edit_child_discount_value").setVal(discountData[0].percentage);
				} else {
					manage_salesinvoice_master_edit_child.variable.custom.discount_value.max(discountData[0].amount);
					$("#manage_salesinvoice_master_edit_child_discount_value").setVal(discountData[0].amount);
				}
			}
		}
		if(login_profile.item_variant_ind == "0"){
			$("#manage_salesinvoice_master_edit_child_item_variant_code_group").hide();
		} else {
			$("#manage_salesinvoice_master_edit_child_item_variant_code_group").show();
		}
	},
	initializeWidgets : function () {
		$("#manage_salesinvoice_master_edit_child_item_code").initializeWCombobox({
			screenID : "manage_salesinvoice_master_edit_child",
			dataSource : {
				informationType : "'ITEMCODE_LIST'",
				searchField1 : "$manage_salesinvoice_master_edit_child.variable.custom.item_code_serverFilterValue",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			childFieldID : "manage_salesinvoice_master_edit_child_item_variant_code",
			defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.item_code",
			defaultValueDescription : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.item_description",
		});
		$("#manage_salesinvoice_master_edit_child_item_variant_code").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_edit_child",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_salesinvoice_master_edit_child_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			childFieldID : "manage_salesinvoice_master_edit_child_warehouse_code",
			defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.item_variant_code",
			defaultValueDescription : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.variant_description",
		});
		$("#manage_salesinvoice_master_edit_child_quoted_quantity").initializeWDisplayarea({
			screenID : "manage_salesinvoice_master_edit_child",
			defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.quoted_quantity",
		});
		$("#manage_salesinvoice_master_edit_child_warehouse_code").initializeWCombobox({
			screenID : "manage_salesinvoice_master_edit_child",
			dataSource : {
				informationType : "'STOCKWAREHOUSE_LIST_LINKED'",
				searchField1 : "#manage_salesinvoice_master_edit_child_item_code",
				searchField2 : "#manage_salesinvoice_master_edit_child_item_variant_code",
				searchField3 : "$login_profile.dealer_code"
			},
			dataTextField : "description",
			dataValueField : "code",
			childFieldID : "manage_salesinvoice_master_edit_child_uom",
			defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.warehouse_code",
			defaultValueDescription : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.warehouse_code_defaultValueDescription",
		});
		manage_salesinvoice_master_edit_child.variable.custom.uom = $("#manage_salesinvoice_master_edit_child_uom").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_edit_child",
			dataSource : {
				informationType : "'STOCKUOM_LIST'",
				searchField1 : "#manage_salesinvoice_master_edit_child_item_code",
				searchField2 : "#manage_salesinvoice_master_edit_child_item_variant_code",
				searchField3 : "#manage_salesinvoice_master_edit_child_warehouse_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.uom_code",
			defaultValueDescription : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.uom_code_description",
		});
		manage_salesinvoice_master_edit_child.variable.custom.quantity = $("#manage_salesinvoice_master_edit_child_quantity").initializeWNumerictextbox({
				screenID : "manage_salesinvoice_master_edit_child",
				format : "n2",
				minimum : "'0'",
				defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.net_quantity",
			});
		manage_salesinvoice_master_edit_child.variable.custom.standard_rate = $("#manage_salesinvoice_master_edit_child_standard_rate").initializeWDisplayarea({
				screenID : "manage_salesinvoice_master_edit_child",
				defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.std_rate",
			});
		manage_salesinvoice_master_edit_child.variable.custom.child_amount = $("#manage_salesinvoice_master_edit_child_amount").initializeWDisplayarea({
			screenID : "manage_salesinvoice_master_edit_child",
			defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.gross_amount",
		});
		manage_salesinvoice_master_edit_child.variable.custom.discount_type = $("#manage_salesinvoice_master_edit_child_discount_type").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_edit_child",
			dataSource :[{"description": "Amount", "code": "A"}, {"description": "Percentage", "code": "P"}],
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
		});
		manage_salesinvoice_master_edit_child.variable.custom.discount_value = $("#manage_salesinvoice_master_edit_child_discount_value").initializeWNumerictextbox({
			screenID : "manage_salesinvoice_master_edit_child",
			format : "n2",
			minimum : "'0'",
		});		
		$("#manage_salesinvoice_master_edit_child_addn_description").initializeWTextbox({
			screenID : "manage_salesinvoice_master_edit_child",
			maxlength : "500",
			defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.addn_description",
		});
		$("#manage_salesinvoice_master_edit_child_comment_block_1").initializeWTextarea({
			screenID : "manage_salesinvoice_master_edit_child",
			maxlength : "500",
			defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.comments_block_1",
		});
		$("#manage_salesinvoice_master_edit_child_comment_block_2").initializeWTextarea({
			screenID : "manage_salesinvoice_master_edit_child",
			maxlength : "500",
			defaultValue : "$manage_salesinvoice_master_edit_child.variable.custom.headerRecord.comments_block_2",
		});
	},
	customRequirementHandler : {
		partValidation : function () {
			var keyValidation = manage_salesinvoice_master_edit.variable.custom.grid_1.dataSource.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].uom_code == $("#manage_salesinvoice_master_edit_child_uom").getVal() && keyValidation[i].item_code == $("#manage_salesinvoice_master_edit_child_item_code").getVal() && keyValidation[i].warehouse_code == $("#manage_salesinvoice_master_edit_child_warehouse_code").getVal()) {
					alert("Part Details already exists.");
					$("#manage_salesinvoice_master_edit_child_uom").setVal("");
				}
			}
		},
		stockOnHand : function () {
			if ($("#manage_salesinvoice_master_edit_child_item_code").getVal() != "" && $("#manage_salesinvoice_master_edit_child_item_variant_code").getVal() != "" && $("#manage_salesinvoice_master_edit_child_warehouse_code").getVal() != "" && $("#manage_salesinvoice_master_edit_child_uom").getVal() != "") {
				manage_salesinvoice_master_edit_child.variable.custom.datasource_2.read();
				if (manage_salesinvoice_master_edit_child.variable.custom.datasource_2.data().length == 0) {
					$('.display_description[data-for = "manage_salesinvoice_master_edit_child_quantity"]').text("Stock On Hand : 0");
					manage_salesinvoice_master_edit_child.variable.custom.quantity.max("0");
				} else {
					manage_salesinvoice_master_edit_child.variable.custom.stock_availability = manage_salesinvoice_master_edit_child.variable.custom.datasource_2.data();
					$('.display_description[data-for = "manage_salesinvoice_master_edit_child_quantity"]').text("Stock On Hand : " + parseInt(manage_salesinvoice_master_edit_child.variable.custom.stock_availability[0].code));
					manage_salesinvoice_master_edit_child.variable.custom.quantity.max(manage_salesinvoice_master_edit_child.variable.custom.stock_availability[0].code);
					if ($("#manage_salesinvoice_master_edit_child_quantity").getVal() > manage_salesinvoice_master_edit_child.variable.custom.stock_availability[0].code) {
						$("#manage_salesinvoice_master_edit_child_quantity").setVal(manage_salesinvoice_master_edit_child.variable.custom.stock_availability[0].code);
					}
				}
			} else {
				$('.display_description[data-for = "manage_salesinvoice_master_edit_child_quantity"]').text("");
				manage_salesinvoice_master_edit_child.variable.custom.quantity.max("9999999999");
			}
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			if ($("#manage_salesinvoice_master_edit_child_uom").getVal() == "") {
				$("#manage_salesinvoice_master_edit_child_quantity").setVal("");
				$("#manage_salesinvoice_master_edit_child_standard_rate").setVal("0.00");
				$("#manage_salesinvoice_master_edit_child_amount").setVal("0.00");
				manage_salesinvoice_master_edit_child.variable.custom.discount_value.max("0.00");
				$("#manage_salesinvoice_master_edit_child_discount_value").setVal("0.00");
			}
			manage_salesinvoice_master_edit_child.customRequirementHandler.partValidation();
			manage_salesinvoice_master_edit_child.customRequirementHandler.stockOnHand();
		},
		warehouse_code_change : function (element, event) {
			manage_salesinvoice_master_edit_child.customRequirementHandler.stockOnHand();
		},
		item_variant_code_change : function (element, event) {
			manage_salesinvoice_master_edit_child.customRequirementHandler.stockOnHand();
		},
		uom_change : function (element, event) {
			manage_salesinvoice_master_edit_child.customRequirementHandler.partValidation();
			manage_salesinvoice_master_edit_child.customRequirementHandler.stockOnHand();
			if ($("#manage_salesinvoice_master_edit_child_item_code").getVal() != "" && $("#manage_salesinvoice_master_edit_child_uom").getVal() != "") {
				manage_salesinvoice_master_edit_child.variable.custom.datasource_1.read();
				if (manage_salesinvoice_master_edit_child.variable.custom.datasource_1.data().length == 0) {
					$("#manage_salesinvoice_master_edit_child_standard_rate").setVal("0.00");
				} else {
					manage_salesinvoice_master_edit_child.variable.custom.standardRate = manage_salesinvoice_master_edit_child.variable.custom.datasource_1.data();
					$("#manage_salesinvoice_master_edit_child_standard_rate").setVal(parseFloat(manage_salesinvoice_master_edit_child.variable.custom.standardRate[0].std_rate).toFixed(2));
					var amount = ((parseFloat(manage_salesinvoice_master_edit_child.variable.custom.standardRate[0].std_rate).toFixed(2)) * $("#manage_salesinvoice_master_edit_child_quantity").getVal());
					$("#manage_salesinvoice_master_edit_child_amount").setVal(parseFloat(amount).toFixed(2));
					if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() == "P"){
						manage_salesinvoice_master_edit_child.variable.custom.discount_value.max("100");
						if($("#manage_salesinvoice_master_edit_child_discount_value").getVal() > "100.00"){
							$("#manage_salesinvoice_master_edit_child_discount_value").setVal("100");
						}
					} else {
						manage_salesinvoice_master_edit_child.variable.custom.discount_value.max(parseFloat(amount).toFixed(2));
						if($("#manage_salesinvoice_master_edit_child_discount_value").getVal() > (parseFloat(amount).toFixed(2)).toString()){
							$("#manage_salesinvoice_master_edit_child_discount_value").setVal(parseFloat(amount).toFixed(2));
						}
					}
				}
			} else {
				$("#manage_salesinvoice_master_edit_child_quantity").setVal("");
				$("#manage_salesinvoice_master_edit_child_standard_rate").setVal("0.00");
				$("#manage_salesinvoice_master_edit_child_amount").setVal("0.00");
				manage_salesinvoice_master_edit_child.variable.custom.discount_value.max("0.00");
				$("#manage_salesinvoice_master_edit_child_discount_value").setVal("0.00");
			}
		},
		quantity_change : function (element, event) {
			manage_salesinvoice_master_edit_child.customRequirementHandler.stockOnHand();
			if ($("#manage_salesinvoice_master_edit_child_item_code").getVal() != "" && $("#manage_salesinvoice_master_edit_child_uom").getVal() != "") {
				manage_salesinvoice_master_edit_child.variable.custom.datasource_1.read();
				manage_salesinvoice_master_edit_child.variable.custom.standardRate = manage_salesinvoice_master_edit_child.variable.custom.datasource_1.data();
				var amount = ((parseFloat(manage_salesinvoice_master_edit_child.variable.custom.standardRate[0].std_rate).toFixed(2)) * $("#manage_salesinvoice_master_edit_child_quantity").getVal());
				$("#manage_salesinvoice_master_edit_child_amount").setVal(parseFloat(amount).toFixed(2));
				
				if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() == "P"){
					manage_salesinvoice_master_edit_child.variable.custom.discount_value.max("100");
					if($("#manage_salesinvoice_master_edit_child_discount_value").getVal() > "100.00"){
						$("#manage_salesinvoice_master_edit_child_discount_value").setVal("100");
					}
				} else {
					manage_salesinvoice_master_edit_child.variable.custom.discount_value.max(parseFloat(amount).toFixed(2));
					if($("#manage_salesinvoice_master_edit_child_discount_value").getVal() > (parseFloat(amount).toFixed(2)).toString()){
						$("#manage_salesinvoice_master_edit_child_discount_value").setVal(parseFloat(amount).toFixed(2));
					}
				}
			} else {
				$("#manage_salesinvoice_master_edit_child_amount").setVal("0.00");
				manage_salesinvoice_master_edit_child.variable.custom.discount_value.max("0.00");
				$("#manage_salesinvoice_master_edit_child_discount_value").setVal("0.00");
			}
		},
		discount_type_change : function (){
			if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() == ""){
				$("#manage_salesinvoice_master_edit_child_discount_value").setVal("0.00");
			} else if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() == "P"){
				manage_salesinvoice_master_edit_child.variable.custom.discount_value.max("100");
				if($("#manage_salesinvoice_master_edit_child_discount_value").getVal() > "100.00"){
					$("#manage_salesinvoice_master_edit_child_discount_value").setVal("100");
				}
			} else if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() == "A"){
				manage_salesinvoice_master_edit_child.variable.custom.discount_value.max($("#manage_salesinvoice_master_edit_child_amount").getVal());
					if($("#manage_salesinvoice_master_edit_child_discount_value").getVal() > $("#manage_salesinvoice_master_edit_child_amount").getVal()){
						$("#manage_salesinvoice_master_edit_child_discount_value").setVal($("#manage_salesinvoice_master_edit_child_amount").getVal());
					}
				
			} else {
				manage_salesinvoice_master_edit_child.variable.custom.discount_value.max("9999999999");
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if (($("#manage_salesinvoice_master_edit_child_quantity").getVal() != "0") && ($("#manage_salesinvoice_master_edit_child_quantity").getVal() > "0")) {
				if (manage_salesinvoice_master_edit.variable.custom.crudIndicator == "A") {
					manage_salesinvoice_master_edit.variable.custom.grid_1.dataSource.add({
						salesinvoice_item_sl_no : (manage_salesinvoice_master_edit.variable.custom.grid_1.dataSource.data().length + 1).toString(),
						item_code : $("#manage_salesinvoice_master_edit_child_item_code").getVal(),
						item_variant_code : $("#manage_salesinvoice_master_edit_child_item_variant_code").getVal(),
						warehouse_code : $("#manage_salesinvoice_master_edit_child_warehouse_code").getVal(),
						lot_batch_no : "NA",
						net_quantity : $("#manage_salesinvoice_master_edit_child_quantity").getVal().toString(),
						uom_code : $("#manage_salesinvoice_master_edit_child_uom").getVal(),
						std_rate : ($("#manage_salesinvoice_master_edit_child_standard_rate").getVal()).toString(),
						currency_code : $("#manage_salesinvoice_master_edit_currency_code").getVal(),
						item_description : mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_salesinvoice_master_edit_child_item_code").getVal(), ""),
						variant_description : mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_salesinvoice_master_edit_child_item_variant_code").getVal(), ""),
						addn_description : $("#manage_salesinvoice_master_edit_child_addn_description").getVal(),
						comments_block_1 : $("#manage_salesinvoice_master_edit_child_comment_block_1").getVal(),
						comments_block_2 : $("#manage_salesinvoice_master_edit_child_comment_block_2").getVal(),
						gross_amount : ($("#manage_salesinvoice_master_edit_child_amount").getVal()).toString(),
						prorated_tax_amount : $("#manage_salesinvoice_master_edit_taxAmount").text(),
						prorated_discount_amount : $("#manage_salesinvoice_master_edit_discountAmount").text(),
						last_update_timestamp : "00000000-0000-0000-0000-000000000000",
						uom_code_description : mserviceUtilities.getDescriptionForCode("ITEMUOM_LIST", $("#manage_salesinvoice_master_edit_child_uom").getVal(), ""),
						currency_code_description : mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", $("#manage_salesinvoice_master_edit_currency_code").getVal(), "")
					});
					
					if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() != "" && $("#manage_salesinvoice_master_edit_child_discount_value").getVal() != ""){
						var amount, applicableAmount, percentage;
						if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() == "A"){
							amount = ($("#manage_salesinvoice_master_edit_child_discount_value").getVal()).toString();
							percentage = "0.00";
							applicableAmount = "0.00";
						} else {
							percentage = ($("#manage_salesinvoice_master_edit_child_discount_value").getVal()).toString();
							applicableAmount = ($("#manage_salesinvoice_master_edit_child_amount").getVal()).toString();
							amount = ((parseFloat($("#manage_salesinvoice_master_edit_child_discount_value").getVal()) *  parseFloat($("#manage_salesinvoice_master_edit_child_amount").getVal()))/100).toString();
						}
						manage_salesinvoice_master_edit.variable.custom.grid_2.dataSource.add({
							item_code : $("#manage_salesinvoice_master_edit_child_item_code").getVal(),
							item_variant_code : $("#manage_salesinvoice_master_edit_child_item_variant_code").getVal(),
							item_description : mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_salesinvoice_master_edit_child_item_code").getVal(), ""),
							variant_description : mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_salesinvoice_master_edit_child_item_variant_code").getVal(), ""),
							charge_sl_no : (manage_salesinvoice_master_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
							addl_charge_ind : "D",
							charge_code : "DISCOUNT",
							percentage_amount_ind : $("#manage_salesinvoice_master_edit_child_discount_type").getVal(),
							percentage : percentage,
							applicable_on_amount : applicableAmount,
							amount : amount,
							currency_code : $("#manage_salesinvoice_master_edit_currency_code").getVal(),
							last_update_timestamp : "00000000-0000-0000-0000-000000000000",
							addl_charge_desc : "Discount",
							charge_description : "Discount",
							percentage_amount_ind_description : mserviceUtilities.getDescriptionForCode("PERCENTAMTINDICATOR_LIST",  $("#manage_salesinvoice_master_edit_child_discount_type").getVal(), "")
						});
					}
					
					if (typeof(fn_taxation_details_add_click) === "function") {
						fn_taxation_details_add_click();
					}

				} else {
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("salesinvoice_item_sl_no", manage_salesinvoice_master_edit_child.variable.custom.headerRecord.salesinvoice_item_sl_no);
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("item_code", $("#manage_salesinvoice_master_edit_child_item_code").getVal());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("item_variant_code", $("#manage_salesinvoice_master_edit_child_item_variant_code").getVal());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("warehouse_code", $("#manage_salesinvoice_master_edit_child_warehouse_code").getVal());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("lot_batch_no", "NA");
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("net_quantity", $("#manage_salesinvoice_master_edit_child_quantity").getVal().toString());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("uom_code", $("#manage_salesinvoice_master_edit_child_uom").getVal());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("std_rate", ($("#manage_salesinvoice_master_edit_child_standard_rate").getVal()).toString());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("currency_code", $("#manage_salesinvoice_master_edit_currency_code").getVal());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("item_description", mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_salesinvoice_master_edit_child_item_code").getVal(), ""));
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("variant_description", mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_salesinvoice_master_edit_child_item_variant_code").getVal(), ""));
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("addn_description", $("#manage_salesinvoice_master_edit_child_addn_description").getVal());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("comments_block_1", $("#manage_salesinvoice_master_edit_child_comment_block_1").getVal());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("comments_block_2", $("#manage_salesinvoice_master_edit_child_comment_block_2").getVal());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("gross_amount", ($("#manage_salesinvoice_master_edit_child_amount").getVal()).toString());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("prorated_tax_amount", $("#manage_salesinvoice_master_edit_taxAmount").text());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("prorated_discount_amount", $("#manage_salesinvoice_master_edit_discountAmount").text());
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("last_update_timestamp", manage_salesinvoice_master_edit_child.variable.custom.headerRecord.last_update_timestamp);
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("uom_code_description", mserviceUtilities.getDescriptionForCode("ITEMUOM_LIST", $("#manage_salesinvoice_master_edit_child_uom").getVal(), ""));
					manage_salesinvoice_master_edit_child.variable.custom.headerRecord.set("currency_code_description", mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", $("#manage_salesinvoice_master_edit_currency_code").getVal(), ""));
					
					var discountData = $.grep(manage_salesinvoice_master_edit.variable.custom.grid_2.dataSource.data(),function(data) {
						return data.item_code == $("#manage_salesinvoice_master_edit_child_item_code").getVal() && data.charge_code == "DISCOUNT";
					});
					
					if(discountData.length != 0){
						if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() != "" && $("#manage_salesinvoice_master_edit_child_discount_value").getVal() != ""){
							var amount, applicableAmount, percentage, percentageAmountInd, percentageAmountIndDesc;
							if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() == "A"){
								amount = ($("#manage_salesinvoice_master_edit_child_discount_value").getVal()).toString();
								percentage = "0.00";
								applicableAmount = "0.00";
								percentageAmountInd = "A";
								percentageAmountIndDesc = "Amount";
							} else {
								percentage = ($("#manage_salesinvoice_master_edit_child_discount_value").getVal()).toString();
								applicableAmount = ($("#manage_salesinvoice_master_edit_child_amount").getVal()).toString();
								amount = ((parseFloat($("#manage_salesinvoice_master_edit_child_discount_value").getVal()) *  parseFloat($("#manage_salesinvoice_master_edit_child_amount").getVal()))/100).toString();
								percentageAmountInd = "P";
								percentageAmountIndDesc = "Percentage";
							}
							discountData[0].set("percentage", percentage);
							discountData[0].set("applicable_on_amount", applicableAmount);
							discountData[0].set("amount", amount);
							discountData[0].set("percentage_amount_ind", percentageAmountInd);
							discountData[0].set("percentage_amount_ind_description", percentageAmountIndDesc);
						} else {
							manage_salesinvoice_master_edit.variable.custom.grid_2.dataSource.remove(discountData[0]);
							for (var index = 0; index < manage_salesinvoice_master_edit.variable.custom.grid_2.dataSource.data().length; index++) {
								manage_salesinvoice_master_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
							}
						}
					} else {
						if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() != "" && $("#manage_salesinvoice_master_edit_child_discount_value").getVal() != ""){
							var amount, applicableAmount, percentage;
							if($("#manage_salesinvoice_master_edit_child_discount_type").getVal() == "A"){
								amount = ($("#manage_salesinvoice_master_edit_child_discount_value").getVal()).toString();
								percentage = "0.00";
								applicableAmount = "0.00";
							} else {
								percentage = ($("#manage_salesinvoice_master_edit_child_discount_value").getVal()).toString();
								applicableAmount = ($("#manage_salesinvoice_master_edit_child_amount").getVal()).toString();
								amount = ((parseFloat($("#manage_salesinvoice_master_edit_child_discount_value").getVal()) *  parseFloat($("#manage_salesinvoice_master_edit_child_amount").getVal()))/100).toString();
							}
							manage_salesinvoice_master_edit.variable.custom.grid_2.dataSource.add({
								item_code : $("#manage_salesinvoice_master_edit_child_item_code").getVal(),
								item_variant_code : $("#manage_salesinvoice_master_edit_child_item_variant_code").getVal(),
								item_description : mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_salesinvoice_master_edit_child_item_code").getVal(), ""),
								variant_description : mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_salesinvoice_master_edit_child_item_variant_code").getVal(), ""),
								charge_sl_no : (manage_salesinvoice_master_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
								addl_charge_ind : "D",
								charge_code : "DISCOUNT",
								percentage_amount_ind : $("#manage_salesinvoice_master_edit_child_discount_type").getVal(),
								percentage : percentage,
								applicable_on_amount : applicableAmount,
								amount : amount,
								currency_code : $("#manage_salesinvoice_master_edit_currency_code").getVal(),
								last_update_timestamp : "00000000-0000-0000-0000-000000000000",
								addl_charge_desc : "Discount",
								charge_description : "Discount",
								percentage_amount_ind_description : mserviceUtilities.getDescriptionForCode("PERCENTAMTINDICATOR_LIST",  $("#manage_salesinvoice_master_edit_child_discount_type").getVal(), "")
							});
						}
					}					
					
					if (typeof(fn_taxation_details_edit_click) === "function") {
						fn_taxation_details_edit_click();
					}
					
				}
				alert("Part detail is saved successfully.");
				return true;
			} else {
				alert("Invalid Amount.");
				return false;
			}
		},
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {},
	}
};