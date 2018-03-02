import * as React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlockchainTable from "./BlockchainTable";
import { Button, Col, Input, Row } from "antd";
import { addBlock, loadBlocks } from "./actions";
import { DIFFICULTY } from "./constants";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      input: undefined,
    }
  }

  componentDidMount() {
    this.props.onLoadBlocks();
  }

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  onClick() {
    this.props.onAddBlock(this.state.input);
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
        loading={this.props.blockTableLoading}
        data={this.props.blocks} />
    </div>);
  }
}

Main.propTypes = {
  blocks: PropTypes.array,
  blockTableLoading: PropTypes.bool,
  error: PropTypes.string,
  onAddBlock: PropTypes.func,
  onLoadBlock: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks,
    blockTableLoading: state.blockTableLoading,
    error: state.error,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBlock: (transaction) => dispatch(addBlock(transaction)),
    onLoadBlocks: () => dispatch(loadBlocks()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
