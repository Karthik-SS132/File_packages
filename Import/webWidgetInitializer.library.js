var webWidgetInitializer = {
    initializeWVideoplayer: function (initObject) {
        try {
            $("#" + initObject.fieldID).append(webWidgetInitializer.util.getTransformedHtml("msVideoplayerTemplate", initObject));
        } catch (exception) {
            console.log(exception);
        }
    },
    initializeWAudioplayer: function (initObject) {
        try {
            $("#" + initObject.fieldID).append(webWidgetInitializer.util.getTransformedHtml("msAudioplayerTemplate", initObject));
            setTimeout(function () {
                try {
                    $("#" + initObject.fieldID + "_widget").load();
                } catch (exception) {
                    console.log(exception);
                }
            }, 500);
        } catch (exception) {
            console.log(exception);
        }
    },
    initializeWImageviewer: function (initObject) {
        var image,
        canvas,
        containerWidth,
        containerHeight,
        aspectRatio;
        try {
            $("#" + initObject.fieldID).append(webWidgetInitializer.util.getTransformedHtml("msImageviewerTemplate", initObject));
            source = initObject.source;
            containerHeight = $("#" + initObject.fieldID).height();
            containerWidth = $("#" + initObject.fieldID).width();
            image = new Image();
            image.onload = function (e) {
                try {
                    $("#" + initObject.fieldID + "_widget").attr("data-ms-widget-source", source);
                    canvas = document.getElementById(initObject.fieldID + "_widget");
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
                    console.log(exception);
                }
            };
            image.src = source;
        } catch (exception) {
            console.log(exception);
        }
    },
    initializeWPdfviewer: function (initObject) {
        var url,
        raw, toolbarItems,
        fileName;
        try {
            initObject.showDownload = initObject.showDownload === undefined ? true : initObject.showDownload;
            initObject.showPrint = initObject.showPrint === undefined ? true : initObject.showPrint;
            url = initObject.source || "";
            raw = url.substring(url.lastIndexOf("/") + 1).split("?")[0] || "";
            fileName = raw || "Document.pdf";
            toolbarItems = ["pager", "zoom"];
            if (initObject.showDownload) toolbarItems.push("download");
            if (initObject.showPrint) {
                toolbarItems.push({
                    type: "button",
                    text: "Print",
                    icon: "print",
                    click: function () {
                        var printWindow = window.open(url, "_blank");
                        if (!printWindow) {
                            alert("Popup blocked. Please allow popups for this site to print the document.");
                            return;
                        };
                        printWindow.focus();
                        var interval = setInterval(function () {
                            if (printWindow.document.readyState === "complete") {
                                clearInterval(interval);
                                printWindow.document.body.onafterprint = function () {
                                    printWindow.close();
                                };
                                printWindow.print();
                                setTimeout(function () {
                                    if (!printWindow.closed) {
                                        printWindow.close();
                                    }
                                }, 25000);
                            }
                        }, 300);
                    }
                });
            };
            $("#" + initObject.fieldID)
                .append(webWidgetInitializer.util.getTransformedHtml("msPdfviewerTemplate", initObject));
            $("#" + initObject.fieldID + "_widget").kendoPDFViewer({
                    pdfjsProcessing: { file: url },
                    toolbar: { items: toolbarItems },
                    messages: { defaultFileName: fileName },
                    width: (screen.width * 0.90),
                    height: (screen.height * 0.90),
                    position: "fixed",
                    scale: 1.4,
                    fitWidth: false
                });
            $(window).on("resize", function () {
                var viewer;
                try {
                    viewer = $("#" + initObject.fieldID + "_widget").data("kendoPDFViewer");
                    viewer.wrapper.resize();
                } catch (exception) {
                    console.log(exception);
                }
            });
        } catch (exception) {
            console.log(exception);
        }
    },
    initializeWAttachment: function (initObject) {
        var screenObject,
        fileSizeExceedIndicator,
        allowedExtensionCheck,
        fileExtensionFailedIndicator,
        fileSuccessIndicator,
        fileCounter,
        successfulUploadCounter,
        removedFileIndex,
        multipleValue,
        validateFileSize;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        multipleValue = true;
        validateFileSize = true;
        if (initObject.multiple == false) {
            multipleValue = false;
        };
        if (initObject.validateFileSize == false) {
            validateFileSize = false;
        };
        successfulUploadCounter = 0;
        $("#" + initObject.fieldID).kendoUpload({
            multiple: multipleValue,
            remove: function (event) {
                for (fileCounter = 0; fileCounter < event.files.length; fileCounter++) {
                    $.grep(screenObject.variable.custom.attachedFilesList, function (element, index) {
                        if (element.uid == event.files[fileCounter].uid && element.fileName == event.files[fileCounter].name) {
                            removedFileIndex = index;
                        }
                    });
                    screenObject.variable.custom.attachedFilesList.splice(removedFileIndex, 1);
                    if (screenObject.widgetEventHandler != undefined) {
                        if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_remove"]) == "function") {
                            screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_remove"](this, event);
                        }
                    }
                }
            },
            select: function (event) {
                fileSizeExceedIndicator = false,
                fileExtensionFailedIndicator = false;
                if ((event.files.length + screenObject.variable.custom.attachedFilesList.length) > 3) {
                    alert("Maximum of only 3 files are allowed to UPLOAD at a time");
                    event.preventDefault();
                    return false;
                };
                for (fileCounter = 0; fileCounter < event.files.length; fileCounter++) {
                    fileSuccessIndicator = true;
                    allowedExtensionCheck = $.grep(mserviceUtilities.getAllowedFileExtensions(), function (element, index) {
                        return element.code == event.files[fileCounter].extension.toLowerCase();
                    });
                    if (allowedExtensionCheck.length == 0) {
                        event.files.splice(fileCounter, 1);
                        fileExtensionFailedIndicator = true;
                        fileSuccessIndicator = false;
                    } else if (validateFileSize == true && event.files[fileCounter].size > 209715200) {
                        event.files.splice(fileCounter, 1);
                        fileSizeExceedIndicator = true;
                        fileSuccessIndicator = false;
                    };
                    if (fileSuccessIndicator) {
                        screenObject.variable.custom.attachedFilesList.push({
                            file: document.getElementById(initObject.fieldID).files[fileCounter],
                            fileCategory: allowedExtensionCheck[0].parent_code,
                            fileType: allowedExtensionCheck[0].parent_code,
                            fileName: event.files[fileCounter].name,
                            fileExtension: event.files[fileCounter].extension.toLowerCase(),
                            uid: event.files[fileCounter].uid,
                        });
                        if ($("#" + initObject.fieldID + "_group .display_description") != undefined) {
                            $("#" + initObject.fieldID + "_group .display_description").text("");
                        };
                    };
                    if (screenObject.widgetEventHandler != undefined) {
                        if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_select"]) == "function") {
                            screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_select"](this, event);
                        }
                    }
                };
                if (fileExtensionFailedIndicator) {
                    alert("Files with extensions other than " + $.map(mserviceUtilities.getAllowedFileExtensions(), function (element) {
                            return element.code;
                        }).join() + " are not allowed to UPLOAD");
                } else if (fileSizeExceedIndicator) {
                    alert("Files of size greater than 200 MB are not allowed to UPLOAD");
                }
            },
            complete: function (event) {},
            localization: {
                select: "Select files..."
            },
            showFileList: true,
            template: kendo.template("<div class = 'file-wrapper'><p>Name: #=name#</p><button type = 'button' class = 'k-upload-action' style = 'position: absolute; top: 7px; right: 10px;'><span class = 'k-icon k-i-close k-delete' title = 'Remove'></span></button></div>")
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_attachment");
    },
    initializeWCheckbox: function (initObject) {
        var screenObject,
        actualDefaultValue;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        $("#" + initObject.fieldID).attr("type", "checkbox");
        $("#" + initObject.fieldID).attr("data-widget-type", "w_checkbox");
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            $("#" + initObject.fieldID).setVal(actualDefaultValue);
        };
        $("#" + initObject.fieldID).on("change", function (event) {
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
    },
    initializeWCombobox: function (initObject) {
        var screenObject,
        actualDefaultValue,
        allowNewEntry,
        templateValue,
        placeholderValue,
        dataSourceValue,
        defaultValueObject,
        childFieldList,
        childFieldCounter,
        serverFilteringValue,
        delayValue;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        templateValue = "${data." + initObject.dataValueField + "}" + " - " + "${data." + initObject.dataTextField + "}";
        if (initObject.template == "code") {
            templateValue = "${data." + initObject.dataValueField + "}";
        } else if (initObject.template == "description") {
            templateValue = "${data." + initObject.dataTextField + "}";
        };
        if (initObject.filterMode == true) {
            placeholderValue = "ALL";
        } else {
            placeholderValue = "---Select---";
        };
        if (initObject.serverFiltering) {
            serverFilteringValue = true;
            delayValue = 1500;
        } else {
            serverFilteringValue = false;
            delayValue = 200;
        };
        if (initObject.allowNewEntry) {
            allowNewEntry = true;
        } else {
            allowNewEntry = false;
        };
        dataSourceValue = initObject.dataSource;
        if (initObject.dataSource.applicationName != undefined) {
            dataSourceValue = mserviceUtilities.getTransportDataSource({
                applicationName: initObject.dataSource.applicationName,
                serviceName: initObject.dataSource.serviceName,
                outputPath: initObject.dataSource.outputPath,
                inputParameter: initObject.dataSource.inputParameter
            });
        } else if (initObject.dataSource.informationType != undefined) {
            dataSourceValue = mserviceUtilities.getCachedDataSource(initObject.dataSource);
        };
        $("#" + initObject.fieldID).kendoComboBox({
            dataSource: dataSourceValue,
            autoBind: false,
            dataTextField: initObject.dataValueField,
            dataValueField: initObject.dataValueField,
            placeholder: placeholderValue,
            template: templateValue,
            filter: "contains",
            serverFiltering: serverFilteringValue,
            delay: delayValue,
            filtering: function (event) {
                if (initObject.serverFiltering) {
                    event.preventDefault();
                    if (event.filter.value != "") {
                        screenObject.variable.custom[initObject.fieldID.replace(initObject.screenID + "_", "") + "_serverFilterValue"] = event.filter.value;
                        $("#" + initObject.fieldID).data("kendoComboBox").dataSource.read();
                    }
                }
            }
        });
        $("#" + initObject.fieldID).data("kendoComboBox").options.dataTextField = initObject.dataTextField;
        webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = true;
            defaultValueObject = {};
            defaultValueObject[initObject.dataValueField] = actualDefaultValue;
            defaultValueObject[initObject.dataTextField] = actualDefaultValue;
            $("#" + initObject.fieldID).data("kendoComboBox").dataSource.data().push(defaultValueObject);
            $("#" + initObject.fieldID).data("kendoComboBox").value(actualDefaultValue);
            if (initObject.defaultValueDescription != undefined && initObject.defaultValueDescription != "") {
                $(".display_description[data-for='" + initObject.fieldID + "']").text(mserviceUtilities.getActualValue(initObject.defaultValueDescription));
            }
        };
        $("#" + initObject.fieldID).data("kendoComboBox").bind("change", function (event) {
            if ($("#" + initObject.fieldID).data("kendoComboBox").dataItem() != undefined) {
                if ($("#" + initObject.fieldID).data("kendoComboBox").dataItem()[initObject.dataTextField] != "" && $("#" + initObject.fieldID).data("kendoComboBox").dataItem()[initObject.dataTextField] != "ALL") {
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text($("#" + initObject.fieldID).data("kendoComboBox").dataItem()[initObject.dataTextField]);
                } else {
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
                }
            } else {
                $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
            };
            if (initObject.childFieldID != undefined) {
                if ($("#" + initObject.fieldID).getVal() != "") {
                    childFieldList = initObject.childFieldID.split(",");
                    for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                        if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_dropdownlist") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").dataSource.read();
                            if ($("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").dataSource.data().length != 0) {
                                $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").value("");
                            };
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_combobox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.read();
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_searchbox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.read();
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_multiselect") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").dataSource.read();
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").trigger("change");
                        };
                        webWidgetInitializer.variable.defaultValueDisplay[childFieldList[childFieldCounter].trim()] = false;
                    }
                } else {
                    childFieldList = initObject.childFieldID.split(",");
                    for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                        if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_dropdownlist") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_combobox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_searchbox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_multiselect") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").trigger("change");
                        };
                        webWidgetInitializer.variable.defaultValueDisplay[childFieldList[childFieldCounter].trim()] = false;
                    }
                }
            };
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        $("#" + initObject.fieldID).data("kendoComboBox").bind("open", function (event) {
            if (webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] == true) {
                $("#" + initObject.fieldID).data("kendoComboBox").dataSource.read();
                webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
            };
            $(".k-list-container").css("width", "auto");
            $(".k-list-container").css("min-width", $("#" + initObject.fieldID).parent().width() - 5);
            $(".k-list-container").css("max-width", 600);
            $(".k-list").css("width", "auto");
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"](this, event);
                }
            }
        });
        $("#" + initObject.fieldID).on("blur", function (event) {
            if ($("#" + initObject.fieldID).data("kendoComboBox").value() != "") {
                var temp = $.grep($("#" + initObject.fieldID).data("kendoComboBox").dataSource.data(), function (element, index) {
                    return element[initObject.dataValueField] == $("#" + initObject.fieldID).data("kendoComboBox").value();
                })[0];
                if (temp == undefined && allowNewEntry == false) {
                    alert("Selected Value is not valid.");
                    $("#" + initObject.fieldID).data("kendoComboBox").focus();
                    $("#" + initObject.fieldID).data("kendoComboBox").value("");
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
                }
                if (temp == undefined && allowNewEntry == true) {
                    if (!confirm("Entered Value is a New Entry. Do you wish to proceed with this ?")) {
                        $("#" + initObject.fieldID).data("kendoComboBox").focus();
                        $("#" + initObject.fieldID).data("kendoComboBox").value("");
                        $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
                    }
                }
            } else if ($("[name = '" + initObject.fieldID + "_input']").val() != "") {
                alert("Selected Value is not valid.");
                $("#" + initObject.fieldID).data("kendoComboBox").focus();
                $("[name = '" + initObject.fieldID + "_input']").val("");
            }
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_combobox");
        return $("#" + initObject.fieldID).data("kendoComboBox");
    },
    initializeWSearchbox: function (initObject) {
        var screenObject,
        actualDefaultValue,
        templateValue,
        placeholderValue,
        dataSourceValue,
        defaultValueObject,
        childFieldList,
        childFieldCounter,
        minLengthValue,
        validSearch;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        templateValue = "${data." + initObject.dataValueField + "}" + " - " + "${data." + initObject.dataTextField + "}";
        if (initObject.template == "code") {
            templateValue = "${data." + initObject.dataValueField + "}";
        } else if (initObject.template == "description") {
            templateValue = "${data." + initObject.dataTextField + "}";
        };
        if (initObject.filterMode == true) {
            placeholderValue = "ALL";
        } else {
            placeholderValue = "---Search---";
        };
        dataSourceValue = initObject.dataSource;
        if (initObject.dataSource.applicationName != undefined) {
            dataSourceValue = mserviceUtilities.getTransportDataSource({
                applicationName: initObject.dataSource.applicationName,
                serviceName: initObject.dataSource.serviceName,
                outputPath: initObject.dataSource.outputPath,
                inputParameter: initObject.dataSource.inputParameter
            });
        } else if (initObject.dataSource.informationType != undefined) {
            dataSourceValue = mserviceUtilities.getCachedDataSource(initObject.dataSource);
        };
		dataSourceValue.bind("requestStart", function(e) {
			if (validSearch === true) {
				if ($("[name = '" + initObject.fieldID + "_input']").val() == "") {
					e.preventDefault();
				}				
			} else {
				e.preventDefault();
			}
		});
        minLengthValue = 5;
        if (initObject.minLength != undefined) {
            minLengthValue = initObject.minLength;
        };
        $("#" + initObject.fieldID).kendoComboBox({
            dataSource: dataSourceValue,
            autoBind: false,
			dataTextField: initObject.dataValueField,
            dataValueField: initObject.dataValueField,
            placeholder: placeholderValue,
            template: templateValue,
			delay: 50000,
            filtering: function (event) {
                event.preventDefault();
            }
        });
        $("#" + initObject.fieldID).parent().find(".k-icon.k-i-arrow-60-down").removeClass("k-i-arrow-60-down").addClass("k-i-search").attr("id", initObject.fieldID + "_search_btn");
        validSearch = false;
        $("#" + initObject.fieldID + "_search_btn").click(function () {
            if ($("[name = '" + initObject.fieldID + "_input']").val().length < parseInt(minLengthValue)) {
                alert("Please enter minimum " + minLengthValue + " characters to search");
                validSearch = false;
            } else {
				kendo.ui.progress($("#" + initObject.fieldID + "_search_btn"), true);
				$("#" + initObject.fieldID + "_search_btn .k-loading-image").css({
					"background-image": "url(../../infra/kendoui/styles/Default/loading.gif)",
					"background-color": "#eae8e8"
				});
				$("#" + initObject.fieldID + "_search_btn .k-loading-image").hover(function(){ 
					$("#" + initObject.fieldID + "_search_btn .k-loading-image").css("background-color", "#c5bdb9");
				});
				setTimeout(function () {
					validSearch = true;
					screenObject.variable.custom[initObject.fieldID.replace(initObject.screenID + "_", "") + "_serverFilterValue"] = $("[name = '" + initObject.fieldID + "_input']").val();
					$("#" + initObject.fieldID).data("kendoComboBox").dataSource.read();
					kendo.ui.progress($("#" + initObject.fieldID + "_search_btn"), false);
					$("#" + initObject.fieldID).data("kendoComboBox").open();
				}, 1000);
            }
        });
        $("#" + initObject.fieldID).data("kendoComboBox").options.dataTextField = initObject.dataTextField;
        webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = true;
            defaultValueObject = {};
            defaultValueObject[initObject.dataValueField] = actualDefaultValue;
            defaultValueObject[initObject.dataTextField] = actualDefaultValue;
            $("#" + initObject.fieldID).data("kendoComboBox").dataSource.data().push(defaultValueObject);
            $("#" + initObject.fieldID).data("kendoComboBox").value(actualDefaultValue);
            if (initObject.defaultValueDescription != undefined && initObject.defaultValueDescription != "") {
                $(".display_description[data-for='" + initObject.fieldID + "']").text(mserviceUtilities.getActualValue(initObject.defaultValueDescription));
            }
        };
        $("#" + initObject.fieldID).data("kendoComboBox").bind("change", function (event) {
			if ($("#" + initObject.fieldID).data("kendoComboBox").dataItem() != undefined) {
                if ($("#" + initObject.fieldID).data("kendoComboBox").dataItem()[initObject.dataTextField] != "" && $("#" + initObject.fieldID).data("kendoComboBox").dataItem()[initObject.dataTextField] != "ALL") {
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text($("#" + initObject.fieldID).data("kendoComboBox").dataItem()[initObject.dataTextField]);
                } else {
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
                }
            } else {
                $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
            };
            if (initObject.childFieldID != undefined) {
                if ($("#" + initObject.fieldID).getVal() != "") {
                    childFieldList = initObject.childFieldID.split(",");
                    for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                        if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_dropdownlist") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").dataSource.read();
                            if ($("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").dataSource.data().length != 0) {
                                $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").value("");
                            };
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_combobox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.read();
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_searchbox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.read();
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_multiselect") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").dataSource.read();
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").trigger("change");
                        };
                        webWidgetInitializer.variable.defaultValueDisplay[childFieldList[childFieldCounter].trim()] = false;
                    }
                } else {
                    childFieldList = initObject.childFieldID.split(",");
                    for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                        if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_dropdownlist") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_combobox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_searchbox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_multiselect") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").trigger("change");
                        };
                        webWidgetInitializer.variable.defaultValueDisplay[childFieldList[childFieldCounter].trim()] = false;
                    }
                }
            };
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        $("#" + initObject.fieldID).data("kendoComboBox").bind("open", function (event) {
			if (validSearch === true) {
                if (webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] == true) {
                    $("#" + initObject.fieldID).data("kendoComboBox").dataSource.read();
                    webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
                };
                $(".k-list-container").css("width", "auto");
                $(".k-list-container").css("min-width", $("#" + initObject.fieldID).parent().width() - 5);
                $(".k-list-container").css("max-width", 600);
                $(".k-list").css("width", "auto");
                if (screenObject.widgetEventHandler != undefined) {
                    if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"]) == "function") {
                        screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"](this, event);
                    }
                }
				validSearch = false;
            } else {
                event.preventDefault();
            }
        });
        $("#" + initObject.fieldID).on("blur", function (event) {
			if (validSearch === true) {
				if ($("#" + initObject.fieldID).data("kendoComboBox").value() != "") {
					var temp = $.grep($("#" + initObject.fieldID).data("kendoComboBox").dataSource.data(), function (element, index) {
						return element[initObject.dataValueField] == $("#" + initObject.fieldID).data("kendoComboBox").value();
					})[0];
					if (temp == undefined) {
						alert("Selected Value is not valid.");
						$("#" + initObject.fieldID).data("kendoComboBox").focus();
						$("#" + initObject.fieldID).data("kendoComboBox").value("");
						$(".display_description[data-for = '" + initObject.fieldID + "']").text("");
					}
				} else if ($("[name = '" + initObject.fieldID + "_input']").val() != "") {
					alert("Selected Value is not valid.");
					$("#" + initObject.fieldID).data("kendoComboBox").focus();
					$("[name = '" + initObject.fieldID + "_input']").val("");
				}
				validSearch = false;
			}
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_searchbox");
        return $("#" + initObject.fieldID).data("kendoComboBox");
    },
    initializeWDatepicker: function (initObject) {
        var screenObject,
        actualDefaultValue,
        actualMinimumValue,
        actualMaximumValue,
        formatValue,
        minimumValue,
        maximumValue;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        actualMinimumValue = mserviceUtilities.getActualValue(initObject.minimum);
        actualMaximumValue = mserviceUtilities.getActualValue(initObject.maximum);
        formatValue = "dd-MM-yyyy",
        minimumValue = new Date(1900, 0, 1),
        maximumValue = new Date(2099, 11, 31);
        if (initObject.format != undefined) {
            formatValue = initObject.format;
        };
        if (actualMinimumValue != undefined && actualMinimumValue != "") {
            minimumValue = actualMinimumValue;
        };
        if (actualMaximumValue != undefined && actualMaximumValue != "") {
            maximumValue = new Date(actualMaximumValue.getFullYear(), actualMaximumValue.getMonth(), actualMaximumValue.getDate(), actualMaximumValue.getHours(), actualMaximumValue.getMinutes() + 2);
        };
        $("#" + initObject.fieldID).kendoDatePicker({
            format: formatValue,
            min: minimumValue,
            max: maximumValue
        });
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            $("#" + initObject.fieldID).data("kendoDatePicker").value(actualDefaultValue);
        };
        $("#" + initObject.fieldID).data("kendoDatePicker").bind("change", function (event) {
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_datepicker");
        return $("#" + initObject.fieldID).data("kendoDatePicker");
    },
    initializeWDatetimepicker: function (initObject) {
        var screenObject,
        actualDefaultValue,
        actualMinimumValue,
        actualMaximumValue,
        formatValue,
        minimumValue,
        maximumValue,
        intervalValue;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        actualMinimumValue = mserviceUtilities.getActualValue(initObject.minimum);
        actualMaximumValue = mserviceUtilities.getActualValue(initObject.maximum);
        formatValue = "dd-MM-yyyy HH:mm",
        minimumValue = new Date(1900, 0, 1),
        maximumValue = new Date(2099, 11, 31),
        intervalValue = 30;
        if (initObject.format != undefined) {
            formatValue = initObject.format;
        };
        if (actualMinimumValue != undefined && actualMinimumValue != "") {
            minimumValue = actualMinimumValue;
        };
        if (actualMaximumValue != undefined && actualMaximumValue != "") {
            maximumValue = new Date(actualMaximumValue.getFullYear(), actualMaximumValue.getMonth(), actualMaximumValue.getDate(), actualMaximumValue.getHours(), actualMaximumValue.getMinutes() + 2);
        };
        if (initObject.interval != undefined) {
            intervalValue = initObject.interval;
        };
        $("#" + initObject.fieldID).kendoDateTimePicker({
            format: formatValue,
            min: minimumValue,
            max: maximumValue,
            interval: intervalValue
        });
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            $("#" + initObject.fieldID).data("kendoDateTimePicker").value(actualDefaultValue);
        };
        $("#" + initObject.fieldID).data("kendoDateTimePicker").bind("change", function (event) {
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_datetimepicker");
        return $("#" + initObject.fieldID).data("kendoDateTimePicker");
    },
    initializeWDisplayarea: function (initObject) {
        var screenObject,
        actualDefaultValue;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        $("#" + initObject.fieldID).attr("data-widget-type", "w_displayarea");
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            $("#" + initObject.fieldID).setVal(actualDefaultValue);
        }
    },
    initializeWDropdownlist: function (initObject) {
        var screenObject,
        actualDefaultValue,
        templateValue,
        optionLabelValue,
        dataSourceValue,
        defaultValueObject,
        childFieldList,
        childFieldCounter;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        templateValue = "${data." + initObject.dataValueField + "}" + " - " + "${data." + initObject.dataTextField + "}";
        if (initObject.template == "code") {
            templateValue = "${data." + initObject.dataValueField + "}";
        } else if (initObject.template == "description") {
            templateValue = "${data." + initObject.dataTextField + "}";
        };
        optionLabelValue = {};
        if (initObject.filterMode == true) {
            if (initObject.template == "description") {
                optionLabelValue[initObject.dataValueField] = "ALL";
                optionLabelValue[initObject.dataTextField] = "ALL";
            } else if (initObject.template == "code") {
                optionLabelValue[initObject.dataValueField] = "ALL";
            } else {
                optionLabelValue[initObject.dataValueField] = "ALL";
                optionLabelValue[initObject.dataTextField] = "";
            }
        } else {
            if (initObject.template == "description") {
                optionLabelValue[initObject.dataValueField] = "---Select---";
                optionLabelValue[initObject.dataTextField] = "---Select---";
            } else if (initObject.template == "code") {
                optionLabelValue[initObject.dataValueField] = "---Select---";
            } else {
                optionLabelValue[initObject.dataValueField] = "---Select---";
                optionLabelValue[initObject.dataTextField] = "";
            }
        };
        dataSourceValue = initObject.dataSource;
        if (initObject.dataSource.applicationName != undefined) {
            dataSourceValue = mserviceUtilities.getTransportDataSource({
                applicationName: initObject.dataSource.applicationName,
                serviceName: initObject.dataSource.serviceName,
                outputPath: initObject.dataSource.outputPath,
                inputParameter: initObject.dataSource.inputParameter
            });
        } else if (initObject.dataSource.informationType != undefined) {
            dataSourceValue = mserviceUtilities.getCachedDataSource(initObject.dataSource);
        };
        $("#" + initObject.fieldID).kendoDropDownList({
            dataSource: dataSourceValue,
            autoBind: false,
            dataTextField: initObject.dataValueField,
            dataValueField: initObject.dataValueField,
            optionLabel: optionLabelValue,
            template: templateValue
        });
        webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = true;
            defaultValueObject = {};
            defaultValueObject[initObject.dataValueField] = actualDefaultValue;
            defaultValueObject[initObject.dataTextField] = actualDefaultValue;
            $("#" + initObject.fieldID).data("kendoDropDownList").dataSource.data().push(defaultValueObject);
            $("#" + initObject.fieldID).data("kendoDropDownList").value(actualDefaultValue);
            if (initObject.defaultValueDescription != undefined && initObject.defaultValueDescription != "") {
                $(".display_description[data-for='" + initObject.fieldID + "']").text(mserviceUtilities.getActualValue(initObject.defaultValueDescription));
            }
        };
        $("#" + initObject.fieldID).data("kendoDropDownList").bind("change", function (event) {
            if ($("#" + initObject.fieldID).data("kendoDropDownList").dataItem() != undefined) {
                if ($("#" + initObject.fieldID).data("kendoDropDownList").dataItem()[initObject.dataTextField] != "---Select---" && $("#" + initObject.fieldID).data("kendoDropDownList").dataItem()[initObject.dataTextField] != "ALL" && $("#" + initObject.fieldID).data("kendoDropDownList").dataItem()[initObject.dataTextField] != "") {
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text($("#" + initObject.fieldID).data("kendoDropDownList").dataItem()[initObject.dataTextField]);
                } else {
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
                }
            } else {
                $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
            };
            if (initObject.childFieldID != undefined) {
                if ($("#" + initObject.fieldID).getVal() != "") {
                    childFieldList = initObject.childFieldID.split(",");
                    for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                        if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_dropdownlist") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").dataSource.read();
                            if ($("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").dataSource.data().length != 0) {
                                $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").value("");
                            };
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_combobox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.read();
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_searchbox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.read();
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_multiselect") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").dataSource.read();
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").trigger("change");
                        };
                        webWidgetInitializer.variable.defaultValueDisplay[childFieldList[childFieldCounter].trim()] = false;
                    }
                } else {
                    childFieldList = initObject.childFieldID.split(",");
                    for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                        if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_dropdownlist") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoDropDownList").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_combobox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_searchbox") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoComboBox").trigger("change");
                        } else if ($("#" + childFieldList[childFieldCounter].trim()).attr("data-widget-type") == "w_multiselect") {
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").dataSource.data([]);
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").value("");
                            $("#" + childFieldList[childFieldCounter].trim()).data("kendoMultiSelect").trigger("change");
                        };
                        webWidgetInitializer.variable.defaultValueDisplay[childFieldList[childFieldCounter].trim()] = false;
                    }
                }
            };
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        $("#" + initObject.fieldID).data("kendoDropDownList").bind("open", function (event) {
            if (webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] == true) {
                $("#" + initObject.fieldID).data("kendoDropDownList").dataSource.read();
                webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
            };
            $(".k-list-container").css("width", "auto");
            $(".k-list-container").css("min-width", $("#" + initObject.fieldID).parent().width() - 5);
            $(".k-list-container").css("max-width", 600);
            $(".k-list").css("width", "auto");
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"](this, event);
                }
            }
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_dropdownlist");
        return $("#" + initObject.fieldID).data("kendoDropDownList");
    },
    initializeWGrid: function (initObject) {
        var screenObject,
        gridToolbar,
        toolbarElement,
        dataSourceValue,
        editableValue,
        resizableValue,
        selectableValue,
        filterableValue,
        pageableValue,
        sortableValue,
        detailTemplateValue,
        exportAccess,
        exportElement,
		importAccess, 
		importElement;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        gridToolbar = false,
        editableValue = false,
        resizableValue = true,
        selectableValue = true,
        filterableValue = true,
        pageableValue = true,
        sortableValue = true;
        detailTemplateValue = null;
        exportAccess = $.grep(access_profile.user_functional_access, function (element, index) {
            return element.child_screen_id == $("#" + initObject.screenID).attr("id");
        })[0];
        exportElement = "";
        if (exportAccess != undefined) {
            if (exportAccess.export_access == "true") {
                exportElement = "<a class = 'k-button' id = '" + initObject.fieldID + "_export_btn" + "' data-widget-type = 'w_button' data-button-group = 'export' data-button-role = 'grid' style = 'cursor: pointer; float: right'><span class= 'k-icon k-i-excel'></span>&nbsp;&nbsp;Export</a>";
            }
        }
		importAccess = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == $("#" + initObject.screenID).attr("id");
			})[0];
		importElement = "";
		if (importAccess != undefined) {
			if (importAccess.import_access == "true") {
				importElement = "<a class = 'k-button' id = '" + initObject.fieldID + "_import_btn" + "' data-widget-type = 'w_button' data-button-group = 'import' data-button-role = 'grid' style = 'cursor: pointer; float: right'><span class= 'k-icon k-i-excel'></span>&nbsp;&nbsp;Import</a>";
			} 
		}
		if (typeof(initObject.toolbar) == "object") {
			gridToolbar = initObject.toolbar;
		} else if (initObject.toolbar == false) {
			gridToolbar = initObject.toolbar;
		} else if (initObject.toolbar != undefined && initObject.toolbar != false) {
			toolbarElement = $.parseHTML($(initObject.toolbar).html().trim())[0];
			gridToolbar = kendo.template(toolbarElement.outerHTML.replace("</div>", exportElement + importElement + "</div>"));
		} else {
			toolbarElement = "<div class = 'toolbar'>" + exportElement + importElement + "</div>";
			gridToolbar = kendo.template(toolbarElement);
		};
        if (initObject.editable) {
            editableValue = initObject.editable;
        };
        if (initObject.resizable == false) {
            resizableValue = initObject.resizable;
        };
        if (initObject.selectable == false) {
            selectableValue = initObject.selectable;
        };
        if (initObject.filterable == false) {
            filterableValue = initObject.filterable;
        };
        if (initObject.pageable == false) {
            pageableValue = initObject.pageable;
        };
        if (initObject.sortable == false) {
            sortableValue = initObject.sortable;
        };
        if (initObject.detailTemplate != undefined) {
            detailTemplateValue = initObject.detailTemplate;
        };
        $("#" + initObject.fieldID).kendoGrid({
            autoBind: false,
            dataSource: initObject.dataSource,
            columns: webConfigurationEngine.getGridColumns({
                screenID: initObject.screenID,
                configurationParam: screenObject.variable.standard.configurationParam,
                fieldID: initObject.fieldID.replace(initObject.screenID + "_", ""),
                favourite: initObject.favourite
            }),
            toolbar: gridToolbar,
            height: initObject.height,
            pageSize: initObject.pageSize,
            editable: editableValue,
            resizable: resizableValue,
            selectable: selectableValue,
            filterable: filterableValue,
            pageable: {
                numeric: pageableValue,
            },
            sortable: sortableValue,
            dataBound: function (event) {
                setTimeout(function () {
                    kendo.ui.progress($("#" + initObject.fieldID), false);
                }, 500);
            },
            detailTemplate: detailTemplateValue
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_grid");
        return $("#" + initObject.fieldID).data("kendoGrid");
    },
    initializeWMenu: function () {
        var currentScreenID,
        currentScreenObject,
        nextScreenID,
        nextScreenName,
        nextScreenObject,
        configurationParam;
        webConfigurationEngine.buildMenuHTML();
        webConfigurationEngine.applyConfiguredMenuLabels();
        $("#menu_content").kendoMenu({
            select: function (event) {
                if (event.item.childElementCount == 1) {
                    nextScreenID = $(event.item).attr("data-screenid");
                    if (nextScreenID.substr(0, 25) == "manage_custom_maintenance") {
                        webWidgetInitializer.variable.customMainParam = nextScreenID;
                        nextScreenID = "manage_custom_maintenance";
                    } else {
                        webWidgetInitializer.variable.customMainParam = null;
                    };
                    nextScreenName = $(event.item).text();
                    if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_" + nextScreenID + ".js"])) {
                        try {
                            if (typeof(mserviceUtilities.evaluateExpression(nextScreenID).constructScreen) === "function") {
                                currentScreenID = webNavigationController.getCurrentScreenID();
                                if (currentScreenID != undefined && currentScreenID != "home_container") {
                                    currentScreenObject = mserviceUtilities.evaluateExpression(webNavigationController.getCurrentScreenID());
                                    if (currentScreenObject.variable.standard.valueChangeIndicator) {
                                        if (!confirm("Do you want to cancel the changes you made ?")) {
                                            return false;
                                        }
                                    }
                                };
                                $("#container").hide();
                                $.ajax({
                                    url: nextScreenID + ".html",
                                    async: false,
                                    dataType: "text",
                                    cache: true
                                }).done(function (data) {
                                    $("#container").html(data);
                                });
                                resetNavigationMap();
                                parentScreenID = "home_container";
                                screenName = nextScreenID;
                                screenID = nextScreenID;
                                divID = screenID;
                                displayLabel = nextScreenName;
                                AddToNavigationMap(divID, screenID, displayLabel, parentScreenID);
                                webNavigationController.variable.navigationMap = [{
                                        screenID: "home_container",
                                        screenName: "Home",
                                        parentScreenID: "home"
                                    }
                                ];
                                nextScreenObject = mserviceUtilities.evaluateExpression(nextScreenID);
                                try {
                                    webNavigationController.pushNavigationMap({
                                        nextScreenID: nextScreenID,
                                        nextScreenName: nextScreenName,
                                        screenID: "home_container"
                                    });
                                    if (nextScreenID != "home_container") {
										nextScreenObject.constructScreen();
										webNavigationController.applyScreenConfigurations();
									} else {
										home_container.constructScreen();
									}
                                } catch (ex) {
                                    alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
                                    if (webNavigationController.getCurrentScreenID() == nextScreenID) {
                                        webNavigationController.gotoPreviousScreen();
                                    }
                                };
                                $("#container").show();
                                var screenGrid = $("#" + nextScreenID + " [data-widget-type = 'w_grid']");
                                for (var screenGridCounter = 0; screenGridCounter < screenGrid.length; screenGridCounter++) {
                                    $(screenGrid[screenGridCounter]).data("kendoGrid").refresh();
                                }
                                mserviceUtilities.cachedDatasource = new kendo.data.DataSource({
                                    data: [],
                                });
                            }
                        } catch (ex) {
                            document.getElementById("spinner").style.display = 'block';
                            if (isScreenEditable == false) {
                                isDataModified = false;
                            };
                            if (isDataModified == true && isScreenEditable == true) {
                                var ignoreChanges = confirm("Data is modified. Do you want to cancel the changes? Click OK to proceed without saving, Cancel to stay on the current page.");
                                if (ignoreChanges == false) {
                                    document.getElementById("spinner").style.display = 'none';
                                    return;
                                } else {
                                    isDataModified = false;
                                    isScreenEditable = false;
                                }
                            };
                            screenName = $(event.item).data("screenid");
                            var label = $(event.item).text();
                            MenuTitle = $(event.item).text();
                            if (LoadJSScripts(["./webui/scripts/js/fn_" + screenName + ".js"])) {
                                if (mserviceUtilities.evaluateExpression("fn_" + screenName + "_loadScripts()")) {
                                    if (screenName != "manage_organogram") {
                                        $("#container").hide();
                                    };
                                    $.ajax({
                                        url: screenName + ".html",
                                        async: false,
                                        dataType: "text",
                                        cache: true
                                    }).done(function (data) {
                                        $("#container").html(data);
                                    });
                                    resetNavigationMap();
                                    parentScreenID = "home_container";
                                    screenID = screenName;
                                    divID = screenID;
                                    displayLabel = label;
                                    AddToNavigationMap(divID, screenID, displayLabel, parentScreenID);
                                    mserviceUtilities.evaluateExpression("fn_" + screenName + "()");
                                    ManagingFeatureAccess(screenName);
                                    ManagingSubFeatureAccess(screenName);
                                    if (screenName != "manage_organogram") {
                                        $("#container").show();
                                    };
                                    var screenGrid = $("#" + screenName + " [data-role = 'grid']");
                                    for (var screenGridCounter = 0; screenGridCounter < screenGrid.length; screenGridCounter++) {
                                        $(screenGrid[screenGridCounter]).data("kendoGrid").refresh();
                                    }
                                } else {
                                    alert("E_LO_1002: Unable to load required files. Please contact your support desk.");
                                    return false;
                                }
                            };
                            document.getElementById("spinner").style.display = 'none';
                            if (isScreenEditable == true) {
                                $("#container,.k-widget").delegate(':input', 'change', function (e) {
                                    if (e.currentTarget.value != '') {
                                        isDataModified = true;
                                    }
                                });
                            }
                        };
                    } else {
                        alert("E_LO_1002: Unable to load required files. Please contact your support desk.");
                        return false;
                    };
                }
            }
        });
    },
    initializeWMultiselect: function (initObject) {
        var screenObject,
        actualDefaultValue,
        templateValue,
        placeholderValue,
        dataSourceValue,
        defaultValueObject,
        defaultValueCounter,
        dataItemsCounter;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        templateValue = "${data." + initObject.dataValueField + "}" + " - " + "${data." + initObject.dataTextField + "}";
        if (initObject.template == "code") {
            templateValue = "${data." + initObject.dataValueField + "}";
        } else if (initObject.template == "description") {
            templateValue = "${data." + initObject.dataTextField + "}";
        };
        if (initObject.filterMode == true) {
            placeholderValue = "ALL";
        } else {
            placeholderValue = "---Select---";
        };
        dataSourceValue = initObject.dataSource;
        if (initObject.dataSource.applicationName != undefined) {
            dataSourceValue = mserviceUtilities.getTransportDataSource({
                applicationName: initObject.dataSource.applicationName,
                serviceName: initObject.dataSource.serviceName,
                outputPath: initObject.dataSource.outputPath,
                inputParameter: initObject.dataSource.inputParameter
            });
        } else if (initObject.dataSource.informationType != undefined) {
            dataSourceValue = mserviceUtilities.getCachedDataSource(initObject.dataSource);
        };
        $("#" + initObject.fieldID).kendoMultiSelect({
            dataSource: dataSourceValue,
            autoBind: false,
            dataTextField: initObject.dataValueField,
            dataValueField: initObject.dataValueField,
            placeholder: placeholderValue,
            itemTemplate: templateValue
        });
        webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = true;            
            $("#" + initObject.fieldID).data("kendoMultiSelect").value(actualDefaultValue);
        };
        $("#" + initObject.fieldID).data("kendoMultiSelect").bind("change", function (event) {
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        $("#" + initObject.fieldID).data("kendoMultiSelect").bind("open", function (event) {
            if (webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] == true) {
                $("#" + initObject.fieldID).data("kendoMultiSelect").dataSource.read();
                webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
            };
            $(".k-list-container").css("width", "auto");
            $(".k-list-container").css("min-width", $("#" + initObject.fieldID).parent().width() - 5);
            $(".k-list-container").css("max-width", 600);
            $(".k-list").css("width", "auto");
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"](this, event);
                }
            }
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_multiselect");
        return $("#" + initObject.fieldID).data("kendoMultiSelect");
    },
    initializeWNumerictextbox: function (initObject) {
        var screenObject,
        actualDefaultValue,
        formatValue,
        minimumValue,
        maximumValue,
        stepValue,
        decimalsValue;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        formatValue = "n",
        minimumValue = null,
        maximumValue = null,
        stepValue = 1,
        decimalsValue = null;
        if (initObject.format != undefined) {
            formatValue = initObject.format;
        };
        if (initObject.minimum != undefined) {
            minimumValue = mserviceUtilities.getActualValue(initObject.minimum);
        };
        if (initObject.maximum != undefined) {
            maximumValue = mserviceUtilities.getActualValue(initObject.maximum);
        };
        if (initObject.step != undefined) {
            stepValue = mserviceUtilities.getActualValue(initObject.step);
        };
        if (initObject.decimals != undefined) {
            decimalsValue = mserviceUtilities.getActualValue(initObject.decimals);
        };
        $("#" + initObject.fieldID).kendoNumericTextBox({
            decimals: decimalsValue,
            format: formatValue,
            max: maximumValue,
            min: minimumValue,
            step: stepValue
        });
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            $("#" + initObject.fieldID).data("kendoNumericTextBox").value(actualDefaultValue);
        };
        $("#" + initObject.fieldID).data("kendoNumericTextBox").bind("change", function (event) {
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        $("#" + initObject.fieldID).data("kendoNumericTextBox").bind("spin", function (event) {
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_spin"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_spin"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_numerictextbox");
        return $("#" + initObject.fieldID).data("kendoNumericTextBox");
    },
    initializeWPopup: function (initObject) {
        var windowHeightValue,
        windowWidthValue,
        windowContentValue,
        kendoWindowField,
        nextScreenObject,
        previousScreenObject;
        nextScreenObject = mserviceUtilities.evaluateExpression(initObject.nextScreenID);
        windowHeightValue = false,
        windowWidthValue = false,
        windowContentValue = false;
        if (initObject.windowHeight != undefined && initObject.windowHeight != false) {
            windowHeightValue = initObject.windowHeight + "px";
        };
        if (initObject.windowWidth != undefined && initObject.windowWidth != false) {
            windowWidthValue = initObject.windowWidth + "px";
        };
        if (initObject.windowContent == undefined || initObject.windowContent == false) {
            $.ajax({
                url: initObject.nextScreenID + ".html",
                async: false,
                dataType: "text",
                cache: true
            }).done(function (data) {
                initObject.windowContent = data;
            });
        };
        $("#" + initObject.fieldID).append("<div id = '" + initObject.fieldID + "_openkendowindow'></div>");
        kendoWindowField = $("#" + initObject.fieldID + "_openkendowindow");
        $("#" + initObject.fieldID + "_openkendowindow").kendoWindow({
            title: initObject.nextScreenName,
            content: windowContentValue,
            height: windowHeightValue,
            width: windowWidthValue,
            draggable: false,
            scrollable: false,
            modal: true,
            resizable: false,
            position: {
                top: "50%",
                left: "50%"
            },
            close: function (event) {
                webNavigationController.popNavigationMap();
            },
            refresh: function (event) {
                try {
                    $("#" + initObject.fieldID + "_openkendowindow").data("kendoWindow").center();
                    webNavigationController.pushNavigationMap(initObject);
                    initObject.execute();
                    webNavigationController.applyScreenConfigurations();
                    previousScreenObject = mserviceUtilities.evaluateExpression(webNavigationController.getPreviousScreenID());
                    if (previousScreenObject.variable.custom.crudIndicator == "V") {
                        $("#" + webNavigationController.getCurrentScreenID() + "_submit_btn").hide();
                        $("#" + webNavigationController.getCurrentScreenID()).enableViewMode();
                    };
                    $("#" + initObject.fieldID + "_openkendowindow").parent().show();
                    var screenGrid = $("#" + initObject.nextScreenID + " [data-widget-type = 'w_grid']");
                    for (var screenGridCounter = 0; screenGridCounter < screenGrid.length; screenGridCounter++) {
                        $(screenGrid[screenGridCounter]).data("kendoGrid").refresh();
                    }
                } catch (ex) {
                    alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
                    $("#" + initObject.fieldID + "_openkendowindow").remove();
                    $(".k-overlay").hide();
                    if (webNavigationController.getCurrentScreenID() == initObject.nextScreenID) {
                        webNavigationController.popNavigationMap();
                    }
                }
            },
            deactivate: function () {
                this.destroy();
            },
        });
        $("#" + initObject.fieldID + "_openkendowindow").parent().hide();
        if (initObject.windowContent != undefined && initObject.windowContent != false) {
            $("#" + initObject.fieldID + "_openkendowindow").data("kendoWindow").content(initObject.windowContent);
            $("#" + initObject.fieldID + "_openkendowindow").data("kendoWindow").trigger("refresh");
        };
        $("#" + initObject.fieldID + "_openkendowindow").attr("data-widget-type", "w_popup");
        return $("#" + initObject.fieldID + "_openkendowindow").data("kendoWindow");
    },
    initializeWTextarea: function (initObject) {
        var screenObject,
        actualDefaultValue;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        if (initObject.maxlength != undefined) {
            $("#" + initObject.fieldID).attr("maxlength", initObject.maxlength);
        };
        if (screenObject.variable.standard.popupIndicator == true && screenObject.variable.standard.reorderParam != undefined && screenObject.variable.standard.reorderParam[0].columnLength == 1) {
            $("#" + initObject.fieldID).attr("style", "width:200px; height:50px; resize:none;");
        } else {
            $("#" + initObject.fieldID).attr("style", "width:560px; height:50px; resize:none;");
        };
        $("#" + initObject.fieldID).attr("type", "text");
        $("#" + initObject.fieldID).attr("class", "k-textbox");
        $("#" + initObject.fieldID).attr("data-widget-type", "w_textarea");
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            $("#" + initObject.fieldID).setVal(actualDefaultValue);
        };
        $("#" + initObject.fieldID).on("change", function (event) {
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            }
        });
    },
    initializeWTextbox: function (initObject) {
        var screenObject,
        actualDefaultValue,
        keyFieldDataSource;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        if (initObject.maxlength != undefined) {
            $("#" + initObject.fieldID).attr("maxlength", initObject.maxlength);
        };
        if (initObject.type == "email") {
            $("#" + initObject.fieldID).attr("type", "email");
        } else if (initObject.type == "password") {
            $("#" + initObject.fieldID).attr("type", "password");
        } else {
            $("#" + initObject.fieldID).attr("type", "text");
        };
        if (initObject.keyField != undefined) {
            keyFieldDataSource = mserviceUtilities.getKeyFieldDataSource(initObject.keyField);
        };
        $("#" + initObject.fieldID).attr("class", "k-textbox");
        $("#" + initObject.fieldID).attr("data-widget-type", "w_textbox");
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            $("#" + initObject.fieldID).setVal(actualDefaultValue);
        };
        $("#" + initObject.fieldID).on("change", function (event) {
            if (initObject.keyField != undefined) {
                if ($("#" + initObject.fieldID).getVal() != "") {
                    keyFieldDataSource.read();
                    if (keyFieldDataSource.data()[0].p_valid_ind == "true") {
                        alert("Data already exists.");
                        $("#" + initObject.fieldID).setVal("");
                    }
                }
            };
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            }
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
    },
    initializeWCombotextbox: function (initObject) {
        var screenObject,
        actualDefaultValue,
        templateValue,
        placeholderValue,
        dataSourceValue,
        defaultValueObject,
        childFieldList,
        childFieldCounter,
        serverFilteringValue,
        delayValue,
        numberSplit;
        screenObject = mserviceUtilities.evaluateExpression(initObject.screenID);
        actualDefaultValue = mserviceUtilities.getActualValue(initObject.defaultValue);
        templateValue = "${data." + initObject.dataValueField + "}" + " - " + "${data." + initObject.dataTextField + "}";
        if (initObject.template == "code") {
            templateValue = "${data." + initObject.dataValueField + "}";
        } else if (initObject.template == "description") {
            templateValue = "${data." + initObject.dataTextField + "}";
        };
        if (initObject.filterMode == true) {
            placeholderValue = "ALL";
        } else {
            placeholderValue = "---Select---";
        };
        if (initObject.serverFiltering) {
            serverFilteringValue = true;
            delayValue = 1500;
        } else {
            serverFilteringValue = false;
            delayValue = 200;
        };
        dataSourceValue = initObject.dataSource;
        if (initObject.dataSource.applicationName != undefined) {
            dataSourceValue = mserviceUtilities.getTransportDataSource({
                applicationName: initObject.dataSource.applicationName,
                serviceName: initObject.dataSource.serviceName,
                outputPath: initObject.dataSource.outputPath,
                inputParameter: initObject.dataSource.inputParameter
            });
        } else if (initObject.dataSource.informationType != undefined) {
            dataSourceValue = mserviceUtilities.getCachedDataSource(initObject.dataSource);
        };
        $("#" + initObject.fieldID).kendoComboBox({
            dataSource: dataSourceValue,
            autoBind: false,
            dataTextField: initObject.dataValueField,
            dataValueField: initObject.dataValueField,
            placeholder: placeholderValue,
            template: templateValue,
            filter: "contains",
            serverFiltering: serverFilteringValue,
            delay: delayValue,
            filtering: function (event) {
                if (initObject.serverFiltering) {
                    event.preventDefault();
                    if (event.filter.value != "") {
                        screenObject.variable.custom[initObject.fieldID.replace(initObject.screenID + "_", "") + "_serverFilterValue"] = event.filter.value;
                        $("#" + initObject.fieldID).data("kendoComboBox").dataSource.read();
                    }
                }
            }
        });
        $("#" + initObject.fieldID).parent().after("<input id='" + initObject.fieldID + "_textentry" + "' class='k-textbox' data-widget-subtype='textentry'/>");
        $("#" + initObject.fieldID).data("kendoComboBox").options.dataTextField = initObject.dataTextField;
        webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
        if (actualDefaultValue != undefined && actualDefaultValue != "") {
            numberSplit = actualDefaultValue.split("-");
            if (numberSplit[0] != undefined) {
                webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = true;
                defaultValueObject = {};
                defaultValueObject[initObject.dataValueField] = numberSplit[0];
                defaultValueObject[initObject.dataTextField] = numberSplit[0];
                $("#" + initObject.fieldID).data("kendoComboBox").dataSource.data().push(defaultValueObject);
                $("#" + initObject.fieldID).data("kendoComboBox").value(numberSplit[0]);
                if (initObject.defaultValueDescription != undefined && initObject.defaultValueDescription != "") {
                    $(".display_description[data-for='" + initObject.fieldID + "']").text(mserviceUtilities.getActualValue(initObject.defaultValueDescription));
                }
            }
            if (numberSplit[1] != undefined) {
                $("#" + initObject.fieldID + "_textentry").val(numberSplit[1]);
            } else {
                $("#" + initObject.fieldID + "_textentry").val("");
            }
        };
        $("#" + initObject.fieldID).data("kendoComboBox").bind("change", function (event) {
            if ($("#" + initObject.fieldID).data("kendoComboBox").dataItem() != undefined) {
                if ($("#" + initObject.fieldID).data("kendoComboBox").dataItem()[initObject.dataTextField] != "" && $("#" + initObject.fieldID).data("kendoComboBox").dataItem()[initObject.dataTextField] != "ALL") {
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text($("#" + initObject.fieldID).data("kendoComboBox").dataItem()[initObject.dataTextField]);
                } else {
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
                }
            } else {
                $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
            };
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            };
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        $("#" + initObject.fieldID).data("kendoComboBox").bind("open", function (event) {
            if (webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] == true) {
                $("#" + initObject.fieldID).data("kendoComboBox").dataSource.read();
                webWidgetInitializer.variable.defaultValueDisplay[initObject.fieldID] = false;
            };
            $(".k-list-container").css("width", "auto");
            $(".k-list-container").css("min-width", $("#" + initObject.fieldID).parent().width() - 5);
            $(".k-list-container").css("max-width", 600);
            $(".k-list").css("width", "auto");
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_open"](this, event);
                }
            }
        });
        $("#" + initObject.fieldID).on("blur", function (event) {
            if ($("#" + initObject.fieldID).data("kendoComboBox").value() != "") {
                var temp = $.grep($("#" + initObject.fieldID).data("kendoComboBox").dataSource.data(), function (element, index) {
                    return element[initObject.dataValueField] == $("#" + initObject.fieldID).data("kendoComboBox").value();
                })[0];
                if (temp == undefined) {
                    alert("Selected Value is not valid.");
                    $("#" + initObject.fieldID).data("kendoComboBox").focus();
                    $("#" + initObject.fieldID).data("kendoComboBox").value("");
                    $(".display_description[data-for = '" + initObject.fieldID + "']").text("");
                }
            } else if ($("[name = '" + initObject.fieldID + "_input']").val() != "") {
                alert("Selected Value is not valid.");
                $("#" + initObject.fieldID).data("kendoComboBox").focus();
                $("[name = '" + initObject.fieldID + "_input']").val("");
            }
        });
        $("#" + initObject.fieldID).attr("data-widget-type", "w_combotextbox");
        $("#" + initObject.fieldID + "_textentry").on("change", function (event) {
            if (screenObject.widgetEventHandler != undefined) {
                if (typeof(screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"]) == "function") {
                    screenObject.widgetEventHandler[initObject.fieldID.replace(initObject.screenID + "_", "") + "_change"](this, event);
                }
            }
            ruleEngine.executeRuleStatements({
                screenID: initObject.screenID,
                objectID: "field",
                eventID: "change",
                fieldID: initObject.fieldID
            });
        });
        return $("#" + initObject.fieldID).data("kendoComboBox");
    },
    util: {
        getTransformedHtml: function (template, inputObj) {
            try {
                return kendo.template($("#" + template).html().replace(/\n/g, "").replace(/\t/g, ""))((inputObj !== undefined) ? (inputObj) : ({}));
            } catch (exception) {
                console.log(exception);
            };
        }
    },
    variable: {
        defaultValueDisplay: {},
        userSelected: {},
        widgetSelector: "[data-widget-type = 'w_attachment'], [data-widget-type = 'w_checkbox'], [data-widget-type = 'w_combobox'], [data-widget-type = 'w_searchbox'], [data-widget-type = 'w_datepicker'], [data-widget-type = 'w_datetimepicker'], [data-widget-type = 'w_displayarea'], [data-widget-type = 'w_dropdownlist'], [data-widget-type = 'w_multiselect'], [data-widget-type = 'w_numerictextbox'], [data-widget-type = 'w_textarea'], [data-widget-type = 'w_textbox'], [data-widget-type = 'w_combotextbox']"
    }
};
$.fn.extend({
    disable: function () {
        if ($(this).attr("data-widget-type") == "w_textbox" || $(this).attr("data-widget-type") == "w_textarea" || $(this).attr("data-widget-type") == "w_checkbox") {
            $(this).attr("disabled", true).css({
                backgroundColor: "#F5F5F5"
            });
        } else if ($(this).attr("data-widget-type") == "w_numerictextbox") {
            $(this).data("kendoNumericTextBox").enable(false);
        } else if ($(this).attr("data-widget-type") == "w_dropdownlist") {
            $(this).data("kendoDropDownList").enable(false);
        } else if ($(this).attr("data-widget-type") == "w_combobox" || $(this).attr("data-widget-type") == "w_searchbox") {
            $(this).data("kendoComboBox").enable(false);
        } else if ($(this).attr("data-widget-type") == "w_multiselect") {
            $(this).data("kendoMultiSelect").enable(false);
        } else if ($(this).attr("data-widget-type") == "w_datepicker") {
            $(this).data("kendoDatePicker").enable(false);
        } else if ($(this).attr("data-widget-type") == "w_datetimepicker") {
            $(this).data("kendoDateTimePicker").enable(false);
        } else if ($(this).attr("data-widget-type") == "w_combotextbox") {
            $(this).data("kendoComboBox").enable(false);
            $(this.selector + "_textentry").attr("disabled", true).css({
                backgroundColor: "#F5F5F5"
            });
        } else if ($(this).attr("data-widget-subtype") == "textentry") {
            $(this).attr("disabled", true).css({
                backgroundColor: "#F5F5F5"
            });
        }
    },
    enable: function () {
        if ($(this).attr("data-widget-type") == "w_textbox" || $(this).attr("data-widget-type") == "w_textarea" || $(this).attr("data-widget-type") == "w_checkbox") {
            $(this).attr("disabled", false).css({
                backgroundColor: ""
            });
        } else if ($(this).attr("data-widget-type") == "w_numerictextbox") {
            $(this).data("kendoNumericTextBox").enable(true);
        } else if ($(this).attr("data-widget-type") == "w_dropdownlist") {
            $(this).data("kendoDropDownList").enable(true);
        } else if ($(this).attr("data-widget-type") == "w_combobox" || $(this).attr("data-widget-type") == "w_searchbox") {
            $(this).data("kendoComboBox").enable(true);
        } else if ($(this).attr("data-widget-type") == "w_multiselect") {
            $(this).data("kendoMultiSelect").enable(true);
        } else if ($(this).attr("data-widget-type") == "w_datepicker") {
            $(this).data("kendoDatePicker").enable(true);
        } else if ($(this).attr("data-widget-type") == "w_datetimepicker") {
            $(this).data("kendoDateTimePicker").enable(true);
        } else if ($(this).attr("data-widget-type") == "w_combotextbox") {
            $(this).data("kendoComboBox").enable(true);
            $(this.selector + "_textentry").attr("disabled", false).css({
                backgroundColor: ""
            });
        } else if ($(this).attr("data-widget-subtype") == "textentry") {
            $(this).attr("disabled", false).css({
                backgroundColor: ""
            });
        }
    },
    getVal: function () {
        var returnValue;
        if ($(this).attr("data-widget-type") == "w_textbox") {
            returnValue = $(this).val();
        } else if ($(this).attr("data-widget-type") == "w_numerictextbox") {
            returnValue = "";
            if ($(this).data("kendoNumericTextBox").value() != null) {
                returnValue = $(this).data("kendoNumericTextBox").value();
            }
        } else if ($(this).attr("data-widget-type") == "w_dropdownlist") {
            returnValue = "";
            if ($(this).data("kendoDropDownList").value() != "---Select---" && $(this).data("kendoDropDownList").value() != "ALL") {
                returnValue = $(this).data("kendoDropDownList").value();
            }
        } else if ($(this).attr("data-widget-type") == "w_combobox" || $(this).attr("data-widget-type") == "w_searchbox") {
            returnValue = $(this).data("kendoComboBox").value();
        } else if ($(this).attr("data-widget-type") == "w_multiselect") {
            returnValue = $(this).data("kendoMultiSelect").value();
        } else if ($(this).attr("data-widget-type") == "w_datepicker") {
            returnValue = "";
            if ($(this).data("kendoDatePicker").value() != null) {
                returnValue = $(this).data("kendoDatePicker").value();
            }
        } else if ($(this).attr("data-widget-type") == "w_datetimepicker") {
            returnValue = "";
            if ($(this).data("kendoDateTimePicker").value() != null) {
                returnValue = $(this).data("kendoDateTimePicker").value();
            }
        } else if ($(this).attr("data-widget-type") == "w_checkbox") {
            returnValue = "0";
            if ($(this).prop("checked")) {
                returnValue = "1";
            }
        } else if ($(this).attr("data-widget-type") == "w_textarea") {
            returnValue = $(this).val().replace(/\n/g, "\\n");
        } else if ($(this).attr("data-widget-type") == "w_displayarea") {
            returnValue = $(this).text();
        } else if ($(this).attr("data-widget-type") == "w_combotextbox") {
            if ($(this).data("kendoComboBox").value() != "" && $(this.selector + "_textentry").val() != "") {
                returnValue = $(this).data("kendoComboBox").value() + "-" + $(this.selector + "_textentry").val();
            } else {
                returnValue = "";
            }
        };
        return returnValue;
    },
    initializeWAudioplayer: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWAudioplayer(initObject);
    },
    initializeWVideoplayer: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWVideoplayer(initObject);
    },
    initializeWImageviewer: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWImageviewer(initObject);
    },
    initializeWPdfviewer: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWPdfviewer(initObject);
    },
    initializeWAttachment: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWAttachment(initObject);
    },
    initializeWCheckbox: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWCheckbox(initObject);
    },
    initializeWCombobox: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWCombobox(initObject);
    },
    initializeWSearchbox: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWSearchbox(initObject);
    },
    initializeWDatepicker: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWDatepicker(initObject);
    },
    initializeWDatetimepicker: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWDatetimepicker(initObject);
    },
    initializeWDisplayarea: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWDisplayarea(initObject);
    },
    initializeWDropdownlist: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWDropdownlist(initObject);
    },
    initializeWGrid: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWGrid(initObject);
    },
    initializeWMenu: function () {
        webWidgetInitializer.initializeWMenu();
    },
    initializeWMultiselect: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWMultiselect(initObject);
    },
    initializeWNumerictextbox: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWNumerictextbox(initObject);
    },
    initializeWPopup: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWPopup(initObject);
    },
    initializeWTextarea: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWTextarea(initObject);
    },
    initializeWTextbox: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWTextbox(initObject);
    },
    initializeWCombotextbox: function (initObject) {
        initObject.fieldID = $(this).attr("id");
        return webWidgetInitializer.initializeWCombotextbox(initObject);
    },
    setMax: function (value) {
        if ($(this).attr("data-widget-type") == "w_datepicker") {
            if (typeof(value) == "object") {
                $(this).data("kendoDatePicker").max(new Date(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes() + 2));
            }
        } else if ($(this).attr("data-widget-type") == "w_datetimepicker") {
            if (typeof(value) == "object") {
                $(this).data("kendoDateTimePicker").max(new Date(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes() + 2));
            }
        } else if ($(this).attr("data-widget-type") == "w_numerictextbox") {
            $(this).data("kendoNumericTextBox").max(value);
        }
    },
    setMin: function (value) {
        if ($(this).attr("data-widget-type") == "w_datepicker") {
            if (typeof(value) == "object") {
                $(this).data("kendoDatePicker").min(value);
            }
        } else if ($(this).attr("data-widget-type") == "w_datetimepicker") {
            if (typeof(value) == "object") {
                $(this).data("kendoDateTimePicker").min(value);
            }
        } else if ($(this).attr("data-widget-type") == "w_numerictextbox") {
            $(this).data("kendoNumericTextBox").min(value);
        }
    },
    setVal: function (value) {
        if (value != undefined) {
            if ($(this).attr("data-widget-type") == "w_textbox" || $(this).attr("data-widget-type") == "w_textarea") {
                $(this).val(value);
            } else if ($(this).attr("data-widget-type") == "w_numerictextbox") {
                $(this).data("kendoNumericTextBox").value(value);
                $(this).data("kendoNumericTextBox").trigger("change");
            } else if ($(this).attr("data-widget-type") == "w_dropdownlist") {
                if (webWidgetInitializer.variable.defaultValueDisplay[$(this).attr("id")] == true) {
                    $(this).data("kendoDropDownList").dataSource.read();
                    webWidgetInitializer.variable.defaultValueDisplay[$(this).attr("id")] = false;
                };
                $(this).data("kendoDropDownList").value(value);
                $(this).data("kendoDropDownList").trigger("change");
            } else if ($(this).attr("data-widget-type") == "w_combobox" || $(this).attr("data-widget-type") == "w_searchbox") {
                if (webWidgetInitializer.variable.defaultValueDisplay[$(this).attr("id")] == true) {
                    $(this).data("kendoComboBox").dataSource.read();
                    webWidgetInitializer.variable.defaultValueDisplay[$(this).attr("id")] = false;
                };
                $(this).data("kendoComboBox").value(value);
                $(this).data("kendoComboBox").trigger("change");
            } else if ($(this).attr("data-widget-type") == "w_multiselect") {
                if ($.isArray(value)) {
                    if (webWidgetInitializer.variable.defaultValueDisplay[$(this).attr("id")] == true) {
                        $(this).data("kendoMultiSelect").dataSource.read();
                        webWidgetInitializer.variable.defaultValueDisplay[$(this).attr("id")] = false;
                    };
                    $(this).data("kendoMultiSelect").value(value);
                } else {
                    $(this).data("kendoMultiSelect").value(value.split(","));
                };
                $(this).data("kendoMultiSelect").trigger("change");
            } else if ($(this).attr("data-widget-type") == "w_datepicker") {
                if (typeof(value) == "object") {
                    $(this).data("kendoDatePicker").value(value);
                } else {
                    $(this).data("kendoDatePicker").value("");
                };
                $(this).data("kendoDatePicker").trigger("change");
            } else if ($(this).attr("data-widget-type") == "w_datetimepicker") {
                if (typeof(value) == "object") {
                    $(this).data("kendoDateTimePicker").value(value);
                } else {
                    $(this).data("kendoDateTimePicker").value("");
                };
                $(this).data("kendoDateTimePicker").trigger("change");
            } else if ($(this).attr("data-widget-type") == "w_checkbox") {
                if (value == "1") {
                    $(this).prop("checked", true);
                } else {
                    $(this).prop("checked", false);
                }
            } else if ($(this).attr("data-widget-type") == "w_displayarea") {
                $(this).text(value);
            } else if ($(this).prop("tagName") == "LABEL") {
                if ($(this).html().indexOf("</span>") != -1) {
                    $(this).html($(this).html().replace($(this).html().substring(0, $(this).html().lastIndexOf("<span")), value));
                } else {
                    $(this).html(value);
                }
            } else if ($(this).attr("data-widget-type") == "w_combotextbox") {
                var numSplit = value.split("-");
                if (numSplit[0] != undefined) {
                    if (webWidgetInitializer.variable.defaultValueDisplay[$(this).attr("id")] == true) {
                        $(this).data("kendoComboBox").dataSource.read();
                        webWidgetInitializer.variable.defaultValueDisplay[$(this).attr("id")] = false;
                    };
                    $(this).data("kendoComboBox").value(numSplit[0]);
                    $(this).data("kendoComboBox").trigger("change");
                }
                if (numSplit[1] != undefined) {
                    $(this.selector + "_textentry").val(numSplit[1]);
                } else {
                    $(this.selector + "_textentry").val("");
                }
            }
        }
    }
});
Object.preventExtensions(webWidgetInitializer);