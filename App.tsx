/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const App = () => {

  const PasswordSchema = Yup.object().shape({
    passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
  });

  const [upperCase, setUpperCase] = useState(false);
  const [specialCharacters, setSpecialCharacter] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [password, setPassword] = useState('');
  const [isGenerated, setIsGenerated] = useState(false)


  const passwordLogic = (passwordLength: number) =>{

    let characterList = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    upperCase ? characterList += upperCaseChars : characterList;
    specialCharacters ? characterList += specialChars : characterList;
    numbers ? characterList += digitChars : characterList;
    const tempPassword = createPassword(passwordLength, characterList);
    setPassword(tempPassword);
    setIsGenerated(true);
  };

  const createPassword = (passwordLength: number, characterList: string) => {
    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterPosition = Math.round(Math.random() * characterList.length);
      newPassword += characterList[characterPosition];
    }
    console.log('PASSWORD: ' + newPassword);
    return newPassword;
  };
  return (
    <ScrollView keyboardShouldPersistTaps="always" >
      <SafeAreaView className='w-full min-h-screen bg-black text-white'>
        <View>
          <Text className='text-white'>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            //validationSchema={PasswordSchema}
            onSubmit={values => {console.log(values);
            passwordLogic(+values.passwordLength);}}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View>
                <TextInput className='text-white outline-dashed outline-white'
                  onChangeText={handleChange('passwordLength')}
                  value={values.passwordLength}
                  keyboardType='numeric'
                />
                <View style={styles.checkDiv}>
                  <Text className='text-white'>Upper case</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={()=>setUpperCase(!upperCase)}
                    fillColor="#29AB87"
                    />
                </View>
                <View style={styles.checkDiv}>
                  <Text className='text-white'>Numeric</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={()=>setNumbers(!numbers)}
                    fillColor="#29AB87"
                    />
                </View>
                <View style={styles.checkDiv}>
                  <Text className='text-white'>Special characters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={specialCharacters}
                    onPress={()=>setSpecialCharacter(!specialCharacters)}
                    fillColor="#29AB87"
                    />
                </View>
                <View className='flex flex-row justify-center items-center'>
                  <TouchableOpacity className='bg-blue-300 text-white p-2 rounded-lg' onPress={handleSubmit}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <Text>
            {
              isGenerated && (
                <View>
                  <Text className='text-white'>
                    {
                      password
                    }
                  </Text>
                </View>
              )
            }
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  checkDiv:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  textDiv: {
    color: '#fff',
  }
})