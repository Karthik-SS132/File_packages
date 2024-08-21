var manage_invoice_view = {
	constructScreen : function () {
		manage_invoice_view.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "mservice",
				serviceName : "retrieve_invoice_detail_for_docgen",
				pageSize : 10,
				inputParameter : {
					p_invoice_no : "$manage_invoice_header.variable.custom.selectedRecord.invoice_no"
				},
				processResponse : true,
				outputPath : false,
				parse : manage_invoice_view.customRequirementHandler.dataSourceParse
			});
		manage_invoice_view.variable.custom.datasource_1.read();
		$("#manage_invoice_view").append(manage_invoice_view.customRequirementHandler.getInvoiceTemplate());
		$("#manage_invoice_view").append(manage_invoice_view.customRequirementHandler.getInvoiceClass());
		$("#manage_invoice_view").attr("style", "height: 90%; width: 100%;");
		$('#manage_invoice_view_header_1').attr("style", "height: 100%; width: 100%; overflow-y: scroll;").html("<div>" + manage_invoice_view.customRequirementHandler.getInvoiceContent() + "</div>").prepend(manage_invoice_view.customRequirementHandler.getTemplateHeader() + "<br/>");
	},
	buttonEventHandler : {
		misc_btn_click : function (element, event) {
			kendo.drawing.drawDOM($("#manage_invoice_view_invoice_content"), {
				paperSize : "a4",
				forcePageBreak : ".page-break",
				margin : {
					left : "1cm",
					top : "4cm",
					right : "1cm",
					bottom : "1cm"
				},
				template : $("#manage_invoice_view_template").html()
			}).then(function (group) {
				kendo.drawing.pdf.saveAs(group, manage_invoice_header.variable.custom.selectedRecord.invoice_no + ".pdf");
			});
		}
	},
	customRequirementHandler : {
		dataSourceParse : function (response) {
			if (response.document.context.outputparam_detail_lineitems != "") {
				if (response.document.context.outputparam_detail_lineitems.length != undefined) {
					manage_invoice_view.variable.custom.outputparam_detail_lineitems = response.document.context.outputparam_detail_lineitems;
				} else {
					manage_invoice_view.variable.custom.outputparam_detail_lineitems = [response.document.context.outputparam_detail_lineitems];
				}
			};
			if (response.document.context.outputparam_detail_taxdetails != "") {
				if (response.document.context.outputparam_detail_taxdetails.length != undefined) {
					manage_invoice_view.variable.custom.outputparam_detail_taxdetails = response.document.context.outputparam_detail_taxdetails;
				} else {
					manage_invoice_view.variable.custom.outputparam_detail_taxdetails = [response.document.context.outputparam_detail_taxdetails];
				}
			};
			if (response.document.context.outputparam_detail_addninfo_1 != "") {
				if (response.document.context.outputparam_detail_addninfo_1.length != undefined) {
					manage_invoice_view.variable.custom.outputparam_detail_addninfo_1 = response.document.context.outputparam_detail_addninfo_1;
				} else {
					manage_invoice_view.variable.custom.outputparam_detail_addninfo_1 = [response.document.context.outputparam_detail_addninfo_1];
				}
			};
			if (response.document.context.outputparam_detail_addninfo_2 != "") {
				if (response.document.context.outputparam_detail_addninfo_2.length != undefined) {
					manage_invoice_view.variable.custom.outputparam_detail_addninfo_2 = response.document.context.outputparam_detail_addninfo_2;
				} else {
					manage_invoice_view.variable.custom.outputparam_detail_addninfo_2 = [response.document.context.outputparam_detail_addninfo_2];
				}
			};
			return [response.document.context.outputparam_header];
		},
		getInvoiceTemplate : function () {
			var template;
			template = '<script type = "text/html" id = "manage_invoice_view_template">';
			template += '<div class = "manage_invoice_view_template_page">';
			template += '<div class = "header">';
			template += manage_invoice_view.customRequirementHandler.getTemplateHeader();
			template += '</div><br/>';
			template += '<div class = "footer">';
			template += manage_invoice_view.customRequirementHandler.getTemplateFooter();
			template += '</div>';
			template += '</div>';
			template += '</script>';
			return template;
		},
		getInvoiceClass : function () {
			var style;
			style = '<style>';
			style += '.manage_invoice_view_template_page > * {position: absolute; left: 28px; right: 28px; font-size: 90%;}';
			style += '.manage_invoice_view_template_page .header {top: 20px; border-bottom: 1px solid #000;}';
			style += '.manage_invoice_view_template_page .footer {bottom: 20px; border-top: 1px solid #000;}';
			style += '</style>';
			return style;
		},
		getInvoiceContent : function () {
			var content = '<div id = "manage_invoice_view_invoice_content">';
			content += '<table style = "font-size: xx-small; font-family: Times New Roman; table-layout: fixed; width: 539px; word-wrap: break-word; text-align: center; border: 1px solid;">';
			content += '<tr style = "font-weight: bold;">';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 15px; border-right: 1px solid; border-bottom: 1px solid;">Sl<br/>No</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; border-right: 1px solid; border-bottom: 1px solid;">Customer\'s Name <br/>and Address</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 40px; border-right: 1px solid; border-bottom: 1px solid;">Claim<br/>No</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 35px; border-right: 1px solid; border-bottom: 1px solid;">Ticket<br/>No</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 50px; border-right: 1px solid; border-bottom: 1px solid;">Machine<br/>Model</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 50px; border-right: 1px solid; border-bottom: 1px solid;">Machine<br/>sl .no</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 46px; border-right: 1px solid; border-bottom: 1px solid;">Date of<br/>Service</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 62px; border-right: 1px solid; border-bottom: 1px solid;">Nature of<br/>Complaint</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 35px; border-right: 1px solid; border-bottom: 1px solid;">HMR</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 37px; border-bottom: 1px solid;">Amount<br/>(INR)</td>';
			content += '</tr>';
			for (var index in manage_invoice_view.variable.custom.outputparam_detail_lineitems) {
				content += '<tr>';
				content += '<td style = "vertical-align: middle; padding: 2px; width: 15px; border-right: 1px solid; border-bottom: 1px solid;">' + manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].item_slno + '</td>';
				content += '<td style = "vertical-align: middle; padding: 2px; border-right: 1px solid; border-bottom: 1px solid;">' + manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].customer_nameaddress + '</td>';
				content += '<td style = "vertical-align: middle; padding: 2px; width: 40px; border-right: 1px solid; border-bottom: 1px solid;">' + manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].expdoc_ref_no + '</td>';
				content += '<td style = "vertical-align: middle; padding: 2px; width: 35px; border-right: 1px solid; border-bottom: 1px solid;">' + manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].call_ref_no + '</td>';
				content += '<td style = "vertical-align: middle; padding: 2px; width: 50px; border-right: 1px solid; border-bottom: 1px solid;">' + manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].machine_model + '</td>';
				content += '<td style = "vertical-align: middle; padding: 2px; width: 50px; border-right: 1px solid; border-bottom: 1px solid;">' + manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].machine_slno + '</td>';
				content += '<td style = "vertical-align: middle; padding: 2px; width: 46px; border-right: 1px solid; border-bottom: 1px solid;">' + mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].date_of_service
					}), "dd-MM-yyyy") + '</td>';
				content += '<td style = "vertical-align: middle; padding: 2px; width: 62px; border-right: 1px solid; border-bottom: 1px solid;">' + manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].call_type + '</td>';
				content += '<td style = "vertical-align: middle; padding: 2px; width: 35px; border-right: 1px solid; border-bottom: 1px solid;">' + manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].hmr + '</td>';
				content += '<td style = "vertical-align: middle; padding: 2px; width: 37px; border-bottom: 1px solid;">' + manage_invoice_view.variable.custom.outputparam_detail_lineitems[index].net_amount + '</td>';
				content += '</tr>';
			};
			content += '</table>';
			content += '<br/>';
			content += '<table style = "font-size: xx-small; font-family: Times New Roman; table-layout: fixed; width: 539px; word-wrap: break-word; text-align: center; font-weight: bold; border-top: 2px solid; border-bottom: 2px solid;">';
			content += '<tr>';
			content += '<td style = "vertical-align: middle; padding: 2px;">Total Amount (INR)</td>';
			content += '<td style = "vertical-align: middle; padding: 2px; width: 37px;">' + manage_invoice_view.variable.custom.datasource_1.data()[0].net_amount + '</td>';
			content += '</tr>';
			content += '</table>';
			content += '<span class="page-break"><br/></span>';
			content += '<table style = "font-size: xx-small; font-family: Times New Roman; table-layout: fixed; width: 539px; word-wrap: break-word; margin-top: 10px;">';
			content += "<tr style = 'vertical-align: middle; padding-top: 5px; padding-bottom: 5px; font-weight: bold; text-decoration: underline;'><td>Approval Summary</td></tr>";
			for (var index in manage_invoice_view.variable.custom.outputparam_detail_addninfo_1) {
				content += '<tr>';
				content += '<td style = "vertical-align: middle; padding-top: 5px; padding-bottom: 5px;">' + 'Claim : ' + manage_invoice_view.variable.custom.outputparam_detail_addninfo_1[index].expense_claim_no + ' - ' + manage_invoice_view.variable.custom.outputparam_detail_addninfo_1[index].workflow_date + ' - ' + manage_invoice_view.variable.custom.outputparam_detail_addninfo_1[index].workflow_action + '</td>';
				content += '</tr>';
			};
			content += '</table>';
			content += "</div>";
			return content;
		},
		getTemplateHeader : function () {
			var header = '<table style = "font-size: xx-small; font-family: Times New Roman; table-layout: fixed; width: 539px; word-wrap: break-word; text-align: left; border-bottom: 1px solid;">';
			header += '<tr>';
			header += '<td style = "padding: 2px; width: 125px;">';
			header += '<img style = "width: 100px; height: 50px; vertical-align: -40px;" src = "../../common/images/' + login_profile.client_id + '/' + login_profile.country_code + '/company_logo.png"/>';
			header += '</td>';
			header += '<td style = "vertical-align: middle; padding: 2px; width: 260px;">';
			header += '<table>';
			header += '<tr><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">Dealer Code</td><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">:</td><td style = "vertical-align: middle; padding: 2px; font-style: italic;">' + manage_invoice_view.variable.custom.datasource_1.data()[0].dealer_code + '</td></tr>';
			header += '<tr><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">Dealer Name</td><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">:</td><td style = "vertical-align: middle; padding: 2px; font-style: italic;">' + manage_invoice_view.variable.custom.datasource_1.data()[0].dealer_name + '</td></tr>';
			header += '<tr><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">Dealer Address</td><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">:</td><td style = "vertical-align: middle; padding: 2px; font-style: italic;">' + manage_invoice_view.variable.custom.datasource_1.data()[0].dealer_address + '</td></tr>';
			header += '</table>';
			header += "</td>";
			header += '<td style = "vertical-align: middle; padding: 2px;">';
			header += '<table>';
			header += '<tr><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">Invoice No</td><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">:</td><td style = "vertical-align: middle; padding: 2px; font-style: italic;">' + manage_invoice_view.variable.custom.datasource_1.data()[0].invoice_no + '</td></tr>';
			header += '<tr><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">Date</td><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">:</td><td style = "vertical-align: middle; padding: 2px; font-style: italic;">' + mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
					dateString : manage_invoice_view.variable.custom.datasource_1.data()[0].invoice_date
				}), "dd-MM-yyyy") + '</td></tr>';
			header += '<tr><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">Division</td><td style = "vertical-align: middle; padding: 2px; font-weight: bold;">:</td><td style = "vertical-align: middle; padding: 2px; font-style: italic;">' + manage_invoice_view.variable.custom.datasource_1.data()[0].division + '</td></tr>';
			header += '</table>';
			header += '</td>';
			header += '</tr>';
			header += '</table>';
			return header;
		},
		getTemplateFooter : function () {
			return '<div style = "float: right; font-size: xx-small; font-family: Times New Roman;">Page #:pageNum# of #:totalPages# </div>';
		}
	},
	variable : {
		standard : {
			popupIndicator : true
		},
		custom : {
			outputparam_detail_lineitems : [],
			outputparam_detail_taxdetails : [],
			outputparam_detail_addninfo_1 : [],
			outputparam_detail_addninfo_2 : []
		},
	}
};
