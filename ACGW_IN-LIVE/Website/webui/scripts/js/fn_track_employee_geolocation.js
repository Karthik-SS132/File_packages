var track_employee_geolocation = {
	constructScreen : function () {
		track_employee_geolocation.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_stafflocation_map",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "track_employee_geolocation.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "track_employee_geolocation",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		if (webNavigationController.getPreviousScreenID() == "home_container") {
			$("#track_employee_geolocation_cancel_btn").hide();
		}
	},
	initializeWidgets : function () {
		track_employee_geolocation.variable.custom.dealer_id_filter = $("#track_employee_geolocation_dealer_id_filter").initializeWCombobox({
				screenID : "track_employee_geolocation",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'DEALER_LIST'",
						p_search_field_1 : "",
						p_search_field_2 : "",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
				},
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1",
				childFieldID : "track_employee_geolocation_service_engineer_filter",
				filterMode : true
			});
		track_employee_geolocation.variable.custom.service_manager_filter = $("#track_employee_geolocation_service_manager_filter").initializeWCombobox({
				screenID : "track_employee_geolocation",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'CALLREPORTINGTO_LIST_SPEC'",
						p_search_field_1 : "$login_profile.package_id",
						p_search_field_2 : "#track_employee_geolocation_dealer_id_filter",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
				},
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1",
				filterMode : true
			});
		track_employee_geolocation.variable.custom.service_engineer_filter = $("#track_employee_geolocation_service_engineer_filter").initializeWMultiselect({
				screenID : "track_employee_geolocation",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'CALL_ASSIGNTO_LIST_FOR_REPORTINGTO_SPEC'",
						p_search_field_1 : "",
						p_search_field_2 : "$login_profile.package_id",
						p_search_field_3 : "#track_employee_geolocation_dealer_id_filter",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
				},
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1",
				filterMode : true
			});
		$("#track_employee_geolocation_auto_refresh").initializeWCheckbox({
			screenID : "track_employee_geolocation"
		});
		track_employee_geolocation.customRequirementHandler.initializeMap();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			var dataCounter,
			filteredData;
			if ($("#track_employee_geolocation_service_manager_filter").getVal() == "") {
				track_employee_geolocation.variable.custom.service_engineer_filter.dataSource.read();
			};
			track_employee_geolocation.variable.custom.datasource_1.read();
			for (dataCounter = 0; dataCounter < track_employee_geolocation.variable.custom.datasource_1.data().length; dataCounter++) {
				filteredData = $.grep(track_employee_geolocation.variable.custom.service_engineer_filter.dataSource.data(), function (element, index) {
						return element.p_value_field_2 == track_employee_geolocation.variable.custom.datasource_1.data()[dataCounter].p_device_id;
					});
				track_employee_geolocation.variable.custom.datasource_1.data()[dataCounter].set("p_employee_id", filteredData[0].p_value_field_1);
				track_employee_geolocation.variable.custom.datasource_1.data()[dataCounter].set("p_employee_name", filteredData[0].p_description_field_1);
			};
			track_employee_geolocation.customRequirementHandler.refreshMap();
		},
	},
	widgetEventHandler : {
		auto_refresh_change : function (element, event) {
			if ($("#track_employee_geolocation_auto_refresh").getVal() == "1") {
				track_employee_geolocation_autoRefreshTimer = setInterval(function () {
						if (webNavigationController.getCurrentScreenID() == "track_employee_geolocation") {
							track_employee_geolocation.buttonEventHandler.crud_btn_click();
						} else {
							clearInterval(track_employee_geolocation_autoRefreshTimer);
						}
					}, parseInt(track_employee_geolocation.variable.custom.autoRefreshTime));
				alert("Auto Refresh is turned ON.");
			} else {
				clearInterval(track_employee_geolocation_autoRefreshTimer);
				alert("Auto Refresh is turned OFF.");
			}
		}
	},
	linkEventHandler : {
		toggle_full_screen_link_click : function (element, event) {
			if (track_employee_geolocation.variable.custom.fullScreenView) {
				$("#track_employee_geolocation_map").css("height", "500px").insertAfter("#track_employee_geolocation_map_origin");
				$("#home").show();
				track_employee_geolocation.variable.custom.fullScreenView = false;
			} else {
				$("#home").hide();
				$("#track_employee_geolocation_map").css("height", "100vh").insertAfter("#home");
				track_employee_geolocation.variable.custom.fullScreenView = true;
			};
			google.maps.event.trigger(track_employee_geolocation.variable.custom.map, 'resize');
		},
		marker_address_link_click : function (element, event) {
			var infoWindow;
			infoWindow = $.grep(track_employee_geolocation.variable.custom.infoWindowList, function (e, i) {
					return e.index == $(element).attr("data-record-index");
				})[0].infoWindow;
			$(element).hide().next().show();
			infoWindow.open(track_employee_geolocation.variable.custom.map, track_employee_geolocation.variable.custom.markerList[parseInt($(element).attr("data-record-index"))]);
			infoWindow.setZIndex(track_employee_geolocation.variable.custom.datasource_1.data().length);
		}
	},
	customRequirementHandler : {
		getFilterValues : function () {
			var returnValue,
			dataItemsCounter;
			returnValue = "<inputparam>";
			if (track_employee_geolocation.variable.custom.service_engineer_filter.dataItems().length != 0) {
				for (dataItemsCounter = 0; dataItemsCounter < track_employee_geolocation.variable.custom.service_engineer_filter.dataItems().length; dataItemsCounter++) {
					returnValue += "<device_id>" + track_employee_geolocation.variable.custom.service_engineer_filter.dataItems()[dataItemsCounter].p_value_field_2 + "</device_id>";
				}
			} else {
				for (dataItemsCounter = 0; dataItemsCounter < track_employee_geolocation.variable.custom.service_engineer_filter.dataSource.data().length; dataItemsCounter++) {
					returnValue += "<device_id>" + track_employee_geolocation.variable.custom.service_engineer_filter.dataSource.data()[dataItemsCounter].p_value_field_2 + "</device_id>";
				}
			};
			returnValue += "</inputparam>";
			return returnValue;
		},
		setSelectedRecord : function () {
			return true;
		},
		initializeMap : function () {
			var fullScreenIcon;
			track_employee_geolocation.variable.custom.map = new google.maps.Map(document.getElementById("track_employee_geolocation_map"), {
					mapTypeId : google.maps.MapTypeId.ROADMAP
				});
			google.maps.event.addListenerOnce(track_employee_geolocation.variable.custom.map, 'idle', function () {
				google.maps.event.trigger(track_employee_geolocation.variable.custom.map, 'resize');
				track_employee_geolocation.variable.custom.map.setCenter(new google.maps.LatLng(0, 0));
				track_employee_geolocation.variable.custom.map.setZoom(2);
			});
			fullScreenIcon = document.createElement("img");
			fullScreenIcon.setAttribute("id", "track_employee_geolocation_map_full_screen_icon");
			fullScreenIcon.setAttribute("src", "../../common/images/map_full_screen.png");
			fullScreenIcon.setAttribute("data-widget-type", "w_link");
			fullScreenIcon.setAttribute("data-link-type", "toggle_full_screen");
			fullScreenIcon.setAttribute("style", "text-decoration: underline; color: blue; cursor: pointer; padding: 10px");
			track_employee_geolocation.variable.custom.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(fullScreenIcon);
		},
		refreshMap : function () {
			var markerListCounter,
			latLngPosition;
			for (markerListCounter = 0; markerListCounter < track_employee_geolocation.variable.custom.markerList.length; markerListCounter++) {
				track_employee_geolocation.variable.custom.markerList[markerListCounter].setMap(null);
			};
			track_employee_geolocation.variable.custom.markerList = [];
			track_employee_geolocation.variable.custom.infoWindowList = [];
			if (track_employee_geolocation.variable.custom.datasource_1.data().length != 0) {
				track_employee_geolocation.variable.custom.bound = new google.maps.LatLngBounds();
				for (markerListCounter = 0; markerListCounter < track_employee_geolocation.variable.custom.datasource_1.data().length; markerListCounter++) {
					latLngPosition = new google.maps.LatLng(parseFloat(track_employee_geolocation.variable.custom.datasource_1.data()[markerListCounter].p_lattitude_val), parseFloat(track_employee_geolocation.variable.custom.datasource_1.data()[markerListCounter].p_longitude_val));
					track_employee_geolocation.variable.custom.markerList.push(new google.maps.Marker({
							position : latLngPosition,
							map : track_employee_geolocation.variable.custom.map,
							icon : "http://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=repair|000000"
						}));
					track_employee_geolocation.variable.custom.bound.extend(latLngPosition);
					track_employee_geolocation.customRequirementHandler.getMyAddress(track_employee_geolocation.variable.custom.datasource_1.data()[markerListCounter].p_lattitude_val, track_employee_geolocation.variable.custom.datasource_1.data()[markerListCounter].p_longitude_val, markerListCounter);
				};
				track_employee_geolocation.variable.custom.map.setCenter(track_employee_geolocation.variable.custom.bound.getCenter());
				track_employee_geolocation.variable.custom.map.fitBounds(track_employee_geolocation.variable.custom.bound);
			} else {
				track_employee_geolocation.variable.custom.map.setCenter(new google.maps.LatLng(0, 0));
				track_employee_geolocation.variable.custom.map.setZoom(2);
			}
		},
		getMyAddress : function (latitude, longitude, index) {
			var geocoder,
			latLngPosition,
			infoWindow,
			infoContent;
			geocoder = new google.maps.Geocoder();
			latLngPosition = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
			geocoder.geocode({
				'latLng' : latLngPosition
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					test_result = results;
					track_employee_geolocation.variable.custom.datasource_1.data()[index].set("p_address", results[1].formatted_address);
					infoContent = "<div style = 'line-height: 13px;'><span style = 'font-size: xx-small; font-weight: bold;'>" + track_employee_geolocation.variable.custom.datasource_1.data()[index].p_employee_name + "</span>&nbsp;&nbsp;&nbsp;";
					infoContent += "<span style = 'font-size: xx-small; font-weight: bold;'>" + track_employee_geolocation.variable.custom.datasource_1.data()[index].p_at_hour + ":" + track_employee_geolocation.variable.custom.datasource_1.data()[index].p_at_minute + "</span>";
					infoContent += "<span data-widget-type = 'w_link' data-link-type = 'marker_address' data-record-index = '" + index + "' style = 'font-size: xx-small; font-weight: bold; color: blue; cursor: pointer;'>.....</span>";
					infoContent += "<span  style = 'font-size: xx-small; font-weight: bold; display: none;'><br/>" + track_employee_geolocation.variable.custom.datasource_1.data()[index].p_address + "</span></div>";
					infoWindow = new google.maps.InfoWindow({
							content : infoContent,
							maxWidth : 100,
							zIndex : index
						});
					track_employee_geolocation.variable.custom.infoWindowList.push({
						index : index.toString(),
						infoWindow : infoWindow
					});
					infoWindow.open(track_employee_geolocation.variable.custom.map, track_employee_geolocation.variable.custom.markerList[index]);
					track_employee_geolocation.variable.custom.markerList[index].addListener('click', function () {
						infoWindow.open(track_employee_geolocation.variable.custom.map, track_employee_geolocation.variable.custom.markerList[index]);
						infoWindow.setZIndex(track_employee_geolocation.variable.custom.datasource_1.data().length);
					});
				} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
					setTimeout(function () {
						track_employee_geolocation.customRequirementHandler.getMyAddress(latitude, longitude, index);
					}, 2000);
				}
			});
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			importConfiguration : {
				imformationType : 'track_employee_geolocation'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "track_employee_geolocation_map",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "track_employee_geolocation_map",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			markerList : [],
			infoWindowList : [],
			autoRefreshTime : 600000,
			fullScreenView : false
		},
	}
};
