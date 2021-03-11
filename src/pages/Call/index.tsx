import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { selectAllCallInfo } from "src/redux/selectors";
import "./index.css";
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

type TParams = { id: string };

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<TParams>
) => ({
  call: selectAllCallInfo(state, parseInt(ownProps.match.params.id)),
  authInfo: state.session.authInfo,
  initials: getInitials(genFullName(state.session.user)),
});

const mapDispatchToProps = { push };
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const CallBase: React.FC<PropsFromRedux> = React.memo(
  ({ call, authInfo, initials }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(enterFullScreen());

      return () => {
        dispatch(exitFullScreen());
      };
    }, [dispatch]);

    return (
      <Call
        call={call}
        authInfo={authInfo}
        push={(path: string) => dispatch(push(path))}
        initials={initials}
        openInfoModal={(resource: FAQResource) =>
          dispatch(
            openModal({ activeType: "RESOURCE_MODAL", entity: resource })
          )
        }
      />
    );
  }
);

export default connector(CallBase);
