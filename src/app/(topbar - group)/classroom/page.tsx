"use client";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import ControlButtons from "@/app/Components/classroom/ControlButtons";
import TopicSection from "@/app/Components/classroom/TopicSection";
import Avtar from "@/app/Components/classroom/Avtar";
import PresentationSection from "@/app/Components/classroom/PresentationSection";
import ChatCoPilot from "@/app/Components/classroom/ChatCoPilot";
interface WeeklyTopic {
  week: number;
  topics: string;
  description: string;
}
interface PresentationData {
  success: boolean;
  status: number;
  message: string;
  data: {
    topic_id: string;
    topic_name: string;
    subject_name: string;
    class_name: string;
    html_content: string;
  };
} 
interface SyllabusResponse {
  data?: {
    weekly_schedule?: WeeklyTopic[];
  };
}
export default function Index() {
  const [open, setOpen] = useState(false);
  const [isPptOpen, setIsPptOpen] = useState(false);

  const [topics, setTopics] = useState([
    { id: 1, title: "Loading...", content: "Content 1" },
  ]);

  const [topicID] = useState("67dd4f3bada69ae06e9769c7");

  // Audio player states
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [playbackSpeed] = useState(1);
  // const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  // const [progress,setProgress] = useState(0); //progress line in video control to show the progress of video and drag to seek
  const [duration, setDuration] = useState(0);
  // const [availSpeeds] = useState([1, 1.25, 1.5, 1.75, 2, 0.5, 0.75]);
  // const [speedVarToIterate, setSpeedVarToIterate] = useState(0);
  const [minusTen, setMinusTen] = useState(false);
  const [totalMinus, setTotalMinus] = useState(0);
  const [plusTen, setPlusTen] = useState(false);
  const [isForwardEnabled, setIsForwardEnabled] = useState(false);
  // Audio tracking states
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [, setLastTrackingTime] = useState<number | null>(null);
  // const [playbackHistory, setPlaybackHistory] = useState<Array<{ action: string; timestamp: number; position: number; speed: number }>>([]);
  const [isFirstPlay, setIsFirstPlay] = useState(true);

  const [isHoveredOnImage, setIsHoveredOnImage] = useState(false);
  const [isHoveredOnImageOnControl, setIsHoveredOnImageOnControl] =
    useState(false);
  // const [isChatOpen, setIsChatOpen] = useState(false);

  const [data] = useState(null);
  console.log("data", data);
  const [syllabusData, setSyllabusData] = useState<SyllabusResponse | null>(null);
  console.log("syllabusData", syllabusData);
  const [presentationData, setPresentationData] = useState<PresentationData | null>();
  console.log("presentationData", presentationData);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [isChatFullScreen, setIsChatFullScreen] = useState(false);

  const base_url = "http://3.6.140.234:8002";
  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXJ0aGt1a2FkaXlhNzFAZ21haWwuY29tIiwiZXhwIjoxNzQzNDEyMzgzLjM4MzI0N30.s3RBtzAD0hFtLUNQ1bZx5GpF3c43NfdlW3-XRzPwPUM";
  const subject = "biology";
  const class_grade = "9";
  const trackAudioAction = async (
    action: string,
    position: number,
    speed: number
  ) => {
    try {
      const endpoint = `http://3.6.140.234:8002/api/topic/audio/track/${action}/${topicID}`;
      const currentTime = Date.now();

      const payload = {
        event_type: action,
        position_seconds: position,
        speed: speed,
        timestamp: currentTime,
      };
      // // Add to history for debugging/logging
      // setPlaybackHistory(prev => [...prev, {
      //   action,
      //   timestamp: currentTime,
      //   position,
      //   speed
      // }]);
      await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      setLastTrackingTime(currentTime);
    } catch (err) {
      console.error(`Error tracking ${action}:`, err);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `http://3.6.140.234:8002/api/topic/audio/${topicID}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${AUTH_TOKEN}`,
  //           },
  //         }
  //       );
  //       setData(response.data);
  //     } catch (err) {
  //       console.error("Error fetching audio data:", err);
  //       setError("Failed to load audio. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchPresentationData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://3.6.140.234:8002/syllabus/presentation/${topicID}`,
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
          }
        );
        setPresentationData(response.data);
      } catch (err) {
        console.error("Error fetching Presentation data:", err);
        setError("Failed to load Presentation data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPresentationData();
  }, []);

  useEffect(() => {
    const fetchSyllabusData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/user/syllabus/${subject}?class_grade=${class_grade}`,
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
          }
        );
        setSyllabusData(response.data);
      } catch (err) {
        console.log("Error fetching syllabus data:", err);
        setError("Failed to load syllabus data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabusData();
  }, []);

  const handlePlayPauseBtnClick = () => {
    const newPlayingState = !playing;
    setPlaying(newPlayingState);

    const currentPosition = playerRef.current
      ? playerRef.current.getCurrentTime()
      : 0;

    if (newPlayingState) {
      if (isFirstPlay) {
        trackAudioAction("start", currentPosition, playbackSpeed);
        setIsFirstPlay(false);
        setSessionStartTime(Date.now());
      } else {
        trackAudioAction("start", currentPosition, playbackSpeed);
      }
    } else {
      trackAudioAction("pause", currentPosition, playbackSpeed);
    }
  };

  const handleBackwardBtnClick = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const newPosition = Math.max(currentTime - 10, 0);
      playerRef.current.seekTo(newPosition);
      setMinusTen(true);
      setTimeout(() => {
        setMinusTen(false);
      }, 200);
      setTotalMinus(totalMinus + 1);
      // trackAudioAction("seekBackward", newPosition, playbackSpeed);
    }
  };

  const handleForwardBtnClick = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const maxDuration = playerRef.current.getDuration();
      const newPosition = Math.min(currentTime + 10, maxDuration);
      playerRef.current.seekTo(newPosition);
      setPlusTen(true);
      setTimeout(() => {
        setPlusTen(false);
      }, 200);
      setTotalMinus(totalMinus - 1);
      // trackAudioAction("seekForward", newPosition, playbackSpeed);
    }
  };
  useEffect(() => {
    if (totalMinus > 0) {
      setIsForwardEnabled(true);
    } else {
      setIsForwardEnabled(false);
    }
  }, [totalMinus]);
  // const handleSpeedChange = (speed: number) => {
  //   setPlaybackSpeed(speed);
  //   setShowSpeedOptions(false);

  //   if (playerRef.current) {
  //     const currentPosition = playerRef.current.getCurrentTime();
  //     trackAudioAction("speed", currentPosition, speed);
  //   }
  // };

  // Track progress and handle completion
  // const handleProgress = (state: {
  //   played: number;
  //   playedSeconds: number;
  //   loaded: number;
  //   loadedSeconds: number;
  // }) => {
  //   // setProgress(state.played * 100);

  //   // Periodic tracking (every 30 seconds)
  //   const now = Date.now();
  //   if (playing && (!lastTrackingTime || now - lastTrackingTime > 30000)) {
  //     // trackAudioAction("progress", state.playedSeconds, playbackSpeed);
  //   }

  //   // Handle completion
  //   if (state.played > 0.99 && playing) {
  //     trackAudioAction("stop", state.playedSeconds, playbackSpeed);
  //   }
  // };

  // Track when user seeks via progress bar
  // const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const progressBar = e.currentTarget;
  //   const rect = progressBar.getBoundingClientRect();
  //   const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
  //   setProgress(pos * 100);

  //   if (playerRef.current) {
  //     playerRef.current.seekTo(pos);
  //     const timeInSeconds = pos * duration;
  //     trackAudioAction("seek", timeInSeconds, playbackSpeed);
  //   }
  // };

  useEffect(() => {
    return () => {
      if (sessionStartTime && playerRef.current) {
        const finalPosition = playerRef.current.getCurrentTime();
        trackAudioAction("stop", finalPosition, playbackSpeed);
      }
    };
  }, [sessionStartTime]);

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // const formatTime = (seconds: number): string => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = Math.floor(seconds % 60);
  //   return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  // };

  // const speedOptions = [0.5, 1, 1.5, 2];
  useEffect(
    () =>
      setTopics(
        syllabusData?.data?.weekly_schedule?.map((topic) => {
          return {
            id: topic.week,
            title: topic.topics,
            content: topic.description,
          };
        }) || []
      ),
    [syllabusData]
  );
  return (
    <div className="w-full flex flex-col relative text-small md:text-regular max-h-lvh ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.4fr] md:gap-6 h-full">
        <div className="relative h-full bg-transparent rounded-xl flex flex-col gap-4">
          <div className="md:hidden block w-full rounded-xl bg-[url('/img/classroom/classroom_avtar_dummy_img.png')]">
            <img
              className="w-full h-52 object-cover rounded-xl  opacity-40"
              width={500}
              height={500}
              alt="Classroom"
            />
          </div>
          <PresentationSection
          isLoading={loading}
            isPptOpen={isPptOpen}
            setIsPptOpen={setIsPptOpen}
            presentationData={presentationData || {
              success: false,
              status: 0,
              message: '',
              data: {
                topic_id: '',
                topic_name: '',
                subject_name: '',
                class_name: '',
                html_content: ''
              }
            }}
          />
          <div className="border-2 border-gray-300 my-3 "></div>
          <div className="bg-gray-200 min-h-[25rem] max-h-[40rem] mb-10 md:mb-10 w-full rounded-xl">
            <ChatCoPilot
              base_url={base_url}
              topicID={topicID}
              AUTH_TOKEN={AUTH_TOKEN}
              isChatFullScreen={isChatFullScreen}
              setIsChatFullScreen={setIsChatFullScreen}
            />
          </div>
        </div>

        <div className="flex-1 h-full">
          <div className="max-w-3xl mx-auto  ">
            <div className="relative hidden md:flex items-center gap-4 my-2 md:my-6 md:mt-0 mb-6 w-full rounded-xl">
              <Avtar
                // audioData={data}
                playing={playing}
                setPlaying={setPlaying}
                isForwardEnabled={isForwardEnabled} 
                minusTen={minusTen}
                plusTen={plusTen}
                playerRef={playerRef}
                playbackSpeed={playbackSpeed}
                duration={duration}
                handlePlayPauseBtnClick={handlePlayPauseBtnClick}
                handleBackwardBtnClick={handleBackwardBtnClick}
                handleForwardBtnClick={handleForwardBtnClick}
                isHoveredOnImage={isHoveredOnImage}
                setIsHoveredOnImage={setIsHoveredOnImage}
                isHoveredOnImageOnControl={isHoveredOnImageOnControl}
                setIsHoveredOnImageOnControl={setIsHoveredOnImageOnControl}
                handleDuration={handleDuration}
                // handleProgress={handleProgress}
                trackAudioAction={trackAudioAction}
                // topicID={topicID}
              />
            </div>
            <TopicSection
              topics={topics}
              open={open}
              setOpen={setOpen}
              // topicID={topicID}
              baseUrl={base_url}
              AUTH_TOKEN={AUTH_TOKEN}
            />
          </div>
        </div>
      </div>

      <ControlButtons
        playing={playing}
        handleBackwardBtnClick={handleBackwardBtnClick}
        handlePlayPauseBtnClick={handlePlayPauseBtnClick}
        handleForwardBtnClick={handleForwardBtnClick}
        isForwardEnabled={isForwardEnabled}
        plusTen={plusTen}
        minusTen={minusTen}
        // isChatOpen={isChatOpen}
        // setIsChatOpen={setIsChatOpen}
        // speedVarToIterate={speedVarToIterate}
        // availSpeeds={availSpeeds}
        // setSpeedVarToIterate={setSpeedVarToIterate}
        // setPlaybackSpeed={setPlaybackSpeed}
        // playerRef={playerRef}
        // trackAudioAction={trackAudioAction}
        // playbackSpeed={playbackSpeed}
        // topicID={topicID}
        isChatFullScreen={isChatFullScreen}
        setIsChatFullScreen={setIsChatFullScreen}
      />
    </div>
  );
}
