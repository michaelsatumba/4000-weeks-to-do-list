'use client';
import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import { auth, db } from "../../../utils/firebaseConfig";
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { collection, doc, setDoc, onSnapshot, orderBy, query, getDocs } from "firebase/firestore";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<{ displayName: string } | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function(authUser) {
      if (authUser) {
        // User is signed in.
        console.log(authUser);
        setUser({ displayName: authUser.displayName || '' });
      } else {
        // No user is signed in.
        console.log("No user is signed in.");
        router.push('/');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const [openTasks, setOpenTasks] = useState<string[]>([]);
  const [onHoldTasks, setOnHoldTasks] = useState<string[]>([]);
  const [closedTasks, setClosedTasks] = useState<string[]>([]);
  const [doneTasks, setDoneTasks] = useState<string[]>([]);

  const addTask = (setTasks: Dispatch<SetStateAction<string[]>>) => {
    const task = prompt('Enter a new task');
    if (task !== null) {
      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const deleteTask = (setTasks: Dispatch<SetStateAction<string[]>>, taskToDelete: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task !== taskToDelete));
  };

  const updateTask = (setTasks: Dispatch<SetStateAction<string[]>>, taskToUpdate: string) => {
    const newTask = prompt('Enter the new task name');
    if (newTask !== null) {
      setTasks((prevTasks) => prevTasks.map(task => task === taskToUpdate ? newTask : task));
    }
  };


return (
    <div>
  <div className="flex items-center justify-around py-2">
    <h1>Hello, {user ? user.displayName : 'Guest'}!</h1>
    <button
      onClick={handleLogout}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  </div>

  <div className="flex p-4">
  <div className="flex flex-col w-1/4 p-2 rounded">
    <h2 className="font-bold mb-4">Open</h2>
    {openTasks.map((task, index) => (
      <div key={index} className="bg-red-500 p-2 rounded mb-2 flex justify-between">
        {task}
        <button onClick={() => deleteTask(setOpenTasks, task)}>Delete</button>
        <button onClick={() => updateTask(setOpenTasks, task)}>Update</button>
      </div>
    ))}
    <button onClick={() => addTask(setOpenTasks)}>+ Add Task</button>
  </div>
  <div className="flex flex-col w-1/4 p-2 rounded">
    <h2 className="font-bold mb-4">On Hold</h2>
    {onHoldTasks.map((task, index) => (
      <div key={index} className="bg-red-500 p-2 rounded mb-2 flex justify-between">
        {task}
        <button onClick={() => deleteTask(setOnHoldTasks, task)}>Delete</button>
        <button onClick={() => updateTask(setOpenTasks, task)}>Update</button>
      </div>
    ))}
    <button onClick={() => addTask(setOnHoldTasks)}>+ Add Task</button>
  </div>
  <div className="flex flex-col w-1/4 p-2 rounded">
    <h2 className="font-bold mb-4">Closed</h2>
    {closedTasks.map((task, index) => (
      <div key={index} className="bg-red-500 p-2 rounded mb-2 flex justify-between">
        {task}
        <button onClick={() => deleteTask(setClosedTasks, task)}>Delete</button>
        <button onClick={() => updateTask(setOpenTasks, task)}>Update</button>
      </div>
    ))}
    <button onClick={() => addTask(setClosedTasks)}>+ Add Task</button>
  </div>
  <div className="flex flex-col w-1/4 p-2 rounded">
    <h2 className="font-bold mb-4">Done</h2>
    {doneTasks.map((task, index) => (
      <div key={index} className="bg-red-500 p-2 rounded mb-2 flex justify-between">
        {task}
        <button onClick={() => deleteTask(setDoneTasks, task)}>Delete</button>
        <button onClick={() => updateTask(setOpenTasks, task)}>Update</button>
      </div>
    ))}
    <button onClick={() => addTask(setDoneTasks)}>+ Add Task</button>
  </div>
</div>

</div>
);
}