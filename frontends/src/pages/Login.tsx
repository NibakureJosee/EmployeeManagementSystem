import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import AuthLayout from "../components/layouts/AuthLayout";
import useAuth from "../hooks/useAuth";
import { generatePageTitle } from "../lib/utils";

export default function Login() {
    const { loggingIn, login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;
        if (!email || !password) {
            notifications.show({
                title: "Error",
                message: "Please fill in all fields",
                color: "red",
            });
            return;
        }
        login(email, password);
    }

    return (
        <>
            <Helmet>
                <title>{generatePageTitle("Login")}</title>
            </Helmet>
            <AuthLayout>
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Link to={'/'}>
                        </Link>
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            New?{' '}
                            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
                                Register
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6">
                                <AuthInput
                                    label="Email Address"
                                    required
                                    autoComplete="email"
                                    type="email"
                                    name="email"
                                />

                                <AuthInput
                                    label="Password"
                                    required
                                    autoComplete="current-password"
                                    type="password"
                                    name="password"

                                />

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        loading={loggingIn}
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}
