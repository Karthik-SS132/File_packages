function fn_report_inventory_consumption_analysis_add_filter()
{
	AddCustomCheckBoxForReport("report_inventory_consumption_analysis_add_filter");
	ApplyConfiguredLabelsForReport("report_inventory_consumption_analysis_add_filter");
	var length = $("#report_inventory_consumption_analysis  .preference_for_filters  input").length;
	for(var x=0;x<length;x++)
	{
		var id = $("#report_inventory_consumption_analysis  .preference_for_filters  input")[x].id;
		if(id != "" && $("#"+id+"_div").is(":visible") == true)
		{
			checkbox_id = "report_inventory_consumption_analysis_add_filter_"+id.replace("report_inventory_consumption_analysis_","");
			$("#"+checkbox_id).attr('checked','checked');	
		}	
	}
	$('#report_inventory_consumption_analysis_add_filter_set').on("click",function()
	{
		for(var x=0;x<$("#report_inventory_consumption_analysis  .preference_for_filters  input").length;x++)
		{
			var id = $("#report_inventory_consumption_analysis  .preference_for_filters input")[x].id;
			if(id != "" && $("#"+id+"_div").is(":visible") == true)
			{
				
				$("#"+id+"_div").hide();
			}
			
		}
		var length = $("#report_inventory_consumption_analysis_add_filter  input[type='checkbox']").length;	
		for(var i=0;i<length;i++)
		{
			
			var field_id = $("#report_inventory_consumption_analysis_add_filter  input[type='checkbox']")[i].id;
			id = field_id.replace("report_inventory_consumption_analysis_add_filter_","");
			if($("#report_inventory_consumption_analysis_"+id+"_div").children('hr') != [])
			{
				$("#report_inventory_consumption_analysis_"+id+"_div").children("hr").remove();
			}
			if($("#"+field_id+":checkbox").is(':checked' ) == true)
			{
				if($("#report_inventory_consumption_analysis_"+id).length == 0)
				{
					AddCustomFilterForReport('report_inventory_consumption_analysis',id);
					ApplyConfiguredLabelsForReport('report_inventory_consumption_analysis',id);
				}
				$("#report_inventory_consumption_analysis_"+id+"_div").show();
			}	
			else
			{
				if($("#report_inventory_consumption_analysis_"+id).length == 1)
				{
					$("#report_inventory_consumption_analysis_"+id+"_div").hide();
				}
			}
		}
		
		var length = $("#report_inventory_consumption_analysis  .preference_for_filters  input").length;
		var counter = 1;
		for(var i=0;i<length;i++)
		{		
			if($($("#report_inventory_consumption_analysis  .preference_for_filters  input")[i]).attr("id") != undefined) {
				var id = $("#report_inventory_consumption_analysis  .preference_for_filters  input")[i].id;
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
		report_inventory_consumption_analysis_grid_1.dataSource.data([]);
		report_inventory_consumption_analysis_datasource_1.data([]);
		manage_display_chart();
	});
	$('#report_inventory_consumption_analysis_add_filter_cancel').on("click",function()
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