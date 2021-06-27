import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux";
import { RouteComponentProps } from "react-router";
import { push } from "connected-react-router";
import "src/i18n/config";
import {
  enterFullScreen,
  exitFullScreen,
} from "src/components/Common/commonSlice";
import Call from "src/components/Call";
import { openModal } from "src/redux/modules/modalsSlice";
import { FAQResource } from "src/types/UI";
import {
  initializeProducers,
  initializeRemotes,
  initializeVisit,
  updateCallStatus,
} from "src/redux/modules/call";
import RoomClient from "./RoomClient";
import {
  ControlledStream,
  InCallParticipantStatus,
  InCallStatus,
} from "src/types/Call";
import { useCallById } from "src/hooks/useCalls";
import Error from "src/components/Error";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import Loader from "src/components/Loader";
import useSound from "use-sound";
import LeaveCallSound from "src/assets/Sounds/LeaveCall.wav";
import JoinedCallSound from "src/assets/Sounds/EnterCall.wav";
import { getContactsFirstNames, showToast } from "src/utils";

type TParams = { id: string };

const CallBase: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
  const dispatch = useAppDispatch();

  const callId = match.params.id;
  const call = useCallById(callId);
  const { authInfo, user } = useAppSelector((state) => state.session);

  const { t } = useTranslation(["error", "common", "modals", "call"]);

  const [rc, setRc] = useState<RoomClient>();
  const [localAudio, setLocalAudio] = useState<ControlledStream>();
  const [localVideo, setLocalVideo] = useState<ControlledStream>();
  const [remoteAudios, setRemoteAudios] = useState<Record<string, MediaStream>>(
    {}
  );
  const [remoteVideos, setRemoteVideos] = useState<Record<string, MediaStream>>(
    {}
  );

  const [hasInit, setHasInit] = useState(false);

  const [
    participantJoinStatus,
    setParticipantsJoinStatus,
  ] = useState<InCallParticipantStatus>("no_show");
  const [playLeaveCall] = useSound(LeaveCallSound);
  const [playJoinCall] = useSound(JoinedCallSound);

  useEffect(() => {
    dispatch(enterFullScreen());
    return () => {
      dispatch(exitFullScreen());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!call || hasInit || !call.videoHandler) return;
    dispatch(
      initializeVisit({
        callId: call.id,
        setRc,
        authInfo,
        videoHandler: call.videoHandler,
      })
    );
  }, [call, hasInit, authInfo, dispatch]);

  useEffect(() => {
    if (!rc || hasInit) return;
    dispatch(
      initializeRemotes({
        rc,
        setRemoteAudios,
        setRemoteVideos,
        setParticipantsJoinStatus,
      })
    );
    dispatch(initializeProducers({ rc, setLocalAudio, setLocalVideo, setRc }));
    setHasInit(true);
  }, [hasInit, rc, dispatch]);

  useEffect(() => {
    return () => {
      rc?.destroy();
    };
  }, [rc]);

  useEffect(() => {
    if (!call) return;
    if (participantJoinStatus === "joined") {
      playJoinCall();
      showToast(
        "participantConnect",
        `${getContactsFirstNames(call.userParticipants)} ${t(
          "call:peer.joinedCallTitle"
        )}.`,
        // t("call:peer.joinedCallBody"),
        "info"
      );
    } else if (participantJoinStatus === "dropped") {
      playLeaveCall();
      showToast(
        "participantDisconnect",
        `${call?.userParticipants[0].firstName} ${t(
          "call:peer.participantDisconnect"
        )}.`,
        "info"
      );
    }
  }, [call, participantJoinStatus, t, playLeaveCall, playJoinCall]);

  const updateCallMemo = useCallback(
    (status: InCallStatus) => {
      dispatch(updateCallStatus({ id: callId, status }));
    },
    [dispatch, callId]
  );

  const leaveCallMemo = useCallback(
    () => dispatch(push(`/feedback/${callId}`)),
    [callId, dispatch]
  );

  if (!rc || !hasInit) {
    return <Loader fullPage tip={`${t("common:loading")}...`} />;
  }

  if (!call)
    return (
      <Error
        status="error"
        title={t("error:call.callNull")}
        extra={[
          <Button
            type="primary"
            size="large"
            onClick={() => dispatch(push("/"))}
          >
            {t("error:call.returnHome")}
          </Button>,
        ]}
      />
    );

  if (
    call.status === "terminated" ||
    call.status === "ended" ||
    call.status === "no_show" ||
    new Date(call.scheduledEnd) < new Date()
  )
    return (
      <Error
        status="error"
        title={t("error:call.callNull")}
        extra={[
          <Button
            type="primary"
            size="large"
            onClick={() => dispatch(push("/"))}
          >
            {t("error:call.returnHome")}
          </Button>,
        ]}
      />
    );

  return (
    <Call
      call={call}
      user={user}
      push={(path: string) => dispatch(push(path))}
      openInfoModal={(resource: FAQResource) =>
        dispatch(openModal({ activeType: "RESOURCE_MODAL", entity: resource }))
      }
      openTestConnectionModal={() =>
        dispatch(
          openModal({ activeType: "TEST_CONNECTION_MODAL", entity: null })
        )
      }
      leaveCall={leaveCallMemo}
      updateCallStatus={updateCallMemo}
      room={rc}
      localAudio={localAudio}
      localVideo={localVideo}
      remoteAudios={remoteAudios}
      remoteVideos={remoteVideos}
      participantJoinStatus={participantJoinStatus}
    />
  );
};

export default CallBase;
