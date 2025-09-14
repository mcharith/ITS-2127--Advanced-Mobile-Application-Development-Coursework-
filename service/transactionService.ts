import { db } from "@/firebase";
import { ResponseType, TransactionType, WalletType } from "@/types";
import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";
import { createOrUpdateWallet } from "./walletService";

export const createOrUpdateTransaction = async (
    transactionData: Partial<TransactionType>
):Promise<ResponseType> => {
    try{
        const {id, type, walletId, amount, image} = transactionData;
        if(!amount || amount<=0 || !walletId || !type ){
            return {success: false, msg: "Invalid transaction data!"}
        }

        if(id){
            const oldTransactionSnapshot = await getDoc(
                doc(db,"transactions",id)
            )

            const oldTransaction = oldTransactionSnapshot.data() as TransactionType;
            const shouldRevertOriginal = 
                oldTransaction.type != type ||
                oldTransaction.amount != amount ||
                oldTransaction.walletId != walletId;
                if(shouldRevertOriginal){
                    let res = await revertAndUpdateWallets(oldTransaction,Number(amount),type,walletId);
                    if (!res.success) return res
                }
        }else{
            // update wallet for new transaction
            let res = await updateWalletForNewTransactions(
                walletId!,
                Number(amount!),
                type
            )
            if(!res.success) return res;
        }

        if (image) {
              const imageUploadRes = await uploadFileToCloudinary(
                image,
                "transactions"
              );
        
              if (!imageUploadRes.success) {
                return {
                  success: false,
                  msg: imageUploadRes.msg || "Failed to upload receipt.",
                };
            }
            transactionData.image = imageUploadRes.data;
        }

        const transactionRef = id 
            ? doc (db, "transactions", id)
            : doc (collection(db, "transactions"))
        
        await setDoc(transactionRef, transactionData, {merge: true});
        return {
            success: true,
            data: {...transactionData, id:transactionRef.id}
        }
    
      }catch(err:any){
        console.log('error creating or updating transaction:',err);
        return {success: false, msg:err.message}
      }
}

const updateWalletForNewTransactions = async (
    walletId: string,
    amount: number,
    type : string
) => {
    try{
        const walletRef = doc(db, "wallets", walletId);
        const walletSnapshot = await getDoc(walletRef)
        if(!walletSnapshot.exists()){
            console.log("error updating wallet for new transaction");
            return{success:false, msg: "Wallet not found."}
        }

        const walletData = walletSnapshot.data() as WalletType;

        if (type == "expense" && walletData.amount! - amount < 0){
            return {
                success: false,
                msg: "Selected wallet don't have enough balance",
            }
        }

        const updateType = type == "income" ? "totalIncome" : "totalExpenses";
        const updateWalletAmount = 
            type == "income"
                ? Number(walletData.amount) + amount
                : Number(walletData.amount) - amount;
        
        const updateTotals = type == "income"
        ? Number(walletData.amount) + amount
        : Number(walletData.totalExpenses) + amount

        await updateDoc(walletRef, {
            amount: updateWalletAmount,
            [updateType]: updateTotals,
        })

        return {success: true}
    }catch(err:any){
        console.log('error creating or updating transaction:',err);
        return {success: false, msg:err.message}
      }
}

const revertAndUpdateWallets = async (
   oldTransaction: TransactionType,
   newTransactionAmount: number,
   newTransactionType: string,
   newWalletId: string
) => {
    try{
        const originalWalletSnapshot = await getDoc(doc(db,"wallets",oldTransaction.walletId));

        const originalWallet = originalWalletSnapshot.data() as WalletType;

        let newWalletSnapshot = await getDoc(doc(db,"wallets",newWalletId))
        let newWallet = newWalletSnapshot.data() as WalletType;

        const revertType = oldTransaction.type == "income" ? "totalIncome" : "totalExpenses";

        const revertIncomeExpenses: number = 
            oldTransaction.type == "income"
                ? -Number(oldTransaction.amount)
                : Number(oldTransaction.amount)

        const revertedWalletAmount = 
            Number(originalWallet.amount) + revertIncomeExpenses;

        const revertdIncomeExpenseAmount =
            Number(originalWallet[revertType]) - Number(oldTransaction.amount);

        if(newTransactionType == "expense"){
            if(
                oldTransaction.walletId == newWalletId && 
                revertedWalletAmount < newTransactionAmount
            ){
                return{
                    success: false,
                    msg: "The selected wallet dont have enough balance."
                };
            }

            if(newWallet.amount! < newTransactionAmount){
                return{
                    success: false,
                    msg: "The selected wallet dont have enough balance."
                };
            }
        }

        await createOrUpdateWallet({
            id: oldTransaction.walletId,
            amount: revertedWalletAmount,
            [revertType]: revertdIncomeExpenseAmount,
        });

        newWalletSnapshot = await getDoc(doc(db,"wallets",newWalletId))
        newWallet = newWalletSnapshot.data() as WalletType;        

        const updateType = 
        newTransactionType == "income" ? "totalIncome" : "totalExpenses"

        const updatedTransactionAmount:number = 
            newTransactionType == "income"
            ? Number(newTransactionAmount)
            : -Number(newTransactionAmount)

        const newWalletAmount = Number(newWallet.amount) + updatedTransactionAmount;
        
        const newIncomeExpenseAmount = Number (
            newWallet[updateType]! + Number(newTransactionAmount)
        )

        await createOrUpdateWallet({
            id: newWalletId,
            amount: newWalletAmount,
            [updateType]: newIncomeExpenseAmount
        })

        return {success: true}
    }catch(err:any){
        console.log('error creating or updating transaction:',err);
        return {success: false, msg:err.message}
      }
}

export const deleteTransaction = async (
  transactionId: string,
  walletId: string
) => {
  try {
    const transactionRef = doc(db, "transactions", transactionId);
    const transactionSnapshot = await getDoc(transactionRef);

    if (!transactionSnapshot.exists()) {
      return { success: false, msg: "Transaction not found." };
    }

    const transactionData = transactionSnapshot.data() as TransactionType;

    const transactionType = transactionData?.type;
    const transactionAmount = Number(transactionData?.amount);

    const walletRef = doc(db, "wallets", walletId);
    const walletSnapshot = await getDoc(walletRef);
    if (!walletSnapshot.exists()) {
      return { success: false, msg: "Wallet not found." };
    }

    const walletData = walletSnapshot.data() as WalletType;

    const updateType =
      transactionType === "income" ? "totalIncome" : "totalExpenses";

    const newWalletAmount =
      transactionType === "income"
        ? walletData.amount! - transactionAmount
        : walletData.amount! + transactionAmount;

    const newIncomeExpensesAmount =
      walletData[updateType]! - transactionAmount;

    if (transactionType === "income" && newWalletAmount < 0) {
      return { success: false, msg: "You cannot delete this transaction." };
    }

    await createOrUpdateWallet({
      id: walletId,
      amount: newWalletAmount,
      [updateType]: newIncomeExpensesAmount,
    });

    await deleteDoc(transactionRef);

    return { success: true };
  } catch (err: any) {
    console.log("error deleting transaction:", err);
    return { success: false, msg: err.message };
  }
};