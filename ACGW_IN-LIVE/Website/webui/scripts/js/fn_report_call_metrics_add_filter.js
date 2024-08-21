function fn_report_call_metrics_add_filter()
{
	AddCustomCheckBoxForReport("report_call_metrics_add_filter");
	ApplyConfiguredLabelsForReport("report_call_metrics_add_filter");
	var length = $("#report_call_metrics  .preference_for_filters  input,select").length;
	for(var x=0;x<length;x++)
	{
		var id = $("#report_call_metrics  .preference_for_filters  input,select")[x].id;
		if(id != "" && $("#"+id+"_div").is(":visible") == true)
		{
			checkbox_id = "report_call_metrics_add_filter_"+id.replace("report_call_metrics_","");
			$("#"+checkbox_id).attr('checked','checked');	
		}	
	}
	$('#report_call_metrics_add_filter_set').on("click",function()
	{
		for(var x=0;x<$("#report_call_metrics  .preference_for_filters  input,select").length;x++)
		{
			var id = $("#report_call_metrics  .preference_for_filters input,select")[x].id;
			if(id != "" && $("#"+id+"_div").is(":visible") == true)
			{
				$("#"+id+"_div").hide();
			}
		}
		var length = $("#report_call_metrics_add_filter  input[type='checkbox']").length;	
		for(var i=0;i<length;i++)
		{
			var field_id = $("#report_call_metrics_add_filter  input[type='checkbox']")[i].id;
			id = field_id.replace("report_call_metrics_add_filter_","");
			if($("#report_call_metrics_"+id+"_div").children('hr') != [])
			{
				$("#report_call_metrics_"+id+"_div").children("hr").remove();
			}
			if($("#"+field_id+":checkbox").is(':checked' ) == true)
			{
				if($("#report_call_metrics_"+id).length == 0)
				{
					AddCustomFilterForReport('report_call_metrics',id);
					ApplyConfiguredLabelsForReport('report_call_metrics',id);
				}
				$("#report_call_metrics_"+id+"_div").show();
			}	
			else
			{
				if($("#report_call_metrics_"+id).length == 1)
				{
					$("#report_call_metrics_"+id+"_div").hide();
				}
			}
		}
		
		var length = $("#report_call_metrics  .preference_for_filters  input,select").length;
		var counter = 1;
		for(var i=0;i<length;i++)
		{		
			if($($("#report_call_metrics  .preference_for_filters  input,select")[i]).attr("id") != undefined) {
				var id = $("#report_call_metrics  .preference_for_filters  input,select")[i].id;
				if ($("#"+id+"_div").is(":visible") == true) {
					if (counter % 3 == 0) {
						var hr = document.createElement("hr");
						$("#" + id + "_div").append(hr);
					}				
					counter = counter+1;
				}
			}
		}
		child_window.close();
		groupdata = [];
		series_type_array = [];
		chart_array = [];
		report_call_metrics_grid_1.dataSource.data([]);
		report_call_metrics_datasource_1.data([]);
		redrawChart();
	});
	$('#report_call_metrics_add_filter_cancel').on("click",function()
	{
		child_window.close();
	});
}
function report_checkbox_change(e)
{
	var id = e.target.id
	field_id = id.replace("add_filter_","");
	
		if($("#"+field_id+":checkbox").is(':checked' ) == false)
		{
			if($("#"+field_id).length == 1)
			{
				eval(field_id+".value('ALL')");
				eval(field_id+'.enable(true)');
			}
		}
}