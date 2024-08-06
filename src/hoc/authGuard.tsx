import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { ComponentType, useContext, useEffect } from "react";

const withAuth = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    useEffect(() => {
      if (!user?.email) {
        router.replace("/login");
      }
    }, [user]);

    if (user?.email) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
