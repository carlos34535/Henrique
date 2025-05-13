document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const confirmBtn = document.getElementById('confirmBtn');
    const heroOptions = document.querySelectorAll('.hero-option');
    const heroChoiceDisplay = document.getElementById('hero-choice');
    const equalizerBars = document.querySelectorAll('.bar');
    
    // Estado
    let isMusicPlaying = false;
    let selectedHero = null;
    
    // Seleção de Herói
    heroOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover seleção anterior
            heroOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Selecionar novo herói
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
    
    // Controle de Música (manter o mesmo código anterior)
    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('active');
            document.querySelector('.music-text').textContent = 'LIGAR MÚSICA TEMÁTICA';
            stopEqualizer();
            isMusicPlaying = false;
        } else {
            musicBtn.classList.add('active');
            document.querySelector('.music-text').textContent = 'MÚSICA TOCANDO...';
            
            bgMusic.play()
                .then(() => {
                    startEqualizer();
                    isMusicPlaying = true;
                    document.querySelector('.music-text').textContent = 'MÚSICA TOCANDO!';
                })
                .catch(error => {
                    musicBtn.classList.remove('active');
                    document.querySelector('.music-text').textContent = 'TOCAR PARA ATIVAR';
                    setTimeout(() => {
                        document.querySelector('.music-text').textContent = 'LIGAR MÚSICA TEMÁTICA';
                    }, 2000);
                });
        }
    });
    
    // Animação do Equalizador (manter o mesmo código anterior)
    function startEqualizer() {
        equalizerBars.forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
    }
    
    function stopEqualizer() {
        equalizerBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }
    
    // Confirmação de Presença (manter o mesmo código anterior)
    confirmBtn.addEventListener('click', function() {
        if (!selectedHero) {
            alert('Por favor, escolha seu personagem Marvel primeiro!');
            return;
        }
        
        const name = prompt(`${selectedHero}, qual é o seu nome verdadeiro?`);
        
        if (name && name.trim() !== '') {
            this.textContent = 'PRESENÇA CONFIRMADA! ✓';
            this.style.background = '#4CAF50';
            this.disabled = true;
            
            createConfetti();
            
            setTimeout(() => {
                alert(`${name} como ${selectedHero} confirmado(a)!\n\nPrepare-se para uma noite épica!\n🗓️ 25/11 às 19h\n🏰 Mansão Stark\n🍗 Churrasco dos Vingadores`);
            }, 500);
        }
    });
    
    // Efeito de Confete (manter o mesmo código anterior)
    function createConfetti() {
        const colors = ['#FFD700', '#e62429', '#FFFFFF', '#FF4500'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { top: '-10px', opacity: 1, transform: 'rotate(0deg)' },
                { top: '100vh', opacity: 0, transform: 'rotate(360deg)' }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // Efeito hover para desktop (manter o mesmo código anterior)
    if (window.matchMedia("(hover: hover)").matches) {
        heroOptions.forEach(option => {
            option.addEventListener('mouseenter', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'scale(1.1)';
                }
            });
            
            option.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'scale(1)';
                }
            });
        });
    }
});

// Estilo para confetti (manter o mesmo código anterior)
const style = document.createElement('style');
style.textContent = `
.confetti {
    position: fixed;
    z-index: 1000;
    pointer-events: none;
}
`;
document.head.appendChild(style);
