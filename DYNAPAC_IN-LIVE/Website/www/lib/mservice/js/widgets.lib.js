mService.widgets = {
    datasourceFilter: {
        msCheckboxgroup: function (id, filterObj) {
            var dataSource,
            inputObj = {};
            try {
                inputObj = mService.widgets.init.util.getWidgetProperties(id);
                dataSource = mService.widgets.init.util.getDataSource(inputObj.datasrc);
                dataSource.filter({});
                dataSource.filter(filterObj);
                $("#" + id + "_wrap").html("");
                mService.widgets.init.util.createCheckBoxGroup(inputObj, dataSource.view());
                $('input[name="' + inputObj.id + '_input"]').on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCombobox: function (id, filterObj) {
            var combobox;
            try {
                combobox = $("#" + id).data("kendoComboBox");
                combobox.dataSource.filter({});
                combobox.dataSource.filter(filterObj);
                combobox.listView.setDSFilter(combobox.dataSource.filter());
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (id, filterObj) {
            var dropdownlist;
            try {
                dropdownlist = $("#" + id).data("kendoDropDownList");
                dropdownlist.dataSource.filter({});
                dropdownlist.dataSource.filter(filterObj);
                dropdownlist.listView.setDSFilter(dropdownlist.dataSource.filter());
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMobileNumber: function (id, filterObj) {
            var dataSource;
            try {
                mService.widgets.variable.msMobileNumber.filter[id] = filterObj;
                dataSource = mService.dSource.cache["country_codes"];
                if (dataSource !== undefined) {
                    dataSource.filter({});
                    dataSource.filter(filterObj);
                    mService.widgets.variable.msMobileNumber.dataSrc[id] = {};
                    mService.widgets.variable.msMobileNumber.dataSrc[id] = new kendo.data.DataSource({
                        data: JSON.parse(JSON.stringify(dataSource.view())),
                    });
                    mService.widgets.variable.msMobileNumber.dataSrc[id].read();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (id, filterObj) {
            var multiselect;
            try {
                multiselect = $("#" + id).data("kendoMultiSelect");
                multiselect.dataSource.filter({});
                multiselect.dataSource.filter(filterObj);
                multiselect.listView.setDSFilter(multiselect.dataSource.filter());
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRadiogroup: function (id, filterObj) {
            var dataSource,
            inputObj = {};
            try {
                inputObj = mService.widgets.init.util.getWidgetProperties(id);
                dataSource = mService.widgets.init.util.getDataSource(inputObj.datasrc);
                dataSource.filter({});
                dataSource.filter(filterObj);
                $("#" + id + "_wrap").html("");
                mService.widgets.init.util.createRadiogroup(inputObj, dataSource.view());
                $('input[name="' + inputObj.id + '_input"]').on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    disable: {
        msAttachment: function (id) {
            var attachments,
            msLoopInd,
            uid,
            disableEle;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                attachments = $("#" + id + "_src [data-ms-widget-source]");
                for (index = 0; index < attachments.length; index++) {
                    $(attachments[index]).attr("data-ms-widget-disabled", "true");
                };
                $("#" + id + "_attachment_add" + uid).prop("disabled", true);
                disableEle = $("#" + id + "_group" + uid).find(".ms_attachment_add_container");
                if (disableEle !== undefined) {
                    $(disableEle).addClass("ms_attachment_disable").removeClass("ms_attachment_hover");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msBarcode: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_add" + uid).prop("disabled", true).addClass("ms_widget_disable");
                $("#" + id + "_barcode_delete" + uid).prop("disabled", true).addClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msButton: function (id) {
            try {
                $("#" + id).prop("disabled", true).addClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCamera: function (id) {
            var imgTiles,
            msLoopInd,
            uid,
            disableEle;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                imgTiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                for (index = 0; index < imgTiles.length; index++) {
                    $(imgTiles[index]).attr("data-ms-widget-disabled", "true");
                };
                $("#" + id + uid).attr("data-ms-widget-disabled", true);
                $("#" + id + "_add" + uid).prop("disabled", true);
                disableEle = $("#" + id + "_group" + uid).find(".ms_camera_img_container");
                if (disableEle !== undefined) {
                    $(disableEle).addClass("ms_camera_disable").removeClass("ms_camera_hover");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckbox: function (id) {
            try {
                $("#" + id).prop("disabled", true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckboxgroup: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_wrap" + uid + " input[type='checkbox']").prop("disabled", true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCombobox: function (id) {
            try {
                $("#" + id).data("kendoComboBox").enable(false);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDatebox: function (id) {
            var disableEle,
            msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).data("kendoDatePicker").enable(false);
                disableEle = $("#" + id + "_group" + uid).find(".k-state-disabled");
                if (disableEle !== undefined) {
                    $(disableEle).addClass("ms_datebox_disable");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDisplaybox: function (id) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (id) {
            var disableEle,
            msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).data("kendoDropDownList").enable(false);
                disableEle = $("#" + id + "_group" + uid).find(".k-state-disabled");
                if (disableEle !== undefined) {
                    $(disableEle).addClass("ms_dropdownlist_disable");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGallery: function (id) {
            var imgTiles,
            msLoopInd,
            uid,
            disableEle;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                imgTiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                for (index = 0; index < imgTiles.length; index++) {
                    $(imgTiles[index]).attr("data-ms-widget-disabled", "true");
                };
                $("#" + id + uid).attr("data-ms-widget-disabled", true);
                $("#" + id + "_add" + uid).prop("disabled", true);
                disableEle = $("#" + id + "_group" + uid).find(".ms_gallery_img_container");
                if (disableEle !== undefined) {
                    $(disableEle).addClass("ms_attachment_disable").removeClass("ms_attachment_hover");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGeotag: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_add" + uid).prop("disabled", true).addClass("ms_widget_disable");
                $("#" + id + "_geotag_delete" + uid).prop("disabled", true).addClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImagepicker: function (id) {
            var imgTiles,
            msLoopInd,
            uid,
            galleryEle,
            cameraEle;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                imgTiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                for (index = 0; index < imgTiles.length; index++) {
                    $(imgTiles[index]).attr("data-ms-widget-disabled", "true");
                };
                $("#" + id + uid).attr("data-ms-widget-disabled", true);
                $("#" + id + "_add_camera" + uid).prop("disabled", true);
                $("#" + id + "_add_gallery" + uid).prop("disabled", true);
                galleryEle = $("#" + id + "_group" + uid).find(".ms_imagepicker_img_container");
                if (galleryEle !== undefined) {
                    $(galleryEle).addClass("ms_imagepicker_disable").removeClass("ms_imagepicker_hover");
                };
                cameraEle = $("#" + id + "_group" + uid).find(".ms_imagepicker_img_container");
                if (cameraEle !== undefined) {
                    $(cameraEle).addClass("ms_imagepicker_disable").removeClass("ms_imagepicker_hover");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msFlipswitch: function (id) {
            try {
                $("#" + id).data("kendoSwitch").enable(false);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msLoop: function (id) {
            var fields,
            blockIndex;
            try {
                fields = $("#" + id + "_content").find(mService.widgets.init.wSelector);
                for (blockIndex = 0; blockIndex < fields.length; blockIndex++) {
                    $(fields[blockIndex]).disable();
                };
                $("#" + id + "_add").prop("disabled", true).addClass("ms_widget_disable");
                $("#" + id + "_delete").prop("disabled", true).addClass("ms_widget_disable");
                $("#" + id + "_create").prop("disabled", true).addClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMlingualtextarea: function (id) {
            try {
                $("#" + id).prop("readonly", true);
                $("#" + id + "_default_locale").prop("readonly", true);
                $("#" + id + "_action_bar_default_locale").hide();
                $("#" + id + "_action_bar_user_locale").hide();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMobileNumber: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).attr("disabled", "disabled");
                $("#" + id + "_country_code" + uid).attr("disabled", "disabled");
                $("#" + id + "_mobile_number_container" + uid).addClass("ms_mobile_number_no_disable");
                $("#" + id + "_country_code_container" + uid).addClass("ms_mobile_number_country_code_disable");
                $("#" + id + "_country_code_bottom_sheet" + uid).removeAttr("data-ms-widget-type").removeAttr("data-ms-widget-group").removeAttr("data-ms-widget-role").addClass("ms_mobile_number_country_code_icon_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (id) {
            var disableEle,
            msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).data("kendoMultiSelect").enable(false);
                disableEle = $("#" + id + "_group" + uid).find(".k-multiselect-wrap");
                if (disableEle !== undefined) {
                    $(disableEle).addClass("ms_multiselect_disable");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msNumerictextbox: function (id) {
            var disableEle,
            msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).data("kendoNumericTextBox").enable(false);
                disableEle = $("#" + id + "_group" + uid).find(".k-state-disabled");
                if (disableEle !== undefined) {
                    $(disableEle).addClass("ms_numerictextbox_disable");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msParentgroup: function (id) {
            var fields,
            fieldsIndex,
            panelBar;
            try {
                fields = $("#" + id + "_content").find(mService.widgets.init.wSelector);
                for (fieldsIndex = 0; fieldsIndex < fields.length; fieldsIndex++) {
                    $(fields[fieldsIndex]).disable();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msQrcode: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_add" + uid).prop("disabled", true).addClass("ms_widget_disable");
                $("#" + id + "_qrcode_delete" + uid).prop("disabled", true).addClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRadiogroup: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_wrap" + uid + " input[type='radio']").prop("disabled", true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRating: function (id) {
            try {
                $("#" + id).data("kendoRating").enable(false);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSearchpopup: function (id) {
            try {
                $("#" + id).prop("readonly", true);
                $("#" + id + "_btn").prop("disabled", true);
                $("#" + id + "_group").addClass("ms_widget_disable");
                $("#" + id + "_clear_btn").hide();
                $("#" + id + "_group" + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSignaturepad: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_signature_source" + uid).removeAttr("data-ms-widget-type").removeAttr("data-ms-widget-group").removeAttr("data-ms-widget-role").addClass("ms_Signaturepad_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSlider: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).data("kendoSlider").enable(false);
                $("#" + id + uid).addClass("ms_slider_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextarea: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_disabled_area" + uid).text($("#" + id + uid).getVal());
                $("#" + id + uid).hide();
                $("#" + id + "_disabled_area" + uid).show();
                $("#" + id + "_disabled_area" + uid).addClass("ms_textarea_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextbox: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_disabled_area" + uid).text($("#" + id + uid).getVal());
                $("#" + id + uid).hide();
                $("#" + id + "_disabled_area" + uid).show();
                $("#" + id + "_disabled_area" + uid).addClass("ms_textbox_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimebox: function (id) {
            var disableEle,
            msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).data("kendoTimePicker").enable(false);
                disableEle = $("#" + id + "_group" + uid).find(".k-state-disabled");
                if (disableEle !== undefined) {
                    $(disableEle).addClass("ms_datebox_disable");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimelogger: function (id) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msVoice: function (id) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    enable: {
        msAttachment: function (id) {
            var attachments,
            index,
            disableEle;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                attachments = $("#" + id + "_src [data-ms-widget-source]");
                for (index = 0; index < attachments.length; index++) {
                    $(attachments[index]).attr("data-ms-widget-disabled", "false");
                };
                $("#" + id + "_attachment_add").prop("disabled", false);
                disableEle = $("#" + id + "_group" + uid).find(".ms_attachment_add_container");
                if (disableEle !== undefined) {
                    $(disableEle).removeClass("ms_attachment_disable").addClass("ms_attachment_hover");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msBarcode: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_add" + uid).prop("disabled", false).removeClass("ms_widget_disable");
                $("#" + id + "_barcode_delete" + uid).prop("disabled", false).removeClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msButton: function (id) {
            try {
                $("#" + id).prop("disabled", false).removeClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCamera: function (id) {
            var imgTiles,
            disableEle,
            uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                imgTiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                for (index = 0; index < imgTiles.length; index++) {
                    $(imgTiles[index]).attr("data-ms-widget-disabled", "false");
                };
                $("#" + id + uid).attr("data-ms-widget-disabled", false);
                $("#" + id + "_add" + uid).prop("disabled", false);
                disableEle = $("#" + id + "_group" + uid).find(".ms_camera_img_container");
                if (disableEle !== undefined) {
                    $(disableEle).removeClass("ms_camera_disable").addClass("ms_camera_hover");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckbox: function (id) {
            try {
                $("#" + id).prop("disabled", false);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckboxgroup: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_wrap" + uid + " input[type='checkbox']").prop("disabled", false);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCombobox: function (id) {
            try {
                $("#" + id).data("kendoComboBox").enable(true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDatebox: function (id) {
            var disableEle,
            uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                disableEle = $("#" + id + "_group" + uid).find(".k-state-disabled");
                if (disableEle !== undefined) {
                    $(disableEle).removeClass("ms_datebox_disable");
                };
                $("#" + id + uid).data("kendoDatePicker").enable(true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDisplaybox: function (id) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (id) {
            var disableEle,
            uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                disableEle = $("#" + id + "_group" + uid).find(".ms_dropdownlist_disable");
                if (disableEle !== undefined) {
                    $(disableEle).removeClass("ms_dropdownlist_disable");
                };
                $("#" + id + uid).data("kendoDropDownList").enable(true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGallery: function (id) {
            var imgTiles,
            disableEle,
            uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                imgTiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                for (index = 0; index < imgTiles.length; index++) {
                    $(imgTiles[index]).attr("data-ms-widget-disabled", "false");
                };
                $("#" + id + uid).attr("data-ms-widget-disabled", false);
                $("#" + id + "_add" + uid).prop("disabled", false);
                disableEle = $("#" + id + "_group" + uid).find(".ms_gallery_img_container");
                if (disableEle !== undefined) {
                    $(disableEle).removeClass("ms_gallery_disable").addClass("ms_gallery_hover");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGeotag: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_add" + uid).prop("disabled", false).addClass("ms_widget_disable");
                $("#" + id + "_geotag_delete" + uid).prop("disabled", false).addClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImagepicker: function (id) {
            var imgTiles,
            galleryEle,
            cameraEle,
            uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                imgTiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                for (index = 0; index < imgTiles.length; index++) {
                    $(imgTiles[index]).attr("data-ms-widget-disabled", "false");
                };
                $("#" + id + uid).attr("data-ms-widget-disabled", false);
                $("#" + id + "_add_camera" + uid).prop("disabled", false);
                $("#" + id + "_add_gallery" + uid).prop("disabled", false);
                galleryEle = $("#" + id + "_group" + uid).find(".ms_imagepicker_img_container");
                if (galleryEle !== undefined) {
                    $(galleryEle).removeClass("ms_imagepicker_disable").addClass("ms_imagepicker_hover");
                };
                cameraEle = $("#" + id + "_group" + uid).find(".ms_imagepicker_img_container");
                if (cameraEle !== undefined) {
                    $(cameraEle).removeClass("ms_imagepicker_disable").addClass("ms_imagepicker_hover");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msFlipswitch: function (id) {
            try {
                $("#" + id).data("kendoSwitch").enable(true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msLoop: function (id) {
            var fields,
            blockIndex;
            try {
                fields = $("#" + id + "_content").find(mService.widgets.init.wSelector);
                for (blockIndex = 0; blockIndex < fields.length; blockIndex++) {
                    $(fields[blockIndex]).enable();
                };
                $("#" + id + "_add").prop("disabled", false).removeClass("ms_widget_disable");
                $("#" + id + "_delete").prop("disabled", false).removeClass("ms_widget_disable");
                $("#" + id + "_create").prop("disabled", false).removeClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMlingualtextarea: function (id) {
            try {
                $("#" + id).prop("readonly", false);
                $("#" + id + "_default_locale").prop("readonly", false);
                $("#" + id + "_action_bar_default_locale").show();
                $("#" + id + "_action_bar_user_locale").show();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMobileNumber: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).removeAttr("disabled");
                $("#" + id + "_country_code" + uid).removeAttr("disabled");
                $("#" + id + "_mobile_number_container" + uid).removeClass("ms_mobile_number_no_disable");
                $("#" + id + "_country_code_container" + uid).removeClass("ms_mobile_number_country_code_disable");
                $("#" + id + "_country_code_bottom_sheet" + uid).attr("data-ms-widget-type", "msWidget").attr("data-ms-widget-group", "msMobileNumber").attr("data-ms-widget-role", "bottomSheet").removeClass("ms_mobile_number_country_code_icon_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (id) {
            var disableEle,
            uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                disableEle = $("#" + id + "_group" + uid).find(".k-multiselect-wrap");
                if (disableEle !== undefined) {
                    $(disableEle).removeClass("ms_multiselect_disable");
                };
                $("#" + id + uid).data("kendoMultiSelect").enable(true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msNumerictextbox: function (id) {
            var disableEle,
            uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                disableEle = $("#" + id + "_group" + uid).find(".k-state-disabled");
                if (disableEle !== undefined) {
                    $(disableEle).removeClass("ms_numerictextbox_disable");
                };
                $("#" + id + uid).data("kendoNumericTextBox").enable(true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msParentgroup: function (id) {
            var fields,
            fieldsIndex,
            panelBar;
            try {
                fields = $("#" + id + "_content").find(mService.widgets.init.wSelector);
                for (fieldsIndex = 0; fieldsIndex < fields.length; fieldsIndex++) {
                    $(fields[fieldsIndex]).enable();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msQrcode: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_add" + uid).prop("disabled", false).removeClass("ms_widget_disable");
                $("#" + id + "_qrcode_delete" + uid).prop("disabled", false).removeClass("ms_widget_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRadiogroup: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_wrap" + uid + " input[type='radio']").prop("disabled", false);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRating: function (id) {
            try {
                $("#" + id).data("kendoRating").enable(true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSearchpopup: function (id) {
            var widgetVal;
            try {
                $("#" + id).prop("readonly", false);
                $("#" + id + "_btn").prop("disabled", false);
                $("#" + id + "_group").removeClass("ms_widget_disable");
                widgetVal = $("#" + id).getVal();
                if (widgetVal !== "") {
                    $("#" + id + "_clear_btn").show();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSignaturepad: function (id) {
            var uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + "_signature_source" + uid).attr("data-ms-widget-type", "msWidget").attr("data-ms-widget-group", "msSignaturepad").attr("data-ms-widget-role", "source").removeClass("ms_Signaturepad_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSlider: function (id) {
            var uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).data("kendoSlider").enable(true);
                $("#" + id + uid).removeClass("ms_slider_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextarea: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).show();
                $("#" + id + "_disabled_area" + uid).hide();
                $("#" + id + "_disabled_area" + uid).removeClass("ms_textarea_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextbox: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                $("#" + id + uid).show();
                $("#" + id + "_disabled_area" + uid).hide();
                $("#" + id + "_disabled_area" + uid).removeClass("ms_textbox_disable");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimebox: function (id) {
            var disableEle,
            uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                disableEle = $("#" + id + "_group" + uid).find(".k-state-disabled");
                if (disableEle !== undefined) {
                    $(disableEle).removeClass("ms_datebox_disable");
                };
                $("#" + id + uid).data("kendoTimePicker").enable(true);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimelogger: function (id) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msVoice: function (id) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    event: {
        change: function (scrID, id, event, uidValue) {
            var scrObj,
            uid,
            widgetType,
            loopUid,
            controllerObj,
            patternScrID,
            msLoopInd;
            try {
                if (scrID !== "pre_signup_messages") {
                    if (event !== undefined && event.sender !== undefined && event.sender.element !== undefined && event.target !== undefined && event.target.id !== undefined && ($(event.sender.element).attr("data-ms-widget-msloop") !== undefined || $(event.sender.element).attr("data-ms-widget-msloop") !== "" || $("#" + event.target.id).attr("data-ms-widget-msloop") !== undefined || $("#" + event.target.id).attr("data-ms-widget-msloop") !== "")) {
                        if (event !== undefined) {
                            if (event.target !== undefined) {
                                if ($("#" + event.target.id).attr("data-ms-widget-msloop") !== undefined || $("#" + event.target.id).attr("data-ms-widget-msloop") !== "") {
                                    uid = $("#" + event.target.id).attr("data-ms-widget-uid");
                                }
                            } else {
                                if (event.sender !== undefined && event.sender.element !== undefined) {
                                    if ($(event.sender.element).attr("data-ms-widget-msloop") !== undefined || $(event.sender.element).attr("data-ms-widget-msloop") !== "") {
                                        uid = $(event.sender.element).attr("data-ms-widget-uid");
                                    }
                                }
                            }
                        }
                    } else {
                        msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                        if (msLoopInd !== undefined && msLoopInd !== "") {
                            uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                            id = uid === "" ? id : id.replace("_" + uid, "");
                            uid = uid === "" ? uid : "_" + uid;
                        };
                    }
                    loopUid = ((uid === undefined) || uid === "") ? ("") : ("_" + uid.trim());
                    mService.widgets.init.util.parentChildRelation.apply(scrID, id, loopUid);
                    if (mService.app.channel === "web") {
                        scrObj = {};
                    } else {
                        if (mService.util.isContainRScreen(scrID)) {
                            if (scrID !== "my_settings" && scrID !== "my_permission" && scrID !== "my_profile") {
                                scrObj = mService.containR;
                                controllerObj = mService.config.controller.getControllerObj(scrID);
                                if (controllerObj !== undefined && controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                                    patternScrID = scrID.replace("_list", "");
                                } else {
                                    patternScrID = scrID;
                                };
                                widgetType = $("#" + id).attr("data-ms-widget-type");
                                if (widgetType !== undefined) {
                                    if (widgetType !== "msSubpage") {
                                        scrObj.variable[patternScrID].valueChangeIndicator = true;
                                    }
                                } else {
                                    scrObj.variable[patternScrID].valueChangeIndicator = true;
                                }
                            } else {
                                if (scrID === "my_settings") {
                                    scrObj = mService.settings;
                                } else if (scrID === "my_permission") {
                                    scrObj = mService.settings.permission;
                                } else if (scrID === "my_profile") {
                                    scrObj = mService.settings.profile;
                                };
                            }
                        } else {
                            scrObj = eval(scrID);
                        }
                    };
                    scrObj.msPageValueChanged = true;
                    if (scrObj.widget !== undefined && scrObj.widget.change !== undefined && scrObj.widget.change[id.replace(scrID + "_", "")] !== undefined) {
                        scrObj.widget.change[id.replace(scrID + "_", "")](event);
                    };
                    if ($("#" + id).attr("data-ms-widget-type") !== undefined && $("#" + id).attr("data-ms-widget-type") !== "msTimebox") {
                        $("#" + id + loopUid).blur();
                    };
                    if (uidValue !== undefined && (uid === undefined || uid === "")) {
                        uid = uidValue.replace("_", "");
                    };
                    mService.config.rule.executeRuleStatements({
                        screenID: scrID,
                        objectID: "field",
                        eventID: "change",
                        fieldID: id,
                        uid: uid !== undefined ? uid.trim() : uid,
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msAttachment: {
            add: function (ele, evt) {
                var id,
                fileSizeKey,
                fileExtensionKey,
                attachmentPath,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    if ($("#" + id + uid).attr("data-ms-process-in-action") === undefined || $("#" + id + uid).attr("data-ms-process-in-action") === "false") {
                        $("#" + id + uid).attr("data-ms-process-in-action", "true");
                        setTimeout(function () {
                            try {
                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 1000);
                        fileSizeKey = $("#" + id + uid).attr("data-ms-widget-filesizekey");
                        fileExtensionKey = $("#" + id + uid).attr("data-ms-widget-fileextensionkey");
                        if (mService.app.channel === "web") {
                            maxLimitReached = false;
                            if ($("#" + id + uid).attr("data-ms-widget-maxlimit") !== "") {
                                if (parseInt($("#" + id + uid).attr("data-ms-count")) < parseInt($("#" + id + uid).attr("data-ms-widget-maxlimit"))) {
                                    maxLimitReached = false;
                                } else {
                                    maxLimitReached = true;
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "web_gallery_max_limit",
                                        lblgrpid: "error",
                                    });
                                }
                            } else {
                                maxLimitReached = false;
                            };
                            if (!maxLimitReached) {
                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                $("#" + id + "_file_picker").click();
                            } else {
                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                            }
                        } else {
                            attachmentPath = mService.containR.variable[mService.app.getScreenId()].formPath === undefined ? "" : mService.containR.variable[mService.app.getScreenId()].formPath;
                            if (attachmentPath !== "") {
                                attachmentPath = mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + attachmentPath + "/" + mService.containR.variable[mService.app.getScreenId()].transNo;
                            };
                            if ($("#" + id + uid).attr("data-ms-widget-maxlimit") !== "") {
                                if (parseInt($("#" + id + uid).attr("data-ms-count")) < parseInt($("#" + id + uid).attr("data-ms-widget-maxlimit"))) {
                                    window.minterface("FileChooser", [{
                                                destinationPath: "",
                                            }, ], function (src) {
                                        try {
                                            mService.spinner.show();
                                            $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                            mService.util.validateFile(src, fileSizeKey, fileExtensionKey, function (fileData) {
                                                try {
                                                    mService.spinner.hide();
                                                    mService.widgets.init.util.msAttachment.loadFile(id, fileData, uid.replace("_", ""));
                                                    mService.widgets.event.change(mService.app.getScreenId(), id, evt);
                                                    $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    mService.spinner.hide();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function (errorMsg) {
                                        try {
                                            $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                            mService.app.showToast("msAttachment_file_failure", "system_messages");
                                            mService.exception.handle(errorMsg);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                    mService.app.showToast("msAttachment_max_limit", "system_messages");
                                }
                            } else {
                                window.minterface("FileChooser", [{
                                            destinationPath: "",
                                        }, ], function (src) {
                                    try {
                                        $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                        mService.spinner.show();
                                        mService.util.validateFile(src, fileSizeKey, fileExtensionKey, function (fileData) {
                                            try {
                                                mService.spinner.hide();
                                                mService.widgets.init.util.msAttachment.loadFile(id, fileData, uid.replace("_", ""));
                                                mService.widgets.event.change(mService.app.getScreenId(), id, evt);
                                                $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                                mService.spinner.hide();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function (errorMsg) {
                                    try {
                                        $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                        mService.app.showToast("msAttachment_file_failure", "system_messages");
                                        mService.exception.handle(errorMsg);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            }
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            delete : function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + ele.attr("for") + "_delete" + uid).hide();
                    $("#" + ele.attr("for") + "_delete_confirmation" + uid).show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteCancel: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).parent().attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + ele.attr("for") + "_delete" + uid).show();
                    $("#" + ele.attr("for") + "_delete_confirmation" + uid).hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteConfirm: function (ele, evt) {
                var attachmentID,
                uid;
                try {
                    uid = ele.attr("data-ms-widget-uid");
                    uid = uid === "" ? uid : "_" + uid;
                    attachmentID = $("#" + ele.attr("for") + "_attachment_content").attr("data-ms-widget-parentid");
                    $("#" + ele.attr("for") + "_preview_popup").data("kendoWindow").close();
                    $("#" + attachmentID).parent().remove();
                    $("#" + ele.attr("for") + uid).attr("data-ms-count", parseInt($("#" + ele.attr("for") + uid).attr("data-ms-count")) - 1);
                    mService.widgets.event.change(mService.app.getScreenId(), ele.attr("for"), evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            previewPopup: function (ele) {
                var widgetID,
                id,
                path,
                name,
                type,
                base64String,
                uid;
                try {
                    widgetID = ele.attr("for");
                    id = ele.attr("id");
                    uid = mService.widgets.init.util.getUID(widgetID, id, ele);
                    path = $("#" + id).attr("data-ms-attachment-path");
                    name = $("#" + id).attr("data-ms-attachment-name");
                    type = $("#" + id).attr("data-ms-attachment-type");
                    base64String = $("#" + id).attr("data-ms-attachment-thumbnail");
                    if (type === "I" || type === "A" || type === "V" || (type === "P" && mService.app.channel === "web")) {
                        $("#" + widgetID + "_preview_popup").kendoWindow({
                            width: screen.width * 0.9,
                            maxHeight: screen.height * 0.8,
                            minHeight: screen.height / 3,
                            title: {
                                text: "<span id='" + widgetID + "_preview_popup_title" + "' data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='camera_preview_popup' data-ms-lbl-id='title'></span>",
                                encoded: false,
                            },
                            open: function () {
                                var source;
                                try {
                                    mService.config.label.resolve();
                                    $("#" + widgetID + "_attachment_content").css("height", screen.height * 0.6);
                                    $("#" + widgetID + "_attachment_content").css("width", screen.width * 0.9);
                                    $("#" + widgetID + "_attachment_content_widget").remove();
                                    $("#" + widgetID + "_preview_popup_title").text(name);
                                    if (mService.app.channel === "web") {
                                        source = base64String.replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", "");
                                    } else {
                                        source = path + "/" + name;
                                    };
                                    $("#" + widgetID + "_attachment_content").html("");
                                    if (type === "A") {
                                        $("#" + widgetID + "_attachment_content").msAudioplayer({
                                            source: source,
                                        });
                                    } else if (type === "V") {
                                        $("#" + widgetID + "_attachment_content").msVideoplayer({
                                            source: source,
                                        });
                                    } else if (type === "I") {
                                        if (mService.app.channel === "web") {
                                            $("#" + widgetID + "_attachment_content").msImageviewer({
                                                source: "data:image/jpeg;base64," + source,
                                            });
                                        } else {
                                            source = source.replace(mService.nfs.root.replace("file://", ""), "").replace(mService.app.root, "").substring(1);
                                            mService.nfs.getBase64String(source, function (base64String) {
                                                try {
                                                    $("#" + widgetID + "_attachment_content").msImageviewer({
                                                        source: "data:image/jpeg;base64," + base64String,
                                                    });
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    mService.app.showToast("image_base64_error", "system_messages");
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            })
                                        }
                                    } else if (type === "P") {
                                        $("#" + widgetID + "_attachment_content").html(kendo.template($("#msAttachmentPdfPreviewTemplate").html())({
                                                id: widgetID
                                            }));
                                        $("#" + widgetID + "_pdf_preview").attr("src", source);
                                    };
                                    $("#" + widgetID + "_attachment_content").attr("data-ms-widget-parentid", id);
                                    $("#" + widgetID + "_delete_confirmation_btn_container").attr("data-ms-widget-uid", uid);
                                    $("#" + widgetID + "_delete_confirmation_btn").attr("data-ms-widget-uid", uid);
                                    if ($("#" + widgetID + ((uid === "") ? (uid) : ("_" + uid))).attr("data-ms-widget-disabled") === "true") {
                                        $("#" + widgetID + "_delete").hide();
                                    } else {
                                        $("#" + widgetID + "_delete").show();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            close: function () {
                                try {
                                    type = $("#" + id).attr("data-ms-attachment-type");
                                    if (type === "A" || type === "V") {
                                        document.getElementById(widgetID + "_attachment_content_widget").pause();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            modal: true,
                            draggable: false,
                            resizable: false,
                        });
                        $("#" + widgetID + "_preview_popup").parent().addClass("ms_window");
                        $("#" + widgetID + "_delete").show();
                        $("#" + widgetID + "_delete_confirmation").hide();
                        $("#" + widgetID + "_preview_popup").data("kendoWindow").open().center();
                    } else {
                        if (mService.app.channel === "web") {}
                        else {
                            filePath = path.replace("/storage/emulated/0/", "");
                            filePath = filePath + "/" + name;
                            mService.nfs.openFile(filePath, function () {
                                try {
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("file_open_error", "system_messages");
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
        },
        msBarcode: {
            add: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    window.minterface("ScanBarCode", [], function (result) {
                        try {
                            $("#" + ele.attr("for") + "_result_content" + uid).show();
                            $("#" + ele.attr("for") + "_result" + uid).text(result);
                            $("#" + ele.attr("for") + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                            mService.widgets.event.change(mService.app.getScreenId(), ele.attr("for"), evt);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorMsg) {
                        try {
                            mService.app.showToast("scan_barcode_failure", "system_messages");
                            mService.exception.handle(errorMsg);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            delete : function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + ele.attr("for") + "_result_content" + uid).hide();
                    $("#" + ele.attr("for") + "_result" + uid).text("");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msButton: {
            click: function (scrID, id, event) {
                var valid;
                try {
                    valid = mService.config.rule.executeRuleStatements({
                        screenID: scrID,
                        objectID: "button",
                        eventID: "click",
                        fieldID: id,
                    });
                    if (valid) {
                        mService.config.rule.executeRuleStatements({
                            screenID: scrID,
                            objectID: "button",
                            eventID: "postclick",
                            fieldID: id,
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msCamera: {
            add: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    if ($("#" + id + uid).attr("data-ms-process-in-action") === undefined || $("#" + id + uid).attr("data-ms-process-in-action") === "false") {
                        $("#" + id + uid).attr("data-ms-process-in-action", "true");
                        if (mService.app.channel === "web") {
                            mService.widgets.init.util.msCamera.detectWebCamera(function (hasCamera) {
                                try {
                                    if (hasCamera) {
                                        mService.widgets.init.util.msCamera.initializeWebCam(ele.attr("for"), uid, evt);
                                    } else {
                                        $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                        mService.app.alert("error", {
                                            scrid: "",
                                            lblid: "web_camera_not_available",
                                            lblgrpid: "error"
                                        });
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            mService.widgets.init.util.getCameraImage(ele.attr("for"), uid, evt);
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            capture: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: true
                    }).then(function () {
                        Webcam.freeze();
                        $("#" + id + uid + "_capture_button").hide();
                        $("#" + id + uid + "_close_button").show();
                        $("#" + id + uid + "_save_button").show();
                    }, function (error) {
                        if (error.name == 'NotAllowedError') {
                            $("#" + id + uid + "_images_container").show();
                            $("#" + id + uid + "_live_camera_container").hide();
                            $("#" + id + uid + "_camera_button_container").hide();
                            mService.app.alert("error", {
                                scrid: "",
                                lblid: "webcam_permission_denied",
                                lblgrpid: "error",
                            });
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            cancel: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    Webcam.unfreeze();
                    $("#" + id + uid + "_capture_button").show();
                    $("#" + id + uid + "_close_button").hide();
                    $("#" + id + uid + "_save_button").hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            delete : function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).parent().attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + id + "_delete" + uid).hide();
                    $("#" + id + "_delete_confirmation" + uid).show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteCancel: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + id + "_delete" + uid).show();
                    $("#" + id + "_delete_confirmation" + uid).hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteConfirm: function (ele, evt) {
                var imageTileID,
                uid;
                try {
                    uid = ele.attr("data-ms-widget-uid");
                    uid = uid === "" ? uid : "_" + uid;
                    imageTileID = $("#" + ele.attr("for") + "_camera_img_content").attr("data-ms-widget-parentid");
                    $("#" + ele.attr("for") + "_preview_popup").data("kendoWindow").close();
                    $("#" + imageTileID).parent().remove();
                    $("#" + ele.attr("for") + uid).attr("data-ms-count", parseInt($("#" + ele.attr("for") + uid).attr("data-ms-count")) - 1);
                    mService.widgets.event.change(mService.app.getScreenId(), ele.attr("for"), evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            previewPopup: function (ele) {
                var id,
                parentID,
                previewImg,
                attachmentInd,
                path,
                name,
                uid;
                try {
                    id = ele.attr("for");
                    parentID = ele.attr("id");
                    uid = mService.widgets.init.util.getUID(id, parentID, ele);
                    path = $("#" + parentID).attr("data-ms-attachment-path");
                    name = $("#" + parentID).attr("data-ms-attachment-name");
                    attachmentInd = $("#" + id + ((uid === "") ? (uid) : ("_" + uid))).attr("data-ms-widget-attachmentind");
                    previewImg = ele.attr("data-ms-widget-source");
                    previewImg = previewImg.replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", "");
                    previewImg = "data:image/png;base64," + previewImg;
                    $("#" + id + "_preview_popup").kendoWindow({
                        width: screen.width * 0.9,
                        maxHeight: screen.height * 0.8,
                        minHeight: screen.height / 3,
                        title: {
                            text: "<span data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='camera_preview_popup' data-ms-lbl-id='title'></span>",
                            encoded: false,
                        },
                        open: function () {
                            try {
                                mService.config.label.resolve();
                                $("#" + id + "_camera_img_content").css("height", screen.height * 0.6);
                                $("#" + id + "_camera_img_content").css("width", screen.width * 0.9);
                                $("#" + id + "_camera_img_content_widget").remove();
                                $("#" + id + "_camera_img_content").msImageviewer({
                                    source: previewImg,
                                });
                                $("#" + id + "_camera_img_content").attr("data-ms-widget-parentid", parentID);
                                $("#" + id + "_delete_confirmation_btn_container").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_delete_confirmation_btn").attr("data-ms-widget-uid", uid);
                                if ($("#" + id + ((uid === "") ? (uid) : ("_" + uid))).attr("data-ms-widget-disabled") === "true") {
                                    $("#" + id + "_delete").hide();
                                } else {
                                    $("#" + id + "_delete").show();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        modal: true,
                        draggable: false,
                        resizable: false,
                    });
                    $("#" + id + "_preview_popup").parent().addClass("ms_window");
                    $("#" + ele.attr("for") + "_delete").show();
                    $("#" + ele.attr("for") + "_delete_confirmation").hide();
                    $("#" + id + "_preview_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            save: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    Webcam.snap(function (data_uri) {
                        $("#" + id + uid + "_camera_button_container").hide();
                        $("#" + id + uid + "_live_camera_container").hide();
                        $("#" + id + uid + "_images_container").show();
                        mService.widgets.init.util.msCamera.webCamPopup.close(id + uid);
                        Webcam.reset();
                        mService.widgets.init.util.msCamera.loadImage(id, uid.replace("_", ""), data_uri);
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msChat: {
            actions: function (ele, evt) {
                var id,
                obj;
                try {
                    id = ele.attr("data-ms-for");
                    obj = JSON.parse(ele.attr("data-ms-listview-param"));
                    mService.widgets.variable.msChat.variable[id].selectedAction = {
                        "title": obj.title,
                        "value": obj.value,
                        "to_wf_stage": obj.to_wf_stage,
                        "to_wf_status": obj.to_wf_status
                    };
                    $("#" + id + "_selected_action").attr("data-ms-listview-param", ele.attr("data-ms-listview-param"));
                    if (ele.attr("data-ms-custom") !== "undefined" && ele.attr("data-ms-custom") !== undefined && ele.attr("data-ms-custom") !== "") {
                        mService.widgets.variable.msChat.variable[id].custom = $.extend(true, mService.widgets.variable.msChat.variable[id].custom, JSON.parse(ele.attr("data-ms-custom")));
                        $("#" + id + "_selected_action").attr("data-ms-custom", ele.attr("data-ms-custom"));
                    };
                    $("#" + id + "_selected_action_title").text(obj.title);
                    mService.config.rule.get(mService.app.getScreenId(), function () {
                        try {
                            mService.widgets.init.util.msChat.handleFormWidgets(id, obj);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.widgets.init.util.msChat.handleFormWidgets(id, obj);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            attachment: function (ele, evt) {
                var id;
                try {
                    id = ele.attr("data-ms-for");
                    mService.widgets.init.util.msChat.toolClickAttachment(id, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actionFormSubmit: function (ele, evt) {
                var id;
                try {
                    id = ele.attr("data-ms-for");
                    mService.pattern.query.util.submitForm(id);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            closeActionValueContainer: function (ele, evt) {
                var id;
                try {
                    id = ele.attr("data-ms-for");
                    mService.widgets.init.util.msChat.closeActionValueContainer(id);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            closeActionFormContainer: function (ele, evt) {
                var id;
                try {
                    if (ele.attr !== undefined) {
                        id = ele.attr("data-ms-for");
                    } else {
                        id = ele;
                    };
                    $("#" + id + "_footer").hide("slow");
                    $("#" + id + "_action_form_container").hide(700);
                    $("#" + id + "_message_box_group").show("slow");
                    $("#" + id + "_action_panel_container").show("slow");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            camera: function (ele, evt) {
                var id;
                try {
                    id = ele.attr("data-ms-for");
                    mService.widgets.init.util.msChat.toolClickCamera(id, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            leftNav: function (ele, evt) {
                var id,
                msgID,
                visibleBlock,
                visibleBlockCount,
                totalCount,
                theme,
                obj;
                try {
                    id = ele.attr("data-ms-for");
                    theme = ele.attr("data-ms-chat-theme");
                    msgID = ele.attr("data-ms-info-id");
                    visibleBlock = $("#" + id + "_attachment_container [ms-data-chat-attachtment-count]:visible");
                    visibleBlockCount = $(visibleBlock).attr("ms-data-chat-attachtment-count");
                    totalCount = $(ele).attr("data-ms-attachment-totalCount");
                    if (Number(visibleBlockCount) > 1) {
                        $(visibleBlock).hide();
                        $("#" + msgID + "_" + (Number(visibleBlockCount) - 1)).css("display", "flex");
                        mService.widgets.init.util.msLoop.animation.slide(msgID + "_" + (Number(visibleBlockCount) - 1), "left");
                        $("#" + msgID + "_count").text((Number(visibleBlockCount) - 1) + "/" + totalCount);
                        if ((Number(visibleBlockCount) - 1) === 1) {
                            $(ele).css("opacity", "0.5").prop('disabled', true);
                        };
                        $("#" + msgID + "_rightNav").css("opacity", "1").prop('disabled', false);
                    } else {
                        $(ele).css("opacity", "0.5").prop('disabled', true);
                    };
                    $("#" + msgID + "_pager_" + visibleBlockCount).removeClass("ms_chat_attachment_pager_active_default").removeClass("ms_chat_attachment_pager_active_" + theme).addClass("ms_chat_attachment_pager_default").addClass("ms_chat_attachment_pager_" + theme);
                    $("#" + msgID + "_pager_" + (Number(visibleBlockCount) - 1)).removeClass("ms_chat_attachment_pager_default").removeClass("ms_chat_attachment_pager_" + theme).addClass("ms_chat_attachment_pager_active_" + theme).addClass("ms_chat_attachment_pager_active_default");
                    obj = JSON.parse($("#" + msgID + "_" + (Number(visibleBlockCount) - 1)).attr("data-ms-listview-param"));
                    $("#" + msgID + "_attachment_download").attr("href", obj["attachSrc"]);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            rightNav: function (ele, evt) {
                var id,
                msgID,
                visibleBlock,
                visibleBlockCount,
                totalCount,
                theme;
                try {
                    id = ele.attr("data-ms-for");
                    theme = ele.attr("data-ms-chat-theme");
                    msgID = ele.attr("data-ms-info-id");
                    visibleBlock = $("#" + id + "_attachment_container [ms-data-chat-attachtment-count]:visible");
                    visibleBlockCount = $(visibleBlock).attr("ms-data-chat-attachtment-count");
                    totalCount = $(ele).attr("data-ms-attachment-totalCount");
                    if (Number(visibleBlockCount) < Number(totalCount)) {
                        $(visibleBlock).hide();
                        $("#" + msgID + "_" + (Number(visibleBlockCount) + 1)).css("display", "flex");
                        mService.widgets.init.util.msLoop.animation.slide(msgID + "_" + (Number(visibleBlockCount) + 1), "right");
                        $("#" + msgID + "_count").text((Number(visibleBlockCount) + 1) + "/" + totalCount);
                        if ((Number(visibleBlockCount) + 1) === Number(totalCount)) {
                            $(ele).css("opacity", "0.5").prop('disabled', true);
                        };
                        $("#" + msgID + "_leftNav").css("opacity", "1").prop('disabled', false);
                    } else {
                        $(ele).css("opacity", "0.5").prop('disabled', true);
                    };
                    $("#" + msgID + "_pager_" + visibleBlockCount).removeClass("ms_chat_attachment_pager_active_" + theme).removeClass("ms_chat_attachment_pager_active_default").addClass("ms_chat_attachment_pager_" + theme).addClass("ms_chat_attachment_pager_default");
                    $("#" + msgID + "_pager_" + (Number(visibleBlockCount) + 1)).removeClass("ms_chat_attachment_pager_active_" + theme).removeClass("ms_chat_attachment_pager_default").addClass("ms_chat_attachment_pager_active_" + theme).addClass("ms_chat_attachment_pager_active_default");
                    obj = JSON.parse($("#" + msgID + "_" + (Number(visibleBlockCount) + 1)).attr("data-ms-listview-param"));
                    $("#" + msgID + "_attachment_download").attr("href", obj["attachSrc"]);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            page: {
                afterShow: function (e) {
                    try {
                        scrID = e.view.id.replace("#", "");
                        $("#" + scrID + "_content").msChat({
                            scrid: scrID,
                            key: $("#" + scrID).attr("data-ms-chat-key"),
                            subKey: $("#" + scrID).attr("data-ms-chat-subkey"),
                        });
                        mService.config.label.resolve();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            previewPopup: function (ele) {
                var id,
                path,
                obj,
                type,
                src;
                try {
                    id = ele.attr("data-ms-for");
                    parentID = ele.attr("id");
                    obj = JSON.parse(ele.attr("data-ms-listview-param"));
                    type = obj["attachType"];
                    src = obj["attachSrc"];
                    if (type === "A" || type === "V" || type === "I" || type === "D" || type === "P") {
                        mService.widgets.init.util.msChat.previewPopup.open(id, {
                            docType: type,
                            docSrc: src,
                        });
                    } else {
                        mService.spinner.show();
                        path = src;
                        path = path.replace(/\\/g, "/").replace(mService.app.clientURL + "/", "");
                        mService.nfs.validateFile({
                            filePath: path,
                            success: function (indication) {
                                try {
                                    if (indication === "true") {
                                        mService.spinner.hide();
                                        chat.util.openFile(mService.app.root + "/" + path);
                                    } else {
                                        serverPath = src;
                                        localPath = path;
                                        if (window.navigator.onLine) {
                                            mService.nfs.downloadFile(serverPath, localPath, false, function () {
                                                try {
                                                    mService.spinner.hide();
                                                    chat.util.openFile(mService.app.root + "/" + path);
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    mService.spinner.hide();
                                                    mService.app.showToast("download_error", "system_messages");
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } else {
                                            mService.spinner.hide();
                                            mService.app.showToast("internet_connection_error", "system_messages");
                                        }
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            failure: function () {
                                try {
                                    mService.spinner.hide();
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            sendMessage: function (ele, evt) {
                var messageBox,
                messageInput,
                message,
                id,
                custom,
                obj;
                try {
                    id = $(ele).attr("data-ms-for");
                    messageBox = $(".ms_chat_message_box");
                    messageInput = $(messageBox).attr("id");
                    message = ($("#" + id + "_message_box").html().trim() !== "") ? ($("#" + id + "_message_box").html().replace(/<div>/g, "<br>").replace(/<\/div>/g, "").replace(/&nbsp;/g, "").trim()) : ("");
                    $("#" + id + "_message_box").html("");
                    $("#" + id + "_attachment").show();
                    $("#" + id + "_camera").show();
                    if ($("#" + id + "_selected_action_container").is(":visible")) {
                        custom = {};
                        obj = JSON.parse($("#" + id + "_selected_action").attr("data-ms-listview-param"));
                        if ($("#" + id + "_selected_action").attr("data-ms-custom") !== "") {
                            custom = JSON.parse($("#" + id + "_selected_action").attr("data-ms-custom"));
                        };
                        mService.widgets.variable.msChat.variable[id].msgType = "suggestion";
                        mService.widgets.variable.msChat.variable[id].actionPath = mService.widgets.variable.msChat.variable[id].actionPath + "/" + obj.value;
                        mService.widgets.variable.msChat.variable[id].custom = $.extend(true, mService.widgets.variable.msChat.variable[id].custom, custom);
                        mService.widgets.variable.msChat.variable[id].custom.selectedAction = obj.value;
                        if (message === "") {
                            mService.widgets.variable.msChat.variable[id].content = obj.title;
                        } else {
                            mService.widgets.variable.msChat.variable[id].content = message;
                        }
                    } else {
                        mService.widgets.variable.msChat.variable[id].msgType = "text";
                        mService.widgets.variable.msChat.variable[id].content = message;
                    };
                    mService.widgets.variable.msChat.variable[id].translations = "";
                    mService.widgets.init.util.msChat.setMsgFromDetails(id);
                    mService.widgets.variable.msChat.variable[id].to = [{
                            id: mService.app.getUserId(),
                        }, ];
                    mService.widgets.init.util.msChat.updateChatHistory(id, function () {
                        try {
                            if ($("#" + id + "_selected_action_container").is(":visible")) {
                                mService.widgets.init.util.msChat.closeActionValueContainer(id);
                            };
                            mService.widgets.variable.msChat.variable[id].to = "";
                            mService.widgets.init.util.msChat.handleNotification(id, mService.widgets.init.util.msChat.getMsgBody(id), false, false, false, false);
                            mService.widgets.variable.msChat.variable[id].followup = "";
                            mService.widgets.init.util.msChat.sendMessageToServer(id, function (msgbody) {
                                if ($("#" + id + "_selected_action_container").is(":visible")) {
                                    mService.widgets.init.util.msChat.closeActionValueContainer(id);
                                };
                                return true;
                            }, function () {
                                return true;
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            suggestion: function (ele, evt) {
                var id,
                obj,
                custom;
                try {
                    custom = {};
                    id = ele.attr("data-ms-for");
                    obj = JSON.parse(ele.attr("data-ms-listview-param"));
                    $("#" + id + "_action_panel_container").hide("slow");
                    if ($("#" + id + "_selected_action_container").is(":visible")) {
                        mService.widgets.init.util.msChat.closeActionValueContainer(id);
                    };
                    if (ele.attr("data-ms-custom") !== "undefined" && ele.attr("data-ms-custom") !== undefined && ele.attr("data-ms-custom") !== "") {
                        custom = JSON.parse(ele.attr("data-ms-custom"));
                    };
                    $.extend(true, obj, custom);
                    obj.custom = custom;
                    mService.widgets.init.util.msChat.actionClick(id, obj);
                    $("#" + id + "_action_panel_container").hide("slow");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            viewAttachment: function (ele, evt) {
                var scrID;
                try {
                    if (mService.app.channel === "web") {
                        mService.pattern.query.button.preview(ele);
                    } else {
                        scrID = ele.attr("data-ms-chat-scrid");
                        obj = JSON.parse(ele.attr("data-ms-listview-param"));
                        type = obj["attachType"];
                        src = obj["attachSrc"];
                        $("#" + scrID + "_popup_attachment_view_content").html("");
                        $("#" + scrID + "_popup_attachment_view").css("width", "300px").show();
                        windowWidth = 500;
                        windowHeight = 500;
                        windowWidth = windowWidth - windowWidth * 0.1;
                        windowHeight = windowHeight - windowHeight * 0.05;
                        $("#" + scrID + "_popup_attachment_view_content").css("height", windowHeight);
                        $("#" + scrID + "_popup_attachment_view_content").css("width", windowWidth);
                        var dialog1 = $("#" + scrID + "_popup").data("kendoWindow");
                        dialog1.setOptions({
                            width: ($(window).width() * 75) / 100,
                        });
                        setTimeout(function () {
                            try {
                                $("#" + scrID + "_popup").data("kendoWindow").center();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 100);
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
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            viewClose: function (ele, evt) {
                var scrID;
                try {
                    scrID = ele.attr("data-ms-chat-scrid");
                    $("#" + scrID + "_popup_attachment_view_content").html("");
                    $("#" + scrID + "_popup_attachment_view").hide();
                    var dialog1 = $("#" + scrID + "_popup").data("kendoWindow");
                    dialog1.setOptions({
                        width: ($(window).width() * 40) / 100,
                    });
                    setTimeout(function () {
                        try {
                            $("#" + scrID + "_popup").data("kendoWindow").center();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 100);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            downloadAttachment: function (ele, evt) {
                var id,
                obj,
                chatVariable;
                try {
                    if (window.navigator.onLine) {
                        id = ele.attr("data-ms-for");
                        obj = JSON.parse(ele.attr("data-ms-listview-param"));
                        serverPath = obj.attachSrc;
                        chatVariable = mService.widgets.variable.msChat.variable[id];
                        localPath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + chatVariable.key + "/" + chatVariable.subKey + "/" + obj.attachName;
                        mService.home.attachmentProgressPopup.changeTitle("download");
                        mService.home.attachmentProgressPopup.open();
                        window.minterface("DownloadChatAttachFile", [{
                                    url: serverPath,
                                    filePath: mService.app.root + "/" + localPath,
                                    thumbnailInd: false
                                }
                            ], function (result) {
                            var progressBar;
                            try {
                                if (result === "success") {
                                    mService.home.attachmentProgressPopup.close();
                                    mService.app.showToast("download_success", "system_messages", {
                                        "path": localPath
                                    });
                                } else {
                                    progressBar = $("#attachment_progressbar").data("kendoProgressBar");
                                    progressBar.value(result.progress);
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                mService.home.attachmentProgressPopup.close();
                                mService.app.showToast("download_error", "system_messages");
                                mService.exception.handle(errorMsg);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.app.showToast("internet_connection_error", "system_messages");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        msCheckboxgroup: {
            change: function (scrID, id, event) {
                var currentCheckboxItemID,
                currentCheckboxItemVal,
                itemCheckedInd,
                dSrcFieldToCompare,
                dataSource,
                index;
                try {
                    currentCheckboxItemID = event.target.id;
                    currentCheckboxItemVal = $("#" + currentCheckboxItemID).val();
                    itemCheckedInd = $("#" + currentCheckboxItemID).is(":checked");
                    dSrcFieldToCompare = $("#" + id).attr("data-ms-widget-valuefield");
                    dSrcFieldToUpdate = $("#" + id).attr("data-ms-widget-updatefield");
                    dataSource = $("#" + id).getDataSource();
                    for (index = 0; index < dataSource.data().length; index++) {
                        if (dataSource.data()[index][dSrcFieldToCompare] === currentCheckboxItemVal && dSrcFieldToUpdate !== "") {
                            dataSource.data()[index][dSrcFieldToUpdate] = itemCheckedInd ? "1" : "0";
                        }
                    };
                    mService.widgets.event.change(scrID, id, event);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msGallery: {
            add: function (ele, evt) {
                var id,
                uid,
                maxLimitReached;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    if ($("#" + id + uid).attr("data-ms-process-in-action") === undefined || $("#" + id + uid).attr("data-ms-process-in-action") === "false") {
                        $("#" + id + uid).attr("data-ms-process-in-action", "true");
                        setTimeout(function () {
                            try {
                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 1000);
                        if (mService.app.channel === "web") {
                            maxLimitReached = false;
                            if ($("#" + id + uid).attr("data-ms-widget-maxlimit") !== "") {
                                if (parseInt($("#" + id + uid).attr("data-ms-count")) < parseInt($("#" + id + uid).attr("data-ms-widget-maxlimit"))) {
                                    maxLimitReached = false;
                                } else {
                                    maxLimitReached = true;
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "web_gallery_max_limit",
                                        lblgrpid: "error",
                                    });
                                }
                            } else {
                                maxLimitReached = false;
                            };
                            if (!maxLimitReached) {
                                $("#" + id + "_file_picker").click();
                            } else {
                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                            }
                        } else {
                            mService.widgets.init.util.getGalleryImage(ele.attr("for"), uid, evt);
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            delete : function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).parent().attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + id + "_delete" + uid).hide();
                    $("#" + id + "_delete_confirmation" + uid).show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteConfirm: function (ele, evt) {
                var imageTileID,
                fileDataArr,
                idSplit,
                uid;
                try {
                    uid = ele.attr("data-ms-widget-uid");
                    uid = uid === "" ? uid : "_" + uid;
                    imageTileID = $("#" + ele.attr("for") + "_gallery_img_content").attr("data-ms-widget-parentid");
                    $("#" + ele.attr("for") + "_preview_popup").data("kendoWindow").close();
                    $("#" + imageTileID).parent().remove();
                    idSplit = imageTileID.split("_");
                    if (mService.app.channel === "web") {
                        fileDataArr = mService.widgets.variable.msGallery.webImage[ele.attr("for")];
                        for (var i = 0; i < fileDataArr.length; i++) {
                            if (Object.keys(fileDataArr[i])[0] === idSplit[idSplit.length - 1]) {
                                mService.widgets.variable.msGallery.webImage[ele.attr("for")].splice(i, 1);
                            }
                        };
                    };
                    $("#" + ele.attr("for") + uid).attr("data-ms-count", parseInt($("#" + ele.attr("for") + uid).attr("data-ms-count")) - 1);
                    mService.widgets.event.change(mService.app.getScreenId(), ele.attr("for"), evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteCancel: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + id + "_delete" + uid).show();
                    $("#" + id + "_delete_confirmation" + uid).hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            previewPopup: function (ele) {
                var id,
                parentID,
                previewImg,
                attachmentInd,
                path,
                name,
                uid;
                try {
                    id = ele.attr("for");
                    parentID = ele.attr("id");
                    uid = mService.widgets.init.util.getUID(id, parentID, ele);
                    path = $("#" + parentID).attr("data-ms-attachment-path");
                    name = $("#" + parentID).attr("data-ms-attachment-name");
                    attachmentInd = $("#" + id + ((uid === "") ? (uid) : ("_" + uid))).attr("data-ms-widget-attachmentind");
                    previewImg = ele.attr("data-ms-widget-source");
                    previewImg = previewImg.replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", "");
                    previewImg = "data:image/png;base64," + previewImg;
                    $("#" + id + "_preview_popup").kendoWindow({
                        width: screen.width * 0.9,
                        maxHeight: screen.height * 0.8,
                        minHeight: screen.height / 3,
                        title: {
                            text: "<span data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='camera_preview_popup' data-ms-lbl-id='title'></span>",
                            encoded: false,
                        },
                        open: function () {
                            try {
                                mService.config.label.resolve();
                                $("#" + id + "_gallery_img_content").css("height", screen.height * 0.6);
                                $("#" + id + "_gallery_img_content").css("width", screen.width * 0.9);
                                $("#" + id + "_gallery_img_content_widget").remove();
                                $("#" + id + "_gallery_img_content").msImageviewer({
                                    source: previewImg,
                                });
                                $("#" + id + "_gallery_img_content").attr("data-ms-widget-parentid", ele.attr("id"));
                                $("#" + id + "_delete_confirmation_btn_container").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_delete_confirmation_btn").attr("data-ms-widget-uid", uid);
                                if ($("#" + id + ((uid === "") ? (uid) : ("_" + uid))).attr("data-ms-widget-disabled") === "true") {
                                    $("#" + id + "_delete").hide();
                                } else {
                                    $("#" + id + "_delete").show();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        modal: true,
                        draggable: false,
                        resizable: false,
                    });
                    $("#" + id + "_preview_popup").parent().addClass("ms_window");
                    $("#" + ele.attr("for") + "_delete").show();
                    $("#" + ele.attr("for") + "_delete_confirmation").hide();
                    $("#" + id + "_preview_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msGeotag: {
            add: function (ele, evt) {
                var id,
                uid;
                try {
                    mService.spinner.show();
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    mService.util.checkLocationService(function (status) {
                        if (status === "true") {
                            window.minterface("GetCurrentLocation", [], function (locationData) {
                                mService.spinner.hide();
                                mService.widgets.init.util.msGeotag.displayAddress(ele.attr("for"), locationData, uid, evt);
                            }, function (errorMsg) {
                                mService.exception.handle(errorMsg);
                                mService.app.showToast("location_error", "system_messages");
                                mService.spinner.hide();
                            });
                        } else {
                            mService.app.showToast("location_not_enabled", "system_messages");
                            mService.spinner.hide();
                        }
                    }, function (error) {
                        mService.app.showToast("location_not_enabled", "system_messages");
                        mService.spinner.hide();
                        mService.exception.handle(error);
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            delete : function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + id + "_result_content" + uid).hide();
                    $("#" + id + "_result_lat" + uid).text("");
                    $("#" + id + "_result_lng" + uid).text("");
                    $("#" + id + "_result_address" + uid).text("");
                    $("#" + id + uid).attr("data-ms-value", "");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msImagepicker: {
            addCamera: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    if ($("#" + id + uid).attr("data-ms-process-in-action") === undefined || $("#" + id + uid).attr("data-ms-process-in-action") === "false") {
                        $("#" + id + uid).attr("data-ms-process-in-action", "true");
                        if (mService.app.channel === "web") {
                            mService.widgets.init.util.msCamera.detectWebCamera(function (hasCamera) {
                                try {
                                    if (hasCamera) {
                                        mService.widgets.init.util.msCamera.initializeWebCam(ele.attr("for"), uid, evt);
                                    } else {
                                        $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                        mService.app.alert("error", {
                                            scrid: "",
                                            lblid: "web_camera_not_available",
                                            lblgrpid: "error"
                                        });
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            mService.widgets.init.util.getCameraImage(ele.attr("for"), uid, evt);
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            addGallery: function (ele, evt) {
                var id,
                uid,
                maxLimitReached;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    if ($("#" + id + uid).attr("data-ms-process-in-action") === undefined || $("#" + id + uid).attr("data-ms-process-in-action") === "false") {
                        $("#" + id + uid).attr("data-ms-process-in-action", "true");
                        setTimeout(function () {
                            try {
                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 1000);
                        if (mService.app.channel === "web") {
                            maxLimitReached = false;
                            if ($("#" + id + uid).attr("data-ms-widget-maxlimit") !== "") {
                                if (parseInt($("#" + id + uid).attr("data-ms-count")) < parseInt($("#" + id + uid).attr("data-ms-widget-maxlimit"))) {
                                    maxLimitReached = false;
                                } else {
                                    maxLimitReached = true;
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "web_gallery_max_limit",
                                        lblgrpid: "error",
                                    });
                                }
                            } else {
                                maxLimitReached = false;
                            };
                            if (!maxLimitReached) {
                                $("#" + id + "_gallery_file").click();
                            } else {
                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                            }
                        } else {
                            mService.widgets.init.util.getGalleryImage(ele.attr("for"), uid, evt);
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            delete : function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).parent().attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + id + "_delete" + uid).hide();
                    $("#" + id + "_delete_confirmation" + uid).show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteCancel: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + id + "_delete" + uid).show();
                    $("#" + id + "_delete_confirmation" + uid).hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteConfirm: function (ele, evt) {
                var imageTileID,
                fileDataArr,
                idSplit,
                uid;
                try {
                    uid = ele.attr("data-ms-widget-uid");
                    uid = uid === "" ? uid : "_" + uid;
                    imageTileID = $("#" + ele.attr("for") + "_imagepicker_img_content").attr("data-ms-widget-parentid");
                    $("#" + ele.attr("for") + "_imagepicker_preview_popup").data("kendoWindow").close();
                    $("#" + imageTileID).parent().remove();
                    idSplit = imageTileID.split("_");
                    if (mService.app.channel === "web") {
                        fileDataArr = mService.widgets.variable.msGallery.webImage[ele.attr("for")];
                        for (var i = 0; i < fileDataArr.length; i++) {
                            if (Object.keys(fileDataArr[i])[0] === idSplit[idSplit.length - 1]) {
                                mService.widgets.variable.msGallery.webImage[ele.attr("for")].splice(i, 1);
                            }
                        };
                    };
                    $("#" + ele.attr("for") + uid).attr("data-ms-count", parseInt($("#" + ele.attr("for") + uid).attr("data-ms-count")) - 1);
                    mService.widgets.event.change(mService.app.getScreenId(), ele.attr("for"), evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            previewPopup: function (ele) {
                var id,
                parentID,
                attachmentInd,
                previewImg,
                path,
                name,
                uid;
                try {
                    id = ele.attr("for");
                    parentID = ele.attr("id");
                    uid = mService.widgets.init.util.getUID(id, parentID, ele);
                    path = $("#" + parentID).attr("data-ms-attachment-path");
                    name = $("#" + parentID).attr("data-ms-attachment-name");
                    attachmentInd = $("#" + id + ((uid === "") ? (uid) : ("_" + uid))).attr("data-ms-widget-attachmentind");
                    previewImg = ele.attr("data-ms-widget-source");
                    previewImg = ele.attr("data-ms-widget-source");
                    previewImg = previewImg.replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", "");
                    previewImg = "data:image/png;base64," + previewImg;
                    $("#" + id + "_imagepicker_preview_popup").kendoWindow({
                        width: screen.width * 0.9,
                        maxHeight: screen.height * 0.8,
                        minHeight: screen.height / 3,
                        title: {
                            text: "<span data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='camera_preview_popup' data-ms-lbl-id='title'></span>",
                            encoded: false,
                        },
                        open: function () {
                            try {
                                mService.config.label.resolve();
                                $("#" + id + "_imagepicker_img_content").css("height", screen.height * 0.6);
                                $("#" + id + "_imagepicker_img_content").css("width", screen.width * 0.9);
                                $("#" + id + "_imagepicker_img_content_widget").remove();
                                $("#" + id + "_imagepicker_img_content").msImageviewer({
                                    source: previewImg,
                                });
                                $("#" + id + "_imagepicker_img_content").attr("data-ms-widget-parentid", parentID);
                                $("#" + id + "_delete_confirmation_btn_container").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_delete_confirmation_btn").attr("data-ms-widget-uid", uid);
                                if ($("#" + id + ((uid === "") ? (uid) : ("_" + uid))).attr("data-ms-widget-disabled") === "true") {
                                    $("#" + id + "_delete").hide();
                                } else {
                                    $("#" + id + "_delete").show();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        modal: true,
                        draggable: false,
                        resizable: false,
                    });
                    $("#" + id + "_imagepicker_preview_popup").parent().addClass("ms_window");
                    $("#" + ele.attr("for") + "_delete").show();
                    $("#" + ele.attr("for") + "_delete_confirmation").hide();
                    $("#" + id + "_imagepicker_preview_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msImageviewer: {
            load: function (id, source) {
                var image,
                canvas,
                containerWidth,
                containerHeight,
                aspectRatio;
                try {
                    containerHeight = $("#" + id).height();
                    containerWidth = $("#" + id).width();
                    image = new Image();
                    image.onload = function (e) {
                        try {
                            $("#" + id + "_widget").attr("data-ms-widget-source", source);
                            canvas = document.getElementById(id + "_widget");
                            if (image.width > containerWidth || image.height > containerHeight) {
                                aspectRatio = image.width / image.height;
                                canvas.width = containerWidth;
                                canvas.height = containerWidth / aspectRatio;
                                if (canvas.height > containerHeight) {
                                    canvas.height = containerHeight;
                                    canvas.width = canvas.height * aspectRatio;
                                };
                                canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
                            } else {
                                canvas.width = image.width;
                                canvas.height = image.height;
                                canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    };
                    image.src = source;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msLoop: {
            add: function (ele, evt) {
                var scrID,
                widgetID,
                visibleBlock,
                uid;
                try {
                    mService.util.isBottomSheetOpen();
                    widgetID = ele.attr("for");
                    mService.widgets.init.util.buttonStatePressed(ele.attr("id"));
                    scrID = mService.app.getScreenId();
                    visibleBlock = $("#" + widgetID + "_content [data-ms-widget-msloopblock]:visible");
                    if ($("#" + widgetID).attr("data-ms-widget-maxlimit") == "" || mService.widgets.variable.msLoop.dataSrc[widgetID].data().length < $("#" + widgetID).attr("data-ms-widget-maxlimit")) {
                        if ($("#" + widgetID + "_loop_block").length === 1) {
                            uid = $("#" + widgetID + "_loop_block").attr("data-ms-widget-uid");
                            mService.widgets.variable.msLoop.dataSrc[widgetID].add(mService.widgets.init.util.msLoop.getValues(widgetID + "_loop_block", scrID));
                        } else {
                            uid = "";
                        };
                        mService.widgets.init.util.msLoop.createBlock(widgetID, uid, $(visibleBlock).attr("data-ms-widget-uid"), false, scrID);
                    } else {
                        mService.app.showToast("msloop_max_limit", "system_messages");
                    };
                    mService.widgets.init.util.msLoop.pausePlayer(widgetID);
                    mService.config.rule.executeRuleStatements({
                        screenID: scrID,
                        objectID: "screen",
                        eventID: "load",
                        fieldID: widgetID,
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            create: function (ele, evt) {
                var scrID,
                widgetID;
                try {
                    widgetID = ele.attr("for");
                    scrID = mService.app.getScreenId();
                    $("#" + widgetID + "_createbtn_span").hide();
                    $("#" + widgetID + "_msloop_container").show();
                    mService.widgets.init.util.msLoop.createBlock(widgetID, "", "", false, scrID);
                    $("#" + widgetID + "_group span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                    mService.config.rule.executeRuleStatements({
                        screenID: scrID,
                        objectID: "screen",
                        eventID: "load",
                        fieldID: widgetID,
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            delete : function (ele, evt) {
                var widgetID,
                visibleBlock,
                dataSource,
                currentDataItem,
                index,
                uid;
                try {
                    mService.util.isBottomSheetOpen();
                    widgetID = ele.attr("for");
                    mService.widgets.init.util.buttonStatePressed(ele.attr("id"));
                    visibleBlock = $("#" + widgetID + "_content [data-ms-widget-msloopblock]:visible");
                    uid = $(visibleBlock).attr("data-ms-widget-uid");
                    dataSource = mService.widgets.variable.msLoop.dataSrc[widgetID];
                    currentDataItem = dataSource.getByUid(uid);
                    index = dataSource.indexOf(currentDataItem);
                    mService.widgets.init.util.msLoop.deleteBlock(widgetID, uid, dataSource, index, currentDataItem);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            leftNav: function (ele, evt) {
                try {
                    mService.util.isBottomSheetOpen();
                    mService.widgets.init.util.msLoop.navigate(ele, "left");
                    mService.widgets.init.util.msLoop.pausePlayer(ele.attr("for"));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            rightNav: function (ele, evt) {
                try {
                    mService.util.isBottomSheetOpen();
                    mService.widgets.init.util.msLoop.navigate(ele, "right");
                    mService.widgets.init.util.msLoop.pausePlayer(ele.attr("for"));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msMap: {
            addMarker: function (id, lat, lng) {
                try {
                    mService.widgets.variable.msMap.map[id].setCenter({
                        lat: parseFloat(lat),
                        lng: parseFloat(lng)
                    });
                    mService.widgets.variable.msMap.marker[id] = new google.maps.Marker({
                        position: {
                            lat: parseFloat(lat),
                            lng: parseFloat(lng)
                        },
                        map: mService.widgets.variable.msMap.map[id],
                        animation: google.maps.Animation.BOUNCE
                    });
                    mService.widgets.variable.msMap.marker[id].addListener("click", () => {
                        try {
                            mService.widgets.init.util.msMap.getAddress(lat, lng, id, mService.widgets.variable.msMap.map[id]);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            removeMarker: function (id) {
                try {
                    mService.widgets.variable.msMap.marker[id].setMap(null);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            refresh: function (id, map, marker) {
                try {
                    mService.spinner.show();
                    mService.api.geoLocation.getUserLocation(mService.containR.variable[mService.app.getScreenId()].selectedRecord.assigned_to_emp_device_id, function (result) {
                        try {
                            mService.widgets.event.msMap.removeMarker("home_device_location_popup_content");
                            mService.widgets.event.msMap.addMarker("home_device_location_popup_content", result[0].p_lattitude_val, result[0].p_longitude_val);
                            mService.spinner.hide();
                            $("#home_device_location_popup").data("kendoWindow").open().center();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorCode) {
                        try {
                            mService.spinner.hide();
                            mService.app.showToast(errorCode, "system_messages");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msMlingualtextarea: {
            getDefaultLocaleData: function (ele, evt) {
                try {
                    if ($("#" + ele.attr("data-ms-mswidget-for")).val() !== "") {
                        $.get("https://translation.googleapis.com/language/translate/v2?key=" + mService.app.googleTanslationKey + "&target=" + mService.user.profile.login.default_locale_id.substring(0, 2) + "&q=" + encodeURIComponent($("#" + ele.attr("data-ms-mswidget-for")).val()), function (data, status) {
                            try {
                                if (data.data.translations[0].detectedSourceLanguage === mService.user.profile.login.locale_id.substring(0, 2)) {
                                    $("#" + ele.attr("data-ms-mswidget-for") + "_default_locale").val(data.data.translations[0].translatedText.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
                                } else {
                                    $("#" + ele.attr("data-ms-mswidget-for")).attr("data-ms-rule-locale", "true");
                                    mService.config.rule.validator.validateInput("#" + ele.attr("data-ms-mswidget-for"));
                                    $("#" + ele.attr("data-ms-mswidget-for")).val("");
                                    $("#" + ele.attr("data-ms-mswidget-for")).attr("data-ms-rule-locale", "false");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getUserLocaleData: function (ele, evt) {
                try {
                    if ($("#" + ele.attr("data-ms-mswidget-for") + "_default_locale").val() !== "") {
                        $.get("https://translation.googleapis.com/language/translate/v2?key=" + mService.app.googleTanslationKey + "&target=" + mService.user.profile.login.locale_id.substring(0, 2) + "&q=" + encodeURIComponent($("#" + ele.attr("data-ms-mswidget-for") + "_default_locale").val()), function (data, status) {
                            try {
                                if (data.data.translations[0].detectedSourceLanguage === mService.user.profile.login.default_locale_id.substring(0, 2)) {
                                    $("#" + ele.attr("data-ms-mswidget-for")).val(data.data.translations[0].translatedText.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
                                } else {
                                    $("#" + ele.attr("data-ms-mswidget-for")).attr("data-ms-rule-locale", "true");
                                    mService.config.rule.validator.validateInput("#" + ele.attr("data-ms-mswidget-for"));
                                    $("#" + ele.attr("data-ms-mswidget-for") + "_default_locale").val("");
                                    $("#" + ele.attr("data-ms-mswidget-for")).attr("data-ms-rule-locale", "false");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msMobileNumber: {
            countryCode: function (ele, evt) {
                var id,
                parentUL,
                countryCode,
                mobileCode,
                countryName,
                uid,
                msLoopInd;
                try {
                    uid = "";
                    parentUL = $(ele).parent();
                    id = $(parentUL).attr("for");
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                        uid = (uid === "") ? (($(ele).attr("data-ms-widget-uid") === undefined) ? ("") : ($(ele).attr("data-ms-widget-uid"))) : ("");
                        uid = (uid === "") ? (($(parentUL).attr("data-ms-widget-uid") === undefined) ? ("") : ($(parentUL).attr("data-ms-widget-uid"))) : ("");
                        id = uid === "" ? id : id.replace("_" + uid, "");
                        uid = uid === "" ? uid : "_" + uid;
                    };
                    $(parentUL).find('li').removeClass('ms_bottom_sheet_country_list_selected');
                    $(ele).addClass("ms_bottom_sheet_country_list_selected");
                    $(parentUL).find('.ms_bottom_sheet_country_list_selected_label').addClass("ms_bottom_sheet_country_list_name ").removeClass("ms_bottom_sheet_country_list_selected_label");
                    $(ele).find("span").addClass("ms_bottom_sheet_country_list_selected_label").removeClass("ms_bottom_sheet_country_list_name");
                    $(parentUL).find('.ms_bottom_sheet_country_list_selected_icon').hide();
                    $(ele).find('.ms_bottom_sheet_country_list_selected_icon').show("slow");
                    countryCode = $(ele).attr("data-ms-country-code");
                    mobileCode = $(ele).attr("data-ms-country-mobile-code");
                    countryName = $(ele).attr("data-ms-country-name");
                    setTimeout(function () {
                        try {
                            $("#" + id + "_country_code" + uid).val(mobileCode);
                            $("#" + id + "_country_code" + uid).attr("data-ms-country-code", countryCode);
                            $("#" + id + "_country_code" + uid).attr("data-ms-country-mobile-code", mobileCode);
                            $("#" + id + "_country_code" + uid).attr("data-ms-country-name", countryName);
                            if (mService.app.channel === "web") {
                                $(".dropdown_content").slideToggle();
                            } else {
                                $("#" + id + "_bottom_sheet" + uid).toggleClass("active");
                            };
                            mService.widgets.event.change(mService.app.getScreenId(), id, evt, uid);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 1000);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            clearSearch: function (ele, evt) {
                var id,
                uid,
                msLoopInd;
                try {
                    uid = "";
                    id = ele.attr("for");
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                        uid = (uid === "") ? (($(ele).attr("data-ms-widget-uid") === undefined) ? ("") : ($(ele).attr("data-ms-widget-uid"))) : ("");
                        id = uid === "" ? id : id.replace("_" + uid, "");
                        uid = uid === "" ? uid : "_" + uid;
                    };
                    $("#" + id + "_country_search" + uid).val("");
                    $("#" + id + "_clear_btn" + uid).hide();
                    if (mService.widgets.variable.msMobileNumber.dataSrc[id] !== undefined && mService.widgets.variable.msMobileNumber.dataSrc[id].data().length > 0) {
                        $("#" + id + "_country_list_content" + uid).html("");
                        $("#" + id + "_country_list_content" + uid).html(mService.config.template.getRenderedHtml("msCountryCodeListItemTemplate", mService.widgets.variable.msMobileNumber.dataSrc[id].data()));
                    } else {}
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            bottomSheet: function (ele, evt) {
                var id,
                mobileCode,
                dataSource,
                itemIndex,
                parentUL,
                uid,
                msLoopInd,
                dSrcData;
                try {
                    mService.util.isBottomSheetOpen();
                    uid = "";
                    id = ele.attr("for");
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                        uid = (uid === "") ? (($(ele).attr("data-ms-widget-uid") === undefined) ? ("") : ($(ele).attr("data-ms-widget-uid"))) : ("");
                        id = uid === "" ? id : id.replace("_" + uid, "");
                        uid = uid === "" ? uid : "_" + uid;
                    };
                    dataSource = mService.widgets.variable.msMobileNumber.dataSrc[id];
                    dataSource.filter({});
                    dSrcData = dataSource.data();
                    $("#" + id + "_country_search" + uid).val("");
                    $("#" + id + "_clear_btn" + uid).hide();
                    if (dSrcData !== undefined && dSrcData.length > 0) {
                        if ($("#" + id + "_country_code" + uid).val() !== "") {
                            mobileCode = $("#" + id + "_country_code" + uid).val();
                            countryCode = $("#" + id + "_country_code" + uid).attr("data-ms-country-code");
                            countryName = $("#" + id + "_country_code" + uid).attr("data-ms-country-name");
                            dataSource = dSrcData;
                            selectedRecord = $.grep(dataSource, function (e, i) {
                                try {
                                    return e.dial_code === mobileCode;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            })[0];
                            if (selectedRecord !== undefined) {
                                itemIndex = dataSource.indexOf(selectedRecord);
                                if (itemIndex !== 0) {
                                    tempItem = dataSource[itemIndex];
                                    dataSource.splice(itemIndex, 1);
                                    dataSource.unshift(tempItem);
                                };
                                $("#" + id + "_country_list_content" + uid).html(mService.config.template.getRenderedHtml("msCountryCodeListItemTemplate", dataSource));
                                parentUL = $("#" + id + "_country_list_content" + uid);
                                if (mService.app.channel === "mobile") {
                                    $(parentUL).children()[0].scrollIntoView(true);
                                } else {
                                    setTimeout(function () {
                                        try {
                                            $(parentUL).children()[1].scrollIntoViewIfNeeded(true);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, 10);
                                };
                                $(parentUL).find('li').removeClass('ms_bottom_sheet_country_list_selected');
                                $($(parentUL).children()[0]).addClass("ms_bottom_sheet_country_list_selected");
                                $(parentUL).find('.ms_bottom_sheet_country_list_selected_icon').hide();
                                $($(parentUL).children()[0]).find('.ms_bottom_sheet_country_list_selected_icon').show("slow");
                                $(parentUL).find('.ms_bottom_sheet_country_list_selected_label').addClass("ms_bottom_sheet_country_list_name ").removeClass("ms_bottom_sheet_country_list_selected_label");
                                $($(parentUL).children()[0]).find("span").addClass("ms_bottom_sheet_country_list_selected_label").removeClass("ms_bottom_sheet_country_list_name");
                            } else {
                                $("#" + id + "_country_list_content" + uid).html(mService.config.template.getRenderedHtml("msCountryCodeListItemTemplate", dataSource));
                            }
                        } else {
                            $("#" + id + "_country_list_content" + uid).html(mService.config.template.getRenderedHtml("msCountryCodeListItemTemplate", dSrcData));
                        };
                        if (mService.app.channel === "web") {
                            $(".dropdown_content").slideToggle();
                        } else {
                            $("#" + id + "_bottom_sheet" + uid).toggleClass("active");
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            close: function (ele, evt) {
                var id,
                uid,
                msLoopInd;
                try {
                    uid = "";
                    id = ele.attr("for");
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                        uid = (uid === "") ? (($(ele).attr("data-ms-widget-uid") === undefined) ? ("") : ($(ele).attr("data-ms-widget-uid"))) : ("");
                        id = uid === "" ? id : id.replace("_" + uid, "");
                        uid = uid === "" ? uid : "_" + uid;
                    };
                    if (mService.app.channel === "web") {
                        $(".dropdown_content").slideToggle();
                    } else {
                        $("#" + id + "_bottom_sheet" + uid).toggleClass("active");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            search: function (ele) {
                var id,
                uid,
                msLoopInd;
                try {
                    id = $(ele).attr("for");
                    uid = "";
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== "") {
                        uid = $(ele).parent().attr("data-ms-widget-uid") === undefined ? "" : $(ele).parent().attr("data-ms-widget-uid");
                        uid = uid === "" ? uid : "_" + uid;
                    };
                    if ($(ele).val() === "") {
                        $("#" + id + "_clear_btn" + uid).hide("slow");
                        $("#" + id + "_country_list_content" + uid).html(mService.config.template.getRenderedHtml("msCountryCodeListItemTemplate", mService.widgets.variable.msMobileNumber.dataSrc[id].data()));
                    } else {
                        $("#" + id + "_clear_btn" + uid).show("slow");
                        dataSource = mService.widgets.variable.msMobileNumber.dataSrc[id];
                        dataSource.filter({});
                        dataSource.filter({
                            field: "name",
                            operator: "startswith",
                            value: $(ele).val()
                        });
                        dataSource.fetch(function () {
                            var view = dataSource.view();
                            $("#" + id + "_country_list_content" + uid).html("");
                            if (view.length > 0) {
                                $("#" + id + "_country_list_content" + uid).html(mService.config.template.getRenderedHtml("msCountryCodeListItemTemplate", view));
                            } else {
                                $("#" + id + "_country_list_content" + uid).html(mService.config.template.getTransformedHtml("msCountryCodeEmptyStateTemplate"));
                            }
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            countryCodeInput: function (ele, evt) {
                var value,
                uid,
                msLoopInd;
                try {
                    uid = "";
                    id = $(ele).attr("for");
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                        uid = (uid === "") ? (($(ele).attr("data-ms-widget-uid") === undefined) ? ("") : ($(ele).attr("data-ms-widget-uid"))) : ("");
                        id = uid === "" ? id : id.replace("_" + uid, "");
                        uid = uid === "" ? uid : "_" + uid;
                    };
                    value = $(ele).val();
                    if (value !== "") {
                        if ((value.indexOf("+") === -1)) {
                            $(ele).val("+" + value);
                        }
                    } else {
                        mService.widgets.event.change(mService.app.getScreenId(), id, evt, uid);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            countryCodeFocus: function (ele, evt) {
                try {
                    $('body [data-ms-bottomsheet="true"].active').toggleClass("active");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            mobileNumberFocus: function (ele, evt) {
                try {
                    $('body [data-ms-bottomsheet="true"].active').toggleClass("active");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            bottomSheetClose: function () {
                try {
                    $('body [data-ms-bottomsheet="true"].active').toggleClass("active");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        msQrcode: {
            add: function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    window.minterface("ScanQRCode", [], function (result) {
                        try {
                            mService.widgets.init.util.msQrcode.display(ele.attr("for"), result, uid);
                            mService.widgets.event.change(mService.app.getScreenId(), ele.attr("for"), evt);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorMsg) {
                        try {
                            mService.app.showToast("scan_qr_failure", "system_messages");
                            mService.exception.handle(errorMsg);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            delete : function (ele, evt) {
                var id,
                uid;
                try {
                    id = ele.attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), id, ele);
                    uid = uid === "" ? uid : "_" + uid;
                    $("#" + ele.attr("for") + "_result_content" + uid).hide();
                    $("#" + ele.attr("for") + "_result" + uid).text("");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msSearchpopup: {
            clear: function (ele, evt) {
                var id;
                try {
                    id = ele.attr("for");
                    $("#" + id).val("");
                    $("#" + id + "_clear_btn").hide();
                    $("#" + id).attr("data-ms-value", "");
                    $("#" + id).attr("data-ms-valueobj", "");
                    mService.widgets.event.change(mService.app.getScreenId(), id, evt);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            search: function (ele, evt) {
                var id,
                dataSrc,
                filteredData,
                casecadeFromID,
                allowParentChildInd;
                try {
                    allowParentChildInd = true;
                    mService.spinner.show();
                    id = ele.attr("for");
                    casecadeFromID = $("#" + id).attr("data-ms-widget-cascadefrom");
                    if (casecadeFromID !== undefined && casecadeFromID !== "") {
                        if ($("#" + casecadeFromID).attr("data-ms-widget-type") === "msSearchpopup") {
                            if ($("#" + casecadeFromID).attr("data-ms-allownewentry") === "true") {
                                if ($("#" + casecadeFromID).attr("data-ms-value") !== undefined && $("#" + casecadeFromID).attr("data-ms-value") === "") {
                                    allowParentChildInd = false;
                                }
                            }
                        }
                    };
                    if ($("#" + id).val() !== "") {
                        if ($("#" + id).val().length >= parseInt($("#" + id).attr("data-ms-minsearchletters"))) {
                            if ($("#" + id).attr("data-ms-datasrctype") === "cache") {
                                dataSrc = mService.widgets.init.util.getDataSource($("#" + id).attr("data-ms-datasrc"));
                                filteredData = mService.widgets.init.util.msSearchpopup.getFilteredData(id, dataSrc, "cache", allowParentChildInd, casecadeFromID);
                                if (filteredData.length != 0) {
                                    $("#" + id + "_list_content").html(mService.widgets.init.util.msSearchpopup.gethtml(id, filteredData));
                                    mService.widgets.init.util.msSearchpopup.open(id);
                                    mService.spinner.hide();
                                } else {
                                    mService.spinner.hide();
                                    mService.app.showToast("msSearchPopup_data_not_available", "system_messages");
                                }
                            } else {
                                if (window.navigator.onLine) {
                                    filteredData = mService.widgets.init.util.msSearchpopup.getFilteredData(id, dataSrc, "server", allowParentChildInd, casecadeFromID);
                                    if (filteredData.length != 0) {
                                        $("#" + id + "_list_content").html(mService.widgets.init.util.msSearchpopup.gethtml(id, filteredData));
                                        mService.widgets.init.util.msSearchpopup.open(id);
                                        mService.spinner.hide();
                                    } else {
                                        mService.spinner.hide();
                                        mService.app.showToast("msSearchPopup_data_not_available", "system_messages");
                                    }
                                } else {
                                    mService.spinner.hide();
                                    mService.app.showToast("internet_connection_error", "system_messages");
                                }
                            }
                        } else {
                            mService.spinner.hide();
                            mService.app.showToast("msSearchPopup_min_letters_to_search", "system_messages", {
                                minLetters: $("#" + id).attr("data-ms-minsearchletters"),
                            });
                        }
                    } else {
                        mService.spinner.hide();
                        mService.app.showToast("msSearchPopup_empty_search", "system_messages");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submit: function (ele, evt) {
                var id;
                try {
                    id = ele.attr("data-ms-for");
                    $("#" + id).val(ele.attr("data-ms-description"));
                    $("#" + id).attr("data-ms-value", ele.attr("data-ms-value"));
                    $("#" + id).attr("data-ms-valueobj", ele.attr("data-ms-valueobj"));
                    mService.widgets.init.util.msSearchpopup.close(id);
                    mService.widgets.event.change(mService.app.getScreenId(), id, evt);
                    $("#" + id + "_group" + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msSignaturepad: {
            close: function (ele, evt) {
                var widgetID,
                uid;
                try {
                    widgetID = $(ele).attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), widgetID, ele);
                    uid = (uid === undefined || uid === "") ? ("") : ("_" + uid);
                    $("#" + widgetID + "_signature" + uid).signaturePad().clearCanvas();
                    $("#" + widgetID + "_signature_popup").data("kendoWindow").close();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            erase: function (ele, evt) {
                var widgetID,
                uid;
                try {
                    widgetID = $(ele).attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), widgetID, ele);
                    uid = (uid === undefined || uid === "") ? ("") : ("_" + uid);
                    $("#" + widgetID + "_signature" + uid).signaturePad().clearCanvas();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            source: function (ele, evt) {
                var widgetID,
                uid;
                try {
                    Keyboard.hide();
                    mService.spinner.show();
                    widgetID = $(ele).attr("for");
                    uid = mService.widgets.init.util.getUID($(ele).attr("id"), widgetID, ele);
                    uid = (uid === undefined || uid === "") ? ("") : ("_" + uid);
                    $("#" + widgetID + "_signature_popup").html(kendo.template($("#msSignaturepadPopupTemplate").html())({
                            id: widgetID,
                            uid: uid,
                        }));
                    window.minterface("RotateScreen", ["landscape"], function (currentOrientation) {
                        try {
                            $("#" + widgetID + "_signature_popup").attr("data-ms-currentOrientation", currentOrientation === undefined ? "" : currentOrientation);
                            $("#" + widgetID + "_signature" + uid).signaturePad({
                                drawOnly: true,
                                defaultAction: "drawIt",
                                validateFields: false,
                                penWidth: 5,
                                penColour: "#000000",
                                lineWidth: 0,
                                output: null,
                                sigNav: null,
                                name: null,
                                typed: null,
                                clear: "input[type=reset]",
                                typeIt: null,
                                drawIt: null,
                                typeItDesc: null,
                                drawItDesc: null,
                            });
                            setTimeout(function () {
                                try {
                                    $("#" + widgetID + "_sign_submit").attr("data-ms-widget-msloop", widgetID);
                                    $("#" + widgetID + "_sign_submit").attr("data-ms-widget-uid", uid.replace("_", ""));
                                    $("#" + widgetID + "_sign_erase").attr("data-ms-widget-msloop", widgetID);
                                    $("#" + widgetID + "_sign_erase").attr("data-ms-widget-uid", uid.replace("_", ""));
                                    $("#" + widgetID + "_sign_close").attr("data-ms-widget-msloop", widgetID);
                                    $("#" + widgetID + "_sign_close").attr("data-ms-widget-uid", uid.replace("_", ""));
                                    $("#" + widgetID + "_signature_popup").data("kendoWindow").open().center();
                                    mService.spinner.hide();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 300);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorMsg) {
                        try {
                            mService.app.showToast("rotateScreen_error", "system_messages");
                            mService.exception.handle(errorMsg);
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submit: function (ele, evt) {
                var uid,
                clearInd;
                try {
                    clearInd = false;
                    uid = $(ele).attr("data-ms-widget-uid");
                    uid = (uid === undefined || uid === "") ? ("") : ("_" + uid);
                    if ($("#" + ele.attr("for") + "_signature" + uid).signaturePad().validateForm()) {
                        $("#" + ele.attr("for") + "_signature_source" + uid + " img").attr("src", $("#" + ele.attr("for") + "_signature" + uid).signaturePad().getSignatureImage()).show();
                        mService.widgets.event.change(mService.app.getScreenId(), ele.attr("for"), evt);
                        $("#" + ele.attr("for") + "_group" + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                    } else {
                        if ($("#" + ele.attr("for") + "_signature_source" + uid + " img").attr("src") !== "") {
                            clearInd = true;
                        };
                        $("#" + ele.attr("for") + "_signature_source" + uid + " img").attr("src", "").hide();
                        if (clearInd) {
                            mService.widgets.event.change(mService.app.getScreenId(), ele.attr("for"), evt);
                        }
                    };
                    $("#" + ele.attr("for") + "_signature" + uid).signaturePad().clearCanvas();
                    $("#" + ele.attr("for") + "_signature_popup").data("kendoWindow").close();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msSubpage: {
            changing: function (scrID, id, event) {
                var scrObj;
                try {
                    if (mService.util.isContainRScreen(scrID)) {
                        scrObj = mService.containR;
                    } else {
                        scrObj = eval(scrID);
                    };
                    if (scrObj.widget !== undefined && scrObj.widget.changing !== undefined && scrObj.widget.changing[id.replace(scrID + "_", "")] !== undefined) {
                        scrObj.widget.changing[id.replace(scrID + "_", "")](event);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            leftNav: function (ele, evt) {
                var scrID,
                scrollView;
                try {
                    scrID = mService.app.getScreenId();
                    scrollView = $("#" + scrID + "_main_page").data("kendoMobileScrollView");
                    scrollView.scrollTo(scrollView.page - 1);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            rightNav: function (ele, evt) {
                var scrID,
                scrollView;
                try {
                    scrID = mService.app.getScreenId();
                    scrollView = $("#" + scrID + "_main_page").data("kendoMobileScrollView");
                    scrollView.scrollTo(scrollView.page + 1);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        msSlider: {
            change: function (scrID, id, event) {
                var uid,
                msLoopInd;
                try {
                    id = $(event.sender.element[0]).attr("id");
                    uid = "";
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== undefined && msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                        id = uid === "" ? id : id.replace(uid, "");
                    };
                    $("#" + id + "_text" + uid).text($("#" + id + uid).val());
                    mService.widgets.event.change(scrID, id, event);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            slide: function (scrID, id, event) {
                var uid,
                msLoopInd;
                try {
                    id = $(event.sender.element[0]).attr("id");
                    uid = "";
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== undefined && msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                        id = uid === "" ? id : id.replace(uid, "");
                    };
                    $("#" + id + "_text" + uid).text($("#" + id + uid).val());
                    mService.widgets.event.change(scrID, id, event);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        }
    },
    getDataSource: {
        msCheckboxgroup: function (id) {
            try {
                if ($("#" + id).attr("data-ms-widget-uid") !== undefined && $("#" + id).attr("data-ms-widget-uid") !== "") {
                    id = id.replace("_" + $("#" + id).attr("data-ms-widget-uid"), "");
                };
                return mService.widgets.variable.msCheckboxgroup.dataSource[id] !== undefined ? mService.widgets.variable.msCheckboxgroup.dataSource[id] : {};
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (id) {
            try {
                if ($("#" + id).attr("data-ms-widget-uid") !== undefined && $("#" + id).attr("data-ms-widget-uid") !== "") {
                    id = id.replace("_" + $("#" + id).attr("data-ms-widget-uid"), "");
                };
                return mService.widgets.variable.msDropdownlist.dataSource[id] !== undefined ? mService.widgets.variable.msDropdownlist.dataSource[id] : {};
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (id) {
            try {
                if ($("#" + id).attr("data-ms-widget-uid") !== undefined && $("#" + id).attr("data-ms-widget-uid") !== "") {
                    id = id.replace("_" + $("#" + id).attr("data-ms-widget-uid"), "");
                };
                return mService.widgets.variable.msMultiselect.dataSource[id] !== undefined ? mService.widgets.variable.msMultiselect.dataSource[id] : {};
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    getVal: {
        msAttachment: function (id) {
            var index,
            val,
            attachmentFiles,
            msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                val = [];
                attachmentFiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                for (index = 0; index < attachmentFiles.length; index++) {
                    if (mService.app.channel === "web") {
                        val = mService.widgets.variable.msGallery.webImage[id];
                    } else {
                        val.push({
                            name: $(attachmentFiles[index]).attr("data-ms-attachment-name"),
                            category: $(attachmentFiles[index]).attr("data-ms-attachment-category"),
                            type: $(attachmentFiles[index]).attr("data-ms-attachment-type"),
                            path: $(attachmentFiles[index]).attr("data-ms-attachment-path"),
                            extension: $(attachmentFiles[index]).attr("data-ms-attachment-extension"),
                        });
                    }
                };
                return val;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msBarcode: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                return $("#" + id + "_result" + uid).text();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCamera: function (id) {
            var index,
            val,
            imgTiles,
            attachmentInd,
            msLoopInd,
            uid,
            block,
            contentType,
            realBase64Data,
            blob,
            filename,
            file;
            try {
                val = [];
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                imgTiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                for (index = 0; index < imgTiles.length; index++) {
                    if (attachmentInd === "false") {
                        val.push($(imgTiles[index]).attr("data-ms-widget-source"));
                    } else {
                        if (mService.app.channel === "web") {
                            block = $(imgTiles[index]).attr("data-ms-widget-source").split(";");
                            contentType = block[0].split(":")[1];
                            realBase64Data = block[1].split(",")[1];
                            blob = mService.widgets.init.util.msCamera.convertToBlobFile(realBase64Data, contentType);
                            filename = "MS_" + mService.util.date.getDateTimeString(mService.util.date.getNewDate(), "yyyy-MM-dd-HHmmssfff") + index.toString() + ".jpg";
                            file = mService.widgets.init.util.msCamera.convertBlobToJPGFile(blob, filename);
                            val.push({
                                name: filename,
                                type: "image",
                                file: file,
                                extension: ".jpg",
                            });
                        } else {
                            val.push({
                                name: $(imgTiles[index]).attr("data-ms-attachment-name"),
                                category: $(imgTiles[index]).attr("data-ms-attachment-category"),
                                type: $(imgTiles[index]).attr("data-ms-attachment-type"),
                                path: $(imgTiles[index]).attr("data-ms-attachment-path"),
                                extension: $(imgTiles[index]).attr("data-ms-attachment-extension"),
                                thumbnail: $(imgTiles[index]).attr("data-ms-attachment-thumbnail")
                            });
                        }
                    }
                };
                return val;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckbox: function (id) {
            try {
                return $("#" + id).prop("checked");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckboxgroup: function (id) {
            var checkedvalue,
            msLoopInd,
            uid;
            try {
                checkedvalue = [];
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                $('[name="' + id + "_input" + uid + '"]:checked').each(function () {
                    try {
                        checkedvalue.push($(this).val());
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                return checkedvalue;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCombobox: function (id) {
            try {
                return $("#" + id).data("kendoComboBox").value();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDatebox: function (id) {
            try {
                return ($("#" + id).data("kendoDatePicker").value() === null) ? ("") : ($("#" + id).data("kendoDatePicker").value());
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDisplaybox: function (id) {
            try {
                return $("#" + id).text();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (id) {
            try {
                return $("#" + id).data("kendoDropDownList").value();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGallery: function (id) {
            var index,
            val,
            imgTiles,
            attachmentInd,
            msLoopInd,
            uid;
            try {
                val = [];
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                imgTiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                for (index = 0; index < imgTiles.length; index++) {
                    if (attachmentInd === "false") {
                        val.push($(imgTiles[index]).attr("data-ms-widget-source"));
                    } else {
                        if (mService.app.channel === "web") {
                            val = mService.widgets.variable.msGallery.webImage[id];
                        } else {
                            val.push({
                                name: $(imgTiles[index]).attr("data-ms-attachment-name"),
                                category: $(imgTiles[index]).attr("data-ms-attachment-category"),
                                type: $(imgTiles[index]).attr("data-ms-attachment-type"),
                                path: $(imgTiles[index]).attr("data-ms-attachment-path"),
                                extension: $(imgTiles[index]).attr("data-ms-attachment-extension"),
                                thumbnail: $(imgTiles[index]).attr("data-ms-attachment-thumbnail")
                            });
                        }
                    }
                };
                return val;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGeotag: function (id) {
            var uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                return $("#" + id + uid).attr("data-ms-value");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msFlipswitch: function (id) {
            try {
                return $("#" + id).data("kendoSwitch").value();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImagepicker: function (id) {
            var index,
            val,
            imgTiles,
            attachmentInd,
            msLoopInd,
            uid;
            try {
                val = [];
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                imgTiles = $("#" + id + "_src" + uid + " [data-ms-widget-source]");
                attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                for (index = 0; index < imgTiles.length; index++) {
                    if (attachmentInd === "false") {
                        val.push($(imgTiles[index]).attr("data-ms-widget-source"));
                    } else {
                        if (mService.app.channel === "web") {
                            val = mService.widgets.variable.msGallery.webImage[id];
                        } else {
                            val.push({
                                name: $(imgTiles[index]).attr("data-ms-attachment-name"),
                                category: $(imgTiles[index]).attr("data-ms-attachment-category"),
                                type: $(imgTiles[index]).attr("data-ms-attachment-type"),
                                path: $(imgTiles[index]).attr("data-ms-attachment-path"),
                                extension: $(imgTiles[index]).attr("data-ms-attachment-extension"),
                                thumbnail: $(imgTiles[index]).attr("data-ms-attachment-thumbnail")
                            });
                        }
                    }
                };
                return val;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImageviewer: function (id) {
            try {
                return $("#" + id + "_widget").attr("data-ms-widget-source");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msLoop: function (id) {
            var scrID,
            returnValue,
            msLoopBlocks,
            blockIndex;
            try {
                returnValue = [];
                scrID = mService.app.getScreenId();
                msLoopBlocks = $("#" + id + "_content [data-ms-widget-msloopblock]");
                for (blockIndex = 0; blockIndex < msLoopBlocks.length; blockIndex++) {
                    var blockID = $(msLoopBlocks[blockIndex]).attr("id");
                    returnValue[blockIndex] = mService.widgets.init.util.msLoop.getValues(blockID, scrID);
                };
                return returnValue;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMlingualtextarea: function (id) {
            var returnObj;
            try {
                returnObj = {};
                returnObj[mService.user.profile.login.locale_id.substring(0, 2)] = $("#" + id).val().replace(/"/g, '\\"');
                if (mService.user.profile.login.locale_id.substring(0, 2) !== mService.user.profile.login.default_locale_id.substring(0, 2)) {
                    returnObj[mService.user.profile.login.default_locale_id.substring(0, 2)] = $("#" + id + "_default_locale").val().replace(/"/g, '\\"');
                };
                return returnObj;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMobileNumber: function (id) {
            var countryCode,
            mobileNumber,
            returnValue,
            msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                returnValue = "";
                countryCode = $("#" + id + "_country_code" + uid).val().replace(/"/g, '\\"');
                mobileNumber = $("#" + id + uid).val().replace(/"/g, '\\"');
                if (countryCode !== "" && mobileNumber !== "") {
                    returnValue = countryCode + "-" + mobileNumber;
                } else {
                    returnValue = "";
                };
                return returnValue;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (id) {
            try {
                return $("#" + id).data("kendoMultiSelect").value();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msNumerictextbox: function (id) {
            try {
                return $("#" + id).data("kendoNumericTextBox").value() === null ? 0 : $("#" + id).data("kendoNumericTextBox").value();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msParentgroup: function (id) {
            var inputValObj = {},
            index,
            fieldList,
            scrID,
            timeBoxValue;
            try {
                scrID = mService.app.getScreenId();
                fieldList = $("#" + id + "_content").find(mService.widgets.init.wSelector);
                for (index = 0; index < fieldList.length; index++) {
                    var fieldID = $(fieldList[index]).attr("id").replace(scrID + "_", "");
                    if ($(fieldList[index]).attr("data-ms-widget-type") === "msDatebox" || $(fieldList[index]).attr("data-ms-widget-type") === "msTimebox") {
                        if ($(fieldList[index]).attr("data-ms-widget-type") === "msDatebox") {
                            inputValObj[fieldID] = $(fieldList[index]).getVal() === null ? "" : mService.util.getDateTimeString($(fieldList[index]).getVal(), "yyyy-MM-dd");
                        } else {
                            timeBoxValue = $(fieldList[index]).getVal() === null ? "" : mService.util.getDateTimeString($(fieldList[index]).getVal(), "HH:mm:ss");
                            if (timeBoxValue !== "") {
                                timeBoxValue = timeBoxValue.split(":");
                                inputValObj[fieldID + "_hour"] = timeBoxValue[0].trim();
                                inputValObj[fieldID + "_minute"] = timeBoxValue[1].trim();
                                inputValObj[fieldID + "_second"] = timeBoxValue[2].trim();
                            } else {
                                inputValObj[fieldID + "_hour"] = "";
                                inputValObj[fieldID + "_minute"] = "";
                                inputValObj[fieldID + "_second"] = "";
                            }
                        }
                    } else {
                        inputValObj[fieldID] = $(fieldList[index]).getVal() === null ? "" : $(fieldList[index]).getVal();
                    }
                };
                return inputValObj;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msQrcode: function (id) {
            try {
                return $("#" + id).attr("data-ms-value");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRadiogroup: function (id) {
            var uid,
            msLoopInd;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                return $("[name = '" + id + "_input" + uid + "']:checked").val() === undefined ? "" : $("[name = '" + id + "_input" + uid + "']:checked").val();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRating: function (id) {
            try {
                return $("#" + id).data("kendoRating").value() === null ? "0" : $("#" + id).data("kendoRating").value().toString();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSearchpopup: function (id) {
            var returnVal;
            try {
                if ($("#" + id).attr("data-ms-allownewentry") === "false") {
                    returnVal = $("#" + id).attr("data-ms-value");
                } else {
                    if ($("#" + id).attr("data-ms-value") !== undefined && $("#" + id).attr("data-ms-value") !== "") {
                        returnVal = $("#" + id).attr("data-ms-value");
                    } else {
                        returnVal = $("#" + id).val().replace(/"/g, '\\"');
                    }
                };
                return returnVal;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSignaturepad: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace("_" + uid, "");
                    uid = uid === "" ? uid : "_" + uid;
                };
                return $("#" + id + "_signature_source" + uid + " img").attr("src");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSlider: function (id) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                return $("#" + id + uid).data("kendoSlider").value();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextarea: function (id) {
            try {
                return $("#" + id).val().replace(/"/g, '\\"');
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextbox: function (id) {
            try {
                return $("#" + id).val().replace(/"/g, '\\"');
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimebox: function (id) {
            try {
                return ($("#" + id).data("kendoTimePicker").value() === null) ? ("") : ($("#" + id).data("kendoTimePicker").value());
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    getValObject: {
        msCombobox: function (id, key) {
            try {
                return $("#" + id).attr("data-ms-valueobj") !== "" ? key !== "" && key !== undefined ? JSON.parse($("#" + id).attr("data-ms-valueobj"))[key] : JSON.parse($("#" + id).attr("data-ms-valueobj")) : "";
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (id, key) {
            try {
                return $("#" + id).attr("data-ms-valueobj") !== "" ? key !== "" && key !== undefined ? JSON.parse($("#" + id).attr("data-ms-valueobj"))[key] : JSON.parse($("#" + id).attr("data-ms-valueobj")) : "";
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (id, key) {
            var selectedValues,
            valObj,
            valStr,
            dataSource;
            try {
                valObj = [];
                dataSource = $("#" + id).getDataSource();
                dataSource = dataSource.data();
                selectedValues = $("#" + id).getVal();
                if (selectedValues.length > 0) {
                    for (var i = 0; i < selectedValues.length; i++) {
                        for (var j = 0; j < dataSource.length; j++) {
                            if (dataSource[j]["code"] === selectedValues[i]) {
                                if (dataSource[j][key] !== undefined) {
                                    valObj.push(dataSource[j][key]);
                                }
                            }
                        }
                    }
                }
                return valObj.join(",");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSearchpopup: function (id, key) {
            try {
                return $("#" + id).attr("data-ms-valueobj") !== "" ? key !== "" && key !== undefined ? JSON.parse($("#" + id).attr("data-ms-valueobj"))[key] : JSON.parse($("#" + id).attr("data-ms-valueobj")) : "";
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    hide: function (id) {
        var wType,
        msLoopInd,
        uid;
        uid = "";
        try {
            msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
            if (msLoopInd !== undefined && msLoopInd !== "") {
                uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                id = uid === "" ? id : id.replace(uid, "");
            };
            wType = $("#" + id + uid).attr("data-ms-widget-type");
            if (wType === "msDisplaybox" || wType === "msButton") {
                if (mService.app.channel === "web") {
                    $("#" + id + "_group" + uid).hide();
                } else {
                    $("#" + id + uid).hide();
                }
            } else {
                $("#" + id + "_group" + uid).hide();
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    init: {
        msAttachment: function (inputObj) {
            var creationObj;
            try {
                mService.widgets.init.util.loadTemplate("msAttachmentTemplate");
                creationObj = {};
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "12";
                inputObj.maxlimit = inputObj.maxlimit === undefined ? "" : inputObj.maxlimit;
                inputObj.minlimit = inputObj.minlimit === undefined ? "0" : inputObj.minlimit;
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.mandatory = inputObj.mandatory === undefined ? "false" : inputObj.mandatory;
                inputObj.filesizekey = inputObj.filesizekey === undefined ? "" : inputObj.filesizekey;
                inputObj.fileextensionkey = inputObj.fileextensionkey === undefined ? "" : inputObj.fileextensionkey;
                inputObj.attachmentind = inputObj.attachmentind === undefined ? "false" : inputObj.attachmentind;
                creationObj.multiple = inputObj.multiple === undefined ? true : eval(inputObj.multiple);
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msAttachmentTemplate", inputObj));
                $("#" + inputObj.id + "_preview_popup_content").html(kendo.template($("#msAttachmentPopupTemplate").html())({
                        id: inputObj.id,
                    }));
                if (mService.app.channel === "web") {
                    mService.widgets.variable.msGallery.webImage[inputObj.id] = [];
                    $("#" + inputObj.id + "_file_picker").kendoUpload(creationObj);
                    var btn = $("#" + inputObj.id + "_group").find(".k-upload-button");
                    $(btn).find("span").text("");
                    mService.home.userAttachment.util.getAttachmentControlPanel();
                    $("#" + inputObj.id + "_file_picker").data("kendoUpload").bind("select", function (event) {
                        var index,
                        extensionCheckIndicator,
                        sizeCheckIndicator,
                        changeIndicator,
                        allowedFileExtensions,
                        fileObj,
                        fileData,
                        imgCount,
                        count,
                        reader;
                        try {
                            setTimeout(function () {
                                try {
                                    $("#" + inputObj.id + "_group").find(".k-upload-files").hide();
                                    changeIndicator = true;
                                    for (index = 0; index < event.files.length; index++) {
                                        if (index === 0) {
                                            allowedFileExtensions = [];
                                            extensionCheckIndicator = $.grep(mService.home.userAttachment.allowedFileExtensions, function (e, i) {
                                                try {
                                                    allowedFileExtensions.push(e.extension);
                                                    return (e.extension.toLowerCase() === event.files[index].extension.toLowerCase());
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            })[0];
                                            if (extensionCheckIndicator === undefined) {
                                                mService.app.alert("info", {
                                                    scrid: "",
                                                    lblid: "fileExtensionCheck",
                                                    lblgrpid: "attachment",
                                                    key: allowedFileExtensions.join(),
                                                });
                                                event.preventDefault();
                                                changeIndicator = false;
                                                break;
                                            };
                                            sizeCheckIndicator = $.grep(mService.home.userAttachment.allowedFileSize, function (e, i) {
                                                try {
                                                    return e.category === extensionCheckIndicator.category;
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            })[0];
                                            if (event.files[index].size > parseInt(sizeCheckIndicator.size) * 1024 * 1024) {
                                                mService.app.alert("info", {
                                                    scrid: "",
                                                    lblid: "fileSizeCheck",
                                                    lblgrpid: "attachment",
                                                    key: sizeCheckIndicator.size,
                                                });
                                                event.preventDefault();
                                                changeIndicator = false;
                                                break;
                                            };
                                            event.files[index].category = extensionCheckIndicator.category;
                                            event.files[index].type = extensionCheckIndicator.type;
                                            event.files[index].name = event.files[index].rawFile.name;
                                            fileObj = {
                                                name: event.files[index].name,
                                                type: event.files[index].type,
                                                category: event.files[index].category,
                                                file: event.files[index].rawFile,
                                                extension: event.files[index].extension,
                                            };
                                            imgCount = $("#" + inputObj.id).attr("data-ms-widget-imgcount");
                                            count = (imgCount === undefined) ? (1) : (parseInt(imgCount) + 1);
                                            fileData = {};
                                            mService.widgets.variable.msGallery.webImage[inputObj.id].push(fileObj);
                                            if (fileObj.category === "I" || fileObj.category === "V" || fileObj.category === "A" || fileObj.category === "P") {
                                                reader = new FileReader();
                                                reader.addEventListener("load", function () {
                                                    fileObj.thumbnail = reader.result;
                                                    mService.widgets.init.util.msAttachment.loadFile(inputObj.id, fileObj, "");
                                                });
                                                reader.readAsDataURL(event.files[index].rawFile);
                                            } else {
                                                mService.widgets.init.util.msAttachment.loadFile(inputObj.id, fileObj, "");
                                            }
                                        }
                                    };
                                    if (changeIndicator === true) {
                                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                                    };
                                    $("#" + inputObj.id).attr("data-ms-process-in-action", "false");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 10);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    $("#" + inputObj.id + "_file_picker").bind("click", function (event) {
                        try {
                            setTimeout(function () {
                                try {
                                    $("#" + inputObj.id).attr("data-ms-process-in-action", "false");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 10);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msAudioplayer: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msAudioplayerTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).append(mService.config.template.getTransformedHtml("msAudioplayerTemplate", inputObj));
                setTimeout(function () {
                    try {
                        $("#" + inputObj.id + "_widget").load();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, 500);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msBarcode: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msBarcodeTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msBarcodeTemplate", inputObj));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msButton: function (inputObj) {
            try {
                $("#" + inputObj.id).click(function (e) {
                    mService.widgets.event.msButton.click(inputObj.scrid, inputObj.id, e);
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCamera: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msCameraTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.maxlimit = inputObj.maxlimit === undefined ? "" : inputObj.maxlimit;
                inputObj.minlimit = inputObj.minlimit === undefined ? "0" : inputObj.minlimit;
                inputObj.attachmentind = inputObj.attachmentind === undefined ? "false" : inputObj.attachmentind;
                inputObj.filesizekey = inputObj.filesizekey === undefined ? "" : inputObj.filesizekey;
                inputObj.fileextensionkey = inputObj.fileextensionkey === undefined ? "" : inputObj.fileextensionkey;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msCameraTemplate", inputObj));
                $("#" + inputObj.id + "_preview_popup_content").html("");
                $("#" + inputObj.id + "_preview_popup_content").html(kendo.template($("#msCameraPopupTemplate").html())({
                        id: inputObj.id,
                    }));
                if (mService.app.channel === "web") {
                    mService.widgets.variable.msGallery.webImage[inputObj.id] = [];
                    $("#" + inputObj.id + "_web_camera_popup_content").html(kendo.template($("#msWebCameraPopupTemplate").html())({
                            id: inputObj.id,
                        }));
                    $("#" + inputObj.id + "_camera_button_container").hide();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msChat: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msChatTemplate");
                mService.widgets.init.util.loadTheme("msChat");
                mService.widgets.variable.msChat.variable[inputObj.id] = {};
                inputObj.scrID = inputObj.scrid === undefined ? mService.app.getScreenId() : inputObj.scrid;
                inputObj.key = inputObj.key === undefined ? "" : inputObj.key;
                inputObj.subKey = inputObj.subKey === undefined ? "" : inputObj.subKey;
                inputObj.custom = inputObj.custom === undefined ? {}
                 : inputObj.custom;
                mService.widgets.variable.msChat.variable[inputObj.id].key = inputObj.key;
                mService.widgets.variable.msChat.variable[inputObj.id].subKey = inputObj.subKey;
                mService.widgets.variable.msChat.variable[inputObj.id].custom = inputObj.custom;
                mService.widgets.variable.msChat.variable[inputObj.id].from = {};
                mService.widgets.init.util.msChat.setMsgFromDetails(inputObj.id);
                mService.widgets.variable.msChat.variable[inputObj.id].to = "";
                mService.widgets.variable.msChat.variable[inputObj.id].scrID = inputObj.scrID;
                mService.widgets.variable.msChat.variable[inputObj.id].msgType = "";
                mService.widgets.variable.msChat.variable[inputObj.id].content = "";
                mService.widgets.variable.msChat.variable[inputObj.id].suggestions = "";
                mService.widgets.variable.msChat.variable[inputObj.id].attachment = {};
                mService.widgets.variable.msChat.variable[inputObj.id].attachment.name = "";
                mService.widgets.variable.msChat.variable[inputObj.id].attachment.type = "";
                mService.widgets.variable.msChat.variable[inputObj.id].attachment.src = "";
                mService.widgets.variable.msChat.variable[inputObj.id].translations = "";
                mService.widgets.variable.msChat.variable[inputObj.id].autoReply = "";
                mService.widgets.variable.msChat.variable[inputObj.id].info = "";
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msChatTemplate", inputObj));
                $("#" + inputObj.id).kendoChat({
                    user: {
                        iconUrl: mService.app.channel === "mobile" ? "../lib/mservice/styles/image/user_profile.png" : "www/lib/mservice/styles/image/user_profile.png",
                    },
                });
                mService.widgets.variable.msChat.widget[inputObj.id] = $("#" + inputObj.id).data("kendoChat");
                mService.widgets.variable.msChat.widget[inputObj.id].messageBox.destroy();
                mService.widgets.init.util.msChat.registerChatTemplates(inputObj.id);
                mService.widgets.init.util.msChat.convertMessageBox(inputObj.id);
                if (mService.widgets.variable.msChat.variable[inputObj.id].subKey === "") {
                    $("#" + inputObj.id + "_chat_header").parent().css("display", "none");
                    mService.widgets.init.util.msChat.setupNewChat(inputObj.id);
                } else {
                    if (inputObj.selectedRecord !== undefined && inputObj.selectedRecord !== "") {
                        mService.widgets.init.util.msChat.loadHeader(inputObj.id, inputObj.selectedRecord)
                    };
                    mService.widgets.init.util.msChat.setupOldChat(inputObj.id);
                };
                if (mService.app.channel === "web") {
                    setTimeout(function () {
                        try {
                            mService.widgets.init.util.msChat.loadToolbar(inputObj.id);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 50);
                } else {
                    $("#" + inputObj.id + "_preview_popup_content").html(mService.config.template.getTransformedHtml("mschatPreviewPopupTemplate", {
                            id: inputObj.id,
                        }));
                };
                var input = document.getElementById(inputObj.id + "_message_box");
                input.addEventListener("input", function () {
                    if ($("#" + inputObj.id + "_message_box").html().trim() !== "") {
                        $("#" + inputObj.id + "_attachment").hide();
                        $("#" + inputObj.id + "_camera").hide();
                    } else {
                        $("#" + inputObj.id + "_attachment").show();
                        $("#" + inputObj.id + "_camera").show();
                    }
                });
                input.addEventListener("focus", function () {
                    this.classList.add("is-focused");
                });
                input.addEventListener("blur", function () {
                    this.classList.remove("is-focused");
                });
                if (mService.app.channel === "web") {
                    if ($("#" + inputObj.id + "_actions_container").is(":visible")) {
                        $("#" + inputObj.id).css("padding-bottom", "9em");
                    } else {
                        $("#" + inputObj.id).css("padding-bottom", "4em");
                    };
                    $("#" + inputObj.id + "_message_box").keydown(function (event) {
                        if (event.keyCode == 13 && !event.shiftKey) {
                            mService.widgets.event.msChat.sendMessage($("#" + inputObj.id + "_message_box"), event);
                            return false;
                        }
                    });
                    $("#" + inputObj.id + "_message_box_send").attr("data-ms-widget-type", "msWidget").attr("data-ms-widget-group", "msChat").attr("data-ms-widget-role", "sendMessage").attr("data-ms-for", inputObj.id);
                } else {
                    $("#" + inputObj.id + "_message_box_send").attr("data-ms-widget-type", "msWidget").attr("data-ms-widget-group", "msChat").attr("data-ms-widget-role", "sendMessage").attr("data-ms-for", inputObj.id);
                };
                mService.presentR.resource.applyWatermarkBg(inputObj.id);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckbox: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msCheckboxTemplate");
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj = mService.widgets.init.util.getCheckboxProperties(inputObj);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msCheckboxTemplate", inputObj));
                $("#" + inputObj.id).on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckboxgroup: function (inputObj) {
            var dataSource,
            data;
            try {
                mService.widgets.init.util.loadTemplate("msCheckboxgroupTemplate");
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.stack = inputObj.stack === undefined ? false : eval(inputObj.stack);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.updatefield = inputObj.updatefield === undefined ? "" : inputObj.updatefield;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msCheckboxgroupTemplate", inputObj));
                dataSource = mService.widgets.init.util.getDataSource(inputObj.datasrc);
                mService.widgets.variable.msCheckboxgroup.dataSource[inputObj.id] = dataSource;
                mService.widgets.init.util.createCheckBoxGroup(inputObj, dataSource.data());
                $('input[name="' + inputObj.id + '_input"]').on("change", function (event) {
                    try {
                        mService.widgets.event.msCheckboxgroup.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCombobox: function (inputObj) {
            var creationObj,
            dataItem;
            try {
                mService.widgets.init.util.loadTemplate("msComboboxTemplate");
                creationObj = {};
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                creationObj.dataTextField = inputObj.textfield;
                creationObj.dataValueField = inputObj.valuefield;
                creationObj.placeholder = "---Select---";
                creationObj.template = "${data." + inputObj.valuefield + "}" + " - " + "${data." + inputObj.textfield + "}";
                if (inputObj.template === "value") {
                    creationObj.template = "${data." + inputObj.valuefield + "}";
                } else if (inputObj.template === "text") {
                    creationObj.template = "${data." + inputObj.textfield + "}";
                };
                creationObj.filter = "contains";
                creationObj.dataSource = mService.widgets.init.util.getDataSource(inputObj.datasrc);
                inputObj.cascadefrom = inputObj.cascadefrom !== undefined ? inputObj.cascadefrom : "";
                inputObj.cascadefromfield = inputObj.cascadefromfield !== undefined ? inputObj.cascadefromfield : "";
                if (inputObj.cascadefrom !== undefined) {
                    creationObj.cascadeFrom = inputObj.cascadefrom;
                };
                if (inputObj.cascadefromfield !== undefined) {
                    creationObj.cascadeFromField = inputObj.cascadefromfield;
                };
                creationObj.popup = {
                    appendTo: $("#" + inputObj.id + "_group"),
                    anchor: $("#" + inputObj.id + "_group"),
                    position: "top left",
                };
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msComboboxTemplate", inputObj));
                $("#" + inputObj.id).kendoComboBox(creationObj);
                $("#" + inputObj.id).data("kendoComboBox").bind("change", function (event) {
                    try {
                        dataItem = $("#" + inputObj.id).data("kendoComboBox").dataItem();
                        $("#" + inputObj.id).attr("data-ms-valueobj", dataItem !== undefined ? JSON.stringify(dataItem) : "");
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                if (inputObj.cascadefrom !== undefined && inputObj.cascadefrom !== "") {
                    $("#" + inputObj.id).disable();
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDatebox: function (inputObj) {
            var creationObj,
            dateSplit;
            try {
                mService.widgets.init.util.loadTemplate("msDateboxTemplate");
                creationObj = {};
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                creationObj.dateInput = inputObj.dateinput === undefined ? false : eval(inputObj.dateinput);
                creationObj.weekNumber = inputObj.weeknumber === undefined ? false : eval(inputObj.weeknumber);
                creationObj.format = inputObj.format === undefined ? "yyyy-MM-dd" : inputObj.format;
                if (inputObj.min !== undefined && inputObj.min !== "") {
                    if (((inputObj.min).indexOf("-") !== -1)) {
                        dateSplit = inputObj.min.split("-");
                        creationObj.min = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]));
                    } else {
                        creationObj.min = new Date(1900, 0, 1);
                        console.error("msDatebox-init-Min: separator should be '-' in given value " + inputObj.min);
                    }
                } else {
                    creationObj.min = new Date(1900, 0, 1);
                };
                if (inputObj.max !== undefined && inputObj.max !== "") {
                    if (((inputObj.max).indexOf("-") !== -1)) {
                        dateSplit = inputObj.max.split("-");
                        creationObj.max = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]));
                    } else {
                        creationObj.max = new Date(2099, 11, 31);
                        console.error("msDatebox-init-Max: separator should be '-' in given value " + inputObj.max);
                    }
                } else {
                    creationObj.max = new Date(2099, 11, 31);
                };
                creationObj.popup = {
                    appendTo: $("#" + inputObj.id + "_group"),
                    anchor: $("#" + inputObj.id + "_group"),
                    position: "top left",
                };
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msDateboxTemplate", inputObj));
                $("#" + inputObj.id).kendoDatePicker(creationObj);
                $("#" + inputObj.id).data("kendoDatePicker").bind("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                $("#" + inputObj.id).data("kendoDatePicker").bind("open", function (event) {
                    try {
                        if (mService.app.channel !== "web") {
                            document.activeElement.blur();
                            Keyboard.hide();
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                $("#" + inputObj.id).focus(function () {
                    $("#" + inputObj.id).data("kendoDatePicker").close();
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDialog: function (inputObj) {
            var creationObj,
            primaryFlag,
            obj;
            try {
                creationObj = {};
                creationObj.actions = [];
                primaryFlag = false;
                for (var key in inputObj.actions) {
                    obj = {};
                    obj["text"] = inputObj.actions[key].text;
                    obj["action"] = inputObj.actions[key].action;
                    if (primaryFlag === false) {
                        if (inputObj.actions[key].primaryFlag !== undefined && inputObj.actions[key].primaryFlag === true) {
                            primaryFlag = true;
                            obj["primary"] = inputObj.actions[key].primary;
                        } else {
                            obj["primary"] = inputObj.actions[key].primary;
                        }
                    } else {
                        obj["primary"] = false;
                    };
                    creationObj.actions.push(obj);
                };
                creationObj.title = false;
                creationObj.closable = false;
                creationObj.content = inputObj.content;
                creationObj.close = function (e) {
                    try {
                        this.destroy();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                };
                creationObj.animation = {
                    open: {
                        effects: "fade:in",
                    },
                };
                $("<div></div>").kendoDialog(creationObj).data("kendoDialog").open();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDisplaybox: function (inputObj) {
            var msLoopId;
            try {
                if (mService.app.channel === "web") {
                    mService.widgets.init.util.loadTemplate("msDisplayboxTemplate");
                    inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                    inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                    $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msDisplayboxTemplate", inputObj));
                } else {
                    msLoopId = $("#" + inputObj.id).attr("data-ms-widget-prop-msloop");
                    msLoopId = msLoopId === undefined ? "" : msLoopId;
                    $("#" + inputObj.id).attr("data-ms-widget-msloop", msLoopId);
                    $("#" + inputObj.id).removeAttr("data-ms-widget-prop-msloop");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (inputObj) {
            var creationObj,
            dataItem,
            dataSource;
            try {
                mService.widgets.init.util.loadTemplate("msDropdownlistTemplate");
                creationObj = {};
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                creationObj.dataTextField = inputObj.textfield;
                creationObj.dataValueField = inputObj.valuefield;
                creationObj.optionLabel = "--Select--";
                creationObj.template = "${data." + inputObj.valuefield + "}" + " - " + "${data." + inputObj.textfield + "}";
                if (inputObj.template === "value") {
                    creationObj.template = "${data." + inputObj.valuefield + "}";
                } else if (inputObj.template === "text") {
                    creationObj.template = "${data." + inputObj.textfield + "}";
                };
                dataSource = mService.widgets.init.util.getDataSource(inputObj.datasrc)
                    creationObj.dataSource = dataSource;
                mService.widgets.variable.msDropdownlist.dataSource[inputObj.id] = dataSource;
                inputObj.cascadefrom = inputObj.cascadefrom !== undefined ? inputObj.cascadefrom : "";
                inputObj.cascadefromfield = inputObj.cascadefromfield !== undefined ? inputObj.cascadefromfield : "";
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msDropdownlistTemplate", inputObj));
                $("#" + inputObj.id).kendoDropDownList(creationObj);
                $("#" + inputObj.id).data("kendoDropDownList").bind("change", function (event) {
                    var msLoopInd,
                    uid;
                    try {
                        uid = "";
                        if (event !== undefined && ($(event.sender.element).attr("data-ms-widget-msloop") !== undefined || $(event.sender.element).attr("data-ms-widget-msloop") !== "" || $("#" + event.target.id).attr("data-ms-widget-msloop") !== undefined || $("#" + event.target.id).attr("data-ms-widget-msloop") !== "")) {
                            if (event !== undefined) {
                                if (event.target !== undefined) {
                                    if ($("#" + event.target.id).attr("data-ms-widget-msloop") !== undefined || $("#" + event.target.id).attr("data-ms-widget-msloop") !== "") {
                                        uid = $("#" + event.target.id).attr("data-ms-widget-uid");
                                    }
                                } else {
                                    if (event.sender !== undefined && event.sender.element !== undefined) {
                                        if ($(event.sender.element).attr("data-ms-widget-msloop") !== undefined || $(event.sender.element).attr("data-ms-widget-msloop") !== "") {
                                            uid = $(event.sender.element).attr("data-ms-widget-uid");
                                        }
                                    }
                                }
                            }
                        };
                        uid = (uid === undefined || uid === "") ? ("") : ("_" + uid);
                        dataItem = $("#" + inputObj.id + uid).data("kendoDropDownList").dataItem();
                        $("#" + inputObj.id + uid).attr("data-ms-valueobj", dataItem !== undefined ? JSON.stringify(dataItem) : "");
                        if (mService.app.channel === "web") {
                            widgetList = $("#" + mService.app.getScreenId() + "_container").find("[data-ms-widget-cascadefrom='" + inputObj.id + uid + "']");
                        } else {
                            widgetList = $("#" + mService.app.getScreenId()).find("[data-ms-widget-cascadefrom='" + inputObj.id + uid + "']");
                        }
                        if (widgetList.length > 0) {
                            for (var i = 0; i < widgetList.length; i++) {
                                $("#" + $(widgetList[i]).attr("id")).setVal("");
                                $("#" + $(widgetList[i]).attr("id")).disable();
                            }
                        }
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                if (inputObj.cascadefrom !== undefined && inputObj.cascadefrom !== "") {
                    $("#" + inputObj.id).disable();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGallery: function (inputObj) {
            var creationObj;
            try {
                creationObj = {};
                mService.widgets.init.util.loadTemplate("msGalleryTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.maxlimit = inputObj.maxlimit === undefined ? "" : inputObj.maxlimit;
                inputObj.minlimit = inputObj.minlimit === undefined ? "0" : inputObj.minlimit;
                inputObj.attachmentind = inputObj.attachmentind === undefined ? "false" : inputObj.attachmentind;
                inputObj.filesizekey = inputObj.filesizekey === undefined ? "" : inputObj.filesizekey;
                inputObj.fileextensionkey = inputObj.fileextensionkey === undefined ? "" : inputObj.fileextensionkey;
                creationObj.multiple = inputObj.multiple === undefined ? true : eval(inputObj.multiple);
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msGalleryTemplate", inputObj));
                $("#" + inputObj.id + "_preview_popup_content").html("");
                $("#" + inputObj.id + "_preview_popup_content").html(kendo.template($("#msGalleryPopupTemplate").html())({
                        id: inputObj.id,
                    }));
                if (mService.app.channel === "web") {
                    mService.widgets.variable.msGallery.webImage[inputObj.id] = [];
                    $("#" + inputObj.id + "_file_picker").kendoUpload(creationObj);
                    var btn = $("#" + inputObj.id + "_group").find(".k-upload-button");
                    $(btn).find("span").text("");
                    mService.home.userAttachment.util.getAttachmentControlPanel();
                    $("#" + inputObj.id + "_file_picker").data("kendoUpload").bind("select", function (event) {
                        var index,
                        extensionCheckIndicator,
                        sizeCheckIndicator,
                        changeIndicator,
                        allowedFileExtensions,
                        imageObj,
                        fileData,
                        imgCount,
                        count,
                        reader;
                        try {
                            setTimeout(function () {
                                try {
                                    $("#" + inputObj.id).attr("data-ms-process-in-action", "false");
                                    $("#" + inputObj.id + "_group").find(".k-upload-files").hide();
                                    changeIndicator = true;
                                    for (index = 0; index < event.files.length; index++) {
                                        if (index === 0) {
                                            if (event.files[index].extension.toLowerCase() === ".png" || event.files[index].extension.toLowerCase() === ".jpg" || event.files[index].extension.toLowerCase() === ".heic" || event.files[index].extension.toLowerCase() === ".jpeg") {
                                                allowedFileExtensions = [];
                                                extensionCheckIndicator = $.grep(mService.home.userAttachment.allowedFileExtensions, function (e, i) {
                                                    try {
                                                        allowedFileExtensions.push(e.extension);
                                                        return (e.extension.toLowerCase() === event.files[index].extension.toLowerCase());
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                })[0];
                                                if (extensionCheckIndicator === undefined) {
                                                    mService.app.alert("info", {
                                                        scrid: "",
                                                        lblid: "fileExtensionCheck",
                                                        lblgrpid: "attachment",
                                                        key: [".png", ".jpg", ".jpeg", ".heic"].join(),
                                                    });
                                                    event.preventDefault();
                                                    changeIndicator = false;
                                                    break;
                                                };
                                                sizeCheckIndicator = $.grep(mService.home.userAttachment.allowedFileSize, function (e, i) {
                                                    try {
                                                        return e.category === extensionCheckIndicator.category;
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                })[0];
                                                if (event.files[index].size > parseInt(sizeCheckIndicator.size) * 1024 * 1024) {
                                                    mService.app.alert("info", {
                                                        scrid: "",
                                                        lblid: "fileSizeCheck",
                                                        lblgrpid: "attachment",
                                                        key: sizeCheckIndicator.size,
                                                    });
                                                    event.preventDefault();
                                                    changeIndicator = false;
                                                    break;
                                                };
                                                event.files[index].category = extensionCheckIndicator.category;
                                                event.files[index].type = extensionCheckIndicator.type;
                                                event.files[index].name = event.files[index].rawFile.name;
                                                imageObj = {
                                                    name: event.files[index].name,
                                                    type: event.files[index].type,
                                                    file: event.files[index].rawFile,
                                                    extension: event.files[index].extension,
                                                };
                                                imgCount = $("#" + inputObj.id).attr("data-ms-widget-imgcount");
                                                count = (imgCount === undefined) ? (1) : (parseInt(imgCount) + 1);
                                                fileData = {};
                                                fileData[count] = imageObj;
                                                mService.widgets.variable.msGallery.webImage[inputObj.id].push(fileData);
                                                reader = new FileReader();
                                                reader.addEventListener("load", function () {
                                                    mService.widgets.init.util.msGallery.loadImage(inputObj.id, "", reader.result);
                                                });
                                                reader.readAsDataURL(event.files[index].rawFile);
                                            } else {
                                                mService.app.alert("error", {
                                                    scrid: "",
                                                    lblid: "web_msGallery_not_image_file",
                                                    lblgrpid: "error",
                                                });
                                            }
                                        }
                                    };
                                    if (changeIndicator === true) {
                                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                                    };
                                    $("#" + inputObj.id).attr("data-ms-process-in-action", "false");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 10);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    $("#" + inputObj.id + "_file_picker").bind("click", function (event) {
                        try {
                            setTimeout(function () {
                                try {
                                    $("#" + inputObj.id).attr("data-ms-process-in-action", "false");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 10);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGeotag: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msGeotagTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msGeotagTemplate", inputObj));
                $("#" + inputObj.id + "_input").click(function (e) {
                    mService.widgets.event.msGeotag.click(inputObj.scrid, inputObj.id + "_input", e);
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msFlipswitch: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msFlipswitchTemplate");
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.showlabel = inputObj.showlabel === undefined ? "false" : inputObj.showlabel;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msFlipswitchTemplate", inputObj));
                $("#" + inputObj.id).kendoSwitch($.extend(true, inputObj, {
                        messages: {
                            checked: "",
                            unchecked: "",
                        },
                    }));
                $("#" + inputObj.id).data("kendoSwitch").bind("change", function (event) {
                    try {
                        document.activeElement.blur();
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImagepicker: function (inputObj) {
            var creationObj;
            try {
                creationObj = {};
                mService.widgets.init.util.loadTemplate("msImagepickerTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.maxlimit = inputObj.maxlimit === undefined ? "" : inputObj.maxlimit;
                inputObj.minlimit = inputObj.minlimit === undefined ? "0" : inputObj.minlimit;
                inputObj.attachmentind = inputObj.attachmentind === undefined ? "false" : inputObj.attachmentind;
                inputObj.filesizekey = inputObj.filesizekey === undefined ? "" : inputObj.filesizekey;
                inputObj.fileextensionkey = inputObj.fileextensionkey === undefined ? "" : inputObj.fileextensionkey;
                creationObj.multiple = inputObj.multiple === undefined ? true : eval(inputObj.multiple);
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msImagepickerTemplate", inputObj));
                $("#" + inputObj.id + "_preview_popup_content").html("");
                $("#" + inputObj.id + "_preview_popup_content").html(kendo.template($("#msImagepickerPopupTemplate").html())({
                        id: inputObj.id,
                    }));
                if (mService.app.channel === "web") {
                    $("#" + inputObj.id + "_web_camera_popup_content").html(kendo.template($("#msWebCameraPopupTemplate").html())({
                            id: inputObj.id,
                        }));
                    $("#" + inputObj.id + "_camera_button_container").hide();
                    mService.widgets.variable.msGallery.webImage[inputObj.id] = [];
                    $("#" + inputObj.id + "_gallery_file").kendoUpload(creationObj);
                    var btn = $("#" + inputObj.id + "_group").find(".k-upload-button");
                    $(btn).find("span").text("");
                    mService.home.userAttachment.util.getAttachmentControlPanel();
                    $("#" + inputObj.id + "_gallery_file").data("kendoUpload").bind("select", function (event) {
                        var index,
                        extensionCheckIndicator,
                        sizeCheckIndicator,
                        changeIndicator,
                        allowedFileExtensions,
                        reader;
                        try {
                            setTimeout(function () {
                                try {
                                    $("#" + inputObj.id).attr("data-ms-process-in-action", "false");
                                    $("#" + inputObj.id + "_group").find(".k-upload-files").hide();
                                    changeIndicator = true;
                                    for (index = 0; index < event.files.length; index++) {
                                        if (index === 0) {
                                            if (event.files[index].extension.toLowerCase() === ".png" || event.files[index].extension.toLowerCase() === ".jpg" || event.files[index].extension.toLowerCase() === ".heic" || event.files[index].extension.toLowerCase() === ".jpeg") {
                                                allowedFileExtensions = [];
                                                extensionCheckIndicator = $.grep(mService.home.userAttachment.allowedFileExtensions, function (e, i) {
                                                    try {
                                                        allowedFileExtensions.push(e.extension);
                                                        return (e.extension.toLowerCase() === event.files[index].extension.toLowerCase());
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                })[0];
                                                if (extensionCheckIndicator === undefined) {
                                                    mService.app.alert("info", {
                                                        scrid: "",
                                                        lblid: "fileExtensionCheck",
                                                        lblgrpid: "attachment",
                                                        key: [".png", ".jpg", ".jpeg", ".heic"].join(),
                                                    });
                                                    event.preventDefault();
                                                    changeIndicator = false;
                                                    break;
                                                };
                                                sizeCheckIndicator = $.grep(mService.home.userAttachment.allowedFileSize, function (e, i) {
                                                    try {
                                                        return e.category === extensionCheckIndicator.category;
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                })[0];
                                                if (event.files[index].size > parseInt(sizeCheckIndicator.size) * 1024 * 1024) {
                                                    mService.app.alert("info", {
                                                        scrid: "",
                                                        lblid: "fileSizeCheck",
                                                        lblgrpid: "attachment",
                                                        key: sizeCheckIndicator.size,
                                                    });
                                                    event.preventDefault();
                                                    changeIndicator = false;
                                                    break;
                                                };
                                                event.files[index].category = extensionCheckIndicator.category;
                                                event.files[index].type = extensionCheckIndicator.type;
                                                event.files[index].name = event.files[index].rawFile.name;
                                                imageObj = {
                                                    name: event.files[index].name,
                                                    type: event.files[index].type,
                                                    file: event.files[index].rawFile,
                                                    extension: event.files[index].extension,
                                                };
                                                imgCount = $("#" + inputObj.id).attr("data-ms-widget-imgcount");
                                                count = (imgCount === undefined) ? (1) : (parseInt(imgCount) + 1);
                                                fileData = {};
                                                fileData[count] = imageObj;
                                                mService.widgets.variable.msGallery.webImage[inputObj.id].push(fileData);
                                                reader = new FileReader();
                                                reader.addEventListener("load", function () {
                                                    mService.widgets.init.util.msGallery.loadImage(inputObj.id, "", reader.result);
                                                });
                                                reader.readAsDataURL(event.files[index].rawFile);
                                            } else {
                                                mService.app.alert("error", {
                                                    scrid: "",
                                                    lblid: "web_msGallery_not_image_file",
                                                    lblgrpid: "error",
                                                });
                                            }
                                        }
                                    };
                                    if (changeIndicator === true) {
                                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                                    };
                                    $("#" + inputObj.id).attr("data-ms-process-in-action", "false");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 10);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    $("#" + inputObj.id + "_gallery_file").bind("click", function (event) {
                        try {
                            setTimeout(function () {
                                try {
                                    $("#" + inputObj.id).attr("data-ms-process-in-action", "false");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 10);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImageviewer: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msImageviewerTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).append(mService.config.template.getTransformedHtml("msImageviewerTemplate", inputObj));
                mService.widgets.event.msImageviewer.load(inputObj.id, inputObj.source);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msListview: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msListviewTemplate");
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msListviewTemplate", inputObj));
                $("#" + inputObj.id).kendoMobileListView({
                    pullToRefresh: inputObj.pulltorefresh === undefined ? false : eval(inputObj.pulltorefresh),
                    dataSource: inputObj.datasrc === undefined ? [] : mService.widgets.init.util.getDataSource(inputObj.datasrc),
                    template: kendo.template($("#" + inputObj.template).html()),
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msLoop: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msLoopTemplate");
                mService.widgets.variable.msLoop.subFieldsHtml[inputObj.id] = {};
                mService.widgets.variable.msLoop.dataSrc[inputObj.id] = new kendo.data.DataSource();
                mService.widgets.variable.msLoop.subFieldsHtml[inputObj.id] = $("#" + inputObj.id).html();
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.maxlimit = inputObj.maxlimit === undefined ? "" : inputObj.maxlimit;
                inputObj.minlimit = inputObj.minlimit === undefined ? "" : inputObj.minlimit;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msLoopTemplate", inputObj));
                $("#" + inputObj.id + "_msloop_container").hide();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMap: function (inputObj) {
            var centerControlDiv,
            refreshButton;
            try {
                inputObj.zoomlevel = inputObj.zoomlevel === undefined ? 10 : parseFloat(inputObj.zoomlevel);
                inputObj.streetviewcontrol = inputObj.streetviewcontrol === undefined ? false : inputObj.streetviewcontrol === "true";
                inputObj.zoomcontrol = inputObj.zoomcontrol === undefined ? false : inputObj.zoomcontrol === "true";
                inputObj.maptypecontrol = inputObj.maptypecontrol === undefined ? false : inputObj.maptypecontrol === "true";
                inputObj.fullscreencontrol = inputObj.fullscreencontrol === undefined ? true : inputObj.fullscreencontrol === "true";
                inputObj.refreshbutton = inputObj.refreshbutton === undefined ? true : inputObj.refreshbutton === "true";
                mService.widgets.variable.msMap.map[inputObj.id] = new google.maps.Map(document.getElementById(inputObj.id), {
                    streetViewControl: inputObj.streetviewcontrol,
                    zoomControl: inputObj.zoomcontrol,
                    mapTypeControl: inputObj.maptypecontrol,
                    fullscreenControl: inputObj.fullscreencontrol,
                    zoom: inputObj.zoomlevel,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                });
                if (inputObj.refreshbutton) {
                    centerControlDiv = document.createElement("div");
                    refreshButton = mService.widgets.init.util.msMap.addRefreshButton(centerControlDiv, mService.widgets.variable.msMap.map[inputObj.id]);
                    refreshButton.addEventListener("click", (event) => {
                        mService.widgets.event.msMap.refresh(inputObj.id, mService.widgets.variable.msMap.map[inputObj.id], mService.widgets.variable.msMap.marker[inputObj.id]);
                    });
                    mService.widgets.variable.msMap.map[inputObj.id].controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMlingualtextarea: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msMlingualtextareaTemplate");
                inputObj.column = "12";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                if (mService.user.profile.login.locale_id.substring(0, 2) === mService.user.profile.login.default_locale_id.substring(0, 2)) {
                    inputObj.column = "6";
                };
                inputObj.maxlen = inputObj.maxlen === undefined ? "" : inputObj.maxlen;
                inputObj.minlen = inputObj.minlen === undefined ? "" : inputObj.minlen;
                inputObj.localeid = mService.user.profile.login.locale_id.substring(0, 2);
                inputObj.defaultlocaleid = mService.user.profile.login.default_locale_id.substring(0, 2);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msMlingualtextareaTemplate", inputObj));
                $("#" + inputObj.id + ", #" + inputObj.id + "_default_locale").on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (inputObj) {
            var creationObj;
            try {
                mService.widgets.init.util.loadTemplate("msMultiselectTemplate");
                creationObj = {};
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                creationObj.dataTextField = inputObj.textfield;
                creationObj.dataValueField = inputObj.valuefield;
                creationObj.placeholder = "--Select--";
                creationObj.itemTemplate = "${data." + inputObj.valuefield + "}" + " - " + "${data." + inputObj.textfield + "}";
                if (inputObj.itemtemplate === "value") {
                    creationObj.itemtemplate = "${data." + inputObj.valuefield + "}";
                } else if (inputObj.itemtemplate === "text") {
                    creationObj.itemtemplate = "${data." + inputObj.textfield + "}";
                };
                creationObj.filter = "contains";
                dataSource = mService.widgets.init.util.getDataSource(inputObj.datasrc)
                    creationObj.dataSource = dataSource;
                mService.widgets.variable.msMultiselect.dataSource[inputObj.id] = dataSource;
                creationObj.popup = {
                    appendTo: $("#" + inputObj.id + "_group"),
                    anchor: $("#" + inputObj.id + "_group"),
                    position: "top left",
                };
                inputObj.cascadefrom = inputObj.cascadefrom !== undefined ? inputObj.cascadefrom : "";
                inputObj.cascadefromfield = inputObj.cascadefromfield !== undefined ? inputObj.cascadefromfield : "";
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msMultiselectTemplate", inputObj));
                $("#" + inputObj.id).kendoMultiSelect(creationObj);
                $("#" + inputObj.id).data("kendoMultiSelect").bind("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                $("#" + inputObj.id).data("kendoMultiSelect").bind("deselect", function (event) {
                    var uid,
                    parentVal,
                    parentValIndex,
                    childDatasource,
                    childDsrcIndex,
                    childEle;
                    try {
                        uid = "";
                        if (event !== undefined && ($(event.sender.element).attr("data-ms-widget-msloop") !== undefined || $(event.sender.element).attr("data-ms-widget-msloop") !== "" || $("#" + event.target.id).attr("data-ms-widget-msloop") !== undefined || $("#" + event.target.id).attr("data-ms-widget-msloop") !== "")) {
                            if (event !== undefined) {
                                if (event.target !== undefined) {
                                    if ($("#" + event.target.id).attr("data-ms-widget-msloop") !== undefined || $("#" + event.target.id).attr("data-ms-widget-msloop") !== "") {
                                        uid = $("#" + event.target.id).attr("data-ms-widget-uid");
                                    }
                                } else {
                                    if (event.sender !== undefined && event.sender.element !== undefined) {
                                        if ($(event.sender.element).attr("data-ms-widget-msloop") !== undefined || $(event.sender.element).attr("data-ms-widget-msloop") !== "") {
                                            uid = $(event.sender.element).attr("data-ms-widget-uid");
                                        }
                                    }
                                }
                            }
                        };
                        uid = (uid === undefined || uid === "") ? ("") : ("_" + uid);
                        if (mService.app.channel === "web") {
                            widgetList = $("#" + mService.app.getScreenId() + "_container").find("[data-ms-widget-cascadefrom='" + inputObj.id + uid + "']");
                        } else {
                            widgetList = $("#" + mService.app.getScreenId()).find("[data-ms-widget-cascadefrom='" + inputObj.id + uid + "']");
                        }
                        if (widgetList.length > 0) {
                            parentVal = $("#" + inputObj.id + uid).getVal();
                            for (parentValIndex = 0; parentValIndex < parentVal.length; parentValIndex++) {
                                childDatasource = $(widgetList[0]).getDataSource();
                                childDatasource = childDatasource.data();
                                for (childDsrcIndex = 0; childDsrcIndex < childDatasource.length; childDsrcIndex++) {
                                    if (childDatasource[childDsrcIndex][$(widgetList[0]).attr("data-ms-widget-cascadefield")] === event.dataItem.code) {
                                        childEle = $(widgetList[0]).data("kendoMultiSelect");
                                        childEle.value(childEle.value().filter(value => value !== childDatasource[childDsrcIndex].code));
                                    }
                                }
                            }
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                if (inputObj.cascadefrom !== undefined && inputObj.cascadefrom !== "") {
                    $("#" + inputObj.id).disable();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMobileNumber: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msMobileNumberTemplate");
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.maxlen = inputObj.maxlen === undefined ? "15" : inputObj.maxlen;
                inputObj.minlen = inputObj.minlen === undefined ? "" : inputObj.minlen;
                inputObj.countrycode = inputObj.countrycode === undefined ? "" : inputObj.countrycode;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msMobileNumberTemplate", inputObj));
                if (inputObj.countrycode !== "") {
                    if ((valueSplit[0].indexOf("+") !== -1)) {
                        $("#" + inputObj.id + "_country_code").val(inputObj.countrycode);
                    } else {
                        $("#" + inputObj.id + "_country_code").val("+" + inputObj.countrycode);
                    }
                };
                $("#" + inputObj.id).on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                $("#" + inputObj.id + "_country_code").on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                if (mService.app.channel === "mobile") {
                    $("body").append(mService.config.template.getTransformedHtml("msCountryCodeBottomSheetTemplate", inputObj));
                };
                $("#" + inputObj.id).keypress(function (event) {
                    if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
                        event.preventDefault();
                    }
                });
                $("#" + inputObj.id + "_country_code").keypress(function (event) {
                    var charCode = (event.which) ? event.which : event.keyCode;
                    if (charCode != 43 && charCode != 8 && isNaN(String.fromCharCode(charCode))) {
                        event.preventDefault();
                    }
                });
                mService.app.load.countryCodes(function () {
                    var dataSource,
                    countryObj;
                    try {
                        dataSource = mService.dSource.cache["country_codes"];
                        mService.widgets.variable.msMobileNumber.dataSrc[inputObj.id] = new kendo.data.DataSource({
                            data: JSON.parse(JSON.stringify(mService.dSource.cache["country_codes"].data())),
                        });
                        mService.widgets.variable.msMobileNumber.dataSrc[inputObj.id].read();
                        countryObj = $.grep(dataSource.data(), function (e, i) {
                            try {
                                return (e.code.toLowerCase() === mService.app.getCountryCode().toLowerCase());
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        })[0];
                        if (countryObj !== undefined) {
                            $("#" + inputObj.id + "_country_code").val(countryObj.dial_code);
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msNotification: function (inputObj) {
            try {
                if ($("#" + inputObj.id).getKendoNotification() === undefined) {
                    mService.widgets.init.util.loadTemplate("msNotificationTemplate");
                    $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msNotificationTemplate", inputObj));
                    $("#" + inputObj.id).kendoNotification({
                        position: {
                            top: 70,
                        },
                        templates: [{
                                type: "success",
                                template: kendo.template($("#msNotificationSuccessTemplate").html()),
                            }, {
                                type: "error",
                                template: kendo.template($("#msNotificationErrorTemplate").html()),
                            }, {
                                type: "info",
                                template: kendo.template($("#msNotificationInfoTemplate").html()),
                            }, ],
                    });
                    $("#" + inputObj.id).getKendoNotification().show({
                        msg: inputObj.msg,
                    }, inputObj.type);
                } else {
                    $("#" + inputObj.id).getKendoNotification().show({
                        msg: inputObj.msg,
                    }, inputObj.type);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msNumerictextbox: function (inputObj) {
            var creationObj;
            try {
                mService.widgets.init.util.loadTemplate("msNumerictextboxTemplate");
                creationObj = {};
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                creationObj.decimals = inputObj.decimals === undefined ? null : inputObj.decimals;
                creationObj.format = inputObj.format === undefined ? "n" : inputObj.format;
                creationObj.max = inputObj.max === undefined ? null : inputObj.max;
                creationObj.min = inputObj.min === undefined ? null : inputObj.min;
                creationObj.restrictDecimals = inputObj.restrictdecimals === undefined ? true : eval(inputObj.restrictdecimals);
                creationObj.step = inputObj.step === undefined ? "1" : inputObj.step;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msNumerictextboxTemplate", inputObj));
                $("#" + inputObj.id).kendoNumericTextBox(creationObj);
                $("#" + inputObj.id).data("kendoNumericTextBox").bind("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                $("#" + inputObj.id).data("kendoNumericTextBox").bind("spin", function (event) {
                    try {
                        if (mService.app.channel !== "web") {
                            Keyboard.hide();
                        };
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msParentgroup: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msParentgroupTemplate");
                mService.widgets.variable.msParentgroup.subFieldsHtml[inputObj.id] = {};
                mService.widgets.variable.msParentgroup.subFieldsHtml[inputObj.id] = $("#" + inputObj.id).html();
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msParentgroupTemplate", inputObj));
                $("#" + inputObj.id + "_content").slideUp("fast");
                $("#" + inputObj.id + "_panelbar").on("click", function () {
                    var panel;
                    try {
                        panel = $("#" + inputObj.id + "_content");
                        if ($(panel).is(":hidden")) {
                            $(panel).slideDown("slow");
                            $("#" + inputObj.id + "_panelbar_down").hide("slow");
                            $("#" + inputObj.id + "_panelbar_up").show("slow");
                        } else {
                            $(panel).slideUp("slow");
                            $("#" + inputObj.id + "_panelbar_down").show("slow");
                            $("#" + inputObj.id + "_panelbar_up").hide("slow");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                mService.widgets.init.util.msParentgroup.createParentGroup(inputObj.id, inputObj.scrid);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msPdfviewer: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msPdfviewerTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).append(mService.config.template.getTransformedHtml("msPdfviewerTemplate", inputObj));
                $("#" + inputObj.id + "_widget").kendoPDFViewer({
                    pdfjsProcessing: {
                        file: inputObj.source,
                    },
                    toolbar: {
                        items: ["pager", "zoom"],
                    },
                    width: $("#" + inputObj.id).width(),
                    height: $("#" + inputObj.id).height(),
                    position: "fixed",
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msQrcode: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msQrcodeTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msQrcodeTemplate", inputObj));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRadiogroup: function (inputObj) {
            var dataSource,
            data;
            try {
                mService.widgets.init.util.loadTemplate("msRadiogroupTemplate");
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.stack = inputObj.stack === undefined ? false : eval(inputObj.stack);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.checked = inputObj.checked === undefined ? "" : inputObj.checked;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msRadiogroupTemplate", inputObj));
                dataSource = mService.widgets.init.util.getDataSource(inputObj.datasrc);
                mService.widgets.init.util.createRadiogroup(inputObj, dataSource.data());
                $('input[name="' + inputObj.id + '_input"]').on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRating: function (inputObj) {
            var creationObj,
            itemTemplate,
            selectedTemplate,
            hoveredTemplate,
            labelTemplate;
            try {
                creationObj = {};
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "6";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                creationObj.max = inputObj.max === undefined ? 5 : parseInt(inputObj.max);
                creationObj.min = inputObj.min === undefined ? 1 : parseInt(inputObj.min);
                creationObj.value = inputObj.value === undefined ? null : inputObj.value;
                creationObj.selection = inputObj.selectiontype === undefined ? "continuous" : inputObj.selectiontype;
                creationObj.precision = inputObj.precisiontype === undefined ? "item" : inputObj.precisiontype;
                creationObj.tooltip = inputObj.showtooltip === undefined ? true : inputObj.showtooltip === "true" ? true : false;
                mService.widgets.init.util.loadTemplate("msRatingTemplate");
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msRatingTemplate", inputObj));
                labelTemplate = $("body [data-ms-mswidget-for='" + inputObj.id + "'][data-ms-mswidget-template-type='label']");
                itemTemplate = $("body [data-ms-mswidget-for='" + inputObj.id + "'][data-ms-mswidget-template-type='item']");
                selectedTemplate = $("body [data-ms-mswidget-for='" + inputObj.id + "'][data-ms-mswidget-template-type='selected']");
                hoveredTemplate = $("body [data-ms-mswidget-for='" + inputObj.id + "'][data-ms-mswidget-template-type='hovered']");
                creationObj.label = {
                    template: kendo.template(labelTemplate.length === 0 ? $("#msRatingLabelTemplate").html() : $(labelTemplate).html()),
                };
                creationObj.itemTemplate = kendo.template(itemTemplate.length === 0 ? $("#msRatingItemTemplate").html() : $(itemTemplate).html());
                creationObj.selectedTemplate = kendo.template(selectedTemplate.length === 0 ? $("#msRatingSelectedTemplate").html() : $(selectedTemplate).html());
                creationObj.hoveredTemplate = kendo.template(hoveredTemplate.length === 0 ? $("#msRatingHoveredTemplate").html() : $(hoveredTemplate).html());
                if (inputObj.showlabel !== "undefined" && inputObj.showlabel === "false") {
                    creationObj.label = false;
                };
                $("#" + inputObj.id).kendoRating(creationObj);
                $("#" + inputObj.id).data("kendoRating").bind("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSearchpopup: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msSearchpopupTemplate");
                inputObj.textfield = inputObj.textfield === undefined ? "description" : inputObj.textfield;
                inputObj.valuefield = inputObj.valuefield === undefined ? "code" : inputObj.valuefield;
                inputObj.datasrctype = inputObj.datasrctype === undefined ? "cache" : inputObj.datasrctype;
                inputObj.datasrccode = inputObj.datasrccode === undefined ? "" : inputObj.datasrccode;
                inputObj.datasrcinputxml = inputObj.datasrcinputxml === undefined ? "" : inputObj.datasrcinputxml;
                inputObj.datasrc = inputObj.datasrc === undefined || inputObj.datasrc === "" ? "[]" : inputObj.datasrctype !== "cache" ? JSON.stringify(inputObj.datasrc) : inputObj.datasrc;
                inputObj.logic = inputObj.logic === undefined ? "and" : inputObj.logic;
                inputObj.filtercondition = inputObj.filtercondition === undefined ? "" : inputObj.filtercondition;
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.cascadefrom = inputObj.cascadefrom !== undefined ? inputObj.cascadefrom : "";
                inputObj.cascadefromfield = inputObj.cascadefromfield !== undefined ? inputObj.cascadefromfield : "";
                inputObj.minsearchletters = inputObj.minsearchletters !== undefined ? inputObj.minsearchletters : "1";
                inputObj.allownewentry = inputObj.allownewentry !== undefined ? inputObj.allownewentry : "false";
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msSearchpopupTemplate", inputObj));
                if (inputObj.cascadefrom !== undefined && inputObj.cascadefrom !== "") {
                    if ($("#" + inputObj.cascadefrom).attr("data-ms-allownewentry") !== undefined && $("#" + inputObj.cascadefrom).attr("data-ms-allownewentry") !== "true") {
                        $("#" + inputObj.id).disable();
                    }
                };
                $("#" + inputObj.id).on("input", function () {
                    $(this).attr("data-ms-value", "");
                    if ($(this).val() === "") {
                        $("#" + inputObj.id + "_clear_btn").hide();
                    } else {
                        $("#" + inputObj.id + "_clear_btn").show();
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSignaturepad: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msSignaturepadTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msSignaturepadTemplate", inputObj));
                mService.widgets.init.util.msSignaturepad.init(inputObj, function () {
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
        msSlider: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msSliderTemplate");
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.max = inputObj.max === undefined ? 100 : parseInt(inputObj.max);
                inputObj.min = inputObj.min === undefined ? 0 : parseInt(inputObj.min);
                inputObj.step = inputObj.step === undefined ? 10 : parseInt(inputObj.step);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msSliderTemplate", inputObj));
                $("#" + inputObj.id).kendoSlider({
                    min: inputObj.min,
                    max: inputObj.max,
                    smallStep: inputObj.step,
                    largeStep: inputObj.step,
                    showButtons: false,
                    tickPlacement: "none",
                    change: function (evt) {
                        try {
                            mService.widgets.event.msSlider.change(mService.app.getScreenId(), inputObj.id, evt);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    slide: function (evt) {
                        try {
                            mService.widgets.event.msSlider.slide(mService.app.getScreenId(), inputObj.id, evt);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSubpage: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msSubpageTemplate");
                inputObj.inputHtml = $("#" + inputObj.scrid + "_main_page").html();
                inputObj.listviewInd = inputObj.listviewInd === undefined ? "false" : inputObj.listviewInd;
                $("#" + inputObj.scrid + "_main_page").replaceWith(mService.config.template.getTransformedHtml("msSubpageTemplate", inputObj));
                $("#" + inputObj.id).kendoMobileScrollView({
                    contentHeight: "100%",
                    enablePager: false,
                    duration: 100,
                    itemsPerPage: 1,
                    bounceVelocityThreshold: 1,
                    template: $("#scrollview_empty").html(),
                    change: function (event) {
                        try {
                            mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    changing: function (event) {
                        try {
                            mService.widgets.event.msSubpage.changing(inputObj.scrid, inputObj.id, event);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                });
                if (inputObj.listviewInd !== "true") {
                    $("#" + inputObj.id).data("kendoMobileScrollView").viewShow();
                };
                if (inputObj.listviewInd === "true") {
                    if (inputObj.dataLength === 0) {
                        $("#" + inputObj.scrid + "_main_page").hide();
                    } else {
                        $("#" + inputObj.scrid + "_main_page").show();
                    }
                };
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextarea: function (inputObj) {
            try {
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "6";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.maxlen = inputObj.maxlen === undefined ? "" : inputObj.maxlen;
                inputObj.minlen = inputObj.minlen === undefined ? "" : inputObj.minlen;
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                mService.widgets.init.util.loadTemplate("msTextareaTemplate");
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msTextareaTemplate", inputObj));
                $("#" + inputObj.id).on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextbox: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msTextboxTemplate");
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.type = inputObj.type === undefined ? "text" : inputObj.type;
                inputObj.maxlen = inputObj.maxlen === undefined ? "" : inputObj.maxlen;
                inputObj.minlen = inputObj.minlen === undefined ? "" : inputObj.minlen;
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msTextboxTemplate", inputObj));
                $("#" + inputObj.id).on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimebox: function (inputObj) {
            var creationObj;
            try {
                mService.widgets.init.util.loadTemplate("msTimeboxTemplate");
                creationObj = {};
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "3";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                creationObj.dateInput = inputObj.dateinput === undefined ? false : eval(inputObj.dateinput);
                creationObj.interval = inputObj.interval === undefined ? "30" : inputObj.interval;
                creationObj.format = inputObj.format === undefined ? "hh:mm tt" : inputObj.format;
                if (inputObj.min !== undefined && inputObj.min !== "") {
                    if (((inputObj.min).indexOf(":") !== -1)) {
                        valueSplit = (inputObj.min).split(":");
                        creationObj.min = new Date(2022, 11, 30, parseInt(valueSplit[0]), ((valueSplit[1] === undefined) ? (00) : (parseInt(valueSplit[1]))), ((valueSplit[2] === undefined) ? (00) : (parseInt(valueSplit[2]))));
                    } else {
                        creationObj.min = new Date(0, 0);
                        console.error("msTimebox-init-Min: separator should be ':' in given value " + inputObj.min);
                    }
                } else {
                    creationObj.min = new Date(0, 0);
                };
                if (inputObj.max !== undefined && inputObj.max !== "") {
                    if (((inputObj.max).indexOf(":") !== -1)) {
                        valueSplit = (inputObj.max).split(":");
                        creationObj.max = new Date(2022, 11, 30, parseInt(valueSplit[0]), ((valueSplit[1] === undefined) ? (00) : (parseInt(valueSplit[1]))), ((valueSplit[2] === undefined) ? (00) : (parseInt(valueSplit[2]))));
                    } else {
                        creationObj.max = new Date(0, 0);
                        console.error("msTimebox-init-Max: separator should be ':' in given value " + inputObj.min);
                    }
                } else {
                    creationObj.max = new Date(0, 0);
                };
                creationObj.popup = {
                    appendTo: $("#" + inputObj.id + "_group"),
                    anchor: $("#" + inputObj.id + "_group"),
                    position: "top left",
                };
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msTimeboxTemplate", inputObj));
                $("#" + inputObj.id).kendoTimePicker(creationObj);
                $("#" + inputObj.id).data("kendoTimePicker").bind("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                $("#" + inputObj.id).data("kendoTimePicker").bind("open", function (event) {
                    try {
                        if (mService.app.channel !== "web") {
                            document.activeElement.blur();
                            Keyboard.hide();
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                $("#" + inputObj.id).focus(function () {
                    $("#" + inputObj.id).data("kendoTimePicker").close();
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimeline: function (inputObj) {
            var creationObj,
            timelineList;
            try {
                timelineList = [];
                for (var index = 0; index < $("[data-role='timeline'][id!='" + inputObj.id + "']").length; index++) {
                    timelineList.push($($("[data-role='timeline'][id!='" + inputObj.id + "']")[index]).attr("id"));
                };
                for (var index = 0; index < timelineList.length; index++) {
                    $("#" + timelineList[index] + "_group").replaceWith("<div id='" + timelineList[index] + "'></div>");
                };
                mService.widgets.init.util.loadTemplate("msTimelineTemplate");
                inputObj.column = inputObj.column !== undefined ? inputObj.column : "12";
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                inputObj.dsrctype = inputObj.dsrctype === undefined ? "" : inputObj.dsrctype;
                inputObj.sortorder = inputObj.sortorder === undefined ? "asc" : inputObj.sortorder;
                creationObj = {};
                creationObj.dateFormat = inputObj.dateformat !== undefined ? inputObj.dateformat : "dd-MM-yyyy HH:mm";
                creationObj.eventTemplate = kendo.template($("#" + inputObj.eventtemplate).html());
                creationObj.orientation = inputObj.orientation !== undefined ? inputObj.orientation : "vertical";
                creationObj.collapsibleEvents = inputObj.collapsibleevents !== undefined ? eval(inputObj.collapsibleevents) : false;
                creationObj.alternatingMode = inputObj.alternatingmode !== undefined ? eval(inputObj.alternatingmode) : false;
                creationObj.showDateLabels = inputObj.showdatelabels !== undefined ? eval(inputObj.showdatelabels) : true;
                creationObj.dataSource = mService.widgets.init.util.getDataSource(inputObj.datasrc);
                creationObj.colorTray = inputObj.colorTray === undefined ? [] : inputObj.colorTray;
                creationObj.dataBound = function (e) {
                    var data = e.sender.dataSource.data();
                    for (var index = 0; index < data.length; index++) {
                        if ($("#" + this.element[0].id).data("kendoTimeline").options.colorTray.length !== 0 && $("#" + this.element[0].id).data("kendoTimeline").options.colorTray[0][data[index].event_category] !== undefined) {
                            $("#" + inputObj.id).find(".k-timeline-circle")[index].setAttribute("style", "background-color:" + $("#" + this.element[0].id).data("kendoTimeline").options.colorTray[0][data[index].event_category] + " !important;");
                            $("#" + inputObj.id).find(".k-timeline-date")[index].innerHTML = $("#" + inputObj.id).find(".k-timeline-date")[index].innerHTML + " <br/> " + data[index].event_ref_no + " <br/> " + data[index].event_type_desc;
                            $("#" + inputObj.id).find(".k-timeline-date")[index].setAttribute("style", "color:" + $("#" + this.element[0].id).data("kendoTimeline").options.colorTray[0][data[index].event_category] + " !important;");
                        };
                    };
                    $("#" + inputObj.id).find(".k-timeline-date").css("font-size", "0.9em").css("display", "flex").css("text-align", "center");
                };
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msTimelineTemplate", inputObj));
                $("#" + inputObj.id).kendoTimeline(creationObj);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimelogger: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msTimeloggerTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msTimeloggerTemplate", inputObj));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msVideoplayer: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msVideoplayerTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).append(mService.config.template.getTransformedHtml("msVideoplayerTemplate", inputObj));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msVoice: function (inputObj) {
            try {
                mService.widgets.init.util.loadTemplate("msVoiceTemplate");
                inputObj.savefield = inputObj.savefield === undefined ? false : eval(inputObj.savefield);
                inputObj.msloop = inputObj.msloop === undefined ? "" : inputObj.msloop;
                $("#" + inputObj.id).replaceWith(mService.config.template.getTransformedHtml("msVoiceTemplate", inputObj));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        util: {
            buttonStatePressed: function (id) {
                try {
                    $("#" + id).addClass("active");
                    setTimeout(function () {
                        try {
                            $("#" + id).removeClass("active");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 200);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            msAttachment: {
                downloadAttachment: function (id, success, failure) {
                    var fileData,
                    serverPath,
                    localPath;
                    try {
                        fileData = mService.widgets.variable.msAttachment.attachments[mService.widgets.variable.msAttachment.counter];
                        if (window.navigator.onLine) {
                            serverPath = mService.app.clientURL + "/" + "content_store" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + fileData.path + "/" + fileData.name;
                            localPath = "images" + "/" + fileData.name;
                            mService.nfs.downloadFile(serverPath, localPath, false, function (thumbnail) {
                                try {
                                    var attachmentData = {
                                        fileName: fileData.name,
                                        category: fileData.category,
                                        type: fileData.type,
                                        fileExtension: fileData.extension,
                                    };
                                    attachmentData.thumbnail = thumbnail;
                                    attachmentData.filePath = "/storage/emulated/0/" + mService.app.root + "/" + "images";
                                    mService.widgets.init.util.msAttachment.loadFile(id, attachmentData, "");
                                    mService.widgets.event.change(mService.app.getScreenId(), id);
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.spinner.hide();
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, true);
                        } else {
                            failure();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                displayAttachment: function (id, success, failure) {
                    try {
                        mService.widgets.init.util.msAttachment.downloadAttachment(id, function () {
                            try {
                                mService.widgets.variable.msAttachment.counter++;
                                if (mService.widgets.variable.msAttachment.counter < mService.widgets.variable.msAttachment.attachments.length) {
                                    mService.widgets.init.util.msAttachment.displayAttachment(id, function () {
                                        try {
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function (err) {
                                        try {
                                            failure();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.widgets.variable.msAttachment.counter = 0;
                                    success();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.widgets.variable.msAttachment.counter++;
                                if (mService.widgets.variable.msAttachment.counter < mService.widgets.variable.msAttachment.attachments.length) {
                                    mService.widgets.init.util.msAttachment.displayAttachment(id, function () {
                                        try {
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function (err) {
                                        try {
                                            failure();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.widgets.variable.msAttachment.counter = 0;
                                    success();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                loadFile: function (id, fileData, uid) {
                    var dataCount,
                    filecount;
                    try {
                        uid = uid === "" ? uid : "_" + uid;
                        filecount = $("#" + id + uid).attr("data-ms-widget-filecount");
                        dataCount = filecount === undefined ? 1 : parseInt(filecount) + 1;
                        widgetType = $("#" + id + uid).attr("data-ms-widget-type");
                        if (mService.app.platform == "iOS") {
                            fileData.thumbnail = "";
                        };
                        if (fileData.thumbnail.indexOf("data:video/mp4;base64,") === -1 && fileData.thumbnail.indexOf("data:audio/mpeg;base64,") === -1 && fileData.thumbnail.indexOf("data:application/pdf;base64,") === -1) {
                            fileData.thumbnail = fileData.thumbnail.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "");
                            fileData.thumbnail = fileData.thumbnail === "" ? "" : "data:image/jpeg;base64," + fileData.thumbnail
                        };
                        $("#" + id + "_add_container" + uid).before(kendo.template($("#msAttachmentContentTemplate").html())({
                                name: (fileData.fileName === undefined) ? (fileData.name) : (fileData.fileName),
                                category: fileData.category,
                                type: fileData.type,
                                path: (fileData.filePath === undefined) ? (fileData.path) : (fileData.filePath),
                                extension: (fileData.fileExtension === undefined) ? (fileData.extension) : (fileData.fileExtension),
                                thumbnail: fileData.thumbnail,
                                dataFor: id,
                                dataCount: dataCount,
                                uid: uid,
                            }));
                        $("#" + id + uid).attr("data-ms-count", parseInt($("#" + id + uid).attr("data-ms-count")) + 1);
                        $("#" + id + uid).attr("data-ms-widget-filecount", dataCount);
                        $("#" + id + "_container_" + dataCount + uid).attr("data-ms-widget-source", fileData);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            msCamera: {
                convertBlobToJPGFile: function (blob, filename) {
                    try {
                        blob.lastModifiedDate = new Date();
                        blob.name = filename;
                        return blob;
                    } catch (exception) {
                        return "";
                        mService.exception.handle(exception);
                    }
                },
                convertToBlobFile: function (base64Data, contentType, sliceSize) {
                    var byteCharacters,
                    byteArrays,
                    slice,
                    byteNumbers,
                    byteArray,
                    blob,
                    offset,
                    index;
                    try {
                        contentType = contentType || '';
                        sliceSize = sliceSize || 512;
                        byteCharacters = atob(base64Data);
                        byteArrays = [];
                        for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                            slice = byteCharacters.slice(offset, offset + sliceSize);
                            byteNumbers = new Array(slice.length);
                            for (index = 0; index < slice.length; index++) {
                                byteNumbers[index] = slice.charCodeAt(index);
                            };
                            byteArray = new Uint8Array(byteNumbers);
                            byteArrays.push(byteArray);
                        };
                        blob = new Blob(byteArrays, {
                            type: contentType
                        });
                        return blob;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                detectWebCamera: function (success) {
                    var constraints;
                    try {
                        constraints = {
                            video: true
                        };
                        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                            var tracks;
                            try {
                                tracks = stream.getTracks();
                                tracks.forEach(track => track.stop());
                                success(true);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }).catch(function (stream) {
                            try {
                                success(false);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                initializeWebCam: function (id, uid, evt) {
                    var maxLimitReached;
                    try {
                        maxLimitReached = false;
                        if ($("#" + id + uid).attr("data-ms-widget-maxlimit") !== "") {
                            if (parseInt($("#" + id + uid).attr("data-ms-count")) < parseInt($("#" + id + uid).attr("data-ms-widget-maxlimit"))) {
                                maxLimitReached = false;
                            } else {
                                maxLimitReached = true;
                                mService.app.alert("error", {
                                    scrid: "",
                                    lblid: "web_gallery_max_limit",
                                    lblgrpid: "error",
                                });
                            }
                        } else {
                            maxLimitReached = false;
                        };
                        if (!maxLimitReached) {
                            mService.widgets.init.util.msCamera.webCamPopup.init(id + uid, function () {
                                try {
                                    mService.widgets.init.util.msCamera.webCamPopup.open(id + uid);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            $("#" + id + uid).attr("data-ms-process-in-action", "false");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                loadWebCamImage: function (id, uid, fileData) {
                    var containerWidth,
                    containerHeight,
                    image,
                    canvas,
                    dataCount,
                    imgCount,
                    widgetType,
                    attachmentInd,
                    src = "";
                    try {
                        uid = uid === "" ? uid : "_" + uid;
                        imgCount = $("#" + id + uid).attr("data-ms-widget-imgcount");
                        dataCount = imgCount === undefined ? 1 : parseInt(imgCount) + 1;
                        widgetType = $("#" + id + uid).attr("data-ms-widget-type");
                        attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                        if (attachmentInd === "false") {
                            if (fileData.indexOf("data:image/png;base64,") === -1) {
                                src = "data:image/png;base64," + fileData;
                            };
                            imageObj = {
                                name: "",
                                category: "",
                                type: "",
                                path: "",
                                extension: "",
                                dataFor: id,
                                dataCount: dataCount,
                                thumbnail: "",
                                uid: uid,
                            };
                        } else {
                            src = "data:image/png;base64," + fileData.thumbnail;
                            imageObj = {
                                name: fileData.fileName,
                                category: fileData.category,
                                type: fileData.type,
                                path: fileData.filePath,
                                extension: fileData.fileExtension,
                                dataFor: id,
                                dataCount: dataCount,
                                thumbnail: fileData.thumbnail === "" ? "" : "data:image/jpeg;base64," + fileData.thumbnail,
                                uid: uid,
                            };
                        };
                        if (widgetType === "msCamera") {
                            $("#" + id + "_add_container" + uid).before(kendo.template($("#msCameraContentTemplate").html())(imageObj));
                        } else {
                            $("#" + id + "_add_container" + uid).before(kendo.template($("#msImagepickerCameraContentTemplate").html())(imageObj));
                        };
                        $("#" + id + uid).attr("data-ms-count", parseInt($("#" + id + uid).attr("data-ms-count")) + 1);
                        $("#" + id + uid).attr("data-ms-widget-imgcount", dataCount);
                        $("#" + id + "_container_" + dataCount + uid).css("display", "block");
                        $("#" + id + "_container_" + dataCount + uid).attr("data-ms-widget-source", src);
                        image = new Image();
                        image.onload = function (e) {
                            try {
                                containerWidth = $("#" + id + "_container_" + dataCount + uid).width();
                                containerHeight = $("#" + id + "_container_" + dataCount + uid).height();
                                canvas = document.getElementById(id + "_canvas_" + dataCount + uid);
                                if (image.width > containerWidth || image.height > containerHeight) {
                                    canvas.height = containerHeight;
                                    canvas.width = containerWidth;
                                    canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
                                } else {
                                    canvas.width = image.width;
                                    canvas.height = image.height;
                                    canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        };
                        image.setAttribute("src", src);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                loadImage: function (id, uid, fileData, event) {
                    var dataCount,
                    imgCount,
                    widgetType,
                    attachmentInd,
                    src,
                    block,
                    contentType,
                    realBase64Data,
                    blob,
                    filename,
                    file,
                    imageFileObj,
                    count,
                    msLoopInd,
                    tempFilePath,
                    imageFilePath;
                    try {
                        src = "";
                        if (uid === undefined || uid === "") {
                            msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                            if (msLoopInd !== undefined && msLoopInd !== "") {
                                uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                                id = (uid === "") ? (id) : (id.replace("_" + uid, ""));
                            };
                        };
                        uid = (uid === "") ? (uid) : ("_" + uid);
                        imgCount = $("#" + id + uid).attr("data-ms-widget-imgcount");
                        dataCount = imgCount === undefined ? 1 : parseInt(imgCount) + 1;
                        widgetType = $("#" + id + uid).attr("data-ms-widget-type");
                        attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                        if (mService.app.channel === "web") {
                            src = fileData;
                            imageObj = {
                                name: "",
                                category: "",
                                type: "",
                                path: "",
                                extension: "",
                                dataFor: id,
                                dataCount: dataCount,
                                thumbnail: "",
                                uid: uid,
                            };
                            if (attachmentInd === "true") {
                                block = fileData.split(";");
                                contentType = block[0].split(":")[1];
                                realBase64Data = block[1].split(",")[1];
                                blob = mService.widgets.init.util.msCamera.convertToBlobFile(realBase64Data, contentType);
                                filename = "MS_" + mService.util.date.getDateTimeString(mService.util.date.getNewDate(), "yyyy-MM-dd-HHmmssfff") + ".jpg";
                                file = mService.widgets.init.util.msCamera.convertBlobToJPGFile(blob, filename);
                                imageFileObj = {
                                    name: filename,
                                    type: "image",
                                    file: file,
                                    extension: ".jpg",
                                };
                                imgCount = $("#" + id).attr("data-ms-widget-imgcount");
                                count = (imgCount === undefined) ? (1) : (parseInt(imgCount) + 1);
                                fileData = {};
                                fileData[count] = imageFileObj;
                                mService.widgets.variable.msGallery.webImage[id].push(fileData);
                            }
                        } else {
                            if (attachmentInd === "false") {
                                if (fileData.indexOf("data:image/png;base64,") === -1) {
                                    src = "data:image/png;base64," + fileData;
                                } else {
                                    src = fileData;
                                };
                                imageObj = {
                                    name: "",
                                    category: "",
                                    type: "",
                                    path: "",
                                    extension: "",
                                    dataFor: id,
                                    dataCount: dataCount,
                                    thumbnail: "",
                                    uid: uid,
                                };
                            } else {
                                if (mService.app.platform === 'Android') {
                                    fileData.thumbnail = fileData.thumbnail.replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", "");
                                    src = "data:image/png;base64," + fileData.thumbnail;
                                } else {
                                    src = ((fileData.filePath === undefined) ? (fileData.path) : (fileData.filePath)) + "/" + ((fileData.fileName === undefined) ? (fileData.name) : (fileData.fileName));
                                };
                                imageObj = {
                                    name: (fileData.fileName === undefined) ? (fileData.name) : (fileData.fileName),
                                    category: fileData.category,
                                    type: fileData.type,
                                    path: (fileData.filePath === undefined) ? (fileData.path) : (fileData.filePath),
                                    extension: (fileData.fileExtension === undefined) ? (fileData.extension) : (fileData.fileExtension),
                                    dataFor: id,
                                    dataCount: dataCount,
                                    thumbnail: (fileData.thumbnail === undefined || fileData.thumbnail === "") ? ("") : ((fileData.thumbnail.indexOf("data:image/png;base64,") === -1) ? ("data:image/png;base64," + fileData.thumbnail) : (fileData.thumbnail)),
                                    uid: uid,
                                };
                            };
                        };
                        if (widgetType === "msCamera") {
                            $("#" + id + "_add_container" + uid).before(kendo.template($("#msCameraContentTemplate").html())(imageObj));
                        } else {
                            $("#" + id + "_add_container" + uid).before(kendo.template($("#msImagepickerCameraContentTemplate").html())(imageObj));
                        };
                        $("#" + id + uid).attr("data-ms-count", parseInt($("#" + id + uid).attr("data-ms-count")) + 1);
                        $("#" + id + uid).attr("data-ms-widget-imgcount", dataCount);
                        $("#" + id + "_container_" + dataCount + uid).css("display", "block");
                        if (attachmentInd === "false" || mService.app.channel === "web") {
                            $("#" + id + "_container_" + dataCount + uid).attr("data-ms-widget-source", src);
                            $("#" + id + "_canvas_" + dataCount + uid).attr("src", src);
                            mService.widgets.event.change(mService.app.getScreenId(), id, event);
                        } else {
                            tempFilePath = ((fileData.filePath === undefined) ? (fileData.path) : (fileData.filePath));
                            imageFilePath = tempFilePath.replace(mService.nfs.root.replace("file://", ""), "").replace(mService.app.root, "").substring(1);
                            mService.nfs.getBase64String(imageFilePath + "/" + ((fileData.fileName === undefined) ? (fileData.name) : (fileData.fileName)), function (base64String) {
                                try {
                                    $("#" + id + "_canvas_" + dataCount + uid).attr("src", ("data:image/png;base64," + base64String));
                                    $("#" + id + "_container_" + dataCount + uid).attr("data-ms-widget-source", base64String);
                                    mService.widgets.event.change(mService.app.getScreenId(), id, event);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("image_base64_error", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                webCamPopup: {
                    init: function (id, success) {
                        try {
                            if ($("#" + id + "_web_camera_popup").data("kendoWindow") === undefined) {
                                $("#" + id + "_web_camera_popup").kendoWindow({
                                    width: screen.width * 0.5,
                                    maxHeight: screen.height * 0.8,
                                    minHeight: screen.height / 2,
                                    title: {
                                        text: "<span data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='web_cam_popup' data-ms-lbl-id='title'></span>",
                                        encoded: false
                                    },
                                    open: function () {
                                        try {
                                            mService.config.label.resolve();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    },
                                    close: function () {
                                        try {
                                            Webcam.off('error');
                                            Webcam.reset();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    },
                                    modal: true,
                                    draggable: false,
                                    resizable: false
                                });
                                $("#" + id + "_web_camera_popup").parent().addClass("ms_window");
                                success();
                            } else {
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    open: function (id) {
                        try {
                            $("#" + id).attr("data-ms-process-in-action", "false");
                            Webcam.reset();
                            Webcam.on('error', function (err) {
                                if (err.name === "NotAllowedError") {
                                    $("#" + id + "_images_container").show();
                                    $("#" + id + "_live_camera_container").hide();
                                    $("#" + id + "_camera_button_container").hide();
                                    $("#" + id + "_web_camera_popup").data("kendoWindow").close();
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "webcam_permission_denied",
                                        lblgrpid: "error",
                                    });
                                } else if (err.name === "NotReadableError") {
                                    $("#" + id + "_web_camera_popup").data("kendoWindow").close();
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "webcam_in_use",
                                        lblgrpid: "error",
                                    });
                                } else if (err.name === "NotFoundError") {
                                    $("#" + id + "_web_camera_popup").data("kendoWindow").close();
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "web_camera_not_available",
                                        lblgrpid: "error"
                                    });
                                } else {
                                    $("#" + id + "_web_camera_popup").data("kendoWindow").close();
                                    console.error(err.message);
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "web_camera_error_occured",
                                        lblgrpid: "error"
                                    });
                                }
                            });
                            Webcam.set({
                                width: 350,
                                height: 287,
                                image_format: 'jpeg',
                                jpeg_quality: 100
                            });
                            Webcam.attach("#" + id + "_live_camera_container");
                            $("#" + id + "_live_camera_container").show();
                            $("#" + id + "_camera_button_container").show();
                            $("#" + id + "_capture_button").show();
                            $("#" + id + "_close_button").hide();
                            $("#" + id + "_save_button").hide();
                            $("#" + id + "_web_camera_popup").data("kendoWindow").open().center();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    close: function (id) {
                        try {
                            $("#" + id + "_web_camera_popup").data("kendoWindow").close();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                }
            },
            msChat: {
                addAttachment: function (id, fileData) {
                    mService.widgets.variable.msChat.variable[id].content = "";
                    mService.widgets.variable.msChat.variable[id].msgType = "attachment";
                    mService.widgets.variable.msChat.variable[id].attachments = [];
                    mService.widgets.variable.msChat.schema.attachments = [];
                    mService.widgets.variable.msChat.variable[id].attachments[0] = {
                        "name": fileData.name,
                        "type": fileData.type,
                        "src": "msvMsg" + "\\\\" + "history" + "\\\\" + mService.app.id + "\\\\" + mService.widgets.variable.msChat.variable[id].key + "\\\\" + mService.widgets.variable.msChat.variable[id].subKey + "\\\\" + fileData.name
                    };
                    mService.widgets.variable.msChat.variable[id].from.sysMsg = "false";
                    mService.widgets.variable.msChat.variable[id].content = "";
                    mService.widgets.variable.msChat.variable[id].translations = "";
                    mService.widgets.init.util.msChat.setMsgFromDetails(id);
                    mService.api.chat.sendAttachment(id, fileData, function () {
                        mService.widgets.init.util.msChat.handleNotification(id, mService.widgets.init.util.msChat.getMsgBody(id), false, false, false, true);
                        mService.widgets.variable.msChat.variable[id].followup = "";
                        mService.widgets.init.util.msChat.sendMessageToServer(id, function (msgbody) {
                            return true;
                        }, function () {
                            return true;
                        });
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
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                },
                actionClick: function (id, obj) {
                    try {
                        mService.widgets.variable.msChat.variable[id].content = obj.title;
                        mService.widgets.variable.msChat.variable[id].msgType = "suggestion";
                        mService.widgets.variable.msChat.variable[id].actionPath = mService.widgets.variable.msChat.variable[id].actionPath + "/" + obj.value;
                        mService.widgets.variable.msChat.variable[id].custom = $.extend(true, mService.widgets.variable.msChat.variable[id].custom, obj.custom);
                        mService.widgets.init.util.msChat.setMsgFromDetails(id);
                        mService.widgets.variable.msChat.variable[id].translations = "";
                        mService.widgets.init.util.msChat.handleNotification(id, mService.widgets.init.util.msChat.getMsgBody(id), false, false, false, false);
                        mService.widgets.variable.msChat.variable[id].to = [{
                                id: mService.app.getUserId(),
                            }, ];
                        mService.widgets.init.util.msChat.updateChatHistory(id, function () {
                            try {
                                mService.widgets.variable.msChat.variable[id].to = "";
                                mService.widgets.variable.msChat.variable[id].followup = "";
                                mService.widgets.init.util.msChat.sendMessageToServer(id, function (msgbody) {
                                    return true;
                                }, function () {
                                    return true;
                                });
                                setTimeout(function () {
                                    try {
                                        $(".k-quick-replies").remove();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, 10);
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
                closeActionValueContainer: function (id) {
                    try {
                        $("#" + id + "_selected_action").text("");
                        $("#" + id + "_selected_action").attr("data-ms-custom", "");
                        $("#" + id + "_selected_action_container").hide("slow");
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                convertMessageBox: function (id) {
                    var messageBox,
                    messageInput,
                    messageTextarea;
                    try {
                        setTimeout(function () {
                            try {
                                messageBox = $(".k-message-box .k-input:visible");
                                messageInput = $("#" + messageBox.attr("id"));
                                messageTextarea = $("<textarea></textarea>").attr({
                                    id: $(messageInput).prop("id"),
                                    class: $(messageInput).attr("class"),
                                    placeHolder: $(messageInput).attr("placeholder"),
                                    style: "resize: none !important;overflow-y: scroll;max-height:10em;padding: 1.3em 0 1em 1em;  border-radius: 51px;  outline: none;",
                                    onInput: "this.parentNode.dataset.replicatedValue = this.value",
                                });
                                $(messageInput).after($(messageTextarea)).remove();
                                $(messageTextarea).wrap("<div class='grow-wrap'></div>");
                                $(messageTextarea).attr("data-ms-for", id);
                                if (mService.app.channel === "web") {
                                    $("#" + messageBox.attr("id")).keydown(function (event) {
                                        if (event.keyCode == 13 && !event.shiftKey) {
                                            mService.widgets.event.msChat.sendMessage(messageTextarea, event);
                                            return false;
                                        }
                                    });
                                    $(".k-button-send").attr("data-ms-widget-type", "msWidget").attr("data-ms-widget-group", "msChat").attr("data-ms-widget-role", "sendMessage").attr("data-ms-for", id).css("flex", "10");
                                } else {
                                    $(".k-button-send").attr("data-ms-widget-type", "msWidget").attr("data-ms-widget-group", "msChat").attr("data-ms-widget-role", "sendMessage").attr("data-ms-for", id);
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 200);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                createEscalationTimer: function (id, idleTime) {
                    try {
                        mService.widgets.variable.msChat.variable.idleTimer = setInterval(function () {
                            try {
                                mService.widgets.variable.msChat.variable[id].msgType = "suggestion";
                                mService.widgets.variable.msChat.variable[id].actionPath = mService.widgets.variable.msChat.variable[id].actionPath + "/" + "@NORESPONSE";
                                mService.widgets.variable.msChat.variable[id].followup = "";
                                mService.widgets.init.util.msChat.sendMessageToServer(id, function () {
                                    clearInterval(mService.widgets.variable.msChat.variable.idleTimer);
                                    mService.widgets.variable.msChat.variable.idleTimer = "";
                                }, function () {
                                    clearInterval(mService.widgets.variable.msChat.variable.idleTimer);
                                    mService.widgets.variable.msChat.variable.idleTimer = "";
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, (Number(idleTime) * 1000));
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                filterToolbarFeatures: function (toolbarButtons) {
                    var toolbarFeatures,
                    featureIndex,
                    feature;
                    try {
                        toolbarFeatures = ["MHMCHATATTACH", "MHMCHATDOC", "MHMCHATGALLERY", "MHMCHATCAMERA", "MHMCHATCLOSE", ];
                        for (featureIndex = 0; featureIndex < toolbarFeatures.length; featureIndex++) {
                            feature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                try {
                                    return (e.p_child_feature_id_or_group === toolbarFeatures[featureIndex]);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                            if (feature.length === 0) {
                                toolbarButtons = toolbarButtons.filter((item) => item.name !== toolbarButtons[featureIndex].name);
                            }
                        };
                        return toolbarButtons;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                handleNotification: function (id, msgBody, allowedCheckInd, checkActionList, loadHistoryInd, resetInd) {
                    var scrID;
                    try {
                        scrID = mService.app.getScreenId();
                        if (mService.widgets.init.util.msChat.isAllowed(msgBody, allowedCheckInd)) {
                            if (!mService.widgets.init.util.msChat.isDuplicateNotification(id, msgBody)) {
                                mService.widgets.init.util.msChat.renderMessage(id, msgBody, checkActionList, loadHistoryInd, resetInd);
                                mService.widgets.init.util.msChat.scrollToBottom();
                            }
                        };
                        mService.pattern.query.util.hideShowMessageBox(id, msgBody);
                        if (mService.widgets.variable.msChat.variable.idleTimer === undefined) {
                            mService.widgets.variable.msChat.variable.idleTimer = "";
                        };
                        if (mService.widgets.variable.msChat.variable.idleTimer !== "") {
                            clearInterval(mService.widgets.variable.msChat.variable.idleTimer);
                            mService.widgets.variable.msChat.variable.idleTimer = "";
                        };
                        if (msgBody.idleTime !== null && msgBody.idleTime !== undefined && msgBody.idleTime !== "") {
                            mService.widgets.init.util.msChat.createEscalationTimer(id, msgBody.idleTime);
                        };
                        if (msgBody.refreshHeader !== null && msgBody.refreshHeader !== undefined && msgBody.refreshHeader !== "" && msgBody.refreshHeader === "true") {
                            if (msgBody.custom.transaction_ref_no !== undefined && msgBody.custom.transaction_ref_no !== null && msgBody.custom.transaction_ref_no !== "") {
                                if (mService.app.channel === "web") {
                                    mService.pattern.query.util.getCallDetails(scrID.replace("chat", "") + "_list", msgBody.custom.transaction_ref_no, function (result) {
                                        try {
                                            if (result === "internet_not_available") {
                                                mService.app.showToast("internet_connection_error", "system_messages");
                                            } else {
                                                mService.widgets.init.util.msChat.loadHeader(id, result)
                                            };
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.containR.util.getCallDetails(scrID.replace("chat", "") + "list", msgBody.custom.transaction_ref_no, function (result) {
                                        try {
                                            if (result === "internet_not_available") {
                                                mService.app.showToast("internet_connection_error", "system_messages");
                                            } else {
                                                mService.containR.variable[scrID].selectedRecord = result;
                                                mService.widgets.init.util.msChat.loadHeader(id, result)
                                            };
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                }
                            }
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                sendMessageToServer: function (id, success, failure) {
                    try {
                        mService.api.chat.sendMessage(mService.widgets.init.util.msChat.getMsgBody(id), function (msgBody) {
                            try {
                                if (msgBody !== undefined) {
                                    if (mService.app.channel === "web") {
                                        if (mService.widgets.variable.msChat.variable[id].custom !== undefined && mService.widgets.variable.msChat.variable[id].custom.transaction_ref_no === undefined) {
                                            if (msgBody.custom.transaction_ref_no !== undefined) {
                                                mService.pattern.query.util.loadCalls((msgBody.scrID).replace("_chat", ""), true);
                                                if (mService.app.getScreenId() === "my_activities_logging") {
                                                    setTimeout(function () {
                                                        if (mService.widgets.variable.msChat.variable.my_activities_logging_chat_content.custom.transaction_ref_no !== undefined) {
                                                            if ($("[data-ms-link-role='CPORTACTOPEN']").length != 0) {
                                                                $("[data-ms-link-role='CPORTACTOPEN']").click();
                                                                setTimeout(function () {
                                                                    if (mService.pattern.query.variable.tabstrip !== undefined) {
                                                                        if (mService.widgets.variable.msChat.variable.my_activities_logging_chat_content.custom.action_path == "@INIT/@CAMPAIGN") {
                                                                            mService.pattern.query.variable.tabstrip.select(1);
                                                                        } else {
                                                                            mService.pattern.query.variable.tabstrip.select(0);
                                                                        };
                                                                        setTimeout(function () {
                                                                            $("#" + mService.widgets.variable.msChat.variable.my_activities_logging_chat_content.custom.transaction_ref_no + "_container").click();
                                                                        }, 500);
                                                                    };
                                                                }, 500);
                                                            };
                                                        };
                                                    }, 3000);
                                                };
                                            }
                                        };
                                    };
                                    mService.widgets.variable.msChat.variable[id] = msgBody;
                                    mService.widgets.init.util.msChat.updateChatHistory(id, function () {
                                        try {
                                            mService.widgets.init.util.msChat.handle(id, msgBody);
                                            if (msgBody.followup !== undefined) {
                                                if (msgBody.followup !== "" && msgBody.followup !== "false") {
                                                    mService.widgets.variable.msChat.variable[id].msgType = "suggestion";
                                                    mService.widgets.init.util.msChat.sendMessageToServer(id, function () {
                                                        mService.widgets.variable.msChat.variable[id].followup = "false";
                                                        success();
                                                    }, function () {
                                                        failure();
                                                    });
                                                } else if (msgBody.followup === "") {
                                                    mService.widgets.variable.msChat.variable[id].msgType = "suggestion";
                                                    mService.widgets.variable.msChat.variable[id].followup = "false";
                                                    mService.widgets.init.util.msChat.sendMessageToServer(id, function () {
                                                        success();
                                                    }, function () {
                                                        failure();
                                                    });
                                                } else {
                                                    success(msgBody);
                                                }
                                            } else {
                                                success(msgBody);
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            try {
                                                if (mService.app.channel === "web") {
                                                    mService.app.alert("error", {
                                                        scrid: "",
                                                        lblid: "chat_auto_reply_error",
                                                        lblgrpid: "error",
                                                    });
                                                } else {
                                                    mService.app.showToast("chat_auto_reply_error", "system_messages");
                                                };
                                                failure();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.widgets.variable.msChat.variable[id].autoReply = "";
                                    success();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                try {
                                    if (mService.app.channel === "web") {
                                        mService.app.alert("error", {
                                            scrid: "",
                                            lblid: "chat_auto_reply_error",
                                            lblgrpid: "error",
                                        });
                                    } else {
                                        mService.app.showToast("chat_auto_reply_error", "system_messages");
                                    };
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                setMsgFromDetails: function (id) {
                    var date;
                    try {
                        date = mService.util.date.getNewDate();
                        mService.widgets.variable.msChat.variable[id].info = {};
                        mService.widgets.variable.msChat.variable[id].info.date = mService.util.date.getDateTimeString(date, "yyyy-MM-dd");
                        mService.widgets.variable.msChat.variable[id].info.hour = mService.util.date.getDateTimeString(date, "HH");
                        mService.widgets.variable.msChat.variable[id].info.min = mService.util.date.getDateTimeString(date, "mm");
                        mService.widgets.variable.msChat.variable[id].info.sec = mService.util.date.getDateTimeString(date, "ss");
                        mService.widgets.variable.msChat.variable[id].info.id = "";
                        mService.widgets.variable.msChat.variable[id].from.id = mService.app.getUserId().toUpperCase();
                        mService.widgets.variable.msChat.variable[id].from.name = mService.app.getTitle() + " " + mService.app.getFirstName() + " " + mService.app.getLastName();
                        mService.widgets.variable.msChat.variable[id].from.initial = (mService.app.getFirstName().trim().charAt(0).toUpperCase()) + (mService.app.getLastName().trim().charAt(0).toUpperCase());
                        mService.widgets.variable.msChat.variable[id].from.channel = mService.app.channel;
                        mService.widgets.variable.msChat.variable[id].from.sysMsg = "";
                        mService.widgets.variable.msChat.variable[id].to = "";
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getChatTheme: function (id, msgBody) {
                    var themeVariable,
                    user;
                    try {
                        if (mService.widgets.variable.msChat.theme[id] === undefined) {
                            mService.widgets.variable.msChat.theme[id] = {};
                        };
                        themeVariable = mService.widgets.variable.msChat.theme[id];
                        user = (msgBody.from.sysMsg === "true") ? (mService.app.name) : (msgBody.from.id);
                        if (themeVariable[user] === undefined) {
                            themeVariable[user] = (Object.keys(mService.widgets.variable.msChat.theme[id]).length === 0) ? (1) : ((Object.values(themeVariable)[Object.keys(themeVariable).length - 1] === 10) ? ((Object.values(themeVariable)[Object.keys(themeVariable).length - 1]) - 1) : ((Object.values(themeVariable)[Object.keys(themeVariable).length - 1]) + 1));
                        };
                        return themeVariable[user];
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getMsgBody: function (id) {
                    var schema,
                    chatVariable;
                    try {
                        schema = JSON.parse(JSON.stringify(mService.widgets.variable.msChat.schema));
                        chatVariable = mService.widgets.variable.msChat.variable[id];
                        schema.key = chatVariable.key;
                        schema.subKey = chatVariable.subKey;
                        schema.from = {
                            id: chatVariable.from.id,
                            name: chatVariable.from.name,
                            initial: chatVariable.from.initial,
                            channel: chatVariable.from.channel,
                            sysMsg: chatVariable.from.sysMsg
                        };
                        schema.to = chatVariable.to;
                        schema.scrID = chatVariable.scrID;
                        schema.msgType = chatVariable.msgType;
                        schema.content = chatVariable.content;
                        schema.followup = (chatVariable.followup === undefined) ? ("") : (chatVariable.followup);
                        schema.actionPath = chatVariable.actionPath;
                        schema.custom = chatVariable.custom;
                        schema.suggestions = chatVariable.suggestions;
                        schema.attachments = chatVariable.attachments;
                        schema.actions = (chatVariable.actions === undefined) ? ("") : (chatVariable.actions);
                        schema.allowMsg = (chatVariable.allowMsg === undefined) ? ("") : (chatVariable.allowMsg);
                        schema.allowAttach = (chatVariable.allowAttach === undefined) ? ("") : (chatVariable.allowAttach);
                        schema.refreshHeader = "";
                        schema.translations = chatVariable.translations;
                        schema.autoReply = chatVariable.autoReply;
                        schema.info = {
                            date: chatVariable.info.date,
                            hour: chatVariable.info.hour,
                            min: chatVariable.info.min,
                            sec: chatVariable.info.sec
                        };
                        return schema;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getMsgOwnerInfo: function (id, msgBody) {
                    var ownerInfo;
                    try {
                        if (msgBody.from.id.toLowerCase() === mService.app.getUserId().toLowerCase()) {
                            if (msgBody.from.sysMsg === "true") {
                                ownerInfo = {
                                    id: kendo.guid(),
                                    name: mService.app.name,
                                    iconUrl: mService.app.channel === "mobile" ? "../ux/image/app_header_icon.png" : "www/ux/image/app_header_icon.png",
                                };
                            } else {
                                ownerInfo = mService.widgets.variable.msChat.widget[id].getUser();
                            }
                        } else {
                            ownerInfo = {
                                id: kendo.guid(),
                                name: msgBody.from.name,
                                iconUrl: mService.app.channel === "mobile" ? "../lib/mservice/styles/image/chat_receiver.png" : "www/lib/mservice/styles/image/chat_receiver.png",
                            };
                        };
                        return ownerInfo;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                handle: function (id, msgBody) {
                    try {
                        mService.widgets.variable.msChat.variable[id] = msgBody;
                        mService.widgets.init.util.msChat.handleNotification(id, msgBody, false, false, false, false);
                        if (mService.app.channel === "mobile") {
                            window.plugins.OneSignal.clearOneSignalNotifications();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                handleFormWidgets: function (id, obj) {
                    var tempList,
                    widgetsList;
                    try {
                        mService.spinner.show();
                        widgetsList = [];
                        $("#" + id + "_action_form_submit_button").attr("ms_action_title", obj.title);
                        $("#" + id + "_action_form_submit_button").attr("ms_action_value", obj.value);
                        actionsTemplate = $("body [data-ms-mswidget-for='" + id + "'][data-ms-mswidget-template-type='actionSheet']");
                        if (actionsTemplate.length > 0) {
                            $("#" + id + "_action_form_content").html(kendo.template($(actionsTemplate).html())({
                                    id: id.replace("_content", "")
                                }));
                            tempList = $("#" + id + "_action_form_content").find(mService.widgets.init.wSelector);
                            for (var index = 0; index < tempList.length; index++) {
                                if ($(tempList[index]).attr("action_widget_for") === (obj.value).replace("@", "")) {
                                    widgetsList.push(tempList[index]);
                                } else {
                                    $(tempList[index]).remove();
                                }
                            };
                        };
                        if (widgetsList.length > 0) {
                            mService.containR.pattern.form.init.createWidgets(widgetsList, mService.app.getScreenId());
                            setTimeout(function () {
                                try {
                                    if (mService.app.channel === "web") {
                                        if (mService.containR.variable[mService.app.getScreenId()] === undefined) {
                                            mService.containR.variable[mService.app.getScreenId()] = {};
                                        };
                                        if (mService.containR.variable[mService.app.getScreenId() + "_chat"] === undefined) {
                                            mService.containR.variable[mService.app.getScreenId() + "_chat"] = {};
                                        };
                                    };
                                    mService.config.label.resolve(mService.app.getScreenId());
                                    if (mService.app.channel === "web") {
                                        mService.containR.config.rule.apply(mService.app.getScreenId() + "_chat");
                                    } else {
                                        mService.containR.config.rule.apply(mService.app.getScreenId());
                                    };
                                    if (mService.config.rule.executeRuleStatements({
                                            screenID: ((mService.app.channel === "web") ? (mService.app.getScreenId() + "_chat") : (mService.app.getScreenId())),
                                            objectID: "screen",
                                            eventID: "load",
                                            fieldID: mService.app.getScreenId().replace("_chat", "") + "_" + (obj.value).replace("@", "")
                                        })) {
                                        mService.spinner.hide();
                                        $("#" + id + "_message_box_group").hide();
                                        $("#" + id + "_action_panel_container").hide();
                                        if (mService.app.channel === "web") {
                                            if ($("#" + id + "_actions_container").is(":visible")) {
                                                $("#" + id).css("padding-bottom", "9em");
                                            } else {
                                                $("#" + id).css("padding-bottom", "4em");
                                            }
                                        };
                                        kendo.fx($("#" + id + "_action_form_container")).slideIn("up").duration(700).play();
                                        $("#" + id + "_footer").show("slow");
                                    } else {
                                        mService.spinner.hide();
                                        mService.app.showToast("form_rule_execution_error", mService.app.getScreenId());
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 1000);
                        } else {
                            mService.widgets.variable.msChat.variable[id].content = obj.title;
                            mService.widgets.variable.msChat.variable[id].msgType = "action";
                            mService.widgets.variable.msChat.variable[id].actionPath = mService.widgets.variable.msChat.variable[id].actionPath + "/" + obj.value;
                            mService.widgets.init.util.msChat.setMsgFromDetails(id);
                            mService.widgets.variable.msChat.variable[id].translations = "";
                            if (mService.config.rule.executeRuleStatements({
                                    screenID: mService.app.getScreenId(),
                                    objectID: "button",
                                    eventID: "click",
                                    fieldID: mService.app.getScreenId().replace("_chat", "") + "_" + (obj.value).replace("@", "")
                                })) {
                                mService.widgets.init.util.msChat.handleNotification(id, mService.widgets.init.util.msChat.getMsgBody(id), false, false, false, false);
                                mService.widgets.variable.msChat.variable[id].to = [{
                                        id: mService.app.getUserId(),
                                    }, ];
                                mService.widgets.init.util.msChat.updateChatHistory(id, function () {
                                    try {
                                        mService.widgets.variable.msChat.variable[id].to = "";
                                        mService.widgets.variable.msChat.variable[id].followup = "";
                                        mService.widgets.init.util.msChat.sendMessageToServer(id, function (msgbody) {
                                            mService.spinner.hide();
                                            mService.containR.pattern.form.util.addDataSource(mService.app.getScreenId(), function () {
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
                                            mService.spinner.hide();
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
                                mService.app.showToast("form_rule_execution_error", mService.app.getScreenId());
                            }
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                isAllowed: function (msgBody, allowedCheckInd) {
                    var returnVal,
                    fromCheck,
                    receipientsCheck;
                    try {
                        returnVal = false;
                        if (allowedCheckInd !== undefined && allowedCheckInd === true) {
                            if (msgBody.to !== "") {
                                for (index = 0; index < msgBody.to.length; index++) {
                                    if (msgBody.autoReply === "true") {
                                        if (msgBody.to[index].id.toLowerCase() === mService.app.getUserId().toLowerCase()) {
                                            returnVal = true;
                                            break;
                                        }
                                    } else {
                                        fromCheck = $.grep(msgBody.to, function (e, i) {
                                            try {
                                                return (e.id.toLowerCase() === mService.app.getUserId().toLowerCase());
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        })[0];
                                        if (fromCheck !== undefined) {
                                            returnVal = true;
                                            break;
                                        } else {
                                            if (msgBody.from.id.toLowerCase() === mService.app.getUserId().toLowerCase()) {
                                                returnVal = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (msgBody.autoReply === "true") {
                                    if (msgBody.from.id.toLowerCase() === mService.app.getUserId().toLowerCase()) {
                                        returnVal = true;
                                    }
                                } else {
                                    if (msgBody.from.id.toLowerCase() === mService.app.getUserId().toLowerCase()) {
                                        returnVal = true;
                                    }
                                }
                            };
                            if (returnVal === false && ((mService.containR.variable[mService.app.getScreenId()].selectedRecord.chat_receipients !== undefined))) {
                                receipientsCheck = $.grep(((mService.containR.variable[mService.app.getScreenId()].selectedRecord.chat_receipients).split(",")), function (e, i) {
                                    try {
                                        return (e === "@" + mService.app.getUserId().toLowerCase());
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                })[0];
                                if (receipientsCheck !== undefined) {
                                    returnVal = true;
                                }
                            }
                        } else {
                            returnVal = true;
                        };
                        return returnVal;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                isDuplicateNotification: function (id, msgBody) {
                    var chatMessages,
                    returnVal = false;
                    try {
                        if (msgBody.info.id !== undefined) {
                            chatMessages = $("#" + id + " [data-ms-msg-info-id]");
                            for (index = 0; index < chatMessages.length; index++) {
                                if ($(chatMessages[index]).attr("data-ms-msg-info-id") !== "" && $(chatMessages[index]).attr("data-ms-msg-info-id") === msgBody.info.id) {
                                    returnVal = true;
                                }
                            }
                        };
                        return returnVal;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                loadChatHistory: function (id, success, failure) {
                    var serverPath,
                    localPath,
                    index,
                    chatVariable,
                    checkActionList,
                    filteredData,
                    transactionMessages;
                    try {
                        checkActionList = false;
                        chatVariable = mService.widgets.variable.msChat.variable[id];
                        if (mService.app.channel === "web") {
                            if (chatVariable.key !== "transaction_messages") {
                                $.ajax({
                                    url: mService.app.clientURL + "/" + "content_store" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + chatVariable.key + "/" + chatVariable.subKey + "/" + chatVariable.subKey + ".txt",
                                    async: false,
                                    method: "GET",
                                    dataType: "text",
                                    contentType: "application/json; charset=utf-8",
                                    success: function (response, status) {
                                        var msgDate = "",
                                        data;
                                        try {
                                            data = JSON.parse("[" + response.substring(1, response.length) + "]");
                                            mService.widgets.variable.msChat.dSource[id] = new kendo.data.DataSource({
                                                data: data,
                                            });
                                            mService.widgets.variable.msChat.dSource[id].read();
                                            filteredData = [];
                                            for (var i = 0; i < data.length; i++) {
                                                if (mService.widgets.init.util.msChat.isAllowed(data[i], true)) {
                                                    filteredData.push(data[i]);
                                                };
                                            };
                                            for (index = 0; index < filteredData.length; index++) {
                                                mService.widgets.variable.msChat.variable[id] = filteredData[index];
                                                if (msgDate !== filteredData[index].info.date) {
                                                    msgDate = filteredData[index].info.date;
                                                    mService.widgets.init.util.msChat.renderTimeline(id, filteredData[index]);
                                                };
                                                if (index === filteredData.length - 1) {
                                                    mService.widgets.init.util.msChat.handleNotification(id, filteredData[index], true, false, false, false);
                                                    mService.pattern.query.util.updateCallStatus(id, mService.app.getScreenId());
                                                } else {
                                                    mService.widgets.init.util.msChat.handleNotification(id, filteredData[index], true, true, false, false);
                                                }
                                            };
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
                                    },
                                });
                            } else {
                                transactionMessages = mService.dSource.getSource({
                                    code: "'mserviceAI_transactionMessagesList'",
                                    inputXml: "{\"transaction_type\":\"'" + chatVariable.custom.trans_type + "'\", \"request_ref_no\":\"'" + chatVariable.subKey + "'\", \"scrID\":\"'" + id.replace("_content", "") + "'\"}"
                                });
                                transactionMessages.read().then(function () {
                                    var msgDate = "",
                                    data;
                                    try {
                                        data = transactionMessages.data();
                                        mService.widgets.variable.msChat.dSource[id] = new kendo.data.DataSource({
                                            data: data,
                                        });
                                        mService.widgets.variable.msChat.dSource[id].read();
                                        filteredData = [];
                                        for (var i = 0; i < data.length; i++) {
                                            if (mService.widgets.init.util.msChat.isAllowed(data[i], true)) {
                                                filteredData.push(data[i]);
                                            };
                                        };
                                        for (index = 0; index < filteredData.length; index++) {
                                            mService.widgets.variable.msChat.variable[id] = filteredData[index];
                                            if (msgDate !== filteredData[index].info.date) {
                                                msgDate = filteredData[index].info.date;
                                                mService.widgets.init.util.msChat.renderTimeline(id, filteredData[index]);
                                            };
                                            if (index === filteredData.length - 1) {
                                                mService.widgets.init.util.msChat.handleNotification(id, filteredData[index], true, false, false, false);
                                                mService.pattern.query.util.updateCallStatus(id, mService.app.getScreenId());
                                            } else {
                                                mService.widgets.init.util.msChat.handleNotification(id, filteredData[index], true, true, false, false);
                                            }
                                        };
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            }
                        } else {
                            chatVariable = mService.widgets.variable.msChat.variable[id];
                            serverPath = mService.app.clientURL + "/" + "content_store" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + chatVariable.key + "/" + chatVariable.subKey + "/" + chatVariable.subKey + ".txt";
                            localPath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + chatVariable.key + "/" + chatVariable.subKey + "/" + chatVariable.subKey + ".txt";
                            mService.nfs.deleteFile(localPath, function () {
                                try {
                                    mService.nfs.downloadFile(serverPath, localPath, true, function () {
                                        try {
                                            mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + chatVariable.key + "/" + chatVariable.subKey + "/" + chatVariable.subKey + ".txt", function (data) {
                                                try {
                                                    data = JSON.parse("[" + data.substring(1, data.length) + "]");
                                                    mService.widgets.variable.msChat.dSource[id] = new kendo.data.DataSource({
                                                        data: data,
                                                    });
                                                    mService.widgets.variable.msChat.dSource[id].read();
                                                    filteredData = [];
                                                    for (var i = 0; i < data.length; i++) {
                                                        if (mService.widgets.init.util.msChat.isAllowed(data[i], true)) {
                                                            filteredData.push(data[i]);
                                                        };
                                                    };
                                                    for (index = 0; index < filteredData.length; index++) {
                                                        mService.widgets.variable.msChat.variable[id] = filteredData[index];
                                                        if (index === filteredData.length - 1) {
                                                            mService.widgets.init.util.msChat.handleNotification(id, filteredData[index], true, false, false, false);
                                                        } else {
                                                            mService.widgets.init.util.msChat.handleNotification(id, filteredData[index], true, true, false, false);
                                                        }
                                                    };
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
                                    mService.nfs.downloadFile(serverPath, localPath, true, function () {
                                        try {
                                            mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + chatVariable.key + "/" + chatVariable.subKey + "/" + chatVariable.subKey + ".txt", function (data) {
                                                try {
                                                    data = JSON.parse("[" + data.substring(1, data.length) + "]");
                                                    mService.widgets.variable.msChat.dSource[id] = new kendo.data.DataSource({
                                                        data: data,
                                                    });
                                                    mService.widgets.variable.msChat.dSource[id].read();
                                                    filteredData = [];
                                                    for (var i = 0; i < data.length; i++) {
                                                        if (mService.widgets.init.util.msChat.isAllowed(data[i], true)) {
                                                            filteredData.push(data[i]);
                                                        };
                                                    };
                                                    for (index = 0; index < filteredData.length; index++) {
                                                        mService.widgets.variable.msChat.variable[id] = filteredData[index];
                                                        if (index === filteredData.length - 1) {
                                                            mService.widgets.init.util.msChat.handleNotification(id, filteredData[index], true, false, false, false);
                                                        } else {
                                                            mService.widgets.init.util.msChat.handleNotification(id, filteredData[index], true, true, false, false);
                                                        }
                                                    };
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
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                loadToolbar: function (id) {
                    try {
                        $("#" + id + "_attachment").replaceWith(mService.config.template.getTransformedHtml("msChatToolbarAttachmentTemplate", {
                                id: id + "_attachment",
                            }));
                        $("#" + id + "_attachment").kendoUpload({
                            multiple: false,
                        });
                        $("#" + id + "_attachment_group").find(".k-upload-button").prepend("<i class='fa-solid fa-paperclip ms_chat_toolbar_attachment_icon' style='width: 2em;height: 2em;border-radius: 50%;display: flex;justify-content: center;align-items: center;'> </i>");
                        var btn = $("#" + id + "_attachment_group").find(".k-upload-button");
                        $(btn).find("span").text("");
                        $("#" + id + "_attachment_group").find(".k-upload-files").hide();
                        mService.home.userAttachment.util.getAttachmentControlPanel();
                        $("#" + id + "_attachment").data("kendoUpload").bind("select", function (event) {
                            var index,
                            extensionCheckIndicator,
                            sizeCheckIndicator,
                            changeIndicator,
                            allowedFileExtensions;
                            try {
                                $("#" + id + "_attachment_group").find(".k-upload-files").hide();
                                changeIndicator = true;
                                setTimeout(function () {
                                    try {
                                        $("#" + id + "_attachment_group").find(".k-upload-files").hide();
                                        for (index = 0; index < event.files.length; index++) {
                                            if (index === 0) {
                                                allowedFileExtensions = [];
                                                extensionCheckIndicator = $.grep(mService.home.userAttachment.allowedFileExtensions, function (e, i) {
                                                    try {
                                                        allowedFileExtensions.push(e.extension);
                                                        return (e.extension.toLowerCase() === event.files[index].extension.toLowerCase());
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                })[0];
                                                if (extensionCheckIndicator === undefined) {
                                                    mService.app.alert("info", {
                                                        scrid: "",
                                                        lblid: "fileExtensionCheck",
                                                        lblgrpid: "attachment",
                                                        key: allowedFileExtensions.join(),
                                                    });
                                                    event.preventDefault();
                                                    changeIndicator = false;
                                                    break;
                                                };
                                                sizeCheckIndicator = $.grep(mService.home.userAttachment.allowedFileSize, function (e, i) {
                                                    try {
                                                        return (e.category === extensionCheckIndicator.category);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                })[0];
                                                if (event.files[index].size > parseInt(sizeCheckIndicator.size) * 1024 * 1024) {
                                                    mService.app.alert("info", {
                                                        scrid: "",
                                                        lblid: "fileSizeCheck",
                                                        lblgrpid: "attachment",
                                                        key: sizeCheckIndicator.size,
                                                    });
                                                    event.preventDefault();
                                                    changeIndicator = false;
                                                    break;
                                                };
                                                event.files[index].category = extensionCheckIndicator.category;
                                                event.files[index].type = extensionCheckIndicator.type;
                                                event.files[index].name = "MS_" + mService.util.date.getDateTimeString(mService.util.date.getNewDate(), "yyyy-MM-dd-HHmmssfff") + index.toString() + event.files[index].extension;
                                            }
                                        };
                                        if (changeIndicator === true) {
                                            mService.widgets.init.util.msChat.addAttachment(id, event.files[0]);
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, 50);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                previewPopup: {
                    open: function (id, fileObj) {
                        try {
                            $("#" + id + "_preview_popup").kendoWindow({
                                width: screen.width,
                                height: screen.height * 0.9,
                                title: {
                                    text: "<span data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='camera_preview_popup' data-ms-lbl-id='title'></span>",
                                    encoded: false,
                                },
                                open: function () {
                                    try {
                                        mService.config.label.resolve();
                                        $("#" + id + "_attachment_preview").html("");
                                        if (fileObj.docType === "A") {
                                            $("#" + id + "_attachment_preview").msAudioplayer({
                                                source: fileObj.docSrc,
                                            });
                                        } else if (fileObj.docType === "V") {
                                            $("#" + id + "_attachment_preview").msVideoplayer({
                                                source: fileObj.docSrc,
                                            });
                                        } else if (fileObj.docType === "I") {
                                            $("#" + id + "_attachment_preview").msImageviewer({
                                                source: fileObj.docSrc,
                                            });
                                        } else if (fileObj.docType === "D" || fileObj.docType === "P") {
                                            $("#" + id + "_attachment_preview").msPdfviewer({
                                                source: fileObj.docSrc,
                                            });
                                        } else {
                                            mService.app.showToast("unsupport_document", "view");
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                                close: function () {
                                    try {
                                        mService.widgets.init.util.msLoop.pausePlayer();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                                modal: true,
                                draggable: false,
                                resizable: false,
                            });
                            $("#" + id + "_preview_popup").parent().addClass("ms_window");
                            $("#" + id + "_preview_popup").data("kendoWindow").open().center();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                },
                renderTimeline: function (id, msgBody) {
                    try {
                        mService.widgets.variable.msChat.widget[id].renderAttachments({
                            attachments: [{
                                    contentType: "timeline",
                                    content: msgBody
                                }, ],
                            attachmentLayout: "list",
                        }, mService.widgets.init.util.msChat.getMsgOwnerInfo(id, msgBody));
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                renderMessage: function (id, msgBody, checkActionList, loadHistoryInd, resetInd) {
                    var iObj,
                    actions,
                    actionsTemplate,
                    contentType;
                    try {
                        iObj = {
                            id: id,
                            scrID: msgBody.scrID,
                            theme: mService.widgets.init.util.msChat.getChatTheme(id, msgBody),
                            localPathRoot: (mService.app.channel === "web") ? ("www") : (".."),
                            sender: ((msgBody.from.id.toLowerCase() === mService.app.getUserId().toLowerCase()) && (msgBody.from.sysMsg !== "true")) ? (true) : (false),
                            iscontentTranslated: (msgBody.translations !== undefined && msgBody.translations !== "" && msgBody.translations !== null) ? (true) : (false),
                            translation: (msgBody.translations !== undefined && msgBody.translations !== "" && msgBody.translations !== null) ? (msgBody.translations[mService.app.getLocaleId().substring(0, 2)]) : (""),
                            msgContent: ((msgBody.content.indexOf("\n") !== -1 || msgBody.content.indexOf("<br>") !== -1)) ? (msgBody.content.replace(/<br>/g, "\n")) : (msgBody.content),
                            selectedAction: ((msgBody.msgType === "action") ? (msgBody.actionPath.split('/').pop().replace("@", "")) : (""))
                        };
                        if (msgBody.msgType === "suggestion") {
                            contentType = "suggestion";
                        } else if (msgBody.msgType === "action") {
                            contentType = "action";
                        } else if (msgBody.msgType === "attachment") {
                            contentType = "attachment";
                        } else {
                            contentType = "text";
                        };
                        id = (id.indexOf("_content") === -1) ? (id + "_content") : (id);
                        mService.widgets.variable.msChat.widget[id].renderAttachments({
                            attachments: [{
                                    contentType: contentType,
                                    content: $.extend(true, msgBody, iObj),
                                }
                            ],
                            attachmentLayout: "list",
                        }, mService.widgets.init.util.msChat.getMsgOwnerInfo(id, msgBody));
                        if (!checkActionList && msgBody.actions !== "" && msgBody.actions.length > 0) {
                            actions = mService.widgets.init.util.msChat.validateActions(msgBody.actions);
                            if (actions.length > 0) {
                                if (mService.app.channel === "web") {
                                    $("#" + id).css("padding-bottom", "9em");
                                };
                                actionsTemplate = $("body [data-ms-mswidget-for='" + ((id.indexOf("_content") === -1) ? (id + "_content") : id) + "'][data-ms-mswidget-template-type='workflowAction']");
                                $("#" + id + "_actions_container").html(kendo.template(actionsTemplate.length === 0 ? $("#msChatActionPanelDefaultTemplate").html() : $(actionsTemplate).html())({
                                        id: id,
                                        actions: actions
                                    }));
                                $("#" + id + "_action_panel_container").show("slow");
                                $("#" + id + "_action_panel_container").css("display", "flex");
                            } else {
                                if (mService.app.channel === "web") {
                                    if ($("#" + id + "_actions_container").is(":visible")) {
                                        $("#" + id).css("padding-bottom", "9em");
                                    } else {
                                        $("#" + id).css("padding-bottom", "4em");
                                    }
                                };
                                $("#" + id + "_action_panel_container").hide("slow");
                            }
                        } else {
                            $("#" + id + "_action_panel_container").hide("slow");
                        };
                        mService.widgets.variable.msChat.variable[id].from.sysMsg = "";
                        mService.widgets.variable.msChat.variable[id].suggestions = "";
                        mService.widgets.variable.msChat.variable[id].translations = "";
                        if (resetInd !== undefined && !resetInd) {
                            mService.widgets.variable.msChat.variable[id].attachments = [];
                        };
                        mService.presentR.resource.applyChatLogo();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                loadHeader: function (id, selectedRecord) {
                    var chatHeaderTemplate;
                    try {
                        if (Object.keys(selectedRecord).length > 0) {
                            chatHeaderTemplate = $("body [data-ms-mswidget-for='" + id + "'][data-ms-mswidget-template-type='chat_header']");
                            mService.widgets.variable.msChat.variable[id].selectedRecord = selectedRecord;
                            $("#" + id + "_chat_header_container").css("display", "flex");
                            $("#" + id + "_chat_header").html(kendo.template(chatHeaderTemplate.length === 0 ? $("#msChatHeaderDefaultTemplate").html() : $(chatHeaderTemplate).html())(selectedRecord));
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                renderSuggestionsOptions: function (id, msgBody) {
                    var chatListContainer,
                    lastMsg;
                    try {
                        chatListContainer = $(".k-message-list-content");
                        lastMsg = chatListContainer.children().last();
                        $(lastMsg).find("[data-ms-chat-bubble-container='true']").append('<div class="k-quick-replies" style="margin-left: 2em;margin-top: 5px;">' + mService.config.template.getRenderedHtml("msChatSuggestionsTemplate", msgBody.suggestions.map((obj) => ({
                                        ...obj,
                                        id: id,
                                        theme: mService.widgets.init.util.msChat.getChatTheme(id, msgBody)
                                    }))) + "</div>");
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                renderTypingIndicator: function (id) {
                    try {
                        var chat = $("#" + id).data("kendoChat");
                        chat.renderUserTypingIndicator({
                            id: "MyCTCARE",
                            name: "MyCTCARE",
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                scrollToBottom: function (index) {
                    try {
                        setTimeout(function () {
                            var chatListContainer,
                            chatListItems;
                            try {
                                chatListContainer = $(".k-message-list-content");
                                chatListItems = chatListContainer.children();
                                if (chatListItems.length > 0) {
                                    if (index === undefined) {
                                        if (chatListItems.length > 4) {
                                            chatListItems[chatListItems.length - 1].scrollIntoView(true);
                                        }
                                    } else {
                                        chatListItems[index].scrollIntoView(true);
                                    }
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 200);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                setupNewChat: function (id) {
                    try {
                        mService.widgets.variable.msChat.variable[id].msgType = "suggestion";
                        if (typeof(mServiceQueryByPassing) !== "undefined") {
                            mService.widgets.variable.msChat.variable[id].actionPath = mServiceQueryByPassing.action_path;
                            $.extend(mService.widgets.variable.msChat.variable[id].custom, mServiceQueryByPassing);
                            delete mServiceQueryByPassing;
                        } else {
                            mService.widgets.variable.msChat.variable[id].actionPath = "@INIT";
                        };
                        mService.widgets.init.util.msChat.setMsgFromDetails(id);
                        mService.widgets.init.util.msChat.sendMessageToServer(id, function () {
                            return true;
                        }, function () {
                            return true;
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                setupOldChat: function (id) {
                    try {
                        mService.spinner.show();
                        mService.widgets.init.util.msChat.loadChatHistory(id, function () {
                            try {
                                mService.widgets.init.util.msChat.scrollToBottom();
                                mService.spinner.hide();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.spinner.hide();
                                if (mService.app.channel === "web") {
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "msChat_load_history_error",
                                        lblgrpid: "error",
                                    });
                                } else {
                                    mService.app.showToast("msChat_load_history_error", "system_messages");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                setupToolbar: function (id) {
                    var toolbarButtons;
                    try {
                        toolbarButtons = [{
                                name: "attachment",
                                iconClass: "k-icon k-i-attachment",
                            }, {
                                name: "document",
                                iconClass: "k-icon k-i-document-manager",
                            }, {
                                name: "gallery",
                                iconClass: "k-icon k-i-image",
                            }, {
                                name: "camera",
                                iconClass: "k-icon k-i-photo-camera",
                            }, {
                                name: "close",
                                iconClass: "k-icon k-i-close",
                            }, ];
                        mService.widgets.variable.msChat.widget[id].setOptions({
                            toolbar: {
                                toggleable: true,
                                buttons: toolbarButtons,
                            },
                        });
                        mService.widgets.init.util.msChat.convertMessageBox(id);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                setupTranslatedContent: function (data) {
                    try {
                        if (data.translations !== undefined && data.translations !== "" && data.translations !== null) {
                            for (index = 0; index < Object.keys(data.translations).length; index++) {
                                if (Object.keys(data.translations)[index] === mService.app.getLocaleId().substring(0, 2)) {
                                    if (data.content !== Object.values(data.translations)[index]) {
                                        data.content = Object.values(data.translations)[index] + "[" + data.content + "]";
                                    }
                                }
                            }
                        };
                        return data;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                toolClick: function (id, event) {
                    try {
                        if (event.name === "close") {
                            mService.widgets.init.util.msChat.toolClickClose(id, event);
                        } else if (event.name === "attachment") {
                            mService.widgets.init.util.msChat.toolClickAttachment(id, event);
                        } else if (event.name === "document") {
                            mService.widgets.init.util.msChat.toolClickDocument(id, event);
                        } else if (event.name === "gallery") {
                            mService.widgets.init.util.msChat.toolClickGallery(id, event);
                        } else if (event.name === "camera") {
                            mService.widgets.init.util.msChat.toolClickCamera(id, event);
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                toolClickAttachment: function (id, event) {
                    var destinationPath;
                    try {
                        destinationPath = mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey;
                        window.minterface("FileChooser", [{
                                    destinationPath: destinationPath,
                                }, ], function (src) {
                            try {
                                mService.util.validateFile(src, "ALLOWED_ATTACHMENT_SIZE_CACHE", "ALLOWED_ATTACHMENT_EXTENSION_CACHE", function (fileData) {
                                    try {
                                        if (mService.app.platform == "Android") {
                                            mService.home.attachmentProgressPopup.changeTitle("upload");
                                            mService.home.attachmentProgressPopup.open();
                                        };
                                        window.minterface("SendChatAttachment", [{
                                                    filePath: fileData.filePath + "/" + fileData.fileName,
                                                    serverPath: "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey,
                                                    fileName: fileData.fileName,
                                                }, ], function (src) {
                                            var progressBar;
                                            try {
                                                if (src === "success") {
                                                    mService.widgets.variable.msChat.variable[id].content = "";
                                                    mService.widgets.variable.msChat.variable[id].msgType = "attachment";
                                                    mService.widgets.variable.msChat.variable[id].attachments = [];
                                                    mService.widgets.variable.msChat.schema.attachments = [];
                                                    mService.widgets.variable.msChat.variable[id].attachments[0] = {
                                                        "name": fileData.fileName,
                                                        "type": fileData.type,
                                                        "src": "msvMsg" + "\\\\" + "history" + "\\\\" + mService.app.id + "\\\\" + mService.widgets.variable.msChat.variable[id].key + "\\\\" + mService.widgets.variable.msChat.variable[id].subKey + "\\\\" + fileData.fileName
                                                    };
                                                    mService.widgets.variable.msChat.variable[id].attachments[0].src = "msvMsg" + "\\\\" + "history" + "\\\\" + mService.app.id + "\\\\" + mService.widgets.variable.msChat.variable[id].key + "\\\\" + mService.widgets.variable.msChat.variable[id].subKey + "\\\\" + mService.widgets.variable.msChat.variable[id].attachments[0].name;
                                                    mService.widgets.variable.msChat.variable[id].content = "";
                                                    mService.widgets.variable.msChat.variable[id].translations = "";
                                                    mService.widgets.init.util.msChat.setMsgFromDetails(id);
                                                    mService.widgets.init.util.msChat.handleNotification(id, mService.widgets.init.util.msChat.getMsgBody(id), false, false, false, true);
                                                    mService.widgets.variable.msChat.variable[id].followup = "";
                                                    mService.widgets.init.util.msChat.sendMessageToServer(id, function (msgbody) {
                                                        mService.home.attachmentProgressPopup.close();
                                                    }, function () {
                                                        mService.home.attachmentProgressPopup.close();
                                                    });
                                                } else {
                                                    progressBar = $("#attachment_progressbar").data("kendoProgressBar");
                                                    progressBar.value(src.progress);
                                                }
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function (errorMsg) {
                                            try {
                                                mService.home.attachmentProgressPopup.close();
                                                mService.app.showToast("msAttachment_file_upload_failure", "system_messages");
                                                mService.exception.handle(errorMsg);
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
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                mService.app.showToast("msAttachment_file_failure", "system_messages");
                                mService.exception.handle(errorMsg);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                toolClickCamera: function (id, event) {
                    var destinationPath;
                    try {
                        destinationPath = mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey;
                        mService.api.permission.checkStatus(function (data) {
                            try {
                                if (data.camera !== undefined) {
                                    if (data.camera === "YES") {
                                        window.minterface("CaptureImageFromCamera", [{
                                                    destinationPath: destinationPath,
                                                    attachmentInd: "true",
                                                }, ], function (data) {
                                            try {
                                                mService.util.validateFile(data, "ALLOWED_ATTACHMENT_SIZE_CACHE", "ALLOWED_ATTACHMENT_EXTENSION_CACHE", function (fileData) {
                                                    try {
                                                        mService.home.attachmentProgressPopup.changeTitle("upload");
                                                        mService.home.attachmentProgressPopup.open();
                                                        window.minterface("SendChatAttachment", [{
                                                                    filePath: fileData.filePath + "/" + fileData.fileName,
                                                                    serverPath: "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey,
                                                                    fileName: fileData.fileName,
                                                                }, ], function (src) {
                                                            var progressBar;
                                                            try {
                                                                if (src === "success") {
                                                                    mService.widgets.variable.msChat.variable[id].content = "";
                                                                    mService.widgets.variable.msChat.variable[id].msgType = "attachment";
                                                                    mService.widgets.variable.msChat.variable[id].attachments = [];
                                                                    mService.widgets.variable.msChat.schema.attachments = [];
                                                                    mService.widgets.variable.msChat.variable[id].attachments[0] = {
                                                                        "name": fileData.fileName,
                                                                        "type": fileData.type,
                                                                        "src": "msvMsg" + "\\\\" + "history" + "\\\\" + mService.app.id + "\\\\" + mService.widgets.variable.msChat.variable[id].key + "\\\\" + mService.widgets.variable.msChat.variable[id].subKey + "\\\\" + fileData.fileName
                                                                    };
                                                                    mService.widgets.variable.msChat.variable[id].attachments[0].src = "msvMsg" + "\\\\" + "history" + "\\\\" + mService.app.id + "\\\\" + mService.widgets.variable.msChat.variable[id].key + "\\\\" + mService.widgets.variable.msChat.variable[id].subKey + "\\\\" + mService.widgets.variable.msChat.variable[id].attachments[0].name;
                                                                    mService.widgets.variable.msChat.variable[id].content = "";
                                                                    mService.widgets.variable.msChat.variable[id].translations = "";
                                                                    mService.widgets.init.util.msChat.setMsgFromDetails(id);
                                                                    mService.widgets.init.util.msChat.handleNotification(id, mService.widgets.init.util.msChat.getMsgBody(id), false, false, false, true);
                                                                    mService.widgets.init.util.msChat.sendMessageToServer(id, function (msgbody) {
                                                                        mService.home.attachmentProgressPopup.close();
                                                                    }, function () {
                                                                        mService.home.attachmentProgressPopup.close();
                                                                    });
                                                                } else {
                                                                    progressBar = $("#attachment_progressbar").data("kendoProgressBar");
                                                                    progressBar.value(src.progress);
                                                                }
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function (errorMsg) {
                                                            try {
                                                                mService.home.attachmentProgressPopup.close();
                                                                mService.app.showToast("msAttachment_file_upload_failure", "system_messages");
                                                                mService.exception.handle(errorMsg);
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
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function (errorMsg) {
                                            try {
                                                mService.app.showToast("camera_image_failure", "system_messages");
                                                mService.exception.handle(errorMsg);
                                                return true;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        mService.app.showToast("camera_permission_not_provided", "system_messages");
                                    }
                                } else {
                                    console.error("failed to read permission settings file");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                toolClickGallery: function (id, event) {
                    var destinationPath;
                    try {
                        destinationPath = mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey;
                        window.minterface("PickImageFromGallery", [{
                                    destinationPath: destinationPath,
                                    attachmentInd: "true",
                                }, ], function (data) {
                            try {
                                mService.util.validateFile(data, "ALLOWED_ATTACHMENT_SIZE_CACHE", "ALLOWED_ATTACHMENT_EXTENSION_CACHE", function (fileData) {
                                    try {
                                        mService.home.attachmentProgressPopup.changeTitle("upload");
                                        mService.home.attachmentProgressPopup.open();
                                        window.minterface("SendChatAttachment", [{
                                                    filePath: fileData.filePath + "/" + fileData.fileName,
                                                    serverPath: "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey,
                                                    fileName: fileData.fileName,
                                                }, ], function (src) {
                                            var progressBar;
                                            try {
                                                if (src === "success") {
                                                    mService.widgets.variable.msChat.variable[id].content = "";
                                                    mService.widgets.variable.msChat.variable[id].msgType = "attachment";
                                                    mService.widgets.variable.msChat.variable[id].attachment.name = fileData.fileName;
                                                    mService.widgets.variable.msChat.variable[id].attachment.type = fileData.type;
                                                    mService.widgets.variable.msChat.variable[id].attachment.src = "msvMsg" + "\\\\" + "history" + "\\\\" + mService.app.id + "\\\\" + mService.widgets.variable.msChat.variable[id].key + "\\\\" + mService.widgets.variable.msChat.variable[id].subKey + "\\\\" + mService.widgets.variable.msChat.variable[id].attachment.name;
                                                    mService.widgets.variable.msChat.variable[id].attachment.src = "msvMsg" + "\\\\" + "history" + "\\\\" + mService.app.id + "\\\\" + mService.widgets.variable.msChat.variable[id].key + "\\\\" + mService.widgets.variable.msChat.variable[id].subKey + "\\\\" + mService.widgets.variable.msChat.variable[id].attachment.name;
                                                    mService.widgets.init.util.msChat.setMsgFromDetails(id);
                                                    mService.widgets.init.util.msChat.handleNotification(id, mService.widgets.init.util.msChat.getMsgBody(id), false, false, false, true);
                                                    mService.widgets.init.util.msChat.sendMessageToServer(id, function (msgbody) {
                                                        mService.home.attachmentProgressPopup.close();
                                                    }, function () {
                                                        mService.home.attachmentProgressPopup.close();
                                                    });
                                                } else {
                                                    progressBar = $("#attachment_progressbar").data("kendoProgressBar");
                                                    progressBar.value(src.progress);
                                                }
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function (errorMsg) {
                                            try {
                                                mService.home.attachmentProgressPopup.close();
                                                mService.app.showToast("msAttachment_file_upload_failure", "system_messages");
                                                mService.exception.handle(errorMsg);
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
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                mService.app.showToast("gallery_image_failure", "system_messages");
                                mService.exception.handle(errorMsg);
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                registerChatTemplates: function (id) {
                    var textTemplate,
                    suggestionTemplate,
                    attachmentTemplate,
                    timelineTemplate;
                    try {
                        textTemplate = $("body [data-ms-mswidget-for='" + id + "'][data-ms-mswidget-template-type='text']");
                        suggestionTemplate = $("body [data-ms-mswidget-for='" + id + "'][data-ms-mswidget-template-type='suggestion']");
                        attachmentTemplate = $("body [data-ms-mswidget-for='" + id + "'][data-ms-mswidget-template-type='attachment']");
                        timelineTemplate = $("body [data-ms-mswidget-for='" + id + "'][data-ms-mswidget-template-type='timeline']");
                        actionTemplate = $("body [data-ms-mswidget-for='" + id + "'][data-ms-mswidget-template-type='action']");
                        kendo.chat.registerTemplate("action", kendo.template(actionTemplate.length === 0 ? $("#msChatActionDefaultTemplate").html() : $(actionTemplate).html()));
                        kendo.chat.registerTemplate("suggestion", kendo.template(suggestionTemplate.length === 0 ? $("#msChatSuggestionDefaultTemplate").html() : $(suggestionTemplate).html()));
                        kendo.chat.registerTemplate("text", kendo.template(textTemplate.length === 0 ? $("#msChatTextDefaultTemplate").html() : $(textTemplate).html()));
                        kendo.chat.registerTemplate("attachment", kendo.template(attachmentTemplate.length === 0 ? $("#msChatAttachmentDefaultTemplate").html() : $(attachmentTemplate).html()));
                        kendo.chat.registerTemplate("timeline", kendo.template(timelineTemplate.length === 0 ? $("#msChatTimelineDefaultTemplate").html() : $(timelineTemplate).html()));
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateChatHistory: function (id, success, failure) {
                    try {
                        if (mService.app.channel === "mobile") {
                            mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey + "/" + mService.widgets.variable.msChat.variable[id].subKey + ".txt", function (data) {
                                try {
                                    mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey + "/" + mService.widgets.variable.msChat.variable[id].subKey + ".txt", data + "," + JSON.stringify(mService.widgets.init.util.msChat.getMsgBody(id)), function () {
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
                                    mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + mService.widgets.variable.msChat.variable[id].key + "/" + mService.widgets.variable.msChat.variable[id].subKey + "/" + mService.widgets.variable.msChat.variable[id].subKey + ".txt", "," + JSON.stringify(mService.widgets.init.util.msChat.getMsgBody(id)), function () {
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
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                validateActions: function (actions) {
                    var actionsList,
                    featureAccess,
                    counter;
                    try {
                        if (mService.app.channel === "web") {
                            actionsList = [];
                            for (counter = 0; counter < actions.length; counter++) {
                                featureAccess = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                    try {
                                        return (e.p_child_screen_id).toLowerCase() === ((actions[counter].value).replace("@", "")).toLowerCase();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                })[0];
                                if (featureAccess !== undefined && featureAccess.p_feature_access === "true") {
                                    actionsList.push(actions[counter]);
                                }
                            };
                            return actionsList;
                        } else {
                            actionsList = [];
                            for (counter = 0; counter < actions.length; counter++) {
                                featureAccess = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                    try {
                                        return (e.p_child_screen_id).toLowerCase() === ((actions[counter].value).replace("@", "")).toLowerCase();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                })[0];
                                if (featureAccess !== undefined && featureAccess.p_feature_access === "true") {
                                    actionsList.push(actions[counter]);
                                }
                            };
                            return actionsList;
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            },
            msGallery: {
                loadImage: function (id, uid, fileData, event) {
                    var id,
                    dataCount,
                    imgCount,
                    widgetType,
                    attachmentInd,
                    src,
                    tempFilePath,
                    imageFilePath;
                    try {
                        src = "";
                        if (uid === undefined || uid === "") {
                            msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                            if (msLoopInd !== undefined && msLoopInd !== "") {
                                uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                                id = (uid === "") ? (id) : (id.replace("_" + uid, ""));
                            };
                        };
                        uid = (uid === "") ? (uid) : ("_" + uid);
                        imgCount = $("#" + id + uid).attr("data-ms-widget-imgcount");
                        dataCount = imgCount === undefined ? 1 : parseInt(imgCount) + 1;
                        widgetType = $("#" + id + uid).attr("data-ms-widget-type");
                        attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                        if (mService.app.channel === "web") {
                            src = fileData;
                            imageObj = {
                                name: "",
                                category: "",
                                type: "",
                                path: "",
                                extension: "",
                                dataFor: id,
                                dataCount: dataCount,
                                thumbnail: "",
                                uid: uid,
                            };
                        } else {
                            if (attachmentInd === "false") {
                                if (fileData.indexOf("data:image/png;base64,") === -1) {
                                    src = "data:image/png;base64," + fileData;
                                } else {
                                    src = fileData;
                                };
                                imageObj = {
                                    name: "",
                                    category: "",
                                    type: "",
                                    path: "",
                                    extension: "",
                                    dataFor: id,
                                    dataCount: dataCount,
                                    thumbnail: "",
                                    uid: uid,
                                };
                            } else {
                                if (mService.app.platform === 'Android') {
                                    fileData.thumbnail = fileData.thumbnail.replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", "");
                                    src = "data:image/png;base64," + fileData.thumbnail;
                                } else {
                                    src = ((fileData.filePath === undefined) ? (fileData.path) : (fileData.filePath)) + "/" + ((fileData.fileName === undefined) ? (fileData.name) : (fileData.fileName));
                                };
                                imageObj = {
                                    name: (fileData.fileName === undefined) ? (fileData.name) : (fileData.fileName),
                                    category: fileData.category,
                                    type: fileData.type,
                                    path: (fileData.filePath === undefined) ? (fileData.path) : (fileData.filePath),
                                    extension: (fileData.fileExtension === undefined) ? (fileData.extension) : (fileData.fileExtension),
                                    dataFor: id,
                                    dataCount: dataCount,
                                    thumbnail: (fileData.thumbnail === undefined || fileData.thumbnail === "") ? ("") : ((fileData.thumbnail.indexOf("data:image/png;base64,") === -1) ? ("data:image/png;base64," + fileData.thumbnail) : (fileData.thumbnail)),
                                    uid: uid,
                                };
                            };
                        };
                        if (widgetType === "msGallery") {
                            $("#" + id + "_add_container" + uid).before(kendo.template($("#msGalleryContentTemplate").html())(imageObj));
                        } else {
                            $("#" + id + "_add_container" + uid).before(kendo.template($("#msImagepickerCameraContentTemplate").html())(imageObj));
                        };
                        $("#" + id + uid).attr("data-ms-count", parseInt($("#" + id + uid).attr("data-ms-count")) + 1);
                        $("#" + id + uid).attr("data-ms-widget-imgcount", dataCount);
                        $("#" + id + "_container_" + dataCount + uid).css("display", "block");
                        if (attachmentInd === "false" || mService.app.channel === "web") {
                            $("#" + id + "_container_" + dataCount + uid).attr("data-ms-widget-source", src);
                            $("#" + id + "_canvas_" + dataCount + uid).attr("src", src);
                            mService.widgets.event.change(mService.app.getScreenId(), id, event);
                        } else {
                            tempFilePath = ((fileData.filePath === undefined) ? (fileData.path) : (fileData.filePath));
                            imageFilePath = tempFilePath.replace(mService.nfs.root.replace("file://", ""), "").replace(mService.app.root, "").substring(1);
                            mService.nfs.getBase64String(imageFilePath + "/" + ((fileData.fileName === undefined) ? (fileData.name) : (fileData.fileName)), function (base64String) {
                                try {
                                    $("#" + id + "_canvas_" + dataCount + uid).attr("src", ("data:image/png;base64," + base64String));
                                    $("#" + id + "_container_" + dataCount + uid).attr("data-ms-widget-source", base64String);
                                    mService.widgets.event.change(mService.app.getScreenId(), id, event);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("image_base64_error", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getBase64String: function (file, success) {
                    try {
                        reader = new FileReader();
                        reader.addEventListener("load", function () {
                            success(reader.result);
                        });
                        reader.readAsDataURL(file);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            },
            msGeotag: {
                displayAddress: function (id, locationData, uid, evt) {
                    try {
                        mService.spinner.show();
                        var coordinates = locationData.split(",");
                        $("#" + id + uid).attr("data-ms-value", coordinates[0].toString().substring(0, 10) + "," + coordinates[1].toString().substring(0, 10));
                        $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                        mService.util.getAddress(coordinates[0], coordinates[1], function (address) {
                            try {
                                mService.spinner.hide();
                                $("#" + id + "_result_content" + uid).show();
                                $("#" + id + "_result_address" + uid).show();
                                $("#" + id + "_result_latlng" + uid).hide();
                                $("#" + id + "_result_address" + uid).text(address);
                                mService.widgets.event.change(mService.app.getScreenId(), id, evt);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            mService.spinner.hide();
                            $("#" + id + "_result_content" + uid).show();
                            $("#" + id + "_result_latlng" + uid).show();
                            $("#" + id + "_result_address" + uid).hide();
                            $("#" + id + "_result_lat" + uid).text(coordinates[0].toString().substring(0, 10));
                            $("#" + id + "_result_lng" + uid).text(coordinates[1].toString().substring(0, 10));
                            mService.widgets.event.change(mService.app.getScreenId(), id, evt);
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            msLoop: {
                animation: {
                    delete : function (id, success) {
                        try {
                            var effect = kendo.fx($("#" + id)).fade("out").startValue(0.5).duration(700);
                            effect.play().then(function () {
                                success();
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    slide: function (id, direction) {
                        try {
                            kendo.fx($("#" + id)).slideIn(direction).duration(500).play();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                },
                createBlock: function (widgetID, uid, visibleBlockUID, setValInd, scrID) {
                    var fieldsHtml,
                    widgetsList,
                    newBlockUID;
                    try {
                        fieldsHtml = mService.widgets.variable.msLoop.subFieldsHtml[widgetID];
                        if (uid !== "") {
                            mService.widgets.init.util.msLoop.updateUID(widgetID, uid);
                        };
                        $("#" + widgetID + "_content").append(mService.config.template.getTransformedHtml("msLoop_block_template", {
                                scrid: scrID,
                                id: widgetID,
                                fields_html: fieldsHtml,
                                uid: uid === "" ? "" : uid,
                            }));
                        widgetsList = $("#" + widgetID + "_loop_block").find(mService.widgets.init.wSelector);
                        mService.containR.pattern.form.init.createWidgets(widgetsList, scrID);
                        mService.config.label.resolve(scrID);
                        if (uid === "" && !setValInd) {
                            if (mService.widgets.variable.msLoop.dataSrc[widgetID].data().length === 0) {
                                mService.widgets.variable.msLoop.dataSrc[widgetID] = new kendo.data.DataSource({
                                    data: [mService.widgets.init.util.msLoop.getValues(widgetID + "_loop_block", scrID), ],
                                });
                                mService.widgets.variable.msLoop.dataSrc[widgetID].read();
                            } else {
                                mService.widgets.variable.msLoop.dataSrc[widgetID].add(mService.widgets.init.util.msLoop.getValues(widgetID + "_loop_block", scrID));
                            }
                        };
                        newBlockUID = mService.widgets.variable.msLoop.dataSrc[widgetID].data()[mService.widgets.variable.msLoop.dataSrc[widgetID].data().length - 1].uid;
                        mService.widgets.init.util.msLoop.updatePager(widgetID, newBlockUID);
                        $("#" + widgetID + "_loop_block").attr("data-ms-widget-uid", newBlockUID);
                        $("#" + widgetID + "_loop_block" + "_" + visibleBlockUID).hide();
                        mService.widgets.init.util.msLoop.animation.slide(widgetID + "_loop_block", "left");
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                deleteBlock: function (widgetID, uid, dataSource, index, currentDataItem) {
                    var blockToDelete,
                    flag,
                    visibleBlock;
                    try {
                        if (index === dataSource.data().length - 1) {
                            flag = "previous";
                        } else {
                            flag = "next";
                        };
                        if ($("#" + widgetID + "_loop_block_" + uid).length === 1) {
                            blockToDelete = widgetID + "_loop_block_" + uid;
                        } else {
                            blockToDelete = widgetID + "_loop_block";
                        };
                        mService.widgets.init.util.msMobileNumber.deleteBottomSheet(blockToDelete, uid);
                        mService.widgets.init.util.msLoop.animation.delete(blockToDelete, function () {
                            try {
                                $("#" + blockToDelete).remove();
                                mService.widgets.init.util.msLoop.showBlock(widgetID, dataSource, index, flag, function (nextBlockItem) {
                                    try {
                                        dataSource.remove(currentDataItem);
                                        if (nextBlockItem !== undefined) {
                                            mService.widgets.init.util.msLoop.updatePager(widgetID, nextBlockItem.uid);
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                                visibleBlock = $("#" + widgetID + "_content [data-ms-widget-msloopblock]:visible");
                                uid = $(visibleBlock).attr("data-ms-widget-uid");
                                mService.config.rule.executeRuleStatements({
                                    screenID: mService.app.getScreenId(),
                                    objectID: "screen",
                                    eventID: "unload",
                                    fieldID: widgetID,
                                    uid: uid,
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getSingleWidgetValues: function (msloopBlockId, widgetID, scrID) {
                    var inputValObj = {},
                    index,
                    fieldList,
                    returnVal,
                    fieldID,
                    uid;
                    try {
                        returnVal = 0;
                        fieldList = $("#" + msloopBlockId).find(mService.widgets.init.wSelector);
                        for (index = 0; index < fieldList.length; index++) {
                            fieldID = $(fieldList[index]).attr("id");
                            uid = $(fieldList[index]).attr("data-ms-widget-uid");
                            uid = uid === undefined ? "" : "_" + uid;
                            if (fieldID === widgetID + uid) {
                                fieldID = fieldID.replace(scrID + "_", "").replace(uid, "");
                                returnVal = $(fieldList[index]).getVal() === null ? "" : $(fieldList[index]).getVal();
                            }
                        };
                        return returnVal === "" ? 0 : returnVal;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getValues: function (msloopBlockId, scrID) {
                    var inputValObj = {},
                    index,
                    fieldList,
                    timeBoxValue;
                    try {
                        fieldList = $("#" + msloopBlockId).find(mService.widgets.init.wSelector);
                        for (index = 0; index < fieldList.length; index++) {
                            var fieldID = $(fieldList[index]).attr("id").replace(scrID + "_", "");
                            var uid = $(fieldList[index]).attr("data-ms-widget-uid");
                            if (uid !== undefined) {
                                fieldID = fieldID.replace("_" + uid, "");
                            };
                            if ($(fieldList[index]).attr("data-ms-widget-type") === "msDatebox" || $(fieldList[index]).attr("data-ms-widget-type") === "msTimebox") {
                                if ($(fieldList[index]).attr("data-ms-widget-type") === "msDatebox") {
                                    inputValObj[fieldID] = $(fieldList[index]).getVal() === null ? "" : mService.util.getDateTimeString($(fieldList[index]).getVal(), "yyyy-MM-dd");
                                } else {
                                    timeBoxValue = $(fieldList[index]).getVal() === null ? "" : mService.util.getDateTimeString($(fieldList[index]).getVal(), "HH:mm:ss");
                                    if (timeBoxValue !== "") {
                                        timeBoxValue = timeBoxValue.split(":");
                                        inputValObj[fieldID + "_hour"] = timeBoxValue[0].trim();
                                        inputValObj[fieldID + "_minute"] = timeBoxValue[1].trim();
                                        inputValObj[fieldID + "_second"] = timeBoxValue[2].trim();
                                    } else {
                                        inputValObj[fieldID + "_hour"] = "";
                                        inputValObj[fieldID + "_minute"] = "";
                                        inputValObj[fieldID + "_second"] = "";
                                    }
                                }
                            } else {
                                inputValObj[fieldID] = $(fieldList[index]).getVal() === null ? "" : $(fieldList[index]).getVal();
                            }
                        };
                        return inputValObj;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                navigate: function (ele, direction) {
                    var widgetID,
                    visibleBlock,
                    uid,
                    dataSource,
                    currentDataItem,
                    nextBlockItem,
                    nextBlockIndex,
                    index;
                    try {
                        widgetID = ele.attr("for");
                        mService.widgets.init.util.buttonStatePressed(ele.attr("id"));
                        visibleBlock = $("#" + widgetID + "_content [data-ms-widget-msloopblock]:visible");
                        uid = $(visibleBlock).attr("data-ms-widget-uid");
                        dataSource = mService.widgets.variable.msLoop.dataSrc[widgetID];
                        currentDataItem = dataSource.getByUid(uid);
                        index = dataSource.indexOf(currentDataItem);
                        nextBlockIndex = direction === "left" ? index - 1 : index + 1;
                        nextBlockItem = dataSource.at(nextBlockIndex);
                        $(visibleBlock).hide();
                        if ($("#" + widgetID + "_loop_block_" + nextBlockItem.uid).length === 1) {
                            $("#" + widgetID + "_loop_block_" + nextBlockItem.uid).show();
                            mService.widgets.init.util.msLoop.animation.slide(widgetID + "_loop_block_" + nextBlockItem.uid, direction === "left" ? "right" : "left");
                        } else {
                            $("#" + widgetID + "_loop_block").show();
                            mService.widgets.init.util.msLoop.animation.slide(widgetID + "_loop_block", direction === "left" ? "right" : "left");
                        };
                        mService.widgets.init.util.msLoop.updatePager(widgetID, nextBlockItem.uid);
                    } catch (error) {}
                },
                pausePlayer: function (id) {
                    var playerWidgets,
                    index,
                    mediaPlayer;
                    try {
                        playerWidgets = $("body [data-ms-widget-type='msAudioplayer'],[data-ms-widget-type='msVideoplayer']");
                        if (playerWidgets.length > 0) {
                            for (index = 0; index < playerWidgets.length; index++) {
                                uid = "";
                                id = $(playerWidgets[index]).attr("id");
                                mediaPlayer = document.getElementById(id);
                                if (mediaPlayer.nodeName.toLowerCase() === "video" || mediaPlayer.nodeName.toLowerCase() === "audio") {
                                    mediaPlayer.pause();
                                }
                            }
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                showBlock: function (widgetID, dataSource, index, flag, success) {
                    var nextBlockItem;
                    try {
                        if (flag === "previous") {
                            if (dataSource.data().length === 1) {
                                $("#" + widgetID + "_msloop_container").hide();
                                $("#" + widgetID + "_createbtn_span").show();
                            } else {
                                nextBlockItem = dataSource.at(index - 1);
                            }
                        } else {
                            nextBlockItem = dataSource.at(index + 1);
                        };
                        if (nextBlockItem !== undefined) {
                            if ($("#" + widgetID + "_loop_block_" + nextBlockItem.uid).length === 1) {
                                $("#" + widgetID + "_loop_block_" + nextBlockItem.uid).show();
                                mService.widgets.init.util.msLoop.animation.slide(widgetID + "_loop_block_" + nextBlockItem.uid, flag === "previous" ? "right" : "left");
                            } else {
                                $("#" + widgetID + "_loop_block").show();
                                mService.widgets.init.util.msLoop.animation.slide(widgetID + "_loop_block", flag === "previous" ? "right" : "left");
                            }
                        } else {
                            $("#" + widgetID + "_loop_block").show();
                            mService.widgets.init.util.msLoop.animation.slide(widgetID + "_loop_block", "right");
                        };
                        success(nextBlockItem);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateData: function (widgetID, draftObj, scrID) {
                    var fields;
                    try {
                        fields = $("#" + widgetID + "_loop_block").find(mService.widgets.init.wSelector);
                        for (var index = 0; index < fields.length; index++) {
                            var id = $(fields[index]).attr("id");
                            if ($("#" + id).attr("data-ms-widget-type") === "msTimebox") {
                                $("#" + id).setVal(draftObj[id.replace(scrID + "_", "") + "_hour"] + ":" + draftObj[id.replace(scrID + "_", "") + "_minute"] + ":" + draftObj[id.replace(scrID + "_", "") + "_second"]);
                            } else {
                                $("#" + id).setVal(draftObj[id.replace(scrID + "_", "")]);
                            }
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateUID: function (widgetID, uid) {
                    var fields,
                    subfieldsIndex,
                    dropDownEle,
                    dropDownOptions;
                    try {
                        fields = $("#" + widgetID + "_loop_block").find(mService.widgets.init.wSelector);
                        $("#" + widgetID + "_loop_block").attr("id", widgetID + "_loop_block" + "_" + uid);
                        for (subfieldsIndex = 0; subfieldsIndex < fields.length; subfieldsIndex++) {
                            var id = $(fields[subfieldsIndex]).attr("id");
                            if ($("#" + id).attr("data-ms-widget-type") === "msAttachment" || $("#" + id).attr("data-ms-widget-type") === "msCamera" || $("#" + id).attr("data-ms-widget-type") === "msGallery" || $("#" + id).attr("data-ms-widget-type") === "msImagepicker") {
                                attachmentFiles = $("#" + id + "_src [data-ms-widget-source]");
                                for (index = 0; index < attachmentFiles.length; index++) {
                                    $(attachmentFiles[index]).attr("data-ms-widget-uid", uid);
                                    $(attachmentFiles[index]).attr("id", $(attachmentFiles[index]).attr("id") + "_" + uid);
                                    if ($("#" + id).attr("data-ms-widget-type") === "msCamera" || $("#" + id).attr("data-ms-widget-type") === "msGallery" || $("#" + id).attr("data-ms-widget-type") === "msImagepicker") {
                                        var id = $(attachmentFiles[index]).attr("for");
                                        $("#" + id + "_canvas_" + (index + 1)).attr("id", $("#" + id + "_canvas_" + (index + 1)).attr("id") + "_" + uid);
                                    }
                                }
                            } else if ($("#" + id).attr("data-ms-widget-type") === "msCheckboxgroup") {
                                checkboxItems = $("#" + id + "_group").find('[type="checkbox"]');
                                for (index = 0; index < checkboxItems.length; index++) {
                                    $(checkboxItems[index]).attr("name", $(checkboxItems[index]).attr("name") + "_" + uid);
                                    $(checkboxItems[index]).attr("id", $(checkboxItems[index]).attr("id") + "_" + uid);
                                    $(checkboxItems[index]).attr("data-ms-widget-uid", uid);
                                }
                            } else if ($("#" + id).attr("data-ms-widget-type") === "msRadiogroup") {
                                checkboxItems = $("#" + id + "_group").find('[type="radio"]');
                                for (index = 0; index < checkboxItems.length; index++) {
                                    $(checkboxItems[index]).attr("name", $(checkboxItems[index]).attr("name") + "_" + uid);
                                    $(checkboxItems[index]).attr("id", $(checkboxItems[index]).attr("id") + "_" + uid);
                                    $(checkboxItems[index]).attr("data-ms-widget-uid", uid);
                                }
                            } else if ($("#" + id).attr("data-ms-widget-type") === "msMobileNumber") {
                                $("#" + id + "_bottom_sheet").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_bottom_sheet").attr("id", id + "_bottom_sheet" + "_" + uid);
                                $("#" + id + "_bottom_sheet_close").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_bottom_sheet_close").attr("id", id + "_bottom_sheet_close" + "_" + uid);
                                $("#" + id + "_country_search_container").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_country_search_container").attr("id", id + "_country_search_container" + "_" + uid);
                                $("#" + id + "_clear_btn").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_clear_btn").attr("id", id + "_clear_btn" + "_" + uid);
                                $("#" + id + "_country_list_content").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_country_list_content").attr("id", id + "_country_list_content" + "_" + uid);
                                $("#" + id + "_country_code_bottom_sheet").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_country_code_bottom_sheet").attr("id", id + "_country_code_bottom_sheet" + "_" + uid);
                                $("#" + id + "_mobile_number_container").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_mobile_number_container").attr("id", id + "_mobile_number_container" + "_" + uid);
                                $("#" + id + "_country_code_container").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_country_code_container").attr("id", id + "_country_code_container" + "_" + uid);
                                $("#" + id + "_country_code").attr("data-ms-widget-uid", uid);
                                $("#" + id + "_country_code").attr("id", id + "_country_code" + "_" + uid);
                            };
                            if ($("#" + id).attr("data-ms-widget-cascadefrom") !== "") {
                                $("#" + id).attr("data-ms-widget-cascadefrom", $("#" + id).attr("data-ms-widget-cascadefrom") + "_" + uid);
                            };
                            $(fields[subfieldsIndex]).attr("id", id + "_" + uid);
                            $(fields[subfieldsIndex]).attr("name", id + "_" + uid);
                            $(fields[subfieldsIndex]).attr("data-ms-widget-uid", uid);
                            $("#" + id + "_group [data-ms-lbl-mandatory]").attr("data-ms-lbl-mandatory", id + "_" + uid);
                            $("#" + id + "_group").attr("id", id + "_group" + "_" + uid);
                            $("#" + id + "_add_container").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_add_container").attr("id", id + "_add_container" + "_" + uid);
                            $("#" + id + "_add_camera").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_add_camera").attr("id", id + "_add_camera" + "_" + uid);
                            $("#" + id + "_add_gallery").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_add_gallery").attr("id", id + "_add_gallery" + "_" + uid);
                            $("#" + id + "_attachment_add").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_attachment_add").attr("id", id + "_attachment_add" + "_" + uid);
                            $("#" + id + "_src").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_src").attr("id", id + "_src" + "_" + uid);
                            $("#" + id + "_result_content").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_result_content").attr("id", id + "_result_content" + "_" + uid);
                            $("#" + id + "_result").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_result").attr("id", id + "_result" + "_" + uid);
                            $("#" + id + "_barcode_delete").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_barcode_delete").attr("id", id + "_barcode_delete" + "_" + uid);
                            $("#" + id + "_qrcode_delete").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_qrcode_delete").attr("id", id + "_qrcode_delete" + "_" + uid);
                            $("#" + id + "_geotag_delete").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_geotag_delete").attr("id", id + "_geotag_delete" + "_" + uid);
                            $("#" + id + "_widget").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_widget").attr("name", id + "_widget" + "_" + uid);
                            $("#" + id + "_widget").attr("id", id + "_widget" + "_" + uid);
                            $("#" + id + "_add").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_add").attr("id", id + "_add" + "_" + uid);
                            $("#" + id + "_result_latlng").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_result_latlng").attr("id", id + "_result_latlng" + "_" + uid);
                            $("#" + id + "_result_content").attr("id", id + "_result_content" + "_" + uid);
                            $("#" + id + "_result_address").attr("id", id + "_result_address" + "_" + uid);
                            $("#" + id + "_result_lat").attr("id", id + "_result_lat" + "_" + uid);
                            $("#" + id + "_result_lng").attr("id", id + "_result_lng" + "_" + uid);
                            $("#" + id + "_text").attr("id", id + "_text" + "_" + uid);
                            $("#" + id + "_signature_source").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_signature_source").attr("id", id + "_signature_source" + "_" + uid);
                            $("#" + id + "_signature").attr("data-ms-widget-uid", uid);
                            $("#" + id + "_signature").attr("id", id + "_signature" + "_" + uid);
                            $("#" + id + "_wrap").attr("id", id + "_wrap" + "_" + uid);
                            $("#" + id + "_wrap").attr("name", id + "_wrap" + "_" + uid);
                            $("#" + widgetID + "_loop_block" + "_" + uid + " span.k-invalid-msg[data-for='" + id + "'] ").attr("data-for", id + "_" + uid);
                            $("#" + id + "_disabled_area").attr("id", id + "_disabled_area" + "_" + uid);
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updatePager: function (id, uid) {
                    var dataSource,
                    currentDataItem,
                    currentSetNo;
                    try {
                        if (uid != "") {
                            dataSource = mService.widgets.variable.msLoop.dataSrc[id];
                            currentDataItem = dataSource.getByUid(uid);
                            currentSetNo = dataSource.indexOf(currentDataItem) + 1;
                        } else {
                            currentSetNo = 1;
                        };
                        $("#" + id + "_pager_count").text(currentSetNo + "/" + dataSource.data().length);
                        if (currentSetNo === dataSource.data().length) {
                            $("#" + id + "_right_nav").prop("disabled", true).addClass("ms_widget_disable");
                            if (dataSource.data().length === 1) {
                                $("#" + id + "_left_nav").prop("disabled", true).addClass("ms_widget_disable");
                            } else {
                                $("#" + id + "_left_nav").prop("disabled", false).removeClass("ms_widget_disable");
                            }
                        } else {
                            $("#" + id + "_right_nav").prop("disabled", false).removeClass("ms_widget_disable");
                            if (currentSetNo === 1) {
                                $("#" + id + "_left_nav").prop("disabled", true).addClass("ms_widget_disable");
                            } else {
                                $("#" + id + "_left_nav").prop("disabled", false).removeClass("ms_widget_disable");
                            }
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            msMap: {
                addRefreshButton: function (controlDiv, map) {
                    var controlUI,
                    controlText;
                    try {
                        controlUI = document.createElement("div");
                        controlUI.style.backgroundColor = "#fff";
                        controlUI.style.border = "2px solid #fff";
                        controlUI.style.borderRadius = "3px";
                        controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
                        controlUI.style.cursor = "pointer";
                        controlUI.style.width = "40px";
                        controlUI.style.height = "40px";
                        controlUI.style.marginTop = "8px";
                        controlUI.style.marginBottom = "20px";
                        controlUI.style.marginRight = "10px";
                        controlUI.style.textAlign = "center";
                        controlUI.title = "Click to recenter the map";
                        controlDiv.appendChild(controlUI);
                        controlText = document.createElement("div");
                        controlText.style.color = "rgb(102,91,91)";
                        controlText.style.fontSize = "18px";
                        controlText.style.lineHeight = "38px";
                        controlText.style.paddingLeft = "5px";
                        controlText.style.paddingRight = "5px";
                        controlText.innerHTML = "<i class='fas fa-sync'></i>";
                        controlUI.appendChild(controlText);
                        return controlUI;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                displayAddress: function (address, id, map) {
                    try {
                        if (address.results[0]) {
                            addressObj = {
                                last_known_address: address.results[0].formatted_address
                            };
                        } else {
                            addressObj = {
                                last_known_address: ""
                            };
                        };
                        addressInfoTemplate = $("body [data-ms-mswidget-for='" + mService.app.getScreenId() + "'][data-ms-mswidget-template-type='map_address_info']");
                        if (addressInfoTemplate.length === 1) {
                            contentString = kendo.template($(addressInfoTemplate).html())($.extend(true, addressObj, mService.containR.variable[mService.app.getScreenId()].selectedRecord));
                            infowindow = new google.maps.InfoWindow({
                                content: contentString,
                                maxWidth: (screen.width * 0.60)
                            });
                            infowindow.open({
                                anchor: mService.widgets.variable.msMap.marker[id],
                                map,
                                shouldFocus: false
                            });
                            setTimeout(function () {
                                var infoWindow;
                                try {
                                    infoWindow = $("body").find(".gm-style-iw");
                                    $(infoWindow).css("max-width", 300);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 500);
                        } else {
                            mService.app.showToast("listview_template_error", "system_messages");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getCurrentAddress: function (lat, lng, id, map, success, failure) {
                    try {
                        mService.api.geoLocation.getGeoAddress(lat, lng, function (result) {
                            try {
                                mService.widgets.init.util.msMap.displayAddress(result, id, map);
                                mService.widgets.variable.msMap.retryCounter = 0;
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorCode) {
                            try {
                                if (errorCode === "retry") {
                                    failure();
                                } else {
                                    mService.app.showToast(errorCode, "system_messages");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getAddress: function (lat, lng, id, map) {
                    try {
                        mService.widgets.init.util.msMap.getCurrentAddress(lat, lng, id, map, function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.widgets.variable.msMap.retryCounter++;
                                if (mService.widgets.variable.msMap.retryCounter < 3) {
                                    mService.widgets.init.util.msMap.getAddress(lat, lng, id, map, function () {
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
                                } else {
                                    mService.app.showToast("address_api_error", "system_messages");
                                    mService.widgets.variable.msMap.retryCounter = 0;
                                    return true;
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
            msMobileNumber: {
                deleteBottomSheet: function (blockToDelete, uid) {
                    var fieldList;
                    try {
                        fieldList = $(blockToDelete).find(mService.widgets.init.wSelector);
                        for (index = 0; index < fieldList.length; index++) {
                            fieldID = $(fieldList[index]).attr("id");
                            $("#" + $(fieldList[index]).attr("id") + "_bottom_sheet_" + uid).remove();
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            msParentgroup: {
                createParentGroup: function (widgetID, scrID) {
                    var fieldsHtml,
                    widgetsList;
                    try {
                        fieldsHtml = mService.widgets.variable.msParentgroup.subFieldsHtml[widgetID];
                        $("#" + widgetID + "_content").append(fieldsHtml);
                        widgetsList = $("#" + widgetID + "_content").find(mService.widgets.init.wSelector);
                        mService.containR.pattern.form.init.createWidgets(widgetsList, scrID);
                        mService.config.label.resolve(scrID);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                updateData: function (widgetID, draftObj, scrID) {
                    var fields;
                    try {
                        fields = $("#" + widgetID + "_content").find(mService.widgets.init.wSelector);
                        for (var index = 0; index < fields.length; index++) {
                            var id = $(fields[index]).attr("id");
                            if ($("#" + id).attr("data-ms-widget-type") === "msTimebox") {
                                $("#" + id).setVal(draftObj[id.replace(scrID + "_", "") + "_hour"] + ":" + draftObj[id.replace(scrID + "_", "") + "_minute"] + ":" + draftObj[id.replace(scrID + "_", "") + "_second"]);
                            } else {
                                $("#" + id).setVal(draftObj[id.replace(scrID + "_", "")]);
                            }
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            msQrcode: {
                display: function (id, value, uid) {
                    var template,
                    templateID,
                    resultType;
                    try {
                        uid = uid === "" ? uid : "_" + uid;
                        resultType = $("#" + id).attr("data-ms-resulttype");
                        template = $("body [data-ms-mswidget-for='" + id + "'][data-ms-mswidget-template-type='QRCodeTemplate']");
                        templateID = template.length === 0 ? "msQrcodeDefaultContentTemplate" : $(template).attr("id");
                        value = mService.widgets.init.util.msQrcode.getData(resultType, value);
                        if (value !== "") {
                            $("#" + id + uid).attr("data-ms-value", typeof value === "object" ? JSON.stringify(value) : value);
                            $("#" + id + "_result_content" + uid).html(mService.config.template.getTransformedHtml(templateID, {
                                    id: id,
                                    result: value,
                                    uid: uid,
                                }));
                            $("#" + id + "_result_content" + uid).show();
                            $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getData: function (resultType, value) {
                    var returnVal = "";
                    try {
                        if (resultType === undefined || resultType === "text") {
                            returnVal = typeof value === "object" ? JSON.stringify(value) : value;
                        } else if (resultType === "object") {
                            returnVal = JSON.parse(value);
                        } else if (resultType === "url") {
                            if (mService.widgets.init.util.msQrcode.validateURL(value)) {
                                if (window.navigator.onLine) {
                                    mService.widgets.init.util.msQrcode.getDataFromServer(value, function (data) {
                                        try {
                                            returnVal = data;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.app.showToast("msQrcode_data_not_available", "system_messages");
                                            returnVal = "";
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.app.showToast("internet_connection_error", "system_messages");
                                }
                            } else {
                                mService.app.showToast("msQrcode_invalid_url", "system_messages");
                            }
                        };
                        return returnVal;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getDataFromServer: function (url, success, failure) {
                    try {
                        $.ajax({
                            url: url,
                            async: false,
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (response, status) {
                                try {
                                    success(response);
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
                            },
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                validateURL: function (value) {
                    try {
                        var urlregex = new RegExp("^(http|https|ftp)://([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$");
                        return urlregex.test(value);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            msSearchpopup: {
                open: function (id) {
                    try {
                        $("#" + id + "_popup").kendoWindow({
                            width: screen.width * 0.8,
                            maxHeight: screen.height * 0.7,
                            title: {
                                text: "<span data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='msSearchpopup' data-ms-lbl-id='title'></span>",
                                encoded: false,
                            },
                            open: function () {
                                try {
                                    mService.config.label.resolve();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            modal: true,
                            draggable: false,
                            resizable: false,
                        });
                        $("#" + id + "_popup").parent().addClass("ms_window");
                        $("#" + id + "_popup").data("kendoWindow").open().center();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                close: function (id) {
                    try {
                        $("#" + id + "_popup").data("kendoWindow").close();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getFilteredData: function (id, dataSrc, dataSrcType, allowParentChildInd, casecadeFromID) {
                    var filterCondition,
                    currentFilterObj,
                    tempObj,
                    filterObj,
                    filterParentObj,
                    filterValSplit,
                    filterArray,
                    inputXml,
                    filterIndex,
                    index;
                    try {
                        if (dataSrcType === "cache") {
                            filterCondition = $("#" + id).attr("data-ms-filtercondition");
                            filterCondition = filterCondition.substring(1, filterCondition.length - 1);
                            filterArray = filterCondition.trim().split("},{");
                            filterObj = {
                                logic: $("#" + id).attr("data-ms-logic"),
                                filters: [],
                            };
                            for (var filterIndex = 0; filterIndex < filterArray.length; filterIndex++) {
                                (currentFilterObj = filterArray[filterIndex].split(",")),
                                (tempObj = filterArray[filterIndex].split(","));
                                tempObj.splice(0, 2);
                                value = tempObj.join();
                                if (mService.util.getTransformedValue(value) === "filter_text") {
                                    value = $("#" + id).val();
                                    filterObj.filters.push({
                                        field: currentFilterObj[0].replace("{", ""),
                                        operator: currentFilterObj[1],
                                        value: value,
                                    });
                                } else {
                                    if (value.indexOf(casecadeFromID) === 1) {
                                        if (allowParentChildInd) {
                                            value = mService.util.getTransformedValue(value);
                                            if ($.isArray(value)) {
                                                filterParentObj = {
                                                    logic: "or",
                                                    filters: [],
                                                };
                                                filterValSplit = value.join().split(",");
                                                for (index = 0; index < filterValSplit.length; index++) {
                                                    filterParentObj.filters.push({
                                                        field: currentFilterObj[0].replace("{", ""),
                                                        operator: currentFilterObj[1],
                                                        value: filterValSplit[index],
                                                    });
                                                };
                                                if (filterParentObj.filters.length > 0) {
                                                    filterObj.filters.push(filterParentObj);
                                                }
                                            } else {
                                                filterObj.filters.push({
                                                    field: currentFilterObj[0].replace("{", ""),
                                                    operator: currentFilterObj[1],
                                                    value: value,
                                                });
                                            }
                                        }
                                    } else {
                                        value = mService.util.getTransformedValue(value);
                                        if ($.isArray(value)) {
                                            filterParentObj = {
                                                logic: "or",
                                                filters: [],
                                            };
                                            filterValSplit = value.join().split(",");
                                            for (index = 0; index < filterValSplit.length; index++) {
                                                filterParentObj.filters.push({
                                                    field: currentFilterObj[0].replace("{", ""),
                                                    operator: currentFilterObj[1],
                                                    value: filterValSplit[index],
                                                });
                                            };
                                            if (filterParentObj.filters.length > 0) {
                                                filterObj.filters.push(filterParentObj);
                                            }
                                        } else {
                                            filterObj.filters.push({
                                                field: currentFilterObj[0].replace("{", ""),
                                                operator: currentFilterObj[1],
                                                value: value,
                                            });
                                        }
                                    }
                                }
                            };
                            dataSrc.filter({});
                            dataSrc.filter(filterObj);
                            filteredData = dataSrc.view();
                        } else {
                            inputXml = mService.util.getTransformedValue($("#" + id).attr("data-ms-datasrcinputxml"));
                            inputXml = JSON.parse(inputXml);
                            for (index = 0; index < Object.keys(inputXml).length; index++) {
                                if (Object.keys(inputXml)[index] === "filter_text") {
                                    inputXml[Object.keys(inputXml)[index]] = $("#" + id).val();
                                }
                            };
                            dataSrc = mService.widgets.init.util.getDataSource({
                                code: "'" + $("#" + id).attr("data-ms-datasrccode") + "'",
                                inputXml: "'" + JSON.stringify(inputXml) + "'",
                            });
                            filteredData = dataSrc.data();
                        };
                        return filteredData;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                gethtml: function (id, data) {
                    var html = "",
                    listTemplate,
                    index;
                    try {
                        listTemplate = $("body [data-ms-mswidget-for='" + id + "'][data-ms-mswidget-template-type='searchPopupList']");
                        listTemplate = kendo.template(listTemplate.length === 0 ? $("#msSearchPopupDefaultListTemplate").html() : $(listTemplate).html());
                        for (index = 0; index < data.length; index++) {
                            html += kendo.template(listTemplate)({
                                id: id,
                                code: data[index][$("#" + id).attr("data-ms-valuefield")],
                                description: data[index][$("#" + id).attr("data-ms-textfield")],
                                valueobj: JSON.stringify(data[index]),
                            });
                        };
                        return html;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            msSignaturepad: {
                init: function (inputObj, success) {
                    try {
                        if ($("#" + inputObj.id + "_signature_popup").data("kendoWindow") === undefined) {
                            $("#" + inputObj.id + "_signature_popup").kendoWindow({
                                title: false,
                                modal: true,
                                draggable: false,
                                resizable: false,
                                close: function () {
                                    var currentOrientation;
                                    try {
                                        currentOrientation = $("#" + inputObj.id + "_signature_popup").attr("data-ms-currentOrientation");
                                        if (currentOrientation !== "" && currentOrientation === "portrait") {
                                            window.minterface("RotateScreen", ["portrait"], function () {
                                                try {
                                                    mService.widgets.init.util.msSignaturepad.resetOrientation();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function (errorMsg) {
                                                try {
                                                    mService.app.showToast("rotateScreen_error", "system_messages");
                                                    mService.exception.handle(errorMsg);
                                                    return true;
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } else {
                                            mService.widgets.init.util.msSignaturepad.resetOrientation();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                            });
                            $("#" + inputObj.id + "_signature_popup").parent().addClass("ms_window");
                            success();
                        } else {
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                resetOrientation: function () {
                    try {
                        window.minterface("RotateScreen", ["any"], function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                mService.app.showToast("rotateScreen_error", "system_messages");
                                mService.exception.handle(errorMsg);
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            parentChildRelation: {
                apply: function (scrID, id, uid) {
                    var widgetList,
                    dataSource;
                    try {
                        if (mService.app.channel === "web") {
                            widgetList = $("#" + scrID + "_container").find("[data-ms-widget-cascadefrom='" + id + uid + "']");
                        } else {
                            widgetList = $("#" + scrID).find("[data-ms-widget-cascadefrom='" + id + uid + "']");
                        }
                        for (var i = 0; i < widgetList.length; i++) {
                            if (mService.widgets.init.util.parentChildRelation.validateParent(id, uid)) {
                                dataSource = mService.widgets.init.util.parentChildRelation.getChildDataSource(widgetList[i]);
                                if ($(widgetList[i]).attr("data-ms-widget-type") === "msSearchpopup") {
                                    $(widgetList[i]).attr("data-ms-widget-parentvalue", mService.widgets.init.util.parentChildRelation.getParentValue(id, uid));
                                } else {
                                    mService.widgets.init.util.parentChildRelation.applyFilter(mService.widgets.init.util.parentChildRelation.getParentValue(id, uid), dataSource, widgetList[i]);
                                };
                                $(widgetList[i]).enable();
                            } else {
                                mService.widgets.init.util.parentChildRelation.resetChild(widgetList[i], $("#" + id).attr("data-ms-allownewentry"));
                            }
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                applyFilter: function (filterVal, dataSource, childWidget) {
                    var filterObj,
                    filterValSplit,
                    index;
                    try {
                        filterObj = {
                            logic: "and",
                            filters: [],
                        };
                        filterValSplit = filterVal.split(",");
                        if (filterValSplit.length > 1) {
                            filterObj.logic = "or";
                        };
                        for (index = 0; index < filterValSplit.length; index++) {
                            filterObj.filters.push({
                                field: $(childWidget).attr("data-ms-widget-cascadefield"),
                                operator: "eq",
                                value: filterValSplit[index],
                            });
                        };
                        dataSource.filter(filterObj);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getChildDataSource: function (ele) {
                    var widgetType,
                    dataSource;
                    try {
                        dataSource = [];
                        widgetType = $(ele).attr("data-ms-widget-type");
                        if (widgetType === "msCombobox") {
                            dataSource = $(ele).data("kendoComboBox").dataSource;
                        } else if (widgetType === "msDropdownlist") {
                            dataSource = $(ele).data("kendoDropDownList").dataSource;
                        } else if (widgetType === "msMultiselect") {
                            dataSource = $(ele).data("kendoMultiSelect").dataSource;
                        };
                        return dataSource;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getParentValue: function (id, uid) {
                    var value,
                    widgetType;
                    try {
                        value = "";
                        widgetType = $("#" + id + uid).attr("data-ms-widget-type");
                        if (widgetType === "msCombobox") {
                            value = $("#" + id + uid).getVal();
                        } else if (widgetType === "msDropdownlist") {
                            value = $("#" + id + uid).getVal();
                        } else if (widgetType === "msMultiselect") {
                            value = $("#" + id + uid).getVal().join();
                        } else if (widgetType === "msSearchpopup") {
                            value = $("#" + id + uid).getVal();
                        };
                        return value;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                resetChild: function (ele, allowNewEntryInd) {
                    var widgetType,
                    returnValue,
                    id;
                    try {
                        returnValue = false;
                        widgetType = $(ele).attr("data-ms-widget-type");
                        id = $(ele).attr("id");
                        if (widgetType === "msCombobox") {
                            $(ele).data("kendoComboBox").dataSource.filter({});
                            $(ele).attr("data-ms-valueobj", "");
                            $(ele).setVal("");
                            $(ele).disable();
                        } else if (widgetType === "msDropdownlist") {
                            $(ele).data("kendoDropDownList").dataSource.filter({});
                            $(ele).attr("data-ms-valueobj", "");
                            $(ele).setVal("");
                            $(ele).disable();
                        } else if (widgetType === "msMultiselect") {
                            $(ele).data("kendoMultiSelect").dataSource.filter({});
                            $(ele).setVal([]);
                            $(ele).disable();
                        } else if (widgetType === "msSearchpopup") {
                            $("#" + id + "_clear_btn").hide();
                            $(ele).attr("data-ms-widget-parentvalue", "");
                            $(ele).attr("data-ms-value", "");
                            $(ele).attr("data-ms-valueobj", "");
                            $(ele).val("");
                            if (allowNewEntryInd === "false") {
                                $(ele).disable();
                            }
                        };
                        mService.widgets.event.change(mService.app.getScreenId(), $(ele).attr("id"));
                        return returnValue;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                validateParent: function (id, uid) {
                    var widgetType,
                    returnValue;
                    try {
                        returnValue = false;
                        widgetType = $("#" + id + uid).attr("data-ms-widget-type");
                        if (widgetType === "msCombobox" || widgetType === "msDropdownlist" || widgetType === "msSearchpopup") {
                            if ($("#" + id + uid).getVal() !== "") {
                                returnValue = true;
                            } else {
                                returnValue = false;
                            }
                        } else if (widgetType === "msMultiselect") {
                            if ($("#" + id + uid).getVal().length > 0) {
                                returnValue = true;
                            } else {
                                returnValue = false;
                            }
                        };
                        return returnValue;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            },
            getCameraImage: function (id, uid, evt) {
                var attachmentInd,
                attachmentPath;
                try {
                    attachmentPath = "";
                    attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                    if (attachmentInd === "true") {
                        attachmentPath = mService.containR.variable[mService.app.getScreenId()].formPath === undefined ? "" : mService.containR.variable[mService.app.getScreenId()].formPath;
                        if (attachmentPath !== "") {
                            attachmentPath = mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + attachmentPath + "/" + mService.containR.variable[mService.app.getScreenId()].transNo;
                        }
                    };
                    if ($("#" + id + uid).attr("data-ms-widget-maxlimit") !== "") {
                        if (parseInt($("#" + id + uid).attr("data-ms-count")) < parseInt($("#" + id + uid).attr("data-ms-widget-maxlimit"))) {
                            mService.api.permission.checkStatus(function (data) {
                                try {
                                    if (data.camera !== undefined) {
                                        if (data.camera === "YES") {
                                            window.minterface("CaptureImageFromCamera", [{
                                                        attachmentInd: $("#" + id + uid).attr("data-ms-widget-attachmentind"),
                                                        destinationPath: "",
                                                    }, ], function (src) {
                                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                                attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                                                if (attachmentInd === "true") {
                                                    fileSizeKey = $("#" + id + uid).attr("data-ms-widget-filesizekey");
                                                    fileExtensionKey = $("#" + id + uid).attr("data-ms-widget-fileextensionkey");
                                                    mService.spinner.show();
                                                    mService.util.validateFile(src, fileSizeKey, fileExtensionKey, function (fileData) {
                                                        try {
                                                            mService.spinner.hide();
                                                            mService.widgets.init.util.msCamera.loadImage(id, uid.replace("_", ""), fileData, evt);
                                                            $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.spinner.hide();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } else {
                                                    mService.widgets.init.util.msCamera.loadImage(id, uid.replace("_", ""), src, evt);
                                                    $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                                };
                                            }, function (errorMsg) {
                                                try {
                                                    $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                                    mService.app.showToast("camera_image_failure", "system_messages");
                                                    mService.exception.handle(errorMsg);
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } else {
                                            $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                            mService.app.showToast("camera_permission_not_provided", "system_messages");
                                        }
                                    } else {
                                        console.error("failed to read permission settings file");
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            $("#" + id + uid).attr("data-ms-process-in-action", "false");
                            mService.app.showToast("gallery_max_limit", "system_messages");
                        }
                    } else {
                        mService.api.permission.checkStatus(function (data) {
                            try {
                                if (data.camera !== undefined) {
                                    if (data.camera === "YES") {
                                        window.minterface("CaptureImageFromCamera", [{
                                                    attachmentInd: $("#" + id + uid).attr("data-ms-widget-attachmentind"),
                                                    destinationPath: "",
                                                }, ], function (src) {
                                            try {
                                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                                attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                                                if (attachmentInd === "true") {
                                                    fileSizeKey = $("#" + id + uid).attr("data-ms-widget-filesizekey");
                                                    fileExtensionKey = $("#" + id + uid).attr("data-ms-widget-fileextensionkey");
                                                    mService.spinner.show();
                                                    mService.util.validateFile(src, fileSizeKey, fileExtensionKey, function (fileData) {
                                                        try {
                                                            mService.spinner.hide();
                                                            mService.widgets.init.util.msCamera.loadImage(id, uid.replace("_", ""), fileData, evt);
                                                            $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.spinner.hide();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } else {
                                                    mService.widgets.init.util.msCamera.loadImage(id, uid.replace("_", ""), src, evt);
                                                    $("#" + id + "_group span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                                };
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function (errorMsg) {
                                            try {
                                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                                mService.app.showToast("camera_image_failure", "system_messages");
                                                mService.exception.handle(errorMsg);
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                        mService.app.showToast("camera_permission_not_provided", "system_messages");
                                    }
                                } else {
                                    console.error("failed to read permission settings file");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getGalleryImage: function (id, uid, evt) {
                var attachmentInd,
                attachmentPath;
                try {
                    attachmentPath = "";
                    attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                    if (attachmentInd === "true") {
                        attachmentPath = mService.containR.variable[mService.app.getScreenId()].formPath === undefined ? "" : mService.containR.variable[mService.app.getScreenId()].formPath;
                        if (attachmentPath !== "") {
                            attachmentPath = mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "content_store" + "/" + attachmentPath + "/" + mService.containR.variable[mService.app.getScreenId()].transNo;
                        }
                    };
                    if ($("#" + id + uid).attr("data-ms-widget-maxlimit") !== "") {
                        if (parseInt($("#" + id + uid).attr("data-ms-count")) < parseInt($("#" + id + uid).attr("data-ms-widget-maxlimit"))) {
                            window.minterface("PickImageFromGallery", [{
                                        attachmentInd: $("#" + id + uid).attr("data-ms-widget-attachmentind"),
                                        destinationPath: "",
                                    }, ], function (src) {
                                try {
                                    $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                    attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                                    if (attachmentInd === "true") {
                                        fileSizeKey = $("#" + id + uid).attr("data-ms-widget-filesizekey");
                                        fileExtensionKey = $("#" + id + uid).attr("data-ms-widget-fileextensionkey");
                                        mService.spinner.show();
                                        mService.util.validateFile(src, fileSizeKey, fileExtensionKey, function (fileData) {
                                            try {
                                                mService.spinner.hide();
                                                mService.widgets.init.util.msGallery.loadImage(id, uid.replace("_", ""), fileData, evt);
                                                $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.spinner.hide();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        mService.widgets.init.util.msGallery.loadImage(id, uid.replace("_", ""), src, evt);
                                        $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                    };
                                    $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (errorMsg) {
                                try {
                                    $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                    mService.app.showToast("gallery_image_failure", "system_messages");
                                    mService.exception.handle(errorMsg);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            $("#" + id + uid).attr("data-ms-process-in-action", "false");
                            mService.app.showToast("gallery_max_limit", "system_messages");
                        }
                    } else {
                        window.minterface("PickImageFromGallery", [{
                                    attachmentInd: $("#" + id + uid).attr("data-ms-widget-attachmentind"),
                                    destinationPath: "",
                                }, ], function (src) {
                            try {
                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                attachmentInd = $("#" + id + uid).attr("data-ms-widget-attachmentind");
                                if (attachmentInd === "true") {
                                    fileSizeKey = $("#" + id + uid).attr("data-ms-widget-filesizekey");
                                    fileExtensionKey = $("#" + id + uid).attr("data-ms-widget-fileextensionkey");
                                    mService.spinner.show();
                                    mService.util.validateFile(src, fileSizeKey, fileExtensionKey, function (fileData) {
                                        try {
                                            mService.spinner.hide();
                                            mService.widgets.init.util.msGallery.loadImage(id, uid.replace("_", ""), fileData, evt);
                                            $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.spinner.hide();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.widgets.init.util.msGallery.loadImage(id, uid.replace("_", ""), src, evt);
                                    $("#" + id + "_group" + uid + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                $("#" + id + uid).attr("data-ms-process-in-action", "false");
                                mService.app.showToast("gallery_image_failure", "system_messages");
                                mService.exception.handle(errorMsg);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    }
                } catch (exception) {
                    $("#" + id + uid).attr("data-ms-process-in-action", "false");
                    mService.exception.handle(exception);
                }
            },
            getWidgetProperties: function (id) {
                var attributesList,
                fields = {},
                attrIndex,
                splittedAttrVal;
                try {
                    attributesList = $.grep($("#" + id).get(0).attributes, function (e, i) {
                        try {
                            return e.name.indexOf("data-ms-widget") !== -1;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    fields.scrid = mService.app.getScreenId();
                    fields.id = id;
                    for (attrIndex = 0; attrIndex < attributesList.length; attrIndex++) {
                        splittedAttrVal = attributesList[attrIndex].name.split("-");
                        fields[splittedAttrVal[3]] = attributesList[attrIndex].value;
                    };
                    return fields;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            createCheckBoxGroup: function (inputObj, data) {
                try {
                    for (index = 0; index < data.length; index++) {
                        $("#" + inputObj.id + "_wrap").append(mService.config.template.getTransformedHtml("msCheckboxContentTemplate", {
                                id: inputObj.id,
                                value: data[index][inputObj.valuefield],
                                content: data[index][inputObj.textfield],
                                checked: data[index][inputObj.updatefield] === undefined ? "" : data[index][inputObj.updatefield] === "1" || data[index][inputObj.updatefield] === "true" ? "checked" : "",
                                stack: inputObj.stack === undefined ? false : eval(inputObj.stack),
                            }));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            createRadiogroup: function (inputObj, data) {
                try {
                    for (index = 0; index < data.length; index++) {
                        $("#" + inputObj.id + "_wrap").append(mService.config.template.getTransformedHtml("msRadiogroupContentTemplate", {
                                id: inputObj.id,
                                value: data[index][inputObj.valuefield],
                                content: data[index][inputObj.textfield],
                                checked: index === 0 ? inputObj.checked : "",
                                stack: inputObj.stack === undefined ? false : eval(inputObj.stack),
                            }));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getDataSource: function (input) {
                var data;
                try {
                    if ($.isArray(input)) {
                        data = input;
                    } else {
                        if (typeof input === "object") {
                            try {
                                if (input.data() !== undefined) {
                                    data = input;
                                }
                            } catch (exception) {
                                data = mService.dSource.getSource(input);
                                data.read();
                            }
                        } else {
                            data = mService.util.getTransformedValue(input);
                        }
                    };
                    if ($.isArray(data)) {
                        data = new kendo.data.DataSource({
                            data: data,
                        });
                    } else {
                        if (data.length !== undefined && data.length > 0) {
                            if (data[0].uid !== undefined) {
                                data = new kendo.data.DataSource({
                                    data: data,
                                });
                            }
                        } else {
                            data = new kendo.data.DataSource({
                                data: data.data(),
                            });
                        }
                    };
                    data.read();
                    return data;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getDataSrc: function (inputObj) {
                var localeConfig,
                index,
                dataSrc;
                try {
                    localeConfig = mService.config.label.src[inputObj.scrid + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()];
                    dataSrc = inputObj.datasrc;
                    for (index = 0; index < dataSrc.length; index++) {
                        dataSrc[index][inputObj.textfield] = localeConfig !== undefined && localeConfig["dataSrc"] !== undefined && localeConfig["dataSrc"][inputObj.id.replace(inputObj.scrid + "_", "")] !== undefined && localeConfig["dataSrc"][inputObj.id.replace(inputObj.scrid + "_", "")][dataSrc[index][inputObj.valuefield]] !== undefined && localeConfig["dataSrc"][inputObj.id.replace(inputObj.scrid + "_", "")][dataSrc[index][inputObj.valuefield]][inputObj.textfield] !== undefined && localeConfig["dataSrc"][inputObj.id.replace(inputObj.scrid + "_", "")][dataSrc[index][inputObj.valuefield]][inputObj.textfield] !== "" ? localeConfig["dataSrc"][inputObj.id.replace(inputObj.scrid + "_", "")][dataSrc[index][inputObj.valuefield]][inputObj.textfield] : "";
                    };
                    return dataSrc;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getCheckboxProperties: function (inputObj) {
                var localeConfig;
                try {
                    localeConfig = mService.config.label.src[inputObj.scrid + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()];
                    inputObj.content = localeConfig !== undefined && localeConfig["dataSrc"] !== undefined && localeConfig["dataSrc"][inputObj.id] !== undefined && localeConfig["dataSrc"][inputObj.id]["content"] !== undefined && localeConfig["dataSrc"][inputObj.id]["content"] !== "" ? localeConfig["dataSrc"][inputObj.id]["content"] : "";
                    return inputObj;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getUID: function (id, parentID, ele) {
                var uid;
                try {
                    uid = "";
                    if ($(ele).attr("data-ms-widget-uid") !== undefined) {
                        uid = ($(ele).attr("data-ms-widget-uid") === undefined) ? ("") : ($(ele).attr("data-ms-widget-uid"));
                    } else {
                        msLoopInd = $("#" + parentID).attr("data-ms-widget-msloop");
                        if ((msLoopInd !== undefined && msLoopInd !== "") || $("#" + parentID).attr("data-ms-widget-msloop") === "msLoop") {
                            uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : $("#" + id).attr("data-ms-widget-uid");
                        };
                    };
                    return uid;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            loadTemplate: function (template) {
                var url;
                try {
                    if ($("#" + template).length === 0) {
                        if (mService.app.channel === "web") {
                            url = "www" + "/" + "lib" + "/" + "mservice" + "/" + "styles" + "/" + "template" + "/" + "widgets" + "/" + mService.app.channel + "/" + template + ".html";
                        } else {
                            url = "../lib/mservice/styles/template" + "/" + "widgets" + "/" + mService.app.channel + "/" + template + ".html";
                        };
                        $.ajax({
                            url: url,
                            dataType: "text",
                            async: false,
                            success: function (data) {
                                try {
                                    $("body").append(data);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            error: function (e) {
                                try {
                                    throw "Failed to load the template file - " + template;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            loadTheme: function (widget) {
                try {
                    if ($("#" + widget + "_theme").attr("ms_chat_load_ind") === undefined) {
                        mService.presentR.util.callAjax("ux/theme.settings.json", "json", function (themeConfig) {
                            try {
                                $("body").append(kendo.template($("#" + widget + "ThemeTemplate").html())(themeConfig.widgets.msChat));
                                $("#" + widget + "_theme").attr("ms_chat_load_ind", "true");
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
            pausePlayer: function (e) {
                var playingEle;
                try {
                    playingEle = $("[data-ms-status=playing]");
                    if (playingEle.length > 0) {
                        $(playingEle).attr("data-ms-status", "not_playing");
                        $(playingEle)[0].pause();
                    };
                    if ($(playingEle)[0] !== undefined && ($(playingEle)[0] !== e)) {
                        $(e).attr("data-ms-status", "playing");
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        wSelector: "[data-ms-widget-type = 'msAttachment'], [data-ms-widget-type = 'msCamera'], [data-ms-widget-type = 'msCheckbox'], [data-ms-widget-type = 'msCombobox'], [data-ms-widget-type = 'msDatebox'], [data-ms-widget-type = 'msDisplaybox'], [data-ms-widget-type = 'msDropdownlist'], [data-ms-widget-type = 'msGallery'], [data-ms-widget-type = 'msFlipswitch'], [data-ms-widget-type = 'msMultiselect'], [data-ms-widget-type = 'msNumerictextbox'], [data-ms-widget-type = 'msRadiogroup'], [data-ms-widget-type = 'msCheckboxgroup'], [data-ms-widget-type = 'msSignaturepad'], [data-ms-widget-type = 'msSlider'], [data-ms-widget-type = 'msTextarea'], [data-ms-widget-type = 'msTextbox'], [data-ms-widget-type = 'msTimebox'], [data-ms-widget-type = 'msLoop'], [data-ms-widget-type = 'msImageviewer'], [data-ms-widget-type = 'msAudioplayer'], [data-ms-widget-type = 'msBarcode'], [data-ms-widget-type = 'msDialog'], [data-ms-widget-type = 'msGeotag'], [data-ms-widget-type = 'msMlingualtextarea'], [data-ms-widget-type = 'msMobileNumber'],[data-ms-widget-type = 'msPdfviewer'], [data-ms-widget-type = 'msQrcode'], [data-ms-widget-type = 'msRating'], [data-ms-widget-type = 'msSearchpopup'], [data-ms-widget-type = 'msTimeline'], [data-ms-widget-type = 'msTimelogger'], [data-ms-widget-type = 'msVideoplayer'], [data-ms-widget-type = 'msParentgroup'],[data-ms-widget-type = 'msVoice'],[data-ms-widget-type = 'msListview'],[data-ms-widget-type = 'msButton'],[data-ms-widget-type = 'msImagepicker'],[data-ms-widget-type = 'msMap'], [data-ms-widget-type = 'msChat']",
    },
    setDataSource: {
        msCheckboxgroup: function (id, inputValue) {
            var dataSource,
            inputObj = {};
            try {
                inputObj = mService.widgets.init.util.getWidgetProperties(id);
                dataSource = mService.widgets.init.util.getDataSource(inputValue);
                $("#" + id + "_wrap").html("");
                mService.widgets.init.util.createCheckBoxGroup(inputObj, dataSource.data());
                $('input[name="' + inputObj.id + '_input"]').on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCombobox: function (id, inputValue) {
            var dataSource;
            try {
                dataSource = mService.widgets.init.util.getDataSource(inputValue);
                $("#" + id).data("kendoComboBox").setDataSource(dataSource);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (id, inputValue) {
            var dataSource;
            try {
                dataSource = mService.widgets.init.util.getDataSource(inputValue);
                $("#" + id).data("kendoDropDownList").setDataSource(dataSource);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msListview: function (id, inputValue) {
            try {
                $("#" + id).data("kendoMobileListView").setDataSource(inputValue);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (id, inputValue) {
            var dataSource;
            try {
                dataSource = mService.widgets.init.util.getDataSource(inputValue);
                $("#" + id).data("kendoMultiSelect").setDataSource(dataSource);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRadiogroup: function (id, inputValue) {
            var dataSource,
            inputObj = {};
            try {
                inputObj = mService.widgets.init.util.getWidgetProperties(id);
                dataSource = mService.widgets.init.util.getDataSource(inputValue);
                $("#" + id + "_wrap").html("");
                mService.widgets.init.util.createRadiogroup(inputObj, dataSource.data());
                $('input[name="' + inputObj.id + '_input"]').on("change", function (event) {
                    try {
                        mService.widgets.event.change(inputObj.scrid, inputObj.id, event);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimeline: function (id, inputValue) {
            var dataSource;
            try {
                dataSource = new kendo.data.DataSource({
                    data: inputValue,
                });
                dataSource.read();
                for (index = 0; index < dataSource.data().length; index++) {
                    eventDate = new Date(dataSource.data()[index].event_date);
                    eventDate.setHours(dataSource.data()[index].event_hour);
                    eventDate.setMinutes(dataSource.data()[index].event_minute);
                    dataSource.data()[index].date = eventDate;
                };
                $("#" + id).data("kendoTimeline").setDataSource(dataSource);
                $("#" + id).data("kendoTimeline").dataSource.sort({
                    field: "date",
                    dir: $("#" + id).attr("data-ms-widget-sortorder"),
                });
                setTimeout(function () {
                    try {
                        if ($("#" + id).data("kendoTimeline").dataSource.data().length !== 0) {
                            $("#" + id).data("kendoTimeline").redraw();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, 100);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    setMax: {
        msAttachment: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-maxlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msBarcode: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCamera: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-maxlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckboxgroup: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckbox: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCombobox: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDatebox: function (id, value) {
            var dateBox,
            dateSplit,
            msLoopInd,
            uid;
            try {
                if (value !== undefined && value !== "") {
                    uid = "";
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== undefined && msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                        id = uid === "" ? id : id.replace(uid, "");
                    };
                    dateBox = $("#" + id + uid).data("kendoDatePicker");
                    if (typeof(value) === "string") {
                        dateSplit = value.split("-");
                        value = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]));
                    };
                    dateBox.setOptions({
                        max: value
                    });
                } else {
                    console.error("msDatebox-setMax: please check the given value " + value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDisplaybox: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGallery: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-maxlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGeotag: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msFlipswitch: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImagepicker: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-maxlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msLoop: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-maxlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMobileNumber: function (id, value) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                $("#" + id + uid).attr("maxlength", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msNumerictextbox: function (id, value) {
            var numerictextbox,
            msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                numerictextbox = $("#" + id + uid).data("kendoNumericTextBox");
                numerictextbox.max(value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msParentgroup: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msQrcode: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRadiogroup: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRating: function (id, value) {
            var rating;
            try {
                rating = $("#" + id).data("kendoRating");
                rating.setOptions({
                    max: parseInt(value),
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSearchpopup: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSignaturepad: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSlider: function (id, value) {
            var slider,
            msLoopInd,
            uid;
            try {
                if (value !== undefined && value !== "") {
                    uid = "";
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== undefined && msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                        id = uid === "" ? id : id.replace(uid, "");
                    };
                    slider = $("#" + id + uid).data("kendoSlider");
                    if (!isNaN(value)) {
                        slider.setOptions({
                            max: parseInt(value)
                        });
                    } else {
                        console.error("msSlider-setMax: Given value is not a number : " + value);
                    }
                } else {
                    console.error("msSlider-setMax: please check the given value " + value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextarea: function (id, value) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                $("#" + id + uid).attr("maxlength", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextbox: function (id, value) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                $("#" + id + uid).attr("maxlength", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimebox: function (id, value) {
            var timeBox,
            msLoopInd,
            uid,
            valueSplit;
            try {
                if (value !== undefined && value !== "") {
                    uid = "";
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== undefined && msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                        id = uid === "" ? id : id.replace(uid, "");
                    };
                    timeBox = $("#" + id + uid).data("kendoTimePicker");
                    if (typeof(value) === "string") {
                        if ((value.indexOf(":") !== -1)) {
                            valueSplit = value.split(":");
                            timeBox.setOptions({
                                max: new Date(2022, 11, 30, parseInt(valueSplit[0]), ((valueSplit[1] === undefined) ? (00) : (parseInt(valueSplit[1]))), ((valueSplit[2] === undefined) ? (00) : (parseInt(valueSplit[2]))))
                            });
                        } else {
                            console.error("msTimebox-setMax: please check the given value " + value);
                        }
                    } else {
                        timeBox.setOptions({
                            max: value
                        });
                    }
                } else {
                    console.error("msTimebox-setMax: please check the given value " + value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimelogger: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msVoice: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    setMin: {
        msAttachment: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-minlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msBarcode: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCamera: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-minlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckbox: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckboxgroup: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCombobox: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDatebox: function (id, value) {
            var dateBox,
            msLoopInd,
            uid;
            try {
                if (value !== undefined && value !== "") {
                    uid = "";
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== undefined && msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                        id = uid === "" ? id : id.replace(uid, "");
                    };
                    dateBox = $("#" + id + uid).data("kendoDatePicker");
                    if (typeof(value) === "string") {
                        dateSplit = value.split("-");
                        value = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]));
                    };
                    dateBox.setOptions({
                        min: value
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDisplaybox: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGallery: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-minlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGeotag: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msFlipswitch: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCamera: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-minlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImagepicker: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-minlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msLoop: function (id, value) {
            try {
                $("#" + id).attr("data-ms-widget-minlimit", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMobileNumber: function (id, value) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                $("#" + id + uid).attr("minlength", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msNumerictextbox: function (id, value) {
            var numerictextbox,
            msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                numerictextbox = $("#" + id + uid).data("kendoNumericTextBox");
                numerictextbox.min(value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msParentgroup: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msQrcode: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRadiogroup: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRating: function (id, value) {
            var rating;
            try {
                rating = $("#" + id).data("kendoRating");
                rating.setOptions({
                    min: parseInt(value),
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSearchpopup: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSignaturepad: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSlider: function (id, value) {
            var slider,
            msLoopInd,
            uid;
            try {
                if (value !== undefined && value !== "") {
                    uid = "";
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== undefined && msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                        id = uid === "" ? id : id.replace(uid, "");
                    };
                    slider = $("#" + id + uid).data("kendoSlider");
                    if (!isNaN(value)) {
                        slider.setOptions({
                            min: parseInt(value)
                        });
                    } else {
                        console.error("msSlider-setMin: Given value is not a number : " + value);
                    }
                } else {
                    console.error("msSlider-setMin: Please check the given value : " + value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextarea: function (id, value) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                $("#" + id + uid).attr("minlength", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextbox: function (id, value) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                $("#" + id + uid).attr("minlength", value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimebox: function (id, value) {
            var timeBox,
            msLoopInd,
            uid,
            valueSplit;
            try {
                if (value !== undefined && value !== "") {
                    uid = "";
                    msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                    if (msLoopInd !== undefined && msLoopInd !== "") {
                        uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                        id = uid === "" ? id : id.replace(uid, "");
                    };
                    timeBox = $("#" + id + uid).data("kendoTimePicker");
                    if (typeof(value) === "string") {
                        if ((value.indexOf(":") !== -1)) {
                            valueSplit = value.split(":");
                            timeBox.setOptions({
                                min: new Date(2022, 11, 30, parseInt(valueSplit[0]), ((valueSplit[1] === undefined) ? (00) : (parseInt(valueSplit[1]))), ((valueSplit[2] === undefined) ? (00) : (parseInt(valueSplit[2]))))
                            });
                        } else {
                            console.error("msTimebox-setMin: please check the separator in given value " + value);
                        }
                    } else {
                        timeBox.setOptions({
                            min: value
                        });
                    }
                } else {
                    console.error("msTimebox-setMin: please check the given value " + value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimelogger: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msVoice: function (value) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    setVal: {
        msAttachment: function (id, value) {
            try {
                if (mService.app.channel === "mobile") {
                    if (value !== "") {
                        mService.widgets.variable.msAttachment.attachments = value;
                        mService.widgets.init.util.msAttachment.displayAttachment(id, function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                return false;
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
        msBarcode: function (id, value) {
            try {
                if (value != "") {
                    $("#" + id + "_result_content").show();
                    $("#" + id + "_result").text(value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCamera: function (id, value) {
            var index;
            try {
                for (index = 0; index < value.length; index++) {
                    mService.widgets.init.util.msCamera.loadImage(id, "", value[index]);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckbox: function (id, value) {
            try {
                $("#" + id).prop("checked", eval(value));
                $("#" + id).trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCheckboxgroup: function (id, value) {
            var index;
            try {
                if (typeof value == "string") {
                    value = value.split(",");
                };
                for (index = 0; index < value.length; index++) {
                    $("#" + id + "_" + value[index]).prop("checked", true);
                    $("#" + id + "_" + value[index]).trigger("change");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msCombobox: function (id, value) {
            try {
                $("#" + id).data("kendoComboBox").value(value);
                $("#" + id).data("kendoComboBox").trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDatebox: function (id, value) {
            var dateSplit;
            try {
                if (value !== undefined && value !== "") {
                    if (typeof(value) === "string") {
                        if ((value.indexOf("-") !== -1)) {
                            dateSplit = value.split("-");
                            value = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]));
                        } else {
                            console.error("msDatebox-SetVal: separator should be '-' in given value " + value);
                        }
                    };
                    $("#" + id).data("kendoDatePicker").value(value);
                    $("#" + id).data("kendoDatePicker").trigger("change");
                } else {
                    console.error("msDatebox-setVal: please check the given value " + value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDisplaybox: function (id, value) {
            try {
                if (typeof value !== "string") {
                    value = value.toString();
                };
                $("#" + id).html(value.replace(/\n/g, "<br/>"));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msDropdownlist: function (id, value) {
            try {
                $("#" + id).data("kendoDropDownList").value(value);
                $("#" + id).data("kendoDropDownList").trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGallery: function (id, value) {
            var index;
            try {
                for (index = 0; index < value.length; index++) {
                    mService.widgets.init.util.msGallery.loadImage(id, "", value[index]);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msGeotag: function (id, value) {
            try {
                if (value !== "" && value !== undefined) {
                    mService.widgets.init.util.msGeotag.displayAddress(id, value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msFlipswitch: function (id, value) {
            try {
                $("#" + id).data("kendoSwitch").value(value);
                $("#" + id).data("kendoSwitch").trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImagepicker: function (id, value) {
            var index;
            try {
                for (index = 0; index < value.length; index++) {
                    mService.widgets.init.util.msCamera.loadImage(id, "", value[index]);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msImageviewer: function (id, value) {
            try {
                mService.widgets.event.msImageviewer.load(id, value);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msLoop: function (id, value) {
            var scrID,
            uid = "",
            index,
            visibleBlock,
            visibleBlockUID = "";
            try {
                scrID = mService.app.getScreenId();
                id = id.replace("_content", "");
                for (index = 0; index < value.length; index++) {
                    $("#" + id + "_msloop_container").show();
                    $("#" + id + "_createbtn_span").hide();
                    visibleBlock = $("#" + id + "_content [data-ms-widget-msloopblock]:visible");
                    if (visibleBlock !== undefined && visibleBlock.length !== 0) {
                        visibleBlockUID = $(visibleBlock).attr("data-ms-widget-uid");
                        uid = mService.widgets.variable.msLoop.dataSrc[id].data()[mService.widgets.variable.msLoop.dataSrc[id].data().length - 1].uid;
                    };
                    mService.widgets.variable.msLoop.dataSrc[id].add(value[index]);
                    mService.widgets.init.util.msLoop.createBlock(id, uid, visibleBlockUID, true, scrID);
                    mService.widgets.init.util.msLoop.updateData(id, value[index], scrID);
                    mService.widgets.event.change(scrID, id);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMlingualtextarea: function (id, value) {
            try {
                if (value === "") {
                    $("#" + id).val("");
                    $("#" + id + "_default_locale").val("");
                } else {
                    $("#" + id).val(value[mService.user.profile.login.locale_id.substring(0, 2)]);
                    $("#" + id + "_default_locale").val(value[mService.user.profile.login.default_locale_id.substring(0, 2)]);
                };
                $("#" + id + "_default_locale").trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMobileNumber: function (id, value) {
            var msLoopInd,
            uid,
            valueSplit;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                if (value.indexOf("-") !== -1) {
                    valueSplit = value.split("-");
                    if ((valueSplit[0].indexOf("+") !== -1)) {
                        $("#" + id + "_country_code" + uid).val(valueSplit[0]);
                    } else {
                        $("#" + id + "_country_code" + uid).val("+" + valueSplit[0]);
                    };
                    $("#" + id + uid).val(valueSplit[1]);
                    $("#" + id + uid).trigger("change");
                } else {
                    console.error("msMobileNumber-setVal: Hyphen is missing in the given value");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msMultiselect: function (id, value) {
            try {
                if (typeof value == "string") {
                    value = value.split(",");
                };
                $("#" + id).data("kendoMultiSelect").value(value);
                $("#" + id).data("kendoMultiSelect").trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msNumerictextbox: function (id, value) {
            try {
                $("#" + id).data("kendoNumericTextBox").value(value);
                $("#" + id).data("kendoNumericTextBox").trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msParentgroup: function (id, value) {
            var scrID;
            try {
                scrID = mService.app.getScreenId();
                id = id.replace("_content", "");
                if (value != "") {
                    if (typeof value === "string") {
                        value = JSON.parse(value);
                    };
                    mService.widgets.init.util.msParentgroup.updateData(id, value, scrID);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msQrcode: function (id, value) {
            try {
                if (value != "") {
                    mService.widgets.init.util.msQrcode.display(id, value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRadiogroup: function (id, value) {
            try {
                $("#" + id + "_" + value).prop("checked", true);
                $("#" + id + "_" + value).trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msRating: function (id, value) {
            try {
                $("#" + id).data("kendoRating").value(value === 0 ? null : value);
                $("#" + id).data("kendoRating").trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSearchpopup: function (id, value) {
            var dataSource,
            dataItem;
            try {
                dataSource = mService.widgets.init.util.getDataSource($("#" + id).attr("data-ms-datasrc"));
                if (dataSource.data().length > 0) {
                    dataItem = $.grep(dataSource.data(), function (e, i) {
                        try {
                            return e.code === value;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    })[0];
                    if (dataItem !== undefined) {
                        $("#" + id).attr("data-ms-value", dataItem.code);
                        $("#" + id).attr("data-ms-valueobj", JSON.stringify(dataItem));
                        $("#" + id).val(dataItem.description);
                        $("#" + id + "_clear_btn").show();
                    } else {
                        $("#" + id).attr("data-ms-value", value);
                        $("#" + id).val(value);
                        if (value === "") {
                            $("#" + id).attr("data-ms-valueobj", "");
                            $("#" + id + "_clear_btn").hide();
                        } else {
                            $("#" + id + "_clear_btn").show();
                        }
                    };
                    $("#" + id + "_group" + " span.k-widget.k-tooltip.k-tooltip-validation.k-invalid-msg").hide();
                    mService.widgets.event.change(mService.app.getScreenId(), id);
                } else {
                    if ($("#" + id).attr("data-ms-allownewentry") === "true") {
                        $("#" + id).attr("data-ms-value", value);
                        $("#" + id).val(value);
                        if (value === "") {
                            $("#" + id + "_clear_btn").hide();
                        } else {
                            $("#" + id + "_clear_btn").show();
                        };
                        mService.widgets.event.change(mService.app.getScreenId(), id);
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msSlider: function (id, value) {
            try {
                $("#" + id).data("kendoSlider").value(value);
                $("#" + id + "_text").text(value);
                mService.widgets.event.change(mService.app.getScreenId(), id);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextarea: function (id, value) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                $("#" + id + uid).val(value);
                $("#" + id + "_disabled_area" + uid).text(value);
                $("#" + id + uid).trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTextbox: function (id, value) {
            var msLoopInd,
            uid;
            try {
                uid = "";
                msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
                if (msLoopInd !== undefined && msLoopInd !== "") {
                    uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                    id = uid === "" ? id : id.replace(uid, "");
                };
                $("#" + id + uid).val(value);
                $("#" + id + "_disabled_area" + uid).text(value);
                $("#" + id + uid).trigger("change");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msTimebox: function (id, value) {
            try {
                if (value !== undefined && value !== "") {
                    if (typeof(value) === "string") {
                        if ((value.indexOf(":") !== -1)) {
                            valueSplit = value.split(":");
                            value = new Date(2022, 11, 30, parseInt(valueSplit[0]), ((valueSplit[1] === undefined) ? (00) : (parseInt(valueSplit[1]))), ((valueSplit[2] === undefined) ? (00) : (parseInt(valueSplit[2]))));
                        } else {
                            console.error("msTimebox-setVal:  separator should be ':' in given value " + value);
                        }
                    };
                    $("#" + id).data("kendoTimePicker").value(value);
                    $("#" + id).data("kendoTimePicker").trigger("change");
                } else {
                    console.error("msTimebox-setVal: please check the given value " + value);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    show: function (id) {
        var wType,
        msLoopInd,
        uid;
        try {
            uid = "";
            msLoopInd = $("#" + id).attr("data-ms-widget-msloop");
            if (msLoopInd !== undefined && msLoopInd !== "") {
                uid = $("#" + id).attr("data-ms-widget-uid") === undefined ? "" : "_" + $("#" + id).attr("data-ms-widget-uid");
                id = uid === "" ? id : id.replace(uid, "");
            };
            wType = $("#" + id + uid).attr("data-ms-widget-type");
            if (wType === "msDisplaybox" || wType === "msButton") {
                if (mService.app.channel === "web") {
                    $("#" + id + "_group" + uid).show();
                } else {
                    $("#" + id + uid).show();
                }
            } else {
                $("#" + id + "_group" + uid).show();
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    variable: {
        msAttachment: {
            attachments: [],
            counter: 0,
        },
        msCamera: {
            images: [],
            counter: 0,
        },
        msChat: {
            idleTimer: "",
            widget: {},
            variable: {},
            dSource: {},
            schema: {
                key: "",
                subKey: "",
                from: {
                    id: "",
                    name: "",
                    initial: "",
                    channel: "",
                    sysMsg: ""
                },
                to: "",
                scrID: "",
                msgType: "",
                content: "",
                followup: "",
                actionPath: "",
                custom: {},
                suggestions: "",
                attachments: [],
                actions: "",
                allowMsg: "",
                allowAttach: "",
                refreshHeader: "",
                translations: "",
                autoReply: "",
                info: {
                    date: "",
                    hour: "",
                    min: "",
                    sec: "",
                }
            },
            theme: {}
        },
        msGallery: {
            webImage: {}
        },
        msLoop: {
            dataSrc: {},
            subFieldsHtml: {},
            fieldValues: [],
            counter: 0,
            fields: [],
            fieldsCounter: 0,
        },
        msParentgroup: {
            subFieldsHtml: {},
        },
        msCheckboxgroup: {
            dataSource: {},
        },
        msDropdownlist: {
            dataSource: {},
        },
        msMultiselect: {
            dataSource: {},
        },
        msMap: {
            map: {},
            marker: {},
            retryCounter: 0
        },
        msMobileNumber: {
            dataSrc: {},
            filter: []
        }
    },
};
$.fn.extend({
    disable: function () {
        var widgetType;
        try {
            (widgetType = $(this).attr("data-ms-widget-type")),
            (widgetID = $(this).attr("id"));
            if (widgetType !== undefined) {
                return mService.widgets.disable[widgetType](widgetID);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    enable: function () {
        var widgetType;
        try {
            (widgetType = $(this).attr("data-ms-widget-type")),
            (widgetID = $(this).attr("id"));
            if (widgetType !== undefined) {
                return mService.widgets.enable[widgetType](widgetID);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    datasourceFilter: function (filterObj) {
        var widgetType;
        try {
            (widgetType = $(this).attr("data-ms-widget-type")),
            (widgetID = $(this).attr("id"));
            if (widgetType !== undefined) {
                return mService.widgets.datasourceFilter[widgetType](widgetID, filterObj);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getDataSource: function () {
        var widgetType;
        try {
            (widgetType = $(this).attr("data-ms-widget-type")),
            (widgetID = $(this).attr("id"));
            if (widgetType !== undefined) {
                return mService.widgets.getDataSource[widgetType](widgetID);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getVal: function () {
        var widgetType;
        try {
            (widgetType = $(this).attr("data-ms-widget-type")),
            (widgetID = $(this).attr("id"));
            if (widgetType !== undefined) {
                if (mService.widgets.getVal[widgetType] !== undefined) {
                    return mService.widgets.getVal[widgetType](widgetID);
                } else {
                    return true;
                }
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getValObject: function (key) {
        var widgetType;
        try {
            (widgetType = $(this).attr("data-ms-widget-type")),
            (widgetID = $(this).attr("id"));
            if (widgetType !== undefined) {
                return mService.widgets.getValObject[widgetType](widgetID, key);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msAttachment: function (inputObj) {
        try {
            mService.widgets.init.msAttachment($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msAudioplayer: function (inputObj) {
        try {
            mService.widgets.init.msAudioplayer($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msBarcode: function (inputObj) {
        try {
            mService.widgets.init.msBarcode($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msButton: function (inputObj) {
        try {
            mService.widgets.init.msButton($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msCamera: function (inputObj) {
        try {
            mService.widgets.init.msCamera($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msChat: function (inputObj) {
        try {
            mService.widgets.init.msChat($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msCheckbox: function (inputObj) {
        try {
            mService.widgets.init.msCheckbox($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msCheckboxgroup: function (inputObj) {
        try {
            mService.widgets.init.msCheckboxgroup($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msCombobox: function (inputObj) {
        try {
            mService.widgets.init.msCombobox($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msDatebox: function (inputObj) {
        try {
            mService.widgets.init.msDatebox($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msDialog: function (inputObj) {
        try {
            mService.widgets.init.msDialog($.extend({}, inputObj));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msDisplaybox: function (inputObj) {
        try {
            mService.widgets.init.msDisplaybox($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msDropdownlist: function (inputObj) {
        try {
            mService.widgets.init.msDropdownlist($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msGallery: function (inputObj) {
        try {
            mService.widgets.init.msGallery($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msGeotag: function (inputObj) {
        try {
            mService.widgets.init.msGeotag($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msFlipswitch: function (inputObj) {
        try {
            mService.widgets.init.msFlipswitch($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msListview: function (inputObj) {
        try {
            mService.widgets.init.msListview($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msLoop: function (inputObj) {
        try {
            mService.widgets.init.msLoop($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msImagepicker: function (inputObj) {
        try {
            mService.widgets.init.msImagepicker($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msImageviewer: function (inputObj) {
        try {
            mService.widgets.init.msImageviewer($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msMap: function (inputObj) {
        try {
            mService.widgets.init.msMap($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msMlingualtextarea: function (inputObj) {
        try {
            mService.widgets.init.msMlingualtextarea($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msMobileNumber: function (inputObj) {
        try {
            mService.widgets.init.msMobileNumber($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msMultiselect: function (inputObj) {
        try {
            mService.widgets.init.msMultiselect($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msNotification: function (inputObj) {
        try {
            mService.widgets.init.msNotification($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msNumerictextbox: function (inputObj) {
        try {
            mService.widgets.init.msNumerictextbox($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msParentgroup: function (inputObj) {
        try {
            mService.widgets.init.msParentgroup($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msPdfviewer: function (inputObj) {
        try {
            mService.widgets.init.msPdfviewer($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msQrcode: function (inputObj) {
        try {
            mService.widgets.init.msQrcode($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msRadiogroup: function (inputObj) {
        try {
            mService.widgets.init.msRadiogroup($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msRating: function (inputObj) {
        try {
            mService.widgets.init.msRating($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msSearchpopup: function (inputObj) {
        try {
            mService.widgets.init.msSearchpopup($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msSignaturepad: function (inputObj) {
        try {
            mService.widgets.init.msSignaturepad($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msSlider: function (inputObj) {
        try {
            mService.widgets.init.msSlider($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msTextarea: function (inputObj) {
        try {
            mService.widgets.init.msTextarea($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msTextbox: function (inputObj) {
        try {
            mService.widgets.init.msTextbox($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msTimebox: function (inputObj) {
        try {
            mService.widgets.init.msTimebox($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msTimeline: function (inputObj) {
        try {
            mService.widgets.init.msTimeline($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msTimelogger: function (inputObj) {
        try {
            mService.widgets.init.msTimelogger($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msVideoplayer: function (inputObj) {
        try {
            mService.widgets.init.msVideoplayer($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msVoice: function (inputObj) {
        try {
            mService.widgets.init.msVoice($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    msSubpage: function (inputObj) {
        try {
            mService.widgets.init.msSubpage($.extend({}, inputObj, {
                    id: $(this).attr("id"),
                }));
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    setDataSource: function (dataSource) {
        var widgetType;
        try {
            widgetType = $(this).attr("data-ms-widget-type");
            widgetID = $(this).attr("id");
            if (widgetType !== undefined) {
                return mService.widgets.setDataSource[widgetType](widgetID, dataSource);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    setMax: function (value) {
        var widgetType;
        try {
            (widgetType = $(this).attr("data-ms-widget-type")),
            (widgetID = $(this).attr("id"));
            if (widgetType !== undefined) {
                return mService.widgets.setMax[widgetType](widgetID, value);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    setMin: function (value) {
        var widgetType;
        try {
            (widgetType = $(this).attr("data-ms-widget-type")),
            (widgetID = $(this).attr("id"));
            if (widgetType !== undefined) {
                return mService.widgets.setMin[widgetType](widgetID, value);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    setVal: function (value) {
        var widgetType;
        try {
            (widgetType = $(this).attr("data-ms-widget-type")),
            (widgetID = $(this).attr("id"));
            if (widgetType !== undefined) {
                return mService.widgets.setVal[widgetType](widgetID, value);
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
});