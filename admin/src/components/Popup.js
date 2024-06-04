// components/Popup.js
import React from 'react';

const Popup = ({ isOpen, setIsOpen, children}) => {
    if (!isOpen) return;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/2">

                <div className="p-4 ">
                    <button className="float-right text-gray-600 hover:text-gray-800 text-3xl" onClick={() => { setIsOpen(false) }}>
                        &times;
                    </button>
                </div>

                 {/* main part */}
                <div className="p-4 flex ">
                   {children}
                </div>



                <div className="p-4 border-t">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setIsOpen(false) }}>
                        Close
                    </button>
                </div>


            </div>
        </div>
    );
};

export default Popup;
