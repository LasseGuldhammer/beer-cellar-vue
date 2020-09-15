import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyAMQkJlICynYbm6QGhj60T6Eb_ouDsfKqU',
  authDomain: 'beer-cellar-0.firebaseapp.com',
  databaseURL: 'https://beer-cellar-0.firebaseio.com',
  projectId: 'beer-cellar-0',
  storageBucket: 'beer-cellar-0.appspot.com',
  messagingSenderId: '439010677013',
  appId: '1:439010677013:web:e1ed799c404de8741d991c'
}

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
