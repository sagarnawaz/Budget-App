
let monthlyBudget = 0;
let expenses = [];


function addBudget() {
  const budgetInput = document.getElementById('budgetInput');
  const budgetValue = parseInt(budgetInput.value);
  
  if (!isNaN(budgetValue) && budgetValue > 0) {
    monthlyBudget = budgetValue;
    budgetInput.value = '';
    
    
    calculateRemainingBudget();
  } else {
    alert('Please enter a valid monthly budget.');
  }
}


function addExpense() {
  const descriptionInput = document.getElementById('descriptionInput');
  const amountInput = document.getElementById('amountInput');
  const dateInput = document.getElementById('dateInput');
  
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;
  
  if (description.trim() !== '' && !isNaN(amount) && amount > 0 && date !== '') {
    const expense = {
      description: description,
      amount: amount,
      date: date
    };
    
    expenses.push(expense);
    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
    
    
    updateExpenseTable();
    calculateRemainingBudget();
  } else {
    alert('Please enter valid expense details.');
  }
}


function updateExpenseTable() {
  const table = document.getElementById('expenseTable');
  
  
  for (let i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  
  
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const row = table.insertRow(-1);
    const descriptionCell = row.insertCell(0);
    const amountCell = row.insertCell(1);
    const dateCell = row.insertCell(2);
    
    descriptionCell.textContent = expense.description;
    amountCell.textContent = '$' + expense.amount.toFixed(2);
    dateCell.textContent = expense.date;
  }
}


function calculateRemainingBudget() {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = monthlyBudget - totalExpenses;
  const remainingBudgetElement = document.getElementById('remainingBudget');
  remainingBudgetElement.textContent = remainingBudget.toFixed(2);
}
