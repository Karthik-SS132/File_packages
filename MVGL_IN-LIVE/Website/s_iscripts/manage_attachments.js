function m_p_att_fn()
{
list_add_upd_ind = 'E';
if(project_level_task_ind =="PR")
{
$("#pj_id").val(slctmp_uid);
$("#pj_desc").val(slctdmp_model['description']);
$('#pmj_lbl').text('Project Id');
$('#pmj_dsc').text('Project Description');
}
else if(project_level_task_ind == "MT")
{
$("#pj_id").val(main_rowmodel['template_id']);
$("#pj_desc").val(main_rowmodel['description']);
$("#task_id").val(mtndetail_rowmodel['task_id']);
$('#pmj_lbl').text('Template Id');
$('#pmj_dsc').text('Template Description');
}
else if(project_level_task_ind == "MP")
{
$('input[name=level]:radio').attr('disabled','disabled');
$('#pj_id').attr('disabled','disabled');
$('#pj_desc').attr('disabled','disabled');
$('#task_id').hide();
$("#pj_id").val(main_rowmodel['template_id']);
$("#pj_desc").val(main_rowmodel['description']);
$('#pmj_lbl').text('Template Id');
$('#pmj_dsc').text('Template Description');
$('input[id=prjct_lvl]:radio').attr('checked','checked');
$("#lbl_taskid").hide();
$("#lbl_task_colon").hide();
}
$('input[name=level]:radio').attr('disabled','disabled');
$('#pj_id').attr('disabled','disabled');
$('#pj_desc').attr('disabled','disabled');
$('#task_id').attr('disabled','disabled');
if (project_level_task_ind =="PR")
{
$("#task_id").hide();
$("#lbl_taskid").hide();
$("#lbl_task_colon").hide();
$('input[id=prjct_lvl]:radio').attr('checked','checked');
}
else if(project_level_task_ind == "MT")
{
$('input[id=mp_tsk_lvl]:radio').attr('checked','checked');
}

a_file_data = [];
a_file_data1 = [];
a_file_data1[0] = [];
a_list_data = [];
a_list_data1 = [];
a_list_data1[0]=[];
executeService_retrieve_project_attachments_master()
 a_list_data1 = new kendo.data.DataSource({data:a_list_data});
 a_file_data1 = new kendo.data.DataSource({data:a_file_data});
        $("#tabstrip").kendoTabStrip();
		$("#alist_grid").kendoGrid({
			pageable: true,
			scrollable: true,
            height: 400,
			sortable: true,
			selectable: true,
			dataSource: a_list_data1,
			toolbar: kendo.template($("#att_lists_template").html()),
			columns:[ { title: "Type", field: "a_list_type" }, 
					{ title: "List ID", field: "a_list_id"},
					{ title: "Description", field: "a_list_desc"},
					{ title: "Event Indicator", field: "a_list_event"}],
					change: function()
						{
						  slctdattlist=this.select();
						  slctdattlist_uid = slctdattlist.data("uid");
						}		
 });
		al_detS=a_list_data1.data();

 $("#afile_grid").kendoGrid({
	pageable: true,
	scrollable: true,
    height: 400,
	sortable: true,
	selectable: true,
     dataSource: a_file_data1,
	 toolbar: kendo.template($("#att_files_template").html()),
	 columns:[ { title: "Category", field: "a_file_category" }, 
               { title: "Type", field: "a_file_type"},
               { title: "Document ID", field: "a_file_id"},
               { title: "Document Name", field: "a_file_name"}],
			   change: function()
						{
						  slctdattfile=this.select();
						  slctdattfile_uid = slctdattfile.data("uid");
						}	
 });
		af_detS=a_file_data1.data();

 if (project_status == "A")
 {
 $("#att_l_delete").hide();
 }
 else if(project_status == "C")
 {
 $("#att_l_add").hide();
 $("#att_l_delete").hide();
 $("#att_f_add").hide();
 $("#att_f_delete").hide();
 }
 
 $("#att_l_add").on('click', function(e){

	//list_add_upd_ind = 'A';
		  						
	 attl_value_changed_ind = false;
	  
  	  attl_edit = $("#attl_child");
      	  
           var onClose = function() {
								};  
					
					if (!attl_edit.data("kendoWindow"))
					    attl_edit.kendoWindow({
						    width: "400px",
                            actions: ["Close"],
							draggable: false,
							height: "400px",
							modal: true,
							resizable: false,
							title: "Attached Lists",
							close: onClose
                        });
						
					attl_edit.data("kendoWindow").refresh("att_lists_child.html");			
					attl_edit.data("kendoWindow").open();
					attl_edit.data("kendoWindow").center();
				
	});
	slctdattlist = 0;
	$("#att_l_delete").on('click',function()
	{
     if (slctdattlist == 0)
	   alert('No row has been selected');
     else
     {

	  var deleterow_attlist = a_list_data1.getByUid(slctdattlist_uid);
	  a_list_data1.remove(deleterow_attlist);
	  slctdattlist=0;
	 } 
	});	
	
	$("#att_f_add").on('click', function(e){
		  						
	 attf_value_changed_ind = false;
	  
  	  attf_edit = $("#attf_child");
      	  
           var onClose = function() {
								};  
					
					if (!attf_edit.data("kendoWindow"))
					    attf_edit.kendoWindow({
						    width: "400px",
                            actions: ["Close"],
							draggable: false,
							height: "400px",
							modal: true,
							resizable: false,
							title: "Attached Files",
							close: onClose
                        });
						
					attf_edit.data("kendoWindow").refresh("att_files_child.html");			
					attf_edit.data("kendoWindow").open();
					attf_edit.data("kendoWindow").center();
	});
	slctdattfile=0;
	$("#att_f_delete").on('click', function(e){
	if (slctdattfile == 0)
	   alert('No row has been selected');
     else
     {
	  var deleterow_attfile = a_file_data1.getByUid(slctdattfile_uid);
	  a_file_data1.remove(deleterow_attfile);
	  slctdattfile=0;
	 } 
	});
	
	$("#pm_prjct_att_submit").on('click',function()
	{
	executeService_save_project_attachments_master();
	});
}

