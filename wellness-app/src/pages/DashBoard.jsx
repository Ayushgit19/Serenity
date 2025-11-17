import React, { useState, useContext, useMemo, useEffect } from "react";
import Hero from "../components/Hero";
import Box from "../components/Box";
import { FaPlay } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { SlBadge } from "react-icons/sl";
import YogaCard from "../components/YogaCard.jsx";
import Drafts from "../components/Drafts";
import PublishedSessions from "../components/PublishedSessions";
import { SessionContext } from "../context/SessionContext";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx";
import { imageOptions } from "../assets/assets";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("All Sessions");
  const [allPublishedSessions, setAllPublishedSessions] = useState([]);
  const { drafts, userSessions } = useContext(SessionContext);
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const totalSessions = useMemo(
    () => allPublishedSessions?.length || 0,
    [allPublishedSessions]
  );
  const draftCount = drafts?.length || 0;
  const tabList = ["All Sessions", "My Drafts", "My Sessions"];

  useEffect(() => {
    const fetchAllSessions = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/sessions");
        setAllPublishedSessions(data.sessions || []);
      } catch (err) {
        toast.error("Failed to fetch all published sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchAllSessions();
  }, []);

  const allSessions = useMemo(() => {
    if (loading) {
      return (
        <p className="text-center text-gray-500 col-span-3">
          Loading sessions...
        </p>
      );
    }

    if (!allPublishedSessions?.length) {
      return (
        <p className="text-center text-gray-500 col-span-3">
          No sessions found.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {allPublishedSessions.map((session) => (
          <YogaCard
            key={session._id}
            _id={session._id}
            title={session.title}
            description={session.description}
            duration={`${session.duration} min`}
            instructor={session?.user_id?.name || "Unknown"}
            date={new Date(session.createdAt).toLocaleDateString()}
            tags={[
              session.category?.toLowerCase(),
              session.difficulty?.toLowerCase(),
            ].filter(Boolean)}
            image={imageOptions[session.selectedImage]}
          />
        ))}
      </div>
    );
  }, [loading, allPublishedSessions]);

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case "All Sessions":
        return allSessions;
      case "My Drafts":
        return <Drafts />;
      case "My Sessions":
        return <PublishedSessions />;
      default:
        return <Drafts />;
    }
  }, [activeTab, allSessions]);

  return (
    <div className="bg-gradient-to-r from-blue-600/5 via-purple-500/5 to-pink-500/5 min-h-screen pt-16">
      <div className="max-w-[90%] md:max-w-[65%] mx-auto px-4">
        <Hero />

        {/* Stats Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <Box
            title="Sessions Available"
            img={<FaPlay />}
            subTitle={totalSessions.toString()}
            backgound="blue"
            border="blue"
          />
          <Box
            title="Your Drafts"
            img={<RiDraftLine />}
            subTitle={draftCount.toString()}
            backgound="pink"
            border="pink"
          />
          <Box
            title="Wellness Score"
            img={<SlBadge />}
            subTitle="80%"
            backgound="green"
            border="green"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-200 inline-flex mt-6">
          {tabList.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-xl text-xs cursor-pointer font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-600/20 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-7">{renderContent}</div>
      </div>
    </div>
  );
};

export default DashBoard;
