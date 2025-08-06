
/** Script Simples para burlar o sistema de cola do Redação Paraná  */

let inputField = document.querySelector('input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline.css-1nu4rzx, textarea.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline.css-1nu4rzx');

if (inputField) {
    let notify = prompt("EErdanter the redation");

    
    function simulateKeyPress(char) {
        let event = new KeyboardEvent('keypress', { key: char });
        inputField.dispatchEvent(event);
    }

    
    function typeText(text) {
        
        let currentValue = inputField.value;
        inputField.value = currentValue; 
        let index = 0;

        function typeNextChar() {
            if (index < text.length) {
                inputField.value += text[index]; 
                simulateKeyPress(text[index]);  
                index++;
                setTimeout(typeNextChar, 100); 
            }
        }
        
        typeNextChar();
    }

    typeText(notify); 
} else {
    alert('Nenhum campo de texto encontrado na página!');
}
