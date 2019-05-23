import React, { Component } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import MaterialIcon from '@material/react-material-icon';
import List, { ListItem, ListItemText, ListItemMeta, ListItemGraphic, ListGroup } from "@material/react-list";
import Card, { CardPrimaryContent } from '@material/react-card';
import TopAppBar, { TopAppBarFixedAdjust, TopAppBarRow, TopAppBarTitle, TopAppBarSection, TopAppBarIcon } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';

import { FilterTitle, FilterItem } from './FilterCard';


import "@material/react-text-field/index.scss";
import "@material/react-list/index.scss";
import "@material/react-card/index.scss";
import '@material/react-ripple/index.scss';
import '@material/react-top-app-bar/index.scss';
import '@material/react-button/index.scss';

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

export class SearchCard extends Component {
  constructor(props) {
    super(props);

    this.clearSearchValue = this.clearSearchValue.bind(this);

    this.state = {
      searchValue: "",
      pageStep: 0,
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

    const listItems = [];

    if (value) {
      for (let x = 0; x < items.length; x ++) {
        if (items[x].name.search(value) > -1) {
          listItems.push(
            <FilterItem
              removeCheckbox={false}
              key={items[x].name} 
              item={items[x]} 
              selected={selected[x]}
              onClick={() => this.props.toggleCheckbox(filter.key, x)}
            />
          );
        }
      }
    } else {
      for (let x = 0; x < items.length; x ++) {
        if (selected[x]) {
          listItems.push(
            <FilterItem 
              removeCheckbox
              key={items[x].name}
              item={items[x]}
              onClick={() => this.props.toggleCheckbox(filter.key, x)}
            />
          );
        }
      }
    }
   
    return ( 
      <Card outlined>
        <CardPrimaryContent style={{margin: "10px"}}>
          <FilterTitle 
            title={title}
            selected={selected}
            onClearClick={() => this.props.clearSelectedList(filter.key)} 
            onMenuClick={() => this.showMenu()} 
          />
          <SearchBar searchValue={value} onInputChange={this.onInputChange} clearSearchValue={this.clearSearchValue} />

          <List > { listItems } </List>
          
        </CardPrimaryContent>
      </Card>
    );
  }
}
