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

type props = {
    record: SessionDetail
}

function ViewReportDialog({record}:props) {
    
  return (

      <Dialog>
  <DialogTrigger><Button variant={'link'} size={'sm'}>View Report</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle asChild>
        <h2 className='text-center text-4xl'>AI Medical Voice Agent Report </h2>
      </DialogTitle>
      <DialogDescription asChild>
        <div className='mt-10'>
            <h2 className='font-bold text-blue-500 text-lg'>Session Info:</h2>
            <hr className='my-2 border-blue-500 border-width-bold' />
            <div className='grid-cols-2'>
               
                    <h2><span className='font-bold'>Doctor Specialization: </span>{record.selectedDoctor?.specialist}</h2>
                    <h2>Consultant Date {moment (new Date(record?.createdOn)).format('MMMM Do YYYY, h:mm:ss a')}</h2>
                    {/* <h2>Chief Complaint :{record.createdOn }</h2> */}

            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    
  )
}

export default ViewReportDialog
