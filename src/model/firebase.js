import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/storage';

import {firebaseConfig} from "../firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;
export const firebaseFunctions = firebase.functions;
export const firebaseFirestore = firebase.firestore;
export const firebaseStorage = firebase.storage;
