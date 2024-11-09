function del() {
    // Get the value of the ID to delete
    var value = document.getElementById('idx').value;

    // Local API URL
    const api_url = `http://localhost:3000/api/data/${value}`;

    // Asynchronous function to perform DELETE request
    async function deleteData(url) {
        try {
            // Send DELETE request to the API
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Parse the JSON response
            const data = await response.json();
            console.log(data);

            // Hide the loader
            hideloader();

            // Show appropriate message based on response code
            show(data);
        } catch (error) {
            console.error("Error deleting data:", error);
            swal("An error occurred", { icon: "error" });
        }
    }

    // Call the async function to delete data
    deleteData(api_url);

    // Function to hide the loader
    function hideloader() {
        document.getElementById('loading').style.display = 'none';
    }

    // Function to display a message based on the response
    function show(data) {
        if (data.Code === 200) {
            swal("Data has been deleted", {
                icon: "success",
            }).then(() => {
                window.location = "RetrieveData.html"; // Redirect after successful deletion
            });
        } else if (data.Code === 400) {
            swal("Internal Server Error.", {
                icon: "warning",
            });
        } else if (data.Code === 404) {
            swal("No Data found with that ID.", {
                icon: "warning",
            });
        } else {
            swal("Process failed", {
                icon: "warning",
            });
        }
    }
}
