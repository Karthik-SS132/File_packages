function fn_report_timecard_analysis_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [ 
						"./webui/scripts/js/fn_report_timecard_analysis_add_filter.js",	
					  ];				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);	
	if (loadRetStatus == 1)		return false;
	return true;
}

function fn_report_timecard_analysis()
{
	screenChangeInd='';
	$("#report_timecard_analysis_heading_title").text(MenuTitle);
	$("#report_timecard_analysis_tabstrip").kendoTabStrip();
	p_inputparam_xml = "";
	report_metrics_data = [];
	chart_array= [];
	series_type_array=[];
	groupdata=[];
	
	year_data=LoadYearFilter();
	quarter_data=LoadQuarterFilter();
	month_data=LoadMonthFilter();
	week_of_month_data=LoadWeekOfMonthFilter();
	day_of_week_data=[{"text" :"Current","value":"Current"},{"text" :"Previous","value":"Previous"},{"text" :"0","value":"Sunday"},{"text" :"1","value":"Monday"},{"text" :"2","value":"Tuesday"},{"text" :"3","value":"Wednesday"},{"text" :"4","value":"Thursday"},{"text" :"5","value":"Friday"},{"text" :"6","value":"Saturnday"}];
	allocation_category_data=[{"description" :"General","code":"G"},{"description" :"Call","code":"C"},{"description" :"Joborder","code":"J"}];
	allocation_type_data=[{"description" :"LEAVE","code":"LEAVE","linkvalue":"G"},{"description" :"OTHER","code":"OTHER","linkvalue":"G"},{"description" :"PLANIDLE","code":"PLANIDLE","linkvalue":"G"},
	{"description" :"Unwell","code":"UNWELL","linkvalue":"G"},{"description" :"Arrange Tools","code":"ARNGTOOL","linkvalue":"C"},{"description" :"Travel","code":"TRAVEL","linkvalue":"C"},
	{"description" :"Work","code":"WORK","linkvalue":"C"},{"description" :"Travel","code":"TRAVEL","linkvalue":"J"},{"description" :"Work","code":"WORK","linkvalue":"J"}];
	
	
	scall_metric_array=new Array();
	call_filtered_array=new Array();	
	var temp_array = new kendo.data.ObservableArray([]);
	var report_timecard_analysis_datasource_1_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10});		
	report_timecard_analysis_grid_1 = InitializeKendoGrid(
	{
		sectionID: "report_timecard_analysis_detail_1",
		toolbar: false,
		dataSource: report_timecard_analysis_datasource_1_temp,
		height: 400,
		pageSize: 10,
		resizable:true,
		sortable:true,
		pageable:true,
		filterable:false,
		favourite:true
	});	
	
	$("#report_timecard_analysis_grid_1 .k-grid-content").css("height","332px");
	var report_timecard_analysis_datasource_2_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10});		
	report_timecard_analysis_grid_2 = InitializeKendoGrid(
	{
		sectionID: "report_timecard_analysis_detail_2",
		//toolbar: "report_timecard_analysis_grid_1_toolbar_template",
		dataSource: report_timecard_analysis_datasource_2_temp,
		height: 400,
		pageSize: 10,
		resizable:true,
		sortable:true,
		pageable:true,
		filterable:false,
		
	});	
	screen_id_for_retrieve  = '';
	manage_display_chart();
	
	
	$('#report_timecard_analysis_retrieve').on("click",function()
	{
		
		var xml = GetInputParamXML("report_timecard_analysis_header_1");	
		var filters_xml = loadXMLString(xml);
		var length = filters_xml.childNodes[0].childNodes.length;
		for(var i =0;i<length ;i++)
		{
			
			if(filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue  != "ALL")
			{
				var DataRole = $("#report_timecard_analysis_"+filters_xml.childNodes[0].childNodes[i].nodeName).data("role")
				if(DataRole == "dropdownlist" || DataRole == "combobox" || DataRole == "datepicker" || DataRole == "multiselect" )
				{
					eval("report_timecard_analysis_"+filters_xml.childNodes[0].childNodes[i].nodeName+'.enable(false)');
				}
				else
				{
					
					$("#report_timecard_analysis_"+filters_xml.childNodes[0].childNodes[i].nodeName).attr("disabled",true);
				}
			}
		} 
		retrieveData(xml);
	});
	
	$('#report_timecard_analysis_reset_filter').on("click",function()
	{
		var header_filtered_value=[];
		var input_xml = GetInputParamXML("report_timecard_analysis_header_1");
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
				
				var DataRole = $("#report_timecard_analysis_"+header_filtered_value[i].nodeName).data("role")
				if(DataRole == "dropdownlist" || DataRole == "combobox" || DataRole == "datepicker" || DataRole == "multiselect" )
				{
					
					eval("report_timecard_analysis_"+header_filtered_value[i].nodeName+'.value("ALL")');
					eval("report_timecard_analysis_"+header_filtered_value[i].nodeName+'.enable(true)');
				}
				else
				{
					$("#report_timecard_analysis_"+header_filtered_value[i].nodeName).val("ALL");
					$("#report_timecard_analysis_"+header_filtered_value[i].nodeName).attr("disabled",false);
				}
			}
			$(".display_description[data-for='report_timecard_analysis_"+header_filtered_value[i].nodeName+"']").text('');
		}
		
		report_timecard_analysis_grid_1.dataSource.data([]);
		report_timecard_analysis_grid_2.dataSource.data([]);
		report_timecard_analysis_datasource_1.data([]);
		report_metrics_data = [];
		chart_array= [];
		series_type_array=[];
		groupdata=[];
		manage_display_chart();
	});

	chart_type_data =[{code:"column",description:"Column"},{code:"bar",description:"Bar"},{code:"line",description:"Line"}]
	$("#report_timecard_analysis_chart_type").kendoDropDownList({
	dataTextField: "description",
    dataValueField: "code",
    dataSource:chart_type_data,
	change:function()
	{
		manage_display_chart();
	}
	});
	
	summary_and_series_data= SummaryAndSeriesData("report_timecard_analysis");
	summary_by_data = summary_and_series_data.summary;
	series_by_data = summary_and_series_data.series;
	$("#report_timecard_analysis_chart_series").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:series_by_data,
	change:function()
	{
	
	summary_and_series_by();
	
	}
	});
	report_timecard_analysis_chart_series = $("#report_timecard_analysis_chart_series").data("kendoDropDownList");
	$("#report_timecard_analysis_chart_all").kendoDropDownList({
	index:0,
	dataTextField: "text",
    dataValueField: "value",
    dataSource:summary_by_data,	
	change:function(e)
	{
	
	summary_and_series_by();
	}
	});
	report_timecard_analysis_chart_all = $("#report_timecard_analysis_chart_all").data("kendoDropDownList");
	
	//AddCustomFilterForReport("report_timecard_analysis");
	ApplyConfiguredLabelsForReport("report_timecard_analysis");

	$('#report_timecard_analysis_add_filter').on('click', function() 
	{
		child_window =  InitializeKendoWindow(
			{
				fieldID: 'report_timecard_analysis_add_filter',
				windowTitle: 'Add Filters',
				windowHeight: 450,
				windowWidth: 900,
				screenID: 'report_timecard_analysis_add_filter'
			});
	});	
	
	$('#report_timecard_analysis_set_preference').on('click', function() 
	{
		set_preference_window=  InitializeKendoWindow(
			{
				fieldID: 'report_timecard_analysis_set_preference',
				windowTitle: '',
				windowHeight: 850,
				windowWidth: 1000,
				screenID: 'report_timecard_analysis_child'
			});
	});		
	report_timecard_analysis_datasource_1_schema_model = GetDataSourceSchema("report_timecard_analysis","report_timecard_analysis_datasource_1")
	report_timecard_analysis_datasource_1 = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'json',
				contentType: "application/json; charset=utf-8",	
				url: GetTransportUrl("common_modules", "report_timecard_analysis", "context/outputparam_detail"),
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
						return GetTransportParameter({inputparam: {p_inputparam_xml: p_inputparam_xml}});
				}
			}
		},
		schema: 
		{
			//type:"xml",
			//data:"document/outputparam_detail",
			model: report_timecard_analysis_datasource_1_schema_model,
			parse: function (response)
			{
				return GetDescriptionFieldsForDataSource(response, report_timecard_analysis_datasource_1);
			}
		}
	});	
	report_timecard_analysis_grid_1.dataSource.options.schema = report_timecard_analysis_datasource_1.options.schema;
	ORGLEVEL_DETAILS = [];
	 ORGLEVEL_DETAILS_XML =  executeService_retrieve_listof_values_for_searchcondition({p_inputparam_xml: "<inputparam><lov_code_type>" + "ORGHIERARCHY" + "</lov_code_type></inputparam>"});
	 ORGLEVEL_DETAILS =  ConvertXMLStringToJSONArray(ORGLEVEL_DETAILS_XML);
	 
	 $("#report_timecard_analysis").delegate("span.call_reference_view", "click", function()
	{
		if(LoadJSScripts(["./webui/scripts/js/fn_manage_call_register_edit.js", "../../s_iscripts/retrieve_manage_call_register_details.js"]))
		{
			/*crud_indicator = "V";
			displayLabel = 'Call View';
			selected_call_register_record = report_timecard_analysis_grid_1.dataSource.getByUid(report_timecard_analysis_grid_1.select().data("uid")).call_ref_no;
			$.get('manage_call_register_edit.html', function(data)
			{							
				$("#report_timecard_analysis").hide();
				$("#container").append(data);
				fn_manage_call_register_edit();
			});*/
			
			manage_call_register = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								call_no :  report_timecard_analysis_grid_1.dataSource.getByUid(report_timecard_analysis_grid_1.select().data("uid")).call_ref_no
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "report_timecard_analysis",
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
	DefineFavouritesForFilters("report_timecard_analysis");	
}
	
function summary_and_series_by()
{
	
	if(report_timecard_analysis_datasource_1.data().length != 0)
	{
		
		header_filtered_value=[];
		var input_xml = GetInputParamXML("report_timecard_analysis_header_1");
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
					
					var DataRole  = $("#report_timecard_analysis_" +filters_xml.childNodes[0].childNodes[i].nodeName ).data("role");
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
							var field_name = filters_xml.childNodes[0].childNodes[i].nodeName.replace("_filter","");
							var DataRole = $("#report_invoice_analysis_"+filters_xml.childNodes[0].childNodes[i].nodeName).data("role")
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
			report_timecard_analysis_datasource_1.filter(organogram);
			organogram_data = report_timecard_analysis_datasource_1.view();
			
			organogram_datasource = new kendo.data.DataSource({data:organogram_data});organogram_datasource.read();
				 
		
		}
		else
		{
			report_timecard_analysis_datasource_1.filter([]);
			organogram_data = report_timecard_analysis_datasource_1.view();
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
		
		report_timecard_analysis_grid_1.dataSource.data(header_filtered_array);
		modified_datasource = new kendo.data.DataSource({data:header_filtered_array});modified_datasource.read();
		var category = $("#report_timecard_analysis_chart_all").val();
		var series = $("#report_timecard_analysis_chart_series").val();
		category_desc = category+"_description";
		series_desc = series+"_description";
		chart_array=[];
		grouped_data =[];
		arr=[];summarizedGridData=[];
		if( series == "No series")
		{
			groupdata = [];
			series_type_array = [{"type":"column","field":"value",'name':""}];
			modified_datasource.group({field:category,aggregates:[{field:"time_spent_in_hrs",aggregate:"sum"}]});
			 grouped_data = modified_datasource.view();
			 if(grouped_data.length != 0)
			 {
				$.each(grouped_data,function(index,element){
					if(report_timecard_analysis_chart_summary.dataItem().display == "description")
						{
							
							if( element.items[0][category_desc] != "" &&  element.items[0][category_desc] != undefined)
							{
								var category_desc_value = element.items[0][category_desc];
							}	
						}
						else if(report_timecard_analysis_chart_summary.dataItem().display == "code")
						{
						
							category_desc_value = element.items[0][category];
						}
						else
						{
							
							if( element.items[0][category_desc] != "" &&  element.items[0][category_desc] != undefined)
							{
								var category_desc_value = element.items[0][category_desc];
							}
							else
							{
								category_desc_value = element.items[0][category];
							}
						
						}
					chart_array.push({
						category : element.items[0][category],
						value    : element.aggregates.time_spent_in_hrs.sum,
						category_desc :category_desc_value,
					});
					summarizedGridData.push({
						summary_by : category_desc_value,
						time_spent    : element.aggregates.time_spent_in_hrs.sum,
						
					});
				});
				report_timecard_analysis_grid_2.dataSource.data(summarizedGridData);
			}
			else
			{
				groupdata = [];
				series_type_array = [{"field":"value",'name':""}];
				chart_array = '[{"category_desc":"There is no data for the chosen criteria"}]';
			}
		}
		else
		{
			x_axis = [];y_axis = [];
			modified_datasource.group([{field:category}]);
			x_axis = modified_datasource.view();
			modified_datasource.group([{field:series}]);
			y_axis = modified_datasource.view();
			if(x_axis.length != 0 && y_axis.length != 0)
			{
				groupdata = [{"field": "series"}];
				 series_type_array =[{"type":"column","field": "value","name":"#:group.value#"}];
				$.each(x_axis,function(index1,element1){
					$.each(y_axis,function(index2,element){
						modified_datasource.filter([{ field: category, operator: "eq", value: element1.value },{ field: series, operator: "eq", value: element.value }]);
						arr = modified_datasource.view(); 
						final_data = "";
						if(arr.length!= 0)
						{
							ds = new kendo.data.DataSource({data:arr[0].items});ds.read();
							ds.aggregate([{field:"time_spent_in_hrs",aggregate:"sum"}]);
							final_data = ds.aggregates().time_spent_in_hrs.sum;
						}
						if( element1.items[0][category_desc] != "" &&  element1.items[0][category_desc] != undefined)
						{
							var category_desc_value = element1.items[0][category_desc];
						}
						else
						{category_desc_value = element1.items[0][category];}
						if( element.items[0][series_desc] != "" &&  element.items[0][series_desc] != undefined)
						{
							var seriec_desc_value = element.items[0][series_desc];
						}
						else
						{seriec_desc_value = element.items[0][series];}
						chart_array.push({
							category:element1.items[0][category],
							series:element.items[0][series],
							value:final_data,
							category_desc :category_desc_value,
							series_desc_list : seriec_desc_value,
						});
						if(final_data != "")
						{
							summarizedGridData.push({
								summary_by : category_desc_value,
								series_by : seriec_desc_value,
								time_spent    : final_data
								
							
							});
						}
						
					});
				});
				report_timecard_analysis_grid_2.dataSource.data(summarizedGridData);
			}
			else
			{
				groupdata = [];
				series_type_array = [];
				//chart_array = [{"category":"There is no data for the chosen criteria","category_desc":"There is no data for the chosen criteria"}];
				chart_array = [];
				alert("No data");
			}
			
		}
	}
	else
	{
		groupdata = [];
		series_type_array = [];
		//chart_array = [{"category":"There is no data for the chosen criteria","category_desc":"There is no data for the chosen criteria"}];
		chart_array = [];
		
	}
	manage_display_chart();
}
	
function manage_display_chart()
{
	if(series_type_array.length != 0)
	{
		series_type_array[0].type = $("#report_timecard_analysis_chart_type").val();
	}
	$("#report_timecard_analysis_chart").kendoChart({
		theme: $(document).data("kendoSkin") || "silver",
		dataSource: {
			data: chart_array,
			group: groupdata,
			sort: [{field: "category", dir: "asc"}] 
		},
		title: {
			text: MenuTitle
		},
		legend: {
			position: "right"
		},
		seriesDefaults: 
		{
			//type: "column",
			// stack: true,
			labels: {
				visible: true,
				format: "{0}"
			}  
		},
		series:series_type_array,
		categoryAxis: 
		{
			field: "category_desc",
			title:
			{
				text:""
			}
		} ,
		valueAxis:
		{
			field: "total_jo_array",
			majorUnit: 100,
			title:
			{
			text:"Time spent in hours"
			}
			
		},	
		 tooltip:
		 {
			visible: true,
			format: "{0}",
			template:"#= series.name #: #= value #"
		}
				
	}); 
	refresh() ;
}	
function refresh() {
	var chart = $("#report_timecard_analysis_chart").data("kendoChart");
	series = chart.options.series;
	type = $("#report_timecard_analysis_chart_type").val();
	// stack = $("#stack").prop("checked");
	length = series.length;
	//for (var i = 0; i < length; i++) {
		// series[i].stack = stack;
		//series[i].type = type;
	//};
	chart.options.seriesDefaults.type = type;
	if( $("#report_timecard_analysis_chart_series").val() != "No series")
	{
		for (var k= 0;k < length; k++) {
			chart.options.series[k].name = chart.options.series[k].data[0].series_desc_list;
		};
	}
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
function retrieveData(xml)
{
	p_inputparam_xml = xml;	
	report_timecard_analysis_grid_1.dataSource.data([]);
	report_timecard_analysis_grid_2.dataSource.data([]);
	report_timecard_analysis_datasource_1.data([]);
	$("#spinner").show();
	report_timecard_analysis_datasource_1.read();
	report_metrics_data=report_timecard_analysis_datasource_1.data();
	no_jo=report_metrics_data.length;
	total_jo='[{"field":"no_jo"}]';
	total_jo_array=$.parseJSON(total_jo);
}
function fn_report_timecard_analysis_PreImport()
{
	return true;
}
function fn_report_timecard_analysis_PostImport()
{
	return true;
}
function fn_report_timecard_analysis_PreExport()
{
	exportConfiguration = {
		mode:'multiple',
		content:[{
			exportType:"grid",
			fieldId:"report_timecard_analysis_grid_1",
			dispalyLabel:"Detailed Data"
		},
		{
			exportType:"grid",
			fieldId:"report_timecard_analysis_grid_2",
			dispalyLabel:"Summarized Data"
		},
		{
			exportType:"chart",
			fieldId:"report_timecard_analysis_chart",
			dispalyLabel:"Chart"
		}]
	};
	return exportConfiguration;
}
function fn_report_timecard_analysis_PostExport()
{
	return true;
}
function fn_report_timecard_analysis_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"report_timecard_analysis_grid_1",
			dispalyLabel:"Data Export"
		}]
	};
	return printConfiguration;
}
function fn_report_timecard_analysis_PostPrint()
{
	return true;
}