import React from 'react';
import axios from "axios";
import { searchTermAtom, videosAtom, selectedVideosAtom, loadingAtom, clickedVideoIdAtom, homeAtom } from '../store/atoms/search';
import { useRecoilValue ,useSetRecoilState } from 'recoil';

function Navbar() {
    const searchTerm = useRecoilValue(searchTermAtom);
    const setSearchTerm = useSetRecoilState(searchTermAtom);
    const setVideos = useSetRecoilState(videosAtom);
    const setSelectedVideo = useSetRecoilState(selectedVideosAtom);
    const setLoading = useSetRecoilState(loadingAtom);
    const setClickedVideoId = useSetRecoilState(clickedVideoIdAtom);
    const setHomeAtom = useSetRecoilState(homeAtom);

    const apikey = import.meta.env.VITE_API_KEY;

    const submitHandler = async(event) => {
        event.preventDefault();
        setLoading(true);
        setClickedVideoId(null);
        setHomeAtom(false);

        try{
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                   part: 'snippet',
                   maxResults: 20,
                    key: apikey,
                    q: searchTerm,
                  }
             });
             setVideos(response.data.items);
             setSelectedVideo(response.data.items[0]);
            //  console.log(response.data.items[0]);
        }
        catch(error){
            console.error("Fetch error: ",error);
        }finally{
            setLoading(false);
        }
    }

    const changeHandler = (event) => {
        setSearchTerm(event.target.value);
    }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between m-0">
        <img src="https://download.logo.wine/logo/YouTube/YouTube-Logo.wine.png" alt="youtube" className="w-36 md:w-48 cursor-pointer" onClick={() => setHomeAtom(true)} />
        <form onSubmit={submitHandler} className="flex justify-center w-[90%]">
            <input
                type="text" 
                placeholder='Search...' 
                onChange={changeHandler} 
                value={searchTerm}
                className="w-64 px-4 py-1 md:w-96 md:px-6 md:mt-1 md:py-1 border border-gray-700 rounded-l-2xl" 
            />
            <button 
                type="submit" 
                className="border py-1 md:mt-1 px-3 border-gray-900 rounded-r-2xl border-l-0 hover:bg-gray-200"
            >
                <img src="https://www.freeiconspng.com/uploads/search-icon-png-9.png" alt="search" className="w-5 bg-blend-multiply" /> 
            </button>
        </form>
    </div>
  )
}

export default Navbar;