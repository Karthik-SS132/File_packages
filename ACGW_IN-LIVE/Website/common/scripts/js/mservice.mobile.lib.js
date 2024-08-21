var mservice = {
	config : {},
	dSource : {
		define : function () {
			mservice.dSource.callList = new kendo.data.DataSource({
					pageSize : 10,
					offlineStorage : "myCalls",
					transport : {
						read : mservice.dSource.util.getTransportObj({
							service : "GetMyCalls"
						}),
						update : mservice.dSource.util.getTransportObj({
							service : "GetMyCalls"
						}),
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
								"customer_id" : {
									editable : true
								},
								"customer_location_code" : {
									editable : true
								},
								"company_location_code" : {
									editable : true
								},
								"organogram_level_no" : {
									editable : true
								},
								"organogram_level_code" : {
									editable : true
								},
								"asset_id" : {
									editable : true
								},
								"asset_location_code_reported" : {
									editable : true
								},
								"equipment_id" : {
									editable : true
								},
								"problem_description" : {
									editable : true
								},
								"additional_information" : {
									editable : true
								},
								"priority_code" : {
									editable : true
								},
								"customer_contact_name" : {
									editable : true
								},
								"customer_contact_no" : {
									editable : true
								},
								"customer_contact_email_id" : {
									editable : true
								},
								"sch_start_date" : {
									editable : true
								},
								"sch_finish_date" : {
									editable : true
								},
								"plan_duration" : {
									editable : true
								},
								"plan_duration_uom" : {
									editable : true
								},
								"plan_work" : {
									editable : true
								},
								"plan_work_uom" : {
									editable : true
								},
								"act_start_date" : {
									editable : true
								},
								"act_finish_date" : {
									editable : true
								},
								"actual_duration" : {
									editable : true
								},
								"actual_work" : {
									editable : true
								},
								"system_user_generation_ind" : {
									editable : true
								},
								"created_by_employee_id" : {
									editable : true
								},
								"created_on_date" : {
									editable : true
								},
								"closed_by_employee_id" : {
									editable : true
								},
								"closed_on_date" : {
									editable : true
								},
								"billable_nonbillable_ind" : {
									editable : true
								},
								"charges_currency_code" : {
									editable : true
								},
								"charges_gross_amount" : {
									editable : true
								},
								"charges_tax_amount" : {
									editable : true
								},
								"charges_discount_amount" : {
									editable : true
								},
								"charges_net_amount" : {
									editable : true
								},
								"call_mapped_to_func_role" : {
									editable : true
								},
								"call_mapped_to_employee_id" : {
									editable : true
								},
								"service_contract_doc_no" : {
									editable : true
								},
								"job_order_creation_status" : {
									editable : true
								},
								"job_order_no" : {
									editable : true
								},
								"job_order_created_by_emp_id" : {
									editable : true
								},
								"job_order_created_on_date" : {
									editable : true
								},
								"asset_in_warranty_ind" : {
									editable : true
								},
								"call_event_log" : {
									editable : true
								}
							}
						}
					}
				})
		},
		util : {
			getTransportObj : function (iObj) {
				return {
					type : "POST",
					dataType : "json",
					async : false,
					contentType : "application/json; charset=utf-8",
					url : mservice.dSource.util.getUrl(iObj),
					complete : mservice.dSource.util.processResponse
				};
			},
			getUrl : function (iObj) {
				return mservice.dSource.util.getWebserverpath() + iObj.service + ".aspx";
			},
			getWebserverpath : function () {
				return (login_profile.app_mode == "MOBILE_NATIVE") ? (login_profile.protocol + "//" + login_profile.domain_name + ":" + login_profile.portno + "/") : (login_profile.protocol + "//" + window.location.host + "/");
			},
			processResponse : function (data, status) {
				var response;
				if (status == "success") {
					response = JSON.parse(data.responseText);
					if (response.document != undefined) {
						if (response.document.ApplicationException != undefined) {
							if (response.document.ApplicationException.errorNumber != "") {
								alert(response.document.ApplicationException.errorNumber + " : " + response.document.ApplicationException.errorDescription);
							} else {
								alert("Unable to process your request.");
							}
						}
					} else {
						if (response.length == 0) {
							alert("No records found.");
						};
						return true;
					}
				} else if (status == "timeout") {
					alert("Sorry your request is timed out. Please try again.");
				} else {
					alert("Unable to process your request.");
				};
				return false;
			},
			updateCallStatusChange : function (iObj) {
				if (iObj.event == "ASSIGN") {
					return true;
				} else if (iObj.event == "CUSTCLOSURE") {
					return true;
				} else if (iObj.event == "HOLD") {
					return true;
				} else if (iObj.event == "PROGRESSUPDATE") {
					return true;
				} else if (iObj.event == "REASSIGN") {
					return true;
				} else if (iObj.event == "RELEASEHOLD") {
					return true;
				} else if (iObj.event == "REOPEN") {
					return true;
				} else if (iObj.event == "REPLAN") {
					return true;
				} else if (iObj.event == "START") {
					return true;
				} else if (iObj.event == "STATUSCHANGE") {
					return true;
				} else if (iObj.event == "WORKCOMPLETE") {
					return true;
				}
			},
		}
	},
	init : {},
	page : {
		getCallHomeWidgets : function (iObj) {
			var index,
			column,
			wflowFeatures,
			featureCheck,
			wflowCheck,
			returnHtml;
			column = 0;
			returnHtml = "<a href = '#' data-rel = 'back' class = 'ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right'>Close</a>";
			returnHtml += "<div data-role = 'main' class = 'ui-content'>";
			returnHtml += "<div class = 'ui-grid-b'>";
			wflowFeatures = mservice.util.getCallWflowFeatures(iObj);
			for (index in mservice.page.variable.callHome) {
				featureCheck = $.grep(access_profile.user_functional_access, function (e, i) {
						return e.child_screen_id == mservice.page.variable.callHome[index].role;
					})[0];
				if (featureCheck != undefined) {
					if (mservice.page.variable.callHome[index].group == "workflow") {
						wflowCheck = $.grep(wflowFeatures, function (e, i) {
								return e.event_verb == mservice.page.variable.callHome[index].role;
							})[0];
						if (wflowCheck != undefined) {
							returnHtml += mservice.page.util.getCallHomeHtml({
								widget : mservice.page.variable.callHome[index],
								column : column % 3
							});
							column++;
						}
					} else {
						if(mservice.page.variable.callHome[index].name == "T-Start") {
							if(tripSheet.tripStartDisplay) { 
								returnHtml += mservice.page.util.getCallHomeHtml({
									widget : mservice.page.variable.callHome[index],
									column : column % 3
								});
								column++;
							}
						} else if(mservice.page.variable.callHome[index].name == "T-Finish") {
							if(tripSheet.tripFinishDisplay) { 
								returnHtml += mservice.page.util.getCallHomeHtml({
									widget : mservice.page.variable.callHome[index],
									column : column % 3
								});
								column++;
							}
						} else {
							returnHtml += mservice.page.util.getCallHomeHtml({
								widget : mservice.page.variable.callHome[index],
								column : column % 3
							});
							column++;
						}
					}
				}
			};
			returnHtml += "</div>";
			returnHtml += "</div>";
			return returnHtml;
		},
		util : {
			getCallHomeHtml : function (iObj) {
				var column,
				returnHtml;
				column = (iObj.column == 2) ? "c" : (iObj.column == 1) ? "b" : "a";
				returnHtml = "<div class = 'ui-block-" + column + " col'>";
				returnHtml += "<div style='text-align: center; margin: 10px;'><a href='#' style='' id = '" + iObj.widget.id + "' data-widget-type = '" + iObj.widget.type + "' data-button-role = '" + iObj.widget.group + "' data-text = '" + iObj.widget.name + "'>";
				returnHtml += "<img src = '" + iObj.widget.imgSrc + "' style='padding-top: 16px;padding-left: 16px;padding-right: 16px;'>";
				returnHtml += "<div class='bt-name' style='overflow:visible !important;height:38px !important;font-size: small;'>" + iObj.widget.name + "</div>";
				returnHtml += "</a></div>";
				returnHtml += "</div>";
				return returnHtml;
			},
			saveCall : function(iObj) {
				var callEventLog;
				callEventLog = new kendo.data.DataSource({
					data: iObj.selectedRecord.call_event_log
				});
				callEventLog.read();
				
				if (iObj.saveType == "workflow") {
					callEventLog.add({
						event_data: mserviceUtilities.getDateString(new Date(), "yyyy-MM-dd HH:mm"),
						channel_id : "MOBILE",
						to_wf_stage_no : iObj.to_wf_stage_no,
						from_wf_stage_no : iObj.from_wf_stage_no,
						to_status : iObj.to_status,
						from_status : iObj.from_status,
						by_employee_id : iObj.by_employee_id,
						to_employee_id_string : iObj.to_employee_id_string,
						comments : iObj.comments,
						reason_code : iObj.reason_code,
						lattitude_value : "",
						longitude_value : "",
						eventverb_id : iObj.eventverb_id,
						prev_sch_start_date : "",
						prev_sch_finish_date : ""
					});
					
					mservice.dSource.callList.data()[0].set("call_wf_stage_no", iObj.to_wf_stage_no);
					mservice.dSource.callList.data()[0].set("call_status", iObj.to_status);
					mservice.dSource.callList.data()[0].set("act_start_date", mserviceUtilities.getDateString(new Date(), "yyyy-MM-dd HH:mm"));
					mservice.dSource.callList.data()[0].set("call_event_log", JSON.parse(JSON.stringify(callEventLog.data())));
					mservice.dSource.callList.sync();
				}
				return true;
			}
		},
		variable : {
			callHome : [{
					id : "call_list_trip_start_btn",
					name : "T-Start",
					imgSrc : "../images/tripstart_foo.png",
					type : "m_button",
					group : "feature",
					role : "trip_start"
				}, {
					id : "call_list_trip_finish_btn",
					name : "T-Finish",
					imgSrc : "../images/tripfinish_foo.png",
					type : "m_button",
					group : "feature",
					role : "trip_finish"
				}, {
					id : "call_list_START_btn",
					name : "Start",
					imgSrc : "../images/start_foo.png",
					type : "m_button",
					group : "workflow",
					role : "START"
				}, {
					id : "call_list_PROGRESSUPDATE_btn",
					name : "Progress",
					imgSrc : "../images/progress_foo.png",
					type : "m_button",
					group : "workflow",
					role : "PROGRESSUPDATE"
				}, {
					id : "call_list_HOLD_btn",
					name : "Hold",
					imgSrc : "../images/hold_foo.png",
					type : "m_button",
					group : "workflow",
					role : "HOLD"
				}, {
					id : "call_list_WORKCOMPLETE_btn",
					name : "Finish",
					imgSrc : "../images/finish_foo.png",
					type : "m_button",
					group : "workflow",
					role : "WORKCOMPLETE"
				}, {
					id : "call_list_CUSTCLOSURE_btn",
					name : "Close",
					imgSrc : "../images/close_service_call_foo.png",
					type : "m_button",
					group : "workflow",
					role : "CUSTCLOSURE"
				}, {
					id : "call_list_ASSIGN_btn",
					name : "Assign",
					imgSrc : "../images/assign_foo.png",
					type : "m_button",
					group : "workflow",
					role : "ASSIGN"
				}, {
					id : "call_list_REASSIGN_btn",
					name : "Reassign",
					imgSrc : "../images/reassign_foo.png",
					type : "m_button",
					group : "workflow",
					role : "REASSIGN"
				}, {
					id : "call_list_RELEASEHOLD_btn",
					name : "Release Hold",
					imgSrc : "../images/releasehold_foo.png",
					type : "m_button",
					group : "workflow",
					role : "RELEASEHOLD"
				}, {
					id : "call_list_REOPEN_btn",
					name : "Reopen",
					imgSrc : "../images/reopen_foo.png",
					type : "m_button",
					group : "workflow",
					role : "REOPEN"
				}, {
					id : "call_list_REPLAN_btn",
					name : "Replan",
					imgSrc : "../images/replan_foo.png",
					type : "m_button",
					group : "workflow",
					role : "REPLAN"
				}, {
					id : "call_list_STATUSCHANGE_btn",
					name : "Status Change",
					imgSrc : "../images/statuschange_foo.png",
					type : "m_button",
					group : "workflow",
					role : "STATUSCHANGE"
				}, {
					id : "call_list_manage_user_attachments_btn",
					name : "Attch",
					imgSrc : "../images/user_attachments_foo.png",
					type : "m_button",
					group : "feature",
					role : "manage_user_attachments"
				}, {
					id : "call_list_field_service_form_btn",
					name : "FSR",
					imgSrc : "../images/fsr.png",
					type : "m_button",
					group : "feature",
					role : "field_service_form"
				}, {
					id : "call_list_jsa_form_btn",
					name : "JSA",
					imgSrc : "../images/jsa.png",
					type : "m_button",
					group : "feature",
					role : "jsa_form"
				}, {
					id : "call_list_call_details_btn",
					name : "Info",
					imgSrc : "../images/call_details.png",
					type : "m_button",
					group : "feature",
					role : "call_details"
				}, {
					id : "call_list_eicl_form_btn",
					name : "EICL",
					imgSrc : "../images/eicl.png",
					type : "m_button",
					group : "feature",
					role : "eicl_form"
				}
			]
		}
	},
	util : {
		getCallWflowFeatures : function (iObj) {
			return cacheManager.getDataSet({
				informationType : "CALL_WF_EVENTVERB_LIST",
				condition : "((@req_catg == '" + iObj.category + "' && @req_type == '" + iObj.type + "' && @from_wf_stage == '" + iObj.stage + "' && @from_wf_status == '" + iObj.status + "') || (@req_catg == '" + iObj.category + "' && @req_type == 'ALL' && @from_wf_stage == '" + iObj.stage + "' && @from_wf_status == '" + iObj.status + "') || (@req_catg == 'ALL' && @req_type == 'ALL' && @from_wf_stage == '" + iObj.stage + "' && @from_wf_status == '" + iObj.status + "'))"
			});
		}
	},
};
mservice.dSource.define();
/*$(document).delegate("[data-widget-type = 'm_button']", "click", function (e) {
	var mBtn,
	screenID,
	screenObj;
	mBtn = this;
	screenID = mserviceUtilities.getCurrentScreenID();
	screenObj = eval(screenID);
	if ($(mBtn).attr("data-button-group") == "workflow") {
		screenObj.variable.custom.selectedWflowEventVerb = $(mBtn).attr("data-button-role");
		if (ruleEngine.executeRuleStatements({
				screenID : screenID,
				objectID : "button",
				eventID : "click",
				fieldID : $(mBtn).attr("id")
			})) {
			screenObj.buttonEventHandler.workflow_btn_click(mBtn, event);
		}
	} else if ($(mBtn).attr("data-button-role") == "submit") {
		if (ruleEngine.executeRuleStatements({
				screenID : screenID,
				objectID : "button",
				eventID : "click",
				fieldID : $(mBtn).attr("id")
			})) {
			if(screenObj.buttonEventHandler.submit_btn_click(mBtn, event)) {
				mserviceUtilities.goBackToPreviousScreen();
			}
		}
	} else if ($(mBtn).attr("data-button-role") == "cancel") {
		if (mobileConfigurationEngine.var.valueChangeIndicator) {
			if (confirm("Do you want to cancel the changes you made ?")) {
				mserviceUtilities.goBackToPreviousScreen();
			}
		} else {
			mserviceUtilities.goBackToPreviousScreen();
		}
		mobileConfigurationEngine.var.valueChangeIndicator = false;
		mobileConfigurationEngine.var.call_details_loadIndicator = false;
	}
});*/
console.log("CONFIG");