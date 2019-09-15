import React from "react";
import { useStoreState } from "easy-peasy";
import { Friends, Empty } from "./styles";
import avaIcon from "./img/ava.jpg";

const FriendsComponent = () => {
  const friends = useStoreState(state => state.profile.friends);

  return (
    <Friends>
      <Friends.Title>Friends</Friends.Title>
      {!friends.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Friends.Container>
          <Friends.Item>
            <Friends.Avatar src={avaIcon} />
          </Friends.Item>
          <Friends.Item>
            <Friends.Avatar src={avaIcon} />
          </Friends.Item>
          <Friends.Item>
            <Friends.Avatar src={avaIcon} />
          </Friends.Item>
          <Friends.Item>
            <Friends.Avatar src={avaIcon} />
          </Friends.Item>
        </Friends.Container>
      )}
    </Friends>
  );
};
export default React.memo(FriendsComponent);
