document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const steps = document.querySelectorAll('.wizard-step');
    const progressBar = document.getElementById('progress');
    const stepCircles = document.querySelectorAll('.step');
    const contractOptions = document.querySelectorAll('.contract-option');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const submitButton = document.getElementById('submitForm');
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    const customDurationRadio = document.querySelector('input[name="duration"][value="custom"]');
    const customDurationInput = document.querySelector('.custom-duration');
    const requiredInputs = document.querySelectorAll('#step3 input[required]');
    
    // Current step
    let currentStep = 1;
    
    // Update progress bar
    function updateProgress() {
        progressBar.style.width = ((currentStep - 1) / (steps.length - 2)) * 100 + '%';
        
        // Update step circles
        stepCircles.forEach((circle, idx) => {
            if (idx + 1 < currentStep) {
                circle.classList.add('completed');
            } else {
                circle.classList.remove('completed');
            }
            
            if (idx + 1 === currentStep) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
        });
    }
    
    // Show step
    function showStep(stepNumber) {
        steps.forEach((step, idx) => {
            step.style.display = idx + 1 === stepNumber ? 'block' : 'none';
        });
        
        currentStep = stepNumber;
        updateProgress();
    }
    
    // Contract option selection
    contractOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            contractOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Enable next button
            document.getElementById('step1Next').disabled = false;
        });
    });
    
    // Radio input change
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Check if all questions in step 2 have been answered
            const step2Questions = document.querySelectorAll('#step2 .question');
            let allAnswered = true;
            
            step2Questions.forEach(question => {
                const name = question.querySelector('input[type="radio"]').name;
                const checked = document.querySelector(`input[name="${name}"]:checked`);
                
                if (!checked) {
                    allAnswered = false;
                }
            });
            
            // Enable next button if all questions answered
            document.getElementById('step2Next').disabled = !allAnswered;
            
            // Show/hide custom duration input
            if (this === customDurationRadio) {
                customDurationInput.style.display = this.checked ? 'block' : 'none';
            }
        });
    });
    
    // Required inputs validation
    requiredInputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });
    
    function validateForm() {
        let valid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
            }
        });
        
        submitButton.disabled = !valid;
    }
    
    // Next button click
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            showStep(currentStep + 1);
            window.scrollTo(0, 0);
        });
    });
    
    // Previous button click
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            showStep(currentStep - 1);
            window.scrollTo(0, 0);
        });
    });
    
    // Submit form
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Here you would normally send the form data to your server
        // For this example, we'll just show the success message
        showStep(4); // Show success message
        window.scrollTo(0, 0);
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Initialize
    updateProgress();
    validateForm();
});