
var home_container = {
    constructScreen: function () {
        $.ajax({
            url: "i_home.txt",
            async: false,
            cache: false
        }).done(function (data) {
            home_container.variable.custom.reportGroupList = JSON.parse(data)["reportGroup"];
            if (home_container.variable.custom.reportGroupList.length > 0) {
                console.log("Working fine");
                document.write("hi");
                home_container.variable.custom.groupTypeLink[0].load = true;
            };
        });
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
