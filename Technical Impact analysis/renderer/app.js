document.addEventListener("DOMContentLoaded", () => {
    initializeApplication();
});

function initializeApplication() {
    initializeUI();
    bindEvents();
    setStatus("Ready");
}

/* ================= EVENT BINDING ================= */

function bindEvents() {

    document
        .getElementById("btnGenerateAll")
        .addEventListener("click", generateAllFiles);

}
async function generateAllFiles() {

    try {

        if (!validateForm())
            return;

        const data = getFormData();

        lockUI(true);

        setStatus("Starting generation...");

        // STEP 1 - TXT
        setStatus("Generating TXT file...");
        await generateTxt(data);

        // STEP 2 - IMPACT EXCEL
        setStatus("Generating Impact Excel...");
        await generateImpactExcel(data);

        // STEP 3 - MSCTD EXCEL
        setStatus("Generating MSCTD Excel...");
        await generateMSCTDExcel(data);

        setStatus("All files generated successfully");

        showToast(
            "Success",
            "TXT + 2 Excel files generated successfully",
            "success"
        );

    }
    catch (ex) {

        console.error(ex);

        setStatus("Generation failed");

        showToast(
            "Error",
            ex.message || "Generation failed",
            "danger"
        );

    }
    finally {

        lockUI(false);
    }
}

/* ================= UI HELPERS ================= */

function lockUI(state) {

    const btn = document.getElementById("btnGenerateAll");

    if (!btn) return;

    btn.disabled = state;

    btn.innerHTML = state
        ? `<span class="spinner-border spinner-border-sm me-2"></span> Processing...`
        : `<i class="bi bi-download"></i> Generate All Files`;
}

function setStatus(message) {

    // Status bar (top)
    const statusBar = document.getElementById("statusBar");
    if (statusBar) {
        statusBar.innerText = message;
    }

    // Footer status
    const footer = document.getElementById("footerStatus");
    if (footer) {
        footer.innerText = message;
    }
}
function showToast(title, message, type = "info") {

    let container = document.querySelector(".toast-container");

    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `app-toast ${type}`;

    toast.innerHTML = `
        <div style="font-weight:600; margin-bottom:4px;">
            ${title}
        </div>
        <div>
            ${message}
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s ease";

        setTimeout(() => toast.remove(), 300);
    }, 3000);
}