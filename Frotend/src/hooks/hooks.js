import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useCustomMutation= (mutation,loadMessage="Processing...")=>{

    const [loading,setLoading]=useState(false)
    const [res,setRes]=useState(null)

    const [mutate]=mutation()

    const exucuteMutate= async (data)=>{
        try{
            setLoading(true)
            let toastId=toast.loading(loadMessage)
           const resp= await mutate(data)
           if(resp.data){
                setRes(resp)
                toast.success(resp.data.message || "Done",{id:toastId})
           }else{
                setRes(resp)
                toast.error(resp.error.data.message || "Something Went Wrong!",{id:toastId})
           }
        }catch(err){
            console.log(err)
            toast.error("Something Went Wrong!")
        }
        finally{
            setLoading(false)
        }
    }

    return [exucuteMutate,res,loading]
}

export const useErrors = (errors = []) => {

    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) fallback()
                else {
                    toast.error(error?.data?.message || "Something went wrong")
                }
            }

        })
    }, [errors])
}