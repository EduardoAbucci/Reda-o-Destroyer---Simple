(function () {
    console.clear()
    console.log(`[+] Redação Destroyer v1.0`);
    console.log(`[+] Feito por github.com/EduardoAbucci`)
    console.log(`[+] Em breve funcionalidades de auto detecção de tema e auto redação com spoofer`)
    // 1. Insere estilos do modal com design melhorado
    const style = document.createElement("style");
    style.innerHTML = `
        :root{ 
            --background-colorama: linear-gradient(135deg, #1a0d2e 0%, #2d1b69 50%, #6c63ff 100%);
            --card-bg: rgba(255, 255, 255, 0.08);
            --dropdown-bg: rgba(255, 255, 255, 0.06);
            --dropdown-hover-bg: rgba(108, 99, 255, 0.8);
            --highlight-color: #6c63ff;
            --text-color: #f8fafc;
            --border-color: rgba(255, 255, 255, 0.15);
            --shadow-color: rgba(0, 0, 0, 0.25);
            --transition-speed: 0.3s;
        }

        /* Overlay com blur de fundo */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
            z-index: 9998;
            animation: fadeIn 0.4s ease-out;
        }

        .Panel {
            color: var(--text-color);
            min-height: 400px;
            width: 95%;
            max-width: 520px;
            background: var(--background-colorama);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            box-shadow: 
                0 25px 50px var(--shadow-color),
                0 0 0 1px rgba(255, 255, 255, 0.05),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            padding: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            animation: modalSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            backdrop-filter: blur(20px);
        }

        .Panel h2 {
            background: linear-gradient(135deg, #f8fafc 0%, #6c63ff 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 24px;
            text-align: center;
            animation: titleGlow 2s ease-in-out infinite alternate;
        }

        .Panel h3 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--text-color);
            opacity: 0.9;
        }

        textarea {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            width: 100%;
            height: 140px;
            resize: none;
            border: 2px solid var(--border-color);
            border-radius: 16px;
            padding: 16px;
            font-size: 15px;
            line-height: 1.5;
            color: var(--text-color);
            font-family: 'Inter', system-ui, sans-serif;
            box-sizing: border-box;
            outline: none;
            transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
            animation: inputSlideUp 0.6s ease-out 0.2s both;
        }

        textarea::placeholder {
            color: rgba(248, 250, 252, 0.5);
            font-style: italic;
        }

        textarea:hover {
            border-color: rgba(108, 99, 255, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(108, 99, 255, 0.15);
        }

        textarea:focus {
            border-color: var(--highlight-color);
            box-shadow: 
                0 0 0 4px rgba(108, 99, 255, 0.1),
                0 12px 30px rgba(108, 99, 255, 0.2);
            transform: translateY(-3px);
        }

        .dropdown-container {
            margin-top: 24px;
            width: 100%;
            animation: inputSlideUp 0.6s ease-out 0.3s both;
        }

        .dropdown {
            position: relative;
        }

        .dropdown::after {
            content: '▼';
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-color);
            pointer-events: none;
            transition: transform var(--transition-speed) ease;
        }

        .dropdown:hover::after {
            transform: translateY(-50%) scale(1.1);
        }

        .dropdown select {
            background: var(--dropdown-bg);
            backdrop-filter: blur(10px);
            color: var(--text-color);
            border: 2px solid var(--border-color);
            border-radius: 16px;
            padding: 16px 50px 16px 16px;
            font-size: 15px;
            width: 100%;
            appearance: none;
            cursor: pointer;
            transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
            outline: none;
            font-family: 'Inter', system-ui, sans-serif;
        }

        .dropdown select:hover {
            border-color: rgba(108, 99, 255, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(108, 99, 255, 0.15);
        }

        .dropdown select:focus {
            border-color: var(--highlight-color);
            box-shadow: 
                0 0 0 4px rgba(108, 99, 255, 0.1),
                0 12px 30px rgba(108, 99, 255, 0.2);
            transform: translateY(-3px);
        }

        .dropdown option {
            background: #1a0d2e;
            color: var(--text-color);
            padding: 12px 16px;
            font-size: 15px;
            border: none;
        }

        #submitBtn {
            margin-top: 28px;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 16px;
            border: none;
            background: linear-gradient(135deg, #6c63ff 0%, #9d50bb 100%);
            color: white;
            cursor: pointer;
            transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 25px rgba(108, 99, 255, 0.3);
            font-family: 'Inter', system-ui, sans-serif;
            position: relative;
            overflow: hidden;
            animation: buttonSlideUp 0.6s ease-out 0.4s both;
        }

        #submitBtn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s ease;
        }

        #submitBtn:hover::before {
            left: 100%;
        }

        #submitBtn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(108, 99, 255, 0.4);
        }

        #submitBtn:active {
            transform: translateY(-1px);
            box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
        }

        /* Animações */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -40%) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }

        @keyframes inputSlideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes buttonSlideUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes titleGlow {
            from {
                text-shadow: 0 0 20px rgba(108, 99, 255, 0.5);
            }
            to {
                text-shadow: 0 0 30px rgba(108, 99, 255, 0.8);
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
            }
        }

        /* Animação de saída */
        .Panel.closing {
            animation: fadeOut 0.3s ease-in forwards;
        }

        .modal-overlay.closing {
            animation: fadeIn 0.3s ease-in reverse forwards;
        }

        /* Responsividade */
        @media (max-width: 600px) {
            .Panel {
                width: 95%;
                padding: 24px;
                margin: 20px;
            }
            
            .Panel h2 {
                font-size: 1.5rem;
            }
            
            textarea {
                height: 120px;
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
        }, 300);
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
