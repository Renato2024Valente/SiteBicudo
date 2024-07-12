// script.js
let records = [];

function addRecord() {
    const studentName = document.getElementById('studentName').value;
    const piece = document.getElementById('piece').value;

    if (studentName && piece) {
        const record = {
            studentName: studentName,
            piece: piece,
            status: 'Registrado',
            timestamp: new Date().toLocaleString(),
            returned: false
        };

        records.push(record);
        displayRecords();
        clearForm();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function displayRecords() {
    const recordList = document.getElementById('recordList');
    recordList.innerHTML = '';

    records.forEach(record => {
        const listItem = document.createElement('li');
        listItem.classList.add('record-item');

        if (record.returned) {
            listItem.classList.add('returned');
        }

        listItem.innerHTML = `
            <div class="record-info">
                <span>${record.timestamp}</span>
                <span>${record.studentName} ${record.status} a peça: ${record.piece}</span>
            </div>
            <div class="button-container">
                <button onclick="markReturned('${record.studentName}')" class="small-button">Devolver</button>
                <button onclick="deleteRecord('${record.studentName}')" class="small-button">Deletar</button>
            </div>
        `;
        recordList.appendChild(listItem);
    });
}

function clearForm() {
    document.getElementById('studentName').value = '';
    document.getElementById('piece').value = '';
}

function markReturned(studentName) {
    const index = records.findIndex(record => record.studentName === studentName);
    if (index !== -1) {
        records[index].status = 'Devolvido';
        records[index].returned = true;
        displayRecords();
    }
}

function deleteRecord(studentName) {
    const index = records.findIndex(record => record.studentName === studentName);
    if (index !== -1) {
        records.splice(index, 1);
        displayRecords();
    }
}

function printRecords() {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Registros de Peças</title></head><body>');
    printWindow.document.write('<h1>Registros de Peças - Maker Bicudo 2024</h1>');
    printWindow.document.write('<ul>');
    records.forEach(record => {
        printWindow.document.write(`<li>${record.timestamp} - ${record.studentName} ${record.status} a peça: ${record.piece}</li>`);
    });
    printWindow.document.write('</ul></body></html>');
    printWindow.document.close();
    printWindow.print();
}

function loadStudentList() {
    const fileInput = document.getElementById('studentFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const lines = text.split('\n');
            lines.forEach(line => {
                const studentName = line.trim();
                if (studentName) {
                    const record = {
                        studentName: studentName,
                        piece: '',
                        status: 'Registrado',
                        timestamp: new Date().toLocaleString(),
                        returned: false
                    };
                    records.push(record);
                }
            });
            displayRecords();
        };
        reader.readAsText(file);
    } else {
        alert('Por favor, selecione um arquivo.');
    }
}
