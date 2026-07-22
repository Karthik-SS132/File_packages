document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value
    };

    fetch("http://localhost:5000/api/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        alert("Data saved successfully!");
    })
    .catch(error => {
        console.error("Error:", error);
    });
});