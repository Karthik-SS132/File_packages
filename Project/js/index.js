var actualExcelData,
loopSetFieldList,
groupedLoopSetData,
client_id,
country_code,
locale_id,
screen_type,
transaction_type,
workflow_screen_id,
direct_screen_id,
ruleFileContent,
ruleFileContentObjectBeginValue,
ruleFileContentEventBeginValue,
ruleFileContentFieldBeginValue,
ruleFileContentRuleBeginValue,
ruleFileContentObjectEndValue,
ruleFileContentEventEndValue,
ruleFileContentFieldEndValue,
ruleFileContentRuleEndValue,
mandatoryList,
optionalList,
hideList,
showList,
enableList,
disableList,
templateList,
uiPropertiesList,
templateFileContent,
uiFileContent,
newControllerObj,
newLabelObj;
actualExcelData = [];
loopSetFieldList = [];
groupedLoopSetData = {};
templateList = {
    "msCombobox": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>",
    "msDatebox": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: kendo.toString(kendo.parseDate(Value), 'dd-MM-yyyy') #</span></td></tr>",
    "msDropdownlist": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>",
    "msMobileNumber": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>",
    "msNumerictextbox": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>",
    "msRadiogroup": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>",
    "msCamera": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>",
    "msImagepicker": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span># for (var i = 0; i < data.Value.length; i++){# <img style='margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px;height: 100px;width: 100px;border: 2px solid' src=' #: data.Value[i]#'/># } #</span></td></tr>",
    "msSignaturepad": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span><img style='max-height:80px; margin-top:3px; margin-bottom:3px;' src='#: Value #' /></span></td></tr>",
    "msTextarea": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>",
    "msTextbox": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>",
    "msTimebox": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>",
    "defaultValue": "<tr><td colspan='25' style='padding-left:10px;'><span><b>Header</b></span></td><td colspan='75' style='padding-left:10px;'><span>#: Value #</span></td></tr>"
};
uiPropertiesList = {
    'msAttachment': '<input id="widget_id" data-ms-widget-type="msAttachment" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-filesizekey="ALLOWED_ATTACHMENT_SIZE_CACHE" data-ms-widget-prop-fileextensionkey="ALLOWED_ATTACHMENT_EXTENSION_CACHE" data-ms-widget-prop-maxlimit="maxlimit_value"/>',
    'msCamera': '<input id="widget_id" data-ms-widget-type="msCamera" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-filesizekey="ALLOWED_ATTACHMENT_SIZE_CACHE" data-ms-widget-prop-fileextensionkey="ALLOWED_ATTACHMENT_EXTENSION_CACHE" data-ms-widget-prop-maxlimit="maxlimit_value"/>',
    'msCombobox': '<input id="widget_id" data-ms-widget-type="msCombobox" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-datasrc="datasrc_value" data-ms-widget-prop-datasrctype="datasrctype_value" data-ms-widget-prop-datasrccode="datasrctype_value" data-ms-widget-prop-textfield="description" data-ms-widget-prop-valuefield="code" data-ms-widget-prop-template="text"/>',
    'msDatebox': '<input id="widget_id" data-ms-widget-type="msDatebox" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-format="yyyy-MM-dd"/>',
    'msDropdownlist': '<input id="widget_id" data-ms-widget-type="msDropdownlist" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-datasrc="datasrc_value" data-ms-widget-prop-datasrctype="datasrctype_value" data-ms-widget-prop-datasrccode="datasrctype_value" data-ms-widget-prop-textfield="description" data-ms-widget-prop-valuefield="code" data-ms-widget-prop-template="text"/>',
    'msFlipswitch': '<input id="widget_id" data-ms-widget-type="msFlipswitch" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id"  data-ms-widget-prop-savefield="savefield_value"/>',
    'msGeotag': '<input id="widget_id" data-ms-widget-type="msGeotag" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value"/>',
    'msImagepicker': '<input id="widget_id" data-ms-widget-type="msImagepicker" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-maxlimit="maxlimit_value"/>',
    'msMobileNumber': '<input id="widget_id" data-ms-widget-type="msMobileNumber" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-maxlen="10" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-minlen="10"/>',
    'msMultiselect': '<input id="widget_id" data-ms-widget-type="msMultiselect" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-datasrc="datasrc_value" data-ms-widget-prop-datasrctype="datasrctype_value" data-ms-widget-prop-datasrccode="datasrctype_value" data-ms-widget-prop-textfield="description" data-ms-widget-prop-valuefield="code" data-ms-widget-prop-template="text"/>',
    'msNumerictextbox': '<input id="widget_id" data-ms-widget-type="msNumerictextbox" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-max="max_value" data-ms-widget-prop-min="min_value" data-ms-widget-prop-format="format_value" />',
    'msRadiogroup': '<input id="widget_id" data-ms-widget-type="msRadiogroup" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-datasrc="datasrc_value" data-ms-widget-prop-textfield="description" data-ms-widget-prop-valuefield="code" data-ms-widget-prop-stack="true" data-ms-widget-prop-checked="checked"/>',
    'msSearchpopup': '<input id="widget_id" data-ms-widget-type="msSearchpopup" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-datasrc="datasrc_value" data-ms-widget-prop-datasrctype="datasrctype_value" data-ms-widget-prop-datasrccode="datasrctype_value" data-ms-widget-prop-textfield="description" data-ms-widget-prop-valuefield="code" data-ms-widget-prop-template="text"/>',
    'msSignaturepad': '<input id="widget_id" data-ms-widget-type="msSignaturepad" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value"/>',
    'msSlider': '<input id="widget_id" data-ms-widget-type="msSlider" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-max="100" data-ms-widget-prop-step="1"/>',
    'msTextarea': '<input id="widget_id" data-ms-widget-type="msTextarea" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-maxlen="maxlen_value"/>',
    'msTextbox': '<input id="widget_id" data-ms-widget-type="msTextbox" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value" data-ms-widget-prop-type="textbox_type_value" data-ms-widget-prop-maxlen="maxlen_value"/>',
    'msTimebox': '<input id="widget_id" data-ms-widget-type="msTimebox" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-format="HH:mm" data-ms-widget-prop-lblid="field_id" data-ms-widget-prop-savefield="savefield_value"/>',
    'msDisplaybox': '<span class="ms_main_heading" id="widget_id" data-ms-widget-type="msDisplaybox" data-ms-lbl-grpid="form" data-ms-lbl-id="field_id"/>',
    'defaultValue': '<input id="widget_id" data-ms-widget-type="msTimebox" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="field_id"  data-ms-widget-prop-savefield="savefield_value"/>'
}
newControllerObj = {
    "transNo": "",
    "formName": "",
    "attachmentPathKey": "",
    "formPath": "",
    "digitalReport": "",
    "saveDraft": "",
    "containR_type": "",
    "containR_subtype": "",
    "scrId": "",
    "allow_new_transaction": "",
    "modify_last_transaction": "",
    "save": {
        "online": "",
        "infoCode": "",
        "headerInput": "",
        "infoRefNo1": "",
        "infoRefNo2": "",
        "timestamp": "",
        "mode": "",
        "checkLocationSettings": "",
        "checkTimeSettings": ""
    },
    "cacheUsed": ""
};
newLabelObj = {
    "field": {
        "screen": {
            "title": "",
            "preview_title": "Preview"
        },
        "form": {}
    },
    "toastMessages": {
        "success": "Report submitted successfully.",
        "service_exception": "Service Exception",
        "get_date_error": "Failed to get the date",
        "load_controller_file_error": "Unable to load controller file",
        "load_config_files_error": "Unable to load config files",
        "delete_config_files_error": "Failed to delete config files",
        "form_fields_mandatory_alert": "Please fill all the mandatory fields",
        "save_draft_success": "Form saved successfully",
        "save_draft_error": "Unable to save the form",
        "form_submit_alert": "Do you want to submit?",
        "form_submit_internet_connection_error": "Internet connection is required to proceed further.",
        "form_submit_success": "Form Submitted  successfully",
        "form_submit_error": "Failed to send the form data",
        "save_pdf_data_error": "Unable to send pdf data",
        "save_pdf_html_data_error": "Unable to send pdf data",
        "form_back_click_alert": "Do you want to go back?",
        "form_back_click_data_alert": "Entered data will be lost. Do you want to go back?",
        "form_back_click_auto_save_alert": "Do you want to save the the data in draft and go back?",
        "create_trans_key_error": "Failed to create transaction key file",
        "error_complaint_exists": "There is an active complaint with reference number #: ref_no #",
        "error_call_insert": "Failed to register your complaint",
        "error_parts_insert": "Failed to register your complaint",
        "error_ancillary_insert": "Failed to register your complaint"
    },
    "confirmMessages": {
        "form_submit_alert": "Do you want to submit?",
        "TurnOnAutomaticDateTime": "Please turn on automatic date and time settings.",
        "form_back_click_data_alert": "Entered data will be lost. Do you want to go back?",
        "form_back_click_auto_save_alert": "Do you want to save the the data in draft and go back?"
    },
    "wFlowEvents": {},
    "placeholder": {}
};
$(document).ready(function () {
    $("#excelUpload").kendoUpload({
        multiple: false,
        showFileList: false,
        validation: {
            allowedExtensions: [".xlsx"]
        },
        localization: {
            select: "Select file to Generate form"
        },
        select: function (e) {
            $("#fileName").text("Selected: " + e.files[0].name);
            var reader = new FileReader();
            reader.onload = function (event) {
                var data = new Uint8Array(event.target.result);
                var workbook = XLSX.read(data, {
                    type: 'array'
                });
                var sheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetName];
                var jsonData = XLSX.utils.sheet_to_json(worksheet);
                var Excelheaders = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1
                })[0];
                var errorInd = false;
                actualExcelData = [];

                jsonData.forEach(function (row, index) {
                    if (errorInd)
                        return; // stop further loop
                    var rowNumber = index + 2; // because Excel starts from row 2
                    var label_id = row[Excelheaders[0]]; // Column A
                    var label_name = row[Excelheaders[1]]; // Column B
                    var widget_type = row[Excelheaders[2]]; // Column C
                    var datasourcetype = row[Excelheaders[3]]; // Column D
                    var datasource = row[Excelheaders[4]]; // Column E
                    var save_field = row[Excelheaders[5]]; // Column F
                    var loop_id = row[Excelheaders[6]]; // Column G
                    var textbox_type = row[Excelheaders[7]]; // Column H
                    var max_length = row[Excelheaders[8]]; // Column I
                    var format_numericTextBox = row[Excelheaders[9]]; // Column J
                    var maxlimit = row[Excelheaders[10]]; // Column K
                    var min_numericTextBox = row[Excelheaders[11]]; // Column L
                    var max_numericTextBox = row[Excelheaders[12]]; // Column M
                    var mandatory = row[Excelheaders[13]]; // Column N
                    var optional = row[Excelheaders[14]]; // Column O
                    var hide = row[Excelheaders[15]]; // Column P
                    var show = row[Excelheaders[16]]; // Column Q
                    var enable = row[Excelheaders[17]]; // Column R
                    var disable = row[Excelheaders[18]]; // Column S

                    if (label_id && label_id.toString().trim() !== "") {
                        if (!label_name || label_name.toString().trim() === "" ||
                            !widget_type || widget_type.toString().trim() === "") {
                            alert("Row " + rowNumber + ": Label Name and Widget Type are required.")
                            errorInd = true;
                            return;
                        } else if (widget_type == "msCombobox" || widget_type == "msDropdownlist" || widget_type == "msSearchpopup") {
                            if (!datasourcetype || datasourcetype.toString().trim() === "" ||
                                !datasource || datasource.toString().trim() === "") {
                                alert("Row " + rowNumber + ": DataSource Type and DataSource Input are required for widgets msCombobox, msDropdownlist, and msSearchpopup.")
                                errorInd = true;
                                return;
                            }
                        } else if (widget_type == "msRadiogroup") {
                            if (!datasource || datasource.toString().trim() === "") {
                                alert("Row " + rowNumber + ": DataSource Input are required for msRadiogroup widget.")
                                errorInd = true;
                                return;
                            }
                        }
                        actualExcelData.push({
                            label_id: label_id || "",
                            label_name: label_name || "",
                            mandatory: mandatory || "",
                            optional: optional || "",
                            hide: hide || "",
                            show: show || "",
                            enable: enable || "",
                            disable: disable || "",
                            widget_type: widget_type || "",
                            datasourcetype: datasourcetype || "",
                            datasource: datasource || "",
                            save_field: save_field || "",
                            loop_id: loop_id || "",
                            textbox_type: textbox_type || "",
                            max_length: max_length || "",
                            format_numericTextBox: format_numericTextBox || "",
                            maxlimit: maxlimit || "",
                            min_numericTextBox: min_numericTextBox || "",
                            max_numericTextBox: max_numericTextBox || "",
                        });
                    }
                });
                if (errorInd) {
                    $("#excelUpload").data("kendoUpload").clearAllFiles();
                    $("#fileName").text("");
                    return;
                }
            };
            reader.readAsArrayBuffer(e.files[0].rawFile);
        }
    });
    $("#excel_upload_group").hide();
    $("#direct_screen_id_group").hide();
    $("#workflow_screen_id_group").hide();
});
function downloadSample(value) {
    if (value.id == "sample_excel") {
        fetch("./excel/2.0 Form Generator Sample Format.xlsx")
        .then(res => res.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "Form_Generator_Sample_Format.xlsx";

            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        });
    } else if (value.id == "sample_pdf") {
        fetch("./pdf/Widget_Configuration_Guidelines.pdf")
        .then(res => res.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "Widget_Configuration_Guidelines.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        });
    }
}
function dataRemove() {
    var upload = $("#excelUpload").data("kendoUpload");
    upload.clearAllFiles();
    $("#fileName").text("");
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};
function inputValueFunction(elem) {
    if (elem.id == "direct_screen_radio") {
        screen_type = elem.value;
        $("#excel_upload_group").show();
        $("#direct_screen_id_group").show();
        $("#workflow_screen_id_group").hide();
        document.getElementById('direct_screen_id').value = ""
            document.getElementById('workflow_screen_id').value = ""
    } else if (elem.id == "workflow_screen_radio") {
        screen_type = elem.value;
        $("#excel_upload_group").show();
        $("#workflow_screen_id_group").show();
        $("#direct_screen_id_group").show();
        document.getElementById('direct_screen_id').value = ""
            document.getElementById('workflow_screen_id').value = ""
    } else if (elem.id == "call" || elem.id == "ancillary") {
        transaction_type = elem.value.toLowerCase();
    } else {
        screen_type = "";
        $("#excel_upload_group").hide();
        $("#workflow_screen_id_group").hide();
        $("#direct_screen_id_group").hide();
        document.getElementById('direct_screen_id').value = ""
            document.getElementById('workflow_screen_id').value = ""
    }
}
function generateConfigFiles() {
    if (document.getElementById("client_id").value == "") {
        alert("Please provide the Client Id to continue.");
        return;
    } else if (document.getElementById("country_code").value == "") {
        alert("Please provide the Country Code to continue.");
        return;
    } else if (document.getElementById("locale_id").value == "") {
        alert("Please provide the Locale Id to continue.");
        return;
    } else if (document.getElementById("screen_title").value == "") {
        alert("Please provide the Screen title to continue.");
        return;
    } else if (transaction_type == "" || transaction_type == undefined) {
        alert("Please provide the Transaction Type to continue.");
        return;
    } else if (screen_type == "" || screen_type == undefined) {
        alert("Please choose the Screen Type Id to continue.");
        return;
    } else if ((screen_type == "Direct") && (document.getElementById("direct_screen_id").value == "")) {
        alert("Please provide the Form Screen Id to continue.");
        return;
    } else if ((screen_type == "Workflow") && ((document.getElementById("direct_screen_id").value == "") || (document.getElementById("workflow_screen_id").value == ""))) {
        alert("Please provide the Form & Workflow Screen Id to continue.");
        return;
    } else if (actualExcelData.length == 0) {
        alert("No data available in the Excel file to process.");
        return;
    }
    console.log(actualExcelData);
    client_id = document.getElementById("client_id").value.toLowerCase();
    country_code = document.getElementById("country_code").value.toLowerCase();
    locale_id = document.getElementById("locale_id").value.toLowerCase();
    workflow_screen_id = document.getElementById("workflow_screen_id").value.toLowerCase();
    direct_screen_id = document.getElementById("direct_screen_id").value.toLowerCase();
    screen_title = document.getElementById("screen_title").value.replace(/\s+/g, "");
    mandatoryList = "#",
    optionalList = "#",
    hideList = "#",
    showList = "#",
    enableList = "#",
    disableList = "#";
    if (actualExcelData != undefined) {
        actualExcelData.forEach(function (item) {
            if (newLabelObj.field.form != undefined) {
                newLabelObj.field.form[item.label_id] = item.label_name;
                newLabelObj.field.screen.title = document.getElementById("screen_title").value;
                if (item.mandatory === "Yes") {
                    if (screen_type === "Direct") {
                        mandatoryList += direct_screen_id + "_" + item.label_id + ",#";
                    } else {
                        mandatoryList += workflow_screen_id + "_" + direct_screen_id + "_" + item.label_id + ",#";
                    }
                }
                if (item.optional === "Yes") {
                    if (screen_type === "Direct") {
                        optionalList += direct_screen_id + "_" + item.label_id + ",#";
                    } else {
                        optionalList += workflow_screen_id + "_" + direct_screen_id + "_" + item.label_id + ",#";
                    }
                }
                if (item.hide === "Yes") {
                    if (screen_type === "Direct") {
                        hideList += direct_screen_id + "_" + item.label_id + ",#";
                    } else {
                        hideList += workflow_screen_id + "_" + direct_screen_id + "_" + item.label_id + ",#";
                    }
                }
                if (item.show === "Yes") {
                    if (screen_type === "Direct") {
                        showList += direct_screen_id + "_" + item.label_id + ",#";
                    } else {
                        showList += workflow_screen_id + "_" + direct_screen_id + "_" + item.label_id + ",#";
                    }
                }
                if (item.enable === "Yes") {
                    if (screen_type === "Direct") {
                        enableList += direct_screen_id + "_" + item.label_id + ",#";
                    } else {
                        enableList += workflow_screen_id + "_" + direct_screen_id + "_" + item.label_id + ",#";
                    }
                }
                if (item.disable === "Yes") {
                    if (screen_type === "Direct") {
                        disableList += direct_screen_id + "_" + item.label_id + ",#";
                    } else {
                        disableList += workflow_screen_id + "_" + direct_screen_id + "_" + item.label_id + ",#";
                    }
                }
            } else {
                alert("Failed to generate Label File")
                return;
            }
        });
        mandatoryList = mandatoryList.substring(0, mandatoryList.length - 2);
        optionalList = optionalList.substring(0, optionalList.length - 2);
        hideList = hideList.substring(0, hideList.length - 2);
        showList = showList.substring(0, showList.length - 2);
        enableList = enableList.substring(0, enableList.length - 2);
        disableList = disableList.substring(0, disableList.length - 2);
        if (newControllerObj != undefined) {
            var transNoValue = (screen_type === "Direct") ? direct_screen_id : (workflow_screen_id + "_" + direct_screen_id);
            newControllerObj.transNo = "#: mService.containR.variable." + transNoValue + ".selectedRecord.request_ref_no#";
            newControllerObj.formName = "#: mService.app.getUserId() #_#: kendo.toString(new Date(), 'ddMMyy') #_#:'" + screen_title + "'#";
            newControllerObj.attachmentPathKey = "ATTACHMENT_PATH_CACHE";
            newControllerObj.formPath = transaction_type + "_attachments";
            newControllerObj.digitalReport = "true";
            newControllerObj.saveDraft = "true";
            newControllerObj.containR_type = "form";
            newControllerObj.containR_subtype = screen_type == "Direct" ? "form" : "workflow";
            newControllerObj.scrId = direct_screen_id;
            newControllerObj.allow_new_transaction = "true";
            newControllerObj.modify_last_transaction = "true";
            newControllerObj.save.online = "false";
            newControllerObj.save.infoCode = direct_screen_id;
            newControllerObj.save.headerInput = "";
            newControllerObj.save.infoRefNo1 = "";
            newControllerObj.save.infoRefNo2 = "";
            newControllerObj.save.timestamp = "00000000-0000-0000-0000-000000000000";
            newControllerObj.save.mode = "A";
            newControllerObj.save.checkLocationSettings = "true";
            newControllerObj.save.checkTimeSettings = "true";
            newControllerObj.cacheUsed = "ATTACHMENT_PATH_CACHE,ALLOWED_ATTACHMENT_SIZE_CACHE,ALLOWED_ATTACHMENT_EXTENSION_CACHE";
        }
        if (screen_type == "Direct") {
            form_name = direct_screen_id
        } else {
            form_name = workflow_screen_id + "_" + direct_screen_id
        }

        if (ruleFileContent == "" || ruleFileContent == undefined) {
            ruleFileContentObjectBeginValue = 'OBJECT_BEGIN [NAME = "screen"]';
            ruleFileContentEventBeginValue = '\n\tEVENT_BEGIN [NAME = "load"]';
            ruleFileContentFieldBeginValue = '\n\t\tFIELD_BEGIN [NAME = "' + (screen_type === "Direct") ? direct_screen_id : (workflow_screen_id + "_" + direct_screen_id) + '"]';
            ruleFileContentRuleBeginValue = '\n\t\t\tRULE_BEGIN [NAME = "Base Load Rule", ORDER = "1"]';
            ruleFileContentRuleEndValue = '\n\t\t\tRULE_END';
            ruleFileContentFieldEndValue = '\n\t\tFIELD_END';
            ruleFileContentEventEndValue = '\n\tEVENT_END';
            ruleFileContentObjectEndValue = '\nOBJECT_END';
            ruleFileContent =
                ruleFileContentObjectBeginValue +
                ruleFileContentEventBeginValue +
                ruleFileContentFieldBeginValue +
                ruleFileContentRuleBeginValue +
                (
                    (mandatoryList.length !== 0)
                     ? "\n\t\t\t\tAPPLY [Mandatory] ON [" + mandatoryList + "];"
                     : "") +
                (
                    (optionalList.length !== 0)
                     ? "\n\t\t\t\tAPPLY [Optional] ON [" + optionalList + "];"
                     : "") +
                (
                    (hideList.length !== 0)
                     ? "\n\t\t\t\tAPPLY [Hide] ON [" + hideList + "];"
                     : "") +
                (
                    (showList.length !== 0)
                     ? "\n\t\t\t\tAPPLY [Show] ON [" + showList + "];"
                     : "") +
                (
                    (enableList.length !== 0)
                     ? "\n\t\t\t\tAPPLY [Enable] ON [" + enableList + "];"
                     : "") +
                (
                    (disableList.length !== 0)
                     ? "\n\t\t\t\tAPPLY [Disable] ON [" + disableList + "];"
                     : "") +
                ruleFileContentRuleEndValue +
                ruleFileContentFieldEndValue +
                ruleFileContentEventEndValue +
                ruleFileContentObjectEndValue;
        }

        if (templateFileContent == "" || templateFileContent == undefined) {
            loopSetFieldList = [];
            var screenId = (screen_type === "Direct")
             ? direct_screen_id
             : workflow_screen_id + "_" + direct_screen_id;

            screenId = screenId.replace(/\s+/g, "_");

            var screenTitle = document.getElementById("screen_title").value;

            templateFileContent = `<script type="text/x-kendo-tmpl" id="${screenId}_template" data-ms-mswidget-for="${screenId}"data-ms-mswidget-template-type="digital_report"><style>table {border: 1.5px solid black;border-collapse: collapse;page-break-inside: avoid;font-family: verdana;table-layout: fixed;}th, td {border: 1.5px solid black;height: 35px;}tr {page-break-inside: avoid;word-wrap: break-word;}</style><mserviceheader><table style="width:100%; border:none; table-layout:fixed; border-collapse:collapse;"><tbody><tr><td colspan="25" style="border-right-color:transparent;padding-left:35px;">Logo</td><td colspan="75" style="padding-top:-20px;"><span><center><h1><b>${screenTitle}</b></h1></center></span></td></tr></tbody></table></mserviceheader><br/><table style="width:100%; border:2px solid; table-layout:fixed; border-collapse:collapse;"><tbody>`;
            actualExcelData.forEach(function (item) {
                if (item.loop_id == "" && item.widget_type != "msLoop" && item.widget_type != "msDisplaybox") {
                    var templateHtml = templateList[item.widget_type] || templateList["defaultValue"];
                    templateHtml = templateHtml
                        .replace(/Header/g, item.label_name)
                        .replace(/Value/g, item.label_id.toLowerCase());
                    templateFileContent += templateHtml;
                } else {
                    if (item.loop_id != "" && item.widget_type != "msLoop" && item.widget_type != "msDisplaybox") {
                        loopSetFieldList.push({
                            label_id: item.label_id || "",
                            label_name: item.label_name || "",
                            mandatory: item.mandatory || "",
                            optional: item.optional || "",
                            hide: item.hide || "",
                            show: item.show || "",
                            enable: item.enable || "",
                            disable: item.disable || "",
                            widget_type: item.widget_type || "",
                            datasourcetype: item.datasourcetype || "",
                            datasource: item.datasource || "",
                            save_field: item.save_field || "",
                            loop_id: item.loop_id || "",
                            textbox_type: item.textbox_type || "",
                            max_length: item.max_length || "",
                            format_numericTextBox: item.format_numericTextBox || "",
                            maxlimit: item.maxlimit || "",
                            min_numericTextBox: item.min_numericTextBox || "",
                            max_numericTextBox: item.max_numericTextBox || "",
                        });
                    }
                }
            });
            if (loopSetFieldList.length != 0) {
                templateFileContent += "</tbody></table>";
                var groupedData = {};
                loopSetFieldList.forEach(function (item) {
                    if (!groupedData[item.loop_id]) {
                        groupedData[item.loop_id] = [];
                    }
                    groupedData[item.loop_id].push(item);
                });
                Object.keys(groupedData).forEach(function (loopId) {
                    var items = groupedData[loopId];
                    var length = items.length;
                    var colspan = Math.floor(100 / length);
                    var lastColspan = 100 - (colspan * (length - 1));
                    templateFileContent += `<table style="width:100%; table-layout:fixed; border: 2px solid black;"><tr height="20px"><td colspan="100" style="text-align: center;"><b>${loopId}</b></td></tr><tr height="20px">`;
                    // 🔹 Header row
                    items.forEach(function (item, index) {
                        var column = (index === length - 1) ? lastColspan : colspan;

                        templateFileContent += `
                                <td colspan="${column}" style="text-align: center;"><b>${item.label_name}</b></td>`;
                    });
                    templateFileContent += `</tr>`;
                    templateFileContent += `# for (var i = 0; i < data.${loopId}.length; i++) { #<tr height="20px" class="word_wrap">`;
                    items.forEach(function (item, index) {
                        var column = (index === length - 1) ? lastColspan : colspan;
                        if (item.widget_type == "msCamera" || item.widget_type == "msImagepicker") {
                            templateFileContent += `
                                    <td colspan="${column}" style="text-align: center;">
                                        # var imageList = data.${loopId}[i].${item.label_id} || []; #
                                        <div style="text-align:center; justify-content: space-around;">
                                            # for (var j = 0; j < imageList.length; j++) { #
                                                <img style="margin:4px; height:50px; width:50px; border:2px solid"
                                                    src="#: imageList[j] #" />
                                            # } #
                                        </div>
                                    </td>
                                `;
                        } else {
                            templateFileContent += `<td colspan="${column}" style="text-align: center;">#: data.${loopId}[i].${item.label_id} #</td>`;
                        }
                    });
                    templateFileContent += `</tr># } #</table>`;
                });
                templateFileContent += "</script>";
            } else {
                templateFileContent += "</tbody></table></script>";
            }
        }
        if (uiFileContent == "" || uiFileContent == undefined) {
            loopSetFieldList = [];

            var screenId = (screen_type === "Direct")
             ? direct_screen_id
             : workflow_screen_id + "_" + direct_screen_id;

            screenId = screenId.replace(/\s+/g, "_");

            uiFileContent = `<div id="${screenId}" data-ms-view-layout="false" data-ms-view-type="containR" data-ms-view-subtype="form" data-ms-view-group="${screenId}"><header data-role="header"><div data-role="navbar" style="font-size:1.1em; height:3.5em;"><a data-align="left"><i class="fas fa-arrow-left" data-role="backbutton" data-click="mService.events.backbutton"/></a><label id="${screenId}_title_lbl" data-ms-lbl="field" data-ms-lbl-src="${screenId}" data-ms-lbl-grpid="screen" data-ms-lbl-id="title"/><a data-align="right"><img src="../ux/image/client_brand_icon.png" style="height: 35px;"/></a></div></header><div data-role="content" id="${screenId}_content" class="ms_form_content_page"><div id="${screenId}_main_page" data-ms-widget-type="msSubpage">`;

            var pageSize = 15;
            var validFields = actualExcelData.filter(item => item.loop_id == "" && item.widget_type != "msLoop");
            var totalPages = Math.ceil(validFields.length / pageSize);
            var currentPage = 1;

            validFields.forEach(function (item, index) {
                if (index % pageSize === 0) {
                    uiFileContent += `<div id="${screenId}_page_${currentPage}" data-role="page" data-ms-containr-subpage-no="${currentPage}" style="height:85vh;overflow:scroll;"><div id="${screenId}_page_title_${currentPage}" data-ms-layout-role="msTitle" data-ms-containr-subpage-no="${currentPage}" class="ms_title_navbar"><span style="float: right;padding: 0em 1em;">${currentPage}/${totalPages}</span></div>`;
                }

                var uiHtml = uiPropertiesList[item.widget_type] || uiPropertiesList["defaultValue"];

                uiHtml = uiHtml
                    .replace(/widget_id/g, screenId.toLowerCase() + "_" + item.label_id.toLowerCase())
                    .replace(/field_id/g, item.label_id.toLowerCase())
                    .replace(/savefield_value/g, (item.save_field == "Yes") ? "true" : "false")
                    .replace(/max_value/g, item.max_numericTextBox)
                    .replace(/min_value/g, item.min_numericTextBox)
                    .replace(/format_value/g, item.format_numericTextBox)
                    .replace(/datasrc_value/g, item.datasource)
                    .replace(/datasrctype_value/g, item.datasourcetype)
                    .replace(/textbox_type_value/g, item.textbox_type.toLowerCase())
                    .replace(/maxlen_value/g, item.max_length);

                uiFileContent += uiHtml;

                if ((index + 1) % pageSize === 0 || index === validFields.length - 1) {
                    uiFileContent += `</div>`;
                    currentPage++;
                }
            });

            actualExcelData.forEach(function (item) {
                if (item.loop_id != "" && item.widget_type != "msLoop") {
                    loopSetFieldList.push(item);
                }
            });

            if (loopSetFieldList.length != 0) {
                var groupedData = {};
                loopSetFieldList.forEach(function (item) {
                    if (!groupedData[item.loop_id]) {
                        groupedData[item.loop_id] = [];
                    }
                    groupedData[item.loop_id].push(item);
                });
                Object.keys(groupedData).forEach(function (loopId) {
                    var items = groupedData[loopId];
                    var screenId = (screen_type === "Direct") ? direct_screen_id : workflow_screen_id + "_" + direct_screen_id;
                    var loopsetValue = screenId.replace(/\s+/g, "_") + "_" + loopId
                        screenId = screenId.replace(/\s+/g, "_");

                    uiFileContent += `<div id="${loopsetValue}" data-ms-widget-type="msLoop" data-ms-widget-prop-lblgrpid="form" data-ms-widget-prop-lblid="${loopId}" data-ms-widget-prop-savefield="true">`;
                    items.forEach(function (item, index) {

                        var uiHtml = uiPropertiesList[item.widget_type] || uiPropertiesList["defaultValue"];

                        uiHtml = uiHtml
                            .replace(/widget_id/g, screenId.toLowerCase() + "_" + item.label_id.toLowerCase())
                            .replace(/field_id/g, item.label_id.toLowerCase())
                            .replace(/savefield_value/g, (item.save_field == "Yes") ? "true" : "false")
                            .replace(/max_value/g, item.max_numericTextBox)
                            .replace(/min_value/g, item.min_numericTextBox)
                            .replace(/format_value/g, item.format_numericTextBox)
                            .replace(/datasrc_value/g, item.datasource)
                            .replace(/datasrctype_value/g, item.datasourcetype)
                            .replace(/textbox_type_value/g, item.textbox_type.toLowerCase())
                            .replace(/maxlen_value/g, item.max_length);
                        uiHtml = uiHtml.replace("/>", ` data-ms-widget-prop-msloop="${screenId.toLowerCase()}_${loopId}"/>`);
                        uiFileContent += uiHtml;
                    });
                    uiFileContent += `</div>`;
                });
            }

            uiFileContent += `</div></div><div id="${screenId}_preview_popup" class="ms_login_window" style="padding: .5em; display: none;"><div data-role="scroller" style="height: 100%" data-zoom="true"><div id="${screenId}_content_preview" style="width: 900px; position: absolute; top: 0%;left: 0%;transform: translate(3%, 5%);"></div></div></div><div id="${screenId}_footer" data-role="footer" data-position="fixed" data-theme="a" data-tap-toggle="false" class="ms_footer"><center style="display: flex;justify-content: center;"><div class="ms_form_action_submit" style="margin-right:.5em;display: flex;align-items: center;justify-content: center;"><i data-ms-widget-type="mButton" data-ms-button-group="form" data-ms-button-role="preview" class="far fa-eye" style="padding:0!important;"/></div><div class="ms_form_action_submit" style="margin-right:.5em;display: flex;align-items: center;justify-content: center;"><i data-ms-widget-type="mButton" data-ms-button-group="form" data-ms-button-role="submit" class="far fa-check" style="padding:0!important;"/></div></center></div></div>`;
        }
    }
    if (screen_type == "Direct") {
        download("label_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".json", JSON.stringify(newLabelObj));
        download("controller_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".json", JSON.stringify(newControllerObj));
        download("rule_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".txt", ruleFileContent);
        download("template_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".html", templateFileContent);
        download("ui_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".html", uiFileContent);
    } else {
        download("label_" + workflow_screen_id + "_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".json", JSON.stringify(newLabelObj));
        download("controller_" + workflow_screen_id + "_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".json", JSON.stringify(newControllerObj));
        download("rule_" + workflow_screen_id + "_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".txt", ruleFileContent);
        download("template_" + workflow_screen_id + "_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".html", templateFileContent);
        download("ui_" + workflow_screen_id + "_" + direct_screen_id + "_" + client_id + "_" + country_code + "_" + locale_id + ".html", uiFileContent);
    }
}
