import { useEffect} from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/AuthContext';
import FullPageLoader from './FullPageLoader';

// @ts-ignore
export default function PrivateRoute({ protectedRoutes, children }) {
    const router = useRouter();
    const { isAuthenticated, isLoaded } = useAuth();

    const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

    useEffect(() => {
        console.log('loaded')
        if(typeof window !== undefined){
            if (!isLoaded && !isAuthenticated && pathIsProtected) {
                // Redirect route, you can point this to /login
                router.push('/login');
            }else {
                if(router.pathname === '/login' && isAuthenticated){
                    router.push('/')
                }
            }
        }
    }, [isLoaded, isAuthenticated, pathIsProtected]);

    if ((isLoaded && !isAuthenticated) && pathIsProtected) {
        return <FullPageLoader />;
    }

    return children;
}
//
// type PrivateRouteProps = {
//     children: ReactNode
//     protectedRoutes: string[]
// }