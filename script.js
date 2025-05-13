document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const musicButton = document.getElementById('musicButton');
    const bgMusic = document.getElementById('bgMusic');
    const confirmButton = document.getElementById('confirmButton');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const characterCards = document.querySelectorAll('.character-card');
    const chosenCharacterElement = document.getElementById('chosen-character');
    
    // Configurações iniciais
    bgMusic.volume = 0.7;
    let isMusicPlaying = false;
    let selectedCharacter = null;
    const isTouchDevice = 'ontouchstart' in window;
    const primaryEvent = isTouchDevice ? 'touchend' : 'click';
    
    // Controle de abas
    tabButtons.forEach(button => {
        button.addEventListener(primaryEvent, function(e) {
            if (isTouchDevice) e.preventDefault();
            
            const tabId = this.getAttribute('data-tab');
            
            // Ativa aba clicada
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mostra conteúdo correspondente
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Seleção de personagem
    characterCards.forEach(card => {
        card.addEventListener(primaryEvent, function(e) {
            if (isTouchDevice) e.preventDefault();
            
            // Remove seleção anterior
            characterCards.forEach(c => c.classList.remove('selected'));
            
            // Seleciona novo personagem
            this.classList.add('selected');
            selectedCharacter = this.getAttribute('data-character');
            chosenCharacterElement.textContent = selectedCharacter;
            
            // Efeito visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Controle de música
    musicButton.addEventListener(primaryEvent, function(e) {
        if (isTouchDevice) e.preventDefault();
        
        if (isMusicPlaying) {
            bgMusic.pause();
            musicButton.innerHTML = '🎵 Ligar Música';
            musicButton.style.animation = 'pisca 1.5s infinite alternate';
            isMusicPlaying = false;
        } else {
            musicButton.innerHTML = '⏳ Carregando...';
            
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        musicButton.innerHTML = '🔊 Música Tocando';
                        musicButton.style.animation = 'none';
                        isMusicPlaying = true;
                    })
                    .catch(error => {
                        musicButton.innerHTML = '🎵 Ligar Música';
                        if (error.name !== 'NotAllowedError') {
                            alert('Toque no botão "Ligar Música" para ativar o áudio.');
                        }
                    });
            }
        }
    });
    
    // Confirmação de presença
    confirmButton.addEventListener(primaryEvent, function(e) {
        if (isTouchDevice) e.preventDefault();
        
        if (!selectedCharacter) {
            alert('Por favor, escolha um personagem antes de confirmar!');
            return;
        }
        
        // Feedback visual imediato
        this.innerHTML = '...';
        
        setTimeout(() => {
            const userName = prompt('Quem está confirmando presença?');
            
            if (userName && userName.trim() !== '') {
                this.innerHTML = '✅ Confirmado!';
                this.classList.add('confirmed');
                this.disabled = true;
                
                // Animação de confirmação
                const check = document.createElement('div');
                check.className = 'check-animation';
                this.appendChild(check);
                
                setTimeout(() => {
                    alert(`Obrigado, ${userName.trim()}! Sua presença como ${selectedCharacter} foi confirmada. 🎉\n\nTe esperamos na Mansão Stark!`);
                }, 300);
            } else {
                this.innerHTML = 'Confirmar Presença';
            }
        }, 100);
    });
    
    // Otimização para dispositivos móveis
    if (isTouchDevice) {
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('touchstart', function(e) {
                e.preventDefault();
            }, { passive: false });
        });
    }
    
    // Pausa música quando a página não está visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isMusicPlaying) {
            bgMusic.pause();
            musicButton.innerHTML = '🎵 Ligar Música';
            musicButton.style.animation = 'pisca 1.5s infinite alternate';
            isMusicPlaying = false;
        }
    });
});
