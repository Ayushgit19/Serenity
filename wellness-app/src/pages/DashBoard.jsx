import React, { useState, useContext, useMemo } from "react";
import Hero from "../components/Hero";
import Box from "../components/Box";
import { FaPlay } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { SlBadge } from "react-icons/sl";
import { sessions } from "../assets/assets";
import YogaCard from "../components/YogaCard.jsx";
import Drafts from "../components/Drafts";
import PublishedSessions from "../components/PublishedSessions";
import { SessionContext } from "../context/SessionContext";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("All Sessions");
  const { drafts, userSessions } = useContext(SessionContext);

  const totalSessions = useMemo(() => sessions.length + (userSessions?.length || 0), [sessions, userSessions]);
  const draftCount = drafts?.length || 0;

  const tabList = ["All Sessions", "My Drafts", "My Sessions"];

  const allSessions = useMemo(() => (
    <div className="grid grid-cols-3 gap-5">
      {sessions.map((session) => (
        <YogaCard
          key={session.id}
          title={session.title}
          description={session.description}
          duration={session.duration}
          instructor={session.instructor}
          date={session.date}
          tags={session.tags}
          image={session.image}
        />
      ))}
      {userSessions?.map((session) => (
        <YogaCard
          key={`user-${session.id}`}
          title={session.title}
          description={session.description}
          duration={`${session.duration} min`}
          instructor="You"
          date={session.publishedDate}
          tags={[
            session.category?.toLowerCase(),
            session.difficulty?.toLowerCase(),
          ].filter(Boolean)}
          image={`https://picsum.photos/seed/${session.id}/400/300`}
        />
      ))}
    </div>
  ), [sessions, userSessions]);

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
      <div className="max-w-[65%] mx-auto px-4">
        <Hero />

        <div className="grid grid-cols-3 gap-4 mt-8">
          <Box title="Sessions Available" img={<FaPlay />} subTitle={totalSessions.toString()} backgound="blue" border="blue" />
          <Box title="Your Drafts" img={<RiDraftLine />} subTitle={draftCount.toString()} backgound="pink" border="pink" />
          <Box title="Wellness Score" img={<SlBadge />} subTitle="80%" backgound="green" border="green" />
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
