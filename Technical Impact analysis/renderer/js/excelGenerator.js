
/* ==========================================================
   Excel Generator Core
========================================================== */

class ExcelGenerator {

    constructor() {
        this.workbook = null;
    }

    /*---------------------------------------------------------
      Load Excel Template
    ---------------------------------------------------------*/
    async loadWorkbook(file) {

        try {

            const buffer = await file.arrayBuffer();

            this.workbook = new ExcelJS.Workbook();

            await this.workbook.xlsx.load(buffer);

            return this.workbook;

        } catch (err) {

            console.error("Workbook load failed:", err);

            throw new Error("Failed to load Excel template");

        }
    }

    /*---------------------------------------------------------
      Download Workbook
    ---------------------------------------------------------*/
    async downloadWorkbook(fileName) {

        try {

            const buffer = await this.workbook.xlsx.writeBuffer();

            const blob = new Blob(
                [buffer],
                {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            );

            saveAs(blob, fileName);

        } catch (err) {

            console.error("Download failed:", err);

            throw new Error("Failed to download Excel file");

        }

    }

}

/* ==========================================================
   Impact Analysis Excel
========================================================== */

async function generateImpactExcel(data) {

    const file = document.getElementById("impactExcel").files[0];

    if (!file) {
        showToast("Missing File", "Please select Impact Analysis template", "warning");
        throw new Error("Impact Excel template missing");
    }

    const excel = new ExcelGenerator();

    setStatus("Loading Impact Excel template...");

    await excel.loadWorkbook(file);

    const sheet = excel.workbook.worksheets[0];

    // Repository Name
    sheet.getCell("A2").value = data.repositoryName;

    const number = data.msctdNumber.replace("MSCTD-", "");

    setStatus("Downloading Impact Excel...");

    await excel.downloadWorkbook(`impact_analysis-${number}.xlsx`);

}

/* ==========================================================
   MSCTD Test Case Excel
========================================================== */

async function generateMSCTDExcel(data) {

    const file = document.getElementById("msctdExcel").files[0];

    if (!file) {
        showToast("Missing File", "Please select MSCTD template", "warning");
        throw new Error("MSCTD Excel template missing");
    }

    const excel = new ExcelGenerator();

    setStatus("Loading MSCTD template...");

    await excel.loadWorkbook(file);

    const sheet = excel.workbook.worksheets[0];

    sheet.getCell("A2").value = `${data.msctdNumber}-TC-1`;

    const number = data.msctdNumber.replace("MSCTD-", "");

    setStatus("Downloading MSCTD Excel...");

    await excel.downloadWorkbook(`MSCTD-${number}-test.xlsx`);

}