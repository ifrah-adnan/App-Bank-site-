'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Adnan ifrah',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Hamid Ifrah',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Youssef Ifrah',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Badreddine ifrah',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////
const afficherMv = function(arr,sort=false){
    let tab= sort ? arr.movements.slice().sort((a,b)=>b-a) : arr.movements
    containerMovements.textContent='';
    tab.forEach((element,i) => {

    const type = element>0? 'deposit': 'withdrawal';
    const html=`<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__value">${element} DH</div>
  </div>`;
        containerMovements.insertAdjacentHTML('afterbegin',html);
        
    });
}

const transactionMv=function(arr){
    const sumin=arr.movements.filter(a=>a>0).reduce((a,c)=>a+c,0)
    labelSumIn.textContent=`${sumin}DH`;
    const sumout=arr.movements.filter(a=>a<0).reduce((a,c)=>a+c,0)
    labelSumOut.textContent=`${sumout}DH`;
    const suminter=arr.movements.filter(a=>a>0).map(a=>(a*0.1)/100).filter(a=>a>1).reduce((a,c)=>a+c,0)
    labelSumInterest.textContent=`${suminter}%`;
    
}   
const totalMv=function(arr){
    labelBalance.textContent='';
    arr.balance =arr.movements.reduce((a,b)=>a+b)
    labelBalance.textContent=`${arr.balance}€`;   
}
// const totalMouvement=function(arr){
//     arr.balance= arr.movements.reduce((acc,mou)=>(acc+mou));
//     labelBalance.textContent= `${arr.balance}€`;
//     console.log(arr.balance)
//   }
  
  // ...
  
  const update = function(arr) {
    afficherMv(arr);
    transactionMv(arr);
    totalMv(arr)
  }
  
const createUser=function(arr){
arr.forEach(element => {
    element.username=element.owner.split(' ').map(a=>a[0]).join('').toLowerCase();    
})};
createUser(accounts)
console.log(account1)


let currentAccount;
btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    currentAccount= accounts.find(u=>u.username==inputLoginUsername.value);
    console.log('as')
    console.log(currentAccount)
    if (currentAccount.pin==Number(inputLoginPin.value)) {
        inputLoginPin.value=inputLoginUsername.value='';
        labelWelcome.textContent=`Welcome ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity=100;
        update(currentAccount);
        
    }
    else
    console.log('eee')
})

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    let amount = Number(inputTransferAmount.value);
    let transferAccount = accounts.find(u => u.username === inputTransferTo.value);

    if (amount > 0 && currentAccount.balance >= amount && transferAccount.username !== currentAccount.username) {
        inputTransferTo.value = inputTransferAmount.value = '';

            transferAccount.movements.push(amount);
            currentAccount.movements.push(-amount);

            // Update the UI
            update(currentAccount);
        } 
        else{
            console.log("ddee")
        }
       

    
});
// btnTransfer.addEventListener('click',function(e){
//     e.preventDefault();
//     const amount= Number(inputTransferAmount.value);
//     var receiveAccount= accounts.find(acc=>acc.username==inputTransferTo.value);
//     console.log(receiveAccount);
//     if(amount>0 && currentAccount.balance>=amount && receiveAccount.username!==currentAccount.username){
//       currentAccount.movements.push(-amount);
//       receiveAccount.movements.push(amount);
//       inputTransferTo.value=inputTransferAmount.value='';
//      update(currentAccount);
  
      
  
//     }})

btnLoan.addEventListener('click',function(e){
    e.preventDefault()
    console.log(accounts.username)
    const loanAmount = Number(inputLoanAmount.value);

    if(inputLoanAmount.value<=Math.max(...(currentAccount.movements)) && inputLoanAmount.value>0){
        currentAccount.movements.push(loanAmount);
       update(currentAccount)
    }
})
btnClose.addEventListener('click',function(e){
    e.preventDefault()
    if (currentAccount.username==inputCloseUsername.value && inputClosePin.value==currentAccount.pin) {
        const index= accounts.indexOf(axx=>axx.username==currentAccount.username)
        accounts.splice(index,1);
        console.log(accounts)
        containerApp.style.opacity=0
        
    }

})
let test=false;
btnSort.addEventListener('click',function(){
    afficherMv(currentAccount,!test);
    test=!test;
})