function fn_report_sla_analysis_sc_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [ 
						"./webui/scripts/js/fn_report_sla_analysis_sc_add_filter.js",
					  ];
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);
	
	if (loadRetStatus == 1)		return false;
	return true;
}
function fn_report_sla_analysis_sc()
{
	
	screenChangeInd='';
	tat_uom = '';
	$("#report_sla_analysis_sc_tabstrip").kendoTabStrip();
	p_inputparam_xml="";
	report_metrics_data = [];
	chart_array= [];
	series_type_array=[];
	groupdata=[];
	
	$("#report_sla_analysis_sc_heading_title").text(MenuTitle);
	year_data=LoadYearFilter();
	quarter_data=LoadQuarterFilter();
	month_data=LoadMonthFilter();
	week_of_month_data=LoadWeekOfMonthFilter();
	day_of_week_data=[{"text" :"Current","value":"Current"},{"text" :"Previous","value":"Previous"},{"text" :"0","value":"Sunday"},{"text" :"1","value":"Monday"},{"text" :"2","value":"Tuesday"},{"text" :"3","value":"Wednesday"},{"text" :"4","value":"Thursday"},{"text" :"5","value":"Friday"},{"text" :"6","value":"Saturnday"}];
	
	sla_tat_array=[{text:"Planned SLA",value:"sla_tat"},{text:"Actual SLA",value:"actual_tat"}];
	chart_type_data =[{code:"column",description:"Column"},{code:"bar",description:"Bar"},{code:"line",description:"Line"}];
	summary_and_series_data= SummaryAndSeriesData("report_sla_analysis_sc");
	summary_by_data = summary_and_series_data.summary;
	
	report_sla_analysis_sc_chart_type = InitializeKendoDropDownList({
		fieldID: "report_sla_analysis_sc_chart_type",
		dataSource:chart_type_data,
		dataTextField: "description",
		dataValueField: "code",
		filterMode: false,
		events: {
			change: "summary_and_series_by"
		},
		template:"description"
	});	
	report_sla_analysis_sc_chart_type.value(chart_type_data[0].code);
	report_sla_analysis_sc_chart_type.options.optionLabel = false;
	report_sla_analysis_sc_chart_type.refresh();
	$('[data-for =report_sla_analysis_sc_chart_type]').text(chart_type_data[0].description);

	report_sla_analysis_sc_chart_summary = InitializeKendoDropDownList({
		fieldID: "report_sla_analysis_sc_chart_summary",
		dataSource:summary_by_data,
		dataTextField: "text",
		dataValueField: "value",
		filterMode: false,
		events: {
			change: "summary_and_series_by"
		},
		template:"description"
	});	
	report_sla_analysis_sc_chart_summary.value(summary_by_data[0].value);
	report_sla_analysis_sc_chart_summary.options.optionLabel = false;
	report_sla_analysis_sc_chart_summary.refresh();
	$('[data-for =report_sla_analysis_sc_chart_summary]').text(summary_by_data[0].text);
		
	screen_id_for_retrieve = "";
	$('#report_sla_analysis_sc_retrieve_btn').on("click",function()
	{
		
		var xml = GetInputParamXML("report_sla_analysis_sc_header_1");	
		var filters_xml = loadXMLString(xml);
		var length = filters_xml.childNodes[0].childNodes.length;
		for(var i =0;i<length ;i++)
		{
			if(filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue  != "ALL")
			{
				eval("report_sla_analysis_sc_"+filters_xml.childNodes[0].childNodes[i].nodeName+'.enable(false)');
			}
		} 
		retrieveData(xml);
	});
	
	$('#report_sla_analysis_sc_reset_filter').on("click",function()
	{
		var header_filtered_value=[];
		var input_xml = GetInputParamXML("report_sla_analysis_sc_header_1");
		var filters_xml = loadXMLString(input_xml);
		var length = filters_xml.childNodes[0].childNodes.length;
		for(var i =0;i<length ;i++)
		{
			header_filtered_value.push({
				nodeName :filters_xml.childNodes[0].childNodes[i].nodeName,
				value:filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue
			});
		}
		for(var i=0;i<header_filtered_value.length;i++)
		{
			if(header_filtered_value[i].value != "ALL")
			{
				eval("report_sla_analysis_sc_"+header_filtered_value[i].nodeName+'.value("ALL")');
				eval("report_sla_analysis_sc_"+header_filtered_value[i].nodeName+'.enable(true)');
			
			}
			$(".display_description[data-for='report_sla_analysis_sc_"+header_filtered_value[i].nodeName+"']").text('');
		}
		
		report_sla_analysis_sc_grid_1.dataSource.data([]);
		report_sla_analysis_sc_grid_2.dataSource.data([]);
		report_sla_analysis_sc_datasource_1.data([]);
		report_metrics_data = [];
		chart_array= [];
		series_type_array=[];
		groupdata=[];
		redrawChart();
	});
	var temp_array = new kendo.data.ObservableArray([]);
	var report_sla_analysis_sc_datasource_1_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10});		
	report_sla_analysis_sc_grid_1 = InitializeKendoGrid(
	{
		sectionID: "report_sla_analysis_sc_detail_1",
		toolbar: false,
		dataSource: report_sla_analysis_sc_datasource_1_temp,
		height: 400,
		pageSize: 10,resizable:true,
		sortable:true,
		pageable:true,
		filterable:false,
		favourite:true
	});	
	$("#report_sla_analysis_sc_grid_1 .k-grid-content").css("height","332px");
	
	var report_sla_analysis_sc_datasource_2_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10});		
	report_sla_analysis_sc_grid_2 = InitializeKendoGrid(
	{
		sectionID: "report_sla_analysis_sc_detail_2",
		//toolbar: "report_sla_analysis_sc_grid_1_toolbar_template",
		dataSource: report_sla_analysis_sc_datasource_2_temp,
		height: 400,
		pageSize: 10,
		resizable:true,
		sortable:true,
		pageable:true,
		filterable:false,
		
	});	
