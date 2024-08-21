function InitializeKendoGrid(gridObject) {	
	/* VARIABLE INITIALIZATION */
	var gridToolbar = false, sectionNumber, sectionName, screenID, editableValue = false, resizableValue = true, selectableValue = true, filterableValue = true, pageableValue = true, sortableValue = true, mobileValue = false;	
	sectionNumber = gridObject.sectionID.charAt(gridObject.sectionID.length - 1);
	sectionName = gridObject.sectionID.substring(0, gridObject.sectionID.lastIndexOf("_"));
	screenID = sectionName.substring(0, sectionName.lastIndexOf("_"));
	
	if(typeof(gridObject.toolbar) == "object") {
		gridToolbar = gridObject.toolbar;
	}
	else if(gridObject.toolbar != false && gridObject.toolbar != undefined && gridObject.toolbar != "") {
		var toolbarList = $.parseHTML($("#" + gridObject.toolbar).html())[1];
				
		/*var a = $(document.createElement('a')).attr({'id':screenID+"_"+"preference_for_grid_and_export_btn",'name':screenID+"_"+"preference_for_grid_and_export_btn",'data-button-type': "preference_for_grid_and_export"}).css({'text-decoration':"underline",'float':"right"}).text('sdssd');*/
		var a = document.createElement("a");
		a.setAttribute("id",screenID+"_"+"preference_for_grid_and_export_btn");	
		a.setAttribute("name",screenID+"_"+"preference_for_grid_and_export_btn");	
		a.setAttribute("data-button-type" , "preference_for_grid_and_export");
		a.setAttribute("style" , {'text-decoration':'underline','float':'right'});
	//	a.text = "text" ;
		toolbarList.appendChild(a);
		gridToolbar = kendo.template(toolbarList.outerHTML);
	}
	else
	{
		toolBarString = '<div class = "toolbar">'+'<a class = "k-button" id = "' + screenID + "_grid_" + sectionNumber + '_export_btn' + '" data-widget-type = "w_button" data-button-group = "export" data-button-role = "grid" style = "cursor: pointer; float: right"><span class= "k-icon k-i-excel"></span>&nbsp;&nbsp;Export</a><a class = "k-button" style="float:right;cursor: pointer;" id ='+screenID+"_"+'preference_for_grid_and_export_btn'+' name='+screenID+'_'+'preference_for_grid_and_export_btn'+' data-button-type="preference_for_grid_and_export" >Change Display Order</a></div>';
		gridToolbar = kendo.template(toolBarString);
	}	
	if (gridObject.editable == true) {
		editableValue = true;
	}
	else if(gridObject.editable == "popup") {
		editableValue = "popup";
	}
	if (gridObject.resizable == false) {
		resizableValue = false;
	}	
	if (gridObject.selectable == false) {
		selectableValue = false;
	}	
	if (gridObject.filterable == false) {
		filterableValue = false;
	}	
	if (gridObject.pageable == false) {
		pageableValue = false;
	}	
	if (gridObject.sortable == false) {
		sortableValue = false;
	}
	if (gridObject.mobile == true) {
		mobileValue = true;
	}
	
	/* GRID INITIALIZATION */
	$("#" + screenID + "_grid_" + sectionNumber).kendoGrid({
		dataSource: gridObject.dataSource,
	/*	columns: GetGridColumns(gridObject.sectionID) ,*/ // For reference
		columns: GetGridColumns(gridObject.sectionID, screenID + "_grid_" + sectionNumber,gridObject.favourite),
		toolbar: gridToolbar,
		height: gridObject.height,
		pageSize: gridObject.pageSize,
		editable: editableValue,
		resizable: resizableValue,
		selectable: selectableValue,
		filterable: filterableValue,
		pageable: pageableValue,
		sortable: sortableValue,
		mobile:mobileValue
	});
	if(gridObject.favourite == false || gridObject.favourite == undefined || gridObject.favourite == '')
	{
		$("#" + screenID + "_grid_" + sectionNumber+"_"+"preference_for_grid_and_export_btn").hide();
		if(gridObject.toolbar == false || gridObject.toolbar == undefined || gridObject.toolbar == '')
		{
			$("#" + screenID + "_grid_" + sectionNumber+' .k-grid-toolbar').hide();
		}
	}
	
	return $("#" + screenID + "_grid_" + sectionNumber).data("kendoGrid");
}

