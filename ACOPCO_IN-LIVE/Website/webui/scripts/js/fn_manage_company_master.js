var manage_company_master = {
    constructScreen: function () {
        manage_company_master.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
            applicationName: "common_modules",
            serviceName: "retrieve_manage_company_master_details"
        });
        manage_company_master.variable.custom.datasource_1.read();
        manage_company_master.variable.custom.datasource_1_record = manage_company_master.variable.custom.datasource_1.at(0);
    },
    initializeWidgets: function () {
        $("#manage_company_master_comp_short_name").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "50",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.comp_short_name",
        });
        $("#manage_company_master_comp_long_name").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "100",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.comp_long_name",
        });
        $("#manage_company_master_address_line_1").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "200",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.address_line_1",
        });
        $("#manage_company_master_address_line_2").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "200",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.address_line_2",
        });
        $("#manage_company_master_address_line_3").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "200",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.address_line_3",
        });
        $("#manage_company_master_city").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "60",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.city",
        });
        $("#manage_company_master_pincode").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "10",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.pincode",
        });
        $("#manage_company_master_country").initializeWDropdownlist({
            screenID: "manage_company_master",
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
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.country",
            defaultValueDescription: "$manage_company_master.variable.custom.datasource_1_record.country_name",
            childFieldID: "manage_company_master_state"
        });
        $("#manage_company_master_state").initializeWDropdownlist({
            screenID: "manage_company_master",
            dataSource: {
                applicationName: "common_modules",
                serviceName: "retrieve_listof_values",
                inputParameter: {
                    p_lov_code: "'STATE_LIST'",
                    p_search_field_1: "#manage_company_master_country",
                    p_search_field_2: "",
                    p_search_field_3: "",
                    p_search_field_4: "",
                    p_search_field_5: ""
                },
            },
            dataTextField: "p_description_field_1",
            dataValueField: "p_value_field_1",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.state",
            defaultValueDescription: "$manage_company_master.variable.custom.datasource_1_record.state_name"
        });
        $("#manage_company_master_landline_1").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "20",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.landline_1"
        });
        $("#manage_company_master_landline_2").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "20",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.landline_2"
        });
        $("#manage_company_master_fax_1").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "20",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.fax_1"
        });
        $("#manage_company_master_fax_2").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "20",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.fax_2"
        });
        $("#manage_company_master_contact_name").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "60",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.contact_name"
        });
        $("#manage_company_master_contact_mobile_no").initializeWCombotextbox({
            screenID: "manage_company_master",
            dataSource: {
				informationType: "'COUNTRYDIALCODE_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.contact_mobile_no",
			defaultValueDescription : "$mserviceUtilities.getDescriptionForCode('COUNTRYDIALCODE_LIST',manage_company_master.variable.custom.contact_mobile_no_defaultValue.split('-')[0],'')"
        });
        $("#manage_company_master_contact_email").initializeWTextbox({
            screenID: "manage_company_master",
            maxlength: "20",
            type: "email",
            defaultValue: "$manage_company_master.variable.custom.datasource_1_record.contact_email"
        });
    },
    buttonEventHandler: {
        submit_btn_click: function (element, event) {
            if (mserviceUtilities.loadJSScripts(["../../s_iscripts/save_manage_company_master.js"])) {
                var returnValue;
                returnValue = executeService_save_manage_company_master({
                    p_company_name_short: $("#manage_company_master_comp_short_name").getVal(),
                    p_company_name_long: $("#manage_company_master_comp_long_name").getVal(),
                    p_address_line_1: $("#manage_company_master_address_line_1").getVal(),
                    p_address_line_2: $("#manage_company_master_address_line_2").getVal(),
                    p_address_line_3: $("#manage_company_master_address_line_3").getVal(),
                    p_city: $("#manage_company_master_city").getVal(),
                    p_state: $("#manage_company_master_state").getVal(),
                    p_country: $("#manage_company_master_country").getVal(),
                    p_pincode: $("#manage_company_master_pincode").getVal(),
                    p_landline_1: $("#manage_company_master_landline_1").getVal(),
                    p_landline_2: $("#manage_company_master_landline_2").getVal(),
                    p_fax_no_1: $("#manage_company_master_fax_1").getVal(),
                    p_fax_no_2: $("#manage_company_master_fax_2").getVal(),
                    p_contact_person: $("#manage_company_master_contact_name").getVal(),
                    p_contact_person_mobile_no: $("#manage_company_master_contact_mobile_no").getVal(),
                    p_contact_person_email_id: $("#manage_company_master_contact_email").getVal(),
                    p_inputparam_udf_xml: $("#manage_company_master_content_1").getInputparamXML({
                        screenID: "manage_company_master",
                        matchCondition: ["manage_company_master_udf"]
                    }),
                    p_save_mode: "U",
                    p_rec_tstamp: manage_company_master.variable.custom.datasource_1_record.rec_tstamp
                });
                if (returnValue == "SP001") {
                    alert("Company Details is saved successfully");
                    manage_company_master.variable.standard.valueChangeIndicator = false;
                    return false;
                } else {
                    alert("Saving of Company Details Failed");
                    return false;
                }
            } else {
                alert("Sorry. This feature is unavailable. Please contact your support desk.");
                return false;
            }
        }
    },
    variable: {
        standard: {
            screenEditableIndicator: true,
            valueChangeIndicator: false,
            reorderParam: [{
                    contentID: "content_1",
                    columnLength: 2
                }
            ],
        },
        custom: {
            datasource_1: "",
            datasource_1_record: ""
        },
    }
};
