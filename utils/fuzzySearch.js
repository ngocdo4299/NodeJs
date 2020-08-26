const searchScore = (text, search) => {
    text = text.toLowerCase();
    search = search.toLowerCase();
    let score = 0;
    let foundChar = []
    let foundPosition = 0
    for (let i = 0; i < search.length; i++) {
        let scoreChar = 0
        for (let j = foundPosition; j < text.length; j++) {
            if (search.charAt(i) == text.charAt(j)) {
                foundPosition = j
                foundChar.push(search.charAt(i))
                break;
            }
            else {
                scoreChar++
            }
        }
        score += scoreChar
    }
    if (foundChar.join('') == search)
        return score
    else
        return -1

}

const splitChunk = (array, limit, page) =>{
    const start = (page-1) * limit
    const end = page * limit
    return array.slice(start, end)
}


export const searchInList = (stringSearch, list, properties, limit, page) => {

    const prop = properties.toString()
    for (let i = 0; i < list.length; i++) {
        list[i].evaluationSearch = searchScore(list[i][prop], stringSearch)
    }
    list = list.filter(e=>{
        return e.evaluationSearch !== -1
    }).sort((a, b) => a.evaluationSearch - b.evaluationSearch);

    return splitChunk(list, limit, page)
}

// const texts = [{ 'id': 1, 'username': 'Do Thi Minh Ngoc' }, { 'id': 2, 'username': 'Do Thi Phuong Thao' }, { 'id': 3, 'username': 'Do Sy Tien' }, { 'id': 4, 'username': 'Nguyen Thi Nga' }, { 'id': 5, 'username': 'Tien Nguyen' }]
// const search = 'Do'
// console.log(searchInList(search, texts, 'username', 2, 1))

