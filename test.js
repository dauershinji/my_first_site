let input = '(x||y)&&z||w'

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

/**
 *
 * @param string - логическое выражение
 * @returns {{True: *[], False: *[]}} - таблица истинности
 */
function make_truth_table(string) {
    const array = variable(string)
    const save = string
    let truth_table = {
        'True': [],
        'False': []
    }
    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
            for (let z = 0; z < 2; z++) {
                for (let w = 0; w < 2; w++) {
                    string = save
                    string = string.replaceAll(array[0],x.toString())
                    string = string.replaceAll(array[1],y.toString())
                    string = string.replaceAll(array[2],z.toString())
                    string = string.replaceAll(array[3],w.toString())
                    let expression = eval(string)
                    if (expression === 1) {
                        let changes = truth_table['True']
                        changes.push([x,y,z,w])
                        truth_table['True'] = changes
                    }
                    else {
                        let changes = truth_table['False']
                        changes.push([x,y,z,w])
                        truth_table['False'] = changes
                    }
                }
            }
        }
    }
    return truth_table
}

console.log(make_truth_table(input))