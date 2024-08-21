function fn_report_sla_analysis_sc_add_filter()
{
	AddCustomCheckBoxForReport("report_sla_analysis_sc_add_filter");
	ApplyConfiguredLabelsForReport("report_sla_analysis_sc_add_filter");
	var length = $("#report_sla_analysis_sc  .preference_for_filters  input,select").length;
	for(var x=0;x<length;x++)
	{
		var id = $("#report_sla_analysis_sc  .preference_for_filters  input,select")[x].id;
		if(id != "" && $("#"+id+"_div").is(":visible") == true)
		{
			checkbox_id = "report_sla_analysis_sc_add_filter_"+id.replace("report_sla_analysis_sc_","");
			$("#"+checkbox_id).attr('checked','checked');	
		}	
	}
	$('#report_sla_analysis_sc_add_filter_set').on("click",function()
	{
		for(var x=0;x<$("#report_sla_analysis_sc  .preference_for_filters  input,select").length;x++)
		{
			var id = $("#report_sla_analysis_sc  .preference_for_filters input,select")[x].id;
			if(id != "" && $("#"+id+"_div").is(":visible") == true)
			{
				$("#"+id+"_div").hide();
			}	
		}
		var length = $("#report_sla_analysis_sc_add_filter  input[type='checkbox']").length;	
		for(var i=0;i<length;i++)
		{
			var field_id = $("#report_sla_analysis_sc_add_filter  input[type='checkbox']")[i].id;
			id = field_id.replace("report_sla_analysis_sc_add_filter_","");
			if($("#report_sla_analysis_sc_"+id+"_div").children('hr') != [])
			{
				$("#report_sla_analysis_sc_"+id+"_div").children("hr").remove();
			}
			if($("#"+field_id+":checkbox").is(':checked' ) == true)
			{
				if($("#report_sla_analysis_sc_"+id).length == 0)
				{
					AddCustomFilterForReport('report_sla_analysis_sc',id);
					ApplyConfiguredLabelsForReport('report_sla_analysis_sc',id);
				}
				$("#report_sla_analysis_sc_"+id+"_div").show();
			}	
			else
			{
				if($("#report_sla_analysis_sc_"+id).length == 1)
				{
					$("#report_sla_analysis_sc_"+id+"_div").hide();
				}
			}
		}
		
		var length = $("#report_sla_analysis_sc  .preference_for_filters  input,select").length;
		var counter = 1;
		for(var i=0;i<length;i++)
		{		
			if($($("#report_sla_analysis_sc  .preference_for_filters  input,select")[i]).attr("id") != undefined) {
				var id = $("#report_sla_analysis_sc  .preference_for_filters  input,select")[i].id;
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
		report_sla_analysis_sc_grid_1.dataSource.data([]);
		report_sla_analysis_sc_grid_2.dataSource.data([]);
		report_sla_analysis_sc_datasource_1.data([]);
		redrawChart();
	});
	$('#report_sla_analysis_sc_add_filter_cancel').on("click",function()
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