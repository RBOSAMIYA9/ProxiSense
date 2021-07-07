import { projectFirestore, timeStamp } from './firebaseConfig'

const addEmployee = (data) => {

    // console.log(data)
    // console.log(data.dp)
    return new Promise((resolve, reject) => {
        const collectionRef = projectFirestore.collection("employeeData");
        var newData = {
            ...data,
            updatedAt: timeStamp(),

        }
        console.log("new data", newData)
        collectionRef.add(newData).then((ack) => {
            resolve("dataAdded successfully");
            console.log("data added", ack);

        }).catch((e) => {
            console.log("error while adding data", e);
            reject("error in adding data");
        })
    })

}

// const getAllHospitals = () => {

//     return new Promise((resolve, reject) => {
//         const collectionRef = projectFirestore.collection("hospitalData");
//         collectionRef.onSnapshot((snapshot) => {
//             if (snapshot.docs.length > 0) {
//                 var data = snapshot.docs.map((doc) => (
//                     {
//                         id: doc.id,
//                         data: doc.data()
//                     }
//                 ))
//                 // console.log("data in ", data);
//                 resolve(data);

//             }
//             else
//                 reject("no data found")

//         })
//     })
// }

const getEmployeeById = (id) => {
    console.log("id in get employee", id);
    return new Promise((resolve, reject) => {
        const collectionRef = projectFirestore.collection("employeeData");
        collectionRef.doc(id).get().then((snapshot) => {
            // console.log("snapshot.docs", snapshot)
            if (snapshot.exists) {
                // console.log("snapshot.docs ", snapshot.data())
                const employeeData = {
                    id: snapshot.id,
                    data: snapshot.data()
                }
                // console.log("data in ", employeeData);
                resolve(employeeData);
                

            } else
                reject("no data found")

        })

    })
}


const updateById = (id, data) => {
    return new Promise((resolve, reject) => {
        const collectionRef = projectFirestore.collection("employeeData");
        collectionRef.doc(id).update({ ...data, updatedAt: timeStamp() }).then(
            resolve("updated")
        ).catch((e) => reject("failed to update"))
    })
}

const deleteEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        console.log("id in delete", id);
        const collectionRef = projectFirestore.collection("employeeData");
        collectionRef.doc(id).delete().then(() => {
            console.log("deleted the employee");
            resolve("deleted")
        }).catch((e) => reject("failed to delete"))
    })
}

export { addEmployee, getEmployeeById, updateById, deleteEmployeeById }