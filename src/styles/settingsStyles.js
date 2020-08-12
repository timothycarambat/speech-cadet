import { Platform } from 'react-native';
import fonts from './fonts';
import colors from './colors';

const settingsStyles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  fullWidth: {
    width: '100%'
  },
  card: {
    borderRadius: 20,
    backgroundColor: "#FFF",
    width: "100%",
    height: "60%",
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  cardHeader: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "800",
    marginTop: 10,
    color: '#232b2b',
  },
  formGroup: {
    margin: 20,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  formInput: {
    fontSize: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  saveBtn: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  warning: {
    textAlign: "center",
    fontSize: 10,
    color: "red",
  },


};

export default settingsStyles;
