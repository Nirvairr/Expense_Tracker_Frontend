import React,{useRef,useState} from 'react';
import {LuUser,LuUpload,LuTrash} from "react-icons/lu";


const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef= useRef(null); 
    const [previewUrl,setPreviewUrl]= useState(null);

    const handleImageChange =(event)=>{
        const file =event.target.files[0];
        if(file){
          //update the image state
          setImage(file);

          //generate preview URL from the file
          const preview =URL.createObjectURL(file);
          setPreviewUrl(preview);
        }
    };
    const handleRemoveImage=()=>{ // will be triggerred when we click trash icon
      setImage(null);
      setPreviewUrl(null);
    }

    const onChooseFile =()=>{ //when no image has been selected yet then thid function is triggered on clicking the icon.
      inputRef.current.click(); //inputRef is a React useRef object pointing to the hidden file input:
    };
  return <div className="flex justify-center mb-6">
      <input 
      type="file" // this makes the input a fiel picker, allowing users to upload files from their device.
      accept="image/*"  //Restricts the file types to only images (e.g., .jpg, .png, .gif, etc.).
      ref={inputRef} //Attaches a ref (useRef) to this DOM element, allowing you to access it programmatically.
      onChange={handleImageChange}
      className="hidden" //	Hides the actual input field from view using Tailwind CSS (display: none). This is often done to style the file upload using a custom button or icon instead.
      />

    {!image ? (
      <div className='w-20 h-20 flex items-center justify-center bg-sky-100 rounded-full relative'>              
      <LuUser className="text-4xl text-primary"/>
       <button 
       type="button"
       className="w-8 h-8 flex items-center justify-center bg-sky-400 text-white rounded-full absolute -bottom-1 -right-1"
       onClick={onChooseFile}
       >
         <LuUpload />
       </button>
      </div>
     ) : (
       <div className="relative">
         <img 
         src={previewUrl} // URL generated using URL.createObjectURL(file) to display the chosen image.
         alt="profile photo"
         className="w-20 h-20 rounded-full oject-cover"
         />
         <button
         type="button" //A small red delete button with a trash icon appears at the bottom-right to remove the image.
         className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
         onClick={handleRemoveImage} //Sets the image back to null, reverting the UI back to block 1.


         >
           <LuTrash />
         </button>
         </div>
        )}
    </div> 
};

export default ProfilePhotoSelector;
