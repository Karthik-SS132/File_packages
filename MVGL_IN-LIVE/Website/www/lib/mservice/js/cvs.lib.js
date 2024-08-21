mService.cvs = {
    deleteExistingPackage: function (obj, timestamp, packageType, success, failure) {
        try {
            window.minterface("DeleteDirectory", [{
                        filePath: mService.app.root + "/" + obj.client_id + "/" + obj.country_code + "/" + packageType
                    }
                ], function () {
                try {
                    mService.cvs.downloadPackage(obj, timestamp, packageType, function () {
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
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    mService.cvs.downloadPackage(obj, timestamp, packageType, function () {
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
    downloadPackage: function (obj, timestamp, packageType, success, failure) {
        try {
            window.minterface("CreateDirectory", [{
                        filePath: mService.app.root + "/" + obj.client_id + "/" + obj.country_code + "/" + packageType
                    }
                ], function () {
                try {
                    window.minterface("DownloadFile", [{
                                url: mService.app.cvsURL + "/" + "temp_encrypted" + "/" + packageType + "_" + obj.client_id + "_" + obj.country_code + "_" + timestamp + ".zip",
                                filePath: mService.app.root + "/" + obj.client_id + "/" + obj.country_code + "/" + packageType + "/" + packageType + "_" + obj.client_id + "_" + obj.country_code + "_" + timestamp + ".zip"
                            }
                        ], function () {
                        try {
                            mService.cvs.unzipPackage(obj, timestamp, packageType, function () {
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
                    }, function (errorMsg) {
                        try {
                            mService.exception.handle(errorMsg);
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
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getPackageTimestamp: function (online, obj, success, failure) {
        var data = {};
        try {
            mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/app_state_info.txt", function (appStateInfo) {
                try {
                    appStateInfo = JSON.parse(appStateInfo);
                    data["accessPackageTimestamp"] = appStateInfo.accessPackageTimestamp;
                    data["configurationPackageTimestamp"] = appStateInfo.configurationPackageTimestamp;
                    success(data);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (e) {
                try {
                    if (online) {
                        mService.cvs.getPackageTimestampFromServer(obj, function (response) {
                            try {
                                success(response);
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
                        if (window.navigator.onLine) {
                            mService.cvs.getPackageTimestampFromServer(obj, function (response) {
                                try {
                                    success(response);
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
                            failure();
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getPackageTimestampFromServer: function (obj, success, failure) {
        try {
            $.ajax({
                url: mService.app.cvsURL + "/" + "retrieve_last_change_timestamp.aspx",
                method: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    client_id: obj.client_id,
                    country_code: obj.country_code
                }),
                error: function () {
                    try {
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                success: function (response) {
                    var data = {};
                    try {
                        if (response.accessPackageTimestamp === "" || response.configurationPackageTimestamp === "") {
                            failure();
                        } else {
                            data.accessPackageTimestamp = response.accessPackageTimestamp;
                            data.configurationPackageTimestamp = response.configurationPackageTimestamp;
                            success(response);
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
    loadClientUrl: function (obj, success, failure) {
        try {
            mService.nfs.readFile(obj.client_id + "/" + obj.country_code + "/" + "access_package" + "/" + "client_functional_access.xml", function (data) {
                var portNo;
                try {
                    data = mService.util.getXmlDocument(data);
                    portNo = ((data.documentElement.getElementsByTagName("port_no")[0].childNodes[0] !== undefined) ? (data.documentElement.getElementsByTagName("port_no")[0].childNodes[0].nodeValue) : (""));
                    mService.app.clientURL = data.documentElement.getElementsByTagName("protocol_type")[0].childNodes[0].nodeValue + "//" + data.documentElement.getElementsByTagName("domain_name")[0].childNodes[0].nodeValue + ((portNo === "") ? ("") : (":" + portNo));
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
    refreshAccessPackage: function (online, obj, timestamp, success, failure) {
        try {
            if (online) {
                mService.cvs.validatePackageRefresh(obj, timestamp, "access_package", function () {
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
                if (window.navigator.onLine) {
                    mService.cvs.validatePackageRefresh(obj, timestamp, "access_package", function () {
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
                }
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    refreshConfigurationPackage: function (online, obj, timestamp, success, failure) {
        try {
            if (online) {
                mService.cvs.validatePackageRefresh(obj, timestamp, "configuration_package", function () {
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
                if (window.navigator.onLine) {
                    mService.cvs.validatePackageRefresh(obj, timestamp, "configuration_package", function () {
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
                }
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    sendZipRequest: function (obj, timestamp, packageType, success, failure) {
        try {
            $.ajax({
                url: mService.app.cvsURL + "/" + "zip_package_enc.aspx",
                method: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    file_name: "temp_encrypted" + "/" + packageType + "_" + obj.client_id + "_" + obj.country_code + "_" + timestamp + ".zip",
                    folder_path: packageType + "/" + obj.client_id + "/" + obj.country_code
                }),
                error: function (e) {
                    try {
                        return false;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                success: function (response) {
                    try {
                        if (response.status === "true") {
                            mService.cvs.deleteExistingPackage(obj, timestamp, packageType, function () {
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
                            failure();
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
    unzipPackage: function (obj, timestamp, packageType, success, failure) {
        try {
            window.minterface("UnZip", [{
                        filePath: mService.app.root + "/" + obj.client_id + "/" + obj.country_code + "/" + packageType + "/" + packageType + "_" + obj.client_id + "_" + obj.country_code + "_" + timestamp + ".zip",
                        destination: mService.app.root + "/" + obj.client_id + "/" + obj.country_code + "/" + packageType
                    }
                ], function () {
                try {
                    mService.nfs.deleteFile(obj.client_id + "/" + obj.country_code + "/" + packageType + "/" + packageType + "_" + obj.client_id + "_" + obj.country_code + "_" + timestamp + ".zip", function () {
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
            }, function (errorMsg) {
                try {
                    mService.app.showToast("unZip_error", "pre_signup_messages");
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    validateClient: function (online, obj, success, failure) {
        try {
            if (online) {
                $.ajax({
                    url: mService.app.launchURL + "/" + "validate_client.aspx",
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        client_id: obj.client_id,
                        country_code: obj.country_code
                    }),
                    error: function (e) {
                        try {
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    success: function (response) {
                        try {
                            if (response.cvsURL === "") {
                                failure();
                            } else {
                                mService.app.cvsURL = response.cvsURL;
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } else {
                mService.nfs.readFile("my_accounts" + "/" + obj.client_id + "_" + obj.country_code + ".json", function (data) {
                    try {
                        data = JSON.parse(data);
                        mService.app.cvsURL = data.cvs_url;
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
    },
    validatePackageRefresh: function (obj, timestamp, packageType, success, failure) {
        try {
            mService.nfs.readFile(obj.client_id + "/" + obj.country_code + "/" + packageType + "/" + "last_change_timestamp.xml", function (data) {
                try {
                    if (mService.util.getXmlDocument(data).documentElement.getElementsByTagName("last_change_timestamp")[0].childNodes[0].nodeValue !== timestamp) {
                        mService.cvs.sendZipRequest(obj, timestamp, packageType, function () {
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
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function () {
                try {
                    mService.cvs.sendZipRequest(obj, timestamp, packageType, function () {
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
    }
};