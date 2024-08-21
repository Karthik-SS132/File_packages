var enquiry_coverage_tracking = {
	constructScreen: function () {
		enquiry_coverage_tracking.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				inputParameter: {
					p_inputparam_xml: "enquiry_coverage_tracking.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				pageSize : 15,
				screenID : "enquiry_coverage_tracking",
				dataSourceName : "datasource_1",
				processResponse : true
			});
			enquiry_coverage_tracking.variable.custom.datasource_3 = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				inputParameter: {
					p_inputparam_xml: "enquiry_coverage_tracking.customRequirementHandler.getDistrictValues()"
				},
				schemaModel : true,
				pageSize : 15,
				screenID : "enquiry_coverage_tracking",
				dataSourceName : "datasource_3",
				processResponse : true
			});
			enquiry_coverage_tracking.variable.custom.call_status = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					pageSize : 10,
					inputParameter : {
						p_inputparam_xml : "'<inputparam><lov_code_type>CALLSTATUS_LIST</lov_code_type><search_field_1>SA</search_field_1><search_field_2></search_field_2><search_field_3></search_field_3><search_field_4></search_field_4><search_field_5></search_field_5></inputparam>'"
					},
					screenID : "",
				});
	},
	postConstruct: function () {
		if (webNavigationController.getPreviousScreenID() == "home_container") {
			$("#enquiry_coverage_tracking_cancel_btn").hide();
			
		}
	enquiry_coverage_tracking.customRequirementHandler.initializeMap();	
	enquiry_coverage_tracking.customRequirementHandler.refreshMap();	
		enquiry_coverage_tracking.variable.custom.call_status.read();	 
		$("#enquiry_coverage_tracking_grid_1_export_btn").hide();
		enquiry_coverage_tracking_filterArea = $("#enquiry_coverage_tracking_pane2");
		setTimeout(function(){
			enquiry_coverage_tracking.buttonEventHandler.misc_btn_click();
		}, 10);
		
	},
	initializeWidgets: function () {
		$("#enquiry_coverage_tracking_auto_refresh").initializeWCheckbox({
			screenID: "enquiry_coverage_tracking"
		});
		$("#enquiry_coverage_tracking_tabstrip").kendoTabStrip();
		$("#enquiry_coverage_tracking_editor").kendoMenu();	
		
		enquiry_coverage_tracking_splitter = $("#enquiry_coverage_tracking_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			]
			
		}).data("kendoSplitter");
		/*enquiry_coverage_tracking.variable.custom.grid_1 = $("#enquiry_coverage_tracking_grid_1").initializeWGrid({
			screenID : "enquiry_coverage_tracking",
			toolbar: "#enquiry_coverage_tracking_grid_1_toolbar_template",
			dataSource : enquiry_coverage_tracking.variable.custom.datasource_1,
			height : 400,
			pageSize : 15
		});	 */   
		/*enquiry_coverage_tracking.variable.custom.grid_3 = $("#enquiry_coverage_tracking_grid_3").initializeWGrid({
			screenID : "enquiry_coverage_tracking",
			toolbar: false,
			dataSource : enquiry_coverage_tracking.variable.custom.datasource_3,
			height : 400,
			pageSize : 15
		});*/
	},
	buttonEventHandler: {
		crud_btn_click: function (element, event) {
			enquiry_coverage_tracking.customRequirementHandler.initializeMap();
			enquiry_coverage_tracking.variable.custom.datasource_1.read();
			enquiry_coverage_tracking.variable.custom.datasource_3.read();
			enquiry_coverage_tracking.customRequirementHandler.refreshMap();
		},
		misc_btn_click : function (element, event){
			enquiry_coverage_tracking_splitter[enquiry_coverage_tracking_filterArea.width() > 0 ? "collapse" : "expand"](enquiry_coverage_tracking_filterArea);
		}
	},
	widgetEventHandler: {
		auto_refresh_change: function (element, event) {
			if ($("#enquiry_coverage_tracking_auto_refresh").getVal() == "1") {
				enquiry_coverage_tracking_autoRefreshTimer = setInterval(function () {
						if (webNavigationController.getCurrentScreenID() == "enquiry_coverage_tracking") {
							enquiry_coverage_tracking.buttonEventHandler.crud_btn_click();
						} else {
							clearInterval(enquiry_coverage_tracking_autoRefreshTimer);
						}
					}, parseInt(enquiry_coverage_tracking.variable.custom.autoRefreshTime));
				alert("Auto Refresh is turned ON.");
			} else {
				clearInterval(enquiry_coverage_tracking_autoRefreshTimer);
				alert("Auto Refresh is turned OFF.");
			}
		}
	},
	linkEventHandler: {
		toggle_full_screen_link_click: function (element, event) {
			if (enquiry_coverage_tracking.variable.custom.fullScreenView) {
				$("#enquiry_coverage_tracking_map").css("height", "500px").insertAfter("#enquiry_coverage_tracking_map_origin");
				$("#home").show();
				enquiry_coverage_tracking.variable.custom.fullScreenView = false;
			} else {
				$("#home").hide();
				$("#enquiry_coverage_tracking_map").css("height", "100vh").insertAfter("#home");
				enquiry_coverage_tracking.variable.custom.fullScreenView = true;
			};
			google.maps.event.trigger(enquiry_coverage_tracking.variable.custom.map, 'resize');
		},
		map_populate_tab_link_click : function (element, event) {
			enquiry_coverage_tracking.customRequirementHandler.initializeMap();
			setTimeout(function(){
			enquiry_coverage_tracking.customRequirementHandler.refreshMap();
			}, 1000);
		},
		detail_data_tab_link_click : function (element, event) {
			enquiry_coverage_tracking.variable.custom.grid_1.dataSource.pageSize(10);
		},
		districtwise_data_tab_link_click : function (element, event) {
			enquiry_coverage_tracking.variable.custom.grid_3.dataSource.pageSize(10);
		},
		call_job_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_sa.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_call_register_sa";
				});
				manage_call_register_sa.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "enquiry_coverage_tracking",
					nextScreenID : "manage_call_register_sa",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#enquiry_coverage_tracking").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "enquiry_coverage_tracking"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_call_register_sa"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_call_register_sa";
				webNavigationController.buildBreadCrumb();
				$("#manage_call_register_sa_state_filter").setVal(element.getAttribute('location').substr(0,2));
				$("#manage_call_register_sa_district_filter").setVal(element.getAttribute('location'));
				$("#manage_call_register_sa_call_status_filter").setVal(element.getAttribute('status'));
				manage_call_register_sa.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler: {
		getFilterValues: function () {
			return $("#enquiry_coverage_tracking_content_1").getInputparamXML({
				screenID: "enquiry_coverage_tracking",
				matchCondition: ["enquiry_coverage_tracking_"]
			});
		},
		getDistrictValues: function () {
			var inputParamxmlWithDistrict = $("#enquiry_coverage_tracking_content_1").getInputparamXML({
				screenID: "enquiry_coverage_tracking",
				matchCondition: ["enquiry_coverage_tracking_"]
				});
				inputParamxmlWithDistrict = inputParamxmlWithDistrict.substr(0,inputParamxmlWithDistrict.indexOf('</inputparam>'));
				inputParamxmlWithDistrict += "<lov_code>ENQUIRY_DISTRICTWISE</lov_code></inputparam>";
			
			return inputParamxmlWithDistrict;
		},
		
		setSelectedRecord: function () {
			return true;
		},
		setData_in_export : function (data, j) {
			var obj = {
				value : data,
				wrap : true,
				vAlign : "bottom",
				hAlign : "center"
			};
			return obj;
		},	
		getExportConfig : function (gridId) {
			if(gridId == "enquiry_coverage_tracking_grid_1_export_btn"){
				return {
					type : "csv",
					template : "enquiry_coverage_tracking",
					service : "sp_retrieve_listof_values_for_searchcondition",
					request : "<signature><i_inputparam_xml>" + enquiry_coverage_tracking.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + enquiry_coverage_tracking.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : enquiry_coverage_tracking.variable.custom.grid_1.dataSource.data().length
				};
			}
		},
		initializeMap: function () {
			var fullScreenIcon;
			enquiry_coverage_tracking.variable.custom.map = new google.maps.Map(document.getElementById("enquiry_coverage_tracking_map"), {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoom: 14
				});
			google.maps.event.addListenerOnce(enquiry_coverage_tracking.variable.custom.map, 'idle', function () {
				google.maps.event.trigger(enquiry_coverage_tracking.variable.custom.map, 'resize');
			});
			fullScreenIcon = document.createElement("img");
			fullScreenIcon.setAttribute("id", "enquiry_coverage_tracking_map_full_screen_icon");
			fullScreenIcon.setAttribute("src", "../../common/images/map_full_screen.png");
			fullScreenIcon.setAttribute("data-widget-type", "w_link");
			fullScreenIcon.setAttribute("data-link-type", "toggle_full_screen");
			fullScreenIcon.setAttribute("style", "text-decoration: underline; color: blue; cursor: pointer; padding: 10px");
			enquiry_coverage_tracking.variable.custom.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(fullScreenIcon);
		},
		refreshMap: function () {
			if (enquiry_coverage_tracking.variable.custom.datasource_1.data().length != 0) {
				enquiry_coverage_tracking.variable.custom.bound = new google.maps.LatLngBounds();
				for (var markerListCounter = 0; markerListCounter < enquiry_coverage_tracking.variable.custom.datasource_1.data().length; markerListCounter++) {
					var latLngPosition = new google.maps.LatLng(parseFloat(enquiry_coverage_tracking.variable.custom.datasource_1.data()[markerListCounter].p_lattitude_val), parseFloat(enquiry_coverage_tracking.variable.custom.datasource_1.data()[markerListCounter].p_longitude_val));
					var infowindow = new google.maps.InfoWindow();
					if (enquiry_coverage_tracking.variable.custom.datasource_1.data()[markerListCounter].p_lattitude_val != '' && enquiry_coverage_tracking.variable.custom.datasource_1.data()[markerListCounter].p_longitude_val != '') {
						
						for (var i = 0; i< enquiry_coverage_tracking.variable.custom.datasource_3.data().length; i++){
							 if (enquiry_coverage_tracking.variable.custom.datasource_3.data()[i].district_name == enquiry_coverage_tracking.variable.custom.datasource_1.data()[markerListCounter].district_name){
								 var districtCount = enquiry_coverage_tracking.variable.custom.datasource_3.data()[i].district_count;
							 }
						}
						var marker = new google.maps.Marker({
							position: latLngPosition,
							map: enquiry_coverage_tracking.variable.custom.map,
							label: {color: '#000', fontSize: '12px', fontWeight: '600',text: districtCount}
						});
						enquiry_coverage_tracking.variable.custom.bound.extend(latLngPosition);
						google.maps.event.addListener(enquiry_coverage_tracking.variable.custom.map, 'click', function () {
							infowindow.close();
						}); 
						google.maps.event.addListener(marker, 'click', (function (marker, markerListCounter) {
							return function () {
								var a = {};
								var district_namevsS = enquiry_coverage_tracking.variable.custom.datasource_1.data()[markerListCounter].district_name;
								var district_code = enquiry_coverage_tracking.variable.custom.datasource_1.data()[markerListCounter].district_code;
								var grepstatus = $.grep(enquiry_coverage_tracking.variable.custom.datasource_1.data(), function (element, index) {
									return ((element.district_name == district_namevsS ));
								});
								total_callstatus = enquiry_coverage_tracking.variable.custom.call_status.data();
								var infoContent = "<table style = 'margin-top:3px; font-size: small; font-weight: bold;'>";
								for (var j= 0; j < grepstatus.length; j++ ){
									currentstatus = grepstatus[j].call_status;
									if (Object.keys(a).length == 0)
										a[currentstatus] = 1;
									else {
										if (a[currentstatus]){
											a[currentstatus] = a[currentstatus] +1 ;
										}
										else 
											a[currentstatus] = 1;
									}
								}
								for (var z= 0; z< total_callstatus.length; z++){
									temp = total_callstatus[z].description;
									code = total_callstatus [z].code;
									if(a[temp]){
										infoContent += 	"<tr style='padding:2px; text-decoration: underline; color: blue; height:20px; cursor: pointer'; status= "+ code +" location = "+district_code +" data-widget-type = 'w_link'; data-link-type = 'call_job_reference'><td>"+((temp=='Assigned')?'Yet To Qualify' : temp)+"</td><td style='padding-left: 10px; padding-right: 10px;'>:</td><td>" + a[temp] + "</td></tr>"; 
										
									}
								}
								
								infoContent +=  "</table>";
								infowindow.setContent(infoContent);
								infowindow.open(enquiry_coverage_tracking.variable.custom.map, marker);
							}
						})(marker, markerListCounter));
						/*google.maps.event.addListener(marker, 'mouseout', (function (marker, markerListCounter) {
							return function () {
								infowindow.close(enquiry_coverage_tracking.variable.custom.map, marker);
							}
						})(marker, markerListCounter));
						*/
					}					
				};
				enquiry_coverage_tracking.variable.custom.map.setCenter(enquiry_coverage_tracking.variable.custom.bound.getCenter());
				enquiry_coverage_tracking.variable.custom.map.fitBounds(enquiry_coverage_tracking.variable.custom.bound);
			} else {
				enquiry_coverage_tracking.variable.custom.map.setCenter(new google.maps.LatLng(20.5937, 78.9629));
				enquiry_coverage_tracking.variable.custom.map.setZoom(2);
			}
		}
	},
	variable: {
		standard: {
			reorderParam: [{
					contentID: "content_1",
					columnLength: 3
				}
			],
			importConfiguration: {
				imformationType: 'enquiry_coverage_tracking'
			},
			exportConfiguration: {
				mode: "single",
				content: [{
						exportType: "grid",
						fieldId: "enquiry_coverage_tracking_map",
						dispalyLabel: "Data Export"
					}
				]
			},
			printConfiguration: {
				mode: "single",
				content: [{
						type: "grid",
						fieldId: "enquiry_coverage_tracking_map",
						dispalyLabel: "Data Export"
					}
				]
			}
		},
		custom: {
			markerList: [],
			infoWindowList: [],
			autoRefreshTime: 600000,
			fullScreenView: false
		},
	}
};