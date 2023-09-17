import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {requestPurchase, useIAP, withIAPContext} from 'react-native-iap';
import {WebView} from 'react-native-webview';

const GAME_URL = 'https://couple-game.vercel.app/game';
const SKUS_URL = 'https://couple-game.vercel.app/api/skus';

// const GAME_URL = 'http://192.168.100.15:3000/game';
// const SKUS_URL = 'http://192.168.100.15:3000/api/skus';

const App = () => {
  const webViewRef = useRef<WebView>(null);
  const [skus, setSkus] = useState<string[]>([]);

  const {
    connected,
    products,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    // initConnectionError,
    // finishTransaction,
    getProducts,
    getAvailablePurchases,
  } = useIAP();

  useEffect(() => {
    const fetchSkus = async () => {
      try {
        const response = await axios.get(SKUS_URL);
        setSkus(response.data);
      } catch (error) {
        console.error('Error fetching SKUs:', error);
      }
    };

    fetchSkus();
  }, []);

  useEffect(() => {
    if (connected && skus.length > 0) {
      getProducts({skus});
      getAvailablePurchases();
    }
  }, [connected, skus, getProducts, getAvailablePurchases]);

  useEffect(() => {
    // ... listen to currentPurchaseError, to check if any error happened
  }, [currentPurchaseError]);

  useEffect(() => {
    // ... listen to currentPurchase, to check if the purchase went through
  }, [currentPurchase]);

  const onMessage = (event: any) => {
    const handlePurchase = async (sku: string) => {
      await requestPurchase({sku});
    };

    console.log('Message received from WebView:', event.nativeEvent.data);

    const {action} = JSON.parse(event.nativeEvent.data);

    switch (action) {
      case 'getProducts':
        webViewRef.current!.postMessage(
          JSON.stringify({
            action: 'products',
            data: products,
          }),
        );
        break;
      case 'getAvailablePurchases':
        webViewRef.current!.postMessage(
          JSON.stringify({
            action: 'availablePurchases',
            data: availablePurchases,
          }),
        );
        break;
      case 'purchase':
        handlePurchase(event.nativeEvent.data.sku);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{uri: GAME_URL}}
        onMessage={onMessage}
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
