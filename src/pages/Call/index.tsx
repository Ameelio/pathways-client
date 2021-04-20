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
} from "src/redux/modules/call";
import RoomClient from "./RoomClient";
import { ControlledStream } from "src/types/Call";
import { useCallById } from "src/hooks/useCalls";
import Error from "src/components/Error";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import Loader from "src/components/Loader";

type TParams = { id: string };

const CallBase: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
  const dispatch = useAppDispatch();
  const stableDispatch = useCallback(dispatch, []);

  const call = useCallById(parseInt(match.params.id));
  const { authInfo, user } = useAppSelector((state) => state.session);

  const { t } = useTranslation(["error", "common"]);

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
    stableDispatch(enterFullScreen());
    return () => {
      stableDispatch(exitFullScreen());
    };
  }, [stableDispatch]);

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
  }, [call, hasInit, authInfo]);

  useEffect(() => {
    if (!rc || hasInit) return;
    stableDispatch(initializeRemotes({ rc, setRemoteAudios, setRemoteVideos }));
    stableDispatch(
      initializeProducers({ rc, setLocalAudio, setLocalVideo, setRc })
    );
    setHasInit(true);
  }, [hasInit, stableDispatch, rc]);

  useEffect(() => {
    return () => {
      rc?.destroy();
    };
  }, [rc]);

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
      leaveCall={() => {
        dispatch(push(`/feedback/${call.id}`));
      }}
      room={rc}
      localAudio={localAudio}
      localVideo={localVideo}
      remoteAudios={remoteAudios}
      remoteVideos={remoteVideos}
    />
  );
};

export default CallBase;