function InitializeKendoDropDownList(ddlObject) {
	/* VARIABLE DECLARATIONS */
	var initialDataSource = [], finalDataSource = [], autoBindValue = false, cascadeFromValue = false, cascadeFromFieldValue = false, optionLabelValue = false;
	var templateValue = "${data." + ddlObject.dataValueField + "}" + " - " + "${data." + ddlObject.dataTextField + "}";
	eval ("var " + ddlObject.fieldID + "_display_default_value = false");
	eval ("var " + ddlObject.fieldID + "_load_cascade_parent = false");
	
	/* CREATING KENDO DATA SOURCE MODEL */
	eval ("var dataSourceModel = kendo.data.Model.define({fields: {" + ddlObject.dataTextField + ": {editable: true},	" + ddlObject.dataValueField + ": {editable: true}}})");
	
	/* FUNCTION DECLARATION - GET TRANSPORT DATA SOURCE */
	function GetTransportDataSource () {
		return new kendo.data.DataSource ({
			transport: {
				read: {
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					url: GetTransportUrl (ddlObject.dataSource.applicationName, ddlObject.dataSource.serviceName, "context/outputparam"),
					complete: function (data, textstatus) {
						/* SPACE FOR PROCESSING AFTER TRANSPORT IS COMPLETED */												
					}
				},
				parameterMap: function (options, operation) {
					if (ddlObject.dataSource.inputParameter != undefined) {
						return GetTransportParameter ({inputparam: ddlObject.dataSource.inputParameter});
					}
					else {
						return GetTransportParameter ();
					}
				}
			},
			schema: {
				model: dataSourceModel
			}
		});
	}
	
	if (ddlObject.defaultValue != undefined && ddlObject.defaultValue != "" && ((ddlObject.defaultValue != "ALL" && ddlObject.filterMode == true) || (ddlObject.filterMode != true))) {
		/* FORMING INITIAL DATA SOURCE WHEN THERE IS A DEFAULT VALUE */
		if (ddlObject.cascading != undefined && ddlObject.cascading != false) {
			eval ("initialDataSource = [{" + ddlObject.dataValueField + ":'" + ddlObject.defaultValue + "'," + ddlObject.dataTextField + ":'" + ddlObject.defaultValue + "'," + ddlObject.cascading.cascadeFromField + ":'" + ddlObject.cascading.defaultCascadeValue + "'}]");
		}
		else {				
			eval ("initialDataSource = [{" + ddlObject.dataValueField + ":'" + ddlObject.defaultValue + "'," + ddlObject.dataTextField + ":'" + ddlObject.defaultValue + "'}]");
		}
		
		/* DISPLAYING DESCRIPTION */
		if (ddlObject.defaultValueDescription != undefined && ddlObject.defaultValueDescription != "") {
			if (ddlObject.defaultValueDescription.parentCodeValue != undefined) {
				$(".display_description[data-for='" + ddlObject.fieldID + "']").text(GetCodeDescriptionValue(ddlObject.defaultValueDescription.codeType, ddlObject.defaultValue, ddlObject.defaultValueDescription.parentCodeValue));
			}
			else {
				$(".display_description[data-for='" + ddlObject.fieldID + "']").text(GetCodeDescriptionValue(ddlObject.defaultValueDescription.codeType, ddlObject.defaultValue, ""));
			}
		}
		else {
			$(".display_description[data-for='" + ddlObject.fieldID + "']").text("");
		}
		
		autoBindValue = true;
		eval (ddlObject.fieldID + "_display_default_value = true");		
		
		/* FORMING FINAL DATA SOURCE WHEN THERE IS A DEFAULT VALUE */
		finalDataSource = ddlObject.dataSource;
		if (ddlObject.dataSource.applicationName != undefined) {
			finalDataSource = GetTransportDataSource ();
		}
		
		if (ddlObject.cascading != undefined && ddlObject.cascading != false) {
			eval(ddlObject.fieldID + "_load_cascade_parent = true");
		}
	}
	else {		
		/* FORMING INITIAL DATA SOURCE WHEN THERE IS NOT A DEFAULT VALUE */
		initialDataSource = ddlObject.dataSource;
		if (ddlObject.dataSource.applicationName != undefined) {
			initialDataSource = GetTransportDataSource ();
		}
		
		/* FORMING OPTION LABEL VALUE */
		if (ddlObject.filterMode == true) {
			eval ("optionLabelValue = {" + ddlObject.dataValueField + ": 'ALL'," + ddlObject.dataTextField + ": 'ALL'}");			
		}
		else {
			eval ("optionLabelValue = {" + ddlObject.dataValueField + ": '---Select---'," + ddlObject.dataTextField + ": ''}");
			if (ddlObject.template == "description") {
				eval ("optionLabelValue = {" + ddlObject.dataValueField + ": '---Select---'," + ddlObject.dataTextField + ": '---Select---'}");
			}
			else if (ddlObject.template == "code") {
				eval ("optionLabelValue = {" + ddlObject.dataValueField + ": '---Select---'}");
			}
		}
	}
	
	/* FORMING CASCADING DETAILS */
	if (ddlObject.cascading != undefined && ddlObject.cascading != false) {
		cascadeFromValue = ddlObject.cascading.cascadeFrom;
		cascadeFromFieldValue = ddlObject.cascading.cascadeFromField;
	}
	
	/* FORMING TEMPLATE VALUE */
	if (ddlObject.template == "code") {
		templateValue = "${data." + ddlObject.dataValueField + "}" ;
	}
	else if (ddlObject.template == "description") {
		templateValue = "${data." + ddlObject.dataTextField + "}" ;
	}
	
	/* INITIALIZING DROP DOWN LIST */
	$("#" + ddlObject.fieldID).kendoDropDownList ({
		dataSource: initialDataSource,
		autoBind: autoBindValue,
		dataTextField: ddlObject.dataValueField,
		dataValueField: ddlObject.dataValueField,		
		optionLabel: optionLabelValue,		
		template: templateValue,
		cascadeFrom: cascadeFromValue,
		cascadeFromField: cascadeFromFieldValue
	});
	
	/* PRE FIXING THE DEFAULT VALUE */
	if (ddlObject.defaultValue != undefined && ddlObject.defaultValue != "" && ((ddlObject.defaultValue != "ALL" && ddlObject.filterMode == true) || (ddlObject.filterMode != true))) {
		$("#" + ddlObject.fieldID).data("kendoDropDownList").value(ddlObject.defaultValue);
	}
	
	/* DROP DOWN LIST EVENT DECLARATION - OPEN */
	$("#" + ddlObject.fieldID).data("kendoDropDownList").bind ("open", function (e) {
		if (eval(ddlObject.fieldID + "_display_default_value") == true) {		
			/* FORMING OPTION LABEL VALUE */
			if (ddlObject.filterMode == true) {
				eval ("optionLabelValue = {" + ddlObject.dataValueField + ": 'ALL'," + ddlObject.dataTextField + ": 'ALL'}");
			}
			else {
				eval ("optionLabelValue = {" + ddlObject.dataValueField + ": '---Select---'," + ddlObject.dataTextField + ": ''}");
				if (ddlObject.template == "description") {
					eval ("optionLabelValue = {" + ddlObject.dataValueField + ": '---Select---'," + ddlObject.dataTextField + ": '---Select---'}");
				}
				else if (ddlObject.template == "code") {
					eval ("optionLabelValue = {" + ddlObject.dataValueField + ": '---Select---'}");
				}
			}
			$("#" + ddlObject.fieldID).data("kendoDropDownList").setDataSource(finalDataSource);
			eval (ddlObject.fieldID + "_display_default_value = false");
		}
		else if (eval(ddlObject.fieldID + "_load_cascade_parent") == true) {
			if ($("#" + ddlObject.cascading.cascadeFrom).data("kendoDropDownList") != undefined) {
				$("#" + ddlObject.cascading.cascadeFrom).data("kendoDropDownList").open();				
				$("#" + ddlObject.cascading.cascadeFrom).data("kendoDropDownList").close();				
			}
			else if ($("#" + ddlObject.cascading.cascadeFrom).data("kendoComboBox") != undefined) {
				$("#" + ddlObject.cascading.cascadeFrom).data("kendoComboBox").open();				
				$("#" + ddlObject.cascading.cascadeFrom).data("kendoComboBox").close();				
			}
			eval (ddlObject.fieldID + "_load_cascade_parent = false");
		}
		
		/* SETTING THE LIST WIDTH TO MATCH THE CONTENT */
		$(".k-list-container").css("width", "auto");
		//$(".k-list-container").css("white-space", "nowrap");
		$(".k-list-container").css("min-width", $("#" + ddlObject.fieldID).parent().width() - 5);
		$(".k-list-container").css("max-width", 600);
		$(".k-list-container").css("overflow-x", "hidden");
		$(".k-list-container").css("overflow-y", "auto");
		$(".k-list").css("width", "auto");
		//$(".k-list").css("overflow-x", "hidden");
		
		if (ddlObject.events != undefined && ddlObject.events.open != undefined) {
			eval(ddlObject.events.open + "(e)");
		}		
	});
	
	/* DROP DOWN LIST EVENT DECLARATION - CASCADE */
	$("#" + ddlObject.fieldID).data("kendoDropDownList").bind ("cascade", function (e) {
		if (ddlObject.childFieldID != undefined && ddlObject.childFieldID != "") {
			var childFieldIDArray = ddlObject.childFieldID.split(",");
			for (var counter = 0; counter < childFieldIDArray.length; counter ++) {
				$(".display_description[data-for='" + childFieldIDArray[counter] + "']").text("");
			}
		}
	
		if (ddlObject.events != undefined && ddlObject.events.cascade != undefined) {
			eval(ddlObject.events.cascade + "(e)");
		}
	});

	/* DROP DOWN LIST EVENT DECLARATION - DATABOUND */
	$("#" + ddlObject.fieldID).data("kendoDropDownList").bind ("dataBound", function (e) {	
		if (ddlObject.cascading == undefined || ddlObject.cascading == false) {
			if (ddlObject.defaultValue != undefined && ddlObject.defaultValue != "" && ((ddlObject.defaultValue != "ALL" && ddlObject.filterMode == true) || (ddlObject.filterMode != true))) {
				$("#" + ddlObject.fieldID).data("kendoDropDownList").value(ddlObject.defaultValue);
			}
		}
		if (ddlObject.events != undefined && ddlObject.events.dataBound != undefined) {
			eval(ddlObject.events.dataBound + "(e)");
		}
	});
	
	/* DROP DOWN LIST EVENT DECLARATION - CLOSE */
	$("#" + ddlObject.fieldID).data("kendoDropDownList").bind("close", function(e) {	
		if(ddlObject.events != undefined && ddlObject.events.close != undefined) {
			eval(ddlObject.events.close + "(e)");
		}
	});
	
	/* DROP DOWN LIST EVENT DECLARATION - BLUR */
	$("#" + ddlObject.fieldID).on("blur", function(e) {
		if(ddlObject.events != undefined && ddlObject.events.blur != undefined) {
			eval(ddlObject.events.blur + "(e)");
		}
	});
	
	/* DROP DOWN LIST EVENT DECLARATION - CHANGE */
	$("#" + ddlObject.fieldID).data("kendoDropDownList").bind("change", function(e) {
		if ($("#" + ddlObject.fieldID).data("kendoDropDownList").dataItem() != undefined) {
			if ($("#" + ddlObject.fieldID).data("kendoDropDownList").dataItem()[ddlObject.dataTextField] != "---Select---" && $("#" + ddlObject.fieldID).data("kendoDropDownList").dataItem()[ddlObject.dataTextField] != "ALL") {
				$(".display_description[data-for='" + ddlObject.fieldID + "']").text($("#" + ddlObject.fieldID).data("kendoDropDownList").dataItem()[ddlObject.dataTextField]);
			}
			else {
				$(".display_description[data-for='" + ddlObject.fieldID + "']").text("");
			}
		}
		else {
			$(".display_description[data-for='" + ddlObject.fieldID + "']").text("");
		}
		
		if(ddlObject.events != undefined && ddlObject.events.change != undefined) {
			eval(ddlObject.events.change + "(e)");
		}
		if (ddlObject.screenID != undefined) {
			ruleEngine.executeRuleStatements({
				screenID : ddlObject.screenID,
				objectID : "field",
				eventID : "change",
				fieldID : ddlObject.fieldID
			});
		}
	});
	
	/* USED WHEN CASCADING IS USED */
	if (ddlObject.cascading != undefined && ddlObject.cascading != false) {
		$("#" + ddlObject.fieldID).data("kendoDropDownList").trigger("open");
		$("#" + ddlObject.fieldID).data("kendoDropDownList").trigger("close");
	}
	
	return $("#" + ddlObject.fieldID).data("kendoDropDownList");
}

