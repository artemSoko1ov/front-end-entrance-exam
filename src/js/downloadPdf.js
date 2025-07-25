import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

document.querySelector('.download-button').addEventListener('click', () => {
    const element = document.querySelector('.content');
    const isSmallScreen = window.innerWidth <= 1024;

    html2canvas(element, {
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pxPerMm = imgWidth / pageWidth;

        // если ширина экрана меньше 1024, то разбиваем резюме на несколько страниц pdf

        if (isSmallScreen) {

            const pageHeightPx = pageHeight * pxPerMm;

            let position = 0;
            let page = 0;

            while (position < imgHeight) {
                const canvasPage = document.createElement('canvas');
                canvasPage.width = imgWidth;
                canvasPage.height = Math.min(pageHeightPx, imgHeight - position);

                const ctx = canvasPage.getContext('2d');
                ctx.drawImage(canvas, 0, position, imgWidth, canvasPage.height, 0, 0, imgWidth, canvasPage.height);

                const pageData = canvasPage.toDataURL('image/png');
                if (page > 0) pdf.addPage();
                pdf.addImage(pageData, 'PNG', 0, 0, pageWidth, (canvasPage.height / pxPerMm));
                position += pageHeightPx;
                page++;
            }
        } else {
            const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
            const scaledWidth = imgWidth * ratio;
            const scaledHeight = imgHeight * ratio;

            const marginX = (pageWidth - scaledWidth) / 2;
            const marginY = (pageHeight - scaledHeight) / 2;

            pdf.addImage(imgData, 'PNG', marginX, marginY, scaledWidth, scaledHeight);
        }

        pdf.save('resume.pdf');
    });
});
