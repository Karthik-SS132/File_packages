mService.fcm = {
    event: {
        mobile: {
            notificationOpened: function (nData) {
                var scrID,
                chatMessage,
                chatVariable;
                try {
                    mService.app.notificationDataForOtherClient = "";
                    nData = (nData.notification !== undefined) ? ((nData.notification.payload === undefined) ? (mService.fcm.getProcessedNotificationObject(nData.notification)) : (mService.fcm.getProcessedNotificationObject(nData.notification.payload))) : (nData);
                    if (nData.additionalData.msgHeader.clientID === mService.app.getClientId() && nData.additionalData.msgHeader.countryCode === mService.app.getCountryCode()) {
                        scrID = mService.app.getScreenId();
                        if (mService.app.getProfileId() !== "V") {
                            if (nData.additionalData.msgBody.info !== undefined && nData.additionalData.msgBody.info.type === "chat") {
                                if (nData.additionalData.msgBody.scrID === scrID && scrID !== "/") {
                                    chatVariable = mService.widgets.variable.msChat.variable[((nData.additionalData.msgBody.scrID.indexOf("_content") === -1) ? (nData.additionalData.msgBody.scrID + "_content") : (nData.data.msgBody.scrID))];
                                    mService.pattern.query.fcm.handle((nData.additionalData.msgBody.scrID).replace("_chat", ""), nData, "chat", true);
                                } else {
                                    if (scrID === "/") {
                                        mService.app.notificationOpenedInd = true;
                                        mService.app.chatNotificationData = nData;
                                    } else {
                                        if (mService.pattern.query !== undefined) {
                                            mService.pattern.query.util.loadScreen(nData.additionalData.msgBody.scrID, nData.additionalData.msgBody);
                                        } else {
                                            mService.containR.util.openChatScreen(nData.additionalData.msgBody);
                                        }
                                    }
                                }
                            } else {
                                if (scrID !== "/") {
                                    mService.fcm.updateReadIndication(nData, function () {
                                        try {
                                            if (scrID === nData.additionalData.msgBody.scrID) {
                                                if (!mService.util.isContainRScreen(nData.additionalData.msgBody.scrID)) {
                                                    eval(scrID).fcm.handle(nData);
                                                };
                                                window.plugins.OneSignal.clearOneSignalNotifications();
                                            } else {
                                                if (mService.util.isContainRScreen(nData.additionalData.msgBody.scrID)) {
                                                    mService.config.controller.get(nData.additionalData.msgBody.scrID, function () {
                                                        var controllerObj;
                                                        try {
                                                            controllerObj = mService.config.controller.getControllerObj(nData.additionalData.msgBody.scrID);
                                                            if (controllerObj.pattern_name !== undefined && controllerObj.pattern_name === "workflow") {
                                                                mService.app.notificationData = {
                                                                    "notification": nData,
                                                                    "openDetailsScreen": true
                                                                };
                                                                mService.page.change(nData.additionalData.msgBody.scrID, {
                                                                    notificationPayload: nData
                                                                });
                                                            } else {
                                                                mService.page.change(nData.additionalData.msgBody.scrID, {
                                                                    notificationPayload: nData
                                                                });
                                                            }
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.app.showToast("load_controller_file_error", nData.additionalData.msgBody.scrID);
                                                            return true;
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } else {
                                                    mService.page.change(nData.additionalData.msgBody.scrID, {
                                                        notificationPayload: nData
                                                    });
                                                };
                                                window.plugins.OneSignal.clearOneSignalNotifications();
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function () {
                                        try {
                                            if (scrID === nData.additionalData.msgBody.scrID) {
                                                if (!mService.util.isContainRScreen(nData.additionalData.msgBody.scrID)) {
                                                    eval(scrID).fcm.handle(nData);
                                                };
                                                window.plugins.OneSignal.clearOneSignalNotifications();
                                            } else {
                                                if (mService.util.isContainRScreen(nData.additionalData.msgBody.scrID)) {
                                                    mService.config.controller.get(nData.additionalData.msgBody.scrID, function () {
                                                        var controllerObj;
                                                        try {
                                                            controllerObj = mService.config.controller.getControllerObj(nData.additionalData.msgBody.scrID);
                                                            if (controllerObj.pattern_name !== undefined && controllerObj.pattern_name === "workflow") {
                                                                mService.app.notificationData = {
                                                                    "notification": nData,
                                                                    "openDetailsScreen": true
                                                                };
                                                                mService.page.change(nData.additionalData.msgBody.scrID, {
                                                                    notificationPayload: nData
                                                                });
                                                            } else {
                                                                mService.page.change(nData.additionalData.msgBody.scrID, {
                                                                    notificationPayload: nData
                                                                });
                                                            }
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    }, function () {
                                                        try {
                                                            mService.app.showToast("load_controller_file_error", nData.additionalData.msgBody.scrID);
                                                            return true;
                                                        } catch (exception) {
                                                            mService.exception.handle(exception);
                                                        }
                                                    });
                                                } else {
                                                    mService.page.change(nData.additionalData.msgBody.scrID, {
                                                        notificationPayload: nData
                                                    });
                                                };
                                                window.plugins.OneSignal.clearOneSignalNotifications();
                                            }
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.app.notificationOpenedInd = true;
                                    mService.app.chatNotificationData = nData;
                                }
                            }
                        } else {
                            mService.app.showToast("notification_read_logout_error", "system_messages");
                        }
                    } else {
                        mService.app.notificationDataForOtherClient = nData;
                        mService.settings.my_accounts.button.switchAccount("", {
                            client_id: nData.additionalData.msgHeader.clientID,
                            country_code: nData.additionalData.msgHeader.countryCode
                        });
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            notificationReceived: function (nData) {
                var scrID,
                chatVariable;
                try {
                    nData = (nData.payload === undefined) ? (mService.fcm.getProcessedNotificationObject(nData)) : (mService.fcm.getProcessedNotificationObject(nData.payload));
                    if (nData.additionalData.msgHeader.clientID === mService.app.getClientId() && nData.additionalData.msgHeader.countryCode === mService.app.getCountryCode()) {
                        scrID = mService.app.getScreenId();
                        if (nData.additionalData.msgBody.info !== undefined && nData.additionalData.msgBody.info.type === "chat") {
                            if (nData.additionalData.msgBody.scrID === scrID) {
                                chatVariable = mService.widgets.variable.msChat.variable[((nData.additionalData.msgBody.scrID.indexOf("_content") === -1) ? (nData.additionalData.msgBody.scrID + "_content") : (nData.data.msgBody.scrID))];
                                if (chatVariable === undefined) {}
                                else {
                                    if (nData.additionalData.msgBody.key === chatVariable.key && nData.additionalData.msgBody.subKey === chatVariable.subKey) {
                                        if (Object.keys(mService.widgets.variable.msChat.dSource).length > 0) {
                                            if (mService.widgets.variable.msChat.dSource[nData.additionalData.msgBody.scrID + "_content"] !== undefined) {
                                                mService.widgets.variable.msChat.dSource[nData.additionalData.msgBody.scrID + "_content"].add(nData.additionalData.msgBody);
                                            }
                                        };
                                        mService.widgets.init.util.msChat.handle(((nData.additionalData.msgBody.scrID.indexOf("_content") === -1) ? (nData.additionalData.msgBody.scrID + "_content") : (nData.additionalData.msgBody.scrID)), nData.additionalData.msgBody);
                                    } else {
                                        if (nData.additionalData.msgBody.custom.transaction_ref_no !== undefined) {
                                            mService.pattern.query.fcm.handle((nData.additionalData.msgBody.scrID).replace("_chat", ""), nData, "chat", false);
                                        }
                                    }
                                }
                            } else if (nData.additionalData.msgBody.scrID.replace("_chat", "") === scrID.replace("_list", "")) {
                                if (nData.additionalData.msgBody.custom.transaction_ref_no !== undefined) {
                                    if (mService.pattern.query !== undefined) {
                                        mService.pattern.query.fcm.handle((nData.additionalData.msgBody.scrID).replace("_chat", ""), nData, "list", false);
                                    }
                                }
                            } else {
                                if (nData.additionalData.msgBody.custom.transaction_ref_no !== undefined) {
                                    if (mService.pattern.query !== undefined) {
                                        mService.pattern.query.fcm.handle((nData.additionalData.msgBody.scrID).replace("_chat", ""), nData, "", false);
                                    }
                                }
                            }
                        } else {
                            mService.fcm.updateNotificationCount(function () {
                                try {
                                    if (scrID === nData.additionalData.msgBody.scrID) {
                                        eval(scrID).fcm.handle(nData);
                                        window.plugins.OneSignal.clearOneSignalNotifications();
                                    } else if (scrID === "my_notification") {
                                        my_notification.fcm.handle(nData);
                                        window.plugins.OneSignal.clearOneSignalNotifications();
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        web: {
            notificationOpened: function (nData) {
                var chatVariable,
                feature,
                scrID;
                try {
                    if (mService.app.getProfileId() !== "V") {
                        if (nData.data.msgBody.info !== undefined) {
                            if (nData.data.msgBody.info.type === "chat") {
                                feature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                    try {
                                        return e.p_child_screen_id === nData.data.msgBody.scrID.replace("_chat", "");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                                if (mService.page.navigation.get.functionalMenuID() === feature[0].p_child_feature_id_or_group) {
                                    chatVariable = mService.widgets.variable.msChat.variable[((nData.data.msgBody.scrID.indexOf("_content") === -1) ? (nData.data.msgBody.scrID + "_content") : (nData.data.msgBody.scrID))];
                                    if (chatVariable === undefined) {
                                        mService.pattern.query.button.chat("", nData);
                                    } else {
                                        if (nData.data.msgBody.key === chatVariable.key && nData.data.msgBody.subKey === chatVariable.subKey) {
                                            mService.widgets.init.util.msChat.handle(((nData.data.msgBody.scrID.indexOf("_content") === -1) ? (nData.data.msgBody.scrID + "_content") : (nData.data.msgBody.scrID)), nData.data.msgBody);
                                            mService.pattern.query.util.updateCallStatus(((nData.data.msgBody.scrID.indexOf("_content") === -1) ? (nData.data.msgBody.scrID + "_content") : (nData.data.msgBody.scrID)), mService.app.getScreenId());
                                        } else {
                                            mService.pattern.query.button.chat("", nData);
                                        }
                                    }
                                } else {
                                    if (feature.length !== 0) {
                                        mService.layout.functionalMenu.select(feature[0].p_child_feature_id_or_group);
                                        setTimeout(function () {
                                            try {
                                                scrID = nData.data.msgBody.scrID.replace("_chat", "");
                                                mService.util.loadScript("www/lib/mservice/pattern/query/query.lib.js", function () {
                                                    try {
                                                        mService.pattern.query.button.chat("", nData);
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {});
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, 100);
                                    }
                                }
                            }
                        }
                    } else {
                        mService.app.alert("error", {
                            scrid: "",
                            lblid: "notification_read_logout_error",
                            lblgrpid: "error"
                        });
                    };
                    OneSignal.push(["addListenerForNotificationOpened", mService.fcm.event.web.notificationOpened]);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            notificationReceived: function (nData) {
                var chatVariable,
                feature;
                try {
                    if (nData.data.msgBody.info !== undefined) {
                        if (nData.data.msgBody.info.type === "chat") {
                            feature = $.grep(mService.app.getFuncAccess(), function (e, i) {
                                try {
                                    return e.p_child_screen_id === nData.data.msgBody.scrID.replace("_chat", "");
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                            if (mService.page.navigation.get.functionalMenuID() === feature[0].p_child_feature_id_or_group) {
                                chatVariable = mService.widgets.variable.msChat.variable[((nData.data.msgBody.scrID.indexOf("_content") === -1) ? (nData.data.msgBody.scrID + "_content") : (nData.data.msgBody.scrID))];
                                if (chatVariable === undefined) {
                                    mService.pattern.query.util.refreshList((nData.data.msgBody.scrID).replace("_chat", ""), nData);
                                } else {
                                    if (nData.data.msgBody.key === chatVariable.key && nData.data.msgBody.subKey === chatVariable.subKey) {
                                        mService.widgets.init.util.msChat.handle(((nData.data.msgBody.scrID.indexOf("_content") === -1) ? (nData.data.msgBody.scrID + "_content") : (nData.data.msgBody.scrID)), nData.data.msgBody);
                                        mService.pattern.query.util.updateCallStatus(((nData.data.msgBody.scrID.indexOf("_content") === -1) ? (nData.data.msgBody.scrID + "_content") : (nData.data.msgBody.scrID)), mService.app.getScreenId());
                                    } else {
                                        mService.pattern.query.util.refreshList((nData.data.msgBody.scrID).replace("_chat", ""), nData);
                                    }
                                }
                            }
                        }
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    getProcessedNotificationObject: function (nData) {
        try {
            delete nData["rawPayload"];
            nData.additionalData.msgBody["dateTime"] = Date.parse(mService.util.date.getNewDate());
            return nData;
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getToken: function (success, failure) {
        try {
            mService.fcm.util.getToken(function (data) {
                try {
                    data['locale'] = mService.app.getLocaleId();
                    data["title"] = mService.app.getTitle();
                    data["first_name"] = mService.app.getFirstName();
                    data["last_name"] = mService.app.getLastName();
                    data["initial"] = (mService.app.getFirstName().trim().charAt(0).toUpperCase()) + (mService.app.getLastName().trim().charAt(0).toUpperCase());
                    mService.fcm.updateToken(JSON.stringify(data), function () {
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
            }, function (error) {
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
    init: function (success, failure) {
        try {
            if (mService.app.channel === "web") {
                mService.fcm.initWebFcm();
            } else {
                mService.fcm.initMobileFcm(function () {
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
    },
    initMobileFcm: function (success, failure) {
        try {
            window.plugins.OneSignal.setAppId(mService.app.fcmAppID);
            window.plugins.OneSignal.setNotificationOpenedHandler(mService.fcm.event.mobile.notificationOpened);
            window.plugins.OneSignal.setNotificationWillShowInForegroundHandler(function (notificationReceivedEvent) {
                notificationReceivedEvent.complete(notificationReceivedEvent.getNotification());
                mService.fcm.event.mobile.notificationReceived(notificationReceivedEvent.getNotification());
            });
            mService.api.notification.getAuthorizationStatus(function (status) {
                try {
                    if (status === "PROVISIONAL" || status === "GRANTED" || status === "EPHEMERAL") {
                        window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
                            try {
                                if (accepted === true) {
                                    mService.api.permission.savePermissionStatus("notification", "YES", function () {
                                        try {
                                            mService.fcm.getToken(function () {
                                                try {
                                                    window.plugins.OneSignal.disablePush(false);
                                                    success();
                                                } catch (exception) {
                                                    mService.exception.handle(exception);
                                                }
                                            }, function (error) {
                                                try {
                                                    mService.api.permission.savePermissionStatus("notification", "FAIL", function () {
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
                                    }, function () {
                                        try {
                                            mService.app.showToast("save_permission_status_error", "system_messages");
                                            success();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
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
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
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
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    initWebFcm: function () {
        var OneSignal;
        try {
            OneSignal = window.OneSignal || [];
            OneSignal.push(function () {
                try {
                    OneSignal.init({
                        appId: mService.app.fcmAppID,
                        autoResubscribe: true
                    });
                    OneSignal.isPushNotificationsEnabled(function (isEnabled) {
                        try {
                            if (isEnabled === true) {
                                OneSignal.getUserId(function (userId) {
                                    try {
                                        mService.fcm.updateToken(JSON.stringify({
                                                "userId": userId,
                                                "pushToken": "",
                                                "locale": mService.app.getLocaleId(),
                                                "title": mService.app.getTitle(),
                                                "first_name": mService.app.getFirstName(),
                                                "last_name": mService.app.getLastName(),
                                                "initial": (mService.app.getFirstName().trim().charAt(0).toUpperCase()) + (mService.app.getLastName().trim().charAt(0).toUpperCase())
                                            }), function () {
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
                                });
                            } else {
                                mService.api.permission.sendPermissionStatus({
                                    notification: "NO"
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
            OneSignal.push(function () {
                try {
                    OneSignal.on('subscriptionChange', function (isSubscribed) {
                        try {
                            if (isSubscribed === true) {
                                OneSignal.push(function () {
                                    try {
                                        OneSignal.getUserId(function (userId) {
                                            try {
                                                mService.fcm.updateToken(JSON.stringify({
                                                        "userId": userId,
                                                        "pushToken": "",
                                                        "locale": mService.app.getLocaleId(),
                                                        "title": mService.app.getTitle(),
                                                        "first_name": mService.app.getFirstName(),
                                                        "last_name": mService.app.getLastName(),
                                                        "initial": (mService.app.getFirstName().trim().charAt(0).toUpperCase()) + (mService.app.getLastName().trim().charAt(0).toUpperCase())
                                                    }), function () {
                                                    try {
                                                        mService.api.permission.sendPermissionStatus({
                                                            notification: "YES"
                                                        });
                                                    } catch (exception) {
                                                        mService.exception.handle(exception);
                                                    }
                                                }, function () {
                                                    try {
                                                        mService.api.permission.sendPermissionStatus({
                                                            notification: "NO"
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
                            } else {
                                mService.api.permission.sendPermissionStatus({
                                    notification: "NO"
                                });
                                OneSignal.getNotificationPermission().then(function (permission) {
                                    if (permission === 'default') {
                                        OneSignal.showNativePrompt();
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
            OneSignal.push(["addListenerForNotificationOpened", mService.fcm.event.web.notificationOpened]);
            OneSignal.push(function () {
                try {
                    OneSignal.on('notificationDisplay', mService.fcm.event.web.notificationReceived);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    updateNotificationCount: function (success) {
        var scrID;
        try {
            scrID = mService.app.getScreenId();
            mService.nfs.getFileList(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + "unread", function (data) {
                try {
                    $("#" + scrID + " #home_in_app_feature_my_notification_badge").text(data.length);
                    if (data.length === 0) {
                        $("#" + scrID + " #home_in_app_feature_my_notification_badge").hide();
                    } else {
                        $("#" + scrID + " #home_in_app_feature_my_notification_badge").show();
                    };
                    success();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function () {
                try {
                    $("#" + scrID + " #home_in_app_feature_my_notification_badge").text("0");
                    $("#" + scrID + " #home_in_app_feature_my_notification_badge").hide();
                    success();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    updateReadIndication: function (nData, success, failure) {
        try {
            mService.nfs.readFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + "unread" + "/" + nData.notificationId + ".json", function (data) {
                try {
                    mService.nfs.createFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + "read" + "/" + nData.notificationId + ".json", data, function () {
                        try {
                            mService.nfs.deleteFile(mService.app.getClientId() + "/" + mService.app.getCountryCode() + "/" + "notifications" + "/" + "unread" + "/" + nData.notificationId + ".json", function () {
                                try {
                                    mService.fcm.updateNotificationCount(function () {
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
    updateToken: function (token, success, failure) {
        try {
            if (window.navigator.onLine) {
                $.ajax({
                    url: mService.app.clientURL + "/common/components/msvMsg/saveToken.aspx?client_id=" + mService.app.getClientId() + "&country_code=" + mService.app.getCountryCode() + "",
                    async: false,
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        "mobileno": mService.app.getUserId(),
                        "token": token,
                        "appid": mService.app.id,
                        "channel": mService.app.channel
                    }),
                    success: function (response, status) {
                        try {
                            if (mService.app.channel === "web") {
                                success();
                            } else {
                                mService.nfs.readFile("my_accounts" + "/" + mService.app.getClientId() + "_" + mService.app.getCountryCode() + ".json", function (accountData) {
                                    try {
                                        accountData = JSON.parse(accountData);
                                        accountData["fcm_data"] = token;
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
                                        success();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    };
                                });
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
            } else {
                success();
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    util: {
        getToken: function (success, failure) {
            var tokenTimer,
            retryCounter;
            try {
                retryCounter = 0;
                tokenTimer = setInterval(function () {
                    try {
                        if (retryCounter <= 30) {
                            window.minterface("GetFCMUtils", [], function (data) {
                                try {
                                    if (Object.keys(data).length > 0) {
                                        if (data.hasOwnProperty("userId") && data.userId !== "") {
                                            clearInterval(tokenTimer);
                                            retryCounter = 0;
                                            success(data);
                                        } else {
                                            retryCounter++;
                                        }
                                    } else {
                                        retryCounter++;
                                    }
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, function (errorMsg) {
                                try {
                                    clearInterval(tokenTimer);
                                    if (mService.app.getScreenId() !== "my_permissions_consent") {
                                        mService.app.showToast("GetFCMUtils_error", "pre_signup_messages");
                                        mService.exception.handle(errorMsg);
                                    };
                                    failure();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            });
                        } else {
                            clearInterval(tokenTimer);
                            failure();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, 1000);
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    }
};