function att_list_child()
{
list_types_data = [];
executeService_retrieve_listof_listtypes();
$("#att_type").kendoDropDownList({
		dataTextField: "list_name",
		dataValueField: "list_type",
		dataSource:list_types_data,
		change:function() {
			list_type = this.value();
			list_id_data = [];
			executeService_retrieve_listof_list_ids();
		$("#att_listid").kendoComboBox({
                       placeholder: "Select",
                       filter: "startswith",
					   dataTextField: "list_id",
					   dataValueField: "list_id",
                       dataSource: list_id_data,
					   change:function() {
					  for(i=0;i< list_id_data.length;i++)
				{
	 
					if( list_id_data[i].list_id== $("#att_listid").val())
					{  
						break;
					}
				}
	             if($("#att_listid").val()== "")
				 {$("#att_listdes").val("");}else
				$("#att_listdes").val( list_id_data[i].description);
					   }
                   });
		}
		});

		att_type = $("#att_type").data("kendoDropDownList");
		//att_list_id = $("#att_listid").data("kendoComboBox");
		
$("#att_lists_ok").on('click',function ()
{
if (al_detS.length == 0)
{
//list_add_upd_ind = 'A';
evt_ind_val = $('input:radio[name=att_evt_ind]:checked').val();
	a_list_data1.add({
					a_list_type : att_type.value(),
					a_list_id : $("#att_listid").data("kendoComboBox").text(),
					a_list_desc : $("#att_listdes").val(),
					a_list_event : evt_ind_val,
					list_add_upd_ind:"A"
	});
	
						a_list_type= att_type.value();
	  					a_list_id = $("#att_listid").data("kendoComboBox").text();
						a_list_desc= $("#att_listdes").val();
						a_list_event=evt_ind_val;
						
						alert('Attached List added successfully');
						attl_edit.data("kendoWindow").close();
}
//for(i=0;i<al_detS.length;i++)
	//	{
//if(/*att_type.value()==al_detS[i].a_list_type &&*/ $("#att_listid").data("kendoComboBox").text()==al_detS[i].a_list_id && $("#att_listdes").val()==al_detS[i].a_list_desc ) 
	//   {
	  // alert('List already exists.Choose new List');
	   //}
else {
//if (att_lists_validator.validate() && /*att_type.value()!=al_detS[i].a_list_type &&*/ $("#att_listid").data("kendoComboBox").text()!=al_detS[i].a_list_id && $("#att_listdes").val()!=al_detS[i].a_list_desc )
//{
	
//list_add_upd_ind = 'A';
if(att_lists_validator.validate() )
{
 value=0;
for(i=0;i<al_detS.length;i++)
		{
	
if($("#att_listid").data("kendoComboBox").text()==al_detS[i].a_list_id ) 
	   {
	   alert('List already exists.Choose new List');
	   value=1;
	   }
}

if (value == 0)
{	
evt_ind_val = $('input:radio[name=att_evt_ind]:checked').val();
	a_list_data1.add({
					a_list_type : att_type.value(),
					a_list_id : $("#att_listid").data("kendoComboBox").text(),
					a_list_desc : $("#att_listdes").val(),
					a_list_event : evt_ind_val,
					list_add_upd_ind:"A"
	});
	
						a_list_type= att_type.value();
	  					a_list_id = $("#att_listid").data("kendoComboBox").text();
						a_list_desc= $("#att_listdes").val();
						a_list_event=evt_ind_val;
						
						alert('Attached List added successfully');
						attl_edit.data("kendoWindow").close();
}
}
/*else
	   {
	    alert("Please Fill Out All The Fields");
	   }
	   }*/
	}
});

$('#att_lists_cancel').on('click',function()
	  {
	    if (attl_value_changed_ind == true)
		{
		  var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
		  if (isClose == true)
				attl_edit.data("kendoWindow").close();
		}  
else
				attl_edit.data("kendoWindow").close();
	  });
		
  $('#att_type, #att_listid, #att_evt_ind, #att_listdes').on('change', function()
	  {
	    attl_value_changed_ind = true;	
	  });
}

