function fn_manage_preventive_maintenance_rules()
{
	isScreenEditable = true;
	screenChangeInd = "1";
	assignScreenName(divID, screenID);
	screenID = 'manage_preventive_maintenance_rules';
	divID = screenID;
	//$("#"+parentScreenID).remove();
	AddToNavigationMap(divID, screenID, displayLabel,  parentScreenID);
	
	$('#eq_id').val(selected_equipment_model['equipment_id']).attr('disabled','disabled');
	$('#eq_desc').val(selected_equipment_model['description']).attr('disabled','disabled');
	$('#frequncy_based').hide();
	prev_mtnce_rules_array=[{text:"Parameter Based",value:"P"},{text:"Frequency Based",value:"F"}];
	$("#prev_mtnce_type").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: prev_mtnce_rules_array,
		template:"${data.value}"+"-"+"${data.text}",
		change:function()
		{
		if( this.value() == 'F' )
		{$('#frequncy_based').show();$('#parameter_based').hide();}
		else if( this.value() == 'P' )
		{$('#frequncy_based').hide();$('#parameter_based').show();}
		else if( this.value() == '' )
		{$('#frequncy_based').hide();$('#parameter_based').hide();}
		}
	});

	//eq_prevrules_fcy_list=executeService_retrieve_manage_equipment_prevmrules_fcy();
	eq_param_uom_list=[];
	executeService_retrieve_listof_eqparam_uom();
	$("#frequncy_uom").kendoDropDownList({
		optionLabel: "---select---",
		dataTextField: "desc",
		dataValueField: "uom",
		dataSource: eq_param_uom_list,
		template:"${data.uom}"+"-"+"${data.desc}",
	});
	frequncy_uom=$("#frequncy_uom").data("kendoDropDownList");
	templateid_data=[];
	p_equipment_id_filter = manage_equipment_master_grid_1.dataSource.getByUid(selected_equipment_uid).equipment_id;
	executeService_retrieve_listof_mprofile_templates()
	$("#freq_template").kendoComboBox({
		optionLabel: "---select---",
		dataTextField: "description",
		dataValueField: "template_id",
		dataSource: templateid_data,
		template:"${data.template_id}"+"-"+"${data.description}",
	});

	$("#parameter_template").kendoComboBox({
		optionLabel: "---select---",
		dataTextField: "template_id",
		dataValueField: "template_id",
		dataSource: templateid_data,
		template:"${data.template_id}"+"-"+"${data.description}",
		change:function()
		{
			for (i = 0; i < eq_param_data.length; i++) 
			{
				eq_param_data[i].mprofile_id = this.value();
			}
			eqparam_dSource.sync();
			grid_eqparam_parambased.saveChanges();
			grid_eqparam_parambased.dataSource.sync();
		}
	});
	eq_param_data = new kendo.data.ObservableArray([]);
	eqparam_dSource = new kendo.data.DataSource();
	eq_prevrules_param_list=executeService_retrieve_manage_equipment_prevmrules_eqparambased();
	if (eq_prevrules_param_list == '1')
	{
		return 1;
	}			
		
	eq_prevrules_param_list_xml=loadXMLString(eq_prevrules_param_list);
	
	dSource= new kendo.data.DataSource({
	            data: eq_prevrules_param_list_xml,
				pageSize: 10,
                           schema: {
                           type: "xml",
                           data: "list/eqparambased_rule",
                           model: {
                               fields: {
                                    parameter: "parameter/text()",
									mprofile_id:"mprofile_id/text()",
									uom: "uom/text()",
									incr_lclucl_ind: "incr_lclucl_ind/text()",
									lcl_value : "lcl_value/text()",
									ucl_value: "ucl_value/text()",
                                    increment_value:  "increment_value/text()",
									rec_tstamp: "rec_tstamp/text()",
                                   
									  }
							}
                        }
    });
	dSource.read();
    eqparambased_array=dSource.data();
	for (i = 0; i < eqparambased_array.length; i++) 
	{
		eqparam_dSource.add({
							"parameter": eqparambased_array[i].parameter,
							"mprofile_id": eqparambased_array[i].mprofile_id,
							"uom": eqparambased_array[i].uom,
							"incr_lclucl_ind": eqparambased_array[i].incr_lclucl_ind,
							"lcl_value": eqparambased_array[i].lcl_value,
							"ucl_value": eqparambased_array[i].ucl_value,
							"increment_value": eqparambased_array[i].increment_value,
						});
	}
	eq_param_data=eqparam_dSource.data();
	eqparam_dSource = new kendo.data.DataSource({
							data: eq_param_data,
							pageSize: 30,
								schema: {
									model: {
										fields: {
										parameter: {editable: false},
										uom: {editable: false},
										mprofile_id: {editable:true},
										incr_lclucl_ind: {editable: false},
										lcl_value: {editable: false},
										ucl_value: {editable: false},
										increment_value: {editable: false},
									}
								}
							}

	});
	$("#grid_eqparam_parambased").kendoGrid({
                        dataSource:eqparam_dSource,
                        pageable: true,
						scrollable: true,
                        height: 400,
						sortable: true,
						selectable: true,
                        columns: [
                            { field:"parameter", title: "Parameter", width: "100px" },
							{ field:"uom", title: "UOM", width: "100px"},
                            { field:"incr_lclucl_ind", title: "Parameter Type", width: "100px"},
                            { field:"lcl_value", title: "LCL", width: "100px"},
                            { field:"ucl_value", title: "UCL", width: "100px"},
							{ field:"increment_value", title: "Incremental value", width: "100px"},
							{ field:"mprofile_id", title: "mprofile_id", width: "100px",editor: change_mprofiletemplate },
						   ],
						   editable: true,
							change: function()
							{
							selected_eqlist=this.select();
							selected_eqlist_uid = selected_eqlist.data("uid");
							selected_eqlist_rowmodel = eqparam_dSource.getByUid(selected_eqlist_uid);
							}  				
    });
	grid_eqparam_parambased = $("#grid_eqparam_parambased").data("kendoGrid");  
					
	function change_mprofiletemplate(container, options)
	{
		selected_eqlist_rowmodel = eqparam_dSource.getByUid(selected_eqlist_uid);
		$('<input id="mprofile_template"  />').appendTo(container).kendoDropDownList({
			index: "",
			dataTextField: "template_id",
			dataValueField: "template_id",
			dataSource: templateid_data,
			template:"${data.template_id}"+"-"+"${data.description}",
			change: function () 
					{
						selected_eqlist_rowmodel.set("mprofile_id", this.value());
						grid_eqparam_parambased.saveChanges();
						grid_eqparam_parambased.dataSource.sync();
					}
		});
	}
	$("#preventive_mtnce_rules_ok").on("click",function()
	{
		if($("#prev_mtnce_type").val() == "P")
		{
			for(var i=0;i<eq_param_data.length;i++)
			{
				if(eq_param_data[i].mprofile_id == "")
				{
					alert("Fill the template of all the parameter");
					return false;
				}
			}
			eqparam_prevrules_parambased_savemode="U";
			executeService_save_manage_equipment_prevmrules_eqparambased();
		}
	});
}
function fn_manage_preventive_maintenance_rules_PreImport()
{
	return true;
}
function fn_manage_preventive_maintenance_rules_PostImport()
{
	return true;
}
function fn_manage_preventive_maintenance_rules_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"grid_eqparam_parambased",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_manage_preventive_maintenance_rules_PostExport()
{
	return true;
}
function fn_manage_preventive_maintenance_rules_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"grid_eqparam_parambased",
			dispalyLabel:"Data Print"
		}]
	};
	return printConfiguration;
}
function fn_manage_preventive_maintenance_rules_PostPrint()
{
	return true;
}