"use client";

import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { useState, useEffect } from 'react';

const Microphone = ({ setRecordings, recordings }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const audioChunks = [];

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mr = new MediaRecorder(stream);
                setMediaRecorder(mr);

            })
            .catch(error => console.log('Error:', error));
    }, []);

    const startRecording = async () => {
        setIsRecording(true);
        mediaRecorder.start();
        mediaRecorder.ondataavailable = (e) => {
            console.log(e.data)
            audioChunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
            console.log(audioChunks)
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav; codecs=0' });
            setRecordings([...recordings, { id: Math.floor(Math.random() * 1000), audioBlob: audioBlob, isTranscribed: false, transcription: '' }]);
        };
    }

    const stopRecording = () => {
        mediaRecorder.stop();
        setIsRecording(false);
    };


    return (
<<<<<<< HEAD:frontend/src/app/components/Microphone.jsx
        <div
            className='flex justify-between py-[10px] items-center grow md:self-start'
        >
            {!isRecording && <div className='h-[4px] grow m-[10px] bg-[#000]'></div>}
            {isRecording && <BarLoader className='grow m-[10px]' />}
            <Button
                variant='outline'
                size='icon'
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
=======
        <div>
            <Button
                variant='outline'
                size='icon'
>>>>>>> parent of 91e883c5 (Modify Recording):src/app/components/Microphone.jsx
                onClick={isRecording ? stopRecording : startRecording}
            >
                <Mic className='h-4 w-4' />
            </Button>
<<<<<<< HEAD:frontend/src/app/components/Microphone.jsx
=======
            {isRecording && <p>Recording in progress...</p>}
>>>>>>> parent of 91e883c5 (Modify Recording):src/app/components/Microphone.jsx
        </div>
    );
};

export default Microphone;