"use client"
// import axios from 'axios';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState, useCallback, useRef } from 'react'
// import { doctorAgent } from '../../_components/DoctorAgentCard';
// import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import Vapi from '@vapi-ai/web'
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

// export type SessionDetail = {
//   id: number,
//   notes: string,
//   sessionId: string,
//   report: JSON,
//   selectedDoctor: doctorAgent,
//   createdOn: string
// }

// type messages = {
//   role: string,
//   text: string
// }

// function MedicalVoiceAgent() {
//   const { sessionId } = useParams();
//   const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
//   const [callStarted, setCallStarted] = useState(false);
//   const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
//   const [currentRole, setCurrentRole] = useState<string | null>(null);
//   const [liveTranscript, setLiveTranscript] = useState<string>('');
//   const [messages, setMessages] = useState<messages[]>([]);
//   const messagesRef = useRef<messages[]>([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Store callbacks in refs to maintain consistency
//   const callStartHandler = useCallback(() => {
//     console.log('Call started');
//     setCallStarted(true);
//   }, []);

//   const callEndHandler = useCallback(() => {
//     console.log('Call ended');
//     setCallStarted(false);
//   }, []);

//   const messageHandler = useCallback((message: any) => {
//     if (message.type === 'transcript') {
//       const { role, transcriptType, transcript } = message;
//       console.log(`${role}: ${transcript}`);

//       if (transcriptType === 'partial') {
//         setLiveTranscript(transcript);
//         setCurrentRole(role);
//       } else if (transcriptType === 'final') {
//         setMessages((prev) => {
//           const updated = [...prev, { role, text: transcript }];
//           messagesRef.current = updated; // ← ref ko sync karo
//           return updated;
//         });
//         setLiveTranscript('');
//         setCurrentRole(null);
//       }
//     }
//   }, []);

//   const speechStartHandler = useCallback(() => {
//     console.log('Assistant started speaking');
//     setCurrentRole('assistant');
//   }, []);

//   const speechEndHandler = useCallback(() => {
//     console.log('Assistant stopped speaking');
//     setCurrentRole('user');
//   }, []);

//   useEffect(() => {
//     sessionId && GetSessionDetails();
//   }, [sessionId]);

//   const GetSessionDetails = async () => {
//     try {
//       const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
//       setSessionDetail(result.data);
//     } catch (error) {
//       console.error('Error fetching session details:', error);
//     }
//   }

//   const StartCall = useCallback(() => {
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
//     setVapiInstance(vapi);

//     // Add event listeners
//     vapi.on('call-start', callStartHandler);
//     vapi.on('call-end', callEndHandler);
//     vapi.on('message', messageHandler);
//     vapi.on('speech-start', speechStartHandler);
//     vapi.on('speech-end', speechEndHandler);

//     const vapiConfig = {
//   name: sessionDetail?.selectedDoctor?.specialist + ' AI',
//   firstMessage: 'Hello! I am your ' + sessionDetail?.selectedDoctor?.specialist + '. How can I help you today?',
//   transcriber: { provider: 'deepgram', language: 'en' },
//   voice: {
//     provider: '11labs',
//     voiceId: sessionDetail?.selectedDoctor?.voiceId ?? 'will',
//   },
//   model: {
//     provider: 'openai',
//     model: 'gpt-4o',
//     maxTokens: 400,
//     messages: [
//       {
//         role: 'system',
//         content: (sessionDetail?.selectedDoctor?.agentPrompt ?? '') +
//           ' Keep each response under 3 sentences.',
//       },
//     ],
//   },
//   maxDurationSeconds: 600,
// };
// // @ts-ignore
// vapi.start(vapiConfig);

//     // vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);
//   }, [sessionDetail, callEndHandler, callStartHandler, messageHandler, speechEndHandler, speechStartHandler]);

// const endCall = useCallback(async () => {
//   setLoading(true);
//   try {
//     if (vapiInstance) {
//       vapiInstance.stop(); // ← await mat karo, warna ejection hoga
//       setCallStarted(false);
//       setVapiInstance(null);
//       toast.success('Call ended successfully');
//       await GenerateReport(messagesRef.current); // ← ref pass karo
//       router.replace('/dashboard');
//     }
//   } catch (error) {
//     console.error('Error ending call:', error);
//     toast.error('Error ending call');
//   } finally {
//     setLoading(false);
//   }
// }, [vapiInstance]);
//   const GenerateReport = async (currentMessages: messages[]) => {
//     try {
//       const result = await axios.post('/api/medical-report', {
//         messages: currentMessages,
//         sessionDetail: sessionDetail,
//         sessionId: sessionId
//       });
//       return result.data;
//     } catch (error) {
//       console.error('Error generating report:', error);
//       throw error;
//     }
//   }

//   // Cleanup on component unmount
//   useEffect(() => {
//     return () => {
//       if (vapiInstance) {
//         //@ts-ignore
//         vapiInstance.stop().catch(console.error);
//       }
//     };
//   }, [vapiInstance]);

//   return (
//     <div className='p-5 border rounded-3xl bg-secondary'>
//       <div className='flex justify-between items-center'>
//         <h2 className='p-1 border rounded-md flex gap-2 items-center'>
//           <Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />
//           {callStarted ? 'Connected...' : 'Not Connected'}
//         </h2>
//         <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
//       </div>

//       {sessionDetail && (
//         <div className='flex items-center flex-col mt-10'>
//           <Image
//             src={sessionDetail?.selectedDoctor?.image}
//             alt={sessionDetail?.selectedDoctor?.specialist ?? ''}
//             width={80}
//             height={80}
//             className='h-[100px] w-[100px] object-cover rounded-full'
//           />
//           <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
//           <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

