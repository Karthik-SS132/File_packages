function fn_taxation_quotation_spares_add_click_pre() {
	var taxationDatasource = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS'</lov_code_type><search_field_1>#manage_quotation_master_spares_edit_child_item_code</search_field_1><search_field_2>#manage_quotation_master_spares_edit_child_item_variant_code</search_field_2><search_field_3>#manage_quotation_master_spares_edit_buyer_code</search_field_3><search_field_4>#manage_quotation_master_spares_edit_buyer_location</search_field_4></inputparam>"
		}
	});
	var stateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
		}
	});
	taxationDatasource.read();
	stateType.read();
	if (manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_spares_edit.variable.custom.buyerAddressObject.state) {
		if (stateType.data()[0].state_type == "UT") {
			var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
				return data.charge_code != "IGST" && data.charge_code != "SGST"
			});
		} else {
			var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
				return data.charge_code != "IGST" && data.charge_code != "UTGST"
			});
		}
	} else {
		var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
			return data.charge_code == "IGST"
		});
	}
	var discountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == $("#manage_quotation_master_spares_edit_child_item_code").getVal() && data.charge_code == "DISCOUNT";
	});
	if (discountData.length != 0) {
		var discountValue = discountData[0].amount;
	} else {
		var discountValue = "0.00";
	}
	var applicableAmount = parseFloat($("#manage_quotation_master_spares_edit_child_amount").getVal()) - parseFloat(discountValue);
	for (i = 0; i < hsnGstValues.length; i++) {
		var addObject = {
			item_code: $("#manage_quotation_master_spares_edit_child_item_code").getVal(),
			item_variant_code: $("#manage_quotation_master_spares_edit_child_item_variant_code").getVal(),
			item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_quotation_master_spares_edit_child_item_code").getVal(), ""),
			variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_quotation_master_spares_edit_child_item_variant_code").getVal(), ""),
			charge_sl_no: (manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
			addl_charge_ind: hsnGstValues[i].addl_charge_ind,
			charge_category : hsnGstValues[i].charge_category,
			charge_type : hsnGstValues[i].charge_type,
			charge_code: hsnGstValues[i].charge_code,
			percentage_amount_ind: "P",
			percentage: hsnGstValues[i].applicable_percentage,
			applicable_on_amount: (applicableAmount).toString(),
			amount: ((parseFloat(applicableAmount) * parseFloat(hsnGstValues[i].applicable_percentage)) / 100).toString(),
			currency_code: $("#manage_quotation_master_spares_edit_currency_code").getVal(),
			last_update_timestamp: "00000000-0000-0000-0000-000000000000",
			addl_charge_desc: hsnGstValues[i].addl_charge_desc,
			charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", hsnGstValues[i].charge_category, ""),
			charge_description: hsnGstValues[i].charge_description,
			percentage_amount_ind_description: "Percentage"
		};
		manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
	}
	
}

function fn_taxation_quotation_spares_add_click_post() {
	
	if (typeof(fn_taxation_quotation_spares_system_calc) === "function") {
		fn_taxation_quotation_spares_system_calc();
	}
	
	var addlDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
}

function fn_taxation_quotation_spares_tax_add_click_pre() {
	if($("#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_indicator").getVal() == "A"){
		var addlchargstaxationDatasource = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_searchcondition",
			outputPath: "context/outputparam",
			pageSize: 10,
			inputParameter: {
				p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS_ADDLCHRGS'</lov_code_type><search_field_1>#manage_quotation_master_spares_edit_child_taxdetails_item_code</search_field_1><search_field_2>#manage_quotation_master_spares_edit_child_taxdetails_item_variant_code</search_field_2><search_field_3>#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_category</search_field_3><search_field_4>#manage_quotation_master_spares_edit_buyer_code</search_field_4><search_field_5>#manage_quotation_master_spares_edit_buyer_location</search_field_5></inputparam>"
			}
		});
		var addlchargsstateType = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_searchcondition",
			outputPath: "context/outputparam",
			pageSize: 10,
			inputParameter: {
				p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
			}
		});
		addlchargstaxationDatasource.read();
		addlchargsstateType.read();
		if (manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_spares_edit.variable.custom.buyerAddressObject.state) {
			if (addlchargsstateType.data()[0].state_type == "UT") {
				var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
					return data.charge_code != "IGST" && data.charge_code != "SGST"
				});
			} else {
				var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
					return data.charge_code != "IGST" && data.charge_code != "UTGST"
				});
			}
		} else {
			var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
				return data.charge_code == "IGST"
			});
		}
		for (i = 0; i < addlchargshsnGstValues.length; i++) {
			var addObject = {
				item_code: $("#manage_quotation_master_spares_edit_child_taxdetails_item_code").getVal(),
				item_variant_code: $("#manage_quotation_master_spares_edit_child_taxdetails_item_variant_code").getVal(),
				item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_quotation_master_spares_edit_child_taxdetails_item_code").getVal(), ""),
				variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_quotation_master_spares_edit_child_taxdetails_item_variant_code").getVal(), ""),
				charge_sl_no: (manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
				addl_charge_ind: addlchargshsnGstValues[i].addl_charge_ind,
				charge_category : addlchargshsnGstValues[i].charge_category,
				charge_type : addlchargshsnGstValues[i].charge_type,
				charge_code: addlchargshsnGstValues[i].charge_code,
				percentage_amount_ind: "P",
				percentage: addlchargshsnGstValues[i].applicable_percentage,
				applicable_on_amount: $("#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_amount").getVal(),
				amount: ((parseFloat($("#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_amount").getVal()) * parseFloat(addlchargshsnGstValues[i].applicable_percentage)) / 100).toString(),
				currency_code: $("#manage_quotation_master_spares_edit_currency_code").getVal(),
				last_update_timestamp: "00000000-0000-0000-0000-000000000000",
				addl_charge_desc: addlchargshsnGstValues[i].addl_charge_desc,
				charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", addlchargshsnGstValues[i].charge_category, ""),
				charge_description: addlchargshsnGstValues[i].charge_description,
				percentage_amount_ind_description: "Percentage"
			};
			manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
		}
	}
}

