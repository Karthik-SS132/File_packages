function fn_report_inventory_consumption_analysis_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [ 
						//"../../s_iscripts/report_inventory_consumption_analysis.js",
						"./webui/scripts/js/fn_report_inventory_consumption_analysis_add_filter.js",
						//"./webui/scripts/js/fn_report_inventory_consumption_analysis_child.js",
					  ];				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);	
	if (loadRetStatus == 1)		return false;
	return true;
}

function fn_report_inventory_consumption_analysis()
{
	
	screenChangeInd='';
	$("#report_inventory_consumption_analysis_heading_title").text(MenuTitle);
	$("#tabstrip").kendoTabStrip();
	p_inputparam_xml = "";
	report_metrics_data = [];
	chart_array= [];
	series_type_array=[];
	groupdata=[];
	report_inventory_consumption_analysis_chart_desc = "";
	year_data=LoadYearFilter();
	quarter_data=LoadQuarterFilter();
	month_data=LoadMonthFilter();
	week_of_month_data=LoadWeekOfMonthFilter();
	day_of_week_data=[{"text" :"1","value":"1"},{"text" :"2","value":"2"},{"text" :"3","value":"3"},{"text" :"4","value":"4"},{"text" :"5","value":"5"},{"text" :"6","value":"6"},{"text" :"7","value":"7"}];
	
	scall_metric_array=new Array();
	call_filtered_array=new Array();	
	var temp_array = new kendo.data.ObservableArray([]);
	var report_inventory_consumption_analysis_datasource_1_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10});		
	report_inventory_consumption_analysis_grid_1 = InitializeKendoGrid(
	{
		sectionID: "report_inventory_consumption_analysis_detail_1",
		toolbar: false,
		dataSource: report_inventory_consumption_analysis_datasource_1_temp,
		height: 400,
		pageSize: 10,
		resizable:true,
		sortable:true,
		pageable:true,
		filterable:false,
		favourite:true
	});	
	
	$("#report_inventory_consumption_analysis_grid_1 .k-grid-content").css("height","332px");
	screen_id_for_retrieve  = '';
	manage_display_chart();
	
	$('#report_inventory_consumption_analysis_retrieve').on("click",function()
	{
		/*if(screen_id_for_retrieve == "")
		{
			var xml = GetInputParamXML("report_inventory_consumption_analysis_header_1");	
			var filters_xml = loadXMLString(xml);
			var length = filters_xml.childNodes[0].childNodes.length;
			for(var i =0;i<length ;i++)
			{
				filters_xml.childNodes[0].childNodes[i].nodeName;
				if(filters_xml.childNodes[0].childNodes[i].hasChildNodes() == true)
				{
					filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue = "ALL";
				}
				else
				{
					filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue = "ALL";
				}
				
			} 
			var xml_string = XMLtoString(filters_xml);
			retrieveData(xml_string);
		
		}
		else
		{
			retrieveData(p_inputparam_xml);
		}*/
		var xml = GetInputParamXML("report_inventory_consumption_analysis_header_1");	
		var filters_xml = loadXMLString(xml);
		var length = filters_xml.childNodes[0].childNodes.length;
		for(var i =0;i<length ;i++)
		{
			if(filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue  != "ALL")
			{
				eval("report_inventory_consumption_analysis_"+filters_xml.childNodes[0].childNodes[i].nodeName+'.enable(false)');
			}
		} 
		retrieveData(xml);
	});
	
	$('#report_inventory_consumption_analysis_reset_filter').on("click",function()
	{
		var header_filtered_value=[];
		var input_xml = GetInputParamXML("report_inventory_consumption_analysis_header_1");
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
				eval("report_inventory_consumption_analysis_"+header_filtered_value[i].nodeName+'.value("ALL")');
				eval("report_inventory_consumption_analysis_"+header_filtered_value[i].nodeName+'.enable(true)');
			
			}
			$(".display_description[data-for='report_inventory_consumption_analysis_"+header_filtered_value[i].nodeName+"']").text('');
		}
		
		report_inventory_consumption_analysis_grid_1.dataSource.data([]);
		report_inventory_consumption_analysis_datasource_1.data([]);
		report_metrics_data = [];
		chart_array= [];
		series_type_array=[];
		groupdata=[];
		manage_display_chart();
	});

	chart_type_data =[{code:"column",description:"Column"},{code:"bar",description:"Bar"},{code:"line",description:"Line"}]
	$("#report_inventory_consumption_analysis_chart_type").kendoDropDownList({
	dataTextField: "description",
    dataValueField: "code",
    dataSource:chart_type_data,
	change:function()
	{
		summary_and_series_by();
	}
	});
	
	summary_and_series_data= SummaryAndSeriesData("report_inventory_consumption_analysis");
	summary_by_data = summary_and_series_data.summary;
	series_by_data = summary_and_series_data.series;
	$("#report_inventory_consumption_analysis_chart_series").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:series_by_data,
	change:function()
	{
	
	summary_and_series_by();
	
	}
	});
	report_inventory_consumption_analysis_chart_series = $("#report_inventory_consumption_analysis_chart_series").data("kendoDropDownList");
	$("#report_inventory_consumption_analysis_chart_all").kendoDropDownList({
	index:0,
	dataTextField: "text",
    dataValueField: "value",
    dataSource:summary_by_data,	
	change:function(e)
	{
	
	summary_and_series_by();
	}
	});
	report_inventory_consumption_analysis_chart_all = $("#report_inventory_consumption_analysis_chart_all").data("kendoDropDownList");
	consumption_array=[{text:"Unit Consumed",value:"actual_qty_consumed"},{text:"Material Cost",value:"material_cost"}];
	$("#report_inventory_consumption_analysis_consumption").kendoDropDownList({
	index:0,
	dataTextField: "text",
    dataValueField: "value",
    dataSource:consumption_array,	
	change:function(e)
	{
	
	summary_and_series_by();
	}
	});
	report_inventory_consumption_analysis_consumption = $("#report_inventory_consumption_analysis_consumption").data("kendoDropDownList");
	
	//AddCustomFilterForReport("report_inventory_consumption_analysis");
	ApplyConfiguredLabelsForReport("report_inventory_consumption_analysis");
	
	/*var screenNode, headerNode, fieldNodes, displayNode, fieldID;
	screenNode = xmlDocREPORT.getElementsByTagName(screenID);
	if (screenNode.length != 0)
	{
		
			headerNode = screenNode[0].getElementsByTagName("report_inventory_consumption_analysis" + "_header_" + 1);
			if (headerNode.length != 0)
			{
				fieldNodes = headerNode[0].getElementsByTagName("field");
				for (var j = 0; j < fieldNodes.length; j++)
				{
					var default_value = fieldNodes[j].getElementsByTagName("default_value");
					fieldID = fieldNodes[j].getAttribute("id");
					if(default_value[0].childNodes.length != 0 && default_value[0].childNodes[0].nodeValue != "ALL" )
					{
						
						
						
						eval("report_inventory_consumption_analysis_"+fieldID+".value('"+default_value[0].childNodes[0].nodeValue+"')");
					}
					$("#report_inventory_consumption_analysis_"+fieldID+"_div").hide();	
				}
			}	
	}*/


	$('#report_inventory_consumption_analysis_add_filter').on('click', function() 
	{
		
		child_window =  InitializeKendoWindow(
			{
				fieldID: 'report_inventory_consumption_analysis_add_filter_window',
				windowTitle: 'Add Filters',
				windowHeight: 450,
				windowWidth: 900,
				screenID: 'report_inventory_consumption_analysis_add_filter'
			});
	});	
	
	$('#report_inventory_consumption_analysis_set_preference').on('click', function() 
	{
		set_preference_window=  InitializeKendoWindow(
			{
				fieldID: 'call_metrics_set_preference',
				windowTitle: '',
				windowHeight: 850,
				windowWidth: 1000,
				screenID: 'report_inventory_consumption_analysis_child'
			});
	});		
	report_inventory_consumption_analysis_datasource_1_schema_model = GetDataSourceSchema("report_inventory_consumption_analysis","report_inventory_consumption_analysis_datasource_1");
	report_inventory_consumption_analysis_datasource_1 = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'json',
				contentType: "application/json; charset=utf-8",	
				url: GetTransportUrl("mservice", "report_inventory_consumption", "context/outputparam"),
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
					if(login_profile.package_id == "FCMPROFESSIONAL")
					{
						var report_for_call_or_jo_ind = "C";
					}
					else if(login_profile.package_id == "FSMPROFESSIONAL")
					{
						var report_for_call_or_jo_ind = "J";
					}
					
					return GetTransportParameter({inputparam: {p_report_for_call_or_jo_ind:report_for_call_or_jo_ind,p_inputparam_xml: p_inputparam_xml}});
				}
			}
		},
		schema: 
		{
			//type:"xml",
			//data:"document/outputparam",
			model: report_inventory_consumption_analysis_datasource_1_schema_model,
			/*{
				fields: 
				{
					call_ref_no: "call_ref_no/text()",
					org_level_no: "org_level_no/text()",
					org_level_no_description: {field:"org_level_no_description/text()",codeType: "ORGLEVELNO", codeField: "org_level_no"},
					org_level_code: "org_level_code/text()",
					org_level_code_description: {field:"org_level_code_description/text()",codeType: "ORGLEVELCODE", codeField: "org_level_code"},
					priority: "priority/text()",
					priority_description: {field:"priority_description/text()",codeType: "CALLPRIORITY", codeField: "priority"},
					category: "category/text()",
					category_description: {field:"category_description/text()",codeType: "CALLCATEGORY", codeField: "category"},
					type: "type/text()",
					type_description: {field:"type_description/text()",codeType: "CALLTYPE", codeField: "type"},
					status: "status/text()",
					status_description: {field:"status_description/text()",codeType: "CALLSTATUS", codeField: "status"},
					
					
					close_year: "close_year/text()",
					close_qtr: "close_qtr/text()",
					close_month: "close_month/text()",
					close_month_description: {field:"close_month_description/text()",codeType: "MONTHLIST", codeField: "close_month"},
					close_wk_of_mth: "close_wk_of_mth/text()",
					close_wk_of_mth_description: {field:"close_wk_of_mth_description/text()",codeType: "WEEKLIST", codeField: "close_wk_of_mth"},
					close_day_of_wk: "close_day_of_wk/text()",
					
					
					//call_cause_code: "call_cause_code/text()",
					//call_cause_code_description: {field:"call_cause_code_description/text()",codeType: "CALLCAUSE", codeField: "call_cause_code"},
					equipment_id: "equipment_id/text()",
					equipment_id_description: {field:"equipment_id_description/text()",codeType: "EQUIPMENT", codeField: "equipment_id"},
					asset_id: "asset_id/text()",
					asset_id_description: {field:"asset_id_description/text()",codeType: "ASSET", codeField: "asset_id"},
					customer_id: "customer_id/text()",
					customer_id_description: {field:"customer_id_description/text()",codeType: "CUSTOMER", codeField: "customer_id"},
					assigned_to_function_role: "assigned_to_function_role/text()",
					assigned_to_function_role_description: {field:"assigned_to_function_role_description/text()",codeType: "FUNCROLELIST", codeField: "assigned_to_function_role"},
					assigned_to_emp_id: "assigned_to_emp_id/text()",
					assigned_to_emp_id_description: {field:"assigned_to_emp_id_description/text()",codeType: "CALLASSIGNTOEMPLIST", codeField: "assigned_to_emp_id"},
					reporting_to_function_role: "reporting_to_function_role/text()",
					reporting_to_function_role_description: {field:"reporting_to_function_role_description/text()",codeType: "FUNCROLELIST", codeField: "reporting_to_function_role"},
					reporting_to_emp_id: "reporting_to_emp_id/text()",
					reporting_to_emp_id_description: {field:"reporting_to_emp_id_description/text()",codeType: "CALLREPOTOEMPLIST", codeField: "reporting_to_emp_id"},
					mapped_to_function_role: "mapped_to_function_role/text()",
					mapped_to_function_role_description: {field:"mapped_to_function_role_description/text()",codeType: "FUNCROLELIST", codeField: "mapped_to_function_role"},
					mapped_to_emp_id: "mapped_to_emp_id/text()",
					mapped_to_emp_id_description: {field:"mapped_to_emp_id_description/text()",codeType: "CALLMAPPEDTOEMPLIST", codeField: "mapped_to_emp_id"},
					//jo_creation_status: "jo_creation_status/text()",
					//jo_no: "jo_no/text()",
					//analysis_code1: "analysis_code1/text()",
					//analysis_code1_description: {field:"analysis_code1_description/text()",codeType: "CALLBNBIND", codeField: "analysis_code1"},
					//analysis_code2: "analysis_code2/text()",
					//analysis_code2_description: {field:"analysis_code2_description/text()",codeType: "CALLSUBTYPE", codeField: "analysis_code2"},
					actual_qty_consumed: "actual_qty_consumed/text()",
					material_cost: "material_cost/text()",
					}
			},*/
			parse: function (response)
			{
				return GetDescriptionFieldsForDataSource(response, report_inventory_consumption_analysis_datasource_1);
			} 
		}
	});	
	report_inventory_consumption_analysis_grid_1.dataSource.options.schema = report_inventory_consumption_analysis_datasource_1.options.schema;
	 ORGLEVEL_DETAILS_XML =  executeService_retrieve_listof_values_for_searchcondition({p_inputparam_xml: "<inputparam><lov_code_type>" + "ORGHIERARCHY" + "</lov_code_type></inputparam>"});
	 ORGLEVEL_DETAILS =  ConvertXMLStringToJSONArray(ORGLEVEL_DETAILS_XML);
	 
	 $("#report_inventory_consumption_analysis").delegate("span.call_reference_view", "click", function()
	{
		if(LoadJSScripts(["./webui/scripts/js/fn_manage_call_register_edit.js", "../../s_iscripts/retrieve_manage_call_register_details.js"]))
		{
			crud_indicator = "V";
			displayLabel = 'Call View';
			selected_call_register_record = report_inventory_consumption_analysis_grid_1.dataSource.getByUid(report_inventory_consumption_analysis_grid_1.select().data("uid")).call_ref_no;
			$.get('manage_call_register_edit.html', function(data)
			{							
				$("#report_inventory_consumption_analysis").hide();
				$("#container").append(data);
				fn_manage_call_register_edit();
			});
		}
		else
		{
			alert("Sorry. Unable To Proceed. Please Contact Your Technical Support.");
		}
	});
	DefineFavouritesForFilters("report_inventory_consumption_analysis");	
	/*var length = $("#report_inventory_consumption_analysis_dl_1  input").length;
	var counter = 1;
	for(var i=0;i<length;i++)
	{		
		if($($("#report_inventory_consumption_analysis_dl_1  input")[i]).attr("id") != undefined) {
			var id = $("#report_inventory_consumption_analysis_dl_1  input")[i].id;
			if ($("#"+id+"_div").is(":visible") == true) {
				if (counter % 3 == 0) {
					console.log($("#"+id+"_div"));
					var hr = document.createElement("hr");
					$("#" + id + "_div").append(hr);
				}				
				counter = counter+1;
			}
		}
	}*/
}
	
