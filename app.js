const extractBtn = document.getElementById('extractBtn');
const urlInput = document.getElementById('urlInput');
const statusMsg = document.getElementById('statusMsg');
const container = document.getElementById('imageContainer');
const printBtn = document.getElementById('printBtn');

extractBtn.addEventListener('click', async () => {
    const rawUrl = urlInput.value.trim();
    if (!rawUrl) return;

    // Reset UI
    container.innerHTML = '';
    statusMsg.textContent = 'Fetching form data...';
    printBtn.classList.add('hidden');

    try {
        // Use AllOrigins proxy to bypass CORS protection on client-side
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rawUrl)}`;

        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (!data.contents) throw new Error('Could not retrieve data');

        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');

        // Find images. Google forms usually host images on googleusercontent.
        // We look for 'img' tags and filter for specific sources.
        const allImages = Array.from(doc.querySelectorAll('img'));

        // Filter logic:
        // 1. Must contain 'googleusercontent'
        // 2. Ignore small icons or profile pics (usually tiny width/height attributes or specific classes)
        // 3. Deduplicate URLs
        const uniqueSrcs = new Set();
        const largeImages = allImages.filter(img => {
            const src = img.src || img.getAttribute('data-src');
            if (!src || !src.includes('googleusercontent')) return false;

            // Basic heuristic: Skip tracking pixels or icons (often lack style or width)
            // Note: We can't know true size until load, but we can grab the first distinct ones.
            if (uniqueSrcs.has(src)) return false;

            uniqueSrcs.add(src);
            return true;
        });

        // Limit to first 5
        const top5 = largeImages.slice(0, 5);

        if (top5.length === 0) {
            statusMsg.textContent = 'No images found. Note: "forms.gle" links might redirect. Try pasting the full "docs.google.com" link.';
            return;
        }

        // Render images
        top5.forEach(imgElement => {
            const img = document.createElement('img');
            // Ensure we use the proxy for the image src if it's protected,
            // but usually googleusercontent is public.
            img.src = imgElement.src || imgElement.getAttribute('data-src');
            img.crossOrigin = "Anonymous";
            container.appendChild(img);
        });

        statusMsg.textContent = `Found ${top5.length} images. Ready to print.`;
        printBtn.classList.remove('hidden');

    } catch (err) {
        console.error(err);
        statusMsg.textContent = 'Error: ' + err.message;
    }
});