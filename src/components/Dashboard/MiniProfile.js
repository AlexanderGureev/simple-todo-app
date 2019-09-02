import React from "react";
import { useStoreState } from "easy-peasy";
import { Profile } from "./styles";
import Avatar from "./Avatar";

const data = [
  {
    key: "count",
    title: "To do",
    caption: "tasks"
  },
  {
    key: "completed",
    title: "Completed",
    caption: "tasks"
  },
  {
    key: "primary",
    title: "Primary",
    caption: "tasks"
  }
];

const MiniProfile = () => {
  const profile = useStoreState(state => state.profile);

  return (
    <Profile>
      <Avatar />
      <Profile.Name>{profile.username}</Profile.Name>
      <Profile.Email>{profile.email}</Profile.Email>
      <Profile.Statistics>
        {data.map(({ key, title, caption }) => (
          <Profile.Statistics.Item key={key}>
            <Profile.Statistics.Item.Num>
              {profile.statistics[key]}
            </Profile.Statistics.Item.Num>
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
