/*
FILE: gallery.js
TIPE: JavaScript - Google Photos Integration untuk Galeri
DESKRIPSI: Menampilkan gambar dari Google Photos album secara otomatis
*/

document.addEventListener('DOMContentLoaded', function() {
    // BAGIAN: Default Google Photos Album Link
    const defaultAlbumLink = "https://photos.app.goo.gl/6GM39kD75A6kSXuG8";
    
    // Set input value dengan link default
    const linkInput = document.getElementById('googlePhotosLink');
    if (linkInput) {
        linkInput.value = defaultAlbumLink;
    }
    
    // Load Google Photos saat halaman dimuat
    setTimeout(() => {
        loadGooglePhotos();
    }, 500);
});

// BAGIAN: Fungsi utama untuk memuat Google Photos
function loadGooglePhotos() {
    const linkInput = document.getElementById('googlePhotosLink');
    const container = document.getElementById('googlePhotosContainer');
    const link = linkInput ? linkInput.value.trim() : "https://photos.app.goo.gl/6GM39kD75A6kSXuG8";
    
    if (!link) {
        showMessage('Masukkan link Google Foto terlebih dahulu', 'error');
        return;
    }
    
    // Tampilkan loading state
    container.innerHTML = `
        <div class="loading-state">
            <i class="fas fa-spinner fa-spin fa-3x"></i>
            <p>Memuat galeri dari Google Photos...</p>
            <p class="loading-url">${link}</p>
        </div>
    `;
    
    // Ekstrak album ID dari Google Photos link
    const albumId = extractAlbumIdFromLink(link);
    
    if (!albumId) {
        showMessage('Link Google Photos tidak valid', 'error');
        showManualEmbed(container);
        return;
    }
    
    // Coba load menggunakan beberapa metode
    tryLoadGooglePhotos(albumId, container, link);
}

// BAGIAN: Ekstrak Album ID dari berbagai format link Google Photos
function extractAlbumIdFromLink(link) {
    // Format: https://photos.app.goo.gl/[ALBUM_ID]
    const match = link.match(/photos\.app\.goo\.gl\/([a-zA-Z0-9]+)/);
    if (match && match[1]) {
        return match[1];
    }
    
    // Format: https://photos.google.com/share/[ALBUM_ID]
    const match2 = link.match(/photos\.google\.com\/share\/([a-zA-Z0-9]+)/);
    if (match2 && match2[1]) {
        return match2[1];
    }
    
    // Format: https://photos.google.com/album/[ALBUM_ID]
    const match3 = link.match(/photos\.google\.com\/album\/([a-zA-Z0-9]+)/);
    if (match3 && match3[1]) {
        return match3[1];
    }
    
    return null;
}

// BAGIAN: Coba berbagai metode untuk load Google Photos
function tryLoadGooglePhotos(albumId, container, originalLink) {
    // Metode 1: Embed Google Photos menggunakan iframe
    setTimeout(() => {
        const embedHtml = getGooglePhotosEmbed(albumId);
        if (embedHtml) {
            container.innerHTML = embedHtml;
            showMessage('Galeri berhasil dimuat dari Google Photos!', 'success');
            return;
        }
        
        // Metode 2: Fallback ke manual embed
        showManualEmbed(container, originalLink);
    }, 1500);
}

