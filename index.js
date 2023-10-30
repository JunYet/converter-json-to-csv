const fs = require('fs');

let csv = "";

const fileName = "dummy"

const target = `./data/${fileName}.json`;

fs.readFile(target, function(err, data){

    let mydata = JSON.parse([data]);

    ObjectValues = (v, k) => {
        if (typeof v == "object") {
            for (var kp in v) {
                if (Object.hasOwnProperty.call(v, kp)) {
                    ObjectValues(v[kp], k != undefined ? k + "." + kp : kp);
                }
            }
        } else {
            // csv += k + "," + v.toString().replace(/,/g, '\\,').replace(/"/g, '""') + '\r\n';
            csv += k + "," + (v.toString().includes(',') ? `"${v.toString().replace(/"/g, '""')}"` : v) + '\r\n';
        }
    };

    if(Object.keys(mydata).length > 0){
        ObjectValues(JSON.parse([data]))
    } else {
        throw "no data"
    }

    fs.writeFile(`./data-${fileName}.csv`, csv, (err) => {
        if(err) throw err;
        console.log("CSV File is saved")
    })
});