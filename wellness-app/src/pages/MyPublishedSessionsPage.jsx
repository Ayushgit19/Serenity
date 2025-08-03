import React, { useEffect, useState, useContext, useRef  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Star,
  Heart,
  Clock,
  ChevronLeft,
  ChevronRight,
  Pause,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const MyPublishedSessionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [session, setSession] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(
    session?.duration * 60 || 0
  );
  const [timerStarted, setTimerStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStartSession = () => {
    setTimerStarted(true);
    setIsPaused(false);
    startTimer();
  };

  const handlePauseResume = () => {
    if (isPaused) {
      startTimer();
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current); // cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/published/${id}`,
          {
            withCredentials: true, // important if you're using cookies/auth middleware
          }
        );
        if (data.success) {
          setSession(data.session);
          setTimeRemaining(data.session.duration * 60);
        } else {
          toast.error("Session not found");
        }
      } catch (error) {
        toast.error("Failed to fetch session");
        console.error(error);
      }
    };

    fetchSession();
  }, [id, backendUrl]);

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleNextStep = () => {
    if (session && currentStep < session.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Session Info */}
        <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl p-8 text-white mb-8 overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1">
              <div className="flex gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {session.category}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {session.difficulty}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-3">{session.title}</h1>
              <p className="text-purple-100 mb-6 max-w-2xl">
                {session.description}
              </p>

              <div className="flex items-center gap-6 text-purple-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{session.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-red-400 text-red-400" />
                  <span>2.1k likes</span>
                </div>
              </div>
            </div>


            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center min-w-[250px] mx-auto shadow-md">
              {/* Timer */}
              <div className="text-4xl font-bold text-white mb-6 tracking-wider">
                {formatTime(timeRemaining)}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-6 overflow-hidden">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      session?.duration
                        ? ((session.duration * 60 - timeRemaining) /
                            (session.duration * 60)) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>

              {/* Buttons */}
              {!timerStarted ? (
                <button
                  onClick={handleStartSession}
                  className="bg-white text-purple-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Play className="w-4 h-4" />
                  Start Session
                </button>
              ) : (
                <button
                  onClick={handlePauseResume}
                  className="bg-white cursor-pointer text-purple-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
                >
                  {isPaused ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                  {isPaused ? "Resume" : "Pause"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Current Step</h2>
                <span className="text-gray-500">
                  Step {currentStep + 1} of {session.instructions?.length || 0}
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {currentStep + 1}
                  </div>
                  <h3 className="text-lg font-medium">
                    {session.instructions?.[currentStep]?.text || "No step"}
                  </h3>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Step
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={
                    currentStep >= (session.instructions?.length || 0) - 1
                  }
                  className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Session Overview</h3>
            <p className="text-gray-600 mb-6">Complete step-by-step guide</p>

            <div className="space-y-3">
              {session.instructions?.map((step, index) => (
                <div
                  key={step._id || index}
                  onClick={() => setCurrentStep(index)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    index === currentStep
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index === currentStep
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span
                      className={`text-sm ${
                        index === currentStep
                          ? "text-purple-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {step.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPublishedSessionsPage;
