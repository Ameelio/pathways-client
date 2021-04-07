import { Dictionary } from "@reduxjs/toolkit";
import { BaseCall, Call, MediaType } from "src/types/Call";
import { Contact } from "src/types/User";
import { notEmpty } from "./utils";

// The timer will switch to a white background for four seconds around each of these key minutes
const keyMinutes = [10, 5, 2];
const DEFAULT_BACKGROUND = "bg-gray-900 text-white";
const WHITE_BACKGROUND = "bg-white text-black";
const BLUE_BACKGROUND = "bg-blue-500 text-white";

export function loadCallEntitiesById(
  call: BaseCall,
  contacts: Dictionary<Contact>
): Call {
  const userParticipants = call.userIds
    .map((id) => contacts[id])
    .filter(notEmpty);
  return { ...call, userParticipants: userParticipants };
}

export function loadCallEntities(
  call: BaseCall,
  contacts: Dictionary<Contact>
): Call {
  const userParticipants = call.userIds
    .map((id) => contacts[id])
    .filter(notEmpty);
  return { ...call, userParticipants: userParticipants };
}

export function loadAllCallEntities(
  calls: BaseCall[],
  contacts: Dictionary<Contact>
): Call[] {
  return calls.map((c) => loadCallEntities(c, contacts));
}

// This function determines what color the background should be
// Within 4 seconds of a key minute (i.e. 9:56-10:00) -> White background
// Last minute -> Blue bacground
// Default -> Black background
export function mapCountdownTimeToStyle(
  minutes: number,
  seconds: number
): string {
  if (keyMinutes.some((val) => val === minutes && seconds === 0))
    return WHITE_BACKGROUND;
  if (keyMinutes.some((val) => val === minutes + 1 && seconds >= 56))
    return WHITE_BACKGROUND;
  if (minutes === 0 || (minutes === 1 && seconds === 0)) return BLUE_BACKGROUND;
  return DEFAULT_BACKGROUND;
}

function getMediaConstraints(
  type: MediaType,
  deviceId?: number
): MediaStreamConstraints {
  if (type === "audio") {
    return { audio: true };
  } else {
    return {
      video: true,
    };
  }
}

export async function getMedia(type: MediaType, deviceId?: number) {
  const mediaConstraints = getMediaConstraints(type, deviceId);
  return await navigator.mediaDevices.getUserMedia(mediaConstraints);
}
