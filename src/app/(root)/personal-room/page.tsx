/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPeronalRooms } from "@/actions/personal-room";
import PasswordInput from "@/components/shared/password-input";
import PersonalRoomModel from "@/components/shared/personal-room-model";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const PersonalRoom = async () => {
  const personalRoomData: any = await getPeronalRooms();
  const data = JSON.parse(personalRoomData);
  console.log(data);
  return (
    <div className="space-y-12 shrink">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] sm:text-[42px] font-bold leading-10 text-white">
          Personal Meeting Room
        </h1>
        <PersonalRoomModel />
      </div>
      {data && data?.data && data?.data?.length > 0 ? (
        <div className="w-full">
          {data?.data
            ?.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((item: any, index: any) => (
              <div className=" space-y-12 " key={item._id}>
                <div className="flex justify-start items-center space-x-20">
                  <div className="space-y-8 ">
                    {["Topic", "Meeting ID", "Passcode", "Invite Link"].map(
                      (value, index) => (
                        <div className="w-[110px]" key={index}>
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
                    ].map((value, index) => (
                      <>
                        {index === 2 ? (
                          <PasswordInput passcode={item.passcode} />
                        ) : (
                          <p
                            className={cn(
                              "text-[20px] font-bold leading-7 text-white",
                              {
                                "text-blue-1 w-[60%] line-clamp-1": index === 3,
                              }
                            )}
                          >
                            {value}
                          </p>
                        )}
                      </>
                    ))}
                  </div>
                </div>
                {!index !== data?.data.length && (
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
