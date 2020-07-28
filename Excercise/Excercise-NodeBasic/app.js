//Ex1
const str = "lairotuT SJedoN";
function reverseString(str) {
  return [...str].reverse().join("");
}
console.log(reverseString(str));

//Ex2
const actors = [
  { firstName: "Robert", lastName: "Downey .JR" },
  { firstName: "Json", lastName: "Statham" },
];
function getActorFullname(listActors) {
  return listActors.map((actor) => {
    return { fullname: actor.firstName + " " + actor.lastName };
  });
}
console.log(getActorFullname(actors));

//Ex3 
const items = [1, 2, 3, 4, 5, 6];
function countItemInItems(items) {
  return items.reduce((a, b) => b++, 0);
}
console.log(countItemInItems(items));

function sumIteminItems(items) {
  return items.reduce((a, b) => a + b, 0);
}
console.log(sumIteminItems(items));

//Ex4
const fs = require("fs-extra");
fs.writeFile(
  "fs-example.txt",
  "Hello Word! This is a test file for callback, promise, async/await in NodeJs"
);

//Ex5
const filePath = "fs-example.txt";
//callback
function readFileCallback(err, data) {
  if (err) console.log(err);
  console.log("Read file with callback - Data of file: ", data);
}
if (fs.existsSync(filePath)) {
  fs.readFile(filePath, "utf8", readFileCallback);
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
const readFileAsync = async (filePath, type) => {
  try {
    const data = await fs.promises.readFile(filePath, type);
    console.log("Read file with Async Await - Data of file: ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
readFileAsync(filePath, "utf8");
