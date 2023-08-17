import { useEffect, useState } from "react";

function SearchedVideos({ video, id }) {

    const [videoId, setVideoId]  = useState("");
    const [channelId, setChannelId]  = useState("");
    const [title, setTitle]  = useState("");
    const [channelTitle, setChannelTitle]  = useState("");
    const [description, setDescription]  = useState("");

    useEffect(() => {
        if(video){
            if(video.id.videoId){
            setVideoId(video.snippet.thumbnails.medium.url)
            setTitle(video.snippet.title);
            setChannelTitle(video.snippet.channelTitle);
            setDescription(video.snippet.description);
            }else{
            setChannelId(video.snippet.thumbnails.default.url);
            setTitle(video.snippet.title);
            setDescription(video.snippet.description);
            }
        }
    }, [video]);

    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    console.log(videoSrc);

  return (
    <div className="md:mx-14">
    <div className="mx-2 mt-7 md:mx-9">
            {
                videoId? (
                <div className="mx-9 md:mx-9 md:my-9 md:flex md:space-x-5 hover:cursor-pointer">
                    <img src={videoId} alt={videoId} className="rounded-lg md:rounded-xl hover:rounded-none hover:cursor-pointer" />
                    <div className="flex-col md:space-y-5">
                        <h2 className="text-lg md:text-xl text-left font-medium md:font-normal mt-2" >{title}</h2>
                        <h4 className="text-sm text-left text-gray-600" >
                            {channelTitle}
                        </h4>
                        <h5 className="hidden md:block text-left text-sm text-gray-600" >{description}</h5>
                    </div>
                </div>
                ) : (
                <div className="flex items-center mx-9 md:mx-9 md:my-7 sm:my-5 space-x-6 md:space-x-10">
                    <img src={channelId} alt={channelId} className="p-1 border border-2 border-red-600 rounded-full " />
                    <div className="flex-col space-y-3">
                        <h2 className="text-xl text-left font-medium md:font-normal" >{title}</h2>
                        <h5 className="hidden md:inline-block text-left text-sm text-gray-600" >{description}</h5>
                    </div>
                </div> )
            }
            
     </div>            
    </div>
  )
}

export default SearchedVideos;