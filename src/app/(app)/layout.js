// import '../styles/globals.css'
import NavBar from '@/components/navigation/Navbar'

export default async function AppLayout({ children }) {
  return (
    <>
      <NavBar className="" />
      <div className="flex-1 md:mx-12 md:my-8">{children}</div>
    </>
  )
}
