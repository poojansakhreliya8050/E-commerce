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

  const [brandImage, setBrandImage] = useState(null);
  const [bankImage, setBankImage] = useState(null);
  const [panImage, setPanImage] = useState(null);




  const [tabOpen, setTabOpen] = useState(1);
  const [loading, setLoading] = useState(false);

  const seller = useSelector((state) => state.userData.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleUpload() {
    try {
      // console.log("=====brandInfo", brandInfo);
      // console.log("=====bankInfo", bankInfo);
      // console.log("=====panInfo", panInfo);
      // console.log("=====brandImage", brandImage);
      // console.log("=====bankImage", bankImage);
      // console.log("=====panImage", panImage);

      if(seller==null || brandInfo==null || bankInfo==null || panInfo==null || brandImage==null || bankImage==null || panImage==null)
      {
        alert("Please fill all the details");
        return;
        }
    
      const formData = new FormData();
      
      formData.append("userId", seller._id);
      formData.append("userId", "65f47716c1f778c761717e1b");
      formData.append("accountNumber", bankInfo.accountno);
      formData.append("ifscCode", bankInfo.ifscCode);
      formData.append("accountType", bankInfo.accountType);
      formData.append("panNumber", panInfo.panNumber);
      formData.append("holderName", panInfo.holderName);
      formData.append("streetName", brandInfo.streetName);
      formData.append("area", brandInfo.area);
      formData.append("city", brandInfo.city);
      formData.append("state", brandInfo.state);
      formData.append("pincode", brandInfo.pincode);
      formData.append("brandName", brandInfo.brandName);
      formData.append("brandOwnerName", brandInfo.brandOwnerName);
      formData.append("brandImage", brandImage);
      formData.append("bankImage", bankImage);
      formData.append("panImage", panImage);
      console.log("=====formData", formData);

      const response = await axios.post(`${process.env.REACT_APP_URL}/api/v1/seller/addSellerDetails`, formData);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

 

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
          <BrandInfo setTabOpen={setTabOpen} brandInfo={brandInfo} setBrandInfo={setBrandInfo} brandImage={brandImage} setBrandImage={setBrandImage} />
        )}

        {/* Bank details  */}
        {tabOpen === 2 && (
          <div className="w-full sm:w-3/4">
            <BankInfo setTabOpen={setTabOpen} bankInfo={bankInfo} setBankInfo={setBankInfo} setBankImage={setBankImage} bankImage={bankImage}/>
          </div>
        )}

        {/* pan details */}
        {tabOpen === 3 && (
          <div className="w-full sm:w-3/4">
            <PanInfo setTabOpen={setTabOpen} panInfo={panInfo} setPanInfo={setPanInfo} handleUpload={handleUpload} setPanImage={setPanImage} panImage={panImage}/>
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifySeller;
