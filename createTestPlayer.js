const PlayFab = require("playfab-sdk");
const PlayFabClient = PlayFab.PlayFabClient; // Add this line

PlayFab.settings.titleId = "146A6B"; // Your Title ID

PlayFabClient.LoginWithCustomID({
  TitleId: PlayFab.settings.titleId,
  CustomId: "test_player_1",
  CreateAccount: true
}, (err, result) => {
  if (err) {
    console.log("Error creating test player:", err);
  } else {
    console.log("Test player created!");
    console.log("PlayFabId:", result.data.PlayFabId);
  }
});