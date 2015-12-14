var React = require('react');

//var Search = require('./Search');
//var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');


var APP = React.createClass({
    getInitialState(){
        // local storage lookup for locations...
        var favorites = [];
        if(localStorage.favorites){
            favorites = JSON.parse(localStorage.favorites);
        }
        return {
            favorites: favorites,
            currentAddress: 'Belgrade, Serbia',
            mapCoordinates: {
                lat: 44.8205556,
                lng: 20.4622222
            }
        };
    },

    toggleFavorite(address){
        if(this.isAddressInFavorites(address)){
            this.removeFromFavorites(address);
        } else {
          this.addToFavorites(address);
        }
    },

    addToFavorites(address){
        var favorites = this.state.favorites;

        favorites.push({
            address: address,
            timestamp: Date.now()
        });
        this.setState({
            favorites: favorites
        });
        localStorage.favorites = JSON.stringify(favorites);
    },

    removeFromFavorites(address){
        var favorites = this.state.favorites;
        var index = -1;

        for(var i = 0; i < favorites.length; i++){
            if(favorites[i].address === address){
                index = i;
                break;
            }
        }

        if(index !== -1){
            favorites.splice(index, 1);
            this.setState({
                favorites: favorites
            });

            localStorage.favorites = JSON.stringify(favorites);
        }
    },

    isAddressInFavorites(address){
        var favorites = this.state.favorites;

        for(var i = 0; i < favorites.length; i++){
            if(favorites[i].address === address){
                return true;
            }
        }

        return false;
    },

    searchForAddress(address){
        var self = this;

        //using GMap's geocode functionality... via Google Maps API...
        GMaps.geocode({
            address: address,
            callback: function(results, status){
                if(status !== 'OK') return;

                var latlng = results[0].geometry.location;

                self.setState({
                    currentAddress: results.formatted_address,
                    mapCoordinates: {
                            lat: latlng.lat(),
                            lng: latlng.lng()
                    }
                });
            }
        });

        //TODO: ovo prebaci u render izmedju h1 i CurrentLocation kad ih napravis...
        //<Search onSearch={this.searchForAddress} />
        //<Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
    },

    render() {
        return (
            <div>
                <h1>Your Google Maps Locations</h1>


                <CurrentLocation address={this.state.currentAddress}
                                 favorite={this.isAddressInFavorites(this.state.currentAddress)}
                                 onFavoriteToggle={this.toggleFavorite}
                    />
                <LocationList locations={this.state.favorites} activeLocationAddress={this.state.currentAddress}
                              searchForAddress={this.searchForAddress}
                    />
            </div>

        );
    }
});

module.exports = APP;