// import { db } from "../../src/firebase";

const db = import("../../src/firebase").then((mod) => mod.db);

// export const usersRef = db.collection("users");
export const usersRef = db.then((db) => {
	db.collection("users");
});
