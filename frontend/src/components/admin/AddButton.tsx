import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AddButton = () => {
  const { pathname } = useLocation()
  return (
   <Link to={`${pathname}/add`}>
      <button className='"shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-semibold tex-xl  !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg w-[206px] h-[40px]'>
        Add new
      </button>
    </Link>
    
  )
}

export default AddButton
