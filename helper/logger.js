import fs, { read } from 'fs'

let day = new Date
let fileName = `../logs/${day.getDate()}-${day.getMonth()}-${day.getFullYear()}.txt`

const writeFile = (data) => {
    const message = {
        "log": data.toString(),
        "timestamp": day.toLocaleTimeString()
    }
    fs.writeFile(fileName,`${JSON.stringify(message)}\n`,{'flag':'a'}, (err) => {
        if (err) throw err;
    });
}
export const logger = async (data) => {
    fs.open(fileName, 'r', (err, fd) => {
        if (err) {
            fs.writeFile(fileName, '', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    writeFile(data)
                }
            });
        } else {
            writeFile(data)
        }
    });
}

export const readFile = () => {
    fs.readFile(fileName, 'utf8', function (err, content) {
        if (err) throw err;
        console.log(content)
    });
}
readFile()