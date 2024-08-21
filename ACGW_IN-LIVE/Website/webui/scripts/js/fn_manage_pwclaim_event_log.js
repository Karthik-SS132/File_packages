var manage_pwclaim_event_log = {
	constructScreen : function () {
		manage_pwclaim_event_log.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_txn_event_log",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_txn_type_code : "'PWCLAIM'",
					p_txn_ref_no : "$manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no"
				},
				schemaModel : true,
				screenID : "manage_pwclaim_event_log",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		manage_pwclaim_event_log.variable.custom.datasource_1.read();
	},
	initializeWidgets : function () {
		$("#manage_pwclaim_event_log_pwclaim_number").initializeWDisplayarea({
			screenID : "manage_pwclaim_event_log",
			defaultValue : "$manage_pwclaim_event_log.variable.custom.pwclaim_number_defaultValue"
		});
		$("#manage_pwclaim_event_log_pwclaim_status").initializeWDisplayarea({
			screenID : "manage_pwclaim_event_log",
			defaultValue : "$manage_pwclaim_event_log.variable.custom.pwclaim_status_defaultValue"
		});
		manage_pwclaim_event_log.variable.custom.grid_1 = $("#manage_pwclaim_event_log_grid_1").initializeWGrid({
				screenID : "manage_pwclaim_event_log",
				dataSource : manage_pwclaim_event_log.variable.custom.datasource_1,
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
				imformationType : 'pwclaim_event_log'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_pwclaim_event_log_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_pwclaim_event_log_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			pwclaim_number_defaultValue : manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no,
			pwclaim_status_defaultValue : mserviceUtilities.getDescriptionForCode("PWCLAIMSTATUS_LIST", manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_status, "")
		}
	}
};