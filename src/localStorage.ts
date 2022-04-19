export function setStorageUserID(uid: string) {
  window.localStorage.setItem("uid", uid);
}

export function getStorageUserID() {
  return window.localStorage.getItem("uid");
}
