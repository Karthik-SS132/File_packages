mService.queue = {
    setData: function (scrID, controllerObj, iObj, success, failure) {
        var dSrc,
        eventVerbKey,
        input;
        try {
            mService.containR.pattern.form.util.getLocationData(controllerObj, function (latitude, longitude) {
                try {
                    mService.containR.pattern.form.util.checkDateTimeSettings(scrID, controllerObj, function () {
                        try {
                            mService.util.getNewDate(function (date) {
                                try {
                                    if (iObj.input !== undefined) {
                                        input = JSON.parse(iObj.input);
                                        if (input.context !== undefined && input.context.inputparam_header !== undefined) {
                                            iObj.input = JSON.parse(iObj.input);
                                            iObj.input.context.inputparam_header.p_inputparam_header_xml = JSON.parse(iObj.input.context.inputparam_header.p_inputparam_header_xml);
                                            iObj.input.context.inputparam_header.p_inputparam_header_xml.channel_id = mService.app.channel;
                                            iObj.input.context.inputparam_header.p_inputparam_header_xml.event_date = mService.util.getDateTimeString(date, "yyyy-MM-dd");
                                            iObj.input.context.inputparam_header.p_inputparam_header_xml.event_hour = mService.util.getDateTimeString(date, "HH");
                                            iObj.input.context.inputparam_header.p_inputparam_header_xml.event_minute = mService.util.getDateTimeString(date, "mm");
                                            iObj.input.context.inputparam_header.p_inputparam_header_xml.event_second = mService.util.getDateTimeString(date, "ss");
                                            iObj.input.context.inputparam_header.p_inputparam_header_xml.event_latitude = latitude;
                                            iObj.input.context.inputparam_header.p_inputparam_header_xml.event_longitude = longitude;
                                            iObj.input.context.inputparam_header.p_inputparam_header_xml = JSON.stringify(iObj.input.context.inputparam_header.p_inputparam_header_xml);
                                            iObj.input = JSON.stringify(iObj.input);
                                        }
                                    };
                                    eventVerbKey = iObj.key;
                                    iObj.url = mService.app.clientURL + iObj.url;
                                    dSrc = $.extend({}, iObj);
                                    delete (dSrc.datasource);
                                    delete (dSrc.eventsource);
                                    window.minterface("CreateDirectory", [{
                                                filePath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "database" + "/" + "queue",
                                            }
                                        ], function () {
                                        try {
                                            mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "database" + "/" + "queue" + "/" + kendo.toString(date, "yyyyMMddHHmmssfff") + "_" + mService.app.getUserId() + "_" + eventVerbKey + ".txt", JSON.stringify(dSrc), function () {
                                                try {
                                                    mService.queue.createEventCache(iObj, function () {
                                                        try {
                                                            mService.queue.updateBackup(iObj, success, failure);
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
                                    }, function (errorMsg) {
                                        try {
                                            mService.app.showToast("createDirectory_error", "pre_signup_messages");
                                            mService.exception.handle(errorMsg);
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
                                    mService.app.showToast("get_date_error", scrID);
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
                            mService.containR.variable[scrID].submitInAction = false;
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
                    mService.containR.variable[scrID].submitInAction = false;
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    createEventCache: function (iObj, success, failure) {
        try {
            if (iObj.eventsource !== undefined) {
                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "database" + "/" + "cache" + "/" + iObj.eventsource.txn_ref_no + ".cache_encrypted.txt", function (data) {
                    var dSrc;
                    try {
                        if (data !== "") {
                            dSrc = JSON.parse(data);
                            dSrc.event_log[(Object.keys(dSrc.event_log).length + 1).toString()] = iObj.eventsource;
                        } else {
                            dSrc = {
                                event_log: {
                                    "1": iObj.eventsource
                                }
                            };
                        };
                        mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "database" + "/" + "cache" + "/" + iObj.eventsource.txn_ref_no + ".cache_encrypted.txt", JSON.stringify(dSrc), function () {
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
                    var dSrc;
                    try {
                        dSrc = {
                            event_log: {
                                "1": iObj.eventsource
                            }
                        };
                        mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "database" + "/" + "cache" + "/" + iObj.eventsource.txn_ref_no + ".cache_encrypted.txt", JSON.stringify(dSrc), function () {
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
    updateBackup: function (iObj, success, failure) {
        try {
            if (iObj.datasource !== undefined) {
                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "database" + "/" + "bckp_" + iObj.key + "_encrypted.txt", function (data) {
                    var dSrc;
                    try {
                        if (data !== "") {
                            dSrc = JSON.parse(data);
                        } else {
                            dSrc = {};
                        };
                        dSrc[iObj.subkey] = iObj.datasource.data();
                        mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "database" + "/" + "bckp_" + iObj.key + "_encrypted.txt", JSON.stringify(dSrc), function () {
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
                    var dSrc;
                    try {
                        dSrc = {};
                        dSrc[iObj.subkey] = iObj.datasource.data();
                        mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "database" + "/" + "bckp_" + iObj.key + "_encrypted.txt", JSON.stringify(dSrc), function () {
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
    }
};