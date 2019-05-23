import React, { Component } from "react";
// IMPORT NECESSARY REACT MATERIAL DESIGN ELEMENTS //
import Card, { CardPrimaryContent, CardActions, CardActionButtons, CardActionIcons } from '@material/react-card';
import { Body1 } from '@material/react-typography';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import IconButton from '@material/react-icon-button';

// IMPORT NECESSARY REACT MATERIAL DESIGN STYLESHEETS //
import "@material/react-card/index.scss";
import '@material/react-ripple/index.scss';
import '@material/react-typography/index.scss';
import '@material/react-button/index.scss';
import '@material/react-layout-grid/index.scss';
import '@material/react-icon-button/index.scss';


// FILTER REACT COMPONENTS //
class PageArrow extends Component {
  render() {
    let icon;
    if (this.props.type === 'back') {icon = 'keyboard_arrow_left'}
    if (this.props.type === 'next') {icon = 'keyboard_arrow_right'}

    return (
      <Button
        disabled={!icon ? true : false}
        dense
        icon={<MaterialIcon hasRipple icon={icon}/>}
        style={{borderRadius: "20px", minWidth: "36px"}}
        onClick={this.props.onClick}
      />
    )
  }
}

class PageNavigation extends Component {
  render() {
    const pageNum = this.props.pageNum;
    const currentPage = pageNum === this.props.currentPage;
    return (
      <Button 
        raised={currentPage}
        outlined={!currentPage}
        dense
        style={{borderRadius: "20px", minWidth: "36px"}}
        onClick={this.props.onClick}
      >
        {pageNum+1}
      </Button>
    )
  }
}

class NumResults extends Component {
  render() {
    const num = this.props.num;
    const current = num === this.props.current;
    return (
      <Button 
        raised={current}
        outlined={!current}
        dense 
        style={{borderRadius: "20px", minWidth: "36px"}} 
        onClick={this.props.onClick}
      >
        {num}
      </Button>
    )
  }
}

class TableRow extends Component {
  render() {
    const itemInfo = this.props.item;

    return (
      <tr>
        <td style={{border: "1px solid black", padding: "10px"}}>{itemInfo.projectName}</td>
        <td style={{border: "1px solid black", padding: "10px"}}>{itemInfo.projectPhase}</td>
        <td style={{border: "1px solid black", padding: "10px"}}>Details</td>
      </tr>
    )
  }
}

export class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStep: 0,
      numItems: 10,
    };
  }

  setNumResults(num) {
    this.setState({
      numItems: num,
      pageStep: 0,
    });
  }

  pageJump(step) {
    const currentPageStep = this.state.pageStep;   
    this.setState({
      pageStep: currentPageStep + step,
    });
  }

  setPage(page) {
    this.setState({
      pageStep: page,
    });
  }

  render() {
    const data = this.props.data;
    const maxItems = this.state.numItems;
    const currentPage = this.state.pageStep;
    const numPages = Math.ceil(data.length / maxItems)

    const itemStart = currentPage * maxItems;
    const itemEnd = itemStart + maxItems < data.length ? itemStart + maxItems : data.length;

    const dataList = [];
    for (let x = itemStart; x < itemEnd; x ++) {
      dataList.push(<TableRow key={"resultRow".concat(x)} item={data[x]}/>);
    }

    let lowPage, highPage;
    if (numPages <= 5) {
      lowPage = 0;
      highPage = numPages;
    } else if (currentPage - 2 < 0) {
      lowPage = 0;
      highPage = lowPage + 5;
    } else if (currentPage + 2 > numPages - 1) {
      highPage = numPages;
      lowPage = highPage - 5;
    } else {
      lowPage = currentPage - 2;
      highPage = currentPage + 3;
    }

    const pageList = [];
    for (let x = lowPage; x < highPage; x ++) {
      pageList.push(<PageNavigation key={"pageNum".concat(x)} pageNum={x} currentPage={currentPage} onClick={() => this.setPage(x)} />);
    }

    return (
      <>
        <Row style={{margin: "10px 0"}}>
          <Cell columns={6}>
            <h4>Results {itemStart+1}-{itemEnd} of {data.length}</h4>
          </Cell>
          <Cell columns={3}>
            <h4>Download</h4>
          </Cell>
          <Cell columns={3}>
            <h4>Print</h4>
          </Cell>
        </Row>
        <Row style={{margin: "10px 0"}}>
          <Cell columns={12}>
            <table style={{width: "100%", textAlign: "left", border: "1px solid black", borderCollapse: "collapse"}}>
              <thead>
                <tr>
                  <th style={{border: "1px solid black", padding: "5px"}}><b>Project Name</b></th>
                  <th style={{border: "1px solid black", padding: "5px"}}><b>Project Phase</b></th>
                  <th style={{border: "1px solid black", padding: "5px"}}><b>Project Details</b></th>
                </tr>
              </thead>
              <tbody>
                { dataList }
              </tbody>
            </table>
          </Cell>
        </Row>
        <Row style={{margin: "10px 0", backgroundColor: '#bfbfbf'}}>
          <Cell columns={6}>
            { itemStart === 0 ? '' : (<PageArrow type='back' onClick={() => this.pageJump(-1)} />) }
            { pageList }
            { itemEnd === data.length ? '' : (<PageArrow type='next' onClick={() => this.pageJump(1)} />) }
          </Cell>
          <Cell columns={2}>
            Results per page
          </Cell>
          <Cell columns={4}>
            <NumResults num={10} current={this.state.numItems} onClick={() => this.setNumResults(10)}/>
            <NumResults num={25} current={this.state.numItems} onClick={() => this.setNumResults(25)}/>
            <NumResults num={50} current={this.state.numItems} onClick={() => this.setNumResults(50)}/>
            <NumResults num={100} current={this.state.numItems} onClick={() => this.setNumResults(100)}/>
          </Cell>
        </Row>
      </>
    );
  }
}
