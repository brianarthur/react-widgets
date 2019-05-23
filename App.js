import React, { Component } from "react";
// IMPORT NECESSARY REACT MATERIAL DESIGN ELEMENTS //
import {Cell, Grid, Row} from '@material/react-layout-grid';

// IMPORT NECESSARY PAGE WIDGETS //
import { FilterCard } from "./FilterCard";
import { AppliedFilters } from "./AppliedFilters";
import { ResultTable } from "./ResultTable";
import { SearchCard } from "./SearchCard";

// IMPORT NECESSARY REACT MATERIAL DESIGN STYLESHEETS //
import '@material/react-layout-grid/index.scss';

//HELPER FUNCTIONS //
function createFilterItems(data, filterList) {
  const createFilter = {};
  let newFilterItem;
  for (let x = 0; x < data.length; x ++) {
    for (let key in data[x]) {
      if (!(key in createFilter)) {
        for (let y = 0; y < filterList.length; y ++) {
          if (filterList[y].key === key) {
            let title = filterList[y].title;
          }
        }
        createFilter[key] = {"key": key, "items": [], "title": title};
      }
      newFilterItem = true;
      for (let y = 0; y < createFilter[key].items.length; y ++) {
        if (createFilter[key].items[y].name === data[x][key]) {
          createFilter[key].items[y].items += 1;
          newFilterItem = false;
        }
      }
      if (newFilterItem) {
        createFilter[key].items.push({"name": data[x][key], "items": 1});
      }
    }
  }
  return createFilter;
}

function filterData(data, filters, selected) {
  const criteria = {};
  for (let key in selected) {
    for(let x = 0; x < selected[key].length; x ++) {
      if (selected[key][x]) {
        if (!criteria[key]) {
          criteria[key] = [];
        }
        criteria[key].push(filters[key]['items'][x]['name']);
      }
    }
  }
  const length = Object.keys(criteria).length;
  const filteredData = data.filter(function(item) {
    let satisfiedCriteria = 0;
    for (let key in criteria) {
      for (let x = 0; x < criteria[key].length; x ++) {
        if (criteria[key][x] === item[key]) {
          satisfiedCriteria += 1;
          break;
        }
      }
    }
    if (satisfiedCriteria === length) {
      return true;
    }
    return false;
  });

  return filteredData;
}

// APP REACT COMPONENTS //
export class App extends Component {
  constructor(props) {
    super(props);

    this.toggleSelected = this.toggleSelected.bind(this);
    this.clearSelectedList = this.clearSelectedList.bind(this);
    this.clearAllSelected = this.clearAllSelected.bind(this);

    const initialFilters = createFilterItems(this.props.data, this.props.filterList);
    const selected = {};
    for (let key in initialFilters) {
      selected[key] = Array(initialFilters[key].items.length).fill(false);
    }

    this.state = {
      selected: selected,
    };
  }

  __copyOfSelected() {
    const origSelected = this.state.selected;
    const selected = Object.assign({}, origSelected);
    for (let key in origSelected) {
      selected[key] = origSelected[key].slice();
    }
    return selected;
  }
  
  toggleSelected(card, itemNum) {
    let selected = this.__copyOfSelected();
    selected[card][itemNum] = !selected[card][itemNum];
    this.setState({
      selected: selected,
    });
  }

  clearSelectedList(card) {
    let selected = this.__copyOfSelected();
    selected[card].fill(false);
    this.setState({
      selected: selected,
    });
  }

  clearAllSelected() {
    let selected = this.__copyOfSelected();
    for(let x in selected) {
      selected[x].fill(false);
    }
    this.setState({
      selected: selected,
    });
  }

  render() {
    const filterList = this.props.filterList;
    const selected = this.state.selected;
    const filters = createFilterItems(this.props.data, filterList);
    const data = filterData(this.props.data, filters, selected);

    const filterCards = [];

    //console.log(filters);
    //console.log(this.props.filterList);

    for (let x = 0; x < filterList.length; x ++) {
      switch(filterList[x].type) {
        case "filterCard":
          filterCards.push(<Row key={filterList[x].key.concat("flterCard")} style={{ marginBottom: "20px" }}><Cell columns={12}><FilterCard title={filterList[x].title} filter={filters[filterList[x].key]} selectedItems={selected[filterList[x].key]} toggleCheckbox={this.toggleSelected} clearSelectedList={this.clearSelectedList}/></Cell></Row>);
          break;
        case "searchCard":
          filterCards.push(<Row key={filterList[x].key.concat("flterCard")} style={{ marginBottom: "20px" }}><Cell columns={12}><SearchCard title={filterList[x].title} filter={filters[filterList[x].key]} selectedItems={selected[filterList[x].key]} toggleCheckbox={this.toggleSelected} clearSelectedList={this.clearSelectedList}/></Cell></Row>)
          break;
      }
    }
    
    return (
      <div className="App">
        <Grid>
          <Row>
            <Cell columns={4}>
              {filterCards}
            </Cell>
            <Cell columns={8}>
              <Row><Cell columns={12}>
                <h4>Existing Projects</h4>
                <AppliedFilters filter={filters} selected={selected} clearAllSelected={this.clearAllSelected} removeSelected={this.toggleSelected} />
              </Cell></Row>
              <Row><Cell columns={12}>
                <ResultTable data={data} />
              </Cell></Row>
            </Cell>
          </Row>
        </Grid>
      </div>
    );
  }
}