function InitializeKendoComboBox(cbObject) {
	/* VARIABLE DECLARATIONS */
	var initialDataSource = [], finalDataSource = [], autoBindValue = false, cascadeFromValue = false, cascadeFromFieldValue = false, placeholderValue = false;
	var templateValue = "${data." + cbObject.dataValueField + "}" + " - " + "${data." + cbObject.dataTextField + "}";
	eval ("var " + cbObject.fieldID + "_display_default_value = false");
	eval ("var " + cbObject.fieldID + "_load_cascade_parent = false");
	
	/* CREATING KENDO DATA SOURCE MODEL */
	eval ("var dataSourceModel = kendo.data.Model.define({fields: {" + cbObject.dataTextField + ": {editable: true},	" + cbObject.dataValueField + ": {editable: true}}})");
	
	/* FUNCTION DECLARATION - GET TRANSPORT DATA SOURCE */
	function GetTransportDataSource () {
		return new kendo.data.DataSource ({
			transport: {
				read: {
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					url: GetTransportUrl (cbObject.dataSource.applicationName, cbObject.dataSource.serviceName, "context/outputparam"),
					complete: function (data, textstatus) {
						/* SPACE FOR PROCESSING AFTER TRANSPORT IS COMPLETED */						
					}
				},
				parameterMap: function (options, operation) {
					if (cbObject.dataSource.inputParameter != undefined) {
						return GetTransportParameter ({inputparam: cbObject.dataSource.inputParameter});
					}
					else {
						return GetTransportParameter ();
					}
				}
			},
			schema: {
				model: dataSourceModel
			}
		});
	}
	
	if (cbObject.defaultValue != undefined && cbObject.defaultValue != "" && ((cbObject.defaultValue != "ALL" && cbObject.filterMode == true) || (cbObject.filterMode != true))) {
		/* FORMING INITIAL DATA SOURCE WHEN THERE IS A DEFAULT VALUE */
		if (cbObject.cascading != undefined && cbObject.cascading != false) {
			eval ("initialDataSource = [{" + cbObject.dataValueField + ":'" + cbObject.defaultValue + "'," + cbObject.dataTextField + ":'" + cbObject.defaultValue + "'," + cbObject.cascading.cascadeFromField + ":'" + cbObject.cascading.defaultCascadeValue + "'}]");
		}
		else {				
			eval ("initialDataSource = [{" + cbObject.dataValueField + ":'" + cbObject.defaultValue + "'," + cbObject.dataTextField + ":'" + cbObject.defaultValue + "'}]");
		}
		
		/* DISPLAYING DESCRIPTION */
		if (cbObject.defaultValueDescription != undefined && cbObject.defaultValueDescription != "") {
			if (cbObject.defaultValueDescription.parentCodeValue != undefined) {
				$(".display_description[data-for='" + cbObject.fieldID + "']").text(GetCodeDescriptionValue(cbObject.defaultValueDescription.codeType, cbObject.defaultValue, cbObject.defaultValueDescription.parentCodeValue));
			}
			else {
				$(".display_description[data-for='" + cbObject.fieldID + "']").text(GetCodeDescriptionValue(cbObject.defaultValueDescription.codeType, cbObject.defaultValue, ""));
			}
		}
		else {
			$(".display_description[data-for='" + cbObject.fieldID + "']").text("");
		}
		
		autoBindValue = true;
		eval (cbObject.fieldID + "_display_default_value = true");
		
		/* FORMING FINAL DATA SOURCE WHEN THERE IS A DEFAULT VALUE */
		finalDataSource = cbObject.dataSource;
		if (cbObject.dataSource.applicationName != undefined) {
			finalDataSource = GetTransportDataSource ();
		}
		
		if (cbObject.cascading != undefined && cbObject.cascading != false) {
			eval(cbObject.fieldID + "_load_cascade_parent = true");
		}
	}
	else {		
		/* FORMING INITIAL DATA SOURCE WHEN THERE IS NOT A DEFAULT VALUE */
		initialDataSource = cbObject.dataSource;
		if (cbObject.dataSource.applicationName != undefined) {
			initialDataSource = GetTransportDataSource ();
		}
		
		/* FORMING PLACE HOLDER VALUE */
		if (cbObject.filterMode == true) {
			placeholderValue = "ALL";
		}
		else {
			placeholderValue = "---Select---";
		}
	}	
	
	/* FORMING CASCADING DETAILS */
	if (cbObject.cascading != undefined && cbObject.cascading != false) {
		cascadeFromValue = cbObject.cascading.cascadeFrom;
		cascadeFromFieldValue = cbObject.cascading.cascadeFromField;
	}
	
	/* FORMING TEMPLATE VALUE */
	if (cbObject.template == "code") {
		templateValue = "${data." + cbObject.dataValueField + "}" ;
	}
	else if (cbObject.template == "description") {
		templateValue = "${data." + cbObject.dataTextField + "}" ;
	}
	
	/* INITIALIZING DROP DOWN LIST */
	$("#" + cbObject.fieldID).kendoComboBox ({
		dataSource: initialDataSource,
		autoBind: autoBindValue,
		dataTextField: cbObject.dataValueField,
		dataValueField: cbObject.dataValueField,		
		placeholder: placeholderValue,		
		template: templateValue,
		cascadeFrom: cascadeFromValue,
		cascadeFromField: cascadeFromFieldValue,
		filter: "contains"
	});
	
	/* SET SEARCHING BASED ON TEXT FIELD VALUE */
	$("#" + cbObject.fieldID).data("kendoComboBox").options.dataTextField = cbObject.dataTextField;
	
	/* PRE FIXING THE DEFAULT VALUE */
	if (cbObject.defaultValue != undefined && cbObject.defaultValue != "" && ((cbObject.defaultValue != "ALL" && cbObject.filterMode == true) || (cbObject.filterMode != true))) {
		$("#" + cbObject.fieldID).data("kendoComboBox").value(cbObject.defaultValue);
	}
	
	/* DROP DOWN LIST EVENT DECLARATION - OPEN */
	$("#" + cbObject.fieldID).data("kendoComboBox").bind ("open", function (e) {
		if (eval(cbObject.fieldID + "_display_default_value") == true) {
			/* FORMING PLACE HOLDER VALUE */
			if (cbObject.filterMode == true) {
				placeholderValue = "ALL";
			}
			else {
				placeholderValue = "---Select---";
			}
			$("#" + cbObject.fieldID).data("kendoComboBox").options.placeholder = placeholderValue;
			
			$("#" + cbObject.fieldID).data("kendoComboBox").setDataSource(finalDataSource);
			eval (cbObject.fieldID + "_display_default_value = false");
		}
		else if (eval(cbObject.fieldID + "_load_cascade_parent") == true) {
			if ($("#" + cbObject.cascading.cascadeFrom).data("kendoDropDownList") != undefined) {
				$("#" + cbObject.cascading.cascadeFrom).data("kendoDropDownList").open();				
				$("#" + cbObject.cascading.cascadeFrom).data("kendoDropDownList").close();				
			}
			else if ($("#" + cbObject.cascading.cascadeFrom).data("kendoComboBox") != undefined) {
				$("#" + cbObject.cascading.cascadeFrom).data("kendoComboBox").open();				
				$("#" + cbObject.cascading.cascadeFrom).data("kendoComboBox").close();				
			}
			eval (cbObject.fieldID + "_load_cascade_parent = false");
		}
		
		/* SETTING THE LIST WIDTH TO MATCH THE CONTENT */
		$(".k-list-container").css("width", "auto");
		//$(".k-list-container").css("white-space", "nowrap");
		$(".k-list-container").css("min-width", $("#" + cbObject.fieldID).parent().width() - 5);
		$(".k-list-container").css("max-width", 600);
		$(".k-list-container").css("overflow-x", "hidden");
		$(".k-list-container").css("overflow-y", "auto");
		$(".k-list").css("width", "auto");
		//$(".k-list").css("overflow-x", "hidden");
		
		if (cbObject.events != undefined && cbObject.events.open != undefined) {
			eval(cbObject.events.open + "(e)");
		}
	});
	
	/* DROP DOWN LIST EVENT DECLARATION - CASCADE */
	$("#" + cbObject.fieldID).data("kendoComboBox").bind ("cascade", function (e) {
		if (cbObject.childFieldID != undefined && cbObject.childFieldID != "") {
			var childFieldIDArray = cbObject.childFieldID.split(",");
			for (var counter = 0; counter < childFieldIDArray.length; counter ++) {
				$(".display_description[data-for='" + childFieldIDArray[counter] + "']").text("");
			}
		}
		
		if (cbObject.events != undefined && cbObject.events.cascade != undefined) {
			eval(cbObject.events.cascade + "(e)");
		}
	});

	/* DROP DOWN LIST EVENT DECLARATION - DATABOUND */
	$("#" + cbObject.fieldID).data("kendoComboBox").bind ("dataBound", function (e) {		
		if (cbObject.cascading == undefined || cbObject.cascading == false) {
			if (cbObject.defaultValue != undefined && cbObject.defaultValue != "" && ((cbObject.defaultValue != "ALL" && cbObject.filterMode == true) || (cbObject.filterMode != true))) {
				//$("#" + cbObject.fieldID).data("kendoComboBox").value(cbObject.defaultValue);
			}
		}
		if (cbObject.events != undefined && cbObject.events.dataBound != undefined) {
			eval(cbObject.events.dataBound + "(e)");
		}
	});
	
	/* DROP DOWN LIST EVENT DECLARATION - CLOSE */
	$("#" + cbObject.fieldID).data("kendoComboBox").bind("close", function(e) {
		if(cbObject.events != undefined && cbObject.events.close != undefined) {
			eval(cbObject.events.close + "(e)");
		}
	});
	
	/* DROP DOWN LIST EVENT DECLARATION - BLUR */
	$("#" + cbObject.fieldID).on("blur", function(e) {
		if($("#" + cbObject.fieldID).data("kendoComboBox").value() != "") {			
			var temp = $.grep($("#" + cbObject.fieldID).data("kendoComboBox").dataSource.data(), function(element, index) {
				return element[cbObject.dataValueField] == $("#" + cbObject.fieldID).data("kendoComboBox").value();
			});
			if(temp.length == 0) {
				alert("Selected Value is not valid.");				
				$("#" + cbObject.fieldID).data("kendoComboBox").focus();
				$("#" + cbObject.fieldID).data("kendoComboBox").value("");
				$(".display_description[data-for='" + cbObject.fieldID + "']").text("");
			}
		}
		if(cbObject.events != undefined && cbObject.events.blur != undefined) {
			eval(cbObject.events.blur + "(e)");
		}
	});
	
	/* DROP DOWN LIST EVENT DECLARATION - CHANGE */
	$("#" + cbObject.fieldID).data("kendoComboBox").bind("change", function(e) {
		if ($("#" + cbObject.fieldID).data("kendoComboBox").dataItem() != undefined) {
			$(".display_description[data-for='" + cbObject.fieldID + "']").text($("#" + cbObject.fieldID).data("kendoComboBox").dataItem()[cbObject.dataTextField]);
		}
		else {
			$(".display_description[data-for='" + cbObject.fieldID + "']").text("");
		}
		
		if(cbObject.events != undefined && cbObject.events.change != undefined) {
			eval(cbObject.events.change + "(e)");
		}
		if (cbObject.screenID != undefined) {
			ruleEngine.executeRuleStatements({
				screenID : cbObject.screenID,
				objectID : "field",
				eventID : "change",
				fieldID : cbObject.fieldID
			});
		}
	});
	
	/* USED WHEN CASCADING IS USED */
	if (cbObject.cascading != undefined && cbObject.cascading != false) {
		$("#" + cbObject.fieldID).data("kendoComboBox").trigger("open");
		$("#" + cbObject.fieldID).data("kendoComboBox").trigger("close");
	}
	
	return $("#" + cbObject.fieldID).data("kendoComboBox");
}

