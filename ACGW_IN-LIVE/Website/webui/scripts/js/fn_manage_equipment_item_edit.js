var manage_equipment_item_edit = {
	constructScreen : function () {
		if (manage_equipment_item.variable.custom.crudIndicator == "U" || manage_equipment_item.variable.custom.crudIndicator == "V") {
			manage_equipment_item_edit.variable.custom.headerRecord = manage_equipment_item.variable.custom.selectedRecord;
			manage_equipment_item_edit.variable.custom.equipment_category_defaultValueDescription = mserviceUtilities.getDescriptionForCode("EQUIPMENTCATEGORY_LIST", manage_equipment_item_edit.variable.custom.headerRecord.equipment_category, "");
			manage_equipment_item_edit.variable.custom.equipment_type_defaultValueDescription = mserviceUtilities.getDescriptionForCode("EQUIPMENTTYPE_LIST", manage_equipment_item_edit.variable.custom.headerRecord.equipment_type, "");
			manage_equipment_item_edit.variable.custom.equipment_id_defaultValueDescription = mserviceUtilities.getDescriptionForCode("EQUIPMENID_LIST", manage_equipment_item_edit.variable.custom.headerRecord.equipment_id, "");
			manage_equipment_item_edit.variable.custom.item_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", manage_equipment_item_edit.variable.custom.headerRecord.item_code, "");
			manage_equipment_item_edit.variable.custom.variant_description = mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST_LINKED", manage_equipment_item_edit.variable.custom.headerRecord.variant_code, "");
		}
	},
	postConstruct : function () {
		if(login_profile.item_variant_ind == "0"){
			$("#manage_equipment_item_edit_item_variant_code_group").hide();
		} else {
			$("#manage_equipment_item_edit_item_variant_code_group").show();
		}
	},
	initializeWidgets : function () {
		$("#manage_equipment_item_edit_equipment_category").initializeWDropdownlist({
			screenID : "manage_equipment_item_edit",
			dataSource : {
				informationType : "'EQUIPMENTCATEGORY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_equipment_item_edit.variable.custom.headerRecord.equipment_category",
			defaultValueDescription : "$manage_equipment_item_edit.variable.custom.equipment_category_defaultValueDescription",
			childFieldID : "manage_equipment_item_edit_equipment_type"
		});
		$("#manage_equipment_item_edit_equipment_type").initializeWDropdownlist({
			screenID : "manage_equipment_item_edit",
			dataSource : {
				informationType : "'EQUIPMENTTYPE_LIST'",
				searchField1 : "#manage_equipment_item_edit_equipment_category"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_equipment_item_edit.variable.custom.headerRecord.equipment_type",
			defaultValueDescription : "$manage_equipment_item_edit.variable.custom.equipment_type_defaultValueDescription",
			childFieldID : "manage_equipment_item_edit_equipment_id"
		});
		$("#manage_equipment_item_edit_equipment_id").initializeWDropdownlist({
			screenID : "manage_equipment_item_edit",
			dataSource : {
				informationType : "'EQUIPMENID_LIST'",
				searchField1 : "#manage_equipment_item_edit_equipment_type"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_equipment_item_edit.variable.custom.headerRecord.equipment_id",
			defaultValueDescription : "$manage_equipment_item_edit.variable.custom.equipment_id_defaultValueDescription",
		});
		$("#manage_equipment_item_edit_item_code").initializeWSearchbox({
			screenID : "manage_equipment_item_edit",
			dataSource : {
				informationType : "'ITEMCODE_LIST_WO_SPARE'",
				searchField1 : "$manage_equipment_item_edit.variable.custom.item_code_serverFilterValue"
			},
			dataTextField : "description",
			dataValueField : "code",
			minLength : 2,
			serverFiltering : true,
			childFieldID : "manage_equipment_item_edit_item_variant_code,manage_equipment_item_edit_uom_code,manage_equipment_item_edit_link_type",
			defaultValue : "$manage_equipment_item_edit.variable.custom.headerRecord.item_code",
			defaultValueDescription : "$manage_equipment_item_edit.variable.custom.item_code_defaultValueDescription",
		});
		$("#manage_equipment_item_edit_item_variant_code").initializeWDropdownlist({
			screenID : "manage_equipment_item_edit",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_equipment_item_edit_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			childFieldID : "manage_equipment_item_edit_uom_code,manage_equipment_item_edit_link_type",
			defaultValue : "$manage_equipment_item_edit.variable.custom.headerRecord.variant_code",
			defaultValueDescription : "$manage_equipment_item_edit.variable.custom.headerRecord.variant_description",
		});
		$("#manage_equipment_item_edit_link_type").initializeWCombobox({
			screenID : "manage_equipment_item_edit",
			dataSource : {
				informationType : "'EQITLNKTYPE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_equipment_item_edit.variable.custom.headerRecord.link_type",
			defaultValueDescription : "$manage_equipment_item_edit.variable.custom.item_type_defaultValueDescription",
		});
		$("#manage_equipment_item_edit_item_quantity_per").initializeWNumerictextbox({
			screenID : "manage_equipment_item_edit",
			format : "n2",
			minimum : "'1'",
			defaultValue : "$manage_equipment_item_edit.variable.custom.headerRecord.item_quantity_per",
		});
		$("#manage_equipment_item_edit_uom_code").initializeWDropdownlist({
			screenID : "manage_equipment_item_edit",
			dataSource : {
				informationType : "'GET_ITEM_UOM'",
				searchField1 : "#manage_equipment_item_edit_item_code",
				searchField2 : "#manage_equipment_item_edit_item_variant_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_equipment_item_edit.variable.custom.headerRecord.uom_code",
			defaultValueDescription : "$manage_equipment_item_edit.variable.custom.headerRecord.uom_code_description",
		});
	},
	customRequirementHandler : {
		partValidation : function () {
			var keyValidation = manage_equipment_item.variable.custom.grid_1.dataSource.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].equipment_id == $("#manage_equipment_item_edit_equipment_id").getVal() && keyValidation[i].item_code == $("#manage_equipment_item_edit_item_code").getVal() && keyValidation[i].link_type == $("#manage_equipment_item_edit_link_type").getVal()) 
				{
					alert("Equipment-Item-Link already exists.");
					$("#manage_equipment_item_edit_equipment_id").setVal("");
					$("#manage_equipment_item_edit_item_code").setVal("");
					$("#manage_equipment_item_edit_link_type").setVal("");
				}
			}
		},
		setSelectedRecord : function (element, event) {
			manage_equipment_item_edit.variable.custom.selectedRecord = manage_equipment_item_edit.variable.custom.grid_1.dataSource.getByUid(manage_equipment_item_edit.variable.custom.grid_1.select().data("uid"));
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			manage_equipment_item_edit.customRequirementHandler.partValidation();
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp,
			inputparamDetail,
			detailRecordCounter;
			inputparamDetail = [];
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_equipment_item.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_equipment_item.variable.custom.selectedRecord.rec_tstamp;
			};
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
				p_custom_info_code : "equipment_item_link",
				p_custom_info_ref_no1: WebAPIProxy.XMLEncode($("#manage_equipment_item_edit_equipment_id").getVal()),
				p_custom_info_ref_no2: WebAPIProxy.XMLEncode($("#manage_equipment_item_edit_item_code").getVal()),
				p_inputparam_header_xml : "<inputparam><equipment_category>" + WebAPIProxy.XMLEncode($("#manage_equipment_item_edit_equipment_category").getVal()) + "</equipment_category><equipment_type>" + WebAPIProxy.XMLEncode($("#manage_equipment_item_edit_equipment_type").getVal()) + "</equipment_type><equipment_id>" + WebAPIProxy.XMLEncode($("#manage_equipment_item_edit_equipment_id").getVal())  + "</equipment_id><item_code>" + WebAPIProxy.XMLEncode($("#manage_equipment_item_edit_item_code").getVal()) + "</item_code><item_variant_code>" + WebAPIProxy.XMLEncode($("#manage_equipment_item_edit_item_variant_code").getVal()) + "</item_variant_code><item_description>" + WebAPIProxy.XMLEncode(mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_equipment_item_edit_item_code").getVal(), "")) + "</item_description ><variant_description>" +  WebAPIProxy.XMLEncode(mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_equipment_item_edit_item_variant_code").getVal(), "")) + "</variant_description ><link_type>" + WebAPIProxy.XMLEncode($("#manage_equipment_item_edit_link_type").getVal()) + "</link_type><uom_code>" + WebAPIProxy.XMLEncode($("#manage_equipment_item_edit_uom_code").getVal())  + "</uom_code><item_quantity_per>" + $("#manage_equipment_item_edit_item_quantity_per").getVal() +"</item_quantity_per></inputparam>",
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : manage_equipment_item.variable.custom.crudIndicator,
				inputparam_detail : inputparamDetail
			});
			if (returnValue.update_status == "SP001") {
				alert("Equipment-Item saved successfully");
				return true;
			} else {
				alert("Saving Equipment-Item Failed");
				return true;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			valueChangeIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			customDelete : true
		}
	}
};