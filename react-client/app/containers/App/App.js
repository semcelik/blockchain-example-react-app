import React from 'react';
import styled from 'styled-components';
import Main from "../Main";
import store from "../../store";

const Container = styled.div`
  width: 80%;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
`;

const ContainerWrapper = styled.div`
  margin-top: 50px;
  width: 100%
  background-color: red;
`;


class App extends React.Component {

  render() {
    return (
      <ContainerWrapper>
        <Container>
          <Main store={store} />
        </Container>
      </ContainerWrapper>);
  }
}

export default App;