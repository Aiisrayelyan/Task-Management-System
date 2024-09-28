import React from 'react';
import { useForm } from 'react-hook-form';
import { useAddTaskMutation } from '../api/tasksApi';
import { useNavigate } from 'react-router-dom';
import './Form.css';

type FormData = {
  text: string;
  status: 'pending' | 'completed' | 'on progress';
};

const AddTask: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const [addTask] = useAddTaskMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    await addTask({
      ...data,
      date: new Date().toISOString().split('T')[0],
    });
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label>Text:</label>
          <input {...register('text', { required: 'Text is required' })} />
          {formState.errors.text && (
            <p className="error">{formState.errors.text.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select {...register('status', { required: true })}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="on progress">On Progress</option>
          </select>
        </div>
        <button type="submit" className="button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
