import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Grayscale,
  HueRotate
} from 'react-native-color-matrix-image-filters';
import SystemSetting from 'react-native-system-setting'
import { fonts, colors, homeStyles } from '../../styles';
import { Text } from '../../components/StyledText';
import { Button } from '../../components';
import Voice from '@react-native-community/voice';
import AnimateNumber from 'react-native-animate-number'
import syllable from 'syllable'

class HomeScreen extends React.Component  {
  constructor(props) {
    super(props);
    Voice.onSpeechResults = this.onSpeechResults

    this.state = {
      wpm: 0,
      spm: 0,
      syllableCount: 0,
      wpmLog: [],
      recording: false,
      speechResults: '',
      sampleLength: Platform.OS === 'ios' ? 5000 : 10000,
      hasVoiceEnabled: false ,
    }
    this.checkVoice()

    // setInterval(() => {
    //   this.setState({recording: true, wpm: this.state.wpm + 20, spm: this.state.spm + 20, syllableCount: this.state.syllableCount + 20})
    // }, 1500)
  }

  checkVoice = () => {
    Voice.isAvailable().then((status) => {
      this.setState({hasVoiceEnabled: status == 1 ? 1 : 0})
    })
  }

  calcSettings = () => {
    let setLowerBound = 110
    let setUpperBound = 200

    if (this.props.route.params && this.props.route.params.bounds) {
      setLowerBound = this.props.route.params.bounds.lowerBound
      setUpperBound = this.props.route.params.bounds.upperBound
    }

    const lb =  setLowerBound
    const ub =  setUpperBound
    return {
        greenZone: {
          lowerBound: lb,
          upperBound: ub,
        },
        yellowZone: {
          left: {
            lowerBound: lb - (lb * .25),
            upperBound: lb,
          },
          right: {
            lowerBound: ub,
            upperBound: ub + (ub * .25),
          }
        },
        redZone: {
          left: {
            lowerBound: 1,
            upperBound: lb - (lb * .25),
          },
          right: {
            lowerBound: ub + (ub * .25),
            upperBound: ub + (ub * .5),
          }
        }
    }
  }

  resetHome = () => {
    this.setState({
        wpm: 0,
        spm: 0,
        syllableCount: 0,
        wpmLog: [],
        recording: false,
        speechResults: '',
    })
  }

  calculateAvgWPM = () => {
    const {wpmLog} = this.state

    return ~~(wpmLog.reduce((sum, el) => sum + el, 0) / wpmLog.length)
  }

  recordingInverval = () => {
    // console.log('------- STARTING RECORDING FUNCTION-------')
    const {recording, sampleLength} = this.state
    if (!recording){ return false }

    const startTime = + new Date()
    Voice.start('en-US')

    setTimeout(() => {
      // console.log('------- TIMEOUT POPPED -------')
      Voice.stop()
      const {recording, startTime, speechResults, wpmLog, syllableCount} = this.state
      const speakingResults = speechResults.split(' ').filter(n => n != '')
      const wordCount = speakingResults.length
      const newSyllableCount = syllableCount + speakingResults.reduce((acc, el) => acc + syllable(el), 0)
      const timestamp = + new Date()
      const elapsedMins = (timestamp - startTime) * 1.66667e-5

      const wpm = ~~(wordCount / elapsedMins)
      const spm = ~~(newSyllableCount / elapsedMins)
      wpmLog.push(wpm)

      // console.log(speakingResults)

      this.setState({wpm: wpm, spm: spm, wpmLog: wpmLog, startTime: null, syllableCount: newSyllableCount}, () => {
        // console.log('Recursively Calling Recording Function')
        this.recordingInverval()
      })
    }, sampleLength)

    this.setState({
      startTime: startTime
    })
  }

  toggleVoice = () => {
    const {recording, wpmLog} = this.state

    // Need to call recursive function that establishes a timestamp
    // and also a timeout. WHen timeout pops it does the math and then calls
    // the original function again.

    if (!recording) {
      Platform.OS === 'ios' ? null : SystemSetting.setVolume(0);
      // console.log(`Voice Polling Started.`)
    } else {
      Voice.stop()
      Platform.OS === 'ios' ? null : SystemSetting.setVolume(0.5);
      // console.log(`Voice Polling Stopped.`)
    }

    this.setState({recording: !recording}, this.recordingInverval)
  }

  onSpeechResults = (e) => {
    this.setState({
      speechResults: e.value[0]
    })
  };

