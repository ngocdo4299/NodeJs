// "Note: All code must be used ES6

// 1. Reverse this string ""lairotuT SJedoN""
let str = "lairotuT SJedoN";
var reverseStr = (string) => {
  string = [...string].reverse().join("");
  console.log(string);
};
reverseStr(str);

// 2. const actors = [{ firstName: ""Robert"", lastName: ""Downey .JR"" }, { firstName: ""Json"", lastName: ""Statham"" }]. From actors array, return new array with format [{ fullName: String }], fullName is firstName + lastName
const actors = [
  { firstName: "Robert", lastName: "Downey .JR" },
  { firstName: "Json", lastName: "Statham" },
];
// let actorsFullname = actors.map(element => {
//     return {fullname: element.firstName+" "+element.lastName}
// });
// console.log(actorsFullname);
let actorsFullname = [];
for (var actor of actors) {
  actorsFullname.push({ fullname: actor.firstName + " " + actor.lastName });
}
console.log(actorsFullname);

// 3. Count number of item ?? which item

// 4. const numbers = [1,2,3,4,5], Calculate total of all numbers in array
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.reduce((a, b) => a + b, 0));

// 1. Install 'fs-extra' module
// npm install --save fs-extra

// 2. Import module 'fs-extra', use this module to write a text file
const fs = require("fs-extra");
fs.writeFile(
  "fs-example.txt",
  "Hello Word! This is a test file for callback, promise, async/await in NodeJs"
);

// 3. Read this file's content by 3 ways: Callback, Promise and Async/Await
const filePath = "fs-example.txt";

//callback
function readFileCallback(err, data) {
  if (err) console.log(err);
  console.log("Read file with callback - Data of file: ", data);
}
if (fs.existsSync(filePath)) {
  fs.readFile(filePath,"utf8",readFileCallback);
}

//Promise
const readFilePromise = (fileName, type) =>
  new Promise((resolve, reject) =>
    fs.readFile(fileName, type, (err, data) => {
      //if has error reject, otherwise resolve
      return err ? reject(err) : resolve(data);
    })
  );
readFilePromise(filePath, "utf8")
  .then((data) => console.log("Read file with promise - Data of file: ", data))
  .catch((error) => console.log("Error: ", error));

//Async/Await
const readFileAsync = async (filePath,type) => {
  try {
    const data = await fs.promises.readFile(filePath, type);
    console.log("Read file with Async Await - Data of file: ", data)
    return data;
  } catch (err) {
    console.log(err);
  }
};
readFileAsync(filePath,"utf8")
