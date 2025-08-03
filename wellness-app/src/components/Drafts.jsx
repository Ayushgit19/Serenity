import React, { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import DraftCard from "./DraftCard";

const Drafts = () => {
  const { drafts } = useContext(SessionContext);

  if (!drafts || drafts.length === 0) {
    return (
      <div className="text-gray-600 text-center mt-10">
        You have no drafts yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {drafts.map((draft) => (
        <DraftCard key={draft.id} draft={draft} />
      ))}
    </div>
  );
};

export default Drafts;
