mService.auth = {
    signup: {
        button: {
            submit: function (ele, evt) {
                var validator;
                try {
                    validator = $("#signup_validate").kendoValidator().data("kendoValidator");
                    if (validator.validate()) {
                        if (mService.config.rule.validator.validateInput("#signup_mobile_no")) {
                            mService.util.validateInputFields("signup");
                            $("#signup_mobile_no_err").hide();
                            if (mService.app.isMultipleAccountsAllowed()) {
                                mService.visitor.profile.context.client_id = $("#signup_multiple_acc_client_id").val().trim().toLowerCase();
                                mService.visitor.profile.context.country_code = $("#signup_multiple_acc_country_code").val().trim().toLowerCase();
                            } else {
                                if (mService.auth.signup.variable.countryListArray.length !== 0) {
                                    mService.visitor.profile.context.country_code = $("#signup_country_code").data("kendoDropDownList").value();
                                } else {
                                    mService.visitor.profile.context.country_code = mService.app.appSettings.documentElement.getElementsByTagName("default_country_code")[0].childNodes[0].nodeValue;
                                }
                            };
                            mService.visitor.submitProfile({
                                first_name: $("#signup_first_name").val(),
                                last_name: $("#signup_last_name").val(),
                                mobile_no: $("#signup_mobile_no").getVal(),
                                email_id: $("#signup_email_id").val(),
                                org_name: $("#signup_org_name").val(),
                                org_address: $("#signup_org_address").val(),
                                client_id: ((mService.app.isMultipleAccountsAllowed()) ? ($("#signup_multiple_acc_client_id").val().trim().toLowerCase()) : (mService.app.getClientId())),
                                country_code: ((mService.app.isMultipleAccountsAllowed()) ? ($("#signup_multiple_acc_country_code").val().trim().toLowerCase()) : (mService.app.getCountryCode()))
                            }, false);
                        }
                    } else {
                        mService.config.rule.validator.validateInput("#signup_mobile_no");
                        mService.util.validateInputFields("signup");
                        mService.app.showToast("mandatory_error", "pre_signup_messages");
                        if (!mService.util.validateEmailID($("#signup_email_id").val())) {
                            mService.app.showToast("email_id_invalid", "pre_signup_messages");
                        };
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        page: {
            afterShow: function () {
                var countryCodeList,
                filterObj,
                filterIndex;
                try {
                    mService.config.label.resolve();
                    countryCodeList = (mService.app.appSettings.documentElement.getElementsByTagName("profile_country_code_list")[0].childNodes[0].nodeValue).split(",");
                    filterObj = {
                        logic: "or",
                        filters: [],
                    };
                    for (var filterIndex = 0; filterIndex < countryCodeList.length; filterIndex++) {
                        filterObj.filters.push({
                            field: "code",
                            operator: "eq",
                            value: countryCodeList[filterIndex]
                        });
                    };
                    $("#signup_mobile_no").datasourceFilter(filterObj);
                    $('#signup input').on('blur', function (event) {
                        mService.util.validateInputFields("signup");
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
            beforeShow: function () {
                try {
                    if (mService.app.isMultipleAccountsAllowed()) {
                        $("#signup_multiple_acc_client_id_container").show();
                        $("#signup_multiple_acc_country_code_container").show();
                        $("#signup_multiple_acc_client_id").attr('required', 'required');
                        $("#signup_multiple_acc_country_code").attr('required', 'required');
                        $("#signup_countrylist").hide();
                        $("#signup_country_code").prop("required", false);
                        $("#signup_country_list_container").hide();
                    } else {
                        $("#signup_multiple_acc_client_id_container").hide();
                        $("#signup_multiple_acc_country_code_container").hide();
                        $("#signup_multiple_acc_client_id").removeAttr('required');
                        $("#signup_multiple_acc_country_code").removeAttr('required');
                    };
                    $("#signup_mobile_no").msMobileNumber({
                        scrid: "pre_signup_messages",
                        lblgrpid: "signup",
                        lblid: "mobile_no",
                    });
                    $("#signup_mobile_no_group").addClass("ms_signup_mobile_no_width_wrapper");
                    $("#signup_mobile_no_group").find('[data-for="signup_mobile_no_country_code"]').parent().addClass("ms_visitor_mobile_no_inp");
                    $("#signup_mobile_no_group").find("label").hide();
                    $("#signup_mobile_no_group").removeClass("ms_form_row");
                    $("#signup_mobile_no_country_code_container").removeClass("ms_mobile_number_country_code");
                    $("#signup_mobile_no_country_code_container").addClass("ms_visitor_mobile_country_code");
                    $("#signup_mobile_no_mobile_number_container").removeClass("ms_mobile_number_no");
                    $("#signup_mobile_no_mobile_number_container").addClass("ms_visitor_mobile_no");
                    $("#signup_mobile_no_country_code_bottom_sheet").removeClass("ms_mobile_number_country_code_icon");
                    $("#signup_mobile_no_country_code_bottom_sheet").addClass("ms_visitor_mobile_country_code_icon");
                    $("#signup_mobile_no").attr("data-ms-lbl-src", "pre_signup_messages");
                    $("#signup_mobile_no").attr("data-ms-lbl", "placeholder");
                    $("#signup_mobile_no").attr("data-ms-lbl-id", "mobile_no");
                    $("#signup_mobile_no").attr("data-ms-lbl-grpid", "signup");
                    mService.config.label.resolve();
                    $("#signup_mobile_no").attr("data-ms-rule-mandatory", "true");
                    mService.config.rule.executeConfiguredRules("signup");
                    setTimeout(function () {
                        var defaultCountryCode,
                        selectedRecord;
                        try {
                            defaultCountryCode = mService.app.appSettings.documentElement.getElementsByTagName("default_country_code")[0].childNodes[0].nodeValue;
                            selectedRecord = $.grep(mService.dSource.cache["country_codes"].data(), function (e, i) {
                                try {
                                    return e.code === defaultCountryCode.toUpperCase();
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            })[0];
                            if (selectedRecord !== undefined) {
                                $("#signup_mobile_no_country_code").val(selectedRecord.dial_code);
                            };
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
                var countryList,
                index,
                dropdownlist;
                try {
                    if (!mService.app.isMultipleAccountsAllowed()) {
                        countryList = mService.app.appSettings.documentElement.getElementsByTagName("country_list")[0];
                        for (index = 0; index < countryList.childNodes.length; index++) {
                            mService.auth.signup.variable.countryListArray.push({
                                code: countryList.childNodes[index].nodeName,
                                description: countryList.childNodes[index].childNodes[0].nodeValue,
                            });
                        };
                        $("#signup_country_code").kendoDropDownList({
                            autoBind: false,
                            dataTextField: "description",
                            dataValueField: "code",
                            dataSource: mService.auth.signup.variable.countryListArray,
                            optionLabel: "Country Code",
                        });
                        $("#signup").find(".k-dropdown").addClass("ms_mobile_signup_screen_country_dropdown_wrapper");
                        $("#signup").find(".k-dropdown-wrap").addClass("ms_mobile_signup_screen_country_dropdown");
                        $("#signup").find("[unselectable='on']").each(function () {
                            if ($(this).hasClass("k-input")) {
                                $(this).addClass("ms_mobile_signup_screen_country_dropdown_label").removeClass("ms_mobile_signup_screen_country_dropdown_label_selected");
                            }
                        });
                        dropdownlist = $("#signup_country_code").data("kendoDropDownList");
                        dropdownlist.bind("change", mService.auth.signup.util.countryCodeChange);
                        if (mService.auth.signup.variable.countryListArray.length == 0) {
                            $("#signup_country_list_container").hide();
                            $("#signup_country_code").prop("required", false);
                        } else {
                            $("#signup_country_code").prop("required", true);
                        };
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
            countryCodeChange: function (e) {
                var selectedCountryCode;
                try {
                    setTimeout(function () {
                        try {
                            mService.util.validateInputFields("signup");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 5);
                    selectedCountryCode = this.value();
                    $("#signup").find("[unselectable='on']").each(function () {
                        if ($(this).hasClass("k-input")) {
                            if (selectedCountryCode === "") {
                                $(this).addClass("ms_mobile_signup_screen_country_dropdown_label").removeClass("ms_mobile_signup_screen_country_dropdown_label_selected");
                            } else {
                                $(this).addClass("ms_mobile_signup_screen_country_dropdown_label_selected").removeClass("ms_mobile_signup_screen_country_dropdown_label");
                            }
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        variable: {
            countryListArray: []
        }
    },
    login: {
        authUser: function (allowAuth) {
            try {
                mService.spinner.show();
                mService.app.security.authUser({
                    client_id: ((mService.app.isMultipleAccountsAllowed()) ? ($("#login_multiple_acc_client_id").val().trim().toLowerCase()) : (mService.app.getClientId())),
                    country_code: ((mService.app.isMultipleAccountsAllowed()) ? ($("#login_multiple_acc_country_code").val().trim().toLowerCase()) : (mService.app.getCountryCode())),
                    locale_id: mService.app.getLocaleId(),
                    device_id: "",
                    user_id: $("#login_user_name").val().trim(),
                    password: $("#login_password").val()
                }, function () {
                    var eventName;
                    try {
                        if (mService.settings.variable.fromScreenId !== undefined && mService.settings.variable.fromScreenId === "welcome") {
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
                                                mService.page.change("security_code_verification", {
                                                    eventName: eventName
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
        button: {
            submit: function () {
                var validator;
                try {
                    validator = $("#login").kendoValidator().data("kendoValidator");
                    if (validator.validate()) {
                        mService.util.validateInputFields("login");
                        if (mService.settings.variable.fromScreenId !== undefined && mService.settings.variable.fromScreenId === "welcome") {
                            if (mService.app.isMultipleAccountsAllowed()) {
                                mService.visitor.profile.context.client_id = $("#login_multiple_acc_client_id").val().trim().toLowerCase();
                                mService.visitor.profile.context.country_code = $("#login_multiple_acc_country_code").val().trim().toLowerCase();
                            } else {
                                if (mService.auth.login.variable.countryListArray.length !== 0) {
                                    mService.visitor.profile.context.country_code = $("#login_country_code").data("kendoDropDownList").value();
                                } else {
                                    mService.visitor.profile.context.country_code = mService.app.appSettings.documentElement.getElementsByTagName("default_country_code")[0].childNodes[0].nodeValue;
                                };
                            };
                            mService.visitor.submitProfile({
                                "first_name": "",
                                "last_name": "",
                                "mobile_no": $("#login_user_name").val(),
                                "email_id": "",
                                "client_id": ((mService.app.isMultipleAccountsAllowed()) ? ($("#login_multiple_acc_client_id").val().trim().toLowerCase()) : (mService.app.getClientId())),
                                "country_code": ((mService.app.isMultipleAccountsAllowed()) ? ($("#login_multiple_acc_country_code").val().trim().toLowerCase()) : (mService.app.getCountryCode()))
                            }, true);
                        } else {
                            mService.auth.login.authUser(false);
                        }
                    } else {
                        mService.util.validateInputFields("login");
                        mService.app.showToast("mandatory_error", "pre_signup_messages");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            showPassword: function () {
                var passwordField,
                togglePassword;
                try {
                    passwordField = $('#login_password');
                    togglePassword = $("#ms_login_show_password");
                    if (passwordField.attr('type') === 'password') {
                        passwordField.attr('type', 'text');
                        $("#ms_login_show_password").css("visibility", "visible");
                        $("#ms_login_hide_password").css("visibility", "hidden");
                    } else {
                        passwordField.attr('type', 'password');
                        $("#ms_login_show_password").css("visibility", "hidden");
                        $("#ms_login_hide_password").css("visibility", "visible");
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        page: {
            afterShow: function (e) {
                try {
                    $('#login input').on('blur', function (event) {
                        mService.util.validateInputFields("login");
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
                var countryList,
                index,
                countryCode,
                countryDropDown,
                login;
                try {
                    if (mService.app.isMultipleAccountsAllowed()) {
                        $("#login").find("#login_multiple_acc_client_id_container, #login_country_code_container").show();
                        $("#login").find("#login_multiple_acc_client_id, #login_multiple_acc_country_code").attr('required', 'required');
                        $("#login").find("#login_country_list_container").hide();
                        $("#login_country_code").prop("required", false);
                        if (mService.settings.variable.fromScreenId !== undefined && mService.settings.variable.fromScreenId !== "welcome") {
                            $("#login_multiple_acc_client_id").val(mService.app.getClientId()).prop('disabled', true);
                            $("#login_multiple_acc_country_code").val(mService.app.getCountryCode()).prop('disabled', true);
                        } else {
                            $("#login_multiple_acc_client_id").val("").prop('disabled', false);
                            $("#login_multiple_acc_country_code").val("").prop('disabled', false);
                        }
                    } else {
                        $("#login_multiple_acc_client_id_container").hide();
                        $("#login_multiple_acc_country_code_container").hide();
                        $("#login_multiple_acc_client_id").removeAttr('required').prop('disabled', false);
                        $("#login_multiple_acc_country_code").removeAttr('required').prop('disabled', false);
                    };
                    $("#login_user_name").val("");
                    $("#login_password").val("");
                    if (!mService.app.isMultipleAccountsAllowed()) {
                        countryList = mService.app.appSettings.documentElement.getElementsByTagName("country_list")[0];
                        for (index = 0; index < countryList.childNodes.length; index++) {
                            mService.auth.login.variable.countryListArray.push({
                                code: countryList.childNodes[index].nodeName,
                                description: countryList.childNodes[index].childNodes[0].nodeValue
                            });
                        };
                        if (mService.auth.login.variable.countryListArray.length > 0) {
                            countryCode = $("#login_country_code").data('kendoDropDownList');
                            if (countryCode === undefined || countryCode.dataSource.data().length === 0) {
                                $("#login_country_code").kendoDropDownList({
                                    autoBind: false,
                                    dataTextField: "description",
                                    dataValueField: "code",
                                    dataSource: mService.auth.login.variable.countryListArray,
                                    optionLabel: "Country Code"
                                });
                            };
                            $("#login").find(".k-dropdown").addClass("ms_mobile_login_screen_country_dropdown_wrapper");
                            $("#login").find(".k-dropdown-wrap").addClass("ms_mobile_login_screen_country_dropdown");
                            $("#login").find("[unselectable='on']").each(function () {
                                if ($(this).hasClass("k-input")) {
                                    $(this).addClass("ms_mobile_login_screen_country_dropdown_label").removeClass("ms_mobile_login_screen_country_dropdown_label_selected");
                                }
                            });
                            dropdownlist = $("#login_country_code").data("kendoDropDownList");
                            dropdownlist.bind("change", mService.auth.login.util.countryCodeChange);
                            $("#login_country_code").prop('required', true);
                            countryDropDown = $("#login_country_code").data("kendoDropDownList");
                            if (mService.settings.variable.fromScreenId !== undefined && mService.settings.variable.fromScreenId !== "welcome") {
                                countryDropDown.enable(false);
                                countryDropDown.value(mService.app.getCountryCode());
                            } else {
                                countryDropDown.enable(true);
                            }
                        } else {
                            $("#login_country_list_container").hide();
                            $("#login_country_code").prop('required', false);
                        }
                    }
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
            countryCodeChange: function (e) {
                var selectedCountryCode;
                try {
                    setTimeout(function () {
                        try {
                            mService.util.validateInputFields("login");
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, 5);
                    selectedCountryCode = this.value();
                    $("#login").find("[unselectable='on']").each(function () {
                        if ($(this).hasClass("k-input")) {
                            if (selectedCountryCode === "") {
                                $(this).addClass("ms_mobile_login_screen_country_dropdown_label").removeClass("ms_mobile_login_screen_country_dropdown_label_selected");
                            } else {
                                $(this).addClass("ms_mobile_login_screen_country_dropdown_label_selected").removeClass("ms_mobile_login_screen_country_dropdown_label");
                            }
                        }
                    });
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        variable: {
            countryListArray: []
        }
    }
}
