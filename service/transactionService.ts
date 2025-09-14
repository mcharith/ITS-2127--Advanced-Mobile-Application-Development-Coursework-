import { db } from "@/firebase";
import { ResponseType, TransactionType, WalletType } from "@/types";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const createOrUpdateTransaction = async (
    transactionData: Partial<TransactionType>
):Promise<ResponseType> => {
    try{
        const {id, type, walletId, amount, image} = transactionData;
        if(!amount || amount<=0 || !walletId || !type ){
            return {success: false, msg: "Invalid transaction data!"}
        }

        if(id){
            // update exiting transaction
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