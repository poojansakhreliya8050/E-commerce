import {useState} from 'react'

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [checkFile, setCheckFile] = useState(false);

    const imageHandler = (e) => {
        console.log(e.target);
        setSelectedFile(e.target.files[0]);
        setCheckFile(true);
    }


    return (

                <div className="w-[320px] grid gap-2">
                    <div className="h-24 cursor-pointer relative flex justify-center items-center border-2 rounded-md bg-gray-200">
                        <input type="file" name="file" onChange={imageHandler} className="z-20 opacity-0 cursor-pointer h-full w-full" />
                        <div className="absolute flex justify-center items-center gap-2">
                            <img className={`h-20 w-20 rounded-full ${checkFile?'opacity-1':'opacity-0'}`} src={selectedFile ? URL.createObjectURL(selectedFile) : null} />
                            <span className="text-[16px] w-56 truncate">{checkFile?selectedFile.name:'choose a file'}</span>
                        </div>        
                    </div>
                </div>
    );
}

export default ImageUpload