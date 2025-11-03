'use strict';

/**
 * Image Compressor & Optimizer
 * Developed by RAM CYBER DEFENSE
 * © 2025 RAM Security. All rights reserved.
 * GitHub: https://github.com/rami0702
 * Email: ramemaher9@gmail.com
 */

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;
const QUALITY = 0.6;
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const compressBtn = document.getElementById('compressBtn');
const resetBtn = document.getElementById('resetBtn');
const preview = document.getElementById('preview');
const results = document.getElementById('results');
const download = document.getElementById('download');

let sourceFile = null;
let previewUrl = null;
let compressedUrl = null;

// RAM Security - Display copyright notice
function displayCopyrightNotice() {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                   IMAGE COMPRESSOR & OPTIMIZER              ║
║                                                              ║
║        Developed by: RAM CYBER DEFENSE                       ║
║        © 2025 RAM Security - All Rights Reserved            ║
║        GitHub: https://github.com/rami0702                  ║
║        Email: ramemaher9@gmail.com                          ║
║                                                              ║
║        Advanced Image Compression Technology                 ║
║        Professional Quality Optimization                    ║
╚══════════════════════════════════════════════════════════════╝
    `);
}

function showPlaceholder(target, message) {
  target.innerHTML = '';
  target.dataset.placeholder = message;
}

function clearPlaceholder(target) {
  delete target.dataset.placeholder;
}

function revokeUrl(url) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}

function resetCompressor() {
  sourceFile = null;
  revokeUrl(previewUrl);
  previewUrl = null;
  revokeUrl(compressedUrl);
  compressedUrl = null;

  fileInput.value = '';
  dropzone.classList.remove('drag-active');
  showPlaceholder(preview, 'No image selected yet');
  showPlaceholder(results, 'Compression stats will appear after processing');
  download.innerHTML = '';
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function validateFile(file) {
  if (!file) {
    alert('Please choose an image first.');
    return false;
  }
  if (!SUPPORTED_TYPES.some(type => file.type === type || file.type === 'image/jpeg' && type === 'image/jpeg')) {
    alert('Unsupported file type. Please use JPG, PNG, or WebP images.');
    return false;
  }
  if (file.size > MAX_SIZE_BYTES) {
    alert('Image is larger than 10 MB. Please select a smaller file.');
    return false;
  }
  return true;
}

function handleFile(file) {
  if (!validateFile(file)) return;

  sourceFile = file;
  revokeUrl(previewUrl);
  previewUrl = URL.createObjectURL(file);

  clearPlaceholder(preview);
  preview.innerHTML = `<img src="${previewUrl}" alt="Original image preview">`;

  showPlaceholder(results, 'Compression stats will appear after processing');
  download.innerHTML = '';
}

async function compressImage() {
  const file = sourceFile || fileInput.files[0];
  if (!validateFile(file)) return;

  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;

  if (width > MAX_WIDTH) {
    height = Math.round(height * (MAX_WIDTH / width));
    width = MAX_WIDTH;
  }
  if (height > MAX_HEIGHT) {
    width = Math.round(width * (MAX_HEIGHT / height));
    height = MAX_HEIGHT;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, width, height);

  const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';

  const blob = await new Promise(resolve => canvas.toBlob(resolve, mimeType, QUALITY));

  if (!blob) {
    alert('Unable to compress this image.');
    return;
  }

  revokeUrl(compressedUrl);
  compressedUrl = URL.createObjectURL(blob);

  clearPlaceholder(results);
  results.innerHTML = `
    <div class="result-row">
      <span class="label">Size before compression</span>
      <span class="value">${formatBytes(file.size)}</span>
    </div>
    <div class="result-row">
      <span class="label">Size after compression</span>
      <span class="value">${formatBytes(blob.size)}</span>
    </div>
    <div class="result-row">
      <span class="label">Reduction</span>
      <span class="value">${Math.max(0, 100 - Math.round((blob.size / file.size) * 100))}%</span>
    </div>
    <div class="copyright-notice" style="margin-top: 15px; padding: 10px; background: rgba(79, 70, 229, 0.1); border-radius: 8px; text-align: center; font-size: 0.8rem; color: #94a3b8;">
      <i class="fas fa-shield-alt"></i> Powered by RAM CYBER DEFENSE © 2025
    </div>
  `;

  download.innerHTML = `
    <a href="${compressedUrl}" download="compressed-${file.name}">
      <i class="fas fa-download"></i>
      Download compressed image
    </a>
    <div style="margin-top: 10px; font-size: 0.7rem; color: #64748b;">
      <i class="fas fa-code"></i> Developed by RAM Security
    </div>
  `;
}

// Event wiring
dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    fileInput.click();
  }
});

['dragenter', 'dragover'].forEach(evt => {
  dropzone.addEventListener(evt, event => {
    event.preventDefault();
    event.stopPropagation();
    dropzone.classList.add('drag-active');
  });
});

['dragleave', 'drop'].forEach(evt => {
  dropzone.addEventListener(evt, event => {
    event.preventDefault();
    event.stopPropagation();
    dropzone.classList.remove('drag-active');

    if (evt === 'drop') {
      const file = event.dataTransfer.files && event.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    }
  });
});

fileInput.addEventListener('change', event => {
  const file = event.target.files && event.target.files[0];
  if (file) {
    handleFile(file);
  }
});

compressBtn.addEventListener('click', () => {
  compressImage().catch(() => {
    alert('Something went wrong while compressing the image.');
  });
});

resetBtn.addEventListener('click', resetCompressor);

// Initialize placeholders and display copyright
resetCompressor();
displayCopyrightNotice();

// Add RAM Security watermark to console
console.log('%c🔒 RAM CYBER DEFENSE - Image Compressor & Optimizer', 'color: #4f46e5; font-size: 16px; font-weight: bold;');
console.log('%c© 2025 RAM Security - All Rights Reserved', 'color: #64748b; font-size: 12px;');
console.log('%cGitHub: https://github.com/rami0702', 'color: #94a3b8; font-size: 11px;');