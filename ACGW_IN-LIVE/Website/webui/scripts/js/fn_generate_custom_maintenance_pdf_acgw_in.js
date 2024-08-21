function fn_generate_custom_maintenance_pdf_generate_draft() {
	manage_custom_maintenance.variable.custom.workflowDatasource = mserviceUtilities.getTransportDataSource({
            applicationName: "common_modules",
            serviceName: "retrieve_txn_event_log",
            outputPath: "context/outputparam_detail",
            pageSize: 10,
            inputParameter: {
                p_txn_type_code: "webWidgetInitializer.variable.customMainParam.replace('manage_custom_maintenance_','')",
                p_txn_ref_no: "$manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no"
            },
            processResponse: true
        });
    manage_custom_maintenance.variable.custom.workflowDatasource.read();
    var content = "<!DOCTYPE html>";
    content += "<html>";
    content += "<head>";
    content += "<style>table { page-break-inside:auto; page-break-after:auto; width: 100%; table-layout: fixed; line-height: 2em;} tr { page-break-inside:avoid; page-break-after:auto; } thead { display:table-header-group; } tfoot { display:table-footer-group; } th, td { padding: 4px; }</style>";
    content += "</head>";
    content += "<body>";
    content += "<div style='width:1000px; font-size: medium;'>";
    content += "<table border='1' width='100%' style='table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
	content += "<tr style='font-weight: bold;'>";
	content += "<td colspan='85' style='text-align: center; font-size: 30px; padding:20px;border-right: none;'>Entity Name : ACG Pam Pharma Technologies Pvt. Ltd.</td>";
	content += "<td colspan='15' style='border-left: none;'>Date : " + mserviceUtilities.getDateString(new Date(manage_custom_maintenance.variable.custom.selectedRecord.created_on_date), "dd/MM/yyyy") + "</td>";
	content += "</tr>";
	content += "<tr style='border-bottom: none;border-bottom-color: transparent;'>";
	content += "<td rowspan='5'colspan='16' style='font-weight: bold;  font-size: large; text-align: center; border-bottom: 1px solid;'>TRAVEL REIMBURSMENT</td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Bussiness Unit :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style=''><span>" + manage_custom_maintenance.variable.custom.selectedRecord.org_level_code + "</span></div></td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Department :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>AftermarketService</span></div></td>";
	content += "</tr>";
	content += "<tr style='border-bottom: none;border-bottom-color: transparent;'>";
	content += "<td  colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Customer Name :</td>";
	if(manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code3 != ""){
		content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style='font-size: small;'><span>" + manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code3 + " - " + mserviceUtilities.getDescriptionForCode('CUSTOMER', manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code3, '') + "</span></div></td>";
	} else {
		content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style='font-size: small;'><span></span></div></td>";
	};
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Place Visted :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>"+ mserviceUtilities.getDescriptionForCode('CUSTOMERLOCATION', manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code4, '')+"</span></div></td>";
	content += "</tr>";
	content += "<tr style='border-bottom: none;border-bottom-color: transparent;'>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none; font-size: 15px;'>Service Portal Ticket No :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style=''><span>" + manage_custom_maintenance.variable.custom.selectedRecord.call_ref_no + "</span></div></td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Reason for no ticket :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>" + mserviceUtilities.getDescriptionForCode('TADAREASON_LIST', manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code1, '') + "</span></div></td> ";
	content += "</tr>";
	content += "<tr style=''>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Cost Centre No :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style=''><span>" + manage_custom_maintenance.variable.custom.selectedRecord.udf_char_1 + "</span></div></td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Office Location :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>" +  manage_custom_maintenance.variable.custom.selectedRecord.udf_char_3 + "</span></div></td> ";
	content += "</tr>";
	content += "<tr style=''>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Service call ticket no :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style=''><span>" + manage_custom_maintenance.variable.custom.selectedRecord.additional_information + "</span></div></td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>No of days at site :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>" +parseInt(  manage_custom_maintenance.variable.custom.selectedRecord.udf_float_2)+ "</span></div></td> ";
	content += "</tr>";
	content += "<tr style= 'height: 60px;'>";
	content += "<td colspan='14' style='padding-left: 75px;border-right-color: transparent;'>Name :</td>"
	content += "<td colspan='20' style='border-right-color: transparent;'><div style='width: 130%; border-bottom: 1px solid black; border-right-color: transparent;'><span>" + (manage_custom_maintenance.variable.custom.selectedRecord.created_by_employee_name == "" ? "<br/>" : manage_custom_maintenance.variable.custom.selectedRecord.created_by_employee_name) + "</span></div></td>";
	content += "<td colspan='14' style='padding-left: 75px;border-right-color: transparent;border-left-color: transparent;'> Grade :</td>";
	content += "<td colspan='20' style='border-right-color: transparent;'><div style='border-bottom: 1px solid black; '><span>" + (manage_custom_maintenance.variable.custom.selectedRecord.udf_char_2 == "" ? "<br/>" : manage_custom_maintenance.variable.custom.selectedRecord.udf_char_2) + "</span></div></td>";
	content += "<td colspan='14' style='border-right-color: transparent;'>Associate Code :</td></td>";
	content += "<td colspan='18'><div style='border-bottom: 1px solid black; '><span>" + (manage_custom_maintenance.variable.custom.selectedRecord.udf_char_4 == "" ? "<br/>" : manage_custom_maintenance.variable.custom.selectedRecord.udf_char_4) + "</span></div></td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold;'>";
	content += "<td colspan='100' style='text-align: center; font-size: large;'>Summary Table</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td colspan='15'>Currency</td>";
	content += "<td colspan='15'>Amount</td>";
	content += "<td colspan='40'>Amount in Words</td>";
	content += "<td colspan='10'>Advance</td>";
	content += "<td colspan='10'>Due to Company</td>";
	content += "<td colspan='10'>Payable to Associate</td>";
	content += "</tr>";
	var totalSum = 0;
	var sum;
    for (var index = 0; index < generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData.length; index++) {
        totalSum += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4);
    };
	content += "<tr>";
	content += "<td colspan='15'>INR - Indian Rupees</td>";
	content += "<td colspan='15' style='text-align: right;'>" + totalSum.toFixed(2) + "</td>";
	content += "<td colspan='40'>" + generate_custom_maintenance_pdf.customRequirementHandler.rupeestoWords(totalSum.toFixed(2)) + "</td>";
	content += "<td colspan='10' style='text-align: right;'>" + manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1 + "</td>";
		if((totalSum - manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1)<0)
		{
			sum=(totalSum - manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1)* -1;
			content += "<td colspan='10' style='text-align: right;'> "+ sum.toFixed(2)  +"</td>";
		}
		else{
			content += "<td colspan='10' style='text-align: right;'>0.00</td>";
		}
		if((totalSum - manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1) >0){
			content += "<td colspan='10' style='text-align: right;'>" + (totalSum - manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1).toFixed(2)+ "</td>";
		}
		else{
			content += "<td colspan='10' style='text-align: right;'>0.00</td>";
		}
	content += "</tr>";
	content += "<tr style='font-weight: bold;'>";
	content += "<td colspan='100' style='text-align: center; font-size: large;'>Account wise expense details</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td rowspan='2' colspan='50'>Account Head</td>";
	content += "<td colspan='50' style='text-align: center;'>Amount Details</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td colspan='25'>Currency</td>";
	content += "<td colspan='25'>Amount Claimed</td>";
	content += "</tr>";
	var originalArrayString = JSON.stringify(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData);
	var originalArray = JSON.parse(originalArrayString);
	var consolidatedArray = []; 
	for (var index=0; index < originalArray.length; index++) { 
		var tempArray = $.grep(consolidatedArray, function (data) {
			return data.action_type == originalArray[index].action_type;
		});
		if (tempArray.length == 0){
			consolidatedArray.push(originalArray[index]);
		} else {
			tempArray[0].udf_float_4 = (parseFloat(tempArray[0].udf_float_4) + parseFloat(originalArray[index].udf_float_4)).toFixed(2); 
		};
	};
	for (var index = 0; index < consolidatedArray.length; index++) {
        content += "<tr>";
		content += "<td colspan='50'>" + mserviceUtilities.getDescriptionForCode('TADAACTIONTYPE_LIST', consolidatedArray[index].action_type, '') + "</td>";
		content += "<td colspan='25'>INR - Indian Rupees</td>";
		content += "<td colspan='25' style='text-align: right;'>" + consolidatedArray[index].udf_float_4 + "</td>";
		content += "</tr>";
    };
	content += "<tr>";
	content += "<td colspan='50' style='font-weight: bold; text-align: right;'></td>";
	content += "<td colspan='25'>Total</td>";
	content += "<td colspan='25' style='text-align: right;'>" + totalSum.toFixed(2) + "</td>";
	content += "</tr>";
	content += "<tr>";
	content += "<td colspan='100' style='font-size: large;'>I hereby declare that expenses claimed in the voucher are for official purposes only</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; height: 150px;'>";
	content += "<td colspan='30'></td>";
	content += "<td colspan='30'></td>";
	content += "<td rowspan='2' colspan='40' style='font-size: small; text-align: justify;'>Please Note - Following supporting documents to be enclosed for Domestic &amp; Export ";
	content += "</br> 1. Budget copy including extension approval if applicable";
	content += "</br> 2. Signed forex advice, ";
	content += "</br> 3. Bills and Credit card statement if any (Dom / Exp)";
	content += "</br> 4. Ticket/Boarding pass copy (Dom &amp; Exp)";
	content += "</br> 5. Minutes of meeting (Dom &amp; Exp)";
	content += "</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center; height: '>";
	content += "<td colspan='30'>PREPARED BY</td>";
	content += "<td colspan='30'>AUTHORIZED BY</td>";
	content += "</tr>";
    content += "</table>";
	content += "<table border='1' width='100%' style='margin-top: 10px; table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse; page-break-before:always'>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td rowspan='2' colspan='20'>FROM DATE </br> (DD/MM/YYYY)</td>";
	content += "<td rowspan='2' colspan='20'>TO DATE </br> (DD/MM/YYYY)</td>";
	content += "<td rowspan='2' colspan='25'>ACCOUNT HEAD</td>";
	content += "<td rowspan='2' colspan='25'>Cost Centre </br><span style='font-weight: normal; font-size: small;'>provide details if it is different against every cash memo</span></td>";
	content += "<td rowspan='2' colspan='20'>Cash</br>Memo No</td>";
	content += "<td rowspan='2' colspan='50'>PARTICULARS </br><span style='font-weight: normal; font-size: small;'>in case of stay - please mention location of stay</span></br><span style='font-weight: normal; font-size: small;'>in case of travel - please mention mode of</span></br><span style='font-weight: normal; font-size: small;'>transport and from and to location</span></td>";
	content += "<td colspan='40' style='text-align: center;'>Basic Amount</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td colspan='20'>Currency</td>";
	content += "<td colspan='20'>Amount</td>";
	content += "</tr>";
	for (var index = 0; index < generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData.length; index++) {
        content += "<tr>";
		if(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type == "TA"){
			content += "<td colspan='25'>" + mserviceUtilities.getDateString(new Date(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_date_1),'dd/MM/yyyy') + "</td>";
		} else {
			content += "<td colspan='20'>" + mserviceUtilities.getDateString(new Date(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_date_5),'dd/MM/yyyy') + "</td>";
			if(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_date_6 == "1900-01-01"){
				content += "<td colspan='20'></td>";
			} else {
				content += "<td colspan='20'>" + mserviceUtilities.getDateString(new Date(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_date_6),'dd/MM/yyyy') + "</td>";
			}
		}
		content += "<td colspan='25'>" + mserviceUtilities.getDescriptionForCode('TADAACTIONTYPE_LIST', generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type, '') + "</td>";
		content += "<td colspan='25'></td>";
		content += "<td colspan='20'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_analysis_code3 + "</td>";
		if((generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type == "LA") || (generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type == "TA")){
			if(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].additional_information != ""){
				content += "<td colspan='50'>Start Place : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_char_1 + ", " + "Visited Place : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_char_2 +  ", " + "Remarks : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].additional_information + "</td>";
			} else {
				content += "<td colspan='50'>Start Place : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_char_1 + ", " + "Visited Place : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_char_2 + "</td>";
			}
		} else {
			content += "<td colspan='50'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].additional_information + "</td>";
		}
		content += "<td colspan='20'>INR-Indian Rupees</td>";
		content += "<td colspan='20' style='text-align: right;'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4 + "</td>";
		content += "</tr>";
    };
	content += "<tr style='font-weight: bold; text-align: right;'>";
	content += "<td colspan='180'>Total</td>";
		var total=0;
		for (var index = 0; index < generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData.length; index++) {
			total += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4);
		}
	content += "<td colspan='20'>"+total.toFixed(2)+"</td>";
	content += "</tr>";
	content += "</table>";
	 content += "<table border='0' width='100%' style='margin-top: 10%; table-layout: fixed; width: 100%; word-wrap: break-word; font-size: large; border-collapse:collapse;'>";
    if (manage_custom_maintenance.variable.custom.workflowDatasource.data().length != 0) {
        content += '<tr>';
        content += '<td style = "font-weight:bold; vertical-align: middle; padding-top: 5px; padding-bottom: 5px;">Event Summary</td>';
        content += '</tr>';
    };
    for (var index = (manage_custom_maintenance.variable.custom.workflowDatasource.data().length - 1); index >= 0; index--) {
        content += '<tr>';
        content += '<td style = "vertical-align: middle; padding-top: 5px; padding-bottom: 5px;">' + ' Event : ' + ((manage_custom_maintenance.variable.custom.workflowDatasource.data()[index].to_status == "P" ? "Created" : manage_custom_maintenance.variable.custom.workflowDatasource.data()[index].to_status_desc)) + ' On ' + mserviceUtilities.getDateString(new Date(manage_custom_maintenance.variable.custom.workflowDatasource.data()[index].event_date), 'dd-MM-yyyy') + ' by ' + manage_custom_maintenance.variable.custom.workflowDatasource.data()[index].by_emp_name + '</td>';
        content += '</tr>';
    };
    content += "</table>";
    content += "</div>";
	generate_custom_maintenance_pdf.variable.custom.attachmentDatasource = mserviceUtilities.getTransportDataSource({
		applicationName : "common_modules",
		serviceName : "retrieve_attached_docs",
		outputPath : "context/outputparam_detail",
		inputParameter : {
			p_project_task_level_ind : "'A'",
			p_project_id : "$manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no",
			p_template_id : "''",
			p_task_id : "'0'",
		}
	});
	generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.read();
	if(generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data().length != 0){
		for(var index =0; index < generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data().length; index++){
			if(generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data()[index].doc_category.trim() == "I"){
				if(index == 0){
					content += "<table border='1' width='100%' style='margin-top: 10px; table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse; page-break-inside:avoid; page-break-before:always;'>";
				} else {
					content += "<table border='1' width='100%' style='margin-top: 10px; table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse; page-break-inside:avoid;'>";
				};
				content += "<tr><td style='font-size: x-large; font-weight: bolder; margin-top: 5%;'>Attachment " + (index + 1) + " : " + generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data()[index].doc_name + "</td></tr>";
				content += "<tr><td><embed src='" + mserviceUtilities.getWebserverpath() + "content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/ancillary_attachments/" + generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data()[index].txn_ref_no + "/" + generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data()[index].doc_name + "' style='width: 100%;'></embed></td></tr>";
				content += "</table>";
			};
		};
	};
    content += "</body>";
    content += "</html>";
    return content;
};

