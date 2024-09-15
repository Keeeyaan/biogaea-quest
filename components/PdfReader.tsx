import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Pdf from "react-native-pdf";
import { Asset } from "expo-asset";

const pdfAssets: { [key: string]: any } = {
  "genetic-engineering": require("../assets/pdfs/genetic-engineering.pdf"),
  "interaction-and-interdependence": require("../assets/pdfs/interaction-and-interdependence.pdf"),
  "organ-systems-of-representative-animals": require("../assets/pdfs/organ-systems-of-representative-animals.pdf"),
  "process-of-evolution": require("../assets/pdfs/process-of-evolution.pdf"),
};

const PdfReader = ({ topic }: { topic: string | string[] }) => {
  const [pdfUri, setPdfUri] = useState<null | string>(null);

  useEffect(() => {
    const loadPdf = async () => {
      const selectedPdf = pdfAssets[topic as string];
      // Load the asset
      const asset = Asset.fromModule(selectedPdf);
      await asset.downloadAsync();

      setPdfUri(asset.localUri || asset.uri);
    };

    loadPdf();
  }, []);

  if (!pdfUri) {
    return (
      <View style={styles.container}>
        <Text>Loading PDF...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Pdf Reader</Text>
      <Pdf
        style={styles.pdf}
        source={{ uri: pdfUri, cache: true }}
        trustAllCerts={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 80,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default PdfReader;