function fn_taxation_quotation_spares_tax_add_click_post() {
	
	if (typeof(fn_taxation_quotation_spares_system_calc) === "function") {
		fn_taxation_quotation_spares_system_calc();
	}
	
	if(($("#manage_quotation_master_spares_edit_child_taxdetails_item_code").getVal() == "OVERALL") && ($("#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") && ($("#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_code").getVal() == "DISCOUNT")){

		var addlDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
		});
		if(addlDiscountData.length != 0){
			var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
				return data;
			});
			var taxAmount = 0.00;
			if (overallTaxAmount.length != 0) {
				for(var index = 0; index < overallTaxAmount.length; index++){
					taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
				}
			}
			
			var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat($("#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_amount").getVal());
			if (addlDiscountData.length != 0) {
				for (i = 0; i < addlDiscountData.length; i++) {
					if(addlDiscountData[i].percentage_amount_ind == "P"){
						var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
						addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
						addlDiscountData[i].set("amount", amount);
					} else {
						if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
							addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
						}
					}
				}
			}						
		}
	}
}

function fn_taxation_quotation_spares_import_add_click_pre(spreadsheetArray,importCounter) {
	var taxationDatasource = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS'</lov_code_type><search_field_1>'" + spreadsheetArray[importCounter].item_code +"'</search_field_1><search_field_2>'"  + spreadsheetArray[importCounter].item_variant_code +"'</search_field_2><search_field_3>#manage_quotation_master_spares_edit_buyer_code</search_field_3></inputparam>"
		}
	});
	var stateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
		}
	});
	taxationDatasource.read();
	stateType.read();
	if (manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_spares_edit.variable.custom.buyerAddressObject.state) {
		if (stateType.data()[0].state_type == "UT") {
			var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
				return data.charge_code != "IGST" && data.charge_code != "SGST"
			});
		} else {
			var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
				return data.charge_code != "IGST" && data.charge_code != "UTGST"
			});
		}
	} else {
		var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
			return data.charge_code == "IGST"
		});
	}
	var discountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == spreadsheetArray[importCounter].item_code && data.charge_code == "DISCOUNT";
	});
	if (discountData.length != 0) {
		var discountValue = discountData[0].amount;
	} else {
		var discountValue = "0.00";
	}
	var applicableAmount = parseFloat((parseFloat(spreadsheetArray[importCounter].net_quantity) * parseFloat(spreadsheetArray[importCounter].std_rate))) - parseFloat(discountValue);
	for (i = 0; i < hsnGstValues.length; i++) {
		var addObject = {
			item_code: spreadsheetArray[importCounter].item_code,
			item_variant_code: spreadsheetArray[importCounter].item_variant_code,
			item_description: spreadsheetArray[importCounter].item_code_description,
			variant_description: spreadsheetArray[importCounter].item_variant_code_description,
			charge_sl_no: (manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
			addl_charge_ind: hsnGstValues[i].addl_charge_ind,
			charge_category : hsnGstValues[i].charge_category,
			charge_type : hsnGstValues[i].charge_type,
			charge_code: hsnGstValues[i].charge_code,
			percentage_amount_ind: "P",
			percentage: hsnGstValues[i].applicable_percentage,
			applicable_on_amount: (applicableAmount).toString(),
			amount: ((parseFloat(applicableAmount) * parseFloat(hsnGstValues[i].applicable_percentage)) / 100).toString(),
			currency_code: spreadsheetArray[importCounter].currency_code,
			last_update_timestamp: "00000000-0000-0000-0000-000000000000",
			addl_charge_desc: hsnGstValues[i].addl_charge_desc,
			charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", hsnGstValues[i].charge_category, ""),
			charge_description: hsnGstValues[i].charge_description,
			percentage_amount_ind_description: "Percentage"
		};
		manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
	}
}

