import React from "react";
import { useMedia } from "react-use";
import { useStoreActions } from "easy-peasy";
import { ContentWrapper, Dashboard, Col, Row } from "./styles";
import DropdownMenu from "./DropdownMenu";
import Menu from "./Menu";
import MiniProfile from "./MiniProfile";
import Categories from "./Categories";
import Friends from "./Friends";
import TopLine from "./TopLine";
import TodoList from "./TodoList";
import dashboardBg from "./img/dashboard-bg.svg";

const DashboardComponent = props => {
  const logoutUser = useStoreActions(actions => actions.session.logoutUser);
  const isWide = useMedia("(max-width: 991px)");
  const isSmall = useMedia("(max-width: 580px)");

  const handleLogout = () => logoutUser();
  return (
    <Dashboard src={dashboardBg}>
      <ContentWrapper>
        <Row type="flex" style={{ height: "100%" }}>
          <Col
            xs={{ span: 24, order: 1 }}
            lg={{ span: 6, order: 0 }}
            style={{
              borderRight: isWide ? "none" : "1px solid #d1d1d1",
              overflowX: "scroll"
            }}
          >
            <Row>
              <Col xs={24}>
                <MiniProfile />
              </Col>

              <Col xs={24} md={12} lg={24}>
                <Categories />
              </Col>

              <Col xs={24} md={12} lg={24}>
                <Friends />
              </Col>
            </Row>
          </Col>

          <Col xs={{ span: 24, order: 0 }} lg={{ span: 18, order: 1 }}>
            <Row>
              <Col xs={24}>
                {isSmall ? (
                  <DropdownMenu handleClick={handleLogout} {...props} />
                ) : (
                  <Menu handleClick={handleLogout} {...props} />
                )}
              </Col>
            </Row>

            <Row style={{ height: "75%" }}>
              <Col xs={24}>
                <TopLine />
                <TodoList />
              </Col>
            </Row>
          </Col>
        </Row>
      </ContentWrapper>
    </Dashboard>
  );
};

export default DashboardComponent;
