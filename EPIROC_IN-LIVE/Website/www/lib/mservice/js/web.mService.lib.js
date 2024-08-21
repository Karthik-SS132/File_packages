var mService = {
    app: {
        alert: function (type, iObj) {
            var labelSrcKey,
            msLabelSrc,
            msLabelGrpID,
            msLabelID,
            lblScreenId,
            alertMsg;
            try {
                msLabelSrc = iObj.scrid;
                msLabelGrpID = iObj.lblgrpid;
                msLabelID = iObj.lblid;
                lblScreenId = (msLabelSrc === undefined || msLabelSrc === "") ? ("system_messages") : (msLabelSrc);
                labelSrcKey = lblScreenId + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId();
                mService.config.label.get(lblScreenId, function () {
                    try {
                        if (msLabelGrpID === undefined || msLabelGrpID === "") {
                            alertMsg = mService.config.template.getTransformedMessage(mService.config.label.src[labelSrcKey]["messages"][msLabelID], iObj);
                        } else if (msLabelGrpID !== undefined || msLabelGrpID !== "") {
                            alertMsg = mService.config.template.getTransformedMessage(mService.config.label.src[labelSrcKey]["messages"][msLabelGrpID][msLabelID], iObj);
                        } else {
                            alertMsg = msLabelID;
                        };
                        $("#home_notification").msNotification({
                            type: type,
                            msg: alertMsg
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
        },
        channel: "web",
        clientURL: window.location.protocol + "//" + document.domain + ((window.location.port === "") ? (window.location.port) : (":" + window.location.port)),
        fcmAppID: "",
        id: "",
        name: "",
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
        getProfileId: function () {
            try {
                return mService.user.profile.context.client_id !== "" ? "U" : "V";
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
        getUserId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.context.user_id : mService.visitor.profile.context.user_id;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getScreenId: function () {
            try {
                var feature;
                feature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                    try {
                        return e.p_child_feature_id_or_group === mService.page.navigation.get.functionalMenuID()
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                return ((feature.length > 0) ? (feature[0].p_child_screen_id) : (""));
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
        getTimezoneId: function () {
            try {
                return mService.app.getProfileId() === "U" ? mService.user.profile.login.timezone_id : mService.visitor.profile.login.timezone_id;
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
        launch: function (success, failure) {
            try {
                mService.presentR.load.icons.fromLib(function () {
                    try {
                        mService.presentR.load.icons.fromCvs(function () {
                            try {
                                mService.presentR.load.layout(function () {
                                    try {
                                        mService.presentR.load.theme("app", function () {
                                            try {
                                                mService.presentR.load.spinner(function () {
                                                    try {
                                                        success();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        console.log("Failed to load spinner");
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
                                                console.log("Failed to load Theme");
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
                                        console.log("Failed to load layout");
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
                }, function () {
                    try {
                        console.log("Failed to load the icons");
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
                    $.ajax({
                        url: "www/lib/mservice/utils/country_codes.json",
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
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            library: function (success, failure) {
                try {
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
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            script: function (success, failure) {
                try {
                    $.ajax({
                        url: "www/lib/mservice/js/" + mService.app.load.variable.libraryList[mService.app.load.variable.libraryListCounter],
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
            variable: {
                libraryList: ["config.lib.js", "widgets.lib.js", "eventHandler.lib.js", "dSource.lib.js", "fcm.lib.js", "presentR.lib.js", "api.lib.js", "util.lib.js", "containR.lib.js", "security.lib.js"],
                libraryListCounter: 0
            }
        },
        loadAppSettings: function (success, failure) {
            try {
                if (mService.app.channel === "web") {
                    mService.api.configuration.get("app_settings" + ".xml", "app_settings", "", function (activeHost) {
                        try {
                            activeHost = $.parseXML(activeHost);
                            mService.app.appSettings = activeHost;
                            mService.visitor.profile.context.session_id = activeHost.getElementsByTagName("default_session_id")[0].childNodes[0].nodeValue;
                            mService.visitor.profile.context.user_id = activeHost.getElementsByTagName("default_user_id")[0].childNodes[0].nodeValue;
                            mService.visitor.profile.context.client_id = activeHost.getElementsByTagName("default_client_id")[0].childNodes[0].nodeValue;
                            mService.visitor.profile.context.country_code = activeHost.getElementsByTagName("default_country_code")[0].childNodes[0].nodeValue;
                            mService.visitor.profile.context.locale_id = activeHost.getElementsByTagName("default_locale_id")[0].childNodes[0].nodeValue;
                            mService.app.fcmAppID = activeHost.getElementsByTagName("fcm_app_id")[0].childNodes[0].nodeValue;
                            mService.app.googleTanslationKey = activeHost.getElementsByTagName("google_tanslation_key")[0].childNodes[0].nodeValue;
                            mService.app.id = activeHost.getElementsByTagName("app_id")[0].childNodes[0].nodeValue;
                            mService.app.name = activeHost.getElementsByTagName("app_name")[0].childNodes[0].nodeValue;
                            success();
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
                } else {
                    $.ajax({
                        async: false,
                        url: "www/app_settings.xml",
                        dataType: "xml",
                        success: function (data) {
                            var index,
                            successIndicator,
                            activeHost;
                            try {
                                successIndicator = false;
                                for (index = 0; index < data.documentElement.getElementsByTagName("host").length; index++) {
                                    if (data.documentElement.getElementsByTagName("host")[index].getAttribute("name") === window.location.host) {
                                        successIndicator = true;
                                        activeHost = data.documentElement.getElementsByTagName("host")[index];
                                        mService.app.appSettings = activeHost;
                                        mService.visitor.profile.context.session_id = activeHost.getElementsByTagName("default_session_id")[0].childNodes[0].nodeValue;
                                        mService.visitor.profile.context.user_id = activeHost.getElementsByTagName("default_user_id")[0].childNodes[0].nodeValue;
                                        mService.visitor.profile.context.client_id = activeHost.getElementsByTagName("default_client_id")[0].childNodes[0].nodeValue;
                                        mService.visitor.profile.context.country_code = activeHost.getElementsByTagName("default_country_code")[0].childNodes[0].nodeValue;
                                        mService.visitor.profile.context.locale_id = activeHost.getElementsByTagName("default_locale_id")[0].childNodes[0].nodeValue;
                                        mService.app.fcmAppID = activeHost.getElementsByTagName("fcm_app_id")[0].childNodes[0].nodeValue;
                                        mService.app.googleTanslationKey = activeHost.getElementsByTagName("google_tanslation_key")[0].childNodes[0].nodeValue;
                                        mService.app.id = activeHost.getElementsByTagName("app_id")[0].childNodes[0].nodeValue;
                                        mService.app.name = activeHost.getElementsByTagName("app_name")[0].childNodes[0].nodeValue;
                                    }
                                };
                                if (successIndicator) {
                                    success();
                                } else {
                                    failure();
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
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        processLogin: function (success, failure) {
            var response,
            obj;
            try {
                response = mService.app.loginData.loginResponse;
                obj = mService.app.loginData.userData;
                response.user_id = obj.user_id;
                mService.app.security.processAuthUserResponseForOldWebApp(response);
                mService.app.updateAuthProfile(response, obj.user_id, function () {
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
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        security: {
            authUser: function (obj, success, failure) {
                try {
                    $.ajax({
                        async: false,
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
                                    p_device: "Desktop",
                                    p_browser: "",
                                    p_ip_address: "",
                                    p_channel_id: "WEB"
                                }
                            }
                        }),
                        error: function () {
                            try {
                                mService.app.alert("error", {
                                    scrid: "",
                                    lblid: "invalid_username_password",
                                    lblgrpid: "error"
                                });
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        success: function (response) {
                            try {
                                response = JSON.parse(response);
                                if (response.ApplicationException === null) {
                                    mService.app.loginData = {
                                        "userData": obj,
                                        "loginResponse": response
                                    };
                                    mService.user.profile.context.client_id = response.auth_response_login_profile.p_client_id;
                                    mService.user.profile.context.country_code = response.auth_response_login_profile.p_country_id;
                                    mService.user.profile.context.locale_id = response.auth_response_login_profile.p_locale_id;
                                    mService.user.profile.context.session_id = response.auth_response_login_profile.p_guid;
                                    mService.user.profile.context.user_id = obj.user_id;
                                    mService.user.getProfile(function () {
                                        try {
                                            mService.user.saveProfile(function () {
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
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "invalid_user",
                                        lblgrpid: "error",
                                        key: response.ApplicationException.errorDescription
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
            processAuthUserResponseForOldWebApp: function (response) {
                var index,
                login_profile,
                access_profile;
                try {
                    login_profile = {};
                    access_profile = {
                        user_functional_access: [],
                        user_data_access: [],
                        data_access_panel: []
                    };
                    login_profile.login_date = kendo.toString(new Date(), "yyyy-MM-dd");
                    login_profile.login_hour = kendo.toString(new Date(), "HH");
                    login_profile.login_minute = kendo.toString(new Date(), "mm");
                    login_profile.login_second = kendo.toString(new Date(), "ss");
                    login_profile.client_id = response.auth_response_login_profile.p_client_id;
                    login_profile.locale_id = response.auth_response_login_profile.p_locale_id;
                    login_profile.guid_val = response.auth_response_login_profile.p_guid;
                    login_profile.country_code = response.auth_response_login_profile.p_country_id;
                    login_profile.user_id = response.user_id;
                    login_profile.def_pwd_ind = response.auth_response_login_profile.p_default_passwd_ind;
                    login_profile.date_display_format = response.auth_response_login_profile.p_date_display_format;
                    login_profile.software_product = response.auth_response_login_profile.p_software_product;
                    login_profile.software_product_version = response.auth_response_login_profile.p_software_product_version;
                    login_profile.software_product_subversion = response.auth_response_login_profile.p_software_product_subversion;
                    login_profile.timezone_id = response.auth_response_login_profile.p_timezone_id;
                    login_profile.location_code = response.auth_response_login_profile.p_location_code;
                    login_profile.currency_code = response.auth_response_login_profile.p_currency_code;
                    login_profile.last_login_date = response.auth_response_login_profile.p_last_login_date;
                    login_profile.last_login_hour = response.auth_response_login_profile.p_last_login_hour;
                    login_profile.last_login_minute = response.auth_response_login_profile.p_last_login_minute;
                    login_profile.user_group_id = response.auth_response_login_profile.p_user_group_id;
                    login_profile.photo_reference = response.auth_response_login_profile.p_photo_reference;
                    login_profile.title = response.auth_response_login_profile.p_title;
                    login_profile.first_name = response.auth_response_login_profile.p_first_name;
                    login_profile.middle_name = response.auth_response_login_profile.p_middle_name;
                    login_profile.last_name = response.auth_response_login_profile.p_last_name;
                    login_profile.no_of_org_level = response.auth_response_login_profile.p_company_noof_levels;
                    login_profile.emp_id = response.auth_response_login_profile.p_employee_id;
                    login_profile.package_id = response.auth_response_login_profile.p_package_id;
                    login_profile.user_group_type = response.auth_response_login_profile.p_user_group_type;
                    login_profile.dealer_code = response.auth_response_login_profile.p_dealer_code;
                    login_profile.dealer_org_level_no = response.auth_response_login_profile.p_dealer_org_level_no;
                    login_profile.dealer_org_level_code = response.auth_response_login_profile.p_dealer_org_level_code;
                    login_profile.employee_org_level_no = response.auth_response_login_profile.p_employee_org_level_no;
                    login_profile.employee_org_level_code = response.auth_response_login_profile.p_employee_org_level_code;
                    login_profile.protocol = window.location.protocol;
                    login_profile.domain_name = document.domain;
                    login_profile.portno = window.location.port;
                    login_profile.network_mode = "online";
                    login_profile.app_mode = "WEB_BROWSER";
                    login_profile.solution = mService.user.profile.login.solution;
                    login_profile.vertical = mService.user.profile.login.vertical;
                    login_profile.clientgroup = mService.user.profile.login.clientgroup;
                    if (response.auth_response_fa_profile != null) {
                        for (index = 0; index < response.auth_response_fa_profile.length; index++) {
                            access_profile.user_functional_access.push({
                                parent_feature_group: response.auth_response_fa_profile[index].p_parent_feature_group,
                                child_feature_id_or_group: response.auth_response_fa_profile[index].p_child_feature_id_or_group,
                                child_feature_id_or_group_ind: response.auth_response_fa_profile[index].p_child_feature_id_or_group_ind,
                                parent_group_display_label: response.auth_response_fa_profile[index].p_parent_group_display_label,
                                parent_level_no: response.auth_response_fa_profile[index].p_parent_level_no,
                                parent_display_order: response.auth_response_fa_profile[index].p_parent_display_order,
                                child_feature_display_label: response.auth_response_fa_profile[index].p_child_feature_display_label,
                                child_level_no: response.auth_response_fa_profile[index].p_child_level_no,
                                child_display_order: response.auth_response_fa_profile[index].p_child_display_order,
                                child_screen_id: response.auth_response_fa_profile[index].p_child_screen_id,
                                channel_id: response.auth_response_fa_profile[index].p_channel_id,
                                feature_access: response.auth_response_fa_profile[index].p_feature_access.toString(),
                                add_access: response.auth_response_fa_profile[index].p_add_access.toString(),
                                edit_access: response.auth_response_fa_profile[index].p_edit_access.toString(),
                                delete_access: response.auth_response_fa_profile[index].p_delete_access.toString(),
                                view_access: response.auth_response_fa_profile[index].p_view_access.toString(),
                                export_access: response.auth_response_fa_profile[index].p_export_access.toString(),
                                print_access: response.auth_response_fa_profile[index].p_print_access.toString(),
                                import_access: response.auth_response_fa_profile[index].p_import_access.toString(),
                                menu_display_ind: response.auth_response_fa_profile[index].p_menu_display_ind.toString()
                            });
                        }
                    };
                    if (response.auth_response_wf_access_profile != null) {
                        for (index = 0; index < response.auth_response_wf_access_profile.length; index++) {
                            access_profile.user_data_access.push({
                                access_to_info_type: response.auth_response_wf_access_profile[index].p_access_to_info_type,
                                access_for_event: response.auth_response_wf_access_profile[index].p_access_for_event,
                                level1_code: response.auth_response_wf_access_profile[index].p_level1_code,
                                level2_code: response.auth_response_wf_access_profile[index].p_level2_code,
                                level3_code: response.auth_response_wf_access_profile[index].p_level3_code,
                                level4_code: response.auth_response_wf_access_profile[index].p_level4_code,
                                level5_code: response.auth_response_wf_access_profile[index].p_level5_code,
                                location_code: response.auth_response_wf_access_profile[index].p_location_code,
                                request_category: response.auth_response_wf_access_profile[index].p_request_category,
                                request_type: response.auth_response_wf_access_profile[index].p_request_type
                            });
                        }
                    };
                    if (response.auth_response_da_panel != null) {
                        for (index = 0; index < response.auth_response_da_panel.length; index++) {
                            access_profile.data_access_panel.push({
                                access_to_info_type: response.auth_response_da_panel[index].p_access_to_info_type,
                                org_level_no: response.auth_response_da_panel[index].p_org_level_no,
                                org_level_code: response.auth_response_da_panel[index].p_org_level_code,
                                location_code: response.auth_response_da_panel[index].p_location_code,
                                request_category: response.auth_response_da_panel[index].p_request_category,
                                request_type: response.auth_response_da_panel[index].p_request_type
                            });
                        }
                    };
                    sessionStorage.setItem('login_profile', JSON.stringify(login_profile));
                    sessionStorage.setItem('access_profile', JSON.stringify(access_profile));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        updateAuthProfile: function (obj, userID, success, failure) {
            try {
                mService.user.profile.context.client_id = obj.auth_response_login_profile.p_client_id;
                mService.user.profile.context.country_code = obj.auth_response_login_profile.p_country_id;
                mService.user.profile.context.locale_id = obj.auth_response_login_profile.p_locale_id;
                mService.user.profile.context.session_id = obj.auth_response_login_profile.p_guid;
                mService.user.profile.context.user_id = userID;
                sessionStorage.setItem("context", JSON.stringify(mService.user.profile.context));
                mService.user.getProfile(function () {
                    try {
                        mService.user.saveProfile(function () {
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
        }
    },
    events: {
        deviceready: function (e) {
            var myCookies,
            currentCookie,
            loginCredential,
            index,
            customerDataCounter,
            customerDataString = "";
            try {
                $("body").hide();
                mService.app.load.library(function () {
                    try {
                        mService.setAppBase(function () {
                            try {
                                mService.app.launch(function () {
                                    try {
                                        mService.presentR.web.updateFavIcon();
                                        mService.presentR.web.login.loadLayout();
                                        myCookies = document.cookie.split(";");
                                        for (index = 0; index < myCookies.length; index++) {
                                            currentCookie = myCookies[index].split("=");
                                            if (currentCookie[0].trim() === "loginCredential") {
                                                loginCredential = JSON.parse(currentCookie[1]);
                                                $("#ms_login_user_name").val(loginCredential.uname);
                                                $("#ms_login_password").val(loginCredential.pwd);
                                                $("#ms_login_remember_me").prop("checked", true);
                                            }
                                        };
                                        mService.visitor.getProfile(function () {
                                            try {
                                                mService.home.loginPopup.activate();
                                                mService.home.changeLanguagePopup.activate();
                                                mService.home.changePasswordPopup.activate();
                                                mService.home.forgotPasswordPopup.activate();
                                                mService.layout.profileMenu.activate();
                                                mService.security.code.verificationPopup.init(function () {
                                                    try {
                                                        return true;
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                                if (sessionStorage.getItem("context") !== null && sessionStorage.getItem("context") !== "" && sessionStorage.getItem("login") && sessionStorage.getItem("funcAccess")) {
                                                    mService.user.profile.context = JSON.parse(sessionStorage.getItem("context"));
                                                    mService.user.profile.login = JSON.parse(sessionStorage.getItem("login"));
                                                    mService.user.profile.funcAccess = JSON.parse(sessionStorage.getItem("funcAccess"));
                                                    mService.util.checkUserGroup(function () {
                                                        try {
                                                            var list = mService.layout.functionalMenu.getList();
                                                            mService.layout.functionalMenu.activate(list);
                                                            mService.layout.functionalMenu.select(list[0]);
                                                            mService.fcm.init();
                                                            $("#login_container").hide();
                                                            $("#app_header").show();
                                                            $("#home_menu").show();
                                                            if (mService.user.profile.login.mapped_customer_details === undefined || mService.user.profile.login.mapped_customer_details.length === 0) {
                                                                $("#app_header_title").html(mService.user.profile.login.title + " " + mService.user.profile.login.first_name + " [ " + mService.user.profile.login.company_name + " ]");
                                                                $("[data-ms-link-role='switch_to_old_platform']").show();
                                                            } else {
                                                                for (customerDataCounter = 0; customerDataCounter < mService.user.profile.login.mapped_customer_details.length; customerDataCounter++) {
                                                                    customerDataString += " " + mService.user.profile.login.mapped_customer_details[customerDataCounter].customer_name + " [ " + mService.user.profile.login.mapped_customer_details[customerDataCounter].customer_location_name_short + " ],"
                                                                };
                                                                $("#app_header_title").html("<div style='text-align:right;'><span style='font-size: 22px; overflow-wrap: anywhere;'>" + customerDataString.substring(0, customerDataString.length - 1) + "</span></br>" + mService.user.profile.login.title + " " + mService.user.profile.login.first_name + " " + mService.user.profile.login.last_name + " [ " + mService.user.profile.login.employee_id + " ]" + "</div>");
                                                            };
                                                            $("#product_information_container").hide();
                                                            $("[data-ms-link-group='profileMenu'][data-ms-link-role='login']").hide();
                                                            $("[data-ms-link-group='profileMenu'][data-ms-link-role='logout'],[data-ms-link-group='profileMenu'][data-ms-link-role='language'],[data-ms-link-group='profileMenu'][data-ms-link-role='changePassword']").show();
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            login_profile = JSON.parse(sessionStorage.getItem("login_profile"));
                                                            login_profile.default_locale_id = mService.user.profile.login.default_locale_id;
                                                            login_profile.user_locale_id = mService.user.profile.login.locale_id;
                                                            login_profile.googleTanslationKey = mService.app.googleTanslationKey;
                                                            sessionStorage.setItem('login_profile', JSON.stringify(login_profile));
                                                            window.location.href = "webui/html/home.html";
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                    $("body").show();
                                                } else {
                                                    $("#app_header").hide();
                                                    $("body").show();
                                                }
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.app.alert("error", {
                                                    scrid: "",
                                                    lblid: "load_visitor_profile",
                                                    lblgrpid: "error"
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
                                        mService.spinner.show();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.alert("error", {
                                    scrid: "",
                                    lblid: "load_app_settings",
                                    lblgrpid: "error"
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
                        console.error("Failed to load the libraries");
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
    exception: {
        handle: function (ex) {
            try {
                mService.spinner.show();
                $(".k-window-content").each(function () {
                    try {
                        if ($(this).data("kendoWindow") !== undefined) {
                            $(this).data("kendoWindow").close();
                        }
                    } catch (exception) {
                        console.log(exception);
                    }
                });
                console.log(ex);
            } catch (exception) {
                console.log(exception);
            }
        }
    },
    home: {
        changePasswordPopup: {
            activate: function () {
                try {
                    if ($("#home_change_password_popup").data("kendoWindow") === undefined) {
                        $("#home_change_password_popup").kendoWindow({
                            width: (screen.width * 0.50),
                            title: {
                                text: "<span data-ms-lbl='field' data-ms-lbl-src='home' data-ms-lbl-grpid='profileMenu' data-ms-lbl-id='changePassword'></span>",
                                encoded: false
                            },
                            open: function () {
                                try {
                                    $("#home_change_password_popup_old_password").val(""),
                                    $("#home_change_password_popup_new_password").val(""),
                                    $("#home_change_password_popup_confirm_password").val("");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            modal: true,
                            draggable: false,
                            resizable: false
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            open: function () {
                try {
                    $("#home_change_password_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submitClick: function () {
                mService.spinner.show();
                var oldPassword = $("#home_change_password_popup_old_password").val(),
                newPassword = $("#home_change_password_popup_new_password").val(),
                confirmNewPassword = $("#home_change_password_popup_confirm_password").val();
                try {
                    if (oldPassword !== "" && newPassword !== "" && confirmNewPassword !== "") {
                        if (oldPassword !== newPassword) {
                            if (newPassword === confirmNewPassword) {
                                if (newPassword.length >= 8) {
                                    if (newPassword.match(/^(?=.*[!@#$%^&*])/) && newPassword.match(/[a-z]/g) && newPassword.match(/[A-Z]/g) && newPassword.match(/[0-9]/g)) {
                                        if (window.navigator.onLine) {
                                            $.ajax({
                                                url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=security&serviceName=change_password&path=context/outputparam",
                                                async: false,
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
                                                        input_param: {
                                                            p_old_password: $("#home_change_password_popup_old_password").val(),
                                                            p_new_password: $("#home_change_password_popup_new_password").val()
                                                        }
                                                    }
                                                }),
                                                error: function () {
                                                    try {
                                                        mService.spinner.hide();
                                                        mService.app.alert("error", {
                                                            scrid: "",
                                                            lblid: "change_password_failure",
                                                            lblgrpid: "error"
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                },
                                                success: function (response) {
                                                    try {
                                                        mService.spinner.hide();
                                                        mService.app.alert("success", {
                                                            scrid: "",
                                                            lblid: "change_password_success",
                                                            lblgrpid: "success"
                                                        });
                                                        $("#home_change_password_popup").data("kendoWindow").close();
                                                        mService.home.logoutClick();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }
                                            });
                                        } else {
                                            mService.spinner.hide();
                                            mService.app.alert("error", {
                                                scrid: "",
                                                lblid: "internet_connection_error",
                                                lblgrpid: "error"
                                            });
                                        }
                                    } else {
                                        mService.spinner.hide();
                                        mService.app.alert("error", {
                                            scrid: "",
                                            lblid: "password_strength",
                                            lblgrpid: "error"
                                        });
                                    }
                                } else {
                                    mService.spinner.hide();
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "password_min_length",
                                        lblgrpid: "error"
                                    });
                                }
                            } else {
                                mService.spinner.hide();
                                mService.app.alert("error", {
                                    scrid: "",
                                    lblid: "new_password_match_error",
                                    lblgrpid: "error"
                                });
                            }
                        } else {
                            mService.spinner.hide();
                            mService.app.alert("error", {
                                scrid: "",
                                lblid: "old_password_match_error",
                                lblgrpid: "error"
                            });
                        }
                    } else {
                        mService.spinner.hide();
                        mService.app.alert("error", {
                            scrid: "",
                            lblid: "change_password_mandatory_error",
                            lblgrpid: "error"
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        forgotPasswordPopup: {
            activate: function () {
                try {
                    if ($("#home_forgot_password_popup").data("kendoWindow") === undefined) {
                        $("#home_forgot_password_popup").kendoWindow({
                            width: (screen.width * 0.70),
                            title: {
                                text: "<span data-ms-lbl='field' data-ms-lbl-src='home' data-ms-lbl-grpid='profileMenu' data-ms-lbl-id='forgotPassword'></span>",
                                encoded: false
                            },
                            open: function () {
                                try {
                                    $("#home_forgot_password_popup_user_name").val("");
                                    $("#home_forgot_password_popup_email_id").val("");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            modal: true,
                            draggable: false,
                            resizable: false
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            open: function () {
                try {
                    $("#home_forgot_password_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submitClick: function () {
                var userName,
                emailId;
                try {
                    mService.spinner.show();
                    userName = $("#home_forgot_password_popup_user_name").val();
                    emailId = $("#home_forgot_password_popup_email_id").val();
                    if (userName !== "" && emailId !== "") {
                        if (emailId.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                            if (window.navigator.onLine) {
                                $.ajax({
                                    url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=security&serviceName=request_password&path=context",
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
                                            input_param: {
                                                p_req_company_id: mService.app.getClientId(),
                                                p_req_user_id: $("#home_forgot_password_popup_user_name").val(),
                                                p_req_country_code: mService.app.getCountryCode(),
                                                p_req_email_id: $("#home_forgot_password_popup_email_id").val()
                                            }
                                        }
                                    }),
                                    complete: function (response, status) {
                                        var responseSrc;
                                        try {
                                            if (status === "success") {
                                                responseSrc = JSON.parse(response.responseText);
                                                if (responseSrc.document !== undefined && responseSrc.document.ApplicationException !== undefined) {
                                                    mService.app.alert("error", {
                                                        scrid: "",
                                                        lblid: "forgot_password_update_error",
                                                        lblgrpid: "error",
                                                        errorNumber: responseSrc.document.ApplicationException.errorNumber,
                                                        errorDescription: responseSrc.document.ApplicationException.errorDescription
                                                    });
                                                } else {
                                                    $("#home_forgot_password_popup").data("kendoWindow").close();
                                                    mService.app.alert("success", {
                                                        scrid: "",
                                                        lblid: "forgot_password_success",
                                                        lblgrpid: "success"
                                                    });
                                                }
                                            } else {
                                                mService.app.alert("error", {
                                                    scrid: "",
                                                    lblid: "forgot_password_failed",
                                                    lblgrpid: "error"
                                                });
                                            }
                                        } catch (e) {
                                            mService.exception.handle(exception);
                                        }
                                    }
                                });
                            } else {
                                mService.spinner.hide();
                                mService.app.alert("error", {
                                    scrid: "",
                                    lblid: "internet_connection_error",
                                    lblgrpid: "error"
                                });
                            }
                        } else {
                            mService.spinner.hide();
                            mService.app.alert("error", {
                                scrid: "",
                                lblid: "forgot_password_email_id_invalid_error",
                                lblgrpid: "error"
                            });
                        }
                    } else {
                        mService.spinner.hide();
                        mService.app.alert("error", {
                            scrid: "",
                            lblid: "forgot_password_mandatory_error",
                            lblgrpid: "error"
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        changeLanguagePopup: {
            activate: function () {
                var html,
                index,
                dSource;
                try {
                    html = "";
                    dSource = mService.dSource.getSource({
                        code: "'applicable_locale'",
                        inputXml: ""
                    });
                    dSource.read().then(function () {
                        try {
                            for (index = 0; index < dSource.data().length; index++) {
                                html += mService.config.template.getTransformedHtml("home_language_popup_list_template", dSource.data()[index]);
                            };
                            $("#home_language_popup").find("ul").html(html);
                            $("#home_language_popup").kendoWindow({
                                width: "350px",
                                title: {
                                    text: "<span data-ms-lbl='field' data-ms-lbl-src='home' data-ms-lbl-grpid='profileMenu' data-ms-lbl-id='language'></span>",
                                    encoded: false
                                },
                                draggable: false,
                                modal: true,
                                resizable: false,
                                visible: false
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            click: function (localeID) {
                try {
                    mService.user.profile.context.locale_id = localeID;
                    mService.config.label.resolve();
                    $("#home_language_popup").data("kendoWindow").close();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        customerContactInfo: {
            customerID: "",
            locationCode: "",
            contactName: "",
            contactNumber: "",
            contactEmail: "",
            customerName: "",
            callHangup: function () {
                var subMenuID,
                scrObj;
                try {
                    subMenuID = $("[data-ms-role='functionalMenuSplit'][data-ms-role-id='CALLCENTER']").data("kendoTabStrip").select().attr("data-ms-role-id");
                    scrObj = eval(subMenuID);
                    mService.home.customerContactInfo.customerID = "";
                    mService.home.customerContactInfo.locationCode = "";
                    mService.home.customerContactInfo.contactName = "";
                    mService.home.customerContactInfo.contactNumber = "";
                    mService.home.customerContactInfo.contactEmail = "";
                    mService.home.customerContactInfo.customerName = "";
                    $("#home_customer_contact_info").hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            search: function () {
                var subMenuID,
                scrObj,
                dSource;
                try {
                    subMenuID = $("[data-ms-role='functionalMenuSplit'][data-ms-role-id='CALLCENTER']").data("kendoTabStrip").select().attr("data-ms-role-id");
                    scrObj = eval(subMenuID);
                    dSource = mService.dSource.getSource({
                        code: "'call_center_customer_info'",
                        inputXml: "'" + JSON.stringify({
                            "contact_no": $("#home_customer_contact_info_contact_no").text()
                        }) + "'"
                    });
                    dSource.read().then(function () {
                        try {
                            $("#home_customer_contact_info").show();
                            if (dSource.data().length !== 0) {
                                $("#home_customer_contact_info_contact_name").text(dSource.data()[0].contact_name);
                                $("#home_customer_contact_info_contact_email").text(dSource.data()[0].contact_email);
                                $("#home_customer_contact_info_customer_name").text(dSource.data()[0].customer_name);
                                mService.home.customerContactInfo.customerID = dSource.data()[0].customer_id;
                                mService.home.customerContactInfo.locationCode = dSource.data()[0].customer_location_code;
                                mService.home.customerContactInfo.contactName = dSource.data()[0].contact_name;
                                mService.home.customerContactInfo.contactNumber = dSource.data()[0].contact_number;
                                mService.home.customerContactInfo.contactEmail = dSource.data()[0].contact_email;
                                mService.home.customerContactInfo.customerName = dSource.data()[0].customer_name;
                            } else {
                                $("#home_customer_contact_info_contact_name").text("");
                                $("#home_customer_contact_info_contact_email").text("");
                                $("#home_customer_contact_info_customer_name").text("");
                                mService.home.customerContactInfo.customerID = "";
                                mService.home.customerContactInfo.locationCode = "";
                                mService.home.customerContactInfo.contactName = "";
                                mService.home.customerContactInfo.contactNumber = $("#home_customer_contact_info_contact_no").text();
                                mService.home.customerContactInfo.contactEmail = "";
                                mService.home.customerContactInfo.customerName = "";
                                mService.app.alert("info", {
                                    scrid: "",
                                    lblid: "customer_no_information",
                                    lblgrpid: "info"
                                });
                            };
                            mService.layout.subMenu.select(subMenuID);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        loginPopup: {
            activate: function () {
                try {
                    $("#home_login_popup").kendoWindow({
                        title: false,
                        draggable: false,
                        modal: true,
                        resizable: false,
                        visible: false
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            cancel_click: function () {
                try {
                    $("#home_login_popup").data("kendoWindow").close();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            showPassword_click: function () {
                var passwordField,
                togglePassword;
                try {
                    passwordField = $('#ms_login_password');
                    togglePassword = $("#ms_login_show_password");
                    if (passwordField.attr('type') === 'password') {
                        passwordField.attr('type', 'text');
                        togglePassword.removeClass(mService.icons.login.hidePassword).addClass(mService.icons.login.showPassword);
                    } else {
                        passwordField.attr('type', 'password');
                        togglePassword.removeClass(mService.icons.login.showPassword).addClass(mService.icons.login.hidePassword);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submit_click: function () {
                try {
                    mService.spinner.show();
                    setTimeout(function () {
                        try {
                            if (mService.home.loginPopup.submitInProgress === false) {
                                mService.home.loginPopup.submitInProgress = true;
                                if ($("#ms_login_user_name").val() !== "" && $("#ms_login_password").val() !== "") {
                                    mService.app.security.authUser({
                                        client_id: mService.app.getClientId(),
                                        country_code: mService.app.getCountryCode(),
                                        locale_id: mService.app.getLocaleId(),
                                        device_id: "",
                                        user_id: $("#ms_login_user_name").val().trim(),
                                        password: $("#ms_login_password").val()
                                    }, function () {
                                        try {
                                            mService.security.code.getPurposeCode("VISITOR_PAGE_LOGIN", function (purposeCode) {
                                                try {
                                                    if (purposeCode.data().length > 0) {
                                                        if (purposeCode.data()[0].code !== "") {
                                                            mService.security.code.verificationPopup.variable.verificationCounter = 0;
                                                            mService.security.code.request(purposeCode.data()[0].code, function () {
                                                                try {
                                                                    mService.spinner.hide();
                                                                    mService.security.code.verificationPopup.open(purposeCode.data()[0].code, "VISITOR_PAGE_LOGIN");
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
                                                            mService.security.code.processVerification("VISITOR_PAGE_LOGIN");
                                                        }
                                                    } else {
                                                        mService.spinner.hide();
                                                        mService.security.code.processVerification("VISITOR_PAGE_LOGIN");
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
                                            mService.home.loginPopup.submitInProgress = false;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else if ($("#ms_login_user_name").val() == "") {
                                    mService.spinner.hide();
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "login_name",
                                        lblgrpid: "error"
                                    });
                                    mService.home.loginPopup.submitInProgress = false;
                                } else if ($("#ms_login_password").val() == "") {
                                    mService.spinner.hide();
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "login_password",
                                        lblgrpid: "error"
                                    });
                                    mService.home.loginPopup.submitInProgress = false;
                                }
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 10);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            processLogin: function () {
                var expiry,
                list,
                login_profile,
                customerDataCounter,
                customerDataString = "";
                try {
                    if ($("#ms_login_remember_me").prop("checked") === true) {
                        expiry = new Date((new Date()).getTime() + 30 * 24 * 3600 * 1000);
                        document.cookie = "loginCredential=" + JSON.stringify({
                            uname: $("#ms_login_user_name").val().trim(),
                            pwd: $("#ms_login_password").val()
                        }) + ";path=/;expires=" + expiry.toGMTString();
                    } else {
                        document.cookie = "loginCredential=; expires= Thu, 01 Jan 1970 00:00:00 GMT";
                    };
                    mService.app.processLogin(function () {
                        try {
                            mService.util.checkUserGroup(function () {
                                try {
                                    var list = mService.layout.functionalMenu.getList();
                                    mService.layout.functionalMenu.activate(list);
                                    mService.layout.functionalMenu.select(list[0]);
                                    mService.fcm.init();
                                    $("#login_container").hide();
                                    $("#app_header").show();
                                    $("#home_menu").show();
                                    if (mService.user.profile.login.mapped_customer_details === undefined || mService.user.profile.login.mapped_customer_details.length === 0) {
                                        $("#app_header_title").html(mService.user.profile.login.title + " " + mService.user.profile.login.first_name + " [ " + mService.user.profile.login.company_name + " ]");
                                        $("[data-ms-link-role='switch_to_old_platform']").show();
                                    } else {
                                        for (customerDataCounter = 0; customerDataCounter < mService.user.profile.login.mapped_customer_details.length; customerDataCounter++) {
                                            customerDataString += " " + mService.user.profile.login.mapped_customer_details[customerDataCounter].customer_name + " [ " + mService.user.profile.login.mapped_customer_details[customerDataCounter].customer_location_name_short + " ],"
                                        };
                                        $("#app_header_title").html("<div style='text-align:right;'><span style='font-size: 22px; overflow-wrap: anywhere;'>" + customerDataString.substring(0, customerDataString.length - 1) + "</span></br>" + mService.user.profile.login.title + " " + mService.user.profile.login.first_name + " " + mService.user.profile.login.last_name + " [ " + mService.user.profile.login.employee_id + " ]" + "</div>");
                                    };
                                    $("#product_information_container").hide();
                                    $("[data-ms-link-group='profileMenu'][data-ms-link-role='login']").hide();
                                    $("[data-ms-link-group='profileMenu'][data-ms-link-role='logout'],[data-ms-link-group='profileMenu'][data-ms-link-role='language'],[data-ms-link-group='profileMenu'][data-ms-link-role='changePassword']").show();
                                    if (mService.user.profile.login.default_password_ind !== undefined && mService.user.profile.login.default_password_ind === "Y") {
                                        $("#home_change_password_popup").data("kendoWindow").open().center();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    login_profile = JSON.parse(sessionStorage.getItem("login_profile"));
                                    login_profile.default_locale_id = mService.user.profile.login.default_locale_id;
                                    login_profile.user_locale_id = mService.user.profile.login.locale_id;
                                    login_profile.googleTanslationKey = mService.app.googleTanslationKey;
                                    sessionStorage.setItem('login_profile', JSON.stringify(login_profile));
                                    window.location.href = "webui/html/home.html";
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.home.loginPopup.submitInProgress = false;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submitInProgress: false
        },
        logoutClick: function () {
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
                                "p_logout_date": kendo.toString((new Date()), "yyyy-MM-dd"),
                                "p_logout_hour": kendo.toString((new Date()), "HH"),
                                "p_logout_minute": kendo.toString((new Date()), "mm")
                            }
                        }
                    }),
                    success: function (response) {
                        try {
                            mService.spinner.show();
                            OneSignal.setSubscription(false).then(function () {
                                try {
                                    OneSignal.isPushNotificationsEnabled(function (isEnabled) {
                                        try {
                                            if (!isEnabled) {
                                                mService.app.alert("success", {
                                                    scrid: "",
                                                    lblid: "logout",
                                                    lblgrpid: "success"
                                                });
                                                mService.user.resetProfile();
                                                window.location.href = mService.app.clientURL;
                                                mService.util.updateAppTimeZone(function () {
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
                                                mService.spinner.hide();
                                            } else {
                                                mService.spinner.hide();
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
                    },
                    error: function () {
                        try {
                            mService.app.alert("error", {
                                scrid: "",
                                lblid: "logout",
                                lblgrpid: "error"
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        userAttachment: {
            addAttachment: function (element) {
                try {
                    $(mService.config.template.getTransformedHtml("home_user_attachment_add_template", {
                            txntype: element.attr("data-ms-attach-txntype"),
                            txnrefno: element.attr("data-ms-attach-txnrefno")
                        })).kendoWindow({
                        title: {
                            text: "<span data-ms-lbl='field' data-ms-lbl-src='home' data-ms-lbl-grpid='userAttachment' data-ms-lbl-id='add'></span>",
                            encoded: false
                        },
                        actions: [],
                        draggable: false,
                        modal: true,
                        resizable: false,
                        visible: false,
                        close: function (e) {
                            try {
                                this.destroy();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        open: function (e) {
                            try {
                                $("#home_user_attachment_add_popup_content").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                                        buttonRegion: "attachment"
                                    }));
                                $("#home_user_attachment_add_popup_file_upoad").msAttachment({
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    multiple: true,
                                    lblid: "file_upload",
                                    lblgrpid: "user_attachment",
                                    mandatory: "true"
                                });
                                $("#home_user_attachment_add_popup_closure_report_ind").msCheckbox({
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "closure_report_ind",
                                    lblgrpid: "user_attachment",
                                    mandatory: "false",
                                    column: "12"
                                });
                                mService.home.userAttachment.validator = mService.config.rule.apply("home_user_attachment_add_popup_content");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                    }).data("kendoWindow").open().center();
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteAttachment: function (element) {
                var labelSrcKey;
                try {
                    labelSrcKey = "system_messages" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId();
                    mService.config.label.get("system_messages", function () {
                        try {
                            $("<div></div>").msDialog({
                                content: mService.config.template.getTransformedMessage(mService.config.label.src[labelSrcKey]["confirm"]["delete"]),
                                actions: {
                                    "OK": {
                                        text: "<i class='far fa-trash-alt'></i>",
                                        action: function (e) {
                                            try {
                                                mService.home.userAttachment.util.deleteData(element, function () {
                                                    try {
                                                        mService.home.userAttachment.util.deleteFile(element, function () {
                                                            try {
                                                                mService.app.alert("success", {
                                                                    scrid: mService.page.navigation.get.subMenuID(),
                                                                    lblid: "attachment_delete_success",
                                                                    lblgrpid: "success"
                                                                });
                                                                mService.layout.pageSubCatalog.select(mService.page.navigation.get.pageSubCatalogID());
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function () {
                                                            try {
                                                                mService.app.alert("error", {
                                                                    scrid: mService.page.navigation.get.subMenuID(),
                                                                    lblid: "attachment_delete",
                                                                    lblgrpid: "error"
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
                                                        mService.app.alert("error", {
                                                            scrid: mService.page.navigation.get.subMenuID(),
                                                            lblid: "attachment_delete",
                                                            lblgrpid: "error"
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        },
                                        primary: true
                                    },
                                    "CANCEL": {
                                        text: "<i class='fas fa-times'></i>",
                                        action: function (e) {
                                            try {
                                                return true;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }
                                    }
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
            },
            submitAttachment: function (txntype, txnrefno) {
                var closureReportInd;
                try {
                    if (mService.home.userAttachment.validator.validate()) {
                        closureReportInd = ($("#home_user_attachment_add_popup_closure_report_ind").getVal() === true) ? ("1") : ("0");
                        mService.home.userAttachment.util.addFile(txntype, txnrefno, function () {
                            try {
                                mService.home.userAttachment.util.addData(txntype, txnrefno, closureReportInd, function () {
                                    try {
                                        $("#home_user_attachment_add_popup").data("kendoWindow").close();
                                        eval(mService.page.navigation.get.subMenuID()).msPageValueChanged = false;
                                        mService.layout.pageSubCatalog.select(mService.page.navigation.get.pageSubCatalogID());
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
                                mService.app.alert("info", {
                                    scrid: "",
                                    lblid: "fileUploadFailure",
                                    lblgrpid: "attachment"
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
            util: {
                addData: function (txntype, txnrefno, closureReportInd, success, failure) {
                    var index,
                    inputDetail,
                    fileList;
                    try {
                        inputDetail = [];
                        fileList = $("#home_user_attachment_add_popup_file_upoad").getVal();
                        for (index = 0; index < fileList.length; index++) {
                            inputDetail.push({
                                p_sl_no: "'" + (index + 1).toString() + "'",
                                p_inputparam_detail_xml: "'" + JSON.stringify({
                                    "file_category": fileList[index].category,
                                    "file_type": fileList[index].type,
                                    "file_name": fileList[index].name,
                                    "file_extension": fileList[index].extension,
                                    "closure_report_ind": closureReportInd
                                }) + "'",
                                p_crud_ind: "'A'"
                            });
                        };
                        mService.dSource.saveCustomInfo({
                            scrID: mService.page.navigation.get.subMenuID(),
                            inAppCode: "attachment_add",
                            failureToast: true,
                            successToast: true
                        }, {
                            code: "'user_attachments'",
                            headerXml: "'" + JSON.stringify({
                                "transaction_type": txntype,
                                "transaction_ref_no": txnrefno
                            }) + "'",
                            saveMode: "'A'",
                            inputDetail: inputDetail
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
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                addFile: function (txntype, txnrefno, success, failure) {
                    var index,
                    formData,
                    xmlhttp,
                    breakIndicator,
                    attachmentPath;
                    try {
                        for (index = 0; index < $("#home_user_attachment_add_popup_file_upoad").getVal().length; index++) {
                            formData = new FormData();
                            formData.append("file", $("#home_user_attachment_add_popup_file_upoad").getVal()[index].rawFile, $("#home_user_attachment_add_popup_file_upoad").getVal()[index].name);
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
                            attachmentPath = $.grep(mService.home.userAttachment.allowedPath, function (e, i) {
                                try {
                                    return e.transaction_type === txntype;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            })[0];
                            xmlhttp.open("POST", mService.app.clientURL + "/" + "common" + "/" + "components" + "/" + "File_Upload" + "/" + "file_upload.aspx?companyId=" + mService.app.getClientId() + "&countryCode=" + mService.app.getCountryCode() + "&doc_type=" + attachmentPath.path + "/" + txnrefno + "&filename=", false);
                            xmlhttp.send(formData);
                            if (breakIndicator === true) {
                                break;
                            };
                        };
                        if (breakIndicator === true) {
                            failure();
                        } else {
                            success();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                deleteData: function (element, success, failure) {
                    try {
                        mService.dSource.saveCustomInfo({
                            scrID: mService.page.navigation.get.subMenuID(),
                            inAppCode: "attachment_delete",
                            failureToast: false,
                            successToast: false
                        }, {
                            code: "'user_attachments'",
                            headerXml: "'" + JSON.stringify({
                                "transaction_type": element.attr("data-ms-attach-txntype"),
                                "transaction_ref_no": element.attr("data-ms-attach-txnrefno"),
                                "file_id": element.attr("data-ms-attach-fileid"),
                                "file_name": element.attr("data-ms-attach-filename")
                            }) + ",",
                            saveMode: "'D'"
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
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                deleteFile: function (element, success, failure) {
                    try {
                        $.ajax({
                            async: false,
                            url: mService.app.clientURL + "/" + "common" + "/" + "components" + "/" + "File_Upload/file_delete.aspx?path=" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + element.attr("data-ms-attach-filepath") + "/" + element.attr("data-ms-attach-txnrefno") + "/" + element.attr("data-ms-attach-filename"),
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (response) {
                                try {
                                    if (response.response === "SP001") {
                                        success();
                                    } else {
                                        failure();
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
                        })
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                getAttachmentControlPanel: function () {
                    var dSource;
                    try {
                        if (mService.home.userAttachment.allowedFileExtensions === undefined) {
                            dSource = mService.dSource.getSource({
                                code: "'allowed_file_extension'",
                                inputXml: ""
                            });
                            dSource.read().then(function () {
                                try {
                                    mService.home.userAttachment.allowedFileExtensions = dSource.data();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        };
                        if (mService.home.userAttachment.allowedFileSize === undefined) {
                            dSource = mService.dSource.getSource({
                                code: "'allowed_file_size'",
                                inputXml: ""
                            });
                            dSource.read().then(function () {
                                try {
                                    mService.home.userAttachment.allowedFileSize = dSource.data();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        };
                        if (mService.home.userAttachment.allowedPath === undefined) {
                            dSource = mService.dSource.getSource({
                                code: "'user_attachment_path'",
                                inputXml: ""
                            });
                            dSource.read().then(function () {
                                try {
                                    mService.home.userAttachment.allowedPath = dSource.data();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            },
            viewAttachment: function (element) {
                try {
                    $(mService.config.template.getTransformedHtml("home_user_attachment_view_template", {
                            txntype: element.attr("data-ms-attach-txntype"),
                            txnrefno: element.attr("data-ms-attach-txnrefno"),
                            filename: element.attr("data-ms-attach-filename"),
                            filepath: element.attr("data-ms-attach-filepath"),
                            filecategory: element.attr("data-ms-attach-filecategory"),
                            filetype: element.attr("data-ms-attach-filetype")
                        })).kendoWindow({
                        title: {
                            text: "<span data-ms-lbl='field' data-ms-lbl-src='home' data-ms-lbl-grpid='userAttachment' data-ms-lbl-id='view'></span>",
                            encoded: false
                        },
                        draggable: false,
                        modal: true,
                        resizable: false,
                        visible: false,
                        close: function (e) {
                            try {
                                this.destroy();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        activate: function (e) {
                            try {
                                this.center();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        open: function (e) {
                            var image,
                            canvas,
                            windowWidth,
                            windowHeight,
                            aspectRatio;
                            try {
                                windowWidth = this.element.width();
                                windowHeight = this.element.height();
                                windowWidth = windowWidth - (windowWidth * 0.1);
                                windowHeight = windowHeight - (windowHeight * 0.05);
                                $("#home_user_attachment_view_content").css("height", windowHeight);
                                $("#home_user_attachment_view_content").css("width", windowWidth);
                                if (element.attr("data-ms-attach-filecategory") === "I") {
                                    $("#home_user_attachment_view_content").msImageviewer({
                                        source: mService.app.clientURL + "/" + "content_store" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + element.attr("data-ms-attach-filepath") + "/" + element.attr("data-ms-attach-txnrefno") + "/" + element.attr("data-ms-attach-filename")
                                    });
                                } else if (element.attr("data-ms-attach-filecategory") === "A") {
                                    $("#home_user_attachment_view_content").msAudioplayer({
                                        source: mService.app.clientURL + "/" + "content_store" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + element.attr("data-ms-attach-filepath") + "/" + element.attr("data-ms-attach-txnrefno") + "/" + element.attr("data-ms-attach-filename")
                                    });
                                } else if (element.attr("data-ms-attach-filecategory") === "V") {
                                    $("#home_user_attachment_view_content").msVideoplayer({
                                        source: mService.app.clientURL + "/" + "content_store" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + element.attr("data-ms-attach-filepath") + "/" + element.attr("data-ms-attach-txnrefno") + "/" + element.attr("data-ms-attach-filename")
                                    });
                                } else if (element.attr("data-ms-attach-filecategory") === "P") {
                                    $("#home_user_attachment_view_content").msPdfviewer({
                                        source: mService.app.clientURL + "/" + "content_store" + "/" + mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + element.attr("data-ms-attach-filepath") + "/" + element.attr("data-ms-attach-txnrefno") + "/" + element.attr("data-ms-attach-filename")
                                    });
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                    }).data("kendoWindow").open().center();
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        switchToOldPlatform: function () {
            try {
                login_profile = JSON.parse(sessionStorage.getItem("login_profile"));
                login_profile.default_locale_id = mService.user.profile.login.default_locale_id;
                login_profile.user_locale_id = mService.user.profile.login.locale_id;
                login_profile.googleTanslationKey = mService.app.googleTanslationKey;
                sessionStorage.setItem('login_profile', JSON.stringify(login_profile));
                window.location.href = "webui/html/home.html";
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    layout: {
        functionalMenu: {
            activate: function (list) {
                var index,
                html,
                content;
                try {
                    html = "";
                    content = "";
                    if ($("#home_functional_menu").find("ul").children().length === 0) {
                        for (index = 0; index < list.length; index++) {
                            html += mService.config.template.getTransformedHtml("home_functional_menu_link_template", {
                                id: list[index]
                            });
                            content += mService.config.template.getTransformedHtml("home_functional_menu_container_template", {
                                id: list[index]
                            });
                        };
                        $("#home_functional_menu").html(html);
                        $("body").append(content);
                        mService.config.label.resolve();
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            click: function (id) {
                var screenID,
                scrObj;
                try {
                    mService.spinner.show();
                    setTimeout(function () {
                        try {
                            mService.page.navigation.set.functionalMenu(id, "home", "title", id);
                            $("[data-ms-role='functionalMenuContainer']").hide();
                            $("[data-ms-role='functionalMenuContainer'][data-ms-role-id='" + id + "']").show();
                            $('[data-ms-widget-type = "mLink"][data-ms-link-group="functionalMenu"]').removeClass("ms_sidebar-active");
                            $('[data-ms-widget-type = "mLink"][data-ms-link-group="functionalMenu"][data-ms-link-role="' + id + '"]').addClass("ms_sidebar-active");
                            screenID = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                return e.p_child_feature_id_or_group == id;
                            })[0].p_child_screen_id;
                            mService.config.controller.get(screenID, function () {
                                var controllerObj;
                                try {
                                    controllerObj = mService.config.controller.getControllerObj(screenID);
                                    if (controllerObj !== undefined && controllerObj.pattern_name !== undefined) {
                                        if (controllerObj.pattern_name === "query" || controllerObj.pattern_name === "tab") {
                                            mService.util.loadScript("www/lib/mservice/pattern/query/query.lib.js", function () {
                                                try {
                                                    mService.pattern.query.init(screenID, id);
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function () {});
                                        }
                                    } else {
                                        mService.page.change(screenID, {}, function () {
                                            try {
                                                scrObj = eval(screenID);
                                                scrObj.page.beforeShow();
                                                scrObj.page.init();
                                                scrObj.page.show();
                                                scrObj.page.afterShow();
                                                mService.spinner.hide();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.app.alert("error", {
                                                    scrid: "",
                                                    lblid: "load_screen",
                                                    lblgrpid: "error"
                                                });
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
                                    mService.page.change(screenID, {}, function () {
                                        try {
                                            scrObj = eval(screenID);
                                            scrObj.page.beforeShow();
                                            scrObj.page.init();
                                            scrObj.page.show();
                                            scrObj.page.afterShow();
                                            mService.spinner.hide();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.app.alert("error", {
                                                scrid: "",
                                                lblid: "load_screen",
                                                lblgrpid: "error"
                                            });
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 100);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getList: function () {
                var list,
                returnData,
                index;
                try {
                    list = mService.app.getFuncAccess();
                    returnData = [];
                    for (index = 0; index < list.length; index++) {
                        if ($.inArray(list[index].p_parent_feature_group, returnData) === -1 && list[index].p_parent_feature_group.indexOf("CPORT") === 0) {
                            returnData.push(list[index].p_parent_feature_group);
                        }
                    };
                    return returnData;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            select: function (id) {
                try {
                    mService.page.navigation.isAllowed(function () {
                        try {
                            mService.layout.functionalMenu.click(id);
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
            }
        },
        pageCatalog: {
            activate: function (list) {
                var index,
                header,
                detail,
                menuID,
                subMenuID,
                selector;
                try {
                    header = "";
                    detail = "";
                    menuID = mService.page.navigation.get.functionalMenuID();
                    subMenuID = mService.page.navigation.get.subMenuID();
                    selector = "[data-ms-role='subMenuSplit'][data-ms-role-id='" + subMenuID + "'][data-ms-role-funcmenuid='" + menuID + "']";
                    $(selector).find("> div").remove();
                    if ($(selector).data("kendoTabStrip") !== undefined) {
                        $(selector).data("kendoTabStrip").destroy();
                    };
                    for (index = 0; index < list.length; index++) {
                        list[index].subMenuID = subMenuID;
                        list[index].menuID = mService.page.navigation.get.functionalMenuID();
                        header += mService.config.template.getTransformedHtml("home_page_catalog_link_template", list[index]);
                        detail += mService.config.template.getTransformedHtml("home_page_catalog_container_template", list[index]);
                    };
                    $(selector).find("ul").html(header);
                    $(selector).append(detail);
                    $(selector).kendoTabStrip({
                        animation: {
                            open: {
                                effects: "fadeIn"
                            }
                        },
                        select: function (e) {
                            try {
                                e.preventDefault();
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        $(selector).data("kendoTabStrip").activateTab($(e.item));
                                        mService.layout.pageCatalog.click($(e.item).attr("data-ms-role-id"));
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
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            click: function (id) {
                try {
                    mService.spinner.show();
                    setTimeout(function () {
                        var subMenuID,
                        list;
                        try {
                            subMenuID = mService.page.navigation.get.subMenuID();
                            mService.page.navigation.set.pageCatalog(id, subMenuID, "title", "catalog_" + id);
                            eval(subMenuID).msPageCatalogRefresh = true;
                            list = mService.layout.pageSubCatalog.getList(id);
                            mService.layout.pageSubCatalog.activate(list);
                            mService.layout.pageSubCatalog.select(list[0].id);
                            mService.spinner.hide();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 100);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getList: function (id) {
                try {
                    return mService.config.controller.getPageCatalog(id);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            select: function (id) {
                var menuID,
                subMenuID;
                try {
                    mService.page.navigation.isAllowed(function () {
                        try {
                            menuID = mService.page.navigation.get.functionalMenuID();
                            subMenuID = mService.page.navigation.get.subMenuID();
                            if ($("[data-ms-role='subMenuSplit'][data-ms-role-id='" + subMenuID + "'][data-ms-role-funcmenuid='" + menuID + "']").data("kendoTabStrip").select().attr("data-ms-role-id") !== id) {
                                $("[data-ms-role='subMenuSplit'][data-ms-role-id='" + subMenuID + "'][data-ms-role-funcmenuid='" + menuID + "']").data("kendoTabStrip").select("[data-ms-role-id='" + id + "']");
                            } else {
                                mService.layout.pageCatalog.click(id);
                            }
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
            }
        },
        pageSubCatalog: {
            activate: function (list) {
                var index,
                header,
                detail,
                menuID,
                subMenuID,
                catalogID,
                selector;
                try {
                    header = "";
                    detail = "";
                    menuID = mService.page.navigation.get.functionalMenuID();
                    subMenuID = mService.page.navigation.get.subMenuID();
                    catalogID = mService.page.navigation.get.pageCatalogID();
                    selector = "[data-ms-role='pageCatalogSplit'][data-ms-role-id='" + catalogID + "'][data-ms-role-funcmenuid='" + menuID + "'][data-ms-role-submenuid='" + subMenuID + "']";
                    $(selector).find("> div").remove();
                    if ($(selector).data("kendoTabStrip") !== undefined) {
                        $(selector).data("kendoTabStrip").destroy();
                    };
                    if (list.length === 1) {
                        list[0].menuID = menuID;
                        list[0].subMenuID = subMenuID;
                        list[0].catalogID = catalogID;
                        $(selector).find("ul").remove();
                        detail += mService.config.template.getTransformedHtml("home_page_sub_catalog_container_template", list[0]);
                        $(selector).append(detail);
                    } else {
                        for (index = 0; index < list.length; index++) {
                            list[index].menuID = menuID;
                            list[index].subMenuID = subMenuID;
                            list[index].catalogID = catalogID;
                            header += mService.config.template.getTransformedHtml("home_page_sub_catalog_link_template", list[index]);
                            detail += mService.config.template.getTransformedHtml("home_page_sub_catalog_container_template", list[index]);
                        };
                        $(selector).find("ul").html(header);
                        $(selector).append(detail);
                        $(selector).kendoTabStrip({
                            animation: {
                                open: {
                                    effects: "fadeIn"
                                }
                            },
                            select: function (e) {
                                try {
                                    e.preventDefault();
                                    mService.page.navigation.isAllowed(function () {
                                        try {
                                            $(selector).data("kendoTabStrip").activateTab($(e.item));
                                            mService.layout.pageSubCatalog.click($(e.item).attr("data-ms-role-id"));
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
                            }
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            click: function (id) {
                try {
                    mService.spinner.show();
                    setTimeout(function () {
                        var subMenuID,
                        catalogID,
                        scrObj;
                        try {
                            subMenuID = mService.page.navigation.get.subMenuID();
                            catalogID = mService.page.navigation.get.pageCatalogID();
                            scrObj = eval(subMenuID);
                            mService.page.navigation.set.pageSubCatalog(id, subMenuID, "title", "subcatalog_" + id);
                            if (scrObj.msPageRefresh) {
                                scrObj.msPageRefresh = false;
                                mService.page.event.beforeShow();
                                mService.page.event.init();
                                mService.page.event.show();
                                mService.page.event.afterShow();
                            };
                            if (scrObj.msPageCatalogRefresh) {
                                if (scrObj !== undefined && scrObj.catalog !== undefined && scrObj.catalog[catalogID] !== undefined && scrObj.catalog[catalogID]["select"] !== undefined) {
                                    scrObj.catalog[catalogID]["select"]();
                                };
                                scrObj.msPageCatalogRefresh = false;
                            };
                            if (scrObj !== undefined && scrObj.catalog !== undefined && scrObj.catalog[catalogID] !== undefined && scrObj.catalog[catalogID][id] !== undefined) {
                                scrObj.catalog[catalogID][id]();
                            };
                            mService.config.label.resolve();
                            mService.spinner.hide();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 100);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getList: function (id) {
                var subMenuID,
                currentCatalog;
                try {
                    subMenuID = mService.page.navigation.get.subMenuID();
                    currentCatalog = $.grep(mService.layout.pageCatalog.getList(subMenuID), function (e, i) {
                        try {
                            return e.id === id;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    })[0];
                    currentCatalog = JSON.parse(JSON.stringify(currentCatalog));
                    if (currentCatalog.subCatalog === undefined) {
                        currentCatalog.subCatalog = [];
                    };
                    currentCatalog.subCatalog.splice(0, 0, {
                        id: "actions",
                        scrid: subMenuID
                    });
                    return currentCatalog.subCatalog;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            select: function (id) {
                var menuID,
                subMenuID,
                catalogID;
                try {
                    mService.page.navigation.isAllowed(function () {
                        try {
                            menuID = mService.page.navigation.get.functionalMenuID();
                            subMenuID = mService.page.navigation.get.subMenuID();
                            catalogID = mService.page.navigation.get.pageCatalogID();
                            if ($("[data-ms-role='pageCatalogSplit'][data-ms-role-id='" + catalogID + "'][data-ms-role-funcmenuid='" + menuID + "'][data-ms-role-submenuid='" + subMenuID + "']").data("kendoTabStrip") !== undefined) {
                                if ($("[data-ms-role='pageCatalogSplit'][data-ms-role-id='" + catalogID + "'][data-ms-role-funcmenuid='" + menuID + "'][data-ms-role-submenuid='" + subMenuID + "']").data("kendoTabStrip").select().attr("data-ms-role-id") !== id) {
                                    $("[data-ms-role='pageCatalogSplit'][data-ms-role-id='" + catalogID + "'][data-ms-role-funcmenuid='" + menuID + "'][data-ms-role-submenuid='" + subMenuID + "']").data("kendoTabStrip").select("[data-ms-role-id='" + id + "']");
                                } else {
                                    mService.layout.pageSubCatalog.click(id);
                                }
                            } else {
                                mService.layout.pageSubCatalog.click(id);
                            }
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
            }
        },
        profileMenu: {
            activate: function (list) {
                try {
                    $("#home_profile_menu").html(mService.config.template.getTransformedHtml("home_profile_menu_template"));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        subMenu: {
            activate: function (list) {
                var index,
                header,
                detail,
                menuID,
                selector;
                try {
                    header = "";
                    detail = "";
                    menuID = mService.page.navigation.get.functionalMenuID();
                    selector = "[data-ms-role='functionalMenuSplit'][data-ms-role-id='" + menuID + "']";
                    if ($(selector).data("kendoTabStrip") !== undefined) {
                        $(selector).data("kendoTabStrip").destroy();
                        $(selector).find("> div").remove();
                    };
                    for (index = 0; index < list.length; index++) {
                        header += mService.config.template.getTransformedHtml("home_sub_menu_link_template", list[index]);
                        detail += mService.config.template.getTransformedHtml("home_sub_menu_container_template", list[index]);
                    };
                    $(selector).find("ul").html(header);
                    $(selector).append(detail);
                    $(selector).kendoTabStrip({
                        tabPosition: "left",
                        animation: {
                            open: {
                                effects: "fadeIn"
                            }
                        },
                        select: function (e) {
                            try {
                                e.preventDefault();
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        $(selector).data("kendoTabStrip").activateTab($(e.item));
                                        mService.layout.subMenu.click($(e.item).attr("data-ms-role-id"));
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
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            click: function (id) {
                try {
                    mService.spinner.show();
                    setTimeout(function () {
                        var menuID;
                        try {
                            menuID = mService.page.navigation.get.functionalMenuID();
                            mService.page.navigation.set.subMenu(id, id, "title", "screen");
                            $("[data-ms-role='functionalMenuSplit'][data-ms-role-id='" + menuID + "']").find("[data-ms-role='subMenuLink']").removeClass("tab_active").addClass("ms_vertical-tab");
                            $("[data-ms-role='functionalMenuSplit'][data-ms-role-id='" + menuID + "']").find("[data-ms-role='subMenuLink'][data-ms-role-id='" + id + "']").removeClass("ms_vertical-tab").addClass("tab_active");
                            mService.page.change(id, {}, function () {
                                var list;
                                try {
                                    list = mService.layout.pageCatalog.getList(id);
                                    mService.layout.pageCatalog.activate(list);
                                    mService.layout.pageCatalog.select(list[0].id);
                                    mService.spinner.hide();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.alert("error", {
                                        scrid: "",
                                        lblid: "load_screen",
                                        lblgrpid: "error"
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 100);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getList: function (id) {
                var list;
                try {
                    list = $.grep(mService.app.getFuncAccess(), function (e, i) {
                        try {
                            return e.p_parent_feature_group === id;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    return list;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            select: function (id) {
                var menuID;
                try {
                    mService.page.navigation.isAllowed(function () {
                        try {
                            menuID = mService.page.navigation.get.functionalMenuID();
                            if ($("[data-ms-role='functionalMenuSplit'][data-ms-role-id='" + menuID + "']").data("kendoTabStrip").select().attr("data-ms-role-id") !== id) {
                                $("[data-ms-role='functionalMenuSplit'][data-ms-role-id='" + menuID + "']").data("kendoTabStrip").select("[data-ms-role-id='" + id + "']");
                            } else {
                                mService.layout.subMenu.click(id);
                            }
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
            }
        }
    },
    page: {
        change: function (subMenuID, obj, success, failure) {
            try {
                mService.page.loadScript("www" + "/" + "js" + "/" + subMenuID + ".js", function () {
                    try {
                        if (obj !== undefined) {
                            $.extend(eval(subMenuID).variable, obj);
                        };
                        eval(subMenuID).msPageRefresh = true;
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
        event: {
            afterShow: function () {
                var scrObj;
                try {
                    scrObj = eval(mService.page.navigation.get.subMenuID());
                    if (scrObj !== undefined && scrObj.page !== undefined && scrObj.page.afterShow !== undefined) {
                        scrObj.page.afterShow();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function () {
                var scrObj;
                try {
                    scrObj = eval(mService.page.navigation.get.subMenuID());
                    if (scrObj !== undefined && scrObj.page !== undefined && scrObj.page.beforeShow !== undefined) {
                        scrObj.page.beforeShow();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                var scrObj;
                try {
                    scrObj = eval(mService.page.navigation.get.subMenuID());
                    if (scrObj !== undefined && scrObj.page !== undefined && scrObj.page.init !== undefined) {
                        scrObj.page.init();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                var scrObj;
                try {
                    scrObj = eval(mService.page.navigation.get.subMenuID());
                    if (scrObj !== undefined && scrObj.page !== undefined && scrObj.page.show !== undefined) {
                        scrObj.page.show();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        loadScript: function (url, success, failure) {
            try {
                $.cachedScript(url).fail(function () {
                    try {
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }).done(function () {
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
        navigation: {
            formTitle: function () {
                var html;
                try {
                    html = "";
                    if (mService.page.navigation.map.functionalMenu.id !== "") {
                        html += mService.config.template.getTransformedHtml("home_title_template", mService.page.navigation.map.functionalMenu);
                    };
                    if (mService.page.navigation.map.subMenu.id !== "") {
                        html += mService.config.template.getTransformedHtml("home_title_template", mService.page.navigation.map.subMenu);
                    };
                    if (mService.page.navigation.map.pageCatalog.id !== "") {
                        html += mService.config.template.getTransformedHtml("home_title_template", mService.page.navigation.map.pageCatalog);
                    };
                    if (mService.page.navigation.map.pageSubCatalog.id !== "") {
                        html += mService.config.template.getTransformedHtml("home_title_template", mService.page.navigation.map.pageSubCatalog);
                    };
                    $("[data-ms-role='pageTitle'][data-ms-role-id='" + mService.page.navigation.get.functionalMenuID() + "']").html(html);
                    $("[data-ms-role='pageTitle'][data-ms-role-id='" + mService.page.navigation.get.functionalMenuID() + "'] span:last-child").remove();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            get: {
                functionalMenuID: function () {
                    try {
                        return mService.page.navigation.map.functionalMenu.id;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                pageCatalogID: function () {
                    try {
                        return mService.page.navigation.map.pageCatalog.id;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                pageSubCatalogID: function () {
                    try {
                        return mService.page.navigation.map.pageSubCatalog.id;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                subMenuID: function () {
                    try {
                        return mService.page.navigation.map.subMenu.id;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            },
            isAllowed: function (success, failure) {
                var scrObj,
                labelSrcKey;
                try {
                    scrObj = eval(mService.page.navigation.get.subMenuID());
                    if (scrObj !== undefined && scrObj.msPageValueChanged === true) {
                        labelSrcKey = "system_messages" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId();
                        mService.config.label.get("system_messages", function () {
                            try {
                                $("<div></div>").msDialog({
                                    content: mService.config.template.getTransformedMessage(mService.config.label.src[labelSrcKey]["confirm"]["cancel"]),
                                    actions: {
                                        "OK": {
                                            text: "<i class='fas fa-check'></i>",
                                            action: function (e) {
                                                try {
                                                    scrObj.msPageValueChanged = false;
                                                    success();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            },
                                            primary: true
                                        },
                                        "CANCEL": {
                                            text: "<i class='fas fa-times'></i>",
                                            action: function (e) {
                                                try {
                                                    failure();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }
                                        }
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
                    } else {
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            map: {
                functionalMenu: {
                    id: "",
                    lblSrc: "",
                    lblGrpID: "",
                    lblID: ""
                },
                pageCatalog: {
                    id: "",
                    lblSrc: "",
                    lblGrpID: "",
                    lblID: ""
                },
                pageSubCatalog: {
                    id: "",
                    lblSrc: "",
                    lblGrpID: "",
                    lblID: ""
                },
                subMenu: {
                    id: "",
                    lblSrc: "",
                    lblGrpID: "",
                    lblID: ""
                }
            },
            reset: {
                functionalMenu: function () {
                    try {
                        mService.page.navigation.map.functionalMenu = {
                            id: "",
                            lblID: "",
                            lblSrc: "",
                            lblGrpID: ""
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                pageCatalog: function () {
                    try {
                        mService.page.navigation.map.pageCatalog = {
                            id: "",
                            lblID: "",
                            lblSrc: "",
                            lblGrpID: ""
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                pageSubCatalog: function () {
                    try {
                        mService.page.navigation.map.pageSubCatalog = {
                            id: "",
                            lblID: "",
                            lblSrc: "",
                            lblGrpID: ""
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                subMenu: function () {
                    try {
                        mService.page.navigation.map.subMenu = {
                            id: "",
                            lblID: "",
                            lblSrc: "",
                            lblGrpID: ""
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            },
            set: {
                functionalMenu: function (id, lblSrc, lblGrpID, lblID) {
                    try {
                        mService.page.navigation.map.functionalMenu = {
                            id: id,
                            lblID: lblID,
                            lblSrc: lblSrc,
                            lblGrpID: lblGrpID
                        };
                        mService.page.navigation.reset.subMenu();
                        mService.page.navigation.reset.pageCatalog();
                        mService.page.navigation.reset.pageSubCatalog();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                pageCatalog: function (id, lblSrc, lblGrpID, lblID) {
                    try {
                        mService.page.navigation.map.pageCatalog = {
                            id: id,
                            lblID: lblID,
                            lblSrc: lblSrc,
                            lblGrpID: lblGrpID
                        };
                        mService.page.navigation.reset.pageSubCatalog();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                pageSubCatalog: function (id, lblSrc, lblGrpID, lblID) {
                    try {
                        mService.page.navigation.map.pageSubCatalog = {
                            id: id,
                            lblID: lblID,
                            lblSrc: lblSrc,
                            lblGrpID: lblGrpID
                        };
                        mService.page.navigation.formTitle();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                subMenu: function (id, lblSrc, lblGrpID, lblID) {
                    try {
                        mService.page.navigation.map.subMenu.id = id;
                        mService.page.navigation.map.subMenu.lblID = lblID;
                        mService.page.navigation.map.subMenu.lblSrc = lblSrc;
                        mService.page.navigation.map.subMenu.lblGrpID = lblGrpID;
                        mService.page.navigation.reset.pageCatalog();
                        mService.page.navigation.reset.pageSubCatalog();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }
            }
        }
    },
    setAppBase: function (success, failure) {
        try {
            mService.app.loadAppSettings(function () {
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
    user: {
        getProfile: function (success, failure) {
            try {
                mService.dSource.retrieveCustomInfoDetail({
                    code: "'user_profile'",
                    refNo2: "'web'"
                }, function (data) {
                    try {
                        mService.user.profile.login = data.header;
                        mService.user.profile.funcAccess = data.detail;
                        sessionStorage.setItem("login", JSON.stringify(data.header));
                        sessionStorage.setItem("funcAccess", JSON.stringify(data.detail));
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
        resetProfile: function () {
            try {
                mService.user.profile.context.client_id = "";
                mService.user.profile.context.country_code = "";
                mService.user.profile.context.locale_id = "";
                mService.user.profile.context.session_id = "";
                mService.user.profile.context.user_id = "";
                mService.user.profile.funcAccess = [];
                mService.user.profile.login = {};
                sessionStorage.setItem("login", "");
                sessionStorage.setItem("funcAccess", "");
                sessionStorage.setItem("context", "");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        saveProfile: function (success, failure) {
            try {
                success();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    util: {
        getTransformedValue: function (value) {
            var transformedValue,
            index,
            xmlDoc,
            nodeIndex,
            jsonObj,
            key,
            valueSplit;
            try {
                transformedValue = "";
                if (value.indexOf("+") !== -1) {
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
                        } else {
                            transformedValue = $(value).getVal();
                        }
                    } else if (value === "NEWDATE") {
                        transformedValue = new Date();
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
        pageSubCatalogDetailViewActionBar: {
            hide: function () {
                try {
                    $("[data-ms-role='pageSubCatalogDetailViewActionBar'][data-ms-role-id='" + mService.page.navigation.get.pageSubCatalogID() + "'][data-ms-role-funcmenuid='" + mService.page.navigation.get.functionalMenuID() + "'][data-ms-role-submenuid='" + mService.page.navigation.get.subMenuID() + "'][data-ms-role-pagecatalogid='" + mService.page.navigation.get.pageCatalogID() + "']").hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    $("[data-ms-role='pageSubCatalogDetailViewActionBar'][data-ms-role-id='" + mService.page.navigation.get.pageSubCatalogID() + "'][data-ms-role-funcmenuid='" + mService.page.navigation.get.functionalMenuID() + "'][data-ms-role-submenuid='" + mService.page.navigation.get.subMenuID() + "'][data-ms-role-pagecatalogid='" + mService.page.navigation.get.pageCatalogID() + "']").show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
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
            }
        }
    },
    visitor: {
        getProfile: function (success, failure) {
            try {
                mService.dSource.retrieveCustomInfoDetail({
                    code: "'visitor_profile'",
                    refNo1: "",
                    refNo2: "'web'"
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
        }
    },
    wflow: {
        getWflowEvents: function (iObj, success) {
            try {
                mService.wflow.getWflowPanel(iObj.code, iObj.inputXml, function (data) {
                    try {
                        success($.grep(data, function (e, i) {
                                try {
                                    return ((e.req_catg === iObj.record.call_category && e.req_type === iObj.record.call_type && e.from_wf_stage === iObj.record.call_wf_stage && e.from_wf_status === iObj.record.call_status) || (e.req_catg === iObj.record.call_category && e.req_type === "ALL" && e.from_wf_stage === iObj.record.call_wf_stage && e.from_wf_status === iObj.record.call_status) || (e.req_catg === "ALL" && e.req_type === "ALL" && e.from_wf_stage === iObj.record.call_wf_stage && e.from_wf_status === iObj.record.call_status));
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }));
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getWflowPanel: function (code, inputXml, success) {
            var wflowList,
            dSource;
            try {
                wflowList = $.grep(mService.wflow.src, function (e, i) {
                    try {
                        return e.code === code && e.inputXml === inputXml;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                })[0];
                if (wflowList === undefined) {
                    dSource = mService.dSource.getSource({
                        code: code,
                        inputXml: inputXml
                    });
                    dSource.read().then(function () {
                        try {
                            mService.wflow.src.push({
                                code: code,
                                inputXml: inputXml,
                                data: dSource.data()
                            });
                            success(dSource.data());
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    success(wflowList.data);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        src: []
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
$(document).ready(mService.events.deviceready);