import React from 'react'
import Sidebar from './_components/Sidebar'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex gap-6'>
          <div className="hidden w-72 shrink-0 md:block">
        <Sidebar />
      </div>
        <div className='flex-1 bg-blue-500'>
            {children}
        </div>
    </div>
  )
}

export default layout