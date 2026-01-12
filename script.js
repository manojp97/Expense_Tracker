let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const totalSpan = document.getElementById("total");
const filter = document.getElementById("filter");

// Load expenses
function loadExpenses(filterCategory = "All") {
    expenseList.innerHTML = "";
    total = 0;

    expenses.forEach((expense, index) => {
        if (filterCategory === "All" || expense.category === filterCategory) {
            addExpenseToDOM(expense, index);
            total += expense.amount;
        }
    });

    totalSpan.innerText = total;
}

// Add expense to DOM
function addExpenseToDOM(expense, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = `${expense.title} - ₹${expense.amount} (${expense.category})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.style.background = "red";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";

    deleteBtn.addEventListener("click", function () {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        loadExpenses(filter.value);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
}

// Add new expense
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const expense = {
        title: titleInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    loadExpenses(filter.value);

    titleInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";
});

// Filter change
filter.addEventListener("change", function () {
    loadExpenses(this.value);
});

// Initial load
loadExpenses();
const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
let income = Number(localStorage.getItem("income")) || 0;

const incomeInput = document.getElementById("incomeInput");
const addIncomeBtn = document.getElementById("addIncome");

const incomeDisplay = document.getElementById("incomeDisplay");
const expenseDisplay = document.getElementById("expenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");

addIncomeBtn.addEventListener("click", () => {
    income = Number(incomeInput.value);
    localStorage.setItem("income", income);
    incomeInput.value = "";
    updateSummary();
});

function updateSummary() {
    let totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

    incomeDisplay.innerText = income;
    expenseDisplay.innerText = totalExpense;
    balanceDisplay.innerText = income - totalExpense;
}

updateSummary();
