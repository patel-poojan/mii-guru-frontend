import React from "react";
import { FaBackward, FaForward, FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { VscCopilot } from "react-icons/vsc";

function ControlButtons({
  playing,
  handlePlayPauseBtnClick,
  handleBackwardBtnClick,
  handleForwardBtnClick,
  isForwardEnabled,
  // isChatOpen,
  // setIsChatOpen,
  minusTen,
  plusTen,
  // topicID,
  // availSpeeds,
  // speedVarToIterate,
  // setSpeedVarToIterate,
  // setPlaybackSpeed,
  // playerRef,
  // trackAudioAction,
  // playbackSpeed
  // topicID
  isChatFullScreen,
  setIsChatFullScreen,
}: {
  playing: boolean;
  handlePlayPauseBtnClick: () => void;
  handleBackwardBtnClick: () => void;
  handleForwardBtnClick: () => void;
  isForwardEnabled: boolean;
  // isChatOpen: boolean,
  // setIsChatOpen: (value: boolean) => void,
  minusTen: boolean;
  plusTen: boolean;
  // availSpeeds: number[],
  // speedVarToIterate: number,
  // setSpeedVarToIterate: (value: number) => void,
  // setPlaybackSpeed: (value: number) => void,
  // playerRef: any,
  // trackAudioAction: (action: string, currentPosition: number, newSpeed: number) => void,
  // playbackSpeed: number
  // topicID: string
  isChatFullScreen: boolean;
  setIsChatFullScreen: (value: boolean) => void;
}) {
  return (
    <>
      <div className="sticky z-20 bottom-0 w-full grid grid-cols-1 md:grid-cols-[1fr_0.4fr] md:gap-6">
        <div className="bg-white py-5">
          <div className="border-t  w-full mx-auto rounded-lg bg-gray-200">
            <nav className="max-w-3xl mx-auto px-4 py-3 md:py-4 w-full">
              <ul className="flex flex-wrap justify-between md:items-center place-items-end">
                <li>
                  <button
                    className="relative flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300"
                    onClick={handleBackwardBtnClick}
                  >
                    <FaBackward className="h-5 w-5" />
                    <span className="text-xs">Backward</span>
                    {minusTen && (
                      <span className="absolute top-[2px] md:top-[3px] right-10 md:right-11 text-xs">
                        -10s
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300 "
                    onClick={handlePlayPauseBtnClick}
                  >
                    {playing ? <FaPause size={21} /> : <FaPlay size={17} />}
                    {playing ? (
                      <span className="text-xs">Pause</span>
                    ) : (
                      <span className="text-xs">Play</span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    className={`relative flex flex-col items-center gap-1  transition-all duration-300 ${
                      isForwardEnabled ? "hover:scale-110" : "opacity-40"
                    }`}
                    disabled={!isForwardEnabled}
                    onClick={handleForwardBtnClick}
                  >
                    <FaForward className="h-5 w-5" />
                    <span className="text-xs">Forward</span>
                    {plusTen && (
                      <span className="absolute top-[2px] md:top-[3px] -right-4 md:-right-5 text-xs">
                        +10s
                      </span>
                    )}
                  </button>
                </li>
                {/* speed  */}
                {/* <li>
                <button
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300"
                  onClick={() => {
                    const nextIndex = speedVarToIterate + 1;
                    const newSpeed = availSpeeds[nextIndex % availSpeeds.length];
                    setSpeedVarToIterate(nextIndex);
                    setPlaybackSpeed(newSpeed);
                    
                    // Track speed change
                    if (playerRef.current) {
                      const currentPosition = playerRef.current.getCurrentTime();
                      trackAudioAction("speed", currentPosition, newSpeed);
                    }
                  }}
                >
                  <span className="text-base font-bold">{playbackSpeed}x</span>
                  <span className="text-xs">Speed</span>
                </button>
              </li> */}
                <li>
                  <button
                    className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300"
                    onClick={() => setIsChatFullScreen(!isChatFullScreen)}
                  >
                    <VscCopilot className="h-5 w-5" />
                    <span className="text-xs">CoPilot</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default ControlButtons;
