var manage_customer_info = {
	constructScreen : function () {
		manage_customer_info.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_listof_values_for_searchcondition",
			outputPath : "context/outputparam",
			inputParameter : {
				p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_ADDL_INFO'</lov_code_type><search_field_1>#manage_call_register_sa_edit_customer_id</search_field_1></inputparam>"
			},
			screenID : "manage_customer_info",
		});
		manage_customer_info.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_listof_values_for_searchcondition",
			outputPath : "context/outputparam",
			pageSize : 5,
			inputParameter : {
				p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_COMPETITOR_MACHINE_LIST'</lov_code_type><search_field_1>#manage_call_register_sa_edit_customer_id</search_field_1></inputparam>"
			},
			screenID : "manage_customer_info",
		});
		manage_customer_info.variable.custom.datasource_3 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_listof_values_for_searchcondition",
			outputPath : "context/outputparam",
			pageSize : 5,
			inputParameter : {
				p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_MACHINE_LIST'</lov_code_type><search_field_1>#manage_call_register_sa_edit_customer_id</search_field_1></inputparam>"
			},
			screenID : "manage_customer_info",
		});
		manage_customer_info.variable.custom.datasource_1.read();
		manage_customer_info.variable.custom.datasource_2.read();
		if(manage_customer_info.variable.custom.datasource_1.data().length != 0){
			manage_customer_info.variable.custom.customerAddress = manage_customer_info.variable.custom.datasource_1.data()[0].addr_1 + " " + manage_customer_info.variable.custom.datasource_1.data()[0].addr_2 + " " + manage_customer_info.variable.custom.datasource_1.data()[0].addr_3 + "," + "\n" + manage_customer_info.variable.custom.datasource_1.data()[0].city + " " + manage_customer_info.variable.custom.datasource_1.data()[0].pincode + ", " + manage_customer_info.variable.custom.datasource_1.data()[0].state_desc + ", " + manage_customer_info.variable.custom.datasource_1.data()[0].country_desc;
		}
		manage_customer_info.variable.custom.customerSegmentArray = [];
		manage_customer_info.variable.custom.uniqueCustomerSegmentArray = [];
		for (var index=0; index < manage_customer_info.variable.custom.datasource_2.data().length; index++){ 
			manage_customer_info.variable.custom.customerSegmentArray.push(manage_customer_info.variable.custom.datasource_2.data()[index].application_segment);
		}
		$.each(manage_customer_info.variable.custom.customerSegmentArray, function(i, el){
			if($.inArray(el, manage_customer_info.variable.custom.uniqueCustomerSegmentArray) === -1) manage_customer_info.variable.custom.uniqueCustomerSegmentArray.push(el);
		});
		manage_customer_info.variable.custom.customerSegment = manage_customer_info.variable.custom.uniqueCustomerSegmentArray.toString();
	},
	initializeWidgets : function () {
		$("#manage_customer_info_customer_address").initializeWDisplayarea({
			screenID : "manage_customer_info",
			defaultValue : "$manage_customer_info.variable.custom.customerAddress"
		});
		$("#manage_customer_info_customer_segment").initializeWDisplayarea({
			screenID : "manage_customer_info",
			defaultValue : "$manage_customer_info.variable.custom.customerSegment"
		});
		$("#manage_customer_info_tabstrip").kendoTabStrip();
		manage_customer_info.variable.custom.grid_1 = $("#manage_customer_info_grid_1").initializeWGrid({
				screenID : "manage_customer_info",
				toolbar : false,
				dataSource : manage_customer_info.variable.custom.datasource_2,
				height : 200,
				pageSize : 5
			});
		manage_customer_info.variable.custom.grid_2 = $("#manage_customer_info_grid_2").initializeWGrid({
				screenID : "manage_customer_info",
				toolbar : false,
				dataSource : manage_customer_info.variable.custom.datasource_3,
				height : 200,
				pageSize : 5
			});
	},
	linkEventHandler : {
		competitor_segment_tab_link_click : function (element, event) {
			if (manage_customer_info.variable.custom.competitorSegmentTabOpened == false) {
				manage_customer_info.variable.custom.competitorSegmentTabOpened = true;
				manage_customer_info.variable.custom.datasource_2.read();
			}
		},
		customer_segment_tab_link_click : function (element, event) {
			if (manage_customer_info.variable.custom.customerSegmentTabOpened == false) {
				manage_customer_info.variable.custom.customerSegmentTabOpened = true;
				manage_customer_info.variable.custom.datasource_3.read();
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			competitorSegmentTabOpened : false,
			customerSegmentTabOpened : false,
			customerAddress : "",
			customerSegment : ""
		}
	}
};
