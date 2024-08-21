var manage_invoice_event_log = {
	constructScreen : function () {
		manage_invoice_event_log.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_invoice_event_log",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_invoice_ref_no : "$manage_invoice_header.variable.custom.selectedRecord.invoice_no"
				},
				schemaModel : true,
				screenID : "manage_invoice_event_log",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		manage_invoice_event_log.variable.custom.datasource_1.read();
	},
	initializeWidgets : function () {
		$("#manage_invoice_event_log_invoice_number").initializeWDisplayarea({
			screenID : "manage_invoice_event_log",
			defaultValue : "$manage_invoice_event_log.variable.custom.invoice_number_defaultValue"
		});
		$("#manage_invoice_event_log_invoice_status").initializeWDisplayarea({
			screenID : "manage_invoice_event_log",
			defaultValue : "$manage_invoice_event_log.variable.custom.invoice_status_defaultValue"
		});
		manage_invoice_event_log.variable.custom.grid_1 = $("#manage_invoice_event_log_grid_1").initializeWGrid({
				screenID : "manage_invoice_event_log",
				dataSource : manage_invoice_event_log.variable.custom.datasource_1,
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
				imformationType : 'invoice_event_log'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_invoice_event_log_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_invoice_event_log_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			invoice_number_defaultValue : manage_invoice_header.variable.custom.selectedRecord.invoice_no,
			invoice_status_defaultValue : mserviceUtilities.getDescriptionForCode("INVOICESTATUS_DESC", manage_invoice_header.variable.custom.selectedRecord.invoice_status, "")
		}
	}
};
