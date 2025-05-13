document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const musicButton = document.getElementById('musicButton');
    const bgMusic = document.getElementById('bgMusic');
    const confirmButton = document.getElementById('confirmButton');
    
    // Configurações iniciais
    bgMusic.volume = 0.7; // Volume moderado
    let isMusicPlaying = false;
    const isTouchDevice = 'ontouchstart' in window;
    
    // Evento otimizado para o dispositivo
    const primaryEvent = isTouchDevice ? 'touchend' : 'click';
    
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
                    alert(`Obrigado, ${userName.trim()}! Sua presença foi confirmada. 🎉`);
                }, 300);
            } else {
                this.innerHTML = 'Confirmar Presença';
            }
        }, 100);
    });
    
    // Otimização para dispositivos móveis
    if (isTouchDevice) {
        // Previne double tap zoom
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
