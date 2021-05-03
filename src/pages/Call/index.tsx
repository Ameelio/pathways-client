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
import { ControlledStream, InCallStatus } from "src/types/Call";
import { useCallById } from "src/hooks/useCalls";
import Error from "src/components/Error";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import Loader from "src/components/Loader";

type TParams = { id: string };

const CallBase: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
  const dispatch = useAppDispatch();

  const call = useCallById(parseInt(match.params.id));
  const { authInfo, user } = useAppSelector((state) => state.session);

  const { t } = useTranslation(["error", "common", "modals"]);

  const [rc, setRc] = useState<RoomClient>();
  const [localAudio, setLocalAudio] = useState<ControlledStream>();
  const [localVideo, setLocalVideo] = useState<ControlledStream>();
  const [remoteAudios, setRemoteAudios] = useState<Record<number, MediaStream>>(
    {}
  );
  const [remoteVideos, setRemoteVideos] = useState<Record<number, MediaStream>>(
    {}
  );

  const [hasInit, setHasInit] = useState(false);

  useEffect(() => {
    dispatch(
      openModal({
        activeType: "RESOURCE_MODAL",
        entity: {
          title: t("modals:privacyNotice.title"),
          body: t("modals:privacyNotice.body"),
          okBtnText: t("modals:privacyNotice.okText"),
        },
      })
    );
  }, [t, dispatch]);

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
    dispatch(initializeRemotes({ rc, setRemoteAudios, setRemoteVideos }));
    dispatch(initializeProducers({ rc, setLocalAudio, setLocalVideo, setRc }));
    setHasInit(true);
  }, [hasInit, rc, dispatch]);

  useEffect(() => {
    return () => {
      rc?.destroy();
    };
  }, [rc]);

  const updateCallMemo = useCallback(
    (status: InCallStatus) => {
      if (!call) return;
      dispatch(updateCallStatus({ id: call.id, status }));
    },
    [dispatch, call]
  );

  const leaveCallMemo = useCallback(
    () => dispatch(push(`/feedback/${call?.id || -1}`)),
    [call, dispatch]
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
    />
  );
};

export default CallBase;
