document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('businessOwnerForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form submit default
        
        // Validasi form
        if (validateForm()) {
            showSuccessPopup();
            
            // Redirect setelah 3 detik
            setTimeout(() => {
                window.location.href = '../login/businessowner_login.html';
            }, 3000);
        }
    });
});

function validateForm() {
    // Validasi Owner ID
    const ownerId = document.getElementById('ownerId').value.trim();
    if (!ownerId) {
        showError('Owner ID is required');
        return false;
    }

    // Validasi Business Name
    const businessName = document.getElementById('businessName').value.trim();
    if (!businessName) {
        showError('Business Name is required');
        return false;
    }

    // Validasi Email
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('Email is required');
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }

    // Validasi Password
    const password = document.getElementById('password').value;
    if (!password) {
        showError('Password is required');
        return false;
    }
    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return false;
    }

    // Validasi Phone Number
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    if (!phoneNumber) {
        showError('Phone Number is required');
        return false;
    }
    const phoneRegex = /^\d{10,12}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showError('Please enter a valid phone number (10-12 digits)');
        return false;
    }

    // Validasi Required Files
    const requiredFiles = ['domisili', 'situ', 'pariwisata', 'siup'];
    for (const fileName of requiredFiles) {
        const fileInput = document.querySelector(`input[name="${fileName}"]`);
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            showError(`Please upload ${fileName} document`);
            return false;
        }
    }

    return true; // Semua validasi berhasil
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.classList.add('show');
        
        // Scroll ke error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        alert(message);
    }
}

function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('show');
    }
}