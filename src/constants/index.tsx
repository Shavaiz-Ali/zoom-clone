type sidebarDataTYpes = {
  id: number;
  title: string;
  link: string;
  icon: string;
};

export const sidebarData: sidebarDataTYpes[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
    icon: "/nav/1.svg",
  },
  {
    id: 2,
    title: "Upcoming",
    link: "/upcoming",
    icon: "/nav/2.svg",
  },
  {
    id: 3,
    title: "Previous",
    link: "/previous",
    icon: "/nav/3.svg",
  },
  {
    id: 4,
    title: "Recordings",
    link: "/recordings",
    icon: "/nav/4.svg",
  },
  {
    id: 5,
    title: "Personal Room",
    link: "/personal-room",
    icon: "/nav/5.svg",
  },
];

type MeetingOption = {
  id: number;
  title: string;
  description: string;
  color: string;
  iconPath: string;
  link?: string;
  modelType?: MeetingOptionModelType;
  modelTitle?: string;
  modelBtnText?: string;
};

export const enum MeetingOptionModelType {
  NEWMEETING = "newMeeting",
  JOINMEETING = "joinMeeting",
  SCHEDULEMEETING = "scheduleMeeting",
}

export const meetingOptions: MeetingOption[] = [
  {
    id: 1,
    title: "New Meeting",
    description: "Setup a new recording",
    color: "bg-[#FF742E]", // Orange
    iconPath: "/icons/plus.svg",
    modelType: MeetingOptionModelType.NEWMEETING,
    modelBtnText: "Start Meeting",
    modelTitle: "Start an Instant Meeting",
  },
  {
    id: 2,
    title: "Join Meeting",
    description: "via invitation link",
    color: "bg-[#0E78F9]", // Blue
    iconPath: "/icons/calender.svg",
    modelType: MeetingOptionModelType.JOINMEETING,
    modelBtnText: "Join Meeting",
    modelTitle: "Type the link here",
  },
  {
    id: 3,
    title: "Schedule Meeting",
    description: "Plan your meeting",
    color: "bg-[#830EF9]", // Purple
    iconPath: "/icons/user.svg",
    modelType: MeetingOptionModelType.SCHEDULEMEETING,
    modelBtnText: "Schedule Meeting",
    modelTitle: "Create Meeting",
  },
  {
    id: 4,
    title: "View Recordings",
    description: "Meeting recordings",
    color: "bg-[#F9A90E]", // Yellow
    iconPath: "/icons/video.svg",
    link: "/recordings",
  },
];
