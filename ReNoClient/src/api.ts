import axios from "axios";
import { 
  LoginData, 
  UserData, 
  ApiTaskData 
} from "./interfaces";

export const CLIENT_URL = 'http://localhost:3000';
export const DB_API_URL = ''; //

export async function login(data:LoginData) {
  const res = await axios.post(`${CLIENT_URL}/auth/signin`, data);
  return res.data;
}

export async function createUser(data:UserData) {
  const res = await axios.post(`${CLIENT_URL}/auth/signup`, data);
  return res.data;
}

export async function getTasks() {
  const res = await axios.get(`${CLIENT_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
  });
  return res.data;
}

export async function getTasksById(id:number) {
  const res = await axios.get(`${CLIENT_URL}/tasks/${id}`, {
    headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
  });
  return res.data;
}

export async function createTask(data:ApiTaskData) {
  const res = await axios.post(`${CLIENT_URL}/tasks`, 
    data, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    }
  );
  return res.data;
}

export async function editTask(id:number, data:ApiTaskData) {
  const res = await axios.patch(`${CLIENT_URL}/tasks/${id}`,
    data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    }
  );
  return res.data;
}

export async function deleteTask(id:number) {
  const res = await axios.delete(`${CLIENT_URL}/tasks/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    }
  );
  return res;
}
