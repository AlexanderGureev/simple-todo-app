import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import { Profile } from "./styles";
import avaIcon from "./img/ava.jpg";

const data = [
  {
    num: "12",
    title: "Completed",
    caption: "tasks"
  },
  {
    num: "22",
    title: "To do",
    caption: "tasks"
  },
  {
    num: "12",
    title: "All",
    caption: "completed"
  }
];
const MiniProfile = () => {
  const { username, email } = useStoreState(state => state.session.profile);
  return (
    <Profile>
      <Profile.Avatar src={avaIcon} />
      <Profile.Name>{username}</Profile.Name>
      <Profile.Email>{email}</Profile.Email>
      <Profile.Statistics>
        {data.map(({ num, title, caption }, index) => (
          <Profile.Statistics.Item key={index}>
            <Profile.Statistics.Item.Num>{num}</Profile.Statistics.Item.Num>
            <Profile.Statistics.Item.Title>
              {title}
            </Profile.Statistics.Item.Title>
            <Profile.Statistics.Item.Caption>
              {caption}
            </Profile.Statistics.Item.Caption>
          </Profile.Statistics.Item>
        ))}
      </Profile.Statistics>
    </Profile>
  );
};

export default MiniProfile;
