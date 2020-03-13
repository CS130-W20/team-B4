const firebase = require("@firebase/testing");
const fs = require("fs");

/*
 * ============
 *    Setup
 * ============
 */
const projectId = "firestore-emulator-example";
const firebasePort = require("../firebase.json").emulators.firestore.port;
const port = firebasePort /** Exists? */ ? firebasePort : 8080;
const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const rules = fs.readFileSync("firestore.rules", "utf8");

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
function authedApp(auth) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}

/*
 * ============
 *  Test Cases
 * ============
 */
beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

before(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

describe("My app", () => {
  it("Verify that writing data works for logged-in user", async () => {
    const db = authedApp({uid:'Julia'});
    const profile = db.collection("users").doc("Julia");
    await firebase.assertSucceeds(profile.set({ first_name: "Juju" }));
  });

  it("Verify that writing data doesn't work for unauthorized users", async () => {
    const db = authedApp(null);
    const profile = db.collection("users").doc("Julia");
    await firebase.assertFails(profile.set({ first_name: "Julia"}));
  });

  it("Verify writing data doesn't work for one user modifying another user's data", async () => {
    const db = authedApp({uid:'Sam'});
    const profile = db.collection("users").doc("Julia");
    await firebase.assertSucceeds(profile.set({username:'juliab01', email:'j@gmail.com', first_name: "Julia" }));
    await firebase.assertFails(profile.set({ first_name: "Juju" }));
  });

  it("Verify cannot create a user without an username", async () => {
    const db = authedApp({uid:'Sam'});
    const profile = db.collection("users").doc("Julia");
    await firebase.assertFails(profile.set({email: 'j@gmail.com', first_name: "Julia" }));
  });

  it("Verify cannot create a user without an email", async () => {
    const db = authedApp({uid:'Sam'});
    const profile = db.collection("users").doc("Julia");
    await firebase.assertFails(profile.set({username: 'juliab01', first_name: "Julia" }));
  });

  it("Verify able to create user with all necessary information", async () => {
    const db = authedApp({uid:'Sam'});
    const profile = db.collection("users").doc("Julia");
    await firebase.assertSucceeds(profile.set({username:'juliab01', email:'j@gmail.com', first_name: "Julia" }));
  });
});
