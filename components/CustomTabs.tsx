import { View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, spacingY } from '@/constants/theme';
import { verticaleScale } from '@/utils/styling';
import { ChartBarIcon, HouseIcon, UserIcon, WalletIcon } from 'phosphor-react-native';

export default function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {

    const tabbarIcons: any = {
        index: (isFocused: boolean) => (
            <HouseIcon
            size={verticaleScale(30)}
            weight={isFocused ? "fill" : "regular"}
            color={isFocused ? colors.secondary : colors.neutral300}
            />
        ),

        statistics: (isFocused: boolean) => (
            <ChartBarIcon
            size={verticaleScale(30)}
            weight={isFocused ? "fill" : "regular"}
            color={isFocused ? colors.secondary : colors.neutral300}
            />
        ),

        wallet: (isFocused: boolean) => (
            <WalletIcon
            size={verticaleScale(30)}
            weight={isFocused ? "fill" : "regular"}
            color={isFocused ? colors.secondary : colors.neutral300}
            />
        ),

        profile: (isFocused: boolean) => (
            <UserIcon
            size={verticaleScale(30)}
            weight={isFocused ? "fill" : "regular"}
            color={isFocused ? colors.secondary : colors.neutral300}
            />
        ),
    };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            // href={buildHref(route.name, route.params)}
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {
                tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar:{ 
        flexDirection: 'row', 
        width: "100%", 
        height:Platform.OS == "ios" ? verticaleScale(70) : verticaleScale(55),
        backgroundColor: "#363753",
        justifyContent: "space-around",
        // borderTopColor: colors.neutral600,
        borderTopWidth: 1,
    },
    tabbarItem:{
        marginBottom: Platform.OS == "ios" ? spacingY._10 : spacingY._5,
        justifyContent: "center",
        alignItems: "center"
    }
})