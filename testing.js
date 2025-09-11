(function () {
    console.clear()
    console.log(`[+] Redação Destroyer v1.0`);
    console.log(`[+] Feito por github.com/EduardoAbucci`)
    console.log(`[+] Em breve funcionalidades de auto detecção de tema e auto redação com spoofer`)
    // 1. Insere estilos do modal com design melhorado
    const style = document.createElement("style");
    style.innerHTML = `
    .speedSelector {
        margin-top: 20px;
        width: 100%;
        animation: inputSlideUp 0.6s ease-out 0.35s both;
    }
    
    .speedSelector h3 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: var(--text-color);
        opacity: 0.9;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .speed-container {
        position: relative;
        width: 100%;
    }
    
    .speed-range {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 8px;
        background: var(--card-bg);
        border-radius: 20px;
        outline: none;
        border: 1px solid var(--border-color);
        cursor: pointer;
        transition: all var(--transition-speed) ease;
        backdrop-filter: blur(10px);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .speed-range:hover {
        transform: translateY(-2px);
        box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.1),
            0 8px 25px rgba(108, 99, 255, 0.15);
    }
    
    /* Webkit (Chrome, Safari, Edge) */
    .speed-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        background: linear-gradient(135deg, #6c63ff 0%, #9d50bb 100%);
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid rgba(255, 255, 255, 0.2);
        box-shadow: 
            0 4px 12px rgba(108, 99, 255, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
    }
    
    .speed-range::-webkit-slider-thumb:hover {
        transform: scale(1.2);
        box-shadow: 
            0 6px 20px rgba(108, 99, 255, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    
    .speed-range::-webkit-slider-thumb:active {
        transform: scale(1.1);
        box-shadow: 
            0 2px 8px rgba(108, 99, 255, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    /* Firefox */
    .speed-range::-moz-range-thumb {
        width: 24px;
        height: 24px;
        background: linear-gradient(135deg, #6c63ff 0%, #9d50bb 100%);
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid rgba(255, 255, 255, 0.2);
        box-shadow: 
            0 4px 12px rgba(108, 99, 255, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .speed-range::-moz-range-thumb:hover {
        transform: scale(1.2);
        box-shadow: 
            0 6px 20px rgba(108, 99, 255, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    
    .speed-range::-moz-range-track {
        height: 8px;
        background: var(--card-bg);
        border-radius: 20px;
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
    }
    
    /* Labels de velocidade */
    .speed-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        padding: 0 12px;
        font-size: 12px;
        color: rgba(248, 250, 252, 0.6);
        font-weight: 500;
    }
    
    .speed-labels span {
        display: flex;
        align-items: center;
        gap: 4px;
        transition: all var(--transition-speed) ease;
    }
    
    .speed-labels .active {
        color: var(--highlight-color);
        text-shadow: 0 0 8px rgba(108, 99, 255, 0.5);
    }
    
    /* Indicador de valor atual */
    .speed-value {
        position: absolute;
        top: -35px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--highlight-color);
        color: white;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
        opacity: 0;
        transition: all var(--transition-speed) ease;
        pointer-events: none;
    }
    
    .speed-value::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: var(--highlight-color);
    }
    
    .speed-container:hover .speed-value {
        opacity: 1;
        transform: translateX(-50%) translateY(-5px);
    }
    
    /* Animação do track preenchido */
    .speed-range {
        background: linear-gradient(
            to right,
            var(--highlight-color) 0%,
            var(--highlight-color) var(--fill-percent, 50%),
            var(--card-bg) var(--fill-percent, 50%),
            var(--card-bg) 100%
        );
    }
    
    /* Responsividade */
    @media (max-width: 600px) {
        .speed-range::-webkit-slider-thumb {
            width: 20px;
            height: 20px;
        }
        
        .speed-range::-moz-range-thumb {
            width: 20px;
            height: 20px;
        }
        
        .speed-labels {
            font-size: 11px;
            padding: 0 8px;
        }
    }
    `;
    document.head.appendChild(style);

    // 2. Cria o overlay
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    document.body.appendChild(overlay);

    // 3. Cria o modal
    const fields = Array.from(document.querySelectorAll("textarea, input"));

    // Gera as opções dinamicamente
    const optionsHTML = fields.map((field, index) => {
        const label = field.name || field.id || `${field.tagName.toLowerCase()}[${index}]`;
        return `<option value="${index}">${label}</option>`;
    }).join("");

    const modal = document.createElement("div");
    modal.className = "Panel";
    modal.innerHTML = `
        <h2>✨ Redação Destroyer v1.0</h2>
        <textarea id="Redation" placeholder="Cole sua redação aqui e veja a mágica acontecer..."></textarea>
        <div class="dropdown-container">
            <h3>📝 Selecione o campo de destino:</h3>
            <div class="dropdown">
                <select id="dropdownSelect">
                    ${optionsHTML}
                </select>
            </div>
            <div class="speedSelector">
                <h3>⚡ Velocidade de digitação:</h3>
                <div class="speed-container">
                    <input type="range" class="speed-range" id="speedRange" min="1" max="5" value="3" step="1">
                    <div class="speed-value" id="speedValue">Normal</div>
                </div>
                <div class="speed-labels">
                    <span>🐌 Lenta</span>
                    <span>🚀 Rápida</span>
                </div>
            </div>
        </div>
        <button id="submitBtn">🚀 Enviar Redação</button>

    `;
    document.body.appendChild(modal);

    // 4. Procura o campo de redação da plataforma
    let inputField;
    try {
        inputField = document.querySelector('textarea.MuiInputBase-inputMultiline');
        if (!inputField) {
            inputField = document.querySelector('textarea, input');
        }
    } catch (e) {
        inputField = document.querySelector('textarea, input');
    }

    if (!inputField) {
        alert('❌ Campo de texto da redação não encontrado!');
        closeModal();
        return;
    }

    
    // 5. Função para fechar modal com animação
    function closeModal() {
        modal.classList.add('closing');
        overlay.classList.add('closing');
        setTimeout(() => {
            modal.remove();
            overlay.remove();
        }, 300);a
    }

    // 6. Fechar ao clicar no overlay
    overlay.addEventListener('click', closeModal);

    // 7. Função para simular digitação com efeito mais realista
    function simulateKeyPress(char) {
        const events = ['keydown', 'keypress', 'input', 'keyup'];
        events.forEach(eventType => {
            const event = new KeyboardEvent(eventType, { 
                key: char, 
                bubbles: true,
                cancelable: true 
            });
            inputField.dispatchEvent(event);
        });
    }

    function typeText(text) {
        let index = 0;
        inputField.focus();
        inputField.value = ''; // Limpa o campo primeiro
        
        function typeNextChar() {
            if (index < text.length) {
                const char = text[index];
                inputField.value += char;
                
                // Simula eventos de teclado
                simulateKeyPress(char);
                
                // Dispara evento de input para frameworks como React
                const inputEvent = new Event('input', { bubbles: true });
                inputField.dispatchEvent(inputEvent);
                
                index++;
                // Velocidade variável para parecer mais natural
                const delay = Math.random() * 20 + 5;
                setTimeout(typeNextChar, delay);
            }
        }
        typeNextChar();
    }

    // 8. Quando clicar no botão
    document.getElementById("submitBtn").addEventListener("click", () => {
        const redacao = document.getElementById("Redation").value;
        if (!redacao.trim()) {
            alert("⚠️ Digite sua redação primeiro.");
            return;
        }

        console.log(`[+] Log: area selecionada ${inputField}`);
        const selectedIndex = document.getElementById("dropdownSelect").value;
        const selectedField = fields[selectedIndex];
        
        if (!selectedField) {
            alert("❌ Campo selecionado inválido.");
            return;
        }

        // Usa o campo correto
        inputField = selectedField;
        
        // Fecha o modal com animação
        closeModal();
        
        // Aguarda um pouco antes de começar a digitar
        setTimeout(() => {
            typeText(redacao);
        }, 500);
    });

    // 9. Esc para fechar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
})();
