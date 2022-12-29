import { Input, Textarea } from '@mantine/core';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsFillImageFill } from 'react-icons/bs';
import { MdDescription, MdTitle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmallLoader from '../Components/SmallLoader';
import { AuthContext } from '../contexts/UserContext';

export default function AddTask() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleAddTask = (data) => {
    setIsLoading(true);
    if (data.image.length) {
      const image = data.image[0];
      const formData = new FormData();
      formData.append('image', image);
      delete data.image;

      fetch(
        'https://api.imgbb.com/1/upload?key=cae6eea1fe6f1be368950ccdb9e9c229',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((imageData) => {
          const imageUrl = imageData.data.url;
          console.log({ ...data, imageUrl });
          fetch('https://task-backend-task.vercel.app/tasks', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              ...data,
              imageUrl,
              email: user?.email,
              createdAt: new Date(),
              completed: false,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.acknowledged) {
                toast.success('Task Added');
                navigate('/my-tasks');
              }
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
            });
        });
    } else {
      delete data.image;
      console.log(data);
      fetch('https://task-backend-task.vercel.app/tasks', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...data,
          email: user?.email,
          createdAt: new Date(),
          completed: false,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            toast.success('Task Added');
            navigate('/my-tasks');
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <section
      id="add-tasks"
      className="container w-[95%] mx-auto lg:flex lg:flex-col lg:h-screen mt-[25vh]"
    >
      <div>
        <h2 className="text-center text-2xl font-medium">Add A Task</h2>
        <form
          className="mt-4 w-full lg:w-[700px] m-auto space-y-2 border border-black p-12"
          onSubmit={handleSubmit(handleAddTask)}
        >
          <Input
            placeholder="Task Title"
            
            type="text"
            {...register('title', { required: true })}
          />
          <Input
            
            {...register('image')}
            title='Add A File'
            type="file"
            accept="image/*"
          />
          <Textarea
            placeholder="Task Description"
            
            {...register('description', { required: true })}
          />
          <button
            className="bg-purple-600 text-white w-full py-[10px] disabled:bg-gray-600"
            disabled={isLoading}
          >
            {isLoading ? <SmallLoader /> : 'Submit Task'}
          </button>
        </form>
      </div>
    </section>
  );
}
