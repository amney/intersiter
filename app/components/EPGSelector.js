import React from 'react'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import AutoComplete from 'material-ui/AutoComplete'
import {row} from 'flexboxgrid'
import {epgBox, saveButton} from './style.css'

class EPGSelector extends React.Component {
  constructor(){
    super()
    this.state = {
      selected: {}
    }
  }

  componentWillMount(){
    this.setState({selected: this.props.selected})
  }

  addChoice(key, choice){
    var selected = this.state.selected
    selected[key] = choice
    this.setState({selected})
  }

  removeChoice(key){
    var selected = this.state.selected
    delete selected[key]
    this.setState({selected})
  }

  onSave(){
    this.props.onSave(this.state.selected)
  }

  componentWillReceiveProps(nextProps){
    this.setState({selected: nextProps.selected})
  }

  render() {
    //<AutoComplete style={ {  marginLeft: 7,  width: '100%'} } hintText="Search for EPG" filter={ AutoComplete.noFilter } dataSource={ ['EPGA', 'EPGB'] } />
    return (
      <div className={row}>

        <div className={epgBox}>
          <List>
            <Subheader>Available EPGs</Subheader>
              {Object.keys(this.props.choices).map((k) => {
                var choice = this.props.choices[k]
                if(!(k in this.state.selected)){
                return (
                  <ListItem key={k} primaryText={k} secondaryText={choice} rightIcon={ <ChevronRight /> } onClick={this.addChoice.bind(this, k, choice)} />
                )
                }
              })}
          </List>
        </div>

        <div className={epgBox}>
          <List>
            <Subheader>Selected EPGs</Subheader>
              {Object.keys(this.state.selected).map((k) => {
                var choice = this.state.selected[k]
                return (
                  <ListItem key={k} primaryText={k} secondaryText={choice} leftIcon={ <ChevronLeft /> } onClick={this.removeChoice.bind(this, k)}/>
                )
              })}
          </List>
        </div>

        <RaisedButton label="Save" className={saveButton} onClick={this.onSave.bind(this)}/>
      </div>
      )
  }
}

export default EPGSelector
