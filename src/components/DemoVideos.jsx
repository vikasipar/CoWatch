import { data } from './DemoData.js';
import { clickedVideoIdAtom, homeAtom } from '../store/atoms/search';
import { useSetRecoilState } from "recoil";

function DemoVideos() {
  const setClickedVideoId = useSetRecoilState(clickedVideoIdAtom);
  const setHomeAtom = useSetRecoilState(homeAtom);
  // console.log("rendered: home");

  return (
    <div>
      <div className='md:w-[90%] flex flex-wrap mt-1 justify-center md:mx-0'>
        {
            data.map((v) => (
                <div key={v.id} onClick={() => {setClickedVideoId(v.id); setHomeAtom(false)}} className='mx-1 font-medium hover:cursor-pointer'>
                    <img src={v.thumbnail} alt={v.id} className='rounded-xl my-3'/>
                    <h2 className='w-80'>{v.title}</h2>
                    <h4 className='text-sm text-gray-500'>{v.channel}</h4>
                </div>
            ))
        }
    </div>
    </div>
  )
}

export default DemoVideos;