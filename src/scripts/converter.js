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
    const element = document.getElementById("report");
  
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
  
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('l', 'mm', 'a4');
  
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
      pdf.save("report.pdf");
    });
  }
  