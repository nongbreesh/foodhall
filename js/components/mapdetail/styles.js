
'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
   container: {
    flex: 1, 
    backgroundColor: '#F5FCFF',
      justifyContent: 'center'
  },
  map: { 
     position:'absolute', 
                         top:0,
                         left: 0,
                         right: 0,
                          bottom: 0,
  },
   mapCenterMarker: {
    width: 32,
    height: 32,
    backgroundColor: 'black'
  },
});
