import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'; 

const useAuthRedirect = (redirectPath) => {
  const { isUserAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isUserAuthenticated()) {
      router.push(redirectPath);
    }
  }, [isUserAuthenticated, redirectPath, router]);
};

export default useAuthRedirect;