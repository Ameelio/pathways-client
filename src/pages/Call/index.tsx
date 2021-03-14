import React, { useCallback, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "src/redux";
import { connect, ConnectedProps, shallowEqual } from "react-redux";
import { RouteComponentProps } from "react-router";
import { selectAllCallInfo } from "src/redux/selectors";
import { push } from "connected-react-router";
import { genFullName, getInitials } from "src/utils/utils";
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

type TParams = { id: string };

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<TParams>
) => ({
  call: selectAllCallInfo(state, parseInt(ownProps.match.params.id)),
  authInfo: state.session.authInfo,
  initials: getInitials(genFullName(state.session.user)),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const CallBase: React.FC<PropsFromRedux & RouteComponentProps<TParams>> = ({
  call,
  match,
}) => {
  const dispatch = useAppDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const [callId] = useState(parseInt(match.params.id));

  // TODO create a memoized selector
  // const call = useAppSelector(state => selectAllCallInfo(state, callId), shallowEqual);
  const user = useAppSelector((state) => state.session.user, shallowEqual);

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
    console.log(call);
    if (!call || hasInit) return;
    console.log("init");
    stableDispatch(initializeVisit({ callId: call.id, setRc }));
  }, [call, stableDispatch, hasInit]);

  useEffect(() => {
    if (!rc || hasInit) return;
    console.log("setup");
    stableDispatch(initializeRemotes({ rc, setRemoteAudios, setRemoteVideos }));
    stableDispatch(
      initializeProducers({ rc, setLocalAudio, setLocalVideo, setRc })
    );
    setHasInit(true);
  }, [hasInit, stableDispatch, rc]);

  useEffect(() => console.log("parent", rc), [rc]);
  if (!call) return <div />;

  if (!rc || !hasInit) return <div />;

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
      roomClient={rc}
      localAudio={localAudio}
      localVideo={localVideo}
      remoteAudios={remoteAudios}
      remoteVideos={remoteVideos}
    />
  );
};

export default connector(CallBase);
