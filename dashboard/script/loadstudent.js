// Import the Implementation class from the app.js script
import Implementation from '../script/app.js';

// Wait for the document to be ready before executing the script
$(function () {

    // Create an instance of the Implementation class and pass the URL of the student data
    // 'student-data.json' - The source file for student data
    // 'student' - Specifies that this instance is for "student" mode
    
    let UI = new Implementation('student-data.json', 'student');

    // Load all student data from the 'student-data.json' file and populate the table
    UI.loadalldata();

    // Enable filtering by class
    // This allows the user to filter students based on the class selected in a dropdown
    UI.filterClass();

    // Enable filtering by name or email
    // This feature filters student data in real time as the user types in the input field
    UI.filtername();

    // Enable the feature to display student profiles when a table row is clicked
    // Clicking a row in the table will show detailed information about the selected student
    UI.displayStudentprofile();
});
