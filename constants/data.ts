import { CategoryType, ExpensesCategoriesType } from "@/types";
import { CarIcon, DotsThreeOutlineIcon, FilmScriptIcon, ForkKnifeIcon, HeartIcon, HouseIcon, LightbulbIcon, MoneyIcon, PiggyBankIcon, ShieldCheckIcon, ShoppingCartIcon, TShirtIcon, UserIcon } from "phosphor-react-native";

export const expenseCategories: ExpensesCategoriesType = {
    groceries: {
        lable: "Groceries",
        value: "groceries",
        icon: ShoppingCartIcon,
        bgColor: "#485563"
    },
    rent: {
        lable: "Rent",
        value: "rent",
        icon: HouseIcon,
        bgColor: "#075985"
    },
    utilities: {
        lable: "Utilities",
        value: "utilities",
        icon: LightbulbIcon,
        bgColor: "#ca8a04"
    },
    transpotation: {
        lable: "Transpotation",
        value: "transpotation",
        icon: CarIcon,
        bgColor: "#b45309"
    },
    entertainment: {
        lable: "Entertainment",
        value: "entertainment",
        icon: FilmScriptIcon,
        bgColor: "#0f766e"
    },
    dining: {
        lable: "Dining",
        value: "dining",
        icon: ForkKnifeIcon,
        bgColor: "#be185d"
    },
    health: {
        lable: "Health",
        value: "health",
        icon: HeartIcon,
        bgColor: "#ba1de1ff"
    },
    insurance: {
        lable: "Insurance",
        value: "insurance",
        icon: ShieldCheckIcon,
        bgColor: "#404040"
    },
    saving: {
        lable: "Saving",
        value: "saving",
        icon: PiggyBankIcon,
        bgColor: "#065F46"
    },
    clothing: {
        lable: "Clothing",
        value: "clothing",
        icon: TShirtIcon,
        bgColor: "#7c3aed"
    },
    personal: {
        lable: "Personal",
        value: "personal",
        icon: UserIcon,
        bgColor: "#a21cfa"
    },
    other: {
        lable: "Other",
        value: "other",
        icon: DotsThreeOutlineIcon,
        bgColor: "#525252"
    }
}

export const incomeCategory: CategoryType = {
    lable: "Income",
    value: "income",
    icon: MoneyIcon,
    bgColor: "#16a34a"
}

export const transactionType = [
    {
        lable: "Expense",
        value: "expense"
    },
    {
        lable: "Income",
        value: "income"
    }
]