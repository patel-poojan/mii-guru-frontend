"use client";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import ControlButtons from "@/app/Components/classroom/ControlButtons";
import TopicSection from "@/app/Components/classroom/TopicSection";
import Avtar from "@/app/Components/classroom/Avtar";
import PresentationSection from "@/app/Components/classroom/PresentationSection";
import ChatCoPilot from "@/app/Components/classroom/ChatCoPilot";
import { axiosInstance } from "@/app/utils/axiosInstance";
import Cookies from 'js-cookie';

interface Topic {
  topic_id: string;
  week: number;
  title: string;
  content: string;
}
interface WeeklyTopic {
  topic_id: string;
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
  // const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPptOpen, setIsPptOpen] = useState(false);

  const [topics, setTopics] = useState<Topic[]>([
    { topic_id: "1",week:1, title: "Loading...", content: "Content 1" },
  ]);
console.log("topics[0].topic_id",topics[0].topic_id)
  const [topicID,setTopicID] = useState(Cookies.get('topicID') || "67dd4f3bada69ae06e9769bb");
  useEffect(() => {
    Cookies.set('topicID', topicID);
  }
  );
  
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

  const [data,setData] = useState<string | null>(null);
  const [syllabusData, setSyllabusData] = useState<SyllabusResponse | null>(null);
  const [presentationData, setPresentationData] = useState<PresentationData | null>();
  const [, setPresentationTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [isChatFullScreen, setIsChatFullScreen] = useState(false);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL || "https://api.miiguru.com";
  const [AUTH_TOKEN] =useState(Cookies.get('authToken') || ""); 
  const subject = "biology";
  const class_grade = "9";
  
  const trackAudioAction = async (
    action: string,
    position: number,
    speed: number
  ) => {
    try {
      const endpoint = `/api/topic/audio/track/${action}/${topicID}`;
      const currentTime = Date.now();

      const payload = {
        event_type: action,
        position_seconds: position || 0,
        speed: speed || 1,
        timestamp: currentTime,
      };

      await axiosInstance.post(endpoint, payload);
      setPresentationTrigger(currentTime);
      setLastTrackingTime(currentTime);
    } catch (err) {
      console.error(`Error tracking ${action}:`, err);
    }
  };
  useEffect(() => {
    const handleTabClose = () => {
      console.log("Tab is closing...");
      
      if (!playerRef.current) return;
  
      const currentTime = playerRef.current.getCurrentTime() || 0;
      console.log("Current time:", currentTime);
  
      
      setPlaying((prevPlaying) => {
        if (prevPlaying) {
          console.log("Audio is playing. Pausing now...");
          trackAudioAction("pause", currentTime, playbackSpeed);
        }
        return false;
      });
    };
  
    const handleVisibilityChange = () => {
      if (document.hidden && playing) {
        console.log("Tab is hidden, pausing...");
        handleTabClose();
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleTabClose);
    window.addEventListener("pagehide", handleTabClose);
  
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleTabClose);
      window.removeEventListener("pagehide", handleTabClose);
    };
  }, [playing, playerRef, topicID]);
  useEffect(() => {
    const handleTabClose = () => {
      console.log("Tab is closing...");
      
      if (!playerRef.current) return;
  
      const currentTime = playerRef.current.getCurrentTime() || 0;
      console.log("Current time:", currentTime);
  
      setPlaying((prevPlaying) => {
        if (prevPlaying) {
          console.log("Audio is playing. Pausing now...");
          trackAudioAction("pause", currentTime, playbackSpeed);
        }
        return false;
      });
    };
  
    const handleVisibilityChange = () => {
      if (document.hidden && playing) {
        console.log("Tab is hidden, pausing...");
        handleTabClose();
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleTabClose);
    window.addEventListener("pagehide", handleTabClose); // For Mobile
  
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleTabClose);
      window.removeEventListener("pagehide", handleTabClose);
    };
  }, [playing, playerRef, topicID, playbackSpeed]);
    
  

  useEffect(() => {
    const fetchAudio = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/topic/audio/${topicID}`, {
          responseType: "blob", 
        });

        const audioUrl = URL.createObjectURL(response.data);
        setData(audioUrl);
      } catch (err) {
        console.error("Error fetching audio data:", err);
        setError("Failed to load audio. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAudio();

    return () => {
      if (data) {
        URL.revokeObjectURL(data);
      }
    };
  }, [topicID]);
  
  

  useEffect(() => {
    const fetchPresentationData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/syllabus/presentation/${topicID}`
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
  }, [topicID]);


  useEffect(() => {
    const fetchSyllabusData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/user/syllabus/${subject}?class_grade=${class_grade}`
        );
        setSyllabusData(response);
      } catch (err) {
        console.log("Error fetching syllabus data:", err);
        setError("Failed to load syllabus data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabusData();
  }, [topicID]);

  const handlePlayPauseBtnClick = () => {
    const newPlayingState = !playing;
    setPlaying(newPlayingState);

    const currentPosition = playerRef.current? playerRef?.current?.getCurrentTime(): 0;

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
  }, [sessionStartTime,topicID]);

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // const formatTime = (seconds: number): string => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = Math.floor(seconds % 60);
  //   return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  // };

  // const speedOptions = [0.5, 1, 1.5, 2];
  useEffect(() => {
    if (syllabusData?.data?.weekly_schedule) {
      setTopics(
        syllabusData.data.weekly_schedule.map((topic) => ({
          topic_id: topic.topic_id, // Ensure topic_id is included
          week: topic.week, // Ensure week is included
          title: topic.topics, // Rename topics → title
          content: topic.description, // Rename description → content
        }))
      );
    }
  }, [syllabusData,topicID]);
  return (
    <div className="w-full flex flex-col relative text-small md:text-regular max-h-lvh ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.35fr] md:gap-6 h-full">
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
                audio={data}
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
                topicID={topicID}
              />
            </div>
            <TopicSection
              topics={topics}
              open={open}
              setOpen={setOpen}
              topicID={topicID}
              setTopicID={setTopicID}
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
