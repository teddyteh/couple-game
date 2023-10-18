import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import {
  ProductAndroid,
  Purchase,
  requestPurchase,
  useIAP,
  withIAPContext,
} from 'react-native-iap';
import {WebView} from 'react-native-webview';
import {gameUrl, skusUrl} from './config';

// React Native IAP usage: https://dev.to/amazonappdev/react-native-iap-one-package-to-rule-them-all-4f0n

const App = () => {
  const webViewRef = useRef<WebView>(null);
  const [skus, setSkus] = useState<string[] | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const {
    connected,
    products,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
    getAvailablePurchases,
  } = useIAP();

  useEffect(() => {
    const fetchSkus = async () => {
      try {
        console.info('Fetching SKUs', skusUrl);
        const {data} = await axios.get(skusUrl);
        console.info('SKUs', JSON.stringify(data));
        setSkus(data);
      } catch (error) {
        console.error('Error fetching SKUs', error);
      }
    };

    fetchSkus();
  }, []);

  useEffect(() => {
    if (initConnectionError) {
      console.error('initConnectionError', initConnectionError);
      _postMessageToWebApp('initConnectionError', initConnectionError);
    }
  }, [initConnectionError]);

  useEffect(() => {
    if (!connected || !skus) {
      return;
    }

    console.info('Getting products and available purchases', skus);
    getProducts({skus});
    getAvailablePurchases();
  }, [connected, skus, getProducts, getAvailablePurchases]);

  useEffect(() => {
    if (!products || !availablePurchases) {
      return;
    }

    const storeData = {products, availablePurchases};
    console.info('storeData', storeData);
    _postMessageToWebApp('storeData', storeData);
  }, [hasLoaded, products, availablePurchases]);

  useEffect(() => {
    const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
      if (!purchase) {
        return;
      }

      const {transactionReceipt} = purchase;
      if (transactionReceipt) {
        try {
          const result = await finishTransaction({purchase});
          console.info('currentPurchaseSuccess', result);
          _postMessageToWebApp('currentPurchaseSuccess', result);
          getAvailablePurchases();
        } catch (error) {
          console.error('currentPurchaseSuccess', error);
        }
      }
    };

    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction, getAvailablePurchases]);

  useEffect(() => {
    if (currentPurchaseError) {
      console.error('currentPurchaseError', currentPurchaseError);
      _postMessageToWebApp('currentPurchaseError', currentPurchaseError);
    }
  }, [currentPurchaseError]);

  useEffect(() => {
    console.info('availablePurchases', availablePurchases);
    _postMessageToWebApp('availablePurchases', availablePurchases);
  }, [availablePurchases]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', _handleBackButtonPress);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        _handleBackButtonPress,
      );
    };
  }, []);

  const _postMessageToWebApp = (action: string, data: any) => {
    webViewRef.current!.postMessage(
      JSON.stringify({
        action,
        data,
      }),
    );
  };

  const _handleBackButtonPress = () => {
    Alert.alert(
      'Exit',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );

    return true;
  };

  const _copyToClipboard = (text: string) => Clipboard.setString(text);
  
  const onMessage = (event: any) => {
    console.info('Message received from WebView:', event.nativeEvent.data);

    const {action, payload} = JSON.parse(event.nativeEvent.data);

    if (action === 'purchase') {
      const product = payload.product as ProductAndroid;
      console.info('Purchasing product', product);
      requestPurchase({skus: [product.productId]});
      return;
    }

    if (action === 'copyToClipboard') {
      _copyToClipboard(payload);
    }
  };

  const onLoadEnd = () => {
    setHasLoaded(true);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{uri: gameUrl}}
        onMessage={onMessage}
        onLoad={onLoadEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default withIAPContext(App);
