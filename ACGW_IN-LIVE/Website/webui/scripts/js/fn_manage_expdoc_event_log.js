var manage_expdoc_event_log = {
	constructScreen : function () {
		manage_expdoc_event_log.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_expdoc_event_log",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_expdoc_ref_no : "$manage_expdoc_header.variable.custom.selectedRecord.expdoc_ref_no"
				},
				schemaModel : true,
				screenID : "manage_expdoc_event_log",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		manage_expdoc_event_log.variable.custom.datasource_1.read();
	},
	initializeWidgets : function () {
		$("#manage_expdoc_event_log_expdoc_number").initializeWDisplayarea({
			screenID : "manage_expdoc_event_log",
			defaultValue : "$manage_expdoc_event_log.variable.custom.expdoc_number_defaultValue"
		});
		$("#manage_expdoc_event_log_expdoc_status").initializeWDisplayarea({
			screenID : "manage_expdoc_event_log",
			defaultValue : "$manage_expdoc_event_log.variable.custom.expdoc_status_defaultValue"
		});
		manage_expdoc_event_log.variable.custom.grid_1 = $("#manage_expdoc_event_log_grid_1").initializeWGrid({
				screenID : "manage_expdoc_event_log",
				dataSource : manage_expdoc_event_log.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
			importConfiguration : {
				imformationType : 'expdoc_event_log'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_expdoc_event_log_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_expdoc_event_log_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			expdoc_number_defaultValue : manage_expdoc_header.variable.custom.selectedRecord.expdoc_ref_no,
			expdoc_status_defaultValue : mserviceUtilities.getDescriptionForCode("EXPENSESTATUS_DESC", manage_expdoc_header.variable.custom.selectedRecord.expdoc_status, "")
		}
	}
};
