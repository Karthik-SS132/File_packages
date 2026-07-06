/* ==========================================================
   app.js
   Main Application Controller
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeApplication();

});

function initializeApplication() {

    initializeUI();

    bindEvents();

}

function bindEvents() {

    // Generate All Files
    document
        .getElementById("btnGenerateAll")
        .addEventListener("click", generateAllFiles);

}

async function generateAllFiles() {

    try {

        if (!validateForm())
            return;

        const data = getFormData();
        await generateTxt(data);
        await generateImpactExcel(data);
        await generateMSCTDExcel(data);
        alert("TXT generated successfully.");

    }
    catch (ex) {
        console.error(ex);
        alert(ex.message);

    }

}