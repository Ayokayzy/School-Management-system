

$( function() {

function loadalldata() {

    let data  = JSON.parse(localStorage.getItem('userData'));

    $('.schoolname').text("").text(data.username);
    $('.gmail').text(data.email)



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


