var dataSource = {
	call_list : new kendo.data.DataSource({
		pageSize : 10,
		offlineStorage : "myCalls",
		transport : {
			read : {
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : "http://203.124.121.207:81/GetMyCalls.aspx",
				complete : function (data, textstatus) {},
			},
			update : {
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : "http://203.124.121.207:81/GetMyCalls.aspx",
				complete : function (data, textstatus) {},
			},
			parameterMap : function (options, operation) {
				return JSON.stringify(options);
			}
		},
		schema : {
			model : {
				id : "call_ref_no",
				fields : {
					"call_category" : {
						editable : true
					},
					"call_type" : {
						editable : true
					},
					"call_wf_stage_no" : {
						editable : true
					},
					"call_status" : {
						editable : true
					},
					"call_status_log" : {
						editable : true
					}
				}
			}
		}
	}),
	call_detail : new kendo.data.DataSource({
		schema : {
			model : {
				fields : {
					"event_date" : {
						editable : true
					},
					"channel_id" : {
						editable : true
					},
					"from_wf_stage_no" : {
						editable : true
					},
					"to_wf_stage_no" : {
						editable : true
					},
					"from_status" : {
						editable : true
					},
					"to_status" : {
						editable : true
					}
				}
			}
		}
	})
};
