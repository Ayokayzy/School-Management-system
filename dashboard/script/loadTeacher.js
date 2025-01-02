// Import the Implementation class from the app.js file
import { Implementation } from "./app.js";

// Wait for the DOM to fully load before executing the script
$(function () {

    // Create an instance of the Implementation class
    // Parameters:
    // 'data.json' - URL or file path to fetch the data
    // 'teacher' - The type of user for filtering and display logic
    
    let UI = new Implementation('data.json', 'teacher');

    // Load all data and populate the initial UI with teacher data
    UI.loadalldata();

    // Attach the class filtering logic to the dropdown menu
    UI.filterClass();

    // Attach the name/email filtering logic to the input field
    UI.filtername();

});
