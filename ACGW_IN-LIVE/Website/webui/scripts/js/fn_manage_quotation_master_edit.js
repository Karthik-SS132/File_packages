var manage_quotation_master_edit = {
	constructScreen : function () {
		manage_quotation_master_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_manage_quotation_detail",
				outputPath : false,
				pageSize : 10,
				inputParameter : {
					p_quotation_no : "$manage_quotation_master.variable.custom.selectedRecord.quotation_no"
				},
				schemaModel : true,
				screenID : "manage_quotation_master_edit",
				dataSourceName : "datasource_1",
				processResponse : true,
				parse : manage_quotation_master_edit.customRequirementHandler.dataSourceParseQuotation
			});
		manage_quotation_master_edit.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_manage_quotation_detail",
				outputPath : false,
				pageSize : 10,
				inputParameter : {
					p_quotation_no : "$manage_quotation_master.variable.custom.selectedRecord.quotation_no"
				},
				schemaModel : true,
				screenID : "manage_quotation_master_edit",
				dataSourceName : "datasource_2",
				processResponse : true,
				parse : manage_quotation_master_edit.customRequirementHandler.dataSourceParseTax
			});
		if (manage_quotation_master.variable.custom.crudIndicator == "U" || manage_quotation_master.variable.custom.crudIndicator == "V") {
			manage_quotation_master_edit.variable.custom.datasource_1.read();
			manage_quotation_master_edit.variable.custom.datasource_2.read();
			manage_quotation_master_edit.variable.custom.currency_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", manage_quotation_master_edit.variable.custom.header_1_record.currency_code, "");
			manage_quotation_master_edit.variable.custom.org_level_no_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELNO_LIST", manage_quotation_master_edit.variable.custom.header_1_record.organogram_level_no, "");
			manage_quotation_master_edit.variable.custom.org_level_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELCODE_LIST", manage_quotation_master_edit.variable.custom.header_1_record.organogram_level_code, "");
			manage_quotation_master_edit.variable.custom.sellerAddressObject = {
				code : manage_quotation_master_edit.variable.custom.header_1_record.seller_id,
				description : manage_quotation_master_edit.variable.custom.header_1_record.seller_id_desc,
				addr_1 : manage_quotation_master_edit.variable.custom.header_1_record.seller_address_line_1,
				addr_2 : manage_quotation_master_edit.variable.custom.header_1_record.seller_address_line_2,
				addr_3 : manage_quotation_master_edit.variable.custom.header_1_record.seller_address_line_3,
				city : manage_quotation_master_edit.variable.custom.header_1_record.seller_city,
				pincode : manage_quotation_master_edit.variable.custom.header_1_record.seller_pincode,
				state : manage_quotation_master_edit.variable.custom.header_1_record.seller_state,
				state_desc : manage_quotation_master_edit.variable.custom.header_1_record.seller_state_desc,
				country : manage_quotation_master_edit.variable.custom.header_1_record.seller_country,
				country_desc : manage_quotation_master_edit.variable.custom.header_1_record.seller_country_desc
			};
			manage_quotation_master_edit.variable.custom.buyerAddressObject = {
				code : manage_quotation_master_edit.variable.custom.header_1_record.buyer_id,
				description : manage_quotation_master_edit.variable.custom.header_1_record.buyer_id_desc,
				addr_1 : manage_quotation_master_edit.variable.custom.header_1_record.buyer_address_line_1,
				addr_2 : manage_quotation_master_edit.variable.custom.header_1_record.buyer_address_line_2,
				addr_3 : manage_quotation_master_edit.variable.custom.header_1_record.buyer_address_line_3,
				city : manage_quotation_master_edit.variable.custom.header_1_record.buyer_city,
				pincode : manage_quotation_master_edit.variable.custom.header_1_record.buyer_pincode,
				state : manage_quotation_master_edit.variable.custom.header_1_record.buyer_state,
				state_desc : manage_quotation_master_edit.variable.custom.header_1_record.buyer_state_desc,
				country : manage_quotation_master_edit.variable.custom.header_1_record.buyer_country,
				country_desc : manage_quotation_master_edit.variable.custom.header_1_record.buyer_country_desc
			};
			manage_quotation_master_edit.variable.custom.consigneeAddressObject = {
				code : manage_quotation_master_edit.variable.custom.header_1_record.consignee_id,
				description : manage_quotation_master_edit.variable.custom.header_1_record.consignee_id_desc,
				addr_1 : manage_quotation_master_edit.variable.custom.header_1_record.consignee_address_line_1,
				addr_2 : manage_quotation_master_edit.variable.custom.header_1_record.consignee_address_line_2,
				addr_3 : manage_quotation_master_edit.variable.custom.header_1_record.consignee_address_line_3,
				city : manage_quotation_master_edit.variable.custom.header_1_record.consignee_city,
				pincode : manage_quotation_master_edit.variable.custom.header_1_record.consignee_pincode,
				state : manage_quotation_master_edit.variable.custom.header_1_record.consignee_state,
				state_desc : manage_quotation_master_edit.variable.custom.header_1_record.consignee_state_desc,
				country : manage_quotation_master_edit.variable.custom.header_1_record.consignee_country,
				country_desc : manage_quotation_master_edit.variable.custom.header_1_record.consignee_country_desc
			};
			manage_quotation_master_edit.customRequirementHandler.addressFetch();
			$("#manage_quotation_master_edit_seller_address").text(manage_quotation_master_edit.variable.custom.sellerAddress);
			$("#manage_quotation_master_edit_buyer_address").text(manage_quotation_master_edit.variable.custom.buyerAddress);
			$("#manage_quotation_master_edit_consignee_address").text(manage_quotation_master_edit.variable.custom.consigneeAddress);
		}
	},
	postConstruct : function () {
		if (typeof(fn_taxation_quotation_load) === "function") {
			fn_taxation_quotation_load();
		}
		manage_quotation_master_edit.customRequirementHandler.amountCalculation();
		if (manage_quotation_master.variable.custom.crudIndicator == "V") {
			$("#manage_quotation_master_edit_grid_1_toolbar_element").hide();
			$("#manage_quotation_master_edit_grid_2_toolbar_element").hide();
		}
		$(".manage_quotation_master_edit_currencyCode").text($("#manage_quotation_master_edit_currency_code").getVal());
		for (var index = 0; index < manage_quotation_master_edit.variable.custom.grid_2.dataSource.data().length; index++) {
			manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
		};
	},
	initializeWidgets : function () {
		manage_quotation_master_edit.variable.custom.tabstrip = $("#manage_quotation_master_edit_tabstrip").kendoTabStrip({
				animation : {
					open : {
						effects : "fadeIn"
					},
				},
			}).data("kendoTabStrip");
		$("#manage_quotation_master_edit_fiscal_year").initializeWDisplayarea({
			screenID : "manage_quotation_master_edit",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.fiscal_year",
		});
		$("#manage_quotation_master_edit_quotation_no").initializeWDisplayarea({
			screenID : "manage_quotation_master_edit",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_no",
		});
		$("#manage_quotation_master_edit_quotation_status").initializeWDisplayarea({
			screenID : "manage_quotation_master_edit",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_status_desc"
		});
		$("#manage_quotation_master_edit_quotation_category").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit",
			dataSource : {
				informationType : "'QUOTATIONCATEGORY_LIST'",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_quotation_master_edit_quotation_type",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_category",
			defaultValueDescription : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_category_desc"
		});
		$("#manage_quotation_master_edit_quotation_type").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit",
			dataSource : {
				informationType : "'QUOTATIONTYPE_LIST_LINKED'",
				searchField1 : "#manage_quotation_master_edit_quotation_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_type",
			defaultValueDescription : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_type_desc"
		});
		$("#manage_quotation_master_edit_quotation_date").initializeWDatepicker({
			screenID : "manage_quotation_master_edit",
			minimum : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_date",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_date",
		});
		$("#manage_quotation_master_edit_seller_code").initializeWCombobox({
			screenID : "manage_quotation_master_edit",
			dataSource : {
				informationType : "'DEALER_LIST'",
				searchField1 : "$manage_quotation_master_edit.variable.custom.seller_code_serverFilterValue",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			childFieldID : "manage_quotation_master_edit_seller_location",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.seller_id",
			defaultValueDescription : "$manage_quotation_master_edit.variable.custom.header_1_record.seller_id_desc"
		});
		manage_quotation_master_edit.variable.custom.seller_location = $("#manage_quotation_master_edit_seller_location").initializeWCombobox({
				screenID : "manage_quotation_master_edit",
				dataSource : {
					informationType : "'SELLERLOCATION_LIST_LINKED'",
					searchField1 : "#manage_quotation_master_edit_seller_code",
				},
				dataTextField : "description",
				dataValueField : "code",
				serverFiltering : true,
				defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.seller_location_code",
				defaultValueDescription : "$manage_quotation_master_edit.variable.custom.header_1_record.seller_location_desc"
			});
		$("#manage_quotation_master_edit_buyer_code").initializeWCombobox({
			screenID : "manage_quotation_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_LIST_SEARCH_WO_ZZZ'</lov_code_type><search_field_1>$manage_quotation_master_edit.variable.custom.buyer_code_serverFilterValue</search_field_1></inputparam>"
				},
			},
			dataTextField : "name",
			dataValueField : "id",
			childFieldID : "manage_quotation_master_edit_buyer_location",
			serverFiltering : true,
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.buyer_id",
			defaultValueDescription : "$manage_quotation_master_edit.variable.custom.header_1_record.buyer_id_desc",
		});
		manage_quotation_master_edit.variable.custom.buyer_location = $("#manage_quotation_master_edit_buyer_location").initializeWCombobox({
				screenID : "manage_quotation_master_edit",
				dataSource : {
					informationType : "'CUSTOMERLOCATION_LIST_LINKED'",
					searchField1 : "#manage_quotation_master_edit_buyer_code",
				},
				dataTextField : "description",
				dataValueField : "code",
				serverFiltering : true,
				defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.buyer_location_code",
				defaultValueDescription : "$manage_quotation_master_edit.variable.custom.header_1_record.buyer_location_desc"
			});
		$("#manage_quotation_master_edit_consignee_code").initializeWCombobox({
			screenID : "manage_quotation_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_LIST_SEARCH_WO_ZZZ'</lov_code_type><search_field_1>$manage_quotation_master_edit.variable.custom.consignee_code_serverFilterValue</search_field_1></inputparam>"
				},
			},
			dataTextField : "name",
			dataValueField : "id",
			childFieldID : "manage_quotation_master_edit_consignee_location",
			serverFiltering : true,
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.consignee_id",
			defaultValueDescription : "$manage_quotation_master_edit.variable.custom.header_1_record.consignee_id_desc",
		});
		manage_quotation_master_edit.variable.custom.consignee_location = $("#manage_quotation_master_edit_consignee_location").initializeWCombobox({
				screenID : "manage_quotation_master_edit",
				dataSource : {
					informationType : "'CUSTOMERLOCATION_LIST_LINKED'",
					searchField1 : "#manage_quotation_master_edit_consignee_code",
				},
				dataTextField : "description",
				dataValueField : "code",
				serverFiltering : true,
				defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.consignee_location_code",
				defaultValueDescription : "$manage_quotation_master_edit.variable.custom.header_1_record.consignee_location_desc"
			});
		$("#manage_quotation_master_edit_org_level_no").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit",
			dataSource : {
				informationType : "'ORGLEVELNO_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_quotation_master_edit_org_level_code",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.organogram_level_no",
			defaultValueDescription : "$manage_quotation_master_edit.variable.custom.org_level_no_defaultValueDescription"
		});
		$("#manage_quotation_master_edit_org_level_code").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit",
			dataSource : {
				informationType : "'ORGLEVELCODE_LIST'",
				searchField1 : "#manage_quotation_master_edit_org_level_no",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.organogram_level_code",
			defaultValueDescription : "$manage_quotation_master_edit.variable.custom.org_level_code_defaultValueDescription"
		});
		$("#manage_quotation_master_edit_place_of_despatch").initializeWTextbox({
			screenID : "manage_quotation_master_edit",
			maxlength : "30",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.place_of_despatch",
		});
		$("#manage_quotation_master_edit_destination").initializeWTextbox({
			screenID : "manage_quotation_master_edit",
			maxlength : "30",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.destination",
		});
		$("#manage_quotation_master_edit_despatch_mode").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit",
			dataSource : {
				informationType : "'DESPATCHMODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.despatch_mode_road_rail",
			defaultValueDescription : "$manage_quotation_master_edit.variable.custom.header_1_record.despatch_mode_road_rail_desc"
		});
		$("#manage_quotation_master_edit_buyer_ref").initializeWTextbox({
			screenID : "manage_quotation_master_edit",
			maxlength : "600",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.buyer_reference",
		});
		$("#manage_quotation_master_edit_buyer_ref_date").initializeWDatepicker({
			screenID : "manage_quotation_master_edit",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.buyer_reference_date"
		});
		$("#manage_quotation_master_edit_other_ref").initializeWTextbox({
			screenID : "manage_quotation_master_edit",
			maxlength : "600",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.other_reference",
		});
		$("#manage_quotation_master_edit_payment_terms").initializeWTextbox({
			screenID : "manage_quotation_master_edit",
			maxlength : "1000",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.payment_terms",
		});
		$("#manage_quotation_master_edit_currency_code").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit",
			dataSource : {
				informationType : "'CURRENCYCODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.currency_code",
			defaultValueDescription : "$manage_quotation_master_edit.variable.custom.currency_code_defaultValueDescription"
		});
		$("#manage_quotation_master_edit_despatch_details").initializeWTextbox({
			screenID : "manage_quotation_master_edit",
			maxlength : "1000",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.despatch_details",
		});
		$("#manage_quotation_master_edit_terms_of_delivery").initializeWTextbox({
			screenID : "manage_quotation_master_edit",
			maxlength : "1000",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.delivery_terms",
		});
		$("#manage_quotation_master_edit_terms_and_condition").initializeWTextarea({
			screenID : "manage_quotation_master_edit",
			maxlength : "1000",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_terms_conditions",
		});
		$("#manage_quotation_master_edit_quotation_summary").initializeWTextarea({
			screenID : "manage_quotation_master_edit",
			maxlength : "1000",
			defaultValue : "$manage_quotation_master_edit.variable.custom.header_1_record.quotation_summary_comments",
		});
		manage_quotation_master_edit.variable.custom.grid_1 = $("#manage_quotation_master_edit_grid_1").initializeWGrid({
				screenID : "manage_quotation_master_edit",
				toolbar : "#manage_quotation_master_edit_grid_1_toolbar_template",
				dataSource : manage_quotation_master_edit.variable.custom.datasource_1,
				height : 400,
				pageSize : 10,
				filterable : false,
			});
		manage_quotation_master_edit.variable.custom.grid_2 = $("#manage_quotation_master_edit_grid_2").initializeWGrid({
				screenID : "manage_quotation_master_edit",
				toolbar : "#manage_quotation_master_edit_grid_2_toolbar_template",
				dataSource : manage_quotation_master_edit.variable.custom.datasource_2,
				height : 400,
				pageSize : 10,
				filterable : false,
			});
		manage_quotation_master_edit.variable.custom.grid_1.refresh();
		manage_quotation_master_edit.variable.custom.grid_2.refresh();
	},
	refreshScreen : function () {
		manage_quotation_master_edit.variable.custom.grid_1.refresh();
		manage_quotation_master_edit.variable.custom.grid_2.refresh();
		manage_quotation_master_edit.customRequirementHandler.amountCalculation();
		if (typeof(fn_taxation_quotation_load) === "function") {
			fn_taxation_quotation_load();
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_quotation_master_edit.variable.custom.crudIndicator == "A") {
				if ((manage_quotation_master_edit.variable.custom.crudIndicator == "A") && (element.parentElement.id == "manage_quotation_master_edit_grid_1_toolbar_element")) {
					manage_quotation_master_edit.customRequirementHandler.partScreen();
				} else if ((manage_quotation_master_edit.variable.custom.crudIndicator == "A") && (element.parentElement.id == "manage_quotation_master_edit_grid_2_toolbar_element")) {
					manage_quotation_master_edit.customRequirementHandler.taxScreen();
				}
			} else if(manage_quotation_master_edit.variable.custom.crudIndicator == "D"){
				if (element.parentElement.id == "manage_quotation_master_edit_grid_1_toolbar_element") {
					if (manage_quotation_master_edit.variable.custom.selectedRecord != undefined) {
						manage_quotation_master_edit.variable.custom.grid_1.dataSource.remove(manage_quotation_master_edit.variable.custom.selectedRecord);
						alert("Data deleted successfully.");
						for (var index = 0; index < manage_quotation_master_edit.variable.custom.grid_1.dataSource.data().length; index++) {
							manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[index].set("quotation_item_sl_no", (index + 1).toString());
						}
						var taxData = $.grep(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data(),function(data){
							return data.item_code == manage_quotation_master_edit.variable.custom.selectedRecord.item_code && data.charge_code == "DISCOUNT";
						});
						if(taxData.length != 0){
							manage_quotation_master_edit.variable.custom.grid_2.dataSource.remove(taxData[0]);
							for (var index = 0; index < manage_quotation_master_edit.variable.custom.grid_2.dataSource.data().length; index++) {
								manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
							}
						}
						if (typeof(fn_taxation_quotation_delete_click) === "function") {
							fn_taxation_quotation_delete_click();
						}
						manage_quotation_master_edit.refreshScreen();
					} else {
						alert("No row has been selected.");
						return false;
					}
				} else if (element.parentElement.id == "manage_quotation_master_edit_grid_2_toolbar_element") {
					if (manage_quotation_master_edit.variable.custom.selectedRecord != undefined) {
						if(manage_quotation_master_edit.variable.custom.selectedRecord.addl_charge_ind == "D"){
							var taxData = $.grep(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data(),function(data) {
								return data.item_code == manage_quotation_master_edit.variable.custom.selectedRecord.item_code && data.addl_charge_ind == "T";
							});
							if(taxData.length != 0){
								alert("Selected record has tax applied so discount record cannot be deleted.To delete discount, delete the tax entry and proceed.");
								return false;
							}
						} 
						manage_quotation_master_edit.variable.custom.grid_2.dataSource.remove(manage_quotation_master_edit.variable.custom.selectedRecord);
						alert("Data deleted successfully.");
						for (var index = 0; index < manage_quotation_master_edit.variable.custom.grid_2.dataSource.data().length; index++) {
							manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
						}
						manage_quotation_master_edit.refreshScreen();
					} else {
						alert("No row has been selected.");
						return false;
					}
				}
				if (typeof(fn_taxation_quotation_load) === "function") {
					fn_taxation_quotation_load();
				}
			} else {
				if ((manage_quotation_master_edit.variable.custom.crudIndicator == "U" || manage_quotation_master_edit.variable.custom.crudIndicator == "V") && (element.parentElement.id == "manage_quotation_master_edit_grid_1_toolbar_element") && (manage_quotation_master_edit.variable.custom.selectedRecord != undefined)) {
					manage_quotation_master_edit.customRequirementHandler.partScreen();
				} else if ((manage_quotation_master_edit.variable.custom.crudIndicator == "U" || manage_quotation_master_edit.variable.custom.crudIndicator == "V") && (element.parentElement.id == "manage_quotation_master_edit_grid_2_toolbar_element") && (manage_quotation_master_edit.variable.custom.selectedRecord != undefined)) {
					if(manage_quotation_master_edit.variable.custom.crudIndicator == "U" && manage_quotation_master_edit.variable.custom.selectedRecord.item_code == "OVERALL" && manage_quotation_master_edit.variable.custom.selectedRecord.addl_charge_ind == "D"){
						var taxData = $.grep(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data(),function(data) {
							return data.item_code == manage_quotation_master_edit.variable.custom.selectedRecord.item_code && data.addl_charge_ind == "T";
						});
						if(taxData.length != 0){
							alert("Overall Item has tax applied so discount record cannot be edited.To provide discount, delete the tax entry and proceed.");
							return false;
						}
					}
					manage_quotation_master_edit.customRequirementHandler.taxScreen();
				} else {
					alert("No row has been selected.");
					return false;
				}
			}
		},
		submit_btn_click : function (element, event) {
			if(manage_quotation_master_edit.customRequirementHandler.submitClickValidation() == 1){
				if (manage_quotation_master_edit.variable.custom.grid_1.dataSource.data().length == 0) {
					alert("Please enter part details.");
				} else if (parseFloat($("#manage_quotation_master_edit_netAmount").text()) <= 0) {
					alert("Invalid Quotation.");
				} else {
					var returnValue,
					recordTimeStamp,
					inputparamQuotationDetail,
					inputparamQuotationChargeDetail,
					detailRecordCounter,
					taxdetailRecordCounter;
					inputparamQuotationDetail = [];
					inputparamQuotationChargeDetail = [];
					recordTimeStamp = "00000000-0000-0000-0000-000000000000";
					if (manage_quotation_master.variable.custom.crudIndicator == "U") {
						recordTimeStamp = manage_quotation_master.variable.custom.selectedRecord.rec_tstamp;
					};
					for (detailRecordCounter = 0; detailRecordCounter < manage_quotation_master_edit.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
						inputparamQuotationDetail.push({
							p_item_slno : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].quotation_item_sl_no,
							p_item_code : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_code,
							p_item_variant_code : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_variant_code,
							p_net_quantity : parseFloat(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].net_quantity).toFixed(2),
							p_uom_code : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].uom_code,
							p_std_rate : parseFloat(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].std_rate).toFixed(2),
							p_currency_code : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].currency_code,
							p_item_description : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_description,
							p_variant_description : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].variant_description,
							p_addn_description : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].addn_description,
							p_comments_block_1 : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].comments_block_1,
							p_comments_block_2 : manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].comments_block_2,
							p_gross_amount : parseFloat(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].gross_amount).toFixed(2),
							p_prorated_tax_amount : parseFloat(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].prorated_tax_amount).toFixed(2),
							p_prorated_discount_amount : parseFloat(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].prorated_discount_amount).toFixed(2)
						});
					};
					for (taxdetailRecordCounter = 0; taxdetailRecordCounter < manage_quotation_master_edit.variable.custom.grid_2.dataSource.data().length; taxdetailRecordCounter++) {
						inputparamQuotationChargeDetail.push({
							p_item_code: manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].item_code,
							p_item_variant_code : manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].item_variant_code,
							p_addl_charge_sl_no : manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].charge_sl_no,
							p_addl_charge_ind : manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].addl_charge_ind,
							p_addl_charge_code : manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].charge_code,
							p_addl_charge_description : manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].charge_description,
							p_percentage_amount_ind : manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].percentage_amount_ind,
							p_addl_charge_percentage : parseFloat(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].percentage).toFixed(2),
							p_apllicable_on_amount : parseFloat(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].applicable_on_amount).toFixed(2),
							p_addl_charge_amount : parseFloat(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].amount).toFixed(2),
							p_currency_code : manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[taxdetailRecordCounter].currency_code
						});
					};
					returnValue = executeService_save_manage_quotation({
							p_quotation_no : $("#manage_quotation_master_edit_quotation_no").getVal(),
							p_quotation_category : $("#manage_quotation_master_edit_quotation_category").getVal(),
							p_quotation_type : $("#manage_quotation_master_edit_quotation_type").getVal(),
							p_quotation_status : manage_quotation_master_edit.variable.custom.header_1_record.quotation_status,
							p_quotation_date : mserviceUtilities.getDateString($("#manage_quotation_master_edit_quotation_date").getVal(), "yyyy-MM-dd"),
							p_buyer_customer_id : $("#manage_quotation_master_edit_buyer_code").getVal(),
							p_buyer_customer_location_code : $("#manage_quotation_master_edit_buyer_location").getVal(),
							p_buyer_address_line_1 : manage_quotation_master_edit.variable.custom.buyerAddressObject.addr_1,
							p_buyer_address_line_2 : manage_quotation_master_edit.variable.custom.buyerAddressObject.addr_2,
							p_buyer_address_line_3 : manage_quotation_master_edit.variable.custom.buyerAddressObject.addr_3,
							p_buyer_city : manage_quotation_master_edit.variable.custom.buyerAddressObject.city,
							p_buyer_state : manage_quotation_master_edit.variable.custom.buyerAddressObject.state,
							p_buyer_country : manage_quotation_master_edit.variable.custom.buyerAddressObject.country,
							p_buyer_pincode : manage_quotation_master_edit.variable.custom.buyerAddressObject.pincode,
							p_consignee_customer_id : $("#manage_quotation_master_edit_consignee_code").getVal(),
							p_consignee_customer_location_code : $("#manage_quotation_master_edit_consignee_location").getVal(),
							p_consignee_address_line_1 : manage_quotation_master_edit.variable.custom.consigneeAddressObject.addr_1,
							p_consignee_address_line_2 : manage_quotation_master_edit.variable.custom.consigneeAddressObject.addr_2,
							p_consignee_address_line_3 : manage_quotation_master_edit.variable.custom.consigneeAddressObject.addr_3,
							p_consignee_city : manage_quotation_master_edit.variable.custom.consigneeAddressObject.city,
							p_consignee_state : manage_quotation_master_edit.variable.custom.consigneeAddressObject.state,
							p_consignee_country : manage_quotation_master_edit.variable.custom.consigneeAddressObject.country,
							p_consignee_pincode : manage_quotation_master_edit.variable.custom.consigneeAddressObject.pincode,
							p_seller_id : $("#manage_quotation_master_edit_seller_code").getVal(),
							p_seller_location_code : $("#manage_quotation_master_edit_seller_location").getVal(),
							p_place_of_despatch : $("#manage_quotation_master_edit_place_of_despatch").getVal(),
							p_destination : $("#manage_quotation_master_edit_destination").getVal(),
							p_despatch_mode_road_rail : $("#manage_quotation_master_edit_despatch_mode").getVal(),
							p_buyer_reference : $("#manage_quotation_master_edit_buyer_ref").getVal(),
							p_buyer_reference_date : mserviceUtilities.getDateString($("#manage_quotation_master_edit_buyer_ref_date").getVal(), "yyyy-MM-dd"),
							p_other_reference : $("#manage_quotation_master_edit_other_ref").getVal(),
							p_payment_terms : $("#manage_quotation_master_edit_payment_terms").getVal(),
							p_delivery_terms : $("#manage_quotation_master_edit_terms_of_delivery").getVal(),
							p_despatch_details : $("#manage_quotation_master_edit_despatch_details").getVal(),
							p_quotation_terms_conditions : $("#manage_quotation_master_edit_terms_and_condition").getVal(),
							p_quotation_summary_comments : $("#manage_quotation_master_edit_quotation_summary").getVal(),
							p_organogram_level_no : $("#manage_quotation_master_edit_org_level_no").getVal(),
							p_organogram_level_code : $("#manage_quotation_master_edit_org_level_code").getVal(),
							p_currency_code : $("#manage_quotation_master_edit_currency_code").getVal(),
							p_quotation_gross_amount : $("#manage_quotation_master_edit_partsAmount").text(),
							p_quotation_tax_amount : $("#manage_quotation_master_edit_taxAmount").text(),
							p_quotation_discount_amount : $("#manage_quotation_master_edit_discountAmount").text(),
							p_quotation_net_amount : $("#manage_quotation_master_edit_netAmount").text(),
							p_quotation_file_no : "1",
							p_quotation_final_pdf_upload : "2",
							p_quotation_output_file_name : "",
							p_quotation_output_file_path : "",
							p_inputparam_udf_xml : $("#manage_quotation_master_edit_content_1").getInputparamXML({
								screenID : "manage_quotation_master_edit",
								matchCondition : ["manage_quotation_master_edit_udf"]
							}),
							p_save_mode : manage_quotation_master.variable.custom.crudIndicator,
							p_rec_tstamp : recordTimeStamp,
							inputparam_quotation_detail : inputparamQuotationDetail,
							inputparam_quotation_charge_detail : inputparamQuotationChargeDetail
						});
					if (returnValue.quotation_file_no == "SP001") {
						alert("Quotation Details is saved successfully");
						return true;
					} else {
						alert("Saving of Quotation Details Failed");
						return false;
					}
				}
			}
		}
	},
	customRequirementHandler : {
		submitClickValidation : function () {
			var submitIndicator;
			if(manage_quotation_master.variable.custom.crudIndicator == "U"){
				if(parseFloat(manage_quotation_master_edit.variable.custom.header_1_record.quotation_gross_amount) != parseFloat($("#manage_quotation_master_edit_partsAmount").text())){
					if(confirm("Tax or Discount Details need to be changed since Part Details has been modified. Do you like to continue without change ?")){
						submitIndicator = 1;
					}
				} else {
					submitIndicator = 1;
				}
			} else {
				submitIndicator = 1;
			}
			return submitIndicator;
		},
		setSelectedRecord : function (element, event) {
			if(element.parentElement.id == "manage_quotation_master_edit_grid_1_toolbar_element"){
				manage_quotation_master_edit.variable.custom.selectedRecord = manage_quotation_master_edit.variable.custom.grid_1.dataSource.getByUid(manage_quotation_master_edit.variable.custom.grid_1.select().data("uid"));
			} else {
				manage_quotation_master_edit.variable.custom.selectedRecord = manage_quotation_master_edit.variable.custom.grid_2.dataSource.getByUid(manage_quotation_master_edit.variable.custom.grid_2.select().data("uid"));
			}
		},
		addressFetch : function (){
			manage_quotation_master_edit.variable.custom.sellerAddress = manage_quotation_master_edit.variable.custom.sellerAddressObject.addr_1 + " " + manage_quotation_master_edit.variable.custom.sellerAddressObject.addr_2 + " " + manage_quotation_master_edit.variable.custom.sellerAddressObject.addr_3 + "," + "\n" + manage_quotation_master_edit.variable.custom.sellerAddressObject.city + " " + manage_quotation_master_edit.variable.custom.sellerAddressObject.pincode + ", " + manage_quotation_master_edit.variable.custom.sellerAddressObject.state_desc + ", " + manage_quotation_master_edit.variable.custom.sellerAddressObject.country_desc;
			manage_quotation_master_edit.variable.custom.buyerAddress = manage_quotation_master_edit.variable.custom.buyerAddressObject.addr_1 + " " + manage_quotation_master_edit.variable.custom.buyerAddressObject.addr_2 + " " + manage_quotation_master_edit.variable.custom.buyerAddressObject.addr_3 + "," + "\n" + manage_quotation_master_edit.variable.custom.buyerAddressObject.city + " " + manage_quotation_master_edit.variable.custom.buyerAddressObject.pincode + ", " + manage_quotation_master_edit.variable.custom.buyerAddressObject.state_desc + ", " + manage_quotation_master_edit.variable.custom.buyerAddressObject.country_desc;
			manage_quotation_master_edit.variable.custom.consigneeAddress = manage_quotation_master_edit.variable.custom.consigneeAddressObject.addr_1 + " " + manage_quotation_master_edit.variable.custom.consigneeAddressObject.addr_2 + " " + manage_quotation_master_edit.variable.custom.consigneeAddressObject.addr_3 + "," + "\n" + manage_quotation_master_edit.variable.custom.consigneeAddressObject.city + " " + manage_quotation_master_edit.variable.custom.consigneeAddressObject.pincode + ", " + manage_quotation_master_edit.variable.custom.consigneeAddressObject.state_desc + ", " + manage_quotation_master_edit.variable.custom.consigneeAddressObject.country_desc;
		},
		dataSourceParseQuotation : function (response) {
			var parseResponse;
			if (response.document != undefined) {
				if (response.document.ApplicationException == undefined) {
					manage_quotation_master_edit.variable.custom.header_1_record = response.document.context.outputparam_header;
					if (response.document.context.outputparam_detail_quotation != undefined) {
						if (response.document.context.outputparam_detail_quotation.length != undefined) {
							parseResponse = response.document.context.outputparam_detail_quotation;
						} else {
							parseResponse = [response.document.context.outputparam_detail_quotation];
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
			if (response.document != undefined) {
				if (response.document.ApplicationException == undefined) {
					if (response.document.context.outputparam_detail_tax != undefined) {
						if (response.document.context.outputparam_detail_tax.length != undefined) {
							parseResponse = response.document.context.outputparam_detail_tax;
						} else {
							parseResponse = [response.document.context.outputparam_detail_tax];
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
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_quotation_master_edit_child.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_quotation_master_edit",
					fieldID : "manage_quotation_master_edit_child_window",
					nextScreenID : "manage_quotation_master_edit_child",
					nextScreenName : "Part Details" + " - " + manage_quotation_master_edit.variable.custom.nextScreenName,
					execute : manage_quotation_master_edit_child.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		taxScreen : function () {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_quotation_master_edit_child_taxdetails.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_quotation_master_edit",
					fieldID : "manage_quotation_master_edit_child_window",
					nextScreenID : "manage_quotation_master_edit_child_taxdetails",
					nextScreenName : "Tax and Discount Details" + " - " + manage_quotation_master_edit.variable.custom.nextScreenName,
					execute : manage_quotation_master_edit_child_taxdetails.constructScreen
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
			for (var i = 0; i < manage_quotation_master_edit.variable.custom.grid_1.dataSource.data().length; i++) {
				partsAmount = partsAmount + parseFloat(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[i].gross_amount);
			}
			for (var i = 0; i < manage_quotation_master_edit.variable.custom.grid_2.dataSource.data().length; i++) {
				if (manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[i].addl_charge_ind == "D") {
					discountAmount = discountAmount + parseFloat(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[i].amount);
				} else {
					taxAmount = taxAmount + parseFloat(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data()[i].amount);
				}
			}
			$("#manage_quotation_master_edit_partsAmount").text(parseFloat(partsAmount).toFixed(2));
			$("#manage_quotation_master_edit_taxAmount").text(parseFloat(taxAmount).toFixed(2));
			$("#manage_quotation_master_edit_discountAmount").text(parseFloat(discountAmount).toFixed(2));
			$("#manage_quotation_master_edit_netAmount").text(Math.round(partsAmount + taxAmount - discountAmount).toFixed(2));
		}
	},
	widgetEventHandler : {
		seller_location_change : function (element, event) {
			if ($("#manage_quotation_master_edit_seller_location").getVal() != "" && manage_quotation_master_edit.variable.custom.seller_location.dataItem() != undefined) {
				manage_quotation_master_edit.variable.custom.sellerAddressObject = manage_quotation_master_edit.variable.custom.seller_location.dataItem();
				manage_quotation_master_edit.customRequirementHandler.addressFetch();
				$("#manage_quotation_master_edit_seller_address").text(manage_quotation_master_edit.variable.custom.sellerAddress);
			} else {
				$("#manage_quotation_master_edit_seller_address").text("");
			}
		},
		buyer_location_change : function (element, event) {
			if ($("#manage_quotation_master_edit_buyer_location").getVal() != "" && manage_quotation_master_edit.variable.custom.buyer_location.dataItem() != undefined) {
				manage_quotation_master_edit.variable.custom.buyerAddressObject = manage_quotation_master_edit.variable.custom.buyer_location.dataItem();
				manage_quotation_master_edit.customRequirementHandler.addressFetch();
				$("#manage_quotation_master_edit_buyer_address").text(manage_quotation_master_edit.variable.custom.buyerAddress);
			} else {
				$("#manage_quotation_master_edit_buyer_address").text("");
			}
		},
		consignee_location_change : function (element, event) {
			if ($("#manage_quotation_master_edit_consignee_location").getVal() != "" && manage_quotation_master_edit.variable.custom.consignee_location.dataItem() != undefined) {
				manage_quotation_master_edit.variable.custom.consigneeAddressObject = manage_quotation_master_edit.variable.custom.consignee_location.dataItem();
				manage_quotation_master_edit.customRequirementHandler.addressFetch();
				$("#manage_quotation_master_edit_consignee_address").text(manage_quotation_master_edit.variable.custom.consigneeAddress);
			} else {
				$("#manage_quotation_master_edit_consignee_address").text("");
			}
		},
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
						fieldId : "manage_quotation_master_edit_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_quotation_master_edit_grid_1",
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