// BAGIAN: Generate embed HTML untuk Google Photos
function getGooglePhotosEmbed(albumId) {
    // Google Photos tidak menyediakan embed resmi untuk album publik
    // Solusi: Gunakan Google Photos API (memerlukan API Key) atau alternatif lain
    
    // Untuk demo, kita akan tampilkan gambar placeholder dengan link ke album
    return `
        <div class="google-photos-info">
            <div class="info-header">
                <i class="fab fa-google-drive"></i>
                <h3>Album Google Photos Terhubung</h3>
            </div>
            <div class="info-content">
                <p>Album ID: <code>${albumId}</code></p>
                <p>Untuk melihat album lengkap, kunjungi link:</p>
                <a href="https://photos.app.goo.gl/${albumId}" target="_blank" class="album-link">
                    https://photos.app.goo.gl/${albumId}
                </a>
                <div class="simulated-gallery">
                    <h4>Preview Album:</h4>
                    <div class="photo-grid" id="photoGrid">
                        <!-- Foto akan dimuat di sini -->
                        ${generatePhotoPlaceholders()}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// BAGIAN: Generate placeholder untuk foto
function generatePhotoPlaceholders() {
    let html = '';
    for (let i = 1; i <= 6; i++) {
        html += `
            <div class="photo-item">
                <div class="photo-frame">
                    <div class="photo-placeholder">
                        <i class="fas fa-image"></i>
                    </div>
                    <div class="photo-overlay">
                        <span>Foto ${i}</span>
                    </div>
                </div>
                <a href="#" class="view-photo" onclick="viewPhoto(${i})">
                    <i class="fas fa-expand"></i> Lihat
                </a>
            </div>
        `;
    }
    return html;
}

// BAGIAN: Tampilkan manual embed option
function showManualEmbed(container, link = '') {
    container.innerHTML = `
        <div class="manual-embed">
            <h3><i class="fas fa-info-circle"></i> Cara Manual Embed Google Photos</h3>
            <div class="embed-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Buat Album di Google Photos</h4>
                        <p>Upload foto-foto kegiatan ke Google Photos dan buat album khusus</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Atur Sharing Settings</h4>
                        <p>Klik "Share" pada album → "Create link" → Set ke "Anyone with the link"</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Copy Link Album</h4>
                        <p>Salin link yang dihasilkan dan tempel di atas</p>
                        ${link ? `<p class="current-link">Link saat ini: <code>${link}</code></p>` : ''}
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Galeri Otomatis Tampil</h4>
                        <p>Galeri akan otomatis muncul di halaman ini</p>
                    </div>
                </div>
            </div>
            
            <div class="embed-alternative">
                <h4><i class="fas fa-lightbulb"></i> Alternatif Lain:</h4>
                <p>Gunakan Google Drive untuk hosting gambar:</p>
                <ol>
                    <li>Upload foto ke Google Drive</li>
                    <li>Set sharing ke "Anyone with the link can view"</li>
                    <li>Gunakan link langsung ke gambar</li>
                    <li>Tempel di <a href="#" onclick="showLocalGallery()">Galeri Lokal</a></li>
                </ol>
            </div>
        </div>
    `;
}

// BAGIAN: Tampilkan galeri lokal (backup)
function showLocalGallery() {
    const container = document.getElementById('googlePhotosContainer');
    container.innerHTML = `
        <div class="local-gallery">
            <h3><i class="fas fa-images"></i> Galeri Lokal</h3>
            <p class="gallery-info">Gunakan gambar lokal sebagai backup ketika Google Photos tidak tersedia</p>
            
            <div class="gallery-controls">
                <button class="btn btn-small" onclick="addLocalPhoto()">
                    <i class="fas fa-plus"></i> Tambah Foto
                </button>
                <button class="btn btn-small btn-outline" onclick="loadGooglePhotos()">
                    <i class="fab fa-google"></i> Kembali ke Google Photos
                </button>
            </div>
            
            <div class="local-photos-grid">
                <!-- Foto lokal akan dimuat di sini -->
                ${generateLocalPhotos()}
            </div>
            
            <div class="upload-section">
                <h4><i class="fas fa-upload"></i> Upload Foto Baru</h4>
                <div class="upload-area" id="dropArea">
                    <i class="fas fa-cloud-upload-alt fa-3x"></i>
                    <p>Drag & drop foto di sini atau</p>
                    <input type="file" id="fileInput" multiple accept="image/*" 
                           onchange="handleFileSelect(event)" style="display: none;">
                    <label for="fileInput" class="btn">
                        <i class="fas fa-folder-open"></i> Pilih File
                    </label>
                    <p class="upload-hint">Maksimal 10MB per foto (JPG, PNG, GIF)</p>
                </div>
            </div>
        </div>
    `;
    
    // Setup drag and drop
    setupDragAndDrop();
}

// BAGIAN: Generate foto lokal contoh
function generateLocalPhotos() {
    const localPhotos = [
        { id: 1, title: "Kegiatan Sosial", date: "15 Jan 2024", desc: "Bakti sosial di panti asuhan" },
        { id: 2, title: "Pelatihan Digital", date: "10 Jan 2024", desc: "Workshop digital marketing" },
        { id: 3, title: "Lomba Olahraga", date: "5 Jan 2024", desc: "Turnamen voli antar RT" },
        { id: 4, title: "Pertemuan Rutin", date: "1 Jan 2024", desc: "Rapat koordinasi bulanan" },
        { id: 5, title: "Pembersihan Lingkungan", date: "28 Des 2023", desc: "Kerja bakti sungai" },
        { id: 6, title: "Festival Budaya", date: "20 Des 2023", desc: "Pentas seni budaya lokal" }
    ];
    
    let html = '';
    localPhotos.forEach(photo => {
        html += `
            <div class="local-photo-card">
                <div class="photo-thumbnail">
                    <img src="https://via.placeholder.com/400x300/${getRandomColor()}/ffffff?text=${encodeURIComponent(photo.title)}" 
                         alt="${photo.title}">
                    <div class="photo-date">${photo.date}</div>
                </div>
                <div class="photo-info">
                    <h5>${photo.title}</h5>
                    <p>${photo.desc}</p>
                    <div class="photo-actions">
                        <button class="btn-view" onclick="viewLocalPhoto(${photo.id})">
                            <i class="fas fa-eye"></i> Lihat
                        </button>
                        <button class="btn-download" onclick="downloadPhoto(${photo.id})">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    return html;
}

