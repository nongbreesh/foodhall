<<<<<<< HEAD
<<<<<<< HEAD
import Color from 'color';

import {Platform} from 'react-native';

module.exports = {
    brandPrimary : "#38C872",
    brandInfo: "#5bc0de",
    brandSuccess: "#5cb85c",
    brandDanger: "#d9534f",
    brandWarning: "#f0ad4e",
    brandSidebar: "#252A30",

    fontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'Roboto',
    btnFontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'Roboto_medium',
    iconFamily: 'Ionicons',

    subtitleColor: '#8e8e93',

    inverseTextColor: "#000",
    textColor: "#fff",

    fontSizeBase: 15,
    titleFontSize: (Platform.OS === 'ios' ) ? 17 : 19,
    subTitleFontSize: (Platform.OS === 'ios' ) ? 12 : 14,

    inputFontSize: 15,
    inputLineHeight: 18,

    get fontSizeH1 () {
        return this.fontSizeBase*1.8;
    },
    get fontSizeH2 () {
        return this.fontSizeBase* 1.6;
    },
    get fontSizeH3 () {
        return this.fontSizeBase* 1.4;
    },
    get btnTextSize () {
        return (Platform.OS==='ios') ? this.fontSizeBase* 1.1 :
        this.fontSizeBase-1;
    },
    get btnTextSizeLarge () {
        return this.fontSizeBase* 1.5;
    },
    get btnTextSizeSmall () {
        return this.fontSizeBase* .8;
    },
    get iconSizeLarge () {
        return this.iconFontSize* 1.5;
    },
    get iconSizeSmall () {
        return this.iconFontSize* .6;
    },

    buttonPadding: 6,

    borderRadiusBase: (Platform.OS === 'ios' ) ? 5 : 2,

    get borderRadiusLarge () {
        return this.fontSizeBase* 3.8;
    },

    footerHeight: 55,
    toolbarHeight: (Platform.OS === 'ios' ) ? 64 : 56,
    toolbarDefaultBg: "#38C872",
    toolbarInverseBg: "#222",

    iosToolbarBtnColor: '#fff',

    toolbarTextColor: '#fff',

    checkboxBgColor: '#039BE5',
    checkboxTickColor: '#fff',

    checkboxSize: 23,

    radioColor: '#7e7e7e',
    get radioSelectedColor() {
        return Color(this.radioColor).darken(0.2).hexString();
    },

    radioBtnSize: (Platform.OS === 'ios') ? 25 : 23,

    tabBgColor: "#00c497",
    tabFontSize: 15,
    tabTextColor: "#fff",

    btnDisabledBg: '#b5b5b5',
    btnDisabledClr: '#f1f1f1',

    cardDefaultBg: '#fff',

    get darkenHeader() {
        return Color(this.tabBgColor).darken(0.03).hexString();
    },

    get statusBarColor() {
        return Color(this.toolbarDefaultBg).darken(0.1).hexString();
    },

    get btnPrimaryBg () {
        return this.brandPrimary;
    },
    get btnPrimaryColor () {
        return this.inverseTextColor;
    },
    get btnSuccessBg () {
        return this.brandSuccess;
    },
    get btnSuccessColor () {
        return this.inverseTextColor;
    },
    get btnDangerBg () {
        return this.brandDanger;
    },
    get btnDangerColor () {
        return this.inverseTextColor;
    },
    get btnInfoBg () {
        return this.brandInfo;
    },
    get btnInfoColor () {
        return this.inverseTextColor;
    },
    get btnWarningBg () {
        return this.brandWarning;
    },
    get btnWarningColor () {
        return this.inverseTextColor;
    },

    borderWidth: 1,
    iconMargin: 7,

    get inputColor () {
        return this.textColor;
    },
    get inputColorPlaceholder () {
        return '#dddddd';
    },

    inputBorderColor: "#fff",
    inputSuccessBorderColor: '#2b8339',
    inputErrorBorderColor: '#ed2f2f',
    inputHeightBase: 40,
    inputGroupMarginBottom: 10,
    inputPaddingLeft: 5,
    get inputPaddingLeftIcon () {
        return this.inputPaddingLeft* 8;
    },

    btnLineHeight: 19,

    dropdownBg: "#000",
    dropdownLinkColor: "#414142",

    jumbotronPadding: 30,
    jumbotronBg: "#C9C9CE",

    contentPadding: 10,

    listBorderColor: "rgba(181, 181, 181, 0.34)",
    listDividerBg: "#f2f2f2",
    listItemPadding: 15,
    listNoteColor: "#bababa",
    listNoteSize: 13,
    listBg: "#fff",

    iconFontSize: (Platform.OS === 'ios' ) ? 30 : 28,

    badgeColor: "#fff",
    badgeBg: "#ED1727",

    lineHeight: (Platform.OS==='ios') ? 21 : 25,
    iconLineHeight: (Platform.OS === 'ios' ) ? 37 : 30,

    toolbarIconSize: (Platform.OS === 'ios' ) ? 20 : 22,

    toolbarInputColor: '#CECDD2',

    defaultSpinnerColor: "#45D56E",
    inverseSpinnerColor: "#1A191B",

    defaultProgressColor: "#E4202D",
    inverseProgressColor: "#1A191B"
}
=======
=======
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
import color from 'color';

