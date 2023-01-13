import {writeFile} from 'fs';

import cityCoporationData from "./cityCoporations.json" assert { type: "json" };

import divisionsData  from './sorted/sortedDivisions.json' assert { type : "json" };
import districtsData  from './sorted/sortedDistricts.json' assert { type : "json" };
import upazilasData  from './sorted/sortedUpazilas.json' assert { type : "json" };
import unionsData  from './sorted/sortedUnions.json' assert { type : "json" };

const Bangladesh = { ...cityCoporationData.Bangladesh };

for (const division of divisionsData) {
  for (const district of districtsData) {
    if(division.id === district.division_id) {
      if ( !(district.name in Bangladesh[division.name]) ) {
        Bangladesh[division.name][district.name] ={};
      }
      for (const upazila of upazilasData) {
        if(district.id === upazila.district_id) {
          Bangladesh[division.name][district.name][upazila.name] = [];
          for (const union of unionsData) {
            if(upazila.id === union.upazilla_id) {
              Bangladesh[division.name][district.name][upazila.name].push(union.name);
            }
          }
        }
      }
    }
  }
}


const data = JSON.stringify({Bangladesh: Bangladesh});

writeFile("./formattedBangladesh.json", data, 'utf-8', err=>{
 if(err){
   console.log("Error writing file" ,err)
 } else {
   console.log('JSON data is written to the file successfully')
 }
})