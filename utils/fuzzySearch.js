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
        // return [score, foundChar]
    else
        return -1

}

export const searchInList = (stringSearch, list, properties) => {
    // console.log(stringSearch, list, properties)
    const prop = properties.toString()
    for (let i = 0; i < list.length; i++) {
        list[i].evaluationSearch = searchScore(list[i][prop], stringSearch)
    }
    return list
}

// const texts = [{ 'id': 1, 'username': 'Do Thi Minh Ngoc' }, { 'id': 2, 'username': 'Do Thi Phuong Thao' }, { 'id': 3, 'username': 'Do Sy Tien' }, { 'id': 4, 'username': 'Nguyen Thi Nga' }, { 'id': 5, 'username': 'Tien Nguyen' }]
// const search = 'Tien'
// searchInList(search, texts, 'username')

