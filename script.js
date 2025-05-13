document.addEventListener('DOMContentLoaded', function() {
    const musicButton = document.getElementById('musicButton');
    const bgMusic = document.getElementById('bgMusic');
    const confirmButton = document.getElementById('confirmButton');
    const waves = document.querySelectorAll('.wave');
    const musicText = document.querySelector('.music-text');
    const heroOptions = document.querySelectorAll('.hero-option');
    const heroChoiceDisplay = document.getElementById('hero-choice');
    
    let isMusicPlaying = false;
    let selectedHero = null;
    
    // Seleção de herói
    heroOptions.forEach(option => {
        option.addEventListener('click', function() {
            heroOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedHero = this.getAttribute('data-hero');
            heroChoiceDisplay.textContent = selectedHero;
            
            // Efeito visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 200);
        });
    });
    
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
        if (!selectedHero) {
            alert('Por favor, escolha um personagem primeiro!');
            return;
        }
        
        const name = prompt(`Como ${selectedHero}, qual é seu nome?`);
        if (name) {
            this.textContent = 'Confirmado! ✓';
            this.style.backgroundColor = '#4CAF50';
            this.disabled = true;
            setTimeout(() => {
                alert(`Obrigado, ${name} (${selectedHero})! Sua presença foi confirmada.`);
            }, 300);
        }
    });
});
