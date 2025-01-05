

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
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    // Redirect to the login page
    alert('You have been logged out.');
    window.location.href = '../Login-Signup/03-login.html';

    }
    })


function loadalldata() {

    let data  = JSON.parse(localStorage.getItem('userData'));

    $('.schoolname').text("").text(data.username);
    $('.gmail').text(data.email)


    console.log(data);

}

loadalldata()



})



















// Optional: Validate token with the server
// function validateToken(token) {
//     $.ajax({
//         type: "POST",
//         url: "https://school-management-system-tv64.onrender.com/api/v1/auth/validate-token",
//         contentType: "application/json",
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         success: () => {
//             console.log("Token is valid.");
//         },
//         error: () => {
//             alert("Your session has expired. Please log in again.");
//             localStorage.removeItem('authToken');
//             window.location.href = '../auth/03-login.html';
//         },
//     });
// }


