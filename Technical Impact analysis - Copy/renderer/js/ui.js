/* =====================================================
   ui.js
   Handles UI, Dynamic Requirements and Form Data
===================================================== */

let requirementCount = 0;
document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("btnAddRequirement")
        .addEventListener("click", addRequirement);

});
function addRequirement() {

    requirementCount++;

    const container = document.getElementById("requirementsContainer");

    const card = document.createElement("div");

    card.className = "requirement-card";

    card.dataset.id = requirementCount;

    card.innerHTML = `

        <div class="d-flex justify-content-between align-items-center mb-3">

            <h5 class="requirement-title">
                Requirement ${requirementCount}
            </h5>

            <button
                class="btn btn-danger btn-sm"
                onclick="removeRequirement(${requirementCount})">

                Remove

            </button>

        </div>

        <div class="mb-3">

            <label class="form-label">

                Requirement

            </label>

            <textarea
                class="form-control requirement"
                rows="3"
                placeholder="Enter Requirement"></textarea>

        </div>

        <div class="mb-3">

            <label class="form-label">

                Analysis

            </label>

            <textarea
                class="form-control analysis"
                rows="5"
                placeholder="Enter Analysis"></textarea>

        </div>

        <div class="mb-3">

            <label class="form-label">

                Existing Solution

            </label>

            <textarea
                class="form-control existingSolution"
                rows="5"
                placeholder="Enter Existing Solution"></textarea>

        </div>

        <div class="mb-3">

            <label class="form-label">

                Proposed Solution

            </label>

            <textarea
                class="form-control proposedSolution"
                rows="5"
                placeholder="Enter Proposed Solution"></textarea>

        </div>

        <div class="mb-3">

            <label class="form-label">

                Technical Impact

            </label>

            <textarea
                class="form-control technicalImpact"
                rows="5"
                placeholder="Enter Technical Impact"></textarea>

        </div>

    `;

    container.appendChild(card);

}

function removeRequirement(id) {

    const cards = document.querySelectorAll(".requirement-card");

    if (cards.length === 1) {

        alert("At least one requirement is required.");

        return;

    }

    document
        .querySelector(`[data-id="${id}"]`)
        .remove();

    refreshNumbers();

}

function refreshNumbers() {

    const cards = document.querySelectorAll(".requirement-card");

    cards.forEach((card, index) => {

        card.querySelector(".requirement-title").innerText =
            `Requirement ${index + 1}`;

    });

}

function validateForm() {

    const msctd = document
        .getElementById("msctdNumber")
        .value
        .trim();

    if (msctd === "") {

        alert("Please enter MSCTD Number.");

        return false;

    }

    const repo = document
        .getElementById("repositoryName")
        .value
        .trim();

    if (repo === "") {

        alert("Please enter Repository Name.");

        return false;

    }

    return true;

}

function getFormData() {

    const data = {

        msctdNumber:

            document
            .getElementById("msctdNumber")
            .value
            .trim(),

        repositoryName:

            document
            .getElementById("repositoryName")
            .value
            .trim(),

        requirements: []

    };

    const cards = document.querySelectorAll(".requirement-card");

    cards.forEach(card => {

        data.requirements.push({

            requirement:

                card
                .querySelector(".requirement")
                .value
                .trim(),

            analysis:

                card
                .querySelector(".analysis")
                .value
                .trim(),

            existingSolution:

                card
                .querySelector(".existingSolution")
                .value
                .trim(),

            proposedSolution:

                card
                .querySelector(".proposedSolution")
                .value
                .trim(),

            technicalImpact:

                card
                .querySelector(".technicalImpact")
                .value
                .trim()

        });

    });

    return data;

}

/* ===========================================
   Generate Button
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("btnGenerateAll")
        .addEventListener("click", () => {

            if (!validateForm())
                return;

            const formData = getFormData();

            console.log(formData);

            alert(
                "UI Working Successfully.\n\nNext Module will generate TXT, Excel and PPT."
            );

        });

});

/* ==========================================================
   app.js
   Main Application Controller
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("====================================");
    console.log("MSCTD Document Generator Started");
    console.log("====================================");

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

        console.log(data);

        // STEP 1
        await generateTxt(data);

        // STEP 2
        // await generateImpactExcel(data);

        // STEP 3
        // await generateMSCTDExcel(data);

        // STEP 4
        // await generatePPT(data);

        alert("TXT generated successfully.");

    }
    catch (ex) {

        console.error(ex);

        alert(ex.message);

    }

}
function initializeUI() {

    requirementCount = 0;

    document.getElementById("requirementsContainer").innerHTML = "";

    addRequirement();

}