function fn_taxation_quotation_spares_edit_click_pre() {
	
}

function fn_taxation_quotation_spares_edit_click_post() {
	
	if (typeof(fn_taxation_quotation_spares_system_calc) === "function") {
		fn_taxation_quotation_spares_system_calc();
	}
	
	var addlDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
}

function fn_taxation_quotation_spares_tax_edit_click_pre() {
	
}

function fn_taxation_quotation_spares_tax_edit_click_post() {
	
	if (typeof(fn_taxation_quotation_spares_system_calc) === "function") {
		fn_taxation_quotation_spares_system_calc();
	}
	
	if(($("#manage_quotation_master_spares_edit_child_taxdetails_item_code").getVal() == "OVERALL") && ($("#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") && ($("#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_code").getVal() == "DISCOUNT")){

		var addlDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
		});
		if(addlDiscountData.length != 0){
			var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
				return data;
			});
			var taxAmount = 0.00;
			if (overallTaxAmount.length != 0) {
				for(var index = 0; index < overallTaxAmount.length; index++){
					taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
				}
			}
			
			var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat($("#manage_quotation_master_spares_edit_child_taxdetails_tax_discount_amount").getVal());
			if (addlDiscountData.length != 0) {
				for (i = 0; i < addlDiscountData.length; i++) {
					if(addlDiscountData[i].percentage_amount_ind == "P"){
						var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
						addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
						addlDiscountData[i].set("amount", amount);
					} else {
						if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
							addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
						}
					}
				}
			}						
		}
	}
}

function fn_taxation_quotation_spares_delete_click_pre() {
	
}

function fn_taxation_quotation_spares_delete_click_post() {
	
	if (typeof(fn_taxation_quotation_spares_system_calc) === "function") {
		fn_taxation_quotation_spares_system_calc();
	}
	
	var addlDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
}

function fn_taxation_quotation_spares_tax_delete_click_pre() {
	
}

function fn_taxation_quotation_spares_tax_delete_click_post() {
	
	if (typeof(fn_taxation_quotation_spares_system_calc) === "function") {
		fn_taxation_quotation_spares_system_calc();
	}
	
	var addlDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
}

