import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBWOD0EHspAqtkZUBnTOb_8Ou0pDNYuhUU',
  authDomain: 'project-management-app-d5021.firebaseapp.com',
  projectId: 'project-management-app-d5021',
  storageBucket: 'project-management-app-d5021.appspot.com',
  messagingSenderId: '252789066081',
  appId: '1:252789066081:web:6ec04382c588a6a17b9d20',
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
