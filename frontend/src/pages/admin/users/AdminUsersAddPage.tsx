import { useFormik } from 'formik';
import { useAddUserMutation } from '../../../redux/user/UserApi';
import { toast } from 'react-toastify';
import { createUserValidation } from '../../../validation/User';


const AdminUsersAddPage = () => {
  const [addUser, { isLoading }] = useAddUserMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    validationSchema: createUserValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        await addUser(values).unwrap();
        toast.success('User added successfully!');
        resetForm();
      } catch (error) {
        console.log(error)
        toast.error('Failed to add user.');
      }
    },
  });

  return (
    <div className='flex flex-col items-start !p-5'>
      <div >
        <h2 className='text-2xl flex font-bold'>Add New User</h2>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
          
          <div className='flex flex-col '>
            <label htmlFor="name" className=' flex items-start'>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
               className='border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black'
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-red-500'>{formik.errors.name}</div>
            ) : null}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="surname" className=' flex items-start'>Surname</label>
            <input
              id="surname"
              name="surname"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
               className='border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black'
            />
            {formik.touched.surname && formik.errors.surname ? (
              <div className='text-red-500'>{formik.errors.surname}</div>
            ) : null}
          </div>

          <div className='flex flex-col'> 
            <label htmlFor="email" className=' flex items-start'>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
               className='border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black'
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-red-500'>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="password" className=' flex items-start'>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className='border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black'
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-red-500'>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className='!mt-5 flex items-start'>
            <button
              type="submit"
              disabled={isLoading}
              className='shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-semibold tex-xl  !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg w-[206px] h-[40px]'
            >
              {isLoading ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUsersAddPage;