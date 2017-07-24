
'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
    	flex: 1,  
      backgroundColor: '#FFFFFF'
    },row: {
    	flex: 1, 
    	alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 15,
        alignItems: 'center'
    },
  canvas: { 
     position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
},
});