function fn_generate_custom_maintenance_pdf_generate_pdf() {
	manage_custom_maintenance.variable.custom.workflowDatasource = mserviceUtilities.getTransportDataSource({
            applicationName: "common_modules",
            serviceName: "retrieve_txn_event_log",
            outputPath: "context/outputparam_detail",
            pageSize: 10,
            inputParameter: {
                p_txn_type_code: "webWidgetInitializer.variable.customMainParam.replace('manage_custom_maintenance_','')",
                p_txn_ref_no: "$manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no"
            },
            processResponse: true
        });
    manage_custom_maintenance.variable.custom.workflowDatasource.read();
    var content = "<!DOCTYPE html>";
    content += "<html>";
    content += "<head>";
    content += "<style>table { page-break-inside:auto; page-break-after:auto; width: 100%; table-layout: fixed; line-height: 2em;} tr { page-break-inside:avoid; page-break-after:auto; } thead { display:table-header-group; } tfoot { display:table-footer-group; } th, td { padding: 4px; }</style>";
    content += "</head>";
    content += "<body>";
    content += "<div style='width:1000px; font-size: medium;'>";
    content += "<table border='1' width='100%' style='table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
	content += "<tr style='font-weight: bold;'>";
	content += "<td colspan='85' style='text-align: center; font-size: 30px; padding:20px;border-right: none;'>Entity Name : ACG Pam Pharma Technologies Pvt. Ltd.</td>";
	content += "<td colspan='15' style='border-left: none;'>Date : " + mserviceUtilities.getDateString(new Date(manage_custom_maintenance.variable.custom.selectedRecord.created_on_date), "dd/MM/yyyy") + "</td>";
	content += "</tr>";
	content += "<tr style='border-bottom: none;border-bottom-color: transparent;'>";
	content += "<td rowspan='5'colspan='16' style='font-weight: bold;  font-size: large; text-align: center; border-bottom: 1px solid;'>TRAVEL REIMBURSMENT</td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Bussiness Unit :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style=''><span>" + manage_custom_maintenance.variable.custom.selectedRecord.org_level_code + "</span></div></td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Department :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>AftermarketService</span></div></td>";
	content += "</tr>";
	content += "<tr style='border-bottom: none;border-bottom-color: transparent;'>";
	content += "<td  colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Customer Name :</td>";
	if(manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code3 != ""){
		content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style='font-size: small;'><span>" + manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code3 + " - " + mserviceUtilities.getDescriptionForCode('CUSTOMER', manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code3, '') + "</span></div></td>";
	} else {
		content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style='font-size: small;'><span></span></div></td>";
	};
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Place Visted :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>"+ mserviceUtilities.getDescriptionForCode('CUSTOMERLOCATION', manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code4, '')+"</span></div></td>";
	content += "</tr>";
	content += "<tr style='border-bottom: none;border-bottom-color: transparent;'>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none; font-size: 15px;'>Service Portal Ticket No :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style=''><span>" + manage_custom_maintenance.variable.custom.selectedRecord.call_ref_no + "</span></div></td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Reason for no ticket :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>" + mserviceUtilities.getDescriptionForCode('TADAREASON_LIST', manage_custom_maintenance.variable.custom.selectedRecord.udf_analysis_code1, '') + "</span></div></td> ";
	content += "</tr>";
	content += "<tr style=''>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Cost Centre No :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style=''><span>" + manage_custom_maintenance.variable.custom.selectedRecord.udf_char_1 + "</span></div></td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Office Location :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>" +  manage_custom_maintenance.variable.custom.selectedRecord.udf_char_3 + "</span></div></td> ";
	content += "</tr>";
	content += "<tr style=''>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>Service call ticket no :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-right:none;border-left: none;'><div style=''><span>" + manage_custom_maintenance.variable.custom.selectedRecord.additional_information + "</span></div></td>";
	content += "<td colspan='18' style='font-weight: bold;border-right:none;border-left: none;'>No of days at site :</td>";
	content += "<td colspan='24' style='border-bottom: 1px solid black;border-left: none;padding-right:10px;'><div style=''><span>" +parseInt(  manage_custom_maintenance.variable.custom.selectedRecord.udf_float_2 )+ "</span></div></td> ";
	content += "</tr>";
	content += "<tr style= 'height: 60px;'>";
	content += "<td colspan='14' style='padding-left: 75px;border-right-color: transparent;'>Name :</td>"
	content += "<td colspan='20' style='border-right-color: transparent;'><div style='width: 130%; border-bottom: 1px solid black; border-right-color: transparent;'><span>" + (manage_custom_maintenance.variable.custom.selectedRecord.created_by_employee_name == "" ? "<br/>" : manage_custom_maintenance.variable.custom.selectedRecord.created_by_employee_name) + "</span></div></td>";
	content += "<td colspan='14' style='padding-left: 75px;border-right-color: transparent;border-left-color: transparent;'> Grade :</td>";
	content += "<td colspan='20' style='border-right-color: transparent;'><div style='border-bottom: 1px solid black; '><span>" + (manage_custom_maintenance.variable.custom.selectedRecord.udf_char_2 == "" ? "<br/>" : manage_custom_maintenance.variable.custom.selectedRecord.udf_char_2) + "</span></div></td>";
	content += "<td colspan='14' style='border-right-color: transparent;'>Associate Code :</td></td>";
	content += "<td colspan='18'><div style='border-bottom: 1px solid black; '><span>" + (manage_custom_maintenance.variable.custom.selectedRecord.udf_char_4 == "" ? "<br/>" : manage_custom_maintenance.variable.custom.selectedRecord.udf_char_4) + "</span></div></td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold;'>";
	content += "<td colspan='100' style='text-align: center; font-size: large;'>Summary Table</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td colspan='15'>Currency</td>";
	content += "<td colspan='15'>Amount</td>";
	content += "<td colspan='40'>Amount in Words</td>";
	content += "<td colspan='10'>Advance</td>";
	content += "<td colspan='10'>Due to Company</td>";
	content += "<td colspan='10'>Payable to Associate</td>";
	content += "</tr>";
	var totalSum = 0;
	var sum;
    for (var index = 0; index < generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData.length; index++) {
        totalSum += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4);
    };
	content += "<tr>";
	content += "<td colspan='15'>INR - Indian Rupees</td>";
	content += "<td colspan='15' style='text-align: right;'>" + totalSum.toFixed(2) + "</td>";
	content += "<td colspan='40'>" + generate_custom_maintenance_pdf.customRequirementHandler.rupeestoWords(totalSum.toFixed(2)) + "</td>";
	content += "<td colspan='10' style='text-align: right;'>" + manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1 + "</td>";
		if((totalSum - manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1)<0)
		{
			sum=(totalSum - manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1)* -1;
			content += "<td colspan='10' style='text-align: right;'> "+ sum.toFixed(2)  +"</td>";
		}
		else{
			content += "<td colspan='10' style='text-align: right;'>0.00</td>";
		}
		if((totalSum - manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1) >0){
			content += "<td colspan='10' style='text-align: right;'>" + (totalSum - manage_custom_maintenance.variable.custom.selectedRecord.udf_float_1).toFixed(2)+ "</td>";
		}
		else{
			content += "<td colspan='10' style='text-align: right;'>0.00</td>";
		}
	content += "</tr>";
	content += "<tr style='font-weight: bold;'>";
	content += "<td colspan='100' style='text-align: center; font-size: large;'>Account wise expense details</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td rowspan='2' colspan='50'>Account Head</td>";
	content += "<td colspan='50' style='text-align: center;'>Amount Details</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td colspan='25'>Currency</td>";
	content += "<td colspan='25'>Amount Claimed</td>";
	content += "</tr>";
	var originalArrayString = JSON.stringify(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData);
	var originalArray = JSON.parse(originalArrayString);
	var consolidatedArray = []; 
	for (var index=0; index < originalArray.length; index++) { 
		var tempArray = $.grep(consolidatedArray, function (data) {
			return data.action_type == originalArray[index].action_type;
		});
		if (tempArray.length == 0){
			consolidatedArray.push(originalArray[index]);
		} else {
			tempArray[0].udf_float_4 = (parseFloat(tempArray[0].udf_float_4) + parseFloat(originalArray[index].udf_float_4)).toFixed(2); 
		};
	};
	for (var index = 0; index < consolidatedArray.length; index++) {
        content += "<tr>";
		content += "<td colspan='50'>" + mserviceUtilities.getDescriptionForCode('TADAACTIONTYPE_LIST', consolidatedArray[index].action_type, '') + "</td>";
		content += "<td colspan='25'>INR - Indian Rupees</td>";
		content += "<td colspan='25' style='text-align: right;'>" + consolidatedArray[index].udf_float_4 + "</td>";
		content += "</tr>";
    };
	content += "<tr>";
	content += "<td colspan='50' style='font-weight: bold; text-align: right;'></td>";
	content += "<td colspan='25'>Total</td>";
	content += "<td colspan='25' style='text-align: right;'>" + totalSum.toFixed(2) + "</td>";
	content += "</tr>";
	content += "<tr>";
	content += "<td colspan='100' style='font-size: large;'>I hereby declare that expenses claimed in the voucher are for official purposes only</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; height: 150px;'>";
	content += "<td colspan='30'></td>";
	content += "<td colspan='30'></td>";
	content += "<td rowspan='2' colspan='40' style='font-size: small; text-align: justify;'>Please Note - Following supporting documents to be enclosed for Domestic &amp; Export ";
	content += "</br> 1. Budget copy including extension approval if applicable";
	content += "</br> 2. Signed forex advice, ";
	content += "</br> 3. Bills and Credit card statement if any (Dom / Exp)";
	content += "</br> 4. Ticket/Boarding pass copy (Dom &amp; Exp)";
	content += "</br> 5. Minutes of meeting (Dom &amp; Exp)";
	content += "</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center; height: '>";
	content += "<td colspan='30'>PREPARED BY</td>";
	content += "<td colspan='30'>AUTHORIZED BY</td>";
	content += "</tr>";
    content += "</table>";
	content += "<table border='1' width='100%' style='margin-top: 10px; table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse; page-break-before:always'>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td rowspan='2' colspan='20'>FROM DATE </br> (DD/MM/YYYY)</td>";
	content += "<td rowspan='2' colspan='20'>TO DATE </br> (DD/MM/YYYY)</td>";
	content += "<td rowspan='2' colspan='25'>ACCOUNT HEAD</td>";
	content += "<td rowspan='2' colspan='25'>Cost Centre </br><span style='font-weight: normal; font-size: small;'>provide details if it is different against every cash memo</span></td>";
	content += "<td rowspan='2' colspan='20'>Cash</br>Memo No</td>";
	content += "<td rowspan='2' colspan='50'>PARTICULARS </br><span style='font-weight: normal; font-size: small;'>in case of stay - please mention location of stay</span></br><span style='font-weight: normal; font-size: small;'>in case of travel - please mention mode of</span></br><span style='font-weight: normal; font-size: small;'>transport and from and to location</span></td>";
	content += "<td colspan='40' style='text-align: center;'>Basic Amount</td>";
	content += "</tr>";
	content += "<tr style='font-weight: bold; text-align: center;'>";
	content += "<td colspan='20'>Currency</td>";
	content += "<td colspan='20'>Amount</td>";
	content += "</tr>";
	for (var index = 0; index < generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData.length; index++) {
        content += "<tr>";
		if(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type == "TA"){
			content += "<td colspan='25'>" + mserviceUtilities.getDateString(new Date(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_date_1),'dd/MM/yyyy') + "</td>";
		} else {
			content += "<td colspan='20'>" + mserviceUtilities.getDateString(new Date(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_date_5),'dd/MM/yyyy') + "</td>";
			if(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_date_6 == "1900-01-01"){
				content += "<td colspan='20'></td>";
			} else {
				content += "<td colspan='20'>" + mserviceUtilities.getDateString(new Date(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_date_6),'dd/MM/yyyy') + "</td>";
			}
		}
		content += "<td colspan='25'>" + mserviceUtilities.getDescriptionForCode('TADAACTIONTYPE_LIST', generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type, '') + "</td>";
		content += "<td colspan='25'></td>";
		content += "<td colspan='20'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_analysis_code3 + "</td>";
			if((generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type == "LA") || (generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type == "TA")){
			if(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].additional_information != ""){
				content += "<td colspan='50'>Start Place : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_char_1 + ", " + "Visited Place : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_char_2 +  ", " + "Remarks : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].additional_information + "</td>";
			} else {
				content += "<td colspan='50'>Start Place : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_char_1 + ", " + "Visited Place : " + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_char_2 + "</td>";
			}
		} else {
			content += "<td colspan='50'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].additional_information + "</td>";
		}
		content += "<td colspan='20'>INR-Indian Rupees</td>";
		content += "<td colspan='20' style='text-align: right;'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4 + "</td>";
		content += "</tr>";
    };
	content += "<tr style='font-weight: bold; text-align: right;'>";
	content += "<td colspan='180'>Total</td>";
		var total=0;
		for (var index = 0; index < generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData.length; index++) {
			total += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4);
		}
	content += "<td colspan='20'>"+total.toFixed(2)+"</td>";
	content += "</tr>";
	content += "</table>";
	 content += "<table border='0' width='100%' style='margin-top: 10%; table-layout: fixed; width: 100%; word-wrap: break-word; font-size: large; border-collapse:collapse;'>";
    if (manage_custom_maintenance.variable.custom.workflowDatasource.data().length != 0) {
        content += '<tr>';
        content += '<td style = "font-weight:bold; vertical-align: middle; padding-top: 5px; padding-bottom: 5px;">Event Summary</td>';
        content += '</tr>';
    };
    for (var index = (manage_custom_maintenance.variable.custom.workflowDatasource.data().length - 1); index >= 0; index--) {
        content += '<tr>';
        content += '<td style = "vertical-align: middle; padding-top: 5px; padding-bottom: 5px;">' + ' Event : ' + ((manage_custom_maintenance.variable.custom.workflowDatasource.data()[index].to_status == "P" ? "Created" : manage_custom_maintenance.variable.custom.workflowDatasource.data()[index].to_status_desc)) + ' On ' + mserviceUtilities.getDateString(new Date(manage_custom_maintenance.variable.custom.workflowDatasource.data()[index].event_date), 'dd-MM-yyyy') + ' by ' + manage_custom_maintenance.variable.custom.workflowDatasource.data()[index].by_emp_name + '</td>';
        content += '</tr>';
    };
    content += "</table>";
    content += "</div>";
	generate_custom_maintenance_pdf.variable.custom.attachmentDatasource = mserviceUtilities.getTransportDataSource({
		applicationName : "common_modules",
		serviceName : "retrieve_attached_docs",
		outputPath : "context/outputparam_detail",
		inputParameter : {
			p_project_task_level_ind : "'A'",
			p_project_id : "$manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no",
			p_template_id : "''",
			p_task_id : "'0'",
		}
	});
	generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.read();
	if(generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data().length != 0){
		for(var index =0; index < generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data().length; index++){
			if(generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data()[index].doc_category.trim() == "I"){
				if(index == 0){
					content += "<table border='1' width='100%' style='margin-top: 10px; table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse; page-break-inside:avoid; page-break-before:always;'>";
				} else {
					content += "<table border='1' width='100%' style='margin-top: 10px; table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse; page-break-inside:avoid;'>";
				};
				content += "<tr><td style='font-size: x-large; font-weight: bolder; margin-top: 5%;'>Attachment " + (index + 1) + " : " + generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data()[index].doc_name + "</td></tr>";
				content += "<tr><td><embed src='" + mserviceUtilities.getWebserverpath() + "content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/ancillary_attachments/" + generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data()[index].txn_ref_no + "/" + generate_custom_maintenance_pdf.variable.custom.attachmentDatasource.data()[index].doc_name + "' style='width: 100%;'></embed></td></tr>";
				content += "</table>";
			};
		};
	};
    content += "</body>";
    content += "</html>";
    return content;
};