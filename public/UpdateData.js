function updateNew() {
    console.log("Update button clicked"); // Add this line for debugging

    // Get values from form inputs
    const idxx = document.getElementById('idx').value;
    const firstname = document.getElementById('fName').value;
    const lastname = document.getElementById('lName').value;
    const emailV = document.getElementById('emailAd').value;

    // Local API URL
    const api_url = `http://localhost:3000/api/data/${idxx}`;

    // Create request payload
    const payload = {
        first_name: firstname,
        last_name: lastname,
        email_value: emailV
    };

    // Send PUT request to update data
    fetch(api_url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Update response:", data); // Log response for debugging

        // Show appropriate feedback based on response
        if (data.Code === 200) {
            swal("Data updated successfully", {
                icon: "success",
            }).then(() => {
                window.location = "RetrieveData.html"; // Redirect after successful update
            });
        } else if (data.Code === 404) {
            swal("Data not found", {
                icon: "warning",
            });
        } else {
            swal("Failed to update data", {
                icon: "error",
            });
        }
    })
    .catch(error => {
        console.error("Error updating data:", error);
        swal("An error occurred", { icon: "error" });
    });
}
