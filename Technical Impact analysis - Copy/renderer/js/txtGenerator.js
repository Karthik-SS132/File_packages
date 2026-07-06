/*====================================================
TXT GENERATOR
====================================================*/

async function generateTxt(data) {

    let txt = "";

    txt += `MSCTD - ${data.msctdNumber.replace("MSCTD-","")}\n\n`;

    txt += "What's the Requirement?\n";
    txt += "----------------------\n\n";

    data.requirements.forEach((r,index)=>{

        txt += `${index+1}. ${r.requirement}\n\n`;

    });

    txt += "\n";

    txt += "What's the Analysis?\n";
    txt += "---------------------\n\n";

    data.requirements.forEach((r,index)=>{

        txt += `${index+1}. ${r.requirement}\n\n`;

        txt += "Analysis:\n";
        txt += "---------\n";

        txt += `${r.analysis}\n\n`;

        txt += "Existing Solution:\n";
        txt += "------------------\n";

        txt += `${r.existingSolution}\n\n`;

        txt += "Proposed Solution:\n";
        txt += "------------------\n";

        txt += `${r.proposedSolution}\n\n\n`;

    });

    txt += "What's the Technical Impact?\n";
    txt += "----------------------------\n\n";

    data.requirements.forEach((r,index)=>{

        txt += `${index+1}. ${r.requirement}\n\n`;

        txt += `${r.technicalImpact}\n\n`;

    });

    const blob = new Blob(
        [txt],
        {type:"text/plain;charset=utf-8"}
    );

    saveAs(
        blob,
        `Technical Impact analysis ${data.msctdNumber}.txt`
    );

}