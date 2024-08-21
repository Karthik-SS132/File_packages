function fn_manage_print()
{
	value_changed_ind = false;
	
	var doc_list = [];
	var printConfiguration = "";
	try 
	{
		newTemplateScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (element, index) {
				return element == screenID;
			})[0];
		if (newTemplateScreen != undefined) {
			screenObject = eval(webNavigationController.getCurrentScreenID());
			printConfiguration = screenObject.variable.standard.printConfiguration;
		} else {
			printConfiguration = eval("fn_" + screenID + "_PrePrint()");
		}
		for(var content_items=0;content_items<printConfiguration.content.length;content_items++)
		{
			doc_list.push(printConfiguration.content[content_items]);
		}
	}
	catch(e)
	{
		alert("Print failed");
		console.log("fn_manage_print()--->"+e.Message);
	}
	
	/* DROP DOWN LIST INITIALIZATION - AVAILABLE DOCUMENT LIST */
	$("#manage_print_doc_list").kendoDropDownList(
	{
		optionLabel: "---Select---",
		dataTextField : "dispalyLabel",
		dataValueField : "fieldId",
		dataSource : doc_list
	});
	manage_print_doc_list = $("#manage_print_doc_list").data('kendoDropDownList');
	/*manage_print_doc_list = InitializeKendoDropDownList(
	{
		fieldID: "manage_print_doc_list",
		dataSource:doc_list,
		dataTextField: "dispalyLabel",
		dataValueField: "fieldId",
		filterMode: false,
		defaultValue: "",
		template:"description"
	});*/
	
	$('#manage_print_doc_list').on('change', function()
	{
	    value_changed_ind = true;	
	});
	
	/*SUBMIT BUTTON CLICK*/
	$("#manage_print_submit_btn").click(function() {
		fn_manage_print_submit_btn_click();
	});
	
	
	/*CANCEL BUTTON CLICK*/
	$("#manage_print_cancel_btn").click(function() {
		fn_manage_print_cancel_btn_click();
	});
	
	AttachValidationRules("manage_print");
	ApplyConfiguredLabels("manage_print");	
}
function fn_print(fieldId)
{
	var newTemplateScreen, screenObject;
	try 
	{
		newTemplateScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (element, index) {
				return element == screenID;
			})[0];
		if (newTemplateScreen != undefined) {
			screenObject = eval(webNavigationController.getCurrentScreenID());
			printConfiguration = screenObject.variable.standard.printConfiguration;
		} else {
			printConfiguration = eval("fn_" + screenID + "_PrePrint()");
		}
		for(var printconfigrws=0;printconfigrws<printConfiguration.content.length;printconfigrws++)
		{
			if(printConfiguration.content[printconfigrws].type == "grid")
			{
				fn_prepare_print_document_from_grid(printConfiguration.content[printconfigrws].fieldId);
			}
			else if(printConfiguration.content[printconfigrws].type == "html")
			{
				fn_prepare_print_document_from_html(printConfiguration.content[printconfigrws].fieldId);
			}	
			else if(printConfiguration.content[printconfigrws].type == "chart")
			{
				fn_prepare_print_document_from_kendoChart(printConfiguration.content[printconfigrws].fieldId);
			}
			else 
			{	
				
			}
		}
	}
	catch(e)
	{
		alert("Print failed");
		console.log("fn_print()--->" + e.Message);
	}
}

function fn_prepare_print_document_from_grid(fieldId)
{
	var table ='<table border="1">';
	var grid_records ='';
	try
	{
		var grid = $("#"+fieldId).data("kendoGrid");
		
		if(grid.dataSource.data().length != 0)
		{
			var columns_array = [];
			table += "<tr>";
			for(var cols in grid.dataSource.options.schema.model.fields)
			{
				table += "<th>" + cols + "</th>";
				columns_array.push(cols);
			}
			table += "</tr>";
			for(rws=0;rws<grid.dataSource.data().length;rws++)
			{
				table += "<tr>";
				grid_records += '<grid_record>';
				for(var cols=0; cols<columns_array.length;cols++)
				{
					if(grid.dataSource.data()[rws][columns_array[cols]] == undefined)
					{
						table += "<td>" + "" + "</td>";
						grid_records += '<'+columns_array[cols]+'>'+''+'</'+columns_array[cols]+'>';
					}
					else
					{
						table += "<td>" + grid.dataSource.data()[rws][columns_array[cols]] + "</td>";
						grid_records += '<'+columns_array[cols]+'>'+grid.dataSource.data()[rws][columns_array[cols]]+'</'+columns_array[cols]+'>';
					}
				}
				table += "</tr>";
				grid_records += '</grid_record>';
			}
			table +='</table>';
		}
	}
	catch(e)
	{
		console.log(e.Message);
	}
	sendToPrintSpooler(table);
	//return table;
}
function fn_prepare_print_document_from_html(fieldId)
{
	var html_record = "<html_record>";
	try
	{
	    var data = eval('document.getElementById("' + fieldId + '");');
		html_record += getXmlString("<html>" + data.outerHTML + "</html>");
	}
	catch(err)
	{
		console.log(err.message);
	}
	html_record = "</html_record>";
	return html_record;
}
function fn_prepare_print_document_from_kendoChart(fieldId)
{
	var chart_record = "<chart_record>";
	try
	{
	    var kendo_chart = $("#"+fieldId).data("kendoChart");
		chart_record += kendo_chart.imageDataURL().substr(22);
	}
	catch(err)
	{
		console.log(err.message);
	}
	chart_record += "</chart_record>";
	return chart_record;
}

function fn_manage_print_submit_btn_click()
{
	fn_print(manage_print_doc_list.value());
}
function fn_manage_print_cancel_btn_click()
{
	isScreenEditable=false;
	if (value_changed_ind == true)
	{
		var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
		if (isClose == true)
			print_window.close();
	}  
	else
	{
		print_window.close();
	}
}
function sendToPrintSpooler(printableDocument)
{
	var win=window.open();
	win.document.write(printableDocument);
	win.print();
	win.location.reload();
}