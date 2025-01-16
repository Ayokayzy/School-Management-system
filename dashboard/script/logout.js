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
    
        }})

    
  // load school name at navbar

  let data = JSON.parse(localStorage.getItem('userData'));


  $('.c').text('')
  $('.c').text(`${data.username}.school`)



//   load data into localstorage
 
let UI = new Implementation('https://school-management-system-tv64.onrender.com/api/v1/user/all', '');

UI.loaddata();



// export csv data
let button =  $('.btn').children()[0]

$(button).click(downloadCsv);


const jsonData = JSON.parse(localStorage.getItem('datavalue'));

 // Function to convert JSON to CSV
 function convertToCSV(jsonData) {
    const header = Object.keys(jsonData[0]);
    const rows = jsonData.map(row => header.map(field => row[field]).join(","));
    return [header.join(","), ...rows].join("\n");
  }


// Function to trigger CSV file download
function downloadCsv ()

{
    if (confirm('Do you want to export all student and teacher data via csv? '))
    {
        alert("importation sucessfulll ");
    }
    else{
        return
    }

    const csv = convertToCSV(jsonData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.click();
}



})
         