import * as React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Table } from 'antd';
import { formatFullDate } from '../../utils/date';

//todo need sass
export const StyledTable = styled(Table)`
  margin-top: 10px;
  table {
    width: 100%;
    border: 1px solid;
    border-radius: 20px;
  }
  tbody > tr:last-child > td:first-child {
    border-bottom-left-radius: 20px;   
  }
  tbody > tr:last-child > td:last-child {
    border-bottom-right-radius: 20px;   
  }
  tbody > tr > td {
    background-color: #f9f7f7;
    margin-right: 3px;
  }
  tbody > tr > td {
    background-color: #f9f7f7;
    margin-right: 3px;
  }
  tbody > tr > td:hover {
    color: #4db74e;
  }
  thead > tr > th {
    color: white;
    background-color: #4db74e;
  }
  thead > tr > th:first-child {
    color: white;
    background-color: #4db74e;
    border-top-left-radius: 20px;
  }
  thead > tr > th:last-child {
    color: white;
    background-color: #4db74e;
    border-top-right-radius: 20px;
  }
  thead > tr > th {
    color: white;
    background-color: #4db74e;
  }
  .ant-pagination {
    display: block;
  }
  .ant-pagination-item-active {
    background-color: #f9f7f7;
    border-color: #4db74e;
    color: #f9f7f7;
  }
  .ant-pagination-item-link {
    background-color: #f9f7f7;
    color: #4db74e;
  }
  .ant-pagination-item-link:hover {
    background-color: #4db74e;
    color: #f9f7f7;
  }
  .ant-pagination-item:hover, .ant-pagination-item a {
    background-color: #f9f7f7;
    color: #4db74e;
  }
  .ant-pagination-item:hover, .ant-pagination-item:hover a {
    background-color: #4db74e;
    color: #f9f7f7;
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
          render: (date) => formatFullDate(date)
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
    />);
  }
}

BlockchainTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default BlockchainTable;
