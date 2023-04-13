import fs from 'fs';

// read the JSON file
const jsonData = fs.readFileSync('db.json');

const array = JSON.parse(jsonData);

// Add the new property to each object
array.products.forEach(obj => {
  obj.totalPrice = 0;
});

// convert the updated data back to JSON
const updatedJsonData = JSON.stringify(array);

// write the updated JSON data back to the file
fs.writeFileSync('db.json', updatedJsonData);
