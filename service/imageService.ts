import { CLOUDINARY_CLOUD_NAME, COULDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";

const CLOUDINARY_CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
  file: { uri?: string } | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    if (typeof file === "string") {
      return { success: true, data: file };
    }

    if (file && file.uri) {
      const fileName = file.uri.split("/").pop() || "file.jpg";

      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        type: "image/jpeg",
        name: fileName,
      } as any);

      formData.append("upload_preset", COULDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName);

      const response = await axios.post(CLOUDINARY_CLOUD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Cloudinary uploaded:", response.data.secure_url);

      return { success: true, data: response.data.secure_url };
    }

    return { success: false, msg: "No file to upload" };
  } catch (error: any) {
    console.log("Cloudinary error:", error.response?.data || error.message);
    return { success: false, msg: error.message || "Could not upload file." };
  }
};

export const getProfileImage = (file:any) => {
  if(file && typeof file == 'string') return file;
  if(file && typeof file == 'object') return file;
  return require("@/assets/images/defaultAvatar.png")
}

export const getFilePath = (file:any) => {
  if(file && typeof file == 'string') return file;
  if(file && typeof file == 'object') return file;
  return null;
}

