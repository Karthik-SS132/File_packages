var manage_salesinvoice_master_equipment_edit = {
	constructScreen : function () {
		manage_salesinvoice_master_equipment_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_manage_salesinvoice_details",
				outputPath : false,
			    api : true,
				pageSize : 10,
				inputParameter : {
					p_invoice_no : "$manage_salesinvoice_master_equipment.variable.custom.selectedRecord.salesinvoice_no"
				},
				schemaModel : true,
				screenID : "manage_salesinvoice_master_equipment_edit",
				dataSourceName : "datasource_1",
				processResponse : true,
				parse : manage_salesinvoice_master_equipment_edit.customRequirementHandler.dataSourceParseSalesInvoice
			});
		manage_salesinvoice_master_equipment_edit.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_manage_salesinvoice_details",
				outputPath : false,
			    api : true,
				pageSize : 10,
				inputParameter : {
					p_invoice_no : "$manage_salesinvoice_master_equipment.variable.custom.selectedRecord.salesinvoice_no"
				},
				schemaModel : true,
				screenID : "manage_salesinvoice_master_equipment_edit",
				dataSourceName : "datasource_2",
				processResponse : true,
				parse : manage_salesinvoice_master_equipment_edit.customRequirementHandler.dataSourceParseTax
			});
		if (manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "U" || manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "V") {
			manage_salesinvoice_master_equipment_edit.variable.custom.datasource_1.read();
			manage_salesinvoice_master_equipment_edit.variable.custom.datasource_2.read();
			manage_salesinvoice_master_equipment_edit.variable.custom.currency_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.currency_code, "");
			manage_salesinvoice_master_equipment_edit.variable.custom.org_level_no_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELNO_LIST", manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.organogram_level_no, "");
			manage_salesinvoice_master_equipment_edit.variable.custom.org_level_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELCODE_LIST", manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.organogram_level_code, "");
			manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject = {
				code : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_id,
				description : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_id_desc,
				addr_1 : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_address_line_1,
				addr_2 : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_address_line_2,
				addr_3 : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_address_line_3,
				city : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_city,
				pincode : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_pincode,
				state : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_state,
				state_desc : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_state_desc,
				country : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_country,
				country_desc : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_country_desc
			};
			manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject = {
				code : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_id,
				description : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_id_desc,
				addr_1 : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_address_line_1,
				addr_2 : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_address_line_2,
				addr_3 : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_address_line_3,
				city : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_city,
				pincode : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_pincode,
				state : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_state,
				state_desc : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_state_desc,
				country : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_country,
				country_desc : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_country_desc
			};
			manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject = {
				code : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_id,
				description : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_id_desc,
				addr_1 : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_address_line_1,
				addr_2 : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_address_line_2,
				addr_3 : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_address_line_3,
				city : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_city,
				pincode : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_pincode,
				state : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_state,
				state_desc : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_state_desc,
				country : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_country,
				country_desc : manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_country_desc
			};
			manage_salesinvoice_master_equipment_edit.customRequirementHandler.addressFetch();
			$("#manage_salesinvoice_master_equipment_edit_seller_address").text(manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddress);
			$("#manage_salesinvoice_master_equipment_edit_buyer_address").text(manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddress);
			$("#manage_salesinvoice_master_equipment_edit_consignee_address").text(manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddress);
		}
	},
	postConstruct : function () {
		if (typeof(fn_taxation_salesinvoice_equipment_load) === "function") {
			fn_taxation_salesinvoice_equipment_load();
		}
		manage_salesinvoice_master_equipment_edit.customRequirementHandler.amountCalculation();
		if (manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "A") {
			manage_salesinvoice_master_equipment.variable.custom.selectedRecord = undefined;
			$("#manage_salesinvoice_master_equipment_edit_salesinvoice_date").setMin(new Date());
			manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject = {
				code : "",
				description : "",
				addr_1 : "",
				addr_2 : "",
				addr_3 : "",
				city : "",
				pincode : "",
				state : "",
				state_desc : "",
				country : "",
				country_desc : ""
			};
			manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject = {
				code : "",
				description : "",
				addr_1 : "",
				addr_2 : "",
				addr_3 : "",
				city : "",
				pincode : "",
				state : "",
				state_desc : "",
				country : "",
				country_desc : ""
			};
			manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject = {
				code : "",
				description : "",
				addr_1 : "",
				addr_2 : "",
				addr_3 : "",
				city : "",
				pincode : "",
				state : "",
				state_desc : "",
				country : "",
				country_desc : ""
			};
		}
		$(".manage_salesinvoice_master_equipment_edit_currencyCode").text($("#manage_salesinvoice_master_equipment_edit_currency_code").getVal());
		for (var index = 0; index < manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data().length; index++) {
			manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
		};
		manage_salesinvoice_master_equipment_edit.variable.custom.configurationModel = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_searchcondition",
			outputPath: "context/outputparam",
			pageSize: 10,
			inputParameter: {
				p_inputparam_xml: "<inputparam><lov_code_type>'CHARGE_CONFIGURATION'</lov_code_type><search_field_1>'SA'</search_field_1><search_field_2>'ALL'</search_field_2></inputparam>"
			}
		});
		manage_salesinvoice_master_equipment_edit.variable.custom.configurationModel.read();
		manage_salesinvoice_master_equipment_edit.variable.custom.configurationData = manage_salesinvoice_master_equipment_edit.variable.custom.configurationModel.data();
		manage_salesinvoice_master_equipment_edit.variable.custom.sysCalcTaxation = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_searchcondition",
			outputPath: "context/outputparam",
			pageSize: 10,
			inputParameter: {
				p_inputparam_xml: "<inputparam><lov_code_type>'SYSCALC_TAXATION_LIST'</lov_code_type><search_field_1>'SA'</search_field_1><search_field_2>'ALL'</search_field_2></inputparam>"
			}
		});
		manage_salesinvoice_master_equipment_edit.variable.custom.sysCalcTaxation.read();
		manage_salesinvoice_master_equipment_edit.variable.custom.sysCalcTaxationData = manage_salesinvoice_master_equipment_edit.variable.custom.sysCalcTaxation.data();
		if((manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "U" || manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "V") && (manage_salesinvoice_master_equipment.variable.custom.selectedRecord.salesinvoice_status == "OD")){
			var addlChargeDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
			});
			if(addlChargeDataOverall.length != 0){
				var overallDiscountAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
					return data.charge_code == "DISCOUNT";
				});
				var discountAmount = 0.00;
				if (overallDiscountAmount.length != 0) {
					for(var index = 0; index < overallDiscountAmount.length; index++){
						discountAmount += parseFloat(overallDiscountAmount[index].amount);
					}
				}
				
				var overallTaxAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data;
				});
				var taxAmount = 0.00;
				if (overallTaxAmount.length != 0) {
					for(var index = 0; index < overallTaxAmount.length; index++){
						taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
					}
				}
				
				var addlChargeApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
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
				
				var addlChargeDataUpdatedOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
					return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
				});		
					
				if(addlChargeDataUpdatedOverall.length != 0){	
					for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
						var addlTaxDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
			
			var overallDiscountData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
			});
			
			if(overallDiscountData.length != 0){
				
				var itemGross = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data;
				});
				var overallAmount = 0.00;
				for(var index = 0; index <  itemGross.length; index++){
					overallAmount += parseFloat( itemGross[index].gross_amount);
				}
				if(overallDiscountData[0].percentage_amount_ind == "P"){
					var amount = ((parseFloat(overallDiscountData[0].percentage) * parseFloat(overallAmount)) / 100).toString();
					overallDiscountData[0].set("applicable_on_amount", (overallAmount).toString());
					overallDiscountData[0].set("amount", amount);
				} else {
					if(parseFloat(overallDiscountData[0].amount) > overallAmount){
						overallDiscountData[0].set("amount", overallAmount);
					}
				}
				
				var overallDiscount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
					return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
				});
				
				var taxOnTaxConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
					return data.parent_code != "";
				});
				var taxOnTaxData =[];
				if(taxOnTaxConfig.length != 0){
					var taxDataConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					var taxData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
					});
				}

				if (taxData.length != 0) {
					for (i = 0; i < taxData.length; i++) {
						var itemGrossAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
							return data.item_code == taxData[i].item_code;
						});
						var itemGross = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
					var taxDataUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
					});
					for(var index=0; index < taxDataUpdated.length; index++){
						for(var counter=0; counter < taxOnTaxData.length; counter++){
							if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
								var taxOnTaxUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
				
				var taxOnTaxConfigOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
					return data.parent_code != "";
				});

				var taxOnTaxDataOverall =[];
				if(taxOnTaxConfigOverall.length != 0){
					var taxDataOverallConfigOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					var taxDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
					});
				}
				var overallTaxAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
					var taxDataOverallUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
					});
					for(var index=0; index < taxDataOverallUpdated.length; index++){
						for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
							if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
								var taxOnTaxUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

				var addlChargeData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
					return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
				});
				if (addlChargeData.length != 0) {
					for (i = 0; i < addlChargeData.length; i++) {
						var itemGrossAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
							return data.item_code == taxData[i].item_code;
						});
						var itemGross = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
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

				var addlChargeDataUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
					return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
				});		
				if(addlChargeDataUpdated.length != 0){		
					for(var i=0; i < addlChargeDataUpdated.length; i++){	
						var addlTaxData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

				var addlChargeDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
					return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
				});
				if(addlChargeDataOverall.length != 0){
					var overallTaxAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
					
					var addlChargeDataUpdatedOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
					});		
						
					if(addlChargeDataUpdatedOverall.length != 0){	
						for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
							var addlTaxDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
			manage_salesinvoice_master_equipment_edit.refreshScreen();
		}
	},
	initializeWidgets : function () {
		manage_salesinvoice_master_equipment_edit.variable.custom.tabstrip = $("#manage_salesinvoice_master_equipment_edit_tabstrip").kendoTabStrip({
				animation : {
					open : {
						effects : "fadeIn"
					},
				},
			}).data("kendoTabStrip");
		$("#manage_salesinvoice_master_equipment_edit_fiscal_year").initializeWDisplayarea({
			screenID : "manage_salesinvoice_master_equipment_edit",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.fiscal_year",
		});
		$("#manage_salesinvoice_master_equipment_edit_salesinvoice_no").initializeWDisplayarea({
			screenID : "manage_salesinvoice_master_equipment_edit",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_no",
		});
		$("#manage_salesinvoice_master_equipment_edit_salesinvoice_status").initializeWDisplayarea({
			screenID : "manage_salesinvoice_master_equipment_edit",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_status_desc"
		});
		$("#manage_salesinvoice_master_equipment_edit_salesinvoice_category").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				informationType : "'SALESINVOICECATEGORY_LIST'",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_salesinvoice_master_equipment_edit_salesinvoice_type",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_category",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_category_desc"
		});
		$("#manage_salesinvoice_master_equipment_edit_salesinvoice_type").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				informationType : "'SALESINVOICETYPE_LIST_LINKED'",
				searchField1 : "#manage_salesinvoice_master_equipment_edit_salesinvoice_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_type",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_type_desc"
		});
		manage_salesinvoice_master_equipment_edit.variable.custom.salesinvoice_date = $("#manage_salesinvoice_master_equipment_edit_salesinvoice_date").initializeWDatepicker({
				screenID : "manage_salesinvoice_master_equipment_edit",
				minimum : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_date",
				defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_date",
			});
		$("#manage_salesinvoice_master_equipment_edit_seller_code").initializeWCombobox({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				informationType : "'DEALER_LIST'",
				searchField1 : "$manage_salesinvoice_master_equipment_edit.variable.custom.seller_code_serverFilterValue",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			childFieldID : "manage_salesinvoice_master_equipment_edit_seller_location",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_id",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_id_desc"
		});
		manage_salesinvoice_master_equipment_edit.variable.custom.seller_location = $("#manage_salesinvoice_master_equipment_edit_seller_location").initializeWCombobox({
				screenID : "manage_salesinvoice_master_equipment_edit",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'SELLERLOCATION_LIST_LINKED'</lov_code_type><search_field_1>#manage_salesinvoice_master_equipment_edit_seller_code</search_field_1></inputparam>"
					},
				},
				dataTextField : "description",
				dataValueField : "code",
				serverFiltering : true,
				defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_location_code",
				defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.seller_location_desc"
			});
		$("#manage_salesinvoice_master_equipment_edit_buyer_code").initializeWCombobox({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_LIST_SEARCH_WO_ZZZ'</lov_code_type><search_field_1>$manage_salesinvoice_master_equipment_edit.variable.custom.buyer_code_serverFilterValue</search_field_1></inputparam>"
				},
			},
			dataTextField : "name",
			dataValueField : "id",
			childFieldID : "manage_salesinvoice_master_equipment_edit_buyer_location",
			serverFiltering : true,
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_id",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_id_desc",
		});
		manage_salesinvoice_master_equipment_edit.variable.custom.buyer_location = $("#manage_salesinvoice_master_equipment_edit_buyer_location").initializeWCombobox({
				screenID : "manage_salesinvoice_master_equipment_edit",
				dataSource : {
					informationType : "'CUSTOMERLOCATION_LIST_LINKED'",
					searchField1 : "#manage_salesinvoice_master_equipment_edit_buyer_code",
					searchField2 : "'BUYERLOCATION'"
				},
				dataTextField : "description",
				dataValueField : "code",
				serverFiltering : true,
				defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_location_code",
				defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_location_desc"
			});
		$("#manage_salesinvoice_master_equipment_edit_consignee_code").initializeWCombobox({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_LIST_SEARCH_WO_ZZZ'</lov_code_type><search_field_1>$manage_salesinvoice_master_equipment_edit.variable.custom.consignee_code_serverFilterValue</search_field_1></inputparam>"
				},
			},
			dataTextField : "name",
			dataValueField : "id",
			childFieldID : "manage_salesinvoice_master_equipment_edit_consignee_location",
			serverFiltering : true,
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_id",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_id_desc",
		});
		manage_salesinvoice_master_equipment_edit.variable.custom.consignee_location = $("#manage_salesinvoice_master_equipment_edit_consignee_location").initializeWCombobox({
				screenID : "manage_salesinvoice_master_equipment_edit",
				dataSource : {
					informationType : "'CUSTOMERLOCATION_LIST_LINKED'",
					searchField1 : "#manage_salesinvoice_master_equipment_edit_consignee_code",
					searchField2 : "'CONSIGNEELOCATION'"
				},
				dataTextField : "description",
				dataValueField : "code",
				serverFiltering : true,
				defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_location_code",
				defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.consignee_location_desc"
			});
		$("#manage_salesinvoice_master_equipment_edit_org_level_no").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				informationType : "'ORGLEVELNO_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_salesinvoice_master_equipment_edit_org_level_code",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.organogram_level_no",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.org_level_no_defaultValueDescription"
		});
		$("#manage_salesinvoice_master_equipment_edit_org_level_code").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				informationType : "'ORGLEVELCODE_LIST'",
				searchField1 : "#manage_salesinvoice_master_equipment_edit_org_level_no",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.organogram_level_code",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.org_level_code_defaultValueDescription"
		});
		$("#manage_salesinvoice_master_equipment_edit_place_of_despatch").initializeWTextbox({
			screenID : "manage_salesinvoice_master_equipment_edit",
			maxlength : "30",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.place_of_despatch",
		});
		$("#manage_salesinvoice_master_equipment_edit_destination").initializeWTextbox({
			screenID : "manage_salesinvoice_master_equipment_edit",
			maxlength : "30",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.destination",
		});
		$("#manage_salesinvoice_master_equipment_edit_despatch_mode").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				informationType : "'DESPATCHMODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.despatch_mode_road_rail",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.despatch_mode_road_rail_desc"
		});
		$("#manage_salesinvoice_master_equipment_edit_buyer_ref").initializeWTextbox({
			screenID : "manage_salesinvoice_master_equipment_edit",
			maxlength : "600",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_reference",
		});
		$("#manage_salesinvoice_master_equipment_edit_buyer_ref_date").initializeWDatepicker({
			screenID : "manage_salesinvoice_master_equipment_edit",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.buyer_reference_date"
		});
		$("#manage_salesinvoice_master_equipment_edit_other_ref").initializeWTextbox({
			screenID : "manage_salesinvoice_master_equipment_edit",
			maxlength : "600",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.other_reference",
		});
		$("#manage_salesinvoice_master_equipment_edit_payment_terms").initializeWTextarea({
			screenID : "manage_salesinvoice_master_equipment_edit",
			maxlength : "1000",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.payment_terms",
		});
		$("#manage_salesinvoice_master_equipment_edit_currency_code").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				informationType : "'CURRENCYCODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.currency_code",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.currency_code_defaultValueDescription"
		});
		$("#manage_salesinvoice_master_equipment_edit_despatch_details").initializeWTextbox({
			screenID : "manage_salesinvoice_master_equipment_edit",
			maxlength : "1000",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.despatch_details",
		});
		$("#manage_salesinvoice_master_equipment_edit_terms_of_delivery").initializeWTextarea({
			screenID : "manage_salesinvoice_master_equipment_edit",
			maxlength : "1000",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.delivery_terms",
		});
		$("#manage_salesinvoice_master_equipment_edit_terms_and_condition").initializeWTextarea({
			screenID : "manage_salesinvoice_master_equipment_edit",
			maxlength : "1000",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_terms_conditions",
		});
		$("#manage_salesinvoice_master_equipment_edit_salesinvoice_summary").initializeWTextarea({
			screenID : "manage_salesinvoice_master_equipment_edit",
			maxlength : "1000",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.salesinvoice_summary_comments",
		});
		$("#manage_salesinvoice_master_equipment_edit_company_location").initializeWDropdownlist({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				informationType : "'COMPANYLOCATION_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.company_location_code",
			defaultValueDescription : "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.company_location_name"
		});
		$("#manage_salesinvoice_master_equipment_edit_warehouse_id").initializeWCombobox({
			screenID : "manage_salesinvoice_master_equipment_edit",
			dataSource : {
				informationType : "'WAREHOUSE_LIST'",
				searchField1 : "$manage_salesinvoice_master_equipment_edit.variable.custom.to_warehouse_id_serverFilterValue"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			defaultValue: "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.warehouse_id",
			defaultValueDescription: "$manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record.warehouse_name"
		});
		manage_salesinvoice_master_equipment_edit.variable.custom.grid_1 = $("#manage_salesinvoice_master_equipment_edit_grid_1").initializeWGrid({
				screenID : "manage_salesinvoice_master_equipment_edit",
				toolbar : "#manage_salesinvoice_master_equipment_edit_grid_1_toolbar_template",
				dataSource : manage_salesinvoice_master_equipment_edit.variable.custom.datasource_1,
				height : 400,
				pageSize : 10,
				filterable : false,
			});
		manage_salesinvoice_master_equipment_edit.variable.custom.grid_2 = $("#manage_salesinvoice_master_equipment_edit_grid_2").initializeWGrid({
				screenID : "manage_salesinvoice_master_equipment_edit",
				toolbar : "#manage_salesinvoice_master_equipment_edit_grid_2_toolbar_template",
				dataSource : manage_salesinvoice_master_equipment_edit.variable.custom.datasource_2,
				height : 400,
				pageSize : 10,
				filterable : false,
			});
		manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.refresh();
		manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.refresh();
	},
	refreshScreen : function () {
		manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.refresh();
		manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.refresh();
		if (manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator != "D") {
			manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.pageSize(10);
			manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.pageSize(10);
		}
		manage_salesinvoice_master_equipment_edit.customRequirementHandler.amountCalculation();
		if (typeof(fn_taxation_salesinvoice_equipment_load) === "function") {
			fn_taxation_salesinvoice_equipment_load();
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "A") {
				manage_salesinvoice_master_equipment_edit.variable.custom.taxIndicator = "";
				if ((manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "A") && (element.parentElement.id == "manage_salesinvoice_master_equipment_edit_grid_1_toolbar_element")) {
					manage_salesinvoice_master_equipment_edit.customRequirementHandler.partScreen();
				} else if ((manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "A") && (element.parentElement.id == "manage_salesinvoice_master_equipment_edit_grid_2_toolbar_element")) {
					manage_salesinvoice_master_equipment_edit.customRequirementHandler.taxScreen();
				}
			} else if(manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "D"){
				if (element.parentElement.id == "manage_salesinvoice_master_equipment_edit_grid_1_toolbar_element") {
					if (manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord != undefined) {
						manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.remove(manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord);
						alert("Data deleted successfully.");
						for (var index = 0; index < manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length; index++) {
							manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[index].set("salesinvoice_item_sl_no", (index + 1).toString());
						}
						var taxData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
							return data.item_code == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.item_code;
						});
						if(taxData.length != 0){
							for (var index = 0; index < taxData.length; index++){
								manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.remove(taxData[index]);
							}
							for (var index = 0; index < manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data().length; index++) {
								manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
							}
						}
						if(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length == 0){
							var addlChargeOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL";
							});
							if(addlChargeOverall.length != 0){
								for (var index = 0; index < addlChargeOverall.length; index++){
									manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.remove(addlChargeOverall[index]);
								}
							}
						}
						
						if (typeof(fn_taxation_salesinvoice_equipment_delete_click_pre) === "function") {
							fn_taxation_salesinvoice_equipment_delete_click_pre();
						}
						
						var addlChargeDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});
						if(addlChargeDataOverall.length != 0){
							var overallDiscountAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
								return data.charge_code == "DISCOUNT";
							});
							var discountAmount = 0.00;
							if (overallDiscountAmount.length != 0) {
								for(var index = 0; index < overallDiscountAmount.length; index++){
									discountAmount += parseFloat(overallDiscountAmount[index].amount);
								}
							}
							
							var overallTaxAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
								return data;
							});
							var taxAmount = 0.00;
							if (overallTaxAmount.length != 0) {
								for(var index = 0; index < overallTaxAmount.length; index++){
									taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
								}
							}
							
							var addlChargeApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
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
							
							var addlChargeDataUpdatedOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});		
								
							if(addlChargeDataUpdatedOverall.length != 0){	
								for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
									var addlTaxDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						
						
						var taxOnTaxConfigOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});

						var taxOnTaxDataOverall =[];
						if(taxOnTaxConfigOverall.length != 0){
							var taxDataOverallConfigOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							var taxDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
						}
						var overallTaxAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
							return data;
						});
						var taxAmount = 0.00;
						if (overallTaxAmount.length != 0) {
							for(var index = 0; index < overallTaxAmount.length; index++){
								taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
							}
						}
						var overallDiscountAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function(data){
							return data.charge_code == "DISCOUNT";
						});
						var discountAmount = 0.00;
						if (overallDiscountAmount.length != 0) {
							for(var index = 0; index < overallDiscountAmount.length; index++){
								discountAmount += parseFloat(overallDiscountAmount[index].amount);
							}
						}
						var applicableAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
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
							var taxDataOverallUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
							for(var index=0; index < taxDataOverallUpdated.length; index++){
								for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
									if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
										var taxOnTaxUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						
						
						var overallDiscountData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
						});
						
						if(overallDiscountData.length != 0){
							
							var itemGross = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
								return data;
							});
							var overallAmount = 0.00;
							for(var index = 0; index <  itemGross.length; index++){
								overallAmount += parseFloat( itemGross[index].gross_amount);
							}
							if(overallDiscountData[0].percentage_amount_ind == "P"){
								var amount = ((parseFloat(overallDiscountData[0].percentage) * parseFloat(overallAmount)) / 100).toString();
								overallDiscountData[0].set("applicable_on_amount", (overallAmount).toString());
								overallDiscountData[0].set("amount", amount);
							} else {
								if(parseFloat(overallDiscountData[0].amount) > overallAmount){
									overallDiscountData[0].set("amount", overallAmount);
								}
							}
							
							var overallDiscount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
							});
							
							var taxOnTaxConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
								return data.parent_code != "";
							});
							var taxOnTaxData =[];
							if(taxOnTaxConfig.length != 0){
								var taxDataConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
								var taxData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
								});
							}

							if (taxData.length != 0) {
								for (i = 0; i < taxData.length; i++) {
									var itemGrossAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
										return data.item_code == taxData[i].item_code;
									});
									var itemGross = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
								var taxDataUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
								});
								for(var index=0; index < taxDataUpdated.length; index++){
									for(var counter=0; counter < taxOnTaxData.length; counter++){
										if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
											var taxOnTaxUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							
							var taxOnTaxConfigOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
								return data.parent_code != "";
							});

							var taxOnTaxDataOverall =[];
							if(taxOnTaxConfigOverall.length != 0){
								var taxDataOverallConfigOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
								var taxDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
								});
							}
							var overallTaxAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
								var taxDataOverallUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
								});
								for(var index=0; index < taxDataOverallUpdated.length; index++){
									for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
										if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
											var taxOnTaxUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

							var addlChargeData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});
							if (addlChargeData.length != 0) {
								for (i = 0; i < addlChargeData.length; i++) {
									var itemGrossAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
										return data.item_code == taxData[i].item_code;
									});
									var itemGross = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
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

							var addlChargeDataUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});		
							if(addlChargeDataUpdated.length != 0){		
								for(var i=0; i < addlChargeDataUpdated.length; i++){	
									var addlTaxData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

							var addlChargeDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});
							if(addlChargeDataOverall.length != 0){
								var overallTaxAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
								
								var addlChargeDataUpdatedOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
								});		
									
								if(addlChargeDataUpdatedOverall.length != 0){	
									for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
										var addlTaxDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						
						if (typeof(fn_taxation_salesinvoice_equipment_delete_click_post) === "function") {
							fn_taxation_salesinvoice_equipment_delete_click_post();
						}
						
						manage_salesinvoice_master_equipment_edit.refreshScreen();
					} else {
						alert("No row has been selected.");
						return false;
					}
				} else if (element.parentElement.id == "manage_salesinvoice_master_equipment_edit_grid_2_toolbar_element") {
					if (manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord != undefined) { 
						var userDeleteConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData,function(data) {
							return data.charge_ind == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.addl_charge_ind && data.charge_category == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_category && data.charge_code == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_type;
						});
						if(userDeleteConfig.length != 0){
							if(userDeleteConfig[0].syscalc_ind == "1"){
								alert("You do not have access to delete this record.");
								return false;
							}
						}
						var addlchrgstaxData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.item_code && data.charge_category == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_category && data.addl_charge_ind == "T" && data.addl_charge_ind != manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.addl_charge_ind;
						});		
						if (addlchrgstaxData.length != 0) {
							for (var index = 0; index < addlchrgstaxData.length; index++) {
								manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.remove(addlchrgstaxData[index]);
							}
							for (var index = 0; index < manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data().length; index++) {
								manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
							}
						}
						var taxOnTaxConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});
						if(taxOnTaxConfig.length != 0){
							for (var index = 0; index < taxOnTaxConfig.length; index++) {
								if(taxOnTaxConfig[index].parent_code == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_code){
									var taxOnTaxConfigData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
										return data.charge_category == taxOnTaxConfig[index].charge_category && data.addl_charge_ind == taxOnTaxConfig[index].charge_ind && data.charge_code == taxOnTaxConfig[index].charge_code;
									});
									if(taxOnTaxConfigData.length != 0){
										manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.remove(taxOnTaxConfigData[0]);
									}
								}
							}
							for (var index = 0; index < manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data().length; index++) {
								manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
							}
						}
						manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.remove(manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord);
						
						if (typeof(fn_taxation_salesinvoice_equipment_tax_delete_click_pre) === "function") {
							fn_taxation_salesinvoice_equipment_tax_delete_click_pre();
						}
						
						if((manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.item_code == "OVERALL") && (manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.addl_charge_ind == "D") && (manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_code == "DISCOUNT")){
							var taxOnTaxConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
								return data.parent_code != "";
							});
							var taxOnTaxData =[];
							if(taxOnTaxConfig.length != 0){
								var taxDataConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
								var taxData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
								});
							}

							if (taxData.length != 0) {
								for (i = 0; i < taxData.length; i++) {
									var itemGrossAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
										return data.item_code == taxData[i].item_code;
									});
									var itemGross = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
										return data;
									});
									var overallAmount = 0.00;
									for(var index = 0; index <  itemGross.length; index++){
										overallAmount += parseFloat( itemGross[index].gross_amount);
									}
									var applicableAmount = parseFloat(itemGrossAmount[0].gross_amount);
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
								var taxDataUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
								});
								for(var index=0; index < taxDataUpdated.length; index++){
									for(var counter=0; counter < taxOnTaxData.length; counter++){
										if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
											var taxOnTaxUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							
							var taxOnTaxConfigOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
								return data.parent_code != "";
							});

							var taxOnTaxDataOverall =[];
							if(taxOnTaxConfigOverall.length != 0){
								var taxDataOverallConfigOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
								var taxDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
								});
							}
							var overallTaxAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
								return data;
							});
							var taxAmount = 0.00;
							if (overallTaxAmount.length != 0) {
								for(var index = 0; index < overallTaxAmount.length; index++){
									taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
								}
							}
							var applicableAmount = parseFloat(taxAmount);
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
								var taxDataOverallUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
								});
								for(var index=0; index < taxDataOverallUpdated.length; index++){
									for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
										if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
											var taxOnTaxUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

							var addlChargeData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});
							if (addlChargeData.length != 0) {
								for (i = 0; i < addlChargeData.length; i++) {
									var itemGrossAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
										return data.item_code == taxData[i].item_code;
									});
									var itemGross = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
										return data;
									});
									var overallAmount = 0.00;
									for(var index = 0; index <  itemGross.length; index++){
										overallAmount += parseFloat( itemGross[index].gross_amount);
									}
									var addlChargeApplicableAmount = parseFloat(itemGrossAmount[0].gross_amount);
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

							var addlChargeDataUpdated = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});		
							if(addlChargeDataUpdated.length != 0){		
								for(var i=0; i < addlChargeDataUpdated.length; i++){	
									var addlTaxData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

							var addlChargeDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});
							if(addlChargeDataOverall.length != 0){
								var overallTaxAmount = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data;
								});
								var taxAmount = 0.00;
								if (overallTaxAmount.length != 0) {
									for(var index = 0; index < overallTaxAmount.length; index++){
										taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
									}
								}
								
								var addlChargeApplicableOverallAmount = parseFloat(taxAmount);
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
								
								var addlChargeDataUpdatedOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
								});		
									
								if(addlChargeDataUpdatedOverall.length != 0){	
									for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
										var addlTaxDataOverall = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						alert("Data deleted successfully.");
						for (var index = 0; index < manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data().length; index++) {
							manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
						}
						
						if (typeof(fn_taxation_salesinvoice_equipment_tax_delete_click_post) === "function") {
							fn_taxation_salesinvoice_equipment_tax_delete_click_post();
						}
						
						manage_salesinvoice_master_equipment_edit.refreshScreen();
					} else {
						alert("No row has been selected.");
						return false;
					}
				}
				if (typeof(fn_taxation_salesinvoice_equipment_load) === "function") {
					fn_taxation_salesinvoice_equipment_load();
				}
			} else {
				if ((manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "U" || manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "V") && (element.parentElement.id == "manage_salesinvoice_master_equipment_edit_grid_1_toolbar_element") && (manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord != undefined)) {
					manage_salesinvoice_master_equipment_edit.variable.custom.taxIndicator = "";
					manage_salesinvoice_master_equipment_edit.customRequirementHandler.partScreen();
				} else if ((manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "U" || manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "V") && (element.parentElement.id == "manage_salesinvoice_master_equipment_edit_grid_2_toolbar_element") && (manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord != undefined)) {
					manage_salesinvoice_master_equipment_edit.variable.custom.taxIndicator = "";
					if(manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "U" && manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.addl_charge_ind == "D"){
						if(manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.item_code != "OVERALL"){
							alert("You do not have access to edit this record.");
							return false;
						}
					}
					if(manage_salesinvoice_master_equipment_edit.variable.custom.crudIndicator == "U"){
						var addlChargeConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.charge_ind == "T" && data.charge_category == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_category;
						});
						if(addlChargeConfig.length != 0){
							if(addlChargeConfig[0].syscalc_ind == "0"){
								var addlchrgsData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data(), function (data) {
									return data.item_code == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.item_code && data.charge_category == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_category && data.addl_charge_ind == "T" && data.addl_charge_ind != manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.addl_charge_ind;
								});
								if(addlchrgsData.length != 0){
									alert("The selected record has tax applied so cannot be edited. To edit this record, delete the tax entry and proceed.");
									return false;
								}
							}
						}
						var taxOnTax = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});
						if(taxOnTax.length != 0){
							if(taxOnTax[0].parent_code == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_code){
								if(taxOnTax[0].syscalc_ind == "0"){
									alert("The selected record has child tax applied so cannot be edited. To edit this record, delete the child tax entry and proceed.");
									return false;
								}
							}
						}
					}
					var userEditConfig = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.configurationData, function(data) {
						return data.charge_ind == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.addl_charge_ind && data.charge_category == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_category && data.charge_code == manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord.charge_type;
					});
					if(userEditConfig.length != 0){
						if(userEditConfig[0].allowuseredit_ind == "0"){
							alert("You do not have access to edit this record.");
							return false;
						}
					}							  
					manage_salesinvoice_master_equipment_edit.customRequirementHandler.taxScreen();
				} else {
					alert("No row has been selected.");
					return false;
				}
			}
		},
		submit_btn_click : function (element, event) {
			if (manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length == 0) {
				alert("Please enter part details.");
			} else if (parseFloat($("#manage_salesinvoice_master_equipment_edit_netAmount").text()) <= 0) {
				alert("Invalid Salesinvoice.");
			} else {
				if($("#manage_salesinvoice_master_equipment_edit_warehouse_id").getVal() != ""){
					var assetIdData = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data(),function(data) {
						return data.asset_id == "";
					});
					if(assetIdData.length != 0){
						alert("Please select machine serial number for all the entries.");
						return false;
					}
				}
				var returnValue,
				recordTimeStamp,
				invoiceStatus,
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
				invoiceStatus = "";
				if (manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "U") {
					recordTimeStamp = manage_salesinvoice_master_equipment.variable.custom.selectedRecord.rec_tstamp;
					invoiceStatus = manage_salesinvoice_master_equipment.variable.custom.selectedRecord.salesinvoice_status;
				};
				
				for (detailRecordCounter = 0; detailRecordCounter < manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
					inputparamDetail1.push({
						p_txn_detail1_sl_no : (detailRecordCounter + 1).toString(),
						p_txn_detail1_coref_xml : "<item_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_code) + "</item_code><item_variant_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_variant_code) + "</item_variant_code><net_quantity>" + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].net_quantity).toFixed(2) + "</net_quantity><uom_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].uom_code) + "</uom_code><std_rate>" + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].std_rate).toFixed(2) + "</std_rate><currency_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].currency_code) + "</currency_code><item_description>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_description) + "</item_description><variant_description>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].variant_description) + "</variant_description><addn_description>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].addn_description) + "</addn_description><asset_id_list>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].asset_id) + "</asset_id_list><comments_block_1>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].comments_block_1) + "</comments_block_1><comments_block_2>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].comments_block_2) + "</comments_block_2><gross_amount>" + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].gross_amount).toFixed(2) + "</gross_amount><prorated_tax_amount>" + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].prorated_tax_amount).toFixed(2) + "</prorated_tax_amount><prorated_discount_amount>" + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].prorated_discount_amount).toFixed(2)+ "</prorated_discount_amount>" ,
						p_txn_detail1_udf_xml : "<inputparam></inputparam>",
						p_txn_detail1_crud_ind : manage_salesinvoice_master_equipment.variable.custom.crudIndicator
					});
				};
				
				for (taxdetailRecordCounter = 0; taxdetailRecordCounter < manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data().length; taxdetailRecordCounter++) {
					inputparamDetail2.push({
						p_txn_detail2_sl_no : (taxdetailRecordCounter + 1).toString(),
						p_txn_detail2_coref_xml : "<item_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].item_code)  + "</item_code><item_variant_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].item_variant_code) + "</item_variant_code><addl_charge_ind>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].addl_charge_ind) + "</addl_charge_ind><addl_charge_category>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].charge_category) + "</addl_charge_category><addl_charge_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].charge_type) + "</addl_charge_code><addl_charge_subcode>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].charge_code) + "</addl_charge_subcode><addl_charge_description>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].charge_description) + "</addl_charge_description><percentage_amount_ind>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].percentage_amount_ind) + "</percentage_amount_ind><addl_charge_percentage>" + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].percentage).toFixed(2) + "</addl_charge_percentage><applicable_on_amount>" + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].applicable_on_amount).toFixed(2) + "</applicable_on_amount><addl_charge_amount>" + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].amount).toFixed(2) + "</addl_charge_amount><currency_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].currency_code) + "</currency_code>",
						p_txn_detail2_udf_xml : "<inputparam></inputparam>",															  
						p_txn_detail2_crud_ind : manage_salesinvoice_master_equipment.variable.custom.crudIndicator
					});
				};
				
				manage_salesinvoice_master_equipment.variable.custom.accessoriesArray = [];
				for(var index = 0; index < manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length; index++){
					if(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[index].accessories_data != undefined){
						for(var counter=0; counter < manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[index].accessories_data.length; counter++){
							manage_salesinvoice_master_equipment.variable.custom.accessoriesArray.push(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[index].accessories_data[counter]);
						}
					}
				};
				
				for (accessoriesRecordCounter = 0; accessoriesRecordCounter < manage_salesinvoice_master_equipment.variable.custom.accessoriesArray.length; accessoriesRecordCounter++) {
					inputparamDetail3.push({
						p_txn_detail3_sl_no : (accessoriesRecordCounter + 1).toString(),
						p_txn_detail3_coref_xml : "<sl_no>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].sl_no) + "</sl_no><salesinvoice_item_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].salesinvoice_item_code) + "</salesinvoice_item_code><salesinvoice_item_variant_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].salesinvoice_item_variant_code) + "</salesinvoice_item_variant_code><accessory_item_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].accessory_item_code) + "</accessory_item_code><accessory_item_variant_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].accessory_item_variant_code) + "</accessory_item_variant_code><net_quantity>" + parseFloat(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].net_quantity).toFixed(2) + "</net_quantity><uom_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].uom_code) + "</uom_code><std_rate>" + parseFloat(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].std_rate).toFixed(2) + "</std_rate><currency_code>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].currency_code) + "</currency_code><item_description>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].item_description) + "</item_description><variant_description>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].variant_description) + "</variant_description><gross_amount>" + parseFloat(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].gross_amount).toFixed(2) + "</gross_amount><uom_code_description>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].uom_code_description) + "</uom_code_description><currency_code_description>" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[accessoriesRecordCounter].currency_code_description) + "</currency_code_description>",
						p_txn_detail3_udf_xml : "<inputparam></inputparam>",
						p_txn_detail3_crud_ind : manage_salesinvoice_master_equipment.variable.custom.crudIndicator		   
					});
				};
				
				returnValue = salesinvoice_salesinvoice_setDetail.invokeAPI({
					p_txn_ref_no : $("#manage_salesinvoice_master_equipment_edit_salesinvoice_no").getVal(),
					p_txn_header_coref_xml : "<salesinvoice_category >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_salesinvoice_category").getVal()) + "</salesinvoice_category ><salesinvoice_type >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_salesinvoice_type").getVal()) + "</salesinvoice_type ><salesinvoice_status >" + WebAPIProxy.XMLEncode(invoiceStatus) + "</salesinvoice_status ><salesinvoice_date >" + mserviceUtilities.getDateString($("#manage_salesinvoice_master_equipment_edit_salesinvoice_date").getVal(), "yyyy-MM-dd") + "</salesinvoice_date ><buyer_customer_id >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_buyer_code").getVal()) + "</buyer_customer_id ><buyer_customer_location_code >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_buyer_location").getVal()) + "</buyer_customer_location_code ><buyer_address_line_1 >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.addr_1) + "</buyer_address_line_1 ><buyer_address_line_2 >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.addr_2) + "</buyer_address_line_2 ><buyer_address_line_3 >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.addr_3) + "</buyer_address_line_3 ><buyer_city >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.city) + "</buyer_city ><buyer_state >"  + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.state) + "</buyer_state ><buyer_country >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.country) + "</buyer_country ><buyer_pincode >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.pincode) + "</buyer_pincode ><consignee_customer_id >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_consignee_code").getVal()) + "</consignee_customer_id ><consignee_customer_location_code >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_consignee_location").getVal()) + "</consignee_customer_location_code ><consignee_address_line_1 >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.addr_1) + "</consignee_address_line_1 ><consignee_address_line_2 >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.addr_2) + "</consignee_address_line_2 ><consignee_address_line_3 >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.addr_3) + "</consignee_address_line_3 ><consignee_city >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.city) + "</consignee_city ><consignee_state >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.state) + "</consignee_state ><consignee_country >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.country) + "</consignee_country ><consignee_pincode >" + WebAPIProxy.XMLEncode(manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.pincode) + "</consignee_pincode ><seller_id >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_seller_code").getVal()) + "</seller_id ><seller_location_code >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_seller_location").getVal()) + "</seller_location_code ><place_of_despatch >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_place_of_despatch").getVal()) + "</place_of_despatch ><destination >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_destination").getVal()) + "</destination ><despatch_mode_road_rail >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_despatch_mode").getVal()) + "</despatch_mode_road_rail ><buyer_reference >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_buyer_ref").getVal()) + "</buyer_reference ><buyer_reference_date >" + mserviceUtilities.getDateString($("#manage_salesinvoice_master_equipment_edit_buyer_ref_date").getVal(), "yyyy-MM-dd") + "</buyer_reference_date ><other_reference >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_other_ref").getVal()) + "</other_reference ><payment_terms >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_payment_terms").getVal()) + "</payment_terms ><delivery_terms >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_terms_of_delivery").getVal()) + "</delivery_terms ><despatch_details >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_despatch_details").getVal()) + "</despatch_details ><terms_conditions >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_terms_and_condition").getVal()) + "</terms_conditions ><summary_comments >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_salesinvoice_summary").getVal()) + "</summary_comments ><organogram_level_no >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_org_level_no").getVal()) + "</organogram_level_no ><organogram_level_code >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_org_level_code").getVal()) + "</organogram_level_code ><company_location_code >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_company_location").getVal()) + "</company_location_code ><currency_code >"+ WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_currency_code").getVal()) + "</currency_code ><salesinvoice_gross_amount >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_partsAmount").text()) + "</salesinvoice_gross_amount ><salesinvoice_tax_amount >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_taxAmount").text()) + "</salesinvoice_tax_amount ><salesinvoice_discount_amount >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_discountAmount").text()) + "</salesinvoice_discount_amount ><salesinvoice_net_amount >" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_netAmount").text()) + "</salesinvoice_net_amount ><warehouse_id>" + WebAPIProxy.XMLEncode($("#manage_salesinvoice_master_equipment_edit_warehouse_id").getVal()) + "</warehouse_id>",   
					p_txn_header_udf_xml : $("#manage_salesinvoice_master_equipment_edit_content_4").getInputparamXML({
							screenID : "manage_salesinvoice_master_equipment_edit",
							matchCondition : ["manage_salesinvoice_master_equipment_edit_udf", "manage_salesinvoice_master_equipment_edit_product_udf"]
						}),
					p_rec_timestamp : recordTimeStamp,
					p_save_mode : manage_salesinvoice_master_equipment.variable.custom.crudIndicator,
					inputparam_detail1 : inputparamDetail1,
					inputparam_detail2 : inputparamDetail2,
					inputparam_detail3 : inputparamDetail3,
					inputparam_detail4 : inputparamDetail4,
					inputparam_detail5 : inputparamDetail5
				});
				if (returnValue.update_status == "SP001") {
					alert("SalesInvoice Details is saved successfully");
					return true;
				} else {
					alert("Saving of SalesInvoice Details Failed");
					return false;
				}
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function (element, event) {
			if(element.parentElement.id == "manage_salesinvoice_master_equipment_edit_grid_1_toolbar_element"){
				manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord = manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.getByUid(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.select().data("uid"));
			} else {
				manage_salesinvoice_master_equipment_edit.variable.custom.selectedRecord = manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.getByUid(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.select().data("uid"));
			}
		},
		addressFetch : function () {
			manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddress = manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject.addr_1 + " " + manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject.addr_2 + " " + manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject.addr_3 + "," + "\n" + manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject.city + " " + manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject.pincode + ", " + manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject.state_desc + ", " + manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject.country_desc;
			manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddress = manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.addr_1 + " " + manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.addr_2 + " " + manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.addr_3 + "," + "\n" + manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.city + " " + manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.pincode + ", " + manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.state_desc + ", " + manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject.country_desc;
			manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddress = manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.addr_1 + " " + manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.addr_2 + " " + manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.addr_3 + "," + "\n" + manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.city + " " + manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.pincode + ", " + manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.state_desc + ", " + manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject.country_desc;
		},
		dataSourceParseSalesInvoice : function (response) {
			var parseResponse;
			var parseAccessoryResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					manage_salesinvoice_master_equipment_edit.variable.custom.header_1_record = JSON.parse(WebAPIProxy.MJSONEncode(response.outputparam_header.p_invoice_header_json));
					if (response.outputparam_detail_invoice != undefined) {
						if (response.outputparam_detail_invoice.length != undefined) {
							var itemData = response.outputparam_detail_invoice ; 
							parseResponse = [];
							for (index = 0; index < itemData.length; index++) {
								for (key in itemData[index]) {
									parseResponse.push(JSON.parse(WebAPIProxy.MJSONEncode(itemData[index][key])));
								}
							}
							if (response.outputparam_deail_item_addlinfo != undefined) {
								if (response.outputparam_deail_item_addlinfo.length != undefined) {
									var itemAccessoryData = response.outputparam_deail_item_addlinfo ; 
									parseAccessoryResponse = [];
									for (index = 0; index < itemAccessoryData.length; index++) {
										for (key in itemAccessoryData[index]) {
											parseAccessoryResponse.push(JSON.parse(WebAPIProxy.MJSONEncode(itemAccessoryData[index][key])));
										}
									}
									
								}
							} else {
								parseAccessoryResponse = [];
							}
							for(var index = 0;  index < parseResponse.length; index++){ 
								var accessoriesData = $.grep(parseAccessoryResponse,function(data) {
									return data.salesinvoice_item_code == parseResponse[index].item_code;
								});
								if(accessoriesData.length != 0){
									parseResponse[index].accessories_data = accessoriesData;
								} else {
									parseResponse[index].accessories_data = [];
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
		dataSourceParseTax : function (response) {
			var parseResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					if (response.outputparam_detail_addlcharges != undefined) {
						if (response.outputparam_detail_addlcharges.length != undefined) {
							var itemData = response.outputparam_detail_addlcharges ; 
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
		partScreen : function () {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_salesinvoice_master_equipment_edit_child.js"])) {
				if ((manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "U")||(manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "V")){
					if(manage_salesinvoice_master_equipment.variable.custom.selectedRecord.salesinvoice_category == "SI"){
						manage_salesinvoice_master_equipment_edit_child.variable.standard.popupIndicator = true;
						manage_salesinvoice_master_equipment_edit_child.variable.standard.reorderParam[0].columnLength = 2;
					}
				}
				if (manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "A"){
					if($("#manage_salesinvoice_master_equipment_edit_salesinvoice_category").getVal() == "SI"){
						manage_salesinvoice_master_equipment_edit_child.variable.standard.popupIndicator = true;
						manage_salesinvoice_master_equipment_edit_child.variable.standard.reorderParam[0].columnLength = 2;
					}
				}
				webNavigationController.gotoNextScreen({
					screenID : "manage_salesinvoice_master_equipment_edit",
					fieldID : "manage_salesinvoice_master_equipment_edit_child_window",
					nextScreenID : "manage_salesinvoice_master_equipment_edit_child",
					nextScreenName : $("#manage_salesinvoice_master_equipment_edit_part_details_tab_lbl").text() + " - " + manage_salesinvoice_master_equipment_edit.variable.custom.nextScreenName,
					execute : manage_salesinvoice_master_equipment_edit_child.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		taxScreen : function () {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_salesinvoice_master_equipment_edit_child_taxdetails.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_salesinvoice_master_equipment_edit",
					fieldID : "manage_salesinvoice_master_equipment_edit_child_window",
					nextScreenID : "manage_salesinvoice_master_equipment_edit_child_taxdetails",
					nextScreenName : $("#manage_salesinvoice_master_equipment_edit_tax_details_tab_lbl").text() + " - " + manage_salesinvoice_master_equipment_edit.variable.custom.nextScreenName,
					execute : manage_salesinvoice_master_equipment_edit_child_taxdetails.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		amountCalculation : function () {
			var partsAmount = 0.00;
			var taxAmount = 0.00;
			var discountAmount = 0.00;
			for (var i = 0; i < manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length; i++) {
				partsAmount = partsAmount + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[i].gross_amount);
			}
			for (var i = 0; i < manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data().length; i++) {
				if (manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[i].addl_charge_ind == "D") {
					discountAmount = discountAmount + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[i].amount);
				} else {
					taxAmount = taxAmount + parseFloat(manage_salesinvoice_master_equipment_edit.variable.custom.grid_2.dataSource.data()[i].amount);
				}
			}
			$("#manage_salesinvoice_master_equipment_edit_partsAmount").text(parseFloat(partsAmount).toFixed(2));
			$("#manage_salesinvoice_master_equipment_edit_taxAmount").text(parseFloat(taxAmount).toFixed(2));
			$("#manage_salesinvoice_master_equipment_edit_discountAmount").text(parseFloat(discountAmount).toFixed(2));
			$("#manage_salesinvoice_master_equipment_edit_netAmount").text(parseFloat(partsAmount + taxAmount - discountAmount).toFixed(2));
		}
	},
	widgetEventHandler : {
		warehouse_id_change : function (element, event) {
			if(($("#manage_salesinvoice_master_equipment_edit_warehouse_id").getVal() != "") && (manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length != 0)){
				var searchFieldXML = "<inputparam><search_field_xml>"; 
				for(var i = 0; i < manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length; i++){ 	
					searchFieldXML += "<data><item_code>" + manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[i].item_code + "</item_code>";
					searchFieldXML += "<item_variant_code>" + manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[i].item_variant_code + "</item_variant_code>";
					searchFieldXML += "<warehouse_id>" + $("#manage_salesinvoice_master_equipment_edit_warehouse_id").getVal() + "</warehouse_id>";
					searchFieldXML += "<net_quantity>" + manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[i].net_quantity + "</net_quantity>";
					searchFieldXML += "<uom_code>" + manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[i].uom_code + "</uom_code></data>";
				}
				manage_salesinvoice_master_equipment.variable.custom.accessoriesArray = [];
				for(var index = 0; index < manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length; index++){				   
					if(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[index].accessories_data != undefined){
						for(var counter=0; counter < manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[index].accessories_data.length; counter++){
							manage_salesinvoice_master_equipment.variable.custom.accessoriesArray.push(manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data()[index].accessories_data[counter]);
						}
					}
				};
				for(var i = 0; i < manage_salesinvoice_master_equipment.variable.custom.accessoriesArray.length; i++){ 	
					searchFieldXML += "<data><item_code>" + manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[i].accessory_item_code + "</item_code>";
					searchFieldXML += "<item_variant_code>" + manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[i].accessory_item_variant_code + "</item_variant_code>";
					searchFieldXML += "<warehouse_id>" + $("#manage_salesinvoice_master_equipment_edit_warehouse_id").getVal() + "</warehouse_id>";
					searchFieldXML += "<net_quantity>" + manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[i].net_quantity + "</net_quantity>";
					searchFieldXML += "<uom_code>" + manage_salesinvoice_master_equipment.variable.custom.accessoriesArray[i].uom_code + "</uom_code></data>";
				}
				searchFieldXML += "</search_field_xml></inputparam>";
				manage_salesinvoice_master_equipment_edit.variable.custom.stockVerification = mserviceUtilities.getTransportPagingDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_custom_info_list",
					outputPath : "outputparam_detail",
					api : true,
					pageSize : manage_salesinvoice_master_equipment_edit.variable.custom.grid_1.dataSource.data().length + manage_salesinvoice_master_equipment.variable.custom.accessoriesArray.length,
					inputParameter : {
						p_custom_info_code : "'warehouse_stock_verification'",
						p_inputparam_xml : searchFieldXML
					},
					screenID : "manage_salesinvoice_master_equipment_edit",
				});
				manage_salesinvoice_master_equipment_edit.variable.custom.stockVerification.read();
				if(manage_salesinvoice_master_equipment_edit.variable.custom.stockVerification.data().length != 0){
					var stockValidity = $.grep(manage_salesinvoice_master_equipment_edit.variable.custom.stockVerification.data(), function(data){
						return parseFloat(data.net_quantity) > parseFloat(data.available_quantity);
					});
				} else {
					var stockValidity = [];
				}
				if(stockValidity.length != 0){
					$("#manage_salesinvoice_master_equipment_edit").append("<div id = 'manage_salesinvoice_master_equipment_edit_window'>Stock Is Not Available For the Listed Items - Reduce the quantity to continue or choose some other Warehouse.<hr/><div id = 'manage_salesinvoice_master_equipment_edit_window_grid'></div></div>");
					$("#manage_salesinvoice_master_equipment_edit_window").kendoWindow({
						width : "600px",
						height : "420px",
						title : "",
						visible : false,
						modal : true,
						deactivate : function () {
							this.destroy();
							$("#manage_salesinvoice_master_equipment_edit_warehouse_id").setVal("");
						},
					});
					$("#manage_salesinvoice_master_equipment_edit_window_grid").kendoGrid({
						dataSource : stockValidity,
						height : 340,
						columns : [{
								field : "item_code",
								title : "Part #",
								width : 110
							},{
								field : "item_variant_code",
								title : "Type",
								width : 110
							},{
								field : "net_quantity",
								title : "Invoiced Quantity",
								template : "#= net_quantity + ' ' + uom_code #",
								width : 110
							},{
								field : "available_quantity",
								title : "Stock Available",
								template : "#= available_quantity + ' ' + uom_code #",
								width : 100
							}],
						sortable : true
					});
					$("#manage_salesinvoice_master_equipment_edit_window").data("kendoWindow").center().open();
					$("#manage_salesinvoice_master_equipment_edit_window_grid").data("kendoGrid").refresh();
				}
			}
		},
		salesinvoice_category_change : function (element, event) {
			if (manage_salesinvoice_master_equipment.variable.custom.crudIndicator == "A"){
				if($("#manage_salesinvoice_master_equipment_edit_salesinvoice_category").getVal() == "SI"){
					$("#manage_salesinvoice_master_equipment_edit_part_details_tab .k-link").text("Part Details");
				} else {
					$("#manage_salesinvoice_master_equipment_edit_part_details_tab .k-link").text("Equipment Details");
				}
			}
		},
		seller_location_change : function (element, event) {
			if ($("#manage_salesinvoice_master_equipment_edit_seller_location").getVal() != "" && manage_salesinvoice_master_equipment_edit.variable.custom.seller_location.dataItem() != undefined) {
				manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddressObject = manage_salesinvoice_master_equipment_edit.variable.custom.seller_location.dataItem();
				manage_salesinvoice_master_equipment_edit.customRequirementHandler.addressFetch();
				$("#manage_salesinvoice_master_equipment_edit_seller_address").text(manage_salesinvoice_master_equipment_edit.variable.custom.sellerAddress);
			} else {
				$("#manage_salesinvoice_master_equipment_edit_seller_address").text("");
			}
			if (typeof(fn_taxation_salesinvoice_equipment_location_change) === "function") {
				fn_taxation_salesinvoice_equipment_location_change();								  
			}
		},
		buyer_location_change : function (element, event) {
			if ($("#manage_salesinvoice_master_equipment_edit_buyer_location").getVal() != "" && manage_salesinvoice_master_equipment_edit.variable.custom.buyer_location.dataItem() != undefined) {
				manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddressObject = manage_salesinvoice_master_equipment_edit.variable.custom.buyer_location.dataItem();
				manage_salesinvoice_master_equipment_edit.customRequirementHandler.addressFetch();
				$("#manage_salesinvoice_master_equipment_edit_buyer_address").text(manage_salesinvoice_master_equipment_edit.variable.custom.buyerAddress);
			} else {
				$("#manage_salesinvoice_master_equipment_edit_buyer_address").text("");
			}
			if (typeof(fn_taxation_salesinvoice_equipment_location_change) === "function") {
				fn_taxation_salesinvoice_equipment_location_change();								  
			}
		},
		consignee_location_change : function (element, event) {
			if ($("#manage_salesinvoice_master_equipment_edit_consignee_location").getVal() != "" && manage_salesinvoice_master_equipment_edit.variable.custom.consignee_location.dataItem() != undefined) {
				manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddressObject = manage_salesinvoice_master_equipment_edit.variable.custom.consignee_location.dataItem();
				manage_salesinvoice_master_equipment_edit.customRequirementHandler.addressFetch();
				$("#manage_salesinvoice_master_equipment_edit_consignee_address").text(manage_salesinvoice_master_equipment_edit.variable.custom.consigneeAddress);
			} else {
				$("#manage_salesinvoice_master_equipment_edit_consignee_address").text("");
			}
			if (typeof(fn_taxation_salesinvoice_equipment_location_change) === "function") {
				fn_taxation_salesinvoice_equipment_location_change();					 
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}, {
					contentID : "content_2",
					columnLength : 3
				}, {
					contentID : "content_3",
					columnLength : 3
				}, {
					contentID : "content_4",
					columnLength : 3
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_salesinvoice_master_equipment_edit_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_salesinvoice_master_equipment_edit_grid_1",
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