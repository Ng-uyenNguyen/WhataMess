type PropTypes = {
  children: React.ReactElement
  text: string
  styles?: string
}
function Tooltip({ children, text, styles }: PropTypes) {
  return (
    <div className='w-full group relative'>
      {children}
      <div className={"break-words transition duration-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 inline-block absolute py-2 px-3 z-50 text-sm font-medium text-white bg-gray-700 rounded-lg border border-gray-200 shadow-sm "
        + styles
      }>
        {text}
      </div>
    </div>
  );
}

export default Tooltip;