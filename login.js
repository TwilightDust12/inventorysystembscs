const Login=document.querySelector('.Login');
const LoginBtn=document.querySelector('.LoginBtn');
const Register=document.querySelector('.Register');
const RegisterBtn=document.querySelector('.RegisterBtn');
LoginBtn.addEventListener('click',()=>{
Login.classList.add('active');
Register.classList.add('active');
})
RegisterBtn.addEventListener('click',()=>{
    Login.classList.remove('active');
    Register.classList.remove('active');
})
if(users[username] && users[username] === password) {
  alert("Login successful!");
  window.location.href = 'draft/Products.html'; 
} else {
  alert("Invalid username or password");
}
// 