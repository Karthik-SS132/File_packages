mService.permissions = {
    init: function (scrID) {
        try {
            mService.permissions.load(scrID, function () {
                try {
                    if ($("#" + scrID).length !== 0) {
                        $("#" + scrID).remove();
                    };
                    $("body").append(kendo.template($("#ms_" + scrID + "_template").html())({}));
                    mService.application.navigate("#" + scrID);
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
    handleCamera: function (selectedRecord) {
        try {
            mService.api.camera.requestAuthorization(function (status) {
                try {
                    if (status === "GRANTED") {
                        mService.api.permission.savePermissionStatus("camera", status, function () {
                            try {
                                mService.permissions.getOtherPermissions(selectedRecord);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("save_permission_status_error", "system_messages");
                                mService.permissions.getOtherPermissions(selectedRecord);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.app.showToast("permission_denied", "pre_signup_messages");
                        mService.api.permission.savePermissionStatus("camera", "NO", function () {
                            try {
                                mService.permissions.getOtherPermissions(selectedRecord);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("save_permission_status_error", "system_messages");
                                mService.permissions.getOtherPermissions(selectedRecord);
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
                    mService.app.showToast("permission_denied", "pre_signup_messages");
                    mService.api.permission.savePermissionStatus("camera", "NO", function () {
                        try {
                            mService.permissions.getOtherPermissions(selectedRecord);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.app.showToast("save_permission_status_error", "system_messages");
                            mService.permissions.getOtherPermissions(selectedRecord);
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
    handleStorage: function (selectedRecord) {
        try {
            mService.api.storage.requestAuthorization(function (status) {
                try {
                    if (status === "GRANTED") {
                        mService.permissions.getOtherPermissions(selectedRecord);
                    } else if (status === "DENIED_ALWAYS") {
                        mService.app.showToast("storage_permission_allow_in_settings", "pre_signup_messages");
                        mService.app.exit();
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
                        mService.app.showToast("storage_permission_not_allowed", "pre_signup_messages");
                        mService.app.exit();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function () {
                try {
                    mService.app.showToast("storage_permission_not_allowed", "pre_signup_messages");
                    mService.home.locationPermissionPopup.close();
                    mService.app.exit();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    handleNotification: function (selectedRecord) {
        try {
            mService.api.notification.requestAuthorization(function (status) {
                try {
                    if (status === "GRANTED") {
                        mService.api.permission.savePermissionStatus("notification", status, function () {
                            try {
                                mService.permissions.getOtherPermissions(selectedRecord);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("save_permission_status_error", "system_messages");
                                mService.permissions.getOtherPermissions(selectedRecord);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else if (status === "settings") {
                        mService.permissions.notificationSettingsInd = true;
                        mService.api.permission.openAppSettings(function () {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (error) {
                            try {
                                mService.permissions.notificationSettingsInd = false;
                                console.error("openAppSettings: " + error);
                                mService.app.showToast("open_app_settings_error", "system_messages");
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        mService.app.showToast("permission_denied", "pre_signup_messages");
                        mService.api.permission.savePermissionStatus("notification", "NO", function () {
                            try {
                                mService.permissions.getOtherPermissions(selectedRecord);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("save_permission_status_error", "system_messages");
                                mService.permissions.getOtherPermissions(selectedRecord);
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
                    mService.app.showToast("permission_denied", "pre_signup_messages");
                    mService.api.permission.savePermissionStatus("notification", "NO", function () {
                        try {
                            mService.permissions.getOtherPermissions(selectedRecord);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            mService.app.showToast("save_permission_status_error", "system_messages");
                            mService.permissions.getOtherPermissions(selectedRecord);
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
    handleLocation: function (selectedRecord) {
        try {
            if (mService.app.platform == 'Android') {
                mService.api.permission.requestAuthorization("ACCESS_COARSE_LOCATION", function (status) {
                    try {
                        if (status === "GRANTED" || status === "GRANTED_WHEN_IN_USE") {
                            mService.api.permission.savePermissionStatus("location", status, function () {
                                try {
                                    mService.permissions.getOtherPermissions(selectedRecord);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("save_permission_status_error", "system_messages");
                                    mService.permissions.getOtherPermissions(selectedRecord);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            mService.api.permission.savePermissionStatus("location", "NEVER", function () {
                                try {
                                    mService.permissions.getOtherPermissions(selectedRecord);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("save_permission_status_error", "system_messages");
                                    mService.permissions.getOtherPermissions(selectedRecord);
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
                        mService.api.permission.savePermissionStatus("location", "NEVER", function () {
                            try {
                                mService.permissions.getOtherPermissions(selectedRecord);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function () {
                            try {
                                mService.app.showToast("save_permission_status_error", "system_messages");
                                mService.permissions.getOtherPermissions(selectedRecord);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } else {
                mService.api.location.getAuthorizationStatus(function (status) {
                    try {
                        if (status === "DENIED_ALWAYS") {
                            mService.api.permission.savePermissionStatus("location", "NEVER", function () {
                                try {
                                    mService.permissions.getOtherPermissions(selectedRecord);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("save_permission_status_error", "system_messages");
                                    mService.permissions.getOtherPermissions(selectedRecord);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            mService.api.permission.requestAuthorization("iOS", function (status) {
                                try {
                                    mService.api.permission.savePermissionStatus("location", status, function () {
                                        try {
                                            mService.permissions.getOtherPermissions(selectedRecord);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            mService.permissions.getOtherPermissions(selectedRecord);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function () {
                                try {
                                    mService.app.showToast("permission_denied", "pre_signup_messages");
                                    mService.permissions.getOtherPermissions(selectedRecord);
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
                        mService.permissions.getOtherPermissions(selectedRecord);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getAppPermissions: function (success, failure) {
        mService.app.appPermission = "";
        mService.api.permission.compareLocalAndSettingsStatus(function (data) {
            try {
                mService.api.permission.checkStatus(function (data) {
                    try {
                        if (data !== "") {
                            if (data.location === "NEVER" && data.notification === "NO" && data.camera === "NO") {
                                mService.app.locationPermissionStatus = "NEVER";
                                success();
                            } else {
                                mService.permissions.getStoragePermission(function () {
                                    try {
                                        mService.permissions.getLocationPermission(function () {
                                            try {
                                                mService.permissions.getNotificationPermission(function () {
                                                    try {
                                                        mService.permissions.getCameraPermission(function () {
                                                            try {
                                                                if (mService.app.appPermission === "") {
                                                                    success();
                                                                } else {
                                                                    mService.permissions.init("my_permissions_consent");
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
                                        });
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            }
                        } else {
                            mService.permissions.getStoragePermission(function () {
                                try {
                                    mService.permissions.getLocationPermission(function () {
                                        try {
                                            mService.permissions.getNotificationPermission(function () {
                                                try {
                                                    mService.permissions.getCameraPermission(function () {
                                                        try {
                                                            if (mService.app.appPermission === "") {
                                                                success();
                                                            } else {
                                                                mService.permissions.init("my_permissions_consent");
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
                                    });
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
        });
    },
    getLocationPermission: function (success) {
        try {
            if (mService.app.platform == 'Android') {
                mService.api.permission.getAuthorizationStatus(function (status) {
                    try {
                        mService.api.permission.savePermissionStatus("location", status, function () {
                            try {
                                if (status === "GRANTED" || status === "GRANTED_WHEN_IN_USE") {
                                    success();
                                } else {
                                    if (mService.app.appPermission === undefined) {
                                        mService.app.appPermission = "";
                                    };
                                    mService.app.appPermission = mService.app.appPermission + "," + "LOCATION";
                                    success();
                                }
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
                        mService.api.permission.savePermissionStatus("location", "NEVER", function () {
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
            } else {
                mService.api.location.getAuthorizationStatus(function (status) {
                    try {
                        mService.api.permission.savePermissionStatus("location", status, function () {
                            try {
                                if (status === "GRANTED" || status === "GRANTED_WHEN_IN_USE") {
                                    success();
                                } else {
                                    if (status === "DENIED_ALWAYS") {
                                        mService.app.processPermissionSuccess();
                                    } else {
                                        if (mService.app.appPermission === undefined) {
                                            mService.app.appPermission = "";
                                        };
                                        mService.app.appPermission = mService.app.appPermission + "," + "LOCATION";
                                        success();
                                    }
                                }
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
                        mService.api.permission.savePermissionStatus("location", "NEVER", function () {
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
    getNotificationPermission: function (success) {
        try {
            mService.api.notification.getAuthorizationStatus(function (status) {
                try {
                    mService.api.permission.savePermissionStatus("notification", status, function () {
                        try {
                            if (status === "GRANTED" || status === "PROVISIONAL" || status === "EPHEMERAL") {
                                success();
                            } else {
                                if (mService.app.appPermission === undefined) {
                                    mService.app.appPermission = "";
                                };
                                mService.app.appPermission = mService.app.appPermission + "," + "NOTIFICATION";
                                success();
                            }
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
                    mService.api.permission.savePermissionStatus("notification", "NO", function () {
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
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getCameraPermission: function (success) {
        try {
            mService.api.camera.getAuthorizationStatus(function (status) {
                try {
                    mService.api.permission.savePermissionStatus("camera", status, function () {
                        try {
                            if (status === "GRANTED") {
                                success();
                            } else {
                                if (mService.app.appPermission === undefined) {
                                    mService.app.appPermission = "";
                                };
                                mService.app.appPermission = mService.app.appPermission + "," + "CAMERA";
                                success();
                            }
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
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getStoragePermission: function (success) {
        try {
            if (mService.app.platform === "Android") {
                mService.api.device.getOSVersion(function (osVersion) {
                    try {
                        if (osVersion !== "" && parseInt(osVersion) < 13) {
                            mService.api.storage.getAuthorizationStatus(function (status) {
                                try {
                                    if (status === "GRANTED") {
                                        success();
                                    } else {
                                        if (mService.app.appPermission === undefined) {
                                            mService.app.appPermission = "";
                                        };
                                        mService.app.appPermission = mService.app.appPermission + "," + "STORAGE";
                                        success();
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
    getOtherPermissions: function (selectedRecord) {
        var permissionName,
        dataSource,
        selectedIndex,
        totalRecords,
        nextItem;
        try {
            dataSource = mService.permissions.dataSource;
            selectedIndex = mService.permissions.dataSource.indexOf(selectedRecord);
            permissionName = selectedRecord.permission;
            totalRecords = dataSource.total();
            if ((selectedIndex + 1) < totalRecords) {
                nextItem = dataSource.at((selectedIndex + 1));
                var scrollview = $("#my_permissions_consent_scrollview").data("kendoMobileScrollView");
                scrollview.scrollTo((selectedIndex + 1));
                $("#my_permissions_consent_pager_" + (selectedIndex + 1)).addClass("ms_pager_active").removeClass("ms_pager_inactive").siblings().addClass("ms_pager_inactive").removeClass("ms_pager_active");
            } else {
                mService.spinner.show();
                mService.app.processAppBase();
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    load: function (scrID, success, failure) {
        try {
            if ($("#ms_" + scrID + "_template").length === 0) {
                mService.presentR.util.callAjax("lib/mservice/styles/layout/mobile." + scrID + ".template.html", "text", function (template) {
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
            var permissions;
            try {
                permissions = mService.app.appPermission.replace(/^,/, '');
                if (permissions === "") {
                    permissions = [];
                } else {
                    permissions = permissions.split(",");
                    permissions = permissions.map(function (permission) {
                        var obj;
                        try {
                            obj = {};
                            obj["permission"] = permission;
                            return obj;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                };
                dataSource = new kendo.data.DataSource({
                    data: permissions
                });
                dataSource.read().then(function () {
                    var listData,
                    index;
                    try {
                        mService.permissions.dataSource = dataSource;
                        listData = dataSource.data();
                        if (listData.length > 0) {
                            $("#my_permissions_consent_scrollview").after(mService.config.template.getTransformedHtml("ms_my_permissions_consent_pager_template", {
                                    scrID: "my_permissions_consent"
                                }));
                        };
                        for (index = 0; index < listData.length; index++) {
                            $("#my_permissions_consent_scrollview").append("<div id ='ms_my_permissions_consent_" + listData[index].permission + "' data-role='page' data-ms-uid='" + listData[index].uid + "'></div>");
                            $("#ms_my_permissions_consent_" + listData[index].permission).html(mService.config.template.getTransformedHtml("ms_my_permissions_consent_scrollview_template", listData[index]));
                            $("#my_permissions_consent_pager_list").append("<li id='my_permissions_consent_pager_" + index + "'></li>");
                        };
                        if (listData.length === 1) {
                            $("#my_permissions_consent_pager").hide();
                            $(".ms_permission_screen_container").css("height", "98vh");
                        } else {
                            $("#my_permissions_consent_pager").show();
                            $("#my_permissions_consent_pager_0").addClass("ms_pager_active").removeClass("ms_pager_inactive").siblings().addClass("ms_pager_inactive").removeClass("ms_pager_active");
                        };
                        $("#my_permissions_consent_scrollview").kendoMobileScrollView({
                            enable: false,
                            contentHeight: "100%",
                            enablePager: false,
                            itemsPerPage: 1,
                            bounceVelocityThreshold: 3,
                            duration: 800
                        });
                        scrollview = $("#my_permissions_consent_scrollview").data("kendoMobileScrollView");
                        scrollview.pane.userEvents.bind("start", mService.permissions.util.cancel);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
                mService.config.label.resolve();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        beforeHide: function (e) {
            try {
                if (mService.api !== undefined) {
                    mService.util.updatePermissionStatus();
                };
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        beforeShow: function (e) {
            try {
                if (Object.keys(mService.visitor.profile.login).length === 0) {
                    mService.api.permission.savePermissionStatus("camera", "", function () {
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
                };
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
    button: {
        cancel: function (uid) {
            var selectedRecord,
            selectedIndex,
            totalRecords,
            scrollview;
            try {
                selectedRecord = mService.permissions.dataSource.getByUid(uid);
                selectedIndex = mService.permissions.dataSource.indexOf(selectedRecord);
                totalRecords = mService.permissions.dataSource.total();
                if ((selectedIndex + 1) < totalRecords) {
                    scrollview = $("#my_permissions_consent_scrollview").data("kendoMobileScrollView");
                    scrollview.scrollTo((selectedIndex + 1));
                    $("#my_permissions_consent_pager_" + (selectedIndex + 1)).addClass("ms_pager_active").removeClass("ms_pager_inactive").siblings().addClass("ms_pager_inactive").removeClass("ms_pager_active");
                } else {
                    mService.spinner.show();
                    mService.app.processAppBase();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        submit: function (uid) {
            var selectedRecord,
            permissionName;
            try {
                selectedRecord = mService.permissions.dataSource.getByUid(uid);
                permissionName = selectedRecord.permission;
                if (permissionName === "LOCATION") {
                    mService.permissions.handleLocation(selectedRecord);
                } else if (permissionName === "NOTIFICATION") {
                    mService.permissions.handleNotification(selectedRecord);
                } else if (permissionName === "CAMERA") {
                    mService.permissions.handleCamera(selectedRecord);
                } else if (permissionName === "STORAGE") {
                    mService.permissions.handleStorage(selectedRecord);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    util: {
        cancel: function () {
            try {
                this.cancel();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    }
};