function fn_taxation_quotation_spares_location_change() {
	
	if(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data().length != 0){
		for(var index=0; index < manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data().length; index++){
			
			var lineItemTaxData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code && data.charge_category == "STD" && data.addl_charge_ind == "T";
			});
			for(var j=0; j < lineItemTaxData.length; j++){
				manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.remove(lineItemTaxData[j]);
			}
			
			var taxationDatasource = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS'</lov_code_type><search_field_1>'" + manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code +"'</search_field_1><search_field_2>'" + manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_variant_code + "'</search_field_2><search_field_3>#manage_quotation_master_spares_edit_buyer_code</search_field_3><search_field_4>#manage_quotation_master_spares_edit_buyer_location</search_field_4></inputparam>"
				}
			});
			var stateType = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
				}
			});
			taxationDatasource.read();
			stateType.read();
			if (manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_spares_edit.variable.custom.buyerAddressObject.state) {
				if (stateType.data()[0].state_type == "UT") {
					var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
						return data.charge_code != "IGST" && data.charge_code != "SGST"
					});
				} else {
					var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
						return data.charge_code != "IGST" && data.charge_code != "UTGST"
					});
				}
			} else {
				var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
					return data.charge_code == "IGST"
				});
			}
			var discountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code && data.charge_code == "DISCOUNT";
			});
			if (discountData.length != 0) {
				var discountValue = discountData[0].amount;
			} else {
				var discountValue = "0.00";
			}
			var applicableAmount = parseFloat(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data()[index].gross_amount) - parseFloat(discountValue);
			for (i = 0; i < hsnGstValues.length; i++) {
				var addObject = {
					item_code: manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code,
					item_variant_code: manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_variant_code,
					item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code, ""),
					variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code, ""),
					charge_sl_no: (manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
					addl_charge_ind: hsnGstValues[i].addl_charge_ind,
					charge_category : hsnGstValues[i].charge_category,
					charge_type : hsnGstValues[i].charge_type,
					charge_code: hsnGstValues[i].charge_code,
					percentage_amount_ind: "P",
					percentage: hsnGstValues[i].applicable_percentage,
					applicable_on_amount: (applicableAmount).toString(),
					amount: ((parseFloat(applicableAmount) * parseFloat(hsnGstValues[i].applicable_percentage)) / 100).toString(),
					currency_code: $("#manage_quotation_master_spares_edit_currency_code").getVal(),
					last_update_timestamp: "00000000-0000-0000-0000-000000000000",
					addl_charge_desc: hsnGstValues[i].addl_charge_desc,
					charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", hsnGstValues[i].charge_category, ""),
					charge_description: hsnGstValues[i].charge_description,
					percentage_amount_ind_description: "Percentage"
				};
				manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
			}
		}
		
		for (var index = 0; index < manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length; index++) {
			manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
		};
		manage_quotation_master_spares_edit.refreshScreen();
	}
	var addlChargesData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.addl_charge_ind == "A";
	});
	
	if(addlChargesData.length != 0){
		for(var index=0; index < addlChargesData.length; index++){
			var addlChargesTaxData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == addlChargesData[index].item_code && data.charge_category == addlChargesData[index].charge_category && data.addl_charge_ind == "T";
			});
			for(var j=0; j < addlChargesTaxData.length; j++){
				manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.remove(addlChargesTaxData[j]);
			}
			
			var addlchargstaxationDatasource = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS_ADDLCHRGS'</lov_code_type><search_field_1>'" + addlChargesData[index].item_code + "'</search_field_1><search_field_2>'" + addlChargesData[index].item_variant_code + "'</search_field_2><search_field_3>'" + addlChargesData[index].charge_category + "'</search_field_3><search_field_4>#manage_quotation_master_spares_edit_buyer_code</search_field_4><search_field_5>#manage_quotation_master_spares_edit_buyer_location</search_field_5></inputparam>"
				}
			});
			var addlchargsstateType = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
				}
			});
			addlchargstaxationDatasource.read();
			addlchargsstateType.read();
			if (manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_spares_edit.variable.custom.buyerAddressObject.state) {
				if (addlchargsstateType.data()[0].state_type == "UT") {
					var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
						return data.charge_code != "IGST" && data.charge_code != "SGST"
					});
				} else {
					var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
						return data.charge_code != "IGST" && data.charge_code != "UTGST"
					});
				}
			} else {
				var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
					return data.charge_code == "IGST"
				});
			}
			for (i = 0; i < addlchargshsnGstValues.length; i++) {
				var addObject = {
					item_code: addlChargesData[index].item_code,
					item_variant_code: addlChargesData[index].item_variant_code,
					item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", addlChargesData[index].item_code, ""),
					variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", addlChargesData[index].item_variant_code, ""),
					charge_sl_no: (manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
					addl_charge_ind: addlchargshsnGstValues[i].addl_charge_ind,
					charge_category : addlchargshsnGstValues[i].charge_category,
					charge_type : addlchargshsnGstValues[i].charge_type,
					charge_code: addlchargshsnGstValues[i].charge_code,
					percentage_amount_ind: "P",
					percentage: addlchargshsnGstValues[i].applicable_percentage,
					applicable_on_amount: addlChargesData[index].amount,
					amount: ((parseFloat(addlChargesData[index].amount) * parseFloat(addlchargshsnGstValues[i].applicable_percentage)) / 100).toString(),
					currency_code: $("#manage_quotation_master_spares_edit_currency_code").getVal(),
					last_update_timestamp: "00000000-0000-0000-0000-000000000000",
					addl_charge_desc: addlchargshsnGstValues[i].addl_charge_desc,
					charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", addlchargshsnGstValues[i].charge_category, ""),
					charge_description: addlchargshsnGstValues[i].charge_description,
					percentage_amount_ind_description: "Percentage"
				};
				manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
			}
		}
		
		for (var index = 0; index < manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length; index++) {
			manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
		};
		manage_quotation_master_spares_edit.refreshScreen();
	}
	
	var overallDiscount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
	});
	
	if(overallDiscount.length != 0){
						
		var taxOnTaxConfig = $.grep(manage_quotation_master_spares_edit.variable.custom.configurationData, function(data) {
			return data.parent_code != "";
		});
		var taxOnTaxData =[];
		if(taxOnTaxConfig.length != 0){
			var taxDataConfig = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			var taxData =[];
			for(var index=0; index < taxDataConfig.length; index++){
				for(var counter=0; counter < taxOnTaxConfig.length; counter++){
					if((taxDataConfig[index].charge_code == taxOnTaxConfig[counter].charge_code) && (taxDataConfig[index].addl_charge_ind == taxOnTaxConfig[counter].charge_ind) && (taxDataConfig[index].charge_category == taxOnTaxConfig[counter].charge_category)){
						taxDataConfig[index].parent_code = taxOnTaxConfig[counter].parent_code;
						taxOnTaxData.push(taxDataConfig[index]);
					} else {
						taxData.push(taxDataConfig[index]);
					}
				}
			}
		} else {
			var taxData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
		}

		if (taxData.length != 0) {
			for (i = 0; i < taxData.length; i++) {
				var itemGrossAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data.item_code == taxData[i].item_code;
				});
				var itemGross = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data;
				});
				var overallAmount = 0.00;
				for(var index = 0; index <  itemGross.length; index++){
					overallAmount += parseFloat( itemGross[index].gross_amount);
				}
				var applicableAmount = parseFloat(itemGrossAmount[0].gross_amount) - ((parseFloat(itemGrossAmount[0].gross_amount) * (parseFloat(overallDiscount[0].amount) * 100 / overallAmount))/100);
				if(taxData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(taxData[i].percentage) * parseFloat(applicableAmount)) / 100).toString();
					taxData[i].set("applicable_on_amount", (applicableAmount).toString());
					taxData[i].set("amount", amount);
				} else {
					if(parseFloat(taxData[i].amount) > applicableAmount){
						taxData[i].set("amount", applicableAmount);
					}
				}
			}
		}

		if(taxOnTaxData.length != 0){
			var taxDataUpdated = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			for(var index=0; index < taxDataUpdated.length; index++){
				for(var counter=0; counter < taxOnTaxData.length; counter++){
					if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
						var taxOnTaxUpdated = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD" && data.charge_code == taxOnTaxData[counter].parent_code;
						});
						if(taxOnTaxUpdated.length != 0){
							if(taxDataUpdated[index].percentage_amount_ind == "P"){
								var amount = ((parseFloat(taxDataUpdated[index].percentage) * parseFloat(taxOnTaxUpdated[0].amount)) / 100).toString();
								taxDataUpdated[index].set("applicable_on_amount", (taxOnTaxUpdated[0].amount).toString());
								taxDataUpdated[index].set("amount", amount);
							} else {
								taxDataUpdated[index].set("amount", parseFloat(taxOnTaxUpdated[0].amount));
							}
						}
					}
				}
			}
		}
		
		var taxOnTaxConfigOverall = $.grep(manage_quotation_master_spares_edit.variable.custom.configurationData, function(data) {
			return data.parent_code != "";
		});

		var taxOnTaxDataOverall =[];
		if(taxOnTaxConfigOverall.length != 0){
			var taxDataOverallConfigOverall = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			var taxDataOverall =[];
			for(var index=0; index < taxDataOverallConfigOverall.length; index++){
				for(var counter=0; counter < taxOnTaxConfigOverall.length; counter++){
					if((taxDataOverallConfigOverall[index].charge_code == taxOnTaxConfigOverall[counter].charge_code) && (taxDataOverallConfigOverall[index].addl_charge_ind == taxOnTaxConfigOverall[counter].charge_ind) && (taxDataOverallConfigOverall[index].charge_category == taxOnTaxConfigOverall[counter].charge_category)){
						taxDataOverallConfigOverall[index].parent_code = taxOnTaxConfigOverall[counter].parent_code;
						taxOnTaxDataOverall.push(taxDataOverallConfigOverall[index]);
					} else {
						taxDataOverall.push(taxDataOverallConfigOverall[index]);
					}
				}
			}
		} else {
			var taxDataOverall = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
		}
		var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		var applicableAmount = parseFloat(taxAmount) - parseFloat(overallDiscount[0].amount);
		if (taxDataOverall.length != 0) {
			for (i = 0; i < taxDataOverall.length; i++) {
				if(taxDataOverall[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(taxDataOverall[i].percentage) * parseFloat(applicableAmount)) / 100).toString();
					taxDataOverall[i].set("applicable_on_amount", (applicableAmount).toString());
					taxDataOverall[i].set("amount", amount);
				} else {
					if(parseFloat(taxDataOverall[i].amount) > applicableAmount){
						taxDataOverall[i].set("amount", applicableAmount);
					}
				}
			}
		}

		if(taxOnTaxDataOverall.length != 0){
			var taxDataOverallUpdated = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			for(var index=0; index < taxDataOverallUpdated.length; index++){
				for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
					if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
						var taxOnTaxUpdated = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD" && data.charge_code == taxOnTaxDataOverall[counter].parent_code;
						});
						if(taxOnTaxUpdated.length != 0){
							if(taxDataOverallUpdated[index].percentage_amount_ind == "P"){
								var amount = ((parseFloat(taxDataOverallUpdated[index].percentage) * parseFloat(taxOnTaxUpdated[0].amount)) / 100).toString();
								taxDataOverallUpdated[index].set("applicable_on_amount", (taxOnTaxUpdated[0].amount).toString());
								taxDataOverallUpdated[index].set("amount", amount);
							} else {
								taxDataOverallUpdated[index].set("amount", parseFloat(taxOnTaxUpdated[0].amount));
							}
						}
					}
				}
			}
		}

		var addlChargeData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
		});
		if (addlChargeData.length != 0) {
			for (i = 0; i < addlChargeData.length; i++) {
				var itemGrossAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data.item_code == taxData[i].item_code;
				});
				var itemGross = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data;
				});
				var overallAmount = 0.00;
				for(var index = 0; index <  itemGross.length; index++){
					overallAmount += parseFloat( itemGross[index].gross_amount);
				}
				var addlChargeApplicableAmount = parseFloat(itemGrossAmount[0].gross_amount) - ((parseFloat(itemGrossAmount[0].gross_amount) * (parseFloat(overallDiscount[0].amount) * 100 / overallAmount))/100);
				if(addlChargeData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlChargeData[i].percentage) * parseFloat(addlChargeApplicableAmount)) / 100).toString();
					addlChargeData[i].set("applicable_on_amount", (addlChargeApplicableAmount).toString());
					addlChargeData[i].set("amount", amount);
				} else {
					if(parseFloat(addlChargeData[i].amount) > addlChargeApplicableAmount){
						addlChargeData[i].set("amount", addlChargeApplicableAmount);
					}
				}
			}
		}

		var addlChargeDataUpdated = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
		});		
		if(addlChargeDataUpdated.length != 0){		
			for(var i=0; i < addlChargeDataUpdated.length; i++){	
				var addlTaxData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
					return data.item_code == addlChargeDataUpdated[i].item_code && data.addl_charge_ind == "T" && data.charge_category == addlChargeDataUpdated[i].charge_category;
				});
				if(addlTaxData.length != 0){
					for (var j = 0; j < addlTaxData.length; j++) {
						if(addlTaxData[j].percentage_amount_ind == "P"){
							var addlTaxAmount = ((parseFloat(addlTaxData[j].percentage) * parseFloat(addlChargeDataUpdated[i].amount)) / 100).toString();
							addlTaxData[j].set("applicable_on_amount", addlChargeDataUpdated[i].amount);
							addlTaxData[j].set("amount", addlTaxAmount);
						} else {
							if(parseFloat(addlTaxData[j].amount) > parseFloat(addlChargeDataUpdated[i].amount)){
								addlTaxData[j].set("amount", addlChargeDataUpdated[i].amount);
							}
						}
					}
				}
			}
		}

		var addlChargeDataOverall = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
		});
		if(addlChargeDataOverall.length != 0){
			var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
				return data;
			});
			var taxAmount = 0.00;
			if (overallTaxAmount.length != 0) {
				for(var index = 0; index < overallTaxAmount.length; index++){
					taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
				}
			}
			
			var addlChargeApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(overallDiscount[0].amount);
			if (addlChargeDataOverall.length != 0) {
				for (i = 0; i < addlChargeDataOverall.length; i++) {
					if(addlChargeDataOverall[i].percentage_amount_ind == "P"){
						var amount = ((parseFloat(addlChargeDataOverall[i].percentage) * parseFloat(addlChargeApplicableOverallAmount)) / 100).toString();
						addlChargeDataOverall[i].set("applicable_on_amount", (addlChargeApplicableOverallAmount).toString());
						addlChargeDataOverall[i].set("amount", amount);
					} else {
						if(parseFloat(addlChargeDataOverall[i].amount) > addlChargeApplicableOverallAmount){
							addlChargeDataOverall[i].set("amount", addlChargeApplicableOverallAmount);
						}
					}
				}
			}
			
			var addlChargeDataUpdatedOverall = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
			});		
				
			if(addlChargeDataUpdatedOverall.length != 0){	
				for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
					var addlTaxDataOverall = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == addlChargeDataUpdatedOverall[i].item_code && data.addl_charge_ind == "T" && data.charge_category == addlChargeDataUpdatedOverall[i].charge_category;
					});
					if(addlTaxDataOverall.length != 0){
						for (j = 0; j < addlTaxDataOverall.length; j++) {
							if(addlTaxDataOverall[j].percentage_amount_ind == "P"){
								var addlTaxAmount = ((parseFloat(addlTaxDataOverall[j].percentage) * parseFloat(addlChargeDataUpdatedOverall[i].amount)) / 100).toString();
								addlTaxDataOverall[j].set("applicable_on_amount", addlChargeDataUpdatedOverall[i].amount);
								addlTaxDataOverall[j].set("amount", addlTaxAmount);
							} else {
								if(parseFloat(addlTaxDataOverall[j].amount) > parseFloat(addlChargeDataUpdatedOverall[i].amount)){
									addlTaxDataOverall[j].set("amount", addlChargeDataUpdatedOverall[i].amount);
								}
							}
						}
					}
				}
			}						
		}
	}
	
	var addlDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
	
	if (typeof(fn_taxation_quotation_spares_system_calc) === "function") {
		fn_taxation_quotation_spares_system_calc();
	}

}

