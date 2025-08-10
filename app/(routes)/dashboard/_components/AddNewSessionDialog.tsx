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
import { ArrowRight } from 'lucide-react'
import axios from 'axios'

function AddNewSessionDialog() {
    const [note ,setNote] = useState <string>();
    const [loading , setLoading] = useState(false);
    const OnClickNext = async() => {
        setLoading(true);
        const result = await axios.post('/api/suggest-doctors',{
            notes: note
        })
            console.log(result.data);
            setLoading(false);
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Button className='mt-3'>+ Start Consultaion</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <h2>Add Symptoms Or Any Other Details</h2>
                            <Textarea placeholder='Add Detail Here...' className='h-[200px] mt-1'
                            onChange={(e) => setNote(e.target.value)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={'outline'} >Cancel</Button>
                    </DialogClose>
                    
                    <Button disabled={!note} onClick={()=> OnClickNext()}>Next <ArrowRight />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewSessionDialog
