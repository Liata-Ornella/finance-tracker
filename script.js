// --- Persistent storage ---
const KEY = 'finance:data';
let transactions = JSON.parse(localStorage.getItem(KEY) || '[]');

// --- DOM elements ---
const form = document.getElementById('transaction-form');
const tbody = document.getElementById('transactions');
const totalCount = document.getElementById('total-count');
const totalAmount = document.getElementById('total-amount');
const searchInput = document.getElementById('search');
const currencySelect = document.getElementById('currency');
const currencyLabel = document.getElementById('currency-label');

// --- Currency rates ---
let currencyRates = {
    USD: 1,
    EUR: 0.92,
    RWF: 1320
};

// --- Convert amount ---
function convertAmount(amount){
    const selected = currencySelect.value;
    currencyLabel.textContent = selected;
    return (amount * currencyRates[selected]).toFixed(2);
}

// --- Render transactions ---
function renderTransactions(filterRegex){
    tbody.innerHTML = '';
    transactions.forEach(tx => {
        let desc = tx.description;
        if(filterRegex){
            desc = desc.replace(filterRegex, match => `<mark>${match}</mark>`);
        }
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${desc}</td>
            <td>${convertAmount(tx.amount)} ${currencySelect.value}</td>
            <td>${tx.category}</td>
            <td>${tx.date}</td>
            <td>
                <button onclick="deleteTransaction('${tx.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    updateStats();
}

// --- Update stats ---
function updateStats(){
    totalCount.textContent = transactions.length;
    const sum = transactions.reduce((a,b)=>a+parseFloat(b.amount),0);
    totalAmount.textContent = convertAmount(sum);
}

// --- Add transaction ---
form.addEventListener('submit', e => {
    e.preventDefault();
    const desc = document.getElementById('description').value.trim();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    // Regex validation
    const regexDesc = /^\S(?:.*\S)?$/;
    const regexAmount = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
    const regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if(!regexDesc.test(desc)){ alert("Invalid description"); return; }
    if(!regexAmount.test(amount)){ alert("Invalid amount"); return; }
    if(!regexDate.test(date)){ alert("Invalid date"); return; }

    const tx = {
        id: 'txn_'+Date.now(),
        description: desc,
        amount: parseFloat(amount),
        category,
        date,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    transactions.push(tx);
    saveData();
    form.reset();
});

// --- Delete transaction ---
function deleteTransaction(id){
    if(confirm("Delete this transaction?")){
        transactions = transactions.filter(tx => tx.id !== id);
        saveData();
    }
}

// --- Search ---
searchInput.addEventListener('input', ()=>{
    let pattern = searchInput.value;
    let regex = null;
    try { regex = new RegExp(pattern, 'i'); } catch {}
    renderTransactions(regex);
});

// --- Currency change ---
currencySelect.addEventListener('change', ()=>{
    renderTransactions();
});

// --- Save and render ---
function saveData(){
    localStorage.setItem(KEY, JSON.stringify(transactions));
    renderTransactions();
}

// --- Initial render ---
renderTransactions();
updateStats();