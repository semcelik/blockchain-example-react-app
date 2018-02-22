import * as React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Table } from 'antd';

export const StyledTable = styled(Table)`
  margin-top: 10px;
  table {
    width: 100%;
  }
  tbody > tr > td {
    background-color: white;
  }
  thead > tr > th {
    color: white;
    background-color: #76dd56;    
  }
  .ant-pagination {
    display: block;
  }
  .ant-pagination-item-active {
    background-color: red;
    border-color: red;
  }
  .ant-pagination-item:hover, .ant-pagination-item:hover a {
    border-color: red;
  }
  .ant-select-selection:hover {
    border-color: red;
  }
`;

class BlockchainTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 50
        }, {
          title: 'NONCE',
          dataIndex: 'nonce',
          key: 'nonce',
        }, {
          title: 'DATA',
          dataIndex: 'data',
          key: 'data',
        }, {
          title: 'DATE',
          dataIndex: 'date',
          key: 'date',
        }, {
          title: 'HASH',
          dataIndex: 'hash',
          key: 'hash',
        },
      ],
    }
  }

  render() {
    return (<StyledTable
      dataSource={this.props.data}
      columns={this.state.columns}
      loading={this.props.loading}
    />)
  }
}

BlockchainTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default BlockchainTable;