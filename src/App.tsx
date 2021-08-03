import './App.css';
import { useGetMembersQuery } from './services/members';

function App() {
  const { data, isError, isLoading } = useGetMembersQuery({});

  return (
    <div className="App">
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>Members</h3>
          {data.data.members.forEach(member => {
            <div>
              <p>Name: {member.name}</p>
              <ul>
                {member.instruments.map(instrument => {
                  return <li>{instrument.valueOf()}</li>
                })}
              </ul>
            </div>
          })}
        </>
      ) : null}
    </div>
  );
}

export default App;
