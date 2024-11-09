// Function to fetch and display data by ID
function searchById() {
    // Get the ID from the input field
    const id = document.getElementById('idx').value;

    // Construct the API URL with the provided ID
    const api_url = `http://localhost:3000/api/data/${id}`;

    // Show the loader
    document.getElementById('loading').style.display = 'block';

    // Fetch data from the API
    fetch(api_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Hide the loader
            document.getElementById('loading').style.display = 'none';

            // Check if data was found
            if (data.Code === 200) {
                swal("Data found!", { icon: "success" });

                // Display the data in the table cells
                document.getElementById('idxx').textContent = data.id || "N/A";
                document.getElementById('firstname').textContent = data.first_name || "N/A";
                document.getElementById('lastname').textContent = data.last_name || "N/A";
                document.getElementById('emailV').textContent = data.email_value || "N/A";
            } else if (data.Code === 404) {
                swal("No Data Found.", { icon: "warning" });

                // Clear the table fields if no data is found
                document.getElementById('idxx').textContent = "N/A";
                document.getElementById('firstname').textContent = "N/A";
                document.getElementById('lastname').textContent = "N/A";
                document.getElementById('emailV').textContent = "N/A";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            swal("An error occurred", { icon: "error" });
            document.getElementById('loading').style.display = 'none';
        });
}
