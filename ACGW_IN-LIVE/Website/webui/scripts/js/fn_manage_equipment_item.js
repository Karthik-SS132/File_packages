var manage_equipment_item = {
	constructScreen : function () {
		manage_equipment_item.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_custom_info_list",
				outputPath : "outputparam_detail",
				api : true,
				pageSize : 50,
				inputParameter : {
					p_custom_info_code : "'equipment_item_link'",
					p_inputparam_xml : "manage_equipment_item.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_equipment_item",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_equipment_item_filterArea = $("#manage_equipment_item_pane2");
		$("#manage_equipment_item_content_1 span dt").removeClass("term_one");
		$("#manage_equipment_item_content_1 span dt").removeClass("term_two");
		$("#manage_equipment_item_content_1 span dd.colen").html("");
		$("#manage_equipment_item_content_1").find('dt').css("width","120px");
		$("#manage_equipment_item_editor").append("<li id='manage_equipment_item_grid_pager'></li>");
		$("#manage_equipment_item_grid_pager").append($("#manage_equipment_item_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_equipment_item_grid_1").data("kendoGrid").bind("dataBound", manage_equipment_item.customRequirementHandler.gridPager);
		if(manage_equipment_item.variable.custom.autoLoadInd == "true") {
			manage_equipment_item.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_equipment_item_splitter[manage_equipment_item_filterArea.width() > 0 ? "collapse" : "expand"](manage_equipment_item_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_equipment_item_content_1",
					screenID : "manage_equipment_item",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_equipment_item_content_1",
				screenID : "manage_equipment_item",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_equipment_item.variable.custom.grid_1 = $("#manage_equipment_item_grid_1").initializeWGrid({
				screenID : "manage_equipment_item",
				dataSource : manage_equipment_item.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
	   $("#manage_equipment_item_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_equipment_item_editor").kendoMenu();		
		manage_equipment_item_splitter = $("#manage_equipment_item_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_equipment_item.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_equipment_item.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_equipment_item.variable.custom.crudIndicator == "R") {
				manage_equipment_item.variable.custom.grid_1.dataSource._skip = 0;
				manage_equipment_item.variable.custom.grid_1.dataSource.pageSize(50);
			} else if (manage_equipment_item.variable.custom.crudIndicator == "D") {
				if (mserviceUtilities.loadJSScripts(["../../s_iscripts/custominfo_setDetail.js"])) {
					var returnValue,
					recordTimeStamp,
					inputparamDetail1,
					inputparamDetail2,
					inputparamDetail3,
					inputparamDetail4,
					inputparamDetail5,
					inputparamDetail1 = [];
					inputparamDetail2 = [];
					inputparamDetail3 = [];
					inputparamDetail4 = [];
					inputparamDetail5 = [];
					recordTimeStamp = "00000000-0000-0000-0000-000000000000";
					returnValue = common_modules_custominfo_setDetail.invokeAPI({
					p_custom_info_code : "EquipmentItemLink",
					p_custom_info_ref_no1: manage_equipment_item.variable.custom.selectedRecord.equipment_id,
					p_custom_info_ref_no2: manage_equipment_item.variable.custom.selectedRecord.item_code,
					p_inputparam_header_xml : "<inputparam><equipment_id>" + manage_equipment_item.variable.custom.selectedRecord.equipment_id  + "</equipment_id><item_code>" + manage_equipment_item.variable.custom.selectedRecord.item_code + "</item_code><link_type>" + manage_equipment_item.variable.custom.selectedRecord.link_type + "</link_type></inputparam>",
					p_rec_timestamp : recordTimeStamp,
					p_save_mode : manage_equipment_item.variable.custom.crudIndicator,
					inputparam_detail1 : inputparamDetail1,
					inputparam_detail2 : inputparamDetail2,
					inputparam_detail3 : inputparamDetail3,
					inputparam_detail4 : inputparamDetail4,
					inputparam_detail5 : inputparamDetail5
					});
					if (returnValue.update_status == "SP001") {
						alert("Delete Item-Link successfully");
						return true;
					} else {
						alert("Failed to Delete");
						return true;
					}
					manage_equipment_item.refreshScreen();
				}
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_equipment_item_edit.js", "../../s_iscripts/custominfo_setDetail.js"])) {
					if (manage_equipment_item.variable.custom.crudIndicator == "A") {
						manage_equipment_item.variable.custom.nextScreenName = "Add";
					}
					webNavigationController.gotoNextScreen({
						screenID : "manage_equipment_item",
						fieldID : "manage_equipment_item_child_window",
						nextScreenID : "manage_equipment_item_edit",
						nextScreenName : manage_equipment_item.variable.custom.nextScreenName,
						execute : manage_equipment_item_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_equipment_item.variable.custom.miscID == "filters"){
				manage_equipment_item_splitter[manage_equipment_item_filterArea.width() > 0 ? "collapse" : "expand"](manage_equipment_item_filterArea);
			}
			if(manage_equipment_item.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_equipment_item_content_1",
					screenID : "manage_equipment_item",
					matchCondition : ["_filter"]
				});
				$("#manage_equipment_item_filters_btn .k-i-filter").css("color","black");
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_equipment_item_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_equipment_item_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_equipment_item_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_equipment_item_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_equipment_item_content_1").getInputparamXML({
				screenID : "manage_equipment_item",
				matchCondition : ["_filter"]
			});
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'EQUIPITEMLINK'",
				p_field_1 : "$manage_equipment_item.variable.custom.selectedRecord.equipment_category",
				p_field_2 : "$manage_equipment_item.variable.custom.selectedRecord.equipment_type",
				p_field_3 : "$manage_equipment_item.variable.custom.selectedRecord.equipment_id",
				p_field_4 : "$manage_equipment_item.variable.custom.selectedRecord.item_code",
				p_field_5 : "$manage_equipment_item.variable.custom.selectedRecord.item_variant_code",
				p_field_6 : "$manage_equipment_item.variable.custom.selectedRecord.rec_tstamp"
			};
		},
		setSelectedRecord : function () {
			manage_equipment_item.variable.custom.selectedRecord = manage_equipment_item.variable.custom.grid_1.dataSource.getByUid(manage_equipment_item.variable.custom.grid_1.select().data("uid"));
		},
	    getExportConfig : function (gridId) {
			if(gridId == "manage_equipment_item_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_equipment_item",
					service : "sp_retrieve_manage_custom_info_list",
					request : "<signature><i_inputparam_xml>" + manage_equipment_item.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + ((manage_equipment_item.variable.custom.grid_1.dataSource.data()[0] !== undefined ) ? (manage_equipment_item.variable.custom.grid_1.dataSource.data()[0].total) : ("0")) + "</take></inputparam>") + "</i_inputparam_xml><i_custom_info_code>EquipmentItemLink</i_custom_info_code><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_equipment_item.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_equipment_item_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_equipment_item_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			customDelete : true
		}
	}
};