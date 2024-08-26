import { initializeApp } from "firebase/app"
import { getFireStore, collection, getDocs, getDoc } from "firebase/firestore/lite"
import { useAsyncError } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyD0qYjuiS6NgTxMXGr3kcwBM-2YskCqDgQ",
  authDomain: "vanlife-49909.firebaseapp.com",
  projectId: "vanlife-49909",
  storageBucket: "vanlife-49909.appspot.com",
  messagingSenderId: "807747374475",
  appId: "1:807747374475:web:74ebe362dfcf23110cb38e"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = (db, "vans", id)
    const snapshot = await getDoc(docRef)
}

// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}