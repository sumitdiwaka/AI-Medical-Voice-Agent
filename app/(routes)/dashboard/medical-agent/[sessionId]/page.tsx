// "use client"
// import axios from 'axios';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react'
// import { doctorAgent } from '../../_components/DoctorAgentCard';
// import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import Vapi from '@vapi-ai/web'
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

// type SessionDetail={
//   id:number,
//   notes:string,
//   sessionId:string,
//   report:JSON,
//   selectedDoctor:doctorAgent,
//   createdOn:string
  
// }

// type messages = {
//   role:string,
//   text:string
// }

// function MedicalVoiceAgent() {
//   const {sessionId} = useParams();
//   const [sessionDetail, setsessionDetail] = useState<SessionDetail>();
//   const [callStarted, setCallStarted] = useState(false);
//   const [vapiInstance,setVapiInstance] =useState<any>();
//   const [currentRoll,setCurrentRoll] = useState<string | null>()
//   const [liveTranscript,setLiveTranscript]=useState<string>()
//   const [messages,setMessages] = useState<messages[]>([])
//   const [loading, setLoading] = useState(false);
//   const router = useRouter(); 
  
//   useEffect(() => {
//     sessionId&&GetSessiondetails();
//   }, [sessionId]);

//   const GetSessiondetails =async () => {
//     const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
//     console.log(result.data);
//     setsessionDetail(result.data);
//   }



// const StartCall = () => {
//   const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
//   setVapiInstance(vapi); // store for later use in endCall()

//   // const VapiAgentConfig = {
//   //   name:'AI Medical Doctor Voice Agent',
//   //   firstMessage:'Hello, Thank You for connecting , Can you tell me your Full Name and Age',
//   //   transcriber:{
//   //            provider:'assembly-ai',
//   //            language:'en',
//   //   },
//   //       voice:{
//   //         provider:'11labs',
//   //         voiceId:sessionDetail?.selectedDoctor?.voiceId
//   //       },
//   //       model:{
//   //           provider:'openai',
//   //           model:'gpt-4o',
//   //           messages:[
//   //             {
//   //               role:'system',
//   //               content:sessionDetail?.selectedDoctor?.agentPrompt
//   //             }
//   //           ]
//   //       }
        
//   // }

//   vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
// //@ts-ignore
//   // vapi.start(VapiAgentConfig);

//   vapi.on('call-start', () => {
//     console.log('Call started');
//     setCallStarted(true);
//   });

//   vapi.on('call-end', () => {
//     console.log('Call ended');
//     setCallStarted(false);
//   });

//   vapi.on('message', (message) => {
//     if (message.type === 'transcript') {
//       const { role, transcriptType, transcript } = message;
//       console.log(`${role}: ${transcript}`);

//       if (transcriptType === 'partial') {
//         setLiveTranscript(transcript);
//         setCurrentRoll(role);
//       } else if (transcriptType === 'final') {
//         setMessages((prev: any) => [
//           ...(prev || []),
//           { role, text: transcript },
//         ]);
//         setLiveTranscript('');
//         setCurrentRoll(null);
//       }
//     }
//   });

//   vapi.on('speech-start', () => {
//     console.log('Assistant started speaking');
//     setCurrentRoll('assistant');
//   });

//   vapi.on('speech-end', () => {
//     console.log('Assistant stopped speaking');
//     setCurrentRoll('user');
//   });
// };


//     const endCall = async() => {
//       setLoading(true);
//     if (!vapiInstance) return
//       //Stop the  call
//       vapiInstance.stop();
//       //Optionally Remove listeners (good for Memory Management)
//       vapiInstance.off('call-start')
//       vapiInstance.off('call-end')
//       vapiInstance.off('message')

//       //Reset Call State
//       setCallStarted(false)
//       setVapiInstance(null)
//       toast.success('Your Report Generated Suceesfully')
//       router.replace('/dashboard')

//       const result = await GenerateReport();
//       setLoading(false);


//   };

//   const GenerateReport = async ()=>{
//     const result = await axios.post('/api/medical-report',{
//       messages:messages,
//       sessionDetail:sessionDetail,
//       sessionId:sessionId
//     })
//     console.log(result.data)
//     return result.data
//   }



//   return (
//     <div className='p-5 border rounded-3xl bg-secondary'>
//         <div className='flex justify-between items-center'>
//           <h2 className='p-1 border rounded-md flex gap-2 items-center'> <Circle className={`h-4 w-4 rounded-full ${callStarted?'bg-green-500':'bg-red-500'}`}/>{callStarted?'Connected...' :'Not Connected'}</h2>
//           <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
//         </div>
//       {sessionDetail && <div className='flex items-center flex-col mt-10'>
//           <Image src={sessionDetail?.selectedDoctor?.image} alt={sessionDetail?.selectedDoctor?.specialist??''} 
//           width={80}
//           height={80}
//           className='h-[100px] w-[100px] object-cover rounded-full'
//           />
//           <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
//           <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

