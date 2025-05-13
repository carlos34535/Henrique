document.addEventListener('DOMContentLoaded', function() {
    const musicButton = document.getElementById('musicButton');
    const bgMusic = document.getElementById('bgMusic');
    const confirmButton = document.getElementById('confirmButton');
    const waves = document.querySelectorAll('.wave');
    const musicText = document.querySelector('.music-text');
    
    let isMusicPlaying = false;
    
    // Controle da música
    musicButton.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicText.textContent = 'Ligar Música';
            stopWaveAnimation();
            isMusicPlaying = false;
        } else {
            bgMusic.play()
                .then(() => {
                    musicText.textContent = 'Tocando...';
                    startWaveAnimation();
                    isMusicPlaying = true;
                })
                .catch(error => {
                    musicText.textContent = 'Toque para ativar';
                    setTimeout(() => {
                        musicText.textContent = 'Ligar Música';
                    }, 2000);
                });
        }
    });
    
    // Animação das ondas
    function startWaveAnimation() {
        waves.forEach(wave => {
            wave.style.animationPlayState = 'running';
        });
    }
    
    function stopWaveAnimation() {
        waves.forEach(wave => {
            wave.style.animationPlayState = 'paused';
        });
    }
    
    // Confirmação de presença
    confirmButton.addEventListener('click', function() {
        const name = prompt('Por favor, digite seu nome:');
        if (name) {
            this.textContent = 'Confirmado! ✓';
            this.style.backgroundColor = '#4CAF50';
            this.disabled = true;
            setTimeout(() => {
                alert(`Obrigado, ${name}! Sua presença foi confirmada.`);
            }, 300);
        }
    });
});
