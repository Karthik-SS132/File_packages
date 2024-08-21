function fn_report_workflow_analysis_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [ 
						"./webui/scripts/js/fn_report_workflow_analysis_add_filter.js"
					  ];				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);	
	if (loadRetStatus == 1)		return false;
	return true;
}

function fn_report_workflow_analysis()
{
	
	screenChangeInd='';report_uom_desc = "";
	$("#report_workflow_analysis_heading_title").text(MenuTitle);
	report_workflow_analysis_tabstrip = $("#report_workflow_analysis_tabstrip").kendoTabStrip().data("kendoTabStrip");

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
	

	call_filtered_array=new Array();	
	var temp_array = new kendo.data.ObservableArray([]);
	var report_workflow_analysis_datasource_1_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10});		
	report_workflow_analysis_grid_1 = InitializeKendoGrid(
	{
		sectionID: "report_workflow_analysis_detail_1",
		//toolbar: "report_workflow_analysis_grid_1_toolbar_template",
		dataSource: report_workflow_analysis_datasource_1_temp,
		height: 400,
		pageSize: 10,
		resizable:true,
		sortable:true,
		pageable:true,
		filterable:false,
		favourite:true
	});	
	
	$("#report_workflow_analysis_grid_1 .k-grid-content").css("height","332px");
	var report_workflow_analysis_datasource_2_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10});		
	report_workflow_analysis_grid_2 = InitializeKendoGrid(
	{
		sectionID: "report_workflow_analysis_detail_2",
		//toolbar: "report_workflow_analysis_grid_1_toolbar_template",
		dataSource: report_workflow_analysis_datasource_2_temp,
		height: 400,
		pageSize: 10,
		resizable:true,
		sortable:true,
		pageable:true,
		filterable:false,
		
	});	
	screen_id_for_retrieve  = '';
	manage_display_chart();
	
	
	$('#report_workflow_analysis_retrieve_btn').on("click",function()
	{
		
		var xml = GetInputParamXML("report_workflow_analysis_header_1");	
		var filters_xml = loadXMLString(xml);
		var length = filters_xml.childNodes[0].childNodes.length;
		for(var i =0;i<length ;i++)
		{
			
			if(filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue  != "ALL")
			{
				var DataRole = $("#report_workflow_analysis_"+filters_xml.childNodes[0].childNodes[i].nodeName).data("role")
				if(DataRole == "dropdownlist" || DataRole == "combobox" || DataRole == "datepicker" || DataRole == "multiselect" )
				{
					eval("report_workflow_analysis_"+filters_xml.childNodes[0].childNodes[i].nodeName+'.enable(false)');
				}
				else
				{
					
					$("#report_workflow_analysis_"+filters_xml.childNodes[0].childNodes[i].nodeName).attr("disabled",true);
				}
			}
		} 
		retrieveData(xml);
	});
	
	$('#report_workflow_analysis_reset_filter').on("click",function()
	{
		var header_filtered_value=[];
		var input_xml = GetInputParamXML("report_workflow_analysis_header_1");
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
				
				var DataRole = $("#report_workflow_analysis_"+header_filtered_value[i].nodeName).data("role")
				if(DataRole == "dropdownlist" || DataRole == "combobox" || DataRole == "datepicker" || DataRole == "multiselect" )
				{
					
					eval("report_workflow_analysis_"+header_filtered_value[i].nodeName+'.value("ALL")');
					eval("report_workflow_analysis_"+header_filtered_value[i].nodeName+'.enable(true)');
				}
				else
				{
					$("#report_workflow_analysis_"+header_filtered_value[i].nodeName).val("ALL");
					$("#report_workflow_analysis_"+header_filtered_value[i].nodeName).attr("disabled",false);
				}
			}
			$(".display_description[data-for='report_workflow_analysis_"+header_filtered_value[i].nodeName+"']").text('');
		}
		
		report_workflow_analysis_grid_1.dataSource.data([]);
		report_workflow_analysis_grid_2.dataSource.data([]);
		report_workflow_analysis_datasource_1.data([]);
		report_metrics_data = [];
		chart_array= [];
		series_type_array=[];
		series_type_array=[];
		groupdata=[];
		redrawChart();
	});

	chart_type_data =[{code:"column",description:"Column"},{code:"stacked",description:"Stacked"},{code:"line",description:"Line"}]
	summary_and_series_data= SummaryAndSeriesData("report_workflow_analysis");
	
	series_by_data = summary_and_series_data.series;
	
	report_workflow_analysis_chart_type = InitializeKendoDropDownList({
		fieldID: "report_workflow_analysis_chart_type",
		dataSource:chart_type_data,
		dataTextField: "description",
		dataValueField: "code",
		filterMode: false,
		events: {
			change: "summary_and_series_by"
		},
		template:"description"
	});	
	report_workflow_analysis_chart_type.value(chart_type_data[0].code);
	report_workflow_analysis_chart_type.options.optionLabel = false;
	report_workflow_analysis_chart_type.refresh();
	$('[data-for =report_workflow_analysis_chart_type]').text(chart_type_data[0].description);
	
	report_workflow_analysis_chart_summary = InitializeKendoDropDownList({
		fieldID: "report_workflow_analysis_chart_summary",
		dataSource:series_by_data,
		dataTextField: "text",
		dataValueField: "value",
		filterMode: false,
		events: {
			change: "summary_and_series_by"
		},
		template:"description"
	});	
	report_workflow_analysis_chart_summary.value(series_by_data[0].value);	
	report_workflow_analysis_chart_summary.options.optionLabel = false;
	report_workflow_analysis_chart_summary.refresh();
	$('[data-for =report_workflow_analysis_chart_summary]').text(series_by_data[0].text);
	summary_by_data =[{value:"stage",text:"Stage"},{value:"status",text:"Status"},{value:"total",text:"Total Time"}] ;
	list_of_codes = [];code_type = "CALLSTATUS";search_field_1="";search_field_2="";
	executeService_retrieve_listof_values_for_codes();
	statusData  = list_of_codes ;
	retrieve_listof_values_object={p_lov_code:"CALLSTAGE",p_search_field_1:"",p_search_field_2:"",p_search_field_3:"",p_search_field_4:"",p_search_field_5:""}
	stageData = executeService_retrieve_listof_values(retrieve_listof_values_object)
	
	report_workflow_analysis_chart_series = InitializeKendoDropDownList({
		fieldID: "report_workflow_analysis_chart_series",
		dataSource:summary_by_data,
		dataTextField: "text",
		dataValueField: "value",
		filterMode: false,
		events: {
			change: "fn_report_workflow_analysis_chart_series_change_event"
		},
		template:"description"
	});	
	report_workflow_analysis_chart_series.value(summary_by_data[0].value);
	report_workflow_analysis_chart_series.options.optionLabel = false;
	report_workflow_analysis_chart_series.refresh();
	$('[data-for =report_workflow_analysis_chart_series]').text(summary_by_data[0].text);
	report_workflow_analysis_uom_default_value = "h";
	
	report_workflow_analysis_uom_datasource_1 = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'json',
				contentType: "application/json; charset=utf-8",	
				url: GetTransportUrl("common_modules", "retrieve_listof_values_for_codes", "context/outputparam"),
				complete: function(data, textstatus)
				{
					report_workflow_analysis_uom.options.optionLabel = '';
					report_workflow_analysis_uom.refresh();
				}
			},
			parameterMap: function(data, type)
			{
				if (type == "read")
				{
					return GetTransportParameter({inputparam: {p_lov_code_type:"REPORTSDURUOM",p_search_field_1:"",p_search_field_2:""}});
				}
			}
		},
		schema: 
		{
			model: {
				fields: {
					p_code_value: {editable: true},
					p_code_value_description: {editable: true},
					
				}
			}
		}
	});	
	report_workflow_analysis_uom = InitializeKendoDropDownList({
		fieldID: "report_workflow_analysis_uom",
		dataSource: report_workflow_analysis_uom_datasource_1,
		dataTextField: "p_code_value_description",
		dataValueField: "p_code_value",
		filterMode: false,
		defaultValue: report_workflow_analysis_uom_default_value,
		events: {
			change: "summary_and_series_by"
		},
		/*defaultValueDescription: {
			codeType: "CALLPRIORITY"
		},*/
	});	
	$('[data-for="report_workflow_analysis_uom"]').text('hours');
	
	
	//AddCustomFilterForReport("report_workflow_analysis");
	ApplyConfiguredLabelsForReport("report_workflow_analysis");

	$('#report_workflow_analysis_add_filter').on('click', function() 
	{
		child_window =  InitializeKendoWindow(
			{
				fieldID: 'report_workflow_analysis_add_filter',
				windowTitle: 'Add Filters',
				windowHeight: 450,
				windowWidth: 900,
				screenID: 'report_workflow_analysis_add_filter'
			});
	});	
	
	$('#report_workflow_analysis_set_preference').on('click', function() 
	{
		set_preference_window=  InitializeKendoWindow(
			{
				fieldID: 'call_metrics_set_preference',
				windowTitle: '',
				windowHeight: 850,
				windowWidth: 1000,
				screenID: 'report_workflow_analysis_child'
			});
	});		
	report_workflow_analysis_datasource_1_schema_model = GetDataSourceSchema("report_workflow_analysis","report_workflow_analysis_datasource_1")
	report_workflow_analysis_datasource_1 = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'json',
				contentType: "application/json; charset=utf-8",	
				url: GetTransportUrl("mservice", "report_workflow_time_analysis", "context/outputparam_detail"),
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
			
			model: report_workflow_analysis_datasource_1_schema_model,
			
			parse: function (response)
			{
				//return GetDescriptionFieldsForDataSource(response, report_workflow_analysis_datasource_1);
				return mserviceUtilities.getDescriptionFields(JSON.parse(JSON.stringify(response).replace(/\\\\n/g, "\\n")), report_workflow_analysis_datasource_1_schema_model);
			}
		}
	});	
	report_workflow_analysis_grid_1.dataSource.options.schema = report_workflow_analysis_datasource_1.options.schema;
	 ORGLEVEL_DETAILS_XML =  executeService_retrieve_listof_values_for_searchcondition({p_inputparam_xml: "<inputparam><lov_code_type>" + "ORGHIERARCHY" + "</lov_code_type></inputparam>"});
	 ORGLEVEL_DETAILS =  ConvertXMLStringToJSONArray(ORGLEVEL_DETAILS_XML);
	 
	 $("#report_workflow_analysis").delegate("span.call_reference_view", "click", function()
	{
		if(LoadJSScripts(["./webui/scripts/js/fn_manage_call_register_edit.js", "../../s_iscripts/retrieve_manage_call_register_details.js"]))
		{
			/*crud_indicator = "V";
			displayLabel = 'Call View';
			selected_call_register_record = report_workflow_analysis_grid_1.dataSource.getByUid(report_workflow_analysis_grid_1.select().data("uid")).call_ref_no;
			$.get('manage_call_register_edit.html', function(data)
			{							
				$("#report_workflow_analysis").hide();
				$("#container").append(data);
				fn_manage_call_register_edit();
			});*/
			
			manage_call_register = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								call_no :  report_workflow_analysis_grid_1.dataSource.getByUid(report_workflow_analysis_grid_1.select().data("uid")).call_ref_no
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "report_workflow_analysis",
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
	DefineFavouritesForFilters("report_workflow_analysis");	
}
	
function summary_and_series_by()
{
	  
	 // report_workflow_analysis_datasource_1.data(workFlowData);
	  
	if(report_workflow_analysis_datasource_1.data().length != 0)
	{
		var jsonString = JSON.stringify(report_workflow_analysis_datasource_1.data());
		jsonObj = $.parseJSON(jsonString);
		copiedToNewDatasource = new kendo.data.DataSource({
			data:jsonObj,
			sort: [
				{ field: "call_ref_no", dir: "acs" },
				{ field: "start_time", dir: "asc" }
			]});
		copiedToNewDatasource.read();
		header_filtered_value=[];
		var input_xml = GetInputParamXML("report_workflow_analysis_header_1");
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
					
					var DataRole  = $("#report_workflow_analysis_" +filters_xml.childNodes[0].childNodes[i].nodeName ).data("role");
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
							var DataRole = $("#report_workflow_analysis_"+filters_xml.childNodes[0].childNodes[i].nodeName).data("role")
							
							if(DataRole != "dropdownlist" && DataRole != "combobox" && DataRole != "datepicker" && DataRole != "multiselect" )
							{	 
							
								if(field_name != "from_time" && field_name != "to_time" )
								{
									var obj1={};	
									obj1.field =filters_xml.childNodes[0].childNodes[i].nodeName.replace("_filter","");
									obj1.operator ='contains';
									obj1.value =node_value;  
									header_filtered_value.push(obj1);
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
				}
				else
				{
					var node_value = "ALL";
				}
			}
		}
		if(organogram.length != 0)
		{
			copiedToNewDatasource.filter(organogram);
			organogram_data = copiedToNewDatasource.view();
			
			organogram_datasource = new kendo.data.DataSource({data:organogram_data});organogram_datasource.read();
				 
		
		}
		else
		{
			copiedToNewDatasource.filter([]);
			organogram_data = copiedToNewDatasource.view();
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
		
	//	report_workflow_analysis_grid_1.dataSource.data(header_filtered_array);
		modified_datasource = new kendo.data.DataSource({data:header_filtered_array});modified_datasource.read();
		var series = $("#report_workflow_analysis_chart_series").val();
		var category  = $("#report_workflow_analysis_chart_summary").val();
		category_desc = category+"_description";
		series_desc = series+"_description";
		chart_array=[];
		grouped_data =[];
		arr=[];summarizedGridData = [];
			x_axis = [];y_axis = [];
			//x_axis =  eval($('#report_workflow_analysis_chart_series').val()+"Data");
			
			modified_datasource.group([{field:category}]);
			x_axis = modified_datasource.view();
			if(series != 'total')
			{
				modified_datasource.group([{field:series}]);
				y_axis = modified_datasource.view();
			}
			else
			{
				//modified_datasource.group([{field:'stage'}]);
				
				y_axis = [{value:'total'}];
			}
			
			newGridDataFilteredByCallNo = [];
			if(x_axis.length != 0 && y_axis.length != 0)
			{
				groupdata = [{"field": "series"}];
				 series_type_array =[{'stack': 'true',"type":"column","field": "value","name":"#:group.value#"}];
				
				$.each(x_axis,function(index1,element1){
					var totalTime= 0;
					 totalTimeTakenByStageOrStatus = 0;
					 
					// report_uom_desc =  element1.items[0]['report_uom_desc'];
					$.each(y_axis,function(index2,element){
						if($("#report_workflow_analysis_chart_series").val() == "total")
						{
							modified_datasource.filter({ field: category, operator: "eq", value: element1.value });
							//modified_datasource.filter({logic: "or",filters: [ { field: category, operator: "eq", value: element1.value },{ field: category, operator: "eq", value: '0000000' }]});
							seriec_desc_value = "total";series_val ='total';
							
						}
						else
						{
							modified_datasource.filter([{ field: category, operator: "eq", value: element1.value },{ field: series, operator: "eq", value: element.value }]);
							if( element.items[0][series_desc] != "" &&  element.items[0][series_desc] != undefined)
							{
								 seriec_desc_value = element.items[0][series_desc];
							}
							else
							{
								seriec_desc_value = element.items[0][series];
							}
							series_val = element.value;
						}
						arr = modified_datasource.view(); 	
						//console.log(arr);
						final_data = "";timeTaken =0;
						
						if(arr.length!= 0)
						{
							ds = new kendo.data.DataSource({data:arr[0].items});ds.read();
							
							//console.log(ds);
							ds.group({ field: "call_ref_no",aggregates: [{ field: "time_difference_in_hours", aggregate: "sum" }]})
							groupedByCallNo = ds.view();
							console.log(groupedByCallNo);
							filteredByCallNo = [];
							$.each(groupedByCallNo,function(arrIndex,item){
								
								filteredByCallNo.push({
									time_difference_in_hours:parseFloat(item.aggregates.time_difference_in_hours.sum),
									callNo:item.value,
								});
								gridItem = item.items[0];
								newGridDataFilteredByCallNo.push(gridItem);
								if(report_workflow_analysis_uom.value() == "min")
								{
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].time_difference_in_hours =( parseFloat(item.aggregates.time_difference_in_hours.sum) * 60).toFixed(2)+ " "+ report_workflow_analysis_uom.dataItem().p_code_value_description;
									
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].sch_duration_in_hours = (parseFloat(item.items[0].sch_duration_in_hours)* 60).toFixed(2)+ " "+ report_workflow_analysis_uom.dataItem().p_code_value_description;
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].act_duration_in_hours =( parseFloat(item.items[0].act_duration_in_hours)* 60).toFixed(2)+ " "+ report_workflow_analysis_uom.dataItem().p_code_value_description;
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].start_delay_in_hours = (parseFloat(item.items[0].start_delay_in_hours)* 60).toFixed(2)+ " "+ report_workflow_analysis_uom.dataItem().p_code_value_description;
								}
								else if(report_workflow_analysis_uom.value() == "d")
								{
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].time_difference_in_hours =( parseFloat(item.aggregates.time_difference_in_hours.sum) /24).toFixed(2)+" "+report_workflow_analysis_uom.dataItem().p_code_value_description;
									
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].sch_duration_in_hours =( parseFloat(item.items[0].sch_duration_in_hours)/24).toFixed(2)+ " "+ report_workflow_analysis_uom.dataItem().p_code_value_description;
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].act_duration_in_hours =( parseFloat(item.items[0].act_duration_in_hours)/24).toFixed(2)+ " "+ report_workflow_analysis_uom.dataItem().p_code_value_description;
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].start_delay_in_hours = (parseFloat(item.items[0].start_delay_in_hours)/24).toFixed(2)+ " "+ report_workflow_analysis_uom.dataItem().p_code_value_description;
								}
								else
								{
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].time_difference_in_hours = parseFloat(item.aggregates.time_difference_in_hours.sum)+" "+'hours';
									
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].sch_duration_in_hours = (item.items[0].sch_duration_in_hours)+ " "+ 'hours';
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].act_duration_in_hours = (item.items[0].act_duration_in_hours)+ " "+'hours';
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].start_delay_in_hours = (item.items[0].start_delay_in_hours)+ " "+ 'hours';
								
								}
								newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].start_time =item.items[0].start_time ;
								newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].end_time = item.items[(item.items.length)-1].end_time;
								if($("#report_workflow_analysis_chart_series").val() == "stage")
								{
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].status = 'NA';
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].status_description = 'NA';
								}
								else if($("#report_workflow_analysis_chart_series").val() == "status")
								{
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].stage = 'NA';
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].stage_description = 'NA';
								}
								else if($("#report_workflow_analysis_chart_series").val() == "total")
								{
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].status = 'NA';
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].status_description = 'NA';
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].stage = 'NA';
									newGridDataFilteredByCallNo[newGridDataFilteredByCallNo.length-1].stage_description = 'NA';
								}
							});
							filteredByCallNoDs = new kendo.data.DataSource({data:filteredByCallNo});ds.read();
							if($("#report_workflow_analysis_chart_series").val() == "total" )
							{
								filteredByCallNoDs.aggregate([{field:"time_difference_in_hours",aggregate:"sum"}]);
								timeTaken = parseFloat(filteredByCallNoDs.aggregates().time_difference_in_hours.sum);
								final_data = parseFloat(filteredByCallNoDs.aggregates().time_difference_in_hours.sum).toFixed(2);
							}
							else
							{
								filteredByCallNoDs.aggregate([{field:"time_difference_in_hours",aggregate:"average"}]);
								timeTaken = parseFloat(filteredByCallNoDs.aggregates().time_difference_in_hours.average);
								final_data = parseFloat(filteredByCallNoDs.aggregates().time_difference_in_hours.average).toFixed(2);
							}
						}
						
						
						if(report_workflow_analysis_chart_summary.dataItem().display == "description")
						{
							
							if( element.items[0][category_desc] != "" &&  element.items[0][category_desc] != undefined)
							{
								var category_desc_value = element.items[0][category_desc];
							}	
						}
						else if(report_workflow_analysis_chart_summary.dataItem().display == "code")
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
						categry_val = element1.value;
						if($("#report_workflow_analysis_chart_summary").val().indexOf('month') != -1)
						{
							 yr = $("#report_workflow_analysis_chart_summary").val().replace("month","year");
							categry_val =parseInt(element1.items[0][yr]) +"-"+parseInt(element1.items[0][category])
							category_desc_value =element1.items[0][yr]+"-"+category_desc_value;
							
						}
						if(final_data == "")
						{
							final_data = 0;
						}
						
						//if( $("#report_workflow_analysis_chart_series").val() != "total")
						//{
							
							duration = parseFloat(final_data);
							if($("#report_workflow_analysis_from_time_filter").val() != undefined  && $("#report_workflow_analysis_from_time_filter").val() != ""  && $("#report_workflow_analysis_from_time_filter").val() != 'ALL')
							{
								if($("#report_workflow_analysis_to_time_filter").val() != undefined && $("#report_workflow_analysis_to_time_filter").val() != ""  && $("#report_workflow_analysis_to_time_filter").val() != 'ALL')
								{
									if($("#report_workflow_analysis_from_time_filter").val() <= timeTaken  &&  $("#report_workflow_analysis_to_time_filter").val() >= timeTaken )
									{
										duration = parseFloat(final_data);
									}
									else
									{
										duration = 0;
									}
								}
								if($("#report_workflow_analysis_to_time_filter").val() == undefined  || $("#report_workflow_analysis_to_time_filter").val() == ""  || $("#report_workflow_analysis_to_time_filter").val() == 'ALL')
								{
									if($("#report_workflow_analysis_from_time_filter").val() <= timeTaken )
									{
										duration = parseFloat(final_data);
									}
									else
									{
										duration = 0;
									}
								}
							}
							if($("#report_workflow_analysis_to_time_filter").val() != undefined && $("#report_workflow_analysis_to_time_filter").val() != ""  && $("#report_workflow_analysis_to_time_filter").val() != 'ALL')
							{
								if($("#report_workflow_analysis_from_time_filter").val() != undefined && $("#report_workflow_analysis_from_time_filter").val() != ""  && $("#report_workflow_analysis_from_time_filter").val() != 'ALL')
								{
									if($("#report_workflow_analysis_from_time_filter").val() <= timeTaken  &&  $("#report_workflow_analysis_to_time_filter").val() >= timeTaken )
									{
										duration = parseFloat(final_data);
									}
									else
									{
										duration = 0;
									}
								}
								if($("#report_workflow_analysis_from_time_filter").val() == undefined || $("#report_workflow_analysis_from_time_filter").val() == ""  || $("#report_workflow_analysis_from_time_filter").val() == 'ALL')
								{
									if($("#report_workflow_analysis_to_time_filter").val() >= timeTaken)
									{
										duration = parseFloat(final_data);
									}
									else
									{
										duration = 0;
									}
								}
							}
							
							if($("#report_workflow_analysis_from_time_filter").val() == undefined || $("#report_workflow_analysis_from_time_filter").val() == ""  || $("#report_workflow_analysis_from_time_filter").val() == 'ALL')
							{
								if($("#report_workflow_analysis_from_time_filter").val() == undefined || $("#report_workflow_analysis_to_time_filter").val() == ""  || $("#report_workflow_analysis_to_time_filter").val() == 'ALL')
								{
									duration = parseFloat(final_data);	
								}
							}
							if(report_workflow_analysis_uom.value() == "min")
							{
								duration = duration * 60;
							}
							else if(report_workflow_analysis_uom.value() == "d")
							{
								duration= duration /24;
							}
							chart_array.push({
								category:categry_val,
								series:series_val,
								value:duration,
								category_desc :category_desc_value,
								series_desc_list : seriec_desc_value,
								
							});
							if(report_workflow_analysis_uom.dataItem().p_code_value_description == "h")
							{
								
								var uom = 'hours';
							}
							else
							{
								var uom = report_workflow_analysis_uom.dataItem().p_code_value_description;
							}
							if(duration != "")
							{
								summarizedGridData.push({
									summary_by : category_desc_value,
									series_by : seriec_desc_value,
									duration    : duration,
									uom:uom
								});
							}
						//}
						
					});
			
				});
				report_workflow_analysis_grid_1.dataSource.data(newGridDataFilteredByCallNo);	
				report_workflow_analysis_grid_1.dataSource.sort({field:"call_ref_no",dir:'asc'});
				report_workflow_analysis_grid_2.dataSource.data(summarizedGridData);
			}
			else
			{
				groupdata = [];
				series_type_array = [];
				chart_array = [];
				alert("No data");
			}	
	}
	else
	{
		groupdata = [];
		series_type_array = [];
		chart_array = [];
	}
	redrawChart();
}
function manage_display_chart()
{
	if(series_type_array.length != 0)
	{
		series_type_array[0].type = $("#report_workflow_analysis_chart_type").val();
	}
	$("#report_workflow_analysis_chart").kendoChart({
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
			labels: {
				visible: true,
				background:"",
				template:function(e)
				{
					if(e.value == 0)
					{
						return '';
					}
					else
					{
						return e.value;
					}
				}
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
			//majorUnit: 100,
			 minorGridLines: {
				visible: true,
				//color:"red",
				dashType: "solid"
			},
			title:
			{
			   text:"Time taken in hours"
			}
			
		},	
		
		tooltip:
		{
			visible: true,
			format: "{0}",
			template:"#=category # <br> #= series.name #: #= value #"
		}
				
	}); 
	refresh() ;
}	
function redrawChart()
{
	
	var chart = $("#report_workflow_analysis_chart").data("kendoChart");
	if(series_type_array.length != 0)
	{
		if($("#report_workflow_analysis_chart_type").val() == 'stacked')
		{
		
			series_type_array[0].type ='column' ;
			
			series_type_array[0].stack = true;  
		/*	series_type_array[0].noteTextField = "value";  
			series_type_array[0].notes ={
				label: {template:  function (e) {
					return e.value;
				} }
			}; */
		}
		/*else if($("#report_workflow_analysis_chart_type").val() == 'scatter')
		{
			
			series_type_array[0].type = $("#report_workflow_analysis_chart_type").val();
			series_type_array[0].stack = false;
			//series_type_array[0].field ='' ;
			groupdata = [{"field": "series"}];
			
		}
		else if($("#report_workflow_analysis_chart_type").val() == 'donut')
		{
			
			series_type_array[0].type = $("#report_workflow_analysis_chart_type").val();
			series_type_array[0].stack = false;
			groupdata = [{"field": "category"}];
			series_type_array[0].categoryField = 'series_desc_list';
			series_type_array[0].visibleInLegend = 'visibleInLegend';
			series_type_array[0].name = '#:group.value#';
			
		}*/
		else
		{
			series_type_array[0].type = $("#report_workflow_analysis_chart_type").val();
			series_type_array[0].stack = false;	
		}
	}
	
	if(report_workflow_analysis_uom.dataItem().p_code_value_description == "h")
	{
		
		var uom = 'hours';
	}
	else
	{
		var uom = report_workflow_analysis_uom.dataItem().p_code_value_description;
	}
	chart.setOptions({
		
		dataSource:{
			data : chart_array,
			group:groupdata,
			sort: [{field: "category", dir: "asc"}] 
		},
		series:series_type_array,
		valueAxis:
		{
			title:
			{
			   text:"Time taken in "+uom
			}
			
		},	
	});
	refresh() ;
	chart.redraw();
}
function refresh() {
	var chart = $("#report_workflow_analysis_chart").data("kendoChart");
	series = chart.options.series;
	type = $("#report_workflow_analysis_chart_type").val();
	
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
function retrieveData(xml)
{
	p_inputparam_xml = xml;	
	report_workflow_analysis_grid_1.dataSource.data([]);
	report_workflow_analysis_grid_2.dataSource.data([]);
	report_workflow_analysis_datasource_1.data([]);
	$("#spinner").show();
	report_workflow_analysis_datasource_1.read();
	report_metrics_data=report_workflow_analysis_datasource_1.data();
	no_jo=report_metrics_data.length;
	total_jo='[{"field":"no_jo"}]';
	total_jo_array=$.parseJSON(total_jo);
	summary_and_series_by();
}
function fn_report_workflow_analysis_chart_series_change_event()
{
	if(report_workflow_analysis_chart_series.value() == 'total')
	{
		report_workflow_analysis_chart_type.dataSource.data([{code:"column",description:"Column"},{code:"line",description:"Line"}]);
		$('[data-for =report_workflow_analysis_chart_type]').text(report_workflow_analysis_chart_type.dataItem().description); 
	}
	else
	{
		report_workflow_analysis_chart_type.dataSource.data([{code:"column",description:"Column"},{code:"stacked",description:"Stacked"},{code:"line",description:"Line"}]);
		$('[data-for =report_workflow_analysis_chart_type]').text(report_workflow_analysis_chart_type.dataItem().description); 
	}
	summary_and_series_by();
}
function fn_report_workflow_analysis_PreImport()
{
	return true;
}
function fn_report_workflow_analysis_PostImport()
{
	return true;
}
function fn_report_workflow_analysis_PreExport()
{
	exportConfiguration = {
		mode:'multiple',
		content:[{
			exportType:"grid",
			fieldId:"report_workflow_analysis_grid_1",
			dispalyLabel:"Detailed  Data"
		},
		{
			exportType:"grid",
			fieldId:"report_workflow_analysis_grid_2",
			dispalyLabel:"Summarized Data"
		},
		{
			exportType:"chart",
			fieldId:"report_workflow_analysis_chart",
			dispalyLabel:"Chart"
		}]
	};
	return exportConfiguration;
}
function fn_report_workflow_analysis_PostExport()
{
	return true;
}
function fn_report_workflow_analysis_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"report_workflow_analysis_grid_1",
			dispalyLabel:"Data Export"
		}]
	};
	return printConfiguration;
}
function fn_report_workflow_analysis_PostPrint()
{
	return true;
}