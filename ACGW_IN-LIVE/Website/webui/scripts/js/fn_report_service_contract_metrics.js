var report_service_contract_metrics = {
	constructScreen : function () {
		report_service_contract_metrics.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "report_information_for_custom_report_builder",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_report_code : "'report_service_contract_metrics'",
					p_inputparam_xml : "report_service_contract_metrics.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "report_service_contract_metrics",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	refreshScreen : function () {
		report_service_contract_metrics.variable.custom.grid_1.refresh();
	},
	postConstruct : function () {
		var exportAccess = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == $("#report_service_contract_metrics").attr("id");
			})[0];
		if (exportAccess != undefined) {
			if (exportAccess.export_access == "true") {
				$("#report_service_contract_metrics_chart").append("<button class= 'k-button' id= 'report_service_contract_metrics_chart_export_btn' style='position:absolute; right:0; cursor:pointer; top: 2%; margin-right:1%;' data-widget-type = 'w_button' data-button-group = 'export' data-button-role = 'chart'>Chart Export</button>");
			} 
		}
	},						  
	initializeWidgets : function () {
		report_service_contract_metrics.variable.custom.tabstrip = $("#report_service_contract_metrics_tabstrip").kendoTabStrip({
				animation : {
					open : {
						effects : "fadeIn"
					},
				},
				activate : function (event) {
					$("#report_service_contract_metrics_chart .k-chart-content").css("height", "332");
					$("#report_service_contract_metrics_grid_1 .k-grid-content").css("height", "332");
				}
			}).data("kendoTabStrip");
		report_service_contract_metrics.variable.custom.grid_1 = $("#report_service_contract_metrics_grid_1").initializeWGrid({
				screenID : "report_service_contract_metrics",
				//toolbar : false,
				dataSource : report_service_contract_metrics.variable.custom.datasource_1,
				height : 400,
				pageSize : 10,
				filterable : false
			});
		report_service_contract_metrics.variable.custom.chart = $("#report_service_contract_metrics_chart").kendoChart({
				theme : $(document).data("kendoSkin") || "silver",
				title : {
					text : "Service Contract Analysis"
				},
				legend : {
					visible : true,
					position : "bottom",
				},
				seriesColors : ["#00B0F0", "#E29B2C", "#A05FCF", "#007bc3", "#76b800", "#ffae00", "#ef4c00", "#a419b7", "#430B62", " #66ff33", "#ff0066", "#cc33ff", "#ffff00", "#999966", "#999966", "#00ff00", "#ff6666"],
				seriesDefaults: 
				{
					labels: {
						visible: true,
					}  
				},
				series : [{
						type : "column",
						categoryField : "summary_by",
						field : "count",
					}, ],
				valueAxis : {
					labels : {
						rotation : "auto"
					},
					title : {
						text : "No of calls"
					}
				},
				chartArea: { margin: 0, padding: 0, width: (screen.width * 0.90) },
				categoryAxis : {
					majorGridLines : {
						visible : false
					},
					labels : {
						rotation : "auto"
					}
				},
				tooltip : {
					visible : true,
					template : "# if(value == undefined) {# ${series.name} : 0 #} else  {# ${series.name}: ${value} # }#"
				}
			}).data("kendoChart");
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (report_service_contract_metrics.variable.custom.crudIndicator == "R") {
				report_service_contract_metrics.variable.custom.datasource_1.read();
				if(report_service_contract_metrics.variable.custom.datasource_1.data().length != 0){
					report_service_contract_metrics.customRequirementHandler.getChartData();
				} else {
					report_service_contract_metrics.variable.custom.chart.options.categoryAxis.categories = [];
					report_service_contract_metrics.variable.custom.chart.options.legend.visible = false ;
					report_service_contract_metrics.variable.custom.chart.options.chartArea.width = screen.width * 0.90;
					report_service_contract_metrics.variable.custom.chart.redraw();
				}
			}
		}
	},
	customRequirementHandler : {
		getChartData : function () {
			var seriesByData,seriesColumnWidth;
			seriesByData = new kendo.data.DataSource({
					data : report_service_contract_metrics.variable.custom.datasource_1._pristineData,
					group : {
						field : "series_by",
					},
				});
			report_service_contract_metrics.variable.custom.chart.setDataSource(seriesByData);
			report_service_contract_metrics.variable.custom.chart.options.legend.visible = true ;
			report_service_contract_metrics.variable.custom.chart.options.legend.labels.template = "#= series.name#";
			seriesColumnWidth = report_service_contract_metrics.variable.custom.chart.options.categoryAxis.dataItems.length * report_service_contract_metrics.variable.custom.chart.options.series.length;
			if(seriesColumnWidth < 60){
				report_service_contract_metrics.variable.custom.chart.options.chartArea.width = screen.width * 0.90;
			}else{
				report_service_contract_metrics.variable.custom.chart.options.chartArea.width = seriesColumnWidth * 15;
			}
			report_service_contract_metrics.variable.custom.chart.redraw();
		},
		getFilterValues : function () {
			return $("#report_service_contract_metrics").getInputparamXML({
				screenID : "report_service_contract_metrics",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			report_service_contract_metrics.variable.custom.selectedRecord = report_service_contract_metrics.variable.custom.grid_1.dataSource.getByUid(report_service_contract_metrics.variable.custom.grid_1.select().data("uid"));
		},
		getExportConfig : function (gridId) {
			if(gridId == "report_service_contract_metrics_grid_1_export_btn"){
				return {
					type : "csv",
					template : "report_service_contract_metrics",
					service : "sp_report_information_for_custom_report_builder",
					request : "<signature><i_inputparam_xml>" + report_service_contract_metrics.customRequirementHandler.getFilterValues() + "</i_inputparam_xml><i_report_code>report_service_contract_metrics</i_report_code><o_retrieve_status></o_retrieve_status></signature>",
					length : report_service_contract_metrics.variable.custom.grid_1.dataSource.data().length
				};
			}
		}							   
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "report_service_contract_metrics_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "report_service_contract_metrics_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {}

	}
};