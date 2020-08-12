import fonts from './fonts';
import colors from './colors';

const homeStyles = {
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
  wpmText: {
    fontSize: 70,
    fontWeight: "800",
    color: "#FFF",
    paddingBottom: 0
  },
  warningText: {
    color: "#FFF",
    fontSize: 20,
    padding: 10
  },
  targetText: {
    color: "#FFF",
    fontSize: 15,
    padding: 5
  },
  symText: {
    color: "#FFF",
    fontSize: 18,
    padding: 0,
  },
  recBtn: {
    marginTop: 25,
  },
  disabledBtn: {
    marginTop: 25,
  },
  disabledText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: "center",
  }
};

export default homeStyles;
