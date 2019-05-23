import React, { Component } from "react";
// IMPORT NECESSARY REACT MATERIAL DESIGN ELEMENTS //
import List, { ListItem, ListItemText, ListItemMeta, ListItemGraphic, ListGroup } from "@material/react-list";
import Checkbox from '@material/react-checkbox';
import Card, { CardPrimaryContent } from '@material/react-card';
import TopAppBar, { TopAppBarFixedAdjust, TopAppBarRow, TopAppBarTitle, TopAppBarSection, TopAppBarIcon } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';
import IconButton from '@material/react-icon-button';

// IMPORT NECESSARY REACT MATERIAL DESIGN STYLESHEETS //
import "@material/react-list/index.scss";
import "@material/react-checkbox/index.scss";
import "@material/react-card/index.scss";
import '@material/react-ripple/index.scss';
import '@material/react-top-app-bar/index.scss';
import '@material/react-button/index.scss';
import '@material/react-icon-button/index.scss';

// GLOBAL VARIABLES //
const HIDE_SEARCH = true;
const MAX_FILTER_ITEMS = 5;

// FILTER REACT COMPONENTS //
class FilterArrow extends Component {
  render() {
    let icon;
    if (this.props.type === 'up') {icon = 'keyboard_arrow_up'}
    if (this.props.type === 'down') {icon = 'keyboard_arrow_down'}

    return (
      <Button
        disabled={!icon ? true : false}
        dense
        icon={<MaterialIcon hasRipple icon={icon}/>}
        onClick={this.props.onClick}
      />
    )
  }
}

export class FilterItem extends Component {
  render() {
    const name = this.props.item.name;
    const numItems = this.props.item.items;
    const checked = this.props.selected;

    if (this.props.removeCheckbox) {
      return (
        <ListItem>
          <IconButton>
            <MaterialIcon icon='cancel' onClick={this.props.onClick}/>
          </IconButton>
          <ListItemText primaryText={name} />
          <ListItemMeta meta="info">{numItems}</ListItemMeta>
        </ListItem>
      );
    }

    return (
      <ListItem checkboxList onClick={this.props.onClick}>
        <Checkbox checked={checked} />
        <ListItemText primaryText={name} />
        <ListItemMeta meta="info">{numItems}</ListItemMeta>
      </ListItem>
    )
  }
}

export class FilterTitle extends Component {
  render() {
    const title = this.props.title;
    const selected = this.props.selected;
    let clearButton = false;

    for (let x = 0; x <= selected.length; x ++) {
      if (selected[x]) {
        clearButton = true;
        break;
      }
    }

    return (
      <>
        <TopAppBar dense fixed>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarTitle>{title}</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align='end'>
              {
                !clearButton ? '' : [
                  <TopAppBarIcon navIcon key={'clearSelectedList'}>
                    <MaterialIcon icon='cancel' onClick={this.props.onClearClick} />
                  </TopAppBarIcon>
                ]
              }
              <TopAppBarIcon navIcon>
                <MaterialIcon icon='more_horiz' onClick={this.props.onMenuClick} />
              </TopAppBarIcon>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust dense />
      </>
    )
  }
}

class ListSearchBar extends Component {
  render() {
    if (HIDE_SEARCH){
      return null;
    }

    return (
      <ListItem>
        <ListItemGraphic
          graphic={
            <MaterialIcon hasRipple icon='add_box' onClick={() => console.log('click search')}/>
          }
        />
        <a
          tabIndex={4}
          href="#" 
          style={{color: "blue", textDecoration: "none"}} 
          onClick={(e) => e.preventDefault()}
        >
          Search
        </a>
      </ListItem>
    )
  }
}

export class FilterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const filter = this.props.filter;
    if (!filter) {
      return null;
    }

    const title = this.props.title;
    const filterItems = filter.items;
    const selected = this.props.selectedItems;

    const pageStart = this.state.pageStep * MAX_FILTER_ITEMS;
    const pageEnd = pageStart + MAX_FILTER_ITEMS < filterItems.length ? pageStart + MAX_FILTER_ITEMS : filterItems.length;

    const listItems = [];
    for (let x = pageStart; x < pageEnd; x ++) {
      listItems.push(
        <FilterItem 
          key={filterItems[x].name} 
          item={filterItems[x]} 
          selected={selected[x]}
          onClick={() => this.props.toggleCheckbox(filter.key, x)}
        />
      );
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

          { pageStart === 0 ? '' : (<FilterArrow type='up' onClick={() => this.pageJump(-1)} />) }
          
          <ListGroup>
            <List checkboxList selectedIndex={[]}> { listItems } </List>
            <List> <ListSearchBar /> </List>
          </ListGroup>

          { pageEnd === filterItems.length ? '' : (<FilterArrow type='down' onClick={() => this.pageJump(1)} />) }
          
        </CardPrimaryContent>
      </Card>
    );
  }
}