import { Platform } from 'react-native';

export default {

    // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',


  // Button
  btnFontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto_medium',
  btnDisabledBg: '#b5b5b5',
  btnDisabledClr: '#f1f1f1',

  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return (Platform.OS === 'ios') ? this.fontSizeBase * 1.1 :
    this.fontSizeBase - 1;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },

  buttonPadding: 6,

  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },


  // Card
  cardDefaultBg: '#fff',


  // Check Box
  checkboxBgColor: '#039BE5',
  checkboxSize: 23,
  checkboxTickColor: '#fff',


  // Color
  brandPrimary: '#5067FF',
  brandInfo: '#5bc0de',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandSidebar: '#252932',


  // Font
  fontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto',
  fontSizeBase: 15,

  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },


  // Footer
  footerHeight: 55,
  footerDefaultBg: (Platform.OS === 'ios') ? '#F8F8F8' : '#4179F7',


  // FooterTab
  tabBarTextColor: (Platform.OS === 'ios') ? '#6b6b6b' : '#b3c7f9',
  tabBarActiveTextColor: (Platform.OS === 'ios') ? '#007aff' : '#fff',
  tabActiveBgColor: (Platform.OS === 'ios') ? '#e4f0fe' : undefined,


  // Header
  iosToolbarBtnColor: '#007aff',
  toolbarDefaultBg: (Platform.OS === 'ios') ? '#F8F8F8' : '#4179F7',
  toolbarHeight: (Platform.OS === 'ios') ? 64 : 56,
  toolbarIconSize: (Platform.OS === 'ios') ? 20 : 22,
  toolbarInputColor: '#CECDD2',
  toolbarInverseBg: '#222',
  toolbarTextColor: (Platform.OS === 'ios') ? '#000' : '#fff',
  get statusBarColor() {
    return color(this.toolbarDefaultBg).darken(0.2).hexString();
  },


  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: (Platform.OS === 'ios') ? 30 : 28,
  iconMargin: 7,


  // InputGroup
  inputFontSize: 15,
  inputBorderColor: '#D9D5DC',
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: '#ed2f2f',

  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return '#575757';
  },

  inputGroupMarginBottom: 10,
  inputHeightBase: 40,
  inputPaddingLeft: 5,

  get inputPaddingLeftIcon() {
    return this.inputPaddingLeft * 8;
  },


  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: (Platform.OS === 'ios') ? 37 : 30,
  lineHeight: (Platform.OS === 'ios') ? 20 : 26,


  // List
  listBorderColor: '#ACAAAB',
  // listBorderColor: '#ddd',
  listDividerBg: '#ddd',
  listItemHeight: 45,
  listItemPadding: 9,
  listNoteColor: '#808080',
  listNoteSize: 13,


  // Progress Bar
  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',


  // Radio Button
  radioBtnSize: (Platform.OS === 'ios') ? 25 : 23,
  radioColor: '#7e7e7e',

  get radioSelectedColor() {
    return color(this.radioColor).darken(0.2).hexString();
  },


  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',


  // Tabs
  tabBgColor: '#F8F8F8',
  tabFontSize: 15,
  tabTextColor: '#fff',


  // Text
  textColor: '#000',
  inverseTextColor: '#fff',


  // Title
  titleFontSize: (Platform.OS === 'ios') ? 17 : 19,
  subTitleFontSize: (Platform.OS === 'ios') ? 12 : 14,
  subtitleColor: '#8e8e93',


  // Other
  borderRadiusBase: (Platform.OS === 'ios') ? 5 : 2,
  borderWidth: 1,
  contentPadding: 10,

  get darkenHeader() {
    return color(this.tabBgColor).darken(0.03).hexString();
  },

  dropdownBg: '#000',
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  jumbotronBg: '#C9C9CE',
  jumbotronPadding: 30,
};
<<<<<<< HEAD
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
=======
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
