import React from "react";
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
const MiniProfile = () => (
  <Profile>
    <Profile.Avatar src={avaIcon} />
    <Profile.Name>Neit Nelson</Profile.Name>
    <Profile.Email>g.alex00@bk.ru</Profile.Email>
    <Profile.Statistics>
      {data.map(({ num, title, caption }, index) => (
        <Profile.Statistics.Item key={index}>
          <Profile.Statistics.Item.Num>{num}</Profile.Statistics.Item.Num>
          <Profile.Statistics.Item.Title>{title}</Profile.Statistics.Item.Title>
          <Profile.Statistics.Item.Caption>
            {caption}
          </Profile.Statistics.Item.Caption>
        </Profile.Statistics.Item>
      ))}
    </Profile.Statistics>
  </Profile>
);

export default MiniProfile;
