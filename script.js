document.addEventListener('DOMContentLoaded', function() {
    const musicButton = document.getElementById('musicButton');
    const bgMusic = document.getElementById('bgMusic');
    const confirmButton = document.getElementById('confirmButton');
    let musicPlaying = false;
    
    // Controle da música
    musicButton.addEventListener('click', function() {
        if (musicPlaying) {
            bgMusic.pause();
            musicButton.textContent = 'Ligar Música';
            musicPlaying = false;
        } else {
            bgMusic.play();
            musicButton.textContent = 'Desligar Música';
            musicPlaying = true;
        }
    });
    
    // Confirmação de presença
    confirmButton.addEventListener('click', function() {
        const name = prompt('Por favor, digite seu nome para confirmar presença:');
        if (name) {
            alert(`Obrigado, ${name}! Sua presença foi confirmada.`);
            confirmButton.textContent = 'Presença Confirmada!';
            confirmButton.style.backgroundColor = '#4CAF50';
            confirmButton.disabled = true;
        }
    });
    
    // Iniciar música automaticamente (opcional)
    // bgMusic.play().catch(e => console.log("Reprodução automática bloqueada"));
});