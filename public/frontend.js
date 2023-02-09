const ul = document.getElementById('List');

async function Expense(e){
 
   e.preventDefault();
   const token = localStorage.getItem('token');
   const amount = e.target[0].value;
   const description = e.target[1].value;
   const category = e.target[2].value;

   const obj = {
       amount: amount,
       description:description,
       category:category
   }

   const Expense = await axios.post("http://35.78.232.87:3000/expense/addexpense",obj, { headers: {"Authorization": token}});
   console.log(Expense);
   showUserOnScreen(Expense.data);
}

function parseJwt (token) {
var base64Url = token.split('.')[1];
var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

return JSON.parse(jsonPayload);
}


//  window.addEventListener('DOMContentLoaded',async () => {
//      const token = localStorage.getItem('token');
//      const decodedToken = parseJwt(token);
//      console.log(decodedToken);

//      const isAdmin = decodedToken.ispremiumuser;

//      if(isAdmin){
//         document.getElementById('rzp-button1').remove();
//             //document.body.innerHTML = document.body.innerHTML+'<p>You are premium user</p>';
//             document.getElementById('message').innerHTML += 'You are premium user' ;
//             showLeaderboard();
//      }

//      const Expenses = await axios.get("http://35.78.232.87:3000/expense/expense", { headers: {"Authorization": token}});

//      for(let i=0; i<Expenses.data.length; i++){
//         showUserOnScreen(Expenses.data[i]);
//      }
//  })

function Helper(e){
e.preventDefault();

const rows = document.getElementById('row');
localStorage.setItem('rows',rows.value);

// console.log(rows.value);

getExpenses(1);
}

window.addEventListener('DOMContentLoaded',async () => {
const token = localStorage.getItem('token');
const decodedToken = parseJwt(token);
// console.log(decodedToken);


const isAdmin = decodedToken.ispremiumuser;

if(isAdmin){
      document.getElementById('rzp-button1').remove();
       //document.body.innerHTML = document.body.innerHTML+'<p>You are premium user</p>';
       document.getElementById('message').innerHTML += 'You are premium user' ;
       showLeaderboard();
}

// const page = 1;

// const Expenses = await axios.get(`http://localhost:3000/expense/expense?page=${page}&rows=${4}`, { headers: {"Authorization": token}});
// //  console.log(Expenses);
// const{expenses,...pageData} = Expenses.data
// //  console.log(pageData);
// //  console.log(expenses);
// for(let i=0; i<expenses.length; i++){
//    showUserOnScreen(expenses[i]);
// }

// showPagination(pageData);

const Downloads = await axios.get(`http://35.78.232.87:3000/user/getDownloads`, { headers: {"Authorization": token}});

console.log(Downloads);

const listItem = document.getElementById('downloads');

for(let i=0; i<Downloads.data.length; i++){
 listItem.innerHTML += `<li>${Downloads.data[i].Download}</li>`
}


})

function showUserOnScreen(realObj){

const li = document.createElement('li');

const amountChild = document.createTextNode(realObj.amount);
const descriptionChild = document.createTextNode(realObj.description);
const categoryChild = document.createTextNode(realObj.category);

const delet = document.createElement('BUTTON');
delet.setAttribute('id',realObj.id);
delet.appendChild(document.createTextNode("DELETE"));

li.appendChild(amountChild);
li.appendChild(document.createTextNode("-"));
li.appendChild(descriptionChild);
li.appendChild(document.createTextNode("-"));
li.appendChild(categoryChild);

li.appendChild(delet);

li.childNodes[5].addEventListener('click',deleteClick);

ul.appendChild(li);
}

