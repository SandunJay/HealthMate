// app/hooks/useResetStack.ts
import { useRouter } from 'expo-router';

const useResetStack = () => {
    const router = useRouter();

    const resetToRoot = (tabName: string) => {
        router.replace(`/pharmacist/${tabName}`);
    };

    return {
        resetToRoot
    };
};

export default useResetStack;
