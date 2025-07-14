const PlayFab = require("playfab-sdk");
const PlayFabServer = PlayFab.PlayFabServer;
PlayFab.settings.titleId = "146A6B";
PlayFab.settings.developerSecretKey = "1X81A66SGCEIEPKK9S5QZCNDSYD6SNFQND5ISBFPRXGQJF1ZH3";

// Submit a score for a player
function submitScore(playFabId, score, callback) {
  PlayFabServer.UpdatePlayerStatistics({
    PlayFabId: playFabId,
    Statistics: [{ StatisticName: "HighScore", Value: score }]
  }, (err, result) => {
    callback(err, result);
  });
}

// Get the top 10 leaderboard
function getLeaderboard(callback) {
  PlayFabServer.GetLeaderboard({
    StatisticName: "HighScore",
    StartPosition: 0,
    MaxResultsCount: 10
  }, (err, result) => {
    if (err) callback(err, null);
    else callback(null, result.data.Leaderboard);
  });
}

module.exports = { submitScore, getLeaderboard };