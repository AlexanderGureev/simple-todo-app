import React, { useState } from "react";
import { message, Modal } from "antd";
// eslint-disable-next-line import/no-unresolved
import { LoopingRhombusesSpinner } from "react-epic-spinners";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Dragger, Avatar } from "./styles";
import { PreloaderContainer } from "../Common/styles";
import { ReactComponent as UploadFormIcon } from "./img/upload_ava.svg";
import { API_PUBLIC_URL } from "../../services/api";

function beforeUpload(file) {
  const allowedExt = ["image/jpeg", "image/png", "image/svg+xml"];
  const isAllowedExt = allowedExt.some(ext => ext === file.type);
  if (!isAllowedExt) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isAllowedExt && isLt2M;
}

const ProfileHeader = () => {
  const { avatarPath } = useStoreState(state => state.session.profile);
  const { changeAvatar } = useStoreActions(actions => actions.session);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => setVisible(true);
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);

  const props = {
    showUploadList: false,
    beforeUpload,
    customRequest: async ({ file, onError, onSuccess }) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        await changeAvatar(formData);
        setLoading(false);
        setVisible(false);
        onSuccess();
      } catch (error) {
        setLoading(false);
        onError();
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <>
      <Modal
        title="Change avatar"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        multiple={false}
      >
        <Dragger {...props}>
          {loading ? (
            <PreloaderContainer>
              <LoopingRhombusesSpinner color="#1f5ad1" />
            </PreloaderContainer>
          ) : (
            <Dragger.Container>
              <Dragger.Icon component={UploadFormIcon} />
              <Dragger.Text>
                Click or drag your avatar image to this area to upload
              </Dragger.Text>
            </Dragger.Container>
          )}
        </Dragger>
      </Modal>
      <Avatar src={`${API_PUBLIC_URL}${avatarPath}`} onClick={handleClick} />
    </>
  );
};

export default ProfileHeader;
