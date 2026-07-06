
/*====================================================
  TXT GENERATOR (IMPROVED)
====================================================*/

async function generateTxt(data) {

    try {

        setStatus("Generating TXT file...");

        const msctd = data.msctdNumber.replace("MSCTD-", "");

        let txt = "";

        /* ================= HEADER ================= */

        txt += `MSCTD - ${msctd}\n\n`;

        /* ================= REQUIREMENTS ================= */

        txt += "What's the Requirement?\n";
        txt += "----------------------\n\n";

        data.requirements.forEach((r, i) => {

            txt += `${i + 1}. ${r.requirement || "-"}\n\n`;

        });

        txt += "\n";

        /* ================= ANALYSIS ================= */

        txt += "What's the Analysis?\n";
        txt += "---------------------\n\n";

        data.requirements.forEach((r, i) => {

            txt += `${i + 1}. ${r.requirement || "-"}\n\n`;

            txt += "Analysis:\n";
            txt += "---------\n";
            txt += `${r.analysis || "-"}\n\n`;

            txt += "Existing Solution:\n";
            txt += "------------------\n";
            txt += `${r.existingSolution || "-"}\n\n`;

            txt += "Proposed Solution:\n";
            txt += "------------------\n";
            txt += `${r.proposedSolution || "-"}\n\n\n`;

        });

        /* ================= TECHNICAL IMPACT ================= */

        txt += "What's the Technical Impact?\n";
        txt += "----------------------------\n\n";

        data.requirements.forEach((r, i) => {

            txt += `${i + 1}. ${r.requirement || "-"}\n\n`;
            txt += `${r.technicalImpact || "-"}\n\n`;

        });

        /* ================= DOWNLOAD ================= */

        const blob = new Blob(
            [txt],
            { type: "text/plain;charset=utf-8" }
        );

        const fileName =
            `Technical_Impact_Analysis_${msctd}.txt`;

        saveAs(blob, fileName);

        setStatus("TXT generated successfully");

        showToast(
            "Success",
            "TXT file generated successfully",
            "success"
        );

    }
    catch (err) {

        console.error("TXT generation failed:", err);

        setStatus("TXT generation failed");

        showToast(
            "Error",
            err.message || "TXT generation failed",
            "danger"
        );

        throw err;
    }
}