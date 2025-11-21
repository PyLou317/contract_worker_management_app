export default function TopNavBar() {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    isPending: userDataIsPending,
    error: userDataError,
    data: userData,
    isFetching: userDataIsFetching,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => apiFetch(`/user`),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (userData) {
      const tempUserName = capitalizeFirstLetter(userData.username);
      setUserName(tempUserName);
    }
  }, [userData]);

  useEffect(() => {
    if (!userDataIsPending && !userDataIsFetching) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [userDataIsPending, userDataIsFetching]);

  let content = '';
  if (isLoading) {
    content = <LoadingSpinner size="10" />;
  } else if (userData && userData.username) {
    content = `Welcome, ${userName}!`;
  } else {
    content = `Welcome, Guest!`;
  }

  return (
    <nav className="p-6 border-b-2 border-gray-200 w-full bg-white flex justify-between items-center space-x-4">
      <h1 className="text-2xl font-semibold">Welcome, Lucas!</h1>
    </nav>
  );
}
