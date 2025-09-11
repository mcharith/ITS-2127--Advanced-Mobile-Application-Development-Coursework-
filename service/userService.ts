import { db } from "@/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  updateData: UserDataType
): Promise<ResponseType> => {
  try {
    if (updateData.image && (updateData as any)?.uri) {
      const imageUploadRes = await uploadFileToCloudinary(updateData.image, "users");
      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload image",
        };
      }
      updateData.image = imageUploadRes.data;
    }

    const userRef = doc(db, "users", uid);

    // 👇 will create doc if missing, or update existing
    await setDoc(userRef, updateData, { merge: true });

    return { success: true, msg: "Updated successfully" };
  } catch (error: any) {
    console.log("error updating user: ", error);
    return { success: false, msg: error?.message };
  }
};