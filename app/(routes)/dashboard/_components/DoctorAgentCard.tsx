"use client"
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@clerk/nextjs';
// import { IconArrowRight } from '@tabler/icons-react';
// import axios from 'axios';
// import { Badge, Loader, Loader2Icon } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'


// export type doctorAgent = {
//     id: number,
//     specialist: string,
//     description: string,
//     image: string,
//     agentPrompt: string,
//     voiceId?:string,
//     subscriptionRequired: boolean
// }

// type props = {
//     doctorAgent: doctorAgent;
// }

// function DoctorAgentCard( {doctorAgent}:props) {
//   const [loading,setLoading] = useState(false);
//   const router = useRouter();

//   const {has} = useAuth();
//   //@ts-ignore
//   const paidUser = has&&has({plan:'pro'})
//   console.log(paidUser)

//     const onStartConsultation = async ()=>{
//         setLoading(true);
//         // save All info to database 
//         const result = await axios.post('/api/session-chat',{
//             notes:'New Query',
//             selectedDoctor:doctorAgent
//         })
//         console.log(result.data)
//         if(result.data?.sessionId){
//             console.log(result.data.sessionId)
//             //Route New Conversation Screen
//             router.push('/dashboard/medical-agent/'+result.data.sessionId)
//         }
//         setLoading(false);
//     }


//   return (
//     <div className='relative m-2'>
//       {doctorAgent.subscriptionRequired && <Badge className='absolute p-1 right-0'>Premium</Badge>}
//       <Image src={doctorAgent.image} 
//       alt={doctorAgent.specialist} 
//       width={200} 
//       height={250}
//       className='w-full h-[250px] object-cover rounded-xl' 
//       style={{ width: '100%', height: '250px' }}
//       />
//       <h2 className='font-bold mt-1 '>{doctorAgent.specialist}</h2>
//       <p className='line-clamp-2  text-sm text-gray-500'>{doctorAgent.description}</p>
//       <Button className='w-full mt-2'
//       onClick={onStartConsultation}
//        disabled={!paidUser&&doctorAgent.subscriptionRequired}>Start Consultation {loading?<Loader2Icon className='animate-spin' />:  <IconArrowRight />}</Button>
//     </div>
//   )
// }

// export default DoctorAgentCard

import { Button } from '@/components/ui/button';
import { IconArrowRight, IconCrown } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react'

export type doctorAgent = {
    id: number,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId?: string,
    subscriptionRequired?: boolean
}

type props = {
    doctorAgent: doctorAgent;
}

function DoctorAgentCard({ doctorAgent }: props) {
  return (
    <div className='relative'>
      {/* Premium Badge */}
      {doctorAgent.subscriptionRequired && (
        <div className='absolute top-2 right-2 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md'>
          <IconCrown className='h-3 w-3' />
          Premium
        </div>
      )}

      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className='w-full h-[250px] object-cover rounded-xl'
      />
      <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
      <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
      <Button className='w-full mt-2'>
        Start Consultation <IconArrowRight />
      </Button>
    </div>
  )
}

export default DoctorAgentCard

