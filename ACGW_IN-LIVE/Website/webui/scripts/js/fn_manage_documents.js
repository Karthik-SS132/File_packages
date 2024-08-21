function fn_manage_documents_loadScripts()
{
	retrieve_click_identifier = 1;
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [  
						"../../s_iscripts/retrieve_listof_file_catg_type.js",
						"../../s_iscripts/retrieve_manage_file_list.js",
						"../../s_iscripts/save_manage_file_detail.js",
						"../../s_iscripts/delete_manage_file_detail.js",
						"../../s_iscripts/retrieve_manage_file_detail.js",
						"./webui/scripts/js/fn_manage_documents_child.js",
					  ];
				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);
	
	if (loadRetStatus == 1)		return false;
	
	return true;
}

function fn_manage_documents()
{
	//Variables Declaration
	value_changed_ind = "";
	screenChangeInd = "";
	
	r_file_category = "%";
	r_file_type = "%";
	
	catg_type_data =[{file_category:"%",file_catg_description:"ALL"}];
	type_file_data =[{file_category:"%",file_type:"ALL",file_type_description:"ALL"}];
 	
	executeService_retrieve_listof_file_catg_type();
	
	//File Categories DropDown List
	manage_documents_categories = $("#manage_documents_categories").kendoDropDownList({
    dataTextField: "file_catg_description",
    dataValueField: "file_category",
    dataSource:catg_type_data,
	change: function() {
			r_file_category = this.value();
			r_file_type = "%";
			if(r_file_category !="%")
				var tmp_type_file_list = [{file_type_description:"ALL",file_type:"%"}];
			else
				var tmp_type_file_list = [];
			for(type_file = 0;type_file < type_file_data.length;type_file++)
			{
				if(type_file_data[type_file].file_category == r_file_category)
				{
					tmp_type_file_list.push({file_type_description:type_file_data[type_file].file_type_description,file_type:type_file_data[type_file].file_type});
				}
			}
			manage_documents_type.dataSource.data(tmp_type_file_list);
		}
	}).data("kendoDropDownList");
	
	//File Type DropDown List
	tmp_type_file_data = [{file_type_description:"ALL",file_type:"%"}];
	manage_documents_type = $("#manage_documents_type").kendoDropDownList({
		dataTextField: "file_type_description",
		dataValueField: "file_type",
		dataSource:tmp_type_file_data,
		change: function() {
				r_file_type = this.value();
			}
	}).data("kendoDropDownList");
	
	
	fn_refresh_manage_documents_grid();
	
	//Retrievel Grid Data
	$("#manage_documents_retrieve").click(function() {
		retrieve_click_identifier = 0;
		fn_refresh_manage_documents_grid();
		$("#manage_documents_add_btn").attr("disabled",false);
		$("#manage_documents_edit_btn").attr("disabled",false);
		$("#manage_documents_delete_btn").attr("disabled",false);
	});
	
	//Popup window
	manage_documents_child = $("#window");
	
	
	/* ADD BUTTON CLICK */
	$("#manage_documents_add_btn").click(function()
	{
		p_save_mode="A";
		var onmanage_documentsClose = function()
		{
			$("#manage_documents_child").remove();
		}
		manage_documents_child.kendoWindow(
		{
			width:"500px",
			actions: ["Close"],
			draggable: false,
			scrollable:false,
			height: "400px",
			modal: true,
			refresh:onmanage_documentsRefresh,
			resizable: false,
			close: onmanage_documentsClose
		});
		screenName="manage_documents_child";
		manage_documents_child.data("kendoWindow").refresh('./manage_documents_child.html');
		manage_documents_child.data("kendoWindow").title("Add");
		manage_documents_child.data("kendoWindow").open();
		manage_documents_child.data("kendoWindow").center();
		function onmanage_documentsRefresh()
		{
			try
			{
				eval('fn_'+screenName+'()');					
			}
			catch(err)
			{
				alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
				manage_documents_child.data("kendoWindow").close();
			}
		}
	});
	
	/* EDIT BUTTON CLICK */
	$("#manage_documents_edit_btn").click(function()
	{
		if (slctdrl == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			p_save_mode="U";
			var onmanage_documentsClose = function()
			{
				$("#manage_documents_child").remove();
			}
			manage_documents_child.kendoWindow(
			{
				width:"500px",
				actions: ["Close"],
				draggable: false,
				scrollable:false,
				height: "400px",
				modal: true,
				refresh:onmanage_documentsRefresh,
				resizable: false,
				close: onmanage_documentsClose
			});
			screenName="manage_documents_child";
			manage_documents_child.data("kendoWindow").refresh('./manage_documents_child.html');
			manage_documents_child.data("kendoWindow").title("Edit");
			manage_documents_child.data("kendoWindow").open();
			manage_documents_child.data("kendoWindow").center();
			function onmanage_documentsRefresh()
			{
				try
				{
					eval('fn_'+screenName+'()');					
				}
				catch(err)
				{
					alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
					manage_documents_child.data("kendoWindow").close();
				}
			}
		}		
	});
	
	/* DELETE BUTTON CLICK */
	$("#manage_documents_delete_btn").click(function()
	{
		if (slctdrl == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			var isClose = confirm("Do you want to delete the File");
			if (isClose == true)
			{
				var delete_status = executeService_delete_manage_file_detail();
				if(delete_status == "S0010")
				{
					FileDelete("docstore/"+slctdr_model["file_name"]);
					alert('File sucessfully deleted');
					retrieve_click_identifier = 0;
					fn_refresh_manage_documents_grid();
				}
			}
		}		
	});
}
function fn_refresh_manage_documents_grid()
{
	slctdrl = 0;
	manage_documents_list_datasource =  new kendo.data.DataSource();
	manage_documents_list_datasource_temp =  new kendo.data.DataSource();
	if (retrieve_click_identifier == 0)
	{
		manage_documents_list = executeService_retrieve_manage_file_list();
		manage_documents_list_xml = loadXMLString(manage_documents_list);
		manage_documents_list_datasource = new kendo.data.DataSource({
			data: manage_documents_list_xml,
			schema: {
				type: "xml",
				data: "list/file",
				model: {
					fields: {
						file_id:"file_id/text()",
						file_name:"file_name/text()",
						file_category:"file_category/text()",
						file_category_desc:"file_category/text()",
						file_type:"file_type/text()",
						file_type_desc:"file_type/text()",
						file_path:"file_path/text()"
						}
					}
				},
			pageSize: 10
		});
		
		manage_documents_list_datasource.read();
	}
	// ****************** Convert Code to Description Begin ***************************
	for(manage_documents_list_count = 0;manage_documents_list_count<manage_documents_list_datasource.data().length;manage_documents_list_count++)
	{
		for(catg_type_data_count = 0;catg_type_data_count<catg_type_data.length;catg_type_data_count++)
		{
			if(catg_type_data[catg_type_data_count].file_category == manage_documents_list_datasource.data()[manage_documents_list_count].file_category)
			{
				manage_documents_list_datasource.data()[manage_documents_list_count].file_category_desc = catg_type_data[catg_type_data_count].file_catg_description;
			}
		}
		for(type_file_data_count = 0;type_file_data_count<type_file_data.length;type_file_data_count++)
		{
			if(type_file_data[type_file_data_count].file_category == manage_documents_list_datasource.data()[manage_documents_list_count].file_category &&  type_file_data[type_file_data_count].file_type == manage_documents_list_datasource.data()[manage_documents_list_count].file_type)
			{
				manage_documents_list_datasource.data()[manage_documents_list_count].file_type_desc = type_file_data[type_file_data_count].file_type_description;
			}
		}
	}
	// *******************************End************************************************
	var fieldList = ["file_id","file_name","file_category_desc","file_type_desc","file_path"];
	var titleList = ["File Id","File Name","File Category","File Type","Path"];
	var widthList = ["100px","","100px","100px",""];
	var templateList = 
	[
		'# if (kendo.toString(file_id) == "") {# #} else {# ${file_id} #}#',
		'# if (kendo.toString(file_name) == "") {# #} else {# ${file_name} #}#',
		'# if (kendo.toString(file_category_desc) == "") {# #} else {# ${file_category_desc} #}#',
		'# if (kendo.toString(file_type_desc) == "") {# #} else {# ${file_type_desc} #}#',
		'# if (kendo.toString(file_path) == "") {# #} else {# ${file_path} #}#'
	];
	manage_documents_grid = InitializeGrid("manage_documents_grid",manage_documents_list_datasource,fieldList,titleList,widthList,templateList,"manage_documents_grid_toolbar",400,10);
	manage_documents_grid.bind("change",function()
	{
		slctdrl=this.select();
		slctdrl_uid = slctdrl.data("uid");
		slctdr_model = manage_documents_list_datasource.getByUid(slctdrl_uid);
	});
	
}
function fn_manage_documents_PreImport()
{
	return true;
}
function fn_manage_documents_PostImport()
{
	return true;
}
function fn_manage_documents_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"manage_documents_grid",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_manage_documents_PostExport()
{
	return true;
}
function fn_manage_documents_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"manage_documents_grid",
			dispalyLabel:"Data Print"
		}]
	};
	return printConfiguration;
}
function fn_manage_documents_PostPrint()
{
	return true;
}