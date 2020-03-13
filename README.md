# <b> ADVENTUM </b>
An activity suggestion app built to make hanging out with friends less about spending forever deciding where to go or what to do, and more about exploring new locations and making more memories together :)

# Building and Running from the Commandlin

1. Clone the repository
2. Install any necessary libraries (`npm install`)
3. Start up the app! `npm start`

# Directory Structure

All source files can be found in: `teamB4/src/`

### Landing Page (`Landing.*`)
Landing Page. Opened on app startup, prompts users to either: 1) Log In 2) Sign Up.

### Login/Signup Page (`Login.*`)
Routed from the landing page. Allows users to log into a previously created account, or create a new account.

### Profile Page (`Profile.*`)
[PREREQUESITE: MUST BE LOGGED IN]
Users can view and change their activity preferences.

### Session Page (`Preference.*`, `Home.*`, `Card.*`)
Starts an activity suggestion session. User can add other user profiles and modify their activity preferences as appropriate.

### Routing Home (`App.*`)
Contains information for routing between the different pages of our app.

### Suggestion Page (`SuggestionSkeleton.*)
Displays results of query after accounting for everyone's selected preferences.