function summary_and_series_by()
{
	
	if(report_inventory_consumption_analysis_datasource_1.data().length != 0)
	{
		report_inventory_consumption_analysis_chart_desc = report_inventory_consumption_analysis_consumption.text();
		header_filtered_value=[];
		var input_xml = GetInputParamXML("report_inventory_consumption_analysis_header_1");
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
					
					var DataRole  = $("#report_inventory_consumption_analysis_" +filters_xml.childNodes[0].childNodes[i].nodeName ).data("role");
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
							var obj1={};	
							obj1.field =filters_xml.childNodes[0].childNodes[i].nodeName.replace("_filter","");
							obj1.operator ='eq';
							obj1.value =node_value;
							header_filtered_value.push(obj1);
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
			report_inventory_consumption_analysis_datasource_1.filter(organogram);
			organogram_data = report_inventory_consumption_analysis_datasource_1.view();
			
			organogram_datasource = new kendo.data.DataSource({data:organogram_data});organogram_datasource.read();
				 
		
		}
		else
		{
			report_inventory_consumption_analysis_datasource_1.filter([]);
			organogram_data = report_inventory_consumption_analysis_datasource_1.view();
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
		
		report_inventory_consumption_analysis_grid_1.dataSource.data(header_filtered_array);
		modified_datasource = new kendo.data.DataSource({data:header_filtered_array});modified_datasource.read();
		var category = $("#report_inventory_consumption_analysis_chart_all").val();
		var series = $("#report_inventory_consumption_analysis_chart_series").val();
		category_desc = category+"_description";
		series_desc = series+"_description";
		chart_array=[];
		grouped_data =[];
		arr=[];
		if( series == "No series")
		{
			groupdata = [];
			series_type_array = [{"type":"column","field":"value",'name':""}];
			modified_datasource.group({field:category,aggregates:[{field:report_inventory_consumption_analysis_consumption.value(),aggregate:"sum"}]});
			 grouped_data = modified_datasource.view();
			 if(grouped_data.length != 0)
			 {
				$.each(grouped_data,function(index,element){
					if( element.items[0][category_desc] != "" &&  element.items[0][category_desc] != undefined)
					{
						var category_desc_value = element.items[0][category_desc];
					}
					else
					{category_desc_value = element.items[0][category];}
					var report_inventory_consumption_value = eval("element.aggregates."+report_inventory_consumption_analysis_consumption.value()+".sum");
					chart_array.push({
						category : element.items[0][category],
						//value    : element.aggregates.count.sum,
						value    : kendo.toString(parseFloat(report_inventory_consumption_value),"n2"),
						category_desc :category_desc_value,
					});
				});
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
							ds.aggregate([{field:report_inventory_consumption_analysis_consumption.value(),aggregate:"sum"}]);
							//final_data = ds.aggregates().count.sum; 
							var report_inventory_consumption_value =eval("ds.aggregates()."+report_inventory_consumption_analysis_consumption.value()+".sum")
							final_data = kendo.toString(parseFloat(report_inventory_consumption_value),"n2");
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
						
					});
				});
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
		series_type_array[0].type = $("#report_inventory_consumption_analysis_chart_type").val();
	}
	$("#report_inventory_consumption_analysis_chart").kendoChart({
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
			title:
			{
			text:report_inventory_consumption_analysis_chart_desc
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

	var chart = $("#report_inventory_consumption_analysis_chart").data("kendoChart");
	series = chart.options.series;
	type = $("#report_inventory_consumption_analysis_chart_type").val();
	// stack = $("#stack").prop("checked");
	length = series.length;
	//for (var i = 0; i < length; i++) {
		// series[i].stack = stack;
		//series[i].type = type;
	//};
	chart.options.seriesDefaults.type = type;
	if( $("#report_inventory_consumption_analysis_chart_series").val() != "No series")
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
	/*$("#spinner").show(500,function()
	{
		$("#spinner").hide();
	}); */
	$("#spinner").show();
	report_inventory_consumption_analysis_datasource_1.read();
	//report_metrics_data=report_inventory_consumption_analysis_datasource_1.data();
	no_jo=report_metrics_data.length;
	total_jo='[{"field":"no_jo"}]';
	total_jo_array=$.parseJSON(total_jo);
}
function fn_report_inventory_consumption_analysis_PreImport()
{
	return true;
}
function fn_report_inventory_consumption_analysis_PostImport()
{
	return true;
}
function fn_report_inventory_consumption_analysis_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"report_inventory_consumption_analysis_grid_1",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_report_inventory_consumption_analysis_PostExport()
{
	return true;
}
function fn_report_inventory_consumption_analysis_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"report_inventory_consumption_analysis_grid_1",
			dispalyLabel:"Data Export"
		}]
	};
	return printConfiguration;
}
function fn_report_inventory_consumption_analysis_PostPrint()
{
	return true;
}



