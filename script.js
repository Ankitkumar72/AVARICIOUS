document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validate the form
        if (!isValidUsername(username) || !isValidEmail(email) || !isValidPassword(password)) {
            alert('Please provide valid information for all fields.');
            return;
        }

        try {
            // Simulate an asynchronous request (replace this with actual AJAX or fetch call)
            const response = await simulateSignupRequest(username, email, password);

            // Display success message and handle further actions (e.g., redirect)
            alert(`Sign up successful!\nResponse: ${response}`);

            // Clear the form inputs
            usernameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';

        } catch (error) {
            // Handle errors (e.g., display an error message)
            alert(`Sign up failed. Please try again.\nError: ${error.message}`);
        }
    });

    // Initialize Google Sign-In
    gapi.load('auth2', function () {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
        });
    });

    // Function called when Google Sign-In is successful
    window.onGoogleSignIn = function (googleUser) {
        // Access the user's profile information
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        // Use the user's information as needed (e.g., send it to your server)
        // ...

        // Sign out the user if needed
        // var auth2 = gapi.auth2.getAuthInstance();
        // auth2.signOut().then(function () {
        //     console.log('User signed out.');
        // });
    };

    // Function to simulate an asynchronous sign-up request
    async function simulateSignupRequest(username, email, password) {
        return new Promise((resolve, reject) => {
            // Simulate a delay to represent the time taken for a real API request
            setTimeout(() => {
                const isSuccess = Math.random() < 0.8; // Simulate 80% success rate

                if (isSuccess) {
                    resolve('User successfully registered!');
                } else {
                    reject(new Error('Failed to register user. Please try again.'));
                }
            }, 1000); // Simulate a 1-second delay
        });
    }

    // Validation functions
    function isValidUsername(username) {
        return /^[a-zA-Z0-9]{3,}$/.test(username);
    }

    function isValidEmail(email) {
        // Basic email validation (you may want to use a more robust validation method)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPassword(password) {
        // Password should be at least 6 characters long
        return password.length >= 6;
    }
});
