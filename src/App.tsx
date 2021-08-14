import firebase from 'firebase';
import './App.css';
import { useGetMembersQuery } from './services/members';

export default function App() {
  const firebaseApp = firebase.apps[0];
  return (
    <div>
      <h1>React & Firebase Test</h1>
      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>
    </div>
  );
}

// function App() {
//   const { data, isError, isLoading, error } = useGetMembersQuery({});

//   return (
//     <div className="App">
//       {isError ? (
//         <>Oh no, there was an error: {error}</>
//       ) : isLoading ? (
//         <>Loading...</>
//       ) : data ? (
//         <>
//           <h3>Members</h3>
//           {data.members.map(member => 
//             <div>
//               <p>Name: {member.name}</p>
//               <ul>
//                 {member.instruments.map(instrument =>
//                   <li>{instrument.valueOf()}</li>
//                 )}
//               </ul>
//             </div>
//           )}
//         </>
//       ) : null}
//     </div>
//   );
// }

// export default App;
