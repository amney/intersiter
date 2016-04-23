import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

class ConfigSection extends React.Component {

  render() {
    return (
      <div>
          <CardHeader title={this.props.title} subtitle={this.props.subtitle} />
          <CardText expandable={true}>
              {this.props.children}
          </CardText>
      </div>
    );
  }

}

export default ConfigSection;
