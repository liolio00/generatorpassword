document.addEventListener('DOMContentLoaded', () => {
    // Ajout du Splash Screen
    const splashScreen = document.createElement('div');
    splashScreen.id = 'splash-screen';
    splashScreen.innerHTML = `
        <div class="splash-content">
            <div class="loading-spinner"></div>
        </div>
    `;
    document.body.insertBefore(splashScreen, document.body.firstChild);

    // Masquer le Splash Screen après 1 seconde
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.remove();
        }, 500);
    }, 1000);

    const passwordInput = document.getElementById('password');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const symbolsCheckbox = document.getElementById('symbols');
    const specialCharsDiv = document.getElementById('special-chars');
    const copyPopup = document.getElementById('copy-popup');

    // Update length value display
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    // Toggle special characters section
    symbolsCheckbox.addEventListener('change', () => {
        specialCharsDiv.classList.toggle('hidden', !symbolsCheckbox.checked);
    });

    // Copy password function
    copyBtn.addEventListener('click', async () => {
        const password = passwordInput.value;
        if (password) {
            await navigator.clipboard.writeText(password);
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 500);

            // Afficher le popup de confirmation
            copyPopup.classList.add('show');

            // Masquer le popup après 2 secondes
            setTimeout(() => {
                copyPopup.classList.remove('show');
            }, 2000);
        }
    });

    // Generate password function
    generateBtn.addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        const useUppercase = document.getElementById('uppercase').checked;
        const useLowercase = document.getElementById('lowercase').checked;
        const useNumbers = document.getElementById('numbers').checked;
        const useSymbols = symbolsCheckbox.checked;

        let chars = '';
        let mandatoryChars = [];

        if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (useNumbers) chars += '0123456789';
        if (useSymbols) {
            const selectedSymbols = Array.from(document.querySelectorAll('.char-checkbox input:checked'))
                .map(input => input.value);
            chars += selectedSymbols.join('');
            // Ajouter un caractère de chaque type sélectionné
            mandatoryChars = [...selectedSymbols];
        }

        if (chars === '') {
            alert('Please select at least one character type');
            return;
        }

        let password = '';

        // D'abord, ajouter un caractère de chaque type sélectionné
        for (let char of mandatoryChars) {
            password += char;
        }

        // Compléter le reste du mot de passe avec des caractères aléatoires
        for (let i = password.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }

        // Mélanger le mot de passe final
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        passwordInput.value = password;
    });
}); 