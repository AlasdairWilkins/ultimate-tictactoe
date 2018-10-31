const { X, O } = require('./constants')
const checker = require('./checker')

module.exports = class Game {
    constructor(id, board, validSubGames) {
        this.id = id
        this.board = board
        this.winner = ''
        this.isXturn = true
        this.validSubgames = validSubGames
        this.subgameWinners = ["", "", "", "", "", "", "", "", ""]
    }

    setResponse() {
        return {
            id: this.id,
            board: this.board,
            winner: this.winner,
            turn: (this.isXturn) ? X: O,
            valid_subgames: this.validSubgames
        }
    }

    insert(subgame, cell) {
        let move = (this.isXturn) ? X : O
        this.board[subgame][cell] = move

        if (checker.win(this.board[subgame], move)) {
            this.subgameWinners[subgame] = move
        }

    }

    getError(subgame, cell) {

        if (subgame < 0 || 8 < subgame || cell < 0 || 8 < cell) {
            return "Invalid parameters"
        }

        if (this.winner) {
            return "Game is over"
        }

        if (this.board[subgame][cell]) {
            return "Cell occupied"
        }

        if (this.validSubgames.indexOf(subgame) == -1) {
            return "Invalid move"
        }

        return false
    }

    isWinner() {
        let move = (this.isXturn) ? X : O
        return checker.win(this.subgameWinners, move)
    }

    getValidSubgames(cell) {

        if (!this.subgameWinners[cell]) {
            return [cell]
        }

        let validSubgames = []

        for (let i = 0; i < this.subgameWinners.length; i++) {
            if (!this.subgameWinners[i]) {
                validSubgames.push(i)
            }
        }

        return validSubgames

    }
}