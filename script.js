

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
    let students = [];

    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            students = data;
            renderTable(students);
        });

    
    function renderTable(data) {
        const tableBody = document.querySelector('#studentTable tbody');
        tableBody.innerHTML = '';
        data.forEach((student, index) => {
            const status = student.passing ? 'Pass' : 'Failed';
            const fullName = `${student.first_name} ${student.last_name}`;
            tableBody.innerHTML += `
                <tr>
                    <td>${index + 1}</td> <!-- ID column -->
                    <td>
                        <img src="${student.img_src}" alt="Student Image" style="vertical-align: middle; width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
                        ${fullName}
                    </td>
                    <td>${student.gender}</td>
                    <td>${student.class}</td>
                    <td>${student.marks}</td>
                    <td>${status}</td>
                    <td>${student.email}</td>
                </tr>
            `;
        });
    }

    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    
    function handleSearch() {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredData = students.filter(student => 
            student.first_name.toLowerCase().includes(searchTerm) ||
            student.last_name.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredData);
    }

    searchButton.addEventListener('click', handleSearch);

   
    document.getElementById('sortAZ').addEventListener('click', () => {
        const sortedData = [...students].sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
        renderTable(sortedData);
    });

    document.getElementById('sortZA').addEventListener('click', () => {
        const sortedData = [...students].sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
        renderTable(sortedData);
    });

    document.getElementById('sortMarks').addEventListener('click', () => {
        const sortedData = [...students].sort((a, b) => a.marks - b.marks);
        renderTable(sortedData);
    });

    document.getElementById('sortPassing').addEventListener('click', () => {
        const sortedData1 = students.filter(student => student.passing);
        const sortedData2 = students.filter(student => !student.passing);
        renderTable(sortedData1.concat(sortedData2));
    });

    document.getElementById('sortClass').addEventListener('click', () => {
        const sortedData = [...students].sort((a, b) => a.class - b.class);
        renderTable(sortedData);
    });

    document.getElementById('sortGender').addEventListener('click', () => {
        const maleStudents = students.filter(student => ['male', 'polygender', 'genderfluid', 'bigender'].includes(student.gender.toLowerCase()));
        const femaleStudents = students.filter(student => ['female', 'genderqueer', 'agender', 'non-binary'].includes(student.gender.toLowerCase()));
        
        const tableBody = document.querySelector('#studentTable tbody');
        tableBody.innerHTML = ''; 
        
        renderTable(maleStudents.concat(femaleStudents)); 
    });
});
