/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import { Clipboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

  const resetFields = () => {
    setIsGenerated(false);
    setNumbers(false);
    setSpecialCharacter(false);
    setUpperCase(false);
    setPassword('');
  };
  // const handleCopyToClipboardd = (text:string) => {
  //   Clipboard.setString(text);
  // }
  return (
    <ScrollView keyboardShouldPersistTaps="always" >
      <SafeAreaView className='w-full min-h-screen bg-black text-white'>
        <View className=''>
          <Text className='text-white text-center my-3 text-3xl font-medium'>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {console.log(values);
            passwordLogic(+values.passwordLength);
            }}
          >
            {({ handleChange, handleSubmit, handleReset, values }) => (
              <View>
                <View className='flex flex-row justify-between'>
                  <Text className='text-xl text-white p-1'>Password length</Text>
                  <TextInput className='text-white outline-dashed outline-white w-28 bg-yellow-100/25 m-2 rounded-lg text-lg px-2'
                    onChangeText={handleChange('passwordLength')}
                    value={values.passwordLength}
                    keyboardType='numeric'
                    placeholder='4-16'
                  />
                </View>
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
                <View className='flex flex-row justify-evenly items-center my-3'>
                  <TouchableOpacity className='bg-green-400 text-white p-2 px-24 rounded-lg' onPress={handleSubmit}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='bg-blue-300 text-white p-2 px-9 rounded-lg' onPress={()=> {handleReset(); resetFields();}}>
                    <Text>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <View>
            {
              isGenerated && (
                <View className='flex flex-row justify-center items-center px-1 bg-yellow-200/50 p-3 m-3 rounded-lg'>
                  <Text selectable={true} className='text-white flex flex-row justify-center text-xl font-semibold'>
                    {
                      password
                    }
                  </Text>
                </View>
              )
            }
          </View>
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