export default function CustomButton({btnType, title, handleClick, styles}) {
   return (
      <button
         className={styles + ' font-epilogue font-semibold text-[16px]\
            leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]'}
         type={btnType}
         onClick={handleClick}>
         {title}
      </button>
   )
}