import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../redux/user/userSlice";
import swal from "sweetalert";
import { useEffect } from "react";
import { toast } from "react-toastify";
import BrandInfo from "../components/BrandInfo";
import BankInfo from "../components/BankInfo";
import PanInfo from "../components/PanInfo";
const VerifySeller = () => {
  const [brandInfo, setBrandInfo] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);
  const [panInfo, setPanInfo] = useState(null);


  const [tabOpen, setTabOpen] = useState(1);
  const [loading, setLoading] = useState(false);

  const owner = useSelector((state) => state.userData.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // async function handleUpload(e) {
  //   e.preventDefault();
  //   const id = toast.loading(`Processing your request\n,Please wait...`);
  //   const formData = new FormData();

  //   // const address = {
  //   //   street: restaurantAddress,
  //   //   area: area,
  //   //   state: state,
  //   //   city: city,
  //   //   pincode: pincode,
  //   // };

  //   const bankDetails = {
  //     ACnumber: bankNpan?.accountno,
  //     IFSC: bankNpan?.ifsc,
  //     actype: bankNpan?.acType,
  //   };

  //   const pancardDetail = {
  //     holderName: bankNpan.panholdername,
  //     number: bankNpan.panno,
  //   };

  //   formData.append("bank", bankDetailsPhoto);
  //   formData.append("pancard", pancardPhoto);
  //   // formData.append("address", JSON.stringify(address));
  //   // formData.append("name", restaurantName);
  //   // formData.append("ownerName", ownerName);
  //   formData.append("bg1", bg1);
  //   formData.append("bg2", bg2);
  //   formData.append("bg3", bg3);
  //   formData.append("bankDetails", JSON.stringify(bankDetails));
  //   formData.append("panCard", JSON.stringify(pancardDetail));
  //   formData.append("id", owner._id);
  //   console.log("=====formData", formData);
  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       "http://localhost:4000/resturant/add",
  //       formData
  //     );
  //     console.log(res);
  //     setLoading(false);
  //     navigate("/");
  //     toast.update(id, {
  //       render: "Request created successfully👌",
  //       type: "default",
  //       isLoading: false,
  //       autoClose: 2000,
  //       closeOnClick: true,
  //       draggable: true,
  //       pauseOnHover: false,
  //     });
  //     toast.dismiss(id);
  //     dispatch(userData(res.data.response));
  //     localStorage.setItem("ownerData", JSON.stringify(res?.data?.response));
  //     swal("Registration successfully", "", "success");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const handleLogOut = () => {
  //   swal({
  //     title: "Are you Sure! you want to go back?",
  //     icon: "warning",
  //     buttons: ["NO", "YES"],
  //     cancelButtonColor: "#DD6B55",
  //     confirmButtonColor: "#DD6B55",
  //     dangerMode: true,
  //   }).then(async (willDelete) => {
  //     if (willDelete) {
  //       navigate("/");
  //     }
  //   });
  // };

  return (
    <div className="pt-24">
      <div className="mx-2 md:mx-10 flex flex-wrap">
        <div className="w-full sm:w-[25%] p-5">
          <ul className="space-y-3">
            <li
              className={`text-lg ${true
                ? "border-blue-800 border-2"
                : "bg-black border-slate-200 border-2"
                } font-mono font-semibold text-blue-800 pl-5 py-2  rounded-3xl hover:pl-8 duration-300`}
            >
              Brand information
            </li>

            <li className="bg-black h-1 w-full rounded-full"></li>
            <li
              className={`text-base ${tabOpen == 1
                ? "border-slate-700 border-2"
                : "bg-slate-200 border-slate-200 border-2"
                } font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
              onClick={() => setTabOpen(1)}
            >
              Brand Details
            </li>

            <li
              className={`text-base ${tabOpen == 2
                ? "border-slate-700 border-2"
                : "bg-slate-200 border-slate-200 border-2"
                } font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
              onClick={() => setTabOpen(2)}
            >
              Bank Details
            </li>


            <li
              className={`text-base ${tabOpen == 3
                ? "border-slate-700 border-2"
                : "bg-slate-200 border-slate-200 border-2"
                } font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
              onClick={() => setTabOpen(3)}
            >
              Pan Details
            </li>
            <li
              className={`text-base ${"bg-slate-200 border-slate-200 border-2"} font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
            // onClick={handleLogOut}
            >
              Cancel
            </li>
          </ul>
        </div>

        {/* Restaurant information  */}
        {tabOpen === 1 && (
          <BrandInfo setTabOpen={setTabOpen} brandInfo={brandInfo} setBrandInfo={setBrandInfo} />
        )}

        {/* Bank details  */}
        {tabOpen === 2 && (
          <div className="w-full sm:w-3/4">
            <BankInfo setTabOpen={setTabOpen} bankInfo={bankInfo} setBankInfo={setBankInfo}/>
          </div>
        )}

        {/* pan details */}
        {tabOpen === 3 && (
          <div className="w-full sm:w-3/4">
            <PanInfo setTabOpen={setTabOpen} panInfo={panInfo} setPanInfo={setPanInfo} />
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifySeller;
