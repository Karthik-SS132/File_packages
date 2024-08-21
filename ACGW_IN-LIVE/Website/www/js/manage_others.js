var manage_others = {
    page: {
        beforeShow: function () {
            try {
                return true;
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
        crud: {
            edit_click: function () {
                var catalogID,
                problemDescVal,
                additionalDescVal;
                try {
                    catalogID = mService.page.navigation.get.pageCatalogID();
                    problemDescVal = {};
                    additionalDescVal = {};
                    problemDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = manage_others.variable.selectedRecord["problem_description_" + mService.user.profile.login.locale_id];
                    problemDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = manage_others.variable.selectedRecord["problem_description_" + mService.user.profile.login.default_locale_id];
                    additionalDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = manage_others.variable.selectedRecord["addn_desc_" + mService.user.profile.login.locale_id];
                    additionalDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = manage_others.variable.selectedRecord["addn_desc_" + mService.user.profile.login.default_locale_id];
                    mService.config.ui.render("manage_others_" + catalogID + "_actions_detail_view", "crud_edit");
                    $("#manage_others_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                            buttonRegion: "edit"
                        }));
                    $("#manage_others_" + catalogID + "_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    $("#manage_others_edit_customer_contact_name").setVal(manage_others.variable.selectedRecord.cust_contact_name);
                    $("#manage_others_edit_customer_contact_number").setVal(manage_others.variable.selectedRecord.cust_contact_no);
                    $("#manage_others_edit_customer_contact_email").setVal(manage_others.variable.selectedRecord.cust_contact_email_id);
                    $("#manage_others_edit_customer_name").setVal(manage_others.variable.selectedRecord.customer_name);
                    $("#manage_others_edit_customer_id").setVal(manage_others.variable.selectedRecord.customer_id);
                    $("#manage_others_edit_equipment_id").setVal(manage_others.variable.selectedRecord.equipment_id);
                    $("#manage_others_edit_asset_id").setVal(manage_others.variable.selectedRecord.asset_id);
                    $("#manage_others_edit_udf_char_1").setVal(manage_others.variable.selectedRecord.udf_char_1);
                    $("#manage_others_edit_udf_char_2").setVal(manage_others.variable.selectedRecord.udf_char_2);
                    $("#manage_others_edit_asset_location").setVal(manage_others.variable.selectedRecord.asset_loc_reported);
                    $("#manage_others_edit_call_type").setVal(manage_others.variable.selectedRecord.call_type);
                    $("#manage_others_edit_call_priority").setVal(manage_others.variable.selectedRecord.priority_cd);
                    $("#manage_others_edit_problem_description").setVal(problemDescVal);
                    $("#manage_others_edit_additional_information").setVal(additionalDescVal);
                    manage_others.variable.validator = mService.config.rule.apply("manage_others_" + catalogID + "_actions_detail_view");
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            retrieve_click: function () {
                try {
                    manage_others.variable.selectedRecord = null;
                    manage_others.customHandler.refreshListView();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        wflow_click: function (ele, evt) {
            var catalogID;
            try {
                catalogID = mService.page.navigation.get.pageCatalogID();
                manage_others.variable.selectedEventverb = ele.attr("data-ms-wflow-eventverb");
                manage_others.variable.selectedToStage = ele.attr("data-ms-wflow-tostage");
                manage_others.variable.selectedToStatus = ele.attr("data-ms-wflow-tostatus");
                mService.config.ui.render("manage_others_" + catalogID + "_actions_detail_view", "workflow_" + manage_others.variable.selectedEventverb);
                $("#manage_others_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                        buttonRegion: "wflow"
                    }));
                $("#manage_others_" + catalogID + "_actions_detail_view_action_bar").html("");
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
                        manage_others.customHandler.addSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "edit") {
                        manage_others.customHandler.editSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "wflow") {
                        manage_others.customHandler.wflowSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "attachment") {
                        mService.home.userAttachment.submitAttachment("CALL", manage_others.variable.selectedRecord.call_no);
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
                        manage_others.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
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
                    mService.config.ui.render("manage_others_add_actions_detail_view", "crud_add");
                    $("#manage_others_add_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                            buttonRegion: "add"
                        }));
                    $("#manage_others_add_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    manage_others.variable.validator = mService.config.rule.apply("manage_others_add_actions_detail_view");
                    if (mService.home.customerContactInfo.customerName !== "") {
                        $("#manage_others_add_customer_name").setVal(mService.home.customerContactInfo.customerName);
                    };
                    if (mService.home.customerContactInfo.contactName !== "") {
                        $("#manage_others_add_customer_contact_name").setVal(mService.home.customerContactInfo.contactName);
                    };
                    if (mService.home.customerContactInfo.contactNumber !== "") {
                        $("#manage_others_add_customer_contact_number").setVal(mService.home.customerContactInfo.contactNumber);
                    };
                    if (mService.home.customerContactInfo.contactEmail !== "") {
                        $("#manage_others_add_customer_contact_email").setVal(mService.home.customerContactInfo.contactEmail);
                    };
                    if (mService.home.customerContactInfo.customerID !== "") {
                        $("#manage_others_add_customer_id").setVal(mService.home.customerContactInfo.customerID);
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        open: {
            select: function () {
                try {
                    $("#manage_others_open_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#manage_others_open_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        manage_others.variable.selectedRecord = $("#manage_others_open_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!manage_others.msPageCatalogRefresh) {
                                            manage_others.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + manage_others.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    manage_others.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (manage_others.variable.selectedRecord !== null) {
                        $("#manage_others_open_actions_detail_view").html(mService.config.template.getTransformedHtml("manage_others_open_detail_view_template", manage_others.variable.selectedRecord));
                        manage_others.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = "";
                                if (manage_others.variable.selectedRecord.call_status === "OD" || manage_others.variable.selectedRecord.call_status === "O") {
                                    html = mService.config.template.getTransformedHtml("home_crud_action_bar_template", {
                                        scrID: "manage_others",
                                        crudName: "edit",
                                        buttonRegion: ""
                                    });
                                };
                                html += manage_others.customHandler.getActionBarHtml(data);
                                $("#manage_others_open_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#manage_others_open_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#manage_others_open_actions_detail_view_action_bar").html("");
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
                    if (manage_others.variable.selectedRecord !== null) {
                        $("#manage_others_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("manage_others_open_timeline_detail_view_template", manage_others.variable.selectedRecord));
                        $("#manage_others_open_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "manage_others_open_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": manage_others.variable.selectedRecord.call_no,
                                "call_category": manage_others.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#manage_others_open_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#manage_others_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
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
                    if (manage_others.variable.selectedRecord !== null) {
                        $("#manage_others_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("manage_others_open_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": manage_others.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: manage_others.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#manage_others_open_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#manage_others_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        closed: {
            select: function () {
                try {
                    $("#manage_others_closed_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#manage_others_closed_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        manage_others.variable.selectedRecord = $("#manage_others_closed_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!manage_others.msPageCatalogRefresh) {
                                            manage_others.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + manage_others.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    manage_others.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (manage_others.variable.selectedRecord !== null) {
                        $("#manage_others_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("manage_others_closed_detail_view_template", manage_others.variable.selectedRecord));
                        manage_others.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = manage_others.customHandler.getActionBarHtml(data);
                                $("#manage_others_closed_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#manage_others_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#manage_others_closed_actions_detail_view_action_bar").html("");
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
                    if (manage_others.variable.selectedRecord !== null) {
                        $("#manage_others_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("manage_others_closed_timeline_detail_view_template", manage_others.variable.selectedRecord));
                        $("#manage_others_closed_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "manage_others_closed_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": manage_others.variable.selectedRecord.call_no,
                                "call_category": manage_others.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#manage_others_closed_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#manage_others_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
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
                    if (manage_others.variable.selectedRecord !== null) {
                        $("#manage_others_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("manage_others_closed_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": manage_others.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: manage_others.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#manage_others_closed_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#manage_others_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
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
                if (manage_others.variable.validator.validate()) {
                    var problemDescXml,
                    additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#manage_others_add_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#manage_others_add_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#manage_others_add_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#manage_others_add_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
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
                                    p_customer_id: $("#manage_others_add_customer_id").getVal(),
                                    p_asset_id: $("#manage_others_add_asset_id").getVal(),
                                    p_asset_location_reported: $("#manage_others_add_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#manage_others_add_call_priority").getVal(),
                                    p_customer_contact_name: $("#manage_others_add_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: (manage_others.variable.customerInfoCustomerLocationCode !== undefined) ? (manage_others.variable.customerInfoCustomerLocationCode) : ("ZZZ"),
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: mService.user.profile.login.org_lvl_no,
                                    p_organogram_level_code: mService.user.profile.login.org_lvl_code,
                                    p_call_category: manage_others.variable.callCategory,
                                    p_call_type: $("#manage_others_add_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#manage_others_add_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#manage_others_add_customer_contact_email").getVal(),
                                    p_equipment_id: $("#manage_others_add_equipment_id").getVal(),
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
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#manage_others_add_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#manage_others_add_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#manage_others_add_udf_char_2").getVal() + "</udf_char_2></inputparam>",
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
                                manage_others.customHandler.resetAddCatalogFields();
                                manage_others.msPageValueChanged = false;
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
                if (manage_others.variable.validator.validate()) {
                    var problemDescXml,
                    additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#manage_others_edit_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#manage_others_edit_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#manage_others_edit_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#manage_others_edit_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
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
                                    p_customer_id: $("#manage_others_edit_customer_id").getVal(),
                                    p_asset_id: $("#manage_others_edit_asset_id").getVal(),
                                    p_asset_location_reported: $("#manage_others_edit_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#manage_others_edit_call_priority").getVal(),
                                    p_customer_contact_name: $("#manage_others_edit_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: manage_others.variable.selectedRecord.cust_location_code,
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: manage_others.variable.selectedRecord.org_level_no,
                                    p_organogram_level_code: manage_others.variable.selectedRecord.org_level_code,
                                    p_call_category: manage_others.variable.selectedRecord.call_category,
                                    p_call_type: $("#manage_others_edit_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#manage_others_edit_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#manage_others_edit_customer_contact_email").getVal(),
                                    p_equipment_id: $("#manage_others_edit_equipment_id").getVal(),
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
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#manage_others_edit_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#manage_others_edit_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#manage_others_edit_udf_char_2").getVal() + "</udf_char_2></inputparam>",
                                    p_rec_timestamp: "00000000-0000-0000-0000-000000000000",
                                    p_save_mode: "U"
                                },
                                "outputparam": {
                                    "p_service_call_ref_no": manage_others.variable.selectedRecord.call_no
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
                                manage_others.msPageValueChanged = false;
                                manage_others.customHandler.refreshListView();
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
                                p_call_ref_no: manage_others.variable.selectedRecord.call_no,
                                p_wfeventverb_id: manage_others.variable.selectedEventverb,
                                p_event_date: kendo.toString((new Date()), "yyyy-MM-dd"),
                                p_event_hour: kendo.toString((new Date()), "HH"),
                                p_event_minute: kendo.toString((new Date()), "mm"),
                                p_from_wf_stage_no: manage_others.variable.selectedRecord.call_wf_stage,
                                p_to_wf_stage_no: manage_others.variable.selectedToStage,
                                p_from_wf_status: manage_others.variable.selectedRecord.call_status,
                                p_to_wf_status: manage_others.variable.selectedToStatus,
                                p_channel_id: "WEB",
                                p_by_employee_id: mService.user.profile.login.employee_id,
                                p_to_employee_id_string: "",
                                p_reason_code: "",
                                p_comments: $("#manage_others_workflow_comments").getVal(),
                                p_lattitude_value: "",
                                p_longitude_value: "",
                                p_attachment_xml: "",
                                p_inputparam_xml1: "",
                                p_inputparam_xml2: "",
                                p_inputparam_xml3: "",
                                p_rec_tstamp: manage_others.variable.selectedRecord.rec_tstamp,
                                p_save_mode: "A"
                            }
                        }
                    }),
                    success: function (response) {
                        try {
                            if (response.document === undefined) {
                                mService.app.alert("success", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + manage_others.variable.selectedEventverb,
                                    lblgrpid: "success"
                                });
                                manage_others.msPageValueChanged = false;
                                manage_others.customHandler.refreshListView();
                            } else {
                                mService.app.alert("error", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + manage_others.variable.selectedEventverb,
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
                                lblid: "call_" + manage_others.variable.selectedEventverb,
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
                    eventVerbs[index].scrID = "manage_others";
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
                                "call_category": manage_service_call.variable.callCategory,
                            }) +"'",
                    record: manage_others.variable.selectedRecord
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
                $("#manage_others_add_call_type").setVal("");
                $("#manage_others_add_customer_id").setVal("");
                $("#manage_others_add_equipment_id").setVal("");
                $("#manage_others_add_asset_id").setVal("");
                $("#manage_others_add_udf_char_1").setVal("");
                $("#manage_others_add_udf_char_2").setVal("");
                $("#manage_others_add_asset_location").setVal("");
                $("#manage_others_add_problem_description").setVal("");
                $("#manage_others_add_additional_information").setVal("");
                $("#manage_others_add_customer_contact_name").setVal("");
                $("#manage_others_add_customer_contact_number").setVal("");
                $("#manage_others_add_customer_contact_email").setVal("");
                $("#manage_others_add_customer_name").setVal("");
                $("##manage_others_add_call_priority").setVal("");
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
                listView = $("#manage_others_" + catalogID + "_list_view").data("kendoListView");
                dSource = mService.dSource.getSource({
                    code: "'call_register'",
                    inputXml: "'" + JSON.stringify({
                        "call_category": manage_others.variable.callCategory,
                        "list_type": catalogID.toUpperCase(),
                        "search_string": $("#manage_others_" + catalogID + "_list_search_box").val()
                    }) + "'"
                });
                dSource.read().then(function () {
                    var selectedItem;
                    try {
                        listView.dataSource.data(dSource.data());
                        if (manage_others.variable.selectedRecord !== null) {
                            selectedItem = $.grep(listView.dataSource.data(), function (e, i) {
                                try {
                                    return e.call_no === manage_others.variable.selectedRecord.call_no;
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
                            manage_others.variable.selectedRecord = null;
                            manage_others.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
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
                    $("#manage_others_add_equipment_id").setVal("");
                    $("#manage_others_add_asset_id").setVal("");
                    $("#manage_others_add_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                            code: "'equipment_id'",
                            inputXml: "'" + JSON.stringify({
                                "customer_id": $("#manage_others_add_customer_id").getVal()
                            }) + "'"
                        }));
                    $("#manage_others_add_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                            code: "'asset_id'",
                            inputXml: "'" + JSON.stringify({
                                "customer_id": $("#manage_others_add_customer_id").getVal()
                            }) + "'"
                        }));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            edit_customer_id: function () {
                try {
                    $("#manage_others_edit_equipment_id").setVal("");
                    $("#manage_others_edit_asset_id").setVal("");
                    $("#manage_others_edit_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                            code: "'equipment_id'",
                            inputXml: "'" + JSON.stringify({
                                "customer_id": $("#manage_others_edit_customer_id").getVal()
                            }) + "'"
                        }));
                    $("#manage_others_edit_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                            code: "'asset_id'",
                            inputXml: "'" + JSON.stringify({
                                "customer_id": $("#manage_others_edit_customer_id").getVal()
                            }) + "'"
                        }));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    variable: {
        callCategory: "OT"
    }
};