import React, { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import CreateMsg from "../components/CreateMsg";
import SessionDetails from "../components/SessionDetails";
import Preview from "../components/Preview";
import SessionImage from "../components/SessionImage";
import PublishDraft from "../components/PublishDraft";
import Instructions from "../components/Instructions";

const CreateSession = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600/5 via-purple-500/5 to-pink-500/5 min-h-screen pt-16">
      <div className="max-w-[60%] mx-auto px-4">
        <CreateMsg />
        <div className="mt-6 flex gap-5">
          <div className="flex flex-col gap-4">
            <SessionDetails />
            <SessionImage />
            <Instructions />
          </div>
          <div className="flex flex-col gap-4">
            <Preview />
            <PublishDraft />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
