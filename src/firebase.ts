import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import config from "./firebaseConfig";
import { Item, ItemCheckTable } from "./types/Item";

export function initFirebase() {
  // Initialize Firebase
  initializeApp(config);
}

export async function getDataFromDatabase(uid: string) {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `users/${uid}`));
  if (snapshot.exists()) {
    const { items, itemCheckTable } = snapshot.val();

    const arrItems: Item[] = [];
    for (const key in items) {
      const i: Item = {
        id: key,
        content: items[key],
      };
      arrItems.push(i);
    }

    return [arrItems, itemCheckTable] as [Item[], ItemCheckTable];
  } else {
    return [null, null];
  }
}

export async function loginWithEmail(email: string, password: string) {
  const auth = getAuth();
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user.uid;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const { user } = await signInWithPopup(auth, provider);
  return user.uid;
}

export async function createUser(email: string, password: string) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