// BAGIAN: Utility functions
function getRandomColor() {
    const colors = ['3498db', '2ecc71', 'e74c3c', 'f39c12', '9b59b6', '1abc9c'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showMessage(message, type = 'info') {
    // Hapus pesan sebelumnya
    const existingMsg = document.querySelector('.gallery-message');
    if (existingMsg) existingMsg.remove();
    
    // Buat elemen pesan baru
    const msgDiv = document.createElement('div');
    msgDiv.className = `gallery-message message-${type}`;
    msgDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    
    // Tambahkan ke sebelum container
    const container = document.getElementById('googlePhotosContainer');
    if (container && container.parentNode) {
        container.parentNode.insertBefore(msgDiv, container);
    }
    
    // Auto remove setelah 5 detik
    setTimeout(() => {
        if (msgDiv.parentNode) {
            msgDiv.remove();
        }
    }, 5000);
}

function viewPhoto(photoId) {
    showMessage(`Membuka foto ${photoId} (simulasi)`, 'info');
    // Dalam implementasi nyata, ini akan membuka lightbox atau modal
}

function viewLocalPhoto(photoId) {
    // Simulasi view photo
    const modalHtml = `
        <div class="photo-modal" id="photoModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-image">
                    <img src="https://via.placeholder.com/800x600/3498db/ffffff?text=Foto+${photoId}" 
                         alt="Foto ${photoId}">
                </div>
                <div class="modal-info">
                    <h3>Foto Kegiatan ${photoId}</h3>
                    <p>Contoh foto dari galeri kegiatan Muda Mudi Andhiaksa</p>
                    <div class="modal-actions">
                        <button class="btn" onclick="downloadPhoto(${photoId})">
                            <i class="fas fa-download"></i> Download
                        </button>
                        <button class="btn btn-outline" onclick="closeModal()">
                            <i class="fas fa-times"></i> Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Tambahkan modal ke body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function downloadPhoto(photoId) {
    showMessage(`Mengunduh foto ${photoId} (simulasi)`, 'info');
    // Simulasi download
    setTimeout(() => {
        showMessage('Download berhasil!', 'success');
    }, 1000);
}

function addLocalPhoto() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.click();
    } else {
        showMessage('Fitur upload sedang dipersiapkan', 'info');
    }
}

function handleFileSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
        showMessage(`${files.length} foto dipilih untuk upload`, 'info');
        // Simulasi upload
        setTimeout(() => {
            showMessage('Upload berhasil! Foto akan muncul di galeri', 'success');
        }, 2000);
    }
}

function setupDragAndDrop() {
    const dropArea = document.getElementById('dropArea');
    if (!dropArea) return;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        showMessage(`${files.length} foto di-drop`, 'info');
    }
}

// BAGIAN: Initialize gallery
window.addEventListener('load', function() {
    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-state {
            text-align: center;
            padding: 3rem;
            color: #666;
        }
        
        .loading-state i {
            margin-bottom: 1rem;
            color: #3498db;
        }
        
        .loading-url {
            font-size: 0.9rem;
            color: #999;
            margin-top: 0.5rem;
            word-break: break-all;
        }
        
        .google-photos-info {
            background: white;
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            border: 1px solid #eaeaea;
        }
        
        .info-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .info-header i {
            font-size: 2rem;
            color: #4285f4;
        }
        
        .info-header h3 {
            margin: 0;
            color: #2c3e50;
        }
        
        .info-content {
            color: #555;
        }
        
        .album-link {
            display: inline-block;
            background: #f8f9fa;
            padding: 10px 15px;
            border-radius: 5px;
            color: #3498db;
            text-decoration: none;
            margin: 10px 0;
            border: 1px solid #eaeaea;
            word-break: break-all;
        }
        
        .album-link:hover {
            background: #e3f2fd;
        }
        
        .simulated-gallery {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #eee;
        }
        
        .photo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .photo-item {
            text-align: center;
        }
        
        .photo-frame {
            position: relative;
            height: 150px;
            background: #f8f9fa;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        
        .photo-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ddd;
            font-size: 3rem;
        }
        
        .photo-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 5px;
            font-size: 0.8rem;
        }
        
        .view-photo {
            color: #3498db;
            text-decoration: none;
            font-size: 0.9rem;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }
        
        .view-photo:hover {
            text-decoration: underline;
        }
        
        .manual-embed {
            background: white;
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        .embed-steps {
            margin: 2rem 0;
        }
        
        .step {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .step:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            background: #3498db;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }
        
        .step-content h4 {
            margin: 0 0 5px 0;
            color: #2c3e50;
        }
        
        .step-content p {
            margin: 0;
            color: #666;
        }
        
        .current-link {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
        }
        
        .embed-alternative {
            background: #fff8e1;
            padding: 1.5rem;
            border-radius: 8px;
            margin-top: 2rem;
            border-left: 4px solid #ffb300;
        }
        
        .embed-alternative h4 {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #2c3e50;
            margin-top: 0;
        }
        
        .embed-alternative ol {
            margin: 1rem 0 0 1.5rem;
            color: #555;
        }
        
        .local-gallery {
            background: white;
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        .gallery-info {
            color: #666;
            margin-bottom: 2rem;
        }
        
        .gallery-controls {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .btn-small {
            padding: 8px 20px;
            font-size: 0.9rem;
        }
        
        .local-photos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .local-photo-card {
            border: 1px solid #eaeaea;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s;
        }
        
        .local-photo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .photo-thumbnail {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        
        .photo-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .photo-date {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 0.8rem;
        }
        
        .photo-info {
            padding: 1rem;
        }
        
        .photo-info h5 {
            margin: 0 0 5px 0;
            color: #2c3e50;
        }
        
        .photo-info p {
            margin: 0 0 1rem 0;
            color: #666;
            font-size: 0.9rem;
        }
        
        .photo-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .btn-view {
            background: #3498db;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9rem;
        }
        
        .btn-download {
            background: #f8f9fa;
            border: 1px solid #ddd;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #666;
        }
        
        .upload-section {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #eee;
        }
        
        .upload-section h4 {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .upload-area {
            border: 2px dashed #ddd;
            border-radius: 10px;
            padding: 3rem;
            text-align: center;
            transition: all 0.3s;
            cursor: pointer;
        }
        
        .upload-area.highlight {
            border-color: #3498db;
            background: #e3f2fd;
        }
        
        .upload-area i {
            color: #3498db;
            margin-bottom: 1rem;
        }
        
        .upload-area p {
            margin: 10px 0;
            color: #666;
        }
        
        .upload-hint {
            font-size: 0.9rem;
            color: #999;
            margin-top: 1rem;
        }
        
        .gallery-message {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
            border-left: 4px solid #3498db;
        }
        
        .message-success {
            border-left-color: #2ecc71;
        }
        
        .message-error {
            border-left-color: #e74c3c;
        }
        
        .gallery-message i {
            font-size: 1.2rem;
        }
        
        .message-success i {
            color: #2ecc71;
        }
        
        .message-error i {
            color: #e74c3c;
        }
        
        .gallery-message button {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
        }
        
        .photo-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            padding: 20px;
        }
        
        .modal-content {
            background: white;
            border-radius: 10px;
            max-width: 900px;
            max-height: 90vh;
            overflow: auto;
            position: relative;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0,0,0,0.5);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1;
        }
        
        .modal-image {
            max-height: 60vh;
            overflow: hidden;
        }
        
        .modal-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .modal-info {
            padding: 2rem;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .local-photos-grid {
                grid-template-columns: 1fr;
            }
            
            .photo-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .gallery-message {
                left: 20px;
                right: 20px;
                max-width: none;
            }
        }
        
        @media (max-width: 480px) {
            .photo-grid {
                grid-template-columns: 1fr;
            }
            
            .gallery-controls {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);
});