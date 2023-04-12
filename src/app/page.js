'use client'
import {redirect} from 'next/navigation'
import {parseCookies} from 'nookies'


export default function Home() {



return (
  <div className={`min-h-screen flex justify-center items-center`}>
  <h1 className='inline p-3 bg-indigo-800 text-slate-100 rounded-md shadow-sm'>Dashboard</h1>
  </div>
)
  
}
