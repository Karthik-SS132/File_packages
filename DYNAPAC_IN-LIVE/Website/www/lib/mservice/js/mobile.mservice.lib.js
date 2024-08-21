var mService = {
    app: {
        cleanUp: function (success, failure) {
            try {
                if (mService.app.platform == "Android") {
                    window.minterface("AppCleanUp", [], function (value) {
                        try {
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorMsg) {
                        mService.exception.handle(errorMsg);
                        success();
                    });
                } else {
                    success();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        launch: function (success, failure) {
            try {
                mService.app.load.library(function () {
                    try {
                        mService.app.load.preSignupMessages(function () {
                            try {
                                mService.presentR.load.icons.fromLib(function () {
                                    try {
                                        mService.presentR.load.icons.fromApp(function () {
                                            try {
                                                mService.presentR.load.layout(function () {
                                                    try {
                                                        mService.presentR.load.theme("app", function () {
                                                            try {
                                                                mService.presentR.load.spinner(function () {
                                                                    try {
                                                                        mService.app.load.countryCodes(function () {
                                                                            try {
                                                                                mService.application = new kendo.mobile.Application(document.body, {
                                                                                    skin: "nova"
                                                                                });
                                                                                $(document).delegate("[data-ms-widget-type = 'mLink']", "click", mService.events.mlink).delegate("[data-ms-widget-type = 'mButton']", "click", mService.events.mbutton).delegate("[data-ms-widget-type = 'msWidget']", "click", mService.events.msWidget);
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
                                                                        mService.app.showToast("load_spinner_failure", "pre_signup_messages");
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
                                                                mService.app.showToast("load_theme_failure", "pre_signup_messages");
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
                                                        mService.app.showToast("load_layout_failure", "pre_signup_messages");
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
                                                mService.app.showToast("load_icons_failure_from_app", "pre_signup_messages");
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
                                        mService.app.showToast("load_icons_failure_from_lib", "pre_signup_messages");
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
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        load: {
            countryCodes: function (success) {
                try {
                    if (mService.dSource.cache["country_codes"] === undefined) {
                        $.ajax({
                            url: "../lib/mservice/utils/country_codes.json",
                            dataType: "json",
                            async: true,
                            success: function (data) {
                                var localDSrc;
                                try {
                                    localDSrc = new kendo.data.DataSource({
                                        data: data
                                    });
                                    localDSrc.read().then(function () {
                                        try {
                                            mService.dSource.cache["country_codes"] = localDSrc;
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        };
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            error: function () {
                                try {
                                    console.error("Error loading country codes");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }
                        });
                    } else {
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            library: function (success, failure) {
                try {
                    mService.app.load.script(function () {
                        try {
                            mService.api.location.registerStateChange();
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
            preSignupMessages: function (success, failure) {
                try {
                    $.ajax({
                        url: "../lib/mservice/utils/pre_signup_messages.json",
                        dataType: "json",
                        async: true,
                        success: function (data) {
                            try {
                                mService.config.label.src["pre_signup_messages"] = data;
                                mService.app.load.preSignupMessagesFromApp(function () {
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
            preSignupMessagesFromApp: function (success) {
                try {
                    $.ajax({
                        url: "../utils/label/pre_signup_messages.json",
                        dataType: "json",
                        async: true,
                        success: function (data) {
                            try {
                                $.extend(true, mService.config.label.src["pre_signup_messages"], data);
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        error: function () {
                            try {
                                success();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            script: function (success, failure) {
                try {
                    $.ajax({
                        url: "../lib/mservice/js/" + mService.app.load.variable.libraryList[mService.app.load.variable.libraryListCounter],
                        dataType: "script",
                        async: true,
                        cache: true,
                        success: function () {
                            try {
                                mService.app.load.variable.libraryListCounter++;
                                if (mService.app.load.variable.libraryListCounter < mService.app.load.variable.libraryList.length) {
                                    mService.app.load.script(function () {
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
                                    mService.app.load.variable.libraryListCounter = 0;
                                    success();
                                }
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
            systemMessages: function (success, failure) {
                try {
                    mService.config.label.get("system_messages", function () {
                        try {
                            mService.config.label.get("home_layout", function () {
                                try {
                                    mService.config.label.get("my_settings", function () {
                                        try {
                                            mService.config.label.get("my_permission", function () {
                                                try {
                                                    mService.config.label.get("my_profile", function () {
                                                        try {
                                                            mService.config.label.get("my_notification", function () {
                                                                try {
                                                                    mService.config.label.get("my_accounts", function () {
                                                                        try {
                                                                            mService.config.label.get("change_password", function () {
                                                                                try {
                                                                                    mService.config.label.get("my_language", function () {
                                                                                        try {
                                                                                            mService.config.label.get("punch_in_out", function () {
                                                                                                try {
                                                                                                    mService.config.label.get("security_code_verification", function () {
                                                                                                        try {
                                                                                                            success();
                                                                                                        } catch (exception) {
                                                                                                            mService.exception.handle(exception);
                                                                                                        }
                                                                                                    }, function () {
                                                                                                        try {
                                                                                                            mService.app.showToast("load_security_code_verification_label_failure", "pre_signup_messages");
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
                                                                                                    mService.app.showToast("load_punch_in_out_label_failure", "pre_signup_messages");
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
                                                                                            mService.app.showToast("load_my_language_label_failure", "pre_signup_messages");
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
                                                                                    mService.app.showToast("load_change_password_label_failure", "pre_signup_messages");
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
                                                                            mService.app.showToast("load_my_accounts_label_failure", "pre_signup_messages");
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
                                                                    mService.app.showToast("load_my_notification_label_failure", "pre_signup_messages");
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
                                                            mService.app.showToast("load_my_profile_label_failure", "pre_signup_messages");
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
                                                    mService.app.showToast("load_my_permission_label_failure", "pre_signup_messages");
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
                                            mService.app.showToast("load_my_settings_label_failure", "pre_signup_messages");
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
                                    mService.app.showToast("load_home_layout_label_failure", "pre_signup_messages");
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
                            mService.app.showToast("load_system_messages_failure", "pre_signup_messages");
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            variable: {
                libraryList: ["config.lib.js", "widgets.lib.js", "dSource.lib.js", "fcm.lib.js", "cvs.lib.js", "nfs.lib.js", "queue.lib.js", "containR.lib.js", "presentR.lib.js", "util.lib.js", "api.lib.js", "security.lib.js", "settings.lib.js", "layout.lib.js", "permissions.lib.js", "auth.lib.js"],
                libraryListCounter: 0
            }
        },
        channel: "mobile",
        startService: function () {
            var iObj;
            try {
                iObj = {
                    app_id: mService.app.id,
                    platform: mService.app.platform,
                    device_id: mService.app.device_id,
                    client_id: mService.app.getClientId(),
                    country_code: mService.app.getCountryCode(),
                    locale_id: mService.app.getLocaleId(),
                    session_id: mService.app.getSessionId(),
                    user_Id: mService.app.getUserId(),
                    employee_id: mService.app.getEmployeeId(),
                    client_url: mService.app.clientURL,
                    cvs_url: mService.app.cvsURL,
                    store_name: mService.app.storeName
                };
                if (mService.app.platform == "Android") {
                    window.minterface("ServiceCheck", [], function (value) {
                        try {
                            mService.nfs.readFile("app_controller.json", function (appController) {
                                try {
                                    appController = JSON.parse(appController);
                                    appController.location_check = value;
                                    mService.nfs.createFile("app_controller.json", JSON.stringify(appController), function () {
                                        try {
                                            if (value == "false") {
                                                mService.app.startServiceCall(iObj);
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            if (value == "false") {
                                                mService.app.startServiceCall(iObj);
                                            }
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
                                    appController.location_check = value;
                                    mService.nfs.createFile("app_controller.json", JSON.stringify(appController), function () {
                                        try {
                                            if (value == "false") {
                                                mService.app.startServiceCall(iObj);
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            if (value == "false") {
                                                mService.app.startServiceCall(iObj);
                                            }
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
                    }, function (errorMsg) {
                        mService.exception.handle(errorMsg);
                        mService.app.startServiceCall(iObj);
                    });
                } else {
                    mService.app.startServiceCall(iObj);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        startServiceCall: function (iObj) {
            try {
                window.minterface("StartService", [iObj], function () {
                    try {
                        return true;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (errorMsg) {
                    try {
                        mService.app.showToast("start_service_failure", "system_messages");
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
        environment: {
            activeDomainCode: "",
            activeDomainName: ""
        },
        fcmAppID: "",
        appPauseState: "",
        notificationOpenedInd: false,
        chatNotificationData: "",
        currentScreenID: "",
        forceLogin: "",
        layoutSettingsConfig: {},
        locationPermissionInd: false,
        locationPermissionGranted: false,
        locationPermissionStatus: "",
        getAppVersion: function (success, failure) {
            try {
                window.minterface("AppVersion", [], function (appVersion) {
                    try {
                        mService.app.appVersion = appVersion.version;
                        mService.app.buildNumber = appVersion.build;
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (errorMsg) {
                    try {
                        mService.exception.handle(errorMsg);
                        mService.app.showToast("get_app_version_failure", "system_messages");
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getClientId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.context.client_id : mService.visitor.profile.context.client_id;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getCountryCode: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.context.country_code : mService.visitor.profile.context.country_code;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getDefaultLocaleId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.visitor.profile.context.locale_id : mService.visitor.profile.context.locale_id;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getDeviceProfile: function (success, failure) {
            try {
                window.minterface("DeviceInfo", [], function (deviceInfo) {
                    try {
                        mService.app.device_version = deviceInfo.version;
                        mService.app.device_id = deviceInfo.uuid;
                        mService.app.platform = deviceInfo.platform;
                        mService.app.model = deviceInfo.model;
                        mService.app.manufacturer = deviceInfo.manufacturer;
                        mService.app.serial = deviceInfo.serial;
                        mService.app.timeZone = deviceInfo.timeZone;
                        mService.app.sdkVersion = deviceInfo.sdkVersion;
                        mService.app.productName = deviceInfo.productName;
                        mService.app.applicationName = deviceInfo.applicationName;
                        if (mService.app.platform == 'iOS') {
                            window.minterface("GetUniqueDeviceId", [], function (device_id) {
                                try {
                                    mService.app.device_id = device_id;
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
                }, function (errorMsg) {
                    try {
                        mService.app.showToast("deviceInfo_error", "system_messages");
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
        getEmployeeId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.employee_id : "";
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getCompanyName: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.company_name : ((mService.visitor.profile.login.company_name === undefined) ? ("") : (mService.visitor.profile.login.company_name));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getFirstPage: function () {
            var layoutFeatures,
            currentFeature,
            displayOrder,
            returnData;
            displayOrder = 1;
            try {
                mService.presentR.util.getLayoutSettings(function (layoutSettings) {
                    try {
                        layoutFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                            try {
                                return e.p_parent_feature_group === "HOMELAYOUT";
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        if (layoutSettings["mobile.home.layout.template"] === "tile" && layoutFeatures.length > 1) {
                            returnData = "home_tile";
                        } else {
                            while (true) {
                                if (layoutFeatures.length === 0) {
                                    break;
                                } else {
                                    currentFeature = $.grep(layoutFeatures, function (e, i) {
                                        try {
                                            return e.p_child_display_order === displayOrder.toString();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    })[0];
                                    displayOrder++;
                                    if (currentFeature !== undefined) {
                                        returnData = currentFeature.p_child_screen_id;
                                        break;
                                    }
                                }
                            };
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        mService.app.showToast("error_theme_settings_read", "pre_signup_messages");
                        return "";
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                return returnData;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getFuncAccess: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.funcAccess : mService.visitor.profile.funcAccess;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getLocaleId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.context.locale_id : mService.visitor.profile.context.locale_id;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getPackageName: function (success, failure) {
            try {
                window.minterface("GetPackageName", [], function (packageName) {
                    try {
                        mService.app.id = packageName;
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (errorMsg) {
                    try {
                        mService.app.showToast("GetPackageName_error", "pre_signup_messages");
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
        getLocationFetchInterval: function () {
            try {
                return mService.app.getProfileId() === "U" ? ((mService.user.profile.login.location_fetch_interval_in_seconds === undefined) ? ("0") : (mService.user.profile.login.location_fetch_interval_in_seconds)) : ((mService.visitor.profile.login.location_fetch_interval_in_seconds === undefined) ? ("0") : (mService.visitor.profile.login.location_fetch_interval_in_seconds));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getProfileId: function () {
            try {
                return mService.user.profile.context.client_id !== "" ? "U" : "V";
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getScreenId: function () {
            try {
                return mService.application.view().id.replace(".html", "").replace("#", "");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getSessionId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.context.session_id : mService.visitor.profile.context.session_id;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getTimezoneId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.timezone_id : mService.visitor.profile.login.timezone_id;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getUserId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.context.user_id : mService.visitor.profile.context.user_id;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getTitle: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.title : mService.visitor.profile.login.title;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getFirstName: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.first_name : mService.visitor.profile.login.first_name;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getLastName: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.last_name : mService.visitor.profile.login.last_name;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getMobileNo: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.mobile_no : mService.visitor.profile.login.mobile_no;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getEmailId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.email_id : mService.visitor.profile.login.email_id;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getSolution: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.solution : mService.visitor.profile.login.solution;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getVertical: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.vertical : mService.visitor.profile.login.vertical;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getClientGroup: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.clientgroup : mService.visitor.profile.login.clientgroup;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        isMultipleAccountsAllowed: function () {
            try {
                if (mService.app.appSettings.querySelector("allow_multiple_accounts")) {
                    return (mService.app.appSettings.documentElement.getElementsByTagName("allow_multiple_accounts")[0].childNodes[0].nodeValue).toLowerCase() === "true" ? true : false;
                } else {
                    console.error("allow_multiple_accounts node not found in app_settings.xml");
                    return false;
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        isLatestVersion: function (success, failure) {
            try {
                mService.app.getPackageName(function () {
                    try {
                        mService.app.getAppVersion(function () {
                            try {
                                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "access_package" + "/" + "app_version.json", function (data) {
                                    try {
                                        data = JSON.parse(data);
                                        mService.app.productVersion = data;
                                        if (mService.app.productVersion[mService.app.id] === mService.app.appVersion) {
                                            success();
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
        },
        launchURL: "",
        loadAppSettings: function (success, failure) {
            try {
                $.ajax({
                    url: "../app_settings.xml",
                    dataType: "xml",
                    success: function (data) {
                        try {
                            mService.app.appSettings = data;
                            mService.visitor.profile.context.session_id = data.documentElement.getElementsByTagName("default_session_id")[0].childNodes[0].nodeValue;
                            mService.visitor.profile.context.user_id = data.documentElement.getElementsByTagName("default_user_id")[0].childNodes[0].nodeValue;
                            mService.visitor.profile.context.client_id = data.documentElement.getElementsByTagName("default_client_id")[0].childNodes[0].nodeValue;
                            mService.visitor.profile.context.locale_id = data.documentElement.getElementsByTagName("default_locale_id")[0].childNodes[0].nodeValue;
                            mService.app.name = data.documentElement.getElementsByTagName("app_name")[0].childNodes[0].nodeValue;
                            mService.app.fcmAppID = data.documentElement.getElementsByTagName("fcm_app_id")[0].childNodes[0].nodeValue;
                            mService.app.forceLogin = data.documentElement.getElementsByTagName("force_login")[0].childNodes[0].nodeValue;
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
        loadAppController: function (success) {
            var environment,
            accountData;
            try {
                mService.nfs.readFile("my_accounts" + "/" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json", function (accountData) {
                    try {
                        accountData = JSON.parse(accountData);
                        mService.app.launchURL = mService.app.appSettings.documentElement.getElementsByTagName("environment_list")[0].getElementsByTagName(accountData.active_domain_code)[0].getElementsByTagName("launch_url")[0].childNodes[0].nodeValue;
                        mService.app.activeDomainCode = accountData.active_domain_code;
                        mService.app.activeDomainName = accountData.active_domain_name;
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    environment = {
                        activeDomainName: "Production",
                        activeDomainCode: "production"
                    };
                    try {
                        mService.app.launchURL = mService.app.appSettings.documentElement.getElementsByTagName("environment_list")[0].getElementsByTagName(environment.activeDomainCode)[0].getElementsByTagName("launch_url")[0].childNodes[0].nodeValue;
                        mService.app.activeDomainCode = environment.activeDomainCode;
                        mService.app.activeDomainName = environment.activeDomainName;
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        loadAppInfo: function (success, failure) {
            try {
                $.ajax({
                    url: "../app_info.xml",
                    dataType: "xml",
                    success: function (data) {
                        mService.app.storeName = data.documentElement.getElementsByTagName("store")[0].childNodes[0].nodeValue;
                        success();
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
        loadMapAPI: function () {
            try {
                mService.api.map.init(function () {
                    try {
                        return true;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (errorCode) {
                    try {
                        console.error("MAP: location API key is not valid");
                        return false;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        permissions: "android.permission.WRITE_EXTERNAL_STORAGE,android.permission.READ_EXTERNAL_STORAGE",
        profile: {
            initiateProfile: function () {
                mService.user.resetProfile();
                mService.config.controller.src = {};
                mService.config.rule.src = {};
                mService.config.ui.src = {};
                for (var key in mService.config.label.src) {
                    if (key !== "pre_signup_messages") {
                        delete mService.config.label.src[key];
                    }
                };
                for (var key in mService.containR.variable) {
                    if (key !== "viewAttributes" && key !== "configFilesList" && key !== "configFilesListCounter" && key !== "configFilesArray" && key !== "draftPages" && key !== "draftPagesCounter" && key !== "draftFields" && key !== "draftFieldsCounter") {
                        delete mService.containR.variable[key];
                    }
                };
                mService.widgets.variable.msChat.variable = {};
                mService.dSource.cache = {};
            },
            loadMyAccounts: function (success, failure) {
                try {
                    mService.app.profile.initiateProfile();
                    window.minterface("getMyAccountsData", [{
                                "folderPath": mService.app.root + "/" + "my_accounts"
                            }
                        ], function (accountsData) {
                        try {
                            accountsData = JSON.parse(accountsData);
                            if (accountsData.length > 0) {
                                var activeAccount = $.grep(accountsData, function (e, i) {
                                    return e.active_ind === true;
                                })[0];
                                if (activeAccount !== undefined) {
                                    mService.user.isKnownUser(activeAccount, function () {
                                        try {
                                            mService.visitor.isKnownVisitor(activeAccount, function () {
                                                try {
                                                    mService.setCvsBase(false, function () {
                                                        try {
                                                            mService.app.loadAppController(function () {
                                                                try {
                                                                    mService.home.init(false, false);
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
                                                            mService.spinner.hide();
                                                            mService.app.exit();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    mService.app.loadAppController(function () {
                                                        try {
                                                            mService.spinner.hide();
                                                            mService.app.splash.hide();
                                                            mService.page.change("welcome");
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
                                    }, function () {
                                        try {
                                            mService.visitor.isKnownVisitor(activeAccount, function () {
                                                try {
                                                    mService.setCvsBase(false, function () {
                                                        try {
                                                            mService.app.loadAppController(function () {
                                                                try {
                                                                    mService.home.init(false, false);
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
                                                            mService.spinner.hide();
                                                            mService.app.exit();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    mService.app.loadAppController(function () {
                                                        try {
                                                            mService.spinner.hide();
                                                            mService.app.splash.hide();
                                                            mService.page.change("welcome");
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
                                    });
                                } else {
                                    failure();
                                }
                            } else {
                                failure();
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
            }
        },
        root: "",
        security: {
            authUser: function (obj, success, failure) {
                try {
                    if (window.navigator.onLine) {
                        $.ajax({
                            url: mService.app.clientURL + "/api/security/authenticate_user",
                            method: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({
                                context: {
                                    sessionId: mService.app.getSessionId(),
                                    userId: mService.app.getUserId(),
                                    client_id: obj.client_id,
                                    locale_id: obj.locale_id,
                                    country_code: obj.country_code,
                                    auth_request: {
                                        p_company_id: obj.client_id,
                                        p_country_code: obj.country_code,
                                        p_user_id: obj.user_id,
                                        p_passwd: obj.password,
                                        p_device: mService.app.device_id,
                                        p_browser: mService.app.id + "/" + mService.app.platform + "/" + mService.app.storeName,
                                        p_ip_address: "",
                                        p_channel_id: "MOBILE"
                                    }
                                }
                            }),
                            error: function () {
                                try {
                                    mService.app.showToast("invalid_credentials", "system_messages");
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            success: function (response) {
                                try {
                                    if (JSON.parse(response).ApplicationException === null) {
                                        mService.app.updateAuthProfile(JSON.parse(response), obj.user_id, function () {
                                            try {
                                                mService.util.updateAppTimeZone(function () {
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
                                                failure();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        mService.app.showToast("invalid_credentials", "system_messages", {
                                            key: JSON.parse(response).ApplicationException.errorDescription
                                        });
                                        failure();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }
                        });
                    } else {
                        mService.spinner.hide();
                        mService.app.showToast("internet_connection_error", "system_messages");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            setBase: function (online, success, failure) {
                try {
                    mService.app.sendDeviceProfile(online, function () {
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
            }
        },
        openHomeScreen: function () {
            try {
                if (mService.app.getScreenId() !== mService.app.getFirstPage()) {
                    mService.page.change(mService.app.getFirstPage());
                } else {
                    mService.presentR.layout.activate(mService.application.view().id.replace("#", "").replace(".html", ""));
                };
                mService.home.functionalDrawer.activate();
                mService.presentR.page.refresh();
                mService.api.permission.sendPermissionStatus("");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        processAppBase: function () {
            try {
                mService.setAppBase(function () {
                    try {
                        mService.home.initializePopups(function () {
                            try {
                                mService.app.profile.loadMyAccounts(function () {
                                    try {
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.app.loadAppController(function () {
                                            try {
                                                mService.spinner.hide();
                                                mService.app.splash.hide();
                                                mService.page.change("welcome");
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
                }, function () {
                    try {
                        mService.spinner.hide();
                        mService.app.exit();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        updateLogout: function (success, failure) {
            try {
                $.ajax({
                    async: false,
                    url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=security&serviceName=signout_user",
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        context: {
                            "sessionId": mService.app.getSessionId(),
                            "userId": mService.app.getUserId(),
                            "client_id": mService.app.getClientId(),
                            "locale_id": mService.app.getLocaleId(),
                            "country_code": mService.app.getCountryCode(),
                            "inputparam": {
                                "p_logout_date": mService.util.date.getDateTimeString(mService.util.date.getNewDate(), "yyyy-MM-dd"),
                                "p_logout_hour": mService.util.date.getDateTimeString(mService.util.date.getNewDate(), "HH"),
                                "p_logout_minute": mService.util.date.getDateTimeString(mService.util.date.getNewDate(), "mm")
                            }
                        }
                    }),
                    success: function (response) {
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
        processLogout: function () {
            try {
                mService.spinner.show();
                if (window.navigator.onLine) {
                    mService.containR.util.checkLocalQueueFiles(mService.app.getClientId(), mService.app.getCountryCode(), function () {
                        try {
                            mService.containR.util.getQueueSyncIndicator("", function (ind) {
                                try {
                                    if (ind === "true") {
                                        mService.app.updateLogout(function () {
                                            try {
                                                var obj = {
                                                    client_id: mService.visitor.profile.context.client_id,
                                                    country_code: mService.visitor.profile.context.country_code,
                                                    user_id: mService.visitor.profile.context.user_id,
                                                    password: "",
                                                    client_url: mService.app.clientURL,
                                                    location_update_ind: "false",
                                                    locale_id: "en-us",
                                                    device_id: mService.app.device_id,
                                                    active_ind: true,
                                                    cvs_url: mService.app.cvsURL,
                                                    client_url: mService.app.clientURL,
                                                    session_id: mService.app.getSessionId(),
                                                    employee_id: mService.app.getEmployeeId(),
                                                    company_name: mService.app.getCompanyName(),
                                                    active_domain_code: mService.app.activeDomainCode,
                                                    active_domain_name: mService.app.activeDomainName,
                                                    location_fetch_interval_in_seconds: mService.app.getLocationFetchInterval()
                                                };
                                                if (parseInt(mService.app.getLocationFetchInterval()) != 0) {
                                                    obj.location_update_ind = "true";
                                                } else {
                                                    obj.location_update_ind = "false";
                                                };
                                                mService.util.updateMyAccountsFile(obj, function () {
                                                    try {
                                                        mService.app.sendAppInfo(function () {
                                                            try {
                                                                mService.nfs.deleteFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "user_profile.json", function () {
                                                                    try {
                                                                        mService.user.resetProfile();
                                                                        mService.util.updateAppTimeZone(function () {
                                                                            try {
                                                                                mService.app.showToast("logout_success", "system_messages");
                                                                                window.plugins.OneSignal.disablePush(true);
                                                                                mService.spinner.hide();
                                                                                if (mService.app.forceLogin === "true") {
                                                                                    mService.page.change("login");
                                                                                } else {
                                                                                    if (mService.app.getFuncAccess().length === 0) {
                                                                                        mService.page.change("login");
                                                                                        if ($("#" + mService.app.getScreenId() + " [data-ms-layout-role='tile']").length !== 0) {
                                                                                            if (mService.app.getScreenId() === "home_tile") {
                                                                                                mService.presentR.config.ui.loadMenus("home_tile");
                                                                                                mService.presentR.util.loadLabelFiles();
                                                                                            };
                                                                                        }
                                                                                    } else {
                                                                                        if (mService.app.getScreenId() !== mService.app.getFirstPage()) {
                                                                                            mService.page.change(mService.app.getFirstPage());
                                                                                            mService.home.functionalDrawer.activate();
                                                                                        };
                                                                                        mService.presentR.layout.activate(mService.application.view().id.replace("#", "").replace(".html", ""));
                                                                                        mService.home.functionalDrawer.activate();
                                                                                        $('[data-ms-widget-type= "mLink"][data-ms-link-group="home_layout"][data-ms-link-role="my_notification"]').hide();
                                                                                        mService.presentR.page.refresh();
                                                                                    };
                                                                                };
                                                                                mService.dSource.loadCachedDataSource();
                                                                            } catch (exception) {
                                                                                mService.exception.handle(exception);
                                                                            }
                                                                        }, function () {
                                                                            try {
                                                                                mService.app.exit();
                                                                            } catch (exception) {
                                                                                mService.exception.handle(exception);
                                                                            }
                                                                        });
                                                                    } catch (exception) {
                                                                        mService.exception.handle(exception);
                                                                    }
                                                                }, function () {
                                                                    var obj;
                                                                    try {
                                                                        obj = {
                                                                            client_id: mService.app.getClientId(),
                                                                            country_code: mService.app.getCountryCode(),
                                                                            user_id: mService.app.getUserId(),
                                                                            password: "",
                                                                            client_url: mService.app.clientURL,
                                                                            location_update_ind: "true",
                                                                            locale_id: mService.app.getLocaleId(),
                                                                            device_id: mService.app.device_id,
                                                                            active_ind: true,
                                                                            cvs_url: mService.app.cvsURL,
                                                                            client_url: mService.app.clientURL,
                                                                            session_id: mService.app.getSessionId(),
                                                                            employee_id: mService.app.getEmployeeId(),
                                                                            company_name: mService.app.getCompanyName(),
                                                                            active_domain_code: mService.app.activeDomainCode,
                                                                            active_domain_name: mService.app.activeDomainName,
                                                                            location_fetch_interval_in_seconds: mService.app.getLocationFetchInterval()
                                                                        };
                                                                        if (parseInt(mService.app.getLocationFetchInterval()) != 0) {
                                                                            obj.location_update_ind = "true";
                                                                        } else {
                                                                            obj.location_update_ind = "false";
                                                                        };
                                                                        mService.util.updateMyAccountsFile(obj, function () {
                                                                            try {
                                                                                mService.app.sendAppInfo(function () {
                                                                                    try {
                                                                                        mService.spinner.hide();
                                                                                        mService.app.showToast("logout_failure", "system_messages");
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                }, function () {
                                                                                    try {
                                                                                        mService.spinner.hide();
                                                                                        mService.app.showToast("update_app_info_error", "system_messages");
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                });
                                                                            } catch (exception) {
                                                                                mService.exception.handle(exception);
                                                                            }
                                                                        }, function () {
                                                                            try {
                                                                                mService.spinner.hide();
                                                                                mService.app.showToast("create_accounts_file_error", "system_messages");
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
                                                        }, function () {
                                                            try {
                                                                mService.spinner.hide();
                                                                mService.app.showToast("update_app_info_error", "system_messages");
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.spinner.hide();
                                                        mService.app.showToast("create_accounts_file_error", "system_messages");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.spinner.hide();
                                                mService.app.showToast("logout_failure", "system_messages");
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else if (ind === "false") {
                                        mService.spinner.hide();
                                        mService.app.showToast("logout_failure_call_sync_pending", "system_messages");
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (error_code) {
                                try {
                                    mService.spinner.hide();
                                    mService.app.showToast("logout_failure_call_sync_pending", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (param) {
                        try {
                            mService.spinner.hide();
                            mService.app.showToast("logout_failure_call_sync_pending", "system_messages");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    })
                } else {
                    mService.spinner.hide();
                    mService.app.showToast("internet_connection_error", "system_messages");
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        processPermissionSuccess: function () {
            try {
                mService.app.splash.show();
                mService.spinner.show();
                mService.app.processAppBase();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        sendAppInfo: function (success, failure) {
            try {
                window.minterface("UpdateAppInfo", [{
                            app_id: mService.app.id,
                            platform: mService.app.platform,
                            device_id: mService.app.device_id,
                            client_id: mService.app.getClientId(),
                            country_code: mService.app.getCountryCode(),
                            locale_id: mService.app.getLocaleId(),
                            session_id: mService.app.getSessionId(),
                            user_Id: mService.app.getUserId(),
                            employee_id: mService.app.getEmployeeId(),
                            client_url: mService.app.clientURL,
                            cvs_url: mService.app.cvsURL,
                            store_name: mService.app.storeName
                        }
                    ], function () {
                    try {
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (errorMsg) {
                    try {
                        mService.app.showToast("updateAppInfo_error", "pre_signup_messages");
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
        sendDeviceProfile: function (online, success, failure) {
            var visitorID;
            try {
                if (online) {
                    visitorID = mService.app.getProfileId() === "V" ? mService.visitor.profile.login.visitor_id : "";
                    mService.dSource.saveCustomInfo({
                        scrID: "pre_signup_messages",
                        inAppCode: "device_profile",
                        successToast: false,
                        failureToast: true,
                    }, {
                        code: "'device_profile'",
                        headerXml: "'" + JSON.stringify({
                            "model": mService.app.model,
                            "platform": mService.app.platform,
                            "manufacturer": mService.app.manufacturer,
                            "device_version": mService.app.device_version,
                            "app_version": mService.app.appVersion,
                            "channel_id": "mobile",
                            "app_id": mService.app.id,
                            "device_id": mService.app.device_id,
                            "visitor_id": visitorID
                        }) + "'"
                    }, function () {
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
        },
        showToast: function (code, screenID, obj) {
            var currentConfiguration;
            try {
                obj = ((obj === undefined || obj === "") ? ({}) : (obj));
                currentConfiguration = ((screenID === "pre_signup_messages") ? (mService.config.label.src[screenID]) : (mService.config.label.src[screenID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]));
                if (mService.app.platform == "iOS") {
                    if (currentConfiguration["toastMessages"][code] !== undefined) {
                        window.plugins.toast.showWithOptions({
                            message: kendo.template(currentConfiguration["toastMessages"][code])(obj),
                            duration: "long",
                            position: "bottom"
                        });
                    }
                } else {
                    if (currentConfiguration["toastMessages"][code] !== undefined) {
                        window.minterface("showToastWithOptions", [{
                                    message: kendo.template(currentConfiguration["toastMessages"][code])(obj),
                                    duration: "long",
                                    position: "bottom"
                                }
                            ], function (message) {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                mService.exception.handle(errorMsg);
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
        confirmMessage: function (confirmCode, screenID, obj) {
            var confirmMsg,
            confirmResult,
            currentConfiguration;
            try {
                obj = ((obj === undefined || obj === "") ? ({}) : (obj));
                currentConfiguration = ((screenID === "pre_signup_messages") ? (mService.config.label.src[screenID]) : (mService.config.label.src[screenID + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]));
                confirmMsg = kendo.template(currentConfiguration["confirmMessages"][confirmCode])(obj);
                if (confirmMsg === undefined) {
                    confirmMsg = confirmCode;
                };
                confirmResult = confirm(confirmMsg);
                return confirmResult;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        updateAuthProfile: function (obj, userID, success, failure) {
            try {
                mService.user.profile.context.client_id = obj.auth_response_login_profile.p_client_id;
                mService.user.profile.context.country_code = obj.auth_response_login_profile.p_country_id;
                mService.user.profile.context.locale_id = obj.auth_response_login_profile.p_locale_id;
                mService.user.profile.context.session_id = obj.auth_response_login_profile.p_guid;
                mService.user.profile.context.user_id = userID;
                mService.user.getProfile(function () {
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
        },
        validateVersion: function (success, failure) {
            try {
                mService.app.getPackageName(function () {
                    try {
                        mService.app.getAppVersion(function () {
                            try {
                                mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "access_package/app_version.json", function (data) {
                                    try {
                                        mService.app.productVersion = JSON.parse(data);
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
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        validateAppState: function (appStateInfo, success, failure) {
            try {
                if (mService.app.platform === "iOS") {
                    var appVersionSplit = mService.app.appVersion.split("."),
                    authIndAppVersionSplit = appStateInfo.appVersion.split(".");
                    if (appStateInfo.validDevice === "false") {
                        failure("InvalidDevice");
                    } else {
                        if (appVersionSplit[0] !== authIndAppVersionSplit[0] || appVersionSplit[1] !== authIndAppVersionSplit[1]) {
                            failure("appVersion");
                        } else {
                            success();
                        }
                    }
                } else {
                    if (appStateInfo.validDevice === "false") {
                        failure("InvalidDevice");
                    } else {
                        if (mService.app.appVersion !== appStateInfo.appVersion) {
                            failure("appVersion");
                        } else {
                            success();
                        }
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getAppStateInfo: function (success, failure) {
            try {
                window.minterface("GetAppStateInfo", [{
                            app_id: mService.app.id,
                            platform: mService.app.platform,
                            device_id: mService.app.device_id,
                            client_id: mService.app.getClientId(),
                            country_code: mService.app.getCountryCode(),
                            locale_id: mService.app.getLocaleId(),
                            session_id: mService.app.getSessionId(),
                            user_Id: mService.app.getUserId(),
                            client_url: mService.app.clientURL,
                            cvs_url: mService.app.cvsURL,
                            store_name: mService.app.storeName
                        }
                    ], function (data) {
                    try {
                        success(data);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (errorMsg) {
                    try {
                        mService.app.showToast("getAppStateInfo_error", "pre_signup_messages");
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
        exit: function () {
            try {
                setTimeout(function () {
                    try {
                        navigator.app.exitApp();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, 1000);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        splash: {
            hide: function () {
                try {
                    navigator.splashscreen.hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    navigator.splashscreen.show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    exception: {
        handle: function (ex) {
            var today,
            dateTime;
            try {
                today = mService.util.date.getNewDate();
                dateTime = mService.util.date.getDateTimeString(((!isNaN(today)) ? (today) : (new Date())), "yyyy-MM-dd");
                timeStamp = mService.util.date.getDateTimeString(((!isNaN(today)) ? (today) : (new Date())), "HH:mm:ss:fff");
                console.log(ex);
                window.minterface("CreateDirectory", [{
                            filePath: mService.app.root + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "exception" + "/" + dateTime
                        }
                    ], function () {
                    try {
                        mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "exception" + "/" + dateTime + "/" + "App_" + timeStamp + ".txt", ex, function () {
                            try {
                                return true;
                            } catch (exception) {
                                console.log(exception);
                            }
                        }, function () {
                            try {
                                return true;
                            } catch (exception) {
                                console.log(exception);
                            }
                        });
                    } catch (exception) {
                        console.log(exception);
                    }
                }, function (errorMsg) {
                    try {
                        mService.app.showToast("createDirectory_error", "pre_signup_messages");
                        console.error(errorMsg);
                        failure();
                    } catch (exception) {
                        console.log(exception);
                    }
                });
            } catch (exception) {
                console.error(exception);
            }
        }
    },
    spinner: {
        hide: function () {
            try {
                kendo.ui.progress($("body"), false);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        show: function () {
            try {
                kendo.ui.progress($("body"), true);
                $(".k-loading-mask .k-loading-image").html(kendo.template($("#ms_loading_spinner").html())({}));
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    events: {
        backbutton: function (e) {
            e.preventDefault();
            var scrID,
            chatScrrenInd,
            currentDateTime,
            layoutFeatures;
            try {
                if ($("#home_profile_popup").is(":visible")) {
                    $("#home_profile_popup").data("kendoWindow").close();
                    return true;
                } else if ($("#home_functional_drawer").is(":visible")) {
                    $("#home_functional_drawer").data("kendoMobileDrawer").hide();
                    return true;
                } else if ($("#my_asset_birthdayPopup").is(":visible")) {
                    $("#my_asset_birthdayPopup").data("kendoWindow").close();
                    return true;
                } else if ($("#home_call_info_popup").is(":visible")) {
                    $("#home_call_info_popup").data("kendoWindow").close();
                    return true;
                } else if ($("#home_device_location_popup").is(":visible")) {
                    $("#home_device_location_popup").data("kendoWindow").close();
                    return true;
                } else {
                    if (!mService.util.isPreviewPopupOpen()) {
                        if (!mService.util.isBottomSheetOpen()) {
                            mService.presentR.util.getLayoutSettings(function (layoutSettings) {
                                try {
                                    if (((mService.application.view().layout !== undefined && mService.application.view().layout.options.id === "home_layout") && layoutSettings["mobile.home.layout.template"] !== "tile") || mService.application.view().id === "#version_update" || mService.application.view().id === "version_update" || mService.application.view().id === "visitor_profile.html" || mService.app.getScreenId() === "home_tile" || mService.app.getScreenId() === "my_permissions_consent") {
                                        if (mService.events.prevBackButtonClickedTime === "") {
                                            mService.events.prevBackButtonClickedTime = (mService.app.getScreenId() === "visitor_profile" || mService.app.getScreenId() === "my_permissions_consent") ? (new Date()) : (mService.util.date.getNewDate());
                                            mService.app.showToast("exit_app_alert", (mService.app.getScreenId() === "visitor_profile" || mService.app.getScreenId() === "version_update" || mService.app.getScreenId() === "my_permissions_consent") ? "pre_signup_messages" : "system_messages");
                                        } else {
                                            currentDateTime = (mService.app.getScreenId() === "visitor_profile" || mService.app.getScreenId() === "my_permissions_consent") ? (new Date()) : (mService.util.date.getNewDate());
                                            if ((currentDateTime - mService.events.prevBackButtonClickedTime) < 3000) {
                                                mService.app.exit();
                                            } else {
                                                mService.events.prevBackButtonClickedTime = (mService.app.getScreenId() === "visitor_profile" || mService.app.getScreenId() === "my_permissions_consent") ? (new Date()) : (mService.util.date.getNewDate());
                                                mService.app.showToast("exit_app_alert", ((mService.app.getScreenId() === "visitor_profile") || (mService.app.getScreenId() === "my_permissions_consent")) ? "pre_signup_messages" : "system_messages");
                                            }
                                        }
                                    } else {
                                        layoutFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                            try {
                                                return e.p_parent_feature_group === "HOMELAYOUT";
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                        if (layoutFeatures.length === 1) {
                                            scrID = mService.app.getScreenId();
                                            if ((!mService.util.isInAppScreen(scrID)) && layoutFeatures[0].p_child_screen_id === mService.app.getScreenId().replace("_list", "")) {
                                                if (mService.events.prevBackButtonClickedTime === "") {
                                                    mService.events.prevBackButtonClickedTime = (mService.app.getScreenId() === "visitor_profile" || mService.app.getScreenId() === "my_permissions_consent") ? (new Date()) : (mService.util.date.getNewDate());
                                                    mService.app.showToast("exit_app_alert", (mService.app.getScreenId() === "visitor_profile" || mService.app.getScreenId() === "my_permissions_consent") ? "pre_signup_messages" : "system_messages");
                                                } else {
                                                    currentDateTime = (mService.app.getScreenId() === "visitor_profile" || mService.app.getScreenId() === "my_permissions_consent") ? (new Date()) : (mService.util.date.getNewDate());
                                                    if ((currentDateTime - mService.events.prevBackButtonClickedTime) < 3000) {
                                                        mService.app.exit();
                                                    } else {
                                                        mService.events.prevBackButtonClickedTime = (mService.app.getScreenId() === "visitor_profile" || mService.app.getScreenId() === "my_permissions_consent") ? (new Date()) : (mService.util.date.getNewDate());
                                                        mService.app.showToast("exit_app_alert", (mService.app.getScreenId() === "visitor_profile" || mService.app.getScreenId() === "my_permissions_consent") ? "pre_signup_messages" : "system_messages");
                                                    }
                                                }
                                            } else {
                                                if (scrID === "security_code_verification") {
                                                    mService.app.showToast("security_code_verification_back_click", "system_messages");
                                                } else if (scrID === "login" && mService.settings.variable.fromScreenId !== undefined && mService.settings.variable.fromScreenId === "welcome") {
                                                    mService.page.change("welcome");
                                                } else if (scrID === "change_password" && mService.settings.variable.fromScreen === "login") {
                                                    mService.app.openHomeScreen();
                                                } else {
                                                    mService.application.navigate("#:back");
                                                }
                                            }
                                        } else {
                                            scrID = mService.application.view().id.replace("#", "");
                                            chatScrrenInd = $("#" + scrID).attr("data-ms-chat-screen");
                                            if (mService.util.isContainRScreen(scrID) && chatScrrenInd === undefined) {
                                                if ($("#" + scrID + "_preview_popup").is(":visible")) {
                                                    $("#" + scrID + "_preview_popup").data("kendoWindow").close();
                                                    return true;
                                                } else {
                                                    if (!mService.util.isPreviewPopupOpen()) {
                                                        if (!mService.util.isBottomSheetOpen()) {
                                                            if (!mService.util.isInAppScreen(scrID)) {
                                                                mService.containR.util.handleBackClick(scrID);
                                                            } else {
                                                                if (scrID === "security_code_verification") {
                                                                    mService.app.showToast("security_code_verification_back_click", "system_messages");
                                                                } else if (scrID === "login" && mService.settings.variable.fromScreenId !== undefined && mService.settings.variable.fromScreenId === "welcome") {
                                                                    mService.page.change("welcome");
                                                                } else if (scrID === "change_password" && mService.settings.variable.fromScreen === "login") {
                                                                    mService.app.openHomeScreen();
                                                                } else {
                                                                    mService.application.navigate("#:back");
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (!($("#attachment_progress_popup").is(":visible"))) {
                                                    if (!mService.util.isPreviewPopupOpen()) {
                                                        if (!mService.util.isBottomSheetOpen()) {
                                                            if (mService.app.notificationOpenedInd) {
                                                                mService.page.change(scrID.replace("_chat", ""));
                                                                mService.app.notificationOpenedInd = false;
                                                            } else {
                                                                if (scrID === "security_code_verification") {
                                                                    mService.app.showToast("security_code_verification_back_click", "system_messages");
                                                                } else if (scrID === "login" && mService.settings.variable.fromScreenId !== undefined && mService.settings.variable.fromScreenId === "welcome") {
                                                                    mService.page.change("welcome");
                                                                } else if (scrID === "change_password" && mService.settings.variable.fromScreen === "login") {
                                                                    mService.app.openHomeScreen();
                                                                } else {
                                                                    mService.application.navigate("#:back");
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    mService.app.showToast("file_upload_download_progress_back_click", "system_messages");
                                                }
                                            }
                                        }
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("error_theme_settings_read", "pre_signup_messages");
                                    return "";
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
        deviceready: function () {
            try {
                mService.app.splash.show();
                mService.app.getDeviceProfile(function () {
                    try {
                        mService.app.cleanUp(function () {
                            try {
                                mService.app.launch(function () {
                                    try {
                                        mService.spinner.show();
                                        mService.app.getPackageName(function () {
                                            try {
                                                mService.app.root = mService.app.id.split(".")[2];
                                                navigator.splashscreen.hide();
                                                mService.spinner.hide();
                                                mService.app.loadAppSettings(function () {
                                                    try {
                                                        mService.permissions.getAppPermissions(function () {
                                                            try {
                                                                navigator.splashscreen.show();
                                                                mService.spinner.show();
                                                                mService.app.processAppBase();
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
                                                }, function () {
                                                    try {
                                                        mService.app.showToast("load_app_settings_file_failure", "pre_signup_messages");
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
                                                mService.spinner.hide();
                                                mService.app.showToast("get_package_name_error", "pre_signup_messages");
                                                mService.app.exit();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.app.exit();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.exit();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        mService.spinner.hide();
                        mService.app.showToast("get_device_profile_failure", "pre_signup_messages");
                        mService.app.exit();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        keyboardDidShow: function () {
            try {
                mService.presentR.util.resizePopup();
                if (mService.app.getScreenId() === "forgot_password" || mService.app.getScreenId() === "change_password") {
                    $("#ms_mobile_forgot_password_svg_container").hide();
                    $("#ms_mobile_change_password_svg_container").hide();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        keyboardDidHide: function () {
            try {
                mService.presentR.util.resizePopup();
                if (mService.app.getScreenId() === "forgot_password" || mService.app.getScreenId() === "change_password") {
                    $("#ms_mobile_forgot_password_svg_container").show();
                    $("#ms_mobile_change_password_svg_container").show();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        mListviewClick: function (e) {
            var scrID = mService.application.view().id;
            scrID = scrID.replace(".html", "");
            scrObj = eval(scrID);
            scrObj.linkHandler.list_click(e);
        },
        mbutton: function (e) {
            try {
                var mBtn = $(this),
                scrID,
                scrObj;
                scrID = mService.application.view().id;
                if (mBtn.attr("data-ms-button-group") === "containR") {
                    mService.containR.button[mBtn.attr("data-ms-button-subgroup")][mBtn.attr("data-ms-button-role") + "Click"](mBtn, e);
                } else {
                    if (mService.util.isContainRScreen(scrID)) {
                        scrObj = mService.containR;
                    } else {
                        scrID = scrID.replace(".html", "");
                        scrObj = eval(scrID);
                    };
                    scrObj.button[mBtn.attr("data-ms-button-group")][mBtn.attr("data-ms-button-role") + "Click"](mBtn, e);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        mlink: function () {
            var mLink = $(this),
            controllerObj,
            selectedRecord,
            paramObj,
            dSourceKey;
            try {
                if (mLink.attr("data-ms-link-group") === "containR") {
                    if (mService.util.isContainRScreen(mLink.attr("data-ms-link-role"))) {
                        controllerObj = mService.config.controller.getControllerObj(mService.app.getScreenId());
                        if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                            dSourceKey = mService.app.getScreenId();
                        } else {
                            dSourceKey = mService.app.getScreenId() + "_list";
                        };
                        if (controllerObj !== undefined && controllerObj.containR_type === "listview") {
                            if (mLink.attr("data-ms-containr-param") !== undefined) {
                                paramObj = JSON.parse(mLink.attr("data-ms-containr-param"));
                                if (paramObj.list_uid !== undefined) {
                                    selectedRecord = mService.dSource.cache[dSourceKey].getByUid(paramObj.list_uid);
                                } else {
                                    selectedRecord = mService.containR.variable[mService.app.getScreenId()].selectedRecord;
                                    selectedRecord = (selectedRecord === undefined) ? ([]) : (selectedRecord);
                                };
                                $.extend(true, paramObj, {
                                    selectedRecord: selectedRecord
                                });
                                if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                                    mService.util.restrictDoubleTap(mLink);
                                    mService.page.change(mLink.attr("data-ms-link-role"), paramObj);
                                }
                            } else {
                                if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                                    mService.util.restrictDoubleTap(mLink);
                                    mService.page.change(mLink.attr("data-ms-link-role"));
                                }
                            }
                        } else {
                            if (mLink.attr("data-ms-containr-param") !== undefined) {
                                if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                                    mService.util.restrictDoubleTap(mLink);
                                    mService.page.change(mLink.attr("data-ms-link-role"), JSON.parse(mLink.attr("data-ms-containr-param")));
                                }
                            } else {
                                if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                                    mService.util.restrictDoubleTap(mLink);
                                    mService.page.change(mLink.attr("data-ms-link-role"));
                                }
                            }
                        }
                    } else {
                        if (mLink.attr("data-ms-containr-param") !== undefined) {
                            if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                                mService.util.restrictDoubleTap(mLink);
                                mService.page.change(mLink.attr("data-ms-link-role"), JSON.parse(mLink.attr("data-ms-containr-param")));
                            }
                        } else {
                            if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                                mService.util.restrictDoubleTap(mLink);
                                mService.page.change(mLink.attr("data-ms-link-role"));
                            }
                        }
                    }
                } else if (mLink.attr("data-ms-link-group") === "pattern") {
                    if (mLink.attr("data-ms-containr-param") !== undefined) {
                        paramObj = JSON.parse(mLink.attr("data-ms-containr-param"));
                        if (paramObj.list_uid !== undefined) {
                            selectedRecord = mService.dSource.cache[mService.app.getScreenId()].getByUid(paramObj.list_uid);
                            $.extend(true, paramObj, {
                                selectedRecord: selectedRecord
                            });
                        };
                        mService.app.notificationOpenedInd = true;
                        if (mService.pattern.query !== undefined) {
                            mService.pattern.query.util.hideNotificationIndicator(($(mLink).attr("id")).replace("_container", ""));
                            mService.pattern.query.util.loadScreen(mLink.attr("data-ms-link-role"), paramObj);
                        } else {
                            if (mService.containR.variable[(mLink.attr("data-ms-link-role")).replace("_chat", "")] === undefined) {
                                mService.containR.variable[(mLink.attr("data-ms-link-role")).replace("_chat", "")] = {};
                            };
                            if (mService.containR.variable[mLink.attr("data-ms-link-role")] === undefined) {
                                mService.containR.variable[mLink.attr("data-ms-link-role")] = {};
                            };
                            $.extend(true, mService.containR.variable[mLink.attr("data-ms-link-role")], paramObj);
                            mService.containR.variable[(mLink.attr("data-ms-link-role")).replace("_chat", "")].openChatScreen = true;
                            mService.containR.init((mLink.attr("data-ms-link-role")).replace("_chat", ""));
                        }
                    }
                } else if (mLink.attr("data-ms-link-group") === "searchViewPattern") {
                    if (mLink.attr("data-ms-link-role") === "search") {
                        mService.pattern.searchview.list.button.search(mLink);
                    } else if (mLink.attr("data-ms-link-role") === "searchToggle") {
                        mService.pattern.searchview.list.button.searchToggle(mLink);
                    } else if (mLink.attr("data-ms-link-role") === "listClick") {
                        mService.pattern.searchview.list.button.openDetailScreen(mLink);
                    }
                } else if (mLink.attr("data-ms-link-group") === "attachmentPreview") {
                    if (mLink.attr("data-ms-link-role") === "view") {
                        mService.api.attachment.view(mLink);
                    }
                } else if (mLink.attr("data-ms-link-group") === "backbutton") {
                    if (mLink.attr("data-ms-link-role") === "back") {
                        mService.api.attachment.viewPopup.close(mLink);
                    }
                } else if (mLink.attr("data-ms-link-group") === "home_layout") {
                    if (mLink.attr("data-ms-link-role") === "forgot_password_popup_submit") {
                        mService.home.forgotPasswordPopup.submitClick();
                    } else if (mLink.attr("data-ms-link-role") === "login_popup_submit") {
                        mService.home.loginPopup.submitClick();
                    } else if (mLink.attr("data-ms-link-role") === "change_password_popup_submit") {
                        mService.home.changePasswordPopup.submitClick();
                    } else if (mLink.attr("data-ms-link-role") === "punch_in_popup_submit") {
                        mService.settings.punch_in_out.button.punchInSubmit();
                    } else if (mLink.attr("data-ms-link-role") === "punch_out_popup_submit") {
                        mService.settings.punch_in_out.button.punchOutSubmit();
                    } else if (mLink.attr("data-ms-link-role") === "language_popup_submit") {
                        mService.settings.my_language.button.submit();
                    } else if (mLink.attr("data-ms-link-role") === "verifySecurityCode_popup_resend") {
                        mService.security.code.verificationPopup.resend();
                    } else if (mLink.attr("data-ms-link-role") === "verifySecurityCode_popup_verify") {
                        mService.security.code.verificationPopup.verify();
                    } else if (mLink.attr("data-ms-link-role") === "functional_drawer") {
                        $("#home_functional_drawer").data("kendoMobileDrawer").show();
                    } else if (mLink.attr("data-ms-link-role") === "functional_drawer_filter") {
                        $("#home_functional_drawer_filter").data("kendoMobileDrawer").show();
                    } else if (mLink.attr("data-ms-link-role") === "change_language") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.page.change("my_language");
                        }
                    } else if (mLink.attr("data-ms-link-role") === "address_close") {
                        kendo.fx($("#location_address_container")).expand("vertical").stop().reverse();
                    } else {
                        controllerObj = mService.config.controller.getControllerObj(mService.app.getScreenId());
                        if (controllerObj !== undefined && controllerObj.pattern !== undefined && (controllerObj.containR_type === "listview" || controllerObj.containR_type === "form")) {
                            if (mService.app.getScreenId().replace("_list", "") !== mLink.attr("data-ms-link-role")) {
                                if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                                    mService.util.restrictDoubleTap(mLink);
                                    mService.page.change(mLink.attr("data-ms-link-role"));
                                }
                            }
                        } else {
                            if (mService.app.getScreenId() !== mLink.attr("data-ms-link-role")) {
                                if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                                    mService.util.restrictDoubleTap(mLink);
                                    mService.page.change(mLink.attr("data-ms-link-role"));
                                }
                            }
                        }
                    }
                } else if (mLink.attr("data-ms-link-group") === "functional_drawer") {
                    if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                        mService.util.restrictDoubleTap(mLink);
                        mService.page.change(mLink.attr("data-ms-link-role"));
                    }
                } else if (mLink.attr("data-ms-link-group") === "in_app_feature") {
                    if ($("#home_functional_drawer").is(":visible")) {
                        $("#home_functional_drawer").data("kendoMobileDrawer").hide();
                    };
                    if (mLink.attr("data-ms-link-role") === "change_password") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.page.change("change_password", {
                                "fromScreen": "functional_drawer"
                            });
                        }
                    } else if (mLink.attr("data-ms-link-role") === "change_language") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.page.change("my_language");
                        }
                    } else if (mLink.attr("data-ms-link-role") === "my_notification") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.page.change("my_notification");
                        }
                    } else if (mLink.attr("data-ms-link-role") === "logout") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.app.processLogout();
                        }
                    } else if (mLink.attr("data-ms-link-role") === "help") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.page.change("help");
                        }
                    } else if (mLink.attr("data-ms-link-role") === "punch_in" || mLink.attr("data-ms-link-role") === "punch_out") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.page.change("punch_in_out");
                        }
                    } else if (mLink.attr("data-ms-link-role") === "my_notification" || mLink.attr("data-ms-link-role") === "my_settings" || mLink.attr("data-ms-link-role") === "my_accounts" || mLink.attr("data-ms-link-role") === "my_permission" || mLink.attr("data-ms-link-role") === "my_profile" || mLink.attr("data-ms-link-role") === "signup" || mLink.attr("data-ms-link-role") === "login" || mLink.attr("data-ms-link-role") === "forgot_password") {
                        if (mLink.attr("data-ms-containr-param") !== undefined) {
                            paramObj = JSON.parse(mLink.attr("data-ms-containr-param"));
                        };
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.page.change(mLink.attr("data-ms-link-role"), paramObj);
                        }
                    } else if (mLink.attr("data-ms-link-role") === "my_profile_edit") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.settings.profile.button.edit();
                        }
                    } else if (mLink.attr("data-ms-link-role") === "my_profile_cancel") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.settings.profile.button.cancel();
                        }
                    } else if (mLink.attr("data-ms-link-role") === "my_profile_submit") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.settings.profile.button.submit();
                        }
                    } else if (mLink.attr("data-ms-link-role") === "my_profile_delete") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.settings.profile.button.deleteAccount();
                        }
                    } else if (mLink.attr("data-ms-link-role") === "delete_account_submit") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.settings.profile.deleteAccountPopup.submit();
                        }
                    } else if (mLink.attr("data-ms-link-role") === "delete_account_cancel") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.settings.profile.deleteAccountPopup.cancel();
                        }
                    } else if (mLink.attr("data-ms-link-role") === "updateVersion") {
                        if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                            mService.util.restrictDoubleTap(mLink);
                            mService.settings.version_update.button.open();
                        }
                    }
                } else if (mLink.attr("data-ms-link-group") === "chat") {
                    if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                        mService.util.restrictDoubleTap(mLink);
                        mService.page.change("chat", {
                            toMobileNo: mLink.attr("data-ms-link-role")
                        });
                    }
                } else if (mLink.attr("data-ms-link-group") === "communication_utility") {
                    if (mLink.attr("data-ms-link-role") === "phone") {
                        var contact_number = mLink.attr("data-ms-contact_number");
                        window.minterface("OpenDialPad", [{
                                    contact_number: contact_number == undefined || "" ? "" : contact_number,
                                }, ], function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                mService.exception.handle(error);
                                error = (error === "MOBILE_INVALID" || "MOBILE_NOT_AVAILABLE") ? error : "UNKNOWN";
                                mService.app.showToast(error, "system_messages");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else if (mLink.attr("data-ms-link-role") === "sms") {
                        var contact_number = mLink.attr("data-ms-contact_number"),
                        msgBody = mLink.attr("data-ms-msg-body") == undefined || "" ? "" : kendo.template(mLink.attr("data-ms-msg-body"))({});
                        window.minterface("OpenSms", [{
                                    contact_number: contact_number == undefined || "" ? "" : contact_number,
                                    msgBody: msgBody == undefined || "" ? "" : msgBody,
                                }, ], function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                mService.exception.handle(error);
                                error = (error === "MOBILE_INVALID" || "MOBILE_NOT_AVAILABLE") ? error : "UNKNOWN";
                                mService.app.showToast(error, "system_messages");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else if (mLink.attr("data-ms-link-role") === "email") {
                        var toEmail = mLink.attr("data-ms-email-to"),
                        ccEmail = mLink.attr("data-ms-email-cc"),
                        subject = mLink.attr("data-ms-email-subject") == undefined || "" ? "" : kendo.template(mLink.attr("data-ms-email-subject"))({}),
                        body = mLink.attr("data-ms-email-body") == undefined || "" ? "" : kendo.template(mLink.attr("data-ms-email-body"))({});
                        window.minterface("OpenEmail", [{
                                    toEmail: toEmail == undefined || "" ? "" : toEmail,
                                    ccEmail: ccEmail == undefined || "" ? "" : ccEmail,
                                    subject: subject == undefined || "" ? "" : subject,
                                    body: body == undefined || "" ? "" : body,
                                }, ], function (message) {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            mService.exception.handle(error);
                            error = (error === "EMAIL_INVALID" || "EMAIL_NOT_AVAILABLE") ? error : "UNKNOWN";
                            mService.app.showToast(error, "system_messages");
                        });
                    }
                } else if (mLink.attr("data-ms-link-group") === "my_notification_search") {
                    if (mLink.attr("data-ms-link-role") === "clearSearch") {
                        mService.settings.my_notification.button.clearSearch();
                    }
                } else if (mLink.attr("data-ms-link-group") === "my_notification") {
                    if (mLink.attr("data-ms-link-role") === "openNotification") {
                        if (mLink.attr("data-ms-listview-param") !== undefined) {
                            paramObj = JSON.parse(mLink.attr("data-ms-listview-param"));
                            if (paramObj.list_uid !== undefined) {
                                mService.settings.my_notification.button.openNotification(paramObj.list_uid);
                            }
                        }
                    } else if (mLink.attr("data-ms-link-role") === "deleteNotification") {
                        if (mLink.attr("data-ms-listview-param") !== undefined) {
                            paramObj = JSON.parse(mLink.attr("data-ms-listview-param"));
                            if (paramObj.list_uid !== undefined) {
                                mService.settings.my_notification.button.deleteNotification(paramObj.list_uid);
                            }
                        }
                    } else if (mLink.attr("data-ms-link-role") === "deleteAll") {
                        mService.settings.my_notification.button.deleteAll();
                    }
                } else if (mLink.attr("data-ms-link-group") === "my_accounts") {
                    if (mLink.attr("data-ms-link-role") === "addAccount") {
                        mService.settings.my_accounts.button.addAccount();
                    } else if (mLink.attr("data-ms-link-role") === "deleteAccount") {
                        if (mLink.attr("data-ms-listview-param") !== undefined) {
                            paramObj = JSON.parse(mLink.attr("data-ms-listview-param"));
                            if (paramObj.list_uid !== undefined) {
                                mService.settings.my_accounts.button.deleteAccount(paramObj.list_uid);
                            }
                        }
                    } else if (mLink.attr("data-ms-link-role") === "switchAccount") {
                        if (mLink.attr("data-ms-listview-param") !== undefined) {
                            paramObj = JSON.parse(mLink.attr("data-ms-listview-param"));
                            if (paramObj.list_uid !== undefined) {
                                mService.settings.my_accounts.button.switchAccount(paramObj.list_uid);
                            }
                        }
                    }
                } else if (mLink.attr("data-ms-link-group") === "my_permissions_consent") {
                    if (mLink.attr("data-ms-link-role") === "permission_submit") {
                        paramObj = JSON.parse(mLink.attr("data-ms-listview-param"));
                        if (paramObj.list_uid !== undefined) {
                            mService.permissions.button.submit(paramObj.list_uid);
                        }
                    } else if (mLink.attr("data-ms-link-role") === "permission_cancel") {
                        paramObj = JSON.parse(mLink.attr("data-ms-listview-param"));
                        if (paramObj.list_uid !== undefined) {
                            mService.permissions.button.cancel(paramObj.list_uid);
                        }
                    }
                } else {
                    if ($(mLink).attr('ms-data-disabled') === undefined || $(mLink).attr('ms-data-disabled') === 'false') {
                        mService.util.restrictDoubleTap(mLink);
                        mService.page.change(mLink.attr("data-ms-link-role"));
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        msWidget: function (e) {
            var msWidget;
            try {
                msWidget = $(this),
                mService.widgets.event[msWidget.attr("data-ms-widget-group")][msWidget.attr("data-ms-widget-role")](msWidget, e);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        prevBackButtonClickedTime: "",
        pause: function () {
            try {
                mService.app.appPauseState = true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        resume: function () {
            var scrID,
            controllerObj;
            try {
                mService.app.appPauseState = false;
                scrID = mService.app.getScreenId();
                if (scrID === "my_permissions_consent") {
                    if (mService.permissions.notificationSettingsInd !== undefined && mService.permissions.notificationSettingsInd) {
                        var scrollview = $("#my_permissions_consent_scrollview").data("kendoMobileScrollView");
                        if (scrollview.page !== undefined) {
                            if (mService.permissions.dataSource.data()[scrollview.page].permission === "NOTIFICATION") {
                                mService.permissions.notificationSettingsInd = false;
                                if (mService.api !== undefined) {
                                    mService.util.updatePermissionStatus();
                                };
                                mService.permissions.getOtherPermissions(mService.permissions.dataSource.data()[scrollview.page]);
                            }
                        }
                    }
                } else {
                    if (mService.api !== undefined) {
                        mService.util.updatePermissionStatus();
                    };
                    if (mService.util.isContainRScreen(scrID)) {
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj !== undefined && controllerObj.containR_type === "listview") {
                            mService.containR.button.listview.syncClick();
                        }
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        orientationchange: function () {
            var scrollViewList,
            index;
            try {
                if (window.orientation == 90 || window.orientation == -90) {
                    mService.util.isPreviewPopupOpen(true);
                } else {
                    mService.util.isPreviewPopupOpen(true);
                };
                if (mService.application.view().id === "#my_permissions_consent" || mService.application.view().id === "#security_code_verification") {
                    scrollViewList = $(mService.application.view().id + " [data-role='scrollview']");
                    for (index = 0; index < scrollViewList.length; index++) {
                        $(scrollViewList[index]).data("kendoMobileScrollView").refresh();
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    home: {
        init: function (online, allowAuth) {
            try {
                mService.spinner.show();
                mService.app.getAppVersion(function () {
                    try {
                        mService.app.sendDeviceProfile(online, function () {
                            try {
                                mService.app.getAppStateInfo(function (data) {
                                    var appStateInfo;
                                    try {
                                        if (data !== "") {
                                            appStateInfo = JSON.parse(data);
                                            mService.app.loadMapAPI();
                                            mService.presentR.resource.getClientImages(function () {
                                                try {
                                                    mService.spinner.show();
                                                    mService.user.isKnownUser("", function () {
                                                        try {
                                                            mService.util.updateAppTimeZone(function () {
                                                                try {
                                                                    mService.app.startService();
                                                                    mService.app.validateAppState(appStateInfo, function () {
                                                                        try {
                                                                            mService.fcm.init(function () {
                                                                                try {
                                                                                    try {
                                                                                        mService.app.load.systemMessages(function () {
                                                                                            var chatData;
                                                                                            try {
                                                                                                $("#home_in_app_feature_app_version").text(mService.app.appVersion);
                                                                                                if (mService.app.notificationOpenedInd) {
                                                                                                    if (mService.app.chatNotificationData.additionalData.msgBody.info.type === "chat") {
                                                                                                        chatData = mService.app.chatNotificationData.additionalData.msgBody;
                                                                                                        if (mService.containR.variable[(chatData.scrID).replace("_chat", "")] === undefined) {
                                                                                                            mService.containR.variable[(chatData.scrID).replace("_chat", "")] = {};
                                                                                                        };
                                                                                                        if (mService.containR.variable[chatData.scrID] === undefined) {
                                                                                                            mService.containR.variable[chatData.scrID] = {};
                                                                                                        };
                                                                                                        $.extend(true, mService.containR.variable[chatData.scrID], chatData);
                                                                                                        mService.containR.variable[(chatData.scrID).replace("_chat", "")].openChatScreen = true;
                                                                                                        mService.containR.init((chatData.scrID).replace("_chat", ""));
                                                                                                    } else {
                                                                                                        mService.page.change(mService.app.chatNotificationData.additionalData.msgBody.scrID, {
                                                                                                            notificationPayload: mService.app.chatNotificationData
                                                                                                        });
                                                                                                    };
                                                                                                    mService.app.chatNotificationData = "";
                                                                                                } else {
                                                                                                    mService.page.change(mService.app.getFirstPage());
                                                                                                    mService.api.permission.sendPermissionStatus("");
                                                                                                };
                                                                                                mService.home.functionalDrawer.activate();
                                                                                                mService.config.label.resolve();
                                                                                                mService.spinner.hide();
                                                                                                mService.dSource.loadCachedDataSource();
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        }, function () {
                                                                                            try {
                                                                                                mService.spinner.hide();
                                                                                                mService.app.exit();
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        });
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                } catch (exception) {
                                                                                    mService.exception.handle(exception);
                                                                                }
                                                                            }, function () {
                                                                                try {
                                                                                    mService.spinner.hide();
                                                                                    mService.app.showToast("fcm_init_failure", "pre_signup_messages");
                                                                                } catch (exception) {
                                                                                    mService.exception.handle(exception);
                                                                                }
                                                                            });
                                                                        } catch (exception) {
                                                                            mService.exception.handle(exception);
                                                                        }
                                                                    }, function (flag) {
                                                                        try {
                                                                            mService.spinner.hide();
                                                                            if (flag === "appVersion") {
                                                                                mService.page.change("version_update");
                                                                            } else {
                                                                                mService.app.showToast("device_not_registered", "pre_signup_messages");
                                                                                mService.app.exit();
                                                                            }
                                                                        } catch (exception) {
                                                                            mService.exception.handle(exception);
                                                                        }
                                                                    });
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            }, function () {
                                                                try {
                                                                    mService.spinner.hide();
                                                                    mService.app.exit();
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            });
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.util.updateAppTimeZone(function () {
                                                                try {
                                                                    mService.app.validateAppState(appStateInfo, function () {
                                                                        try {
                                                                            mService.fcm.init(function () {
                                                                                try {
                                                                                    try {
                                                                                        mService.app.load.systemMessages(function () {
                                                                                            try {
                                                                                                mService.spinner.hide();
                                                                                                if (allowAuth) {
                                                                                                    mService.auth.login.authUser(true);
                                                                                                } else {
                                                                                                    mService.app.startService();
                                                                                                    if (mService.app.getFuncAccess().length === 0) {
                                                                                                        mService.page.change("login");
                                                                                                    } else {
                                                                                                        $("#home_in_app_feature_app_version").text(mService.app.appVersion);
                                                                                                        mService.page.change(mService.app.getFirstPage());
                                                                                                        mService.home.functionalDrawer.activate();
                                                                                                        mService.config.label.resolve();
                                                                                                        mService.dSource.loadCachedDataSource();
                                                                                                        mService.api.permission.sendPermissionStatus("");
                                                                                                    }
                                                                                                }
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        }, function () {
                                                                                            try {
                                                                                                mService.spinner.hide();
                                                                                                mService.app.exit();
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        });
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                } catch (exception) {
                                                                                    mService.exception.handle(exception);
                                                                                }
                                                                            }, function () {
                                                                                try {
                                                                                    mService.spinner.hide();
                                                                                    mService.app.showToast("fcm_init_failure", "pre_signup_messages");
                                                                                } catch (exception) {
                                                                                    mService.exception.handle(exception);
                                                                                }
                                                                            });
                                                                        } catch (exception) {
                                                                            mService.exception.handle(exception);
                                                                        }
                                                                    }, function (flag) {
                                                                        try {
                                                                            mService.spinner.hide();
                                                                            if (flag === "appVersion") {
                                                                                mService.page.change("version_update");
                                                                            } else {
                                                                                mService.app.showToast("device_not_registered", "pre_signup_messages");
                                                                                mService.app.exit();
                                                                            }
                                                                        } catch (exception) {
                                                                            mService.exception.handle(exception);
                                                                        }
                                                                    });
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            }, function () {
                                                                try {
                                                                    mService.spinner.hide();
                                                                    mService.app.exit();
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
                                            }, function () {
                                                try {
                                                    mService.spinner.hide();
                                                    mService.app.showToast("client_images_failure", "pre_signup_messages");
                                                    mService.app.exit();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } else {
                                            mService.spinner.hide();
                                            mService.app.showToast("get_app_state_info_failure", "pre_signup_messages");
                                            mService.app.exit();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.spinner.hide();
                                        mService.app.showToast("get_app_state_info_failure", "pre_signup_messages");
                                        mService.app.exit();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.spinner.hide();
                                mService.app.exit();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
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
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        initializePopups: function (success) {
            try {
                mService.home.attachmentProgressPopup.init(function () {
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
        functionalDrawer: {
            activate: function () {
                var drawerFeatures;
                try {
                    drawerFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                        try {
                            return e.p_parent_feature_group === "FUNCDRAWER";
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    if (mService.app.getScreenId() !== "/" && $("#" + mService.app.getScreenId() + " [data-ms-layout-role='tile']").length !== 0) {
                        layoutFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                            try {
                                return e.p_parent_feature_group === "HOMELAYOUT";
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        if (layoutFeatures.length === 1) {
                            $('#' + mService.app.getScreenId() + ' [data-ms-widget-type= "mLink"][data-ms-link-group="home_layout"][data-ms-link-role="functional_drawer"]').show();
                            $('#' + mService.app.getScreenId() + ' [data-role="backbutton"]').hide();
                        } else {
                            if (mService.app.getScreenId() === "home_tile") {
                                $('#' + mService.app.getScreenId() + ' [data-ms-widget-type= "mLink"][data-ms-link-group="home_layout"][data-ms-link-role="functional_drawer"]').show();
                                $('#' + mService.app.getScreenId() + ' [data-role="backbutton"]').hide();
                            } else {
                                $('#' + mService.app.getScreenId() + ' [data-ms-widget-type= "mLink"][data-ms-link-group="home_layout"][data-ms-link-role="functional_drawer"]').hide();
                                $('#' + mService.app.getScreenId() + ' [data-role="backbutton"]').show();
                            }
                        }
                    } else {
                        $('[data-ms-widget-type= "mLink"][data-ms-link-group="home_layout"][data-ms-link-role="functional_drawer"]').show();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function () {
                try {
                    if ($("#home_functional_drawer_content").children().length === 0) {
                        $("#home_functional_drawer_content").append(mService.home.functionalDrawer.getDrawerHtml());
                        mService.home.functionalDrawer.loadFunctionalDrawerLabel();
                    };
                    if (mService.app.getProfileId() === "V") {
                        $("#home_functional_drawer_content").html("");
                        $("#home_in_app_feature_login").show();
                        $("#home_in_app_feature_change_password").hide();
                        $("#home_in_app_feature_logout").hide();
                    } else {
                        $("#home_in_app_feature_login").hide();
                        $("#home_in_app_feature_change_password").show();
                        $("#home_in_app_feature_logout").show();
                    };
                    if (mService.app.activeDomainCode !== "production") {
                        $("#home_functional_drawer_selected_environment").text(mService.app.activeDomainName).show();
                    } else {
                        $("#home_functional_drawer_selected_environment").hide();
                    };
                    mService.presentR.resource.applyDrawerLogo();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getDrawerHtml: function () {
                var drawerFeatures,
                count,
                displayOrder,
                currentFeature,
                returnHtml;
                try {
                    count = 0;
                    displayOrder = 1;
                    returnHtml = "";
                    drawerFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                        try {
                            return e.p_parent_feature_group === "FUNCDRAWER";
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    while (true) {
                        if (count === drawerFeatures.length) {
                            break;
                        } else {
                            currentFeature = $.grep(drawerFeatures, function (e, i) {
                                try {
                                    return e.p_child_display_order === displayOrder.toString();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            })[0];
                            displayOrder++;
                            if (currentFeature !== undefined) {
                                count++;
                                returnHtml += kendo.template($("#home_functional_drawer_feature").html())({
                                    linkRole: currentFeature.p_child_screen_id
                                });
                            }
                        }
                    };
                    return returnHtml;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getFunctionalDrawerLabel: function (scrID, success, failure) {
                try {
                    mService.config.label.get(scrID, function () {
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
            },
            loadFunctionalDrawerLabel: function () {
                var drawerFeatures;
                try {
                    drawerFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                        try {
                            return e.p_parent_feature_group === "FUNCDRAWER";
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    if (drawerFeatures.length > 0) {
                        mService.home.functionalDrawer.variable.drawerFeatureCounter = drawerFeatures.length - 1;
                        mService.home.functionalDrawer.loadLabelFiles(drawerFeatures, function () {
                            try {
                                mService.config.label.resolve();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.config.label.resolve();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.config.label.resolve();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            loadLabelFiles: function (drawerFeatures, success, failure) {
                try {
                    if (mService.home.functionalDrawer.variable.drawerFeatureCounter >= 0) {
                        mService.home.functionalDrawer.getFunctionalDrawerLabel(drawerFeatures[mService.home.functionalDrawer.variable.drawerFeatureCounter].p_child_screen_id, function () {
                            try {
                                mService.home.functionalDrawer.variable.drawerFeatureCounter--;
                                if (mService.home.functionalDrawer.variable.drawerFeatureCounter !== -1) {
                                    mService.home.functionalDrawer.loadLabelFiles(drawerFeatures, function () {
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
                                    mService.home.functionalDrawer.variable.drawerFeatureCounter = -1;
                                    success();
                                };
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.home.functionalDrawer.variable.drawerFeatureCounter--;
                                if (mService.home.functionalDrawer.variable.drawerFeatureCounter >= 0) {
                                    mService.home.functionalDrawer.loadLabelFiles(drawerFeatures, function () {
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
                                    mService.home.functionalDrawer.variable.drawerFeatureCounter = -1;
                                    success();
                                };
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            variable: {}
        },
        loginPopup: {
            init: function (success) {
                try {
                    if ($("#home_login_popup").data("kendoWindow") === undefined) {
                        $("#home_login_popup").kendoWindow({
                            width: (screen.width * 0.80),
                            title: {
                                text: "<span data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='login_popup' data-ms-lbl-id='title'>Login</span>",
                                encoded: false
                            },
                            open: function () {
                                var countryList,
                                index,
                                countryCode,
                                countryDropDown,
                                homeLoginPopup;
                                try {
                                    if (mService.app.isMultipleAccountsAllowed()) {
                                        homeLoginPopup = $("#home_login_popup");
                                        $(homeLoginPopup).find("#home_login_popup_multiple_acc_client_id_container, #home_login_popup_country_code_container").show();
                                        $(homeLoginPopup).find("#home_login_popup_multiple_acc_client_id, #home_login_popup_multiple_acc_country_code").attr('required', 'required');
                                        $(homeLoginPopup).find("#home_login_popup_country_list").hide();
                                        $("#home_login_popup_country_code").prop("required", false);
                                        if (mService.app.getScreenId() !== "visitor_profile") {
                                            $("#home_login_popup_multiple_acc_client_id").val(mService.app.getClientId()).prop('disabled', true);
                                            $("#home_login_popup_multiple_acc_country_code").val(mService.app.getCountryCode()).prop('disabled', true);
                                        } else {
                                            $("#home_login_popup_multiple_acc_client_id").val("").prop('disabled', false);
                                            $("#home_login_popup_multiple_acc_country_code").val("").prop('disabled', false);
                                        }
                                    } else {
                                        $("#home_login_popup_multiple_acc_client_id_container").hide();
                                        $("#home_login_popup_multiple_acc_country_code_container").hide();
                                        $("#home_login_popup_multiple_acc_client_id").removeAttr('required').prop('disabled', false);
                                        $("#home_login_popup_multiple_acc_country_code").removeAttr('required').prop('disabled', false);
                                    };
                                    $("#home_login_popup_user_name").val("");
                                    $("#home_login_popup_password").val("");
                                    if (!mService.app.isMultipleAccountsAllowed()) {
                                        countryList = mService.app.appSettings.documentElement.getElementsByTagName("country_list")[0];
                                        for (index = 0; index < countryList.childNodes.length; index++) {
                                            mService.home.loginPopup.variable.countryListArray.push({
                                                code: countryList.childNodes[index].nodeName,
                                                description: countryList.childNodes[index].childNodes[0].nodeValue
                                            });
                                        };
                                        if (mService.home.loginPopup.variable.countryListArray.length > 0) {
                                            countryCode = $("#home_login_popup_country_code").data('kendoDropDownList');
                                            if (countryCode === undefined || countryCode.dataSource.data().length === 0) {
                                                $("#home_login_popup_country_code").kendoDropDownList({
                                                    autoBind: false,
                                                    dataTextField: "description",
                                                    dataValueField: "code",
                                                    dataSource: mService.home.loginPopup.variable.countryListArray,
                                                    optionLabel: "Country Code"
                                                });
                                            };
                                            $("#home_login_popup_country_code").prop('required', true);
                                            countryDropDown = $("#home_login_popup_country_code").data("kendoDropDownList");
                                            if (mService.app.getScreenId() !== "visitor_profile") {
                                                countryDropDown.enable(false);
                                                countryDropDown.value(mService.app.getCountryCode());
                                            } else {
                                                countryDropDown.enable(true);
                                            }
                                        } else {
                                            $("#home_login_popup_country_list").hide();
                                            $("#home_login_popup_country_code").prop('required', false);
                                        }
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            modal: true,
                            draggable: false,
                            resizable: false
                        });
                        $("#home_change_password_popup").parent().addClass("ms_window");
                        success();
                    } else {
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            open: function () {
                try {
                    if (mService.visitor.profile.funcAccess.length === 0 && Object.keys(mService.visitor.profile.login).length !== 0) {
                        $("#home_login_popup").data("kendoWindow").setOptions({
                            actions: []
                        });
                    };
                    $("#home_login_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submitClick: function () {
                var validator;
                try {
                    validator = $("#home_login_popup").kendoValidator().data("kendoValidator");
                    if (validator.validate()) {
                        if (mService.app.getScreenId() === "visitor_profile") {
                            if (mService.app.isMultipleAccountsAllowed()) {
                                mService.visitor.profile.context.client_id = $("#home_login_popup_multiple_acc_client_id").val().trim().toLowerCase();
                                mService.visitor.profile.context.country_code = $("#home_login_popup_multiple_acc_country_code").val().trim().toLowerCase();
                            } else {
                                if (mService.home.loginPopup.variable.countryListArray.length !== 0) {
                                    mService.visitor.profile.context.country_code = $("#home_login_popup_country_code").data("kendoDropDownList").value();
                                } else {
                                    mService.visitor.profile.context.country_code = mService.app.appSettings.documentElement.getElementsByTagName("default_country_code")[0].childNodes[0].nodeValue;
                                };
                            };
                            mService.visitor.submitProfile({
                                "first_name": "",
                                "last_name": "",
                                "mobile_no": $("#home_login_popup_user_name").val(),
                                "email_id": "",
                                "client_id": ((mService.app.isMultipleAccountsAllowed()) ? ($("#home_login_popup_multiple_acc_client_id").val().trim().toLowerCase()) : (mService.app.getClientId())),
                                "country_code": ((mService.app.isMultipleAccountsAllowed()) ? ($("#home_login_popup_multiple_acc_country_code").val().trim().toLowerCase()) : (mService.app.getCountryCode()))
                            }, true);
                        } else {
                            mService.home.loginPopup.authUser(false);
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            authUser: function (allowAuth) {
                try {
                    mService.spinner.show();
                    mService.app.security.authUser({
                        client_id: ((mService.app.isMultipleAccountsAllowed()) ? ($("#home_login_popup_multiple_acc_client_id").val().trim().toLowerCase()) : (mService.app.getClientId())),
                        country_code: ((mService.app.isMultipleAccountsAllowed()) ? ($("#home_login_popup_multiple_acc_country_code").val().trim().toLowerCase()) : (mService.app.getCountryCode())),
                        locale_id: mService.app.getLocaleId(),
                        device_id: "",
                        user_id: $("#home_login_popup_user_name").val().trim(),
                        password: $("#home_login_popup_password").val()
                    }, function () {
                        var eventName;
                        try {
                            if (mService.app.getScreenId() === "visitor_profile") {
                                eventName = "VISITOR_PAGE_LOGIN";
                            } else {
                                eventName = "FUNCTIONAL_DRAWER_LOGIN";
                            };
                            mService.security.code.getPurposeCode(eventName, function (purposeCode) {
                                try {
                                    if (purposeCode.data().length > 0) {
                                        if (purposeCode.data()[0].code !== "") {
                                            mService.security.code.verificationPopup.variable.verificationCounter = 0;
                                            mService.security.code.request(purposeCode.data()[0].code, function () {
                                                try {
                                                    mService.spinner.hide();
                                                    mService.security.code.verificationPopup.open(purposeCode.data()[0].code, eventName);
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
                                            mService.security.code.processVerification(eventName);
                                        }
                                    } else {
                                        mService.spinner.hide();
                                        mService.security.code.processVerification(eventName);
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.spinner.hide();
                                    mService.app.showToast("otp_error_purpose_code", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.spinner.hide();
                            if (allowAuth) {
                                mService.nfs.deleteFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "visitor_profile.json", function () {
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
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            processLogin: function () {
                try {
                    mService.spinner.show();
                    setTimeout(function () {
                        try {
                            mService.user.saveProfile(function () {
                                try {
                                    mService.fcm.init(function () {
                                        try {
                                            mService.app.security.setBase(true, function () {
                                                try {
                                                    var obj = {
                                                        client_id: mService.app.getClientId(),
                                                        country_code: mService.app.getCountryCode(),
                                                        user_id: mService.app.getUserId(),
                                                        password: "",
                                                        client_url: mService.app.clientURL,
                                                        location_update_ind: "true",
                                                        locale_id: mService.app.getLocaleId(),
                                                        device_id: mService.app.device_id,
                                                        active_ind: true,
                                                        cvs_url: mService.app.cvsURL,
                                                        client_url: mService.app.clientURL,
                                                        session_id: mService.app.getSessionId(),
                                                        employee_id: mService.app.getEmployeeId(),
                                                        company_name: mService.app.getCompanyName(),
                                                        active_domain_code: mService.app.activeDomainCode,
                                                        active_domain_name: mService.app.activeDomainName,
                                                        location_fetch_interval_in_seconds: mService.app.getLocationFetchInterval()
                                                    };
                                                    if (parseInt(mService.app.getLocationFetchInterval()) != 0) {
                                                        obj.location_update_ind = "true";
                                                    } else {
                                                        obj.location_update_ind = "false";
                                                    };
                                                    mService.util.updateMyAccountsFile(obj, function () {
                                                        try {
                                                            mService.app.sendAppInfo(function () {
                                                                try {
                                                                    mService.app.startService();
                                                                    mService.user.getPunchInProfile(function () {
                                                                        try {
                                                                            mService.spinner.hide();
                                                                            if (mService.app.getFuncAccess().length === 0) {
                                                                                mService.app.load.systemMessages(function () {
                                                                                    try {
                                                                                        setTimeout(function () {
                                                                                            try {
                                                                                                if (mService.user.profile.login.default_password_ind !== undefined && mService.user.profile.login.default_password_ind === "Y") {
                                                                                                    mService.page.change("change_password", {
                                                                                                        "fromScreen": "login"
                                                                                                    });
                                                                                                };
                                                                                                mService.api.permission.sendPermissionStatus("");
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        }, 10);
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                }, function () {
                                                                                    try {
                                                                                        mService.app.exit();
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                setTimeout(function () {
                                                                                    try {
                                                                                        if (mService.user.profile.login.default_password_ind !== undefined && mService.user.profile.login.default_password_ind === "Y") {
                                                                                            mService.page.change("change_password", {
                                                                                                "fromScreen": "login"
                                                                                            });
                                                                                        } else {
                                                                                            mService.app.openHomeScreen();
                                                                                        }
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                }, 10);
                                                                            };
                                                                        } catch (exception) {
                                                                            mService.exception.handle(exception);
                                                                        }
                                                                    }, function () {
                                                                        try {
                                                                            mService.spinner.hide();
                                                                            mService.app.showToast("load_punch_in_profile_failure", "system_messages");
                                                                        } catch (exception) {
                                                                            mService.exception.handle(exception);
                                                                        }
                                                                    });
                                                                    $('[data-ms-widget-type= "mLink"][data-ms-link-group="home_layout"][data-ms-link-role="my_notification"]').show();
                                                                    $('[data-ms-widget-type= "mLink"][data-ms-link-group="home_layout"][data-ms-link-role="my_active_call"]').show();
                                                                    mService.dSource.loadCachedDataSource();
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            }, function () {
                                                                try {
                                                                    mService.spinner.hide();
                                                                    mService.app.showToast("update_app_info_error", "system_messages");
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            });
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.spinner.hide();
                                                            mService.app.showToast("create_accounts_file_error", "system_messages");
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                try {
                                                    mService.spinner.hide();
                                                    mService.app.showToast("load_setbase_error", "system_messages");
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.spinner.hide();
                                            mService.app.showToast("fcm_init_failure", "system_messages");
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.spinner.hide();
                                    if (allowAuth) {
                                        mService.nfs.deleteFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "visitor_profile.json", function () {
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
                                    }
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
            variable: {
                countryListArray: []
            }
        },
        profileDrawer: {
            beforeShow: function () {
                try {
                    $("#home_profile_drawer_user_name").text(mService.app.getFirstName() + " " + mService.app.getLastName());
                    $("#home_profile_drawer_mobile_no").text(mService.app.getMobileNo());
                    $("#home_profile_drawer_email_id").text(mService.app.getEmailId());
                    $("#home_profile_drawer_app_version").text(mService.app.appVersion);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        punchInOutPopup: {
            init: function (success) {
                try {
                    if ($("#home_punch_in_out_popup").data("kendoWindow") === undefined) {
                        $("#home_punch_in_out_popup").kendoWindow({
                            width: (screen.width * 0.80),
                            height: (screen.height * 0.30),
                            title: {
                                text: "<span id='punch_in_out_popup_title' data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='punch_in_out_popup' data-ms-lbl-id='punch_in_title'></span>",
                                encoded: false
                            },
                            open: function () {
                                try {
                                    $("#punch_in_out_popup_title").removeAttr("data-ms-lbl-locale");
                                    mService.config.label.resolve();
                                    mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "punch_in_profile.json", function (data) {
                                        var dateSplit,
                                        punchInDate,
                                        punchOutDate;
                                        try {
                                            data = JSON.parse(data);
                                            mService.util.getNewDate(function (date) {
                                                try {
                                                    if (data.work_date === mService.util.getDateTimeString(date, "yyyy-MM-dd")) {
                                                        dateSplit = data.work_date.split("-");
                                                        if (data.punchin_hour === "0") {
                                                            $("#punch_in_date").hide();
                                                            $("#punch_out_date").hide();
                                                            $("#punch_in_container").show();
                                                            $("#punch_out_container").hide();
                                                        } else if (data.punchout_hour === "0") {
                                                            punchInDate = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]), parseInt(data.punchin_hour), parseInt(data.punchin_minute));
                                                            $("#punch_in_date_lbl").text(mService.util.getDateTimeString(punchInDate, "dd-MM-yyyy HH:mm"));
                                                            $("#punch_in_date").show();
                                                            $("#punch_out_date").hide();
                                                            $("#punch_in_container").hide();
                                                            $("#punch_out_container").show();
                                                            $("#punch_date_container").addClass("ms_punch_lbl_container");
                                                            $("#punch_date_container").removeClass("ms_punch_dates_lbl_container");
                                                        } else {
                                                            punchInDate = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]), parseInt(data.punchin_hour), parseInt(data.punchin_minute));
                                                            punchOutDate = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]), parseInt(data.punchout_hour), parseInt(data.punchout_minute));
                                                            $("#punch_in_date_lbl").text(mService.util.getDateTimeString(punchInDate, "dd-MM-yyyy HH:mm"));
                                                            $("#punch_out_date_lbl").text(mService.util.getDateTimeString(punchOutDate, "dd-MM-yyyy HH:mm"));
                                                            $("#punch_in_date").show();
                                                            $("#punch_out_date").show();
                                                            $("#punch_date_container").removeClass("ms_punch_lbl_container");
                                                            $("#punch_date_container").addClass("ms_punch_dates_lbl_container");
                                                            $("#punch_in_container").hide();
                                                            $("#punch_out_container").hide();
                                                        }
                                                    } else {
                                                        $("#punch_in_container").show();
                                                        $("#punch_out_container").hide();
                                                        $("#punch_in_date").hide();
                                                        $("#punch_out_date").hide();
                                                    }
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {
                                                mService.app.showToast("get_date_error", "home_layout");
                                            });
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            $("#punch_in_container").show();
                                            $("#punch_out_container").hide();
                                            $("#punch_in_date").hide();
                                            $("#punch_out_date").hide();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            modal: true,
                            draggable: false,
                            resizable: false
                        });
                        $("#home_punch_in_out_popup").parent().addClass("ms_window");
                        success();
                    } else {
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            open: function () {
                try {
                    $("#home_punch_in_out_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            punchInPopupSubmit: function () {
                try {
                    mService.home.punchInOutPopup.submitData(true, function () {
                        try {
                            $("#home_punch_in_out_popup").data("kendoWindow").close();
                            $("#punch_in_out_popup_title").attr("data-ms-lbl-id", "punch_out_title");
                            mService.util.showHideFeature("punch_out", true);
                            mService.util.showHideFeature("punch_in", false);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.app.showToast("punch_in_failed", "home_layout");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            punchOutPopupSubmit: function () {
                try {
                    mService.home.punchInOutPopup.submitData(false, function () {
                        try {
                            $("#home_punch_in_out_popup").data("kendoWindow").close();
                            $("#punch_in_out_popup_title").attr("data-ms-lbl-id", "Punch_details");
                            mService.util.showHideFeature("punch_in", true);
                            mService.util.showHideFeature("punch_out", false);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.app.showToast("punch_out_failed", "home_layout");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submitData: function (punchInInd, success, failure) {
                try {
                    mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "punch_in_profile.json", function (inputData) {
                        try {
                            mService.spinner.show();
                            mService.containR.pattern.form.util.getLocationStatus(function (status) {
                                try {
                                    if (status === "true") {
                                        mService.containR.pattern.form.util.getLocation(function (latitude, longitude) {
                                            try {
                                                mService.containR.pattern.form.util.getDateTimeSettingStatus(function (status) {
                                                    try {
                                                        if (status === "true") {
                                                            mService.util.getNewDate(function (date) {
                                                                var key;
                                                                try {
                                                                    inputData = JSON.parse(inputData);
                                                                    inputData.work_date = mService.util.getDateTimeString(date, "yyyy-MM-dd");
                                                                    if (punchInInd) {
                                                                        key = "punchin";
                                                                        inputData.punchin_hour = mService.util.getDateTimeString(date, "HH");
                                                                        inputData.punchin_minute = mService.util.getDateTimeString(date, "mm");
                                                                        inputData.punchin_lattitude_value = latitude;
                                                                        inputData.punchin_longitude_value = longitude;
                                                                    } else {
                                                                        key = "punchout";
                                                                        inputData.punchout_hour = mService.util.getDateTimeString(date, "HH");
                                                                        inputData.punchout_minute = mService.util.getDateTimeString(date, "mm");
                                                                        inputData.punchout_lattitude_value = latitude;
                                                                        inputData.punchout_longitude_value = longitude;
                                                                    };
                                                                    mService.queue.setData("home_layout", {
                                                                        "save": {
                                                                            "checkLocationSettings": "true",
                                                                            "checkTimeSettings": "true"
                                                                        }
                                                                    }, {
                                                                        url: "/api/common_modules/save_manage_custom_info",
                                                                        key: key,
                                                                        subkey: mService.app.getUserId(),
                                                                        datasource: new kendo.data.DataSource({
                                                                            data: []
                                                                        }),
                                                                        input: mService.dSource.util.getInputObject({
                                                                            inputparam_header: {
                                                                                p_custom_info_code: "'punchinout'",
                                                                                p_custom_info_ref_no1: "'" + mService.app.getEmployeeId() + "'",
                                                                                p_custom_info_ref_no2: "",
                                                                                p_inputparam_header_xml: "'" + JSON.stringify(inputData) + "'",
                                                                                p_save_mode: "'A'",
                                                                                p_rec_timestamp: "'00000000-0000-0000-0000-000000000000'"
                                                                            }
                                                                        })
                                                                    }, function (e) {
                                                                        try {
                                                                            mService.spinner.hide();
                                                                            if (punchInInd) {
                                                                                mService.app.showToast("punch_in_success", "home_layout", {
                                                                                    code: inputData.work_date + " " + inputData.punchin_hour + ":" + inputData.punchin_minute
                                                                                });
                                                                            } else {
                                                                                mService.app.showToast("punch_out_success", "home_layout", {
                                                                                    code: inputData.work_date + " " + inputData.punchout_hour + ":" + inputData.punchout_minute
                                                                                });
                                                                            };
                                                                            mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "punch_in_profile.json", JSON.stringify(inputData), function () {
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
                                                                    }, function (e) {
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
                                                                    mService.app.showToast("get_date_error", "home_layout");
                                                                    mService.spinner.hide();
                                                                    failure();
                                                                } catch (exception) {
                                                                    mService.exception.handle(exception);
                                                                }
                                                            });
                                                        } else {
                                                            mService.containR.pattern.form.util.openDateTimeSettings("home_layout");
                                                            mService.app.showToast("time_setting_not_automatic", "home_layout");
                                                            mService.spinner.hide();
                                                            failure();
                                                        }
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        failure();
                                                        mService.app.showToast("time_setting_not_automatic", "home_layout");
                                                        mService.spinner.hide();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.app.showToast("location_error", "home_layout");
                                                mService.spinner.hide();
                                                failure();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        mService.app.showToast("location_not_enabled", "home_layout");
                                        mService.spinner.hide();
                                        failure();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("location_not_enabled", "home_layout");
                                    mService.spinner.hide();
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
                            mService.app.showToast("punch_in_profile_not_available", "home_layout");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        attachmentProgressPopup: {
            changeTitle: function (progressFor) {
                try {
                    $("#attachment_progress_popup_title").attr("data-ms-lbl-id", (progressFor === "upload") ? "upload_progress_title" : "download_progress_title");
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function (success) {
                try {
                    if ($("#attachment_progress_popup").data("kendoWindow") === undefined) {
                        $("#attachment_progress_popup").kendoWindow({
                            width: (screen.width * 0.80),
                            height: (screen.height * 0.10),
                            title: {
                                text: "<span id='attachment_progress_popup_title' data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='attachment_progress_popup' data-ms-lbl-id='upload_progress_title'></span>",
                                encoded: false
                            },
                            actions: [],
                            open: function () {
                                var progressbar;
                                try {
                                    $("#attachment_progress_popup_title").removeAttr("data-ms-lbl-locale");
                                    mService.config.label.resolve();
                                    progressbar = $("#attachment_progressbar").data("kendoProgressBar");
                                    if (progressbar === undefined) {
                                        $("#attachment_progressbar").kendoProgressBar({
                                            min: 0,
                                            max: 100,
                                            type: 'percent',
                                            orientation: "horizontal",
                                            animation: {
                                                duration: 0
                                            }
                                        });
                                    } else {
                                        progressbar.value(0);
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            modal: true,
                            draggable: false,
                            resizable: false
                        });
                        $("#attachment_progress_popup").parent().addClass("ms_window");
                        success();
                    } else {
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            open: function () {
                try {
                    $("#attachment_progress_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            close: function () {
                var progressBar;
                try {
                    progressBar = $("#attachment_progressbar").data("kendoProgressBar");
                    progressBar.value(0);
                    $("#attachment_progress_popup").data("kendoWindow").close();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    page: {
        afterShow: function (e) {
            var scrID,
            scrObj,
            actionBarFeatures,
            index,
            controllerObj,
            call_info_container,
            patternScrID;
            try {
                scrID = e.view.id.replace(".html", "").replace("#", "");
                if (mService.util.isContainRScreen(scrID)) {
                    controllerObj = mService.config.controller.getControllerObj(scrID);
                    if (controllerObj !== undefined) {
                        if (controllerObj.pattern !== undefined && controllerObj.pattern === "true") {
                            patternScrID = scrID.replace("_list", "").replace("_chat", "");
                        }
                    }
                };
                if ($.grep(mService.app.getFuncAccess(), function (e, i) {
                        try {
                            return (e.p_child_screen_id === ((patternScrID === undefined) ? (scrID) : (patternScrID)) && e.p_parent_feature_group === "HOMELAYOUT");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    })[0] !== undefined) {
                    mService.presentR.layout.activate(scrID);
                    mService.home.functionalDrawer.activate();
                    mService.layout.tab.activate(scrID, patternScrID);
                    if (mService.app.getProfileId() === "U") {
                        $('[data-ms-widget-type= "mLink"][data-ms-link-group="home_layout"][data-ms-link-role="my_notification"]').show();
                    };
                };
                if (scrID === "chat") {
                    mService.config.label.resolve(scrID);
                };
                scrID = e.view.id.replace(".html", "").replace("#", "");
                if (mService.util.isContainRScreen(scrID)) {
                    if (!mService.util.isInAppScreen(scrID)) {
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj.pattern === undefined) {
                            scrObj = mService.containR;
                            if (scrObj !== undefined && scrObj.page !== undefined && scrObj.page.afterShow !== undefined) {
                                scrObj.page.afterShow(e);
                            };
                        } else {
                            controllerObj = mService.config.controller.getControllerObj(scrID.replace("_list", "").replace("_chat", "").replace("_details", "").replace("_attachments", ""));
                            if (controllerObj.pattern_name === "query") {
                                scrObj = mService.containR;
                                if (scrObj !== undefined && scrObj.page !== undefined && scrObj.page.beforeShow !== undefined) {
                                    scrObj.page.afterShow(e);
                                };
                            } else {
                                mService.pattern[controllerObj.pattern_name].page.afterShow(e);
                            }
                        };
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj !== undefined) {
                            if (controllerObj.containR_type === "listview" && controllerObj.containR_subtype === "workflow") {
                                call_info_container = $("#" + scrID).find("[data-ms-call_info-for='" + scrID + "']");
                                $(call_info_container).css("display", "flex");
                            } else {
                                call_info_container = $("#" + scrID).find("[data-ms-call_info-for='" + scrID + "']");
                                $(call_info_container).html("");
                                $(call_info_container).css("display", "none");
                            }
                        } else {
                            call_info_container = $("#" + scrID).find("[data-ms-call_info-for='" + scrID + "']");
                            $(call_info_container).html("");
                            $(call_info_container).css("display", "none");
                        }
                    } else {
                        if (scrID === "my_settings") {
                            mService.settings.page.afterShow(e);
                        } else if (scrID === "my_permission") {
                            mService.settings.permission.page.afterShow(e);
                        } else if (scrID === "my_permissions_consent") {
                            mService.permissions.page.afterShow(e);
                        } else if (scrID === "my_profile") {
                            mService.settings.profile.page.afterShow(e);
                        } else if (scrID === "version_update") {
                            mService.settings.version_update.page.afterShow(e);
                        } else if (scrID === "my_notification") {
                            mService.settings.my_notification.page.afterShow(e);
                        } else if (scrID === "my_accounts") {
                            mService.settings.my_accounts.page.afterShow(e);
                        } else if (scrID === "welcome") {
                            mService.settings.welcome.page.afterShow(e);
                        } else if (scrID === "signup") {
                            mService.auth.signup.page.afterShow(e);
                        } else if (scrID === "login") {
                            mService.auth.login.page.afterShow(e);
                        } else if (scrID === "forgot_password") {
                            mService.settings.forgot_password.page.afterShow(e);
                        } else if (scrID === "change_password") {
                            mService.settings.change_password.page.afterShow(e);
                        } else if (scrID === "my_language") {
                            mService.settings.my_language.page.afterShow(e);
                        } else if (scrID === "punch_in_out") {
                            mService.settings.punch_in_out.page.afterShow(e);
                        } else if (scrID === "security_code_verification") {
                            mService.security.security_code_verification.page.afterShow(e);
                        }
                    }
                } else {
                    if (scrID === "home_tile") {
                        mService.layout.tile.page.afterShow(e);
                    } else {
                        scrObj = eval(scrID);
                        if (scrObj !== undefined && scrObj.page != undefined && scrObj.page.afterShow !== undefined) {
                            scrObj.page.afterShow(e);
                        };
                        call_info_container = $("#" + scrID).find("[data-ms-call_info-for='" + scrID + "']");
                        $(call_info_container).html("");
                        $(call_info_container).css("display", "none");
                    }
                };
                if (scrID !== "visitor_profile" && scrID !== "chat" && e.view.element.attr("data-ms-view-type") !== "containR") {
                    mService.config.label.resolve(scrID);
                };
                actionBarFeatures = $.grep(mService.app.getFuncAccess(), function (e, i) {
                    try {
                        return e.p_parent_feature_group === "ACTIONBAR";
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                if (actionBarFeatures.length > 0) {
                    for (index = 0; index < actionBarFeatures.length; index++) {
                        if (actionBarFeatures[index].p_child_screen_id === "punchinout") {
                            mService.util.checkPunchInOut();
                        }
                    }
                } else {
                    mService.util.showHideFeature("punch_in", false);
                    mService.util.showHideFeature("punch_out", false);
                };
                setTimeout(function () {
                    try {
                        mService.api.permission.checkStatus(function (data) {
                            var settingsBadgeEle;
                            try {
                                if (data !== "") {
                                    var settingsBadgeEle = $("#" + mService.app.getScreenId()).find("#home_in_app_feature_my_settings_badge");
                                    $(settingsBadgeEle).hide();
                                    for (var index = 0; index < Object.keys(data).length; index++) {
                                        if (data[Object.keys(data)[index]] === "NEVER" || data[Object.keys(data)[index]] === "NO") {
                                            $(settingsBadgeEle).show();
                                        }
                                    }
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, 100);
                mService.fcm.updateNotificationCount(function () {
                    try {
                        return true;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                mService.presentR.resource.applyClientLogo(scrID);
                if (mService.app.notificationDataForOtherClient !== undefined && mService.app.notificationDataForOtherClient !== "") {
                    mService.spinner.show();
                    setTimeout(function () {
                        try {
                            mService.fcm.event.mobile.notificationOpened(mService.app.notificationDataForOtherClient);
                            mService.app.notificationDataForOtherClient = "";
                            mService.spinner.hide();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 10);
                } else {
                    mService.spinner.hide();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        beforeShow: function (e) {
            var scrID,
            controllerObj,
            scrObj;
            try {
                mService.spinner.show();
                scrID = e.view.id.replace(".html", "").replace("#", "");
                mService.presentR.util.loadLabelFiles();
                if (mService.util.isContainRScreen(scrID)) {
                    if (!mService.util.isInAppScreen(scrID)) {
                        controllerObj = mService.config.controller.getControllerObj(scrID);
                        if (controllerObj.pattern === undefined) {
                            scrObj = mService.containR;
                            if (scrObj !== undefined && scrObj.page !== undefined && scrObj.page.beforeShow !== undefined) {
                                scrObj.page.beforeShow(e);
                            };
                        } else {
                            controllerObj = mService.config.controller.getControllerObj(scrID.replace("_list", "").replace("_chat", "").replace("_details", "").replace("_attachments", ""));
                            if (controllerObj.pattern_name === "query") {
                                scrObj = mService.containR;
                                if (scrObj !== undefined && scrObj.page !== undefined && scrObj.page.beforeShow !== undefined) {
                                    scrObj.page.beforeShow(e);
                                };
                            } else {
                                mService.pattern[controllerObj.pattern_name].page.beforeShow(e);
                            }
                        }
                    } else {
                        if (scrID === "my_settings") {
                            mService.settings.page.beforeShow(e);
                        } else if (scrID === "my_permission") {
                            mService.settings.permission.page.beforeShow(e);
                        } else if (scrID === "my_permissions_consent") {
                            mService.permissions.page.beforeShow(e);
                        } else if (scrID === "my_profile") {
                            mService.settings.profile.page.beforeShow(e);
                        } else if (scrID === "version_update") {
                            mService.settings.version_update.page.beforeShow(e);
                        } else if (scrID === "my_notification") {
                            mService.settings.my_notification.page.beforeShow(e);
                        } else if (scrID === "my_accounts") {
                            mService.settings.my_accounts.page.beforeShow(e);
                        } else if (scrID === "welcome") {
                            mService.settings.welcome.page.beforeShow(e);
                        } else if (scrID === "signup") {
                            mService.auth.signup.page.beforeShow(e);
                        } else if (scrID === "login") {
                            mService.auth.login.page.beforeShow(e);
                        } else if (scrID === "forgot_password") {
                            mService.settings.forgot_password.page.beforeShow(e);
                        } else if (scrID === "change_password") {
                            mService.settings.change_password.page.beforeShow(e);
                        } else if (scrID === "my_language") {
                            mService.settings.my_language.page.beforeShow(e);
                        } else if (scrID === "punch_in_out") {
                            mService.settings.punch_in_out.page.beforeShow(e);
                        } else if (scrID === "security_code_verification") {
                            mService.security.security_code_verification.page.beforeShow(e);
                        }
                    }
                } else {
                    if (scrID === "home_tile") {
                        mService.layout.tile.page.beforeShow(e);
                    } else {
                        scrID = e.view.id.replace(".html", "").replace("#", "");
                        scrObj = eval(scrID);
                        if (scrObj !== undefined && scrObj.page != undefined && scrObj.page.beforeShow !== undefined) {
                            scrObj.page.beforeShow(e);
                        };
                    }
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        change: function (scrID, obj) {
            try {
                if (scrID === "home_tile") {
                    mService.layout.tile.init();
                    mService.app.splash.hide()
                } else {
                    if (mService.util.isContainRScreen(scrID)) {
                        if (!mService.util.isInAppScreen(scrID)) {
                            if (obj !== undefined) {
                                if (mService.containR.variable[scrID] === undefined) {
                                    mService.containR.variable[scrID] = {};
                                };
                                if (obj.type === "chat") {
                                    mService.containR.variable[scrID] = {};
                                };
                                $.extend(true, mService.containR.variable[scrID], obj);
                            };
                            if (mService.app.notificationData !== undefined && mService.app.notificationData !== "") {
                                mService.dSource.util.getCallItem(scrID, mService.containR.variable.my_service_call.notificationPayload.additionalData.msgBody.subKey, function (selectedRecord) {
                                    try {
                                        mService.containR.button.listview.wflowEventClick("", "", true, scrID, selectedRecord);
                                        mService.app.notificationData = "";
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, )
                            } else {
                                mService.containR.init(scrID);
                                mService.app.splash.hide();
                            }
                        } else {
                            if (obj !== undefined) {
                                $.extend(true, mService.settings.variable, obj);
                            };
                            mService.settings.init(scrID);
                        }
                    } else {
                        $.getScript("../" + "js" + "/" + scrID + ".js").done(function (script, textStatus) {
                            try {
                                if (obj !== undefined) {
                                    $.extend(true, eval(scrID).variable, obj);
                                };
                                if (scrID === "visitor_profile") {
                                    mService.application.navigate(scrID + ".html");
                                    mService.app.splash.hide();
                                } else {
                                    mService.util.loadBaseConfigData(scrID, function () {
                                        try {
                                            mService.application.navigate(scrID + ".html");
                                            mService.app.splash.hide();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }).fail(function () {
                            try {
                                mService.app.showToast("change_screen_failure", "system_messages");
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
        init: function (e) {
            var scrID,
            scrObj;
            try {
                scrID = e.view.id.replace(".html", "").replace("#", "");
                if (e.view.element.attr("data-ms-view-type") === "containR") {
                    if (!mService.util.isInAppScreen(scrID)) {
                        scrObj = mService[e.view.element.attr("data-ms-view-type")];
                        if (scrObj !== undefined && scrObj.page != undefined && scrObj.page.init !== undefined) {
                            scrObj.page.init(e);
                        };
                    } else {
                        if (scrID === "my_settings") {
                            mService.settings.page.init(e);
                        } else if (scrID === "my_permission") {
                            mService.settings.permission.page.init(e);
                        } else if (scrID === "my_permissions_consent") {
                            mService.permissions.page.init(e);
                        } else if (scrID === "my_profile") {
                            mService.settings.profile.page.init(e);
                        } else if (scrID === "version_update") {
                            mService.settings.version_update.page.init(e);
                        } else if (scrID === "my_notification") {
                            mService.settings.my_notification.page.init(e);
                        } else if (scrID === "my_accounts") {
                            mService.settings.my_accounts.page.init(e);
                        } else if (scrID === "welcome") {
                            mService.settings.welcome.page.init(e);
                        } else if (scrID === "signup") {
                            mService.auth.signup.page.init(e);
                        } else if (scrID === "login") {
                            mService.auth.login.page.init(e);
                        } else if (scrID === "forgot_password") {
                            mService.settings.forgot_password.page.init(e);
                        } else if (scrID === "change_password") {
                            mService.settings.change_password.page.init(e);
                        } else if (scrID === "my_language") {
                            mService.settings.my_language.page.init(e);
                        } else if (scrID === "punch_in_out") {
                            mService.settings.punch_in_out.page.init(e);
                        } else if (scrID === "security_code_verification") {
                            mService.security.security_code_verification.page.init(e);
                        }
                    }
                } else {
                    if (scrID === "home_tile") {
                        mService.layout.tile.page.init(e);
                    } else {
                        scrID = e.view.id.replace(".html", "").replace("#", "");
                        scrObj = eval(scrID);
                        if (scrObj !== undefined && scrObj.page != undefined && scrObj.page.init !== undefined) {
                            scrObj.page.init(e);
                        };
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        lastAccessedView: "",
        show: function (e) {
            var scrID,
            scrObj;
            try {
                scrID = e.view.id.replace(".html", "").replace("#", "");
                if (e.view.element.attr("data-ms-view-type") === "containR") {
                    if (!mService.util.isInAppScreen(scrID)) {
                        scrObj = mService[e.view.element.attr("data-ms-view-type")];
                        if (scrObj !== undefined && scrObj.page != undefined && scrObj.page.show !== undefined) {
                            scrObj.page.show(e);
                        };
                    } else {
                        if (scrID === "my_settings") {
                            mService.settings.page.show(e);
                        } else if (scrID === "my_permission") {
                            mService.settings.permission.page.show(e);
                        } else if (scrID === "my_permissions_consent") {
                            mService.permissions.page.show(e);
                        } else if (scrID === "my_profile") {
                            mService.settings.profile.page.show(e);
                        } else if (scrID === "version_update") {
                            mService.settings.version_update.page.show(e);
                        } else if (scrID === "my_notification") {
                            mService.settings.my_notification.page.show(e);
                        } else if (scrID === "my_accounts") {
                            mService.settings.my_accounts.page.show(e);
                        } else if (scrID === "welcome") {
                            mService.settings.welcome.page.show(e);
                        } else if (scrID === "signup") {
                            mService.auth.signup.page.show(e);
                        } else if (scrID === "login") {
                            mService.auth.login.page.show(e);
                        } else if (scrID === "forgot_password") {
                            mService.settings.forgot_password.page.show(e);
                        } else if (scrID === "change_password") {
                            mService.settings.change_password.page.show(e);
                        } else if (scrID === "my_language") {
                            mService.settings.my_language.page.show(e);
                        } else if (scrID === "punch_in_out") {
                            mService.settings.punch_in_out.page.show(e);
                        } else if (scrID === "security_code_verification") {
                            mService.security.security_code_verification.page.show(e);
                        }
                    }
                } else {
                    if (scrID === "home_tile") {
                        mService.layout.tile.page.show(e);
                    } else {
                        scrID = e.view.id.replace(".html", "").replace("#", "");
                        scrObj = eval(scrID);
                        if (scrObj !== undefined && scrObj.page != undefined && scrObj.page.show !== undefined) {
                            scrObj.page.show(e);
                        };
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        beforeHide: function (e) {
            var scrID,
            scrObj;
            try {
                scrID = e.view.id.replace(".html", "").replace("#", "");
                if (e.view.element.attr("data-ms-view-type") === "containR") {
                    if (!mService.util.isInAppScreen(scrID)) {
                        scrObj = mService[e.view.element.attr("data-ms-view-type")];
                        if (scrObj !== undefined && scrObj.page != undefined && scrObj.page.beforeHide !== undefined) {
                            scrObj.page.beforeHide(e);
                        };
                    } else {
                        if (scrID === "my_settings") {
                            mService.settings.page.beforeHide(e);
                        } else if (scrID === "my_permission") {
                            mService.settings.permission.page.beforeHide(e);
                        } else if (scrID === "my_permissions_consent") {
                            mService.permissions.page.beforeHide(e);
                        } else if (scrID === "my_profile") {
                            mService.settings.profile.page.beforeHide(e);
                        } else if (scrID === "version_update") {
                            mService.settings.version_update.page.beforeHide(e);
                        } else if (scrID === "my_notification") {
                            mService.settings.my_notification.page.beforeHide(e);
                        } else if (scrID === "my_accounts") {
                            mService.settings.my_accounts.page.beforeHide(e);
                        } else if (scrID === "welcome") {
                            mService.settings.welcome.page.beforeHide(e);
                        } else if (scrID === "signup") {
                            mService.auth.signup.page.beforeHide(e);
                        } else if (scrID === "login") {
                            mService.auth.login.page.beforeHide(e);
                        } else if (scrID === "forgot_password") {
                            mService.settings.forgot_password.page.beforeHide(e);
                        } else if (scrID === "change_password") {
                            mService.settings.change_password.page.beforeHide(e);
                        } else if (scrID === "my_language") {
                            mService.settings.my_language.page.beforeHide(e);
                        } else if (scrID === "punch_in_out") {
                            mService.settings.punch_in_out.page.beforeHide(e);
                        } else if (scrID === "security_code_verification") {
                            mService.security.security_code_verification.page.beforeHide(e);
                        }
                    }
                } else {
                    if (scrID === "home_tile") {
                        mService.layout.tile.page.beforeHide(e);
                    } else {
                        scrID = e.view.id.replace(".html", "").replace("#", "");
                        scrObj = eval(scrID);
                        if (scrObj !== undefined && scrObj.page != undefined && scrObj.page.beforeHide !== undefined) {
                            scrObj.page.beforeHide(e);
                        };
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    setAppBase: function (success, failure) {
        try {
            mService.app.loadAppSettings(function () {
                try {
                    mService.app.loadAppInfo(function () {
                        try {
                            window.minterface("GetStorageRoot", [], function (rootURL) {
                                try {
                                    mService.nfs.root = rootURL;
                                    success();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (errorMsg) {
                                try {
                                    mService.exception.handle(errorMsg);
                                    mService.app.showToast("set_storage_path_failure", "pre_signup_messages");
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
                            mService.app.showToast("load_app_info_file_failure", "pre_signup_messages");
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
                    mService.app.showToast("load_app_settings_file_failure", "pre_signup_messages");
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    setCvsBase: function (online, success, failure) {
        try {
            mService.cvs.validateClient(online, {
                client_id: mService.app.getClientId(),
                country_code: mService.app.getCountryCode(),
                locale_id: mService.app.getLocaleId()
            }, function () {
                try {
                    mService.cvs.getPackageTimestamp(online, {
                        client_id: mService.app.getClientId(),
                        country_code: mService.app.getCountryCode(),
                        locale_id: mService.app.getLocaleId()
                    }, function (response) {
                        try {
                            mService.cvs.refreshAccessPackage(online, {
                                client_id: mService.app.getClientId(),
                                country_code: mService.app.getCountryCode(),
                                locale_id: mService.app.getLocaleId()
                            }, response.accessPackageTimestamp, function () {
                                try {
                                    mService.cvs.refreshConfigurationPackage(online, {
                                        client_id: mService.app.getClientId(),
                                        country_code: mService.app.getCountryCode(),
                                        locale_id: mService.app.getLocaleId()
                                    }, response.configurationPackageTimestamp, function () {
                                        try {
                                            mService.cvs.loadClientUrl({
                                                client_id: mService.app.getClientId(),
                                                country_code: mService.app.getCountryCode(),
                                                locale_id: mService.app.getLocaleId()
                                            }, function () {
                                                try {
                                                    mService.presentR.load.icons.fromCvs(function () {
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
                                                    mService.app.showToast("load_client_url_failure", "pre_signup_messages");
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            });
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.app.showToast("refresh_configuration_package_failure", "pre_signup_messages");
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("refresh_access_package_failure", "pre_signup_messages");
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
                            mService.app.showToast("get_package_timestamp_failure", "pre_signup_messages");
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
                    mService.app.showToast("validate_client_failure", "pre_signup_messages");
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    user: {
        activateDeactivateUser: function (userID, activeInd, success, failure) {
            var headerDetails;
            try {
                headerDetails = "<document><context><sessionId>" + mService.app.getSessionId() + "</sessionId><userId>" + mService.app.getUserId() + "</userId><client_id>" + mService.app.getClientId() + "</client_id><locale_id>" + mService.app.getLocaleId() + "</locale_id><country_code>" + mService.app.getCountryCode() + "</country_code><inputparam><p_user_id>" + userID + "</p_user_id><p_activate_deactivate_ind>" + activeInd + "</p_activate_deactivate_ind><p_rec_tstamp>00000000-0000-0000-0000-000000000000</p_rec_tstamp></inputparam></context></document>";
                $.ajax({
                    url: mService.app.clientURL + "/common_modules/activate_deactivate_user_access.aspx",
                    async: true,
                    method: "POST",
                    contentType: "text/xml",
                    data: headerDetails,
                    complete: function (response, status) {
                        try {
                            if (status === "success") {
                                if (my_user.util.processServiceResponse(mService.util.getXmlDocument(response.responseText)) === "SP001") {
                                    mService.app.showToast("user_activation_success", "system_messages", {
                                        active_ind: activeInd
                                    });
                                    success();
                                } else {
                                    mService.app.showToast("user_activation_error", "system_messages", {
                                        active_ind: activeInd
                                    });
                                    failure();
                                }
                            } else {
                                mService.app.showToast("user_activation_error", "system_messages", {
                                    active_ind: activeInd
                                });
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
        getProfile: function (success, failure) {
            try {
                mService.dSource.retrieveCustomInfoDetail({
                    code: "'user_profile'"
                }, function (data) {
                    try {
                        mService.user.profile.login = data.header;
                        mService.user.profile.funcAccess = data.detail;
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
        getPunchInProfile: function (success, failure) {
            try {
                mService.dSource.retrieveCustomInfoDetail({
                    code: "'punchinout'",
                    refNo1: "'" + mService.app.getEmployeeId() + "'"
                }, function (data) {
                    try {
                        mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "punch_in_profile.json", JSON.stringify(data.header), function () {
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
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        isKnownUser: function (accountData, success, failure) {
            try {
                mService.nfs.readFile(((accountData === "") ? (mService.app.getClientId()) : (accountData.client_id)) + "/" + ((accountData === "") ? (mService.app.getCountryCode()) : (accountData.country_code)) + "/" + "user_profile.json", function (data) {
                    try {
                        if ($("#home_login_popup").is(":visible")) {
                            failure();
                        } else {
                            mService.user.profile = JSON.parse(data);
                            success();
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
        },
        profile: {
            context: {
                client_id: "",
                country_code: "",
                locale_id: "",
                session_id: "",
                user_id: ""
            },
            funcAccess: [],
            login: {}
        },
        resetProfile: function () {
            try {
                mService.user.profile.context.client_id = "";
                mService.user.profile.context.country_code = "";
                mService.user.profile.context.locale_id = "";
                mService.user.profile.context.session_id = "";
                mService.user.profile.context.user_id = "";
                mService.user.profile.funcAccess = [];
                mService.user.profile.login = {};
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        saveProfile: function (success, failure) {
            try {
                mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "user_profile.json", JSON.stringify(mService.user.profile), function () {
                    try {
                        var locationConfiguration = {
                            location_fetch_interval_in_seconds: mService.app.getLocationFetchInterval(),
                            client_id: mService.user.profile.context.client_id
                        };
                        mService.nfs.readFile("app_controller.json", function (data) {
                            try {
                                appController = JSON.parse(data);
                                if (parseInt(mService.app.getLocationFetchInterval()) == 0) {
                                    delete appController.location_configuration;
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
                                } else {
                                    locationConfigData = JSON.parse(data);
                                    locationConfigData = locationConfigData.location_configuration;
                                    if (parseInt(mService.app.getLocationFetchInterval()) != 0) {
                                        if (mService.user.profile.context.client_id == locationConfigData.client_id) {
                                            mService.util.updateLocationConfiguration(locationConfiguration, function () {
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
                                            if (parseInt(mService.app.getLocationFetchInterval()) < parseInt(locationConfigData.location_fetch_interval_in_seconds)) {
                                                mService.util.updateLocationConfiguration(locationConfiguration, function () {
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
                                        }
                                    } else {
                                        success();
                                    }
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                if (parseInt(mService.app.getLocationFetchInterval()) != 0) {
                                    mService.util.updateLocationConfiguration(locationConfiguration, function () {
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
                                }
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
        }
    },
    visitor: {
        validateVisitor: function () {
            try {
                mService.app.load.systemMessages(function () {
                    try {
                        mService.security.code.getPurposeCode("VISITOR_PROFILE_SUBMIT", function (purposeCode) {
                            try {
                                if (purposeCode.data().length > 0) {
                                    if (purposeCode.data()[0].code !== "") {
                                        mService.security.code.verificationPopup.variable.verificationCounter = 0;
                                        mService.security.code.request(purposeCode.data()[0].code, function () {
                                            try {
                                                mService.spinner.hide();
                                                mService.security.code.verificationPopup.open(purposeCode.data()[0].code, "VISITOR_PROFILE_SUBMIT");
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
                                        mService.security.code.processVerification("VISITOR_PROFILE_SUBMIT");
                                    }
                                } else {
                                    mService.security.code.processVerification("VISITOR_PROFILE_SUBMIT");
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.spinner.hide();
                                mService.app.showToast("otp_error_purpose_code", "system_messages");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        mService.app.exit();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getProfile: function (iObj, success, failure) {
            try {
                mService.dSource.retrieveCustomInfoDetail({
                    code: "'visitor_profile'",
                    refNo1: "'" + iObj.mobile_no + "'"
                }, function (data) {
                    try {
                        mService.visitor.profile.login = data.header;
                        mService.visitor.profile.funcAccess = data.detail;
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
        isKnownVisitor: function (accountData, success, failure) {
            try {
                mService.nfs.readFile(((accountData === undefined) ? (mService.app.getClientId()) : (accountData.client_id)) + "/" + ((accountData === undefined) ? (mService.app.getCountryCode()) : (accountData.country_code)) + "/" + "visitor_profile.json", function (data) {
                    try {
                        mService.visitor.profile = JSON.parse(data);
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
        profile: {
            context: {
                client_id: "",
                country_code: "",
                locale_id: "",
                session_id: "",
                user_id: ""
            },
            funcAccess: [],
            login: {}
        },
        saveProfile: function (success, failure) {
            try {
                mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "visitor_profile.json", JSON.stringify(mService.visitor.profile), function () {
                    try {
                        var locationConfiguration = {
                            location_fetch_interval_in_seconds: mService.app.getLocationFetchInterval(),
                            client_id: mService.visitor.profile.context.client_id
                        };
                        mService.nfs.readFile("app_controller.json", function (data) {
                            try {
                                appController = JSON.parse(data);
                                if (appController.location_configuration !== undefined) {
                                    if (parseInt(mService.app.getLocationFetchInterval()) == 0) {
                                        delete appController.location_configuration;
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
                                    } else {
                                        locationConfigData = JSON.parse(data);
                                        locationConfigData = locationConfigData.location_configuration;
                                        if (parseInt(mService.app.getLocationFetchInterval()) != 0) {
                                            if (mService.visitor.profile.context.client_id == locationConfigData.client_id) {
                                                mService.util.updateLocationConfiguration(locationConfiguration, function () {
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
                                                if (parseInt(mService.app.getLocationFetchInterval()) < parseInt(locationConfigData.location_fetch_interval_in_seconds)) {
                                                    mService.util.updateLocationConfiguration(locationConfiguration, function () {
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
                                            }
                                        } else {
                                            success();
                                        }
                                    }
                                } else {
                                    if (parseInt(mService.app.getLocationFetchInterval()) != 0) {
                                        mService.util.updateLocationConfiguration(locationConfiguration, function () {
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
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                if (parseInt(mService.app.getLocationFetchInterval()) != 0) {
                                    mService.util.updateLocationConfiguration(locationConfiguration, function () {
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
        },
        processVisitorSubmit: function (submitFromInd) {
            try {
                mService.visitor.saveProfile(function () {
                    try {
                        var obj = {
                            client_id: mService.app.getClientId(),
                            country_code: mService.app.getCountryCode(),
                            user_id: mService.app.getUserId(),
                            password: "",
                            client_url: mService.app.clientURL,
                            location_update_ind: "false",
                            locale_id: mService.app.getLocaleId(),
                            device_id: mService.app.device_id,
                            active_ind: true,
                            cvs_url: mService.app.cvsURL,
                            client_url: mService.app.clientURL,
                            session_id: mService.app.getSessionId(),
                            employee_id: mService.app.getEmployeeId(),
                            company_name: mService.app.getCompanyName(),
                            active_domain_code: mService.app.activeDomainCode,
                            active_domain_name: mService.app.activeDomainName,
                            location_fetch_interval_in_seconds: mService.app.getLocationFetchInterval()
                        };
                        if (parseInt(mService.app.getLocationFetchInterval()) != 0) {
                            obj.location_update_ind = "true";
                        } else {
                            obj.location_update_ind = "false";
                        };
                        mService.util.updateMyAccountsFile(obj, function () {
                            try {
                                mService.home.init(true, submitFromInd);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        }, function () {
                            try {
                                mService.spinner.hide();
                                mService.app.showToast("create_accounts_file_error", "pre_signup_messages");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            };
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        mService.spinner.hide();
                        mService.app.showToast("save_visitor_detail_failure", "pre_signup_messages");
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        submitProfile: function (iObj, submitFromInd) {
            try {
                mService.spinner.show();
                if (window.navigator.onLine) {
                    mService.app.profile.initiateProfile();
                    mService.setCvsBase(true, function () {
                        try {
                            mService.dSource.saveCustomInfo({
                                scrID: "pre_signup_messages",
                                inAppCode: "visitor_profile",
                                successToast: false,
                                failureToast: true,
                            }, {
                                code: "'visitor_profile'",
                                headerXml: "'" + JSON.stringify({
                                    "first_name": iObj.first_name,
                                    "last_name": iObj.last_name,
                                    "mobile_no": iObj.mobile_no,
                                    "email_id": iObj.email_id,
                                    "org_name": iObj.org_name,
                                    "org_address": iObj.org_address
                                }) + "'",
                                client_id: "'" + ((iObj.client_id === undefined) ? (mService.app.getClientId()) : (iObj.client_id)) + "'",
                                country_code: "'" + ((iObj.country_code === undefined) ? (mService.app.getCountryCode()) : (iObj.country_code)) + "'"
                            }, function (response) {
                                try {
                                    if (response.outputparam.p_outputparam_detail_xml !== "") {
                                        response = JSON.parse(response.outputparam.p_outputparam_detail_xml);
                                        if (response.activate_ind === "true") {
                                            mService.user.activateDeactivateUser(iObj.mobile_no, "1", function () {
                                                try {
                                                    mService.visitor.getProfile({
                                                        mobile_no: iObj.mobile_no
                                                    }, function () {
                                                        try {
                                                            if (!submitFromInd) {
                                                                mService.visitor.validateVisitor();
                                                            } else {
                                                                mService.visitor.processVisitorSubmit(submitFromInd);
                                                            }
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.spinner.hide();
                                                            mService.app.showToast("get_visitor_profile_failure", "pre_signup_messages");
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
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
                                        }
                                    } else {
                                        mService.visitor.getProfile({
                                            mobile_no: iObj.mobile_no
                                        }, function () {
                                            try {
                                                if (!submitFromInd) {
                                                    mService.visitor.validateVisitor();
                                                } else {
                                                    mService.visitor.processVisitorSubmit(submitFromInd);
                                                }
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.spinner.hide();
                                                mService.app.showToast("get_visitor_profile_failure", "pre_signup_messages");
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
                                    mService.spinner.hide();
                                    mService.app.showToast("save_visitor_profile_failure", "pre_signup_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.spinner.hide();
                            mService.app.exit();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    mService.app.showToast("internet_connection_error", "pre_signup_messages");
                    mService.spinner.hide();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    pattern: {}
};
$.cachedScript = function (url, options) {
    try {
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            async: false,
            url: url,
        });
        return $.ajax(options);
    } catch (exception) {
        mService.exception.handle(exception);
    }
};
document.addEventListener("backbutton", mService.events.backbutton, false);
document.addEventListener("deviceready", mService.events.deviceready);
document.addEventListener("pause", mService.events.pause, false);
document.addEventListener("resume", mService.events.resume, false);
window.addEventListener("orientationchange", mService.events.orientationchange, false);
window.addEventListener('keyboardDidShow', mService.events.keyboardDidShow);
window.addEventListener('keyboardDidHide', mService.events.keyboardDidHide);