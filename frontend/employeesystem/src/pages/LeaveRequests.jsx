import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";


function LeaveRequests() {

    const[leaveRequests,setLeaveRequests]=useState([]);
    useEffect(()=>{
        const fetchLeaveRequests=async ()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/leaveRequests');
                console.log(response.data)
                setLeaveRequests(response.data);
            }catch(error){
                console.error("error fetching data",error)
            }
        };
        fetchLeaveRequests()
    },[])

    return (
        <div>

            <Navbar/>
            <div className="pt-20 p-4">
                {leaveRequests.length===0?(
                    <p>no requests to display</p>
                ):(
                    <ul>
                        {leaveRequests.map(leaveRequest=>(
                            <li key={leaveRequest.request_id}>
                                {leaveRequest.start_date}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default LeaveRequests;