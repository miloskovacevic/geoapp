var React = require('react');

var CurrentLocation = React.createClass({
    toggleFavorite(){
        var address = this.props.address;
        this.props.onFavoriteToggle(address);
    },
    render(){
        var starClassName = "glyphicon glyphicon-star-empty";
        if(this.props.favorite){
            starClassName = "glyphicon glyphicon-star";
        }
        return (
            <div className="col-xs-12 col-md-6 col-md-offset-3 current-location">
                <h4 id="save-location">{this.props.address}</h4>
                <span className={starClassName} onClick={this.toggleFavorite} arria-hidden="true"></span>
            </div>
        );
    }
});

module.exports = CurrentLocation;