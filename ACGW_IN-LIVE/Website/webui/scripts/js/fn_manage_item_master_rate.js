function fn_manage_item_master_rate() {	
	isScreenEditable = true;
	screenChangeInd = "1";
	assignScreenName(divID, screenID);
	screenID = 'manage_item_master_rate';
	divID = screenID;
	AddToNavigationMap(divID, screenID, displayLabel,  parentScreenID);	
	
	/*  DataSource Initialization */
	manage_item_master_rate_datasource_2 = new kendo.data.DataSource({		
		pageSize: 7
	});
	
	/* GRID INITIALIZATION  - RATE */		
	manage_item_master_rate_grid_1 = InitializeKendoGrid({
		sectionID: "manage_item_master_rate_detail_1",
		toolbar: "manage_item_master_rate_grid_1_toolbar_template",
		dataSource: manage_item_master_rate_datasource_2,
		height: 400,
		pageSize: 10
	});		
	
	
	
		var retrieve_item_rate_details_object = {
			p_item_code:  manage_item_master_grid_1.dataSource.getByUid(manage_item_master_grid_1.select().data("uid")).item_code,
			p_item_variant_code: manage_item_master_grid_1.dataSource.getByUid(manage_item_master_grid_1.select().data("uid")).item_variant_code
		};
		 manage_item_master_rate_details = executeService_retrieve_item_rate_details(retrieve_item_rate_details_object);
		
		 manage_item_master_rate_details_xml_detail = loadXMLString(manage_item_master_rate_details);
		 
		manage_item_master_rate_datasource_2 = InitializeDataSource(manage_item_master_rate_details_xml_detail, 10, "list/item_rate_record");		
		
		$("#manage_item_master_rate_item_code").text(manage_item_master_grid_1.dataSource.getByUid(manage_item_master_grid_1.select().data("uid")).item_code);
		$("#manage_item_master_rate_item_variant_code").text(manage_item_master_grid_1.dataSource.getByUid(manage_item_master_grid_1.select().data("uid")).item_variant_code);
		$("#manage_item_master_rate_item_description").text(manage_item_master_grid_1.dataSource.getByUid(manage_item_master_grid_1.select().data("uid")).item_description);
		$("#manage_item_master_rate_variant_description").text(manage_item_master_grid_1.dataSource.getByUid(manage_item_master_grid_1.select().data("uid")).variant_description);
		
		manage_item_master_rate_grid_1.setDataSource(manage_item_master_rate_datasource_2);
	
	
	AddCustomFields("manage_item_master_rate");	
	
	$("#manage_item_master_rate_submit_btn").click(function() {
		fn_manage_item_master_rate_submit_btn_click();
	});
	
	AttachValidationRules("manage_item_master_rate");	
	
	$("#manage_item_master_rate_add_btn").click(function() {
		fn_manage_item_master_rate_add_btn_click();
	});
	
	$("#manage_item_master_rate_delete_btn").click(function() {
		fn_manage_item_master_rate_delete_btn_click();
	});
	
	ApplyConfiguredLabels("manage_item_master_rate");
		
}

function fn_manage_item_master_rate_submit_btn_click() {
		
	var validator = $("#manage_item_master_rate").data("kendoValidator");
	
	if (validator.validate()) {
		
		var rate_array=[];
		for(var i=0; i<manage_item_master_rate_grid_1.dataSource.total();i++){			
			rate_array.push({
				p_uom_code: manage_item_master_rate_grid_1.dataSource.data()[i].uom_code,
				p_std_rate: manage_item_master_rate_grid_1.dataSource.data()[i].std_rate,
				p_currency_code: manage_item_master_rate_grid_1.dataSource.data()[i].currency_code				
			});
		}
			if(rate_array.length == 0)
			{
				crud_indicator = "A";
			}
			else
			{
				crud_indicator = "U";
			}
		if (manage_item_master_rate_grid_1.dataSource.total() != 0) {
			var save_item_rate_details_object = {
				p_item_code: $("#manage_item_master_rate_item_code").text(),
				p_item_variant_code: $("#manage_item_master_rate_item_variant_code").text(),					
				inputparam_detail: rate_array,			
				p_save_mode: crud_indicator
			};
			var returnValue = executeService_save_item_rate_details(save_item_rate_details_object);
			
			console.log(save_item_rate_details_object);
			if (returnValue == "SP001") {
				alert("Item Rate Details saved successfully.");
				fn_manage_item_master_refresh();
			}
			else {
				screenChangeInd = "0";
				alert("Saving of Item Rate Details failed");
			}
		}
		else {
			alert("Item Rate Details Shouldn't Be Empty ");
		}
	}
	else {		
		screenChangeInd = "0";
	}
}

function fn_manage_item_master_rate_add_btn_click() {
	if(LoadJSScripts(["./webui/scripts/js/fn_manage_item_master_rate_edit.js"])) {
	//	crud_indicator = "A";
		displayLabel = 'Add';
		var manage_item_master_rate_edit_window = InitializeKendoWindow({
					fieldID: 'manage_item_master_rate_edit_window',
					windowTitle: 'Add',
					windowHeight: 260,
					windowWidth: 400,
					screenID: 'manage_item_master_rate_edit'
				});	
	}
	else {
		alert("Sorry. This feature is unavailable. Please contact your support desk.");
	}
}


function fn_manage_item_master_rate_refresh() {	
	manage_item_master_rate_grid_1.dataSource.read();
}

function fn_manage_item_master_rate_delete_btn_click() {
	if (manage_item_master_rate_grid_1.select().length != 0) {
		
			var isClose = confirm("Are you sure you want to delete the record?");
			if (isClose) {
				manage_item_master_rate_datasource_2.remove(manage_item_master_rate_datasource_2.getByUid(manage_item_master_rate_grid_1.select().data("uid")))
				alert('Deleted successfully');
				}				
	}	
	else {
		alert("No row has been selected.");
	}
}
	
