import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllNamesAndData = async () => {
  try {
    const res = await axios.get(apiUrl);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchDataById = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}/${id}`);
    return [res.data];
  } catch (error) {
    console.error("Error fetching data by ID:", error);
    return [];
  }
};

export const postData = async (formData) => {
  try {
    const newItem = {
      name: formData.name,
      data: {
        year: formData.year,
        price: formData.price,
        cpuModel: formData.cpuModel,
        hardDiskSize: formData.hardDiskSize,
      },
    };
    const res = await axios.post(apiUrl, newItem);
    return res.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};

export const updateData = async (id, formData) => {
  try {
    const updatedItem = {
      name: formData.name,
      data: {
        year: formData.year,
        price: formData.price,
        cpuModel: formData.cpuModel,
        hardDiskSize: formData.hardDiskSize,
      },
    };
    await axios.patch(`${apiUrl}/${id}`, updatedItem);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
};