
/* =====================================================
   UI CONTROLLER (CLEANED)
===================================================== */

let requirementCount = 0;

document.addEventListener("DOMContentLoaded", () => {

    console.log("MSCTD UI Initialized");

    bindUIEvents();

    initializeUI();

});

/* ================= EVENT BINDING ================= */

function bindUIEvents() {

    document
        .getElementById("btnAddRequirement")
        .addEventListener("click", addRequirement);

}

/* ================= INIT ================= */

function initializeUI() {

    requirementCount = 0;

    const container = document.getElementById("requirementsContainer");

    container.innerHTML = "";

    addRequirement();
}

/* ================= ADD REQUIREMENT ================= */

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

            <button class="btn btn-danger btn-sm"
                onclick="removeRequirement(${requirementCount})">

                Remove

            </button>

        </div>

        <div class="mb-3">
            <label class="form-label">Requirement</label>
            <textarea class="form-control requirement" rows="3"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Analysis</label>
            <textarea class="form-control analysis" rows="5"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Existing Solution</label>
            <textarea class="form-control existingSolution" rows="5"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Proposed Solution</label>
            <textarea class="form-control proposedSolution" rows="5"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Technical Impact</label>
            <textarea class="form-control technicalImpact" rows="5"></textarea>
        </div>
    `;

    container.appendChild(card);
}

/* ================= REMOVE REQUIREMENT ================= */

function removeRequirement(id) {

    const cards = document.querySelectorAll(".requirement-card");

    if (cards.length === 1) {

        showToast(
            "Warning",
            "At least one requirement is required",
            "warning"
        );

        return;
    }

    document
        .querySelector(`[data-id="${id}"]`)
        ?.remove();

    refreshNumbers();
}

/* ================= RENUMBER ================= */

function refreshNumbers() {

    const cards = document.querySelectorAll(".requirement-card");

    cards.forEach((card, index) => {

        card.querySelector(".requirement-title").innerText =
            `Requirement ${index + 1}`;
    });
}

/* ================= VALIDATION ================= */

function validateForm() {

    const msctd =
        document.getElementById("msctdNumber").value.trim();

    const repo =
        document.getElementById("repositoryName").value.trim();

    if (!msctd) {

        showToast("Validation", "MSCTD Number is required", "warning");

        return false;
    }

    if (!repo) {

        showToast("Validation", "Repository Name is required", "warning");

        return false;
    }

    return true;
}

/* ================= FORM DATA ================= */

function getFormData() {

    const data = {

        msctdNumber:
            document.getElementById("msctdNumber").value.trim(),

        repositoryName:
            document.getElementById("repositoryName").value.trim(),

        requirements: []

    };

    document.querySelectorAll(".requirement-card").forEach(card => {

        data.requirements.push({

            requirement: card.querySelector(".requirement").value.trim(),
            analysis: card.querySelector(".analysis").value.trim(),
            existingSolution: card.querySelector(".existingSolution").value.trim(),
            proposedSolution: card.querySelector(".proposedSolution").value.trim(),
            technicalImpact: card.querySelector(".technicalImpact").value.trim()

        });

    });

    return data;
}