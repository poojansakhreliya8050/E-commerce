import React from 'react'

const UpdateAddressPopUp = () => {
  return (
      {/* update your Address  */}
      {updateAddress ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto md:w-1/3">
              <div className="border-0 px-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Edit Address
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateAddress(false);
                      clearAddress();
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="relative px-6 pt-6 flex-auto space-x-4">
                  <form className="flex flex-col">
                    <label htmlFor="address">Address</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-location"></i>
                      </span>
                      <textarea
                        type="text"
                        id="address"
                        value={address}
                        onBlur={handleAddress}
                        onChange={handleAddress}
                        placeholder="Enter your address"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                      ></textarea>
                    </div>
                    <span className="text-red-500 text-sm">{addressError}</span>
                    <label htmlFor="city">City</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-map"></i>
                      </span>
                      <input
                        type="text"
                        value={city}
                        onBlur={handleCity}
                        onChange={handleCity}
                        id="city"
                        placeholder="Your city name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                      />
                    </div>
                    <span className="text-red-500 text-sm">{cityError}</span>
                    <label htmlFor="state">state</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-map"></i>
                      </span>
                      <input
                        type="text"
                        value={state}
                        id="state"
                        placeholder="Your state name"
                        onBlur={handleState}
                        onChange={handleState}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                      />
                    </div>
                    <span className="text-red-500 text-sm">{stateError}</span>
                    <label htmlFor="pincode">Pincode</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-location"></i>
                      </span>
                      <input
                        type="text"
                        value={pincode}
                        onBlur={handlePincode}
                        onChange={handlePincode}
                        placeholder="Enter picode"
                        id="pincode"
                        maxLength={6}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                      />
                    </div>
                    <span className="text-red-500 text-sm">{pincodeError}</span>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    type="button"
                    disabled={isValid}
                    className={`${
                      isValid ? "bg-black" : "hover:bg-white hover:text-black"
                    } w-full bg-black text-white p-2 rounded-lg hover:border duration-200 border border-gray-300`}
                    onClick={(e) => {
                      setUpdateAddress(false);
                      handelChangeAddress(e);
                      clearAddress();
                    }}
                  >
                    {isValidLoading ? <p>loading...</p> : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

  )
}

export default UpdateAddressPopUp