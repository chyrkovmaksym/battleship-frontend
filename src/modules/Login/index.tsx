import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AuthLayout from "@/layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your email to sign in to your account"
    >
      <LoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          to="/register"
          className="hover:text-brand underline underline-offset-4"
        >
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
