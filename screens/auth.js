window.onload=function(){
var button = document.getElementById('login-btn');
var signupButton = document.getElementById('signup-btn');

if(button)

button.addEventListener('click', async _ => {
  try {   
    var mail = document.getElementById('studentInputEmail').value;
    var pass = document.getElementById('studentInputPassword').value;
    let data = {email: mail,password: pass};
    const response = await fetch('http://127.0.0.1:8080/login', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(function(response) {
        return response.json();
      }).then(async function(data) {
      localStorage.setItem("token",data.token);
      if(data.error){
        document.getElementById("error").innerText=data.message+". Try Again!"
      }
      else{
        // await getInfo();
        window.location.replace("http://127.0.0.1:5500/screens/home.html");
      }
        console.log(data);  
      });
    console.log('Completed!', response.body);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});

if(signupButton)

signupButton.addEventListener('click', async _ => {
  try {   
    var mail = document.getElementById('studentInputEmailSignup').value;
    var name = document.getElementById('studentInputNameSignup').value;
    var pass = document.getElementById('studentInputPasswordSignup').value;
    var regno = document.getElementById('studentInputRegnoSignup').value;
    let data = {email: mail,password: pass,name: name,regno: regno};
    const response = await fetch('http://127.0.0.1:8080/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(function(response) {
        return response.json();
      }).then(async function(data) {
        console.log(data)
      if(data.error){
        document.getElementById("error").innerText=data.message+". Try Again!"
      } else {
        document.getElementById("success").innerText=data.message
        setTimeout(()=>window.location.replace("http://127.0.0.1:5500/index.html"),2000)
      }
      });
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});

}


async function getInfo(){
  try {   
    var url = "http://127.0.0.1:8080/home"
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem("token")
      },
    }).then(function(response) {
      return response.json();
    }).then(async function(data) {
      console.log(data)
      
      document.getElementById("name").innerText=data.data.name;
      document.getElementById("reg").innerText=data.data.regno;
      document.getElementById("email").innerText=data.data.email;
    })
    
  } catch(err) {
    console.error(`Error: ${err}`);
  }
}