function fn_taxation_quotation_spares_system_calc(){
	
	if(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data().length != 0){
		for(var counter=0; counter < manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData.length; counter++){
			var sysCalcEntry = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.addl_charge_ind == "T" && data.charge_code == manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_subcode;
			});
			if(sysCalcEntry.length != 0){
				for(var j=0; j < sysCalcEntry.length; j++){
					manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.remove(sysCalcEntry[j]);
				}
			}
		}
		for (var index = 0; index < manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length; index++) {
			manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
		}
		for(var counter=0; counter < manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData.length; counter++){
			if(manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].applicable_to_locations_ind == "BUYERSTATE,SELLERSTATE"){
				if ((manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].state_code) && (manage_quotation_master_spares_edit.variable.custom.buyerAddressObject.state == manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].state_code) && (manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].lineitem_overall_level_ind == "OVERALL")){
					var sysCalcEntry = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.addl_charge_ind == "T" && data.charge_code == manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_subcode;
					});
					if(sysCalcEntry.length == 0){
						var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
							return data;
						});
						var taxAmount = 0.00;
						if (overallTaxAmount.length != 0) {
							for(var increment = 0; increment < overallTaxAmount.length; increment++){
								taxAmount += parseFloat(overallTaxAmount[increment].gross_amount);
							}
						}
						var overallDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
						});
						var discountAmount = 0.00;
						if (overallDiscountData.length != 0) {
							for(var index = 0; index < overallDiscountData.length; index++){
								discountAmount += parseFloat(overallDiscountData[index].amount);
							}
						}
						if(manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].formula_for_applicable_on_amount == "SUM(ITEMNETAMT)+SUM(ADDNCHARGE)"){
							var addlChargesData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.addl_charge_ind == "A";
							});
							var addlChargesAmount = 0.00;
							if (addlChargesData.length != 0) {
								for(var chargesCounter = 0; chargesCounter < addlChargesData.length; chargesCounter++){
									addlChargesAmount += parseFloat(addlChargesData[chargesCounter].amount);
								}
							}
							var applicableAmount = parseFloat(taxAmount) - parseFloat(discountAmount) + parseFloat(addlChargesAmount);
						} else {
							var applicableAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
						}
						var sysCalcObject = {
							item_code: "OVERALL",
							item_variant_code: "OVERALL",
							item_description: "OVERALL",
							variant_description: "OVERALL",
							charge_sl_no: (manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
							addl_charge_ind: "T",
							charge_category : "STD",
							charge_type : manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_code,
							charge_code: manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_subcode,
							percentage_amount_ind: "P",
							percentage: manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].applicable_percentage,
							applicable_on_amount: (applicableAmount).toString(),
							amount: ((parseFloat(applicableAmount) * parseFloat(manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].applicable_percentage)) / 100).toString(),
							currency_code: $("#manage_quotation_master_spares_edit_currency_code").getVal(),
							last_update_timestamp: "00000000-0000-0000-0000-000000000000",
							addl_charge_desc: "Tax",
							charge_category_desc : "Standard",
							charge_description: manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_description,
							percentage_amount_ind_description: "Percentage"
						};
						manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.add(sysCalcObject);
					}
				}
			} else if(manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].applicable_to_locations_ind == "BUYERSTATE"){
				if ((manage_quotation_master_spares_edit.variable.custom.buyerAddressObject.state == manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].state_code) && (manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].lineitem_overall_level_ind == "OVERALL")){
					var sysCalcEntry = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.addl_charge_ind == "T" && data.charge_code == manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_subcode;
					});
					if(sysCalcEntry.length == 0){
						var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
							return data;
						});
						var taxAmount = 0.00;
						if (overallTaxAmount.length != 0) {
							for(var increment = 0; increment < overallTaxAmount.length; increment++){
								taxAmount += parseFloat(overallTaxAmount[increment].gross_amount);
							}
						}
						var overallDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
						});
						var discountAmount = 0.00;
						if (overallDiscountData.length != 0) {
							for(var index = 0; index < overallDiscountData.length; index++){
								discountAmount += parseFloat(overallDiscountData[index].amount);
							}
						}
						if(manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].formula_for_applicable_on_amount == "SUM(ITEMNETAMT)+SUM(ADDNCHARGE)"){
							var addlChargesData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.addl_charge_ind == "A";
							});
							var addlChargesAmount = 0.00;
							if (addlChargesData.length != 0) {
								for(var chargesCounter = 0; chargesCounter < addlChargesData.length; chargesCounter++){
									addlChargesAmount += parseFloat(addlChargesData[chargesCounter].amount);
								}
							}
							var applicableAmount = parseFloat(taxAmount) - parseFloat(discountAmount) + parseFloat(addlChargesAmount);
						} else {
							var applicableAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
						}
						var sysCalcObject = {
							item_code: "OVERALL",
							item_variant_code: "OVERALL",
							item_description: "OVERALL",
							variant_description: "OVERALL",
							charge_sl_no: (manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
							addl_charge_ind: "T",
							charge_category : "STD",
							charge_type : manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_code,
							charge_code: manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_subcode,
							percentage_amount_ind: "P",
							percentage: manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].applicable_percentage,
							applicable_on_amount: (applicableAmount).toString(),
							amount: ((parseFloat(applicableAmount) * parseFloat(manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].applicable_percentage)) / 100).toString(),
							currency_code: $("#manage_quotation_master_spares_edit_currency_code").getVal(),
							last_update_timestamp: "00000000-0000-0000-0000-000000000000",
							addl_charge_desc: "Tax",
							charge_category_desc : "Standard",
							charge_description: manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_description,
							percentage_amount_ind_description: "Percentage"
						};
						manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.add(sysCalcObject);
					}
				}
			} else if(manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].applicable_to_locations_ind == "SELLERSTATE"){
				if ((manage_quotation_master_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].state_code) && (manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].lineitem_overall_level_ind == "OVERALL")){
					var sysCalcEntry = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.addl_charge_ind == "T" && data.charge_code == manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_subcode;
					});
					if(sysCalcEntry.length == 0){
						var overallTaxAmount = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
							return data;
						});
						var taxAmount = 0.00;
						if (overallTaxAmount.length != 0) {
							for(var increment = 0; increment < overallTaxAmount.length; increment++){
								taxAmount += parseFloat(overallTaxAmount[increment].gross_amount);
							}
						}
						var overallDiscountData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
						});
						var discountAmount = 0.00;
						if (overallDiscountData.length != 0) {
							for(var index = 0; index < overallDiscountData.length; index++){
								discountAmount += parseFloat(overallDiscountData[index].amount);
							}
						}
						if(manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].formula_for_applicable_on_amount == "SUM(ITEMNETAMT)+SUM(ADDNCHARGE)"){
							var addlChargesData = $.grep(manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.addl_charge_ind == "A";
							});
							var addlChargesAmount = 0.00;
							if (addlChargesData.length != 0) {
								for(var chargesCounter = 0; chargesCounter < addlChargesData.length; chargesCounter++){
									addlChargesAmount += parseFloat(addlChargesData[chargesCounter].amount);
								}
							}
							var applicableAmount = parseFloat(taxAmount) - parseFloat(discountAmount) + parseFloat(addlChargesAmount);
						} else {
							var applicableAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
						}
						var sysCalcObject = {
							item_code: "OVERALL",
							item_variant_code: "OVERALL",
							item_description: "OVERALL",
							variant_description: "OVERALL",
							charge_sl_no: (manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
							addl_charge_ind: "T",
							charge_category : "STD",
							charge_type : manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_code,
							charge_code: manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_subcode,
							percentage_amount_ind: "P",
							percentage: manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].applicable_percentage,
							applicable_on_amount: (applicableAmount).toString(),
							amount: ((parseFloat(applicableAmount) * parseFloat(manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].applicable_percentage)) / 100).toString(),
							currency_code: $("#manage_quotation_master_spares_edit_currency_code").getVal(),
							last_update_timestamp: "00000000-0000-0000-0000-000000000000",
							addl_charge_desc: "Tax",
							charge_category_desc : "Standard",
							charge_description: manage_quotation_master_spares_edit.variable.custom.sysCalcTaxationData[counter].charge_description,
							percentage_amount_ind_description: "Percentage"
						};
						manage_quotation_master_spares_edit.variable.custom.grid_2.dataSource.add(sysCalcObject);
					}
				}
			}
		}
		manage_quotation_master_spares_edit.customRequirementHandler.amountCalculation();
	}
	
}
