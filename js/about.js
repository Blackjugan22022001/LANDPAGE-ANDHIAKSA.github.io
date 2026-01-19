/*
FILE: about.js
TIPE: JavaScript - Interaktivitas Halaman About dengan Struktur Organisasi 2025
DESKRIPSI: Mengatur fitur khusus halaman tentang kami dengan struktur organisasi
*/

document.addEventListener('DOMContentLoaded', function() {
    // BAGIAN: Initialize About Page
    
    // BAGIAN: Animate Organization Cards
    const orgCards = document.querySelectorAll('.org-card, .divisi-card, .program-card');
    orgCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // BAGIAN: Organization Chart Interaction
    const orgLevels = document.querySelectorAll('.org-level');
    orgLevels.forEach(level => {
        level.addEventListener('mouseenter', function() {
            const levelNumber = this.className.match(/level-(\d)/);
            if (levelNumber) {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            }
        });
        
        level.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // BAGIAN: Division Card Toggle
    const divisionHeaders = document.querySelectorAll('.divisi-header');
    divisionHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const divisionCard = this.closest('.divisi-card');
            const members = divisionCard.querySelector('.divisi-members');
            
            if (members.style.display === 'none') {
                members.style.display = 'block';
                members.style.animation = 'slideDown 0.3s ease';
            } else {
                members.style.display = 'none';
            }
        });
    });
    
    // BAGIAN: Member Count Animation
    const memberCounts = document.querySelectorAll('.member-count');
    memberCounts.forEach(count => {
        const originalText = count.textContent;
        const memberNumber = parseInt(originalText);
        
        count.addEventListener('mouseenter', function() {
            this.textContent = `👥 ${memberNumber} Pengurus`;
            this.style.background = '#3498db';
            this.style.color = 'white';
        });
        
        count.addEventListener('mouseleave', function() {
            this.textContent = originalText;
            this.style.background = '#f0f7ff';
            this.style.color = '#3498db';
        });
    });
    
    // BAGIAN: Organization Hierarchy Visualization
    function highlightHierarchy() {
        const connectors = document.querySelectorAll('.org-connector');
        connectors.forEach(connector => {
            connector.addEventListener('mouseenter', function() {
                const line = this.querySelector('.connector-line');
                const arrow = this.querySelector('i');
                
                line.style.height = '40px';
                line.style.background = '#e74c3c';
                arrow.style.color = '#e74c3c';
                arrow.style.transform = 'scale(1.2)';
            });
            
            connector.addEventListener('mouseleave', function() {
                const line = this.querySelector('.connector-line');
                const arrow = this.querySelector('i');
                
                line.style.height = '30px';
                line.style.background = '#3498db';
                arrow.style.color = '#3498db';
                arrow.style.transform = 'scale(1)';
            });
        });
    }
    
    highlightHierarchy();
    
    // BAGIAN: Print Organization Structure
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Cetak Struktur Organisasi';
    printBtn.className = 'btn btn-outline print-btn';
    printBtn.style.margin = '20px auto';
    printBtn.style.display = 'block';
    
    const structureSection = document.querySelector('.structure-section-2025');
    if (structureSection) {
        structureSection.parentNode.insertBefore(printBtn, structureSection.nextSibling);
        
        printBtn.addEventListener('click', function() {
            // Create print version
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Struktur Organisasi Muda-Mudi Andhiaksa 2025</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h1 { color: #2c3e50; text-align: center; }
                        h2 { color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                        .org-level { margin: 20px 0; padding: 15px; border-left: 4px solid #3498db; }
                        .org-card { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; }
                        .divisi-card { background: #fff; border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
                        @media print {
                            .no-print { display: none; }
                            body { font-size: 12pt; }
                        }
                    </style>
                </head>
                <body>
                    <h1>STRUKTUR ORGANISASI MUDA-MUDI ANDHIAKSA 2025</h1>
                    <p><strong>Alamat:</strong> Dk. Klenisan RT 3 RW 4, Kelurahan Geneng, Kecamatan Gatak, Kabupaten Sukoharjo</p>
                    ${structureSection.innerHTML}
                    <p style="text-align: center; margin-top: 30px; font-style: italic;">
                        Dicetak pada: ${new Date().toLocaleDateString('id-ID')}
                    </p>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        });
    }
    
    // BAGIAN: Search Functionality in Organization
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Cari nama pengurus...';
    searchInput.className = 'org-search-input';
    searchInput.style.width = '100%';
    searchInput.style.padding = '10px';
    searchInput.style.margin = '20px 0';
    searchInput.style.border = '1px solid #ddd';
    searchInput.style.borderRadius = '5px';
    
    if (structureSection) {
        structureSection.parentNode.insertBefore(searchInput, structureSection);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const memberItems = document.querySelectorAll('.member-item h5, .divisi-members li');
            
            memberItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const parent = item.closest('.member-item, .divisi-members li');
                
                if (text.includes(searchTerm)) {
                    parent.style.background = '#fff3cd';
                    parent.style.border = '2px solid #ffc107';
                    parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    parent.style.background = '';
                    parent.style.border = '';
                }
            });
        });
    }
    
    // BAGIAN: Add Animation Styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .print-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin: 20px auto;
            padding: 12px 25px;
            font-size: 1rem;
        }
        
        .org-search-input:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }
    `;
    document.head.appendChild(style);
});

// BAGIAN: Export Organization Data
window.exportOrganizationData = function() {
    const orgData = {
        periode: '2025',
        alamat: 'Dk. Klenisan RT 3 RW 4, Kelurahan Geneng, Kecamatan Gatak, Kabupaten Sukoharjo',
        pembina: ['Bapak Sumardi'],
        penasehat: ['Bapak Yuli', 'Ibu Tri (pamong)'],
        pimpinan: {
            ketua: 'Tulus Arendra Bagaskara',
            wakil: 'Dito Prasetyo Mukti'
        },
        sekretaris: [
            'Fitri Damayanti Prastyaningrum',
            'Isna Wahyu Karomah',
            'Nadia Windaningtyas'
        ],
        bendahara: [
            'Deshinta Aisyah Nur Dwi Azizah',
            'Anisah Rahmadea',
            'Krismonnita'
        ],
        divisi: {
            humas: {
                ketua: 'Agus Santosa',
                anggota: [
                    'Ferdian Ardy Nugroho',
                    'Excel',
                    'Yudha Tri Anggara',
                    'Syakban Tri Handoko',
                    'Dayat',
                    'Yayan',
                    'Rio Aditama',
                    'Bima'
                ]
            },
            mediaKreatif: {
                ketua: 'Vito',
                anggota: [
                    'Isma Ruli Ardiansyah',
                    'Nasir Nugroho',
                    'Bagus Adi Kusumo'
                ]
            },
            pendidikanSDM: {
                ketua: 'Ilham',
                anggota: ['Sony Setyawan']
            },
            sosialKeagamaan: {
                ketua: 'Regiska Putri Alika Maharani',
                anggota: [
                    'Alya Revalina Alini',
                    'Indah Partanti',
                    'Luthfi',
                    'Nayla Salsa Ramadhani',
                    'Wanda Tri Arsana Putri',
                    'Erfina Meita Saei',
                    'Ella Agestina'
                ]
            }
        }
    };
    
    return orgData;
};

// BAGIAN: Get Member Statistics
window.getOrganizationStats = function() {
    const data = window.exportOrganizationData();
    const stats = {
        totalPengurus: 0,
        jumlahDivisi: Object.keys(data.divisi).length,
        jumlahPerempuan: 0,
        jumlahLaki: 0
    };
    
    // Hitung total pengurus
    stats.totalPengurus += 1; // Ketua RT
    stats.totalPengurus += data.penasehat.length;
    stats.totalPengurus += 2; // Ketua & Wakil
    stats.totalPengurus += data.sekretaris.length;
    stats.totalPengurus += data.bendahara.length;
    
    // Hitung anggota divisi
    Object.values(data.divisi).forEach(divisi => {
        stats.totalPengurus += 1; // Ketua divisi
        stats.totalPengurus += divisi.anggota.length;
    });
    
    return stats;
};