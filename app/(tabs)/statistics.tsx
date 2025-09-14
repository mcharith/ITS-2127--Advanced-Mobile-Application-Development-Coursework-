import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { scale, verticaleScale } from '@/utils/styling'
import Header from '@/components/Header'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { BarChart } from "react-native-gifted-charts";
import { Label } from '@react-navigation/elements'
import Loading from '@/components/Loading'
import { useAuth } from '@/context/AuthContext'
import { fetchMonthlyStats, fetchWeeklyStats, fetchYearlyStats } from '@/service/transactionService'
import TransactionList from '@/components/TransactionList'


const Statistics = () => {

  const { user } = useAuth()
  const [activeIndex, setActiveIndex] = useState(0)
  const [chartData,setChartData] = useState([])
  const [chartLoading, setChartLoading] = useState(false)
  const [transactions, setTransactions] = useState([])


  useEffect(() => {
    if(activeIndex==0){
      getWeeklyStats();
    }
    if(activeIndex==1){
      getMonthlyStats();
    }
    if(activeIndex==2){
      getYearlyStats();
    }
  },[activeIndex])

  const getWeeklyStats = async () => {
    setChartLoading(true)
    let res = await fetchWeeklyStats(user?.uid as string)
    setChartLoading(false)
    if(res.success){
      setChartData(res?.data?.stats)
      setTransactions(res?.data?.transactions)
    }else{
      Alert.alert("Error",res.msg)
    }
  }

  const getMonthlyStats = async () => {
    setChartLoading(true)
    let res = await fetchMonthlyStats(user?.uid as string)
    setChartLoading(false)
    if(res.success){
      setChartData(res?.data?.stats)
      setTransactions(res?.data?.transactions)
    }else{
      Alert.alert("Error",res.msg)
    }
  }

  const getYearlyStats = async () => {
    setChartLoading(true)
    let res = await fetchYearlyStats(user?.uid as string)
    setChartLoading(false)
    if(res.success){
      setChartData(res?.data?.stats)
      setTransactions(res?.data?.transactions)
    }else{
      Alert.alert("Error",res.msg)
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header title='Statistics'/>
        </View>

        <ScrollView 
          contentContainerStyle={{
            gap: spacingY._20,
            paddingTop: spacingY._5,
            paddingBottom: verticaleScale(100)
          }}
          showsVerticalScrollIndicator={false}
        >
          <SegmentedControl
            values={['Weekly', 'Monthly','Yearly']}
            selectedIndex={activeIndex}
            onChange={(event) => {
              setActiveIndex(event.nativeEvent.selectedSegmentIndex)
            }}
            // tintColor={colors.neutral200}
            // backgroundColor={colors.neutral800}
            // appearance="dark"
            // activeFontStyle={styles.segmentFontStyle}
            // style={styles.segmentStyle}
            // fontStyle={{...styles.segmentFontStyle, color:colors.white}}
          />

          <View style={styles.chartContainer}>
            {
              chartData.length>0? (
                <BarChart
                  data={chartData}
                  barWidth={scale(12)}
                  spacing={[1,2].includes(activeIndex) ? scale(25) : scale(16)}
                  roundedTop
                  roundedBottom
                  hideRules
                  yAxisLabelPrefix=''
                  yAxisThickness={0}
                  xAxisThickness={0}
                  yAxisLabelWidth={[1,2].includes(activeIndex) ? scale(38) : scale(35)}
                  // hideYAxisText
                  yAxisTextStyle={{color:colors.neutral700}}
                  xAxisLabelTextStyle={{
                    color: colors.black,
                    fontSize: verticaleScale(12)
                  }}
                  noOfSections={3}
                  minHeight={5}
                  // isAnimated={true}
                  // animationDuration={1000}
                  // maxValue={1000}
                />
              ): (
                <View style={styles.noChart}/>
              )
            }
            {
              chartLoading && (
                <View style={styles.chartLoadingContainer}>
                  <Loading />
                </View>
              )
            }
          </View>

          <View>
            <TransactionList
              title="Transactions"
              emptyListMessage="No transaction found"
              data={transactions}
            />
          </View>

        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default Statistics

const styles = StyleSheet.create({
  chartContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  chartLoadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: radius._12,
    backgroundColor: "#f0f0f0ff"
  },
  header:{},
  noChart: {
    backgroundColor: "rgba(94, 176, 92, 0.6)",
    height: verticaleScale(210),
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: verticaleScale(35),
    width: verticaleScale(35),
    borderCurve: "continuous",
  },
  segmentStyle: {
    height: scale(37)
  },
  segmentFontStyle: {
    fontSize: verticaleScale(13),
    fontWeight: "bold",
    color: colors.black
  },
  container:{
    paddingHorizontal: spacingX._20,
    paddingVertical:spacingY._5,
    gap: spacingY._10
  }
})