//	AddCustomFilterForReport("report_sla_analysis_sc");
	ApplyConfiguredLabelsForReport("report_sla_analysis_sc");	
		
	$('#report_sla_analysis_sc_add_filter').on('click', function() 
	{
		child_window =  InitializeKendoWindow(
			{
				fieldID: 'report_sla_analysis_sc_window',
				windowTitle: 'Add Filters',
				windowHeight: 450,
				windowWidth: 900,
				screenID: 'report_sla_analysis_sc_add_filter'
			});
	});	
	report_sla_analysis_sc_datasource_1_schema_model = GetDataSourceSchema("report_sla_analysis_sc","report_sla_analysis_sc_datasource_1");
	report_sla_analysis_sc_datasource_1 = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'json',
				contentType: "application/json; charset=utf-8",	
				url: GetTransportUrl("mservice", "report_sla_performance_for_call", "context/outputparam_detail"),
				complete: function(data, textstatus)
				{
					//var returnValue = ProcessTransportResponse(data, textstatus);
					summary_and_series_by();
					$("#spinner").hide();
				}
			},
			parameterMap: function(data, type)
			{
				if (type == "read")
				{
					//return GetTransportParameter("<p_inputparam_xml>"+   getXmlString(p_inputparam_xml) +"</p_inputparam_xml>");
					return GetTransportParameter({inputparam: {p_inputparam_xml: p_inputparam_xml}});
				
				}
			}
		},
		schema: 
		{
		
			model: report_sla_analysis_sc_datasource_1_schema_model,
			
			parse: function (response)
			{
				//return GetDescriptionFieldsForDataSource(response, report_sla_analysis_sc_datasource_1);
				return mserviceUtilities.getDescriptionFields(JSON.parse(JSON.stringify(response).replace(/\\\\n/g, "\\n")), report_sla_analysis_sc_datasource_1_schema_model)
			}
		}
	});	
	
	report_sla_analysis_sc_grid_1.dataSource.options.schema = report_sla_analysis_sc_datasource_1.options.schema;
	 ORGLEVEL_DETAILS_XML =  executeService_retrieve_listof_values_for_searchcondition({p_inputparam_xml: "<inputparam><lov_code_type>" + "ORGHIERARCHY" + "</lov_code_type></inputparam>"});
	 ORGLEVEL_DETAILS =  ConvertXMLStringToJSONArray(ORGLEVEL_DETAILS_XML);
	manage_display_chart();
	$("#report_sla_analysis_sc").delegate("span.call_reference_view", "click", function()
	{
		if(LoadJSScripts(["./webui/scripts/js/fn_manage_call_register_edit.js", "../../s_iscripts/retrieve_manage_call_register_details.js"]))
		{
			/*crud_indicator = "V";
			displayLabel = 'Call View';
			selected_call_register_record = report_sla_analysis_sc_grid_1.dataSource.getByUid(report_sla_analysis_sc_grid_1.select().data("uid")).call_ref_no;
			$.get('manage_call_register_edit.html', function(data)
			{							
				$("#report_sla_analysis_sc").hide();
				$("#container").append(data);
				fn_manage_call_register_edit();
			});*/
			
			manage_call_register = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								call_no :  report_sla_analysis_sc_grid_1.dataSource.getByUid(report_sla_analysis_sc_grid_1.select().data("uid")).call_ref_no
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "report_sla_analysis_sc",
					nextScreenID : "manage_call_register_edit",
					nextScreenName :'Call View'
				});
				$("#manage_call_register_edit_submit_btn").hide();
				$("#manage_call_register_edit").enableViewMode();
		}
		else
		{
			alert("Sorry. Unable To Proceed. Please Contact Your Technical Support.");
		}
	});
	DefineFavouritesForFilters("report_sla_analysis_sc");
	
	var exportAccess = $.grep(access_profile.user_functional_access, function (element, index) {
		return element.child_screen_id == $("#report_sla_analysis_sc").attr("id");
	})[0];
	if (exportAccess != undefined) {
		if (exportAccess.export_access == "true") {
			$("#report_sla_analysis_sc_chart").append("<button class= 'k-button' id= 'report_sla_analysis_sc_chart_export_btn' style='position:absolute; right:0; cursor:pointer; top: 2%; margin-right:1%;' data-widget-type = 'w_button' data-button-group = 'export' data-button-role = 'chart'>Chart Export</button>");
		} 
	};			 
																			
}

