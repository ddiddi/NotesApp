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
        this.googleProvider = new app.auth.GoogleAuthProvider();

    }

    // createUser
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    // get authUser based on email and pass
    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    // createNote also used for editing
    doCreateNote = (email, title, note, last_modified) =>
    this.db.ref(`notes/${email}/${title}`).set({
        email: email,
        title: title,
        note: note,
        last_modified: last_modified
    });

    // deleteNote
    doRemoveNote = (email, title, note, last_modified) =>
    this.db.ref(`notes/${email}/${title}`).set(null);
    // *** User API ***
 
    //getUser
    user = uid => this.db.ref(`users/${uid}`);
    
    // getUsers
    users = () => this.db.ref('users');
    // getNotes
    notes = email => this.db.ref(`notes/${email}`);
    
    // getNote
    note = (email, title) => this.db.ref(`notes/${email}/${title}`);
}

export default Firebase;
