var manage_customer_contacts_edit = {
    constructScreen: function () {
        if (manage_customer_contacts.variable.custom.crudIndicator != "A") {
			manage_customer_contacts_edit.variable.custom.customRefNo1 = manage_customer_contacts.variable.custom.selectedRecord.customer_id + "/" + manage_customer_contacts.variable.custom.selectedRecord.location_code;
            manage_customer_contacts_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
                    applicationName: "common_modules",
                    serviceName: "retrieve_manage_custom_info_detail",
                    outputPath: false,
                    api: true,
                    pageSize: 50,
                    inputParameter: {
                        p_custom_info_code: "'customer_location_contacts'",
                        p_custom_info_ref_no1: "$manage_customer_contacts_edit.variable.custom.customRefNo1",
                        p_custom_info_ref_no2: "$manage_customer_contacts.variable.custom.selectedRecord.contact_phone_no"
                    },
                    schemaModel: true,
                    screenID: "manage_customer_contacts_edit",
                    dataSourceName: "datasource_1",
                    processResponse: true,
					noRecordAlert: false,
                    parse: manage_customer_contacts_edit.customRequirementHandler.customInfoDetail
                });
            manage_customer_contacts_edit.variable.custom.datasource_1.read();
        }
    },
    postConstruct: function () {
        $("#manage_customer_contacts_edit_content_1").css("width","100%").css("padding-left","2%").css("padding-top","2%");
		$("#manage_customer_contacts_edit_content_1").find('dd.value').css("width","250px");
		$("#manage_customer_contacts_edit_content_1").find('dt').css("width","150px");
		$("#manage_customer_contacts_edit_grid_1_select_all_btn").change(function(element){ 
			var checked = element.target.checked; 
			$("#manage_customer_contacts_edit_grid_1 .k-checkbox:not('#manage_customer_contacts_edit_grid_1_select_all_btn')").each(function(id, item){
				if(checked){
					$(item)[0].checked = true;
				} else {
					$(item)[0].checked = false;
				}
			});
		});
    },
    initializeWidgets: function () {
		$("#manage_customer_contacts_edit_contact_category").initializeWDropdownlist({
			screenID: "manage_customer_contacts_edit",
			dataSource: {
				informationType: "'CUSTCONTCATG_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			childFieldID: "manage_customer_contacts_edit_contact_type",
			defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.contact_category",
			defaultValueDescription: "$manage_customer_contacts_edit.variable.custom.header_1_record.contact_category_desc",
			template: "description"
		});
		$("#manage_customer_contacts_edit_contact_type").initializeWDropdownlist({
			screenID: "manage_customer_contacts_edit",
			dataSource: {
				informationType: "'CUSTCONTTYPE_LIST_LINKED'",
				searchField1: "#manage_customer_contacts_edit_contact_category",
			},
			dataTextField: "description",
			dataValueField: "code",
			defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.contact_type",
			defaultValueDescription: "$manage_customer_contacts_edit.variable.custom.header_1_record.contact_type_desc",
			template: "description"
		});
        $("#manage_customer_contacts_edit_customer_id").initializeWCombobox({
            screenID: "manage_customer_contacts_edit",
            dataSource: {
                informationType: "'CUSTOMER_LIST_SEARCH_WO_ZZZ'",
                searchField1: "$manage_customer_contacts_edit.variable.custom.customer_id_serverFilterValue"
            },
            dataTextField: "name",
            dataValueField: "id",
			serverFiltering : true,
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.customer_id",
            defaultValueDescription: "$manage_customer_contacts_edit.variable.custom.header_1_record.customer_name",
            childFieldID: "manage_customer_contacts_edit_location_code"
        });
        $("#manage_customer_contacts_edit_location_code").initializeWCombobox({
            screenID: "manage_customer_contacts_edit",
            dataSource: {
                informationType: "'CUSTOMERLOCATION_LIST_LINKED'",
                searchField1: "#manage_customer_contacts_edit_customer_id"
            },
            dataTextField: "description",
            dataValueField: "code",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.location_code",
            defaultValueDescription: "$manage_customer_contacts_edit.variable.custom.header_1_record.location_code_desc"
        });
		$("#manage_customer_contacts_edit_title").initializeWDropdownlist({
			screenID : "manage_customer_contacts_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'EMPLOYEETITLE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.title",
            defaultValueDescription: "$manage_customer_contacts_edit.variable.custom.header_1_record.title"
		});
        $("#manage_customer_contacts_edit_first_name").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "50",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.first_name"
        });
        $("#manage_customer_contacts_edit_middle_name").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "100",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.middle_name"
        });
        $("#manage_customer_contacts_edit_last_name").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "100",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.last_name"
        });
        $("#manage_customer_contacts_edit_address_line_1").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "200",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.address_line_1"
        });
        $("#manage_customer_contacts_edit_address_line_2").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "200",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.address_line_2"
        });
        $("#manage_customer_contacts_edit_address_line_3").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "200",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.address_line_3"
        });
        $("#manage_customer_contacts_edit_country").initializeWDropdownlist({
            screenID: "manage_customer_contacts_edit",
            dataSource: {
                applicationName: "common_modules",
                serviceName: "retrieve_listof_values",
                inputParameter: {
                    p_lov_code: "'COUNTRY_LIST'",
                    p_search_field_1: "",
                    p_search_field_2: "",
                    p_search_field_3: "",
                    p_search_field_4: "",
                    p_search_field_5: ""
                },
            },
            dataTextField: "p_description_field_1",
            dataValueField: "p_value_field_1",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.country",
            defaultValueDescription: "$manage_customer_contacts_edit.variable.custom.header_1_record.country_desc",
            childFieldID: "manage_customer_contacts_edit_state"
        });
        $("#manage_customer_contacts_edit_state").initializeWDropdownlist({
            screenID: "manage_customer_contacts_edit",
            dataSource: {
                applicationName: "common_modules",
                serviceName: "retrieve_listof_values",
                inputParameter: {
                    p_lov_code: "'STATE_LIST'",
                    p_search_field_1: "#manage_customer_contacts_edit_country",
                    p_search_field_2: "",
                    p_search_field_3: "",
                    p_search_field_4: "",
                    p_search_field_5: ""
                },
            },
            dataTextField: "p_description_field_1",
            dataValueField: "p_value_field_1",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.state",
            defaultValueDescription: "$manage_customer_contacts_edit.variable.custom.header_1_record.state_desc",
            childFieldID: "manage_customer_contacts_edit_district,manage_customer_contacts_edit_city"
        });
        $("#manage_customer_contacts_edit_district").initializeWDropdownlist({
            screenID: "manage_customer_contacts_edit",
            dataSource: {
                applicationName: "common_modules",
                serviceName: "retrieve_listof_values",
                inputParameter: {
                    p_lov_code: "'DISTRICT_LIST'",
                    p_search_field_1: "#manage_customer_contacts_edit_country",
                    p_search_field_2: "#manage_customer_contacts_edit_state",
                    p_search_field_3: "",
                    p_search_field_4: "",
                    p_search_field_5: ""
                },
            },
            dataTextField: "p_description_field_1",
            dataValueField: "p_value_field_1",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.district",
            defaultValueDescription: "$manage_customer_contacts_edit.variable.custom.header_1_record.district_desc"
        });
        $("#manage_customer_contacts_edit_city").initializeWCombobox({
            screenID: "manage_customer_contacts_edit",
            dataSource: {
                applicationName: "common_modules",
                serviceName: "retrieve_listof_values",
                inputParameter: {
                    p_lov_code: "'CITY_LIST'",
                    p_search_field_1: "#manage_customer_contacts_edit_country",
                    p_search_field_2: "#manage_customer_contacts_edit_state",
                    p_search_field_3: "",
                    p_search_field_4: "",
                    p_search_field_5: ""
                },
            },
            dataTextField: "p_description_field_1",
            dataValueField: "p_value_field_1",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.city",
            defaultValueDescription: "$manage_customer_contacts_edit.variable.custom.header_1_record.city_desc"
        });
        $("#manage_customer_contacts_edit_pin_code").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "10",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.pincode"
        });
		$("#manage_customer_contacts_edit_contact_phone_no").initializeWCombotextbox({
            screenID: "manage_customer_contacts_edit",
            dataSource: {
				informationType: "'COUNTRYDIALCODE_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			defaultValue : "$manage_customer_contacts_edit.variable.custom.header_1_record.contact_phone_no",
			defaultValueDescription : "$mserviceUtilities.getDescriptionForCode('COUNTRYDIALCODE_LIST',manage_customer_contacts_edit.variable.custom.header_1_record.contact_phone_no.split('-')[0],'')"
        });
        $("#manage_customer_contacts_edit_email_id_1").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "60",
			type: "email",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.email_id"
        });
        $("#manage_customer_contacts_edit_designation").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "60",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.designation"
        });
        $("#manage_customer_contacts_edit_department").initializeWTextbox({
            screenID: "manage_customer_contacts_edit",
            maxlength: "60",
            defaultValue: "$manage_customer_contacts_edit.variable.custom.header_1_record.department"
        });
		manage_customer_contacts_edit.variable.custom.grid_1 = $("#manage_customer_contacts_edit_grid_1").initializeWGrid({
                screenID: "manage_customer_contacts_edit",
                dataSource: manage_customer_contacts_edit.variable.custom.datasource_1,
                height: 400,
                pageSize: 50,
				filterable : false,
				sortable : false,
				toolbar : false
            });
        manage_customer_contacts_edit.variable.custom.grid_1.refresh();
    },
    widgetEventHandler : {
		customer_id_change : function (element, event) {
			if($("#manage_customer_contacts_edit_customer_id").getVal() != ""){
				var customerAssetData = mserviceUtilities.getTransportDataSource({
					applicationName: "common_modules",
					serviceName: "retrieve_listof_values_for_searchcondition",
					outputPath: "context/outputparam",
					pageSize: 50,
					inputParameter: {
						p_inputparam_xml: "<inputparam><lov_code_type>'GET_CUST_ASSET_MAP_DETAILS'</lov_code_type><search_field_1>#manage_customer_contacts_edit_customer_id</search_field_1></inputparam>"
					}
				});
				customerAssetData.read();
				manage_customer_contacts_edit.variable.custom.grid_1.setDataSource(customerAssetData.data());
				manage_customer_contacts_edit.variable.custom.grid_1.dataSource.read();
				manage_customer_contacts_edit.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				manage_customer_contacts_edit.variable.custom.grid_1.setDataSource([]);
				manage_customer_contacts_edit.variable.custom.grid_1.dataSource.read();
				manage_customer_contacts_edit.variable.custom.grid_1.dataSource.pageSize(50);
			}
		},
		contact_category_change : function (element, event) {
			if($("#manage_customer_contacts_edit_contact_category").getVal() === "OWNER"){
				if($("#manage_customer_contacts_edit_grid_1_select_all_btn").prop('checked') === false){
					$("#manage_customer_contacts_edit_grid_1_select_all_btn").click();
				}
			} else {
				if($("#manage_customer_contacts_edit_grid_1_select_all_btn").prop('checked') === true){
					$("#manage_customer_contacts_edit_grid_1_select_all_btn").click();
				}
			}
		}
	},
	buttonEventHandler: {
        submit_btn_click: function (element, event) {
            var recordTimeStamp,
			detailRecordCounter,
			inputparamDetail,
            returnValue;
            recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			inputparamDetail = [];
			if(manage_customer_contacts_edit.variable.custom.grid_1.dataSource.data().length != 0){
				var contactAssetData = manage_customer_contacts_edit.variable.custom.grid_1.dataSource._pristineData;
				$('#manage_customer_contacts_edit_grid_1 .k-checkbox:not("#manage_customer_contacts_edit_grid_1_select_all_btn")').each(function(index, element){
					if($(element)[0].checked){
						contactAssetData[index].applicable_ind = 1;
					} else { 
						contactAssetData[index].applicable_ind = 0;
					}			
				});
				for (detailRecordCounter = 0; detailRecordCounter <  contactAssetData.length; detailRecordCounter++) {
					var inputparamDetailString = "";
					inputparamDetailString += "<asset_id>" + WebAPIProxy.XMLEncode(contactAssetData[detailRecordCounter].asset_id) +"</asset_id>";
					inputparamDetailString += "<equipment_id>" + WebAPIProxy.XMLEncode(contactAssetData[detailRecordCounter].equipment_id) +"</equipment_id>";
					inputparamDetailString += "<customer_id>" + WebAPIProxy.XMLEncode(contactAssetData[detailRecordCounter].customer_id) +"</customer_id>";
					inputparamDetailString += "<applicable_ind>" + WebAPIProxy.XMLEncode(contactAssetData[detailRecordCounter].applicable_ind.toString()) +"</applicable_ind>";
					inputparamDetail.push({
						p_sl_no : (detailRecordCounter + 1).toString(),
						p_inputparam_detail_xml : inputparamDetailString,
						p_crud_ind : manage_customer_contacts.variable.custom.crudIndicator
					});
				};
			};			
			if (manage_customer_contacts.variable.custom.crudIndicator != "A") {
				recordTimeStamp = manage_customer_contacts_edit.variable.custom.header_1_record.rec_tstamp;
				returnValue = common_modules_custominfo_setDetail.invokeAPI({
					p_custom_info_code: "customer_location_contacts",
					p_custom_info_ref_no1: manage_customer_contacts.variable.custom.selectedRecord.customer_id,
					p_custom_info_ref_no2: manage_customer_contacts.variable.custom.selectedRecord.contact_phone_no,
					p_inputparam_header_xml: $("#manage_customer_contacts_edit_content_1").getInputparamXML({
						screenID: "manage_customer_contacts_edit"
					}),
					p_rec_timestamp: recordTimeStamp,
					p_save_mode: "U",
					inputparam_detail: inputparamDetail
				});
			} else {
				returnValue = common_modules_custominfo_setDetail.invokeAPI({
					p_custom_info_code: "customer_location_contacts",
					p_custom_info_ref_no1: $('#manage_customer_contacts_edit_customer_id').getVal(),
					p_custom_info_ref_no2: $('#manage_customer_contacts_edit_location_code').getVal(),
					p_inputparam_header_xml: $("#manage_customer_contacts_edit_content_1").getInputparamXML({
						screenID: "manage_customer_contacts_edit"
					}),
					p_rec_timestamp: recordTimeStamp,
					p_save_mode: "A",
					inputparam_detail: inputparamDetail
				});
			}
			if (returnValue.update_status == "SP001") {
				alert("Customer Contacts Details saved successfully.");
				return true;
			} else {
				alert("Saving of Customer contacts Details failed");
				return false;
			}
        }
    },
    customRequirementHandler: {
        setSelectedRecord: function (element, event) {
            manage_customer_contacts_edit.variable.custom.selectedRecord = manage_customer_contacts_edit.variable.custom.grid_1.dataSource.getByUid(manage_customer_contacts_edit.variable.custom.grid_1.select().data("uid"));
        },
        customInfoDetail: function (response) {
            var parseResponse;
            if (response != undefined) {
                if (response.ApplicationException == undefined) {
                    if (response.outputparam_header.p_custom_info_header_json != "") {
                        manage_customer_contacts_edit.variable.custom.header_1_record = JSON.parse(response.outputparam_header.p_custom_info_header_json);
                    }
                    if (response.outputparam_detail != undefined) {
                        if (response.outputparam_detail.length != undefined) {
                            var detailInfo = response.outputparam_detail;
                            parseResponse = [];
                            for (index = 0; index < detailInfo.length; index++) {
                                for (key in detailInfo[index]) {
                                    parseResponse.push(JSON.parse(detailInfo[index][key]));
                                }
                            }
                        }
                    } else {
                        parseResponse = [];
                    }
                } else {
                    parseResponse = response;
                }
            } else {
                parseResponse = response;
            };
            return parseResponse;
        }
    },
    variable: {
        standard: {
            screenEditableIndicator: true,
            reorderParam: [{
                    contentID: "content_1",
					columnLength: 3
                }
            ],
            valueChangeIndicator: false,
        },
        custom: {},
    }
};