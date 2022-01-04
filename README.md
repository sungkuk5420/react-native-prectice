 ### 개발 시작

create react native 앱만들기

제일먼저 프로젝트 생성
```
npm install -g create-react-app@latest
npx create-react-natice-app

npm install --global expo-cli
```

### 필요없는 파일 지우기
app.js
```
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

 
### app Loaindg
```
expo install expo-app-loading
```

### preload

```
앱의 프리 로딩에는 2가지 방법이 있는데
1번은
서버에있는 에셋을 포함할때의 경우인데 await Asset.loadAsync(require("./my-face.jpeg"));이렇게 사용한다.
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import * as Font from "expo-font";
import { Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [assets] = useAssets([require("./my-face.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./my-face.jpeg"),
      "https://reactnative.dev/img/oss_logo.png",
    ]);
    await Promise.all([...fonts, ...images]);
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return <Text>We are done loading!</Text>;
}

2번방법은 짧은 코드로 구현가능한데. 문제는  로딩중에 무언가를 할 수없다. db작업등..
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import * as Font from "expo-font";
import { Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";

export default function App() {
  const [assets] = useAssets(["https://reactnative.dev/img/oss_logo.png"]);
  const [loaded] = Font.useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return (
      <AppLoading
      />
    );
  }
  return <Text>We are done loading!</Text>;
}
```

### react navigation 
```
https://reactnavigation.org/docs/getting-started/

npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context

아이폰 개발을하고있다면
npx pod-install ios 
도 해줘야한다.

안드로이드에 대한 설정도 메인 엑티비티 파일 만지라고 문서에 적혀있는데 
create react app 으로 만든 프로젝트 구성이므로 이미 되어있다.
설정완료 !

npm install @react-navigation/native-stack

혹시 아래의 에러가 난다면
Invariant Violation: requireNativeComponent: "RNSScreenStackHeaderConfig" was not found in the UIManager.

cd ios
pod install
를 실행해보자

이후 npm run ios
```

### 바텀 탭 네비게이션
```
https://reactnavigation.org/docs/bottom-tab-navigator/

npm install @react-navigation/bottom-tabs
```

### 스택 네비게이션
```
npm install @react-navigation/stack
npm install react-native-gesture-handler
expo install react-native-gesture-handler

/index.js 에 
import 'react-native-gesture-handler';
추가하기
```


### 스타일 컴포넌트
```
확장 프로그램 설치하면 자동완성됌.
vscode-styled-components


npm i styled-components
```

### Theme 테마변경기능 사용하기
```
import { ThemeProvider } from "styled-components/native";
import { Image, useColorScheme } from "react-native";
export default function App() {
  const isDark = useColorScheme() === "dark";
  if (!ready) {
    return (
      <AppLoading/>
    );
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
```

### typescript 타입체크를 위함. 테마의 컬러명 자동완성도됌. (필수)
```
https://reactnative.dev/docs/typescript
npm install -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer

//tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react-native",
    "lib": ["es2017"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}

npm install @types/styled-components @types/styled-components-react-native

```