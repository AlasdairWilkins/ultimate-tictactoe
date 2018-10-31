const testing = true
const testNum = 423

const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 3000;
const shortid = require('shortid');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const Server = require('./server');
const Game = require('./game');
const { game, move, errorStatus, X, O, initialBoard, initialValidSubgames } = require('./constants')

const server = new Server()

if (testing) {
    server.games[testNum] = new Game(testNum, initialBoard, initialValidSubgames)
}

http.listen(port, function() {
    console.log("Listening on port", port)
})




app.get(game, (req, res) => {

    let id = req.query.id

    if (server.games[id]) {
        res.send(server.games[id])
    } else {
        res.status(errorStatus).send({Error: 'Invalid id'})
    }
    console.log(req.query)
})

app.post(game, (req, res) => {
    let id = testing ?
        testNum : shortid.generate()
    server.games[id] = new Game(id, initialBoard, initialValidSubgames)
    res.send(server.games[id].setResponse())
})

app.post(move, (req, res) => {
    let id = req.body.id
    let subgame = parseInt(req.body.subgame, 10)
    let cell = parseInt(req.body.cell, 10)

    let error = server.games[id].getError(subgame, cell)

    if (error) {

        res.status(errorStatus).send({Error: error})

    } else {

        server.games[id].insert(subgame, cell)

        if (server.games[id].isWinner()) {
            server.games[id].winner = (server.games[id].isXturn) ? X : O
        } else {
            server.games[id].isXturn = !server.games[id].isXturn
            server.games[id].validSubgames = server.games[id].getValidSubgames(cell)
        }
        res.send(server.games[id].setResponse())
    }


})


