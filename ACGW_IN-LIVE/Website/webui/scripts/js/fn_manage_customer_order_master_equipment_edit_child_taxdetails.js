var manage_customer_order_master_equipment_edit_child_taxdetails = {
	constructScreen : function () {
		if (manage_customer_order_master_equipment_edit.variable.custom.crudIndicator == "U" || manage_customer_order_master_equipment_edit.variable.custom.crudIndicator == "V") {
			manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord = manage_customer_order_master_equipment_edit.variable.custom.selectedRecord;
			manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_category_desc = mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_category, "");
		}
	},
	postConstruct : function () {
		if(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data().length == 0){
			manage_customer_order_master_equipment_edit.variable.custom.itemCode.dataSource.filter({logic:"or",filters : [{field: "code",value: "OVERALL", operator: "eq"}]});
		} else {
			var arrayFilter = [{
					field: "code",
					value: "OVERALL",
					operator: "eq"
				}];
			for ( var index = 0; index < manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data().length; index++){
				var objFilter = {
					field: "code",
					value: manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data()[index].item_code,
					operator: "eq"
				}
				arrayFilter.push(objFilter);
			}
			manage_customer_order_master_equipment_edit.variable.custom.itemCode.dataSource.filter({logic:"or",filters : arrayFilter});
		}
		if (manage_customer_order_master_equipment_edit.variable.custom.crudIndicator == "A") {
			$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
			$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
		}
		if (manage_customer_order_master_equipment_edit.variable.custom.crudIndicator == "U" || manage_customer_order_master_equipment_edit.variable.custom.crudIndicator == "V") {
			if(manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.item_code == "OVERALL") {
				if(manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind == "T"){
					if((manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind == "T") && (manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_category != "STD")){
						var addlChargeDataTax = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data) {
							return data.item_code == manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.item_code && data.charge_category == manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_category && data.addl_charge_ind == "A";
						});
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(parseFloat(addlChargeDataTax[0].amount)); 
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(parseFloat(addlChargeDataTax[0].amount));
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(parseFloat(addlChargeDataTax[0].amount));
					} else {
						var taxOnTaxConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.charge_ind == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() && data.charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() && data.charge_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type").getVal();
						});
						if(taxOnTaxConfig.length != 0){
							if(taxOnTaxConfig[0].parent_code != ""){
								var taxOnTaxData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
									return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.addl_charge_ind == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() && data.charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() && data.charge_code == taxOnTaxConfig[0].parent_code;
								});
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(taxOnTaxData[0].amount);
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(taxOnTaxData[0].amount);
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(taxOnTaxData[0].amount);
							} else {
								var discountData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data) {
									return data.charge_code == "DISCOUNT";
								});
								if(discountData.length != 0){
									var discountOverallAmount = 0.00;
									for(var index = 0; index < discountData.length; index++){
										discountOverallAmount += parseFloat(discountData[index].amount);
									}
									var grossAmount = (parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - parseFloat(discountOverallAmount)).toString();
									$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(grossAmount); 
									$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(grossAmount);
									$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(grossAmount);
								} else {
									$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal($("#manage_customer_order_master_equipment_edit_partsAmount").text());
									$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max($("#manage_customer_order_master_equipment_edit_partsAmount").text());
									$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max($("#manage_customer_order_master_equipment_edit_partsAmount").text());
								}
							}								 
						}
					}
				} else if (manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind == "A") {
					var discountData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data) {
						return data.charge_code == "DISCOUNT";
					});
					
					if(discountData.length != 0){
						var discountOverallAmount = 0.00;
						for(var index = 0; index < discountData.length; index++){
							discountOverallAmount += parseFloat(discountData[index].amount);
						}
						var grossAmount = (parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - parseFloat(discountOverallAmount)).toString();
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(grossAmount); 
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(grossAmount);
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(grossAmount);
					} else {
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal($("#manage_customer_order_master_equipment_edit_partsAmount").text());
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max($("#manage_customer_order_master_equipment_edit_partsAmount").text());
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max($("#manage_customer_order_master_equipment_edit_partsAmount").text());
					}
				} else {
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal($("#manage_customer_order_master_equipment_edit_partsAmount").text());
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max($("#manage_customer_order_master_equipment_edit_partsAmount").text());
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max($("#manage_customer_order_master_equipment_edit_partsAmount").text());
				}
			} else {
				if(manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind == "T"){
					if((manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind == "T") && (manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_category != "STD")){
						var addlChargeDataTax = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data) {
							return data.item_code == manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.item_code && data.charge_category == manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_category && data.addl_charge_ind == "A";
						});
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(parseFloat(addlChargeDataTax[0].amount)); 
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(parseFloat(addlChargeDataTax[0].amount));
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(parseFloat(addlChargeDataTax[0].amount));
					} else {
						var taxOnTaxConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.charge_ind == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() && data.charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() && data.charge_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type").getVal();
						});
						if(taxOnTaxConfig.length != 0){
							if(taxOnTaxConfig[0].parent_code != ""){
								var taxOnTaxData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
									return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.addl_charge_ind == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() && data.charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() && data.charge_code == taxOnTaxConfig[0].parent_code;
								});
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(taxOnTaxData[0].amount);
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(taxOnTaxData[0].amount);
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(taxOnTaxData[0].amount);
							} else {
								var discountConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
									return data.charge_ind == "D";
								});
								if(discountConfig.length != 0){
									var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
										return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal();
									});
									if(itemGrossAmount.length != 0){
										var lineItemAmount = parseFloat(itemGrossAmount[0].gross_amount);
									} else {
										var lineItemAmount = 0.00;
									}
									var itemDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
										return data.item_code == "OVERALL" && data.charge_code == "DISCOUNT";
									});
									if(itemDiscountAmount.length != 0){
										if(itemDiscountAmount[0].percentage_amount_ind == "P"){
											var lineDiscountAmount = ((lineItemAmount * parseFloat(itemDiscountAmount[0].percentage))/100);
										} else {
											var itemGross = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
												return data;
											});
											var overallAmount = 0.00;
											for(var index = 0; index <  itemGross.length; index++){
												overallAmount += parseFloat( itemGross[index].gross_amount);
											}
											var lineDiscountAmount = ((lineItemAmount * (parseFloat(itemDiscountAmount[0].amount) * 100 / overallAmount))/100);
										}
									} else {
										var itemDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
											return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.charge_code == "DISCOUNT";
										});
										if(itemDiscountAmount.length != 0){
											var lineDiscountAmount = parseFloat(itemDiscountAmount[0].amount);
										} else {
											var lineDiscountAmount = 0.00;
										}
									}
									if ((itemGrossAmount.length == 0) && (itemDiscountAmount.length == 0)) {
										$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
										$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
										$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
									} else {
										lineItemAmount = lineItemAmount - lineDiscountAmount;
										$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
										$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
										$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
									}
								} else {
									$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
									$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
									$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
								}
							}
						}
					}
				} else if(manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind == "A"){
					var discountConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
						return data.charge_ind == "D";
					});
					if(discountConfig.length != 0){
						var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
							return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal();
						});
						if(itemGrossAmount.length != 0){
							var lineItemAmount = parseFloat(itemGrossAmount[0].gross_amount);
						} else {
							var lineItemAmount = 0.00;
						}
						var itemDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
							return data.item_code == "OVERALL" && data.charge_code == "DISCOUNT";
						});
						if(itemDiscountAmount.length != 0){
							if(itemDiscountAmount[0].percentage_amount_ind == "P"){
								var lineDiscountAmount = ((lineItemAmount * parseFloat(itemDiscountAmount[0].percentage))/100);
							} else {
								var itemGross = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data;
								});
								var overallAmount = 0.00;
								for(var index = 0; index <  itemGross.length; index++){
									overallAmount += parseFloat( itemGross[index].gross_amount);
								}
								var lineDiscountAmount = ((lineItemAmount * (parseFloat(itemDiscountAmount[0].amount) * 100 / overallAmount))/100);
							}
						} else {
							var itemDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
								return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.charge_code == "DISCOUNT";
							});
							if(itemDiscountAmount.length != 0){
								var lineDiscountAmount = parseFloat(itemDiscountAmount[0].amount);
							} else {
								var lineDiscountAmount = 0.00;
							}
						}
						if ((itemGrossAmount.length == 0) && (itemDiscountAmount.length == 0)) {
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
						} else {
							lineItemAmount = lineItemAmount - lineDiscountAmount;
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
						}
					} else {
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
					}
				} else {
					var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
						return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal();
					});
					var lineItemAmount = 0.00;
					for(var index = 0; index < itemGrossAmount.length; index++){
						lineItemAmount += parseFloat(itemGrossAmount[index].gross_amount);
					}
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
				}
			}
			if(manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.percentage_amount_ind == "P"){
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount_group").show();
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_group").show();
			} else {
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount_group").show();				
			}
		}
		if(manage_customer_order_master_equipment_edit.variable.custom.crudIndicator == "U"){
			var addlChargeConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
				return data.charge_ind == "T" && data.charge_category == manage_customer_order_master_equipment_edit.variable.custom.selectedRecord.charge_category;
			});
			if(addlChargeConfig.length != 0){
				if(addlChargeConfig[0].syscalc_ind == "1"){
					var addlchrgsData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == manage_customer_order_master_equipment_edit.variable.custom.selectedRecord.item_code && data.charge_category == manage_customer_order_master_equipment_edit.variable.custom.selectedRecord.charge_category && data.addl_charge_ind == "T" && data.addl_charge_ind != manage_customer_order_master_equipment_edit.variable.custom.selectedRecord.addl_charge_ind;
					});
					if(addlchrgsData.length != 0){
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").disable();
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code").disable();
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").disable();
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").disable();
					}
				}				
			}
			var taxOnTax = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
				return data.parent_code != "";
			});
			if(taxOnTax.length != 0){
				if(taxOnTax[0].parent_code == manage_customer_order_master_equipment_edit.variable.custom.selectedRecord.charge_code){
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").disable();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code").disable();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").disable();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").disable();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type").disable();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code").disable();
				}
			}
			if(manage_customer_order_master_equipment_edit.variable.custom.selectedRecord.addl_charge_ind == "D" && manage_customer_order_master_equipment_edit.variable.custom.selectedRecord.item_code == "OVERALL"){
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").disable();
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code").disable();
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").disable();
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").disable();
			}
		}
		if(login_profile.item_variant_ind == "0"){
			$("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code_group").hide();
		} else {
			$("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code_group").show();
		}
	},
	initializeWidgets : function () {
		manage_customer_order_master_equipment_edit.variable.custom.itemCode = $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").initializeWDropdownlist({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			dataSource : {
				informationType : "'ITEMCODE_CHARGE_LIST'",
				searchField1 : "#manage_customer_order_master_equipment_edit_quotation_category"
			},
			dataTextField : "description",
			dataValueField : "code",
			childFieldID : "manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code,manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator, manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category, manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type, manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.item_code",
			defaultValueDescription : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.item_description",
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code").initializeWDropdownlist({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_CHARGE_LIST_LINKED'",
				searchField1 : "#manage_customer_order_master_equipment_edit_child_taxdetails_item_code"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.item_variant_code",
			defaultValueDescription : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.variant_description",
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").initializeWDisplayarea({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
		});
		manage_customer_order_master_equipment_edit.variable.custom.discountIndicator = $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").initializeWDropdownlist({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			dataSource : {
				informationType : "'CHARGEINDICATOR_LIST_LINKED'",
				searchField1 : "#manage_customer_order_master_equipment_edit_child_taxdetails_item_code",
				searchField2 : "'SA'",
				searchField3 : "'ALL'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category,manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type, manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code,manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind",
			defaultValueDescription : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_desc",
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").initializeWDropdownlist({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			dataSource : {
				informationType : "'CHARGECATEGORY_LIST_LINKED'",
				searchField1 : "#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator",
				searchField2 : "#manage_customer_order_master_equipment_edit_child_taxdetails_item_code",
				searchField3 : "'SA'",
				searchField4 : "'ALL'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type,manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code,manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_category",
			defaultValueDescription : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_category_desc",
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type").initializeWDropdownlist({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			dataSource : {
				informationType : "'CHARGETYPE_LIST_LINKED'",
				searchField1 : "#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator",
				searchField2 : "#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category",
				searchField3 : "#manage_customer_order_master_equipment_edit_child_taxdetails_item_code",
				searchField4 : "'SA'",
				searchField5 : "'ALL'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code, manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_type",
			defaultValueDescription : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_type",
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code").initializeWDropdownlist({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			dataSource : {
				informationType : "'CHARGECODE_LIST_LINKED'",
				searchField1 : "#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator",
				searchField2 : "#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category",
				searchField3 : "#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_code",
			defaultValueDescription : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_description",
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator").initializeWDropdownlist({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			dataSource : {
				informationType : "'PERCENTAMTINDICATOR_LIST_LINKED'",
				searchField1 : "#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator",
				searchField2 : "#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category",
				searchField3 : "#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type",
				searchField4 : "'SA'",
				searchField5 : "'ALL'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.percentage_amount_ind",
			defaultValueDescription : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.percentage_amount_ind_description",
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").initializeWNumerictextbox({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			minimum : "'0'",
			maximum : "'100'",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.percentage",
			format : "n2"
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").initializeWNumerictextbox({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			minimum : "'0'",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.applicable_on_amount",
			format : "n2"
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").initializeWNumerictextbox({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			minimum : "'0'",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.amount",
			format : "n2"
		});
		$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").initializeWDisplayarea({
			screenID : "manage_customer_order_master_equipment_edit_child_taxdetails",
			defaultValue : "$manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.amount",
		});
	},
	customRequirementHandler : {
		taxDiscountValidation : function () {
			var keyValidation = manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && keyValidation[i].charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() && keyValidation[i].charge_type == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type").getVal() && keyValidation[i].charge_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code").getVal() && keyValidation[i].addl_charge_ind == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal()) {
					alert("Tax or Discount Details already exists.");
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").setVal("");
				}
			}
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").setVal("");
			if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() == "OVERALL") {
				var overallDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
					return data.charge_code == "DISCOUNT";
				});
				var discountAmount = 0.00;
				if (overallDiscountAmount.length != 0) {
					for(var index = 0; index < overallDiscountAmount.length; index++){
						discountAmount += parseFloat(overallDiscountAmount[index].amount);
					}
				}
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal((parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - discountAmount).toFixed(2));
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max((parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - discountAmount).toFixed(2));
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max((parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - discountAmount).toFixed(2));
			} else {
				var discountConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
					return data.charge_ind == "D" && data.charge_code == "DISCOUNT";
				});
				if(discountConfig.length != 0){
					var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
						return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal();
					});
			
					if(itemGrossAmount.length != 0){
						var lineItemAmount = parseFloat(itemGrossAmount[0].gross_amount);
					} else {
						var lineItemAmount = 0.00;
					}
					var itemDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
						return data.item_code == "OVERALL" && data.charge_code == "DISCOUNT";							
					});
					if(itemDiscountAmount.length != 0){
						if(itemDiscountAmount[0].percentage_amount_ind == "P"){
							var lineDiscountAmount = ((lineItemAmount * parseFloat(itemDiscountAmount[0].percentage))/100);
						} else {
							var itemGross = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
								return data;
							});
							var overallAmount = 0.00;
							for(var index = 0; index <  itemGross.length; index++){
								overallAmount += parseFloat( itemGross[index].gross_amount);
							}
							var lineDiscountAmount = ((lineItemAmount * (parseFloat(itemDiscountAmount[0].amount) * 100 / overallAmount))/100);
						}
					} else {
						var itemDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
							return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.charge_code == "DISCOUNT";
						});
						if(itemDiscountAmount.length != 0){
							var lineDiscountAmount = parseFloat(itemDiscountAmount[0].amount);
						} else {
							var lineDiscountAmount = 0.00;
						}
					}
					if ((itemGrossAmount.length == 0) && (itemDiscountAmount.length == 0)) {
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
					} else {
						lineItemAmount = lineItemAmount - lineDiscountAmount;
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
					}
				} else {
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
				}
			}
			var otherDiscountConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
				return data.charge_ind == "D" && data.charge_code != "DISCOUNT";
			});
			if(otherDiscountConfig.length == 0){
				var discountIndicator = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
						return data.item_code != "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
					});
				if(discountIndicator.length != 0){
					var discountEntry = manage_customer_order_master_equipment_edit.variable.custom.discountIndicator.dataSource.data();
					for(var index = 0; index < discountEntry.length; index++){
						if (discountEntry[index].code == "D"){
							manage_customer_order_master_equipment_edit.variable.custom.discountIndicator.dataSource.filter({filters : [{field: "code",value: "D", operator: "neq"}]});
						}
					}	
				} else {
					manage_customer_order_master_equipment_edit.variable.custom.discountIndicator.dataSource.filter({});
				}
			}
		},
		tax_discount_indicator_change : function (element, event) {
			manage_customer_order_master_equipment_edit_child_taxdetails.customRequirementHandler.taxDiscountValidation();
			var grossAmount = parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").getVal());
			$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(grossAmount.toFixed(2)); 
			$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(grossAmount.toFixed(2));		
			$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(grossAmount.toFixed(2));
		},
		tax_discount_category_change : function (element, event) {
			if(($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() == "T") && ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() != "STD") && ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() != "")){
				var addlChargeData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data) {
					return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.addl_charge_ind == "A" && data.charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal();
				});
				if(addlChargeData.length != 0){
					var keyValidation = manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data();
					for (var i = 0; i < keyValidation.length; i++) {
						if (keyValidation[i].item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && keyValidation[i].charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() && keyValidation[i].addl_charge_ind == "A") {
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(parseFloat(keyValidation[i].amount).toFixed(2)); 
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(parseFloat(keyValidation[i].amount).toFixed(2));		
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(parseFloat(keyValidation[i].amount).toFixed(2));
						}
					}
				} else {
					alert ("There is no additional charge entry for the choosen category to apply taxation.");
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").setVal("");
				}
			} else {
				if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() == "OVERALL") {
					var overallDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
						return 	data.charge_code == "DISCOUNT";					
					});
					var discountAmount = 0.00;
					if (overallDiscountAmount.length != 0) {
						for(var index = 0; index < overallDiscountAmount.length; index++){
							discountAmount += parseFloat(overallDiscountAmount[index].amount);
						}
					}
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal((parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - discountAmount).toFixed(2));
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max((parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - discountAmount).toFixed(2));
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max((parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - discountAmount).toFixed(2));
				} else {
					var discountConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
						return data.charge_ind == "D" && data.charge_code == "DISCOUNT";
					});
					if(discountConfig.length != 0){
						var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
							return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal();
						});
								
						if(itemGrossAmount.length != 0){
							var lineItemAmount = parseFloat(itemGrossAmount[0].gross_amount);
						} else {
							var lineItemAmount = 0.00;
						}
						var itemDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
							return data.item_code == "OVERALL" && data.charge_code == "DISCOUNT";
						});
						if(itemDiscountAmount.length != 0){
							if(itemDiscountAmount[0].percentage_amount_ind == "P"){
								var lineDiscountAmount = ((lineItemAmount * parseFloat(itemDiscountAmount[0].percentage))/100);
							} else {
								var itemGross = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data;
								});
								var overallAmount = 0.00;
								for(var index = 0; index <  itemGross.length; index++){
									overallAmount += parseFloat( itemGross[index].gross_amount);
								}
								var lineDiscountAmount = ((lineItemAmount * (parseFloat(itemDiscountAmount[0].amount) * 100 / overallAmount))/100);
							}
						} else {
							var itemDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
								return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.charge_code == "DISCOUNT";
							});
							if(itemDiscountAmount.length != 0){
								var lineDiscountAmount = parseFloat(itemDiscountAmount[0].amount);
							} else {
								var lineDiscountAmount = 0.00;
							}
						}
						if ((itemGrossAmount.length == 0) && (itemDiscountAmount.length == 0)) {
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
						} else {
							lineItemAmount = lineItemAmount - lineDiscountAmount;
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
						}
					} else {
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
						$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
					}
				} 
			}
		},
		tax_discount_type_change : function (element, event) {
			if(($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() == "T") && ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() == "STD") && ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() != "")){
				var taxOnTaxConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
					return data.charge_ind == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() && data.charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() && data.charge_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type").getVal();
				});
				if(taxOnTaxConfig.length != 0){
					if(taxOnTaxConfig[0].parent_code != ""){
						var taxOnTaxData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data) {
							return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.addl_charge_ind == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() && data.charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() && data.charge_code == taxOnTaxConfig[0].parent_code;
						});
						if(taxOnTaxData.length == 0){
							alert ("There is no base tax entry for the choosen category to apply taxation.");
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type").setVal("");
						} else {
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(taxOnTaxData[0].amount);
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(taxOnTaxData[0].amount);
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(taxOnTaxData[0].amount);
						}
					} else {
						if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() == "OVERALL") {
							var overallDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
								return data.charge_code == "DISCOUNT";
							});
							var discountAmount = 0.00;
							if (overallDiscountAmount.length != 0) {
								for(var index = 0; index < overallDiscountAmount.length; index++){
									discountAmount += parseFloat(overallDiscountAmount[index].amount);
								}
							}
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal((parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - discountAmount).toFixed(2));
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max((parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - discountAmount).toFixed(2));
							$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max((parseFloat($("#manage_customer_order_master_equipment_edit_partsAmount").text()) - discountAmount).toFixed(2));
						} else {
							var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
								return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal();
							});
							var itemDiscountAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
								return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.charge_code == "DISCOUNT";
							});
							if ((itemGrossAmount.length == 0) && (itemDiscountAmount.length == 0)) {
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal("0.00");
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
							} else {
								var lineItemAmount = 0.00;
								for(var index = 0; index < itemGrossAmount.length; index++){
									lineItemAmount += parseFloat(itemGrossAmount[index].gross_amount);
								}
								var lineDiscountAmount = 0.00;
								for(var index = 0; index < itemDiscountAmount.length; index++){
									lineDiscountAmount += parseFloat(itemDiscountAmount[index].amount);
								}
								lineItemAmount = lineItemAmount - lineDiscountAmount;
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
								$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
							}
						}
					}
				}
			}
		},
		tax_discount_code_change : function (element, event) {
			manage_customer_order_master_equipment_edit_child_taxdetails.customRequirementHandler.taxDiscountValidation();
		},
		percentage_amount_indicator_change : function (element, event) {
			if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator").getVal() != "") {
				if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator").getVal() == "A") {
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_group").hide();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount_group").hide();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount_group").show();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").setVal("");
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").setVal("");
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").setVal("");
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
				} else if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator").getVal() == "P") {
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_group").show();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount_group").show();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount_group").hide();
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").setVal("");
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").setVal($("#manage_customer_order_master_equipment_edit_child_taxdetails_gross_amount").getVal());
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").setVal("");
					$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
				}
			} else {
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_group").hide();
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount_group").hide();
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount_group").hide();
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").setVal("");
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").setVal("");
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").setVal("");
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
			}
		},
		amount_change : function (element, event) {
			$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").setVal(parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_amount").getVal()).toFixed(2));
		},
		percentage_change : function (element, event) {
			if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").getVal() == "") {
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
			} else {
				var applicableAmount = parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").getVal());
				var percentage = parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").getVal());
				var taxDiscountAmount = (applicableAmount * percentage) / 100;
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").setVal(parseFloat(taxDiscountAmount).toFixed(2));
			}
		},
		applicable_on_amount_change : function (element, event) {
			if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").getVal() == "") {
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
			} else {
				var applicableAmount = parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").getVal());
				var percentage = parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").getVal());
				var taxDiscountAmount = (applicableAmount * percentage) / 100;
				$("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").setVal(parseFloat(taxDiscountAmount).toFixed(2));
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal() != "0.00") {
				if (manage_customer_order_master_equipment_edit.variable.custom.crudIndicator == "A") {
					var percentageValue,
					applicableAmountValue;
					if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").getVal() == "") {
						percentageValue = "0.00";
					} else {
						percentageValue = $("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").getVal().toString();
					}
					if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").getVal() == "") {
						applicableAmountValue = "0.00";
					} else {
						applicableAmountValue = $("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").getVal().toString();
					}
					manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.add({
						item_code : $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal(),
						item_variant_code : $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code").getVal(),
						item_description : mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal(), ""),
						variant_description : mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code").getVal(), ""),
						charge_sl_no : (manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
						addl_charge_ind : $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal(),
						charge_category : $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal(),
						charge_type : $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type").getVal(),
						charge_code : $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code").getVal(),
						percentage_amount_ind : $("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator").getVal(),
						percentage : percentageValue,
						applicable_on_amount : applicableAmountValue,
						amount : ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal()).toString(),
						currency_code : $("#manage_customer_order_master_equipment_edit_currency_code").getVal(),
						last_update_timestamp : "00000000-0000-0000-0000-000000000000",
						addl_charge_desc : mserviceUtilities.getDescriptionForCode("CHARGEINDICATOR_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal(), ""),
						charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal(), ""),
						charge_description : mserviceUtilities.getDescriptionForCode("CHARGECODE_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code").getVal(), ""),
						percentage_amount_ind_description : mserviceUtilities.getDescriptionForCode("PERCENTAMTINDICATOR_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator").getVal(), "")
					});
					
					if (typeof(fn_taxation_customer_order_equipment_tax_add_click_pre) === "function") {
						fn_taxation_customer_order_equipment_tax_add_click_pre();
					}
					
					if(($("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() == "OVERALL") && ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") && ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code").getVal() == "DISCOUNT")){
						
						var taxOnTaxConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});
						var taxOnTaxData =[];
						if(taxOnTaxConfig.length != 0){
							var taxDataConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							var taxData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
						}

						if (taxData.length != 0) {
							for (i = 0; i < taxData.length; i++) {
								var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data.item_code == taxData[i].item_code;
								});
								var itemGross = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data;
								});
								var overallAmount = 0.00;
								for(var index = 0; index <  itemGross.length; index++){
									overallAmount += parseFloat( itemGross[index].gross_amount);
								}
								var applicableAmount = parseFloat(itemGrossAmount[0].gross_amount) - ((parseFloat(itemGrossAmount[0].gross_amount) * (parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal()) * 100 / overallAmount))/100);
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
							var taxDataUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
							for(var index=0; index < taxDataUpdated.length; index++){
								for(var counter=0; counter < taxOnTaxData.length; counter++){
									if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
										var taxOnTaxUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						
						var taxOnTaxConfigOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});

						var taxOnTaxDataOverall =[];
						if(taxOnTaxConfigOverall.length != 0){
							var taxDataOverallConfigOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							var taxDataOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
						}
						var overallTaxAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
							return data;
						});
						var taxAmount = 0.00;
						if (overallTaxAmount.length != 0) {
							for(var index = 0; index < overallTaxAmount.length; index++){
								taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
							}
						}
						var applicableAmount = parseFloat(taxAmount) - parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal());
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
							var taxDataOverallUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
							for(var index=0; index < taxDataOverallUpdated.length; index++){
								for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
									if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
										var taxOnTaxUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

						var addlChargeData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});
						if (addlChargeData.length != 0) {
							for (i = 0; i < addlChargeData.length; i++) {
								var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data.item_code == taxData[i].item_code;
								});
								var itemGross = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data;
								});
								var overallAmount = 0.00;
								for(var index = 0; index <  itemGross.length; index++){
									overallAmount += parseFloat( itemGross[index].gross_amount);
								}
								var addlChargeApplicableAmount = parseFloat(itemGrossAmount[0].gross_amount) - ((parseFloat(itemGrossAmount[0].gross_amount) * (parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal()) * 100 / overallAmount))/100);
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

						var addlChargeDataUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});		
						if(addlChargeDataUpdated.length != 0){		
							for(var i=0; i < addlChargeDataUpdated.length; i++){	
								var addlTaxData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

						var addlChargeDataOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});
						if(addlChargeDataOverall.length != 0){
							var overallTaxAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
								return data;
							});
							var taxAmount = 0.00;
							if (overallTaxAmount.length != 0) {
								for(var index = 0; index < overallTaxAmount.length; index++){
									taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
								}
							}
							
							var addlChargeApplicableOverallAmount = parseFloat(taxAmount) - parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal());
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
							
							var addlChargeDataUpdatedOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});		
								
							if(addlChargeDataUpdatedOverall.length != 0){	
								for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
									var addlTaxDataOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					
					if (typeof(fn_taxation_customer_order_equipment_tax_add_click_post) === "function") {
						fn_taxation_customer_order_equipment_tax_add_click_post();
					}
					
				} else {
					var percentageValue,
					applicableAmountValue;
					if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").getVal() == "") {
						percentageValue = "0.00";
					} else {
						percentageValue = $("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage").getVal().toString();
					}
					if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").getVal() == "") {
						applicableAmountValue = "0.00";
					} else {
						applicableAmountValue = $("#manage_customer_order_master_equipment_edit_child_taxdetails_applicable_on_amount").getVal().toString();
					}
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("item_code", $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal());
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("item_variant_code", $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code").getVal());
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("item_description", mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal(), ""));
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("variant_description", mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_variant_code").getVal(), ""));
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("charge_sl_no", manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.charge_sl_no);
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("addl_charge_ind", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal());					
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("charge_category", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal());
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("charge_type", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_type").getVal());
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("charge_code", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code").getVal());
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("percentage_amount_ind", $("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator").getVal());
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("percentage", percentageValue);
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("applicable_on_amount", applicableAmountValue);
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("amount", ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal()).toString());
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("currency_code", $("#manage_customer_order_master_equipment_edit_currency_code").getVal());
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("last_update_timestamp", manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.last_update_timestamp);
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("addl_charge_desc", mserviceUtilities.getDescriptionForCode("CHARGEINDICATOR_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal(), ""));
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("charge_category_desc", mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal(), ""));
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("charge_description", mserviceUtilities.getDescriptionForCode("CHARGECODE_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code").getVal(), ""));
					manage_customer_order_master_equipment_edit_child_taxdetails.variable.custom.headerRecord.set("percentage_amount_ind_description", mserviceUtilities.getDescriptionForCode("PERCENTAMTINDICATOR_LIST", $("#manage_customer_order_master_equipment_edit_child_taxdetails_percentage_amount_indicator").getVal(), ""));
					
					if (typeof(fn_taxation_customer_order_equipment_tax_edit_click_pre) === "function") {
						fn_taxation_customer_order_equipment_tax_edit_click_pre();
					}
					
					if(manage_customer_order_master_equipment_edit.variable.custom.selectedRecord.addl_charge_ind == "A"){
						var addlChargeConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.charge_ind == "T" && data.charge_category == manage_customer_order_master_equipment_edit.variable.custom.selectedRecord.charge_category;
						});
						if(addlChargeConfig.length != 0){
							if(addlChargeConfig[0].syscalc_ind == "1"){
								var addlchrgstaxData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code == $("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() && data.charge_category == $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_category").getVal() && data.addl_charge_ind == "T";
								});	
								if (addlchrgstaxData.length != 0) {
									for (i = 0; i < addlchrgstaxData.length; i++) {
										var amount = ((parseFloat(addlchrgstaxData[i].percentage) * parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal())) / 100).toString();
										addlchrgstaxData[i].set("applicable_on_amount", $("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal());
										addlchrgstaxData[i].set("amount", amount);
									}
								}
							}
						}
					}
					if(($("#manage_customer_order_master_equipment_edit_child_taxdetails_item_code").getVal() == "OVERALL") && ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") && ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_code").getVal() == "DISCOUNT")){
						
						var taxOnTaxConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});
						var taxOnTaxData =[];
						if(taxOnTaxConfig.length != 0){
							var taxDataConfig = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							var taxData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
						}

						if (taxData.length != 0) {
							for (i = 0; i < taxData.length; i++) {
								var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data.item_code == taxData[i].item_code;
								});
								var itemGross = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data;
								});
								var overallAmount = 0.00;
								for(var index = 0; index <  itemGross.length; index++){
									overallAmount += parseFloat( itemGross[index].gross_amount);
								}
								var applicableAmount = parseFloat(itemGrossAmount[0].gross_amount) - ((parseFloat(itemGrossAmount[0].gross_amount) * (parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal()) * 100 / overallAmount))/100);
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
							var taxDataUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
							for(var index=0; index < taxDataUpdated.length; index++){
								for(var counter=0; counter < taxOnTaxData.length; counter++){
									if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
										var taxOnTaxUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						
						var taxOnTaxConfigOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});

						var taxOnTaxDataOverall =[];
						if(taxOnTaxConfigOverall.length != 0){
							var taxDataOverallConfigOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							var taxDataOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
						}
						var overallTaxAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
							return data;
						});
						var taxAmount = 0.00;
						if (overallTaxAmount.length != 0) {
							for(var index = 0; index < overallTaxAmount.length; index++){
								taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
							}
						}
						var applicableAmount = parseFloat(taxAmount) - parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal());
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
							var taxDataOverallUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
							for(var index=0; index < taxDataOverallUpdated.length; index++){
								for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
									if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
										var taxOnTaxUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

						var addlChargeData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});
						if (addlChargeData.length != 0) {
							for (i = 0; i < addlChargeData.length; i++) {
								var itemGrossAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data.item_code == taxData[i].item_code;
								});
								var itemGross = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data;
								});
								var overallAmount = 0.00;
								for(var index = 0; index <  itemGross.length; index++){
									overallAmount += parseFloat( itemGross[index].gross_amount);
								}
								var addlChargeApplicableAmount = parseFloat(itemGrossAmount[0].gross_amount) - ((parseFloat(itemGrossAmount[0].gross_amount) * (parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal()) * 100 / overallAmount))/100);
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

						var addlChargeDataUpdated = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});		
						if(addlChargeDataUpdated.length != 0){		
							for(var i=0; i < addlChargeDataUpdated.length; i++){	
								var addlTaxData = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

						var addlChargeDataOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});
						if(addlChargeDataOverall.length != 0){
							var overallTaxAmount = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
								return data;
							});
							var taxAmount = 0.00;
							if (overallTaxAmount.length != 0) {
								for(var index = 0; index < overallTaxAmount.length; index++){
									taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
								}
							}
							
							var addlChargeApplicableOverallAmount = parseFloat(taxAmount) - parseFloat($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_amount").getVal());
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
							
							var addlChargeDataUpdatedOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});		
								
							if(addlChargeDataUpdatedOverall.length != 0){	
								for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
									var addlTaxDataOverall = $.grep(manage_customer_order_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					
					if (typeof(fn_taxation_customer_order_equipment_tax_edit_click_post) === "function") {
						fn_taxation_customer_order_equipment_tax_edit_click_post();
					}
				}
				if ($("#manage_customer_order_master_equipment_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") {
					alert("Discount details is saved successfully.");
				} else {
					alert("Tax details is saved successfully.");
				}
				return true;
			} else {
				alert("Empty amount cannot be added.");
				return false;
			}
		}
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
		custom : {}
	}
};