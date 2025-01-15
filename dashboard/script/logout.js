import Implementation from '../script/app.js';

$( function() {





    function checkAuth()
    {
        const token = localStorage.getItem('authToken');



        if (!token)
        {
            alert("You need to log in to access the dashboard. thank you");

            window.location.href = '../Login-Signup/03-login.html';


            return;
        }
    }


    checkAuth();
   
   
   // logout

    $('.login').first().click(() =>{
       


        if (confirm("Are you sure you want to logout? "))
        {
            // Clear the token
        localStorage.clear()
    
        // Redirect to the login page
        alert('You have been logged out.');
        window.location.href = '../Login-Signup/03-login.html';
    
        }
        })

    
  // load school name at navbar

  let data = JSON.parse(localStorage.getItem('userData'));


  $('.c').text('')
  $('.c').text(`${data.username}.school`)



//   load data into localstorage
 
let UI = new Implementation('https://school-management-system-tv64.onrender.com/api/v1/user/all', '');

UI.loaddata();

 
    
})
         