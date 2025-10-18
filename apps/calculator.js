registerApp('calculator', () => {
    const content = `
        <div class="calculator-body">
            <div class="calculator-display">0</div>
            <button class="calculator-btn">C</button>
            <button class="calculator-btn">+/-</button>
            <button class="calculator-btn">%</button>
            <button class="calculator-btn operator">÷</button>
            <button class="calculator-btn">7</button>
            <button class="calculator-btn">8</button>
            <button class="calculator-btn">9</button>
            <button class="calculator-btn operator">×</button>
            <button class="calculator-btn">4</button>
            <button class="calculator-btn">5</button>
            <button class="calculator-btn">6</button>
            <button class="calculator-btn operator">-</button>
            <button class="calculator-btn">1</button>
            <button class="calculator-btn">2</button>
            <button class="calculator-btn">3</button>
            <button class="calculator-btn operator">+</button>
            <button class="calculator-btn zero">0</button>
            <button class="calculator-btn">.</button>
            <button class="calculator-btn operator">=</button>
        </div>
    `;

    const win = createAppWindow('calculator', 'Calculator', content);
    const display = win.querySelector('.calculator-display');
    let currentValue = '0';
    let operator = null;
    let previousValue = null;

    win.querySelector('.calculator-body').addEventListener('click', (e) => {
        if (!e.target.classList.contains('calculator-btn')) return;

        const key = e.target.textContent;

        if (/\d/.test(key)) {
            if (currentValue === '0') {
                currentValue = key;
            } else {
                currentValue += key;
            }
        } else if (key === '.') {
            if (!currentValue.includes('.')) {
                currentValue += '.';
            }
        } else if (key === 'C') {
            currentValue = '0';
            operator = null;
            previousValue = null;
        } else if (key === '+/-') {
            currentValue = (parseFloat(currentValue) * -1).toString();
        } else if (key === '%') {
            currentValue = (parseFloat(currentValue) / 100).toString();
        } else if (['+', '-', '×', '÷'].includes(key)) {
            if (operator && previousValue) {
                calculate();
            }
            operator = key;
            previousValue = currentValue;
            currentValue = '0';
        } else if (key === '=') {
            calculate();
        }

        display.textContent = currentValue;
    });

    function calculate() {
        if (!operator || previousValue === null) return;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        let result;
        switch (operator) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '×': result = prev * current; break;
            case '÷': result = prev / current; break;
        }
        currentValue = result.toString();
        operator = null;
        previousValue = null;
    }
});
