document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const musicButton = document.getElementById('musicButton');
    const bgMusic = document.getElementById('bgMusic');
    const confirmButton = document.getElementById('confirmButton');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const characterCards = document.querySelectorAll('.character-card');
    const waves = document.querySelectorAll('.wave');
    
    // Estado
    let isMusicPlaying = false;
    let selectedCharacter = null;
    
    // Controle de música com efeitos
    musicButton.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicButton.classList.remove('active');
            musicButton.querySelector('.music-text').textContent = 'Ligar Música';
            stopWaveAnimation();
            isMusicPlaying = false;
        } else {
            musicButton.classList.add('active');
            musicButton.querySelector('.music-text').textContent = 'Tocando...';
            
            bgMusic.play()
                .then(() => {
                    startWaveAnimation();
                    isMusicPlaying = true;
                    musicButton.querySelector('.music-text').textContent = 'Música Tocando';
                })
                .catch(e => {
                    musicButton.classList.remove('active');
                    musicButton.querySelector('.music-text').textContent = 'Toque para ativar';
                    setTimeout(() => {
                        musicButton.querySelector('.music-text').textContent = 'Ligar Música';
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
    
    // Seleção de personagem
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            characterCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedCharacter = this.getAttribute('data-character');
        });
    });
    
    // Controle de abas
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Confirmação
    confirmButton.addEventListener('click', function() {
        if (!selectedCharacter) {
            alert('Escolha um personagem primeiro!');
            return;
        }
        
        const name = prompt(`Como ${selectedCharacter}, qual é seu nome?`);
        if (name) {
            this.textContent = '✓ Confirmado!';
            this.style.background = '#4CAF50';
            this.disabled = true;
            
            setTimeout(() => {
                alert(`${name} como ${selectedCharacter} confirmado!\n\nPrepare-se para a batalha na Mansão Stark!`);
            }, 300);
        }
    });
    
    // Efeito hover para dispositivos com mouse
    if (!('ontouchstart' in window)) {
        characterCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'scale(1)';
                }
            });
        });
    }
});
