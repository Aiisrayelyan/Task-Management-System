import React from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../api/tasksApi';
import { useNavigate, useParams } from 'react-router-dom';
import './Form.css';

type FormData = {
  text: string;
  status: 'pending' | 'completed' | 'on progress';
};

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskId = Number(id);

  const { data: task, isLoading } = useGetTaskByIdQuery(taskId, {
    skip: isNaN(taskId),
  });

  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const { register, handleSubmit, formState, reset } = useForm<FormData>();

  React.useEffect(() => {
    if (task) {
      reset({
        text: task.text,
        status: task.status,
      });
    } else if (!isLoading) {
      navigate('/');
    }
  }, [task, reset, isLoading, navigate]);

  const onSubmit = async (data: FormData) => {
    await updateTask({ id: taskId, ...data, date: task?.date || '' });
    navigate('/');
  };

  const handleDelete = async () => {
    await deleteTask(taskId);
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1>Edit Task</h1>
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
          Update Task
        </button>
      </form>
      <button onClick={handleDelete} className="button delete-button">
        Delete Task
      </button>
    </div>
  );
};

export default EditTask;
