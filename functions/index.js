const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");

// const CONFIG_CLIENT_ID = functions.config().googleapi.client_id;
// const CONFIG_CLIENT_SECRET = functions.config().googleapi.client_secret;
// const CONFIG_SHEET_ID = functions.config().googleapi.sheet_id;

const CONFIG_CLIENT_ID =
  "1059825985046-670uhcvq5ekf6l0t4jtb4eipnng9trcu.apps.googleusercontent.com";
const CONFIG_CLIENT_SECRET = "ZG_VxbAjI-tOmZy86FSNQAvP";
// this sheet is shared already with cedpoilly
const CONFIG_SHEET_ID = "1uu2Bx1CUJHRxS6h4T7Jqy_4ZyYCE8f-IEwtw-iG84vs"; // "1O26vlZgdiuTeTW01H2tgpjDCF8bJJXEmbN1YUWXhO98";

const FUNCTIONS_REDIRECT = `https://us-central1-${
  process.env.GCLOUD_PROJECT
}.cloudfunctions.net/oauthcallback`;

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const functionsOauthClient = new OAuth2Client(
  CONFIG_CLIENT_ID ||
    "1059825985046-670uhcvq5ekf6l0t4jtb4eipnng9trcu.apps.googleusercontent.com",
  CONFIG_CLIENT_SECRET || "ZG_VxbAjI-tOmZy86FSNQAvP",
  FUNCTIONS_REDIRECT
);

let oauthTokens = null;

exports.authgoogleapi = functions.https.onRequest((req, res) => {
  res.set("Cache-Control", "private, max-age=0, s-maxage=0");
  res.redirect(
    functionsOauthClient.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent"
    })
  );
});

const DB_TOKEN_PATH = "/api_tokens";

exports.oauthcallback = functions.https.onRequest(async (req, res) => {
  res.set("Cache-Control", "private, max-age=0, s-maxage=0");
  const code = req.query.code;
  try {
    const { tokens } = await functionsOauthClient.getToken(code);
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    await admin
      .database()
      .ref(DB_TOKEN_PATH)
      .set(tokens);
    return res
      .status(200)
      .send(
        "App successfully configured with new Credentials. " +
          "You can now close this page."
      );
  } catch (error) {
    return res.status(400).send(error);
  }
});

exports.getSheetData = functions.https.onRequest((req, res) => {
  const sheets = google.sheets("v4");

  const request = { spreadsheetId: CONFIG_SHEET_ID, range: ["A:Z"] };

  return getAuthorizedClient()
    .then(client => {
      request.auth = client;
      console.log("----------- FETCHING SHEET DATA -----------");

      return sheets.spreadsheets.values
        .get(request)
        .then(response => {
          console.log("----------- ", response.data, " -----------");
          // return response.data;
          return res.status(200).send(response.data);
        })
        .catch(error => {
          console.log(`The API returned an error: ${error}`);
          throw new Error(error);
        });
    })
    .catch(error => {
      console.log(`Failed to get Authrorized Client: ${error}`);
      throw new Error(error);
    });
});

// HELPER
async function getAuthorizedClient() {
  if (oauthTokens) {
    return functionsOauthClient;
  }

  console.log("----------- FETCHING CLIENT AUTH DATA -----------");

  const snapshot = await admin
    .database()
    .ref(DB_TOKEN_PATH)
    .once("value");

  console.log("----------- DONE FETCHING CLIENT AUTH DATA -----------");

  oauthTokens = snapshot.val();
  console.log("----------- ", oauthTokens, " -----------");
  functionsOauthClient.setCredentials(oauthTokens);
  return functionsOauthClient;
}
