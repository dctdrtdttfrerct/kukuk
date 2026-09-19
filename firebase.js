const firebaseConfig = {
  apiKey: "AIzaSyAE0z2_4ylnhao9x9FZAXGQVqqCZPXUBNo",
  authDomain: "kuku-informacje.firebaseapp.com",
  projectId: "kuku-informacje",
  storageBucket: "kuku-informacje.appspot.com",
  messagingSenderId: "814044021410",
  appId: "1:814044021410:web:9cbe8772d011f2dbcd4dfb",
  measurementId: "G-HBY0JML1QL"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();
