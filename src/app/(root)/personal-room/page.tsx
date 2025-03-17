/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPersonalRooms } from "@/actions/personal-room";
import PagesHeader from "@/components/shared/pages-header";
import PasswordInput from "@/components/shared/password-input";
import PersonalRoomActionsButton from "@/components/shared/personal-room-action-buttons";
// import PersonalRoomModel from "@/components/shared/personal-room-model";
import { Separator } from "@/components/ui/separator";
import { MeetingOptionModelType } from "@/constants";
import { cn } from "@/lib/utils";

interface PersonalRoom {
  _id: string;
  roomTitle: string;
  meetingId: string;
  passcode: string;
  expiry: boolean;
  inviteLink: string;
  createdAt: string;
}

export async function generateMetadata() {
  const title = "Personal Meeting Rooms";
  const description =
    "Manage and access your personalized video conference rooms in your Zoom-like workspace";

  return {
    title: `${title}${description ? ` - ${description}` : ""}`,
    description,
    openGraph: {
      title: "Personal Video Rooms Management",
      description:
        "Create and manage secure personal meeting spaces with custom access controls in your video collaboration platform",
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/personal-room`,
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
          alt: "Personal Meeting Rooms",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Personal Video Rooms",
      description:
        "Maintain and organize your private meeting spaces in your video conferencing platform",
      images: [""],
      creator: "@videoconfapp",
    },
  };

export const maxDuration = 60;

const PersonalRoom = async () => {
  const personalRoomData: any = await getPersonalRooms();
  const data: { data: PersonalRoom[] } = JSON.parse(personalRoomData);

  // const checkexpiry = data.find

  return (
    <div className="space-y-12 shrink">
      <PagesHeader
        btnTitle="Create a new room"
        modelTitle="Create Personal Room"
        type={MeetingOptionModelType.PERSONALROOM}
        title="Personal meeting room"
      />
      {data?.data && data?.data.length > 0 ? (
        <div className="w-full">
          {data.data.map((item, index) => {
            const roomDetails = [
              { label: "Topic", value: item.roomTitle },
              { label: "Meeting ID", value: item.meetingId },
              {
                label: "Passcode",
                value: <PasswordInput passcode={item.passcode} />,
              },
              { label: "Invite Link", value: item.inviteLink },
            ];

            return (
              <div
                className={cn("space-y-12", index !== 0 && "pt-11")}
                key={item._id}
              >
                <div className="flex justify-start items-center space-x-20">
                  {/* Labels and Values in a single map */}
                  <div className="space-y-8">
                    {roomDetails.map(({ label }, idx) => (
                      <div className="w-[110px]" key={idx}>
                        <p className="text-[20px] font-medium leading-7 text-sky-1 flex items-center">
                          {label}
                          <span className="text-[24px]">:</span>
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="w-full space-y-8">
                    {roomDetails.map(({ value }, idx) => (
                      <div key={idx} className="w-full">
                        {idx === 2 ? (
                          value
                        ) : (
                          <p
                            className={cn(
                              "text-[20px] font-bold leading-7 text-white",
                              {
                                "text-blue-1 w-[500px] line-clamp-1": idx === 3,
                              }
                            )}
                          >
                            {value}
                          </p>
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
            );
          })}
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
