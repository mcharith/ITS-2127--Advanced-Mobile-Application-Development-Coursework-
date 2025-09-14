import { ResponseType, WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";


export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    let walletToSave = { ...walletData };

    if (walletData.image) {
      const imageUploadRes = await uploadFileToCloudinary(
        walletData.image,
        "wallets"
      );

      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload wallet icon.",
        };
      }
      walletToSave.image = imageUploadRes.data;
    }

    if (!walletData?.id) {
      walletToSave.amount = 0;
      walletToSave.totalIncome = 0;
      walletToSave.totalExpenses = 0;
      walletToSave.created = new Date();
    }

    const walletRef = walletData?.id
      ? doc(db, "wallets", walletData.id)
      : doc(collection(db, "wallets"));

    await setDoc(walletRef, walletToSave, { merge: true });

    return { success: true, data: { ...walletToSave, id: walletRef.id } };
  } catch (error: any) {
    console.log("error creating or updating wallet:", error);
    return { success: false, msg: error.message };
  }
};

export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
  try {
    const walletRef = doc(db, "wallets", walletId);

    await deleteTransactionByWalletId(walletId);

    await deleteDoc(walletRef);

    return { success: true, msg: "Wallet deleted successfully." };
  } catch (err: any) {
    console.log("error deleting wallet:", err);
    return { success: false, msg: err.message };
  }
};

export const deleteTransactionByWalletId = async (
  walletId: string
): Promise<ResponseType> => {
  try {
    let hasMoreTransaction = true;

    while (hasMoreTransaction) {
      const transactionQuery = query(
        collection(db, "transactions"),
        where("walletId", "==", walletId)
      );

      const transactionSnapshot = await getDocs(transactionQuery);

      if (transactionSnapshot.empty) {
        hasMoreTransaction = false;
        break;
      }

      const batch = writeBatch(db);

      transactionSnapshot.forEach((transactionDoc) => {
        batch.delete(transactionDoc.ref);
      });

      await batch.commit();

      console.log(
        `${transactionSnapshot.size} transactions deleted in this batch.`
      );
    }

    return { success: true, msg: "All transactions deleted successfully." };
  } catch (err: any) {
    console.log("error deleting transactions by walletId:", err);
    return { success: false, msg: err.message };
  }
};