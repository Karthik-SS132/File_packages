mService.pattern.query = {
    button: {
        chat: function (ele, nData) {
            var subKey = "",
            paramObj,
            custom,
            callCheck,
            controllerObj,
            txnContent = "",
            scrID;
            try {
                scrID = mService.pattern.query.util.getscreenID();
                controllerObj = mService.config.controller.getControllerObj(scrID);
                if (controllerObj.pattern_name === "tab") {
                    $("#" + scrID + "_list_title").remove();
                    if (mService.pattern.query.variable.tabstrip !== undefined && mService.pattern.query.variable.tabstrip.select() !== undefined && mService.pattern.query.variable.tabstrip.select().index() !== undefined && controllerObj.pattern_data[mService.pattern.query.variable.tabstrip.select().index()] !== undefined && controllerObj.pattern_data[mService.pattern.query.variable.tabstrip.select().index()].action_path !== undefined) {
                        if (controllerObj.pattern_data[mService.pattern.query.variable.tabstrip.select().index()].allowNewTxn !== undefined && controllerObj.pattern_data[mService.pattern.query.variable.tabstrip.select().index()].allowNewTxn == "true") {
                            $(".ms_calldb_form_action_icon").show();
                        } else {
                            $(".ms_calldb_form_action_icon").hide();
                        };
                        subKey = JSON.parse(ele.getAttribute("data-ms-containr-param")).request_ref_no;
                    };
                };
                if (mService.containR.variable[scrID] === undefined) {
                    mService.containR.variable[scrID] = {};
                };
                if (nData !== undefined) {
                    if (mService.pattern.query.variable.dSource !== "") {
                        callCheck = $.grep(mService.pattern.query.variable.dSource.data(), function (e, i) {
                            try {
                                return e.request_ref_no === nData.data.msgBody.custom.transaction_ref_no;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        if (callCheck.length === 0) {
                            mService.pattern.query.util.loadCalls(scrID);
                            setTimeout(function () {
                                try {
                                    $("#" + nData.data.msgBody.custom.transaction_ref_no + "_container").addClass("ms_pattern_query_list_active").removeClass("ms_pattern_query_list_normal");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 50);
                        } else {
                            var data = JSON.parse(JSON.stringify(mService.pattern.query.variable.dSource.data())),
                            index = $.map(data, function (e, i) {
                                if (e.request_ref_no === nData.data.msgBody.custom.transaction_ref_no) {
                                    return i;
                                }
                            })[0],
                            tempItem;
                            if (index !== undefined) {
                                var activeEle = $("#" + scrID + "_container_list").find(".ms_pattern_query_list_active");
                                if (activeEle.length !== 0) {
                                    activeEleID = $(activeEle).attr("id");
                                }
                                tempItem = data[index];
                                data.splice(index, 1);
                                data.unshift(tempItem);
                                mService.pattern.query.variable.dSource.data(data);
                                mService.pattern.query.util.showList(scrID, true);
                            };
                        };
                    };
                    mService.widgets.variable.msChat.variable[scrID + "_chat"] = nData.data.msgBody;
                    subKey = nData.data.msgBody.subKey;
                };
                if (ele !== "") {
                    if ($(ele).attr("data-ms-containr-param") !== undefined) {
                        paramObj = JSON.parse($(ele).attr("data-ms-containr-param"));
                        subKey = (subKey !== "") ? (subKey) : (paramObj.subkey);
                        mService.containR.variable[scrID].selectedRecord = mService.pattern.query.variable.dSource.getByUid(paramObj.uid);
                    };
                    if ($(ele).attr("id") !== undefined) {
                        mService.pattern.query.util.hideNotificationIndicator(($(ele).attr("id")).replace("_container", ""));
                        $("#" + (($(ele).attr("id")).replace("_container", "")) + "_notification_count").text("");
                        $("#" + (($(ele).attr("id")).replace("_container", "")) + "_notification_ind").hide();
                    }
                };
                if (subKey !== undefined && subKey !== "" && ele !== "") {

                    $("#" + scrID + "_container_list").children().addClass("ms_pattern_query_list_normal").removeClass("ms_pattern_query_list_active");
                    $(ele).addClass("ms_pattern_query_list_active").removeClass("ms_pattern_query_list_normal");

                } else {
                    if (nData === undefined) {
                        $("#" + scrID + "_container_list").children().addClass("ms_pattern_query_list_normal").removeClass("ms_pattern_query_list_active");
                    }
                }
                $("#" + scrID + "_chat_section").html(mService.config.template.getTransformedHtml("msPatternQueryChatTemplate", {
                        id: scrID
                    }));
                mService.config.controller.get(scrID, function () {
                    var controllerObj,
                    controllerObjAddnTemp;
                    custom;
                    try {
                        controllerObj = mService.config.controller.getControllerObj(scrID + "_chat");
                        if (controllerObj.pattern_name === "tab") {
                            controllerObj = controllerObj.pattern_data[mService.pattern.query.variable.tabstrip.select().index()].chat;
                        };
                        custom = {};
                        if (controllerObj.custom !== undefined) {
                            controllerObjAddnTemp = JSON.parse(JSON.stringify(controllerObj.custom));
                            custom = mService.util.getTransformedJSon(controllerObjAddnTemp);
                        };
                        if (ele === "") {
                            mService.pattern.query.util.getCallDetails(scrID.replace("chat", "") + "_list", nData.data.msgBody.custom.transaction_ref_no, function (result) {
                                try {
                                    if (result === "internet_not_available") {
                                        mService.app.showToast("internet_connection_error", "system_messages");
                                    } else {
                                        mService.containR.variable[scrID].selectedRecord = result;
                                        $("#" + mService.containR.variable[scrID].selectedRecord.request_ref_no + "_container").addClass("ms_pattern_query_list_active").removeClass("ms_pattern_query_list_normal");
                                        $("#" + scrID + "_chat_content").msChat({
                                            scrid: scrID + "_chat",
                                            key: controllerObj.chatKey,
                                            subKey: subKey,
                                            callDetails: ($(ele).attr("data-ms-containr-param") !== undefined) ? (paramObj) : "",
                                            selectedRecord: mService.containR.variable[scrID].selectedRecord,
                                            custom: custom
                                        });
                                    };
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            $("#" + scrID + "_chat_content").msChat({
                                scrid: scrID + "_chat",
                                key: controllerObj.chatKey,
                                subKey: subKey,
                                callDetails: ($(ele).attr("data-ms-containr-param") !== undefined) ? (paramObj) : "",
                                selectedRecord: mService.containR.variable[scrID].selectedRecord,
                                custom: custom
                            });
                        }
                        $("#" + scrID + "_chat_content_message_box_group").parent().css("width", "100%");
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
                if (mService.spinner.counter >= 1) {
                    mService.spinner.hide();
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
            if (mService.pattern.query.variable.tabstrip != undefined) {
                $("#" + scrID + "_container_list").prepend("<div id='" + scrID + "_list_title' style='margin: 1em; text-align: center; font-weight: bold; font-size: large; color: #0078a1;'>" + $("#" + scrID + "_container_tab").find("[aria-controls=" + scrID + "_container_tab-" + (mService.pattern.query.variable.tabstrip.select().index() + 1) + "]").attr("title") + "</div>");
            };
        },
        preview: function (ele) {
            var obj,
            type,
            src,
            scrID;
            scrID = mService.pattern.query.util.getscreenID();
            obj = JSON.parse(ele.attr("data-ms-listview-param"));
            type = obj["attachType"];
            src = obj["attachSrc"];
            $("#" + scrID + "_preview_popup").kendoWindow({
                width: ($(window).width() * 85) / (100),
                height: ($(window).height() * 90) / (100),
                title: {
                    text: "Preview",
                    encoded: false
                },
                open: function () {
                    try {
                        $("#" + scrID + "_popup_attachment_view_content").html("");
                        if (type === "I") {
                            $("#" + scrID + "_popup_attachment_view_content").msImageviewer({
                                source: src,
                            });
                        } else if (type === "A") {
                            $("#" + scrID + "_popup_attachment_view_content").msAudioplayer({
                                source: src,
                            });
                        } else if (type === "V") {
                            $("#" + scrID + "_popup_attachment_view_content").msVideoplayer({
                                source: src,
                            });
                        } else if (type === "P") {
                            $("#" + scrID + "_popup_attachment_view_content").msPdfviewer({
                                source: src,
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                draggable: false,
                modal: true,
                resizable: false,
                visible: false
            });
            $("#" + scrID + "_preview_popup").data("kendoWindow").open().center();
        }
    },
    fcm: {
        handle: function (scrID, nData, listScreenInd, notificationOpenedInd) {
            var msgBody,
            callNo,
            parentScrID,
            listScrID,
            chatVariable;
            try {
                msgBody = nData.additionalData.msgBody;
                callNo = msgBody.custom.transaction_ref_no;
                parentScrID = scrID.replace("_chat", "").replace("_list", "");
                listScrID = parentScrID + "_list";
                if (!notificationOpenedInd) {
                    if (listScreenInd === "chat") {
                        if (mService.pattern.query.util.checkCallAvailability(parentScrID, callNo)) {
                            mService.pattern.query.util.list.moveCallToTop(parentScrID, callNo);
                        } else {
                            mService.containR.variable[parentScrID].refreshList = true;
                            mService.pattern.query.util.addNotificationInd(parentScrID, callNo);
                        }
                    } else if (listScreenInd === "list") {
                        mService.pattern.query.util.addNotificationInd(parentScrID, callNo);
                        if (mService.pattern.query.util.checkCallAvailability(parentScrID, callNo)) {
                            mService.pattern.query.util.list.moveCallToTop(parentScrID, callNo);
                            mService.presentR.pattern.listview.init.initializeFreeFlowListview(listScrID, false, false);
                        } else {
                            mService.presentR.pattern.listview.init.initializeFreeFlowListview(listScrID, true, true);
                        };
                    } else {
                        if (mService.dSource.cache[listScrID] !== undefined) {
                            if (mService.pattern.query.util.checkCallAvailability(parentScrID, callNo)) {
                                mService.pattern.query.util.list.moveCallToTop(parentScrID, callNo);
                            } else {
                                mService.containR.variable[parentScrID].refreshList = true;
                                mService.pattern.query.util.addNotificationInd(parentScrID, callNo);
                            }
                        }
                    }
                } else {
                    chatVariable = mService.widgets.variable.msChat.variable[msgBody.scrID + "_content"];
                    if (chatVariable !== undefined) {
                        if (msgBody.key === chatVariable.key && msgBody.subKey === chatVariable.subKey) {
                            mService.widgets.init.util.msChat.handle(((msgBody.scrID.indexOf("_content") === -1) ? (msgBody.scrID + "_content") : (msgBody.scrID)), msgBody);
                        } else {
                            mService.pattern.query.util.refreshChatScreen(msgBody.scrID, msgBody);
                        };
                        if (callNo !== undefined) {
                            if (mService.dSource.cache[listScrID] !== undefined) {
                                if (mService.pattern.query.util.checkCallAvailability(parentScrID, callNo)) {
                                    mService.pattern.query.util.list.moveCallToTop(parentScrID, callNo);
                                } else {
                                    mService.containR.variable[parentScrID].refreshList = true;
                                    mService.pattern.query.util.addNotificationInd(parentScrID, callNo);
                                }
                            }
                        }
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    init: function (scrID, functionalMenuID) {
        var feature;
        try {
            if (mService.app.channel === "web") {
                feature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                    try {
                        return e.p_child_feature_id_or_group === functionalMenuID
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                })[0];
                mService.pattern.query.util.loadScreen(scrID, functionalMenuID, feature.p_add_access);
                $("#" + scrID + "_list_title").remove();
                if (mService.pattern.query.variable.tabstrip != undefined) {
                    $("#" + scrID + "_container_list").prepend("<div id='" + scrID + "_list_title' style='margin: 1em; text-align: center; font-weight: bold; font-size: large; color: #0078a1;'>" + $("#" + scrID + "_container_tab").find("[aria-controls=" + scrID + "_container_tab-" + (mService.pattern.query.variable.tabstrip.select().index() + 1) + "]").attr("title") + "</div>");
                };
            } else {
                if (mService.app.getScreenId() !== scrID + "_list") {
                    if (mService.containR.variable[scrID].openChatScreen !== undefined && mService.containR.variable[scrID].openChatScreen === true) {
                        mService.pattern.query.util.loadScreen(scrID + "_chat", "");
                    } else {
                        feature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                            try {
                                return e.p_child_screen_id === scrID;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        })[0];
                        mService.pattern.query.util.loadScreen(scrID + "_list", "", feature.p_add_access);
                    }
                } else {
                    mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID + "_list", false, true);
                }
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    page: {
        beforeShow: function (scrID) {
            var controllerObj,
            labelObj,
            tabDSource = [];
            try {
                controllerObj = mService.config.controller.getControllerObj(scrID);
                if (controllerObj.pattern_name === "tab") {
                    $.ajax({
                        url: mService.app.clientURL + "/" + "www" + "/" + "configuration" + "/" + "label" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + mService.app.getLocaleId() + "/" + "label_" + scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId() + ".json",
                        async: false,
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (response, status) {
                            labelObj = response;
                        },
                        error: function () {
                            mService.exception.handle(exception);
                        }
                    });
                    for (var index = 0; index < controllerObj.pattern_data.length; index++) {
                        tabDSource.push({
                            id: controllerObj.pattern_data[index].id,
                            text: " ",
                            spriteCssClass: labelObj.field.tab[controllerObj.pattern_data[index].id]
                        });
                    };
                    $("#" + scrID + "_container_list").parent().parent().prepend("<div style='background-color: whitesmoke; font-weight: bold;' id='" + scrID + "_container_tab'><style>.k-state-active { background-color: darkgray; }</style></div>");
                    mService.pattern.query.variable.tabstrip = $("#" + scrID + "_container_tab").kendoTabStrip({
                        tabPosition: "left",
                        dataTextField: "text",
                        dataSpriteCssClass: "spriteCssClass",
                        dataSource: tabDSource,
                        change: function (e) {
                            if (controllerObj.pattern_data[mService.pattern.query.variable.tabstrip.select().index()].allowNewTxn !== undefined && controllerObj.pattern_data[mService.pattern.query.variable.tabstrip.select().index()].allowNewTxn == "true") {
                                $(".ms_calldb_form_action_icon").show();
                            } else {
                                $(".ms_calldb_form_action_icon").hide();
                            };
                            $("#" + scrID + "_chat_section").html("");
                            mService.pattern.query.util.loadCalls(scrID, "");
                            $("#" + scrID + "_container_list").prepend("<div id='" + scrID + "_list_title' style='margin: 1em; text-align: center; font-weight: bold; font-size: large; color: #0078a1;'>" + $("#" + scrID + "_container_tab").find("[aria-controls=" + scrID + "_container_tab-" + (mService.pattern.query.variable.tabstrip.select().index() + 1) + "]").attr("title") + "</div>");
                        }
                    }).data("kendoTabStrip");
                    mService.pattern.query.variable.tabstrip.select(0);
                    for (var index = 0; index < controllerObj.pattern_data.length; index++) {
                        $("#" + scrID + "_container_tab").find("[aria-controls=" + scrID + "_container_tab-" + (index + 1) + "]").attr("title", labelObj.field.tab[controllerObj.pattern_data[index].id + "_title"]);
                    };
                    mService.pattern.query.util.loadCalls(scrID, "");
                    $("#" + scrID + "_container_list").prepend("<div id='" + scrID + "_list_title' style='margin: 1em; text-align: center; font-weight: bold; font-size: large; color: #0078a1;'>" + $("#" + scrID + "_container_tab").find("[aria-controls=" + scrID + "_container_tab-" + (mService.pattern.query.variable.tabstrip.select().index() + 1) + "]").attr("title") + "</div>");
                } else {
                    mService.pattern.query.util.loadCalls(scrID, "");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    util: {
        addNotificationInd: function (scrID, callNo) {
            var callAvailable;
            try {
                callAvailable = false;
                if (mService.pattern.query.variable[scrID] === undefined) {
                    mService.pattern.query.variable[scrID] = {};
                };
                if (mService.app.channel === "web") {
                    if (mService.pattern.query.variable[scrID].notificationCount === undefined) {
                        mService.pattern.query.variable[scrID].notificationCount = [];
                    };
                    objLength = Object.keys(mService.pattern.query.variable[scrID].notificationCount).length;
                    objKey = Object.keys(mService.pattern.query.variable[scrID].notificationCount);
                    objValue = Object.values(mService.pattern.query.variable[scrID].notificationCount);
                } else {
                    if (mService.containR.variable[scrID].notificationCount === undefined) {
                        mService.containR.variable[scrID].notificationCount = [];
                    };
                    objLength = Object.keys(mService.containR.variable[scrID].notificationCount).length;
                    objKey = Object.keys(mService.containR.variable[scrID].notificationCount);
                    objValue = Object.values(mService.containR.variable[scrID].notificationCount);
                };
                for (index = 0; index < objLength; index++) {
                    if (objValue[index].callNo === callNo) {
                        objValue[index].count = objValue[index].count + 1;
                        callAvailable = true;
                    }
                };
                if (!callAvailable) {
                    if (mService.app.channel === "web") {
                        mService.pattern.query.variable[scrID].notificationCount.push({
                            callNo: callNo,
                            count: 1
                        });
                    } else {
                        mService.containR.variable[scrID].notificationCount.push({
                            callNo: callNo,
                            count: 1
                        });
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        checkCallAvailability: function (scrID, callNo) {
            var returnVal = false;
            try {
                callAvailableCheck = $.grep(mService.dSource.cache[scrID + "_list"].data(), function (e, i) {
                    try {
                        return e.request_ref_no === callNo;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                if (callAvailableCheck.length > 0) {
                    returnVal = true;
                };
                return returnVal;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        checkNotificationInd: function (scrID) {
            try {
                if (mService.app.channel === "web") {
                    scrID = scrID.replace("_list", "").replace("_chat", "");
                    if (mService.pattern.query.variable[scrID] !== undefined && mService.pattern.query.variable[scrID].notificationCount !== undefined) {
                        for (var i = 0; i < mService.pattern.query.variable[scrID].notificationCount.length; i++) {
                            $("#" + mService.pattern.query.variable[scrID].notificationCount[i].callNo + "_notification_ind").show();
                            $("#" + mService.pattern.query.variable[scrID].notificationCount[i].callNo + "_notification_count").text(mService.pattern.query.variable[scrID].notificationCount[i].count);
                        }
                    }
                } else {
                    scrID = scrID.replace("_list", "").replace("_chat", "");
                    if (mService.containR.variable[scrID].notificationCount !== undefined) {
                        for (var i = 0; i < mService.containR.variable[scrID].notificationCount.length; i++) {
                            $("#" + mService.containR.variable[scrID].notificationCount[i].callNo + "_notification_ind").show();
                            $("#" + mService.containR.variable[scrID].notificationCount[i].callNo + "_notification_count").text(mService.containR.variable[scrID].notificationCount[i].count);
                        }
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getCallDetails: function (scrID, transaction_ref_no, success) {
            var controllerObj,
            inputXml,
            call_data_source;
            try {
                if (window.navigator.onLine) {
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (controllerObj.pattern_name === "tab") {
                        inputXml = JSON.parse(mService.util.getTransformedValue(controllerObj["pattern_data"][mService.pattern.query.variable.tabstrip.select().index()].list.dSource[scrID].inputParam.inputXml));
                        inputXml.request_ref_no_filter = transaction_ref_no;
                        call_data_source = mService.dSource.getSource({
                            code: "'" + mService.util.getTransformedValue(controllerObj["pattern_data"][mService.pattern.query.variable.tabstrip.select().index()].list.dSource[scrID].inputParam.code) + "'",
                            inputXml: "'" + JSON.stringify(inputXml) + "'"
                        });
                    } else {
                        inputXml = JSON.parse(mService.util.getTransformedValue(controllerObj.dSource[scrID].inputParam.inputXml));
                        inputXml.request_ref_no_filter = transaction_ref_no;
                        call_data_source = mService.dSource.getSource({
                            code: "'" + mService.util.getTransformedValue(controllerObj.dSource[scrID].inputParam.code) + "'",
                            inputXml: "'" + JSON.stringify(inputXml) + "'"
                        });
                    };
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
        getscreenID: function () {
            var feature;
            feature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                try {
                    return e.p_child_feature_id_or_group === mService.page.navigation.get.functionalMenuID()
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
            return feature[0].p_child_screen_id;
        },
        hideNotificationIndicator: function (id) {
            var index;
            try {
                if (mService.app.channel === "web") {
                    if (mService.pattern.query.variable[mService.pattern.query.util.getscreenID().replace("_list", "").replace("_chat", "")] !== undefined && mService.pattern.query.variable[mService.pattern.query.util.getscreenID().replace("_list", "").replace("_chat", "")].notificationCount !== undefined && mService.pattern.query.variable[mService.pattern.query.util.getscreenID().replace("_list", "").replace("_chat", "")].notificationCount.length > 0) {
                        index = mService.pattern.query.variable[mService.pattern.query.util.getscreenID().replace("_list", "").replace("_chat", "")].notificationCount.findIndex(object => {
                            return object.callNo === id;
                        });
                        if (index !== undefined && index !== -1) {
                            mService.pattern.query.variable[mService.pattern.query.util.getscreenID().replace("_list", "").replace("_chat", "")].notificationCount.splice(index, 1);
                        }
                    };
                    $("#" + id + "_notification_ind").hide();
                } else {
                    if (mService.containR.variable[mService.app.getScreenId().replace("_list", "").replace("_chat", "")].notificationCount !== undefined && mService.containR.variable[mService.app.getScreenId().replace("_list", "").replace("_chat", "")].notificationCount.length > 0) {
                        index = mService.containR.variable[mService.app.getScreenId().replace("_list", "").replace("_chat", "")].notificationCount.findIndex(object => {
                            return object.callNo === id;
                        });
                        if (index !== undefined && index !== -1) {
                            mService.containR.variable[mService.app.getScreenId().replace("_list", "").replace("_chat", "")].notificationCount.splice(index, 1);
                        }
                    };
                    $("#" + id + "_notification_ind").hide();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        hideShowMessageBox: function (id, msgBody) {
            try {
                id = (id.indexOf("content") === -1) ? (id + "_content") : (id);
                $("#" + id + "_message_box_group").show();
                $("#" + id + "_message_box_container").show();
                $("#" + id + "_message_box").show();
                $("#" + id + "_message_box_send").show();
                $("#" + id + "_attachment").show();
                $("#" + id + "_attachment_parent").show()
                $("#" + id + "_camera").show();
                if (msgBody.allowMsg !== undefined) {
                    if (msgBody.allowMsg === "false" || msgBody.allowMsg === "") {
                        $("#" + id + "_message_box_container").hide();
                        $("#" + id + "_message_box").hide();
                        $("#" + id + "_message_box_send").hide();
                    } else {
                        $("#" + id + "_message_box_container").show();
                        $("#" + id + "_message_box").show();
                        $("#" + id + "_message_box_send").show();
                    };
                };
                if (msgBody.allowAttach !== undefined) {
                    if (msgBody.allowAttach === "false" || msgBody.allowAttach === "") {
                        $("#" + id + "_attachment").hide();
                        $("#" + id + "_attachment_parent").hide();
                        $("#" + id + "_camera").hide();
                    } else {
                        $("#" + id + "_attachment").show();
                        $("#" + id + "_attachment_parent").show();
                        $("#" + id + "_camera").show();
                    };
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        list: {
            moveCallToTop: function (scrID, callNo) {
                var listDSrc,
                callIndex,
                tempItem,
                parentScrID,
                listScrID;
                try {
                    parentScrID = scrID.replace("_chat", "").replace("_list", "");
                    listScrID = parentScrID + "_list";
                    listDSrc = JSON.parse(JSON.stringify(mService.dSource.cache[listScrID].data()));
                    callIndex = $.map(listDSrc, function (e, i) {
                        if (e.request_ref_no === callNo) {
                            return i;
                        }
                    })[0];
                    if (callIndex !== undefined) {
                        tempItem = listDSrc[callIndex];
                        listDSrc.splice(callIndex, 1);
                        listDSrc.unshift(tempItem);
                        mService.dSource.cache[listScrID].data(listDSrc);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        loadCalls: function (scrID, activeInd, notificationInd) {
            var controllerObj,
            dSrcObj;
            controllerObj = mService.config.controller.getControllerObj(scrID);
            if (controllerObj.pattern_name === "tab") {
                mService.pattern.query.variable.tabstrip = $("#" + scrID + "_container_tab").data("kendoTabStrip");
                dSrcObj = {
                    code: controllerObj["pattern_data"][mService.pattern.query.variable.tabstrip.select().index()].list.dSource[scrID + "_list"].inputParam.code,
                    inputXml: controllerObj["pattern_data"][mService.pattern.query.variable.tabstrip.select().index()].list.dSource[scrID + "_list"].inputParam.inputXml
                };
            } else {
                dSrcObj = {
                    code: controllerObj.list.dSource[scrID + "_list"].inputParam.code,
                    inputXml: controllerObj.list.dSource[scrID + "_list"].inputParam.inputXml
                };
            };
            mService.pattern.query.variable.dSource = mService.dSource.getSource(dSrcObj);
            mService.pattern.query.variable.dSource.read().then(function () {
                try {
                    mService.pattern.query.util.showList(scrID, activeInd, notificationInd);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        },
        loadScreen: function (scrID, obj, allowNewChat) {
            try {
                if (mService.app.channel === "web") {
                    mService.config.controller.get(scrID, function () {
                        var controllerObj,
                        controllerObjAddnTemp,
                        custom;
                        try {
                            controllerObj = mService.config.controller.getControllerObj(scrID);
                            mService.pattern.query.util.loadTemplate(scrID, obj, allowNewChat, function () {
                                if (mService.app.channel === "web") {
                                    mService.pattern.query.page.beforeShow(scrID);
                                }
                            }, function () {});
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
                } else {
                    if (mService.config.controller.getControllerObj(scrID) === undefined) {
                        mService.spinner.show();
                        mService.config.controller.get(scrID.replace(/_chat$/, ""), function () {
                            try {
                                mService.containR.config.util.loadConfigData(scrID.replace(/_chat$/, ""), function () {
                                    try {
                                        mService.spinner.hide();
                                        mService.pattern.query.util.openScreen(scrID, obj, allowNewChat);
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
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.pattern.query.util.openScreen(scrID, obj, allowNewChat);
                    }

                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        openScreen: function (scrID, obj, allowNewChat) {
            try {
                mService.pattern.query.util.loadTemplate(scrID, "", allowNewChat, function () {
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
                if (obj !== undefined && obj !== "") {
                    if (mService.containR.variable[scrID] === undefined) {
                        mService.containR.variable[scrID] = {};
                    };
                    if (mService.containR.variable[scrID.replace("_chat", "")] === undefined) {
                        mService.containR.variable[scrID.replace("_chat", "")] = {};
                    };
                    if (mService.containR.variable[scrID.replace("_chat", "")].openChatScreen !== undefined && mService.containR.variable[scrID.replace("_chat", "")].openChatScreen === true) {
                        mService.containR.variable[scrID.replace("_chat", "")].openChatScreen = false;
                    } else {
                        if (obj.type === "chat") {
                            mService.containR.variable[scrID] = {};
                        };
                    };
                    $.extend(true, mService.containR.variable[scrID], obj);
                };
                mService.containR.variable[scrID.replace("_chat", "").replace("_list", "")].openChatScreen = false;
                mService.application.navigate("#" + scrID);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        loadTemplate: function (scrID, functionalMenuID, allowNewChat, success, failure) {
            var listTemplate,
            chatTemplate;
            try {
                if (mService.app.channel === "web") {
                    if ($("#" + scrID + "_container").length === 0) {
                        if ($("#msPatternQueryScreenTemplate").length === 0) {
                            mService.util.loadTemplate("query", "msPatternQuery");
                        };
                        screenTemplate = mService.config.template.getTransformedHtml("msPatternQueryScreenTemplate", {
                            id: scrID,
                            allowNewChat: allowNewChat
                        });
                        $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='" + functionalMenuID + "'] section div div").html(screenTemplate);
                        $("#" + scrID + "_chat_section").html(mService.config.template.getTransformedHtml("msPatternQueryChatTemplate", {
                                id: scrID
                            }));
                        $("#" + scrID + "_preview_section").html(mService.config.template.getTransformedHtml("msPatternQueryChatPreviewTemplate", {
                                id: scrID
                            }));
                        success();
                    } else {
                        $("#" + scrID + "_chat_section").html(mService.config.template.getTransformedHtml("msPatternQueryChatTemplate", {
                                id: scrID
                            }));
                        mService.pattern.query.util.loadCalls(scrID);
                    };
                    mService.spinner.hide();
                } else {
                    if (scrID.indexOf("_list") !== -1) {
                        if ($("#ms_pattern_query_list_screen_default_template").length === 0) {
                            mService.util.loadTemplate("query", "msPatternQueryList");
                        };
                        if ($("#" + scrID).length === 0) {
                            listTemplate = mService.config.template.getTransformedHtml("ms_pattern_query_list_screen_default_template", {
                                id: scrID.replace("_list", ""),
                                allowNewChat: (allowNewChat === undefined) ? ("false") : (allowNewChat)
                            });
                            $("body").append(listTemplate);
                        } else {
                            $("#" + scrID + "_main_page").html("");
                        }
                    } else {
                        if ($("#ms_pattern_query_chat_screen_default_template").length === 0) {
                            mService.util.loadTemplate("query", "msPatternQueryChat");
                        };
                        $("#" + scrID).remove();
                        chatTemplate = mService.config.template.getTransformedHtml("ms_pattern_query_chat_screen_default_template", {
                            id: scrID.replace("_chat", "")
                        });
                        $("body").append(chatTemplate);
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        refreshChatScreen: function (scrID, obj) {
            try {
                mService.spinner.show();
                $("#" + scrID + "_content_group").before('<div id="' + scrID + '_content"></div>').remove();
                $("#" + scrID + "_content").msChat({
                    scrid: scrID,
                    key: obj.key,
                    subKey: obj.subKey,
                    selectedRecord: obj.selectedRecord,
                    custom: {
                        transaction_type: "CALL"
                    }
                });
                mService.widgets.variable.msChat.variable[scrID + "_content"] = obj;
                mService.spinner.hide();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        refreshList: function (scrID, nData) {
            var callCheck,
            activeEle,
            activeEleID,
            data,
            index,
            tempItem;
            try {
                if (mService.app.channel === "web") {
                    callCheck = $.grep(mService.pattern.query.variable.dSource.data(), function (e, i) {
                        try {
                            return e.request_ref_no === nData.data.msgBody.custom.transaction_ref_no;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    if (callCheck.length > 0) {
                        data = JSON.parse(JSON.stringify(mService.pattern.query.variable.dSource.data()));
                        index = $.map(data, function (e, i) {
                            if (e.request_ref_no === nData.data.msgBody.custom.transaction_ref_no) {
                                return i;
                            }
                        })[0];
                        if (index !== undefined) {
                            activeEle = $("#" + scrID + "_container_list").find(".ms_pattern_query_list_active");
                            if (activeEle.length !== 0) {
                                activeEleID = $(activeEle).attr("id");
                            }
                            tempItem = data[index];
                            data.splice(index, 1);
                            data.unshift(tempItem);
                            mService.pattern.query.variable.dSource.data(data);
                            mService.pattern.query.util.addNotificationInd(scrID, nData.data.msgBody.custom.transaction_ref_no);
                            mService.pattern.query.util.showList(scrID);
                            setTimeout(function () {
                                try {
                                    if (!$("#" + nData.data.msgBody.custom.transaction_ref_no + "_notification_ind").is(":visible")) {
                                        $("#" + nData.data.msgBody.custom.transaction_ref_no + "_notification_ind").show();
                                    };
                                    if (activeEleID !== undefined) {
                                        $("#" + activeEleID).addClass("ms_pattern_query_list_active").removeClass("ms_pattern_query_list_normal");
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 10);
                        };
                    } else {
                        mService.pattern.query.util.loadCalls(scrID.replace("_chat", ""), "", true);
                    }
                } else {
                    callCheck = $.grep(mService.dSource.cache[scrID.replace("_chat", "") + "_list"].data(), function (e, i) {
                        try {
                            return e.request_ref_no === nData.additionalData.msgBody.custom.transaction_ref_no;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    if (callCheck.length > 0) {
                        data = JSON.parse(JSON.stringify(mService.dSource.cache[scrID.replace("_chat", "") + "_list"].data()));
                        index = $.map(data, function (e, i) {
                            if (e.request_ref_no === nData.additionalData.msgBody.custom.transaction_ref_no) {
                                return i;
                            }
                        })[0];
                        if (index !== undefined) {
                            tempItem = data[index];
                            data.splice(index, 1);
                            data.unshift(tempItem);
                            mService.dSource.cache[scrID.replace("_chat", "") + "_list"].data(data);
                            mService.pattern.query.util.addNotificationInd(scrID.replace("_list", "").replace("_chat", ""), nData.additionalData.msgBody.custom.transaction_ref_no);
                            if (refreshListInd !== undefined && refreshListInd) {
                                mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID + "_list", false, false);
                            }
                        };
                    } else {
                        mService.containR.variable[scrID].refreshList = true;
                    }
                }

            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        showList: function (scrID, activeInd, notificationInd) {
            var htmlContent,
            index;
            try {
                mService.config.template.get(scrID, function () {
                    var activeEle,
                    activeEleID;
                    try {
                        activeEle = $("#" + scrID + "_container_list").find(".ms_pattern_query_list_active");
                        if (activeEle.length !== 0) {
                            activeEleID = $(activeEle).attr("id");
                        }
                        htmlContent = "";
                        if (mService.pattern.query.variable.dSource.data().length > 0) {
                            for (index = 0; index < mService.pattern.query.variable.dSource.data().length; index++) {
                                htmlContent += kendo.template($("#" + scrID + "_list_template").html().replace(/\n/g, "").replace(/\t/g, ""))((mService.pattern.query.variable.dSource.data()[index] !== undefined) ? (mService.pattern.query.variable.dSource.data()[index]) : ({}));
                            }
                            $("#" + scrID + "_container_list").html(htmlContent);
                            if (activeInd !== undefined && activeInd !== "") {
                                $("#" + scrID + "_container_list").children().addClass("ms_pattern_query_list_normal").removeClass("ms_pattern_query_list_active");
                                $("#" + mService.pattern.query.variable.dSource.data()[0].request_ref_no + "_container").addClass("ms_pattern_query_list_active").removeClass("ms_pattern_query_list_normal");
                            } else {
                                if (activeEleID !== undefined && activeInd !== undefined && activeInd !== "") {
                                    $("#" + mService.pattern.query.variable.dSource.data()[0].request_ref_no + "_notification_ind").show();
                                    $("#" + activeEleID).addClass("ms_pattern_query_list_active").removeClass("ms_pattern_query_list_normal");
                                } else {
                                    if (notificationInd !== undefined && activeInd === "") {
                                        $("#" + mService.pattern.query.variable.dSource.data()[0].request_ref_no + "_notification_ind").show();
                                        $("#" + mService.pattern.query.variable.dSource.data()[0].request_ref_no + "_notification_count").text("1");
                                    }
                                }
                            };
                            mService.pattern.query.util.checkNotificationInd(scrID);
                        } else {
                            $("#" + scrID + "_container_list").html(kendo.template($("#" + scrID + "_list_empty_state_template").html().replace(/\n/g, "").replace(/\t/g, ""))({}));
                            mService.config.label.resolve();
                        }

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
                mService.spinner.hide();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        sendAttachmentsOnline: function (scrID, id, success, failure) {
            var attachedFiles,
            attachmentList = [],
            index,
            fileName;
            try {
                attachedFiles = mService.containR.pattern.form.util.getAttachmentData(scrID, false);
                if (attachedFiles.length > 0) {
                    for (index = 0; index < attachedFiles.length; index++) {
                        fileName = "ms_" + index + "_" + mService.util.date.getDateTimeString(mService.util.date.getNewDate(), "yyyy-MM-dd-HH-mm-ss-fff") + "." + attachedFiles[index].name.split('.').pop();
                        attachmentList.push({
                            filePath: attachedFiles[index].path + "/" + attachedFiles[index].name,
                            serverPath: "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey,
                            fileName: fileName
                        });
                        mService.widgets.variable.msChat.variable[id].attachments.push({
                            "name": fileName,
                            "type": attachedFiles[index].type,
                            "src": "msvMsg" + "\\\\" + "history" + "\\\\" + mService.app.id + "\\\\" + mService.widgets.variable.msChat.variable[id].key + "\\\\" + mService.widgets.variable.msChat.variable[id].subKey + "\\\\" + fileName,
                            "base64": ""
                        });
                    };
                    if (mService.app.channel === "web") {
                        attachedFiles[0].name = fileName;
                        mService.api.chat.sendAttachment(id, attachedFiles[0], function () {
                            mService.spinner.hide();
                            success();
                        }, function () {
                            try {
                                if (mService.app.channel === "web") {
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "msChat_attachment_error",
                                        lblgrpid: "error",
                                    });
                                } else {
                                    mService.app.showToast("msChat_attachment_error", "system_messages");
                                }
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        window.minterface("SendAttachmentToServer", attachmentList, function (src) {
                            try {
                                mService.spinner.hide();
                                success();
                            } catch (exception) {
                                mService.app.showToast("sendAttachmentToServer_error", "system_messages");
                                mService.exception.handle(exception);
                                mService.spinner.hide();
                                failure();
                            }
                        }, function (errorMsg) {
                            try {
                                mService.spinner.hide();
                                mService.app.showToast("msAttachment_file_upload_failure", "system_messages");
                                mService.exception.handle(errorMsg);
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    }
                } else {
                    success();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        submitForm: function (id) {
            var inputData,
            fileName,
            widgetList,
            widgetIndex,
            filesIndex,
            scrID;
            try {
                mService.spinner.show();
                scrID = mService.app.getScreenId();
                if (mService.containR.variable[((scrID.indexOf("_chat") === -1) ? (scrID + "_chat") : scrID)].validator[((scrID.indexOf("_chat") === -1) ? (scrID + "_chat") : scrID)].validate()) {
                    inputData = mService.containR.pattern.form.util.getInputparam(((scrID.indexOf("_chat") === -1) ? (scrID + "_chat") : scrID), {
                        scrID: ((scrID.indexOf("_chat") === -1) ? (scrID + "_chat") : scrID),
                        saveDetails: "true"
                    });
                    inputData = (inputData === undefined) ? ({}) : (inputData);
                    widgetList = $("#" + ((scrID.indexOf("_chat") === -1) ? (scrID + "_chat") : scrID)).find(mService.widgets.init.wSelector);
                    if (widgetList.length > 0) {
                        mService.pattern.query.util.sendAttachmentsOnline(((scrID.indexOf("_chat") === -1) ? (scrID + "_chat") : scrID), id, function () {
                            try {
                                mService.pattern.query.util.submitActionSheetMsg(inputData, id, scrID);
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
                    } else {
                        mService.pattern.query.util.submitActionSheetMsg(inputData, id, scrID);
                    }
                } else {
                    mService.spinner.hide();
                    if (mService.app.channel === "web") {
                        mService.app.alert("error", {
                            scrid: "",
                            lblid: "form_fields_mandatory_alert",
                            lblgrpid: "error",
                        });
                    } else {
                        mService.app.showToast("form_fields_mandatory_alert", scrID);
                    }
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        submitActionSheetMsg: function (inputData, id, scrID) {
            try {
                mService.widgets.variable.msChat.variable[id].custom = $.extend(true, mService.widgets.variable.msChat.variable[id].custom, inputData);
                mService.widgets.variable.msChat.variable[id].content = $("#" + id + "_action_form_submit_button").attr("ms_action_title");
                mService.widgets.variable.msChat.variable[id].msgType = "action";
                mService.widgets.variable.msChat.variable[id].actionPath = mService.widgets.variable.msChat.variable[id].actionPath + "/" + $("#" + id + "_action_form_submit_button").attr("ms_action_value");
                mService.widgets.init.util.msChat.setMsgFromDetails(id);
                mService.widgets.variable.msChat.variable[id].translations = "";
                mService.widgets.init.util.msChat.handleNotification(id, mService.widgets.init.util.msChat.getMsgBody(id), false, false, false, true);
                mService.widgets.variable.msChat.variable[id].to = [{
                        id: mService.app.getUserId(),
                    }
                ];
                if (mService.config.rule.executeRuleStatements({
                        screenID: scrID,
                        objectID: "button",
                        eventID: "click",
                        fieldID: scrID.replace("_chat", "") + "_" + ($("#" + id + "_action_form_submit_button").attr("ms_action_value")).replace("@", "")
                    })) {
                    mService.widgets.event.msChat.closeActionFormContainer(id);
                    mService.widgets.init.util.msChat.updateChatHistory(id, function () {
                        try {
                            mService.widgets.variable.msChat.variable[id].to = "";
                            mService.widgets.variable.msChat.variable[id].followup = "";
                            mService.widgets.init.util.msChat.sendMessageToServer(id, function (msgbody) {
                                mService.spinner.hide();
                                mService.containR.pattern.form.util.addDataSource(scrID, function () {
                                    try {
                                        if (mService.app.channel === "web") {
                                            mService.pattern.query.util.updateCallStatus(id, mService.app.getScreenId());
                                        };
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                                return true;
                            }, function () {
                                return true;
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.spinner.hide();
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    mService.spinner.hide();
                    mService.app.showToast("form_rule_execution_error", scrID);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        updateCallStatus: function (id, scrID) {
            try {
                if (mService.widgets.variable.msChat.variable[id].custom !== undefined && mService.widgets.variable.msChat.variable[id].custom.transaction_ref_no !== undefined) {
                    mService.pattern.query.util.getCallDetails(scrID.replace("chat", "") + "_list", mService.widgets.variable.msChat.variable[id].custom.transaction_ref_no, function (result) {
                        var callItem,
                        index;
                        try {
                            if (result === "internet_not_available") {
                                return false;
                            } else {
                                callItem = $.grep(mService.pattern.query.variable.dSource.data(), function (e, i) {
                                    try {
                                        return (e.request_ref_no === mService.widgets.variable.msChat.variable[id].custom.transaction_ref_no)
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                })[0];
                                index = mService.pattern.query.variable.dSource.indexOf(callItem);
                                mService.pattern.query.variable.dSource.data()[index] = result;
                                mService.pattern.query.util.showList(scrID, true);
                                $("#" + scrID + "_container_list").children().addClass("ms_pattern_query_list_normal").removeClass("ms_pattern_query_list_active");
                                $("#" + callItem.request_ref_no + "_container").addClass("ms_pattern_query_list_active").removeClass("ms_pattern_query_list_normal");
                            };
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    variable: {
        dSource: ""
    }
};