function summary_and_series_by()
{
	if(report_sla_analysis_sc_datasource_1.data().length != 0)
	{
		header_filtered_value=[];
		var input_xml = GetInputParamXML("report_sla_analysis_sc_header_1");
		var filters_xml = loadXMLString(input_xml);
		var length = filters_xml.childNodes[0].childNodes.length;
		temp_array = [];
		organogram = [];
		level_no="";
		for(var i =0;i<length ;i++)
		{
			
			if(filters_xml.childNodes[0].childNodes[i].hasChildNodes() == true)
			{
				
				var node_value = filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue;
				if(filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue !="ALL")
				{
					
					var DataRole  = $("#report_sla_analysis_sc_" +filters_xml.childNodes[0].childNodes[i].nodeName ).data("role");
					
					if(DataRole == "multiselect")
					{
						var val = filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue.split(",");
						
						for(var j =0;j<val.length;j++){
							var sub_obj={};	
							sub_obj.field =filters_xml.childNodes[0].childNodes[i].nodeName.replace("_filter","");
							sub_obj.operator ='eq';
							sub_obj.value =val[j];
							temp_array.push( sub_obj);
						}
					}
					else
					{	
						var field_name = filters_xml.childNodes[0].childNodes[i].nodeName.replace("_filter","");
						if(field_name  == "org_level_no")
						{
							var level_no = parseInt(filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue);
							if(level_no != 1 && level_no != "")
							{
								org_level_no_fields = [];
								var level_no_value = parseInt(filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue);
								for(var k=0;k<login_profile.no_of_org_level;k++)
								{
									if(parseInt(filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue)-1 <= k)
									{
										var obj2={};	
										obj2.field =field_name;
										obj2.operator ='eq';
										obj2.value =level_no_value;
										org_level_no_fields.push(obj2);
										level_no_value++;
										
									}
								}
								var org_filters ={};
								org_filters.filters = [{logic:"or",filters:org_level_no_fields}];
								organogram.push(org_filters);
							}
						}
						else if(field_name  == "org_level_code")
						{
							if(level_no != 1 && level_no != "")
							{
								organogram =[];
								org_level_code_fields = [];
								header_filtered_value = [];
								login_profile.no_of_org_level = 4;
								org_hierarchy = [];
								org_datasource  =new kendo.data.DataSource({data:ORGLEVEL_DETAILS});
								 level_code_value  = "level"+ level_no+"_code" ; 
								 org_datasource.filter({field:level_code_value,opeartor:"eq",value:node_value});
								 org_data = org_datasource.view();
								//console.log(org_data);
								for(var x=0;x<org_data.length;x++)
								{
									for(var y=1;y <= login_profile.no_of_org_level;y++)
									{
										
										if(level_no   <= y || (level_no == login_profile.no_of_org_level) )
										{
											var level_code = "level"+y+"_code";
											if(org_data[x][level_code] != "NA" && org_data[x][level_code] != "" && org_data[x][level_code] != "undefined")
											{
												if($.inArray(org_data[x][level_code],org_hierarchy ) == -1)
												{
													org_hierarchy.push(org_data[x][level_code]);
													var sub_obj={};	
													sub_obj.field =filters_xml.childNodes[0].childNodes[i].nodeName.replace("_filter","");
													sub_obj.operator ='eq';
													sub_obj.value =org_data[x][level_code];
													org_level_code_fields.push(sub_obj);
													
													
												}
											}
										}
									}
								}
								var org_code_filters ={};
								org_code_filters.filters = [{logic:"or",filters:org_level_code_fields}];
								organogram.push(org_code_filters);
								
							//	console.log(organogram);
								org_datasource.filter([]);
								org_datasource.view();
							}
						}
						else
						{
							if(node_value == "Current")
							{
								if(field_name.search('year') != -1)
								{
								  var current_value = new Date().getFullYear();
								}
								else if(field_name.search('qtr') != -1)
								{
									var q = [4,1,2,3];
									var current_value = q[Math.floor(new Date().getMonth() / 3)];
								}
								else if(field_name.search('month') != -1)
								{
								  var current_value = new Date().getMonth()+1;
								}
								else if(field_name.search('wk_of_mth') != -1)
								{
								  var current_value = new Date().getWeek();
								}
								else if(field_name.search('day_of_wk') != -1)
								{
								  var current_value = new Date().getDay();
								}
								var obj1={};	
								obj1.field =filters_xml.childNodes[0].childNodes[i].nodeName.replace("_filter","");
								obj1.operator ='eq';
								obj1.value =current_value;
								header_filtered_value.push(obj1);
								
							}
							else if(node_value == "Previous")
							{
								if(field_name.search('year') != -1)
								{
								  var current_value = new Date().getFullYear()-1;
								}
								else if(field_name.search('qtr') != -1)
								{
									var q = [4,1,2,3];
									var current_value = q[(Math.floor(new Date().getMonth() / 3))-1];
								}
								else if(field_name.search('month') != -1)
								{
								  var current_value = new Date().getMonth()+1-1;
								}
								else if(field_name.search('wk_of_mth') != -1)
								{
								  var current_value = new Date().getWeek()-1;
								}
								else if(field_name.search('day_of_wk') != -1)
								{
									if(new Date().getDay()-1  == -1)
									{
										var current_value = 6;
									}
									else
									{
									  var current_value = new Date().getDay()-1;
									}
								}
								var obj1={};	
								obj1.field =filters_xml.childNodes[0].childNodes[i].nodeName.replace("_filter","");
								obj1.operator ='eq';
								obj1.value =current_value;
								header_filtered_value.push(obj1);
								
							}
							else
							{
								var obj1={};	
								obj1.field =filters_xml.childNodes[0].childNodes[i].nodeName.replace("_filter","");
								obj1.operator ='eq';
								obj1.value =node_value;
								header_filtered_value.push(obj1);
							}
						}
					}
				}
				else
				{
					var node_value = "ALL";
				}
			}
		}
		if(organogram.length != 0)
		{
			report_sla_analysis_sc_datasource_1.filter(organogram);
			organogram_data = report_sla_analysis_sc_datasource_1.view();
			organogram_datasource = new kendo.data.DataSource({data:organogram_data});organogram_datasource.read();
		}
		else
		{
			report_sla_analysis_sc_datasource_1.filter([]);
			organogram_data = report_sla_analysis_sc_datasource_1.view();
			organogram_datasource = new kendo.data.DataSource({data:organogram_data});organogram_datasource.read();
		}
		if(temp_array.length != 0)
		{
			var additional_filters ={};
			additional_filters.filters = [{logic:"or",filters:temp_array}];
			header_filtered_value.push(additional_filters);
		}
	
		organogram_datasource.filter(header_filtered_value);
		header_filtered_array = organogram_datasource.view(); /* old code*/
		
		//report_sla_analysis_sc_datasource_1.data(header_filtered_array)
		report_sla_analysis_sc_grid_1.dataSource.data(header_filtered_array);
		modified_datasource = new kendo.data.DataSource({data:header_filtered_array});modified_datasource.read();
		var category = $("#report_sla_analysis_sc_chart_summary").val();

		category_desc = category+"_description";
		series_desc = series+"_description";
		chart_array=[];
		grouped_data =[];
		arr=[];

		x_axis = [];y_axis = [];summarizedGridData=[];
			modified_datasource.group([{field:category}]);
			x_axis = modified_datasource.view();
			y_axis =sla_tat_array;summarizedGridData = []
			if(x_axis.length != 0 && y_axis[0].value != undefined)
			{
				groupdata = [{"field": "series"}];
				series_type_array =[{"type":"column",'field': "value","name":"#:group.value#"}];
				$.each(x_axis,function(index1,element1){
					$.each(y_axis,function(index2,element){
						
						modified_datasource.filter([{ field: category, operator: "eq", value: element1.value }]);
						tat_uom =  element1.items[0]['sla_tat_uom'];
						arr = modified_datasource.view(); 
						final_data = "";
						if(arr.length!= 0)
						{
							ds = new kendo.data.DataSource({data:arr[0].items});ds.read();
							ds.aggregate([{field:element.value,aggregate:"average"}]);
						
							final_data = eval("ds.aggregates()."+element.value+".average");
						}
						if(report_sla_analysis_sc_chart_summary.dataItem().display == "description") {	
							if( element1.items[0][category_desc] != "" &&  element1.items[0][category_desc] != undefined) {
								var category_desc_value = element1.items[0][category_desc];
							}	
						} else if(report_sla_analysis_sc_chart_summary.dataItem().display == "code") {
							category_desc_value = element1.items[0][category];
						}
						else {	
							if( element1.items[0][category_desc] != "" &&  element1.items[0][category_desc] != undefined) {
								var category_desc_value = element1.items[0][category_desc];
							} else {
								category_desc_value = element1.items[0][category];
							}
						}
						
						chart_array.push({
							category:element1.items[0][category],
							series:element.value,
							value:Math.round(final_data),
							category_desc :category_desc_value,
							series_desc_list : element.text,
						});
						if(final_data != "")
						{
							summarizedGridData.push({
								summary_by : category_desc_value,
								series_by : element.text,
								tat    : Math.round(final_data)
							
							});
						}
						
					});
				});
				report_sla_analysis_sc_grid_2.dataSource.data(summarizedGridData);
			}
			else
			{
				groupdata = [];
				series_type_array = [];
				chart_array = [];
			}
		}
		else
		{
			groupdata = [];
			series_type_array = [];
			chart_array = [];
			//alert("No data");
		}
	redrawChart();
}

