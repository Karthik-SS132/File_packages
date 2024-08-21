mService.security = {
    code: {
        getPurposeCode: function (eventName, success, failure) {
            try {
                if (window.navigator.onLine) {
                    mService.security.code.verificationPopup.variable.purposeCodeDSrc = mService.dSource.getSource({
                        code: "'security_purpose_code'",
                        inputXml: "'" + JSON.stringify({
                            event: eventName,
                            channel_id: mService.app.channel,
                            app_id: mService.app.id
                        }) + "'"
                    });
                    mService.security.code.verificationPopup.variable.purposeCodeDSrc.read().then(function () {
                        try {
                            success(mService.security.code.verificationPopup.variable.purposeCodeDSrc);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    if (mService.app.channel === "web") {
                        mService.app.alert("error", {
                            scrid: "",
                            lblid: "internet_connection_error",
                            lblgrpid: "error"
                        });
                    } else {
                        mService.app.showToast("internet_connection_error", "pre_signup_messages");
                    };
                    failure();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        request: function (purposeCode, success, failure) {
            try {
                if (window.navigator.onLine) {
                    mService.dSource.saveCustomInfo({
                        scrID: "pre_signup_messages",
                        inAppCode: "security_code",
                        successToast: true,
                        failureToast: true,
                    }, {
                        code: "'generate_security_code'",
                        headerXml: "'" + JSON.stringify({
                            "purpose_code": purposeCode,
                            "channel_id": mService.app.channel,
                            "app_id": mService.app.id
                        }) + "'"
                    }, function (response) {
                        try {
                            mService.security.code.send(purposeCode, function () {
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
                    if (mService.app.channel === "web") {
                        mService.app.alert("error", {
                            scrid: "",
                            lblid: "internet_connection_error",
                            lblgrpid: "error"
                        });
                    } else {
                        mService.app.showToast("internet_connection_error", "pre_signup_messages");
                    };
                    failure();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        send: function (purposeCode, success, failure) {
            try {
                if (window.navigator.onLine) {
                    mService.dSource.saveCustomInfo({
                        scrID: "pre_signup_messages",
                        inAppCode: "security_code",
                        successToast: true,
                        failureToast: true,
                    }, {
                        code: "'send_security_code'",
                        headerXml: "'" + JSON.stringify({
                            "purpose_code": purposeCode,
                            "channel_id": mService.app.channel,
                            "app_id": mService.app.id
                        }) + "'"
                    }, function (response) {
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
                    if (mService.app.channel === "web") {
                        mService.app.alert("error", {
                            scrid: "",
                            lblid: "internet_connection_error",
                            lblgrpid: "error"
                        });
                    } else {
                        mService.app.showToast("internet_connection_error", "pre_signup_messages");
                    };
                    failure();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        verify: function (purposeCode, securityCode, success, failure) {
            try {
                if (window.navigator.onLine) {
                    mService.dSource.saveCustomInfo({
                        scrID: "pre_signup_messages",
                        inAppCode: "security_code",
                        successToast: true,
                        failureToast: true,
                    }, {
                        code: "'validate_security_code'",
                        headerXml: "'" + JSON.stringify({
                            "purpose_code": purposeCode,
                            "security_code": securityCode,
                            "channel_id": mService.app.channel,
                            "app_id": mService.app.id
                        }) + "'"
                    }, function (response) {
                        try {
                            if (response.outputparam !== undefined && response.outputparam.p_outputparam_detail_xml !== undefined && response.outputparam.p_outputparam_detail_xml !== "") {
                                response = JSON.parse(response.outputparam.p_outputparam_detail_xml);
                                if (response.code !== undefined && response.code === "error_security_code_expired") {
                                    if (mService.app.channel === "web") {
                                        mService.app.alert("error", {
                                            scrid: "",
                                            lblid: "security_error_security_code_expired",
                                            lblgrpid: "error"
                                        });
                                    } else {
                                        mService.app.showToast("security_error_security_code_expired", "system_messages");
                                    };
                                    if (mService.app.channel === "web") {
                                        mService.security.code.verificationPopup.resetInputs();
                                        mService.security.code.verificationPopup.disableInputs();
                                    } else {
                                        mService.security.security_code_verification.util.resetInputs(purposeCode);
                                        mService.security.security_code_verification.util.disableInputs(purposeCode);
                                    }
                                    failure(response);
                                } else {
                                    if (mService.app.channel === "web") {
                                        mService.app.alert("success", {
                                            scrid: "",
                                            lblid: "security_verification_success",
                                            lblgrpid: "success"
                                        });
                                    } else {
                                        mService.app.showToast("security_verification_success", "system_messages");
                                    };
                                    success();
                                }
                            } else {
                                if (mService.app.channel === "web") {
                                    mService.app.alert("success", {
                                        scrid: "",
                                        lblid: "security_verification_success",
                                        lblgrpid: "success"
                                    });
                                } else {
                                    mService.app.showToast("security_verification_success", "system_messages");
                                };
                                success();
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorCode) {
                        try {
                            failure(errorCode);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    if (mService.app.channel === "web") {
                        mService.app.alert("error", {
                            scrid: "",
                            lblid: "internet_connection_error",
                            lblgrpid: "error"
                        });
                    } else {
                        mService.app.showToast("internet_connection_error", "pre_signup_messages");
                    };
                    failure();
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        processVerification: function (eventName) {
            try {
                mService.security.code.verificationPopup.variable.verificationDoneInd = true;
                mService.security.code.verificationPopup.close();
                if (eventName === "VISITOR_PAGE_LOGIN" || eventName === "FUNCTIONAL_DRAWER_LOGIN") {
                    mService.presentR.load.icons.fromCvs(function () {
                        try {
                            if (mService.app.getScreenId() === "visitor_profile") {
                                mService.home.loginPopup.processLogin(true);
                            } else {
                                mService.home.loginPopup.processLogin(false);
                            };
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function () {
                        try {
                            if (mService.app.getScreenId() === "visitor_profile") {
                                mService.home.loginPopup.processLogin(true);
                            } else {
                                mService.home.loginPopup.processLogin(false);
                            };
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    mService.visitor.processVisitorSubmit(false);
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        verificationPopup: {
            changeTitle: function (titleCode) {
                try {
                    $("#home_security_code_verification_popup").data("kendoWindow").setOptions({
                        title: {
                            text: "<span id='ms_security_code_verification_title' data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='verify_security_code_popup' data-ms-lbl-id='" + titleCode + "'>  </span>",
                            encoded: false
                        }
                    });
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            formatMobileNo: function (mobileNo) {
                try {
                    $("#home_security_code_verification_popup").data("kendoWindow").setOptions({
                        title: {
                            text: "<span id='ms_security_code_verification_title' data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='verify_security_code_popup' data-ms-lbl-id='" + titleCode + "'>  </span>",
                            encoded: false
                        }
                    });
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            init: function (success) {
                var popupWidth;
                try {
                    if ($("#home_security_code_verification_popup").data("kendoWindow") === undefined) {
                        if (mService.app.channel === "mobile") {
                            popupWidth = (screen.width * 0.90)
                        } else {
                            popupWidth = (screen.width * 0.60)
                        };
                        $("#home_security_code_verification_popup").kendoWindow({
                            width: popupWidth,
                            actions: [],
                            title: {
                                text: "<span id='ms_security_code_verification_title' data-ms-lbl='field' data-ms-lbl-src='home_layout' data-ms-lbl-grpid='verify_security_code_popup' data-ms-lbl-id='sms_title'> Verify SMS Code </span>",
                                encoded: false
                            },
                            open: function () {
                                try {
                                    mService.spinner.show();
                                    mService.security.code.verificationPopup.variable.verificationDoneInd = false;
                                    $("#ms_security_code_result_container").hide();
                                    $("#ms_security_code_icon_container").show();
                                    $("#ms_security_code_verify_btn").show();
                                    $("#ms_security_code_first").focus();
                                    mService.security.code.verificationPopup.timer();
                                    setTimeout(function () {
                                        try {
                                            mService.spinner.hide();
                                            mService.config.label.resolve();
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, 100);
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            },
                            close: function () {
                                try {
                                    mService.security.code.verificationPopup.resetInputs();
                                    if (!mService.security.code.verificationPopup.variable.verificationDoneInd && (mService.app.getScreenId() === "visitor_profile")) {
                                        mService.security.code.verificationPopup.variable.verificationDoneInd = false;
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
                                    } else {
                                        if (!mService.security.code.verificationPopup.variable.verificationDoneInd) {
                                            mService.security.code.verificationPopup.variable.verificationDoneInd = false;
                                            mService.user.resetProfile();
                                            mService.util.updateAppTimeZone(function () {
                                                try {
                                                    if (mService.app.forceLogin === "true") {
                                                        mService.page.change("login");
                                                    } else {
                                                        if (mService.app.getFuncAccess().length === 0) {
                                                            if (mService.app.channel !== "web") {
                                                                mService.home.loginPopup.open();
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
                                                            mService.api.permission.sendPermissionStatus("");
                                                        };
                                                    };
                                                    if (mService.app.channel !== "web") {
                                                        mService.dSource.loadCachedDataSource();
                                                    }
                                                    mService.spinner.hide();
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
                        $("#home_security_code_verification_popup").parent().addClass("ms_window");
                        var verificationCode = [];
                        $(".ms_security_code_box input[type=text]").keyup(function (event) {
                            $(".ms_security_code_box input[type=text]").each(function (i) {
                                verificationCode[i] = $(".ms_security_code_box input[type=text]")[i].value;
                                $('#verificationCode').val(Number(verificationCode.join('')));
                            });
                            if ($("#ms_security_code_result_container").is(":visible")) {
                                $("#ms_security_code_result_container").hide();
                                $("#ms_security_code_icon_container").show();
                            };
                            if ($(this).val().length > 0) {
                                value = $(this).val();
                                numbers = value.replace(/[^0-9]/g, "");
                                $(this).val(numbers);
                                if (numbers !== "") {
                                    $(this).next().focus();
                                    $(this).removeClass("ms_security_code_box_normal").removeClass("ms_security_code_box_error").addClass("ms_security_code_box_filled");
                                }
                            } else {
                                $(this).prev().focus();
                                $(this).removeClass("ms_security_code_box_filled").removeClass("ms_security_code_box_error").addClass("ms_security_code_box_normal");
                            };
                        });
                        mService.config.label.resolve();
                        success();
                    } else {
                        success();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            open: function (purposeCode, eventName) {
                var phone,
                prefixLength,
                suffixLength,
                prefix,
                suffix,
                nbStars,
                formattedPhone,
                email,
                emailToShow,
                emailSplit;
                try {
                    $("#punch_in_out_popup_title").removeAttr("data-ms-lbl-locale");
                    if (purposeCode.toLowerCase().indexOf("mobile") !== -1) {
                        mService.security.code.verificationPopup.changeTitle("sms_title");
                        phone = mService.app.getMobileNo();
                        formattedPhone = "";
                        if (phone !== undefined && phone !== "" && phone.length > 0) {
                            prefixLength = 2;
                            suffixLength = 3;
                            prefix = phone.substring(0, prefixLength);
                            suffix = phone.slice(-suffixLength);
                            nbStars = phone.length - (prefixLength + suffixLength);
                            formattedPhone = (nbStars > 0) ? (prefix + "*".repeat(nbStars) + suffix) : (prefix + suffix);
                        };
                        $("#ms_verify_security_code_mobile_no_email").text(formattedPhone);
                    } else {
                        mService.security.code.verificationPopup.changeTitle("email_title");
                        emailToShow = "";
                        email = mService.app.getEmailId();
                        if (email !== undefined && email !== "" && email.length > 0) {
                            emailSplit = email.split("@");
                            prefixLength = 2;
                            suffixLength = (emailSplit[0].length > 6) ? (3) : ((emailSplit[0].length === 5 || emailSplit[0].length === 6) ? (2) : ((emailSplit[0].length === 4) ? (1) : (0)));
                            prefix = emailSplit[0].substring(0, prefixLength);
                            suffix = (suffixLength !== 0) ? (emailSplit[0].slice(-suffixLength)) : ("");
                            nbStars = emailSplit[0].length - (prefixLength + suffixLength);
                            emailToShow = (nbStars > 0) ? (prefix + "*".repeat(nbStars) + suffix) : (prefix + suffix);
                            $("#ms_verify_security_code_mobile_no_email").text(emailToShow + "@" + emailSplit[1]);
                        };
                    };
                    $("#ms_verify_security_code_resend_btn").attr("ms_security_code_purpose_code", purposeCode);
                    $("#ms_verify_security_code_verify_btn").attr("ms_security_code_event_name", eventName);
                    $("#home_security_code_verification_popup").data("kendoWindow").open().center();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            close: function () {
                try {
                    $("#home_security_code_verification_popup").data("kendoWindow").close();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            disableInputs: function () {
                try {
                    $(".ms_security_code_box input[type=text]").each(function (i) {
                        $($(".ms_security_code_box input[type=text]")[i]).prop('disabled', true);
                        $($(".ms_security_code_box input[type=text]")[i]).addClass("ms_security_code_box_disabled").removeClass("ms_security_code_box_normal").removeClass("ms_security_code_box_filled").removeClass("ms_security_code_box_error");
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            enableInputs: function () {
                try {
                    $(".ms_security_code_box input[type=text]").each(function (i) {
                        $($(".ms_security_code_box input[type=text]")[i]).prop('disabled', false);
                        $($(".ms_security_code_box input[type=text]")[i]).addClass("ms_security_code_box_normal").removeClass("ms_security_code_box_disabled").removeClass("ms_security_code_box_filled").removeClass("ms_security_code_box_error");
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            resetInputs: function () {
                try {
                    $(".ms_security_code_box input[type=text]").each(function (i) {
                        $($(".ms_security_code_box input[type=text]")[i]).val("");
                        $($(".ms_security_code_box input[type=text]")[i]).addClass("ms_security_code_box_normal").removeClass("ms_security_code_box_filled").removeClass("ms_security_code_box_error");
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            verify: function () {
                var valid,
                verificationCode;
                try {
                    if (!mService.security.code.verificationPopup.variable.verifySubmitInAction) {
                        mService.security.code.verificationPopup.variable.verifySubmitInAction = true;
                        if (mService.app.channel === "mobile") {
                            Keyboard.hide();
                        };
                        mService.spinner.show();
                        setTimeout(function () {
                            var purposeCode,
                            eventName;
                            try {
                                valid = true;
                                verificationCode = [];
                                purposeCode = $("#ms_verify_security_code_resend_btn").attr("ms_security_code_purpose_code");
                                $(".ms_security_code_box input[type=text]").each(function (i) {
                                    verificationCode[i] = $(".ms_security_code_box input[type=text]")[i].value;
                                    if (verificationCode[i] === "") {
                                        $($(".ms_security_code_box input[type=text]")[i]).addClass("ms_security_code_box_error").removeClass("ms_security_code_box_normal").removeClass("ms_security_code_box_filled");
                                        valid = false;
                                    } else {
                                        $($(".ms_security_code_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]")[i]).addClass("ms_security_code_box_filled").removeClass("ms_security_code_box_normal").removeClass("ms_security_code_box_error");
                                    }
                                });
                                if (valid) {
                                    eventName = $("#ms_verify_security_code_verify_btn").attr("ms_security_code_event_name");
                                    mService.security.code.verify(purposeCode, verificationCode.join(''), function () {
                                        try {
                                            mService.spinner.hide();
                                            $("#ms_security_code_verify_btn").hide();
                                            $("#ms_security_code_icon_container").hide();
                                            $("#ms_security_code_result_container").show();
                                            $("#ms_security_code_result_success").show();
                                            $("#ms_security_code_result_text_success").show();
                                            $("#ms_security_code_result_error").hide();
                                            $("#ms_security_code_result_text_error").hide();
                                            $("#ms_verify_security_code_resend_container").hide();
                                            $("#ms_verify_security_code_timer_container").hide();
                                            if (mService.security.code.verificationPopup.variable.resendTimer !== undefined) {
                                                clearInterval(mService.security.code.verificationPopup.variable.resendTimer);
                                            };
                                            setTimeout(function () {
                                                var purposeCodeData;
                                                try {
                                                    purposeCodeData = mService.security.code.verificationPopup.variable.purposeCodeDSrc.data();
                                                    if (mService.security.code.verificationPopup.variable.verificationCounter === purposeCodeData.length - 1) {
                                                        mService.security.code.verificationPopup.variable.verificationCounter = 0;
                                                        mService.security.code.processVerification(eventName);
                                                        mService.security.code.verificationPopup.variable.verifySubmitInAction = false;
                                                    } else {
                                                        mService.security.code.verificationPopup.variable.verificationDoneInd = true;
                                                        mService.security.code.verificationPopup.close();
                                                        mService.security.code.verificationPopup.variable.verifySubmitInAction = false;
                                                        mService.security.code.verificationPopup.variable.verificationCounter = mService.security.code.verificationPopup.variable.verificationCounter + 1;
                                                        mService.spinner.show();
                                                        mService.security.code.request(purposeCodeData[mService.security.code.verificationPopup.variable.verificationCounter].code, function () {
                                                            try {
                                                                mService.spinner.hide();
                                                                mService.security.code.verificationPopup.open(purposeCodeData[mService.security.code.verificationPopup.variable.verificationCounter].code, eventName);
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
                                            }, 2000);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function (errorCode) {
                                        try {
                                            if (errorCode !== undefined && errorCode.code !== undefined) {
                                                $("#ms_security_code_icon_container").hide();
                                                $("#ms_security_code_result_container").show();
                                                $("#ms_security_code_result_error").show();
                                                $("#ms_security_code_result_text_error").show();
                                                $("#ms_security_code_result_success").hide();
                                                $("#ms_security_code_result_text_success").hide();
                                                $("#ms_security_code_result_text_error").removeAttr("data-ms-lbl-locale");
                                                $("#ms_security_code_result_text_error").attr("data-ms-lbl-id", "security_code_" + errorCode.code);
                                                mService.config.label.resolve();
                                            };
                                            mService.security.code.verificationPopup.variable.verifySubmitInAction = false;
                                            mService.spinner.hide();
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.security.code.verificationPopup.variable.verifySubmitInAction = false;
                                    mService.spinner.hide();
                                    if (mService.app.channel === "web") {
                                        mService.app.alert("error", {
                                            scrid: "",
                                            lblid: "security_code_error_number_missing",
                                            lblgrpid: "error"
                                        });
                                    } else {
                                        mService.app.showToast("security_code_error_number_missing", "system_messages");
                                    }
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 50);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            resend: function () {
                var purposeCode;
                try {
                    if (!mService.security.code.verificationPopup.variable.resendSubmitInAction) {
                        mService.security.code.verificationPopup.variable.resendSubmitInAction = true;
                        mService.spinner.show();
                        setTimeout(function () {
                            try {
                                mService.security.code.verificationPopup.resetInputs();
                                if ($("#ms_security_code_result_container").is(":visible")) {
                                    $("#ms_security_code_result_container").hide();
                                    $("#ms_security_code_icon_container").show();
                                };
                                purposeCode = $("#ms_verify_security_code_resend_btn").attr("ms_security_code_purpose_code");
                                mService.security.code.request(purposeCode, function () {
                                    try {
                                        mService.security.code.verificationPopup.variable.resendSubmitInAction = false;
                                        mService.spinner.hide();
                                        mService.security.code.verificationPopup.enableInputs();
                                        mService.security.code.verificationPopup.timer();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.security.code.verificationPopup.variable.resendSubmitInAction = false;
                                        mService.spinner.hide();
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 50);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            timer: function () {
                var timeLeft;
                try {
                    $("#ms_verify_security_code_resend_container").hide();
                    $("#ms_verify_security_code_timer_container").show();
                    timeLeft = 30;
                    $("#ms_verify_security_code_timer").text(timeLeft + " s");
                    if (mService.security.code.verificationPopup.variable.resendTimer !== undefined) {
                        clearInterval(mService.security.code.verificationPopup.variable.resendTimer);
                    };
                    mService.security.code.verificationPopup.variable.resendTimer = setInterval(function () {
                        if (timeLeft <= 0) {
                            clearInterval(mService.security.code.verificationPopup.variable.resendTimer);
                            $("#ms_verify_security_code_resend_container").show();
                            $("#ms_verify_security_code_timer_container").hide();
                        } else {
                            $("#ms_verify_security_code_timer").text(timeLeft + " s");
                        };
                        timeLeft -= 1;
                    }, 1000);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            variable: {
                verifySubmitInAction: false,
                resendSubmitInAction: false,
                verificationCounter: 0,
                verificationDoneInd: false,
                resendTimer: ""
            }
        }
    },
    security_code_verification: {
        button: {
            resend: function (ele, evt) {
                try {
                    mService.security.security_code_verification.util.resend(ele.attr("data-ms-purposecode"), ele.attr("data-ms-uid"))
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            submit: function (ele, evt) {
                try {
                    mService.security.security_code_verification.util.verify(ele.attr("data-ms-purposecode"), ele.attr("data-ms-uid"))
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        page: {
            afterShow: function (e) {
                var verificationCode,
                purposeCode;
                try {
                    purposeCode = mService.security.security_code_verification.variable.purposeCode;
                    $("#ms_security_code_verification_" + purposeCode + "_verify_btn").show();
                    verificationCode = [];
                    $(".ms_security_code_verification_box input[type=text]").keyup(function (event) {
                        $(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]").each(function (i) {
                            verificationCode[i] = $(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]")[i].value;
                            $('#verificationCode').val(Number(verificationCode.join('')));
                        });
                        if ($("#ms_security_code_verification_" + purposeCode + "_result_container").is(":visible")) {
                            $("#ms_security_code_verification_" + purposeCode + "_result_container").hide();
                            $("#ms_security_code_verification_" + purposeCode + "_svg_container").show();
                            $("#ms_security_code_verification_" + purposeCode + "_icon_container").show();
                        };
                        if ($(this).val().length > 0) {
                            value = $(this).val();
                            numbers = value.replace(/[^0-9]/g, "");
                            $(this).val(numbers);
                            if (numbers !== "") {
                                $(this).next().focus();
                                $(this).removeClass("ms_security_code_box_normal").removeClass("ms_security_code_box_error").addClass("ms_security_code_box_filled");
                            }
                        } else {
                            $(this).prev().focus();
                            $(this).removeClass("ms_security_code_box_filled").removeClass("ms_security_code_box_error").addClass("ms_security_code_box_normal");
                        };
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
                var listData,
                index,
                purposeCode,
                scrollview;
                try {
                    mService.security.security_code_verification.variable.eventName = mService.settings.variable.eventName;
                    listData = mService.security.code.verificationPopup.variable.purposeCodeDSrc.data();
                    if (listData.length > 0) {
                        mService.security.security_code_verification.variable.purposeCode = listData[0].code;
                        purposeCode = listData[0].code;
                    };
                    $("#security_code_verification_scrollview").after(mService.config.template.getTransformedHtml("ms_security_code_verification_scrollview_pager_template", {
                            scrID: "security_code_verification"
                        }));
                    for (index = 0; index < listData.length; index++) {
                        $("#security_code_verification_scrollview").append("<div id ='security_code_verification_scrollview_" + listData[index].code + "' data-role='page' data-ms-uid='" + listData[index].uid + "'></div>");
                        $("#security_code_verification_scrollview_" + listData[index].code).html(mService.config.template.getTransformedHtml("ms_security_code_verification_scrollview_template", listData[index]));
                        $("#security_code_verification_pager_list").append("<li id='security_code_verification_pager_" + index + "'></li>");
                    };
                    if (listData.length === 1) {
                        $("#security_code_verification_pager").hide();
                        $(".ms_permission_screen_container").css("height", "98vh");
                    } else {
                        $("#security_code_verification_pager").show();
                        $("#security_code_verification_pager_0").addClass("ms_pager_active").removeClass("ms_pager_inactive").siblings().addClass("ms_pager_inactive").removeClass("ms_pager_active");
                    };
                    $("#security_code_verification_scrollview").kendoMobileScrollView({
                        enable: false,
                        contentHeight: "100%",
                        enablePager: false,
                        itemsPerPage: 1,
                        bounceVelocityThreshold: 3,
                        duration: 800,
                        change: function (e) {
                            var listData,
                            pageNo;
                            try {
                                console.log("page ", e.page, "data: ", e.data);
                                pageNo = e.page + 0;
                                listData = mService.security.code.verificationPopup.variable.purposeCodeDSrc.data();
                                mService.security.security_code_verification.variable.purposeCode = listData[pageNo].code;
                                $("#security_code_verification_pager_" + (e.page + 0)).addClass("ms_pager_active").removeClass("ms_pager_inactive").siblings().addClass("ms_pager_inactive").removeClass("ms_pager_active");
                                mService.security.security_code_verification.util.timer();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                    });
                    scrollview = $("#security_code_verification_scrollview").data("kendoMobileScrollView");
                    scrollview.pane.userEvents.bind("start", mService.security.security_code_verification.util.cancel);
                    mService.security.security_code_verification.variable.verificationDoneInd = false;
                    $("#ms_security_code_verification_" + purposeCode + "_result_container").hide();
                    $("#ms_security_code_verification_" + purposeCode + "_svg_container").show();
                    $("#ms_security_code_verification_" + purposeCode + "_icon_container").show();
                    $("#ms_security_code_verification_" + purposeCode + "_verify_btn").show();
                    $("#ms_security_code_verification_" + purposeCode + "_first").focus();
                    mService.security.security_code_verification.util.timer();
                    setTimeout(function () {
                        try {
                            mService.spinner.hide();
                            mService.config.label.resolve();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 100);
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
            cancel: function () {
                try {
                    this.cancel();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            disableInputs: function (purposeCode) {
                try {
                    $(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "']  input[type=text]").each(function (i) {
                        $($(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "']  input[type=text]")[i]).prop('disabled', true);
                        $($(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "']  input[type=text]")[i]).addClass("ms_security_code_box_disabled").removeClass("ms_security_code_box_normal").removeClass("ms_security_code_box_filled").removeClass("ms_security_code_box_error");
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            enableInputs: function (purposeCode) {
                try {
                    $(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]").each(function (i) {
                        $($(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]")[i]).prop('disabled', false);
                        $($(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]")[i]).addClass("ms_security_code_box_normal").removeClass("ms_security_code_box_disabled").removeClass("ms_security_code_box_filled").removeClass("ms_security_code_box_error");
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            resetInputs: function (purposeCode) {
                try {
                    $(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]").each(function (i) {
                        $($(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]")[i]).val("");
                        $($(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]")[i]).addClass("ms_security_code_box_normal").removeClass("ms_security_code_box_filled").removeClass("ms_security_code_box_error");
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            verify: function (purposeCode, uid) {
                var valid,
                verificationCode;
                try {
                    if (!mService.security.security_code_verification.variable.verifySubmitInAction) {
                        mService.security.security_code_verification.variable.verifySubmitInAction = true;
                        if (mService.app.channel === "mobile") {
                            Keyboard.hide();
                        };
                        mService.spinner.show();
                        setTimeout(function () {
                            var eventName;
                            try {
                                valid = true;
                                verificationCode = [];
                                $(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]").each(function (i) {
                                    verificationCode[i] = $(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]")[i].value;
                                    if (verificationCode[i] === "") {
                                        $($(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]")[i]).addClass("ms_security_code_box_error").removeClass("ms_security_code_box_normal").removeClass("ms_security_code_box_filled");
                                        valid = false;
                                    } else {
                                        $($(".ms_security_code_verification_box[data-ms-purposecode='" + purposeCode + "'] input[type=text]")[i]).addClass("ms_security_code_box_filled").removeClass("ms_security_code_box_normal").removeClass("ms_security_code_box_error");
                                    }
                                });
                                if (valid) {
                                    mService.spinner.show();
                                    purposeCode = mService.security.security_code_verification.variable.purposeCode;
                                    eventName = mService.security.security_code_verification.variable.eventName;
                                    $("#ms_security_code_verification_" + purposeCode + "_verify_btn").hide();
                                    $("#ms_security_code_verification_" + purposeCode + "_resend_container").css("visibility", "hidden");
                                    mService.security.code.verify(purposeCode, verificationCode.join(''), function () {
                                        try {
                                            mService.spinner.hide();
                                            $("#ms_security_code_verification_" + purposeCode + "_verify_btn").hide();
                                            $("#ms_security_code_verification_" + purposeCode + "_result_container").show();
                                            $("#ms_security_code_verification_" + purposeCode + "_svg_container").hide();
                                            $("#ms_security_code_verification_" + purposeCode + "_result_success").show();
                                            $("#ms_security_code_verification_" + purposeCode + "_result_text_success").show();
                                            $("#ms_security_code_verification_" + purposeCode + "_result_error").hide();
                                            $("#ms_security_code_verification_" + purposeCode + "_result_text_error").hide();
                                            $("#ms_security_code_verification_" + mService.security.security_code_verification.variable.purposeCode + "_resend_container").css("visibility", "hidden");
                                            $("#ms_security_code_verification_" + mService.security.security_code_verification.variable.purposeCode + "_timer_container").hide();
                                            if (mService.security.security_code_verification.variable.resendTimer !== undefined) {
                                                clearInterval(mService.security.security_code_verification.variable.resendTimer);
                                            };
                                            setTimeout(function () {
                                                var purposeCodeData;
                                                try {
                                                    purposeCodeData = mService.security.code.verificationPopup.variable.purposeCodeDSrc.data();
                                                    if (mService.security.security_code_verification.variable.verificationCounter === purposeCodeData.length - 1) {
                                                        mService.security.security_code_verification.variable.verificationCounter = 0;
                                                        mService.security.code.processVerification(mService.security.security_code_verification.variable.eventName);
                                                        mService.security.security_code_verification.variable.verifySubmitInAction = false;
                                                    } else {
                                                        mService.security.security_code_verification.variable.verificationDoneInd = true;
                                                        mService.security.security_code_verification.variable.verifySubmitInAction = false;
                                                        mService.security.security_code_verification.variable.verificationCounter = mService.security.security_code_verification.variable.verificationCounter + 1;
                                                        mService.spinner.show();
                                                        mService.security.code.request(purposeCodeData[mService.security.security_code_verification.variable.verificationCounter].code, function () {
                                                            try {
                                                                mService.spinner.hide();
                                                                selectedRecord = mService.security.code.verificationPopup.variable.purposeCodeDSrc.getByUid(uid);
                                                                selectedIndex = mService.security.code.verificationPopup.variable.purposeCodeDSrc.indexOf(selectedRecord);
                                                                totalRecords = mService.security.code.verificationPopup.variable.purposeCodeDSrc.total();
                                                                scrollview = $("#security_code_verification_scrollview").data("kendoMobileScrollView");
                                                                scrollview.scrollTo((selectedIndex + 1));
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
                                            }, 2000);
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    }, function (errorCode) {
                                        try {
                                            if (errorCode !== undefined && errorCode.code !== undefined) {
                                                $("#ms_security_code_verification_" + purposeCode + "_verify_btn").show();
                                                $("#ms_security_code_verification_" + purposeCode + "_resend_container").css("visibility", "visible");
                                                $("#ms_security_code_verification_" + purposeCode + "_icon_container").hide();
                                                $("#ms_security_code_verification_" + purposeCode + "_result_container").show();
                                                $("#ms_security_code_verification_" + purposeCode + "_svg_container").hide();
                                                $("#ms_security_code_verification_" + purposeCode + "_result_error").show();
                                                $("#ms_security_code_verification_" + purposeCode + "_result_text_error").show();
                                                $("#ms_security_code_verification_" + purposeCode + "_result_success").hide();
                                                $("#ms_security_code_verification_" + purposeCode + "_result_text_success").hide();
                                                $("#ms_security_code_verification_" + purposeCode + "_result_text_error").removeAttr("data-ms-lbl-locale");
                                                $("#ms_security_code_verification_" + purposeCode + "_result_text_error").attr("data-ms-lbl-id", "security_code_" + errorCode.code);
                                                mService.config.label.resolve();
                                            };
                                            mService.security.security_code_verification.variable.verifySubmitInAction = false;
                                            mService.spinner.hide();
                                            return true;
                                        } catch (exception) {
                                            mService.exception.handle(exception);
                                        }
                                    });
                                } else {
                                    mService.security.security_code_verification.variable.verifySubmitInAction = false;
                                    mService.spinner.hide();
                                    if (mService.app.channel === "web") {
                                        mService.app.alert("error", {
                                            scrid: "",
                                            lblid: "security_code_error_number_missing",
                                            lblgrpid: "error"
                                        });
                                    } else {
                                        mService.app.showToast("security_code_error_number_missing", "system_messages");
                                    }
                                }
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 50);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            resend: function (purposeCode, uid) {
                var purposeCode;
                try {
                    if (!mService.security.security_code_verification.variable.resendSubmitInAction) {
                        mService.security.security_code_verification.variable.resendSubmitInAction = true;
                        mService.spinner.show();
                        setTimeout(function () {
                            try {
                                mService.security.security_code_verification.util.resetInputs(purposeCode);
                                if ($("#ms_security_code_verification_" + purposeCode + "_result_container").is(":visible")) {
                                    $("#ms_security_code_verification_" + purposeCode + "_result_container").hide();
                                    $("#ms_security_code_verification_" + purposeCode + "_svg_container").show();
                                    $("#ms_security_code_verification_" + purposeCode + "_icon_container").show();
                                };
                                mService.security.code.request(purposeCode, function () {
                                    try {
                                        mService.security.security_code_verification.variable.resendSubmitInAction = false;
                                        mService.spinner.hide();
                                        mService.security.security_code_verification.util.enableInputs(purposeCode);
                                        mService.security.security_code_verification.util.timer();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        mService.security.security_code_verification.variable.resendSubmitInAction = false;
                                        mService.spinner.hide();
                                        return true;
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, 50);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            timer: function () {
                var timeLeft;
                try {
                    $("#ms_security_code_verification_" + mService.security.security_code_verification.variable.purposeCode + "_resend_container").css("visibility", "hidden");
                    $("#ms_security_code_verification_" + mService.security.security_code_verification.variable.purposeCode + "_timer_container").show();
                    timeLeft = 30;
                    $("#ms_security_code_verification_" + mService.security.security_code_verification.variable.purposeCode + "_timer").text(timeLeft + " s");
                    if (mService.security.security_code_verification.variable.resendTimer !== undefined) {
                        clearInterval(mService.security.security_code_verification.variable.resendTimer);
                    };
                    mService.security.security_code_verification.variable.resendTimer = setInterval(function () {
                        if (timeLeft <= 0) {
                            clearInterval(mService.security.security_code_verification.variable.resendTimer);
                            $("#ms_security_code_verification_" + mService.security.security_code_verification.variable.purposeCode + "_resend_container").css("visibility", "visible");
                            $("#ms_security_code_verification_" + mService.security.security_code_verification.variable.purposeCode + "_timer_container").hide();
                        } else {
                            $("#ms_security_code_verification_" + mService.security.security_code_verification.variable.purposeCode + "_timer").text(timeLeft + " s");
                        };
                        timeLeft -= 1;
                    }, 1000);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            getModeValue: function (purposeCode) {
                var modeValue;
                try {
                    if (purposeCode.toLowerCase().indexOf("mobile") !== -1) {
                        phone = mService.app.getMobileNo();
                        formattedPhone = "";
                        if (phone !== undefined && phone !== "" && phone.length > 0) {
                            prefixLength = 2;
                            suffixLength = 3;
                            prefix = phone.substring(0, prefixLength);
                            suffix = phone.slice(-suffixLength);
                            nbStars = phone.length - (prefixLength + suffixLength);
                            formattedPhone = (nbStars > 0) ? (prefix + "*".repeat(nbStars) + suffix) : (prefix + suffix);
                        };
                        modeValue = formattedPhone;
                    } else {
                        emailToShow = "";
                        email = mService.app.getEmailId();
                        if (email !== undefined && email !== "" && email.length > 0) {
                            emailSplit = email.split("@");
                            prefixLength = 2;
                            suffixLength = (emailSplit[0].length > 6) ? (3) : ((emailSplit[0].length === 5 || emailSplit[0].length === 6) ? (2) : ((emailSplit[0].length === 4) ? (1) : (0)));
                            prefix = emailSplit[0].substring(0, prefixLength);
                            suffix = (suffixLength !== 0) ? (emailSplit[0].slice(-suffixLength)) : ("");
                            nbStars = emailSplit[0].length - (prefixLength + suffixLength);
                            emailToShow = (nbStars > 0) ? (prefix + "*".repeat(nbStars) + suffix) : (prefix + suffix);
                            modeValue = emailToShow + "@" + emailSplit[1];
                        };
                    };
                    return modeValue;
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
        },
        variable: {
            verifySubmitInAction: false,
            resendSubmitInAction: false,
            verificationCounter: 0,
            verificationDoneInd: false,
            resendTimer: ""
        }
    }
};