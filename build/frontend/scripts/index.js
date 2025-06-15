"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const images = Array.from(document.querySelectorAll('.galleryImg'));
const imgGallery = document.getElementById('imgs');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const form = document.getElementById('uploadForm');
const resizant = document.getElementById('resizant');
const resizeButton = document.getElementById('resize');
const widthR = document.getElementById('widthResize');
const heightR = document.getElementById('heightResize');
const generateButton = document.getElementById('generateImg');
const widthPH = document.getElementById('widthPH');
const heightPH = document.getElementById('heightPH');
let currentIndex = 0;
const port = "http://localhost:3000";
function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}
function getActiveImg() {
    return document.querySelector('.active');
}
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}
function selectImage() {
    const activeImg = getActiveImg();
    if (activeImg) {
        resizant.src = '';
        resizant.src = activeImg.src;
    }
}
resizeButton.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const filename = (resizant.src.split('/').pop() || '').split('.').shift();
    const widthNum = parseInt(widthR.value);
    const heightNum = parseInt(heightR.value);
    const response = yield fetch(`${port}/resize?filename=${filename}&width=${widthNum}&height=${heightNum}`);
    if (response.ok) {
        const a = document.getElementById('resizeLink');
        a.href = `${port}/resize?filename=${filename}&width=${widthNum}&height=${heightNum}`;
        a.innerHTML = "Resized Image HERE!!! :D";
    }
    else {
        const errorText = yield response.text();
        alert(`Error: ${errorText}`);
    }
}));
generateButton.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const widthNum = parseInt(widthPH.value);
    const heightNum = parseInt(heightPH.value);
    const response = yield fetch(`${port}/generate?width=${widthNum}px&height=${heightNum}px`);
    if (response.ok) {
        const a = document.getElementById('placeholderImg');
        a.href = `${port}/generate?width=${widthNum}px&height=${heightNum}px`;
        a.innerHTML = "Generated Image HERE!!! :D";
    }
    else {
        const errorText = yield response.text();
        alert(`Error: ${errorText}`);
    }
}));
fileInput.addEventListener('change', () => {
    var _a;
    const file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
    }
    else {
        preview.src = '';
        preview.style.display = 'none';
    }
});
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (!file)
        return;
    const formData = new FormData();
    formData.append('resizant', file);
    const response = yield fetch(`${port}/upload`, {
        method: 'POST',
        body: formData
    });
    const result = yield response.json();
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
    }
    else {
        alert('Please Upload an image With The Correct Extensions (.jpg)');
    }
}));
