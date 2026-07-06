
/* ===============================================
   Template Manager (Improved)
=============================================== */

const Templates = {

    txt: null,
    impactExcel: null,
    msctdExcel: null,

    status: {
        txtLoaded: false,
        impactLoaded: false,
        msctdLoaded: false
    }
};

/* ===============================================
   Load All Templates from UI
=============================================== */

function loadTemplates() {

    try {

        Templates.txt =
            document.getElementById("txtTemplate").files[0] || null;

        Templates.impactExcel =
            document.getElementById("impactExcel").files[0] || null;

        Templates.msctdExcel =
            document.getElementById("msctdExcel").files[0] || null;

        Templates.status.txtLoaded = !!Templates.txt;
        Templates.status.impactLoaded = !!Templates.impactExcel;
        Templates.status.msctdLoaded = !!Templates.msctdExcel;

        updateTemplateStatusUI();

        console.log("Templates loaded:", Templates.status);

    } catch (err) {

        console.error("Template loading failed:", err);

        showToast(
            "Error",
            "Failed to load templates",
            "danger"
        );
    }
}

/* ===============================================
   Validate Templates Before Generation
=============================================== */

function validateTemplates() {

    if (!Templates.txt) {
        showToast("Missing Template", "TXT template not selected", "warning");
        return false;
    }

    if (!Templates.impactExcel) {
        showToast("Missing Template", "Impact Excel template not selected", "warning");
        return false;
    }

    if (!Templates.msctdExcel) {
        showToast("Missing Template", "MSCTD Excel template not selected", "warning");
        return false;
    }

    return true;
}

/* ===============================================
   UI Status Update Helper
=============================================== */

function updateTemplateStatusUI() {

    const statusBar = document.getElementById("statusBar");

    if (!statusBar) return;

    const missing = [];

    if (!Templates.txt) missing.push("TXT");
    if (!Templates.impactExcel) missing.push("Impact");
    if (!Templates.msctdExcel) missing.push("MSCTD");

    if (missing.length === 0) {
        statusBar.innerText = "All templates loaded";
        statusBar.classList.remove("text-danger");
        statusBar.classList.add("text-success");
    } else {
        statusBar.innerText = `Missing: ${missing.join(", ")}`;
        statusBar.classList.add("text-danger");
    }
}