import { Link, useNavigate } from 'react-router-dom';
import './Orders.scss';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const navigate = useNavigate();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    try {
      const sellerId = order.sellerId;
      const buyerId = order.buyerId;
      const id = sellerId + buyerId;

      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className='orders'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'Something went wrong'
      ) : (
        <div className='container'>
          <div className='title'>
            <h1>Orders</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
                <th>Contact</th>
              </tr>
            </tbody>
            {data.map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td>
                    <img className='image' src={order.img} alt='' />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>Maria Anders</td>
                  <td>
                    <img
                      onClick={() => handleContact(order)}
                      className='message'
                      src='./img/message.png'
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
};

export default Orders;
