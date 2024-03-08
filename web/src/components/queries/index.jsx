import './index.css';
import { queriesRequests } from '../../service/queries.requests';

export const Queries = () => {
  const logQ4 = async () => {
    const response = await queriesRequests.q4();
    console.log('Query Q4', response);
  }

  const logQ5 = async () => {
    const response = await queriesRequests.q5();
    console.log('Query Q5', response);
  }

  const logQ6 = async () => {
    const response = await queriesRequests.q6();
    console.log('Query Q6', response);
  }

  return (
    <div className='queries-container'>
      <button className='button' onClick={logQ4}>Query Q4 Query</button>
      <button className='button' onClick={logQ5}>Query Q5 Query</button>
      <button className='button' onClick={logQ6}>Query Q6 Query</button>
    </div>
  );
}