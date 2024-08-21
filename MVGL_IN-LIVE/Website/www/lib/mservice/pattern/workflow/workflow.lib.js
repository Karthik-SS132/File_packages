mService.pattern.workflow = {
    init: function (scrID) {
        try {
            if (mService.app.channel === "web") {}
            else {
                if (mService.containR.variable[scrID].datasource === undefined) {
                    mService.containR.variable[scrID].datasource = {};
                };
                mService.pattern.workflow.loadScreen(scrID + "_list", "");
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    loadScreen: function (scrID, iObj) {
        var controllerObj;
        try {
            controllerObj = mService.config.controller.getControllerObj(scrID);
            mService.pattern.workflow.loadTemplate(scrID, iObj, function () {
                try {
                    if (scrID.indexOf("_list") !== -1) {
                        mService.containR.util.getQueueSyncIndicator("",function (ind) {
                            var autoRefreshInd;
                            try {
                                if (ind === "true") {
                                    autoRefreshInd = true;
                                } else if (ind === "false") {
                                    autoRefreshInd = false;
                                } else {
                                    autoRefreshInd = false;
                                };
                                mService.pattern.workflow.loadDefaultCache(scrID, autoRefreshInd, function () {
                                    try {
                                        mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                                            try {
                                                mService.application.navigate("#" + scrID);
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, false, autoRefreshInd);
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
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.pattern.workflow.loadDefaultCache(scrID, false, function () {
                                    try {
                                        mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                                            try {
                                                mService.application.navigate("#" + scrID);
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, false, false);
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

                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });

                    } else {
                        mService.containR.config.util.loadConfigData(scrID, function () {
                            try {
                                mService.application.navigate("#" + scrID);
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
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    loadDefaultCache: function (scrID, autoRefreshInd, success, failure) {
        try {
            mService.spinner.show();
            mService.pattern.workflow.variable.cacheCounter = 2;
            mService.pattern.workflow.getDefaultCache(scrID, autoRefreshInd, function () {
                try {
                    mService.spinner.hide();
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
    getDefaultCache: function (scrID, autoRefreshInd, success, failure) {
        try {
            mService.pattern.workflow.downloadCache(scrID, autoRefreshInd, function () {
                try {
                    mService.pattern.workflow.variable.cacheCounter--;
                    if (mService.pattern.workflow.variable.cacheCounter !== -1) {
                        mService.pattern.workflow.getDefaultCache(scrID, autoRefreshInd, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (param) {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.pattern.workflow.variable.cacheCounter = -1;
                        success();
                    };
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
    downloadCache: function (scrID, autoRefreshInd, success, failure) {
        var controllerObj,
        cachedSource,
        cacheKey;
        try {
            controllerObj = mService.config.controller.getControllerObj(scrID);
            cacheKey = scrID + "_" + mService.pattern.workflow.variable.cacheList[mService.pattern.workflow.variable.cacheCounter];
            if (autoRefreshInd) {

                if (navigator.onLine) {
                    cachedSource = mService.dSource.getSource({
                        code: "'" + mService.pattern.workflow.variable.cacheList[mService.pattern.workflow.variable.cacheCounter] + "'",
                        inputXml: "'" + JSON.stringify({
                            "request_type": controllerObj.request_type,
                            "request_category": controllerObj.request_category,
                            "transaction_type": controllerObj.transaction_type
                        }) + "'",
                        asyncInd: false
                    });
                    cachedSource.read().then(function () {
                        try {
                            mService.dSource.cache[cacheKey] = cachedSource;
                            mService.dSource.util.localWrite(cacheKey, cachedSource.data(), function (data) {
                                try {
                                    success();
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
                        } catch (exception) {};
                    });
                } else {
                    if (mService.dSource.cache[cacheKey] !== undefined) {
                        success(mService.dSource.cache[cacheKey]);
                    } else {
                        mService.dSource.util.localRead(cacheKey, function (data) {
                            var localDSrc;
                            try {
                                localDSrc = new kendo.data.DataSource({
                                    data: data
                                });
                                localDSrc.read().then(function () {
                                    try {
                                        mService.dSource.cache[cacheKey] = localDSrc;
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    };
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            try {
                                mService.app.showToast("internet_connection_error", "system_messages");
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    }
                }
            } else {
                if (mService.dSource.cache[cacheKey] !== undefined) {
                    success(mService.dSource.cache[cacheKey]);
                } else {
                    mService.dSource.util.localRead(cacheKey, function (data) {
                        var localDSrc;
                        try {
                            localDSrc = new kendo.data.DataSource({
                                data: data
                            });
                            localDSrc.read().then(function () {
                                try {
                                    mService.dSource.cache[cacheKey] = localDSrc;
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    }, function () {
                        try {
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    });
                }
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    loadTemplate: function (scrID, iObj, success, failure) {
        var listTemplate,
        detailsTemplate,
        attachmentTemplate,
        addFeature,
        filterFeature,
        refreshFeature,
        controllerObj;
        try {
            controllerObj = mService.config.controller.getControllerObj(scrID);
            if (scrID.indexOf("_list") !== -1) {
                addFeature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                    try {
                        return e.p_child_screen_id === scrID.replace("_list", "");
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                })[0];
                refreshFeature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                    try {
                        return e.p_child_screen_id === scrID.replace("_list", "") + "_refresh";
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                })[0];
                filterFeature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                    try {
                        return e.p_child_screen_id === scrID.replace("_list", "") + "_filter";
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                })[0];
                if ($("#ms_pattern_workflow_list_screen_template").length === 0) {
                    mService.util.loadTemplate("workflow", "msPatternWorkflowList");
                };
                if ($("#" + scrID).length === 0) {
                    listTemplate = mService.config.template.getTransformedHtml("ms_pattern_workflow_list_screen_template", {
                        id: scrID.replace("_list", ""),
                        addAccess: (addFeature === undefined) ? ("false") : (addFeature.p_add_access),
                        refreshAccess: (refreshFeature === undefined) ? ("false") : ("true"),
                        filterAccess: (filterFeature === undefined) ? ("false") : ("true")
                    });
                    $("body").append(listTemplate);
                    success();
                } else {
                    if (controllerObj.presentR.list_type === "listview") {
                        $('#' + scrID + '_main_page').children().not(':first').remove();
                        $('#' + scrID + '_search_box').val("");
                        $('#' + scrID + '_clear_btn').hide();
                    } else {
                        $("#" + scrID + "_main_page").html("");
                    }
                    success();
                }
            } else if (scrID.indexOf("_details") !== -1) {
                if (mService.containR.variable[scrID] === undefined) {
                    mService.containR.variable[scrID] = {};
                };
                if (iObj !== undefined) {
                    $.extend(true, mService.containR.variable[scrID], iObj);
                };
                mService.containR.variable[scrID].selectedRecord = iObj.selectedRecord;
                if ($("#ms_pattern_workflow_details_screen_template").length === 0) {
                    mService.util.loadTemplate("workflow", "msPatternWorkflowDetails");
                };
                if ($("#" + scrID).length === 0) {
                    detailsTemplate = mService.config.template.getTransformedHtml("ms_pattern_workflow_details_screen_template", {
                        id: scrID,
                    });
                    $("body").append(detailsTemplate);
                    success();
                } else {
                    $("#" + scrID + "_main_page").html("");
                    success();
                }
            } else {
                if (mService.containR.variable[scrID] === undefined) {
                    mService.containR.variable[scrID] = {};
                };
                if (iObj !== undefined) {
                    $.extend(true, mService.containR.variable[scrID], iObj);
                };
                mService.containR.variable[scrID].selectedRecord = iObj.selectedRecord;
                mService.containR.variable[scrID].draftInd = "false";
                if ($("#ms_pattern_workflow_attachments_screen_template").length === 0) {
                    mService.util.loadTemplate("workflow", "msPatternWorkflowAttachments");
                };
                addFeature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                    try {
                        return e.p_child_feature_id_or_group === iObj.featureID;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                })[0];
                if ($("#" + scrID).length === 0) {
                    attachmentTemplate = mService.config.template.getTransformedHtml("ms_pattern_workflow_attachments_screen_template", {
                        id: scrID,
                        addAccess: (addFeature === undefined) ? ("false") : (addFeature.p_add_access),
                    });
                    $("body").append(attachmentTemplate);
                    success();
                } else {
                    $("#" + scrID + "_main_page").html("");
                    success();
                }
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    page: {
        afterShow: function (e) {
            var
            scrID,
            call_info_container;
            try {
                scrID = e.view.id.replace("#", "");
                mService.config.label.resolve();
                call_info_container = $("#" + scrID).find("[data-ms-call_info-for='" + scrID + "']");
                $(call_info_container).css("display", "flex");
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
            scrID,
            patternScrID;
            try {
                scrID = e.view.id.replace("#", "");
                controllerObj = mService.config.controller.getControllerObj(scrID);
                patternScrID = scrID.replace("_list", "");
                if (controllerObj !== undefined) {
                    if (controllerObj.containR_subtype === "workflow") {
                        if (mService.containR.variable[patternScrID].fromChildForm === undefined || !mService.containR.variable[patternScrID].fromChildForm) {
                            mService.containR.variable[patternScrID].fromChildForm = false;
                        } else {
                            if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined && controllerObj.presentR.list_type !== "listview") {
                                mService.presentR.pattern.util.destroyScrollview(scrID);
                            };
                        }
                        if (mService.containR.variable[patternScrID].eventclicked !== undefined && mService.containR.variable[patternScrID].eventclicked) {
                            mService.containR.variable[patternScrID].eventclicked = false;
                        };
                        if (mService.containR.variable[patternScrID].datasource !== undefined && mService.containR.variable[patternScrID].datasource.filterObj !== undefined && !$.isEmptyObject(mService.containR.variable[patternScrID].datasource.filterObj)) {
                            mService.containR.pattern.listview.util.filter.initListviewWithFilter(scrID, controllerObj, true, false, false);
                        } else {
                            mService.containR.variable[patternScrID].syncInd = true;
                            if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined && controllerObj.presentR.list_type === "listview") {
                                mService.presentR.pattern.listview.init.initializeListview(scrID, false);
                            } else {
                                mService.presentR.pattern.listview.init.initializeScrollViewList(scrID, false);
                            }
                        }
                    } else if (controllerObj.containR_type === "form") {
                        if (controllerObj.containR_subtype === "content") {
                            mService.containR.pattern.content.init(scrID);
                        }
                    } else if (controllerObj.containR_subtype === "master") {
                        mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID, true, true);
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
    variable: {
        cacheList: ["workflow_event_verb", "company_feature_access_order", "employee_last_access_info"],
        cacheCounter: 0
    }
};
