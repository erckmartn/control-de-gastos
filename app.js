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

const addTransactionDOM = ({amount, name, id}) => {
	const operator = amount < 0 ? '-' : '+'
	const cssClass = amount < 0 ? 'minus' : 'plus'
	const amountWithoutOperator = Math.abs(amount)
	const li = document.createElement('li')
	
	li.classList.add(cssClass)
	li.innerHTML = `
		${name} <span>${operator} S/${Math.abs(amountWithoutOperator)}</span>
		<button class="delete-btn" onclick = "removeTransaction(${id})">x</button>	
	`
	transactionsUl.append(li)
	
	{/*<li class="minus">
          Salário <span>-$400</span><button class="delete-btn">x</button>
        </li> */}
}

const getTotal = transactionAmounts  => total = transactionAmounts
		.reduce((accumulator, transaction) => accumulator + transaction, 0)
		.toFixed(2)

const getIncome = transactionAmounts =>  transactionAmounts.filter(value => value > 0)
		.reduce((accumulator, value) => accumulator + value, 0)
		.toFixed(2)
		
const getExpense = transactionAmounts =>  Math.abs(transactionAmounts.filter(value => value < 0)
		.reduce((accumulator, value) => accumulator + value, 0))
		.toFixed(2)

 const updateBalaceValues = () => {
	
	const transactionAmounts = transactions.map(({amount}) => amount)
		
	const total = getTotal(transactionAmounts)
		
	const income = getIncome(transactionAmounts)
	
	const expense = getExpense(transactionAmounts)	
		
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

const addTransactionsArray = (transactionName, transactionAmount) => {
	
	transactions.push({
		id:generateID(),
		name:transactionName,
		amount: +transactionAmount
		})
}
const cleanInputs = () => {
	inputTransactionName.value = ''
	inputTransactionAmount.value = ''
}

const handlerSubmitForm = event => {
	
	event.preventDefault()
	
	const transactionName =  inputTransactionName.value.trim()
	const transactionAmount = inputTransactionAmount.value.trim()
	const isSomeEmpthy = transactionName === '' || transactionAmount === ''
	
	if (isSomeEmpthy) {
		alert('Por favor, ingresa tanto el valor de la transaccion y el monto')
		return
	}
		
	addTransactionsArray(transactionName, transactionAmount)
	
	init()
	updateLocalStorage()
	cleanInputs()
}

form.addEventListener('submit', handlerSubmitForm)

const hoverButtonDisplay = document.querySelectorAll('.delete-btn')

/* console.log(hoverButtonDisplay)

const hover = 

const end =  */
