// Import the Implementation class from the app.js file
import Implementation from '../script/app.js';
// Wait for the DOM to fully load before executing the script
$(function () {

    // Create an instance of the Implementation class

    // 'teacher' - The type of user for filtering and display logic
    

    let UI = new Implementation('https://school-management-system-tv64.onrender.com/api/v1/user', 'teacher');


    UI.exam()

    UI.loadExams()
  


});