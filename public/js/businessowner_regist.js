document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('businessOwnerForm');
    
    // Tambahkan event listener untuk setiap file input
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        // Set accepted file types
        input.setAttribute('accept', '.pdf,.jpg,.jpeg');
        
        input.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                
                // Validasi tipe file
                const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
                const validExtensions = ['.pdf', '.jpg', '.jpeg'];
                const fileName = file.name.toLowerCase();
                
                const isValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
                
                if (!isValidExtension) {
                    showError(`Please upload PDF or JPG file for ${this.name}`);
                    this.value = ''; // Reset input file
                    return;
                }
            }
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
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
            
            // Validasi tipe file saat submit
            const file = fileInput.files[0];
            const fileName = file.name.toLowerCase();
            const validExtensions = ['.pdf', '.jpg', '.jpeg'];
            const isValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
            
            if (!isValidExtension) {
                showError(`Please upload PDF or JPG file for ${fileInput.name}`);
                return false;
            }
        }

        // Jika semua validasi berhasil, lanjutkan dengan submit
        handleFormSubmit(form);
    });
});

// Tambahkan validasi real-time untuk password
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;    
    const errorDiv = document.getElementById('errorMessage');
    
    if (password.length < 8) {
        errorDiv.textContent = 'Password must be at least 8 characters long';
        errorDiv.style.display = 'block';
        errorDiv.classList.add('show');
    } else {
        errorDiv.style.display = 'none';
        errorDiv.classList.remove('show');
    }
});

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