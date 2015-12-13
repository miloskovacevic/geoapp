var React = require('react');
var LocationItem = require('./LocationItem');

var LocationList = React.createClass({
    render(){
        var self = this;
        var locations = this.props.locations.map(function (location, i) {
            var active = self.props.activeLocationAddress == location.address;
            return <LocatonItem address={location.address} timestamp={location.timestamp}
                    active={active} onClick={this.props.onClick} />
        });

        if(!locations.length){
            return null;
        }

        return (
            <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                <span className="list-group-item active">Saved Locations</span>
                {locations}
            </div>
        );
    }
});

module.exports = LocationList;