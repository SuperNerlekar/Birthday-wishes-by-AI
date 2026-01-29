// Store uploaded photos globally
let uploadedPhotos = [];

// Prevent double-tap zoom on iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Mobile-friendly photo upload with better touch feedback
const photoUploadInput = document.getElementById('photoUpload');
const uploadLabel = document.querySelector('.upload-label');

// Add touch feedback
if (uploadLabel) {
    uploadLabel.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    uploadLabel.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
}

// Handle photo upload
photoUploadInput.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    const photoPreview = document.getElementById('photoPreview');
    
    // Clear empty state if it exists
    if (photoPreview.querySelector('.empty-state')) {
        photoPreview.innerHTML = '';
    }
    
    files.forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            // Store photo data
            uploadedPhotos.push(event.target.result);
            
            // Create photo element
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.style.animationDelay = `${index * 0.1}s`;
            
            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = 'Birthday memory';
            
            photoItem.appendChild(img);
            photoPreview.appendChild(photoItem);
        };
        
        reader.readAsDataURL(file);
    });
});

// Create birthday wishes and navigate to celebration page
function createWishes() {
    const nameInput = document.getElementById('birthdayName');
    const name = nameInput.value.trim();
    
    if (!name) {
        // Shake animation for empty name
        nameInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            nameInput.style.animation = '';
        }, 500);
        
        alert('Please enter the birthday person\'s name! 🎉');
        return;
    }
    
    // Store data in sessionStorage
    sessionStorage.setItem('birthdayName', name);
    sessionStorage.setItem('birthdayPhotos', JSON.stringify(uploadedPhotos));
    
    // Add celebration animation before transition
    document.body.style.animation = 'fadeOut 0.5s forwards';
    
    setTimeout(() => {
        window.location.href = 'celebration.html';
    }, 500);
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

// Add Enter key support for name input
document.getElementById('birthdayName').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        createWishes();
    }
});

// Add sparkle effect on button hover
const createBtn = document.querySelector('.create-btn');

// Add touch feedback for mobile
createBtn.addEventListener('touchstart', function() {
    this.style.transform = 'translateY(-2px) scale(0.98)';
});

createBtn.addEventListener('touchend', function() {
    this.style.transform = 'translateY(-5px) scale(1)';
});

createBtn.addEventListener('mouseenter', function() {
    createSparkles(this);
});

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);
