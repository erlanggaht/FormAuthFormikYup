import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, redirect } from "next/navigation";
import * as Yup from 'yup'
import mark from '../../../public/icon/mark.svg'
import axios from "axios";

export default function Forms({title,hidden,submit,hiddenConfirmPass,loading,disabledInput}) {

 const pathname = usePathname()
 const Router = useRouter()

 const pathname_login = pathname === '/login'
 const pathname_signup = pathname === '/signup'


 const formik = useFormik({
  initialValues : {
    username : "",
    password : "",
    confirmPassword : "",
    hiddenConfirmSchema : ""
  },
  validationSchema : Yup.object({
    username :  pathname_login ? "" : Yup.string().required('username tidak boleh kosong').min(5,'username minimal 3 huruf').max(25,'username maksimal 25 huruf '),
    password :  pathname_login ? "" : Yup.string().required('password tidak boleh kosong').min(6,'password minimal 3 huruf').max(15,'password maksimal 15 huruf'),
    confirmPassword : pathname_login ? "" :Yup.string().oneOf([Yup.ref('password')],'konfirmasi password tidak cocok').required(),


  }),
  onSubmit : values => {
    const {username,password} = values
    formik.resetForm()


    //PageLogin
    if(pathname_login) {
      axios({
        url : "http://localhost:3002/masuk",
        headers : {"Content-Type":"application/json"},
        data : {name : username,password : password},
        method : "post"
      }).then((response)=>{
        if(response.status == 200) Router.push('/')
      })
      .catch((err)=>{
        const error_msg = err.response.data.msg
        setTimeout(()=>{

          alert(error_msg)
        },10)
      })
    }

    //Page Signup
    if (pathname_signup) {
        axios('http://localhost:3002/admin',{
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          data : {
            name : username,
            password : password,
            confirmPassword: formik.values.confirmPassword          
           }
        }).then(response => {
          if(response.status <= 200) {
            alert('berhasil daftar')
            setTimeout(()=>{
  
              Router.push('/login')
            },10)
          }
        }).catch((error)=>{
          console.log(error)
        })         
    }
  }
 })

 const handleinput = (e) => {
  formik.setFieldValue(e.target.name,e.target.value)
}


  return (
    <>
    <div className={`h-screen max-h-screen p-4 ${loading}`}>
        <div className="flex justify-center">
      <Image src={mark} width={100} height={100} style={{height:"auto",width:"84px"}} alt="iconweb"/>
      </div>
      <div className="my-8">
      <h1 className="font-bold text-2xl text-neutral-50 text-center drop-shadow-md">{title}</h1>
       <p className="text-center text-neutral-200 drop-shadow-md">Or start your 14-day free trial</p>
       </div>
    <form onSubmit={formik.handleSubmit} className={`w-full flex justify-center px-2 sm:px-6`}>
       <div className="w-[100%] sm:w-[50%] px-6 py-8 border-solid border bg-[#fff] rounded-sm shadow-lg">
                <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="username" className="pb-3 inline-block font-bold">Username</label>
            <input id="username" name="username" type="username" autoComplete="username" required className={`relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10  sm:text-sm sm:leading-6 px-4 
            ${formik.errors.username ? 'ring-red-500 focus:ring-red-500 outline-none ' : `inherit ${formik.values.username ? pathname === '/login' ?  "" : "bg-ceklis" : ""} bg-[length:29px_29px] bg-[right_.3rem_bottom_3px] bg-no-repeat`}
            hover:shadow-sm`} placeholder="Username" disabled={disabledInput} value={formik.values.username} onChange={handleinput}/>
           {!pathname_login && <p className="text-red-500 text-right">{formik.errors.username}</p>}
          </div>
          <div className="mt-6">
            <label htmlFor="password" className="pb-3 pt-6 inline-block font-bold">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className={`relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-4
             ${formik.errors.password ? 'ring-red-500 focus:ring-red-500 outline-none ' : `inherit
              ${formik.values.username ? pathname === '/login' ?  "" : "bg-ceklis" : ""} 
              bg-[length:29px_29px] bg-[right_.3rem_bottom_3px] bg-no-repeat`}
             hover:shadow-sm
            `} placeholder="Password" disabled={disabledInput}  value={formik.values.password}  onChange={handleinput}  />
           {!pathname_login && <p className="text-red-500 text-right">{formik.errors.password}</p>}
            <div className={hiddenConfirmPass}>
            <label htmlFor="confirmPassword" className="pb-3 pt-6 inline-block font-bold">Confirm Password</label>
            <input id="confirmPassword" name={pathname === '/login' ? 'hiddenConfirmSchema' : "confirmPassword"} type="confirmPassword" autoComplete="current-confirmPassword" className={`relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-4
             ${formik.errors.confirmPassword ? 'ring-red-500 focus:ring-red-500 outline-none ' : `inherit ${formik.values.username ? 'bg-ceklis' : ""} bg-[length:29px_29px] bg-[right_.3rem_bottom_3px] bg-no-repeat`}
              hover:shadow-sm`} placeholder="Confirm password"  value={pathname === '/login' ? '' : formik.values.confirmPassword}  onChange={handleinput}   />
           {!pathname_login && <p className="text-red-500 text-right">{formik.errors.confirmPassword}</p>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className={`flex items-center my-4 ${hidden}`}>
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" disabled={disabledInput}/>
            <label htmlFor="remember-me" className={`ml-2 block text-sm text-gray-90 `} >Remember me</label>
          </div>
          <div className="text-sm">
            <a href="#" className={`font-medium text-indigo-600 hover:text-indigo-500 ${hidden}`}>Forgot your password?</a>
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={disabledInput}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className={ `h-5 w-5 text-indigo-500 group-hover:text-indigo-400 ${hidden}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
            </span>
            {submit}
          </button>
          <div className="text-center w-full p-1 mt-3">
          <Link href={pathname === '/login' ? '/signup' : '/login'}><span className="opacity-[0.7] hover:opacity-[0.9]">{pathname === '/login' ? 'sign up' : 'log in'}</span></Link>
          </div>
        </div>
        </div>
        </form>
    </div>
    </>
  );
}
