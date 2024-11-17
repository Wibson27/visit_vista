document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const touristId = document.getElementById('touristId').value.trim();
        const password = document.getElementById('password').value;

        // Validate Tourist ID
        if (!touristId) {
            showError('Tourist ID is required');
            return;
        }

        // Validate Password
        if (!password) {
            showError('Password is required');
            return;
        }

        // Simulate login process
        handleLogin(touristId, password);
    });
});

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    if (errorDiv) {
        // Hide success message if exists
        successDiv.style.display = 'none';
        successDiv.classList.remove('show');
        
        // Show error message
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.classList.add('show');
        
        // Scroll to message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        alert(message);
    }
}

function showSuccess(message) {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    if (successDiv) {
        // Hide error message if exists
        errorDiv.style.display = 'none';
        errorDiv.classList.remove('show');
        
        // Show success message
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        successDiv.classList.add('show');
        
        // Scroll to message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        alert(message);
    }
}

function handleLogin(touristId, password) {
    // Here you would typically make an API call to your backend
    // For now, we'll simulate a successful login
    
    setTimeout(() => {
        showSuccess('Login successful! Redirecting...');
        
        // Simulate redirect after successful login
        setTimeout(() => {
            window.location.href = '/dashboard'; // Change this to your dashboard URL
        }, 1500);
    }, 1000);
}
