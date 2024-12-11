import React from 'react';
import '../styles/tailwind.css'

function Dashboard() {
    return (

        <div className="text-center mt-10">
            <h1 className="text-4xl font-bold text-blue-500">Hello Tailwind!</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                Test Button
            </button>
        </div>
    );
}

export default Dashboard;