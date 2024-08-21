var manage_item_master = {
	constructScreen : function () {
		manage_item_master.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "mservice",
				serviceName : "retrieve_item_master_list",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_item_master.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_item_master",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_item_master_filterArea = $("#manage_item_master_pane2");
		$("#manage_item_master_content_1 span dt").removeClass("term_two");
		$("#manage_item_master_content_1 span dt").removeClass("term_one");
		$("#manage_item_master_content_1 span dd.colen").html("");
		$("#manage_item_master_content_1").find('dt').css("width","120px");
		$("#manage_item_master_content_1").find('dd.value').css("width","160px");
		$("#manage_item_master_editor").append("<li id='manage_item_master_grid_pager'></li>");
		$("#manage_item_master_grid_pager").append($("#manage_item_master_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_item_master_grid_1").data("kendoGrid").bind("dataBound", manage_item_master.customRequirementHandler.gridPager);
		if(manage_item_master.variable.custom.autoLoadInd == "true") {
			manage_item_master.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_item_master_splitter[manage_item_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_item_master_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_item_master_content_1",
					screenID : "manage_item_master",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_item_master_content_1",
				screenID : "manage_item_master",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		$("#manage_item_master_item_category_filter").initializeWDropdownlist({
			screenID : "manage_item_master",
			dataSource : {
				informationType : "'ITEMCATG_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID: "manage_item_master_item_type_filter",
			filterMode : true
		});
		$("#manage_item_master_item_type_filter").initializeWDropdownlist({
			screenID : "manage_item_master",
			dataSource : {
				informationType : "'ITEMTYPE_LIST_LINKED'",
				searchField1: "#manage_item_master_item_category_filter"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			filterMode : true
		});
		manage_item_master.variable.custom.grid_1 = $("#manage_item_master_grid_1").initializeWGrid({
				screenID : "manage_item_master",
				dataSource : manage_item_master.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_item_master_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_item_master_editor").kendoMenu();		
		manage_item_master_splitter = $("#manage_item_master_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_item_master.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_item_master.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_item_master.variable.custom.crudIndicator == "R") {
				manage_item_master.variable.custom.grid_1.dataSource._skip = 0;
				manage_item_master.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_item_master_edit.js", "../../s_iscripts/save_item_master_details.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_item_master",
						nextScreenID : "manage_item_master_edit",
						nextScreenName : manage_item_master.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_item_master.variable.custom.miscID == "filters"){
				manage_item_master_splitter[manage_item_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_item_master_filterArea);
			}
			if(manage_item_master.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_item_master_content_1",
					screenID : "manage_item_master",
					matchCondition : ["_filter"]
				});
				$("#manage_item_master_filters_btn .k-i-filter").css("color","black");
			}
		},
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_item_master_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_item_master_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_item_master_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_item_master_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_item_master_content_1").getInputparamXML({
				screenID : "manage_item_master",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_item_master.variable.custom.selectedRecord = manage_item_master.variable.custom.grid_1.dataSource.getByUid(manage_item_master.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'ITEM_MASTER'",
				p_field_1 : "$manage_item_master.variable.custom.selectedRecord.item_code",
				p_field_2 : "$manage_item_master.variable.custom.selectedRecord.variant_code",
				p_field_3 : "$manage_item_master.variable.custom.selectedRecord.rec_tstamp"
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_item_master_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_item_master",
					service : "sp_retrieve_item_master_list",
					request : "<signature><i_inputparam_xml>" + manage_item_master.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_item_master.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_item_master.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_item_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_item_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {}
	}
};