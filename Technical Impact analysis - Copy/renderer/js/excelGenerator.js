/* ==========================================================
   excelGenerator.js
   ========================================================== */

class ExcelGenerator {

    constructor() {
        this.workbook = null;
    }

    /*---------------------------------------------------------
      Read Excel Template
    ---------------------------------------------------------*/
    async loadWorkbook(file) {

        const buffer = await file.arrayBuffer();

        this.workbook = new ExcelJS.Workbook();

        await this.workbook.xlsx.load(buffer);

        return this.workbook;
    }

    /*---------------------------------------------------------
      Download Workbook
    ---------------------------------------------------------*/
    async downloadWorkbook(fileName) {

        const buffer = await this.workbook.xlsx.writeBuffer();

        const blob = new Blob(
            [buffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });

        saveAs(blob, fileName);

    }

}

/* ==========================================================
   Impact Analysis Excel
========================================================== */

async function generateImpactExcel(data) {

    const file =
        document
        .getElementById("impactExcel")
        .files[0];

    if (!file) {

        alert("Please select Impact Analysis template.");

        return;

    }

    const excel = new ExcelGenerator();

    await excel.loadWorkbook(file);

    const sheet = excel.workbook.getWorksheet(excel.workbook.worksheets[0].name);

    /*---------------------------------------
      A2 Repository Name
    ----------------------------------------*/

    sheet.getCell("A2").value =
        data.repositoryName;

    const number =
        data.msctdNumber
            .replace("MSCTD-", "");

    await excel.downloadWorkbook(

        `impact_analysis-${number}.xlsx`

    );

}

/* ==========================================================
   MSCTD Test Case Excel
========================================================== */

async function generateMSCTDExcel(data) {

    const file =
        document
        .getElementById("msctdExcel")
        .files[0];

    if (!file) {

        alert("Please select MSCTD template.");

        return;

    }

    const excel = new ExcelGenerator();

    await excel.loadWorkbook(file);
    
    const sheet =
        excel.workbook.getWorksheet(1);

    sheet.getCell("A2").value =
        `${data.msctdNumber}-TC-1`;

    const number =
        data.msctdNumber
            .replace("MSCTD-", "");

    await excel.downloadWorkbook(

        `MSCTD-${number}-test.xlsx`

    );

}