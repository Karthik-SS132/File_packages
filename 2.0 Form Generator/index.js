var client_id, country_code, locale_id, screen_title, screen_type, transaction_type, workflow_screen_id, direct_screen_id, widgetAttributes, fieldConfigAttrList, widgetList, widgetMandatoryAttributes, currentEditingRow = null;
widgetList = {
    msAttachment: "msAttachment",
    msBarcode: "msBarcode",
    msCamera: "msCamera",
    msCheckbox: "msCheckbox",
    msCheckboxgroup: "msCheckboxgroup",
    msCombobox: "msCombobox",
    msDatebox: "msDatebox",
    msDisplaybox: "msDisplaybox",
    msDropdownlist: "msDropdownlist",
    msFlipswitch: "msFlipswitch",
    msGallery: "msGallery",
    msGeotag: "msGeotag",
    msImagepicker: "msImagepicker",
    msImageviewer: "msImageviewer",
    msLoop: "msLoop",
    msParentgroup: "msParentgroup",
    msMlingualtextarea: "msMlingualtextarea",
    msMultiselect: "msMultiselect",
    msNumerictextbox: "msNumerictextbox",
    msQrcode: "msQrcode",
    msRadiogroup: "msRadiogroup",
    msRating: "msRating",
    msSearchpopup: "msSearchpopup",
    msSignaturepad: "msSignaturepad",
    msSlider: "msSlider",
    msTextarea: "msTextarea",
    msTextbox: "msTextbox",
    msTimebox: "msTimebox",
    msVideoplayer: "msVideoplayer"
};
widgetAttributes = {
    msAttachment: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-filesizekey", "data-ms-widget-prop-fileextensionkey", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msBarcode: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msCamera: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-filesizekey", "data-ms-widget-prop-fileextensionkey", "data-ms-widget-prop-attachmentind", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msCheckbox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msCheckboxgroup: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-stack", "data-ms-widget-prop-updatefield", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msCombobox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-template", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msDatebox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-dateinput", "data-ms-widget-prop-format", "data-ms-widget-prop-weeknumber", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msDisplaybox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msDropdownlist: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-template", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msFlipswitch: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msGallery: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-filesizekey", "data-ms-widget-prop-fileextensionkey", "data-ms-widget-prop-attachmentind", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msGeotag: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msImagepicker: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-filesizekey", "data-ms-widget-prop-fileextensionkey", "data-ms-widget-prop-attachmentind", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msImageviewer: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-source", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msLoop: ["data-ms-widget-prop-savefield"],
    msParentgroup: ["data-ms-widget-prop-savefield"],
    msMlingualtextarea: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-maxlen", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msMultiselect: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-minlen", "data-ms-widget-prop-maxlen", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-template", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-allownewentry", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msNumerictextbox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-max", "data-ms-widget-prop-minlen", "data-ms-widget-prop-step", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msQrcode: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-resulttype", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msRadiogroup: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-stack", "data-ms-widget-prop-checked", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msRating: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-value", "data-ms-widget-prop-selectiontype", "data-ms-widget-prop-precisiontype", "data-ms-widget-prop-showlabel", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msSearchpopup: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-minsearchletters", "data-ms-widget-prop-allownewentry", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msSignaturepad: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msSlider: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-max", "data-ms-widget-prop-step", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msTextarea: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-minlen", "data-ms-widget-prop-maxlen", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msTextbox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-type", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield", "data-ms-widget-prop-msloop", "data-ms-widget-prop-msparentloop"],
    msTimebox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-dateinput", "data-ms-widget-prop-interval", "data-ms-widget-prop-format", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield"],
    msVideoplayer: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-source", "data-ms-widget-prop-cascadefrom", "data-ms-widget-prop-cascadefromfield"]
};
widgetMandatoryAttributes = {
    msAttachment: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-filesizekey", "data-ms-widget-prop-fileextensionkey"],
    msBarcode: ["data-ms-widget-prop-savefield"],
    msCamera: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-filesizekey", "data-ms-widget-prop-fileextensionkey", "data-ms-widget-prop-attachmentind"],
    msCheckbox: ["data-ms-widget-prop-savefield"],
    msCheckboxgroup: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield"],
    msCombobox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-template"],
    msDatebox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-format"],
    msDisplaybox: [],
    msDropdownlist: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-template"],
    msFlipswitch: [],
    msGallery: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-filesizekey", "data-ms-widget-prop-fileextensionkey", "data-ms-widget-prop-attachmentind"],
    msGeotag: ["data-ms-widget-prop-savefield"],
    msImagepicker: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-filesizekey", "data-ms-widget-prop-fileextensionkey", "data-ms-widget-prop-attachmentind"],
    msImageviewer: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-source"],
    msLoop: [],
    msParentgroup: [],
    msMlingualtextarea: ["data-ms-widget-prop-savefield"],
    msMultiselect: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-template", "data-ms-widget-prop-allownewentry"],
    msNumerictextbox: ["data-ms-widget-prop-savefield"],
    msQrcode: ["data-ms-widget-prop-savefield"],
    msRadiogroup: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-stack"],
    msRating: ["data-ms-widget-prop-savefield"],
    msSearchpopup: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-datasrc", "data-ms-widget-prop-textfield", "data-ms-widget-prop-valuefield", "data-ms-widget-prop-datasrctype", "data-ms-widget-prop-allownewentry"],
    msSignaturepad: ["data-ms-widget-prop-savefield"],
    msSlider: ["data-ms-widget-prop-savefield"],
    msTextarea: ["data-ms-widget-prop-savefield"],
    msTextbox: ["data-ms-widget-prop-savefield", "data-ms-widget-prop-type"],
    msTimebox: ["data-ms-widget-prop-savefield", ],
    msVideoplayer: ["data-ms-widget-prop-savefield"]
};
fieldConfigAttrList = {
    msloop: "Loop ID",
    msparentloop: "Parent Loop ID",
    savefield: "Save Field",
    filesizekey: "File Size Key",
    fileextensionkey: "File Extension Key",
    attachmentind: "Attachment Indicator",
    cascadefrom: "Cascade From",
    cascadefromfield: "Cascade From Field",
    datasrc: "Data Source",
    textfield: "Text Field",
    valuefield: "Value Field",
    stack: "Stack",
    updatefield: "Update Field",
    datasrctype: "Data Source Type",
    template: "Template",
    dateinput: "Date Input",
    format: "Format",
    weeknumber: "Week Number",
    source: "Source",
    maxlen: "Maximum Length",
    minlen: "Minimum Length",
    max: "Maximum Value",
    step: "Step",
    resulttype: "Result Type",
    checked: "Checked",
    value: "Value",
    selectiontype: "Selection Type",
    precisiontype: "Precision Type",
    showlabel: "Show Label",
    minsearchletters: "Minimum Search Letters",
    allownewentry: "Allow New Entry",
    type: "Type",
    interval: "Interval"
};

    $(document).ready(function () {
        toggleFields();
        $("#client_id, #country_code, #locale_id, #screenType, #screen_title ,#transactionType ,#workflow_screen_id,#direct_screen_id").on("change", function () {
            toggleFields();
        });

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
                $("#removeFileBtn").show();
                var reader = new FileReader();
                reader.onload = function (event) {
                    var data = new Uint8Array(event.target.result);
                    var workbook = XLSX.read(data, {
                        type: 'array'
                    });
                    var sheetName = workbook.SheetNames[0];
                    var worksheet = workbook.Sheets[sheetName];
                    var Excelheaders = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] || [];
                    var cleanHeaders = Excelheaders.filter((h, i) => {
                        return h !== undefined && h !== null && String(h).trim() !== "";
                    });
                    if (cleanHeaders.length > 3){
                        alert("Only 3 Columns are allow for Excel Upload");
                        $("#excelUpload").data("kendoUpload").clearAllFiles();
                        $("#removeFileBtn").hide();
                        $("#fileName").text("");
                        return;
                    }
                    var jsonData = XLSX.utils.sheet_to_json(worksheet, {
                            defval: null
                        });
                    var cleanedData = [];
                    jsonData.forEach(function (row) {
                        var cleanRow = {};
                        var keys = Object.keys(row);
                        var col0 = row[keys[0]] ? row[keys[0]].toString().trim() : "";
                        var col1 = row[keys[1]] ? row[keys[1]].toString().trim() : "";
                        var col2 = row[keys[2]] ? row[keys[2]].toString().trim() : "";
                        var matchedWidgetKey = null;
                        Object.keys(widgetList).forEach(function (key) {
                            if (key.toLowerCase() === col2.toLowerCase()) {
                                matchedWidgetKey = key;
                            }
                        });
                        if (!/^[a-zA-Z0-9_]+$/.test(col0)) {
                            $("#excelUpload").data("kendoUpload").clearAllFiles();
                            $("#removeFileBtn").hide();
                            $("#fileName").text("");
                            alert("Invalid value in first column: " + col0);
                            throw new Error("Invalid first column format");
                        }
                        if (!matchedWidgetKey) {
                            $("#excelUpload").data("kendoUpload").clearAllFiles();
                            $("#removeFileBtn").hide();
                            $("#fileName").text("");
                            alert("Invalid Widget Type in Excel: " + col2);
                            throw new Error("Invalid widget type");
                        }
                        cleanRow[keys[0]] = col0;
                        cleanRow[keys[1]] = col1;
                        cleanRow[keys[2]] = matchedWidgetKey; 
                        cleanedData.push(cleanRow);
                    });
                    jsonData = cleanedData;
                    console.log(jsonData);
                    if ($("#tableBody tr").length > 0) {
                        var confirmReplace = confirm(
                            "Existing table data will be cleared and replaced with Excel data. Do you want to continue?"
                        );
                        if (!confirmReplace) {
                            return;
                        }
                    }
                    $("#tableBody").empty();
                    updateRowCount();
                    jsonData.forEach(function (row) {
                        addRow();
                        var lastRow = $("#tableBody tr").last();
                        var values = Object.values(row);
                        lastRow.find("td:eq(0) input").val(values[0] || "");
                        lastRow.find("td:eq(1) input").val(values[1] || "");
                        lastRow.find("td:eq(2) select").val(values[2] || "");
                    });
                    updateRowCount();
                };
                reader.readAsArrayBuffer(e.files[0].rawFile);
            }
        });
    });
    function toggleFields() {
    try {
        client_id = $("#client_id").val();
        country_code = $("#country_code").val();
        locale_id = $("#locale_id").val();
        screen_title = $("#screen_title").val();
        screen_type = $("#screenType").val();
        transaction_type = $("#transactionType").val();
        workflow_screen_id = $("#workflow_screen_id").val();
        direct_screen_id = $("#direct_screen_id").val();
        $("#workflowField").show();
        $("#transactionTypeField").show();
        $("#formField").show();
        $("#uploadField").show();
        if (screen_type === "Direct") {
            $("#workflowField").hide();
        } else if (screen_type === "Workflow") {
            $("#workflowField").show();
        }
    } catch (error) {
        console.error("toggleFields error:", error);
        alert("Error in toggleFields.");
    }
}
function generateConfigFiles() {
    try {
        if (client_id == "") {
            alert("Please provide the Client Id to continue.");
            return;
        } else if (country_code == "") {
            alert("Please provide the Country Code to continue.");
            return;
        } else if (locale_id == "") {
            alert("Please provide the Locale Id to continue.");
            return;
        } else if (screen_title == "") {
            alert("Please provide the Screen title to continue.");
            return;
        } else if (transaction_type == "" || transaction_type == undefined) {
            alert("Please provide the Transaction Type to continue.");
            return;
        } else if (screen_type == "" || screen_type == undefined) {
            alert("Please choose the Screen Type Id to continue.");
            return;
        } else if (screen_type == "Direct" && direct_screen_id == "") {
            alert("Please provide the Form Screen Id to continue.");
            return;
        } else if ((screen_type == "Workflow") && (direct_screen_id == "" || workflow_screen_id == "")) {
            alert("Please provide the Form & Workflow Screen Id to continue.");
            return;
        } else {
            var actualFormData = getTableData();
            if (actualFormData.length == 0) {
                alert("No data available in the Excel file to process.");
                return;
            }
            console.log(actualFormData);
        }
    } catch (error) {
        console.error("generateConfigFiles error:", error);
        alert("Error while generating config files.");
    }
}
function addRow() {
    try {
        var row = `<tr><td><input class="text-input" placeholder="Maximum upto 100" maxlength="100" oninput="this.value = this.value.replace(/[^a-zA-Z0-9_]/g, '')"/><td><input class="text-input" placeholder="Maximum upto 500" maxlength="500"/><td><div class="select-wrapper"><select class="dropdown"><option value="msAttachment">msAttachment</option><option value="msBarcode">msBarcode</option><option value="msCamera">msCamera</option><option value="msCheckbox">msCheckbox</option><option value="msCheckboxgroup">msCheckboxgroup</option><option value="msCombobox">msCombobox</option><option value="msDatebox">msDatebox</option><option value="msDisplaybox">msDisplaybox</option><option value="msDropdownlist">msDropdownlist</option><option value="msFlipswitch">msFlipswitch</option><option value="msGallery">msGallery</option><option value="msGeotag">msGeotag</option><option value="msImagepicker">msImagepicker</option><option value="msImageviewer">msImageviewer</option><option value="msLoop">msLoop</option><option value="msParentgroup">msParentgroup</option><option value="msMlingualtextarea">msMlingualtextarea</option><option value="msMultiselect">msMultiselect</option><option value="msNumerictextbox">msNumerictextbox</option><option value="msQrcode">msQrcode</option><option value="msRadiogroup">msRadiogroup</option><option value="msRating">msRating</option><option value="msSearchpopup">msSearchpopup</option><option value="msSignaturepad">msSignaturepad</option><option value="msSlider">msSlider</option><option value="msTextarea">msTextarea</option><option value="msTextbox">msTextbox</option><option value="msTimebox">msTimebox</option><option value="msVideoplayer">msVideoplayer</option></select></div></td><td><button class="settings-btn action-btn" onclick="openPopup(this)">Click</button></td><td><button class="delete-btn action-btn" onclick="deleteRow(this)">🗑</button></td></tr>`;
        $("#tableBody").append(row);
        updateRowCount();
    } catch (error) {
        console.error("addRow error:", error);
        alert("Unable to add row.");
    }
}
function openPopup(el) {
    try {
        document.getElementById("popup").style.display = "flex";
        document.querySelector(".table-card").classList.add("hidden");
        document.querySelector(".table-header-bar").classList.add("hidden");
        var row = $(el).closest("tr");
        currentEditingRow = row;
        var labelId = row.find("input").eq(0).val();
        var labelName = row.find("input").eq(1).val();
        var widgetType = row.find("select").val();
        $("#popupTitle").text(labelName || "Widget Configuration");
        $("#popupStatus").text(widgetType);
        var attrs = widgetAttributes[widgetType] || [];
        var html = "";
        attrs.forEach(function (attr, index) {
            var mandatoryFields = widgetMandatoryAttributes[widgetType] || [];
            var isMandatory = mandatoryFields.includes(attr);
            var label = fieldConfigAttrList[attr.replace("data-ms-widget-prop-", "").replace(/-/g, " ")] || attr.replace("data-ms-widget-prop-", "").replace(/-/g, " ");
            if (isMandatory) {
                label += ' <span style="color:red">*</span>';
            }
            var control = "";
            switch (attr) {
            case "data-ms-widget-prop-savefield":
                control = `<select class="dropdown"><option value="">Select</option><option value="true">true</option><option value="false">false</option></select>`;
                break;
            case "data-ms-widget-prop-attachmentind":
            case "data-ms-widget-prop-stack":
            case "data-ms-widget-prop-dateinput":
            case "data-ms-widget-prop-weeknumber":
            case "data-ms-widget-prop-showlabel":
            case "data-ms-widget-prop-allownewentry":
                control = `<select class="dropdown"><option value="">Select</option><option value="true">true</option><option value="false">false</option></select>`;
                break;
            case "data-ms-widget-prop-updatefield":
            case "data-ms-widget-prop-checked":
                control = `<select class="dropdown"><option value="">Select</option><option value="checked">checked</option><option value="unchecked">unchecked</option></select>`;
                break;
            case "data-ms-widget-prop-selectiontype":
                control = `<select class="dropdown"><option value="">Select</option><option value="Single">Single</option><option value="Continuous">Continuous</option></select>`;
                break;
            case "data-ms-widget-prop-precisiontype":
                control = `<select class="dropdown"><option value="">Select</option><option value="Half">Half</option><option value="Item">Item</option></select>`;
                break;
            case "data-ms-widget-prop-resulttype":
                control = `<select class="dropdown"><option value="">Select</option><option value="Object">Object</option></select>`;
                break;
            case "data-ms-widget-prop-type":
                control = `<select class="dropdown"><option value="">Select</option><option value="text">text</option><option value="email">email</option></select>`;
                break;
            case "data-ms-widget-prop-format":
                if (widgetType === "msTimebox") {
                    control = `<select class="dropdown"><option value="">Select</option><option value="hh:mm tt">hh:mm tt</option><option value="mm:hh tt">mm:hh tt</option></select>`;
                } else if (widgetType === "msDatebox") {
                    control = `<select class="dropdown"><option value="">Select</option><option value="dd-MM-yyyy">dd-MM-yyyy</option><option value="MM-dd-yyyy">MM-dd-yyyy</option></select>`;
                } else {
                    control = `<input type="text" class="text-input">`;
                }
                break;
            case "data-ms-widget-prop-msparentloop":
                var tableData = getTableData();
                var loopOptions = `<option value="">Select Parentloop</option>`;
                tableData.forEach(function (item) {
                    if (item.widgetType === "msParentgroup") {
                        loopOptions += `<option value="${item.labelId}">${item.labelId}</option>`;
                    }
                });
                control = `<select class="dropdown">${loopOptions}</select>`;
                break;
            case "data-ms-widget-prop-msloop":
                var tableData = getTableData();
                var loopOptions = `<option value="">Select Loop</option>`;
                tableData.forEach(function (item) {
                    if (item.widgetType === "msLoop") {
                        loopOptions += `<option value="${item.labelId}">${item.labelId}</option>`;
                    }
                });
                control = `<select class="dropdown">${loopOptions}</select>`;
                break;
            case "data-ms-widget-prop-maxlen":
            case "data-ms-widget-prop-minlen":
            case "data-ms-widget-prop-max":
            case "data-ms-widget-prop-step":
            case "data-ms-widget-prop-value":
            case "data-ms-widget-prop-minsearchletters":
            case "data-ms-widget-prop-interval":
                control = `<input type="number" min="0" class="text-input">`;
                break;
            case "data-ms-widget-prop-source":
                control = `<input type="url" class="text-input" placeholder="https://">`;
                break;
            default:
                control = `<input type="text" class="text-input">`;
            }
            if (index % 3 === 0) {
                html += `<div class="popup-row">`;
            }
            html += `<div class="popup-field"><label class="popup-label" data-key="${attr.replace('data-ms-widget-prop-', '')}">${label}</label>${control}</div>`;
            if (index % 3 === 2 || index === attrs.length - 1) {
                html += `</div>`;
            }
        });
        $("#popupFields").html(html);
        $("#popup").css("display", "flex");
    } catch (error) {
        console.error("openPopup error:", error);
        alert("Unable to open popup.");
    }
}
function savePopupData() {
    try {
        var configObj = {};
        var widgetType = currentEditingRow.find("td:eq(2) select").val();
        var mandatoryFields = widgetMandatoryAttributes[widgetType] || [];
        var isValid = true;
        $("#popupFields .popup-field").each(function () {
            var label = $(this).find("label");
            var key = label.attr("data-key");
            var fullKey = "data-ms-widget-prop-" + key;
            var value = $(this).find("input, select").val()?.trim();
            configObj[key] = value;
            $(this).find("input, select").css("border-color", "");
            if (mandatoryFields.includes(fullKey) && !value) {
                $(this).find("input, select").css("border-color", "red");
                isValid = false;
            }
        });
        if (!isValid) {
            alert("Please fill all mandatory fields.");
            return;
        }
        currentEditingRow.data("popupConfig", configObj);
        closePopup();
    } catch (error) {
        console.error("savePopupData error:", error);
        alert("Unable to save popup data.");
    }
}
function getTableData() {
    try {
        var tableData = [];
        $("#tableBody tr").each(function () {
            var row = $(this);
            var rowObj = {
                labelId: row.find("td:eq(0) input").val(),
                labelName: row.find("td:eq(1) input").val(),
                widgetType: row.find("td:eq(2) select").val(),
                attributes: {}
            };
            var popupData = row.data("popupConfig");
            if (popupData) {
                rowObj.attributes = popupData;
            }
            tableData.push(rowObj);
        });
        console.log(tableData);
        return tableData;
    } catch (error) {
        console.error("getTableData error:", error);
        alert("Unable to fetch table data.");
        return [];
    }
}
function dataRemove() {
    try {
        var upload = $("#excelUpload").data("kendoUpload");
        upload.clearAllFiles();
        $("#removeFileBtn").hide();
        $("#fileName").text("");
    } catch (error) {
        console.error("dataRemove error:", error);
        alert("Unable to remove file.");
    }
}
function updateRowCount() {
    try {
        var count = $("#tableBody tr").length;
        $("#rowCount").text(count);
    } catch (error) {
        console.error("updateRowCount error:", error);
        alert("Unable to Row count.");
    }
}
function closePopup() {
    try {
        document.getElementById("popup").style.display = "none";
        document.querySelector(".table-card").classList.remove("hidden");
        document.querySelector(".table-header-bar").classList.remove("hidden");
        $("#popup").hide();
    } catch (error) {
        console.error("closePopup error:", error);
        alert("Unable to close the popup screen.");
    }
}
function deleteRow(el) {
    try {
        $(el).closest("tr").remove();
        updateRowCount();
    } catch (error) {
        console.error("deleteRow error:", error);
        alert("Unable to delete the row.");
    }
}
