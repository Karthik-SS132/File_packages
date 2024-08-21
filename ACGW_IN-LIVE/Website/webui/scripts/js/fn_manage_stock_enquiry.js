var manage_stock_enquiry = {
	constructScreen: function () {
		manage_stock_enquiry.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName: "mservice",
				serviceName: "retrieve_stock_enquiry",
				outputPath: "context/outputparam_detail",
				pageSize: 50,
				inputParameter: {
					p_inputparam_xml: "manage_stock_enquiry.customRequirementHandler.getFilterValues()"
				},
				schemaModel: true,
				screenID: "manage_stock_enquiry",
				dataSourceName: "datasource_1",
				processResponse: true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_stock_enquiry_filterArea = $("#manage_stock_enquiry_pane2");
		$("#manage_stock_enquiry_content_1 span dt").removeClass("term_one");
		$("#manage_stock_enquiry_content_1 span dt").removeClass("term_two");
		$("#manage_stock_enquiry_content_1 span dd.colen").html("");
		$("#manage_stock_enquiry_content_1").find('dt').css("width","120px");
		$("#manage_stock_enquiry_editor").append("<li id='manage_stock_enquiry_grid_pager'></li>");
		$("#manage_stock_enquiry_grid_pager").append($("#manage_stock_enquiry_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_stock_enquiry_grid_1").data("kendoGrid").bind("dataBound", manage_stock_enquiry.customRequirementHandler.gridPager);
		if(manage_stock_enquiry.variable.custom.autoLoadInd == "true") {
			manage_stock_enquiry.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_stock_enquiry_splitter[manage_stock_enquiry_filterArea.width() > 0 ? "collapse" : "expand"](manage_stock_enquiry_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_stock_enquiry_content_1",
					screenID : "manage_stock_enquiry",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_stock_enquiry_content_1",
				screenID : "manage_stock_enquiry",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets: function () {
		manage_stock_enquiry.variable.custom.grid_1 = $("#manage_stock_enquiry_grid_1").initializeWGrid({
				screenID: "manage_stock_enquiry",
				dataSource: manage_stock_enquiry.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
	   $("#manage_stock_enquiry_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_stock_enquiry_editor").kendoMenu();		
		manage_stock_enquiry_splitter = $("#manage_stock_enquiry_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_stock_enquiry.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen: function () {
		manage_stock_enquiry.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler: {
		crud_btn_click: function (element, event) {
			if (manage_stock_enquiry.variable.custom.crudIndicator == "R") {
				manage_stock_enquiry.variable.custom.grid_1.dataSource._skip = 0;
				manage_stock_enquiry.variable.custom.grid_1.dataSource.pageSize(50);
			}
		},
	    misc_btn_click : function (element, event){
			if(manage_stock_enquiry.variable.custom.miscID == "filters"){
				manage_stock_enquiry_splitter[manage_stock_enquiry_filterArea.width() > 0 ? "collapse" : "expand"](manage_stock_enquiry_filterArea);
			};
			if(manage_stock_enquiry.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_stock_enquiry_content_1",
					screenID : "manage_stock_enquiry",
					matchCondition : ["_filter"]
				});
				$("#manage_stock_enquiry_filters_btn .k-i-filter").css("color","black");
			};
			if(manage_stock_enquiry.variable.custom.miscID == "asset_id_list"){
				if (manage_stock_enquiry.variable.custom.grid_1.select().length != 0) {
					manage_stock_enquiry.variable.custom.selectedRecord = manage_stock_enquiry.variable.custom.grid_1.dataSource.getByUid(manage_stock_enquiry.variable.custom.grid_1.select().data("uid"));
					if (manage_stock_enquiry.variable.custom.selectedRecord.item_category == "EQUIPMENT" ) {
						$("#manage_stock_enquiry").append("<div id = 'manage_stock_enquiry_window'><div id = 'manage_stock_enquiry_window_grid'></div></div>");
						$("#manage_stock_enquiry_window").kendoWindow({
							width : "400px",
							height : "400px",
							title : "Serial No List",
							visible : false,
							modal : true,
							deactivate : function () {
								this.destroy();
							},
						});
						manage_stock_enquiry.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
							applicationName : "common_modules",
							serviceName : "retrieve_listof_values_for_searchcondition",
							outputPath : "context/outputparam",
							inputParameter : {
								p_inputparam_xml : "<inputparam><lov_code_type>'STOCK_ASSET_LIST'</lov_code_type><search_field_1>$manage_stock_enquiry.variable.custom.selectedRecord.item_code</search_field_1><search_field_2>$manage_stock_enquiry.variable.custom.selectedRecord.item_variant_code</search_field_2><search_field_3>$manage_stock_enquiry.variable.custom.selectedRecord.warehouse_id</search_field_3></inputparam>"
							},
							screenID : "manage_stock_enquiry",
						});
						$("#manage_stock_enquiry_window_grid").kendoGrid({
							dataSource : manage_stock_enquiry.variable.custom.datasource_2,
							height : 380,
							columns : [{
									field : "sl_no",
									title : "Sl.No",
									width : 60
								},{
									field : "code",
									title : "Equipment Serial #",
									width : 160
								},{
									field : "stock_on_hand",
									title : "Stock Available",
									width : 140
								}],
							sortable : true
						});
						$("#manage_stock_enquiry_window").data("kendoWindow").center().open();
						$("#manage_stock_enquiry_window_grid").data("kendoGrid").refresh();
					} else {
						alert("Sorry. This feature is unavailable for the choosen record.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			};
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_stock_enquiry_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_stock_enquiry_contextMenu").show();
		}
	},
	customRequirementHandler: {
		gridPager : function () {
			$("#manage_stock_enquiry_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_stock_enquiry_grid_1").find(".k-grid-header").height());
		},
		getFilterValues: function () {
			return $("#manage_stock_enquiry_content_1").getInputparamXML({
				screenID: "manage_stock_enquiry",
				matchCondition: ["_filter"]
			});
		},
		setSelectedRecord: function () {
			manage_stock_enquiry.variable.custom.selectedRecord = manage_stock_enquiry.variable.custom.grid_1.dataSource.getByUid(manage_stock_enquiry.variable.custom.grid_1.select().data("uid"));
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_stock_enquiry_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_stock_enquiry",
					service : "sp_retrieve_stock_enquiry",
					request : "<signature><i_inputparam_xml>" + manage_stock_enquiry.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_stock_enquiry.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_stock_enquiry.variable.custom.grid_1.dataSource.data().length
				};
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
			exportConfiguration: {
				mode: "single",
				content: [{
						exportType: "grid",
						fieldId: "manage_stock_enquiry_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			},
			printConfiguration: {
				mode: "single",
				content: [{
						type: "grid",
						fieldId: "manage_stock_enquiry_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			}
		},
		custom: {}
	}
};
