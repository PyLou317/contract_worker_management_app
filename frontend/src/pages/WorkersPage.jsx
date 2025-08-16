import { useQuery } from '@tanstack/react-query';

export default function WorkerList() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/api/workers/',
      )
      return await response.json()
    },
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((worker) => (
        <li key={worker.id}>
          {worker.first_name} {worker.last_name}
        </li>
      ))}
    </ul>
  );
}
