
/** Script Simples para burlar o sistema de cola do Redação Paraná  */

let inputField;

try {
    inputField = document.querySelector('input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline.css-1nu4rzx, textarea.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline.css-1nu4rzx');
} catch (error) {
    inputField = document.querySelector('input, textarea');
}

console.log(inputField)
if (inputField) {
    let notify = prompt("Enter the redation");
    
    if (notify) {
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
        alert('Texto não fornecido no prompt!');
    }

} else {
    alert('Nenhum campo de texto encontrado na página!');
}
