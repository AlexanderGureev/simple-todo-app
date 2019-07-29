import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import headerBg from "./img/header-bg.svg";
import arrowIcon from "./img/down-arrow.svg";
import contentBg from "./img/content-bg.svg";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Header, Content } from "./styles";

const Home = () => {
  const isAuth = useStoreState(state => state.session.isAuth);
  const getUserProfile = useStoreActions(
    actions => actions.session.getUserProfile
  );

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return isAuth ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <Header src={headerBg}>
        <Header.Logo />
        <Header.Container>
          <Header.Title>Simple Task Manager</Header.Title>
          <Header.Caption>manage tasks conveniently</Header.Caption>
        </Header.Container>
        <Header.ScrollBtn src={arrowIcon} href="#content" offset="-800" />
      </Header>
      <Content src={contentBg}>
        <Content.Container top={150}>
          <Content.Title>All you thoughts</Content.Title>
          <Content.Caption>Organized in one place</Content.Caption>
        </Content.Container>
        <Content.Container top={100} bottom={100}>
          <Switch>
            <Route path="/" exact component={SignInForm} />
            <Route path="/signup" component={SignUpForm} />
          </Switch>
        </Content.Container>
      </Content>
    </>
  );
};

export default Home;
