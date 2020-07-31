import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCWFtAXXzfr9_uhMuJ2BasLSXgacJMAzQc",
    authDomain: "nurse-notes-f7d4e.firebaseapp.com",
    databaseURL: "https://nurse-notes-f7d4e.firebaseio.com",
    projectId: "nurse-notes-f7d4e",
    storageBucket: "nurse-notes-f7d4e.appspot.com",
    messagingSenderId: "113052479383",
    appId: "1:113052479383:web:fc3b77ec8411f5206d1ed2",
    measurementId: "G-XRP4J2PW32"
  };

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    doCreateNote = (email, title, note, last_modified) =>
    this.db.ref(`notes/${email}/${last_modified}`).set({
        title: title,
        note: note,
        last_modified: last_modified
    });

    doRemoveNote = (email, title, note, last_modified) =>
    this.db.ref(`notes/${email}/${last_modified}`).set(null);
    // *** User API ***
 
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
    notes = email => this.db.ref(`notes/${email}`);
}

export default Firebase;
