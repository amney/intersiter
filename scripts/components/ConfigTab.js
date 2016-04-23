import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

class ConfigTab extends React.Component {

  render() {
    return (
      <Card style={{ minHeight: '100%'}}>
        <CardHeader subtitle={this.props.title} style={{height:40, paddingTop: 27}}/>
        <CardText>
          <div className="row"  style={{marginBottom: 20}}>
            <div className="col-lg-12" >
                  {this.props.children}
            </div>
          </div>
        </CardText>
      </Card>
    );
  }

}

export default ConfigTab;
