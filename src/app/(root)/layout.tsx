import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
    </div>
    
  )
}

export default layout