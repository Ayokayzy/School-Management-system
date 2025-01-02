// Import the Implementation class from the app.js file
import { Implementation } from "./app.js";

// Wait for the DOM to fully load before executing the script
$(function () {

    // Create an instance of the Implementation class
    // Parameters:
    // 'data.json' - URL or file path to fetch the data
    // 'teacher' - The type of user for filtering and display logic
    let UI = new Implementation('data.json', 'teacher');

    // Call the Searchprofile method to enable searching for profiles by name
    UI.Searchprofile();

});
