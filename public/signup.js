const form = document.querySelector('form');
form.addEventListener('submit',(e)=>{
  
   e.preventDefault();
   const user = e.target[0].value;
   const email = e.target[1].value;
   const password = e.target[2].value;

   const obj = {
       user:user,
       email:email,
       password:password
   }

   axios.post("http://35.78.232.87:3000/user/signup",obj)
   .then((res) => {
       console.log(res)
       document.body.innerHTML =  document.body.innerHTML + ` ${res.data.message}`;
       window.location.href = "./login.html";
   })
   .catch((err)=> {
        console.log(err);
       document.body.innerHTML =  document.body.innerHTML + ` ${err}`;
   });
});

