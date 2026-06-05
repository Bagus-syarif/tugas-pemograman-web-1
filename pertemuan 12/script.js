let current = '0';
let previous = '';
let operator = null;
let reset = false;

function updateDisplay() {
    document.getElementById('current').textContent = current;
    if (operator && previous) {
        let op = operator;
        if (op === '*') op = '×';
        if (op === '/') op = '÷';
        document.getElementById('history').textContent = `${previous} ${op}`;
    } else {
        document.getElementById('history').textContent = '';
    }
}

function kalkulatorSwitchCase(a, b, op) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return { success: false, error: 'Input harus angka' };
    }
    
    let result;
    switch (op) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) {
                return { success: false, error: 'Tidak bisa bagi nol' };
            }
            result = a / b;
            break;
        default:
            return { success: false, error: 'Operator tidak dikenal' };
    }
    
    let grade;
    if (result >= 85) grade = 'A';
    else if (result >= 70) grade = 'B';
    else if (result >= 55) grade = 'C';
    else if (result >= 40) grade = 'D';
    else grade = 'E';
    
    return {
        success: true,
        result: Math.round(result * 1000000) / 1000000,
        grade: grade
    };
}

function prosesPerhitungan(angka1, angka2, operator) {
    let num1 = parseFloat(angka1);
    let num2 = parseFloat(angka2);
    
    if (isNaN(num1) || isNaN(num2)) {
        return { success: false, error: 'Angka tidak valid' };
    }
    
    return kalkulatorSwitchCase(num1, num2, operator);
}

function appendNumber(num) {
    if (reset) {
        current = num;
        reset = false;
    } else {
        if (current === '0' && num !== '.') {
            current = num;
        } else {
            if (num === '.' && current.includes('.')) return;
            current += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !reset) {
        hitung();
    }
    previous = current;
    operator = op;
    reset = true;
    updateDisplay();
}

function hitung() {
    if (operator === null || reset) return;
    
    let hasil = prosesPerhitungan(previous, current, operator);
    
    if (hasil.success) {
        current = hasil.result.toString();
    } else {
        current = 'Error';
        alert(hasil.error);
    }
    
    operator = null;
    previous = '';
    reset = true;
    updateDisplay();
}

function clearAll() {
    current = '0';
    previous = '';
    operator = null;
    reset = false;
    updateDisplay();
}

function hapusSatu() {
    if (reset) return;
    if (current.length === 1) {
        current = '0';
    } else {
        current = current.slice(0, -1);
    }
    updateDisplay();
}

document.querySelectorAll('.number').forEach(btn => {
    btn.addEventListener('click', () => {
        appendNumber(btn.getAttribute('data-num'));
    });
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => {
        appendOperator(btn.getAttribute('data-op'));
    });
});

document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('delete').addEventListener('click', hapusSatu);
document.getElementById('equals').addEventListener('click', hitung);

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') appendOperator('/');
    if (e.key === 'Enter' || e.key === '=') hitung();
    if (e.key === 'Escape') clearAll();
    if (e.key === 'Backspace') hapusSatu();
});