function InitializeKendoWindow(windowObject) {
	function onRefresh() {
		try {
			kendoWindowField.data("kendoWindow").center();
			eval("fn_" + windowObject.screenID + "()"); //calling fn_screenname()
			$("#" + windowObject.fieldID + "_openkendowindow").parent().show();
		}
		catch(e) {		
			console.log("/***  " + e.toString() + " STACK TRACE: " + e.stack + "  ***/");
			alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
			kendoWindowField.data("kendoWindow").close();
			$(".k-overlay").hide();
		}
	}
	
	var windowHeightValue = false, windowWidthValue = false, windowContentValue = false, kendoWindowField;	
	if (windowObject.windowHeight != undefined && windowObject.windowHeight != false) {
		windowHeightValue = windowObject.windowHeight + "px";
	}
	if (windowObject.windowWidth != undefined && windowObject.windowWidth != false) {
		windowWidthValue = windowObject.windowWidth + "px";
	}
	if (windowObject.windowContent == undefined || windowObject.windowContent == false) {
		windowContentValue = "./" + windowObject.screenID + ".html";
	}
	
	$("#" + windowObject.fieldID).append("<div id = '" + windowObject.fieldID + "_openkendowindow'></div>");
	kendoWindowField = $("#" + windowObject.fieldID + "_openkendowindow");
	kendoWindowField.kendoWindow({
		position: {
			top: "50%",
			left: "50%"
		},
		title: windowObject.windowTitle,
		height: windowHeightValue,
		width: windowWidthValue,
		draggable:  false,
		scrollable: false,				
		modal: true,
		resizable: false,
		refresh: onRefresh,
		content: windowContentValue,
		deactivate: function() {
			this.destroy();                                           
		},				
	});
	$("#" + windowObject.fieldID + "_openkendowindow").parent().hide();
	
	if (windowObject.windowContent != undefined && windowObject.windowContent != false) {
		kendoWindowField.data("kendoWindow").content(windowObject.windowContent);
		kendoWindowField.data("kendoWindow").trigger("refresh");
	}
	eval(windowObject.fieldID + '= kendoWindowField.data("kendoWindow")');
	return kendoWindowField.data("kendoWindow");
}

