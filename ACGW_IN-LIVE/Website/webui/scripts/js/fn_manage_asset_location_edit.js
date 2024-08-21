var manage_asset_location_edit = {
	constructScreen : function () {
		manage_asset_location_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_searchcondition",
			outputPath: "context/outputparam",
			pageSize: 1,
			inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'DEALER_COVERING_DISTRICT'</lov_code_type><search_field_1>$manage_asset_master.variable.custom.selectedRecord.org_level_code</search_field_1></inputparam>"
				},
			screenID: "manage_asset_location_edit",
		});
	},
	postConstruct : function () {
		$("#manage_asset_location_edit_content_0").css("width","100%");
		$("#manage_asset_location_edit_content_0").find('dd.value').css("width","15%");
		$("#manage_asset_location_edit_content_0").find('dt').css("width","15%");
		$("#manage_asset_location_edit_content_1").css("width","100%");
		$("#manage_asset_location_edit_content_1").find('dd.value').css("width","15%");
		$("#manage_asset_location_edit_content_1").find('dt').css("width","15%");
		var mapOptions = {
			center: new google.maps.LatLng(23.1861, 79.9329),
			zoom: 5,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var infoWindow = new google.maps.InfoWindow();
		var latlngbounds = new google.maps.LatLngBounds();
		var map = new google.maps.Map(document.getElementById("manage_asset_location_edit_map"), mapOptions);
		google.maps.event.addListener(map, 'click', function (e) {
			$("#manage_asset_location_edit_country").setVal("");
			$("#manage_asset_location_edit_lattitude_value").setVal(e.latLng.lat());
			$("#manage_asset_location_edit_longitude_value").setVal(e.latLng.lng());
			function GetAddress() {
				var lat = e.latLng.lat();
				var lng = e.latLng.lng();
				var latlng = new google.maps.LatLng(lat, lng);
				var geocoder = geocoder = new google.maps.Geocoder();
				geocoder.geocode({ 'latLng': latlng }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[1]) {
							$("#manage_asset_location_edit_machine_location_code").setVal(results[1].formatted_address);
							var indice=0;
							for (var j=0; j<results.length; j++){
								if (results[j].types[0]=='locality'){
									indice=j;
									break;
								}
							}
							if(results[j] != undefined){
								for (var i=0; i<results[j].address_components.length; i++)	{
									if (results[j].address_components[i].types[0] == "locality") {
										city = results[j].address_components[i];
									}
									if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
										region = results[j].address_components[i];
									}
									if (results[j].address_components[i].types[0] == "country") {
										country = results[j].address_components[i];
									}
								}
								$("#manage_asset_location_edit_country").setVal(country.short_name.toLowerCase());
								$("#manage_asset_location_edit_state").setVal(region.short_name);
							}
						}
					}
				});
			}
			GetAddress();
		});
	},
	initializeWidgets : function () {
		$("#manage_asset_location_edit_asset_id").initializeWDisplayarea({
			screenID : "manage_asset_location_edit",
			defaultValue : "$manage_asset_master.variable.custom.selectedRecord.asset_id"
		});
		$("#manage_asset_location_edit_equipment_id").initializeWDisplayarea({
			screenID : "manage_asset_location_edit",
			defaultValue : "$manage_asset_master.variable.custom.selectedRecord.equipment_id"
		});
		$("#manage_asset_location_edit_customer_id").initializeWDisplayarea({
			screenID : "manage_asset_location_edit",
			defaultValue : "$manage_asset_master.variable.custom.selectedRecord.customer_name"
		});
		$("#manage_asset_location_edit_machine_location_code").initializeWTextarea({
			screenID : "manage_asset_location_edit",
			maxlength : "1000",
			defaultValue : "$manage_asset_location_edit.variable.custom.asset_location_code_defaultValue"
		});
		$("#manage_asset_location_edit_lattitude_value").initializeWNumerictextbox({
			screenID : "manage_asset_location_edit",
			format : "n6",
			decimals : "6",
			defaultValue : "$manage_asset_location_edit.variable.custom.asset_location_code_defaultValue"
		});
		$("#manage_asset_location_edit_longitude_value").initializeWNumerictextbox({
			screenID : "manage_asset_location_edit",
			format : "n6",
			decimals : "6",
			defaultValue : "$manage_asset_location_edit.variable.custom.asset_location_code_defaultValue"
		});
		$("#manage_asset_location_edit_country").initializeWDropdownlist({
			screenID : "manage_asset_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'COUNTRY_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_asset_location_edit.variable.custom.country_defaultValue",
			defaultValueDescription : "$manage_asset_location_edit.variable.custom.country_defaultValue",
			childFieldID : "manage_asset_location_edit_state,manage_asset_location_edit_district"
		});
		$("#manage_asset_location_edit_state").initializeWDropdownlist({
			screenID : "manage_asset_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'STATE_LIST'",
					p_search_field_1 : "#manage_asset_location_edit_country",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_asset_location_edit.variable.custom.state_defaultValue",
			defaultValueDescription : "$manage_asset_location_edit.variable.custom.state_defaultValue",
			childFieldID : "manage_asset_location_edit_district"
		});
		 $("#manage_asset_location_edit_district").initializeWDropdownlist({
			screenID : "manage_asset_location_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'DISTRICTCODE_LIST'</lov_code_type><search_field_1>#manage_asset_location_edit_country</search_field_1><search_field_2>#manage_asset_location_edit_state</search_field_2></inputparam>"
					}
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_asset_location_edit.variable.custom.district_defaultValue",
			defaultValueDescription : "$manage_asset_location_edit.variable.custom.district_defaultValue"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp,
			inputparamDetail,
			detailRecordCounter;
			inputparamDetail = [];
			recordTimeStamp = manage_asset_master.variable.custom.selectedRecord.rec_tstamp;
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
				p_custom_info_code : "asset_location_update",
				p_custom_info_ref_no1: manage_asset_master.variable.custom.selectedRecord.asset_id,
				p_custom_info_ref_no2: "",
				p_inputparam_header_xml : "<inputparam><machine_location_code>" + $("#manage_asset_location_edit_machine_location_code").getVal() + "</machine_location_code><lattitude_value>" + $("#manage_asset_location_edit_lattitude_value").getVal() + "</lattitude_value><longitude_value>" + $("#manage_asset_location_edit_longitude_value").getVal()  + "</longitude_value><country>" + $("#manage_asset_location_edit_country").getVal() + "</country><state>" + $("#manage_asset_location_edit_state").getVal() + "</state><district>" + $("#manage_asset_location_edit_district").getVal() + "</district></inputparam>",
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : "U",
				inputparam_detail : inputparamDetail
			});
			if (returnValue.update_status == "SP001") {
				alert("Machine Location Updated successfully");
				return true;
			} else {
				alert("Machine Location Updated Failed");
				return true;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			popupIndicator : false,
			valueChangeIndicator : false,
		},
		custom : {},
	}
};