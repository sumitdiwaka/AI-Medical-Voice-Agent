// import React from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { SessionDetail } from '../medical-agent/[sessionId]/page'
// import moment from 'moment'

// type props = {
//     record: SessionDetail
// }

// function ViewReportDialog({record}:props) {
    
//   const report = record?.report && JSON.parse(record?.report)

//   return (

//       <Dialog>
//   <DialogTrigger><Button variant={'link'} size={'sm'}>View Report</Button></DialogTrigger>
//   <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
//     <DialogHeader>
//       <DialogTitle asChild>
//         <h2 className='text-center text-2xl font-bold'>🩺 Medical AI Voice Agent Report </h2>
//       </DialogTitle>
//       <DialogDescription asChild>
//         <div className='mt-5'>

//             {/* Session Info */}
//             <h2 className='font-bold text-blue-500 text-lg'>Session Info</h2>
//             <hr className='my-2 border-blue-500' />
//             <div className='grid grid-cols-2 gap-2'>
//                 <h2><span className='font-bold'>Doctor: </span>{record?.selectedDoctor?.specialist}</h2>
//                 <h2><span className='font-bold'>User: </span>{record?.userName ?? 'Anonymous'}</h2>
//                 <h2><span className='font-bold'>Consulted On: </span>
//                     {moment(new Date(record?.createdOn)).format('MMMM Do YYYY, h:mm a')}
//                 </h2>
//                 <h2><span className='font-bold'>Agent: </span>{record?.selectedDoctor?.name ?? 'General Physician AI'}</h2>
//             </div>

//             {/* Chief Complaint */}
//             <h2 className='font-bold text-blue-500 text-lg mt-5'>Chief Complaint</h2>
//             <hr className='my-2 border-blue-500' />
//             <p className='text-gray-700'>{report?.chiefComplaint ?? 'N/A'}</p>

//             {/* Summary */}
//             <h2 className='font-bold text-blue-500 text-lg mt-5'>Summary</h2>
//             <hr className='my-2 border-blue-500' />
//             <p className='text-gray-700'>{report?.summary ?? 'N/A'}</p>

//             {/* Symptoms */}
//             <h2 className='font-bold text-blue-500 text-lg mt-5'>Symptoms</h2>
//             <hr className='my-2 border-blue-500' />
//             <ul className='list-disc list-inside text-gray-700 space-y-1'>
//                 {report?.symptoms?.length > 0
//                     ? report.symptoms.map((symptom: string, index: number) => (
//                         <li key={index}>{symptom}</li>
//                       ))
//                     : <li>No symptoms recorded</li>
//                 }
//             </ul>

//             {/* Duration & Severity */}
//             <h2 className='font-bold text-blue-500 text-lg mt-5'>Duration & Severity</h2>
//             <hr className='my-2 border-blue-500' />
//             <div className='grid grid-cols-2 gap-2 text-gray-700'>
//                 <h2><span className='font-bold'>Duration: </span>{report?.duration ?? 'N/A'}</h2>
//                 <h2><span className='font-bold'>Severity: </span>{report?.severity ?? 'N/A'}</h2>
//             </div>

//             {/* Recommendations */}
//             <h2 className='font-bold text-blue-500 text-lg mt-5'>Recommendations</h2>
//             <hr className='my-2 border-blue-500' />
//             <ul className='list-disc list-inside text-gray-700 space-y-1'>
//                 {report?.recommendations?.length > 0
//                     ? report.recommendations.map((rec: string, index: number) => (
//                         <li key={index}>{rec}</li>
//                       ))
//                     : <li>No recommendations available</li>
//                 }
//             </ul>

//             {/* Medications */}
//             <h2 className='font-bold text-blue-500 text-lg mt-5'>Medications</h2>
//             <hr className='my-2 border-blue-500' />
//             <ul className='list-disc list-inside text-gray-700 space-y-1'>
//                 {report?.medications?.length > 0
//                     ? report.medications.map((med: string, index: number) => (
//                         <li key={index}>{med}</li>
//                       ))
//                     : <li>No medications prescribed</li>
//                 }
//             </ul>

//             {/* Follow Up */}
//             <h2 className='font-bold text-blue-500 text-lg mt-5'>Follow Up</h2>
//             <hr className='my-2 border-blue-500' />
//             <p className='text-gray-700'>{report?.followUp ?? 'N/A'}</p>

