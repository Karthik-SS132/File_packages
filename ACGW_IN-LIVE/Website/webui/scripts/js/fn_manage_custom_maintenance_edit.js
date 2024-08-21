var manage_custom_maintenance_edit = {
	constructScreen : function () {
		manage_custom_maintenance_edit.variable.custom.serial_number = 0;
		manage_custom_maintenance_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_custom_info_detail",
			outputPath : false,
			api : true,
			pageSize : 10,
			inputParameter : {
				p_custom_info_code : "webWidgetInitializer.variable.customMainParam.replace('manage_custom_maintenance_','')",
				p_custom_info_ref_no1 : "$manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no",
				p_custom_info_ref_no2 : "''"
			},
			schemaModel : true,
			screenID : "manage_custom_maintenance_edit",
			dataSourceName : "datasource_1",
			processResponse : true,
			parse : manage_custom_maintenance_edit.customRequirementHandler.customInfoDetail
		});
		if (manage_custom_maintenance.variable.custom.crudIndicator == "U" || manage_custom_maintenance.variable.custom.crudIndicator == "V") {
			manage_custom_maintenance_edit.variable.custom.datasource_1.read();
		}
	},
	postConstruct : function () {
		$("#manage_custom_maintenance_edit_content_1").css("width","100%");
		$("#manage_custom_maintenance_edit_content_1").find('dd.value').css("width","15%");
		$("#manage_custom_maintenance_edit_content_1").find('dt').css("width","15%");
		if (webWidgetInitializer.variable.customMainParam == "manage_custom_maintenance_customer_survey" ){
			$('#manage_custom_maintenance_edit_detail_1').hide();
		}
	},
	initializeWidgets : function () {
		manage_custom_maintenance_edit.variable.custom.grid_1 = $("#manage_custom_maintenance_edit_grid_1").initializeWGrid({
			screenID : "manage_custom_maintenance_edit",
			toolbar : "#manage_custom_maintenance_edit_grid_1_toolbar_template",
			dataSource : manage_custom_maintenance_edit.variable.custom.datasource_1,
			height : 400,
			pageSize : 10,
			filterable : false,
		});
		manage_custom_maintenance_edit.variable.custom.grid_1.refresh();
		manage_custom_maintenance_edit.variable.custom.serial_number = 0;
	},
	refreshScreen : function () {
		manage_custom_maintenance_edit.variable.custom.grid_1.refresh();
		if(manage_custom_maintenance_edit.variable.custom.crudIndicator != "D"){
			manage_custom_maintenance_edit.variable.custom.serial_number = 0;
			manage_custom_maintenance_edit.variable.custom.grid_1.dataSource.pageSize(10);
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if(manage_custom_maintenance_edit.variable.custom.crudIndicator == "D"){
				manage_custom_maintenance_edit.variable.custom.serial_number = 0;
				manage_custom_maintenance_edit.variable.custom.grid_1.dataSource.remove(manage_custom_maintenance_edit.variable.custom.selectedRecord);
				alert("Data deleted successfully.");
			}
			else if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_custom_maintenance_edit_child.js"])) {
				if(manage_custom_maintenance_edit.variable.custom.crudIndicator == "A"){
					manage_custom_maintenance_edit.variable.custom.selectedRecord = "";
				};
				webNavigationController.gotoNextScreen({
					screenID : "manage_custom_maintenance_edit",
					fieldID : "manage_custom_maintenance_edit_child_window",
					windowWidth : (screen.width * 0.55),
					nextScreenID : "manage_custom_maintenance_edit_child",
					nextScreenName : manage_custom_maintenance_edit.variable.custom.nextScreenName,
					execute : manage_custom_maintenance_edit_child.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp,
			currentConfig,
			configurationParamNode,
			dataSourceNode,
			dataSourceSchemaNode,
			fieldNodes,
			fieldIdArray,
			inputparamDetail,
			detailRecordCounter;
			inputparamDetail = [];
			fieldIdArray = [];
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_custom_maintenance.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_custom_maintenance.variable.custom.selectedRecord.rec_tstamp;
			};
			currentConfig = webConfigurationEngine.getUiConfigurationObject("manage_custom_maintenance_edit");
			if (currentConfig != undefined) {
				configurationParamNode = currentConfig.configuration.getElementsByTagName("ui_configuration")[0];
				if (configurationParamNode != undefined) {
					dataSourceNode = configurationParamNode.getElementsByTagName("datasource")[0];
					if (dataSourceNode != undefined) {
						dataSourceSchemaNode = dataSourceNode.getElementsByTagName("datasource_1")[0];
						if (dataSourceSchemaNode != undefined) {
							fieldNodes = dataSourceSchemaNode.getElementsByTagName("field");
							if (fieldNodes != undefined) {
								for(var index=0; index < fieldNodes.length; index++){
									fieldIdArray.push(fieldNodes[index].id);
								};
							};
						};
					};
				};
			};
			for (detailRecordCounter = 0; detailRecordCounter <  manage_custom_maintenance_edit.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
				var inputparamDetailString = "";
				for(key in  manage_custom_maintenance_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter]) {
					if(fieldIdArray.includes(key)){
						inputparamDetailString += "<" + key + ">" +  WebAPIProxy.XMLEncode(manage_custom_maintenance_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key]) + "</" + key + ">";
					};
				};
				inputparamDetail.push({
					p_sl_no : (detailRecordCounter + 1).toString(),
					p_inputparam_detail_xml : inputparamDetailString,
					p_crud_ind : manage_custom_maintenance.variable.custom.crudIndicator
				});
			};
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
				p_custom_info_code : webWidgetInitializer.variable.customMainParam.replace("manage_custom_maintenance_",""),
				p_custom_info_ref_no1: "",
				p_custom_info_ref_no2: "",
				p_inputparam_header_xml : $("#manage_custom_maintenance_edit_content_1").getInputparamXML({
					screenID : "manage_custom_maintenance_edit"
				}),
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : manage_custom_maintenance.variable.custom.crudIndicator,
				inputparam_detail : inputparamDetail
			});
			if (returnValue.update_status == "SP001") {
				alert("Details saved successfully");
				return true;
			} else {
				alert("Saving of Details Failed");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function (element, event) {
			manage_custom_maintenance_edit.variable.custom.selectedRecord = manage_custom_maintenance_edit.variable.custom.grid_1.dataSource.getByUid(manage_custom_maintenance_edit.variable.custom.grid_1.select().data("uid"));
		},
		customInfoDetail : function (response) {
			var parseResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					if(response.outputparam_header.p_custom_info_header_json != ""){
						manage_custom_maintenance_edit.variable.custom.header_1_record = JSON.parse(response.outputparam_header.p_custom_info_header_json);
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
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_custom_maintenance_edit_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_custom_maintenance_edit_grid_1",
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