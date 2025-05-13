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
            this.style.background = '#4CAF50';
            this.disabled = true;
            
            // Efeito de confete (ajustado para não causar rolagem)
            createConfetti();
            
            setTimeout(() => {
                alert(`${name} como ${selectedHero} confirmado(a)!\n\nNão esqueça de trazer:\n🍗 1 kg de carne\n🍺 2 litros de bebida\n🧂 1 item de tempero\n\n*Traje completo garante desconto!`);
            }, 500);
        }
    });
    
    // Efeito de Confete (ajustado)
    function createConfetti() {
        const colors = ['#FFD700', '#e62429', '#FFFFFF', '#FF4500'];
        const viewportHeight = window.innerHeight;
        
        for (let i = 0; i < 30; i++) { // Reduzido número de confetes
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 8 + 4 + 'px';
            confetti.style.height = confetti.style.width;
            document.body.appendChild(confetti);
            
            const animationDuration = Math.random() * 2000 + 2000;
            
            const animation = confetti.animate([
                { top: '-10px', opacity: 1, transform: 'rotate(0deg)' },
                { top: viewportHeight + 'px', opacity: 0, transform: 'rotate(360deg)' }
            ], {
                duration: animationDuration,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
});
