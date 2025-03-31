"use client";

import { FaBackward, FaForward, FaPause } from "react-icons/fa6";
import ReactPlayer from "react-player";
import {
  FaPlay
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Avtar({
  audio,
    playing,
    setPlaying,
    handlePlayPauseBtnClick,
    handleBackwardBtnClick,
    handleForwardBtnClick,
    isForwardEnabled,
    minusTen,
    plusTen,
    playerRef,
    // handleProgress,
    handleDuration,
    trackAudioAction,
    playbackSpeed,
    // setPlaybackSpeed,
    duration,
    setIsHoveredOnImage,
    isHoveredOnImage,
    isHoveredOnImageOnControl,
    setIsHoveredOnImageOnControl,
    // topicID,
}:{
  audio: string | null;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  handlePlayPauseBtnClick: () => void;
  handleBackwardBtnClick: () => void;
  handleForwardBtnClick: () => void;
  isForwardEnabled: boolean;
  minusTen: boolean;
  plusTen: boolean;
  playerRef: React.RefObject<ReactPlayer | null>;
  // handleProgress: (state: { played: number; playedSeconds: number }) => void;
  handleDuration: (duration: number) => void; 
  trackAudioAction: (action: string, currentPosition: number, newSpeed: number) => void;
  playbackSpeed: number;
  duration: number;
  setIsHoveredOnImage: (value: boolean) => void;
  isHoveredOnImage: boolean;
  isHoveredOnImageOnControl: boolean;
  setIsHoveredOnImageOnControl: (value: boolean) => void;
}) {
  // const [audioUrl, ] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // console.log("audioUrl", audioUrl);
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Change the delay as needed
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setIsHoveredOnImage(true);
    setIsHoveredOnImageOnControl(true);
  }, []);
  // useEffect(() => {
  //   if (audioUrl) {
  //     setLoading(false);
  //   }
  // }, [audioUrl]);

  if(loading) {
    return (<div className="animate-pulse">
      <Skeleton className="w-full h-52 rounded-xl" />
      <div className="absolute bottom-0 bg-gray-200 left-0 right-0 p-2 rounded-b-xl flex justify-center gap-8 mt-2">
        <Skeleton className="w-8 h-8 rounded-full bg-primary/20" />
        <Skeleton className="w-8 h-8 rounded-full bg-primary/20" />
        <Skeleton className="w-8 h-8 rounded-full bg-primary/20" />
      </div>
    </div>)
        }
  return (
    <>
    <div className="hidden">
                <ReactPlayer
                  ref={playerRef}
                  // url={'/audios/classroom/1742558025_0a64700c_c933_4098_9820_f0bc2278481b.mp3'}
                  url={audio || ""}
                  playing={playing}
                  autoPlay={true}
                  controls={true}
                  // playbackSpeed={playbackSpeed}
                  // onProgress={handleProgress}
                  onDuration={handleDuration}
                  width="100%"
                  height="100px"
                  hidden
                  className="bg-red-300 z-10 opacity-0"
                  config={{
                    file: {
                      forceAudio: true,
                    },
                  }}
                  onEnded={() => {
                    setPlaying(false);
                    trackAudioAction("stop", duration, playbackSpeed);
                  }}
                />
              </div>

              <div className="relative w-full">
                <div
                  onClick={handlePlayPauseBtnClick}
                  onMouseEnter={() => {
                    setIsHoveredOnImage(true);
                  }}
                  onMouseLeave={() => {
                    setIsHoveredOnImage(false);
                  }}
                  className="cursor-pointer"
                >
                  <img
                    className="w-full h-52 object-cover rounded-xl"
                    src="/img/classroom/classroom_avtar_dummy_img.png"
                    alt="Classroom"
                  />
                </div>

                {/* Video controls overlay */}
                {isHoveredOnImage || isHoveredOnImageOnControl ? (
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 py-3 rounded-b-xl"
                    onMouseEnter={() => {
                      setIsHoveredOnImageOnControl(true);
                    }}
                    onMouseLeave={() => {
                      setIsHoveredOnImageOnControl(false);
                    }}
                  >
                    {/* Timeline/progress bar */}
                    {/* <div
                      className="w-full h-1 bg-gray-500 rounded-full mb-2"
                      // onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-[var(--MainLight-color)] rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div> */}

                    {/* Time display */}
                    {/* <div className="flex text-xs text-white mb-2 px-1">
                      <span>{formatTime(duration * (progress / 100))}</span>
                      <span className="ml-auto">{formatTime(duration)}</span>
                    </div> */}

                    {/* Controls row */}
                    <div className="flex justify-center items-center">
                      {/* Left side empty space */}
                      {/* <div className="flex-1"></div> */}

                      {/* Center controls */}
                      <div className="flex items-center justify-center gap-8">
                        {/* Backward 10s */}
                        <button
                          onClick={handleBackwardBtnClick}
                          className="relative text-white hover:text-gray-300 transition"
                          aria-label="Backward 10 seconds"
                        >
                          <FaBackward size={22} />
                          {minusTen && (
                            <span className="absolute top-[2px] md:top-[3px] right-8 md:right-8 text-xs">
                              -10s
                            </span>
                          )}
                        </button>

                        <button
                          onClick={handlePlayPauseBtnClick}
                          className="text-white hover:text-gray-300 transition"
                          aria-label={playing ? "Pause" : "Play"}
                        >
                          {playing ? (
                            <FaPause size={22} className="scale-125" />
                          ) : (
                            <FaPlay size={19.5} />
                          )}
                        </button>

                        <button
                          onClick={handleForwardBtnClick}
                          className={`relative text-white hover:text-gray-300 transition ${
                            isForwardEnabled ? "" : "opacity-40"
                          }`}
                          aria-label="Forward 10 seconds"
                          disabled={!isForwardEnabled}
                        >
                          <FaForward size={22} />
                          {plusTen && (
                            <span className="absolute top-[2px] md:top-[3px] right-8 md:-right-8 text-xs">
                              +10s
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Right side - playback speed */}
                      {/* <div className="flex-1 flex justify-end">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowSpeedOptions(!showSpeedOptions)
                            }
                            className="text-white hover:text-gray-300 transition flex items-center gap-1"
                            aria-label="Playback speed"
                          >
                            <MdSpeed size={20} />
                            <span className="text-sm">{playbackSpeed}x</span>
                          </button>

                          {showSpeedOptions && (
                            <div className="absolute bottom-10 right-0 bg-black bg-opacity-75 rounded p-2 flex flex-col">
                              {speedOptions.map((speed) => (
                                <button
                                  key={speed}
                                  onClick={() => handleSpeedChange(speed)}
                                  className={`text-white hover:text-gray-300 py-1 px-3 text-sm ${
                                    playbackSpeed === speed ? "font-bold" : ""
                                  }`}
                                >
                                  {speed}x
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div> */}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
    </>
  )
}

export default Avtar