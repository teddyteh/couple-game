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
  const [skus, setSkus] = useState<string[]>([]);

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
        const response = await axios.get(skusUrl);
        setSkus(response.data);
      } catch (error) {
        console.error('Error fetching SKUs:', error);
      }
    };

    fetchSkus();
  }, []);

  useEffect(() => {
    if (initConnectionError) {
      console.error('initConnectionError', initConnectionError);
    }
  }, [initConnectionError]);

  useEffect(() => {
    if (connected && skus.length > 0) {
      getProducts({skus});
      getAvailablePurchases();
    }
  }, [connected, skus, getProducts, getAvailablePurchases]);

  useEffect(() => {
    const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
      if (purchase) {
        const {transactionReceipt} = purchase;
        if (transactionReceipt) {
          try {
            const result = await finishTransaction({purchase});
            console.info('currentPurchaseSuccess', result);
            _postMessageToWebApp('currentPurchaseSuccess', {
              purchase,
              result,
            });
          } catch (error) {
            console.error('currentPurchaseSuccess', error);
          }
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  useEffect(() => {
    if (currentPurchaseError) {
      console.error('currentPurchaseError', currentPurchaseError);
      _postMessageToWebApp('currentPurchaseError', currentPurchaseError);
    }
  }, [currentPurchaseError]);

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
      'Exit Game',
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

  const onMessage = (event: any) => {
    console.log('Message received from WebView:', event.nativeEvent.data);

    const {action, payload} = JSON.parse(event.nativeEvent.data);

    switch (action) {
      case 'getProducts':
        _postMessageToWebApp('products', products);
        break;
      case 'getAvailablePurchases':
        _postMessageToWebApp('availablePurchases', availablePurchases);
        break;
      case 'purchase':
        const product = payload.product as ProductAndroid;
        console.info('Purchasing product', product);
        requestPurchase({skus: [product.productId]});
        break;
      default:
        console.warn('Unknown action:', action);
    }
  };

  return (
    <View style={styles.container}>
      <WebView ref={webViewRef} source={{uri: gameUrl}} onMessage={onMessage} />
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
