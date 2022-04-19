import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";
import config from "./firebaseConfig";
import { Item, ItemCheckTable } from "./types/Item";

export function initFirebase() {
  // Initialize Firebase
  initializeApp(config);
}

export async function getDataFromDb(uid: string) {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `users/${uid}`));
  if (snapshot.exists()) {
    console.log("get from database");
    const { items, itemCheckTable } = snapshot.val();
    return [items, itemCheckTable] as [Item[], ItemCheckTable];
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
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user.uid;
}

export function updateDbItems(uid: string, items: Item[]) {
  console.log("update db items");
  const db = getDatabase();
  set(ref(db, "users/" + uid + "/items"), {
    ...items,
  });
}

export function updateDbItemCheckTable(
  uid: string,
  itemCheckTable: ItemCheckTable
) {
  console.log("update db table");
  const db = getDatabase();
  set(ref(db, "users/" + uid + "/itemCheckTable"), itemCheckTable);
}
