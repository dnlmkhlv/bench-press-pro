function calculate1RM() {
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);
    const weightUnit = document.getElementById('weight-unit').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps < 1 || reps > 30) {
        resultDiv.textContent = 'Please enter valid values.';
        resultDiv.style.color = 'red';
        resultDiv.classList.remove('has-result');
        return;
    }

    // Convert weight to kg if it's in lb
    const weightInKg = weightUnit === 'lb' ? weight * 0.453592 : weight;

    // Different formulas for 1RM calculation
    const brzycki = weightInKg / (1.0278 - 0.0278 * reps);
    const epley = weightInKg * (1 + 0.0333 * reps);
    const lander = (100 * weightInKg) / (101.3 - 2.67123 * reps);
    const lombardi = weightInKg * Math.pow(reps, 0.1);
    const oConner = weightInKg * (1 + 0.025 * reps);
    const mayhew = (100 * weightInKg) / (52.2 + 41.9 * Math.exp(-0.055 * reps));
    const wathen = (100 * weightInKg) / (48.8 + 53.8 * Math.exp(-0.075 * reps));

    const formulas = [brzycki, epley, lander, lombardi, oConner, mayhew, wathen];
    const average1RM = formulas.reduce((sum, val) => sum + val, 0) / formulas.length;

    // Update individual formula results
    document.getElementById('brzycki-result').textContent = `= ${brzycki.toFixed(1)} kg`;
    document.getElementById('epley-result').textContent = `= ${epley.toFixed(1)} kg`;
    document.getElementById('lander-result').textContent = `= ${lander.toFixed(1)} kg`;
    document.getElementById('lombardi-result').textContent = `= ${lombardi.toFixed(1)} kg`;
    document.getElementById('oconner-result').textContent = `= ${oConner.toFixed(1)} kg`;
    document.getElementById('mayhew-result').textContent = `= ${mayhew.toFixed(1)} kg`;
    document.getElementById('wathen-result').textContent = `= ${wathen.toFixed(1)} kg`;

    const average1RMInLb = average1RM * 2.20462;

    if (document.body.classList.contains('dark-mode')) {
        
    }
    resultDiv.innerHTML = `
        <h3>Estimated 1RM:</h3>
        <p style="color: #00d64f;">${average1RM.toFixed(1)} kg (${average1RMInLb.toFixed(1)} lb)</p>
    `;
    resultDiv.classList.add('has-result');
}

// Move the dark mode toggle functionality here if it's not already in the JS file
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const modeSwitch = document.getElementById('mode-switch');
    if (document.body.classList.contains('dark-mode')) {
        modeSwitch.textContent = '☀️';
        modeSwitch.setAttribute('aria-label', 'Toggle light mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        modeSwitch.textContent = '🌙';
        modeSwitch.setAttribute('aria-label', 'Toggle dark mode');
        localStorage.setItem('darkMode', 'disabled');
    }
}

document.getElementById('mode-switch').addEventListener('click', toggleDarkMode);

// Check for user's preference when the page loads
if (localStorage.getItem('darkMode') === 'enabled') {
    toggleDarkMode();
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const fullScreenMenu = document.getElementById('full-screen-menu');

    menuToggle.addEventListener('click', function() {
        fullScreenMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', function() {
        fullScreenMenu.classList.remove('active');
    });
});