function InitializeKendoMultiSelect(msObject) {
	/* VARIABLE DECLARATIONS */
	var initialDataSource = [], finalDataSource = [], autoBindValue = false, placeholderValue = false, defaultArray = [], defaultValueObject = {};
	var templateValue = "${data." + msObject.dataValueField + "}" + " - " + "${data." + msObject.dataTextField + "}";
	eval ("var " + msObject.fieldID + "_display_default_value = false");
	
	/* CREATING KENDO DATA SOURCE MODEL */
	eval ("var dataSourceModel = kendo.data.Model.define({fields: {" + msObject.dataTextField + ": {editable: true},	" + msObject.dataValueField + ": {editable: true}}})");
	
	/* FUNCTION DECLARATION - GET TRANSPORT DATA SOURCE */
	function GetTransportDataSource () {
		return new kendo.data.DataSource ({
			transport: {
				read: {
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					url: GetTransportUrl (msObject.dataSource.applicationName, msObject.dataSource.serviceName, "context/outputparam"),
					complete: function (data, textstatus) {
						/* SPACE FOR PROCESSING AFTER TRANSPORT IS COMPLETED */						
					}
				},
				parameterMap: function (options, operation) {
					if (msObject.dataSource.inputParameter != undefined) {
						return GetTransportParameter ({inputparam: msObject.dataSource.inputParameter});
					}
					else {
						return GetTransportParameter ();
					}
				}
			},
			schema: {
				model: dataSourceModel
			}
		});
	}
	
	if (msObject.defaultValue != undefined && msObject.defaultValue != "" && ((msObject.defaultValue != "ALL" && msObject.filterMode == true) || (msObject.filterMode != true))) {
		/* FORMING INITIAL DATA SOURCE WHEN THERE IS A DEFAULT VALUE */
		defaultArray = msObject.defaultValue.split(",");
		for (var i = 0; i < defaultArray.length; i++) {
			eval ("defaultValueObject = {" + msObject.dataValueField + ":'" + defaultArray[i] + "'," + msObject.dataTextField + ":'" + defaultArray[i] + "'}");
			initialDataSource.push(defaultValueObject);
		}
		autoBindValue = true;
		eval (msObject.fieldID + "_display_default_value = true");
		
		/* DISPLAYING DESCRIPTION */
		if (msObject.defaultValueDescription != undefined && msObject.defaultValueDescription != "") {
			var defaultDescriptionText = "";
			for (var defaultValueCount = 0; defaultValueCount < defaultArray.length; defaultValueCount ++) {
				if (defaultValueCount == defaultArray.length - 1) {
					if (msObject.defaultValueDescription.parentCodeValue != undefined) {
						defaultDescriptionText += GetCodeDescriptionValue(msObject.defaultValueDescription.codeType, defaultArray[defaultValueCount], msObject.defaultValueDescription.parentCodeValue);
					}
					else {
						defaultDescriptionText += GetCodeDescriptionValue(msObject.defaultValueDescription.codeType, defaultArray[defaultValueCount], "");
					}
				}
				else {
					if (msObject.defaultValueDescription.parentCodeValue != undefined) {
						defaultDescriptionText += GetCodeDescriptionValue(msObject.defaultValueDescription.codeType, defaultArray[defaultValueCount], msObject.defaultValueDescription.parentCodeValue) + ", ";
					}
					else {
						defaultDescriptionText += GetCodeDescriptionValue(msObject.defaultValueDescription.codeType, defaultArray[defaultValueCount], "") + ", ";
					}
				}			
			}
			$(".display_description[data-for='" + msObject.fieldID + "']").text(defaultDescriptionText);
		}
		else {
			$(".display_description[data-for='" + msObject.fieldID + "']").text("");
		}
		
		/* FORMING FINAL DATA SOURCE WHEN THERE IS A DEFAULT VALUE */
		finalDataSource = msObject.dataSource;
		if (msObject.dataSource.applicationName != undefined) {
			finalDataSource = GetTransportDataSource ();
		}
	}
	else {
		/* FORMING INITIAL DATA SOURCE WHEN THERE IS NOT A DEFAULT VALUE */
		initialDataSource = msObject.dataSource;
		if (msObject.dataSource.applicationName != undefined) {
			initialDataSource = GetTransportDataSource ();
		}
		
		/* FORMING PLACE HOLDER VALUE */
		if (msObject.filterMode == true) {
			placeholderValue = "ALL";
		}
		else {
			placeholderValue = "---Select---";
		}
	}	
	
	/* FORMING TEMPLATE VALUE */
	if (msObject.template == "code") {
		templateValue = "${data." + msObject.dataValueField + "}" ;
	}
	else if (msObject.template == "description") {
		templateValue = "${data." + msObject.dataTextField + "}" ;
	}
	
	/* INITIALIZING MULTI SELECT */
	$("#" + msObject.fieldID).kendoMultiSelect ({
		dataSource: initialDataSource,
		autoBind: autoBindValue,
		dataTextField: msObject.dataValueField,
		dataValueField: msObject.dataValueField,		
		placeholder: placeholderValue,		
		itemTemplate: templateValue,
	});
	
	/* PRE FIXING THE DEFAULT VALUE */
	if (msObject.defaultValue != undefined && msObject.defaultValue != "" && ((msObject.defaultValue != "ALL" && msObject.filterMode == true) || (msObject.filterMode != true))) {
		$("#" + msObject.fieldID).data("kendoMultiSelect").value(msObject.defaultValue.split(","));
	}
	
	/* MULTI SELECT EVENT DECLARATION - OPEN */
	$("#" + msObject.fieldID).data("kendoMultiSelect").bind ("open", function (e) {
		if (eval(msObject.fieldID + "_display_default_value") == true) {
			/* FORMING PLACE HOLDER VALUE */
			if (msObject.filterMode == true) {
				placeholderValue = "ALL";
			}
			else {
				placeholderValue = "---Select---";
			}
			$("#" + msObject.fieldID).data("kendoMultiSelect").options.placeholder = placeholderValue;
			
			$("#" + msObject.fieldID).data("kendoMultiSelect").setDataSource(finalDataSource);
			eval (msObject.fieldID + "_display_default_value = false");
		}
		
		/* SETTING THE LIST WIDTH TO MATCH THE CONTENT */
		$(".k-list-container").css("width", "auto");
		//$(".k-list-container").css("white-space", "nowrap");
		$(".k-list-container").css("min-width", $("#" + msObject.fieldID).parent().width() - 5);
		$(".k-list-container").css("max-width", 600);
		$(".k-list-container").css("overflow-x", "hidden");
		$(".k-list-container").css("overflow-y", "auto");
		$(".k-list").css("width", "auto");
		//$(".k-list").css("overflow-x", "hidden");
		
		if (msObject.events != undefined && msObject.events.open != undefined) {
			eval(msObject.events.open + "(e)");
		}
	});

	/* MULTI SELECT EVENT DECLARATION - DATABOUND */
	$("#" + msObject.fieldID).data("kendoMultiSelect").bind ("dataBound", function (e) {	
		if (msObject.defaultValue != undefined && msObject.defaultValue != "" && ((msObject.defaultValue != "ALL" && msObject.filterMode == true) || (msObject.filterMode != true))) {
			$("#" + msObject.fieldID).data("kendoMultiSelect").value(msObject.defaultValue.split(","));
		}
		if (msObject.events != undefined && msObject.events.dataBound != undefined) {
			eval(msObject.events.dataBound + "(e)");
		}
	});
	
	/* MULTI SELECT EVENT DECLARATION - CLOSE */
	$("#" + msObject.fieldID).data("kendoMultiSelect").bind("close", function(e) {	
		if(msObject.events != undefined && msObject.events.close != undefined) {
			eval(msObject.events.close + "(e)");
		}
	});
	
	/* MULTI SELECT EVENT DECLARATION - BLUR */
	$("#" + msObject.fieldID).on("blur", function(e) {
		if(msObject.events != undefined && msObject.events.blur != undefined) {
			eval(msObject.events.blur + "(e)");
		}
	});
	
	/* MULTI SELECT EVENT DECLARATION - CHANGE */
	$("#" + msObject.fieldID).data("kendoMultiSelect").bind("change", function(e) {
		if ($("#" + msObject.fieldID).data("kendoMultiSelect").dataItems().length != 0) {
			var descriptionText = "";
			for (var dataItemsCount = 0; dataItemsCount < $("#" + msObject.fieldID).data("kendoMultiSelect").dataItems().length; dataItemsCount ++) {
				if (dataItemsCount == $("#" + msObject.fieldID).data("kendoMultiSelect").dataItems().length - 1) {
					descriptionText += $("#" + msObject.fieldID).data("kendoMultiSelect").dataItems()[dataItemsCount][msObject.dataTextField];
				}
				else {
					descriptionText += $("#" + msObject.fieldID).data("kendoMultiSelect").dataItems()[dataItemsCount][msObject.dataTextField] + ", ";
				}
			}			
			$(".display_description[data-for='" + msObject.fieldID + "']").text(descriptionText);
		}
		else {
			$(".display_description[data-for='" + msObject.fieldID + "']").text("");
		}
		
		if(msObject.events != undefined && msObject.events.change != undefined) {
			eval(msObject.events.change + "(e)");
		}
	});
	
	return $("#" + msObject.fieldID).data("kendoMultiSelect");
}

