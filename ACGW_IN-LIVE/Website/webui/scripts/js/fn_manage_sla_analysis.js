function fn_manage_sla_analysis_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [  "../../s_iscripts/report_sla_performance.js",
						 "../../s_iscripts/retrieve_listval_priority_code.js",
						 "../../s_iscripts/retrieve_listof_org_levels.js",
						 "../../s_iscripts/retrieve_listof_equipment.js",
						 "../../s_iscripts/retrieve_listof_org_level_codes.js",
						 "../../s_iscripts/retrieve_listof_customers.js",
						 "../../s_iscripts/retrieve_listof_service_engineers.js",
						 "../../s_iscripts/retrieve_listof_service_managers.js",
						 "../../s_iscripts/retrieve_listof_jo_category.js",
						 "../../s_iscripts/retrieve_listof_jo_status.js",
						 "../../s_iscripts/retrieve_listof_scall_priority_codes.js"
					  ];
				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);
	
	if (loadRetStatus == 1)		return false;
	
	return true;
}

function fn_manage_sla_analysis()
{
	screenChangeInd='';
	$("#tabstrip").kendoTabStrip();
	sla_perf_array=new Array();
	sla_perf_array[0]="ALL";
	sla_perf_array[1]="ALL";
	sla_perf_array[2]="SCALL";
	sla_perf_array[3]="ALL";
	sla_perf_array[4]="ALL";
	sla_perf_array[5]="ALL";
	sla_perf_array[6]="ALL";
	sla_perf_array[7]="ALL";
	sla_perf_array[8]="ALL";
	sla_perf_array[9]="ALL";
	sla_perf_array[10]="ALL";
	sla_perf_array[11]="ALL";
	sla_perf_array[12]="ALL";
	sla_perf_array[13]="ALL";
	sla_perf_array[14]="ALL";
	sla_perf_array[15]="ALL";
	
	sla_perf_array_child=new Array();
	sla_perf_array_child[0]="ALL";
	sla_perf_array_child[1]="ALL";
	sla_perf_array_child[2]="SCALL";
	sla_perf_array_child[3]="ALL";
	sla_perf_array_child[4]="ALL";
	sla_perf_array_child[5]="ALL";
	sla_perf_array_child[6]="ALL";
	sla_perf_array_child[7]="ALL";
	sla_perf_array_child[8]="ALL";
	sla_perf_array_child[9]="ALL";
	sla_perf_array_child[10]="ALL";
	sla_perf_array_child[11]="ALL";
	sla_perf_array_child[12]="ALL";
	sla_perf_array_child[13]="ALL";
	sla_perf_array_child[14]="ALL";
	sla_perf_array_child[15]="ALL";
	
	sla_perf_filtered_value=new Array();
	sla_perf_filtered_value[0]="";
	sla_perf_filtered_value[1]="";
	sla_perf_filtered_value[2]="";
	sla_perf_filtered_value[3]="";
	sla_perf_filtered_value[4]="";
	sla_perf_filtered_value[5]="";
	sla_perf_filtered_value[6]="";
	sla_perf_filtered_value[7]="";
	sla_perf_filtered_value[8]="";
	sla_perf_filtered_value[9]="";
	sla_perf_filtered_value[10]="";
	sla_perf_filtered_value[11]="";
	sla_perf_filtered_value[12]="";
	sla_perf_filtered_value[13]="";
	sla_perf_filtered_value[14]="";
	sla_perf_filtered_value[15]="";
	
	sla_perf_id_array=new Array();
	sla_perf_id_array[0]='sla_organogram_level_no';
	sla_perf_id_array[5]='sla_jo_priority';
	sla_perf_id_array[6]='sla_scall_priority';
	sla_perf_id_array[12]='sla_eq_id';
	sla_perf_id_array[13]='sla_customer_id';
	sla_perf_id_array[7]='sla_year';
	sla_perf_id_array[8]='sla_qtr';
	sla_perf_id_array[9]='sla_month';
	sla_perf_id_array[10]='sla_wk_of_mth';
	sla_perf_id_array[11]='sla_day_of_wk';
	sla_perf_id_array[3]='sla_jo_category';
	sla_perf_id_array[4]='sla_jo_status';
	sla_perf_id_array[1]='sla_organogram_level_code';
	sla_perf_id_array[14]='sla_serv_manager_emp_id';
	sla_perf_id_array[15]='sla_serv_engineer_emp_id';
	sla_perf_id_array[2]='sla_scall_entry';
	
	srvc_engg_data=[];
	org_level_no_code_data=[];
	list_of_org_entities = [];
	org_lvl_code_arr=new Array();
	org_lvl_codes_data= new kendo.data.DataSource({data: list_of_org_entities});
	jo_status_data=[{"text" :"ALL","value":"ALL"}];
	jo_category_data=[{"text" :"ALL","value":"ALL"}];
	serc_mngr_data=[{"text" :"ALL","value":"ALL"}];
	org_levels_data=[{"text" :"ALL","value":"ALL"}];
	org_lvlcodes_data=[{"text" :"ALL","value":"ALL"}];
	priority_data=[{text :"ALL",value:"ALL"}];
	
	serv_engg_list=[{"text" :"ALL","value":"ALL"}];
	cust_list=[{"text" :"ALL","value":"ALL"}];
	scall_priority_data=[{"text" :"ALL","value":"ALL"}];
	
	equipment_data=[{"text" :"ALL","value":"ALL"}];
		scall_entry_array=[{text:"Servicecall SLA",value:"SCALL"},{text:"Joborder SLA",value:"JO"},{text:"ISSUE SLA",value:"ISSUE"}]
	year_data=[{"text" :"ALL","value":"ALL"},{"text" :"2010","value":"2010"},{"text" :"2011","value":"2011"},{"text" :"2012","value":"2012"},{"text" :"2013","value":"2013"}];
	quarter_data=[{"text" :"ALL","value":"ALL"},{"text" :"1","value":"1"},{"text" :"2","value":"2"},{"text" :"3","value":"3"},{"text" :"4","value":"4"}];
	month_data=[{"text" :"ALL","value":"ALL"},{"text" :"Jan","value":"01"},{"text" :"Feb","value":"02"},{"text" :"Mar","value":"03"},{"text" :"Apr","value":"04"},{"text" :"May","value":"05"},{"text" :"June","value":"06"},{"text" :"July","value":"07"},{"text" :"Aug","value":"08"},{"text" :"Sept","value":"09"},{"text" :"Oct","value":"10"},{"text" :"Nov","value":"11"},{"text" :"Dec","value":"12"}];
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
	
	executeService_retrieve_listof_jo_status();
	executeService_retrieve_listof_service_managers();
	executeService_retrieve_listof_jo_category();
	executeService_retrieve_listof_service_engineers();
	executeService_retrieve_listof_customers();
	executeService_retrieve_listof_equipment();
	executeService_retrieve_listval_priority_code();
//	executeService_retrieve_listof_org_level_codes();
	executeService_retrieve_listof_org_levels();
	executeService_retrieve_listof_scall_priority_codes();
	
	sla_perf_chart_array=[];
	sla_perf_parsed_chart_array=[];
	manage_sla_perf_chart();
	var a='value';
	var collist = [];
	collist[0] = new Array(2);
	collist[1] = new Array(2);
	
	collist[0].push({column_name:'value',column_index:'1'});
	collist[1].push({column_name:'text',column_index:'5'});
	 serv_engg_list=duplication_removel(serv_engg_list,a, 2, collist);
	 
	 var a='value';
	var collist = [];
	collist[0] = new Array(2);
	collist[1] = new Array(2);
	
	collist[0].push({column_name:'value',column_index:'1'});
	collist[1].push({column_name:'text',column_index:'5'});
	 serc_mngr_data=duplication_removel(serc_mngr_data,a, 2, collist);
	
	sla_perf_metric_array=new Array();
	$('#sla_chart_retrieve').on('click',function(){
	$("#spinner").show(500,function()
	{
		$("#spinner").hide();
	});
	sla_perf_metrics=executeService_report_sla_performance();
	
	
	if (sla_perf_metrics == '1')
	               {
	             return 1;
	           }		
	sla_perf_metrics_list=loadXMLString(sla_perf_metrics);
	var	 jo_dsource = new kendo.data.DataSource({
						data: sla_perf_metrics_list,
					
						schema: {
						 type: "xml",
                         data: "list/slaperf_record",
                           model: {
                             fields: {
									org_level_no:"org_level_no/text()",
                                    org_level_code: "org_level_code/text()",
									jo_status:"jo_status/text()",
									jo_priority :"jo_priority/text()",
									jo_category:"jo_category/text()",
									scall_priority:"scall_priority/text()",
									year:"year/text()",
									qtr:"qtr/text()",
									month:"month/text()",
									wk_of_mth :"wk_of_mth/text()",
									day_of_wk:"day_of_wk/text()",
									cause_code:"cause_code/text()",
									equipment_id:"equipment_id/text()",
									customer_id:"customer_id/text()",
									customer_location:"customer_location/text()",
									smanager_emp_id:"smanager_emp_id/text()",
									sengineer_emp_id :"sengineer_emp_id/text()",
									jo_no:"jo_no/text()",
									actual_tat:"actual_tat/text()",
									sla_tat:"sla_tat/text()",
									scall_ref_no:"scall_ref_no/text()",
									scall_status:"scall_status/text()",
									scall_priority:"scall_priority/text()"
                                  }
                           }
                       }
							
                        });
	jo_dsource.read();
	report_sla_perf_metric=jo_dsource.data (); 
	
	
	for(i=0;i<report_sla_perf_metric.length;i++)
	{
	sla_perf_metric_array[i]=new Array();
	sla_perf_metric_array[i][11]=report_sla_perf_metric[i].equipment_id;
	sla_perf_metric_array[i][10]=report_sla_perf_metric[i].day_of_wk ;
	sla_perf_metric_array[i][8]=report_sla_perf_metric[i].month;
	sla_perf_metric_array[i][9]=report_sla_perf_metric[i].wk_of_mth ;
	sla_perf_metric_array[i][6]=report_sla_perf_metric[i].year;
	sla_perf_metric_array[i][12]=report_sla_perf_metric[i].customer_id ;
	sla_perf_metric_array[i][7] =report_sla_perf_metric[i].qtr ;
	sla_perf_metric_array[i][4]=report_sla_perf_metric[i].jo_priority; 
	sla_perf_metric_array[i][3]=report_sla_perf_metric[i].jo_status ;
	sla_perf_metric_array[i][2] =report_sla_perf_metric[i].jo_category ;
	sla_perf_metric_array[i][1]=report_sla_perf_metric[i].org_level_code; 
	sla_perf_metric_array[i][0] =report_sla_perf_metric[i].org_level_no ;

	sla_perf_metric_array[i][5]=report_sla_perf_metric[i].scall_priority ;
	sla_perf_metric_array[i][13]=report_sla_perf_metric[i].sengineer_emp_id ;
	sla_perf_metric_array[i][14]=report_sla_perf_metric[i].smanager_emp_id ;
	sla_perf_metric_array[i][15]=report_sla_perf_metric[i].jo_no ;
	sla_perf_metric_array[i][16]=report_sla_perf_metric[i].sla_tat ;
	sla_perf_metric_array[i][17]=report_sla_perf_metric[i].actual_tat ;
	sla_perf_metric_array[i][18]=report_sla_perf_metric[i].cause_code ;
	
	
	sla_perf_metric_array[i][19]=report_sla_perf_metric[i].scall_ref_no ;
	sla_perf_metric_array[i][20]=report_sla_perf_metric[i].scall_status ;
	sla_perf_metric_array[i][21]=report_sla_perf_metric[i].scall_priority ;  
	
	
	}
	no_jo=report_sla_perf_metric.length;
	total_jo='[{"field":"no_jo"}]';
	total_jo_array=$.parseJSON(total_jo);
	 
	sla_perf_chart_array=[];
	//sla_perf_calling_chart_data();
	sla_perf_calling_filter_array();
	sla_perf_summary_and_series_by();
	
	});
	sla_perf_filtered_array=new Array();
	/*function sla_perf_calling_chart_data()
	{   
		var l=0;
		var filtered_value_ind=false;
		sla_perf_filtered_array=sla_perf_metric_array;
		k=0;
		sla_perf_filtered_arrays=new Array();
		for(var x=0;x<sla_perf_filtered_array.length;x++)
		{

			for(var  j=0;j<sla_perf_filtered_value.length;j++)
			{
				if(sla_perf_filtered_value[j] != "" && sla_perf_filtered_value[j] != "ALL" )
				{

					filtered_value_ind=true;
					if(sla_perf_filtered_value[j] == sla_perf_filtered_array[x][j])
					{
						//alert(sla_perf_filtered_value[j] +"-"+sla_perf_filtered_array[x][j]);
						sla_perf_filtered_arrays[k]=new Array();
						sla_perf_filtered_arrays[k]=sla_perf_filtered_array[x];
						k++;
						
					}
				}
			
			}
		}
		if(filtered_value_ind == true )
		{
		var l=0;
		sla_perf_filtered_array=new Array();
		
		sla_perf_filtered_array=sla_perf_filtered_arrays;
		}
	  sla_perf_filtered_chart_data();
	} */
	
	function sla_perf_calling_filter_array()
	{
	   ind="false";
		for(j=0;j<sla_perf_filtered_value.length;j++)
		{
			if(sla_perf_filtered_value[j] != "ALL" &&  sla_perf_filtered_value[j] != "")
			{
				ind="true";
			}
			
		}
		sla_perf_filtered_array=sla_perf_metric_array
		if(ind == "true")
		{
		aa=sla_perf_metric_array;
		filtered_array_sample=new Array();
			for(j=0;j<sla_perf_filtered_value.length;j++)
			{
				var l=0;
				if(sla_perf_filtered_value[j] != "" && sla_perf_filtered_value[j] != "ALL" )
				{
					
					for(i=0;i<aa.length;i++)
					{
						if(sla_perf_filtered_value[j] != "ALL")
						{
							if(sla_perf_filtered_value[j] == aa[i][j])
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
					sla_perf_filtered_array=filtered_array_sample;
					filtered_array_sample=new Array();
					
				}
			} 
		}
	 sla_perf_filtered_chart_data();		
	}
	
	function sla_perf_filtered_chart_data()
	{
	 var sla_perf_datas=new Array();
	for(i=0;i<sla_perf_filtered_array.length;i++)
	{
	sla_perf_datas[i]=new Array();
	sla_perf_datas[i].equipment_id =sla_perf_filtered_array[i][11];
	sla_perf_datas[i].day_of_wk =sla_perf_filtered_array[i][10];
	sla_perf_datas[i].month =sla_perf_filtered_array[i][8];
	sla_perf_datas[i].wk_of_mth =sla_perf_filtered_array[i][9];
	sla_perf_datas[i].year=sla_perf_filtered_array[i][6];
	sla_perf_datas[i].customer_id=sla_perf_filtered_array[i][12] ;
	sla_perf_datas[i].qtr=sla_perf_filtered_array[i][7]  ;
	sla_perf_datas[i].jo_priority=sla_perf_filtered_array[i][4]; 
	sla_perf_datas[i].jo_status=sla_perf_filtered_array[i][3] ;
	sla_perf_datas[i].jo_category =sla_perf_filtered_array[i][2] ;
	sla_perf_datas[i].org_level_code=sla_perf_filtered_array[i][1]; 
	sla_perf_datas[i].org_level_no=sla_perf_filtered_array[i][0]  ;

	sla_perf_datas[i].scall_priority=sla_perf_filtered_array[i][5];
	sla_perf_datas[i].sengineer_emp_id =sla_perf_filtered_array[i][13];
	sla_perf_datas[i].smanager_emp_id =sla_perf_filtered_array[i][14];
	sla_perf_datas[i].jo_no=sla_perf_filtered_array[i][15];
	sla_perf_datas[i].sla_tat=sla_perf_filtered_array[i][16];
	sla_perf_datas[i].actual_tat=sla_perf_filtered_array[i][17];
	sla_perf_datas[i].cause_code=sla_perf_filtered_array[i][18];
	
	sla_perf_datas[i].scall_ref_no=sla_perf_filtered_array[i][19];
	sla_perf_datas[i].scall_status=sla_perf_filtered_array[i][20];
	sla_perf_datas[i].scall_priority=sla_perf_filtered_array[i][21];
	}
	
	/*var jo_dSource = new kendo.data.DataSource({
						data: sla_perf_datas,
						pageSize: 10,
						schema: {
                           model: {
                             fields: {
									org_level_no:"org_level_no/text()",
                                    org_level_code: "org_level_code/text()",
									jo_status:"jo_status/text()",
									jo_priority :"jo_priority/text()",
									jo_category:"jo_category/text()",
									scall_priority:"scall_priority/text()",
									year:"year/text()",
									qtr:"qtr/text()",
									month:"month/text()",
									wk_of_mth :"wk_of_mth/text()",
									day_of_wk:"day_of_wk/text()",
									equipment_id:"equipment_id/text()",
									customer_id:"customer_id/text()",
									smanager_emp_id:"smanager_emp_id/text()",
									sengineer_emp_id :"sengineer_emp_id/text()",
									jo_no:"jo_tat/text()",
									sla_tat:"sla_tat/text()",
									actual_tat:"actual_tat/text()",
									cause_code:"cause_code/text()",
									scall_ref_no:"scall_ref_no/text()",
									scall_status:"scall_status/text()",
									
									scall_priority:"scall_priority/text()"
									
							 }
                           }
                       }
							
                        });
						jo_dSource.read();
						se_perf_chart_array=jo_dSource.data(); */
						    
	  $("#chart_grid_sla_perf").kendoGrid({
						dataSource:{	
						data:sla_perf_datas ,
						 pageSize: 10
						 },
						pageable: {
                            refresh: true,
                            pageSizes: true
                        },
                        height: 400,
						sortable: true,
                        selectable:true,
						columns: [
								{ field:"scall_ref_no", title: "Service call no", width: "100px" },
								{ field:"scall_status", title: "Scall ststus", width: "100px" },
								{ field:"scall_priority", title: "Scall priority", width: "100px" },
								{ field:"jo_no", title: "Jo No", width: "100px" },
								{ field:"org_level_no", title: "Org level no", width: "100px" },
								{ field:"org_level_code", title: "Org level code", width: "100px" },
								{ field: "jo_status", title:"JO Status",  width: "100px" },
								{ field:"jo_priority", title: "JO Priority", width: "100px" },
								{ field:"jo_category", title: "Category", width: "100px" },
								{ field: "scall_priority", title:"Scall priority",  width: "100px" },
							   { field: "year", title:"Year",  width: "100px" },
								{ field:"qtr", title: "Quarter", width: "100px" },
								{ field:"month", title: "Month", width: "100px" },
								{ field: "wk_of_mth", title:"Week of month",  width: "100px" },
								{ field:"day_of_wk", title: "Day of week", width: "100px" },
								{ field:"cause_code", title: "Cause code", width: "100px" },
								{ field:"equipment_id", title: "Equipment", width: "100px" },
								{ field: "customer_id", title:"Customer",  width: "100px" },
								{ field: "smanager_emp_id", title:"Manager Id",  width: "100px" },
								{ field:"sengineer_emp_id", title: "Engineer Id", width: "100px" },
								
							  { field: "sla_tat", title:"SLA TAT",  width: "100px" },
							  { field: "actual_tat", title:"Actual TAT",  width: "100px" }]	
		    }); 
		chart_grid_sla_perf= $("#chart_grid_sla_perf").data("kendoGrid");
	
	} 
	chart_all=[{text:"Organization Code",value:"org_code"},{text:"Category",value:"Category"},{text:"Status",value:"Status"},{text:"Customer Id",value:"Customer Id"},{text:"Serv Engineer",value:"Serv Engineer"},{text:"Serv Manager",value:"Serv Manager"},{text:"Equipment",value:"Equipment"},{text:"Scall Priority",value:"Scall Priority"},{text:"Year",value:"Year"},{text:"Qtr",value:"Qtr"},{text:"Month",value:"Month"},{text:"Week",value:"Week"},{text:"Day",value:"Day"}];
	arrray_summary_series=[{key_value:"3",arrayname:"jo_status_data",value:"JO Status"},
	{key_value:"2",arrayname:"jo_category_data",value:"Category"},
	{key_value:"12",arrayname:"cust_list",value:"Customer Id"},
	{key_value:"6",arrayname:"year_data",value:"Year"},
	{key_value:"8",arrayname:"month_data",value:"Month"},
	{key_value:"7",arrayname:"quarter_data",value:"Qtr"},
	{key_value:"9",arrayname:"week_of_month_data",value:"Week"},
	{key_value:"10",arrayname:"day_of_week_data",value:"Day"},
	{key_value:"13",arrayname:"serv_engg_list",value:"Serv Engineer"},
	{key_value:"14",arrayname:"serc_mngr_data",value:"Serv Manager"},
	{key_value:"5",arrayname:"scall_priority_data",value:"Scall Priority"},
	{key_value:"11",arrayname:"equipment_data",value:"Equipment"},
	{key_value:"1",arrayname:"org_lvlcodes_data",value:"org_code"}
	];
	function sla_perf_summary_and_series_by()
	{

		for(l=0;l<arrray_summary_series.length;l++)
		{
			if( $("#sla_chart_all").val() == arrray_summary_series[l].value )
			{
				x_value=arrray_summary_series[l].key_value;
				x_value_arrayname=eval(arrray_summary_series[l].arrayname);
			}
			
		}
		if(sla_perf_filtered_array.length > 0)
		{
		arr=[];
		arr1=[];
		for(i=0;i<sla_perf_filtered_array.length;i++)
		{
			if(sla_perf_filtered_array[i][x_value] != undefined)
			{
				if(arr.length == 0)
				{
					arr.push({
						value:sla_perf_filtered_array[i][x_value]
					});
				}
				else
				{
					var val=1;
					for(j=0;j<arr.length;j++)
					{
						if(arr[j].value == sla_perf_filtered_array[i][x_value] )
						{
							val=0;
						}
					}
					if(val==1)
					{
						arr.push({
							value:sla_perf_filtered_array[i][x_value]
						});
					}
				}
			}
		}
	 arr.sort(function(a,b){return (a.value)-(b.value)});
	  
	if(arr.length != 0)
	{
		sla_perf_chart_array=[];
		for(j=0;j<arr.length;j++)
		{	
			if(arr[j].value !="ALL")
			{
					x_desc=arr[j].value ;
				for(var a=0;a<x_value_arrayname.length;a++)
				{
					if(x_value_arrayname[a].value == arr[j].value )
					{
						//alert(x_value_arrayname[a].text)
						var x_desc = x_value_arrayname[a].text;
						//alert(desc)
					}
				}
				m=1;
				var x={};
				var chart_arr1="";
				chart_arr1 +="[";					
				eval("x.jo_category"+"="+"'"+x_desc+"'");
				for(i=0;i<sla_tat_array.length;i++)
				{
				var value=0;
				var avg=0;
				//alert(value);
				series_value=0;
				for(k=0;k<sla_perf_filtered_array.length;k++)
				{
					
					if(sla_perf_filtered_array[k][x_value] == arr[j].value )
					{
						//for(z=0;z<sla_tat_array.length;z++)
						//{
							//if(sla_tat_array[z].value == $("#sla_tat").val() )
							//{
								//alert("in");
								var series_name=sla_tat_array[i].text;
								avg++;
								//alert('sla ='+series_name+"      "+series_value  );
								series_value=series_value+parseInt(sla_perf_filtered_array[k][sla_tat_array[i].key_value].trim());
								//alert('sla ='+series_name+"      "+series_value  );
								value=series_value;
								
							
							//}
							
						//}
					}
				}
				
						
				if(value == 0)
				{
					avg_value="";
				}
				else
				{
			
				
				
				avg_value=value/avg;
				
				avg_value=parseFloat(avg_value);
				
				digits=String(avg_value).split(".");
				var add_one=1;
				if("."+parseInt(digits[1]) >= 0.5)
				{
					//alert("if")
					avg_value=parseInt(digits[0])+add_one;
				}
				else
				{
					//alert("else"+digits[0])
					avg_value=digits[0];
				}
				}
				
				//alert("avg  "+avg_value+"          "+"value "+value)
				eval("x.series"+m+"="+"'"+avg_value+"'");
				chart_arr1 +='{'+'"'+'field'+'"'+':'+'"'+'series'+m+'"'+','+'"'+'name'+'"'+':'+'"'+series_name+'"';
				if(m !=sla_tat_array.length)
					{
						chart_arr1 +='},';
					}
					else
					{
						chart_arr1 +='}';
					}
					m++;
				}
				sla_perf_chart_array.push(x);
				chart_arr1 +="]";
				
			}
		}
		sla_perf_parsed_chart_array=$.parseJSON(chart_arr1);
		manage_sla_perf_chart();
	}
	else
	{
		
		sla_perf_chart_array=[];
		chart_arr1='[{"field":"series1","name":""}]';
		sla_perf_parsed_chart_array=$.parseJSON(chart_arr1);
		var chart_arr2='[{"jo_category":"There is no data for the chosen criteria","jo_series1":""}]';
		sla_perf_chart_array=$.parseJSON(chart_arr2);
		manage_sla_perf_chart();  
	}
	}
	else
	{
		sla_perf_chart_array=[];
		chart_arr1='[{"field":"series1","name":""}]';
		sla_perf_parsed_chart_array=$.parseJSON(chart_arr1);
		var chart_arr2='[{"jo_category":"There is no data for the chosen criteria","jo_series1":""}]';
		sla_perf_chart_array=$.parseJSON(chart_arr2);
		manage_sla_perf_chart();  
	}
	}
	$("#sla_chart_all").kendoDropDownList({
	index:0,
	dataTextField: "text",
    dataValueField: "value",
    dataSource:chart_all,
	change:function()
	{
	sla_perf_calling_filter_array();
	sla_perf_summary_and_series_by();
	}
	});
	sla_tat_array=[{text:"Planned SLA",value:"Planned SLA",key_value:"16"},{text:"Actual SLA",value:"Actual SLA",key_value:"17"}];
	/*$("#sla_tat").kendoDropDownList({
	index:0,
	dataTextField: "text",
    dataValueField: "value",
    dataSource:sla_tat_array,
	change:function()
	{
	sla_perf_summary_and_series_by();
	}
	}); */
	$("#sla_organogram_level_no").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:org_levels_data,template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	
	sla_perf_filtered_value[0]=this.value();
	sla_perf_calling_filter_array();
	sla_perf_summary_and_series_by();
					
		
			 
	org_entity_type =this.value();
	
	if(org_entity_type != "ALL")
	{
	org_lvl_code_arr=new Array();
	executeService_retrieve_listof_org_level_codes();
    		list_of_org_entities = [{"text":"ALL",value:"ALL"}];
		for(i=0;i<org_lvl_code_arr.length;i++)
		{
			list_of_org_entities.push({
				value:org_lvl_code_arr[i][0],
	            text:org_lvl_code_arr[i][1]
			});
		}
	
	sla_organogram_level_code.dataSource.data(list_of_org_entities);
	
    
	}  
	else
	{
		list_of_org_entities = [{"text":"ALL",value:"ALL"}];
	sla_organogram_level_code.dataSource.data(list_of_org_entities);	
	}
	
	}
	});

	sla_organogram_level_no=$("#sla_organogram_level_no").data("kendoDropDownList");
	
	
	$("#sla_organogram_level_code").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:org_lvlcodes_data,template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	
	sla_perf_filtered_value[1]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	});
	sla_organogram_level_code=$("#sla_organogram_level_code").data("kendoDropDownList");
	
	$("#sla_scall_priority").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:scall_priority_data,template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	sla_perf_filtered_value[5]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	});
	sla_scall_priority=$("#sla_scall_priority").data("kendoDropDownList");
	
	
	$("#sla_jo_category").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:jo_category_data,
	 template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	
	sla_perf_filtered_value[2]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	});
	sla_jo_category=$("#sla_jo_category").data("kendoDropDownList");
	$("#sla_jo_status").kendoDropDownList({
	
	dataTextField: "value",
    dataValueField: "value",
    dataSource:jo_status_data,
	 template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	
	sla_perf_filtered_value[3]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	});
	sla_jo_status=$("#sla_jo_status").data("kendoDropDownList");
	$("#sla_scall_entry").kendoDropDownList({
	enable:false,
	dataTextField: "value",
    dataValueField: "value",
    dataSource:scall_entry_array,
	/*template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[2]=this.value();
	sla_scall_priority.text(text);
	sla_scall_priority.enable(false); 
	} */
	});
	sla_scall_entry=$("#sla_scall_entry").data("kendoDropDownList");
	$("#sla_jo_priority").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:priority_data,
	template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	
	sla_perf_filtered_value[4]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	});

	sla_jo_priority= $("#sla_jo_priority").data("kendoDropDownList");
	
	
	$("#sla_year").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:year_data,
	change:function()
	{
	
	
	sla_perf_filtered_value[6]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	});
	sla_year=$("#sla_year").data("kendoDropDownList");
	$("#sla_qtr").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
	
	
	sla_perf_filtered_value[7]=this.value();
	sla_perf_calling_filter_array();
	sla_perf_summary_and_series_by();
	}
	
	});
	sla_qtr=$("#sla_qtr").data("kendoDropDownList");
	
	$("#sla_month").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:month_data,
	change:function()
	{
	
	
	sla_perf_filtered_value[8]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	
	});
	sla_month=$("#sla_month").data("kendoDropDownList");
	
	$("#sla_wk_of_mth").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:week_of_month_data,
	change:function()
	{
	
	
	sla_perf_filtered_value[9]=this.value();
	sla_perf_calling_filter_array();
	sla_perf_summary_and_series_by();
	}
	
	});
	sla_wk_of_mth=$("#sla_wk_of_mth").data("kendoDropDownList");
	
	$("#sla_day_of_wk").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:day_of_week_data,
	change:function()
	{
	
	sla_perf_filtered_value[10]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	});
	sla_day_of_wk=$("#sla_day_of_wk").data("kendoDropDownList");
	
	$("#sla_eq_id").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:equipment_data,
	template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	sla_perf_filtered_value[11]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	});
		sla_eq_id=$("#sla_eq_id").data('kendoDropDownList');
	$("#sla_customer_id").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:cust_list,
	 template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	
	sla_perf_filtered_value[12]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	});
	sla_customer_id=$("#sla_customer_id").data("kendoDropDownList");
	
	
	$("#sla_serv_manager_emp_id").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:serc_mngr_data,template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	
	sla_perf_filtered_value[13]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	
	});
	sla_serv_manager_emp_id=$("#sla_serv_manager_emp_id").data("kendoDropDownList");
	$("#sla_serv_engineer_emp_id").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:serv_engg_list,template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	
	sla_perf_filtered_value[14]=this.value();
	sla_perf_calling_filter_array();
		sla_perf_summary_and_series_by();
	}
	
	
	});
	sla_serv_engineer_emp_id=$("#sla_serv_engineer_emp_id").data("kendoDropDownList");
	$('#sla_set_or_reset').on('click', function() 
	{
	sla_performance_child= $("#sla_performance_child");
                  var onClose = function() 
				  {
					$("#manage_sla_analysis_child").remove();
						};  
					
					if (! sla_performance_child.data("kendoWindow"))
					        sla_performance_child.kendoWindow({
						    width: "900px",
                        
							draggable: false,
							height: "550px",
							modal: true,
							refresh : onref,
							resizable: false,
						
							close: onClose
                        });
							 sla_performance_child.data("kendoWindow").center();	
					      sla_performance_child.data("kendoWindow").refresh("./manage_sla_analysis_child.html");
					      sla_performance_child .data("kendoWindow").title();
				          sla_performance_child.data("kendoWindow").open();
						  function onref()
							{
								try
								{
									eval(manage_sla_perf_child());
								}
								catch(err)
								{
									alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
									sla_performance_child.data("kendoWindow").close();
								}
							}
					     
	});
	$('.k-list').css({"width":"300"});
	$('.k-list').css({"background":"#E3E3E3"});

	$(".configuration").bind("change", refresh);
	function manage_sla_perf_chart()
	{

	$("#chart_report_sla_perf").kendoChart({
                        theme: $(document).data("kendoSkin") || "silver",
                       dataSource: {
                            data: sla_perf_chart_array,

					    },
                        title: {
                            text: "SLA Performance Metrics"
                        },
                        legend: {
                            position: "right"
                        },
                        seriesDefaults: {
                            type: "column",
                           labels: {
                                visible: true,
                                format: "{0}"
                            }
                        },
                        series: sla_perf_parsed_chart_array,
						
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
							text:"Hours"
							}
							
		                },	
						 tooltip: {
                            visible: true,
                            format: "{0}",
							template:"#= series.name #: #= value #"
                        }
                        
         }); 

 var chart = $("#chart_report_sla_perf").data("kendoChart");
  series = chart.options.series;
                        type = $("input[name=seriesType]:checked").val();
                      //stack = $("#stack").prop("checked");

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
                    var chart = $("#chart_report_sla_perf").data("kendoChart");
                        series = chart.options.series;
                        type = $("input[name=seriesType]:checked").val();
                      //stack = $("#stack").prop("checked");

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
}

