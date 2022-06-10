import {Text, View, Animated} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      duration: 1500,
      posts: [],
      loader: true,
    };
  }
  componentDidMount = () => {
    if (this.props) {
      let posts = this.props.data.filter(
        item => item.post_type === this.props.type,
      );
      setInterval(() => {
        Animated.spring(this.state.animation, {
          toValue: 50,
          duration: this.state.duration,
          friction: 2,
          tension: 20,
          useNativeDriver: true,
        }).start();
        this.setState({
          loader: false,
          posts,
        });
      }, 1500);
    }
  };
  rendreActivity = item => {
    return (
      <View
        style={{
          marginLeft: wp('3%'),
          backgroundColor: '#FFF',
          height: hp('25%'),
          width: wp('40%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold'}}>{item.post_title}</Text>
      </View>
    );
  };
  render() {
    const trans = {
      transform: [
        {
          translateY: this.state.animation,
        },
      ],
    };
    return (
      <View style={{marginTop: hp('20%')}}>
        {!this.state.loader && (
          <>
            <Text
              style={{
                fontSize: hp('2.5%'),
                color: '#FFF',
                marginLeft: wp('3%'),
                fontWeight: 'bold',
              }}>
              POSTS
            </Text>
            <Animated.ScrollView horizontal style={[trans]}>
              {this.state.posts.map(item => this.rendreActivity(item))}
            </Animated.ScrollView>
          </>
        )}
      </View>
    );
  }
}

export default Cards;
