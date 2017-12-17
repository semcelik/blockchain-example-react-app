import React from 'react';
import styled from 'styled-components';
import Main from "../Main";

const Container = styled.div`
  width: 80%;
  background-color: #eaeaea;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
`;

const ContainerWrapper = styled.div`
  width: 100%
  background-color: red;
`;

class App extends React.Component {
  render() {
    return <ContainerWrapper>
      <Container>
        <Main/>
      </Container>
    </ContainerWrapper>
  }
}

export default App;