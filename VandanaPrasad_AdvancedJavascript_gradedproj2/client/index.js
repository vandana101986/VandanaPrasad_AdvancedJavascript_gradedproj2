
const check = async() => {

    const response  = await fetch('http://localhost:4000/credentials');
    const credentials = await response.json();
    console.log(credentials);

    let { uname, pwd } = document.forms[0];


   /* fetch('http://localhost:4000/credentials')
        .then((response) => response.json())
        .then((response) => {*/
            

    let userData = credentials.find(each => each.userName === uname.value);
    
    if (userData) {
        console.log(userData);
        if (userData.passWord === pwd.value) {
            window.location = "resume.html";
        }
        else {
            document.querySelector(".wrongUserName").innerHTML = "";
            document.querySelector(".wrongPassword").innerHTML = "Invalid password";
      
        }
    }
    else {
        document.querySelector(".wrongPassword").innerHTML = "";
        document.querySelector(".wrongUserName").innerHTML = "Invalid username";
    }

    
}