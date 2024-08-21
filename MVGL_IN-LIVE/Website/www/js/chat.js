var chat = {
    chat: {
        page: {
            beforeShow: function () {
                try {
                    chat.chat.customHandler.initializeChatWidget();
                    chat.chat.customHandler.registerChatTemplates();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            afterShow: function () {
                try {
                    window.plugins.OneSignal.clearOneSignalNotifications();
                    if (chat.chat.variable.notificationPayload !== undefined && chat.chat.variable.notificationPayload !== "") {
                        chat.chat.variable.subKey = chat.chat.variable.notificationPayload.additionalData.msgBody.subKey;
                    }
                    if (chat.chat.variable.subKey === "") {
                        chat.chat.customHandler.setupNewChat();
                    } else {
                        chat.chat.customHandler.setupOldChat();
                    };
                    if (chat.chat.variable.notificationPayload !== undefined && chat.chat.variable.notificationPayload !== "") {
                        chat.chat.variable.key = chat.chat.variable.notificationPayload.additionalData.msgBody.key;
                        chat.chat.variable.subKey = chat.chat.variable.notificationPayload.additionalData.msgBody.subKey;
                        chat.chat.variable.msgFrom = chat.chat.variable.notificationPayload.additionalData.msgBody.msgTo;
                        chat.chat.variable.msgTo = chat.chat.variable.notificationPayload.additionalData.msgBody.msgFrom;
                        chat.chat.variable.msgFromTitle = chat.chat.variable.notificationPayload.additionalData.msgBody.msgFromTitle;
                        chat.chat.variable.msgFromFirstName = mService.app.getFirstName();
                        chat.chat.variable.msgFromLastName = mService.app.getLastName();
                        chat.chat.variable.msgToTitle = chat.chat.variable.notificationPayload.additionalData.msgBody.msgToTitle;
                        chat.chat.variable.msgToFirstName = chat.chat.variable.notificationPayload.additionalData.msgBody.msgFromFirstName;
                        chat.chat.variable.msgToLastName = chat.chat.variable.notificationPayload.additionalData.msgBody.msgFromLastName;
                        chat.chat.variable.toolType = chat.chat.variable.notificationPayload.additionalData.msgBody.toolType;
                        chat.chat.variable.createdBy = chat.chat.variable.notificationPayload.additionalData.msgBody.createdBy;
                        chat.chat.variable.assignedTo = chat.chat.variable.notificationPayload.additionalData.msgBody.assignedTo;
                        chat.chat.variable.notificationPayload = "";
                    };
                    chat.chat.util.convertMessageBox();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        dSource: {
            attachments_listView: mService.dSource.getSource({
                code: "'document_collection'"
            }),
            chatMessages: new kendo.data.DataSource()
        },
        button: {
            misc: {
                searchClick: function () {
                    try {
                        if ($("#chat_attachments_file_tag_filter").data("kendoMultiSelect").value().length != 0) {
                            if (window.navigator.onLine) {
                                $("#chat_attachments_documents_list").data("kendoMobileListView").setDataSource(mService.dSource.getSource({
                                    code: "'document_collection'",
                                    inputXml: "'" + JSON.stringify({
                                        "logic_operator": $("[name='chat_attachments_file_logic_filter']:checked").val(),
                                        "tag_list": $("#chat_attachments_file_tag_filter").data("kendoMultiSelect").value().join()
                                    }) + "'"
                                }));
                                $("#chat_attachments_documents_list").data("kendoMobileListView").dataSource.read();
                                if ($("#chat_attachments_documents_list").data("kendoMobileListView").dataSource.data().length === 0) {
                                    mService.app.showToast("document_not_match", "chat");
                                }
                            } else {
                                mService.app.showToast("internet_connection_error", "system_messages");
                            }

                        } else {
                            $("#chat_attachments_documents_list").data("kendoMobileListView").dataSource.read();
                            $("#chat_attachments_documents_list").data("kendoMobileListView").dataSource.data([]);
                            mService.app.showToast("tag_to_search", "chat");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                sendMessageClick: function () {
                    var messageBox,
                        messageInput,
                        message;
                    try {
                        messageBox = $(".k-message-box .k-input");
                        messageInput = $("#" + messageBox.attr("id"));
                        message = ($(messageInput).val().trim() !== "") ? ($(messageInput).val().trim()) : ("");
                        $(messageInput).val("");
                        if (message !== "") {
                            chat.chat.variable.content = message;
                            chat.chat.variable.msgType = "text";
                            chat.chat.customHandler.renderTextMsg(chat.chat.customHandler.getMsgBody());
                            setTimeout(function () {
                                try {
                                    chat.chat.util.scrollToBottom();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 200);
                            chat.chat.customHandler.sendMessage(function () {
                                try {
                                    if (chat.chat.variable.subKey !== "") {
                                        chat.chat.customHandler.updateChatHistory();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                attachClick: function (ele, evt) {
                    var selectedRecord;
                    try {
                        $("#chat_attachmentsPopup").data('kendoWindow').close();
                        selectedRecord = $("#chat_attachments_documents_list").data("kendoMobileListView").dataSource.getByUid(ele.attr("data-id"));
                        chat.chat.variable.msgType = "attachment";
                        chat.chat.variable.attachName = selectedRecord.file_name;
                        chat.chat.variable.attachType = selectedRecord.file_type;
                        chat.chat.variable.attachSrc = selectedRecord.file_path;
                        chat.chat.customHandler.handleNotification(chat.chat.customHandler.getMsgBody());
                        chat.chat.customHandler.sendMessage(function () {
                            try {
                                chat.chat.customHandler.updateChatHistory();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                downloadClick: function (ele, evt) {
                    var obj;
                    try {
                        if (window.navigator.onLine) {
                            obj = JSON.parse(ele.attr("data-ms-listview-param"));
                            serverPath = obj.attachSrc;
                            localPath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + chat.chat.variable.key + "/" + chat.chat.variable.subKey + "/" + obj.attachName;
                            mService.home.attachmentProgressPopup.changeTitle("download");
                            mService.home.attachmentProgressPopup.open();
                            window.minterface("DownloadChatAttachFile", [{
                                url: serverPath,
                                filePath: mService.app.root + "/" + localPath,
                                thumbnailInd: false
                            }], function (result) {
                                var progressBar;
                                try {
                                    if (result === "success") {
                                        mService.home.attachmentProgressPopup.close();
                                        mService.app.showToast("download_success", "system_messages", {
                                            "path": localPath
                                        });
                                    } else {
                                        progressBar = $("#attachment_progressbar").data("kendoProgressBar");
                                        progressBar.value(result.progress);
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.home.attachmentProgressPopup.close();
                                    mService.app.showToast("download_error", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            mService.app.showToast("internet_connection_error", "system_messages");
                        }

                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                viewClick: function (ele, evt) {
                    var obj,
                        type,
                        src;
                    try {
                        obj = JSON.parse(ele.attr("data-ms-listview-param"));
                        type = obj["attachType"];
                        src = obj["attachSrc"];
                        if (type === "A" || type === "V" || type === "I" || type === "D" || type === "P") {
                            mService.page.change("view", {
                                docType: type,
                                docSrc: src
                            });
                        } else {
                            mService.spinner.show();
                            path = src;
                            path = path.replace(/\\/g, "/").replace(mService.app.clientURL + "/", "");
                            mService.nfs.validateFile({
                                filePath: path,
                                success: function (indication) {
                                    try {
                                        if (indication === "true") {
                                            mService.spinner.hide();
                                            chat.chat.util.openFile(mService.app.root + "/" + path);
                                        } else {
                                            serverPath = src;
                                            localPath = path;
                                            if (window.navigator.onLine) {
                                                mService.nfs.downloadFile(serverPath, localPath, false, function () {
                                                    try {
                                                        mService.spinner.hide();
                                                        chat.chat.util.openFile(mService.app.root + "/" + path);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.spinner.hide();
                                                        mService.app.showToast("download_error", "system_messages");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } else {
                                                mService.spinner.hide();
                                                mService.app.showToast("internet_connection_error", "system_messages");
                                            }
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                                failure: function () {
                                    try {
                                        mService.spinner.hide();
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            }
        },
        fcm: {
            handle: function (nData) {
                try {
                    mService.widgets.init.util.msChat.handle("chat_chat_popup_content", nData.data.msgBody);
                    /* chat.chat.customHandler.handleNotification(chat.chat.customHandler.setupTranslatedContent(nData.data.msgBody));
                    chat.chat.customHandler.setupExchangeInfo(nData.data.msgBody);
                    if (nData.data.msgBody.toolType === "close") {
                        chat.chat.variable.chatWidget.toolbar.destroy();
                        chat.chat.variable.chatWidget.messageBox.destroy();
                        $(".k-toolbar-box").css("display", "none");
                    } else {
                        if (nData.data.msgBody.actionList === "") {
                            $(".k-message-box").css("display", "flex");
                        }
                    } */
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        util: {
            convertMessageBox: function () {
                var messageBox,
                    messageInput,
                    messageTextarea;
                try {
                    setTimeout(function () {
                        try {
                            messageBox = $("#chat_chat_popup_content .k-message-box .k-input");
                            messageInput = $("#" + messageBox.attr("id"));
                            messageTextarea = $("<textarea></textarea>").attr({
                                id: $(messageInput).prop('id'),
                                class: $(messageInput).attr('class'),
                                placeHolder: $(messageInput).attr('placeholder')
                            });
                            $(messageInput).after($(messageTextarea)).remove();
                            $("#chat_chat_popup_content .k-button-send").attr("onclick", "chat.chat.button.misc.sendMessageClick()");
                            $("#chat_chat_popup_content .k-message-list-content .k-card-list").click(function () {
                                var index;
                                try {
                                    index = $(this).index();
                                    chat.chat.variable.messageIndex = index;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }

                            });
                            if (typeof (view) === "undefined" || view.variable.exit !== true) {
                                return true;
                            } else {
                                chat.chat.util.scrollToBottom(chat.chat.variable.messageIndex);
                                view.variable.exit = false;
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 200);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            openFile: function (path) {
                try {
                    mService.nfs.openFile(path, function () {
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
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            scrollToBottom: function (index) {
                var chatListContainer,
                    chatListItems;
                try {
                    chatListContainer = $(".k-message-list-content");
                    chatListItems = chatListContainer.children();
                    if (chatListItems.length > 0) {
                        if (index === undefined) {
                            chatListItems.last().get(0).scrollIntoView(true);
                        } else {
                            chatListItems[index].scrollIntoView(true);
                        }

                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        variable: {
            key: "chat",
            subKey: "",
            from: {
                id: "",
                title: "",
                firstName: "",
                lastName: "",
                channel: ""
            },
            to: "",
            scrID: "chat",
            msgType: "",
            content: "",
            actionPath: "",
            actionList: "",
            attachment: {
                name: "",
                type: "",
                src: "",
            },
            translatedContent: "",
            notificationPayload: "",
            info: ""
        }
    },
    page: {
        beforeShow: function () {
            try {
                if ($("#chat_container").length === 0) {
                    $.ajax({
                        url: "www/content/chat.html",
                        dataType: "text",
                        async: false,
                        success: function (data) {
                            try {
                                $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='CPORTCALLDB'] section div div").html(data);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        error: function (e) {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                };
                chat.variable.dSource = mService.dSource.getSource({
                    code: "'my_calls'",
                    inputXml: "'" + JSON.stringify({
                        "list_type": "CALLDB",
                        "visitor_id": mService.visitor.profile.login.visitor_id
                    }) + "'"
                });
                chat.variable.dSource.read().then(function () {
                    var htmlContent;
                    try {
                        htmlContent = "";
                        for (let index = 0; index < chat.variable.dSource.data().length; index++) {
                            htmlContent += kendo.template($("#chat_list_template").html().replace(/\n/g, "").replace(/\t/g, ""))((chat.variable.dSource.data()[index] !== undefined) ? (chat.variable.dSource.data()[index]) : ({}));
                        }

                        /* for(let index = 0; index < 8; index++) {
                            htmlContent += kendo.template($("#chat_list_template").html().replace(/\n/g, "").replace(/\t/g, ""))((chat.variable.dSource.data()[0] !== undefined) ? (chat.variable.dSource.data()[0]) : ({}));
                        } */
                        $("#chat_container_list").html(htmlContent);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        init: function () {
            try {
                console.log("chat init");
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        show: function () {
            try {
                console.log("chat show");
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        afterShow: function () {
            try {
                console.log("chat afterShow");
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    button: {
        misc: {
            machine_history_attachment_click: function (ele) {
                var dataParam = JSON.parse($(ele).attr("data-ms-listview-param"));
                $("#chat_history_attachment_viewer_no_data_" + dataParam.uid).hide();
                $("#chat_history_attachment_viewer_" + dataParam.uid).html("");
                if (dataParam.dataDocType === "I") {
                    $("#chat_history_attachment_viewer_" + dataParam.uid).msImageviewer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "A") {
                    $("#chat_history_attachment_viewer_" + dataParam.uid).msAudioplayer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "V") {
                    $("#chat_history_attachment_viewer_" + dataParam.uid).msVideoplayer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "P") {
                    $("#chat_history_attachment_viewer_" + dataParam.uid).msPdfviewer({
                        source: dataParam.dataDocSrc
                    });
                }
            },
            machine_history_click: function (ele) {
                var selectedRecord;
                selectedRecord = chat.variable.dSource.getByUid($(ele).attr("data-ms-containr-param"));
                if ($("#chat_history_popup").data("kendoWindow") === undefined) {
                    $("#chat_history_popup").kendoWindow({
                        width: ($(window).width() * 90) / (100),
                        height: ($(window).height() * 90) / (100),
                        title: {
                            text: "Machine History",
                            encoded: false
                        },
                        draggable: false,
                        modal: true,
                        resizable: false,
                        visible: false
                    });
                } else {
                    $("#chat_history_popup").html("");
                }
                $("#chat_history_popup").data("kendoWindow").title("Machine Life - " + selectedRecord.asset_id + " - " + "[" + selectedRecord.equipment_category + " / " + selectedRecord.equipment_type + " / " + selectedRecord.equipment_id + "]");
                $("#chat_history_popup").data("kendoWindow").open().center();
                $("#chat_history_popup").html(kendo.template($("#chat_history_popup_template").html().replace(/\n/g, "").replace(/\t/g, ""))({}));
                mService.dSource.retrieveCustomInfoDetail({
                    code: "'machine_life'",
                    refNo1: "'" + selectedRecord.asset_id + "'"
                }, function (data) {
                    try {
                        $("#chat_history_popup_header").html(kendo.template($("#chat_history_popup_header_content_template").html().replace(/\n/g, "").replace(/\t/g, ""))(data.header));

                        $("#chat_history_popup_header_timeline").msTimeline({
                            scrid: "chat",
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "chat_history_popup_header_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal",
                            dateformat: "dd MMM yyyy"
                        });
                        $("#chat_history_popup_header_timeline").setDataSource(data.detail);
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
            },
            feedback_click: function (ele) {
                alert("This feature is not yet implemented");
            },
            log_book_click: function (ele) {
                alert("This feature is not yet implemented");
            },
            new_chat: function (ele) {
                chat.button.misc.chat_click(ele);
            },
            chat_click: function (ele, nData) {
                var subKey = "",
                    paramObj;
                if (nData !== undefined) {
                    mService.widgets.variable.msChat.variable["chat_chat_popup_content"] = nData.data.msgBody;
                    subKey = nData.data.msgBody.subKey;
                };
                if (ele !== "") {
                    if ($(ele).attr("data-ms-containr-param") !== undefined) {
                        paramObj = JSON.parse($(ele).attr("data-ms-containr-param"));
                        subKey = paramObj.subkey;
                    }
                }
                if ($("#chat_chat_popup").data("kendoWindow") === undefined) {
                    $("#chat_chat_popup").kendoWindow({
                        width: ($(window).width() * 40) / (100),
                        height: ($(window).height() * 90) / (100),
                        title: {
                            text: "Log a Complaint",
                            encoded: false
                        },
                        draggable: false,
                        modal: true,
                        resizable: false,
                        visible: false
                    });
                } else {
                    $("#chat_chat_popup").data("kendoWindow").setOptions({
                        title: {
                            text: "Log a Complaint",
                            encoded: false
                        }
                    });
                    $("#chat_chat_popup").html("");
                }
                if (ele !== "") {
                    if ($(ele).attr("data-ms-containr-param") !== undefined) {
                        $("#chat_chat_popup").data("kendoWindow").setOptions({
                            title: {
                                text: paramObj.call_no,
                                encoded: false
                            }
                        });
                    }
                };
                $("#chat_chat_popup").html(kendo.template($("#chat_chat_popup_content_template").html().replace(/\n/g, "").replace(/\t/g, ""))({}));
                $("#chat_chat_popup").data("kendoWindow").open().center();

                $("#chat_chat_popup_content").msChat({
                    scrid: "chat",
                    key: "chat",
                    subKey: subKey
                });
            },
            visit_schedule_click: function (ele) {
                alert("This feature is not yet implemented");
            },
        },
        crud: {
            edit_click: function () {
                var catalogID,
                    problemDescVal,
                    additionalDescVal;
                try {
                    catalogID = mService.page.navigation.get.pageCatalogID();
                    problemDescVal = {};
                    additionalDescVal = {};
                    problemDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = chat.variable.selectedRecord["problem_description_" + mService.user.profile.login.locale_id];
                    problemDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = chat.variable.selectedRecord["problem_description_" + mService.user.profile.login.default_locale_id];
                    additionalDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = chat.variable.selectedRecord["addn_desc_" + mService.user.profile.login.locale_id];
                    additionalDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = chat.variable.selectedRecord["addn_desc_" + mService.user.profile.login.default_locale_id];
                    mService.config.ui.render("chat_" + catalogID + "_actions_detail_view", "crud_edit");
                    $("#chat_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                        buttonRegion: "edit"
                    }));
                    $("#chat_" + catalogID + "_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    $("#chat_edit_customer_contact_name").setVal(chat.variable.selectedRecord.cust_contact_name);
                    $("#chat_edit_customer_contact_number").setVal(chat.variable.selectedRecord.cust_contact_no);
                    $("#chat_edit_customer_contact_email").setVal(chat.variable.selectedRecord.cust_contact_email_id);
                    $("#chat_edit_customer_name").setVal(chat.variable.selectedRecord.customer_name);
                    $("#chat_edit_customer_id").setVal(chat.variable.selectedRecord.customer_id);
                    $("#chat_edit_equipment_id").setVal(chat.variable.selectedRecord.equipment_id);
                    $("#chat_edit_asset_id").setVal(chat.variable.selectedRecord.asset_id);
                    $("#chat_edit_udf_char_1").setVal(chat.variable.selectedRecord.udf_char_1);
                    $("#chat_edit_udf_char_2").setVal(chat.variable.selectedRecord.udf_char_2);
                    $("#chat_edit_asset_location").setVal(chat.variable.selectedRecord.asset_loc_reported);
                    $("#chat_edit_call_type").setVal(chat.variable.selectedRecord.call_type);
                    $("#chat_edit_call_priority").setVal(chat.variable.selectedRecord.priority_cd);
                    $("#chat_edit_problem_description").setVal(problemDescVal);
                    $("#chat_edit_additional_information").setVal(additionalDescVal);
                    chat.variable.validator = mService.config.rule.apply("chat_" + catalogID + "_actions_detail_view");
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            retrieve_click: function () {
                try {
                    chat.variable.selectedRecord = null;
                    chat.customHandler.refreshListView();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        wflow_click: function (ele, evt) {
            var catalogID;
            try {
                catalogID = mService.page.navigation.get.pageCatalogID();
                chat.variable.selectedEventverb = ele.attr("data-ms-wflow-eventverb");
                chat.variable.selectedToStage = ele.attr("data-ms-wflow-tostage");
                chat.variable.selectedToStatus = ele.attr("data-ms-wflow-tostatus");
                mService.config.ui.render("chat_" + catalogID + "_actions_detail_view", "workflow_" + chat.variable.selectedEventverb);
                $("#chat_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                    buttonRegion: "wflow"
                }));
                $("#chat_" + catalogID + "_actions_detail_view_action_bar").html("");
                mService.util.pageSubCatalogDetailViewActionBar.hide();
                mService.config.label.resolve();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        form: {
            submit_click: function (ele, evt) {
                try {
                    if (ele.attr("data-ms-button-region") === "add") {
                        chat.customHandler.addSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "edit") {
                        chat.customHandler.editSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "wflow") {
                        chat.customHandler.wflowSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "attachment") {
                        mService.home.userAttachment.submitAttachment("CALL", chat.variable.selectedRecord.call_no);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            cancel_click: function (ele, evt) {
                try {
                    if (ele.attr("data-ms-button-region") === "add") {
                        mService.layout.pageCatalog.select("add");
                    } else if (ele.attr("data-ms-button-region") === "attachment") {
                        $("#home_user_attachment_add_popup").data("kendoWindow").close();
                    } else {
                        chat.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    catalog: {
        add: {
            select: function () {
                try {
                    mService.config.ui.render("chat_add_actions_detail_view", "crud_add");
                    $("#chat_add_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                        buttonRegion: "add"
                    }));
                    $("#chat_add_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    chat.variable.validator = mService.config.rule.apply("chat_add_actions_detail_view");
                    if (mService.home.customerContactInfo.customerName !== "") {
                        $("#chat_add_customer_name").setVal(mService.home.customerContactInfo.customerName);
                    };
                    if (mService.home.customerContactInfo.contactName !== "") {
                        $("#chat_add_customer_contact_name").setVal(mService.home.customerContactInfo.contactName);
                    };
                    if (mService.home.customerContactInfo.contactNumber !== "") {
                        $("#chat_add_customer_contact_number").setVal(mService.home.customerContactInfo.contactNumber);
                    };
                    if (mService.home.customerContactInfo.contactEmail !== "") {
                        $("#chat_add_customer_contact_email").setVal(mService.home.customerContactInfo.contactEmail);
                    };
                    if (mService.home.customerContactInfo.customerID !== "") {
                        $("#chat_add_customer_id").setVal(mService.home.customerContactInfo.customerID);
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        open: {
            select: function () {
                try {
                    $("#chat_open_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#chat_open_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        chat.variable.selectedRecord = $("#chat_open_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!chat.msPageCatalogRefresh) {
                                            chat.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + chat.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    chat.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (chat.variable.selectedRecord !== null) {
                        $("#chat_open_actions_detail_view").html(mService.config.template.getTransformedHtml("chat_open_detail_view_template", chat.variable.selectedRecord));
                        chat.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = "";
                                if (chat.variable.selectedRecord.call_status === "OD" || chat.variable.selectedRecord.call_status === "O") {
                                    html = mService.config.template.getTransformedHtml("home_crud_action_bar_template", {
                                        scrID: "chat",
                                        crudName: "edit",
                                        buttonRegion: ""
                                    });
                                };
                                html += chat.customHandler.getActionBarHtml(data);
                                $("#chat_open_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#chat_open_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#chat_open_actions_detail_view_action_bar").html("");
                        mService.util.pageSubCatalogDetailViewActionBar.hide();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            timeline: function () {
                var dSource;
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (chat.variable.selectedRecord !== null) {
                        $("#chat_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("chat_open_timeline_detail_view_template", chat.variable.selectedRecord));
                        $("#chat_open_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "chat_open_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": chat.variable.selectedRecord.call_no,
                                "call_category": chat.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#chat_open_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#chat_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            attachment: function () {
                var dSource,
                    index,
                    html;
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (chat.variable.selectedRecord !== null) {
                        $("#chat_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("chat_open_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": chat.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: chat.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#chat_open_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#chat_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        closed: {
            select: function () {
                try {
                    $("#chat_closed_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#chat_closed_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        chat.variable.selectedRecord = $("#chat_closed_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!chat.msPageCatalogRefresh) {
                                            chat.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + chat.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    chat.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (chat.variable.selectedRecord !== null) {
                        $("#chat_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("chat_closed_detail_view_template", chat.variable.selectedRecord));
                        chat.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = chat.customHandler.getActionBarHtml(data);
                                $("#chat_closed_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#chat_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#chat_closed_actions_detail_view_action_bar").html("");
                        mService.util.pageSubCatalogDetailViewActionBar.hide();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            timeline: function () {
                var dSource;
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (chat.variable.selectedRecord !== null) {
                        $("#chat_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("chat_closed_timeline_detail_view_template", chat.variable.selectedRecord));
                        $("#chat_closed_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "chat_closed_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": chat.variable.selectedRecord.call_no,
                                "call_category": chat.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#chat_closed_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#chat_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            attachment: function () {
                var dSource,
                    index,
                    html;
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (chat.variable.selectedRecord !== null) {
                        $("#chat_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("chat_closed_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": chat.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: chat.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#chat_closed_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#chat_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    customHandler: {
        addSubmitClick: function () {
            try {
                if (chat.variable.validator.validate()) {
                    var problemDescXml,
                        additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#chat_add_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#chat_add_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#chat_add_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#chat_add_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
                    $.ajax({
                        async: false,
                        url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=mservice&serviceName=save_manage_call_register&path=context/outputparam",
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            context: {
                                "sessionId": mService.app.getSessionId(),
                                "userId": mService.app.getUserId(),
                                "client_id": mService.app.getClientId(),
                                "locale_id": mService.app.getLocaleId(),
                                "country_code": mService.app.getCountryCode(),
                                "inputparam": {
                                    p_customer_id: $("#chat_add_customer_id").getVal(),
                                    p_asset_id: $("#chat_add_asset_id").getVal(),
                                    p_asset_location_reported: $("#chat_add_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#chat_add_call_priority").getVal(),
                                    p_customer_contact_name: $("#chat_add_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: (chat.variable.customerInfoCustomerLocationCode !== undefined) ? (chat.variable.customerInfoCustomerLocationCode) : ("ZZZ"),
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: mService.user.profile.login.org_lvl_no,
                                    p_organogram_level_code: mService.user.profile.login.org_lvl_code,
                                    p_call_category: chat.variable.callCategory,
                                    p_call_type: $("#chat_add_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#chat_add_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#chat_add_customer_contact_email").getVal(),
                                    p_equipment_id: $("#chat_add_equipment_id").getVal(),
                                    p_billable_nonbillable_ind: "NB",
                                    p_charges_gross_amount: "0",
                                    p_charges_discount_amount: "0",
                                    p_charges_tax_amount: "0",
                                    p_charges_net_amount: "0",
                                    p_charges_currency_code: mService.user.profile.login.currency_code,
                                    p_contract_doc_no: "",
                                    p_contract_visit_no: "0",
                                    p_call_mapped_to_func_role: "",
                                    p_call_mapped_to_employee_id: "",
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#chat_add_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#chat_add_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#chat_add_udf_char_2").getVal() + "</udf_char_2></inputparam>",
                                    p_rec_timestamp: "00000000-0000-0000-0000-000000000000",
                                    p_save_mode: "A"
                                },
                                "outputparam": {
                                    "p_service_call_ref_no": ""
                                }
                            }
                        }),
                        success: function (response) {
                            try {
                                mService.app.alert("success", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_request_log",
                                    lblgrpid: "success",
                                    key: response[0].p_service_call_ref_no
                                });
                                chat.customHandler.resetAddCatalogFields();
                                chat.msPageValueChanged = false;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        error: function (e) {
                            try {
                                mService.app.alert("error", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_request_log",
                                    lblgrpid: "error"
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        editSubmitClick: function () {
            try {
                if (chat.variable.validator.validate()) {
                    var problemDescXml,
                        additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#chat_edit_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#chat_edit_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#chat_edit_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#chat_edit_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
                    $.ajax({
                        async: false,
                        url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=mservice&serviceName=save_manage_call_register&path=context/outputparam",
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            context: {
                                "sessionId": mService.app.getSessionId(),
                                "userId": mService.app.getUserId(),
                                "client_id": mService.app.getClientId(),
                                "locale_id": mService.app.getLocaleId(),
                                "country_code": mService.app.getCountryCode(),
                                "inputparam": {
                                    p_customer_id: $("#chat_edit_customer_id").getVal(),
                                    p_asset_id: $("#chat_edit_asset_id").getVal(),
                                    p_asset_location_reported: $("#chat_edit_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#chat_edit_call_priority").getVal(),
                                    p_customer_contact_name: $("#chat_edit_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: chat.variable.selectedRecord.cust_location_code,
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: chat.variable.selectedRecord.org_level_no,
                                    p_organogram_level_code: chat.variable.selectedRecord.org_level_code,
                                    p_call_category: chat.variable.selectedRecord.call_category,
                                    p_call_type: $("#chat_edit_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#chat_edit_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#chat_edit_customer_contact_email").getVal(),
                                    p_equipment_id: $("#chat_edit_equipment_id").getVal(),
                                    p_billable_nonbillable_ind: "NB",
                                    p_charges_gross_amount: "0",
                                    p_charges_discount_amount: "0",
                                    p_charges_tax_amount: "0",
                                    p_charges_net_amount: "0",
                                    p_charges_currency_code: mService.user.profile.login.currency_code,
                                    p_contract_doc_no: "",
                                    p_contract_visit_no: "0",
                                    p_call_mapped_to_func_role: "",
                                    p_call_mapped_to_employee_id: "",
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#chat_edit_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#chat_edit_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#chat_edit_udf_char_2").getVal() + "</udf_char_2></inputparam>",
                                    p_rec_timestamp: "00000000-0000-0000-0000-000000000000",
                                    p_save_mode: "U"
                                },
                                "outputparam": {
                                    "p_service_call_ref_no": chat.variable.selectedRecord.call_no
                                }
                            }
                        }),
                        success: function (response) {
                            try {
                                mService.app.alert("success", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_details",
                                    lblgrpid: "success"
                                });
                                chat.msPageValueChanged = false;
                                chat.customHandler.refreshListView();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        error: function (e) {
                            try {
                                mService.app.alert("error", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_details",
                                    lblgrpid: "error"
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        wflowSubmitClick: function () {
            try {
                $.ajax({
                    async: false,
                    url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=mservice&serviceName=update_call_wfeventverb_status_change&path=context/outputparam",
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        context: {
                            "sessionId": mService.app.getSessionId(),
                            "userId": mService.app.getUserId(),
                            "client_id": mService.app.getClientId(),
                            "locale_id": mService.app.getLocaleId(),
                            "country_code": mService.app.getCountryCode(),
                            "inputparam": {
                                p_call_ref_no: chat.variable.selectedRecord.call_no,
                                p_wfeventverb_id: chat.variable.selectedEventverb,
                                p_event_date: kendo.toString((new Date()), "yyyy-MM-dd"),
                                p_event_hour: kendo.toString((new Date()), "HH"),
                                p_event_minute: kendo.toString((new Date()), "mm"),
                                p_from_wf_stage_no: chat.variable.selectedRecord.call_wf_stage,
                                p_to_wf_stage_no: chat.variable.selectedToStage,
                                p_from_wf_status: chat.variable.selectedRecord.call_status,
                                p_to_wf_status: chat.variable.selectedToStatus,
                                p_channel_id: "WEB",
                                p_by_employee_id: mService.user.profile.login.employee_id,
                                p_to_employee_id_string: "",
                                p_reason_code: "",
                                p_comments: $("#chat_workflow_comments").getVal(),
                                p_lattitude_value: "",
                                p_longitude_value: "",
                                p_attachment_xml: "",
                                p_inputparam_xml1: "",
                                p_inputparam_xml2: "",
                                p_inputparam_xml3: "",
                                p_rec_tstamp: chat.variable.selectedRecord.rec_tstamp,
                                p_save_mode: "A"
                            }
                        }
                    }),
                    success: function (response) {
                        try {
                            if (response.document === undefined) {
                                mService.app.alert("success", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + chat.variable.selectedEventverb,
                                    lblgrpid: "success"
                                });
                                chat.msPageValueChanged = false;
                                chat.customHandler.refreshListView();
                            } else {
                                mService.app.alert("error", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + chat.variable.selectedEventverb,
                                    lblgrpid: "error"
                                });
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (e) {
                        try {
                            mService.app.alert("error", {
                                scrid: mService.page.navigation.get.subMenuID(),
                                lblid: "call_" + chat.variable.selectedEventverb,
                                lblgrpid: "error"
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getActionBarHtml: function (eventVerbs) {
            var html,
                index;
            try {
                html = "";
                for (index = 0; index < eventVerbs.length; index++) {
                    eventVerbs[index].scrID = "chat";
                    eventVerbs[index].buttonRegion = "";
                    html += mService.config.template.getTransformedHtml("home_workflow_action_bar_template", eventVerbs[index]);
                };
                return html;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getWorkflowEvents: function (success) {
            try {
                mService.wflow.getWflowEvents({
                    code: "'call_workflow_event_verb'",
                    inputXml: "'" + JSON.stringify({
                        "call_category": chat.variable.callCategory,
                    }) + "'",
                    record: chat.variable.selectedRecord
                }, function (data) {
                    try {
                        success(data);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        resetAddCatalogFields: function () {
            try {
                $("#chat_add_call_type").setVal("");
                $("#chat_add_customer_id").setVal("");
                $("#chat_add_equipment_id").setVal("");
                $("#chat_add_asset_id").setVal("");
                $("#chat_add_udf_char_1").setVal("");
                $("#chat_add_udf_char_2").setVal("");
                $("#chat_add_asset_location").setVal("");
                $("#chat_add_problem_description").setVal("");
                $("#chat_add_additional_information").setVal("");
                $("#chat_add_customer_contact_name").setVal("");
                $("#chat_add_customer_contact_number").setVal("");
                $("#chat_add_customer_contact_email").setVal("");
                $("#chat_add_customer_name").setVal("");
                $("#chat_add_call_priority").setVal("");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        refreshListView: function () {
            var catalogID,
                listView,
                dSource;
            try {
                catalogID = mService.page.navigation.get.pageCatalogID();
                listView = $("#chat_" + catalogID + "_list_view").data("kendoListView");
                dSource = mService.dSource.getSource({
                    code: "'call_register'",
                    inputXml: "'" + JSON.stringify({
                        "call_category": chat.variable.callCategory,
                        "list_type": catalogID.toUpperCase(),
                        "search_string": $("#chat_" + catalogID + "_list_search_box").val()
                    }) + "'"
                });
                dSource.read().then(function () {
                    var selectedItem;
                    try {
                        listView.dataSource.data(dSource.data());
                        if (chat.variable.selectedRecord !== null) {
                            selectedItem = $.grep(listView.dataSource.data(), function (e, i) {
                                try {
                                    return e.call_no === chat.variable.selectedRecord.call_no;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            })[0];
                            if (selectedItem !== undefined) {
                                listView.select(listView.items().filter("[data-uid='" + selectedItem.uid + "']"));
                            } else {
                                listView.select(listView.items().first());
                            }
                        } else {
                            listView.select(listView.items().first());
                        };
                        if (dSource.data().length === 0) {
                            mService.app.alert("info", {
                                scrid: mService.page.navigation.get.subMenuID(),
                                lblid: "no_data_found",
                                lblgrpid: "info"
                            });
                            chat.variable.selectedRecord = null;
                            chat.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
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
    widget: {
        change: {
            add_customer_id: function () {
                try {
                    $("#chat_add_equipment_id").setVal("");
                    $("#chat_add_asset_id").setVal("");
                    $("#chat_add_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'equipment_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#chat_add_customer_id").getVal()
                        }) + "'"
                    }));
                    $("#chat_add_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'asset_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#chat_add_customer_id").getVal()
                        }) + "'"
                    }));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            edit_customer_id: function () {
                try {
                    $("#chat_edit_equipment_id").setVal("");
                    $("#chat_edit_asset_id").setVal("");
                    $("#chat_edit_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'equipment_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#chat_edit_customer_id").getVal()
                        }) + "'"
                    }));
                    $("#chat_edit_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'asset_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#chat_edit_customer_id").getVal()
                        }) + "'"
                    }));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    variable: {
        callCategory: "SE",
        dSource: ""
    }
};