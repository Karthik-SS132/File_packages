mService.eventHandler = {
    documentReady: function () {
        var myCookies,
        currentCookie,
        loginCredential,
        index;
        try {
            mService.app.launch(function () {
                try {
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
                    mService.setAppBase(function () {
                        try {
                            mService.visitor.getProfile(function () {
                                try {
                                    mService.home.loginPopup.activate();
                                    mService.home.changeLanguagePopup.activate();
                                    mService.home.changePasswordPopup.activate();
                                    mService.home.forgotPasswordPopup.activate();
                                    mService.layout.profileMenu.activate();
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
                    console.log("Failed to load the libraries");
                    mService.spinner.show();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    listSearchBox: {
        keypress: function (element, event) {
            var keycode,
            scrObj,
            mBtn;
            try {
                keycode = (event.keyCode ? event.keyCode : event.which);
                scrObj = eval(mService.page.navigation.get.subMenuID());
                mBtn = $(element).next();
                if (keycode === 13) {
                    mService.page.navigation.isAllowed(function () {
                        try {
                            mService.spinner.show();
                            setTimeout(function () {
                                try {
                                    scrObj.button[mBtn.attr("data-ms-button-group")][mBtn.attr("data-ms-button-role") + "_click"](mBtn, event);
                                    mService.spinner.hide();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            }, 20);
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
        }
    },
    mButton: function (e) {
        var mBtn,
        scrObj;
        try {
            mBtn = $(this);
            scrObj = eval(mService.page.navigation.get.subMenuID());
            mService.spinner.show();
            setTimeout(function () {
                try {
                    if (mBtn.attr("data-ms-button-group") === "wflow") {
                        scrObj.button[mBtn.attr("data-ms-button-group") + "_click"](mBtn, e);
                    } else if ((mBtn.attr("data-ms-button-group") === "form" && mBtn.attr("data-ms-button-role") === "cancel") || (mBtn.attr("data-ms-button-group") === "crud" && mBtn.attr("data-ms-button-role") === "retrieve")) {
                        mService.page.navigation.isAllowed(function () {
                            try {
                                scrObj.button[mBtn.attr("data-ms-button-group")][mBtn.attr("data-ms-button-role") + "_click"](mBtn, e);
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
                        scrObj.button[mBtn.attr("data-ms-button-group")][mBtn.attr("data-ms-button-role") + "_click"](mBtn, e);
                    };
                    if (mBtn.data("kendoTooltip") !== undefined) {
                        mBtn.data("kendoTooltip").hide();
                    };
                    mService.spinner.hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, 20);
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    mLink: function (evt) {
        var mLink;
        try {
            mLink = $(this);
            if (mLink.attr("data-ms-link-role") !== "showPassword") {
                mService.spinner.show();
            };
            setTimeout(function () {
                try {
                    if (mLink.attr("data-ms-link-group") === "functionalMenu") {
                        mService.layout.functionalMenu.select(mLink.attr("data-ms-link-role"));
                    } else if (mLink.attr("data-ms-link-group") === "loginPopup") {
                        mService.home.loginPopup[mLink.attr("data-ms-link-role") + "_click"]();
                    } else if (mLink.attr("data-ms-link-group") === "forgotPassword") {
                        if (mLink.attr("data-ms-link-role") === "forgot_password_popup_submit") {
                            mService.home.forgotPasswordPopup.submitClick();
                        } else {
                            mService.home.forgotPasswordPopup.open();
                        }
                    } else if (mLink.attr("data-ms-link-group") === "customer_contact_info") {
                        if (mLink.attr("data-ms-link-role") === "call_hangup") {
                            mService.home.customerContactInfo.callHangup();
                        }
                    } else if (mLink.attr("data-ms-link-group") === "languagePopup") {
                        mService.home.changeLanguagePopup.click(mLink.attr("data-ms-link-role"));
                    } else if (mLink.attr("data-ms-link-group") === "changePassword") {
                        mService.home.changePasswordPopup.submitClick();
                    } else if (mLink.attr("data-ms-link-group") === "profileMenu") {
                        if (mLink.attr("data-ms-link-role") === "logout") {
                            mService.page.navigation.isAllowed(function () {
                                try {
                                    mService.home.logoutClick();
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
                        } else if (mLink.attr("data-ms-link-role") === "login") {
                            $("#home_login_popup").data("kendoWindow").open().center();
                            mService.config.label.resolve();
                        } else if (mLink.attr("data-ms-link-role") === "language") {
                            $("#home_language_popup").data("kendoWindow").open().center();
                            mService.config.label.resolve();
                        } else if (mLink.attr("data-ms-link-role") === "changePassword") {
                            $("#home_change_password_popup").data("kendoWindow").open().center();
                            mService.config.label.resolve();
                        }
                    } else if (mLink.attr("data-ms-link-group") === "userAttachment") {
                        mService.home.userAttachment[mLink.attr("data-ms-link-role")](mLink);
                    } else if (mLink.attr("data-ms-link-group") === "home_layout") {
                        if (mLink.attr("data-ms-link-role") === "verifySecurityCode_popup_resend") {
                            mService.security.code.verificationPopup.resend();
                        } else if (mLink.attr("data-ms-link-role") === "verifySecurityCode_popup_verify") {
                            mService.security.code.verificationPopup.verify();
                        } else if (mLink.attr("data-ms-link-role") === "switch_to_old_platform") {
                            mService.home.switchToOldPlatform();
                        }
                    };
                    mService.spinner.hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, 20);
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
        };
    }
};
$(document).delegate("[data-ms-widget-type = 'mLink']", "click", mService.eventHandler.mLink).delegate("[data-ms-widget-type = 'mButton']", "click", mService.eventHandler.mButton).delegate("[data-ms-widget-type = 'msWidget']", "click", mService.eventHandler.msWidget).delegate("#ms_login_password", "keypress", function (event) {
    var keycode;
    try {
        keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            mService.home.loginPopup.submit_click();
        }
    } catch (exception) {
        mService.exception.handle(exception);
    }
});