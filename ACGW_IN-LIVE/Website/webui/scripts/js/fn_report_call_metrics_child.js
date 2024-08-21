function fn_report_call_metrics_child()
{
	
	if(screen_id_for_retrieve != "")
	{
		
		var xml_value = p_inputparam_xml;
		var header_filtered_value=[];
		var filters_xml = loadXMLString(xml_value);
		
		var length = filters_xml.childNodes[0].childNodes.length;
		for(var i =0;i<length ;i++)
		{
			filters_xml.childNodes[0].childNodes[i].nodeName;
			if(filters_xml.childNodes[0].childNodes[i].hasChildNodes() == true)
			{
				var value =  filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue;
				eval("report_call_metrics_child_"+filters_xml.childNodes[0].childNodes[i].nodeName+"_value = "+ "'"+value +"'");
			}
			else
			{
				var node_value = "ALL";
				eval("report_call_metrics_child_"+filters_xml.childNodes[0].childNodes[i].nodeName+"_value = "+ "'"+node_value +"'");
			}
		}
	}
	else
	{
		var xml = GetInputParamXML("report_call_metrics_header_1");	
		var filters_xml = loadXMLString(xml);
		console.log("aaa");
		var length = filters_xml.childNodes[0].childNodes.length;
		for(var i =0;i<length ;i++)
		{
				var value =  filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue.split(",");
				eval("report_call_metrics_child_"+filters_xml.childNodes[0].childNodes[i].nodeName+"_value = "+ "'"+value +"'");
		}
	}
	
	AddCustomFilterForReport("report_call_metrics_child");
	ApplyConfiguredLabelsForReport("report_call_metrics_child");
	$('#report_call_metrics_child_set').on("click",function()
	{
		screen_id_for_retrieve  = 'report_call_metrics_child_header_1';
		var xml = GetInputParamXML(screen_id_for_retrieve);	
		 header_filtered_value=[];
		
		var filters_xml = loadXMLString(xml);
		var length = filters_xml.childNodes[0].childNodes.length;
		for(var i =0;i<length ;i++)
		{
			if(filters_xml.childNodes[0].childNodes[i].hasChildNodes() == true)
			{
				var xmlnodeValue = filters_xml.childNodes[0].childNodes[i].childNodes[0].nodeValue;
			}
			else
			{
				var xmlnodeValue = "ALL";
			}
			header_filtered_value.push({
				nodeName :filters_xml.childNodes[0].childNodes[i].nodeName,
				value :xmlnodeValue
			});
		}
		for(var i=0;i<header_filtered_value.length;i++)
		{
			var value = header_filtered_value[i].value.split(",");
			if(value.length == 1)
			{
				 Nodevalue = value[0];
				 eval("report_call_metrics_"+header_filtered_value[i].nodeName+".value("+"'"+Nodevalue+"'"+")");
			}
			else
			{
				 Nodevalue = value;
				 eval("report_call_metrics_"+header_filtered_value[i].nodeName+".value(Nodevalue)");				
			}
			if(header_filtered_value[i].value != "ALL")
			{
				eval("report_call_metrics_"+header_filtered_value[i].nodeName+'.enable(false)');
			}
			else
			{
				eval("report_call_metrics_"+header_filtered_value[i].nodeName+'.enable(true)');
			}
		}
		retrieveData(xml);
		child_window.close();
	});
	$('#report_call_metrics_child_reset').on("click",function()
	{
		var header_filtered_value=[];
		var input_xml = GetInputParamXML("report_call_metrics_child_header_1");
		var filters_xml = loadXMLString(input_xml);
		var length = filters_xml.childNodes[0].childNodes.length;
		for(var i =0;i<length ;i++)
		{
			header_filtered_value.push({
				nodeName :filters_xml.childNodes[0].childNodes[i].nodeName,
			});
		}
		for(var i=0;i<header_filtered_value.length;i++)
		{
			eval("report_call_metrics_child_"+header_filtered_value[i].nodeName+'.value("ALL")');
			//eval("report_call_metrics_"+header_filtered_value[i].nodeName+'.value("ALL")');
			//eval("report_call_metrics_"+header_filtered_value[i].nodeName+'.enable(true)');
		}
	});

	$('#report_call_metrics_child_cancel').on("click",function()
	{
		child_window.close();
	});

}


