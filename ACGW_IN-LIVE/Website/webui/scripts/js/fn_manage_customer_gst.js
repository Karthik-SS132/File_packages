var manage_customer_gst = {
	constructScreen : function () {
		manage_customer_gst.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_custom_info_detail",
			outputPath : false,
			api : true,
			pageSize : 10,
			inputParameter : {
				p_custom_info_code : "'customer_specific_gst'",
				p_custom_info_ref_no1 : "$manage_customer_location.variable.custom.selectedRecord.customer_id",
				p_custom_info_ref_no2 : "$manage_customer_location.variable.custom.selectedRecord.city"
			},
			schemaModel : true,
			screenID : "manage_customer_gst",
			dataSourceName : "datasource_1",
			processResponse : true,
			parse : manage_customer_gst.customRequirementHandler.customInfoDetail
		});
		manage_customer_gst.variable.custom.datasource_1.read();
	},
	initializeWidgets : function () {
		$("#manage_customer_gst_customer_id").initializeWTextbox({
			screenID : "manage_customer_gst",
			maxlength : "15",
			defaultValue : "$manage_customer_location.variable.custom.selectedRecord.customer_id"
		});
		$("#manage_customer_gst_customer_name").initializeWTextbox({
			screenID : "manage_customer_gst",
			maxlength : "100",
			defaultValue : "$manage_customer_location.variable.custom.selectedRecord.customer_id_description"
		});
		$("#manage_customer_gst_customer_location").initializeWTextbox({
			screenID : "manage_customer_gst",
			maxlength : "100",
			defaultValue : "$manage_customer_location.variable.custom.selectedRecord.city"
		});
		manage_customer_gst.variable.custom.tabstrip = $("#manage_customer_gst_tabstrip").kendoTabStrip({
			animation : {
				open : {
					effects : "fadeIn"
				},
			},
		}).data("kendoTabStrip");
		manage_customer_gst.variable.custom.grid_1 = $("#manage_customer_gst_grid_1").initializeWGrid({
			screenID : "manage_customer_gst",
			toolbar : "#manage_customer_gst_grid_1_toolbar_template",
			dataSource : manage_customer_gst.variable.custom.datasource_1,
			height : 400,
			pageSize : 10,
			filterable : false,
		});
		manage_customer_gst.variable.custom.grid_1.refresh();
	},
	refreshScreen : function () {
		manage_customer_gst.variable.custom.grid_1.refresh();
		if(manage_customer_gst.variable.custom.crudIndicator != "D"){
			manage_customer_gst.variable.custom.grid_1.dataSource.pageSize(10);
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if(manage_customer_gst.variable.custom.crudIndicator == "D"){
				if (manage_customer_gst.variable.custom.selectedRecord != undefined) {
					manage_customer_gst.variable.custom.grid_1.dataSource.remove(manage_customer_gst.variable.custom.selectedRecord);
				}		
				for (var index = 0; index < manage_customer_gst.variable.custom.grid_1.dataSource.data().length; index++) {
					manage_customer_gst.variable.custom.grid_1.dataSource.data()[index].set("item_sl_no", (index + 1).toString());
				}		
			} else if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_gst_edit.js", "../../s_iscripts/custominfo_setDetail.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_customer_gst",
					fieldID : "manage_customer_gst_edit_window",
					nextScreenID : "manage_customer_gst_edit",
					nextScreenName : manage_customer_gst.variable.custom.nextScreenName,
					execute : manage_customer_gst_edit.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp,
			inputparamDetail,
			detailRecordCounter;
			inputparamDetail = [];
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_customer_gst.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_customer_gst.variable.custom.selectedRecord.last_update_timestamp;
			};
			for (detailRecordCounter = 0; detailRecordCounter < manage_customer_gst.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
				inputparamDetail.push({
					p_sl_no : (detailRecordCounter + 1).toString(),
					p_inputparam_detail_xml : "<item_code>" + WebAPIProxy.XMLEncode(manage_customer_gst.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_code) + "</item_code><item_variant_code>" + WebAPIProxy.XMLEncode(manage_customer_gst.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_variant_code) + "</item_variant_code><item_hsn_code>" + WebAPIProxy.XMLEncode(manage_customer_gst.variable.custom.grid_1.dataSource.data()[detailRecordCounter].hsn_code) + "</item_hsn_code><charge_code>" + WebAPIProxy.XMLEncode(manage_customer_gst.variable.custom.grid_1.dataSource.data()[detailRecordCounter].charge_code) + "</charge_code><item_description>" + WebAPIProxy.XMLEncode(manage_customer_gst.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_description) + "</item_description><variant_description>" + WebAPIProxy.XMLEncode(manage_customer_gst.variable.custom.grid_1.dataSource.data()[detailRecordCounter].variant_description) + "</variant_description>" ,
					p_crud_ind : "U"
				});
			};
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
				p_custom_info_code : "customer_specific_gst",
				p_custom_info_ref_no1: WebAPIProxy.XMLEncode($("#manage_customer_gst_customer_id").getVal()),
				p_custom_info_ref_no2: WebAPIProxy.XMLEncode($("#manage_customer_gst_customer_location").getVal()),
				p_inputparam_header_xml : "<customer_id>" + WebAPIProxy.XMLEncode($("#manage_customer_gst_customer_id").getVal()) + "</customer_id><customer_name>" + WebAPIProxy.XMLEncode($("#manage_customer_gst_customer_id").getVal()) + "</customer_name><customer_location>" + WebAPIProxy.XMLEncode($("#manage_customer_gst_customer_location").getVal()) + "</customer_location>",
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : "U",
				inputparam_detail : inputparamDetail
			});
			if (returnValue.update_status == "SP001") {
				alert("Customer GST Details saved successfully");
				return true;
			} else {
				alert("Saving of Customer GST Details Failed");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function (element, event) {
			manage_customer_gst.variable.custom.selectedRecord = manage_customer_gst.variable.custom.grid_1.dataSource.getByUid(manage_customer_gst.variable.custom.grid_1.select().data("uid"));
		},
		customInfoDetail : function (response) {
			var parseResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					if(response.outputparam_header.p_custom_info_header_json != ""){
						manage_customer_gst.variable.custom.header_1_record = JSON.parse(response.outputparam_header.p_custom_info_header_json);
					}
					if (response.outputparam_detail != undefined) {
						if (response.outputparam_detail.length != undefined) {
							var detailInfo = response.outputparam_detail ; 
							parseResponse = [];
							for (index = 0; index < detailInfo.length; index++) {
								for (key in detailInfo[index]) {
									parseResponse.push(JSON.parse(detailInfo[index][key]));
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
			if(parseResponse.length == 0){
				alert("No records found.");
			};
			return parseResponse;
		}
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
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_customer_gst_grid_1",
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