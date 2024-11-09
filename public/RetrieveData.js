// Local API URL
const api_url = "http://localhost:3000/api/data";

// Function to fetch data from the API
async function getapi(url) {
    document.getElementById("loading").style.display = "block"; // Show loader

    try {
        // Fetch data from API
        const response = await fetch(url);
        
        // Check if response is okay
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        
        // Parse JSON data
        const data = await response.json();
        console.log(data);

        // Hide loader and display data
        hideloader();
        show(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

// Function to display data in HTML table
function show(data) {
    let tab = `
        <tr>
            <th>ID</th>
            <th>Description</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Code</th>
            <th>Email</th>
            <th colspan="2">Action</th>
        </tr>`;

    // Loop through data array to populate the table
    for (let r of data) {
        tab += `
        <tr>
            <td>${r.id || 'undefined'}</td>
            <td>${r.Description || 'undefined'}</td> <!-- Ensure correct field name here -->
            <td>${r.first_name || 'undefined'}</td> <!-- Ensure correct field name here -->
            <td>${r.last_name || 'undefined'}</td> <!-- Ensure correct field name here -->
            <td>${r.Code || 'undefined'}</td> <!-- Ensure correct field name here -->
            <td>${r.email_value || 'undefined'}</td> <!-- Ensure correct field name here -->
            <td><a href="UpdateData.html?id=${r.id}" class="Update">
                <button type="button" id="Update">UPDATE</button></a></td>
            <td><a onclick="return confirm('Are you sure you want to delete this entry?')" href="DeleteData.html?id=${r.id}" class="Delete">
                <button type="button" id="Delete">DELETE</button></a></td>
        </tr>`;
    }

    document.getElementById("employees").innerHTML = tab;
}
