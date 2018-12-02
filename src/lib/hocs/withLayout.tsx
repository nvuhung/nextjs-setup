import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
  position: relative;
`;

export default (
  ChildComponent: React.ComponentClass<{ t: any }>,
) => {
  const Component = (props) => (
    <Wrapper>
      <ChildComponent {...props} />
    </Wrapper>
  );
  (Component as any).getInitialProps = (ChildComponent as any).getInitialProps;
  return Component;
};
