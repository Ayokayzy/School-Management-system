// Import the SignUp class from the external app.js module
import { SignUp } from './app.js';

// Wait for the DOM to fully load before executing the script
$(function () {
    // Create a new instance of the SignUp class
    let UI = new SignUp();

    // Call the verifyAccount method to handle account verification
    UI.verifyAccount();
});