//           <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72'>
//             {messages?.slice(-4).map((msg:messages,index)=>(
              
//                     <h2 className='text-gray-400 p-2' key={index}>{msg.role} : {msg.text}</h2>
              
//             ))}
            
//            {liveTranscript && liveTranscript?.length>0 && <h2 className='text-lg '>{currentRoll} : {liveTranscript} </h2>}
//           </div>

//          {!callStarted ? <Button className='mt-5' onClick={StartCall} disabled={loading}> {loading ? <Loader className='animate-spin'/>:<PhoneCall /> }Start Call</Button>
//          :<Button variant={'destructive'} onClick={endCall} disabled={loading}>{loading ? <Loader className='animate-spin'/>:<PhoneOff />} Disconnect</Button>
//       }
//         </div> }
//     </div>
//   )
// }

// export default MedicalVoiceAgent


"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export type SessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: doctorAgent,
  createdOn: string
}

type messages = {
  role: string,
  text: string
}

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Store callbacks in refs to maintain consistency
  const callStartHandler = useCallback(() => {
    console.log('Call started');
    setCallStarted(true);
  }, []);

  const callEndHandler = useCallback(() => {
    console.log('Call ended');
    setCallStarted(false);
  }, []);

  const messageHandler = useCallback((message: any) => {
    if (message.type === 'transcript') {
      const { role, transcriptType, transcript } = message;
      console.log(`${role}: ${transcript}`);

      if (transcriptType === 'partial') {
        setLiveTranscript(transcript);
        setCurrentRole(role);
      } else if (transcriptType === 'final') {
        setMessages((prev) => [...prev, { role, text: transcript }]);
        setLiveTranscript('');
        setCurrentRole(null);
      }
    }
  }, []);

  const speechStartHandler = useCallback(() => {
    console.log('Assistant started speaking');
    setCurrentRole('assistant');
  }, []);

  const speechEndHandler = useCallback(() => {
    console.log('Assistant stopped speaking');
    setCurrentRole('user');
  }, []);

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
      setSessionDetail(result.data);
    } catch (error) {
      console.error('Error fetching session details:', error);
    }
  }

  const StartCall = useCallback(() => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    // Add event listeners
    vapi.on('call-start', callStartHandler);
    vapi.on('call-end', callEndHandler);
    vapi.on('message', messageHandler);
    vapi.on('speech-start', speechStartHandler);
    vapi.on('speech-end', speechEndHandler);

    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);
  }, [callEndHandler, callStartHandler, messageHandler, speechEndHandler, speechStartHandler]);

  const endCall = useCallback(async () => {
    setLoading(true);
    try {
      if (vapiInstance) {
        // Stop the call
        await vapiInstance.stop();
        
        // Remove listeners
        vapiInstance.off('call-start', callStartHandler);
        vapiInstance.off('call-end', callEndHandler);
        vapiInstance.off('message', messageHandler);
        vapiInstance.off('speech-start', speechStartHandler);
        vapiInstance.off('speech-end', speechEndHandler);
        
        setCallStarted(false);
        toast.success('Call ended successfully');
        
        // Generate report without redirecting
        await GenerateReport();
      }
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error('Error ending call');
    } finally {
      setLoading(false);
    }
  }, [vapiInstance, callStartHandler, callEndHandler, messageHandler, speechStartHandler, speechEndHandler]);

  const GenerateReport = async () => {
    try {
      const result = await axios.post('/api/medical-report', {
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId
      });
      return result.data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (vapiInstance) {
        //@ts-ignore
        vapiInstance.stop().catch(console.error);
      }
    };
  }, [vapiInstance]);

  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center'>
        <h2 className='p-1 border rounded-md flex gap-2 items-center'>
          <Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />
          {callStarted ? 'Connected...' : 'Not Connected'}
        </h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
      </div>
      
      {sessionDetail && (
        <div className='flex items-center flex-col mt-10'>
          <Image
            src={sessionDetail?.selectedDoctor?.image}
            alt={sessionDetail?.selectedDoctor?.specialist ?? ''}
            width={80}
            height={80}
            className='h-[100px] w-[100px] object-cover rounded-full'
          />
          <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
          <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

          <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72'>
            {messages?.slice(-4).map((msg: messages, index) => (
              <h2 className='text-gray-400 p-2' key={index}>{msg.role} : {msg.text}</h2>
            ))}
            
            {liveTranscript && liveTranscript.length > 0 && (
              <h2 className='text-lg'>{currentRole} : {liveTranscript}</h2>
            )}
          </div>

          {!callStarted ? (
            <Button className='mt-5' onClick={StartCall} disabled={loading}>
              {loading ? <Loader className='animate-spin' /> : <PhoneCall />}
              Start Call
            </Button>
          ) : (
            <Button variant={'destructive'} onClick={endCall} disabled={loading}>
              {loading ? <Loader className='animate-spin' /> : <PhoneOff />}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;