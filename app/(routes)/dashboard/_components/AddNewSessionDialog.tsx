// "use client"
// import React, { useState } from 'react'
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Textarea } from '@/components/ui/textarea'
// import { ArrowRight, Loader2 } from 'lucide-react'
// import axios from 'axios'
// import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'
// import SuggestedDoctorCard from './SuggestedDoctorCard'
// import { useRouter } from 'next/navigation'

// function AddNewSessionDialog() {
//     const [note ,setNote] = useState <string>();
//     const [loading , setLoading] = useState(false);
//     const[suggestedDoctors,setSuggestedDoctors] = useState<doctorAgent[]>()
//     const [selectedDoctor , setSelectedDoctor] = useState<doctorAgent >()
//     const router = useRouter();

//     const OnClickNext = async() => {
//         setLoading(true);
//         const result = await axios.post('/api/suggest-doctors',{
//             notes:note
//         });
            
//             console.log(result.data);
//             setSuggestedDoctors(result.data)
//             setLoading(false);
//     }

//     const onStartConsultation = async ()=>{
//         setLoading(true);
//         // save All info to database 
//         const result = await axios.post('/api/session-chat',{
//             notes:note,
//             selectedDoctor:selectedDoctor
//         })
//         console.log(result.data)
//         if(result.data?.sessionId){
//             console.log(result.data.sessionId)
//             //Route New Conversation Screen
//             router.push('/dashboard/medical-agent/'+result.data.sessionId)
//         }
//         setLoading(false);
//     }


//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button className='mt-3'>+ Start Consultaion</Button>
//             </DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Add Basic Details</DialogTitle>
//                     <DialogDescription asChild>
//                     {!suggestedDoctors ? <div>
//                             <h2>Add Symptoms Or Any Other Details</h2>
//                             <Textarea placeholder='Add Detail Here...' className='h-[200px] mt-1'
//                             onChange={(e) => setNote(e.target.value)} />
//                         </div> : 
//                         <div>
//                             <h2>Choose Your Doctor</h2>
//                         <div className='grid grid-cols-3 gap-5'>
//                             {/* Suggested doctors */}
//                             {suggestedDoctors.map((doctor,index)=>(
//                                 <SuggestedDoctorCard doctorAgent={doctor} key={index}
//                                 setSelectedDoctor={()=>setSelectedDoctor(doctor)}
//                                 //@ts-ignore
//                                 selectedDoctor= {selectedDoctor}
//                                 />
//                             )

//                             )}
//                             </div>
//                             </div>}
//                     </DialogDescription>
//                 </DialogHeader>
//                 <DialogFooter>
//                     <DialogClose asChild>
//                         <Button variant={'outline'} >Cancel</Button>
//                     </DialogClose>
                    
//                   {!suggestedDoctors ?  <Button disabled={!note || loading} onClick={()=> OnClickNext()}>
                      
//                         Next{loading ?  <Loader2 className='animate-spin' /> :<ArrowRight />}
//                     </Button> : <Button  disabled={loading || !selectedDoctor} onClick={()=>onStartConsultation()}>Start Consultation
//                         {loading ?  <Loader2 className='animate-spin' /> :<ArrowRight />}
//                     </Button> }
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default AddNewSessionDialog



"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Loader2 } from 'lucide-react'
import axios from 'axios'
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { SessionDetail } from '../medical-agent/[sessionId]/page'

function AddNewSessionDialog() {
    const [note ,setNote] = useState <string>();
    const [loading , setLoading] = useState(false);
    const[suggestedDoctors,setSuggestedDoctors] = useState<doctorAgent[]>()
    const [selectedDoctor , setSelectedDoctor] = useState<doctorAgent >()
    const router = useRouter();
    const[historyList,sethistoryList] = useState<SessionDetail[]>([]);

    const {has} = useAuth();
      //@ts-ignore
      const paidUser = has&&has({plan:'pro'})
      console.log(paidUser)

    const OnClickNext = async() => {
        setLoading(true);
        try {
            const result = await axios.post('/api/suggest-doctors',{
                notes:note
            });
            const data = result.data;
            // Always set an array — never let .map crash
            setSuggestedDoctors(Array.isArray(data) ? data : []);
        } catch(e) {
            console.error(e);
            setSuggestedDoctors([]);
        } finally {
            setLoading(false);
        }
    }

    const onStartConsultation = async ()=>{
        setLoading(true);
        // save All info to database 
        const result = await axios.post('/api/session-chat',{
            notes:note,
            selectedDoctor:selectedDoctor
        })
        console.log(result.data)
        if(result.data?.sessionId){
            console.log(result.data.sessionId)
            //Route New Conversation Screen
            router.push('/dashboard/medical-agent/'+result.data.sessionId)
        }
        setLoading(false);
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='mt-3' disabled={!paidUser && historyList?.length>=1}>+ Start Consultaion</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                    {!suggestedDoctors ? <div>
                            <h2>Add Symptoms Or Any Other Details</h2>
                            <Textarea placeholder='Add Detail Here...' className='h-[200px] mt-1'
                            onChange={(e) => setNote(e.target.value)} />
                        </div> : 
                        <div>
                            <h2>Choose Your Doctor</h2>
                        <div className='grid grid-cols-3 gap-5'>
                            {/* Suggested doctors */}
                            {suggestedDoctors.map((doctor,index)=>(
                                <SuggestedDoctorCard doctorAgent={doctor} key={index}
                                setSelectedDoctor={()=>setSelectedDoctor(doctor)}
                                //@ts-ignore
                                selectedDoctor= {selectedDoctor}
                                />
                            )

                            )}
                            </div>
                            </div>}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'} >Cancel</Button>
                    </DialogClose>
                    
                  {!suggestedDoctors ?  <Button disabled={!note || loading} onClick={()=> OnClickNext()}>
                      
                        Next{loading ?  <Loader2 className='animate-spin' /> :<ArrowRight />}
                    </Button> : <Button  disabled={loading || !selectedDoctor} onClick={()=>onStartConsultation()}>Start Consultation
                        {loading ?  <Loader2 className='animate-spin' /> :<ArrowRight />}
                    </Button> }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewSessionDialog