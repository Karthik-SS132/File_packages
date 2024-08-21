var calldb = {
    page: {
        beforeShow: function () {
            try {
                if ($("#calldb_container").length === 0) {
                    $.ajax({
                        url: "www/content/calldb.html",
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
                calldb.customHandler.loadCalls();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        init: function () {
            try {
                console.log("calldb init");
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        show: function () {
            try {
                console.log("calldb show");
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        afterShow: function () {
            try {
                console.log("calldb afterShow");
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
                $("#calldb_history_attachment_viewer_no_data_" + dataParam.uid).hide();
                $("#calldb_history_attachment_viewer_" + dataParam.uid).html("");
                if (dataParam.dataDocType === "I") {
                    $("#calldb_history_attachment_viewer_" + dataParam.uid).msImageviewer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "A") {
                    $("#calldb_history_attachment_viewer_" + dataParam.uid).msAudioplayer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "V") {
                    $("#calldb_history_attachment_viewer_" + dataParam.uid).msVideoplayer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "P") {
                    $("#calldb_history_attachment_viewer_" + dataParam.uid).msPdfviewer({
                        source: dataParam.dataDocSrc
                    });
                }
            },
            machine_history_click: function (ele) {
                var selectedRecord;
                selectedRecord = calldb.variable.dSource.getByUid($(ele).attr("data-ms-containr-param"));
                if ($("#calldb_history_popup").data("kendoWindow") === undefined) {
                    $("#calldb_history_popup").kendoWindow({
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
                    $("#calldb_history_popup").html("");
                }
                $("#calldb_history_popup").data("kendoWindow").title("Machine Life - " + selectedRecord.asset_id + " - " + "[" + selectedRecord.equipment_category + " / " + selectedRecord.equipment_type + " / " + selectedRecord.equipment_id + "]");
                $("#calldb_history_popup").data("kendoWindow").open().center();
                $("#calldb_history_popup").html(kendo.template($("#calldb_history_popup_template").html().replace(/\n/g, "").replace(/\t/g, ""))({}));
                mService.dSource.retrieveCustomInfoDetail({
                    code: "'machine_life'",
                    refNo1: "'" + selectedRecord.asset_id + "'"
                }, function (data) {
                    try {
                        $("#calldb_history_popup_header").html(kendo.template($("#calldb_history_popup_header_content_template").html().replace(/\n/g, "").replace(/\t/g, ""))(data.header));

                        $("#calldb_history_popup_header_timeline").msTimeline({
                            scrid: "calldb",
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "calldb_history_popup_header_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal",
                            dateformat: "dd MMM yyyy"
                        });
                        $("#calldb_history_popup_header_timeline").setDataSource(data.detail);
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
                calldb.button.misc.chat_click(ele);
            },
            chat_click: function (ele, nData) {
                var subKey = "",
                paramObj,
                additionalInput;
                if (nData !== undefined) {
                    mService.widgets.variable.msChat.variable["calldb_chat_popup_content"] = nData.data.msgBody;
                    subKey = nData.data.msgBody.subKey;
                };
                if (ele !== "") {
                    if ($(ele).attr("data-ms-containr-param") !== undefined) {
                        paramObj = JSON.parse($(ele).attr("data-ms-containr-param"));
                        subKey = paramObj.subkey;
                        additionalInput = paramObj.additional_input;
                    }
                };
                if (subKey !== "") {
                    calldb.variable.refreshList = false;
                } else {
                    calldb.variable.refreshList = true;
                };

                if ($("#calldb_chat_popup").data("kendoWindow") === undefined) {
                    $("#calldb_chat_popup").kendoWindow({
                        width: ($(window).width() * 40) / (100),
                        height: ($(window).height() * 90) / (100),
                        title: {
                            text: "Log a Complaint",
                            encoded: false
                        },
                        close: function () {
                            try {
                                setTimeout(function () {
                                    try {
                                        $("#calldb_chat_popup_attachment_view_content").html("");
                                        $("#calldb_chat_popup_attachment_view").hide();
                                        var dialog1 = $("#calldb_chat_popup").data("kendoWindow");
                                        if (calldb.variable.refreshList) {
                                            calldb.customHandler.loadCalls();
                                        }
                                        dialog1.setOptions({
                                            width: ($(window).width() * 40) / (100)
                                        });
                                        setTimeout(function () {
                                            try {
                                                $("#calldb_chat_popup").data("kendoWindow").center();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, 100);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, 10);

                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        draggable: false,
                        modal: true,
                        resizable: false,
                        visible: false
                    });
                } else {
                    $("#calldb_chat_popup").data("kendoWindow").setOptions({
                        title: {
                            text: "Log a Complaint",
                            encoded: false
                        }
                    });
                    $("#calldb_chat_popup").html("");
                }
                if (ele !== "") {
                    if ($(ele).attr("data-ms-containr-param") !== undefined) {
                        $("#calldb_chat_popup").data("kendoWindow").setOptions({
                            title: {
                                text: paramObj.call_no,
                                encoded: false
                            }
                        });
                    }
                };
                $("#calldb_chat_popup").html(mService.config.template.getTransformedHtml("mschat_popup_content_template", ({
                            scrID: "calldb_chat"
                        })));
                $("#calldb_chat_popup").data("kendoWindow").open().center();
                $("#calldb_chat_popup_content").msChat({
                    scrid: "calldb_chat",
                    key: "calldb",
                    subKey: subKey,
                    callDetails: ($(ele).attr("data-ms-containr-param") !== undefined) ? (paramObj) : "",
                    additionalInput: additionalInput
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
                    problemDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = calldb.variable.selectedRecord["problem_description_" + mService.user.profile.login.locale_id];
                    problemDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = calldb.variable.selectedRecord["problem_description_" + mService.user.profile.login.default_locale_id];
                    additionalDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = calldb.variable.selectedRecord["addn_desc_" + mService.user.profile.login.locale_id];
                    additionalDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = calldb.variable.selectedRecord["addn_desc_" + mService.user.profile.login.default_locale_id];
                    mService.config.ui.render("calldb_" + catalogID + "_actions_detail_view", "crud_edit");
                    $("#calldb_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                            buttonRegion: "edit"
                        }));
                    $("#calldb_" + catalogID + "_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    $("#calldb_edit_customer_contact_name").setVal(calldb.variable.selectedRecord.cust_contact_name);
                    $("#calldb_edit_customer_contact_number").setVal(calldb.variable.selectedRecord.cust_contact_no);
                    $("#calldb_edit_customer_contact_email").setVal(calldb.variable.selectedRecord.cust_contact_email_id);
                    $("#calldb_edit_customer_name").setVal(calldb.variable.selectedRecord.customer_name);
                    $("#calldb_edit_customer_id").setVal(calldb.variable.selectedRecord.customer_id);
                    $("#calldb_edit_equipment_id").setVal(calldb.variable.selectedRecord.equipment_id);
                    $("#calldb_edit_asset_id").setVal(calldb.variable.selectedRecord.asset_id);
                    $("#calldb_edit_udf_char_1").setVal(calldb.variable.selectedRecord.udf_char_1);
                    $("#calldb_edit_udf_char_2").setVal(calldb.variable.selectedRecord.udf_char_2);
                    $("#calldb_edit_asset_location").setVal(calldb.variable.selectedRecord.asset_loc_reported);
                    $("#calldb_edit_call_type").setVal(calldb.variable.selectedRecord.call_type);
                    $("#calldb_edit_call_priority").setVal(calldb.variable.selectedRecord.priority_cd);
                    $("#calldb_edit_problem_description").setVal(problemDescVal);
                    $("#calldb_edit_additional_information").setVal(additionalDescVal);
                    calldb.variable.validator = mService.config.rule.apply("calldb_" + catalogID + "_actions_detail_view");
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            retrieve_click: function () {
                try {
                    calldb.variable.selectedRecord = null;
                    calldb.customHandler.refreshListView();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        wflow_click: function (ele, evt) {
            var catalogID;
            try {
                catalogID = mService.page.navigation.get.pageCatalogID();
                calldb.variable.selectedEventverb = ele.attr("data-ms-wflow-eventverb");
                calldb.variable.selectedToStage = ele.attr("data-ms-wflow-tostage");
                calldb.variable.selectedToStatus = ele.attr("data-ms-wflow-tostatus");
                mService.config.ui.render("calldb_" + catalogID + "_actions_detail_view", "workflow_" + calldb.variable.selectedEventverb);
                $("#calldb_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                        buttonRegion: "wflow"
                    }));
                $("#calldb_" + catalogID + "_actions_detail_view_action_bar").html("");
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
                        calldb.customHandler.addSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "edit") {
                        calldb.customHandler.editSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "wflow") {
                        calldb.customHandler.wflowSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "attachment") {
                        mService.home.userAttachment.submitAttachment("CALL", calldb.variable.selectedRecord.call_no);
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
                        calldb.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
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
                    mService.config.ui.render("calldb_add_actions_detail_view", "crud_add");
                    $("#calldb_add_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                            buttonRegion: "add"
                        }));
                    $("#calldb_add_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    calldb.variable.validator = mService.config.rule.apply("calldb_add_actions_detail_view");
                    if (mService.home.customerContactInfo.customerName !== "") {
                        $("#calldb_add_customer_name").setVal(mService.home.customerContactInfo.customerName);
                    };
                    if (mService.home.customerContactInfo.contactName !== "") {
                        $("#calldb_add_customer_contact_name").setVal(mService.home.customerContactInfo.contactName);
                    };
                    if (mService.home.customerContactInfo.contactNumber !== "") {
                        $("#calldb_add_customer_contact_number").setVal(mService.home.customerContactInfo.contactNumber);
                    };
                    if (mService.home.customerContactInfo.contactEmail !== "") {
                        $("#calldb_add_customer_contact_email").setVal(mService.home.customerContactInfo.contactEmail);
                    };
                    if (mService.home.customerContactInfo.customerID !== "") {
                        $("#calldb_add_customer_id").setVal(mService.home.customerContactInfo.customerID);
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        open: {
            select: function () {
                try {
                    $("#calldb_open_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#calldb_open_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        calldb.variable.selectedRecord = $("#calldb_open_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!calldb.msPageCatalogRefresh) {
                                            calldb.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + calldb.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    calldb.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (calldb.variable.selectedRecord !== null) {
                        $("#calldb_open_actions_detail_view").html(mService.config.template.getTransformedHtml("calldb_open_detail_view_template", calldb.variable.selectedRecord));
                        calldb.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = "";
                                if (calldb.variable.selectedRecord.call_status === "OD" || calldb.variable.selectedRecord.call_status === "O") {
                                    html = mService.config.template.getTransformedHtml("home_crud_action_bar_template", {
                                        scrID: "calldb",
                                        crudName: "edit",
                                        buttonRegion: ""
                                    });
                                };
                                html += calldb.customHandler.getActionBarHtml(data);
                                $("#calldb_open_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#calldb_open_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#calldb_open_actions_detail_view_action_bar").html("");
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
                    if (calldb.variable.selectedRecord !== null) {
                        $("#calldb_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("calldb_open_timeline_detail_view_template", calldb.variable.selectedRecord));
                        $("#calldb_open_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "calldb_open_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": calldb.variable.selectedRecord.call_no,
                                "call_category": calldb.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#calldb_open_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#calldb_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
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
                    if (calldb.variable.selectedRecord !== null) {
                        $("#calldb_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("calldb_open_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": calldb.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: calldb.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#calldb_open_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#calldb_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        closed: {
            select: function () {
                try {
                    $("#calldb_closed_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#calldb_closed_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        calldb.variable.selectedRecord = $("#calldb_closed_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!calldb.msPageCatalogRefresh) {
                                            calldb.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + calldb.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    calldb.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (calldb.variable.selectedRecord !== null) {
                        $("#calldb_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("calldb_closed_detail_view_template", calldb.variable.selectedRecord));
                        calldb.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = calldb.customHandler.getActionBarHtml(data);
                                $("#calldb_closed_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#calldb_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#calldb_closed_actions_detail_view_action_bar").html("");
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
                    if (calldb.variable.selectedRecord !== null) {
                        $("#calldb_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("calldb_closed_timeline_detail_view_template", calldb.variable.selectedRecord));
                        $("#calldb_closed_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "calldb_closed_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": calldb.variable.selectedRecord.call_no,
                                "call_category": calldb.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#calldb_closed_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#calldb_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
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
                    if (calldb.variable.selectedRecord !== null) {
                        $("#calldb_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("calldb_closed_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": calldb.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: calldb.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#calldb_closed_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#calldb_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
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
                if (calldb.variable.validator.validate()) {
                    var problemDescXml,
                    additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#calldb_add_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#calldb_add_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#calldb_add_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#calldb_add_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
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
                                    p_customer_id: $("#calldb_add_customer_id").getVal(),
                                    p_asset_id: $("#calldb_add_asset_id").getVal(),
                                    p_asset_location_reported: $("#calldb_add_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#calldb_add_call_priority").getVal(),
                                    p_customer_contact_name: $("#calldb_add_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: (calldb.variable.customerInfoCustomerLocationCode !== undefined) ? (calldb.variable.customerInfoCustomerLocationCode) : ("ZZZ"),
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: mService.user.profile.login.org_lvl_no,
                                    p_organogram_level_code: mService.user.profile.login.org_lvl_code,
                                    p_call_category: calldb.variable.callCategory,
                                    p_call_type: $("#calldb_add_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#calldb_add_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#calldb_add_customer_contact_email").getVal(),
                                    p_equipment_id: $("#calldb_add_equipment_id").getVal(),
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
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#calldb_add_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#calldb_add_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#calldb_add_udf_char_2").getVal() + "</udf_char_2></inputparam>",
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
                                calldb.customHandler.resetAddCatalogFields();
                                calldb.msPageValueChanged = false;
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
                if (calldb.variable.validator.validate()) {
                    var problemDescXml,
                    additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#calldb_edit_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#calldb_edit_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#calldb_edit_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#calldb_edit_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
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
                                    p_customer_id: $("#calldb_edit_customer_id").getVal(),
                                    p_asset_id: $("#calldb_edit_asset_id").getVal(),
                                    p_asset_location_reported: $("#calldb_edit_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#calldb_edit_call_priority").getVal(),
                                    p_customer_contact_name: $("#calldb_edit_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: calldb.variable.selectedRecord.cust_location_code,
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: calldb.variable.selectedRecord.org_level_no,
                                    p_organogram_level_code: calldb.variable.selectedRecord.org_level_code,
                                    p_call_category: calldb.variable.selectedRecord.call_category,
                                    p_call_type: $("#calldb_edit_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#calldb_edit_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#calldb_edit_customer_contact_email").getVal(),
                                    p_equipment_id: $("#calldb_edit_equipment_id").getVal(),
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
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#calldb_edit_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#calldb_edit_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#calldb_edit_udf_char_2").getVal() + "</udf_char_2></inputparam>",
                                    p_rec_timestamp: "00000000-0000-0000-0000-000000000000",
                                    p_save_mode: "U"
                                },
                                "outputparam": {
                                    "p_service_call_ref_no": calldb.variable.selectedRecord.call_no
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
                                calldb.msPageValueChanged = false;
                                calldb.customHandler.refreshListView();
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
                                p_call_ref_no: calldb.variable.selectedRecord.call_no,
                                p_wfeventverb_id: calldb.variable.selectedEventverb,
                                p_event_date: kendo.toString((new Date()), "yyyy-MM-dd"),
                                p_event_hour: kendo.toString((new Date()), "HH"),
                                p_event_minute: kendo.toString((new Date()), "mm"),
                                p_from_wf_stage_no: calldb.variable.selectedRecord.call_wf_stage,
                                p_to_wf_stage_no: calldb.variable.selectedToStage,
                                p_from_wf_status: calldb.variable.selectedRecord.call_status,
                                p_to_wf_status: calldb.variable.selectedToStatus,
                                p_channel_id: "WEB",
                                p_by_employee_id: mService.user.profile.login.employee_id,
                                p_to_employee_id_string: "",
                                p_reason_code: "",
                                p_comments: $("#calldb_workflow_comments").getVal(),
                                p_lattitude_value: "",
                                p_longitude_value: "",
                                p_attachment_xml: "",
                                p_inputparam_xml1: "",
                                p_inputparam_xml2: "",
                                p_inputparam_xml3: "",
                                p_rec_tstamp: calldb.variable.selectedRecord.rec_tstamp,
                                p_save_mode: "A"
                            }
                        }
                    }),
                    success: function (response) {
                        try {
                            if (response.document === undefined) {
                                mService.app.alert("success", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + calldb.variable.selectedEventverb,
                                    lblgrpid: "success"
                                });
                                calldb.msPageValueChanged = false;
                                calldb.customHandler.refreshListView();
                            } else {
                                mService.app.alert("error", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + calldb.variable.selectedEventverb,
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
                                lblid: "call_" + calldb.variable.selectedEventverb,
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
                    eventVerbs[index].scrID = "calldb";
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
                        "call_category": calldb.variable.callCategory,
                    }) + "'",
                    record: calldb.variable.selectedRecord
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
                $("#calldb_add_call_type").setVal("");
                $("#calldb_add_customer_id").setVal("");
                $("#calldb_add_equipment_id").setVal("");
                $("#calldb_add_asset_id").setVal("");
                $("#calldb_add_udf_char_1").setVal("");
                $("#calldb_add_udf_char_2").setVal("");
                $("#calldb_add_asset_location").setVal("");
                $("#calldb_add_problem_description").setVal("");
                $("#calldb_add_additional_information").setVal("");
                $("#calldb_add_customer_contact_name").setVal("");
                $("#calldb_add_customer_contact_number").setVal("");
                $("#calldb_add_customer_contact_email").setVal("");
                $("#calldb_add_customer_name").setVal("");
                $("#calldb_add_call_priority").setVal("");
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
                listView = $("#calldb_" + catalogID + "_list_view").data("kendoListView");
                dSource = mService.dSource.getSource({
                    code: "'call_register'",
                    inputXml: "'" + JSON.stringify({
                        "call_category": calldb.variable.callCategory,
                        "list_type": catalogID.toUpperCase(),
                        "search_string": $("#calldb_" + catalogID + "_list_search_box").val()
                    }) + "'"
                });
                dSource.read().then(function () {
                    var selectedItem;
                    try {
                        listView.dataSource.data(dSource.data());
                        if (calldb.variable.selectedRecord !== null) {
                            selectedItem = $.grep(listView.dataSource.data(), function (e, i) {
                                try {
                                    return e.call_no === calldb.variable.selectedRecord.call_no;
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
                            calldb.variable.selectedRecord = null;
                            calldb.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        loadCalls: function () {
            calldb.variable.dSource = mService.dSource.getSource({
                code: "'my_calls'",
                inputXml: "'" + JSON.stringify({
                    "list_type": "CALLDB",
                    "visitor_id": mService.visitor.profile.login.visitor_id
                }) + "'"
            });
            calldb.variable.dSource.read().then(function () {
                var htmlContent;
                try {
                    htmlContent = "";
                    for (let index = 0; index < calldb.variable.dSource.data().length; index++) {
                        htmlContent += kendo.template($("#calldb_list_template").html().replace(/\n/g, "").replace(/\t/g, ""))((calldb.variable.dSource.data()[index] !== undefined) ? (calldb.variable.dSource.data()[index]) : ({}));
                    }
                    $("#calldb_container_list").html(htmlContent);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        }
    },
    widget: {
        change: {
            add_customer_id: function () {
                try {
                    $("#calldb_add_equipment_id").setVal("");
                    $("#calldb_add_asset_id").setVal("");
                    $("#calldb_add_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                            code: "'equipment_id'",
                            inputXml: "'" + JSON.stringify({
                                "customer_id": $("#calldb_add_customer_id").getVal()
                            }) + "'"
                        }));
                    $("#calldb_add_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                            code: "'asset_id'",
                            inputXml: "'" + JSON.stringify({
                                "customer_id": $("#calldb_add_customer_id").getVal()
                            }) + "'"
                        }));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            edit_customer_id: function () {
                try {
                    $("#calldb_edit_equipment_id").setVal("");
                    $("#calldb_edit_asset_id").setVal("");
                    $("#calldb_edit_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                            code: "'equipment_id'",
                            inputXml: "'" + JSON.stringify({
                                "customer_id": $("#calldb_edit_customer_id").getVal()
                            }) + "'"
                        }));
                    $("#calldb_edit_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                            code: "'asset_id'",
                            inputXml: "'" + JSON.stringify({
                                "customer_id": $("#calldb_edit_customer_id").getVal()
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
