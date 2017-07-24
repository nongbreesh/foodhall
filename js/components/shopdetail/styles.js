
'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F8',
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
  floatbutton:{
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3C42C',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 10,
  },

});
