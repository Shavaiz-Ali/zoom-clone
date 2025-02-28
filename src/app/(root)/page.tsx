/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPreviousMeetings } from "@/actions/previous-meetings";
import Banner from "@/components/shared/banner";
import MeetingOptionsCard from "@/components/shared/meeting-options-card";
import PreviousMeetingsCard from "@/components/shared/previous-meeting-card";
import { meetingOptions } from "@/constants";

export default async function Home() {
  const fetchMeetings: any = await getPreviousMeetings();
  const data = JSON.parse(fetchMeetings);
  return (
    <div className="space-y-12 w-full">
      <Banner />
      <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-3 w-full">
        {meetingOptions.map((option) => (
          <MeetingOptionsCard option={option} key={option.id} />
        ))}
      </div>
      <div className="w-full">
        {data?.data && data?.data?.length > 0 ? (
          <div className="space-y-8">
            <h1 className="text-[30px] font-bold leading-10 text-white">
              Previous Meetings
            </h1>
            <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-6 w-full">
              {data?.data
                ?.sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 3)
                .map((item: any) => (
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
    </div>
  );
}
