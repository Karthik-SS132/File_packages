mService.config = {
    controller: {
        get: function (subMenuID, success, failure) {
            var controllerSrcKey;
            try {
                controllerSrcKey = subMenuID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                if (mService.config.controller.src[controllerSrcKey] === undefined) {
                    if (mService.app.channel === "web") {
                        mService.api.configuration.get(subMenuID + ".json", "configuration", "controller", function (configData) {
                            try {
                                mService.config.controller.src[subMenuID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()] = JSON.parse(configData);
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.config.controller.getMobileConfig(subMenuID, controllerSrcKey, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                controllerSrcKey = subMenuID + "_" + mService.app.getClientId();
                                mService.config.controller.getMobileConfig(subMenuID, controllerSrcKey, function () {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        controllerSrcKey = subMenuID + "_" + mService.app.getClientGroup();
                                        mService.config.controller.getMobileConfig(subMenuID, controllerSrcKey, function () {
                                            try {
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                controllerSrcKey = subMenuID + "_" + mService.app.getVertical();
                                                mService.config.controller.getMobileConfig(subMenuID, controllerSrcKey, function () {
                                                    try {
                                                        success();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        controllerSrcKey = subMenuID + "_" + mService.app.getSolution();
                                                        mService.config.controller.getMobileConfig(subMenuID, controllerSrcKey, function () {
                                                            try {
                                                                success();
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                controllerSrcKey = subMenuID;
                                                                mService.config.controller.getMobileConfig(subMenuID, controllerSrcKey, function () {
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
                                });
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
        getContainRFormProperties: function (scrID, controllerObj, date) {
            var index;
            try {
                mService.containR.variable[scrID].template = ((controllerObj.template === "" || controllerObj.template === undefined) ? (scrID) : (kendo.template(controllerObj.template)({})));
                mService.containR.variable[scrID].transNo = ((controllerObj.transNo === "" || controllerObj.transNo === undefined) ? (mService.app.getUserId() + "_" + kendo.toString(date, "ddMMyyHHmmss")) : (kendo.template(controllerObj.transNo)({})));
                mService.containR.variable[scrID].taskID = ((controllerObj.taskID === "" || controllerObj.taskID === undefined) ? ("0") : (kendo.template(controllerObj.taskID)({})));
                mService.containR.variable[scrID].attachInd = ((controllerObj.attachInd === "" || controllerObj.attachInd === undefined) ? ("C") : (kendo.template(controllerObj.attachInd)({})));
                mService.containR.variable[scrID].transType = ((controllerObj.transType === "" || controllerObj.transType === undefined) ? ("CALL") : (kendo.template(controllerObj.transType)({})));
                mService.containR.variable[scrID].assignee = ((controllerObj.assignee === "" || controllerObj.assignee === undefined) ? (mService.app.getUserId()) : (kendo.template(controllerObj.assignee)({})));
                mService.containR.variable[scrID].formName = ((controllerObj.formName === "" || controllerObj.formName === undefined) ? (mService.app.getUserId() + "_" + kendo.toString(date, "ddMMyyHHmmss") + scrID) : (kendo.template(controllerObj.formName)({})));
                mService.containR.variable[scrID].formPath = ((controllerObj.attachmentPathKey === "" || controllerObj.attachmentPathKey === undefined) ? ("") : (mService.dSource.cache[controllerObj.attachmentPathKey].data()[0].code));
                mService.containR.variable[scrID].save = {};
                if (controllerObj.save === undefined) {
                    controllerObj.save = {};
                };
                mService.containR.variable[scrID].save.online = ((controllerObj.save.online === "" || controllerObj.save.online === undefined) ? ("false") : ((kendo.template(controllerObj.save.online)({}))));
                mService.containR.variable[scrID].save.infoCode = ((controllerObj.save.infoCode === "" || controllerObj.save.infoCode === undefined) ? ("") : ((kendo.template(controllerObj.save.infoCode)({}))));
                mService.containR.variable[scrID].save.infoRefNo1 = ((controllerObj.save.infoRefNo1 === "" || controllerObj.save.infoRefNo1 === undefined) ? ("") : ((kendo.template(controllerObj.save.infoRefNo1)({}))));
                mService.containR.variable[scrID].save.infoRefNo2 = ((controllerObj.save.infoRefNo2 === "" || controllerObj.save.infoRefNo2 === undefined) ? ("") : ((kendo.template(controllerObj.save.infoRefNo2)({}))));
                mService.containR.variable[scrID].save.mode = ((controllerObj.save.mode === "" || controllerObj.save.mode === undefined) ? ("A") : ((kendo.template(controllerObj.save.mode)({}))));
                mService.containR.variable[scrID].save.timestamp = ((controllerObj.save.timestamp === "" || controllerObj.save.timestamp === undefined) ? ("00000000-0000-0000-0000-000000000000") : ((kendo.template(controllerObj.save.timestamp)({}))));
                if (controllerObj.dSource !== undefined) {
                    for (index = 0; index < Object.keys(controllerObj.dSource).length; index++) {
                        if (controllerObj.dSource[Object.keys(controllerObj.dSource)[index]].type === "list") {
                            mService.containR.dSource[scrID][Object.keys(controllerObj.dSource)[index]] = mService.dSource.getListSource({
                                code: controllerObj.dSource[Object.keys(controllerObj.dSource)[index]].inputParam.code,
                                inputXml: controllerObj.dSource[Object.keys(controllerObj.dSource)[index]].inputParam.inputXml,
                                dSourceName: Object.keys(controllerObj.dSource)[index]
                            });
                        } else {
                            mService.containR.dSource[scrID][Object.keys(controllerObj.dSource)[index]] = mService.dSource.getDetailSource({
                                code: controllerObj.dSource[Object.keys(controllerObj.dSource)[index]].inputParam.code,
                                refNo1: controllerObj.dSource[Object.keys(controllerObj.dSource)[index]].inputParam.refNo1,
                                refNo2: controllerObj.dSource[Object.keys(controllerObj.dSource)[index]].inputParam.refNo2,
                                dSourceName: Object.keys(controllerObj.dSource)[index]
                            });
                        }
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getControllerObj: function (scrID) {
            var controllerObj,
            scrIDSplit;
            try {
                controllerObj = mService.config.controller.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()];
                if (controllerObj === undefined) {
                    controllerObj = mService.config.controller.src[(scrID.substring(0, scrID.lastIndexOf("_"))) + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()];
                };
                if (controllerObj !== undefined && controllerObj.pattern_name !== undefined) {
                    scrIDSplit = scrID.split("_");
                    if (scrIDSplit.length > 1) {
                        controllerObj = (controllerObj[scrIDSplit[scrIDSplit.length - 1]] === undefined) ? (controllerObj) : (controllerObj[scrIDSplit[scrIDSplit.length - 1]]);
                    }
                };
                return controllerObj;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getMobileConfig: function (scrID, controllerSrcKey, success, failure) {
            var filePath;
            try {
                if (mService.util.isContainRScreen(scrID) && mService.containR.variable[scrID] !== undefined && mService.containR.variable[scrID].draftInd === "true") {
                    filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo + "/" + "controller_" + controllerSrcKey + ".json";
                } else {
                    filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "controller" + "/" + "controller_" + controllerSrcKey + ".json";
                };
                mService.nfs.readFile(filePath, function (data) {
                    try {
                        mService.config.controller.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()] = JSON.parse(data);
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
        getPageCatalog: function (subMenuID) {
            try {
                return mService.config.controller.src[subMenuID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()].catalog;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getWebConfig: function (scrID, controllerSrcKey, success, failure) {
            try {
                $.ajax({
                    url: mService.app.clientURL + "/" + "www" + "/" + "configuration" + "/" + "controller" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "controller_" + controllerSrcKey + ".json",
                    async: false,
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response, status) {
                        try {
                            mService.config.controller.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()] = response;
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function () {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        src: {}
    },
    label: {
        get: function (id, success, failure) {
            var labelSrcKey;
            try {
                if (id === "pre_signup_messages") {
                    labelSrcKey = id;
                } else {
                    labelSrcKey = id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId();
                };
                if (mService.config.label.src[labelSrcKey] === undefined) {
                    if (mService.app.channel === "web") {
                        mService.api.configuration.get(id + ".json", "configuration", "label", function (configData) {
                            try {
                                mService.config.label.src[id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()] = JSON.parse(configData);
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.config.label.getMobileConfig(id, labelSrcKey, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                labelSrcKey = id + "_" + mService.app.getClientId() + "_" + mService.app.getLocaleId();
                                mService.config.label.getMobileConfig(id, labelSrcKey, function () {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        labelSrcKey = id + "_" + mService.app.getClientGroup() + "_" + mService.app.getLocaleId();
                                        mService.config.label.getMobileConfig(id, labelSrcKey, function () {
                                            try {
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                labelSrcKey = id + "_" + mService.app.getVertical() + "_" + mService.app.getLocaleId();
                                                mService.config.label.getMobileConfig(id, labelSrcKey, function () {
                                                    try {
                                                        success();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        labelSrcKey = id + "_" + mService.app.getSolution() + "_" + mService.app.getLocaleId();
                                                        mService.config.label.getMobileConfig(id, labelSrcKey, function () {
                                                            try {
                                                                success();
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                labelSrcKey = id + "_" + mService.app.getLocaleId();
                                                                mService.config.label.getMobileConfig(id, labelSrcKey, function () {
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
                                });
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
        getMobileConfig: function (scrID, labelSrcKey, success, failure) {
            var filePath;
            try {
                if (mService.util.isContainRScreen(scrID) && mService.containR.variable[scrID] !== undefined && mService.containR.variable[scrID].draftInd === "true") {
                    filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo + "/" + "label_" + labelSrcKey + ".json";
                } else {
                    filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "label" + "/" + "label_" + labelSrcKey + ".json";
                };
                mService.nfs.readFile(filePath, function (data) {
                    try {
                        labelSrcKey = scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId();
                        mService.config.label.src[labelSrcKey] = JSON.parse(data);
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
        getWebConfig: function (scrID, labelSrcKey, success, failure) {
            try {
                $.ajax({
                    url: mService.app.clientURL + "/" + "www" + "/" + "configuration" + "/" + "label" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + mService.app.getLocaleId() + "/" + "label_" + labelSrcKey + ".json",
                    async: false,
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response, status) {
                        try {
                            labelSrcKey = scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId();
                            mService.config.label.src[labelSrcKey] = response;
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function () {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        resolve: function (id) {
            var index,
            labelList,
            labelSrcKey,
            msLabel,
            msLabelSrc,
            msLabelGrpID,
            msLabelID,
            loopExitIndicator,
            isAllowed;
            try {
                isAllowed = false;
                if (mService.app.channel === "web") {
                    labelList = $("#login_container, #home_menu, .k-window, [data-ms-role='functionalMenuContainer'][data-ms-role-id='" + mService.page.navigation.get.functionalMenuID() + "']").find("[data-ms-lbl='field'][data-ms-lbl-locale!='" + mService.app.getLocaleId() + "'],[data-ms-lbl='icon'][data-ms-lbl-locale!='" + mService.app.getLocaleId() + "'],[data-ms-lbl='placeholder'][data-ms-lbl-locale!='" + mService.app.getLocaleId() + "']");
                } else {
                    labelList = $(document).find("[data-ms-lbl='field'][data-ms-lbl-locale!='" + mService.app.getLocaleId() + "'],[data-ms-lbl='icon'][data-ms-lbl-locale!='" + mService.app.getLocaleId() + "'],[data-ms-lbl='placeholder'][data-ms-lbl-locale!='" + mService.app.getLocaleId() + "']");
                };
                for (index = 0; index < labelList.length; index++) {
                    msLabel = $(labelList[index]).attr("data-ms-lbl");
                    msLabelSrc = $(labelList[index]).attr("data-ms-lbl-src");
                    msLabelGrpID = $(labelList[index]).attr("data-ms-lbl-grpid");
                    msLabelID = $(labelList[index]).attr("data-ms-lbl-id");
                    if (mService.app.getCountryCode() !== "") {
                        isAllowed = true;
                    } else {
                        if ($(labelList[index]).attr("data-ms-lbl-src") === "pre_signup_messages") {
                            isAllowed = true;
                        } else {
                            isAllowed = false;
                        }
                    };
                    if (isAllowed) {
                        if (msLabelSrc !== undefined) {
                            mService.config.label.get(msLabelSrc, function () {
                                try {
                                    if (msLabelSrc === "pre_signup_messages") {
                                        labelSrcKey = msLabelSrc;
                                    } else {
                                        labelSrcKey = msLabelSrc + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId();
                                    };
                                    $(labelList[index]).attr("data-ms-lbl-locale", mService.app.getLocaleId());
                                    if (msLabel === "field") {
                                        if (msLabelGrpID === undefined || msLabelGrpID === "") {
                                            $(labelList[index]).html(mService.config.label.src[labelSrcKey]["field"][msLabelID]);
                                            $(labelList[index]).attr("title", mService.config.label.src[labelSrcKey]["field"][msLabelID]);
                                        } else {
                                            $(labelList[index]).html(mService.config.label.src[labelSrcKey]["field"][msLabelGrpID][msLabelID]);
                                            $(labelList[index]).attr("title", mService.config.label.src[labelSrcKey]["field"][msLabelGrpID][msLabelID]);
                                        }
                                    } else if (msLabel === "icon") {
                                        if (msLabelGrpID === undefined || msLabelGrpID === "") {
                                            $(labelList[index]).attr("title", mService.config.label.src[labelSrcKey]["icon"][msLabelID]);
                                        } else {
                                            $(labelList[index]).attr("title", mService.config.label.src[labelSrcKey]["icon"][msLabelGrpID][msLabelID]);
                                        };
                                        if ($(labelList[index]).data("kendoTooltip") !== undefined) {
                                            $(labelList[index]).data("kendoTooltip").destroy();
                                        };
                                        $(labelList[index]).kendoTooltip({
                                            position: "right"
                                        });
                                    } else if (msLabel === "placeholder") {
                                        if (msLabelGrpID === undefined || msLabelGrpID === "") {
                                            $(labelList[index]).attr("placeholder", mService.config.label.src[labelSrcKey]["placeholder"][msLabelID]);
                                            $(labelList[index]).attr("title", mService.config.label.src[labelSrcKey]["placeholder"][msLabelID]);
                                        } else {
                                            $(labelList[index]).attr("placeholder", mService.config.label.src[labelSrcKey]["placeholder"][msLabelGrpID][msLabelID]);
                                            $(labelList[index]).attr("title", mService.config.label.src[labelSrcKey]["placeholder"][msLabelGrpID][msLabelID]);
                                        }
                                    }
                                } catch (exception) {
                                    loopExitIndicator = true;
                                    console.log("msLabel-" + msLabel + "--msLabelSrc-" + msLabelSrc + "--msLabelGrpID-" + msLabelGrpID + "--msLabelID-" + msLabelID);
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    loopExitIndicator = true;
                                    console.log("msLabel-" + msLabel + "--msLabelSrc-" + msLabelSrc + "--msLabelGrpID-" + msLabelGrpID + "--msLabelID-" + msLabelID);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        };
                        if (loopExitIndicator === true) {
                            throw "configuration file not found";
                        };
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        src: {}
    },
    rule: {
        actions: {
            alert: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                var alertMessage;
                try {
                    alertMessage = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]"));
                    alertMessage = alertMessage.substring(alertMessage.indexOf('"') + 1, alertMessage.lastIndexOf('"'));
                    mService.app.alert(alertMessage);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            click: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim()).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim()).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    $(actionFields[actionFieldsCounter].trim() + uid).click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            changelabel: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                var params;
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (currentActionString.indexOf("VALUE") != -1) {
                        currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                        valueString = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.lastIndexOf("]")).trim();
                        params = valueString.split(",");
                        mService.config.rule.util.changeLabel(actionFields[actionFieldsCounter].trim(), params[0], params[1], uid);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            commonPatternAction: function (actionName, actionFields, actionFieldsCounter, uid) {
                var dataValidationRules;
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim()).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim()).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-validation-rule") == undefined) {
                        $(actionFields[actionFieldsCounter].trim() + uid).attr("data-validation-rule", actionName);
                    } else {
                        dataValidationRules = $(actionFields[actionFieldsCounter].trim() + uid).attr("data-validation-rule").split(",");
                        if ($.inArray(actionName, dataValidationRules) == -1) {
                            dataValidationRules.push(actionName);
                            $(actionFields[actionFieldsCounter].trim() + uid).attr("data-validation-rule", dataValidationRules.join());
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            datetimepattern: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    mService.config.rule.actions.commonPatternAction("DateTimePattern", actionFields, actionFieldsCounter, uid);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            datepattern: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    mService.config.rule.actions.commonPatternAction("DatePattern", actionFields, actionFieldsCounter, uid);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            disable: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    $(actionFields[actionFieldsCounter].trim() + uid).disable();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            enable: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    $(actionFields[actionFieldsCounter].trim() + uid).enable();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            filter: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                var valueString,
                filterObj,
                filterArray,
                logic,
                value,
                currentFilterObj;
                try {
                    if (currentActionString.indexOf("VALUE") != -1) {
                        currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                        valueString = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim();
                        logic = currentActionString.substring(currentActionString.indexOf("LOGIC"));
                        logic = logic.substring(logic.indexOf("[") + 1, logic.indexOf("]")).trim();
                        valueString = valueString.substring(1, valueString.length - 1);
                        filterArray = valueString.trim().split("},{");
                        filterObj = {
                            logic: logic,
                            filters: []
                        };
                        for (var i = 0; i < filterArray.length; i++) {
                            currentFilterObj = filterArray[i].split(","),
                            tempObj = filterArray[i].split(",");
                            tempObj.splice(0, 2);
                            value = tempObj.join();
                            filterObj.filters.push({
                                field: currentFilterObj[0],
                                operator: currentFilterObj[1],
                                value: mService.util.getTransformedValue(value, false, uid)
                            });
                        };
                        $(actionFields[actionFieldsCounter].trim()).datasourceFilter(filterObj);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            hide: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    mService.widgets.hide(actionFields[actionFieldsCounter].trim().substring(1) + uid);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            keyfieldpattern: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    mService.config.rule.actions.commonPatternAction("KeyfieldPattern", actionFields, actionFieldsCounter, uid);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            mandatory: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-rule-mandatory", "true");
                    if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-type") === "msMlingualtextarea") {
                        $(actionFields[actionFieldsCounter].trim() + "_default_locale" + uid).attr("data-ms-rule-mandatory", "true");
                    };
                    $("[data-ms-lbl-mandatory='" + actionFields[actionFieldsCounter].trim().substring(1) + uid + "']").show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            numberpattern: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    mService.config.rule.actions.commonPatternAction("NumberPattern", actionFields, actionFieldsCounter, uid);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            optional: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-rule-mandatory", "false");
                    if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-type") === "msMlingualtextarea") {
                        $(actionFields[actionFieldsCounter].trim() + uid + "_default_locale").attr("data-ms-rule-mandatory", "false");
                    };
                    $("[data-ms-lbl-mandatory='" + actionFields[actionFieldsCounter].trim().substring(1) + uid + "']").hide();
                    $(".k-invalid-msg[data-for='" + actionFields[actionFieldsCounter].trim().substring(1) + uid + "']").hide();
                    $(actionFields[actionFieldsCounter].trim() + "_group" + uid).find(".k-invalid").removeClass("k-invalid");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            otherfieldpattern: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    mService.config.rule.actions.commonPatternAction("OtherfieldPattern", actionFields, actionFieldsCounter, uid);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            pattern: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                var valueString;
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    if (currentActionString.indexOf("VALUE") !== -1) {
                        currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                        valueString = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.lastIndexOf("]")).trim();
                        $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-rule-pattern", valueString.substring(0, valueString.lastIndexOf(",")).trim());
                        $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-rule-patternmatchcase", eval(valueString.substring(valueString.lastIndexOf(",") + 1).trim()));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            read: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                var dSource;
                try {
                    dSource = mService.util.getTransformedValue(actionFields[actionFieldsCounter].trim(), false, uid);
                    dSource.read();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            search: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    if (currentActionString.indexOf("VALUE") != -1) {
                        currentActionString = currentActionString.slice(currentActionString.indexOf("VALUE"));
                        eval(currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("];")).trim());
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            setdatasource: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                var valueString;
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    if (currentActionString.indexOf("VALUE") != -1) {
                        currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                        valueString = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.lastIndexOf("]")).trim();
                        valueString = mService.util.getTransformedValue(valueString, false, uid);
                        if (typeof(valueString) === "string") {
                            valueString = JSON.parse(valueString);
                        };
                        $(actionFields[actionFieldsCounter].trim() + uid).setDataSource(valueString);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            setmaximum: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    if (currentActionString.indexOf("VALUE") != -1) {
                        currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                        $(actionFields[actionFieldsCounter].trim() + uid).setMax(mService.util.getTransformedValue(currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim(), true, uid));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            setminimum: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                        if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                            uid = "";
                        };
                    };
                    if (currentActionString.indexOf("VALUE") != -1) {
                        currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                        $(actionFields[actionFieldsCounter].trim() + uid).setMin(mService.util.getTransformedValue(currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim(), true, uid));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            setvalue: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                var readDataSource,
                readDataSourceInput,
                valueString,
                functionName,
                params,
                uid,
                loopUID;
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    loopUID = uid;
                    if (currentActionString.indexOf("VALUE") != -1) {
                        if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                            if ($(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === undefined || $(actionFields[actionFieldsCounter].trim() + uid).attr("data-ms-widget-msloop") === "") {
                                uid = "";
                            };
                        };
                    };
                    if (currentActionString.indexOf("VALUE") != -1) {
                        currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                        valueString = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.lastIndexOf("]")).trim();
                        if (valueString.indexOf("CONCAT") == 0) {
                            valueString = valueString.substring(valueString.indexOf("(") + 1, valueString.lastIndexOf(")")).split(",");
                            if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                                $(actionFields[actionFieldsCounter].trim() + uid).setVal(mService.util.getConcatenatedValue({
                                        delimiter: valueString[0].trim(),
                                        valueList: valueString.splice(1)
                                    }, uid));
                            } else if (actionFields[actionFieldsCounter].trim().indexOf("$") == 0) {
                                eval(actionFields[actionFieldsCounter].trim().substring(1) + uid + " = mService.util.getConcatenatedValue({delimiter : valueString[0].trim(), valueList : valueString.splice(1)},uid)");
                            }
                        } else if (valueString.indexOf("READ") == 0) {
                            valueString = valueString.substring(valueString.indexOf("(") + 1, valueString.lastIndexOf(")"));
                            readDataSourceInput = JSON.parse(valueString);
                            readDataSource = mService.util.getTransportDataSource(readDataSourceInput);
                            readDataSource.read();
                            if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                                $(actionFields[actionFieldsCounter].trim() + uid).setVal(readDataSource.data()[0][readDataSourceInput.outputParameter]);
                            } else if (actionFields[actionFieldsCounter].trim().indexOf("$") == 0) {
                                if (readDataSourceInput.outputParameter != undefined) {
                                    eval(actionFields[actionFieldsCounter].trim().substring(1) + uid + " = readDataSource.data()[0][readDataSourceInput.outputParameter]");
                                } else {
                                    eval(actionFields[actionFieldsCounter].trim().substring(1) + uid + " = readDataSource.data()");
                                }
                            }
                        } else if (valueString.indexOf("FN") == 0) {
                            functionName = valueString.substring(valueString.lastIndexOf("FN_") + 3, valueString.indexOf("(")).trim();
                            params = valueString.substring(valueString.indexOf("(") + 1, valueString.lastIndexOf(")")).trim();
                            params = params.split(",");
                            if (functionName === "TRANSFORHTML") {
                                $(actionFields[actionFieldsCounter].trim() + uid).setVal(mService.config.template.getTransformedHtml(params[0].trim().replace("#", ""), mService.util.getTransformedValue(params[1].trim(), true, uid)));
                            } else if (functionName === "UPDATEDATASOURCE") {
                                mService.dSource.util.updateDataSource(actionFields[actionFieldsCounter].trim(), mService.util.getTransformedValue(params[0].trim(), true), mService.util.getTransformedValue(params[1].trim(), true, uid));
                            } else if (functionName === "ADDDATASOURCE") {
                                mService.dSource.util.addDataSource(actionFields[actionFieldsCounter].trim(), mService.util.getTransformedJSon(JSON.parse(valueString.substring(valueString.indexOf("(") + 1, valueString.lastIndexOf(")")).trim())));
                            } else if (functionName === "GETTIMEDURATION") {
                                $(actionFields[actionFieldsCounter].trim() + uid).setVal(mService.util.getTimeDuration(mService.util.getTransformedValue(params[0].trim(), true), mService.util.getTransformedValue(params[1].trim(), true, uid)));
                            } else if (functionName === "CALC") {
                                $(actionFields[actionFieldsCounter].trim() + uid).setVal(mService.util.getCalculatedValue(params[0], loopUID));
                            } else if (functionName === "SUMLOOP") {
                                $(actionFields[actionFieldsCounter].trim() + uid).setVal(mService.util.getSumLoopValue(params[0], loopUID));
                            }
                        } else {
                            if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                                if (valueString.trim().indexOf("[") == 0) {
                                    valueString = JSON.parse(valueString);
                                    valueString = mService.util.getTransformedJSon(valueString);
                                    $(actionFields[actionFieldsCounter].trim() + uid).setVal(valueString);
                                } else {
                                    $(actionFields[actionFieldsCounter].trim() + uid).setVal(mService.util.getTransformedValue(valueString, true, uid));
                                }
                            } else if (actionFields[actionFieldsCounter].trim().indexOf("$") == 0) {
                                eval(actionFields[actionFieldsCounter].trim().substring(1) + " = mService.util.getTransformedValue(valueString, true,uid)");
                            }
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                try {
                    uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                    mService.widgets.show(actionFields[actionFieldsCounter].trim().substring(1) + uid);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            showtoast: function (currentActionString, actionFields, actionFieldsCounter, uid) {
                var obj = {};
                try {
                    if (currentActionString.indexOf("VALUE") != -1) {
                        currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                        valueString = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.lastIndexOf("]")).trim();
                        valueString = valueString.split(",");
                        if (valueString[1] !== undefined) {
                            obj = mService.util.getTransformedValue(valueString[1].trim(), false, uid);
                            if (typeof(obj) === "string") {
                                obj = JSON.parse(obj)
                            };
                            obj = mService.util.getTransformedJSon(obj);
                        };
                        mService.app.showToast(mService.util.getTransformedValue(valueString[0], false, uid), (actionFields[actionFieldsCounter].trim()).substring(1), obj);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        apply: function (id) {
            try {
                var subMenuID;
                subMenuID = (mService.app.channel === "web") ? mService.app.getScreenId() + "_chat" : id;
                mService.config.rule.get(subMenuID, function () {
                    try {
                        mService.config.rule.executeRuleStatements({
                            screenID: subMenuID,
                            objectID: "screen",
                            eventID: "load",
                            fieldID: id
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        throw "configuration file not found";
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                return mService.config.rule.executeConfiguredRules(id);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        applyRuleActions: function (actionString, uid) {
            var actionList,
            actionListCounter,
            currentActionString,
            actionName,
            actionFields,
            actionFieldsCounter;
            result = true;
            try {
                actionList = actionString.trim().split("\n");
                for (actionListCounter = 0; actionListCounter < actionList.length; actionListCounter++) {
                    currentActionString = actionList[actionListCounter].trim();
                    if (currentActionString != "") {
                        if (currentActionString.indexOf("ALERT") == 0) {
                            mService.config.rule.actions[actionName.toLowerCase()](currentActionString, "", "", uid);
                        } else {
                            actionName = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim();
                            currentActionString = currentActionString.substring(currentActionString.indexOf("ON"));
                            actionFields = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim().split(",");
                            for (actionFieldsCounter = 0; actionFieldsCounter < actionFields.length; actionFieldsCounter++) {
                                result = mService.config.rule.actions[actionName.toLowerCase()](currentActionString, actionFields, actionFieldsCounter, uid);
                            }
                        }
                    }
                };
                return result;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        evaluateConditionString: function (rawConditionString, uid) {
            var conditionString,
            conditionArguments,
            argumentCounter,
            leftSideValue,
            rightSideValue;
            try {
                uid = (uid === undefined || uid === "") ? "" : "_" + uid;
                conditionArguments = {};
                argumentCounter = 1;
                rawConditionString = rawConditionString.substring(rawConditionString.indexOf("("), rawConditionString.length).trim();
                conditionString = "";
                while (true) {
                    if (rawConditionString != "") {
                        if (rawConditionString.charAt(0) == "(" || rawConditionString.charAt(0) == ")") {
                            conditionString += rawConditionString.charAt(0);
                            rawConditionString = rawConditionString.substring(1).trim();
                        } else {
                            if (conditionString.charAt(conditionString.length - 1) != ")") {
                                leftSideValue = rawConditionString.substring(0, rawConditionString.indexOf(" "));
                                if (leftSideValue.indexOf("#") !== -1) {
                                    if ($(leftSideValue).attr("data-ms-widget-msloop") !== undefined || $(leftSideValue).attr("data-ms-widget-msloop") !== "") {
                                        leftSideValue = leftSideValue + uid;
                                    };
                                };
                                conditionArguments["leftArgument" + argumentCounter] = mService.util.getTransformedValue(leftSideValue, true, uid);
                                conditionString += "conditionArguments.leftArgument" + argumentCounter;
                                rawConditionString = rawConditionString.substring(rawConditionString.indexOf(" ")).trim();
                                conditionString += rawConditionString.substring(0, rawConditionString.indexOf(" "));
                                rawConditionString = rawConditionString.substring(rawConditionString.indexOf(" ")).trim();
                                rightSideValue = rawConditionString.substring(0, rawConditionString.indexOf(")")).trim();
                                if (rightSideValue.indexOf("#") !== -1) {
                                    if ($(rightSideValue).attr("data-ms-widget-msloop") !== undefined || $(rightSideValue).attr("data-ms-widget-msloop") !== "") {
                                        rightSideValue = rightSideValue + uid;
                                    };
                                };
                                conditionArguments["rightArgument" + argumentCounter] = mService.util.getTransformedValue(rightSideValue, true, uid);
                                conditionString += "conditionArguments.rightArgument" + argumentCounter;
                                rawConditionString = rawConditionString.substring(rawConditionString.indexOf(")")).trim();
                                argumentCounter++;
                            } else {
                                conditionString += mService.config.rule.getOperatorForCode(rawConditionString.substring(0, rawConditionString.indexOf(" ")));
                                rawConditionString = rawConditionString.substring(rawConditionString.indexOf(" ")).trim();
                            }
                        }
                    } else {
                        break;
                    }
                };
                return eval(conditionString);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        executeConfiguredRules: function (id) {
            try {
                $("#" + id).kendoValidator({
                    rules: {
                        msMobileNumberMin: function (e) {
                            try {
                                if (e.attr("data-ms-widget-type") === "msMobileNumber") {
                                    if ($("#" + e.attr("id")).val() !== "") {
                                        if ($("#" + e.attr("id")).attr("minlength") !== "") {
                                            if ($("#" + e.attr("id")).val().length < 5) {
                                                return false;
                                            }
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMobileNumberCodeMin: function (e) {
                            try {
                                if (e.attr("data-ms-widget-mobile-code") !== undefined && e.attr("data-ms-widget-mobile-code") === "true") {
                                    if ($("#" + e.attr("id")).val() !== "") {
                                        if ($("#" + e.attr("id")).val().length < 1) {
                                            return false;
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMobileNumberMax: function (e) {
                            try {
                                if (e.attr("data-ms-widget-type") === "msMobileNumber") {
                                    if ($("#" + e.attr("id")).val() !== "") {
                                        if ($("#" + e.attr("id")).attr("maxlength") === "15") {
                                            if ($("#" + e.attr("id")).val().length > 15) {
                                                return false;
                                            }
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMobileNumberCodeMax: function (e) {
                            try {
                                if (e.attr("data-ms-widget-mobile-code") !== undefined && e.attr("data-ms-widget-mobile-code") === "true") {
                                    if ($("#" + e.attr("id")).val() !== "") {
                                        if ($("#" + e.attr("id")).val().length > 4) {
                                            return false;
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMobileNumberCodeCheck: function (e) {
                            var id,
                            msLoopInd,
                            uid;
                            try {
                                uid = "";
                                id = e.attr("id");
                                if (e.attr("data-ms-widget-type") === "msMobileNumber") {
                                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                                    if (msLoopInd !== undefined && msLoopInd !== "") {
                                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                                        id = uid === "" ? id : id.replace("_" + uid, "");
                                        uid = uid === "" ? uid : "_" + uid;
                                    };
                                    if ($("#" + e.attr("id")).val() !== "") {
                                        if ($("#" + id + "_country_code" + uid).val() === "") {
                                            return false;
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msLanguage: function (e) {
                            try {
                                if (e.attr("data-ms-rule-locale") === "true") {
                                    return false;
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMandatory: function (e) {
                            try {
                                if (e.attr("data-ms-rule-mandatory") === "true") {
                                    if (e.attr("data-ms-widget-type") === "msAttachment") {
                                        if (mService.app.channel === "web") {
                                            if (e.data("kendoUpload").getFiles().length === 0) {
                                                return false;
                                            }
                                        } else {
                                            if (e.getVal().length === 0) {
                                                $("#" + e.attr("id") + "_group div[role='listbox']").addClass("k-invalid");
                                                return false;
                                            } else {
                                                $("#" + e.attr("id") + "_group div[role='listbox']").removeClass("k-invalid");
                                            }
                                        }
                                    } else if (e.attr("data-ms-widget-type") === "msLoop") {
                                        if (mService.widgets.variable.msLoop.dataSrc[e.attr("id")].data().length === 0) {
                                            return false;
                                        }
                                    } else if (e.attr("data-ms-widget-type") === "msCheckbox" || e.attr("data-ms-widget-type") === "msFlipswitch") {
                                        if (e.getVal() === false) {
                                            return false;
                                        }
                                    } else if (e.attr("data-ms-widget-type") === "msDatebox" || e.attr("data-ms-widget-type") === "msTimebox") {
                                        if (e.getVal() === "") {
                                            return false;
                                        }
                                    } else if (e.attr("data-ms-widget-type") === "msNumerictextbox") {
                                        if (e.getVal() === 0) {
                                            return false;
                                        }
                                    } else if (e.attr("data-ms-widget-type") === "msMultiselect" || e.attr("data-ms-widget-type") === "msCheckboxgroup" || e.attr("data-ms-widget-type") === "msCamera" || e.attr("data-ms-widget-type") === "msGallery" || e.attr("data-ms-widget-type") === "msImagepicker" || e.attr("data-ms-widget-type") === "msAttachment") {
                                        if (e.getVal().length === 0) {
                                            $("#" + e.attr("id") + "_group div[role='listbox']").addClass("k-invalid");
                                            return false;
                                        } else {
                                            $("#" + e.attr("id") + "_group div[role='listbox']").removeClass("k-invalid");
                                        }
                                    } else if (e.attr("data-ms-widget-type") === "msRating" || e.attr("data-ms-widget-type") === "msSlider") {
                                        if (e.getVal() === "0" || e.getVal() === 0) {
                                            return false;
                                        }
                                    } else if (e.attr("data-ms-widget-type") === "msMlingualtextarea") {
                                        if (e.getVal()[mService.user.profile.login.locale_id.substring(0, 2)] === "" || e.getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)] === "") {
                                            $("#" + e.attr("id") + "_default_locale").removeClass("k-valid");
                                            $("#" + e.attr("id") + "_default_locale").addClass("k-invalid");
                                            return false;
                                        } else {
                                            $("#" + e.attr("id") + "_default_locale").removeClass("k-invalid");
                                            $("#" + e.attr("id") + "_default_locale").addClass("k-valid");
                                        }
                                    } else if ($("#" + e.attr("id").replace("_default_locale", "")).attr("data-ms-widget-type") === "msMlingualtextarea") {
                                        if ($("#" + e.attr("id").replace("_default_locale", "")).getVal()[mService.user.profile.login.locale_id.substring(0, 2)] === "" || $("#" + e.attr("id").replace("_default_locale", "")).getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)] === "") {
                                            $("#" + e.attr("id").replace("_default_locale", "")).removeClass("k-valid");
                                            $("#" + e.attr("id").replace("_default_locale", "")).addClass("k-invalid");
                                            return false;
                                        } else {
                                            $("#" + e.attr("id").replace("_default_locale", "")).removeClass("k-invalid");
                                            $("#" + e.attr("id").replace("_default_locale", "")).addClass("k-valid");
                                        }
                                    } else if (e.attr("data-ms-widget-type") === "msSearchpopup") {
                                        if (e.getVal() === "" || $("#" + e.attr("id")).val() === "") {
                                            if ($("#" + e.attr("id")).val() === "") {
                                                e.attr("data-ms-value", "");
                                            };
                                            return false;
                                        }
                                    } else if (e.attr("data-ms-widget-type") === "msMobileNumber") {
                                        if (e.getVal() === "" || $("#" + e.attr("id")).val() === "" || $("#" + e.attr("id") + "_country_code").val() === "") {
                                            return false;
                                        }
                                    } else {
                                        if (e.getVal() === "") {
                                            return false;
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMaxlength: function (e) {
                            try {
                                if (e.attr("data-ms-widget-type") === "msMlingualtextarea") {
                                    if (e.attr("maxlength") !== "") {
                                        if (e.val().length > parseInt(e.attr("maxlength"))) {
                                            $("#" + e.attr("id") + "_default_locale").removeClass("k-valid");
                                            $("#" + e.attr("id") + "_default_locale").addClass("k-invalid");
                                            return false;
                                        } else {
                                            $("#" + e.attr("id") + "_default_locale").removeClass("k-invalid");
                                            $("#" + e.attr("id") + "_default_locale").addClass("k-valid");
                                        }
                                    }
                                } else if (e.attr("id") !== undefined && $("#" + e.attr("id").replace("_default_locale", "")).attr("data-ms-widget-type") === "msMlingualtextarea") {
                                    if ($("#" + e.attr("id").replace("_default_locale", "")).attr("maxlength") !== "") {
                                        if ($("#" + e.attr("id").replace("_default_locale", "")).val().length > parseInt($("#" + e.attr("id").replace("_default_locale", "")).attr("maxlength"))) {
                                            $("#" + e.attr("id").replace("_default_locale", "")).removeClass("k-valid");
                                            $("#" + e.attr("id").replace("_default_locale", "")).addClass("k-invalid");
                                            return false;
                                        } else {
                                            $("#" + e.attr("id").replace("_default_locale", "")).removeClass("k-invalid");
                                            $("#" + e.attr("id").replace("_default_locale", "")).addClass("k-valid");
                                        }
                                    }
                                } else {
                                    if (e.attr("maxlength") !== undefined && e.attr("maxlength") !== "") {
                                        if (e.val().length > parseInt(e.attr("maxlength"))) {
                                            return false;
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMinlength: function (e) {
                            try {
                                if (e.attr("data-ms-widget-type") === "msMlingualtextarea") {
                                    if (e.attr("minlength") !== "") {
                                        if (e.val().length < parseInt(e.attr("minlength"))) {
                                            $("#" + e.attr("id") + "_default_locale").removeClass("k-valid");
                                            $("#" + e.attr("id") + "_default_locale").addClass("k-invalid");
                                            return false;
                                        } else {
                                            $("#" + e.attr("id") + "_default_locale").removeClass("k-invalid");
                                            $("#" + e.attr("id") + "_default_locale").addClass("k-valid");
                                        }
                                    }
                                } else if (e.attr("id") !== undefined && $("#" + e.attr("id").replace("_default_locale", "")).attr("data-ms-widget-type") === "msMlingualtextarea") {
                                    if ($("#" + e.attr("id").replace("_default_locale", "")).attr("minlength") !== "") {
                                        if ($("#" + e.attr("id").replace("_default_locale", "")).val().length < parseInt($("#" + e.attr("id").replace("_default_locale", "")).attr("minlength"))) {
                                            $("#" + e.attr("id").replace("_default_locale", "")).removeClass("k-valid");
                                            $("#" + e.attr("id").replace("_default_locale", "")).addClass("k-invalid");
                                            return false;
                                        } else {
                                            $("#" + e.attr("id").replace("_default_locale", "")).removeClass("k-invalid");
                                            $("#" + e.attr("id").replace("_default_locale", "")).addClass("k-valid");
                                        }
                                    }
                                } else if (e.attr("data-ms-widget-type") === "msLoop") {
                                    if (e.attr("data-ms-widget-minLimit") !== 0) {
                                        if (mService.widgets.variable.msLoop.dataSrc[e.attr("id")].data().length < e.attr("data-ms-widget-minLimit")) {
                                            return false;
                                        }
                                    }
                                } else if (e.attr("data-ms-widget-type") === "msCamera" || e.attr("data-ms-widget-type") === "msGallery" || e.attr("data-ms-widget-type") === "msImagepicker" || e.attr("data-ms-widget-type") === "msAttachment") {
                                    if (e.attr("data-ms-widget-minLimit") !== 0) {
                                        if (e.attr("data-ms-count") < e.attr("data-ms-widget-minLimit")) {
                                            return false;
                                        }
                                    }
                                } else {
                                    if (e.attr("minlength") !== undefined && e.attr("minlength") !== "") {
                                        if (e.val().length < parseInt(e.attr("minlength"))) {
                                            return false;
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msPattern: function (e) {
                            try {
                                if (e.attr("data-ms-rule-pattern") !== undefined) {
                                    if (e.val() !== "") {
                                        if (e.attr("data-ms-rule-patternmatchcase") === "EQ") {
                                            if (!e.val().match(RegExp(e.attr("data-ms-rule-pattern").substring(1, e.attr("data-ms-rule-pattern").length - 1)))) {
                                                return false;
                                            }
                                        } else if (e.attr("data-ms-rule-patternmatchcase") === "NEQ") {
                                            if (e.val().match(RegExp(e.attr("data-ms-rule-pattern").substring(1, e.attr("data-ms-rule-pattern").length - 1)))) {
                                                return false;
                                            }
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msContactNumber: function (e) {
                            try {
                                if (e.attr("type") === "tel") {
                                    if (e.val() !== "") {
                                        if (!e.val().match(/^[0-9\s-+()]*$/)) {
                                            return false;
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msComboboxData: function (e) {
                            var data;
                            try {
                                if (e.attr("data-ms-widget-type") === "msCombobox") {
                                    data = e.data("kendoComboBox");
                                    if (data.value() && data.selectedIndex == -1) {
                                        data.focus();
                                        return false;
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        email: function (e) {
                            try {
                                if (e.attr("type") === "email") {
                                    if (e.val() !== "") {
                                        if (!e.val().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                                            return false;
                                        }
                                    }
                                };
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    },
                    messages: {
                        email: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("email");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMandatory: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msMandatory");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMaxlength: function (e) {
                            try {
                                if (e.attr("id") !== undefined && $("#" + e.attr("id").replace("_default_locale", "")).attr("data-ms-widget-type") === "msMlingualtextarea") {
                                    return mService.config.rule.util.showMessage("msMaxlength", {
                                        length: $("#" + e.attr("id").replace("_default_locale", "")).attr("maxlength")
                                    });
                                } else {
                                    return mService.config.rule.util.showMessage("msMaxlength", {
                                        length: e.attr("maxlength")
                                    });
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMinlength: function (e) {
                            try {
                                if (e.attr("id") !== undefined && $("#" + e.attr("id").replace("_default_locale", "")).attr("data-ms-widget-type") === "msMlingualtextarea") {
                                    return mService.config.rule.util.showMessage("msMinlength", {
                                        length: $("#" + e.attr("id").replace("_default_locale", "")).attr("minlength")
                                    });
                                } else if (e.attr("data-ms-widget-type") === "msLoop") {
                                    return mService.config.rule.util.showMessage("msLoop_msMinlength", {
                                        length: e.attr("data-ms-widget-minLimit")
                                    });
                                } else if (e.attr("data-ms-widget-type") === "msCamera" || e.attr("data-ms-widget-type") === "msGallery") {
                                    return mService.config.rule.util.showMessage("msCamera_msMinlength", {
                                        length: e.attr("data-ms-widget-minLimit")
                                    });
                                } else if (e.attr("data-ms-widget-type") === "msImagepicker") {
                                    return mService.config.rule.util.showMessage("msImagepicker_msMinlength", {
                                        length: e.attr("data-ms-widget-minLimit")
                                    });
                                } else if (e.attr("data-ms-widget-type") === "msAttachment") {
                                    return mService.config.rule.util.showMessage("msAttachment_msMinlength", {
                                        length: e.attr("data-ms-widget-minLimit")
                                    });
                                } else {
                                    return mService.config.rule.util.showMessage("msMinlength", {
                                        length: e.attr("minlength")
                                    });
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msPattern: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msPattern");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msContactNumber: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msContactNumber");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msComboboxData: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msComboboxData");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msLanguage: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msLanguage");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMobileNumberMin: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msMobileNumberMin");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMobileNumberCodeMin: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msMobileNumberCodeMin");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMobileNumberMax: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msMobileNumberMax");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMobileNumberCodeMax: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msMobileNumberCodeMax");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        msMobileNumberCodeCheck: function (e) {
                            try {
                                return mService.config.rule.util.showMessage("msMobileNumberCodeCheck");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    }
                });
                mService.config.rule.validator = $("#" + id).data("kendoValidator");
                return $("#" + id).data("kendoValidator");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        executeRuleStatements: function (ruleObject) {
            var currentConfig,
            currentObjectConfig,
            currentEventConfig,
            currentFieldConfig,
            ruleArray,
            ruleCounter,
            currentRule,
            currentAction,
            returnValue,
            controllerObj;
            try {
                returnValue = true;
                controllerObj = mService.config.controller.getControllerObj(ruleObject.screenID);
                if (controllerObj !== undefined) {
                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                        ruleObject.screenID = ruleObject.screenID.replace("_chat", "").replace("_list", "");
                        ruleObject.fieldID = ruleObject.fieldID.replace("_chat", "").replace("_list", "");
                    }
                };
                currentConfig = mService.config.rule.src[ruleObject.screenID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()];
                if (currentConfig != undefined) {
                    currentObjectConfig = $.grep(currentConfig.object, function (element, index) {
                        try {
                            return element.name == ruleObject.objectID;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    })[0];
                    if (currentObjectConfig != undefined) {
                        currentEventConfig = $.grep(currentObjectConfig.event, function (element, index) {
                            try {
                                return element.name == ruleObject.eventID;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        })[0];
                        if (currentEventConfig != undefined) {
                            currentFieldConfig = $.grep(currentEventConfig.field, function (element, index) {
                                try {
                                    return element.name == ruleObject.fieldID;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            })[0];
                            if (currentFieldConfig != undefined) {
                                ruleArray = currentFieldConfig.rule;
                                for (ruleCounter = 1; ruleCounter <= ruleArray.length; ruleCounter++) {
                                    currentRule = $.grep(ruleArray, function (element, index) {
                                        try {
                                            return element.order == ruleCounter.toString();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    })[0];
                                    if (currentRule != undefined) {
                                        if (currentRule.ruleStatements.conditionalBlock.executeService != "") {
                                            mService.config.rule.executeServiceRequest(currentRule.ruleStatements.conditionalBlock.executeService);
                                        };
                                        currentAction = mService.config.rule.getActionString(currentRule.ruleStatements.conditionalBlock, ruleObject.uid);
                                        if (ruleObject.objectID == "button") {
                                            if (currentAction.indexOf("CONTINUE") != -1) {
                                                returnValue = true;
                                                mService.config.rule.applyRuleActions(currentAction.substring(0, currentAction.indexOf("CONTINUE")), ruleObject.uid);
                                            } else {
                                                returnValue = false;
                                                mService.config.rule.applyRuleActions(currentAction, ruleObject.uid);
                                            }
                                        } else {
                                            mService.config.rule.applyRuleActions(currentAction, ruleObject.uid);
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                return returnValue;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        executeServiceRequest: function (serviceString) {
            var sourceVariable,
            inputXMLDocument,
            inputXMLString,
            childNodesCounter;
            try {
                sourceVariable = serviceString.substring((serviceString.indexOf("SET") + 3), serviceString.indexOf("=")).trim().substring(1);
                serviceString = serviceString.substring(serviceString.indexOf("EXECUTE_SERVICE"));
                inputXMLDocument = loadXMLString(serviceString.substring((serviceString.indexOf("[") + 1), serviceString.lastIndexOf("]")).trim());
                inputXMLString = "<inputparam>";
                for (childNodesCounter = 0; childNodesCounter < inputXMLDocument.childNodes[0].childNodes.length; childNodesCounter++) {
                    inputXMLString += "<" + inputXMLDocument.childNodes[0].childNodes[childNodesCounter].tagName + ">";
                    if (inputXMLDocument.childNodes[0].childNodes[childNodesCounter].childNodes[0] != undefined) {
                        inputXMLString += mService.util.getTransformedValue(inputXMLDocument.childNodes[0].childNodes[childNodesCounter].childNodes[0].nodeValue);
                    };
                    inputXMLString += "</" + inputXMLDocument.childNodes[0].childNodes[childNodesCounter].tagName + ">";
                };
                inputXMLString += "</inputparam>";
                eval(sourceVariable + " = ConvertXMLStringToJSONArray(executeService_retrieve_listof_values_for_searchcondition({p_inputparam_xml: inputXMLString}))");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        get: function (id, success, failure) {
            var ruleSrcKey,
            controllerObj;
            try {
                controllerObj = mService.config.controller.getControllerObj(id);
                if (controllerObj !== undefined) {
                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                        ruleSrcKey = id.replace("_chat", "") + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                        if (mService.app.channel === "web") {
                            id = id.replace("_chat", "");
                        }
                    } else {
                        ruleSrcKey = id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                    };
                } else {
                    ruleSrcKey = id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                };
                if (mService.config.rule.src[ruleSrcKey] === undefined) {
                    if (mService.app.channel === "web") {
                        mService.api.configuration.get(id + ".txt", "configuration", "rule", function (configData) {
                            try {
                                controllerObj = mService.config.controller.getControllerObj(id);
                                if (controllerObj !== undefined) {
                                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                        ruleSrcKey = id.replace("_chat", "") + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                                    } else {
                                        ruleSrcKey = id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                                    };
                                } else {
                                    ruleSrcKey = id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                                };
                                mService.config.rule.src[ruleSrcKey] = mService.config.rule.getObject(id, configData);
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.config.rule.getMobileConfig(id, ruleSrcKey, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                if (controllerObj !== undefined) {
                                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                        ruleSrcKey = id.replace("_chat", "") + "_" + mService.app.getClientId();
                                    } else {
                                        ruleSrcKey = id + "_" + mService.app.getClientId();
                                    };
                                } else {
                                    ruleSrcKey = id + "_" + mService.app.getClientId();
                                };
                                mService.config.rule.getMobileConfig(id, ruleSrcKey, function () {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        if (controllerObj !== undefined) {
                                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                                ruleSrcKey = id.replace("_chat", "") + "_" + mService.app.getClientGroup();
                                            } else {
                                                ruleSrcKey = id;
                                                 + "_" + mService.app.getClientGroup();
                                            };
                                        } else {
                                            ruleSrcKey = id + "_" + mService.app.getClientGroup();
                                        };
                                        mService.config.rule.getMobileConfig(id, ruleSrcKey, function () {
                                            try {
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                if (controllerObj !== undefined) {
                                                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                                        ruleSrcKey = id.replace("_chat", "") + "_" + mService.app.getVertical();
                                                    } else {
                                                        ruleSrcKey = id + "_" + mService.app.getVertical();
                                                    };
                                                } else {
                                                    ruleSrcKey = id + "_" + mService.app.getVertical();
                                                };
                                                mService.config.rule.getMobileConfig(id, ruleSrcKey, function () {
                                                    try {
                                                        success();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        if (controllerObj !== undefined) {
                                                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                                                ruleSrcKey = id.replace("_chat", "") + "_" + mService.app.getSolution();
                                                            } else {
                                                                ruleSrcKey = id + "_" + mService.app.getSolution();
                                                            };
                                                        } else {
                                                            ruleSrcKey = id + "_" + mService.app.getSolution();
                                                        };
                                                        mService.config.rule.getMobileConfig(id, ruleSrcKey, function () {
                                                            try {
                                                                success();
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                if (controllerObj !== undefined) {
                                                                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                                                        ruleSrcKey = id.replace("_chat", "");
                                                                    } else {
                                                                        ruleSrcKey = id;
                                                                    };
                                                                } else {
                                                                    ruleSrcKey = id;
                                                                };
                                                                mService.config.rule.getMobileConfig(id, ruleSrcKey, function () {
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
                                });
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
        getActionString: function (conditionalBlock, uid) {
            var actionString;
            try {
                actionString = "";
                if (conditionalBlock.condition === "") {
                    actionString = conditionalBlock.true;
                } else {
                    if (mService.config.rule.evaluateConditionString(conditionalBlock.condition, uid)) {
                        if (typeof(conditionalBlock.true) === "string") {
                            actionString = conditionalBlock.true;
                        } else {
                            actionString = mService.config.rule.getActionString(conditionalBlock.true, uid);
                        }
                    } else {
                        if (typeof(conditionalBlock.false) === "string") {
                            actionString = conditionalBlock.false;
                        } else {
                            actionString = mService.config.rule.getActionString(conditionalBlock.false, uid);
                        }
                    }
                };
                return actionString;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getConditionalBlockObject: function (ruleString) {
            var returnObject,
            delimiter,
            trueBlock,
            falseBlock;
            try {
                returnObject = {
                    executeService: "",
                    condition: "",
                    true: "",
                    false: ""
                };
                if (ruleString.trim() !== "") {
                    if (ruleString.trim().indexOf("SET") === 0) {
                        returnObject.executeService = ruleString.trim().substring(0, ruleString.trim().indexOf("\n") + 1).trim();
                        ruleString = ruleString.trim().substring(ruleString.trim().indexOf("\n") + 1).trim();
                    } else if (ruleString.trim().indexOf("APPLY") === 0) {
                        returnObject.true = ruleString.trim().substring(0, ruleString.trim().length);
                        ruleString = ruleString.trim().substring(ruleString.trim().length + 1).trim();
                    } else if (ruleString.trim().indexOf("IF") === 0) {
                        delimiter = ruleString.substring(0, ruleString.indexOf("IF"));
                        returnObject.condition = ruleString.trim().substring(0, ruleString.trim().indexOf("\n") + 1).trim();
                        trueBlock = ruleString.substring(ruleString.indexOf(delimiter + "BEGIN") + 5 + delimiter.length, ruleString.indexOf(delimiter + "END"));
                        if (trueBlock.trim().indexOf("APPLY") !== 0 && trueBlock.trim().indexOf("ALERT") !== 0 && trueBlock.trim().indexOf("CONTINUE") !== 0) {
                            returnObject.true = mService.config.rule.getConditionalBlockObject(trueBlock);
                        } else {
                            returnObject.true = trueBlock.trim();
                        };
                        if (ruleString.indexOf(delimiter + "ELSE") !== -1) {
                            falseBlock = ruleString.substring(ruleString.indexOf(delimiter + "ELSE") + 4 + delimiter.length, ruleString.lastIndexOf(delimiter + "END"));
                            falseBlock = falseBlock.substring(falseBlock.indexOf(delimiter + "BEGIN") + 5 + delimiter.length);
                            if (falseBlock.trim().indexOf("APPLY") !== 0 && falseBlock.trim().indexOf("ALERT") !== 0 && falseBlock.trim().indexOf("CONTINUE") !== 0) {
                                returnObject.false = mService.config.rule.getConditionalBlockObject(falseBlock);
                            } else {
                                returnObject.false = falseBlock.trim();
                            }
                        }
                    }
                };
                return returnObject;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getMobileConfig: function (scrID, ruleSrcKey, success, failure) {
            var filePath,
            controllerObj;
            try {
                if (mService.util.isContainRScreen(scrID) && mService.containR.variable[scrID] !== undefined && mService.containR.variable[scrID].draftInd === "true") {
                    filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo + "/" + "rule_" + ruleSrcKey + ".txt";
                } else {
                    filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "rule" + "/" + "rule_" + ruleSrcKey + ".txt";
                };
                mService.nfs.readFile(filePath, function (data) {
                    try {
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj !== undefined) {
                            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                ruleSrcKey = scrID.replace("_chat", "") + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                            } else {
                                ruleSrcKey = scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                            };
                        } else {
                            ruleSrcKey = scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                        };
                        mService.config.rule.src[ruleSrcKey] = mService.config.rule.getObject(scrID, data);
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
        getObject: function (id, configString) {
            var currentScreenConfig,
            beginIndex,
            endIndex,
            attributeString,
            grepReturn,
            objectString,
            objectObject,
            eventString,
            eventObject,
            fieldString,
            fieldObject,
            ruleString,
            ruleObject;
            try {
                currentScreenConfig = {
                    screenID: id,
                    object: []
                };
                while (true) {
                    beginIndex = configString.indexOf("OBJECT_BEGIN");
                    endIndex = configString.indexOf("OBJECT_END");
                    if (endIndex !== -1) {
                        objectObject = {};
                        objectString = configString.substring(beginIndex, endIndex + 10);
                        configString = configString.substring(endIndex + 10);
                        attributeString = objectString.substring(objectString.indexOf("[") + 1, objectString.indexOf("]"));
                        grepReturn = $.grep(attributeString.split(","), function (element, index) {
                            try {
                                return element.indexOf("NAME") !== -1;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        if (grepReturn.length !== 0) {
                            objectObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                        } else {
                            objectObject.name = "";
                        };
                        objectObject.event = [];
                        while (true) {
                            beginIndex = objectString.indexOf("EVENT_BEGIN");
                            endIndex = objectString.indexOf("EVENT_END");
                            if (endIndex !== -1) {
                                eventObject = {};
                                eventString = objectString.substring(beginIndex, endIndex + 9);
                                objectString = objectString.substring(endIndex + 9);
                                attributeString = eventString.substring(eventString.indexOf("[") + 1, eventString.indexOf("]"));
                                grepReturn = $.grep(attributeString.split(","), function (element, index) {
                                    try {
                                        return element.indexOf("NAME") !== -1;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                                if (grepReturn.length !== 0) {
                                    eventObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                                } else {
                                    eventObject.name = "";
                                };
                                eventObject.field = [];
                                while (true) {
                                    beginIndex = eventString.indexOf("FIELD_BEGIN");
                                    endIndex = eventString.indexOf("FIELD_END");
                                    if (endIndex !== -1) {
                                        fieldObject = {};
                                        fieldString = eventString.substring(beginIndex, endIndex + 9);
                                        eventString = eventString.substring(endIndex + 9);
                                        attributeString = fieldString.substring(fieldString.indexOf("[") + 1, fieldString.indexOf("]"));
                                        grepReturn = $.grep(attributeString.split(","), function (element, index) {
                                            try {
                                                return element.indexOf("NAME") !== -1;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                        if (grepReturn.length !== 0) {
                                            fieldObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                                        } else {
                                            fieldObject.name = "";
                                        };
                                        fieldObject.rule = [];
                                        while (true) {
                                            beginIndex = fieldString.indexOf("RULE_BEGIN");
                                            endIndex = fieldString.indexOf("RULE_END");
                                            if (endIndex !== -1) {
                                                ruleObject = {};
                                                ruleString = fieldString.substring(beginIndex, endIndex + 8);
                                                fieldString = fieldString.substring(endIndex + 8);
                                                attributeString = ruleString.substring(ruleString.indexOf("[") + 1, ruleString.indexOf("]"));
                                                grepReturn = $.grep(attributeString.split(","), function (element, index) {
                                                    try {
                                                        return element.indexOf("NAME") !== -1;
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                                if (grepReturn.length !== 0) {
                                                    ruleObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                                                } else {
                                                    ruleObject.name = "";
                                                };
                                                grepReturn = $.grep(attributeString.split(","), function (element, index) {
                                                    try {
                                                        return element.indexOf("ORDER") !== -1;
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                                if (grepReturn.length !== 0) {
                                                    ruleObject.order = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                                                } else {
                                                    ruleObject.order = "";
                                                };
                                                ruleObject.ruleStatements = {
                                                    conditionalBlock: mService.config.rule.getConditionalBlockObject(ruleString.substring(ruleString.indexOf("]") + 1, ruleString.indexOf("RULE_END")))
                                                };
                                            } else {
                                                break;
                                            };
                                            fieldObject.rule.push(ruleObject);
                                        }
                                    } else {
                                        break;
                                    };
                                    eventObject.field.push(fieldObject);
                                }
                            } else {
                                break;
                            };
                            objectObject.event.push(eventObject);
                        }
                    } else {
                        break;
                    };
                    currentScreenConfig.object.push(objectObject);
                };
                return currentScreenConfig;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getOperatorForCode: function (code) {
            var operator;
            try {
                operator = code;
                if (code === "AND") {
                    operator = "&&";
                } else if (code === "OR") {
                    operator = "||";
                } else if (code === "EQ") {
                    operator = "==";
                } else if (code === "NEQ") {
                    operator = "!=";
                };
                return operator;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getWebConfig: function (scrID, ruleSrcKey, success, failure) {
            var controllerObj;
            try {
                $.ajax({
                    url: mService.app.clientURL + "/" + "www" + "/" + "configuration" + "/" + "rule" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "rule_" + ruleSrcKey + ".txt",
                    async: false,
                    method: "GET",
                    dataType: "text",
                    success: function (response) {
                        try {
                            controllerObj = mService.config.controller.getControllerObj(scrID);
                            if (controllerObj !== undefined) {
                                if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                    ruleSrcKey = scrID.replace("_chat", "") + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                                } else {
                                    ruleSrcKey = scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                                };
                            } else {
                                ruleSrcKey = scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                            };
                            mService.config.rule.src[ruleSrcKey] = mService.config.rule.getObject(scrID, response);
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function () {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        src: {},
        util: {
            showMessage: function (ruleKey, inputObj) {
                var labelSrcKey,
                labelSrc,
                message;
                try {
                    if (mService.app.getCountryCode() !== "") {
                        labelSrc = "system_messages";
                        labelSrcKey = "system_messages" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId();
                    } else {
                        labelSrc = "pre_signup_messages";
                        labelSrcKey = "pre_signup_messages";
                    };
                    mService.config.label.get(labelSrc, function () {
                        try {
                            message = mService.config.template.getTransformedMessage(mService.config.label.src[labelSrcKey]["rule"][ruleKey], inputObj);
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
                    return message;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            changeLabel: function (widget, groupID, labelID, uid) {
                var labelEle,
                labelSpanEle;
                try {
                    if ($(widget + uid).attr("data-ms-widget-msloop") === undefined || $(widget + uid).attr("data-ms-widget-msloop") === "") {
                        uid = "";
                    };
                    labelEle = $(widget + "_group" + uid).find("label[data-ms-lbl-for='" + widget.replace("#", "") + "']");
                    labelSpanEle = $(labelEle[0]).find(".ms_widgt_lbl_field");
                    if (groupID !== "") {
                        $(labelSpanEle[0]).attr("data-ms-lbl-grpid", groupID);
                    };
                    $(labelSpanEle[0]).attr("data-ms-lbl-id", labelID);
                    $(labelSpanEle[0]).removeAttr("data-ms-lbl-locale");
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    template: {
        get: function (subMenuID, success, failure) {
            var templateSrcKey;
            try {
                templateSrcKey = subMenuID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                if (mService.app.channel === "web") {
                    if ($("#" + "initial_" + subMenuID + "_template").length === 0) {
                        mService.api.configuration.get(subMenuID + ".html", "configuration", "template", function (configData) {
                            try {
                                $("body").append("<div id='initial_" + subMenuID + "_template'>" + configData + "</div>");
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        success();
                    }
                } else {
                    templateSrcKey = "template_" + subMenuID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                    mService.config.template.getMobileConfig(subMenuID, templateSrcKey, function () {
                        try {
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            templateSrcKey = "template_" + subMenuID + "_" + mService.app.getClientId();
                            mService.config.template.getMobileConfig(subMenuID, templateSrcKey, function () {
                                try {
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    templateSrcKey = "template_" + subMenuID + "_" + mService.app.getClientGroup();
                                    mService.config.template.getMobileConfig(subMenuID, templateSrcKey, function () {
                                        try {
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            templateSrcKey = "template_" + subMenuID + "_" + mService.app.getVertical();
                                            mService.config.template.getMobileConfig(subMenuID, templateSrcKey, function () {
                                                try {
                                                    success();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    templateSrcKey = "template_" + subMenuID + "_" + mService.app.getSolution();
                                                    mService.config.template.getMobileConfig(subMenuID, templateSrcKey, function () {
                                                        try {
                                                            success();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            templateSrcKey = "template_" + subMenuID;
                                                            mService.config.template.getMobileConfig(subMenuID, templateSrcKey, function () {
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
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getMobileConfig: function (scrID, templateSrcKey, success, failure) {
            var filePath;
            try {
                if ($("#" + "initial_" + scrID + "_template").length === 0) {
                    if (mService.util.isContainRScreen(scrID) && mService.containR.variable[scrID] !== undefined && mService.containR.variable[scrID].draftInd === "true") {
                        filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo + "/" + templateSrcKey + ".html";
                    } else {
                        filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "template" + "/" + templateSrcKey + ".html";
                    };
                    mService.nfs.readFile(filePath, function (data) {
                        try {
                            $("body").append("<div id='initial_" + scrID + "_template'>" + data + "</div>");
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
        },
        getRenderedHtml: function (template, inputObj) {
            try {
                return kendo.render(kendo.template($("#" + template).html().replace(/\n/g, "").replace(/\t/g, "")), (inputObj !== undefined) ? (inputObj) : ({}));
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        getTransformedHtml: function (template, inputObj) {
            try {
                return kendo.template($("#" + template).html().replace(/\n/g, "").replace(/\t/g, ""))((inputObj !== undefined) ? (inputObj) : ({}));
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        getTransformedMessage: function (message, inputObj) {
            try {
                return kendo.template(message)((inputObj !== undefined) ? (inputObj) : ({}));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getWebConfig: function (subMenuID, templateSrcKey, success, failure) {
            try {
                if ($("#" + "initial_" + subMenuID + "_template").length === 0) {
                    $.ajax({
                        url: mService.app.clientURL + "/" + "www" + "/" + "configuration" + "/" + "template" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "template_" + templateSrcKey + ".html",
                        async: false,
                        method: "GET",
                        dataType: "text",
                        contentType: "application/json; charset=utf-8",
                        success: function (response, status) {
                            try {
                                $("body").append("<div id='initial_" + subMenuID + "_template'>" + response + "</div>");
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        error: function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                } else {
                    success();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    ui: {
        get: function (subMenuID, success, failure) {
            var uiSrcKey,
            filePath;
            try {
                uiSrcKey = subMenuID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                if (mService.config.ui.src[uiSrcKey] === undefined) {
                    if (mService.app.channel === "web") {
                        mService.api.configuration.get(subMenuID + ".json", "configuration", "ui", function (configData) {
                            try {
                                mService.config.ui.src[subMenuID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()] = configData;
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.config.ui.getMobileConfig(subMenuID, uiSrcKey, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                uiSrcKey = subMenuID + "_" + mService.app.getClientId();
                                mService.config.ui.getMobileConfig(subMenuID, uiSrcKey, function () {
                                    try {
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        uiSrcKey = subMenuID + "_" + mService.app.getClientGroup();
                                        mService.config.ui.getMobileConfig(subMenuID, uiSrcKey, function () {
                                            try {
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                uiSrcKey = subMenuID + "_" + mService.app.getVertical();
                                                mService.config.ui.getMobileConfig(subMenuID, uiSrcKey, function () {
                                                    try {
                                                        success();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        uiSrcKey = subMenuID + "_" + mService.app.getSolution();
                                                        mService.config.ui.getMobileConfig(subMenuID, uiSrcKey, function () {
                                                            try {
                                                                success();
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                uiSrcKey = subMenuID;
                                                                mService.config.ui.getMobileConfig(subMenuID, uiSrcKey, function () {
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
                                });
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
        getMobileConfig: function (scrID, uiSrcKey, success, failure) {
            var filePath;
            try {
                if (mService.util.isContainRScreen(scrID) && mService.containR.variable[scrID] !== undefined && mService.containR.variable[scrID].draftInd === "true") {
                    filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + scrID + "/" + mService.containR.variable[scrID].transNo + "/" + "ui_" + uiSrcKey + ".html";
                } else {
                    filePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "ui" + "/" + "ui_" + uiSrcKey + ".html";
                };
                mService.nfs.readFile(filePath, function (data) {
                    try {
                        uiSrcKey = scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                        mService.config.ui.src[uiSrcKey] = data;
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
        getSrc: function (scrID) {
            try {
                return mService.config.ui.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()];
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getWebConfig: function (scrID, uiSrcKey, success, failure) {
            try {
                $.ajax({
                    url: mService.app.clientURL + "/" + "www" + "/" + "configuration" + "/" + "ui" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "ui_" + uiSrcKey + ".json",
                    async: false,
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response, status) {
                        try {
                            uiSrcKey = scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                            mService.config.ui.src[uiSrcKey] = response;
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function () {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        render: function (id, configKey) {
            var subMenuID,
            uiSrcKey,
            fieldList,
            index;
            try {
                subMenuID = mService.page.navigation.get.subMenuID();
                uiSrcKey = subMenuID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode();
                fieldList = JSON.parse(JSON.stringify(mService.config.ui.src[uiSrcKey][configKey]));
                $("#" + id).html("");
                for (index = 0; index < fieldList.length; index++) {
                    fieldList[index].scrid = subMenuID;
                    $("#" + id).append("<input id='" + subMenuID + "_" + fieldList[index].id + "' />");
                    $("#" + subMenuID + "_" + fieldList[index].id)[fieldList[index].wtype](fieldList[index]);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        src: {}
    },
    util: {
        loadSubMenuConfig: function (subMenuID, success, failure) {
            try {
                mService.config.controller.get(subMenuID, function () {
                    try {
                        mService.config.ui.get(subMenuID, function () {
                            try {
                                mService.config.template.get(subMenuID, function () {
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
        }
    }
};