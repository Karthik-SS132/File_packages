mService.layout = {
    tab: {
        activate: function (scrID, patternScrID) {
            try {
                $("#" + scrID + " [data-ms-layout-role='msTabstrip'] [data-ms-link-group='home_layout']").removeClass("km-state-active");
                if (patternScrID === undefined) {
                    $("#" + scrID + " [data-ms-layout-role='msTabstrip'] [data-ms-link-group='home_layout'][data-ms-link-role='" + scrID + "']").addClass("km-state-active");
                } else {
                    $("#" + scrID + " [data-ms-layout-role='msTabstrip'] [data-ms-link-group='home_layout'][data-ms-link-role='" + patternScrID + "']").addClass("km-state-active");
                };
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
    },
    tile: {
        init: function () {
            try {
                if (mService.app.getScreenId() !== "home_tile") {
                    if ($("#home_tile").length !== 0) {
                        $("#home_tile").remove();
                    };
                    $("body").append(kendo.template($("#ms_home_tile_template").html())({}));
                    mService.application.navigate("#home_tile");
                } else {
                    mService.presentR.config.ui.loadMenus("home_tile");
                    mService.presentR.util.loadLabelFiles();
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
                    }
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        page: {
            afterShow: function (e) {
                try {
                    mService.presentR.util.loadLabelFiles();
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
                    mService.presentR.config.ui.loadMenus("home_tile");
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
    }
};