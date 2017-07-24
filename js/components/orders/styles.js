
'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
    flex: 1
  },
row:{
    flex:1, 
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  selectionText:{
    fontSize:15, 
    color:'#b5b5b5',
    textAlign:'right',
    justifyContent: 'flex-end',
    flex:.2
  },
});
