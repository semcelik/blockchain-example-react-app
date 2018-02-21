import * as React from "react";
import { connect } from 'react-redux'
import { addNewBlock } from "../../blockchainService";
import BlockchainTable from "./BlockchainTable";
import { Button, Col, Input, Row } from "antd";
import { addBlock } from "./actions";
import { DIFFICULTY } from "./constants";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      input: undefined,
    }
  }

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  onClick() {
    const block = addNewBlock(this.props.blocks, this.state.input);
    this.props.onAddBlock(block);
  }

  render() {
    return (<div>
      <span>Difficulty: {DIFFICULTY.length}</span>
      <Row>
        <Col span={3}>
          <Input onChange={this.handleInputChange} />
        </Col>
        <Col span={2}>
          <Button onClick={this.onClick}>Add Block</Button>
        </Col>
      </Row>
      <BlockchainTable
        data={this.props.blocks} />
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks,
    addBlockLoading: state.addBlockLoading,
    error: state.error,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBlock: (transaction) => dispatch(addBlock(transaction))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);