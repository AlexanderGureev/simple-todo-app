import React from "react";
import { Friends } from "./styles";
import avaIcon from "./img/ava.jpg";

const FriendsComponent = () => (
  <Friends>
    <Friends.Title>Friends</Friends.Title>
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
  </Friends>
);

export default FriendsComponent;
