function InitializeDropDownList(fieldId,dataSourceForDDL,dataTextFieldForDDL,dataValueFieldForDDL,indexValue,optionLabelValueForDDL)
{
	var optionLabelValue = false;
	if (optionLabelValueForDDL == true)
	{
		optionLabelValue = "---Select---";
	}
	$("#" + fieldId).kendoDropDownList(
	{
		optionLabel : optionLabelValue,
		dataTextField : dataTextFieldForDDL,
		dataValueField : dataValueFieldForDDL,
		dataSource : dataSourceForDDL,
		index : indexValue,
		template:"${data." + dataValueFieldForDDL + "}" + "-" + "${data." + dataTextFieldForDDL + "}",
	});
	var dropDownListData = $("#" + fieldId).data("kendoDropDownList");
	return dropDownListData;
}

function InitializeComboBox(fieldId,dataSourceForCB,dataTextFieldForCB,dataValueFieldForCB,indexValue)
{
	$("#" + fieldId).kendoComboBox(
	{
		dataTextField : dataTextFieldForCB,
		dataValueField : dataValueFieldForCB,
		dataSource : dataSourceForCB,
		index : indexValue,
		template:"${data." + dataValueFieldForCB + "}" + "-" + "${data." + dataTextFieldForCB + "}",
	});
	var comboBoxData = $("#" + fieldId).data("kendoComboBox");
	return comboBoxData;
}

function InitializeWindow(screenId,fieldId,windowTitle,windowHeight,windowWidth)
{
	$("#" + fieldId).append("<div id = 'openkendowindow'></div>");
	var kendoWindowField = $("#openkendowindow");
	
	kendoWindowField.kendoWindow(
	{
		title : windowTitle,
		height : windowHeight + "px",
		width : windowWidth + "px",
		draggable :  false,
		scrollable : false,				
		modal : true,
		resizable : false,
		refresh : onRefresh,
		content : "./" + screenId+ ".html",
		deactivate : function() 
		{
			this.destroy();                                           
		},				
	});
	kendoWindowField.data("kendoWindow").center();
	kendoWindowField.data("kendoWindow").open();
	function onRefresh()
	{
		//try
		//{
			eval("fn_" + screenId + "()"); //calling fn_screenname()
		//}
		//catch(err)
		//{					
		//	alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
		//	kendoWindowField.data("kendoWindow").close();
		//}
	}
	return kendoWindowField.data("kendoWindow");
}

function InitializeDatePicker(fieldId)
{
	var dateFormat = "";
	if (login_profile.date_display_format == "dmy")
	{
		dateFormat = "dd-MM-yyyy";
	}
	else if (login_profile.date_display_format == "mdy")
	{
		dateFormat = "MM-dd-yyyy";
	}
	$("#" + fieldId).kendoDatePicker(
	{
		format : dateFormat,
	});
	var datePickerData = $("#" + fieldId).data("kendoDatePicker");
	return datePickerData;
}

function InitializeTimePicker(fieldId)
{
	$("#" + fieldId).kendoTimePicker(
	{
		interval : "5",
		format : "HH:mm"
	});
	var timePickerData = $("#" + fieldId).data("kendoTimePicker");
	return timePickerData;
}

function InitializeDateTimePicker(fieldId)
{
	var dateTimeFormat = "";
	if (login_profile.date_display_format == "dmy")
	{
		dateTimeFormat = "dd-MM-yyyy HH:mm";
	}
	else if (login_profile.date_display_format == "mdy")
	{
		dateTimeFormat = "MM-dd-yyyy HH:mm";
	}
	$("#" + fieldId).kendoDateTimePicker(
	{
		interval : "5",
		format : dateTimeFormat
	});
	var dateTimePickerData = $("#" + fieldId).data("kendoDateTimePicker");
	return dateTimePickerData;
}

function InitializeNumericTextBox(fieldId,numberFormat,minValue,maxValue,stepValue)
{
	$("#" + fieldId).kendoNumericTextBox(
	{
		min : minValue,
		max : maxValue,
		format : numberFormat,
		step : stepValue
	});
	var numericTextBoxData = $("#" + fieldId).data("kendoNumericTextBox");
	return numericTextBoxData;
}

function InitializeTabStrip(fieldId)
{
	$("#" + fieldId).kendoTabStrip(
	{
		animation : 
		{
			open : 
			{
				effects: "fadeIn"
			}
		}
	});
	var tabStripData = $("#" + fieldId).data("kendoTabStrip");
	return tabStripData;
}

function InitializeGrid(fieldId,gridDataSource,gridField,gridTitle,gridWidth,gridTemplate,gridToolBar,gridHeight,gridPageSize)
{
	var gridColumn = [];
	var gridToolbarValue = false;
	if(gridToolBar !== false)
	{
		gridToolbarValue = kendo.template($("#" + gridToolBar).html());
	}
	for(var i = 0; i < gridField.length; i++)
	{
		var gridColumnDetails = "";			
		gridColumnDetails += "{field : '" + gridField[i] + "'," + "title : '" + gridTitle[i] + "'," + "width : '" + gridWidth[i] + "'," + "template : '" + gridTemplate[i] + "'}" ;
		eval("var gridColumnObject = " + gridColumnDetails);
		gridColumn.push(gridColumnObject);
	}
	$("#" + fieldId).kendoGrid(
	{
		dataSource : gridDataSource,
		columns : gridColumn,
		toolbar : gridToolbarValue,
		height : gridHeight,
		pageSize : gridPageSize,
		editable : false,
		pageable : true,
		selectable : true,
	});
	var gridData = $("#" + fieldId).data("kendoGrid");
	return gridData;
}