function manage_display_chart()
{
	if(series_type_array.length != 0)
	{
		series_type_array[0].type = $("#report_sla_analysis_sc_chart_type").val();
	}
	var uom = "";
	$("#report_sla_analysis_sc_chart").kendoChart({
	   theme: $(document).data("kendoSkin") || "silver",
	   dataSource: {
			data: chart_array,
			group: groupdata,
			sort: [{field: "category", dir: "asc"}] 
		},
		title: {
			text: MenuTitle+uom
		},
		legend: {
			position: "right"
		},
		seriesDefaults: {
			//type: "column",
		   labels: {
				visible: true,
				format: "{0}"
			}
		},
		chartArea: { margin: 0, padding: 0, height: (screen.height * 0.50), width: (screen.width * 0.90) },
		series: series_type_array,
		categoryAxis: 
		{
			field: "category_desc",
			title:
			{
			text:""
			}
			
		} ,
		valueAxis:{
			field: "total_sc_array",
			title:
			{
			text:uom
			}	
		},	
		 tooltip: {
			visible: true,
			format: "{0}",
			template:"#= series.name #: #= value #"
		}
	}); 
	refresh();
}	
function refresh() 
{
	var chart = $("#report_sla_analysis_sc_chart").data("kendoChart");
	series = chart.options.series;
	type = $("#report_sla_analysis_sc_chart_type").val();
  //stack = $("#stack").prop("checked");
	 length = series.length; 
	for (var k= 0;k < length; k++) {
			chart.options.series[k].name = chart.options.series[k].data[0].series_desc_list;
		};
	if(type == "column" || type == "line")
	{
	
		var labels=chart.options.categoryAxis.labels;
		labels.rotation=340;
		labels.font="12px Arial";
	}
	else
	{
	
	var labels=chart.options.categoryAxis.labels;
		labels.rotation=0;
		labels.font="12px Arial";
	
	}
	chart.refresh();
}
function redrawChart()
{
	if(tat_uom != "")
	{
		var uom = "("+tat_uom+")";
	}
	else
	{
		var uom = "";
	}
	var chart = $("#report_sla_analysis_sc_chart").data("kendoChart");
	if(series_type_array.length != 0)
		{
			series_type_array[0].type = $("#report_sla_analysis_sc_chart_type").val();
		}
		chart.setOptions({
			dataSource:{
				data : chart_array,
				group:groupdata,
				sort: [{field: "category", dir: "asc"}] 
			},
			series:series_type_array,
			valueAxis:{
				title:
				{
					text:uom
				}
			},	
		});
		refresh() ;
		chart.redraw();
}
function retrieveData(xml)
{
		p_inputparam_xml = xml;	
		report_sla_analysis_sc_grid_1.dataSource.data([]);
		report_sla_analysis_sc_grid_2.dataSource.data([]);
		report_sla_analysis_sc_datasource_1.data([]);
		$("#spinner").show();
		report_sla_analysis_sc_datasource_1.read();
		report_sla_sc_metric=report_sla_analysis_sc_datasource_1.data (); 
		no_jo=report_sla_sc_metric.length;
		total_sc='[{"field":"no_sc"}]';
		total_sc_array=$.parseJSON(total_sc);			
}
function fn_report_sla_analysis_sc_PreImport()
{
	return true;
}
function fn_report_sla_analysis_sc_PostImport()
{
	return true;
}
function fn_report_sla_analysis_sc_PreExport()
{
	exportConfiguration = {
		mode:'multiple',
		content:[{
			exportType:"grid",
			fieldId:"report_sla_analysis_sc_grid_1",
			dispalyLabel:"Data Export"
		},
		{
			exportType:"grid",
			fieldId:"report_sla_analysis_sc_grid_2",
			dispalyLabel:"Summarized Data"
		},
		{
			exportType:"chart",
			fieldId:"report_sla_analysis_sc_chart",
			dispalyLabel:"Chart"
		}]
	};
	return exportConfiguration;
}
function fn_report_sla_analysis_sc_PostExport()
{
	return true;
}
function fn_report_sla_analysis_sc_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"report_sla_analysis_sc_grid_1",
			dispalyLabel:"Data Export"
		}]
	};
	return printConfiguration;
}
function fn_report_sla_analysis_sc_PostPrint()
{
	return true;
}
function fn_report_sla_analysis_sc_getExportConfig(gridId) {
	if(gridId == "report_sla_analysis_sc_grid_1_export_btn"){
		return {
			type : "csv",
			template : "report_sla_analysis_sc",
			service : "sp_report_sla_performance_for_call",
			request : "<signature><i_inputparam_xml>" + p_inputparam_xml + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
			length : report_sla_analysis_sc_datasource_1._pristineData.length
		};
	}
};															