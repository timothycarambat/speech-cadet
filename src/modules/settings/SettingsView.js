import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { fonts, colors, settingsStyles } from '../../styles';
import { Text } from '../../components/StyledText';
import { Button } from '../../components';
import { useNavigation } from '@react-navigation/native';

class SettingsScreen extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      lowerBound: 110,
      upperBound: 200,
      warning: null,
    }
  }

  handleTargetChange = (e, key) => {
    const {lowerBound, upperBound} = this.state
    let val = +e.nativeEvent.text

    if (isNaN(val) || val <=0) {
      val = key == 'upperBound' ? upperBound : lowerBound
    }

    this.setState({[key]: val}, () => {
      // console.log(`Saved ${val} for ${key}!`)
    })
  }

  saveTargets = () => {
    let {lowerBound, upperBound, warning} = this.state

    if (lowerBound > upperBound) {
      warning = 'Lower Bound Cannot Be More Than Upper Bound.'
      lowerBound = upperBound
    } else if (upperBound < lowerBound) {
      warning = 'Upper Bound Cannot Be Less Than Lower Bound.'
      upperBound = lowerBound
    } else {
      warning = null
    }

    if (!warning) {
      this.props.navigation.navigate('Record', {bounds: {lowerBound: lowerBound, upperBound: upperBound}});
    } else {
      this.setState({warning: warning, lowerBound: lowerBound, upperBound: upperBound})
    }
  }

  render() {
    const {lowerBound, upperBound, warning} = this.state

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={settingsStyles.container}>
            <ImageBackground
              source={require('../../../assets/images/background.png')}
              style={[settingsStyles.bgImage, settingsStyles.fullWidth]}
              resizeMode="cover"
            >
              <View style={[settingsStyles.section, settingsStyles.sectionLarge]}>
                <View style={[settingsStyles.card]}>
                    <Text style={settingsStyles.cardHeader}> Settings & Targets</Text>

                    <View style={[settingsStyles.formGroup]}>
                      <Text style={[settingsStyles.formLabel]}> Lower Limit WPM:</Text>
                      <TextInput
                        keyboardType={'numeric'}
                        placeholder="Enter Your Lower Bound WPM Target"
                        style={settingsStyles.formInput}
                        onChange={(e) => this.handleTargetChange(e, 'lowerBound')}
                        value={lowerBound.toString()}
                      />
                    </View>

                    <View style={[settingsStyles.formGroup]}>
                      <Text style={[settingsStyles.formLabel]}> Upper Limit WPM:</Text>
                        <TextInput
                          keyboardType={'numeric'}
                          placeholder="Enter Your Upper Bound WPM Target"
                          style={settingsStyles.formInput}
                          onChange={(e) => this.handleTargetChange(e, 'upperBound')}
                          value={upperBound.toString()}
                        />
                    </View>

                    {warning ? <Text style={[settingsStyles.warning]}>Alert: {warning}</Text> : null}
                    <Button
                      style={settingsStyles.saveBtn}
                      textColor={'#000'}
                      bgColor={colors.primary}
                      caption={"Save Settings"}
                      onPress={this.saveTargets}
                    />

                </View>
              </View>
            </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default function(props) {
  const navigation = useNavigation();

  return <SettingsScreen {...props} navigation={navigation} />;
}
