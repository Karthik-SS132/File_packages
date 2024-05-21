var manage_custom_maintenance_wfeventverb_status_change = {
	constructScreen : function () {
		manage_custom_maintenance_wfeventverb_status_change.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_custom_info_detail",
			outputPath : false,
			api : true,
			pageSize : 10,
			inputParameter : {
				p_custom_info_code : webWidgetInitializer.variable.customMainParam.replace("manage_custom_maintenance_",""),
				p_custom_info_ref_no1 : "$manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no",
				p_custom_info_ref_no2 : "''"
			},
			schemaModel : true,
			screenID : "manage_custom_maintenance_wfeventverb_status_change",
			dataSourceName : "datasource_1",
			processResponse : true,
			parse : manage_custom_maintenance_wfeventverb_status_change.customRequirementHandler.customInfoDetail
		});
		$('#manage_custom_maintenance_wfeventverb_status_change_grid_1').hide();
	},
	postConstruct : function () {
		$('div.k-widget.k-window').css("left","250px");
		$('div.k-widget.k-window').css("top","230px");
		$('#manage_custom_maintenance_wfeventverb_status_change_header_1').css("width","850px");
		if (webWidgetInitializer.variable.customMainParam == "manage_custom_maintenance_spare_request" && manage_custom_maintenance.variable.custom.selectedWorkflowEventVerb =="SPREQPARTRETURN"){
			$('#manage_custom_maintenance_wfeventverb_status_change_grid_1').show();
			manage_custom_maintenance_wfeventverb_status_change.variable.custom.datasource_1.read();
			$('#manage_custom_maintenance_wfeventverb_status_change_delete_btn').show();
		}
	},
	initializeWidgets : function () {
		$("#manage_custom_maintenance_wfeventverb_status_change_call_number").initializeWDisplayarea({
			screenID : "manage_custom_maintenance_wfeventverb_status_change",
			defaultValue : "$manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no"
		});
		$("#manage_custom_maintenance_wfeventverb_status_change_call_status").initializeWDisplayarea({
			screenID : "manage_custom_maintenance_wfeventverb_status_change",
			defaultValue : "$manage_custom_maintenance.variable.custom.selectedRecord.call_status_desc"
		});
		$("#manage_custom_maintenance_wfeventverb_status_change_to_stage").initializeWDropdownlist({
			screenID : "manage_custom_maintenance_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CALLTOSTAGE'",
					p_search_field_1 : "$manage_custom_maintenance.variable.custom.selectedRecord.request_category",
					p_search_field_2 : "$manage_custom_maintenance.variable.custom.selectedRecord.workflow_stage_no",
					p_search_field_3 : "$manage_custom_maintenance.variable.custom.selectedRecord.request_status",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_custom_maintenance.variable.custom.selectedWorkflowToStage",
			childFieldID : "manage_custom_maintenance_wfeventverb_status_change_to_status"
		});
		$("#manage_custom_maintenance_wfeventverb_status_change_to_status").initializeWDropdownlist({
			screenID : "manage_custom_maintenance_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CALLTOSTATUS'",
					p_search_field_1 : "$manage_custom_maintenance.variable.custom.selectedRecord.request_category",
					p_search_field_2 : "$manage_custom_maintenance.variable.custom.selectedRecord.workflow_stage_no",
					p_search_field_3 : "$manage_custom_maintenance.variable.custom.selectedRecord.request_status",
					p_search_field_4 : "#manage_custom_maintenance_wfeventverb_status_change_to_stage",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_custom_maintenance.variable.custom.selectedWorkflowToStatus",
			childFieldID : "manage_custom_maintenance_wfeventverb_status_change_reason_code"
		});
		$("#manage_custom_maintenance_wfeventverb_status_change_comments").initializeWTextarea({
			screenID : "manage_custom_maintenance_wfeventverb_status_change",
			maxlength : "1000"
		});
		
		manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1 = $("#manage_custom_maintenance_wfeventverb_status_change_grid_1").initializeWGrid({
			screenID : "manage_custom_maintenance_wfeventverb_status_change",
			toolbar : "#manage_custom_maintenance_wfeventverb_status_change_grid_1_toolbar_template",
			dataSource : manage_custom_maintenance_wfeventverb_status_change.variable.custom.datasource_1,
			height : 250,
			pageSize : 10,
			filterable : false,
			editable : true
		});
		manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.refresh();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if(manage_custom_maintenance_wfeventverb_status_change.variable.custom.crudIndicator == "D"){
				manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.dataSource.remove(manage_custom_maintenance_wfeventverb_status_change.variable.custom.selectedRecord);
				alert("Data deleted successfully.");
			}
		},
		submit_btn_click : function (element, event) {
			var inputParamXMLString,
			returnValue,
			returnValue2,
			recordTimeStamp,
			inputparamDetail,
			detailRecordCounter;
			inputparamDetail = [];
			inputParamXMLString1 = "",
			gridDataCheck = 0,
			attachmentXML = "",
			inputParamXMLString2 = "",
			inputParamXMLString3 = "";
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_custom_maintenance.variable.custom.crudIndicator != "A") {
				recordTimeStamp = manage_custom_maintenance.variable.custom.selectedRecord.rec_tstamp;
			};
			inputParamXMLString = 	"<inputparam><p_request_ref_no>"+ manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no + "</p_request_ref_no><p_wfeventverb_id>"+  manage_custom_maintenance.variable.custom.selectedWorkflowEventVerb+ "</p_wfeventverb_id><p_event_date>"+  mserviceUtilities.getDateString(new Date(), "yyyy-MM-dd")+"</p_event_date><p_event_hour>"+  mserviceUtilities.getDateString(new Date(), "HH") + "</p_event_hour><p_event_minute>"+  mserviceUtilities.getDateString(new Date(), "mm")+ "</p_event_minute><p_from_wf_stage_no>"+  manage_custom_maintenance.variable.custom.selectedRecord.workflow_stage_no+ "</p_from_wf_stage_no><p_to_wf_stage_no>"+  $("#manage_custom_maintenance_wfeventverb_status_change_to_stage").getVal()+ "</p_to_wf_stage_no><p_from_wf_status>"+  manage_custom_maintenance.variable.custom.selectedRecord.request_status+ "</p_from_wf_status><p_to_wf_status>"+  $("#manage_custom_maintenance_wfeventverb_status_change_to_status").getVal()+ "</p_to_wf_status><p_channel_id>"+  "WEB"+ "</p_channel_id><p_by_employee_id>"+  login_profile.emp_id+ "</p_by_employee_id><p_to_employee_id_string>"+  $("#manage_custom_maintenance_wfeventverb_status_change_to_employee_id").getVal()+ "</p_to_employee_id_string><p_reason_code>"+  $("#manage_custom_maintenance_wfeventverb_status_change_reason_code").getVal()+ "</p_reason_code><p_comments>"+  $("#manage_custom_maintenance_wfeventverb_status_change_comments").getVal()+ "</p_comments><p_lattitude_value>"+  ""+ "</p_lattitude_value><p_longitude_value>"+  ""+ "</p_longitude_value><p_attachment_xml>"+  attachmentXML+ "</p_attachment_xml><p_inputparam_xml1>"+  inputParamXMLString1+ "</p_inputparam_xml1><p_inputparam_xml2>"+  inputParamXMLString2+ "</p_inputparam_xml2><p_inputparam_xml3>"+  inputParamXMLString3+ "</p_inputparam_xml3><p_rec_tstamp>"+  manage_custom_maintenance.variable.custom.selectedRecord.rec_tstamp+ "</p_rec_tstamp><p_save_mode>"+  "W" +"</p_save_mode></inputparam>";
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
				p_custom_info_code : webWidgetInitializer.variable.customMainParam.replace("manage_custom_maintenance_",""),
				p_custom_info_ref_no1: "",
				p_custom_info_ref_no2: "",
				p_inputparam_header_xml : inputParamXMLString,
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : "W",
				inputparam_detail : inputparamDetail
			});
			
			var inputparamDetailString = "<inputparamxmldetail>";
			for (detailRecordCounter = 0; detailRecordCounter <  manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
				gridDataCheck = 1;
				inputparamDetailString += "<item_list>"
				inputparamDetailString += "<item_code>" + manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_code +"</item_code><item_code_description>" + manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_code_description + "</item_code_description><net_quantity>" + manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[detailRecordCounter].net_quantity + "</net_quantity>";
				
				/*for(key in  manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.dataSource._pristineData[detailRecordCounter]) {
					inputparamDetailString += "<" + key + ">" +  manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.dataSource._pristineData[detailRecordCounter][key] + "</" + key + ">";
				}*/
				inputparamDetailString += "</item_list>";
			};
			inputparamDetailString += "</inputparamxmldetail>";
			if (gridDataCheck == 1){
				returnValue2 = common_modules_custominfo_setDetail.invokeAPI({
					p_custom_info_code : webWidgetInitializer.variable.customMainParam.replace("manage_custom_maintenance_",""),
					p_custom_info_ref_no1: "",
					p_custom_info_ref_no2: "",
					p_inputparam_header_xml: inputparamDetailString,
					p_rec_timestamp : recordTimeStamp,
					p_save_mode : "W",
					inputparam_detail : ""
				});
			}
			
			if (returnValue.update_status == "SP001") {
				alert(manage_custom_maintenance.variable.custom.nextScreenName + " Successfully Done.");
				manage_custom_maintenance_wfeventverb_status_change.customRequirementHandler.callTakenCheck();	
				return true;
			} else {
					return false;
			}
						 
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function (element, event) {
			manage_custom_maintenance_wfeventverb_status_change.variable.custom.selectedRecord = manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.dataSource.getByUid(manage_custom_maintenance_wfeventverb_status_change.variable.custom.grid_1.select().data("uid"));
		},
		callTakenCheck : function(){
			if (webWidgetInitializer.variable.customMainParam == "manage_custom_maintenance_customer_survey"){
				if ($('#manage_custom_maintenance_wfeventverb_status_change_call_taken_check').getVal() == "1"){
					setTimeout(function(){ manage_custom_maintenance.customRequirementHandler.feedBack(); 
						},	
					8);
				}
			}
		},
		customInfoDetail : function (response) {
			var parseResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					if(response.outputparam_header.p_custom_info_header_json != ""){
						manage_custom_maintenance_wfeventverb_status_change.variable.custom.header_1_record = JSON.parse(response.outputparam_header.p_custom_info_header_json);
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
			popupIndicator : true,
			configurationParam : manage_custom_maintenance.variable.custom.selectedWorkflowEventVerb,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			attachedFilesList : [],
			customDelete : true
		}
	}
};
