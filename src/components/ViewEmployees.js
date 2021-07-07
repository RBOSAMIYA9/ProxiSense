import React, { useEffect, useState } from 'react'
import EmployeeCard from './EmployeeCard'
import { projectFirestore } from '../firebase/firebaseConfig'
import { Center, Spinner } from '@chakra-ui/react'


function ViewEmployees() {
    const [employeeList, setEmployeeList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        const collectionRef = projectFirestore.collection("employeeData");
        collectionRef.onSnapshot((snapshot) => {
            var data = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
            console.log("empLoyeedata", data)
            setEmployeeList(data)
            setLoading(false)
        })
    }, [])
    return (
        <>

            {loading ?
                <Center>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Center>
                : (<>
                    <>

                        {employeeList && employeeList.map((employee) => (
                            <EmployeeCard key={employee.id} data={employee} />
                        ))}

                    </>

                </>)}

        </>
    )
}

export default ViewEmployees
