document.getElementById('giveawayForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const twitterHandle = document.getElementById('twitterHandle').value;
    const contactMethod = document.getElementById('contactMethod').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const network = document.getElementById('network').value;
    const emailNetwork = document.getElementById('emailNetwork').value;
    const accountName = document.getElementById('accountName').value;
    const bankName = document.getElementById('bankName').value;

    // Prepare the data for Formspree
    const formData = {
        twitterHandle: twitterHandle,
        contactMethod: contactMethod,
        contactInfo: contactInfo
    };

    // Add conditional fields based on contactMethod
    if (contactMethod === 'airtime') {
        formData.network = network;
    } else if (contactMethod === 'email') {
        formData.emailNetwork = emailNetwork;
    } else if (contactMethod === 'account') {
        formData.accountName = accountName;
        formData.bankName = bankName;
    }

    // Submit the form data using fetch
    fetch("https://formspree.io/f/xgegoddp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            // Display the custom thank you message
            document.getElementById('giveawayForm').reset();
            document.getElementById('giveawayForm').style.display = 'none';
            document.getElementById('message').classList.remove('hidden');
        } else {
            return response.json().then(data => {
                throw new Error(data.error || "Unknown error occurred.");
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error with your submission. Please try again.');
    });
});

// JavaScript function to show/hide fields based on selection
function updateFormFields() {
    const contactMethod = document.getElementById('contactMethod').value;
    const airtimeFields = document.getElementById('airtimeFields');
    const emailFields = document.getElementById('emailFields');
    const accountFields = document.getElementById('accountFields');

    if (contactMethod === 'airtime') {
        airtimeFields.classList.remove('hidden');
        emailFields.classList.add('hidden');
        accountFields.classList.add('hidden');
    } else if (contactMethod === 'email') {
        airtimeFields.classList.add('hidden');
        emailFields.classList.remove('hidden');
        accountFields.classList.add('hidden');
    } else if (contactMethod === 'account') {
        airtimeFields.classList.add('hidden');
        emailFields.classList.add('hidden');
        accountFields.classList.remove('hidden');
    } else {
        airtimeFields.classList.add('hidden');
        emailFields.classList.add('hidden');
        accountFields.classList.add('hidden');
    }
}
