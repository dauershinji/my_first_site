let input = 'x||y||z||w'

// Строка -> массив
function to_array(str){
    return Array.from(str)
}

// Массив элементов -> массив переменных
function variable(array) {
    const alp = ['!', '>', '&', '|']
    let elements = []
    for (const element of array) {
        if (alp.indexOf(element) === -1) {
            elements.push(element)
        }
    }
    return elements
}

const array = to_array(input)
const columns = variable(array)
console.log(columns)

// Создание хещ-таблицы нужных элементов
function to_ht(elements) {
    const ht = {

    }
}

function make_truth_table(array) {
    let truth_table = {
        'False': [],
        'True': []
    }
    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
            for (let z = 0; z < 2; z++) {
                for (let w = 0; w < 2, w++) {

                }
            }
        }
    }
}