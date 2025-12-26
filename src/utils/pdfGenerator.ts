import jsPDF from 'jspdf';

interface CertificateData {
  pin: string;
  name: string;
  email?: string;
}

export const generateKraCertificate = ({ pin, name }: CertificateData) => {
  try {
    // A4 dimensions in mm
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;

    // --- Cyber/Secure Design ---
    
    // 1. Background Grid (Light grey to be printable but look technical)
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.1);
    for (let i = 0; i < pageHeight; i += 10) {
      doc.line(0, i, pageWidth, i);
    }
    for (let i = 0; i < pageWidth; i += 10) {
      doc.line(i, 0, i, pageHeight);
    }

    // 2. Borders (Double line: Green/Black tactical feel)
    doc.setDrawColor(0, 0, 0); // Black outer
    doc.setLineWidth(1);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    doc.setDrawColor(0, 200, 0); // Green inner accent (simulating the cyber feel but printable)
    doc.setLineWidth(0.5);
    doc.rect(margin + 2, margin + 2, pageWidth - 2 * margin - 4, pageHeight - 2 * margin - 4);

    // 3. Header
    doc.setFont('courier', 'bold'); // Monospace for technical look
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    doc.text('KENYA REVENUE AUTHORITY', pageWidth / 2, margin + 25, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(0, 150, 0); // Dark Green
    doc.text('TAX COMPLIANCE CERTIFICATE', pageWidth / 2, margin + 35, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(margin + 10, margin + 40, pageWidth - margin - 10, margin + 40);

    // 4. Content Block
    let yPos = margin + 60;
    
    // Watermark (Faint)
    doc.setTextColor(240, 240, 240);
    doc.setFontSize(60);
    doc.text('VALID', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });

    // Reset Text
    doc.setTextColor(0, 0, 0);
    doc.setFont('courier', 'normal');
    
    // Details
    const addField = (label: string, value: string) => {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(label.toUpperCase(), margin + 20, yPos);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont('courier', 'bold');
      doc.text(value, margin + 80, yPos);
      
      yPos += 12;
    };

    addField('Certificate No:', `KRA/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000000)}`);
    addField('PIN Number:', pin);
    addField('Taxpayer Name:', name.toUpperCase());
    addField('Validation Date:', new Date().toLocaleDateString());
    addField('Expiry Date:', new Date(Date.now() + 31536000000).toLocaleDateString()); // +1 year

    yPos += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin + 20, yPos, pageWidth - margin - 20, yPos);
    yPos += 20;

    // 5. Compliance Statement
    doc.setFont('courier', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const text = "This is to certify that the above named taxpayer has filed relevant tax returns and paid taxes due as provided by Law. This certificate is valid for twelve (12) months from the date of issue.";
    const splitText = doc.splitTextToSize(text, pageWidth - 2 * (margin + 20));
    doc.text(splitText, margin + 20, yPos);

    // 6. QR Code Placeholder
    const qrSize = 30;
    const qrY = pageHeight - margin - 60;
    const qrX = pageWidth - margin - 50;
    
    doc.setFillColor(0, 0, 0);
    doc.rect(qrX, qrY, qrSize, qrSize, 'F'); // Black box
    doc.setFillColor(255, 255, 255);
    doc.rect(qrX + 2, qrY + 2, qrSize - 4, qrSize - 4, 'F'); // White inner
    
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text("SCAN TO VERIFY", qrX + qrSize/2, qrY + qrSize + 5, { align: 'center' });

    // 7. Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('SYSTEM GENERATED DOCUMENT - OMNI.SECURE.SYSTEMS', margin + 5, pageHeight - margin - 5);
    doc.text(`RID: ${Math.random().toString(36).substring(7).toUpperCase()}`, pageWidth - margin - 5, pageHeight - margin - 5, { align: 'right' });


    // Save
    doc.save(`KRA_CERT_${pin}.pdf`);
    return true;

  } catch (error) {
    console.error("PDF Generation Failed:", error);
    throw error;
  }
};
