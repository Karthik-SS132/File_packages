var manage_tally_export = {
	constructScreen : function () {
		return true;
	},
	postConstruct : function () {
		$("#manage_tally_export_content_1 span dt").removeClass("term_one");
		$("#manage_tally_export_content_1 span dd.colen").html("");
		$("#manage_tally_export_content_1").find('dt').css("width","110px");
		$("#manage_tally_export_screen_title").css("padding-left","3%");
		$("#manage_tally_export_content_1").css("padding-left","3%");
		$("#manage_tally_export_footer").css("padding-right","65%");
	},
    initializeWidgets : function () {
		return true;
	},	
	buttonEventHandler: {
		misc_btn_click : function (element, event){
			if (manage_tally_export.variable.custom.validator.validate()) { // rule file applied here 
				response  = new kendo.data.DataSource({
					transport : {
						read : {
							type : "POST",
							async : false,
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : mserviceUtilities.getWebserverpath() + "common/components/Export/GenerateTallyExport.aspx",
							complete : function (data, textstatus) {
							}
						},
						parameterMap : function (options, operation) {
							return mserviceUtilities.getTransportParameter({
								inputparam : {
									p_document_type : "'tally'",
									p_document_template : "#manage_tally_export_voucher_type_filter",
									p_data_retrieve_service_name : "'sp_export_tally'",
									p_data_retrieve_request_xml : "'<signature><i_inputparam_xml><inputparam><dealer_id>"+$("#manage_tally_export_dealer_code_filter").getVal()+"</dealer_id><from_date>"+mserviceUtilities.getDateString($("#manage_tally_export_from_date_filter").getVal(), "yyyy-MM-dd")+"</from_date><to_date>"+mserviceUtilities.getDateString($("#manage_tally_export_to_date_filter").getVal(), "yyyy-MM-dd")+"</to_date><voucher_type>" + $("#manage_tally_export_voucher_type_filter").getVal() + "</voucher_type><fiscal_year>" + $("#manage_tally_export_fiscal_year_filter").getVal() + "</fiscal_year></inputparam></i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>'",
								}
							});
						}
					}
				  
				});
				response.read();
				response.data();
				if(response.data()[0] != ''){
					formCreation = document.createElement('FORM');
					formCreation.name = 'myForm';
					formCreation.method = 'POST';
					formCreation.action = getWebserverpath() + "common/components/Export/DownloadExportFile.aspx?fileName=" + response.data()[0].p_output_file_name + "&filePath=" + response.data()[0].p_output_file_path;
					document.body.appendChild(formCreation);
					formCreation.submit();
				} else {
					alert("Export Failed.");
				}
			}	
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}
			],
			valueChangeIndicator : false,
		},
		custom : {},
	}
};