/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPreviousMeetings } from "@/actions/previous-meetings";
import PreviousMeetingsCard from "@/components/shared/previous-meeting-card";
import React from "react";

const PreviousMeetings = async () => {
  const fetchMeetings: any = await getPreviousMeetings();
  const data = JSON.parse(fetchMeetings);
  return (
    <div className="w-full">
      {data?.data && data?.data?.length > 0 ? (
        <div className="space-y-8">
          <h1 className="text-[30px] font-bold leading-10 text-white">
            Previous Meetings
          </h1>
          <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-6 w-full">
            {data?.data?.map((item: any) => (
              <PreviousMeetingsCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[30px] font-bold leading-10 text-white">
          No previous meetings
        </p>
      )}
    </div>
  );
};

export default PreviousMeetings;
