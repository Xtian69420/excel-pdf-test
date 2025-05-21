function exc() {
    const table = document.querySelector("table");
    const wb = XLSX.utils.book_new();
  
    const ws = XLSX.utils.table_to_sheet(table);

    const tableData = XLSX.utils.sheet_to_json(ws, { header: 1 });
    const newWs = XLSX.utils.aoa_to_sheet([["Report Dummy Data"], ...tableData]);
  
    newWs['!merges'] = [{
      s: { r: 0, c: 0 },
      e: { r: 0, c: 5 }
    }];
  
    newWs['A1'].s = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center" }
    };
  
    XLSX.utils.book_append_sheet(wb, newWs, "Report");
    XLSX.writeFile(wb, "report.xlsx");
  }
  
  
  function pdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');
  
    // Title
    doc.setFontSize(16);
    doc.text("Month of May Reports (dummy)", 140, 20, null, null, 'center');
  
    // Extract table
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
        fillColor: [34, 139, 34], // green
        textColor: 255,
      },
      didDrawPage: function (data) {
        doc.setFontSize(10);
      }
    });
  
    doc.save("report.pdf");
  }
  