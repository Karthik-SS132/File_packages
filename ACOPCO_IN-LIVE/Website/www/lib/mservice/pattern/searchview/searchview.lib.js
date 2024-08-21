mService.pattern.searchview = {
    init: function (scrID, iObj) {
        try {
            if (mService.containR.variable[scrID] === undefined) {
                mService.containR.variable[scrID] = {};
            };
            if (mService.containR.variable[scrID].datasource === undefined) {
                mService.containR.variable[scrID].datasource = {};
            };
            if (scrID.endsWith("_details")) {
                mService.config.controller.src[(scrID.replace(/_details$/, "")) + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()].details["containR_type"] = "form";
                mService.config.controller.src[(scrID.replace(/_details$/, "")) + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()].details["containR_subtype"] = "content";
                mService.pattern.searchview.loadScreen(scrID, iObj);
            } else {
                mService.config.controller.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()].list["containR_type"] = "form";
                mService.config.controller.src[scrID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode()].list["containR_subtype"] = "form";
                mService.pattern.searchview.loadScreen(scrID + "_list", iObj);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    loadScreen: function (scrID, iObj) {
        var controllerObj;
        try {
            controllerObj = mService.config.controller.getControllerObj(scrID);
            if (controllerObj !== undefined) {
                mService.pattern.searchview.loadTemplate(scrID, iObj, function () {
                    try {
                        if (scrID.indexOf("_list") !== -1) {
                            if (mService.containR.variable[scrID] === undefined) {
                                mService.containR.variable[scrID] = {};
                            };
                            mService.application.navigate("#" + scrID);
                        } else {
                            mService.containR.config.util.loadConfigData(scrID, function () {
                                try {
                                    mService.pattern.searchview.detail.downloadData(scrID, function (data) {
                                        try {
                                            mService.containR.variable[scrID].datasource = data;
                                            dataSource = new kendo.data.DataSource({
                                                data: data.detail
                                            });
                                            dataSource.read().then(function () {
                                                try {
                                                    mService.containR.variable[scrID].filterDatasource = dataSource;
                                                    mService.application.navigate("#" + scrID);
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                };
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
            } else {}

        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    loadTemplate: function (scrID, iObj, success, failure) {
        var listTemplate,
        detailsTemplate,
        controllerObj;
        try {
            controllerObj = mService.config.controller.getControllerObj(scrID);
            if (scrID.indexOf("_list") !== -1) {
                if ($("#ms_pattern_searchview_list_screen_template").length === 0) {
                    mService.util.loadTemplate("searchview", "msPatternSearchviewList");
                };
                if ($("#" + scrID).length === 0) {
                    listTemplate = mService.config.template.getTransformedHtml("ms_pattern_searchview_list_screen_template", {
                        id: scrID
                    });
                    $("body").append(listTemplate);
                    success();
                } else {
                    $("#" + scrID).remove();
                    listTemplate = mService.config.template.getTransformedHtml("ms_pattern_searchview_list_screen_template", {
                        id: scrID
                    });
                    $("body").append(listTemplate);
                    success();
                }
            } else if (scrID.indexOf("_details") !== -1) {
                if (mService.containR.variable[scrID] === undefined) {
                    mService.containR.variable[scrID] = {};
                };
                if (iObj !== undefined) {
                    $.extend(true, mService.containR.variable[scrID], iObj);
                };
                if (iObj.selectedRecord !== undefined) {
                    mService.containR.variable[scrID].selectedRecord = iObj.selectedRecord;
                };
                if ($("#ms_pattern_searchview_details_screen_template").length === 0) {
                    mService.util.loadTemplate("searchview", "msPatternSearchviewDetails");
                };
                if ($("#" + scrID).length === 0) {
                    detailsTemplate = mService.config.template.getTransformedHtml("ms_pattern_searchview_details_screen_template", {
                        id: scrID,
                    });
                    $("body").append(detailsTemplate);
                    success();
                } else {
                    success();
                }
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    detail: {
        button: {
            clearFilter: function (scrID) {
                try {
                    filterWidgets = $("#home_functional_drawer_filter_content").find('[type="checkbox"]');
                    for (optionsIndex = 0; optionsIndex < filterWidgets.length; optionsIndex++) {
                        $(filterWidgets[optionsIndex]).prop("checked", false);
                    };
                    mService.util.closeFilterDrawer();
                    mService.pattern.searchview.detail.load(mService.containR.variable[scrID].datasource, scrID, false);
                    filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                    $(filterBtnEle).removeClass("ms_pattern_searchview_details_action_icons_active").addClass("ms_pattern_searchview_details_action_icons_default");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            filter: function (scrID) {
                var datasource;
                try {
                    datasource = mService.containR.variable[scrID].filterDatasource;
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
                        dataSource.filter(filterParentObj);
                        dSrc = new kendo.data.DataSource({
                            data: dataSource.view()
                        });
                        dSrc.read().then(function () {
                            var filterBtnEle;
                            try {
                                mService.util.closeFilterDrawer();
                                filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                                $(filterBtnEle).removeClass("ms_pattern_searchview_details_action_icons_default").addClass("ms_pattern_searchview_details_action_icons_active");
                                mService.containR.variable[scrID].datasource.filterInd = true;
                                mService.pattern.searchview.detail.load({
                                    detail: dSrc.data()
                                }, scrID, true);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    } else {
                        mService.app.showToast("filter_no_options_selected", "system_messages");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        downloadData: function (scrID, success, failure) {
            var refNo1,
            refNo2,
            controllerObj,
            index;
            try {
                if (window.navigator.onLine) {
                    mService.spinner.show();
                    patternScrID = scrID.replace("_list", "");
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    refNo1 = JSON.parse(controllerObj.dSource["details"].inputParam.refNo1);
                    refNo1["channel_id"] = "'" + mService.app.channel + "'";
                    refNo2 = JSON.parse(controllerObj.dSource["details"].inputParam.refNo2);
                    for (index = 0; index < Object.keys(refNo2).length; index++) {
                        refNo2[Object.keys(refNo2)[index]] = "'" + mService.containR.variable[scrID].selectedRecord[Object.keys(refNo2)[index]] + "'"
                    };
                    mService.dSource.retrieveCustomInfoDetail({
                        code: controllerObj.dSource["details"].inputParam.code,
                        refNo1: JSON.stringify(refNo1),
                        refNo2: JSON.stringify(refNo2)
                    }, function (data) {
                        try {
                            mService.spinner.hide();
                            if (data.header !== undefined && !$.isEmptyObject(data.header)) {
                                success(data);
                            } else {
                                if (data.header === undefined) {
                                    mService.app.showToast("ms_searchview_details_invalid_input", (mService.app.getScreenId()).replace("_list", ""));
                                } else if ($.isEmptyObject(data.header)) {
                                    mService.app.showToast("ms_searchview_details_header_not_available", (mService.app.getScreenId()).replace("_list", ""));
                                }
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
                    mService.app.showToast("internet_connection_error", "system_messages");
                    failure();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        load: function (data, scrID, filterInd) {
            var detailsTemplate,
            detailsHtml,
            controllerObj,
            headerTemplate,
            index;
            try {
                detailsHtml = "";
                controllerObj = mService.config.controller.getControllerObj(scrID);
                headerTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='header']");
                detailsTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='details']");
                if (!filterInd) {
                    if (headerTemplate !== undefined && headerTemplate.length !== 0) {
                        $("#" + scrID + "_screen_header_content").html((kendo.template($(headerTemplate).html())(data.header)));
                    };
                };
                if (detailsTemplate !== undefined && detailsTemplate.length !== 0) {
                    if (data.detail.length > 0) {
                        for (index = 0; index < data.detail.length; index++) {
                            detailsHtml = detailsHtml + (kendo.template($(detailsTemplate).html())(data.detail[index]));
                        };
                        $("#" + scrID + "_screen_detail_content").html(detailsHtml);
                        if (!filterInd) {
                            filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                            if (filterBtnEle.length > 0) {
                                if ($("#home_functional_drawer_filter_content").html() === "") {
                                    $("#home_functional_drawer_filter_content").attr("data_ms_filter_for", scrID);
                                    if (controllerObj.pattern !== undefined) {
                                        if (controllerObj.filterOptions !== undefined) {
                                            mService.pattern.searchview.detail.initializeFilter(controllerObj.filterOptions.split(","), mService.containR.variable[scrID].filterDatasource, scrID);
                                        }
                                    } else {
                                        mService.pattern.searchview.detail.initializeFilter($(filterBtnEle).attr("data-ms-filter-options").split(","), mService.containR.variable[scrID].filterDatasource, scrID);
                                    };
                                } else {
                                    filterForScreen = $("#home_functional_drawer_filter_content").attr("data_ms_filter_for");
                                    $("#home_functional_drawer_filter_content").html("");
                                    $("#home_functional_drawer_filter_content").attr("data_ms_filter_for", scrID);
                                    filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                                    $(filterBtnEle).removeClass("ms_pattern_searchview_details_action_icons_active").addClass("ms_pattern_searchview_details_action_icons_default");
                                    if (controllerObj.pattern !== undefined) {
                                        if (controllerObj.filterOptions !== undefined) {
                                            mService.pattern.searchview.detail.initializeFilter(controllerObj.filterOptions.split(","), mService.containR.variable[scrID].filterDatasource, scrID);
                                        }
                                    } else {
                                        mService.pattern.searchview.detail.initializeFilter($(filterBtnEle).attr("data-ms-filter-options").split(","), mService.containR.variable[scrID].filterDatasource, scrID);
                                    };
                                }
                            };
                        }
                    } else {
                        setTimeout(function () {
                            if (!filterInd) {
                                $("#" + scrID + "_filter_icon_container").hide();
                            };
                        }, 10);
                        emptyStateTemplate = $("body [data-ms-mswidget-for='" + scrID + "'][data-ms-mswidget-template-type='empty_state']");
                        if (emptyStateTemplate.length === 1) {
                            $("#" + scrID + "_screen_detail_content").html(mService.config.template.getTransformedHtml($(emptyStateTemplate[0]).attr("id")));
                        }
                    }
                };
                mService.config.label.resolve(scrID);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        initializeFilter: function (options, dataSource, scrID) {
            var filterObj,
            objKey,
            objValue,
            index;
            try {
                filterObj = mService.api.dataSource.filter(dataSource, options);
                if (mService.containR.variable[scrID].filterDatasource === undefined) {
                    mService.containR.variable[scrID].filterDatasource = {};
                };
                if (mService.containR.variable[scrID].filterDatasource.filterOptions === undefined) {
                    mService.containR.variable[scrID].filterDatasource.filterOptions = {};
                };
                mService.containR.variable[scrID].filterDatasource.filterOptions = filterObj;
                objKey = Object.keys(filterObj);
                objValue = Object.values(filterObj);
                $("#home_functional_drawer_filter_content").html("");
                for (index = 0; index < Object.keys(filterObj).length; index++) {
                    $("#home_functional_drawer_filter_content").append('<input id ="' + scrID + '_filter_' + objKey[index] + '"/>');
                    $("#" + scrID + "_filter_" + objKey[index]).msCheckboxgroup({
                        scrid: scrID,
                        lblgrpid: "filter",
                        lblid: objKey[index],
                        datasrc: objValue[index],
                        textfield: "description",
                        valuefield: "code",
                        stack: "false",
                        checked: ""
                    });
                };
                mService.config.label.resolve();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    list: {
        button: {
            search: function (ele) {
                var scrID,
                searchQuery,
                selectedFilterOption,
                patternScrID,
                controllerObj,
                refNo1,
                refNo2,
                index;
                try {
                    mService.spinner.show();
                    scrID = mService.application.view().id.replace("#", "");
                    patternScrID = scrID.replace("_list", "");
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    searchQuery = $("#" + scrID + "_search_box").val().toLowerCase().trim();
                    if (searchQuery !== "") {
                        if (window.navigator.onLine) {
                            selectedFilterOption = $("[name = '" + scrID + "_input']:checked").val() === undefined ? "" : $("[name = '" + scrID + "_input']:checked").val();
                            refNo1 = JSON.parse(controllerObj.dSource["list"].inputParam.refNo1);
                            refNo1["channel_id"] = "'" + mService.app.channel + "'";
                            refNo2 = JSON.parse(controllerObj.dSource["list"].inputParam.refNo2);
                            for (index = 0; index < Object.keys(refNo2).length; index++) {
                                if (Object.keys(refNo2)[index] === "filter_catg") {
                                    refNo2[Object.keys(refNo2)[index]] = "'" + selectedFilterOption + "'";
                                } else if (Object.keys(refNo2)[index] === "filter_text") {
                                    refNo2[Object.keys(refNo2)[index]] = "'" + searchQuery + "'";
                                }
                            };
                            mService.dSource.retrieveCustomInfoDetail({
                                code: controllerObj.dSource["list"].inputParam.code,
                                refNo1: JSON.stringify(refNo1),
                                refNo2: JSON.stringify(refNo2)
                            }, function (data) {
                                var dataSource,
                                emptyStateTemplate;
                                try {
                                    if (data.detail.length === 0) {
                                        $("#" + scrID + "_content_list").removeClass("ms_pattern_searchview_tile_wrapper");
                                        mService.app.showToast("ms_searchview_list_no_data", patternScrID);
                                        emptyStateTemplate = $("body [data-ms-mswidget-for='" + patternScrID + "'][data-ms-mswidget-template-type='empty_state']");
                                        if (emptyStateTemplate.length === 1) {
                                            $("#" + scrID + "_content_list").html(mService.config.template.getTransformedHtml($(emptyStateTemplate[0]).attr("id")));
                                        }
                                        mService.config.label.resolve();
                                        mService.spinner.hide();
                                    } else {
                                        dataSource = new kendo.data.DataSource({
                                            data: data.detail
                                        });
                                        dataSource.read().then(function () {
                                            try {
                                                mService.pattern.searchview.list.button.searchToggle();
                                                mService.containR.variable[patternScrID].datasource = dataSource;
                                                mService.pattern.searchview.list.load(dataSource.data());
                                                mService.spinner.hide();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            };
                                        });
                                    }
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
                            mService.app.showToast("internet_connection_error", "system_messages");
                        }
                    } else {
                        mService.spinner.hide();
                        mService.app.showToast("searchview_pattern_empty_search", "system_messages");
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            searchToggle: function (ele) {
                var panel,
                scrID;
                try {
                    scrID = mService.application.view().id.replace("#", "");
                    panel = $("#" + scrID + "_toggle_content");
                    if ($(panel).is(":hidden")) {
                        $(panel).slideDown("slow");
                        $("#" + scrID + "_panelbar_down").hide();
                        $("#" + scrID + "_panelbar_up").show();
                    } else {
                        $(panel).slideUp("slow");
                        $("#" + scrID + "_panelbar_down").show();
                        $("#" + scrID + "_panelbar_up").hide();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            searchInput: function (ele, evt) {
                var scrID,
                searchQuery;
                try {
                    searchQuery = $(ele).val().toLowerCase().trim();
                    scrID = mService.application.view().id.replace("#", "");
                    if (searchQuery !== "") {
                        $("#" + scrID + "_clear_btn").show();
                    } else {
                        $("#" + scrID + "_clear_btn").hide();
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            openDetailScreen: function (ele) {
                var scrID,
                paramObj,
                patternScrID;
                try {
                    scrID = mService.app.getScreenId();
                    patternScrID = scrID.replace("_list", "");
                    if (ele.attr("data-ms-containr-param") !== undefined) {
                        paramObj = JSON.parse(ele.attr("data-ms-containr-param"));
                        if (paramObj.list_uid !== undefined) {
                            selectedRecord = mService.containR.variable[patternScrID].datasource.getByUid(paramObj.list_uid);
                            mService.pattern.searchview.init(patternScrID + "_details", {
                                "selectedRecord": selectedRecord
                            });
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        load: function (data) {
            var scrID,
            patternScrID,
            controllerObj;
            try {
                scrID = mService.application.view().id.replace("#", "");
                patternScrID = scrID.replace("_list", "");
                if (data.length > 0) {
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (controllerObj.presentR.list_type !== undefined) {
                        listviewTemplate = $("body [data-ms-mswidget-for='" + patternScrID + "'][data-ms-mswidget-template-type='" + controllerObj.presentR.list_type + "']");
                    };
                    if (controllerObj.presentR.list_type === "listview") {
                        $("#" + scrID + "_content_list").removeClass("ms_pattern_searchview_tile_wrapper");
                    } else {
                        $("#" + scrID + "_content_list").addClass("ms_pattern_searchview_tile_wrapper");
                    };
                    $("#" + scrID + "_content_list").html(mService.config.template.getRenderedHtml($(listviewTemplate).attr("id"), data));
                } else {
                    $("#" + scrID + "_content_list").removeClass("ms_pattern_searchview_tile_wrapper");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        search: {
            clear: function (scrID) {
                try {
                    $("#" + scrID + "_search_box").val("");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            divideIntoGroups: function (options) {
                var groups,
                optionsIndex;
                try {
                    groups = [];
                    for (optionsIndex = 0; optionsIndex < options.length; optionsIndex += 6) {
                        groups.push(options.slice(optionsIndex, optionsIndex + 6));
                    }
                    return groups;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            generateFilterOptions: function (scrID) {
                var filterOptions,
                index,
                pages,
                controllerObj,
                filterOptionsEle;
                try {
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (controllerObj.filterOptions !== undefined && controllerObj.filterOptions !== "") {
                        filterOptionsEle = $("#" + scrID + "_search_filter_options_scrollview").data("kendoMobileScrollView");
                        if (filterOptionsEle === undefined) {
                            $("#" + scrID + "_search_filter_options_container").show();
                            filterOptions = (controllerObj.filterOptions).split(",");
                            filterOptions = filterOptions.map(function (value) {
                                try {
                                    return value.trim();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                            pages = mService.pattern.searchview.list.search.divideIntoGroups(filterOptions);
                            for (index = 0; index < pages.length; index++) {
                                $("#" + scrID + "_search_filter_options_scrollview").append("<div data-role='page' data-ms-uid='" + index + "'><div id='radiogroup_container_" + index + "' style='display: flex;flex-wrap: wrap;'></div></div>");
                                $("#radiogroup_container_" + index).html(mService.pattern.searchview.list.search.createRadioGroup(pages[index], scrID, ((index === 0) ? (true) : (false))));
                                $("#" + scrID + "_pager_list").append("<li id='" + scrID + "_pager_" + index + "'></li>");
                            };
                            if (pages.length > 1) {
                                $("#" + scrID + "_pager_0").addClass("ms_pager_active").removeClass("ms_pager_inactive").siblings().addClass("ms_pager_inactive").removeClass("ms_pager_active");
                            } else {
                                $("#" + scrID + "_pager_list").hide();
                            };
                            $("#" + scrID + "_search_filter_options_scrollview").kendoMobileScrollView({
                                contentHeight: "100%",
                                enablePager: false,
                                duration: 100,
                                itemsPerPage: 1,
                                bounceVelocityThreshold: 1,
                                changing: function (e) {
                                    var pagerContainer,
                                    pagerItems;
                                    try {
                                        currentPageNo = e.currentPage;
                                        nextPageNo = e.nextPage;
                                        scrID = mService.application.view().id.replace("#", "");
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
                            });
                        }
                    } else {
                        $("#" + scrID + "_search_filter_options_container").hide();
                    };
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            createRadioGroup: function (options, scrID, checkInd) {
                var radioHtml;
                try {
                    radioHtml = "";
                    for (index = 0; index < options.length; index++) {
                        radioHtml = radioHtml + mService.config.template.getTransformedHtml("msfilterRadiogroupContentTemplate", {
                            id: scrID,
                            value: options[index],
                            checked: ((checkInd) ? (index === 0 ? "checked" : "") : (""))
                        });
                    }
                    return radioHtml;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }

    },
    page: {
        afterShow: function (e) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        beforeHide: function (e) {
            try {
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
                    if (controllerObj.containR_type === "form") {
                        if (controllerObj.containR_subtype === "form") {
                            mService.pattern.searchview.list.search.generateFilterOptions(scrID);
                            if ($("#" + scrID + "_content_list").html() === "") {
                                mService.pattern.searchview.list.search.clear(scrID);
                                emptyStateTemplate = $("body [data-ms-mswidget-for='" + patternScrID + "'][data-ms-mswidget-template-type='empty_state']");
                                if (emptyStateTemplate.length === 1) {
                                    $("#" + scrID + "_content_list").html(mService.config.template.getTransformedHtml($(emptyStateTemplate[0]).attr("id")));
                                }
                                mService.config.label.resolve();
                            }
                        } else if (controllerObj.containR_subtype === "content") {
                            mService.pattern.searchview.detail.load(mService.containR.variable[scrID].datasource, scrID, false);
                            if (controllerObj.filterOptions !== undefined && controllerObj.filterOptions !== "") {
                                $("#" + scrID + "_filter_icon_container").show();
                            } else {
                                $("#" + scrID + "_filter_icon_container").hide();
                            }
                        }
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
    variable: {}
};
