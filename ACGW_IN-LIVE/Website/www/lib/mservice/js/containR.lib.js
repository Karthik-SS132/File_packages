mService.containR = {
    button: {
        crud: {
            addClick: function (ele, evt) {
                var dataObj;
                try {
                    dataObj = {};
                    if (ele.attr("data-ms-containr-param") !== undefined) {
                        $.extend(true, dataObj, JSON.parse(ele.attr("data-ms-containr-param")));
                    };
                    if (ele.attr("data-ms-uid") !== undefined) {
                        dataObj.selectedRecord = mService.dSource.cache[ele.attr("data-ms-uid-src")].getByUid(ele.attr("data-ms-uid"));
                    };
                    mService.page.change(ele.attr("data-ms-changepageid"), dataObj);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteClick: function (ele, evt) {
                var scrID,
                controllerObj;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (mService.app.confirmMessage("delete_location", scrID)) {
                        mService.containR.variable[scrID].selectedRecord = mService.dSource.cache[ele.attr("data-ms-uid-src")].getByUid(ele.attr("data-ms-uid"));
                        if (controllerObj.delete.online === "true") {
                            if (window.navigator.onLine) {
                                mService.dSource.saveCustomInfo({
                                    scrID: scrID,
                                    inAppCode: "",
                                    successToast: true,
                                    failureToast: true,
                                }, {
                                    code: "'" + controllerObj.delete.infoCode + "'",
                                    ref1: "'" + controllerObj.delete.infoRefNo1 + "'",
                                    ref2: "'" + controllerObj.delete.infoRefNo2 + "'",
                                    headerXml: controllerObj.delete.headerInput,
                                    recTstamp: "'" + controllerObj.delete.timestamp + "'",
                                    saveMode: "'" + controllerObj.delete.mode + "'"
                                }, function () {
                                    try {
                                        mService.dSource.cache[ele.attr("data-ms-uid-src")].remove(mService.containR.variable[scrID].selectedRecord);
                                        mService.containR.pattern.listview.util.updateLocalDataSource(controllerObj, ele.attr("data-ms-uid-src"), function () {
                                            try {
                                                $("#" + scrID + "_content").html(mService.config.template.getRenderedHtml(scrID + "_listview_template", mService.dSource.cache[ele.attr("data-ms-uid-src")].data()));
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.app.showToast("delete_dsrc_error", scrID);
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function (errorMsg) {
                                    try {
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                mService.app.showToast("internet_connection_error", "system_messages");
                            }
                        } else {
                            mService.queue.setData(scrID, controllerObj, {
                                url: "/api/common_modules/save_manage_custom_info",
                                key: scrID,
                                subkey: mService.containR.variable[scrID].transNo,
                                datasource: mService.containR.variable[scrID].attachedFilesList,
                                input: mService.dSource.util.getInputObject({
                                    inputparam_header: {
                                        p_custom_info_code: "'" + controllerObj.delete.infoCode + "'",
                                        p_custom_info_ref_no1: "'" + controllerObj.delete.infoRefNo1 + "'",
                                        p_custom_info_ref_no2: "'" + controllerObj.delete.infoRefNo2 + "'",
                                        p_inputparam_header_xml: controllerObj.delete.headerInput,
                                        p_save_mode: "'" + controllerObj.delete.mode + "'",
                                        p_rec_timestamp: "'" + controllerObj.delete.timestamp + "'"
                                    }
                                })
                            }, function (e) {
                                try {
                                    mService.dSource.cache[ele.attr("data-ms-uid-src")].remove(mService.containR.variable[scrID].selectedRecord);
                                    mService.containR.pattern.listview.util.updateLocalDataSource(controllerObj, ele.attr("data-ms-uid-src"), function () {
                                        try {
                                            $("#" + scrID + "_content").html(mService.config.template.getRenderedHtml(scrID + "_listview_template", mService.dSource.cache[ele.attr("data-ms-uid-src")].data()));
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.app.showToast("delete_dsrc_error", scrID);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (e) {
                                try {
                                    mService.app.showToast("delete_dsrc_error", scrID);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            editClick: function (ele, evt) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            viewClick: function (ele, evt) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        form: {
            previewClick: function (ele, evt) {
                var scrID;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    mService.containR.variable[scrID].submitBtnClickInd = false;
                    mService.presentR.pattern.form.preview.showPreviewPopup(scrID);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            saveClick: function (ele, evt) {
                var scrID;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo + "/" + scrID + "_draft.json", JSON.stringify(mService.containR.pattern.form.util.getInputparam(scrID, {
                                scrID: scrID
                            })), function () {
                        try {
                            mService.app.showToast("save_draft_success", scrID);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.app.showToast("save_draft_error", scrID);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            openDocClick: function (ele, evt) {
                var paramObj;
                try {
                    if (ele.attr("data-ms-containr-param") !== undefined) {
                        paramObj = JSON.parse(ele.attr("data-ms-containr-param"));
                        if (paramObj.downloadInfo === undefined) {
                            if (paramObj.docType === "P") {
                                if (mService.util.validateURL(paramObj.docSrc) || (paramObj.docSrc).split('.').pop() === "html") {
                                    if (!window.navigator.onLine) {
                                        mService.app.showToast("internet_connection_error", "system_messages");
                                    };
                                    mService.page.change("view", paramObj);
                                } else {
                                    mService.nfs.openFile((paramObj.docSrc).replace('file:///storage/emulated/0/Android/data/' + mService.app.id + '/files/', ""), function () {
                                        try {
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.spinner.hide();
                                            mService.app.showToast("file_open_error", "system_messages");
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                }
                            } else {
                                if (!window.navigator.onLine) {
                                    mService.app.showToast("internet_connection_error", "system_messages");
                                };
                                mService.page.change("view", paramObj);
                            }
                        } else {
                            if (paramObj.downloadInfo === "success") {
                                if (paramObj.docType === "P") {
                                    if (mService.util.validateURL(paramObj.docSrc) || (paramObj.docSrc).split('.').pop() === "html") {
                                        mService.page.change("view", paramObj);
                                    } else {
                                        mService.nfs.openFile((paramObj.docSrc).replace('file:///storage/emulated/0/Android/data/' + mService.app.id + '/files/', ""), function () {
                                            try {
                                                return true;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.spinner.hide();
                                                mService.app.showToast("file_open_error", "system_messages");
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    }
                                } else {
                                    if (!window.navigator.onLine) {
                                        mService.app.showToast("internet_connection_error", "system_messages");
                                    };
                                    mService.page.change("view", paramObj);
                                }
                            } else if (paramObj.downloadInfo === "offline") {
                                mService.app.showToast("attachment_not_downloaded_offline", "system_messages");
                            } else if (paramObj.downloadInfo === "failure") {
                                mService.app.showToast("attachment_not_downloaded_failure", "system_messages");
                            }
                        }
                    } else {
                        mService.page.change("view", {});
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submitClick: function (ele, evt, scrID) {
                var controllerObj,
                attachedFiles;
                try {
                    scrID = (scrID === undefined) ? mService.app.getScreenId() : scrID;
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (mService.containR.variable[scrID].submitInAction === undefined) {
                        mService.containR.variable[scrID].submitInAction = false;
                    };
                    if (!mService.containR.variable[scrID].submitInAction) {
                        mService.containR.variable[scrID].submitInAction = true;
                        if (controllerObj.showUI !== undefined && controllerObj.showUI === "false") {
                            mService.containR.pattern.form.submit.processSubmit(scrID, controllerObj);
                        } else {
                            if (mService.containR.variable[scrID].validator[scrID].validate()) {
                                if (scrID.endsWith("attachments_new")) {
                                    attachedFiles = mService.containR.pattern.form.util.getAttachmentData(scrID, false);
                                    if (attachedFiles.length > 0) {
                                        mService.containR.pattern.form.submit.processSubmit(scrID, controllerObj);
                                    } else {
                                        mService.containR.variable[scrID].submitInAction = false;
                                        mService.app.showToast("attachment_not_added_error", scrID);
                                    }
                                } else {
                                    mService.containR.pattern.form.submit.processSubmit(scrID, controllerObj);
                                }
                            } else {
                                mService.containR.variable[scrID].submitInAction = false;
                                mService.app.showToast("form_fields_mandatory_alert", scrID);
                            };
                        }
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        listview: {
            actionMenuClick: function (ele, evt) {
                var paramObj,
                selectedRecord,
                scrID,
                actionScrID,
                controllerObj,
                dSourceKey;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    paramObj = JSON.parse(ele.attr("data-ms-containr-param"));
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    dSourceKey = scrID + "_list";
                    if (paramObj !== undefined) {
                        actionScrID = paramObj.feature_screen_id;
                        selectedRecord = mService.dSource.cache[dSourceKey].getByUid(paramObj.list_uid);
                        mService.containR.variable[scrID].selectedRecord = selectedRecord;
                        if (mService.config.rule.executeRuleStatements({
                                screenID: scrID,
                                objectID: "button",
                                eventID: "click",
                                fieldID: actionScrID
                            })) {
                            if (controllerObj.presentR !== undefined && controllerObj.presentR.workflow_actions_type !== undefined && controllerObj.presentR.workflow_actions_type === "popup") {
                                mService.presentR.pattern.listview.wFlow.actionsPopup.close(scrID);
                            };
                            mService.page.change(actionScrID, {
                                dSourceKey: dSourceKey,
                                selectedRecord: selectedRecord,
                                listScreenId: scrID,
                                selectedFeatureScreenID: actionScrID
                            });
                        }
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actionsPopupClick: function (ele, evt) {
                var selectedRecord,
                patternScrID;
                try {
                    scrID = mService.app.getScreenId();
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    patternScrID = mService.app.getScreenId().replace("_list", "");
                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                        selectedRecord = mService.dSource.cache[mService.app.getScreenId()].getByUid($(ele).attr("data-ms-uid"));
                        mService.containR.variable[patternScrID].selectedRecord = selectedRecord;
                        mService.containR.pattern.listview.wFlow.getEvents(mService.app.getScreenId(), selectedRecord, function (wFlowEventsHtml) {
                            try {
                                if (wFlowEventsHtml !== "") {
                                    mService.presentR.pattern.listview.wFlow.actionsPopup.open(mService.app.getScreenId(), wFlowEventsHtml);
                                } else {
                                    mService.app.showToast("workflow_actions_not_available", "system_messages");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        selectedRecord = mService.dSource.cache[scrID + "_list"].getByUid($(ele).attr("data-ms-uid"));
                        mService.containR.variable[scrID].selectedRecord = selectedRecord;
                        mService.containR.pattern.listview.actions.getMenus(mService.app.getScreenId(), selectedRecord, function (wFlowEventsHtml) {
                            try {
                                if (wFlowEventsHtml !== "") {
                                    mService.presentR.pattern.listview.wFlow.actionsPopup.open(mService.app.getScreenId(), wFlowEventsHtml);
                                } else {
                                    mService.app.showToast("workflow_actions_not_available", "system_messages");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            callInfoPopupClick: function (ele, evt) {
                try {
                    mService.presentR.pattern.listview.callInfo.showCallInfo(mService.app.getScreenId());
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteClick: function (ele, evt) {
                var scrID,
                controllerObj,
                paramObj,
                selectedRecord,
                dSourceKey,
                uid;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    dSourceKey = ele.attr("data-ms-uid-src");
                    uid = ele.attr("data-ms-uid");
                    $("<div></div>").msDialog({
                        content: mService.config.template.getTransformedMessage(mService.config.label.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]["confirmMessages"]["delete_confirm"]),
                        actions: {
                            "CANCEL": {
                                text: "<i class='fas " + mService.icons.draft.cancel + "'></i>",
                                action: function (e) {
                                    try {
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }
                            },
                            "Save": {
                                text: "<i class='far far fa-check'></i>",
                                action: function (e) {
                                    try {
                                        mService.spinner.show();
                                        selectedRecord = mService.dSource.cache[ele.attr("data-ms-uid-src")].getByUid(ele.attr("data-ms-uid"));
                                        paramObj = JSON.parse(ele.attr("data-ms-containr-param"));
                                        if (controllerObj.delete.online === "true") {
                                            if (window.navigator.onLine) {
                                                mService.containR.pattern.form.util.getLocationData(controllerObj, function (latitude, longitude) {
                                                    try {
                                                        mService.containR.pattern.form.util.checkDateTimeSettings(scrID, controllerObj, function () {
                                                            try {
                                                                mService.util.getNewDate(function (date) {
                                                                    try {
                                                                        mService.containR.pattern.form.util.deleteAttachmentFileOnline(paramObj.file_name, selectedRecord.path, scrID, controllerObj, function () {
                                                                            var inputData;
                                                                            try {
                                                                                inputData = {};
                                                                                inputData.channel_id = mService.app.channel;
                                                                                inputData.event_date = mService.util.getDateTimeString(date, "HH");
                                                                                inputData.event_hour = mService.util.getDateTimeString(date, "HH");
                                                                                inputData.event_minute = mService.util.getDateTimeString(date, "mm");
                                                                                inputData.event_second = mService.util.getDateTimeString(date, "ss");
                                                                                inputData.event_latitude = latitude;
                                                                                inputData.event_longitude = longitude;
                                                                                mService.dSource.saveCustomInfo({
                                                                                    scrID: scrID,
                                                                                    inAppCode: "",
                                                                                    successToast: true,
                                                                                    failureToast: true,
                                                                                }, {
                                                                                    code: "'" + controllerObj.delete.infoCode + "'",
                                                                                    ref1: "'" + controllerObj.delete.infoRefNo1 + "'",
                                                                                    ref2: "'" + controllerObj.delete.infoRefNo2 + "'",
                                                                                    headerXml: "'" + JSON.stringify($.extend(true, inputData, {
                                                                                            "transaction_type": paramObj.transaction_type,
                                                                                            "transaction_ref_no": (mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no),
                                                                                            "file_id": paramObj.file_id,
                                                                                            "file_name": paramObj.file_name
                                                                                        })) + "'",
                                                                                    recTstamp: "'" + controllerObj.delete.timestamp + "'",
                                                                                    saveMode: "'" + controllerObj.delete.mode + "'"
                                                                                }, function () {
                                                                                    var attachmentPath;
                                                                                    try {
                                                                                        attachmentPath = mService.app.getClientId() + '/' + mService.app.getCountryCode() + '/' + 'content_store' + '/' + selectedRecord.path + '/' + ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no)) + "/" + selectedRecord.name;
                                                                                        mService.nfs.deleteFile(attachmentPath, function () {
                                                                                            try {
                                                                                                mService.spinner.hide();
                                                                                                mService.dSource.cache[dSourceKey].remove(mService.dSource.cache[dSourceKey].getByUid(uid));
                                                                                                mService.containR.pattern.listview.util.updateLocalDataSource(controllerObj, ele.attr("data-ms-uid-src"), function () {
                                                                                                    try {
                                                                                                        mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID, false, false);
                                                                                                    } catch (exception) {
                                                                                                        mService.exception.handle(exception);
                                                                                                    }
                                                                                                }, function () {
                                                                                                    try {
                                                                                                        mService.app.showToast("attachment_delete_error", "system_messages");
                                                                                                    } catch (exception) {
                                                                                                        mService.exception.handle(exception);
                                                                                                    }
                                                                                                });
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        }, function () {
                                                                                            try {
                                                                                                mService.spinner.hide();
                                                                                                mService.app.showToast("attachment_delete_error", "system_messages");
                                                                                                return true;
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        });
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                }, function (errorMsg) {
                                                                                    try {
                                                                                        mService.spinner.hide();
                                                                                        return true;
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                });
                                                                            } catch (exception) {
                                                                                mService.exception.handle(exception);
                                                                            }
                                                                        }, function () {
                                                                            try {
                                                                                mService.spinner.hide();
                                                                                return false;
                                                                            } catch (exception) {
                                                                                mService.exception.handle(exception);
                                                                            }
                                                                        });
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                }, function () {
                                                                    try {
                                                                        mService.app.showToast("get_date_error", scrID);
                                                                        mService.spinner.hide();
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                });
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                mService.containR.variable[scrID].submitInAction = false;
                                                                mService.spinner.hide();
                                                                return true;
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.containR.variable[scrID].submitInAction = false;
                                                        mService.spinner.hide();
                                                        return true;
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } else {
                                                mService.app.showToast("internet_connection_error", "system_messages");
                                                mService.spinner.hide();
                                            }
                                        } else {
                                            mService.containR.pattern.form.util.deleteAttachmentFileOffline(paramObj.file_name, selectedRecord.path, scrID, controllerObj, function () {
                                                try {
                                                    mService.queue.setData(scrID, controllerObj, {
                                                        url: "/api/common_modules/save_manage_custom_info",
                                                        key: scrID,
                                                        subkey: "",
                                                        datasource: mService.containR.variable[scrID].attachedFilesList,
                                                        input: mService.dSource.util.getInputObject({
                                                            inputparam_header: {
                                                                p_custom_info_code: "'" + controllerObj.delete.infoCode + "'",
                                                                p_custom_info_ref_no1: "'" + controllerObj.delete.infoRefNo1 + "'",
                                                                p_custom_info_ref_no2: "'" + controllerObj.delete.infoRefNo2 + "'",
                                                                p_inputparam_header_xml: "'" + JSON.stringify({
                                                                    "transaction_type": paramObj.transaction_type,
                                                                    "transaction_ref_no": ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no)),
                                                                    "file_id": paramObj.file_id,
                                                                    "file_name": paramObj.file_name
                                                                }) + ",",
                                                                p_save_mode: "'" + controllerObj.delete.mode + "'",
                                                                p_rec_timestamp: "'" + controllerObj.delete.timestamp + "'"
                                                            }
                                                        })
                                                    }, function (e) {
                                                        var attachmentPath;
                                                        try {
                                                            attachmentPath = mService.app.getClientId() + '/' + mService.app.getCountryCode() + '/' + 'content_store' + '/' + selectedRecord.path + '/' + ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no)) + "/" + selectedRecord.name;
                                                            mService.nfs.deleteFile(attachmentPath, function () {
                                                                try {
                                                                    mService.spinner.hide();
                                                                    mService.app.showToast("attachment_delete_success", "system_messages");
                                                                    mService.dSource.cache[dSourceKey].remove(mService.dSource.cache[dSourceKey].getByUid(uid));
                                                                    mService.containR.pattern.listview.util.updateLocalDataSource(controllerObj, ele.attr("data-ms-uid-src"), function () {
                                                                        try {
                                                                            mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID, false, false);
                                                                        } catch (exception) {
                                                                            mService.exception.handle(exception);
                                                                        }
                                                                    }, function () {
                                                                        try {
                                                                            mService.app.showToast("attachment_delete_error", "system_messages");
                                                                        } catch (exception) {
                                                                            mService.exception.handle(exception);
                                                                        }
                                                                    });
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            }, function () {
                                                                try {
                                                                    mService.spinner.hide();
                                                                    mService.app.showToast("attachment_delete_error", "system_messages");
                                                                    return true;
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            });
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function (e) {
                                                        try {
                                                            mService.spinner.hide();
                                                            mService.app.showToast("attachment_delete_error", "system_messages");
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    mService.spinner.hide();
                                                    return false;
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                                primary: true
                            }
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            listrowClick: function (ele, evt) {
                var paramObj,
                selectedRecord,
                controllerObj,
                dSourceKey,
                scrID;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    paramObj = JSON.parse(ele.attr("data-ms-containr-param"));
                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                        dSourceKey = scrID;
                    } else {
                        dSourceKey = scrID + "_list";
                    };
                    if (paramObj !== undefined) {
                        selectedRecord = mService.dSource.cache[dSourceKey].getByUid(paramObj.list_uid);
                        mService.page.change("list_detail", {
                            selectedRecord: selectedRecord,
                            listScreenId: scrID
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            syncClick: function (ele, evt) {
                var scrID,
                controllerObj,
                patternScrID;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                        patternScrID = scrID.replace("_list", "");
                    } else {
                        patternScrID = scrID;
                    };
                    mService.spinner.show();
                    setTimeout(function () {
                        try {
                            mService.containR.util.getQueueSyncIndicator("", function (ind) {
                                try {
                                    if (ind === "true") {
                                        if (ele === undefined) {
                                            mService.containR.pattern.listview.util.refreshListview(scrID, false, true);
                                        } else {
                                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                                mService.pattern.workflow.loadDefaultCache(scrID, true, function () {
                                                    try {
                                                        mService.containR.pattern.listview.util.refreshListview(scrID, false, true);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.app.showToast("default_cache_error", "system_messages");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } else {
                                                mService.containR.pattern.listview.util.refreshListview(scrID, true, false);
                                            }
                                        }
                                    } else if (ind === "false") {
                                        mService.containR.variable[patternScrID].syncInd = false;
                                        if (ele !== undefined) {
                                            mService.app.showToast("call_sync_pending", "system_messages");
                                        }
                                    } else {
                                        if (ele !== undefined) {
                                            mService.app.showToast("internet_connection_error", "system_messages");
                                        }
                                    };
                                    mService.spinner.hide();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (error_code) {
                                try {
                                    mService.spinner.hide();
                                    if (ele !== undefined) {
                                        mService.app.showToast(error_code, "system_messages");
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 100);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            wflowEventClick: function (ele, evt, notificationInd, screenID, callItem) {
                var paramObj,
                selectedRecord,
                controllerObj,
                scrID,
                selectedFeatureID,
                wFlow,
                eventScrID,
                data,
                workFlowEventsKey,
                call_category,
                call_type,
                call_wf_stage,
                call_status,
                call_status_desc,
                screenIDToOpen,
                dSourceKey,
                feature;
                try {
                    if (notificationInd !== undefined) {
                        scrID = screenID + "_list";
                        paramObj = {
                            "feature_id": "MCALLDETAILS"
                        };
                        selectedRecord = callItem;
                    } else {
                        scrID = mService.application.view().id.replace("#", "");
                        paramObj = JSON.parse(ele.attr("data-ms-containr-param"));
                    };
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                        patternScrID = scrID.replace("_list", "");
                        dSourceKey = scrID;
                        workFlowEventsKey = scrID + "_" + "workflow_event_verb";
                        if (controllerObj.presentR !== undefined && controllerObj.presentR.workflow_actions_type !== undefined && controllerObj.presentR.workflow_actions_type === "popup" && notificationInd === undefined) {
                            mService.presentR.pattern.listview.wFlow.actionsPopup.close(scrID);
                        }
                    } else {
                        patternScrID = scrID;
                        dSourceKey = scrID + "_list";
                        workFlowEventsKey = controllerObj.workFlowEventsKey;
                    };
                    if (paramObj !== undefined) {
                        selectedFeatureID = paramObj.feature_id;
                        if (notificationInd === undefined) {
                            selectedRecord = mService.dSource.cache[dSourceKey].getByUid(paramObj.list_uid);
                        };
                        data = mService.dSource.cache[workFlowEventsKey];
                        eventScrID = $.grep(mService.app.getFuncAccess(), function (e, i) {
                            try {
                                return e.p_child_feature_id_or_group === selectedFeatureID;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        })[0].p_child_screen_id;
                        call_category = (selectedRecord.call_category === undefined) ? (selectedRecord.request_category) : (selectedRecord.call_category);
                        call_type = (selectedRecord.call_type === undefined) ? (selectedRecord.request_type) : (selectedRecord.call_type);
                        call_wf_stage = (selectedRecord.call_wf_stage === undefined) ? (selectedRecord.request_wf_stage) : (selectedRecord.call_wf_stage);
                        call_status = (selectedRecord.call_status === undefined) ? (selectedRecord.request_status) : (selectedRecord.call_status);
                        call_status_desc = (selectedRecord.call_status_desc === undefined) ? (selectedRecord.request_status_desc) : (selectedRecord.call_status_desc);
                        if (data !== undefined) {
                            wFlow = $.grep(data.data(), function (e, i) {
                                try {
                                    return ((e.event_verb == eventScrID && e.req_catg == call_category && e.req_type == call_type && e.from_wf_stage == call_wf_stage && e.from_wf_status == call_status) || (e.event_verb == eventScrID && e.req_catg == call_category && e.req_type == 'ALL' && e.from_wf_stage == call_wf_stage && e.from_wf_status == call_status) || (e.event_verb == eventScrID && e.req_catg == 'ALL' && e.req_type == 'ALL' && e.from_wf_stage == call_wf_stage && e.from_wf_status == call_status))
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            })[0];
                        };
                        if (mService.config.rule.executeRuleStatements({
                                screenID: patternScrID,
                                objectID: "button",
                                eventID: "click",
                                fieldID: "workflow_event"
                            })) {
                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                screenIDToOpen = eventScrID.toLowerCase();
                            } else {
                                screenIDToOpen = selectedFeatureID;
                            };
                            mService.containR.variable[patternScrID].eventclicked = true;
                            if (wFlow !== undefined) {
                                mService.app.notificationData = "";
                                mService.page.change(patternScrID + "_" + screenIDToOpen, {
                                    dSourceKey: dSourceKey,
                                    selectedRecord: selectedRecord,
                                    listScreenId: scrID,
                                    featureID: selectedFeatureID,
                                    eventVerbID: wFlow.event_verb,
                                    to_wf_stage: wFlow.to_wf_stage,
                                    to_wf_status: wFlow.to_wf_status,
                                    to_wf_status_desc: wFlow.to_wf_status_desc,
                                    last_accessed_feature: paramObj.feature_id
                                });
                            } else {
                                feature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                    try {
                                        return e.p_child_feature_id_or_group === paramObj.feature_id;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                })[0];
                                if (controllerObj.pattern !== undefined && controllerObj.pattern === "true" && (eventScrID === "details" || eventScrID === "attachments")) {
                                    mService.spinner.show();
                                    if (selectedRecord.attachmentSyncInd !== undefined && selectedRecord.attachmentSyncInd === "false") {
                                        mService.dSource.downloadCallAttachments(selectedRecord, dSourceKey, selectedRecord.uid, function () {
                                            var listData;
                                            try {
                                                listData = mService.dSource.cache[dSourceKey].data();
                                                for (listItem = 0; listItem < listData.length; listItem++) {
                                                    if (listData[listItem].request_ref_no === selectedRecord.request_ref_no) {
                                                        listData[listItem].attachmentSyncInd = "true";
                                                        break;
                                                    }
                                                };
                                                mService.dSource.util.localWrite(dSourceKey, listData, function (data) {
                                                    try {
                                                        mService.containR.util.openWorkflowSubScreens(paramObj, feature, selectedRecord, selectedFeatureID, dSourceKey, scrID, screenIDToOpen, patternScrID, dSourceKey, controllerObj, call_wf_stage, call_status, call_status_desc);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    };
                                                }, function () {
                                                    try {
                                                        mService.containR.util.openWorkflowSubScreens(paramObj, feature, selectedRecord, selectedFeatureID, dSourceKey, scrID, screenIDToOpen, patternScrID, dSourceKey, controllerObj, call_wf_stage, call_status, call_status_desc);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    };
                                                });
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        mService.containR.util.openWorkflowSubScreens(paramObj, feature, selectedRecord, selectedFeatureID, dSourceKey, scrID, screenIDToOpen, patternScrID, dSourceKey, controllerObj, call_wf_stage, call_status, call_status_desc);
                                    };
                                } else {
                                    mService.app.notificationData = "";
                                    mService.page.change(patternScrID + "_" + screenIDToOpen, {
                                        dSourceKey: dSourceKey,
                                        selectedRecord: selectedRecord,
                                        listScreenId: scrID,
                                        featureID: selectedFeatureID,
                                        eventVerbID: (feature !== undefined) ? (feature.p_child_feature_display_label) : ("Not Available"),
                                        last_accessed_feature: paramObj.feature_id,
                                        to_wf_stage: call_wf_stage,
                                        to_wf_status: call_status,
                                        to_wf_status_desc: call_status_desc
                                    });
                                }
                            }
                        }
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            filterClick: function (ele, evt) {
                var scrID,
                filterWidgets,
                filterParentObj,
                filterChildObj,
                filterValues,
                index,
                filterValueIndex;
                try {
                    scrID = mService.app.getScreenId();
                    controllerObj = mService.config.controller.getControllerObj(scrID.replace(/_list$/, "").replace(/_details$/, ""));
                    if (controllerObj.pattern_name !== undefined && controllerObj.pattern_name === "searchview") {
                        mService.pattern.searchview.detail.button.filter(scrID);
                    } else {
                        mService.containR.pattern.listview.util.getDataSourceForFilter(scrID, function (dataSource) {
                            try {
                                filterWidgets = $("#home_functional_drawer_filter_content").find('[data-ms-widget-type="msCheckboxgroup"]');
                                filterParentObj = {
                                    logic: 'and',
                                    filters: []
                                };
                                for (index = 0; index < filterWidgets.length; index++) {
                                    filterValues = $(filterWidgets[index]).getVal();
                                    filterChildObj = {
                                        logic: 'or',
                                        filters: []
                                    };
                                    for (filterValueIndex = 0; filterValueIndex < filterValues.length; filterValueIndex++) {
                                        filterChildObj.filters.push({
                                            field: $(filterWidgets[index]).attr("id").replace(scrID + "_filter_", ""),
                                            operator: 'eq',
                                            value: filterValues[filterValueIndex]
                                        });
                                    };
                                    if (filterChildObj.filters.length > 0) {
                                        filterParentObj.filters.push(filterChildObj);
                                    }
                                };
                                if (filterParentObj.filters.length > 0) {
                                    mService.api.filter.apply(filterParentObj, dataSource, scrID);
                                } else {
                                    mService.app.showToast("filter_no_options_selected", "system_messages");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("filter_local_read_error", "system_messages");
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            clearFilterClick: function (ele, evt) {
                var scrID,
                filterObj,
                filterBtnEle,
                controllerObj,
                dSourceKey;
                try {
                    scrID = mService.app.getScreenId();
                    controllerObj = mService.config.controller.getControllerObj(scrID.replace(/_list$/, "").replace(/_details$/, ""));
                    if (controllerObj.pattern_name !== undefined && controllerObj.pattern_name === "searchview") {
                        mService.pattern.searchview.detail.button.clearFilter(scrID);
                    } else {
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                            patternScrID = scrID.replace("_list", "");
                            dSourceKey = scrID;
                        } else {
                            patternScrID = scrID;
                            dSourceKey = scrID + "_list";
                        };
                        filterWidgets = $("#home_functional_drawer_filter_content").find('[type="checkbox"]').prop("checked", false);
                        filterObj = mService.containR.variable[patternScrID].datasource.filterObj;
                        if (filterObj !== undefined && filterObj.filters !== undefined) {
                            mService.containR.variable[patternScrID].datasource.filterObj = {};
                            mService.dSource.cache[dSourceKey] = undefined;
                            mService.containR.variable[patternScrID].activePage = 0;
                            mService.containR.pattern.listview.util.refreshListview(scrID, false, false);
                        };
                        mService.util.closeFilterDrawer();
                        filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                        if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                            $(filterBtnEle).removeClass("msPattern_workflow_action_icons_active").addClass("msPattern_workflow_action_icons_default");
                        } else {
                            $(filterBtnEle).removeClass("ms_filter_fab_active").addClass("ms_filter_fab_default");
                        };
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            clearSearchClick: function (ele, evt) {
                var scrID;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    $("#" + scrID + "_search_box").val("");
                    $("#" + scrID + "_clear_btn").hide();
                    $("#" + scrID + "_empty_state_image").hide();
                    $('#' + scrID + '_main_page').children().show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            search: function (ele, evt) {
                var scrID,
                searchQuery,
                noDataFound;
                try {
                    noDataFound = true;
                    searchQuery = $(ele).val().toLowerCase().trim();
                    scrID = mService.application.view().id.replace("#", "");
                    $("#" + scrID + "_empty_state_image").hide();
                    $("#" + scrID + "_clear_btn").show();
                    if (searchQuery !== "") {
                        $('#' + scrID + '_main_page').children().each(function (index) {
                            var text;
                            try {
                                if (index === 0) {
                                    return true;
                                };
                                kendo.fx($(this)).slideIn("up").stop();
                                text = $(this).text().toLowerCase();
                                if (text.includes(searchQuery)) {
                                    kendo.fx($(this)).slideIn("up").duration(500).play().then(function () {
                                        try {
                                            $(this).show();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                    noDataFound = false;
                                } else {
                                    $(this).hide();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#" + scrID + "_clear_btn").hide();
                        kendo.fx($('#' + scrID + '_main_page').children().not(':first')).slideIn("up").duration(500).play().then(function () {
                            try {
                                $('#' + scrID + '_main_page').children().show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        noDataFound = false;
                    };
                    if (noDataFound) {
                        $('#' + scrID + '_main_page').children().not(':first').hide();
                        $("#" + scrID + "_empty_state_image").show();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        misc: {
            showDeviceLocationClick: function (ele, evt) {
                var dataObj;
                try {
                    if (ele.attr("data-ms-containr-param") !== undefined) {
                        dataObj = JSON.parse(ele.attr("data-ms-containr-param"));
                        if (dataObj.deviceID !== "") {
                            mService.containR.util.deviceLocation.showMap(dataObj);
                        } else {
                            mService.app.showToast("location_device_id_not_available", "system_messages");
                        }
                    } else {
                        mService.app.showToast("location_template_error", "system_messages");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        page: {
            changeClick: function (ele, evt) {
                var dataObj;
                try {
                    dataObj = {};
                    if (ele.attr("data-ms-containr-param") !== undefined) {
                        $.extend(true, dataObj, JSON.parse(ele.attr("data-ms-containr-param")));
                    };
                    if (ele.attr("data-ms-uid") !== undefined) {
                        dataObj.selectedRecord = mService.dSource.cache[ele.attr("data-ms-uid-src")].getByUid(ele.attr("data-ms-uid"));
                    };
                    mService.page.change(ele.attr("data-ms-changepageid"), dataObj);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        rule: {
            executeRuleClick: function (ele, evt) {
                try {
                    mService.config.rule.executeRuleStatements({
                        screenID: mService.app.getScreenId(),
                        objectID: "button",
                        eventID: "click",
                        fieldID: ele.attr("id")
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        security_code_verification: {
            submitClick: function (ele, evt) {
                try {
                    mService.security.security_code_verification.button.submit(ele, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            resendClick: function (ele, evt) {
                try {
                    mService.security.security_code_verification.button.resend(ele, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        signup: {
            submitClick: function (ele, evt) {
                try {
                    mService.auth.signup.button.submit(ele, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        forgot_password: {
            submitClick: function (ele, evt) {
                try {
                    mService.settings.forgot_password.button.submit(ele, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        change_password: {
            submitClick: function (ele, evt) {
                try {
                    mService.settings.change_password.button.submit(ele, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        login: {
            submitClick: function (ele, evt) {
                try {
                    mService.auth.login.button.submit(ele, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            showPasswordClick: function (ele, evt) {
                try {
                    mService.auth.login.button.showPassword(ele, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        welcome: {
            appmodeClick: function (ele, evt) {
                try {
                    mService.settings.welcome.button.appmodeClick(ele, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            environmentClick: function (ele, evt) {
                try {
                    mService.settings.welcome.button.environmentClick(ele, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        }
    },
    config: {
        draft: {
            apply: function (scrID, firstPageIndicator) {
                var subPageList,
                pageIndex,
                fieldIndex,
                wId,
                wType,
                draftData,
                fields;
                try {
                    draftData = mService.containR.variable[scrID].draftData;
                    if (draftData !== undefined && draftData !== "") {
                        subPageList = $("#" + scrID + " [data-role='page']");
                        pageIndex = (firstPageIndicator) ? 0 : 1;
                        for (pageIndex; pageIndex < subPageList.length; pageIndex++) {
                            fields = $(subPageList[pageIndex]).find(mService.widgets.init.wSelector);
                            for (fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
                                wId = fields[fieldIndex].id;
                                wType = $("#" + fields[fieldIndex].id).attr("data-ms-widget-type");
                                if ($("#" + wId).attr("data-ms-widget-msloop") === undefined || $("#" + wId).attr("data-ms-widget-msloop") === "") {
                                    if ($("#" + wId).attr("data-ms-widget-type") === "msTimebox") {
                                        $("#" + wId).setVal(draftData[wId.replace(scrID + "_", "") + "_hour"] + ":" + draftData[wId.replace(scrID + "_", "") + "_minute"] + ":" + draftData[wId.replace(scrID + "_", "") + "_second"]);
                                    } else {
                                        if (draftData[wId.replace(scrID + "_", "")] !== undefined) {
                                            $("#" + wId).setVal(draftData[wId.replace(scrID + "_", "")]);
                                        };
                                    }
                                };
                            };
                            if (firstPageIndicator) {
                                pageIndex = subPageList.length;
                            }
                        };
                        mService.containR.variable[scrID].valueChangeIndicator = false;
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        rule: {
            apply: function (scrID) {
                var subpagesList,
                id;
                try {
                    if (mService.containR.variable[scrID].validator === undefined) {
                        mService.containR.variable[scrID].validator = {};
                    };
                    mService.containR.variable[scrID].validator[scrID] = mService.config.rule.apply(scrID);
                    subpagesList = $("#" + scrID + "_main_page" + " [data-role = 'page']");
                    for (index = 0; index < subpagesList.length; index++) {
                        id = $(subpagesList[index]).attr("id");
                        mService.containR.variable[scrID].validator[id] = mService.config.rule.executeConfiguredRules(id);
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        util: {
            loadConfigData: function (scrID, success, failure) {
                try {
                    mService.containR.config.util.getConfigFiles(scrID, mService.containR.variable.configFilesList[mService.containR.variable.configFilesListCounter], function () {
                        try {
                            mService.containR.variable.configFilesListCounter++;
                            if (mService.containR.variable.configFilesListCounter < mService.containR.variable.configFilesList.length) {
                                mService.containR.config.util.loadConfigData(scrID, function () {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function (err) {
                                    try {
                                        failure();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                mService.containR.variable.configFilesListCounter = 0;
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.containR.variable.configFilesListCounter++;
                            if (mService.containR.variable.configFilesListCounter < mService.containR.variable.configFilesList.length) {
                                mService.containR.config.util.loadConfigData(scrID, function () {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function (err) {
                                    try {
                                        failure();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                mService.containR.variable.configFilesListCounter = 0;
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getConfigFiles: function (scrID, configFileName, success, failure) {
                try {
                    mService.config[configFileName].get(scrID, function () {
                        try {
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        }
    },
    init: function (scrID) {
        var controllerObj;
        try {
            if (mService.containR.variable[scrID] === undefined) {
                mService.containR.variable[scrID] = {};
            };
            if (mService.containR.dSource[scrID] === undefined) {
                mService.containR.dSource[scrID] = {};
            };
            if (mService.containR.variable[scrID].nonUIFormFields === undefined) {
                mService.containR.variable[scrID].nonUIFormFields = {};
            };
            mService.config.controller.get(scrID, function () {
                try {
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    mService.containR.variable[scrID].controller = controllerObj;
                    if (controllerObj.cacheUsed !== undefined && controllerObj.cacheUsed !== "") {
                        mService.spinner.show();
                        mService.containR.util.checkCacheData(controllerObj.cacheUsed.split(","), function () {
                            try {
                                mService.spinner.hide();
                                mService.containR.util.handleContainRType(controllerObj, scrID);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.containR.util.handleContainRType(controllerObj, scrID);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function () {
                try {
                    if (scrID.endsWith("_details")) {
                        mService.config.controller.get(scrID.replace(/_details$/, ""), function () {
                            try {
                                controllerObj = mService.config.controller.getControllerObj(scrID.replace(/_details$/, ""));
                                mService.containR.variable[scrID].controller = controllerObj;
                                if (controllerObj.cacheUsed !== undefined && controllerObj.cacheUsed !== "") {
                                    mService.spinner.show();
                                    mService.containR.util.checkCacheData(controllerObj.cacheUsed.split(","), function () {
                                        try {
                                            mService.spinner.hide();
                                            mService.containR.util.handleContainRType(controllerObj, scrID, true);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.containR.util.handleContainRType(controllerObj, scrID);
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("load_controller_file_error", scrID);
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.app.showToast("load_controller_file_error", scrID);
                    };
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    initChat: function (scrID) {
        try {
            mService.containR.config.util.loadConfigData(scrID, function () {
                try {
                    mService.presentR.pattern.chat.loadChatview(scrID);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (err) {
                try {
                    mService.app.showToast("load_config_files_error", scrID);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    initForm: function (scrID) {
        var transNo,
        controllerObj;
        try {
            mService.containR.variable[scrID].draftSavedInd = false;
            mService.containR.variable[scrID].draftValueObj = {};
            mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + "transaction_key.txt", function (data) {
                try {
                    mService.util.getNewDate(function (date) {
                        try {
                            transNo = ((data === "" || data === undefined) ? (mService.app.getUserId() + "_" + kendo.toString(date, "ddMMyyHH")) : (kendo.template(data)({})));
                            mService.containR.pattern.form.draft.loadData(scrID, transNo, function () {
                                try {
                                    mService.containR.variable[scrID].draftInd = "true";
                                    mService.containR.variable[scrID].transNo = transNo;
                                    mService.config.controller.get(scrID, function () {
                                        try {
                                            controllerObj = mService.config.controller.getControllerObj(scrID);
                                            mService.config.controller.getContainRFormProperties(scrID, controllerObj, date);
                                            mService.containR.pattern.form.init.setPathValue(scrID);
                                            mService.containR.config.util.loadConfigData(scrID, function () {
                                                try {
                                                    mService.presentR.pattern.form.init.loadForm(scrID);
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function (err) {
                                                try {
                                                    mService.app.showToast("load_config_files_error", scrID);
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.app.showToast("load_controller_file_error", scrID);
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.config.controller.get(scrID, function () {
                                        try {
                                            controllerObj = mService.config.controller.getControllerObj(scrID);
                                            if (controllerObj.saveDraft === "true") {
                                                mService.containR.variable[scrID].draftInd = "true";
                                                mService.containR.pattern.form.init.util.copyConfigFiles(scrID, transNo, function () {
                                                    try {
                                                        mService.config.controller.get(scrID, function () {
                                                            try {
                                                                controllerObj = mService.config.controller.getControllerObj(scrID);
                                                                mService.config.controller.getContainRFormProperties(scrID, controllerObj, date);
                                                                mService.containR.pattern.form.init.setPathValue(scrID);
                                                                mService.containR.config.util.loadConfigData(scrID, function () {
                                                                    try {
                                                                        mService.presentR.pattern.form.init.loadForm(scrID);
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                }, function (err) {
                                                                    try {
                                                                        mService.app.showToast("load_config_files_error", scrID);
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                });
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                mService.app.showToast("load_controller_file_error", scrID);
                                                                return true;
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } else {
                                                mService.config.controller.getContainRFormProperties(scrID, controllerObj, date);
                                                mService.containR.pattern.form.init.setPathValue(scrID);
                                                mService.containR.config.util.loadConfigData(scrID, function () {
                                                    try {
                                                        mService.presentR.pattern.form.init.loadForm(scrID);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function (err) {
                                                    try {
                                                        mService.app.showToast("load_config_files_error", scrID);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.app.showToast("load_controller_file_error", scrID);
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.app.showToast("get_date_error", scrID);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function () {
                try {
                    mService.config.controller.get(scrID, function () {
                        try {
                            controllerObj = mService.config.controller.getControllerObj(scrID);
                            if (controllerObj.saveDraft === "true") {
                                mService.containR.variable[scrID].draftInd = "true";
                                mService.containR.pattern.form.init.util.createTransactionKeyFile(scrID, controllerObj.transNo, function () {
                                    try {
                                        mService.util.getNewDate(function (date) {
                                            try {
                                                mService.config.controller.getContainRFormProperties(scrID, controllerObj, date);
                                                mService.containR.pattern.form.init.setPathValue(scrID);
                                                mService.containR.pattern.form.draft.loadData(scrID, mService.containR.variable[scrID].transNo, function () {
                                                    try {
                                                        mService.containR.config.util.loadConfigData(scrID, function () {
                                                            try {
                                                                mService.presentR.pattern.form.init.loadForm(scrID);
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function (err) {
                                                            try {
                                                                mService.app.showToast("load_config_files_error", scrID);
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.containR.pattern.form.init.util.copyConfigFiles(scrID, mService.containR.variable[scrID].transNo, function () {
                                                            try {
                                                                mService.containR.config.util.loadConfigData(scrID, function () {
                                                                    try {
                                                                        mService.presentR.pattern.form.init.loadForm(scrID);
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                }, function (err) {
                                                                    try {
                                                                        mService.app.showToast("load_config_files_error", scrID);
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                });
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.app.showToast("get_date_error", scrID);
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.app.showToast("create_trans_key_error", scrID);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                mService.util.getNewDate(function (date) {
                                    try {
                                        mService.config.controller.getContainRFormProperties(scrID, controllerObj, date);
                                        mService.containR.pattern.form.init.setPathValue(scrID);
                                        mService.containR.config.util.loadConfigData(scrID, function () {
                                            try {
                                                mService.presentR.pattern.form.init.loadForm(scrID);
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function (err) {
                                            try {
                                                mService.app.showToast("load_config_files_error", scrID);
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.app.showToast("get_date_error", scrID);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.app.showToast("load_controller_file_error", scrID);
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    initListview: function (scrID) {
        var controllerObj;
        try {
            if (mService.containR.variable[scrID].datasource === undefined) {
                mService.containR.variable[scrID].datasource = {};
            };
            mService.containR.config.util.loadConfigData(scrID, function () {
                try {
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    mService.containR.util.getQueueSyncIndicator("", function (ind) {
                        var autoRefreshInd = false;
                        try {
                            if (ind === "true") {
                                autoRefreshInd = true;
                            } else if (ind === "false") {
                                autoRefreshInd = false;
                            } else {
                                autoRefreshInd = false;
                            };
                            if (controllerObj.containR_subtype === "master") {
                                mService.containR.pattern.listview.util.getMasterDataSource(scrID, controllerObj, false, autoRefreshInd, function (data) {
                                    try {
                                        mService.presentR.pattern.listview.init.loadListview(scrID);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else if (controllerObj.containR_subtype === "workflow") {
                                mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                                    try {
                                        mService.presentR.pattern.listview.init.loadListview(scrID);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, false, autoRefreshInd);
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            if (controllerObj.containR_subtype === "master") {
                                mService.containR.pattern.listview.util.getMasterDataSource(scrID, controllerObj, false, false, function (data) {
                                    try {
                                        mService.presentR.pattern.listview.init.loadListview(scrID);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else if (controllerObj.containR_subtype === "workflow") {
                                mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                                    try {
                                        mService.presentR.pattern.listview.init.loadListview(scrID);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, false, false);
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    })
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (err) {
                try {
                    mService.app.showToast("load_config_files_error", scrID);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    page: {
        afterShow: function (e) {
            var scrollParentView,
            scrID,
            screenGroupID,
            screenViewSubType;
            try {
                scrID = e.view.id.replace("#", "");
                controllerObj = mService.config.controller.getControllerObj(scrID);
                if (controllerObj !== undefined) {
                    if (controllerObj.containR_type === "form") {
                        mService.containR.config.draft.apply(scrID, true);
                        scrollParentView = $("#" + scrID).data("kendoMobileView").scroller;
                        scrollParentView.reset();
                        mService.presentR.config.ui.loadFormPages(scrID, false);
                        mService.presentR.config.label.apply(scrID);
                        mService.containR.config.draft.apply(scrID, false);
                        mService.containR.config.rule.apply(scrID);
                    }
                };
                mService.presentR.config.label.apply(scrID);
                screenViewSubType = $("#" + scrID).attr("data-ms-view-subtype");
                if (screenViewSubType === "form") {
                    screenGroupID = $("#" + scrID).attr("data-ms-view-group");
                    if (scrID === screenGroupID) {
                        mService.presentR.resource.get(screenGroupID, function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    }
                };
                mService.presentR.page.refresh();
                if (controllerObj.containR_type === "chat" && mService.containR.variable[scrID].selectedRecord !== undefined) {
                    $("#" + scrID + "_title_lbl").text(((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no)));
                };
                if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                    mService.pattern.query.util.checkNotificationInd(scrID);
                };
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        beforeHide: function (e) {
            var scrollview,
            scrID;
            try {
                scrID = e.view.id.replace("#", "");
                scrollview = $("#" + scrID + "_main_page").data("kendoMobileScrollView");
                scrollview.destroy();
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        beforeShow: function (e) {
            var controllerObj,
            scrID;
            try {
                scrID = e.view.id.replace("#", "");
                if (mService.containR.variable[scrID] === undefined) {
                    mService.containR.variable[scrID] = {};
                };
                controllerObj = mService.config.controller.getControllerObj(scrID);
                if (controllerObj !== undefined) {
                    if (controllerObj.containR_type === "form") {
                        if (controllerObj.containR_subtype === "content") {
                            mService.containR.pattern.content.init(scrID);
                        } else {
                            mService.presentR.config.ui.apply(scrID);
                        }
                    } else if (controllerObj.containR_type === "listview") {
                        if (controllerObj.containR_subtype === "master") {
                            if ((controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined && controllerObj.presentR.list_type === "scrollview") || (controllerObj.presentR_type !== undefined && controllerObj.presentR_type === "scrollview")) {
                                if (mService.containR.variable[scrID].fromChildForm === undefined || !mService.containR.variable[scrID].fromChildForm) {
                                    if (mService.containR.variable[scrID].datasource.filterObj !== undefined && !$.isEmptyObject(mService.containR.variable[scrID].datasource.filterObj)) {
                                        mService.containR.pattern.listview.util.filter.initListviewWithFilter(scrID, controllerObj, true, false, false);
                                    } else {
                                        mService.presentR.pattern.listview.init.initializeScrollViewList(scrID, false);
                                    }
                                } else {
                                    mService.containR.variable[scrID].fromChildForm = false;
                                    mService.presentR.pattern.util.destroyScrollview(scrID);
                                    if (mService.containR.variable[scrID].datasource.filterObj !== undefined && !$.isEmptyObject(mService.containR.variable[scrID].datasource.filterObj)) {
                                        mService.containR.pattern.listview.util.filter.initListviewWithFilter(scrID, controllerObj, true, false, false);
                                    } else {
                                        mService.presentR.pattern.listview.init.initializeScrollViewList(scrID, false);
                                    }
                                }
                            } else {
                                if (mService.containR.variable[scrID.replace("_list", "")].refreshList !== undefined && mService.containR.variable[scrID.replace("_list", "")].refreshList) {
                                    mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID, true, true);
                                    mService.containR.variable[scrID.replace("_list", "")].refreshList = false;
                                } else {
                                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                        mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID, true, true);
                                    } else {
                                        if (mService.containR.variable[scrID].datasource.filterObj !== undefined && !$.isEmptyObject(mService.containR.variable[scrID].datasource.filterObj)) {
                                            mService.containR.pattern.listview.util.filter.initFreeflowListWithFilter(scrID, controllerObj, true, false, false);
                                        } else {
                                            mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID, false, false);
                                        }
                                    }
                                }
                            }
                        } else if (controllerObj.containR_subtype === "workflow") {
                            if (mService.containR.variable[scrID].fromChildForm === undefined || !mService.containR.variable[scrID].fromChildForm) {
                                if (mService.containR.variable[scrID].datasource.filterObj !== undefined && !$.isEmptyObject(mService.containR.variable[scrID].datasource.filterObj)) {
                                    mService.containR.pattern.listview.util.filter.initListviewWithFilter(scrID, controllerObj, true, false, false);
                                } else {
                                    mService.containR.variable[scrID].syncInd = true;
                                    mService.presentR.pattern.listview.init.initializeScrollViewList(scrID, false);
                                }
                            } else {
                                mService.containR.variable[scrID].fromChildForm = false;
                                mService.presentR.pattern.util.destroyScrollview(scrID);
                                if (mService.containR.variable[scrID].eventclicked !== undefined && mService.containR.variable[scrID].eventclicked) {
                                    mService.containR.variable[scrID].eventclicked = false;
                                    if (mService.containR.variable[scrID].datasource.filterObj !== undefined && !$.isEmptyObject(mService.containR.variable[scrID].datasource.filterObj)) {
                                        mService.containR.pattern.listview.util.filter.initListviewWithFilter(scrID, controllerObj, true, false, false);
                                    } else {
                                        mService.presentR.pattern.listview.init.initializeScrollViewList(scrID, false);
                                    }
                                } else {
                                    if (mService.containR.variable[scrID].datasource.filterObj !== undefined && !$.isEmptyObject(mService.containR.variable[scrID].datasource.filterObj)) {
                                        mService.containR.pattern.listview.util.filter.initListviewWithFilter(scrID, controllerObj, true, false, false);
                                    } else {
                                        mService.presentR.pattern.listview.init.initializeScrollViewList(scrID, false);
                                    }
                                }
                            }
                        }
                    } else if (controllerObj.containR_type === "chat") {
                        mService.presentR.pattern.chat.init(scrID);
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        init: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        show: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    pattern: {
        form: {
            draft: {
                loadData: function (scrID, transNo, success, failure) {
                    try {
                        mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo + "/" + scrID + "_draft" + ".json", function (data) {
                            try {
                                mService.containR.variable[scrID].draftData = JSON.parse(data);
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.containR.variable[scrID].draftData = "";
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                saveFile: function (currentPageNo, scrID, success, failure) {
                    try {
                        mService.containR.variable[scrID].draftValueObj = $.extend({}, mService.containR.variable[scrID].draftValueObj, mService.containR.pattern.form.util.getInputparam(scrID, {
                                    scrID: $("#" + scrID + "_main_page" + " [data-ms-containr-subpage-no='" + currentPageNo + "']").attr("id"),
                                    draftInd: true
                                }));
                        mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo + "/" + scrID + "_draft.json", JSON.stringify(mService.containR.variable[scrID].draftValueObj), function () {
                            try {
                                mService.containR.variable[scrID].valueChangeIndicator = false;
                                if (success !== undefined) {
                                    success();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                if (failure !== undefined) {
                                    failure();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            },
            init: {
                createWidgets: function (widgetsList, scrID) {
                    var field,
                    attributesList,
                    widgetIndex;
                    try {
                        for (widgetIndex = 0; widgetIndex < widgetsList.length; widgetIndex++) {
                            attributesList = $.grep($(widgetsList[widgetIndex]).get(0).attributes, function (e, i) {
                                try {
                                    return e.name.indexOf("data-ms-widget") !== -1;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                            if (attributesList.length > 0) {
                                field = mService.containR.pattern.form.init.util.getFieldProperties(attributesList, widgetsList, widgetIndex);
                                mService.presentR.config.ui.createField({
                                    scrid: scrID,
                                    field: field
                                });
                                mService.config.label.resolve(mService.app.getScreenId());
                            }
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                setPathValue: function (scrID) {
                    try {
                        mService.containR.variable[scrID].docType = mService.containR.variable[scrID].formPath + "/" + mService.containR.variable[scrID].transNo;
                        mService.containR.variable[scrID].appRoot = mService.app.root;
                        mService.containR.variable[scrID].rootPath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                util: {
                    createTransactionKeyFile: function (scrID, transNoFormat, success, failure) {
                        try {
                            if (transNoFormat === undefined) {
                                transNoFormat = "";
                            };
                            mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + "transaction_key.txt", transNoFormat, function () {
                                try {
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    failure();
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    deleteTransactionKeyFile: function (scrID, success, failure) {
                        try {
                            mService.nfs.getSubDirectoryList(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID, function (data) {
                                try {
                                    if (data.length === 0) {
                                        mService.nfs.deleteFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + "transaction_key.txt", function () {
                                            try {
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                failure();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        success();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    copyConfigFiles: function (scrID, transNo, success) {
                        var cvsFilesArray = [],
                        controllerFileClientIDCountryCodeObj,
                        controllerFileClientObj,
                        controllerFileClientGroupObj,
                        controllerFileVerticalObj,
                        controllerFileSolutionObj,
                        controllerFileObj,
                        lableFileClientIDCountryCodeObj,
                        lableFileClientIdObj,
                        lableFileClientGroupObj,
                        lableFileVerticalObj,
                        lableFileSolutionObj,
                        lableFileObj,
                        uiFileClientIDCountryCodeObj,
                        uiFileClientIDObj,
                        uiFileClientGroupObj,
                        uiFileVerticalObj,
                        uiFileSolutionObj,
                        uiFileObj,
                        ruleFileClientIDCountryCodeObj,
                        ruleFileClientIDObj,
                        ruleFileClientGroupObj,
                        ruleFileVerticalObj,
                        ruleFileSolutionObj,
                        ruleFileObj,
                        templateFileClientIDCountryCodeObj,
                        templateFileClientIDObj,
                        templateFileClientGroupObj,
                        templateFileVerticalObj,
                        templateFileSolutionObj,
                        templateFileObj;
                        try {
                            controllerFileClientIDCountryCodeObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "controller",
                                srcFile: "controller_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "controller_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json"
                            };
                            controllerFileClientObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "controller",
                                srcFile: "controller_" + scrID + "_" + mService.app.getClientId() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "controller_" + scrID + "_" + mService.app.getClientId() + ".json"
                            };
                            controllerFileClientGroupObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "controller",
                                srcFile: "controller_" + scrID + "_" + mService.app.getClientGroup() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "controller_" + scrID + "_" + mService.app.getClientGroup() + ".json"
                            };
                            controllerFileVerticalObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "controller",
                                srcFile: "controller_" + scrID + "_" + mService.app.getVertical() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "controller_" + scrID + "_" + mService.app.getVertical() + ".json"
                            };
                            controllerFileSolutionObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "controller",
                                srcFile: "controller_" + scrID + "_" + mService.app.getSolution() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "controller_" + scrID + "_" + mService.app.getSolution() + ".json"
                            };
                            controllerFileObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "controller",
                                srcFile: "controller_" + scrID + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "controller_" + scrID + ".json"
                            };
                            lableFileClientIDCountryCodeObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "label",
                                srcFile: "label_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "label_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId() + ".json"
                            };
                            lableFileClientIdObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "label",
                                srcFile: "label_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getLocaleId() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "label_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getLocaleId() + ".json"
                            };
                            lableFileClientGroupObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "label",
                                srcFile: "label_" + scrID + "_" + mService.app.getClientGroup() + "_" + mService.app.getLocaleId() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "label_" + scrID + "_" + mService.app.getClientGroup() + "_" + mService.app.getLocaleId() + ".json"
                            };
                            lableFileVerticalObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "label",
                                srcFile: "label_" + scrID + "_" + mService.app.getVertical() + "_" + mService.app.getLocaleId() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "label_" + scrID + "_" + mService.app.getVertical() + "_" + mService.app.getLocaleId() + ".json"
                            };
                            lableFileSolutionObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "label",
                                srcFile: "label_" + scrID + "_" + mService.app.getSolution() + "_" + mService.app.getLocaleId() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "label_" + scrID + "_" + mService.app.getSolution() + "_" + mService.app.getLocaleId() + ".json"
                            };
                            lableFileObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "label",
                                srcFile: "label_" + scrID + "_" + mService.app.getLocaleId() + ".json",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "label_" + scrID + "_" + mService.app.getLocaleId() + ".json"
                            };
                            uiFileClientIDCountryCodeObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "ui",
                                srcFile: "ui_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "ui_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".html"
                            };
                            uiFileClientIDObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "ui",
                                srcFile: "ui_" + scrID + "_" + mService.app.getClientId() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "ui_" + scrID + "_" + mService.app.getClientId() + ".html"
                            };
                            uiFileClientGroupObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "ui",
                                srcFile: "ui_" + scrID + "_" + mService.app.getClientGroup() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "ui_" + scrID + "_" + mService.app.getClientGroup() + ".html"
                            };
                            uiFileVerticalObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "ui",
                                srcFile: "ui_" + scrID + "_" + mService.app.getVertical() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "ui_" + scrID + "_" + mService.app.getVertical() + ".html"
                            };
                            uiFileSolutionObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "ui",
                                srcFile: "ui_" + scrID + "_" + mService.app.getSolution() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "ui_" + scrID + "_" + mService.app.getSolution() + ".html"
                            };
                            uiFileObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "ui",
                                srcFile: "ui_" + scrID + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "ui_" + scrID + ".html"
                            };
                            ruleFileClientIDCountryCodeObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "rule",
                                srcFile: "rule_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".txt",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "rule_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".txt"
                            };
                            ruleFileClientIDObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "rule",
                                srcFile: "rule_" + scrID + "_" + mService.app.getClientId() + ".txt",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "rule_" + scrID + "_" + mService.app.getClientId() + ".txt"
                            };
                            ruleFileClientGroupObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "rule",
                                srcFile: "rule_" + scrID + "_" + mService.app.getClientGroup() + ".txt",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "rule_" + scrID + "_" + mService.app.getClientGroup() + ".txt"
                            };
                            ruleFileVerticalObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "rule",
                                srcFile: "rule_" + scrID + "_" + mService.app.getVertical() + ".txt",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "rule_" + scrID + "_" + mService.app.getVertical() + ".txt"
                            };
                            ruleFileSolutionObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "rule",
                                srcFile: "rule_" + scrID + "_" + mService.app.getSolution() + ".txt",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "rule_" + scrID + "_" + mService.app.getSolution() + ".txt"
                            };
                            ruleFileObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "rule",
                                srcFile: "rule_" + scrID + ".txt",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "rule_" + scrID + ".txt"
                            };
                            templateFileClientIDCountryCodeObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "template",
                                srcFile: "template_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "template_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".html"
                            };
                            templateFileClientIDObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "template",
                                srcFile: "template_" + scrID + "_" + mService.app.getClientId() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "template_" + scrID + "_" + mService.app.getClientId() + ".html"
                            };
                            templateFileClientGroupObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "template",
                                srcFile: "template_" + scrID + "_" + mService.app.getClientGroup() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "template_" + scrID + "_" + mService.app.getClientGroup() + ".html"
                            };
                            templateFileVerticalObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "template",
                                srcFile: "template_" + scrID + "_" + mService.app.getVertical() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "template_" + scrID + "_" + mService.app.getVertical() + ".html"
                            };
                            templateFileSolutionObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "template",
                                srcFile: "template_" + scrID + "_" + mService.app.getSolution() + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "template_" + scrID + "_" + mService.app.getSolution() + ".html"
                            };
                            templateFileObj = {
                                srcPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "template",
                                srcFile: "template_" + scrID + ".html",
                                desPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + transNo,
                                desFile: "template_" + scrID + ".html"
                            };
                            cvsFilesArray = [controllerFileClientIDCountryCodeObj, controllerFileClientObj, controllerFileClientGroupObj, controllerFileVerticalObj, controllerFileSolutionObj, controllerFileObj, lableFileClientIDCountryCodeObj, lableFileClientIdObj, lableFileClientGroupObj, lableFileVerticalObj, lableFileSolutionObj, lableFileObj, uiFileClientIDCountryCodeObj, uiFileClientIDObj, uiFileClientGroupObj, uiFileVerticalObj, uiFileSolutionObj, uiFileObj, ruleFileClientIDCountryCodeObj, ruleFileClientIDObj, ruleFileClientGroupObj, ruleFileVerticalObj, ruleFileSolutionObj, ruleFileObj, templateFileClientIDCountryCodeObj, templateFileClientIDObj, templateFileClientGroupObj, templateFileVerticalObj, templateFileSolutionObj, templateFileObj];
                            mService.containR.pattern.form.init.util.validateConfigFiles(cvsFilesArray, function () {
                                try {
                                    window.minterface("CopyConfigFile", mService.containR.variable.configFilesArray, function (fObj) {
                                        try {
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function (errorMsg) {
                                        try {
                                            mService.app.showToast("containR_config_failure", "system_messages");
                                            mService.exception.handle(errorMsg);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("containR_config_failure", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    getFieldProperties: function (attributesList, widgetsList, widgetIndex) {
                        var field = {},
                        attrIndex,
                        splittedAttrVal;
                        try {
                            field["id"] = $(widgetsList[widgetIndex]).attr("id");
                            field["wtype"] = $(widgetsList[widgetIndex]).attr("data-ms-widget-type");
                            for (attrIndex = 0; attrIndex < attributesList.length; attrIndex++) {
                                if (attributesList[attrIndex].name.indexOf('prop') !== -1) {
                                    splittedAttrVal = attributesList[attrIndex].name.split('-');
                                    if (splittedAttrVal[4] === "datasrc") {
                                        if (attributesList[attrIndex].value !== undefined) {
                                            if (attributesList[attrIndex].value.indexOf("$") == 0) {
                                                field[splittedAttrVal[4]] = attributesList[attrIndex].value;
                                            } else {
                                                field[splittedAttrVal[4]] = JSON.parse(attributesList[attrIndex].value.replace(/&apos;/g, "'"));
                                            }
                                        } else {
                                            field[splittedAttrVal[4]] = attributesList[attrIndex].value;
                                        }
                                    } else {
                                        field[splittedAttrVal[4]] = attributesList[attrIndex].value;
                                    }
                                }
                            };
                            return field;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    validateConfigFiles: function (cvsFilesArray, success, failure) {
                        try {
                            mService.containR.pattern.form.init.util.validateFile(cvsFilesArray[mService.containR.variable.configFilesListCounter].srcPath + "/" + cvsFilesArray[mService.containR.variable.configFilesListCounter].srcFile, function () {
                                try {
                                    mService.containR.variable.configFilesArray.push(cvsFilesArray[mService.containR.variable.configFilesListCounter]);
                                    mService.containR.variable.configFilesListCounter++;
                                    if (mService.containR.variable.configFilesListCounter < cvsFilesArray.length) {
                                        mService.containR.pattern.form.init.util.validateConfigFiles(cvsFilesArray, function () {
                                            try {
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function (err) {
                                            try {
                                                failure();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        mService.containR.variable.configFilesListCounter = 0;
                                        success();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.containR.variable.configFilesListCounter++;
                                    if (mService.containR.variable.configFilesListCounter < cvsFilesArray.length) {
                                        mService.containR.pattern.form.init.util.validateConfigFiles(cvsFilesArray, function () {
                                            try {
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function (err) {
                                            try {
                                                failure();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        mService.containR.variable.configFilesListCounter = 0;
                                        success();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    validateFile: function (path, success, failure) {
                        try {
                            mService.nfs.validateFile({
                                filePath: path,
                                success: function (indication) {
                                    try {
                                        if (indication === "true") {
                                            success();
                                        } else {
                                            failure();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                                failure: function () {
                                    try {
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }
                            }, "configFile");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    updateUIFile: function (data, scrID, success) {
                        try {
                            mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo + "/" + "ui_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".html", data, function () {
                                try {
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                }
            },
            submit: {
                getPreviewHtmlString: function () {
                    var previewHtml,
                    scrID;
                    try {
                        scrID = mService.application.view().id.replace("#", "");
                        previewHtml = mService.config.template.getTransformedHtml(scrID + "_template", mService.containR.pattern.form.util.getInputparam(scrID, {
                                    scrID: scrID
                                }));
                        $("body").append("<div id='" + scrID + "_content_preview_temp'>" + previewHtml + "</div>");
                        mService.config.label.resolve(scrID);
                        previewHtml = $("#" + scrID + "_content_preview_temp").html();
                        $("#" + scrID + "_content_preview_temp").remove();
                        return previewHtml;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                processSubmit: function (scrID, controllerObj) {
                    try {
                        $("<div></div>").msDialog({
                            content: mService.config.template.getTransformedMessage(mService.config.label.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]["confirmMessages"]["form_submit_alert"]),
                            actions: {
                                "CANCEL": {
                                    text: "<i class='fas " + mService.icons.draft.cancel + "'></i>",
                                    action: function (e) {
                                        try {
                                            mService.containR.variable[scrID].submitInAction = false;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }
                                },
                                "Save": {
                                    text: "<i class='far far fa-check'></i>",
                                    action: function (e) {
                                        try {
                                            mService.spinner.show();
                                            mService.containR.variable[scrID].submitBtnClickInd = true;
                                            if (mService.config.rule.executeRuleStatements({
                                                    screenID: scrID,
                                                    objectID: "button",
                                                    eventID: "click",
                                                    fieldID: "submit"
                                                })) {
                                                if (controllerObj.digitalReport === "true") {
                                                    mService.containR.pattern.form.submit.saveDigitalReportForm(scrID, controllerObj);
                                                } else {
                                                    if (controllerObj.containR_subtype === "workflow") {
                                                        mService.containR.pattern.form.submit.saveEventChange(scrID, controllerObj);
                                                    } else {
                                                        mService.containR.pattern.form.submit.updateFormData(scrID, controllerObj);
                                                    }
                                                }
                                            } else {
                                                mService.containR.variable[scrID].submitInAction = false;
                                                mService.spinner.hide();
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    },
                                    primary: true
                                }
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                removeConfigFiles: function (scrID, success, failure) {
                    try {
                        mService.nfs.deleteDirectory(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                saveDigitalReportForm: function (scrID, controllerObj) {
                    try {
                        if (mService.containR.variable[scrID].save.online === "true") {
                            if (window.navigator.onLine) {
                                $.ajax({
                                    url: mService.app.clientURL + "/common/components/containR/CreateDigitalreport.aspx",
                                    method: "POST",
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    data: mService.dSource.util.getInputObject({
                                        inputparam: {
                                            p_file_path: "'" + mService.containR.variable[scrID].docType + "'",
                                            p_file_name: "'" + mService.containR.variable[scrID].formName + ".json" + "'",
                                            p_report_type: "'data'",
                                            p_report_data: "'" + JSON.stringify(mService.containR.pattern.form.util.getInputparam(scrID, {
                                                    scrID: scrID
                                                })) + "'"
                                        }
                                    }),
                                    complete: function (response, status) {
                                        try {
                                            if (status === "success") {
                                                response = response.responseJSON;
                                                if (response.ApplicationException === null) {
                                                    mService.containR.pattern.form.submit.savePreviewHtmlData(scrID, controllerObj);
                                                } else {
                                                    mService.app.showToast(JSON.parse(response.ApplicationException.errorDescription).code, mService.app.getScreenId(), JSON.parse(response.ApplicationException.errorDescription));
                                                    mService.containR.variable[scrID].submitInAction = false;
                                                    mService.spinner.hide();
                                                }
                                            } else {
                                                mService.app.showToast("service_exception", "pre_signup_messages");
                                                mService.containR.variable[scrID].submitInAction = false;
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }
                                });
                            } else {
                                mService.app.showToast("internet_connection_error", "system_messages");
                                mService.containR.variable[scrID].submitInAction = false;
                                mService.spinner.hide();
                            }
                        } else {
                            mService.queue.setData(scrID, controllerObj, {
                                url: "/common/components/containR/CreateDigitalreport.aspx",
                                key: scrID,
                                subkey: mService.containR.variable[scrID].transNo,
                                input: mService.dSource.util.getInputObject({
                                    inputparam: {
                                        p_file_path: "'" + mService.containR.variable[scrID].docType + "'",
                                        p_file_name: "'" + mService.containR.variable[scrID].formName + ".json" + "'",
                                        p_report_type: "'data'",
                                        p_report_data: "'" + JSON.stringify(mService.containR.pattern.form.util.getInputparam(scrID, {
                                                scrID: scrID
                                            })) + "'"
                                    }
                                })
                            }, function (e) {
                                try {
                                    mService.containR.pattern.form.submit.savePreviewHtmlData(scrID, controllerObj);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("save_pdf_data_error", scrID);
                                    mService.spinner.hide();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                saveEventChange: function (scrID, controllerObj) {
                    var inputData;
                    try {
                        if (controllerObj.showUI !== undefined && controllerObj.showUI === "false") {
                            inputData = JSON.parse(mService.containR.variable[scrID].nonUIFormFields);
                        } else {
                            inputData = mService.containR.pattern.form.util.getInputparam(scrID, {
                                scrID: scrID,
                                saveDetails: "true"
                            });
                        };
                        inputData.allow_new_transaction = controllerObj.allow_new_transaction;
                        inputData.modify_last_transaction = controllerObj.modify_last_transaction;
                        if (mService.containR.variable[scrID].save.online === "true") {
                            if (window.navigator.onLine) {
                                mService.containR.pattern.form.util.getLocationData(controllerObj, function (latitude, longitude) {
                                    try {
                                        mService.containR.pattern.form.util.checkDateTimeSettings(scrID, controllerObj, function () {
                                            try {
                                                mService.util.getNewDate(function (date) {
                                                    try {
                                                        mService.containR.pattern.form.util.sendAttachmentsOnline(scrID, controllerObj, function () {
                                                            try {
                                                                if (controllerObj.digitalReport === "true") {
                                                                    transaction_data = {
                                                                        transaction_type: mService.containR.variable[scrID].transType,
                                                                        transaction_ref_no: ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no)),
                                                                        file_category: "P",
                                                                        file_type: "P",
                                                                        file_name: mService.containR.variable[scrID].formName + ".pdf",
                                                                        closure_report_indicator: "1"
                                                                    }
                                                                } else {
                                                                    transaction_data = {
                                                                        transaction_type: mService.containR.variable[scrID].transType,
                                                                        transaction_ref_no: ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no))
                                                                    }
                                                                };
                                                                inputData.channel_id = mService.app.channel;
                                                                inputData.event_date = mService.util.getDateTimeString(date, "HH");
                                                                inputData.event_hour = mService.util.getDateTimeString(date, "HH");
                                                                inputData.event_minute = mService.util.getDateTimeString(date, "mm");
                                                                inputData.event_second = mService.util.getDateTimeString(date, "ss");
                                                                inputData.event_latitude = latitude;
                                                                inputData.event_longitude = longitude;
                                                                mService.dSource.saveCustomInfo({
                                                                    scrID: scrID,
                                                                    inAppCode: "",
                                                                    successToast: true,
                                                                    failureToast: true,
                                                                }, {
                                                                    code: "'" + mService.containR.variable[scrID].save.infoCode + "'",
                                                                    ref1: "'" + mService.containR.variable[scrID].save.infoRefNo1 + "'",
                                                                    ref2: "'" + mService.containR.variable[scrID].save.infoRefNo2 + "'",
                                                                    headerXml: "'" + JSON.stringify($.extend(true, inputData, transaction_data)) + "'",
                                                                    recTstamp: "'" + mService.containR.variable[scrID].save.timestamp + "'",
                                                                    saveMode: "'" + mService.containR.variable[scrID].save.mode + "'",
                                                                    inputDetail: "$mService.containR.pattern.form.util.getAttachmentInput('" + scrID + "')"
                                                                }, function () {
                                                                    try {
                                                                        mService.containR.pattern.listview.util.setEmployeeLastAccessInfo(scrID, {
                                                                            txn_ind: "C",
                                                                            txn_ref_no: ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no)),
                                                                            txn_sub_ref_no: "0",
                                                                            feature_id: mService.containR.variable[scrID].featureID,
                                                                            allow_new_transaction: controllerObj.allow_new_transaction,
                                                                            modify_last_transaction: controllerObj.modify_last_transaction
                                                                        }, function () {
                                                                            try {
                                                                                mService.containR.pattern.listview.util.updateFormAttachment(scrID, controllerObj, function () {
                                                                                    try {
                                                                                        mService.containR.pattern.listview.wFlow.updateEventLog(scrID);
                                                                                        mService.containR.pattern.listview.wFlow.updateEventStatus(scrID);
                                                                                        mService.containR.pattern.listview.wFlow.updateListDataSource(scrID, function () {
                                                                                            try {
                                                                                                mService.containR.variable[scrID].submitInAction = false;
                                                                                                mService.containR.pattern.form.util.addDataSource(scrID, function () {
                                                                                                    try {
                                                                                                        mService.containR.util.moveCallToTop(scrID);
                                                                                                        if (controllerObj.digitalReport === "true") {
                                                                                                            mService.containR.pattern.form.submit.removeConfigFiles(scrID, function () {
                                                                                                                try {
                                                                                                                    mService.containR.pattern.form.init.util.deleteTransactionKeyFile(scrID, function () {
                                                                                                                        try {
                                                                                                                            mService.spinner.hide();
                                                                                                                            mService.presentR.pattern.form.preview.showPreviewPopup(scrID);
                                                                                                                        } catch (exception) {
                                                                                                                            mService.exception.handle(exception);
                                                                                                                        }
                                                                                                                    }, function () {
                                                                                                                        try {
                                                                                                                            mService.spinner.hide();
                                                                                                                            mService.presentR.pattern.form.preview.showPreviewPopup(scrID);
                                                                                                                        } catch (exception) {
                                                                                                                            mService.exception.handle(exception);
                                                                                                                        }
                                                                                                                    });
                                                                                                                } catch (exception) {
                                                                                                                    mService.exception.handle(exception);
                                                                                                                }
                                                                                                            }, function () {
                                                                                                                try {
                                                                                                                    mService.app.showToast("delete_config_files_error", scrID);
                                                                                                                    mService.spinner.hide();
                                                                                                                } catch (exception) {
                                                                                                                    mService.exception.handle(exception);
                                                                                                                }
                                                                                                            });
                                                                                                        } else {
                                                                                                            mService.spinner.hide();
                                                                                                            if (controllerObj.showUI !== undefined && controllerObj.showUI === "false") {
                                                                                                                mService.containR.pattern.listview.util.refreshListview(mService.app.getScreenId(), false, false);
                                                                                                            } else {
                                                                                                                mService.application.navigate("#:back");
                                                                                                            }
                                                                                                        }
                                                                                                    } catch (exception) {
                                                                                                        mService.exception.handle(exception);
                                                                                                    }
                                                                                                });
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        });
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                }, function () {
                                                                                    try {
                                                                                        mService.containR.variable[scrID].submitInAction = false;
                                                                                        mService.spinner.hide();
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                });
                                                                            } catch (exception) {
                                                                                mService.exception.handle(exception);
                                                                            }
                                                                        }, function () {
                                                                            try {
                                                                                mService.containR.variable[scrID].submitInAction = false;
                                                                                mService.spinner.hide();
                                                                            } catch (exception) {
                                                                                mService.exception.handle(exception);
                                                                            }
                                                                        });
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                }, function (errorMsg) {
                                                                    try {
                                                                        mService.containR.variable[scrID].submitInAction = false;
                                                                        mService.spinner.hide();
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                });
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                mService.spinner.hide();
                                                                return false;
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.app.showToast("get_date_error", scrID);
                                                        mService.spinner.hide();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.containR.variable[scrID].submitInAction = false;
                                                mService.spinner.hide();
                                                return true;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.containR.variable[scrID].submitInAction = false;
                                        mService.spinner.hide();
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                })
                            } else {
                                mService.app.showToast("internet_connection_error", "system_messages");
                                mService.containR.variable[scrID].submitInAction = false;
                                mService.spinner.hide();
                            }
                        } else {
                            mService.containR.pattern.form.util.sendAttachments(scrID, controllerObj, function () {
                                var transaction_data;
                                try {
                                    if (controllerObj.digitalReport === "true") {
                                        transaction_data = {
                                            transaction_type: mService.containR.variable[scrID].transType,
                                            transaction_ref_no: ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no)),
                                            file_category: "P",
                                            file_type: "P",
                                            file_name: mService.containR.variable[scrID].formName + ".pdf",
                                            closure_report_indicator: "1"
                                        }
                                    } else {
                                        transaction_data = {
                                            transaction_type: mService.containR.variable[scrID].transType,
                                            transaction_ref_no: ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no))
                                        }
                                    };
                                    mService.queue.setData(scrID, controllerObj, {
                                        url: "/api/common_modules/save_manage_custom_info",
                                        key: scrID,
                                        subkey: mService.containR.variable[scrID].transNo,
                                        datasource: mService.containR.variable[scrID].attachedFilesList,
                                        input: mService.dSource.util.getInputObject({
                                            inputparam_header: {
                                                p_custom_info_code: "'" + mService.containR.variable[scrID].save.infoCode + "'",
                                                p_custom_info_ref_no1: "'" + mService.containR.variable[scrID].save.infoRefNo1 + "'",
                                                p_custom_info_ref_no2: "'" + mService.containR.variable[scrID].save.infoRefNo2 + "'",
                                                p_inputparam_header_xml: "'" + JSON.stringify($.extend(true, inputData, transaction_data)) + "'",
                                                p_save_mode: "'" + mService.containR.variable[scrID].save.mode + "'",
                                                p_rec_timestamp: "'" + mService.containR.variable[scrID].save.timestamp + "'"
                                            },
                                            inputparam_detail: "$mService.containR.pattern.form.util.getAttachmentInput('" + scrID + "')"
                                        })
                                    }, function (e) {
                                        try {
                                            mService.containR.pattern.listview.util.setEmployeeLastAccessInfo(scrID, {
                                                txn_ind: "C",
                                                txn_ref_no: ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no)),
                                                txn_sub_ref_no: "0",
                                                feature_id: mService.containR.variable[scrID].featureID,
                                                allow_new_transaction: controllerObj.allow_new_transaction,
                                                modify_last_transaction: controllerObj.modify_last_transaction
                                            }, function () {
                                                try {
                                                    mService.containR.pattern.listview.util.updateFormAttachment(scrID, controllerObj, function () {
                                                        try {
                                                            mService.spinner.hide();
                                                            mService.app.showToast("form_submit_success", scrID);
                                                            mService.containR.pattern.listview.wFlow.updateEventLog(scrID);
                                                            mService.containR.pattern.listview.wFlow.updateEventStatus(scrID);
                                                            mService.containR.pattern.listview.wFlow.updateListDataSource(scrID, function () {
                                                                try {
                                                                    mService.containR.variable[scrID].submitInAction = false;
                                                                    mService.containR.pattern.form.util.addDataSource(scrID, function () {
                                                                        try {
                                                                            mService.containR.util.moveCallToTop(scrID);
                                                                            if (controllerObj.digitalReport === "true") {
                                                                                mService.containR.pattern.form.submit.removeConfigFiles(scrID, function () {
                                                                                    try {
                                                                                        mService.containR.pattern.form.init.util.deleteTransactionKeyFile(scrID, function () {
                                                                                            try {
                                                                                                mService.presentR.pattern.form.preview.showPreviewPopup(scrID);
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        }, function () {
                                                                                            try {
                                                                                                mService.presentR.pattern.form.preview.showPreviewPopup(scrID);
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        });
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                }, function () {
                                                                                    try {
                                                                                        mService.app.showToast("delete_config_files_error", scrID);
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                if (controllerObj.showUI !== undefined && controllerObj.showUI === "false") {
                                                                                    mService.containR.pattern.listview.util.refreshListview(mService.app.getScreenId(), false, false);
                                                                                } else {
                                                                                    mService.application.navigate("#:back");
                                                                                }
                                                                            }
                                                                        } catch (exception) {
                                                                            mService.exception.handle(exception);
                                                                        }
                                                                    });
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            });
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.containR.variable[scrID].submitInAction = false;
                                                            mService.spinner.hide();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    mService.containR.variable[scrID].submitInAction = false;
                                                    mService.spinner.hide();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function (e) {
                                        try {
                                            mService.app.showToast("form_submit_error", scrID);
                                            mService.spinner.hide();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.containR.variable[scrID].submitInAction = false;
                                    mService.app.showToast("attachment_error", "system_messages");
                                    mService.spinner.hide();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                savePreviewHtmlData: function (scrID, controllerObj) {
                    try {
                        if (mService.containR.variable[scrID].save.online === "true") {
                            if (window.navigator.onLine) {
                                $.ajax({
                                    url: mService.app.clientURL + "/common/components/containR/CreateDigitalreport.aspx",
                                    method: "POST",
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    data: mService.dSource.util.getInputObject({
                                        inputparam: {
                                            p_file_path: "'" + mService.containR.variable[scrID].docType + "'",
                                            p_file_name: "'" + mService.containR.variable[scrID].formName + ".pdf" + "'",
                                            p_report_type: "'document'",
                                            p_report_data: "'" + mService.containR.pattern.form.submit.getPreviewHtmlString(scrID) + "'"
                                        }
                                    }),
                                    complete: function (response, status) {
                                        try {
                                            if (status === "success") {
                                                response = response.responseJSON;
                                                if (response.ApplicationException === null) {
                                                    if (controllerObj.containR_subtype === "workflow") {
                                                        mService.containR.pattern.form.submit.saveEventChange(scrID, controllerObj);
                                                    } else {
                                                        mService.containR.pattern.form.submit.updateFormData(scrID, controllerObj);
                                                    }
                                                } else {
                                                    mService.app.showToast(JSON.parse(response.ApplicationException.errorDescription).code, mService.app.getScreenId(), JSON.parse(response.ApplicationException.errorDescription));
                                                    mService.containR.variable[scrID].submitInAction = false;
                                                    mService.spinner.hide();
                                                }
                                            } else {
                                                mService.app.showToast("service_exception", "pre_signup_messages");
                                                mService.containR.variable[scrID].submitInAction = false;
                                                mService.spinner.hide();
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }
                                });
                            } else {
                                mService.app.showToast("internet_connection_error", "system_messages");
                                mService.containR.variable[scrID].submitInAction = false;
                                mService.spinner.hide();
                            }
                        } else {
                            mService.queue.setData(scrID, controllerObj, {
                                url: "/common/components/containR/CreateDigitalreport.aspx",
                                key: scrID,
                                subkey: mService.containR.variable[scrID].transNo,
                                input: mService.dSource.util.getInputObject({
                                    inputparam: {
                                        p_file_path: "'" + mService.containR.variable[scrID].docType + "'",
                                        p_file_name: "'" + mService.containR.variable[scrID].formName + ".pdf" + "'",
                                        p_report_type: "'document'",
                                        p_report_data: "'" + mService.containR.pattern.form.submit.getPreviewHtmlString(scrID) + "'"
                                    }
                                })
                            }, function (e) {
                                try {
                                    if (controllerObj.containR_subtype === "workflow") {
                                        mService.containR.pattern.form.submit.saveEventChange(scrID, controllerObj);
                                    } else {
                                        mService.containR.pattern.form.submit.updateFormData(scrID, controllerObj);
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("save_pdf_html_data_error", scrID);
                                    mService.spinner.hide();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateFormData: function (scrID, controllerObj) {
                    var inputData;
                    try {
                        if (controllerObj.showUI !== undefined && controllerObj.showUI === "false") {
                            inputData = JSON.parse(mService.containR.variable[scrID].nonUIFormFields);
                        } else {
                            inputData = mService.containR.pattern.form.util.getInputparam(scrID, {
                                scrID: scrID,
                                saveDetails: "true"
                            });
                        };
                        if (controllerObj.digitalReport === "true") {
                            transaction_data = {
                                transaction_type: mService.containR.variable[scrID].transType,
                                transaction_ref_no: mService.containR.variable[scrID].transNo,
                                file_category: "P",
                                file_type: "P",
                                file_name: mService.containR.variable[scrID].formName + ".pdf",
                                file_path: mService.containR.variable[scrID].docType
                            }
                        } else {
                            transaction_data = {
                                transaction_type: mService.containR.variable[scrID].transType,
                                transaction_ref_no: mService.containR.variable[scrID].transNo
                            }
                        };
                        if (mService.containR.variable[scrID].save.online === "true") {
                            if (window.navigator.onLine) {
                                mService.containR.pattern.form.util.getLocationData(controllerObj, function (latitude, longitude) {
                                    try {
                                        mService.containR.pattern.form.util.checkDateTimeSettings(scrID, controllerObj, function () {
                                            try {
                                                mService.util.getNewDate(function (date) {
                                                    try {
                                                        mService.containR.pattern.form.util.sendAttachmentsOnline(scrID, controllerObj, function () {
                                                            try {
                                                                inputData.channel_id = mService.app.channel;
                                                                inputData.event_date = mService.util.getDateTimeString(date, "yyyy-MM-dd");
                                                                inputData.event_hour = mService.util.getDateTimeString(date, "HH");
                                                                inputData.event_minute = mService.util.getDateTimeString(date, "mm");
                                                                inputData.event_second = mService.util.getDateTimeString(date, "ss");
                                                                inputData.event_latitude = latitude;
                                                                inputData.event_longitude = longitude;
                                                                mService.dSource.saveCustomInfo({
                                                                    scrID: scrID,
                                                                    inAppCode: "",
                                                                    successToast: true,
                                                                    failureToast: true,
                                                                }, {
                                                                    code: "'" + mService.containR.variable[scrID].save.infoCode + "'",
                                                                    ref1: "'" + mService.containR.variable[scrID].save.infoRefNo1 + "'",
                                                                    ref2: "'" + mService.containR.variable[scrID].save.infoRefNo2 + "'",
                                                                    headerXml: "'" + JSON.stringify($.extend(true, inputData, transaction_data)) + "'",
                                                                    recTstamp: "'" + mService.containR.variable[scrID].save.timestamp + "'",
                                                                    saveMode: "'" + mService.containR.variable[scrID].save.mode + "'",
                                                                    inputDetail: "$mService.containR.pattern.form.util.getAttachmentInput('" + scrID + "')"
                                                                }, function () {
                                                                    try {
                                                                        mService.spinner.hide();
                                                                        if (controllerObj.digitalReport === "true") {
                                                                            mService.containR.pattern.form.submit.removeConfigFiles(scrID, function () {
                                                                                try {
                                                                                    mService.containR.variable[scrID].submitInAction = false;
                                                                                    mService.containR.pattern.form.util.addDataSource(scrID, function () {
                                                                                        try {
                                                                                            mService.containR.util.moveCallToTop(scrID);
                                                                                            mService.containR.pattern.form.init.util.deleteTransactionKeyFile(scrID, function () {
                                                                                                try {
                                                                                                    mService.presentR.pattern.form.preview.showPreviewPopup(scrID);
                                                                                                } catch (exception) {
                                                                                                    mService.exception.handle(exception);
                                                                                                };
                                                                                            }, function () {
                                                                                                try {
                                                                                                    mService.presentR.pattern.form.preview.showPreviewPopup(scrID);
                                                                                                } catch (exception) {
                                                                                                    mService.exception.handle(exception);
                                                                                                };
                                                                                            });
                                                                                        } catch (exception) {
                                                                                            mService.exception.handle(exception);
                                                                                        }
                                                                                    });
                                                                                } catch (exception) {
                                                                                    mService.exception.handle(exception);
                                                                                };
                                                                            }, function () {
                                                                                try {
                                                                                    mService.app.showToast("delete_config_files_error", scrID);
                                                                                } catch (exception) {
                                                                                    mService.exception.handle(exception);
                                                                                };
                                                                            });
                                                                        } else {
                                                                            mService.containR.variable[scrID].submitInAction = false;
                                                                            mService.containR.pattern.form.util.addDataSource(scrID, function () {
                                                                                try {
                                                                                    mService.containR.util.moveCallToTop(scrID);
                                                                                    mService.application.navigate("#:back");
                                                                                } catch (exception) {
                                                                                    mService.exception.handle(exception);
                                                                                }
                                                                            });
                                                                        };
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                }, function (errorMsg) {
                                                                    try {
                                                                        mService.spinner.hide();
                                                                        mService.containR.variable[scrID].submitInAction = false;
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                });
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                mService.spinner.hide();
                                                                return false;
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.spinner.hide();
                                                        mService.app.showToast("get_date_error", scrID);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.spinner.hide();
                                                mService.containR.variable[scrID].submitInAction = false;
                                                return true;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.spinner.hide();
                                        mService.containR.variable[scrID].submitInAction = false;
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                mService.spinner.hide();
                                mService.app.showToast("internet_connection_error", "system_messages");
                                mService.containR.variable[scrID].submitInAction = false;
                            }
                        } else {
                            mService.containR.pattern.form.util.sendAttachments(scrID, controllerObj, function () {
                                try {
                                    mService.queue.setData(scrID, controllerObj, {
                                        url: "/api/common_modules/save_manage_custom_info",
                                        key: scrID,
                                        subkey: mService.containR.variable[scrID].transNo,
                                        datasource: mService.containR.variable[scrID].attachedFilesList,
                                        input: mService.dSource.util.getInputObject({
                                            inputparam_header: {
                                                p_custom_info_code: "'" + mService.containR.variable[scrID].save.infoCode + "'",
                                                p_custom_info_ref_no1: "'" + mService.containR.variable[scrID].save.infoRefNo1 + "'",
                                                p_custom_info_ref_no2: "'" + mService.containR.variable[scrID].save.infoRefNo2 + "'",
                                                p_inputparam_header_xml: "'" + JSON.stringify($.extend(true, inputData, transaction_data)) + "'",
                                                p_save_mode: "'" + mService.containR.variable[scrID].save.mode + "'",
                                                p_rec_timestamp: "'" + mService.containR.variable[scrID].save.timestamp + "'"
                                            },
                                            inputparam_detail: "$mService.containR.pattern.form.util.getAttachmentInput('" + scrID + "')"
                                        })
                                    }, function (e) {
                                        try {
                                            mService.spinner.hide();
                                            mService.app.showToast("form_submit_success", scrID);
                                            if (controllerObj.digitalReport === "true") {
                                                mService.containR.pattern.form.submit.removeConfigFiles(scrID, function () {
                                                    try {
                                                        mService.containR.variable[scrID].submitInAction = false;
                                                        mService.containR.pattern.form.util.addDataSource(scrID, function () {
                                                            try {
                                                                mService.containR.util.moveCallToTop(scrID);
                                                                mService.containR.pattern.form.init.util.deleteTransactionKeyFile(scrID, function () {
                                                                    try {
                                                                        mService.presentR.pattern.form.preview.showPreviewPopup(scrID);
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                }, function () {
                                                                    try {
                                                                        mService.presentR.pattern.form.preview.showPreviewPopup(scrID);
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                });
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.app.showToast("delete_config_files_error", scrID);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } else {
                                                mService.containR.variable[scrID].submitInAction = false;
                                                mService.containR.pattern.form.util.addDataSource(scrID, function () {
                                                    try {
                                                        mService.containR.util.moveCallToTop(scrID);
                                                        mService.application.navigate("#:back");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            };
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function (e) {
                                        try {
                                            mService.app.showToast("form_submit_error", scrID);
                                            mService.spinner.hide();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.spinner.hide();
                                    mService.containR.variable[scrID].submitInAction = false;
                                    mService.app.showToast("attachment_error", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            util: {
                addDataSource: function (scrID, success) {
                    var controllerObj;
                    try {
                        if (mService.containR.variable[scrID] === undefined) {
                            mService.containR.variable[scrID] = {};
                        };
                        mService.containR.variable[scrID].fields = mService.containR.pattern.form.util.getInputparam(scrID, {
                            scrID: scrID,
                            saveDetails: "true"
                        });
                        mService.config.rule.executeRuleStatements({
                            screenID: scrID,
                            objectID: "datasource",
                            eventID: "add",
                            fieldID: scrID
                        });
                        mService.config.rule.executeRuleStatements({
                            screenID: scrID,
                            objectID: "datasource",
                            eventID: "update",
                            fieldID: scrID
                        });
                        if (mService.containR.variable[scrID].listScreenId !== undefined) {
                            controllerObj = mService.config.controller.getControllerObj(mService.containR.variable[scrID].listScreenId);
                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                mService.containR.variable[(mService.containR.variable[scrID].listScreenId).replace("_list", "")].fromChildForm = true;
                            } else {
                                mService.containR.variable[mService.containR.variable[scrID].listScreenId].fromChildForm = true;
                            }
                        };
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getAttachmentData: function (scrID, thumbnailInd) {
                    var attachedFiles = [],
                    widgetList,
                    widgetVal,
                    widgetIndex,
                    filesIndex;
                    try {
                        widgetList = $("#" + scrID).find(mService.widgets.init.wSelector);
                        if (widgetList.length > 0) {
                            for (widgetIndex = 0; widgetIndex < widgetList.length; widgetIndex++) {
                                if ($(widgetList[widgetIndex]).attr("data-ms-widget-type") === "msCamera" || $(widgetList[widgetIndex]).attr("data-ms-widget-type") === "msGallery" || $(widgetList[widgetIndex]).attr("data-ms-widget-type") === "msImagepicker") {
                                    if ($(widgetList[widgetIndex]).attr("data-ms-widget-attachmentind") === "true") {
                                        widgetVal = $(widgetList[widgetIndex]).getVal();
                                    };
                                } else if ($(widgetList[widgetIndex]).attr("data-ms-widget-type") === "msAttachment") {
                                    widgetVal = $(widgetList[widgetIndex]).getVal();
                                    widgetVal = (widgetVal === undefined) ? ([]) : (widgetVal);
                                } else {
                                    widgetVal = [];
                                };
                                if (widgetVal.length > 0) {
                                    for (filesIndex = 0; filesIndex < widgetVal.length; filesIndex++) {
                                        if (!thumbnailInd) {
                                            if (widgetVal[filesIndex].thumbnail !== undefined) {
                                                widgetVal[filesIndex].thumbnail = "";
                                            }
                                        } else {
                                            widgetVal[filesIndex].path = mService.containR.variable[scrID].formPath;
                                        };
                                        attachedFiles.push(widgetVal[filesIndex]);
                                    }
                                }
                            }
                        };
                        return attachedFiles;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getAttachmentInput: function (scrID) {
                    var inputDetail;
                    try {
                        inputDetail = [];
                        fileList = mService.containR.pattern.form.util.getAttachmentData(scrID, false);
                        for (index = 0; index < fileList.length; index++) {
                            inputDetail.push({
                                p_sl_no: (index + 1).toString(),
                                p_inputparam_detail_xml: JSON.stringify({
                                    "file_category": fileList[index].category,
                                    "file_type": fileList[index].type,
                                    "file_name": fileList[index].name,
                                    "file_extension": fileList[index].extension,
                                    "closure_report_ind": ""
                                }),
                                p_crud_ind: "A"
                            });
                        };
                        return inputDetail;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                sendAttachments: function (scrID, controllerObj, success, failure) {
                    var attachedFiles,
                    copyFileList = [],
                    index,
                    destinationPath;
                    try {
                        attachedFiles = mService.containR.pattern.form.util.getAttachmentData(scrID, false);
                        if (attachedFiles.length > 0) {
                            destinationPath = mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + mService.containR.variable[scrID].docType;
                            for (index = 0; index < attachedFiles.length; index++) {
                                copyFileList.push({
                                    srcPath: attachedFiles[index].path,
                                    srcFile: attachedFiles[index].name,
                                    desPath: destinationPath,
                                    desFile: attachedFiles[index].name,
                                    queueAttachPath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "database" + "/" + "attachments",
                                    queueAttachFile: attachedFiles[index].name
                                });
                            };
                            window.minterface("CopyAttachmentFile", copyFileList, function (fObj) {
                                try {
                                    mService.containR.pattern.form.util.saveAttachmentFiles(attachedFiles, scrID, controllerObj, function () {
                                        try {
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.containR.variable[scrID].submitInAction = false;
                                            mService.spinner.hide();
                                            mService.app.showToast("attachment_error", "system_messages");
                                            failure();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    })
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (errorMsg) {
                                try {
                                    mService.containR.variable[scrID].submitInAction = false;
                                    mService.spinner.hide();
                                    mService.app.showToast("attachment_error", "system_messages");
                                    mService.exception.handle(errorMsg);
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                sendAttachmentsOnline: function (scrID, controllerObj, success, failure) {
                    var attachedFiles,
                    attachmentList = [],
                    index;
                    try {
                        attachedFiles = mService.containR.pattern.form.util.getAttachmentData(scrID, false);
                        if (attachedFiles.length > 0) {
                            for (index = 0; index < attachedFiles.length; index++) {
                                attachmentList.push({
                                    filePath: attachedFiles[index].path + "/" + attachedFiles[index].name,
                                    serverPath: mService.containR.variable[scrID].docType,
                                    fileName: attachedFiles[index].name
                                });
                            };
                            window.minterface("SendAttachmentToServer", attachmentList, function (src) {
                                try {
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                    mService.spinner.hide();
                                    failure();
                                }
                            }, function (errorMsg) {
                                try {
                                    mService.spinner.hide();
                                    mService.app.showToast("msAttachment_file_upload_failure", "system_messages");
                                    failure();
                                    mService.exception.handle(errorMsg);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                checkDateTimeSettings: function (scrID, controllerObj, success, failure) {
                    try {
                        if (controllerObj.save.checkTimeSettings === "true") {
                            mService.containR.pattern.form.util.getDateTimeSettingStatus(function (status) {
                                try {
                                    if (status === "true") {
                                        success();
                                    } else {
                                        mService.containR.pattern.form.util.openDateTimeSettings(scrID);
                                        failure();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getDateTimeSettingStatus: function (success, failure) {
                    try {
                        window.minterface("CheckAutomaticTime", [], function (status) {
                            try {
                                success(status);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                mService.app.showToast("CheckAutomaticTime_error", "system_messages");
                                mService.exception.handle(errorMsg);
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getLocationData: function (controllerObj, success, failure) {
                    try {
                        if (controllerObj.save.checkLocationSettings === "true") {
                            mService.api.permission.checkStatus(function (data) {
                                try {
                                    if (data !== "") {
                                        if (data.location !== undefined) {
                                            if (data.location !== "NEVER") {
                                                mService.containR.pattern.form.util.getLocationStatus(function (status) {
                                                    try {
                                                        if (status === "true") {
                                                            mService.containR.pattern.form.util.getLocation(function (latitude, longitude) {
                                                                try {
                                                                    success(latitude, longitude);
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            }, function () {
                                                                try {
                                                                    success("", "");
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            });
                                                        } else {
                                                            if (mService.app.platform == 'Android') {
                                                                mService.util.enableLocation(function () {
                                                                    try {
                                                                        mService.containR.pattern.form.util.getLocation(function (latitude, longitude) {
                                                                            try {
                                                                                success(latitude, longitude);
                                                                            } catch (exception) {
                                                                                mService.exception.handle(exception);
                                                                            }
                                                                        }, function () {
                                                                            try {
                                                                                success("", "");
                                                                            } catch (exception) {
                                                                                mService.exception.handle(exception);
                                                                            }
                                                                        });
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                }, function () {
                                                                    try {
                                                                        mService.spinner.hide();
                                                                        failure();
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                });
                                                            } else {
                                                                success("", "");
                                                            }
                                                        }
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        success("", "");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } else {
                                                success("", "");
                                            }
                                        } else {
                                            success("", "");
                                        }
                                    } else {
                                        success("", "");
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            success("", "");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                deleteDraftFile: function (scrID, success, failure) {
                    try {
                        mService.nfs.deleteFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo + "/" + scrID + "_draft.json", function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getInputparam: function (scrID, iObj) {
                    var inputparamObj = {},
                    index,
                    fieldList,
                    timeboxValue;
                    try {
                        fieldList = $("#" + iObj.scrID).find(mService.widgets.init.wSelector);
                        for (index = 0; index < fieldList.length; index++) {
                            if ($(fieldList[index]).attr("id") !== undefined) {
                                var fieldID = $(fieldList[index]).attr("id").replace(scrID + "_", "");
                                if (iObj.saveDetails === "true") {
                                    if ($(fieldList[index]).attr("data-ms-widget-savefield") === "true" && $(fieldList[index]).attr("data-ms-widget-savefield") !== undefined) {
                                        if ($(fieldList[index]).attr("data-ms-widget-msloop") === undefined || $(fieldList[index]).attr("data-ms-widget-msloop") === "") {
                                            if ($(fieldList[index]).attr("data-ms-widget-type") === "msTimebox") {
                                                timeboxValue = mService.containR.pattern.form.util.getInputValue(fieldList, index);
                                                if (timeboxValue !== "") {
                                                    timeboxValue = timeboxValue.split(":");
                                                    inputparamObj[fieldID + "_hour"] = timeboxValue[0].trim();
                                                    inputparamObj[fieldID + "_minute"] = timeboxValue[1].trim();
                                                    inputparamObj[fieldID + "_second"] = timeboxValue[2].trim();
                                                } else {
                                                    inputparamObj[fieldID + "_hour"] = "";
                                                    inputparamObj[fieldID + "_minute"] = "";
                                                    inputparamObj[fieldID + "_second"] = "";
                                                }
                                            } else if ($(fieldList[index]).attr("data-ms-widget-type") === "msAttachment" || $(fieldList[index]).attr("data-ms-widget-type") === "msCamera" || $(fieldList[index]).attr("data-ms-widget-type") === "msGallery" || $(fieldList[index]).attr("data-ms-widget-type") === "msImagepicker") {
                                                if ($(fieldList[index]).attr("data-ms-widget-attachmentind") === "false") {
                                                    inputparamObj[fieldID] = mService.containR.pattern.form.util.getInputValue(fieldList, index);
                                                }
                                            } else {
                                                inputparamObj[fieldID] = mService.containR.pattern.form.util.getInputValue(fieldList, index);
                                            }
                                        }
                                    }
                                } else {
                                    if ($(fieldList[index]).attr("data-ms-widget-msloop") === undefined || $(fieldList[index]).attr("data-ms-widget-msloop") === "") {
                                        if ($(fieldList[index]).attr("data-ms-widget-type") === "msAttachment" || $(fieldList[index]).attr("data-ms-widget-type") === "msCamera" || $(fieldList[index]).attr("data-ms-widget-type") === "msGallery" || $(fieldList[index]).attr("data-ms-widget-type") === "msImagepicker") {
                                            if (iObj.draftInd !== undefined && iObj.draftInd) {
                                                inputparamObj[fieldID] = mService.containR.pattern.form.util.getInputValue(fieldList, index);
                                            } else {
                                                if ($(fieldList[index]).attr("data-ms-widget-attachmentind") === "false") {
                                                    inputparamObj[fieldID] = mService.containR.pattern.form.util.getInputValue(fieldList, index);
                                                }
                                            }
                                        } else {
                                            if ($(fieldList[index]).attr("data-ms-widget-type") === "msTimebox") {
                                                timeboxValue = mService.containR.pattern.form.util.getInputValue(fieldList, index);
                                                if (timeboxValue !== "") {
                                                    timeboxValue = timeboxValue.split(":");
                                                    inputparamObj[fieldID + "_hour"] = timeboxValue[0].trim();
                                                    inputparamObj[fieldID + "_minute"] = timeboxValue[1].trim();
                                                    inputparamObj[fieldID + "_second"] = timeboxValue[2].trim();
                                                } else {
                                                    inputparamObj[fieldID + "_hour"] = "";
                                                    inputparamObj[fieldID + "_minute"] = "";
                                                    inputparamObj[fieldID + "_second"] = "";
                                                }
                                            } else {
                                                inputparamObj[fieldID] = mService.containR.pattern.form.util.getInputValue(fieldList, index);
                                            }
                                        }
                                    }
                                }
                            }
                        };
                        return inputparamObj;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getInputValue: function (fieldList, index) {
                    var returnValue;
                    try {
                        if ($(fieldList[index]).attr("data-ms-widget-type") === "msDatebox" || $(fieldList[index]).attr("data-ms-widget-type") === "msTimebox") {
                            if ($(fieldList[index]).attr("data-ms-widget-type") === "msDatebox") {
                                returnValue = ($(fieldList[index]).getVal() === null) ? "" : mService.util.getDateTimeString($(fieldList[index]).getVal(), "yyyy-MM-dd");
                            } else {
                                returnValue = ($(fieldList[index]).getVal() === null) ? "" : mService.util.getDateTimeString($(fieldList[index]).getVal(), "HH:mm:ss");
                            }
                        } else {
                            if ($(fieldList[index]).attr("data-ms-widget-type") === "msLoop") {
                                returnValue = $(fieldList[index]).getVal();
                            } else {
                                returnValue = ($(fieldList[index]).getVal() === null) ? "" : $(fieldList[index]).getVal();
                            }
                        };
                        return returnValue;
                    } catch (error) {}
                },
                getLocation: function (success, failure) {
                    try {
                        mService.util.checkLocationService(function (status) {
                            if (status === "true") {
                                window.minterface("GetLocation", [], function (location) {
                                    try {
                                        location = JSON.parse(location);
                                        if (location.lat == "UNK") {
                                            location.lat = "";
                                            location.lon = "";
                                        };
                                        success(location.lat, location.lon);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function (errorMsg) {
                                    try {
                                        mService.app.showToast("getLocation_error", "system_messages");
                                        mService.exception.handle(errorMsg);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                success("", "");
                            }
                        }, function (error) {
                            success("", "");
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getLocationStatus: function (success, failure) {
                    try {
                        window.minterface("CheckLocation", [], function (status) {
                            try {
                                success(status);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                mService.app.showToast("checkLocation_error", "system_messages");
                                mService.exception.handle(errorMsg);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                openDateTimeSettings: function (scrID) {
                    try {
                        if (mService.app.confirmMessage("turnOnAutomaticDateTime", scrID)) {
                            window.minterface("turnOnAutomaticDateTime", [], function (status) {
                                try {
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (errorMsg) {
                                try {
                                    mService.app.showToast("turnOnAutomaticDateTime_error", "system_messages");
                                    mService.exception.handle(errorMsg);
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            mService.app.showToast("containR_time_settings", "system_messages");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                saveAttachmentFiles: function (attachments, scrID, controllerObj, success, failure) {
                    try {
                        mService.queue.setData(scrID, controllerObj, {
                            url: "/common/components/msvFileHandler//UploadFiles.aspx?client_id=" + mService.app.getClientId() + "&country_code=" + mService.app.getCountryCode() + "&path=" + mService.containR.variable[scrID].docType,
                            key: scrID + "_attachment",
                            subkey: mService.containR.variable[scrID].transNo,
                            type: "attachments",
                            attachments: attachments
                        }, function (e) {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (e) {
                            try {
                                mService.app.showToast("attachment_error", "system_messages");
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                deleteAttachmentFileOffline: function (fileName, path, scrID, controllerObj, success, failure) {
                    var request_ref_no;
                    try {
                        request_ref_no = ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no));
                        mService.queue.setData(scrID, controllerObj, {
                            url: "/common/components/msvFileHandler//DeleteFiles.aspx?client_id=" + mService.app.getClientId() + "&country_code=" + mService.app.getCountryCode() + "&path=" + path + "/" + request_ref_no + "&files=" + fileName,
                            key: scrID + "_attachment",
                            subkey: request_ref_no,
                            input: "{}",
                        }, function (e) {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (e) {
                            try {
                                mService.app.showToast("attachment_delete_error", "system_messages");
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                deleteAttachmentFileOnline: function (fileName, path, scrID, controllerObj, success, failure) {
                    try {
                        if (window.navigator.onLine) {
                            $.ajax({
                                type: "POST",
                                url: mService.app.clientURL + "/common/components/msvFileHandler//DeleteFiles.aspx?client_id=" + mService.app.getClientId() + "&country_code=" + mService.app.getCountryCode() + "&path=" + path + "/" + ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no)) + "&files=" + fileName,
                                async: false,
                                method: "POST",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                data: "",
                                cache: false,
                                error: function () {
                                    try {
                                        mService.app.showToast("attachment_delete_error", "system_messages");
                                        failure();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    };
                                },
                                success: function (data) {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    };
                                }
                            });
                        } else {
                            mService.app.showToast("internet_connection_error", "system_messages");
                            failure();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            }
        },
        listview: {
            actions: {
                getMenus: function (scrID, iObj, success) {
                    var counter,
                    featuresList,
                    wFlowEventsHtml;
                    try {
                        featuresList = [];
                        wFlowEventsHtml = "";
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        featuresList = $.grep(mService.app.getFuncAccess(), function (e, i) {
                            try {
                                return e.p_parent_feature_group === scrID;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        for (counter = 0; counter < featuresList.length; counter++) {
                            if (featuresList[counter] !== undefined && featuresList[counter].p_feature_access === "true") {
                                wFlowEventsHtml += mService.config.template.getTransformedHtml(scrID + "_actions_template", ({
                                        scrID: scrID,
                                        featureID: featuresList[counter].p_child_feature_id_or_group,
                                        featureScreenID: featuresList[counter].p_child_screen_id,
                                        uid: iObj.uid
                                    }));
                            };
                        };
                        success(wFlowEventsHtml);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            },
            init: {
                getDataSource: function (scrID) {
                    var controllerObj;
                    try {
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        iObj = {
                            scrID: scrID,
                            code: controllerObj.dSource.list.code,
                            inputXml: controllerObj.dSource.list.inputXml
                        };
                        return new kendo.data.DataSource({
                            transport: {
                                read: function (e) {
                                    try {
                                        mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                                            try {
                                                e.success(data);
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                initializeListview: function (scrID) {
                    try {
                        $("#" + scrID + "_listview").kendoMobileListView({
                            pullToRefresh: true,
                            dataSource: mService.containR.pattern.listview.init.getDataSource(scrID),
                            template: $("#" + scrID + "_listview_template").text()
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            wFlow: {
                restrictFeatures: "",
                applyRestrictedFeatures: function (eventsList, scrID, success) {
                    try {
                        mService.config.rule.executeRuleStatements({
                            screenID: scrID,
                            objectID: "screen",
                            eventID: "load",
                            fieldID: scrID + "_content"
                        });
                        if (mService.containR.pattern.listview.wFlow.restrictFeatures !== "") {
                            if (mService.containR.pattern.listview.wFlow.restrictFeatures.indexOf("-") != -1) {
                                restrictFeaturesList = mService.containR.pattern.listview.wFlow.restrictFeatures.split("-");
                            } else {
                                restrictFeaturesList = mService.containR.pattern.listview.wFlow.restrictFeatures.split(",");
                            };
                            for (counter = 0; counter < restrictFeaturesList.length; counter++) {
                                eventsList.forEach(function (event, index) {
                                    try {
                                        if (event === restrictFeaturesList[counter]) {
                                            eventsList.splice(index, 1);
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            };
                            mService.containR.pattern.listview.wFlow.restrictFeatures = "";
                        };
                        success(eventsList);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getWorkflowEvents: function (scrID, iObj, success) {
                    var controllerObj;
                    try {
                        eventsList = [];
                        feature_id = "";
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj.presentR !== undefined) {
                            if (controllerObj.presentR.workflow_actions_type !== undefined && controllerObj.presentR.workflow_actions_type === "popup") {
                                success("");
                            } else {
                                mService.containR.pattern.listview.wFlow.getEvents(scrID, iObj, function (wFlowEventsHtml) {
                                    try {
                                        success(wFlowEventsHtml);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            }
                        } else {
                            mService.containR.pattern.listview.wFlow.getEvents(scrID, iObj, function (wFlowEventsHtml) {
                                try {
                                    success(wFlowEventsHtml);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getEvents: function (scrID, iObj, success) {
                    var counter,
                    grepReturn,
                    eventsList,
                    listRowData,
                    callAccess,
                    lastAccessedFeature,
                    controllerObj,
                    workFlowEventsKey,
                    companyFeatureAccessOrderKey,
                    employeeAccessInfoKey,
                    patternScrID;
                    try {
                        eventsList = [];
                        feature_id = "";
                        if (iObj !== undefined) {
                            listRowData = {
                                call_ref_no: ((iObj.request_ref_no === undefined) ? (iObj.call_no) : (iObj.request_ref_no)),
                                category: ((iObj.request_category === undefined) ? (iObj.call_category) : (iObj.request_category)),
                                type: ((iObj.request_type === undefined) ? (iObj.call_type) : (iObj.request_type)),
                                stage: ((iObj.request_wf_stage === undefined) ? (iObj.call_wf_stage) : (iObj.request_wf_stage)),
                                status: ((iObj.request_status === undefined) ? (iObj.call_status) : (iObj.request_status)),
                                assigned_to_emp_id: iObj.assigned_to_emp_id,
                                assignee_mapped_to_emp_id: iObj.assignee_mapped_to_emp_id,
                                lastAccessedFeature: iObj.last_accessed_feature,
                                uid: iObj.uid
                            };
                            controllerObj = mService.config.controller.getControllerObj(scrID);
                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                workFlowEventsKey = scrID + "_" + "workflow_event_verb";
                                companyFeatureAccessOrderKey = scrID + "_" + "company_feature_access_order";
                                employeeAccessInfoKey = scrID + "_" + "employee_last_access_info";
                                patternScrID = scrID.replace("_list", "");
                            } else {
                                workFlowEventsKey = controllerObj.workFlowEventsKey;
                                companyFeatureAccessOrderKey = controllerObj.companyFeatureAccessOrderKey;
                                employeeAccessInfoKey = "EMPLOYEE_LAST_ACCESS_INFO";
                                patternScrID = scrID;
                            };
                            callAccess = mService.containR.pattern.listview.util.validateCallAccess(listRowData, employeeAccessInfoKey);
                            mService.containR.pattern.listview.wFlow.getWflowOrder(listRowData, workFlowEventsKey, function (allowedWflow) {
                                try {
                                    mService.containR.pattern.listview.wFlow.getCompanyFeatureAccessOrder(listRowData, companyFeatureAccessOrderKey, function (allowedAccessOrder) {
                                        try {
                                            if (callAccess.newCall) {
                                                lastAccessedFeature = iObj.last_accessed_feature;
                                            } else {
                                                if (mService.dSource.cache[employeeAccessInfoKey] !== undefined && mService.dSource.cache[employeeAccessInfoKey].data()[0] !== undefined) {
                                                    lastAccessedFeature = mService.dSource.cache[employeeAccessInfoKey].data()[0].feature_id;
                                                }
                                            };
                                            if (callAccess.allowAccess) {
                                                grepReturn = $.grep(allowedAccessOrder, function (e, i) {
                                                    try {
                                                        return ((e.from_feature_id === "ALL") || (e.from_feature_id === lastAccessedFeature));
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } else {
                                                grepReturn = $.grep(allowedAccessOrder, function (e, i) {
                                                    try {
                                                        return (e.from_feature_id === "ALL");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            };
                                            for (counter = 0; counter < grepReturn.length; counter++) {
                                                featureAccess = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                                    try {
                                                        return e.p_child_feature_id_or_group === grepReturn[counter].to_feature_id;
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                })[0];
                                                if (featureAccess !== undefined && featureAccess.p_feature_access === "true") {
                                                    eventsList.push(grepReturn[counter].to_feature_id);
                                                }
                                            };
                                            if (callAccess.allowAccess) {
                                                for (counter = 0; counter < allowedWflow.length; counter++) {
                                                    grepReturn = $.grep(allowedAccessOrder, function (e, i) {
                                                        try {
                                                            return (e.to_feature_id === allowedWflow[counter].feature_id);
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                    if (grepReturn.length === 0) {
                                                        featureAccess = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                                            try {
                                                                return e.p_child_feature_id_or_group === allowedWflow[counter].feature_id;
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        })[0];
                                                        if (featureAccess !== undefined && featureAccess.p_feature_access === "true") {
                                                            eventsList.push(allowedWflow[counter].feature_id);
                                                        }
                                                    }
                                                };
                                            };
                                            mService.containR.pattern.listview.wFlow.applyRestrictedFeatures(eventsList, scrID, function (eventsList) {
                                                var actionsList = [];
                                                try {
                                                    if (eventsList.length > 0) {
                                                        $.each(eventsList, function (i, el) {
                                                            try {
                                                                if ($.inArray(el, actionsList) === -1) {
                                                                    actionsList.push(el);
                                                                }
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        });
                                                        var wFlowEventsHtml = "";
                                                        for (counter = 0; counter < actionsList.length; counter++) {
                                                            wFlowEventsHtml += mService.config.template.getTransformedHtml(scrID + "_actions_template", ({
                                                                    scrID: patternScrID,
                                                                    featureID: actionsList[counter],
                                                                    featureName: actionsList[counter],
                                                                    uid: listRowData.uid
                                                                }));
                                                        };
                                                        success(wFlowEventsHtml);
                                                    } else {
                                                        success("");
                                                    }
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            success("");
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    success("");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            success("");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateEventLog: function (scrID) {
                    var selectedRecord,
                    eventLog;
                    try {
                        selectedRecord = mService.dSource.cache[mService.containR.variable[scrID].dSourceKey].getByUid(mService.containR.variable[scrID].selectedRecord.uid);
                        mService.util.getNewDate(function (date) {
                            try {
                                eventLog = {
                                    event_date: mService.util.getDateTimeString(date, "yyyy-MM-dd"),
                                    event_hour: mService.util.getDateTimeString(date, "HH"),
                                    event_minute: mService.util.getDateTimeString(date, "mm"),
                                    channel_id: mService.app.channel,
                                    from_stage: mService.containR.variable[scrID].selectedRecord.request_wf_stage,
                                    from_stage_desc: mService.containR.variable[scrID].selectedRecord.request_wf_stage_desc,
                                    to_stage: mService.containR.variable[scrID].to_wf_stage,
                                    to_stage_desc: mService.containR.variable[scrID].to_wf_status_desc,
                                    from_status: mService.containR.variable[scrID].selectedRecord.request_status,
                                    from_status_desc: mService.containR.variable[scrID].selectedRecord.request_status_desc,
                                    to_status: mService.containR.variable[scrID].to_wf_status,
                                    to_status_desc: mService.containR.variable[scrID].to_wf_status_desc,
                                    event_verb_id: mService.containR.variable[scrID].eventVerbID,
                                    by_emp_name: mService.app.getTitle() + " " + mService.app.getFirstName() + " " + mService.app.getLastName(),
                                    by_emp_id: mService.app.getEmployeeId()
                                };
                                selectedRecord.event_log.push(eventLog);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("get_date_error", scrID);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateEventStatus: function (scrID) {
                    var selectedRecord;
                    try {
                        selectedRecord = mService.dSource.cache[mService.containR.variable[scrID].dSourceKey].getByUid(mService.containR.variable[scrID].selectedRecord.uid);
                        if (selectedRecord.request_wf_stage !== undefined) {
                            selectedRecord.set("request_wf_stage", mService.containR.variable[scrID].to_wf_stage);
                            selectedRecord.set("request_status", mService.containR.variable[scrID].to_wf_status);
                            selectedRecord.set("request_status_desc", mService.containR.variable[scrID].to_wf_status_desc);
                            selectedRecord.set("last_accessed_feature", mService.containR.variable[scrID].last_accessed_feature);
                            mService.containR.variable[scrID].selectedRecord.request_wf_stage = mService.containR.variable[scrID].to_wf_stage;
                            mService.containR.variable[scrID].selectedRecord.request_status = mService.containR.variable[scrID].to_wf_status;
                            mService.containR.variable[scrID].selectedRecord.request_status_desc = mService.containR.variable[scrID].to_wf_status_desc;
                        } else {
                            selectedRecord.set("call_wf_stage", mService.containR.variable[scrID].to_wf_stage);
                            selectedRecord.set("call_status", mService.containR.variable[scrID].to_wf_status);
                            selectedRecord.set("call_status_desc", mService.containR.variable[scrID].to_wf_status_desc);
                            selectedRecord.set("last_accessed_feature", mService.containR.variable[scrID].last_accessed_feature);
                            mService.containR.variable[scrID].selectedRecord.call_wf_stage = mService.containR.variable[scrID].to_wf_stage;
                            mService.containR.variable[scrID].selectedRecord.call_status = mService.containR.variable[scrID].to_wf_status;
                            mService.containR.variable[scrID].selectedRecord.call_status_desc = mService.containR.variable[scrID].to_wf_status_desc;
                        };
                        mService.containR.variable[scrID].selectedRecord.last_accessed_feature = mService.containR.variable[scrID].last_accessed_feature;
                        mService.config.rule.executeRuleStatements({
                            screenID: scrID,
                            objectID: "datasource",
                            eventID: "update",
                            fieldID: mService.containR.variable[scrID].eventVerbID
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getListDataSource: function (scrID, success) {
                    try {
                        mService.dSource.util.localRead(scrID, function (data) {
                            var localDSrc;
                            try {
                                localDSrc = new kendo.data.DataSource({
                                    data: data
                                });
                                localDSrc.read().then(function () {
                                    try {
                                        success(localDSrc);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    };
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            var data;
                            try {
                                data = new kendo.data.DataSource({
                                    data: [],
                                });
                                data.read().then(function () {
                                    try {
                                        success(data);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    };
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateListDataSource: function (scrID, success) {
                    var listControllerObj,
                    listIndex,
                    listScreenId,
                    dSourceKey;
                    try {
                        listControllerObj = mService.config.controller.getControllerObj(mService.containR.variable[scrID].listScreenId);
                        listScreenId = mService.containR.variable[scrID].listScreenId;
                        if (listControllerObj.pattern !== undefined && listControllerObj.pattern === "true") {
                            dSourceKey = listScreenId;
                            listScreenId = listScreenId.replace("_list", "");
                        } else {
                            dSourceKey = listScreenId + "_list";
                        };
                        mService.containR.pattern.listview.wFlow.getListDataSource(dSourceKey, function (datasource) {
                            try {
                                for (listIndex = 0; listIndex < datasource.data().length; listIndex++) {
                                    if (((datasource.data()[listIndex].request_ref_no === undefined) ? (datasource.data()[listIndex].call_no) : (datasource.data()[listIndex].request_ref_no)) === ((mService.containR.variable[scrID].selectedRecord.request_ref_no === undefined) ? (mService.containR.variable[scrID].selectedRecord.call_no) : (mService.containR.variable[scrID].selectedRecord.request_ref_no))) {
                                        $.extend(true, datasource.data()[listIndex], mService.containR.variable[scrID].selectedRecord);
                                    }
                                };
                                mService.dSource.util.localWrite(dSourceKey, datasource.data(), function (data) {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getCompanyFeatureAccessOrder: function (listData, companyFeatureAccessOrderKey, success, failure) {
                    var companyFeatureAccessOrderData,
                    data;
                    try {
                        data = mService.dSource.cache[companyFeatureAccessOrderKey];
                        if (data !== undefined && data.data().length > 0) {
                            companyFeatureAccessOrderData = $.grep(data.data(), function (e, i) {
                                try {
                                    return ((e.req_catg === listData.category && e.req_type === listData.type && e.req_stage === listData.stage && e.req_status === listData.status) || (e.req_catg === listData.category && e.req_type === listData.type && e.req_stage === "0" && e.req_status === "ALL") || (e.req_catg === listData.category && e.req_type === "ALL" && e.req_stage === listData.stage && e.req_status === listData.status) || (e.req_catg === listData.category && e.req_type === "ALL" && e.req_stage === "0" && e.req_status === "ALL") || (e.req_catg === "ALL" && e.req_type === "ALL" && e.req_stage === listData.stage && e.req_status === listData.status) || (e.req_catg === "ALL" && e.req_type === "ALL" && e.req_stage === "0" && e.req_status === "ALL"));
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                            success(companyFeatureAccessOrderData);
                        } else {
                            failure();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getWflowOrder: function (listData, workFlowEventsKey, success, failure) {
                    var data;
                    try {
                        data = mService.dSource.cache[workFlowEventsKey];
                        if (data !== undefined && data.data().length > 0) {
                            eventsData = $.grep(data.data(), function (e, i) {
                                try {
                                    return ((e.req_catg === listData.category && e.req_type === listData.type && e.from_wf_stage === listData.stage && e.from_wf_status === listData.status) || (e.req_catg === listData.category && e.req_type === "ALL" && e.from_wf_stage === listData.stage && e.from_wf_status === listData.status) || (e.req_catg === "ALL" && e.req_type === "ALL" && e.from_wf_stage === listData.stage && e.from_wf_status === listData.status));
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                            success(eventsData);
                        } else {
                            failure();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getUserFunctionalAccess: function (success, failure) {
                    var workFlowFeatures;
                    try {
                        workFlowFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                            try {
                                return e.p_parent_feature_group === "WORKFLOW";
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        if (workFlowFeatures.length !== 0) {
                            success(workFlowFeatures);
                        } else {
                            failure();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            util: {
                filter: {
                    initListviewWithFilter: function (scrID, controllerObj, clearDSrcInd, syncInd, autoRefreshInd) {
                        var dSourceKey;
                        try {
                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                patternScrID = scrID.replace("_list", "");
                                dSourceKey = scrID;
                            } else {
                                patternScrID = scrID;
                                dSourceKey = scrID + "_list";
                            };
                            if (clearDSrcInd) {
                                mService.dSource.cache[dSourceKey] = undefined;
                            };
                            mService.dSource.getCachedData(scrID, controllerObj, function (dataSource) {
                                var filterObj,
                                filterBtnEle,
                                filterParentIndex,
                                filterChildIndex;
                                try {
                                    $("#home_functional_drawer_filter_content").html("");
                                    filterObj = mService.containR.variable[patternScrID].datasource.filterObj;
                                    mService.api.filter.apply(filterObj, dataSource, scrID);
                                    filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                                    if (filterBtnEle.length > 0) {
                                        if (controllerObj.pattern !== undefined) {
                                            if (controllerObj.filterOptions !== undefined) {
                                                mService.api.filter.init(controllerObj.filterOptions.split(","), dataSource, scrID);
                                            }
                                        } else {
                                            mService.api.filter.init($(filterBtnEle).attr("data-ms-filter-options").split(","), dataSource, scrID);
                                        };
                                        for (filterParentIndex = 0; filterParentIndex < filterObj.filters.length; filterParentIndex++) {
                                            for (filterChildIndex = 0; filterChildIndex < filterObj.filters[filterParentIndex].filters.length; filterChildIndex++) {
                                                $("[name='" + scrID + "_filter_" + filterObj.filters[filterParentIndex].filters[filterChildIndex].field + "_input'][value='" + filterObj.filters[filterParentIndex].filters[filterChildIndex].value + "']").prop("checked", true);
                                            };
                                        };
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, syncInd, autoRefreshInd);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    initFreeflowListWithFilter: function (scrID, controllerObj, clearDSrcInd, syncInd, autoRefreshInd) {
                        var dSourceKey;
                        try {
                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                patternScrID = scrID.replace("_list", "");
                                dSourceKey = scrID;
                            } else {
                                patternScrID = scrID;
                                dSourceKey = scrID + "_list";
                            };
                            if (clearDSrcInd) {
                                mService.dSource.cache[dSourceKey] = undefined;
                            };
                            mService.containR.pattern.listview.util.getMasterDataSource(scrID, controllerObj, syncInd, autoRefreshInd, function (dataSource) {
                                var filterObj,
                                filterBtnEle,
                                filterParentIndex,
                                filterChildIndex;
                                try {
                                    $("#home_functional_drawer_filter_content").html("");
                                    filterObj = mService.containR.variable[patternScrID].datasource.filterObj;
                                    mService.api.filter.apply(filterObj, dataSource, scrID);
                                    filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                                    if (filterBtnEle.length > 0) {
                                        if (controllerObj.pattern !== undefined) {
                                            if (controllerObj.filterOptions !== undefined) {
                                                mService.api.filter.init(controllerObj.filterOptions.split(","), dataSource, scrID);
                                            }
                                        } else {
                                            mService.api.filter.init($(filterBtnEle).attr("data-ms-filter-options").split(","), dataSource, scrID);
                                        };
                                        for (filterParentIndex = 0; filterParentIndex < filterObj.filters.length; filterParentIndex++) {
                                            for (filterChildIndex = 0; filterChildIndex < filterObj.filters[filterParentIndex].filters.length; filterChildIndex++) {
                                                $("[name='" + scrID + "_filter_" + filterObj.filters[filterParentIndex].filters[filterChildIndex].field + "_input'][value='" + filterObj.filters[filterParentIndex].filters[filterChildIndex].value + "']").prop("checked", true);
                                            };
                                        };
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                },
                getLastAccessedFeature: function () {
                    var lastAccessInfo;
                    try {
                        lastAccessInfo = mService.containR.pattern.listview.util.getEmployeeLastAccessInfo();
                        return (lastAccessInfo == undefined) ? "" : lastAccessInfo.feature_id;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getMasterDataSource: function (scrID, controllerObj, syncInd, autoRefreshInd, success) {
                    var masterDSrc;
                    try {
                        if (controllerObj.masterListDataSource !== undefined && controllerObj.masterListDataSource === "attachments") {
                            masterDSrc = new kendo.data.DataSource({
                                data: mService.containR.variable[scrID].selectedRecord.attachments
                            });
                            masterDSrc.read().then(function () {
                                try {
                                    mService.dSource.cache[scrID] = masterDSrc;
                                    success(masterDSrc);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            });
                        } else {
                            mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                                var dSourceKey;
                                try {
                                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                        dSourceKey = scrID;
                                    } else {
                                        dSourceKey = scrID + "_list";
                                    };
                                    mService.dSource.cache[dSourceKey] = data;
                                    success(data);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, syncInd, autoRefreshInd);
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getDataSourceForFilter: function (scrID, success, failure) {
                    var controllerObj,
                    patternScrID,
                    dSourceKey;
                    try {
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                            patternScrID = scrID.replace("_list", "");
                            dSourceKey = scrID;
                        } else {
                            patternScrID = scrID;
                            dSourceKey = scrID + "_list";
                        };
                        if (mService.containR.variable[patternScrID].datasource.filterObj === undefined || $.isEmptyObject(mService.containR.variable[patternScrID].datasource.filterObj)) {
                            success(mService.dSource.cache[dSourceKey]);
                        } else {
                            mService.dSource.util.localRead(dSourceKey, function (data) {
                                var localDSrc;
                                try {
                                    localDSrc = new kendo.data.DataSource({
                                        data: data
                                    });
                                    localDSrc.read().then(function () {
                                        try {
                                            success(localDSrc);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        };
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            }, function () {
                                try {
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            });
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateLocalDataSource: function (controllerObj, dataSrcKey, success, failure) {
                    var parentControllerObj;
                    try {
                        if (controllerObj.masterListDataSource !== undefined && controllerObj.masterListDataSource === "attachments") {
                            parentControllerObj = mService.config.controller.getControllerObj(mService.containR.variable[mService.app.getScreenId()].listScreenId);
                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                dataSrcKey = mService.containR.variable[mService.app.getScreenId()].listScreenId;
                            } else {
                                dataSrcKey = mService.containR.variable[mService.app.getScreenId()].listScreenId + "_list";
                            }
                        };
                        mService.dSource.util.localWrite(dataSrcKey, mService.dSource.cache[dataSrcKey].data(), function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                refreshListview: function (scrID, syncInd, autoRefreshInd) {
                    var controllerObj,
                    filterObj,
                    patternScrID;
                    try {
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                            patternScrID = scrID.replace("_list", "");
                        } else {
                            patternScrID = scrID;
                        };
                        if (controllerObj.masterListDataSource !== undefined && controllerObj.masterListDataSource === "attachments") {
                            return true;
                        } else {
                            mService.containR.variable[patternScrID].syncInd = true;
                            if (syncInd || autoRefreshInd) {
                                $("#home_functional_drawer_filter_content").html("");
                                filterObj = mService.containR.variable[patternScrID].datasource.filterObj;
                                if (filterObj !== undefined && !$.isEmptyObject(filterObj)) {
                                    mService.containR.pattern.listview.util.filter.initListviewWithFilter(scrID, controllerObj, false, syncInd, autoRefreshInd);
                                } else {
                                    if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined && controllerObj.presentR.list_type === "listview") {
                                        mService.presentR.pattern.listview.init.initializeListview(scrID, syncInd, autoRefreshInd);
                                    } else {
                                        if (controllerObj.presentR === undefined) {
                                            mService.presentR.pattern.listview.init.initializeListview(scrID, syncInd, autoRefreshInd);
                                        } else {
                                            mService.presentR.pattern.util.destroyScrollview(scrID);
                                            $("#" + scrID + "_pager").remove();
                                            mService.presentR.pattern.listview.init.initializeScrollViewList(scrID, syncInd, autoRefreshInd);
                                        }
                                    }
                                }
                            } else {
                                if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined && controllerObj.presentR.list_type === "listview") {
                                    if (controllerObj.containR_subtype === "master") {
                                        mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID, false, false);
                                    } else {
                                        mService.presentR.pattern.listview.init.initializeListview(scrID, syncInd, autoRefreshInd);
                                    }
                                } else {
                                    mService.presentR.pattern.util.destroyScrollview(scrID);
                                    $("#" + scrID + "_pager").remove();
                                    mService.presentR.pattern.listview.init.initializeScrollViewList(scrID, syncInd, autoRefreshInd);
                                }
                            }
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                setEmployeeLastAccessInfo: function (scrID, iObj, success, failure) {
                    mService.util.getNewDate(function (date) {
                        var featureObj,
                        lastAccessInfo,
                        employeeAccessInfoKey,
                        controllerObj;
                        try {
                            controllerObj = mService.config.controller.getControllerObj(scrID);
                            if (controllerObj.patternScreenId !== undefined) {
                                employeeAccessInfoKey = controllerObj.patternScreenId + "_list" + "_" + "employee_last_access_info";
                            } else {
                                employeeAccessInfoKey = "EMPLOYEE_LAST_ACCESS_INFO";
                            };
                            featureObj = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                try {
                                    return e.p_child_feature_id_or_group == iObj.feature_id;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            })[0];
                            lastAccessInfo = mService.dSource.cache[employeeAccessInfoKey].data()[0];
                            if (iObj.modify_last_transaction == "true") {
                                if (lastAccessInfo != undefined) {
                                    var dataItem = mService.dSource.cache[employeeAccessInfoKey].at(0);
                                    mService.dSource.cache[employeeAccessInfoKey].remove(dataItem);
                                    mService.dSource.cache[employeeAccessInfoKey].insert({
                                        txn_ind: iObj.txn_ind,
                                        txn_ref_no: iObj.txn_ref_no,
                                        txn_sub_ref_no: iObj.txn_sub_ref_no,
                                        feature_id: featureObj.p_child_feature_id_or_group,
                                        allow_newtxn_ind: iObj.allow_new_transaction,
                                        channel_id: mService.app.channel,
                                        date: kendo.toString(date, "yyyy-MM-dd"),
                                        hour: kendo.toString(date, "HH"),
                                        minute: kendo.toString(date, "mm"),
                                        session_id: mService.app.getSessionId()
                                    });
                                } else {
                                    localDSrc = new kendo.data.DataSource({
                                        data: [{
                                                txn_ind: iObj.txn_ind,
                                                txn_ref_no: iObj.txn_ref_no,
                                                txn_sub_ref_no: iObj.txn_sub_ref_no,
                                                feature_id: featureObj.p_child_feature_id_or_group,
                                                allow_newtxn_ind: iObj.allow_new_transaction,
                                                channel_id: mService.app.channel,
                                                date: kendo.toString(date, "yyyy-MM-dd"),
                                                hour: kendo.toString(date, "HH"),
                                                minute: kendo.toString(date, "mm"),
                                                session_id: mService.app.getSessionId()
                                            }
                                        ]
                                    });
                                    localDSrc.read().then(function () {
                                        try {
                                            mService.dSource.cache[employeeAccessInfoKey] = localDSrc;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        };
                                    });
                                };
                                mService.dSource.util.localWrite(employeeAccessInfoKey, mService.dSource.cache[employeeAccessInfoKey].data(), function (data) {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        failure();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                },
                updateAttachment: function (scrID, controllerObj, success, failure) {
                    var attachmentData;
                    try {
                        if (controllerObj.digitalReport === "true") {
                            attachmentData = {
                                attached_at_transaction: mService.containR.variable[scrID].transType,
                                category: "P",
                                type: "P",
                                id: "",
                                name: mService.containR.variable[scrID].formName + ".html",
                                extension: ".pdf",
                                path: mService.containR.variable[scrID].docType
                            };
                            mService.containR.variable[scrID].selectedRecord.attachments.push(attachmentData);
                            success();
                        } else {
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateFormAttachment: function (scrID, controllerObj, success, failure) {
                    try {
                        if (controllerObj.digitalReport === "true") {
                            mService.nfs.createFile(mService.app.getClientId() + '/' + mService.app.getCountryCode() + '/' + 'content_store' + '/' + mService.containR.variable[scrID].docType + "/" + mService.containR.variable[scrID].formName + ".html", mService.containR.pattern.form.submit.getPreviewHtmlString(scrID), function () {
                                try {
                                    mService.containR.pattern.listview.util.updateAttachment(scrID, controllerObj, function () {
                                        try {
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.containR.variable[scrID].submitInAction = false;
                                            mService.spinner.hide();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            mService.dSource.util.updateDataSource(mService.containR.variable[scrID].dSourceKey, "addAttachment");
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                validateCallAccess: function (iObj, employeeAccessInfoKey) {
                    var lastAccessInfo,
                    returnObj;
                    try {
                        returnObj = {
                            allowAccess: false,
                            newCall: false
                        };
                        if ((iObj.assigned_to_emp_id == undefined || iObj.assigned_to_emp_id == "") || (iObj.assigned_to_emp_id == mService.app.getEmployeeId() || iObj.assignee_mapped_to_emp_id == mService.app.getEmployeeId())) {
                            if (mService.dSource.cache[employeeAccessInfoKey] !== undefined) {
                                lastAccessInfo = mService.dSource.cache[employeeAccessInfoKey].data()[0];
                            };
                            if (lastAccessInfo == undefined) {
                                returnObj.allowAccess = true;
                                returnObj.newCall = true;
                            } else {
                                if ((lastAccessInfo.txn_ref_no === iObj.call_ref_no) && lastAccessInfo.allow_newtxn_ind == "false") {
                                    returnObj.allowAccess = true;
                                } else if (lastAccessInfo.allow_newtxn_ind == "true") {
                                    returnObj.allowAccess = true;
                                    returnObj.newCall = true;
                                }
                            }
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    };
                    return returnObj;
                },
            }
        },
        content: {
            init: function (scrID) {
                try {
                    mService.presentR.pattern.content.display(scrID, scrID + "_template", mService.containR.variable[scrID].selectedRecord);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    util: {
        checkCacheData: function (cacheKeyArr, success) {
            var cacheCheckTimer;
            try {
                cacheCheckTimer = setInterval(function () {
                    var status,
                    keyIndex;
                    try {
                        status = true;
                        for (keyIndex = 0; keyIndex < cacheKeyArr.length; keyIndex++) {
                            if (mService.dSource.cache[cacheKeyArr[keyIndex]] === undefined) {
                                status = false;
                            }
                        };
                        if (status) {
                            clearInterval(cacheCheckTimer);
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, 500);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        deviceLocation: {
            showMap: function (dataObj) {
                try {
                    mService.spinner.show();
                    mService.containR.util.deviceLocation.init(mService.app.getScreenId(), function () {
                        try {
                            mService.api.geoLocation.getUserLocation(dataObj.deviceID, function (result) {
                                try {
                                    $("#home_device_location_popup_content").msMap({
                                        scrid: mService.app.getScreenId(),
                                        zoomlevel: dataObj.mapZoomLevel,
                                        zoomcontrol: "true",
                                        maptypecontrol: "true",
                                        fullscreencontrol: "true",
                                        refreshbutton: "true"
                                    });
                                    mService.widgets.event.msMap.addMarker("home_device_location_popup_content", result[0].p_lattitude_val, result[0].p_longitude_val);
                                    mService.spinner.hide();
                                    $("#home_device_location_popup").data("kendoWindow").open().center();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (errorCode) {
                                try {
                                    mService.spinner.hide();
                                    mService.app.showToast(errorCode, "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function (scrID, success) {
                try {
                    if ($("#home_device_location_popup").data("kendoWindow") === undefined) {
                        $("#home_device_location_popup").kendoWindow({
                            width: (screen.width * 0.90),
                            height: (screen.height * 0.80),
                            title: {
                                text: "<span id='home_device_location_popup_title' data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='device_location_popup' data-ms-lbl-id='device_location_popup_title'></span>",
                                encoded: false
                            },
                            open: function () {
                                try {
                                    mService.config.label.resolve();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            modal: true,
                            draggable: false,
                            resizable: false
                        });
                        $("#home_device_location_popup").parent().addClass("ms_window");
                        success();
                    } else {
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        displayNavArrows: function (pageNo, listviewInd, scrID) {
            var controllerObj,
            dSourceKey;
            try {
                if (listviewInd) {
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                        dSourceKey = scrID;
                    } else {
                        dSourceKey = scrID + "_list";
                    };
                    totalPages = mService.dSource.cache[dSourceKey].data().length;
                } else {
                    totalPages = $("#" + scrID + "_main_page" + " [data-role = 'page']");
                };
                if (totalPages > 0) {
                    if (totalPages === 1) {
                        $("#" + scrID + "_scrollview_arrow_left").hide();
                        $("#" + scrID + "_scrollview_arrow_right").hide();
                    } else {
                        if (pageNo === 1) {
                            $("#" + scrID + "_scrollview_arrow_left").hide();
                            $("#" + scrID + "_scrollview_arrow_right").show();
                        } else if (pageNo === totalPages) {
                            $("#" + scrID + "_scrollview_arrow_left").show();
                            $("#" + scrID + "_scrollview_arrow_right").hide();
                        } else {
                            $("#" + scrID + "_scrollview_arrow_left").show();
                            $("#" + scrID + "_scrollview_arrow_right").show();
                        }
                    }
                } else {
                    $("#" + scrID + "_scrollview_arrow_left").hide();
                    $("#" + scrID + "_scrollview_arrow_right").hide();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        checkLocalQueueFiles: function (clientID, countryCode, success, failure) {
            try {
                mService.nfs.getFileList(clientID + "/" + countryCode + "/" + "database" + "/" + "queue", function (files) {
                    try {
                        if (files.length > 0) {
                            failure();
                        } else {
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getQueueSyncIndicator: function (accountData, success, failure) {
            try {
                window.minterface("QueueProcessor", [], function (e) {
                    window.minterface("GetSyncIndicator", [{
                                "client_id": (accountData === "") ? (mService.app.getClientId()) : (accountData.client_id),
                                "country_code": (accountData === "") ? (mService.app.getCountryCode()) : (accountData.country_code),
                                "user_id": (accountData === "") ? (mService.app.getUserId()) : (accountData.user_id),
                                "client_url": (accountData === "") ? (mService.app.clientURL) : (accountData.client_url)
                            }
                        ], function (indicator) {
                        try {
                            success(indicator);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorMsg) {
                        try {
                            if (window.navigator.onLine) {
                                mService.app.showToast("getSyncIndicator_error", "system_messages");
                            } else {
                                mService.app.showToast("internet_connection_error", "system_messages");
                            };
                            mService.exception.handle(errorMsg);
                            failure("getSyncIndicator_error");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }, function (errorMsg) {
                    if (window.navigator.onLine) {
                        mService.app.showToast("queueProcessor_error", "system_messages");
                    };
                    failure("call_sync_pending");
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getCallDetails: function (scrID, transaction_ref_no, success) {
            var controllerObj,
            inputXml,
            call_data_source,
            dSourceKey;
            try {
                if (window.navigator.onLine) {
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                        dSourceKey = scrID;
                    } else {
                        dSourceKey = scrID + "_list";
                    };
                    inputXml = JSON.parse(mService.util.getTransformedValue(controllerObj.dSource[dSourceKey].inputParam.inputXml));
                    inputXml.request_ref_no_filter = transaction_ref_no;
                    call_data_source = mService.dSource.getSource({
                        code: "'" + mService.util.getTransformedValue(controllerObj.dSource[dSourceKey].inputParam.code) + "'",
                        inputXml: "'" + JSON.stringify(inputXml) + "'"
                    });
                    call_data_source.read().then(function () {
                        try {
                            if (call_data_source.data().length > 0) {
                                success(call_data_source.data()[0]);
                            } else {
                                success({});
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    });
                } else {
                    success("Internet_not_available");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        handleContainRType: function (controllerObj, scrID, childScreenInd) {
            try {
                if (controllerObj.pattern_name === undefined) {
                    if (controllerObj.containR_type === "form") {
                        mService.containR.initForm(scrID);
                    } else if (controllerObj.containR_type === "listview") {
                        mService.containR.initListview(scrID);
                    } else if (controllerObj.containR_type === "chat") {
                        mService.containR.initChat(scrID);
                    }
                } else {
                    mService.spinner.show();
                    mService.containR.util.loadPatternLib(controllerObj.pattern_name, function () {
                        try {
                            mService.containR.config.util.loadConfigData((childScreenInd === undefined) ? (scrID) : (scrID.replace(/_details$/, "")), function () {
                                try {
                                    mService.spinner.hide();
                                    mService.pattern[controllerObj.pattern_name].init(scrID, controllerObj);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (err) {
                                try {
                                    mService.app.showToast("load_config_files_error", scrID);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (err) {
                        try {
                            console.error("Unable to load pattern library")
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        handleBackClick: function (scrID) {
            var msgCode,
            controllerObj;
            try {
                controllerObj = mService.config.controller.getControllerObj(scrID);
                if (controllerObj.containR_type === "form") {
                    if (controllerObj.containR_subtype !== "content") {
                        document.activeElement.blur();
                        if (mService.containR.variable[scrID].draftInd !== undefined && mService.containR.variable[scrID].draftInd === "true") {
                            if (mService.containR.variable[scrID].valueChangeIndicator || mService.containR.variable[scrID].draftSavedInd === true) {
                                msgCode = "form_back_click_auto_save_alert";
                                $("<div></div>").msDialog({
                                    content: mService.config.template.getTransformedMessage(mService.config.label.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]["confirmMessages"][msgCode]),
                                    actions: {
                                        "CANCEL": {
                                            text: "<i class='fas " + mService.icons.draft.cancel + "'></i>",
                                            action: function (e) {
                                                try {
                                                    return true;
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }
                                        },
                                        "Dont Save": {
                                            text: "<i class='fas " + mService.icons.draft.do_not_save + "'></i>",
                                            action: function (e) {
                                                try {
                                                    mService.containR.variable[scrID].draftSavedInd = false;
                                                    mService.containR.variable[scrID].valueChangeIndicator = false;
                                                    mService.containR.variable[scrID].draftData = "";
                                                    mService.containR.pattern.form.util.deleteDraftFile(scrID, function () {
                                                        try {
                                                            mService.containR.util.processBackClick(scrID);
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.containR.util.processBackClick(scrID);
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }
                                        },
                                        "Save": {
                                            text: "<i class='far " + mService.icons.draft.save + "'></i>",
                                            action: function (e) {
                                                var scrollView;
                                                try {
                                                    scrollView = $("#" + scrID + "_main_page").data("kendoMobileScrollView");
                                                    mService.containR.pattern.form.draft.saveFile(scrollView.page + 1, scrID, function () {
                                                        try {
                                                            mService.app.showToast("save_draft_success", scrID);
                                                            mService.containR.variable[scrID].draftSavedInd = false;
                                                            mService.containR.variable[scrID].valueChangeIndicator = false;
                                                            mService.containR.util.processBackClick(scrID);
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.app.showToast("save_draft_error", scrID);
                                                            mService.containR.variable[scrID].draftSavedInd = false;
                                                            mService.containR.variable[scrID].valueChangeIndicator = false;
                                                            mService.containR.util.processBackClick(scrID);
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            },
                                            primary: true
                                        }
                                    }
                                });
                            } else {
                                mService.containR.util.processBackClick(scrID);
                            }
                        } else {
                            if (mService.containR.variable[scrID].valueChangeIndicator) {
                                $("<div></div>").msDialog({
                                    content: mService.config.template.getTransformedMessage(mService.config.label.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]["confirmMessages"]["form_back_click_data_alert"]),
                                    actions: {
                                        "CANCEL": {
                                            text: "<i class='fas " + mService.icons.draft.cancel + "'></i>",
                                            action: function (e) {
                                                try {
                                                    return true;
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }
                                        },
                                        "Save": {
                                            text: "<i class='far far fa-check'></i>",
                                            action: function (e) {
                                                try {
                                                    mService.containR.variable[scrID].valueChangeIndicator = false;
                                                    mService.containR.util.processBackClick(scrID);
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            },
                                            primary: true
                                        }
                                    }
                                });
                            } else {
                                mService.containR.util.processBackClick(scrID);
                            }
                        }
                    } else {
                        mService.containR.util.processBackClick(scrID);
                    }
                } else {
                    mService.containR.util.processBackClick(scrID);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        loadPatternLib: function (patternName, success, failure) {
            try {
                mService.util.loadScript("../lib/mservice/pattern/" + patternName + "/" + patternName + ".lib.js", function () {
                    if (patternName !== "query") {
                        mService.presentR.load.theme(patternName, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("load_theme_failure", "pre_signup_messages");
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        success();
                    }
                }, function () {
                    failure();
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        openChatScreen: function (msgBody) {
            try {
                if (mService.containR.variable[(msgBody.scrID).replace("_chat", "")] === undefined) {
                    mService.containR.variable[(msgBody.scrID).replace("_chat", "")] = {};
                };
                if (mService.containR.variable[msgBody.scrID] === undefined) {
                    mService.containR.variable[msgBody.scrID] = {};
                };
                $.extend(true, mService.containR.variable[msgBody.scrID], msgBody);
                mService.containR.variable[(msgBody.scrID).replace("_chat", "")].openChatScreen = true;
                mService.containR.init((msgBody.scrID).replace("_chat", ""));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        openWorkflowSubScreens: function (paramObj, feature, selectedRecord, selectedFeatureID, dSourceKey, scrID, screenIDToOpen, patternScrID, dSourceKey, controllerObj, call_wf_stage, call_status, call_status_desc) {
            try {
                mService.spinner.hide();
                mService.app.notificationData = "";
                mService.config.controller.get(patternScrID, function () {
                    try {
                        controllerObj = mService.config.controller.getControllerObj(patternScrID);
                        mService.containR.util.loadPatternLib(controllerObj.pattern_name, function () {
                            try {
                                mService.containR.config.util.loadConfigData(scrID.replace(/_list$/, "").replace(/_details$/, ""), function () {
                                    try {
                                        mService.spinner.hide();
                                        mService.pattern.workflow.loadScreen(patternScrID + "_" + screenIDToOpen, {
                                            dSourceKey: dSourceKey,
                                            selectedRecord: selectedRecord,
                                            listScreenId: scrID,
                                            featureID: selectedFeatureID,
                                            eventVerbID: (feature !== undefined) ? (feature.p_child_feature_display_label) : (""),
                                            last_accessed_feature: paramObj.feature_id,
                                            to_wf_stage: call_wf_stage,
                                            to_wf_status: call_status,
                                            to_wf_status_desc: call_status_desc
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function (err) {
                                    try {
                                        mService.app.showToast("load_config_files_error", scrID);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (err) {
                            try {
                                console.error("Unable to load pattern library")
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        console.error("unable to get controller file");
                        return true;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        moveCallToTop: function (scrID) {
            var selectedRecord,
            dSourceKey,
            listDSrc,
            callIndex,
            tempItem,
            controllerObj,
            listItems,
            listScrID;
            try {
                dSourceKey = mService.containR.variable[scrID].dSourceKey;
                if (dSourceKey !== undefined) {
                    selectedRecord = mService.dSource.cache[dSourceKey].getByUid(mService.containR.variable[scrID].selectedRecord.uid);
                    listDSrc = JSON.parse(JSON.stringify(mService.dSource.cache[dSourceKey].data()));
                    callIndex = mService.dSource.cache[dSourceKey].indexOf(selectedRecord);
                    if (callIndex !== undefined) {
                        if (callIndex !== 0) {
                            tempItem = listDSrc[callIndex];
                            listDSrc.splice(callIndex, 1);
                            listDSrc.unshift(tempItem);
                            mService.dSource.cache[dSourceKey].data(listDSrc);
                        };
                        if (mService.containR.variable[scrID].listScreenId !== undefined) {
                            controllerObj = mService.config.controller.getControllerObj(mService.containR.variable[scrID].listScreenId);
                            if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined) {
                                listScrID = (mService.containR.variable[scrID].listScreenId).replace("_list", "");
                            } else {
                                listScrID = mService.containR.variable[scrID].listScreenId;
                            };
                            if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined && controllerObj.presentR.list_type === "listview") {
                                listItems = $("#" + listScrID + "_list_main_page").children();
                                if (listItems.length > 0) {
                                    listItems[0].scrollIntoView(true);
                                }
                            } else {
                                if (mService.containR.variable[listScrID] !== undefined && mService.containR.variable[listScrID].activePage !== undefined) {
                                    mService.containR.variable[listScrID].activePage = 0;
                                };
                            }
                        };
                        if (mService.containR.variable[listScrID].datasource.filterObj === undefined || $.isEmptyObject(mService.containR.variable[listScrID].datasource.filterObj)) {
                            mService.dSource.util.localWrite(dSourceKey, mService.dSource.cache[dSourceKey].data(), function (data) {
                                try {
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            }, function () {
                                try {
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            });
                        } else {
                            mService.containR.pattern.listview.wFlow.getListDataSource(dSourceKey, function (datasource) {
                                try {
                                    for (listIndex = 0; listIndex < datasource.data().length; listIndex++) {
                                        if (((datasource.data()[listIndex].request_ref_no === undefined) ? (datasource.data()[listIndex].call_no) : (datasource.data()[listIndex].request_ref_no)) === ((selectedRecord.request_ref_no === undefined) ? (selectedRecord.call_no) : (selectedRecord.request_ref_no))) {
                                            $.extend(true, datasource.data()[listIndex], selectedRecord);
                                        }
                                    };
                                    callIndex = datasource.indexOf(selectedRecord);
                                    listDSrc = JSON.parse(JSON.stringify(datasource.data()));
                                    if (callIndex !== undefined && callIndex !== 0) {
                                        tempItem = listDSrc[callIndex];
                                        listDSrc.splice(callIndex, 1);
                                        listDSrc.unshift(tempItem);
                                        datasource.data(listDSrc);
                                    };
                                    mService.dSource.util.localWrite(dSourceKey, datasource.data(), function (data) {
                                        try {
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        updatePagerInd: function (currentPageNo, nextPageNo, scrID) {
            var pagerContainer,
            pagerItems;
            try {
                pagerContainer = $("#" + scrID).find(".km-pages");
                pagerItems = pagerContainer.children();
                if (pagerItems.length > 0) {
                    $("#" + scrID + "_pager_" + nextPageNo).addClass("ms_pager_active").removeClass("ms_pager_inactive").siblings().addClass("ms_pager_inactive").removeClass("ms_pager_active");
                    if (pagerItems[nextPageNo] !== undefined) {
                        pagerItems[nextPageNo].scrollIntoView(true);
                    };
                    if (currentPageNo !== "") {
                        $("#" + scrID + "_pager_list").animate({
                            scrollLeft: ((nextPageNo > 3) && (currentPageNo < nextPageNo)) ? "+=20px" : (pagerItems.length - 3 > nextPageNo) && (currentPageNo > nextPageNo) ? "-=20px" : "-=1px"
                        }, "slow");
                    } else {
                        if (nextPageNo !== 0) {
                            $("#" + scrID + "_pager_list").animate({
                                scrollLeft: ((nextPageNo > 3)) ? "+=20px" : (pagerItems.length - 3 > nextPageNo) && (currentPageNo > nextPageNo) ? "-=20px" : "-=1px"
                            }, "slow");
                        }
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        processBackClick: function (scrID) {
            try {
                mService.presentR.util.getLayoutSettings(function (layoutSettings) {
                    try {
                        if (layoutSettings["mobile.home.layout.template"] === "tile") {
                            if ($("#" + scrID).attr("data-layout") !== undefined) {
                                if ($("#" + scrID).attr("data-layout") === "home_layout") {
                                    mService.page.change("home_tile");
                                } else {
                                    mService.application.navigate("#:back");
                                }
                            } else {
                                if ($("#" + scrID).attr("data-ms-view-layout") !== undefined) {
                                    if ($("#" + scrID).attr("data-ms-view-layout") === "true") {
                                        mService.page.change("home_tile");
                                    } else {
                                        mService.application.navigate("#:back");
                                    }
                                } else {
                                    mService.application.navigate("#:back");
                                }
                            }
                        } else {
                            mService.application.navigate("#:back");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        mService.app.showToast("error_theme_settings_read", "pre_signup_messages");
                        return "";
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    variable: {
        viewAttributes: {
            'data-ms-view-subtype="form"': 'data-role="view" data-use-native-scrolling="true" data-reload="false" data-ms-view-type="containR" data-ms-view-subtype="form" data-before-show="mService.page.beforeShow" data-init="mService.page.init" data-show="mService.page.show" data-after-show="mService.page.afterShow" data-ms-containr-attrind="true"',
            'data-ms-view-subtype="listview"': 'data-role="view" data-use-native-scrolling="true"  data-before-show="mService.page.beforeShow" data-init="mService.page.init" data-show="mService.page.show" data-after-show="mService.page.afterShow" data-ms-view-type="containR" data-ms-view-subtype="listview" data-ms-containr-attrind="true"',
            'data-ms-view-layout="true"': 'data-layout="home_layout"',
            'data-ms-view-subtype="chat"': 'data-role="view" data-use-native-scrolling="true" data-reload="false" data-ms-view-type="containR" data-ms-view-subtype="form" data-before-show="mService.page.beforeShow" data-init="mService.page.init" data-show="mService.page.show" data-after-show="mService.page.afterShow" data-ms-containr-attrind="true"',
        },
        configFilesList: ["ui", "label", "rule", "template"],
        configFilesListCounter: 0,
        configFilesArray: [],
        draftPages: [],
        draftPagesCounter: 0,
        draftFields: [],
        draftFieldsCounter: 0
    },
    dSource: {},
    widget: {
        change: {
            main_page: function (event) {
                var scrID,
                controllerObj,
                pageNo;
                try {
                    if (event.page !== undefined && !Number.isNaN(event.page)) {
                        scrID = mService.app.getScreenId();
                        pageNo = event.page + 1;
                        if ($("#" + scrID + "_main_page").attr("data-ms-listviewind") === "true") {
                            controllerObj = mService.config.controller.getControllerObj(scrID);
                            if (controllerObj.containR_subtype === "master") {
                                mService.presentR.pattern.listview.init.master.createScrollViewListPage(scrID, controllerObj, event.page);
                            } else {
                                mService.presentR.pattern.listview.init.createScrollViewListPage(scrID, controllerObj, event.page);
                            }
                        } else {
                            scrollParentView = $("#" + scrID).data("kendoMobileView").scroller;
                            scrollParentView.scrollTo(0, 0);
                            scrollParentView.reset();
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        changing: {
            main_page: function (e) {
                var scrollParentView,
                scrID,
                saveStatus;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    if ($("#" + scrID + "_main_page").attr("data-ms-listviewind") !== "true") {
                        saveStatus = false;
                        if (e.currentPage < e.nextPage) {
                            if (!mService.containR.variable[scrID].validator[$("#" + scrID + "_main_page" + " [data-ms-containr-subpage-no='" + (e.currentPage + 1) + "']").attr("id")].validate()) {
                                e.preventDefault();
                                mService.app.showToast("form_fields_mandatory_alert", scrID);
                            } else {
                                saveStatus = true;
                            }
                        } else {
                            saveStatus = true;
                        };
                        scrollParentView = $("#" + scrID).data("kendoMobileView").scroller;
                        scrollParentView.scrollTo(0, 0);
                        scrollParentView.reset();
                        document.activeElement.blur();
                        if (saveStatus) {
                            mService.containR.util.updatePagerInd(e.currentPage, e.nextPage, scrID);
                        };
                        if (saveStatus && mService.containR.variable[scrID].valueChangeIndicator) {
                            mService.containR.pattern.form.draft.saveFile(e.currentPage + 1, scrID);
                            mService.containR.variable[scrID].draftSavedInd = true;
                        }
                    } else {
                        mService.containR.util.updatePagerInd(e.currentPage, e.nextPage, scrID);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    }
};