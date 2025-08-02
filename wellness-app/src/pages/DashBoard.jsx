import React, { useState } from "react";
import Hero from "../components/Hero";
import Box from "../components/Box";
import { FaPlay } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { SlBadge } from "react-icons/sl";
import {sessions} from "../assets/assets";
import YogaCard from "../components/YogaCard.jsx";
import Drafts from "../components/Drafts";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("All Sessions");

  return (
    <div className="bg-gradient-to-r from-blue-600/5 via-purple-500/5 to-pink-500/5 min-h-screen pt-16">
      <div className="max-w-[65%] mx-auto px-4">
        <Hero />
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Box
            title="Sessions Available"
            img={<FaPlay />}
            subTitle="5"
            backgound="blue"
            border="blue"
          />
          <Box
            title="Your Drafts"
            img={<RiDraftLine />}
            subTitle="0"
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

        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-200 inline-flex mt-6">
          {["All Sessions", "My Drafts"].map((tab) => (
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

        <div className="mt-7">
          {activeTab === "All Sessions" ? (
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
            </div>
          ) : (
            <Drafts  />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
