document.addEventListener('DOMContentLoaded', function() {
    // [Manter o código anterior até a função createConfetti]
    
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
            
            createConfetti();
            
            setTimeout(() => {
                alert(`${name} como ${selectedHero} confirmado(a)!\n\nNão esqueça de trazer:\n🍗 1 kg de carne\n🍺 2 litros de bebida\n🧂 1 item de tempero\n\n*Traje completo garante desconto!`);
            }, 500);
        }
    });

    // [Manter o restante do código anterior]
});
