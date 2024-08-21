function fn_manage_company_notifications_mode_recipients()
{
	save_mode_notification_mode_recipient = "";
	/* ASSIGNING NAVIGATION PATH */
	screenChangeInd = "";
	assignScreenName(divID, screenID);
	screenID ='manage_company_notifications_mode_recipients';
	divID = screenID;
	$("#"+parentScreenID).remove();
	AddToNavigationMap(divID, screenID, displayLabel,  parentScreenID);
	
	/* VARIABLE INITIALIZATION */
	manage_company_notifications_mode_recipients_child = $("#window");
	$("#mange_com_noti_reci_noti_evt_code").text(selected_model['n_description']);
	$("#mange_com_noti_reci_noti_mode").text(selected_model_noti_mode['n_mode_description']);
	fn_refresh_manage_company_notifications_mode_recipients_grid();
	
	/* ADD BUTTON CLICK */
	$("#manage_company_notifications_mode_recipients_add_btn").click(function()
	{
		save_mode_notification_mode_recipient="A";
		var onClose = function()
		{
			$("#manage_company_notifications_mode_recipients_child").remove();
		}
		manage_company_notifications_mode_recipients_child.kendoWindow(
		{
			width:"500px",
			actions: ["Close"],
			draggable: false,
			scrollable:false,
			height: "350px",
			modal: true,
			refresh:onref,
			resizable: false,
			close: onClose
		});
		screenName="manage_company_notifications_mode_recipients_child";
		manage_company_notifications_mode_recipients_child.data("kendoWindow").refresh('./manage_company_notifications_mode_recipients_child.html');
		manage_company_notifications_mode_recipients_child.data("kendoWindow").title("Add");
		manage_company_notifications_mode_recipients_child.data("kendoWindow").open();
		manage_company_notifications_mode_recipients_child.data("kendoWindow").center();
		function onref()
		{
			try
			{
				eval('fn_'+screenName+'()');					
			}
			catch(err)
			{
				alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
				manage_company_notifications_mode_recipients_child.data("kendoWindow").close();
			}
		}
	});
	
	/* DELETE BUTTON CLICK */
	$("#manage_company_notifications_mode_recipients_delete_btn").click(function()
	{
		if (selected_noti_mode_reci == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			Notification_Event_Code = selected_model_noti_mode_reci["n_event_code"];
			Notificaion_Mode = selected_model_noti_mode_reci["n_mode"];
			Recipient_Type = selected_model_noti_mode_reci["n_recipient_type"];
			ID_Type = selected_model_noti_mode_reci["id_type"];
			Org_Level_No = selected_model_noti_mode_reci["org_level_no"];
			if(selected_model_noti_mode_reci["id_code"]===undefined)
			{
				ID_Code = " ";
			}
			else
			{
				ID_Code = selected_model_noti_mode_reci["id_code"];
			}
			rec_tstamp = selected_model_noti_mode_reci["rec_tstamp"];
			save_mode_notification_mode_recipient = "D";
			return_value  = executeService_save_manage_company_notification_recipients();
			fn_refresh_manage_company_notifications_mode_recipients_grid();
		}
	});
}
function fn_refresh_manage_company_notifications_mode_recipients_grid()
{
	/* VARIABLE INITIALIZATION */
	selected_noti_mode_reci = 0;
	save_mode_notification_mode_recipient = "";
	
	/* DATA SOURCE INITIALIZATION - MANAGE EQUIPMENT SERVICE CONTRACT TEMPLATE */
	manage_company_notifications_mode_recipients_list = executeService_retrieve_manage_company_notification_mode_recipient_list();
	manage_company_notifications_mode_recipients_list_xml = loadXMLString(manage_company_notifications_mode_recipients_list);
	manage_company_notifications_mode_recipients_datasource = new kendo.data.DataSource(
	{
		data : manage_company_notifications_mode_recipients_list_xml,
		pageSize : 8,
		schema :
		{
			type :"xml",
			data : "list/notification_recipient",
			model : 
			{
				fields :
				{
					slno : "slno/text()",
					n_event_code : "n_event_code/text()",
					n_mode : "n_mode/text()",
					n_recipient_type : "n_recipient_type/text()",
					id_type : "id_type/text()",
					id_type_description : "id_type_description/text()",
					org_level_no : "org_level_no/text()",
					org_level_no_desc : "org_level_no_desc/text()",
					id_code : "id_code/text()",
					id_code_desc : "id_code_desc/text()",
					rec_tstamp : "rec_tstamp/text()"
				}
			}
		}
	});
	
	/* ADDING SERIAL NUMBER ON THE GRID */
	manage_company_notifications_mode_recipients_datasource.read();
    manage_company_notifications_mode_recipients_datasource_data = manage_company_notifications_mode_recipients_datasource.data();
	
	for(c=0;c<manage_company_notifications_mode_recipients_datasource_data.length;c++)
	{
		var count = c;
		manage_company_notifications_mode_recipients_datasource_data[c].slno = count + 1;
		manage_company_notifications_mode_recipients_datasource_data[c].org_level_no_desc = "";
		manage_company_notifications_mode_recipients_datasource_data[c].id_code_desc = "";
		if(manage_company_notifications_mode_recipients_datasource_data[c].id_type == "RQ" || manage_company_notifications_mode_recipients_datasource_data[c].id_type == "AT")
		{
			manage_company_notifications_mode_recipients_datasource_data[c].org_level_no_desc = "";
			manage_company_notifications_mode_recipients_datasource_data[c].id_code_desc = "";
		}
		else if(manage_company_notifications_mode_recipients_datasource_data[c].id_type == "SU")
		{
			search_field_1 = "";
			search_field_2 = "";
			code_type = "SUPVSR";
			list_of_codes = [];
			executeService_retrieve_listof_values_for_codes();
			for(var sup=0;sup<list_of_codes.length;sup++)
			{
				if(manage_company_notifications_mode_recipients_datasource_data[c].id_code != undefined){
					if(manage_company_notifications_mode_recipients_datasource_data[c].id_code == list_of_codes[sup].value)
					{
						manage_company_notifications_mode_recipients_datasource_data[c].org_level_no_desc = "";
						manage_company_notifications_mode_recipients_datasource_data[c].id_code_desc = list_of_codes[sup].text;
						break;
					}
				}
			}
		}
		else if(manage_company_notifications_mode_recipients_datasource_data[c].id_type == "FR")
		{
			search_field_1 = "";
			search_field_2 = "";
			code_type = "FR";
			list_of_codes = [];
			executeService_retrieve_listof_values_for_codes();
			for(var fr=0;fr<list_of_codes.length;fr++)
			{
				if(manage_company_notifications_mode_recipients_datasource_data[c].id_code == list_of_codes[fr].value)
				{
					manage_company_notifications_mode_recipients_datasource_data[c].org_level_no_desc = "";
					manage_company_notifications_mode_recipients_datasource_data[c].id_code_desc = list_of_codes[fr].text;
					break;
				}
			}
		}
		else if(manage_company_notifications_mode_recipients_datasource_data[c].id_type == "OR")
		{
			console.log("OR");
			/*search_field_1 = "";
			search_field_2 = "";
			code_type = manage_company_notifications_mode_recipients_datasource_data[c].id_type;
			org_levels_data = [];
			executeService_retrieve_listof_org_levels();
			for(var org_level=0;org_level<org_levels_data.length;org_level++)
			{
				if(manage_company_notifications_mode_recipients_datasource_data[c].org_level_no == org_levels_data[org_level].level_id)
				{
					manage_company_notifications_mode_recipients_datasource_data[c].org_level_no_desc = org_levels_data[org_level].level_name;
					org_entity_type = manage_company_notifications_mode_recipients_datasource_data[c].org_level_no;
					org_lvl_code_arr = [];
					org_lvlcodes_data = [];
					executeService_retrieve_listof_org_level_codes();
					for(var org_level_code=0;org_level_code<org_lvlcodes_data.length;org_level_code++)
					{
						if(manage_company_notifications_mode_recipients_datasource_data[c].id_code == org_lvlcodes_data[org_level_code].value)
						{
							manage_company_notifications_mode_recipients_datasource_data[c].id_code_desc = org_lvlcodes_data[org_level_code].text;
							break;
						}
					}
					break;
				}
			}*/
			org_levels_codes_data = [{"text":"Assigned To Org.Head","value":"AO"},{"text":"Next Level Org.Head","value":"O1"},{"text":"Org.Head - 3rd Level","value":"O2"}];
			for(var org_level=0;org_level<org_levels_codes_data.length;org_level++)
			{
				console.log(manage_company_notifications_mode_recipients_datasource_data[c].id_code +"=="+ org_levels_codes_data[org_level].value);
				if(manage_company_notifications_mode_recipients_datasource_data[c].id_code == org_levels_codes_data[org_level].value)
				{
					manage_company_notifications_mode_recipients_datasource_data[c].id_code_desc = org_levels_codes_data[org_level].text;
					break;
				}
			}
		}
	}
	
	/*GRID INITIALIZATION - MANAGE EQUIPMENT SERVICE CONTRACT TEMPLATE */
	$("#manage_company_notifications_mode_recipients_grid").kendoGrid(
	{
		dataSource : manage_company_notifications_mode_recipients_datasource,
		selectable : true,
		pageable : true,
		pageSize : 8,
		height : 300,
		toolbar : kendo.template($("#manage_company_notifications_mode_recipients_grid_toolbar").html()),
		columns : 
		[
			{
				field : "slno",
				title : "Slno",
				template: '# if (kendo.toString(slno) == "") {# #} else{# ${slno} #}#',
				width : "40px",
			},
			{
				field : "n_recipient_type",
				title : "Recipient Type",
				template: '# if (kendo.toString(n_recipient_type) == "") {# #} else {# ${n_recipient_type} #}#',
				width : "",
			},
			{
				field : "id_type_description",
				title : "ID Type",
				template: '# if (kendo.toString(id_type_description) == "") {# #} else {# ${id_type_description} #}#',
				width : "",
			},
			{
				field : "org_level_no_desc",
				title : "Organogram Level No",
				template: '# if (kendo.toString(org_level_no_desc) == "") {# --- #} else {#${org_level_no_desc}#}#',
				width : "",
			},
			{
				field : "id_code_desc",
				title : "ID Code",
				template: '# if (kendo.toString(id_code_desc) == "") {# --- #} else {# ${id_code_desc} #}#',
				width : "",
			}
		],
		change : function()
		{
			selected_noti_mode_reci = this.select();
			selected_uid_noti_mode_reci = selected_noti_mode_reci.data("uid");
			selected_model_noti_mode_reci = manage_company_notifications_mode_recipients_datasource.getByUid(selected_uid_noti_mode_reci);
		}
	});
	manage_company_notifications_mode_recipients_grid = $("#manage_company_notifications_mode_recipients_grid").data("kendoGrid");
	SetEmployeeNameOnGrid();
}
function SetEmployeeNameOnGrid() {
    employee_data = new kendo.data.DataSource({
        pageSize: 10,
        serverPaging: true,
        transport: {
            read: {
                type: "POST",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                url: GetTransportUrl("common_modules", "retrieve_listof_employees", "context/outputparam"),
                complete: function (data, textstatus) {
                    var returnValue = ProcessTransportResponse(data, textstatus);
                    for (emplst = 0; emplst < manage_company_notifications_mode_recipients_datasource_data.length; emplst++) {
                        for (var emp = 0; emp < employee_data.data().length; emp++) {
                            if (manage_company_notifications_mode_recipients_datasource_data[emplst].id_code == employee_data.data()[emp].emp_id) {
                                manage_company_notifications_mode_recipients_datasource_data[emplst].org_level_no_desc = "";
                                manage_company_notifications_mode_recipients_datasource_data[emplst].id_code_desc = employee_data.data()[emp].emp_name;
                                break;
                            }
                        }
                    }
                    manage_company_notifications_mode_recipients_grid.refresh();
                }
            },
            parameterMap: function (data, type) {
                if (type == "read") {
                    return GetTransportParameter({
                        inputparam: {
                            p_org_level_no_filter: "ALL",
                            p_org_level_code_filter: "ALL",
                            p_location_code_filter: "ALL",
                            p_supervisor_emp_id_filter: "ALL"
                        }
                    });
                }
            }
        },
        schema: {
            model: {
                id: "emp_id",
                fields: {
                    emp_id: {
                        editable: true
                    },
                    emp_name: {
                        editable: true
                    },
                    location_code: {
                        editable: true
                    },
                    photo_reference: {
                        editable: true
                    }
                }
            }
        }
    });
    employee_data.read();
}
function fn_manage_company_notifications_mode_recipients_PreImport()
{
	return true;
}
function fn_manage_company_notifications_mode_recipients_PostImport()
{
	return true;
}
function fn_manage_company_notifications_mode_recipients_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"manage_company_notifications_mode_recipients_grid",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_manage_company_notifications_mode_recipients_PostExport()
{
	return true;
}
function fn_manage_company_notifications_mode_recipients_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"manage_company_notifications_mode_recipients_grid",
			dispalyLabel:"Data Print"
		}]
	};
	return printConfiguration;
}
function fn_manage_company_notifications_mode_recipients_PostPrint()
{
	return true;
}