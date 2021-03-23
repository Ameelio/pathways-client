import React, { useEffect, useState } from "react";
import { Typography, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { TestConnectionModalData } from "src/types/UI";
import Video from "src/components/Call/Video";
import Audio from "src/components/Call/Audio";
import { getMedia } from "src/utils";
// import { VolumeContainer } from "src/components/Call/VolumeContainer";

interface Props {
  data: TestConnectionModalData;
  closeModal: () => void;
}

const TestConnectionModal = ({ data, closeModal }: Props) => {
  const { t } = useTranslation("call");

  const [audio, setAudio] = useState<MediaStream>();
  const [video, setVideo] = useState<MediaStream>();

  useEffect(() => {
    (async () => {
      setAudio(await getMedia("audio"));
      setVideo(await getMedia("video"));
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (audio) {
        const tracks = audio.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
      if (video) {
        const tracks = video.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, [audio, video]);

  if (data.activeType !== "TEST_CONNECTION_MODAL") return <div />;

  return (
    <Modal
      title={t("testConnection.title")}
      visible={true}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      onOk={closeModal}
      className="rounded-sm w-full"
    >
      {video ? (
        <Video srcObject={video} className="w-full" autoPlay={true} />
      ) : (
        <div />
      )}
      {audio ? <Audio srcObject={audio} /> : <div />}
      <Typography.Text>{""}</Typography.Text>
      {/* TODO figure out what's the best way to implement this */}
      {/* <VolumeContainer audioVolume={audioVolume} className="absolute left-2 top-4"/> */}
    </Modal>
  );
};

export default TestConnectionModal;
