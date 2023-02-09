async function Login(event){
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    const obj = {
        email:email,
        password: password
    }
    console.log(obj);
     try{
        const response = await axios.post("http://35.78.232.87:3000/user/login",obj);

        if(response.data === null){
            throw new Error ("message: User donot exist");
        }
        //console.log(response);
        //window.alert('user loggedin successfully');
        localStorage.setItem('token',response.data.token);
        console.log("hy");
      window.location.href = "./frontend.html";
     }

     catch(error){
        document.body.innerHTML =  document.body.innerHTML + ` ${error}`;
     }          
  }

  function forgotpassword() {
window.location.href = "./forgot-password.html"
}
