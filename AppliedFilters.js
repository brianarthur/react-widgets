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
class FilterDetail extends Component {
  render() {
    const name = this.props.name;

    return (
      <Cell columns={6}>
        <Body1>
          {name}
          <IconButton>
            <MaterialIcon icon='cancel' onClick={() => this.props.removeSelected(this.props.card, this.props.itemNum) }/>
          </IconButton>
        </Body1>
      </Cell>
    )
  }
}
class FilterTitle extends Component {
  render() {
    const title = this.props.title;

    return (
      <Cell columns={4}>
        <Body1>{title}</Body1>
      </Cell>
    )
  }
}

class FilterRow extends Component {
  render() {
    const filter = this.props.filter;
    const filterRow = [];
    let titleApplied = false;

    for (let x = 0; x < filter.items.length; x ++){
      if (filter.items[x]) {
        let title = !titleApplied ? filter.title.concat(':') : '';
        filterRow.push(
          <Row key={filter.key.concat(x)}>
            <FilterTitle title={title} />
            <FilterDetail name={filter.items[x].name} card={filter.key} itemNum={x} removeSelected={this.props.removeSelected} />
          </Row>
        );
        titleApplied = true;
      }
    }

    return (<> {filterRow} </>)
  }
}

class FilterBody extends Component {
  render() {
    const filters = this.props.filterList;
    return (
      <Row>
        <Cell columns={1}></Cell>
        <Cell columns={1}>
          <Row>
            <Cell columns={12}>
              <Body1>
                <MaterialIcon icon='info' onClick={() => console.log('click info')} />
              </Body1>
            </Cell>
          </Row>
        </Cell>
        <Cell columns={10}>
          <Row>
            <Cell columns={4}><Body1>Filters Applied:</Body1></Cell>
          </Row>
          { filters }
        </Cell>
      </Row>
    )
  }
}

class ClearFilters extends Component {
  render() {
    return (
      <CardActions>
        <CardActionIcons>
          <Button outlined onClick={ () => this.props.clearFilters() }>Clear All</Button>
        </CardActionIcons>
      </CardActions>
    )
  }
}

export class AppliedFilters extends Component {
  render() {
    const filter = this.props.filter;
    const selected = this.props.selected;
    const appliedFilters = [];
    let filterApplied = false;

    let counter = 0;
    for(let key in filter) {
      appliedFilters.push({title: filter[key].title, key: filter[key].key, items: []});
      for(let y = 0; y < filter[key].items.length; y ++) {
        if (selected[key][y]) {
          filterApplied = true;
          appliedFilters[counter].items.push(filter[key].items[y]);
        } else {
          appliedFilters[counter].items.push(false);
        }
      }
      counter += 1;
    }

    if (!filterApplied) {
      return null;
    }
    
    const filterList = [];
    for (let x = 0; x < appliedFilters.length; x ++) {
      filterList.push(<FilterRow key={"filterRow" + x} filter={appliedFilters[x]} removeSelected={this.props.removeSelected} />);
    }

    return (
      <Card outlined style={{backgroundColor: '#bfbfbf'}}>
        <CardPrimaryContent style={{margin: "10px"}}>
          <FilterBody filterList={filterList} />
          <ClearFilters clearFilters={this.props.clearAllSelected} />
        </CardPrimaryContent>
      </Card>
    );
  }
}
