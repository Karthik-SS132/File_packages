 function fn_taxation_quotation_service_spares_add_click() {
	var taxationDatasource = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS'</lov_code_type><search_field_1>#manage_quotation_master_service_spares_edit_child_item_code</search_field_1><search_field_2>#manage_quotation_master_service_spares_edit_child_item_variant_code</search_field_2><search_field_3>#manage_quotation_master_service_spares_edit_buyer_code</search_field_3></inputparam>"
		}
	});
	var stateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_quotation_master_service_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
		}
	});
	taxationDatasource.read();
	stateType.read();
	if (manage_quotation_master_service_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_service_spares_edit.variable.custom.buyerAddressObject.state) {
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
	var discountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == $("#manage_quotation_master_service_spares_edit_child_item_code").getVal() && data.charge_code == "DISCOUNT";
	});
	if (discountData.length != 0) {
		var discountValue = discountData[0].amount;
	} else {
		var discountValue = "0.00";
	}
	var applicableAmount = parseFloat($("#manage_quotation_master_service_spares_edit_child_amount").getVal()) - parseFloat(discountValue);
	for (i = 0; i < hsnGstValues.length; i++) {
		var addObject = {
			item_code: $("#manage_quotation_master_service_spares_edit_child_item_code").getVal(),
			item_variant_code: $("#manage_quotation_master_service_spares_edit_child_item_variant_code").getVal(),
			item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_quotation_master_service_spares_edit_child_item_code").getVal(), ""),
			variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_quotation_master_service_spares_edit_child_item_variant_code").getVal(), ""),
			charge_sl_no: (manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
			addl_charge_ind: hsnGstValues[i].addl_charge_ind,
			charge_category : hsnGstValues[i].charge_category,
			charge_type : hsnGstValues[i].charge_type,
			charge_code: hsnGstValues[i].charge_code,
			percentage_amount_ind: "P",
			percentage: hsnGstValues[i].applicable_percentage,
			applicable_on_amount: (applicableAmount).toString(),
			amount: ((parseFloat(applicableAmount) * parseFloat(hsnGstValues[i].applicable_percentage)) / 100).toString(),
			currency_code: $("#manage_quotation_master_service_spares_edit_currency_code").getVal(),
			last_update_timestamp: "00000000-0000-0000-0000-000000000000",
			addl_charge_desc: hsnGstValues[i].addl_charge_desc,
			charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", hsnGstValues[i].charge_category, ""),
			charge_description: hsnGstValues[i].charge_description,
			percentage_amount_ind_description: "Percentage"
		};
		manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
	}
	
	var addlDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

function fn_taxation_quotation_service_spares_tax_add_click() {
	if($("#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_indicator").getVal() == "A"){
		var addlchargstaxationDatasource = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_searchcondition",
			outputPath: "context/outputparam",
			pageSize: 10,
			inputParameter: {
				p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS_ADDLCHRGS'</lov_code_type><search_field_1>#manage_quotation_master_service_spares_edit_child_taxdetails_item_code</search_field_1><search_field_2>#manage_quotation_master_service_spares_edit_child_taxdetails_item_variant_code</search_field_2><search_field_3>#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_category</search_field_3><search_field_4>#manage_quotation_master_service_spares_edit_buyer_code</search_field_4></inputparam>"
			}
		});
		var addlchargsstateType = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_searchcondition",
			outputPath: "context/outputparam",
			pageSize: 10,
			inputParameter: {
				p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_quotation_master_service_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
			}
		});
		addlchargstaxationDatasource.read();
		addlchargsstateType.read();
		if (manage_quotation_master_service_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_service_spares_edit.variable.custom.buyerAddressObject.state) {
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
				item_code: $("#manage_quotation_master_service_spares_edit_child_taxdetails_item_code").getVal(),
				item_variant_code: $("#manage_quotation_master_service_spares_edit_child_taxdetails_item_variant_code").getVal(),
				item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_quotation_master_service_spares_edit_child_taxdetails_item_code").getVal(), ""),
				variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_quotation_master_service_spares_edit_child_taxdetails_item_variant_code").getVal(), ""),
				charge_sl_no: (manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
				addl_charge_ind: addlchargshsnGstValues[i].addl_charge_ind,
				charge_category : addlchargshsnGstValues[i].charge_category,
				charge_type : addlchargshsnGstValues[i].charge_type,
				charge_code: addlchargshsnGstValues[i].charge_code,
				percentage_amount_ind: "P",
				percentage: addlchargshsnGstValues[i].applicable_percentage,
				applicable_on_amount: $("#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_amount").getVal(),
				amount: ((parseFloat($("#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_amount").getVal()) * parseFloat(addlchargshsnGstValues[i].applicable_percentage)) / 100).toString(),
				currency_code: $("#manage_quotation_master_service_spares_edit_currency_code").getVal(),
				last_update_timestamp: "00000000-0000-0000-0000-000000000000",
				addl_charge_desc: addlchargshsnGstValues[i].addl_charge_desc,
				charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", addlchargshsnGstValues[i].charge_category, ""),
				charge_description: addlchargshsnGstValues[i].charge_description,
				percentage_amount_ind_description: "Percentage"
			};
			manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
		}
	}
	
	if(($("#manage_quotation_master_service_spares_edit_child_taxdetails_item_code").getVal() == "OVERALL") && ($("#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") && ($("#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_code").getVal() == "DISCOUNT")){

		var addlDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
		});
		if(addlDiscountData.length != 0){
			var overallTaxAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
				return data;
			});
			var taxAmount = 0.00;
			if (overallTaxAmount.length != 0) {
				for(var index = 0; index < overallTaxAmount.length; index++){
					taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
				}
			}
			
			var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat($("#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_amount").getVal());
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

