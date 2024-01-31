import React from "react";
import SearchedVideos from './SearchedVideos';
import DemoVideos from './DemoVideos';
import Loader from './Loader';
import WatchVideo from "./WatchVideo";
import { useRecoilValue  } from 'recoil';
import { homeAtom, videosAtom, selectedVideosAtom, loadingAtom, clickedVideoIdAtom } from '../store/atoms/search';

function HomePage() {
    const home = useRecoilValue(homeAtom);
    const videos = useRecoilValue(videosAtom);
    const loading = useRecoilValue(loadingAtom);
    const selectedVideo = useRecoilValue(selectedVideosAtom);
    const clickedVideoId = useRecoilValue(clickedVideoIdAtom);

  return (
    <div>
        {
        (home ? <DemoVideos/> 
            :
            loading? <Loader />
                : 
                (selectedVideo && !clickedVideoId) ? (videos.map((v) => <SearchedVideos video={v} key={v.id.videoId} id={v.id.videoId} />))
                    :
                    <WatchVideo/>
        )}
    </div>
  )
}

export default HomePage;