//             {/* Disclaimer */}
//             <p className='text-xs text-gray-400 mt-6 border-t pt-3'>
//                 ⚠️ This report is AI-generated for informational purposes only. 
//                 Please consult a licensed medical professional before making any health decisions.
//             </p>

//         </div>
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>
    
//   )
// }

// export default ViewReportDialog



import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'

type ReportData = {
  sessionid?: string
  agent?: string
  user?: string
  timestamp?: string
  chiefComplaint?: string
  summary?: string
  symptoms?: string[]
  duration?: string
  severity?: string
  medicationsMentioned?: string[]
  recommendations?: string[]
}

type props = {
  record: SessionDetail
}

function ViewReportDialog({ record }: props) {
  const report = record?.report as unknown as ReportData | null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} size={'sm'}>View Report</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className='text-center text-2xl font-bold'>🩺 Medical AI Voice Agent Report</h2>
          </DialogTitle>

          <DialogDescription asChild>
            <div className='mt-4 text-sm text-foreground space-y-5'>

              {/* ── Session Info ── */}
              <section>
                <h3 className='font-bold text-blue-500 text-base'>Session Info:</h3>
                <hr className='my-1 border-blue-400' />
                <div className='grid grid-cols-2 gap-x-4 gap-y-1 mt-2'>
                  <div>
                    <span className='font-semibold'>Doctor: </span>
                    {record.selectedDoctor?.specialist ?? '—'}
                  </div>
                  <div>
                    <span className='font-semibold'>User: </span>
                    {report?.user ?? 'Anonymous'}
                  </div>
                  <div>
                    <span className='font-semibold'>Agent: </span>
                    {report?.agent ?? `${record.selectedDoctor?.specialist} AI`}
                  </div>
                  <div>
                    <span className='font-semibold'>Consulted On: </span>
                    {moment(new Date(record?.createdOn)).format('MMMM Do YYYY, h:mm a')}
                  </div>
                </div>
              </section>

              {/* ── Chief Complaint ── */}
              {report?.chiefComplaint && (
                <section>
                  <h3 className='font-bold text-blue-500 text-base'>Chief Complaint:</h3>
                  <hr className='my-1 border-blue-400' />
                  <p className='mt-1'>{report.chiefComplaint}</p>
                </section>
              )}

              {/* ── Summary ── */}
              {report?.summary && (
                <section>
                  <h3 className='font-bold text-blue-500 text-base'>Summary:</h3>
                  <hr className='my-1 border-blue-400' />
                  <p className='mt-1'>{report.summary}</p>
                </section>
              )}

              {/* ── Symptoms ── */}
              {report?.symptoms && report.symptoms.length > 0 && (
                <section>
                  <h3 className='font-bold text-blue-500 text-base'>Symptoms:</h3>
                  <hr className='my-1 border-blue-400' />
                  <ul className='list-disc list-inside mt-1 space-y-0.5'>
                    {report.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* ── Duration & Severity ── */}
              {(report?.duration || report?.severity) && (
                <section>
                  <h3 className='font-bold text-blue-500 text-base'>Duration & Severity:</h3>
                  <hr className='my-1 border-blue-400' />
                  <div className='mt-1 space-y-0.5'>
                    {report?.duration && (
                      <p><span className='font-semibold'>Duration: </span>{report.duration}</p>
                    )}
                    {report?.severity && (
                      <p><span className='font-semibold'>Severity: </span>{report.severity}</p>
                    )}
                  </div>
                </section>
              )}

              {/* ── Medications Mentioned ── */}
              {report?.medicationsMentioned && report.medicationsMentioned.length > 0 && (
                <section>
                  <h3 className='font-bold text-blue-500 text-base'>Medications Mentioned:</h3>
                  <hr className='my-1 border-blue-400' />
                  <ul className='list-disc list-inside mt-1 space-y-0.5'>
                    {report.medicationsMentioned.map((med, index) => (
                      <li key={index}>{med}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* ── Recommendations ── */}
              {report?.recommendations && report.recommendations.length > 0 && (
                <section>
                  <h3 className='font-bold text-blue-500 text-base'>Recommendations:</h3>
                  <hr className='my-1 border-blue-400' />
                  <ul className='list-disc list-inside mt-1 space-y-0.5'>
                    {report.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Fallback if no report generated yet */}
              {!report && (
                <p className='text-center text-gray-400 py-6'>
                  No report generated yet for this session.
                </p>
              )}

            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog