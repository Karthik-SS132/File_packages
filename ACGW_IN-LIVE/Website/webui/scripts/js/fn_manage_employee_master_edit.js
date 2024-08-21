var manage_employee_master_edit = {
	constructScreen : function () {
		$("#manage_employee_master_edit_photo_reference").attr("src", "../../common/images/no_user_image.png");
		if (manage_employee_master.variable.custom.crudIndicator == "U" || manage_employee_master.variable.custom.crudIndicator == "V") {
			manage_employee_master_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_employee_detail",
					outputPath : "context/outputparam",
					inputParameter : {
						p_employee_id : "$manage_employee_master.variable.custom.selectedRecord.employee_id"
					}
				});
			manage_employee_master_edit.variable.custom.datasource_1.read();
			manage_employee_master_edit.variable.custom.datasource_1_record = manage_employee_master_edit.variable.custom.datasource_1.at(0);
			manage_employee_master_edit.variable.custom.employee_id_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.employee_id;
			manage_employee_master_edit.variable.custom.title_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.title;
			manage_employee_master_edit.variable.custom.first_name_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.first_name;
			manage_employee_master_edit.variable.custom.middle_name_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.middle_name;
			manage_employee_master_edit.variable.custom.last_name_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.last_name;
			manage_employee_master_edit.variable.custom.company_location_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.location_code;
			manage_employee_master_edit.variable.custom.company_location_defaultValueDescription = manage_employee_master_edit.variable.custom.datasource_1_record.location_name;
			manage_employee_master_edit.variable.custom.servicing_org_level_number_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.org_level_no;
			manage_employee_master_edit.variable.custom.servicing_org_level_code_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.org_level_code;
			manage_employee_master_edit.variable.custom.contact_number_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.contact_no;
			manage_employee_master_edit.variable.custom.contact_email_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.contact_email;
			manage_employee_master_edit.variable.custom.manager_id_defaultValue = manage_employee_master_edit.variable.custom.datasource_1_record.manager_id;
			manage_employee_master_edit.variable.custom.manager_id_defaultValueDescription = manage_employee_master_edit.variable.custom.datasource_1_record.manager_name;
			if (manage_employee_master_edit.variable.custom.datasource_1_record.photo_ref != "") {
				$("#manage_employee_master_edit_photo_reference").attr("src", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + mserviceUtilities.getFileUploadPath({
						transactionType : "USERPHOTO",
						async : false,
						referenceNumber : manage_employee_master_edit.variable.custom.datasource_1_record.employee_id
					}) + "/" + manage_employee_master_edit.variable.custom.datasource_1_record.photo_ref);
			}
		}
	},
	initializeWidgets : function () {
		$("#manage_employee_master_edit_employee_id").initializeWTextbox({
			screenID : "manage_employee_master_edit",
			maxlength : "12",
			defaultValue : "$manage_employee_master_edit.variable.custom.employee_id_defaultValue",
			keyField : {
				p_screen_name : "'EMPID'",
				p_validation_field_1 : "#manage_employee_master_edit_employee_id",
				p_validation_field_2 : "",
				p_validation_field_3 : "",
				p_validation_field_4 : "",
				p_validation_field_5 : "",
				p_validation_field_6 : "",
				p_validation_field_7 : "",
				p_validation_field_8 : "",
				p_validation_field_9 : "",
				p_validation_field_10 : ""
			}
		});
		$("#manage_employee_master_edit_title").initializeWDropdownlist({
			screenID : "manage_employee_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'EMPLOYEETITLE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_employee_master_edit.variable.custom.title_defaultValue"
		});
		$("#manage_employee_master_edit_first_name").initializeWTextbox({
			screenID : "manage_employee_master_edit",
			maxlength : "50",
			defaultValue : "$manage_employee_master_edit.variable.custom.first_name_defaultValue"
		});
		$("#manage_employee_master_edit_middle_name").initializeWTextbox({
			screenID : "manage_employee_master_edit",
			maxlength : "50",
			defaultValue : "$manage_employee_master_edit.variable.custom.middle_name_defaultValue"
		});
		$("#manage_employee_master_edit_last_name").initializeWTextbox({
			screenID : "manage_employee_master_edit",
			maxlength : "50",
			defaultValue : "$manage_employee_master_edit.variable.custom.last_name_defaultValue"
		});
		$("#manage_employee_master_edit_company_location").initializeWDropdownlist({
			screenID : "manage_employee_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'COMPANYLOCATION_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_employee_master_edit.variable.custom.company_location_defaultValue",
			defaultValueDescription : "$manage_employee_master_edit.variable.custom.company_location_defaultValueDescription"
		});
		$("#manage_employee_master_edit_contact_number").initializeWCombotextbox({
			screenID : "manage_employee_master_edit",
			dataSource: {
				informationType: "'COUNTRYDIALCODE_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			defaultValue : "$manage_employee_master_edit.variable.custom.mobile_number_1_defaultValue",
			defaultValueDescription : "$mserviceUtilities.getDescriptionForCode('COUNTRYDIALCODE_LIST',manage_employee_master_edit.variable.custom.contact_number_defaultValue.split('-')[0],'')"
		});
		$("#manage_employee_master_edit_contact_email").initializeWTextbox({
			screenID : "manage_employee_master_edit",
			maxlength : "60",
			type : "email",
			defaultValue : "$manage_employee_master_edit.variable.custom.contact_email_defaultValue"
		});
		$("#manage_employee_master_edit_servicing_org_level_number").initializeWDropdownlist({
			screenID : "manage_employee_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'ORGLEVELNO_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_employee_master_edit.variable.custom.servicing_org_level_number_defaultValue",
			childFieldID : "manage_employee_master_edit_servicing_org_level_code"
		});
		$("#manage_employee_master_edit_servicing_org_level_code").initializeWDropdownlist({
			screenID : "manage_employee_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'ORGLEVELCODE_LIST'",
					p_search_field_1 : "#manage_employee_master_edit_servicing_org_level_number",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_employee_master_edit.variable.custom.servicing_org_level_code_defaultValue"
		});
		$("#manage_employee_master_edit_manager_id").initializeWDropdownlist({
			screenID : "manage_employee_master_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'SUPERVISOR_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_employee_master_edit.variable.custom.manager_id_defaultValue",
			defaultValueDescription : "$manage_employee_master_edit.variable.custom.manager_id_defaultValueDescription"
		});
		$("#manage_employee_master_edit_photo_attachment").initializeWAttachment({
			screenID : "manage_employee_master_edit",
			multiple : false
		});
	},
	widgetEventHandler : {
		photo_attachment_select : function (element, event) {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
				$("#manage_employee_master_edit_photo_reference").attr('src', e.target.result);
			}
			fileReader.readAsDataURL(event.files[0].rawFile);
		},
		photo_attachment_remove : function (element, event) {
			$("#manage_employee_master_edit_photo_reference").attr('src', "../../common/images/no_user_image.png");
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue,
			photoReferenceValue,
			save_manage_employee_object,
			uploadStatus,
			fileListCounter;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_employee_master.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_employee_master_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			photoReferenceValue = "";
			if ($("#manage_employee_master_edit_photo_reference").attr("src") != "../../common/images/no_user_image.png") {
				if (manage_employee_master.variable.custom.crudIndicator == "U") {
					photoReferenceValue = manage_employee_master_edit.variable.custom.datasource_1_record.photo_ref;
				}
				if (manage_employee_master_edit.variable.custom.attachedFilesList.length != 0) {
					photoReferenceValue = manage_employee_master_edit.variable.custom.attachedFilesList[0].fileName;
				}
			}
			save_manage_employee_object = {
				p_employee_id : $("#manage_employee_master_edit_employee_id").getVal(),
				p_first_name : $("#manage_employee_master_edit_first_name").getVal(),
				p_middle_name : $("#manage_employee_master_edit_middle_name").getVal(),
				p_last_name : $("#manage_employee_master_edit_last_name").getVal(),
				p_title : $("#manage_employee_master_edit_title").getVal(),
				p_location_code : $("#manage_employee_master_edit_company_location").getVal(),
				p_org_level_no : $("#manage_employee_master_edit_servicing_org_level_number").getVal(),
				p_org_level_code : $("#manage_employee_master_edit_servicing_org_level_code").getVal(),
				p_manager_id : $("#manage_employee_master_edit_manager_id").getVal(),
				p_contact_mobile_no : $("#manage_employee_master_edit_contact_number").getVal(),
				p_email_id : $("#manage_employee_master_edit_contact_email").getVal(),
				p_photo_reference : photoReferenceValue,
				p_inputparam_udf_xml : $("#manage_employee_master_edit_content_1").getInputparamXML({
					screenID : "manage_employee_master_edit",
					matchCondition : ["manage_employee_master_edit_udf"]
				}),
				p_rec_tstamp : recordTimeStamp,
				p_save_mode : manage_employee_master.variable.custom.crudIndicator
			};
			if (manage_employee_master_edit.variable.custom.attachedFilesList.length != 0) {
				uploadStatus = 0;
				for (fileListCounter = 0; fileListCounter < manage_employee_master_edit.variable.custom.attachedFilesList.length; fileListCounter++) {
					uploadStatus += mserviceUtilities.uploadFile(mserviceUtilities.getFileUploadPath({
							transactionType : "USERPHOTO",
							async : false,
							referenceNumber : $("#manage_employee_master_edit_employee_id").getVal()
						}), manage_employee_master_edit.variable.custom.attachedFilesList[fileListCounter].file);
				}
				if (uploadStatus == manage_employee_master_edit.variable.custom.attachedFilesList.length) {
					returnValue = executeService_save_manage_employee(save_manage_employee_object);
					if (returnValue == "SP001") {
						alert("Employee Details saved successfully.");
						return true;
					} else if (returnValue == false) {
						for (fileListCounter = 0; fileListCounter < manage_employee_master_edit.variable.custom.attachedFilesList.length; fileListCounter++) {
							mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
									transactionType : "USERPHOTO",
									async : false,
									referenceNumber : $("#manage_employee_master_edit_employee_id").getVal()
								}) + "/" + manage_employee_master_edit.variable.custom.attachedFilesList[fileListCounter].fileName);
						}
						alert("Saving of Employee Details failed.");
						return false;
					}
				} else {
					alert("Uploading of files Failed");
					return false;
				}
			} else {
				returnValue = executeService_save_manage_employee(save_manage_employee_object);
				if (returnValue == "SP001") {
					alert("Employee Details saved successfully.");
					return true;
				} else {
					alert("Saving of Employee Details failed.");
					return false;
				}
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
			valueChangeIndicator : false,
		},
		custom : {
			attachedFilesList : []
		},
	}
};