function showPagination(response){

const currentPage = response.currentPage;
const hasNextPage = response.hasNextPage;
const nextPage = response.nextPage;
const hasPreviousPage = response.hasPreviousPage;
const previousPage = response.previousPage;
const lastPage = response.lastPage;

const pagination = document.getElementById('pagination');

pagination.innerHTML = '';

if(hasPreviousPage){
const btn2 = document.createElement('button');
btn2.innerHTML = previousPage;
btn2.addEventListener('click', ()=> getExpenses(previousPage));
pagination.appendChild(btn2);
}

const btn1 = document.createElement('button');
btn1.innerHTML = `<h3>${currentPage}</h3>`;
btn1.addEventListener('click', ()=> getExpenses(currentPage));
pagination.appendChild(btn1);

if(hasNextPage){
const btn3 = document.createElement('button');
btn3.innerHTML = nextPage;
btn3.addEventListener('click', ()=> getExpenses(nextPage));
pagination.appendChild(btn3);

}
}

async function getExpenses(page){
const token = localStorage.getItem('token');
const rows = localStorage.getItem('rows');
console.log(rows);
const Expenses =  await axios.get(`http://35.78.232.87:3000/expense/expense?page=${page}&rows=${rows}`,{ headers: {"Authorization": token}});

const{expenses,...pageData} = Expenses.data

for(let i=0; i<expenses.length; i++){
   showUserOnScreen(expenses[i]);
}

showPagination(pageData);
}

async function deleteClick(e){

e.preventDefault();
const id = e.target.parentNode.childNodes[5].id;

const token = localStorage.getItem('token');

try{
await axios.delete(`http://35.78.232.87:3000/expense/deleteExpense/${id}`,{ headers: {"Authorization": token}});
e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}
catch(err){
console.log(err)
}
}

function download(){
const token = localStorage.getItem('token');
axios.get('http://35.78.232.87:3000/user/download',{ headers: {"Authorization": token}})
.then((response)=>{
 if(response.status === 200){
   let a = document.createElement('a');
   a.href = response.data.fileURL;
   a.download = 'myexpense.csv';
  // console.log(a);
   a.click();
 }else{
    throw new Error(response.data.message);
 }
})
.catch((err)=>{
   document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
})
}

function showLeaderboard(){

const inputElement = document.createElement('input');
inputElement.type = "button";
inputElement.value = "Show Leaderboard";

inputElement.onclick = async() => {
   const token = localStorage.getItem('token');
  const userLeaderBoardArray = await axios.get("http://35.78.232.87:3000/premium/showLeaderBoard", { headers: {"Authorization": token}});

   console.log(userLeaderBoardArray);

   let leaderboardElem = document.getElementById('leaderboard');
   leaderboardElem.innerHTML += '<h1> LeaderBoard </h1>'

   userLeaderBoardArray.data.forEach((userDetails) => {
       leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} Total Expense-${userDetails.total_cost}`
   })

}

document.getElementById("message").appendChild(inputElement);
}






document.getElementById('rzp-button1').onclick = async function(e) {

const token = localStorage.getItem('token');
const response = await axios.get("http://35.78.232.87:3000/purchase/premiummembership", { headers: {"Authorization": token}});

console.log(response);

var options = 
{
   
   "key" : response.data.key_id,
   "order_id" : response.data.order.id,
   "handler": async function (res){
       await axios.post("http://35.78.232.87:3000/purchase/updatetransactionstatus",{
           order_id: options.order_id,
           payment_id: res.razorpay_payment_id,
       },{headers: {"Authorization" : token}})
       // console.log("second");
       // console.log(res);

       alert("You Are a Premium User")

       document.getElementById('rzp-button1').remove();
       document.getElementById('message').innerHTML += 'You are premium user' ;
       localStorage.setItem('token',res.data.token);
       showLeaderboard();
   },
};

// console.log("first");
const rzp1 = new Razorpay(options);
rzp1.open();

rzp1.on('payment.failed', async function(response){
   
  const answer =  await axios.post("http://35.78.232.87:3000/purchase/updateFailedtransactionstatus",{order_id: options.order_id},{headers: {"Authorization" : token}})

 // console.log(answer);
});
}
