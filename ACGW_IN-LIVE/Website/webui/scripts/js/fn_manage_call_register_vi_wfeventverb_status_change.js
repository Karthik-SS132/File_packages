var manage_call_register_vi_wfeventverb_status_change = {
	constructScreen : function () {
		return true;
	},
	initializeWidgets : function () {
		$("#manage_call_register_vi_wfeventverb_status_change_call_number").initializeWDisplayarea({
			screenID : "manage_call_register_vi_wfeventverb_status_change",
			defaultValue : "$manage_call_register_vi.variable.custom.selectedRecord.call_no"
		});
		$("#manage_call_register_vi_wfeventverb_status_change_call_status").initializeWDisplayarea({
			screenID : "manage_call_register_vi_wfeventverb_status_change",
			defaultValue : "$manage_call_register_vi.variable.custom.selectedRecord.call_status_desc"
		});
		$("#manage_call_register_vi_wfeventverb_status_change_to_stage").initializeWDropdownlist({
			screenID : "manage_call_register_vi_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CALLTOSTAGE'",
					p_search_field_1 : "$manage_call_register_vi.variable.custom.selectedRecord.call_category",
					p_search_field_2 : "$manage_call_register_vi.variable.custom.selectedRecord.workflow_stage_no",
					p_search_field_3 : "$manage_call_register_vi.variable.custom.selectedRecord.call_status",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_call_register_vi.variable.custom.selectedWorkflowToStage",
			childFieldID : "manage_call_register_vi_wfeventverb_status_change_to_status"
		});
		$("#manage_call_register_vi_wfeventverb_status_change_to_status").initializeWDropdownlist({
			screenID : "manage_call_register_vi_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CALLTOSTATUS'",
					p_search_field_1 : "$manage_call_register_vi.variable.custom.selectedRecord.call_category",
					p_search_field_2 : "$manage_call_register_vi.variable.custom.selectedRecord.workflow_stage_no",
					p_search_field_3 : "$manage_call_register_vi.variable.custom.selectedRecord.call_status",
					p_search_field_4 : "#manage_call_register_vi_wfeventverb_status_change_to_stage",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_call_register_vi.variable.custom.selectedWorkflowToStatus",
			childFieldID : "manage_call_register_vi_wfeventverb_status_change_reason_code"
		});
		$("#manage_call_register_vi_wfeventverb_status_change_comments").initializeWTextarea({
			screenID : "manage_call_register_vi_wfeventverb_status_change",
			maxlength : "1000"
		});
		$("#manage_call_register_vi_wfeventverb_status_change_to_employee_id").initializeWCombobox({
			screenID : "manage_call_register_vi_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CALLASSIGNTO_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1"
		});
		$("#manage_call_register_vi_wfeventverb_status_change_reason_code").initializeWDropdownlist({
			screenID : "manage_call_register_vi_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "manage_call_register_vi_wfeventverb_status_change.customRequirementHandler.getReasonCodeInputparamXML()"
				},
			},
			dataTextField : "description",
			dataValueField : "code"
		});
		$("#manage_call_register_vi_wfeventverb_status_change_attachment").initializeWAttachment({
			screenID : "manage_call_register_vi_wfeventverb_status_change"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var selectedReasonCode,
			inputParamXMLString,
			inputParamXMLString1,
			inputParamXMLString2,
			inputParamXMLString3,
			attachmentXML,
			fileListCounter,
			update_call_wfeventverb_status_change_object,
			uploadStatus,
			returnValue;
			selectedReasonCode = "",
			inputParamXMLString1 = "",
			attachmentXML = "",
			inputParamXMLString2 = "",
			inputParamXMLString3 = "";
			inputParamXMLString = $("#manage_call_register_vi_wfeventverb_status_change_content_1").getInputparamXML({
					screenID : "manage_call_register_vi_wfeventverb_status_change",
					matchCondition : ["manage_call_register_vi_wfeventverb_status_change_call_register", "manage_call_register_vi_wfeventverb_status_change_lead_register"]
				}).match(/.{1,4500}/g);
			if (inputParamXMLString[0] != undefined) {
				inputParamXMLString1 = inputParamXMLString[0];
			};
			if (inputParamXMLString[1] != undefined) {
				inputParamXMLString2 = inputParamXMLString[1];
			};
			if (inputParamXMLString[2] != undefined) {
				inputParamXMLString3 = inputParamXMLString[2];
			};
			attachmentXML += "<attachment_xml>";
			for (fileListCounter = 0; fileListCounter < manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
				attachmentXML += "<attachment>";
				attachmentXML += "<file_name>" + getXmlString(manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileName) + "</file_name>";
				attachmentXML += "<file_category>" + getXmlString(manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileCategory) + "</file_category>";
				attachmentXML += "<file_type>" + getXmlString(manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileType) + "</file_type>";
				attachmentXML += "</attachment>";
			};
			attachmentXML += "</attachment_xml>";
			update_call_wfeventverb_status_change_object = {
				p_call_ref_no : manage_call_register_vi.variable.custom.selectedRecord.call_no,
				p_wfeventverb_id : manage_call_register_vi.variable.custom.selectedWorkflowEventVerb,
				p_event_date : mserviceUtilities.getDateString(new Date(), "yyyy-MM-dd"),
				p_event_hour : mserviceUtilities.getDateString(new Date(), "HH"),
				p_event_minute : mserviceUtilities.getDateString(new Date(), "mm"),
				p_from_wf_stage_no : manage_call_register_vi.variable.custom.selectedRecord.workflow_stage_no,
				p_to_wf_stage_no : $("#manage_call_register_vi_wfeventverb_status_change_to_stage").getVal(),
				p_from_wf_status : manage_call_register_vi.variable.custom.selectedRecord.call_status,
				p_to_wf_status : $("#manage_call_register_vi_wfeventverb_status_change_to_status").getVal(),
				p_channel_id : "WEB",
				p_by_employee_id : login_profile.emp_id,
				p_to_employee_id_string : $("#manage_call_register_vi_wfeventverb_status_change_to_employee_id").getVal(),
				p_reason_code : $("#manage_call_register_vi_wfeventverb_status_change_reason_code").getVal(),
				p_comments : $("#manage_call_register_vi_wfeventverb_status_change_comments").getVal(),
				p_lattitude_value : "",
				p_longitude_value : "",
				p_attachment_xml : attachmentXML,
				p_inputparam_xml1 : inputParamXMLString1,
				p_inputparam_xml2 : inputParamXMLString2,
				p_inputparam_xml3 : inputParamXMLString3,
				p_rec_tstamp : manage_call_register_vi.variable.custom.selectedRecord.rec_tstamp,
				p_save_mode : "A"
			};
			if (manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList.length != 0) {
				uploadStatus = 0;
				for (fileListCounter = 0; fileListCounter < manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
					uploadStatus += mserviceUtilities.uploadFile(mserviceUtilities.getFileUploadPath({
							transactionType : "CALL",
							async : false,
							referenceNumber : manage_call_register_vi.variable.custom.selectedRecord.call_no
						}), manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].file);
				};
				if (uploadStatus == manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList.length) {
					returnValue = executeService_update_call_wfeventverb_status_change(update_call_wfeventverb_status_change_object);
					if (returnValue == "SP001") {
						alert(manage_call_register_vi.variable.custom.nextScreenName + " Successfully Done.");
						return true;
					} else if (returnValue == false) {
						for (fileListCounter = 0; fileListCounter < manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
							mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
									transactionType : "CALL",
									async : false,
									referenceNumber : manage_call_register_vi.variable.custom.selectedRecord.call_no
								}) + "/" + manage_call_register_vi_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileName);
						};
						return false;
					}
				} else {
					alert("Uploading of files Failed");
					return false;
				}
			} else {
				returnValue = executeService_update_call_wfeventverb_status_change(update_call_wfeventverb_status_change_object);
				if (returnValue == "SP001") {
					alert(manage_call_register_vi.variable.custom.nextScreenName + " Successfully Done.");
					return true;
				} else {
					return false;
				}
			}
		}
	},
	customRequirementHandler : {
		getReasonCodeInputparamXML : function () {
			return "<inputparam><lov_code_type>CALL_STATUSCHANGE_REASONCODES</lov_code_type><search_field_1>" + manage_call_register_vi.variable.custom.selectedWorkflowEventVerb + "</search_field_1><search_field_2>" + $("#manage_call_register_vi_wfeventverb_status_change_to_stage").getVal() + "</search_field_2><search_field_3>" + $("#manage_call_register_vi_wfeventverb_status_change_to_status").getVal() + "</search_field_3></inputparam>";
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			configurationParam : manage_call_register_vi.variable.custom.selectedWorkflowEventVerb,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			attachedFilesList : []
		}
	}
};
