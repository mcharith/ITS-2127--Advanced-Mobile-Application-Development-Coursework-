import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { scale, verticaleScale } from '@/utils/styling'
import Input from '@/components/Inputs'
import React, { useEffect, useState } from 'react'
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TransactionType, WalletType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/context/AuthContext'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ImageUpload from '@/components/ImageUpload'
import { createOrUpdateWallet, deleteWallet } from '@/service/walletService'
import { TrashIcon } from 'phosphor-react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { expenseCategories, transactionTypes } from '@/constants/data'
import useFetchData from '@/hooks/useFetchData'
import { orderBy, where } from 'firebase/firestore'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


const TransactionModal = () => {

        const router = useRouter()

        const {user} = useAuth()
        
        const[transaction, setTransaction] = useState<TransactionType>({
          type: 'expense',
          amount: 0,
          decription: "",
          category: "",
          date: new Date(),
          walletId: "",
          image: null
        })

        const [loading,setLoading] = useState(false)
        const [showDatePicker, setShowDatePicker] = useState(false);

        const {
          data:wallets, 
          error: walletError, 
          loading: walletLoading,
        } = useFetchData<WalletType>("wallets",[
          where("uid", "==", user?.uid),
          orderBy("created","desc")
        ])

        const oldTransaction: {name: string; image:string; id:string} = 
        useLocalSearchParams();

        const onDateChange = (event: any, selectedDate: any) =>{
          const currentDate = selectedDate || transaction.date;
          setTransaction({...transaction, date: currentDate});
          setShowDatePicker(Platform.OS == "ios" ? true : false);
        }
        
        // useEffect(() => {
        // if (oldWallet?.id) {
        //   setWallet({
        //     name: oldWallet.name,
        //     image: oldWallet.image,
        //   });
        // }
        // }, [oldWallet?.id, oldWallet?.name, oldWallet?.image]); 

        const onSubmit = async () => {}

        
      const onDelete = async () => {
        if (!oldTransaction?.id) return;
        setLoading(true)
        const res = await deleteWallet(oldTransaction?.id)
        setLoading(false)
        if(res.success){
          router.back();
        }else{
          Alert.alert("Wallet",res.msg)
        }
      }

      const showDeleteAlert = () => {
        Alert.alert(
          "Confirm",
          "Are you sure want to do this?\nThis action will remove all the transactions.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("cancel delete"),
              style: 'cancel'
            },
            {
              text: "Delete",
              onPress: () => onDelete(),
              style: 'destructive'
            }
          ]
        )
      }
  

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header 
          title={oldTransaction?.id ? "Update Transaction":"New Transaction"}
          leftIcon={<BackButton/>} 
          style={{marginBottom: spacingY._10}}
        />

        {/* form  */}
        <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral800} size={15}>Type</Typo>
            {/* dropdown  */}
            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral700}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={transactionTypes}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              // placeholder={!isFocus ? 'Select item' : '...'}
              value={transaction.type}
              onChange={item => {
                setTransaction({...transaction, type:item.value})
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral800} size={15}>Wallet</Typo>
            {/* dropdown  */}
            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral700}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={wallets.map((wallet)=>({
                label: `${wallet?.name} (LKR${wallet.amount})`,
                value: wallet?.id,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              placeholder={'Select wallet'}
              value={transaction.walletId}
              onChange={item => {
                setTransaction({...transaction, walletId: item.value})
              }}
            />
          </View>

          {transaction.type == "expense" && (
            <View style={styles.inputContainer}>
            <Typo color={colors.neutral800} size={15}>Expense Category</Typo>
            {/* dropdown  */}
            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral700}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={Object.values(expenseCategories)}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              placeholder={'Select category'}
              value={transaction.category}
              onChange={item => {
                setTransaction({...transaction, category: item.value})
              }}
            />
          </View>
          )}

          {/* date picker  */}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral800} size={15}>Date</Typo>
            {!showDatePicker && (
              <Pressable
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Typo size={14}>{(transaction.date as Date).toLocaleDateString()}</Typo>
              </Pressable>
            )}
            {
              showDatePicker && (
                <View style={Platform.OS == 'ios' && styles.iosDatePicker}>
                  <DateTimePicker 
                    themeVariant="dark"
                    value={transaction.date as Date}
                    textColor={colors.black}
                    mode="date"
                    display={Platform.OS == "ios" ? "spinner" : "default"}
                    onChange={onDateChange}
                  />

                  {Platform.OS == "ios" && (
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Typo size={15} fontWeight={"500"}>Ok</Typo>
                    </TouchableOpacity>
                  )}
                </View>
              )
            }
          </View>

          {/* amount  */}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral800} size={15}>Amount</Typo>
            <Input 
              // placeholder='Salary'
              value={transaction.amount?.toString()}
              onChangeText={(value) => {
                setTransaction({
                  ...transaction,
                  amount: Number(value.replace(/[^0-9]/g, "")),
                })
              }}
            />
          </View>

            {/* description */}
          <View style={styles.inputContainer}>
            <View style={styles.flexRow}>
              <Typo color={colors.neutral800} size={15}>Description</Typo>
              <Typo color={colors.neutral600} size={14}>(optional)</Typo>
            </View>

            <Input 
              value={transaction.decription}
              multiline
              containerStyle={{
                flexDirection: "row",
                height: verticaleScale(100),
                alignItems: "flex-start",
                paddingVertical: 15,
              }}
              onChangeText={(value) => {
                setTransaction({
                  ...transaction,
                  decription: value,
              })}
            }
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.flexRow}>
              <Typo color={colors.neutral800} size={15}>Receipt</Typo>
              <Typo color={colors.neutral600} size={14}>(optional)</Typo>
            </View>
            <ImageUpload
              file={transaction.image}
              onClear={() => setTransaction({...transaction, image:null})}
              onSelect={(file) => setTransaction({...transaction, image:file})}
              placeholder="Upload Image"
            />
          </View>

        </ScrollView>
      </View>

    {/* footer  */}
    <View style={styles.footer}>
      {
        oldTransaction?.id && !loading && (
          <Button
            onPress={showDeleteAlert}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <TrashIcon 
              color={colors.white}
              size={verticaleScale(24)}
              weight="bold"
            />
          </Button>
        )
      }
      <Button onPress={onSubmit} loading={loading} style={{flex:1}}>
        <Typo color={colors.white} fontWeight={"700"}>
          {
            oldTransaction.id ? "Update" : "Submit"
          }
        </Typo>
      </Button>
    </View>

    </ModalWrapper>
  )
}