function fn_taxation_quotation_service_spares_edit_click() {
	var addlDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

function fn_taxation_quotation_service_spares_tax_edit_click() {
	if(($("#manage_quotation_master_service_spares_edit_child_taxdetails_item_code").getVal() == "OVERALL") && ($("#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") && ($("#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_code").getVal() == "DISCOUNT")){

		var addlDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
		});
		if(addlDiscountData.length != 0){
			var overallTaxAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
				return data;
			});
			var taxAmount = 0.00;
			if (overallTaxAmount.length != 0) {
				for(var index = 0; index < overallTaxAmount.length; index++){
					taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
				}
			}
			
			var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat($("#manage_quotation_master_service_spares_edit_child_taxdetails_tax_discount_amount").getVal());
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

function fn_taxation_quotation_service_spares_delete_click() {
	var addlDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

function fn_taxation_quotation_service_spares_tax_delete_click() {
	var addlDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

function fn_taxation_quotation_service_spares_location_change() {
	
	if(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data().length != 0){
		for(var index=0; index < manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data().length; index++){
			
			var lineItemTaxData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code && data.charge_category == "STD" && data.addl_charge_ind == "T";
			});
			for(var j=0; j < lineItemTaxData.length; j++){
				manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.remove(lineItemTaxData[j]);
			}
			
			var taxationDatasource = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS'</lov_code_type><search_field_1>'" + manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code +"'</search_field_1><search_field_2>'" + manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_variant_code + "'</search_field_2><search_field_3>#manage_quotation_master_service_spares_edit_buyer_code</search_field_3></inputparam>"
				}
			});
			var stateType = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_quotation_master_service_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
				}
			});
			taxationDatasource.read();
			stateType.read();
			if (manage_quotation_master_service_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_service_spares_edit.variable.custom.buyerAddressObject.state) {
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
			var discountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code && data.charge_code == "DISCOUNT";
			});
			if (discountData.length != 0) {
				var discountValue = discountData[0].amount;
			} else {
				var discountValue = "0.00";
			}
			var applicableAmount = parseFloat(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].gross_amount) - parseFloat(discountValue);
			for (i = 0; i < hsnGstValues.length; i++) {
				var addObject = {
					item_code: manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code,
					item_variant_code: manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_variant_code,
					item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code, ""),
					variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code, ""),
					charge_sl_no: (manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
					addl_charge_ind: hsnGstValues[i].addl_charge_ind,
					charge_category : hsnGstValues[i].charge_category,
					charge_type : hsnGstValues[i].charge_type,
					charge_code: hsnGstValues[i].charge_code,
					percentage_amount_ind: "P",
					percentage: hsnGstValues[i].applicable_percentage,
					applicable_on_amount: (applicableAmount).toString(),
					amount: ((parseFloat(applicableAmount) * parseFloat(hsnGstValues[i].applicable_percentage)) / 100).toString(),
					currency_code: $("#manage_quotation_master_service_spares_edit_currency_code").getVal(),
					last_update_timestamp: "00000000-0000-0000-0000-000000000000",
					addl_charge_desc: hsnGstValues[i].addl_charge_desc,
					charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", hsnGstValues[i].charge_category, ""),
					charge_description: hsnGstValues[i].charge_description,
					percentage_amount_ind_description: "Percentage"
				};
				manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
			}
		}
		
		for (var index = 0; index < manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length; index++) {
			manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
		};
		manage_quotation_master_service_spares_edit.refreshScreen();
	}
	var addlChargesData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.addl_charge_ind == "A";
	});
	
	if(addlChargesData.length != 0){
		for(var index=0; index < addlChargesData.length; index++){
			var addlChargesTaxData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == addlChargesData[index].item_code && data.charge_category == addlChargesData[index].charge_category && data.addl_charge_ind == "T";
			});
			for(var j=0; j < addlChargesTaxData.length; j++){
				manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.remove(addlChargesTaxData[j]);
			}
			
			var addlchargstaxationDatasource = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS_ADDLCHRGS'</lov_code_type><search_field_1>'" + addlChargesData[index].item_code + "'</search_field_1><search_field_2>'" + addlChargesData[index].item_variant_code + "'</search_field_2><search_field_3>'" + addlChargesData[index].charge_category + "'</search_field_3><search_field_4>#manage_quotation_master_service_spares_edit_buyer_code</search_field_4></inputparam>"
				}
			});
			var addlchargsstateType = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_quotation_master_service_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
				}
			});
			addlchargstaxationDatasource.read();
			addlchargsstateType.read();
			if (manage_quotation_master_service_spares_edit.variable.custom.sellerAddressObject.state == manage_quotation_master_service_spares_edit.variable.custom.buyerAddressObject.state) {
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
					charge_sl_no: (manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
					addl_charge_ind: addlchargshsnGstValues[i].addl_charge_ind,
					charge_category : addlchargshsnGstValues[i].charge_category,
					charge_type : addlchargshsnGstValues[i].charge_type,
					charge_code: addlchargshsnGstValues[i].charge_code,
					percentage_amount_ind: "P",
					percentage: addlchargshsnGstValues[i].applicable_percentage,
					applicable_on_amount: addlChargesData[index].amount,
					amount: ((parseFloat(addlChargesData[index].amount) * parseFloat(addlchargshsnGstValues[i].applicable_percentage)) / 100).toString(),
					currency_code: $("#manage_quotation_master_service_spares_edit_currency_code").getVal(),
					last_update_timestamp: "00000000-0000-0000-0000-000000000000",
					addl_charge_desc: addlchargshsnGstValues[i].addl_charge_desc,
					charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", addlchargshsnGstValues[i].charge_category, ""),
					charge_description: addlchargshsnGstValues[i].charge_description,
					percentage_amount_ind_description: "Percentage"
				};
				manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
			}
		}
		
		for (var index = 0; index < manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length; index++) {
			manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
		};
		manage_quotation_master_service_spares_edit.refreshScreen();
	}
	
	var overallDiscount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
	});
	
	if(overallDiscount.length != 0){
						
		var taxOnTaxConfig = $.grep(manage_quotation_master_service_spares_edit.variable.custom.configurationData, function(data) {
			return data.parent_code != "";
		});
		var taxOnTaxData =[];
		if(taxOnTaxConfig.length != 0){
			var taxDataConfig = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
			var taxData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
		}

		if (taxData.length != 0) {
			for (i = 0; i < taxData.length; i++) {
				var itemGrossAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data.item_code == taxData[i].item_code;
				});
				var itemGross = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
			var taxDataUpdated = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			for(var index=0; index < taxDataUpdated.length; index++){
				for(var counter=0; counter < taxOnTaxData.length; counter++){
					if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
						var taxOnTaxUpdated = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
		
		var taxOnTaxConfigOverall = $.grep(manage_quotation_master_service_spares_edit.variable.custom.configurationData, function(data) {
			return data.parent_code != "";
		});

		var taxOnTaxDataOverall =[];
		if(taxOnTaxConfigOverall.length != 0){
			var taxDataOverallConfigOverall = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
			var taxDataOverall = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
		}
		var overallTaxAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
			var taxDataOverallUpdated = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			for(var index=0; index < taxDataOverallUpdated.length; index++){
				for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
					if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
						var taxOnTaxUpdated = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

		var addlChargeData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
		});
		if (addlChargeData.length != 0) {
			for (i = 0; i < addlChargeData.length; i++) {
				var itemGrossAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data.item_code == taxData[i].item_code;
				});
				var itemGross = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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

		var addlChargeDataUpdated = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
		});		
		if(addlChargeDataUpdated.length != 0){		
			for(var i=0; i < addlChargeDataUpdated.length; i++){	
				var addlTaxData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

		var addlChargeDataOverall = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
		});
		if(addlChargeDataOverall.length != 0){
			var overallTaxAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
			
			var addlChargeDataUpdatedOverall = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
			});		
				
			if(addlChargeDataUpdatedOverall.length != 0){	
				for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
					var addlTaxDataOverall = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
	
	var addlDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_quotation_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

function fn_taxation_quotation_service_spares_generate_draft() {
			/*New add In js File*/
	var content = '<div id = "generate_quotation_service_spares_pdf_content">';
			content += '<table width = "100%" style="table-layout: fixed word-wrap: break-word font-size: x-small">';
			content += '<tr>';
			content += '<td colspan="100" style="text-align:right">';
			content += '<img width="35%" height="55%" src ="data:image/jpeg;base64,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" />';	
			content += '</td>';
			content += '</tr>';
			content += '<tr>';
			content += '<td colspan="100" style="text-align:center; padding:2%; font-family:Helvetica; font-weight:bold; font-size:18px;">';
			content += '<u>SERVICE QUOTATION</u>';
			content += '</td>';
			content += '</tr>';
			content += '</table>';
			content += '<table width = "100%" border="2" style="table-layout: fixed; border-style:solid 2px; border-collapse: collapse; word-wrap: break-word; font-size: x-small;">';
			content += '<tr>';
			content += '<td colspan="100"style="text-align:center; padding:2%; font-family:Helvetica; font-weight:bold; font-size:12px;">SCHWING Stetter India Pvt Ltd<br/>'+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].dealer_location_long +',<br/> Pincode - '+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].dealer_location_pincode +',<br/>Ph : '+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].dealer_location_landline +' GST NO - '+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].dealer_gst_no +'</td>';
			content += '</tr>';
			content += '<tr>';
			content += '<td colspan="50" rowspan="1" style=" padding:2%; font-family:Helvetica; font-weight:bold; font-size:12px;">TO,<br/><br/><span>'+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc +',</span><br/><br/><span>'+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_location_desc +'</span>';
			content += '</td>';
			content += '<td colspan="50" style="font-family:Helvetica; padding:2%; text-align:left; font-weight:bold; font-size:12px;">Ref:&nbsp;&nbsp;&nbsp;<span>'+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_no +'</span>';
			content += '</td>';
			content += '</tr>';
			content += '<tr>';
			content += '<td colspan="50" style="font-family:Helvetica; border-top-style:hidden; font-weight:bold; font-size:12px;" />';
			content += '<td colspan="50" style="text-align:left; padding:2%; font-family:Helvetica; font-weight:bold; font-size:12px;">Date:&nbsp;&nbsp;&nbsp;<span>'+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_date +'</span>';
			content += '</td>';
			content += '</tr>';
			content += '<table width = "100%" border="2" style="table-layout: fixed; border-style:solid 2px; border-collapse: collapse; word-wrap: break-word; font-size: x-small;">';
			content += '<tr>';
			content += '<td colspan="50" style="text-align:left; padding:2%; font-family:Helvetica; font-weight:bold;  font-size:12px;" /><br/>Payment Terms</td>';
			content += '<td colspan="50" style="text-align:left; padding:2%; font-family:Helvetica; border-top-style:hidden; font-weight:bold; font-size:12px;">'+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].payment_terms +'</td>';
			content += '</tr>';
			content += '</table>';
			
			content += '<table width = "100%" border="2" style="table-layout: fixed; border-style:solid 2px; border-collapse: collapse; word-wrap: break-word; font-size: x-small;">';
			content += '<tr>';
			content += '<td colspan="50" style="text-align:left; padding:2%; font-family:Helvetica; font-weight:bold;  font-size:12px;" /><br/>Validity Date</td>';
			content += '<td colspan="50" style="text-align:left; padding:2%; font-family:Helvetica; border-top-style:hidden; font-weight:bold; font-size:12px;">'+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_validity_date +'</td>';
			content += '</tr>';
			content += '</table>';
			content += '<table width = "100%" border="2" style="table-layout: fixed; border-style:solid 2px; border-collapse: collapse; word-wrap: break-word; font-size: x-small;">';
			content += '<tr>';
			content += '<td colspan="50" style=" padding:2%; border-right-style:hidden; text-align:center; font-family:Helvetica; font-weight:bold; font-size:16px;">Description</td>';
			content += '<td colspan="50" style=" padding:2%; text-align:center; font-family:Helvetica; font-weight:bold; font-size:16px;">Value</td>';
			content += '</tr>';
	for (var index in generate_quotation_service_spares_pdf.variable.custom.outputparam_detail) {
		content += '<tr>';
		content += '<td colspan="50" style="padding:2%; font-family:Helvetica; font-weight:bold; font-size:12px;">Service Charges towards<span>&nbsp;&nbsp;'+ generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description +'</span></br><span> No of days: '+generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].net_quantity+' '+generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].uom_code_desc+'</span></br> SAC CODE :<span>'+generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].hsn_code+'</span>';
		content += '</td>';
		content += '<td colspan="50" style="padding:2%; text-align:center; font-family:Helvetica; font-weight:bold; font-size:12px;"><span>'+generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].std_rate  +' (Per Day)&nbsp;&nbsp;</span>';
		content += '</td>';
		content += '</tr>';
		}
		content += '<tr>';
		content += '<td colspan="50" style="padding:2%; border-top-style:hidden; font-family:Helvetica; font-weight:bold; font-size:12px;">Discount Amount</td>';
		content += '<td colspan="50" style="text-align:center; padding:2%; border-top-style:hidden; font-family:Helvetica; font-weight:bold; font-size:12px;">'+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_discount_amount+'</td>';
		content += '</tr>';
		for (var index in generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail) {
			content += '<tr>';
			if (generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail[index].addl_charge_ind == "T")
			{
			content += '<td colspan="50" style="padding:2%; border-top-style:hidden;  font-family:Helvetica font-weight:bold; font-size:12px;"><b>'+ generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail[index].charge_subcode +'</b>&nbsp;&nbsp;<span>'+ generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail[index].percentage +'</span>';
			content += '</td>';
			}
			if (generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail[index].addl_charge_ind == "T")
			{
			content += '<td colspan="50" style="padding:2%; border-top-style:hidden;  text-align:center; font-family:Helvetica font-weight:bold; font-size:12px;"><span>'+ generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail[index].amount +'</span>';
			content += '</td>';
			content += '</tr>';
			}
		}
		content += '<tr>';
		content += '<td colspan="50" style="padding:2%; border-top-style:hidden; font-family:Helvetica; font-weight:bold; font-size:12px;">Total</td>';
		content += '<td colspan="50" style="padding:2%; border-top-style:hidden; text-align:center; font-family:Helvetica; font-weight:bold; font-size:12px;"><span><b>'+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount +'</b>&nbsp;&nbsp;</span>';
		content += '</td>';
		content += '</tr>';	
		content += '<tr>';
		content += '<td colspan="50" rowspan="1" style="padding-left:4%; padding-top:6%; border-bottom-style:hidden; font-family:Helvetica; font-weight:bold; font-size:12px;">E&amp;OE</td>';
		content += '<td colspan="50" style="padding:2%; border-bottom-style:hidden; font-family:Helvetica; font-size:12px; text-align:right;">for <b>SCHWING Stetter (I) Pvt Ltd</b></td>';
		content += '</tr>';
		content += '<tr>';
		content += '<td colspan="50" style="padding:2%; border-bottom-style:hidden; font-family:Helvetica; font-weight:bold; font-size:12px;" />';
		content += '<td colspan="50" style="padding:2%; border-bottom-style:hidden; font-family:Helvetica; font-weight:bold; font-size:12px; text-align:right;" />';
		content += '</tr>';
		content += '<tr>';
		content += '<td colspan="50" style="padding:2%; border-top-style:hidden; font-family:Helvetica; font-weight:bold; font-size:12px;" />';
		content += '<td colspan="50" style="padding:2%; border-top-style:hidden; font-family:Helvetica; font-weight:bold; font-size:12px; text-align:right;" >Authorized Signatory</td>';
		content += '</tr>';
		content += '</table>';
		content += '<br/>';
		content += '<mservicefooter>';
		content += '<table>';
		content += '<tr>';
		content += '<td colspan="100" style="padding-left:1%; font-family:Helvetica; font-weight:bold; font-size:12px;"><u>Terms & Conditions:</u></td>';
		content += '</tr>';
		content += '<tr>';
		content += '<td colspan="100" style="padding-left:2%; padding-top:1%; font-family:Helvetica; font-weight:bold; font-size:12px;">1. Approved Work Order with advance payment to be released.</td>';
		content += '</tr>';
		content += '<tr>';
		content += '<td colspan="100" style="padding-left:2%; padding-top:1%; font-family:Helvetica; font-weight:bold; font-size:12px;">2. Prior intimation should be given to us before 2 working days.</td>';
		content += '</tr>';
		content += '<tr>';
		content += '<td colspan="100" style="padding-left:2%; padding-top:1%; font-family:Helvetica; font-weight:bold; font-size:12px;">3. Necessary Standard Weights, Crane, Tools, Tackles & Skilled Labors to be arranged by the Customer.</td>';
		content += '</tr>';
		content += '<tr>';
		content += '<td colspan="100" style="padding-left:2%; padding-top:1%; font-family:Helvetica; font-weight:bold; font-size:12px;">4. In case of any Calibration, Re-Commissioning, Weigher Alignment, software loading, upgradation / license transfer etc will be charged additionally as per norms.</td>';
		content += '</tr>';
		content += '<tr>';
		content += '<td colspan="100" style="padding-left:2%; padding-top:1%; font-family:Helvetica; font-weight:bold; font-size:12px;">5. As mentioned above if the job extends more than 1visit / day it will charged additionally as pernorms.</td>';
		content += '</tr>';
		content += '<tr>';
		content += '<td colspan="100" style="padding-left:2%; padding-top:1%; font-family:Helvetica; font-weight:bold; font-size:12px;">6. Necessary calibration certificate will be issued only after receiving of 100% payment.</td>';
		content += '<td colspan="100" style="padding-left:2%; padding-top:1%; font-family:Helvetica; font-weight:bold; font-size:12px;">'+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_terms_conditions+'</td>';
		content += '</tr>';
		content += '</table>';
		content += '</mservicefooter>';
	return content;
	
}

