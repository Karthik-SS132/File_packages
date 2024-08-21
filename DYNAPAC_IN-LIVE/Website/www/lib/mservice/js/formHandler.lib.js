/* Mservice Web 2.0 Form Handler - Version 1.0.01 - 28/12/2022 */

var form_handler = {
    constructScreen: function () {
        $.ajax({
            url: mService.app.clientURL + "/www/configuration/ui/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/ui_form_handler_" + form_handler.variable.template + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".txt",
            async: false,
            cache: false
        }).done(function (data) {
            form_handler.variable.custom.uiConfig = JSON.parse(data);
        });
        $.ajax({
            url: mService.app.clientURL + "/www/configuration/label/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + mService.app.getLocaleId() + "/label_form_handler_" + form_handler.variable.template + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId() + ".txt",
            async: false,
            cache: false
        }).done(function (data) {
            form_handler.variable.custom.labelConfig = JSON.parse(data);
        });
        $.ajax({
            url: mService.app.clientURL + "/content_store/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/msvCache/cache_controller_com.selfservit.myctcare_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json",
            async: false,
            cache: false
        }).done(function (data) {
            form_handler.variable.custom.cacheController = data;
        });
        $("#form_handler_total_pages").text(form_handler.variable.custom.uiConfig.page.length);
        form_handler.customRequirementHandler.applyUi();
        form_handler.customRequirementHandler.applyLabel();
        $("#" + "form_handler_" + form_handler.variable.template).formHandlerApplyConfiguredRules();
        form_handler.customRequirementHandler.applyRule();
        $("#form_handler_first_page_btn").click(function (e) {
            form_handler.customRequirementHandler.navigatePage($("#form_handler_content [data-role = 'subpage']:first"), false);
            $("#form_handler_content").scrollTop(0);
            e.stopPropagation();
        });
        $("#form_handler_previous_page_btn").click(function (e) {
            form_handler.customRequirementHandler.navigatePage($("#form_handler_content [data-role = 'subpage']:visible").prev(), false);
            $("#form_handler_content").scrollTop(0);
            e.stopPropagation();
        });
        $("#form_handler_next_page_btn").click(function (e) {
            form_handler.customRequirementHandler.navigatePage($("#form_handler_content [data-role = 'subpage']:visible").next(), true);
            $("#form_handler_content").scrollTop(0);
            e.stopPropagation();
        });
        $("#form_handler_last_page_btn").click(function (e) {
            form_handler.customRequirementHandler.navigatePage($("#form_handler_content [data-role = 'subpage']:last"), true);
            $("#form_handler_content").scrollTop(0);
            e.stopPropagation();
        });
        $("#form_handler_" + form_handler.variable.template + "_submit_btn").click(function (e) {
            if (form_handler.variable.validator["form_handler"].validate()) {
                kendo.ui.progress($("#form_handler").parentsUntil("body"), true);
                setTimeout(function () {
                    $.ajax({
                        async: false,
                        url: mService.app.clientURL + "/common/components/QueueManager/QueueUploadWeb.aspx?client_id=" + mService.app.getClientId() + "&country_code=" + mService.app.getCountryCode() + "&user_id=" + mService.user.profile.login.user_id + "&file_path=queue&file_name=" + mService.util.getDateTimeString(new Date(), "yyyyMMddHHmmssfff") + "_" + mService.user.profile.login.user_id + "_attachment.txt",
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            "url": mService.app.clientURL + "/common/components/convertHtml2Pdf/convertHtml2PDFOffline.aspx",
                            "key": form_handler.variable.template,
                            "subkey": form_handler.variable.transNo,
                            "input": JSON.stringify({
                                "context": {
                                    "sessionId": mService.app.getSessionId(),
                                    "userId": mService.user.profile.login.user_id,
                                    "client_id": mService.app.getClientId(),
                                    "locale_id": mService.app.getLocaleId(),
                                    "country_code": mService.app.getCountryCode(),
                                    "inputparam": {
                                        "p_template_code": "form_handler_" + form_handler.variable.template,
                                        "p_inputparam_xml": form_handler.customRequirementHandler.getInputparam({
                                            scrID: "form_handler_" + form_handler.variable.template
                                        }),
                                        "p_output_file_path": "content_store/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + form_handler.variable.file_path + "/",
                                        "p_output_file_name": form_handler.variable.file_name,
                                        "form_version": "web"
                                    }
                                }
                            })
                        }),
                        success: function () {
                            mService.util.loadScript("s_iscripts/custominfo_setDetail.js", function () {
                                var inputparamObj = JSON.parse($("#form_handler_content").formHandlerGetInputparamJSON({
                                            screenID: "#form_handler_" + form_handler.variable.template
                                        }));
                                inputparamObj.channel_id = "web";
                                inputparamObj.event_date = mService.util.getDateTimeString(new Date(), "yyyy-MM-dd");
                                inputparamObj.event_hour = mService.util.getDateTimeString(new Date(), "HH");
                                inputparamObj.event_minute = mService.util.getDateTimeString(new Date(), "mm");
                                inputparamObj.event_second = mService.util.getDateTimeString(new Date(), "ss");
                                inputparamObj.event_latitude = "";
                                inputparamObj.event_longitude = "";
                                inputparamObj.transaction_type = form_handler.variable.transaction_type;
                                inputparamObj.transaction_ref_no = form_handler.variable.transaction_ref_no;
                                inputparamObj.file_category = form_handler.variable.file_category;
                                inputparamObj.file_type = form_handler.variable.file_type;
                                inputparamObj.file_name = form_handler.variable.file_name;
                                inputparamObj.file_path = form_handler.variable.file_path;
                                mService.dSource.saveCustomInfo({
                                    scrID: "#form_handler_" + form_handler.variable.template,
                                    inAppCode: form_handler.variable.template,
                                    successToast: false,
                                    failureToast: false,
                                }, {
                                    code: "'" + form_handler.variable.template + "'",
                                    headerXml: "'" + JSON.stringify(inputparamObj) + "'"
                                }, function () {
                                    try {
                                        kendo.ui.progress($("#form_handler").parentsUntil("body"), false);
                                        alert("Form Details saved successfully.");
                                        $("#" + mService.app.getScreenId() + "_container_form_handler_window").data("kendoWindow").destroy();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        kendo.ui.progress($("#form_handler").parentsUntil("body"), false);
                                        alert("Saving of Form Details failed.");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            }, function () {
                                alert("Please contact your support desk.");
                            });
                        },
                        failure: function () {
                            kendo.ui.progress($("#form_handler").parentsUntil("body"), false);
                            alert("Saving of Form Details failed.");
                        }
                    });
                }, 10);
            } else {
                alert("Please fill all the fields");
            }
        });
        form_handler.customRequirementHandler.applyStyling();
        $("#form_handler_content").scrollTop(0);
    },
    customRequirementHandler: {
        applyStyling: function () {
            form_handler.variable.custom.collapsibleElements = document.getElementsByClassName("collapsible");
            for (var index = 0; index < form_handler.variable.custom.collapsibleElements.length; index++) {
                if ((form_handler.variable.custom.collapsibleElements[index].getAttribute("data-listner") == null) && (form_handler.variable.custom.collapsibleElements[index].getAttribute("data-type") != "mCollapsibleflip") && (form_handler.variable.custom.collapsibleElements[index].getAttribute("data-type") != "mLoop")) {
                    form_handler.variable.custom.collapsibleElements[index].setAttribute("data-listner", "true");
                    form_handler.variable.custom.collapsibleElements[index].addEventListener("click", function () {
                        this.classList.toggle("active");
                        var content = this.nextElementSibling;
                        if (content.style.display == "block") {
                            content.style.display = "none";
                        } else {
                            content.style.display = "block";
                        }
                    });
                }
            };
            $("#form_handler").find(".required").css("color", "red");
        },
        applyRule: function () {
            var list,
            index,
            id;
            list = $("#form_handler_" + form_handler.variable.template + " [data-role = 'subpage']");
            for (index = 0; index < list.length; index++) {
                id = $(list[index]).attr("id");
                form_handler.variable.validator[id] = formHandlerRuleEngine.executeConfiguredRules(id);
            };
            form_handler.variable.validator["form_handler"] = formHandlerRuleEngine.executeConfiguredRules("form_handler");
            for (var index = 0; index < Object.keys(form_handler.variable.custom.mloopGroups).length; index++) {
                $("#" + Object.keys(form_handler.variable.custom.mloopGroups)[index]).formHandlerSetVal(form_handler.variable.custom.mloopGroups[Object.keys(form_handler.variable.custom.mloopGroups)[index]]);
            }
        },
        applyLabel: function () {
            var index,
            config,
            list,
            id;
            config = form_handler.variable.custom.labelConfig;
            if (config != undefined) {
                list = $("#form_handler_" + form_handler.variable.template + " [data-widget-type = 'mLabel']");
                for (index = 0; index < list.length; index++) {
                    id = $(list[index]).attr("id");
                    id = id.substring(0, id.length - 4);
                    if ($("#" + id).attr("data-widget-type") == "mLoop") {
                        id = id.replace("form_handler_" + form_handler.variable.template + "_", "");
                        id = ($(list[index]).attr("data-mloop") != undefined) ? (id.replace("-" + $(list[index]).attr("data-mloopindex"), "")) : (id);
                        $(list[index]).prepend(config["field"][id] + "-" + (parseInt($(list[index]).attr("data-mloopindex")) + 1));
                    } else {
                        id = id.replace("form_handler_" + form_handler.variable.template + "_", "");
                        id = ($(list[index]).attr("data-mloop") != undefined) ? (id.replace("-" + $(list[index]).attr("data-mloopindex"), "")) : (id);
                        $(list[index]).prepend(config["field"][id]);
                    }
                };
                list = $("#form_handler_" + form_handler.variable.template + " [data-role = 'subpage']");
                for (index = 0; index < list.length; index++) {
                    id = $(list[index]).attr("id").replace("form_handler_" + form_handler.variable.template + "_", "");
                    $(list[index]).attr("data-subpage-name", config["page"][id]);
                };
                if (config["screen"]["title"] != undefined) {
                    $("#form_handler_title_lbl").text(config["screen"]["title"]);
                };
                var subpageIndex = $("#form_handler_" + form_handler.variable.template + " [data-role = 'subpage']").first().attr("data-subpage-no");
                if ($("#form_handler_" + form_handler.variable.template + " [data-role = 'subpage']").first().attr("data-subpage-name") == undefined || "") {
                    $("#form_handler_page_title_lbl").parent().hide();
                } else {
                    $("#form_handler_page_title_lbl").text($("#form_handler_" + form_handler.variable.template + " [data-role = 'subpage']").first().attr("data-subpage-name"));
                }
                if (config["button"]["submit"] != undefined) {
                    $("#form_handler_" + form_handler.variable.template + "_submit_btn").text(config["button"]["submit"]);
                };
            };
        },
        applyUi: function () {
            var config,
            index;
            config = form_handler.variable.custom.uiConfig;
            if (config != undefined) {
                if (config.page.length == 1) {
                    $("#form_handler_footer").hide();
                    $("#form_handler_content").css("bottom", "1.5%");
                }
                $("#form_handler_content").append("<div id = 'form_handler_" + form_handler.variable.template + "'></div>");
                for (index = 0; index < config.page.length; index++) {
                    $("#form_handler_" + form_handler.variable.template).append("<div id = 'form_handler_" + form_handler.variable.template + "_" + config.page[index].id + "' data-role = 'subpage' data-subpage-no = '" + (index + 1) + "' style = 'display: none;'></div>");
                    form_handler.customRequirementHandler.createField({
                        scrID: "form_handler_" + form_handler.variable.template,
                        parent: "",
                        loop: "",
                        fields: config.page[index].field,
                        loopIndex: "0",
                        root: "form_handler_" + form_handler.variable.template + "_" + config.page[index].id
                    });
                };
                for (index = 0; index < config.page.length; index++) {
                    form_handler.customRequirementHandler.initializeField({
                        scrID: "form_handler_" + form_handler.variable.template,
                        parent: "",
                        loop: "",
                        fields: config.page[index].field,
                        loopIndex: "0",
                        root: "form_handler_" + form_handler.variable.template + "_" + config.page[index].id
                    });
                };
                $("#form_handler_" + form_handler.variable.template + " [data-role = 'subpage']").first().show();
                $("#form_handler_" + form_handler.variable.template + " [data-role = 'subpage']").last().append("<div style='margin:10%;'><center><button class= 'k-button' id = 'form_handler_" + form_handler.variable.template + "_submit_btn' data-widget-type = 'w_button' data-button-group = 'form_submit' data-button-role = 'form_submit' ></button></center></div>");
            }
        },
        createField: function (iObj) {
            var index,
            id;
            for (index in iObj.fields) {
                id = iObj.scrID + "_" + iObj.fields[index].id + ((iObj.fields[index].wType == "mLoop" || iObj.loop != "") ? ("-" + iObj.loopIndex) : (""));
                $("#" + iObj.root).append(form_handler.customRequirementHandler.getHtml({
                        id: id,
                        wType: iObj.fields[index].wType,
                        parent: iObj.parent,
                        loop: iObj.loop,
                        loopIndex: iObj.loopIndex,
                        baseWidgetId: iObj.scrID + "_" + iObj.fields[index].id
                    }));
                iObj.fields[index].baseWidgetId = iObj.scrID + "_" + iObj.fields[index].id;
                if (iObj.fields[index].wType == "mParentgroup") {
                    form_handler.customRequirementHandler.createField({
                        scrID: iObj.scrID,
                        parent: iObj.fields[index].id,
                        loop: "",
                        fields: iObj.fields[index].field,
                        root: iObj.scrID + "_" + iObj.fields[index].id
                    });
                } else if (iObj.fields[index].wType == "mLoop") {
                    form_handler.customRequirementHandler.createField({
                        scrID: iObj.scrID,
                        parent: "",
                        loop: iObj.fields[index].id,
                        fields: iObj.fields[index].field,
                        loopIndex: iObj.loopIndex,
                        root: iObj.scrID + "_" + iObj.fields[index].id + "-" + iObj.loopIndex
                    });
                    if (form_handler.variable.custom.mLoop[iObj.fields[index].baseWidgetId] == undefined) {
                        iObj.fields[index].scrID = iObj.scrID;
                        iObj.fields[index].id = String(iObj.fields[index].baseWidgetId).replace(iObj.scrID + "_", "");
                        form_handler.variable.custom.mLoop[iObj.fields[index].baseWidgetId] = iObj.fields[index];
                    }
                    for (var counter = 0; counter < iObj.fields[index].field.length; counter++) {
                        form_handler.variable.custom.mLoopChangeFields.mLoopParent[iObj.scrID + "_" + iObj.fields[index].field[counter].id] = iObj.fields[index].baseWidgetId;
                    }
                    form_handler.variable.custom.mLoopChangeFields.loopIndex[iObj.fields[index].baseWidgetId] = 0;
                } else if (iObj.fields[index].wType == "mCollapsibleflip") {
                    form_handler.customRequirementHandler.createField({
                        scrID: iObj.scrID,
                        parent: iObj.fields[index].id,
                        loop: "",
                        fields: iObj.fields[index].field,
                        root: iObj.scrID + "_" + iObj.fields[index].id
                    });
                }
            }
        },
        createLoopFieldsFromRule: function (mLoopId, loopCollection) {
            if (form_handler.variable.custom.draftInd == false) {
                var filedsList = form_handler.variable.custom.mLoop[mLoopId].field;
                for (var loopIndex = 0; loopIndex < loopCollection.length; loopIndex++) {
                    if (loopIndex !== 0) {
                        form_handler.customRequirementHandler.createField({
                            scrID: "form_handler_" + form_handler.variable.template,
                            parent: "",
                            loop: "",
                            fields: [form_handler.variable.custom.mLoop[mLoopId]],
                            loopIndex: loopIndex,
                            root: mLoopId + "_group"
                        });
                        form_handler.customRequirementHandler.initializeField({
                            scrID: "form_handler_" + form_handler.variable.template,
                            parent: "",
                            loop: "",
                            fields: [form_handler.variable.custom.mLoop[mLoopId]],
                            loopIndex: loopIndex,
                            root: mLoopId + "_group"
                        });
                        var lblList = $($("#" + mLoopId + "_group").children()[loopIndex]).find("[data-widget-type = 'mLabel']");
                        for (var index = 0; index < lblList.length; index++) {
                            var lblID = $(lblList[index]).attr("id");
                            lblID = lblID.substring(0, lblID.length - 4);
                            if ($("#" + lblID).attr("data-widget-type") === "mLoop") {
                                lblID = lblID.replace("form_handler_" + form_handler.variable.template + "_", "");
                                lblID = lblID.substring(0, lblID.lastIndexOf("-"));
                                $(lblList[index]).prepend(form_handler.variable.custom.labelConfig.field[lblID] + "-" + (loopIndex + 1));
                            } else {
                                lblID = lblID.replace("form_handler_" + form_handler.variable.template + "_", "");
                                lblID = lblID.substring(0, lblID.lastIndexOf("-"));
                                $(lblList[index]).prepend(form_handler.variable.custom.labelConfig.field[lblID]);
                            }
                        };
                    };
                    if (loopIndex < loopCollection.length - 1) {
                        $("#" + mLoopId + "-" + loopIndex + "_btn_div").hide();
                    }
                }
            }
        },
        getHtml: function (iObj) {
            var html = "",
            addnlAttr;
            addnlAttr = ((iObj.parent != "") ? ("data-mparentgroup = '" + iObj.parent + "'") : ((iObj.loop != "") || (iObj.wType == "mLoop" && iObj.loopIndex == "0")) ? ("data-mloop = '" + iObj.loop + "' data-mloopindex = '" + iObj.loopIndex + "'") : (""));
            html += (((iObj.wType != "mLoop") || (iObj.wType == "mLoop" && iObj.loopIndex == "0")) ? ("<div style='display: grid;' id = '" + ((iObj.wType == "mLoop") ? (iObj.id.substring(0, iObj.id.lastIndexOf("-"))) : (iObj.id)) + "_group' name = '" + ((iObj.wType == "mLoop") ? (iObj.id.substring(0, iObj.id.lastIndexOf("-"))) : (iObj.id)) + "_group' data-mloop-base = '" + iObj.wType + "'>") : (""));
            html += "<div style='padding-right: 1%; padding-bottom: 3%; padding-top: 3%'>";
            if (iObj.wType == "mParentgroup") {
                html += "<button data-type='" + iObj.wType + "' type='button'class='collapsible'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px;' id = '" + iObj.id + "_lbl' name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label></button><div class='collapsible_content' " + addnlAttr + " id = '" + iObj.id + "' name = '" + iObj.id + "' data-widget-type='" + iObj.wType + "'>";
                html += "</div>";
            } else if (iObj.wType == "mCollapsibleflip") {
                html += "<button type='button' data-type='" + iObj.wType + "' style='padding-bottom: 1%;' class='collapsible'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px; vertical-align: -35%;' id = '" + iObj.id + "_lbl' name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label><span style = 'float: right;'><label class='switch'><input type='checkbox' " + addnlAttr + " id = '" + iObj.id + "_flip' data-widget-type='" + "mFlipswitch" + "' /><span class='slider round'></span></label></span></button><div class='collapsible_content' " + addnlAttr + " id = '" + iObj.id + "' data-widget-type='" + iObj.wType + "'>";
                html += "</div>";
            } else if (iObj.wType == "mLoop") {
                html += "<button id='" + iObj.id + "_subgroup' data-type='" + iObj.wType + "' type='button' class='collapsible'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px; vertical-align: -20%;' id = '" + iObj.id + "_lbl'  name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label><span  id = '" + iObj.id + "_trash_container'></span></button><div class='collapsible_content' ><div " + addnlAttr + " id = '" + iObj.id + "'  name = '" + iObj.id + "' data-base-widget = '" + iObj.baseWidgetId + "' data-widget-type='" + iObj.wType + "'></div>";
                html += "<div id = '" + iObj.id + "_btn_div'><div style='float: right; font-size: 200%; padding-right: 2%; padding-bottom: 2%;' id = '" + iObj.id + "_btn' class='k-icon k-i-plus-circle' data-widget-type = 'mLink' data-link-group = 'loop' data-link-role = 'repeat' data-widget-for = '" + iObj.id + "'></div></div></div>";
            } else if (iObj.wType == "mFlipswitch") {
                html += "<div style='width: 38%; float: left; padding: 0.1%; word-wrap: break-word; margin-left:" + ((iObj.parent != "" || iObj.loop != "") ? ("") : ("3")) + "%;'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px;' id = '" + iObj.id + "_lbl' name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label>&nbsp;&nbsp;&nbsp;</div>";
                html += "<div style='overflow: hidden; padding-bottom: 1%;'><span style='display: table;'><label class='switch'><input " + addnlAttr + " id = '" + iObj.id + "' name = '" + iObj.id + "' data-widget-type='" + iObj.wType + "' /><span class='slider round'></span></label></span>";
                html += "<span style='margin-left: 152px;' data-for = '" + iObj.id + "' class = 'k-invalid-msg'></span></div>";
            } else if (iObj.wType == "mSignaturepad") {
                html += "<div style='width: 38%; float: left; padding: 0.1%; word-wrap: break-word; margin-left:" + ((iObj.parent != "" || iObj.loop != "") ? ("") : ("3")) + "%;'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px;' id = '" + iObj.id + "_lbl' name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label>&nbsp;&nbsp;&nbsp;</div>";
                html += "<div style='overflow: hidden; padding-bottom: 1%;'><input style='display: none;' " + addnlAttr + " id = '" + iObj.id + "' name = '" + iObj.id + "' data-widget-type='" + iObj.wType + "'/><div style='display: flex;' id = '" + iObj.id + "_surface_container' name = '" + iObj.id + "_surface_container'><div id = '" + iObj.id + "_surface' style='width: 200px; height: 100px;border: 1px solid black; border-color: #b6b6b6; border-radius: 5px;'></div><div id = '" + iObj.id + "_surface_clear' class='k-icon k-i-refresh-sm' style='position: absolute;'></div></div>";
                html += "<span style='margin-left: 152px;' data-for = '" + iObj.id + "' class = 'k-invalid-msg'></span></div>";
            } else if (iObj.wType == "mSlider") {
                html += "<div style='width: 38%; float: left; padding: 0.1%; word-wrap: break-word; margin-left:" + ((iObj.parent != "" || iObj.loop != "") ? ("") : ("3")) + "%; padding-top: 3%;'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px;' id = '" + iObj.id + "_lbl'  name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label>&nbsp;&nbsp;&nbsp;</div>";
                html += "<div style='overflow: hidden; padding-bottom: 1%;'><span style='display: table; padding: 3%;'><input style='width:190px;' " + addnlAttr + " id = '" + iObj.id + "' name = '" + iObj.id + "' data-widget-type='" + iObj.wType + "' /></span>";
                html += "<span style='margin-left: 152px;' data-for = '" + iObj.id + "' class = 'k-invalid-msg'></span></div>";
            } else if (iObj.wType == "mAttachment") {
                html += "<div style='width: 38%; float: left; padding: 0.1%; word-wrap: break-word; margin-left:" + ((iObj.parent != "" || iObj.loop != "") ? ("") : ("3")) + "%;'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px;' id = '" + iObj.id + "_lbl'  name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label>&nbsp;&nbsp;&nbsp;</div>";
                html += "<div style='overflow: hidden; padding-bottom: 1%;'><span style='display: table-caption; width: 200px;'><input type='file' style='width:200px; padding : 1px;' " + addnlAttr + " id = '" + iObj.id + "' name = '" + iObj.id + "' data-widget-type='" + iObj.wType + "' /></span>";
                html += "<span style='margin-left: 152px;' data-for = '" + iObj.id + "' class = 'k-invalid-msg'></span></div>";
            } else if (iObj.wType == "mTextarea") {
                html += "<div style='width: 38%; float: left; padding: 0.1%; word-wrap: break-word; margin-left:" + ((iObj.parent != "" || iObj.loop != "") ? ("") : ("3")) + "%;'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px;' id = '" + iObj.id + "_lbl' name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label>&nbsp;&nbsp;&nbsp;</div>";
                html += "<div style='overflow: hidden; padding-bottom: 1%;'><span style='display: table;'><textarea style='width:201px; height: 80px; padding : 1px; border: 1px solid #008b8b; border-radius: 3%;' " + addnlAttr + " id = '" + iObj.id + "'  name = '" + iObj.id + "' data-widget-type='" + iObj.wType + "'></textarea></span>";
                html += "<span style='margin-left: 152px;' data-for = '" + iObj.id + "' class = 'k-invalid-msg'></span></div>";
            } else if ((iObj.wType == "mDropdownlist") || (iObj.wType == "mCombobox") || (iObj.wType == "mSearchpopup")) {
                html += "<div style='width: 38%; float: left; padding: 0.1%; word-wrap: break-word; margin-left:" + ((iObj.parent != "" || iObj.loop != "") ? ("") : ("3")) + "%;'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px;' id = '" + iObj.id + "_lbl'  name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label>&nbsp;&nbsp;&nbsp;</div>";
                html += "<div style='overflow: hidden; padding-bottom: 1%;'><span style='display: table;'><input style='width:200px; padding : 1px;' " + addnlAttr + " id = '" + iObj.id + "' name = '" + iObj.id + "' data-widget-type='" + iObj.wType + "' /></span>";
                html += "<span  data-for = '" + iObj.id + "' class = 'display_description'></span>";
                html += "<span style='margin-left: 152px;' data-for = '" + iObj.id + "' class = 'k-invalid-msg'></span></div>";
            } else if (iObj.wType == "mMultiselect") {
                html += "<div style='width: 38%; float: left; padding: 0.1%; word-wrap: break-word; margin-left:" + ((iObj.parent != "" || iObj.loop != "") ? ("") : ("3")) + "%;'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px;' id = '" + iObj.id + "_lbl' name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label>&nbsp;&nbsp;&nbsp;</div>";
                html += "<div style='overflow: hidden; padding-bottom: 1%;'><span style='display:table;'><input style='width:200px; padding : 1px;' " + addnlAttr + " id = '" + iObj.id + "'  name = '" + iObj.id + "' data-widget-type='" + iObj.wType + "' /></span>";
                html += "<span style='margin-left: 152px;' data-for = '" + iObj.id + "' class = 'k-invalid-msg'></span></div>";
            } else {
                html += "<div style='width: 38%; float: left; padding: 0.1%; word-wrap: break-word; margin-left:" + ((iObj.parent != "" || iObj.loop != "") ? ("") : ("3")) + "%;'><label style='font-family: " + 'Georgia' + ", Times New Roman, Times, serif; font-size: 15px;' id = '" + iObj.id + "_lbl'  name = '" + iObj.id + "_lbl' data-widget-type = 'mLabel'" + addnlAttr + "></label>&nbsp;&nbsp;&nbsp;</div>";
                html += "<div style='overflow: hidden; padding-bottom: 1%;'><span style='display: table;'><input style='width:200px; padding : 1px;' " + addnlAttr + " id = '" + iObj.id + "' name = '" + iObj.id + "' data-widget-type='" + iObj.wType + "' /></span>";
                html += "<span style='margin-left: 152px;' data-for = '" + iObj.id + "' class = 'k-invalid-msg'></span></div>";
            }
            html += "</div></div>";
            return html;
        },
        initializeField: function (iObj) {
            var index,
            id;
            for (index in iObj.fields) {
                id = iObj.scrID + "_" + iObj.fields[index].id + ((iObj.fields[index].wType == "mLoop" || iObj.loop != "") ? ("-" + iObj.loopIndex) : (""));
                if (iObj.fields[index].wType == "mParentgroup") {
                    form_handler.customRequirementHandler.initializeField({
                        scrID: iObj.scrID,
                        parent: iObj.fields[index].id,
                        loop: "",
                        fields: iObj.fields[index].field,
                        root: iObj.scrID + "_" + iObj.fields[index].id
                    });
                } else if (iObj.fields[index].wType == "mCollapsibleflip") {
                    form_handler.customRequirementHandler.initializeField({
                        scrID: iObj.scrID,
                        parent: iObj.fields[index].id,
                        loop: "",
                        fields: iObj.fields[index].field,
                        root: iObj.scrID + "_" + iObj.fields[index].id
                    });
                    $("#" + iObj.scrID + "_" + iObj.fields[index].id + "_flip").change(function (event) {
                        if ($("#" + event.target.id).prop("checked") == true) {
                            $("#" + event.target.id.replace("_flip", "")).show();
                        } else {
                            $("#" + event.target.id.replace("_flip", "")).hide();
                        }
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: event.target.id
                        });
                    });
                } else if (iObj.fields[index].wType == "mLoop") {
                    $("#" + iObj.scrID + "_" + iObj.fields[index].id + "-" + iObj.loopIndex).parent().show();
                    if (iObj.fields[index].showAddIcon != undefined && iObj.fields[index].showAddIcon == "false") {
                        $("#" + iObj.scrID + "_" + iObj.fields[index].id + "-" + iObj.loopIndex + "_btn_div").remove();
                    };
                    if (iObj.fields[index].deleteFirstInd != undefined && iObj.fields[index].deleteFirstInd == "true") {
                        $("#" + iObj.scrID + "_" + iObj.fields[index].id + "-" + iObj.loopIndex + "_trash_container").append("<span id = '" + "form_handler_" + form_handler.variable.template + "_" + iObj.fields[index].id + "-" + iObj.loopIndex + "_trash' data-widget-type = 'mLink' data-link-group = 'loop' data-link-role = 'trash' data-group-id='" + "form_handler_" + form_handler.variable.template + "_" + iObj.fields[index].id + "' loopIndex ='" + iObj.loopIndex + "' class='k-icon k-i-delete' style='float: right; font-size: 140%; padding-right: 2%;'></span>");
                    };
                    form_handler.customRequirementHandler.initializeField({
                        scrID: iObj.scrID,
                        parent: "",
                        loop: iObj.fields[index].id,
                        fields: iObj.fields[index].field,
                        loopIndex: iObj.loopIndex,
                        root: iObj.scrID + "_" + iObj.fields[index].id + "-" + iObj.loopIndex
                    });
                } else if (iObj.fields[index].wType == "mFlipswitch") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    $("#" + id).attr("type", "checkbox");
                    $("#" + id).change(function (event) {
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: event.target.id
                        });
                    });
                } else if (iObj.fields[index].wType == "mDropdownlist") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    var cacheConfig,
                    cachedData,
                    cacheDataSrc,
                    dataSourceValue;
                    if (form_handler.variable.custom.cacheController[iObj.fields[index].dataSrc] != undefined) {
                        cacheConfig = form_handler.variable.custom.cacheController[iObj.fields[index].dataSrc];
                        if (cacheConfig != undefined && cacheConfig.code != undefined && cacheConfig.inputXml != undefined) {
                            cachedData = $.grep(form_handler.variable.custom.cacheManager, function (element, index) {
                                return element.infoCode == cacheConfig.code && element.inputXML == cacheConfig.inputXml;
                            });
                            if (cachedData.length != 0) {
                                dataSourceValue = cachedData[0].dataSet;
                            } else {
                                cacheDataSrc = mService.util.getTransportDataSource({
                                    applicationName: "common_modules",
                                    serviceName: "retrieve_manage_custom_info_list",
                                    outputPath: "outputparam_detail",
                                    api: true,
                                    pageSize: 50,
                                    inputParameter: {
                                        p_custom_info_code: cacheConfig.code,
                                        p_inputparam_xml: cacheConfig.inputXml
                                    },
                                    screenID: "form_handler_" + form_handler.variable.template
                                });
                                cacheDataSrc.read();
                                dataSourceValue = cacheDataSrc.data();
                                form_handler.variable.custom.cacheManager.push({
                                    infoCode: cacheConfig.code,
                                    inputXML: cacheConfig.inputXml,
                                    dataSet: cacheDataSrc.data()
                                });
                            }
                            var optionLabelValue = {};
                            if (iObj.fields[index].filterMode != undefined && iObj.fields[index].filterMode == "true") {
                                optionLabelValue[iObj.fields[index].textField] = "ALL";
                                optionLabelValue[iObj.fields[index].valueField] = "";
                            } else {
                                optionLabelValue[iObj.fields[index].textField] = "---Select---";
                                optionLabelValue[iObj.fields[index].valueField] = "";
                            };
                            $("#" + id).kendoDropDownList({
                                dataSource: dataSourceValue,
                                autoBind: true,
                                dataTextField: iObj.fields[index].textField,
                                dataValueField: iObj.fields[index].valueField,
                                optionLabel: optionLabelValue
                            });
                        }
                    } else if (iObj.fields[index].dataSrc.applicationName != undefined) {
                        var optionLabelValue = {};
                        if (iObj.fields[index].filterMode != undefined && iObj.fields[index].filterMode == "true") {
                            optionLabelValue[iObj.fields[index].textField] = "ALL";
                            optionLabelValue[iObj.fields[index].valueField] = "";
                        } else {
                            optionLabelValue[iObj.fields[index].textField] = "---Select---";
                            optionLabelValue[iObj.fields[index].valueField] = "";
                        };
                        $("#" + id).kendoDropDownList({
                            dataSource: {
                                transport: {
                                    read: {
                                        url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=" + iObj.fields[index].dataSrc.applicationName + "&serviceName=" + iObj.fields[index].dataSrc.serviceName + "&path=" + iObj.fields[index].dataSrc.outputPath,
                                        dataType: "json",
                                        type: "POST",
                                        contentType: "application/json",
                                        async: false
                                    },
                                    parameterMap: function (data, type) {
                                        return '{"context":{"sessionId":"' + mService.app.getSessionId() + '","userId":"' + mService.user.profile.login.user_id + '","client_id":"' + mService.app.getClientId() + '","locale_id":"' + mService.app.getLocaleId() + '","country_code":"' + mService.app.getCountryCode() + '","inputparam":{"p_inputparam_xml":"' + iObj.fields[index].dataSrc.inputParameter.p_inputparam_xml + '"}}}';
                                    }
                                }
                            },
                            autoBind: true,
                            dataTextField: iObj.fields[index].textField,
                            dataValueField: iObj.fields[index].valueField,
                            optionLabel: optionLabelValue
                        });
                    } else {
                        var optionLabelValue = {};
                        if (iObj.fields[index].filterMode != undefined && iObj.fields[index].filterMode == "true") {
                            optionLabelValue[iObj.fields[index].textField] = "ALL";
                            optionLabelValue[iObj.fields[index].valueField] = "";
                        } else {
                            optionLabelValue[iObj.fields[index].textField] = "---Select---";
                            optionLabelValue[iObj.fields[index].valueField] = "";
                        };
                        $("#" + id).kendoDropDownList({
                            dataSource: iObj.fields[index].dataSrc,
                            autoBind: true,
                            dataTextField: iObj.fields[index].textField,
                            dataValueField: iObj.fields[index].valueField,
                            optionLabel: optionLabelValue
                        });
                    };
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).data("kendoDropDownList").dataSource.filter({
                            logic: "and",
                            filters: [{
                                    field: "parent_id",
                                    operator: "eq",
                                    value: $("#" + iObj.scrID + "_" + iObj.fields[index].parent_field + ((iObj.fields[index].wType == "mLoop" || iObj.loop != "") ? ("-" + iObj.loopIndex) : (""))).formHandlerGetVal()
                                }
                            ]
                        });
                    };
                    $("#" + id).data("kendoDropDownList").bind("change", function (event) {
                        if ($("#" + this.element.attr("id")).data("kendoDropDownList").dataItem() != undefined) {
                            if ($("#" + this.element.attr("id")).data("kendoDropDownList").dataItem()[event.sender.options.dataTextField] != "---Select---" && $("#" + this.element.attr("id")).data("kendoDropDownList").dataItem()[event.sender.options.dataTextField] != "ALL" && $("#" + this.element.attr("id")).data("kendoDropDownList").dataItem()[event.sender.options.dataTextField] != "") {
                                $(".display_description[data-for = '" + this.element.attr("id") + "']").text($("#" + this.element.attr("id")).data("kendoDropDownList").dataItem()[event.sender.options.dataTextField]);
                            } else {
                                $(".display_description[data-for = '" + this.element.attr("id") + "']").text("");
                            }
                        } else {
                            $(".display_description[data-for = '" + this.element.attr("id") + "']").text("");
                        };
                        var loopIndex = ""
                            if (this.element.attr("data-mloopindex") != undefined) {
                                loopIndex = "-" + this.element.attr("data-mloopindex");
                            }
                            if (this.element.attr("data-parent-id") != undefined) {
                                $("#" + this.element.attr("id")).data("kendoDropDownList").dataSource.filter({});
                                $("#" + this.element.attr("id")).data("kendoDropDownList").dataSource.filter({
                                    logic: "and",
                                    filters: [{
                                            field: "parent_id",
                                            operator: "eq",
                                            value: $("#" + "form_handler_" + form_handler.variable.template + "_" + this.element.attr("data-parent-id") + loopIndex).formHandlerGetVal()
                                        }
                                    ]
                                });
                            };
                        if (this.element.attr("data-child-ids") != undefined) {
                            if ($("#" + this.element.attr("id")).formHandlerGetVal() != "") {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mDropdownlist") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.read();
                                        if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.data().length != 0) {
                                            $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").value("");
                                        };
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mCombobox") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mSearchpopup") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mMultiselect") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").trigger("change");
                                    };
                                }
                            } else {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mDropdownlist") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mCombobox") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mSearchpopup") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mMultiselect") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").trigger("change");
                                    };
                                }
                            }
                        };
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: this.element.attr("id")
                        });
                    });
                } else if (iObj.fields[index].wType == "mCombobox") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    if (iObj.fields[index].dataSrc.applicationName != undefined && iObj.fields[index].dataSrc.inputParameter != undefined && iObj.fields[index].dataSrc.inputParameter.p_inputparam_xml != undefined) {
                        $("#" + id).attr("data-inputparam", iObj.fields[index].dataSrc.inputParameter.p_inputparam_xml);
                    }
                    var cacheConfig,
                    cachedData,
                    cacheDataSrc,
                    dataSourceValue,
                    serverFilteringValue,
                    delayValue,
                    placeholderValue;
                    if (iObj.fields[index].serverFiltering) {
                        serverFilteringValue = true;
                        delayValue = 1500;
                    } else {
                        serverFilteringValue = false;
                        delayValue = 200;
                    };
                    if (iObj.fields[index].filterMode == true) {
                        placeholderValue = "ALL";
                    } else {
                        placeholderValue = "---Select---";
                    };
                    if (form_handler.variable.custom.cacheController[iObj.fields[index].dataSrc] != undefined) {
                        cacheConfig = form_handler.variable.custom.cacheController[iObj.fields[index].dataSrc];
                        if (cacheConfig != undefined && cacheConfig.code != undefined && cacheConfig.inputXml != undefined) {
                            cachedData = $.grep(form_handler.variable.custom.cacheManager, function (element, index) {
                                return element.infoCode == cacheConfig.code && element.inputXML == cacheConfig.inputXml;
                            });
                            if (cachedData.length != 0) {
                                dataSourceValue = cachedData[0].dataSet;
                            } else {
                                cacheDataSrc = mService.util.getTransportDataSource({
                                    applicationName: "common_modules",
                                    serviceName: "retrieve_manage_custom_info_list",
                                    outputPath: "outputparam_detail",
                                    api: true,
                                    pageSize: 50,
                                    inputParameter: {
                                        p_custom_info_code: cacheConfig.code,
                                        p_inputparam_xml: cacheConfig.inputXml
                                    },
                                    screenID: "form_handler_" + form_handler.variable.template
                                });
                                cacheDataSrc.read();
                                dataSourceValue = cacheDataSrc.data();
                                form_handler.variable.custom.cacheManager.push({
                                    infoCode: cacheConfig.code,
                                    inputXML: cacheConfig.inputXml,
                                    dataSet: cacheDataSrc.data()
                                });
                            }
                            $("#" + id).kendoComboBox({
                                dataSource: dataSourceValue,
                                autoBind: true,
                                filter: "contains",
                                serverFiltering: false,
                                delay: 200,
                                dataTextField: iObj.fields[index].textField,
                                dataValueField: iObj.fields[index].valueField,
                                placeholder: placeholderValue
                            });
                        }
                    } else if (iObj.fields[index].dataSrc.applicationName != undefined) {
                        $("#" + id).kendoComboBox({
                            dataSource: {
                                transport: {
                                    read: {
                                        url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=" + iObj.fields[index].dataSrc.applicationName + "&serviceName=" + iObj.fields[index].dataSrc.serviceName + "&path=" + iObj.fields[index].dataSrc.outputPath,
                                        dataType: "json",
                                        type: "POST",
                                        contentType: "application/json",
                                        async: false
                                    },
                                    parameterMap: function (data, type) {
                                        return '{"context":{"sessionId":"' + mService.app.getSessionId() + '","userId":"' + mService.user.profile.login.user_id + '","client_id":"' + mService.app.getClientId() + '","locale_id":"' + mService.app.getLocaleId() + '","country_code":"' + mService.app.getCountryCode() + '","inputparam":{"p_inputparam_xml":"' + iObj.fields[index].dataSrc.inputParameter.p_inputparam_xml + '"}}}';
                                    }
                                }
                            },
                            autoBind: true,
                            filter: "contains",
                            serverFiltering: serverFilteringValue,
                            delay: delayValue,
                            dataTextField: iObj.fields[index].textField,
                            dataValueField: iObj.fields[index].valueField,
                            placeholder: placeholderValue,
                            filtering: function (event) {
                                if (this.options.serverFiltering) {
                                    event.preventDefault();
                                    if (event.filter.value != "") {
                                        var fieldID = this.element.context.id;
                                        if ($("#" + fieldID).attr("data-inputparam") != undefined) {
                                            var inputString = $("#" + fieldID).attr("data-inputparam");
                                            var inputStringXML = $.parseXML($("#" + fieldID).attr("data-inputparam"));
                                            if (inputStringXML.getElementsByTagName("search_field_1")[0] != undefined) {
                                                inputStringXML.getElementsByTagName("search_field_1")[0].innerHTML = event.filter.value;
                                                inputString = (new XMLSerializer()).serializeToString(inputStringXML);
                                            } else {
                                                inputString = inputString.replace("</inputparam>", "<search_field_1>" + event.filter.value + "</search_field_1></inputparam>");
                                            }
                                            this.dataSource.transport.parameterMap = function (data, type) {
                                                return '{"context":{"sessionId":"' + mService.app.getSessionId() + '","userId":"' + mService.user.profile.login.user_id + '","client_id":"' + mService.app.getClientId() + '","locale_id":"' + mService.app.getLocaleId() + '","country_code":"' + mService.app.getCountryCode() + '","inputparam":{"p_inputparam_xml":"' + inputString + '"}}}';
                                            };
                                            this.dataSource.read();
                                        }
                                    }
                                }
                            }
                        });
                    } else {
                        $("#" + id).kendoComboBox({
                            dataSource: iObj.fields[index].dataSrc,
                            autoBind: true,
                            filter: "contains",
                            serverFiltering: false,
                            delay: 200,
                            dataTextField: iObj.fields[index].textField,
                            dataValueField: iObj.fields[index].valueField,
                            placeholder: placeholderValue
                        });
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).data("kendoComboBox").dataSource.filter({
                            logic: "and",
                            filters: [{
                                    field: "parent_id",
                                    operator: "eq",
                                    value: $("#" + iObj.scrID + "_" + iObj.fields[index].parent_field + ((iObj.fields[index].wType == "mLoop" || iObj.loop != "") ? ("-" + iObj.loopIndex) : (""))).formHandlerGetVal()
                                }
                            ]
                        });
                    };
                    $("#" + id).data("kendoComboBox").bind("change", function (event) {
                        if ($("#" + this.element.attr("id")).data("kendoComboBox").dataItem() != undefined) {
                            if ($("#" + this.element.attr("id")).data("kendoComboBox").dataItem()[event.sender.options.dataTextField] != "---Select---" && $("#" + this.element.attr("id")).data("kendoComboBox").dataItem()[event.sender.options.dataTextField] != "ALL" && $("#" + this.element.attr("id")).data("kendoComboBox").dataItem()[event.sender.options.dataTextField] != "") {
                                $(".display_description[data-for = '" + this.element.attr("id") + "']").text($("#" + this.element.attr("id")).data("kendoComboBox").dataItem()[event.sender.options.dataTextField]);
                            } else {
                                $(".display_description[data-for = '" + this.element.attr("id") + "']").text("");
                            }
                        } else {
                            $(".display_description[data-for = '" + this.element.attr("id") + "']").text("");
                        };
                        var loopIndex = ""
                            if (this.element.attr("data-mloopindex") != undefined) {
                                loopIndex = "-" + this.element.attr("data-mloopindex");
                            }
                            if (this.element.attr("data-parent-id") != undefined) {
                                $("#" + this.element.attr("id")).data("kendoComboBox").dataSource.filter({});
                                $("#" + this.element.attr("id")).data("kendoComboBox").dataSource.filter({
                                    logic: "and",
                                    filters: [{
                                            field: "parent_id",
                                            operator: "eq",
                                            value: $("#" + "form_handler_" + form_handler.variable.template + "_" + this.element.attr("data-parent-id") + loopIndex).formHandlerGetVal()
                                        }
                                    ]
                                });
                            };
                        if (this.element.attr("data-child-ids") != undefined) {
                            if ($("#" + this.element.attr("id")).formHandlerGetVal() != "") {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mDropdownlist") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.read();
                                        if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.data().length != 0) {
                                            $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").value("");
                                        };
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mCombobox") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mSearchpopup") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mMultiselect") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").trigger("change");
                                    };
                                }
                            } else {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mDropdownlist") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mCombobox") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mSearchpopup") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mMultiselect") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").trigger("change");
                                    };
                                }
                            }
                        };
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: this.element.attr("id")
                        });
                    });
                    $("#" + id).on("blur", function (event) {
                        if ($("#" + event.currentTarget.id).data("kendoComboBox").value() != "") {
                            var temp = $.grep($("#" + event.currentTarget.id).data("kendoComboBox").dataSource.data(), function (element, index) {
                                return element[$("#" + event.currentTarget.id).data("kendoComboBox").options.dataValueField] == $("#" + event.currentTarget.id).data("kendoComboBox").value();
                            })[0];
                            if (temp == undefined) {
                                alert("Selected Value is not valid.");
                                $("#" + event.currentTarget.id).data("kendoComboBox").focus();
                                $("#" + event.currentTarget.id).data("kendoComboBox").value("");
                                $(".display_description[data-for = '" + event.currentTarget.id + "']").text("");
                            }
                        } else if ($("[name = '" + event.currentTarget.id + "_input']").val() != "") {
                            alert("Selected Value is not valid.");
                            $("#" + event.currentTarget.id).data("kendoComboBox").focus();
                            $("[name = '" + event.currentTarget.id + "_input']").val("");
                        }
                    });
                } else if (iObj.fields[index].wType == "mSearchpopup") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    if (iObj.fields[index].dataSrc.applicationName != undefined && iObj.fields[index].dataSrc.inputParameter != undefined && iObj.fields[index].dataSrc.inputParameter.p_inputparam_xml != undefined) {
                        $("#" + id).attr("data-inputparam", iObj.fields[index].dataSrc.inputParameter.p_inputparam_xml);
                    }
                    var cacheConfig,
                    cachedData,
                    cacheDataSrc,
                    dataSourceValue,
                    placeholderValue,
                    validSearch;
                    if (iObj.fields[index].filterMode == true) {
                        placeholderValue = "ALL";
                    } else {
                        placeholderValue = "---Select---";
                    };
                    if (form_handler.variable.custom.cacheController[iObj.fields[index].dataSrc] != undefined) {
                        cacheConfig = form_handler.variable.custom.cacheController[iObj.fields[index].dataSrc];
                        if (cacheConfig != undefined && cacheConfig.code != undefined && cacheConfig.inputXml != undefined) {
                            cachedData = $.grep(form_handler.variable.custom.cacheManager, function (element, index) {
                                return element.infoCode == cacheConfig.code && element.inputXML == cacheConfig.inputXml;
                            });
                            if (cachedData.length != 0) {
                                dataSourceValue = cachedData[0].dataSet;
                            } else {
                                cacheDataSrc = mService.util.getTransportDataSource({
                                    applicationName: "common_modules",
                                    serviceName: "retrieve_manage_custom_info_list",
                                    outputPath: "outputparam_detail",
                                    api: true,
                                    pageSize: 50,
                                    inputParameter: {
                                        p_custom_info_code: cacheConfig.code,
                                        p_inputparam_xml: cacheConfig.inputXml
                                    },
                                    screenID: "form_handler_" + form_handler.variable.template
                                });
                                cacheDataSrc.read();
                                dataSourceValue = cacheDataSrc.data();
                                form_handler.variable.custom.cacheManager.push({
                                    infoCode: cacheConfig.code,
                                    inputXML: cacheConfig.inputXml,
                                    dataSet: cacheDataSrc.data()
                                });
                            }
                            $("#" + id).kendoComboBox({
                                dataSource: dataSourceValue,
                                autoBind: true,
                                serverFiltering: false,
                                dataTextField: iObj.fields[index].textField,
                                dataValueField: iObj.fields[index].valueField,
                                placeholder: placeholderValue,
                                filtering: function (event) {
                                    event.preventDefault();
                                }
                            });
                        }
                    } else if (iObj.fields[index].dataSrc.applicationName != undefined) {
                        $("#" + id).kendoComboBox({
                            dataSource: {
                                transport: {
                                    read: {
                                        url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=" + iObj.fields[index].dataSrc.applicationName + "&serviceName=" + iObj.fields[index].dataSrc.serviceName + "&path=" + iObj.fields[index].dataSrc.outputPath,
                                        dataType: "json",
                                        type: "POST",
                                        contentType: "application/json",
                                        async: false
                                    },
                                    parameterMap: function (data, type) {
                                        return '{"context":{"sessionId":"' + mService.app.getSessionId() + '","userId":"' + mService.user.profile.login.user_id + '","client_id":"' + mService.app.getClientId() + '","locale_id":"' + mService.app.getLocaleId() + '","country_code":"' + mService.app.getCountryCode() + '","inputparam":{"p_inputparam_xml":"' + iObj.fields[index].dataSrc.inputParameter.p_inputparam_xml + '"}}}';
                                    }
                                }
                            },
                            autoBind: true,
                            dataTextField: iObj.fields[index].textField,
                            dataValueField: iObj.fields[index].valueField,
                            placeholder: placeholderValue,
                            delay: 60000,
                            serverFiltering: true,
                            filtering: function (event) {
                                event.preventDefault();
                            }
                        });
                    } else {
                        $("#" + id).kendoComboBox({
                            dataSource: iObj.fields[index].dataSrc,
                            autoBind: true,
                            serverFiltering: false,
                            dataTextField: iObj.fields[index].textField,
                            dataValueField: iObj.fields[index].valueField,
                            placeholder: placeholderValue,
                            filtering: function (event) {
                                event.preventDefault();
                            }
                        });
                    }
                    $("#" + id).parent().find(".k-icon.k-i-arrow-60-down").removeClass("k-i-arrow-60-down").addClass("k-i-search").attr("id", id + "_search_btn");
                    validSearch = false;
                    $("#" + id + "_search_btn").click(function (event) {
                        if ($("[name = '" + event.target.id.replace("_search_btn", "") + "_input']").val() == "") {
                            $("#" + event.target.id.replace("_search_btn", "")).data("kendoComboBox").dataSource.filter({});
                            $("#" + event.target.id.replace("_search_btn", "")).data("kendoComboBox").dataSource.filter({
                                logic: "and",
                                filters: [{
                                        field: $("#" + event.target.id.replace("_search_btn", "")).data("kendoComboBox").options.dataValueField,
                                        operator: "eq",
                                        value: $("[name = '" + event.target.id.replace("_search_btn", "") + "_input']").val()
                                    }
                                ]
                            });
                            alert("Please enter any data to search.");
                            validSearch = false;
                        } else {
                            $("#" + event.target.id.replace("_search_btn", "")).data("kendoComboBox").dataSource.filter({});
                            if (($("[name = '" + event.target.id.replace("_search_btn", "") + "_input']").val() != "") && ($("#" + event.target.id.replace("_search_btn", "")).data("kendoComboBox").options.serverFiltering == true)) {
                                var fieldID = event.target.id.replace("_search_btn", "");
                                if ($("#" + fieldID).attr("data-inputparam") != undefined) {
                                    var inputString = $("#" + fieldID).attr("data-inputparam");
                                    var inputStringXML = $.parseXML($("#" + fieldID).attr("data-inputparam"));
                                    if (inputStringXML.getElementsByTagName("search_field_1")[0] != undefined) {
                                        inputStringXML.getElementsByTagName("search_field_1")[0].innerHTML = $("[name = '" + event.target.id.replace("_search_btn", "") + "_input']").val();
                                        inputString = (new XMLSerializer()).serializeToString(inputStringXML);
                                    } else {
                                        inputString = inputString.replace("</inputparam>", "<search_field_1>" + $("[name = '" + event.target.id.replace("_search_btn", "") + "_input']").val() + "</search_field_1></inputparam>");
                                    }
                                    $("#" + event.target.id.replace("_search_btn", "")).data("kendoComboBox").dataSource.transport.parameterMap = function (data, type) {
                                        return '{"context":{"sessionId":"' + mService.app.getSessionId() + '","userId":"' + mService.user.profile.login.user_id + '","client_id":"' + mService.app.getClientId() + '","locale_id":"' + mService.app.getLocaleId() + '","country_code":"' + mService.app.getCountryCode() + '","inputparam":{"p_inputparam_xml":"' + inputString + '"}}}';
                                    };
                                    $("#" + event.target.id.replace("_search_btn", "")).data("kendoComboBox").dataSource.read();
                                }
                            }
                            validSearch = true;
                        }
                    });
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).data("kendoComboBox").dataSource.filter({
                            logic: "and",
                            filters: [{
                                    field: "parent_id",
                                    operator: "eq",
                                    value: $("#" + iObj.scrID + "_" + iObj.fields[index].parent_field + ((iObj.fields[index].wType == "mLoop" || iObj.loop != "") ? ("-" + iObj.loopIndex) : (""))).formHandlerGetVal()
                                }
                            ]
                        });
                    };
                    $("#" + id).data("kendoComboBox").bind("change", function (event) {
                        if ($("#" + this.element.attr("id")).data("kendoComboBox").dataItem() != undefined) {
                            if ($("#" + this.element.attr("id")).data("kendoComboBox").dataItem()[event.sender.options.dataTextField] != "---Select---" && $("#" + this.element.attr("id")).data("kendoComboBox").dataItem()[event.sender.options.dataTextField] != "ALL" && $("#" + this.element.attr("id")).data("kendoComboBox").dataItem()[event.sender.options.dataTextField] != "") {
                                $(".display_description[data-for = '" + this.element.attr("id") + "']").text($("#" + this.element.attr("id")).data("kendoComboBox").dataItem()[event.sender.options.dataTextField]);
                            } else {
                                $(".display_description[data-for = '" + this.element.attr("id") + "']").text("");
                            }
                        } else {
                            $(".display_description[data-for = '" + this.element.attr("id") + "']").text("");
                        };
                        var loopIndex = ""
                            if (this.element.attr("data-mloopindex") != undefined) {
                                loopIndex = "-" + this.element.attr("data-mloopindex");
                            }
                            if (this.element.attr("data-parent-id") != undefined) {
                                $("#" + this.element.attr("id")).data("kendoComboBox").dataSource.filter({});
                                $("#" + this.element.attr("id")).data("kendoComboBox").dataSource.filter({
                                    logic: "and",
                                    filters: [{
                                            field: "parent_id",
                                            operator: "eq",
                                            value: $("#" + "form_handler_" + form_handler.variable.template + "_" + this.element.attr("data-parent-id") + loopIndex).formHandlerGetVal()
                                        }
                                    ]
                                });
                            };
                        if (this.element.attr("data-child-ids") != undefined) {
                            if ($("#" + this.element.attr("id")).formHandlerGetVal() != "") {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mDropdownlist") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.read();
                                        if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.data().length != 0) {
                                            $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").value("");
                                        };
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mCombobox") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mSearchpopup") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mMultiselect") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").trigger("change");
                                    };
                                }
                            } else {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mDropdownlist") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mCombobox") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mSearchpopup") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mMultiselect") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").trigger("change");
                                    };
                                }
                            }
                        };
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: this.element.attr("id")
                        });
                    });
                    $("#" + id).on("blur", function (event) {
                        if ($("#" + event.currentTarget.id).data("kendoComboBox").value() != "") {
                            var temp = $.grep($("#" + event.currentTarget.id).data("kendoComboBox").dataSource.data(), function (element, index) {
                                return element[$("#" + event.currentTarget.id).data("kendoComboBox").options.dataValueField] == $("#" + event.currentTarget.id).data("kendoComboBox").value();
                            })[0];
                            if (temp == undefined) {
                                alert("Selected Value is not valid.");
                                $("#" + event.currentTarget.id).data("kendoComboBox").focus();
                                $("#" + event.currentTarget.id).data("kendoComboBox").value("");
                                $(".display_description[data-for = '" + event.currentTarget.id + "']").text("");
                            }
                        } else if ($("[name = '" + event.currentTarget.id + "_input']").val() != "") {
                            alert("Selected Value is not valid.");
                            $("#" + event.currentTarget.id).data("kendoComboBox").focus();
                            $("[name = '" + event.currentTarget.id + "_input']").val("");
                        }
                    });
                } else if (iObj.fields[index].wType == "mMultiselect") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    var cacheConfig,
                    cachedData,
                    cacheDataSrc,
                    templateValue,
                    placeholderValue,
                    dataSourceValue;
                    templateValue = "${data." + iObj.fields[index].valueField + "}" + " - " + "${data." + iObj.fields[index].textField + "}";
                    if (iObj.fields[index].template == "code") {
                        templateValue = "${data." + iObj.fields[index].valueField + "}";
                    } else if (iObj.fields[index].template == "description") {
                        templateValue = "${data." + iObj.fields[index].textField + "}";
                    };
                    if (iObj.fields[index].filterMode == true) {
                        placeholderValue = "ALL";
                    } else {
                        placeholderValue = "---Select---";
                    };
                    dataSourceValue = iObj.fields[index].dataSrc;
                    if (form_handler.variable.custom.cacheController[iObj.fields[index].dataSrc] != undefined) {
                        cacheConfig = form_handler.variable.custom.cacheController[iObj.fields[index].dataSrc];
                        if (cacheConfig != undefined && cacheConfig.code != undefined && cacheConfig.inputXml != undefined) {
                            cachedData = $.grep(form_handler.variable.custom.cacheManager, function (element, index) {
                                return element.infoCode == cacheConfig.code && element.inputXML == cacheConfig.inputXml;
                            });
                            if (cachedData.length != 0) {
                                dataSourceValue = cachedData[0].dataSet;
                            } else {
                                cacheDataSrc = mService.util.getTransportDataSource({
                                    applicationName: "common_modules",
                                    serviceName: "retrieve_manage_custom_info_list",
                                    outputPath: "outputparam_detail",
                                    api: true,
                                    pageSize: 50,
                                    inputParameter: {
                                        p_custom_info_code: cacheConfig.code,
                                        p_inputparam_xml: cacheConfig.inputXml
                                    },
                                    screenID: "form_handler_" + form_handler.variable.template
                                });
                                cacheDataSrc.read();
                                dataSourceValue = cacheDataSrc.data();
                                form_handler.variable.custom.cacheManager.push({
                                    infoCode: cacheConfig.code,
                                    inputXML: cacheConfig.inputXml,
                                    dataSet: cacheDataSrc.data()
                                });
                            }
                        }
                    } else if (iObj.fields[index].dataSrc.applicationName != undefined) {
                        dataSourceValue = mService.util.getTransportDataSource({
                            applicationName: iObj.fields[index].dataSrc.applicationName,
                            serviceName: iObj.fields[index].dataSrc.serviceName,
                            outputPath: iObj.fields[index].dataSrc.outputPath,
                            inputParameter: iObj.fields[index].dataSrc.inputParameter
                        });
                    };
                    $("#" + id).kendoMultiSelect({
                        dataSource: dataSourceValue,
                        autoBind: false,
                        dataTextField: iObj.fields[index].valueField,
                        dataValueField: iObj.fields[index].valueField,
                        placeholder: placeholderValue,
                        itemTemplate: templateValue
                    });
                    $("#" + id).data("kendoMultiSelect").value([]);
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).data("kendoMultiSelect").dataSource.filter({
                            logic: "and",
                            filters: [{
                                    field: "parent_id",
                                    operator: "eq",
                                    value: $("#" + iObj.scrID + "_" + iObj.fields[index].parent_field + ((iObj.fields[index].wType == "mLoop" || iObj.loop != "") ? ("-" + iObj.loopIndex) : (""))).formHandlerGetVal()
                                }
                            ]
                        });
                    };
                    $("#" + id).data("kendoMultiSelect").bind("change", function (event) {
                        var loopIndex = ""
                            if (this.element.attr("data-mloopindex") != undefined) {
                                loopIndex = "-" + this.element.attr("data-mloopindex");
                            }
                            if (this.element.attr("data-parent-id") != undefined) {
                                $("#" + this.element.attr("id")).data("kendoMultiSelect").dataSource.filter({});
                                $("#" + this.element.attr("id")).data("kendoMultiSelect").dataSource.filter({
                                    logic: "and",
                                    filters: [{
                                            field: "parent_id",
                                            operator: "eq",
                                            value: $("#" + "form_handler_" + form_handler.variable.template + "_" + this.element.attr("data-parent-id") + loopIndex).formHandlerGetVal()
                                        }
                                    ]
                                });
                            };
                        if (this.element.attr("data-child-ids") != undefined) {
                            if ($("#" + this.element.attr("id")).formHandlerGetVal() != "") {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mDropdownlist") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.read();
                                        if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.data().length != 0) {
                                            $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").value("");
                                        };
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mCombobox") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mSearchpopup") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mMultiselect") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").dataSource.read();
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").trigger("change");
                                    };
                                }
                            } else {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mDropdownlist") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoDropDownList").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mCombobox") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mSearchpopup") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoComboBox").trigger("change");
                                    } else if ($("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).attr("data-widget-type") == "mMultiselect") {
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").dataSource.data([]);
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").value("");
                                        $("#" + "form_handler_" + form_handler.variable.template + "_" + childFieldList[childFieldCounter].trim() + loopIndex).data("kendoMultiSelect").trigger("change");
                                    };
                                }
                            }
                        };
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: event.sender.element.attr("id")
                        });
                    });
                } else if (iObj.fields[index].wType == "mDatebox") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    var actualMinimumValue,
                    actualMaximumValue,
                    formatValue,
                    minimumValue,
                    maximumValue;
                    actualMinimumValue = form_handler.customRequirementHandler.getActualValue(iObj.fields[index].min);
                    actualMaximumValue = form_handler.customRequirementHandler.getActualValue(iObj.fields[index].max);
                    formatValue = "dd-MM-yyyy",
                    minimumValue = new Date(1900, 0, 1),
                    maximumValue = new Date(2099, 11, 31);
                    if (iObj.fields[index].format != undefined) {
                        formatValue = iObj.fields[index].format;
                    };
                    if (actualMinimumValue != undefined && actualMinimumValue != "") {
                        minimumValue = actualMinimumValue;
                    };
                    if (actualMaximumValue != undefined && actualMaximumValue != "") {
                        maximumValue = new Date(actualMaximumValue.getFullYear(), actualMaximumValue.getMonth(), actualMaximumValue.getDate(), actualMaximumValue.getHours(), actualMaximumValue.getMinutes() + 2);
                    };
                    $("#" + id).kendoDatePicker({
                        format: formatValue,
                        min: minimumValue,
                        max: maximumValue
                    });
                    if (iObj.fields[index].defaultValue != undefined) {
                        try {
                            $("#" + id).data("kendoDatePicker").value(eval(iObj.fields[index].defaultValue));
                        } catch (e) {
                            $("#" + id).data("kendoDatePicker").value(iObj.fields[index].defaultValue);
                        }
                    }
                    $("#" + id).data("kendoDatePicker").bind("change", function (event) {
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: this.element.attr("id")
                        });
                    });
                } else if (iObj.fields[index].wType == "mTimebox") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    $("#" + id).kendoTimePicker();
                    $("#" + id).data("kendoTimePicker").bind("change", function (event) {
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: this.element.attr("id")
                        });
                    });
                } else if (iObj.fields[index].wType == "mTextbox") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    $("#" + id).attr("class", "k-textbox");
                    if (iObj.fields[index].maxlen != undefined) {
                        $("#" + id).attr("maxlength", iObj.fields[index].maxlen);
                        $("#" + id).attr("placeholder", "Max. of " + iObj.fields[index].maxlen + " characters allowed.");
                    };
                    if (iObj.fields[index].type == "email" || iObj.fields[index].type == "password") {
                        $("#" + id).attr("type", iObj.fields[index].type);
                    } else {
                        $("#" + id).attr("type", "text");
                    };
                    $("#" + id).change(function (event) {
                        var value = $("#" + event.target.id).val();
                        var elementId = event.target.id.replace("form_handler_" + form_handler.variable.template + "_", "");
                        var elementConfigData = $.grep(form_handler.variable.custom.uiConfig["page"][$("#form_handler_active_page").text() - 1].field, function (data, index) {
                            return data.id == elementId;
                        });
                        if (elementConfigData.length != 0 && elementConfigData[0].maxlen != undefined) {
                            if (value.length > parseInt(elementConfigData[0].maxlen)) {
                                $("#" + event.target.id).val(value.substring(0, parseInt(elementConfigData[0].maxlen)));
                            }
                        };
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: event.target.id
                        });
                    });
                } else if (iObj.fields[index].wType == "mTextarea") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    $("#" + id).attr("class", "k-textbox");
                    $("#" + id).attr("type", "text");
                    if (iObj.fields[index].maxlen != undefined) {
                        $("#" + id).attr("maxlength", iObj.fields[index].maxlen);
                        $("#" + id).attr("placeholder", "Max. of " + iObj.fields[index].maxlen + " characters allowed.");
                    };
                    $("#" + id).change(function (event) {
                        var value = $("#" + event.target.id).val();
                        var elementId = event.target.id.replace("form_handler_" + form_handler.variable.template + "_", "");
                        var elementConfigData = $.grep(form_handler.variable.custom.uiConfig["page"][$("#form_handler_active_page").text() - 1].field, function (data, index) {
                            return data.id == elementId;
                        });
                        if (elementConfigData.length != 0 && elementConfigData[0].maxlen != undefined) {
                            if (value.length > parseInt(elementConfigData[0].maxlen)) {
                                $("#" + event.target.id).val(value.substring(0, parseInt(elementConfigData[0].maxlen)));
                            }
                        };
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: event.target.id
                        });
                    });
                } else if (iObj.fields[index].wType == "mNumerictextbox") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    var formatValue,
                    minimumValue,
                    maximumValue,
                    stepValue,
                    decimalsValue;
                    formatValue = "n0",
                    minimumValue = null,
                    maximumValue = null,
                    stepValue = 1,
                    decimalsValue = null;
                    if (iObj.fields[index].format != undefined) {
                        formatValue = iObj.fields[index].format;
                    };
                    if (iObj.fields[index].min != undefined) {
                        minimumValue = form_handler.customRequirementHandler.getActualValue(iObj.fields[index].min);
                    };
                    if (iObj.fields[index].max != undefined) {
                        maximumValue = form_handler.customRequirementHandler.getActualValue(iObj.fields[index].max);
                    };
                    if (iObj.fields[index].step != undefined) {
                        stepValue = form_handler.customRequirementHandler.getActualValue(iObj.fields[index].step);
                    };
                    if (iObj.fields[index].decimals != undefined) {
                        decimalsValue = form_handler.customRequirementHandler.getActualValue(iObj.fields[index].decimals);
                    };
                    $("#" + id).kendoNumericTextBox({
                        decimals: decimalsValue,
                        format: formatValue,
                        max: maximumValue,
                        min: minimumValue,
                        step: stepValue
                    });
                    $("#" + id).data("kendoNumericTextBox").bind("change", function (event) {
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: event.sender.element.attr("id")
                        });
                    });
                    $("#" + id).data("kendoNumericTextBox").bind("spin", function (event) {
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: event.sender.element.attr("id")
                        });
                    });
                } else if (iObj.fields[index].wType == "mSlider") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    var minimumValue,
                    maximumValue,
                    stepValue;
                    minimumValue = 0,
                    maximumValue = 10,
                    stepValue = 1;
                    if (iObj.fields[index].min != undefined) {
                        minimumValue = iObj.fields[index].min;
                    }
                    if (iObj.fields[index].max != undefined) {
                        minimumValue = iObj.fields[index].max;
                    }
                    if (iObj.fields[index].step != undefined) {
                        minimumValue = iObj.fields[index].step;
                    }
                    $("#" + id).kendoSlider({
                        showButtons: false,
                        smallStep: stepValue,
                        largeStep: maximumValue,
                        min: minimumValue,
                        max: maximumValue
                    });
                    $("#" + id).data("kendoSlider").bind("change", function (event) {
                        formHandlerRuleEngine.executeRuleStatements({
                            screenID: "form_handler_" + form_handler.variable.template,
                            objectID: "field",
                            eventID: "change",
                            fieldID: event.sender.element.attr("id")
                        });
                    });
                } else if (iObj.fields[index].wType == "mAttachment") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    if (iObj.fields[index].maxSize != undefined) {
                        $("#" + id).attr("data-fileattach-count", iObj.fields[index].maxSize);
                    }
                    var fileSizeExceedIndicator,
                    allowedExtensionCheck,
                    fileExtensionFailedIndicator,
                    fileSuccessIndicator,
                    fileCounter,
                    successfulUploadCounter,
                    removedFileIndex,
                    multipleValue,
                    validateFileSize;
                    multipleValue = true;
                    validateFileSize = true;
                    if (iObj.fields[index].multiple == false) {
                        multipleValue = false;
                    };
                    if (iObj.fields[index].validateFileSize == false) {
                        validateFileSize = false;
                    };
                    successfulUploadCounter = 0;
                    $("#" + id).kendoUpload({
                        multiple: multipleValue,
                        remove: function (event) {
                            for (fileCounter = 0; fileCounter < event.files.length; fileCounter++) {
                                $.grep(form_handler.variable.custom.attachedFilesList[event.sender.element.attr("id")], function (element, index) {
                                    if (element.uid == event.files[fileCounter].uid && element.fileName == event.files[fileCounter].name) {
                                        removedFileIndex = index;
                                    }
                                });
                                form_handler.variable.custom.attachedFilesList[event.sender.element.attr("id")].splice(removedFileIndex, 1);
                            }
                        },
                        select: function (event) {
                            fileSizeExceedIndicator = false,
                            fileExtensionFailedIndicator = false;
                            if (form_handler.variable.custom.attachedFilesList[event.sender.element.attr("id")] == undefined) {
                                form_handler.variable.custom.attachedFilesList[event.sender.element.attr("id")] = [];
                            }
                            var fileAttachLimit = 3;
                            if (event.sender.element.attr("data-fileattach-count") != undefined) {
                                fileAttachLimit = parseInt(event.sender.element.attr("data-fileattach-count"));
                            }
                            if ((event.files.length + form_handler.variable.custom.attachedFilesList[event.sender.element.attr("id")].length) > fileAttachLimit) {
                                if (fileAttachLimit == 1) {
                                    alert("Maximum of only " + fileAttachLimit + " file is allowed to UPLOAD.");
                                } else {
                                    alert("Maximum of only " + fileAttachLimit + " files are allowed to UPLOAD.");
                                }
                                event.preventDefault();
                                return false;
                            };
                            for (fileCounter = 0; fileCounter < event.files.length; fileCounter++) {
                                fileSuccessIndicator = true;
                                allowedExtensionCheck = $.grep(mService.util.getAllowedExtension(), function (element, index) {
                                    return element.code == event.files[fileCounter].extension.toLowerCase();
                                });
                                if (allowedExtensionCheck.length == 0) {
                                    event.files.splice(fileCounter, 1);
                                    fileExtensionFailedIndicator = true;
                                    fileSuccessIndicator = false;
                                } else if (validateFileSize == true && event.files[fileCounter].size > 1048576) {
                                    event.files.splice(fileCounter, 1);
                                    fileSizeExceedIndicator = true;
                                    fileSuccessIndicator = false;
                                };
                                if (fileSuccessIndicator) {
                                    form_handler.variable.custom.attachedFilesList[event.sender.element.attr("id")].push({
                                        file: document.getElementById(event.sender.element.attr("id")).files[fileCounter],
                                        fileCategory: allowedExtensionCheck[0].parent_code,
                                        fileType: allowedExtensionCheck[0].parent_code,
                                        fileName: event.files[fileCounter].name,
                                        fileExtension: event.files[fileCounter].extension.toLowerCase(),
                                        uid: event.files[fileCounter].uid
                                    });
                                    var raw = event.files[fileCounter].rawFile;
                                    var reader = new FileReader();
                                    if (raw) {
                                        reader.onloadend = function () {
                                            form_handler.variable.custom.attachedFilesList[event.sender.element.attr("id")][form_handler.variable.custom.attachedFilesList[event.sender.element.attr("id")].length - 1].fileSource = this.result;
                                        };
                                        reader.readAsDataURL(raw);
                                    };
                                };
                            };
                            if (fileExtensionFailedIndicator) {
                                alert("Files with extensions other than " + $.map(mService.util.getAllowedExtension(), function (element) {
                                        return element.code;
                                    }).join() + " are not allowed to UPLOAD");
                            } else if (fileSizeExceedIndicator) {
                                alert("Files of size greater than 1 MB are not allowed to UPLOAD");
                            }
                        },
                        complete: function (event) {},
                        localization: {
                            select: "Select files..."
                        },
                        showFileList: true,
                        template: kendo.template("<div class = 'file-wrapper'><p style='white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 90%;'>Name: #=name#</p><button type = 'button' class = 'k-upload-action' style = 'position: absolute; top: 7px; right: 5px;'><span class = 'k-icon k-i-close k-delete' title = 'Remove'></span></button></div>")
                    });
                } else if (iObj.fields[index].wType == "mGeotag") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    $("#" + id).attr("class", "k-textbox");
                    $("#" + id).attr("placeholder", "Tag Location");
                    $("#" + id).css("position", "absolute");
                    $("#" + id).parent().append("<span style='font-size: x-large; margin-top: 1px; margin-left: 175px;' class='k-icon k-i-pin' id='form_handler_" + form_handler.variable.template + "_" + iObj.fields[index].id + "_tag_icon'></span>");
                    $("#" + id + "_tag_icon").click(function (event) {
                        navigator.geolocation.getCurrentPosition(function success(data) {
                            $("#" + event.target.id.replace("_tag_icon", "")).formHandlerSetVal(data.coords.latitude + "," + data.coords.longitude);
                        }, function failure(data) {
                            alert("Only secure origins are allowed.");
                        });
                    });
                } else if (iObj.fields[index].wType == "mSignaturepad") {
                    if (iObj.fields[index].mLoopInd != undefined) {
                        $("#" + id).attr("data-mloop-baseWidget", iObj.fields[index].baseWidgetId);
                    }
                    if (iObj.fields[index].parent_field != undefined) {
                        $("#" + id).attr("data-parent-id", iObj.fields[index].parent_field);
                    }
                    if (iObj.fields[index].child_fields != undefined) {
                        $("#" + id).attr("data-child-ids", iObj.fields[index].child_fields);
                    }
                    var geom = kendo.geometry;
                    var Point = geom.Point;
                    var draw = kendo.drawing;
                    var Path = draw.Path;
                    var path;
                    $("#" + id + "_surface_container").on("mousemove", function (e) {
                        if (!path) {
                            return;
                        }
                        var offset = $(this).offset();
                        var newPoint = new Point(e.pageX - offset.left, e.pageY - offset.top);
                        path.lineTo(newPoint);
                    }).on("mousedown", function (e) {
                        path = new Path({
                            stroke: {
                                color: '#E4141B',
                                width: 2,
                                lineCap: "round",
                                lineJoin: "round"
                            }
                        });
                        var offset = $(this).offset();
                        var newPoint = new Point(e.pageX - offset.left, e.pageY - offset.top);
                        for (var i = 0; i < 1; i++) {
                            path.lineTo(newPoint.clone().translate(i * 1, 0));
                        }
                        form_handler.variable.custom["signature_pad_" + e.currentTarget.id].draw(path);
                    }).on("mouseup", function (e) {
                        path = undefined;
                    });
                    form_handler.variable.custom["signature_pad_" + id + "_surface_container"] = draw.Surface.create($("#" + id + "_surface"));
                    $("#" + id + "_surface_clear").click(function (e) {
                        form_handler.variable.custom["signature_pad_" + e.target.id.replace("_clear", "_container")].clear();
                    });
                }
            }
        },
        navigatePage: function (page, validateInd) {
            if (page.length != 0) {
                var subpageIndex = parseInt(page.attr("data-subpage-no"));
                if (validateInd == true) {
                    if (form_handler.variable.validator[$("[data-subpage-no = '" + $("#form_handler_active_page").text() + "']").attr("id")].validate()) {
                        $("#form_handler_content [data-role = 'subpage']").css("display", "none");
                        page.css("display", "");
                        $("#form_handler_active_page").text(page.attr("data-subpage-no"));
                        if (page.attr("data-subpage-name") == undefined || "") {
                            $("#form_handler_page_title_lbl").parent().hide();
                        } else {
                            $("#form_handler_page_title_lbl").text(page.attr("data-subpage-name"));
                            $("#form_handler_page_title_lbl").parent().show();
                        }
                    } else {
                        alert("Please fill all the mandatory fields");
                    }
                } else {
                    $("#form_handler_content [data-role = 'subpage']").css("display", "none");
                    page.css("display", "");
                    $("#form_handler_active_page").text(page.attr("data-subpage-no"));
                    if (page.attr("data-subpage-name") == undefined || "") {
                        $("#form_handler_page_title_lbl").parent().hide();
                    } else {
                        $("#form_handler_page_title_lbl").text(page.attr("data-subpage-name"));
                        $("#form_handler_page_title_lbl").parent().show();
                    }
                }
            }
        },
        getInputparam: function (iObj) {
            var inputparam = "",
            inputparamObj = {},
            root,
            index,
            subIndex,
            imgs,
            condition = "",
            fieldList,
            mParent,
            mLoop,
            mLoopIndex;
            if ($.isArray(iObj.condition)) {
                condition = "(($(e).attr('id') != undefined) && (";
                for (index in iObj.condition) {
                    condition += "($(e).attr('id').indexOf('" + iObj.condition[index] + "') != -1) || ";
                };
                condition = condition.substring(0, condition.length - 4) + "))";
            };
            condition = (condition == "") ? ("$(e).attr('id') != undefined") : condition;
            fieldList = $.grep($("#" + iObj.scrID + " " + "[data-widget-type = 'mAttachment'], [data-widget-type = 'mCombobox'], [data-widget-type = 'mDatebox'], [data-widget-type = 'mDropdownlist'], [data-widget-type = 'mFlipswitch'], [data-widget-type = 'mMultiselect'], [data-widget-type = 'mNumerictextbox'], [data-widget-type = 'mSignaturepad'], [data-widget-type = 'mTextarea'], [data-widget-type = 'mTextbox'], [data-widget-type = 'mSlider'], [data-widget-type = 'mTimebox'], [data-widget-type = 'mSearchpopup'], [data-widget-type = 'mGeotag']"), function (e, i) {
                return eval(condition);
            });
            for (index = 0; index < fieldList.length; index++) {
                mParent = $(fieldList[index]).attr("data-mparentgroup");
                mLoop = $(fieldList[index]).attr("data-mloop");
                mLoopIndex = $(fieldList[index]).attr("data-mloopindex");
                if (mParent != undefined) {
                    if (inputparamObj[mParent] == undefined) {
                        inputparamObj[mParent] = "";
                    };
                    root = mParent;
                } else if (mLoop != undefined) {
                    if (inputparamObj[mLoop] == undefined) {
                        inputparamObj[mLoop] = [];
                        inputparamObj[mLoop][parseInt(mLoopIndex)] = "";
                    } else if (inputparamObj[mLoop][parseInt(mLoopIndex)] == undefined) {
                        inputparamObj[mLoop][parseInt(mLoopIndex)] = "";
                    };
                    root = mLoop;
                } else {
                    if (inputparamObj["field"] == undefined) {
                        inputparamObj["field"] = "";
                    };
                    root = "field";
                };
                if ($(fieldList[index]).attr("data-widget-type") == "mAttachment") {
                    if (form_handler.variable.custom.attachedFilesList[$(fieldList[index]).attr("id")] != undefined) {
                        imgs = form_handler.variable.custom.attachedFilesList[$(fieldList[index]).attr("id")];
                    } else {
                        imgs = [];
                    }
                    if (mLoop != undefined) {
                        inputparamObj[root][parseInt(mLoopIndex)] += "<" + $(fieldList[index]).attr("id").substring(0, $(fieldList[index]).attr("id").lastIndexOf("-")).replace(iObj.scrID + "_", "") + ">";
                    } else {
                        inputparamObj[root] += "<" + $(fieldList[index]).attr("id").replace(iObj.scrID + "_", "") + ">";
                    };
                    for (subIndex = 0; subIndex < imgs.length; subIndex++) {
                        if (mLoop != undefined) {
                            inputparamObj[root][parseInt(mLoopIndex)] += "<" + "img" + subIndex + ">" + imgs[subIndex].fileSource + "</" + "img" + subIndex + ">"; ;
                        } else {
                            inputparamObj[root] += "<" + "img" + subIndex + ">" + imgs[subIndex].fileSource + "</" + "img" + subIndex + ">"; ;
                        }
                    };
                    if (mLoop != undefined) {
                        inputparamObj[root][parseInt(mLoopIndex)] += "</" + $(fieldList[index]).attr("id").substring(0, $(fieldList[index]).attr("id").lastIndexOf("-")).replace(iObj.scrID + "_", "") + ">";
                    } else {
                        inputparamObj[root] += "</" + $(fieldList[index]).attr("id").replace(iObj.scrID + "_", "") + ">";
                    }
                } else {
                    if (mLoop != undefined) {
                        inputparamObj[root][parseInt(mLoopIndex)] += "<" + $(fieldList[index]).attr("id").substring(0, $(fieldList[index]).attr("id").lastIndexOf("-")).replace(iObj.scrID + "_", "") + ">";
                    } else {
                        inputparamObj[root] += "<" + $(fieldList[index]).attr("id").replace(iObj.scrID + "_", "") + ">";
                    };
                    if ($(fieldList[index]).attr("data-widget-type") == "mDatebox") {
                        if (mLoop != undefined) {
                            inputparamObj[root][parseInt(mLoopIndex)] += mService.util.getXmlString(kendo.toString($(fieldList[index]).formHandlerGetVal(), "yyyy-MM-dd"));
                        } else {
                            inputparamObj[root] += mService.util.getXmlString(kendo.toString($(fieldList[index]).formHandlerGetVal(), "yyyy-MM-dd"));
                        }
                    } else if ($(fieldList[index]).attr("data-widget-type") == "mTimebox") {
                        if (mLoop != undefined) {
                            inputparamObj[root][parseInt(mLoopIndex)] += mService.util.getXmlString(kendo.toString($(fieldList[index]).formHandlerGetVal(), "HH:mm"));
                        } else {
                            inputparamObj[root] += mService.util.getXmlString(kendo.toString($(fieldList[index]).formHandlerGetVal(), "HH:mm"));
                        }
                    } else if ($(fieldList[index]).attr("data-widget-type") == "mMultiselect") {
                        if (mLoop != undefined) {
                            inputparamObj[root][parseInt(mLoopIndex)] += mService.util.getXmlString($(fieldList[index]).formHandlerGetVal().join());
                        } else {
                            inputparamObj[root] += mService.util.getXmlString($(fieldList[index]).formHandlerGetVal().join());
                        }
                    } else if ($(fieldList[index]).attr("data-widget-type") == "mSignaturepad") {
                        kendo.drawing.drawDOM($("#" + fieldList[index].id + "_surface")).then(function (group) {
                            return kendo.drawing.exportImage(group);
                        }).done(function (data) {
                            if (mLoop != undefined) {
                                inputparamObj[root][parseInt(mLoopIndex)] += mService.util.getXmlString(data);
                            } else {
                                inputparamObj[root] += mService.util.getXmlString(data);
                            }
                        });
                    } else {
                        if (mLoop != undefined) {
                            inputparamObj[root][parseInt(mLoopIndex)] += mService.util.getXmlString($(fieldList[index]).formHandlerGetVal().toString());
                        } else {
                            inputparamObj[root] += mService.util.getXmlString($(fieldList[index]).formHandlerGetVal().toString());
                        }
                    };
                    if (mLoop != undefined) {
                        inputparamObj[root][parseInt(mLoopIndex)] += "</" + $(fieldList[index]).attr("id").substring(0, $(fieldList[index]).attr("id").lastIndexOf("-")).replace(iObj.scrID + "_", "") + ">";
                    } else {
                        inputparamObj[root] += "</" + $(fieldList[index]).attr("id").replace(iObj.scrID + "_", "") + ">";
                    }
                }
            };
            inputparam += "<inputparam>";
            for (index in inputparamObj) {
                if ($.isArray(inputparamObj[index]) == false) {
                    if (index != "field") {
                        inputparam += "<" + index + ">" + inputparamObj[index] + "</" + index + ">";
                    } else {
                        inputparam += inputparamObj[index];
                    }
                } else {
                    for (subIndex in inputparamObj[index]) {
                        inputparam += "<" + index + ">" + inputparamObj[index][subIndex] + "</" + index + ">";
                    }
                }
            };
            inputparam += "</inputparam>";
            return inputparam;
        },
        getActualValue: function (valueString) {
            var returnValue,
            xmlDoc,
            childNodesCounter;
            returnValue = "";
            if (valueString != undefined && valueString != "") {
                if (valueString.charAt(0) == "$") {
                    try {
                        returnValue = eval(valueString.substring(1));
                    } catch (exception) {
                        returnValue = "";
                    }
                } else if (valueString.charAt(0) == "#") {
                    returnValue = $(valueString).formHandlerGetVal();
                } else if (valueString == "NEWDATE") {
                    returnValue = new Date();
                } else if (valueString.charAt(0) == "'" || valueString.charAt(0) == '"') {
                    returnValue = valueString.substring(1, valueString.length - 1);
                } else if (valueString.charAt(0) == "<" && valueString.charAt(valueString.length - 1) == ">") {
                    xmlDoc = mService.util.getXmlDocument(valueString);
                    for (childNodesCounter = 0; childNodesCounter < xmlDoc.childNodes[0].childElementCount; childNodesCounter++) {
                        xmlDoc.childNodes[0].childNodes[childNodesCounter].childNodes[0].nodeValue = form_handler.customRequirementHandler.getActualValue(xmlDoc.childNodes[0].childNodes[childNodesCounter].childNodes[0].nodeValue);
                    };
                    returnValue = xmlDoc.childNodes[0].outerHTML;
                } else {
                    try {
                        returnValue = eval(valueString);
                    } catch (exception) {
                        returnValue = "";
                    }
                }
            };
            return returnValue;
        },
        getConcatenatedValue: function (concatenationObject) {
            var actualValueList,
            valueListCounter;
            actualValueList = [];
            for (valueListCounter = 0; valueListCounter < concatenationObject.valueList.length; valueListCounter++) {
                actualValueList.push(form_handler.customRequirementHandler.getActualValue(concatenationObject.valueList[valueListCounter].trim()));
            };
            return actualValueList.join(concatenationObject.delimiter);
        }
    },
    variable: {
        validator: {},
        custom: {
            attachedFilesList: [],
            cacheManager: [],
            draftInd: false,
            mLoop: {},
            mloopGroups: {},
            mLoopChangeFields: {
                mLoopParent: {},
                loopIndex: {}
            }
        }
    }
};
var formHandlerRuleEngine = {
    applyRuleActions: function (actionString) {
        var actionList,
        actionListCounter,
        currentActionString,
        actionName,
        actionFields,
        actionFieldsCounter,
        dataValidationRules,
        alertMessage,
        readDataSource,
        readDataSourceInput,
        valueString;
        actionList = actionString.trim().split("\n");
        for (actionListCounter = 0; actionListCounter < actionList.length; actionListCounter++) {
            currentActionString = actionList[actionListCounter].trim();
            if (currentActionString != "") {
                if (currentActionString.indexOf("ALERT") == 0) {
                    alertMessage = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]"));
                    alertMessage = alertMessage.substring(alertMessage.indexOf('"') + 1, alertMessage.lastIndexOf('"'));
                    alert(alertMessage);
                } else {
                    actionName = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim();
                    currentActionString = currentActionString.substring(currentActionString.indexOf("ON"));
                    actionFields = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim().split(",");
                    var loopFields = [];
                    for (actionFieldsCounter = 0; actionFieldsCounter < actionFields.length; actionFieldsCounter++) {
                        if ($("[data-mloop-baseWidget='" + actionFields[actionFieldsCounter].trim().substring(1) + "']").length > 0) {
                            var loopIndex = form_handler.variable.custom.mLoopChangeFields.loopIndex[form_handler.variable.custom.mLoopChangeFields.mLoopParent[actionFields[actionFieldsCounter].trim().substring(1)]];
                            if (loopIndex == 0 && $("[data-mloop-baseWidget='" + actionFields[actionFieldsCounter].trim().substring(1) + "']").length > 1) {
                                var loopFieldsList = $("[data-mloop-baseWidget=" + actionFields[actionFieldsCounter].trim().substring(1) + "]");
                                for (var loopInd = 0; loopInd < loopFieldsList.length; loopInd++) {
                                    loopFields.push("#" + $(loopFieldsList[loopInd]).attr("data-mloop-baseWidget") + "-" + loopInd);
                                }
                            } else {
                                loopFields.push(actionFields[actionFieldsCounter].trim() + "-" + loopIndex);
                            }
                        } else {
                            loopFields.push(actionFields[actionFieldsCounter].trim());
                        }
                    }
                    if (loopFields.length != 0) {
                        actionFields = loopFields;
                    }
                    for (actionFieldsCounter = 0; actionFieldsCounter < actionFields.length; actionFieldsCounter++) {
                        if (actionName == "SetValue") {
                            if (currentActionString.indexOf("VALUE") != -1) {
                                currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                                valueString = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim();
                                if (valueString.indexOf("CONCAT") == 0) {
                                    valueString = valueString.substring(valueString.indexOf("(") + 1, valueString.lastIndexOf(")")).split(",");
                                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                                        $(actionFields[actionFieldsCounter].trim()).formHandlerSetVal(form_handler.customRequirementHandler.getConcatenatedValue({
                                                delimiter: valueString[0].trim(),
                                                valueList: valueString.splice(1)
                                            }));
                                    } else if (actionFields[actionFieldsCounter].trim().indexOf("$") == 0) {
                                        eval(actionFields[actionFieldsCounter].trim().substring(1) + " = form_handler.customRequirementHandler.getConcatenatedValue({delimiter : valueString[0].trim(), valueList : valueString.splice(1)})");
                                    }
                                } else if (valueString.indexOf("READ") == 0) {
                                    valueString = valueString.substring(valueString.indexOf("(") + 1, valueString.lastIndexOf(")"));
                                    readDataSourceInput = JSON.parse(valueString);
                                    readDataSource = mService.util.getTransportDataSource(readDataSourceInput);
                                    readDataSource.read();
                                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                                        $(actionFields[actionFieldsCounter].trim()).formHandlerSetVal(readDataSource.data()[0][readDataSourceInput.outputParameter]);
                                    } else if (actionFields[actionFieldsCounter].trim().indexOf("$") == 0) {
                                        if (readDataSourceInput.outputParameter != undefined) {
                                            eval(actionFields[actionFieldsCounter].trim().substring(1) + " = readDataSource.data()[0][readDataSourceInput.outputParameter]");
                                        } else {
                                            eval(actionFields[actionFieldsCounter].trim().substring(1) + " = readDataSource.data()");
                                        }
                                    }
                                } else {
                                    if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
                                        if ($(actionFields[actionFieldsCounter].trim() + "_group").attr("data-mloop-base") == "mLoop") {
                                            currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                                            var valueString = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.lastIndexOf("]")).trim(),
                                            valueArray = [],
                                            currentActionFieldInMLoop;
                                            if (valueString.trim().indexOf("$") == 0) {
                                                valueArray = mService.util.getActualValue(valueString);
                                                if ($.isArray(valueArray) == false) {
                                                    valueArray = valueArray.toJSON();
                                                }
                                            } else if (valueString.trim().indexOf("[") == 0) {
                                                valueArray = JSON.parse(valueString);
                                            }
                                            if (valueArray != undefined) {
                                                if (valueArray.length > 1) {
                                                    form_handler.customRequirementHandler.createLoopFieldsFromRule(actionFields[actionFieldsCounter].trim().replace("#", ""), valueArray);
                                                }
                                                form_handler.variable.custom.mloopGroups[actionFields[actionFieldsCounter].trim().substring(1) + "_group"] = valueArray;
                                            }
                                        } else {
                                            $(actionFields[actionFieldsCounter].trim()).formHandlerSetVal(form_handler.customRequirementHandler.getActualValue(valueString));
                                        }
                                    } else if (actionFields[actionFieldsCounter].trim().indexOf("$") == 0) {
                                        eval(actionFields[actionFieldsCounter].trim().substring(1) + " = form_handler.customRequirementHandler.getActualValue(valueString)");
                                    }
                                }
                            }
                        } else if (actionName == "KeyfieldPattern" || actionName == "OtherfieldPattern" || actionName == "NumberPattern" || actionName == "DatePattern" || actionName == "DateTimePattern") {
                            if ($(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule") == undefined) {
                                $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", actionName);
                            } else {
                                dataValidationRules = $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule").split(",");
                                if ($.inArray(actionName, dataValidationRules) == -1) {
                                    dataValidationRules.push(actionName);
                                    $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", dataValidationRules.join());
                                }
                            }
                        } else if (actionName == "Mandatory") {
                            if ($(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule") == undefined) {
                                $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", actionName);
                                if ($(actionFields[actionFieldsCounter].trim() + "_lbl span").length == 0) {
                                    $(actionFields[actionFieldsCounter].trim() + "_lbl").append("<span class = 'required'>*</span>");
                                } else {
                                    $(actionFields[actionFieldsCounter].trim() + "_lbl span").show();
                                }
                            } else {
                                dataValidationRules = $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule").split(",");
                                if ($.inArray(actionName, dataValidationRules) == -1) {
                                    dataValidationRules.push(actionName);
                                    $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", dataValidationRules.join());
                                    if ($(actionFields[actionFieldsCounter].trim() + "_lbl span").length == 0) {
                                        $(actionFields[actionFieldsCounter].trim() + "_lbl").append("<span class = 'required'>*</span>");
                                    } else {
                                        $(actionFields[actionFieldsCounter].trim() + "_lbl span").show();
                                    }
                                }
                            }
                        } else if (actionName == "Optional") {
                            if ($(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule") != undefined) {
                                dataValidationRules = $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule").split(",");
                                if ($.inArray("Mandatory", dataValidationRules) != -1) {
                                    dataValidationRules.splice($.inArray("Mandatory", dataValidationRules), 1);
                                    if (dataValidationRules.length == 0) {
                                        $(actionFields[actionFieldsCounter].trim()).removeAttr("data-validation-rule");
                                        $(actionFields[actionFieldsCounter].trim() + "_lbl span").hide();
                                    } else {
                                        $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", dataValidationRules.join());
                                        $(actionFields[actionFieldsCounter].trim() + "_lbl span").hide();
                                    }
                                }
                            }
                        } else if (actionName == "Hide") {
                            if (($(actionFields[actionFieldsCounter].trim()).attr("role") == "tab") || ($(actionFields[actionFieldsCounter].trim()).attr("data-widget-type") == "w_button")) {
                                $(actionFields[actionFieldsCounter].trim()).hide();
                            } else {
                                $(actionFields[actionFieldsCounter].trim() + "_group").hide();
                            }
                        } else if (actionName == "Show") {
                            if (($(actionFields[actionFieldsCounter].trim()).attr("role") == "tab") || ($(actionFields[actionFieldsCounter].trim()).attr("data-widget-type") == "w_button")) {
                                $(actionFields[actionFieldsCounter].trim()).show();
                            } else {
                                $(actionFields[actionFieldsCounter].trim() + "_group").show();
                            }
                        } else if (actionName == "Enable") {
                            if ($(actionFields[actionFieldsCounter].trim() + "_group").attr("data-mloop-base") == "mLoop") {
                                var loopFieldsList = $("[data-base-widget=" + actionFields[actionFieldsCounter].trim().replace('#', '') + "]");
                                for (var childGroupIndex = 0; childGroupIndex < loopFieldsList.length; childGroupIndex++) {
                                    var childFieldsList = $(loopFieldsList[childGroupIndex]).children();
                                    for (var childFieldIndex = 0; childFieldIndex < childFieldsList.length; childFieldIndex++) {
                                        $("#" + $(childFieldsList[childFieldIndex]).attr("id").replace("_group", "")).formHandlerEnable();
                                    }
                                }
                                $("#" + actionFields[actionFieldsCounter].trim().replace("#", "") + "-" + parseInt(loopFieldsList.length - 1) + "_btn").prop('enabled', true);
                                $(actionFields[actionFieldsCounter].trim() + "_group").attr("deletionInd", "false")
                            } else {
                                $(actionFields[actionFieldsCounter].trim()).formHandlerEnable();
                            }
                        } else if (actionName == "Disable") {
                            if ($(actionFields[actionFieldsCounter].trim() + "_group").attr("data-mloop-base") == "mLoop") {
                                var loopFieldsList = $("[data-base-widget=" + actionFields[actionFieldsCounter].trim().replace('#', '') + "]");
                                for (var childGroupIndex = 0; childGroupIndex < loopFieldsList.length; childGroupIndex++) {
                                    var childFieldsList = $(loopFieldsList[childGroupIndex]).children();
                                    for (var childFieldIndex = 0; childFieldIndex < childFieldsList.length; childFieldIndex++) {
                                        $("#" + $(childFieldsList[childFieldIndex]).attr("id").replace("_group", "")).formHandlerDisable();
                                    }
                                }
                                $("#" + actionFields[actionFieldsCounter].trim().replace("#", "") + "-" + parseInt(loopFieldsList.length - 1) + "_btn").prop('disabled', true);
                                $(actionFields[actionFieldsCounter].trim() + "_group").attr("deletionInd", "false")
                            } else {
                                $(actionFields[actionFieldsCounter].trim()).formHandlerDisable();
                            }
                        } else if (actionName == "Click") {
                            $(actionFields[actionFieldsCounter].trim()).click();
                        } else if (actionName == "SetMinimum") {
                            if (currentActionString.indexOf("VALUE") != -1) {
                                currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                                $(actionFields[actionFieldsCounter].trim()).formHandlerSetMin(form_handler.customRequirementHandler.getActualValue(currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim()));
                            }
                        } else if (actionName == "SetMaximum") {
                            if (currentActionString.indexOf("VALUE") != -1) {
                                currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
                                $(actionFields[actionFieldsCounter].trim()).formHandlerSetMax(form_handler.customRequirementHandler.getActualValue(currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim()));
                            }
                        } else if (actionName == "Search") {
                            if (currentActionString.indexOf("VALUE") != -1) {
                                currentActionString = currentActionString.slice(currentActionString.indexOf("VALUE"));
                                eval(currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("];")).trim());
                            }
                        }
                    }
                }
            }
        }
    },
    evaluateConditionString: function (rawConditionString) {
        var conditionString,
        conditionArguments,
        argumentCounter,
        leftSideValue,
        rightSideValue;
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
                        conditionArguments["leftArgument" + argumentCounter] = form_handler.customRequirementHandler.getActualValue(leftSideValue);
                        conditionString += "conditionArguments.leftArgument" + argumentCounter;
                        rawConditionString = rawConditionString.substring(rawConditionString.indexOf(" ")).trim();
                        conditionString += rawConditionString.substring(0, rawConditionString.indexOf(" "));
                        rawConditionString = rawConditionString.substring(rawConditionString.indexOf(" ")).trim();
                        rightSideValue = rawConditionString.substring(0, rawConditionString.indexOf(")")).trim();
                        conditionArguments["rightArgument" + argumentCounter] = form_handler.customRequirementHandler.getActualValue(rightSideValue);
                        conditionString += "conditionArguments.rightArgument" + argumentCounter;
                        rawConditionString = rawConditionString.substring(rawConditionString.indexOf(")")).trim();
                        argumentCounter++;
                    } else {
                        conditionString += formHandlerRuleEngine.getOperatorForCode(rawConditionString.substring(0, rawConditionString.indexOf(" ")));
                        rawConditionString = rawConditionString.substring(rawConditionString.indexOf(" ")).trim();
                    }
                }
            } else {
                break;
            }
        };
        return eval(conditionString);
    },
    executeConfiguredRules: function (screenID) {
        $("#" + screenID).kendoValidator({
            rules: {
                validationRuleMandatory: function (e) {
                    if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("Mandatory") != null && e.attr("id") != undefined) {
                        if (e.attr("data-widget-type") == "mMultiselect") {
                            if ($("#" + e.attr("id")).data("kendoMultiSelect").value().length == 0) {
                                return false;
                            }
                        } else if (e.attr("data-widget-type") == "mAttachment") {
                            if (form_handler.variable.custom.attachedFilesList[e.attr("id")] == undefined || form_handler.variable.custom.attachedFilesList[e.attr("id")].length == 0) {
                                return false;
                            }
                        } else if (e.attr("data-widget-type") == "mSignaturepad") {
                            if (form_handler.variable.custom["signature_pad_" + e.attr("id") + "_surface_container"].exportVisual().children.length == 0) {
                                return false;
                            }
                        } else {
                            if (e.formHandlerGetVal().toString() == "") {
                                return false;
                            }
                        }
                    };
                    return true;
                },
                validationRuleKeyfieldPattern: function (e) {
                    if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("KeyfieldPattern") != null) {
                        if (e.val() != "") {
                            if (!e.val().match(/^[.\w-\/]*$/)) {
                                return false;
                            }
                        }
                    };
                    return true;
                },
                validationRuleOtherfieldPattern: function (e) {
                    if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("OtherfieldPattern") != null) {
                        if (e.val() != "") {
                            if (!e.val().match(/^[\w\s#-\/\\&\(\):@;.,\[\]]*$/)) {
                                return false;
                            }
                        }
                    };
                    return true;
                },
                validationRuleNumberPattern: function (e) {
                    if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("NumberPattern") != null) {
                        if (e.val() != "") {
                            if (!e.val().match(/^-?[\d]*$/)) {
                                return false;
                            }
                        }
                    };
                    return true;
                },
                validationRuleDatePickerPattern: function (e) {
                    if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("DatePattern") != null) {
                        if (e.val() != "") {
                            if (!e.val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)$/)) {
                                return false;
                            }
                        }
                    };
                    return true;
                },
                validationRuleDateTimePickerPattern: function (e) {
                    if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("DateTimePattern") != null) {
                        if (e.val() != "") {
                            if (!e.val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)[\s]([01]\d|2[0123])[:]([0-5]\d)$/)) {
                                return false;
                            }
                        }
                    };
                    return true;
                }
            },
            messages: {
                validationRuleMandatory: "Should not be empty",
                validationRuleKeyfieldPattern: "Only a-zA-Z0-9._-/ are allowed",
                validationRuleOtherfieldPattern: "Only a-zA-Z0-9_-\\#/& :@;.,()[] are allowed",
                validationRuleNumberPattern: "This is not a valid Number",
                validationRuleDatePickerPattern: "Date should be in 'dd-mm-yyyy' format",
                validationRuleDateTimePickerPattern: "Date & Time should be in 'dd-mm-yyyy hh:mm' (24 hour) format",
                email: "This is not a valid E-mail id"
            },
        });
        $("#" + screenID).data("kendoValidator")._inputSelector = $("#" + screenID).data("kendoValidator")._inputSelector.replace(",[readonly]", "");
        return $("#" + screenID).data("kendoValidator");
    },
    executeRuleStatements: function (ruleObject) {
        var currentConfig,
        currentObjectConfig,
        currentEventConfig,
        currentFieldConfig,
        ruleArray,
        ruleCounter,
        currentRule,
        alertMessage,
        returnValue = true;
        currentConfig = $.grep(formHandlerRuleEngine.variable.ruleConfigurations, function (element, index) {
            return element.screenID == ruleObject.screenID;
        })[0];
        if (currentConfig != undefined) {
            currentObjectConfig = $.grep(currentConfig.object, function (element, index) {
                return element.name == ruleObject.objectID;
            })[0];
            if (currentObjectConfig != undefined) {
                currentEventConfig = $.grep(currentObjectConfig.event, function (element, index) {
                    return element.name == ruleObject.eventID;
                })[0];
                if (currentEventConfig != undefined) {
                    if ($("#" + ruleObject.fieldID).attr("data-mloopindex") != undefined) {
                        currentFieldConfig = $.grep(currentEventConfig.field, function (element, index) {
                            return element.name == $("#" + ruleObject.fieldID).attr("id").replace("-" + $("#" + ruleObject.fieldID).attr("data-mloopindex"), "");
                        })[0];
                        form_handler.variable.custom.mLoopChangeFields.loopIndex[form_handler.variable.custom.mLoopChangeFields.mLoopParent[$("#" + ruleObject.fieldID).attr("id").replace("-" + $("#" + ruleObject.fieldID).attr("data-mloopindex"), "")]] = $("#" + ruleObject.fieldID).attr("data-mloopindex");
                    } else {
                        currentFieldConfig = $.grep(currentEventConfig.field, function (element, index) {
                            return element.name == ruleObject.fieldID;
                        })[0];
                    }
                    if (currentFieldConfig != undefined) {
                        ruleArray = currentFieldConfig.rule;
                        for (ruleCounter = 1; ruleCounter <= ruleArray.length; ruleCounter++) {
                            currentRule = $.grep(ruleArray, function (element, index) {
                                return element.order == ruleCounter.toString();
                            })[0];
                            if (currentRule != undefined) {
                                if (currentRule.ruleStatements.executeService != "") {
                                    formHandlerRuleEngine.executeServiceRequest(currentRule.ruleStatements.executeService);
                                };
                                if (currentRule.ruleStatements.condition == "") {
                                    if (ruleObject.objectID == "button") {
                                        returnValue = true;
                                    } else if (currentRule.ruleStatements.true != "") {
                                        formHandlerRuleEngine.applyRuleActions(currentRule.ruleStatements.true);
                                    }
                                } else {
                                    if (formHandlerRuleEngine.evaluateConditionString(currentRule.ruleStatements.condition)) {
                                        if (ruleObject.objectID == "button") {
                                            if (currentRule.ruleStatements.true.indexOf("CONTINUE") != -1) {
                                                returnValue = true;
                                                formHandlerRuleEngine.applyRuleActions(currentRule.ruleStatements.true.substring(0, currentRule.ruleStatements.true.indexOf("CONTINUE")));
                                            } else {
                                                returnValue = false;
                                                formHandlerRuleEngine.applyRuleActions(currentRule.ruleStatements.true);
                                            }
                                        } else if (currentRule.ruleStatements.true != "") {
                                            formHandlerRuleEngine.applyRuleActions(currentRule.ruleStatements.true);
                                        }
                                    } else {
                                        if (ruleObject.objectID == "button") {
                                            if (currentRule.ruleStatements.false.indexOf("CONTINUE") != -1) {
                                                returnValue = true;
                                                formHandlerRuleEngine.applyRuleActions(currentRule.ruleStatements.false.substring(0, currentRule.ruleStatements.false.indexOf("CONTINUE")));
                                            } else {
                                                returnValue = false;
                                                formHandlerRuleEngine.applyRuleActions(currentRule.ruleStatements.false);
                                            }
                                        } else if (currentRule.ruleStatements.false != "") {
                                            formHandlerRuleEngine.applyRuleActions(currentRule.ruleStatements.false);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        return returnValue;
    },
    executeServiceRequest: function (serviceString) {
        var sourceVariable,
        inputXMLDocument,
        inputXMLString,
        childNodesCounter;
        sourceVariable = serviceString.substring((serviceString.indexOf("SET") + 3), serviceString.indexOf("=")).trim().substring(1);
        serviceString = serviceString.substring(serviceString.indexOf("EXECUTE_SERVICE"));
        inputXMLDocument = loadXMLString(serviceString.substring((serviceString.indexOf("[") + 1), serviceString.lastIndexOf("]")).trim());
        inputXMLString = "<inputparam>";
        for (childNodesCounter = 0; childNodesCounter < inputXMLDocument.childNodes[0].childNodes.length; childNodesCounter++) {
            inputXMLString += "<" + inputXMLDocument.childNodes[0].childNodes[childNodesCounter].tagName + ">";
            if (inputXMLDocument.childNodes[0].childNodes[childNodesCounter].childNodes[0] != undefined) {
                inputXMLString += form_handler.customRequirementHandler.getActualValue(inputXMLDocument.childNodes[0].childNodes[childNodesCounter].childNodes[0].nodeValue);
            };
            inputXMLString += "</" + inputXMLDocument.childNodes[0].childNodes[childNodesCounter].tagName + ">";
        };
        inputXMLString += "</inputparam>";
        eval(sourceVariable + " = ConvertXMLStringToJSONArray(executeService_retrieve_listof_values_for_searchcondition({p_inputparam_xml: inputXMLString}))");
    },
    getOperatorForCode: function (code) {
        var operator = code;
        if (code == "AND") {
            operator = "&&";
        } else if (code == "OR") {
            operator = "||";
        } else if (code == "EQ") {
            operator = "==";
        } else if (code == "NEQ") {
            operator = "!=";
        };
        return operator;
    },
    getRuleConfigurationObject: function (screenID, configString) {
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
        ruleObject,
        ruleStatementsString,
        ruleStatementsObject;
        currentScreenConfig = {
            screenID: screenID,
            object: []
        };
        while (true) {
            beginIndex = configString.indexOf("OBJECT_BEGIN");
            endIndex = configString.indexOf("OBJECT_END");
            if (endIndex != -1) {
                objectObject = {};
                objectString = configString.substring(beginIndex, endIndex + 10);
                configString = configString.substring(endIndex + 10);
                attributeString = objectString.substring(objectString.indexOf("[") + 1, objectString.indexOf("]"));
                grepReturn = $.grep(attributeString.split(","), function (element, index) {
                    return element.indexOf("NAME") != -1;
                });
                if (grepReturn.length != 0) {
                    objectObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                } else {
                    objectObject.name = "";
                };
                objectObject.event = [];
                while (true) {
                    beginIndex = objectString.indexOf("EVENT_BEGIN");
                    endIndex = objectString.indexOf("EVENT_END");
                    if (endIndex != -1) {
                        eventObject = {};
                        eventString = objectString.substring(beginIndex, endIndex + 9);
                        objectString = objectString.substring(endIndex + 9);
                        attributeString = eventString.substring(eventString.indexOf("[") + 1, eventString.indexOf("]"));
                        grepReturn = $.grep(attributeString.split(","), function (element, index) {
                            return element.indexOf("NAME") != -1;
                        });
                        if (grepReturn.length != 0) {
                            eventObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                        } else {
                            eventObject.name = "";
                        };
                        eventObject.field = [];
                        while (true) {
                            beginIndex = eventString.indexOf("FIELD_BEGIN");
                            endIndex = eventString.indexOf("FIELD_END");
                            if (endIndex != -1) {
                                fieldObject = {};
                                fieldString = eventString.substring(beginIndex, endIndex + 9);
                                eventString = eventString.substring(endIndex + 9);
                                attributeString = fieldString.substring(fieldString.indexOf("[") + 1, fieldString.indexOf("]"));
                                grepReturn = $.grep(attributeString.split(","), function (element, index) {
                                    return element.indexOf("NAME") != -1;
                                });
                                if (grepReturn.length != 0) {
                                    fieldObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                                } else {
                                    fieldObject.name = "";
                                };
                                fieldObject.rule = [];
                                while (true) {
                                    beginIndex = fieldString.indexOf("RULE_BEGIN");
                                    endIndex = fieldString.indexOf("RULE_END");
                                    if (endIndex != -1) {
                                        ruleObject = {};
                                        ruleString = fieldString.substring(beginIndex, endIndex + 8);
                                        fieldString = fieldString.substring(endIndex + 8);
                                        attributeString = ruleString.substring(ruleString.indexOf("[") + 1, ruleString.indexOf("]"));
                                        grepReturn = $.grep(attributeString.split(","), function (element, index) {
                                            return element.indexOf("NAME") != -1;
                                        });
                                        if (grepReturn.length != 0) {
                                            ruleObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                                        } else {
                                            ruleObject.name = "";
                                        };
                                        grepReturn = $.grep(attributeString.split(","), function (element, index) {
                                            return element.indexOf("ORDER") != -1;
                                        });
                                        if (grepReturn.length != 0) {
                                            ruleObject.order = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
                                        } else {
                                            ruleObject.order = "";
                                        };
                                        ruleStatementsString = ruleString.substring(ruleString.indexOf("]") + 1, ruleString.indexOf("RULE_END")).trim();
                                        ruleStatementsObject = {
                                            executeService: "",
                                            condition: "",
                                            true: "",
                                            false: ""
                                        };
                                        while (true) {
                                            if (ruleStatementsString != "") {
                                                if (ruleStatementsString.indexOf("SET") == 0) {
                                                    ruleStatementsObject.executeService = ruleStatementsString.substring(0, ruleStatementsString.indexOf("\n") + 1).trim();
                                                    ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.indexOf("\n") + 1).trim();
                                                } else if (ruleStatementsString.indexOf("APPLY") == 0) {
                                                    ruleStatementsObject.true = ruleStatementsString.substring(0, ruleStatementsString.length);
                                                    ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.length + 1).trim();
                                                } else if (ruleStatementsString.indexOf("IF") == 0) {
                                                    ruleStatementsObject.condition = ruleStatementsString.substring(0, ruleStatementsString.indexOf("\n") + 1).trim();
                                                    ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.indexOf("\n") + 1).trim();
                                                    ruleStatementsObject.true = ruleStatementsString.substring(ruleStatementsString.indexOf("BEGIN") + 5, ruleStatementsString.indexOf("END")).trim();
                                                    ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.indexOf("END") + 3).trim();
                                                    if (ruleStatementsString.indexOf("ELSE") == 0) {
                                                        ruleStatementsObject.false = ruleStatementsString.substring(ruleStatementsString.indexOf("BEGIN") + 5, ruleStatementsString.indexOf("END")).trim();
                                                        ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.indexOf("END") + 3).trim();
                                                    }
                                                }
                                            } else {
                                                break;
                                            }
                                        };
                                        ruleObject.ruleStatements = ruleStatementsObject;
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
        formHandlerRuleEngine.variable.ruleConfigurations.push(currentScreenConfig);
    },
    variable: {
        ruleConfigurations: []
    }
};
$.fn.extend({
    formHandlerApplyConfiguredRules: function () {
        var grepReturnValue,
        currentScreenID,
        ruleFileUrl;
        currentScreenID = "form_handler_" + form_handler.variable.template;
        if (currentScreenID != undefined) {
            grepReturnValue = $.grep(formHandlerRuleEngine.variable.ruleConfigurations, function (element, index) {
                return element.screenID == currentScreenID;
            })[0];
            if (grepReturnValue == undefined) {
                ruleFileUrl = mService.app.clientURL + "/www/configuration/rule/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/rule_form_handler_" + form_handler.variable.template + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".txt";
                $.ajax({
                    url: ruleFileUrl,
                    async: false,
                    cache: false
                }).done(function (data) {
                    formHandlerRuleEngine.getRuleConfigurationObject(currentScreenID, data);
                });
            };
            formHandlerRuleEngine.executeRuleStatements({
                screenID: currentScreenID,
                objectID: "screen",
                eventID: "load",
                fieldID: currentScreenID
            });
            return formHandlerRuleEngine.executeConfiguredRules(currentScreenID);
        }
    },
    formHandlerDisable: function () {
        if ($(this).attr("data-widget-type") == "mTextbox" || $(this).attr("data-widget-type") == "mTextarea") {
            $(this).attr("disabled", true).css({
                backgroundColor: "#F5F5F5"
            });
        } else if ($(this).attr("data-widget-type") == "mNumerictextbox") {
            $(this).data("kendoNumericTextBox").enable(false);
        } else if ($(this).attr("data-widget-type") == "mDropdownlist") {
            $(this).data("kendoDropDownList").enable(false);
        } else if ($(this).attr("data-widget-type") == "mCombobox" || $(this).attr("data-widget-type") == "mSearchpopup") {
            $(this).data("kendoComboBox").enable(false);
        } else if ($(this).attr("data-widget-type") == "mMultiselect") {
            $(this).data("kendoMultiSelect").enable(false);
        } else if ($(this).attr("data-widget-type") == "mDatebox") {
            $(this).data("kendoDatePicker").enable(false);
        } else if ($(this).attr("data-widget-type") == "mTimebox") {
            $(this).data("kendoTimePicker").enable(false);
        }
    },
    formHandlerEnable: function () {
        if ($(this).attr("data-widget-type") == "mTextbox" || $(this).attr("data-widget-type") == "mTextarea") {
            $(this).attr("disabled", false).css({
                backgroundColor: ""
            });
        } else if ($(this).attr("data-widget-type") == "mNumerictextbox") {
            $(this).data("kendoNumericTextBox").enable(true);
        } else if ($(this).attr("data-widget-type") == "mDropdownlist") {
            $(this).data("kendoDropDownList").enable(true);
        } else if ($(this).attr("data-widget-type") == "mCombobox" || $(this).attr("data-widget-type") == "mSearchpopup") {
            $(this).data("kendoComboBox").enable(true);
        } else if ($(this).attr("data-widget-type") == "mMultiselect") {
            $(this).data("kendoMultiSelect").enable(true);
        } else if ($(this).attr("data-widget-type") == "mDatebox") {
            $(this).data("kendoDatePicker").enable(true);
        } else if ($(this).attr("data-widget-type") == "mTimebox") {
            $(this).data("kendoTimePicker").enable(true);
        }
    },
    formHandlerGetVal: function () {
        var returnValue;
        if ($(this).attr("data-widget-type") == "mTextbox" || $(this).attr("data-widget-type") == "mSlider" || $(this).attr("data-widget-type") == "mGeotag") {
            returnValue = $(this).val();
        } else if ($(this).attr("data-widget-type") == "mNumerictextbox") {
            returnValue = "";
            if ($(this).data("kendoNumericTextBox").value() != null) {
                returnValue = $(this).data("kendoNumericTextBox").value();
            }
        } else if ($(this).attr("data-widget-type") == "mDropdownlist") {
            returnValue = "";
            if ($(this).data("kendoDropDownList").value() != "---Select---" && $(this).data("kendoDropDownList").value() != "ALL") {
                returnValue = $(this).data("kendoDropDownList").value();
            }
        } else if ($(this).attr("data-widget-type") == "mCombobox" || $(this).attr("data-widget-type") == "mSearchpopup") {
            returnValue = $(this).data("kendoComboBox").value();
        } else if ($(this).attr("data-widget-type") == "mMultiselect") {
            returnValue = $(this).data("kendoMultiSelect").value();
        } else if ($(this).attr("data-widget-type") == "mDatebox") {
            returnValue = "";
            if ($(this).data("kendoDatePicker").value() != null) {
                returnValue = $(this).data("kendoDatePicker").value();
            }
        } else if ($(this).attr("data-widget-type") == "mTimebox") {
            returnValue = "";
            if ($(this).data("kendoTimePicker").value() != null) {
                returnValue = $(this).data("kendoTimePicker").value();
            }
        } else if ($(this).attr("data-widget-type") == "mFlipswitch") {
            returnValue = "0";
            if ($(this).prop("checked")) {
                returnValue = "1";
            }
        } else if ($(this).attr("data-widget-type") == "mTextarea") {
            returnValue = $(this).val().replace(/\n/g, "\\n");
        };
        return returnValue;
    },
    formHandlerSetMax: function (value) {
        if ($(this).attr("data-widget-type") == "mDatebox") {
            if (typeof(value) == "object") {
                $(this).data("kendoDatePicker").max(new Date(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes() + 2));
            }
        } else if ($(this).attr("data-widget-type") == "mTimebox") {
            if (typeof(value) == "object") {
                $(this).data("kendoTimePicker").max(new Date(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes() + 2));
            }
        } else if ($(this).attr("data-widget-type") == "mNumerictextbox") {
            $(this).data("kendoNumericTextBox").max(value);
        }
    },
    formHandlerSetMin: function (value) {
        if ($(this).attr("data-widget-type") == "mDatebox") {
            if (typeof(value) == "object") {
                $(this).data("kendoDatePicker").min(value);
            }
        } else if ($(this).attr("data-widget-type") == "mTimebox") {
            if (typeof(value) == "object") {
                $(this).data("kendoTimePicker").min(value);
            }
        } else if ($(this).attr("data-widget-type") == "mNumerictextbox") {
            $(this).data("kendoNumericTextBox").min(value);
        }
    },
    formHandlerSetVal: function (value) {
        if (value != undefined) {
            if ($(this).attr("data-mloop-base") == "mLoop") {
                var mLoopObj = form_handler.variable.custom.mLoop[$(this).attr("id").replace("_group", "")];
                var scrID = (String(mLoopObj.scrID).includes("form_") == true ? ("form_handler") : (mLoopObj.scrID));
                if (mService.util.getActualValue("$" + scrID + "." + "variable.custom.draftInd") != true) {
                    for (var valueListIndex = 0; valueListIndex < value.length; valueListIndex++) {
                        var valueFieldsArray = Object.keys(value[valueListIndex]);
                        for (var valueIndex = 0; valueIndex < valueFieldsArray.length; valueIndex++) {
                            var currentActionFieldInMLoop = mLoopObj.scrID + "_" + valueFieldsArray[valueIndex];
                            var fieldValue = value[valueListIndex][valueFieldsArray[valueIndex]];
                            if (fieldValue != undefined && fieldValue != "") {
                                if (fieldValue.trim().indexOf("$") == 0) {
                                    $("#" + currentActionFieldInMLoop.trim() + "-" + valueListIndex).formHandlerSetVal(mService.util.getActualValue(fieldValue));
                                } else {
                                    var actualValue = "'" + fieldValue + "'";
                                    $("#" + currentActionFieldInMLoop.trim() + "-" + valueListIndex).formHandlerSetVal(mService.util.getActualValue(actualValue));
                                }
                            }
                        }
                        for (var valueIndex = 0; valueIndex < valueFieldsArray.length; valueIndex++) {
                            var currentActionFieldInMLoop = mLoopObj.scrID + "_" + valueFieldsArray[valueIndex];
                            form_handler.variable.custom.mLoopChangeFields.loopIndex[form_handler.variable.custom.mLoopChangeFields.mLoopParent[currentActionFieldInMLoop]] = valueListIndex;
                            ruleEngine.executeRuleStatements({
                                screenID: mLoopObj.scrID,
                                objectID: "field",
                                eventID: "change",
                                fieldID: currentActionFieldInMLoop
                            });
                        }
                    }
                }
            } else if ($(this).attr("data-widget-type") == "mTextbox" || $(this).attr("data-widget-type") == "mTextarea" || $(this).attr("data-widget-type") == "mGeotag") {
                $(this).val(value);
            } else if ($(this).attr("data-widget-type") == "mNumerictextbox") {
                $(this).data("kendoNumericTextBox").value(value);
                $(this).data("kendoNumericTextBox").trigger("change");
            } else if ($(this).attr("data-widget-type") == "mSlider") {
                $(this).data("kendoSlider").value(value);
                $(this).data("kendoSlider").trigger("change");
            } else if ($(this).attr("data-widget-type") == "mDropdownlist") {
                $(this).data("kendoDropDownList").value(value);
                $(this).data("kendoDropDownList").trigger("change");
            } else if ($(this).attr("data-widget-type") == "mCombobox" || $(this).attr("data-widget-type") == "mSearchpopup") {
                $(this).data("kendoComboBox").value(value);
                $(this).data("kendoComboBox").trigger("change");
            } else if ($(this).attr("data-widget-type") == "mMultiselect") {
                if ($.isArray(value)) {
                    $(this).data("kendoMultiSelect").value(value);
                } else {
                    $(this).data("kendoMultiSelect").value(value.split(","));
                };
                $(this).data("kendoMultiSelect").trigger("change");
            } else if ($(this).attr("data-widget-type") == "mDatebox") {
                if (typeof(value) == "object") {
                    $(this).data("kendoDatePicker").value(value);
                } else {
                    $(this).data("kendoDatePicker").value("");
                };
                $(this).data("kendoDatePicker").trigger("change");
            } else if ($(this).attr("data-widget-type") == "mTimebox") {
                if (typeof(value) == "object") {
                    $(this).data("kendoTimePicker").value(value);
                } else {
                    $(this).data("kendoTimePicker").value("");
                };
                $(this).data("kendoTimePicker").trigger("change");
            } else if ($(this).attr("data-widget-type") == "mFlipswitch") {
                if (value == "1") {
                    $(this).prop("checked", true);
                } else {
                    $(this).prop("checked", false);
                }
            } else if ($(this).prop("tagName") == "LABEL") {
                if ($(this).html().indexOf("</span>") != -1) {
                    $(this).html($(this).html().replace($(this).html().substring(0, $(this).html().lastIndexOf("<span")), value));
                } else {
                    $(this).html(value);
                }
            }
        }
    },
    formHandlerGetInputparamJSON: function (helperObject) {
        var conditionString,
        matchConditionCounter,
        inputparamFields,
        fieldCounter,
        fieldID,
        tagName,
        inputparamJSON;
        conditionString = "";
        inputparamJSON = "{";
        if ($.isArray(helperObject.matchCondition)) {
            conditionString = "(($(element).attr('id') != undefined) && (";
            for (matchConditionCounter = 0; matchConditionCounter < helperObject.matchCondition.length; matchConditionCounter++) {
                conditionString += "($(element).attr('id').indexOf('" + helperObject.matchCondition[matchConditionCounter] + "') != -1) || ";
            };
            conditionString = conditionString.substring(0, conditionString.length - 4);
            conditionString += "))";
        };
        if (conditionString == "") {
            conditionString = "$(element).attr('id') != undefined";
        };
        inputparamFields = $.grep($("#form_handler_content").find("[data-widget-type = 'mAttachment'], [data-widget-type = 'mCombobox'], [data-widget-type = 'mDatebox'], [data-widget-type = 'mDropdownlist'], [data-widget-type = 'mFlipswitch'], [data-widget-type = 'mMultiselect'], [data-widget-type = 'mNumerictextbox'], [data-widget-type = 'mSignaturepad'], [data-widget-type = 'mTextarea'], [data-widget-type = 'mTextbox'], [data-widget-type = 'mSlider'], [data-widget-type = 'mTimebox'], [data-widget-type = 'mSearchpopup'], [data-widget-type = 'mGeotag']"), function (element, index) {
            return eval(conditionString);
        });
        for (fieldCounter = 0; fieldCounter < inputparamFields.length; fieldCounter++) {
            fieldID = $(inputparamFields[fieldCounter]).attr("id");
            tagName = fieldID.substring(helperObject.screenID.length);
            if ($("#" + fieldID).attr("data-widget-type") == "mDatebox") {
                if ($("#" + fieldID).formHandlerGetVal() != "") {
                    inputparamJSON += '"' + tagName + '":"' + mService.util.getDateTimeString($("#" + fieldID).formHandlerGetVal(), "yyyy-MM-dd") + '",'
                } else {
                    inputparamJSON += '"' + tagName + '":"' + '' + '",'
                };
            } else if ($("#" + fieldID).attr("data-widget-type") == "mTimebox") {
                if ($("#" + fieldID).formHandlerGetVal() != "") {
                    inputparamJSON += '"' + tagName + '":"' + mService.util.getDateTimeString($("#" + fieldID).formHandlerGetVal(), "HH:mm tt") + '",'
                } else {
                    inputparamJSON += '"' + tagName + '":"' + '' + '",'
                };
            } else if ($("#" + fieldID).attr("data-widget-type") == "mMultiselect") {
                inputparamJSON += '"' + tagName + '":"' + mService.util.getXmlString($("#" + fieldID).formHandlerGetVal().join()) + '",'
            } else if ($("#" + fieldID).attr("data-widget-type") == "mNumerictextbox") {
                inputparamJSON += '"' + tagName + '":"' + $("#" + fieldID).formHandlerGetVal().toString() + '",'
            } else {
                inputparamJSON += '"' + tagName + '":"' + mService.util.getXmlString($("#" + fieldID).formHandlerGetVal()) + '",'
            }
        };
        inputparamJSON += "}";
        return inputparamJSON.replace(",}", "}");
    }
});
$(document).undelegate("[data-widget-type = 'mLink']", "click");
$(document).delegate("[data-widget-type = 'mLink']", "click", function (evt) {
    var mLink = $(this),
    lblList,
    index,
    lblID;
    if (mLink.attr("data-link-group") == "loop") {
        var pageCollection = [],
        loopIndex;
        if (mLink.attr("data-link-role") == "repeat") {
            pageCollection = $.grep(form_handler.variable.custom.uiConfig.page[parseInt($("#form_handler_active_page").text()) - 1].field, function (e, i) {
                return e.id == mLink.attr("data-widget-for").substring(0, mLink.attr("data-widget-for").lastIndexOf("-")).replace("form_handler" + "_" + form_handler.variable.template + "_", "");
            });
            if (pageCollection.length != 0) {
                loopIndex = parseInt(mLink.attr("data-widget-for").substring(mLink.attr("data-widget-for").lastIndexOf("-") + 1)) + 1;
                form_handler.customRequirementHandler.createField({
                    scrID: "form_handler_" + form_handler.variable.template,
                    parent: "",
                    loop: "",
                    fields: pageCollection,
                    loopIndex: loopIndex,
                    root: mLink.attr("data-widget-for").substring(0, mLink.attr("data-widget-for").lastIndexOf("-")) + "_group"
                });
                form_handler.customRequirementHandler.initializeField({
                    scrID: "form_handler_" + form_handler.variable.template,
                    parent: "",
                    loop: pageCollection[0].id,
                    fields: pageCollection[0].field,
                    loopIndex: parseInt(mLink.attr("data-widget-for").substring(mLink.attr("data-widget-for").lastIndexOf("-") + 1)) + 1,
                    root: pageCollection[0].baseWidgetId + "-" + loopIndex
                });
                lblList = $($("#" + mLink.attr("data-widget-for").substring(0, mLink.attr("data-widget-for").lastIndexOf("-")) + "_group").children()[parseInt(mLink.attr("data-widget-for").substring(mLink.attr("data-widget-for").lastIndexOf("-") + 1)) + 1]).find("[data-widget-type = 'mLabel']");
                for (index = 0; index < lblList.length; index++) {
                    lblID = $(lblList[index]).attr("id");
                    lblID = lblID.substring(0, lblID.length - 4);
                    if ($("#" + lblID).attr("data-widget-type") == "mLoop") {
                        lblID = lblID.replace("form_handler_" + form_handler.variable.template + "_", "");
                        lblID = lblID.substring(0, lblID.lastIndexOf("-"));
                        $(lblList[index]).prepend(form_handler.variable.custom.labelConfig.field[lblID] + "-" + (parseInt(mLink.attr("data-widget-for").substring(mLink.attr("data-widget-for").lastIndexOf("-") + 1)) + 2));
                    } else {
                        lblID = lblID.replace("form_handler_" + form_handler.variable.template + "_", "");
                        lblID = lblID.substring(0, lblID.lastIndexOf("-"));
                        $(lblList[index]).prepend(form_handler.variable.custom.labelConfig.field[lblID]);
                    }
                };
                $("#form_handler").trigger("create");
                if (pageCollection[0].ruleApplyToNew != undefined && pageCollection[0].ruleApplyToNew == "true") {
                    form_handler.variable.custom.mLoopChangeFields.loopIndex["form_handler_" + form_handler.variable.template + "_" + pageCollection[0].id] = loopIndex;
                };
                formHandlerRuleEngine.executeRuleStatements({
                    screenID: "form_handler_" + form_handler.variable.template,
                    objectID: "field",
                    eventID: "change",
                    fieldID: "form_handler_" + form_handler.variable.template + "_" + pageCollection[0].id
                });
                $("#" + "form_handler_" + form_handler.variable.template + "_" + pageCollection[0].id + "-" + parseInt(loopIndex - 1) + "_trash").remove();
                if (!(pageCollection[0].deletionInd != undefined && pageCollection[0].deletionInd == "false")) {
                    $("#" + "form_handler_" + form_handler.variable.template + "_" + pageCollection[0].id + "-" + parseInt(loopIndex) + "_trash_container").append("<span id = '" + "form_handler_" + form_handler.variable.template + "_" + pageCollection[0].id + "-" + loopIndex + "_trash' data-widget-type = 'mLink' data-link-group = 'loop' data-link-role = 'trash' data-group-id='" + "form_handler_" + form_handler.variable.template + "_" + pageCollection[0].id + "' loopIndex ='" + loopIndex + "' class='k-icon k-i-delete' style='float: right; font-size: 140%; padding-right: 2%;'></span>");
                }
                $("#" + "form_handler_" + form_handler.variable.template + "_" + pageCollection[0].id + "-" + parseInt(loopIndex - 1) + "_btn_div").hide();
                $("#" + "form_handler_" + form_handler.variable.template + "_" + pageCollection[0].id + "-" + parseInt(loopIndex)).parent().show();
            }
        } else if (mLink.attr("data-link-role") == "trash") {
            var loopIndex = parseInt(mLink.attr("loopIndex")) - 1;
            $("#" + mLink.attr("data-group-id") + "-" + mLink.attr("loopIndex") + "_subgroup").parent().remove();
            $("#" + mLink.attr("data-group-id") + "-" + loopIndex + "_btn_div").show();
            if (loopIndex != 0) {
                $("#" + mLink.attr("data-group-id") + "-" + loopIndex + "_trash_container").append("<span id = '" + mLink.attr("data-group-id") + "-" + loopIndex + "_trash" + "' data-group-id='" + mLink.attr("data-group-id") + "' loopIndex ='" + loopIndex + "' data-widget-type = 'mLink' data-link-group = 'loop' data-link-role = 'trash' class='k-icon k-i-delete' style='float: right; font-size: 140%; padding-right: 2%;'></span>");
            }
            evt.stopPropagation();
        }
    }
    form_handler.customRequirementHandler.applyStyling();
});
Object.preventExtensions(formHandlerRuleEngine);