let input = 'x||y||z||w'

/**
 * @param string - логическое выражение
 * @returns {*[]} - переменные в логическом выражении
 */
function variable(string) {
    const alp = ['!', '&', '|']
    const array = Array.from(string)
    let elements = []
    for (const element of array) {
        if (alp.indexOf(element) === -1) {
            elements.push(element)
        }
    }
    return elements
}

function replace(arr_1, arr_2) {

}

/**
 *
 * @param string - логическое выражение
 * @returns {{True: *[], False: *[]}} - таблица истинности
 */
function make_truth_table(string) {
    const array = variable(string)
    let truth_table = {
        'False': [],
        'True': []
    }
    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
            for (let z = 0; z < 2; z++) {
                for (let w = 0; w < 2; w++) {
                    console.log(x,y,z,w)
                    string = string.replaceAll(array[0],x.toString())
                    string = string.replaceAll(array[1],y.toString())
                    string = string.replaceAll(array[2],z.toString())
                    string = string.replaceAll(array[3],w.toString())
                    console.log(string)
                }
            }
        }
    }
    return truth_table
}

make_truth_table(input, variable(input))