function fn_taxation_quotation_service_spares_generate_pdf (){
			/*New add In js File*/
var content = "<!DOCTYPE html><html><head>";
				content += "<style>table { page-break-after:auto }tr { page-break-inside:avoid; page-break-after:auto } thead { display:table-header-group }tfoot { display:table-footer-group }</style>";
				content += "</head><body>";
					
				content += "<div style='width:1000px; font-size: large;'>";
				content += "<div style = 'margin-bottom:3px;'>";
				if (generate_quotation_service_spares_pdf.variable.custom.imageData1 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + generate_quotation_service_spares_pdf.variable.custom.imageData1 + "/>";
				} else {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" + "/>";
				}
				
				
				
				if (generate_quotation_service_spares_pdf.variable.custom.imageData2 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;float:right;' src =" + generate_quotation_service_spares_pdf.variable.custom.imageData2 + "/>";
				}
				content += "</div>";
				content += '<table width = "100%" style="table-layout: fixed word-wrap: break-word font-size: x-small">';
				content += '<tr>';
				if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'PAM K') {
					content += '<td colspan="100" style="text-align:left; padding:2%;  font-weight:bold; font-size:20px;color:#b30404">';
					content += 'SERVICE QUOTATION <br/> ';
					content += '</td>';
				}else if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'PAM T') {
					content += '<td colspan="100" style="text-align:left; padding:2%;  font-weight:bold; font-size:20px;color:#b30404">';
					content += 'SERVICE QUOTATION <br/> ';
					content += '</td>';
				}else if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'APT') {
					content += '<td colspan="100" style="text-align:left; padding:2%;  font-weight:bold; font-size:20px;color:#b30404">';
					content += 'SERVICE QUOTATION <br/> 01.09.2018 I CFT-FT-24';
					content += '</td>';
				} else {
					content += '<td colspan="100" style="text-align:left; padding:2%;  font-weight:bold; font-size:20px;color:#b30404">';
					content += 'SERVICE QUOTATION';
					content += '</td>';
				}
				
				content += '<td colspan="100" style="text-align:right;padding-bottom:20px">';
				content += '<img width="144px" height="83px" src ="data:image/png;base64,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" />';	
				content += '</td>';
				content += '</tr>';
				content += '</table>';
				content += "<table width = '100%' border = '1px' style='table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "</tr>";
				content += "<tr style = 'height:90px;vertical-align:top;'>";
				content += "<td style = 'font-size: large;padding:1%; ' colspan = '50'><div><b>M/s.</b> <span style = 'font-weight: bold';>" + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + "</span></br><b>" + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city +"<br>"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_1+"</b></div><span><b> KIND ATTENTION Mr. : &nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].customer_contact_name+"</b></span><br/><br/><span><b> EQUIPMENT NO. MODEL : &nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].equipment_category+"</b></span></td>";
				content += "<td colspan='50' style='font-family:Helvetica; padding:2%; text-align:left; font-weight:bold; 	font-size:12px;'><br/><br/><br/>QUOTE &nbsp;&nbsp;NO &nbsp;:&nbsp;&nbsp;&nbsp;<span style='font-size:15px;'>"+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_no +"</span> <br/><br/><br/><span style='font-size:15px;'> DATE&nbsp;&emsp;&emsp;: &nbsp;"+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_date +"</span>";
				content += "</td>";
				content += "</tr>";
				content += "<tr style = 'text-align:center;'>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '4' ><b>Sl</br>No</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '46'><b>Machine Description</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '9'>T<b>otal No.</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '17' ><b>Rate in INR</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '7' ><b>per</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '17'><b>Amount in INR</b></td>";
				content += "</tr>";
				for (var index in generate_quotation_service_spares_pdf.variable.custom.outputparam_detail) {
					content += "<tr style = 'height:20px;'>";
					content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_sl_no + "</td>";
					
					if(generate_quotation_service_spares_pdf.variable.custom.outputparam_item_addninfo != undefined){
						var itemData =  generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code;
						var accessoryDetail = $.grep(generate_quotation_service_spares_pdf.variable.custom.outputparam_item_addninfo, function (accessoryInfo, index) {
							if (accessoryInfo.quotation_item_code == itemData) {
								return accessoryInfo;
							}
						});
						if(accessoryDetail.length != 0){
							var accessoryString = " [ "; 
							for(counter = 0; counter < accessoryDetail.length; counter++){ 
								accessoryString += (counter+1) + "." + accessoryDetail[counter].accessory_item_description + "</br>";
							}
							accessoryString = accessoryString.substring(0, accessoryString.length - 5) + " ]";
							content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</br>' + accessoryString + "</td>";
						} else {
							content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description + "</td>";
						}
					} else {
						content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description + "</td>";
					}
					
					content += "<td colspan = '9' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].net_quantity + "</td>";
					content += "<td colspan = '17'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].std_rate + "</td>";
					content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].uom_code + "</td>";
					content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].gross_amount) + "</td>";
					content += "</tr>";
					if(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
						var itemCode = generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code;
						for(var indicator = parseInt(index) + 1; indicator < generate_quotation_service_spares_pdf.variable.custom.outputparam_detail.length;indicator++){
							if(itemCode == generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[indicator].item_code){
								itemCode = "";
							} 
						}
						var lineitemArray = $.grep(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail,function(lineitemTaxDetails,index){
							if((lineitemTaxDetails.item_code != "OVERALL") && (lineitemTaxDetails.item_code == itemCode)){
								return lineitemTaxDetails;
							}
						});
						for (var index in lineitemArray) {
							content += "<tr style = 'height:20px;'>";
							content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
							content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + lineitemArray[index].charge_subcode;
							if (lineitemArray[index].percentage_amount_ind == 'P') {
								content += " (%)";
							} else {
								content += " (Amt)";
							}
							content += "</td>";
							content += "<td colspan = '9'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
							if (lineitemArray[index].percentage_amount_ind == 'A') {
								content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].amount + "</td>";
							} else {
								content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].percentage + "</td>";
							}
							content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
							content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + "</td>";
							content += "</tr>";
						}
					}
				}
				if(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
					generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall = $.grep(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail,function(overallTaxDetails,index){
						if(overallTaxDetails.item_code == "OVERALL"){
							return overallTaxDetails;
						}
					});
					for (var index in generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall) {
						content += "<tr style = 'height:20px;'>";
						content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
						content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>OVERALL " + generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].charge_subcode;
						if (generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'P') {
							content += " (%)";
						} else {
							content += " (Amt)";
						}
						content += "</td>";
						content += "<td colspan = '9'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
						if (generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'A') {
							content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount + "</td>";
						} else {
							content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage + "</td>";
						}
						content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
						content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount) + "</td>";
						content += "</tr>";
					}
				}content += "<tr style = 'height:30px;'>";
				content += "<td colspan = '4'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '46' style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '9' style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '17'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '7'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '17'></td>";
				content += "</tr>";
				content += "<tr style = 'height:20px;'>";
				content += "<td colspan = '4'style = 'padding-top : 2px; ' ></td>";
				content += "<td colspan = '46' style = 'padding-top : 2px; text-align:right; padding-right : 2px;'>Total</td>";
				content += "<td colspan = '9' style = 'padding-top : 2px; text-align:right; font-weight: bold; '></td>";
				content += "<td colspan = '17'style = 'padding-top : 2px; '></td>";
				content += "<td colspan = '7'style = 'padding-top : 2px; '></td>";
				content += "<td colspan = '17' style = 'padding-top : 2px; text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount) + "</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = 'border-bottom-style: hidden;' >&nbsp;&nbsp;Amount Chargeable (in words)</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style =  font-weight: bold;'>&nbsp;&nbsp;" + generate_quotation_service_spares_pdf.customRequirementHandler.wordFormat(generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount, generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + "</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:center; padding-left : 2px;' ><b>Annexure I (Commercial terms and conditions)</b><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:left; padding-left : 2px;' ><div style='padding : 1%;'><b>Basic Visit Charges On Weekly off/ Holiday :</b>&nbsp;If our Mechanical/Electrical/Process/Programing Engineer is required to work on weekly off / Public holiday then the above mentioned services visit rates will be two times than the standard service visit rates as mentioned above.<br/><b>Travel Charges :</b>&nbsp;Air Travelling charges will be applicable at actuals if engineer needs to travel for more than 8 to 10 hours  by surface to reach your site. <br/><b>Period of work :</b>&nbsp;At actual. (Will commence only after receipt of Purchase Order).<br/><b>Validity &nbsp;:&nbsp;<b/>Three months from Date of Quotation</div></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:center; padding-left : 2px;' ><b>Annexure II (Technical terms and conditions)</b><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:left; padding-left : 2px;' ><div style='padding : 1%;'>Servicing of m/c will be done only after receiving of purchase order.<br/>Date of servicing of machine must be communicated atleast in 1 week advance.<br/>Machine which is to be serviced must be free from production with all necessary tools & Gauges.<br/>Any worn out/new spares required during the servicing of this machine will be provided against separate purchase order for spares.<br/>Specify the exact billing address and machine sr. no on purchase order with contact details.<br/>One maintenance  person for Mech. Work</div></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:center; padding-left : 2px;' ><b>Annexure III (Commercial terms and conditions)</b><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:left; padding-left : 2px;'<br/>&nbsp;<b>Terms & Conditions  : </b>&nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_terms_conditions+"<br/><br/>&nbsp;<b>Payment  Terms&emsp; &emsp;  :</b>&nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].payment_terms+"<br/><br/>&nbsp;<b>SAC Code&nbsp;&emsp;&emsp;&emsp;&emsp; : </b>&nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].product_udf_char_3+"<br/><br/><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:left; padding-left : 2px;' ><br/><br/><br/>&nbsp;&nbsp;<b>Authorised Signatory</b><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '35' style = text-align:left;' ><div style='padding : 1%;'>Regd. Office<br/>1001, Dalamal House, Nariman Point, Mumbai - 400 021, India.<br/>Phone : +91 22 2287 2557-2559</div></td>";
				content += "<td colspan = '30' style = text-align:left;' ><div></div></td>";
				content += "<td colspan = '35' style = text-align:left;' ><div style='padding : 1%;'>"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].bu_address+"<br/>CINNo.:U24239MH1972PTC015632 <br/>";
				if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'PAM K') {
					content += "GST No. : 27AAACP4776H1Z6</div></td>";
				}else if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'PAM T') {
					content += "GST No. : 27AAACP4776H1Z6</div></td>";
				}else if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'APT') {
					content += "GST No. : 27AABCP6380Q1ZQ</div></td>";
				} else {
					content += "GST No. : </div></td>";
				}
				content += "</tr>";
				content += "</table>";
				content += "<div style = 'margin-top:2px;text-align: center; font-size: large;'>This is a Computer Generated Service Quotation</div>";
				content += "</div></body></html>";
				return content;
			}