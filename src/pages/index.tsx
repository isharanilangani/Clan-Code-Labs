// Home.tsx
import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Tasklist from '@/components/Tasklist';
import Addtask from '@/components/Addtask';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Task Management System</title>
      </Head>
      <Navbar />
      <main>
        <Tasklist tasks={[]} onNewTaskAdded={(newTask) => console.log("New Task Added:", newTask)} />
      </main>
    </>
  );
};

export default Home;
