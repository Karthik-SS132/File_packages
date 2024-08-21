var manage_customer_survey = {
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
            retrieve_click: function () {
                try {
                    manage_customer_survey.variable.selectedRecord = null;
                    manage_customer_survey.customHandler.refreshListView();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        form: {
            submit_click: function (ele, evt) {
                try {
                    manage_customer_survey.customHandler.submitClick();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            cancel_click: function (ele, evt) {
                try {
                    manage_customer_survey.customHandler.resetOpenCatalogFields();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    catalog: {
        open: {
            select: function () {
                try {
                    $("#manage_customer_survey_open_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#manage_customer_survey_open_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        manage_customer_survey.variable.selectedRecord = $("#manage_customer_survey_open_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!manage_customer_survey.msPageCatalogRefresh) {
                                            manage_customer_survey.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + manage_customer_survey.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    manage_customer_survey.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (manage_customer_survey.variable.selectedRecord !== null) {
                        mService.config.ui.render("manage_customer_survey_open_actions_detail_view", "crud_add");
                        $("#manage_customer_survey_open_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                                buttonRegion: "open"
                            }));
                        mService.config.label.resolve();
                    } else {
                        $("#manage_customer_survey_open_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        closed: {
            select: function () {
                try {
                    $("#manage_customer_survey_closed_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#manage_customer_survey_closed_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        manage_customer_survey.variable.selectedRecord = $("#manage_customer_survey_closed_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!manage_customer_survey.msPageCatalogRefresh) {
                                            manage_customer_survey.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + manage_customer_survey.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    manage_customer_survey.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (manage_customer_survey.variable.selectedRecord !== null) {
                        mService.dSource.retrieveCustomInfoDetail({
                            code: "'customer_survey'",
                            refNo1: "$manage_customer_survey.variable.selectedRecord.call_no"
                        }, function (data) {
                            var dataList,
                            fieldList,
                            index,
                            checkData;
                            try {
                                mService.config.ui.render("manage_customer_survey_closed_actions_detail_view", "crud_view");
                                dataList = data.header;
                                fieldList = $("#manage_customer_survey_closed_actions_detail_view").find(mService.widgets.init.wSelector).sort();
                                for (index = 0; index < fieldList.length; index++) {
                                    var fieldID = $(fieldList[index]).attr("id").replace("manage_customer_survey_closed" + "_", "");
                                    if (fieldID in dataList) {
                                        $("#manage_customer_survey_closed_" + fieldID).setVal(dataList[fieldID]);
                                        $("#manage_customer_survey_closed_" + fieldID).disable();
                                    }
                                };
                                manage_customer_survey.msPageValueChanged = false;
                                mService.config.label.resolve();
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
                        mService.config.label.resolve();
                    } else {
                        $("#manage_customer_survey_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    customHandler: {
        submitClick: function () {
            try {
                mService.dSource.saveCustomInfo({}, {
                    code: "'customer_survey'",
                    ref1: "$manage_customer_survey.variable.selectedRecord.call_no",
                    headerXml: "'" + JSON.stringify(manage_customer_survey.util.getInputparam("manage_customer_survey_open", {
                            scrID: "manage_customer_survey_open_actions_detail_view"
                        })) + "'"
                }, function () {
                    try {
                        mService.app.alert("success", {
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "feedback_submit",
                            lblgrpid: "success"
                        });
                        manage_customer_survey.msPageValueChanged = false;
                        manage_customer_survey.button.crud.retrieve_click();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        mService.app.alert("error", {
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "feedback_submit",
                            lblgrpid: "error"
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        resetOpenCatalogFields: function () {
            var index,
            fieldList;
            try {
                fieldList = $("#manage_customer_survey_open_actions_detail_view").find(mService.widgets.init.wSelector);
                for (index = 0; index < fieldList.length; index++) {
                    var fieldID = $(fieldList[index]).attr("id");
                    if ($(fieldList[index]).attr("data-ms-widget-type") === "msRating") {
                        $("#" + fieldID).setVal("1");
                    } else {
                        $("#" + fieldID).setVal("");
                    }
                }
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
                listView = $("#manage_customer_survey_" + catalogID + "_list_view").data("kendoListView");
                dSource = mService.dSource.getSource({
                    code: "'customer_survey'",
                    inputXml: "'" + JSON.stringify({
                        "list_type": catalogID.toUpperCase(),
                        "search_string": $("#manage_customer_survey_" + catalogID + "_list_search_box").val()
                    }) + "'"
                });
                dSource.read().then(function () {
                    var selectedItem;
                    try {
                        listView.dataSource.data(dSource.data());
                        if (manage_customer_survey.variable.selectedRecord !== null) {
                            selectedItem = $.grep(listView.dataSource.data(), function (e, i) {
                                try {
                                    return e.call_no === manage_customer_survey.variable.selectedRecord.call_no;
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
                            manage_customer_survey.variable.selectedRecord = null;
                            manage_customer_survey.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
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
    util: {
        getInputparam: function (scrID, iObj) {
            var inputparamObj = {},
            index,
            fieldList;
            try {
                fieldList = $("#" + iObj.scrID).find(mService.widgets.init.wSelector);
                for (index = 0; index < fieldList.length; index++) {
                    var fieldID = $(fieldList[index]).attr("id").replace(scrID + "_", "");
                    if ($(fieldList[index]).attr("data-ms-widget-savefield") === "true" && $(fieldList[index]).attr("data-ms-widget-savefield") !== undefined) {
                        if ($(fieldList[index]).attr("data-ms-widget-msloop") === undefined || $(fieldList[index]).attr("data-ms-widget-msloop") === "") {
                            inputparamObj[fieldID] = manage_customer_survey.util.getInputValue(fieldList, index);
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
        }
    },
    variable: {}
};
