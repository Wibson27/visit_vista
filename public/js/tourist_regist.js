// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.querySelector('form');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            interests: getSelectedInterests(),
            destination: document.getElementById('destination').value
        };

        // Basic validation
        if (!validateForm(formData)) {
            return;
        }

        // Submit form data
        submitRegistration(formData);
    });
});

// Get selected travel interests
function getSelectedInterests() {
    const checkboxes = document.querySelectorAll('input[name="interests"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Validation function
function validateForm(data) {
    console.log('Validating:', data);

    // Name validation
    if (data.firstName.trim() === '' || data.lastName.trim() === '') {
        showError('Please enter your full name');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('Please enter a valid email address');
        return false;
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showError('Please enter a valid phone number');
        return false;
    }

    // Password validation
    if (data.password.length < 8) {
        showError('Password must be at least 8 characters long');
        return false;
    }

    if (data.password !== data.confirmPassword) {
        showError('Passwords do not match');
        return false;
    }

    return true;
}

// Show error message
function showError(message) {
    alert(message);
}

// Submit registration data
function submitRegistration(formData) {
    console.log('Submitting registration:', formData);
    
    alert('Registration successful!');
    document.querySelector('form').reset();
}
