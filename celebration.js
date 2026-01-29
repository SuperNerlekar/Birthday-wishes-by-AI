// Get data from sessionStorage
const birthdayName = sessionStorage.getItem('birthdayName');
const birthdayPhotos = JSON.parse(sessionStorage.getItem('birthdayPhotos')) || [];

// Display birthday name
if (birthdayName) {
    document.getElementById('celebrantName').textContent = birthdayName;
} else {
    // Redirect back if no name
    window.location.href = 'index.html';
}

// Create confetti
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#c96bff', '#ffd93d', '#6bcbff', '#ffb36b', '#6bffb8'];
    
    setInterval(() => {
        for (let i = 0; i < 3; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }, 300);
}

// Display photos in collage
function displayPhotos() {
    const photoCollage = document.getElementById('photoCollage');
    
    if (birthdayPhotos.length === 0) {
        // Create default message if no photos
        photoCollage.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎨</div>
                <p style="font-family: 'Caveat', cursive; font-size: 1.8rem; color: var(--purple-primary);">
                    No photos added, but the celebration continues!
                </p>
            </div>
        `;
        return;
    }
    
    const captions = [
        "Beautiful moments! 🌟",
        "Memories to cherish! 💕",
        "So much joy! 🎉",
        "Forever in our hearts! 💖",
        "Amazing times! ✨",
        "Pure happiness! 🌈"
    ];
    
    birthdayPhotos.forEach((photo, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'collage-photo';
        
        const img = document.createElement('img');
        img.src = photo;
        img.alt = 'Birthday memory';
        
        const caption = document.createElement('div');
        caption.className = 'photo-caption';
        caption.textContent = captions[index % captions.length];
        
        photoDiv.appendChild(img);
        photoDiv.appendChild(caption);
        photoCollage.appendChild(photoDiv);
    });
}

// Add fade in animation to body
document.body.style.animation = 'fadeIn 1s ease-out';

// Initialize confetti and photos
createConfetti();
displayPhotos();

// Add candle click interaction
const candles = document.querySelectorAll('.candle-flame');
candles.forEach(candle => {
    candle.addEventListener('click', function() {
        this.style.animation = 'blowOut 0.5s forwards';
        
        setTimeout(() => {
            this.textContent = '💨';
            this.style.animation = '';
        }, 500);
        
        // Relight after 2 seconds
        setTimeout(() => {
            this.textContent = '🔥';
        }, 2000);
    });
});

// Add blow out animation
const blowOutStyle = document.createElement('style');
blowOutStyle.textContent = `
    @keyframes blowOut {
        to {
            transform: translateX(-50%) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(blowOutStyle);

// Add sparkle effects around the birthday name
function addNameSparkles() {
    const nameElement = document.getElementById('celebrantName');
    const rect = nameElement.getBoundingClientRect();
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }, 1000);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        to {
            transform: translateY(-80px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Start name sparkles
addNameSparkles();

// Add cake hover effect
const cakeTiers = document.querySelectorAll('.cake-tier');
cakeTiers.forEach((tier, index) => {
    tier.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    tier.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add celebration message after a delay
setTimeout(() => {
    const celebrationMsg = document.createElement('div');
    celebrationMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(255, 107, 157, 0.95), rgba(201, 107, 255, 0.95));
        color: white;
        padding: 3rem 4rem;
        border-radius: 30px;
        font-family: 'Pacifico', cursive;
        font-size: 3rem;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: popIn 0.5s ease-out;
    `;
    celebrationMsg.textContent = `🎉 Hip Hip Hooray! 🎉`;
    
    const popInStyle = document.createElement('style');
    popInStyle.textContent = `
        @keyframes popIn {
            from {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes popOut {
            to {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(popInStyle);
    
    document.body.appendChild(celebrationMsg);
    
    setTimeout(() => {
        celebrationMsg.style.animation = 'popOut 0.5s ease-out forwards';
        setTimeout(() => {
            celebrationMsg.remove();
        }, 500);
    }, 3000);
}, 2000);
