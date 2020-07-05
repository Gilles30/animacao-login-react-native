import React, {useState, useEffect} from 'react';
import { View, 
  KeyboardAvoidingView, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Animated, 
  Keyboard 
} from 'react-native';
import style from './src/style';


export default function App() {

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity]= useState(new Animated.Value(0));
  const [logo]= useState(new Animated.ValueXY({x: 385, y: 170}))
  

  useEffect(() =>{

    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);



    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0, 
        speed: 2, 
        bounciness: 30,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300, 
        useNativeDriver: true
        
      
      })
    ]).start();

  }, []);

  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 250,
        duration: 100, 
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 110,
        duration: 100, 
        useNativeDriver: false
      })


    ]).start();

  }

  function keyboardDidHide(){

    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 385,
        duration: 100, 
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 170,
        duration: 100, 
        useNativeDriver: false
      })


    ]).start();

  }

  return (
    <KeyboardAvoidingView style={style.background}>
      <View style={style.containerLogo}>
        <Animated.Image
        style={{
          width: logo.x,
          height: logo.y,
        }}
        source={require('./src/assets/logo.png')}
        />
      </View>


      <Animated.View 
      style={[
        style.container,
        {
          opacity: opacity,
          transform: [
            { translateY: offset.y }
          ]
        }]}>
      <TextInput
      style= {style.input}
      placeholder="Email"
      autoCorrect={false}
      onChangeText={()=> {}}
      />

      <TextInput
      style= {style.input}
      placeholder="Senha"
      autoCorrect={false}
      onChangeText={()=> {}}
      />

      <TouchableOpacity style={style.button}>
        <Text style={style.buttonText}>
          Acessar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.register}>
        <Text style={style.registerText}>
          Criar conta
        </Text>
      </TouchableOpacity>
    

      </Animated.View>

    </KeyboardAvoidingView>
  );
}