function manage_sla_perf_child()
{
	
	
	sla_perf_id_array_child=new Array();
	sla_perf_id_array_child[0]='sla_organogram_level_no_child';
	sla_perf_id_array_child[5]='sla_jo_priority_child';
	sla_perf_id_array_child[6]='sla_scall_priority_child';
	sla_perf_id_array_child[12]='sla_eq_id_child';
	sla_perf_id_array_child[13]='sla_customer_id_child';
	sla_perf_id_array_child[7]='sla_year_child';
	sla_perf_id_array_child[8]='sla_qtr_child';
	sla_perf_id_array_child[9]='sla_month_child';
	sla_perf_id_array_child[10]='sla_wk_of_mth_child';
	sla_perf_id_array_child[11]='sla_day_of_wk_child';
	sla_perf_id_array_child[3]='sla_jo_category_child';
	sla_perf_id_array_child[4]='sla_jo_status_child';
	sla_perf_id_array_child[1]='sla_organogram_level_code_child';
	sla_perf_id_array_child[14]='sla_serv_manager_emp_id_child';
	sla_perf_id_array_child[15]='sla_serv_engineer_emp_id_child';
	sla_perf_id_array_child[2]='sla_scall_entry_child';

	
$("#sla_organogram_level_no_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:org_levels_data,
	template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[0]=this.value();
	if(this.value() != 'ALL')
	{
	sla_organogram_level_no.text(text);
	sla_organogram_level_no.enable(false); 
	 }
	 else
	 {
	 sla_organogram_level_no.text(text);
	sla_organogram_level_no.enable(true); 
	 }
	org_entity_type =this.value();
	if(org_entity_type != "ALL")
	{
	org_lvl_code_arr=new Array();
	executeService_retrieve_listof_org_level_codes();
    			list_of_org_entities = [{"text":"ALL",value:"ALL"}];
		for(i=0;i<org_lvl_code_arr.length;i++)
		{
			list_of_org_entities.push({
				value:org_lvl_code_arr[i][0],
	            text:org_lvl_code_arr[i][1]
			});
		}
	sla_organogram_level_code_child.dataSource.data(list_of_org_entities);
	
    
	}  
	else
	{
		list_of_org_entities = [{"text":"ALL",value:"ALL"}];
	sla_organogram_level_code_child.dataSource.data(list_of_org_entities);	
	}
	}
	});
	sla_organogram_level_no_child=$("#sla_organogram_level_no_child").data("kendoDropDownList");
	
	$("#sla_organogram_level_code_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:org_lvlcodes_data,
	template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[1]=this.value();
	if(this.value() != 'ALL')
	{
	sla_organogram_level_code.text(text);
	sla_organogram_level_code.enable(false);
	}
	else
	{
	sla_organogram_level_code.text(text);
	sla_organogram_level_code.enable(true);
	}
	}
	});
	sla_organogram_level_code_child=$("#sla_organogram_level_code_child").data("kendoDropDownList");
	
	$("#sla_scall_priority_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:scall_priority_data,template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[6]=this.value();
	if(this.value() != 'ALL')
	{
	sla_scall_priority.text(text);
	sla_scall_priority.enable(false); 
	}
	else
	{
	sla_scall_priority.text(text);
	sla_scall_priority.enable(true); 
	}
	}
	});
	sla_scall_priority_child=$("#sla_scall_priority_child").data("kendoDropDownList");
	
	ddl_array=[{value:"SCALL",field:"sla_jo_priority_child"},{value:"JO",field:"sla_jo_status_child"}]
	$("#sla_scall_entry_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:scall_entry_array,template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[2]=this.value();
	sla_scall_entry.text(text);
	sla_scall_entry.enable(false); 
	
	}
	});
	sla_scall_entry_child=$("#sla_scall_entry_child").data("kendoDropDownList");
	
	$("#sla_jo_category_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:jo_category_data,
	 template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[3]=this.value();
	if(this.value() != 'ALL')
	{
	sla_jo_category.text(text);
	sla_jo_category.enable(false); 
	}
	else
	{
	sla_jo_category.text(text);
	sla_jo_category.enable(true);
	}
	} 
	});
	sla_jo_category_child1=$("#sla_jo_category_child").data("kendoDropDownList");
	
	$("#sla_jo_status_child").kendoDropDownList({
	
	dataTextField: "value",
    dataValueField: "value",
    dataSource:jo_status_data,
	 template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[4]=this.value();
	if(this.value() != 'ALL')
	{
		
		sla_jo_status.text(text);
sla_jo_status.enable(false); 
	}
	else
	{
	sla_jo_status.enable(true); 
	sla_jo_status.text(text);
	}
	 }
	
	});
	sla_jo_status_child1=$("#sla_jo_status_child").data("kendoDropDownList");
	
	$("#sla_jo_priority_child").kendoDropDownList({
	
	dataTextField: "value",
    dataValueField: "value",
    dataSource:priority_data,
	 template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[5]=this.value();
	if(this.value() != 'ALL')
	{
	
	sla_jo_priority.text(text);
   sla_jo_priority.enable(false); 
   }
   else
   {
   sla_jo_priority.enable(true); 
   sla_jo_priority.text(text);
   }
	} 
	});
	sla_jo_priority_child= $("#sla_jo_priority_child").data("kendoDropDownList");
	
	$("#sla_year_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:year_data,
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[7]=this.value();
	if(this.value() != "ALL")
	{
	sla_year.text(text);
	sla_year.enable(false); 
	}
	else
	{
	sla_year.text(text);
	sla_year.enable(true);
	}
	} 
	});
	sla_year_child=$("#sla_year_child").data("kendoDropDownList");
	
	$("#sla_qtr_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[8]=this.value();
	if(this.value() != "ALL")
	{
	 sla_qtr.text(text);
	   sla_qtr.enable(false); 
	   }
	   else
	   {
	   	 sla_qtr.text(text);
sla_qtr.enable(true); 
	   }
	}
	
	});
	sla_qtr_child=$("#sla_qtr_child").data("kendoDropDownList");
	
	$("#sla_month_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:month_data,
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[9]=this.value();
	if(this.value() != "ALL")
	{
	sla_month.text(text);
   sla_month.enable(false); 
   }
   else
   {
   sla_month.text(text);
   sla_month.enable(true); 
   }
	}
	});
	sla_month_child=$("#sla_month_child").data("kendoDropDownList");
	
	$("#sla_wk_of_mth_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:week_of_month_data,
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[10]=this.value();
	if(this.value() != "ALL")
	{
	sla_wk_of_mth.text(text);
   sla_wk_of_mth.enable(false); 
   }
   else
   {
   sla_wk_of_mth.text(text);
   sla_wk_of_mth.enable(true); 
   }
	}
	});
	sla_wk_of_mth_child=$("#sla_wk_of_mth_child").data("kendoDropDownList");
	
	$("#sla_day_of_wk_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:day_of_week_data,
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[11]=this.value();
	if(this.value() != "ALL")
	{
	sla_day_of_wk.text(text);
   sla_day_of_wk.enable(false); 
   }
   else
   {
   	sla_day_of_wk.text(text);
   sla_day_of_wk.enable(true); 
   }
	 }
	});
	sla_day_of_wk_child=$("#sla_day_of_wk_child").data("kendoDropDownList");
	
	$("#sla_eq_id_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:equipment_data,
	template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[12]=this.value
	if(this.value() != "ALL")
	{
	sla_eq_id.text(text);
   sla_eq_id.enable(false); 
   }
   else
   {
   sla_eq_id.text(text);
   sla_eq_id.enable(true); 
   }
	 }
	});
	sla_eq_id_child=$("#sla_eq_id_child").data('kendoDropDownList');
	
	$("#sla_customer_id_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:cust_list,
	 template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[13]=this.value();
	if(this.value() != "ALL")
	{
	sla_customer_id.text(text);
	sla_customer_id.enable(false); 
	}
	else
	{
	sla_customer_id.text(text);
	sla_customer_id.enable(true); 
	}
	 }
	});
	sla_customer_id_child=$("#sla_customer_id_child").data("kendoDropDownList");
	
	
	$("#sla_serv_manager_emp_id_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:serc_mngr_data,template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[14]=this.value();
	if(this.value() != "ALL")
	{
	sla_serv_manager_emp_id.text(text);
	sla_serv_manager_emp_id.enable(false); 
	}
	else
	{
	sla_serv_manager_emp_id.text(text);
	sla_serv_manager_emp_id.enable(true); 
	}
	}
	});
	sla_serv_manager_emp_id_child=$("#sla_serv_manager_emp_id_child").data("kendoDropDownList");
	$("#sla_serv_engineer_emp_id_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:serv_engg_list,template:'${ data.value }'+'-'+'${ data.text }',
	change:function()
	{
	
	text=this.text();
	sla_perf_array_child[15]=this.value();
	if(this.value() != "ALL")
	{
	 sla_serv_engineer_emp_id.text(text);
	 sla_serv_engineer_emp_id.enable(false); 
	 }
	 else
	 {
	 sla_serv_engineer_emp_id.text(text);
	 sla_serv_engineer_emp_id.enable(true); 
	 }
	}
	});
	sla_serv_engineer_emp_id_child=$("#sla_serv_engineer_emp_id_child").data("kendoDropDownList");
	
	
	for(i=0;i<sla_perf_array.length;i++)
	{
	if(sla_perf_array[i] != 'ALL')
	{
	//alert(sla_perf_id_array_child[i]+'.value('+'"'+sla_perf_array[i]+'"'+');');
	eval(sla_perf_id_array_child[i]+'.value('+'"'+sla_perf_array[i]+'"'+');');
	}
	//sla_perf_array[i]=="ALL";
	}

$('#manage_sla_analysis_child_set').on("click",function()
{

for(i=0;i<sla_perf_array_child.length;i++)
{

sla_perf_array[i]=sla_perf_array_child[i];


}
sla_performance_child.data("kendoWindow").close();
});


$('#manage_sla_analysis_child_reset').on("click",function()
{
for(i=0;i<sla_perf_id_array_child.length;i++)
{
	if(i != 2)
	{
	eval(sla_perf_id_array_child[i]+'.value("ALL")');
		
	eval(sla_perf_id_array[i]+'.text("ALL")');
	eval(sla_perf_id_array[i]+'.enable(true)');
	}
	else
	{
		eval(sla_perf_id_array_child[i]+'.value("SCALL")');
		eval(sla_perf_id_array[i]+'.text("SCALL")');
	
	}

}

for(i=0;i<sla_perf_array_child.length;i++)
		{
			if(i != 2)
			{
				sla_perf_array_child[i] = "ALL";
			}
			else
			{
				sla_perf_array_child[i] = "SCALL";
			}
		}
});

$('#manage_sla_analysis_child_cancel').on("click",function()
{
sla_performance_child.data("kendoWindow").close();
});
}