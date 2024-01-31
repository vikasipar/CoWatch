import { atom } from 'recoil';

export const homeAtom = atom({
    key: "homekey",
    default: true,
});

export const loadingAtom = atom({
    key: "loadingkey",
    default: false,
});

export const searchTermAtom = atom ({
    key: "searchTermkey",
    default: '',
});

export const videosAtom = atom ({
    key: "videoskey",
    default: [],
});

export const selectedVideosAtom = atom ({
    key: "selectedVideoskey",
    default: null,
});

export const clickedVideoIdAtom = atom ({
    key: "clickedVideoIdkey",
    default: null,
});