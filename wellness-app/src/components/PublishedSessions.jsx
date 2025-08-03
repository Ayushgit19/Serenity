import React, { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import PublishedCard from "./PublishedCard";

const PublishedSessions = () => {
  const { userSessions } = useContext(SessionContext);

  if (!userSessions || userSessions.length === 0) {
    return (
      <div className="text-gray-600 text-center mt-10">
        You haven't published any sessions yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
      {userSessions.map((session) => (
        <PublishedCard key={session._id} session={session} />
      ))}
    </div>
  );
};

export default PublishedSessions;
