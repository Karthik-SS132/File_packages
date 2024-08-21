mService.api = {
    attachment: {
        view: function (ele) {
            var attachmentObj;
            try {
                if (window.navigator.onLine) {
                    attachmentObj = JSON.parse(ele.attr("data-ms-containr-param"));
                    mService.api.attachment.viewPopup.init(function () {
                        try {
                            mService.config.label.resolve();
                            $("#attachment_view_player").html("");
                            if (attachmentObj.docType === "A") {
                                $("#attachment_view_player").msAudioplayer({
                                    source: attachmentObj.docSrc
                                });
                            } else if (attachmentObj.docType === "V") {
                                $("#attachment_view_player").msVideoplayer({
                                    source: attachmentObj.docSrc
                                });
                            } else if (attachmentObj.docType === "I") {
                                if (attachmentObj.docSrc.indexOf("data:image/png;base64,") === -1 && attachmentObj.docSrc.indexOf("data:image/jpeg;base64,") === -1 && attachmentObj.docSrc.indexOf("http") !== 0) {
                                    source = attachmentObj.docSrc.replace(mService.nfs.root, "").replace(mService.app.root, "").substring(1);
                                    mService.nfs.getBase64String(source, function (base64String) {
                                        try {
                                            $("#attachment_view_player").msImageviewer({
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
                                } else {
                                    $("#attachment_view_player").msImageviewer({
                                        source: attachmentObj.docSrc
                                    });
                                }
                            } else if (attachmentObj.docType === "D" || attachmentObj.docType === "P") {
                                if ((attachmentObj.docSrc).split('.').pop() === "html") {
                                    mService.nfs.readFile((attachmentObj.docSrc).replace(mService.nfs.root, "").replace(mService.app.root + "/", ""), function (data) {
                                        try {
                                            view.preview.showPreviewPopup(data);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.app.showToast("error_read_pdf", "system_messages");
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    $("#attachment_view_player").msPdfviewer({
                                        source: attachmentObj.docSrc
                                    });
                                }
                            } else {
                                mService.app.showToast("unsupport_document", "view");
                            };
                            mService.api.attachment.viewPopup.open();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    })
                } else {
                    mService.app.showToast("internet_connection_error", "system_messages");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        viewPopup: {
            init: function (success) {
                var kendoWindow;
                try {
                    if ($("#attachment_preview_popup").data("kendoWindow") === undefined) {
                        $("#attachment_preview_popup").kendoWindow({
                            width: screen.width,
                            height: screen.height,
                            title: {
                                text: "<span data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='attachment_view_popup' data-ms-lbl-id='title'></span>",
                                encoded: false
                            },
                            modal: true,
                            draggable: false,
                            resizable: false,
                            animation: false
                        });
                        kendoWindow = $("#attachment_preview_popup").closest(".k-window");
                        $(kendoWindow).addClass("ms_attachment_preview_popup_root");
                        kendoWindow = $("#attachment_preview_popup").data("kendoWindow");
                        kendoWindow.wrapper.find(".k-window-titlebar.k-header").hide();
                        customHeaderHtml = mService.config.template.getTransformedHtml("attachment_preview_popup_header");
                        kendoWindow.wrapper.find(".k-window-content").before(customHeaderHtml);
                        success();
                    } else {
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            open: function () {
                var zoomContainer,
                zoomiconsWrapper;
                try {
                    if (mService.app.platform === "iOS") {
                        zoomContainer = $("body").find(".km-popup-wrapper");
                        zoomiconsWrapper = $("body").find(".km-popup");
                        if (zoomContainer !== undefined) {
                            $(zoomContainer).css("position", "");
                            $(zoomiconsWrapper).css("position", "relative");
                        }
                    };
                    $("#attachment_preview_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            close: function (ele) {
                var zoomContainer,
                zoomiconsWrapper;
                try {
                    if (mService.app.platform === "iOS") {
                        zoomContainer = $("body").find(".km-popup-wrapper");
                        zoomiconsWrapper = $("body").find(".km-popup");
                        if (zoomContainer !== undefined) {
                            $(zoomContainer).css("position", "absolute");
                            $(zoomiconsWrapper).css("position", "fixed");
                        }
                    };
                    mService.widgets.init.util.msLoop.pausePlayer("attachment_view_player");
                    $("#attachment_preview_popup").data("kendoWindow").close();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    chat: {
        sendMessage: function (msgBody, success, failure) {
            try {
                $.ajax({
                    url: mService.app.clientURL + "/common/components/msvMsg/mserviceAI.aspx",
                    async: true,
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        msgHeader: {
                            "sessionID": mService.app.getSessionId(),
                            "clientID": mService.app.getClientId(),
                            "countryCode": mService.app.getCountryCode(),
                            "userID": mService.app.getUserId(),
                            "localeID": mService.app.getLocaleId(),
                            "appID": mService.app.id
                        },
                        msgBody: msgBody
                    }),
                    complete: function (response, status) {
                        try {
                            if (status === "success") {
                                response = JSON.parse(response.responseText);
                                if (response.status === "SUCCESS") {
                                    if (response.data !== "PUSHMSG") {
                                        var date = new Date();
                                        response.data.dateTime = Date.parse(date.toString());
                                        success(response.data);
                                    } else {
                                        success();
                                    }
                                } else {
                                    if (mService.app.channel === "web") {
                                        mService.app.alert("error", {
                                            scrid: "",
                                            lblid: "chat_auto_reply_error",
                                            lblgrpid: "error"
                                        });
                                    } else {
                                        mService.app.showToast("autoreply_error", "chat");
                                    }
                                }
                            } else {
                                if (mService.app.channel === "web") {
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "chat_auto_reply_error",
                                        lblgrpid: "error"
                                    });
                                } else {
                                    mService.app.showToast("autoreply_error", "chat");
                                }
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                            failure();
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        sendAttachment: function (id, fileData, success, failure) {
            var index,
            formData,
            xmlhttp,
            breakIndicator,
            attachmentPath,
            chatVariable;
            try {
                formData = new FormData();
                formData.append("file", ((fileData.rawFile === undefined) ? (fileData.file) : (fileData.rawFile)), fileData.name);
                if (window.ActiveXObject) {
                    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                } else if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest();
                };
                xmlhttp.addEventListener("load", function (event) {
                    try {
                        if (event.currentTarget.status === 200) {
                            breakIndicator = false;
                        } else {
                            breakIndicator = true;
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, false);
                xmlhttp.addEventListener("error", function (event) {
                    try {
                        breakIndicator = true;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, false);
                chatVariable = mService.widgets.variable.msChat.variable[id];
                xmlhttp.open("POST", mService.app.clientURL + "/" + "common" + "/" + "components" + "/" + "File_Upload" + "/" + "file_upload.aspx?companyId=" + mService.app.getClientId() + "&countryCode=" + mService.app.getCountryCode() + "&doc_type=" + "msvMsg" + "/" + "history" + "/" + mService.app.id + "/" + chatVariable.key + "/" + chatVariable.subKey + "&filename=", false);
                xmlhttp.send(formData);
                if (breakIndicator === true) {
                    failure();
                } else {
                    success();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    configuration: {
        get: function (configName, type, subType, success, failure) {
            try {
                $.ajax({
                    url: mService.app.clientURL + "/common/components/Keys/GetConfiguration.aspx",
                    async: false,
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        "sessionID": mService.app.getSessionId(),
                        "clientID": mService.app.getClientId(),
                        "countryCode": mService.app.getCountryCode(),
                        "userID": mService.app.getUserId(),
                        "localeID": mService.app.getLocaleId(),
                        "appID": mService.app.id,
                        "solution": mService.app.getSolution(),
                        "vertical": mService.app.getVertical(),
                        "clientgroup": mService.app.getClientGroup(),
                        "type": type,
                        "subType": subType,
                        "fileName": configName,
                        "framework": "2.0"
                    }),
                    complete: function (response, status) {
                        try {
                            if (response.responseText !== "file_not_found" && response.responseText !== "theme_not_found") {
                                success(response.responseText);
                            } else {
                                failure(response.responseText);
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                            failure();
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    filter: {
        apply: function (filterObj, dataSource, scrID) {
            var dSrc,
            dSourceKey;
            try {
                controllerObj = mService.config.controller.getControllerObj(scrID);
                if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                    patternScrID = scrID.replace("_list", "");
                    dSourceKey = scrID;
                } else {
                    patternScrID = scrID;
                    dSourceKey = scrID + "_list";
                };
                dataSource.filter(filterObj);
                dSrc = new kendo.data.DataSource({
                    data: dataSource.view()
                });
                dSrc.read().then(function () {
                    var filterBtnEle;
                    try {
                        mService.util.closeFilterDrawer();
                        filterBtnEle = $("#" + scrID).find('[data-ms-link-role="functional_drawer_filter"]');
                        if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                            $(filterBtnEle).removeClass("msPattern_workflow_action_icons_default").addClass("msPattern_workflow_action_icons_active");
                        } else {
                            $(filterBtnEle).removeClass("ms_filter_fab_default").addClass("ms_filter_fab_active");
                        };
                        mService.dSource.cache[dSourceKey] = dSrc;
                        mService.containR.variable[patternScrID].datasource.filterInd = true;
                        mService.containR.variable[patternScrID].datasource.filterObj = filterObj;
                        mService.containR.variable[patternScrID].activePage = 0;
                        if (controllerObj.presentR !== undefined && controllerObj.presentR.list_type !== undefined && controllerObj.presentR.list_type === "listview") {
                            if (controllerObj.containR_subtype === "master") {
                                mService.presentR.pattern.listview.init.initializeFreeFlowListview(scrID, false, false, true);
                            } else {
                                mService.presentR.pattern.listview.init.initializeListview(scrID, false, false, true);
                            }
                        } else {
                            mService.presentR.pattern.util.destroyScrollview(scrID);
                            $("#" + scrID + "_pager").remove();
                            mService.presentR.pattern.listview.init.initializeScrollViewList(scrID, false, false, true);
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    };
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        init: function (options, dataSource, scrID) {
            var filterObj,
            objKey,
            objValue,
            index,
            patternScrID;
            try {
                patternScrID = scrID.replace("_list", "");
                filterObj = mService.api.dataSource.filter(dataSource, options);
                if (mService.containR.variable[patternScrID].datasource === undefined) {
                    mService.containR.variable[patternScrID].datasource = {};
                };
                if (mService.containR.variable[patternScrID].datasource.filterOptions === undefined) {
                    mService.containR.variable[patternScrID].datasource.filterOptions = {};
                };
                mService.containR.variable[patternScrID].datasource.filterOptions = filterObj;
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
        },
    },
    keys: {
        get: function (purposeCode, success, failure) {
            try {
                mService.nfs.readFile("my_accounts" + "/" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json", function (data) {
                    try {
                        data = JSON.parse(data);
                        if (data.keys !== undefined) {
                            if (typeof(data.keys) === "string") {
                                data.keys = JSON.parse(data.keys);
                            };
                            if (Object.keys(data.keys).length === 0) {
                                failure();
                            } else {
                                if (data.keys[purposeCode] === undefined) {
                                    failure();
                                } else {
                                    success(data.keys[purposeCode]);
                                }
                            }
                        } else {
                            failure();
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
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    map: {
        init: function (success, failure) {
            try {
                mService.api.keys.get("mobile_address_store", function (key) {
                    try {
                        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
                            mService.api.map.loadScript('https://maps.googleapis.com/maps/api/js?key=' + key + '&v=weekly');
                        };
                        success();
                    } catch (exception) {
                        failure("location_API_key_error");
                    }
                }, function () {
                    try {
                        failure("location_API_key_error");
                    } catch (exception) {
                        failure("location_API_key_error");
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        loadScript: function (srcc) {
            var jsscript;
            try {
                jsscript = document.createElement("script");
                jsscript.type = "text/javascript";
                $("head").append(jsscript);
                jsscript.src = srcc;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    geoLocation: {
        getUserLocation: function (deviceID, success, failure) {
            try {
                if (window.navigator.onLine) {
                    $.ajax({
                        url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=common_modules&serviceName=retrieve_stafflocation_map&path=context/outputparam_detail",
                        async: true,
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            context: {
                                sessionId: mService.app.getSessionId(),
                                userId: mService.app.getUserId(),
                                client_id: mService.app.getClientId(),
                                locale_id: mService.app.getLocaleId(),
                                country_code: mService.app.getCountryCode(),
                                inputparam: {
                                    p_inputparam_xml: "<inputparam><device_id>" + deviceID + "</device_id></inputparam>"
                                }
                            }
                        }),
                        complete: function (response, status) {
                            var responseSrc;
                            try {
                                if (status === "success") {
                                    responseSrc = JSON.parse(response.responseText);
                                    if ($.isArray(responseSrc)) {
                                        if (responseSrc.length === 0) {
                                            failure("location_not_available_error");
                                        } else {
                                            success(responseSrc);
                                        }
                                    } else {
                                        failure("location_EC003_error");
                                    }
                                } else {
                                    failure("location_EC001_error");
                                }
                            } catch (e) {
                                failure("location_EC002_error");
                            }
                        }
                    });
                } else {
                    failure("internet_connection_error");
                }
            } catch (e) {
                failure("location_EC002_error");
                mService.exception.handle(exception);
            }
        },
        getGeoAddress: function (latitude, longitude, success, failure) {
            var keyData,
            urlAddress;
            try {
                if (window.navigator.onLine) {
                    mService.api.keys.get("mobile_address_store", function (key) {
                        try {
                            urlAddress = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false&key=" + key;
                            $.get(urlAddress, function (data, status) {
                                try {
                                    if (data.status === "OK") {
                                        success(data);
                                    } else {
                                        if (data.status === "ZERO_RESULTS" || data.status === "UNKNOWN_ERROR") {
                                            failure("retry");
                                        } else {
                                            failure("address_api_error");
                                        }
                                    }
                                } catch (exception) {
                                    failure("address_api_error");
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            failure("location_API_key_error");
                        }
                    }, function () {
                        try {
                            failure("location_API_key_error");
                        } catch (exception) {
                            failure("location_API_key_error");
                        }
                    });
                } else {
                    failure("internet_connection_error");
                }
            } catch (exception) {
                failure("location_get_address_error");
            }
        },
    },
    dataSource: {
        filter: function (dSrc, filterOptions) {
            var filterOptionsObj,
            options,
            filterArr,
            index,
            optionsIndex;
            try {
                filterOptionsObj = {};
                for (index = 0; index < filterOptions.length; index++) {
                    options = dSrc.data().map(a => a[filterOptions[index]]);
                    options = options.filter(function (x, i, a) {
                        try {
                            return a.indexOf(x) === i;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    filterArr = [];
                    for (optionsIndex = 0; optionsIndex < options.length; optionsIndex++) {
                        if (options[optionsIndex] !== "") {
                            filterArr.push({
                                "code": options[optionsIndex],
                                "description": options[optionsIndex]
                            });
                        }
                    };
                    filterOptionsObj[filterOptions[index]] = filterArr;
                }
            } catch (exception) {
                mService.exception.handle(exception);
            };
            return filterOptionsObj;
        }
    },
    location: {
        isAuthorized: function (success, failure) {
            try {
                cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
                    try {
                        if (authorized) {
                            success();
                        } else {
                            failure();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (error) {
                    try {
                        console.error("isLocationAuthorized error: " + error);
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        getAuthorizationStatus: function (success, failure) {
            var response,
            diagnostic;
            try {
                diagnostic = cordova.plugins.diagnostic;
                diagnostic.getLocationAuthorizationStatus(function (status) {
                    try {
                        switch (status) {
                        case diagnostic.permissionStatus.NOT_REQUESTED:
                            response = "NOT_REQUESTED";
                            break;
                        case diagnostic.permissionStatus.DENIED_ONCE:
                            response = "DENIED_ONCE";
                            break;
                        case diagnostic.permissionStatus.DENIED_ALWAYS:
                            response = "DENIED_ALWAYS";
                            break;
                        case diagnostic.permissionStatus.GRANTED:
                            response = "GRANTED";
                            break;
                        case diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                            response = "GRANTED_WHEN_IN_USE";
                            break;
                        };
                        success(response);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (error) {
                    try {
                        console.error("getLocationAuthorizationStatus error: " + error);
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        registerStateChange: function () {
            var response,
            diagnostic;
            try {
                diagnostic = cordova.plugins.diagnostic;
                diagnostic.registerLocationStateChangeHandler(function (state) {
                    try {
                        switch (state) {
                        case diagnostic.permissionStatus.NOT_REQUESTED:
                            response = "NEVER";
                            break;
                        case diagnostic.permissionStatus.DENIED_ALWAYS:
                            response = "NEVER";
                            break;
                        case diagnostic.permissionStatus.GRANTED:
                            response = "ALWAYS";
                            break;
                        case diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                            response = "ONCE";
                            break;
                        case diagnostic.locationMode.HIGH_ACCURACY:
                        case diagnostic.locationMode.BATTERY_SAVING:
                        case diagnostic.locationMode.DEVICE_ONLY:
                        case diagnostic.locationMode.LOCATION_OFF:
                            response = "NO";
                            break;
                        default:
                            response = "NEVER";
                            break;
                        };
                        if (response !== "NO") {
                            mService.api.permission.savePermissionStatus("location", response, function () {
                                try {
                                    mService.settings.permission.updateStatus();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("save_permission_status_error", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        checkAndUpdateLocationStatus: function (success) {
            try {
                if (mService.app.platform == 'Android') {
                    mService.api.permission.getAuthorizationStatus(function (status) {
                        try {
                            mService.api.permission.savePermissionStatus("location", status, function () {
                                try {
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("save_permission_status_error", "system_messages");
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    mService.api.location.getAuthorizationStatus(function (status) {
                        try {
                            mService.api.permission.savePermissionStatus("location", status, function () {
                                try {
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("save_permission_status_error", "system_messages");
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            success();
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
    notification: {
        checkAndUpdateStatus: function (success) {
            try {
                mService.api.notification.getAuthorizationStatus(function (status) {
                    try {
                        mService.api.notification.checkAndUpdateToken(status);
                        mService.api.permission.savePermissionStatus("notification", status, function () {
                            try {
                                mService.settings.permission.updateStatus();
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("save_permission_status_error", "system_messages");
                                mService.settings.permission.updateStatus();
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        checkAndUpdateToken: function (status) {
            try {
                if (status === "PROVISIONAL" || status === "GRANTED" || status === "EPHEMERAL") {
                    mService.api.permission.readPermissionSettingsFile(function (data) {
                        try {
                            if (data !== undefined && data !== "") {
                                if (typeof(data) === "string") {
                                    data = JSON.parse(data);
                                };
                                if (data.notification !== undefined && (data.notification === "NO" || data.notification === "FAIL")) {
                                    setTimeout(function () {
                                        try {
                                            mService.fcm.getToken(function () {
                                                try {
                                                    mService.api.permission.savePermissionStatus("notification", "YES", function () {
                                                        try {
                                                            return true;
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.app.showToast("save_permission_status_error", "system_messages");
                                                            return true;
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function (error) {
                                                try {
                                                    mService.api.permission.savePermissionStatus("notification", "FAIL", function () {
                                                        try {
                                                            return true;
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.app.showToast("save_permission_status_error", "system_messages");
                                                            return true;
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
                                    }, 1000);
                                }
                            };
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getAuthorizationStatus: function (success, failure) {
            var response,
            diagnostic;
            try {
                if (mService.app.platform == 'Android') {
                    cordova.plugins.diagnostic.isRemoteNotificationsEnabled(function (enabled) {
                        try {
                            if (enabled) {
                                response = "GRANTED";
                            } else {
                                response = "DENIED_ALWAYS";
                            };
                            success(response);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (error) {
                        try {
                            console.error("The following error occurred: " + error);
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    diagnostic = cordova.plugins.diagnostic;
                    diagnostic.getRemoteNotificationsAuthorizationStatus(function (status) {
                        try {
                            switch (status) {
                            case diagnostic.permissionStatus.NOT_REQUESTED:
                                response = "NOT_REQUESTED";
                                break;
                            case diagnostic.permissionStatus.DENIED_ALWAYS:
                                response = "DENIED_ALWAYS";
                                break;
                            case diagnostic.permissionStatus.GRANTED:
                                response = "GRANTED";
                                break;
                            case diagnostic.permissionStatus.PROVISIONAL:
                                response = "PROVISIONAL";
                                break;
                            case diagnostic.permissionStatus.EPHEMERAL:
                                response = "EPHEMERAL";
                                break;
                            };
                            success(response);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (error) {
                        try {
                            console.error("getRemoteNotificationsAuthorizationStatus: error occurred: " + error);
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        requestAuthorization: function (success, failure) {
            var diagnostic;
            try {
                if (mService.app.platform == 'Android') {
                    mService.api.device.getOSVersion(function (osVersion) {
                        try {
                            if (osVersion !== "" && parseInt(osVersion) >= 13) {
                                window.minterface("GetPermissions", [{
                                            "permissions": "android.permission.POST_NOTIFICATIONS"
                                        }
                                    ], function () {
                                    try {
                                        success("GRANTED");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function (errorMsg) {
                                    try {
                                        mService.exception.handle(errorMsg);
                                        failure(errorMsg);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                mService.app.showToast("notification_permission_lower_version_error", "pre_signup_messages");
                                success("settings");
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    diagnostic = cordova.plugins.diagnostic;
                    diagnostic.requestRemoteNotificationsAuthorization({
                        successCallback: function () {
                            try {
                                success("GRANTED");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        errorCallback: function (err) {
                            try {
                                console.error("Error requesting remote notifications authorization: " + err);
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        types: [cordova.plugins.diagnostic.remoteNotificationType.ALERT, cordova.plugins.diagnostic.remoteNotificationType.SOUND, cordova.plugins.diagnostic.remoteNotificationType.BADGE],
                        omitRegistration: false
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            };
        }
    },
    camera: {
        checkAndUpdateStatus: function (success) {
            try {
                mService.api.camera.getAuthorizationStatus(function (status) {
                    try {
                        mService.api.permission.savePermissionStatus("camera", status, function () {
                            try {
                                mService.settings.permission.updateStatus();
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("save_permission_status_error", "system_messages");
                                mService.settings.permission.updateStatus();
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getAuthorizationStatus: function (success, failure) {
            var response,
            diagnostic;
            try {
                diagnostic = cordova.plugins.diagnostic;
                diagnostic.getCameraAuthorizationStatus({
                    successCallback: function (status) {
                        try {
                            switch (status) {
                            case diagnostic.permissionStatus.NOT_REQUESTED:
                                response = "NOT_REQUESTED";
                                break;
                            case diagnostic.permissionStatus.DENIED_ONCE:
                                response = "DENIED_ONCE";
                                break;
                            case diagnostic.permissionStatus.DENIED_ALWAYS:
                                response = "DENIED_ALWAYS";
                                break;
                            case diagnostic.permissionStatus.GRANTED:
                                response = "GRANTED";
                                break;
                            };
                            success(response);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    errorCallback: function (error) {
                        try {
                            console.error("The following error occurred: " + error);
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    externalStorage: false
                });
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        requestAuthorization: function (success, failure) {
            var diagnostic;
            try {
                diagnostic = cordova.plugins.diagnostic;
                diagnostic.requestCameraAuthorization({
                    successCallback: function (status) {
                        try {
                            if (status == cordova.plugins.diagnostic.permissionStatus.GRANTED) {
                                response = "GRANTED";
                            } else {
                                response = "DENIED_ALWAYS";
                            };
                            success(response);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    errorCallback: function (error) {
                        try {
                            console.error(error);
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    externalStorage: false
                });
            } catch (exception) {
                mService.exception.handle(exception);
            };
        }
    },
    storage: {
        getAuthorizationStatus: function (success, failure) {
            var response,
            diagnostic;
            try {
                diagnostic = cordova.plugins.diagnostic;
                diagnostic.getExternalStorageAuthorizationStatus(function (status) {
                    try {
                        if (status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
                            response = "GRANTED";
                        } else {
                            response = "DENIED_ALWAYS";
                        };
                        success(response);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (error) {
                    try {
                        console.error("The following error occurred: " + error);
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        requestAuthorization: function (success, failure) {
            var diagnostic;
            try {
                diagnostic = cordova.plugins.diagnostic;
                diagnostic.requestExternalStorageAuthorization(function (status) {
                    try {
                        if (status == diagnostic.permissionStatus.GRANTED) {
                            response = "GRANTED";
                        } else if (status == diagnostic.permissionStatus.DENIED_ONCE) {
                            response = "DENIED_ONCE";
                        } else {
                            response = "DENIED_ALWAYS";
                        };
                        success(response);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (error) {
                    try {
                        console.error(error);
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            };
        }
    },
    permission: {
        checkStatus: function (success) {
            try {
                mService.nfs.readFile("app_controller.json", function (appController) {
                    try {
                        if (appController !== undefined && appController !== "" && typeof(appController) === "string") {
                            appController = JSON.parse(appController);
                            success(appController.app_permission_settings);
                        } else {
                            success("");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        success("");
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        compareLocalAndSettingsStatus: function (success) {
            try {
                mService.api.permission.checkStatus(function (data) {
                    try {
                        if (data !== "") {
                            if (data.location !== undefined) {
                                if (mService.app.platform == 'Android') {
                                    mService.api.permission.getAuthorizationStatus(function (status) {
                                        try {
                                            if (status === "GRANTED_WHEN_IN_USE" || status === "GRANTED") {
                                                status = "ALWAYS";
                                            } else if (status === "NOT_REQUESTED" || status === "DENIED_ALWAYS") {
                                                status = "NEVER";
                                            } else if (status === "DENIED_ONCE") {
                                                status = "NEVER";
                                            };
                                            if (data.location === status) {
                                                success();
                                            } else {
                                                mService.api.permission.savePermissionStatus("location", status, function () {
                                                    try {
                                                        success();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        success();
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
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.api.location.getAuthorizationStatus(function (status) {
                                        try {
                                            if (status === "GRANTED_WHEN_IN_USE" || status === "GRANTED") {
                                                status = "ALWAYS";
                                            };
                                            if (data.location === status) {
                                                success();
                                            } else {
                                                mService.api.permission.savePermissionStatus("location", status, function () {
                                                    try {
                                                        success();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        success();
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
                                            failure();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                }
                            } else if (data.notification !== undefined) {
                                mService.api.notification.getAuthorizationStatus(function (status) {
                                    try {
                                        if (status === "PROVISIONAL" || status === "GRANTED" || status === "EPHEMERAL") {
                                            status = "YES";
                                        } else if (status === "NOT_REQUESTED" || status === "DENIED_ALWAYS") {
                                            status = "NO";
                                        };
                                        if (data.notification === status) {
                                            success();
                                        } else {
                                            mService.api.permission.savePermissionStatus("notification", status, function () {
                                                try {
                                                    success();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    success();
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
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else if (data.camera !== undefined) {
                                mService.api.camera.getAuthorizationStatus(function (status) {
                                    try {
                                        if (status === "GRANTED") {
                                            status = "YES";
                                        } else if (status === "NOT_REQUESTED" || status === "DENIED_ALWAYS") {
                                            status = "NO";
                                        };
                                        if (data.camera === status) {
                                            success();
                                        } else {
                                            mService.api.permission.savePermissionStatus("camera", status, function () {
                                                try {
                                                    success();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    success();
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
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                success();
                            }
                        } else {
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
        requestAuthorization: function (permissionName, success, failure) {
            var response,
            diagnostic,
            mode;
            try {
                diagnostic = cordova.plugins.diagnostic;
                mode = (permissionName === "ACCESS_COARSE_LOCATION" || permissionName === "iOS") ? (diagnostic.locationAuthorizationMode.WHEN_IN_USE) : (diagnostic.locationAuthorizationMode.ALWAYS);
                diagnostic.requestLocationAuthorization(function (status) {
                    try {
                        switch (status) {
                        case diagnostic.permissionStatus.NOT_REQUESTED:
                            response = "NOT_REQUESTED";
                            break;
                        case diagnostic.permissionStatus.DENIED_ONCE:
                            response = "DENIED_ONCE";
                            break;
                        case diagnostic.permissionStatus.DENIED_ALWAYS:
                            response = "DENIED_ALWAYS";
                            break;
                        case diagnostic.permissionStatus.GRANTED:
                            response = "GRANTED";
                            break;
                        case diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                            response = "GRANTED_WHEN_IN_USE";
                            break;
                        };
                        success(response);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (error) {
                    try {
                        console.error(error);
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, mode);
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        getAuthorizationStatus: function (success, failure) {
            var response,
            diagnostic;
            try {
                diagnostic = cordova.plugins.diagnostic;
                diagnostic.getPermissionAuthorizationStatus(function (status) {
                    try {
                        switch (status) {
                        case diagnostic.permissionStatus.NOT_REQUESTED:
                            response = "NOT_REQUESTED";
                            break;
                        case diagnostic.permissionStatus.GRANTED:
                            response = "GRANTED";
                            break;
                        case diagnostic.permissionStatus.DENIED:
                            response = "DENIED";
                            break;
                        case diagnostic.permissionStatus.DENIED_ONCE:
                            response = "DENIED_ONCE";
                            break;
                        case diagnostic.permissionStatus.DENIED_ALWAYS:
                            response = "DENIED_ALWAYS";
                            break;
                        };
                        success(response);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (error) {
                    try {
                        console.error(error);
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, diagnostic.permission.ACCESS_COARSE_LOCATION);
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        openAppSettings: function (success, failure) {
            try {
                cordova.plugins.diagnostic.switchToSettings(function () {
                    try {
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (error) {
                    try {
                        console.error("The following error occurred: " + error);
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        savePermissionStatus: function (permissionName, status, success, failure) {
            var permissionSetting;
            try {
                permissionSetting = {};
                mService.app.locationPermissionStatus = status;
                if (permissionName === "location") {
                    if (status === "GRANTED_WHEN_IN_USE" || status === "GRANTED") {
                        status = "ALWAYS";
                    } else if (status === "NOT_REQUESTED" || status === "DENIED_ALWAYS") {
                        status = "NEVER";
                    } else if (status === "DENIED_ONCE") {
                        status = "NEVER";
                    }
                } else if (permissionName === "notification") {
                    if (status === "PROVISIONAL" || status === "GRANTED" || status === "EPHEMERAL") {
                        status = "YES";
                    } else if (status === "NOT_REQUESTED" || status === "DENIED_ALWAYS") {
                        status = "NO";
                    }
                } else if (permissionName === "camera" || permissionName === "storage") {
                    if (status === "GRANTED_WHEN_IN_USE" || status === "GRANTED") {
                        status = "YES";
                    } else if (status === "NOT_REQUESTED" || status === "DENIED_ALWAYS" || status === "DENIED_ONCE") {
                        status = "NO";
                    }
                };
                permissionSetting[permissionName] = status;
                mService.api.permission.readPermissionSettingsFile(function (data) {
                    try {
                        if (data !== undefined && data !== "") {
                            if (typeof(data) === "string") {
                                data = JSON.parse(data);
                            };
                            $.extend(true, data, permissionSetting);
                        } else {
                            data = permissionSetting;
                        };
                        mService.nfs.readFile("app_controller.json", function (appController) {
                            try {
                                appController = JSON.parse(appController);
                                appController.app_permission_settings = data;
                                mService.nfs.createFile("app_controller.json", JSON.stringify(appController), function () {
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
                            var appController;
                            try {
                                appController = {
                                    app_permission_settings: data
                                };
                                mService.nfs.createFile("app_controller.json", JSON.stringify(appController), function () {
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
        },
        readPermissionSettingsFile: function (success) {
            try {
                mService.nfs.readFile("app_controller.json", function (appController) {
                    try {
                        if (appController !== undefined && appController !== "" && typeof(appController) === "string") {
                            appController = JSON.parse(appController);
                            success(JSON.stringify(appController.app_permission_settings));
                        } else {
                            success("");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        success("");
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        sendPermissionStatus: function (status) {
            try {
                if (window.navigator.onLine) {
                    if (mService.app.channel === "web") {
                        mService.api.permission.sendPermissionStatusToServer(status, function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.nfs.readFile("app_controller.json", function (appController) {
                            var permissiondata;
                            try {
                                if (appController !== undefined && appController !== "" && typeof(appController) === "string") {
                                    appController = JSON.parse(appController);
                                    permissiondata = JSON.stringify(appController.app_permission_settings);
                                } else {
                                    permissiondata = "";
                                };
                                mService.api.permission.sendPermissionStatusToServer(permissiondata, function () {
                                    try {
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                console.error("sendPermissionStatus error occurred");
                                return true;
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
        sendPermissionStatusToServer: function (data, success) {
            try {
                $.ajax({
                    url: mService.app.clientURL + "/common/components/msvPermissionStore/StorePermission.aspx",
                    async: true,
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        "clientID": mService.app.getClientId(),
                        "countryCode": mService.app.getCountryCode(),
                        "userID": mService.app.getUserId(),
                        "appID": mService.app.id,
                        "channelID": mService.app.channel,
                        "permissiondata": data
                    }),
                    success: function (response, status) {
                        try {
                            if (status === "success") {
                                success();
                            } else {
                                console.error("sendPermissionStatus error: " + status + " : " + response);
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function () {
                        try {
                            console.error("sendPermissionStatus error occurred");
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    device: {
        getOSVersion: function (success) {
            try {
                if (mService.app.platform == 'Android') {
                    cordova.plugins.diagnostic.getDeviceOSVersion(function (details) {
                        try {
                            success(details);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    success("")
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    }
}