function InitializeKendoDatePicker(dpObject) {
	var formatValue = "dd-MM-yyyy",
	minimumValue = new Date(1900, 0, 1),
	maximumValue = new Date(2099, 11, 31);
	if (dpObject.format != undefined) {
		formatValue = dpObject.format;
	}
	if (dpObject.minimum != undefined) {
		minimumValue = dpObject.minimum;
	}
	if (dpObject.maximum != undefined) {
		maximumValue = new Date(dpObject.maximum.getFullYear(), dpObject.maximum.getMonth(), dpObject.maximum.getDate(), dpObject.maximum.getHours(), dpObject.maximum.getMinutes() + 2);
	}

	$("#" + dpObject.fieldID).kendoDatePicker({
		format : formatValue,
		min : minimumValue,
		max : maximumValue
	});
	return $("#" + dpObject.fieldID).data("kendoDatePicker");
}

function InitializeKendoDateTimePicker(dtpObject) {
	var formatValue = "dd-MM-yyyy HH:mm",
	minimumValue = new Date(1900, 0, 1),
	maximumValue = new Date(2099, 11, 31),
	intervalValue = 30;
	if (dtpObject.format != undefined) {
		formatValue = dtpObject.format;
	}
	if (dtpObject.minimum != undefined) {
		minimumValue = dtpObject.minimum;
	}
	if (dtpObject.maximum != undefined) {
		maximumValue = new Date(dtpObject.maximum.getFullYear(), dtpObject.maximum.getMonth(), dtpObject.maximum.getDate(), dtpObject.maximum.getHours(), dtpObject.maximum.getMinutes() + 2);
	}
	if (dtpObject.interval != undefined) {
		intervalValue = dtpObject.interval;
	}

	$("#" + dtpObject.fieldID).kendoDateTimePicker({
		format : formatValue,
		min : minimumValue,
		max : maximumValue,
		interval : intervalValue
	});
	return $("#" + dtpObject.fieldID).data("kendoDateTimePicker");
}

