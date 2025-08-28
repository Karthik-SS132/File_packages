var manage_parts_order_wfeventverb_status_change = {
    constructScreen: function () {
        manage_parts_order_wfeventverb_status_change.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
            applicationName: "common_modules",
            serviceName: "retrieve_listof_values_for_searchcondition",
            outputPath: "context/outputparam",
            pageSize: 50,
            inputParameter: {
                p_inputparam_xml: "<inputparam><lov_code_type>'PARTSORDER_WFEVENTVERB_PROCESSING_DATA'</lov_code_type><search_field_1>$manage_parts_order_wfeventverb_status_change.variable.custom.parts_order_no_defaultValue</search_field_1><search_field_2>$manage_parts_order.variable.custom.selectedWorkflowEventVerb</search_field_2></inputparam>"
            },
            screenID: "manage_parts_order_wfeventverb_status_change"
        });
    },
    initializeWidgets: function () {
        $("#manage_parts_order_wfeventverb_status_change_parts_order_no").initializeWDisplayarea({
            screenID: "manage_parts_order_wfeventverb_status_change",
            defaultValue: "$manage_parts_order_wfeventverb_status_change.variable.custom.parts_order_no_defaultValue"
        });
        $("#manage_parts_order_wfeventverb_status_change_parts_order_status").initializeWDisplayarea({
            screenID: "manage_parts_order_wfeventverb_status_change",
            defaultValue: "$manage_parts_order_wfeventverb_status_change.variable.custom.parts_order_status_defaultValue"
        });
        $("#manage_parts_order_wfeventverb_status_change_to_stage").initializeWDropdownlist({
            screenID: "manage_parts_order_wfeventverb_status_change",
            dataSource: {
                applicationName: "common_modules",
                serviceName: "retrieve_listof_values",
                inputParameter: {
                    p_lov_code: "'PARTSORDERTOSTAGE'",
                    p_search_field_1: "$manage_parts_order.variable.custom.selectedRecord.parts_order_category",
                    p_search_field_2: "$manage_parts_order.variable.custom.selectedRecord.parts_order_wf_stage_no",
                    p_search_field_3: "$manage_parts_order.variable.custom.selectedRecord.parts_order_status",
                    p_search_field_4: "",
                    p_search_field_5: ""
                },
            },
            dataTextField: "p_description_field_1",
            dataValueField: "p_value_field_1",
            defaultValue: "$manage_parts_order.variable.custom.selectedWorkflowToStage",
            childFieldID: "manage_parts_order_wfeventverb_status_change_to_status"
        });
        $("#manage_parts_order_wfeventverb_status_change_to_status").initializeWDropdownlist({
            screenID: "manage_parts_order_wfeventverb_status_change",
            dataSource: {
                applicationName: "common_modules",
                serviceName: "retrieve_listof_values",
                inputParameter: {
                    p_lov_code: "'PARTSORDERTOSTATUS'",
                    p_search_field_1: "$manage_parts_order.variable.custom.selectedRecord.parts_order_category",
                    p_search_field_2: "$manage_parts_order.variable.custom.selectedRecord.parts_order_wf_stage_no",
                    p_search_field_3: "$manage_parts_order.variable.custom.selectedRecord.parts_order_status",
                    p_search_field_4: "#manage_parts_order_wfeventverb_status_change_to_stage",
                    p_search_field_5: ""
                },
            },
            dataTextField: "p_description_field_1",
            dataValueField: "p_value_field_1",
            defaultValue: "$manage_parts_order.variable.custom.selectedWorkflowToStatus",
            childFieldID: "manage_parts_order_wfeventverb_status_change_reason_code"
        });
        $("#manage_parts_order_wfeventverb_status_change_comments").initializeWTextarea({
            screenID: "manage_parts_order_wfeventverb_status_change",
            maxlength: "1000"
        });
        $("#manage_parts_order_wfeventverb_status_change_to_employee_id").initializeWCombobox({
            screenID: "manage_parts_order_wfeventverb_status_change",
            dataSource: {
                applicationName: "common_modules",
                serviceName: "retrieve_listof_values",
                inputParameter: {
                    p_lov_code: "'CALLASSIGNTO_LIST'",
                    p_search_field_1: "",
                    p_search_field_2: "",
                    p_search_field_3: "",
                    p_search_field_4: "",
                    p_search_field_5: ""
                },
            },
            dataTextField: "p_description_field_1",
            dataValueField: "p_value_field_1"
        });
        $("#manage_parts_order_wfeventverb_status_change_reason_code").initializeWDropdownlist({
            screenID: "manage_parts_order_wfeventverb_status_change",
            dataSource: {
                applicationName: "common_modules",
                serviceName: "retrieve_listof_values_for_searchcondition",
                inputParameter: {
                    p_inputparam_xml: "manage_parts_order_wfeventverb_status_change.customRequirementHandler.getReasonCodeInputparamXML()"
                },
            },
            dataTextField: "description",
            dataValueField: "code"
        });
        $("#manage_parts_order_wfeventverb_status_change_attachment").initializeWAttachment({
            screenID: "manage_parts_order_wfeventverb_status_change"
        });
        manage_parts_order_wfeventverb_status_change.variable.custom.grid_1 = $("#manage_parts_order_wfeventverb_status_change_grid_1").initializeWGrid({
            screenID: "manage_parts_order_wfeventverb_status_change",
            dataSource: manage_parts_order_wfeventverb_status_change.variable.custom.datasource_1,
            height: 300,
            pageSize: 50,
            sortable: false,
            editable: true
        });
        manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.refresh();
        manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.resize();
    },
    buttonEventHandler: {
        submit_btn_click: function (element, event) {
            var selectedReasonCode,
            inputparamDetail1,
            inputparamDetail2,
            inputparamDetail3,
            inputparamDetail4,
            inputparamDetail5,
            inputparamDetaildata,
            inputParamXMLString,
            inputParamXMLString1,
            inputParamXMLString2,
            inputParamXMLString3,
            attachmentXML,
            fileListCounter,
            update_parts_order_wfeventverb_status_change,
            uploadStatus,
            returnValue;
            selectedReasonCode = "",
            inventoryDetailString = "",
            inputParamXMLString1 = "",
            inputParamXMLString2 = "",
            inputParamXMLString3 = "",
            attachmentXML = "",
            inputparamDetaildata = "",
            gridDataSource = "";
            inputparamDetail1 = [];
            inputparamDetail2 = [];
            inputparamDetail3 = [];
            inputparamDetail4 = [];
            inputparamDetail5 = [];
            orderDetailString = "";
            inputParamXMLString = $("#manage_parts_order_wfeventverb_status_change_content_1").getInputparamXML({
                screenID: "manage_parts_order_wfeventverb_status_change",
                matchCondition: ["manage_parts_order_wfeventverb_status_change_parts_order", "manage_parts_order_wfeventverb_status_change_udf", "manage_parts_order_wfeventverb_status_change_product_udf"]
            });
            if (manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data().length != 0) {
                gridDataSource = manage_parts_order_wfeventverb_status_change.customRequirementHandler.getGridDataSource();
            };
            for (detailRecordCounter = 0; detailRecordCounter < manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
                for (key in manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[detailRecordCounter]) {
                    for (gridDataSourceCounter = 0; gridDataSourceCounter < gridDataSource.length; gridDataSourceCounter++) {
                        if (key == gridDataSource[gridDataSourceCounter]) {
                            if (typeof(manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key]) != "object") {
                                inputparamDetaildata += "<" + key + ">" + manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key] + "</" + key + ">"
                            } else {
                                if (manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key].code != undefined) {
                                    inputparamDetaildata += "<" + key + ">" + manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key].code + "</" + key + ">";
                                } else {
                                    inputparamDetaildata += "<" + key + ">" + manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key].join(',') + "</" + key + ">";
                                }
                            }
                        }
                    }
                };
                if (inputparamDetaildata != "") {
                    inputparamDetail1.push({
                        p_txn_detail1_sl_no: (detailRecordCounter + 1).toString(),
                        p_txn_detail1_coref_xml: inputparamDetaildata,
                        p_txn_detail1_udf_xml: "<inputparam></inputparam>",
                        p_txn_detail1_crud_ind: "A"
                    });
                    inputparamDetaildata = "";
                };
            };
            orderDetailString = "<OD>";
            orderDetailString += "</OD></inputparam>";
            inputParamXMLString = inputParamXMLString.replace("</inputparam>", orderDetailString).match(/.{1,4500}/g);
            if (inputParamXMLString[0] != undefined) {
                inputParamXMLString1 = inputParamXMLString[0];
            }
            if (inputParamXMLString[1] != undefined) {
                inputParamXMLString2 = inputParamXMLString[1];
            }
            if (inputParamXMLString[2] != undefined) {
                inputParamXMLString3 = inputParamXMLString[2];
            }
            attachmentXML += "<attachment_xml>";
            for (fileListCounter = 0; fileListCounter < manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
                attachmentXML += "<attachment>";
                attachmentXML += "<file_name>" + getXmlString(manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileName) + "</file_name>";
                attachmentXML += "<file_category>" + getXmlString(manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileCategory) + "</file_category>";
                attachmentXML += "<file_type>" + getXmlString(manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileType) + "</file_type>";
                attachmentXML += "</attachment>";
            }
            attachmentXML += "</attachment_xml>";
            update_parts_order_wfeventverb_status_change = {
                p_invoice_no: manage_parts_order.variable.custom.selectedRecord.parts_order_no,
                p_wfeventverb_id: manage_parts_order.variable.custom.selectedWorkflowEventVerb,
                p_event_date: mserviceUtilities.getDateString(new Date(), "yyyy-MM-dd"),
                p_event_hour: mserviceUtilities.getDateString(new Date(), "HH"),
                p_event_minute: mserviceUtilities.getDateString(new Date(), "mm"),
                p_from_wf_stage_no: manage_parts_order.variable.custom.selectedRecord.workflow_stage_no,
                p_to_wf_stage_no: $("#manage_parts_order_wfeventverb_status_change_to_stage").getVal(),
                p_from_wf_status: manage_parts_order.variable.custom.selectedRecord.parts_order_status,
                p_to_wf_status: $("#manage_parts_order_wfeventverb_status_change_to_status").getVal(),
                p_channel_id: "WEB",
                p_by_employee_id: login_profile.emp_id,
                p_to_employee_id_string: $("#manage_parts_order_wfeventverb_status_change_to_employee_id").getVal(),
                p_reason_code: $("#manage_parts_order_wfeventverb_status_change_reason_code").getVal(),
                p_comments: $("#manage_parts_order_wfeventverb_status_change_comments").getVal(),
                p_attachment_xml: attachmentXML,
                p_inputparam_xml1: inputParamXMLString1,
                p_inputparam_xml2: inputParamXMLString2,
                p_inputparam_xml3: inputParamXMLString3,
                p_rec_tstamp: manage_parts_order.variable.custom.selectedRecord.rec_tstamp,
                p_save_mode: "A",
                inputparam_detail1: inputparamDetail1,
                inputparam_detail2: inputparamDetail2,
                inputparam_detail3: inputparamDetail3,
                inputparam_detail4: inputparamDetail4,
                inputparam_detail5: inputparamDetail5
            };
            if (manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList.length != 0) {
                uploadStatus = 0;
                for (fileListCounter = 0; fileListCounter < manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
                    uploadStatus += mserviceUtilities.uploadFile(mserviceUtilities.getFileUploadPath({
                            transactionType: "PARTSORDER",
                            async: false,
                            referenceNumber: manage_parts_order.variable.custom.selectedRecord.parts_order_no
                        }), manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].file);
                }
                if (uploadStatus == manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList.length) {
                    returnValue = executeService_update_parts_order_wfeventverb_status_change(update_parts_order_wfeventverb_status_change);
                    if (returnValue.update_status == "SP001") {
                        alert("Parts Order Document " + manage_parts_order.variable.custom.nextScreenName + " Successfully Done.");
                        return true;
                    } else if (returnValue == false) {
                        for (fileListCounter = 0; fileListCounter < manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
                            mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
                                    transactionType: "PARTSORDER",
                                    async: false,
                                    referenceNumber: manage_parts_order.variable.custom.selectedRecord.parts_order_no
                                }) + "/" + manage_parts_order_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileName);
                        }
                        return false;
                    }
                } else {
                    alert("Uploading of files Failed");
                    return false;
                }
            } else {
                returnValue = executeService_update_parts_order_wfeventverb_status_change(update_parts_order_wfeventverb_status_change);
                if (returnValue.update_status == "SP001") {
                    alert("Parts Order Document " + manage_parts_order.variable.custom.nextScreenName + " Successfully Done.");
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    customRequirementHandler: {
        getReasonCodeInputparamXML: function () {
            return "<inputparam><lov_code_type>PARTSORDER_STATUSCHANGE_REASONCODES</lov_code_type><search_field_1>" + manage_parts_order.variable.custom.selectedWorkflowEventVerb + "</search_field_1><search_field_2>" + $("#manage_parts_order_wfeventverb_status_change_to_stage").getVal() + "</search_field_2><search_field_3>" + $("#manage_parts_order_wfeventverb_status_change_to_status").getVal() + "</search_field_3></inputparam>";
        },
        detailedGridRefresh: function () {
            manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.pageSize(50);
            for (key in manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.columns) {
                if (manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.columns[key].editable()) {
                    var temp = manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.columns[key].field;
                    for (key in manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()) {
                        if (manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[key][temp] != "") {
                            if (!isNaN(Number(manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[key][temp]))) {
                                manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[key][temp] = Number(manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[key][temp]);
                            };
                            try {
                                if (typeof(JSON.parse(manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[key][temp].replace(/'/g, '"'))) == "object") {
                                    manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[key][temp] = JSON.parse(manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data()[key][temp].replace(/'/g, '"'));
                                };
                            } catch (e) {};
                        };
                    };
                };
            };
        },
        getGridDataSource: function () {
            var currentUiConfig,
            configurationNode,
            dataSource = [];
            if (webConfigurationEngine.variable.uiConfigurations.length != 0) {
                currentUiConfig = $.grep(webConfigurationEngine.variable.uiConfigurations, function (element, index) {
                    return element.screenID == "manage_parts_order_wfeventverb_status_change";
                })[0];
                if (currentUiConfig != undefined) {
                    configurationNode = currentUiConfig.configuration.getElementsByTagName("ui_configuration")[0];
                    if (configurationNode != undefined) {
                        for (dataSourceIdCouter = 0; dataSourceIdCouter < configurationNode.getElementsByTagName("datasource_1")[0].childNodes.length; dataSourceIdCouter++) {
                            dataSource.push(configurationNode.getElementsByTagName("datasource_1")[0].childNodes[dataSourceIdCouter]['getAttribute']("id"));
                        };
                    }
                }
            };
            return dataSource;
        },
        getExportConfig: function (gridId) {
            if (gridId == "manage_parts_order_wfeventverb_status_change_grid_1_export_btn") {
                return {
                    type: "csv",
                    template: "manage_parts_order_wfeventverb_status_change_" + manage_parts_order.variable.custom.selectedWorkflowEventVerb,
                    service: "sp_retrieve_listof_values_for_searchcondition",
                    request: "<signature><i_inputparam_xml><inputparam><lov_code_type>PARTSORDER_WFEVENTVERB_PROCESSING_DATA</lov_code_type><search_field_1>" + manage_parts_order_wfeventverb_status_change.variable.custom.parts_order_no_defaultValue + "</search_field_1><search_field_2>" + manage_parts_order.variable.custom.selectedWorkflowEventVerb + "</search_field_2></inputparam></i_inputparam_xml></signature>",
                    length: manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data().length
                };
            }
        },
		getImportConfig : function (gridId) {
			if(gridId == "manage_parts_order_wfeventverb_status_change_grid_1_import_btn"){
				return {
					screen_id: "manage_parts_order_wfeventverb_status_change",
					request_ref_no : manage_parts_order_wfeventverb_status_change.variable.custom.parts_order_no_defaultValue,
					eventverb_id : manage_parts_order.variable.custom.selectedWorkflowEventVerb,
					template : "manage_parts_order_wfeventverb_status_change_" + manage_parts_order.variable.custom.selectedWorkflowEventVerb,
					length : manage_parts_order_wfeventverb_status_change.variable.custom.grid_1.dataSource.data().length
				};
			}
		}
    },
    variable: {
        standard: {
            screenEditableIndicator: true,
            popupIndicator: true,
            configurationParam: manage_parts_order.variable.custom.selectedWorkflowEventVerb,
            reorderParam: [{
                    contentID: "content_1",
                    columnLength: 2
                }
            ],
        },
        custom: {
            parts_order_no_defaultValue: manage_parts_order.variable.custom.selectedRecord.parts_order_no,
            parts_order_status_defaultValue: manage_parts_order.variable.custom.selectedRecord.parts_order_status_desc,
            attachedFilesList: []
        }
    }
};
