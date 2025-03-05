/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPersonalRooms } from "@/actions/personal-room";
import PasswordInput from "@/components/shared/password-input";
import PersonalRoomActionsButton from "@/components/shared/personal-room-action-buttons";
import PersonalRoomModel from "@/components/shared/personal-room-model";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PersonalRoom {
  _id: string;
  roomTitle: string;
  meetingId: string;
  passcode: string;
  inviteLink: string;
  createdAt: string;
}

const PersonalRoom = async () => {
  const personalRoomData: any = await getPersonalRooms();
  const data: { data: PersonalRoom[] } = JSON.parse(personalRoomData);

  return (
    <div className="space-y-12 shrink">
      <div className="flex items-start justify-between space-x-4">
        <h1 className="text-[24px] md:text-[30px] lg:text-[42px] font-bold leading-10 text-white">
          Personal Meeting Room
        </h1>
        <PersonalRoomModel />
      </div>
      {data?.data && data?.data.length > 0 ? (
        <div className="w-full">
          {data.data
            // .sort(
            //   (a, b) =>
            //     new Date(b.createdAt).valueOf() -
            //     new Date(a.createdAt).valueOf()
            // )
            .map((item, index) => (
              <div
                className={cn("space-y-12", index !== 0 && "pt-11")}
                key={item._id}
              >
                <div className="flex justify-start items-center space-x-20">
                  <div className="space-y-8 ">
                    {["Topic", "Meeting ID", "Passcode", "Invite Link"].map(
                      (value, idx) => (
                        <div className="w-[110px]" key={idx}>
                          <p className="text-[20px] font-medium leading-7 text-sky-1 flex items-center">
                            {value}
                            <span className="text-[24px]">:</span>
                          </p>
                        </div>
                      )
                    )}
                  </div>
                  <div className="w-full space-y-8 ">
                    {[
                      item.roomTitle,
                      item.meetingId,
                      item.passcode,
                      item.inviteLink,
                    ].map((value, idx) => (
                      <div key={idx}>
                        {idx === 2 ? (
                          <PasswordInput passcode={item.passcode} />
                        ) : (
                          <div className="w-full">
                            <p
                              className={cn(
                                "text-[20px] font-bold leading-7 text-white",
                                {
                                  "text-blue-1 w-[500px] line-clamp-1":
                                    idx === 3,
                                }
                              )}
                            >
                              {value}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <PersonalRoomActionsButton item={item} />
                {index !== data.data.length - 1 && (
                  <Separator className="h-1 bg-dark-1 w-full" />
                )}
              </div>
            ))}
        </div>
      ) : (
        <p className="text-[30px] font-bold leading-10 text-white">
          No personal rooms created yet!
        </p>
      )}
    </div>
  );
};

export default PersonalRoom;
