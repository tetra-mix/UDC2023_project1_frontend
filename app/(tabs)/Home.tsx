import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Surface } from 'react-native-paper';
import { Flex, Center } from 'native-base';
// UIライブラリが使用できない　←原因不明
// 使いたいのはレイアウトができるライブラリ mui, native-base
// これを使うと静的レンダリングエラーが発生する。
// 使えるライブラリは react-native-paper

import '../../css/style.css'
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Surface style={styles.surface} elevation={4}>
        <Text>Surface</Text>
        <Text>Surface</Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
