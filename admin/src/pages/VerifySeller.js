import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const VerifySeller = () => {
    const { status } = useParams()
    const [seller, setSeller] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (status === 'pending')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/seller/fetchAllPendingSeller`)
                else if (status === 'approved')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/seller/fetchAllApprovedSeller`)
                else if (status === 'rejected')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/seller/fetchAllRejectedSeller`)
                setSeller(response.data)
                console.log(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData()


    }, [status])

    return (
        <div>
            VerifySeller {status}
        </div>
    )
}

export default VerifySeller