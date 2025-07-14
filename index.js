const http = require('http');
const express = require('express');
const colyseus = require('colyseus');
const monitor = require("@colyseus/monitor").monitor;
const path = require('path');
const { submitScore, getLeaderboard } = require('./playfab');
//const socialRoutes = require("@colyseus/social/express").default;

const outdoor = require('./room/public').outdoor;

const port = Number(process.env.PORT || 2567);
const app = express()

const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

// register your room handlers
gameServer.register('outdoor', outdoor);

/* register @colyseus/social routes
app.use("/", socialRoutes);*/

app.use("/", express.static(path.join(__dirname, "./../client/public")));

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor(gameServer));

// --- Add this block below ---
app.get('/api/leaderboard', (req, res) => {
    getLeaderboard((err, leaderboard) => {
        if (err) return res.status(500).json({ error: "Failed to fetch leaderboard" });
        res.json(leaderboard.map(entry => ({
            PlayFabId: entry.PlayFabId,
            score: entry.StatValue,
            name: entry.DisplayName || entry.PlayFabId
        })));
    });
});

app.post('/api/submit-score', (req, res) => {
    const { playerId, score } = req.body;
    submitScore(playerId, score, (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to submit score" });
        res.json({ success: true });
    });
});


gameServer.listen(port,"0.0.0.0");
console.log(`Listening on ws://localhost:${ port }`)

// Fetch the leaderboard
getLeaderboard((err, leaderboard) => {
  if (err) console.log("Error fetching leaderboard:", err);
  else console.log("Leaderboard:", leaderboard);
});
