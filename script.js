document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const musicButton = document.getElementById('musicButton');
    const bgMusic = document.getElementById('bgMusic');
    const confirmButton = document.getElementById('confirmButton');
    const heroOptions = document.querySelectorAll('.hero-option');
    const chosenHeroDisplay = document.getElementById('chosen-hero');
    const visualizerBars = document.querySelectorAll('.visualizer .bar');
    
    // Configuração inicial
    bgMusic.volume = 0.6;
    let isMusicPlaying = false;
    let selectedHero = null;
    
    // Seleção de Herói
    heroOptions.forEach(option => {
        option.addEventListener('click', function() {
            heroOptions.forEach(opt => opt.classList.remove('selected'));
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
            bgMusic.pause();
            musicButton.querySelector('.text').textContent = 'Tocar Música Épica';
            stopVisualizer();
            isMusicPlaying = false;
        } else {
            musicButton.querySelector('.text').textContent = 'Tocando...';
            
            bgMusic.play()
                .then(() => {
                    startVisualizer();
                    isMusicPlaying = true;
                    musicButton.querySelector('.text').textContent = 'Música Tocando!';
                })
                .catch(error => {
                    musicButton.querySelector('.text').textContent = 'Toque para ativar';
                    setTimeout(() => {
                        musicButton.querySelector('.text').textContent = 'Tocar Música Épica';
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
            this.style.background = '#4CAF50';
            this.disabled = true;
            
            setTimeout(() => {
                alert(`${name} como ${selectedHero} confirmado(a)!\n\nNão esqueça de trazer:\n🍗 1kg de carne\n🍺 2L de bebida\n🧂 Temperos\n\nNos vemos na Mansão Stark!`);
            }, 300);
        }
    });
});
