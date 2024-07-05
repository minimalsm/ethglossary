// // components/Sidebar.js

// import Link from 'next/link'

// const terms = ['hello', 'world', 'example'] // Replace with actual terms or fetch from database

// export default function Sidebar() {
//   return (
//     <div className="w-64 h-full bg-gray-800 text-white h-dvh	">
//       <h2 className="text-2xl font-bold p-4">Terms</h2>
//       <ul>
//         {terms.map((term) => (
//           <li key={term} className="p-4 hover:bg-gray-700">
//             <Link legacyBehavior href={`/fr/${term}`}>
//               <a>{term}</a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// import { cn } from "@/lib/utils"
// import { Button } from "./ui/button"

// todo: fix styling

// export default function Sidebar({ className }) {
//   return (
//     <div className={cn("pb-12", className)}>
//       <div className="space-y-4 py-4">
//         <div className="px-3 py-2">
//           <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
//             Terms
//           </h2>
//           <div className="space-y-1">
//             <Button asChild variant="secondary" className="w-full justify-start">
//               <a href="/fr/hello"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#16a34a" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>hello</a>
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#16a34a" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
//               world
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"/></svg>
//               ethereum
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"/></svg>
//               dapps
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"/></svg>
//               gas
//             </Button>
//           </div>
//         </div>
    
     
//       </div>
//     </div>
//   )
// }

import Link from 'next/link'
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export default function Sidebar({ terms, className }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 pt-4">
        <div className="px-3">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Terms
          </h2>
          <div className="space-y-1">
            {terms.map((term) => (
              
            <Button asChild variant="secondary" className="w-full justify-start" key={term.term}>
              <a href={`/fr/${term.term}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#16a34a" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>{term.term}</a>
            </Button>

              // <Button asChild variant="secondary" className="w-full justify-start" key={term.term}>
              //   <Link legacyBehavior href={`/fr/${term.term}`}>
              //     <a className='flex items-center py-2 px-4 w-full'>
              //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#16a34a" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              //       {term.term}
              //     </a>
              //   </Link>
              // </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
