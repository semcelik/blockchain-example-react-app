import * as React from "react";
import blockchainService from "../../blockchainService";
import BlockchainTable from "./BlockchainTable";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
    }
  }

  componentDidMount() {
    const blockchain = new blockchainService(4); // difficuly is manual fow now
    blockchain.initBlockchain();
    blockchain.addNewBlock('semihin');
    blockchain.addNewBlock('ilk');
    blockchain.addNewBlock('chaini');
    this.setState({
      blocks: blockchain.getAllBlocks()
    });
  }

  render() {
    console.log(this.state.blocks);
    return (<div>
      <p>difficulty: 5</p>
      <BlockchainTable
      data={this.state.blocks}/>
      </div>);
  }
}

export default Main;