  calculateMood = (wpm) => {
    const settings = this.calcSettings()
    let rotation = 0

    if (wpm > 0 && (wpm < settings.redZone.left.upperBound || wpm >= settings.redZone.right.lowerBound)) {
      // RED
      rotation = 8.5
    } else if ((wpm >= settings.yellowZone.left.lowerBound && wpm < settings.yellowZone.left.upperBound) || (wpm >= settings.yellowZone.right.lowerBound && wpm <settings.yellowZone.right.upperBound)) {
      // YELLOW
      rotation = 9.3
    } else if (wpm >= settings.greenZone.lowerBound && wpm < settings.greenZone.upperBound) {
      // GREEN
      rotation = 11
    } else {
      rotation = 0
    }

    return rotation
  }

  calculateWarning = (wpm) => {
    const settings = this.calcSettings()
    let warning = ''

    if (wpm > 0 && wpm < settings.redZone.left.upperBound) {
      // RED
      warning = "You are way below your target!"
    }else if (wpm >= settings.redZone.right.lowerBound) {
      // RED
      warning = "You are way above your target!"
    }else if (wpm >= settings.yellowZone.left.lowerBound && wpm < settings.yellowZone.left.upperBound) {
      // YELLOW
      warning = "You are a bit below your target!"
    } else if (wpm >= settings.yellowZone.right.lowerBound && wpm <settings.yellowZone.right.upperBound) {
      // YELLOW
      warning = "You are a bit above your target!"
    } else if (wpm >= settings.greenZone.lowerBound && wpm < settings.greenZone.upperBound) {
      // GREEN
      warning = "You are in your target range!"
    }

    return warning
  }

  render() {
    const {recording, wpm, wpmLog, spm, syllableCount, hasVoiceEnabled} = this.state
    const settings = this.calcSettings()
    const format = (prepend, wpm) => {return `${prepend} ${~~(wpm)}`}

    return(
      <View style={homeStyles.container}>
        <HueRotate amount={this.calculateMood(wpm)}>
        <Grayscale amount={recording ? 0 : 1} style={[homeStyles.bgImage, homeStyles.fullWidth]}>
          <ImageBackground
            source={require('../../../assets/images/background.png')}
            style={homeStyles.bgImage}
            resizeMode="cover"
          >
            <View style={[homeStyles.section, homeStyles.sectionLarge]}>

              <AnimateNumber
                style={homeStyles.wpmText}
                value={wpm}
                formatter={(val) => format('WPM:', val)}
              />
              <AnimateNumber
                style={homeStyles.symText}
                value={spm}
                formatter={(val) => format('Syllables Per Min:', val)}
              />
              <AnimateNumber
                style={homeStyles.symText}
                value={syllableCount}
                formatter={(val) => format('Est. Total Syllables:', val)}
              />
              {
                !hasVoiceEnabled ?
                <View>
                  <Button
                    style={homeStyles.disabledBtn}
                    bordered
                    textColor={'#FFF'}
                    caption={"Recording Disabled"}
                  />
                  <Text style={homeStyles.disabledText}>
                    {`This application requires speech recognition to function.\n Please enable speech recognition access before proceeding.`}
                  </Text>
                </View>
                :
                <Button
                  style={homeStyles.recBtn}
                  textColor={!recording ? '#FFF' : '#000'}
                  bordered={!recording}
                  bgColor={!recording ? '#FFF' : colors.primary}
                  caption={recording ? "Stop Recording" : "Start Recording"}
                  onPress={this.toggleVoice}
                  disabled={!hasVoiceEnabled}
                />

              }

              {hasVoiceEnabled ?
                <Text style={homeStyles.targetText}>Target: {`${settings.greenZone.lowerBound} - ${settings.greenZone.upperBound} WPM`}</Text>
                : null
              }

              {recording ?
                <Text style={homeStyles.warningText}>{this.calculateWarning(wpm)}</Text> : null
              }

              {!recording && wpmLog.length > 0 ?
                <View>
                  <Text style={homeStyles.warningText}>Your average WPM was {this.calculateAvgWPM()}</Text>
                  <Button
                    textColor={'#FFF'}
                    bgColor={'#000'}
                    caption={"Reset"}
                    onPress={this.resetHome}
                  />
                </View>
                : null
              }

            </View>
          </ImageBackground>
        </Grayscale>
        </HueRotate>
      </View>
    )
  }
}

export default HomeScreen
