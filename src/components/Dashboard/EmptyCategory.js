import React from "react";
import { Icon } from "antd";
import {
  EmptyContainer,
  Empty,
  PopoverTitleContainer,
  PopoverTitle,
  ContentList,
  Popover,
  SimpleButton
} from "./styles";

const Title = () => (
  <PopoverTitleContainer>
    <PopoverTitle>How to use categories?</PopoverTitle>
  </PopoverTitleContainer>
);
const content = (
  <ContentList>
    <ContentList.Item>Separation of personal and work tasks</ContentList.Item>
    <ContentList.Item>
      Create a phased plan for achieving the goal
    </ContentList.Item>
    <ContentList.Item>Save interesting notes or articles</ContentList.Item>
  </ContentList>
);

const EmptyCategory = () => (
  <EmptyContainer>
    <Empty.Image>
      <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description={false} />
    </Empty.Image>
    <Empty.Description>
      <Empty.Header>Organize your tasks into categories</Empty.Header>
      <Empty.Body>Group tasks by purpose or activity.</Empty.Body>
    </Empty.Description>
    <Empty.Footer>
      <Popover content={content} title={<Title />} trigger="hover">
        <SimpleButton>
          <Icon type="question" />
          How to use categories?
        </SimpleButton>
      </Popover>
    </Empty.Footer>
  </EmptyContainer>
);

export default EmptyCategory;
