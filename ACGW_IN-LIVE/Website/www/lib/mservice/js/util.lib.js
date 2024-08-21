mService.util = {
    enableLocation: function (success, failure) {
        try {
            window.minterface("EnableGPSService", [], function (message) {
                try {
                    success();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    mService.app.showToast("location_not_enabled", "pre_signup_messages");
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    closeFilterDrawer: function () {
        try {
            $("#home_functional_drawer_filter").data("kendoMobileDrawer").hide();
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    date: {
        getParseDate: function (date, hour, minutes, seconds, timezoneInd) {
            var splitDate,
            returnDate;
            try {
                if (date !== "" && date !== undefined) {
                    hour = (hour === "" || hour === undefined) ? 00 : parseInt(hour);
                    minutes = (minutes === "" || minutes === undefined) ? 00 : parseInt(minutes);
                    seconds = (seconds === "" || seconds === undefined) ? 00 : parseInt(seconds);
                    splitDate = date.split("-");
                    returnDate = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]), hour, minutes, seconds)
                } else {
                    returnDate = "";
                };
                return returnDate;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getDateTimeString: function (dateObject, format) {
            try {
                return kendo.toString(dateObject, format);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getNewDate: function () {
            var currentDate,
            utcDate,
            offsetHour,
            offsetMinute;
            try {
                currentDate = new Date();
                if (mService.app.getProfileId() === "U") {
                    offsetHour = mService.user.profile.login.offsetHour;
                    offsetMinute = mService.user.profile.login.offsetMinute;
                } else {
                    offsetHour = mService.visitor.profile.login.offsetHour;
                    offsetMinute = mService.visitor.profile.login.offsetMinute;
                };
                if (offsetHour !== "") {
                    utcDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), currentDate.getUTCMilliseconds());
                    utcDate.setTime(utcDate.getTime() + (((offsetHour * 60) + offsetMinute) * 60 * 1000));
                    return utcDate;
                } else {
                    return currentDate;
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getRelativeDate: function (dateVal, format) {
            var date,
            currentDate,
            yesterday,
            formattedDate;
            try {
                if (dateVal !== "" && dateVal !== undefined) {
                    currentDate = mService.util.date.getNewDate();
                    dateVal = new Date(dateVal);
                    yesterday = new Date(currentDate);
                    yesterday.setDate(currentDate.getDate() - 1);
                    if (dateVal.toDateString() === currentDate.toDateString()) {
                        formattedDate = "Today";
                    } else if (dateVal.toDateString() === yesterday.toDateString()) {
                        formattedDate = "Yesterday";
                    } else {
                        formattedDate = mService.util.date.getDateTimeString(dateVal, format)
                    };
                } else {
                    formattedDate = "";
                };
                return formattedDate;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    time: {
        formatTime: function (dateVal, includeAMPM) {
            var date,
            hours,
            minutes,
            ampm,
            formattedTime;
            try {
                if (dateVal !== "" && dateVal !== undefined) {
                    date = new Date(dateVal);
                    hours = date.getHours();
                    minutes = date.getMinutes();
                    ampm = '';
                    if (includeAMPM) {
                        ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12;
                        hours = hours ? hours : 12;
                    };
                    formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + (includeAMPM ? ' ' + ampm : '');
                } else {
                    formattedTime = "";
                };
                return formattedTime;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    showHideFeature: function (feature, show) {
        var punchEle;
        try {
            punchEle = $('[data-ms-widget-type= "mLink"][data-ms-link-group="in_app_feature"][data-ms-link-role="' + feature + '"]');
            if (show) {
                $(punchEle).css("display", "flex");
            } else {
                $(punchEle).css("display", "none");
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    checkPunchInOut: function () {
        try {
            mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "punch_in_profile.json", function (data) {
                try {
                    data = JSON.parse(data);
                    mService.util.getNewDate(function (date) {
                        try {
                            if (data.work_date === mService.util.getDateTimeString(date, "yyyy-MM-dd")) {
                                if (data.punchin_hour === "0") {
                                    $("#punch_in_out_popup_title").attr("data-ms-lbl-id", "punch_in_title");
                                    mService.util.showHideFeature("punch_in", true);
                                    mService.util.showHideFeature("punch_out", false);
                                } else if (data.punchout_hour === "0") {
                                    $("#punch_in_out_popup_title").attr("data-ms-lbl-id", "punch_out_title");
                                    mService.util.showHideFeature("punch_out", true);
                                    mService.util.showHideFeature("punch_in", false);
                                } else {
                                    $("#punch_in_out_popup_title").attr("data-ms-lbl-id", "Punch_details");
                                    mService.util.showHideFeature("punch_in", true);
                                    mService.util.showHideFeature("punch_out", false);
                                }
                            } else {
                                mService.util.showHideFeature("punch_in", true);
                                mService.util.showHideFeature("punch_out", false);
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {});
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function () {
                try {
                    mService.util.showHideFeature("punch_in", true);
                    mService.util.showHideFeature("punch_out", false);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    checkLocationService: function (success, failure) {
        try {
            window.minterface("CheckLocation", [], function (status) {
                try {
                    success(status);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.app.showToast("checkLocation_error", "system_messages");
                    mService.exception.handle(errorMsg);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    checkUserGroup: function (success, failure) {
        var hasUserGroup,
        userGroupList;
        try {
            hasUserGroup = false;
            userGroupList = mService.app.appSettings.getElementsByTagName("allowed_user_groups")[0];
            if (userGroupList !== undefined) {
                for (var index = 0; index < userGroupList.childNodes.length; index++) {
                    if (JSON.parse(sessionStorage.getItem("login_profile")).user_group_id === userGroupList.getElementsByTagName("user_group_id")[index].childNodes[0].textContent || userGroupList.getElementsByTagName("user_group_id")[index].childNodes[0].textContent === "ALL") {
                        hasUserGroup = true;
                        break;
                    }
                };
                if (hasUserGroup) {
                    success();
                } else {
                    failure();
                }
            } else {
                failure();
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getActiveCall: function (dataSource, scrID, success) {
        var lastAccessInfo,
        activeCall,
        controllerObj;
        try {
            controllerObj = mService.config.controller.getControllerObj(scrID);
            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                employeeAccessInfoKey = scrID + "_" + "employee_last_access_info";
            } else {
                employeeAccessInfoKey = "EMPLOYEE_LAST_ACCESS_INFO";
            };
            lastAccessInfo = mService.dSource.cache[employeeAccessInfoKey].data()[0];
            if (lastAccessInfo !== undefined) {
                activeCall = $.grep(dataSource.data(), function (e, i) {
                    try {
                        return ((e.request_ref_no === undefined) ? (e.call_no) : (e.request_ref_no)) === lastAccessInfo.txn_ref_no;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                })[0];
                if (activeCall !== undefined && lastAccessInfo.allow_newtxn_ind === "false") {
                    success(activeCall);
                } else {
                    success("");
                }
            } else {
                success("");
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getActualValue: function (valueString, uid) {
        var returnValue;
        try {
            returnValue = "";
            uid = ((uid === undefined) ? ("") : (uid));
            if (valueString != undefined && valueString != "") {
                if (valueString.indexOf("$") == 0) {
                    try {
                        returnValue = eval(valueString.substring(1));
                    } catch (exception) {
                        returnValue = "";
                    }
                } else if (valueString.indexOf("#") == 0) {
                    if (($(valueString.trim() + uid).attr("data-ms-widget-msloop") !== undefined && $(valueString.trim() + uid).attr("data-ms-widget-msloop") !== "")) {
                        valueString = valueString.trim() + uid;
                    };
                    returnValue = $(valueString).getVal();
                } else if (valueString == "NEWDATE") {
                    returnValue = mService.util.getCurrentDate();
                } else if (valueString.charAt(0) == "'" || valueString.charAt(0) == '"') {
                    returnValue = valueString.substring(1, valueString.length - 1);
                } else {
                    try {
                        returnValue = eval(valueString);
                    } catch (exception) {
                        returnValue = "";
                    }
                }
            };
            return returnValue;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getAddress: function (latitude, longitude, success, failure) {
        try {
            if (window.navigator.onLine) {
                mService.api.keys.get("mobile_address_store", function (key) {
                    try {
                        var urlAddress = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false&key=" + key;
                        $.get(urlAddress, function (data, status) {
                            try {
                                if (data.status === "OK") {
                                    success(data.results[0].formatted_address);
                                } else {
                                    failure();
                                }
                            } catch (exception) {
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
                failure();
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getAllowedExtension: function (fileExtensionKey, extension) {
        try {
            return $.grep(mService.dSource.cache[fileExtensionKey].data(), function (element, index) {
                return element.code === extension;
            })[0];
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getAllowedFileSize: function (fileSizeKey, fileType) {
        try {
            return $.grep(mService.dSource.cache[fileSizeKey].data(), function (element, index) {
                return element.parent_code.toUpperCase() === fileType.toUpperCase();
            })[0];
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getCalculatedValue: function (value, uid) {
        var valueToCalculate = "",
        valueToTransform = "",
        lastEntry = "",
        transformedValue = "",
        returnValue,
        index;
        try {
            returnValue = 0;
            for (index = 0; index < value.length; index++) {
                if (value[index] === "(") {
                    lastEntry = value[index];
                    valueToCalculate += value[index];
                } else if (value[index] === ")") {
                    lastEntry = value[index];
                    if (valueToTransform !== "") {
                        if (valueToTransform.indexOf("#") !== -1) {
                            if ($(valueToTransform).attr("data-ms-widget-msloop") === undefined || $(valueToTransform).attr("data-ms-widget-msloop") === "") {
                                transformedValue = mService.util.getTransformedValue(valueToTransform);
                            } else {
                                transformedValue = mService.util.getTransformedValue(valueToTransform + uid);
                            };
                        } else {
                            transformedValue = mService.util.getTransformedValue(valueToTransform);
                        };
                        transformedValue = (typeof(transformedValue) === 'string') ? (parseFloat(transformedValue)) : (transformedValue);
                    };
                    valueToCalculate += transformedValue;
                    transformedValue = "";
                    valueToTransform = "";
                    valueToCalculate += value[index];
                } else {
                    if (lastEntry === "(") {
                        valueToTransform += value[index];
                    } else {
                        valueToCalculate += value[index];
                    }
                }
            };
            returnValue = eval(valueToCalculate);
            return (returnValue === NaN) ? (0) : (returnValue);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getCallWflowOrder: function (iObj) {
        var info,
        wFlow = [];
        try {
            info = $.grep(mService.dSource.cachedData.data(), function (e, i) {
                try {
                    return e.infoType === "CALL_WF_EVENTVERB_LIST";
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            })[0];
            if (info !== undefined) {
                wFlow = $.grep(info.data, function (e, i) {
                    try {
                        return ((e.req_catg === iObj.category && e.req_type === iObj.type && e.from_wf_stage === iObj.stage && e.from_wf_status === iObj.status) || (e.req_catg === iObj.category && e.req_type === "ALL" && e.from_wf_stage === iObj.stage && e.from_wf_status === iObj.status) || (e.req_catg === "ALL" && e.req_type === "ALL" && e.from_wf_stage === iObj.stage && e.from_wf_status === iObj.status));
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            };
            return wFlow;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getCompFeatureAccessOrder: function (iObj) {
        var info,
        fOrder = [];
        try {
            info = $.grep(mService.dSource.cachedData.data(), function (e, i) {
                try {
                    return e.infoType === "COMPANY_FEATURE_ACCESS_ORDER_LIST";
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            })[0];
            if (info !== undefined) {
                fOrder = $.grep(info.data, function (e, i) {
                    try {
                        return ((e.txn_type === "CALL" && e.req_catg === iObj.category && e.req_type === iObj.type && e.req_stage === iObj.stage && e.req_status === iObj.status) || (e.txn_type === "CALL" && e.req_catg === iObj.category && e.req_type === iObj.type && e.req_stage === "0" && e.req_status === "ALL") || (e.txn_type === "CALL" && e.req_catg === iObj.category && e.req_type === "ALL" && e.req_stage === iObj.stage && e.req_status === iObj.status) || (e.txn_type === "CALL" && e.req_catg === iObj.category && e.req_type === "ALL" && e.req_stage === "0" && e.req_status === "ALL") || (e.txn_type === "CALL" && e.req_catg === "ALL" && e.req_type === "ALL" && e.req_stage === iObj.stage && e.req_status === iObj.status) || (e.txn_type === "CALL" && e.req_catg === "ALL" && e.req_type === "ALL" && e.req_stage === "0" && e.req_status === "ALL"));
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            };
            return fOrder;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getConcatenatedValue: function (concatenationObject) {
        var actualValueList,
        valueListCounter;
        actualValueList = [];
        try {
            for (valueListCounter = 0; valueListCounter < concatenationObject.valueList.length; valueListCounter++) {
                actualValueList.push(mService.util.getActualValue(concatenationObject.valueList[valueListCounter].trim()));
            };
            return actualValueList.join(concatenationObject.delimiter);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getCurrentDate: function () {
        var currentDate,
        utcDate,
        offsetHour,
        offsetMinute;
        currentDate = new Date();
        try {
            if (mService.app.getProfileId() === "U") {
                offsetHour = mService.user.profile.login.offsetHour;
                offsetMinute = mService.user.profile.login.offsetMinute;
            } else {
                offsetHour = mService.visitor.profile.login.offsetHour;
                offsetMinute = mService.visitor.profile.login.offsetMinute;
            };
            if (offsetHour !== "") {
                utcDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), currentDate.getUTCMilliseconds());
                utcDate.setTime(utcDate.getTime() + (((offsetHour * 60) + offsetMinute) * 60 * 1000));
                return utcDate;
            } else {
                return currentDate;
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getDateTimeString: function (dateObject, format) {
        try {
            return kendo.toString(dateObject, format);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getEmployeeLastAccessInfo: function () {
        var info;
        try {
            info = $.grep(mService.dSource.cachedData.data(), function (e, i) {
                try {
                    return e.infoType == "EMPLOYEE_LASTACCESS_INFO_LIST" && e.field1 == mService.app.getUserId();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            })[0];
            if (info !== undefined) {
                return info.data[0];
            } else {
                return info;
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getFileType: function (fileExtensionKey, extension) {
        var extensionData;
        try {
            extensionData = $.grep(mService.dSource.cache[fileExtensionKey].data(), function (element, index) {
                return element.code === extension;
            })[0];
            return (extensionData === undefined) ? ("") : (extensionData.parent_code);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getLastAccessedFeature: function () {
        var lastAccessInfo;
        try {
            lastAccessInfo = mService.util.getEmployeeLastAccessInfo();
            return (lastAccessInfo == undefined) ? "" : lastAccessInfo.feature_id;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getNewDate: function (success, failure) {
        var currentDate,
        utcDate,
        offsetHour,
        offsetMinute;
        try {
            currentDate = new Date();
            if (mService.app.getProfileId() === "U") {
                offsetHour = mService.user.profile.login.offsetHour;
                offsetMinute = mService.user.profile.login.offsetMinute;
            } else {
                offsetHour = mService.visitor.profile.login.offsetHour;
                offsetMinute = mService.visitor.profile.login.offsetMinute;
            };
            if (offsetHour !== "") {
                utcDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), currentDate.getUTCMilliseconds());
                utcDate.setTime(utcDate.getTime() + (((offsetHour * 60) + offsetMinute) * 60 * 1000));
                success(utcDate);
            } else {
                success(currentDate);
            }
        } catch (exception) {
            mService.exception.handle(exception);
            failure();
        }
    },
    getSumLoopValue: function (widgetID, uid) {
        var returnValue,
        scrID,
        parentID,
        msLoopBlocks,
        blockIndex,
        blockID;
        try {
            returnValue = 0;
            scrID = mService.app.getScreenId();
            parentID = $(widgetID).attr("data-ms-widget-msloop");
            if (parentID === undefined) {
                parentID = $(widgetID + uid).attr("data-ms-widget-msloop");
            };
            msLoopBlocks = $("#" + parentID + "_content [data-ms-widget-msloopblock]");
            for (blockIndex = 0; blockIndex < msLoopBlocks.length; blockIndex++) {
                blockID = $(msLoopBlocks[blockIndex]).attr("id");
                returnValue += parseFloat(mService.widgets.init.util.msLoop.getSingleWidgetValues(blockID, widgetID.replace("#", ""), scrID));
            };
            return (returnValue === NaN) ? (0) : (returnValue);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getTransformedJSon: function (inputValue) {
        try {
            if ($.isArray(inputValue)) {
                inputValue.forEach(function (arrayItem) {
                    try {
                        Object.keys(arrayItem).forEach(function (key) {
                            try {
                                arrayItem[key] = mService.util.getTransformedValue(arrayItem[key]);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } else {
                Object.keys(inputValue).forEach(function (key) {
                    try {
                        inputValue[key] = mService.util.getTransformedValue(inputValue[key]);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            };
            return inputValue;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getTransformedValue: function (value, fromSetValue, uid) {
        var transformedValue,
        index,
        xmlDoc,
        nodeIndex,
        jsonObj,
        key,
        valueSplit;
        try {
            transformedValue = "";
            uid = ((uid === undefined) ? ("") : (uid));
            fromSetValue = ((fromSetValue === undefined) ? (false) : (fromSetValue));
            if (fromSetValue === true && value.indexOf("+") !== -1) {
                if (value.charAt(0) === "<" && value.charAt(value.length - 1) === ">") {
                    xmlDoc = mService.util.getXmlDocument(value);
                    for (nodeIndex = 0; nodeIndex < xmlDoc.childNodes[0].childElementCount; nodeIndex++) {
                        value = xmlDoc.childNodes[0].childNodes[nodeIndex].childNodes[0].nodeValue;
                        valueSplit = value.split("+");
                        value = "";
                        for (index = 0; index < valueSplit.length; index++) {
                            if (valueSplit[index].trim().indexOf("$") === 0 && valueSplit[index].trim().length !== 1) {
                                try {
                                    value += eval(valueSplit[index].trim().substring(1));
                                } catch (e) {
                                    value += "";
                                }
                            } else if (valueSplit[index].trim().indexOf("#") === 0 && valueSplit[index].trim().length !== 1) {
                                if (valueSplit[index].trim().indexOf("#") === 0 && valueSplit[index].trim().length !== 1) {
                                    if (($(valueSplit[index].trim() + uid).attr("data-ms-widget-msloop") !== undefined && $(valueSplit[index].trim() + uid).attr("data-ms-widget-msloop") !== "")) {
                                        valueSplit[index] = valueSplit[index].trim() + uid;
                                    }
                                };
                                value += $(valueSplit[index].trim()).getVal();
                            } else {
                                value += valueSplit[index].trim();
                            }
                        };
                        xmlDoc.childNodes[0].childNodes[nodeIndex].childNodes[0].nodeValue = value;
                    };
                    value = (new XMLSerializer()).serializeToString(xmlDoc);
                } else if (value.charAt(0) === "{" && value.charAt(value.length - 1) === "}") {
                    jsonObj = JSON.parse(value);
                    for (key in jsonObj) {
                        value = jsonObj[key];
                        valueSplit = value.split("+");
                        value = "";
                        for (index = 0; index < valueSplit.length; index++) {
                            if (valueSplit[index].trim().indexOf("$") === 0 && valueSplit[index].trim().length !== 1) {
                                try {
                                    value += eval(valueSplit[index].trim().substring(1));
                                } catch (e) {
                                    value += "";
                                }
                            } else if (valueSplit[index].trim().indexOf("#") === 0 && valueSplit[index].trim().length !== 1) {
                                if (valueSplit[index].trim().indexOf("#") === 0 && valueSplit[index].trim().length !== 1) {
                                    if (($(valueSplit[index].trim() + uid).attr("data-ms-widget-msloop") !== undefined && $(valueSplit[index].trim() + uid).attr("data-ms-widget-msloop") !== "")) {
                                        valueSplit[index] = valueSplit[index].trim() + uid;
                                    }
                                };
                                value += $(valueSplit[index].trim()).getVal();
                            } else {
                                value += valueSplit[index].trim();
                            }
                        };
                        jsonObj[key] = value;
                    };
                    value = JSON.stringify(jsonObj);
                } else {
                    valueSplit = value.split("+");
                    value = "";
                    for (index = 0; index < valueSplit.length; index++) {
                        if (valueSplit[index].indexOf("$") === 0 && valueSplit[index].length !== 1) {
                            value += eval(valueSplit[index].substring(1));
                        } else if (valueSplit[index].indexOf("#") === 0 && valueSplit[index].length !== 1) {
                            if (valueSplit[index].trim().indexOf("#") === 0 && valueSplit[index].trim().length !== 1) {
                                if (($(valueSplit[index].trim() + uid).attr("data-ms-widget-msloop") !== undefined && $(valueSplit[index].trim() + uid).attr("data-ms-widget-msloop") !== "")) {
                                    valueSplit[index] = valueSplit[index].trim() + uid;
                                }
                            };
                            value += $(valueSplit[index]).getVal();
                        } else {
                            value += valueSplit[index];
                        }
                    }
                };
            };
            if (value !== undefined && value !== "") {
                if (value.charAt(0) === "$") {
                    try {
                        transformedValue = eval(value.substring(1));
                    } catch (e) {
                        transformedValue = "";
                    }
                } else if (value.charAt(0) === "#") {
                    if (value.indexOf("@") !== -1) {
                        if (value.split("@")[1] === "text") {
                            transformedValue = $(value.split("@")[0]).text();
                        } else {
                            transformedValue = $(value.split("@")[0]).attr(value.split("@")[1]);
                        }
                    } else if (value.indexOf(".") !== -1) {
                        if (value.indexOf(".datasource") !== -1) {
                            transformedValue = $(value.split(".")[0]).getDataSource();
                            transformedValue = transformedValue.data();
                        } else {
                            transformedValue = $(value.split(".")[0]).getValObject(value.split(".")[1]);
                        }
                    } else {
                        if (($(value.trim() + uid).attr("data-ms-widget-msloop") !== undefined && $(value.trim() + uid).attr("data-ms-widget-msloop") !== "")) {
                            value = value.trim() + uid;
                        };
                        transformedValue = $(value).getVal();
                    }
                } else if (value === "NEWDATE") {
                    transformedValue = mService.util.getCurrentDate();
                } else if (value.charAt(0) === "'" || value.charAt(0) === '"') {
                    transformedValue = value.substring(1, value.length - 1);
                } else if (value.charAt(0) === "<" && value.charAt(value.length - 1) === ">") {
                    xmlDoc = mService.util.getXmlDocument(value);
                    for (nodeIndex = 0; nodeIndex < xmlDoc.childNodes[0].childElementCount; nodeIndex++) {
                        xmlDoc.childNodes[0].childNodes[nodeIndex].childNodes[0].nodeValue = mService.util.getTransformedValue(xmlDoc.childNodes[0].childNodes[nodeIndex].childNodes[0].nodeValue);
                    };
                    transformedValue = (new XMLSerializer()).serializeToString(xmlDoc);
                } else if (value.charAt(0) === "{" && value.charAt(value.length - 1) === "}") {
                    jsonObj = JSON.parse(value);
                    for (key in jsonObj) {
                        jsonObj[key] = mService.util.getTransformedValue(jsonObj[key]);
                    };
                    transformedValue = JSON.stringify(jsonObj);
                }
            };
            return transformedValue;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getTransportDataSource: function (dataSourceObject) {
        try {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        type: "POST",
                        async: false,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        url: mService.util.getTransportUrl(dataSourceObject.applicationName, dataSourceObject.serviceName, dataSourceObject.outputPath)
                    },
                    parameterMap: function (options, operation) {
                        try {
                            if (dataSourceObject.inputParameter != undefined) {
                                return mService.util.getTransportParameter({
                                    inputparam: dataSourceObject.inputParameter
                                });
                            } else {
                                return mService.util.getTransportParameter();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getTransportParameter: function (inputParameter) {
        var stringInput,
        inputParameterString;
        try {
            stringInput = '{"context": {"sessionId":"' + mService.user.profile.context.session_id + '","userId":"' + mService.user.profile.context.user_id + '","client_id":"' + mService.user.profile.context.client_id + '","locale_id":"' + mService.user.profile.context.locale_id + '","country_code":"' + mService.user.profile.context.country_code + '"';
            if (inputParameter != undefined) {
                inputParameterString = JSON.stringify(inputParameter);
                stringInput += ',' + inputParameterString.substring(1, inputParameterString.length - 1);
            };
            stringInput += '}}';
            return stringInput;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getTransportUrl: function (applicationName, serviceName, path) {
        try {
            return mService.app.clientURL + "\\" + "JSONServiceEndpoint.aspx?appName=" + applicationName + "&serviceName=" + serviceName + "&path=" + path;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getTimeDuration: function (fromTime, toTime) {
        try {
            return (toTime - fromTime) / (1000 * 60);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getValidationMessages: function () {
        try {
            if (mService.config.label.src["validation_messages"] == undefined) {
                $.ajax({
                    url: mService.nfs.root + mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "label" + "/" + "label_" + "validation_messages" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId() + ".json",
                    async: false,
                    cache: false
                }).done(function (data) {
                    try {
                        mService.config.label.src["validation_messages"] = JSON.parse(mService.nfs.data.decrypt(data));
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getXmlDocument: function (xmlString) {
        try {
            xmlString = xmlString.replace(/&/g, "&amp;");
            return $.parseXML(xmlString);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getXmlString: function (value) {
        var escapeObject,
        replacePattern;
        try {
            escapeObject = {
                '&': "&amp;",
                '<': "&lt;",
                '>': "&gt;",
                '\'': "&apos;",
                '\"': "&quot;"
            };
            replacePattern = /<|&|>|'|"/g;
            return value.replace(replacePattern, function (replaceKey) {
                try {
                    return escapeObject[replaceKey];
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    isContainRScreen: function (scrID) {
        try {
            scrID = scrID.replace(".html", "").replace("#", "");
            if (scrID === "calldb" || scrID === "chat" || scrID === "knowledgebase" || scrID === "my_location" || scrID === "my_request" || scrID === "my_user_asset" || scrID === "my_user" || scrID === "view" || scrID === "visitor_profile" || scrID === "system_messages" || scrID === "stock_enquiry" || scrID === "home_tile") {
                return false;
            } else {
                return true;
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    isInAppScreen: function (scrID) {
        try {
            scrID = scrID.replace(".html", "").replace("#", "");
            if (scrID === "my_notification" || scrID === "my_settings" || scrID === "my_accounts" || scrID === "my_permission" || scrID === "my_permissions_consent" || scrID === "my_profile" || scrID === "version_update" || scrID === "welcome" || scrID === "signup" || scrID === "login" || scrID === "change_password" || scrID === "forgot_password" || scrID === "my_language" || scrID === "punch_in_out" || scrID === "security_code_verification") {
                return true;
            } else {
                return false;
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    isBottomSheetOpen: function (orientationchangeInd) {
        var result,
        bottomSheet;
        try {
            result = false;
            bottomSheet = $("body").find(".bottom_sheet.active");
            if (bottomSheet.length > 0) {
                $(bottomSheet).toggleClass("active");
                result = true;
            };
            return result;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    isPreviewPopupOpen: function (orientationchangeInd) {
        var result,
        popupList,
        index;
        try {
            result = false;
            popupList = $("body [data-role='window'],[role='dialog']");
            for (index = 0; index < popupList.length; index++) {
                id = $(popupList[index]).attr("id");
                if ($("#" + id).is(":visible")) {
                    if (orientationchangeInd !== undefined && id.indexOf("signature_popup") !== -1) {
                        if (mService.app.platform == "iOS") {
                            $("#" + id).data("kendoWindow").center();
                        } else {
                            return true;
                        }
                    } else {
                        if (id.indexOf("home_location_permission_popup") === -1) {
                            mService.widgets.init.util.msLoop.pausePlayer("attachment_view_player");
                            $("#" + id).data("kendoWindow").close();
                        }
                    };
                    return true;
                }
            };
            return result;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    loadBaseConfigData: function (scrID, success) {
        try {
            mService.config.label.get(scrID, function () {
                try {
                    mService.config.template.get(scrID, function () {
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
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function () {
                try {
                    mService.config.template.get(scrID, function () {
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
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    loadTemplate: function (pattern, template) {
        var url;
        try {
            if ($("#" + template).length === 0) {
                if (mService.app.channel === "web") {
                    url = "www" + "/" + "lib" + "/" + "mservice" + "/" + "pattern" + "/" + pattern + "/" + "templates" + "/" + "page" + "/web/" + template + ".html";
                } else {
                    url = "../lib/mservice/pattern/" + pattern + "/" + "templates" + "/" + "page" + "/mobile" + "/" + template + ".html";
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
    loadScript: function (path, success, failure) {
        try {
            $.ajax({
                url: path,
                dataType: "script",
                async: true,
                cache: true,
                success: function () {
                    try {
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
    restrictDoubleTap: function (mLink) {
        try {
            $(mLink).attr('ms-data-disabled', true);
            setTimeout(function () {
                try {
                    $(mLink).attr('ms-data-disabled', false);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, 1000);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    updateAppTimeZone: function (success, failure) {
        try {
            if (mService.app.channel === "web") {
                $.ajax({
                    url: "www/configuration/default_value/timezone_index_list.txt",
                    dataType: "text",
                    success: function (data) {
                        var login_profile;
                        try {
                            var returnVal = $.grep(JSON.parse(data), function (e, i) {
                                return parseInt(e.timezoneId) === parseInt(mService.app.getTimezoneId());
                            })[0];
                            if (returnVal !== undefined) {
                                if (mService.app.getProfileId() === "U") {
                                    mService.user.profile.login.offsetHour = parseInt(returnVal.offsetHour);
                                    mService.user.profile.login.offsetMinute = parseInt(returnVal.offsetMinute);
                                } else {
                                    mService.visitor.profile.login.offsetHour = parseInt(returnVal.offsetHour);
                                    mService.visitor.profile.login.offsetMinute = parseInt(returnVal.offsetMinute);
                                };
                                if (sessionStorage.getItem("login") !== undefined && sessionStorage.getItem("login") !== "") {
                                    login_profile = JSON.parse(sessionStorage.getItem("login"));
                                    login_profile.offsetHour = parseInt(returnVal.offsetHour);
                                    login_profile.offsetMinute = parseInt(returnVal.offsetMinute);
                                    sessionStorage.setItem('login', JSON.stringify(login_profile));
                                }
                            };
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (e) {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } else {
                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "configuration_package" + "/" + "default_value" + "/" + "timezone_index_list.txt", function (data) {
                    try {
                        var returnVal = $.grep(JSON.parse(data), function (e, i) {
                            return parseInt(e.timezoneId) === parseInt(mService.app.getTimezoneId());
                        })[0];
                        if (returnVal !== undefined) {
                            if (mService.app.getProfileId() === "U") {
                                mService.user.profile.login.offsetHour = parseInt(returnVal.offsetHour);
                                mService.user.profile.login.offsetMinute = parseInt(returnVal.offsetMinute);
                            } else {
                                mService.visitor.profile.login.offsetHour = parseInt(returnVal.offsetHour);
                                mService.visitor.profile.login.offsetMinute = parseInt(returnVal.offsetMinute);
                            }
                        };
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (data) {
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
    updateMyAccountActiveInd: function (success) {
        try {
            window.minterface("getMyAccountsData", [{
                        "folderPath": mService.app.root + "/" + "my_accounts"
                    }
                ], function (accountsData) {
                try {
                    accountsData = JSON.parse(accountsData);
                    if (accountsData.length > 0) {
                        for (var accountKey in accountsData) {
                            if (accountsData.hasOwnProperty(accountKey)) {
                                if (accountsData[accountKey].client_id !== mService.app.getClientId()) {
                                    accountsData[accountKey].active_ind = false;
                                    mService.nfs.createFile("my_accounts" + "/" + accountsData[accountKey].client_id + "_" + accountsData[accountKey].country_code + ".json", JSON.stringify(accountsData[accountKey]), function () {
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
                                    continue;
                                }
                            }
                        };
                        success();
                    } else {
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    updateMyAccountsFile: function (data, success, failure) {
        try {
            mService.util.updateMyAccountActiveInd(function () {
                try {
                    mService.nfs.readFile("my_accounts" + "/" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json", function (accountData) {
                        try {
                            accountData = JSON.parse(accountData);
                            $.extend(true, accountData, data);
                            mService.nfs.createFile("my_accounts" + "/" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json", JSON.stringify(accountData), function () {
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
                            mService.nfs.createFile("my_accounts" + "/" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json", JSON.stringify(data), function () {
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
                        };
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    updateLocationConfiguration: function (location_configuration, success, failure) {
        try {
            mService.nfs.readFile("app_controller.json", function (appController) {
                try {
                    appController = JSON.parse(appController);
                    appController.location_configuration = location_configuration;
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
                    appController = {};
                    appController.location_configuration = location_configuration;
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
    },
    updatePermissionStatus: function () {
        try {
            setTimeout(function () {
                try {
                    mService.api.location.checkAndUpdateLocationStatus(function () {
                        try {
                            mService.api.notification.checkAndUpdateStatus(function () {
                                try {
                                    mService.api.camera.checkAndUpdateStatus(function () {
                                        try {
                                            mService.settings.permission.updateStatus();
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
            }, 10);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    validateCallAccess: function (iObj) {
        var lastAccessInfo,
        returnObj;
        try {
            returnObj = {
                allowAccess: false,
                newCall: false
            };
            if ((iObj.assigned_to_emp_id == undefined || iObj.assigned_to_emp_id == "") || (iObj.assigned_to_emp_id == mService.app.getUserId() || iObj.assignee_mapped_to_emp_id == mService.app.getUserId())) {
                lastAccessInfo = mService.util.getEmployeeLastAccessInfo();
                if (lastAccessInfo == undefined) {
                    returnObj.allowAccess = true;
                    returnObj.newCall = true;
                } else {
                    if (lastAccessInfo.txn_ref_no == iObj.call_ref_no) {
                        returnObj.allowAccess = true;
                    } else if (lastAccessInfo.allow_newtxn_ind == "true") {
                        returnObj.allowAccess = true;
                        returnObj.newCall = true;
                    }
                }
            };
            return returnObj;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    validateFile: function (fileData, fileSizeKey, fileExtensionKey, success, failure) {
        var allowedFileSize,
        allowedExtension,
        fileType;
        try {
            if (mService.dSource.cache[fileSizeKey] !== undefined && mService.dSource.cache[fileExtensionKey] !== undefined) {
                fileType = mService.util.getFileType(fileExtensionKey, fileData.fileExtension);
                if (fileType !== "") {
                    allowedFileSize = mService.util.getAllowedFileSize(fileSizeKey, fileType);
                    if (allowedFileSize === undefined) {
                        allowedFileSize = mService.util.getAllowedFileSize(fileSizeKey, "All");
                    };
                    if (allowedFileSize !== undefined) {
                        if (parseInt(allowedFileSize.code) * 1048576 === 0 || parseInt(fileData.fileSize) < (parseInt(allowedFileSize.code) * 1048576)) {
                            allowedExtension = mService.util.getAllowedExtension(fileExtensionKey, fileData.fileExtension);
                            if (allowedExtension !== undefined) {
                                fileData.category = allowedExtension.parent_code;
                                fileData.type = allowedExtension.parent_code;
                                success(fileData);
                            } else {
                                mService.app.showToast("file_extensions_error", "system_messages", {
                                    extensions: $.map(mService.dSource.cache[fileExtensionKey].data(), function (e) {
                                        return e.code;
                                    }).join()
                                });
                                failure();
                            }
                        } else {
                            mService.app.showToast("file_size_error", "system_messages", {
                                size: (allowedFileSize.code)
                            });
                            failure();
                        }
                    } else {
                        mService.app.showToast("file_size_not_available_error", "system_messages");
                        failure();
                    }
                } else {
                    mService.app.showToast("file_extensions_error", "system_messages", {
                        extensions: $.map(mService.dSource.cache[fileExtensionKey].data(), function (e) {
                            return e.code;
                        }).join()
                    });
                    failure();
                }
            } else {
                mService.app.showToast("file_size_extension_error", "system_messages");
                failure();
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    validateEmailID: function (emailId) {
        var emailRegex;
        try {
            emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(emailId);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    validateInputFields: function (scrID) {
        try {
            $("#" + scrID + " input").each(function () {
                if ($("#" + $(this).attr("id")).hasClass("k-invalid")) {
                    if ($(this).attr("id") === "signup_mobile_no") {
                        $("#" + $(this).attr("id")).parent().addClass("input_validation_error_box");
                    } else if ($(this).attr("id") === "signup_country_code") {
                        $("#signup").find(".k-dropdown-wrap").removeClass("ms_mobile_signup_screen_country_dropdown").addClass("input_validation_dropdown_error_box");
                    } else if ($(this).attr("id") === "login_country_code") {
                        $("#login").find(".k-dropdown-wrap").removeClass("ms_mobile_login_screen_country_dropdown").addClass("input_validation_dropdown_error_box");
                    } else {
                        $("#" + $(this).attr("id") + "_container").addClass("input_validation_error_box");
                    }
                } else {
                    if ($(this).attr("id") === "signup_mobile_no") {
                        $("#" + $(this).attr("id")).parent().removeClass("input_validation_error_box");
                    } else if ($(this).attr("id") === "signup_country_code") {
                        $("#signup").find(".k-dropdown-wrap").addClass("ms_mobile_signup_screen_country_dropdown").removeClass("input_validation_dropdown_error_box");
                    } else if ($(this).attr("id") === "login_country_code") {
                        $("#login").find(".k-dropdown-wrap").addClass("ms_mobile_login_screen_country_dropdown").removeClass("input_validation_dropdown_error_box");
                    } else {
                        $("#" + $(this).attr("id") + "_container").removeClass("input_validation_error_box");
                    }
                }
            });
            setTimeout(function () {
                try {
                    $("#" + scrID).find(".k-invalid-msg").hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, 5);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    validateTime: function (fromTime, toTime) {
        var returVal;
        try {
            returVal = true;
            fromTime = mService.util.getTransformedValue(fromTime);
            toTime = mService.util.getTransformedValue(toTime);
            if (fromTime != '' && toTime != '') {
                if (fromTime >= toTime) {
                    returVal = false;
                }
            } else {
                returVal = false;
            };
            return returVal;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    validateURL: function (value) {
        try {
            var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
            return urlregex.test(value);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    }
};