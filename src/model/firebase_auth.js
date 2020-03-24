import { firebaseAuth } from './firebase';

// Used to logout from firebase
// Returns a Promise
export const logout = () => firebaseAuth().signOut();

// Sign in a User using email and password
// Returns a Promise
export async function login (email, password) {
  return firebaseAuth().setPersistence(firebaseAuth.Auth.Persistence.LOCAL).then(() => firebaseAuth().signInWithEmailAndPassword(email, password));
}

// Sign in a User using email and password
// Returns a Promise
export const getCredential = (email, password) => firebaseAuth.EmailAuthProvider.credential(email, password);

// Register a User using email and password
// Returns a Promise
export async function register (email, password) {
  return firebaseAuth().setPersistence(firebaseAuth.Auth.Persistence.LOCAL).then(() => firebaseAuth().createUserWithEmailAndPassword(email, password));
}

// Restet a users Password
// Returns a Promise
export const resetPassword = email => firebaseAuth().sendPasswordResetEmail(email);

// Returns a js Object or null
export const getCurrentUser = () => firebaseAuth().currentUser;