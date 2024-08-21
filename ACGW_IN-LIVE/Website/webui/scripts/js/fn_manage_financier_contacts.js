var manage_financier_contacts = {
	constructScreen : function () {
		manage_financier_contacts.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_custom_info_list",
				outputPath : "outputparam_detail",
				api : true,
				pageSize : 50,
				inputParameter : {
					p_custom_info_code : "'financier_location_contacts'",
					p_inputparam_xml : "manage_financier_contacts.customRequirementHandler.getFilterValues()"
				},
				screenID : "manage_financier_contacts",
				schemaModel : true,
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_financier_contacts_filterArea = $("#manage_financier_contacts_pane2");
		$("#manage_financier_contacts_content_1 span dt").removeClass("term_one");
		$("#manage_financier_contacts_content_1 span dt").removeClass("term_two");
		$("#manage_financier_contacts_content_1 span dd.colen").html("");
		$("#manage_financier_contacts_content_1").find('dt').css("width","120px");
		$("#manage_financier_contacts_editor").append("<li id='manage_financier_contacts_grid_pager'></li>");
		$("#manage_financier_contacts_grid_pager").append($("#manage_financier_contacts_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_financier_contacts_grid_1").data("kendoGrid").bind("dataBound", manage_financier_contacts.customRequirementHandler.gridPager);
		if(manage_financier_contacts.variable.custom.autoLoadInd == "true") {
			manage_financier_contacts.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_financier_contacts_splitter[manage_financier_contacts_filterArea.width() > 0 ? "collapse" : "expand"](manage_financier_contacts_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_financier_contacts_content_1",
					screenID : "manage_financier_contacts",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_financier_contacts_content_1",
				screenID : "manage_financier_contacts",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_financier_contacts.variable.custom.grid_1 = $("#manage_financier_contacts_grid_1").initializeWGrid({
				screenID : "manage_financier_contacts",
				dataSource : manage_financier_contacts.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_financier_contacts_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_financier_contacts_editor").kendoMenu();		
		manage_financier_contacts_splitter = $("#manage_financier_contacts_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_financier_contacts.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_financier_contacts.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_financier_contacts.variable.custom.crudIndicator == "R") {
				manage_financier_contacts.variable.custom.grid_1.dataSource._skip = 0;
				manage_financier_contacts.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_financier_contacts_edit.js", "../../s_iscripts/custominfo_setDetail.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_financier_contacts",
						nextScreenID : "manage_financier_contacts_edit",
						nextScreenName : manage_financier_contacts.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_financier_contacts.variable.custom.miscID == "filters"){
				manage_financier_contacts_splitter[manage_financier_contacts_filterArea.width() > 0 ? "collapse" : "expand"](manage_financier_contacts_filterArea);
			}
			if(manage_financier_contacts.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_financier_contacts_content_1",
					screenID : "manage_financier_contacts",
					matchCondition : ["_filter"]
				});
				$("#manage_financier_contacts_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_financier_contacts.variable.custom.selectedFeatureID == "manage_financier_contacts_location") {
				if (manage_financier_contacts.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_financier_contacts_location.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_financier_contacts",
							nextScreenID : "manage_financier_contacts_location",
							nextScreenName : manage_financier_contacts.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_financier_contacts_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_financier_contacts_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_financier_contacts_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_financier_contacts_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_financier_contacts_content_1").getInputparamXML({
				screenID : "manage_financier_contacts",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_financier_contacts.variable.custom.selectedRecord = manage_financier_contacts.variable.custom.grid_1.dataSource.getByUid(manage_financier_contacts.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'CUSTMAST'",
				p_field_1 : "$manage_financier_contacts.variable.custom.selectedRecord.cust_id"
			};
		}, 
		getExportConfig : function (gridId) {
			if(gridId == "manage_financier_contacts_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_financier_contacts",
					service : "sp_retrieve_manage_financier_contacts_list",
					request : "<signature><i_inputparam_xml>" + manage_financier_contacts.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_financier_contacts.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_financier_contacts.variable.custom.grid_1.dataSource.data().length
				};
			}
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_financier_contacts_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_financier_contacts_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};