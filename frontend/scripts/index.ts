const images: HTMLImageElement[] = Array.from(document.querySelectorAll('.galleryImg'));
const imgGallery = document.getElementById('imgs') as HTMLElement;

const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const preview = document.getElementById('preview') as HTMLImageElement;
const form = document.getElementById('uploadForm') as HTMLFormElement;

const resizant = document.getElementById('resizant') as HTMLImageElement;
const resizeButton = document.getElementById('resize') as HTMLButtonElement;
const widthR = document.getElementById('widthResize') as HTMLInputElement;
const heightR = document.getElementById('heightResize') as HTMLInputElement;

const generateButton = document.getElementById('generateImg') as HTMLButtonElement;
const widthPH = document.getElementById('widthPH') as HTMLInputElement;
const heightPH = document.getElementById('heightPH') as HTMLInputElement;

let currentIndex = 0;
const port = "http://localhost:3000";

function showImage(index: number): void {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}

function getActiveImg(): HTMLImageElement {
    return document.querySelector('.active') as HTMLImageElement;
}

function nextImage(): void {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage(): void {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function selectImage(): void {
    const activeImg = getActiveImg();
    if (activeImg) {
        resizant.src = '';
        resizant.src = activeImg.src;
    }
}

resizeButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const filename = (resizant.src.split('/').pop() || '').split('.').shift();
    const widthNum = parseInt(widthR.value);
    const heightNum = parseInt(heightR.value);

    const response = await fetch(`${port}/resize?filename=${filename}&width=${widthNum}&height=${heightNum}`);
    if (response.ok) {
        const a = document.getElementById('resizeLink') as HTMLAnchorElement;
        a.href = `${port}/resize?filename=${filename}&width=${widthNum}&height=${heightNum}`;
        a.innerHTML = "Resized Image HERE!!! :D";
    } else{
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
    }
    
});

generateButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const widthNum = parseInt(widthPH.value);
    const heightNum = parseInt(heightPH.value);

    const response = await fetch(`${port}/generate?width=${widthNum}px&height=${heightNum}px`);
    if (response.ok) {
        const a = document.getElementById('placeholderImg') as HTMLAnchorElement;
        a.href = `${port}/generate?width=${widthNum}px&height=${heightNum}px`;
        a.innerHTML = "Generated Image HERE!!! :D";
    } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
    }
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const file = fileInput.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('resizant', file);
  
    const response = await fetch(`${port}/upload`, {
        method: 'POST',
        body: formData
    });
  
    const result = await response.json();
  
    if (response.ok) {
        const imageUrl = `src/images/${result.filename}`;
        alert(`Image uploaded: ${imageUrl}`);
        preview.src = '';
    
        const duplicate = images.some(img => img.src.endsWith(result.filename));
        if (duplicate) {
            alert('This image is already in the gallery!');
            return;
        }
    
        const newImg = document.createElement('img');
        newImg.setAttribute('src', `../src/images/${result.filename}`);
        newImg.classList.add('galleryImg');
        imgGallery.appendChild(newImg);
    
        images.push(newImg);
        showImage(images.length - 1);
    } else {
        alert('Please Upload an image With The Correct Extensions (.jpg)');
    }
});
