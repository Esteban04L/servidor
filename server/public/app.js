document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = this.elements['name'].value.trim();
    const email = this.elements['email'].value.trim();

    if (!name) {
        alert('Please enter your name.');
        return;
    }
    if (!email.includes('@')) {
        alert('Please enter a valid email.');
        return;
    }

    // Enviar datos a través de Fetch API
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        alert('Form submitted successfully: ' + data.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit the form');
    });
});

