import React, { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { FiCopy } from "react-icons/fi";
import { LuYoutube } from "react-icons/lu";

const VideoCall = () => {
    const [roomId, setRoomId] = useState('');
    const [localroomId, setLocalroomId] = useState('');
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [callConnected, setCallConnected] = useState(false);
    const [shareScreen, setShareScreen] = useState(false);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const screenShareRef = useRef(null);
    const peer = useRef(null);
    const call = useRef(null);

    useEffect(() => {
        peer.current = new Peer();
        peer.current.on('open', (id) => {
            setLocalroomId(id);
        });

        // get user media (i.e. audio, video)
        navigator.mediaDevices.getUserMedia({ video: true, audio: true})
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
            })
            .catch((error) => {
                console.error("Error accessing media devices: ", error);
            });
        
        // answer incoming call
        peer.current.on('call', (incomingCall) => {
            setCallConnected(true);
            call.current = incomingCall;
            call.current.answer(localVideoRef.current.srcObject);
            call.current.on('stream', (stream) => {
                remoteVideoRef.current.srcObject = stream;
            });
            // handle call close
            call.current.on('close', () => {
                setCallConnected(false);
                remoteVideoRef.current.srcObject = null;
            });
        });
    }, []);

    const handleJoinMeeting = async () => {
        if (shareScreen) {
            try {
                // Get the screen stream
                const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    
                // Display the screen stream locally
                screenShareRef.current.srcObject = screenStream;
    
                // Call remote peer with the screen stream
                call.current = peer.current.call(roomId, screenStream);
    
                // Handle call close
                call.current.on('close', () => {
                    screenShareRef.current.srcObject = null;
                });
            } catch (error) {
                console.error("Error accessing screen media devices: ", error);
            }
        } else {
            // Call remote peer with the local video stream
            call.current = peer.current.call(roomId, localVideoRef.current.srcObject);
    
            // Display the remote stream in the remote video element
            call.current.on('stream', (stream) => {
                remoteVideoRef.current.srcObject = stream;
            });
    
            // Handle call close
            call.current.on('close', () => {
                remoteVideoRef.current.srcObject = null;
            });
        }
        setCallConnected(true);
    };

    const handleStopSharing = () => {
        setShareScreen(false);
        screenShareRef.current.srcObject = null;
        handleJoinMeeting();
    };

    const toggleAudio = () => {
        const enabled = !audioEnabled;
        localVideoRef.current.srcObject.getAudioTracks().forEach(track => {
            track.enabled = enabled;
        });
        setAudioEnabled(enabled);
    };

    const toggleVideo = () => {
        const enabled = !videoEnabled;
        localVideoRef.current.srcObject.getVideoTracks().forEach(track => {
            track.enabled = enabled;
        });
        setVideoEnabled(enabled);
    };

    const handleFullScreenMode = () => {
        const remoteVideo = remoteVideoRef.current;
        remoteVideo.webkitRequestFullScreen();
    };

    const handleFullScreenModeLocal = () => {
        const localVideo = screenShareRef.current;
        localVideo.webkitRequestFullScreen();
    };

    const copyid = async() => {
        await navigator.clipboard.writeText(localroomId);
        alert('room id copied!');
    };

    return (
        <div className='flex md:flex-col w-full h-32 px-1 md:px-auto md:h-auto md:w-[16%] mx-auto fixed md:fixed border-2 border-gray-200 rounded md:px-3 md:py-2 bg-transparent backdrop-blur-[10px] bottom-0 md:bottom-auto md:right-0 md:top-16 overflow-hidden md:shadow-3xl'>
            <h1 className='hidden md:flex md:items-center md:gap-2 text-left mb-2 text-orange-500 text-xl font-semibold'><LuYoutube className='text-2xl'/>CoWatch</h1>
            <div className='flex md:flex-col w-full md:space-y-5 my-auto'>
                <div className='w-[48%] md:w-[99%] mx-auto overflow-hidden'>
                    <video ref={localVideoRef} autoPlay playsInline className='z-10 rounded'></video>
                    <div className='flex items-center justify-around w-[20%] md:w-[40%] mx-[4%] md:mx-[30%] text-center z-20 my-[-6%] md:my-[-14%] absolute text-sm md:text-lg text-stone-900'>
                        <span onClick={toggleAudio} className='cursor-pointer p-1 bg-gray-200 rounded-full'>{audioEnabled ? <BsFillMicFill className='drop-shadow-2xl' /> : <BsFillMicMuteFill className='drop-shadow-2xl'/>}</span>
                        <span onClick={toggleVideo} className='cursor-pointer p-1 bg-gray-200 rounded-full'>{videoEnabled ? <IoVideocam className='drop-shadow-2xl'/> : <IoVideocamOff className='drop-shadow-2xl'/>}</span>
                    </div>
                </div>
                <div className={callConnected ? 'block w-[48%] md:w-[99%] mx-auto' : 'hidden'}>
                    <video ref={remoteVideoRef} onClick={handleFullScreenMode} autoPlay playsInline className='rounded cursor-pointer'></video>
                </div>
            </div>
            <div>
                <div className='flex items-center w-full md:w-[90%] my-3 mx-auto text-xs'>
                    <input type='text' value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder={`Enter friend's room id`} className='border border-orange-500 p-1 w-[70%] overflow-x-scroll h-[2rem] rounded-l' />
                    <button onClick={handleJoinMeeting} className='border border-orange-500 bg-orange-500 text-white p-1 w-[30%] h-[2rem] rounded-r'>Join</button>
                </div>
                <div className='flex text-center bg-white text-[10px] md:text-xs' onClick={copyid}>
                <FiCopy className='text-base'/>{localroomId}
                </div>
                { callConnected ? 
                <div className='mt-2 md:mt-6 text-[9px] md:text-xs space-x-1'>
                    <button onClick={() => {setShareScreen(true); handleJoinMeeting()}} className='bg-orange-500 text-white p-1 rounded mb-1'>Share Screen</button>
                    <button onClick={handleStopSharing} className='bg-orange-500 text-white p-1 rounded mb-1'>Stop Sharing</button>
                    <video ref={screenShareRef} onClick={handleFullScreenModeLocal} autoPlay playsInline className='hidden md:block z-10 rounded w-full h-28'></video>
                </div>
                :
                <div className='md:mt-7 text-xs text-left overflow-y-scroll md:overflow-y-hidden'>
                    <ul><b>Watch YouTube videos with a friend:</b>
                        <li className='mt-2'> Enter your friend's room ID and click "Join".</li>
                        <li className='mt-2'><b>OR</b></li>
                        <li className='mt-2'> Click the room id to copy and share it with your friend.</li>
                    </ul>
                </div>    
                }
            </div>
        </div>
    );
};

export default VideoCall;
