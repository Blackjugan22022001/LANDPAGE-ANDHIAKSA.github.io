/*
FILE: training.js
TIPE: JavaScript - Interaktivitas Halaman Training/LMS
DESKRIPSI: Mengatur fitur khusus portal pelatihan
*/

document.addEventListener('DOMContentLoaded', function() {
    // BAGIAN: Initialize Training Page
    
    // BAGIAN: Course Progress Simulation
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = targetWidth;
        }, 300);
    });

    // BAGIAN: Live Class Countdown Timer
    function updateLiveClassTimers() {
        const liveClassCards = document.querySelectorAll('.live-class-card');
        
        liveClassCards.forEach(card => {
            const timeElement = card.querySelector('.time');
            const dateElement = card.querySelector('.date');
            const statusBadge = card.querySelector('.badge');
            
            if (timeElement && dateElement) {
                const timeText = timeElement.textContent;
                const dateText = dateElement.textContent;
                
                // Simulasi waktu live class
                const now = new Date();
                const classTime = new Date();
                
                if (dateText === 'Hari Ini') {
                    const [hours, minutes] = timeText.split(':');
                    classTime.setHours(hours, minutes, 0);
                    
                    if (classTime > now) {
                        const diff = classTime - now;
                        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
                        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        
                        if (hoursLeft > 0) {
                            statusBadge.innerHTML = `Live in ${hoursLeft}h ${minutesLeft}m`;
                        } else if (minutesLeft > 0) {
                            statusBadge.innerHTML = `Live in ${minutesLeft}m`;
                        } else {
                            statusBadge.innerHTML = 'Live Now!';
                            statusBadge.classList.add('live');
                        }
                    }
                }
            }
        });
    }

    // Update timer setiap menit
    setInterval(updateLiveClassTimers, 60000);
    updateLiveClassTimers(); // Initial call

    // BAGIAN: Course Enrollment Animation
    const enrollButtons = document.querySelectorAll('.btn-outline, .btn-primary');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Mulai') || this.textContent.includes('Lanjutkan')) {
                e.preventDefault();
                
                // Animation effect
                this.classList.add('enrolling');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
                
                setTimeout(() => {
                    this.classList.remove('enrolling');
                    this.innerHTML = '<i class="fas fa-check"></i> Berhasil!';
                    this.style.background = '#2ecc71';
                    this.style.borderColor = '#2ecc71';
                    
                    // Simulate course start
                    const courseCard = this.closest('.course-card');
                    if (courseCard) {
                        const progressSpan = courseCard.querySelector('.course-progress span');
                        if (progressSpan && progressSpan.textContent.includes('Belum Dimulai')) {
                            progressSpan.textContent = '1% Complete';
                            const progressFill = courseCard.querySelector('.progress-fill');
                            progressFill.style.width = '1%';
                        }
                    }
                }, 1500);
            }
        });
    });

    // BAGIAN: Schedule Reminder Functionality
    const reminderButtons = document.querySelectorAll('.btn-small');
    reminderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const liveClassCard = this.closest('.live-class-card');
            const className = liveClassCard.querySelector('h3').textContent;
            
            // Toggle reminder state
            if (this.classList.contains('reminder-set')) {
                this.classList.remove('reminder-set');
                this.innerHTML = '<i class="fas fa-calendar-plus"></i> Set Reminder';
                showNotification(`Reminder untuk "${className}" dihapus`, 'info');
            } else {
                this.classList.add('reminder-set');
                this.innerHTML = '<i class="fas fa-calendar-check"></i> Reminder Set';
                showNotification(`Reminder untuk "${className}" berhasil diatur`, 'success');
            }
        });
    });

    // BAGIAN: Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    // BAGIAN: Mark Announcement as Read
    const announcementCards = document.querySelectorAll('.announcement-card');
    announcementCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('read');
            // Simpan status read di localStorage
            const announcementId = this.querySelector('h3').textContent;
            localStorage.setItem(`announcement-${announcementId}`, 'read');
        });
    });

    // BAGIAN: Learning Path Progress Update
    const pathProgressBars = document.querySelectorAll('.path-progress .progress-fill');
    pathProgressBars.forEach(bar => {
        const currentWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 2s ease-in-out';
            bar.style.width = currentWidth;
        }, 500);
    });

    // BAGIAN: User Progress Simulation
    function simulateUserProgress() {
        const progressElements = document.querySelectorAll('.course-progress span');
        progressElements.forEach(element => {
            if (element.textContent.includes('%')) {
                const currentPercent = parseInt(element.textContent);
                if (currentPercent < 100) {
                    // Simulate progress over time
                    setTimeout(() => {
                        const newPercent = Math.min(currentPercent + Math.random() * 10, 100);
                        element.textContent = `${Math.round(newPercent)}% Complete`;
                        
                        const progressFill = element.closest('.course-progress').querySelector('.progress-fill');
                        if (progressFill) {
                            progressFill.style.width = `${newPercent}%`;
                        }
                    }, 3000);
                }
            }
        });
    }

    // Start progress simulation after page load
    setTimeout(simulateUserProgress, 2000);

    // BAGIAN: Integration Button Analytics
    const integrationBtn = document.querySelector('.integration-btn');
    if (integrationBtn) {
        integrationBtn.addEventListener('click', function() {
            // Track click event
            console.log('LMS Portal accessed from training page');
            
            // Simulate analytics tracking
            const analyticsData = {
                event: 'lms_portal_access',
                timestamp: new Date().toISOString(),
                source: 'training_landing_page'
            };
            
            // Store in localStorage (simulated)
            localStorage.setItem('lms_access_tracking', JSON.stringify(analyticsData));
        });
    }

    // BAGIAN: Sidebar Menu Active State
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.parentNode.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentNode.classList.add('active');
            
            // Show loading state
            const mainContent = document.querySelector('.training-content');
            mainContent.style.opacity = '0.7';
            
            // Simulate content loading
            setTimeout(() => {
                mainContent.style.opacity = '1';
                showNotification('Menu diklik: ' + this.textContent, 'info');
            }, 500);
        });
    });

    // BAGIAN: Mobile Menu Enhancements
    if (window.innerWidth < 768) {
        const sidebarCards = document.querySelectorAll('.sidebar-card');
        sidebarCards.forEach(card => {
            const header = card.querySelector('h3');
            if (header) {
                header.style.cursor = 'pointer';
                header.addEventListener('click', function() {
                    const content = this.nextElementSibling;
                    if (content.style.display === 'none') {
                        content.style.display = 'block';
                        this.querySelector('i').style.transform = 'rotate(0deg)';
                    } else {
                        content.style.display = 'none';
                        this.querySelector('i').style.transform = 'rotate(-90deg)';
                    }
                });
                
                // Initialize collapsed state on mobile
                const content = header.nextElementSibling;
                content.style.display = 'none';
                header.querySelector('i').style.transform = 'rotate(-90deg)';
                header.querySelector('i').style.transition = 'transform 0.3s';
            }
        });
    }

    // BAGIAN: Add Notification Styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease-out;
            min-width: 300px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid #2ecc71;
        }
        
        .notification-info {
            border-left: 4px solid #3498db;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-success i {
            color: #2ecc71;
        }
        
        .notification-info i {
            color: #3498db;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
        }
    `;
    document.head.appendChild(style);
});

// BAGIAN: Global Training Functions
window.trainingFunctions = {
    // Function to simulate course enrollment
    enrollInCourse: function(courseId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Enrolled in course: ${courseId}`);
                resolve({ success: true, courseId: courseId });
            }, 1000);
        });
    },
    
    // Function to get user progress
    getUserProgress: function() {
        const progress = localStorage.getItem('user_progress') || '{}';
        return JSON.parse(progress);
    },
    
    // Function to update progress
    updateProgress: function(courseId, progress) {
        const userProgress = this.getUserProgress();
        userProgress[courseId] = progress;
        localStorage.setItem('user_progress', JSON.stringify(userProgress));
        return userProgress;
    }
};

// BAGIAN: Performance Monitoring
if (window.performance) {
    window.addEventListener('load', function() {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Training page loaded in ${loadTime}ms`);
        
        // Send to analytics (simulated)
        if (loadTime > 3000) {
            console.warn('Training page load time is slow');
        }
    });
}