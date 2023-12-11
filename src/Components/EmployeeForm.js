import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const apiUrl = 'http://localhost:4200/employee';

const EmployeeForm = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const url = apiUrl;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (formData) => {
    try {
      const updatedData = {
        name: formData.name,
        designation: formData.designation,
        salary: formData.salary,
        address: {
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
      };

      if (editingId !== null) {
        await axios.put(`${url}/${editingId}`, updatedData);
        setEditingId(null);
      } else {
        await axios.post(url, updatedData);
      }

      fetchData();
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    Object.entries(itemToEdit).forEach(([key, value]) => setValue(key, value));
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="container-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-field">
                <label>Name:</label>
                <input type="text" className="form-control" {...register('name', { required: 'Name is required' })} />
                {errors.name?.type === 'required' && <span className='text-danger'>{errors.name.message}</span>}
              </div>

              <div className="form-field">
                <label>Designation:</label>
                <input type="text" className="form-control" {...register('designation', { required: 'Designation is required' })} />
                {errors.designation?.type === 'required' && <span className='text-danger'>{errors.designation.message}</span>}
              </div>

              <div className="form-field">
                <label>Salary:</label>
                <input type="text" className="form-control" {...register('salary', { required: 'Salary is required', pattern: { value: /^\d+$/, message: 'Salary must be a number' } })} />
                {errors.salary?.type === 'required' && <span className='text-danger'>{errors.salary.message}</span>}
                {errors.salary?.type === 'pattern' && <span className='text-danger'>{errors.salary.message}</span>}
              </div>

              <div className="form-field">
                <label>City:</label>
                <input type="text" className="form-control" {...register('city', { required: 'City is required' })} />
                {errors.city?.type === 'required' && <span className='text-danger'>{errors.city.message}</span>}
              </div>

              <div className="form-field">
                <label>State:</label>
                <input type="text" className="form-control" {...register('state', { required: 'State is required' })} />
                {errors.state?.type === 'required' && <span className='text-danger'>{errors.state.message}</span>}
              </div>

              <div className="form-field">
                <label>Pincode:</label>
                <input type="text" className="form-control" {...register('pincode', { required: 'Pincode is required' })} />
                {errors.pincode?.type === 'required' && <span className='text-danger'>{errors.pincode.message}</span>}
              </div>

              <div className="form-field">
                <button type="submit" className='btn btn-success'>
                  {editingId !== null ? 'Update' : 'Submit'}
                </button>
              </div>
              <div>
                <button type="button" className='btn btn-primary' onClick={() => {
                  reset();
                  setEditingId(null);
                }}>
                  Add New
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="table-container">
            <h1>Employee Table</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.address?.city || 'N/A'}</td>
                    <td>{employee.address?.state || 'N/A'}</td>
                    <td>{employee.address?.pincode || 'N/A'}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button className='btn btn-success' onClick={() => handleEdit(employee.id)}>
                          Edit
                        </button>
                        <button className='btn btn-warning' onClick={() => handleDelete(employee.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
