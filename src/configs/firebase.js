const { initializeApp, applicationDefault } = require("firebase-admin/app");

// const { credential } = require("firebase-admin");

const firebase = initializeApp({
  credential: applicationDefault()
});

module.exports = firebase;