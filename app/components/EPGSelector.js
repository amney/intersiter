import React from 'react'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import AutoComplete from 'material-ui/AutoComplete'
import TextField from 'material-ui/TextField'
import {row} from 'flexboxgrid'
import {epgBox, saveButton} from './style.css'
import autobind from 'autobind-decorator'

class EPGSelector extends React.Component {
  constructor(){
    super()
    this.state = {
      selected: {},
      filter: "",
      pendingChanges: false,
    }
  }

  componentWillMount(){
    this.setState({selected: this.props.selected})
  }

  addChoice(key, choice){
    var selected = this.state.selected
    selected[key] = choice
    this.setState({selected, pendingChanges: true})
  }

  removeChoice(key){
    var selected = this.state.selected
    delete selected[key]
    this.setState({selected, pendingChanges: true})
  }

  onSave(){
    this.props.onSave(this.state.selected)
    this.setState({pendingChanges: false})
  }

  componentWillReceiveProps(nextProps){
    this.setState({selected: nextProps.selected})
  }

  render() {
    return (
      <div className={row}>

        <div className={epgBox}>
          <List>
            <Subheader>Available EPGs</Subheader>
          <TextField style={{marginLeft: 15}} hintText="Filter" name="filter" onChange={(event) => this.setState({filter: event.target.value})}/>
          <div style={{maxHeight: 300, overflow: 'scroll'}}>
              {Object.keys(this.props.choices).map((k) => {
                var choice = this.props.choices[k]
                  if(!(k in this.state.selected) && (k.includes(this.state.filter))){
                    return (
                      <ListItem key={k} primaryText={choice.name} secondaryText={`${choice.tenant} - ${choice.ap}`} rightIcon={ <ChevronRight /> } onClick={this.addChoice.bind(this, k, choice)} />
                    )
                  }
              })}
          </div>
          </List>
        </div>

        <div className={epgBox}>
          <List>
            <Subheader>Selected EPGs</Subheader>
              {Object.keys(this.state.selected).map((k) => {
                var choice = this.state.selected[k]
                return (
                  <ListItem key={k} primaryText={choice.name} secondaryText={`${choice.tenant} - ${choice.ap}`} leftIcon={ <ChevronLeft /> } onClick={this.removeChoice.bind(this, k)}/>
                )
              })}
          </List>
        </div>

        <RaisedButton label="Save" className={saveButton} onClick={this.onSave.bind(this)} primary={this.state.pendingChanges}/>
      </div>
      )
  }
}

export default EPGSelector
