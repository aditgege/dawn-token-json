const fs = require('fs');

// Daftar file input
const inputFiles = ['dawn.txt', 'dawn1.txt']; // Ganti  nama file data
const outputFile = 'output.txt';

let allEntries = [];

inputFiles.forEach((inputFile, index) => {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error membaca file ${inputFile}:`, err);
            return;
        }

        const regex = /Email: (.*?)\nPassword: .*?\nToken: (.*?)\n/g;
        let match;

        while ((match = regex.exec(data)) !== null) {
            allEntries.push({
                Email: match[1],
                Token: match[2]
            });
        }

        //if last write to json format
        if (index === inputFiles.length - 1) {
            fs.writeFile(outputFile, JSON.stringify(allEntries, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error('Error menyimpan file TXT:', err);
                } else {
                    console.log('Data berhasil dikonversi dan disimpan', outputFile);
                }
            });
        }
    });
});
