import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Profile } from "./styles";
import Preloader from "../Common/Preloader";
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
  const statistics = useStoreState(state => state.statistics);
  const getStatistics = useStoreActions(
    actions => actions.statistics.getStatistics
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getStatistics()
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [getStatistics]);

  return (
    <Profile>
      <Avatar />
      <Profile.Name>{profile.username}</Profile.Name>
      <Profile.Email>{profile.email}</Profile.Email>
      <Profile.Statistics>
        {loading ? (
          <Preloader />
        ) : (
          data.map(({ key, title, caption }) => (
            <Profile.Statistics.Item key={key}>
              <Profile.Statistics.Item.Num>
                {statistics[key]}
              </Profile.Statistics.Item.Num>
              <Profile.Statistics.Item.Title>
                {title}
              </Profile.Statistics.Item.Title>
              <Profile.Statistics.Item.Caption>
                {caption}
              </Profile.Statistics.Item.Caption>
            </Profile.Statistics.Item>
          ))
        )}
      </Profile.Statistics>
    </Profile>
  );
};

export default MiniProfile;
