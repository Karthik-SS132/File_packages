/* ===============================================
   Utility Functions
=============================================== */

function showSuccess(message) {

    alert(message);

}

function showError(message) {

    alert(message);

}

function isNullOrEmpty(value) {

    return value === undefined
        || value === null
        || value.trim() === "";

}

function createFileName(prefix, msctd, extension) {

    return `${prefix} ${msctd}.${extension}`;

}