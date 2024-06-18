export default function FormField({
   labelName, placeholder, inputType, isTextArea, value, handleChange
}) {
   return (
      <label className='flex-1 w-full flex flex-col'>
         {labelName &&
            <span className='font-epilogue font-medium text-[14px]
               leading-[22px] text-[#808191] mb-[10px]'
            >
               {labelName}
            </span>
         }
         {isTextArea
            ?
               <textarea
                  value={value}
                  required
                  onChange={handleChange}
                  placeholder={placeholder}
                  rows='10'
                  className='py-[15px] sm:px-[25px] px-[15px] outline-none
                     border-[1px] border-[#3a3a43] bg-transparent
                     font-epilogue text-white text-[14px]
                     placeholder:text-[#4b5264] rounded-[10px]
                     sm:min-w-[300px]'
               >

               </textarea>
            :
               <input
                  type={inputType}
                  value={value}
                  required
                  onChange={handleChange}
                  placeholder={placeholder}
                  step='0.1'
                  className='py-[15px] sm:px-[25px] px-[15px] outline-none
                     border-[1px] border-[#3a3a43] bg-transparent
                     font-epilogue text-white text-[14px]
                     placeholder:text-[#4b5264] rounded-[10px]
                     sm:min-w-[300px]'
               />
         }
      </label>
   )
}