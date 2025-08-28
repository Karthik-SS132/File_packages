var webConfigurationEngine = {
    applyConfiguredLabels: function (screenID, eventVerb) {
        var currentLabelConfig,
        configurationNode,
        labelNode,
        sourceLabelFields,
        sourceLabelFieldsCounter,
        fieldID,
        gridList,
        gridCounter,
        gridData,
        gridNode,
        gridColumnCounter,
        screenTitleNode,
        screenButtons,
        screenButtonsCounter,
        buttonID,
        buttonNode,
        buttonIDNode;
        if (webConfigurationEngine.variable.labelConfigurations.length != 0) {
            currentLabelConfig = $.grep(webConfigurationEngine.variable.labelConfigurations, function (element, index) {
                return element.screenID == screenID;
            })[0];
            if (currentLabelConfig != undefined) {
                configurationNode = currentLabelConfig.configuration.getElementsByTagName("label_configuration")[0];
                if (configurationNode != undefined) {
                    if (eventVerb != undefined) {
                        configurationNode = configurationNode.getElementsByTagName(eventVerb)[0];
                    };
                    screenTitleNode = configurationNode.getElementsByTagName("screen_title")[0];
                    if (screenTitleNode != undefined) {
                        $("#" + screenID + "_screen_title").prepend(screenTitleNode.childNodes[0].nodeValue);
                        $("#" + screenID + "_screen_title").addClass("screen_title");
                    };
                    sourceLabelFields = $.grep($("#" + screenID).find("label"), function (element, index) {
                        return ($(element).attr("id") != undefined && ($(element).attr("id").length == $(element).attr("id").lastIndexOf("_lbl") + 4));
                    });
                    for (sourceLabelFieldsCounter = 0; sourceLabelFieldsCounter < sourceLabelFields.length; sourceLabelFieldsCounter++) {
                        fieldID = $(sourceLabelFields[sourceLabelFieldsCounter]).attr("id").replace(screenID + "_", "");
                        fieldID = fieldID.substring(0, fieldID.length - 4);
                        labelNode = configurationNode.getElementsByTagName(fieldID)[0];
                        if (labelNode != undefined) {
                            $(sourceLabelFields[sourceLabelFieldsCounter]).prepend(labelNode.childNodes[0].nodeValue);
                        }
                    };
                    gridList = $("#" + screenID).find("[data-role = 'grid']");
                    for (gridCounter = 0; gridCounter < gridList.length; gridCounter++) {
                        gridData = $(gridList[gridCounter]).data("kendoGrid");
                        gridNode = configurationNode.getElementsByTagName($(gridList[gridCounter]).attr("id").replace(screenID + "_", ""))[0];
                        if (gridNode != undefined) {
                            for (gridColumnCounter = 0; gridColumnCounter < gridData.columns.length; gridColumnCounter++) {
                                $(gridList[gridCounter]).find("thead").find("[data-field = '" + gridData.columns[gridColumnCounter].field + "']")./*find(".k-link").*/ html(gridNode.getElementsByTagName(gridData.columns[gridColumnCounter].field)[0].childNodes[0].nodeValue);
                            }
                        }
                    };
                    buttonNode = configurationNode.getElementsByTagName("button")[0];
                    if (buttonNode != undefined) {
                        screenButtons = $.grep($("#" + screenID).find("[data-widget-type = 'w_button']"), function (element, index) {
                            return ($(element).attr("id") != undefined && ($(element).attr("id").length == $(element).attr("id").lastIndexOf("_btn") + 4));
                        });
                        for (screenButtonsCounter = 0; screenButtonsCounter < screenButtons.length; screenButtonsCounter++) {
                            buttonID = $(screenButtons[screenButtonsCounter]).attr("id").replace(screenID + "_", "");
                            buttonIDNode = buttonNode.getElementsByTagName(buttonID)[0];
                            if (buttonIDNode != undefined) {
                                $(screenButtons[screenButtonsCounter]).text(buttonIDNode.childNodes[0].nodeValue);
                            }
                        }
                    }
                    newButtonNode = configurationNode.getElementsByTagName("button")[0];
                    if (newButtonNode != undefined) {
                        newScreenButtons = $.grep($("#" + screenID + "_contextMenu").find("[data-widget-type = 'w_button']"), function (element, index) {
                            return ($(element).attr("id") != undefined && ($(element).attr("id").length == $(element).attr("id").lastIndexOf("_btn") + 4));
                        });
                        for (screenButtonsCounter = 0; screenButtonsCounter < newScreenButtons.length; screenButtonsCounter++) {
                            buttonID = $(newScreenButtons[screenButtonsCounter]).attr("id").replace(screenID + "_", "");
                            buttonIDNode = newButtonNode.getElementsByTagName(buttonID)[0];
                            if (buttonIDNode != undefined) {
                                if ($(newScreenButtons[screenButtonsCounter]).children()[0] != undefined) {
                                    $(newScreenButtons[screenButtonsCounter]).children()[0].textContent = buttonIDNode.childNodes[0].nodeValue;
                                } else {
                                    $(newScreenButtons[screenButtonsCounter]).append("<span class='k-link'>" + buttonIDNode.childNodes[0].nodeValue + "</span>");
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    applyConfiguredMenuLabels: function () {
        var menuConfigurationNode,
        menuLabelNode,
        menuItemListHTML,
        menuItemListCounter,
        screenIDNode;
        $.ajax({
            url: login_profile.protocol + "//" + login_profile.domain_name + ((login_profile.portno === "") ? ("") : (":" + login_profile.portno)) + "/common/components/Keys/GetConfiguration.aspx",
            async: false,
            method: "POST",
            dataType: "xml",
            contentType: "application/xml; charset=utf-8",
            data: JSON.stringify({
                "sessionID": login_profile.guid_val,
                "clientID": login_profile.client_id,
                "countryCode": login_profile.country_code,
                "userID": login_profile.user_id,
                "localeID": login_profile.locale_id,
                "appID": "",
                "framework": "1.0",
                "solution": login_profile.solution,
                "vertical": login_profile.vertical,
                "clientgroup": login_profile.clientgroup,
                "type": "configuration",
                "subType": "label",
                "fileName": "menu.xml"
            }),
            complete: function (response, status) {
                try {
                    if (response.responseXML !== undefined) {
                        menuConfigurationNode = response.responseXML.getElementsByTagName("menu_label_configuration")[0];
                        menuItemListHTML = $("#menu_content li");
                        for (menuItemListCounter = 0; menuItemListCounter < menuItemListHTML.length; menuItemListCounter++) {
                            if ($(menuItemListHTML[menuItemListCounter]).attr("data-screenid") != undefined) {
                                menuLabelNode = menuConfigurationNode.getElementsByTagName($(menuItemListHTML[menuItemListCounter]).attr("data-screenid"))[0];
                                if (menuLabelNode != undefined) {
                                    $(menuItemListHTML[menuItemListCounter]).text(menuLabelNode.childNodes[0].nodeValue);
                                }
                            }
                        }
                    }
                } catch (exception) {
                    return true;
                }
            }
        });
    },
    applyFeatureAccess: function (screenID) {
        var crudAccess,
        crudButtons,
        exportAccess,
        exportButton,
        importAccess,
        importButton,
        featureAccess,
        featureButtons,
        tempParam,
        buttonCounter;
        if (webWidgetInitializer.variable.customMainParam != undefined) {
            if (screenID.split("manage_custom_maintenance")[1] != "")
                tempParam = webWidgetInitializer.variable.customMainParam + screenID.split("manage_custom_maintenance")[1];
            else
                tempParam = webWidgetInitializer.variable.customMainParam;
        }
        crudAccess = $.grep(access_profile.user_functional_access, function (element, index) {
            return element.child_screen_id == screenID || element.child_screen_id == tempParam
        })[0];
        if (crudAccess != undefined) {
            crudButtons = $("#" + screenID).find("[data-button-group = 'crud']");
            for (buttonCounter = 0; buttonCounter < crudButtons.length; buttonCounter++) {
                if (crudAccess[$(crudButtons[buttonCounter]).attr("data-button-role") + "_access"] == "true") {
                    $(crudButtons[buttonCounter]).show();
                }
            }
            newCrudButtons = $("#" + screenID + "_contextMenu").find("[data-button-group = 'crud']");
            for (buttonCounter = 0; buttonCounter < newCrudButtons.length; buttonCounter++) {
                if (crudAccess[$(newCrudButtons[buttonCounter]).attr("data-button-role") + "_access"] == "true") {
                    $(newCrudButtons[buttonCounter]).show();
                }
            }
        };
        featureButtons = $("#" + screenID).find("[data-button-group = 'feature'], [data-button-group = 'workflow']");
        for (buttonCounter = 0; buttonCounter < featureButtons.length; buttonCounter++) {
            featureAccess = $.grep(access_profile.user_functional_access, function (element, index) {
                return element.child_screen_id == $(featureButtons[buttonCounter]).attr("data-button-role");
            })[0];
            if (featureAccess != undefined) {
                if (featureAccess.feature_access == "true") {
                    $(featureButtons[buttonCounter]).show();
                }
            }
        }
        newFeatureButtons = $("#" + screenID + "_contextMenu").find("[data-button-group = 'feature'], [data-button-group = 'workflow']");
        for (buttonCounter = 0; buttonCounter < newFeatureButtons.length; buttonCounter++) {
            featureAccess = $.grep(access_profile.user_functional_access, function (element, index) {
                return element.child_screen_id == $(newFeatureButtons[buttonCounter]).attr("data-button-role");
            })[0];
            if (featureAccess != undefined) {
                if (featureAccess.feature_access == "true") {
                    $(newFeatureButtons[buttonCounter]).show();
                }
            }
        }
        exportButton = $("#" + screenID).find("[data-button-role = 'export'], [data-button-group = 'export']");
        for (buttonCounter = 0; buttonCounter < exportButton.length; buttonCounter++) {
            exportAccess = $.grep(access_profile.user_functional_access, function (element, index) {
                return element.child_screen_id == $("#" + screenID).attr("id") || element.child_screen_id == tempParam;
            })[0];
            if (exportAccess != undefined) {
                if (exportAccess.export_access == "true") {
                    $(exportButton[buttonCounter]).show();
                }
            }
        }
        importButton = $("#" + screenID).find("[data-button-role = 'import'], [data-button-group = 'import']");
        for (buttonCounter = 0; buttonCounter < importButton.length; buttonCounter++) {
            importAccess = $.grep(access_profile.user_functional_access, function (element, index) {
                return element.child_screen_id == $("#" + screenID).attr("id");
            })[0];
            if (importAccess != undefined) {
                if (importAccess.import_access == "true") {
                    $(importButton[buttonCounter]).show();
                }
            }
        }
    },
    buildMenuHTML: function () {
        var innerHTMLString,
        functionalAccessCounter,
        functionalAccessCounterEndIndicator,
        sortedParentDisplayOrder,
        sortedChildDisplayOrder,
        childLevelNumberIndex,
        childDisplayOrderIndex,
        childSubDisplayIndex,
        parentDisplayOrderElements,
        childDisplayOrderElements,
        level1Counter,
        level2Counter,
        level3Counter,
        contentCounter,
        tempStorage,
        tempSubStorage,
        tempSubStorage2,
        homeDashboardTab;
        parentDisplayOrderElements = 0;
        innerHTMLString = "<ul id = 'menu_content'>";
        functionalAccessCounterEndIndicator = 0;
        homeDashboardTab = $.grep(access_profile.user_functional_access, function (element, index) {
            return element.child_level_no == "0" && element.child_feature_id_or_group == "HOMEDASHBOARD" && element.feature_access == "true"
        });
        if (homeDashboardTab.length != 0) {
            for (var dashboardCounter = 0; dashboardCounter < homeDashboardTab.length; dashboardCounter++) {
                innerHTMLString += "<li data-screenid = '" + homeDashboardTab[dashboardCounter].child_screen_id + "'>" + homeDashboardTab[dashboardCounter].child_feature_display_label + "</li>";
            };
        };
        for (var index = 0; index < access_profile.user_functional_access.length; index++) {
            if (parseInt(access_profile.user_functional_access[index].parent_display_order) > functionalAccessCounterEndIndicator) {
                functionalAccessCounterEndIndicator = parseInt(access_profile.user_functional_access[index].parent_display_order);
            }
        };
        for (functionalAccessCounter = 0; functionalAccessCounter <= functionalAccessCounterEndIndicator; functionalAccessCounter++) {
            sortedParentDisplayOrder = $.grep(access_profile.user_functional_access, function (element, index) {
                return element.parent_display_order == functionalAccessCounter.toString() && element.parent_feature_group.indexOf("CPORT") === -1 && element.parent_feature_group.indexOf("WORKFLOW") === -1;
            });
            if (sortedParentDisplayOrder.length != 0) {
                parentDisplayOrderElements += sortedParentDisplayOrder.length;
                if (functionalAccessCounter == 0) {
                    continue;
                };
                childLevelNumberIndex = 1,
                sortedChildDisplayOrder = [],
                childDisplayOrderIndex = 1,
                childDisplayOrderElements = 0;
                while (true) {
                    tempStorage = $.grep(sortedParentDisplayOrder, function (element, index) {
                        return element.child_level_no == childLevelNumberIndex.toString();
                    });
                    childDisplayOrderElements += tempStorage.length;
                    if (tempStorage.length != 0) {
                        sortedChildDisplayOrder.push(tempStorage);
                    };
                    childLevelNumberIndex++;
                    if (childDisplayOrderElements == sortedParentDisplayOrder.length) {
                        break;
                    }
                };
                level1Counter = 0;
                innerHTMLString += "<li>" + sortedChildDisplayOrder[0][0].parent_group_display_label + "<ul>";
                while (true) {
                    if (sortedChildDisplayOrder.length == 1) {
                        tempStorage = $.grep(sortedChildDisplayOrder[0], function (element, index) {
                            return element.child_display_order == childDisplayOrderIndex.toString();
                        });
                        level1Counter += tempStorage.length;
                        if (tempStorage.length != 0) {
                            if (tempStorage[0].feature_access == "true") {
                                innerHTMLString += "<li data-screenid = '" + tempStorage[0].child_screen_id + "'>" + tempStorage[0].child_feature_display_label + "</li>";
                            }
                        };
                        childDisplayOrderIndex++;
                        if (level1Counter == sortedChildDisplayOrder[0].length) {
                            break;
                        }
                    } else if (sortedChildDisplayOrder.length == 2) {
                        tempStorage = $.grep(sortedChildDisplayOrder[0], function (element, index) {
                            return element.child_display_order == childDisplayOrderIndex.toString();
                        });
                        level1Counter += tempStorage.length;
                        if (tempStorage.length != 0) {
                            if (tempStorage[0].child_feature_id_or_group_ind == "F") {
                                if (tempStorage[0].feature_access == "true") {
                                    innerHTMLString += "<li data-screenid = '" + tempStorage[0].child_screen_id + "'>" + tempStorage[0].child_feature_display_label + "</li>";
                                }
                            } else if (tempStorage[0].child_feature_id_or_group_ind == "G") {
                                childSubDisplayIndex = 1,
                                level2Counter = 0;
                                innerHTMLString += "<li>" + tempStorage[0].child_feature_display_label + "<ul>";
                                while (true) {
                                    tempSubStorage = $.grep(sortedChildDisplayOrder[1], function (element, index) {
                                        return element.child_display_order == childSubDisplayIndex.toString();
                                    });
                                    level2Counter += tempSubStorage.length;
                                    if (tempSubStorage.length != 0) {
                                        if (tempStorage[0].child_feature_id_or_group == tempSubStorage[0].parent_feature_group) {
                                            if (tempSubStorage[0].feature_access == "true") {
                                                innerHTMLString += "<li data-screenid = '" + tempSubStorage[0].child_screen_id + "'>" + tempSubStorage[0].child_feature_display_label + "</li>";
                                            }
                                        }
                                    };
                                    childSubDisplayIndex++;
                                    if (level2Counter == sortedChildDisplayOrder[1].length) {
                                        break;
                                    }
                                };
                                innerHTMLString += "</ul></li>";
                            }
                        };
                        childDisplayOrderIndex++;
                        if (level1Counter == sortedChildDisplayOrder[0].length) {
                            break;
                        }
                    } else if (sortedChildDisplayOrder.length == 3) {
                        tempStorage = $.grep(sortedChildDisplayOrder[0], function (element, index) {
                            return element.child_display_order == childDisplayOrderIndex.toString();
                        });
                        level1Counter += tempStorage.length;
                        if (tempStorage.length != 0) {
                            if (tempStorage[0].child_feature_id_or_group_ind == "F") {
                                if (tempStorage[0].feature_access == "true") {
                                    innerHTMLString += "<li data-screenid = '" + tempStorage[0].child_screen_id + "'>" + tempStorage[0].child_feature_display_label + "</li>";
                                }
                            } else if (tempStorage[0].child_feature_id_or_group_ind == "G") {
                                childSubDisplayIndex = 1,
                                level2Counter = 0;
                                innerHTMLString += "<li>" + tempStorage[0].child_feature_display_label + "<ul>";
                                while (true) {
                                    tempSubStorage = $.grep(sortedChildDisplayOrder[1], function (element, index) {
                                        return element.child_display_order == childSubDisplayIndex.toString();
                                    });
                                    level2Counter += tempSubStorage.length;
                                    if (tempSubStorage.length != 0) {
                                        if (tempSubStorage[0].child_feature_id_or_group_ind == "F") {
                                            if (tempStorage[0].child_feature_id_or_group == tempSubStorage[0].parent_feature_group) {
                                                if (tempSubStorage[0].feature_access == "true") {
                                                    innerHTMLString += "<li data-screenid = '" + tempSubStorage[0].child_screen_id + "'>" + tempSubStorage[0].child_feature_display_label + "</li>";
                                                }
                                            }
                                        } else if (tempSubStorage[0].child_feature_id_or_group_ind == "G") {
                                            childSubDisplayIndex_2 = 1,
                                            level3Counter = 0;
                                            innerHTMLString += "<li>" + tempSubStorage[0].child_feature_display_label + "<ul>";
                                            while (true) {
                                                tempSubStorage2 = $.grep(sortedChildDisplayOrder[2], function (element, index) {
                                                    return element.child_display_order == childSubDisplayIndex_2.toString();
                                                });
                                                level3Counter += tempSubStorage2.length;
                                                if (tempSubStorage2.length != 0) {
                                                    if (tempSubStorage[0].child_feature_id_or_group == tempSubStorage2[0].parent_feature_group) {
                                                        if (tempSubStorage[0].feature_access == "true") {
                                                            innerHTMLString += "<li data-screenid = '" + tempSubStorage2[0].child_screen_id + "'>" + tempSubStorage2[0].child_feature_display_label + "</li>";
                                                        }
                                                    }
                                                };
                                                childSubDisplayIndex_2++;
                                                if (level3Counter == sortedChildDisplayOrder[2].length) {
                                                    break;
                                                }
                                            };
                                            innerHTMLString += "</ul></li>";
                                        }
                                    };
                                    childSubDisplayIndex++;
                                    if (level2Counter == sortedChildDisplayOrder[1].length) {
                                        break;
                                    }
                                };
                                innerHTMLString += "</ul></li>";
                            }
                        };
                        childDisplayOrderIndex++;
                        if (level1Counter == sortedChildDisplayOrder[0].length) {
                            break;
                        }
                    }
                };
                innerHTMLString += "</ul></li>";
                if (parentDisplayOrderElements == access_profile.user_functional_access.length) {
                    break;
                }
            }
        };
        innerHTMLString += "</ul>";
        $("#menu_home").html(innerHTMLString);
        for (contentCounter = 0; contentCounter < $("#menu_content li ul li ul li ul").length; contentCounter++) {
            if ($($("#menu_content li ul li ul li ul")[contentCounter]).children().length == 0) {
                $($("#menu_content li ul li ul li ul")[contentCounter]).parent().attr("class", "menu_content_delete");
            }
        };
        $("#menu_content .menu_content_delete").remove();
        for (contentCounter = 0; contentCounter < $("#menu_content li ul li ul").length; contentCounter++) {
            if ($($("#menu_content li ul li ul")[contentCounter]).children().length == 0) {
                $($("#menu_content li ul li ul")[contentCounter]).parent().attr("class", "menu_content_delete");
            }
        };
        $("#menu_content .menu_content_delete").remove();
        for (contentCounter = 0; contentCounter < $("#menu_content li ul").length; contentCounter++) {
            if ($($("#menu_content li ul")[contentCounter]).children().length == 0) {
                $($("#menu_content li ul")[contentCounter]).parent().attr("class", "menu_content_delete");
            }
        };
        $("#menu_content .menu_content_delete").remove();
    },
    createConfiguredFields: function (screenID, eventVerb) {
        var currentUiConfig,
        configurationNode,
        eventVerbNode,
        contentRootNode,
        contentNodes,
        contentNodesCounter,
        contentID,
        fieldNodes,
        fieldNodesCounter,
        fieldID,
        filterMode,
        fieldType,
        initObject;
        currentUiConfig = webConfigurationEngine.getUiConfigurationObject(screenID);
        if (currentUiConfig != undefined) {
            configurationNode = currentUiConfig.configuration.getElementsByTagName("ui_configuration")[0];
            if (configurationNode != undefined) {
                contentNodes = [];
                if (eventVerb != undefined) {
                    eventVerbNode = configurationNode.getElementsByTagName(eventVerb)[0];
                    if (eventVerbNode != undefined) {
                        contentRootNode = eventVerbNode.getElementsByTagName("content")[0];
                        if (contentRootNode != undefined) {
                            contentNodes = contentRootNode.childNodes;
                        }
                    }
                } else {
                    contentRootNode = configurationNode.getElementsByTagName("content")[0];
                    if (contentRootNode != undefined) {
                        contentNodes = contentRootNode.childNodes;
                    }
                };
                for (contentNodesCounter = 0; contentNodesCounter < contentNodes.length; contentNodesCounter++) {
                    contentID = contentNodes[contentNodesCounter].nodeName;
                    fieldNodes = contentNodes[contentNodesCounter].getElementsByTagName("field");
                    for (fieldNodesCounter = 0; fieldNodesCounter < fieldNodes.length; fieldNodesCounter++) {
                        fieldID = fieldNodes[fieldNodesCounter].getAttribute("id");
                        filterMode = false;
                        if (fieldID.substring(fieldID.length - 6) == "filter") {
                            filterMode = true;
                        };
                        fieldType = fieldNodes[fieldNodesCounter].getElementsByTagName("type")[0].childNodes[0].nodeValue;
                        webConfigurationEngine.createFieldGroup({
                            contentID: screenID + "_" + contentID,
                            fieldID: screenID + "_" + fieldID,
                            filterMode: filterMode,
                            type: fieldType
                        });
                        initObject = webConfigurationEngine.getInitializationObject(fieldNodes[fieldNodesCounter]);
                        initObject.screenID = screenID;
                        if (fieldType == "w_textbox") {
                            $("#" + screenID + "_" + fieldID).initializeWTextbox(initObject);
                        } else if (fieldType == "w_textarea") {
                            $("#" + screenID + "_" + fieldID).initializeWTextarea(initObject);
                        } else if (fieldType == "w_checkbox") {
                            $("#" + screenID + "_" + fieldID).initializeWCheckbox(initObject);
                        } else if (fieldType == "w_datepicker") {
                            $("#" + screenID + "_" + fieldID).initializeWDatepicker(initObject);
                        } else if (fieldType == "w_datetimepicker") {
                            $("#" + screenID + "_" + fieldID).initializeWDatetimepicker(initObject);
                        } else if (fieldType == "w_numerictextbox") {
                            $("#" + screenID + "_" + fieldID).initializeWNumerictextbox(initObject);
                        } else if (fieldType == "w_dropdownlist") {
                            $("#" + screenID + "_" + fieldID).initializeWDropdownlist(initObject);
                        } else if (fieldType == "w_combobox") {
                            $("#" + screenID + "_" + fieldID).initializeWCombobox(initObject);
                        } else if (fieldType == "w_searchbox") {
                            $("#" + screenID + "_" + fieldID).initializeWSearchbox(initObject);
                        } else if (fieldType == "w_multiselect") {
                            $("#" + screenID + "_" + fieldID).initializeWMultiselect(initObject);
                        } else if (fieldType == "w_displayarea") {
                            $("#" + screenID + "_" + fieldID).initializeWDisplayarea(initObject);
                        } else if (fieldType == "w_combotextbox") {
                            $("#" + screenID + "_" + fieldID).initializeWCombotextbox(initObject);
                        }
                    }
                }
            }
        }
    },
    createFieldGroup: function (fieldGroupObject) {
        var dtClass,
        fieldStyle,
        fieldElement,
        descriptionElement,
        validationElement;
        dtClass = "term_two";
        fieldStyle = "";
        if (fieldGroupObject.filterMode) {
            dtClass = "term_one";
            fieldStyle = "style = 'width:160px'";
        };
        fieldElement = "<input id = '" + fieldGroupObject.fieldID + "' name = '" + fieldGroupObject.fieldID + "'></input><br/>";
        if (fieldGroupObject.type == "w_textarea") {
            fieldElement = "<textarea id = '" + fieldGroupObject.fieldID + "' name = '" + fieldGroupObject.fieldID + "'></textarea><br/>";
        } else if (fieldGroupObject.type == "w_displayarea") {
            fieldElement = "<span id = '" + fieldGroupObject.fieldID + "' name = '" + fieldGroupObject.fieldID + "'></span><br/>";
        } else if (fieldGroupObject.type == "w_multiselect") {
            fieldElement = "<select id = '" + fieldGroupObject.fieldID + "' name = '" + fieldGroupObject.fieldID + "'></select><br/>";
        };
        descriptionElement = "";
        if (fieldGroupObject.type == "w_dropdownlist" || fieldGroupObject.type == "w_combobox" || fieldGroupObject.type == "w_searchbox" || fieldGroupObject.type == "w_combotextbox") {
            descriptionElement = "<span class = 'display_description' data-for = '" + fieldGroupObject.fieldID + "'></span>";
        };
        validationElement = "<span class = 'k-invalid-msg' data-for = '" + fieldGroupObject.fieldID + "'></span>";
        $("#" + fieldGroupObject.contentID).append("<span id = '" + fieldGroupObject.fieldID + "_group" + "'></span>");
        $("#" + fieldGroupObject.fieldID + "_group").append("<dt class = '" + dtClass + "'><label id = '" + fieldGroupObject.fieldID + "_lbl" + "'></label></dt>");
        $("#" + fieldGroupObject.fieldID + "_group").append("<dd class = 'colen'>:</dd>");
        $("#" + fieldGroupObject.fieldID + "_group").append("<dd class = 'value' " + fieldStyle + ">" + fieldElement + descriptionElement + validationElement + "</dd>");
    },
    getGridColumns: function (gridColumnObject) {
        var columnList,
        currentUiConfig,
        configurationNode,
        configurationParamNode,
        gridNode,
        currentGridNode,
        fieldNodes,
        fieldNodesCounter,
        displayNode,
        columnObject,
        widthNode,
        templateNode,
        editableNode,
        preferenceList,
        gridPreferenceList,
        gridPreferenceObject,
        keyName,
        tempColumnList,
        tempColumnObject;
        columnList = [];
        currentUiConfig = webConfigurationEngine.getUiConfigurationObject(gridColumnObject.screenID);
        if (currentUiConfig != undefined) {
            configurationNode = currentUiConfig.configuration.getElementsByTagName("ui_configuration")[0];
            if (configurationNode != undefined) {
                if (gridColumnObject.configurationParam != undefined && gridColumnObject.configurationParam != "") {
                    configurationParamNode = configurationNode.getElementsByTagName(gridColumnObject.configurationParam)[0];
                    if (configurationParamNode != undefined) {
                        gridNode = configurationParamNode.getElementsByTagName("grid")[0];
                    }
                } else {
                    gridNode = configurationNode.getElementsByTagName("grid")[0];
                };
                if (gridNode != undefined) {
                    currentGridNode = gridNode.getElementsByTagName(gridColumnObject.fieldID)[0];
                    if (currentGridNode != undefined) {
                        fieldNodes = currentGridNode.getElementsByTagName("field");
                        for (fieldNodesCounter = 0; fieldNodesCounter < fieldNodes.length; fieldNodesCounter++) {
                            displayNode = fieldNodes[fieldNodesCounter].getElementsByTagName("display")[0];
                            if (displayNode != undefined) {
                                if (displayNode.childNodes[0].nodeValue == "true") {
                                    widthNode = fieldNodes[fieldNodesCounter].getElementsByTagName("width")[0];
                                    lockedNode = fieldNodes[fieldNodesCounter].getElementsByTagName("locked")[0];
                                    templateNode = fieldNodes[fieldNodesCounter].getElementsByTagName("template")[0];
                                    editableNode = fieldNodes[fieldNodesCounter].getElementsByTagName("editable")[0];
                                    columnObject = {
                                        field: fieldNodes[fieldNodesCounter].getAttribute("id"),
                                        width: "",
                                        locked: false,
                                        template: false
                                    };
                                    if (widthNode != undefined) {
                                        columnObject.width = widthNode.childNodes[0].nodeValue;
                                    };
                                    if (lockedNode != undefined) {
                                        if (lockedNode.childNodes[0].nodeValue != "false") {
                                            columnObject.locked = lockedNode.childNodes[0].nodeValue;
                                        }
                                    };
                                    if (templateNode != undefined) {
                                        if (templateNode.childNodes[0].nodeValue != "false") {
                                            columnObject.template = templateNode.childNodes[0].nodeValue;
                                        }
                                    };
                                    if (editableNode != undefined && editableNode.childNodes[0].nodeValue == "true") {
                                        columnObject.editable = function () {
                                            return true
                                        };
                                    } else {
                                        columnObject.editable = function () {
                                            return false
                                        };
                                    };
                                    columnList.push(columnObject);
                                }
                            }
                        };
                        if (gridColumnObject.favourite) {
                            preferenceList = executeService_retrieve_user_preferences({
                                p_screen_id: gridColumnObject.screenID
                            });
                            gridPreferenceList = $.grep(preferenceList, function (element, index) {
                                return element.preference_area == 'GRID' && JSON.parse(element.preference_json)['grid_id'] == gridColumnObject.fieldID;
                            })[0];
                            if (gridPreferenceList != undefined && gridPreferenceList.preference_json != undefined && gridPreferenceList.preference_json != "") {
                                gridPreferenceObject = JSON.parse(gridPreferenceList.preference_json);
                                tempColumnList = [];
                                for (keyName in gridPreferenceObject) {
                                    tempColumnObject = $.grep(columnList, function (element, index) {
                                        return element.field == keyName;
                                    })[0];
                                    if (tempColumnObject != undefined) {
                                        tempColumnList.push(tempColumnObject);
                                    }
                                };
                                columnList = tempColumnList;
                            }
                        }
                    }
                }
            }
        };
        return columnList;
    },
    getInitializationObject: function (fieldConfig) {
        var initObject,
        defaultValueNode,
        defaultValueDescriptionNode,
        inputTypeNode,
        maxlengthNode,
        formatNode,
        minimumNode,
        maximumNode,
        intervalNode,
        stepNode,
        decimalsNode,
        dataTextFieldNode,
        dataValueFieldNode,
        childFieldIDNode,
        templateNode,
        serverFilteringNode,
        dataSourceNode,
        keyFieldNode,
        applicationNameNode,
        serviceNameNode,
        outputPathNode,
        inputParameterNode,
        informationTypeNode,
        searchField1Node,
        searchField2Node,
        searchField3Node,
        searchField4Node,
        searchField5Node,
        inputParameterCounter,
        keyFieldParameterCounter,
        minLengthNode;
        initObject = {};
        if (fieldConfig.getAttribute("id").substring(fieldConfig.getAttribute("id").length - 6) == "filter") {
            initObject.filterMode = true;
        } else {
            initObject.filterMode = false;
        };
        defaultValueNode = fieldConfig.getElementsByTagName("defaultValue")[0];
        defaultValueDescriptionNode = fieldConfig.getElementsByTagName("defaultValueDescription")[0];
        inputTypeNode = fieldConfig.getElementsByTagName("inputType")[0];
        maxlengthNode = fieldConfig.getElementsByTagName("maxlength")[0];
        formatNode = fieldConfig.getElementsByTagName("format")[0];
        minimumNode = fieldConfig.getElementsByTagName("minimum")[0];
        maximumNode = fieldConfig.getElementsByTagName("maximum")[0];
        intervalNode = fieldConfig.getElementsByTagName("interval")[0];
        stepNode = fieldConfig.getElementsByTagName("step")[0];
        decimalsNode = fieldConfig.getElementsByTagName("decimals")[0];
        dataTextFieldNode = fieldConfig.getElementsByTagName("dataTextField")[0];
        dataValueFieldNode = fieldConfig.getElementsByTagName("dataValueField")[0];
        minLengthNode = fieldConfig.getElementsByTagName("minLength")[0];
        childFieldIDNode = fieldConfig.getElementsByTagName("childFieldID")[0];
        templateNode = fieldConfig.getElementsByTagName("template")[0];
        serverFilteringNode = fieldConfig.getElementsByTagName("serverFiltering")[0];
        dataSourceNode = fieldConfig.getElementsByTagName("dataSource")[0];
        keyFieldNode = fieldConfig.getElementsByTagName("keyField")[0];
        if (defaultValueNode != undefined) {
            if (defaultValueNode.childNodes[0] != undefined) {
                initObject.defaultValue = defaultValueNode.childNodes[0].nodeValue;
            }
        };
        if (defaultValueDescriptionNode != undefined) {
            if (defaultValueDescriptionNode.childNodes[0] != undefined) {
                initObject.defaultValueDescription = defaultValueDescriptionNode.childNodes[0].nodeValue;
            }
        };
        if (inputTypeNode != undefined) {
            if (inputTypeNode.childNodes[0] != undefined) {
                initObject.type = inputTypeNode.childNodes[0].nodeValue;
            }
        };
        if (maxlengthNode != undefined) {
            if (maxlengthNode.childNodes[0] != undefined) {
                initObject.maxlength = maxlengthNode.childNodes[0].nodeValue;
            }
        };
        if (formatNode != undefined) {
            if (formatNode.childNodes[0] != undefined) {
                initObject.format = formatNode.childNodes[0].nodeValue;
            }
        };
        if (minimumNode != undefined) {
            if (minimumNode.childNodes[0] != undefined) {
                initObject.minimum = minimumNode.childNodes[0].nodeValue;
            }
        };
        if (maximumNode != undefined) {
            if (maximumNode.childNodes[0] != undefined) {
                initObject.maximum = maximumNode.childNodes[0].nodeValue;
            }
        };
        if (intervalNode != undefined) {
            if (intervalNode.childNodes[0] != undefined) {
                initObject.interval = intervalNode.childNodes[0].nodeValue;
            }
        };
        if (stepNode != undefined) {
            if (stepNode.childNodes[0] != undefined) {
                initObject.step = stepNode.childNodes[0].nodeValue;
            }
        };
        if (decimalsNode != undefined) {
            if (decimalsNode.childNodes[0] != undefined) {
                initObject.decimals = decimalsNode.childNodes[0].nodeValue;
            }
        };
        if (dataTextFieldNode != undefined) {
            if (dataTextFieldNode.childNodes[0] != undefined) {
                initObject.dataTextField = dataTextFieldNode.childNodes[0].nodeValue;
            }
        };
        if (dataValueFieldNode != undefined) {
            if (dataValueFieldNode.childNodes[0] != undefined) {
                initObject.dataValueField = dataValueFieldNode.childNodes[0].nodeValue;
            }
        };
        if (minLengthNode != undefined) {
            if (minLengthNode.childNodes[0] != undefined) {
                initObject.minLength = minLengthNode.childNodes[0].nodeValue;
            }
        };
        if (childFieldIDNode != undefined) {
            if (childFieldIDNode.childNodes[0] != undefined) {
                initObject.childFieldID = childFieldIDNode.childNodes[0].nodeValue;
            }
        };
        if (templateNode != undefined) {
            if (templateNode.childNodes[0] != undefined) {
                initObject.template = templateNode.childNodes[0].nodeValue;
            }
        };
        if (serverFilteringNode != undefined) {
            if (serverFilteringNode.childNodes[0] != undefined) {
                initObject.serverFiltering = serverFilteringNode.childNodes[0].nodeValue;
            }
        };
        if (dataSourceNode != undefined) {
            if (dataSourceNode.childNodes[0] != undefined) {
                if (dataSourceNode.childElementCount == 0) {
                    initObject.dataSource = mserviceUtilities.getActualValue(dataSourceNode.childNodes[0].nodeValue);
                } else {
                    initObject.dataSource = {};
                    applicationNameNode = dataSourceNode.getElementsByTagName("applicationName")[0];
                    serviceNameNode = dataSourceNode.getElementsByTagName("serviceName")[0];
                    outputPathNode = dataSourceNode.getElementsByTagName("outputPath")[0];
                    inputParameterNode = dataSourceNode.getElementsByTagName("inputParameter")[0];
                    informationTypeNode = dataSourceNode.getElementsByTagName("informationType")[0];
                    searchField1Node = dataSourceNode.getElementsByTagName("searchField1")[0];
                    searchField2Node = dataSourceNode.getElementsByTagName("searchField2")[0];
                    searchField3Node = dataSourceNode.getElementsByTagName("searchField3")[0];
                    searchField4Node = dataSourceNode.getElementsByTagName("searchField4")[0];
                    searchField5Node = dataSourceNode.getElementsByTagName("searchField5")[0];
                    if (applicationNameNode != undefined) {
                        if (applicationNameNode.childNodes[0] != undefined) {
                            initObject.dataSource.applicationName = applicationNameNode.childNodes[0].nodeValue;
                        }
                    };
                    if (serviceNameNode != undefined) {
                        if (serviceNameNode.childNodes[0] != undefined) {
                            initObject.dataSource.serviceName = serviceNameNode.childNodes[0].nodeValue;
                        }
                    };
                    if (outputPathNode != undefined) {
                        if (outputPathNode.childNodes[0] != undefined) {
                            initObject.dataSource.outputPath = outputPathNode.childNodes[0].nodeValue;
                        }
                    };
                    if (inputParameterNode != undefined) {
                        if (inputParameterNode.childNodes[0] != undefined) {
                            initObject.dataSource.inputParameter = {};
                            for (inputParameterCounter = 0; inputParameterCounter < inputParameterNode.childElementCount; inputParameterCounter++) {
                                if (inputParameterNode.childNodes[inputParameterCounter].childNodes[0] != undefined) {
                                    initObject.dataSource.inputParameter[inputParameterNode.childNodes[inputParameterCounter].nodeName] = inputParameterNode.childNodes[inputParameterCounter].childNodes[0].nodeValue;
                                } else {
                                    initObject.dataSource.inputParameter[inputParameterNode.childNodes[inputParameterCounter].nodeName] = "";
                                }
                            }
                        }
                    };
                    if (informationTypeNode != undefined) {
                        if (informationTypeNode.childNodes[0] != undefined) {
                            initObject.dataSource.informationType = informationTypeNode.childNodes[0].nodeValue;
                        }
                    };
                    if (searchField1Node != undefined) {
                        if (searchField1Node.childNodes[0] != undefined) {
                            initObject.dataSource.searchField1 = searchField1Node.childNodes[0].nodeValue;
                        }
                    };
                    if (searchField2Node != undefined) {
                        if (searchField2Node.childNodes[0] != undefined) {
                            initObject.dataSource.searchField2 = searchField2Node.childNodes[0].nodeValue;
                        }
                    };
                    if (searchField3Node != undefined) {
                        if (searchField3Node.childNodes[0] != undefined) {
                            initObject.dataSource.searchField3 = searchField3Node.childNodes[0].nodeValue;
                        }
                    };
                    if (searchField4Node != undefined) {
                        if (searchField4Node.childNodes[0] != undefined) {
                            initObject.dataSource.searchField4 = searchField4Node.childNodes[0].nodeValue;
                        }
                    };
                    if (searchField5Node != undefined) {
                        if (searchField5Node.childNodes[0] != undefined) {
                            initObject.dataSource.searchField5 = searchField5Node.childNodes[0].nodeValue;
                        }
                    };
                }
            }
        };
        if (keyFieldNode != undefined) {
            if (keyFieldNode.childNodes[0] != undefined) {
                initObject.keyField = {};
                for (keyFieldParameterCounter = 0; keyFieldParameterCounter < keyFieldNode.childElementCount; keyFieldParameterCounter++) {
                    if (keyFieldNode.childNodes[keyFieldParameterCounter].childNodes[0] != undefined) {
                        initObject.keyField[keyFieldNode.childNodes[keyFieldParameterCounter].nodeName] = keyFieldNode.childNodes[keyFieldParameterCounter].childNodes[0].nodeValue;
                    } else {
                        initObject.keyField[keyFieldNode.childNodes[keyFieldParameterCounter].nodeName] = "";
                    }
                }
            }
        };
        return initObject;
    },
    getUiConfigurationObject: function (currentScreenID) {
        var returnValue,
        filePath;
        if (currentScreenID != undefined) {
            if (currentScreenID === "manage_custom_maintenance") {
                webConfigurationEngine.variable.uiConfigurations = webConfigurationEngine.variable.uiConfigurations.filter((obj) => obj.screenID !== "manage_custom_maintenance")
            };
            returnValue = $.grep(webConfigurationEngine.variable.uiConfigurations, function (element, index) {
                return element.screenID == currentScreenID;
            })[0];

            filePath = currentScreenID;
            if (webWidgetInitializer.variable.customMainParam != undefined && filePath.indexOf("manage_custom_maintenance") != -1) {
                if (filePath.split("manage_custom_maintenance")[1] != "")
                    filePath = webWidgetInitializer.variable.customMainParam + filePath.split("manage_custom_maintenance")[1];
                else
                    filePath = webWidgetInitializer.variable.customMainParam;
            }
            if (returnValue == undefined) {
                $.ajax({
                    url: login_profile.protocol + "//" + login_profile.domain_name + ((login_profile.portno === "") ? ("") : (":" + login_profile.portno)) + "/common/components/Keys/GetConfiguration.aspx",
                    async: false,
                    method: "POST",
                    dataType: "xml",
                    contentType: "application/xml; charset=utf-8",
                    data: JSON.stringify({
                        "sessionID": login_profile.guid_val,
                        "clientID": login_profile.client_id,
                        "countryCode": login_profile.country_code,
                        "userID": login_profile.user_id,
                        "localeID": login_profile.locale_id,
                        "appID": "",
                        "framework": "1.0",
                        "solution": login_profile.solution,
                        "vertical": login_profile.vertical,
                        "clientgroup": login_profile.clientgroup,
                        "type": "configuration",
                        "subType": "ui",
                        "fileName": filePath + ".xml"
                    }),
                    complete: function (response, status) {
                        try {
                            if (response.responseXML !== undefined) {
                                returnValue = {
                                    screenID: currentScreenID,
                                    configuration: response.responseXML
                                };
                                webConfigurationEngine.variable.uiConfigurations.push(returnValue);
                            }
                        } catch (exception) {
                            return true;
                        }
                    }
                });
            }
        };
        return returnValue;
    },
    reorderScreenFields: function (screenID, contentList, eventVerb) {
        var contentCounter,
        contentID,
        currentUiConfig,
        configurationNode,
        eventVerbNode,
        contentRootNode,
        contentNode,
        fieldOrderNode,
        contentFieldsList,
        contentFieldsCounter,
        columnLength,
        columnCounter;
        if (contentList != undefined) {
            for (contentCounter = 0; contentCounter < contentList.length; contentCounter++) {
                contentID = contentList[contentCounter].contentID;
                currentUiConfig = webConfigurationEngine.getUiConfigurationObject(screenID); ;
                if (currentUiConfig != undefined) {
                    configurationNode = currentUiConfig.configuration.getElementsByTagName("ui_configuration")[0];
                    if (configurationNode != undefined) {
                        if (eventVerb != undefined) {
                            eventVerbNode = configurationNode.getElementsByTagName(eventVerb)[0];
                            if (eventVerbNode != undefined) {
                                contentRootNode = eventVerbNode.getElementsByTagName("content")[0];
                                if (contentRootNode != undefined) {
                                    contentNode = contentRootNode.getElementsByTagName(contentID)[0];
                                }
                            }
                        } else {
                            contentRootNode = configurationNode.getElementsByTagName("content")[0];
                            if (contentRootNode != undefined) {
                                contentNode = contentRootNode.getElementsByTagName(contentID)[0];
                            }
                        };
                        if (contentNode != undefined) {
                            fieldOrderNode = contentNode.getElementsByTagName("fieldOrder")[0];
                            if (fieldOrderNode != undefined) {
                                contentFieldsList = fieldOrderNode.childNodes[0].nodeValue.split(",");
                                for (contentFieldsCounter = 1; contentFieldsCounter < contentFieldsList.length; contentFieldsCounter++) {
                                    $("#" + screenID + "_" + contentFieldsList[contentFieldsCounter].trim() + "_group").insertAfter("#" + screenID + "_" + contentFieldsList[contentFieldsCounter - 1].trim() + "_group");
                                }
                            }
                        }
                    }
                };
                columnLength = contentList[contentCounter].columnLength;
                columnCounter = 0;
                contentFieldsList = $("#" + screenID + "_" + contentID).find(webWidgetInitializer.variable.widgetSelector);
                for (contentFieldsCounter = 0; contentFieldsCounter < contentFieldsList.length; contentFieldsCounter++) {
                    columnCounter++;
                    if ($("#" + $(contentFieldsList[contentFieldsCounter]).attr("id") + "_group").find("[data-widget-type = 'w_attachment']").length != 0 || $("#" + $(contentFieldsList[contentFieldsCounter]).attr("id") + "_group").find("[data-widget-type = 'w_textarea']").length != 0) {
                        if ($("#" + $(contentFieldsList[contentFieldsCounter]).attr("id") + "_group").prev().prop("tagName") != "HR") {
                            $("#" + $(contentFieldsList[contentFieldsCounter]).attr("id") + "_group").before("<hr/>");
                        };
                        $("#" + $(contentFieldsList[contentFieldsCounter]).attr("id") + "_group").after("<hr/>");
                        columnCounter = 0;
                    };
                    if (columnCounter == columnLength) {
                        $("#" + $(contentFieldsList[contentFieldsCounter]).attr("id") + "_group").after("<hr/>");
                        columnCounter = 0;
                    }
                }
            }
        }
    },
    applyFieldSet: function (screenID, contentList, eventVerb) {
        var contentCounter,
        contentID,
        currentUiConfig,
        configurationNode,
        eventVerbNode,
        contentRootNode,
        contentNode,
        fieldSetNode,
        fieldSetNodeCounter,
        fieldSetNodeString,
        contentFieldsList,
        contentFieldsCounter,
        fieldSetCounter,
        fieldSetTagCounter,
        contentFieldSetList,
        contentfieldSetCounter,
        columnLength,
        columnCounter;
        if (contentList != undefined) {
            for (contentCounter = 0; contentCounter < contentList.length; contentCounter++) {
                contentID = contentList[contentCounter].contentID;
                currentUiConfig = webConfigurationEngine.getUiConfigurationObject(screenID);
                if (currentUiConfig != undefined) {
                    configurationNode = currentUiConfig.configuration.getElementsByTagName("ui_configuration")[0];
                    if (configurationNode != undefined) {
                        if (eventVerb != undefined) {
                            eventVerbNode = configurationNode.getElementsByTagName(eventVerb)[0];
                            if (eventVerbNode != undefined) {
                                contentRootNode = eventVerbNode.getElementsByTagName("content")[0];
                                if (contentRootNode != undefined) {
                                    contentNode = contentRootNode.getElementsByTagName(contentID)[0];
                                }
                            }
                        } else {
                            contentRootNode = configurationNode.getElementsByTagName("content")[0];
                            if (contentRootNode != undefined) {
                                contentNode = contentRootNode.getElementsByTagName(contentID)[0];
                            }
                        };
                        if (contentNode != undefined) {
                            fieldSetNode = contentNode.getElementsByTagName("fieldSet")[0];
                            if (fieldSetNode != undefined) {
                                $("#" + screenID + "_" + contentID).css("padding-left", "2%").css("padding-top", "2%");
                                fieldSetNodeString = "";
                                for (fieldSetNodeCounter = 0; fieldSetNodeCounter < fieldSetNode.children.length; fieldSetNodeCounter++) {
                                    fieldSetNodeString += "<fieldSet id='" + screenID + "_" + contentID + "_" + "fieldSet_" + (fieldSetNodeCounter + 1) + "' style = 'width: 95%; border-radius: 5px; display: flex; flex-wrap: wrap;'><legend id='" + screenID + "_" + contentID + "_" + "fieldSet_" + (fieldSetNodeCounter + 1) + "_legend' style = 'background: none; border: none;'><label style='font-size: large; font-weight: bold; font-style: initial;' id='" + screenID + "_" + contentID + "_" + "fieldSet_" + (fieldSetNodeCounter + 1) + "_lbl'></label></legend></fieldSet>"
                                };
                                $("#" + screenID + "_" + contentID).append(fieldSetNodeString);
                                for (fieldSetCounter = 0; fieldSetCounter < fieldSetNode.children.length; fieldSetCounter++) {
                                    contentFieldsList = fieldSetNode.children[fieldSetCounter].innerHTML.split(",");
                                    for (contentFieldsCounter = contentFieldsList.length - 1; contentFieldsCounter >= 0; contentFieldsCounter--) {
                                        $("#" + screenID + "_" + contentFieldsList[contentFieldsCounter].trim() + "_group").insertAfter("#" + screenID + "_" + contentID + "_" + "fieldSet_" + (fieldSetCounter + 1) + "_legend");
                                    }
                                }
                                columnLength = contentList[contentCounter].columnLength;
                                for (fieldSetTagCounter = 0; fieldSetTagCounter < fieldSetNode.children.length; fieldSetTagCounter++) {
                                    contentFieldSetList = $("#" + screenID + "_" + contentID + "_" + "fieldSet_" + (fieldSetTagCounter + 1)).find(webWidgetInitializer.variable.widgetSelector);
                                    columnCounter = 0;
                                    for (contentfieldSetCounter = 0; contentfieldSetCounter < contentFieldSetList.length; contentfieldSetCounter++) {
                                        columnCounter++;
                                        if ($("#" + $(contentFieldSetList[contentfieldSetCounter]).attr("id") + "_group").find("[data-widget-type = 'w_attachment']").length != 0 || $("#" + $(contentFieldSetList[contentfieldSetCounter]).attr("id") + "_group").find("[data-widget-type = 'w_textarea']").length != 0) {
                                            if ($("#" + $(contentFieldSetList[contentfieldSetCounter]).attr("id") + "_group").prev().prop("tagName") != "HR") {
                                                $("#" + $(contentFieldSetList[contentfieldSetCounter]).attr("id") + "_group").before("<hr/>");
                                            };
                                            $("#" + $(contentFieldSetList[contentfieldSetCounter]).attr("id") + "_group").after("<hr/>");
                                            columnCounter = 0;
                                        };
                                        if (columnCounter == columnLength) {
                                            $("#" + $(contentFieldSetList[contentfieldSetCounter]).attr("id") + "_group").after("<hr/>");
                                            columnCounter = 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    variable: {
        labelConfigurations: [],
        uiConfigurations: []
    }
};
var webNavigationController = {
    applyScreenConfigurations: function () {
        var screenID,
        screenObject;
        screenID = webNavigationController.getCurrentScreenID();
        screenObject = mserviceUtilities.evaluateExpression(screenID);
        if (typeof(screenObject.initializeWidgets) == "function") {
            screenObject.initializeWidgets();
        };
        $("#" + screenID).createConfiguredFields(screenObject.variable.standard.configurationParam);

        $("#" + screenID).reorderScreenFields(screenObject.variable.standard.reorderParam, screenObject.variable.standard.configurationParam);
        $("#" + screenID).applyFieldSet(screenObject.variable.standard.reorderParam, screenObject.variable.standard.configurationParam);
        $("#" + screenID).applyConfiguredLabels(screenObject.variable.standard.configurationParam);
        $("#" + screenID).find("[data-widget-type = 'w_button']").addClass("k-button");
        $("#" + screenID).find("[data-button-group = 'crud'], [data-button-group = 'feature'], [data-button-group = 'workflow'], [data-button-group = 'export'], [data-button-group = 'import']").hide();
        $("#" + screenID + "_contextMenu").find("[data-button-group = 'crud'], [data-button-group = 'feature'], [data-button-group = 'workflow']").hide();
        $("#" + screenID).find("[data-button-group = 'crud'][data-button-role = 'retrieve']").show();
        $("#" + screenID).applyFeatureAccess();
        screenObject.variable.custom.validator = $("#" + screenID).applyConfiguredRules(screenObject.variable.standard.configurationParam);
        if (screenObject.variable.standard.screenEditableIndicator) {
            $("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
                screenObject.variable.standard.valueChangeIndicator = true;
            });
            $("#" + screenID).delegate("[data-widget-type = 'w_checkbox']", "click", function () {
                screenObject.variable.standard.valueChangeIndicator = true;
            });
        };
        if (typeof(screenObject.postConstruct) == "function") {
            screenObject.postConstruct();
            $("#" + screenID + "_editor").find(".k-pager-info").css("display", "block");
        }
    },
    buildBreadCrumb: function () {
        var breadCrumb,
        navigationMapCounter;
        breadCrumb = "";
        for (navigationMapCounter = 0; navigationMapCounter < webNavigationController.variable.navigationMap.length; navigationMapCounter++) {
            if (navigationMapCounter > 0) {
                breadCrumb += "&nbsp;&gt;&nbsp;";
            };
            breadCrumb += "<label id='" + webNavigationController.variable.navigationMap[navigationMapCounter].screenID + "_bc'>" + webNavigationController.variable.navigationMap[navigationMapCounter].screenName + "</label>";
        };
        $('#breadcrumb .left').html(breadCrumb);
    },
    getCurrentScreenID: function () {
        return webNavigationController.variable.navigationMap[webNavigationController.variable.navigationMap.length - 1].screenID;
    },
    getPreviousScreenID: function () {
        return webNavigationController.variable.navigationMap[webNavigationController.variable.navigationMap.length - 1].parentScreenID;
    },
    gotoNextScreen: function (navigationObject) {
        var nextScreenObject;
        nextScreenObject = mserviceUtilities.evaluateExpression(navigationObject.nextScreenID);
        if (nextScreenObject.variable.standard.popupIndicator) {
            $("#" + navigationObject.fieldID).initializeWPopup(navigationObject);
        } else {
            $("#container").hide();
            $.ajax({
                url: navigationObject.nextScreenID + ".html",
                async: false,
                dataType: "text",
                cache: true
            }).done(function (data) {
                try {
                    $("#" + navigationObject.screenID).hide();
                    $("#container").append(data);
                    webNavigationController.pushNavigationMap(navigationObject);
                    nextScreenObject.constructScreen();
                    webNavigationController.applyScreenConfigurations();
                } catch (ex) {
                    alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
                    if (webNavigationController.getCurrentScreenID() == navigationObject.nextScreenID) {
                        webNavigationController.gotoPreviousScreen();
                    }
                }
            });
            $("#container").show();
            var screenGrid = $("#" + navigationObject.nextScreenID + " [data-widget-type = 'w_grid']");
            for (var screenGridCounter = 0; screenGridCounter < screenGrid.length; screenGridCounter++) {
                $(screenGrid[screenGridCounter]).data("kendoGrid").refresh();
            }
        }
    },
    gotoPreviousScreen: function (isPopup) {
        var currentScreenObject;
        if (isPopup) {
            $("#" + webNavigationController.getCurrentScreenID()).parent().data("kendoWindow").close();
        } else {
            currentScreenObject = webNavigationController.variable.navigationMap[webNavigationController.variable.navigationMap.length - 1];
            $("#" + currentScreenObject.screenID).remove();
            $("#" + currentScreenObject.parentScreenID).show();
            webNavigationController.popNavigationMap();
        }
    },
    popNavigationMap: function () {
        mserviceUtilities.evaluateExpression("delete " + webNavigationController.getCurrentScreenID());
        webNavigationController.variable.navigationMap.pop();
        webNavigationController.buildBreadCrumb();
    },
    pushNavigationMap: function (navigationObject) {
        webNavigationController.variable.navigationMap.push({
            screenID: navigationObject.nextScreenID,
            screenName: navigationObject.nextScreenName,
            parentScreenID: navigationObject.screenID
        });
        webNavigationController.buildBreadCrumb();
    },
    variable: {
        navigationMap: []
    }
};
var cacheManager = {
    getCachedDatasourceInput: function () {
        var returnValue;
        returnValue = "<inputparam>";
        returnValue += "<lov_code_type>" + cacheManager.variable.informationType + "</lov_code_type>";
        returnValue += "<search_field_1>" + cacheManager.variable.searchField1 + "</search_field_1>";
        returnValue += "<search_field_2>" + cacheManager.variable.searchField2 + "</search_field_2>";
        returnValue += "<search_field_3>" + cacheManager.variable.searchField3 + "</search_field_3>";
        returnValue += "<search_field_4>" + cacheManager.variable.searchField4 + "</search_field_4>";
        returnValue += "<search_field_5>" + cacheManager.variable.searchField5 + "</search_field_5>";
        returnValue += "</inputparam>";
        return returnValue;
    },
    getDataSet: function (dsObject) {
        var returnValue,
        informationTypeSet;
        for (var key in cacheManager.variable) {
            if (dsObject[key] != undefined) {
                cacheManager.variable[key] = mserviceUtilities.getActualValue(dsObject[key]);
            } else {
                cacheManager.variable[key] = "";
            };
        };
        cacheManager.updateCachedDatasource();
        informationTypeSet = $.grep(cacheManager.cachedDatasource.data(), function (element, index) {
            return ((element.informationType == cacheManager.variable.informationType) && (element.searchField1 == cacheManager.variable.searchField1) && (element.searchField2 == cacheManager.variable.searchField2) && (element.searchField3 == cacheManager.variable.searchField3) && (element.searchField4 == cacheManager.variable.searchField4) && (element.searchField5 == cacheManager.variable.searchField5));
        })[0];
        if (informationTypeSet != undefined) {
            if (dsObject.condition != undefined && dsObject.condition != "") {
                returnValue = $.grep(informationTypeSet.dataSet, function (element, index) {
                    return mserviceUtilities.evaluateExpression(dsObject.condition.replace(/@/g, "element."));
                });
            } else {
                returnValue = informationTypeSet.dataSet;
            };
        } else {
            returnValue = [];
        };
        return returnValue;
    },
    updateCachedDatasource: function () {
        if (typeof(cacheManager.cachedDatasource) == "undefined") {
            cacheManager.cachedDatasource = new kendo.data.DataSource({
                //offlineStorage : "cachedData",
                transport: {
                    read: {
                        type: "POST",
                        async: false,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        url: mserviceUtilities.getTransportUrl("common_modules", "retrieve_listof_values_for_searchcondition", "context/outputparam"),
                        complete: function (data, textstatus) {},
                    },
                    parameterMap: function (options, operation) {
                        return mserviceUtilities.getTransportParameter({
                            inputparam: {
                                p_inputparam_xml: "cacheManager.getCachedDatasourceInput()"
                            }
                        });
                    }
                },
                requestStart: function (e) {
                    if ($.grep(cacheManager.cachedDatasource.data(), function (element, index) {
                            return ((element.informationType == cacheManager.variable.informationType) && (element.searchField1 == cacheManager.variable.searchField1) && (element.searchField2 == cacheManager.variable.searchField2) && (element.searchField3 == cacheManager.variable.searchField3) && (element.searchField4 == cacheManager.variable.searchField4) && (element.searchField5 == cacheManager.variable.searchField5));
                        })[0] != undefined) {
                        e.preventDefault();
                    };
                },
                schema: {
                    parse: function (response) {
                        if (response.length != undefined) {
                            cacheManager.cachedDatasource.data().push({
                                "informationType": cacheManager.variable.informationType,
                                "searchField1": cacheManager.variable.searchField1,
                                "searchField2": cacheManager.variable.searchField2,
                                "searchField3": cacheManager.variable.searchField3,
                                "searchField4": cacheManager.variable.searchField4,
                                "searchField5": cacheManager.variable.searchField5,
                                "dataSet": response
                            });
                        };
                        return cacheManager.cachedDatasource.data();
                    }
                }
            });
        };
        cacheManager.cachedDatasource.read();
    },
    variable: {
        informationType: "",
        searchField1: "",
        searchField2: "",
        searchField3: "",
        searchField4: "",
        searchField5: ""
    }
};
$.fn.extend({
    applyConfiguredLabels: function (eventVerb) {
        var grepReturnValue,
        filePath,
        currentScreenID;
        currentScreenID = $(this).attr("id");
        if (currentScreenID != undefined) {
            if (currentScreenID === "manage_custom_maintenance") {
                webConfigurationEngine.variable.labelConfigurations = webConfigurationEngine.variable.labelConfigurations.filter((obj) => obj.screenID !== "manage_custom_maintenance")
            };
            grepReturnValue = $.grep(webConfigurationEngine.variable.labelConfigurations, function (element, index) {
                return element.screenID == currentScreenID;
            })[0];

            filePath = currentScreenID;
            if (webWidgetInitializer.variable.customMainParam != undefined && filePath.indexOf("manage_custom_maintenance") != -1) {
                if (filePath.split("manage_custom_maintenance")[1] != "")
                    filePath = webWidgetInitializer.variable.customMainParam + "" + filePath.split("manage_custom_maintenance")[1];
                else
                    filePath = webWidgetInitializer.variable.customMainParam;
            }
            if (grepReturnValue == undefined) {
                $.ajax({
                    url: login_profile.protocol + "//" + login_profile.domain_name + ((login_profile.portno === "") ? ("") : (":" + login_profile.portno)) + "/common/components/Keys/GetConfiguration.aspx",
                    async: false,
                    method: "POST",
                    dataType: "xml",
                    contentType: "application/xml; charset=utf-8",
                    data: JSON.stringify({
                        "sessionID": login_profile.guid_val,
                        "clientID": login_profile.client_id,
                        "countryCode": login_profile.country_code,
                        "userID": login_profile.user_id,
                        "localeID": login_profile.locale_id,
                        "appID": "",
                        "framework": "1.0",
                        "solution": login_profile.solution,
                        "vertical": login_profile.vertical,
                        "clientgroup": login_profile.clientgroup,
                        "type": "configuration",
                        "subType": "label",
                        "fileName": filePath + ".xml"
                    }),
                    complete: function (response, status) {
                        try {
                            if (response.responseXML !== undefined) {
                                webConfigurationEngine.variable.labelConfigurations.push({
                                    screenID: currentScreenID,
                                    configuration: response.responseXML
                                });
                            }
                        } catch (exception) {
                            return true;
                        }
                    }
                });
            };
            webConfigurationEngine.applyConfiguredLabels(currentScreenID, eventVerb);
        }
    },
    applyFeatureAccess: function () {
        webConfigurationEngine.applyFeatureAccess($(this).attr("id"));
    },
    createConfiguredFields: function (eventVerb) {
        webConfigurationEngine.createConfiguredFields($(this).attr("id"), eventVerb);
    },
    enableViewMode: function () {
        var screenFields,
        screenFieldCounter;
        screenFields = $(this).find(webWidgetInitializer.variable.widgetSelector);
        for (screenFieldCounter = 0; screenFieldCounter < screenFields.length; screenFieldCounter++) {
            if ($(screenFields[screenFieldCounter]).attr('data-widget-type') == 'w_combotextbox') {
                $('#' + $(screenFields[screenFieldCounter]).attr('id') + '_textentry').disable()
            } else {
                $(screenFields[screenFieldCounter]).disable();
            }
        };
        $(this).find(".required").hide();
    },
    reorderScreenFields: function (contentList, eventVerb) {
        webConfigurationEngine.reorderScreenFields($(this).attr("id"), contentList, eventVerb);
    },
    applyFieldSet: function (contentList, eventVerb) {
        webConfigurationEngine.applyFieldSet($(this).attr("id"), contentList, eventVerb);
    }
});
$(document).delegate("[data-widget-type = 'w_button']", "click", function (event) {
    $("#" + webNavigationController.getCurrentScreenID() + "_contextMenu").hide();
    var wButton,
    screenID,
    screenObject,
    previousScreenObject,
    validateDataSource;
    $("#spinner").show();
    wButton = this;
    setTimeout(function () {
        $(wButton).attr("disabled", true);
        screenID = webNavigationController.getCurrentScreenID();
        screenObject = mserviceUtilities.evaluateExpression(screenID);
        screenObject.variable.custom.nextScreenName = $(wButton).text();
        if ($(wButton).attr("data-button-group") == "crud") {
            if ($(wButton).attr("data-button-role") == "add") {
                screenObject.variable.custom.crudIndicator = "A";
            } else if ($(wButton).attr("data-button-role") == "edit") {
                screenObject.variable.custom.crudIndicator = "U";
            } else if ($(wButton).attr("data-button-role") == "view") {
                screenObject.variable.custom.crudIndicator = "V";
            } else if ($(wButton).attr("data-button-role") == "delete") {
                screenObject.variable.custom.crudIndicator = "D";
            } else if ($(wButton).attr("data-button-role") == "retrieve") {
                screenObject.variable.custom.crudIndicator = "R";
            };
            screenObject.customRequirementHandler.setSelectedRecord(wButton, event);
            if ($(wButton).attr("data-button-role") == "edit" || $(wButton).attr("data-button-role") == "view" || $(wButton).attr("data-button-role") == "delete") {
                if (screenObject.variable.custom.selectedRecord == undefined) {
                    alert("No row has been selected.");
                    $("#spinner").hide();
                    $(wButton).attr("disabled", false);
                    return false;
                }
            };
            if (ruleEngine.executeRuleStatements({
                    screenID: screenID,
                    objectID: "button",
                    eventID: "click",
                    fieldID: $(wButton).attr("id")
                })) {
                if (($(wButton).attr("data-button-role") == "delete")) {
                    if (confirm("Are you sure do you want to delete this record ?")) {
                        if (screenObject.variable.custom.customDelete) {
                            screenObject.buttonEventHandler.crud_btn_click(wButton, event);
                        } else {
                            if (mserviceUtilities.deleteData(screenObject.customRequirementHandler.getDeleteDataObject())) {
                                alert("Data deleted successfully.");
                                screenObject.refreshScreen();
                            }
                        }
                    }
                } else {
                    screenObject.buttonEventHandler.crud_btn_click(wButton, event);
                    if (screenID != webNavigationController.getCurrentScreenID()) {
                        if ($(wButton).attr("data-button-role") == "view") {
                            $("#" + webNavigationController.getCurrentScreenID() + "_submit_btn").hide();
                            $("#" + webNavigationController.getCurrentScreenID()).enableViewMode();
                        }
                    }
                }
            }
        } else if ($(wButton).attr("data-button-group") == "workflow") {
            screenObject.variable.custom.crudIndicator = "";
            screenObject.variable.custom.selectedWorkflowEventVerb = $(wButton).attr("data-button-role");
            screenObject.customRequirementHandler.setSelectedRecord();
            if (ruleEngine.executeRuleStatements({
                    screenID: screenID,
                    objectID: "button",
                    eventID: "click",
                    fieldID: $(wButton).attr("id")
                })) {
                screenObject.buttonEventHandler.workflow_btn_click(wButton, event);
            }
        } else if ($(wButton).attr("data-button-group") == "feature") {
            screenObject.variable.custom.crudIndicator = "";
            screenObject.customRequirementHandler.setSelectedRecord();
            if (ruleEngine.executeRuleStatements({
                    screenID: screenID,
                    objectID: "button",
                    eventID: "click",
                    fieldID: $(wButton).attr("id")
                })) {
                screenObject.variable.custom.selectedFeatureID = $(wButton).attr("data-button-role");
                screenObject.buttonEventHandler.feature_btn_click(wButton, event);
            }
        } else if ($(wButton).attr("data-button-group") == "misc") {
            screenObject.variable.custom.crudIndicator = "";
            if (ruleEngine.executeRuleStatements({
                    screenID: screenID,
                    objectID: "button",
                    eventID: "click",
                    fieldID: $(wButton).attr("id")
                })) {
                screenObject.variable.custom.miscID = $(wButton).attr("data-button-role");
                screenObject.buttonEventHandler.misc_btn_click(wButton, event);
            }
        } else if ($(wButton).attr("data-button-role") == "submit") {
            if (screenObject.variable.custom.validator.validate()) {
                if (ruleEngine.executeRuleStatements({
                        screenID: screenID,
                        objectID: "button",
                        eventID: "click",
                        fieldID: $(wButton).attr("id")
                    })) {
                    if (screenObject.buttonEventHandler.submit_btn_click(wButton, event)) {
                        previousScreenObject = mserviceUtilities.evaluateExpression(webNavigationController.getPreviousScreenID());
                        webNavigationController.gotoPreviousScreen(screenObject.variable.standard.popupIndicator);
                        if (typeof(previousScreenObject.refreshScreen) == "function") {
                            previousScreenObject.refreshScreen();
                        }
                    }
                }
            } else {
                $("#" + $(wButton).attr("id").replace("_submit_btn", "")).find("[data-widget-subtype='textentry']").each(function () {
                    if ($("#" + this.id).next() != undefined && $("#" + this.id).next()[0] != undefined && $("#" + this.id).next()[0].role == "alert") {
                        $("#" + this.id).next()[0].setAttribute("style", "");
                    };
                });
            }
        } else if ($(wButton).attr("data-button-role") == "cancel") {
            if (screenObject.variable.standard.valueChangeIndicator) {
                if (confirm("Do you want to cancel the changes you made ?")) {
                    webNavigationController.gotoPreviousScreen(screenObject.variable.standard.popupIndicator);
                    if (screenID == "manage_change_password" && $.grep(access_profile.user_functional_access, function (element, index) {
                            return (element.child_screen_id == "home_container" && element.feature_access == "true")
                        }).length == 1) {
                        home.loadHomeContainer();
                    } else if (screenID == "manage_change_password" && home.variable.displaySingleMenu == true) {
                        home.displaySingleMenu();
                    };
                }
            } else {
                webNavigationController.gotoPreviousScreen(screenObject.variable.standard.popupIndicator);
                if (screenID == "manage_change_password" && $.grep(access_profile.user_functional_access, function (element, index) {
                        return (element.child_screen_id == "home_container" && element.feature_access == "true")
                    }).length == 1) {
                    home.loadHomeContainer();
                } else if (screenID == "manage_change_password" && home.variable.displaySingleMenu == true) {
                    home.displaySingleMenu();
                };
            }
        } else if ($(wButton).attr("data-button-group") == "import") {
            try {
                var importDataConfig,
                importFmtConfig,
				importFmtConfigFieldId,
                importGrid,
                importFile,
                counter,
                rowindex,
                columnindex,
                rowObject,
                columnObject,
				spreadsheetArrayIndex,
				importFmtConfigFieldIdIndex,
                columnArray = [];
                rowArray = [];
                importDataChangeInd = true;
                if ($(wButton).attr("data-button-role") == "grid") {
                    importGrid = $("#" + $(wButton).attr("id").replace("_import_btn", "")).getKendoGrid();
                    if (screenObject.constructScreen != undefined) {
                        if (typeof screenObject.customRequirementHandler.getImportConfig === 'function') {
                            importDataConfig = screenObject.customRequirementHandler.getImportConfig($(wButton).attr("id"));
                        }
                        if (importDataConfig !== undefined) {
                            $.ajax({
                                url: mserviceUtilities.getWebserverpath() + "fmt/import/" + importDataConfig.template + "_fmt.json",
                                async: false,
                                cache: false
                            }).done(function (response) {
                                if (response !== undefined) {
                                    importFmtConfig = response;
                                } else {
                                    alert("Please contact your support desk.");
                                };
                            }).fail(function () {
                                alert("Please contact your support desk.");
                            });
							$.ajax({
                                url: mserviceUtilities.getWebserverpath() + "fmt/import/" + importDataConfig.template + "_schema.json",
                                async: false,
                                cache: false
                            }).done(function (response) {
                                if (response !== undefined) {
                                    importFmtConfigFieldId = response;
                                } else {
                                    alert("Please contact your support desk.");
                                };
                            }).fail(function () {
                                alert("Please contact your support desk.");
                            });
                            for (columnindex = 0; columnindex < importFmtConfig.configuration.length; columnindex++) {
                                columnObject = {};
                                if (importFmtConfig.configuration[columnindex].length != 0) {
                                    for (counter = 0; counter < importFmtConfig.configuration.length; counter++) {
                                        if (Object.keys(importFmtConfig.configuration[columnindex])[counter] == "width") {
                                            columnObject[Object.keys(importFmtConfig.configuration[columnindex])[counter]] = parseInt(Object.values(importFmtConfig.configuration[columnindex])[counter]);
                                        } else {
                                            columnObject[Object.keys(importFmtConfig.configuration[columnindex])[counter]] = Object.values(importFmtConfig.configuration[columnindex])[counter];
                                        }
                                    }
                                }
                                columnArray.push(columnObject);
                            }
                            for (rowindex = 0; rowindex < importFmtConfig.configuration.length; rowindex++) {
                                rowObject = {};
                                if (importFmtConfig.configuration[rowindex].length != 0) {
                                    for (counter = 0; counter < importFmtConfig.configuration.length; counter++) {
                                        if (Object.keys(importFmtConfig.configuration[rowindex])[counter] == "fieldName") {
                                            rowObject["value"] = Object.values(importFmtConfig.configuration[rowindex])[counter];
                                        } else if (Object.keys(importFmtConfig.configuration[rowindex])[counter] == "enable") {
                                            rowObject[Object.keys(importFmtConfig.configuration[rowindex])[counter]] = eval(Object.values(importFmtConfig.configuration[rowindex])[counter]);
                                        } else {
                                            rowObject[Object.keys(importFmtConfig.configuration[rowindex])[counter]] = Object.values(importFmtConfig.configuration[rowindex])[counter];
                                        }
                                    }
                                }
                                rowArray.push(rowObject);
                            }
                            $("#" + importDataConfig.screen_id + "_child_window").append("<div id = '" + importDataConfig.screen_id + "_excel_import_window'><div id = '" + importDataConfig.screen_id + "_excel_import_spreadsheet' style='width: 100%; height: 90%;' ></div></hr><center><button style='margin-top: 2%;' id='" + importDataConfig.screen_id + "_excel_import_submit' class='k-button'>Submit</button></center></div>");
                            $("#" + importDataConfig.screen_id + "_excel_import_window").kendoWindow({
                                width: (screen.width * 0.60),
                                height: (screen.height * 0.65),
                                title: "Excel Import",
                                visible: false,
                                modal: true,
                                deactivate: function () {
                                    this.destroy();
                                },
                            });
                            if (columnArray.length != 0) {
                                $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").kendoSpreadsheet({
                                    columns: columnArray.length,
                                    rows: 1000,
                                    sheetsbar: false,
                                    sheets: [{
                                            columns: columnArray,
                                            rows: [{
                                                    cells: rowArray
                                                }
                                            ]
                                        }
                                    ]
                                });
                                $("#" + importDataConfig.screen_id + "_excel_import_window").data("kendoWindow").center().open();
                                $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet .k-tabstrip-wrapper").hide();
                                $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet .k-spreadsheet-action-bar").hide();
                                $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(0, 0, 1000, 0).enable(false);
                            } else {
                                alert("Please Contact your support desk.");
                            }
                            $("#" + importDataConfig.screen_id + "_excel_import_submit").click(function () {
                                spreadsheetData = $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().toJSON().rows;
                                for (var i = 0; i < spreadsheetData.length; i++) {
                                    for (var j = 0; j < spreadsheetData[i].cells.length; j++) {
                                        if (spreadsheetData[i].cells[j].value != undefined) {
                                            spreadsheetData[i].valid = true;
                                        }
                                    }
                                };
                                var spreadsheetDatasource = $.grep(spreadsheetData, function (data, index) {
                                    return data.valid;
                                });
                                if (spreadsheetDatasource.length != 1) {
                                    var inputparamXML = "<inputparam><search_field_xml>";
                                    for (var i = 1; i < spreadsheetDatasource.length; i++) {
                                        inputparamXML += "<data><record_index>" + spreadsheetDatasource[i].index + "</record_index><parts_order_ref_no>" + importDataConfig.request_ref_no + "</parts_order_ref_no><eventverb_id>" + importDataConfig.eventverb_id + "</eventverb_id>";
                                        for (var j = 0; j < rowArray.length; j++) {
                                            if (spreadsheetDatasource[i].cells[j] == undefined || spreadsheetDatasource[i].cells[j].value == undefined) {
                                                inputparamXML += "<" + rowArray[j].fieldId + ">" + '' + "</" + rowArray[j].fieldId + ">"
                                            } else {
                                                inputparamXML += "<" + rowArray[j].fieldId + ">" + spreadsheetDatasource[i].cells[j].value + "</" + rowArray[j].fieldId + ">"
                                            }
                                        }
                                        inputparamXML += "</data>";
                                    }
                                    inputparamXML += "</search_field_xml></inputparam>";
                                    validationData = mserviceUtilities.getTransportPagingDataSource({
                                        applicationName: "common_modules",
                                        serviceName: "retrieve_manage_custom_info_list",
                                        outputPath: "outputparam_detail",
                                        api: true,
                                        pageSize: 50,
                                        inputParameter: {
                                            p_custom_info_code: "'" + importDataConfig.screen_id + "_import'",
                                            p_inputparam_xml: inputparamXML.replace(/\n|\r/g, "")
                                        },
                                        screenID: webNavigationController.getCurrentScreenID()
                                    });
                                    validationData.read();
                                    if (validationData.data().length != 0) {
                                        var invalidData = $.grep(validationData.data(), function (data) {
                                            return data.valid_ind == "0"
                                        });
                                        var overallData = validationData.data();
                                        $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(1, 0, overallData.length, 0).value("");
                                        for (var index = 0; index < overallData.length; index++) {
                                            $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index), 0, 1, $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background("white");
                                            $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index), 0, 1, $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).validation(null);
                                        }
                                        if (invalidData.length != 0) {
                                            for (var counter = 0; counter < invalidData.length; counter++) {
                                                $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index), 0, 1, $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background("yellow");
                                                $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index), 0, 0, 0).value(invalidData[counter].err_message);
                                                $("#" + importDataConfig.screen_id + "_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index), 0, 0, 0).background("white").color("blue");
                                            }
                                            alert("The rows highlighted in the excel are not valid record. Please remove or correct it.");
                                        } else {
                                            var spreadsheetArray = validationData.data();
                                            var duplicateData = [];
                                            for (var index = 0; index < spreadsheetArray.length; index++) {
                                                var tempArray = $.grep($("#" + importDataConfig.screen_id + "_grid_1").data("kendoGrid").dataSource.data(), function (data) {
                                                    if ((data.item_code == spreadsheetArray[index].item_code) && (data.item_variant_code == spreadsheetArray[index].item_variant_code) && (data.uom_code == spreadsheetArray[index].uom_code)) {
                                                        duplicateData.push(data);
                                                    }
                                                });
                                            }
                                            for (var index = 0; index < duplicateData.length; index++) {
                                                $("#" + importDataConfig.screen_id + "_grid_1").data("kendoGrid").dataSource.remove(duplicateData[index]);
                                            }
                                            $("#" + importDataConfig.screen_id + "_grid_1").data("kendoGrid").dataSource.data([]);
											for (spreadsheetArrayIndex = 0; spreadsheetArrayIndex < spreadsheetArray.length; spreadsheetArrayIndex++) {
												var inputObject = {};
												for (key in spreadsheetArray[index]) {
													if (key.indexOf("udf") !== -1) {
														inputObject[key] = spreadsheetArray[index][key];
													}
												}
												for (key in spreadsheetArray[spreadsheetArrayIndex]) {
													for (importFmtConfigFieldIdIndex = 0; importFmtConfigFieldIdIndex < importFmtConfigFieldId.configuration.length; importFmtConfigFieldIdIndex++) {
														if (key == importFmtConfigFieldId.configuration[importFmtConfigFieldIdIndex].fieldId) {
															if (typeof(spreadsheetArray[spreadsheetArrayIndex][key]) != "object") {
																inputObject['"'+key+'"'] = spreadsheetArray[spreadsheetArrayIndex][key];
															}
														}
													}
												};
												$("#" + importDataConfig.screen_id + "_grid_1").data("kendoGrid").dataSource.add(inputObject);
											};
                                            $("#" + importDataConfig.screen_id + "_excel_import_window").data("kendoWindow").close();
                                        }
                                    } else {
                                        alert("Please Contact your support desk.");
                                    }
                                } else {
                                    alert("No record to perform Import.");
                                }
                            });
                        } else {
                            alert("Import Configuration not available.");
                        }
                    } else {
                        alert("Import Feature not supported for this screen.");
                    }
                }
            } catch (ex) {
                alert("Please contact your support desk.");
            }
        } else if ($(wButton).attr("data-button-group") == "export") {
            try {
                var exportDataConfig,
                exportChartConfig,
                exportGridData,
                exportChartData,
                formCreation,
                filePath;
                if ($(wButton).attr("data-button-role") == "grid") {
                    if (mserviceUtilities.evaluateExpression(navigation_map[1].screenID).constructScreen != undefined) {
                        if (typeof screenObject.customRequirementHandler.getExportConfig === 'function') {
                            exportDataConfig = screenObject.customRequirementHandler.getExportConfig($(wButton).attr("id"));
                        }
                    } else {
                        exportDataConfig = mserviceUtilities.evaluateExpression("fn_" + navigation_map[1].screenID + "_getExportConfig(" + "'" + $(wButton).attr("id") + "'" + ")");
                    };
                    if (exportDataConfig.length != 0) {
                        $.ajax({
                            method: "POST",
                            cache: false,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            url: getWebserverpath() + "api/msvexport/generateexportfile",
                            data: JSON.stringify({
                                sessionId: login_profile.guid_val,
                                userId: login_profile.user_id,
                                clientId: login_profile.client_id,
                                localeId: login_profile.locale_id,
                                countryCode: login_profile.country_code,
                                channelId: "web",
                                documentType: exportDataConfig.type,
                                documentTemplate: exportDataConfig.template,
                                retrieveServiceName: exportDataConfig.service,
                                retrieveRequestData: exportDataConfig.request.replace("</inputparam></i_inputparam_xml>", "<export_ind>true</export_ind></inputparam></i_inputparam_xml>")
                            }),
                            async: false
                        }).complete(function (response) {
                            response = JSON.parse(response.responseText);
                            if (response.status === "success") {
                                filePath = response.responseData;
                                fetch(getWebserverpath() + "api/msvexport/downloadexportfile", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        sessionId: login_profile.guid_val,
                                        userId: login_profile.user_id,
                                        clientId: login_profile.client_id,
                                        localeId: login_profile.locale_id,
                                        countryCode: login_profile.country_code,
                                        channelId: "web",
                                        filePath: filePath
                                    })
                                })
                                .then(async response => {
                                    var contentType,
                                    blob,
                                    url,
                                    link,
                                    errorResponse;
                                    try {
                                        contentType = response.headers.get("Content-Type");
                                        if (response.ok && contentType.includes("application/zip")) {
                                            blob = await response.blob();
                                            url = URL.createObjectURL(blob);
                                            link = document.createElement("a");
                                            link.href = url;
                                            link.download = ((filePath).split("\\").pop());
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                            URL.revokeObjectURL(url);
                                        } else {
                                            errorResponse = await response.json();
                                            if (errorResponse.status !== "success") {
                                                alert("Please contact your support desk.");
                                            }
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                })
                                .catch(err => {
                                    console.error("Download error:", err);
                                    alert("Please contact your support desk.");
                                });
                            } else {
                                alert("Please contact your support desk.");
                            }
                        });
                    } else {
                        alert("No data to perform export.");
                    }
                } else if ($(wButton).attr("data-button-role") == "chart") {
                    exportChartConfig = navigation_map[1].screenID;
                    exportChartData = $("#" + $("#" + exportChartConfig).find("[data-role='chart']").attr("id")).getKendoChart();
                    if (exportChartData.dataSource._pristineData.length != 0) {
                        exportChartData.exportImage().done(function (data) {
                            kendo.saveAs({
                                dataURI: data,
                                fileName: exportChartConfig + ".png"
                            });
                        });
                    } else {
                        alert("No data to perform export.");
                    }
                }
            } catch (ex) {
                alert("Please contact your support desk.");
            }
        };
        $("#spinner").hide();
        $(wButton).attr("disabled", false);
    }, 10);
}).delegate("[data-widget-type = 'w_link']", "click", function (event) {
    var wLink,
    screenObject;
    wLink = this;
    if ((webNavigationController.getCurrentScreenID() != "home_container") && ($(wLink).attr("data-link-type") != "actions")) {
        $("#spinner").show();
    }
    setTimeout(function () {
        screenObject = mserviceUtilities.evaluateExpression(webNavigationController.getCurrentScreenID());
        screenObject.linkEventHandler[$(wLink).attr("data-link-type") + "_link_click"](wLink, event);
        $("#spinner").hide();
        if ($(wLink).attr("data-link-type") == "actions") {
            ruleEngine.executeRuleStatements({
                screenID: webNavigationController.getCurrentScreenID(),
                objectID: "contextMenu",
                eventID: "click",
                fieldID: webNavigationController.getCurrentScreenID()
            });
        }
    }, 10);
}).delegate("[data-widget-group = 'grid']", "click", function (event) {
    var screenObject;
    screenObject = mserviceUtilities.evaluateExpression(webNavigationController.getCurrentScreenID());
    screenObject.widgetEventHandler[$(this).attr("data-widget-role") + "_click"](this, event);
}).delegate(webWidgetInitializer.variable.widgetSelector, "focusin", function () {
    $(this).addClass("k-state-focused");
}).delegate(webWidgetInitializer.variable.widgetSelector, "focusout", function () {
    $(this).removeClass("k-state-focused");
}).bind("ajaxSend", function () {
    if (webNavigationController.variable.navigationMap.length !== 0 && webNavigationController.variable.navigationMap[0].screenID !== "home_container") {
        $("#spinner").show();
    }
}).bind("ajaxStop", function () {
    $("#spinner").hide();
}).bind("ajaxError", function () {
    $("#spinner").hide();
});
Object.preventExtensions(webConfigurationEngine);
Object.preventExtensions(webNavigationController);
