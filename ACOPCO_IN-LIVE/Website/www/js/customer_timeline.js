var customer_timeline = {
    page: {
        beforeShow: function () {
            try {
                if ($("#customer_timeline_container").length === 0) {
                    $.ajax({
                        url: "www/content/customer_timeline.html",
                        dataType: "text",
                        async: false,
                        success: function (data) {
                            try {
                                $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='CPORTTIMELINE'] section div div").html(data);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        error: function (e) {
                            try {
                                return true;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                };
				$("#customer_timeline_header").html(kendo.template($("#customer_timeline_header_content_template").html().replace(/\n/g, "").replace(/\t/g, ""))({}));
				customer_timeline.variable.equipmentOEMDSource = mService.util.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>CUSTOMER_EQUIPMENTOEM_LIST</lov_code_type><search_field_1>" + mService.user.profile.login.customer_id + "</search_field_1><search_field_2>" + mService.user.profile.login.customer_location_code + "</search_field_2><search_field_3></search_field_3><search_field_4></search_field_4><search_field_5></search_field_5></inputparam>"
					}
				});
				customer_timeline.variable.equipmentCategoryDSource = mService.util.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>CUSTOMER_EQUIPMENTCATEGORY_LIST</lov_code_type><search_field_1>" + mService.user.profile.login.customer_id + "</search_field_1><search_field_2>" + mService.user.profile.login.customer_location_code + "</search_field_2><search_field_3></search_field_3><search_field_4></search_field_4><search_field_5></search_field_5></inputparam>"
					}
				});
				customer_timeline.variable.equipmentTypeDSource = mService.util.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>CUSTOMER_EQUIPMENTTYPE_LIST</lov_code_type><search_field_1>" + mService.user.profile.login.customer_id + "</search_field_1><search_field_2>" + mService.user.profile.login.customer_location_code + "</search_field_2><search_field_3></search_field_3><search_field_4></search_field_4><search_field_5></search_field_5></inputparam>"
					}
				});
				customer_timeline.variable.equipmentIdDSource = mService.util.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>CUSTOMER_EQUIPMENT_LIST</lov_code_type><search_field_1>" + mService.user.profile.login.customer_id + "</search_field_1><search_field_2>" + mService.user.profile.login.customer_location_code + "</search_field_2><search_field_3></search_field_3><search_field_4></search_field_4><search_field_5></search_field_5></inputparam>"
					}
				});
				customer_timeline.variable.assetIdDSource = mService.util.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>CUSTOMER_ASSET_LIST</lov_code_type><search_field_1>" + mService.user.profile.login.customer_id + "</search_field_1><search_field_2>" + mService.user.profile.login.customer_location_code + "</search_field_2><search_field_3></search_field_3><search_field_4></search_field_4><search_field_5></search_field_5></inputparam>"
					}
				});
				customer_timeline.variable.equipmentOEMDSource.read();
				customer_timeline.variable.equipmentCategoryDSource.read();
				customer_timeline.variable.equipmentTypeDSource.read();
				customer_timeline.variable.equipmentIdDSource.read();
				customer_timeline.variable.assetIdDSource.read();
				$("#customer_timeline_equipment_oem_filter").msDropdownlist({
				    scrid: "customer_timeline",
				    datasrc: customer_timeline.variable.equipmentOEMDSource._pristineData,
				    textfield: "description",
				    valuefield: "code",
					template: "text",
					filterMode: true,
				    lblgrpid: "",
				    lblid: ""
				});
				$("#customer_timeline_equipment_category_filter").msDropdownlist({
				    scrid: "customer_timeline",
				    datasrc: customer_timeline.variable.equipmentCategoryDSource._pristineData,
				    textfield: "description",
				    valuefield: "code",
					template: "text",
					filterMode: true,
				    lblgrpid: "",
				    lblid: ""
				});
				$("#customer_timeline_equipment_type_filter").msDropdownlist({
				    scrid: "customer_timeline",
				    datasrc: customer_timeline.variable.equipmentTypeDSource._pristineData,
					textfield: "description",
				    valuefield: "code",
					template: "text",
					filterMode: true,
				    lblgrpid: "",
				    lblid: ""
				});
				$("#customer_timeline_equipment_id_filter").msDropdownlist({
				    scrid: "customer_timeline",
				    datasrc: customer_timeline.variable.equipmentIdDSource._pristineData,
				    textfield: "desc",
				    valuefield: "id",
					template: "text",
					filterMode: true,
				    lblgrpid: "",
				    lblid: ""
				});
				$("#customer_timeline_asset_id_filter").msDropdownlist({
				    scrid: "customer_timeline",
				    datasrc: customer_timeline.variable.assetIdDSource._pristineData,
				    textfield: "desc",
				    valuefield: "id",
					template: "text",
					filterMode: true,
				    lblgrpid: "",
				    lblid: ""
				});
				$("#customer_timeline_chkbox_filter").msCheckboxgroup({
				    scrid: "customer_timeline",
				    datasrc: [{"text":"Service","value":"SE"},{"text":"Quote","value":"PE"},{"text":"Invoice","value":"SI"}],
				    lblgrpid: "",
				    lblid: "",
				    stack: true,
				    column: "12",
				    textfield: "text",
				    valuefield: "value"
				});
				$("[data-ms-lbl-for='customer_timeline_equipment_oem_filter']").children()[0].textContent = 'Brand';
				$("[data-ms-lbl-for='customer_timeline_equipment_category_filter']").children()[0].textContent = 'Model Group';
				$("[data-ms-lbl-for='customer_timeline_equipment_type_filter']").children()[0].textContent = 'Model Sub Group';
				$("[data-ms-lbl-for='customer_timeline_equipment_id_filter']").children()[0].textContent = 'Model';
				$("[data-ms-lbl-for='customer_timeline_asset_id_filter']").children()[0].textContent = 'Machine';
				$("#customer_timeline_equipment_oem_filter_group").css("max-width","17%");
				$("#customer_timeline_equipment_category_filter_group").css("max-width","17%");
				$("#customer_timeline_equipment_type_filter_group").css("max-width","17%");
				$("#customer_timeline_equipment_id_filter_group").css("max-width","17%");
				$("#customer_timeline_asset_id_filter_group").css("max-width","17%");
				$("#customer_timeline_chkbox_filter_group").css("margin-left","1em");
				$("#customer_timeline_chkbox_filter_wrap").find(".k-checkbox-label")[0].setAttribute("style","color:#88cc00 !important;");
				$("#customer_timeline_chkbox_filter_wrap").find(".k-checkbox-label")[1].setAttribute("style","color:#ffa500 !important;");
				$("#customer_timeline_chkbox_filter_wrap").find(".k-checkbox-label")[2].setAttribute("style","color:#00cccc !important;");
				customer_timeline.button.misc.refresh_click();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        init: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        show: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        afterShow: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
	button: {
		misc: {
			machine_history_attachment_click: function (ele) {
                var dataParam = JSON.parse($(ele).attr("data-ms-listview-param"));
                $("#customer_timeline_history_attachment_viewer_no_data_" + dataParam.uid).hide();
                $("#customer_timeline_history_attachment_viewer_" + dataParam.uid).html("");
                if (dataParam.dataDocType === "I") {
                    $("#customer_timeline_history_attachment_viewer_" + dataParam.uid).msImageviewer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "A") {
                    $("#customer_timeline_history_attachment_viewer_" + dataParam.uid).msAudioplayer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "V") {
                    $("#customer_timeline_history_attachment_viewer_" + dataParam.uid).msVideoplayer({
                        source: dataParam.dataDocSrc
                    });
                } else if (dataParam.dataDocType === "P") {
                    $("#customer_timeline_history_attachment_viewer_" + dataParam.uid).msPdfviewer({
                        source: dataParam.dataDocSrc
                    });
                }
            },
			clear_filter_click: function() {
				$("#customer_timeline_equipment_oem_filter").setVal("");
				$("#customer_timeline_equipment_category_filter").setVal("");
				$("#customer_timeline_equipment_type_filter").setVal("");
				$("#customer_timeline_equipment_id_filter").setVal("");
				$("#customer_timeline_asset_id_filter").setVal("");
				$("#customer_timeline_chkbox_filter_SE").prop("checked",false);
				$("#customer_timeline_chkbox_filter_PE").prop("checked",false);
				$("#customer_timeline_chkbox_filter_SI").prop("checked",false);
				customer_timeline.button.misc.refresh_click();
			},
			refresh_click: function() {
				mService.dSource.retrieveCustomInfoList({
                    code: "'customer_timeline'",
					inputXml: "'<inputparam><equipment_oem_filter>" + $("#customer_timeline_equipment_oem_filter").getVal() + "</equipment_oem_filter><equipment_category_filter>" + $("#customer_timeline_equipment_category_filter").getVal() + "</equipment_category_filter><equipment_type_filter>" + $("#customer_timeline_equipment_type_filter").getVal() + "</equipment_type_filter><equipment_id_filter>" + $("#customer_timeline_equipment_id_filter").getVal() + "</equipment_id_filter><asset_id_filter>" + $("#customer_timeline_asset_id_filter").getVal() + "</asset_id_filter><chkbox_filter>" + $("#customer_timeline_chkbox_filter").getVal().join() + "</chkbox_filter></inputparam>'"
                }, function (data) {
                    try {
						if ($("#customer_timeline_detail_group").length === 0) {
							$("#customer_timeline_detail").msTimeline({
								scrid: "customer_timeline",
								lblid: "",
								lblgrpid: "",
								eventtemplate: "customer_timeline_detail_view_content_template",
								datasrc: [],
								colorTray: [{ 
									"SE": "#88cc00",
									"PQ": "#ffa500",
									"SI": "#00cccc",
									"QU": "#ff4d4d"
								}],
								orientation: "horizontal",
								dateformat: "dd MMM yyyy [ HH:mm ]"
							});
						}
                        $("#customer_timeline_detail").setDataSource(data);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function () {
                    try {
                        return true;
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
			}
		}
	},
    variable: {}
};