//           <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72'>
//             {messages?.slice(-4).map((msg: messages, index) => (
//               <h2 className='text-gray-400 p-2' key={index}>{msg.role} : {msg.text}</h2>
//             ))}

//             {liveTranscript && liveTranscript.length > 0 && (
//               <h2 className='text-lg'>{currentRole} : {liveTranscript}</h2>
//             )}
//           </div>

//           {!callStarted ? (
//             <Button className='mt-5' onClick={StartCall} disabled={loading}>
//               {loading ? <Loader className='animate-spin' /> : <PhoneCall />}
//               Start Call
//             </Button>
//           ) : (
//             <Button variant={'destructive'} onClick={endCall} disabled={loading}>
//               {loading ? <Loader className='animate-spin' /> : <PhoneOff />}
//               Disconnect
//             </Button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MedicalVoiceAgent;



import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useCallback, useRef } from 'react'
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

// Helper: format seconds → MM:SS
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [callConnecting, setCallConnecting] = useState(false); // ← loading state
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [messages, setMessages] = useState<messages[]>([]);
  const messagesRef = useRef<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0); // ← timer in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null); // ← timer interval ref
  const router = useRouter();

  // ── Timer: start when call begins, stop when call ends ──
  useEffect(() => {
    if (callStarted) {
      setTimer(0);
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStarted]);

  const callStartHandler = useCallback(() => {
    console.log('Call started');
    setCallStarted(true);
    setCallConnecting(false); // ← stop connecting spinner
  }, []);

  const callEndHandler = useCallback(() => {
    console.log('Call ended');
    setCallStarted(false);
  }, []);

  const messageHandler = useCallback((message: any) => {
    if (message.type === 'transcript') {
      const { role, transcriptType, transcript } = message;
      if (transcriptType === 'partial') {
        setLiveTranscript(transcript);
        setCurrentRole(role);
      } else if (transcriptType === 'final') {
        setMessages((prev) => {
          const updated = [...prev, { role, text: transcript }];
          messagesRef.current = updated;
          return updated;
        });
        setLiveTranscript('');
        setCurrentRole(null);
      }
    }
  }, []);

  const speechStartHandler = useCallback(() => {
    setCurrentRole('assistant');
  }, []);

  const speechEndHandler = useCallback(() => {
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
    setCallConnecting(true); // ← show connecting spinner
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    vapi.on('call-start', callStartHandler);
    vapi.on('call-end', callEndHandler);
    vapi.on('message', messageHandler);
    vapi.on('speech-start', speechStartHandler);
    vapi.on('speech-end', speechEndHandler);

    // ← error handler: stop connecting spinner if connection fails
    vapi.on('error', (e: any) => {
      console.error('Vapi error:', e);
      setCallConnecting(false);
      toast.error('Could not connect. Please try again.');
    });

    const vapiConfig = {
      name: sessionDetail?.selectedDoctor?.specialist + ' AI',
      firstMessage: 'Hello! I am your ' + sessionDetail?.selectedDoctor?.specialist + '. How can I help you today?',
      transcriber: { provider: 'deepgram', language: 'en' },
      voice: {
        provider: '11labs',
        voiceId: sessionDetail?.selectedDoctor?.voiceId ?? 'will',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4o',
        maxTokens: 400,
        messages: [
          {
            role: 'system',
            content: (sessionDetail?.selectedDoctor?.agentPrompt ?? '') +
              ' Keep each response under 3 sentences.',
          },
        ],
      },
      maxDurationSeconds: 600,
    };
    // @ts-ignore
    vapi.start(vapiConfig);
  }, [sessionDetail, callStartHandler, callEndHandler, messageHandler, speechStartHandler, speechEndHandler]);

  const endCall = useCallback(async () => {
    setLoading(true);
    try {
      if (vapiInstance) {
        vapiInstance.stop();
        setCallStarted(false);
        setVapiInstance(null);
        toast.success('Call ended successfully');
        await GenerateReport(messagesRef.current);
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error('Error ending call');
    } finally {
      setLoading(false);
    }
  }, [vapiInstance]);

  const GenerateReport = async (currentMessages: messages[]) => {
    try {
      const result = await axios.post('/api/medical-report', {
        messages: currentMessages,
        sessionDetail: sessionDetail,
        sessionId: sessionId
      });
      return result.data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }

 useEffect(() => {
  return () => {
    if (vapiInstance) {
      try {
        vapiInstance.stop();
      } catch (e) {
        console.error(e);
      }
    }
  };
}, [vapiInstance]);

  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center'>
        {/* Connection status */}
        <h2 className='p-1 border rounded-md flex gap-2 items-center'>
          <Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : callConnecting ? 'bg-yellow-400 animate-pulse' : 'bg-red-500'}`} />
          {callStarted ? 'Connected...' : callConnecting ? 'Connecting...' : 'Not Connected'}
        </h2>
        {/* Timer — shows 00:00 when idle, counts up during call */}
        <h2 className='font-bold text-xl text-gray-400'>
          {formatTime(timer)}
        </h2>
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
            <Button className='mt-5' onClick={StartCall} disabled={loading || callConnecting}>
              {callConnecting
                ? <><Loader className='animate-spin mr-2' /> Connecting...</>
                : <><PhoneCall className='mr-2' /> Start Call</>
              }
            </Button>
          ) : (
            <Button variant={'destructive'} onClick={endCall} disabled={loading}>
              {loading ? <><Loader className='animate-spin mr-2' /> Generating Report...</> : <><PhoneOff className='mr-2' /> Disconnect</>}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;