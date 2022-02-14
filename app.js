const transactionsUl = document.getElementById('transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



/* let transactions = [

	{id:1, name:'Plan movil', amount: -45},
	{id:2, name:'Salario', amount: 7000},
	{id:3, name:'Torta de chocolate', amount: -20},
	{id:4, name:'Ukelele', amount: 600},
	{id:5, name:'Equipo de sonido', amount: 250},
	{id:6, name:'Plan internet', amount:-100}

] */

const localStorageTransactions = JSON.parse(localStorage
	.getItem('transactions'))
	
let transactions = localStorage.
	getItem('transactions') !== null ? localStorageTransactions : [] 


const removeTransaction = ID => {
	transactions = transactions.filter(transaction => transaction.id !== ID)
	updateLocalStorage()
	init()
	
}

const addTransactionDOM = transaction => {
	const operator = transaction.amount < 0 ? '-' : '+'
	const cssClass = transaction.amount < 0 ? 'minus' : 'plus'
	const amountWithoutOperator = Math.abs(transaction.amount)
	const li = document.createElement('li')
	
	li.classList.add(cssClass)
	li.innerHTML = `
		${transaction.name} <span>${operator} S/${Math.abs(amountWithoutOperator)}</span>
		<button class="delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>	
	`
	transactionsUl.append(li)
	
	{/*<li class="minus">
          Salário <span>-$400</span><button class="delete-btn">x</button>
        </li> */}
}

 
const updateBalaceValues = () => {
	
	const transactionAmounts = transactions
		.map(transaction => transaction.amount)
	const total = transactionAmounts
		.reduce((accumulator, transaction) => accumulator + transaction, 0)
		.toFixed(2)
		
	const income = transactionAmounts.filter(value => value > 0)
		.reduce((accumulator, value) => accumulator + value, 0)
		.toFixed(2)
	const expense = Math.abs(transactionAmounts.filter(value => value < 0)
		.reduce((accumulator, value) => accumulator + value, 0))
		.toFixed(2)
		
	balanceDisplay.textContent =  `S/ ${total}`
	
	incomeDisplay.textContent =`S/ ${income}`
	expenseDisplay.textContent = `S/ ${expense}	` 
	//console.log(transactionAmounts)
	//console.log(total)		
	
}

const init = () => {
	transactionsUl.innerHTML = ''	
	transactions.forEach(addTransactionDOM)	
	
	updateBalaceValues()	
}

init()

const updateLocalStorage = () => {
	localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
	event.preventDefault()
	
	const transactionName =  inputTransactionName.value.trim()
	const transactionAmount = inputTransactionAmount.value.trim()
	
	if (transactionName === '' || transactionAmount === '') {
		alert('Por favor, ingresa tanto el valor de la transaccion y el monto')
		return
	}
		
	const transaction = {
		id:generateID(),
		name:transactionName,
		amount: +transactionAmount
		}
		
	console.log(transaction)
	
	transactions.push(transaction)
	init()
	updateLocalStorage()
	
	inputTransactionName.value = ''
	inputTransactionAmount.value = ''
	
})

