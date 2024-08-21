mService.presentR = {
    config: {
        label: {
            apply: function (scrID) {
                try {
                    if (scrID.indexOf("workflow") !== -1) {
                        $("#" + scrID + "_title_lbl").attr("data-ms-lbl-id", mService.containR.variable[scrID].eventVerbID);
                    };
                    mService.config.label.resolve(scrID);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        ui: {
            apply: function (scrID) {
                try {
                    mService.presentR.config.ui.loadFormPages(scrID, true);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            createField: function (iObj) {
                try {
                    $("#" + iObj.field.id)[iObj.field.wtype]($.extend({
                            scrid: iObj.scrid,
                            wtype: iObj.field.wtype
                        }, iObj.field));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            loadFormPages: function (scrID, firstPageIndicator) {
                var subPageList,
                pageIndex,
                pageID,
                tempList,
                subPageWidget,
                widgetsList;
                try {
                    subPageList = $("#" + scrID + "_main_page" + " [data-role = 'page']");
                    pageIndex = (firstPageIndicator) ? 0 : 1;
                    if (firstPageIndicator) {
                        subPageWidget = $("#" + scrID + " [data-ms-widget-type='msSubpage']");
                        if (subPageWidget.length > 0) {
                            mService.containR.pattern.form.init.createWidgets(subPageWidget, scrID);
                        }
                    };
                    for (pageIndex; pageIndex < subPageList.length; pageIndex++) {
                        widgetsList = [];
                        pageID = $(subPageList[pageIndex]).attr("id");
                        tempList = $("#" + pageID).find(mService.widgets.init.wSelector);
                        for (widgetIndex = 0; widgetIndex < tempList.length; widgetIndex++) {
                            if ($(tempList[widgetIndex]).attr("data-ms-widget-prop-msloop") === undefined) {
                                widgetsList.push(tempList[widgetIndex]);
                            }
                        };
                        mService.containR.pattern.form.init.createWidgets(widgetsList, scrID);
                        if (firstPageIndicator) {
                            pageIndex = subPageList.length;
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            loadMenus: function (scrID) {
                var layoutFeatures;
                try {
                    layoutFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                        try {
                            return e.p_parent_feature_group === "HOMELAYOUT";
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    if (layoutFeatures.length >= 1) {
                        $("#" + scrID + "_menu_content").html(mService.presentR.util.getMenuHtml(layoutFeatures, scrID + "_template"));
                    } else {
                        $("#" + scrID + "_menu_content").html("");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    icon: {
        render: function (iconSource) {
            var icon;
            try {
                if (iconSource.indexOf("data:image") === 0) {
                    if ($("[data-ms-layout-role='tile']").length !== 0) {
                        icon = "<img src='" + iconSource + "' style='height: 40%;'/>";
                    } else {
                        icon = "<img src='" + iconSource + "' style='height: 20px;'/>";
                    }
                } else {
                    icon = "<i class='" + iconSource + "'></i>";
                };
                return icon;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    layout: {
        activate: function (scrID) {
            var layoutFeatures,
            controllerObj,
            patternScrID,
            titleEle,
            notification,
            settings,
            tempControllerObj,
            searchViewPatternInd;
            try {
                searchViewPatternInd = false;
                layoutFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                    try {
                        return e.p_parent_feature_group === "HOMELAYOUT";
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                if (scrID !== "/" && $("#" + scrID + " [data-ms-layout-role='tile']").length !== 0) {
                    notification = $("#" + scrID).find("#home_in_app_feature_my_notification");
                    settings = $("#" + scrID).find("#home_in_app_feature_my_settings");
                    if (layoutFeatures.length >= 1) {
                        if (layoutFeatures.length > 1) {
                            $("#ms_home_client_brand_logo").hide();
                            if (notification !== undefined) {
                                $(notification).hide();
                            };
                            if (settings !== undefined) {
                                $(settings).hide();
                            };
                        } else {
                            $("#ms_home_client_brand_logo").hide();
                            if (notification !== undefined) {
                                $(notification).show();
                            };
                            if (settings !== undefined) {
                                $(settings).show();
                            };
                        };
                        if (mService.util.isContainRScreen(scrID)) {
                            controllerObj = mService.config.controller.getControllerObj(scrID);
                            if (controllerObj !== undefined) {
                                if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                    patternScrID = scrID.replace("_list", "").replace("_chat", "");
                                    scrIDSplit = scrID.split("_");
                                    tempControllerObj = mService.config.controller.getControllerObj(scrID.replace("_list", ""));
                                    if (tempControllerObj.pattern_name === "searchview") {
                                        searchViewPatternInd = true;
                                    }
                                }
                            }
                        };
                        if (mService.app.getScreenId() === "home_tile") {
                            mService.presentR.util.loadLabelFiles();
                            mService.presentR.config.ui.loadMenus("home_tile");
                        };
                        if (patternScrID === undefined || searchViewPatternInd) {
                            $("#" + scrID + " [data-ms-lbl-id='title']").attr("data-ms-lbl-src", (searchViewPatternInd) ? (scrID.replace("_list", "")) : (scrID)).removeAttr("data-ms-lbl-locale").removeAttr("title");
                            $("#" + scrID + " [data-ms-lbl-id='list_title']").attr("data-ms-lbl-id", "title").attr("data-ms-lbl-src", (searchViewPatternInd) ? (scrID.replace("_list", "")) : (scrID)).removeAttr("data-ms-lbl-locale").removeAttr("title");
                        } else {
                            titleEle = $("#" + scrID + " [data-ms-lbl-id='title']");
                            if (titleEle.length === 0) {
                                titleEle = $("#" + scrID + " [data-ms-lbl-id='list_title']");
                            };
                            $(titleEle).attr("data-ms-lbl-src", patternScrID).attr("data-ms-lbl-id", scrIDSplit[scrIDSplit.length - 1] + "_title").removeAttr("data-ms-lbl-locale").removeAttr("title");
                        };
                        $("#" + scrID + " [data-ms-layout-role='call_info_popup']").attr("data-ms-call_info-for", scrID);
                    }
                } else {
                    if (layoutFeatures.length > 1) {
                        if (mService.util.isContainRScreen(scrID)) {
                            controllerObj = mService.config.controller.getControllerObj(scrID);
                            if (controllerObj !== undefined) {
                                if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                    patternScrID = scrID.replace("_list", "").replace("_chat", "");
                                    scrIDSplit = scrID.split("_");
                                    tempControllerObj = mService.config.controller.getControllerObj(scrID.replace("_list", ""));
                                    if (tempControllerObj.pattern_name === "searchview") {
                                        searchViewPatternInd = true;
                                    }
                                }
                            }
                        };
                        if (scrID !== "/" && $("#" + scrID + " [data-ms-layout-role='msTabstrip']").length !== 0) {
                            $("#" + scrID + " header [data-role='tabstrip']").show();
                            $("#" + scrID + " [data-ms-layout-role='msTabstrip']").html(mService.presentR.layout.getTabHtml(layoutFeatures));
                            if (patternScrID === undefined || searchViewPatternInd) {
                                $("#" + scrID + " [data-ms-layout-role='msTitle'] [data-ms-lbl-id='title'],[data-ms-lbl-id='list_title']").attr("data-ms-lbl-src", (searchViewPatternInd) ? (scrID.replace("_list", "")) : (scrID)).removeAttr("data-ms-lbl-locale").removeAttr("title");
                                $("#" + scrID + " [data-ms-layout-role='msTitle'] [data-ms-lbl-id='list_title']").attr("data-ms-lbl-id", "title").attr("data-ms-lbl-src", (searchViewPatternInd) ? (scrID.replace("_list", "")) : (scrID)).removeAttr("data-ms-lbl-locale").removeAttr("title");
                            } else {
                                titleEle = $("#" + scrID + " [data-ms-layout-role='msTitle'] [data-ms-lbl-id='title'],[data-ms-lbl-id='list_title']");
                                if (titleEle.length === 0) {
                                    titleEle = $("#" + scrID + " [data-ms-layout-role='msTitle'] [data-ms-lbl-id='list_title']");
                                };
                                $(titleEle).attr("data-ms-lbl-src", patternScrID).attr("data-ms-lbl-id", scrIDSplit[scrIDSplit.length - 1] + "_title").removeAttr("data-ms-lbl-locale").removeAttr("title");
                            };
                            $("#" + scrID + " [data-ms-layout-role='msTabstrip'] [data-ms-link-group='home_layout']").removeClass("km-state-active");
                            $("#" + scrID + " [data-ms-layout-role='msTabstrip'] [data-ms-link-group='home_layout'][data-ms-link-role='" + scrID + "']").addClass("km-state-active");
                            $("#" + scrID + " [data-ms-layout-role='call_info_popup']").attr("data-ms-call_info-for", scrID);
                        }
                    } else {
                        if ($(scrID !== "/" && "#" + scrID + " header [data-role='tabstrip']").length !== 0) {
                            $("#" + scrID + " header [data-role='tabstrip']").hide();
                            $("#" + scrID + " [data-ms-layout-role='msTitle'] [data-ms-lbl-id='title'],[data-ms-lbl-id='list_title']").attr("data-ms-lbl-src", scrID).removeAttr("data-ms-lbl-locale").removeAttr("title");
                            $("#" + scrID + " [data-ms-layout-role='call_info_popup']").attr("data-ms-call_info-for", scrID);
                            if (mService.util.isContainRScreen(scrID)) {
                                controllerObj = mService.config.controller.getControllerObj(scrID);
                                if (controllerObj !== undefined && controllerObj.pattern === undefined) {
                                    $("#" + scrID + " [data-ms-layout-role='msTitle'] [data-ms-lbl-id='list_title']").attr("data-ms-lbl-id", "title");
                                }
                            }
                        }
                    }
                }
                mService.config.label.resolve();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getTabHtml: function (layoutFeatures) {
            var count,
            displayOrder,
            currentFeature,
            returnHtml;
            try {
                count = 0;
                displayOrder = 1;
                returnHtml = "";
                while (true) {
                    if (count === layoutFeatures.length) {
                        break;
                    } else {
                        currentFeature = $.grep(layoutFeatures, function (e, i) {
                            try {
                                return e.p_child_display_order === displayOrder.toString();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        })[0];
                        displayOrder++;
                        if (currentFeature !== undefined) {
                            count++;
                            returnHtml += kendo.template($("#home_layout_tabstrip_feature").html())({
                                linkRole: currentFeature.p_child_screen_id
                            });
                        }
                    }
                };
                return returnHtml;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    load: {
        icons: {
            fromApp: function (success, failure) {
                try {
                    mService.presentR.util.callAjax("utils/fonts/js/mobile.fonts.reference.json", "json", function (iconConfig) {
                        try {
                            $.extend(true, mService.icons, iconConfig);
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
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            fromLib: function (success, failure) {
                var iconSource;
                try {
                    iconSource = ((mService.app.channel === "web") ? ("lib/fonts/js/web.fonts.reference.json") : ("lib/fonts/js/mobile.fonts.reference.json"));
                    mService.presentR.util.callAjax(iconSource, "json", function (iconConfig) {
                        try {
                            mService.icons = iconConfig;
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
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            fromCvs: function (success, failure) {
                try {
                    if (mService.app.channel === "web") {
                        mService.api.configuration.get("web.fonts.reference.json", "ux", "fonts", function (iconConfig) {
                            try {
                                $.extend(true, mService.icons, JSON.parse(iconConfig));
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
                        mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "fonts" + "/" + "js" + "/" + "mobile.fonts.reference" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json", function (data) {
                            try {
                                $.extend(true, mService.icons, JSON.parse(data));
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "fonts" + "/" + "js" + "/" + "mobile.fonts.reference" + "_" + mService.app.getClientId() + ".json", function (data) {
                                    try {
                                        $.extend(true, mService.icons, JSON.parse(data));
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "fonts" + "/" + "js" + "/" + "mobile.fonts.reference" + "_" + mService.app.getClientGroup() + ".json", function (data) {
                                            try {
                                                $.extend(true, mService.icons, JSON.parse(data));
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "fonts" + "/" + "js" + "/" + "mobile.fonts.reference" + "_" + mService.app.getVertical() + ".json", function (data) {
                                                    try {
                                                        $.extend(true, mService.icons, JSON.parse(data));
                                                        success();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "fonts" + "/" + "js" + "/" + "mobile.fonts.reference" + "_" + mService.app.getSolution() + ".json", function (data) {
                                                            try {
                                                                $.extend(true, mService.icons, JSON.parse(data));
                                                                success();
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "fonts" + "/" + "js" + "/" + "mobile.fonts.reference.json", function (data) {
                                                                    try {
                                                                        $.extend(true, mService.icons, JSON.parse(data));
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
            }
        },
        layout: function (success, failure) {
            try {
                if (mService.app.channel === "web") {
                    mService.api.configuration.get("layout.settings.json", "ux", "", function (layoutConfig) {
                        try {
                            mService.presentR.load.layoutTemplate(JSON.parse(layoutConfig), function () {
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
                    }, function (error) {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    mService.presentR.util.callAjax("ux/layout.settings.json", "json", function (layoutConfig) {
                        try {
                            mService.app.layoutSettingsConfig = layoutConfig;
                            mService.presentR.load.layoutTemplate(layoutConfig, function () {
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
                    }, function (error) {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        layoutTemplate: function (layoutConfig, success, failure) {
            try {
                mService.presentR.util.callAjax("lib/mservice/styles/layout/" + mService.presentR.variable.layoutList[mService.presentR.variable.layoutListCounter] + "." + layoutConfig[mService.presentR.variable.layoutList[mService.presentR.variable.layoutListCounter]] + ".html", "text", function (layoutTemplate) {
                    try {
                        $("body").append(layoutTemplate);
                        mService.presentR.variable.layoutListCounter++;
                        if (mService.presentR.variable.layoutListCounter < mService.presentR.variable.layoutList.length) {
                            mService.presentR.load.layoutTemplate(layoutConfig, function () {
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
                            mService.presentR.variable.layoutListCounter = 0;
                            success();
                        }
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
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        spinner: function (success, failure) {
            try {
                mService.presentR.util.callAjax("lib/mservice/styles/layout/spinner.template.html", "text", function (spinnerTemplate) {
                    $("body").append(spinnerTemplate);
                    success();
                }, function (error) {
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
        theme: function (themeFor, success, failure) {
            try {
                if (mService.app.channel === "web") {
                    mService.api.configuration.get("theme.settings.json", "ux", "", function (themeConfig) {
                        try {
                            themeConfig = JSON.parse(themeConfig);
                            if (themeFor === "app") {
                                mService.presentR.load.themeTemplate(themeConfig, function () {
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
                                mService.presentR.load.patternThemeTemplate(themeFor, themeConfig, function () {
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
                            }
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
                    path = mService.presentR.util.callAjax("ux/theme.settings.json", "json", function (themeConfig) {
                        try {
                            if (themeFor === "app") {
                                mService.presentR.load.themeTemplate(themeConfig, function () {
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
                                mService.presentR.load.patternThemeTemplate(themeFor, themeConfig, function () {
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
                            }
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
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        themeTemplate: function (themeConfig, success, failure) {
            try {
                mService.presentR.util.callAjax("lib/mservice/styles/css/" + mService.presentR.variable.themeList[mService.presentR.variable.themeListCounter] + ".html", "text", function (themeTemplate) {
                    try {
                        if ($("#" + mService.presentR.variable.themeList[mService.presentR.variable.themeListCounter].replace(/\./g, "_")).length !== 0) {
                            $("#" + mService.presentR.variable.themeList[mService.presentR.variable.themeListCounter].replace(/\./g, "_")).remove();
                        };
                        $("body").append(kendo.template(themeTemplate)(themeConfig));
                        mService.presentR.variable.themeListCounter++;
                        if (mService.presentR.variable.themeListCounter < mService.presentR.variable.themeList.length) {
                            mService.presentR.load.themeTemplate(themeConfig, function () {
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
                            mService.presentR.variable.themeListCounter = 0;
                            success();
                        }
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
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        patternThemeTemplate: function (patternName, themeConfig, success, failure) {
            try {
                mService.presentR.util.callAjax("lib/mservice/pattern/" + patternName + "/styles/css/mobile.ms." + patternName + "_pattern_theme.css.template" + ".html", "text", function (themeTemplate) {
                    try {
                        if ($("#mobile_ms_" + patternName + "_pattern_theme_css_template").length !== 0) {
                            $("#mobile_ms_" + patternName + "_pattern_theme_css_template").remove();
                        };
                        $("body").append(kendo.template(themeTemplate)(themeConfig));
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
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    page: {
        refresh: function () {
            try {
                setTimeout(function () {
                    var controllerObj,
                    scrollViewList,
                    index,
                    scrID,
                    patternScrID;
                    try {
                        scrollViewList = $(mService.application.view().id + " [data-role='scrollview']");
                        scrID = mService.app.getScreenId();
                        patternScrID = scrID.replace("_list", "");
                        for (index = 0; index < scrollViewList.length; index++) {
                            $(scrollViewList[index]).data("kendoMobileScrollView").refresh();
                            if (mService.util.isContainRScreen(scrID)) {
                                controllerObj = mService.config.controller.getControllerObj(scrID);
                                if (controllerObj.containR_type === "listview") {
                                    $(scrollViewList[index]).data("kendoMobileScrollView").scrollTo((mService.containR.variable[patternScrID].activePage !== undefined) ? (mService.containR.variable[patternScrID].activePage) : (0));
                                    mService.containR.util.updatePagerInd("", (mService.containR.variable[patternScrID].activePage !== undefined) ? (mService.containR.variable[patternScrID].activePage) : (0), scrID);
                                }
                            }
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, 200);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    pattern: {
        chat: {
            init: function (scrID) {
                var key,
                subKey,
                selectedRecord,
                custom;
                try {
                    key = (mService.containR.variable[scrID].key === undefined) ? (scrID.replace("_chat", "")) : (mService.containR.variable[scrID].key);
                    subKey = (mService.containR.variable[scrID].subKey === undefined) ? ("") : (mService.containR.variable[scrID].subKey);
                    selectedRecord = (mService.containR.variable[scrID].selectedRecord === undefined) ? ("") : (mService.containR.variable[scrID].selectedRecord);
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    custom = {};
                    if (controllerObj.custom !== undefined) {
                        custom = mService.util.getTransformedJSon(JSON.parse(JSON.stringify(controllerObj.custom)));
                    };
                    if (subKey !== "" && selectedRecord === "" && mService.containR.variable[scrID].custom.transaction_ref_no !== undefined && mService.containR.variable[scrID].custom.transaction_ref_no !== "") {
                        mService.containR.util.getCallDetails(scrID.replace("chat", "") + "list", mService.containR.variable[scrID].custom.transaction_ref_no, function (result) {
                            try {
                                if (result === "internet_not_available") {
                                    mService.containR.variable[scrID].selectedRecord = {};
                                    selectedRecord = {
                                        online: "false"
                                    };
                                    mService.app.showToast("internet_connection_error", "system_messages");
                                } else {
                                    mService.containR.variable[scrID].selectedRecord = result;
                                    selectedRecord = result;
                                };
                                $("#" + scrID + "_content").msChat({
                                    scrid: scrID,
                                    key: key,
                                    subKey: subKey,
                                    selectedRecord: selectedRecord,
                                    custom: custom
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#" + scrID + "_content").msChat({
                            scrid: scrID,
                            key: key,
                            subKey: subKey,
                            selectedRecord: selectedRecord,
                            custom: custom
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            loadChatview: function (scrID) {
                var htmlData;
                try {
                    if ($("#" + scrID).length !== 0) {
                        $("#" + scrID).remove();
                    };
                    htmlData = mService.config.ui.getSrc(scrID);
                    mService.presentR.pattern.form.init.addAttribute(htmlData, function (updatedData) {
                        try {
                            mService.config.ui.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()] = updatedData;
                            $("body").append(updatedData);
                            mService.application.navigate("#" + scrID);
                            mService.app.splash.hide();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        content: {
            display: function (scrID, templateName, selectedRecord) {
                try {
                    $("#" + scrID + "_screen_content").html(mService.config.template.getTransformedHtml(templateName, selectedRecord));
                    mService.config.label.resolve(scrID);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        form: {
            init: {
                addAttribute: function (data, success) {
                    var objLength,
                    objKey,
                    objValue,
                    index;
                    try {
                        if (data.indexOf('data-ms-containr-attrind="true"') === -1) {
                            objLength = Object.keys(mService.containR.variable.viewAttributes).length;
                            objKey = Object.keys(mService.containR.variable.viewAttributes);
                            objValue = Object.values(mService.containR.variable.viewAttributes);
                            for (index = 0; index < objLength; index++) {
                                data = data.replace(new RegExp(objKey[index], 'g'), objValue[index]);
                            };
                            success(data);
                        } else {
                            success(data);
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                loadForm: function (scrID) {
                    var htmlData,
                    controllerObj;
                    try {
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj.showUI !== undefined && controllerObj.showUI === "false") {
                            mService.containR.button.form.submitClick("", "", scrID);
                        } else {
                            htmlData = mService.config.ui.getSrc(scrID);
                            if ($("#" + scrID).length !== 0) {
                                $("[data-ms-view-group='" + scrID + "']").remove();
                            };
                            mService.presentR.pattern.form.init.addAttribute(htmlData, function (updatedData) {
                                try {
                                    mService.config.ui.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()] = updatedData;
                                    $("body").append(updatedData);
                                    mService.application.navigate("#" + scrID);
                                    mService.app.splash.hide();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            preview: {
                init: function (scrID, success) {
                    try {
                        $("#" + scrID + "_preview_popup").kendoWindow({
                            width: (screen.width * 0.90),
                            height: (screen.height * 0.75),
                            modal: true,
                            draggable: false,
                            resizable: false,
                            open: function () {
                                try {
                                    mService.presentR.pattern.form.preview.displayPreviewDetails(scrID);
                                    mService.config.label.resolve(scrID);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            close: function (e) {
                                try {
                                    if (mService.containR.variable[scrID].submitBtnClickInd) {
                                        mService.containR.variable[scrID].submitBtnClickInd = false;
                                        mService.application.navigate("#:back");
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }
                        });
                        $("#" + scrID + "_preview_popup").parent().css({
                            "border-radius": "5px",
                            "padding": ".1em 0.1em 1.3em",
                            "border": "1px solid #333",
                            "left": "0px",
                            "background": "#eaeaea;"
                        });
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                displayPreviewDetails: function (scrID) {
                    var digitalReportTemplate;
                    try {
                        digitalReportTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='digital_report']");
                        if (digitalReportTemplate.length === 1) {
                            $("#" + scrID + "_content_preview").html(kendo.template($(digitalReportTemplate).html().replace(/\n/g, "").replace(/\t/g, ""))(mService.containR.pattern.form.util.getInputparam(scrID, {
                                        scrID: scrID
                                    })));
                        } else {
                            mService.app.showToast("digital_report_template_error", "system_messages");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                showPreviewPopup: function (scrID) {
                    try {
                        mService.presentR.pattern.form.preview.init(scrID, function () {
                            try {
                                $("#" + scrID + "_preview_popup").data("kendoWindow").setOptions({
                                    title: {
                                        text: "<span data-ms-lbl='field' data-ms-lbl-src='" + scrID + "' data-ms-lbl-grpid='screen' data-ms-lbl-id='preview_title'></span>",
                                        encoded: false
                                    }
                                });
                                $("#" + scrID + "_preview_popup").data("kendoWindow").open().center();
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
        listview: {
            init: {
                createScrollViewListPage: function (scrID, controllerObj, pageNo) {
                    var call_info_container,
                    patternScrID,
                    activeCall,
                    currentCallNo,
                    activeCallInd;
                    try {
                        activeCallInd = false;
                        mService.spinner.show();
                        patternScrID = scrID.replace("_list", "");
                        mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                            var listviewTemplate;
                            try {
                                if (data.data().length > 0) {
                                    mService.containR.variable[patternScrID].selectedRecord = data.data()[pageNo];
                                    activeCall = mService.containR.variable[patternScrID].activeCall;
                                    if (activeCall !== "") {
                                        currentCallNo = ((data.data()[pageNo].request_ref_no === undefined) ? (data.data()[pageNo].call_no) : (data.data()[pageNo].request_ref_no));
                                        activeCallNo = ((activeCall.request_ref_no === undefined) ? (activeCall.call_no) : (activeCall.request_ref_no));
                                        if (currentCallNo === activeCallNo) {
                                            activeCallInd = true;
                                        } else {
                                            activeCallInd = false;
                                        }
                                    } else {
                                        activeCallInd = false;
                                    };
                                    $.extend(true, data.data()[pageNo], {
                                        "activeCallInd": activeCallInd
                                    });
                                    mService.containR.pattern.listview.wFlow.getWorkflowEvents(scrID, data.data()[pageNo], function (actionContent) {
                                        try {
                                            if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined) {
                                                listviewTemplate = $("body [data-ms-mswidget-for='" + patternScrID + "'][data-ms-mswidget-template-type='scrollview']");
                                            } else {
                                                listviewTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='listview']");
                                            };
                                            if (listviewTemplate.length === 1) {
                                                $("#" + scrID + "_main_page").find("[data-ms-uid = '" + data.data()[pageNo].uid + "']").html(kendo.template($(listviewTemplate).html())(data.data()[pageNo]));
                                                if (controllerObj.presentR !== undefined && controllerObj.presentR.workflow_actions_type !== undefined && controllerObj.presentR.workflow_actions_type === "popup") {
                                                    mService.presentR.pattern.listview.wFlow.actionsPopup.init(scrID);
                                                } else {
                                                    $("#" + scrID + "_action_container_" + data.data()[pageNo].uid).html(actionContent);
                                                };
                                                $("#" + scrID + "_action_container_" + data.data()[pageNo].uid).html(actionContent);
                                                mService.config.label.resolve(scrID);
                                                mService.containR.variable[patternScrID].activePage = pageNo;
                                                setTimeout(function () {
                                                    try {
                                                        call_info_container = $("#" + scrID).find("[data-ms-call_info-for='" + scrID + "']");
                                                        if ($(call_info_container).html() === "") {
                                                            $(call_info_container).html(mService.config.template.getTransformedHtml("home_layout_call_info"));
                                                        };
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, 200);
                                                mService.config.label.resolve();
                                                mService.spinner.hide();
                                            } else {
                                                mService.spinner.hide();
                                                mService.app.showToast("listview_template_error", "system_messages");
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.spinner.hide();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                initializeScrollViewList: function (scrID, syncInd, autoRefreshInd, filterInd) {
                    var controllerObj,
                    index,
                    call_info = [],
                    callObj = {},
                    pagerInd = false,
                    listData,
                    filterBtnEle,
                    filterForScreen,
                    patternScrID,
                    emptyStateTemplate,
                    callIndex,
                    tempItem,
                    dSourceKey,
                    listDSrc;
                    try {
                        mService.spinner.show();
                        patternScrID = scrID.replace("_list", "");
                        $("#" + patternScrID + "_search_container").hide();
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                            dSourceKey = scrID;
                        } else {
                            dSourceKey = scrID + "_list";
                        };
                        mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                            try {
                                if (data.data().length > 0) {
                                    mService.util.getActiveCall(data, scrID, function (activeCall) {
                                        try {
                                            filterInd = (filterInd === undefined) ? false : filterInd;
                                            if (activeCall !== "") {
                                                mService.containR.variable[patternScrID].activeCall = activeCall;
                                                callIndex = data.indexOf(activeCall);
                                                listDSrc = data.data();
                                                if (callIndex !== undefined) {
                                                    if (callIndex !== 0) {
                                                        tempItem = listDSrc[callIndex];
                                                        listDSrc.splice(callIndex, 1);
                                                        listDSrc.unshift(tempItem);
                                                        mService.dSource.cache[dSourceKey].data(listDSrc);
                                                    };
                                                }
                                            } else {
                                                mService.containR.variable[patternScrID].activeCall = "";
                                                listDSrc = data.data();
                                            };
                                            mService.containR.variable[patternScrID].dSource = mService.dSource.cache[dSourceKey];
                                            listData = listDSrc;
                                            $("#" + scrID + "_main_page").html("");
                                            mService.widgets.init.util.loadTemplate("msSubpageTemplate");
                                            if ($("#" + scrID + "_pager").length === 0) {
                                                $("#" + scrID + "_main_page").after(mService.config.template.getTransformedHtml("msSubpagePagerTemplate", {
                                                        scrID: scrID
                                                    }));
                                                pagerInd = false;
                                            } else {
                                                pagerInd = true;
                                            };
                                            callObj["Last refreshed on"] = mService.util.date.getDateTimeString(mService.util.date.getParseDate(listData[0].last_refreshed_on_date, listData[0].last_refreshed_on_hour, listData[0].last_refreshed_on_minute), 'MMM dd hh:mm');
                                            callObj["Total Count"] = listData.length;
                                            for (index = 0; index < listData.length; index++) {
                                                $("#" + scrID + "_main_page").append("<div data-role='page' data-ms-uid='" + listData[index].uid + "'></div>");
                                                if (!pagerInd) {
                                                    $("#" + scrID + "_pager_list").append("<li id='" + scrID + "_pager_" + index + "'></li>");
                                                };
                                                desc = (listData[index].call_status_desc === undefined) ? (listData[index].request_status_desc) : (listData[index].call_status_desc);
                                                if (callObj.length === 0) {
                                                    callObj[desc] = 1;
                                                } else {
                                                    if (callObj[desc] !== undefined) {
                                                        callObj[desc] = callObj[desc] + 1;
                                                    } else {
                                                        callObj[desc] = 1;
                                                    }
                                                };
                                                call_info[0] = callObj;
                                            };
                                            mService.containR.variable[patternScrID].call_info_details = call_info;
                                            $("#" + scrID + "_pager_0").addClass("ms_pager_active").removeClass("ms_pager_inactive").siblings().addClass("ms_pager_inactive").removeClass("ms_pager_active");
                                            $("#" + scrID + "_main_page").msSubpage({
                                                scrid: scrID,
                                                listviewInd: "true",
                                                dataLength: listData.length
                                            });
                                            if (mService.containR.variable[patternScrID].syncInd !== undefined && mService.containR.variable[patternScrID].syncInd) {
                                                mService.presentR.page.refresh();
                                                mService.containR.variable[patternScrID].syncInd = false;
                                            };
                                            if (filterInd) {
                                                mService.presentR.page.refresh();
                                            };
                                            filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                                            if (filterBtnEle.length > 0) {
                                                if ($("#home_functional_drawer_filter_content").html() === "") {
                                                    $("#home_functional_drawer_filter_content").attr("data_ms_filter_for", scrID);
                                                    if (controllerObj.pattern !== undefined) {
                                                        if (controllerObj.filterOptions !== undefined) {
                                                            mService.api.filter.init(controllerObj.filterOptions.split(","), data, scrID);
                                                        }
                                                    } else {
                                                        mService.api.filter.init($(filterBtnEle).attr("data-ms-filter-options").split(","), data, scrID);
                                                    };
                                                } else {
                                                    filterForScreen = $("#home_functional_drawer_filter_content").attr("data_ms_filter_for");
                                                    if (filterForScreen !== scrID) {
                                                        $("#home_functional_drawer_filter_content").html("");
                                                        $("#home_functional_drawer_filter_content").attr("data_ms_filter_for", scrID);
                                                        if (controllerObj.pattern !== undefined) {
                                                            if (controllerObj.filterOptions !== undefined) {
                                                                mService.api.filter.init(controllerObj.filterOptions.split(","), data, scrID);
                                                            }
                                                        } else {
                                                            mService.api.filter.init($(filterBtnEle).attr("data-ms-filter-options").split(","), data, scrID);
                                                        };
                                                    }
                                                }
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined) {
                                        emptyStateTemplate = $("body [data-ms-mswidget-for='" + patternScrID + "'][data-ms-mswidget-template-type='empty_state']");
                                    } else {
                                        emptyStateTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='empty_state']");
                                    };
                                    if (emptyStateTemplate.length === 1) {
                                        $("#" + scrID + "_main_page").html(mService.config.template.getTransformedHtml($(emptyStateTemplate[0]).attr("id")));
                                        $("#" + scrID + "_pager").remove();
                                    }
                                };
                                mService.spinner.hide();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, syncInd, autoRefreshInd);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                initializeFreeFlowListview: function (scrID, syncInd, autoRefreshInd, filterInd) {
                    var controllerObj,
                    filterBtnEle,
                    filterForScreen;
                    try {
                        mService.spinner.show();
                        $("#" + scrID + "_main_page").html("");
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        mService.containR.pattern.listview.util.getMasterDataSource(scrID, controllerObj, syncInd, autoRefreshInd, function (data) {
                            var listData;
                            try {
                                listData = data.data();
                                if (data.data().length > 0) {
                                    listviewTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='listview']");
                                    for (index = 0; index < listData.length; index++) {
                                        mService.containR.pattern.listview.actions.getMenus(scrID, listData[index], function (actionContent) {
                                            try {
                                                $("#" + scrID + "_main_page").append((kendo.template($(listviewTemplate).html())(listData[index])));
                                                if (controllerObj.presentR !== undefined && controllerObj.presentR.workflow_actions_type !== undefined && controllerObj.presentR.workflow_actions_type === "popup") {
                                                    mService.presentR.pattern.listview.wFlow.actionsPopup.init(scrID);
                                                } else {
                                                    if (actionContent !== "") {
                                                        $("#" + scrID + "_action_container_" + listData[index].uid).html(actionContent);
                                                    };
                                                };
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    };
                                    $("#" + scrID + "_main_page").show();
                                    filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                                    if (filterBtnEle.length > 0) {
                                        if ($("#home_functional_drawer_filter_content").html() === "") {
                                            $("#home_functional_drawer_filter_content").attr("data_ms_filter_for", scrID);
                                            if (controllerObj.pattern !== undefined) {
                                                if (controllerObj.filterOptions !== undefined) {
                                                    mService.api.filter.init(controllerObj.filterOptions.split(","), data, scrID);
                                                }
                                            } else {
                                                mService.api.filter.init($(filterBtnEle).attr("data-ms-filter-options").split(","), data, scrID);
                                            };
                                        } else {
                                            filterForScreen = $("#home_functional_drawer_filter_content").attr("data_ms_filter_for");
                                            if (filterForScreen !== scrID) {
                                                $("#home_functional_drawer_filter_content").html("");
                                                $("#home_functional_drawer_filter_content").attr("data_ms_filter_for", scrID);
                                                if (controllerObj.pattern !== undefined) {
                                                    if (controllerObj.filterOptions !== undefined) {
                                                        mService.api.filter.init(controllerObj.filterOptions.split(","), data, scrID);
                                                    }
                                                } else {
                                                    mService.api.filter.init($(filterBtnEle).attr("data-ms-filter-options").split(","), data, scrID);
                                                };
                                            }
                                        }
                                    }
                                    if (mService.pattern.query !== undefined) {
                                        mService.pattern.query.util.checkNotificationInd(scrID);
                                    };
                                    mService.spinner.hide();
                                } else {
                                    $("#" + scrID + "_main_page").html(kendo.template($("#" + scrID + "_empty_state_template").html().replace(/\n/g, "").replace(/\t/g, ""))({}));
                                    mService.config.label.resolve();
                                    mService.spinner.hide();
                                }
                            } catch (exception) {
                                mService.spinner.hide();
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.spinner.hide();
                        mService.exception.handle(exception);
                    }
                },
                loadListview: function (scrID) {
                    var htmlData;
                    try {
                        if ($("#" + scrID).length !== 0) {
                            $("#" + scrID).remove();
                        };
                        htmlData = mService.config.ui.getSrc(scrID);
                        mService.presentR.pattern.form.init.addAttribute(htmlData, function (updatedData) {
                            try {
                                mService.config.ui.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()] = updatedData;
                                $("body").append(updatedData);
                                mService.application.navigate("#" + scrID);
                                mService.app.splash.hide();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                initializeListview: function (scrID, syncInd, autoRefreshInd, filterInd) {
                    var controllerObj,
                    index,
                    call_info = [],
                    callObj = {},
                    call_info_container,
                    listData,
                    filterBtnEle,
                    filterForScreen,
                    patternScrID,
                    listviewTemplate,
                    emptyStateTemplate,
                    currentCallNo,
                    activeCallNo,
                    activeCallInd,
                    callIndex,
                    tempItem,
                    dSourceKey,
                    listDSrc;
                    try {
                        activeCallInd = false;
                        mService.spinner.show();
                        patternScrID = scrID.replace("_list", "");
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                            dSourceKey = scrID;
                        } else {
                            dSourceKey = scrID + "_list";
                        };
                        $("#" + scrID + "_main_page").html("");
                        mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                            try {
                                filterInd = (filterInd === undefined) ? false : filterInd;
                                mService.containR.variable[patternScrID].dSource = data;
                                if (data.data().length > 0) {
                                    $('#' + scrID + '_main_page').children().not(':first').remove();
                                    $("#" + scrID + "_search_box").val("");
                                    $("#" + scrID + "_clear_btn").hide();
                                    $("#" + patternScrID + "_search_container").show();
                                    mService.util.getActiveCall(data, scrID, function (activeCall) {
                                        try {
                                            if (activeCall !== "") {
                                                callIndex = data.indexOf(activeCall);
                                                listDSrc = data.data();
                                                if (callIndex !== undefined) {
                                                    if (callIndex !== 0) {
                                                        tempItem = listDSrc[callIndex];
                                                        listDSrc.splice(callIndex, 1);
                                                        listDSrc.unshift(tempItem);
                                                        mService.dSource.cache[dSourceKey].data(listDSrc);
                                                    };
                                                }
                                            } else {
                                                listDSrc = data.data();
                                            };
                                            listData = listDSrc;
                                            if (listData.length > 0) {
                                                callObj["Last refreshed on"] = mService.util.date.getDateTimeString(mService.util.date.getParseDate(listData[0].last_refreshed_on_date, listData[0].last_refreshed_on_hour, listData[0].last_refreshed_on_minute), 'MMM dd hh:mm');
                                                callObj["Total Count"] = listData.length;
                                            };
                                            if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined) {
                                                listviewTemplate = $("body [data-ms-mswidget-for='" + patternScrID + "'][data-ms-mswidget-template-type='listview']");
                                            } else {
                                                listviewTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='listview']");
                                            };
                                            if (listviewTemplate.length === 1) {
                                                for (index = 0; index < listData.length; index++) {
                                                    if (activeCall !== "") {
                                                        currentCallNo = ((listData[index].request_ref_no === undefined) ? (listData[index].call_no) : (listData[index].request_ref_no));
                                                        activeCallNo = ((activeCall.request_ref_no === undefined) ? (activeCall.call_no) : (activeCall.request_ref_no));
                                                        if (currentCallNo === activeCallNo) {
                                                            activeCallInd = true;
                                                        } else {
                                                            activeCallInd = false;
                                                        }
                                                    } else {
                                                        activeCallInd = false;
                                                    };
                                                    mService.containR.variable[patternScrID].selectedRecord = listData[index];
                                                    mService.containR.pattern.listview.wFlow.getWorkflowEvents(scrID, listData[index], function (actionContent) {
                                                        try {
                                                            $.extend(true, listData[index], {
                                                                "activeCallInd": activeCallInd
                                                            });
                                                            $("#" + scrID + "_main_page").append((kendo.template($(listviewTemplate).html())(listData[index])));
                                                            if (controllerObj.presentR !== undefined && controllerObj.presentR.workflow_actions_type !== undefined && controllerObj.presentR.workflow_actions_type === "popup") {
                                                                mService.presentR.pattern.listview.wFlow.actionsPopup.init(scrID);
                                                            } else {
                                                                $("#" + scrID + "_action_container_" + listData[index].uid).html(actionContent);
                                                            };
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                    desc = (listData[index].call_status_desc === undefined) ? (listData[index].request_status_desc) : (listData[index].call_status_desc);
                                                    if (callObj.length === 0) {
                                                        callObj[desc] = 1;
                                                    } else {
                                                        if (callObj[desc] !== undefined) {
                                                            callObj[desc] = callObj[desc] + 1;
                                                        } else {
                                                            callObj[desc] = 1;
                                                        }
                                                    };
                                                    call_info[0] = callObj;
                                                };
                                                mService.containR.variable[patternScrID].call_info_details = call_info;
                                            } else {
                                                mService.spinner.hide();
                                                mService.app.showToast("listview_template_error", "system_messages");
                                            };
                                            if (mService.containR.variable[patternScrID].syncInd !== undefined && mService.containR.variable[patternScrID].syncInd) {
                                                mService.containR.variable[patternScrID].syncInd = false;
                                            };
                                            if (data.data().length > 0) {
                                                filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                                                if (filterBtnEle.length > 0) {
                                                    if ($("#home_functional_drawer_filter_content").html() === "") {
                                                        $("#home_functional_drawer_filter_content").attr("data_ms_filter_for", scrID);
                                                        if (controllerObj.pattern !== undefined) {
                                                            if (controllerObj.filterOptions !== undefined) {
                                                                mService.api.filter.init(controllerObj.filterOptions.split(","), data, scrID);
                                                            }
                                                        } else {
                                                            mService.api.filter.init($(filterBtnEle).attr("data-ms-filter-options").split(","), data, scrID);
                                                        };
                                                    } else {
                                                        filterForScreen = $("#home_functional_drawer_filter_content").attr("data_ms_filter_for");
                                                        if (filterForScreen !== scrID) {
                                                            $("#home_functional_drawer_filter_content").html("");
                                                            $("#home_functional_drawer_filter_content").attr("data_ms_filter_for", scrID);
                                                            if (controllerObj.pattern !== undefined) {
                                                                if (controllerObj.filterOptions !== undefined) {
                                                                    mService.api.filter.init(controllerObj.filterOptions.split(","), data, scrID);
                                                                }
                                                            } else {
                                                                mService.api.filter.init($(filterBtnEle).attr("data-ms-filter-options").split(","), data, scrID);
                                                            };
                                                        }
                                                    }
                                                }
                                            };
                                            setTimeout(function () {
                                                try {
                                                    call_info_container = $("#" + scrID).find("[data-ms-call_info-for='" + scrID + "']");
                                                    if ($(call_info_container).html() === "") {
                                                        $(call_info_container).html(mService.config.template.getTransformedHtml("home_layout_call_info"));
                                                    };
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, 200);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                    if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined) {
                                        emptyStateTemplate = $("body [data-ms-mswidget-for='" + patternScrID + "'][data-ms-mswidget-template-type='empty_state']");
                                    } else {
                                        emptyStateTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='empty_state']");
                                    };
                                    if (emptyStateTemplate.length === 1) {
                                        $("#" + scrID + "_empty_state_image").html(mService.config.template.getTransformedHtml($(emptyStateTemplate[0]).attr("id")));
                                        $("#" + scrID + "_empty_state_image").hide();
                                    };
                                } else {
                                    $("#" + patternScrID + "_search_container").hide();
                                    if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined) {
                                        emptyStateTemplate = $("body [data-ms-mswidget-for='" + patternScrID + "'][data-ms-mswidget-template-type='empty_state']");
                                    } else {
                                        emptyStateTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='empty_state']");
                                    };
                                    if (emptyStateTemplate.length === 1) {
                                        $("#" + scrID + "_empty_state_image").html(mService.config.template.getTransformedHtml($(emptyStateTemplate[0]).attr("id")));
                                        $("#" + scrID + "_empty_state_image").show();
                                    }
                                };
                                mService.config.label.resolve();
                                mService.spinner.hide();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, syncInd, autoRefreshInd);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                master: {
                    createScrollViewListPage: function (scrID, controllerObj, pageNo) {
                        var patternScrID;
                        try {
                            activeCallInd = false;
                            mService.spinner.show();
                            patternScrID = scrID.replace("_list", "");
                            mService.dSource.getCachedData(scrID, controllerObj, function (data) {
                                var listviewTemplate;
                                try {
                                    if (data.data().length > 0) {
                                        mService.containR.variable[patternScrID].selectedRecord = data.data()[pageNo];
                                        mService.containR.pattern.listview.actions.getMenus(scrID, data.data()[pageNo], function (actionContent) {
                                            try {
                                                if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined) {
                                                    listviewTemplate = $("body [data-ms-mswidget-for='" + patternScrID + "'][data-ms-mswidget-template-type='scrollview']");
                                                };
                                                if (listviewTemplate.length === 1) {
                                                    $("#" + scrID + "_main_page").find("[data-ms-uid = '" + data.data()[pageNo].uid + "']").html(kendo.template($(listviewTemplate).html())(data.data()[pageNo]));
                                                    if (controllerObj.presentR !== undefined && controllerObj.presentR.workflow_actions_type !== undefined && controllerObj.presentR.workflow_actions_type === "popup") {
                                                        mService.presentR.pattern.listview.wFlow.actionsPopup.init(scrID);
                                                    } else {
                                                        $("#" + scrID + "_action_container_" + data.data()[pageNo].uid).html(actionContent);
                                                    };
                                                    $("#" + scrID + "_action_container_" + data.data()[pageNo].uid).html(actionContent);
                                                    mService.config.label.resolve(scrID);
                                                    mService.containR.variable[patternScrID].activePage = pageNo;
                                                    mService.config.label.resolve();
                                                    mService.spinner.hide();
                                                } else {
                                                    mService.spinner.hide();
                                                    mService.app.showToast("listview_template_error", "system_messages");
                                                }
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        mService.spinner.hide();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                }
            },
            callInfo: {
                display: function (scrID) {
                    try {
                        $("#home_call_info_popup_content").html(mService.presentR.pattern.util.getCallInfoHtml(mService.containR.variable[scrID.replace("_list", "")].call_info_details));
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                init: function (scrID, success) {
                    try {
                        if ($("#home_call_info_popup").data("kendoWindow") === undefined) {
                            $("#home_call_info_popup").kendoWindow({
                                minWidth: (screen.width * 0.60),
                                maxWidth: (screen.width * 0.80),
                                maxHeight: (screen.height * 0.50),
                                title: {
                                    text: "<span id='home_call_info_popup_title' data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='call_info_popup' data-ms-lbl-id='call_info_popup_title'></span>",
                                    encoded: false
                                },
                                open: function () {
                                    try {
                                        mService.config.label.resolve();
                                        mService.presentR.pattern.listview.callInfo.display(mService.app.getScreenId());
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                                modal: true,
                                draggable: false,
                                resizable: false
                            });
                            $("#home_call_info_popup").parent().addClass("ms_window");
                            success();
                        } else {
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                showCallInfo: function (scrID) {
                    try {
                        mService.presentR.pattern.listview.callInfo.init(scrID, function () {
                            try {
                                $("#home_call_info_popup").data("kendoWindow").open().center();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            wFlow: {
                actionsPopup: {
                    init: function (scrID) {
                        try {
                            if ($("#" + scrID + "_actions_popup").data("kendoWindow") === undefined) {
                                $("#" + scrID + "_actions_popup").kendoWindow({
                                    width: (screen.width * 0.80),
                                    title: {
                                        text: "<span data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='workflow_actions_popup' data-ms-lbl-id='title'></span>",
                                        encoded: false
                                    },
                                    modal: true,
                                    draggable: false,
                                    resizable: false
                                });
                                $("#" + scrID + "_actions_popup").parent().addClass("ms_window");
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    open: function (scrID, workflowActionsHtml) {
                        try {
                            $("#" + scrID + "_action_content").html(workflowActionsHtml);
                            $("#" + scrID + "_actions_popup").data("kendoWindow").open().center();
                            mService.config.label.resolve();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    close: function (scrID) {
                        try {
                            $("#" + scrID + "_actions_popup").data("kendoWindow").close();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                }
            }
        },
        util: {
            destroyScrollview: function (scrID) {
                var scrollview,
                id;
                try {
                    scrollview = $("#" + scrID + " [data-role='scrollview']");
                    id = $(scrollview[0]).attr("id");
                    if ($(scrollview[0]).data("kendoMobileScrollView") !== undefined) {
                        $(scrollview[0]).data("kendoMobileScrollView").destroy();
                    };
                    $("#" + id).empty();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getCallInfoHtml: function (call_info) {
                var html = "",
                objKey,
                objValue;
                try {
                    objKey = Object.keys(call_info[0]);
                    objValue = Object.values(call_info[0]);
                    for (var index = 0; index < Object.keys(call_info[0]).length; index++) {
                        html += mService.config.template.getTransformedHtml("home_call_info_popup_listView_template", {
                            status: objKey[index],
                            count: objValue[index]
                        });
                    };
                    return html;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        }
    },
    resource: {
        updateResource: function (screenGroupID, success, failure) {
            var resourcetype,
            serverPath,
            extension,
            localPath,
            splittedPath,
            sourceFilePath,
            sourceFileName,
            targetFilePath,
            targetFileName,
            resource,
            urlType;
            try {
                resource = mService.presentR.resource.variable[screenGroupID].resourceList[mService.presentR.resource.variable[screenGroupID].counter];
                serverPath = $(resource).attr("data-ms-containr-resourcesrc");
                extension = serverPath.split(".").reverse();
                localPath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + screenGroupID + "/" + "resource" + "/" + screenGroupID + "_" + mService.util.getDateTimeString(mService.util.date.getNewDate(), "ddMMyyHHmmssfff") + "." + extension[0];
                if (Object.keys(mService.presentR.resource.variable[screenGroupID].resourceConfig).length !== 0 && mService.presentR.resource.variable[screenGroupID].resourceConfig[serverPath] !== undefined) {
                    mService.nfs.getBase64String(mService.presentR.resource.variable[screenGroupID].resourceConfig[serverPath], function (base64String) {
                        try {
                            mService.presentR.resource.updateResourceLocalPath(resource, "data:image/jpeg;base64," + base64String);
                            mService.presentR.resource.variable[screenGroupID].counter++;
                            mService.presentR.resource.variable[screenGroupID].proccessedImg++;
                            mService.presentR.resource.callupdateResource(screenGroupID, function () {
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
                            mService.presentR.resource.variable[screenGroupID].counter++;
                            mService.presentR.resource.variable[screenGroupID].proccessedImg++;
                            mService.presentR.resource.callupdateResource(screenGroupID, function () {
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
                } else {
                    resourcetype = $(resource).attr("data-ms-containr-resourcetype");
                    if (resourcetype === "url") {
                        urlType = $(resource).attr("data-ms-containr-urltype");
                        serverPath = (urlType === undefined || urlType === "absolute") ? (serverPath) : (mService.app.clientURL + "/" + serverPath);
                        mService.nfs.downloadFile(serverPath, localPath, false, function (src) {
                            mService.nfs.getBase64String(localPath, function (base64String) {
                                try {
                                    var imageSrc;
                                    try {
                                        imageSrc = "data:image/jpeg;base64," + base64String;
                                        mService.presentR.resource.variable[screenGroupID].resourceConfig[serverPath] = localPath;
                                        mService.presentR.resource.updateResourceLocalPath(resource, imageSrc);
                                        mService.presentR.resource.variable[screenGroupID].counter++;
                                        mService.presentR.resource.variable[screenGroupID].proccessedImg++;
                                        mService.presentR.resource.callupdateResource(screenGroupID, function () {
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
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.presentR.resource.variable[screenGroupID].counter++;
                                    mService.presentR.resource.variable[screenGroupID].proccessedImg++;
                                    mService.presentR.resource.callupdateResource(screenGroupID, function () {
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
                        }, function () {
                            try {
                                mService.presentR.resource.variable[screenGroupID].counter++;
                                mService.presentR.resource.variable[screenGroupID].proccessedImg++;
                                mService.presentR.resource.callupdateResource(screenGroupID, function () {
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
                    } else {
                        extension = serverPath.split(".").reverse();
                        splittedPath = serverPath.split("/");
                        sourceFilePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + serverPath.replace("/" + splittedPath[splittedPath.length - 1], "");
                        sourceFileName = splittedPath[splittedPath.length - 1];
                        targetFilePath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + screenGroupID + "/" + "resource";
                        targetFileName = screenGroupID + "_" + mService.util.getDateTimeString(mService.util.date.getNewDate(), "ddMMyyHHmmssfff") + "." + extension[0];
                        mService.nfs.copyFile(sourceFilePath, sourceFileName, targetFilePath, targetFileName, function () {
                            try {
                                mService.nfs.getBase64String(targetFilePath + "/" + targetFileName, function (base64String) {
                                    try {
                                        imageSrc = "data:image/jpeg;base64," + base64String;
                                        mService.presentR.resource.variable[screenGroupID].resourceConfig[serverPath] = targetFilePath + "/" + targetFileName; ;
                                        mService.presentR.resource.updateResourceLocalPath(resource, imageSrc);
                                        mService.presentR.resource.variable[screenGroupID].counter++;
                                        mService.presentR.resource.variable[screenGroupID].proccessedImg++;
                                        mService.presentR.resource.callupdateResource(screenGroupID, function () {
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
                                        mService.presentR.resource.variable[screenGroupID].counter++;
                                        mService.presentR.resource.variable[screenGroupID].proccessedImg++;
                                        mService.presentR.resource.callupdateResource(screenGroupID, function () {
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
                        }, function () {
                            try {
                                mService.presentR.resource.variable[screenGroupID].counter++;
                                mService.presentR.resource.variable[screenGroupID].proccessedImg++;
                                mService.presentR.resource.callupdateResource(screenGroupID, function () {
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
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        get: function (screenGroupID, success, failure) {
            var resourceList;
            try {
                resourceList = $("[data-ms-view-group='" + screenGroupID + "']" + " [data-ms-containr-resource='true']");
                if (resourceList.length > 0) {
                    resourceList.addClass("ms_img_load_err").parent().addClass("ms_img_shim");
                    if (mService.presentR.resource.variable[screenGroupID] === undefined) {
                        mService.presentR.resource.variable[screenGroupID] = {
                            resourceList: resourceList,
                            resourceConfig: {},
                            counter: 0,
                            proccessedImg: 0
                        };
                        mService.presentR.resource.downloadResource(screenGroupID, function () {
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
                        if (mService.presentR.resource.variable[screenGroupID].proccessedImg !== resourceList.length) {
                            var resourceDownloadTimer = setInterval(function () {
                                try {
                                    if (mService.presentR.resource.variable[screenGroupID].proccessedImg === resourceList.length) {
                                        mService.presentR.resource.variable[screenGroupID].proccessedImg = 0;
                                        clearInterval(resourceDownloadTimer);
                                        mService.presentR.resource.variable[screenGroupID].resourceList = resourceList;
                                        mService.presentR.resource.downloadResource(screenGroupID, function () {
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
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 1000);
                        } else {
                            mService.presentR.resource.variable[screenGroupID].resourceList = resourceList;
                            mService.presentR.resource.variable[screenGroupID].proccessedImg = 0;
                            mService.presentR.resource.downloadResource(screenGroupID, function () {
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
                        }
                    }
                } else {
                    success();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        downloadResource: function (screenGroupID, success, failure) {
            try {
                mService.presentR.resource.getResourceConfigObj(screenGroupID, function () {
                    try {
                        mService.presentR.resource.updateResource(screenGroupID, function () {
                            try {
                                mService.presentR.resource.createResourceConfigFile(screenGroupID, function () {
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
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        callupdateResource: function (screenGroupID, success, failure) {
            try {
                if (mService.presentR.resource.variable[screenGroupID].counter !== mService.presentR.resource.variable[screenGroupID].resourceList.length) {
                    mService.presentR.resource.updateResource(screenGroupID, function () {
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
                    mService.presentR.resource.variable[screenGroupID].counter = 0;
                    success();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        updateResourceLocalPath: function (resource, localPath) {
            try {
                $(resource).attr("src", localPath);
                $(resource).attr("data-ms-containr-resourceind", "true");
                $(resource).removeClass("ms_img_load_err").parent().removeClass("ms_img_shim");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getResourceConfigObj: function (screenGroupID, success) {
            try {
                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + screenGroupID + "/" + "resource" + "/" + screenGroupID + "_" + "resource_config.json", function (data) {
                    try {
                        mService.presentR.resource.variable[screenGroupID].resourceConfig = JSON.parse(data);
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        if (mService.presentR.resource.variable[screenGroupID].resourceConfig === undefined) {
                            mService.presentR.resource.variable[screenGroupID].resourceConfig = {};
                        };
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        createResourceConfigFile: function (screenGroupID, success, failure) {
            try {
                mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "containR" + "/" + screenGroupID + "/" + "resource" + "/" + screenGroupID + "_" + "resource_config.json", JSON.stringify(mService.presentR.resource.variable[screenGroupID].resourceConfig), function () {
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
        getClientImages: function (success, failure) {
            var serverPath,
            localPath;
            try {
                if (window.navigator.onLine) {
                    serverPath = mService.app.clientURL + "/" + "www" + "/" + "ux" + "/" + "image" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/app_header_icon.png";
                    localPath = mService.app.getClientId() + '/' + mService.app.getCountryCode() + '/' + 'logo' + '/' + 'app_header_icon.png';
                    mService.nfs.downloadFile(serverPath, localPath, false, function () {
                        try {
                            serverPath = mService.app.clientURL + "/" + "www" + "/" + "ux" + "/" + "image" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/app_header_logo.png";
                            localPath = mService.app.getClientId() + '/' + mService.app.getCountryCode() + '/' + 'logo' + '/' + 'app_header_logo.png';
                            mService.nfs.downloadFile(serverPath, localPath, false, function () {
                                try {
                                    serverPath = mService.app.clientURL + "/" + "www" + "/" + "ux" + "/" + "image" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/app_drawer_logo.png";
                                    localPath = mService.app.getClientId() + '/' + mService.app.getCountryCode() + '/' + 'logo' + '/' + 'app_drawer_logo.png';
                                    mService.nfs.downloadFile(serverPath, localPath, false, function () {
                                        try {
                                            serverPath = mService.app.clientURL + "/" + "www" + "/" + "ux" + "/" + "image" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/app_background_watermark.jpg";
                                            localPath = mService.app.getClientId() + '/' + mService.app.getCountryCode() + '/' + 'logo' + '/' + 'app_background_watermark.jpg';
                                            mService.nfs.downloadFile(serverPath, localPath, false, function () {
                                                try {
                                                    mService.presentR.resource.loadLogo(function () {
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
                                                    mService.presentR.resource.loadLogo(function () {
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
                } else {
                    success();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        loadLogo: function (success, failure) {
            try {
                mService.nfs.getBase64String(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "logo/app_header_icon.png", function (base64String) {
                    try {
                        mService.presentR.resource.variable.images.app_header_icon = base64String;
                        mService.nfs.getBase64String(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "logo/app_header_logo.png", function (base64String) {
                            try {
                                mService.presentR.resource.variable.images.app_header_logo = base64String;
                                mService.nfs.getBase64String(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "logo/app_drawer_logo.png", function (base64String) {
                                    try {
                                        mService.presentR.resource.variable.images.app_drawer_logo = base64String;
                                        mService.nfs.getBase64String(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "logo/app_background_watermark.jpg", function (base64String) {
                                            try {
                                                mService.presentR.resource.variable.images.app_background_watermark = base64String;
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.presentR.resource.variable.images.app_background_watermark = "";
                                                success();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        })
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.app.showToast("image_base64_error", "system_messages");
                                        failure();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                })
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("image_base64_error", "system_messages");
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        })
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        mService.app.showToast("image_base64_error", "system_messages");
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        applyClientLogo: function (scrID) {
            var customerLogoEle,
            clientBrandImgEle;
            try {
                if (mService.presentR.resource.variable.images.app_header_logo !== undefined && mService.presentR.resource.variable.images.app_header_icon !== undefined && scrID !== "visitor_profile") {
                    customerLogoEle = $("div.km-view-title.km-show-title img, img[src='../ux/image/customer_logo.png'], img[src='../ux/image/app_header_logo.png']");
                    customerLogoEle.each(function (index, element) {
                        $(element).attr('src', "data:image/png;base64," + mService.presentR.resource.variable.images.app_header_logo);
                    });
                    clientBrandImgEle = $("img[src='../ux/image/client_brand_icon.png'], img[src='../ux/image/app_header_icon.png']");
                    clientBrandImgEle.each(function (index, element) {
                        $(element).attr('src', "data:image/png;base64," + mService.presentR.resource.variable.images.app_header_icon);
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        applyDrawerLogo: function () {
            try {
                if (mService.presentR.resource.variable.images.app_drawer_logo !== undefined) {
                    $("#home_functional_drawer_logo").attr('src', "data:image/png;base64," + mService.presentR.resource.variable.images.app_drawer_logo);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        applyChatLogo: function () {
            var systemIconEle;
            try {
                systemIconEle = $("img[src='../ux/image/client_brand_icon.png'], img[src='../ux/image/system_icon.png'] , img[src='../ux/image/app_header_icon.png']");
                systemIconEle.each(function (index, element) {
                    $(element).attr('src', "data:image/png;base64," + mService.presentR.resource.variable.images.app_header_icon);
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        applyWatermarkBg: function (scrID) {
            try {
                $("#" + scrID).css("background-image", "url('" + "data:image/png;base64," + mService.presentR.resource.variable.images.app_background_watermark + "')");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        variable: {
            images: {}
        }
    },
    util: {
        loadLabelFiles: function () {
            var layoutFeatures;
            try {
                layoutFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                    try {
                        return e.p_parent_feature_group === "HOMELAYOUT";
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                if (layoutFeatures.length > 0) {
                    mService.home.functionalDrawer.variable.drawerFeatureCounter = layoutFeatures.length - 1;
                    mService.home.functionalDrawer.loadLabelFiles(layoutFeatures, function () {
                        try {
                            mService.config.label.resolve();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.config.label.resolve();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    mService.config.label.resolve();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        callAjax: function (url, dataType, success, failure) {
            try {
                $.ajax({
                    url: ((mService.app.channel === "web") ? ("./www/") : ("../")) + url,
                    dataType: dataType,
                    async: true,
                    success: function (data) {
                        try {
                            success(data);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (data) {
                        try {
                            failure(data);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getLayoutSettings: function (success, failure) {
            try {
                $.ajax({
                    url: ((mService.app.channel === "web") ? ("./www/") : ("../")) + "ux/layout.settings.json",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        try {
                            success(data);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (error) {
                        try {
                            failure(error);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getMenuHtml: function (layoutFeatures, templateID) {
            var count,
            displayOrder,
            currentFeature,
            returnHtml;
            try {
                count = 0;
                displayOrder = 1;
                returnHtml = "";
                while (true) {
                    if (count === layoutFeatures.length) {
                        break;
                    } else {
                        currentFeature = $.grep(layoutFeatures, function (e, i) {
                            try {
                                return e.p_child_display_order === displayOrder.toString();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        })[0];
                        displayOrder++;
                        if (currentFeature !== undefined) {
                            count++;
                            returnHtml += kendo.template($("#" + templateID).html())({
                                linkRole: currentFeature.p_child_screen_id
                            });
                        }
                    }
                };
                return returnHtml;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        openChatScreen: function (scrID, key, subkey, msgBody) {
            try {
                mService.spinner.show();
                if (mService.app.getScreenId() !== scrID) {
                    if ($("#" + scrID).length !== 0) {
                        if ($("#" + scrID).data("kendoMobileView") !== undefined) {
                            $("#" + scrID).data("kendoMobileView").destroy();
                        };
                        $("#" + scrID).remove();
                    };
                    $("body").append(mService.config.template.getTransformedHtml("mschat_screen_template", ({
                                id: scrID,
                                key: key,
                                subkey: subkey
                            })));
                    if (msgBody !== undefined && msgBody !== "") {
                        mService.widgets.variable.msChat.variable[scrID + "_content"] = msgBody;
                    };
                    mService.spinner.hide();
                    mService.application.navigate(scrID);
                } else {
                    $("#" + scrID + "_content_group").before('<div id="' + scrID + '_content"></div>').remove();
                    $("#" + scrID).attr("data-ms-chat-key", key);
                    $("#" + scrID).attr("data-ms-chat-subkey", subkey);
                    $("#" + scrID + "_content").msChat({
                        scrid: scrID,
                        key: key,
                        subKey: subkey
                    });
                    if (msgBody !== undefined) {
                        mService.widgets.variable.msChat.variable[scrID + "_content"] = msgBody;
                    };
                    mService.spinner.hide();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        resizePopup: function () {
            var popupList,
            id;
            try {
                popupList = $("body [data-role='window']");
                for (index = 0; index < popupList.length; index++) {
                    id = $(popupList[index]).attr("id");
                    if ($("#" + id).is(":visible")) {
                        $("#" + id).data("kendoWindow").center();
                    }
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    variable: {
        layoutList: ((mService.app.channel === "web") ? (["web.home.layout.template", "web.home.popup.template", "web.login.template"]) : (["mobile.home.layout.template", "mobile.home.functional.drawer.template", "mobile.home.functional.drawer.filter.template", "mobile.home.popup.template"])),
        layoutListCounter: 0,
        themeList: ((mService.app.channel === "web") ? (["web.ms.theme.css.template", "web.kendo.theme.css.template", "web.widgets.theme.css.template"]) : (["mobile.ms.theme.css.template", "mobile.kendo.theme.css.template", "mobile.widgets.theme.css.template"])),
        themeListCounter: 0
    },
    web: {
        login: {
            loadLayout: function () {
                try {
                    $("body").append(kendo.template($("#login_template").html().replace(/\n/g, "").replace(/\t/g, ""))({
                            clientID: mService.app.getClientId(),
                            countryCode: mService.app.getCountryCode(),
                            appName: mService.app.name
                        }));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        updateFavIcon: function () {
            var favIconPath,
            link;
            try {
                favIconPath = "www/ux/image/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/web_app_favicon.png"
                    link = $('<link rel="icon" type="image/png" href="' + favIconPath + '">');
                $('link[rel="icon"]').remove();
                $('head').append(link);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    }
};