import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAeQ0QUQRqOwvqPtz2arXg0OxJmbBjuTmU",
  authDomain: "practica02-0-erick.firebaseapp.com",
  projectId: "practica02-0-erick",
  storageBucket: "practica02-0-erick.firebasestorage.app",
  messagingSenderId: "1025823797412",
  appId: "1:1025823797412:web:451fd0447cd419315bb631"
};

async function conectar() {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    throw new Error('Completa firebaseConfig en src/app/firebase.config.ts.');
  }
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  await auth.authStateReady();
  if (!auth.currentUser) await signInAnonymously(auth);
  return getFirestore(app);
}

let conexion: ReturnType<typeof conectar> | undefined;
export function obtenerFirestore() {
  return conexion ??= conectar().catch(error => {
    conexion = undefined;
    throw error;
  });
}
