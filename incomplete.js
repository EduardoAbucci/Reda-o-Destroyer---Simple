(function () {
    // 1. Insere estilos do modal
    const style = document.createElement("style");
    style.innerHTML = `
        :root{ 
            --background-colorama: rgb(25, 7, 48); 
            --dropdown-bg: #292b2f;
            --dropdown-hover-bg: #6c63ff;
            --highlight-color: #6c63ff;
            --transition-speed: 0.3s;
        }

        .Panel {
            color: #f0f0f0;
            min-height: 200px;
            width: 90%;
            max-width: 500px;
            background-color: var(--background-colorama);
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            padding: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            animation: fadeInUp 0.4s ease-out;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        textarea {
            background-color: var(--background-colorama);
            width: 100%;
            height: 120px;
            resize: none;
            border: 3px solid #ddd;
            border-radius: 12px;
            padding: 12px;
            font-size: 16px;
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            box-sizing: border-box;
            outline: none;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        textarea::placeholder {
            color: #ddd;
        }

        textarea:focus {
            border-color: #6c63ff;
            box-shadow: 0 0 8px rgba(108, 99, 255, 0.3);
        }

        .dropdown-container {
            margin-top: 20px;
            width: 100%;
        }

        .dropdown select {
            background-color: var(--dropdown-bg);
            color: #ddd;
            border: 3px solid #ddd;
            border-radius: 12px;
            padding: 12px;
            font-size: 16px;
            width: 100%;
            appearance: none;
            cursor: pointer;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            outline: none;
        }

        .dropdown select:focus {
            border-color: var(--highlight-color);
            box-shadow: 0 0 8px rgba(108, 99, 255, 0.3);
        }

        .dropdown option {
            background-color: var(--background-colorama);
            color: #ddd;
            padding: 12px;
            font-size: 16px;
        }

        #submitBtn {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 10px;
            border: none;
            background-color: #6c63ff;
            color: white;
            cursor: pointer;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Cria o modal
    const fields = Array.from(document.querySelectorAll("textarea, input"));

    // Gera as opções dinamicamente
    const optionsHTML = fields.map((field, index) => {
        const label = field.name || field.id || `${field.tagName.toLowerCase()}[${index}]`;
        return `<option value="${index}">${label}</option>`;
    }).join("");

    const modal = document.createElement("div");
    modal.className = "Panel";
    modal.innerHTML = `
        <h2>Redação Paraná Destroyer - Simple</h2>
        <textarea id="Redation" placeholder="Coloque sua redação aqui"></textarea>
        <div class="dropdown-container">
            <h3>Selecione um tópico:</h3>
            <div class="dropdown">
                <select id="dropdownSelect">
                    ${optionsHTML}
                </select>
            </div>
        </div>
        <button id="submitBtn">Enviar Redação</button>
    `;
    document.body.appendChild(modal);

    // 3. Procura o campo de redação da plataforma
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
        modal.remove();
        return;
    }

    // 4. Função para simular digitação
    function simulateKeyPress(char) {
        const event = new KeyboardEvent('keypress', { key: char });
        inputField.dispatchEvent(event);
    }

    function typeText(text) {
        let index = 0;
        inputField.focus();
        function typeNextChar() {
            if (index < text.length) {
                inputField.value += text[index];
                simulateKeyPress(text[index]);
                index++;
                setTimeout(typeNextChar, 10); // velocidade (10 sec para não crashar a página)
            }
        }
        typeNextChar();
    }

    // 5. Quando clicar no botão
    document.getElementById("submitBtn").addEventListener("click", () => {
        const redacao = document.getElementById("Redation").value;
        if (!redacao.trim()) {
            alert("⚠️ Digite sua redação primeiro.");
            return;
        }

        modal.remove(); // Remove o modal da tela
        const selectedIndex = document.getElementById("dropdownSelect").value;
        const selectedField = fields[selectedIndex];

        if (!selectedField) {
            alert("❌ Campo selecionado inválido.");
            return;
        }

        modal.remove(); // Fecha o modal

        // Usa o campo correto
        inputField = selectedField;
        typeText(redacao);
            });
})();