/* FUNCTIONS BELOW SHOULD BE REMOVED IN THE FUTURE */
function InitializeDropDownListWithTransport(fieldId, applicationName, serviceName, dataTextFieldForDDL, dataValueFieldForDDL,inputParameter, optionLabelValueForDDL, isDDLasFilter, functionToExecute)
{
	var optionLabelValue = false;
	if (optionLabelValueForDDL == true)
	{
		var optionLabelValueString = '{' + dataValueFieldForDDL + ': "---Select---", ' + dataTextFieldForDDL + ': ""};'
		eval('var optionLabelValue = ' + optionLabelValueString);
	}
	$('#' + fieldId).kendoDropDownList(
	{
		index: 0,
		optionLabel: optionLabelValue,		
		dataTextField : dataValueFieldForDDL,
		dataValueField : dataValueFieldForDDL,
		template:"${data." + dataValueFieldForDDL + "}" + "-" + "${data." + dataTextFieldForDDL + "}",
		dataSource: 
		{
			transport: 
			{
				read: 
				{
					type: "POST",
					dataType: 'json',
					contentType: "application/json; charset=utf-8",
					url: GetTransportUrl(applicationName,serviceName,"context/outputparam"),	
					timeout:20000,
					complete: function(data, textstatus) 
					{
						var returnValue = ProcessTransportResponse(data, textstatus);
						if (isDDLasFilter)
						{		
							var dropDownListData = $("#" + fieldId).data("kendoDropDownList");
							eval("var additionalObject = {" + dataTextFieldForDDL + ":'ALL'," + dataValueFieldForDDL + ":'ALL'}");
							dropDownListData.dataSource.insert(0,additionalObject);
							dropDownListData.value("ALL");
						}

						var width = $("#" + fieldId).data("kendoDropDownList").list.width();
						var data_width = width  + 10;
						$("#" + fieldId).data("kendoDropDownList").list.width(data_width);
						if(functionToExecute != undefined)
						{
							eval(functionToExecute + "()");
						}
					}
				},
				parameterMap: function(options, operation) 
				{
					if(inputParameter != "")
					{
						return GetTransportParameter({inputparam:inputParameter});
					}
					else
					{
						return GetTransportParameter();
					}
				}
			},
		},
		
	});
	var dropDownListData = $("#" + fieldId).data("kendoDropDownList");
	return dropDownListData;
}

function InitializeComboBoxWithTransport(fieldId, applicationName, serviceName, dataTextFieldForCB, dataValueFieldForCB,inputParameter, optionLabelValueForCB, isCBasFilter,functionToExecute)
{
	var optionLabelValue = false;
	if (optionLabelValueForCB == true)
	{
		var optionLabelValueString = '{' + dataValueFieldForCB + ': "---Select---", ' + dataTextFieldForCB + ': ""};'
		eval('var optionLabelValue = ' + optionLabelValueString);
	}
	$('#' + fieldId).kendoComboBox(
	{
		index: 0,
		filter: "contains",
		dataTextField : dataValueFieldForCB,
		dataValueField : dataValueFieldForCB,
		template:"${data." + dataValueFieldForCB + "}" + "-" + "${data." + dataTextFieldForCB + "}",
		dataSource: 
		{
			transport: 
			{
				read: 
				{
					type: "POST",
					dataType: 'json',
					contentType: "application/json; charset=utf-8",
					url: GetTransportUrl(applicationName,serviceName,"context/outputparam"),	
					timeout:20000,
					complete: function(data, textstatus) 
					{
						var returnValue = ProcessTransportResponse(data, textstatus);
						if (isCBasFilter)
						{		
							var comboBoxData = $("#" + fieldId).data("kendoComboBox");
							eval("var additionalObject = {" + dataTextFieldForCB + ":'ALL'," + dataValueFieldForCB + ":'ALL'}");
							comboBoxData.dataSource.insert(0,additionalObject);
							comboBoxData.value("ALL");
						}
						var width = $("#" + fieldId).data("kendoComboBox").list.width();
						var data_width = width  + 10;
						$("#" + fieldId).data("kendoComboBox").list.width(data_width);
						if(functionToExecute != undefined)
						{
							eval(functionToExecute + "()");
						}

					}
				},
				parameterMap: function(options, operation) 
				{
					if(inputParameter != "")
					{
						return GetTransportParameter({inputparam:inputParameter});
					}
					else
					{
						return GetTransportParameter();
					}
				}
			},
		},
	});
	var comboBoxData = $("#" + fieldId).data("kendoComboBox");;
	return comboBoxData;
}