document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const ownerId = document.getElementById('ownerId').value.trim();
        const password = document.getElementById('password').value;

        // Validate Owner ID
        if (!ownerId) {
            showError('Owner ID is required');
            return;
        }

        // Validate Password
        if (!password) {
            showError('Password is required');
            return;
        }

        // Simulate login process
        handleLogin(ownerId, password);
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

async function handleLogin(ownerId, password) {
    try {
        // Simulate API call
        const response = await fetch('/api/login/business-owner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ownerId: ownerId,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess('Login successful! Redirecting...');
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } else {
            // Check if user is not registered
            if (data.error === 'user_not_found') {
                showError('Account not found. Please register first.');
            } else {
                showError(data.message || 'Invalid Owner ID or Password');
            }
        }
    } catch (error) {
        showError('An error occurred. Please try again later.');
        console.error('Login error:', error);
    }
} 
