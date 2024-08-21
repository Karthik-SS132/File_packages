var manage_inventory_adjustment_edit_child = {
	constructScreen : function () {
		manage_inventory_adjustment_edit_child.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				outputPath : "context/outputparam",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'STOCKAVAILABILITYCHECK'</lov_code_type><search_field_1>#manage_inventory_adjustment_edit_child_item_code</search_field_1><search_field_2>#manage_inventory_adjustment_edit_child_item_variant_code</search_field_2><search_field_3>#manage_inventory_adjustment_edit_from_warehouse_id</search_field_3><search_field_4>#manage_inventory_adjustment_edit_child_uom</search_field_4></inputparam>"
				},
				screenID : "manage_inventory_adjustment_edit_child",
			});
		if (manage_inventory_adjustment_edit.variable.custom.crudIndicator == "U" || manage_inventory_adjustment_edit.variable.custom.crudIndicator == "V") {
			manage_inventory_adjustment_edit_child.variable.custom.header_1_record = manage_inventory_adjustment_edit.variable.custom.selectedRecord;
			manage_inventory_adjustment_edit_child.variable.custom.header_1_record.expiry_date_defaultValue = mserviceUtilities.getDateObject({
				dateString: manage_inventory_adjustment_edit_child.variable.custom.header_1_record.expiry_date,
				hourString: manage_inventory_adjustment_edit_child.variable.custom.header_1_record.expiry_hour,
				minuteString: manage_inventory_adjustment_edit_child.variable.custom.header_1_record.expiry_minute
			});
			manage_inventory_adjustment_edit_child.variable.custom.header_1_record.available_asset_id = [];
			if (((($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "IWT") || ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ISSUE")) && (manage_inventory_adjustment_edit_child.variable.custom.header_1_record.item_variant_code == "EQUIPMENT")) || (($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ADJ") && (manage_inventory_adjustment_edit_child.variable.custom.header_1_record.item_variant_code == "EQUIPMENT") && (manage_inventory_adjustment_edit_child.variable.custom.header_1_record.quantity < 0) && (manage_inventory_adjustment_edit_child.variable.custom.header_1_record.quantity != ""))){
				if (manage_inventory_adjustment_edit_child.variable.custom.header_1_record.asset_id != undefined) {
					if (typeof(manage_inventory_adjustment_edit_child.variable.custom.header_1_record.asset_id) == "string") {
						manage_inventory_adjustment_edit_child.variable.custom.header_1_record.available_asset_id = manage_inventory_adjustment_edit_child.variable.custom.header_1_record.asset_id.split(',');
					}
				}
			};
		}
	},
	postConstruct : function () {
		if (manage_inventory_adjustment_edit.variable.custom.crudIndicator == "A") {
			$("#manage_inventory_adjustment_edit_child_expiry_date").setMin(new Date());
		};
		if (login_profile.item_variant_ind == "0") {
			$("#manage_inventory_adjustment_edit_child_item_variant_code_group").hide();
		};
		if($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() != "ADJ"){
			manage_inventory_adjustment_edit_child.variable.custom.qty_consumed.min("1");
		};
		if ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() != "RECPT") {
			manage_inventory_adjustment_edit_child.customRequirementHandler.stockOnHand();
		};
	},
	initializeWidgets : function () {
		$("#manage_inventory_adjustment_edit_child_item_code").initializeWSearchbox({
			screenID : "manage_inventory_adjustment_edit_child",
			dataSource : {
				informationType : "'ITEMCODE_LIST'",
				searchField1 : "$manage_inventory_adjustment_edit_child.variable.custom.item_code_serverFilterValue",
				searchField2 : "$manage_inventory_adjustment_edit_child.variable.custom.itemIndicator"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			minLength : 2,
			childFieldID : "manage_inventory_adjustment_edit_child_item_variant_code, manage_inventory_adjustment_edit_child_uom, manage_inventory_adjustment_edit_child_available_asset_id",
			defaultValue : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.item_code",
			defaultValueDescription : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.item_code_description"
		});
		manage_inventory_adjustment_edit_child.variable.custom.item_variant_code = $("#manage_inventory_adjustment_edit_child_item_variant_code").initializeWDropdownlist({
			screenID : "manage_inventory_adjustment_edit_child",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_inventory_adjustment_edit_child_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			childFieldID : "manage_inventory_adjustment_edit_child_uom, manage_inventory_adjustment_edit_child_available_asset_id",
			defaultValue : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.item_variant_code",
			defaultValueDescription : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.item_variant_code_description"
		});
		$("#manage_inventory_adjustment_edit_child_uom").initializeWDropdownlist({
			screenID : "manage_inventory_adjustment_edit_child",
			dataSource : {
				informationType : "'ITEMUOM_LIST_LINKED'",
				searchField1 : "#manage_inventory_adjustment_edit_child_item_code",
				searchField2 : "#manage_inventory_adjustment_edit_child_item_variant_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.uom_code",
			defaultValueDescription : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.uom_code_description"
		});
		manage_inventory_adjustment_edit_child.variable.custom.qty_consumed = $("#manage_inventory_adjustment_edit_child_quantity").initializeWNumerictextbox({
			screenID : "manage_inventory_adjustment_edit_child",
			format : "n0",
			maximum : "'9999999999'",
			defaultValue : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.quantity"
		});
		$("#manage_inventory_adjustment_edit_child_purchase_rate").initializeWNumerictextbox({
			screenID : "manage_inventory_adjustment_edit_child",
			format : "n2",
			maximum : "'9999999999'",
			minimum : "'0'",
			defaultValue : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.unit_rate"
		});
		$("#manage_inventory_adjustment_edit_child_lot_batch_no").initializeWTextbox({
			screenID : "manage_inventory_adjustment_edit_child",
			maxlength : "30",
			defaultValue : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.lot_batch_no"
		});
		$("#manage_inventory_adjustment_edit_child_expiry_date").initializeWDatepicker({
			screenID : "manage_inventory_adjustment_edit_child",
			defaultValue : "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.expiry_date_defaultValue"
		});
		$("#manage_inventory_adjustment_edit_child_asset_id").initializeWTextbox({
			screenID : "manage_inventory_adjustment_edit_child",
			defaultValue: "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.asset_id"
		});
		manage_inventory_adjustment_edit_child.variable.custom.available_asset_id = $("#manage_inventory_adjustment_edit_child_available_asset_id").initializeWMultiselect({
			screenID: "manage_inventory_adjustment_edit_child",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'STOCK_ASSET_LIST'</lov_code_type><search_field_1>#manage_inventory_adjustment_edit_child_item_code</search_field_1><search_field_2>#manage_inventory_adjustment_edit_child_item_variant_code</search_field_2><search_field_3>#manage_inventory_adjustment_edit_from_warehouse_id</search_field_3></inputparam>"
				},
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			defaultValue: "$manage_inventory_adjustment_edit_child.variable.custom.header_1_record.available_asset_id"
		});
	},
	customRequirementHandler : {
		stockOnHand : function () {
			if ($("#manage_inventory_adjustment_edit_child_item_code").getVal() != "" && $("#manage_inventory_adjustment_edit_child_item_variant_code").getVal() != "" && $("#manage_inventory_adjustment_edit_child_uom").getVal() != "") {
				manage_inventory_adjustment_edit_child.variable.custom.datasource_1.read();
				if (manage_inventory_adjustment_edit_child.variable.custom.datasource_1.data().length == 0) {
					$('.display_description[data-for = "manage_inventory_adjustment_edit_child_quantity"]').text("Stock On Hand : 0");
					manage_inventory_adjustment_edit_child.variable.custom.qty_consumed.max("0");
					manage_inventory_adjustment_edit_child.variable.custom.qty_consumed.min("0");
					if ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ADJ") {
						manage_inventory_adjustment_edit_child.variable.custom.qty_consumed.max("9999999999");
					}
					if ((($("#manage_inventory_adjustment_edit_child_quantity").getVal() > 0) && ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() != "ADJ")) || ($("#manage_inventory_adjustment_edit_child_quantity").getVal() < 0)) {
						setTimeout(function(){
							$("#manage_inventory_adjustment_edit_child_quantity").setVal("0");
						}, 100);
					}
				} else {
					manage_inventory_adjustment_edit_child.variable.custom.stock_availability = manage_inventory_adjustment_edit_child.variable.custom.datasource_1.data();
					if ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ADJ") {
						$('.display_description[data-for = "manage_inventory_adjustment_edit_child_quantity"]').text("Stock On Hand : " + parseInt(manage_inventory_adjustment_edit_child.variable.custom.stock_availability[0].code));
						manage_inventory_adjustment_edit_child.variable.custom.qty_consumed.min((-1) * manage_inventory_adjustment_edit_child.variable.custom.stock_availability[0].code);
						if ($("#manage_inventory_adjustment_edit_child_quantity").getVal() < ((-1) * manage_inventory_adjustment_edit_child.variable.custom.stock_availability[0].code)) {
							$("#manage_inventory_adjustment_edit_child_quantity").setVal((-1) * manage_inventory_adjustment_edit_child.variable.custom.stock_availability[0].code);
						}
					} else {
						$('.display_description[data-for = "manage_inventory_adjustment_edit_child_quantity"]').text("Stock On Hand : " + parseInt(manage_inventory_adjustment_edit_child.variable.custom.stock_availability[0].code));
						manage_inventory_adjustment_edit_child.variable.custom.qty_consumed.max(manage_inventory_adjustment_edit_child.variable.custom.stock_availability[0].code);
						if ($("#manage_inventory_adjustment_edit_child_quantity").getVal() > manage_inventory_adjustment_edit_child.variable.custom.stock_availability[0].code) {
							$("#manage_inventory_adjustment_edit_child_quantity").setVal(manage_inventory_adjustment_edit_child.variable.custom.stock_availability[0].code);
						}
					}
				}
			} else {
				$('.display_description[data-for = "manage_inventory_adjustment_edit_child_quantity"]').text("");
				manage_inventory_adjustment_edit_child.variable.custom.qty_consumed.max("9999999999");
				if (($("#manage_inventory_adjustment_edit_child_quantity").getVal() > 0) || ($("#manage_inventory_adjustment_edit_child_quantity").getVal() < 0))  {
					setTimeout(function(){
						$("#manage_inventory_adjustment_edit_child_quantity").setVal("0");
					}, 100);
				}
			}
		},
		dataValidation : function () {
			var keyValidation = manage_inventory_adjustment_edit.variable.custom.datasource_1.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].item_code == $("#manage_inventory_adjustment_edit_child_item_code").getVal() && keyValidation[i].item_variant_code == $("#manage_inventory_adjustment_edit_child_item_variant_code").getVal() && keyValidation[i].uom_code == $("#manage_inventory_adjustment_edit_child_uom").getVal()) {
					alert("Data already exists.");
					$("#manage_inventory_adjustment_edit_child_uom").setVal("");
				}
			}
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			manage_inventory_adjustment_edit_child.customRequirementHandler.dataValidation();
			if ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() != "RECPT") {
				manage_inventory_adjustment_edit_child.customRequirementHandler.stockOnHand();
			};
			if ($("#manage_inventory_adjustment_edit_child_item_code").getVal() == "") {
				setTimeout(function(){
					$("#manage_inventory_adjustment_edit_child_quantity").setVal("0");
				}, 100);
			};
		},
		item_variant_code_change : function (element, event) {
			manage_inventory_adjustment_edit_child.customRequirementHandler.dataValidation();
			if ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() != "RECPT") {
				manage_inventory_adjustment_edit_child.customRequirementHandler.stockOnHand();
			};
		},
		uom_change : function (element, event) {
			manage_inventory_adjustment_edit_child.customRequirementHandler.dataValidation();
			if ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() != "RECPT") {
				manage_inventory_adjustment_edit_child.customRequirementHandler.stockOnHand();
			};
		},
		quantity_change : function (element, event) {
			if ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() != "RECPT") {
				manage_inventory_adjustment_edit_child.customRequirementHandler.stockOnHand();
			};
			if (((($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "IWT") || ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ISSUE")) && ($("#manage_inventory_adjustment_edit_child_item_variant_code").getVal() == "EQUIPMENT")) || (($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ADJ") && ($("#manage_inventory_adjustment_edit_child_item_variant_code").getVal() == "EQUIPMENT") && ($("#manage_inventory_adjustment_edit_child_quantity").getVal() < 0) && ($("#manage_inventory_adjustment_edit_child_quantity").getVal() != ""))){
				var assetIdList = $("#manage_inventory_adjustment_edit_child_available_asset_id").getVal();
				var assetIdArray = $.grep(assetIdList,function(data) {
							return data != "";
						});
				if (assetIdArray.length > Math.abs($("#manage_inventory_adjustment_edit_child_quantity").getVal())) {
					assetIdArray.pop();
					$("#manage_inventory_adjustment_edit_child_available_asset_id").setVal(assetIdArray);
				}
			};
		},
		available_asset_id_change: function (element, event) {
			if (((($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "IWT") || ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ISSUE")) && ($("#manage_inventory_adjustment_edit_child_item_variant_code").getVal() == "EQUIPMENT")) || (($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ADJ") && ($("#manage_inventory_adjustment_edit_child_item_variant_code").getVal() == "EQUIPMENT") && ($("#manage_inventory_adjustment_edit_child_quantity").getVal() < 0) && ($("#manage_inventory_adjustment_edit_child_quantity").getVal() != ""))){
				var assetIdList = $("#manage_inventory_adjustment_edit_child_available_asset_id").getVal();
				var assetIdArray = $.grep(assetIdList,function(data) {
							return data != "";
						});
				if (assetIdArray.length > Math.abs($("#manage_inventory_adjustment_edit_child_quantity").getVal())) {
					assetIdArray.pop();
					alert("Selection restricted to choosen quantity.");
					$("#manage_inventory_adjustment_edit_child_available_asset_id").setVal(assetIdArray);
				}
			};
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var lotBatchNumber;
			if ($("#manage_inventory_adjustment_edit_child_lot_batch_no").getVal() == "") {
				lotBatchNumber = "NA";
			} else {
				lotBatchNumber = $("#manage_inventory_adjustment_edit_child_lot_batch_no").getVal();
			};
			if ($("#manage_inventory_adjustment_edit_child_quantity").getVal() == 0) {
				alert("Quantity should not be zero.");
				return false;
			};
			if (($("#manage_inventory_adjustment_edit_child_quantity").getVal() != "") && ($("#manage_inventory_adjustment_edit_child_quantity").getVal() > 0) && $("#manage_inventory_adjustment_edit_child_asset_id").getVal() != ""){
				var splitArray = $("#manage_inventory_adjustment_edit_child_asset_id").getVal().split(",");
				if(($("#manage_inventory_adjustment_edit_child_quantity").getVal() == splitArray.length) || ($("#manage_inventory_adjustment_edit_child_quantity").getVal() < splitArray.length)){
					var array = []; 
					for(index=0 ; index < parseInt($("#manage_inventory_adjustment_edit_child_quantity").getVal()); index++){ 
						array.push(splitArray[index]); 
					}
					$("#manage_inventory_adjustment_edit_child_asset_id").setVal(array.toString());
				} else if($("#manage_inventory_adjustment_edit_child_quantity").getVal() > splitArray.length){
					alert("Enter Machine Serial Numbers for the choosen quantity.");
					return false;
				}
			};
			if (((($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "IWT") || ($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ISSUE")) && ($("#manage_inventory_adjustment_edit_child_item_variant_code").getVal() == "EQUIPMENT")) || (($("#manage_inventory_adjustment_edit_adj_txn_category").getVal() == "ADJ") && ($("#manage_inventory_adjustment_edit_child_item_variant_code").getVal() == "EQUIPMENT") && ($("#manage_inventory_adjustment_edit_child_quantity").getVal() < 0) && ($("#manage_inventory_adjustment_edit_child_quantity").getVal() != ""))){
				var assetIdList = $("#manage_inventory_adjustment_edit_child_available_asset_id").getVal();
				var assetIdArray = $.grep(assetIdList,function(data) {
							return data != "";
						});
				if ((assetIdArray.length != Math.abs($("#manage_inventory_adjustment_edit_child_quantity").getVal())) && ($("#manage_inventory_adjustment_edit_from_warehouse_id").getVal() != "")) {
					alert("Select Machine Serial Numbers for the chosen quantity.");
					return false;
				}
				$("#manage_inventory_adjustment_edit_child_asset_id").setVal($.grep($("#manage_inventory_adjustment_edit_child_available_asset_id").getVal(),function(data) { return data != ""; }).join());
			};
			if (manage_inventory_adjustment_edit.variable.custom.crudIndicator == "A"){
				var inputObject = JSON.parse($("#manage_inventory_adjustment_edit_child_content_1").getInputparamJSON({
					screenID : "manage_inventory_adjustment_edit_child",
					matchCondition : ["manage_inventory_adjustment_edit_child_udf","manage_inventory_adjustment_edit_child_product_udf"]
				}));
				inputObject.item_code = $("#manage_inventory_adjustment_edit_child_item_code").getVal();
				inputObject.item_code_description = mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_inventory_adjustment_edit_child_item_code").getVal(), "");
				inputObject.item_variant_code = $("#manage_inventory_adjustment_edit_child_item_variant_code").getVal();
				inputObject.item_variant_code_description = mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_inventory_adjustment_edit_child_item_variant_code").getVal(), "");
				inputObject.quantity = $("#manage_inventory_adjustment_edit_child_quantity").getVal().toString();
				inputObject.uom_code = $("#manage_inventory_adjustment_edit_child_uom").getVal();
				inputObject.uom_code_description = mserviceUtilities.getDescriptionForCode("ITEMUOM_LIST", $("#manage_inventory_adjustment_edit_child_uom").getVal(), "");
				inputObject.lot_batch_no = lotBatchNumber;
				inputObject.expiry_date = mserviceUtilities.getDateString($("#manage_inventory_adjustment_edit_child_expiry_date").getVal(), "yyyy-MM-dd");
				inputObject.expiry_hour = mserviceUtilities.getDateString($("#manage_inventory_adjustment_edit_child_expiry_date").getVal(), "HH");
				inputObject.expiry_minute = mserviceUtilities.getDateString($("#manage_inventory_adjustment_edit_child_expiry_date").getVal(), "mm");
				inputObject.unit_rate = $("#manage_inventory_adjustment_edit_child_purchase_rate").getVal();
				inputObject.currency_code = login_profile.currency_code;
				inputObject.asset_id = $("#manage_inventory_adjustment_edit_child_asset_id").getVal();
				inputObject.last_update_timestamp = "00000000-0000-0000-0000-000000000000";
				manage_inventory_adjustment_edit.variable.custom.grid_1.dataSource.add(inputObject);
				return true;
			} else {
				var inputObject = JSON.parse($("#manage_inventory_adjustment_edit_child_content_1").getInputparamJSON({
					screenID : "manage_inventory_adjustment_edit_child",
					matchCondition : ["manage_inventory_adjustment_edit_child_udf","manage_inventory_adjustment_edit_child_product_udf"]
				}));
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("item_code", $("#manage_inventory_adjustment_edit_child_item_code").getVal());
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("item_code_description", mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_inventory_adjustment_edit_child_item_code").getVal(), ""));
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("item_variant_code", $("#manage_inventory_adjustment_edit_child_item_variant_code").getVal());
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("item_variant_code_description", mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_inventory_adjustment_edit_child_item_variant_code").getVal(), ""));
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("quantity", $("#manage_inventory_adjustment_edit_child_quantity").getVal().toString());
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("uom_code", $("#manage_inventory_adjustment_edit_child_uom").getVal());
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("uom_code_description", mserviceUtilities.getDescriptionForCode("ITEMUOM_LIST", $("#manage_inventory_adjustment_edit_child_uom").getVal(), ""));
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("lot_batch_no", lotBatchNumber);
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("expiry_date", mserviceUtilities.getDateString($("#manage_inventory_adjustment_edit_child_expiry_date").getVal(), "yyyy-MM-dd"));
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("expiry_hour", mserviceUtilities.getDateString($("#manage_inventory_adjustment_edit_child_expiry_date").getVal(), "HH"));
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("expiry_minute", mserviceUtilities.getDateString($("#manage_inventory_adjustment_edit_child_expiry_date").getVal(), "mm"));
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("unit_rate", $("#manage_inventory_adjustment_edit_child_purchase_rate").getVal());
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("currency_code", login_profile.currency_code);
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("asset_id", $("#manage_inventory_adjustment_edit_child_asset_id").getVal());
				manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set("last_update_timestamp", manage_inventory_adjustment_edit_child.variable.custom.header_1_record.last_update_timestamp);
				for(key in inputObject) { 
					manage_inventory_adjustment_edit_child.variable.custom.header_1_record.set(key,inputObject[key]);
				}
				return true;
			}
		}
	},
	variable : {
		standard : {
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			]
		},
		custom : {
			itemIndicator : ""
		}
	}
};