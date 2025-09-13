import { CategoryType, ExpensesCategoriesType } from "@/types";
import { CarIcon, DotsThreeOutlineIcon, FilmScriptIcon, ForkKnifeIcon, HeartIcon, HouseIcon, LightbulbIcon, MoneyIcon, PiggyBankIcon, ShieldCheckIcon, ShoppingCartIcon, TShirtIcon, UserIcon } from "phosphor-react-native";

export const expenseCategories: ExpensesCategoriesType = {
  groceries: {
    label: "Groceries",
    value: "groceries",
    icon: ShoppingCartIcon,
    bgColor: "#485563"
  },
  rent: {
    label: "Rent",
    value: "rent",
    icon: HouseIcon,
    bgColor: "#075985"
  },
  utilities: {
    label: "Utilities",
    value: "utilities",
    icon: LightbulbIcon,
    bgColor: "#ca8a04"
  },
  transportation: {
    label: "Transportation",
    value: "transportation",
    icon: CarIcon,
    bgColor: "#b45309"
  },
  entertainment: {
    label: "Entertainment",
    value: "entertainment",
    icon: FilmScriptIcon,
    bgColor: "#0f766e"
  },
  dining: {
    label: "Dining",
    value: "dining",
    icon: ForkKnifeIcon,
    bgColor: "#be185d"
  },
  health: {
    label: "Health",
    value: "health",
    icon: HeartIcon,
    bgColor: "#ba1de1"
  },
  insurance: {
    label: "Insurance",
    value: "insurance",
    icon: ShieldCheckIcon,
    bgColor: "#404040"
  },
  saving: {
    label: "Saving",
    value: "saving",
    icon: PiggyBankIcon,
    bgColor: "#065F46"
  },
  clothing: {
    label: "Clothing",
    value: "clothing",
    icon: TShirtIcon,
    bgColor: "#7c3aed"
  },
  personal: {
    label: "Personal",
    value: "personal",
    icon: UserIcon,
    bgColor: "#a21cfa"
  },
  other: {
    label: "Other",
    value: "other",
    icon: DotsThreeOutlineIcon,
    bgColor: "#525252"
  }
}

export const incomeCategory: CategoryType = {
    label: "Income",
    value: "income",
    icon: MoneyIcon,
    bgColor: "#16a34a"
}

export const transactionTypes = [
    { label: 'Expense', value: 'expense' },
    { label: 'Income', value: 'income' },
  ];