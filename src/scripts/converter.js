function exc() {
    const table = document.querySelector("table");
    const wb = XLSX.utils.book_new();
  
    const rawSheet = XLSX.utils.table_to_sheet(table);
    const data = XLSX.utils.sheet_to_json(rawSheet, { header: 1 });
  
    const title = ["Monthly Report (Dynamic Table)"];
    const newData = [title, [], ...data];
    const ws = XLSX.utils.aoa_to_sheet(newData);
  
    const colCount = data[0].length;

    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } }
    ];

    ws["!cols"] = Array(colCount).fill({ wch: 15 });

    ws["A1"].s = {
      font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "4F81BD" } }, 
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
      }
    };
  
    const headerRow = 2; 
    for (let c = 0; c < colCount; c++) {
      const cellRef = XLSX.utils.encode_cell({ r: headerRow, c });
      const cell = ws[cellRef];
      if (cell) {
        cell.s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center" },
          fill: { fgColor: { rgb: "4BACC6" } },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } }
          }
        };
      }
    }
  
    for (let r = headerRow + 1; r < newData.length; r++) {
      for (let c = 0; c < colCount; c++) {
        const cellRef = XLSX.utils.encode_cell({ r, c });
        const cell = ws[cellRef];
        if (cell) {
          cell.s = {
            alignment: { horizontal: "center" },
            border: {
              top: { style: "thin", color: { rgb: "AAAAAA" } },
              bottom: { style: "thin", color: { rgb: "AAAAAA" } },
              left: { style: "thin", color: { rgb: "AAAAAA" } },
              right: { style: "thin", color: { rgb: "AAAAAA" } }
            }
          };
        }
      }
    }
  
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "report.xlsx");
}
  
  
  function pdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.setFontSize(16);
    doc.text("Month of May Reports (dummy)", 140, 20, null, null, 'center');
  
    const table = document.querySelector("table");
    doc.autoTable({
      html: table,
      startY: 30,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [34, 139, 34], 
        textColor: 255,
      },
      didDrawPage: function (data) {
        doc.setFontSize(10);
      }
    });
  
    doc.save("report.pdf");
  }
  