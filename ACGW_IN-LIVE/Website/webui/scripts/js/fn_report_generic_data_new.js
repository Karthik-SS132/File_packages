var report_generic_data = {
	constructScreen : function () {
		report_generic_data.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "report_information_for_custom_report_builder",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_report_code : "#report_generic_data_report_code",
					p_inputparam_xml : "report_generic_data.customRequirementHandler.getFilterValues()"
				},
				screenID : "report_generic_data",
				processResponse : true
			});
	},
	postConstruct : function () {
		report_generic_data.variable.custom.report_code.setDataSource(JSON.parse("[" + report_generic_data.variable.custom.reportCodeDatasource + "]"));
	},
	initializeWidgets : function () {
		report_generic_data.variable.custom.report_code = $("#report_generic_data_report_code").initializeWDropdownlist({
				screenID : "report_generic_data",
				dataSource : [],
				dataTextField : "description",
				dataValueField : "code",
				template : "description"
			});
		report_generic_data.variable.custom.grid_1 = $("#report_generic_data_grid_1").initializeWGrid({
				screenID : "report_generic_data",
				dataSource : report_generic_data.variable.custom.datasource_1,
				height : 400,
				pageSize : 10,
				toolbar : "#report_generic_data_grid_1_toolbar_template"
			});
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (report_generic_data.variable.custom.validator.validate()) {
				if ($("#report_generic_data_report_code").getVal() == "report_generic_data_hr_report" || $("#report_generic_data_report_code").getVal() == "report_generic_data_finance_report") {
					$("#report_generic_data_grid_1").html("");
					var soft_dataSource = [];
					soft_dataSource = mserviceUtilities.getTransportDataSource({
							applicationName: "common_modules",
							serviceName: "report_information_for_custom_report_builder",
							outputPath: "context/outputparam_detail",
							pageSize: 10,
							inputParameter: {
								p_report_code: "#report_generic_data_report_code",
								p_inputparam_xml: "report_generic_data.customRequirementHandler.getFilterValues()"
							},
							screenID: "report_generic_data",
							processResponse: true
						});
					soft_dataSource.read();
					soft_dataSource.data();

					if (soft_dataSource.data().length != 0) {
						var req_obj = report_generic_data.customRequirementHandler.getDifference_of_dates($("#report_generic_data_from_date_filter").data("kendoDatePicker").value(), $("#report_generic_data_to_date_filter").data("kendoDatePicker").value());
						report_generic_data.variable.custom.column_datasource = req_obj.arr;
						var difference_of_dates = req_obj.diff;
						if (difference_of_dates >= 0) {

							// Creating Dynamic Columns

							var columns = [{
									field: "employee_name",
									title: "Employee Name",
									width: 150
								}
							];
							var dummy = {};
							if ($("#report_generic_data_report_code").getVal() == "report_generic_data_hr_report") {
								for (var i = 0; i < report_generic_data.variable.custom.column_datasource.length; i++) {
									columns.push({
										field: report_generic_data.variable.custom.column_datasource[i].field,
										title: report_generic_data.variable.custom.column_datasource[i].title,
										width: 150,
										template: '<span style = "display: block">A: ${' + report_generic_data.variable.custom.column_datasource[i].field + '.attendance_in_hrs} hrs [I:${' + report_generic_data.variable.custom.column_datasource[i].field + '.punch_in_time}, O:${' + report_generic_data.variable.custom.column_datasource[i].field + '.punch_out_time}]</span><span style = "display: block">#if (kendo.toString(' + report_generic_data.variable.custom.column_datasource[i].field + '.travel_in_minutes) == "") {#  #} else {# T: ${' + report_generic_data.variable.custom.column_datasource[i].field + '.travel_in_minutes} Mins #}#</span><span style = "display: block">#if (kendo.toString(' + report_generic_data.variable.custom.column_datasource[i].field + '.work_hrs_assigned_jobs) == "") {#  #} else {# W: ${' + report_generic_data.variable.custom.column_datasource[i].field + '.work_hrs_assigned_jobs} hrs #}#</span>'
									});
									dummy[report_generic_data.variable.custom.column_datasource[i].field] = "";
								}
							} else if ($("#report_generic_data_report_code").getVal() == "report_generic_data_finance_report") {
								for (var i = 0; i < report_generic_data.variable.custom.column_datasource.length; i++) {
									columns.push(
										{
										field: report_generic_data.variable.custom.column_datasource[i].field,
										title: report_generic_data.variable.custom.column_datasource[i].title,
										width: 100,
										template: '<span style = "display: block">#if (kendo.toString(' + report_generic_data.variable.custom.column_datasource[i].field + '.travel_distane_in_kms) == "") {#  #} else {# D: ${' + report_generic_data.variable.custom.column_datasource[i].field + '.travel_distane_in_kms} Kms#}#</span>'
									});
									dummy[report_generic_data.variable.custom.column_datasource[i].field] = "";
								}
							}

							// formulating dataSource
							for (var i = 0; i < soft_dataSource.data().length; i++) {
								soft_dataSource.data()[i]["attendance_in_hrs"] = (parseFloat(soft_dataSource.data()[i]["attendance_in_minutes"]) / 60).toFixed(1);

							}

							var req = new kendo.data.DataSource({
									data: soft_dataSource.data()
								});
							req.read();
							req.data();
							req.group([{
										"field": "employee_name"
									}, {
										"field": "work_date"
									}
								]);
							var required_dataSource = req.view();

							var actual_dataSource = [];
							for (var i = 0; i < required_dataSource.length; i++) {
								var obj = $.extend({}, dummy);
								obj["employee_name"] = required_dataSource[i]["value"];
								for (var j = 0; j < required_dataSource[i].items.length; j++) {

									obj["D_" + required_dataSource[i]["items"][j]["value"].replace(/-/g, "_")] = required_dataSource[i]["items"][j]["items"][0];
								}
								actual_dataSource.push(obj);

							}
							report_generic_data.variable.custom.grid_2 = $("#report_generic_data_grid_1").kendoGrid({
									dataSource: {
										data: actual_dataSource,
										pageSize: 10
									},
									height: 400,
									columns: columns,
									pageable: true,
									selectable: true,
									filterable: false,
									toolbar: [{
											template: kendo.template($("#report_generic_data_grid_1_toolbar_template").html())
										}
									]
								}).data("kendoGrid");
						}

					} else {
						report_generic_data.variable.custom.grid_1 = $("#report_generic_data_grid_1").initializeWGrid({
								screenID: "report_generic_data",
								dataSource: report_generic_data.variable.custom.datasource_1,
								height: 400,
								pageSize: 10
							});
					}

				}
				else if ($("#report_generic_data_report_code").getVal() == "report_generic_data_customer_feedback_report" ) {
					$("#report_generic_data_grid_1").html("");
					var soft_dataSource = [];
					soft_dataSource = mserviceUtilities.getTransportDataSource({
						applicationName : "common_modules",
						serviceName : "report_information_for_custom_report_builder",
						outputPath : "context/outputparam_detail",
						pageSize : 10,
						inputParameter : {
							p_report_code : "#report_generic_data_report_code",
							p_inputparam_xml : "report_generic_data.customRequirementHandler.getFilterValues()"
						},
						screenID : "report_generic_data",
						processResponse : true
					});
					soft_dataSource.read();
					soft_dataSource.data();
					var temp_dataSource = soft_dataSource.data();
					if(soft_dataSource.data().length != 0){
						var column_datasource = report_generic_data.customRequirementHandler.dynamicColCreation(temp_dataSource);
						report_generic_data.variable.custom.column_datasource = column_datasource;
						columns = [{
								field : "activity_ref_no",
								title : "Call Number",
								width : 100
							}, {
								field : "asset_id",
								title : "Machine Sr #",
								width : 200
							}, {
								field : "equipment_id",
								title : "Model",
								width : 200
							}, {
								field : "company_loc",
								title : "Region",
								width : 200
							}, {
								field : "org_lvl_code",
								title : "Dealer",
								width : 200
							}, {
								field : "customer_name",
								title : "Customer Name",
								width : 200
							}, {
								field : "contact_name",
								title : "Customer Contact Person",
								width : 200
							}, {
								field : "contact_number",
								title : "Contact Number",
								width : 200
							}, {
								field : "overall_feedback",
								title : "Overall Feedback",
								width : 200
							}, {
								field : "prod_performance",
								title : "Product Performance",
								width : 200
							}, {
								field : "recommend_acopco_to_friend",
								title : "Recommend Acopco",
								width : 200
							}, {
								field : "response_support_rendered",
								title : "Support Rendered",
								width : 200
							}, {
								field : "satisfied_with_acopco",
								title : "Satisfaction with Acopco",
								width : 200
							}, {
								field : "techie_competency_level",
								title : "Technical Competency",
								width : 200
							}, {
								field : "additional_comments",
								title : "Comments",
								width : 200
							}		
						];
						dummy = {};
						
						// filtering the soft_dataSource to required format for grid
						
						var grid_req = new kendo.data.DataSource({data: temp_dataSource});;
						grid_req.read();
						grid_req.data();
						grid_req.group([{"field" : "activity_ref_no"}, {"field" : "question_code"}]);
						required_dataSource = grid_req.view(); 
						
						// formulating dataSource for grid
						
						actual_dataSource = [];
						for(var i = 0; i < required_dataSource.length; i++) {
							var obj = $.extend({}, dummy);
							obj["activity_ref_no"] = required_dataSource[i]["value"];
							for(var j = 0; j < required_dataSource[i].items.length; j++) {
								obj[required_dataSource[i]["items"][j]["value"]] = required_dataSource[i]["items"][j]["items"][0].question_response_value;
								obj["equipment_id"] = required_dataSource[i]["items"][j]["items"][0].equipment_id;
								obj["asset_id"] = required_dataSource[i]["items"][j]["items"][0].asset_id;
								obj["company_loc"] = required_dataSource[i]["items"][j]["items"][0].company_loc;
								obj["org_lvl_code"] = required_dataSource[i]["items"][j]["items"][0].org_lvl_code;
								obj["customer_name"] = required_dataSource[i]["items"][j]["items"][0].customer_name;
								obj["contact_number"] = required_dataSource[i]["items"][j]["items"][0].contact_number;
								obj["contact_name"] = required_dataSource[i]["items"][j]["items"][0].contact_name;
							}
							actual_dataSource.push(obj);
						}
						
						report_generic_data.variable.custom.grid_2 = $("#report_generic_data_grid_1").kendoGrid({
							dataSource : {
								data : actual_dataSource,
								pageSize: 10
							},
							height : 400,
							columns : columns,
							pageable: true,
							selectable : true,
							filterable : false,
							toolbar : [
								{ template: kendo.template($("#report_generic_data_grid_1_toolbar_template").html()) }
							]
						}).data("kendoGrid");
					}else {
						report_generic_data.variable.custom.grid_1 = $("#report_generic_data_grid_1").initializeWGrid({
							screenID : "report_generic_data",
							dataSource : report_generic_data.variable.custom.datasource_1,
							height : 400,
							pageSize : 10
						});
					}
				}
				else {
					var lattitudeList = [],
					longitudeList = [],
					addressList = [],
					lengthCounter,
					recordCounter;
					report_generic_data.variable.custom.grid_1.dataSource.read();
					for (var key in report_generic_data.variable.custom.grid_1.dataSource.options.schema.model.fields) {
						if (report_generic_data.variable.custom.grid_1.dataSource.options.schema.model.fields[key].identifier != undefined) {
							if (report_generic_data.variable.custom.grid_1.dataSource.options.schema.model.fields[key].identifier.indexOf("lattitude") != -1) {
								lattitudeList.push(key);
							} else if (report_generic_data.variable.custom.grid_1.dataSource.options.schema.model.fields[key].identifier.indexOf("longitude") != -1) {
								longitudeList.push(key);
							} else if (report_generic_data.variable.custom.grid_1.dataSource.options.schema.model.fields[key].identifier.indexOf("address") != -1) {
								addressList.push(key);
							}
						}
					};
					for (lengthCounter = 0; lengthCounter < lattitudeList.length; lengthCounter++) {
						for (recordCounter = 0; recordCounter < report_generic_data.variable.custom.grid_1.dataSource.data().length; recordCounter++) {
							if (report_generic_data.variable.custom.grid_1.dataSource.data()[recordCounter][lattitudeList[lengthCounter]] != "" && report_generic_data.variable.custom.grid_1.dataSource.data()[recordCounter][longitudeList[lengthCounter]] != "") {
								report_generic_data.customRequirementHandler.getMyAddress(report_generic_data.variable.custom.grid_1.dataSource.data()[recordCounter][lattitudeList[lengthCounter]], report_generic_data.variable.custom.grid_1.dataSource.data()[recordCounter][longitudeList[lengthCounter]], addressList[lengthCounter], recordCounter);
								report_generic_data.variable.custom.grid_1.refresh();
							} else {
								report_generic_data.variable.custom.grid_1.dataSource.data()[recordCounter][addressList[lengthCounter]] = "";
							}
						}
					}
				}
			}
		},
		misc_btn_click  : function (element, event) {
			if(report_generic_data.variable.custom.miscID == "download") {
				if ($("#report_generic_data_report_code").getVal() == "report_generic_data_hr_report" || $("#report_generic_data_report_code").getVal() == "report_generic_data_finance_report") {
					// first row
					var obj = {
						fields: {
							employee_name: {
								type: "string"
							}
						},
						cells: [{
								value: "Employee Name",
								vAlign: "center",
								hAlign: "center",
								background: "#e5e3e3",
								fontSize: 12,
								fontName: "Arial",
								bold: true
							}
						],
					};
					// forming cloumns
					for (var i = 0; i < report_generic_data.variable.custom.column_datasource.length; i++) {
						obj["cells"].push({
							value: report_generic_data.variable.custom.column_datasource[i].title,
							vAlign: "center",
							hAlign: "center",
							background: "#e5e3e3",
							fontSize: 12,
							fontName: "Arial",
							bold: true
						});
					}
					// forming rows
					for (var i = 0; i < report_generic_data.variable.custom.column_datasource.length; i++) {
						obj["fields"][report_generic_data.variable.custom.column_datasource[i]["field"]] = {
							"field": {
								"type": "string"
							}
						};
					}

					var rows = [{
							cells: obj.cells
						}
					];
					// Configuring the excel sheet
					var data = report_generic_data.variable.custom.grid_2.dataSource.data();
					var keyss = Object.keys(obj.fields);
					for (var i = 0; i < data.length; i++) {
						data[i].srno = (i + 1);
						var cells = [];
						for (var j in obj.fields) {
							var call = report_generic_data.customRequirementHandler.setData_in_export(data[i][j], j);
							cells.push(call);
						}
						rows.push({
							cells: cells
						});
					}
					var columns = [];
					columns.push({
						width: 180
					});
					if ($("#report_generic_data_report_code").getVal() == "report_generic_data_hr_report") {
						for (var j = 1; j < keyss.length; j++) {
							columns.push({
								width: 300
							});
						}
					} else if ($("#report_generic_data_report_code").getVal() == "report_generic_data_finance_report") {
						for (var j = 1; j < keyss.length; j++) {
							columns.push({
								width: 100
							});
						}
					}

					var workbook = new kendo.ooxml.Workbook({
							sheets: [{
									freezePane: {
										rowSplit: 1
									},
									columns: columns,
									title: "Title",
									rows: rows
								}
							]
						});
					kendo.saveAs({
						dataURI: workbook.toDataURL(),
						fileName: "FileName"
					});
				}else if ($("#report_generic_data_report_code").getVal() == "report_generic_data_customer_feedback_report" ) {
					// first row
					var obj = {
						fields : {
							activity_ref_no : {
								type : "string"
							}, asset_id : {
								type : "string"
							}, equipment_id : {
								type : "string"
							}, company_loc : {
								type : "string"
							}, org_lvl_code : {
								type : "string"
							}, customer_name : {
								type : "string"
							}, contact_number : {
								type : "string"
							}, contact_name : {
								type : "string"
							}, overall_feedback : {
								type : "string"
							}, prod_performance : {
								type : "string"
							}, recommend_acopco_to_friend : {
								type : "string"
							}, response_support_rendered : {
								type : "string"
							}, satisfied_with_acopco : {
								type : "string"
							}, techie_competency_level : {
								type : "string"
							}, additional_comments : {
								type : "string"
							}
						},
						cells : [{
								value : "Call Number",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Machine Sr #",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Model",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Region",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Dealer",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Customer Name",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Customer Contact Person",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Contact Number",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Overall Feedback",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Product Performance",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Recommend Acopco",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Support Rendered",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Satisfaction with Acopco",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Technical Competency",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Comments",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}
						],
					};
					var rows = [{
							cells : obj.cells
						}
					];
					// Configuring the excel sheet
					var data = report_generic_data.variable.custom.grid_2.dataSource.data();
					var keyss = Object.keys(obj.fields);
					for (var i = 0; i < data.length; i++) {
						data[i].srno = (i+1);
						var cells = [];
						for (var j in obj.fields) {
							var call = report_generic_data.customRequirementHandler.setData_in_export(data[i][j], j);
							cells.push(call);
						}
						rows.push({
							cells : cells
						});
					}
					var columns = [];
					columns.push({width : 180});
					if($("#report_generic_data_report_code").getVal() == "report_generic_data_customer_feedback_report"){
						for (var j = 1; j < keyss.length; j++) {
							columns.push({width : 300});
						}
					}
					
					var workbook = new kendo.ooxml.Workbook({
							sheets : [{
									freezePane : {
										rowSplit : 1
									},
									columns : columns,
									title : "Title",
									rows : rows
								}
							]
						});
					kendo.saveAs({
						dataURI : workbook.toDataURL(),
						fileName : "Customer Feedback Report.xlsx"
					});
				} else if ($("#report_generic_data_report_code").getVal() == "report_generic_data_fsr_report"){
					var obj = {
						fields : {
							report_no : {
								type : "string"
							}, reportDate : {
								type : "string"
							}, dealerCode : {
								type : "string"
							}, custName : {
								type : "string"
							}, Contact : {
								type : "string"
							}, Post : {
								type : "string"
							}, district : {
								type : "string"
							}, equipment : {
								type : "string"
							}, runningHrs : {
								type : "string"
							}, serialNum : {
								type : "string"
							}, loadHrs : {
								type : "string"
							}, visitDate : {
								type : "string"
							}, accumVolum : {
								type : "string"
							}, contractNum : {
								type : "string"
							}, orderNum : {
								type : "string"
							}, visit_desc : {
								type : "string"
							}, workComments : {
								type : "string"
							}
						},
						cells : [{
								value : "Job No",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Report Date",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Dealer Code",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							},  {
								value : "Customer Name",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Contact",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Post",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "District",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Equipment",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Running Hours",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Serial Number",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Load Hours",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Visit Date",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Accumulated Volume",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Contract Number",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Order Number",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Visit Description",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}, {
								value : "Work Comments",
								vAlign : "center",
								hAlign : "center",
								background : "#e5e3e3",
								fontSize : 12,
								fontName : "Arial",
								bold : true
							}
						],
					};
					var rows = [{
							cells : obj.cells
						}
					];
					// Configuring the excel sheet
					var data = report_generic_data.variable.custom.grid_1.dataSource.data();
					var keyss = Object.keys(obj.fields);
					for (var i = 0; i < data.length; i++) {
						data[i].srno = (i+1);
						var cells = [];
						for (var j in obj.fields) {
							var call = report_generic_data.customRequirementHandler.setData_in_export(data[i][j], j);
							cells.push(call);
						}
						rows.push({
							cells : cells
						});
					}
					var columns = [];
					columns.push({width : 180});
					if($("#report_generic_data_report_code").getVal() == "report_generic_data_fsr_report"){
						for (var j = 1; j < keyss.length; j++) {
							columns.push({width : 300});
						}
					}
					var workbook = new kendo.ooxml.Workbook({
							sheets : [{
									freezePane : {
										rowSplit : 1
									},
									columns : columns,
									title : "Title",
									rows : rows
								}
							]
						});
					kendo.saveAs({
						dataURI : workbook.toDataURL(),
						fileName : "Visit Report.xlsx"
					});
				} else if ($("#report_generic_data_report_code").getVal() == "report_generic_data_spm_report"){
					var obj = {
						fields : {
						 callNo : {
						  type : "string"
						 }, date : {
						  type : "string"
						 }, customer : {
						  type : "string"
						 }, address : {
						  type : "string"
						 }, pincode : {
						  type : "string"
						 }, custContact : {
						  type : "string"
						 }, email : {
						  type : "string"
						 }, mobile : {
						  type : "string"
						 }, email2 : {
						  type : "string"
						 }, comprsrModel : {
						  type : "string"
						 }, compeSerial : {
						  type : "string"
						 }, motorMake : {
						  type : "string"
						 }, motorSerial : {
						  type : "string"
						 }, yearMnfg : {
						  type : "string"
						 }, commissionDate : {
						  type : "string"
						 }, airOilTemp : {
						  type : "string"
						 }, runningHrs : {
						  type : "string"
						 }, loadHrs : {
						  type : "string"
						 }, noOfMotors : {
						  type : "string"
						 }, spmReadingGrp_location1 : {
						  type : "string"
						 }, spmReadingGrp_dbi1 : {
						  type : "string"
						 }, spmReadingGrp_dbm1 : {
						  type : "string"
						 }, spmReadingGrp_dbc1 : {
						  type : "string"
						 },spmReadingGrp_location2 : {
						  type : "string"
						 }, spmReadingGrp_dbi2 : {
						  type : "string"
						 }, spmReadingGrp_dbm2 : {
						  type : "string"
						 }, spmReadingGrp_dbc2 : {
						  type : "string"
						 },spmReadingGrp_location3 : {
						  type : "string"
						 }, spmReadingGrp_dbi3 : {
						  type : "string"
						 }, spmReadingGrp_dbm3 : {
						  type : "string"
						 }, spmReadingGrp_dbc3 : {
						  type : "string"
						 },spmReadingGrp_location4 : {
						  type : "string"
						 }, spmReadingGrp_dbi4 : {
						  type : "string"
						 }, spmReadingGrp_dbm4 : {
						  type : "string"
						 }, spmReadingGrp_dbc4 : {
						  type : "string"
						 },spmReadingGrp_location5 : {
						  type : "string"
						 }, spmReadingGrp_dbi5 : {
						  type : "string"
						 }, spmReadingGrp_dbm5 : {
						  type : "string"
						 }, spmReadingGrp_dbc5 : {
						  type : "string"
						 },spmReadingGrp_location6 : {
						  type : "string"
						 }, spmReadingGrp_dbi6 : {
						  type : "string"
						 }, spmReadingGrp_dbm6 : {
						  type : "string"
						 }, spmReadingGrp_dbc6 : {
						  type : "string"
						 },spmReadingGrp_location7 : {
						  type : "string"
						 }, spmReadingGrp_dbi7 : {
						  type : "string"
						 }, spmReadingGrp_dbm7 : {
						  type : "string"
						 }, spmReadingGrp_dbc7 : {
						  type : "string"
						 },conclusion : {
						  type : "string"
						 }, smpReadings : {
						  type : "string"
						 }, nextSpmCheck : {
						  type : "string"
						 }, remarks : {
						  type : "string"
						 }, custRemarks : {
						  type : "string"
						 }
						},
						cells : [{
						  value : "Call #",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Date",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Customer Name",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Address",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "PinCode",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Customer Contact  Name",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Mobile",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "E mail",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Compressor Model",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Serial No",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Motor Make",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Serial No",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Year of Mfg",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Commissioning date",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }, {
						  value : "Air/ Oil temperature",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Running Hours",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Loading Hours",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "No of motor Start/Stop",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Location 1",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbi 1",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbm 1",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbc 1",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Location 2",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbi 2",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbm 2",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbc 2",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Location 3",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbi 3",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbm 3",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbc 3",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Location 4",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbi 4",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbm 4",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbc 4",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Location 5",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbi 5",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbm 5",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbc 5",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Location 6",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbi 6",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbm 6",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbc 6",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Location 7",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbi 7",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbm 7",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Dbc 7",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Conclusion",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "SPM Readings",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Next SPM check Recommendation on",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Remarks",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 },{
						  value : "Customer remarks if any",
						  vAlign : "center",
						  hAlign : "center",
						  background : "#e5e3e3",
						  fontSize : 12,
						  fontName : "Arial",
						  bold : true
						 }
						],
					};
					var rows = [{
							cells : obj.cells
						}
					];
					// Configuring the excel sheet
					var data = report_generic_data.variable.custom.grid_1.dataSource.data();
					var keyss = Object.keys(obj.fields);
					for (var i = 0; i < data.length; i++) {
						data[i].srno = (i+1);
						var cells = [];
						for (var j in obj.fields) {
							var call = report_generic_data.customRequirementHandler.setData_in_export(data[i][j], j);
							cells.push(call);
						}
						rows.push({
							cells : cells
						});
					}
					var columns = [];
					columns.push({width : 180});
					if($("#report_generic_data_report_code").getVal() == "report_generic_data_spm_report"){
						for (var j = 1; j < keyss.length; j++) {
							columns.push({width : 300});
						}
					}
					var workbook = new kendo.ooxml.Workbook({
							sheets : [{
									freezePane : {
										rowSplit : 1
									},
									columns : columns,
									title : "Title",
									rows : rows
								}
							]
						});
					kendo.saveAs({
						dataURI : workbook.toDataURL(),
						fileName : "SPM Report.xlsx"
					});
				}
			}
		}
	},
	linkEventHandler : {
		trip_route_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_report_generic_data_edit.js"])) {
				report_generic_data.customRequirementHandler.setSelectedRecord();
				if (report_generic_data.variable.custom.selectedRecord.start_lat == "" || report_generic_data.variable.custom.selectedRecord.start_long == "" || report_generic_data.variable.custom.selectedRecord.finish_lat == "" || report_generic_data.variable.custom.selectedRecord.finish_long == "") {
					alert("Trip Path Unavailable.");
					return false;
				} else {
					webNavigationController.gotoNextScreen({
						screenID : "report_generic_data",
						fieldID : "report_generic_data_child_window",
						nextScreenID : "report_generic_data_edit",
						nextScreenName : "Trip Route",
						windowWidth : 1100,
						execute : report_generic_data_edit.constructScreen
					});
				}
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setData_in_export : function (data, j) {
			if (typeof(data) == "string") {
				if (j == "employee_name") {
					var obj = {
						value: data,
						wrap: true,
						vAlign: "bottom",
						hAlign: "center",
						//rowSpan : 3
					};
					return obj;
				} else {
					return data;
				}
			}
			else if($("#report_generic_data_report_code").getVal() == "report_generic_data_customer_feedback_report" || "report_generic_data_fsr_report"|| "report_generic_data_spm_report"){
				if (j == "activity_ref_no") {
					var obj = {
						value : data,
						wrap : true,
						vAlign : "bottom",
						hAlign : "center"
					};
					return obj;
				}else {
					var obj = {
						value : data,
						wrap : true,
						vAlign : "bottom",
						hAlign : "center"
					};
					return obj;
				}
			}
			else {
				if ($("#report_generic_data_report_code").getVal() == "report_generic_data_hr_report") {
					var obj = {
						value: "A: " + data["attendance_in_hrs"] + " hrs [I:" + data["punch_in_time"] + ", O:" + data["punch_out_time"] + "], T: " + data["travel_in_minutes"] + " Mins, W: " + data["work_hrs_assigned_jobs"] + " hrs",
						wrap: true,
						vAlign: "bottom",
						hAlign: "center"
					};
					return obj;
				} else if ($("#report_generic_data_report_code").getVal() == "report_generic_data_finance_report") {
					var obj = {
						value: "D: " + data["travel_distane_in_kms"] + " Kms",
						wrap: true,
						vAlign: "bottom",
						hAlign: "center"
					};
					return obj;
				}
			}
		},
		dynamicColCreation : function (soft_dataSource) {
			var arr = [];
			//var column_req = soft_dataSource;
			var column_req = new kendo.data.DataSource({data: soft_dataSource});
			column_req.read();
			column_req.data();
			column_req.group([{"field" : "question_code"}]);
			var req_column_datasource = column_req.view();
			for(var i = 0; i < req_column_datasource.length; i++){
				arr.push({field: req_column_datasource[i].value, title: req_column_datasource[i].value});
			}
			return arr;
		},
		getDifference_of_dates : function (first, last) {
			var fromm = new Date(first), too = new Date(last);
			var obj = {arr : [], obj : {}};
			obj.diff = (too - fromm) / (1000 * 60 * 60 * 24);
			obj.arr.push({field: "D_" + kendo.toString(new Date(fromm), "yyyy_MM_dd"), title: kendo.toString(new Date(fromm), "dd/MM")});
					 
												 
			for(var i = 0; i < obj.diff; i++){
				fromm.setDate(fromm.getDate() + 1);
				obj.arr.push({field: "D_" + kendo.toString(new Date(fromm), "yyyy_MM_dd"), title: kendo.toString(new Date(fromm), "dd/MM")});
			}
			return obj;
		},
		getFilterValues : function () {
			return $("#report_generic_data_content_2").getInputparamXML({
				screenID : "report_generic_data",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			report_generic_data.variable.custom.selectedRecord = report_generic_data.variable.custom.grid_1.dataSource.getByUid(report_generic_data.variable.custom.grid_1.select().data("uid"));
		},
		getDatasourceSchema : function () {
			var currentConfig,
			configurationParamNode,
			dataSourceNode,
			currentDataSourceNode,
			fieldNodes,
			fieldCounter,
			schemaModelFields,
			fieldProperty,
			codeTypeNode,
			codeFieldNode,
			parentCodeFieldNode,
			identifierNode,
			idField;
			currentConfig = webConfigurationEngine.getUiConfigurationObject("report_generic_data");
			schemaModelFields = {};
			if (currentConfig != undefined) {
				configurationParamNode = currentConfig.configuration.getElementsByTagName(report_generic_data.variable.standard.configurationParam)[0];
				if (configurationParamNode != undefined) {
					dataSourceNode = configurationParamNode.getElementsByTagName("datasource")[0];
					if (dataSourceNode != undefined) {
						currentDataSourceNode = dataSourceNode.getElementsByTagName("datasource_1")[0];
						if (currentDataSourceNode != undefined) {
							idField = currentDataSourceNode.getAttribute("id");
							fieldNodes = currentDataSourceNode.getElementsByTagName("field");
							for (fieldCounter = 0; fieldCounter < fieldNodes.length; fieldCounter++) {
								fieldProperty = {
									editable : true
								};
								codeTypeNode = fieldNodes[fieldCounter].getElementsByTagName("codeType")[0];
								if (codeTypeNode != undefined) {
									fieldProperty.codeType = codeTypeNode.childNodes[0].nodeValue;
								};
								codeFieldNode = fieldNodes[fieldCounter].getElementsByTagName("codeField")[0];
								if (codeFieldNode != undefined) {
									fieldProperty.codeField = codeFieldNode.childNodes[0].nodeValue;
								};
								parentCodeFieldNode = fieldNodes[fieldCounter].getElementsByTagName("parentCodeField")[0];
								if (parentCodeFieldNode != undefined) {
									fieldProperty.parentCodeField = parentCodeFieldNode.childNodes[0].nodeValue;
								};
								identifierNode = fieldNodes[fieldCounter].getElementsByTagName("identifier")[0];
								if (identifierNode != undefined) {
									fieldProperty.identifier = identifierNode.childNodes[0].nodeValue;
								};
								schemaModelFields[fieldNodes[fieldCounter].getAttribute("id")] = fieldProperty;
							}
						}
					}
				}
			};
			if (Object.keys(schemaModelFields).length != 0) {
				if (idField != null) {
					return {
						id : idField,
						fields : schemaModelFields
					};
				} else {
					return {
						fields : schemaModelFields
					};
				}
			} else {
				return false;
			}
		},
		getMyAddress : function (latitude, longitude, address, index) {
			var geocoder,
			latitudeLongitude;
			geocoder = new google.maps.Geocoder();
			latitudeLongitude = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
			geocoder.geocode({
				'latLng' : latitudeLongitude
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					report_generic_data.variable.custom.grid_1.dataSource.data()[index][address] = results[0].formatted_address;
					report_generic_data.variable.custom.grid_1.refresh();
				} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
					setTimeout(function () {
						if (typeof(report_generic_data) == "undefined") {
							report_generic_data.customRequirementHandler.getMyAddress(latitude, longitude, address, index);
						}
					}, 2000);
				}
			});
		},
		getExportConfig : function (gridId) {
			if(gridId == "report_generic_data_grid_1_export_btn"){
				return {
					type : "csv",
					template : $("#report_generic_data_report_code").getVal(),
					service : "sp_report_information_for_custom_report_builder",
					request : "<signature><i_inputparam_xml>" + report_generic_data.customRequirementHandler.getFilterValues() + "</i_inputparam_xml><i_report_code>" + $("#report_generic_data_report_code").getVal() + "</i_report_code><o_retrieve_status></o_retrieve_status></signature>",
					length : report_generic_data.variable.custom.grid_1.dataSource.data().length
				};
			}
		}
	},
	widgetEventHandler : {
		report_code_change : function (element, event) {
			var gridColumns;
			$("#report_generic_data_screen_title, #report_generic_data_content_2").html("");
			if ($("#report_generic_data_report_code").getVal() == "") {
				report_generic_data.variable.standard.configurationParam = "report_generic_data_default";
				$("#report_generic_data_content_2").next().hide();
				$("#report_generic_data_report_code_lbl").text("");
				$("#report_generic_data_report_code_lbl").append("<span class = 'required'>*</span>");
			} else {
				report_generic_data.variable.standard.configurationParam = $("#report_generic_data_report_code").getVal();
				$("#report_generic_data_content_2").next().show();
			};
			gridColumns = webConfigurationEngine.getGridColumns({
					screenID : "report_generic_data",
					fieldID : "grid_1",
					configurationParam : report_generic_data.variable.standard.configurationParam
				});
			report_generic_data.variable.custom.grid_1.setOptions({
				columns : gridColumns
			});
			//$("#report_generic_data").find(".k-grid-toolbar").hide();
			$("#report_generic_data").createConfiguredFields(report_generic_data.variable.standard.configurationParam);
			$("#report_generic_data").applyConfiguredLabels(report_generic_data.variable.standard.configurationParam);
			$("#report_generic_data").reorderScreenFields(report_generic_data.variable.standard.reorderParam, report_generic_data.variable.standard.configurationParam);
			report_generic_data.variable.custom.grid_1.dataSource.data([]);
			report_generic_data.variable.custom.grid_1.dataSource.options.schema.model = report_generic_data.customRequirementHandler.getDatasourceSchema();
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}, {
					contentID : "content_2",
					columnLength : 3
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "report_generic_data_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "report_generic_data_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			configurationParam : "report_generic_data_default"
		},
		custom : {},
	}
};
