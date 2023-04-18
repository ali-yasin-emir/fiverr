import React from 'react';
import { Link } from 'react-router-dom';
import './MyGigs.scss';
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs']);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className='myGigs'>
      {isLoading ? (
        'Loading'
      ) : error ? (
        'Something went wrong'
      ) : (
        <div className='container'>
          <div className='title'>
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to='/add'>
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </tbody>
            {data.map((gig) => (
              <tbody key={gig._id}>
                <tr>
                  <td>
                    <img
                      onClick={handleDelete}
                      className='image'
                      src={gig.cover}
                      alt=''
                    />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      onClick={() => handleDelete(gig._id)}
                      className='delete'
                      src='./img/delete.png'
                      alt=''
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
