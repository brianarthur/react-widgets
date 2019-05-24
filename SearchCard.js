import React, { Component } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import MaterialIcon from '@material/react-material-icon';
import List, { ListItem, ListItemText, ListItemMeta, ListItemGraphic, ListGroup } from "@material/react-list";
import Card, { CardPrimaryContent } from '@material/react-card';
import TopAppBar, { TopAppBarFixedAdjust, TopAppBarRow, TopAppBarTitle, TopAppBarSection, TopAppBarIcon } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';

import { FilterCard, FilterTitle, FilterItem, FilterArrow } from './FilterCard';


import "@material/react-text-field/index.scss";
import "@material/react-list/index.scss";
import "@material/react-card/index.scss";
import '@material/react-ripple/index.scss';
import '@material/react-top-app-bar/index.scss';
import '@material/react-button/index.scss';

const MAX_FILTER_ITEMS = 5

class SearchBar extends Component {
  render() {
    const value = this.props.searchValue;
    const onChange = this.props.onInputChange;
    const clear = this.props.clearSearchValue;

    return (
      <TextField
        label="Search"
        outlined
        trailingIcon={ value ? (<MaterialIcon role="button" icon="delete"/>) : null }
        onTrailingIconSelect={clear}
        style={{margin: "20px 0"}}
      >
        <Input value={value} onChange={onChange} />
      </TextField>
    );
  }
}

export class SearchCard22 extends Component {
  constructor(props) {
    super(props);

    this.clearSearchValue = this.clearSearchValue.bind(this);

    this.state = {
      searchValue: "",
      pageStep: 0,
      collapsedState: false,
    };
  }

  pageJump(step) {
    const currentPageStep = this.state.pageStep;   
    this.setState({
      pageStep: currentPageStep + step,
    });
  }

  showMenu() {
    console.log('Show menu dropdown');
  }

  handleToggleCollapse() {
    const collapsedState = !this.state.collapsedState;
    this.setState({
      collapsedState: collapsedState,
    });
  }

  clearSearchValue() {
    this.setState({ searchValue: "" });
  }

  onInputChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const filter = this.props.filter;
    const items = filter.items.slice();
    const selected = this.props.selectedItems;
    const title = this.props.title;
    const value = this.state.searchValue;
    const collapsedState = this.state.collapsedState;

    const availableItems = [];
    const listItems = [];

    for (let x = 0; x < items.length; x ++) {
      if ((items[x].name.toLowerCase().search(value.toLowerCase()) > -1) && value) {
        availableItems.push(x);
      } else if (selected[x] && !value) {
        availableItems.push(x);
      }
    }

    const pageStart = this.state.pageStep * MAX_FILTER_ITEMS;
    const pageEnd = pageStart + MAX_FILTER_ITEMS < availableItems.length ? pageStart + MAX_FILTER_ITEMS : availableItems.length;

    for (let x = pageStart; x < pageEnd; x ++) {
      listItems.push(
        <FilterItem
          removeCheckbox={ value ? false : true}
          key={items[availableItems[x]].name} 
          item={items[[availableItems[x]]]}
          selected={selected[[availableItems[x]]]}
          onClick={() => this.props.toggleCheckbox(filter.key, availableItems[x])}
        />
      );
    }
    
    return ( 
      <Card outlined>
        <CardPrimaryContent style={{margin: "10px"}}>
          <FilterTitle 
            title={title}
            selected={selected}
            collapsedState={collapsedState}
            onClearClick={() => this.props.clearSelectedList(filter.key)} 
            onMenuClick={() => this.showMenu()} 
            toggleCollapsedState={() => this.handleToggleCollapse()}
          />

          {collapsedState ? '' : (
            <>
              <SearchBar searchValue={value} onInputChange={this.onInputChange} clearSearchValue={this.clearSearchValue} />
              { pageStart === 0 ? '' : (<FilterArrow type='up' onClick={() => this.pageJump(-1)} />) }
              <List > { listItems } </List>
              { pageEnd === availableItems.length ? '' : (<FilterArrow type='down' onClick={() => this.pageJump(1)} />) }
            </>
          )}
          
        </CardPrimaryContent>
      </Card>
    );
  }
}


export class SearchCard extends FilterCard {
  constructor(props) {
    super(props);
    this.clearSearchValue = this.clearSearchValue.bind(this);
    
    this.state = Object.assign( this.state, {
      searchValue: "",
    });
  }

  clearSearchValue() {
    this.setState({ searchValue: "" });
  }

  onInputChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const filter = this.props.filter;
    const items = filter.items.slice();
    const selected = this.props.selectedItems;
    const title = this.props.title;
    const value = this.state.searchValue;
    const collapsedState = this.state.collapsedState;

    const availableItems = [];
    const listItems = [];

    for (let x = 0; x < items.length; x ++) {
      if ((items[x].name.toLowerCase().search(value.toLowerCase()) > -1) && value) {
        availableItems.push(x);
      } else if (selected[x] && !value) {
        availableItems.push(x);
      }
    }

    const pageStart = this.state.pageStep * MAX_FILTER_ITEMS;
    const pageEnd = pageStart + MAX_FILTER_ITEMS < availableItems.length ? pageStart + MAX_FILTER_ITEMS : availableItems.length;

    for (let x = pageStart; x < pageEnd; x ++) {
      listItems.push(
        <FilterItem
          removeCheckbox={ value ? false : true}
          key={items[availableItems[x]].name} 
          item={items[[availableItems[x]]]}
          selected={selected[[availableItems[x]]]}
          onClick={() => this.props.toggleCheckbox(filter.key, availableItems[x])}
        />
      );
    }
    
    return ( 
      <Card outlined>
        <CardPrimaryContent style={{margin: "10px"}}>
          <FilterTitle 
            title={title}
            selected={selected}
            collapsedState={collapsedState}
            onClearClick={() => this.props.clearSelectedList(filter.key)} 
            onMenuClick={() => this.showMenu()} 
            toggleCollapsedState={() => this.handleToggleCollapse()}
          />

          {collapsedState ? '' : (
            <>
              <SearchBar searchValue={value} onInputChange={this.onInputChange} clearSearchValue={this.clearSearchValue} />
              { pageStart === 0 ? '' : (<FilterArrow type='up' onClick={() => this.pageJump(-1)} />) }
              <List > { listItems } </List>
              { pageEnd === availableItems.length ? '' : (<FilterArrow type='down' onClick={() => this.pageJump(1)} />) }
            </>
          )}
          
        </CardPrimaryContent>
      </Card>
    );
  }
}