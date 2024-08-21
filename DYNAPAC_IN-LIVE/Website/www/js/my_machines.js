var my_machines = {
    chat: {
        page: {
            beforeShow: function () {
                try {
                    my_machines.chat.customHandler.initializeChatWidget();
                    my_machines.chat.customHandler.registerChatTemplates();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            afterShow: function () {
                try {
                    window.plugins.OneSignal.clearOneSignalNotifications();
                    if (my_machines.chat.variable.notificationPayload !== undefined && my_machines.chat.variable.notificationPayload !== "") {
                        my_machines.chat.variable.subKey = my_machines.chat.variable.notificationPayload.additionalData.msgBody.subKey;
                    }
                    if (my_machines.chat.variable.subKey === "") {
                        my_machines.chat.customHandler.setupNewChat();
                    } else {
                        my_machines.chat.customHandler.setupOldChat();
                    };
                    if (my_machines.chat.variable.notificationPayload !== undefined && my_machines.chat.variable.notificationPayload !== "") {
                        my_machines.chat.variable.key = my_machines.chat.variable.notificationPayload.additionalData.msgBody.key;
                        my_machines.chat.variable.subKey = my_machines.chat.variable.notificationPayload.additionalData.msgBody.subKey;
                        my_machines.chat.variable.msgFrom = my_machines.chat.variable.notificationPayload.additionalData.msgBody.msgTo;
                        my_machines.chat.variable.msgTo = my_machines.chat.variable.notificationPayload.additionalData.msgBody.msgFrom;
                        my_machines.chat.variable.msgFromTitle = my_machines.chat.variable.notificationPayload.additionalData.msgBody.msgFromTitle;
                        my_machines.chat.variable.msgFromFirstName = mService.app.getFirstName();
                        my_machines.chat.variable.msgFromLastName = mService.app.getLastName();
                        my_machines.chat.variable.msgToTitle = my_machines.chat.variable.notificationPayload.additionalData.msgBody.msgToTitle;
                        my_machines.chat.variable.msgToFirstName = my_machines.chat.variable.notificationPayload.additionalData.msgBody.msgFromFirstName;
                        my_machines.chat.variable.msgToLastName = my_machines.chat.variable.notificationPayload.additionalData.msgBody.msgFromLastName;
                        my_machines.chat.variable.toolType = my_machines.chat.variable.notificationPayload.additionalData.msgBody.toolType;
                        my_machines.chat.variable.createdBy = my_machines.chat.variable.notificationPayload.additionalData.msgBody.createdBy;
                        my_machines.chat.variable.assignedTo = my_machines.chat.variable.notificationPayload.additionalData.msgBody.assignedTo;
                        my_machines.chat.variable.notificationPayload = "";
                    };
                    my_machines.chat.util.convertMessageBox();
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
                            my_machines.chat.variable.content = message;
                            my_machines.chat.variable.msgType = "text";
                            my_machines.chat.customHandler.renderTextMsg(my_machines.chat.customHandler.getMsgBody());
                            setTimeout(function () {
                                try {
                                    my_machines.chat.util.scrollToBottom();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 200);
                            my_machines.chat.customHandler.sendMessage(function () {
                                try {
                                    if (my_machines.chat.variable.subKey !== "") {
                                        my_machines.chat.customHandler.updateChatHistory();
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
                        my_machines.chat.variable.msgType = "attachment";
                        my_machines.chat.variable.attachName = selectedRecord.file_name;
                        my_machines.chat.variable.attachType = selectedRecord.file_type;
                        my_machines.chat.variable.attachSrc = selectedRecord.file_path;
                        my_machines.chat.customHandler.handleNotification(my_machines.chat.customHandler.getMsgBody());
                        my_machines.chat.customHandler.sendMessage(function () {
                            try {
                                my_machines.chat.customHandler.updateChatHistory();
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
                            localPath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + my_machines.chat.variable.key + "/" + my_machines.chat.variable.subKey + "/" + obj.attachName;
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
                                            my_machines.chat.util.openFile(mService.app.root + "/" + path);
                                        } else {
                                            serverPath = src;
                                            localPath = path;
                                            if (window.navigator.onLine) {
                                                mService.nfs.downloadFile(serverPath, localPath, false, function () {
                                                    try {
                                                        mService.spinner.hide();
                                                        my_machines.chat.util.openFile(mService.app.root + "/" + path);
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
                    mService.widgets.init.util.msChat.handle("my_machines_chat_popup_content", nData.data.msgBody);
                    /* my_machines.chat.customHandler.handleNotification(my_machines.chat.customHandler.setupTranslatedContent(nData.data.msgBody));
                    my_machines.chat.customHandler.setupExchangeInfo(nData.data.msgBody);
                    if (nData.data.msgBody.toolType === "close") {
                    	my_machines.chat.variable.chatWidget.toolbar.destroy();
                    	my_machines.chat.variable.chatWidget.messageBox.destroy();
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
                            messageBox = $("#my_machines_chat_popup_content .k-message-box .k-input");
                            messageInput = $("#" + messageBox.attr("id"));
                            messageTextarea = $("<textarea></textarea>").attr({
                                id: $(messageInput).prop('id'),
                                class: $(messageInput).attr('class'),
                                placeHolder: $(messageInput).attr('placeholder')
                            });
                            $(messageInput).after($(messageTextarea)).remove();
                            $("#my_machines_chat_popup_content .k-button-send").attr("onclick", "my_machines.chat.button.misc.sendMessageClick()");
                            $("#my_machines_chat_popup_content .k-message-list-content .k-card-list").click(function () {
                                var index;
                                try {
                                    index = $(this).index();
                                    my_machines.chat.variable.messageIndex = index;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }

                            });
                            if (typeof (view) === "undefined" || view.variable.exit !== true) {
                                return true;
                            } else {
                                my_machines.chat.util.scrollToBottom(my_machines.chat.variable.messageIndex);
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
            key: "calldb",
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
                if ($("#my_machines_container").length === 0) {
                    $.ajax({
                        url: "www/content/my_machines.html",
                        dataType: "text",
                        async: false,
                        success: function (data) {
                            try {
                                $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='CPORTMYMACHINES'] section div div").html(data);
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
                my_machines.variable.dSource = mService.dSource.getSource({
                    code: "'my_machines'"
                });
                my_machines.variable.dSource.read().then(function () {
                    var htmlContent;
                    try {
                        htmlContent = "";
                        for (let index = 0; index < my_machines.variable.dSource.data().length; index++) {
                            htmlContent += kendo.template($("#my_machines_list_template").html().replace(/\n/g, "").replace(/\t/g, ""))((my_machines.variable.dSource.data()[index] !== undefined) ? (my_machines.variable.dSource.data()[index]) : ({}));
                        }

                        /* for(let index = 0; index < 8; index++) {
                        	htmlContent += kendo.template($("#my_machines_list_template").html().replace(/\n/g, "").replace(/\t/g, ""))((my_machines.variable.dSource.data()[0] !== undefined) ? (my_machines.variable.dSource.data()[0]) : ({}));
                        } */
                        $("#my_machines_container_list").html(htmlContent);
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
        },
        afterShow: function () {
            try {
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
                $("#my_machines_history_attachment_viewer_no_data_" + dataParam.uid).hide();
                $("#my_machines_history_attachment_viewer_" + dataParam.uid).html("");
                if (dataParam.dataDocType === "I") {
                    $("#my_machines_history_attachment_viewer_" + dataParam.uid).msImageviewer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "A") {
                    $("#my_machines_history_attachment_viewer_" + dataParam.uid).msAudioplayer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "V") {
                    $("#my_machines_history_attachment_viewer_" + dataParam.uid).msVideoplayer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "P") {
                    $("#my_machines_history_attachment_viewer_" + dataParam.uid).msPdfviewer({
                        source: dataParam.dataDocSrc
                    });
                }
            },
            machine_history_click: function (ele) {
				var selectedRecord;
                selectedRecord = my_machines.variable.dSource.getByUid($(ele).attr("data-ms-containr-param"));
				if ($("#my_machines_history_popup").data("kendoWindow") === undefined) {
                    $("#my_machines_history_popup").kendoWindow({
                        width : (screen.width * 0.80),
						height : (screen.height * 0.75),
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
                    $("#my_machines_history_popup").html("");
                }
                $("#my_machines_history_popup").data("kendoWindow").title("Machine Life - " + selectedRecord.asset_id + " - " + "[" + selectedRecord.equipment_category + " / " + selectedRecord.equipment_type + " / " + selectedRecord.equipment_id + "]");
                $("#my_machines_history_popup").data("kendoWindow").open().center();
                $("#my_machines_history_popup").html(kendo.template($("#my_machines_history_popup_template").html().replace(/\n/g, "").replace(/\t/g, ""))({}));
				$("#my_machines_history_popup_chkbox_filter").msCheckboxgroup({
				    scrid: "my_machines",
				    datasrc: [{"text":"Service","value":"SE"},{"text":"Quote","value":"PE"},{"text":"Invoice","value":"SI"}],
				    lblgrpid: "",
				    lblid: "",
				    stack: true,
				    column: "12",
				    textfield: "text",
				    valuefield: "value"
				});
				$("#my_machines_history_popup_chkbox_filter_group").css("display","contents").css("font-size","large");
				$("#my_machines_history_popup_chkbox_filter_wrap").find(".k-checkbox-label")[0].setAttribute("style","color:#88cc00 !important;");
				$("#my_machines_history_popup_chkbox_filter_wrap").find(".k-checkbox-label")[1].setAttribute("style","color:#ffa500 !important;");
				$("#my_machines_history_popup_chkbox_filter_wrap").find(".k-checkbox-label")[2].setAttribute("style","color:#00cccc !important;");
				my_machines.variable.machine_history_asset_id = selectedRecord.asset_id;
                my_machines.button.misc.machine_history_refresh_click();
            },
            feedback_click: function (ele) {
                alert("This feature is not yet implemented");
            },
            operator_log_book_click: function (ele) {
				mService.util.loadScript("www/lib/mservice/js/formHandler.lib.js", function () {
					try {
						form_handler.variable.custom.selectedRecord = my_machines.variable.dSource.getByUid($(ele).attr("data-ms-containr-param"));
						form_handler.variable.template = "operator_log_book";
						form_handler.variable.transaction_type = "ANCILLARY";
						form_handler.variable.transaction_ref_no = mService.app.getUserId() + "_" + kendo.toString(new Date(), 'ddMMyyHHmmss');
						form_handler.variable.file_category = "P"; 
						form_handler.variable.file_type = "P";
						form_handler.variable.file_name = mService.app.getUserId() + "_" + kendo.toString(new Date(), 'ddMMyyHHmmss') + "_oplogbk.pdf";
						form_handler.variable.file_path = "ancillary_attachments/" + mService.app.getUserId() + "_" + kendo.toString(new Date(), 'ddMMyyHHmmss');
						$("#my_machines_container").append("<div id = 'my_machines_container_form_handler_window'><div id = 'my_machines_container_form_handler_loader' style='width: 100%; height: 90%;' ></div></div>");
						$("#my_machines_container_form_handler_window").kendoWindow({
							width : (screen.width * 0.30),
							height : (screen.height * 0.75),
							title : ele.title,
							draggable: false,
							modal: true,
							resizable: false,
							visible: false,
							deactivate : function () {
								eval("delete form_handler");
								eval("delete formHandlerRuleEngine");
								this.destroy();
							},
						});
						$("#my_machines_container_form_handler_loader").append("<div id = 'form_handler'><div id = 'form_handler_header' style = 'margin-bottom:1%;'><div id = 'form_handler_page_title_lbl' name = 'form_handler_page_title_lbl' style='text-align: center; padding: 5px; margin: 0; background: #008b8b; color: #fff; font-size: 17px; font-family: 'Georgia', Times New Roman, Times, serif; width: 98%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'></div></div><div id = 'form_handler_content' style='border: 1px solid black; overflow-y: scroll; padding: 2%; position: absolute; bottom: 2.5% !important; top: 7.5%; width: 92.5%; left: 4%;'></div><div id = 'form_handler_footer' style='padding: 5px; background: #008b8b; font-size: large; color: white; position: absolute; bottom: 1%; width: 94.8%;'><center><span id='form_handler_navigate_page_group'><span><span style='font-size: x-large; ' id = 'form_handler_first_page_btn' data-widget-type = 'w_button' data-button-group = 'misc' data-button-role = 'first_page' class='k-icon k-i-arrow-end-left'></span>&nbsp;<span style='font-size: x-large; ' id = 'form_handler_previous_page_btn' data-widget-type = 'w_button' data-button-group = 'misc' data-button-role = 'previous_page'  class='k-icon k-i-arrow-60-left'></span>&nbsp;</span><span style = 'font-weight: 100;'><span id = 'form_handler_active_page'>1</span> of <span id = 'form_handler_total_pages'></span></span>&nbsp;<span><span style='font-size: x-large; ' id = 'form_handler_next_page_btn' data-widget-type = 'w_button' data-button-group = 'misc' data-button-role = 'next_page'  class='k-icon k-i-arrow-60-right'></span>&nbsp;<span style='font-size: x-large; ' id = 'form_handler_last_page_btn' data-widget-type = 'w_button' data-button-group = 'misc' data-button-role = 'last_page'  class='k-icon k-i-arrow-end-right'></span></span></span></center></div><style>.switch{position:relative;display:inline-block;width:90px;height:30px;}.switch input{display:none;}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ff0000;-webkit-transition:.4s;transition:.4s;border-radius:5px;}.slider:before{position:absolute;content:'';height:22px;width:26px;left:4px;bottom:4px;background-color:white;-webkit-transition:.4s;transition:.4s;border-radius:10%;}input:checked+.slider{background-color:#2ab934;}input:focus+.slider{box-shadow:0 0 1px#2196F3;}input:checked+.slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(55px);}.slider:after{content:'OFF';color:white;display:block;position:absolute;transform:translate(-50%,-50%);top:50%;left:50%;font-size:10px;font-family:Verdana,sans-serif;}input:checked+.slider:after{content:'ON';}.collapsible{background-color:#777;color:white;cursor:pointer;padding:2%;width:97%;border:none;text-align:left;outline:none;font-size:15px;border-radius:7px;}.active,.collapsible:hover{background-color:#555;}.collapsible_content{padding-top:10px;padding-left:10px;display:none;overflow:hidden;margin-left:5px;border:1px solid black;}</style></div>");
						form_handler.constructScreen();
						$("#my_machines_container_form_handler_window").data("kendoWindow").center().open();
						$(".k-overlay").css("opacity", "0.8");
					} catch (exception) {
						mService.exception.handle(exception);
					}
				}, function () {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				});
            },
			operator_log_report_click: function (ele) {
			try {
				mService.dSource.retrieveCustomInfoList({
					code: "'operator_log_report'",
					inputXml: "'<inputparam><asset_id>" + my_machines.variable.dSource.getByUid($(ele).attr("data-ms-containr-param")).asset_id + "</asset_id></inputparam>'"
					}, function (data) {
						try {
							my_machines.variable.opLogReportDSource = [{
								cells: [
									{"id":"creation_date","value":"Creation Date","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"equipment_category","value":"Product Group","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"equipment_type","value":"Product Sub Group","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"equipment_id","value":"Model","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"asset_id","value":"Machine Sr #","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"running_hrs","value":"Running Hours","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"load_hrs","value":"Load Hours","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"oil_temp","value":"Oil Temp","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"motor_start","value":"Motor Start #","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"load_relay","value":"Load Relay","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"rpm_1","value":"VSD 1-20% RPM","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"rpm_2","value":"VSD 20-40% RPM","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"rpm_3","value":"VSD 40-60% RPM","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"rpm_4","value":"VSD 60-80% RPM","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"rpm_5","value":"VSD 80-100% RPM","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"working_pressure","value":"Working Pressure","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"element_out_temp","value":"Element Out Temp","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"ambient_temp","value":"Ambient Temp","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"module_time","value":"Module Time","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"lat_deg","value":"Lat (Deg C)","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"cct_deg","value":"Converter Cabinet Temp (Deg C)","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"maintenance_notes","value":"Maintenance Notes","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"suggested_maintenance","value":"Suggested Maintenance","bold":"true","textAlign":"center","enable":false,"format":"@"},
									{"id":"initials","value":"Initials","bold":"true","textAlign":"center","enable":false,"format":"@"}
								]
							}];
							for(var index=0; index < data.length; index++){
								my_machines.variable.opLogReportDSource.push({
									cells: [
										{"id":"creation_date","value":data[index].creation_date,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"equipment_category","value":data[index].equipment_category,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"equipment_type","value":data[index].equipment_type,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"equipment_id","value":data[index].equipment_id,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"asset_id","value":data[index].asset_id,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"running_hrs","value":data[index].running_hrs,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"load_hrs","value":data[index].load_hrs,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"oil_temp","value":data[index].oil_temp,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"motor_start","value":data[index].motor_start,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"load_relay","value":data[index].load_relay,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"rpm_1","value":data[index].rpm_1,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"rpm_2","value":data[index].rpm_2,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"rpm_3","value":data[index].rpm_3,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"rpm_4","value":data[index].rpm_4,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"rpm_5","value":data[index].rpm_5,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"working_pressure","value":data[index].working_pressure,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"element_out_temp","value":data[index].element_out_temp,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"ambient_temp","value":data[index].ambient_temp,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"module_time","value":data[index].module_time,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"lat_deg","value":data[index].lat_deg,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"cct_deg","value":data[index].cct_deg,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"maintenance_notes","value":data[index].maintenance_notes,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"suggested_maintenance","value":data[index].suggested_maintenance,"bold":"true","textAlign":"center","enable":false,"format":"@"},
										{"id":"initials","value":data[index].initials,"bold":"true","textAlign":"center","enable":false,"format":"@"}
									]
								});
							};
							$("#my_machines_container").append("<div id = 'my_machines_container_operator_log_report_window'><div id = 'my_machines_container_operator_log_report_spreadsheet' style='width: 100%; height: 90%;' ></div></div>");
							$("#my_machines_container_operator_log_report_window").kendoWindow({
								width : (screen.width * 0.60),
								height : (screen.height * 0.75),
								title : ele.title,
								draggable: false,
								modal: true,
								resizable: false,
								visible: false,
								deactivate : function () {
									this.destroy();
								},
							});
							$("#my_machines_container_operator_log_report_spreadsheet").kendoSpreadsheet({
								columns: my_machines.variable.opLogReportDSource.length,
								rows : 100,
								sheetsbar: false,
								sheets: [{
									columns: [{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175},{"width":175}],
									rows: my_machines.variable.opLogReportDSource
								}],
								dataBound: function() {
									for (var i = 0; i < this.columns.length; i++) {
									  this.autoFitColumn(i);
									}
								}
							});
							$("#my_machines_container_operator_log_report_window").data("kendoWindow").center().open();
							$(".k-overlay").css("opacity", "0.8");
							$("#my_machines_container_operator_log_report_spreadsheet .k-tabstrip-wrapper").hide();
							$("#my_machines_container_operator_log_report_spreadsheet .k-spreadsheet-action-bar").hide();
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
            },
            chat_click: function (ele) {
                if($("[data-ms-link-role='CPORTACTLOGGING']").length != 0){
					mServiceQueryByPassing = {
						"asset_id" : my_machines.variable.dSource.getByUid($(ele).attr("data-ms-containr-param")).asset_id,
						"trans_type" : "ANCILLARY",
						"req_catg" : "QU",
						"req_type" : "GEN",
						"action_path" : "@INIT/@ASSETSERV"
					};
					$("[data-ms-link-role='CPORTACTLOGGING']").click();
				};
            },
            visit_schedule_click: function (ele) {
                alert("This feature is not yet implemented");
            },
			machine_history_clear_filter_click: function() {
				$("#my_machines_history_popup_chkbox_filter_SE").prop("checked",false);
				$("#my_machines_history_popup_chkbox_filter_PE").prop("checked",false);
				$("#my_machines_history_popup_chkbox_filter_SI").prop("checked",false);
				$("#my_machines_history_popup_chkbox_filter_QU").prop("checked",false);	 
				my_machines.button.misc.machine_history_refresh_click();
			},
			machine_history_refresh_click: function() {
				mService.dSource.retrieveCustomInfoList({
                    code: "'customer_timeline'",
					inputXml: "'<inputparam><asset_id_filter>" + my_machines.variable.machine_history_asset_id + "</asset_id_filter><chkbox_filter>" + $("#my_machines_history_popup_chkbox_filter").getVal().join() + "</chkbox_filter></inputparam>'"
                }, function (data) {
                    try {
						if ($("#my_machines_history_popup_header_timeline_group").length === 0) {
							$("#my_machines_history_popup_header_timeline").msTimeline({
								scrid: "my_machines",
								lblid: "",
								lblgrpid: "",
								eventtemplate: "my_machines_history_popup_header_timeline_detail_view_content_template",
								datasrc: [],
								colorTray: [{ 
									"SE": "#88cc00",
									"PQ": "#ffa500",
									"SI": "#00cccc",
									"QU": "#ff4d4d"
								}],
								orientation: "horizontal",
								dateformat: "dd MMM yyyy [ HH:mm ]"
							});
						}
						$("#my_machines_history_popup_header_timeline").setDataSource(data);
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
                    problemDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = my_machines.variable.selectedRecord["problem_description_" + mService.user.profile.login.locale_id];
                    problemDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = my_machines.variable.selectedRecord["problem_description_" + mService.user.profile.login.default_locale_id];
                    additionalDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = my_machines.variable.selectedRecord["addn_desc_" + mService.user.profile.login.locale_id];
                    additionalDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = my_machines.variable.selectedRecord["addn_desc_" + mService.user.profile.login.default_locale_id];
                    mService.config.ui.render("my_machines_" + catalogID + "_actions_detail_view", "crud_edit");
                    $("#my_machines_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                        buttonRegion: "edit"
                    }));
                    $("#my_machines_" + catalogID + "_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    $("#my_machines_edit_customer_contact_name").setVal(my_machines.variable.selectedRecord.cust_contact_name);
                    $("#my_machines_edit_customer_contact_number").setVal(my_machines.variable.selectedRecord.cust_contact_no);
                    $("#my_machines_edit_customer_contact_email").setVal(my_machines.variable.selectedRecord.cust_contact_email_id);
                    $("#my_machines_edit_customer_name").setVal(my_machines.variable.selectedRecord.customer_name);
                    $("#my_machines_edit_customer_id").setVal(my_machines.variable.selectedRecord.customer_id);
                    $("#my_machines_edit_equipment_id").setVal(my_machines.variable.selectedRecord.equipment_id);
                    $("#my_machines_edit_asset_id").setVal(my_machines.variable.selectedRecord.asset_id);
                    $("#my_machines_edit_udf_char_1").setVal(my_machines.variable.selectedRecord.udf_char_1);
                    $("#my_machines_edit_udf_char_2").setVal(my_machines.variable.selectedRecord.udf_char_2);
                    $("#my_machines_edit_asset_location").setVal(my_machines.variable.selectedRecord.asset_loc_reported);
                    $("#my_machines_edit_call_type").setVal(my_machines.variable.selectedRecord.call_type);
                    $("#my_machines_edit_call_priority").setVal(my_machines.variable.selectedRecord.priority_cd);
                    $("#my_machines_edit_problem_description").setVal(problemDescVal);
                    $("#my_machines_edit_additional_information").setVal(additionalDescVal);
                    my_machines.variable.validator = mService.config.rule.apply("my_machines_" + catalogID + "_actions_detail_view");
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            retrieve_click: function () {
                try {
                    my_machines.variable.selectedRecord = null;
                    my_machines.customHandler.refreshListView();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        wflow_click: function (ele, evt) {
            var catalogID;
            try {
                catalogID = mService.page.navigation.get.pageCatalogID();
                my_machines.variable.selectedEventverb = ele.attr("data-ms-wflow-eventverb");
                my_machines.variable.selectedToStage = ele.attr("data-ms-wflow-tostage");
                my_machines.variable.selectedToStatus = ele.attr("data-ms-wflow-tostatus");
                mService.config.ui.render("my_machines_" + catalogID + "_actions_detail_view", "workflow_" + my_machines.variable.selectedEventverb);
                $("#my_machines_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                    buttonRegion: "wflow"
                }));
                $("#my_machines_" + catalogID + "_actions_detail_view_action_bar").html("");
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
                        my_machines.customHandler.addSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "edit") {
                        my_machines.customHandler.editSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "wflow") {
                        my_machines.customHandler.wflowSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "attachment") {
                        mService.home.userAttachment.submitAttachment("CALL", my_machines.variable.selectedRecord.call_no);
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
                        my_machines.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
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
                    mService.config.ui.render("my_machines_add_actions_detail_view", "crud_add");
                    $("#my_machines_add_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                        buttonRegion: "add"
                    }));
                    $("#my_machines_add_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    my_machines.variable.validator = mService.config.rule.apply("my_machines_add_actions_detail_view");
                    if (mService.home.customerContactInfo.customerName !== "") {
                        $("#my_machines_add_customer_name").setVal(mService.home.customerContactInfo.customerName);
                    };
                    if (mService.home.customerContactInfo.contactName !== "") {
                        $("#my_machines_add_customer_contact_name").setVal(mService.home.customerContactInfo.contactName);
                    };
                    if (mService.home.customerContactInfo.contactNumber !== "") {
                        $("#my_machines_add_customer_contact_number").setVal(mService.home.customerContactInfo.contactNumber);
                    };
                    if (mService.home.customerContactInfo.contactEmail !== "") {
                        $("#my_machines_add_customer_contact_email").setVal(mService.home.customerContactInfo.contactEmail);
                    };
                    if (mService.home.customerContactInfo.customerID !== "") {
                        $("#my_machines_add_customer_id").setVal(mService.home.customerContactInfo.customerID);
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        open: {
            select: function () {
                try {
                    $("#my_machines_open_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#my_machines_open_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        my_machines.variable.selectedRecord = $("#my_machines_open_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!my_machines.msPageCatalogRefresh) {
                                            my_machines.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + my_machines.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    my_machines.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (my_machines.variable.selectedRecord !== null) {
                        $("#my_machines_open_actions_detail_view").html(mService.config.template.getTransformedHtml("my_machines_open_detail_view_template", my_machines.variable.selectedRecord));
                        my_machines.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = "";
                                if (my_machines.variable.selectedRecord.call_status === "OD" || my_machines.variable.selectedRecord.call_status === "O") {
                                    html = mService.config.template.getTransformedHtml("home_crud_action_bar_template", {
                                        scrID: "my_machines",
                                        crudName: "edit",
                                        buttonRegion: ""
                                    });
                                };
                                html += my_machines.customHandler.getActionBarHtml(data);
                                $("#my_machines_open_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#my_machines_open_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#my_machines_open_actions_detail_view_action_bar").html("");
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
                    if (my_machines.variable.selectedRecord !== null) {
                        $("#my_machines_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("my_machines_open_timeline_detail_view_template", my_machines.variable.selectedRecord));
                        $("#my_machines_open_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "my_machines_open_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": my_machines.variable.selectedRecord.call_no,
                                "call_category": my_machines.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#my_machines_open_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#my_machines_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
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
                    if (my_machines.variable.selectedRecord !== null) {
                        $("#my_machines_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("my_machines_open_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": my_machines.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: my_machines.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#my_machines_open_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#my_machines_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        closed: {
            select: function () {
                try {
                    $("#my_machines_closed_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#my_machines_closed_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        my_machines.variable.selectedRecord = $("#my_machines_closed_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!my_machines.msPageCatalogRefresh) {
                                            my_machines.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + my_machines.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    my_machines.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (my_machines.variable.selectedRecord !== null) {
                        $("#my_machines_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("my_machines_closed_detail_view_template", my_machines.variable.selectedRecord));
                        my_machines.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = my_machines.customHandler.getActionBarHtml(data);
                                $("#my_machines_closed_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#my_machines_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#my_machines_closed_actions_detail_view_action_bar").html("");
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
                    if (my_machines.variable.selectedRecord !== null) {
                        $("#my_machines_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("my_machines_closed_timeline_detail_view_template", my_machines.variable.selectedRecord));
                        $("#my_machines_closed_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "my_machines_closed_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": my_machines.variable.selectedRecord.call_no,
                                "call_category": my_machines.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#my_machines_closed_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#my_machines_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
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
                    if (my_machines.variable.selectedRecord !== null) {
                        $("#my_machines_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("my_machines_closed_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": my_machines.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: my_machines.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#my_machines_closed_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#my_machines_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
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
                if (my_machines.variable.validator.validate()) {
                    var problemDescXml,
                        additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#my_machines_add_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#my_machines_add_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#my_machines_add_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#my_machines_add_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
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
                                    p_customer_id: $("#my_machines_add_customer_id").getVal(),
                                    p_asset_id: $("#my_machines_add_asset_id").getVal(),
                                    p_asset_location_reported: $("#my_machines_add_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#my_machines_add_call_priority").getVal(),
                                    p_customer_contact_name: $("#my_machines_add_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: (my_machines.variable.customerInfoCustomerLocationCode !== undefined) ? (my_machines.variable.customerInfoCustomerLocationCode) : ("ZZZ"),
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: mService.user.profile.login.org_lvl_no,
                                    p_organogram_level_code: mService.user.profile.login.org_lvl_code,
                                    p_call_category: my_machines.variable.callCategory,
                                    p_call_type: $("#my_machines_add_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#my_machines_add_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#my_machines_add_customer_contact_email").getVal(),
                                    p_equipment_id: $("#my_machines_add_equipment_id").getVal(),
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
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#my_machines_add_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#my_machines_add_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#my_machines_add_udf_char_2").getVal() + "</udf_char_2></inputparam>",
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
                                my_machines.customHandler.resetAddCatalogFields();
                                my_machines.msPageValueChanged = false;
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
                if (my_machines.variable.validator.validate()) {
                    var problemDescXml,
                        additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#my_machines_edit_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#my_machines_edit_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#my_machines_edit_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#my_machines_edit_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
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
                                    p_customer_id: $("#my_machines_edit_customer_id").getVal(),
                                    p_asset_id: $("#my_machines_edit_asset_id").getVal(),
                                    p_asset_location_reported: $("#my_machines_edit_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#my_machines_edit_call_priority").getVal(),
                                    p_customer_contact_name: $("#my_machines_edit_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: my_machines.variable.selectedRecord.cust_location_code,
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: my_machines.variable.selectedRecord.org_level_no,
                                    p_organogram_level_code: my_machines.variable.selectedRecord.org_level_code,
                                    p_call_category: my_machines.variable.selectedRecord.call_category,
                                    p_call_type: $("#my_machines_edit_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#my_machines_edit_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#my_machines_edit_customer_contact_email").getVal(),
                                    p_equipment_id: $("#my_machines_edit_equipment_id").getVal(),
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
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#my_machines_edit_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#my_machines_edit_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#my_machines_edit_udf_char_2").getVal() + "</udf_char_2></inputparam>",
                                    p_rec_timestamp: "00000000-0000-0000-0000-000000000000",
                                    p_save_mode: "U"
                                },
                                "outputparam": {
                                    "p_service_call_ref_no": my_machines.variable.selectedRecord.call_no
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
                                my_machines.msPageValueChanged = false;
                                my_machines.customHandler.refreshListView();
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
                                p_call_ref_no: my_machines.variable.selectedRecord.call_no,
                                p_wfeventverb_id: my_machines.variable.selectedEventverb,
                                p_event_date: kendo.toString((new Date()), "yyyy-MM-dd"),
                                p_event_hour: kendo.toString((new Date()), "HH"),
                                p_event_minute: kendo.toString((new Date()), "mm"),
                                p_from_wf_stage_no: my_machines.variable.selectedRecord.call_wf_stage,
                                p_to_wf_stage_no: my_machines.variable.selectedToStage,
                                p_from_wf_status: my_machines.variable.selectedRecord.call_status,
                                p_to_wf_status: my_machines.variable.selectedToStatus,
                                p_channel_id: "WEB",
                                p_by_employee_id: mService.user.profile.login.employee_id,
                                p_to_employee_id_string: "",
                                p_reason_code: "",
                                p_comments: $("#my_machines_workflow_comments").getVal(),
                                p_lattitude_value: "",
                                p_longitude_value: "",
                                p_attachment_xml: "",
                                p_inputparam_xml1: "",
                                p_inputparam_xml2: "",
                                p_inputparam_xml3: "",
                                p_rec_tstamp: my_machines.variable.selectedRecord.rec_tstamp,
                                p_save_mode: "A"
                            }
                        }
                    }),
                    success: function (response) {
                        try {
                            if (response.document === undefined) {
                                mService.app.alert("success", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + my_machines.variable.selectedEventverb,
                                    lblgrpid: "success"
                                });
                                my_machines.msPageValueChanged = false;
                                my_machines.customHandler.refreshListView();
                            } else {
                                mService.app.alert("error", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + my_machines.variable.selectedEventverb,
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
                                lblid: "call_" + my_machines.variable.selectedEventverb,
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
                    eventVerbs[index].scrID = "my_machines";
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
                        "call_category": my_machines.variable.callCategory,
                    }) + "'",
                    record: my_machines.variable.selectedRecord
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
                $("#my_machines_add_call_type").setVal("");
                $("#my_machines_add_customer_id").setVal("");
                $("#my_machines_add_equipment_id").setVal("");
                $("#my_machines_add_asset_id").setVal("");
                $("#my_machines_add_udf_char_1").setVal("");
                $("#my_machines_add_udf_char_2").setVal("");
                $("#my_machines_add_asset_location").setVal("");
                $("#my_machines_add_problem_description").setVal("");
                $("#my_machines_add_additional_information").setVal("");
                $("#my_machines_add_customer_contact_name").setVal("");
                $("#my_machines_add_customer_contact_number").setVal("");
                $("#my_machines_add_customer_contact_email").setVal("");
                $("#my_machines_add_customer_name").setVal("");
                $("#my_machines_add_call_priority").setVal("");
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
                listView = $("#my_machines_" + catalogID + "_list_view").data("kendoListView");
                dSource = mService.dSource.getSource({
                    code: "'call_register'",
                    inputXml: "'" + JSON.stringify({
                        "call_category": my_machines.variable.callCategory,
                        "list_type": catalogID.toUpperCase(),
                        "search_string": $("#my_machines_" + catalogID + "_list_search_box").val()
                    }) + "'"
                });
                dSource.read().then(function () {
                    var selectedItem;
                    try {
                        listView.dataSource.data(dSource.data());
                        if (my_machines.variable.selectedRecord !== null) {
                            selectedItem = $.grep(listView.dataSource.data(), function (e, i) {
                                try {
                                    return e.call_no === my_machines.variable.selectedRecord.call_no;
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
                            my_machines.variable.selectedRecord = null;
                            my_machines.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
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
                    $("#my_machines_add_equipment_id").setVal("");
                    $("#my_machines_add_asset_id").setVal("");
                    $("#my_machines_add_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'equipment_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#my_machines_add_customer_id").getVal()
                        }) + "'"
                    }));
                    $("#my_machines_add_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'asset_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#my_machines_add_customer_id").getVal()
                        }) + "'"
                    }));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            edit_customer_id: function () {
                try {
                    $("#my_machines_edit_equipment_id").setVal("");
                    $("#my_machines_edit_asset_id").setVal("");
                    $("#my_machines_edit_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'equipment_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#my_machines_edit_customer_id").getVal()
                        }) + "'"
                    }));
                    $("#my_machines_edit_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'asset_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#my_machines_edit_customer_id").getVal()
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