import { useState } from 'react'

const ImageUpload = ({ setImage, imgUrl }) => {
    console.log(imgUrl);
    const [selectedFile, setSelectedFile] = useState();
    const [checkFile, setCheckFile] = useState(false);

    const imageHandler = (e) => {
        const files=Array.from(e.target.files)
        setImage(files)
        setSelectedFile(e.target.files[0]);
        setCheckFile(true);
    }


    return (

        <div className="w-[320px] grid gap-2">
            <div className="h-24 cursor-pointer relative flex justify-center items-center border-2 rounded-md bg-gray-200">
                <input type="file" name="image" onChange={imageHandler} multiple className="z-20 opacity-0 cursor-pointer h-full w-full" />
                <div className="absolute flex justify-center items-center gap-2">
                    <img className={`h-20 w-20 rounded-full `} src={selectedFile ? URL.createObjectURL(selectedFile) : imgUrl != null ? imgUrl : null} />
                    <span className="text-[16px] w-56 truncate">{checkFile ? selectedFile.name : 'choose a file'}</span>
                </div>
            </div>
        </div>
    );
}

export default ImageUpload