import {writeFile} from 'fs';

import divisionsData  from './unsorted/divisions.json' assert { type : "json" };
import districtsData  from './unsorted/districts.json' assert { type : "json" };
import upazilasData  from './unsorted/upazilas.json' assert { type : "json" };
import unionsData  from './unsorted/unions.json' assert { type : "json" };

const sortAndWrite = (data, filename) => {
  const result = data.sort(function(a, b){
    if (a.name < b.name) {
      return -1;
    }
  });
  
  writeFile(filename, JSON.stringify(result), "utf-8", (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("JSON data is written to the file successfully");
    }
  });
}


sortAndWrite(divisionsData, "./sorted/sortedDivisions.json");
sortAndWrite(districtsData, "./sorted/sortedDistricts.json");
sortAndWrite(upazilasData, "./sorted/sortedUpazilas.json");
sortAndWrite(unionsData, "./sorted/sortedUnions.json");