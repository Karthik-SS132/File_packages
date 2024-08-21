function fn_report_scall_analysis_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [ 
						"../../s_iscripts/report_scall_metrics.js",
						"./webui/scripts/js/fn_report_scall_analysis_child.js",
						 "../../s_iscripts/retrieve_listof_org_level_codes.js",
						 "../../s_iscripts/retrieve_listof_functional_role_employee_list.js",
					  ];
				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);
	
	if (loadRetStatus == 1)		return false;
	
	return true;
}

function fn_report_scall_analysis()
{
	screenChangeInd='';
	$("#tabstrip").kendoTabStrip();
	scall_array=new Array();
	scall_array[0]="ALL";
	scall_array[1]="ALL";
	scall_array[2]="ALL";
	scall_array[3]="ALL";
	scall_array[4]="ALL";
	scall_array[5]="ALL";
	scall_array[6]="ALL";
	scall_array[7]="ALL";
	scall_array[8]="ALL";
	scall_array[9]="ALL";
	scall_array[10]="ALL";
	scall_array[11]="ALL";
	scall_array[12]="ALL";
	scall_array[13]="ALL";
	scall_array[14]="ALL";
	scall_array[15]="ALL";
	scall_array[16]="ALL";
	scall_array[17]="ALL";
	scall_array[18]="ALL";
	scall_array[18]="ALL";
	scall_array[19]="ALL";
	scall_array[20]="ALL";
	scall_array[21]="ALL";
	scall_array[22]="ALL";
	scall_array[23]="ALL";
	scall_array[24]="ALL";
	scall_array[25]="ALL";
	scall_array[26]="ALL";
	scall_array[27]="ALL";
	scall_array[28]="ALL";
	

	scall_array_child=new Array();
	scall_array_child[0]="ALL";
	scall_array_child[1]="ALL";
	scall_array_child[2]="ALL";
	scall_array_child[3]="ALL";
	scall_array_child[4]="ALL";
	scall_array_child[5]="ALL";
	scall_array_child[6]="ALL";
	scall_array_child[7]="ALL";
	scall_array_child[8]="ALL";
	scall_array_child[9]="ALL";
	scall_array_child[10]="ALL";
	scall_array_child[11]="ALL";
	scall_array_child[12]="ALL";
	scall_array_child[13]="ALL";
	scall_array_child[14]="ALL";
	scall_array_child[15]="ALL";
	scall_array_child[16]="ALL";
	scall_array_child[17]="ALL";
	scall_array_child[18]="ALL";
	scall_array_child[19]="ALL";
	scall_array_child[20]="ALL";
	scall_array_child[21]="ALL";
	scall_array_child[22]="ALL";
	scall_array_child[23]="ALL";
	scall_array_child[24]="ALL";
	scall_array_child[25]="ALL";
	scall_array_child[26]="ALL";
	scall_array_child[27]="ALL";
	scall_array_child[28]="ALL";
	
	scall_filtered_value=new Array();
	scall_filtered_value[0]="";
	scall_filtered_value[1]="";
	scall_filtered_value[2]="";
	scall_filtered_value[3]="";
	scall_filtered_value[4]="";
	scall_filtered_value[5]="";
	scall_filtered_value[6]="";
	scall_filtered_value[7]="";
	scall_filtered_value[8]="";
	scall_filtered_value[9]="";
	scall_filtered_value[10]="";
	scall_filtered_value[11]="";
	scall_filtered_value[12]="";
	scall_filtered_value[13]="";
	scall_filtered_value[14]="";
	scall_filtered_value[15]="";
	scall_filtered_value[16]="";
	scall_filtered_value[17]="";
	scall_filtered_value[18]="";
	scall_filtered_value[19]="";
	scall_filtered_value[20]="";
	scall_filtered_value[21]="";
	scall_filtered_value[22]="";
	scall_filtered_value[23]="";
	scall_filtered_value[24]="";
	scall_filtered_value[25]="";
	scall_filtered_value[26]="";
	scall_filtered_value[27]="";
	scall_filtered_value[28]="";
	
	
	
	scall_id_array=new Array();
	scall_id_array[0]='scall_organogram_level_no';
	scall_id_array[1]='scall_organogram_level_code';
	scall_id_array[2]='scall_sc_status';
	scall_id_array[3]='scall_sc_priority';
	scall_id_array[4]='scall_creation_year';
	scall_id_array[5]='scall_creation_qtr';
	scall_id_array[6]='scall_creation_month';
	scall_id_array[7]='scall_creation_wk_of_mth';
	scall_id_array[8]='scall_creation_day_of_wk';
	scall_id_array[9]='scall_assign_year';
	scall_id_array[10]='scall_assign_qtr';
	scall_id_array[11]='scall_assign_month';
	scall_id_array[12]='scall_assign_wk_of_mth';
	scall_id_array[13]='scall_assign_day_of_wk';
	scall_id_array[14]='scall_close_year';
	scall_id_array[15]='scall_close_qtr';
	scall_id_array[16]='scall_close_month';
	scall_id_array[17]='scall_close_wk_of_mth';
	scall_id_array[18]='scall_close_day_of_wk';
	scall_id_array[19]='scall_asset';
	scall_id_array[20]='scall_eq_id';
	scall_id_array[21]='scall_customer_id';
	
	scall_id_array[22]='scall_cause_code';
	scall_id_array[23]='scall_fn_role';
	scall_id_array[24]='scall_emp';
	scall_id_array[25]='scall_rep_fn_role';
	scall_id_array[26]='scall_rep_emp';
	scall_id_array[27]='scall_map_fn_role';
	scall_id_array[28]='scall_map_emp';
	
	
	scall_chart_array=[];
	scall_parsed_chart_array=[];
	manage_scall_chart();
	
	
	year_data=LoadYearFilter();
	quarter_data=LoadQuarterFilter();
	month_data=LoadMonthFilter();
	week_of_month_data=[{"text" :"ALL","value":"ALL"},{"text" :"1","value":"1"},{"text" :"2","value":"2"},{"text" :"3","value":"3"},{"text" :"4","value":"4"},{"text" :"5","value":"5"},
	{"text" :"6","value":"6"},{"text" :"7","value":"7"},{"text" :"8","value":"8"},{"text" :"9","value":"9"},{"text" :"10","value":"10"},
	{"text" :"11","value":"11"},{"text" :"12","value":"12"},{"text" :"13","value":"13"},{"text" :"14","value":"14"},{"text" :"15","value":"15"},
	{"text" :"16","value":"16"},{"text" :"17","value":"17"},{"text" :"18","value":"18"},{"text" :"19","value":"19"},{"text" :"20","value":"20"},
	{"text" :"21","value":"21"},{"text" :"22","value":"22"},{"text" :"23","value":"23"},{"text" :"24","value":"24"},{"text" :"25","value":"25"},
	{"text" :"26","value":"26"},{"text" :"27","value":"27"},{"text" :"28","value":"28"},{"text" :"29","value":"29"},{"text" :"30","value":"30"},
	{"text" :"31","value":"31"},{"text" :"32","value":"32"},{"text" :"33","value":"33"},{"text" :"34","value":"34"},{"text" :"35","value":"35"},
	{"text" :"36","value":"36"},{"text" :"37","value":"37"},{"text" :"38","value":"38"},{"text" :"39","value":"39"},{"text" :"40","value":"40"},
	{"text" :"41","value":"41"},{"text" :"42","value":"42"},{"text" :"43","value":"43"},{"text" :"44","value":"44"},{"text" :"45","value":"45"},
	{"text" :"46","value":"46"},{"text" :"47","value":"47"},{"text" :"48","value":"48"},{"text" :"49","value":"49"},{"text" :"50","value":"50"},
	{"text" :"51","value":"51"},{"text" :"52","value":"52"}];
	day_of_week_data=[{"text" :"ALL","value":"ALL"},{"text" :"1","value":"1"},{"text" :"2","value":"2"},{"text" :"3","value":"3"},{"text" :"4","value":"4"},{"text" :"5","value":"5"},{"text" :"6","value":"6"},{"text" :"7","value":"7"}];
	
	chart_all=[{text:"Status",value:"Status"},{text:"Equipment",value:"Equipment"},{text:"Organization Code",value:"org_code"},{text:"Customer Id",value:"Customer Id"},{text:"Priority",value:"Priority"},{text:"Asset",value:"Asset"},{text:"Service call no",value:"Service call no"},{text:"Year(Created)",value:"Year(Created)"},{text:"Qtr(Created)",value:"Qtr(Created)"},{text:"Month(Created)",value:"Month(Created)"},{text:"Week(Created)",value:"Week(Created)"},{text:"Day(Created)",value:"Day(Created)"},{text:"Year(Assigned)",value:"Year(Assigned)"},{text:"Qtr(Assigned)",value:"Qtr(Assigned)"},{text:"Month(Assigned)",value:"Month(Assigned)"},{text:"Week(Assigned)",value:"Week(Assigned)"},{text:"Day(Assigned)",value:"Day(Assigned)"},{text:"Year(Closed)",value:"Year(Closed)"},{text:"Month(Closed)",value:"Month(Closed)"},{text:"Qtr(Closed)",value:"Qtr(Closed)"},{text:"Week(Closed)",value:"Week(Closed)"},{text:"Day(Closed)",value:"Day(Closed)"},{text:"Assigned to function role",value:"Assigned to functional role"},{text:"Assigned to employee",value:"Assigned to employee"},{text:"Reporting to function role",value:"Reporting to functional role"},{text:"Reporting to employee",value:"Reporting to employee"},
	{text:"Mapped to function role",value:"Mapped to functional role"},{text:"Mapped to employee",value:"Mapped to employee"}];
	chart_series=[{text:"No series",value:"No series"},{text:"Priority",value:"Priority"},{text:"Status",value:"Status"},{text:"Equipment",value:"Equipment"},{text:"Asset",value:"Asset"},{text:"Service call no",value:"Service call no"},{text:"Year(Created)",value:"Year(Created)"},{text:"Qtr(Created)",value:"Qtr(Created)"},{text:"Month(Created)",value:"Month(Created)"},{text:"Week(Created)",value:"Week(Created)"},{text:"Day(Created)",value:"Day(Created)"},{text:"Year(Assigned)",value:"Year(Assigned)"},{text:"Qtr(Assigned)",value:"Qtr(Assigned)"},{text:"Month(Assigned)",value:"Month(Assigned)"},{text:"Week(Assigned)",value:"Week(Assigned)"},{text:"Day(Assigned)",value:"Day(Assigned)"},{text:"Year(Closed)",value:"Year(Closed)"},{text:"Month(Closed)",value:"Month(Closed)"},{text:"Qtr(Closed)",value:"Qtr(Closed)"},{text:"Week(Closed)",value:"Week(Closed)"},{text:"Day(Closed)",value:"Day(Closed)"},
	{text:"Assigned to function role",value:"Assigned to functional role"},{text:"Assigned to employee",value:"Assigned to employee"},{text:"Reporting to function role",value:"Reporting to functional role"},{text:"Reporting to employee",value:"Reporting to employee"},
	{text:"Mapped to function role",value:"Mapped to functional role"},{text:"Mapped to employee",value:"Mapped to employee"}];

	arrray_summary_series=[{key_value:"2",arrayname:"scall_sc_status",value:"Status",textfield:"p_description",valuefield:"p_status_code"},
	{key_value:"3",arrayname:"scall_sc_priority",value:"Priority",textfield:"p_code_value_description",valuefield:"p_code_value"},
	{key_value:"21",arrayname:"scall_customer_id",value:"Customer Id",textfield:"p_customer_name",valuefield:"p_customer_id"},
	{key_value:"20",arrayname:"scall_eq_id",value:"Equipment",textfield:"p_description",valuefield:"p_equipment_id"},
	{key_value:"4",arrayname:"scall_creation_year",value:"Year(Created)",textfield:"text",valuefield:"value"},
	{key_value:"6",arrayname:"scall_creation_month",value:"Month(Created)",textfield:"text",valuefield:"value"},
	{key_value:"5",arrayname:"scall_creation_qtr",value:"Qtr(Created)",textfield:"text",valuefield:"value"},
	{key_value:"7",arrayname:"scall_creation_wk_of_mth",value:"Week(Created)",textfield:"text",valuefield:"value"},
	{key_value:"8",arrayname:"scall_creation_day_of_wk",value:"Day(Created)",textfield:"text",valuefield:"value"},
	
	{key_value:"9",arrayname:"scall_assign_year",value:"Year(Assigned)",textfield:"text",valuefield:"value"},
	{key_value:"10",arrayname:"scall_assign_month",value:"Month(Assigned)",textfield:"text",valuefield:"value"},
	{key_value:"11",arrayname:"scall_assign_qtr",value:"Qtr(Assigned)",textfield:"text",valuefield:"value"},
	{key_value:"12",arrayname:"scall_assign_wk_of_mth",value:"Week(Assigned)",textfield:"text",valuefield:"value"},
	{key_value:"13",arrayname:"scall_assign_day_of_wk",value:"Day(Assigned)",textfield:"text",valuefield:"value"},
	
	
	{key_value:"14",arrayname:"scall_close_year",value:"Year(Closed)",textfield:"text",valuefield:"value"},
	{key_value:"16",arrayname:"scall_close_month",value:"Month(Closed)",textfield:"text",valuefield:"value"},
	{key_value:"15",arrayname:"scall_close_qtr",value:"Qtr(Closed)",textfield:"text",valuefield:"value"},
	{key_value:"17",arrayname:"scall_close_wk_of_mth",value:"Week(Closed)",textfield:"text",valuefield:"value"},
	{key_value:"18",arrayname:"scall_close_day_of_wk",value:"Day(Closed)",textfield:"text",valuefield:"value"},
	{key_value:"20",arrayname:"scall_eq_id",value:"Equipment",textfield:"p_description",valuefield:"p_equipment_id"},
	
	{key_value:"23",arrayname:"scall_fn_role",value:"Assigned to functional role",textfield:"p_code_value_description",valuefield:"p_code_value"},
	{key_value:"24",arrayname:"",value:"Assigned to employee",textfield:"",valuefield:""},
	{key_value:"25",arrayname:"scall_rep_fn_role",value:"Reporting to functional role",textfield:"p_code_value_description",valuefield:"p_code_value"},
	{key_value:"26",arrayname:"",value:"Reporting to employee",textfield:"",valuefield:""},
	{key_value:"27",arrayname:"scall_map_fn_role",value:"Mapped to functional role",textfield:"p_code_value_description",valuefield:"p_code_value"},
	{key_value:"28",arrayname:"",value:"Mapped to employee",textfield:"",valuefield:""},
	{key_value:"1",arrayname:"",value:"org_code",textfield:"",valuefield:""},
	{key_value:"19",arrayname:"scall_asset",value:"Asset",textfield:"p_asset_description",valuefield:" p_asset_id"},
	{key_value:"30",arrayname:"",value:"Service call no",textfield:"",valuefield:""},
	{key_value:"00",arrayname:"",value:"No series",textfield:"",valuefield:""}];
	
	scall_metric_array=new Array();
	$('#scall_chart_retrieve').on('click',function(){
	$("#spinner").show(500,function()
	{
		$("#spinner").hide();
	});
	var scall_metrics=executeService_report_scall_metrics();
	if (scall_metrics == '1')
	               {
	             return 1;
	           }		
	scall_metrics_list=loadXMLString(scall_metrics);
	
	report_scall_analysis_datasource = new kendo.data.DataSource({
						data: scall_metrics_list,
					
						schema: {
						 type: "xml",
                         data: "list/scall_record",
                           model: {
                             fields: {
                                 
									org_level_no:"org_level_no/text()",
                                    org_level_code: "org_level_code/text()",
									scall_status:"scall_status/text()",
									scall_priority:"scall_priority/text()",
									creation_year:"creation_year/text()",
								    creation_qtr:"creation_qtr/text()",
								    creation_month:"creation_month/text()",
									creation_wk_of_mth:"creation_wk_of_mth/text()",
                                    creation_day_of_wk:"creation_day_of_wk/text()",
									assign_year:"assign_year/text()",
									assign_qtr:"assign_qtr/text()",
									assign_month:"assign_month/text()",
									assign_wk_of_mth :"assign_wk_of_mth/text()",
									assign_day_of_wk:"assign_day_of_wk/text()",
									
									
									close_year:"close_year/text()",
									close_qtr:"close_qtr/text()",
									close_month:"close_month/text()",
									close_wk_of_mth :"close_wk_of_mth/text()",
									close_day_of_wk:"close_day_of_wk/text()",
									
								    equipment_id:"equipment_id/text()",
									asset_id: "asset_id/text()",
                                    customer_id:"customer_id/text()",
									customer_location:"customer_location/text()",
									assigned_to_function_role:"assigned_to_function_role/text()",
									assigned_to_emp_id :"assigned_to_emp_id/text()",
									reporting_to_function_role:"reporting_to_function_role/text()",
									reporting_to_emp_id :"reporting_to_emp_id/text()",
									mapped_to_function_role:"mapped_to_function_role/text()",
									mapped_to_emp_id :"mapped_to_emp_id/text()",
									jo_no:"jo_no/text()",
									cause_code:"cause_code/text()",
									scall_ref_no:"scall_ref_no/text()"
                                  }
                           }
                       }
							
                        });
	report_scall_analysis_datasource.read();
	scall_parsed_chart_array=[];
	report_scall_metric=report_scall_analysis_datasource.data();

	for(i=0;i<report_scall_metric.length;i++)
	{
	scall_metric_array[i]=new Array();
	scall_metric_array[i][0] =report_scall_metric[i].org_level_no ;
	scall_metric_array[i][1]=report_scall_metric[i].org_level_code; 
	scall_metric_array[i][2]=report_scall_metric[i].scall_status ;
	scall_metric_array[i][3]=report_scall_metric[i].scall_priority ;
	scall_metric_array[i][4]=report_scall_metric[i].creation_year ;
	scall_metric_array[i][5]=report_scall_metric[i].creation_qtr;
	scall_metric_array[i][6]=report_scall_metric[i].creation_month ;
	scall_metric_array[i][7]=report_scall_metric[i].creation_wk_of_mth ;
	scall_metric_array[i][8]=report_scall_metric[i].creation_day_of_wk ;
	
	scall_metric_array[i][9]=report_scall_metric[i].assign_year;
	scall_metric_array[i][10] =report_scall_metric[i].assign_qtr ;
	scall_metric_array[i][11]=report_scall_metric[i].assign_month;
	scall_metric_array[i][12]=report_scall_metric[i].assign_wk_of_mth ;
	scall_metric_array[i][13]=report_scall_metric[i].assign_day_of_wk ;
	
	scall_metric_array[i][14]=report_scall_metric[i].close_year;
	scall_metric_array[i][15] =report_scall_metric[i].close_qtr ;
	scall_metric_array[i][16]=report_scall_metric[i].close_month;
	scall_metric_array[i][17]=report_scall_metric[i].Close_wk_of_mth ;
	scall_metric_array[i][18]=report_scall_metric[i].close_day_of_wk ;
	scall_metric_array[i][19]=report_scall_metric[i].asset_id;
	scall_metric_array[i][20]=report_scall_metric[i].equipment_id;
	scall_metric_array[i][21]=report_scall_metric[i].customer_id ;
	scall_metric_array[i][22]=report_scall_metric[i].cause_code ;
	
	scall_metric_array[i][23]=report_scall_metric[i].assigned_to_function_role ;
	scall_metric_array[i][24]=report_scall_metric[i].assigned_to_emp_id ;
	
	scall_metric_array[i][25]=report_scall_metric[i].reporting_to_function_role ;
	scall_metric_array[i][26]=report_scall_metric[i].reporting_to_emp_id ;
	
	scall_metric_array[i][27]=report_scall_metric[i].mapped_to_function_role ;
	scall_metric_array[i][28]=report_scall_metric[i].mapped_to_emp_id ;
	scall_metric_array[i][29]=report_scall_metric[i].jo_no ;
	scall_metric_array[i][30]=report_scall_metric[i].scall_ref_no ;
	}
	no_jo=report_scall_metric.length;
	total_jo='[{"field":"no_jo"}]';
	total_jo_array=$.parseJSON(total_jo);
	 
	scall_chart_array=[];
	
	//scall_calling_chart_data();
	scall_calling_filter_array()
	scall_summary_and_series_by();
	
	});
	scall_filtered_array=new Array();	
	
	function scall_calling_filter_array()
	{
	
		ind="false";
		for(j=0;j<scall_filtered_value.length;j++)
		{
			if(scall_filtered_value[j] != "ALL" &&  scall_filtered_value[j] != "")
			{
				ind="true";
			}
			
		}
		scall_filtered_array=scall_metric_array
		if(ind == "true")
		{
		aa=scall_metric_array;
		filtered_array_sample=new Array();
			for(j=0;j<scall_filtered_value.length;j++)
			{
				var l=0;
				if(scall_filtered_value[j] != "" && scall_filtered_value[j] != "ALL" )
				{
					
					for(i=0;i<aa.length;i++)
					{
						if(scall_filtered_value[j] != "ALL")
						{
							if(scall_filtered_value[j] == aa[i][j])
							{
								//alert("aa length="+aa.length)
								filtered_array_sample[l]=new Array();
								filtered_array_sample[l]=aa[i];
						
								l++;
							}
						}
				
					}
					aa=new Array();
					aa=filtered_array_sample;
					scall_filtered_array=filtered_array_sample;
					filtered_array_sample=new Array();
					
				}
			} 
		}
	
	
	scall_filtered_chart_data();		
	}
	
	function scall_filtered_chart_data()
	{
	var scall_datas=new Array();
	for(i=0;i<scall_filtered_array.length;i++)
	{
	scall_datas[i]=new Array();
	scall_datas[i].org_level_no=scall_filtered_array[i][0]  ;
	scall_datas[i].org_level_code=scall_filtered_array[i][1]; 
	scall_datas[i].scall_status=scall_filtered_array[i][2] ;
	scall_datas[i].scall_priority=scall_filtered_array[i][3];
	scall_datas[i].creation_year =scall_filtered_array[i][4];
	scall_datas[i].creation_qtr=scall_filtered_array[i][5];
	scall_datas[i].creation_month=scall_filtered_array[i][6];
	scall_datas[i].creation_wk_of_mth=scall_filtered_array[i][7] ;
	scall_datas[i].creation_day_of_wk=scall_filtered_array[i][8];
	scall_datas[i].assign_year=scall_filtered_array[i][9];
	scall_datas[i].assign_qtr =scall_filtered_array[i][10];
	scall_datas[i].assign_month=scall_filtered_array[i][11]  ;
	scall_datas[i].assign_wk_of_mth =scall_filtered_array[i][12];
	scall_datas[i].assign_day_of_wk =scall_filtered_array[i][13];
	
	scall_datas[i].close_year=scall_filtered_array[i][14];
	scall_datas[i].close_qtr =scall_filtered_array[i][15];
	scall_datas[i].close_month=scall_filtered_array[i][16]  ;
	scall_datas[i].Close_wk_of_mth =scall_filtered_array[i][17];
	scall_datas[i].close_day_of_wk =scall_filtered_array[i][18];
	scall_datas[i].asset_id =scall_filtered_array[i][19];
	scall_datas[i].equipment_id =scall_filtered_array[i][20];
	scall_datas[i].customer_id=scall_filtered_array[i][21] ;
	scall_datas[i].cause_code=scall_filtered_array[i][22] ;
	scall_datas[i].assigned_to_function_role =scall_filtered_array[i][23];
	scall_datas[i].assigned_to_emp_id =scall_filtered_array[i][24];
	scall_datas[i].reporting_to_function_role =scall_filtered_array[i][25];
	scall_datas[i].reporting_to_emp_id =scall_filtered_array[i][26];
	scall_datas[i].mapped_to_function_role =scall_filtered_array[i][27];
	scall_datas[i].mapped_to_emp_id =scall_filtered_array[i][28];
	scall_datas[i].jo_no =scall_filtered_array[i][29];
	scall_datas[i].scall_ref_no =scall_filtered_array[i][30];
	
	
	}
	
						   	
	  $("#report_scall_analysis_grid").kendoGrid({
                        dataSource:{	
						data:scall_datas ,
						 pageSize: 10
						 },
						pageable: {
                            refresh: true,
                            pageSizes: true
                        },
                        height: "400%",
						sortable: true,
						resizable:true,
                        selectable:true,
						
                        columns: [
								{ field:"jo_no", title: "JO No", width: "100px" },
								{ field:"scall_ref_no", title: "Servicecall NO", width: "100px" },
								{ field:"org_level_no", title: "Org level no", width: "100px",
									template: function(e)
									{
										if(e.org_level_no !="" && e.org_level_no != undefined)
										{
											if(scall_organogram_level_no.dataSource.data().length > 1)
											{
												var datasource_value = scall_organogram_level_no.dataSource.data();
											var ds =new kendo.data.DataSource({data:datasource_value});	
											var val = parseInt(e.org_level_no);
											ds.filter(
											{
												field: "p_level_id",
												operator: "eq",
												value: val
											});
											return ds.view()[0].p_level_name;
											}
											else
											{
												return e.val;
											}
										}
										else
										{
											return "";
										}
									}
								},
								{ field:"org_level_code", title: "Org level code", width: "100px",},
								{ field: "scall_status", title:"Status",  width: "100px",
									template: function(e)
									{
										if(e.scall_status !="" && e.scall_status != undefined)
										{
											if(scall_sc_status.dataSource.data().length > 1)
											{
											var datasource_value = scall_sc_status.dataSource.data();
										
											var ds =new kendo.data.DataSource({data:datasource_value});	
											ds.filter(
											{
												field: "p_status_code",
												operator: "eq",
												value: e.scall_status
											});
											return ds.view()[0].p_description;
											}
											else
											{
												return e.scall_status;
											}
										}
										else
										{
											return "";
										}
									}	

									},
								{ field:"scall_priority", title: "Priority", width: "100px",
									template: function(e)
									{
										if(e.scall_priority !="" && e.scall_priority != undefined)
										{
											if(scall_sc_priority.dataSource.data().length > 1)
											{
											var datasource_value = scall_sc_priority.dataSource.data();
											var ds =new kendo.data.DataSource({data:datasource_value});	
											ds.filter(
											{
												field: "p_code_value",
												operator: "eq",
												value: e.scall_priority
											});
											return ds.view()[0].p_code_value_description;
											}
											else
											{
												return e.scall_priority;
											}
										}
										else
										{
											return "";
										}
									}	
								},
								
								{ field: "creation_year", title:"Year(Creation)",  width: "100px" },
								{ field:"creation_qtr", title: "Quarter(Creation)", width: "100px" },
								{ field:"creation_month", title: "Month(Creation)", width: "100px" ,
								template: function(e)
									{
										if(e.creation_month !="" && e.creation_month != undefined)
										{
											if(scall_creation_month.dataSource.data().length > 1)
											{
											var datasource_value = scall_creation_month.dataSource.data();
											var ds =new kendo.data.DataSource({data:datasource_value});	
											ds.filter(
											{
												field: "value",
												operator: "eq",
												value: e.creation_month
											});
											return ds.view()[0].text;
											}
											else
											{
												return e.creation_month;
											}
										}
										else
										{
											return "";
										}
									} 
								},
								{ field: "creation_wk_of_mth", title:"Week of month(Creation)",  width: "100px" ,},
								{ field:"creation_day_of_wk", title: "Day of week(Creation)", width: "100px" },
								
								
								{ field: "assign_year", title:"Year(Assigned)",  width: "100px" },
								{ field:"assign_qtr", title: "Quarter(Assigned)", width: "100px" },
								{ field:"assign_month", title: "Month(Assigned)", width: "100px" ,
								template: function(e)
									{
										if(e.assign_month !="" && e.assign_month != undefined)
										{
											if(scall_assign_month.dataSource.data().length > 1)
											{
											var datasource_value = scall_assign_month.dataSource.data();
											var ds =new kendo.data.DataSource({data:datasource_value});	
											ds.filter(
											{
												field: "value",
												operator: "eq",
												value: e.assign_month
											});
											return ds.view()[0].text;
											}
											else
											{
												return e.assign_month;
											}
										}
										else
										{
											return "";
										}
									} 
								},
								{ field: "assign_wk_of_mth", title:"Week of month(Assigned)",  width: "100px" ,},
								{ field:"assign_day_of_wk", title: "Day of week(Assigned)", width: "100px" },
								
								
								{ field: "close_year", title:"Year(Closed)",  width: "100px" },
								{ field:"close_qtr", title: "Quarter(Closed)", width: "100px" },
								{ field:"close_month", title: "Month(Closed)", width: "100px" ,
								template: function(e)
									{
										if(e.close_month !="" && e.close_month != undefined)
										{
											if(scall_close_month.dataSource.data().length > 1)
											{
											var datasource_value = scall_close_month.dataSource.data();
											var ds =new kendo.data.DataSource({data:datasource_value});	
											ds.filter(
											{
												field: "value",
												operator: "eq",
												value: e.close_month
											});
											return ds.view()[0].text;
											}
											else
											{
												return e.close_month;
											}
										}
										else
										{
											return "";
										}
									} 
								},
								{ field: "close_wk_of_mth", title:"Week of month(Closed)",  width: "100px" ,},
								{ field:"close_day_of_wk", title: "Day of week(Closed)", width: "100px" },
								{ field:"equipment_id", title: "Equipment", width: "100px" ,
									template: function(e)
									{
										if(e.equipment_id !="" && e.equipment_id != undefined)
										{
											if(scall_eq_id.dataSource.data().length > 1)
											{
											var datasource_value = scall_eq_id.dataSource.data();
											var ds =new kendo.data.DataSource({data:datasource_value});	
											ds.filter(
											{
												field: "p_equipment_id",
												operator: "eq",
												value: e.equipment_id
											});
											return ds.view()[0].p_description;
											}
											else
											{
												return e.equipment_id;
											}
										}
										else
										{
											return "";
										}
									} 
								},
								{ field: "customer_id", title:"Customer",  width: "100px",
									template: function(e)
									{
										if(e.customer_id !="" && e.customer_id != undefined)
										{
											if(scall_customer_id.dataSource.data().length > 1)
											{
											var datasource_value = scall_customer_id.dataSource.data();
											var ds =new kendo.data.DataSource({data:datasource_value});	
											ds.filter(
											{
												field: "p_customer_id",
												operator: "eq",
												value: e.customer_id
											});
											return ds.view()[0].p_customer_name;
											}
											else
											{
												return e.customer_id;
											}
										}
										else
										{
											return "";
										}
									} 
								},
								{ field: "asset_id", title:"Asset",  width: "100px",
									template: function(e)
									{
										if(e.asset_id !="" && e.asset_id != undefined)
											{
												if(scall_asset.dataSource.data().length > 1)
												{
												var datasource_value = scall_asset.dataSource.data();
												var ds =new kendo.data.DataSource({data:datasource_value});	
												ds.filter(
												{
													field: "p_asset_id",
													operator: "eq",
													value: e.asset_id
												});
												return ds.view()[0].p_asset_description;
												}
												else
												{
													return e.asset_id;
												}
											}
											else
											{
												return "";
											}
									} 
								},
								
								{ field: "cause_code", title:"Cause code",  width: "100px",
									template: function(e)
									{
										if(e.cause_code !="" && e.cause_code != undefined)
											{
												if(scall_cause_code.dataSource.data().length > 1)
												{
												var datasource_value = scall_cause_code.dataSource.data();
												var ds =new kendo.data.DataSource({data:datasource_value});	
												ds.filter(
												{
													field: "p_code_value",
													operator: "eq",
													value: e.cause_code
												});
												return ds.view()[0].p_code_value_description;
												}
												else
												{
													return e.cause_code;
												}
											}
											else
											{
												return "";
											}
									} 
								},
								{ field: "assigned_to_function_role", title:"Assigned to <br/>functional role",  width: "100px",
									template: function(e)
									{
										if(e.assigned_to_function_role !="" && e.assigned_to_function_role != undefined)
											{
												if(scall_fn_role.dataSource.data().length > 1)
												{
												var datasource_value = scall_fn_role.dataSource.data();
												var ds =new kendo.data.DataSource({data:datasource_value});	
												ds.filter(
												{
													field: "p_code_value",
													operator: "eq",
													value: e.assigned_to_function_role
												});
												return ds.view()[0].p_code_value_description;
												}
												else
												{
													return e.assigned_to_function_role;
												}
											}
											else
											{
												return "";
											}
									}
								},
								{ field: "assigned_to_emp_id", title:"Assigned to <br>employee",  width: "100px" },
								{ field: "reporting_to_function_role", title:"Reporting to <br/>functional role",  width: "100px",
									template: function(e)
									{
										if(e.reporting_to_function_role !="" && e.reporting_to_function_role != undefined)
											{
												if(scall_rep_fn_role.dataSource.data().length > 1)
												{
												var datasource_value = scall_rep_fn_role.dataSource.data();
												var ds =new kendo.data.DataSource({data:datasource_value});	
												ds.filter(
												{
													field: "p_code_value",
													operator: "eq",
													value: e.reporting_to_function_role
												});
												return ds.view()[0].p_code_value_description;
												}
												else
												{
													return e.reporting_to_function_role;
												}
											}
											else
											{
												return "";
											}
									} 

								},
								{ field: "reporting_to_emp_id", title:"Reporting to <br/> employee",  width: "100px" },
								{ field: "mapped_to_function_role", title:"Mapped to <br/>functional role",  width: "100px",
									template: function(e)
									{
										if(e.mapped_to_function_role !="" && e.mapped_to_function_role != undefined)
											{
												if(scall_map_fn_role.dataSource.data().length > 1)
												{
												var datasource_value = scall_map_fn_role.dataSource.data();
												var ds =new kendo.data.DataSource({data:datasource_value});	
												ds.filter(
												{
													field: "p_code_value",
													operator: "eq",
													value: e.mapped_to_function_role
												});
												return ds.view()[0].p_code_value_description;
												}
												else
												{
													return e.mapped_to_function_role;
												}
											}
											else
											{
												return "";
											}
									} 
								},
								{ field: "mapped_to_emp_id", title:"Mapped to employee",  width: "100px" }
								
					]	
		    }); 
		
	 report_scall_analysis_grid= $("#report_scall_analysis_grid").data("kendoGrid");
	} 
	x_value="";
	y_value="";
	function scall_summary_and_series_by()
	{
		for(l=0;l<arrray_summary_series.length;l++)
		{
			if( $("#scall_chart_all").val() == arrray_summary_series[l].value )
			{
				x_value=arrray_summary_series[l].key_value;
				x_value_arrayname=eval(arrray_summary_series[l].arrayname);
				x_text_field = arrray_summary_series[l].textfield;
				x_value_field = arrray_summary_series[l].valuefield;
			}
			if( $("#scall_chart_series").val() == arrray_summary_series[l].value )
			{
				y_value=arrray_summary_series[l].key_value;
				y_value_arrayname=eval(arrray_summary_series[l].arrayname);
				y_text_field = arrray_summary_series[l].textfield;
				y_value_field = arrray_summary_series[l].valuefield;
			}
		}
		if(scall_filtered_array.length > 0)
		{
		arr=[];
		arr1=[];
		for(i=0;i<scall_filtered_array.length;i++)
		{
			if(scall_filtered_array[i][x_value] != undefined)
			{
				if(arr.length == 0)
				{
					arr.push({
						value:scall_filtered_array[i][x_value]
					});
				}
				else
				{
					var val=1;
					for(j=0;j<arr.length;j++)
					{
						if(arr[j].value == scall_filtered_array[i][x_value] )
						{
							val=0;
						}
					}
					if(val==1)
					{
						arr.push({
							value:scall_filtered_array[i][x_value]
						});
					}
				}
			}
		}
	  arr.sort(function(a,b){return (a.value)-(b.value)});
	  
		for(i=0;i<scall_filtered_array.length;i++)
		{
			if(scall_filtered_array[i][y_value] != undefined)
			{
				if(arr1.length == 0)
				{
					arr1.push({
						value:scall_filtered_array[i][y_value]
					});
				}
				else
				{
					var val=1;
					for(j=0;j<arr1.length;j++)
					{
						if(arr1[j].value == scall_filtered_array[i][y_value] )
						{
							val =0;
						}
					}
					if(val ==1)
					{
						arr1.push({
							value:scall_filtered_array[i][y_value]
						});
					}
				}
			}	
		} 
		
		
		
		
		
	if(arr.length != 0 && $("#scall_chart_series").val() =="No series")
	  {
	scall_chart_array=[];
	for(j=0;j<arr.length;j++)
	{	
		if(arr[j].value !="ALL")
		{
			x_desc=arr[j].value ;
			if(x_value_arrayname != "" && x_value_arrayname != undefined)
			{
			var datasource_value = x_value_arrayname.dataSource.data();
			 var ds =new kendo.data.DataSource({data:datasource_value});	
				ds.filter(
				{
					field: x_value_field,
					operator: "eq",
					value: arr[j].value
				});
				x_desc = ds.view()[0][x_text_field];
				
			}	
			m=1;
			var x={};
			var chart_arr1="";
			chart_arr1 +="[";					
			eval("x.jo_category"+"="+"'"+x_desc+"'");
			var value=0;
				series_value=0;	
				
					for(k=0;k<scall_filtered_array.length;k++)
					{
						if(scall_filtered_array[k][x_value] == arr[j].value )
						{
							series_value++;
							value=series_value;
						}
					}
					if(value == 0)
					{
					value="";
					}
					eval("x.series"+m+"="+"'"+value+"'");
					
					chart_arr1 +='{'+'"'+'field'+'"'+':'+'"'+'series'+m+'"'+','+'"'+'name'+'"'+':'+'"' +'"'+'}';
		
			scall_chart_array.push(x);
			chart_arr1 +="]";
				
		}
	}
		scall_parsed_chart_array=$.parseJSON(chart_arr1);
		manage_scall_chart(); 
	}
		
		
		
		
	 if(arr.length != 0 && arr1.length != 0 && $("#scall_chart_series").val() !="No series")
	  {
	scall_chart_array=[];
	for(j=0;j<arr.length;j++)
	{	
		if(arr[j].value !="ALL")
		{
			x_desc=arr[j].value ;
			if(x_value_arrayname != "" && x_value_arrayname != undefined)
			{
			var datasource_value = x_value_arrayname.dataSource.data();
			 var ds =new kendo.data.DataSource({data:datasource_value});	
				ds.filter(
				{
					field: x_value_field,
					operator: "eq",
					value: arr[j].value
				});
				x_desc = ds.view()[0][x_text_field];
				
			}	
			m=1;
			var x={};
			var chart_arr1="";
			chart_arr1 +="[";					
			eval("x.jo_category"+"="+"'"+x_desc+"'");
			for(i=0;i<arr1.length;i++)
			{
				var value=0;
				series_value=0;	
				if(arr1[i].value !="ALL")
				{
					for(k=0;k<scall_filtered_array.length;k++)
					{
						if(scall_filtered_array[k][x_value] == arr[j].value &&  scall_filtered_array[k][y_value]== arr1[i].value )
						{
							series_value++;
							value=series_value;
						}
					}
					if(value == 0)
					{
					value="";
					}
					eval("x.series"+m+"="+"'"+value+"'");
					y_desc= arr1[i].value;
					if(y_value_arrayname != "" && y_value_arrayname != undefined)
					{
							var datasource_value_series = y_value_arrayname.dataSource.data();
							var ds_series =new kendo.data.DataSource({data:datasource_value_series});	
							ds_series.filter(
							{
								field: y_value_field,
								operator: "eq",
								value: arr1[i].value
							});
							y_desc = ds_series.view()[0][y_text_field];
							
						
					}
					chart_arr1 +='{'+'"'+'field'+'"'+':'+'"'+'series'+m+'"'+','+'"'+'name'+'"'+':'+'"'+y_desc +'"';
					if(m !=arr1.length)
					{
						chart_arr1 +='},';
					}
					else
					{
						chart_arr1 +='}';
					}
					m++;
				}
			}
			scall_chart_array.push(x);
			chart_arr1 +="]";
				
		}
	}
		scall_parsed_chart_array=$.parseJSON(chart_arr1);
		manage_scall_chart(); 
		}
		if(arr.length == 0 && arr1.length == 0)
		{
			
			scall_chart_array=[];
			chart_arr1='[{"field":"series1","name":""}]';
			scall_parsed_chart_array=$.parseJSON(chart_arr1);
			var chart_arr2='[{"jo_category":"There is no data for the chosen criteria","jo_series1":""}]';
			scall_chart_array=$.parseJSON(chart_arr2);
			manage_scall_chart();  
		}		
		
		}
		else
		{
			scall_chart_array=[];
			chart_arr1='[{"field":"series1","name":""}]';
			scall_parsed_chart_array=$.parseJSON(chart_arr1);
			var chart_arr2='[{"jo_category":"There is no data for the chosen criteria","jo_series1":""}]';
			scall_chart_array=$.parseJSON(chart_arr2);
			manage_scall_chart();  
		}
	   
	
	}

	$(".configuration").bind("change", refresh);
	function manage_scall_chart()
	{
		$("#chart_report_scall_metrics").kendoChart({
                theme: $(document).data("kendoSkin") || "silver",
				dataSource: {
					data: scall_chart_array,
				},
				title: {
					text: "Service Call Analysis"
				},
				legend: {
					position: "right"
				},
				seriesDefaults: {
					type: "column",
					// stack: true,
					labels: {
						visible: true,
						format: "{0}"
					}  
				},
				series: scall_parsed_chart_array,
				categoryAxis: 
				{
					field: "jo_category",
					title:
					{
						text:""
					}
				} ,
				valueAxis:{
					field: "total_jo_array",
					title:
					{
					text:"No of Service calls"
					}
					
				},	
				 tooltip: {
					visible: true,
					format: "{0}",
					template:"#= series.name #: #= value #"
				}
                        
    }); 
   
	
	var chart = $("#chart_report_scall_metrics").data("kendoChart");
                        series = chart.options.series;
                        type = $("input[name=seriesType]:checked").val();
						// stack = $("#stack").prop("checked");

                    for (var i = 0, length = series.length; i < length; i++) {
						// series[i].stack = stack;
                       series[i].type = type;
                    };
					if(type == "column" || type == "line")
						{
						
							var labels=chart.options.categoryAxis.labels;
							labels.rotation=50;
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
	function refresh() {
		var chart = $("#chart_report_scall_metrics").data("kendoChart");
		series = chart.options.series;
		type = $("input[name=seriesType]:checked").val();
		// stack = $("#stack").prop("checked");

		for (var i = 0, length = series.length; i < length; i++) {
			// series[i].stack = stack;
			series[i].type = type;
		};
		if(type == "column" || type == "line")
			{
			
				var labels=chart.options.categoryAxis.labels;
				labels.rotation=50;
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
	

	$("#scall_chart_series").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:chart_series,
	change:function()
	{
	scall_calling_filter_array();
	scall_summary_and_series_by();
	
	}
	});
	scall_chart_series = $("#scall_chart_series").data("kendoDropDownList");
	$("#scall_chart_all").kendoDropDownList({
	index:0,
	dataTextField: "text",
    dataValueField: "value",
    dataSource:chart_all,
	
	change:function()
	{
	scall_calling_filter_array();
	scall_summary_and_series_by();
	}
	});
	scall_chart_all = $("#scall_chart_all").data("kendoDropDownList");
	
		list_of_org_entities = [{"text":"ALL",value:"ALL"}];
	var inputParameter ="";
	scall_organogram_level_no = InitializeDropDownListWithTransport("scall_organogram_level_no", "common_modules","retrieve_listof_org_levels", "p_level_name", "p_level_id",inputParameter,false,true);
	
	scall_organogram_level_no.bind("change",function()
	{
		scall_filtered_value[0]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
		
		org_entity_type =this.value();
	
	if(org_entity_type != "ALL")
	{
	org_lvl_code_arr=new Array();
	org_entities_code = [{"text":"ALL",value:"ALL"}];
	executeService_retrieve_listof_org_level_codes();
   			
		for(i=0;i<org_lvl_code_arr.length;i++)
		{
			org_entities_code.push({
				value:org_lvl_code_arr[i][0],
	            text:org_lvl_code_arr[i][1]
			});
		}
	
	scall_organogram_level_code.dataSource.data(org_entities_code);
	
    
	}  
	else
	{
	 	org_entities_code = [{"text":"ALL",value:"ALL"}];
	scall_organogram_level_code.dataSource.data(org_entities_code);	
	}
	
	});
	
	org_lvlcodes_data=[{"text" :"ALL","value":"ALL"}];
	$("#scall_organogram_level_code").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:org_lvlcodes_data,
	template:'${ data.value }'+'-'+'${ data.text }',
	
	change:function()
	{
		scall_filtered_value[1]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	scall_organogram_level_code=$("#scall_organogram_level_code").data("kendoDropDownList");
	
	

	
	var inputParameter ="";
	scall_sc_status = InitializeDropDownListWithTransport("scall_sc_status", "mservice","retrieve_listof_scall_status_codes", "p_description", "p_status_code",inputParameter,false,true);
	
	scall_sc_status.bind("change",function()
	{
		scall_filtered_value[2]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	});
	
	var inputParameter = {p_lov_code_type : "SCALPRIORITY", p_search_field_1 : "", p_search_field_2 : ""};
	scall_sc_priority = InitializeDropDownListWithTransport("scall_sc_priority", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description","p_code_value",inputParameter,false,true);
	
	scall_sc_priority.bind("change",function()
	{
		scall_filtered_value[3]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	});
	
	
	
	$("#scall_creation_year").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:year_data,
	
	change:function()
	{
		scall_filtered_value[4]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	scall_creation_year=$("#scall_creation_year").data("kendoDropDownList");
	$("#scall_creation_qtr").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:quarter_data,
	
	change:function()
	{
		scall_filtered_value[5]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	
	});
	scall_creation_qtr=$("#scall_creation_qtr").data("kendoDropDownList");
	
	$("#scall_creation_month").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:month_data,
	
	change:function()
	{
		scall_filtered_value[6]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	
	});
	scall_creation_month=$("#scall_creation_month").data("kendoDropDownList");
	
	$("#scall_creation_wk_of_mth").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:week_of_month_data,
	
	change:function()
	{
	
	
	scall_filtered_value[7]=this.value();
	scall_calling_filter_array();
	scall_summary_and_series_by();
	}
	
	});
	scall_creation_wk_of_mth=$("#scall_creation_wk_of_mth").data("kendoDropDownList");
	
	$("#scall_creation_day_of_wk").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:day_of_week_data,
	
	change:function()
	{
		scall_filtered_value[8]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	
	scall_creation_day_of_wk=$("#scall_creation_day_of_wk").data("kendoDropDownList");
	
	
	$("#scall_assign_year").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:year_data,
	
	change:function()
	{
		scall_filtered_value[9]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	scall_assign_year=$("#scall_assign_year").data("kendoDropDownList");
	$("#scall_assign_qtr").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
		scall_filtered_value[10]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	
	});
	scall_assign_qtr=$("#scall_assign_qtr").data("kendoDropDownList");
	
	$("#scall_assign_month").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:month_data,
	change:function()
	{
		scall_filtered_value[11]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	
	});
	scall_assign_month=$("#scall_assign_month").data("kendoDropDownList");
	
	$("#scall_assign_wk_of_mth").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:week_of_month_data,
	change:function()
	{
	
	
	scall_filtered_value[12]=this.value();
	scall_calling_filter_array();
	scall_summary_and_series_by();
	}
	
	});
	scall_assign_wk_of_mth=$("#scall_assign_wk_of_mth").data("kendoDropDownList");
	
	$("#scall_assign_day_of_wk").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:day_of_week_data,
	change:function()
	{
		scall_filtered_value[13]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	
	scall_assign_day_of_wk=$("#scall_assign_day_of_wk").data("kendoDropDownList");
	
	$("#scall_close_year").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:year_data,
	change:function()
	{
		scall_filtered_value[14]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	scall_close_year=$("#scall_close_year").data("kendoDropDownList");
	$("#scall_close_qtr").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
		scall_filtered_value[15]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	
	});
	scall_close_qtr=$("#scall_close_qtr").data("kendoDropDownList");
	
	$("#scall_close_month").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:month_data,
	change:function()
	{
		scall_filtered_value[16]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	
	});
	scall_close_month=$("#scall_close_month").data("kendoDropDownList");
	
	$("#scall_close_wk_of_mth").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:week_of_month_data,
	change:function()
	{
	
	
	scall_filtered_value[17]=this.value();
	scall_calling_filter_array();
	scall_summary_and_series_by();
	}
	
	});
	scall_close_wk_of_mth=$("#scall_close_wk_of_mth").data("kendoDropDownList");
	
	$("#scall_close_day_of_wk").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:day_of_week_data,
	change:function()
	{
		scall_filtered_value[18]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	
	scall_close_day_of_wk=$("#scall_close_day_of_wk").data("kendoDropDownList");
	var inputParameter ="";
	scall_asset = InitializeComboBoxWithTransport("scall_asset", "mservice","retrieve_listof_asset", "p_asset_description", "p_asset_id",inputParameter,false,true);
	
	scall_asset.bind("change",function()
	{
		scall_filtered_value[19]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	});
	
	var inputParameter ="";
	scall_eq_id = InitializeDropDownListWithTransport("scall_eq_id", "mservice","retrieve_listof_equipment", "p_description", "p_equipment_id",inputParameter,false,true);
	scall_eq_id.bind("change",function()
	{
		scall_filtered_value[20]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
		
	});
	
	var inputParameter ="";
	scall_customer_id = InitializeDropDownListWithTransport("scall_customer_id", "common_modules","retrieve_listof_customers", "p_customer_name", "p_customer_id",inputParameter,false,true);
	
	scall_customer_id.bind("change",function()
	{
		scall_filtered_value[21]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	});
	
	var inputParameter = {p_lov_code_type : "SCALCAUSE", p_search_field_1 : "", p_search_field_2 : ""};
	scall_cause_code = InitializeDropDownListWithTransport("scall_cause_code", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true);
	
	scall_cause_code.bind("change",function()
	{
		scall_filtered_value[22]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	});
	
	var inputParameter = {p_lov_code_type : "FR", p_search_field_1 : "", p_search_field_2 : ""};
	scall_fn_role = InitializeDropDownListWithTransport("scall_fn_role", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true);
	
	scall_fn_role.bind("change",function()
	{
		scall_filtered_value[23]=this.value();
		if(this.value() == "ALL")
		{
			scall_emp.value("ALL");
			scall_filtered_value[24]="ALL";
			employee_data= [{code:"ALL",description:"ALL"}];
			scall_emp.dataSource.data(employee_data);
		}
		if(this.value() != "ALL")
		{
			fn_role_filter = this.value();
			employee_data= [{code:"ALL",description:"ALL"}];
			executeService_retrieve_listof_functional_role_employee_list();
			scall_emp.dataSource.data(employee_data);
		}
		
		scall_calling_filter_array();
		scall_summary_and_series_by();
	});
	
	employee_data= [{code:"ALL",description:"ALL"}];	
	$("#scall_emp").kendoComboBox({
	dataTextField: "code",
    dataValueField: "code",
    dataSource:employee_data,
	template:'${ data.code }'+'-'+'${ data.description }',
	change:function()
	{
		scall_filtered_value[24]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	scall_emp = $("#scall_emp").data("kendoComboBox");
		
	var inputParameter = {p_lov_code_type : "FR", p_search_field_1 : "", p_search_field_2 : ""};
	scall_rep_fn_role = InitializeDropDownListWithTransport("scall_rep_fn_role", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true);
	
	scall_rep_fn_role.bind("change",function()
	{
		scall_filtered_value[25]=this.value();
		if(this.value() == "ALL")
		{
			scall_rep_emp.value("ALL");
			scall_filtered_value[26]="ALL";
			employee_data= [{code:"ALL",description:"ALL"}];
			scall_rep_emp.dataSource.data(employee_data);
		}
		if(this.value() != "ALL")
		{
			fn_role_filter = this.value();
			employee_data= [{code:"ALL",description:"ALL"}];
			executeService_retrieve_listof_functional_role_employee_list();
			scall_rep_emp.dataSource.data(employee_data);
		}
		scall_calling_filter_array();
		scall_summary_and_series_by();
	});
	$("#scall_rep_emp").kendoComboBox({
	dataTextField: "code",
    dataValueField: "code",
    dataSource:employee_data,
	template:'${ data.code }'+'-'+'${ data.description }',
	change:function()
	{
		scall_filtered_value[26]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	scall_rep_emp = $("#scall_rep_emp").data("kendoComboBox");
	var inputParameter = {p_lov_code_type : "FR", p_search_field_1 : "", p_search_field_2 : ""};
	scall_map_fn_role = InitializeDropDownListWithTransport("scall_map_fn_role", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true);
	
	scall_map_fn_role.bind("change",function()
	{
		scall_filtered_value[27]=this.value();
		if(this.value() == "ALL")
		{
			scall_map_emp.value("ALL");
			scall_filtered_value[28]="ALL";
			employee_data= [{code:"ALL",description:"ALL"}];
			scall_map_emp.dataSource.data(employee_data);
		}
		if(this.value() != "ALL")
		{
			fn_role_filter = this.value();
			employee_data= [{code:"ALL",description:"ALL"}];
			executeService_retrieve_listof_functional_role_employee_list();
			scall_map_emp.dataSource.data(employee_data);
		}
		scall_calling_filter_array();
		scall_summary_and_series_by();
	});
		
	$("#scall_map_emp").kendoComboBox({
	dataTextField: "code",
    dataValueField: "code",
    dataSource:employee_data,
	template:'${ data.code }'+'-'+'${ data.description }',
	change:function()
	{
		scall_filtered_value[28]=this.value();
		scall_calling_filter_array();
		scall_summary_and_series_by();
	}
	});
	scall_map_emp = $("#scall_map_emp").data("kendoComboBox");
	scall_emp.value("ALL");
	scall_rep_emp.value("ALL");
	scall_map_emp.value("ALL");
	
	
	$('#scall_set_or_reset').on('click', function() 
	{
		child_window =  InitializeWindow("report_scall_analysis_child","scall_metrics_child","","800","900");
	});	
}