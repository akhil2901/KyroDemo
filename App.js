import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Image,
} from 'react-native';
import customData from './sample.json';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Cards from './Cards';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(hp('50%')),
      width: new Animated.Value(wp('70%')),
      top: new Animated.Value(hp('18%')),
      left: new Animated.Value(0),
      right: new Animated.Value(0),
      selectedCard: null,
      duration: 1500,
      data: [],
    };
  }
  componentDidMount = () => {
    let types = [...new Set(customData.data.map(item => item.post_type))];
    this.setState({
      data: types,
    });
  };
  animateButton = index => {
    this.carousel.scrollToIndex({index});
    if (index === this.state.selectedCard) {
      this.setState({
        selectedCard: null,
      });
      Animated.parallel([
        Animated.timing(this.state.height, {
          toValue: hp('50%'),
          duration: this.state.duration,
        }).start(),
        Animated.timing(this.state.width, {
          toValue: wp('70%'),
          duration: this.state.duration,
        }).start(),
        Animated.timing(this.state.top, {
          toValue: hp('18%'),
          duration: this.state.duration,
        }).start(),
      ]);
    } else {
      this.setState({
        selectedCard: index,
      });
      Animated.parallel([
        Animated.timing(this.state.height, {
          toValue: hp('90%'),
          duration: this.state.duration,
        }).start(),
        Animated.timing(this.state.width, {
          toValue: wp('95%'),
          duration: this.state.duration,
        }).start(),
        Animated.timing(this.state.top, {
          toValue: hp('0%'),
          duration: this.state.duration,
        }).start(),
      ]);
    }
  };

  renderData = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.animateButton(index)}
        disabled={this.state.selectedCard === null ? false : true}>
        <Animated.View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            height:
              this.state.selectedCard === index ? this.state.height : hp('50%'),
            width:
              this.state.selectedCard === index ? this.state.width : wp('70%'),
            marginLeft:
              this.state.selectedCard === index ? wp('3%') : wp('10%'),
          }}>
          <ImageBackground
            source={require('./img_lights.jpeg')}
            style={{flex: 1}}>
            {this.state.selectedCard === index && (
              <TouchableOpacity
                onPress={() => this.animateButton(index)}
                style={{marginTop: hp('2%'), marginLeft: wp('2%')}}>
                <Image source={require('./arrow-left.png')} />
              </TouchableOpacity>
            )}
            <Text
              style={{
                color: '#FFF',
                padding: hp('2%'),
                fontSize: hp('3%'),
                fontWeight: 'bold',
              }}>
              {item.toUpperCase()}
            </Text>
            {this.state.selectedCard === index && (
              <Cards type={item} data={customData.data} />
            )}
          </ImageBackground>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={{marginTop: hp('8%'), marginLeft: wp('4%')}}>
            <Text style={{fontSize: hp('2.5%'), fontWeight: 'bold'}}>
              TRIPS
            </Text>
          </View>

          <Animated.FlatList
            data={this.state.data}
            renderItem={this.renderData}
            keyExtractor={item => item.id}
            nestedScrollEnabled={true}
            horizontal={true}
            ref={el => (this.carousel = el)}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={this.state.selectedCard === null ? true : false}
            style={{
              position: 'absolute',
              top: this.state.top,
            }}
            contentContainerStyle={{paddingRight: wp('28%')}}
          />
        </View>
      </SafeAreaView>
    );
  }
}
