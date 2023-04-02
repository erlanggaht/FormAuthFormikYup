'use client'
import {redirect} from 'next/navigation'
import {parseCookies} from 'nookies'


export default function Home() {

  const cookies = parseCookies()
  const ifs = Object.keys(cookies).length === 0
  console.log(cookies)
  if(ifs){
    redirect('/login')
  } else {
    console.log('selamat datang', Object.keys(cookies)[0] || null)
  }
  
return (
  <div className={`min-h-screen flex justify-center items-center`}>
  <h1 className='inline p-3 bg-indigo-800 text-slate-100 rounded-md shadow-sm'>Dashboard</h1>
  </div>
)
  
}
