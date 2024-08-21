var manage_asset_parameter_edit = {
	constructScreen : function () {
		manage_asset_parameter_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values",
			outputPath: "context/outputparam",
			pageSize: 1,
			inputParameter : {
				p_lov_code : "'LAST_HMR_VALUE_CHECK'",
				p_search_field_1 : "#manage_asset_parameter_asset_id_filter",
				p_search_field_2 : "",
				p_search_field_3 : "",
				p_search_field_4 : "",
				p_search_field_5 : ""
			},
			screenID: "manage_asset_parameter_edit",
		});
		manage_asset_parameter_edit.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values",
			outputPath: "context/outputparam",
			pageSize: 1,
			inputParameter : {
				p_lov_code : "'ASSET_INSTALL_CHECK'",
				p_search_field_1 : "#manage_asset_parameter_asset_id_filter",
				p_search_field_2 : "",
				p_search_field_3 : "",
				p_search_field_4 : "",
				p_search_field_5 : ""
			},
			screenID: "manage_asset_parameter_edit",
		});
		manage_asset_parameter_edit.variable.custom.datasource_1.read();
		manage_asset_parameter_edit.variable.custom.datasource_2.read();
		if(manage_asset_parameter_edit.variable.custom.datasource_1.data().length != 0){
			manage_asset_parameter_edit.variable.custom.datasource_1_record = manage_asset_parameter_edit.variable.custom.datasource_1.at(0);	
			manage_asset_parameter_edit.variable.custom.record_date_year= parseInt(manage_asset_parameter_edit.variable.custom.datasource_1_record.p_value_field_1.substr(0,4));
			manage_asset_parameter_edit.variable.custom.record_date_month= parseInt(manage_asset_parameter_edit.variable.custom.datasource_1_record.p_value_field_1.substr(5,2)-1);
			manage_asset_parameter_edit.variable.custom.record_date_date= parseInt(manage_asset_parameter_edit.variable.custom.datasource_1_record.p_value_field_1.substr(8,2));
			manage_asset_parameter_edit.variable.custom.record_date_minValue = new Date (manage_asset_parameter_edit.variable.custom.record_date_year,manage_asset_parameter_edit.variable.custom.record_date_month, manage_asset_parameter_edit.variable.custom.record_date_date);
			manage_asset_parameter_edit.variable.custom.record_date_minValue.setDate(manage_asset_parameter_edit.variable.custom.record_date_minValue.getDate()+1); 
			if(manage_asset_parameter_edit.variable.custom.record_date_minValue == "Invalid Date"){
				manage_asset_parameter_edit.variable.custom.record_date_minValue = new Date(1900, 0, 1);
			}
			manage_asset_parameter_edit.variable.custom.hmr_minValue = manage_asset_parameter_edit.variable.custom.datasource_1_record.p_description_field_1;	
			if(manage_asset_parameter_edit.variable.custom.hmr_minValue == ""){
				manage_asset_parameter_edit.variable.custom.hmr_minValue = 1;
			} else {
				$('.display_description[data-for = "manage_asset_parameter_edit_parameter_value"]').text("Last Updated Value : " + manage_asset_parameter_edit.variable.custom.hmr_minValue).css("color","#E5224C");
			}
		}
	},
	postConstruct : function () {},
	initializeWidgets : function () {
		$("#manage_asset_parameter_edit_update_date").initializeWDatepicker({
			screenID : "manage_asset_parameter_edit",
			minimum : "$manage_asset_parameter_edit.variable.custom.record_date_minValue",
			defaultValue : "$manage_asset_parameter_edit.variable.custom.installation_date_defaultValue"
		});
		$("#manage_asset_parameter_edit_parameter_code").initializeWTextbox({
			screenID : "manage_asset_parameter_edit",
			maxlength : "10",
			defaultValue : "$manage_asset_parameter_edit.variable.custom.asset_location_code_defaultValue"
		});	
		$("#manage_asset_parameter_edit_parameter_value").initializeWNumerictextbox({
			screenID : "manage_asset_parameter_edit",
			format :"n4",
			//minimum : "$manage_asset_parameter_edit.variable.custom.hmr_minValue",
			defaultValue : "$manage_asset_parameter_edit.variable.custom.asset_location_code_defaultValue"
		});
	},
	widgetEventHandler : {
		parameter_value_change : function (element, event){
			var validIndicator;
			manage_asset_parameter_edit.variable.custom.dateFormat = mserviceUtilities.getDateString($("#manage_asset_parameter_edit_update_date").getVal(), "yyyy-MM-dd");
			manage_asset_parameter_edit.variable.custom.datasource_1.read();
			if(manage_asset_parameter_edit.variable.custom.datasource_1.data().length != 0){
				validIndicator  = manage_asset_parameter_edit.variable.custom.datasource_1.data();
				if(validIndicator[0].p_value_field_1 == "0"){
					alert ("Invalid HMR Value");
					$('#manage_asset_parameter_edit_parameter_value').setVal(validIndicator[0].p_description_field_1);
				}
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp,
			inputparamDetail,
			detailRecordCounter;
			inputparamDetail = [];
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			
			/* daily runrate check*/
			if(manage_asset_parameter_edit.variable.custom.datasource_2._data[0].p_value_field_2 !="")
			{
				var dateFormatUpdateDate,
				dateFormatInstallaionDate,
				diffDays,
				avgRunRate;
				dateFormatUpdateDate = new Date($("#manage_asset_parameter_edit_update_date").getVal());
				dateFormatInstallaionDate = new Date(manage_asset_parameter_edit.variable.custom.datasource_2._data[0].p_value_field_2);
				dateFormatPreviousHmrDate = new Date(manage_asset_parameter_edit.variable.custom.datasource_2._data[0].p_value_field_3);
				if(dateFormatPreviousHmrDate == "")
				{
					diffDays = parseInt((dateFormatUpdateDate - dateFormatInstallaionDate) / (1000 * 60 * 60 * 24), 10) + 1; 
					
				}
				else 
				{
					diffDays = parseInt((dateFormatUpdateDate - dateFormatPreviousHmrDate) / (1000 * 60 * 60 * 24), 10) + 1;
				}
				avgRunRate = ($("#manage_asset_parameter_edit_parameter_value").getVal() -  (manage_asset_parameter_edit.variable.custom.hmr_minValue))/ diffDays;
				if (avgRunRate > 24)
				{
					alert ('Daily Avg run rate cannot be more than 24 hours');
					return false;
				}
					
			}	
			else
			{
				alert ('Asset must have Installation date to proceed');
				return false;
			}
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
				p_custom_info_code : "asset_parameter_update",
				p_custom_info_ref_no1: manage_asset_parameter_asset_id_filter.value,
				p_custom_info_ref_no2: "",
				p_inputparam_header_xml : "<inputparam><update_date>"+ mserviceUtilities.getDateString($("#manage_asset_parameter_edit_update_date").getVal(), "yyyy-MM-dd")+"</update_date><parameter_code>" + $("#manage_asset_parameter_edit_parameter_code").getVal() + "</parameter_code><parameter_value>" + $("#manage_asset_parameter_edit_parameter_value").getVal() + "</parameter_value></inputparam>",
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : "U",
				inputparam_detail : inputparamDetail
			});
			if (returnValue.update_status == "SP001") {
				alert("Machine Parameter Updated successfully");
				return true;
			} else {
				alert("Machine Parameter Updated Failed");
				return true;
			}
		}
	},
	linkEventHandler : {},
	variable : {
		standard : {
			screenEditableIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}
			],
			popupIndicator : true,
			valueChangeIndicator : false,
		},
		custom : {},
	}
};