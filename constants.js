const game = '/game'
const move = '/move'
const errorStatus = 200
const X = 'X'
const O = 'O'

const initialBoard =
    [
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
    ]

const initialValidSubgames = [0, 1, 2, 3, 4, 5, 6, 7, 8]

module.exports = { game, move, errorStatus, X, O, initialBoard, initialValidSubgames }


