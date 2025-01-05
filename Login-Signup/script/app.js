/**
 * Class to handle user authentication processes including sign-up, login, account verification, and token regeneration.
 */
export class SignUp {
    constructor() {
        this.form = $('form'); // Select the form element
        this.inputs = $('input'); // Select all input elements within the form
    }

    /**
     * Handles the sign-up process.
     */
    signUp() {
        this.form.submit((e) => {
            e.preventDefault(); // Prevent default form submission behavior

            // Collect form data from input fields
            const data = {
                fullName: $(this.inputs[0]).val(),
                username: $(this.inputs[1]).val(),
                email: $(this.inputs[2]).val(),
                password: $(this.inputs[3]).val()
            };

            // Validate password fields
            const passwords = [$('#psd1'), $('#psd2')];
            const isPasswordValid = this.validatePasswords(passwords);

            if (isPasswordValid) {

                // Send AJAX request to the server for sign-up
                this.ajaxRequest('signup', data)
                    .then((response) => {
                        
                        this.message(response.message, 'green'); // Display success message

                        // Redirect to another page after a delay
                        setTimeout(() => {
                            window.location.href = './02-signup.html';
                        }, 1000);
                    })
                    .catch((err) => {
                        this.message(err, 'red'); // Display error message
                    });
            }
        });
    }

    /**
     * Handles the login process.
     */
    login() {
        this.form.submit((e) => {
            e.preventDefault(); // Prevent default form submission behavior

            // Collect login data from input fields
            const data = {
                email: $(this.inputs[0]).val(),
                password: $(this.inputs[1]).val()
            };
       
            // Send AJAX request to the server for login
            this.ajaxRequest('login', data)
                .then((res) => {
                    // Store the token and user data in local storage
                    localStorage.setItem('authToken', res.data.token);
                    localStorage.setItem('userData', JSON.stringify(res.data.user));

                    this.message(res.message, 'green'); // Display success message

                    // Redirect to the dashboard after a delay
                    setTimeout(() => {
                        window.location.href = '../dashboard/dashboard.html';
                    }, 1000);
                })
                .catch((err) => {
                    this.message(err, 'red'); // Display error message
                });
        });
    }

    /**
     * Handles email account verification.
     */
    verifyAccount() {
        this.form.submit((e) => {
            e.preventDefault(); // Prevent default form submission behavior

            // Collect verification data from input fields
            const data = {
                token: $(this.inputs[1]).val(),
                email: $(this.inputs[0]).val()
            };
            console.log(data); // Log data for debugging

            // Send AJAX request to verify email
            this.ajaxRequest('verify-email', data)
                .then((res) => {
                    console.log(res); // Log server response
                    this.message(res.message, 'green'); // Display success message

                    // Redirect to login page after a delay
                    setTimeout(() => {
                        window.location.href = './03-login.html';
                    }, 3000);
                })
                .catch((err) => {
                    this.message(err, 'red'); // Display error message
                });
        });
    }

    /**
     * Handles token regeneration for account verification.
     */
    regenerateToken() {
        this.form.submit((e) => {
            e.preventDefault(); // Prevent default form submission behavior

            // Collect token regeneration data
            const data = {
                email: $(this.inputs[0]).val(),
                type: "accountVerification"
            };

            // Send AJAX request to regenerate token
            this.ajaxRequest('request-token', data)
                .then((res) => {
                    console.log(res); // Log server response
                })
                .catch((err) => {
                    this.message(err, 'red'); // Display error message
                });
        });
    }

    /**
     * Displays a message on the form.
     * @param {string} msg - The message text.
     * @param {string} color - The color of the message text.
     */
    message(msg, color) {
        $('.err').remove(); // Remove existing error messages
        let div = $('<div>'); // Create a new div element
        div.addClass('err'); // Add a class for styling
        div.text(msg); // Set the message text
        div.css('color', color); // Set the text color
        $('form').prepend(div); // Add the message at the top of the form

        // Remove the message after 4 seconds
        setTimeout(() => {
            div.remove();
        }, 4000);
    }

    /**
     * Displays a loading spinner on the form.
     */
    showLoading() {
        $('form').append('<div class="loading">Loading...</div>'); // Add loading spinner
    }

    /**
     * Hides the loading spinner from the form.
     */
    hideLoading() {
        $('.loading').remove(); // Remove the loading spinner
    }

    /**
     * Sends an AJAX POST request to the server.
     * @param {string} endpoint - API endpoint to send the request.
     * @param {object} value - Data to be sent in the request.
     * @returns {Promise} Resolves with the server response or rejects with an error message.
     */
    ajaxRequest(endpoint, value) {
        return new Promise((resolve, reject) => {
            this.showLoading(); // Show loading spinner

            $.ajax({
                type: "POST",
                url: `https://school-management-system-tv64.onrender.com/api/v1/auth/${endpoint}`,
                contentType: 'application/json',
                data: JSON.stringify(value),
                success: (response) => {
                    this.hideLoading(); // Hide loading spinner
                    resolve(response); // Resolve with server response
                },
                error: (jqXHR) => {
                    console.log(jqXHR); // Log error details
                    this.hideLoading(); // Hide loading spinner
                    reject(jqXHR.responseJSON?.message || "An unexpected error occurred"); // Reject with error message
                }
            });
        });
    }

    /**
     * Validates password fields.
     * @param {array} passwordFields - Array of password input elements.
     * @returns {boolean} True if passwords are valid, otherwise false.
     */
    validatePasswords(passwordFields) {
        $('.mgs').css('display', 'block'); // Show password validation message
        const [password1, password2] = [$(passwordFields[0]).val(), $(passwordFields[1]).val()];

        if (password1 === password2) {
            if (password1.length >= 8) {
                $('.mgs').text('Password match!').css('color', 'green'); // Show success message
                return true;
            } else {
                $('.mgs').text('Password must be at least 8 characters long.').css('color', 'red'); // Show length error
            }
        } else {
            $('.mgs').text('Passwords do not match!').css('color', 'red'); // Show mismatch error
        }

        return false;
    }
}
