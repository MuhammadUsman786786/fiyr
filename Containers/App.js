import React, {Component} from 'react';
import {
  BackHandler,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import ProgressDialog from '../Components/ProgressDialog';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  webView = {
    canGoBack: false,
    ref: null,
  };

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  onLoadEndHandler = () => {
    this.setState({isLoading: false});
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <WebView
              source={{uri: 'https://www.fiyrtwit.com'}}
              ref={webView => {
                this.webView.ref = webView;
              }}
              onNavigationStateChange={navState => {
                this.webView.canGoBack = navState.canGoBack;
              }}
              onLoadEnd={this.onLoadEndHandler}
            />
          </View>
          <ProgressDialog display={this.state.isLoading} color={'black'} />
        </SafeAreaView>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
