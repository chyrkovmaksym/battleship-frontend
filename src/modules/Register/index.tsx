import AuthLayout from "@/layouts/AuthLayout";
import RegisterForm from "./components/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter some info to create a new account"
    >
      <RegisterForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          to="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Already have an account?
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
