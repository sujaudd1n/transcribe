"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Recording = ({ recordings, setRecordings }) => {
    const { toast } = useToast()

    function getTranscription(id) {
        toast({
            description: "Please wait!."
        })
        /* make request to server to transcribe audio */
        const recording = recordings.find(recording => recording.id === id)
        const formData = new FormData();
        formData.append('myBlob', recording.audioBlob, 'example'); // Name, blob, filename

        fetch('http://localhost:8000/transcribe', {
            method: "POST",
            body: formData
        })
            .then(res => res.text())
            .then(transcription => {
                console.log(transcription)
                setRecordings(recordings.map(
                    recording => {
                        if (recording.id === id) {
                            recording.transcription = transcription;
                            recording.isTranscribed = true;
                        }
                        return recording;
                    }
                ));
                toast({
                    description: "Audio has been transcribed."
                })
            })
            .catch(err => {
                console.log('error: ' + err)
                toast({
                    description: "Failed."
                })
            })
    }
    return (
        <div
            className='grow'
        >
            <h2 className='text-lg'>Recordings</h2>
            {!recordings.length && <p>No recordings available.</p>}
            <div className='flex flex-col gap-[20px]'>
                {recordings.map(recording => (
                    <div
                        key={recording.id}
                        className='flex flex-col items-stretch gap-[10px] p-[10px] bg-[#eee]'
                    >
                        <audio controls src={window.URL.createObjectURL(recording.audioBlob)}></audio>
                        {!recording.isTranscribed && <Button title='Transcribe' onClick={() => getTranscription(recording.id)}>Transcribe</Button>}
                        {recording.isTranscribed && <p>{recording.transcription}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recording;