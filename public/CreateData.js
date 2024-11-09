// Local API URL
const api_url = "http://localhost:3000/api/data"; // Ensure this matches the server route

// Function to add a new entry
function addNew() {
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const emailAd = document.getElementById('emailAd').value;

    // Display input values for confirmation
    swal(`${fName} ${lName} ${emailAd}`, { icon: "info" });

    // Asynchronous function to post data to the API
    async function postData(url) {
        try {
            // Show loader
            document.getElementById('loading').style.display = 'block';

            const response = await fetch(url, {
                method: 'POST',
                body: `first_name=${encodeURIComponent(fName)}&last_name=${encodeURIComponent(lName)}&email_value=${encodeURIComponent(emailAd)}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const data = await response.json();
            console.log(data); // Debugging log

            hideloader();
            show(data);
        } catch (error) {
            console.error("Error posting data:", error);
            hideloader();
            swal("An error occurred", { icon: "error" });
        }
    }

    postData(api_url);
}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function show(data) {
    if (data.Code === 200) {
        swal("Process successful", {
            icon: "success",
        }).then(() => {
            window.location = "RetrieveData.html"; // Redirect to retrieve page
        });
    } else {
        swal("Process failed", {
            icon: "warning",
        });
    }
}