function att_files_child()
{
	catg_type_data = [];
	type_file_data = [];
	executeService_retrieve_listof_file_catg_type();
	catg_type_data1 = [];
	catg_type_data1[0] = [];
	type_file_data1 = [];
	type_file_data1[0] = [];

	catg_type_data1=new kendo.data.DataSource({data:catg_type_data});
	type_file_data1=new kendo.data.DataSource({data:type_file_data});

	$("#att_cat").kendoDropDownList({
		dataTextField: "file_catg_description",
		dataValueField: "file_category",
		dataSource:catg_type_data1,
		change: function() {
							ctg_values = this.value();

                            if (ctg_values) {
                                //ctg_values1 = ctg_values;
                   type_file_data1.filter({
                                    field: "file_category",
                                    operator: "eq",
                                    value: ctg_values
									});

                               att_ftype_dd.enable(true);
                             
                            } else {
							
                           att_ftype_dd.enable(false);
                            }
                          att_ftype_dd.value("");
	 }
		});
	$("#att_ftype").kendoDropDownList({
		enable: false,
		dataTextField: "file_type_description",
		dataValueField: "file_type",
		dataSource:type_file_data1,
		select:onSelect
		});
	att_cat_dd = $("#att_cat").data("kendoDropDownList");
	att_ftype_dd = $("#att_ftype").data("kendoDropDownList");

	function onSelect(){
	att_cat_val = att_cat_dd.value();
	//att_cat_val1=att_cat_val+" ";
	att_ftype_val = att_ftype_dd.value();
	//att_ftype_val1 = att_ftype_val +" ";
	a_filerepo_data = [];
	executeService_retrieve_listof_files_from_repo();

	$("#att_did").kendoComboBox({
                       placeholder: "Select",
                       filter: "startswith",
					   dataTextField: "p_file_id",
					   dataValueField: "p_file_id",
                       dataSource: a_filerepo_data,
					   change:function() {
					   for(i=0;i<af_detS.length;i++)
	{
	if(att_cat_val==af_detS[i].a_file_category && att_ftype_val==af_detS[i].a_file_type && $("#att_did").data('kendoComboBox').value()==af_detS[i].a_file_id) 
	{
	alert('File already exists.Choose new File');
	}
	}
					  for(i=0;i< a_filerepo_data.length;i++)
				{
	 
					if(a_filerepo_data[i].p_file_id== $("#att_did").val())
					{  
						break;
					}
				}
	             if($("#att_did").val()== "")
				 {$("#att_dnm").val("");}else
				 {
				$("#att_dnm").val(a_filerepo_data[i].p_file_name);}
					   
					   
					   }
                   });
				   
	}

	$("#att_files_ok").on('click',function()
	{
	if (att_files_validator.validate()) 
	{
		a_file_data1.add({
					a_file_category : att_cat_dd.value(),
					a_file_type : att_ftype_dd.value(),
					a_file_id : $("#att_did").data('kendoComboBox').value(),
					a_file_name : $("#att_dnm").val()
		});
	
						a_file_category= att_cat_dd.value();
	  					a_file_type = att_ftype_dd.value();
						a_file_id= $("#att_did").data('kendoComboBox').value();
						a_file_name=$("#att_dnm").val();
						
						alert('Attached File added successfully');
						attf_edit.data("kendoWindow").close();
		}
	else
	   {
	   alert("Please Fill Out All The Fields");
	   }

	});

	$('#att_files_cancel').on('click',function()
	  {
	    if (attf_value_changed_ind == true)
		{
		  var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
		  if (isClose == true)
				attf_edit.data("kendoWindow").close();
		}  
	else
				attf_edit.data("kendoWindow").close();
	  });
		
	$('#att_cat, #att_ftype, #att_did, #att_dnm').on('change', function()
	  {
	    attf_value_changed_ind = true;	
	  });
}