// URL to the PDF file
const url = 'assets/InfinityWebsite.pdf';

// Initialize PDF.js library
const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.js';

// Asynchronous function to render the PDF
async function renderPDF() {
    const pdfViewer = document.getElementById('pdf-viewer');
    
    // Load the PDF document
    const pdfDoc = await pdfjsLib.getDocument(url).promise;

    // Loop through all the pages and render them on canvas
    for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
        const page = await pdfDoc.getPage(pageNumber);
        
        // Create a canvas element for each page
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Set canvas dimensions based on page size
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render the page into the canvas context
        await page.render({ canvasContext: context, viewport: viewport }).promise;
        
        // Append the canvas to the viewer container
        pdfViewer.appendChild(canvas);
    }
}

// Call the renderPDF function when the page loads
renderPDF();
