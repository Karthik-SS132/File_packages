var manage_rate_change_master_edit = {
	constructScreen : function () {
		if (manage_rate_change_master_edit.variable.custom.crudIndicator == "U" || manage_rate_change_master_edit.variable.custom.crudIndicator == "V") {
			manage_rate_change_master_edit.variable.custom.headerRecord = manage_rate_change_master_edit.variable.custom.selectedRecord;
		}
	},
	postConstruct : function (){
		if (manage_rate_change_master.variable.custom.crudIndicator == "U"){
			var keyValidation = manage_rate_change_master.variable.custom.datasource_1.data(); 
			var tempArray = [];
			for (var i = 0; i < keyValidation.length; i++) {  
				if ((keyValidation[i].rate_change_name == manage_rate_change_master.variable.custom.selectedRecord.rate_change_name) && (keyValidation[i].by_code_1 == manage_rate_change_master.variable.custom.selectedRecord.by_code_1) && (keyValidation[i].by_code_2 == manage_rate_change_master.variable.custom.selectedRecord.by_code_2) && (keyValidation[i].by_code_3 == manage_rate_change_master.variable.custom.selectedRecord.by_code_3) && (keyValidation[i].by_code_4 == manage_rate_change_master.variable.custom.selectedRecord.by_code_4) && (keyValidation[i].by_code_5 == manage_rate_change_master.variable.custom.selectedRecord.by_code_5) && (keyValidation[i].rate_change_on_field == manage_rate_change_master.variable.custom.selectedRecord.rate_change_on_field)) {
					if(keyValidation[i].rate_change_id != manage_rate_change_master.variable.custom.selectedRecord.rate_change_id){
						if(keyValidation[i].effective_to_date != ""){
							tempArray.push(keyValidation[i].effective_to_date);
						} else {
							tempArray.push(keyValidation[i].effective_from_date);
						}
					}
				}
			}
			if(tempArray.length != 0){
				var effectiveFromDateMin = new Date(tempArray.reduce(function (a, b) { return a > b ? a : b; }));
				effectiveFromDateMin.setDate(new Date(tempArray.reduce(function (a, b) { return a > b ? a : b; })).getDate()+1);
				var nextDate = new Date(); 
				nextDate.setDate(new Date().getDate() + 1);
				if(effectiveFromDateMin > nextDate){
					$("#manage_rate_change_master_edit_effective_from_date").data("kendoDatePicker").min(effectiveFromDateMin);
				} else {
					$("#manage_rate_change_master_edit_effective_from_date").data("kendoDatePicker").min(nextDate);
				}
			}
		}
	},
	initializeWidgets : function () {
		return true;
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp,
			inputparamDetail,
			detailRecordCounter;
			inputparamDetail = [];
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_rate_change_master.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_rate_change_master.variable.custom.selectedRecord.rec_tstamp;
			};
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
				p_custom_info_code : "item_rate_change",
				p_custom_info_ref_no1: "",
				p_custom_info_ref_no2: "",
				p_inputparam_header_xml : $("#manage_rate_change_master_edit_content_1").getInputparamXML({
					screenID : "manage_rate_change_master_edit"
				}),
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : manage_rate_change_master.variable.custom.crudIndicator,
				inputparam_detail : inputparamDetail
			});
			if (returnValue.update_status == "SP001") {
				alert("Rate Change Details saved successfully");
				return true;
			} else {
				alert("Saving of Rate Change Details Failed");
				return false;
			}
		}
	},
	customRequirementHandler : {
		baseValidation : function () {
			var keyValidation = manage_rate_change_master.variable.custom.datasource_1.data(); 
			for (var i = 0; i < keyValidation.length; i++) {  
				if ((keyValidation[i].rate_change_name == $("#manage_rate_change_master_edit_rate_change_name").getVal()) && (keyValidation[i].by_code_1 == $("#manage_rate_change_master_edit_by_code_1").getVal()) && (keyValidation[i].by_code_2 == $("#manage_rate_change_master_edit_by_code_2").getVal()) && (keyValidation[i].by_code_3 == $("#manage_rate_change_master_edit_by_code_3").getVal()) && (keyValidation[i].by_code_4 == $("#manage_rate_change_master_edit_by_code_4").getVal()) && (keyValidation[i].by_code_5 == $("#manage_rate_change_master_edit_by_code_5").getVal()) && (keyValidation[i].rate_change_on_field == $("#manage_rate_change_master_edit_rate_change_on_field").getVal())) { 
					alert("Data already Exists.");
					$("#manage_rate_change_master_edit_amt_or_perc_ind").setVal("");
					return false;
				}
			}
		}
	},
	widgetEventHandler : {
		amt_or_perc_ind_change : function (element, event) {
			if($("#manage_rate_change_master_edit_amt_or_perc_ind").getVal() == ""){
				$("#manage_rate_change_master_edit_amt_or_perc").setVal("");
			} else if($("#manage_rate_change_master_edit_amt_or_perc_ind").getVal() == "P"){
				$("#manage_rate_change_master_edit_amt_or_perc").data("kendoNumericTextBox").max("100");
				if($("#manage_rate_change_master_edit_amt_or_perc").getVal() > "100.00"){
					$("#manage_rate_change_master_edit_amt_or_perc").setVal("100");
				}
			} else {
				$("#manage_rate_change_master_edit_amt_or_perc").data("kendoNumericTextBox").max("9999999999")
			}
		},
		rate_change_on_field_change : function (element, event) {
			if($("#manage_rate_change_master_edit_rate_change_on_field").getVal() == "STDRATE"){
				$("#manage_rate_change_master_edit_amt_or_perc_ind").setVal("A");
			}
			if($("#manage_rate_change_master_edit_rate_change_on_field").getVal() == "PURCHASERATE"){
				$("#manage_rate_change_master_edit_amt_or_perc_ind").setVal("P");
			}
			var keyValidation = manage_rate_change_master.variable.custom.datasource_1.data(); 
			var tempArray = [];
			for (var i = 0; i < keyValidation.length; i++) {  
				if ((keyValidation[i].rate_change_name == $("#manage_rate_change_master_edit_rate_change_name").getVal()) && (keyValidation[i].by_code_1 == $("#manage_rate_change_master_edit_by_code_1").getVal()) && (keyValidation[i].by_code_2 == $("#manage_rate_change_master_edit_by_code_2").getVal()) && (keyValidation[i].by_code_3 == $("#manage_rate_change_master_edit_by_code_3").getVal()) && (keyValidation[i].by_code_4 == $("#manage_rate_change_master_edit_by_code_4").getVal()) && (keyValidation[i].by_code_5 == $("#manage_rate_change_master_edit_by_code_5").getVal()) && (keyValidation[i].rate_change_on_field == $("#manage_rate_change_master_edit_rate_change_on_field").getVal())) { 
					tempArray.push(keyValidation[i].effective_from_date);
					if(keyValidation[i].effective_to_date != ""){
						tempArray.push(keyValidation[i].effective_to_date);
					} else {
						tempArray.push(keyValidation[i].effective_from_date);
					}
				}
			}
			if(tempArray.length != 0){
				var effectiveFromDateMin = new Date(tempArray.reduce(function (a, b) { return a > b ? a : b; }));
				effectiveFromDateMin.setDate(new Date(tempArray.reduce(function (a, b) { return a > b ? a : b; })).getDate()+1);
				var nextDate = new Date(); 
				nextDate.setDate(new Date().getDate() + 1);
				if(effectiveFromDateMin > nextDate){
					$("#manage_rate_change_master_edit_effective_from_date").data("kendoDatePicker").min(effectiveFromDateMin);
				} else {
					$("#manage_rate_change_master_edit_effective_from_date").data("kendoDatePicker").min(nextDate);
				}
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
		custom : {}
	}
};