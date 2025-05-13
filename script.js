document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const musicButton = document.getElementById('musicButton');
    const bgMusic = document.getElementById('bgMusic');
    const confirmButton = document.getElementById('confirmButton');
    const heroCards = document.querySelectorAll('.hero-card');
    const chosenHeroDisplay = document.getElementById('chosen-hero');
    const visualizerBars = document.querySelectorAll('.visualizer .bar');
    
    // Configuração inicial do áudio
    bgMusic.volume = 0.7; // Volume moderado
    
    // Estado
    let isMusicPlaying = false;
    let selectedHero = null;
    
    // Seleção de Herói
    heroCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover seleção anterior
            heroCards.forEach(c => c.classList.remove('selected'));
            
            // Selecionar novo herói
            this.classList.add('selected');
            selectedHero = this.getAttribute('data-hero');
            chosenHeroDisplay.textContent = selectedHero;
            
            // Efeito visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 200);
        });
    });
    
    // Controle de Música
    musicButton.addEventListener('click', function() {
        if (isMusicPlaying) {
            // Pausar música
            bgMusic.pause();
            musicButton.querySelector('.text').textContent = 'Tocar Hino dos Vingadores';
            stopVisualizer();
            isMusicPlaying = false;
        } else {
            // Tocar música
            musicButton.querySelector('.text').textContent = 'Tocando...';
            
            bgMusic.play()
                .then(() => {
                    startVisualizer();
                    isMusicPlaying = true;
                    musicButton.querySelector('.text').textContent = 'Hino dos Vingadores';
                })
                .catch(error => {
                    musicButton.querySelector('.text').textContent = 'Toque para ativar';
                    setTimeout(() => {
                        musicButton.querySelector('.text').textContent = 'Tocar Hino dos Vingadores';
                    }, 2000);
                });
        }
    });
    
    // Animação do Visualizador
    function startVisualizer() {
        visualizerBars.forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
    }
    
    function stopVisualizer() {
        visualizerBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }
    
    // Confirmação de Presença
    confirmButton.addEventListener('click', function() {
        if (!selectedHero) {
            alert('Por favor, escolha seu personagem primeiro!');
            return;
        }
        
        const name = prompt(`${selectedHero}, qual é seu nome verdadeiro?`);
        
        if (name && name.trim() !== '') {
            this.textContent = 'Confirmado ✓';
            this.style.background = '#4
