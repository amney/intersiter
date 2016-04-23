import React from 'react';
import autobind from 'autobind-decorator';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import ChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import AutoComplete from 'material-ui/lib/auto-complete';

@autobind
class EPGSelector extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-6">
          <List subheader="Available EPGs">
            <ListItem primaryText="EPG1" secondaryText="Tenant A - App B" rightIcon={ <ChevronRight /> } />
            <ListItem primaryText="EPG2" secondaryText="Tenant A - App B" rightIcon={ <ChevronRight /> } />
            <ListItem primaryText="EPG3" secondaryText="Tenant A - App B" rightIcon={ <ChevronRight /> } />
          </List>
          <AutoComplete style={ {  marginLeft: 7,  width: '100%'} } hintText="Search for EPG" filter={ AutoComplete.noFilter } dataSource={ ['EPGA', 'EPGB'] } />
        </div>
        <div className="col-lg-6">
          <List subheader="Selected EPGs">
            <ListItem primaryText="EPG4" secondaryText="Tenant A - App B" leftIcon={ <ChevronLeft /> } />
          </List>
        </div>
      </div>
      );
  }
}

export default EPGSelector;
