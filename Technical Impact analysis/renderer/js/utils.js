
/* ===============================================
   Utility Functions (CLEANED)
=============================================== */

/* ================= TOAST WRAPPERS ================= */

function showSuccess(message) {

    if (typeof showToast === "function") {
        showToast("Success", message, "success");
    } else {
        console.log("SUCCESS:", message);
    }
}

function showError(message) {

    if (typeof showToast === "function") {
        showToast("Error", message, "danger");
    } else {
        console.error("ERROR:", message);
    }
}

function showWarning(message) {

    if (typeof showToast === "function") {
        showToast("Warning", message, "warning");
    } else {
        console.warn("WARNING:", message);
    }
}

/* ================= VALIDATION HELPERS ================= */

function isNullOrEmpty(value) {

    return (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
    );
}

/* ================= FILE NAME GENERATOR ================= */

function createFileName(prefix, msctd, extension) {

    const cleanMsctd = isNullOrEmpty(msctd)
        ? "UNKNOWN"
        : msctd.trim();

    const cleanPrefix = isNullOrEmpty(prefix)
        ? "file"
        : prefix.trim().replace(/\s+/g, "_");

    const cleanExt = isNullOrEmpty(extension)
        ? "txt"
        : extension.replace(".", "");

    return `${cleanPrefix}_${cleanMsctd}.${cleanExt}`;
}

/* ================= SAFE VALUE ================= */

function safeValue(value, fallback = "-") {

    return isNullOrEmpty(value) ? fallback : value;
}