export default TransactionModal

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: spacingY._20
  },
  form:{
    gap: spacingY._20,
    paddingVertical: spacingY._15,
    paddingBottom: spacingY._40,
  },
  footer:{
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  inputContainer:{
    gap: spacingY._10
  },
  iosDropDown:{
    flexDirection: "row",
    height: verticaleScale(54),
    alignItems: "center",
    justifyContent: "center",
    fontSize: verticaleScale(14),
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
  },
  androindDropDown: {
    height: verticaleScale(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    fontSize: verticaleScale(14),
    color: colors.white,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
  },
  flexRow:{
    flexDirection:"row",
    alignItems: "center",
    gap: spacingX._5
  },
  dateInput:{
    flexDirection: "row",
    height: verticaleScale(54),
    alignItems:"center",
    borderWidth:1,
    borderColor: colors.neutral700,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
  iosDatePicker:{
    // backgroundColor: "red"
  },
  datePickerButton: {
    backgroundColor: colors.neutral400,
    alignSelf: "flex-end",
    padding: spacingY._7,
    marginRight: spacingX._7,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderCurve: "continuous"
  },
  dropdownContainer: {
    height: verticaleScale(54),
    borderWidth: 1,
    borderColor: colors.neutral600,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderCurve: "continuous"
  },
  dropdownItemText: {
    color: colors.white
  },
  dropdownSelectedText: {
    color: colors.black,
    fontSize: verticaleScale(14)
  },
  dropdownListContainer: {
    backgroundColor: colors.neutral900,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingVertical: spacingY._7,
    top: 5,
    borderColor: colors.neutral500,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  dropdownPlaceholder:{
    color: colors.black,
  },
  dropdownItemContainer:{
    borderRadius: radius._15,
    marginHorizontal: spacingX._7,
  },
  dropdownIcon: {
    height: verticaleScale(30),
    tintColor: colors.neutral500,
  },
})