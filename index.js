const crawler = require('crawler-request');
const fs = require('fs');

var url = 'https://www.bundesnetzagentur.de/SharedDocs/Downloads/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Frequenzen/Amateurfunk/Rufzeichenliste/Rufzeichenliste_AFU.pdf?__blob=publicationFile&v=76';

crawler(url).then(response => {
    const regex = /([D][A-R][0-9][A-Z]{1,3})/g;
    let calls = response.text.match(regex);

    const csvFile = fs.createWriteStream('callsigns.csv');
    calls.forEach(call => {
        csvFile.write(call + '\r\n');
    });
    csvFile.end();

    console.log(calls.length + ' callsigns were written to callsigns.csv');
});