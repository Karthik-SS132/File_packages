function fn_manage_item_master_rate_edit(){
	value_changed_ind=false;		
	
	/* DROPDOWNLIST INITIALIZATION -  UOM */
	manage_item_master_rate_edit_uom_code	= InitializeKendoDropDownList({
		fieldID: "manage_item_master_rate_edit_uom_code",
		dataSource: {
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values",
			inputParameter: {
				p_lov_code: "ITEMUOM",
				p_search_field_1: "",
				p_search_field_2: "",
				p_search_field_3: "",
				p_search_field_4: "",
				p_search_field_5: ""
			},
		},
		dataTextField: "p_description_field_1",
		dataValueField: "p_value_field_1",
		filterMode: false		
	});		
	
	
	$("#manage_item_master_rate_edit_std_rate").kendoNumericTextBox({
        format: "#.0000",
		min:"1",
		max:"999999"
    });
	manage_item_master_rate_edit_std_rate=$("#manage_item_master_rate_edit_std_rate").data("kendoNumericTextBox");
	
	/* DROPDOWNLIST INITIALIZATION -  CURRENCYCODE */
	manage_item_master_rate_edit_currency_code	= InitializeKendoDropDownList({
		fieldID: "manage_item_master_rate_edit_currency_code",
		dataSource: {
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values",
			inputParameter: {
				p_lov_code: "CURRENCYCODE",
				p_search_field_1: "",
				p_search_field_2: "",
				p_search_field_3: "",
				p_search_field_4: "",
				p_search_field_5: ""
			},
		},
		dataTextField: "p_description_field_1",
		dataValueField: "p_value_field_1",
		filterMode: false		
	});		
	
	$("#manage_item_master_rate_edit_submit_btn").click(function() {
		fn_manage_item_master_rate_edit_submit_btn_click();
	});
	
	$("#manage_item_master_rate_edit_cancel_btn").click(function() {
		fn_manage_item_master_rate_edit_cancel_btn_click();
	});
	$("#manage_item_master_rate_edit input").on("change", function() {
		value_changed_ind = true;
	});
	
	AttachValidationRules("manage_item_master_rate_edit");	
	ApplyConfiguredLabels("manage_item_master_rate_edit");
}
function fn_manage_item_master_rate_edit_submit_btn_click() {	
	var validator = $("#manage_item_master_rate_edit").data("kendoValidator");
	var check=0;
	rate_grid=manage_item_master_rate_grid_1.dataSource.data();
	for(k=0;k<rate_grid.length;k++) {
		if(rate_grid[k].uom_code== manage_item_master_rate_edit_uom_code.value() && rate_grid[k].std_rate == manage_item_master_rate_edit_std_rate.value() && rate_grid[k].currency_code == manage_item_master_rate_edit_currency_code.value() )
		{
			check=1;
			manage_item_master_rate_edit_uom_code.value("");
			manage_item_master_rate_edit_std_rate.value("");
			manage_item_master_rate_edit_currency_code.value("");
			$("[data-for|=manage_item_master_rate_edit_uom_code]").text("");
			$("[data-for|=manage_item_master_rate_edit_currency_code]").text("");
			alert("Itemrate Details Already Exists. Please Enter Valid Value ");
			break;			
		}			
	}
	
	if(check!=1){
		if (validator.validate()) {				
			manage_item_master_rate_datasource_2.add({ 	
				uom_code: manage_item_master_rate_edit_uom_code.value(),
				std_rate: manage_item_master_rate_edit_std_rate.value(),
				currency_code: manage_item_master_rate_edit_currency_code.value()
			});	
			alert("Record Added Successfully");
			$("#openkendowindow").data("kendoWindow").close();		
		}
	}
}
function fn_manage_item_master_rate_edit_cancel_btn_click() {
	if (value_changed_ind == true) {
		if (confirm("You have modified one or more values on the form. Do you want to cancel the changes")) {
			$("#openkendowindow").data("kendoWindow").close();
		}				 
	} 
	else {
		$("#openkendowindow").data("kendoWindow").close();
	}
}


