var home_dashboard = {
	page: {
        beforeShow: function () {
            try {
				if ($("#home_dashboard").length === 0) {
                    $.ajax({
                        url: "www/content/home_dashboard.html",
                        dataType: "text",
                        async: false,
                        success: function (data) {
                            try {
                                $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='CPORTDASH'] section div div").html(data);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        error: function (e) {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                } else {
					return true;
				};
                $.ajax({
					url: "www/configuration/ui/" + mService.user.profile.context.client_id + "/" + mService.user.profile.context.country_code + "/ui_home_dashboard_" + mService.user.profile.context.client_id + "_" + mService.user.profile.context.country_code + ".txt",
					async: false,
					cache: false
				}).done(function (data) {
					home_dashboard.variable.custom.reportGroupList = JSON.parse(data)["reportGroup"];
					if (home_dashboard.variable.custom.reportGroupList.length > 0) {
						home_dashboard.customRequirementHandler.createReportGroups(home_dashboard.variable.custom.reportGroupList);
						home_dashboard.customRequirementHandler.createInputparam(home_dashboard.variable.custom.activeGroupIndex);
						home_dashboard.variable.custom.groupTypeLink[0].load = true;
					};
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
        },
        afterShow: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    customRequirementHandler: {
        reportsInView: function () {
            return $.grep($("[data-mreport-role = 'bookmark']"), function (e, i) {
                return ((($(e).offset().top) > (window.pageYOffset)) && (($(e).offset().top + ($(e).outerHeight() / 2)) < (window.pageYOffset + window.innerHeight)));
            });
        },
        getReportName: function (rName) {
            return kendo.template(rName)(JSON.parse(home_dashboard.customRequirementHandler.getGroupFilterValue("json", home_dashboard.variable.custom.activeGroupIndex)));
        },
        getGroupFilterValue: function (type, grpIndex) {
            var index,
            returnValue = "",
            id,
            filter = $("#home_dashboard_report_group_filter_" + grpIndex).find("[data-widget-type='mDropdownlist']").not("#home_dashboard_report_group_filter_" + grpIndex + "_report_code_list_filter");
            for (index = 0; index < filter.length; index++) {
                id = $(filter[index]).attr("id").replace("home_dashboard_report_group_filter_" + grpIndex + "_", "");
                returnValue += (type === "xml") ? ("<" + id + ">" + mService.util.getXmlString($(filter[index]).data("kendoDropDownList").value()) + "</" + id + ">") : ('"' + id + '":"' + $(filter[index]).data("kendoDropDownList").text() + '",');
            };
            returnValue = (type !== "xml" && returnValue.length !== 0) ? ("{" + returnValue.substring(0, returnValue.length - 1) + "}") : (returnValue);
            return returnValue;
        },
        getReportActionBarHtml: function (chartId, groupIndex) {
            var html = "",
            style = "padding-left:10px; padding-right:10px; height:15px; opacity:0.6; cursor: pointer;",
            backIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAUVBMVEUAAAAbGxsHBwcnJycnJycICAhPT08GBgYICAgHBwcNDQ0lJSUEBAQGBgYFBQUJCQkPDw86OjoLCwsREREVFRUXFxcaGhoPDw8PDw8UFBQAAACUvDipAAAAGnRSTlMAN88XE7QF08C7lyXy59vKeQuecV9LQotoVEHsUY0AAACaSURBVDjL3ZFZDsMgDERjCIQlYcnSxfc/aAUooVJx+c982XqjkWGGm4nzDp+gwxE6/K+BM6wGiuOkhDDhbeUPHxOvmvVmCV6lD0nzIg+VE3qWEIWkREwGWGiHzhnW0Q5TrvDfb3ReC8XO2Ed2RJEXt77gajRCSNezskmDra8GlSKKQruLDddz3Ntl7cs1HnOzTVNHsC3DONxCHzqIF9VN3+DhAAAAAElFTkSuQmCC",
            refreshIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAaVBMVEUAAABYWFgCAgIEBAQiIiIWFhYGBgYMDAwfHx8oKCgFBQUHBwcJCQkREREXFxcNDQ0LCwsQEBAYGBg0NDQLCwsMDAwODg4cHBwpKSkJCQkLCwsRERETExMUFBQaGhpAQEAGBgYICAgAAADmW79VAAAAInRSTlMABfryJ1PjnS8X6dbAckaIfmBNE6aTaTgguat4ZVs+CtrLFN4BBgAAASpJREFUOMutU9mCgyAMVEBQ8L7q1drm/z9yA9Rdju5b50ENGZJhiMmXsfRdl+XpP1k2cTCg4yNKpv0+goOSBYQRApDOy9+ujc08Nysx37tLyMySWGw0NIZydwgFxQX1p54prXVxGLUinq7iiYztik79CA6f6y75O9jaJEaDhCm5S62JQBXagk2whBTAMZqRO/t5qVpWgsaE4QsQvi8PPJV1A01nYJD5zlG7KlOrBkH6TwyB/fjlfu2f0zBwrTZZfpskLXyGRDOxwwZK12BJysL5kDDii4pzN81iMK6VDzhoBBXkgVXa+uLyX2CJp6ugWAmPb9vRsAIiDweGVue7/KFD/4IqO87iqOtO8E/eHgQClOGEvNysarP498nK3802G2Poq7at+iH5Kn4A2/klOgNm21cAAAAASUVORK5CYII=",
            closeIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEUAAAA2NjYKCgooKCgJCQkMDAwHBwdQUFAGBgYLCwsICAgJCQkMDAwNDQ0ODg4hISEAAACnNejoAAAAEHRSTlMADMMZxavZBvit8dGdmYcmZy5YswAAAItJREFUOMvV0kEOhCAQRNECRMFRp+9/WomJIelvcG1v398QSmEvZQsSbznWUpN2axeD6PkSFesFvN0V9AJu2qwXokeFqRf0OckVdFfAXQFHAUfhnIVzFnAUcBRwFs+upd7BFKj9/aN9oICjoM/u5+Dpk/vQMd5H1vqyD5WXfaiO9/FTimbxeR+5+f8E3DkbJ0/zHHsAAAAASUVORK5CYII=",
            fullscreenIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAPFBMVEUAAAABAQECAgIYGBgREREVFRUUFBQNDQ0TExMPDw8XFxcSEhILCwsJCQkjIyMsLCwQEBAbGxsjIyMAAACs5q2hAAAAE3RSTlMA/fhMiWpmoniZWnrCvjYMhVYyYmfU3wAAALBJREFUOMvdk9EOgyAQBJdaC1LU2vv/fy0iK+fRpO+d15mYkD0hZILiKQTGdwWsJ+EaJHT4S+Ae1g83Biw634LEwvp0BBPGVmh/R8hB9mBhfHktds9iOPxCvxfIsJhXvpBeMxbPgl4zrGhs+FfeUCxAv7/Hyev7ffjT6+UCfWar31fbRkhQ+1ba+tFBJDRviuzLyXl6W3jHo6XXRQXG24LB/OvHkWB9dAxYdJ6BLnovH/FtFvtVgU6HAAAAAElFTkSuQmCC",
            splitScreenIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAP1BMVEUAAAAAAAAHBwcCAgIWFhYXFxcSEhIVFRUUFBQfHx8EBAQEBAQgICAHBwcLCwsLCwsODg4PDw8TExMTExMAAABHAxK1AAAAFHRSTlMA7gz5SzaJamYi4twGyK7AoJd+dHxPzzUAAAC8SURBVDjL5dM5DsMwDERRUpYSa3G88f5nDQNwQBX0CTKFC/9XCRLR+Kz0sLynXxdZH/oiWyLtEHVYqegiG70ForZkoBd0eRGEdgFgLt4hriYOhG90FzIDnXcXDtCxKwKH99oiwGXqAYBADwDESBjZEjboj1Y723AQ+NHsKAvHJ7lkskE4QMfuCJzz/Y6ArFMPAAT6wTNYTgi//4UdLBmvwTupAGhZPxA7uophoBBBdEob+jyIXkmF9UBo/wKZNRWR5+iA6AAAAABJRU5ErkJggg==",
            dataviewIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEUAAAAxMTExMTEAAAAGBgZBQUELCwsPDw8AAAAJCQnSFNQKAAAACHRSTlMAFAj16Sf45zyP9YUAAABDSURBVCjPY5jR0dERwNgBB3QSyAALzEAIKAEBA5CEAQYyQLKxsXEAozEcDJTnBIGAAUjCADl+KXFxcQlgdIGDAfILAP34tiXIjrs4AAAAAElFTkSuQmCC";
            summaryDataviewIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADYElEQVR42r2XW4hNYRTH1xDjFg4yhuSeB7cHl0FJIZeGmVHjkss8SIrS5JVIxKukRiQPbgmFcZlGKB5cx4MZHlyGkVxGmYPGdWL8/621m+1r7zN75pxt1a9O+5zzrf/3feu2sySa9QRTwDgwCuSC3vac9gV8Au/AM1AD7tnzlJaV4rsEWA2WgqmgY0Sxnv0Gd8ApcBQkowroAjaDTaBHG52GWSPYA3aDH6kEDAIVokcdhz0C88GbIAH8fBdMjsm5Z/dBHmh2BcwAN2N27tlMz5dfwAJw+T8JyPd8+QUw6p+CfjE7/yiayklXwGgwDJwVzYQ4jBmwGLwET1wBhSAbPAeHwYQMO38I1oCR4Cc4HyTgBFgOLoJisF40YDq00+kfcAPsB2fAQnASrAgTcE40PY6D7aAW9AdzwHTR+sAdDAgQRWfv7QRZim+Bq+ADGGHrrTSfRUECFoFyZ0EWJZbSSlDvOOwFutvnr+Cz830OmAeWiRYfv+ACcMEVwD8wOLqGHOcLUC3abNh0GsyxmJA+ok2KET4eDA9Z57tosNe7AoaA2eCQpG5S6Rivdy24Bl65AgpsVzyJMtG7z6QxFjbYznla5a4ABuEB0XurAxvBOjA4TcevwUGwDwwFV2zd0Cxgsdgl2j6/iUb/XDBN9G5zWnHIHTJWbpszZkM30fa+RbTIFaUS4BlL5hHRLGCXbLbnnBHYtlm6s+0ZCwtLK9tsoz1j1HOK4kBTAvr61g4UwONhDgdNPg0mgtWs1o41aY7FhCTsupjzrKJ5dteucVJiLalzBTDoSkWnoTiNU9Fe0aD8R0C+7Y7HswN0yrDjJrBN9Jp5SpdcAYWmbpboxLsVLAGd03T8C5wGO0Un5+uipxwahKxypfanhJ0IU5PZEDUlGSOM/kpbM2mb4dHnSsQsYMCVmRBvpGb9Z6llM2JU+7OAWcNmxFLt9YWEOWYB8rf3QAHsdNUBu2HUVtmOvCx4K5oZ3ojN3GbED5SWLOCJTZLgrGI9qXEF0PgCsaotF9wOOyb6wiNBAhj5bEYlMTlnYWMzagoT4BknZEbtxAw5fiCaVRXuF621Xd4hSyl7wViJ/n7IuOFbEHsBS3lV2A/b0vfZA8aIBhl7AYPOm54ZjAxK9gIG6WNp6QkpLa7BI7L9BXBeviGH6pghAAAAAElFTkSuQmCC";
            chartDataviewIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACk0lEQVR42r2XT4jOQRjH540iB7aslIhQtG8pB+Xg4OagPTjoXRcHopBalpR/K1oHrazlIjcHf9oLRxc5KAclB7Zkd2v9K6FwEIXX59mZ2cZ4531n5vfbd+rb876/953n+cz8ZuZ5pqJatJWLO+dh1qDNRuvRUlQxf6mjt+gReoweoLGJD59+tvKtHCeh4F2YE2gDWh3oW/eev0AP0QUg3mQBEHiRCbwTdcQCezCf0RU0BMi3aACCr8KcR9vQ7MjAIZBf6Bo6C8THlgAm+F1UTRh1zGzcl9lsBDHt3Ez7VbS9YOAQyDA6DsT3EMAQZr/S015WcBfiBzoFwMX/AMxql23U4T4vGUDae1QF4us0gNnn19GOGQruQ5xTelH+tgBysNxRep/PVHAX4imqATBuAQ5h7XtpB4CshV0A3LYA97DdbQhuAaQNA9BrAV6rf8/2dkBIztgERF0A/pgfUgDqCf9t1F6htRYgx5l9l5IFo7Ke35/g66ZGXQBgDB01o0luAIxagNxXIGm3Zh3lttxFWCrATWxPUQD8LMesyAE4iL1svxcAOILpS/TxTgAk98upVC0IcBpzJnECRgRgDh8G0YGEWWgE0I/pT+gvrc+m42VKJ4mFkRBlAMg2rrkFiUzhSRVXkBQBsKO/hfa4APMxA5GvIhfABv+idC4Y9YtSqQtvoC3O40rAUS6AVMqX6HesoXPnTrAXzQ1A5AC4U99rK+TQxUTKtH1IipUl3s+VRAA31zxH3fSZbDa9LsgCzGG0FXU5M6IiAdwLyojSZfmkG6PllsHxLKWPWLkfbjS2U+k03BMAcEctC06K3sGmF5PYRqCpPlJMeM/9k1D2+RM00CxhlVaGGYDd6JnSt2PRS/8m5Le/NREmXnVuvFYAAAAASUVORK5CYII=";
            html += "<div style = 'padding-top: 5px; padding-bottom: 5px; background-color: #edecec;'>";
            html += "<img src = '" + backIcon + "' id = 'home_dashboard_report_action_back_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'back_action' data-report-group = '" + groupIndex + "' style = '" + style + "'/>";
            html += "<img src = '" + refreshIcon + "' id = 'home_dashboard_report_action_refresh_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'refresh_action' data-report-group = '" + groupIndex + "' style = '" + style + "'/>";
            html += "<img src = '" + closeIcon + "' id = 'home_dashboard_report_action_close_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'close_action' data-report-group = '" + groupIndex + "' style = '" + style + " float: right;'/>";
            html += "<img src = '" + fullscreenIcon + "' id = 'home_dashboard_report_action_fullscreen_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'fullscreen_action' data-report-group = '" + groupIndex + "' style = '" + style + " float: right;'/>";
            html += "<img src = '" + splitScreenIcon + "' id = 'home_dashboard_report_action_splitscreen_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'splitscreen_action' data-report-group = '" + groupIndex + "' style = '" + style + " float: right; display: none;'/>";
            html += "<img src = '" + dataviewIcon + "' id = 'home_dashboard_report_action_dataview_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'dataview_action' data-report-group = '" + groupIndex + "' style = '" + style + " opacity: 0.5; float: right;'/>";
            html += "<img src = '" + summaryDataviewIcon + "' id = 'home_dashboard_report_action_summary_dataview_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'summary_dataview_action' data-report-group = '" + groupIndex + "' style = '" + style + " float: right;'/>";
            html += "<img src = '" + chartDataviewIcon + "' id = 'home_dashboard_report_action_chart_dataview_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'chart_dataview_action' data-report-group = '" + groupIndex + "' style = '" + style + " float: right;'/>";
            html += "</div>";
            return html;
        },
        getReportWindowHtml: function (chartId, reportIndex) {
            var html = "";
            html += "<div id = 'home_dashboard_report_data_view_window_" + chartId + "'>";
            html += "<div id = 'home_dashboard_report_data_view_tab_" + chartId + "'>";
            html += "<ul>";
            html += "<li id = 'home_dashboard_report_data_view_tab_detail_" + chartId + "' class = 'k-state-active' data-widget-type = 'w_link' data-link-type = 'detailed_data_tab'>Details</li>";
            html += "<li id = 'home_dashboard_report_data_view_tab_img_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'img_view_tab'>Chart</li>";
            html += "<li id = 'home_dashboard_report_data_view_tab_summary_" + chartId + "'>Summary</li>";
            html += "</ul>";
            html += "<div><div id = 'home_dashboard_report_data_view_detail_grid_" + chartId + "'></div></div>";
            html += "<div>";
            if (home_dashboard.variable.custom.reportTypeList[reportIndex].export !== undefined && home_dashboard.variable.custom.reportTypeList[reportIndex].export.chartImage === "true") {
                html += "<div style = 'background: #eaeaec; padding: 5px; width: 770px;'>";
                html += "<button id = 'home_dashboard_report_data_view_export_img_" + chartId + "' data-widget-type = 'w_link' data-link-type = 'export_img' class = 'k-button'>Export Image</button>";
                html += "</div>";
            };
            html += "<div>";
            html += "<img id = 'home_dashboard_report_data_view_img_" + chartId + "' style = 'height:375px; width:780px;'/>";
            html += "</div>";
            html += "</div>";
            html += "<div><div id = 'home_dashboard_report_data_view_summary_grid_" + chartId + "'></div></div>";
            html += "</div>";
            html += "</div>";
            return html;
        },
        createReportGroups: function (data) {
            var groupIndex,
            groupFiltersIndex,
            listField = "",
            contentField = "";
            listField += "<ul>";
            for (groupIndex = 0; groupIndex < data.length; groupIndex++) {
                home_dashboard.variable.custom.groupTypeLink[groupIndex] = {};
                home_dashboard.variable.custom.reportLoadIndicator[groupIndex] = {};
                home_dashboard.variable.custom.groupTypeLink[groupIndex]["startCount"] = home_dashboard.variable.custom.reportTypeList.length;
                $.merge(home_dashboard.variable.custom.reportTypeList, data[groupIndex].reportList);
                home_dashboard.variable.custom.groupTypeLink[groupIndex]["endCount"] = home_dashboard.variable.custom.reportTypeList.length;
                listField += "<li id = 'home_dashboard_report_group_header_" + groupIndex + "' " + ((groupIndex === 0) ? ("class = 'k-state-active'") : ("")) + " data-widget-type = 'w_link' data-link-type = 'group_tab'>" + data[groupIndex].groupName + "</li>";
                contentField += "<div style = 'overflow-x: hidden; overflow-y: hidden;'><div id = 'home_dashboard_report_group_content_" + groupIndex + "'>";
                if (data[groupIndex].groupFilters !== undefined && data[groupIndex].groupFilters.length > 0) {
                    contentField += home_dashboard.customRequirementHandler.createGroupFilters(data[groupIndex].groupFilters, groupIndex);
                };
                contentField += home_dashboard.customRequirementHandler.getReportGroupContentHtml(groupIndex) + "</div></div>";
            };
            listField += "</ul>";
            $("#home_dashboard_report_group").append(listField + contentField);
            for (groupIndex = 0; groupIndex < data.length; groupIndex++) {
                if (data[groupIndex].groupFilters !== undefined && data[groupIndex].groupFilters.length > 0) {
                    home_dashboard.customRequirementHandler.initializeGroupFilters(data[groupIndex].groupFilters, groupIndex);
                };
            };
            $("#home_dashboard_report_group").kendoTabStrip({
                animation: false
            });
        },
        createGroupFilters: function (filterList, groupIndex) {
            var html = "",
            groupFiltersIndex;
            html += "<div style='margin-left: 0.6%; margin-top: 0.6%; margin-bottom: 0.6%; border: 1px solid; padding: 1%; border-radius: 10px; display: inline-flex; flex-wrap: wrap; width: 97.5%;' id='home_dashboard_report_group_filter_" + groupIndex + "'>";
            html += "<span style='padding-right: 1%; padding-bottom: 1%;'>";
            html += "<div><label style='font-weight:bold;'>" + "Chart" + "</label></div>";
            html += "<div><input style='width:300px;' id='home_dashboard_report_group_filter_" + groupIndex + "_" + "report_code_list_filter" + "' data-widget-type='" + "mDropdownlist" + "' /></div>";
            html += "</span>";
            for (groupFiltersIndex = 0; groupFiltersIndex < filterList.length; groupFiltersIndex++) {
                if (filterList[groupFiltersIndex].wType === "mDropdownlist") {
                    html += "<span style='padding-right: 1%; padding-bottom: 1%;'>";
                    html += "<div><label style='font-weight:bold;'>" + filterList[groupFiltersIndex].name + "</label></div>";
                    html += "<div><input style='width:" + ((filterList[groupFiltersIndex].width !== undefined) ? (filterList[groupFiltersIndex].width) : ("160")) + "px;' id='home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id + "' data-widget-type='" + filterList[groupFiltersIndex].wType + "' /></div>";
                    html += "</span>";
                };
            };
            html += "<span><div>&nbsp;</div><div><button id='home_dashboard_report_group_filter_refresh_" + groupIndex + "' class='k-button' data-widget-type = 'w_link' data-link-type = 'group_filter_refresh'>Refresh</button></div></span>";
            html += "</div>";
            return html;
        },
		createChartDataGridView: function (chartId){
			var gridHeight,
			gridColumnTemplate;
			if(parseInt($("#" + chartId).attr('data-drill-index')) <  Object.keys(home_dashboard.variable.custom.reportTypeList[chartId.replace("home_dashboard_chart_","")].drillOrder).length){
				gridColumnTemplate = "<span data-chart-id='" + chartId + "' data-widget-type='w_link' data-link-type='summary_dataview_drill_action' style='text-decoration: underline; color: blue; cursor: pointer;'>#: count # </span>";
			} else {
				gridColumnTemplate = "<span>#: count # </span>";
			};
			if (home_dashboard.variable.custom.initialLoadInd == true && home_dashboard.variable.custom.fullScreenInd == false) {
				gridHeight = 303;
			} else if (home_dashboard.variable.custom.initialLoadInd == false && home_dashboard.variable.custom.fullScreenInd == false) {
				gridHeight = 298;
			} else {
				gridHeight = 528;
			};
			$("#" + chartId + "_summary_data").remove();
			$("#" + chartId).after("<div id='" + chartId + "_summary_data'></div>");
			kendo.ui.progress($("#" + chartId + "_summary_data"), true);
			$("#" + chartId + "_summary_data").kendoGrid({
				dataSource: {
					data: $("#" + chartId).data("kendoChart").dataSource._pristineData
				},
				height: gridHeight,
				columns: [{
					title: "<center style='font-weight: bold;'>" + $("#" + chartId).data("kendoChart").options.title.text + "</center>",
					columns: [{
						field: "summary_by",
						title: $("#" + chartId).data("kendoChart").options.categoryAxis.title.text
					}, {
						field: "series_by",
						title: $("#" + chartId).data("kendoChart").options.series[0].title
					}, {
						field: "count",
						title: $("#" + chartId).data("kendoChart").options.valueAxis.title.text,
						template: gridColumnTemplate
					}]
				}],
				sortable: true,
				dataBound: function (e) {
					if ($("#" + chartId).data("kendoChart").options.series[0].title == "") {
						this.hideColumn("series_by");
					};
					if (this.dataSource.data().length == 0) {
                        $('<div style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;opacity: 0.2;font-size: 30px;font-family:times;"><p style="position: absolute; left: 32%; top: 50%;">No record found.</p></div>').appendTo("#" + this.element.attr("id"));
                    };
				}
			});
			$("#" + chartId + "_summary_data").data("kendoGrid").refresh();
			setTimeout(function () {
				kendo.ui.progress($("#" + chartId + "_summary_data"), false);
			}, 400);
		},
        initializeGroupFilters: function (filterList, groupIndex) {
            var groupFiltersIndex,
            reportCodeListDataSrc,
            reportCodeListCounter,
            reportCodeListFilter,
            reportCodeListIndex,
            reportCodeListChartArray,
            reportCodeListChartCounter,
            fullscreenIndex;
            for (groupFiltersIndex = 0; groupFiltersIndex < filterList.length; groupFiltersIndex++) {
                if (filterList[groupFiltersIndex].wType === "mDropdownlist") {
                    if (filterList[groupFiltersIndex].child_fields != undefined) {
                        $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).attr("data-child-ids", "home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].child_fields);
                    };
                    if (filterList[groupFiltersIndex].inputparam != undefined) {
                        $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).attr("data-inputparam", filterList[groupFiltersIndex].inputparam);
                    };
                    if (filterList[groupFiltersIndex].dataSrcType != undefined && filterList[groupFiltersIndex].dataSrcType == "dynamic") {
                        var optionLabelValue = {};
                        if (filterList[groupFiltersIndex].filterMode != undefined && filterList[groupFiltersIndex].filterMode == "true") {
                            optionLabelValue[filterList[groupFiltersIndex].textField] = "ALL";
                            optionLabelValue[filterList[groupFiltersIndex].valueField] = "";
                        } else {
                            optionLabelValue[filterList[groupFiltersIndex].textField] = "---Select---";
                            optionLabelValue[filterList[groupFiltersIndex].valueField] = "";
                        };
                        $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).kendoDropDownList({
                            dataSource: {
                                transport: {
                                    read: {
										url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=common_modules&serviceName=retrieve_listof_values_for_searchcondition&path=context/outputparam",
                                        dataType: "json",
                                        type: "POST",
                                        contentType: "application/json",
                                        async: false
                                    },
                                    parameterMap: function (data, type) {
                                        return mService.util.getTransportParameter({
                                            inputparam: {
                                                p_inputparam_xml: "'" + filterList[groupFiltersIndex].inputparam + "'"
                                            }
                                        });
                                    }
                                }
                            },
                            autoBind: true,
                            dataTextField: filterList[groupFiltersIndex].textField,
                            dataValueField: filterList[groupFiltersIndex].valueField,
                            optionLabel: optionLabelValue
                        });
                    } else {
                        $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).kendoDropDownList({
                            dataSource: filterList[groupFiltersIndex].dataSrc,
                            autoBind: true,
                            dataTextField: filterList[groupFiltersIndex].textField,
                            dataValueField: filterList[groupFiltersIndex].valueField
                        });
                    };
                    $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").bind("change", function (event) {
                        if (this.element.attr("data-child-ids") != undefined) {
                            if ($("#" + this.element.attr("id")).data("kendoDropDownList").value() != "") {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    if ($("#" + childFieldList[childFieldCounter]).attr("data-inputparam") != undefined) {
                                        var inputString = $("#" + childFieldList[childFieldCounter]).attr("data-inputparam");
                                        var inputStringXML = $.parseXML($("#" + childFieldList[childFieldCounter]).attr("data-inputparam"));
                                        if (inputStringXML.getElementsByTagName("search_field_1")[0] != undefined) {
                                            inputStringXML.getElementsByTagName("search_field_1")[0].innerHTML = this.value();
                                            inputString = (new XMLSerializer()).serializeToString(inputStringXML);
                                        } else {
                                            inputString = inputString.replace("</inputparam>", "<search_field_1>" + this.value() + "</search_field_1></inputparam>");
                                        }
                                        $("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").dataSource.transport.parameterMap = function (data, type) {
                                            return mService.util.getTransportParameter({
                                                inputparam: {
                                                    p_inputparam_xml: "'" + inputString + "'"
                                                }
                                            });
                                        };
                                        $("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").dataSource.read();
                                        if ($("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").dataSource.data().length != 0) {
                                            $("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").value("");
                                        }
                                        $("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").trigger("change");
                                    }
                                }
                            } else {
                                childFieldList = this.element.attr("data-child-ids").split(",");
                                for (childFieldCounter = 0; childFieldCounter < childFieldList.length; childFieldCounter++) {
                                    $("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").dataSource.data([]);
                                    if ($("#" + childFieldList[childFieldCounter]).attr("data-inputparam") != undefined) {
                                        var inputString = $("#" + childFieldList[childFieldCounter]).attr("data-inputparam");
                                        var inputStringXML = $.parseXML($("#" + childFieldList[childFieldCounter]).attr("data-inputparam"));
                                        if (inputStringXML.getElementsByTagName("search_field_1")[0] != undefined) {
                                            inputStringXML.getElementsByTagName("search_field_1")[0].innerHTML = this.value();
                                            inputString = (new XMLSerializer()).serializeToString(inputStringXML);
                                        } else {
                                            inputString = inputString.replace("</inputparam>", "<search_field_1>" + this.value() + "</search_field_1></inputparam>");
                                        };
                                        $("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").dataSource.transport.parameterMap = function (data, type) {
                                            return mService.util.getTransportParameter({
                                                inputparam: {
                                                    p_inputparam_xml: "'" + inputString + "'"
                                                }
                                            });
                                        };
                                        $("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").dataSource.read();
                                        if ($("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").dataSource.data().length != 0) {
                                            $("#" + childFieldList[childFieldCounter]).data("kendoDropDownList").value("");
                                        };
                                    };
                                };
                            };
                        };
                    });
                };
            };
			for (groupFiltersIndex = 0; groupFiltersIndex < filterList.length; groupFiltersIndex++) {
				if (filterList[groupFiltersIndex].wType === "mDropdownlist") {
					if (filterList[groupFiltersIndex].defaultValue != undefined) {
                        try {
                            $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").value(eval(filterList[groupFiltersIndex].defaultValue));
							$("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").trigger("change");
                        } catch (e) {
                            $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").value(filterList[groupFiltersIndex].defaultValue);
							$("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").trigger("change");
                        }
                    };
                    if (filterList[groupFiltersIndex].disable != undefined && filterList[groupFiltersIndex].disable == "true") {
                        $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").enable(false);
                    };
                    if (filterList[groupFiltersIndex].id == "report_company_location_filter") {
                        if (mService.user.profile.login.location_code != "NOLOC" && mService.user.profile.login.location_code != "HO") {
                            $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").value(mService.user.profile.login.location_code);
							$("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").trigger("change");
                            $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").enable(false);
                        }
                    };
                    if (filterList[groupFiltersIndex].id == "report_dealer_code_filter") {
                        if (mService.user.profile.login.dealer_code != undefined && mService.user.profile.login.dealer_code != "") {
                            $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").value(mService.user.profile.login.dealer_code);
							$("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").trigger("change");
                            $("#home_dashboard_report_group_filter_" + groupIndex + "_" + filterList[groupFiltersIndex].id).data("kendoDropDownList").enable(false);
                        }
                    };
				}; 
			};
            reportCodeListDataSrc = [];
            reportCodeListChartCounter = 0;
            reportCodeListChartArray = home_dashboard.variable.custom.reportGroupList.slice(0, groupIndex);
            for (var counter = 0; counter < reportCodeListChartArray.length; counter++) {
                reportCodeListChartCounter += reportCodeListChartArray[counter].reportList.length;
            };
            for (reportCodeListCounter = 0; reportCodeListCounter < home_dashboard.variable.custom.reportGroupList[groupIndex].reportList.length; reportCodeListCounter++) {
                reportCodeListDataSrc.push({
                    "code": home_dashboard.variable.custom.reportGroupList[groupIndex].reportList[reportCodeListCounter].reportCode,
                    "description": (home_dashboard.variable.custom.reportGroupList[groupIndex].reportList[reportCodeListCounter].reportNameTemplate !== undefined) ? (home_dashboard.variable.custom.reportGroupList[groupIndex].reportList[reportCodeListCounter].reportNameTemplate) : (home_dashboard.variable.custom.reportGroupList[groupIndex].reportList[reportCodeListCounter].reportName),
                    "report_id": reportCodeListCounter + reportCodeListChartCounter
                });
            };
            $("#home_dashboard_report_group_filter_" + groupIndex + "_" + "report_code_list_filter").kendoDropDownList({
                dataSource: reportCodeListDataSrc,
                autoBind: true,
                dataTextField: "description",
                dataValueField: "code",
                optionLabel: {
                    description: "---Select---",
                    code: ""
                }
            });
            $("#home_dashboard_report_group_filter_" + groupIndex + "_" + "report_code_list_filter").data("kendoDropDownList").bind("change", function (event) {
                if ((this.dataSource.data()[this.selectedIndex - 1] != undefined) && (this.dataSource.data()[this.selectedIndex - 1].report_id != undefined)) {
                    fullscreenIndex = this.dataSource.data()[this.selectedIndex - 1].report_id;
                    if ($("#home_dashboard_report_action_fullscreen_" + fullscreenIndex).get()[0] != undefined) {
                        home_dashboard.linkEventHandler.fullscreen_action_link_click($("#home_dashboard_report_action_fullscreen_" + fullscreenIndex).get()[0], "click");
                        home_dashboard.customRequirementHandler.createInputparam(home_dashboard.variable.custom.activeGroupIndex);
                    };
                };
            });
            reportCodeListFilter = $("#home_dashboard_report_group_filter_" + groupIndex + "_" + "report_code_list_filter").data("kendoDropDownList");
            for (reportCodeListIndex = 0; reportCodeListIndex < reportCodeListFilter.dataSource.data().length; reportCodeListIndex++) {
                reportCodeListFilter.dataSource.data()[reportCodeListIndex].description = home_dashboard.customRequirementHandler.getReportName(reportCodeListFilter.dataSource.data()[reportCodeListIndex].description);
            };
            reportCodeListFilter.refresh();
        },
        getReportBookmarkHtml: function (chartId, reportIndex, drillIndex, splitIndex, groupIndex) {
            var html = "";
            html += "<div style = 'border: 1px solid; height:335px; width:48.2%; display: inline-block; margin: 0.6%; position:relative;' id = 'home_dashboard_bookmark_" + chartId + "' data-mreport-role = 'bookmark'>";
            html += "<div id = 'home_dashboard_report_data_view_" + chartId + "'></div>";
            html += "<table style = 'table-layout:fixed; width: 100%;'><tbody>";
            html += "<tr><td style = 'height: 30px; vertical-align: middle;'>" + home_dashboard.customRequirementHandler.getReportActionBarHtml(chartId, groupIndex) + "</td></tr>";
            html += "<tr><td>";
            html += "<div style = 'width:100%; height: 298px;' data-report-index = '" + reportIndex + "' data-drill-index = '" + drillIndex + "' data-split-index = '" + splitIndex + "' id = 'home_dashboard_chart_" + chartId + "' data-mreport-role = 'chart'></div>";
            html += "</td></tr>";
            html += "</tbody></table>";
            html += "</div>";
            return html;
        },
        getReportGroupContentHtml: function (groupIndex) {
            var html = "",
            prevIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAATlBMVEUAAAAICAhra2tJSUlxcXEsLCwxMTEcHBwfHx8aGhpWVlZxcXFjY2MzMzNzc3MRERFra2txcXFxcXFra2seHh4YGBg2NjZubm5ISEgAAACyjEeWAAAAGXRSTlMA+1R2GsfK4tvrdhR2oyn0TwgOSt3yzXaHU2eHhwAAAehJREFUeNrs3VFSwkAQRdEWNQKiBjRi73+j8uUGmKmyq8/bwbmpzOdM/Md9fuf4bdeoMv5Mfn7+of5zFJnvn7f5/vwj/adC/gd+/rE7FPIv/Pz8Xf0rPz8/Pz8/P/8Y/yWKjJ+fn5+/p383xX/kLzJ+fn5+fv6W/ucJ/hf+KLJJ/tcost3Cz8/f1t/9/OPn5+fn5+fn5+e/2//IX2T8/Pz8/PwD/U9RZPz8/Pz8/Pz8/AP2xR9Fxs/Pz8/Pz8/Pz8/Pz3/H9vxRZPz8/Pz8/PwN/Qs/P39bf/fzj7+3v/v/z8/Pz8/P39C/8vPz8/Pz8/Pzt/LPef/up4w/rltm6wDvbx+Z2fgXUEABBRRQQAEFFFBAAQUUUEABBRRQQAEFFFBAAQUUUEABBRRQQAEFFFBAgb8CbS9SUkABBRS4FdgymxfY975Uz7WCCiiggAIKKKCAZ3YUUEABBRRQQAEFFPD0tgIKKKCAAgooMKvAUQEFFFBAAQUUUEABBSoVWBRQQIH2BZyEcwpcoswUmHIOHBRQQAEFFFBAAQUqFVinFDgpoIACCiiggALnKDMFFFBAAQV+26UDEgBAGACCdpAp61/UEm4wuI9wPAECmwABAgQOgQKBIDBLIJPA9+ISILDm5AEPECBAoFPgAc7AOAPzz7VHAAAAAElFTkSuQmCC",
            nextIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAbFBMVEUAAABxcXEaGhokJCQRERFaWlpqamoJCQlHR0cpKSlra2stLS0iIiJISEhsbGxzc3MzMzNWVlZwcHBra2s0NDQiIiJQUFBaWloXFxdFRUVaWlovLy8jIyNgYGBZWVlnZ2cjIyNaWloAAAAICAikQRKjAAAAInRSTlMAD+nj9XZU+YzoI8jPXU0qo1cHGszWkHHvYGzw3ZaUmu5mC9kZGgAAAdBJREFUeNrs3ElawlAQhdGKBETFBuyin9gk+9+jG2DGe4Oizt3Bf+ZVcXI/49x8y8tD5BkBAuUFDgQIECBAgAABAgSOBKoLDAQIECBAgAABAgQI9BC4JpBK4JsAgYlAB4E7AgQ2kWYECBAgQIAAgWcCBN4IECBAgAABAlcECBAgQIAAAQIECBAgQIAAAQIECFQX2BIgUF3glgABAgQIECBAgAABAgQIECDQRWC3fYws6yKwTE/FBeaRAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJBKYJrbbzxGlg3r3/b9y81fJNnwsVs69H9GkunXr19/4/73SDL9+vXr169fv379+vXrP7N/HUmmX3/p/nv9+vXrb9m/0p9k+vXr169fv379+vXr169fv379+vXr169fv379l9f/ql+/fv369evXr1+/fv01+vf69evXr1+/fv369evXX+T+qXz/l379+vXr16+/2v8X/fr169evv2D/Yb/Sr1+/fv0F///r169ff9n+jf7/9u6YCAAQBoJgFGCAhsG/SEykebLnYBXcbY+/QuLn7/dv/pD4h/vX4e/3x/xP+Wf7i5+fn5+f/2v/A/O7PevTimbWAAAAAElFTkSuQmCC",
            reportCount;
            html += "<div>";
            html += "<table width='100%' style='table-layout:fixed; border-collapse:collapse; border:0px solid green;'>";
            html += "<tr>";
            html += "<td align = 'left' id = 'home_dashboard_prev_view_td" + groupIndex + "' colspan='1' style='display:none; vertical-align:middle;'>";
            html += "<img data-widget-type = 'w_link' data-link-type = 'prev_view' id = 'home_dashboard_prev_view_" + groupIndex + "' src='" + prevIcon + "' style='height:35px; opacity:0.3; cursor: pointer;'/>";
            html += "</td>";
            html += "<td colspan='25'>";
            html += "<div id = 'home_dashboard_content_" + groupIndex + "'>";
            for (reportCount = home_dashboard.variable.custom.groupTypeLink[groupIndex].startCount; reportCount < home_dashboard.variable.custom.groupTypeLink[groupIndex].endCount; reportCount++) {
                html += home_dashboard.customRequirementHandler.getReportBookmarkHtml(reportCount, reportCount, "0", "0", groupIndex);
            };
            html += "</div>";
            html += "</td>";
            html += "<td align = 'right' id = 'home_dashboard_next_view_td" + groupIndex + "' colspan='1' style='display:none; vertical-align:middle; '>";
            html += "<img data-widget-type = 'w_link' data-link-type = 'next_view' id = 'home_dashboard_next_view_" + groupIndex + "' src='" + nextIcon + "' style='height:35px; opacity:0.3; cursor: pointer;'/>";
            html += "</td>";
            html += "</tr>";
            html += "</table>";
            html += "</div>";
            return html;
        },
        template: function (amount, ind) {
            if (amount == undefined) {
                var result = "";
                return result;
            } else {
                if (amount.toString().indexOf(".") > 0) {
                    amount = amount.toFixed(2);
                } else {
                    amount = amount.toString();
                };
                if (ind == true) {
                    var currency,
                    lastThreeDigits,
                    remainingDigits,
                    result,
                    decimalValue = "";
                    if (amount.indexOf(".") > 0) {
                        decimalValue = amount.substring(amount.indexOf("."), amount.length);
                    };
                    currency = (Math.floor(amount)).toString();
                    lastThreeDigits = currency.substring(currency.length - 3);
                    remainingDigits = currency.substring(0, currency.length - 3);
                    if (remainingDigits != "") {
                        lastThreeDigits = "," + lastThreeDigits;
                    };
                    result = remainingDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits + decimalValue;
                    return result.replace(/\s+/g, " ");
                } else {
                    return amount;
                };
            };
        },
        chartResize: function (groupIndex) {
            var reportCount,
            chartList,
            resizeHeight;
            if (home_dashboard.variable.custom.initialLoadInd == true && home_dashboard.variable.custom.fullScreenInd == false) {
                resizeHeight = 303;
            } else if (home_dashboard.variable.custom.initialLoadInd == false && home_dashboard.variable.custom.fullScreenInd == false) {
                resizeHeight = 298;
            } else {
                resizeHeight = 528;
            };
            if (groupIndex === undefined) {
                for (reportCount = 0; reportCount < home_dashboard.variable.custom.chartId.length; reportCount++) {
                    if ($("#" + home_dashboard.variable.custom.chartId[reportCount]).data("kendoChart") != undefined) {
                        $("#" + home_dashboard.variable.custom.chartId[reportCount]).data("kendoChart").redraw();
                        if ($("#" + home_dashboard.variable.custom.chartId[reportCount] + "_summary_data").data("kendoGrid") != undefined) {
                            $("#" + home_dashboard.variable.custom.chartId[reportCount] + "_summary_data").css("height", resizeHeight);
                            $("#" + home_dashboard.variable.custom.chartId[reportCount] + "_summary_data").data("kendoGrid").resize();
                        };
                    };
                };
            } else {
                chartList = $("#home_dashboard_content_" + groupIndex + " [data-mreport-role = 'chart']");
                for (reportCount = 0; reportCount < chartList.length; reportCount++) {
                    if ($(chartList[reportCount]).data("kendoChart") != undefined) {
                        $(chartList[reportCount]).data("kendoChart").redraw();
                    };
                    if ($("#" + chartList[reportCount].id + "_summary_data").data("kendoGrid") != undefined) {
                        $("#" + chartList[reportCount].id + "_summary_data").css("height", resizeHeight);
                        $("#" + chartList[reportCount].id + "_summary_data").data("kendoGrid").resize();
                    };
                }
            };
        },
        createInputparam: function (groupIndex) {
            var activeReports,
            startCount,
            endCount;
            activeReports = home_dashboard.customRequirementHandler.reportsInView();
            if (activeReports.length > 0) {
                startCount = parseInt($(activeReports[0]).attr("id").replace("home_dashboard_bookmark_", ""));
                endCount = parseInt($(activeReports[activeReports.length - 1]).attr("id").replace("home_dashboard_bookmark_", ""));
                for (var index = startCount; index <= endCount; index++) {
                    if (home_dashboard.variable.custom.reportLoadIndicator[groupIndex][index] === undefined) {
                        var inputXML = $.parseXML("<inputparam><summary_by>" + mService.util.getXmlString(home_dashboard.variable.custom.reportTypeList[index].summaryValue) + "</summary_by><series_by>" + mService.util.getXmlString(home_dashboard.variable.custom.reportTypeList[index].seriesValue) + "</series_by><employee_id>" + mService.util.getXmlString(mService.user.profile.login.employee_id) + "</employee_id>" + home_dashboard.customRequirementHandler.getGroupFilterValue("xml", groupIndex) + "</inputparam>");
                        var inputString = home_dashboard.variable.custom.reportTypeList[index].input;
                        var inputData = inputXML.getElementsByTagName("inputparam")[0];
                        var key,
                        elem;
                        for (key in inputString) {
                            if (inputString.hasOwnProperty(key)) {
                                elem = inputXML.createElement(key);
                                $(elem).text(inputString[key]);
                                inputData.appendChild(elem)
                            }
                        };
                        home_dashboard.variable.custom.reportTypeList[index].inputParam = (new XMLSerializer()).serializeToString(inputData);
                        home_dashboard.variable.custom.reportTypeList[index].chartId = "home_dashboard_chart_" + index;
                        home_dashboard.customRequirementHandler.createDatasource(home_dashboard.variable.custom.reportTypeList[index], home_dashboard.variable.custom.reportTypeList[index].chartId, true);
                        home_dashboard.variable.custom.reportLoadIndicator[groupIndex][index] = true;
                    };
                };
            };
        },
        getChartData: function (iObj, response) {
            var chartData,
            data;
            data = $.grep(response, function (e, i) {
                    e.count = parseFloat(e.count);
                    return ((iObj.acceptZero === "true") ? (e) : (e.count !== 0));
                });
            if (iObj.chartType === "pie") {
                chartData = new kendo.data.DataSource({
                        data: data
                    });
            } else {
                chartData = new kendo.data.DataSource({
                        data: data,
                        group: {
                            field: "series_by",
                        },
                    });
            };
            chartData.read();
            return chartData;
        },
        createDatasource: function (iObj, chartId, asyncInd) {
            var chartdataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            type: "POST",
                            async: asyncInd,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
							url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=common_modules&serviceName=report_information_for_custom_report_builder&path=context/outputparam_detail",
                            complete: function (data, textstatus) {
                                var responseData = JSON.parse(data.responseText),
                                chartData = home_dashboard.customRequirementHandler.getChartData(iObj, responseData);
                                if (iObj.split == "true") {
                                    iObj.splitArray = [];
                                    if ($("#" + chartId).attr("data-drill-index") != 0) {
                                        $("#" + chartId).data("kendoChart").destroy();
                                        $("#" + chartId).empty();
                                        $("#backImage_" + chartId).remove();
                                        $("#refreshImage_" + chartId).remove();
                                        $("#detailImage_" + chartId).remove();
                                        $("#detailWindow_" + chartId).remove();
                                        $("#closeImage_" + chartId).remove();
                                    };
                                    var bookmarkId = $("#" + chartId).parent().attr("id");
                                    if (home_dashboard.variable.custom.viewMode == true) {
                                        var divClass = "tile_div";
                                        var tileClass = "tile";
                                    } else {
                                        var divClass = "tile_div tile_div_tog";
                                        var tileClass = "tile tile_div_tog";
                                    };
                                    var sorted = {};
                                    for (var i = 0, max = responseData.length; i < max; i++) {
                                        if (sorted[responseData[i].summary_by] == undefined) {
                                            sorted[responseData[i].summary_by] = [];
                                        };
                                        sorted[responseData[i].summary_by].push(responseData[i]);
                                    };
                                    var sortedArray = [];
                                    for (key in sorted) {
                                        sortedArray.push(key);
                                    };
                                    for (i = 0; i < sortedArray.length; i++) {
                                        $("#" + chartId).parent().after("<div class='" + divClass + "' id = '" + bookmarkId + "_" + i + "'><div  class='" + tileClass + "' data-report-index= '" + $("#" + chartId).attr("data-report-index") + "' data-drill-index= '" + $("#" + chartId).attr("data-drill-index") + "' data-split-index= '" + (i + 1) + "' id='" + chartId + "_" + i + "'></div><img src='../../common/images/back_image.png' class='back_static' id='backImage_" + chartId + "_" + i + "' data-widget-type = 'w_link' data-link-type = 'previous_data'/><img src='../../common/images/refresh_image.png' class='refresh_static' id='refreshImage_" + chartId + "_" + i + "' data-widget-type = 'w_link' data-link-type = 'refresh_data'/><img src='../../common/images/view_details_image.png' class='detail_static' id='detailImage_" + chartId + "_" + i + "' data-widget-type = 'w_link' data-link-type = 'view_data'/><img src='../../common/images/close_image.png' class='close_static' id='closeImage_" + chartId + "_" + i + "' data-widget-type = 'w_link' data-link-type = 'destroy_data'/><div id='detailWindow_" + chartId + "_" + i + "'></div></div>");
                                        iObj.splitArray[i] = chartId + "_" + i;
                                        home_dashboard.customRequirementHandler.drawChart(iObj, iObj.splitArray[i]);
                                        var dataSource = new kendo.data.DataSource({
                                                data: sorted[sortedArray[i]],
                                                group: {
                                                    field: "series_by",
                                                }
                                            });
                                        $("#" + iObj.splitArray[i]).data("kendoChart").setDataSource(dataSource);
                                        $("#" + iObj.splitArray[i]).data("kendoChart").options.title.text = $("#" + iObj.splitArray[i]).data("kendoChart").options.title.text + " " + $("#" + iObj.splitArray[i]).data("kendoChart").options.categoryAxis.categories[0];
                                        $("#" + iObj.splitArray[i]).css("position", "absolute");
                                        $("#" + iObj.splitArray[i]).data("kendoChart").refresh();
                                        var currentValue = "r" + $("#" + iObj.splitArray[i]).attr("data-report-index") + "s" + $("#" + iObj.splitArray[i]).attr("data-split-index") + "d" + $("#" + iObj.splitArray[i]).attr("data-drill-index");
                                        home_dashboard.variable.custom.chartTitle[currentValue] = $("#" + iObj.splitArray[i]).data("kendoChart").options.title.text;
                                    };
                                    $("#" + chartId).parent().remove();
                                } else if (iObj.split == "false") {
                                    var sorted = {};
                                    for (var i = 0, max = responseData.length; i < max; i++) {
                                        if (sorted[responseData[i].summary_by] == undefined) {
                                            sorted[responseData[i].summary_by] = [];
                                        };
                                        sorted[responseData[i].summary_by].push(responseData[i]);
                                    };
                                    var sortedArray = [];
                                    for (key in sorted) {
                                        sortedArray.push(key);
                                    };
                                    chartData.read();
                                    var dataSource = new kendo.data.DataSource({
                                            data: sorted[sortedArray[parseInt($("#" + chartId).attr("data-split-index")) - 1]],
                                            group: {
                                                field: "series_by",
                                            }
                                        });
                                    home_dashboard.customRequirementHandler.drawChart(iObj, chartId);
                                    $("#" + chartId).data("kendoChart").setDataSource(dataSource);
                                    $("#" + chartId).css("position", "absolute");
                                    $("#" + chartId).data("kendoChart").refresh();
                                } else {
                                    home_dashboard.customRequirementHandler.drawChart(iObj, chartId);
                                    $("#" + chartId).data("kendoChart").setDataSource(chartData);
                                    $("#" + chartId).css("position", "absolute");
                                    $("#" + chartId).data("kendoChart").refresh();
                                };
                                if ($("#" + chartId).attr("data-split-index") == 0) {
                                    $("#" + chartId).css("position", "absolute");
                                };
                                if ($("#" + chartId).data("kendoChart").options.series != undefined && $("#" + chartId).data("kendoChart").options.series[0] != undefined && $("#" + chartId).data("kendoChart").options.series[0].stack == true) {
                                    if ($("#" + chartId).data("kendoChart").options.categoryAxis["categories"] != undefined && $("#" + chartId).data("kendoChart").options.categoryAxis["categories"].length != undefined) {
                                        for (var incrementer = 0; incrementer < $("#" + chartId).data("kendoChart").options.categoryAxis["categories"].length; incrementer++) {
                                            for (var nextCounter = 0; nextCounter < $("#" + chartId).data("kendoChart").options.series.length; nextCounter++) {
                                                var temp = $.grep($("#" + chartId).data("kendoChart").options.series[nextCounter].data, function (data, index) {
                                                        return data.summary_by == $("#" + chartId).data("kendoChart").options.categoryAxis["categories"][incrementer];
                                                    });
                                                if (temp.length == 0) {
                                                    $("#" + chartId).data("kendoChart").options.series[nextCounter].data.push({
                                                        "summary_by": $("#" + chartId).data("kendoChart").options.categoryAxis["categories"][incrementer],
                                                        "summary_name": $("#" + chartId).data("kendoChart").options.categoryAxis["categories"][incrementer],
                                                        "series_by": $("#" + chartId).data("kendoChart").options.series[nextCounter].data[0].series_by,
                                                        "series_name": $("#" + chartId).data("kendoChart").options.series[nextCounter].data[0].series_by,
                                                        "count": 0
                                                    });
                                                };
                                            };
                                        };
                                    };
                                    $("#" + chartId).data("kendoChart").options.series[$("#" + chartId).data("kendoChart").options.series.length - 1].labels = {
                                        template: "#= home_dashboard.customRequirementHandler.template(stackValue," + iObj.format + ") #",
                                        visible: true
                                    }
                                    $("#" + chartId).data("kendoChart").redraw();
                                };
                                if ($("#" + chartId).data("kendoChart").dataSource.data().length != 0) {
                                    var thirdDimensionArray = [];
                                    for (var counter = 0; counter < $("#" + chartId).data("kendoChart").dataSource.data().length; counter++) {
                                        if ($("#" + chartId).data("kendoChart").dataSource.data()[counter]["3d_count"] !== undefined) {
                                            thirdDimensionArray.push($("#" + chartId).data("kendoChart").dataSource.data()[counter]["3d_count"]);
                                        }
                                    };
                                    if (thirdDimensionArray.length != 0) {
                                        $("#" + chartId).data("kendoChart").options.series.push({
                                            type: "line",
                                            name: ($("#" + chartId).data("kendoChart").dataSource.data()[0]["3d_series_name"] !== undefined) ? ($("#" + chartId).data("kendoChart").dataSource.data()[0]["3d_series_name"]) : (""),
                                            data: thirdDimensionArray
                                        });
                                        $("#" + chartId).data("kendoChart").refresh();
                                    };
                                };
								if(iObj.defaultDisplay != undefined && iObj.defaultDisplay == "data"){
									home_dashboard.customRequirementHandler.createChartDataGridView(chartId);
								};
                                setTimeout(function () {
                                    kendo.ui.progress($("#" + chartId), false);
                                }, 400);
                            }
                        },
                        parameterMap: function (options, operation) {
                            return mService.util.getTransportParameter({
                                inputparam: {
                                    p_report_code: iObj.reportCode,
                                    p_inputparam_xml: iObj.inputParam
                                }
                            });
                        }
                    }
                });
            chartdataSource.read();
            kendo.ui.progress($("#" + chartId), true);
        },
        drawChart: function (iObj, chartId) {
            var seriesDefault,
            valueDefault,
            plotMargin;
            if (iObj.stack == "true") {
                seriesDefault = false;
                valueDefault = true;
            } else {
                seriesDefault = true;
                valueDefault = false;
            };
            if (iObj.chartType == "funnel") {
                plotMargin = 70;
            } else {
                plotMargin = 20;
            };
            if (iObj.reportNameTemplate !== undefined) {
                iObj.reportName = home_dashboard.customRequirementHandler.getReportName(iObj.reportNameTemplate);
            };
            $("#" + chartId).kendoChart({
                title: {
                    text: iObj.reportName.replace(/([\w\s\.()*-_!#$%^&=+'→]{40,}?)\s?\b/g, "$1\n"),
                    font: "18px Arial"
                },
                legend: {
                    visible: true,
                    position: "right",
                    offsetY: 20,
                    height: 200,
                    labels: {
                        font: "11px Arial"
                    }
                },
                seriesDefaults: {
                    labels: {
                        visible: seriesDefault,
                        template: "#= home_dashboard.customRequirementHandler.template(value," + iObj.format + ") #"
                    },
                },
                seriesColors: eval(iObj.color),
                series: [{
                        type: iObj.chartType,
                        title: iObj.seriesName,
                        stack: eval(iObj.stack),
                        categoryField: "summary_by",
                        field: "count",
                        startAngle: 100
                    }
                ],
                valueAxis: {
                    labels: {
                        visible: valueDefault
                    },
                    title: {
                        text: iObj.uom,
                        font: "12px Arial"
                    },
                    majorGridLines: {
                        visible: valueDefault
                    },
                    min: 0
                },
                plotArea: {
                    margin: {
                        top: 20,
                        left: plotMargin,
                        right: plotMargin,
                        bottom: 20
                    }
                },
                categoryAxis: {
                    majorGridLines: {
                        visible: false
                    },
                    title: {
                        text: iObj.summaryName,
                        visible: false
                    },
                    labels: {
                        rotation: "auto",
                        font: "12px Arial",
                        template: function (e) {
                            return e.value.split(/[\s,-.]/).join("\n");
                        }
                    }
                },
                tooltip: {
                    visible: true,
                    template: "# if(value == undefined) {# ${series.name} : 0 #} else if(series.name == undefined || series.name == '') {# ${category}: ${value} # } else  {# ${series.name}: ${value} # }#"
                },
                pannable: {
                    lock: "y"
                },
                zoomable: {
                    mousewheel: {
                        lock: "y"
                    },
                    selection: {
                        lock: "y"
                    }
                },
                dataBound: function (e) {
                    if (this.dataSource.data().length == 0) {
                        var emptyData = this;
                        emptyData.options.valueAxis.visible = false;
                        emptyData.options.categoryAxis.visible = false;
						emptyData.options.valueAxis.majorGridLines.visible = false;
                        $('<div style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;opacity: 0.2;font-size: 30px;font-family:times;"><p style="position: absolute; left: 32%; top: 50%;">No record found.</p></div>').appendTo("#" + emptyData.element.attr("id"));
                    } else {
                        var negativeData = $.grep(this.dataSource.data(), function (e, i) {
                                return e.count < 0;
                            });
                        if (negativeData.length != 0) {
                            function findMin(array) {
                                var min = array[0].count;
                                for (var index = 1; index < array.length; index++) {
                                    var nextValue = array[index].count;
                                    min = (nextValue < min) ? nextValue : min;
                                }
                                min = min - 20;
                                return min;
                            };
                            e.sender.options.valueAxis.min = findMin(negativeData);
                        } else {
                            e.sender.options.valueAxis.min = 0;
                        };
                        var sortArray = [];
                        e.sender.dataSource.data().forEach(function (e) {
                            if (sortArray.indexOf(e.summary_by) === -1) {
                                sortArray.push(e.summary_by);
                            };
                        });
                        var axis = e.sender.options.categoryAxis;
                        axis.categories = sortArray;
                    };
                },
                seriesClick: function (e) {
                    var reportIndex = e.sender.element[0].getAttribute("data-report-index");
                    var currentObject = home_dashboard.variable.custom.reportTypeList[reportIndex];
                    if (currentObject.reportType == "drill") {
                        var series = e;
                        var chartId = e.sender.element[0].id;
                        var drillIndex = e.sender.element[0].getAttribute("data-drill-index");
                        var splitIndex = e.sender.element[0].getAttribute("data-split-index");
                        var drillObject = home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()];
                        if (drillObject != undefined) {
                            home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].reportCode = home_dashboard.variable.custom.reportTypeList[reportIndex].reportCode;
                            home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].reportName = "";
                            if (home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].reportName == undefined || home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].reportName == "") {
                                var titleValue = "r" + reportIndex + "s" + splitIndex + "d" + drillIndex;
                                if ((series.dataItem.series_name != "") && (home_dashboard.variable.custom.reportTypeList[reportIndex].stack != "true")) {
                                    home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].reportName = home_dashboard.variable.custom.chartTitle[titleValue] + " → " + series.dataItem.summary_name + " → " + series.dataItem.series_name;
                                } else {
                                    home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].reportName = home_dashboard.variable.custom.chartTitle[titleValue] + " → " + series.dataItem.summary_name;
                                }
                            };
                            if (drillIndex == "0") {
                                var drillValue = $.parseXML(home_dashboard.variable.custom.reportTypeList[reportIndex].inputParam);
                                drillValue.getElementsByTagName("summary_by")[0].innerHTML = mService.util.getXmlString(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].summaryValue);
                                drillValue.getElementsByTagName("series_by")[0].innerHTML = mService.util.getXmlString(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].seriesValue);
                                if (drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].summaryValue).length == 0) {
                                    if (home_dashboard.variable.custom.reportTypeList[reportIndex].summaryValue != "") {
                                        newElem = drillValue.createElement(home_dashboard.variable.custom.reportTypeList[reportIndex].summaryValue);
                                        drillValue.getElementsByTagName("inputparam")[0].appendChild(newElem);
                                        drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].summaryValue)[0].innerHTML = mService.util.getXmlString(series.dataItem.summary_by);
                                    }
                                } else {
                                    drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].summaryValue)[0].innerHTML = mService.util.getXmlString(series.dataItem.summary_by);
                                };
                                if (drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].seriesValue).length == 0) {
                                    if (home_dashboard.variable.custom.reportTypeList[reportIndex].seriesValue != "") {
                                        newElem = drillValue.createElement(home_dashboard.variable.custom.reportTypeList[reportIndex].seriesValue);
                                        drillValue.getElementsByTagName("inputparam")[0].appendChild(newElem);
                                        drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].seriesValue)[0].innerHTML = mService.util.getXmlString(series.dataItem.series_by);
                                    }
                                } else {
                                    drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].seriesValue)[0].innerHTML = mService.util.getXmlString(series.dataItem.series_by);
                                }
                            } else {
                                var drillValue = $.parseXML(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].inputParam);
                                drillValue.getElementsByTagName("summary_by")[0].innerHTML = mService.util.getXmlString(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].summaryValue);
                                drillValue.getElementsByTagName("series_by")[0].innerHTML = mService.util.getXmlString(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].seriesValue);
                                if (drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].summaryValue).length == 0) {
                                    if (home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].summaryValue != "") {
                                        newElem = drillValue.createElement(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].summaryValue);
                                        drillValue.getElementsByTagName("inputparam")[0].appendChild(newElem);
                                        drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].summaryValue)[0].innerHTML = mService.util.getXmlString(series.dataItem.summary_by);
                                    };
                                } else {
                                    drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].summaryValue)[0].innerHTML = mService.util.getXmlString(series.dataItem.summary_by);
                                };
                                if (drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].seriesValue).length == 0) {
                                    if (home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].seriesValue != "") {
                                        newElem = drillValue.createElement(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].seriesValue);
                                        drillValue.getElementsByTagName("inputparam")[0].appendChild(newElem);
                                        drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].seriesValue)[0].innerHTML = mService.util.getXmlString(series.dataItem.series_by);
                                    };
                                } else {
                                    drillValue.getElementsByTagName(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[drillIndex].seriesValue)[0].innerHTML = mService.util.getXmlString(series.dataItem.series_by);
                                };
                            };
                            var inputXML = $.parseXML(new XMLSerializer().serializeToString(drillValue));
                            var inputString = home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].input;
                            var inputData = inputXML.getElementsByTagName("inputparam")[0];
                            var key,
                            elem;
                            for (key in inputString) {
                                if (inputString.hasOwnProperty(key)) {
                                    elem = inputXML.createElement(key);
                                    $(elem).text(inputString[key]);
                                    inputData.appendChild(elem)
                                }
                            };
                            home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()].inputParam = (new XMLSerializer()).serializeToString(inputData);
                            $("#" + chartId).attr("data-drill-index", (parseInt(drillIndex) + 1).toString());
                            home_dashboard.customRequirementHandler.createDatasource(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex) + 1).toString()], chartId, false);
                        };
                        if ((drillValue != undefined) && ($("#home_dashboard_report_group_filter_" + home_dashboard.variable.custom.activeGroupIndex + "_report_" + drillValue.getElementsByTagName("summary_by")[0].innerHTML + "_filter").data("kendoDropDownList") != undefined) && ($("#home_dashboard_report_group_filter_" + home_dashboard.variable.custom.activeGroupIndex + "_report_" + drillValue.getElementsByTagName("summary_by")[0].innerHTML + "_filter").data("kendoDropDownList").value() != "")) {
                            if ($("#" + chartId).data("kendoChart").options.series[0] != undefined && $("#" + chartId).data("kendoChart").options.series[0].data != undefined) {
                                for (var index = 0; index < $("#" + chartId).data("kendoChart").options.series[0].data.length; index++) {
                                    if ($("#" + chartId).data("kendoChart").options.series[0].data[index].summary_by == $("#home_dashboard_report_group_filter_" + home_dashboard.variable.custom.activeGroupIndex + "_report_" + drillValue.getElementsByTagName("summary_by")[0].innerHTML + "_filter").data("kendoDropDownList").value()) {
                                        $("#" + chartId).data("kendoChart").options.seriesClick({
                                            dataItem: $("#" + chartId).data("kendoChart").options.series[0].data[index],
                                            sender: $("#" + chartId).data("kendoChart")
                                        });
                                    };
                                };
                            };
                        };
                    };
                }
            }).data("kendoChart");
            var currentValue = "r" + $("#" + chartId).attr("data-report-index") + "s" + $("#" + chartId).attr("data-split-index") + "d" + $("#" + chartId).attr("data-drill-index");
            home_dashboard.variable.custom.chartObject[currentValue] = iObj.inputParam;
            home_dashboard.variable.custom.chartId.push(chartId);
            home_dashboard.variable.custom.chartTitle[currentValue] = $("#" + chartId).data("kendoChart").options.title.text;
        }
    },
    linkEventHandler: {
        back_action_link_click: function (element, event) {
            var chartId,
            reportIndex,
            drillIndex,
            splitIndex;
            chartId = "home_dashboard_chart_" + $(element).attr("id").replace("home_dashboard_report_action_back_", "");
            reportIndex = $("#" + chartId).attr("data-report-index");
            drillIndex = $("#" + chartId).attr("data-drill-index");
            splitIndex = $("#" + chartId).attr("data-split-index");
            if (drillIndex != 0) {
                if (drillIndex - 1 == 0) {
                    var currentValue = "r" + $("#" + chartId).attr("data-report-index") + "s" + $("#" + chartId).attr("data-split-index") + "d" + (parseInt($("#" + chartId).attr("data-drill-index")) - 1);
                    if (home_dashboard.variable.custom.chartObject[currentValue] != undefined) {
                        if (splitIndex == 0) {
                            $("#" + chartId).attr("data-drill-index", (parseInt(drillIndex) - 1).toString());
                            home_dashboard.customRequirementHandler.createDatasource(home_dashboard.variable.custom.reportTypeList[reportIndex], chartId, false);
                        } else {
                            if (home_dashboard.variable.custom.reportTypeList[reportIndex].split == "true") {
                                home_dashboard.variable.custom.reportTypeList[reportIndex].split = "false";
                            };
                            home_dashboard.variable.custom.reportTypeList[reportIndex].reportName = home_dashboard.variable.custom.chartTitle[currentValue];
                            $("#" + chartId).attr("data-drill-index", (parseInt(drillIndex) - 1).toString());
                            home_dashboard.customRequirementHandler.createDatasource(home_dashboard.variable.custom.reportTypeList[reportIndex], chartId, false);
                        };
                    };
                } else {
                    var currentValue = "r" + $("#" + chartId).attr("data-report-index") + "s" + $("#" + chartId).attr("data-split-index") + "d" + (parseInt($("#" + chartId).attr("data-drill-index")) - 1);
                    if (home_dashboard.variable.custom.chartObject[currentValue] != undefined) {
                        if (home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString() - 1].split == "true") {
                            home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString() - 1].split = "false";
                        };
                        home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString() - 1].inputParam = home_dashboard.variable.custom.chartObject[currentValue];
                        home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString() - 1].reportName = home_dashboard.variable.custom.chartTitle[currentValue];
                        $("#" + chartId).attr("data-drill-index", (parseInt(drillIndex) - 1).toString());
                        home_dashboard.customRequirementHandler.createDatasource(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString() - 1], chartId, false);
                    };
                };
            };
            if ((drillIndex - 1 > 0) && ($("#home_dashboard_report_group_filter_" + home_dashboard.variable.custom.activeGroupIndex + "_report_" + home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString() - 1].summaryValue + "_filter").data("kendoDropDownList") != undefined) && ($("#home_dashboard_report_group_filter_" + home_dashboard.variable.custom.activeGroupIndex + "_report_" + home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString() - 1].summaryValue + "_filter").data("kendoDropDownList").value() != "")) {
                if ($("#" + chartId).data("kendoChart").options.series[0] != undefined && $("#" + chartId).data("kendoChart").options.series[0].data != undefined) {
                    for (var index = 0; index < $("#" + chartId).data("kendoChart").options.series[0].data.length; index++) {
                        if ($("#" + chartId).data("kendoChart").options.series[0].data[index].summary_by == $("#home_dashboard_report_group_filter_" + home_dashboard.variable.custom.activeGroupIndex + "_report_" + home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString() - 1].summaryValue + "_filter").data("kendoDropDownList").value()) {
                            $(element).click();
                        };
                    };
                };
            };
			setTimeout(function () {
				if (!($("#" + chartId).is(":visible")) && (drillIndex != 0)) {
					home_dashboard.customRequirementHandler.createChartDataGridView(chartId);
				};
			}, 10);
        },
        refresh_action_link_click: function (element, event) {
            var chartId,
            reportIndex,
            drillIndex,
            splitIndex,
            currentValue;
            chartId = "home_dashboard_chart_" + $(element).attr("id").replace("home_dashboard_report_action_refresh_", "");
            reportIndex = $("#" + chartId).attr("data-report-index");
            drillIndex = $("#" + chartId).attr("data-drill-index");
            splitIndex = $("#" + chartId).attr("data-split-index");
            currentValue = "r" + $("#" + chartId).attr("data-report-index") + "s" + $("#" + chartId).attr("data-split-index") + "d" + $("#" + chartId).attr("data-drill-index");
            if (drillIndex == 0) {
                if (splitIndex == 0) {
                    home_dashboard.customRequirementHandler.createDatasource(home_dashboard.variable.custom.reportTypeList[reportIndex], chartId);
                } else {
                    if (home_dashboard.variable.custom.reportTypeList[reportIndex].split == "true") {
                        home_dashboard.variable.custom.reportTypeList[reportIndex].split = "false";
                    };
                    home_dashboard.variable.custom.reportTypeList[reportIndex].reportName = home_dashboard.variable.custom.chartTitle[currentValue];
                    home_dashboard.customRequirementHandler.createDatasource(home_dashboard.variable.custom.reportTypeList[reportIndex], chartId);
                };
            } else {
                if (home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString()].split == "true") {
                    home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString()].split = "false";
                };
                home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString()].inputParam = home_dashboard.variable.custom.chartObject[currentValue];
                home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString()].reportName = home_dashboard.variable.custom.chartTitle[currentValue];
                home_dashboard.customRequirementHandler.createDatasource(home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString()], chartId);
            };
			if (!($("#" + chartId).is(":visible"))) {
				home_dashboard.customRequirementHandler.createChartDataGridView(chartId);
            };
        },
        close_action_link_click: function (element, event) {
            var chartId,
            groupIndex,
            currentChart,
            reportCodeListSelector,
            reportCodeListAfterClose;
            chartId = $(element).attr("id").replace("home_dashboard_report_action_close_", "");
            groupIndex = $(element).attr("data-report-group");
            if ($("#home_dashboard_report_action_splitscreen_" + chartId).is(":visible")) {
                if ($("#home_dashboard_bookmark_" + chartId).next().length !== 0) {
                    currentChart = $("#home_dashboard_bookmark_" + chartId).next();
                } else if ($("#home_dashboard_bookmark_" + chartId).prev().length !== 0) {
                    currentChart = $("#home_dashboard_bookmark_" + chartId).prev();
                };
                $("#home_dashboard_bookmark_" + chartId).remove();
                if (currentChart !== undefined) {
                    currentChart.show();
                } else {
                    $("#home_dashboard_prev_view_" + groupIndex).remove();
                    $("#home_dashboard_next_view_" + groupIndex).remove();
                };
                home_dashboard.customRequirementHandler.chartResize(groupIndex);
            } else {
                $("#home_dashboard_bookmark_" + chartId).remove();
            };
            home_dashboard.variable.custom.closedReportIdList.push(chartId);
            home_dashboard.customRequirementHandler.createInputparam(home_dashboard.variable.custom.activeGroupIndex);
            var reportCodeListSelector = $("#home_dashboard_report_group_filter_" + groupIndex + "_" + "report_code_list_filter").data("kendoDropDownList");
            reportCodeListAfterClose = $.grep(reportCodeListSelector.dataSource.data(), function (e, i) {
                    return e.report_id != chartId;
                });
            reportCodeListSelector.setDataSource(reportCodeListAfterClose);
            reportCodeListSelector.value("");
            reportCodeListSelector.refresh();
        },
        dataview_action_link_click: function (element, event) {
            var chartId = $(element).attr("id").replace("home_dashboard_report_action_dataview_", ""),
            reportIndex = $("#home_dashboard_chart_" + chartId).attr("data-report-index");
            $("#home_dashboard_report_data_view_" + chartId).append(home_dashboard.customRequirementHandler.getReportWindowHtml(chartId, reportIndex));
            $("#home_dashboard_report_data_view_window_" + chartId).kendoWindow({
                width: "850px",
                height: "500px",
                title: $("#home_dashboard_chart_" + chartId).data("kendoChart").options.title.text,
                visible: false,
                modal: true,
                deactivate: function () {
                    home_dashboard.variable.custom.detailed_data_tab_clicked = false;
                    this.destroy();
                },
            });
            $("#home_dashboard_report_data_view_tab_" + chartId).kendoTabStrip({
                animation: false
            });
            $("#home_dashboard_report_data_view_summary_grid_" + chartId).kendoGrid({
                dataSource: {
                    data: $("#home_dashboard_chart_" + chartId).data("kendoChart").dataSource._pristineData
                },
                height: 410,
                columns: [{
                        field: "summary_by",
                        title: $("#home_dashboard_chart_" + chartId).data("kendoChart").options.categoryAxis.title.text
                    }, {
                        field: "series_by",
                        title: $("#home_dashboard_chart_" + chartId).data("kendoChart").options.series[0].title
                    }, {
                        field: "count",
                        title: $("#home_dashboard_chart_" + chartId).data("kendoChart").options.valueAxis.title.text
                    }
                ],
                sortable: true,
                toolbar: (home_dashboard.variable.custom.reportTypeList[reportIndex].export !== undefined && home_dashboard.variable.custom.reportTypeList[reportIndex].export.summary === "true") ? (["excel"]) : (false),
                excel: {
                    fileName: "SummarizedData.xlsx",
                    proxyURL: "../../common/components/Export/kendoProxyExport.aspx"
                },
                dataBound: function (e) {
                    if ($("#home_dashboard_chart_" + chartId).data("kendoChart").options.series[0].title == "") {
                        this.hideColumn(1);
                    };
                    $("#home_dashboard_report_data_view_summary_grid_" + chartId).find(".k-grid-content").css("height", "314px");
                }
            });
            home_dashboard.variable.custom.reportTypeList[reportIndex].detailedReport.forEach(function (e) {
                e.width = 150;
            });
            $("#home_dashboard_report_data_view_detail_grid_" + chartId).kendoGrid({
                height: 417,
                columns: home_dashboard.variable.custom.reportTypeList[reportIndex].detailedReport,
                sortable: true,
                pageSize: 10,
                pageable: {
                    numeric: false,
                },
                toolbar: (home_dashboard.variable.custom.reportTypeList[reportIndex].export !== undefined && home_dashboard.variable.custom.reportTypeList[reportIndex].export.detailedReport === "true") ? (["excel"]) : (false),
                excelExport: function (e) {
                    e.preventDefault();
                    kendo.ui.progress($("#home_dashboard_report_data_view_window_" + reportIndex), true);
                    setTimeout(function () {
                        var reportCount = $("#" + home_dashboard.variable.custom.reportTypeList[reportIndex].chartId).attr("data-report-index");
                        var drillCount = $("#" + home_dashboard.variable.custom.reportTypeList[reportIndex].chartId).attr("data-drill-index");
                        if (drillCount == 0) {
                            var exportObj = home_dashboard.variable.custom.reportTypeList[reportCount];
                        } else {
                            var exportObj = home_dashboard.variable.custom.reportTypeList[reportCount].drillOrder[(parseInt(drillCount)).toString()];
                        };
                        $.ajax({
                            url: getWebserverpath() + "common/components/msvIntegrate/GenerateExportFile.aspx",
                            method: "POST",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({
                                context: {
                                    sessionId: mService.user.profile.context.session_id,
                                    userId: mService.user.profile.context.user_id,
                                    client_id: mService.user.profile.context.client_id,
                                    locale_id: mService.user.profile.context.locale_id,
                                    country_code: mService.user.profile.context.country_code,
                                    inputparam: {
                                        p_document_type: "csv",
                                        p_document_name: (home_dashboard.variable.custom.reportTypeList[reportIndex].export.fileName !== undefined) ? (home_dashboard.variable.custom.reportTypeList[reportIndex].export.fileName) : ("Detailed Data"),
                                        p_document_template: home_dashboard.variable.custom.reportTypeList[reportIndex].input.report_info,
                                        p_data_retrieve_service_name: "sp_report_information_for_custom_report_builder",
                                        p_data_retrieve_request_xml: "<signature><i_inputparam_xml>" + exportObj.inputParam.replace("<inputparam>", "<inputparam><export_ind>true</export_ind>") + "</i_inputparam_xml><i_report_code>" + home_dashboard.variable.custom.reportTypeList[reportIndex].reportCode + "</i_report_code><o_retrieve_status></o_retrieve_status></signature>"
                                    }
                                }
                            }),
                            error: function (e) {
                                alert("Please Contact Your Support Desk.");
                                kendo.ui.progress($("#home_dashboard_report_data_view_window_" + reportIndex), false);
                            },
                            success: function (response) {
                                response = JSON.parse(response.replace(/\\/g, "\\\\"));
                                if (response[0].p_output_file_name == "" || response[0].p_output_file_path == "") {
                                    alert("Please Contact Your Support Desk.");
                                    kendo.ui.progress($("#home_dashboard_report_data_view_window_" + reportIndex), false);
                                } else {
                                    formCreation = document.createElement('FORM');
                                    formCreation.name = 'myForm';
                                    formCreation.method = 'POST';
                                    formCreation.action = getWebserverpath() + "common/components/msvIntegrate/DownloadExportFile.aspx?fileName=" + response[0].p_output_file_name + "&filePath=" + response[0].p_output_file_path;
                                    document.body.appendChild(formCreation);
                                    formCreation.submit();
                                    kendo.ui.progress($("#home_dashboard_report_data_view_window_" + reportIndex), false);
                                };
                            }
                        });
                    }, 10);
                },
                dataBound: function (e) {
                    if ($("#home_dashboard_report_data_view_detail_grid_" + chartId).data("kendoGrid").dataSource.data().length > 0) {
                        $("#home_dashboard_report_data_view_detail_grid_" + chartId).find(".k-grid-excel").show();
                        $("#home_dashboard_report_data_view_detail_grid_" + chartId).find(".k-grid-content").css("height", "314px");
                    };
                },
                resizable: true
            });
            $("#home_dashboard_report_data_view_detail_grid_" + chartId).find(".k-grid-excel").hide();
            $("#home_dashboard_report_data_view_window_" + chartId).data("kendoWindow").center().open();
            $("#home_dashboard_report_data_view_summary_grid_" + chartId).data("kendoGrid").refresh();
            $("#home_dashboard_report_data_view_tab_detail_" + chartId).click();
        },
        summary_dataview_action_link_click: function (element, event) {
            var chartId = $(element).attr("id").replace("home_dashboard_report_action_summary_dataview_", "");
            if ($("#home_dashboard_chart_" + chartId).is(":visible")) {
                home_dashboard.customRequirementHandler.createChartDataGridView("home_dashboard_chart_" + chartId);
                $("#home_dashboard_chart_" + chartId).hide();
            };
        },
		summary_dataview_drill_action_link_click: function (element, event) {
			var chartId,
			summaryByValue,
			gridHeight;
			chartId = element.getAttribute('data-chart-id');
			summaryByValue = element.parentElement.parentElement.firstElementChild.innerText;
			if ($("#" + chartId).data("kendoChart").options.series[0] != undefined && $("#" + chartId).data("kendoChart").options.series[0].data != undefined) {
				for (var index = 0; index < $("#" + chartId).data("kendoChart").options.series[0].data.length; index++) {
					if ($("#" + chartId).data("kendoChart").options.series[0].data[index].summary_by == summaryByValue) {
						$("#" + chartId).data("kendoChart").options.seriesClick({
							dataItem: $("#" + chartId).data("kendoChart").options.series[0].data[index],
							sender: $("#" + chartId).data("kendoChart")
						});
					};
				};
			};
			home_dashboard.customRequirementHandler.createChartDataGridView(chartId);
        },
        chart_dataview_action_link_click: function (element, event) {
            var chartId = $(element).attr("id").replace("home_dashboard_report_action_chart_dataview_", "");
            $("#home_dashboard_chart_" + chartId).show();
            $("#home_dashboard_chart_" + chartId).data("kendoChart").redraw();
            $("#home_dashboard_chart_" + chartId + "_summary_data").hide();
        },
        group_tab_link_click: function (element, event) {
            var groupIndex = $(element).attr("id").replace("home_dashboard_report_group_header_", "");
            home_dashboard.variable.custom.activeGroupIndex = parseInt(groupIndex);
            if (home_dashboard.variable.custom.groupTypeLink[groupIndex].load === undefined) {
                home_dashboard.customRequirementHandler.createInputparam(home_dashboard.variable.custom.activeGroupIndex);
                home_dashboard.variable.custom.groupTypeLink[groupIndex].load = true;
            };
        },
        group_filter_refresh_link_click: function (element, event) {
            var groupIndex,
            reportCodeListDataSrcRefresh,
            reportCodeListCounterRefresh,
            reportCodeListFilterRefresh,
            reportCodeListIndexRefresh,
            reportCodeListChartArrayRefresh,
            reportCodeListChartCounterRefresh;
            groupIndex = $(element).attr("id").replace("home_dashboard_report_group_filter_refresh_", "");
            home_dashboard.variable.custom.activeGroupIndex = parseInt(groupIndex);
            for (key in home_dashboard.variable.custom.reportLoadIndicator[groupIndex]) {
                $("#home_dashboard_chart_" + key).attr("data-drill-index", "0");
            };
            home_dashboard.variable.custom.reportLoadIndicator[groupIndex] = {};
            home_dashboard.customRequirementHandler.createInputparam(home_dashboard.variable.custom.activeGroupIndex);
            reportCodeListFilterRefresh = $("#home_dashboard_report_group_filter_" + groupIndex + "_" + "report_code_list_filter").data("kendoDropDownList");
            reportCodeListDataSrcRefresh = [];
            reportCodeListChartCounterRefresh = 0;
            reportCodeListChartArrayRefresh = home_dashboard.variable.custom.reportGroupList.slice(0, groupIndex);
            for (var counter = 0; counter < reportCodeListChartArrayRefresh.length; counter++) {
                reportCodeListChartCounterRefresh += reportCodeListChartArrayRefresh[counter].reportList.length;
            };
            for (reportCodeListCounterRefresh = 0; reportCodeListCounterRefresh < home_dashboard.variable.custom.reportGroupList[groupIndex].reportList.length; reportCodeListCounterRefresh++) {
                if (home_dashboard.variable.custom.closedReportIdList.indexOf((reportCodeListCounterRefresh + reportCodeListChartCounterRefresh).toString()) === -1) {
                    reportCodeListDataSrcRefresh.push({
                        "code": home_dashboard.variable.custom.reportGroupList[groupIndex].reportList[reportCodeListCounterRefresh].reportCode,
                        "description": (home_dashboard.variable.custom.reportGroupList[groupIndex].reportList[reportCodeListCounterRefresh].reportNameTemplate !== undefined) ? (home_dashboard.variable.custom.reportGroupList[groupIndex].reportList[reportCodeListCounterRefresh].reportNameTemplate) : (home_dashboard.variable.custom.reportGroupList[groupIndex].reportList[reportCodeListCounterRefresh].reportName),
                        "report_id": reportCodeListCounterRefresh + reportCodeListChartCounterRefresh
                    });
                };
            };
            reportCodeListFilterRefresh.setDataSource(reportCodeListDataSrcRefresh);
            for (reportCodeListIndexRefresh = 0; reportCodeListIndexRefresh < reportCodeListFilterRefresh.dataSource.data().length; reportCodeListIndexRefresh++) {
                reportCodeListFilterRefresh.dataSource.data()[reportCodeListIndexRefresh].description = home_dashboard.customRequirementHandler.getReportName(reportCodeListFilterRefresh.dataSource.data()[reportCodeListIndexRefresh].description);
            };
            reportCodeListFilterRefresh.value("");
            reportCodeListFilterRefresh.refresh();
        },
        prev_view_link_click: function (element, event) {
            var groupIndex = $(element).attr("id").replace("home_dashboard_prev_view_", ""),
            currentChart = $("#home_dashboard_content_" + groupIndex + " [data-mreport-role = 'bookmark']:visible");
            if (currentChart.prev().length > 0) {
                currentChart.hide();
                currentChart.prev().show();
                home_dashboard.customRequirementHandler.createInputparam(home_dashboard.variable.custom.activeGroupIndex);
                home_dashboard.customRequirementHandler.chartResize(groupIndex);
            };
        },
        next_view_link_click: function (element, event) {
            var groupIndex = $(element).attr("id").replace("home_dashboard_next_view_", ""),
            currentChart = $("#home_dashboard_content_" + groupIndex + " [data-mreport-role = 'bookmark']:visible");
            if (currentChart.next().length > 0) {
                currentChart.hide();
                currentChart.next().show();
                home_dashboard.customRequirementHandler.createInputparam(home_dashboard.variable.custom.activeGroupIndex);
                home_dashboard.customRequirementHandler.chartResize(groupIndex);
            };
        },
        detailed_data_tab_link_click: function (element, event) {
            var chartId,
            reportIndex,
            drillIndex,
            splitIndex,
            iObj,
            detailedDatasource;
            chartId = "home_dashboard_chart_" + $(element).attr("id").replace("home_dashboard_report_data_view_tab_detail_", "");
            reportIndex = $("#" + chartId).attr("data-report-index");
            drillIndex = $("#" + chartId).attr("data-drill-index");
            splitIndex = $("#" + chartId).attr("data-split-index");
            if (!home_dashboard.variable.custom.detailed_data_tab_clicked) {
                if (drillIndex == 0) {
                    iObj = home_dashboard.variable.custom.reportTypeList[reportIndex];
                } else {
                    iObj = home_dashboard.variable.custom.reportTypeList[reportIndex].drillOrder[(parseInt(drillIndex)).toString()];
                };
                detailedDatasource = new kendo.data.DataSource({
                        pageSize: 10,
                        transport: {
                            read: {
                                type: "POST",
                                async: true,
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
								url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=common_modules&serviceName=report_information_for_custom_report_builder&path=context/outputparam_detail",
                                complete: function (data, textstatus) {},
                            },
                            parameterMap: function (options, operation) {
                                return mService.util.getTransportParameter({
                                    inputparam: {
                                        p_report_code: iObj.reportCode,
                                        p_inputparam_xml: iObj.inputParam
                                    }
                                }).replace("</inputparam>", "<skip>" + options.skip + "</skip><take>" + 10 + "</take><detail_view>true</detail_view></inputparam>");
                            }
                        },
                        schema: {
                            total: function (response) {
                                if (response.length != 0) {
                                    return response[0].total;
                                } else {
                                    return 0;
                                };
                            },
                            model: false
                        },
                        serverPaging: true
                    });
                if (home_dashboard.variable.custom.reportTypeList[reportIndex].detailedReport !== undefined) {
                    $("#home_dashboard_report_data_view_detail_grid_" + $(element).attr("id").replace("home_dashboard_report_data_view_tab_detail_", "")).data("kendoGrid").setDataSource(detailedDatasource);
                };
                home_dashboard.variable.custom.detailed_data_tab_clicked = true;
            };
        },
        img_view_tab_link_click: function (element, event) {
            var chartId;
            chartId = $(element).attr("id").replace("home_dashboard_report_data_view_tab_img_", "");
            $("#home_dashboard_report_data_view_img_" + chartId).attr("src", $("#home_dashboard_chart_" + chartId).data("kendoChart").imageDataURL());
        },
        export_img_link_click: function (element, event) {
            var chartId;
            chartId = $(element).attr("id").replace("home_dashboard_report_data_view_export_img_", "");
            $("#home_dashboard_chart_" + chartId).getKendoChart().exportImage().done(function (data) {
                kendo.saveAs({
                    dataURI: data,
                    fileName: "ChartImage.png",
                    proxyURL: "../../common/components/Export/kendoProxyExport.aspx"
                });
            });
        },
        fullscreen_action_link_click: function (element, event) {
            var chartId,
            groupIndex;
            chartId = $(element).attr("id").replace("home_dashboard_report_action_fullscreen_", "");
            groupIndex = $(element).attr("data-report-group");
            home_dashboard.variable.custom.initialLoadInd = false;
            home_dashboard.variable.custom.fullScreenInd = true;
            $("#home_dashboard_prev_view_td" + groupIndex).show();
            $("#home_dashboard_next_view_td" + groupIndex).show();
            $("#home_dashboard_content_" + groupIndex + " [data-mreport-role = 'bookmark']").css({
                "height": "560px",
                "width": "100%",
                "margin-left": "0%"
            });
            $("#home_dashboard_content_" + groupIndex + " [data-mreport-role = 'chart']").css("height", "528px");
            $("#home_dashboard_content_" + groupIndex + " [data-mreport-role = 'bookmark']").hide();
            $("#home_dashboard_content_" + groupIndex + " [data-link-type = 'fullscreen_action']").hide();
            $("#home_dashboard_content_" + groupIndex + " [data-link-type = 'splitscreen_action']").show();
            $("#home_dashboard_bookmark_" + chartId).show();
            home_dashboard.customRequirementHandler.chartResize(groupIndex);
        },
        splitscreen_action_link_click: function (element, event) {
            var chartId,
            groupIndex,
            reportCodeListFilterReset;
            chartId = $(element).attr("id").replace("home_dashboard_report_action_splitscreen_", "");
            groupIndex = $(element).attr("data-report-group");
            home_dashboard.variable.custom.fullScreenInd = false;
            $("#home_dashboard_prev_view_td" + groupIndex).hide();
            $("#home_dashboard_next_view_td" + groupIndex).hide();
            $("#home_dashboard_content_" + groupIndex + " [data-mreport-role = 'bookmark']").css({
                "height": "330px",
                "width": "48.2%",
                "margin-left": "0.6%"
            });
            $("#home_dashboard_content_" + groupIndex + " [data-mreport-role = 'chart']").css("height", "298px");
            $("#home_dashboard_content_" + groupIndex + " [data-mreport-role = 'bookmark']").show();
            $("#home_dashboard_content_" + groupIndex + " [data-link-type = 'splitscreen_action']").hide();
            $("#home_dashboard_content_" + groupIndex + " [data-link-type = 'fullscreen_action']").show();
            home_dashboard.customRequirementHandler.chartResize(groupIndex);
            reportCodeListFilterReset = $("#home_dashboard_report_group_filter_" + groupIndex + "_" + "report_code_list_filter").data("kendoDropDownList");
            if (reportCodeListFilterReset != undefined) {
                reportCodeListFilterReset.value("");
                reportCodeListFilterReset.refresh();
            };
        }
    },
    variable: {
        custom: {
            chartObject: {},
            chartId: [],
            chartTitle: {},
            chartTitleTemplate: {},
            detailed_data_tab_clicked: false,
            reportTypeList: [],
            reportGroupList: [],
            groupTypeLink: {},
            activeGroupIndex: 0,
            reportLoadIndicator: {},
            closedReportIdList: [],
            initialLoadInd: true,
            fullScreenInd: false
        }
    }
};
$(window).on("scroll resize", function () {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function () {
            if (mService.app.getScreenId() === "home_dashboard") {
                home_dashboard.customRequirementHandler.createInputparam(home_dashboard.variable.custom.activeGroupIndex);
            }
        }, 350));
});
$(document).delegate("[data-widget-type = 'w_link']", "click", function (event) {
	var wLink,
	screenObject;
	wLink = this;
	setTimeout(function () {
		screenObject = eval(mService.app.getScreenId());
		screenObject.linkEventHandler[$(wLink).attr("data-link-type") + "_link_click"](wLink, event);
		$("#spinner").hide();
	}, 10);
});