mService.settings = {
    init: function (scrID) {
        try {
            mService.settings.load(scrID, function () {
                try {
                    if ($("#" + scrID).length !== 0) {
                        $("#" + scrID).remove();
                    };
                    $("body").append(kendo.template($("#ms_" + scrID + "_template").html())({}));
                    if (scrID === "my_notification") {
                        mService.config.template.get(scrID, function () {
                            try {
                                mService.application.navigate("#" + scrID);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                console.error("Unable to load my notifications template");
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.application.navigate("#" + scrID);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function () {
                try {
                    mService.app.showToast("change_screen_failure", "system_messages");
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    load: function (scrID, success, failure) {
        try {
            if ($("#ms_" + scrID + "_template").length === 0) {
                mService.presentR.util.callAjax("lib/mservice/styles/layout/mobile." + scrID + ".template" + ((scrID === "welcome" || scrID === "signup" || scrID === "login" || scrID === "forgot_password" || scrID === "my_language" || scrID === "security_code_verification") ? ("." + mService.app.layoutSettingsConfig['mobile.inapp.features.layout.template']) : ("")) + ".html", "text", function (template) {
                    $("body").append(template);
                    success();
                }, function (error) {
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
    page: {
        afterShow: function (e) {
            try {
                if (mService.app.isMultipleAccountsAllowed()) {
                    $("#my_accounts_menu").show();
                } else {
                    $("#my_accounts_menu").hide();
                };
                mService.api.permission.checkStatus(function (data) {
                    try {
                        if (data !== "") {
                            $("#my_settings_location_badge").hide();
                            $("#my_settings_notification_badge").hide();
                            $("#my_settings_camera_badge").hide();
                            for (var index = 0; index < Object.keys(data).length; index++) {
                                if (data[Object.keys(data)[index]] === "NEVER") {
                                    $("#my_settings_location_badge").show();
                                } else if (data[Object.keys(data)[index]] === "NO") {
                                    if (Object.keys(data)[index] === "notification") {
                                        $("#my_settings_notification_badge").show();
                                    } else if (Object.keys(data)[index] === "camera") {
                                        $("#my_settings_camera_badge").show();
                                    }
                                }
                            };
                        } else {
                            $("#my_settings_location_badge").show();
                            $("#my_settings_notification_badge").show();
                            $("#my_settings_camera_badge").show();
                        };
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        beforeHide: function (e) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        beforeShow: function (e) {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        init: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        show: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    permission: {
        page: {
            afterShow: function (e) {
                var toggleLabelEle;
                try {
                    if (mService.settings.variable.permissionName === "LOCATION") {
                        $("#my_permission_location_container").show();
                        $("#my_permission_notification_container").hide();
                        $("#my_permission_camera_container").hide();
                        $("#my_permission_location").msFlipswitch({
                            scrid: "my_permission",
                            lblgrpid: "form",
                            lblid: "location"
                        });
                        $("#my_permission_location_group").removeClass("ms_form_row");
                        toggleLabelEle = $("#my_permission_location_group").find("#my_permission_location_label");
                        $(toggleLabelEle).addClass("ms_my_permission_toggle_state");
                        if (mService.app.platform == 'Android') {
                            $("#my_permission_location_sub_title").attr("data-ms-lbl-id", "sub_title_android");
                        } else {
                            $("#my_permission_location_sub_title").attr("data-ms-lbl-id", "sub_title_ios");
                        }
                    } else if (mService.settings.variable.permissionName === "NOTIFICATION") {
                        $("#my_permission_notification_container").show();
                        $("#my_permission_location_container").hide();
                        $("#my_permission_camera_container").hide();
                        $("#my_permission_notification").msFlipswitch({
                            scrid: "my_permission",
                            lblgrpid: "form",
                            lblid: "notification"
                        });
                        $("#my_permission_notification_group").removeClass("ms_form_row");
                        toggleLabelEle = $("#my_permission_notification_group").find("#my_permission_notification_label");
                        $(toggleLabelEle).addClass("ms_my_permission_toggle_state");
                        if (mService.app.platform == 'Android') {
                            $("#my_permission_notification_sub_title").attr("data-ms-lbl-id", "sub_title_android");
                        } else {
                            $("#my_permission_notification_sub_title").attr("data-ms-lbl-id", "sub_title_ios");
                        }
                    } else if (mService.settings.variable.permissionName === "CAMERA") {
                        $("#my_permission_camera_container").show();
                        $("#my_permission_notification_container").hide();
                        $("#my_permission_location_container").hide();
                        $("#my_permission_camera").msFlipswitch({
                            scrid: "my_permission",
                            lblgrpid: "form",
                            lblid: "camera"
                        });
                        $("#my_permission_camera_group").removeClass("ms_form_row");
                        toggleLabelEle = $("#my_permission_camera_group").find("#my_permission_camera_label");
                        $(toggleLabelEle).addClass("ms_my_permission_toggle_state");
                        if (mService.app.platform == 'Android') {
                            $("#my_permission_camera_sub_title").attr("data-ms-lbl-id", "sub_title_android");
                        } else {
                            $("#my_permission_camera_sub_title").attr("data-ms-lbl-id", "sub_title_ios");
                        }
                    };
                    mService.settings.permission.updateStatus();
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        updateStatus: function () {
            try {
                mService.api.permission.checkStatus(function (data) {
                    var locationSwitch,
                    notificationSwitch,
                    cameraSwitch;
                    try {
                        locationSwitch = $("#my_permission_location").data("kendoSwitch");
                        notificationSwitch = $("#my_permission_notification").data("kendoSwitch");
                        cameraSwitch = $("#my_permission_camera").data("kendoSwitch");
                        if (mService.settings.variable.permissionName === "LOCATION") {
                            if (locationSwitch !== undefined) {
                                if (data !== "") {
                                    if (data.location === "NEVER") {
                                        locationSwitch.check(false);
                                        $("#home_in_app_feature_my_settings_badge").show();
                                    } else {
                                        locationSwitch.check(true);
                                        $("#home_in_app_feature_my_settings_badge").hide();
                                    }
                                } else {
                                    locationSwitch.check(false);
                                    $("#home_in_app_feature_my_settings_badge").hide();
                                }
                            } else {
                                if (data !== "") {
                                    if (data.location === "NEVER") {
                                        $("#home_in_app_feature_my_settings_badge").show();
                                    } else {
                                        $("#home_in_app_feature_my_settings_badge").hide();
                                    }
                                } else {
                                    $("#home_in_app_feature_my_settings_badge").hide();
                                }
                            }
                        } else if (mService.settings.variable.permissionName === "NOTIFICATION") {
                            if (notificationSwitch !== undefined) {
                                if (data !== "") {
                                    if (data.notification === "NO") {
                                        notificationSwitch.check(false);
                                        $("#home_in_app_feature_my_settings_badge").show();
                                    } else {
                                        notificationSwitch.check(true);
                                        $("#home_in_app_feature_my_settings_badge").hide();
                                    }
                                } else {
                                    notificationSwitch.check(false);
                                    $("#home_in_app_feature_my_settings_badge").hide();
                                }
                            } else {
                                if (data !== "") {
                                    if (data.notification === "NO") {
                                        $("#home_in_app_feature_my_settings_badge").show();
                                    } else {
                                        $("#home_in_app_feature_my_settings_badge").hide();
                                    }
                                } else {
                                    $("#home_in_app_feature_my_settings_badge").hide();
                                }
                            }
                        } else if (mService.settings.variable.permissionName === "CAMERA") {
                            if (cameraSwitch !== undefined) {
                                if (data !== "") {
                                    if (data.camera === "NO") {
                                        cameraSwitch.check(false);
                                        $("#home_in_app_feature_my_settings_badge").show();
                                    } else {
                                        cameraSwitch.check(true);
                                        $("#home_in_app_feature_my_settings_badge").hide();
                                    }
                                } else {
                                    cameraSwitch.check(false);
                                    $("#home_in_app_feature_my_settings_badge").hide();
                                }
                            } else {
                                if (data !== "") {
                                    if (data.camera === "NO") {
                                        $("#home_in_app_feature_my_settings_badge").show();
                                    } else {
                                        $("#home_in_app_feature_my_settings_badge").hide();
                                    }
                                } else {
                                    $("#home_in_app_feature_my_settings_badge").hide();
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
        },
        widget: {
            change: {
                location: function (event) {
                    try {
                        mService.api.permission.openAppSettings(function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                console.error("openAppSettings: " + error);
                                mService.app.showToast("open_app_settings_error", "system_messages");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                notification: function (event) {
                    try {
                        if (mService.app.platform == 'Android') {
                            mService.api.permission.openAppSettings(function () {
                                try {
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (error) {
                                try {
                                    console.error("openAppSettings: " + error);
                                    mService.app.showToast("open_app_settings_error", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            mService.api.notification.getAuthorizationStatus(function (status) {
                                try {
                                    if (status === "NOT_REQUESTED") {
                                        mService.api.notification.requestAuthorization(function (status) {
                                            try {
                                                mService.api.permission.savePermissionStatus("notification", status, function () {
                                                    try {
                                                        return true;
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.api.permission.openAppSettings(function () {
                                                            try {
                                                                return true;
                                                            } catch (exception) {
                                                                mService.exception.handle(exception);
                                                            }
                                                        }, function (error) {
                                                            try {
                                                                console.error("openAppSettings: " + error);
                                                                mService.app.showToast("open_app_settings_error", "system_messages");
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
                                                mService.api.permission.savePermissionStatus("notification", "NO", function () {
                                                    try {
                                                        mService.home.locationPermissionPopup.close();
                                                        mService.app.splash.show();
                                                        mService.spinner.show();
                                                        mService.app.processAppBase();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.app.showToast("save_permission_status_error", "system_messages");
                                                        mService.home.locationPermissionPopup.close();
                                                        mService.app.splash.show();
                                                        mService.spinner.show();
                                                        mService.app.processAppBase();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else {
                                        mService.api.permission.openAppSettings(function () {
                                            try {
                                                return true;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function (error) {
                                            try {
                                                console.error("openAppSettings: " + error);
                                                mService.app.showToast("open_app_settings_error", "system_messages");
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
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                camera: function (event) {
                    try {
                        if (mService.app.platform == 'Android') {
                            mService.api.permission.openAppSettings(function () {
                                try {
                                    return true;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (error) {
                                try {
                                    console.error("openAppSettings: " + error);
                                    mService.app.showToast("open_app_settings_error", "system_messages");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            mService.api.camera.getAuthorizationStatus(function (status) {
                                try {
                                    if (status === "NOT_REQUESTED") {
                                        mService.api.camera.requestAuthorization(function (status) {
                                            try {
                                                if (status === "GRANTED") {
                                                    mService.api.permission.savePermissionStatus("camera", status, function () {
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
                                                } else {
                                                    mService.api.permission.savePermissionStatus("camera", "NO", function () {
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
                                                }
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.api.permission.savePermissionStatus("camera", "NO", function () {
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
                                    } else {
                                        mService.api.permission.openAppSettings(function () {
                                            try {
                                                return true;
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function (error) {
                                            try {
                                                console.error("openAppSettings: " + error);
                                                mService.app.showToast("open_app_settings_error", "system_messages");
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
                                    mService.api.permission.savePermissionStatus("camera", "NO", function () {
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
                            });
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
                storage: function (event) {
                    try {
                        mService.api.permission.openAppSettings(function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                console.error("openAppSettings: " + error);
                                mService.app.showToast("open_app_settings_error", "system_messages");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                },
            }
        }
    },
    profile: {
        button: {
            cancel: function () {
                try {
                    $("#my_profile_first_name").attr("readonly", true);
                    $("#my_profile_last_name").attr("readonly", true);
                    $("#my_profile_mobile_no").attr("readonly", true);
                    $("#my_profile_email_id").attr("readonly", true);
                    $("#my_profile_mobile_no_country_code").attr("readonly", true);
                    $("#my_profile_mobile_no_country_code_bottom_sheet").removeAttr("data-ms-widget-type").removeAttr("data-ms-widget-group").removeAttr("data-ms-widget-role");
                    $("#my_profile_edit_btn_container").show();
                    $("#my_profile_cancel_btn_container").hide();
                    $("#my_profile_save_btn_container").hide();
                    $("#my_profile_first_name").val(mService.app.getFirstName());
                    $("#my_profile_last_name").val(mService.app.getLastName());
                    if (mService.app.getMobileNo().indexOf("-") !== -1) {
                        $("#my_profile_mobile_no").setVal(mService.app.getMobileNo());
                    } else {
                        $("#my_profile_mobile_no").val(mService.app.getMobileNo());
                    };
                    $("#my_profile_email_id").val(mService.app.getEmailId());
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            edit: function () {
                try {
                    $("#my_profile_first_name").attr("readonly", false);
                    $("#my_profile_last_name").attr("readonly", false);
                    $("#my_profile_mobile_no").attr("readonly", false);
                    $("#my_profile_email_id").attr("readonly", false);
                    $("#my_profile_mobile_no_country_code").attr("readonly", false);
                    $("#my_profile_mobile_no_country_code_bottom_sheet").attr("data-ms-widget-type", "msWidget").attr("data-ms-widget-group", "msMobileNumber").attr("data-ms-widget-role", "bottomSheet");
                    $("#my_profile_first_name").focus();
                    $("#my_profile_edit_btn_container").hide();
                    $("#my_profile_cancel_btn_container").show();
                    $("#my_profile_save_btn_container").show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteAccount: function () {
                try {
                    mService.settings.profile.deleteAccountPopup.init(function () {
                        try {
                            mService.settings.profile.deleteAccountPopup.open();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submit: function () {
                var visitorID,
                validator;
                try {
                    mService.spinner.show();
                    setTimeout(function () {
                        try {
                            validator = $("#my_profile").kendoValidator().data("kendoValidator");
                            if (validator.validate()) {
                                if (window.navigator.onLine) {
                                    visitorID = mService.app.getProfileId() === "V" ? mService.visitor.profile.login.visitor_id : "";
                                    mService.dSource.saveCustomInfo({
                                        scrID: "system_messages",
                                        inAppCode: "my_profile",
                                        successToast: true,
                                        failureToast: true,
                                    }, {
                                        code: "'update_profile'",
                                        headerXml: "'" + JSON.stringify({
                                            "profile_firstname": $("#my_profile_first_name").val(),
                                            "profile_lastname": $("#my_profile_last_name").val(),
                                            "profile_mobile_no": $("#my_profile_mobile_no").getVal(),
                                            "profile_email_id": $("#my_profile_email_id").val(),
                                            "visitor_id": visitorID
                                        }) + "'"
                                    }, function () {
                                        try {
                                            $("#my_profile_first_name").attr("readonly", true);
                                            $("#my_profile_last_name").attr("readonly", true);
                                            $("#my_profile_mobile_no").attr("readonly", true);
                                            $("#my_profile_email_id").attr("readonly", true);
                                            $("#my_profile_mobile_no_country_code").attr("readonly", true);
                                            $("#my_profile_mobile_no_country_code_bottom_sheet").removeAttr("data-ms-widget-type").removeAttr("data-ms-widget-group").removeAttr("data-ms-widget-role");
                                            $("#my_profile_edit_btn_container").show();
                                            $("#my_profile_cancel_btn_container").hide();
                                            $("#my_profile_save_btn_container").hide();
                                            if (mService.app.getProfileId() === "V") {
                                                mService.visitor.profile.login.first_name = ($("#my_profile_first_name").val());
                                                mService.visitor.profile.login.last_name = ($("#my_profile_last_name").val());
                                                mService.visitor.profile.login.mobile_no = ($("#my_profile_mobile_no").getVal());
                                                mService.visitor.profile.login.email_id = ($("#my_profile_email_id").val());
                                                mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "visitor_profile.json", JSON.stringify(mService.visitor.profile), function () {
                                                    try {
                                                        mService.spinner.hide();
                                                        return true;
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
                                                mService.user.profile.login.first_name = ($("#my_profile_first_name").val());
                                                mService.user.profile.login.last_name = ($("#my_profile_last_name").val());
                                                mService.user.profile.login.mobile_no = ($("#my_profile_mobile_no").getVal());
                                                mService.user.profile.login.email_id = ($("#my_profile_email_id").val());
                                                mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "user_profile.json", JSON.stringify(mService.user.profile), function () {
                                                    try {
                                                        mService.spinner.hide();
                                                        return true;
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
                                    mService.spinner.hide();
                                    mService.app.showToast("internet_connection_error", "system_messages");
                                }
                            } else {
                                mService.spinner.hide();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 500);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        deleteAccountPopup: {
            init: function (success) {
                try {
                    if ($("#home_delete_account_popup").data("kendoWindow") === undefined) {
                        $("#home_delete_account_popup").kendoWindow({
                            width: (screen.width * 0.80),
                            title: {
                                text: "<span id='permission_popup_title' data-ms-lbl='field' data-ms-lbl-src='my_profile' data-ms-lbl-grpid='delete_account_popup' data-ms-lbl-id='title'></span>",
                                encoded: false
                            },
                            modal: true,
                            draggable: false,
                            resizable: false
                        });
                        $("#home_delete_account_popup").parent().addClass("ms_window");
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
                    $("#home_delete_account_popup").data("kendoWindow").open().center();
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            close: function () {
                try {
                    $("#home_delete_account_popup").data("kendoWindow").close();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submit: function () {
                try {
                    mService.spinner.show();
                    setTimeout(function () {
                        try {
                            if (window.navigator.onLine) {
                                visitorID = mService.app.getProfileId() === "V" ? mService.visitor.profile.login.visitor_id : "";
                                mService.dSource.saveCustomInfo({
                                    scrID: "my_profile",
                                    inAppCode: "my_profile_delete",
                                    successToast: true,
                                    failureToast: true,
                                }, {
                                    code: "'delete_my_account'",
                                    headerXml: "'" + JSON.stringify({
                                        "visitor_id": visitorID
                                    }) + "'"
                                }, function () {
                                    try {
                                        mService.nfs.deleteFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "visitor_profile.json", function () {
                                            try {
                                                mService.nfs.deleteFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "user_profile.json", function () {
                                                    try {
                                                        mService.visitor.profile.login = {};
                                                        mService.user.resetProfile();
                                                        mService.spinner.hide();
                                                        mService.settings.profile.deleteAccountPopup.close();
                                                        mService.page.change("welcome");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.visitor.profile.login = {};
                                                        mService.user.resetProfile();
                                                        mService.spinner.hide();
                                                        mService.settings.profile.deleteAccountPopup.close();
                                                        mService.page.change("welcome");
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
                                                mService.app.showToast("visitor_profile_delete_error", "system_messages");
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
                                        mService.spinner.hide();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                mService.spinner.hide();
                                mService.app.showToast("internet_connection_error", "system_messages");
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 500);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            cancel: function () {
                try {
                    mService.settings.profile.deleteAccountPopup.close();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        page: {
            afterShow: function (e) {
                var countryCodeList,
                filterObj,
                filterIndex;
                try {
                    $("#my_profile_first_name").val(mService.app.getFirstName());
                    $("#my_profile_last_name").val(mService.app.getLastName());
                    if (mService.app.getMobileNo().indexOf("-") !== -1) {
                        $("#my_profile_mobile_no").setVal(mService.app.getMobileNo());
                    } else {
                        $("#my_profile_mobile_no").val(mService.app.getMobileNo());
                    };
                    $("#my_profile_email_id").val(mService.app.getEmailId());
                    countryCodeList = (mService.app.appSettings.documentElement.getElementsByTagName("profile_country_code_list")[0].childNodes[0].nodeValue).split(",");
                    filterObj = {
                        logic: "or",
                        filters: [],
                    };
                    for (filterIndex = 0; filterIndex < countryCodeList.length; filterIndex++) {
                        filterObj.filters.push({
                            field: "code",
                            operator: "eq",
                            value: countryCodeList[filterIndex]
                        });
                    };
                    $("#my_profile_mobile_no").datasourceFilter(filterObj);
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                try {
                    $("#my_profile_mobile_no").msMobileNumber({
                        scrid: "my_profile",
                        lblgrpid: "form",
                        lblid: "mobile_no"
                    });
                    $("#my_profile_mobile_no_group").find("label").hide();
                    $("#my_profile_mobile_no_group").removeClass("ms_form_row");
                    $("#my_profile_mobile_no_country_code_container").removeClass("ms_mobile_number_country_code");
                    $("#my_profile_mobile_no_country_code_container").addClass("ms_my_profile_mobile_country_code");
                    $("#my_profile_mobile_no_mobile_number_container").removeClass("ms_mobile_number_no");
                    $("#my_profile_mobile_no_mobile_number_container").addClass("ms_my_profile_mobile_no");
                    $("#my_profile_mobile_no_country_code_bottom_sheet").removeClass("ms_mobile_number_country_code_icon");
                    $("#my_profile_mobile_no_country_code_bottom_sheet").addClass("ms_my_profile_mobile_country_code_icon");
                    $("#my_profile_mobile_no").attr("data-ms-rule-mandatory", "true");
                    mService.config.rule.executeConfiguredRules("my_profile");
                    $("#my_profile_edit_btn_container").show();
                    $("#my_profile_cancel_btn_container").hide();
                    $("#my_profile_save_btn_container").hide();
                    $("#my_profile_first_name").attr("readonly", true);
                    $("#my_profile_last_name").attr("readonly", true);
                    $("#my_profile_mobile_no").attr("readonly", true);
                    $("#my_profile_email_id").attr("readonly", true);
                    $("#my_profile_mobile_no_country_code").attr("readonly", true);
                    $("#my_profile_mobile_no_country_code_bottom_sheet").removeAttr("data-ms-widget-type").removeAttr("data-ms-widget-group").removeAttr("data-ms-widget-role");
                    mService.config.label.resolve();
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        widget: {
            change: {}
        }
    },
    version_update: {
        button: {
            open: function () {
                try {
                    window.minterface("UpdateNew", [], function (e) {
                        try {
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    }, function (errorMsg) {
                        try {
                            mService.app.showToast("version_update_error", "pre_signup_messages");
                            mService.exception.handle(errorMsg);
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        };
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                };
            }
        },
        page: {
            afterShow: function (e) {
                var dSrc;
                try {
                    dSrc = new kendo.data.DataSource({
                        data: mService.settings.version_update.dSource.versionUpdateMessage()
                    });
                    dSrc.read().then(function () {
                        try {
                            $("#version_update_listView").data("kendoMobileListView").setDataSource(dSrc);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                try {
                    mService.settings.version_update.dSource.version_update_listView.read();
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        dSource: {
            version_update_listView: new kendo.data.DataSource({
                data: []
            }),
            versionUpdateMessage: function () {
                var updateMsgObj;
                try {
                    updateMsgObj = [];
                    if (mService.config.label.src.pre_signup_messages !== undefined) {
                        objKey = Object.keys(mService.config.label.src.pre_signup_messages.version_update);
                        objValue = Object.values(mService.config.label.src.pre_signup_messages.version_update);
                        for (index = 1; index <= Object.keys(mService.config.label.src.pre_signup_messages.version_update).length; index++) {
                            updateMsgObj.push({
                                update_info: mService.config.label.src.pre_signup_messages.version_update["msg" + index]
                            })
                        }
                    } else {
                        updateMsgObj = [{
                                update_info: "This update having some New Enhancement"
                            }
                        ]
                    };
                    return updateMsgObj;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    my_accounts: {
        button: {
            addAccount: function () {
                try {
                    if (window.navigator.onLine) {
                        $("<div></div>").msDialog({
                            content: mService.config.template.getTransformedMessage(mService.config.label.src["my_accounts" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]["confirmMessages"]["add_account"]),
                            actions: {
                                "CANCEL": {
                                    text: "<i class='fas " + mService.icons.myNotification.cancel + "'></i>",
                                    action: function (e) {
                                        try {
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }
                                },
                                "Save": {
                                    text: "<i class='far far fa-check'></i>",
                                    action: function (e) {
                                        try {
                                            mService.page.change("welcome");
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    },
                                    primary: true
                                }
                            }
                        });
                    } else {
                        mService.app.showToast("internet_connection_error", "system_messages");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteAccount: function (uid) {
                try {
                    $("<div></div>").msDialog({
                        content: mService.config.template.getTransformedMessage(mService.config.label.src["my_accounts" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]["confirmMessages"]["delete_account"]),
                        actions: {
                            "CANCEL": {
                                text: "<i class='fas " + mService.icons.myNotification.cancel + "'></i>",
                                action: function (e) {
                                    try {
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }
                            },
                            "Delete": {
                                text: "<i class='fas " + mService.icons.myNotification.delete + "'></i>",
                                action: function (e) {
                                    var selectedRecord;
                                    try {
                                        selectedRecord = mService.settings.my_accounts.dSource.my_accounts_listView.getByUid(uid);
                                        mService.settings.my_accounts.customHandler.deleteAccount(selectedRecord);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                                primary: true
                            }
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            switchAccount: function (uid, notificationObj) {
                var selectedRecord,
                confirmMessage;
                try {
                    if (uid !== "") {
                        confirmMessage = mService.config.template.getTransformedMessage(mService.config.label.src["my_accounts" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]["confirmMessages"]["switch_account"]);
                        selectedRecord = mService.settings.my_accounts.dSource.my_accounts_listView.getByUid(uid);
                    } else {
                        confirmMessage = mService.config.template.getTransformedMessage(mService.config.label.src["pre_signup_messages"]["confirmMessages"]["switch_account"]);
                        selectedRecord = notificationObj;
                    };
                    if (selectedRecord.client_id !== mService.app.getClientId() || selectedRecord.country_code !== mService.app.getCountryCode()) {
                        $("<div></div>").msDialog({
                            content: confirmMessage,
                            actions: {
                                "CANCEL": {
                                    text: "<i class='fas " + mService.icons.myNotification.cancel + "'></i>",
                                    action: function (e) {
                                        try {
                                            mService.app.notificationDataForOtherClient = "";
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }
                                },
                                "Save": {
                                    text: "<i class='far far fa-check'></i>",
                                    action: function (e) {
                                        try {
                                            mService.settings.my_accounts.customHandler.switchAccount(selectedRecord);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    },
                                    primary: true
                                }
                            }
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        page: {
            afterShow: function (e) {
                try {
                    mService.settings.my_accounts.customHandler.formDataSource(function (accountsData) {
                        try {
                            $("#my_accounts_listView").html(mService.config.template.getRenderedHtml("my_accounts_list_view_template", accountsData));
                            mService.config.label.resolve();
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
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        dSource: {
            my_accounts_listView: new kendo.data.DataSource({
                data: []
            })
        },
        customHandler: {
            showAccountList: function (accountsDSrc) {
                try {
                    mService.spinner.hide();
                    $("#my_accounts_listView").html("");
                    $("#my_accounts_listView").html(mService.config.template.getRenderedHtml("my_accounts_list_view_template", accountsDSrc));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            formDataSource: function (success) {
                try {
                    mService.settings.my_accounts.dSource.my_accounts_listView.data([]);
                    mService.settings.my_accounts.customHandler.getAccountsData(function (accountsData) {
                        var activeAccount,
                        activeAccountIndex,
                        accountDSrc,
                        activeAccountIndex,
                        tempItem;
                        try {
                            mService.settings.my_accounts.dSource.my_accounts_listView.data(accountsData);
                            activeAccount = $.grep(mService.settings.my_accounts.dSource.my_accounts_listView.data(), function (e, i) {
                                return e.active_ind === true;
                            })[0];
                            activeAccountIndex = mService.settings.my_accounts.dSource.my_accounts_listView.indexOf(activeAccount);
                            accountDSrc = JSON.parse(JSON.stringify(mService.settings.my_accounts.dSource.my_accounts_listView.data()));
                            if (activeAccountIndex !== undefined) {
                                if (activeAccountIndex !== 0) {
                                    tempItem = accountDSrc[activeAccountIndex];
                                    accountDSrc.splice(activeAccountIndex, 1);
                                    accountDSrc.unshift(tempItem);
                                    mService.settings.my_accounts.dSource.my_accounts_listView.data(accountDSrc);
                                };
                            };
                            mService.settings.my_accounts.customHandler.updateLogo(mService.settings.my_accounts.dSource.my_accounts_listView.data(), function (accountsData) {
                                try {
                                    success(accountsData);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            failure()
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getAccountsData: function (success, failure) {
                try {
                    window.minterface("getMyAccountsData", [{
                                "folderPath": mService.app.root + "/" + "my_accounts"
                            }
                        ], function (accountsData) {
                        try {
                            success(JSON.parse(accountsData));
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
            getClientBrandLogo: function (account, success) {
                try {
                    mService.nfs.getBase64String(account.client_id + "/" + account.country_code + "/" + "logo/app_header_icon.png", function (base64String) {
                        try {
                            success(base64String);
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
            deleteAccount: function (selectedRecord) {
                try {
                    mService.spinner.show();
                    mService.containR.util.checkLocalQueueFiles(selectedRecord.client_id, selectedRecord.country_code, function () {
                        try {
                            mService.containR.util.getQueueSyncIndicator({
                                "client_id": selectedRecord.client_id,
                                "country_code": selectedRecord.country_code,
                                "user_id": selectedRecord.user_id,
                                "client_url": selectedRecord.client_url
                            }, function (ind) {
                                try {
                                    if (ind === "true") {
                                        mService.nfs.deleteFile("my_accounts" + "/" + selectedRecord.client_id + "_" + selectedRecord.country_code + ".json", function () {
                                            try {
                                                mService.nfs.deleteDirectory(selectedRecord.client_id, function () {
                                                    try {
                                                        mService.settings.my_accounts.customHandler.formDataSource(function () {
                                                            var accountsDSrc;
                                                            try {
                                                                accountsDSrc = mService.settings.my_accounts.dSource.my_accounts_listView.data();
                                                                mService.nfs.readFile("app_controller.json", function (data) {
                                                                    var appController,
                                                                    index,
                                                                    minimumLocationIntervalArray,
                                                                    minimumLocationInterval,
                                                                    minlocationClientId,
                                                                    minLocationValClientData,
                                                                    finalLocationConfigData,
                                                                    locationConfiguration;
                                                                    try {
                                                                        appController = JSON.parse(data);
                                                                        if (appController.location_configuration !== undefined) {
                                                                            if (accountsDSrc.length === 1 && accountsDSrc[0].location_fetch_interval_in_seconds == 0) {
                                                                                delete appController.location_configuration;
                                                                                mService.nfs.createFile("app_controller.json", JSON.stringify(appController), function () {
                                                                                    try {
                                                                                        mService.app.showToast("delete_account_success", "my_accounts");
                                                                                        mService.settings.my_accounts.customHandler.showAccountList(accountsDSrc);
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                }, function () {
                                                                                    try {
                                                                                        mService.app.showToast("delete_account_error", "my_accounts");
                                                                                        mService.settings.my_accounts.customHandler.showAccountList(accountsDSrc);
                                                                                    } catch (exception) {
                                                                                        mService.exception.handle(exception);
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                minimumLocationIntervalArray = [];
                                                                                for (index = 0; index < accountsDSrc.length; index++) {
                                                                                    if (parseInt(accountsDSrc[index].location_fetch_interval_in_seconds) != 0) {
                                                                                        minimumLocationIntervalArray.push(accountsDSrc[index].location_fetch_interval_in_seconds);
                                                                                    };
                                                                                    minimumLocationInterval = Math.min.apply(Math, minimumLocationIntervalArray);
                                                                                    minlocationClientId = "";
                                                                                    minLocationValClientData = $.grep(accountsDSrc, function (e, i) {
                                                                                        return e.location_fetch_interval_in_seconds == parseInt(minimumLocationInterval);
                                                                                    })[0];
                                                                                    if (minLocationValClientData !== undefined) {
                                                                                        minlocationClientId = minLocationValClientData.client_id;
                                                                                    }
                                                                                    finalLocationConfigData = {
                                                                                        location_fetch_interval_in_seconds: minimumLocationInterval,
                                                                                        client_id: minlocationClientId
                                                                                    };
                                                                                    if (parseInt(finalLocationConfigData.location_fetch_interval_in_seconds) > 0) {
                                                                                        mService.util.updateLocationConfiguration(finalLocationConfigData, function () {
                                                                                            try {
                                                                                                mService.app.showToast("delete_account_success", "my_accounts");
                                                                                                mService.settings.my_accounts.customHandler.showAccountList(accountsDSrc);
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        }, function () {
                                                                                            try {
                                                                                                mService.app.showToast("location_configuration_update_error", "my_accounts");
                                                                                                mService.settings.my_accounts.customHandler.showAccountList(accountsDSrc);
                                                                                            } catch (exception) {
                                                                                                mService.exception.handle(exception);
                                                                                            }
                                                                                        });
                                                                                    } else {
                                                                                        mService.app.showToast("delete_account_success", "my_accounts");
                                                                                        mService.settings.my_accounts.customHandler.showAccountList(accountsDSrc);
                                                                                    }
                                                                                }
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
                                                                mService.spinner.hide();
                                                                mService.app.showToast("load_account_error", "my_accounts");
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
                                                        mService.app.showToast("delete_account_error", "my_accounts");
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
                                                mService.app.showToast("delete_account_error", "my_accounts");
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } else if (ind === "false") {
                                        mService.spinner.hide();
                                        mService.app.showToast("delete_account_failure_call_sync_pending", "my_accounts");
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (error_code) {
                                try {
                                    mService.spinner.hide();
                                    mService.app.showToast("delete_account_failure_call_sync_pending", "my_accounts");
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
                            mService.app.showToast("delete_account_failure_call_sync_pending", "my_accounts");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            switchAccount: function (selectedRecord) {
                try {
                    mService.spinner.show();
                    mService.nfs.readFile("my_accounts" + "/" + selectedRecord.client_id + "_" + selectedRecord.country_code + ".json", function (data) {
                        var accounts; ;
                        try {
                            accounts = mService.settings.my_accounts.dSource.my_accounts_listView.data();
                            if (accounts.length > 1) {
                                mService.settings.my_accounts.customHandler.switchTOOtherAccount(accounts, selectedRecord);
                            } else {
                                mService.settings.my_accounts.customHandler.formDataSource(function (accountsData) {
                                    try {
                                        mService.settings.my_accounts.customHandler.switchTOOtherAccount(mService.settings.my_accounts.dSource.my_accounts_listView.data(), selectedRecord);
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
                            };
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.spinner.hide();
                            mService.app.showToast("switch_account_error", "my_accounts");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            switchTOOtherAccount: function (accounts, selectedRecord) {
                try {
                    mService.settings.my_accounts.variable.accountsCounter = 0;
                    mService.settings.my_accounts.customHandler.updateAccounts(accounts, selectedRecord, function () {
                        try {
                            mService.app.profile.loadMyAccounts(function () {
                                try {
                                    setTimeout(function () {
                                        try {
                                            mService.app.showToast("switch_account_success", "pre_signup_messages");
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, 100);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.spinner.hide();
                                    mService.app.showToast("switch_account_error", "my_accounts");
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
                            mService.app.showToast("switch_account_error", "my_accounts");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            saveMyAccountFile: function (account, success, failure) {
                try {
                    mService.nfs.createFile("my_accounts" + "/" + account.client_id + "_" + account.country_code + ".json", JSON.stringify(account), function () {
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
            updateAccounts: function (accounts, selectedRecord, success, failure) {
                var account;
                try {
                    account = accounts[mService.settings.my_accounts.variable.accountsCounter];
                    account.active_ind = account.client_id === selectedRecord.client_id ? true : false;
                    mService.settings.my_accounts.customHandler.saveMyAccountFile(account, function () {
                        try {
                            mService.settings.my_accounts.variable.accountsCounter++;
                            if (mService.settings.my_accounts.variable.accountsCounter < accounts.length) {
                                mService.settings.my_accounts.customHandler.updateAccounts(accounts, selectedRecord, success, failure);
                            } else {
                                mService.settings.my_accounts.variable.accountsCounter = 0;
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.settings.my_accounts.variable.accountsCounter = 0;
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            updateLogo: function (accounts, success) {
                var account;
                try {
                    account = accounts[mService.settings.my_accounts.variable.accountsCounter];
                    mService.settings.my_accounts.customHandler.getClientBrandLogo(account, function (base64String) {
                        try {
                            accounts[mService.settings.my_accounts.variable.accountsCounter].logo = base64String;
                            mService.settings.my_accounts.variable.accountsCounter++;
                            if (mService.settings.my_accounts.variable.accountsCounter < accounts.length) {
                                mService.settings.my_accounts.customHandler.updateLogo(accounts, success);
                            } else {
                                mService.settings.my_accounts.variable.accountsCounter = 0;
                                success(accounts);
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            accounts[mService.settings.my_accounts.variable.accountsCounter].logo = base64String;
                            mService.settings.my_accounts.variable.accountsCounter++;
                            if (mService.settings.my_accounts.variable.accountsCounter < accounts.length) {
                                mService.settings.my_accounts.customHandler.updateLogo(accounts, success, failure);
                            } else {
                                mService.settings.my_accounts.variable.accountsCounter = 0;
                                success(accounts);
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
        variable: {
            accountsCounter: 0
        }
    },
    my_language: {
        button: {
            submit: function () {
                var visitorID;
                try {
                    mService.spinner.show();
                    visitorID = mService.app.getProfileId() === "V" ? mService.visitor.profile.login.visitor_id : "";
                    mService.dSource.saveCustomInfo({
                        scrID: "system_messages",
                        inAppCode: "my_language",
                        successToast: true,
                        failureToast: true,
                    }, {
                        code: "'update_profile'",
                        headerXml: "'" + JSON.stringify({
                            "my_language": $("input[name='my_language_list']:checked").val(),
                            "visitor_id": visitorID
                        }) + "'"
                    }, function () {
                        try {
                            mService.spinner.hide();
                            if (mService.app.getProfileId() === "V") {
                                mService.visitor.profile.context.locale_id = $("input[name='my_language_list']:checked").val();
                                mService.visitor.profile.login.locale_id = $("input[name='my_language_list']:checked").val();
                                mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "visitor_profile.json", JSON.stringify(mService.visitor.profile), function () {
                                    try {
                                        mService.app.load.systemMessages(function () {
                                            try {
                                                mService.home.functionalDrawer.activate();
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
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } else {
                                mService.user.profile.login.locale_id = $("input[name='my_language_list']:checked").val();
                                mService.user.profile.context.locale_id = $("input[name='my_language_list']:checked").val();
                                mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "user_profile.json", JSON.stringify(mService.user.profile), function () {
                                    try {
                                        mService.app.load.systemMessages(function () {
                                            try {
                                                mService.home.functionalDrawer.activate();
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
                                        return true;
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
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        page: {
            afterShow: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                try {
                    mService.settings.my_language.dSource.languageSource.read().then(function () {
                        var languageHtml;
                        try {
                            languageHtml = "";
                            for (index = 0; index < mService.settings.my_language.dSource.languageSource.data().length; index++) {
                                languageHtml += mService.config.template.getTransformedHtml("my_language_listView_template", mService.settings.my_language.dSource.languageSource.data()[index]);
                            };
                            $("#my_language_list_content").html(languageHtml);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        dSource: {
            languageSource: mService.dSource.getSource({
                code: "'applicable_locale'"
            })
        }
    },
    my_notification: {
        button: {
            openNotification: function (uid) {
                var selectedRecord;
                try {
                    selectedRecord = mService.settings.my_notification.dSource.my_notification_listView.getByUid(uid);
                    mService.fcm.event.mobile.notificationOpened({
                        notification: {
                            payload: selectedRecord
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteNotification: function (uid) {
                var selectedRecord;
                try {
                    selectedRecord = mService.settings.my_notification.dSource.my_notification_listView.getByUid(uid);
                    $("<div></div>").msDialog({
                        content: mService.config.template.getTransformedMessage(mService.config.label.src["my_notification" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]["confirmMessages"]["deleteConfirm"]),
                        actions: {
                            "CANCEL": {
                                text: "<i class='fas " + mService.icons.myNotification.cancel + "'></i>",
                                action: function (e) {
                                    try {
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }
                            },
                            "Delete": {
                                text: "<i class='fas " + mService.icons.myNotification.delete + "'></i>",
                                action: function (e) {
                                    try {
                                        mService.nfs.deleteFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + selectedRecord.additionalData.msgBody.readIndication + "/" + selectedRecord.notificationId + ".json", function () {
                                            try {
                                                mService.app.showToast("delete_success", "my_notification");
                                                mService.settings.my_notification.dSource.my_notification_listView.remove(selectedRecord);
                                                $('#my_notification_listView').children().each(function () {
                                                    try {
                                                        if ($(this).attr("data-id") !== undefined && $(this).attr("data-id") === uid) {
                                                            $(this).remove();
                                                            if ($('#my_notification_listView').children().length === 1) {
                                                                $("#my_notification_search_container").hide();
                                                                $("#my_notification_search_empty_state_image").hide();
                                                                $("#my_notification_empty_state_image").show();
                                                                $("#my_notification_listView").hide();
                                                            }
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
                                                mService.app.showToast("delete_error", "my_notification");
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                                primary: true
                            }
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            clearSearch: function (ele, evt) {
                try {
                    $("#my_notification_search").val("");
                    $("#my_notification_search_clear_btn").hide();
                    $("#my_notification_empty_state_image").hide();
                    $("#my_notification_search_empty_state_image").hide();
                    $("#my_notification_listView").show();
                    $('#my_notification_listView').children().show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            deleteAll: function (ele, evt) {
                try {
                    $("<div></div>").msDialog({
                        content: mService.config.template.getTransformedMessage(mService.config.label.src["my_notification" + "_" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + "_" + mService.app.getLocaleId()]["confirmMessages"]["deleteAllConfirm"]),
                        actions: {
                            "CANCEL": {
                                text: "<i class='fas " + mService.icons.myNotification.cancel + "'></i>",
                                action: function (e) {
                                    try {
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }
                            },
                            "Delete": {
                                text: "<i class='fas " + mService.icons.myNotification.delete + "'></i>",
                                action: function (e) {
                                    try {
                                        mService.nfs.deleteDirectory(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + "unread", function () {
                                            try {
                                                mService.nfs.deleteDirectory(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + "read", function () {
                                                    try {
                                                        mService.app.showToast("delete_all_success", "my_notification");
                                                        $('#my_notification_listView').children().not(':first').remove();
                                                        $("#my_notification_search_box").val("");
                                                        $("#my_notification_clear_btn").hide();
                                                        $("#my_notification_search_container").hide();
                                                        $("#my_notification_empty_state_image").show();
                                                        $("#my_notification_search_empty_state_image").hide();
                                                        $("#my_notification_listView").hide();
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.app.showToast("delete_all_error", "my_notification");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, function () {
                                            try {
                                                mService.app.showToast("my_notification_deleteAll_error", "system_messages");
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                },
                                primary: true
                            }
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        page: {
            afterShow: function (e) {
                try {
                    $("#my_notification_search_clear_btn").hide();
                    mService.settings.my_notification.customHandler.formDataSource(function () {
                        try {
                            window.plugins.OneSignal.clearOneSignalNotifications();
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
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                var emptyStateTemplate;
                try {
                    emptyStateTemplate = $("body [data-ms-mswidget-for='my_notification'][data-ms-mswidget-template-type='empty_state']");
                    if (emptyStateTemplate.length === 1) {
                        $("#my_notification_empty_state_image").html(mService.config.template.getTransformedHtml($(emptyStateTemplate[0]).attr("id")));
                        $("#my_notification_empty_state_image").hide();
                    };
                    emptyStateTemplate = $("body [data-ms-mswidget-for='my_notification'][data-ms-mswidget-template-type='search_empty_state']");
                    if (emptyStateTemplate.length === 1) {
                        $("#my_notification_search_empty_state_image").html(mService.config.template.getTransformedHtml($(emptyStateTemplate[0]).attr("id")));
                        $("#my_notification_search_empty_state_image").hide();
                    };
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        dSource: {
            my_notification_listView: new kendo.data.DataSource({
                data: []
            })
        },
        customHandler: {
            addNotificationData: function (success, failure) {
                var readIndication,
                fileName;
                try {
                    readIndication = ((mService.settings.my_notification.variable.dataListCounter < mService.settings.my_notification.variable.unreadFilesCount) ? ("unread") : ("read"));
                    fileName = mService.settings.my_notification.variable.dataList[mService.settings.my_notification.variable.dataListCounter];
                    mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + readIndication + "/" + fileName, function (data) {
                        try {
                            data = JSON.parse(data);
                            data.additionalData.msgBody.readIndication = readIndication;
                            mService.settings.my_notification.dSource.my_notification_listView.add(data);
                            mService.settings.my_notification.variable.dataListCounter++;
                            if (mService.settings.my_notification.variable.dataListCounter < mService.settings.my_notification.variable.dataList.length) {
                                mService.settings.my_notification.customHandler.addNotificationData(function () {
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
                                mService.settings.my_notification.variable.dataListCounter = 0;
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
                    }, true);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            formDataSource: function (success, failure) {
                try {
                    $("#my_notification_search_container").show();
                    $("#my_notification_empty_state_image").hide();
                    $("#my_notification_search_empty_state_image").hide();
                    $("#my_notification_listView").show();
                    mService.settings.my_notification.dSource.my_notification_listView.data([]);
                    mService.settings.my_notification.customHandler.getUnreadFiles(function (unreadFiles) {
                        try {
                            mService.settings.my_notification.customHandler.getReadFiles(function (readFiles) {
                                try {
                                    mService.settings.my_notification.variable.dataList = unreadFiles.concat(readFiles);
                                    mService.settings.my_notification.variable.unreadFilesCount = unreadFiles.length;
                                    mService.settings.my_notification.variable.dataListCounter = 0;
                                    mService.settings.my_notification.customHandler.readNotificationData(function () {
                                        try {
                                            mService.settings.my_notification.dSource.my_notification_listView.sort({
                                                field: "additionalData.msgBody.dateTime",
                                                dir: "desc"
                                            });
                                            $('#my_notification_listView').children().not(':first').remove();
                                            $("#my_notification_search_box").val("");
                                            $("#my_notification_clear_btn").hide();
                                            $("#my_notification_listView").append(mService.config.template.getRenderedHtml("my_notification_list_view_template", mService.settings.my_notification.dSource.my_notification_listView.data()));
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            $("#my_notification_search_container").hide();
                                            $("#my_notification_search_empty_state_image").hide();
                                            $("#my_notification_empty_state_image").show();
                                            $("#my_notification_listView").hide();
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
            getReadFiles: function (success) {
                try {
                    mService.nfs.getFileList(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + "read", function (readFiles) {
                        try {
                            success(readFiles);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            success([]);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getUnreadFiles: function (success) {
                try {
                    mService.nfs.getFileList(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + "unread", function (unreadFiles) {
                        try {
                            success(unreadFiles);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            success([]);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            readNotificationData: function (success, failure) {
                try {
                    mService.settings.my_notification.customHandler.addNotificationData(function () {
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
        list: {
            search: function (ele, evt) {
                var searchQuery,
                noDataFound;
                try {
                    noDataFound = true;
                    searchQuery = $(ele).val().toLowerCase().trim();
                    $("#my_notification_empty_state_image").hide();
                    $("#my_notification_search_empty_state_image").hide();
                    $("#my_notification_listView").show();
                    $("#my_notification_search_clear_btn").show();
                    if (searchQuery !== "") {
                        $('#my_notification_listView').children().each(function (index) {
                            try {
                                if (index === 0) {
                                    return true;
                                };
                                kendo.fx($(this)).slideIn("up").stop();
                                var text = $(this).text().toLowerCase();
                                if (text.includes(searchQuery)) {
                                    kendo.fx($(this)).slideIn("up").duration(500).play().then(function () {
                                        try {
                                            $(this).show();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                    noDataFound = false;
                                } else {
                                    kendo.fx($(this)).slideIn("down").play().then(function () {
                                        try {
                                            $(this).hide();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        kendo.fx($('#my_notification_listView').children().not(':first')).slideIn("up").duration(500).play().then(function () {
                            try {
                                $('#my_notification_listView').children().show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        $("#my_notification_search_clear_btn").hide();
                        noDataFound = false;
                    };
                    if (noDataFound) {
                        $("#my_notification_search_empty_state_image").show();
                        $("#my_notification_empty_state_image").hide();
                        $("#my_notification_listView").children().not(':first').hide();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        variable: {
            notificationPayload: ""
        }
    },
    welcome: {
        button: {
            appmodeClick: function () {
                try {
                    mService.settings.welcome.variable.appmodeClickCount++;
                    if (mService.settings.welcome.variable.appmodeClickCount === 5) {
                        mService.settings.welcome.variable.appmodeClickCount = 0;
                        $("#welcome_environment_list").data("kendoWindow").open().center();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            environmentClick: function (ele, evt) {
                try {
                    $("#welcome_environment_list").data("kendoWindow").close();
                    if (mService.app.activeDomainCode !== undefined && mService.app.activeDomainCode !== ele.attr("data-domain-code")) {
                        $("<div></div>").msDialog({
                            content: "Your app data and files will be lost by doing this. Are you sure want to continue?",
                            actions: {
                                "CANCEL": {
                                    text: "<i class='fas " + mService.icons.myNotification.cancel + "'></i>",
                                    action: function (e) {
                                        try {
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }
                                },
                                "OK": {
                                    text: "<i class='far far fa-check'></i>",
                                    action: function (e) {
                                        try {
                                            window.minterface("KillBackgroundExecutions", [], function (message) {
                                                mService.nfs.deleteDirectory("", function () {
                                                    try {
                                                        mService.settings.welcome.util.updateEnvironment(ele);
                                                        if (mService.api !== undefined) {
                                                            mService.util.updatePermissionStatus();
                                                        };
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        console.error("error occured in deleteDirectory");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                });
                                            }, function () {
                                                console.error("error occured in KillBackgroundExecutions");
                                            });
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    },
                                    primary: true
                                }
                            }
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            signup: function () {
                try {}
                catch (exception) {
                    mService.exception.handle(exception);
                };
            },
            login: function () {
                try {}
                catch (exception) {
                    mService.exception.handle(exception);
                };
            }
        },
        page: {
            afterShow: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                var environmentList,
                index;
                try {
                    environmentList = mService.app.appSettings.documentElement.getElementsByTagName("environment_list")[0];
                    $("#welcome_environment_list_data").html("");
                    for (index = 0; index < environmentList.childNodes.length; index++) {
                        $("#welcome_environment_list_data").append(mService.config.template.getTransformedHtml("welcome_environment_list_template", {
                                environmentName: environmentList.childNodes[index].getElementsByTagName("name")[0].childNodes[0].nodeValue,
                                environmentCode: environmentList.childNodes[index].nodeName,
                                launchUrl: environmentList.childNodes[index].getElementsByTagName("launch_url")[0].childNodes[0].nodeValue,
                            }));
                    };
                    $("#welcome_environment_list li").css("height", screen.height * 0.07);
                    $("#welcome_environment_list").kendoWindow({
                        width: screen.width * 0.8,
                        title: {
                            text: "Choose Environment",
                            encoded: false,
                        },
                        modal: true,
                        draggable: false,
                        resizable: false,
                    });
                    $("#welcome_environment_list").parent().addClass("ms_window");
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    appSettingsData = mService.app.appSettings;
                    if (appSettingsData.documentElement.getElementsByTagName("company_privacy_policy_url")[0].childNodes[0] !== undefined) {
                        companyPrivacyPolicyUrl = appSettingsData.documentElement.getElementsByTagName("company_privacy_policy_url")[0].childNodes[0].nodeValue;
                        $("#ms_company_privacy_policy").attr("href", companyPrivacyPolicyUrl);
                    } else {
                        $("#ms_company_privacy_policy").parent().hide();
                    };
                    if (appSettingsData.documentElement.getElementsByTagName("provider_privacy_policy_url")[0].childNodes[0] !== undefined) {
                        provider_privacy_policy_url = appSettingsData.documentElement.getElementsByTagName("provider_privacy_policy_url")[0].childNodes[0].nodeValue;
                        $("#ms_provider_privacy_policy").attr("href", provider_privacy_policy_url);
                    } else {
                        $("#ms_provider_privacy_policy").parent().hide();
                    };
                    if (appSettingsData.documentElement.getElementsByTagName("company_privacy_policy_url")[0].childNodes[0] === undefined || appSettingsData.documentElement.getElementsByTagName("provider_privacy_policy_url")[0].childNodes[0] === undefined) {
                        $("#ms_company_privacy_policy").text("Privacy Policy");
                        $("#ms_provider_privacy_policy").text("Privacy Policy");
                    };
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        util: {
            updateEnvironment: function (ele) {
                try {
                    mService.app.launchURL = mService.app.appSettings.documentElement.getElementsByTagName("environment_list")[0].getElementsByTagName(ele.attr("data-domain-code"))[0].getElementsByTagName("launch_url")[0].childNodes[0].nodeValue;
                    mService.app.activeDomainCode = ele.attr("data-domain-code");
                    mService.app.activeDomainName = ele.text();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        variable: {
            appmodeClickCount: 0,
            countryListArray: []
        }
    },
    change_password: {
        button: {
            submit: function () {
                mService.spinner.show();
                var oldPassword = $("#change_password_old_password").val(),
                newPassword = $("#change_password_new_password").val(),
                confirmNewPassword = $("#change_password_confirm_password").val();
                try {
                    if (oldPassword !== "" && newPassword !== "" && confirmNewPassword !== "") {
                        if (oldPassword !== newPassword) {
                            if (newPassword === confirmNewPassword) {
                                if (newPassword.length >= 8) {
                                    if (newPassword.match(/^(?=.*[!@#$%^&*])/) && newPassword.match(/[a-z]/g) && newPassword.match(/[A-Z]/g) && newPassword.match(/[0-9]/g)) {
                                        if (!validator.validate()) {
                                            mService.util.validateInputFields("change_password");
                                        };
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
                                                            p_old_password: $("#change_password_old_password").val(),
                                                            p_new_password: $("#change_password_new_password").val()
                                                        }
                                                    }
                                                }),
                                                error: function () {
                                                    try {
                                                        mService.spinner.hide();
                                                        mService.app.showToast("change_password_failure", "system_messages");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                },
                                                success: function (response) {
                                                    try {
                                                        mService.spinner.hide();
                                                        mService.app.showToast("change_password_success", "system_messages");
                                                        mService.app.processLogout();
                                                        mService.page.change("login");
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }
                                            });
                                        } else {
                                            mService.spinner.hide();
                                            mService.app.showToast("internet_connection_error", "system_messages");
                                        }
                                    } else {
                                        mService.spinner.hide();
                                        mService.app.showToast("password_strength", "system_messages");
                                    }
                                } else {
                                    mService.spinner.hide();
                                    mService.app.showToast("password_min_length", "system_messages");
                                }
                            } else {
                                mService.spinner.hide();
                                mService.app.showToast("new_password_match_error", "system_messages");
                            }
                        } else {
                            mService.spinner.hide();
                            mService.app.showToast("old_password_match_error", "system_messages");
                        }
                    } else {
                        mService.spinner.hide();
                        mService.app.showToast("mandatory_error", "system_messages");
                        validator = $("#change_password_screen_form").kendoValidator().data("kendoValidator");
                        if (!validator.validate()) {
                            mService.util.validateInputFields("change_password");
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        page: {
            afterShow: function (e) {
                try {
                    if (mService.settings.variable.fromScreen !== "undefined" && mService.settings.variable.fromScreen === "login") {
                        $("#change_password_info").show();
                        $("#change_password_password_rule").hide();
                        setTimeout(function () {
                            try {
                                $("#change_password_info").hide();
                                $("#change_password_password_rule").show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 10000);
                    } else {
                        $("#change_password_info").hide();
                    };
                    $('#change_password input').on('blur', function (event) {
                        mService.util.validateInputFields("change_password");
                    });
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    forgot_password: {
        button: {
            submit: function () {
                try {
                    if (mService.home.loginPopup.variable.countryListArray.length !== 0) {
                        mService.visitor.profile.context.country_code = $("#home_login_popup_country_code").data("kendoDropDownList").value();
                    } else {
                        mService.visitor.profile.context.country_code = mService.app.appSettings.documentElement.getElementsByTagName("default_country_code")[0].childNodes[0].nodeValue;
                    };
                    validator = $("#forgot_password_form").kendoValidator().data("kendoValidator");
                    if (validator.validate()) {
                        mService.util.validateInputFields("forgot_password");
                        mService.spinner.show();
                        if (window.navigator.onLine) {
                            mService.setCvsBase(true, function () {
                                try {
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
                                                    p_req_user_id: $("#forgot_password_user_name").val(),
                                                    p_req_country_code: mService.app.getCountryCode(),
                                                    p_req_email_id: $("#forgot_password_email_id").val()
                                                }
                                            }
                                        }),
                                        complete: function (response, status) {
                                            var responseSrc;
                                            try {
                                                mService.spinner.hide();
                                                if (status === "success") {
                                                    responseSrc = JSON.parse(response.responseText);
                                                    if (responseSrc.document !== undefined && responseSrc.document.ApplicationException !== undefined) {
                                                        mService.app.showToast("forgot_password_update_error", "pre_signup_messages", {
                                                            errorNumber: responseSrc.document.ApplicationException.errorNumber,
                                                            errorDescription: responseSrc.document.ApplicationException.errorDescription
                                                        });
                                                    } else {
                                                        mService.app.showToast("forgot_password_success", "pre_signup_messages");
                                                    }
                                                } else {
                                                    mService.app.showToast("forgot_password_failed", "pre_signup_messages");
                                                }
                                            } catch (e) {
                                                failure("location_EC002_error");
                                            }
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
                            mService.spinner.hide();
                            mService.app.alert("error", {
                                scrid: "",
                                lblid: "internet_connection_error",
                                lblgrpid: "error"
                            });
                        }
                    } else {
                        mService.util.validateInputFields("forgot_password");
                        mService.app.showToast("mandatory_error", "pre_signup_messages");
                        if (!mService.util.validateEmailID($("#forgot_password_email_id").val())) {
                            mService.app.showToast("email_id_invalid", "pre_signup_messages");
                        };
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        page: {
            afterShow: function (e) {
                try {
                    $('#forgot_password input').on('blur', function (event) {
                        mService.util.validateInputFields("forgot_password");
                    });
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    punch_in_out: {
        button: {
            punchInSubmit: function () {
                try {
                    mService.home.punchInOutPopup.submitData(true, function () {
                        try {
                            $("#punch_in_out_title_lbl").removeAttr("data-ms-lbl-locale");
                            $("#punch_in_out_title_lbl").attr("data-ms-lbl-id", "punch_out_title");
                            mService.settings.punch_in_out.util.updatePunchInOutData();
                            mService.util.showHideFeature("punch_out", true);
                            mService.util.showHideFeature("punch_in", false);
                            mService.config.label.resolve();
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
            punchOutSubmit: function () {
                try {
                    mService.home.punchInOutPopup.submitData(false, function () {
                        try {
                            $("#punch_in_out_title_lbl").removeAttr("data-ms-lbl-locale");
                            $("#punch_in_out_title_lbl").attr("data-ms-lbl-id", "punch_details");
                            mService.settings.punch_in_out.util.updatePunchInOutData();
                            mService.util.showHideFeature("punch_in", true);
                            mService.util.showHideFeature("punch_out", false);
                            mService.config.label.resolve();
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
        page: {
            afterShow: function (e) {
                try {
                    $("#punch_in_out_title_lbl").removeAttr("data-ms-lbl-locale");
                    $("#punch_in_out_title_lbl").attr("data-ms-lbl-id", "punch_in_title");
                    mService.config.label.resolve();
                    mService.settings.punch_in_out.util.updatePunchInOutData();
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeHide: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            beforeShow: function (e) {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            show: function () {
                try {
                    return true;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        util: {
            updatePunchInOutData: function () {
                try {
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
                                            $("#punch_in_message_container").show();
                                            $("#punch_in_out_title_lbl").removeAttr("data-ms-lbl-locale");
                                            $("#punch_in_out_title_lbl").attr("data-ms-lbl-id", "punch_in_title");
                                            $("#punch_in_date_header").hide();
                                            $("#punch_out_date_header").hide();
                                            $("#punch_in_date").hide();
                                            $("#punch_out_date").hide();
                                            $("#punch_in_container").show();
                                            $("#punch_out_container").hide();
                                        } else if (data.punchout_hour === "0") {
                                            $("#punch_in_message_container").hide();
                                            $("#punch_in_out_title_lbl").removeAttr("data-ms-lbl-locale");
                                            $("#punch_in_out_title_lbl").attr("data-ms-lbl-id", "punch_out_title");
                                            punchInDate = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]), parseInt(data.punchin_hour), parseInt(data.punchin_minute));
                                            $("#punch_in_date_lbl").text(mService.util.getDateTimeString(punchInDate, "dd-MM-yyyy"));
                                            $("#punch_in_time_lbl").text(mService.util.getDateTimeString(punchInDate, "HH:mm"));
                                            $("#punch_in_date_header").show();
                                            $("#punch_out_date_header").hide();
                                            $("#punch_in_date").show();
                                            $("#punch_out_date").hide();
                                            $("#punch_in_container").hide();
                                            $("#punch_out_container").show();
                                            $("#punch_date_container").addClass("ms_punch_lbl_container");
                                            $("#punch_date_container").removeClass("ms_punch_dates_lbl_container");
                                        } else {
                                            $("#punch_in_message_container").hide();
                                            $("#punch_in_out_title_lbl").removeAttr("data-ms-lbl-locale");
                                            $("#punch_in_out_title_lbl").attr("data-ms-lbl-id", "punch_details");
                                            punchInDate = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]), parseInt(data.punchin_hour), parseInt(data.punchin_minute));
                                            punchOutDate = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]), parseInt(data.punchout_hour), parseInt(data.punchout_minute));
                                            $("#punch_in_date_header").show();
                                            $("#punch_out_date_header").show();
                                            $("#punch_in_date_lbl").text(mService.util.getDateTimeString(punchInDate, "dd-MM-yyyy"));
                                            $("#punch_in_time_lbl").text(mService.util.getDateTimeString(punchInDate, "HH:mm"));
                                            $("#punch_out_date_lbl").text(mService.util.getDateTimeString(punchOutDate, "dd-MM-yyyy"));
                                            $("#punch_out_time_lbl").text(mService.util.getDateTimeString(punchOutDate, "HH:mm"));
                                            $("#punch_in_date").show();
                                            $("#punch_out_date").show();
                                            $("#punch_date_container").removeClass("ms_punch_lbl_container");
                                            $("#punch_date_container").addClass("ms_punch_dates_lbl_container");
                                            $("#punch_in_container").hide();
                                            $("#punch_out_container").hide();
                                        }
                                    } else {
                                        $("#punch_in_message_container").show();
                                        $("#punch_in_date_header").show();
                                        $("#punch_out_date_header").hide();
                                        $("#punch_in_container").show();
                                        $("#punch_out_container").hide();
                                        $("#punch_in_date").hide();
                                        $("#punch_out_date").hide();
                                    };
                                    mService.config.label.resolve();
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
                            $("#punch_in_out_title_lbl").removeAttr("data-ms-lbl-locale");
                            $("#punch_in_out_title_lbl").attr("data-ms-lbl-id", "punch_in_title");
                            $("#punch_in_container").show();
                            $("#punch_out_container").hide();
                            $("#punch_in_date").hide();
                            $("#punch_out_date").hide();
                            mService.config.label.resolve();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        }
    },
    variable: {}
};