function InitializeKendoNumericTextBox(ntbObject) {
	var formatValue = "n",
	minimumValue = null,
	maximumValue = null,
	stepValue = 1;

	if (ntbObject.format != undefined) {
		formatValue = ntbObject.format;
	}
	if (ntbObject.minimum != undefined) {
		minimumValue = ntbObject.minimum;
	}
	if (ntbObject.maximum != undefined) {
		maximumValue = ntbObject.maximum;
	}
	if (ntbObject.step != undefined) {
		stepValue = ntbObject.step;
	}

	$("#" + ntbObject.fieldID).kendoNumericTextBox({
		format : formatValue,
		max : maximumValue,
		min : minimumValue,
		step : stepValue
	});
	$("#" + ntbObject.fieldID).data("kendoNumericTextBox").bind("change", function(e) {
		if(ntbObject.events != undefined && ntbObject.events.change != undefined) {
			eval(ntbObject.events.change + "(e)");
		}
	});
	
	$("#" + ntbObject.fieldID).data("kendoNumericTextBox").bind("spin", function(e) {
		if(ntbObject.events != undefined && ntbObject.events.spin != undefined) {
			eval(ntbObject.events.spin + "(e)");
		}
	});
	return $("#" + ntbObject.fieldID).data("kendoNumericTextBox");
}
function InitializePhonegapDatePicker(dpObject)
{
	$("#" + dpObject.fieldID).attr("type","date")
	$("#" + dpObject.fieldID).on("click",function() {
		var sltdt = new Date();
		if($("#" + dpObject.fieldID).val() != "") {
			sltdt = kendo.parseDate($("#" + dpObject.fieldID).val(),dpObject.format);
		}
		var options = {
			date: sltdt,
			mode: "date",
			minDate: kendo.parseDate(dpObject.minimum,dpObject.format),
			maxDate: kendo.parseDate(dpObject.maximum,dpObject.format)
		};
		datePicker.show(options, function(date){
			if(date.toString() != "Invalid Date") {
				$("#" + dpObject.fieldID).val(kendo.toString(date,dpObject.format));
			}
		});
	});
}
function InitializePhonegapTimePicker(tpObject)
{
	$("#" + tpObject.fieldID).attr("type","time")
	$("#" + tpObject.fieldID).on("click",function() {
		var sltdt = new Date();
		if($("#" + tpObject.fieldID).val() != "") {
			sltdt = kendo.parseDate($("#" + tpObject.fieldID).val(),tpObject.format);
		}
		var options = {
			date: sltdt,
			mode: "time",
			minDate: kendo.parseDate(tpObject.minimum,tpObject.format),
			maxDate: kendo.parseDate(tpObject.maximum,tpObject.format)
		};
		datePicker.show(options, function(time){
			if(time.toString() != "Invalid Date") {
				$("#" + tpObject.fieldID).val(kendo.toString(time,tpObject.format));
			}
		});
	});
}
function InitializeDataSource(xmlDataString,dataSourcePageSize,xmlNodeToSkip)
{
	if(xmlDataString.childNodes[0].hasChildNodes())
	{
		var splitData = xmlNodeToSkip.split('/');
		var totalXmlNodes = 0;
		var fieldDetails = "{";
		if(splitData.length == 1)
		{
			totalXmlNodes = xmlDataString.childNodes[0].childNodes.length;
			for (var i = 0; i < totalXmlNodes; i++)
			{
				fieldDetails += xmlDataString.childNodes[0].childNodes[i].nodeName + ':"' + xmlDataString.childNodes[0].childNodes[i].nodeName + '/text()",';
			}
		}
		else if(splitData.length == 2)
		{
			totalXmlNodes = xmlDataString.childNodes[0].childNodes[0].childNodes.length;
			for (var i = 0; i < totalXmlNodes; i++)
			{
				fieldDetails += xmlDataString.childNodes[0].childNodes[0].childNodes[i].nodeName + ':"' + xmlDataString.childNodes[0].childNodes[0].childNodes[i].nodeName + '/text()",';
			}
		}
		fieldDetails += "}";
		eval("var fieldObject = " + fieldDetails);
		var createdDataSource = new kendo.data.DataSource(
		{
			data : xmlDataString,
			pageSize : dataSourcePageSize,
			schema : 
			{
				type : "xml",
				data : xmlNodeToSkip,
				model : 
				{
					fields : fieldObject						
				},
			},
		});
		createdDataSource.read();
	}
	else
	{
		var temp_array = new kendo.data.ObservableArray([]);
		var createdDataSource =  new kendo.data.DataSource({data : temp_array,pageSize : 10});
	}		
	return createdDataSource;
}
var webWidgetInitializer = {
	initializeWTabstrip : function (initObject) {
		var activeTab;
		$("#" + initObject.fieldID).kendoTabStrip({
			dataSource: initObject.dataSource,
			dataTextField: "text",
			dataContentField: "content"
		});		
		activeTab = $.grep(initObject.dataSource, function(element, index) {
			$("#" + initObject.fieldID + " li:eq(" + index + ")").attr("id", element.id);
			return element.activeIndicator == "true";
		});		
		$("#" + initObject.fieldID).data("kendoTabStrip").activateTab($("#" + activeTab[activeTab.length - 1].id));		
		return $("#" + initObject.fieldID).data("kendoTabStrip");
	}
};
$.fn.extend({
	initializeWTabstrip: function(initObject) {
		var fieldID, screenIdNode, tabstripNode, tabNodes, tabstripDatasource;		
		fieldID = $(this).attr("id");				
		screenIdNode = xmlDocUI.getElementsByTagName(initObject.screenID);
		if (screenIdNode.length != 0) {
			tabstripNode = screenIdNode[0].getElementsByTagName(fieldID);
			if (tabstripNode.length != 0) {
				tabNodes = tabstripNode[0].getElementsByTagName("tab");
				tabstripDatasource = [];
				for (tabCounter = 0; tabCounter < tabNodes.length; tabCounter++) {
					tabstripDatasource.push({
						text : tabNodes[tabCounter].getAttribute("name"),
						activeIndicator : tabNodes[tabCounter].getAttribute("active"),
						content : "<div id = '" + tabNodes[tabCounter].getAttribute("id") + "'></div>",
						id : fieldID + "_tab_" + (tabCounter + 1)
					});
				}
				return webWidgetInitializer.initializeWTabstrip({
					screenID : initObject.screenID,
					fieldID : fieldID,
					dataSource : tabstripDatasource
				});
			}
		}
	}
});