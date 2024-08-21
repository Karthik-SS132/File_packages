var manage_customer_order_master_service_spares_edit_child = {
	constructScreen : function () {
		manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				outputPath : "context/outputparam",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'GET_STANDARD_RATE'</lov_code_type><search_field_1>#manage_customer_order_master_service_spares_edit_child_item_code</search_field_1><search_field_2>#manage_customer_order_master_service_spares_edit_child_item_variant_code</search_field_2><search_field_3>#manage_customer_order_master_service_spares_edit_child_uom</search_field_3></inputparam>"
				},
				screenID : "manage_customer_order_master_service_spares_edit_child",
			});
		if (manage_customer_order_master_service_spares_edit.variable.custom.crudIndicator == "U" || manage_customer_order_master_service_spares_edit.variable.custom.crudIndicator == "V") {
			manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord = manage_customer_order_master_service_spares_edit.variable.custom.selectedRecord;
			if($("#manage_customer_order_master_service_spares_edit_customer_order_category").getVal() == "EO"){
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					pageSize : 10,
					schemaModel : {
						id: "sl_no"
					},
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'ORDERACCESSORY_ITEM_LINK'</lov_code_type><search_field_1>$manage_customer_order_master_service_spares_edit.variable.custom.selectedRecord.item_code</search_field_1><search_field_2>$manage_customer_order_master_service_spares_edit.variable.custom.selectedRecord.item_variant_code</search_field_2></inputparam>"
					},
					screenID : "manage_customer_order_master_service_spares_edit_child",
				});
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.read();
				for (var index = 0; index < manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.data().length; index++) {
					manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.data()[index].set("net_quantity", parseFloat(parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.data()[index].net_quantity) * parseFloat(manage_customer_order_master_service_spares_edit.variable.custom.selectedRecord.net_quantity)).toFixed(2));
					manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.data()[index].set("gross_amount", parseFloat(parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.data()[index].net_quantity) * parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.data()[index].std_rate)).toFixed(2));
				}
			} else {
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2 = new kendo.data.DataSource({ data: [] , pageSize : 10});manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.read();
			}
		}
		if (manage_customer_order_master_service_spares_edit.variable.custom.crudIndicator == "A" ) {
			manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2 = new kendo.data.DataSource({ data: [] , pageSize : 10});
			manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.read();
		}
	},
	postConstruct : function () {
		if (manage_customer_order_master_service_spares_edit.variable.custom.crudIndicator == "A") {
			$("#manage_customer_order_master_service_spares_edit_child_standard_rate").setVal("0.00");
			$("#manage_customer_order_master_service_spares_edit_child_amount").setVal("0.00");
		}
		if(manage_customer_order_master_service_spares_edit.variable.custom.crudIndicator == "U" || manage_customer_order_master_service_spares_edit.variable.custom.crudIndicator == "V"){
			$("#manage_customer_order_master_service_spares_edit_child_item_code").disable();
			$("#manage_customer_order_master_service_spares_edit_child_item_variant_code").disable();
			$("#manage_customer_order_master_service_spares_edit_child_uom").disable();
			var discountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function(data) {
				return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.charge_code == "DISCOUNT";
			});
			if(discountData.length != 0){
				$("#manage_customer_order_master_service_spares_edit_child_discount_type").setVal(discountData[0].percentage_amount_ind);
				if(discountData[0].percentage_amount_ind == "P"){
					$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal(discountData[0].percentage);
				} else {
					$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal(discountData[0].amount);
				}
			}
			if((manage_customer_order_master_service_spares_edit.variable.custom.selectedRecord.accessories_data != undefined) && (manage_customer_order_master_service_spares_edit.variable.custom.selectedRecord.accessories_data.length != 0)){
				var accessoryRecord = manage_customer_order_master_service_spares_edit.variable.custom.selectedRecord.accessories_data;
				var overallAccessory = manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.data();
				for (var index = 0; index < accessoryRecord.length; index++) { 
					for (var counter = 0 ; counter < overallAccessory.length; counter++) { 
						if (accessoryRecord[index].accessory_item_code === overallAccessory[counter].accessory_item_code) {
							manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1._selectedIds[overallAccessory[counter].sl_no] = true;
						}
					}
				}
				manage_customer_order_master_service_spares_edit_child.customRequirementHandler.reorderAccessorySelection();
			}			 
		}
		if(login_profile.item_variant_ind == "0"){
			$("#manage_customer_order_master_service_spares_edit_child_item_variant_code_group").hide();
		} else {
			$("#manage_customer_order_master_service_spares_edit_child_item_variant_code_group").show();
		}
		var discountConfig = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
				return data.charge_ind == "D";
			});
		if(discountConfig.length != 0){
			if(discountConfig[0].lineitem_overall_level_ind == "OVERALL"){
				$("#manage_customer_order_master_service_spares_edit_child_discount_type_group").hide();
				$("#manage_customer_order_master_service_spares_edit_child_discount_value_group").hide();
			} else {
				$("#manage_customer_order_master_service_spares_edit_child_discount_type_group").show();
				$("#manage_customer_order_master_service_spares_edit_child_discount_value_group").show();
			}
			var discountIndicator = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function(data){
					return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
				});
			if(discountIndicator.length != 0){
				$("#manage_customer_order_master_service_spares_edit_child_discount_type_group").hide();
				$("#manage_customer_order_master_service_spares_edit_child_discount_value_group").hide();
			}
			if(discountConfig[0].amount_perc_ind != "UC"){
				manage_customer_order_master_service_spares_edit_child.variable.custom.discount_type.dataSource.filter({logic:"or",filters : [{field: "code",value: discountConfig[0].amount_perc_ind, operator: "eq"}]})					  
			}
		}
		if(manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_category == "PO"){
			$("#manage_customer_order_master_service_spares_edit_child section").removeClass("data_table");
			$("#manage_customer_order_master_service_spares_edit_child section div").removeClass("content_bg");
			$("#manage_customer_order_master_service_spares_edit_child_screen_title").hide();
			$("#manage_customer_order_master_service_spares_edit_child_accessories_screen").hide();
			$("#manage_customer_order_master_service_spares_edit_child_grid_1").hide();
			$("#manage_customer_order_master_service_spares_edit_child_footer .right").removeClass("right").wrap("<center></center>");
		}
		$("#manage_customer_order_master_service_spares_edit_child_grid_1").find(".k-auto-scrollable").css("height","333px");
		$("#manage_customer_order_master_service_spares_edit_child_grid_1").find(".k-grid-header-wrap").css("height","29px");	   
	},
	initializeWidgets : function () {
		$("#manage_customer_order_master_service_spares_edit_child_item_code").initializeWSearchbox({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			dataSource : {
				informationType : "'ITEMCODE_LIST'",
				searchField1 : "$manage_customer_order_master_service_spares_edit_child.variable.custom.item_code_serverFilterValue",
				searchField2 : "$manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_category"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			minLength : 2,
			childFieldID : "manage_customer_order_master_service_spares_edit_child_item_variant_code,manage_customer_order_master_service_spares_edit_child_uom",
			defaultValue : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.item_code",
			defaultValueDescription : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.item_description",
		});
		$("#manage_customer_order_master_service_spares_edit_child_item_variant_code").initializeWDropdownlist({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_customer_order_master_service_spares_edit_child_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			childFieldID : "manage_customer_order_master_service_spares_edit_child_uom",
			defaultValue : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.item_variant_code",
			defaultValueDescription : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.variant_description",
		});
		$("#manage_customer_order_master_service_spares_edit_child_uom").initializeWDropdownlist({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			dataSource : {
				informationType : "'GET_ITEM_UOM'",
				searchField1 : "#manage_customer_order_master_service_spares_edit_child_item_code",
				searchField2 : "#manage_customer_order_master_service_spares_edit_child_item_variant_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.uom_code",
			defaultValueDescription : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.uom_code_description",
		});
		manage_customer_order_master_service_spares_edit_child.variable.custom.quantity = $("#manage_customer_order_master_service_spares_edit_child_quantity").initializeWNumerictextbox({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			format : "n2",
			minimum : "'1'",
			defaultValue : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.net_quantity",
		});
		manage_customer_order_master_service_spares_edit_child.variable.custom.standard_rate = $("#manage_customer_order_master_service_spares_edit_child_standard_rate").initializeWDisplayarea({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			defaultValue : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.std_rate",
		});
		$("#manage_customer_order_master_service_spares_edit_child_amount").initializeWDisplayarea({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			defaultValue : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.gross_amount",
		});
		manage_customer_order_master_service_spares_edit_child.variable.custom.discount_type = $("#manage_customer_order_master_service_spares_edit_child_discount_type").initializeWDropdownlist({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			dataSource :[{"description": "Amount", "code": "A"}, {"description": "Percentage", "code": "P"}],
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
		});
		manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value = $("#manage_customer_order_master_service_spares_edit_child_discount_value").initializeWNumerictextbox({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			format : "n2",
			minimum : "'0'",
		});
		$("#manage_customer_order_master_service_spares_edit_child_addn_description").initializeWTextbox({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			maxlength : "500",
			defaultValue : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.addn_description",
		});
		$("#manage_customer_order_master_service_spares_edit_child_comment_block_1").initializeWTextarea({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			maxlength : "500",
			defaultValue : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.comments_block_1",
		});
		$("#manage_customer_order_master_service_spares_edit_child_comment_block_2").initializeWTextarea({
			screenID : "manage_customer_order_master_service_spares_edit_child",
			maxlength : "500",
			defaultValue : "$manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.comments_block_2",
		});								
		manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1 = $("#manage_customer_order_master_service_spares_edit_child_grid_1").kendoGrid({
			dataSource: {
				pageSize: 10,
				data : manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.data(),
				schema: {
					model: {
						id: "sl_no"
					}
				}
			},
			height : 400,
			pageable: true,
			scrollable: true,
			persistSelection: true,
			sortable: true,
			filterable: {
				extra: false,
				operators: {
					string: {
						startswith: "Starts with",
						eq: "Is equal to",
						contains: "Contains" 
					}
				}
			},
			change: manage_customer_order_master_service_spares_edit_child.customRequirementHandler.accessorySelection,
			columns: [
				{ selectable: true, width: "50px" },
				{ field:"sl_no", title: "Sl.No", width: "80px", filterable: false},
				{ hidden: true, field: "customer_order_item_code", title:"Customer Order Item Code"},
				{ hidden: true, field: "customer_order_item_variant_code", title:"Customer Order Variant Code"},
				{ field:"accessory_group", title: "Accessory Group", width: "150px" },
				{ field:"accessory_item_code", title: "Accessory", width: "150px" },
				{ field: "item_description", title: "Description", width: "350px" },
				{ hidden: true, field: "accessory_item_variant_code", title:"Accessory Variant"},
				{ hidden: true, field: "variant_description", title:"Variant Description"},
				{ field: "net_quantity", title:"Net Quantity", width: "120px", template : "#if (kendo.toString(net_quantity) == '') {# #} else {#${kendo.toString(kendo.parseFloat(net_quantity), 'n2')} ${kendo.toString(uom_code)} #}#", filterable: false},
				{ hidden: true, field: "uom_code", title:"UOM"},
				{ field: "std_rate", title:"Unit Rate (INR)", width: "120px", template : "#if (kendo.toString(std_rate) == '') {# #} else {#${kendo.toString(kendo.parseFloat(std_rate), 'n2')} #}#", filterable: false },
				{ hidden: true, field: "currency_code", title:"Currency Code"},
				{ field: "gross_amount", title: "Gross Amount (INR)", width: "120px", template : "#if (kendo.toString(gross_amount) == '') {# #} else {#${kendo.toString(kendo.parseFloat(gross_amount), 'n2')} #}#", filterable: false },
				{ hidden: true, field: "uom_code_description", title: "Uom Description" },
				{ hidden: true, field: "currency_code_description", title:"Currency Description"},
				{ hidden: true, field: "last_update_timestamp", title: "Time Stamp" }]
		}).data("kendoGrid");		   
	},
	customRequirementHandler : {
		reorderAccessorySelection : function (element, event) {
			var selectionArray = manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.data().filter(function(data) {
				return manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.selectedKeyNames().includes(data.sl_no); 
			});
			var unselectionArray = manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.data().filter(function(data) {
				return !manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.selectedKeyNames().includes(data.sl_no); 
			});
			var reorderedData = selectionArray.concat(unselectionArray);
			manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2 = new kendo.data.DataSource({ data: reorderedData, pageSize : 10, schema: { model: { id: "sl_no" } } });
			manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.read();
			manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.setDataSource(manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2);
			manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1._restoreSelection();
		},
		accessorySelection : function (element, event) {
			if (($("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() != "") && ($("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal() != "")&& ($("#manage_customer_order_master_service_spares_edit_child_uom").getVal() != "")) {
				var netAmount = 0;
				var accessoriesList = [];
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1.read();
				for(var index=0; index < manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.selectedKeyNames().length; index++){ 
					var selectedAccessories = $.grep(manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.data(), function (data) {
							return data.sl_no == manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.selectedKeyNames()[index];
						}); 
					if(selectedAccessories.length != 0){
						accessoriesList.push(selectedAccessories[0])
					}
				}
				for (var accessoriesCounter = 0; accessoriesCounter < accessoriesList.length; accessoriesCounter++) {
					netAmount += parseFloat(accessoriesList[accessoriesCounter].gross_amount);
				};
				var partAmount = ((parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1.data()[0].std_rate).toFixed(2)) * $("#manage_customer_order_master_service_spares_edit_child_quantity").getVal());
				$("#manage_customer_order_master_service_spares_edit_child_amount").setVal((partAmount + netAmount).toFixed(2));
				if($("#manage_customer_order_master_service_spares_edit_child_amount").getVal() != "0.00"){
					$("#manage_customer_order_master_service_spares_edit_child_standard_rate").setVal((parseFloat($("#manage_customer_order_master_service_spares_edit_child_amount").getVal())/parseFloat($("#manage_customer_order_master_service_spares_edit_child_quantity").getVal())).toFixed(2));
				} else {
					$("#manage_customer_order_master_service_spares_edit_child_standard_rate").setVal(parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.standardRate[0].std_rate).toFixed(2));
				}
			}
		},
		partValidation : function () {
			var keyValidation = manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].uom_code == $("#manage_customer_order_master_service_spares_edit_child_uom").getVal() && keyValidation[i].item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal()) {
					alert("Part Details already exists.");
					$("#manage_customer_order_master_service_spares_edit_child_uom").setVal("");
				}
			}
		},
		setSelectedRecord : function (element, event) {
			manage_customer_order_master_service_spares_edit_child.variable.custom.selectedRecord = manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.getByUid(manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.select().data("uid"));
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			if ($("#manage_customer_order_master_service_spares_edit_child_uom").getVal() == "") {
				$("#manage_customer_order_master_service_spares_edit_child_quantity").setVal("");
				$("#manage_customer_order_master_service_spares_edit_child_standard_rate").setVal("0.00");
				$("#manage_customer_order_master_service_spares_edit_child_amount").setVal("0.00");
				manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max("0.00");
				$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal("0.00");	
			}
			manage_customer_order_master_service_spares_edit_child.customRequirementHandler.partValidation();
			if($("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() == ""){
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2 = new kendo.data.DataSource({ data: [] , pageSize : 10});
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.read();
				manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.setDataSource(manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2);
				manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1._selectedIds = {};
			}
		},
		item_variant_code_change : function (element, event) {
			if (($("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() != "") && ($("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal() != "")) {
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					pageSize : 10,
					schemaModel : {
						id: "sl_no"
					},
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'ORDERACCESSORY_ITEM_LINK'</lov_code_type><search_field_1>#manage_customer_order_master_service_spares_edit_child_item_code</search_field_1><search_field_2>#manage_customer_order_master_service_spares_edit_child_item_variant_code</search_field_2></inputparam>"
					},
					screenID : "manage_customer_order_master_service_spares_edit_child",
				});
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2.read();
				manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.setDataSource(manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_2);
			}
		},
		uom_change : function (element, event) {
			manage_customer_order_master_service_spares_edit_child.customRequirementHandler.partValidation();
			if ($("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() != "" && $("#manage_customer_order_master_service_spares_edit_child_uom").getVal() != "") {
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1.read();
				if (manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1.data().length == 0) {
					$("#manage_customer_order_master_service_spares_edit_child_standard_rate").setVal("0.00");
				} else {
					manage_customer_order_master_service_spares_edit_child.variable.custom.standardRate = manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1.data();
					$("#manage_customer_order_master_service_spares_edit_child_standard_rate").setVal(parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.standardRate[0].std_rate).toFixed(2));
					var amount = ((parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.standardRate[0].std_rate).toFixed(2)) * $("#manage_customer_order_master_service_spares_edit_child_quantity").getVal());
					$("#manage_customer_order_master_service_spares_edit_child_amount").setVal(parseFloat(amount).toFixed(2));
					if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() == "P"){
						manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max("100");
						if($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal() > "100.00"){
							$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal("100");
						}
					} else {
						manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max(parseFloat(amount).toFixed(2));
						if($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal() > (parseFloat(amount).toFixed(2)).toString()){
							$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal(parseFloat(amount).toFixed(2));
						}
					}
				}
			} else {
				$("#manage_customer_order_master_service_spares_edit_child_quantity").setVal("");
				$("#manage_customer_order_master_service_spares_edit_child_standard_rate").setVal("0.00");
				$("#manage_customer_order_master_service_spares_edit_child_amount").setVal("0.00");
				manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max("0.00");
				$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal("0.00");
			}
		},
		quantity_change : function (element, event) {
			if ($("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() != "" && $("#manage_customer_order_master_service_spares_edit_child_uom").getVal() != "") {
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1.read();
				manage_customer_order_master_service_spares_edit_child.variable.custom.standardRate = manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1.data();
				var amount = ((parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.standardRate[0].std_rate).toFixed(2)) * $("#manage_customer_order_master_service_spares_edit_child_quantity").getVal());
				$("#manage_customer_order_master_service_spares_edit_child_amount").setVal(parseFloat(amount).toFixed(2));
				if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() == "P"){
					manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max("100");
					if($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal() > "100.00"){
						$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal("100");
					}
				} else {
					manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max(parseFloat(amount).toFixed(2));
					if($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal() > (parseFloat(amount).toFixed(2)).toString()){
						$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal(parseFloat(amount).toFixed(2));
					}
				}
				if((manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.data() != undefined) && (manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.data().length != 0)){
					manage_customer_order_master_service_spares_edit_child.variable.custom.initialDatasourse = mserviceUtilities.getTransportDataSource({
						applicationName : "common_modules",
						serviceName : "retrieve_listof_values_for_searchcondition",
						outputPath : "context/outputparam",
						pageSize : 10,
						schemaModel : {
							id: "sl_no"
						},
						inputParameter : {
							p_inputparam_xml : "<inputparam><lov_code_type>'ORDERACCESSORY_ITEM_LINK'</lov_code_type><search_field_1>#manage_customer_order_master_service_spares_edit_child_item_code</search_field_1><search_field_2>#manage_customer_order_master_service_spares_edit_child_item_variant_code</search_field_2></inputparam>"
						},
						screenID : "manage_customer_order_master_service_spares_edit_child",
					});
					manage_customer_order_master_service_spares_edit_child.variable.custom.initialDatasourse.read();
					if($("#manage_customer_order_master_service_spares_edit_child_quantity").getVal() == ""){
						var quantity = "0.00";
					} else {
						var quantity = $("#manage_customer_order_master_service_spares_edit_child_quantity").getVal();
					}
					for (var index = 0; index < manage_customer_order_master_service_spares_edit_child.variable.custom.initialDatasourse.data().length; index++) {
						manage_customer_order_master_service_spares_edit_child.variable.custom.initialDatasourse.data()[index].set("net_quantity", parseFloat(parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.initialDatasourse.data()[index].net_quantity) * parseFloat(quantity)).toFixed(2));
						manage_customer_order_master_service_spares_edit_child.variable.custom.initialDatasourse.data()[index].set("gross_amount", parseFloat(parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.initialDatasourse.data()[index].net_quantity) * parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.initialDatasourse.data()[index].std_rate)).toFixed(2));
					}
					manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.setDataSource(manage_customer_order_master_service_spares_edit_child.variable.custom.initialDatasourse);
				}
				manage_customer_order_master_service_spares_edit_child.customRequirementHandler.accessorySelection();
			} else {
				$("#manage_customer_order_master_service_spares_edit_child_amount").setVal("0.00");
				manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max("0.00");
				$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal("0.00");
			}
		},
		discount_type_change : function (){
			if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() == ""){
				$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal("0.00");
			} else if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() == "P"){
				manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max("100");
				if($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal() > "100.00"){
					$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal("100");
				}
			} else if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() == "A"){
				manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max($("#manage_customer_order_master_service_spares_edit_child_amount").getVal());
				if($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal() > $("#manage_customer_order_master_service_spares_edit_child_amount").getVal()){
					$("#manage_customer_order_master_service_spares_edit_child_discount_value").setVal($("#manage_customer_order_master_service_spares_edit_child_amount").getVal());
				}
			} else {
				manage_customer_order_master_service_spares_edit_child.variable.custom.discount_value.max("9999999999");
			}
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if(manage_customer_order_master_service_spares_edit_child.variable.custom.crudIndicator == "D"){
				manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.remove(manage_customer_order_master_service_spares_edit_child.variable.custom.selectedRecord);
				alert("Data deleted successfully.");
				manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1.read();
				var netAmount = 0;
				var accessoriesList = manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.data();
				for (var accessoriesCounter = 0; accessoriesCounter < accessoriesList.length; accessoriesCounter++) {
					netAmount += parseFloat(accessoriesList[accessoriesCounter].gross_amount);
				};
				var partAmount = ((parseFloat(manage_customer_order_master_service_spares_edit_child.variable.custom.datasource_1.data()[0].std_rate).toFixed(2)) * $("#manage_customer_order_master_service_spares_edit_child_quantity").getVal());
				$("#manage_customer_order_master_service_spares_edit_child_amount").setVal((partAmount + netAmount).toFixed(2));
				$("#manage_customer_order_master_service_spares_edit_child_standard_rate").setVal((parseFloat($("#manage_customer_order_master_service_spares_edit_child_amount").getVal())/parseFloat($("#manage_customer_order_master_service_spares_edit_child_quantity").getVal())).toFixed(2));
				if(accessoriesList.length == 0){
					$("#manage_customer_order_master_service_spares_edit_child_item_code").enable();
					$("#manage_customer_order_master_service_spares_edit_child_item_variant_code").enable();
					$("#manage_customer_order_master_service_spares_edit_child_uom").enable();
					$("#manage_customer_order_master_service_spares_edit_child_quantity").enable();
				}
			} else {
				if((manage_customer_order_master_service_spares_edit_child.variable.custom.crudIndicator == "A") && ($("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() != "")&& ($("#manage_customer_order_master_service_spares_edit_child_uom").getVal() != "") && ($("#manage_customer_order_master_service_spares_edit_child_quantity").getVal() != "")){
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_order_master_service_spares_edit_child_accessories.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_order_master_service_spares_edit_child",
							fieldID : "manage_customer_order_master_service_spares_edit_child_child_window",
							nextScreenID : "manage_customer_order_master_service_spares_edit_child_accessories",
							nextScreenName : "Accessories" + " - " + manage_customer_order_master_service_spares_edit_child.variable.custom.nextScreenName,
							execute : manage_customer_order_master_service_spares_edit_child_accessories.constructScreen
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact your support desk.");
						return false;
					}
				} else {
					alert("Please fill Part Details to choose accessories.");
					return false;
				}	
			}
		},								  
		submit_btn_click : function (element, event) {
			if (($("#manage_customer_order_master_service_spares_edit_child_quantity").getVal() != 0) && ($("#manage_customer_order_master_service_spares_edit_child_quantity").getVal() > 0)) {
				if (manage_customer_order_master_service_spares_edit.variable.custom.crudIndicator == "A") {
					var inputparamAccessoriesDetail = [];
					var accessoryArray = [];
					for(key in manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1._selectedIds){ 
						accessoryArray.push(manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.data()[key-1]);
					}
					for (var accessoriesRecordCounter = 0; accessoriesRecordCounter < accessoryArray.length; accessoriesRecordCounter++) {
						inputparamAccessoriesDetail.push({
							sl_no: (accessoriesRecordCounter + 1).toString(),
							customer_order_item_code: accessoryArray[accessoriesRecordCounter].customer_order_item_code,
							customer_order_item_variant_code : accessoryArray[accessoriesRecordCounter].customer_order_item_variant_code,
							accessory_item_code: accessoryArray[accessoriesRecordCounter].accessory_item_code,
							accessory_item_variant_code : accessoryArray[accessoriesRecordCounter].accessory_item_variant_code,
							net_quantity : parseFloat(accessoryArray[accessoriesRecordCounter].net_quantity).toFixed(2),
							uom_code : accessoryArray[accessoriesRecordCounter].uom_code,
							std_rate : parseFloat(accessoryArray[accessoriesRecordCounter].std_rate).toFixed(2),
							currency_code : accessoryArray[accessoriesRecordCounter].currency_code,
							item_description : accessoryArray[accessoriesRecordCounter].item_description,
							variant_description : accessoryArray[accessoriesRecordCounter].variant_description,
							gross_amount : parseFloat(accessoryArray[accessoriesRecordCounter].gross_amount).toFixed(2),
							uom_code_description : accessoryArray[accessoriesRecordCounter].uom_code_description,
							currency_code_description : accessoryArray[accessoriesRecordCounter].currency_code_description
						});
					};					
					manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.add({
						customer_order_item_sl_no : (manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data().length + 1).toString(),
						item_code : $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal(),
						item_variant_code : $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal(),
						net_quantity : $("#manage_customer_order_master_service_spares_edit_child_quantity").getVal().toString(),
						invoiced_quantity : "0",
						pending_quantity : "0",
						uom_code : $("#manage_customer_order_master_service_spares_edit_child_uom").getVal(),
						std_rate : ($("#manage_customer_order_master_service_spares_edit_child_standard_rate").getVal()).toString(),
						currency_code : $("#manage_customer_order_master_service_spares_edit_currency_code").getVal(),
						item_description : mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal(), ""),
						variant_description : mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal(), ""),
						addn_description : $("#manage_customer_order_master_service_spares_edit_child_addn_description").getVal(),
						comments_block_1 : $("#manage_customer_order_master_service_spares_edit_child_comment_block_1").getVal(),
						comments_block_2 : $("#manage_customer_order_master_service_spares_edit_child_comment_block_2").getVal(),
						gross_amount : ($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()).toString(),
						prorated_tax_amount : $("#manage_customer_order_master_service_spares_edit_taxAmount").text(),
						prorated_discount_amount : $("#manage_customer_order_master_service_spares_edit_discountAmount").text(),
						last_update_timestamp : "00000000-0000-0000-0000-000000000000",
						uom_code_description : mserviceUtilities.getDescriptionForCode("ITEMUOM_LIST", $("#manage_customer_order_master_service_spares_edit_child_uom").getVal(), ""),
						currency_code_description : mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", $("#manage_customer_order_master_service_spares_edit_currency_code").getVal(), ""),
						accessories_data : inputparamAccessoriesDetail	
					});
					if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() != "" && $("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal() != ""){
						var amount, applicableAmount, percentage;
						if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() == "A"){
							amount = ($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal()).toString();
							percentage = "0.00";
							applicableAmount = "0.00";
						} else {
							percentage = ($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal()).toString();
							applicableAmount = ($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()).toString();
							amount = ((parseFloat($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal()) *  parseFloat($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()))/100).toString();
						}
						manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.add({
							item_code : $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal(),
							item_variant_code : $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal(),
							item_description : mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal(), ""),
							variant_description : mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal(), ""),
							charge_sl_no : (manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
							addl_charge_ind : "D",
							charge_category : "DISCOUNT",
							charge_type : "DISCOUNT",
							charge_code : "DISCOUNT",
							percentage_amount_ind : $("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal(),
							percentage : percentage,
							applicable_on_amount : applicableAmount,
							amount : amount,
							currency_code : $("#manage_customer_order_master_service_spares_edit_currency_code").getVal(),
							last_update_timestamp : "00000000-0000-0000-0000-000000000000",
							addl_charge_desc : "Discount",
							charge_category_desc : "Discount",
							charge_description : "Discount",
							percentage_amount_ind_description : mserviceUtilities.getDescriptionForCode("PERCENTAMTINDICATOR_LIST",  $("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal(), "")
						});
					}
					
					
					if (typeof(fn_taxation_customer_order_spares_add_click) === "function") {
						fn_taxation_customer_order_spares_add_click();
					}
					
					var addlChargeDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
					});
					if(addlChargeDataOverall.length != 0){
						var overallDiscountAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function(data){
							return data.charge_code == "DISCOUNT";
						});
						var discountAmount = 0.00;
						if (overallDiscountAmount.length != 0) {
							for(var index = 0; index < overallDiscountAmount.length; index++){
								discountAmount += parseFloat(overallDiscountAmount[index].amount);
							}
						}
						
						var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
						
						var addlChargeDataUpdatedOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});		
							
						if(addlChargeDataUpdatedOverall.length != 0){	
							for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
								var addlTaxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					var taxOnTaxConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
						return data.parent_code != "";
					});

					var taxOnTaxDataOverall =[];
					if(taxOnTaxConfigOverall.length != 0){
						var taxDataOverallConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						var taxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
						});
					}
					var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
						return data;
					});
					var taxAmount = 0.00;
					if (overallTaxAmount.length != 0) {
						for(var index = 0; index < overallTaxAmount.length; index++){
							taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
						}
					}
					var overallDiscountAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function(data){
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
						var taxDataOverallUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
						});
						for(var index=0; index < taxDataOverallUpdated.length; index++){
							for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
								if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
									var taxOnTaxUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					
					var overallDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
					});
					
					if(overallDiscountData.length != 0){
						
						var itemGross = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
						
						var overallDiscount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
						});
						
						var taxOnTaxConfig = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});
						var taxOnTaxData =[];
						if(taxOnTaxConfig.length != 0){
							var taxDataConfig = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							var taxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
						}

						if (taxData.length != 0) {
							for (i = 0; i < taxData.length; i++) {
								var itemGrossAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data.item_code == taxData[i].item_code;
								});
								var itemGross = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
							var taxDataUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
							for(var index=0; index < taxDataUpdated.length; index++){
								for(var counter=0; counter < taxOnTaxData.length; counter++){
									if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
										var taxOnTaxUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						
						var taxOnTaxConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});

						var taxOnTaxDataOverall =[];
						if(taxOnTaxConfigOverall.length != 0){
							var taxDataOverallConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							var taxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data){
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
						}
						var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
							var taxDataOverallUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
							for(var index=0; index < taxDataOverallUpdated.length; index++){
								for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
									if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
										var taxOnTaxUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

						var addlChargeData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});
						if (addlChargeData.length != 0) {
							for (i = 0; i < addlChargeData.length; i++) {
								var itemGrossAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data.item_code == taxData[i].item_code;
								});
								var itemGross = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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

						var addlChargeDataUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});		
						if(addlChargeDataUpdated.length != 0){		
							for(var i=0; i < addlChargeDataUpdated.length; i++){	
								var addlTaxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

						var addlChargeDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});
						if(addlChargeDataOverall.length != 0){
							var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
							
							var addlChargeDataUpdatedOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});		
								
							if(addlChargeDataUpdatedOverall.length != 0){	
								for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
									var addlTaxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					
					
					
				} else {
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("customer_order_item_sl_no", manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.customer_order_item_sl_no);
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("item_code", $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("item_variant_code", $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("net_quantity", $("#manage_customer_order_master_service_spares_edit_child_quantity").getVal().toString());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("uom_code", $("#manage_customer_order_master_service_spares_edit_child_uom").getVal());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("std_rate", ($("#manage_customer_order_master_service_spares_edit_child_standard_rate").getVal()).toString());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("currency_code", $("#manage_customer_order_master_service_spares_edit_currency_code").getVal());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("item_description", mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal(), ""));
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("variant_description", mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal(), ""));
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("addn_description", $("#manage_customer_order_master_service_spares_edit_child_addn_description").getVal());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("comments_block_1", $("#manage_customer_order_master_service_spares_edit_child_comment_block_1").getVal());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("comments_block_2", $("#manage_customer_order_master_service_spares_edit_child_comment_block_2").getVal());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("gross_amount", ($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()).toString());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("prorated_tax_amount", $("#manage_customer_order_master_service_spares_edit_taxAmount").text());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("prorated_discount_amount", $("#manage_customer_order_master_service_spares_edit_discountAmount").text());
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("last_update_timestamp", manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.last_update_timestamp);
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("uom_code_description", mserviceUtilities.getDescriptionForCode("ITEMUOM_LIST", $("#manage_customer_order_master_service_spares_edit_child_uom").getVal(), ""));
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("currency_code_description", mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", $("#manage_customer_order_master_service_spares_edit_currency_code").getVal(), ""));
					var inputparamAccessoriesDetail = [];
					var accessoryArray = [];
					for(key in manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1._selectedIds){ 
						accessoryArray.push(manage_customer_order_master_service_spares_edit_child.variable.custom.grid_1.dataSource.data()[key-1]);
					}
					for (var accessoriesRecordCounter = 0; accessoriesRecordCounter < accessoryArray.length; accessoriesRecordCounter++) {
						inputparamAccessoriesDetail.push({
							sl_no: (accessoriesRecordCounter + 1).toString(),
							customer_order_item_code: accessoryArray[accessoriesRecordCounter].customer_order_item_code,
							customer_order_item_variant_code : accessoryArray[accessoriesRecordCounter].customer_order_item_variant_code,
							accessory_item_code: accessoryArray[accessoriesRecordCounter].accessory_item_code,
							accessory_item_variant_code : accessoryArray[accessoriesRecordCounter].accessory_item_variant_code,
							net_quantity : parseFloat(accessoryArray[accessoriesRecordCounter].net_quantity).toFixed(2),
							uom_code : accessoryArray[accessoriesRecordCounter].uom_code,
							std_rate : parseFloat(accessoryArray[accessoriesRecordCounter].std_rate).toFixed(2),
							currency_code : accessoryArray[accessoriesRecordCounter].currency_code,
							item_description : accessoryArray[accessoriesRecordCounter].item_description,
							variant_description : accessoryArray[accessoriesRecordCounter].variant_description,
							gross_amount : parseFloat(accessoryArray[accessoriesRecordCounter].gross_amount).toFixed(2),
							uom_code_description : accessoryArray[accessoriesRecordCounter].uom_code_description,
							currency_code_description : accessoryArray[accessoriesRecordCounter].currency_code_description
						});
					};
					
					
					if (typeof(fn_taxation_customer_order_spares_edit_click) === "function") {
						fn_taxation_customer_order_spares_edit_click();
					}
					
					if(accessoryArray.length == 0){
						manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("accessories_data", "");	
					}
					manage_customer_order_master_service_spares_edit_child.variable.custom.headerRecord.set("accessories_data", inputparamAccessoriesDetail);					  
					var discountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function(data) {
						return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.charge_code == "DISCOUNT";
					});
					if(discountData.length != 0){
						if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() != "" && $("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal() != ""){
							var amount, applicableAmount, percentage, percentageAmountInd, percentageAmountIndDesc;
							if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() == "A"){
								amount = ($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal()).toString();
								percentage = "0.00";
								applicableAmount = "0.00";
								percentageAmountInd = "A";
								percentageAmountIndDesc = "Amount";
							} else {
								percentage = ($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal()).toString();
								applicableAmount = ($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()).toString();
								amount = ((parseFloat($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal()) *  parseFloat($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()))/100).toString();
								percentageAmountInd = "P";
								percentageAmountIndDesc = "Percentage";
							}
							discountData[0].set("percentage", percentage);
							discountData[0].set("applicable_on_amount", applicableAmount);
							discountData[0].set("amount", amount);
							discountData[0].set("percentage_amount_ind", percentageAmountInd);
							discountData[0].set("percentage_amount_ind_description", percentageAmountIndDesc);
						} else {
							manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.remove(discountData[0]);
							for (var index = 0; index < manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length; index++) {
								manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
							}
						}
					} else {
						if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() != "" && $("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal() != ""){
							var amount, applicableAmount, percentage;
							if($("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal() == "A"){
								amount = ($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal()).toString();
								percentage = "0.00";
								applicableAmount = "0.00";
							} else {
								percentage = ($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal()).toString();
								applicableAmount = ($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()).toString();
								amount = ((parseFloat($("#manage_customer_order_master_service_spares_edit_child_discount_value").getVal()) *  parseFloat($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()))/100).toString();
							}
							manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.add({
								item_code : $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal(),
								item_variant_code : $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal(),
								item_description : mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal(), ""),
								variant_description : mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal(), ""),
								charge_sl_no : (manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
								addl_charge_ind : "D",
								charge_category : "DISCOUNT",
								charge_type : "DISCOUNT",
								charge_code : "DISCOUNT",
								percentage_amount_ind : $("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal(),
								percentage : percentage,
								applicable_on_amount : applicableAmount,
								amount : amount,
								currency_code : $("#manage_customer_order_master_service_spares_edit_currency_code").getVal(),
								last_update_timestamp : "00000000-0000-0000-0000-000000000000",
								addl_charge_desc : "Discount",
								charge_category_desc : "Discount",
								charge_description : "Discount",
								percentage_amount_ind_description : mserviceUtilities.getDescriptionForCode("PERCENTAMTINDICATOR_LIST",  $("#manage_customer_order_master_service_spares_edit_child_discount_type").getVal(), "")
							});
						}
					}
					var discountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.charge_code == "DISCOUNT" ;
					});
					if (discountData.length != 0) {
						var discountValue = discountData[0].amount;
					} else {
						var discountValue = "0.00";
					}
					
					var taxOnTaxConfig = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
						return data.parent_code != "";
					});
					
					var taxOnTaxData =[];
					if(taxOnTaxConfig.length != 0){
						var taxDataConfig = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
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
						var taxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
						});
					}

					var applicableAmount = parseFloat($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()) - parseFloat(discountValue);
					if (taxData.length != 0) {
						for (i = 0; i < taxData.length; i++) {
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
						var taxDataUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
						});
						for(var index=0; index < taxDataUpdated.length; index++){
							for(var counter=0; counter < taxOnTaxData.length; counter++){
								if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
									var taxOnTaxUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
										return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.charge_code != "DISCOUNT" && data.charge_category == "STD" && data.charge_code == taxOnTaxData[counter].parent_code;
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
					
					var addlChargeData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.addl_charge_ind == "A" && data.charge_category != "STD";
					});

					var addlChargeApplicableAmount = parseFloat($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()) - parseFloat(discountValue);
					if (addlChargeData.length != 0) {
						for (i = 0; i < addlChargeData.length; i++) {
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

					var addlChargeDataUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.addl_charge_ind == "A" && data.charge_category != "STD";
					});		
					if(addlChargeDataUpdated.length != 0){		
						for(var i=0; i < addlChargeDataUpdated.length; i++){	
							var addlTaxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					
					var addlChargeDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
					});
					if(addlChargeDataOverall.length != 0){
						var overallDiscountAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function(data){
							return data.charge_code == "DISCOUNT";
						});
						var discountAmount = 0.00;
						if (overallDiscountAmount.length != 0) {
							for(var index = 0; index < overallDiscountAmount.length; index++){
								discountAmount += parseFloat(overallDiscountAmount[index].amount);
							}
						}
						
						var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
						
						var addlChargeDataUpdatedOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});		
							
						if(addlChargeDataUpdatedOverall.length != 0){	
							for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
								var addlTaxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					
					var taxOnTaxConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
						return data.parent_code != "";
					});

					var taxOnTaxDataOverall =[];
					if(taxOnTaxConfigOverall.length != 0){
						var taxDataOverallConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						var taxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
						});
					}
					var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
						return data;
					});
					var taxAmount = 0.00;
					if (overallTaxAmount.length != 0) {
						for(var index = 0; index < overallTaxAmount.length; index++){
							taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
						}
					}
					var overallDiscountAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function(data){
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
						var taxDataOverallUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
						});
						for(var index=0; index < taxDataOverallUpdated.length; index++){
							for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
								if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
									var taxOnTaxUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					
					var overallDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
					});
					
					if(overallDiscountData.length != 0){
						
						var itemGross = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
						
						var overallDiscount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
						});
						
						var taxOnTaxConfig = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});
						var taxOnTaxData =[];
						if(taxOnTaxConfig.length != 0){
							var taxDataConfig = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							var taxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
						}

						if (taxData.length != 0) {
							for (i = 0; i < taxData.length; i++) {
								var itemGrossAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data.item_code == taxData[i].item_code;
								});
								var itemGross = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
							var taxDataUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
							for(var index=0; index < taxDataUpdated.length; index++){
								for(var counter=0; counter < taxOnTaxData.length; counter++){
									if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
										var taxOnTaxUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
						
						var taxOnTaxConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
							return data.parent_code != "";
						});

						var taxOnTaxDataOverall =[];
						if(taxOnTaxConfigOverall.length != 0){
							var taxDataOverallConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
							var taxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
						}
						var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
							var taxDataOverallUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
							});
							for(var index=0; index < taxDataOverallUpdated.length; index++){
								for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
									if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
										var taxOnTaxUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

						var addlChargeData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});
						if (addlChargeData.length != 0) {
							for (i = 0; i < addlChargeData.length; i++) {
								var itemGrossAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
									return data.item_code == taxData[i].item_code;
								});
								var itemGross = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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

						var addlChargeDataUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});		
						if(addlChargeDataUpdated.length != 0){		
							for(var i=0; i < addlChargeDataUpdated.length; i++){	
								var addlTaxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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

						var addlChargeDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
						});
						if(addlChargeDataOverall.length != 0){
							var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
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
							
							var addlChargeDataUpdatedOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
								return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
							});		
								
							if(addlChargeDataUpdatedOverall.length != 0){	
								for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
									var addlTaxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
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
					
					
					
				}
				if(manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_category == "PO"){
					alert("Item detail is saved successfully.");
					return true;
				} else {
					alert("Equipment detail is saved successfully.");
					return true;
				}
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
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
		},
		custom : {
			customDelete : true
		}
	}
};