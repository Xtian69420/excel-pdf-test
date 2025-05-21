function exc() {
    const table = document.querySelector("table");
    const wb = XLSX.utils.book_new();
  
    const ws = XLSX.utils.table_to_sheet(table);
  
    XLSX.utils.sheet_add_aoa(ws, [["Report Dummy Data"]], { origin: "A1" });
  
    const range = XLSX.utils.decode_range(ws['!ref']);
    range.e.r += 1;
    ws['!ref'] = XLSX.utils.encode_range(range);
  
    ws['!merges'] = ws['!merges'] || [];
    ws['!merges'].push({
      s: { r: 0, c: 0 }, 
      e: { r: 0, c: 5 }  
    });
  
    ws['A1'].s = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center" }
    };
  
    XLSX.utils.book_append_sheet(wb, ws, "Report");
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
  