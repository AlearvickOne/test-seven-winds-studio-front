import axios from "axios";

const BACKEND_URL = "http://185.244.172.108:8081/v1/outlay-rows/entity";
const ENTITY_ID = 150621;

export async function getRowListFromBackend() {
  try {
    const url = `${BACKEND_URL}/${ENTITY_ID}/row/list`;
    return (await axios.get(url)).data;
  } catch (error) {
    console.error("Error fetching row list:", error);
  }
}

export async function createTableRowBackend(rowData: any) {
  try {
    const url = `${BACKEND_URL}/${ENTITY_ID}/row/create`;
    return (await axios.post(url, rowData)).data?.current; // Возврат current, так как он в ответе хранит data;
  } catch (error) {
    console.error("Error creating row:", error);
  }
}

export async function updateTableRowBackend(rID: number, rowData: any) {
  try {
    const url = `${BACKEND_URL}/${ENTITY_ID}/row/${rID}/update`;
    return (await axios.post(url, rowData)).data;
  } catch (error) {
    console.error("Error updating row:", error);
  }
}

export async function deleteRowFromBackend(rID: number) {
  try {
    const url = `${BACKEND_URL}/${ENTITY_ID}/row/${rID}/delete`;
    return await axios.delete(url);
  } catch (error) {
    console.error("Error deleting row:", error);
  }
}
