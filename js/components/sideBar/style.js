
'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
	sidebar: {
 		flex: 1,
        padding: 0,
        paddingRight: 0,	        
        paddingTop: 0,
 		backgroundColor: '#FFFFFF', 
    },
    listitem:{
       flexDirection:'row' ,
      flex: 1,
                          padding:4,
                          justifyContent: 'flex-start',
                          alignItems: 'stretch',
                          backgroundColor: "rgba(0,0,0,0)",
    }
});
