class Checker {

    hasAcross(board, move) {
        for (let i = 0; i < 9; i += 3) {
            if (board[i] === move && board[i+1] === move && board[i+2] === move) {
                return true
            }
        }
        return false
    }

    hasDown(board, move) {
        for (let i = 0; i < 3; i++) {
            if (board[i] === move && board[i+3] === move && board[i+6] === move) {
                return true
            }
        }
        return false
    }

    hasDiagonal(board, move) {
        if (board[5] === move) {
            if (board[0] === move && board[8] === move) {
                return true
            }
            if (board[2] === move && board[6] === move) {
                return true
            }
        }
        return false
    }

    win(board, move) {
        let moveCount = 0

        for (let i = 0; i < board.length; i++) {
            if (board[i] === move) {
                moveCount++
            }
        }

        if (moveCount < 3) {
            return false
        }

        if (this.hasAcross(board, move) ||
            this.hasDown(board, move) ||
            this.hasDiagonal(board, move)) {
            return true
        }

        return false

    }
}

module.exports = new Checker()