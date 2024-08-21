mService.dSource = {
    app: {},
    cache: {},
    cacheController: function (success, failure) {
        var cacheControllerLocalPath;
        try {
            cacheControllerLocalPath = mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "cache" + "/" + "cache_controller" + "_" + mService.app.id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json";
            mService.nfs.readFile(cacheControllerLocalPath, function (oldCacheControllerObj) {
                try {
                    oldCacheControllerObj = JSON.parse(oldCacheControllerObj);
                    if (navigator.onLine) {
                        $.ajax({
                            url: mService.app.clientURL + "/common/components/msvFileHandler/ReadFile.aspx?client_id=" + mService.app.getClientId() + "&country_code=" + mService.app.getCountryCode() + "&path=fmt/" + "msvCache" + "/" + "cache_controller" + "_" + mService.app.id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json",
                            async: false,
                            cache: false,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            complete: function (response, status) {
                                try {
                                    if (status === "success") {
                                        data = response.responseJSON.response;
                                        mService.dSource.util.getcontrollerchanges(oldCacheControllerObj, data, function (newCacheControllerObj) {
                                            try {
                                                if ($.isEmptyObject(newCacheControllerObj) !== true) {
                                                    mService.dSource.variable.cacheControllerObjCounter = Object.keys(newCacheControllerObj).length - 1;
                                                    mService.dSource.cacheSyncServer(oldCacheControllerObj, newCacheControllerObj, "update", function () {
                                                        mService.dSource.variable.cacheControllerObjCounter = Object.keys(oldCacheControllerObj).length - 1;
                                                        mService.dSource.readLocalCacheFiles(oldCacheControllerObj, function () {
                                                            try {
                                                                mService.dSource.updateCacheControllerFile(oldCacheControllerObj, newCacheControllerObj, "update", function () {
                                                                    try {
                                                                        success();
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    };
                                                                }, function () {
                                                                    try {
                                                                        failure();
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    };
                                                                });
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            };
                                                        }, function () {
                                                            try {
                                                                failure();
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            };
                                                        });
                                                    }, function () {
                                                        try {
                                                            failure();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        };
                                                    });
                                                } else {
                                                    mService.dSource.variable.cacheControllerObjCounter = Object.keys(oldCacheControllerObj).length - 1;
                                                    mService.dSource.readLocalCacheFiles(oldCacheControllerObj, function () {
                                                        try {
                                                            success();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        };
                                                    }, function () {
                                                        try {
                                                            failure();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        };
                                                    });
                                                }
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            };
                                        }, function () {
                                            try {
                                                failure();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            };
                                        });
                                    } else {
                                        failure();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }
                        });
                    } else {
                        mService.dSource.variable.cacheControllerObjCounter = Object.keys(oldCacheControllerObj).length - 1;
                        mService.dSource.readLocalCacheFiles(oldCacheControllerObj, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (e) {
                try {
                    mService.dSource.util.getCacheControllerData(cacheControllerLocalPath, function (oldCacheControllerObj) {
                        try {
                            mService.dSource.variable.cacheControllerObjCounter = Object.keys(oldCacheControllerObj).length - 1;
                            mService.dSource.cacheSyncServer(oldCacheControllerObj, "", "initial", function () {
                                try {
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            }, function () {
                                try {
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
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
        };
    },
    cacheSyncServer: function (cacheControllerObj, newCacheControllerObj, flag, success, failure) {
        var controllerObj;
        try {
            if (flag === "update") {
                controllerObj = newCacheControllerObj;
            } else {
                controllerObj = cacheControllerObj;
            };
            mService.dSource.getServerDatasource(controllerObj, mService.dSource.variable.cacheControllerObjCounter, flag, function () {
                try {
                    mService.dSource.variable.cacheControllerObjCounter--;
                    if (mService.dSource.variable.cacheControllerObjCounter !== -1) {
                        mService.dSource.cacheSyncServer(cacheControllerObj, newCacheControllerObj, flag, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    } else {
                        mService.dSource.variable.cacheControllerObjCounter = -1;
                        success();
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            }, function () {
                try {
                    mService.dSource.variable.cacheControllerObjCounter--;
                    if (mService.dSource.variable.cacheControllerObjCounter !== -1) {
                        mService.dSource.cacheSyncServer(cacheControllerObj, newCacheControllerObj, flag, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    } else {
                        mService.dSource.variable.cacheControllerObjCounter = -1;
                        success();
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            });
        } catch (exception) {
            mService.exception.handle(exception);
        };
    },
    getCachedData: function (scrID, controllerObj, success, syncInd, autoRefreshInd) {
        var dSourceKey,
        patternScrID;
        try {
            syncInd = (syncInd === undefined) ? false : syncInd;
            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                dSourceKey = scrID;
                patternScrID = scrID.replace("_list", "");
            } else {
                dSourceKey = scrID + "_list";
                patternScrID = scrID;
            };
            if ((autoRefreshInd === undefined) ? (false) : (autoRefreshInd)) {
                if (navigator.onLine) {
                    mService.dSource.downloadDataSource(scrID, controllerObj, syncInd, autoRefreshInd, function (dataSource) {
                        try {
                            success(dataSource);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    if (mService.dSource.cache[dSourceKey] !== undefined) {
                        success(mService.dSource.cache[dSourceKey]);
                    } else {
                        mService.dSource.util.localRead(dSourceKey, function (data) {
                            var localDSrc;
                            try {
                                localDSrc = new kendo.data.DataSource({
                                    data: data
                                });
                                localDSrc.read().then(function () {
                                    try {
                                        mService.dSource.cache[dSourceKey] = localDSrc;
                                        success(mService.dSource.cache[dSourceKey]);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    };
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            try {
                                mService.dSource.downloadDataSource(scrID, controllerObj, syncInd, autoRefreshInd, function (dataSource) {
                                    try {
                                        success(dataSource);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    }
                }
            } else if (!syncInd) {
                if (mService.dSource.cache[dSourceKey] !== undefined) {
                    success(mService.dSource.cache[dSourceKey]);
                } else {
                    mService.dSource.util.localRead(dSourceKey, function (data) {
                        var localDSrc;
                        try {
                            localDSrc = new kendo.data.DataSource({
                                data: data
                            });
                            localDSrc.read().then(function () {
                                try {
                                    mService.dSource.cache[dSourceKey] = localDSrc;
                                    success(mService.dSource.cache[dSourceKey]);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    }, function () {
                        var data;
                        try {
                            mService.app.showToast("call_sync_pending", "system_messages");
                            data = new kendo.data.DataSource({
                                data: [],
                            });
                            data.read().then(function () {
                                try {
                                    mService.dSource.cache[dSourceKey] = data;
                                    success(mService.dSource.cache[dSourceKey]);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    });
                }
            } else {
                mService.dSource.downloadDataSource(scrID, controllerObj, syncInd, autoRefreshInd, function (dataSource) {
                    try {
                        success(dataSource);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    downloadDataSource: function (scrID, controllerObj, syncInd, autoRefreshInd, success) {
        var cachedSource,
        dSrcObj,
        dSourceKey,
        patternScrID,
        parentControllerObj;
        try {
            parentControllerObj = "";
            syncInd = (syncInd === undefined) ? false : syncInd;
            if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                patternScrID = scrID.replace("_list", "");
                parentControllerObj = mService.config.controller.getControllerObj(patternScrID);
            } else {
                patternScrID = scrID;
            };
            if (navigator.onLine) {
                try {
                    if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                        dSourceKey = scrID;
                    } else {
                        dSourceKey = scrID + "_list";
                    };
                    dSrcObj = {
                        code: controllerObj.dSource[dSourceKey].inputParam.code,
                        inputXml: controllerObj.dSource[dSourceKey].inputParam.inputXml
                    };
                    cachedSource = mService.dSource.getSource(dSrcObj);
                    cachedSource.read().then(function () {
                        var listData,
                        item;
                        try {
                            mService.dSource.cache[dSourceKey] = cachedSource;
                            listData = cachedSource.data();
                            if (autoRefreshInd !== undefined && parentControllerObj !== "" && parentControllerObj.pattern_name === "workflow") {
                                for (item of listData) {
                                    item.attachmentSyncInd = "false";
                                }
                            };
                            mService.dSource.util.localWrite(dSourceKey, listData, function (data) {
                                try {
                                    success(mService.dSource.cache[dSourceKey]);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            }, function () {
                                try {
                                    success([]);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                };
                            });
                            if (controllerObj.pattern === undefined && controllerObj.containR_subtype === "workflow") {
                                var empLastAccessDSource = mService.dSource.getSource({
                                    code: "'employee_last_access_info'",
                                    inputXml: "",
                                    asyncInd: true
                                });
                                empLastAccessDSource.read().then(function () {
                                    try {
                                        mService.dSource.cache["EMPLOYEE_LAST_ACCESS_INFO"] = empLastAccessDSource;
                                        mService.dSource.util.localWrite("EMPLOYEE_LAST_ACCESS_INFO", empLastAccessDSource.data(), function (data) {
                                            try {
                                                return true;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            };
                                        }, function () {
                                            try {
                                                return true;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            };
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    };
                                });
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            } else {
                if (!((autoRefreshInd === undefined) ? false : autoRefreshInd)) {
                    mService.app.showToast("internet_connection_error", "system_messages");
                };
                cachedSource = new kendo.data.DataSource({
                    data: [],
                });
                cachedSource.read().then(function () {
                    try {
                        mService.dSource.cache[scrID] = cachedSource;
                        success(mService.dSource.cache[scrID]);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    };
                });
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    downloadCallAttachments: function (dataSource, dSourceKey, recordUID, success) {
        var dataSrc;
        try {
            dataSrc = [];
            if (recordUID !== undefined) {
                dataSrc.push(mService.dSource.cache[dSourceKey].getByUid(recordUID));
            } else {
                dataSrc = dataSource.data();
            };
            mService.dSource.util.attachment.syncAttachment(dataSrc, function (data) {
                var dSrc;
                try {
                    if (recordUID !== undefined) {
                        dSrc = mService.dSource.cache[dSourceKey].data();
                    } else {
                        dSrc = data;
                    };
                    mService.dSource.util.localWrite(dSourceKey, dSrc, function (data) {
                        try {
                            if (recordUID !== undefined) {
                                success();
                            } else {
                                return true;
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    }, function () {
                        try {
                            if (recordUID !== undefined) {
                                success();
                            } else {
                                return true;
                            }
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
    getDetailSource: function (iObj) {
        try {
            return new kendo.data.DataSource({
                offlineStorage: iObj.dSourceName + "_offline",
                transport: {
                    read: {
                        url: mService.app.clientURL + "/api/common_modules/retrieve_manage_custom_info_detail",
                        async: false,
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        complete: function (data) {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    },
                    parameterMap: function (data, type) {
                        try {
                            return mService.dSource.util.getInputObject({
                                "inputparam": {
                                    "p_custom_info_code": ((iObj.code === undefined) ? ("") : (iObj.code)),
                                    "p_custom_info_ref_no1": ((iObj.refNo1 === undefined) ? ("") : (iObj.refNo1)),
                                    "p_custom_info_ref_no2": ((iObj.refNo2 === undefined) ? ("") : (iObj.refNo2))
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                },
                schema: {
                    parse: function (response) {
                        try {
                            var returnData = [],
                            index;
                            if (response.ApplicationException === null) {
                                returnData[0] = JSON.parse(response.outputparam_header.p_custom_info_header_json);
                                returnData[0].detail = [];
                                for (index in response.outputparam_detail) {
                                    returnData[0].detail.push(JSON.parse(response.outputparam_detail[index]["p_custom_info_detail_json"].replace(/\n/g, "\\n")));
                                };
                            };
                            return returnData;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    errors: function (response) {
                        try {
                            return response.error;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                },
                error: function (e) {
                    try {
                        e.preventDefault();
                        console.log("error event handler: " + e);
                        mService.app.showToast("service_exception", "pre_signup_messages");
                        return false;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getListSource: function (iObj) {
        try {
            return new kendo.data.DataSource({
                offlineStorage: iObj.dSourceName + "_offline",
                transport: {
                    read: {
                        url: mService.app.clientURL + "/api/common_modules/retrieve_manage_custom_info_list",
                        method: "POST",
                        async: false,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        complete: function (data) {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                    },
                    parameterMap: function (data, type) {
                        try {
                            return mService.dSource.util.getInputObject({
                                "inputparam": {
                                    "p_custom_info_code": ((iObj.code === undefined) ? ("") : (iObj.code)),
                                    "p_inputparam_xml": ((iObj.inputXml === undefined) ? ("") : (iObj.inputXml))
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                },
                schema: {
                    parse: function (response) {
                        var returnData = [],
                        index;
                        try {
                            if (response.ApplicationException === null) {
                                for (index in response.outputparam_detail) {
                                    returnData.push(JSON.parse(response.outputparam_detail[index]["p_custom_info_list_json"].replace(/\n/g, "\\n")));
                                }
                            };
                            return returnData;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    errors: function (response) {
                        try {
                            return response.error;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                },
                error: function (e) {
                    try {
                        e.preventDefault();
                        console.log("error event handler: " + e);
                        mService.app.showToast("service_exception", "pre_signup_messages");
                        return false;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getLocalDatasource: function (cacheControllerObj, counter, success, failure) {
        var keyName;
        try {
            keyName = Object.keys(cacheControllerObj)[counter];
            mService.dSource.util.localRead(keyName, function (data) {
                var localDSrc;
                try {
                    localDSrc = new kendo.data.DataSource({
                        data: data
                    });
                    localDSrc.read().then(function () {
                        try {
                            mService.dSource.cache[keyName] = localDSrc;
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            }, function () {
                try {
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            });
        } catch (exception) {
            mService.exception.handle(exception);
        };
    },
    getServerDatasource: function (cacheControllerObj, counter, flag, success, failure) {
        var cachedSource;
        try {
            if (cacheControllerObj[Object.keys(cacheControllerObj)[counter]].allowFor === "all" || (cacheControllerObj[Object.keys(cacheControllerObj)[counter]].allowFor === "user" && mService.app.getProfileId() === "U") || (cacheControllerObj[Object.keys(cacheControllerObj)[counter]].allowFor === "visitor" && mService.app.getProfileId() === "V")) {
                cachedSource = mService.dSource.getSource({
                    code: cacheControllerObj[Object.keys(cacheControllerObj)[counter]].code,
                    inputXml: cacheControllerObj[Object.keys(cacheControllerObj)[counter]].inputXml,
                    asyncInd: true
                });
                cachedSource.read().then(function () {
                    var keyName;
                    try {
                        keyName = Object.keys(cacheControllerObj)[counter];
                        mService.dSource.cache[keyName] = cachedSource;
                        mService.dSource.util.localWrite(keyName, cachedSource.data(), function (data) {
                            try {
                                if (flag === "initial") {
                                    if (cacheControllerObj[Object.keys(cacheControllerObj)[counter]].allowFor !== 'all') {
                                        cacheControllerObj[Object.keys(cacheControllerObj)[counter]].downloadInd = "true";
                                    };
                                    mService.dSource.updateCacheControllerFile(cacheControllerObj, "", flag, function () {
                                        try {
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        };
                                    }, function () {
                                        try {
                                            failure();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        };
                                    });
                                } else {
                                    success();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    } catch (exception) {};
                });
            } else {
                success();
            }
        } catch (exception) {
            mService.exception.handle(exception);
        };
    },
    getSource: function (iObj) {
        try {
            return new kendo.data.DataSource({
                transport: {
                    read: function (e) {
                        try {
                            mService.dSource.retrieveCustomInfoList(iObj, function (response) {
                                try {
                                    e.success(response);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    e.success([]);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
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
    loadCachedDataSource: function () {
        try {
            setTimeout(function () {
                try {
                    mService.dSource.cacheController(function () {
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
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, 500);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    readLocalCacheFiles: function (cacheControllerObj, success, failure) {
        try {
            mService.dSource.getLocalDatasource(cacheControllerObj, mService.dSource.variable.cacheControllerObjCounter, function () {
                try {
                    mService.dSource.variable.cacheControllerObjCounter--;
                    if (mService.dSource.variable.cacheControllerObjCounter !== -1) {
                        mService.dSource.readLocalCacheFiles(cacheControllerObj, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    } else {
                        mService.dSource.variable.cacheControllerObjCounter = -1;
                        success();
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            }, function () {
                try {
                    mService.dSource.variable.cacheControllerObjCounter--;
                    if (mService.dSource.variable.cacheControllerObjCounter !== -1) {
                        mService.dSource.readLocalCacheFiles(cacheControllerObj, function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            try {
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    } else {
                        mService.dSource.variable.cacheControllerObjCounter = -1;
                        success();
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            });
        } catch (exception) {
            mService.exception.handle(exception);
        };
    },
    retrieveCustomInfoDetail: function (iObj, success, failure) {
        try {
            $.ajax({
                async: false,
                url: mService.app.clientURL + "/api/common_modules/retrieve_manage_custom_info_detail",
                method: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: mService.dSource.util.getInputObject({
                    "inputparam": {
                        "p_custom_info_code": ((iObj.code === undefined) ? ("") : (iObj.code)),
                        "p_custom_info_ref_no1": ((iObj.refNo1 === undefined) ? ("") : (iObj.refNo1)),
                        "p_custom_info_ref_no2": ((iObj.refNo2 === undefined) ? ("") : (iObj.refNo2))
                    }
                }),
                success: function (response) {
                    var returnData,
                    index;
                    try {
                        returnData = {
                            header: {},
                            detail: []
                        };
                        if (response.ApplicationException === null) {
                            if (response.outputparam_header !== null) {
                                returnData.header = JSON.parse(response.outputparam_header.p_custom_info_header_json.replace(/\n/g, "\\n"));
                            };
                            for (index in response.outputparam_detail) {
                                if (response.outputparam_detail[index]["p_custom_info_detail_json"] !== "") {
                                    returnData.detail.push(JSON.parse(response.outputparam_detail[index]["p_custom_info_detail_json"].replace(/\n/g, "\\n")));
                                }
                            };
                            success(returnData);
                        } else {
                            console.error(response.ApplicationException.errorDescription);
                            failure(response.ApplicationException.errorDescription);
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                error: function (e) {
                    try {
                        failure(e.statusText);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    retrieveCustomInfoList: function (iObj, success, failure) {
        var asyncInd;
        try {
            asyncInd = ((iObj.asyncInd === undefined) ? (false) : (iObj.asyncInd));
            $.ajax({
                async: asyncInd,
                url: mService.app.clientURL + "/api/common_modules/retrieve_manage_custom_info_list",
                method: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: mService.dSource.util.getInputObject({
                    "inputparam": {
                        "p_custom_info_code": ((iObj.code === undefined) ? ("") : (iObj.code)),
                        "p_inputparam_xml": ((iObj.inputXml === undefined) ? ("") : (iObj.inputXml))
                    }
                }),
                success: function (response) {
                    var returnData,
                    index;
                    try {
                        returnData = [];
                        if (response.ApplicationException === null) {
                            for (index in response.outputparam_detail) {
                                returnData.push(JSON.parse(response.outputparam_detail[index]["p_custom_info_list_json"].replace(/\n/g, "\\n")));
                            };
                            success(returnData);
                        } else {
                            console.error(response.ApplicationException.errorDescription);
                            failure(response.ApplicationException.errorDescription);
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                error: function (e) {
                    try {
                        failure(e.statusText);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    saveCustomInfo: function (configObj, iObj, success, failure) {
        try {
            $.ajax({
                async: false,
                url: mService.app.clientURL + "/api/common_modules/save_manage_custom_info",
                method: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: mService.dSource.util.getInputObject({
                    "inputparam_header": {
                        "p_custom_info_code": ((iObj.code === undefined) ? ("") : (iObj.code)),
                        "p_custom_info_ref_no1": ((iObj.ref1 === undefined) ? ("") : (iObj.ref1)),
                        "p_custom_info_ref_no2": ((iObj.ref2 === undefined) ? ("") : (iObj.ref2)),
                        "p_inputparam_header_xml": ((iObj.headerXml === undefined) ? ("") : (iObj.headerXml)),
                        "p_rec_timestamp": ((iObj.recTstamp === undefined) ? ("'00000000-0000-0000-0000-000000000000'") : (iObj.recTstamp)),
                        "p_save_mode": ((iObj.saveMode === undefined) ? ("'A'") : (iObj.saveMode))
                    },
                    "inputparam_detail": ((iObj.inputDetail === undefined) ? ("") : (iObj.inputDetail)),
                    "client_id": ((iObj.client_id === undefined) ? ("'" + mService.app.getClientId() + "'") : (iObj.client_id)),
                    "country_code": ((iObj.country_code === undefined) ? ("'" + mService.app.getCountryCode() + "'") : (iObj.country_code))
                }),
                complete: function (response, status) {
                    try {
                        if (status === "success") {
                            response = response.responseJSON;
                            mService.dSource.util.processResponse.saveCustomInfo(configObj, response, function (data) {
                                try {
                                    success(data);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (data) {
                                try {
                                    failure(data);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            if (configObj.failureToast) {
                                mService.app.showToast("service_exception", "pre_signup_messages");
                            };
                            failure("Service Exception");
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    updateCacheControllerFile: function (oldCacheControllerObj, newCacheControllerObj, flag, success, failure) {
        var index;
        try {
            if (flag === "update") {
                for (index = 0; index < Object.keys(newCacheControllerObj).length; index++) {
                    if (newCacheControllerObj[Object.keys(newCacheControllerObj)[index]].allowFor !== "all") {
                        newCacheControllerObj[Object.keys(newCacheControllerObj)[index]].downloadInd = "true";
                    }
                };
                $.extend(true, oldCacheControllerObj, newCacheControllerObj);
            };
            mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "cache" + "/" + "cache_controller" + "_" + mService.app.id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json", JSON.stringify(oldCacheControllerObj), function () {
                try {
                    success();
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            }, function () {
                try {
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            });
        } catch (exception) {
            mService.exception.handle(exception);
        };
    },
    util: {
        getCallItem: function (scrID, callNo, success, failure) {
            var controllerObj,
            selectedRecord;
            try {
                controllerObj = mService.config.controller.getControllerObj(scrID + "_list");
                mService.containR.util.getQueueSyncIndicator("", function (ind) {
                    var autoRefreshInd = false;
                    try {
                        if (ind === "true") {
                            autoRefreshInd = true;
                        } else if (ind === "false") {
                            autoRefreshInd = false;
                        } else {
                            autoRefreshInd = false;
                        };
                        mService.dSource.getCachedData(scrID + "_list", controllerObj, function (data) {
                            try {
                                mService.util.getActiveCall(data, scrID, function (activeCall) {
                                    var callIndex,
                                    listDSrc,
                                    tempItem;
                                    try {
                                        if (activeCall !== "") {
                                            mService.containR.variable[scrID].activeCall = activeCall;
                                            callIndex = data.indexOf(activeCall);
                                            listDSrc = data.data();
                                            if (callIndex !== undefined) {
                                                if (callIndex !== 0) {
                                                    tempItem = listDSrc[callIndex];
                                                    listDSrc.splice(callIndex, 1);
                                                    listDSrc.unshift(tempItem);
                                                    mService.dSource.cache[scrID + "_list"].data(listDSrc);
                                                };
                                            }
                                        };
                                        selectedRecord = $.grep(mService.dSource.cache[scrID + "_list"].data(), function (e, i) {
                                            try {
                                                return ((e.request_ref_no === undefined) ? (e.call_no) : (e.request_ref_no)) === callNo;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        })[0];
                                        if (selectedRecord !== undefined) {
                                            success(selectedRecord);
                                        } else {
                                            failure();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, false, autoRefreshInd);
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
        },
        getcontrollerchanges: function (oldControllerObj, newControllerObj, success) {
            var unModifiedObjArray = [];
            try {
                for (var newIndex = 0; newIndex < Object.keys(newControllerObj).length; newIndex++) {
                    for (var oldIndex = 0; oldIndex < Object.keys(oldControllerObj).length; oldIndex++) {
                        if (Object.keys(oldControllerObj)[oldIndex] === Object.keys(newControllerObj)[oldIndex]) {
                            if (oldControllerObj[Object.keys(oldControllerObj)[oldIndex]].last_change_timestamp === newControllerObj[Object.keys(newControllerObj)[oldIndex]].last_change_timestamp) {
                                if (!(oldControllerObj[Object.keys(oldControllerObj)[oldIndex]].allowFor === "all" || (oldControllerObj[Object.keys(oldControllerObj)[oldIndex]].allowFor === "user" && mService.app.getProfileId() === "U") || (oldControllerObj[Object.keys(oldControllerObj)[oldIndex]].allowFor === "visitor" && mService.app.getProfileId() === "V"))) {
                                    if (unModifiedObjArray.indexOf(Object.keys(oldControllerObj)[oldIndex]) === -1) {
                                        unModifiedObjArray.push(Object.keys(oldControllerObj)[oldIndex]);
                                    }
                                } else {
                                    if (oldControllerObj[Object.keys(oldControllerObj)[oldIndex]].downloadInd !== undefined) {
                                        if (unModifiedObjArray.indexOf(Object.keys(oldControllerObj)[oldIndex]) === -1) {
                                            unModifiedObjArray.push(Object.keys(oldControllerObj)[oldIndex]);
                                        }
                                    }
                                }
                            } else {
                                if (!(oldControllerObj[Object.keys(oldControllerObj)[oldIndex]].allowFor === "all" || (oldControllerObj[Object.keys(oldControllerObj)[oldIndex]].allowFor === "user" && mService.app.getProfileId() === "U") || (oldControllerObj[Object.keys(oldControllerObj)[oldIndex]].allowFor === "visitor" && mService.app.getProfileId() === "V"))) {
                                    if (unModifiedObjArray.indexOf(Object.keys(oldControllerObj)[oldIndex]) === -1) {
                                        unModifiedObjArray.push(Object.keys(oldControllerObj)[oldIndex]);
                                    }
                                }
                            }
                        }
                    }
                };
                if (unModifiedObjArray.length > 0) {
                    for (var newIndex = 0; newIndex < unModifiedObjArray.length; newIndex++) {
                        delete newControllerObj[unModifiedObjArray[newIndex]]
                    }
                };
                success(newControllerObj)
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        getCacheControllerData: function (cacheControllerLocalPath, success, failure) {
            try {
                if (window.navigator.onLine) {
                    $.ajax({
                        url: mService.app.clientURL + "/common/components/msvFileHandler/ReadFile.aspx?client_id=" + mService.app.getClientId() + "&country_code=" + mService.app.getCountryCode() + "&path=fmt/" + "msvCache" + "/" + "cache_controller" + "_" + mService.app.id + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        complete: function (response, status) {
                            try {
                                if (status === "success") {
                                    response = response.responseJSON;
                                    window.minterface("CreateFile", [{
                                                filePath: mService.app.root + "/" + cacheControllerLocalPath,
                                                data: mService.nfs.data.encrypt(JSON.stringify(response.response))
                                            }
                                        ], function () {
                                        try {
                                            success(response.response);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function (errorMsg) {
                                        try {
                                            mService.app.showToast("createFile_error", "pre_signup_messages");
                                            mService.exception.handle(errorMsg);
                                            failure();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    failure();
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                } else {
                    failure();
                }
            } catch (exception) {
                mService.exception.handle(exception);
                failure();
            }
        },
        getInputObject: function (inputObj) {
            var context,
            input,
            index,
            key,
            subKey;
            try {
                context = {
                    "sessionId": mService.app.getSessionId(),
                    "userId": mService.app.getUserId(),
                    "client_id": ((inputObj.client_id === undefined) ? (mService.app.getClientId()) : inputObj.client_id),
                    "locale_id": mService.app.getLocaleId(),
                    "country_code": ((inputObj.country_code === undefined) ? (mService.app.getCountryCode()) : inputObj.country_code)
                };
                if (inputObj !== undefined && inputObj !== "") {
                    input = JSON.parse(JSON.stringify(inputObj));
                    for (key in input) {
                        if ($.isPlainObject(input[key])) {
                            for (subKey in input[key]) {
                                input[key][subKey] = mService.util.getTransformedValue(input[key][subKey]);
                            }
                        } else if ($.isArray(input[key])) {
                            for (index = 0; index < input[key].length; index++) {
                                for (subKey in input[key][index]) {
                                    input[key][index][subKey] = mService.util.getTransformedValue(input[key][index][subKey]);
                                }
                            }
                        } else {
                            input[key] = mService.util.getTransformedValue(input[key]);
                        };
                        context[key] = input[key];
                    }
                };
                return JSON.stringify({
                    context: context
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        localRead: function (keyName, success, failure) {
            try {
                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "cache" + "/" + keyName + ".txt", function (data) {
                    try {
                        if (data !== "") {
                            success(JSON.parse(data));
                        } else {
                            failure();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    };
                }, function (e) {
                    try {
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    };
                });
            } catch (exception) {
                mService.exception.handle(exception);
            };
        },
        localWrite: function (keyName, dataSrc, success, failure) {
            try {
                mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "cache" + "/" + keyName + ".txt", JSON.stringify(dataSrc), function () {
                    try {
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    };
                }, function () {
                    try {
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    };
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        addDataSource: function (dSourceKey, value) {
            try {
                mService.dSource.cache[dSourceKey].add(value);
                mService.dSource.util.localWrite(dSourceKey, mService.dSource.cache[dSourceKey].data(), function (data) {
                    try {
                        return true;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    };
                }, function () {
                    try {
                        return true;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    };
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        updateDataSource: function (dSourceKey, key, value) {
            var selectedRecord,
            attachmentData,
            index;
            try {
                if (key === "addAttachment") {
                    if (mService.containR.variable[mService.app.getScreenId()] === undefined) {
                        return false;
                    };
                    if (mService.containR.variable[mService.app.getScreenId()].selectedRecord === undefined) {
                        if (mService.containR.variable[mService.app.getScreenId()].selectedRecord.uid === undefined) {
                            selectedRecord = mService.containR.variable[mService.containR.variable[mService.app.getScreenId()].listScreenId].selectedRecord;
                        } else {
                            selectedRecord = mService.dSource.cache[dSourceKey].getByUid(mService.containR.variable[mService.app.getScreenId()].selectedRecord.uid);
                        }
                    } else {
                        selectedRecord = mService.dSource.cache[dSourceKey].getByUid(mService.containR.variable[mService.app.getScreenId()].selectedRecord.uid);
                    };
                    attachmentData = mService.containR.pattern.form.util.getAttachmentData(mService.app.getScreenId(), true);
                    for (index = 0; index < attachmentData.length; index++) {
                        attachmentData[index].attached_at_transaction = mService.containR.variable[mService.app.getScreenId()].transType;
                        attachmentData[index].id = "";
                        selectedRecord.attachments.push(attachmentData[index]);
                    }
                } else {
                    if (mService.dSource.cache[dSourceKey] !== undefined && mService.dSource.cache[dSourceKey].data().length > 0) {
                        selectedRecord = mService.dSource.cache[dSourceKey].getByUid(mService.containR.variable[mService.app.getScreenId()].selectedRecord.uid);
                        if (selectedRecord !== undefined) {
                            selectedRecord.set(key, value);
                        } else {
                            selectedRecord = mService.containR.variable[mService.app.getScreenId()].selectedRecord;
                            if (selectedRecord !== undefined && mService.containR.variable[mService.app.getScreenId()].selectedRecord.length !== {}) {
                                selectedRecord.set(key, value);
                            }
                        }
                    } else {
                        selectedRecord = mService.containR.variable[mService.app.getScreenId()].selectedRecord;
                        if (selectedRecord !== undefined && mService.containR.variable[mService.app.getScreenId()].selectedRecord.length !== {}) {
                            selectedRecord.set(key, value);
                        }
                    }
                };
                if (mService.dSource.cache[dSourceKey] !== undefined && mService.dSource.cache[dSourceKey].data().length > 0) {
                    mService.dSource.util.localWrite(dSourceKey, mService.dSource.cache[dSourceKey].data(), function (data) {
                        try {
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    }, function () {
                        try {
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        processResponse: {
            saveCustomInfo: function (configObj, response, success, failure) {
                try {
                    if (response.ApplicationException === null) {
                        if (response.outputparam.p_update_status === "SP001") {
                            try {
                                if (configObj.successToast) {
                                    if (mService.app.channel === "web") {
                                        mService.app.alert("success", $.extend(true, {
                                                scrid: configObj.scrID,
                                                lblid: ((configObj.inAppCode === "") ? ("success") : (configObj.inAppCode + "_success")),
                                                lblgrpid: "success"
                                            }, JSON.parse(response.outputparam.p_outputparam_detail_xml)));
                                    } else {
                                        mService.app.showToast(((configObj.inAppCode === "") ? ("success") : (configObj.inAppCode + "_success")), ((configObj.inAppCode === "") ? (configObj.scrID) : ("system_messages")), JSON.parse(response.outputparam.p_outputparam_detail_xml));
                                    }
                                };
                                success(response);
                            } catch (exception) {
                                if (configObj.successToast) {
                                    if (mService.app.channel === "web") {
                                        mService.app.alert("success", {
                                            scrid: configObj.scrID,
                                            lblid: ((configObj.inAppCode === "") ? ("success") : (configObj.inAppCode + "_success")),
                                            lblgrpid: "success"
                                        });
                                    } else {
                                        mService.app.showToast(((configObj.inAppCode === "") ? ("success") : (configObj.inAppCode + "_success")), ((configObj.inAppCode === "") ? (configObj.scrID) : ("system_messages")));
                                    }
                                };
                                success(response);
                            }
                        } else {
                            if (configObj.failureToast) {
                                if (mService.app.channel === "web") {
                                    mService.app.alert("error", {
                                        scrid: configObj.scrID,
                                        lblid: "service_exception",
                                        lblgrpid: "error"
                                    });
                                } else {
                                    mService.app.showToast("service_exception", "pre_signup_messages");
                                }
                            };
                            failure("Service Exception");
                        }
                    } else {
                        try {
                            if (configObj.failureToast) {
                                if (mService.app.channel === "web") {
                                    mService.app.alert("error", $.extend(true, {
                                            scrid: configObj.scrID,
                                            lblid: ((configObj.inAppCode === "") ? (JSON.parse(response.ApplicationException.errorDescription).code) : (configObj.inAppCode + "_" + JSON.parse(response.ApplicationException.errorDescription).code)),
                                            lblgrpid: "error"
                                        }, JSON.parse(response.ApplicationException.errorDescription)));
                                } else {
                                    mService.app.showToast(((configObj.inAppCode === "") ? (JSON.parse(response.ApplicationException.errorDescription).code) : (configObj.inAppCode + "_" + JSON.parse(response.ApplicationException.errorDescription).code)), ((configObj.inAppCode === "") ? (configObj.scrID) : ("system_messages")), JSON.parse(response.ApplicationException.errorDescription));
                                }
                            };
                            failure(JSON.parse(response.ApplicationException.errorDescription));
                        } catch (exception) {
                            if (configObj.failureToast) {
                                if (mService.app.channel === "web") {
                                    mService.app.alert("error", {
                                        scrid: configObj.scrID,
                                        lblid: "service_exception",
                                        lblgrpid: "error"
                                    });
                                } else {
                                    mService.app.showToast("service_exception", "pre_signup_messages");
                                }
                            };
                            failure("Service Exception");
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        attachment: {
            deleteAttachments: function (path, callNo, success) {
                try {
                    if (mService.dSource.util.attachment.variable.callNo !== callNo) {
                        mService.dSource.util.attachment.variable.callNo = callNo;
                        mService.nfs.deleteDirectory(mService.app.getClientId() + '/' + mService.app.getCountryCode() + '/' + 'content_store' + '/' + path + '/' + callNo, function () {
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
                    } else {
                        success();
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            download: function (call_no, success, failure) {
                var fileData,
                serverPath,
                localPath;
                try {
                    if (mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].attachments[mService.dSource.util.attachment.variable.attachmentsCounter] !== undefined) {
                        fileData = mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].attachments[mService.dSource.util.attachment.variable.attachmentsCounter];
                        mService.dSource.util.attachment.deleteAttachments((fileData.path).replace(/\\/g, '/'), call_no, function () {
                            try {
                                if (window.navigator.onLine) {
                                    serverPath = mService.app.clientURL + "/" + "content_store" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + fileData.path + "/" + fileData.name;
                                    localPath = mService.app.getClientId() + '/' + mService.app.getCountryCode() + '/' + 'content_store' + '/' + (fileData.path).replace(/\\/g, '/') + "/" + fileData.name;
                                    mService.nfs.downloadFile(serverPath, localPath, false, function (thumbnail) {
                                        try {
                                            mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].attachments[mService.dSource.util.attachment.variable.attachmentsCounter].thumbnail = thumbnail;
                                            mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].attachments[mService.dSource.util.attachment.variable.attachmentsCounter].downloadInfo = "success";
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].attachments[mService.dSource.util.attachment.variable.attachmentsCounter].downloadInfo = "failure";
                                            failure();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, true);
                                } else {
                                    mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].attachments[mService.dSource.util.attachment.variable.attachmentsCounter].downloadInfo = "offline";
                                    failure();
                                }
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
            downloadAttachment: function (call_no, success, failure) {
                try {
                    mService.dSource.util.attachment.download(call_no, function () {
                        try {
                            mService.dSource.util.attachment.variable.attachmentsCounter++;
                            if (mService.dSource.util.attachment.variable.attachmentsCounter < mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].attachments.length) {
                                mService.dSource.util.attachment.downloadAttachment(call_no, function () {
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
                                mService.dSource.util.attachment.variable.attachmentsCounter = 0;
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.dSource.util.attachment.variable.attachmentsCounter++;
                            if (mService.dSource.util.attachment.variable.attachmentsCounter < mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].attachments.length) {
                                mService.dSource.util.attachment.downloadAttachment(call_no, function () {
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
                                mService.dSource.util.attachment.variable.attachmentsCounter = 0;
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    })
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            syncAttachment: function (dataSrc, success) {
                var callNo;
                try {
                    if (dataSrc.length > 0) {
                        if (dataSrc[0].attachments !== undefined) {
                            mService.dSource.util.attachment.variable.callList = dataSrc;
                            callNo = ((mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].request_ref_no === undefined) ? (mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].call_no) : (mService.dSource.util.attachment.variable.callList[mService.dSource.util.attachment.variable.callCounter].request_ref_no));
                            mService.dSource.util.attachment.downloadAttachment(callNo, function () {
                                mService.dSource.util.attachment.variable.callCounter++;
                                if (mService.dSource.util.attachment.variable.callCounter < mService.dSource.util.attachment.variable.callList.length) {
                                    mService.dSource.util.attachment.syncAttachment(dataSrc, function () {
                                        try {
                                            mService.dSource.util.attachment.variable.callNo = "";
                                            success(mService.dSource.util.attachment.variable.callList);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.dSource.util.attachment.variable.callCounter = 0;
                                    mService.dSource.util.attachment.variable.callNo = "";
                                    success(mService.dSource.util.attachment.variable.callList);
                                }
                            });
                        } else {
                            success(dataSrc);
                        }
                    } else {
                        success(dataSrc);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            variable: {
                callNo: "",
                callList: [],
                callCounter: 0,
                attachmentsCounter: 0
            }
        }
    },
    variable: {}
};
